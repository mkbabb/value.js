// SERVED MODEL: claude-opus-5-5
// X.W12U.h (RESUME 2, 2026-10-13) — the A2-VA-L3-5 verdict restated beside gate-l35.mjs (E-3) for
// two contracts that landed after it:
//  (a) X-DS pass 3 (V3C-03) floors the follower's WRAPPER (`--pane-follow-floor`) and pass 7
//      (V7C-04) sizes its CARD to content inside it. The plate a reader sees is the card, so the
//      limb reads the card: the companion's plate is never taller than the stage's region.
//  (b) an empty state that is one SECTION of a companion (Mix "Saved palettes") has painted
//      controls under it. The limb is the dead band: an empty plate is RED only when the ground
//      between it and the card floor is unpainted (emptyFillGap > 24 AND dead > 24).
//  (c) unchanged: the /blob stage is not stretched over dead ground (stage wrapper − card ≤ 48).
export const l35ok = (cells, W) => W < 1024 || Object.entries(cells).every(([route, c]) => {
    const s = c.stage, i = c.inspector;
    if (!s || !i) return true;
    if (i.cardH > s.wrapH + 2) return false;
    if (i.emptyFillGap !== null && i.emptyFillGap > 24 && i.dead > 24) return false;
    if (route === "/blob" && s.wrapH - s.cardH > 48) return false;
    return true;
});
if (process.argv[1] && process.argv[1].endsWith("gate-l35b.mjs")) {
    const { readFileSync } = await import("node:fs");
    for (const f of process.argv.slice(2)) { const r = JSON.parse(readFileSync(f, "utf8")); const c = r.arms["L3-5"]; console.log(f.split("/").pop(), c ? (l35ok(c, r.W) ? "GREEN" : "RED") : "n/a"); }
}
