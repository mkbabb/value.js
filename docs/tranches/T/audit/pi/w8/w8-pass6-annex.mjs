/**
 * T.W8 · PASS 6 ANNEX — the T-45/T-53 bisection re-run (probe-only; in-page
 * style toggles are the t33-research §6.8 bisection idiom — the app TREE is
 * never written). BUILT bundle (:8651), dark @1440 dpr2, owner color.
 *
 * Three states per card (Mix card · Generate card · picker shell):
 *   A · AS-LANDED (carrier ::before live, card filter dead)
 *   B · PRE-CARRIER (carrier dead, card's own backdrop-filter restored) —
 *       the state the §6.8 bisection judged; the smear should REAPPEAR
 *   C · BLUR-DEAD (carrier dead, card filter dead) — the no-blur baseline
 * Metric: per-row mean luminance profile over a 400×42-CSS-px strip crossing
 * the top edge (single capture per state; band = edge+1.5..+10 CSS px,
 * baseline = +14..+22). Also: argmax row (device px inside edge), and the
 * caster forensic (computed box-shadow both schemes + corner geometry).
 */
import { chromium } from "@playwright/test";
import { appendFileSync } from "node:fs";

const BUILT = "http://localhost:8651";
const OUT = "docs/tranches/T/audit/pi/w8/mix-generate";
const OWNER_COLOR = "lab(40.39% 52.94 47.26 / 82.7%)";
const deepLink = (view) =>
    `${BUILT}/#/${view}?space=lab&color=${encodeURIComponent(OWNER_COLOR)}`;

const report = [];
const log = (s) => {
    console.log(s);
    report.push(s);
};

const browser = await chromium.launch({ headless: false, channel: "chromium" });

async function edgeProfile(page, clip) {
    const buf = await page.screenshot({ clip });
    const b64 = buf.toString("base64");
    return page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const means = [];
        for (let y = 0; y < c.height; y++) {
            let s = 0;
            for (let x = 0; x < c.width; x++) {
                const i = (y * c.width + x) * 4;
                s += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            }
            means.push(+(s / c.width).toFixed(2));
        }
        return means;
    }, b64);
}

function read(rows, edgeCss, dpr = 2) {
    const e = Math.round(edgeCss * dpr);
    const band = rows.slice(e + 3, e + 20);
    const base = rows.slice(e + 28, e + 44);
    const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
    const bm = mean(base);
    const max = Math.max(...band);
    const argmax = band.indexOf(max);
    return {
        deltaMax: +(max - bm).toFixed(2),
        deltaMean: +(mean(band) - bm).toFixed(2),
        argmaxCssPxInsideEdge: +((argmax + 3) / dpr).toFixed(1),
    };
}

const STATE_CSS = {
    B: `.pane-wrapper:has(> .glass-resting)::before,
        .pane-wrapper:not(:has(> .glass-resting)) > div:has(> .glass-resting)::before { backdrop-filter: none !important; }
        .pane-wrapper > .glass-resting, .pane-wrapper > div > .glass-resting { backdrop-filter: var(--glass-blur-resting) !important; }`,
    C: `.pane-wrapper:has(> .glass-resting)::before,
        .pane-wrapper:not(:has(> .glass-resting)) > div:has(> .glass-resting)::before { backdrop-filter: none !important; }
        .pane-wrapper > .glass-resting, .pane-wrapper > div > .glass-resting { backdrop-filter: none !important; }`,
};

for (const view of ["mix", "generate"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "dark",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(deepLink(view));
    await page.waitForSelector(".glass-dock", { timeout: 20000 });
    await page.waitForTimeout(3500);
    const title = view === "mix" ? "Mix" : "Generate";
    const card = page
        .locator(`.glass-resting:has(h3:text-is("${title}"))`)
        .first();
    const b = await card.boundingBox();
    const clip = {
        x: b.x + Math.min(120, b.width / 4),
        y: b.y - 10,
        width: Math.min(400, b.width / 2),
        height: 42,
    };
    // state A (as landed)
    const A = read(await edgeProfile(page, clip), 10);
    // state B (pre-carrier restored)
    const hB = await page.addStyleTag({ content: STATE_CSS.B });
    await page.waitForTimeout(250);
    const B = read(await edgeProfile(page, clip), 10);
    await page.screenshot({
        path: `${OUT}/annex-${view}-1440-dark-precarrier-top-edge.png`,
        clip: { x: b.x + 60, y: b.y - 14, width: Math.min(b.width - 120, 640), height: 60 },
    });
    await hB.evaluate((el) => el.remove());
    // state C (blur dead)
    const hC = await page.addStyleTag({ content: STATE_CSS.C });
    await page.waitForTimeout(250);
    const C = read(await edgeProfile(page, clip), 10);
    await hC.evaluate((el) => el.remove());
    log(
        `annex-${view} · A(landed) Δmax ${A.deltaMax} Δmean ${A.deltaMean} argmax@+${A.argmaxCssPxInsideEdge}px · B(pre-carrier) Δmax ${B.deltaMax} Δmean ${B.deltaMean} argmax@+${B.argmaxCssPxInsideEdge}px · C(no-blur) Δmax ${C.deltaMax} Δmean ${C.deltaMean} argmax@+${C.argmaxCssPxInsideEdge}px`,
    );
    log(
        `annex-${view} · carrier-vs-noblur residual: Δmean(A−C) = ${(A.deltaMean - C.deltaMean).toFixed(2)}/255 · pre-carrier smear head-room: Δmean(B−C) = ${(B.deltaMean - C.deltaMean).toFixed(2)}/255`,
    );

    // caster forensic
    const caster = await card.evaluate((el) => {
        const s = getComputedStyle(el).boxShadow;
        const root = getComputedStyle(document.documentElement);
        return {
            boxShadow: s,
            shadowColorVar: root.getPropertyValue("--shadow-color").trim(),
            fg: root.getPropertyValue("--foreground").trim(),
        };
    });
    log(`annex-${view} · CASTER dark: box-shadow=${caster.boxShadow}`);
    log(
        `annex-${view} · --shadow-color=${caster.shadowColorVar} · --foreground=${caster.fg}`,
    );
    // right-edge caster band numeric: columns crossing the right edge at mid-height
    const rBuf = await page.screenshot({
        clip: { x: b.x + b.width - 6, y: b.y + b.height / 2, width: 26, height: 60 },
    });
    const cols = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const means = [];
        for (let x = 0; x < c.width; x++) {
            let s = 0;
            for (let y = 0; y < c.height; y++) {
                const i = (y * c.width + x) * 4;
                s += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
            }
            means.push(+(s / c.height).toFixed(1));
        }
        return means;
    }, rBuf.toString("base64"));
    log(
        `annex-${view} · right-edge column profile (x from cardRight−6px, dpr2): ${cols.join(" ")}`,
    );
    await ctx.close();
}

// light-scheme caster record (for the pairing)
{
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(deepLink("generate"));
    await page.waitForSelector(".glass-dock", { timeout: 20000 });
    await page.waitForTimeout(3000);
    const caster = await page
        .locator('.glass-resting:has(h3:text-is("Generate"))')
        .first()
        .evaluate((el) => getComputedStyle(el).boxShadow);
    log(`annex-generate · CASTER light: box-shadow=${caster}`);
    await ctx.close();
}

await browser.close();
appendFileSync(
    `${OUT}/../w8-pass6-probe-log.txt`,
    "\n═══ ANNEX · bisection + caster ═══\n" + report.join("\n") + "\n",
);
log("ANNEX DONE");
