// SERVED MODEL: claude-opus-5[1m]
//
// M-13 baseline — how much of the viewport does each route actually use?
// Coverage = the union of visible leaf content boxes vs the viewport, plus <main> box + gutters.
//
// ── X.W5.b · EXTENDED PER A-5 ───────────────────────────────────────────────
// `layout-gestalt.md` §9 (rider A-5) keys every V·L1 behavioural gate to this
// probe "extended per A-5 — assert mode; `docScrollable`, `.pane-container`
// box + gridCols columns; routes += `#/atmosphere`, `#/palettes`,
// `#/admin/users`; arms += 320×568, 720×450@2". All five extensions land here
// and NOTHING the M-13 baseline printed is removed: the original eight columns
// still print, in the original order, so the 2026-07 readings stay comparable.
//
// The three gates this instrument carries (W5.md §6 unit b):
//   B1  mobile document scrolls — at 390×844, on every member route whose
//       content exceeds the viewport, documentElement.scrollHeight >
//       clientHeight. The predicate is measured, not assumed: a route whose
//       content genuinely fits is excluded BY THE PREDICATE, never by an
//       exception list.
//   B2  no block cap — getComputedStyle(scene band).maxHeight === 'none' at
//       3440×1440, re-run at 16/9 (2560×1440) and 21/9 (3440×1440) both. Both
//       the band (<main>) and the capped element (.pane-container) are read:
//       `--content-max-h` seated the cap on the container, and a gate that
//       read only <main> would have been green before the cure.
//   B3  block extent — scene-band occupied block extent ≥ 90 % at 3440×1440.
//       The extent is `.pane-container` height ÷ the scene band's own height
//       (608 ÷ 1341 = 45.4 % is the record's number, reproduced by this file).
//       THE PER-ROUTE BREAKDOWN, NOT THE MEAN, IS THE READING (W5.md:259) —
//       so `--assert` reports every route and never a single average.
//
// Usage:
//   node docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs
//   … --json     → one JSON document on stdout (the bankable artefact)
//   … --assert   → run B1/B2/B3 and exit non-zero on any breach
//   env: PROBE_BASE (default http://localhost:9000), PROBE_BROWSER
//        (webkit | chromium — webkit is the DEFAULT because the M-13/MT-F028
//        baseline this file's numbers are compared against was taken on it;
//        changing the engine silently would move the baseline).
import { webkit, chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://localhost:9000";
const ARGS = new Set(process.argv.slice(2));
const AS_JSON = ARGS.has("--json");
const ASSERT = ARGS.has("--assert");

// The M-13 seven, plus A-5's three. `#/admin/users` is a member route of the
// shell's own route table (router/index.ts) and is walked like any other.
const ROUTES = [
    "#/", "#/gradient", "#/browse", "#/blob", "#/generate", "#/mix", "#/extract",
    "#/atmosphere", "#/palettes", "#/admin/users",
];

// [name, width, height, deviceScaleFactor]. A-5's two new arms: 320×568 (the
// narrowest shipping phone) and 720×450@2 (≡ 1440×900 at 200 % browser zoom —
// the CSS viewport a zoom step produces, which is how the compound breakpoint
// is reached without a device).
const VIEWPORTS = [
    ["mobile-320", 320, 568, 1],
    ["mobile-390", 390, 844, 1],
    ["mobile-430", 430, 932, 1],
    ["zoom200-720", 720, 450, 2],
    ["tablet-768", 768, 1024, 1],
    ["desktop-1440", 1440, 900, 1],
    ["wide-2560", 2560, 1440, 1],
    ["ultrawide-3440", 3440, 1440, 1],
];

/** Everything one settled route says about its own block axis. */
function readLayout() {
    const vw = innerWidth, vh = innerHeight;
    const doc = document.documentElement;
    const main = document.querySelector("main") || document.body;
    const layout = document.querySelector(".app-layout");
    const pane = document.querySelector(".pane-container");
    const mr = main.getBoundingClientRect();

    // union of visible leaf boxes (content extent), sampled — the M-13 measure,
    // unchanged.
    let minX = vw, maxX = 0, minY = vh, maxY = 0, n = 0;
    for (const el of document.querySelectorAll("main *, nav *")) {
        if (el.children.length > 2) continue;
        const b = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        if (b.width < 4 || b.height < 4 || s.visibility === "hidden" || s.opacity === "0") continue;
        n++;
        minX = Math.min(minX, Math.max(0, b.left));
        maxX = Math.max(maxX, Math.min(vw, b.right));
        minY = Math.min(minY, Math.max(0, b.top));
        maxY = Math.max(maxY, Math.min(vh, b.bottom));
    }

    const box = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return {
            w: Math.round(r.width * 10) / 10,
            h: Math.round(r.height * 10) / 10,
            maxHeight: s.maxHeight,
            maxBlockSize: s.maxBlockSize,
            minBlockSize: s.minBlockSize,
            overflow: s.overflow,
            scrollH: el.scrollHeight,
            clientH: el.clientHeight,
        };
    };

    const paneBox = box(pane);
    const mainBox = box(main);
    const layoutBox = box(layout);

    // B3's FALSIFIER arm: "Fails if the surplus is absorbed by a stretched rack
    // instead of the scene." The rack box alone cannot answer that — a rack
    // stretched to the band with the same short content inside would read 100 %.
    // So the occupied extent is measured independently: the union of visible
    // leaf CONTENT boxes inside <main>, against the band's own height,
    // UNCLAMPED to the viewport (content taller than the band still counts).
    let oTop = Infinity, oBottom = -Infinity;
    for (const el of main.querySelectorAll("*")) {
        if (el.children.length > 2) continue;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        if (r.width < 4 || r.height < 4 || s.visibility === "hidden" || s.opacity === "0") continue;
        oTop = Math.min(oTop, r.top);
        oBottom = Math.max(oBottom, r.bottom);
    }
    const occupiedExtentPct =
        mainBox && mainBox.h > 0 && oBottom > oTop
            ? Math.round((oBottom - oTop) / mainBox.h * 1000) / 10
            : null;
    // gridCols = how many COLUMN TRACKS the rack actually resolved (the
    // computed value is a track list, e.g. "512px 512px" → 2). `none` → 0.
    const cols = pane ? getComputedStyle(pane).gridTemplateColumns : "none";
    const gridCols = !cols || cols === "none" ? 0 : cols.trim().split(/\s+/).length;

    const docScrollable = doc.scrollHeight > doc.clientHeight + 1;
    // "content exceeds the viewport" — measured on BOTH sides of the cure:
    // before it, `.app-layout`'s own overflow:hidden box still reports the true
    // content extent through scrollHeight; after it, the document does.
    const layoutOverflows = layoutBox
        ? layoutBox.scrollH > layoutBox.clientH + 1
        : false;
    const contentExceeds = docScrollable || layoutOverflows;

    return {
        vw, vh,
        // ── the M-13 columns, unchanged ──
        mainWp: Math.round(mr.width / vw * 100),
        mainHp: Math.round(mr.height / vh * 100),
        gL: Math.round(mr.left),
        gR: Math.round(vw - mr.right),
        cWp: n ? Math.round((maxX - minX) / vw * 100) : 0,
        cHp: n ? Math.round((maxY - minY) / vh * 100) : 0,
        text: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
        // ── A-5's additions ──
        docScrollable,
        docScrollH: doc.scrollHeight,
        docClientH: doc.clientHeight,
        contentExceeds,
        layout: layoutBox,
        main: mainBox,
        paneContainer: paneBox,
        gridCols,
        // B3's reading: the rack's block extent as a fraction of the band it
        // sits in. Null when either box is missing (an unrendered route is a
        // fact, never a silent 0).
        sceneExtentPct:
            paneBox && mainBox && mainBox.h > 0
                ? Math.round(paneBox.h / mainBox.h * 1000) / 10
                : null,
        occupiedExtentPct,
        contentMaxH: getComputedStyle(doc).getPropertyValue("--content-max-h").trim(),
        appGutter: getComputedStyle(doc).getPropertyValue("--app-gutter").trim(),
        appPaddingX: getComputedStyle(doc).getPropertyValue("--app-padding-x").trim(),
        // B5's reading, taken in the same engine that produced the geometry.
        supportsOverflowBlock: CSS.supports("overflow-block", "auto"),
        supportsMinBlockSize: CSS.supports("min-block-size", "100svh"),
        supportsSvh: CSS.supports("height", "100svh"),
    };
}

const engineName = process.env.PROBE_BROWSER ?? "webkit";
const engine = engineName === "chromium" ? chromium : webkit;
const b = await engine.launch();
const cells = [];

if (!AS_JSON) {
    console.log(
        "route          viewport       mainW%  mainH%  gutterL  gutterR  contentW%  contentH%  text" +
        "   docScroll  exceeds  paneBox         cols  rack%  occ%",
    );
}

for (const [name, w, h, dsf] of VIEWPORTS) {
    const ctx = await b.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: dsf,
    });
    const p = await ctx.newPage();
    for (const r of ROUTES) {
        await p.goto(BASE + "/" + r, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
        await p.waitForTimeout(1800);
        const m = await p.evaluate(readLayout);
        cells.push({ route: r, viewport: name, w, h, dsf, ...m });
        if (!AS_JSON) {
            const pb = m.paneContainer ? `${m.paneContainer.w}x${m.paneContainer.h}` : "—";
            console.log(
                `${r.padEnd(14)} ${name.padEnd(14)} ${String(m.mainWp).padStart(5)}%  ${String(m.mainHp).padStart(5)}%  ` +
                `${String(m.gL).padStart(7)}  ${String(m.gR).padStart(7)}  ${String(m.cWp).padStart(8)}%  ` +
                `${String(m.cHp).padStart(8)}%  ${String(m.text).padStart(4)}` +
                `   ${String(m.docScrollable).padStart(9)}  ${String(m.contentExceeds).padStart(7)}  ` +
                `${pb.padStart(14)}  ${String(m.gridCols).padStart(4)}  ${String(m.sceneExtentPct).padStart(5)}  ${String(m.occupiedExtentPct).padStart(5)}`,
            );
        }
    }
    await ctx.close();
}
await b.close();

// ── The gates (A-5's "assert mode") ─────────────────────────────────────────
const at = (vp) => cells.filter((c) => c.viewport === vp);

// B1 — every 390×844 route whose content exceeds the viewport must scroll.
const b1rows = at("mobile-390").map((c) => ({
    route: c.route,
    contentExceeds: c.contentExceeds,
    docScrollable: c.docScrollable,
    docScrollH: c.docScrollH,
    docClientH: c.docClientH,
    pass: !c.contentExceeds || c.docScrollable,
}));
const B1 = {
    gate: "B1 mobile document scrolls",
    arm: "390x844 · contentExceeds ⇒ documentElement.scrollHeight > clientHeight",
    inScope: b1rows.filter((r) => r.contentExceeds).length,
    rows: b1rows,
    pass: b1rows.every((r) => r.pass),
};

// B2 — no block cap, read at BOTH aspect ratios and on BOTH boxes.
const b2rows = ["wide-2560", "ultrawide-3440"].flatMap((vp) =>
    at(vp).map((c) => ({
        route: c.route,
        viewport: vp,
        aspect: vp === "wide-2560" ? "16/9" : "21/9",
        mainMaxHeight: c.main?.maxHeight ?? null,
        paneMaxHeight: c.paneContainer?.maxHeight ?? null,
        contentMaxH: c.contentMaxH,
        pass: c.main?.maxHeight === "none" && (c.paneContainer?.maxHeight ?? "none") === "none",
    })),
);
const B2 = {
    gate: "B2 no block cap",
    arm: "getComputedStyle(<main>).maxHeight === 'none' AND .pane-container maxHeight === 'none', at 16/9 and 21/9",
    rows: b2rows,
    pass: b2rows.every((r) => r.pass),
};

// B3 — scene-band occupied block extent at 3440×1440, PER ROUTE.
const b3rows = at("ultrawide-3440").map((c) => ({
    route: c.route,
    paneH: c.paneContainer?.h ?? null,
    bandH: c.main?.h ?? null,
    sceneExtentPct: c.sceneExtentPct,
    occupiedExtentPct: c.occupiedExtentPct,
    // BOTH arms must hold: the rack's extent AND the content's own occupancy.
    // A rack stretched to the band around short content passes the first and
    // fails the second — which is the gate's stated falsifier.
    pass:
        c.sceneExtentPct !== null &&
        c.sceneExtentPct >= 90 &&
        c.occupiedExtentPct !== null &&
        c.occupiedExtentPct >= 90,
}));
const B3 = {
    gate: "B3 block extent",
    arm:
        "3440x1440 · .pane-container height ÷ scene-band height ≥ 90 % AND occupied content extent ÷ band ≥ 90 %, per route",
    rows: b3rows,
    failing: b3rows
        .filter((r) => !r.pass)
        .map((r) => `${r.route} rack ${r.sceneExtentPct}% / occupied ${r.occupiedExtentPct}%`),
    pass: b3rows.every((r) => r.pass),
};

const support = cells[0]
    ? {
          engine: engineName,
          "CSS.supports('overflow-block','auto')": cells[0].supportsOverflowBlock,
          "CSS.supports('min-block-size','100svh')": cells[0].supportsMinBlockSize,
          "CSS.supports('height','100svh')": cells[0].supportsSvh,
      }
    : null;

const report = {
    probe: "layout-utilization",
    extendedPer: "layout-gestalt.md §9 rider A-5 (X.W5.b)",
    base: BASE,
    engine: engineName,
    takenAt: new Date().toISOString(),
    routes: ROUTES,
    viewports: VIEWPORTS.map(([n, w, h, d]) => ({ name: n, w, h, dsf: d })),
    b5Support: support,
    gates: { B1, B2, B3 },
    cells,
};

if (AS_JSON) {
    console.log(JSON.stringify(report, null, 2));
} else {
    console.log("");
    console.log(`B5 support reading (${engineName}):`, JSON.stringify(support));
    for (const g of [B1, B2, B3]) {
        console.log(`${g.pass ? "GREEN" : "RED  "}  ${g.gate} — ${g.arm}`);
    }
    if (!B3.pass) console.log(`        B3 failing routes: ${B3.failing.join(" · ")}`);
    if (!B1.pass) {
        console.log(
            `        B1 failing routes: ${B1.rows.filter((r) => !r.pass).map((r) => r.route).join(" · ")}`,
        );
    }
}

if (ASSERT) process.exit(B1.pass && B2.pass && B3.pass ? 0 : 1);
