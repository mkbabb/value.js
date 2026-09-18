// CHALLENGE-D pass 5 — probe D15. Read-only.
//   Q1  do the authored type/motion atoms DO anything? (A/B computed diff, not a CSSOM walk)
//   Q2  the producer surface the four WatercolorDot call sites actually get
//   Q3  the well's tone step vs its host plate — the SIGN, both schemes (canvas luminance)
//   Q4  the two dashed marks' INK (the ghost STROKE element, not the face), both schemes
//   Q5  drain the draft through the hover panel, then fire the surviving `Update`
//   Q6  the edit overlay's FROM ghost vs the face it claims to align over
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${HERE}/frames-D14`;
const BASE = "http://localhost:9000/";

const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));
const P = (n, cols) => ({
    id: `seed-${n}`, slug: `seed-${n}`, name: n,
    colors: cols.map((css, i) => ({ css, position: i })),
    createdAt: Date.now(), isLocal: true,
});

async function seeded(browser, { viewport, colors, palettes = [], scheme = "light", dsf = 2, touch = false }) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf, colorScheme: scheme, hasTouch: touch });
    const page = await ctx.newPage();
    const logs = [];
    page.on("console", (m) => logs.push(`${m.type()}: ${m.text().slice(0, 220)}`));
    await page.addInitScript(
        (s) => {
            localStorage.setItem("color-picker", JSON.stringify({ inputColor: s.colors[0] ?? "lab(60% 20 20)", savedColors: s.colors }));
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s.palettes }));
        },
        { colors, palettes },
    );
    await page.goto(BASE + "#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(2800);
    return { ctx, page, logs };
}

const CANVAS_LUM = `
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const c2 = cv.getContext("2d", { willReadFrequently: true });
  window.__rgb = (str) => { c2.clearRect(0,0,1,1); c2.fillStyle = "#000"; c2.fillStyle = str;
    c2.fillRect(0,0,1,1); const d = c2.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]]; };
  window.__lum = (str) => { const [r,g,b] = window.__rgb(str);
    const f = (v) => { v/=255; return v <= 0.03928 ? v/12.92 : ((v+0.055)/1.055)**2.4; };
    return +(0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b)).toFixed(5); };
`;

const browser = await chromium.launch();
const R = {};

// ── Q1 + Q2 · atoms that do nothing; the producer surface ────────────────────
{
    const { ctx, page, logs } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 }, colors: draft(3), palettes: [P("Zebra", draft(3))],
    });
    R.Q1 = await page.evaluate(() => {
        const host = document.querySelector(".dashed-well");
        const probe = (cls) => {
            const a = document.createElement("span"), b = document.createElement("span");
            a.textContent = b.textContent = "Mg";
            if (cls) a.className = cls;
            host.append(a, b);
            const sa = getComputedStyle(a), sb = getComputedStyle(b);
            const pick = (s) => ({
                fontSize: s.fontSize, fontFamily: s.fontFamily.split(",")[0].replace(/"/g, ""),
                fontWeight: s.fontWeight, lineHeight: s.lineHeight,
                letterSpacing: s.letterSpacing,
                transitionProperty: s.transitionProperty, transitionDuration: s.transitionDuration,
            });
            const A = pick(sa), B = pick(sb);
            a.remove(); b.remove();
            const diff = Object.keys(A).filter((k) => A[k] !== B[k]);
            return { with: A, without: B, changedProps: diff, isNoOp: diff.length === 0 };
        };
        return {
            "text-caption": probe("text-caption"),
            "text-small": probe("text-small"),
            "text-mono-small": probe("text-mono-small"),
            "mono-caption": probe("mono-caption"),
            "btn-interactive": probe("btn-interactive"),
        };
    });

    R.Q2 = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const dots = [...well.querySelectorAll('[data-testid="watercolor-swatch"]')];
        return {
            dotCount: dots.length,
            plusGlyphsInWell: well.querySelectorAll("svg.lucide-plus, svg.lucide-Plus").length,
            svgsInWell: [...well.querySelectorAll("svg")].map((s) => String(s.getAttribute("class") ?? s.tagName)).slice(0, 8),
            dots: dots.map((d) => {
                const s = getComputedStyle(d);
                return {
                    cls: String(d.className).slice(0, 74),
                    tagName: d.tagName,
                    ariaHidden: d.getAttribute("aria-hidden"),
                    ariaLabel: d.getAttribute("aria-label"),
                    tagAttr: d.getAttribute("tag"),
                    role: d.getAttribute("role"),
                    pointerEvents: s.pointerEvents,
                    dataVariant: d.getAttribute("data-variant"),
                    childCount: d.children.length,
                    childTags: [...d.children].map((c) => c.tagName + "." + String(c.className).slice(0, 22)),
                };
            }),
            // the whole well's accessible surface
            focusables: [...well.querySelectorAll("a,button,input,select,textarea,[tabindex]")].map((e) => ({
                tag: e.tagName, name: e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 24) ?? "", type: e.type ?? "",
            })),
        };
    });
    R.Q2.consoleWarnings = logs.filter((l) => /warn|error/i.test(l)).slice(0, 12);
    await ctx.close();
}

// ── Q3 + Q4 · tone-step sign and dashed ink, per scheme ──────────────────────
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 }, colors: draft(3), palettes: [], scheme,
    });
    await page.addScriptTag({ content: CANVAS_LUM });
    R[`Q34_${scheme}`] = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const wellS = getComputedStyle(well);
        let host = well.parentElement, hostBg = null, hostCls = null;
        while (host) {
            const bg = getComputedStyle(host).backgroundColor;
            const [, , , a] = window.__rgb(bg);
            if (a > 8) { hostBg = bg; hostCls = String(host.className).slice(0, 60); break; }
            host = host.parentElement;
        }
        const wellLum = window.__lum(wellS.backgroundColor);
        const hostLum = window.__lum(hostBg);
        // the dashed ink lives on the GHOST STROKE element, not the face
        const wellStroke = well.querySelector(".watercolor-ghost-stroke");
        const strokeS = wellStroke ? getComputedStyle(wellStroke) : null;
        const trio = [...document.querySelectorAll(".watercolor-ghost-stroke")]
            .filter((e) => !well.contains(e))
            .map((e) => {
                const s = getComputedStyle(e);
                return {
                    borderColor: s.borderTopColor, rgb: window.__rgb(s.borderTopColor),
                    borderWidth: s.borderTopWidth, borderStyle: s.borderTopStyle,
                    w: +e.getBoundingClientRect().width.toFixed(1),
                };
            });
        return {
            wellBg: wellS.backgroundColor, wellRgb: window.__rgb(wellS.backgroundColor), wellLum,
            hostCls, hostBg, hostRgb: window.__rgb(hostBg), hostLum,
            toneStepDelta: +(wellLum - hostLum).toFixed(5),
            toneStepSign: wellLum > hostLum ? "well LIGHTER than host (raised)" : "well DARKER than host (recessed)",
            wellEdge: `${wellS.borderTopWidth} ${wellS.borderTopStyle} ${wellS.borderTopColor}`,
            addSlotStroke: strokeS
                ? { borderColor: strokeS.borderTopColor, rgb: window.__rgb(strokeS.borderTopColor), borderWidth: strokeS.borderTopWidth, borderStyle: strokeS.borderTopStyle, w: +wellStroke.getBoundingClientRect().width.toFixed(1) }
                : null,
            emptyMarkStrokes: trio,
        };
    });
    await ctx.close();
}

// ── Q5 · drain the draft through the hover panel, then fire `Update` ─────────
{
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 }, colors: draft(2), palettes: [P("Zebra", draft(3))],
    });
    const store = () =>
        page.evaluate(() => {
            const s = JSON.parse(localStorage.getItem("color-palettes") ?? "{}");
            return (s.palettes ?? []).map((p) => ({ name: p.name, n: p.colors?.length ?? null, positions: (p.colors ?? []).map((c) => c.position) }));
        });
    const wellText = () => page.evaluate(() => document.querySelector(".dashed-well")?.textContent.replace(/\s+/g, " ").trim());

    R.Q5 = { storeBefore: await store() };
    await page.locator('.dashed-well input[type="text"], .dashed-well input').first().fill("Zebra");
    await page.locator(".dashed-well button").last().click();
    await page.waitForTimeout(500);
    R.Q5.afterCommitAttempt = { well: await wellText(), store: await store() };
    await page.screenshot({ path: `${OUT}/q5a-collision.png`, clip: { x: 690, y: 120, width: 740, height: 400 } });

    // drain: hover each face's wrapper, click the teleported Remove button
    const drained = [];
    for (let k = 0; k < 4; k++) {
        const faces = page.locator('.swatch-row [data-testid="watercolor-swatch"]:not(.add-slot-ghost)');
        const n = await faces.count();
        if (n === 0) break;
        await faces.first().hover({ force: true }).catch(() => {});
        await page.waitForTimeout(450);
        const rm = page.locator('[aria-label^="Remove color"]').first();
        const vis = await rm.count();
        if (!vis) { drained.push({ iter: k, facesLeft: n, removeButtonFound: false }); break; }
        const box = await rm.boundingBox();
        await rm.click({ force: true, timeout: 4000 }).catch((e) => drained.push({ iter: k, clickError: String(e).slice(0, 90) }));
        await page.waitForTimeout(500);
        drained.push({ iter: k, facesBefore: n, removeBtnBox: box, facesAfter: await page.locator('.swatch-row [data-testid="watercolor-swatch"]:not(.add-slot-ghost)').count() });
    }
    R.Q5.drain = drained;
    R.Q5.afterDrain = { well: await wellText(), store: await store(), draftColors: await page.evaluate(() => JSON.parse(localStorage.getItem("color-picker") ?? "{}").savedColors?.length ?? null) };
    await page.screenshot({ path: `${OUT}/q5b-collision-empty-draft.png`, clip: { x: 690, y: 120, width: 740, height: 400 } });

    // the surviving Update
    const upd = page.locator('.dashed-well button:has-text("Update")');
    R.Q5.updateVisible = await upd.count();
    if (await upd.count()) {
        await upd.first().click({ force: true });
    }
    await page.waitForTimeout(700);
    R.Q5.afterUpdate = { well: await wellText(), store: await store() };
    await page.screenshot({ path: `${OUT}/q5c-after-update.png`, clip: { x: 690, y: 120, width: 740, height: 400 } });
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/probe-D15-pass5.json`, JSON.stringify(R, null, 2));
console.log("done");
