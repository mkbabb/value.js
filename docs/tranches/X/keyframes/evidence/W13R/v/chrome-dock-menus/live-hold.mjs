// Real-time dock-hold audit: open each overlay and leave the pointer EXACTLY where the
// click left it (no movement); sample dock state + overlay content box every 100 ms for
// 4.5 s; CDP screencast (everyNthFrame 1) kept for share + modal.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname + "live-hold/";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const k = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(), at: new Date().toISOString() });
const b = await chromium.launch({ headless: false });
const res = {};
const cases = {
  "share-popover": { open: async (p) => p.locator('[data-dock-tether="top"] .glass-dock [aria-label="Share animation"]').click(), content: ".glass-reveal[data-state]", cast: true },
  "shortcuts-modal": { open: async (p) => p.locator('[aria-label="Show keyboard shortcuts"]').click(), content: "[role=dialog]", cast: true },
  "mbabb-menu": { open: async (p) => p.locator('[aria-label="@mbabb menu"]').click(), content: ".glass-reveal[data-state]" },
  "scene-select": { open: async (p) => p.locator('[aria-label="Scene"][role=combobox]').click(), content: ".glass-reveal[data-state]" },
  "clear-all-dialog": { open: async (p) => { await p.locator('[aria-label="@mbabb menu"]').click(); await p.waitForTimeout(600); await p.locator('[role=menuitem]:has-text("Clear all")').click(); }, content: "[role=dialog]", cast: true },
};
for (const [name, c] of Object.entries(cases)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const cdp = await p.context().newCDPSession(p);
  await p.mouse.move(720, 71); await p.waitForTimeout(1300);
  const frames = [];
  if (c.cast) {
    cdp.on("Page.screencastFrame", (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, everyNthFrame: 1 });
  }
  const r = { k: k() };
  await c.open(p);
  const t0 = Date.now();
  const s = [];
  while (Date.now() - t0 < 4500) {
    s.push(await p.evaluate((sel) => { const d = document.querySelector('[data-dock-tether="top"] .glass-dock'); const e = [...document.querySelectorAll(sel)].at(-1); const r = e?.getBoundingClientRect(); const a = document.activeElement; return { dock: d.className.includes("collapsed") ? "C" : "E", held: null, cx: r ? +r.x.toFixed(1) : null, cy: r ? +r.y.toFixed(1) : null, st: e?.getAttribute("data-state") ?? null, focus: a ? (a.getAttribute("aria-label") || a.tagName).slice(0, 24) : null, focusInDock: d.contains(a) }; }, c.content).then((x) => ({ ms: Date.now() - t0, ...x })));
    await p.waitForTimeout(100);
  }
  if (c.cast) {
    await cdp.send("Page.stopScreencast");
    const dir = OUT + name; fs.mkdirSync(dir, { recursive: true });
    const ts0 = frames[0]?.ts ?? 0;
    frames.forEach((f, i) => fs.writeFileSync(`${dir}/s${String(i).padStart(3, "0")}_${((f.ts - ts0) * 1000).toFixed(0)}ms.jpg`, Buffer.from(f.data, "base64")));
    r.frames = frames.length;
  }
  r.samples = s.filter((x, i) => i === 0 || x.dock !== s[i - 1].dock || x.cx !== s[i - 1].cx || x.cy !== s[i - 1].cy || x.focus !== s[i - 1].focus);
  r.final = s.at(-1);
  res[name] = r;
  await p.keyboard.press("Escape");
  await p.close();
}
await b.close();
fs.writeFileSync(OUT + "live-hold.json", JSON.stringify(res, null, 1));
for (const [n, r] of Object.entries(res)) console.log(n, r.k.head, r.k.dirty, JSON.stringify(r.samples));
