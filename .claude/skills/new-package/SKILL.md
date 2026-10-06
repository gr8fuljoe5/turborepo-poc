---
name: new-package
description: Scaffold a new shared internal package under packages/ that apps consume as workspace:*. Use when asked to add a shared library, package, hooks module or utilities package.
---

# New internal package

Internal packages ship TypeScript source with no build step — the consuming app compiles them.

1. Create `packages/<name>/package.json`:

   ```json
   {
     "name": "@conning/<name>",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     "exports": {
       "./*": "./src/*.ts"
     },
     "scripts": {
       "typecheck": "tsc --noEmit -p tsconfig.json"
     },
     "devDependencies": {
       "@conning/config": "workspace:*",
       "typescript": "catalog:"
     }
   }
   ```

   List explicit subpaths in `exports` instead of `./*` if only a few modules are public. Add `test` (`vitest run`) plus a `vitest.config.ts` merging `@conning/config/vitest.preset` if the package has tests — copy `packages/ui/vitest.config.ts`.

2. Create `packages/<name>/tsconfig.json`:

   ```json
   {
     "extends": "@conning/config/tsconfig.base.json",
     "compilerOptions": { "types": [] },
     "include": ["src"]
   }
   ```

   Use `@conning/config/tsconfig.node.json` instead if only servers consume it.

3. Put sources in `src/`. React and other framework deps are `peerDependencies` (and repeated in `devDependencies` for the package's own typecheck), all `"catalog:"`.

4. In each consumer, add `"@conning/<name>": "workspace:*"` and run `pnpm install`.

5. Widen the path filters in the consumers' pipelines if the package isn't already under a filtered path (app pipelines already include `packages/**`; server pipelines only include `packages/config/**`).

6. `pnpm typecheck && pnpm test`, then `pnpm format`.
