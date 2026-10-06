import { cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

// There is nothing to compile: Node runs the .ts sources directly. "Building"
// means staging a self-contained deploy artifact in dist/ — the sources minus
// tests, plus a package.json so Node treats them as ESM and App Service knows
// how to start them.
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

rmSync('dist', { recursive: true, force: true });
cpSync('src', 'dist', { recursive: true, filter: (src) => !src.endsWith('.test.ts') });
writeFileSync(
  'dist/package.json',
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      private: true,
      type: 'module',
      engines: pkg.engines,
      scripts: { start: 'node index.ts' },
    },
    null,
    2,
  ) + '\n',
);
