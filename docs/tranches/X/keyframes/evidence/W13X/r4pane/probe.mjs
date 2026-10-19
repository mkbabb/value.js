// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane served per-row predicates (headless real Chrome, §0ei)
// usage: node probe.mjs <base> <label>   → <label>.json + frames/<label>-*.png
// Rows: L1-4 (+L3-3) scroll ports are glass FadingScroll · UIA-KF-161 facet panels host-named ·
// UIA-KF-102 no Card inside the pane/sheet · UIA-KF-105 the rail frame's stamp (read) ·
// A2-KE-L1-6 the curve trigger glyph is glass EasingCurve · UIA-KF-116 Curve facet reads ·
// UIA-KF-225 the stage's content box clears the transport dock · L1-23 Apply CSS still toggles.
import { createRequire } from "node:module";
import { loadavg } from "node:os";
import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, label = "run"] = process.argv.slice(2);
const dir = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = { label, base, loadStart: loadavg()[0].toFixed(2), cells: [] };

const read = (facetLabel) => {
  const vis = (e) => !!e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
  // the two scroll ports (A2-KE-L1-4): the desktop rail's surface scroller and the phone sheet's body
  const ports = [...document.querySelectorAll(".controls-pane-wrapper .controls-surface, .controls-drawer-content .controls-pane")]
    .filter(vis)
    .map((e) => ({ cls: e.className.toString().slice(0, 60), sh: e.scrollHeight, ch: e.clientHeight, over: e.scrollHeight > e.clientHeight + 1, fading: e.classList.contains("fading-scroll"), mask: getComputedStyle(e).maskImage !== "none" }));
  const fadeClassEls = document.querySelectorAll("[class*='scroll-fade-']").length;
  const panel = [...document.querySelectorAll("[data-surface-panel][data-state=active]")].find(vis);
  const pane = [...document.querySelectorAll(".controls-pane")].find(vis);
  const frame = pane?.querySelector(".pane-frame");
  const trig = [...document.querySelectorAll("button[aria-labelledby]")].find((e) => vis(e) && e.querySelector(".curve-glyph, [data-slot=easing-curve]"));
  const transport = [...document.querySelectorAll("button")].find((e) => vis(e) && /^(Play|Pause) animation$/.test(e.getAttribute("aria-label") || ""));
  let dock = transport; while (dock && getComputedStyle(dock).position !== "fixed") dock = dock.parentElement;
  const cell = document.querySelector(".stage-cell");
  const cs = cell && getComputedStyle(cell); const cr = cell?.getBoundingClientRect();
  return {
    ports, fadeClassEls,
    panelLabel: panel?.getAttribute("aria-label") ?? null, facetExpected: facetLabel,
    cardsInPane: pane ? pane.querySelectorAll("[data-slot=card]").length : null,
    frameIsCard: frame?.getAttribute("data-slot") === "card",
    frameShadow: frame ? getComputedStyle(frame).boxShadow.slice(0, 160) : null,
    frameCartoon: frame?.classList.contains("cartoon-surface") ?? null,
    trigger: trig ? { glyphSvg: trig.querySelectorAll(".curve-glyph").length, easingCurve: trig.querySelectorAll("[data-slot=easing-curve]").length, name: trig.textContent.trim().slice(0, 30) } : null,
    presetSelects: pane ? [...pane.querySelectorAll("[aria-label='Easing preset']")].filter(vis).length : null,
    copyButtons: [...document.querySelectorAll("button")].filter((e) => vis(e) && /copy/i.test(e.getAttribute("aria-label") || e.title || "")).map((e) => e.getAttribute("aria-label") || e.title),
    stageContentBottom: cr ? +(cr.bottom - parseFloat(cs.paddingBottom)).toFixed(1) : null,
    transportTop: dock ? +dock.getBoundingClientRect().top.toFixed(1) : null,
  };
};

async function cell(route, w, h, theme, facetLabel, prep) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const seed = prep === pickMatrix ? { selectedControl: "matrix-controls", selectedAnimation: "Matrix" } : prep === applyCss ? { selectedControl: "keyframes" } : null;
  if (seed) await ctx.addInitScript((s) => { try { localStorage.setItem("animation-groups-control-options-store", JSON.stringify({ cube: { ...s, isControlsPanelOpen: true } })); } catch {} }, seed);
  const p = await ctx.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 160)));
  await p.goto(base + "/#/" + route);
  await p.waitForSelector(".controls-pane", { timeout: 60000, state: "attached" });
  await p.waitForTimeout(3500);
  let tag = route;
  if (prep === pickMatrix) tag += "-matrix";
  else if (prep) tag += "-" + (await prep(p));
  if (w < 1024) { // open the sheet to its OPEN rung so the body scrolls
    const grip = p.locator("[data-slot=sheet-content] [role=slider], [data-slot=sheet-grip]").first();
    if (await grip.count()) { await grip.focus(); await p.keyboard.press("ArrowUp"); await p.waitForTimeout(900); }
  }
  const r = { route: tag, w, h, theme, ...(await p.evaluate(read, facetLabel)), errs };
  await p.screenshot({ path: `${dir}/frames/${label}-${tag}-${w}-${theme}.png` });
  out.cells.push(r);
  await ctx.close();
}
const pickMatrix = "matrix"; // seeded through the persisted control store (the dock Select is not driven headless)
const applyCss = async (p) => {
  await p.waitForTimeout(2500);
  const btn = p.getByRole("button", { name: /Apply CSS/ }).first();
  const before = await btn.getAttribute("aria-pressed");
  await btn.click(); await p.waitForTimeout(500);
  out.applyCss = { before, after: await btn.getAttribute("aria-pressed") };
  await btn.click(); await p.waitForTimeout(300);
  return "keyframes";
};
for (const theme of ["light", "dark"]) {
  await cell("easing", 1440, 900, theme, "Curve");
  await cell("cube", 1440, 900, theme, "Matrix", pickMatrix);
}
await cell("spring", 1440, 900, "light", "Physics");
for (const r of ["easing", "spring"]) await cell(r, 1024, 768, "light", r === "easing" ? "Curve" : "Physics");
await cell("cube", 1440, 900, "light", null);           // Controls surface: the curve trigger glyph
await cell("cube", 1440, 900, "light", null, applyCss);  // the ribbon verb through the command seam
await cell("square", 1440, 900, "light", null);
for (const theme of ["light", "dark"]) await cell("easing", 390, 844, theme, "Curve");
await cell("square", 390, 844, "light", null);
out.loadEnd = loadavg()[0].toFixed(2);
writeFileSync(`${dir}/${label}.json`, JSON.stringify(out, null, 1));
await b.close();
for (const c of out.cells) console.log(`${c.route}@${c.w}/${c.theme}: ports=${JSON.stringify(c.ports.map((x) => [x.cls.slice(0, 16), x.over ? "over" : "fit", x.fading ? "FS" : "local", x.mask ? "mask" : "-"]))} fadeCls=${c.fadeClassEls} panel=${c.panelLabel}/${c.facetExpected} cards=${c.cardsInPane} cartoon=${c.frameCartoon} trig=${JSON.stringify(c.trigger)} preset=${c.presetSelects} copy=${c.copyButtons.length} stage=${c.stageContentBottom}/${c.transportTop} errs=${c.errs.length}`);
console.log("applyCss", JSON.stringify(out.applyCss), "load", out.loadStart, out.loadEnd);
