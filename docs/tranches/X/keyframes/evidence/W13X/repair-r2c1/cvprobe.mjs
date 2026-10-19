// SERVED MODEL: claude-opus-5-5
// KF.W13X RESUME 2 Repair 1 — C1r2-2 AMIGA-CONTENT-VISIBILITY. Reads every console line
// "Rendering was performed in a subtree hidden by content-visibility" with its source
// (url:line:col) on (a) a cold load of #/amiga and (b) a dock swap cube → amiga, at 1440×900
// and 390×844. Headless real Chrome; browser closed in a finally.
// Usage: node cvprobe.mjs <base>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const base = process.argv[2];
const b = await chromium.launch({ channel: "chrome", headless: true });
let total = 0;
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    for (const leg of ["cold", "swap"]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } });
      const p = await ctx.newPage();
      const hits = [];
      p.on("console", (m) => {
        if (!/content-visibility/.test(m.text())) return;
        const l = m.location() || {};
        hits.push(`${m.type()} ${(l.url || "").replace(/^.*\//, "")}:${l.lineNumber}:${l.columnNumber}`);
      });
      await p.goto(base + (leg === "cold" ? "#/amiga" : "#/cube"), { waitUntil: "networkidle" });
      await p.waitForTimeout(2500);
      if (leg === "swap") {
        await p.evaluate(() => { location.hash = "#/amiga"; });
        await p.waitForTimeout(4000);
      }
      total += hits.length;
      console.log(JSON.stringify({ w, leg, cv: hits.length, sources: [...new Set(hits)] }));
      await ctx.close();
    }
  }
  console.log(`TOTAL cv-lines=${total}`);
} finally {
  await b.close();
}
