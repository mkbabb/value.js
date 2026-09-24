// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.c — the served half of the census: on every scene route, after Play,
// list every visible small round element (a "ball": <= 28 px, radius >= 40 %, or an
// svg <circle>) whose centre moves over 400 ms, with its nearest visible svg <path>
// (distance in CSS px, and that path's owner). Finds any moving marker the grep missed.
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:5173";
const ROUTES = ["#/", "#/cube", "#/amiga", "#/easing", "#/spring", "#/sequence", "#/square"];
const snap = () => {
    const out = [];
    const sel = (e) => `${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 3).join(".")}`;
    for (const e of document.querySelectorAll("body *")) {
        const r = e.getBoundingClientRect();
        if (!r.width || r.width > 28 || r.height > 28 || r.width < 3) continue;
        const round = e.tagName.toLowerCase() === "circle" || parseFloat(getComputedStyle(e).borderRadius) >= r.width * 0.4;
        if (!round) continue;
        let owner = e.parentElement; for (let k = 0; k < 4 && owner && !owner.classList.length; k++) owner = owner.parentElement;
        out.push({ key: sel(e) + "@" + (owner ? sel(owner) : ""), cx: r.x + r.width / 2, cy: r.y + r.height / 2, i: out.length });
    }
    return out;
};
const nearest = (pts) => pts.map((p) => {
    let best = Infinity, who = null;
    for (const path of document.querySelectorAll("svg path")) {
        const b = path.getBoundingClientRect(); if (!b.width && !b.height) continue;
        if (p.cx < b.left - 80 || p.cx > b.right + 80 || p.cy < b.top - 80 || p.cy > b.bottom + 80) continue;
        const m = path.getScreenCTM(), L = path.getTotalLength();
        for (let i = 0; i <= 200; i++) { const q = path.getPointAtLength((L * i) / 200);
            const d = Math.hypot(m.a * q.x + m.c * q.y + m.e - p.cx, m.b * q.x + m.d * q.y + m.f - p.cy);
            if (d < best) { best = d; who = (path.closest("svg")?.getAttribute("class") ?? "svg"); } }
    }
    return { ...p, nearestPath: who, dist: best === Infinity ? null : +best.toFixed(1) };
});
const b = await chromium.launch({ headless: false });
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
const res = {};
for (const r of ROUTES) {
    await page.goto(`${BASE}/${r}`, { waitUntil: "networkidle" }); await page.waitForTimeout(1800);
    const play = page.getByRole("button", { name: "Play animation", exact: true }).first();
    if (await play.isVisible().catch(() => false)) await play.click();
    await page.waitForTimeout(500);
    const a = await page.evaluate(snap); await page.waitForTimeout(400); const c = await page.evaluate(snap);
    const moving = c.filter((p, k) => a[k] && a[k].key === p.key && Math.hypot(a[k].cx - p.cx, a[k].cy - p.cy) > 0.5);
    const withPath = await page.evaluate(`(${nearest.toString()})(${JSON.stringify(moving)})`);
    const agg = {};
    for (const m of withPath) { const g = (agg[m.key] ??= { n: 0, nearestPath: m.nearestPath, minDist: m.dist, maxDist: m.dist });
        g.n++; if (m.dist != null) { g.minDist = Math.min(g.minDist ?? m.dist, m.dist); g.maxDist = Math.max(g.maxDist ?? m.dist, m.dist); } }
    res[r] = agg;
}
console.log(JSON.stringify(res, null, 1));
await b.close();
