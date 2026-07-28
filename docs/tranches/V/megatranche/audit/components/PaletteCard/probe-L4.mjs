// CHALLENGE-L pass 4 — the card ROOT's interaction register + the host-nesting
// contract. Read-only except localStorage seeding in an isolated profile.
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

async function withPage(fn) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 1000 }, colorScheme: "light", deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.addInitScript((store) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
    }, STORE);
    try { return await fn(page); }
    catch (e) { return { PROBE_ERROR: String(e).split("\n")[0] }; }
    finally { await browser.close(); }
}

// ── A. the card root's register: static paint, hover delta, dead marker class ──
results.A_rootRegister = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    await page.waitForTimeout(900);

    const read = () => page.evaluate(() => {
        const el = document.querySelector('[role="article"]');
        if (!el) return null;
        const cs = getComputedStyle(el);
        const cast = el.querySelector(".cartoon-cast");
        const ccs = cast ? getComputedStyle(cast) : null;
        const pick = (s) => ({
            boxShadow: s.boxShadow, translate: s.translate, scale: s.scale,
            transform: s.transform, borderColor: s.borderColor,
            backgroundColor: s.backgroundColor, transition: s.transitionProperty,
            transitionDuration: s.transitionDuration, filter: s.filter,
            opacity: s.opacity, position: s.position, borderWidth: s.borderWidth,
        });
        return {
            root: pick(cs),
            cast: ccs ? { position: ccs.position, zIndex: ccs.zIndex, boxShadow: ccs.boxShadow,
                          display: ccs.display, w: cast.getBoundingClientRect().width } : "NO .cartoon-cast ELEMENT",
            vars: {
                shadowCartoonMd: cs.getPropertyValue("--shadow-cartoon-md").trim(),
                cartoonInkLead: cs.getPropertyValue("--cartoon-ink-lead").trim(),
                cartoonPressT: cs.getPropertyValue("--cartoon-press-t").trim() || "(unset)",
                cardPressT: cs.getPropertyValue("--card-press-t").trim() || "(unset)",
                easeCartoonPunch: cs.getPropertyValue("--ease-cartoon-punch").trim() || "(unset)",
            },
        };
    });

    const before = await read();
    await page.hover('[role="article"]');
    await page.waitForTimeout(500);
    const during = await read();
    await page.mouse.move(5, 5);
    await page.waitForTimeout(400);

    // press: mouse down and hold, then read
    const box = await page.locator('[role="article"]').first().boundingBox();
    await page.mouse.move(box.x + 40, box.y + box.height - 12);
    await page.mouse.down();
    await page.waitForTimeout(220);
    const pressed = await read();
    await page.mouse.up();

    const delta = {};
    for (const k of Object.keys(before.root)) {
        if (before.root[k] !== during.root[k]) delta[k] = { rest: before.root[k], hover: during.root[k] };
    }
    const pressDelta = {};
    for (const k of Object.keys(before.root)) {
        if (before.root[k] !== pressed.root[k]) pressDelta[k] = { rest: before.root[k], press: pressed.root[k] };
    }

    // dead marker class check: does ANY loaded rule select .group-scoped hover
    // inside the card subtree?
    const groupHoverRules = await page.evaluate(() => {
        const hits = [];
        const walk = (rules) => {
            for (const r of rules) {
                if (r.cssRules) walk(r.cssRules);
                else if (r.selectorText && /\.group[:\s]/.test(r.selectorText) && /hover/.test(r.selectorText)) {
                    hits.push(r.selectorText.slice(0, 120));
                }
            }
        };
        for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
        return hits.slice(0, 12);
    });

    await page.screenshot({ path: OUT + "L4-card-rest.png", clip: { x: box.x - 24, y: box.y - 16, width: box.width + 48, height: box.height + 48 } });

    return { cardCount: await page.locator('[role="article"]').count(),
             rest: before, hoverDelta: delta, pressDelta, groupHoverRulesLoaded: groupHoverRules };
});

// ── B. the host-nesting contract: PaletteCard inside a <button> at /#/mix ──
results.B_hostNesting = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    return page.evaluate(() => {
        const arts = [...document.querySelectorAll('[role="article"]')];
        const nested = arts.map((a) => {
            const btnAncestor = a.closest("button");
            const inner = [...a.querySelectorAll("button, a[href], input, select, textarea, [tabindex]")];
            return {
                label: a.getAttribute("aria-label"),
                insideButton: !!btnAncestor,
                ancestorLabel: btnAncestor?.getAttribute("aria-label") ?? null,
                interactiveDescendants: inner.length,
                descendantTags: inner.slice(0, 8).map((e) => e.tagName + (e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : "")),
            };
        });
        return { articles: arts.length, nested };
    });
});

// ── C. how many interactive descendants a card ships (the click-affordance
//       ambiguity), measured on the expanded card ──
results.C_interactiveSurface = await withPage(async (page) => {
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector('[role="article"]', { timeout: 20000 });
    await page.waitForTimeout(700);
    const collapsed = await page.evaluate(() => {
        const a = document.querySelector('[role="article"]');
        return a.querySelectorAll("button, a[href], input, [tabindex]").length;
    });
    await page.locator('[role="article"]').first().click({ position: { x: 300, y: 8 } });
    await page.waitForTimeout(900);
    const expanded = await page.evaluate(() => {
        const a = document.querySelector('[role="article"]');
        return {
            interactive: a.querySelectorAll("button, a[href], input, [tabindex]").length,
            height: Math.round(a.getBoundingClientRect().height),
        };
    });
    return { collapsedInteractiveDescendants: collapsed, expanded };
});

writeFileSync(OUT + "../probe-L4-results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
