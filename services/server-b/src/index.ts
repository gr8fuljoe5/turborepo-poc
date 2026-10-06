import { createServer } from './server.ts';
import { SERVICE_NAME } from './items.ts';

const port = Number(process.env.PORT ?? 4002);

createServer().listen(port, () => {
  console.log(`${SERVICE_NAME} listening on http://localhost:${port}`);
});
