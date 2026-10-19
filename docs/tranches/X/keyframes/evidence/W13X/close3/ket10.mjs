// SERVED MODEL: claude-opus-5-5
// KF.W13X close (COHESION §0ez): does the consumer reset KF-ET-10 (`.specimen-grid-group`:
// border-radius 0, background none, backdrop-filter none, box-shadow none) still change any
// computed style on glass 10.1.0? Read the group's computed style as served, then remove the
// four reset declarations from the served CSSOM rule and read again. Read-only on disk;
// headless real Chrome; browser closed in a finally.
// Usage: node ket10.mjs <base>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const base = process.argv[2];
const PROPS = ["border-radius", "background-color", "background-image", "backdrop-filter", "-webkit-backdrop-filter", "box-shadow"];
const b = await chromium.launch({ channel: "chrome", headless: true });
let changed = 0;
try {
  for (const t of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: t });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, t);
    const p = await ctx.newPage();
    await p.goto(base + "#/easing", { waitUntil: "networkidle" });
    await p.waitForSelector(".specimen-grid-group", { timeout: 60000, state: "attached" });
    await p.waitForTimeout(1500);
    const r = await p.evaluate((PROPS) => {
      const el = document.querySelector(".specimen-grid-group");
      const read = () => Object.fromEntries(PROPS.map((k) => [k, getComputedStyle(el).getPropertyValue(k)]));
      const before = read();
      const meta = { classes: el.className, dataType: el.getAttribute("data-type"), rules: 0, removed: [] };
      const RESET = ["border-radius", "background", "backdrop-filter", "-webkit-backdrop-filter", "box-shadow"];
      const walk = (rules) => { for (const ru of rules) {
        if (ru.cssRules && !ru.selectorText) walk(ru.cssRules);
        if (ru.selectorText && /(^|[\s,])\.specimen-grid-group(\[|$|[\s,{])/.test(ru.selectorText) && el.matches(ru.selectorText)) {
          meta.rules++;
          for (const k of RESET) { if (ru.style.getPropertyValue(k) !== "" || ru.style.getPropertyValue(k + "-color") !== "") { meta.removed.push(ru.selectorText + " { " + k + " }"); ru.style.removeProperty(k); } }
        } } };
      for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
      const after = read();
      const diff = PROPS.filter((k) => before[k] !== after[k]).map((k) => `${k}: ${before[k]} -> ${after[k]}`);
      return { meta, before, diff };
    }, PROPS);
    changed += r.diff.length;
    console.log(`${t}: rules=${r.meta.rules} removed=${JSON.stringify(r.meta.removed)} data-type=${r.meta.dataType}`);
    console.log(`${t}: served ${JSON.stringify(r.before)}`);
    console.log(`${t}: ${r.diff.length ? "RESET ACTS — " + r.diff.join(" · ") : "reset changes NOTHING (computed style identical without it)"}`);
    await ctx.close();
  }
} finally { await b.close(); }
console.log(`TOTAL changed-properties=${changed}`);
