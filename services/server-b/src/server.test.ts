import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { createServer } from './server.ts';
import { items, SERVICE_NAME } from './items.ts';

describe(SERVICE_NAME, () => {
  const server = createServer();
  let baseUrl = '';

  before(async () => {
    await new Promise<void>((resolve) => server.listen(0, resolve));
    baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  after(() => {
    server.close();
  });

  it('reports healthy on /api/health', async () => {
    const res = await fetch(`${baseUrl}/api/health`);

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: 'ok', service: SERVICE_NAME });
  });

  it('returns the static items on /api/items', async () => {
    const res = await fetch(`${baseUrl}/api/items`);

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), items);
  });

  it('returns 404 for unknown routes', async () => {
    const res = await fetch(`${baseUrl}/api/nope`);

    assert.equal(res.status, 404);
  });
});
