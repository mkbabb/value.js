import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const FIND = `
(() => {
  const root = document.querySelector('#app') || document.body.firstElementChild;
  const app = root && root.__vue_app__; if (!app) return null;
  const out = []; const seen = new Set();
  function vn(v, d) { if (!v || d > 60) return;
    if (Array.isArray(v)) return v.forEach(x => vn(x, d));
    if (v.component) inst(v.component, d + 1);
    if (v.children && typeof v.children === 'object') vn(v.children, d + 1);
    if (v.dynamicChildren) vn(v.dynamicChildren, d + 1);
    if (v.suspense) vn(v.suspense.activeBranch, d + 1); }
  function inst(i, d) { if (!i || seen.has(i) || d > 60) return; seen.add(i); out.push(i); vn(i.subTree, d + 1); }
  inst(app._instance, 0); return out; })()`;

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await p.waitForTimeout(4500);
await p.evaluate(`window.__WB = ${FIND};`);

// --- 1. CSSOM: are the collapsible animation classes defined anywhere? ---
const css = await p.evaluate(() => {
  const names = ["collapsible-down", "collapsible-up", "dashed-well", "section-label", "vj-enter-enter-active", "add-slot-ghost"];
  const hits = Object.fromEntries(names.map((n) => [n, []]));
  const kf = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs) => {
      for (const r of rs) {
        if (r.cssRules) walk(r.cssRules);
        if (r.type === CSSRule.KEYFRAMES_RULE) kf.push(r.name);
        const sel = r.selectorText;
        if (!sel) continue;
        for (const n of names) if (sel.includes(n)) hits[n].push(sel.slice(0, 90));
      }
    };
    walk(rules);
  }
  return { hits: Object.fromEntries(Object.entries(hits).map(([k, v]) => [k, v.length ? v.slice(0, 3) : "«UNDEFINED»"])),
    keyframesWithCollapsible: kf.filter((n) => /collaps|accordion/i.test(n)), totalKeyframes: kf.length };
});
console.log("=== CSSOM ===");
console.log(JSON.stringify(css, null, 1));

// --- 2. inject saved palettes into the library port ---
const inj = await p.evaluate(() => {
  const inst = window.__WB.find((i) => i.setupState && i.setupState.savedPalettes && i.setupState.pm);
  const mss = window.__WB.find((i) => i.type && (i.type.__name === "MixSourceSelector"));
  const target = mss || inst;
  if (!target) return "no MixSourceSelector";
  const pm = target.setupState.pm;
  if (!pm || !pm.savedPalettes) return "no pm";
  const mk = (name, slug, n) => ({
    id: slug, slug, name, colors: Array.from({ length: n }, (_, i) => ({
      css: `oklch(${60 + i * 3}% 0.16 ${(i * 47) % 360})`, position: i })),
    createdAt: Date.now(), updatedAt: Date.now(),
  });
  pm.savedPalettes.value = [
    mk("Sunset Vibes", "sunset-vibes", 5),
    mk("A Really Rather Long Palette Name That Will Certainly Truncate", "long-name", 12),
    mk("Deep Sea", "deep-sea", 3),
  ];
  return "ok:" + pm.savedPalettes.value.length;
});
console.log("INJECT PALETTES ->", inj);
await p.waitForTimeout(800);
await p.screenshot({ path: `${OUT}/WBMSS-palettes-collapsed.png` });

// open the "From palettes" disclosure
const openInfo = await p.evaluate(() => {
  const trg = [...document.querySelectorAll("*")].find((e) => e.textContent.trim().startsWith("From palettes") && e.getAttribute("data-state"));
  if (!trg) return "no trigger";
  trg.click();
  return { tag: trg.tagName, state: trg.getAttribute("data-state") };
});
console.log("TRIGGER:", JSON.stringify(openInfo));
await p.waitForTimeout(300);
const anim = await p.evaluate(() => {
  const c = document.querySelector("[data-state][class*=animate-collapsible]");
  if (!c) return "no content";
  const cs = getComputedStyle(c);
  return { animationName: cs.animationName, animationDuration: cs.animationDuration, state: c.getAttribute("data-state"),
    height: c.getBoundingClientRect().height };
});
console.log("COLLAPSIBLE CONTENT COMPUTED ANIMATION:", JSON.stringify(anim));
await p.waitForTimeout(900);
await p.screenshot({ path: `${OUT}/WBMSS-palettes-open.png`, fullPage: true });

const swatchBtns = await p.evaluate(() => {
  const content = document.querySelector("[class*=animate-collapsible]");
  if (!content) return "none";
  const dots = [...content.querySelectorAll("[data-testid=watercolor-swatch]")];
  return { count: dots.length, sample: dots.slice(0, 3).map((d) => ({
    tag: d.tagName, aria: d.getAttribute("aria-hidden"), ariaLabel: d.getAttribute("aria-label"),
    title: d.getAttribute("title"), pe: getComputedStyle(d).pointerEvents,
    w: +d.getBoundingClientRect().width.toFixed(0), h: +d.getBoundingClientRect().height.toFixed(0) })),
    focusablesInside: [...content.querySelectorAll("button,a[href],[tabindex]")].length };
});
console.log("PALETTE-DROPDOWN SWATCHES:", JSON.stringify(swatchBtns, null, 1));

// try clicking one palette swatch -> does it add an operand?
const beforeChips = await p.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
try { await p.locator("[class*=animate-collapsible] [data-testid=watercolor-swatch]").first().click({ force: true, timeout: 3000 }); }
catch (e) { console.log("swatch click err", String(e).split("\n")[0]); }
await p.waitForTimeout(600);
const afterChips = await p.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
console.log("PALETTE-SWATCH CLICK: chips", beforeChips, "->", afterChips);

// --- 3. remove-flash / key churn test ---
const churn = await p.evaluate(() => {
  const mp = window.__WB.find((i) => i.setupState && i.setupState.addColor && i.setupState.clearSelection);
  mp.setupState.clearSelection();
  ["#e11d48", "#0ea5e9", "#22c55e"].forEach((c, i) => mp.setupState.addColor(c, "picker"));
  return "seeded";
});
await p.waitForTimeout(600);
const idsBefore = await p.evaluate(() => [...document.querySelectorAll("[data-mix-source]")].map((e, i) => { e.__mark = "m" + i; return e.__mark; }));
await p.evaluate(() => {
  const mp = window.__WB.find((i) => i.setupState && i.setupState.removeColor);
  mp.setupState.removeColor(0);
});
await p.waitForTimeout(120);
const churnAfter = await p.evaluate(() => {
  const els = [...document.querySelectorAll("[data-mix-source]")];
  return { count: els.length, marks: els.map((e) => e.__mark ?? "«NEW NODE»"),
    leaving: document.querySelectorAll(".vj-enter-leave-active").length,
    entering: document.querySelectorAll(".vj-enter-enter-active,.vj-enter-enter-from").length };
});
console.log("KEY CHURN AFTER removeColor(0): before marks =", JSON.stringify(idsBefore), " after =", JSON.stringify(churnAfter));
await p.screenshot({ path: `${OUT}/WBMSS-remove-churn.png` });

// palettes-mode with palettes present
await p.evaluate(() => { const mp = window.__WB.find((i) => i.setupState && i.setupState.mode !== undefined && i.setupState.addColor); mp.setupState.mode = "palettes"; });
await p.waitForTimeout(800);
await p.screenshot({ path: `${OUT}/WBMSS-palettes-mode-populated.png`, fullPage: true });
const pmode = await p.evaluate(() => {
  const btns = [...document.querySelectorAll("button[aria-pressed]")];
  return btns.map((b) => ({ name: b.getAttribute("aria-label"), pressed: b.getAttribute("aria-pressed"),
    w: +b.getBoundingClientRect().width.toFixed(0), h: +b.getBoundingClientRect().height.toFixed(0),
    opacity: getComputedStyle(b).opacity, ring: getComputedStyle(b).boxShadow.slice(0, 70) }));
});
console.log("PALETTES MODE SEATS:", JSON.stringify(pmode, null, 1));

await b.close();
