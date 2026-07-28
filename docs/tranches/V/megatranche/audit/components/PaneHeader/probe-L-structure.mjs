import { webkit, chromium } from "playwright";

const read = (p) => p.evaluate(() => {
  const t = document.querySelector(".pane-header-title");
  const h = document.querySelector(".pane-header");
  if (!t || !h) return { missing: true };
  const cs = getComputedStyle(h);
  const ts = getComputedStyle(t);
  const be = getComputedStyle(h, "::before");
  const r = t.getBoundingClientRect();
  const hr = h.getBoundingClientRect();
  return {
    ratioVar: cs.getPropertyValue("--pane-title-shrink-ratio").trim(),
    typeHeading: cs.getPropertyValue("--type-heading").trim(),
    typeDisplay1: cs.getPropertyValue("--type-display-1").trim(),
    titleFontSize: ts.fontSize,
    titleTransform: ts.transform,
    titleOrigin: ts.transformOrigin,
    titleRect: { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) },
    headerRect: { l: Math.round(hr.left), r: Math.round(hr.right), w: Math.round(hr.width) },
    veilOpacity: be.opacity,
    veilRadius: be.borderTopLeftRadius,
    headerRadius: cs.borderTopLeftRadius,
    headings: { h1: document.querySelectorAll("h1").length, h2: document.querySelectorAll("h2").length,
                h3: document.querySelectorAll("h3").length, main: document.querySelectorAll("main").length },
    hostHasClass: !!t.closest(".pane-scroll-fade"),
    supportsSDA: CSS.supports("animation-timeline", "scroll()"),
    tagName: t.tagName,
  };
});

const scroll = (p) => p.evaluate(() => {
  const host = document.querySelector(".pane-scroll-fade");
  if (host) host.scrollTop = 200;
  window.scrollTo(0, 200);
});

for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await eng.launch();
  for (const [dir, vw] of [["ltr", 1440], ["rtl", 1440], ["ltr", 390]]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: 900 } });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/about", { waitUntil: "networkidle", timeout: 45000 });
    if (dir === "rtl") await p.evaluate(() => { document.documentElement.dir = "rtl"; });
    await p.waitForTimeout(1500);
    const before = await read(p);
    await scroll(p); await p.waitForTimeout(800);
    const after = await read(p);
    console.log(JSON.stringify({ eng: name, dir, vw, before, after }, null, 0));
    await ctx.close();
  }
  await b.close();
}
