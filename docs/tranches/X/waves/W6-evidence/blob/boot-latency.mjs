// SERVED MODEL: claude-opus-5-5[1m]
// X.W6.h §0ax — goo-blob-canvas mount latency, navigation → attached → visible (read-only probe)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const origin = process.argv[2], label = process.argv[3], navs = Number(process.argv[4] ?? 3);
const seed = "lab(92% 88.8 20)";
const browser = await chromium.launch();
for (let n = 1; n <= navs; n++) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(`${origin}/#/?space=oklch&color=${encodeURIComponent(seed)}`, { waitUntil: "commit", timeout: 120000 });
  const loc = page.locator('[data-testid="goo-blob-canvas"]').last();
  await loc.waitFor({ state: "attached", timeout: 120000 }); const tA = Date.now() - t0;
  await loc.waitFor({ state: "visible", timeout: 120000 }); const tV = Date.now() - t0;
  const facts = await page.evaluate(() => {
    const cvs = [...document.querySelectorAll('[data-testid="goo-blob-canvas"]')];
    const cv = cvs.at(-1); const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime;
    return { count: cvs.length, inHero: !!cv?.closest(".hero-blob-anchor"), fcp: fcp ? Math.round(fcp) : null };
  });
  console.log(`[boot] ${label} nav ${n}: attached ${tA} ms · visible ${tV} ms · FCP ${facts.fcp} ms · canvases ${facts.count} · inside .hero-blob-anchor ${facts.inHero}`);
  await ctx.close();
}
await browser.close();
