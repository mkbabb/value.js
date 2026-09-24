// SERVED MODEL: claude-opus-5-5
// KF.W13V.c — C1-1 rail read: the desktop rail's block extent vs the transport band (1440x900), per scene. usage: node rail.mjs <baseUrl> <scene> [WxH]
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [url = "http://localhost:5173", scene = "easing", vp = "1440x900"] = process.argv.slice(2);
const [W, H] = vp.split("x").map(Number);
const r = await withBrowser(async (b) => {
  const p = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
  await p.goto(`${url}/#/${scene}`, { waitUntil: "load" }); await p.waitForTimeout(3000);
  return p.evaluate(() => {
    const R = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [r.top, r.bottom, r.height].map((v) => +v.toFixed(1)); };
    const pane = document.querySelector(".controls-pane");
    const cs = getComputedStyle(document.querySelector(".controls-pane-wrapper") ?? document.body);
    return { layout: R(".controls-layout"), stage: R(".stage-cell"), wrapper: R(".controls-pane-wrapper"), pane: R(".controls-pane"), paneScroll: pane?.scrollHeight, paneOverflow: pane && getComputedStyle(pane).overflowY, wrapperPad: cs.paddingBlock, alignSelf: cs.alignSelf, parentAlignItems: getComputedStyle(document.querySelector(".controls-layout")).alignItems, wrapOverflow: cs.overflow, wrapDisplay: cs.display, wrapH: cs.height, stagePad: getComputedStyle(document.querySelector(".stage-cell")).paddingBlock, minH: cs.minHeight, rows: getComputedStyle(document.querySelector(".controls-layout")).gridTemplateRows, tok: ["--dock-band-reserve","--dock-band-reserve-stable","--stage-bottom-inset","--dock-bottom-anchor","--dock-menubar-reserve"].map((t) => t + "=" + getComputedStyle(document.querySelector(".controls-pane-wrapper") ?? document.body).getPropertyValue(t).trim().slice(0,60)), band: R(".menubar-safe-pb"), open: !!document.querySelector(".controls-pane--open"), ball: [...document.querySelectorAll(".progress-ball, .hero-ball")].map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom), Math.round(r.width)]; }) };
  });
}, { launch: { headless: false } });
console.log(JSON.stringify(r.value ?? r));
