import { createServer } from 'node:http';
import { createApp, toNodeListener, toWebRequest, eventHandler, setResponseHeader } from 'h3';
import { readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = createApp();

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json'
};

app.use(eventHandler(async (event) => {
  const url = new URL(event.node.req.url, 'http://localhost');
  const filePath = path.join(__dirname, 'dist', 'client', url.pathname);
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    if (mimeTypes[ext]) setResponseHeader(event, 'Content-Type', mimeTypes[ext]);
    return readFileSync(filePath);
  }
  const handler = await import('./dist/server/server.js');
  const webReq = toWebRequest(event);
  return await handler.default.fetch(webReq);
}));

createServer(toNodeListener(app)).listen(process.env.PORT || 3000, () => console.log('Ready'));
