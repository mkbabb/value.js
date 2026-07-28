import { chromium } from "playwright";
const b = await chromium.launch();
const res = {};
for (const [k, opts] of Object.entries({
  normal: { viewport: { width: 1440, height: 900 } },
  reduced: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
  rtl: { viewport: { width: 1440, height: 900 }, locale: "ar" },
})) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/", { waitUntil: "load" });
  await p.waitForSelector(".glass-dock"); await p.waitForTimeout(900);
  if (k === "rtl") await p.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
  await p.waitForTimeout(400);
  res[k] = await p.evaluate(() => {
    const l = document.querySelector(".dock-status-lamp");
    if (!l) return "absent";
    const d = l.querySelector(".lamp-dot"); const cs = getComputedStyle(l); const dc = getComputedStyle(d);
    const r = l.getBoundingClientRect();
    // sr-only availability check
    const probe = document.createElement("span"); probe.className = "sr-only"; document.body.appendChild(probe);
    const sr = getComputedStyle(probe); const srOk = sr.position === "absolute" && sr.width === "1px";
    probe.remove();
    return {
      fontSize: cs.fontSize, borderRadius: cs.borderRadius, dotRadius: dc.borderRadius,
      dotOpacityNow: dc.opacity, anims: d.getAnimations().map(a => ({ n: a.animationName, s: a.playState })),
      box: [+r.x.toFixed(1), +r.width.toFixed(1)], dir: document.documentElement.dir || "ltr",
      srOnlyWorks: srOk,
      borderColor: cs.borderColor, bg: cs.backgroundColor,
    };
  });
  await ctx.close();
}
console.log(JSON.stringify(res, null, 2));
await b.close();
