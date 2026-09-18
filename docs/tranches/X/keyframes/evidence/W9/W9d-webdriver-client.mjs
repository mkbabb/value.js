// SERVED MODEL: claude-opus-5[1m]
// Minimal WebDriver-classic client for safaridriver (X.KF.W9 `.d`).
const BASE = process.env.WD_BASE || "http://127.0.0.1:4602";

export async function post(path, body) {
  const r = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
    signal: AbortSignal.timeout(45000),
  });
  const t = await r.text();
  let j;
  try { j = JSON.parse(t); } catch { j = { raw: t }; }
  return { status: r.status, json: j };
}
export async function get(path) {
  const r = await fetch(BASE + path, { signal: AbortSignal.timeout(45000) });
  const t = await r.text();
  let j;
  try { j = JSON.parse(t); } catch { j = { raw: t }; }
  return { status: r.status, json: j };
}
export async function del(path) {
  const r = await fetch(BASE + path, { method: "DELETE" });
  return { status: r.status, text: await r.text() };
}
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function newSession() {
  const r = await post("/session", {
    capabilities: { alwaysMatch: { browserName: "safari" } },
  });
  if (r.status !== 200) throw new Error(`session create failed ${r.status}: ${JSON.stringify(r.json).slice(0, 400)}`);
  const v = r.json.value;
  // Bound every WebDriver wait, so a hung scene cannot hang the seat.
  await post(`/session/${v.sessionId}/timeouts`, { pageLoad: 25000, script: 15000, implicit: 0 });
  return v;
}
export async function exec(sid, script, args = []) {
  const r = await post(`/session/${sid}/execute/sync`, { script, args });
  if (r.status !== 200) throw new Error(`execute failed ${r.status}: ${JSON.stringify(r.json).slice(0, 400)}`);
  return r.json.value;
}
export async function nav(sid, url) {
  const r = await post(`/session/${sid}/url`, { url });
  if (r.status !== 200) throw new Error(`nav failed ${r.status}: ${JSON.stringify(r.json).slice(0, 300)}`);
}
export async function shot(sid) {
  const r = await get(`/session/${sid}/screenshot`);
  if (r.status !== 200) throw new Error(`screenshot failed ${r.status}`);
  return Buffer.from(r.json.value, "base64");
}
export async function tab(sid, n = 1) {
  const actions = [];
  for (let i = 0; i < n; i++) actions.push({ type: "keyDown", value: "" }, { type: "keyUp", value: "" });
  return post(`/session/${sid}/actions`, {
    actions: [{ type: "key", id: "kbd", actions }],
  });
}
export async function key(sid, ch) {
  return post(`/session/${sid}/actions`, {
    actions: [{ type: "key", id: "kbd", actions: [{ type: "keyDown", value: ch }, { type: "keyUp", value: ch }] }],
  });
}
