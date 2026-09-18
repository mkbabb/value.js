// CHALLENGE-D pass 4 — do the three EasingAuthoringStage "seat laws" still bind
// against glass-ui 7.0.0's DOM? And what is the DRAWN curve stage's size?
import { chromium } from "playwright";

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
const clicked = await p.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((x) => x.getAttribute("aria-label") === "Author a custom curve");
  if (!btn) return "no-button";
  btn.click();
  return "clicked";
});
await p.waitForTimeout(2000);

const out = await p.evaluate(() => {
  const host = document.querySelector(".easing-authoring");
  if (!host) return { host: false };
  const r = (e) => { const x = e.getBoundingClientRect(); return { w: +x.width.toFixed(1), h: +x.height.toFixed(1), x: +x.left.toFixed(1), y: +x.top.toFixed(1) }; };
  const svgs = [...host.querySelectorAll("svg")].map((s) => {
    const cs = getComputedStyle(s);
    const vb = s.viewBox && s.viewBox.baseVal;
    return {
      role: s.getAttribute("role"), cls: s.getAttribute("class"), aria: s.getAttribute("aria-label"),
      box: r(s), viewBox: vb ? { w: vb.width, h: vb.height } : null,
      inlineSize: cs.inlineSize, blockSize: cs.blockSize, aspectRatio: cs.aspectRatio,
      marginInline: cs.marginInlineStart + " " + cs.marginInlineEnd, transition: cs.transitionProperty,
    };
  });
  const testid = host.querySelector('[data-testid="easing-picker"]');
  const cards = [...host.querySelectorAll(".glass-card")].map((e) => {
    const cs = getComputedStyle(e);
    return { box: r(e), bg: cs.backgroundColor, shadow: cs.boxShadow, backdrop: cs.backdropFilter, radius: cs.borderTopLeftRadius };
  });
  // The drawn plot: the largest <rect>/<path> child inside the biggest svg
  const big = [...host.querySelectorAll("svg")].sort((a, bb) => bb.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
  const inner = big ? [...big.querySelectorAll("*")].map((e) => ({ tag: e.tagName, cls: (e.getAttribute("class") || "").slice(0, 24), box: r(e) }))
    .filter((k) => k.box.w > 10 && k.box.h > 10).sort((a, bb) => bb.box.w * bb.box.h - a.box.w * a.box.h).slice(0, 6) : [];
  const hostVar = getComputedStyle(host).getPropertyValue("--vb-ratio");
  const gridCols = testid ? getComputedStyle(testid).gridTemplateColumns : null;
  const controls = [...host.querySelectorAll("button,select,input,[role=combobox],[role=slider]")].map((e) => ({
    tag: e.tagName, role: e.getAttribute("role"), name: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 28), box: r(e),
    radius: getComputedStyle(e).borderTopLeftRadius, shadow: getComputedStyle(e).boxShadow === "none" ? "none" : "yes",
  }));
  return { host: true, hostBox: r(host), vbRatio: hostVar, testidPresent: !!testid, gridCols, svgs, cards, inner, controls };
});
console.log(clicked, JSON.stringify(out, null, 1));
await b.close();
