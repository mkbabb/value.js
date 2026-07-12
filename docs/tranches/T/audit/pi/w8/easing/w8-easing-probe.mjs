/**
 * T.W8 · CRITIQUE PASS — EASING (p1) · the O-3 probe class (probe-only).
 * Surface: the gradient pane's easing specimen bench (T-22 / T-47) — the
 * T.W6.5 Row-E landed seat (`1a8f06c`): `GradientEasingEditor` closed-row
 * specimen labels + open-row {live ramp · specimen strip · readout rail ·
 * disclosed `EasingAuthoringStage` seating the ONE vendor <EasingPicker
 * :playback="false">}.
 *
 * Drives the LANE server :8670 (VJS_E2E_PORT; PERF_PORT 8671 reserved
 * unused; the owner's :9000 untouched). Cells: 1440×900 · 768×1024 ·
 * 390×844 × light+dark, dpr 2. Frames under docs/tranches/T/audit/pi/w8/
 * easing/ (gitignored-by-class PNGs; this script + the log are the
 * committed record).
 *
 * Legs:
 *  1 · Per-cell geometry: canvas box vs the seat law (min(100%,19rem) ×
 *      live vb-ratio), O-17 letterbox re-run live (getScreenCTM), row
 *      heights (the "more compactly" axis), strip/tile/eyebrow metrics,
 *      stamp count, dot rest, one-literal.
 *  2 · COMPOSITED-PIXEL contrast: head label / family eyebrow / tile
 *      label / readout literal (4.5:1 text floor) + curve stroke / tile
 *      glyph resting ink / handle fills (3:1 graphics floor) vs their
 *      real sampled grounds.
 *  3 · Interaction (1440-light): bezier handle DRAG (write-through:
 *      literal + head name + strip deselect), tile press (mint-law
 *      byte-identity + aspect morph), steps regime flip (picker controls
 *      swap), copy tick, second-row accordion.
 *  4 · 390 touch: tile hit-boxes, strip scroll, canvas fit.
 *  5 · PRM: reduced-motion → the aspect-ratio morph is neutralized.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8670";
const OUT = "docs/tranches/T/audit/pi/w8/easing";
mkdirSync(OUT, { recursive: true });

const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const URL = `${BASE}/#/gradient?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;

const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

// WCAG relative luminance + contrast from 8-bit sRGB.
const lum = ([r, g, b]) => {
    const f = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
};
const parseRgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
// Blend an ink (with alpha a and element opacity o) over a ground pixel.
const over = (ink, ground, o = 1) => {
    const a = (ink[3] ?? 1) * o;
    return ink.slice(0, 3).map((c, i) => Math.round(c * a + ground[i] * (1 - a)));
};
const r2 = (n) => Math.round(n * 100) / 100;

async function samplePixels(page, buf, pts) {
    return page.evaluate(
        async ({ b64, pts }) => {
            const img = new Image();
            img.src = "data:image/png;base64," + b64;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width;
            c.height = img.height;
            const g = c.getContext("2d", { willReadFrequently: true });
            g.drawImage(img, 0, 0);
            return pts.map(([x, y]) =>
                Array.from(
                    g.getImageData(Math.round(x * 2), Math.round(y * 2), 1, 1)
                        .data.slice(0, 3),
                ),
            );
        },
        { b64: buf.toString("base64"), pts },
    );
}

const browser = await chromium.launch({ headless: true });

async function openCell(w, h, scheme, extra = {}) {
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 2,
        colorScheme: scheme,
        ...extra,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(URL);
    const head = page
        .locator("button[aria-controls^='easing-interval-']")
        .first();
    await head.waitFor({ state: "visible", timeout: 20000 });
    await page.waitForTimeout(3200); // past the boot overture
    return { ctx, page, errors };
}

/** Ensure row 0 open + authoring disclosed; scroll bench into the pane. */
async function discloseRow0(page) {
    const head = page.locator("button[aria-controls='easing-interval-0']");
    if ((await head.getAttribute("aria-expanded")) !== "true")
        await head.click();
    const row = page.locator("#easing-interval-0");
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    if ((await tune.getAttribute("aria-expanded")) !== "true")
        await tune.click();
    const svg = row.locator("#easing-authoring-0 svg[role='img']");
    await svg.waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(600); // vb-ratio rAF sync + aspect morph
    await head.evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    await page.waitForTimeout(250);
    return { head, row, svg };
}

const geometryProbe = async (page) =>
    page.evaluate(() => {
        const gs = (el, p) => getComputedStyle(el).getPropertyValue(p);
        const box = (el) => {
            const r = el.getBoundingClientRect();
            return {
                x: r2(r.x),
                y: r2(r.y),
                w: r2(r.width),
                h: r2(r.height),
            };
        };
        function r2(n) {
            return Math.round(n * 100) / 100;
        }
        const heads = [
            ...document.querySelectorAll(
                "button[aria-controls^='easing-interval-']",
            ),
        ];
        const row = document.querySelector("#easing-interval-0");
        const rowShell = row.closest(".rounded-card");
        const svg = row.querySelector("#easing-authoring-0 svg[role='img']");
        const svgR = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const ctm = svg.getScreenCTM();
        const pt = (x, y) => {
            const p = new DOMPoint(x, y).matrixTransform(ctm);
            return { x: p.x, y: p.y };
        };
        const tl = pt(vb.x, vb.y);
        const br = pt(vb.x + vb.width, vb.y + vb.height);
        const authoring = row.querySelector(".easing-authoring");
        const picker = row.querySelector("[data-testid='easing-picker']");
        const pickerCard = row.querySelector("#easing-authoring-0 .glass-card");
        const strip = row.querySelector(".specimen-strip");
        const stripPort = row.querySelector(".fading-scroll") || strip;
        const eyebrow = row.querySelector(".family-eyebrow");
        const tile = row.querySelector(".specimen-tile");
        const tileLabel = row.querySelector(".tile-label");
        const ramp = row.querySelector("[role='img'][aria-label^='Eased ramp']");
        const railCode = row.querySelector(".readout-rail code");
        const railBtns = [...row.querySelectorAll(".rail-btn")];
        const headLabel = heads[0].querySelector("span.fira-code");
        const headName = heads[0].querySelectorAll("span.fira-code")[1];
        const headGlyph = heads[0].querySelector(".head-glyph path");
        const presetCaption = [...(picker?.querySelectorAll("span") ?? [])].find(
            (s) => s.textContent.trim() === "Preset",
        );
        // stamp census (O-17 clause 2)
        let stampCount = 0;
        for (const node of row.querySelectorAll("*")) {
            if (/8px 8px 0(px)?/.test(getComputedStyle(node).boxShadow))
                stampCount++;
        }
        // one-literal law (clause 4)
        let literalLeaves = 0;
        for (const node of row.querySelectorAll("*")) {
            if (
                node.childElementCount === 0 &&
                /(cubic-bezier|steps)\s*\(/.test(node.textContent ?? "")
            )
                literalLeaves++;
        }
        const headLiterals = heads.filter((h) =>
            /(cubic-bezier|steps)\s*\(/.test(h.textContent ?? ""),
        ).length;
        return {
            rowCount: heads.length,
            closedHeadBox: box(heads[1] ?? heads[0]),
            rowShellBox: box(rowShell),
            openBodyBox: box(row),
            canvas: {
                box: box(svg),
                vb: { x: vb.x, y: vb.y, w: vb.width, h: vb.height },
                vbRatio: gs(authoring, "--vb-ratio"),
                letterbox: {
                    dLeft: r2(Math.abs(tl.x - svgR.left)),
                    dTop: r2(Math.abs(tl.y - svgR.top)),
                    dRight: r2(Math.abs(br.x - svgR.right)),
                    dBottom: r2(Math.abs(br.y - svgR.bottom)),
                },
                aspect: r2(svgR.width / svgR.height),
                inlineSize: gs(svg, "inline-size"),
                transition: gs(svg, "transition-property"),
            },
            pickerGrid: picker ? gs(picker, "grid-template-columns") : null,
            pickerCard: pickerCard
                ? {
                      bg: gs(pickerCard, "background-color"),
                      shadow: gs(pickerCard, "box-shadow").slice(0, 40),
                      backdrop: gs(pickerCard, "backdrop-filter"),
                      border: `${gs(pickerCard, "border-top-width")} ${gs(pickerCard, "border-top-color")}`,
                      box: box(pickerCard),
                  }
                : null,
            strip: strip
                ? {
                      portBox: box(stripPort),
                      scrollW: stripPort.scrollWidth,
                      clientW: stripPort.clientWidth,
                      eyebrow: eyebrow
                          ? {
                                fontSize: gs(eyebrow, "font-size"),
                                color: gs(eyebrow, "color"),
                                opacity: gs(eyebrow, "opacity"),
                                text: eyebrow.textContent,
                            }
                          : null,
                      tileBox: box(tile),
                      tileLabel: {
                          fontSize: gs(tileLabel, "font-size"),
                          color: gs(tileLabel, "color"),
                          text: tileLabel.textContent,
                      },
                      tileCount: row.querySelectorAll(".specimen-tile").length,
                      glyphStroke: gs(
                          row.querySelector(".tile-glyph path"),
                          "stroke",
                      ),
                  }
                : null,
            ramp: ramp ? { box: box(ramp) } : null,
            rail: {
                codeBox: box(railCode),
                codeColor: gs(railCode, "color"),
                codeFontSize: gs(railCode, "font-size"),
                codeText: railCode.textContent,
                btnBoxes: railBtns.map(box),
            },
            head: {
                labelColor: gs(headLabel, "color"),
                labelFontSize: gs(headLabel, "font-size"),
                nameText: headName?.textContent,
                nameColor: headName ? gs(headName, "color") : null,
                glyphStroke: headGlyph ? gs(headGlyph, "stroke") : null,
                motionAccent: gs(
                    heads[0].closest(".rounded-card"),
                    "--motion-accent",
                ),
            },
            presetCaption: presetCaption
                ? {
                      fontSize: gs(presetCaption, "font-size"),
                      color: gs(presetCaption, "color"),
                      transform: gs(presetCaption, "text-transform"),
                  }
                : null,
            stampCount,
            literalLeaves,
            headLiterals,
            travelDots: row.querySelectorAll("svg circle[r='0.03']").length,
            playPills: [...row.querySelectorAll("button")].filter((b) =>
                /trace the curve|climb the staircase/i.test(b.textContent ?? ""),
            ).length,
            plateGround: (() => {
                // nearest ancestor with a paint — sampled composited below anyway
                const el = rowShell;
                return { bg: gs(el, "background-color") };
            })(),
        };
    });

const CELLS = [
    [1440, 900],
    [768, 1024],
    [390, 844],
];

const cellData = {};

for (const [w, h] of CELLS) {
    for (const scheme of ["light", "dark"]) {
        const cell = `${w}-${scheme}`;
        const { ctx, page, errors } = await openCell(w, h, scheme);
        const darkAttest = await page.evaluate(() =>
            document.documentElement.classList.contains("dark"),
        );
        log(`\n=== CELL ${cell} (root.dark=${darkAttest}) ===`);

        await discloseRow0(page);
        const g = await geometryProbe(page);
        log(JSON.stringify(g, null, 1));

        // frames
        await page.screenshot({ path: `${OUT}/${cell}-bench.png` });

        // ---- composited contrast: sample grounds from the buffer ----
        const buf = await page.screenshot();
        const gb = (b) => [b.x + b.w / 2, b.y + b.h / 2];
        // ground points: beside head label (row head, plain), beside eyebrow,
        // beside tile label (inside tile), beside rail code, canvas well center
        const headGround = [
            g.closedHeadBox.x + g.closedHeadBox.w - 30,
            g.closedHeadBox.y + g.closedHeadBox.h / 2,
        ];
        const eyeB = g.strip.eyebrow ? g.strip : null;
        const stripGround = [
            g.strip.tileBox.x + g.strip.tileBox.w / 2,
            g.strip.tileBox.y + 2,
        ];
        const railGround = [
            g.rail.codeBox.x + g.rail.codeBox.w + 4,
            g.rail.codeBox.y + g.rail.codeBox.h / 2,
        ];
        const wellCenter = g.pickerCard ? gb(g.pickerCard.box) : [0, 0];
        const pts = [headGround, stripGround, railGround, wellCenter];
        const [pxHead, pxStrip, pxRail, pxWell] = await samplePixels(
            page,
            buf,
            pts,
        );
        const inkHead = parseRgb(g.head.labelColor);
        const inkEyebrow = parseRgb(g.strip.eyebrow.color);
        const inkTile = parseRgb(g.strip.tileLabel.color);
        const inkCode = parseRgb(g.rail.codeColor);
        const strokeTile = parseRgb(g.strip.glyphStroke);
        const strokeHead = parseRgb(g.head.glyphStroke ?? "");
        const cr = {
            headLabel: r2(contrast(over(inkHead, pxHead), pxHead)),
            headGlyph: strokeHead.length
                ? r2(contrast(over(strokeHead, pxHead), pxHead))
                : null,
            eyebrow: r2(
                contrast(
                    over(
                        inkEyebrow,
                        pxStrip,
                        Number(g.strip.eyebrow.opacity),
                    ),
                    pxStrip,
                ),
            ),
            tileLabel: r2(contrast(over(inkTile, pxStrip), pxStrip)),
            railCode: r2(contrast(over(inkCode, pxRail), pxRail)),
            tileGlyphResting: r2(contrast(over(strokeTile, pxStrip), pxStrip)),
            grounds: {
                head: pxHead,
                strip: pxStrip,
                rail: pxRail,
                well: pxWell,
            },
        };
        log(`CONTRAST ${cell}: ${JSON.stringify(cr)}`);

        log(
            `CONSOLE ${cell}: ${errors.length} error(s)${errors.length ? " :: " + errors.slice(0, 4).join(" | ") : ""}`,
        );
        cellData[cell] = { g, cr, errors: errors.length };
        await ctx.close();
    }
}

// ======== Leg 3 — interaction (1440-light) ========
{
    const { ctx, page, errors } = await openCell(1440, 900, "light");
    const { head, row, svg } = await discloseRow0(page);
    log("\n=== INTERACTION 1440-light ===");

    const readCode = () =>
        row.locator(".readout-rail code").first().textContent();
    const readName = async () =>
        (await head.locator("span.fira-code").nth(1).textContent())?.trim();

    log(`seeded: literal=${await readCode()} name=${await readName()}`);

    // -- drag a bezier handle --
    const handle = svg.locator("circle[r='0.04']").first();
    const hb = await handle.boundingBox();
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    await page.mouse.move(hb.x + hb.width / 2 + 60, hb.y + hb.height / 2 - 80, {
        steps: 12,
    });
    await page.mouse.up();
    await page.waitForTimeout(400);
    const dragLiteral = await readCode();
    const dragName = await readName();
    const stripSelected = await row
        .locator(".specimen-tile[data-state='on']")
        .count();
    log(
        `after drag: literal=${dragLiteral} headName=${dragName} stripPressed=${stripSelected}`,
    );
    await page.screenshot({ path: `${OUT}/1440-light-drag.png` });

    // does the drag survive a disclosure toggle (aliveness law)?
    const tune = row.getByRole("button", { name: "Author a custom curve" });
    await tune.click();
    await page.waitForTimeout(150);
    await tune.click();
    await page.waitForTimeout(300);
    log(
        `after tune toggle: literal=${await readCode()} (aliveness: unchanged=${(await readCode()) === dragLiteral})`,
    );

    // -- tile press: mint law + overshoot morph --
    await row.locator("[data-specimen='ease-out-back']").click();
    await page.waitForTimeout(600);
    const mintLiteral = await readCode();
    const mintName = await readName();
    const vbAfter = await svg.evaluate((el) => {
        const vb = el.viewBox.baseVal;
        const r = el.getBoundingClientRect();
        return {
            vb: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`,
            aspect: Math.round((r.width / r.height) * 1000) / 1000,
            h: Math.round(r.height * 10) / 10,
        };
    });
    log(
        `tile ease-out-back: literal=${mintLiteral} (mint-law=${mintLiteral === "cubic-bezier(0.175, 0.885, 0.32, 1.275)"}) headName=${mintName} vb=${JSON.stringify(vbAfter)}`,
    );

    // -- steps regime --
    await row.locator("[data-specimen='step-end']").click();
    await page.waitForTimeout(600);
    const stepsLiteral = await readCode();
    const stepsControls = await row
        .locator("[data-testid='easing-steps-n']")
        .count();
    const stepsVb = await svg.evaluate((el) => {
        const vb = el.viewBox.baseVal;
        const r = el.getBoundingClientRect();
        return {
            vb: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`,
            h: Math.round(r.height * 10) / 10,
        };
    });
    log(
        `tile step-end: literal=${stepsLiteral} stepsSlider=${stepsControls} vb=${JSON.stringify(stepsVb)}`,
    );
    await page.screenshot({ path: `${OUT}/1440-light-steps.png` });

    // -- copy tick --
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
    await row.locator(".rail-btn").first().click();
    await page.waitForTimeout(200);
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    log(`copy: clipboard=${clip} (match=${clip === stepsLiteral})`);

    // -- second row accordion --
    const head1 = page.locator("button[aria-controls='easing-interval-1']");
    if (await head1.count()) {
        await head1.click();
        await page.waitForTimeout(400);
        const row0Open = await head.getAttribute("aria-expanded");
        const row1Open = await head1.getAttribute("aria-expanded");
        log(`accordion: row0=${row0Open} row1=${row1Open} (single-open law)`);
        await page.screenshot({ path: `${OUT}/1440-light-row1.png` });
    } else {
        log("accordion: only one interval in the default gradient");
    }

    log(`console after interaction: ${errors.length} error(s)`);
    await ctx.close();
}

// ======== Leg 5 — PRM ========
{
    const { ctx, page, errors } = await openCell(1440, 900, "light", {
        reducedMotion: "reduce",
    });
    const { row, svg } = await discloseRow0(page);
    const dur = await svg.evaluate(
        (el) => getComputedStyle(el).transitionDuration,
    );
    const rampAnim = await row
        .locator("[role='img'][aria-label^='Eased ramp']")
        .evaluate((el) => getComputedStyle(el).animationName);
    log(
        `\n=== PRM === svg transition-duration=${dur} ramp animation=${rampAnim} console=${errors.length}`,
    );
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/w8-easing-probe-log.txt`, report.join("\n") + "\n");
log("\nDONE");
