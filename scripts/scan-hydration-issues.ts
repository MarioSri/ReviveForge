// scripts/scan-hydration-issues.ts
import { promises as fs } from 'fs';
import path from 'path';
import * as acorn from 'acorn';

const ROOTS = ['app', 'components'];
const EXTS = ['.tsx'];
const BROWSER_IDENTIFIERS = ['window', 'document', 'localStorage'];
const NON_DETERMINISTIC = [
  { pattern: /Date\.now\(/g, label: 'Date.now(' },
  { pattern: /Math\.random\(/g, label: 'Math.random(' },
  { pattern: /new Date\(/g, label: 'new Date(' },
];

async function walk(dir: string): Promise<string[]> {
  let files: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(await walk(res));
    else if (EXTS.some(ext => res.endsWith(ext))) files.push(res);
  }
  return files;
}

async function scanFile(file: string) {
  const src = await fs.readFile(file, 'utf8');
  const lines = src.split('\n');
  if (lines[0].includes('"use client"') || lines[0].includes("'use client'")) return [];
  let issues: { file: string; code: string; line: number }[] = [];
  // AST scan for identifiers
  let ast;
  try {
    ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  } catch {
    return [];
  }
  function visit(node: any) {
    if (node.type === 'Identifier' && BROWSER_IDENTIFIERS.includes(node.name)) {
      issues.push({ file, code: node.name, line: node.loc?.start.line || 1 });
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) node[key].forEach(visit);
        else visit(node[key]);
      }
    }
  }
  visit(ast);
  // Regex scan for non-deterministic
  lines.forEach((line, i) => {
    for (const { pattern, label } of NON_DETERMINISTIC) {
      if (pattern.test(line)) {
        issues.push({ file, code: label, line: i + 1 });
      }
    }
  });
  return issues;
}

(async () => {
  let allIssues: { file: string; code: string; line: number }[] = [];
  for (const root of ROOTS) {
    const abs = path.resolve(process.cwd(), root);
    if (!(await fs.stat(abs).catch(() => false))) continue;
    const files = await walk(abs);
    for (const file of files) {
      const issues = await scanFile(file);
      allIssues.push(...issues);
    }
  }
  if (allIssues.length) {
    console.log('| File | Offending code | Line |');
    console.log('|------|----------------|------|');
    for (const { file, code, line } of allIssues) {
      console.log(`| ${path.relative(process.cwd(), file)} | ${code} | ${line} |`);
    }
    process.exit(1);
  } else {
    console.log('No hydration risks found.');
  }
})();
