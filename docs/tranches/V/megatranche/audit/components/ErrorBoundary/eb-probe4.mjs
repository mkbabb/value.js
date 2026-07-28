import { webkit } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence";
const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;
const b = await webkit.launch();
for (const [name, opts] of [
  ["EB12-cured-dark-1440", { viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 }],
  ["EB13-cured-mobile-390-light", { viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 3, isMobile: true, hasTouch: true }],
]) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  await p.route(DOC_RE, (r) => r.abort("failed"));
  await p.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(8500);
  if (opts.isMobile) {
    await p.evaluate(() => { const h = document.querySelector(".dock-mobile-panes"); const bs = h && [...h.querySelectorAll("button")]; bs && bs[bs.length - 1].click(); });
    await p.waitForTimeout(4000);
  }
  const ok = await p.evaluate(() => { const eb = document.querySelector(".vj-error-boundary"); if (!eb) return false; eb.style.position = "relative"; return true; });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log(name, "boundary:", ok);
  await ctx.close();
}
await b.close();
