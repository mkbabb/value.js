// CHALLENGE-C probe 03 — mechanism of the WebKit tan(atan2(<rem>,<rem>)) defect
// + does the plain length/length division (css-values-4) work cross-engine?
import { webkit, chromium } from "playwright";
const CASES = [
  ["tan(atan2(1rem, 1rem))          identity requires 1",       "calc(tan(atan2(1rem, 1rem)))"],
  ["tan(atan2(2rem, 1rem))          identity requires 2",       "calc(tan(atan2(2rem, 1rem)))"],
  ["tan(atan2(1.618rem, 2.618rem))  identity requires 0.618029","calc(tan(atan2(1.618rem, 2.618rem)))"],
  ["tan(atan2(1em, 1em))            identity requires 1",       "calc(tan(atan2(1em, 1em)))"],
  ["tan(atan2(10px, 10px))          identity requires 1",       "calc(tan(atan2(10px, 10px)))"],
  ["CURE-A calc(1.618rem / 2.618rem)  length/length -> number", "calc(1.618rem / 2.618rem)"],
  ["CURE-A' calc(1rem / 1rem)",                                  "calc(1rem / 1rem)"],
];
for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await eng.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.setContent("<div id=t style='font-size:16px'>x</div>");
  const out = await p.evaluate((cases) => {
    const el = document.getElementById("t");
    return cases.map(([label, expr]) => {
      el.style.transform = "";
      el.style.setProperty("--v", expr);
      el.style.transform = "scale(var(--v))";
      return [label, getComputedStyle(el).transform];
    });
  }, CASES);
  console.log(`\n===== ${name} =====`);
  for (const [k, v] of out) console.log(`  ${k.padEnd(60)} -> ${v}`);
  await b.close();
}
// deg/rad-confusion hypothesis, in plain JS
const r = Math.atan2(1.618, 2.618);            // radians
const d = r * 180 / Math.PI;                   // the angle WebKit's atan2 yields, in deg
console.log(`\nhypothesis: WebKit feeds atan2's DEGREE magnitude to tan() as RADIANS`);
console.log(`  atan2 = ${r} rad = ${d} deg ; tan(${d} as radians) = ${Math.tan(d)}`);
console.log(`  measured WebKit value                              = 0.310808`);
for (const [y,x] of [[1,1],[2,1]]) {
  const dd = Math.atan2(y,x)*180/Math.PI;
  console.log(`  atan2(${y},${x}) = ${dd} deg ; tan(deg-as-rad) = ${Math.tan(dd)}`);
}
