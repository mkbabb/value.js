// PROBE D — (D1) which declaration wins transition-duration under PRM on a palette card;
//           (D2) populated-pane tap targets, desktop + mobile (the visual matrix captured an EMPTY library).
import { chromium, devices } from "playwright";
const KEY = "color-palettes";
const mk = (names) => JSON.stringify({ version: 1, palettes: names.map((n, i) => ({
    id: `id-${n}`, name: n, slug: n.toLowerCase(),
    colors: [{ css: "#ff0000", position: 0 }, { css: "#0000ff", position: 1 }, { css: "#00ff00", position: 2 }],
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: `2026-01-0${i + 1}T00:00:00.000Z`, isLocal: true,
})) });
const NAMES = ["Alpha", "Beta", "Gamma"];
const browser = await chromium.launch();

// ── D1 · cascade forensics under prefers-reduced-motion: reduce ──────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, mk(NAMES)]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const cs = getComputedStyle(card);
        const hits = [];
        const walk = (rules, href) => {
            for (const rule of rules) {
                if (rule.media) { if (String(rule.media.mediaText).includes("reduced-motion")) walk(rule.cssRules, href + " @media " + rule.media.mediaText); continue; }
                if (rule.cssRules && !rule.selectorText) { walk(rule.cssRules, href); continue; }
                if (!rule.selectorText) continue;
                const t = rule.style.getPropertyValue("transition-duration") || rule.style.getPropertyValue("transition");
                if (!t) continue;
                let matches = false;
                try { matches = card.matches(rule.selectorText); } catch { }
                if (matches) hits.push({ sel: rule.selectorText.slice(0, 70), val: t, imp: rule.style.getPropertyPriority("transition-duration") || rule.style.getPropertyPriority("transition"), ctxt: href });
            }
        };
        for (const sh of document.styleSheets) { try { walk(sh.cssRules, sh.href ? sh.href.split("/").pop() : "inline"); } catch { } }
        return {
            matchMedia: matchMedia("(prefers-reduced-motion: reduce)").matches,
            computedTransitionDuration: cs.transitionDuration,
            computedTransitionProperty: cs.transitionProperty,
            computedAnimationDuration: cs.animationDuration,
            durationTokens: ["--duration-fast", "--duration-normal", "--duration-slow"].map((k) => k + "=" + getComputedStyle(document.documentElement).getPropertyValue(k).trim()),
            matchingTransitionRules: hits,
        };
    });
    console.log("=== D1 PRM cascade on [role=article] ===");
    console.log(JSON.stringify(r, null, 1));
    await ctx.close();
}

// ── D2 · tap targets in a POPULATED pane ────────────────────────────────────
async function taps(label, ctxOpts) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, mk(NAMES)]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    // expand the first card so swatch controls exist
    await page.click('[role="article"]').catch(() => { });
    await page.waitForTimeout(700);
    const r = await page.evaluate(() => {
        const pane = document.querySelector(".pane-scroll-fade");
        if (!pane) return { error: "no pane" };
        const sel = 'button, [role="button"], a[href], input, .drag-handle, [tabindex]:not([tabindex="-1"])';
        const small = [], nameless = [];
        for (const el of pane.querySelectorAll(sel)) {
            const b = el.getBoundingClientRect();
            if (b.width === 0 || b.height === 0) continue;
            const name = (el.getAttribute("aria-label") || el.textContent || "").trim();
            if (b.width < 24 || b.height < 24) small.push({ tag: el.tagName.toLowerCase(), cls: el.className.toString().slice(0, 34), name: name.slice(0, 26) || "(none)", w: +b.width.toFixed(1), h: +b.height.toFixed(1) });
            if (el.tagName === "BUTTON" && !name) nameless.push(el.className.toString().slice(0, 40));
        }
        return {
            cards: document.querySelectorAll('[role="article"]').length,
            expandedPanels: document.querySelectorAll('[role="article"] .flex-wrap').length,
            liveRegions: pane.querySelectorAll('[aria-live],[role="status"],[role="alert"]').length,
            small, nameless,
        };
    });
    console.log(`\n=== D2 ${label} ===`);
    console.log("cards", r.cards, "expandedPanels", r.expandedPanels, "liveRegions", r.liveRegions, "smallTapTargets", r.small.length, "namelessButtons", r.nameless.length);
    for (const s of r.small) console.log("  SMALL", JSON.stringify(s));
    await ctx.close();
}
await taps("desktop 1600x1000 (3 palettes, 1 expanded)", { viewport: { width: 1600, height: 1000 } });
await taps("mobile iPhone-15 (3 palettes, 1 expanded)", { ...devices["iPhone 15"] });

await browser.close();
