// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.m — ancestor chain of each scene's stage panel (box + inline padding), 390x844.
import { chromium } from "playwright";
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: +(process.argv[2] || 390), height: +(process.argv[3] || 844) }, hasTouch: true, isMobile: true })).newPage();
for (const [s, sel] of [["square", ".square-stage"], ["easing", ".easing-target"], ["spring", ".spring-target"], ["sequence", ".seq-target"], ["cube", ".stage-cell > *"], ["amiga", ".amiga-canvas"]]) {
  await p.goto(`http://localhost:5173/#/${s}`, { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  console.log(s, await p.evaluate((sel) => { const out = []; for (let a = document.querySelector(sel); a && !a.classList.contains("controls-layout"); a = a.parentElement) { const r = a.getBoundingClientRect(), cs = getComputedStyle(a); out.push(`${a.tagName.toLowerCase()}.${a.className.toString().split(" ").slice(0, 2).join(".")}[${Math.round(r.left)},${Math.round(r.right)} p${cs.paddingLeft}/${cs.paddingRight} m${cs.marginLeft}]`); } return out.join(" < "); }, sel));
}
await b.close();
