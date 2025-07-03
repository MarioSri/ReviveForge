// __tests__/hydration-runtime.spec.ts
import { spawn } from 'child_process';
import path from 'path';
import getPort from 'get-port';
import puppeteer from 'puppeteer';

let serverProcess: any;
let port: number;

export async function globalSetup() {
  port = await getPort();
  process.env.PORT = String(port);
  // Build if .next does not exist
  const fs = require('fs');
  if (!fs.existsSync(path.resolve(__dirname, '../.next'))) {
    await new Promise((resolve, reject) => {
      const build = spawn('pnpm', ['build'], { stdio: 'inherit', shell: true });
      build.on('exit', (code: number) => (code === 0 ? resolve(null) : reject(new Error('Build failed'))));
    });
  }
  serverProcess = spawn('pnpm', ['start'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: String(port) },
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
    shell: true,
  });
  // Wait for server to be ready
  await new Promise(res => setTimeout(res, 8000));
}

export async function globalTeardown() {
  if (serverProcess) serverProcess.kill();
}

describe('Hydration runtime smoke test', () => {
  beforeAll(globalSetup, 60000);
  afterAll(globalTeardown);
  it('should not log hydration errors in production', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let hydrationError = false;
    page.on('console', msg => {
      if (msg.text().includes('Hydration failed')) hydrationError = true;
    });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 2000));
    await browser.close();
    expect(hydrationError).toBe(false);
  }, 30000);
});
