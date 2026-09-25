// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · KFA-151 (readout lag at motion start) + KFA-103 (settled lag after the ball visibly stops), 1440 light
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
await p.locator(".spring-rail").focus(); await p.waitForTimeout(100);
const r = await p.evaluate(async () => {
  const fill = document.querySelector(".spring-fill"); const track = document.querySelector(".spring-track").getBoundingClientRect().width;
  const sx = () => Number(/scaleX\(([-\d.e]+)\)/.exec(fill.style.transform)?.[1] ?? 0);
  const rows = []; const t0 = performance.now();
  document.querySelector(".spring-rail").dispatchEvent(new KeyboardEvent("keydown", { key: document.querySelector("[data-readout=primary]").textContent.trim() === "0.000" ? "End" : "Home", bubbles: true }));
  while (performance.now() - t0 < 2500) { rows.push({ t: performance.now() - t0, x: document.querySelector("[data-readout=primary]").textContent.trim(), badge: document.querySelector(".status-badge").textContent.trim(), px: sx() * track }); await new Promise((q) => requestAnimationFrame(q)); }
  const moveAt = rows.find((q, i) => i > 0 && Math.abs(q.px - rows[0].px) >= 1)?.t;
  const readAt = rows.find((q) => q.x !== rows[0].x)?.t;
  const final = rows[rows.length - 1].px;
  let stillAt = null; for (let i = rows.length - 1; i >= 0; i--) if (Math.abs(rows[i].px - final) >= 0.5) { stillAt = rows[i + 1]?.t; break; }
  const settledAt = rows.find((q) => q.t > (moveAt ?? 0) && q.badge === "settled")?.t;
  return { moveAt, readAt, readLag: readAt - moveAt, stillAt, settledAt, settleLag: settledAt - stillAt };
});
console.log(`${process.env.TAG} ${JSON.stringify(Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v == null ? v : Math.round(v)])))}`);
await b.close(); process.exit(0);
