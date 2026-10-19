// SERVED MODEL: claude-opus-5-5 — X.W7L.v: one line per row per run, read from the settled probe JSON.
// Usage: node v-summarize.mjs v-probe-r1.json v-probe-r2.json
import { readFileSync } from "node:fs";
const f = (m) => m && `widths ${m.widthSeq?.join("→")} · ${m.distinctWidths} distinct · final at ${m.settleMs} ms · blur ${m.framesBlur} · scaledText ${m.framesScaledText}`;
for (const p of process.argv.slice(2)) {
    const r = JSON.parse(readFileSync(p, "utf8"));
    const c = r.coarse390 ?? {}, l = r.land844 ?? {};
    const rows = {
        renderer: r.renderer,
        "O-57 R-2 cartoon cascade": JSON.stringify(r.cartoon),
        "O-62 plate light": `${r.dockPlateLight?.bg} · ${r.dockPlateLight?.backdrop}`,
        "O-62 plate dark": `${r.dockPlateDark?.bg} · ${r.dockPlateDark?.backdrop}`,
        "O-56 G-3 blob idle diffs": r.blobIdleDiffs?.join(", "),
        "DOCK-MORPH-ROOT collapse": f(r.dockCollapseMorph),
        "DOCK-MORPH-ROOT toggle 1": f(r.dockMorph?.first),
        "DOCK-MORPH-ROOT toggle 2": f(r.dockMorph?.second),
        "O-63 row / room": `${r.o63?.clipRow?.overflow} pad ${r.o63?.clipRow?.padBlock} · trigger "${r.o63?.trigger?.label}" h ${r.o63?.trigger?.h} · room ${r.o63?.roomAbove}/${r.o63?.roomBelow} · open-state room ${(r.o63?.selectOpenRoom?.top - r.o63?.clipRow?.top).toFixed(1)}/${(r.o63?.clipRow?.bottom - r.o63?.selectOpenRoom?.bottom).toFixed(1)} · focus ${JSON.stringify(r.o63?.focusRing)}`,
        "O-66 select": `trigger ${JSON.stringify(r.o66?.trigger)} · checked ${r.o66?.options?.checked?.bg} · highlighted ${r.o66?.options?.highlighted?.bg} · content ${r.o66?.options?.content?.bg}`,
        "O-80 drag": `frames ${r.o80?.frames} p50 ${r.o80?.p50} p95 ${r.o80?.p95} · LoAF ${r.o80?.loafCount} · glass/dock forced layout ${r.o80?.glassDockForcedLayoutMs} ms · top ${r.o80?.topForcedLayout?.slice(0, 2).map((t) => `${t.k}=${t.layout}ms`).join("; ")}`,
        "O-65 collapsed": JSON.stringify(r.o65),
        "O-67 docks": JSON.stringify(r.o67),
        "L2-6 dock hit (390 coarse)": `coarse ${c.pointerCoarse} · view ${c.selectView?.w}x${c.selectView?.h} slop ${c.selectView?.slop?.w}x${c.selectView?.slop?.h} · toggle ${c.toggleActionBar?.w}x${c.toggleActionBar?.h} slop ${c.toggleActionBar?.slop ? "yes" : "none"} · menu ${c.menu?.w}x${c.menu?.h} slop ${c.menu?.slop?.w}x${c.menu?.slop?.h}`,
        "L2-9 control floor": `--control-floor ${c.controlFloor} · space title h ${c.spaceTitle?.h} · mix "${c.mixSegment?.text}" h ${c.mixSegment?.h} · generate name h ${c.generateName?.h}`,
        "L3-6 control text": `--control-text ${c.controlText} · space title font ${c.spaceTitle?.font} · generate name font ${c.generateName?.font} · mix font ${c.mixSegment?.font}`,
        "L3-1 ladder (/nope 390)": `--type-display-1 ${c.headlineLadder?.display1} · --type-heading ${c.headlineLadder?.heading} · ${JSON.stringify(c.headlineLadder?.rows)}`,
        "L2-1 filters (844x390)": JSON.stringify(l.filters),
        "L2-3 overlays (844x390)": `--overlay-max-block ${l.overlayMaxBlock} · menu h ${l.menu?.h} gapB ${l.menu?.bottomGap} scroll ${l.menu?.scrollH}/${l.menu?.clientH} · view h ${l.viewSelect?.h} gapB ${l.viewSelect?.bottomGap} · space h ${l.spaceSelect?.h} gapB ${l.spaceSelect?.bottomGap}`,
        "L2-7 360 toggle": JSON.stringify(r.phone360),
        "L3-3 row (/atmosphere 1440)": JSON.stringify(r.l33),
        "L1-2 condense rules served": JSON.stringify(r.condenseRules),
        "L2-12 safe-area served": `${JSON.stringify(r.safeAreaRules)} · ${r.safeAreaSources?.map((s) => s.split(" :: ")[0]).join(", ")}`,
        pageErrors: JSON.stringify(r.pageErrors),
    };
    console.log(`## ${p} (${r.at})`);
    for (const [k, v] of Object.entries(rows)) console.log(`- ${k}: ${v}`);
}
