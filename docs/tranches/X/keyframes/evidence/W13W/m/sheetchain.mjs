// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.m — the Sheet body's inline inset chain (card -> sheet), with each box's padding.
import { chromium } from "playwright";
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[390, 844], [844, 390]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true })).newPage();
  await p.goto(`http://localhost:5173/#/${process.argv[2] || "cube"}`, { waitUntil: "networkidle" }); await p.waitForTimeout(1800);
  console.log(w, await p.evaluate(() => { const sh = document.querySelector(".controls-drawer-content"); const c = [...sh.querySelectorAll(".card")].find((c) => c.getBoundingClientRect().width > 0); const out = []; for (let a = c; a && a !== sh.parentElement; a = a.parentElement) { const r = a.getBoundingClientRect(), cs = getComputedStyle(a); out.push(`${a.tagName.toLowerCase()}.${a.className.toString().split(" ").slice(0, 3).join(".")}[${Math.round(r.left)} p${cs.paddingLeft} m${cs.marginLeft}]`); } const gs = getComputedStyle(document.documentElement); return out.join(" < ") + " | space-family=" + gs.getPropertyValue("--space-family"); }));
}
await b.close();
