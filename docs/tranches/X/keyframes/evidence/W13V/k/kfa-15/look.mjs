// SERVED MODEL: claude-opus-5-5
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5173/#/cube"); await p.waitForTimeout(3500);
const r = await p.evaluate(() => { const e = [...document.querySelectorAll("button,[role=tab],[role=option]")].find((e) => e.offsetParent && /^keyframes$/i.test((e.getAttribute("aria-label") || e.textContent).trim())); if (!e) return null; const b = e.getBoundingClientRect(); return { tag: e.tagName, role: e.getAttribute("role"), x: b.x + b.width / 2, y: b.y + b.height / 2, w: b.width, op: getComputedStyle(e).opacity }; });
console.log("el", JSON.stringify(r));
await p.mouse.move(r.x, r.y); await p.waitForTimeout(600); await p.mouse.click(r.x, r.y);
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => ({ ce: [...document.querySelectorAll("[contenteditable], .cm-content, textarea, .keyframes-section, [data-slot*=keyframe]")].map((e) => e.tagName + "." + e.className.toString().slice(0, 40) + (e.offsetParent ? ":vis" : ":hid")).slice(0, 8), bars: [...document.querySelectorAll(".progress-bar")].map((e) => (e.offsetParent ? "vis" : "hid")), expanded: [...document.querySelectorAll("[aria-expanded=true]")].map((e) => e.textContent.trim().slice(0, 20)) }))));
await b.close();
