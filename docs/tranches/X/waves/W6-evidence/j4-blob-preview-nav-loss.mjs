// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · the ISOLATION probe that kept j4's baseline honest — and the finding
 * it uncovered, which belongs to `.j` (j2/j3), NOT to j4.
 *
 * A first cut of `j4-shortlandscape-720x450.mjs` walked all four routes on one
 * page by hash navigation and returned `blob: PREVIEW unreachable`. Under
 * L-18 target 5 (probe-before-meaning: *"a probe's output is not read until
 * what it measures is read"*) that RED was isolated before it was published.
 * It is NOT a 720×450 property:
 *
 *   A  fresh load  /#/blob  @ 720×450 → goo-blob canvas PRESENT, 180×180 @ top 70
 *   A  same page, +4s       → PRESENT, box unchanged (not a settle race)
 *   B  gradient → mix → blob by hash nav @ 720×450
 *                           → goo-blob canvas ABSENT, and `.hero-blob-anchor` /
 *                             `.goo-blob-wrapper` ABSENT with it
 *   B  same page, +5s       → still ABSENT (it does not come back)
 *   C  fresh load  /#/blob  @ 1440×900 (the control cell) → PRESENT, 180×180
 *
 * READ AT BOTH ENDS: A vs C isolates the viewport (not the cause — the cell
 * makes no difference); A vs B isolates the navigation (the cause). The blob
 * route's persistent preview does not survive a route-away-and-back, and the
 * anchor goes with the canvas, so nothing repaints it.
 *
 * OWNER: **`.j`** — `W6.md:313` j2 (*"canvas lifetime bound to the scene …
 * no orphaned rAF or 2D context"*) and j3 (*"persistent live preview with an
 * explicit loss/recovery contract"*). This is the defect those gates exist to
 * catch, measured here a wave early and banked so `.j` starts from a reading
 * rather than a suspicion. It is NOT relief for j2/j3, which stay owner-named
 * honest-RED on X-W5.
 *
 * ENV: a FRESHLY started dev server (STALE-SERVER law), API-LESS.
 *   node docs/tranches/X/waves/W6-evidence/j4-blob-preview-nav-loss.mjs
 *
 * Exit 0 = the loss reproduces (A present, B absent). Exit 1 = it does not.
 */
import { chromium } from "playwright";

const ORIGIN = process.env.J4_ORIGIN ?? "http://localhost:9000";
const CELL = { width: 720, height: 450 };
const CONTROL_CELL = { width: 1440, height: 900 };
const SEL = '[data-testid="goo-blob-canvas"]';

const read = (page) =>
    page.evaluate((sel) => {
        const c = document.querySelector(sel);
        const anchor = document.querySelector(".hero-blob-anchor, .goo-blob-wrapper");
        if (!c) return { present: false, anchor: Boolean(anchor) };
        const r = c.getBoundingClientRect();
        return {
            present: true,
            anchor: Boolean(anchor),
            w: Math.round(r.width),
            h: Math.round(r.height),
            top: Math.round(r.top),
        };
    }, SEL);

const browser = await chromium.launch();

const a = await browser.newPage({ viewport: CELL });
await a.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
await a.waitForTimeout(2500);
const A1 = await read(a);
await a.waitForTimeout(4000);
const A2 = await read(a);
await a.close();

const b = await browser.newPage({ viewport: CELL });
for (const route of ["gradient", "mix", "blob"]) {
    await b.goto(`${ORIGIN}/#/${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await b.waitForTimeout(2500);
}
const B1 = await read(b);
await b.waitForTimeout(5000);
const B2 = await read(b);
await b.close();

const c = await browser.newPage({ viewport: CONTROL_CELL });
await c.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
await c.waitForTimeout(2500);
const C1 = await read(c);
await c.close();

await browser.close();

console.log("X-W6 · blob persistent-preview navigation loss — isolation");
console.log(
    `A  fresh /#/blob   @ ${CELL.width}×${CELL.height}        ${JSON.stringify(A1)}`,
);
console.log(`A  +4s                                  ${JSON.stringify(A2)}`);
console.log(
    `B  gradient→mix→blob @ ${CELL.width}×${CELL.height}      ${JSON.stringify(B1)}`,
);
console.log(`B  +5s                                  ${JSON.stringify(B2)}`);
console.log(
    `C  fresh /#/blob   @ ${CONTROL_CELL.width}×${CONTROL_CELL.height} (control)  ${JSON.stringify(C1)}`,
);

const reproduces = A1.present && A2.present && C1.present && !B1.present && !B2.present;
console.log(
    `\nFINDING (owner: .j / j2 · j3) — the blob route's preview does NOT survive a ` +
        `route-away-and-back: ${reproduces ? "REPRODUCES" : "DOES NOT REPRODUCE"}`,
);
console.log(
    `j4 is unaffected: the viewport control (A vs C) shows the cell makes no difference.`,
);
process.exit(reproduces ? 0 : 1);
