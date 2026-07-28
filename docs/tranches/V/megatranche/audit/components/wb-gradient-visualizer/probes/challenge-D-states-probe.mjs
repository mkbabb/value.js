// CHALLENGE-D state-coverage probe — GradientVisualizer.vue (read-only)
// 1. audit-exact nameless-button predicate, per engine
// 2. 320px truncation floor
// 3. transition/motion declarations on the tile + reduced-motion delta
// 4. conic render in the non-square tile
// 5. focus order through the Interpolation band
import { chromium, webkit } from "playwright";

const URL = "http://localhost:9000/#/gradient";
const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence";
const out = {};

// EXACT predicate copied from audit/visual/capture.mjs:102-105
const nameless = () => {
    const vis = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    return [...document.querySelectorAll('button,[role="button"]')]
        .filter(vis)
        .filter((b) => !(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.textContent.trim()))
        .map((b) => ({
            cls: b.className,
            title: b.getAttribute("title"),
            inPane: !!b.closest("main"),
            nearTestId: (b.closest("[data-testid]") || {}).dataset?.testid ?? null,
            outer: b.outerHTML.slice(0, 200),
        }));
};

const truncation = () => {
    const t = [...document.querySelectorAll('main [role="combobox"]')]
        .filter((e) => e.getBoundingClientRect().width > 0);
    return t.map((el) => {
        const inner = [...el.querySelectorAll("*")].find((e) => e.textContent.trim().length && !e.children.length) || el;
        return {
            label: el.getAttribute("aria-label"),
            value: inner.textContent.trim(),
            box: +inner.clientWidth.toFixed(1),
            ink: +inner.scrollWidth.toFixed(1),
            clipped: +(inner.scrollWidth - inner.clientWidth).toFixed(1),
            triggerW: +el.getBoundingClientRect().width.toFixed(2),
        };
    });
};

const motion = () => {
    const tile = document.querySelector('[data-testid="gradient-render-tile"]');
    const cs = getComputedStyle(tile);
    // any keyframe/transition anywhere in the visualizer subtree
    const root = tile.closest(".flex.flex-col");
    const moving = [...root.querySelectorAll("*")]
        .map((e) => ({ cs: getComputedStyle(e), e }))
        .filter(({ cs }) => (cs.transitionDuration !== "0s" && cs.transitionProperty !== "none") || cs.animationName !== "none")
        .map(({ cs, e }) => ({
            tag: e.tagName.toLowerCase(),
            cls: String(e.className).slice(0, 70),
            transitionProperty: cs.transitionProperty,
            transitionDuration: cs.transitionDuration,
            transitionTimingFunction: cs.transitionTimingFunction,
            animationName: cs.animationName,
            animationDuration: cs.animationDuration,
        }));
    return {
        tile: {
            transitionProperty: cs.transitionProperty,
            transitionDuration: cs.transitionDuration,
            animationName: cs.animationName,
            willChange: cs.willChange,
        },
        movingCount: moving.length,
        moving: moving.slice(0, 12),
    };
};

async function run(engine, engineName, name, viewport, extra = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, ...extra });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const key = `${engineName}-${name}`;
    out[key] = {
        nameless: await page.evaluate(nameless),
        truncation: await page.evaluate(truncation),
        motion: await page.evaluate(motion),
    };

    if (name === "1440") {
        // conic render inside the non-square tile
        await page.locator('[aria-label="Gradient type"]').first().click();
        await page.waitForTimeout(350);
        await page.getByRole("option", { name: /Conic/ }).first().click();
        await page.waitForTimeout(600);
        const box = await page.locator('[data-testid="gradient-render-tile"]').boundingBox();
        out[key].conic = await page.evaluate(() => {
            const t = document.querySelector('[data-testid="gradient-render-tile"]');
            const r = t.getBoundingClientRect();
            return {
                w: +r.width.toFixed(2), h: +r.height.toFixed(2),
                aspect: +(r.width / r.height).toFixed(3),
                bg: getComputedStyle(t).backgroundImage.slice(0, 90),
                aria: t.getAttribute("aria-label"),
            };
        });
        await page.screenshot({
            path: `${EV}/challenge-D-${key}-conic-tile.png`,
            clip: { x: Math.max(0, box.x - 400), y: Math.max(0, box.y - 40), width: 540, height: 220 },
        });

        // focus order through the Interpolation band
        await page.keyboard.press("Escape");
        await page.locator('[aria-label="Gradient type"]').first().focus();
        const order = [];
        for (let i = 0; i < 6; i++) {
            order.push(await page.evaluate(() => {
                const a = document.activeElement;
                const cs = getComputedStyle(a);
                return {
                    tag: a.tagName.toLowerCase(),
                    name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 28),
                    outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor,
                    boxShadow: cs.boxShadow.slice(0, 60),
                };
            }));
            await page.keyboard.press("Tab");
            await page.waitForTimeout(80);
        }
        out[key].focusOrder = order;
    }
    await browser.close();
}

await run(chromium, "chromium", "1440", { width: 1440, height: 900 });
await run(chromium, "chromium", "320", { width: 320, height: 800 });
await run(chromium, "chromium", "prm-1440", { width: 1440, height: 900 }, { reducedMotion: "reduce" });
await run(webkit, "webkit", "1440", { width: 1440, height: 900 });
await run(webkit, "webkit", "390", { width: 390, height: 844 });
console.log(JSON.stringify(out, null, 1));
