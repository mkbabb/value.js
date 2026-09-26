// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · at-HEAD readings (:9000), no edit by this seat:
//   153  glass-chip.css reaches the page on 10.1.0: the sheets carry `.glass-chip` rules
//   65   the body face is REAL and bold renders bold: a loaded 'Plus Jakarta Sans' face, 700 measurably wider than 400
// Usage: node probe-at-head.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { timeout: 90000 });
await p.waitForTimeout(4000);
const r = await p.evaluate(async () => {
    let chip = 0;
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; } const walk = (rs) => { for (const x of rs) { if (x.selectorText && /\.glass-chip/.test(x.selectorText)) chip++; if (x.cssRules) walk(x.cssRules); } }; walk(rules); }
    await document.fonts.ready;
    const faces = [...document.fonts].filter((f) => /Plus Jakarta Sans/.test(f.family) && f.status === "loaded").map((f) => f.weight);
    const span = (w) => { const e = document.createElement("span"); e.style.cssText = `font: ${w} 20px 'Plus Jakarta Sans'; position:absolute; white-space:nowrap`; e.textContent = "Perceptual uniformity"; document.body.append(e); const x = e.getBoundingClientRect().width; e.remove(); return x; };
    const widths = { w400: span(400), w700: span(700) };
    return { widths, chipRules: chip, jakartaLoaded: faces, w700: document.fonts.check("700 16px 'Plus Jakarta Sans'"), w400: document.fonts.check("400 16px 'Plus Jakarta Sans'") };
});
const out = [];
out.push(`${r.chipRules > 0 ? "PASS" : "RED "} 153 ${JSON.stringify({ chipRules: r.chipRules })}`);
// bold must RENDER bold: the 700 run is measurably wider than the 400 run (a face that ignores weight renders them equal)
out.push(`${r.jakartaLoaded.length > 0 && r.widths.w700 > r.widths.w400 * 1.03 ? "PASS" : "RED "} 65 ${JSON.stringify({ loaded: r.jakartaLoaded, widths: r.widths })}`);
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
