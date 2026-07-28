// CHALLENGE-C probe 02 — isolate the tan(atan2(<length>,<length>)) engine divergence.
import { webkit, chromium } from "playwright";
const CASES = [
  ["designed  tan(atan2(1.618rem, clamp(1.618rem,1.2rem+1.6vw,2.618rem)))", "calc(tan(atan2(1.618rem, clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem))))"],
  ["no clamp  tan(atan2(1.618rem, 2.618rem))",                              "calc(tan(atan2(1.618rem, 2.618rem)))"],
  ["px        tan(atan2(25.888px, 41.888px))",                              "calc(tan(atan2(25.888px, 41.888px)))"],
  ["unitless  tan(atan2(1.618, 2.618))",                                    "calc(tan(atan2(1.618, 2.618)))"],
  ["plain div tan(atan2(1,2))",                                             "calc(tan(atan2(1, 2)))"],
  ["ratio     calc(1.618rem / 2.618rem)  [the KISS form]",                  "calc(1.618 / 2.618)"],
  ["angle only atan2(1.618rem, 2.618rem)",                                  "atan2(1.618rem, 2.618rem)"],
];
for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await eng.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.setContent("<div id=t>x</div>");
  const out = await p.evaluate((cases) => {
    const el = document.getElementById("t");
    const res = {};
    for (const [label, expr] of cases) {
      el.style.setProperty("--v", expr);
      // register nothing: read via a transform to force numeric resolution
      el.style.transform = `scale(var(--v))`;
      res[label] = { computedVar: getComputedStyle(el).getPropertyValue("--v").trim().replace(/\s+/g," "), transform: getComputedStyle(el).transform };
    }
    res["__rootFontSize"] = getComputedStyle(document.documentElement).fontSize;
    res["__vw"] = window.innerWidth;
    return res;
  }, CASES);
  console.log(`\n===== ${name}  (root ${out.__rootFontSize}, vw ${out.__vw}) =====`);
  for (const [k, v] of Object.entries(out)) { if (k.startsWith("__")) continue;
    console.log(`  ${k.padEnd(66)} -> ${v.transform}`); }
  await b.close();
}
