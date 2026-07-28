import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const cases = [
  ["oklch", "oklch(0.6 0.25 30)",  "high chroma"],
  ["oklch", "oklch(0.6 0.08 30)",  "at the 0.08 floor"],
  ["oklch", "oklch(0.6 0.02 30)",  "below the floor"],
  ["oklch", "oklch(0.6 0 30)",     "zero chroma"],
  ["rgb",   "rgb(128 128 128)",    "achromatic grey (H powerless)"],
];
const rows = [];
for (const [space, color, label] of cases) {
  await p.goto(`http://localhost:9000/#/?space=${space}&color=${encodeURIComponent(color)}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  const r = await p.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const wrap = document.querySelector(".markdown-wrapper");
    const cs = wrap ? getComputedStyle(wrap) : null;
    return {
      accentLive: root.getPropertyValue("--accent-live").trim(),
      mdH2: cs ? cs.getPropertyValue("--md-color-h2").trim() : "(no wrapper)",
      h2Rendered: (()=>{const h=document.querySelector(".markdown-body > h2");return h?getComputedStyle(h).color:null;})(),
    };
  });
  rows.push({ label, input: color, ...r, identical: r.accentLive === r.mdH2 });
}
console.log(JSON.stringify(rows, null, 2));
await b.close();
