// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.m (OA-64) — the stage-side panes: per scene, the outermost painted
// panel(s) inside `.stage-cell` (background / border / shadow / backdrop, >=150x60)
// and the stage cell's ancestor chain, at one viewport. Prints inset L/R + dC.
// Usage: node stage.mjs W H [light|dark]
import { chromium } from "playwright";
const [W, H, THEME] = [+process.argv[2], +process.argv[3], process.argv[4] || "light"];
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: W, height: H }, colorScheme: THEME, hasTouch: true, isMobile: true, deviceScaleFactor: 2 })).newPage();
for (const s of ["cube", "square", "amiga", "easing", "spring", "sequence"]) {
  await p.goto(`http://localhost:5173/#/${s}`, { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth, st = document.querySelector(".stage-cell"), out = [], chain = [];
    const f = (r) => `[${r.left.toFixed(1)},${r.right.toFixed(1)}] L${r.left.toFixed(1)} R${(vw - r.right).toFixed(1)} dC${((r.left + r.right) / 2 - vw / 2).toFixed(1)}`;
    for (let a = st; a && a !== document.body; a = a.parentElement) chain.push((a.className.toString().split(" ")[0] || a.tagName) + f(a.getBoundingClientRect()));
    for (const e of st?.querySelectorAll("*") ?? []) {
      const cs = getComputedStyle(e), r = e.getBoundingClientRect();
      if (r.width < 150 || r.height < 60) continue;
      const vis = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px" || cs.boxShadow !== "none" || cs.backdropFilter !== "none";
      if (vis && !out.some((o) => o.e.contains(e))) out.push({ e, s: e.className.toString().split(" ").slice(0, 3).join(".") + " " + f(r) });
    }
    return { chain: chain.slice(0, 5).join(" < "), panels: out.slice(0, 4).map((o) => o.s) };
  });
  console.log(s, JSON.stringify(r));
}
await b.close();
