// CHALLENGE-D pass 3 — PaletteCard design probe.
// Read-only. Seeds localStorage with a fixture, then measures geometry that
// prior passes did not: the FIELD (grid columns / card aspect), the
// loading→loaded silhouette delta, the Mix selection register, and the
// Extract `aside` arm.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const R = {};

const NOW = new Date().toISOString();
const mk = (css, i) => ({ css, position: i });
const FIXTURE = {
    version: 1,
    palettes: [
        {
            id: "p-sunset", slug: "sunset-ridge", name: "Sunset Ridge",
            createdAt: NOW, updatedAt: NOW, isLocal: true,
            colors: ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"].map(mk),
            tags: ["warm", "test", "alpha"], forkCount: 3, versionCount: 4,
        },
        {
            id: "p-ocean", slug: "deep-ocean", name: "Deep Ocean",
            createdAt: NOW, updatedAt: NOW, isLocal: true,
            colors: ["#03045e", "#0077b6", "#00b4d8"].map(mk), tags: ["cool"],
        },
        {
            id: "p-empty", slug: "empty", name: "Empty",
            createdAt: NOW, updatedAt: NOW, isLocal: true, colors: [],
        },
        {
            id: "p-24", slug: "twentyfour", name: "Twentyfour",
            createdAt: NOW, updatedAt: NOW, isLocal: true,
            colors: Array.from({ length: 24 }, (_, i) => mk(`hsl(${i * 15} 70% 55%)`, i)),
        },
        {
            id: "p-long", slug: "long-name", name: "A very long palette name that will not fit",
            createdAt: NOW, updatedAt: NOW, isLocal: true,
            colors: ["#111", "#333", "#555"].map(mk), tags: ["one", "two", "three"],
            forkCount: 2, versionCount: 3,
        },
    ],
};

const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
};

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));

    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2500);

    // ---- P1: the FIELD. grid columns, card aspect, strip aspect. -----------
    R.field_1440 = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        if (!grid) return { error: "no grid" };
        const gs = getComputedStyle(grid);
        const cards = [...document.querySelectorAll('[role="article"]')];
        const rr = (e) => { const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
        return {
            gridTemplateColumns: gs.gridTemplateColumns,
            gridGap: gs.gap,
            gridWidth: +grid.getBoundingClientRect().width.toFixed(1),
            contain: gs.contain,
            cards: cards.map((c) => {
                const strip = c.querySelector('[role="presentation"]');
                const title = c.querySelector(".font-display");
                const cs = getComputedStyle(c);
                return {
                    label: c.getAttribute("aria-label"),
                    card: rr(c),
                    aspect: +(c.getBoundingClientRect().width / c.getBoundingClientRect().height).toFixed(2),
                    strip: strip ? rr(strip) : null,
                    stripAspect: strip ? +(strip.getBoundingClientRect().width / strip.getBoundingClientRect().height).toFixed(1) : null,
                    inkArea: title ? rr(title) : null,
                    padInline: cs.paddingInlineStart,
                    boxShadow: cs.boxShadow,
                    borderWidth: cs.borderTopWidth,
                    borderRadius: cs.borderRadius,
                    cursor: cs.cursor,
                    tabIndex: c.tabIndex,
                    transition: cs.transitionProperty + " / " + cs.transitionDuration,
                };
            }),
        };
    });

    // ---- P2: interactive register. hover / focus / active on the root ------
    R.hoverRegister = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        if (!c) return { error: "no [role=article]", bodyText: document.body.innerText.slice(0, 400) };
        return {
            classList: c.className,
            // Enumerate every CSS rule in the document that could give this
            // element a hover/focus/active treatment.
            matchingHoverRules: (() => {
                const out = [];
                for (const sheet of document.styleSheets) {
                    let rules; try { rules = sheet.cssRules; } catch { continue; }
                    const walk = (rs) => {
                        for (const r of rs) {
                            if (r.cssRules) { walk(r.cssRules); continue; }
                            if (!r.selectorText) continue;
                            if (!/:hover|:active|:focus/.test(r.selectorText)) continue;
                            const base = r.selectorText.replace(/:(hover|active|focus-visible|focus)\b/g, "");
                            try { if (c.matches(base)) out.push(r.selectorText + " { " + r.style.cssText.slice(0, 120) + " }"); } catch { }
                        }
                    };
                    walk(rules);
                }
                return out;
            })(),
            castComputed: (() => {
                const cast = c.querySelector(".cartoon-cast");
                if (!cast) return "NO .cartoon-cast NODE";
                const s = getComputedStyle(cast);
                const r = cast.getBoundingClientRect();
                return { display: s.display, position: s.position, boxShadow: s.boxShadow, w: r.width, h: r.height, content: s.content };
            })(),
            cardPressTReaders: (() => {
                const out = [];
                for (const sheet of document.styleSheets) {
                    let rules; try { rules = sheet.cssRules; } catch { continue; }
                    const walk = (rs) => { for (const r of rs) { if (r.cssRules) { walk(r.cssRules); continue; } if (r.style && r.style.cssText.includes("--card-press-t")) out.push(r.selectorText); } };
                    walk(rules);
                }
                return out;
            })(),
            shadowCartoonMd: getComputedStyle(document.documentElement).getPropertyValue("--shadow-cartoon-md").trim(),
            cardPadInline: getComputedStyle(document.documentElement).getPropertyValue("--card-pad-inline").trim(),
            spacing: getComputedStyle(document.documentElement).getPropertyValue("--spacing").trim(),
        };
    });

    await page.screenshot({ path: OUT + "p3-field-1440-light.png", fullPage: true });

    // hover the first card and diff the computed style
    R.hoverDelta = await (async () => {
        const before = await page.evaluate(() => {
            const c = document.querySelector('[role="article"]');
            const s = getComputedStyle(c);
            return { boxShadow: s.boxShadow, transform: s.transform, bg: s.backgroundColor, borderColor: s.borderTopColor, filter: s.filter };
        });
        await page.hover('[role="article"]');
        await page.waitForTimeout(500);
        const after = await page.evaluate(() => {
            const c = document.querySelector('[role="article"]');
            const s = getComputedStyle(c);
            return { boxShadow: s.boxShadow, transform: s.transform, bg: s.backgroundColor, borderColor: s.borderTopColor, filter: s.filter };
        });
        return { before, after, identical: JSON.stringify(before) === JSON.stringify(after) };
    })();

    // ---- P3: loading→loaded silhouette. Render the skeleton next to a card.
    R.skeletonVsCard = await page.evaluate(() => {
        // measure the class-declared geometry of the two artefacts without
        // mutating the app: read the source-declared utility sizes off a
        // detached clone is unsafe; instead read the live card + construct
        // nothing. We report the card's collapsed height and the skeleton's
        // declared block heights from its own utility classes.
        const cards = [...document.querySelectorAll('[role="article"]')];
        const r = cards.map((c) => +c.getBoundingClientRect().height.toFixed(1));
        return { collapsedCardHeights: r };
    });

    // ---- P4: 390 mobile arm -----------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(900);
    R.field_390 = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        const gs = getComputedStyle(grid);
        const cards = [...document.querySelectorAll('[role="article"]')];
        return {
            gridTemplateColumns: gs.gridTemplateColumns,
            cards: cards.map((c) => {
                const t = c.querySelector(".font-display");
                const row = t ? t.parentElement : null;
                const rr = (e) => { const b = e.getBoundingClientRect(); return { w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
                return {
                    label: c.getAttribute("aria-label"),
                    card: rr(c),
                    title: t ? { ...rr(t), scrollW: t.scrollWidth, text: t.textContent.trim() } : null,
                    rowChildren: row ? [...row.children].map((k) => ({ tag: k.tagName.toLowerCase(), cls: k.className.slice(0, 40), w: +k.getBoundingClientRect().width.toFixed(1) })) : null,
                };
            }),
        };
    });
    await page.screenshot({ path: OUT + "p3-field-390-light.png", fullPage: true });

    // ---- P5: dark arm ------------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(1200);
    R.dark = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const s = getComputedStyle(c);
        const parent = getComputedStyle(c.parentElement);
        return {
            htmlClass: document.documentElement.className,
            cardBg: s.backgroundColor, cardBorder: s.borderTopColor, boxShadow: s.boxShadow,
            fieldBg: parent.backgroundColor,
            shadowCartoonMd: getComputedStyle(document.documentElement).getPropertyValue("--shadow-cartoon-md").trim(),
        };
    });
    await page.screenshot({ path: OUT + "p3-field-1440-dark.png", fullPage: true });
    await page.emulateMedia({ colorScheme: "light" });

    // ---- P6: Mix selection register ---------------------------------------
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    R.mix = await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button")].filter((b) => b.querySelector('[role="article"]'));
        return {
            wrapperButtonCount: btns.length,
            wrappers: btns.slice(0, 4).map((b) => {
                const s = getComputedStyle(b);
                const card = b.querySelector('[role="article"]');
                const seg = card?.querySelector('[role="presentation"] > div');
                const segS = seg ? getComputedStyle(seg) : null;
                return {
                    opacity: s.opacity, boxShadow: s.boxShadow, outline: s.outline,
                    innerInteractive: b.querySelectorAll("button, input, [tabindex]").length,
                    innerRoles: [...b.querySelectorAll("[role]")].map((e) => e.getAttribute("role")),
                    declaredSegColor: segS ? segS.backgroundColor : null,
                    segRect: seg ? (() => { const r = seg.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })() : null,
                };
            }),
        };
    });
    if (R.mix.wrapperButtonCount) await page.screenshot({ path: OUT + "p3-mix-selection.png", fullPage: true });

    // ---- P7: Extract aside arm --------------------------------------------
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    R.extract = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const ghost = document.querySelector('[data-slot="shadow-palette"]');
        const gh = ghost ? ghost.getBoundingClientRect() : null;
        return {
            cardPresent: !!card,
            ghostPresent: !!ghost,
            ghostRect: gh ? { w: +gh.width.toFixed(1), h: +gh.height.toFixed(1) } : null,
            ghostSwatchDeclared: ghost ? [...ghost.querySelectorAll(".shadow-swatch")].slice(0, 2).map((e) => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height }; }) : null,
            ghostSegCount: ghost ? ghost.querySelectorAll(".shadow-seg").length : 0,
        };
    });
    await page.screenshot({ path: OUT + "p3-extract-ghost.png", fullPage: true });

    R.consoleErrors = errs;
    writeFileSync(OUT + "../probe-D5-results.json", JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
