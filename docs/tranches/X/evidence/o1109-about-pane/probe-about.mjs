// LANE about-pane falsifier: the About (picker explanation) pane's rect, prose measure and centring.
// usage: node about.mjs <base-url> <tag> [widths] [schemes]
// GREEN per cell:
//   (a) card inline size <= --picker-measure (+0.5px)   [contained: the picker's own measure]
//   (b) |left gap - right gap| of the card inside its column <= 1px   [centred in its column]
//   (c) prose measure (body <p> content width / advance of "0") <= 66ch   [readable line]
//   (d) guide body <p>: font-size <= 16px and line-height/font-size <= 1.65   [tighter body: leading-7 (1.75) retires]
//   (g) guide <h2> font-size <= --type-heading (1.618rem)   [headings one rung tighter than stock 3xl]
//   (e) card block-end inside the viewport-bounded port: card height <= its region's height + 0.5, doc not widened
//   (h) the plate fills the pane root (the T-45 blur carrier is the root's ::before; a narrower plate leaves a full-column blur band)
//   (f) reduced motion: same geometry with prefers-reduced-motion: reduce (rest layout identical)
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const [base, tag = "run", wArg = "360,390,430,820,1440", sArg = "light,dark"] = process.argv.slice(2);
const widths = wArg.split(",").map(Number);
const schemes = sArg.split(",");
const H = { 360: 780, 390: 844, 430: 932, 820: 1180, 1440: 900 };
const OUT = process.env.OUT ?? `./out/${tag}`;
mkdirSync(OUT, { recursive: true });

const measure = () => {
    const card = document.querySelector(".about-card");
    if (!card) return { missing: true };
    const col = card.closest(".pane-wrapper");
    const r = card.getBoundingClientRect();
    const c = col.getBoundingClientRect();
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--picker-measure);font-size:var(--type-heading)";
    document.body.appendChild(probe);
    const pickerMeasure = probe.getBoundingClientRect().width;
    const headPx = parseFloat(getComputedStyle(probe).fontSize);
    probe.remove();
    const p = card.querySelector(".markdown-body > p") ?? card.querySelector("[data-fact='definition']");
    let ch = null, pFont = null, pW = null, pLead = null;
    if (p) {
        const cs = getComputedStyle(p);
        pFont = parseFloat(cs.fontSize);
        pLead = +(parseFloat(cs.lineHeight) / pFont).toFixed(3);
        pW = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        ch = pW / ctx.measureText("0").width;
    }
    const h2 = card.querySelector(".markdown-body > h2");
    return {
        cardW: +r.width.toFixed(1), cardH: +r.height.toFixed(1), cardL: +r.left.toFixed(1),
        colW: +c.width.toFixed(1), colH: +c.height.toFixed(1),
        gapL: +(r.left - c.left).toFixed(1), gapR: +(c.right - r.right).toFixed(1),
        pickerMeasure: +pickerMeasure.toFixed(1), headPx, pFont, pLead, pW: pW && +pW.toFixed(1),
        ch: ch && +ch.toFixed(1), h2Font: h2 ? parseFloat(getComputedStyle(h2).fontSize) : null,
        docSW: document.documentElement.scrollWidth, vw: innerWidth,
        docSH: document.documentElement.scrollHeight,
        hostW: +card.parentElement.getBoundingClientRect().width.toFixed(1),
    };
};

const browser = await chromium.launch();
const rows = [];
try {
    for (const w of widths) {
        for (const scheme of schemes) {
            for (const reduced of [false, true]) {
                const ctx = await browser.newContext({
                    viewport: { width: w, height: H[w] ?? 900 },
                    colorScheme: scheme,
                    reducedMotion: reduced ? "reduce" : "no-preference",
                });
                try {
                    const page = await ctx.newPage();
                    await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
                    await page.waitForSelector(".about-card .markdown-body > p", { timeout: 30000 });
                    await page.waitForTimeout(1500);
                    const m = await page.evaluate(measure);
                    const pass = {
                        a: m.cardW <= m.pickerMeasure + 0.5,
                        b: Math.abs(m.gapL - m.gapR) <= 1,
                        c: m.ch <= 66,
                        d: m.pFont <= 16.01 && m.pLead <= 1.65,
                        g: m.h2Font <= m.headPx + 0.01,
                        h: Math.abs(m.hostW - m.cardW) < 1,
                        e: m.cardH <= m.colH + 0.5 && m.docSW <= m.vw,
                    };
                    const row = { w, scheme, reduced, ...m, pass, green: Object.values(pass).every(Boolean) };
                    rows.push(row);
                    if (!reduced) {
                        const card = page.locator(".about-card");
                        await card.scrollIntoViewIfNeeded();
                        await page.screenshot({ path: `${OUT}/home-${w}-${scheme}.png` });
                    }
                    console.log(JSON.stringify(row));
                } finally {
                    await ctx.close();
                }
            }
        }
    }
} finally {
    await browser.close();
}
// (f) reduced-motion rest geometry equals the full-motion rest geometry
for (const r of rows.filter((x) => x.reduced)) {
    const f = rows.find((x) => !x.reduced && x.w === r.w && x.scheme === r.scheme);
    r.pass.f = f && Math.abs(f.cardW - r.cardW) < 0.5 && Math.abs(f.gapL - r.gapL) < 0.5;
    r.green = r.green && r.pass.f;
}
const green = rows.every((r) => r.green);
writeFileSync(`${OUT}/rows.json`, JSON.stringify({ green, rows }, null, 1));
console.log(green ? "VERDICT GREEN" : `VERDICT RED (${rows.filter((r) => !r.green).length}/${rows.length} cells red)`);
