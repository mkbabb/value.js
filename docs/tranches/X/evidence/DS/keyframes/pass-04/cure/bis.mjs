import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
const sels = ["body", ".editor-shell", "main", ".controls-layout", ".stage-cell", ".scene-host", ".square-stage"];
for (const s of sels) {
  const r = await p.evaluate((s) => {
    document.getElementById("bdprobe")?.remove();
    const d = document.createElement("div"); d.id = "bdprobe";
    Object.assign(d.style, { position: "absolute", left: "10px", top: "10px", width: "200px", height: "100px", backdropFilter: "blur(16px)", zIndex: "99999", pointerEvents: "none" });
    const host = document.querySelector(s); if (getComputedStyle(host).position === "static") host.style.position = "relative";
    host.appendChild(d); const r = d.getBoundingClientRect(); return { x: r.x, y: r.y };
  }, s);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `b-${s.replace(/\W/g, "")}.png`, clip: { x: r.x + 10, y: r.y + 10, width: 180, height: 80 } });
  await p.evaluate(() => document.getElementById("bdprobe").style.display = "none");
  await p.screenshot({ path: `n-${s.replace(/\W/g, "")}.png`, clip: { x: r.x + 10, y: r.y + 10, width: 180, height: 80 } });
  console.log(s, r);
}
await b.close();
