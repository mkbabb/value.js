// timeline-panel — probe6: compare the preview clone's faces with the live scene cube's faces (read-only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
const r = await page.evaluate(() => {
  const subj = __v(".timeline-preview-stage").firstElementChild;
  const scene = [...document.querySelectorAll(".cube.animation")].find((e) => !("timelinePreviewSubject" in e.dataset) && e.checkVisibility());
  const faces = (root) => [...root.children].filter((c) => c.nodeType === 1).slice(0, 7).map((f) => { const c = getComputedStyle(f); const b = f.getBoundingClientRect(); return `${String(f.className).slice(0, 28)}|${c.transform.slice(0, 50)}|${Math.round(b.width)}x${Math.round(b.height)}|vis=${f.checkVisibility()}`; });
  const anc = (e) => { const o = []; let p = e.parentElement; for (let i = 0; i < 4 && p; i++, p = p.parentElement) { const c = getComputedStyle(p); o.push(`${String(p.className).slice(0, 40)}|persp=${c.perspective}|ts=${c.transformStyle}`); } return o; };
  const vars = (e) => { const c = getComputedStyle(e); return ["--cube-size", "--size", "--half", "--face-size"].map((v) => `${v}=${c.getPropertyValue(v)}`).join(" "); };
  return { sceneAnc: anc(scene), subjAnc: anc(subj), sceneFaces: faces(scene), subjFaces: faces(subj), sceneVars: vars(scene), subjVars: vars(subj), sceneBox: [scene.offsetWidth, scene.offsetHeight], subjBox: [subj.offsetWidth, subj.offsetHeight] };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
