// PaletteCard CHALLENGE-D probe 2 — expanded state, keyboard reach, C-ladder,
// forced-colors gold shimmer, RTL, PRM motion.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("./shots/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const now = "2026-07-24T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const STORE = { version: 1, palettes: [
    mk("Sunset", "sunset", ["#ff6b6b", "#f7b267", "#f79d65", "#f4845f", "#f27059"]),
    mk("A very long palette name that will absolutely not fit on one line inside this card body row",
       "longname", ["#264653", "#2a9d8f", "#e9c46a"],
       { tags: ["warm", "earthy", "autumn", "fourth"], forkCount: 3, versionCount: 4, forkOf: "other-slug" }),
    mk("Featured One", "featured-one",
       ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226","#333333","#777777"],
       { tier: "featured" }),
    mk("Single", "single", ["#8ecae6"]),
    mk("Empty", "empty", []),
] };

async function open(opts = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: opts.viewport ?? { width: 1440, height: 1400 },
        colorScheme: opts.colorScheme ?? "light",
        reducedMotion: opts.reducedMotion ?? "no-preference",
        forcedColors: opts.forcedColors ?? "none",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.addInitScript(([store, dir]) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
        if (dir === "rtl") {
            const set = () => document.documentElement.setAttribute("dir", "rtl");
            set();
            document.addEventListener("DOMContentLoaded", set);
        }
    }, [STORE, opts.dir ?? "ltr"]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    return { browser, page };
}

const R = {};

// ─── A. C-ladder + row geometry ────────────────────────────────────────────
{
    const { browser, page } = await open();
    R.ladder = await page.evaluate(() => {
        const px = (v) => Math.round(parseFloat(v) * 100) / 100;
        const card = document.querySelector('[role="article"]');
        const body = card.children[2] ?? card; // strip is child 1
        const metaRow = card.querySelector('[class*="px-3"][class*="py-2.5"]');
        const c = getComputedStyle(metaRow);
        const strip = card.querySelector('[class*="rounded-t-card"]');
        const rootCS = getComputedStyle(card);
        const docCS = getComputedStyle(document.documentElement);
        return {
            metaRowPad: { t: px(c.paddingTop), r: px(c.paddingRight), b: px(c.paddingBottom), l: px(c.paddingLeft) },
            stripH: px(strip.getBoundingClientRect().height),
            cardH: px(card.getBoundingClientRect().height),
            spacing: docCS.getPropertyValue("--spacing").trim(),
            cardPadInlineLaw: "--spacing(4) = " + (parseFloat(docCS.getPropertyValue("--spacing")) * 4) + "rem",
            typeSubheading: docCS.getPropertyValue("--type-subheading").trim(),
            rootRadius: rootCS.borderRadius,
            rootTransition: rootCS.transitionProperty + " / " + rootCS.transitionDuration + " / " + rootCS.transitionTimingFunction,
            castTransition: (() => { const s = card.querySelector(".cartoon-cast"); return s ? getComputedStyle(s).transitionProperty + " / " + getComputedStyle(s).transitionDuration : null; })(),
            // glass-ui Card sm law
            glassCardExists: !!document.querySelector(".card"),
            glassCardPadInline: (() => { const g = document.querySelector('.card[data-size="sm"]') || document.querySelector(".card"); return g ? getComputedStyle(g).getPropertyValue("--card-pad-inline").trim() : null; })(),
        };
    });

    // ─── B. keyboard reachability of the whole grid ─────────────────────────
    R.keyboard = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        const focusables = [...grid.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
            .filter((el) => !el.disabled && el.offsetParent !== null);
        const cards = [...grid.querySelectorAll('[role="article"]')];
        return {
            cardCount: cards.length,
            cardsFocusable: cards.filter((c) => c.tabIndex >= 0).length,
            focusablesInGrid: focusables.map((el) => ({ tag: el.tagName, name: (el.getAttribute("aria-label") || el.innerText || "").trim().slice(0, 30) })),
            dragHandles: grid.querySelectorAll(".drag-handle").length,
            dragHandlesFocusable: [...grid.querySelectorAll(".drag-handle")].filter((e) => e.tabIndex >= 0).length,
            dragHandleNamed: [...grid.querySelectorAll(".drag-handle")].filter((e) => e.getAttribute("aria-label") || e.getAttribute("title")).length,
            dragHandleRect: (() => { const d = grid.querySelector(".drag-handle"); const r = d.getBoundingClientRect(); return { w: r.width, h: r.height }; })(),
            titleClickHandlerButNotButton: [...grid.querySelectorAll("span.font-display")].map((s) => ({ tag: s.tagName, tabIndex: s.tabIndex, role: s.getAttribute("role") })),
        };
    });

    // ─── C. expand card 1, then measure swatch tray ─────────────────────────
    await page.click('[role="article"]:first-child .font-display', { position: { x: 5, y: 5 } }).catch(() => {});
    await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        c.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await page.waitForTimeout(900);
    R.expanded = await page.evaluate(() => {
        const px = (v) => Math.round(v * 100) / 100;
        const card = document.querySelector('[role="article"]');
        const swatches = [...card.querySelectorAll('[class*="w-9"],[class*="w-10"]')];
        const inner = [...card.querySelectorAll('button,a,input,[tabindex]:not([tabindex="-1"])')];
        return {
            cardH: px(card.getBoundingClientRect().height),
            swatchCount: swatches.length,
            swatchRects: swatches.slice(0, 3).map((s) => { const r = s.getBoundingClientRect(); return { w: px(r.width), h: px(r.height), tag: s.tagName, tabIndex: s.tabIndex, name: s.getAttribute("aria-label") }; }),
            interactiveNames: inner.map((e) => ({ tag: e.tagName, n: (e.getAttribute("aria-label") || e.innerText || "").trim().slice(0, 28) })),
        };
    });
    await page.screenshot({ path: OUT + "d-expanded.png", fullPage: true });
    await browser.close();
}

// ─── D. forced-colors: featured badge gold shimmer ─────────────────────────
for (const fc of ["none", "active"]) {
    const { browser, page } = await open({ forcedColors: fc });
    R["badge_" + fc] = await page.evaluate(() => {
        const b = document.querySelector(".featured-badge");
        if (!b) return null;
        const c = getComputedStyle(b);
        const r = b.getBoundingClientRect();
        return {
            color: c.color, webkitTextFillColor: c.webkitTextFillColor,
            bgImage: c.backgroundImage.slice(0, 80),
            bgClip: c.webkitBackgroundClip || c.backgroundClip,
            borderColor: c.borderColor, w: Math.round(r.width), h: Math.round(r.height),
            animName: c.animationName, animDur: c.animationDuration,
        };
    });
    // also: card boundary survival in forced colors
    R["cardFC_" + fc] = await page.evaluate(() => {
        const c = getComputedStyle(document.querySelector('[role="article"]'));
        return { border: c.borderColor + " " + c.borderWidth, bg: c.backgroundColor, shadow: c.boxShadow.slice(0, 60), forcedAdjust: c.forcedColorAdjust };
    });
    await browser.close();
}

// ─── E. reduced motion: does the cartoon register actually zero out? ───────
for (const rm of ["no-preference", "reduce"]) {
    const { browser, page } = await open({ reducedMotion: rm });
    R["motion_" + rm] = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const cast = card.querySelector(".cartoon-cast");
        const cs = getComputedStyle(card);
        const cc = cast ? getComputedStyle(cast) : null;
        return {
            cardTransition: cs.transition.slice(0, 160),
            castTransition: cc ? cc.transition.slice(0, 160) : null,
            castTransform: cc ? cc.transform : null,
            animatedInGrid: [...document.querySelectorAll(".palette-card-grid *")].filter((e) => {
                const s = getComputedStyle(e);
                return s.animationName !== "none" || (s.transitionDuration !== "0s" && s.transitionProperty !== "none");
            }).length,
        };
    });
    await browser.close();
}

// ─── F. RTL truth ──────────────────────────────────────────────────────────
{
    const { browser, page } = await open({ dir: "rtl" });
    R.rtl = await page.evaluate(() => {
        const px = (v) => Math.round(v * 100) / 100;
        const cards = [...document.querySelectorAll('[role="article"]')];
        const grid = document.querySelector(".palette-card-grid");
        const gr = grid ? grid.getBoundingClientRect() : null;
        return {
            dir: document.documentElement.dir,
            cards: cards.length,
            gridRect: gr ? { x: px(gr.x), w: px(gr.width) } : null,
            firstCard: cards[0] ? (() => { const r = cards[0].getBoundingClientRect(); const cs = getComputedStyle(cards[0]); return { x: px(r.x), w: px(r.width), radius: cs.borderRadius, boxShadow: cs.boxShadow.slice(0, 40) }; })() : null,
            // does the meta row mirror?
            metaRowChildOrder: (() => {
                const row = document.querySelector('[role="article"] [class*="px-3"][class*="py-2.5"]');
                if (!row) return null;
                return [...row.children].map((c) => { const r = c.getBoundingClientRect(); return { cls: c.className.slice(0, 30), x: px(r.x) }; });
            })(),
            overlapWithPicker: (() => {
                const g = document.querySelector(".palette-card-grid");
                const others = [...document.querySelectorAll("main .card")].filter((c) => !c.contains(g));
                if (!g || !others.length) return null;
                const a = g.getBoundingClientRect();
                return others.map((o) => { const b = o.getBoundingClientRect();
                    const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
                    const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
                    return { overlapPx: Math.round(ox * oy) }; });
            })(),
        };
    });
    await page.screenshot({ path: OUT + "d-rtl2.png", fullPage: true });
    await browser.close();
}

// ─── G. mobile 390 — title starvation measurement ──────────────────────────
{
    const { browser, page } = await open({ viewport: { width: 390, height: 900 }, colorScheme: "dark" });
    R.titleStarve = await page.evaluate(() => {
        const px = (v) => Math.round(v * 100) / 100;
        return [...document.querySelectorAll('[role="article"]')].map((card) => {
            const t = card.querySelector("span.font-display");
            const meta = card.querySelector('[class*="px-3"][class*="py-2.5"] > div');
            const tr = t ? t.getBoundingClientRect() : null;
            const menuBtn = card.querySelector('[aria-label="Palette menu"]');
            const mr = menuBtn ? menuBtn.getBoundingClientRect() : null;
            // chips that are shrink-0 in the same row
            const chips = meta ? [...meta.children].filter((c) => c !== t) : [];
            const chipW = chips.reduce((s, c) => s + c.getBoundingClientRect().width, 0);
            // overlap of last chip with the menu button
            const last = chips[chips.length - 1];
            let overlap = 0;
            if (last && mr) { const lr = last.getBoundingClientRect(); overlap = Math.max(0, lr.right - mr.left); }
            return {
                name: (t ? t.innerText : "").slice(0, 24),
                titleW: tr ? px(tr.width) : null,
                titleH: tr ? px(tr.height) : null,
                titleScrollW: t ? t.scrollWidth : null,
                titleClientW: t ? t.clientWidth : null,
                truncatedBy: t ? t.scrollWidth - t.clientWidth : null,
                shrink0ChipW: px(chipW),
                chipMenuOverlapPx: px(overlap),
            };
        });
    });
    await browser.close();
}

writeFileSync(new URL("./probe2-results.json", import.meta.url).pathname, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
