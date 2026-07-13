/**
 * T.W8 · CRITIQUE PASS — EXTRACT (p1) · the O-3 probe class (probe-only).
 * Surface: image-palette-extractor — the k/kC config sliders (T-44a),
 * the ShadowPalette instrument face + species genesis register (T-41/T-44b),
 * card material consistency (T-24/T-45-adjacent).
 *
 * Drives the LANE server :8640 (VJS_E2E_PORT; PERF_PORT 8641 reserved unused;
 * the owner's :9000 untouched). Cells: 1440×900 · 768×1024 · 390×844 ×
 * light+dark, dpr 2. Frames archived under docs/tranches/T/audit/pi/w8/extract/
 * (gitignored-by-class PNGs; this script + the log are the committed record).
 *
 * Legs:
 *  1 · Per-cell computed-style + geometry probes on every anchor
 *      (ShadowPalette species, K rail, kC track, label rows) + full frames.
 *  2 · COMPOSITED-PIXEL contrast (WCAG 1.4.11 graphics 3:1 for track material
 *      vs its real ground; 4.5:1 text floor for label rows) — sampled from
 *      the rendered dpr-2 buffer, never assumed from tokens.
 *  3 · The live-k instrument leg: turn k → the ghost plate re-segments.
 *  4 · An extraction DRIVEN (generated 5-band test image → file input) —
 *      the developed instrument face: skeleton swap, dominance row,
 *      palette-gradient K rail re-measure, reset → ghost returns.
 *  5 · PRM degrade: reduced-motion → the pulse stills (O-9 motion leg).
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8640";
const OUT = "docs/tranches/T/audit/pi/w8/extract";
mkdirSync(OUT, { recursive: true });

const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const URL = `${BASE}/#/extract?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;

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
const px = (v) => Math.round(v * 2); // dpr-2 buffer coords
const fmt = (c) => `rgb(${c[0]} ${c[1]} ${c[2]})`;

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
                Array.from(g.getImageData(x, y, 1, 1).data.slice(0, 3)),
            );
        },
        { b64: buf.toString("base64"), pts },
    );
}

// Parse a computed rgb()/rgba() string to [r,g,b,(a)].
const parseRgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);

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
    await page
        .locator('[data-slot="shadow-palette"]')
        .waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(3200); // past the boot overture
    return { ctx, page, errors };
}

const CELLS = [
    [1440, 900],
    [768, 1024],
    [390, 844],
];

for (const [w, h] of CELLS) {
    for (const scheme of ["light", "dark"]) {
        const cell = `${w}-${scheme}`;
        const { ctx, page, errors } = await openCell(w, h, scheme);
        const darkAttest = await page.evaluate(() =>
            document.documentElement.classList.contains("dark"),
        );
        log(`\n=== CELL ${cell} (root.dark=${darkAttest}) ===`);

        // ---- Leg 1: computed styles + geometry --------------------------
        const probe = await page.evaluate(() => {
            const gs = (el, p) => getComputedStyle(el).getPropertyValue(p);
            const sp = document.querySelector('[data-slot="shadow-palette"]');
            const segs = sp.querySelectorAll(".shadow-seg");
            const seg1 = segs[0];
            const seg3 = segs[2];
            const cap = sp.parentElement.querySelector("p");
            const kRail = document.querySelector('[data-o18="extract-k-rail"]');
            // the K row = rail-wrapper's parent (label + rail wrapper)
            const kLabel = kRail.parentElement.parentElement.querySelector("label");
            const kcWrap = document.querySelector('[data-o18="extract-kc"]');
            const kcTrack = kcWrap.querySelector(".slider-track");
            const kcLabel = kcWrap.querySelector("label");
            const kcValue = kcWrap.querySelector("span");
            const kcThumb = kcWrap.querySelector(".slider-thumb");
            const kThumb = kRail.parentElement.querySelector(".slider-thumb");
            const card = sp.closest('[class*="pane-scroll-fade"]');
            const box = (el) => {
                const r = el.getBoundingClientRect();
                return { x: r.x, y: r.y, w: r.width, h: r.height };
            };
            return {
                shadow: {
                    borderStyle: gs(sp, "border-top-style"),
                    borderWidth: gs(sp, "border-top-width"),
                    borderColor: gs(sp, "border-top-color"),
                    bg: gs(sp, "background-color"),
                    radius: gs(sp, "border-radius"),
                    boxShadow: gs(sp, "box-shadow").slice(0, 80),
                    segCount: segs.length,
                    seg1Anim: `${gs(seg1, "animation-name")} ${gs(seg1, "animation-duration")} delay=${gs(seg1, "animation-delay")}`,
                    seg3Delay: gs(seg3, "animation-delay"),
                    seg1Bg: gs(seg1, "background-color"),
                    swatchCount: sp.querySelectorAll(".shadow-swatch").length,
                    box: box(sp),
                    seg1Box: box(seg1),
                },
                caption: {
                    text: cap?.textContent.trim(),
                    color: cap ? gs(cap, "color") : null,
                    fontSize: cap ? gs(cap, "font-size") : null,
                    box: cap ? box(cap) : null,
                },
                kRail: {
                    bgImage: gs(kRail, "background-image").slice(0, 120),
                    bgColor: gs(kRail, "background-color"),
                    height: gs(kRail, "height"),
                    radius: gs(kRail, "border-radius"),
                    box: box(kRail),
                },
                kLabel: {
                    text: kLabel.textContent.trim(),
                    color: gs(kLabel, "color"),
                    weight: gs(kLabel, "font-weight"),
                    fontSize: gs(kLabel, "font-size"),
                    family: gs(kLabel, "font-family").slice(0, 40),
                    box: box(kLabel),
                },
                kThumb: kThumb
                    ? { box: box(kThumb), visible: gs(kThumb, "opacity") }
                    : null,
                kcTrack: {
                    bg: gs(kcTrack, "background-color"),
                    trackVar: gs(kcTrack.closest(".slider-root") || kcTrack.parentElement, "--slider-track-bg"),
                    height: gs(kcTrack, "height"),
                    box: box(kcTrack),
                },
                kcLabel: {
                    color: gs(kcLabel, "color"),
                    weight: gs(kcLabel, "font-weight"),
                    fontSize: gs(kcLabel, "font-size"),
                    box: box(kcLabel),
                },
                kcValue: {
                    text: kcValue.textContent.trim(),
                    color: gs(kcValue, "color"),
                    fontSize: gs(kcValue, "font-size"),
                },
                kcThumb: kcThumb ? { box: box(kcThumb) } : null,
                card: card
                    ? {
                          bg: gs(card, "background-color"),
                          backdrop: gs(card, "backdrop-filter").slice(0, 60),
                          box: box(card),
                      }
                    : null,
                inkMuted: gs(document.documentElement, "--ink-muted"),
                accentLive: gs(document.documentElement, "--accent-live"),
            };
        });
        log(JSON.stringify(probe, null, 1));

        // ---- Frames -----------------------------------------------------
        const full = await page.screenshot({ path: `${OUT}/${cell}-full.png` });
        const sp = page.locator('[data-slot="shadow-palette"]');
        await sp.screenshot({ path: `${OUT}/${cell}-shadow.png` });
        const controls = page
            .locator('[data-o18="extract-k-rail"]')
            .locator("xpath=ancestor::div[contains(@class,'flex-col')][1]");
        await controls
            .screenshot({ path: `${OUT}/${cell}-controls.png` })
            .catch(() => {});

        // ---- Leg 2: composited-pixel contrast ---------------------------
        const kc = probe.kcTrack.box;
        const kr = probe.kRail.box;
        const sg = probe.shadow.seg1Box;
        const spB = probe.shadow.box;
        const pts = [
            // 0: kC track center
            [px(kc.x + kc.w / 2), px(kc.y + kc.h / 2)],
            // 1: ground above kC track (plate, 10px up)
            [px(kc.x + kc.w / 2), px(kc.y - 10)],
            // 2: ground below kC track (plate, 10px down)
            [px(kc.x + kc.w / 2), px(kc.y + kc.h + 10)],
            // 3: K rail center-left (avoid thumb at value 5/16)
            [px(kr.x + kr.w * 0.75), px(kr.y + kr.h / 2)],
            // 4: ground above K rail (plate, 10px up)
            [px(kr.x + kr.w * 0.75), px(kr.y - 10)],
            // 5: shadow seg-1 center
            [px(sg.x + sg.w / 2), px(sg.y + sg.h / 2)],
            // 6: well ground inside card (meta-row bg, below strip, left pad)
            [px(spB.x + 6), px(sg.y + sg.h + 12)],
            // 7: plate ground outside card (10px above card)
            [px(spB.x + spB.w / 2), px(spB.y - 10)],
            // 8: caption ground (beneath caption text block, plate)
            probe.caption.box
                ? [
                      px(probe.caption.box.x + 4),
                      px(probe.caption.box.y + probe.caption.box.h / 2),
                  ]
                : [0, 0],
        ];
        const smp = await samplePixels(page, full, pts);
        const kcVsUp = contrast(smp[0], smp[1]);
        const kcVsDown = contrast(smp[0], smp[2]);
        const krVsUp = contrast(smp[3], smp[4]);
        const segVsWell = contrast(smp[5], smp[6]);
        const wellVsPlate = contrast(smp[6], smp[7]);
        log(
            `PIXEL kC-track ${fmt(smp[0])} vs ground↑ ${fmt(smp[1])} = ${kcVsUp.toFixed(2)}:1 | vs ground↓ ${fmt(smp[2])} = ${kcVsDown.toFixed(2)}:1  [1.4.11 floor 3]`,
        );
        log(
            `PIXEL K-rail ${fmt(smp[3])} vs ground↑ ${fmt(smp[4])} = ${krVsUp.toFixed(2)}:1  [1.4.11 floor 3]`,
        );
        log(
            `PIXEL shadow-seg ${fmt(smp[5])} vs well ${fmt(smp[6])} = ${segVsWell.toFixed(2)}:1 (ghost, decorative) | well vs plate ${fmt(smp[7])} = ${wellVsPlate.toFixed(2)}:1`,
        );
        // Text rows: computed ink vs sampled ground (text floor 4.5).
        const kInk = parseRgb(probe.kLabel.color);
        const kcInk = parseRgb(probe.kcLabel.color);
        const capInk = parseRgb(probe.caption.color || "rgb(0,0,0)");
        log(
            `TEXT k-label ink ${probe.kLabel.color} w=${probe.kLabel.weight} vs plate ${fmt(smp[4])} = ${contrast(kInk, smp[4]).toFixed(2)}:1 [floor 4.5]`,
        );
        log(
            `TEXT kC-label ink ${probe.kcLabel.color} vs plate ${fmt(smp[1])} = ${contrast(kcInk, smp[1]).toFixed(2)}:1 [floor 4.5]`,
        );
        log(
            `TEXT caption ink ${probe.caption.color} vs plate ${fmt(smp[8])} = ${contrast(capInk, smp[8]).toFixed(2)}:1 [floor 4.5]`,
        );
        log(`console errors: ${errors.length} ${errors.slice(0, 3).join(" | ")}`);
        await ctx.close();
    }
}

// ---- Legs 3+4: interaction + extraction drive (1440-light) --------------
{
    const { ctx, page, errors } = await openCell(1440, 900, "light");
    log(`\n=== INTERACTION 1440-light ===`);

    // Leg 3: live-k — ArrowRight on the K thumb; ghost re-segments.
    const kThumb = page
        .locator('[data-o18="extract-k-rail"]')
        .locator("xpath=following-sibling::*")
        .locator(".slider-thumb")
        .first();
    await kThumb.click();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
    const afterK = await page.evaluate(() => ({
        label: document
            .querySelector('[data-o18="extract-k-rail"]')
            .parentElement.parentElement.querySelector("label")
            .textContent.trim(),
        segs: document.querySelectorAll(
            '[data-slot="shadow-palette"] .shadow-seg',
        ).length,
        swatches: document.querySelectorAll(
            '[data-slot="shadow-palette"] .shadow-swatch',
        ).length,
    }));
    log(
        `live-k: 5 → ArrowRight → label=${afterK.label} segs=${afterK.segs} swatches=${afterK.swatches} (expect 6/6/6)`,
    );
    await page.screenshot({ path: `${OUT}/1440-light-livek6.png` });

    // kC keyboard step
    const kcThumb = page
        .locator('[data-o18="extract-kc"] .slider-thumb')
        .first();
    await kcThumb.click();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);
    const kcVal = await page
        .locator('[data-o18="extract-kc"] span')
        .last()
        .textContent();
    log(`kC: 0.5 → ArrowRight → ${kcVal.trim()} (expect 0.6)`);

    // Leg 4: drive an extraction — 5-band test image.
    const b64 = await page.evaluate(() => {
        const c = document.createElement("canvas");
        c.width = 200;
        c.height = 120;
        const g = c.getContext("2d");
        const bands = ["#c2412e", "#e8a13a", "#3a7d5c", "#2e5fc2", "#7a3ac2"];
        bands.forEach((col, i) => {
            g.fillStyle = col;
            g.fillRect(i * 40, 0, 40, 120);
        });
        return c.toDataURL("image/png").split(",")[1];
    });
    await page
        .locator('input[type="file"]')
        .setInputFiles({
            name: "probe-bands.png",
            mimeType: "image/png",
            buffer: Buffer.from(b64, "base64"),
        });
    // catch the imminent skeleton if visible
    const skel = await page
        .locator('[data-slot="palette-card-skeleton"], .vj-morph-enter-active')
        .first()
        .isVisible()
        .catch(() => false);
    log(`imminent-skeleton caught mid-swap: ${skel}`);
    await page
        .locator("text=% of the image")
        .waitFor({ state: "visible", timeout: 20000 })
        .catch(() => log("WARN: dominance row did not appear in 20s"));
    await page.waitForTimeout(600);
    const developed = await page.evaluate(() => {
        const kRail = document.querySelector('[data-o18="extract-k-rail"]');
        const dom = [...document.querySelectorAll("span")].find((e) =>
            e.textContent.includes("% of the image"),
        );
        const code = document.querySelector("code.fira-code");
        return {
            railBgImage: getComputedStyle(kRail)
                .backgroundImage.slice(0, 140),
            railBgColor: getComputedStyle(kRail).backgroundColor,
            dominance: dom?.parentElement?.textContent.trim().slice(0, 60),
            dominantCss: code?.textContent.trim(),
            shadowGone: !document.querySelector('[data-slot="shadow-palette"]'),
            cardThere: !!document.querySelector('[data-slot="shadow-palette"]')
                ? false
                : !!document.querySelector(".palette-card, [class*='palette']"),
        };
    });
    log(`developed: ${JSON.stringify(developed, null, 1)}`);
    const full2 = await page.screenshot({
        path: `${OUT}/1440-light-developed.png`,
    });
    // K rail post-extraction: gradient IS the fill — measure gradient band vs plate
    const kr2 = await page
        .locator('[data-o18="extract-k-rail"]')
        .boundingBox();
    const pts2 = [
        [px(kr2.x + kr2.width * 0.1), px(kr2.y + kr2.height / 2)],
        [px(kr2.x + kr2.width * 0.9), px(kr2.y + kr2.height / 2)],
        [px(kr2.x + kr2.width * 0.5), px(kr2.y - 10)],
    ];
    const smp2 = await samplePixels(page, full2, pts2);
    log(
        `PIXEL developed K-rail left ${fmt(smp2[0])} / right ${fmt(smp2[1])} vs ground ${fmt(smp2[2])} = ${contrast(smp2[0], smp2[2]).toFixed(2)}:1 / ${contrast(smp2[1], smp2[2]).toFixed(2)}:1`,
    );

    // Reset → ghost returns (the standing instrument face)
    await page.getByTitle("Reset").click();
    await page.waitForTimeout(600);
    const ghostBack = await page
        .locator('[data-slot="shadow-palette"]')
        .isVisible();
    log(`reset → ghost instrument face returns: ${ghostBack}`);
    await page.screenshot({ path: `${OUT}/1440-light-reset.png` });
    log(`interaction console errors: ${errors.length}`);
    await ctx.close();
}

// ---- Leg 5: PRM degrade ---------------------------------------------------
{
    const { ctx, page } = await openCell(1440, 900, "light", {
        reducedMotion: "reduce",
    });
    const prm = await page.evaluate(() => {
        const seg = document.querySelector(
            '[data-slot="shadow-palette"] .shadow-seg',
        );
        const cs = getComputedStyle(seg);
        return {
            animationName: cs.animationName,
            duration: cs.animationDuration,
            playState: cs.animationPlayState,
        };
    });
    log(`\n=== PRM reduce === shadow-seg anim: ${JSON.stringify(prm)}`);
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/w8-extract-probe-log.txt`, report.join("\n") + "\n");
log(`\nDONE — frames + log in ${OUT}/`);
