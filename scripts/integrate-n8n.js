#!/usr/bin/env node
/**
 * Adds Next.js route + notes for signed webhook pattern and Payload hooks placeholder.
 */
const fs = require('fs');
const path = require('path');

const webDir = path.join(process.cwd(), 'apps', 'web');
const cmsDir = path.join(process.cwd(), 'apps', 'cms');

if (!fs.existsSync(webDir) || !fs.existsSync(cmsDir)) {
  console.error('Expected apps/web and apps/cms. Run from repo root.');
  process.exit(1);
}

const apiRoute = path.join(webDir, 'app', 'api', 'events', 'content-index', 'route.ts');
fs.mkdirSync(path.dirname(apiRoute), { recursive: true });
fs.writeFileSync(apiRoute, `
import crypto from "node:crypto";

const N8N_URL = process.env.N8N_URL!;
const N8N_SECRET = process.env.N8N_HMAC_SECRET!;

function sign(body: string) {
  return crypto.createHmac("sha256", N8N_SECRET).update(body).digest("hex");
}

export async function POST(req: Request) {
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const res = await fetch(\`\${N8N_URL}/webhook/content.index/v3\`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Signature": sign(body) },
    body,
  });
  return new Response(null, { status: res.ok ? 202 : 500 });
}
`.trim());

const hooksFile = path.join(cmsDir, 'src', 'hooks', 'contentHooks.ts');
fs.mkdirSync(path.dirname(hooksFile), { recursive: true });
fs.writeFileSync(hooksFile, `
import crypto from "node:crypto";

export async function emitContentChanged(event: {
  id: string; operation: "create" | "update" | "delete";
}) {
  const url = process.env.N8N_URL!;
  const secret = process.env.N8N_HMAC_SECRET!;
  const body = JSON.stringify({
    type: "article.changed",
    version: "v3",
    id: event.id,
    operation: event.operation,
    occurredAt: new Date().toISOString()
  });
  const sig = crypto.createHmac("sha256", secret).update(body).digest("hex");
  await fetch(\`\${url}/webhook/content.index/v3\`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Signature": sig },
    body,
  });
}
`.trim());

console.log('n8n integration stubs added. Set N8N_URL and N8N_HMAC_SECRET envs.');
