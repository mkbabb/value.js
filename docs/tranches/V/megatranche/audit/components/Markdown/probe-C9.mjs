// CHALLENGE-C probe 9 — cross-engine confirmation + the mechanism.
// Chromium this time. Measures (i) the same scroll-dependent document height,
// (ii) the rendered height of each <hr> while off-screen (the 200px
// contain-intrinsic-size placeholder standing in for a 1px rule).
import { chromium } from "playwright";

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/?space=hex&color=" + encodeURIComponent("oklch(0.6 0.15 30)"), {
  waitUntil: "domcontentloaded",
});
await p.waitForSelector(".markdown-body", { timeout: 20000 });
await p.waitForTimeout(2500);

const r = await p.evaluate(async () => {
  const card = document.querySelector(".about-card");
  const body = document.querySelector(".markdown-body");
  const settle = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(res, 250))));
  card.scrollTop = 0;
  await settle();
  const hrsAtTop = [...body.querySelectorAll(":scope > hr")].map((h) => +h.getBoundingClientRect().height.toFixed(1));
  const kidsAtTop = [...body.children].map((k) => +k.getBoundingClientRect().height.toFixed(1));
  const top = { scrollHeight: card.scrollHeight, bodyH: +body.getBoundingClientRect().height.toFixed(1) };

  card.scrollTop = 1e7;
  await settle();
  const bottom = { scrollHeight: card.scrollHeight, bodyH: +body.getBoundingClientRect().height.toFixed(1) };

  const st = document.createElement("style");
  st.textContent = ".markdown-body > * { content-visibility: visible !important; }";
  document.head.appendChild(st);
  card.scrollTop = 0;
  await settle();
  const truth = { scrollHeight: card.scrollHeight, bodyH: +body.getBoundingClientRect().height.toFixed(1) };
  const hrsTrue = [...body.querySelectorAll(":scope > hr")].map((h) => +h.getBoundingClientRect().height.toFixed(1));
  st.remove();

  return {
    childCount: body.children.length,
    top,
    bottom,
    truth,
    overstatementPx: top.bodyH - truth.bodyH,
    overstatementPct: +(((top.bodyH - truth.bodyH) / truth.bodyH) * 100).toFixed(1),
    hrHeights_contentVisibilityAuto_atTop: hrsAtTop,
    hrHeights_forcedVisible: hrsTrue,
    kidHeightsAtTop_first12: kidsAtTop.slice(0, 12),
  };
});
console.log(JSON.stringify(r, null, 2));
await b.close();
