import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js.config({
    extends: [
      'eslint:recommended',
    ],
    rules: {},
  }),
  ...next,
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.next/',
      'out/',
      'pnpm-lock.yaml',
    ],
  },
];
