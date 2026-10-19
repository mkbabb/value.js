// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · KFA-153: do the lane balls move after the badge leaves 'derby' (the exit fade)? · KFA-102: lane frames pinned at a rail end · KFA-213: badge skin flips under the 'derby' label
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
// start the field chasing so it is still settling as the overlay leaves
const rail = await p.locator(".spring-rail").boundingBox();
await p.keyboard.press("Tab"); await p.locator(".spring-rail").focus(); await p.keyboard.press("Enter");
const trace = await p.evaluate(async () => {
  const rows = []; const t0 = performance.now();
  while (performance.now() - t0 < 3600) {
    rows.push({ t: Math.round(performance.now() - t0), badge: document.querySelector(".status-badge")?.textContent?.trim(), skin: document.querySelector(".status-badge")?.className.includes("settled-badge") ? "settled" : "tracking", balls: [...document.querySelectorAll(".derby-lane-ball")].map((e) => e.style.transform).join("|") });
    await new Promise((r) => requestAnimationFrame(r));
  }
  return rows;
});
const leave = trace.findIndex((r, i) => i > 0 && trace[i - 1].badge === "derby" && r.badge !== "derby");
const after = trace.slice(leave).filter((r) => r.balls);
const distinct = new Set(after.map((r) => r.balls)).size;
// KFA-102 — frames a lane ball sits exactly at a rail end (translateX(100cqw) / (0cqw))
const pinned = trace.filter((r) => r.balls).reduce((n, r) => n + r.balls.split("|").filter((x) => /translateX\((100|0)cqw\)/.test(x)).length, 0);
console.log(`${process.env.TAG} pinned-lane-frames ${pinned}`);
// KFA-213 — skin flips while the label reads 'derby'
const d = trace.filter((r) => r.badge === "derby"); const flips = d.filter((r, i) => i > 0 && r.skin !== d[i - 1].skin).length;
console.log(`${process.env.TAG} derby-label frames ${d.length} · badge skin flips mid-derby ${flips}`);
console.log(`${process.env.TAG} leaveAt ${leave >= 0 ? trace[leave].t : null}ms · frames with lanes after leave ${after.length} · distinct lane poses after leave ${distinct} · rail ${!!rail}`);
await b.close(); process.exit(0);
