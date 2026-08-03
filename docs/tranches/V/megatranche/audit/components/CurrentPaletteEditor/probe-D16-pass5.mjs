// CHALLENGE-D pass 5 — probe D16. Read-only.
//   Q6  the edit overlay: does the FROM ghost trace the silhouette of the face
//       it covers, and does it land on it? (seed divergence, measured)
//   Q7  the add-slot ghost vs the face of the SAME colour, one frame
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${HERE}/frames-D14`;
const BASE = "http://localhost:9000/";
const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript((c) => {
    localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[0], savedColors: c }));
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
}, draft(3));
await page.goto(BASE + "#/palettes", { waitUntil: "load" });
await page.waitForTimeout(2800);

const R = {};
const shape = () =>
    page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const dots = [...well.querySelectorAll('[data-testid="watercolor-swatch"]')].map((d) => {
            const s = getComputedStyle(d), r = d.getBoundingClientRect();
            return {
                cls: String(d.className).replace("watercolor-swatch", "").trim().slice(0, 56),
                variant: d.getAttribute("data-variant"),
                inOverlay: !!d.closest(".edit-overlay"),
                bg: s.backgroundColor,
                radius: s.borderRadius,
                filter: s.filter.slice(0, 44),
                rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            };
        });
        const ov = well.querySelector(".edit-overlay");
        const ovr = ov?.getBoundingClientRect();
        return {
            overlayPresent: !!ov,
            overlayRect: ovr ? { x: +ovr.x.toFixed(1), y: +ovr.y.toFixed(1), w: +ovr.width.toFixed(1), h: +ovr.height.toFixed(1) } : null,
            overlayOffsetParent: ov ? String(ov.offsetParent?.className ?? ov.offsetParent).slice(0, 60) : null,
            overlayZ: ov ? getComputedStyle(ov).zIndex : null,
            dots,
        };
    });

R.before = await shape();

// enter the edit state through the hover panel's Pencil
await page.locator('.swatch-row [data-testid="watercolor-swatch"]').first().hover({ force: true }).catch(() => {});
await page.waitForTimeout(450);
const pencil = page.locator('[aria-label^="Edit color"]').first();
R.pencilFound = await pencil.count();
R.pencilBox = R.pencilFound ? await pencil.boundingBox() : null;
if (R.pencilFound) await pencil.click({ force: true }).catch((e) => (R.pencilClickError = String(e).slice(0, 100)));
await page.waitForTimeout(900);
R.after = await shape();
await page.screenshot({ path: `${OUT}/q6-edit-overlay-1440.png`, clip: { x: 690, y: 120, width: 740, height: 420 } });
await page.screenshot({ path: `${OUT}/q6-edit-overlay-full.png`, fullPage: false });

// the comparison that matters
const faceOf = (s, i) => s.dots.filter((d) => !d.inOverlay && d.variant === "solid")[i];
const fromGhost = R.after.dots.find((d) => d.inOverlay && d.variant === "ghost");
const toDot = R.after.dots.find((d) => d.inOverlay && d.variant === "solid");
R.verdict = {
    face0_radius: faceOf(R.after, 0)?.radius ?? faceOf(R.before, 0)?.radius,
    face0_rect: faceOf(R.after, 0)?.rect ?? faceOf(R.before, 0)?.rect,
    face0_bg: faceOf(R.after, 0)?.bg ?? faceOf(R.before, 0)?.bg,
    overlayFrom_radius: fromGhost?.radius,
    overlayFrom_rect: fromGhost?.rect,
    overlayFrom_bg: fromGhost?.bg,
    overlayTo_radius: toDot?.radius,
    overlayTo_rect: toDot?.rect,
    silhouettesIdentical:
        !!fromGhost && fromGhost.radius === (faceOf(R.after, 0)?.radius ?? faceOf(R.before, 0)?.radius),
    addSlot_radius: R.before.dots.find((d) => /add-slot-ghost/.test(d.cls))?.radius,
    addSlot_bg: R.before.dots.find((d) => /add-slot-ghost/.test(d.cls))?.bg,
    addSlotMatchesAnyFace: (() => {
        const g = R.before.dots.find((d) => /add-slot-ghost/.test(d.cls))?.radius;
        return R.before.dots.filter((d) => d.variant === "solid").some((d) => d.radius === g);
    })(),
};
await ctx.close();
await browser.close();
writeFileSync(`${HERE}/probe-D16-pass5.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify({ pencilFound: R.pencilFound, pencilBox: R.pencilBox, overlay: R.after.overlayPresent, verdict: R.verdict }, null, 2));
