// CHALLENGE-D pass 5 — probe D14. Read-only.
//   P1  CSSOM: is `text-caption` a real utility? (+ btn-interactive / mono-caption control)
//   P2  well fill vs host-plate fill: the SIGN of the tone step, light AND dark
//   P3  the two dashed-silhouette marks' INK, light AND dark
//   P4  the ghost→solid silhouette promise: add-slot ghost radius vs the
//       committed swatch radius for the SAME colour (seed divergence)
//   P6  the compound header label: label right edge → count left edge
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
    id: `seed-${n}`,
    slug: `seed-${n}`,
    name: n,
    colors: cols.map((css, i) => ({ css, position: i })),
    createdAt: Date.now(),
    isLocal: true,
});

async function seeded(browser, { viewport, colors, palettes = [], scheme = "light", dsf = 2 }) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.addInitScript(
        (s) => {
            localStorage.setItem(
                "color-picker",
                JSON.stringify({ inputColor: s.colors[0] ?? "lab(60% 20 20)", savedColors: s.colors }),
            );
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s.palettes }));
        },
        { colors, palettes },
    );
    await page.goto(BASE + "#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(2800);
    return { ctx, page };
}

const browser = await chromium.launch();
const R = {};

// ── P1 · CSSOM: which authored type atoms actually exist? ─────────────────────
{
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 },
        colors: draft(3),
        palettes: [P("Zebra", draft(3))],
    });
    R.P1 = await page.evaluate(() => {
        const hits = { "text-caption": [], "btn-interactive": [], "mono-caption": [], "text-small": [], "text-mono-small": [] };
        const walk = (rules, href) => {
            for (const r of rules) {
                if (r.cssRules) { walk(r.cssRules, href); continue; }
                const sel = r.selectorText;
                if (!sel) continue;
                for (const k of Object.keys(hits)) {
                    if (sel.includes("." + k)) hits[k].push({ sel, href: href ?? "inline", css: r.style?.cssText?.slice(0, 160) });
                }
            }
        };
        for (const sh of document.styleSheets) {
            try { walk(sh.cssRules, sh.href); } catch { /* cross-origin */ }
        }
        const counts = Object.fromEntries(Object.entries(hits).map(([k, v]) => [k, v.length]));
        // the three authored `text-caption` sites' rendered type
        const well = document.querySelector(".dashed-well");
        const cap = [...(well?.querySelectorAll(".text-caption") ?? [])].map((e) => {
            const s = getComputedStyle(e);
            return {
                text: e.textContent.trim().slice(0, 24),
                cls: e.className,
                fontSize: s.fontSize,
                fontFamily: s.fontFamily.split(",")[0],
                fontWeight: s.fontWeight,
                lineHeight: s.lineHeight,
            };
        });
        const tokens = getComputedStyle(document.documentElement);
        return {
            counts,
            samples: { "text-caption": hits["text-caption"].slice(0, 3), "mono-caption": hits["mono-caption"].slice(0, 2) },
            authoredCaptionSitesInWell: cap,
            varTypeCaption: tokens.getPropertyValue("--type-caption").trim(),
            varTextCaption: tokens.getPropertyValue("--text-caption").trim(),
        };
    });
    await ctx.close();
}

// ── P2/P3/P6 · the well's tone step + the dashed marks' ink, per scheme ───────
for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 },
        colors: draft(3),
        palettes: [],
        scheme,
    });
    const m = await page.evaluate(() => {
        const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        const lum = (str) => {
            const n = str.match(/[\d.]+/g)?.map(Number) ?? [];
            if (n.length < 3) return null;
            return 0.2126 * srgb(n[0] / 255) + 0.7152 * srgb(n[1] / 255) + 0.0722 * srgb(n[2] / 255);
        };
        const well = document.querySelector(".dashed-well");
        const wellS = getComputedStyle(well);
        // nearest ancestor with a non-transparent background = the host plate
        let host = well.parentElement, hostBg = null, hostEl = null;
        while (host) {
            const bg = getComputedStyle(host).backgroundColor;
            if (bg && !/rgba?\([^)]*,\s*0\)$/.test(bg) && bg !== "transparent") { hostBg = bg; hostEl = host.className; break; }
            host = host.parentElement;
        }
        const ghost = well.querySelector(".add-slot-ghost");
        const gs = ghost ? getComputedStyle(ghost) : null;
        // the EmptyPaletteMark trio: dashed-border faces outside the well
        const trio = [...document.querySelectorAll("*")]
            .filter((e) => !well.contains(e) && /dashed/.test(getComputedStyle(e).borderTopStyle) && e.getBoundingClientRect().width > 8 && e.getBoundingClientRect().width < 80)
            .slice(0, 4)
            .map((e) => {
                const s = getComputedStyle(e);
                return { w: +e.getBoundingClientRect().width.toFixed(1), borderColor: s.borderTopColor, borderWidth: s.borderTopWidth, radius: s.borderRadius.slice(0, 60) };
            });
        // P6 — the compound header: label right edge → count left edge
        const hdr = well.firstElementChild;
        const kids = [...hdr.children].map((e) => ({ t: e.textContent.trim().slice(0, 26), ...e.getBoundingClientRect().toJSON() }));
        const gap = kids.length > 1 ? +(kids[1].x - (kids[0].x + kids[0].width)).toFixed(1) : null;
        return {
            wellBg: wellS.backgroundColor,
            wellLum: lum(wellS.backgroundColor),
            wellBorder: `${wellS.borderTopWidth} ${wellS.borderTopStyle} ${wellS.borderTopColor}`,
            wellShadow: wellS.boxShadow.slice(0, 200),
            hostEl: String(hostEl).slice(0, 70),
            hostBg,
            hostLum: lum(hostBg),
            ghostBorderColor: gs?.borderTopColor,
            ghostBorderStyle: gs?.borderTopStyle,
            ghostBg: gs?.backgroundColor,
            ghostRadius: gs?.borderRadius,
            trio,
            headerChildren: kids.map((k) => ({ t: k.t, x: +k.x.toFixed(1), w: +k.width.toFixed(1) })),
            headerLabelToCountGapPx: gap,
            wellWidth: +well.getBoundingClientRect().width.toFixed(1),
        };
    });
    m.toneStepSign = m.wellLum != null && m.hostLum != null ? (m.wellLum > m.hostLum ? "well LIGHTER than host" : "well DARKER than host") : null;
    m.toneStepDelta = m.wellLum != null && m.hostLum != null ? +(m.wellLum - m.hostLum).toFixed(4) : null;
    R[`P2_${scheme}`] = m;
    await page.screenshot({ path: `${OUT}/p2-${scheme}-well.png`, clip: { x: 690, y: 120, width: 740, height: 620 } });
    await ctx.close();
}

// ── P4 · the ghost→solid silhouette promise ──────────────────────────────────
{
    const { ctx, page } = await seeded(browser, {
        viewport: { width: 1440, height: 1000 },
        colors: draft(3),
        palettes: [],
    });
    const read = () =>
        page.evaluate(() => {
            const well = document.querySelector(".dashed-well");
            const row = well.querySelector(".swatch-row");
            const faces = [...row.querySelectorAll("*")]
                .filter((e) => /^url\(/.test(getComputedStyle(e).filter))
                .map((e) => {
                    const s = getComputedStyle(e);
                    return {
                        cls: String(e.className).slice(0, 60),
                        isGhost: /dashed/.test(s.borderTopStyle),
                        bg: s.backgroundColor,
                        radius: s.borderRadius,
                        filter: s.filter.slice(0, 46),
                        w: +e.getBoundingClientRect().width.toFixed(1),
                    };
                });
            const ghost = well.querySelector(".add-slot-ghost");
            const gs = ghost ? getComputedStyle(ghost) : null;
            return {
                liveColor: document.querySelector(".add-slot-ghost")?.getAttribute("aria-label"),
                ghost: gs ? { radius: gs.borderRadius, filter: gs.filter.slice(0, 46), bg: gs.backgroundColor, tagAttr: ghost.getAttribute("tag"), tagName: ghost.tagName } : null,
                faces,
                n: faces.length,
            };
        });
    const before = await read();
    await page.screenshot({ path: `${OUT}/p4-before-commit.png`, clip: { x: 690, y: 120, width: 740, height: 420 } });
    await page.locator(".add-slot-ghost").click({ force: true });
    await page.waitForTimeout(1200);
    const after = await read();
    await page.screenshot({ path: `${OUT}/p4-after-commit.png`, clip: { x: 690, y: 120, width: 740, height: 420 } });
    R.P4 = { before, after };
    // the committed swatch = the face whose bg matches the live colour, i.e. the new last one
    R.P4.verdict = {
        ghostRadiusBeforeClick: before.ghost?.radius,
        newFaceRadiusAfterClick: after.faces.at(-1)?.radius,
        identical: before.ghost?.radius === after.faces.at(-1)?.radius,
        ghostRadiusAfterClick: after.ghost?.radius,
        ghostReshapedByCommit: before.ghost?.radius !== after.ghost?.radius,
        faceCountBefore: before.n,
        faceCountAfter: after.n,
    };
    await ctx.close();
}

await browser.close();
writeFileSync(`${HERE}/probe-D14-pass5.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
