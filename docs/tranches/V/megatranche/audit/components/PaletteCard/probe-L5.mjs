// CHALLENGE-L pass 5 — the SHELL recipe (card vs skeleton vs shadow), the
// producer-private `.cartoon-cast` contract, and the contrast-compensation the
// hand-roll forfeits. Read-only except localStorage seeding in an isolated
// WebKit profile.
//
//   node docs/tranches/V/megatranche/audit/components/PaletteCard/probe-L5.mjs
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const now = "2026-07-27T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const STORE = { version: 1, palettes: [
    mk("Sunset Ridge", "sunset-ridge", ["#ff6b6b", "#f7b267", "#f79d65", "#f4845f", "#f27059"]),
    mk("Deep Ocean", "deep-ocean", ["#12345a", "#173a5e", "#3b7d8c"]),
] };

const results = {};

async function withPage(fn, ctxOpts = {}) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1000 }, colorScheme: "light", deviceScaleFactor: 2,
        ...ctxOpts,
    });
    const page = await ctx.newPage();
    await page.addInitScript((store) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
    }, STORE);
    try { return await fn(page); }
    catch (e) { return { PROBE_ERROR: String(e).split("\n")[0] }; }
    finally { await browser.close(); }
}

// ── A. the shell recipe, measured: card root vs the tokens DESIGN.md assigns ──
results.A_shell = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    await page.waitForTimeout(800);
    return page.evaluate(() => {
        const el = document.querySelector('[role="article"]');
        const cs = getComputedStyle(el);
        const probe = document.createElement("div");
        document.body.appendChild(probe);
        const read = (v) => { probe.style.boxShadow = `var(${v})`; return getComputedStyle(probe).boxShadow; };
        const sm = read("--shadow-cartoon-sm");
        const md = read("--shadow-cartoon-md");
        probe.remove();
        return {
            cardClasses: el.className,
            cardBoxShadow: cs.boxShadow,
            cardBorderWidth: cs.borderTopWidth,
            cardBorderStyle: cs.borderTopStyle,
            cardBorderRadius: cs.borderRadius,
            cardOverflow: cs.overflow,
            token_shadow_cartoon_sm: sm,
            token_shadow_cartoon_md: md,
            cardShadowEqualsSm: cs.boxShadow === sm,
            cardShadowEqualsMd: cs.boxShadow === md,
        };
    });
});

// ── B. the `.cartoon-cast` contract: which loaded rules can ever match it ──
results.B_cast = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    await page.waitForTimeout(800);
    return page.evaluate(() => {
        const found = [];
        let sheets = 0, unreadable = 0;
        for (const sheet of Array.from(document.styleSheets)) {
            sheets++;
            let rules;
            try { rules = sheet.cssRules; } catch { unreadable++; continue; }
            const walk = (list) => {
                for (const r of Array.from(list ?? [])) {
                    if (r.cssRules) walk(r.cssRules);
                    if (r.selectorText && r.selectorText.includes("cartoon-cast")) {
                        found.push(r.selectorText);
                    }
                    if (r.selectorText && r.selectorText.includes("cartoon-surface")) {
                        found.push("[SURFACE] " + r.selectorText);
                    }
                }
            };
            walk(rules);
        }
        const cast = document.querySelector('[role="article"] .cartoon-cast');
        const ccs = cast ? getComputedStyle(cast) : null;
        return {
            sheets, unreadable,
            castSelectorsInCascade: found,
            castElementPresent: !!cast,
            castMatchesAnyCastRule: found
                .filter((s) => !s.startsWith("[SURFACE]"))
                .some((s) => { try { return cast && cast.matches(s); } catch { return false; } }),
            castComputed: ccs ? {
                position: ccs.position, zIndex: ccs.zIndex, boxShadow: ccs.boxShadow,
                display: ccs.display, inset: ccs.inset, borderRadius: ccs.borderRadius,
                width: cast.getBoundingClientRect().width,
                height: cast.getBoundingClientRect().height,
            } : null,
            cartoonPressT: getComputedStyle(document.querySelector('[role="article"]'))
                .getPropertyValue("--cartoon-press-t").trim(),
            cardPressT: getComputedStyle(document.querySelector('[role="article"]'))
                .getPropertyValue("--card-press-t").trim(),
        };
    });
});

// ── C. the compensations the hand-roll forfeits: glass-atom / contrast fences ──
results.C_forfeits = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    const before = await page.evaluate(() => {
        const el = document.querySelector('[role="article"]');
        const cs = getComputedStyle(el);
        return {
            isGlassAtom: el.matches(".glass-atom"),
            hasDataSurface: el.getAttribute("data-surface"),
            hasDataSlot: el.getAttribute("data-slot"),
            borderColor: cs.borderTopColor, boxShadow: cs.boxShadow,
        };
    });
    await page.emulateMedia({ contrast: "more" });
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => {
        const el = document.querySelector('[role="article"]');
        const cs = getComputedStyle(el);
        return { borderColor: cs.borderTopColor, boxShadow: cs.boxShadow };
    });
    return { before, afterPrefersContrastMore: after,
             changed: before.borderColor !== after.borderColor || before.boxShadow !== after.boxShadow };
});

// ── D. hover register (owner mark MT-F036, hover half) — re-verified ──
results.D_hover = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    const snap = () => page.evaluate(() => {
        const cs = getComputedStyle(document.querySelector('[role="article"]'));
        return { boxShadow: cs.boxShadow, translate: cs.translate, scale: cs.scale,
                 transform: cs.transform, backgroundColor: cs.backgroundColor,
                 borderColor: cs.borderTopColor, filter: cs.filter, opacity: cs.opacity,
                 transitionProperty: cs.transitionProperty };
    });
    const rest = await snap();
    await page.locator('[role="article"]').first().hover();
    await page.waitForTimeout(700);
    const hov = await snap();
    return { rest, hover: hov,
             changedKeys: Object.keys(rest).filter((k) => rest[k] !== hov[k]) };
});

// ── E. the skeleton shell, captured live on the browse route ──
results.E_skeleton = await withPage(async (page) => {
    const seen = [];
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "domcontentloaded" });
    for (let i = 0; i < 60; i++) {
        const r = await page.evaluate(() => {
            const el = document.querySelector('[data-slot="palette-card-skeleton"]');
            if (!el) return null;
            const cs = getComputedStyle(el);
            return { classes: el.className, boxShadow: cs.boxShadow,
                     borderWidth: cs.borderTopWidth, borderStyle: cs.borderTopStyle,
                     overflow: cs.overflow, borderRadius: cs.borderRadius };
        });
        if (r) { seen.push(r); break; }
        await page.waitForTimeout(50);
    }
    return seen[0] ?? "NO SKELETON OBSERVED";
});

writeFileSync(OUT + "L5-results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
