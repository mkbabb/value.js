// OD19 KF-P3 — does the hidden well warm the chunk and prime the font at idle? Headless chromium.
import { chromium } from "playwright";
const b = await chromium.launch({ headless: true });
try { const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await c.newPage();
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.log("console", m.type(), m.text().slice(0, 200)); });
  p.on("pageerror", (e) => console.log("pageerror", String(e).slice(0, 200)));
  await p.addInitScript(() => { window.__eds = []; new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && (n.classList.contains("monaco-editor") || n.querySelector?.(".monaco-editor"))) window.__eds.push([Math.round(performance.now()), n.parentElement?.style.left ?? "?", document.fonts.status]); }).observe(document, { childList: true, subtree: true }); });
  await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await p.waitForTimeout(4000);
  console.log(JSON.stringify(await p.evaluate(() => ({ env: !!self.MonacoEnvironment, eds: window.__eds, fonts: document.fonts.status, now: Math.round(performance.now()) }))));
  await c.close(); } finally { await b.close(); }
