import { createRequire } from "node:module"; import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [,, base, tag, outDir] = process.argv;
const pred = fs.readFileSync(new URL("./pred.js", import.meta.url), "utf8");
const views = (process.env.V || "sequence,easing,spring").split(",");
const sizes = (process.env.W || "1440x900,1024x768,390x844").split(",").map(s => s.split("x").map(Number));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
for (const v of views) for (const [w, h] of sizes) for (const t of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: t });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t) } catch {} }, t);
  const p = await ctx.newPage();
  await p.goto(base + "#/" + v, { waitUntil: "networkidle" });
  await p.waitForSelector(".stage-cell .card", { timeout: 30000 }); await p.waitForTimeout(2500);
  const r = await p.evaluate(`(${pred})(${JSON.stringify(v)})`);
  if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${v}-${w}-${t}.png` });
  res.push({ cell: `${v}@${w}/${t}`, ...r }); await ctx.close();
}
await b.close();
for (const r of res) console.log(`${r.cell.padEnd(22)} P1 ${r.P1?"GREEN":"RED  "} P2 ${r.P2?"GREEN":"RED  "} P3 ${r.P3?"GREEN":"RED  "} P4 ${r.P4?"GREEN":"RED  "}  prim=${r.primary}:${r.primaryArea} | glassEll=${(r.ellGlass||[]).length} clip=${(r.clip||[]).length} | ${[...r.square.slice(0,3), ...r.bigger.map(x=>">"+x.join(":")), ...r.ell, ...r.reg].join(" ; ").slice(0,400)}`);
fs.writeFileSync(`${tag}.json`, JSON.stringify(res, null, 1));
