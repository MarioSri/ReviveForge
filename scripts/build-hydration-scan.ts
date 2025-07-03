import { build } from 'esbuild';

(async () => {
  await build({
    entryPoints: ['scripts/scan-hydration-issues.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: 'dist/scan-hydration-issues.js',
  });
  console.log('Hydration scanner built → dist/scan-hydration-issues.js');
})();
