# AGENTS.md

## Project overview

A proof-of-concept pnpm + Turborepo monorepo: two dummy React SPAs, two dummy Node API servers, and the shared packages the SPAs build on. Each of the four deployables has its own Azure DevOps pipeline that only runs when something it depends on changes.

```
apps/
  app-a/            Vite + React 19 SPA — port 5173, proxies /api to server-a
  app-b/            same stack — port 5174, proxies /api to server-b
services/
  server-a/         plain node:http server in TypeScript — port 4001
  server-b/         same — port 4002
packages/
  config/           @conning/config — tsconfigs, Vitest preset, Prettier config
  test-utils/       @conning/test-utils — renderWithPrimer + jsdom setup
  ui/               @conning/ui — Primer-wrapped components, styles.css, Storybook
pipelines/          Azure DevOps YAML — one per deployable, plus templates/ and pr-validation.yml
```

Dependency graph: both apps depend on `ui`, `test-utils` and `config`; `ui` depends on `test-utils` and `config`; the servers depend only on `config` (for `tsconfig.node.json`).

## Commands

**Node 22.18+** (`.nvmrc` pins `22.23.1`) — the servers rely on Node's built-in TypeScript type stripping. **pnpm 10** via corepack: `corepack enable` once, and the version pinned in the root `package.json`'s `packageManager` is used automatically.

Run from the repo root:

- `pnpm install`
- `pnpm dev` — all four deployables at once (apps on 5173/5174, servers on 4001/4002)
- `pnpm build` / `pnpm test` / `pnpm typecheck` — `turbo run <task>` across every workspace
- `pnpm storybook` — `@conning/ui`'s Storybook on port 6006
- `pnpm format` / `pnpm format:check` — Prettier over the whole repo

Narrow any turbo task with `--filter`:

- `pnpm turbo run build --filter=app-a...` — app-a and everything it depends on
- `pnpm turbo run test --filter=...@conning/ui` — ui and everything that depends on it
- `pnpm --filter app-b dev` — one workspace's script directly, bypassing turbo

`format:check` is a root-only task (`//#format:check` in `turbo.json`), so it is skipped by any filtered turbo run. Run `pnpm format:check` separately; the pipelines do.

There is no ESLint. Prettier is configured, so formatting is not a judgement call — run `pnpm format`.

## Workspace rules

- **Internal packages ship TypeScript source.** `@conning/*` packages expose `src/` files through `exports` and have no build step; each app's Vite/Vitest compiles them. Don't add a `build` script or a `dist/` to a package.
- **Workspace deps are `"workspace:*"`.** Never a version range.
- **Third-party versions live in the catalog.** `pnpm-workspace.yaml` has one `catalog:` entry per shared dependency; a `package.json` references it as `"react": "catalog:"`. Bump versions in the catalog, not in a `package.json`.
- **No phantom imports.** pnpm doesn't hoist, so a workspace can only import what its own `package.json` lists. That includes type-only packages referenced from `vitest-env.d.ts` (e.g. `@testing-library/jest-dom`) and the `react-is` peer that `@primer/react` needs.
- **Apps never import from other apps.** Anything shared moves into `packages/`.

## Component conventions (`@conning/ui`)

`packages/ui/src/components/` is organised by atomic design:

- **atoms/** — wraps one Primer primitive and composes no other component (`atoms/Button/`)
- **molecules/** — composes atoms into one unit; sub-bucketed by role (`molecules/surfaces/Card/`)
- **organisms/** — a distinct interface section, data via props

Pages and templates belong to the app, not the package (`apps/app-a/src/components/pages/`).

Each component folder contains `ComponentName.tsx`, `ComponentName.stories.tsx`, `ComponentName.test.tsx` and a `README.md` (usage, props table, link to the story). Named exports only, no barrel files.

Apps import components by path — the package's `"./*"` export maps onto `src/components/*.tsx`:

```ts
import { Card } from '@conning/ui/molecules/surfaces/Card/Card';
```

Inside `ui`, components import each other by relative path. Inside an app, cross-directory imports use the `@/` alias (→ `src/`), declared in `vite.config.ts`, `vitest.config.ts` and `tsconfig.json` — keep all three in sync.

Wrapping a Primer component: derive the prop type and forward the ref.

```tsx
export type ButtonProps = React.ComponentProps<typeof PrimerButton>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <PrimerButton ref={ref} {...props} />;
});
```

Stories: `title` matches the tier path (`Atoms/Button`, `Molecules/Surfaces/Card`), `tags: ['autodocs']`, shared `args` on `meta` with per-story overrides named after the variant, no manual `argTypes`.

## Testing

- React workspaces use Vitest + Testing Library + jsdom. Each `vitest.config.ts` merges `@conning/config/vitest.preset` and sets `setupFiles: ['@conning/test-utils/setup']`.
- Import render helpers from one place: `import { renderWithPrimer, screen, userEvent } from '@conning/test-utils/render';`. `renderWithPrimer` wraps in Primer's `ThemeProvider`/`BaseStyles`.
- A component that uses TanStack Query gets a fresh `QueryClient` (with `retry: false`) per test, and `fetch` is stubbed with `vi.stubGlobal` — see `apps/app-a/src/components/pages/Home/Home.test.tsx`.
- Servers use `node --test` against a server started on port 0 — no test framework dependency.

## CSS ownership

`@conning/ui/styles.css` owns the page's cascade. An app's `main.tsx` imports it **first**, and imports neither Tailwind nor Primer CSS itself. It declares the `@layer` order, pulls in Tailwind's theme and utilities (no Preflight), Primer's primitives and light/dark themes, the Conning `:root` palette, and `@source './components'` so Tailwind scans the package's classes.

Every app mounts `ThemeProvider` → `BaseStyles` in `main.tsx`. Primer's colour tokens are scoped to the attributes `ThemeProvider` emits, so without it they don't resolve.

## Servers

Zero runtime dependencies. Node runs `src/index.ts` directly, so the code must stay erasable TypeScript (`tsconfig.node.json` enforces it): import with `.ts` extensions, use `import type` for types, no enums or namespaces. `build.mjs` stages a deploy artifact in `dist/` — the sources minus tests plus a minimal `package.json` — rather than compiling anything.

## Pipelines

Each deployable has its own pipeline (`pipelines/<name>.yml`) triggering on `main` and `development`, path-filtered to the workspace, the packages it could depend on, the lockfile and the pipeline templates. Stages:

1. **Affected** — `turbo-ignore <name>` decides, from Turborepo's graph, whether the workspace really changed. Everything below is skipped if not. Manual runs always build.
2. **Build** — install (pnpm store cached on `pnpm-lock.yaml`), `pnpm format:check`, `pnpm turbo run typecheck test build --filter=<name>...`, publish `dist/` as an artifact.
3. **Deploy UAT**, then **Deploy Prod** (`main` only) — deployment jobs bound to ADO Environments. Apps go to Azure Static Web Apps, servers to Azure App Service.

Service connections, app names and SWA tokens are `REPLACE_ME` placeholders. `pr-validation.yml` runs typecheck and test for everything changed since `origin/main`; Azure Repos ignores YAML `pr:` triggers, so attach it as a branch-policy build validation.

## Adding a workspace

- **App** — copy `apps/app-a` to `apps/<name>`, change the `name`, ports and proxy target, then copy `pipelines/app-a.yml` and replace `app-a` throughout. The `new-app` skill (`.claude/skills/new-app/`) walks through it.
- **Server** — same, from `services/server-a` and `pipelines/server-a.yml`.
- **Package** — see the `new-package` skill (`.claude/skills/new-package/`).

Run `pnpm install` afterwards so the lockfile picks up the new workspace.

## Commit style

Short, imperative subject line. For larger or AI-assisted commits, add a body explaining the rationale and a `Co-Authored-By` trailer.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
