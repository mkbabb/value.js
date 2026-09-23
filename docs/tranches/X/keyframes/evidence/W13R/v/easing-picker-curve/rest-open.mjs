import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await p.waitForTimeout(3000);
await p.screenshot({ path: "E-cube-rest-before.png", clip: { x: 50, y: 50, width: 440, height: 640 } });
await p.evaluate(() => [...document.querySelectorAll('button[aria-label="Edit easing curve"]')].find((b) => b.getBoundingClientRect().x < 700 && b.getBoundingClientRect().width > 0).click());
await p.waitForTimeout(1200);
await p.screenshot({ path: "E-cube-detail-open-rest.png", clip: { x: 50, y: 50, width: 440, height: 640 } });
const info = await p.evaluate(() => {
  const d = document.querySelector(".panel-row--detail"); const pc = d.firstElementChild;
  const chain = []; let e = pc; while (e && chain.length < 8) { const cs = getComputedStyle(e); chain.push([e.className.toString().slice(0, 40), cs.opacity, cs.filter]); e = e.parentElement; }
  const h3 = d.querySelector("h3"); const r = h3.getBoundingClientRect();
  return { scrollTop: pc.scrollTop, scrollH: pc.scrollHeight, clientH: pc.clientHeight, h3: [r.x, r.y, r.width, r.height, getComputedStyle(h3).fontSize], active: document.activeElement?.getAttribute("aria-label"), chain, anims: document.getAnimations().filter((a) => a.playState !== "finished").map((a) => [a.constructor.name, a.animationName || a.transitionProperty, a.playState]).slice(0, 10) };
});
console.log(JSON.stringify(info), execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim(), execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString().trim());
await b.close();
