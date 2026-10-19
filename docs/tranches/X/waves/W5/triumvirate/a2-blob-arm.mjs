// SERVED MODEL: claude-fable-5-1
// X.W5.t — gate A2's BLOB ARM, RE-AUTHORED (dated addendum-beside:
// `A2-BLOB-ARM-ADDENDUM-2026-09-22.md`, the L-18 strike-and-re-author of
// ESC-W5-1). The arm as authored in W5.md §6 demanded `.hero-blob-anchor` on
// five routes whose `VIEW_MAP` scene holds no `color-picker` pane, so it
// could never turn green and never turned red for its intended reason.
//
// THE RE-AUTHORED ARM (three limbs, each with a stated falsifier):
//   (i)  SCHEMA TRUTH — on every one of the fifteen `VIEW_MAP` routes, cold
//        loaded: `blobPresent === pickerPanePresent`, where the picker pane is
//        the region labelled "Picker" (`viewSchema.ts` `pane: "color-picker"`).
//        Fails if the ornament is missing where the picker mounts (the
//        original defect class) OR present where no picker exists (a
//        cross-scene leak).
//   (ii) DEEP-LINK → HOME — from a cold deep link on each of the five
//        picker-less routes the old arm named (`generate` `browse` `gradient`
//        `extract` `atmosphere`), after the overture reaches b3+b4, a hash
//        hop to `/#/` must mount the picker's ornament within the bounded
//        window: `.hero-blob-anchor` inside `.pane-wrapper--stage`, with a
//        `<canvas>` of non-zero CSS size. Fails if a deep-linked boot leaves
//        the session in a state where the picker's later mount has no blob
//        (the b2-terminal wedge the RED-of-record described), or if the
//        anchor mounts but its canvas has no box.
//   (iii) THE CANVAS IS SIZED — on every picker-bearing route the anchor's
//        canvas has non-zero `clientWidth × clientHeight` (a present anchor
//        with a zero-box canvas reads RED: presence is not the assertion).
//
// Usage: PROBE_BASE=http://127.0.0.1:<port> node a2-blob-arm.mjs  (the BUILT
// bundle). Output: JSON on stdout; exit 0 iff all three limbs hold.

import { chromium } from "playwright-core";

const BASE = process.env.PROBE_BASE ?? "http://localhost:8091";
const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users", "/admin/names", "/admin/audit", "/admin/flagged", "/admin/tags", "/does-not-exist"];
const DEEP = ["/generate", "/browse", "/gradient", "/extract", "/atmosphere"];
const HOME_WINDOW_MS = 8000;

function readBlob() {
    const anchor = document.querySelector(".hero-blob-anchor");
    const canvas = anchor?.querySelector("canvas") ?? null;
    return {
        marks: performance.getEntriesByType("mark").filter((m) => m.name.startsWith("overture:")).map((m) => m.name.replace("overture:", "")),
        blobPresent: !!anchor,
        blobInStage: !!anchor?.closest(".pane-wrapper--stage"),
        pickerPanePresent: !!document.querySelector('.pane-wrapper[aria-label="Picker"]'),
        canvasBox: canvas ? { w: canvas.clientWidth, h: canvas.clientHeight } : null,
        h1: document.querySelector("main h1")?.textContent?.trim() ?? null,
    };
}

async function waitFor(page, pred, ms) {
    const t0 = Date.now();
    let last = null;
    while (Date.now() - t0 < ms) {
        last = await page.evaluate(readBlob);
        if (pred(last)) return { ...last, waitedMs: Date.now() - t0 };
        await page.waitForTimeout(250);
    }
    return { ...last, waitedMs: Date.now() - t0, timedOut: true };
}

const browser = await chromium.launch({ headless: true });
const mk = async () => { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 }); await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch { /* */ } }); return ctx; };

// (i) + (iii): schema truth and the sized canvas, COLD per route — a fresh context each time, because
// `performance.mark`s live for the document (a second route in the same page reads the first boot's b4
// instantly) and a sequential hop would read the LEAVING Picker mid-transition as a blob on a picker-less route.
const schema = [];
{
    for (const r of ROUTES) {
        const ctx = await mk();
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#${r}`, { waitUntil: "load" });
        // Bounded wait (limb II's window): the overture reaches b4 AND, on a picker-bearing route, the async
        // HeroBlob chunk has landed with a sized canvas; a picker-less route settles at b4 alone.
        const s = await waitFor(page, (x) => x.marks.includes("b4") && (!x.pickerPanePresent || (x.blobPresent && (x.canvasBox?.w ?? 0) > 0 && (x.canvasBox?.h ?? 0) > 0)), HOME_WINDOW_MS);
        const sized = !s.blobPresent || ((s.canvasBox?.w ?? 0) > 0 && (s.canvasBox?.h ?? 0) > 0);
        schema.push({ route: r, ...s, limbI: s.blobPresent === s.pickerPanePresent && (!s.blobPresent || s.blobInStage), limbIII: sized });
        await ctx.close();
    }
}

// (ii): deep link → home.
const deep = [];
for (const r of DEEP) {
    const ctx = await mk();
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#${r}`, { waitUntil: "load" });
    const boot = await waitFor(page, (x) => x.marks.includes("b3") && x.marks.includes("b4"), 10000);
    await page.evaluate(() => { location.hash = "#/"; });
    const home = await waitFor(page, (x) => x.blobPresent && x.blobInStage && (x.canvasBox?.w ?? 0) > 0 && (x.canvasBox?.h ?? 0) > 0, HOME_WINDOW_MS);
    deep.push({ deepLink: r, bootMarks: boot.marks, bootBlob: boot.blobPresent, home, limbII: !home.timedOut });
    await ctx.close();
}
await browser.close();

const limbI = schema.every((s) => s.limbI);
const limbII = deep.every((d) => d.limbII);
const limbIII = schema.every((s) => s.limbIII);
const pass = limbI && limbII && limbIII;
console.log(JSON.stringify({ gate: "A2 blob arm (re-authored, addendum 2026-09-22)", probe: "a2-blob-arm.mjs", servedModel: "claude-fable-5-1", unit: "X.W5.t", at: new Date().toISOString(), base: BASE, limbs: { I_schemaTruth: limbI, II_deepLinkThenHome: limbII, III_canvasSized: limbIII }, schema, deep, pass }, null, 2));
process.exit(pass ? 0 : 1);
