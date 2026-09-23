// keyframes-editor-cards — frame-by-frame capture (method 3: CDP screencast, every frame,
// timestamped) + an in-page rAF sampler of the animated layers' computed style per frame.
// The motions are keyframes.js-library rAF one-shots (CSSKeyframesAnimation extends
// KeyframesAnimation — inline-style writes), triggered by gestures, so no WAAPI to pause.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const kfState = () => execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim() + " porcelain=" + execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString().trim();
const meta = { started: new Date().toISOString(), khead: kfState(), scenarios: {} };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const logs = []; p.on("console", m => { if (["error", "warning"].includes(m.type())) logs.push(m.type() + ": " + m.text().slice(0, 200)); });
const cdp = await ctx.newCDPSession(p);
await p.goto("http://localhost:5173/#/spring", { waitUntil: "load" });
await p.waitForTimeout(4000);
meta.renderer = await p.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });

// Tag the card roots + scroll the editor section into view.
const tag = () => p.evaluate(() => {
  document.querySelectorAll("[data-audit-card]").forEach(e => e.removeAttribute("data-audit-card"));
  const secV = [...document.querySelectorAll(".keyframes-section")].find(s => s.offsetParent); secV.setAttribute("data-audit-sec", "1");
  const rm = [...secV.querySelectorAll('button[aria-label^="Remove the keyframe"]')];
  const roots = rm.map(btn => { let el = btn; while (el.parentElement && el.parentElement.querySelectorAll('button[aria-label^="Remove the keyframe"]').length === 1) el = el.parentElement; return el; });
  roots.forEach((r, i) => r.setAttribute("data-audit-card", i));
  secV.scrollIntoView({ block: "start" });
  const sc = secV.querySelector(".keyframes-editor-scroll");
  return { n: roots.length, rootTags: roots.map(r => r.tagName + "." + [...r.classList].slice(0, 3).join(".")), scroll: sc && sc.getBoundingClientRect().toJSON(),
    bar: document.querySelector("[data-audit-sec] .progress-bar")?.getBoundingClientRect().toJSON() };
});
meta.tag0 = await tag();
await p.waitForTimeout(600);
await p.screenshot({ path: OUT + "rest-00.png" });

await p.addInitScript(() => {});
await p.evaluate(() => {
  window.__samp = { on: false, rec: [], raf: [] };
  const read = el => { if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { tf: cs.transform === "none" ? "none" : cs.transform.replace(/matrix\(|\)/g, "").split(",").map(v => (+v).toFixed(3)).join(","), inl: el.style.transform || "", op: cs.opacity, z: cs.zIndex, f: cs.filter === "none" ? "" : cs.filter, bl: cs.mixBlendMode === "normal" ? "" : cs.mixBlendMode, x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; };
  let last = 0;
  const tick = now => {
    const S = window.__samp;
    if (S.on) {
      if (last) S.raf.push(+(now - last).toFixed(2));
      const row = { t: +now.toFixed(1), wall: Date.now() };
      row.bar = read(document.querySelector("[data-audit-sec] .progress-bar"));
      document.querySelectorAll("[data-audit-card]").forEach(c => row["c" + c.dataset.auditCard] = read(c));
      const dlg = document.querySelector('[role="dialog"]'); if (dlg) { row.dlg = read(dlg); row.dlgState = dlg.dataset.state; const ov = document.querySelector('[data-state][class*="overlay"], .dialog-overlay, [data-reka-dialog-overlay]'); if (ov) row.ov = read(ov); const db = dlg.querySelector(".progress-bar"); if (db) row.dbar = read(db); }
      S.rec.push(row);
    }
    last = now; requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

async function scenario(name, action, ms) {
  const dir = OUT + name + "/"; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const frames = []; let i = 0;
  const onFrame = async ({ data, metadata, sessionId }) => { const f = `f${String(i).padStart(3, "0")}.png`; frames.push({ i, f, ts: metadata.timestamp }); i++; fs.writeFileSync(dir + f, Buffer.from(data, "base64")); try { await cdp.send("Page.screencastFrameAck", { sessionId }); } catch {} };
  cdp.on("Page.screencastFrame", onFrame);
  await p.evaluate(() => { window.__samp.rec = []; window.__samp.raf = []; window.__samp.on = true; });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
  await p.waitForTimeout(250);
  const t0 = Date.now(); const info = await action(); meta.scenarios[name] = { t0, info };
  await p.waitForTimeout(ms);
  await cdp.send("Page.stopScreencast"); cdp.off("Page.screencastFrame", onFrame);
  const samp = await p.evaluate(() => { window.__samp.on = false; return { rec: window.__samp.rec, raf: window.__samp.raf }; });
  frames.forEach(f => f.ms = Math.round(f.ts * 1000 - t0));
  const drops = samp.raf.filter(d => d > 20);
  Object.assign(meta.scenarios[name], { frames: frames.length, rafFrames: samp.raf.length, drops: drops.length, maxDelta: Math.max(...samp.raf), khead: kfState() });
  fs.writeFileSync(dir + "frames.json", JSON.stringify({ frames: frames.map(({ i, ms }) => ({ i, ms })), samp: samp.rec.map(r => ({ ...r, ms: r.wall - t0 })) }, null, 0));
  console.log(name, JSON.stringify(meta.scenarios[name]));
}

// A — one edit in card 1's CSS (a single keystroke): the bar should sweep scaleX 0→1 over 1000 ms, then return to rest.
await scenario("A_edit_single", async () => {
  const pre = p.locator('[data-audit-card="1"] pre[contenteditable]'); await pre.click(); await p.keyboard.press("End"); await p.keyboard.type(" ");
  return "typed 1 space at end of card 1 pre";
}, 1600);
await p.waitForTimeout(1500);
// B — burst of 6 keystrokes 120 ms apart: "ONE sweep replayed per edit" — each keystroke should restart (or continue) one sweep, not stack writers.
await scenario("B_edit_burst", async () => {
  for (let k = 0; k < 6; k++) { await p.keyboard.type(" "); await p.waitForTimeout(120); }
  return "6 spaces 120ms apart in card 1 pre";
}, 1800);
await p.keyboard.press("Escape"); await p.mouse.click(1300, 860);
await p.waitForTimeout(2500);
meta.tag1 = await tag(); await p.waitForTimeout(500);
// C — delete the 25% stop (card 1, has neighbour card 2): leaving card warpLeft 700ms, neighbour jumpUp 700ms, then the data removal.
await scenario("C_remove_middle", async () => {
  await p.locator('[data-audit-card="1"] button[aria-label^="Remove the keyframe"]').click();
  return "removed card 1";
}, 2000);
meta.tag2 = await tag(); await p.waitForTimeout(800);
// D — delete the last stop (neighbour = the previous card).
await scenario("D_remove_last", async () => {
  const n = await p.locator("[data-audit-card]").count();
  await p.locator(`[data-audit-card="${n - 1}"] button[aria-label^="Remove the keyframe"]`).click();
  return "removed last card " + (n - 1);
}, 2000);
meta.tag3 = await tag(); await p.waitForTimeout(800);
// E — open the Add keyframes dialog (enter), then Escape (leave).
await scenario("E_dialog_open", async () => { await p.getByRole("button", { name: "Add keyframes" }).click(); return "clicked Add keyframes"; }, 900);
await p.screenshot({ path: OUT + "dialog-open.png" });
await scenario("F_dialog_close", async () => { await p.keyboard.press("Escape"); return "Escape"; }, 900);
await p.waitForTimeout(600);
// G — reopen, submit a keyframe block: the dialog's own feedback sweep (fresh CSSKeyframesAnimation per submit) vs the close.
await p.getByRole("button", { name: "Add keyframes" }).click(); await p.waitForTimeout(800);
meta.dialogFields = await p.evaluate(() => { const d = document.querySelector('[role="dialog"]'); return d ? [...d.querySelectorAll("textarea,input,button,[contenteditable]")].map(e => e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 30)) : null; });
await scenario("G_dialog_submit", async () => {
  const ta = p.locator('[role="dialog"] textarea, [role="dialog"] [contenteditable="true"], [role="dialog"] .cm-content').first();
  await ta.click(); await p.keyboard.press("ControlOrMeta+a");
  await p.keyboard.type("60% { transform: translateX(60%); }");
  const btns = await p.$$eval('[role="dialog"] button', bs => bs.map(b => b.textContent.trim() || b.getAttribute("aria-label")));
  const submit = p.locator('[role="dialog"] button').filter({ hasText: /add|import|apply|submit/i }).last();
  await submit.click();
  return { btns };
}, 1600);
meta.tag4 = await tag();
await p.screenshot({ path: OUT + "rest-end.png" });
meta.logs = logs.slice(0, 20); meta.ended = new Date().toISOString(); meta.kheadEnd = kfState();
fs.writeFileSync(OUT + "meta.json", JSON.stringify(meta, null, 1));
await b.close();
