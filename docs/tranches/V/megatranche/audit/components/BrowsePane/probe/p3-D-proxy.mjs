// Read-only CORS-permissive mirror of the production palettes API, so the
// BrowsePane POPULATED WALL can be rendered locally. GET/OPTIONS only — every
// mutating verb is refused, so this probe cannot write to the commons.
import { createServer } from "node:http";

const UPSTREAM = "https://api.color.babb.dev";
const PORT = 9101;

createServer(async (req, res) => {
  const cors = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Content-Type, X-Session-Token, Authorization, If-Match, Idempotency-Key",
    "access-control-allow-methods": "GET, OPTIONS",
  };
  if (req.method === "OPTIONS") { res.writeHead(204, cors); return res.end(); }
  if (req.method !== "GET") { res.writeHead(405, cors); return res.end("read-only probe"); }
  try {
    const up = await fetch(UPSTREAM + req.url, { headers: { accept: "application/json" } });
    const body = await up.text();
    res.writeHead(up.status, { ...cors, "content-type": up.headers.get("content-type") ?? "application/json" });
    res.end(body);
  } catch (e) {
    res.writeHead(502, cors); res.end(JSON.stringify({ error: String(e) }));
  }
}).listen(PORT, () => console.log("proxy up on " + PORT));
