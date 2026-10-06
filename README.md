# turborepo-poc

A pnpm + Turborepo monorepo POC: two React SPAs, two Node API servers, and shared UI packages, each deployable with its own Azure DevOps pipeline.

## Quick start

Requires Node 22.18+ (see `.nvmrc`).

```sh
corepack enable
pnpm install
pnpm dev
```

| What     | URL                              |
| -------- | -------------------------------- |
| app-a    | http://localhost:5173            |
| app-b    | http://localhost:5174            |
| server-a | http://localhost:4001/api/health |
| server-b | http://localhost:4002/api/health |

Other commands: `pnpm build`, `pnpm test`, `pnpm typecheck`, `pnpm storybook`, `pnpm format`.

See [AGENTS.md](AGENTS.md) for the layout, conventions and pipeline model.
