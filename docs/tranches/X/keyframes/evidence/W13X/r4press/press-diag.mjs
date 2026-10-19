// SERVED MODEL: claude-opus-5-5 — r4press: the first pointer press on Play after the 3600 ms idle collapse (ESC-W13X-r4cube-1).
// Derived from r4cube/resume-diag.mjs. MODE=collapse (default: pause, move the pointer off, wait 4500 ms, press Play by pointer)
// | precollapse (press Play by pointer 600 ms after the pause, the dock still expanded) | key (after the collapse, focus Play + Enter).
// The probe closes its browser in a finally. Headless real Chrome, no window capture.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const MODE = process.env.MODE || "collapse"; const BASE = process.env.BASE || "http://localhost:5497";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errors = []; p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
  const labels = () => p.evaluate(() => [...document.querySelectorAll("button")].map((e) => e.getAttribute("aria-label") || "").filter((l) => /^(Pause|Play) animation/.test(l)));
  const center = async (label) => { const r = await p.locator(`button[aria-label='${label}']`).first().boundingBox(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; };
  const pointerPress = async (label) => { const c = await center(label); await p.mouse.move(c.x, c.y, { steps: 4 }); await p.mouse.down(); await sleep(90); await p.mouse.up(); };
  await p.goto(`${BASE}/#/cube`, { timeout: 120000 }); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await sleep(3000);
  await pointerPress("Pause animation"); await sleep(400);
  const out = { mode: MODE, paused: await labels() };
  await p.mouse.move(700, 300, { steps: 4 });
  await sleep(MODE === "precollapse" ? 200 : 4500);
  out.collapsed = await p.evaluate(() => [...document.querySelectorAll("[data-dock-tether] .glass-dock")].map((d) => d.getAttribute("data-collapsed") ?? d.getAttribute("data-state") ?? d.className.slice(0, 80)));
  await p.evaluate(() => { window.__log = []; const t0 = performance.now(); const ids = new WeakMap(); let n = 0; const id = (el) => { if (!el || !el.tagName) return String(el); if (!ids.has(el)) ids.set(el, ++n); return el.tagName + "#" + ids.get(el) + (el.isConnected ? "" : "(detached)"); };
    const L = (m) => window.__log.push(Math.round(performance.now() - t0) + ":" + m);
    for (const ty of ["pointerdown", "pointerup", "click", "focus"]) window.addEventListener(ty, (e) => { const btn = e.target?.closest?.("button"); L(ty + ">" + id(e.target) + " btn=" + id(btn) + ":" + (btn?.getAttribute("aria-label") || "")); }, true);
    new MutationObserver((ms) => { for (const m of ms) { if (m.type === "attributes") L("attr " + m.attributeName + "=" + m.target.getAttribute(m.attributeName) + " on " + id(m.target)); else if (m.removedNodes.length) L("removed " + [...m.removedNodes].map(id).join(",")); } }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-label", "data-collapsed"] }); });
  if (MODE === "key") { await p.locator("button[aria-label='Play animation']").first().focus(); await p.keyboard.press("Enter"); }
  else await pointerPress("Play animation");
  await sleep(800); out.after800 = await labels(); await sleep(1500); out.after2300 = await labels();
  out.log = (await p.evaluate(() => window.__log)).slice(0, 40); out.errors = errors;
  out.verdict = out.after2300.includes("Pause animation") ? "PAUSE" : "PLAY";
  console.log(JSON.stringify(out));
} finally { await b.close(); }
