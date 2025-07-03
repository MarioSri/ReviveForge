// Script to export Marp markdown deck to PPTX using @marp-team/marp-cli
// Usage: node scripts/export_deck_to_pptx.js docs/INVESTOR_DECK.md
// Requires @marp-team/marp-cli as a devDependency

const { execSync } = require('child_process');
const path = require('path');

const input = process.argv[2] || path.join(__dirname, '../docs/INVESTOR_DECK.md');
const output = input.replace(/\.md$/, '.pptx');

try {
  execSync(`npx marp --pptx --allow-local-files "${input}" -o "${output}"`, { stdio: 'inherit' });
  console.log(`Exported deck to ${output}`);
} catch (err) {
  console.error('Failed to export deck:', err.message);
  process.exit(1);
}

// TODO: Install @marp-team/marp-cli if not present
