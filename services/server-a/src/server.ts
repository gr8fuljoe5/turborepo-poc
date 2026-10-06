import http from 'node:http';
import type { ServerResponse } from 'node:http';
import { items, SERVICE_NAME } from './items.ts';

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

export function createServer() {
  return http.createServer((req, res) => {
    const { pathname } = new URL(req.url ?? '/', 'http://localhost');

    if (req.method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, { status: 'ok', service: SERVICE_NAME });
    }
    if (req.method === 'GET' && pathname === '/api/items') {
      return sendJson(res, 200, items);
    }
    sendJson(res, 404, { error: 'Not found' });
  });
}
