import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim() + " dirty=" + execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString().trim();
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs=[]; p.on("console", m => { if (m.type()==="error"||m.type()==="warning") logs.push(m.type()+": "+m.text().slice(0,160)); });
await p.goto("http://localhost:5173/#/" + (process.argv[2]||"cube"), { waitUntil: "load" });
await p.waitForTimeout(4000);
const info = await p.evaluate(() => {
  const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info");
  const btns = [...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b => (b.getAttribute("aria-label")||b.textContent.trim()).slice(0,40) + (b.getAttribute("aria-pressed")?`(${b.getAttribute("aria-pressed")})`:"") + (b.getAttribute("aria-selected")?`[sel ${b.getAttribute("aria-selected")}]`:""));
  const tabs = [...document.querySelectorAll('[role="tab"]')].map(t => t.textContent.trim() + ":" + t.getAttribute("aria-selected"));
  return { renderer: g.getParameter(e.UNMASKED_RENDERER_WEBGL), hash: location.hash, btns, tabs,
    cards: document.querySelectorAll(".progress-bar").length, cm: document.querySelectorAll(".cm-editor").length };
});
console.log("KF", kf); console.log(JSON.stringify(info));
await p.screenshot({ path: OUT + "probe-" + (process.argv[2]||"cube") + ".png" });
console.log(logs.slice(0,8).join("\n"));
await b.close();
