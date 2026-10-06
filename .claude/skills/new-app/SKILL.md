---
name: new-app
description: Scaffold a new deployable SPA or Node server in this monorepo, with its own pipeline. Use when asked to add a new app, SPA, frontend, server, service or API to the repo.
---

# New app or server

Copy the closest existing workspace rather than writing one from scratch — `apps/app-a` for an SPA, `services/server-a` for a server.

## SPA

1. `cp -R apps/app-a apps/<name>` (skip `node_modules`, `dist`, `.turbo`).
2. In the copy, change:
   - `package.json` → `"name": "<name>"`
   - `vite.config.ts` → `server.port` and `preview.port` to unused ports, `/api` proxy target to its server
   - `index.html` → `<title>`
   - page copy in `src/components/pages/`
3. `cp pipelines/app-a.yml pipelines/<name>.yml` and replace every `app-a` with `<name>`.
4. `pnpm install`, then `pnpm turbo run typecheck test build --filter=<name>...`.

## Server

1. `cp -R services/server-a services/<name>`.
2. Change `package.json` `name`, `SERVICE_NAME` and the data in `src/items.ts`, and the default `PORT` in `src/index.ts`.
3. `cp pipelines/server-a.yml pipelines/<name>.yml`; replace `server-a` / `SERVER_A` throughout.
4. `pnpm install`, then `pnpm turbo run typecheck test build --filter=<name>`.

## Checklist

- Ports don't collide with 5173/5174/4001/4002/6006 or another new workspace.
- New dependencies go in the `catalog:` in `pnpm-workspace.yaml` and are referenced as `"catalog:"`.
- Add the workspace to the layout block and ports in `AGENTS.md` and the table in `README.md`.
- Run `pnpm format` before committing.
