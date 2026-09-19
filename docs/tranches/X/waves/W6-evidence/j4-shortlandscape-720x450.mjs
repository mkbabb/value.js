// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · gate j4 — SHORT LANDSCAPE 720×450, the MEASURE-AT-OPEN baseline.
 *
 * WHY THIS FILE EXISTS. `W6.md:323` makes j4 **MEASURE-AT-OPEN** — *"not
 * measured by this seat; the baseline is taken at wave open before any cure"* —
 * and `:325` lets it *"retire GREEN with its measurement pasted, not carried"*.
 * The open seat skipped it under probe parsimony §5.2 and no seat took it
 * since (close R-10; Check 1 defect 5). This file takes it.
 *
 * WHY NOT `o27-scene-contracts.spec.ts`. That is the command `W6.md:323`
 * names, and it does not exist — creating it is `.j`'s dispatched work, `.j`
 * is BLOCKED-ON X-W5 (j1–j3 are owner-named honest-RED), and its ordinal
 * COLLIDES with the shipped `e2e/smoke/oracles/o27-focus-affordance.spec.ts`,
 * which the close returned as escalation 3 and nobody has ruled. A baseline is
 * a MEASUREMENT, not an oracle; this instrument takes the measurement without
 * minting a spec on a contested ordinal. **It is therefore a baseline, NOT a
 * substitute command, and no successor may read it as "j4 GREEN by o27".**
 *
 * WHAT IT MEASURES, per `W6.md:323` — *"the last control and the preview are
 * both reachable"*, at a 720×450 cell:
 *
 *   PREVIEW   — the route's own preview surface, selector DECLARED below per
 *               route (never inferred). Reachable = it has a box and that box
 *               intersects the 720×450 viewport.
 *   LAST      — the LAST visible interactive element inside the route's pane
 *   CONTROL     region, in document order. Reachable = after
 *               `scrollIntoView({block:"nearest"})` its box intersects the
 *               viewport AND `elementFromPoint` at its centre returns it or a
 *               node it contains / is contained by (hit-testable, not
 *               occluded). Both the BEFORE and AFTER boxes are printed, so an
 *               off-screen-but-scrollable control is distinguishable from an
 *               unreachable one.
 *
 * `document.scrollHeight === innerHeight` on every route here (the panes own
 * their scroll, the page does not), so "below the fold" is NOT automatically
 * "reachable" — that is exactly what the AFTER reading decides.
 *
 * ONE FRESH PAGE PER ROUTE, deliberately (L-18 target 5, probe-before-meaning).
 * A first cut of this instrument walked all four routes on ONE page by hash
 * navigation and returned `blob: PREVIEW unreachable`. Isolated, that RED is
 * NOT a 720×450 property: on a FRESH load of `/#/blob` the goo-blob canvas is
 * present at 180×180, and at the 1440×900 control cell it is present too —
 * it is absent only AFTER navigating away and back, together with its
 * `.hero-blob-anchor` wrapper, and it does not return after +5s. That is a
 * scene-lifetime defect and it belongs to j2/j3, not to j4. Reading it as a
 * short-landscape failure would have published a false RED against the wrong
 * gate. The finding is recorded beside this transcript instead.
 *
 * ENV: a FRESHLY started dev server (STALE-SERVER law), API-LESS.
 *   npx vite --port 9000 --strictPort
 *   node docs/tranches/X/waves/W6-evidence/j4-shortlandscape-720x450.mjs
 *
 * Exit 0 = every route reachable on both arms. Exit 1 = at least one is not.
 */
import { chromium } from "playwright";

const ORIGIN = process.env.J4_ORIGIN ?? "http://localhost:9000";
const CELL = { width: 720, height: 450 };

/** DECLARED, never inferred — one preview surface per route. */
const ROUTES = [
    {
        route: "gradient",
        preview: '[data-testid="gradient-render-tile"]',
        why: "the gradient route's own render tile (.c's two-site paint stack)",
    },
    {
        route: "mix",
        preview: "main canvas",
        why: "MixAnimationCanvas — the only canvas inside the mix pane region",
    },
    {
        route: "blob",
        preview: '[data-testid="goo-blob-canvas"]',
        why: "the glass-ui goo-blob surface HeroBlob wraps",
    },
    {
        route: "atmosphere",
        preview: '[data-testid="atmosphere-canvas"]',
        why: "the full-bleed aurora canvas the atmosphere route exists to show",
    },
];

const CONTROL_SELECTOR = [
    "button",
    "a[href]",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
    "[role=slider]",
    "[role=combobox]",
    "[contenteditable=true]",
].join(", ");

const fails = [];
const rows = [];

const browser = await chromium.launch();

for (const { route, preview, why } of ROUTES) {
    // Fresh page per route — see the header note on the false blob RED.
    const page = await browser.newPage({ viewport: CELL });
    await page.goto(`${ORIGIN}/#/${route}`, {
        waitUntil: "networkidle",
        timeout: 45000,
    });
    await page.waitForTimeout(2500);

    const reading = await page.evaluate(
        ({ previewSel, controlSel, cell }) => {
            const box = (el) => {
                const r = el.getBoundingClientRect();
                return {
                    top: Math.round(r.top),
                    bottom: Math.round(r.bottom),
                    left: Math.round(r.left),
                    right: Math.round(r.right),
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                };
            };
            const intersects = (b) =>
                b.bottom > 0 &&
                b.top < cell.height &&
                b.right > 0 &&
                b.left < cell.width;

            const main = document.querySelector("main") ?? document.body;

            // ── preview ──
            const pv = document.querySelector(previewSel);
            const pvBox = pv ? box(pv) : null;

            // ── last control, in document order, inside the pane region ──
            const visible = Array.from(main.querySelectorAll(controlSel)).filter(
                (el) => {
                    const cs = getComputedStyle(el);
                    if (cs.display === "none" || cs.visibility === "hidden")
                        return false;
                    const r = el.getBoundingClientRect();
                    return r.width > 0 && r.height > 0;
                },
            );
            const last = visible[visible.length - 1] ?? null;
            const beforeBox = last ? box(last) : null;
            let afterBox = null;
            let hit = null;
            if (last) {
                last.scrollIntoView({ block: "nearest", inline: "nearest" });
                afterBox = box(last);
                const cx = Math.min(
                    Math.max(afterBox.left + afterBox.w / 2, 1),
                    cell.width - 1,
                );
                const cy = Math.min(
                    Math.max(afterBox.top + afterBox.h / 2, 1),
                    cell.height - 1,
                );
                const at = document.elementFromPoint(cx, cy);
                hit = Boolean(
                    at && (at === last || last.contains(at) || at.contains(last)),
                );
            }

            return {
                docScrollH: document.documentElement.scrollHeight,
                winH: window.innerHeight,
                controls: visible.length,
                previewFound: Boolean(pv),
                previewBox: pvBox,
                previewInCell: pvBox ? intersects(pvBox) : false,
                lastLabel: last
                    ? last.getAttribute("aria-label") ||
                      last.textContent?.trim().slice(0, 34) ||
                      last.tagName
                    : null,
                lastTag: last?.tagName ?? null,
                beforeBox,
                afterBox,
                afterInCell: afterBox ? intersects(afterBox) : false,
                hitTestable: hit,
            };
        },
        { previewSel: preview, controlSel: CONTROL_SELECTOR, cell: CELL },
    );

    const previewOk = reading.previewFound && reading.previewInCell;
    const controlOk = reading.afterInCell === true && reading.hitTestable === true;
    if (!previewOk) fails.push(`${route}: PREVIEW unreachable (${preview})`);
    if (!controlOk)
        fails.push(
            `${route}: LAST CONTROL unreachable (${reading.lastLabel ?? "none"})`,
        );

    rows.push({ route, preview, why, previewOk, controlOk, ...reading });
    await page.close();
}

await browser.close();

console.log(
    `X-W6 j4 — SHORT LANDSCAPE BASELINE, ${CELL.width}×${CELL.height}, chromium`,
);
console.log(`origin ${ORIGIN}   taken ${new Date().toISOString().slice(0, 10)}`);
for (const r of rows) {
    console.log(`\n── /#/${r.route} ──`);
    console.log(
        `  page scroll: docScrollHeight=${r.docScrollH} innerHeight=${r.winH}` +
            `  (page ${r.docScrollH > r.winH ? "SCROLLS" : "does NOT scroll"})`,
    );
    console.log(`  preview  ${r.preview}   — ${r.why}`);
    console.log(
        `    found=${r.previewFound} box=${r.previewBox ? JSON.stringify(r.previewBox) : "null"}` +
            `  intersects cell=${r.previewInCell}  → ${r.previewOk ? "REACHABLE" : "UNREACHABLE"}`,
    );
    console.log(
        `  last control  ${r.lastTag} "${r.lastLabel}"  (of ${r.controls} visible)`,
    );
    console.log(`    before scrollIntoView: ${JSON.stringify(r.beforeBox)}`);
    console.log(`    after  scrollIntoView: ${JSON.stringify(r.afterBox)}`);
    console.log(
        `    in cell=${r.afterInCell}  hit-testable=${r.hitTestable}` +
            `  → ${r.controlOk ? "REACHABLE" : "UNREACHABLE"}`,
    );
}

console.log(
    `\nGATE j4 (short landscape 720×450) — ${fails.length === 0 ? "GREEN" : "RED"}` +
        `  ${rows.filter((r) => r.previewOk && r.controlOk).length} of ${rows.length} routes reachable on both arms`,
);
for (const f of fails) console.log(`  FAIL  ${f}`);
process.exit(fails.length === 0 ? 0 : 1);
