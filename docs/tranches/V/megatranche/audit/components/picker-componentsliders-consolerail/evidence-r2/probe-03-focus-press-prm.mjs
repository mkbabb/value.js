// CHALLENGE-D r2 · probe 03 — the FOCUS register (real Tab, both engines),
// the PRESS register vs the stagger animation's fill-mode, and the
// reduced-motion inversion. Read-only.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

async function run(engine, name, opts = {}) {
    const browser = await engine.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".channel-rail", { timeout: 60000 });
    await page.waitForTimeout(2500);

    const r = { engine: name, opts: Object.keys(opts).length ? opts : null };

    // --- the stagger animation state on the rail items ---------------------
    r.staggerOnItems = await page.evaluate(() =>
        [...document.querySelectorAll(".channel-rail-item")].map((el) => {
            const s = getComputedStyle(el);
            return {
                text: el.textContent.trim(),
                animationName: s.animationName, fillMode: s.animationFillMode,
                animationDuration: s.animationDuration, animationDelay: s.animationDelay,
                transform: s.transform,
                runningAnimations: el.getAnimations().map((a) => ({ id: a.animationName ?? a.id, playState: a.playState, fill: a.effect?.getTiming?.().fill })),
                parentHasStagger: el.parentElement?.classList.contains("stagger-children")
                    || el.closest(".stagger-children") !== null,
                isDirectStaggerChild: el.parentElement?.classList.contains("stagger-children"),
            };
        }));

    // --- PRESS: hold the mouse and sample the transform --------------------
    await page.click(".channel-rail-item >> nth=0");
    await page.waitForTimeout(700);
    const el2 = await page.$(".channel-rail-item >> nth=2");
    const bb = await el2.boundingBox();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(220);
    r.press = await page.evaluate(() => {
        const el = document.querySelectorAll(".channel-rail-item")[2];
        const s = getComputedStyle(el);
        return {
            matchesActive: el.matches(":active"),
            transform: s.transform,
            expected: "matrix(0.96, 0, 0, 0.96, 0, 0)",
            renderedBoxW: +el.getBoundingClientRect().width.toFixed(3),
        };
    });
    await page.mouse.up();
    await page.waitForTimeout(500);

    // --- FOCUS: real Tab traversal into the rail ---------------------------
    await page.evaluate(() => document.activeElement?.blur?.());
    await page.evaluate(() => window.scrollTo(0, 0));
    let tabs = 0, reached = false;
    await page.mouse.move(2, 2);
    for (; tabs < 120; tabs++) {
        await page.keyboard.press("Tab");
        reached = await page.evaluate(() => document.activeElement?.classList?.contains("channel-rail-item") ?? false);
        if (reached) break;
    }
    r.tabTraversal = { tabsToReachRail: reached ? tabs + 1 : null, reached };
    if (reached) {
        await page.waitForTimeout(300);
        r.focusAfterTab = await page.evaluate(() => {
            const el = document.activeElement;
            const s = getComputedStyle(el);
            return { text: el.textContent.trim(), focusVisible: el.matches(":focus-visible"), boxShadow: s.boxShadow, outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, color: s.color, bg: s.backgroundColor };
        });
        // now arrow-navigate: the component's own .focus() call
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(400);
        r.focusAfterArrow = await page.evaluate(() => {
            const el = document.activeElement;
            const s = getComputedStyle(el);
            return { text: el.textContent.trim(), isRailItem: el.classList.contains("channel-rail-item"), focusVisible: el.matches(":focus-visible"), boxShadow: s.boxShadow, outlineStyle: s.outlineStyle, color: s.color };
        });
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(400);
        r.focusAfterArrow2 = await page.evaluate(() => {
            const el = document.activeElement;
            const s = getComputedStyle(el);
            return { text: el.textContent.trim(), focusVisible: el.matches(":focus-visible"), boxShadow: s.boxShadow };
        });
        // and: does the focus ring on the SELECTED item survive under the dot?
        r.focusRingVsDot = await page.evaluate(() => {
            const el = document.activeElement;
            const seat = el.querySelector(".rail-dot-seat");
            const s = getComputedStyle(el);
            return { hasDot: !!seat, boxShadow: s.boxShadow, zIndexSeat: seat ? getComputedStyle(seat).zIndex : null };
        });
    }

    await browser.close();
    return r;
}

const out = {};
out.webkit = await run(webkit, "webkit");
out.chromium = await run(chromium, "chromium");
out.webkit_reducedMotion = await run(webkit, "webkit+prefers-reduced-motion:reduce", { reducedMotion: "reduce" });
out.chromium_forcedColors = await run(chromium, "chromium+forced-colors:active", { forcedColors: "active" });
out.chromium_dark = await run(chromium, "chromium+dark", { colorScheme: "dark" });

writeFileSync(join(HERE, "probe-03-focus-press-prm.json"), JSON.stringify(out, null, 2));
for (const [k, v] of Object.entries(out)) {
    console.log("=====", k);
    console.log("  stagger[0]:", JSON.stringify(v.staggerOnItems?.[0]));
    console.log("  press     :", JSON.stringify(v.press));
    console.log("  tab       :", JSON.stringify(v.tabTraversal));
    console.log("  focusTab  :", JSON.stringify(v.focusAfterTab));
    console.log("  focusArrow:", JSON.stringify(v.focusAfterArrow));
    console.log("  focusArr2 :", JSON.stringify(v.focusAfterArrow2));
    console.log("  ringVsDot :", JSON.stringify(v.focusRingVsDot));
}
