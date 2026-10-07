// SERVED MODEL: claude-opus-5-5
// X.W12U.h — the A2-VA-L3-5 verdict over one cell's raw readings (shared by probe-h.mjs and the
// offline re-read of banked results: node gate-l35.mjs <result.json>...).
export const l35ok = (cells, W) => W < 1024 || Object.entries(cells).every(([route, c]) => {
    const s = c.stage, i = c.inspector;
    if (!s || !i) return true;
    if (i.wrapH > s.wrapH + 2) return false;
    if (i.emptyFillGap !== null && i.emptyFillGap > 24) return false;
    if (route === "/blob" && s.wrapH - s.cardH > 48) return false;
    return true;
});
if (process.argv[1] && process.argv[1].endsWith("gate-l35.mjs")) {
    const { readFileSync } = await import("node:fs");
    for (const f of process.argv.slice(2)) { const r = JSON.parse(readFileSync(f, "utf8")); const c = r.arms["L3-5"]; console.log(f.split("/").pop(), c ? (l35ok(c, r.W) ? "GREEN" : "RED") : "n/a"); }
}
