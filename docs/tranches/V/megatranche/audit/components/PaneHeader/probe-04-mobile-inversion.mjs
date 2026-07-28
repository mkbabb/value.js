// CHALLENGE-C probe 04 — the phone band. The file claims (PaneHeader.vue:136-138)
// the shrink "degenerat[es] to exactly 1 on phones where display-1 floor-pins AT
// heading (the shrink self-neutralizes)". Measure it on the real engine phones run.
import { webkit, chromium, devices } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaneHeader";
for (const [name, eng] of [["webkit(iPhone 14)", webkit], ["chromium(Pixel 7)", chromium]]) {
  const b = await eng.launch();
  const dev = name.startsWith("webkit") ? devices["iPhone 14"] : devices["Pixel 7"];
  const ctx = await b.newContext({ ...dev, defaultBrowserType: undefined });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(2500);
  const read = () => {
    const hdr = [...document.querySelectorAll("main .pane-header")].find(e => e.offsetParent !== null);
    if (!hdr) return "NO-HEADER";
    const t = hdr.querySelector(".pane-header-title");
    const cs = getComputedStyle(t), h = hdr.getBoundingClientRect(), tr = t.getBoundingClientRect();
    return {
      typeHeading: getComputedStyle(document.documentElement).getPropertyValue("--type-heading").trim(),
      titleFontSizePx: cs.fontSize,
      transform: cs.transform,
      titleRect: { w: +tr.width.toFixed(1), h: +tr.height.toFixed(1), top: +tr.top.toFixed(1), bottom: +tr.bottom.toFixed(1), right: +tr.right.toFixed(1) },
      headerRect: { w: +h.width.toFixed(1), h: +h.height.toFixed(1), top: +h.top.toFixed(1), bottom: +h.bottom.toFixed(1) },
      overflowsHeaderBy: +(tr.bottom - h.bottom).toFixed(1),
    };
  };
  const rest = await p.evaluate(read);
  await p.evaluate(() => {
    const host = [...document.querySelectorAll("main .pane-scroll-fade")].find(e => e.offsetParent !== null && e.scrollHeight > e.clientHeight);
    if (host) host.scrollTop = 200; else window.scrollTo(0, 200);
  });
  await p.waitForTimeout(700);
  const stuck = await p.evaluate(read);
  console.log(`\n===== ${name} viewport ${JSON.stringify(p.viewportSize())} =====`);
  console.log("  REST :", JSON.stringify(rest));
  console.log("  STUCK:", JSON.stringify(stuck));
  await p.screenshot({ path: `${OUT}/shot-${name.split("(")[0]}-mobile-gradient-scrolled.png` });
  await b.close();
}
