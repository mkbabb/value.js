// CHALLENGE-C pass 4 — probe C. READ-ONLY.
// The PRM leg of `useHeightTransition`, measured precisely:
//   C1  expand under PRM → does `onAfterEnter` ever run (inline styles cleared)?
//   C2  collapse under PRM → is the panel node ever removed from the DOM?
//   C3  frozen inline height + overflow-hidden → measured clipping after rewrap
//   C4  the swatch panel's real contents (identity + interactivity)
//   C5  hover render fan-out with Vue perf marks
//   C6  #/mix "Palettes" tab → nested interactive content model
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4c-pass4-results.json", import.meta.url).pathname;
const R = {};
const cols = (arr) => arr.map((css, position) => ({ css, position }));
const iso = (ms) => new Date(Date.now() - ms).toISOString();
const FIXTURE = {
    version: 1,
    palettes: [
        {
            id: "p-24", name: "Twentyfour", slug: "twentyfour",
            createdAt: iso(0), updatedAt: iso(0), isLocal: true,
            colors: cols(Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`)),
        },
        {
            id: "p-ocean", name: "Deep Ocean", slug: "deep-ocean",
            createdAt: iso(1000), updatedAt: iso(1000), isLocal: true,
            colors: cols(["#03045e", "#0077b6", "#00b4d8"]), tags: ["cool"],
        },
    ],
};

async function seed(page, hash) {
    await page.goto(`http://localhost:9000/#/${hash}`, { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
}

// The swatch panel is PaletteCardSwatches' root: the ONE `.overflow-hidden`
// inside the card that contains the wrapped swatch row (`.flex-wrap`).
const readPanel = (page) => page.evaluate(() => {
    const card = document.querySelector('[role="article"]');
    const panels = [...card.querySelectorAll(".overflow-hidden")].filter((d) => d.querySelector(".flex-wrap"));
    const p = panels[0] ?? null;
    return {
        panelPresent: !!p,
        inlineStyle: p?.getAttribute("style") ?? null,
        computedTransitionDuration: p ? getComputedStyle(p).transitionDuration : null,
        clientH: p?.clientHeight ?? null,
        scrollH: p?.scrollHeight ?? null,
        clippedPx: p ? p.scrollHeight - p.clientHeight : null,
        swatchCount: p ? p.querySelectorAll(".flex-wrap > *").length : null,
        cardH: +card.getBoundingClientRect().height.toFixed(1),
    };
});

const main = async () => {
    const browser = await chromium.launch();

    for (const mode of ["no-prm", "prm"]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 1000 },
            ...(mode === "prm" ? { reducedMotion: "reduce" } : {}),
        });
        const page = await ctx.newPage();
        await seed(page, "palettes");
        const card = page.locator('[role="article"]').first();

        await card.click({ position: { x: 300, y: 60 } });
        await page.waitForTimeout(2500);
        const afterExpand = await readPanel(page);

        // C3 — rewrap the swatch row narrower; a frozen inline height clips
        await page.setViewportSize({ width: 520, height: 1000 });
        await page.waitForTimeout(1000);
        const afterRewrap = await readPanel(page);
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.waitForTimeout(600);

        // C2 — collapse; the panel node must leave the DOM
        await card.click({ position: { x: 300, y: 60 } });
        await page.waitForTimeout(2500);
        const afterCollapse = await readPanel(page);

        // re-expand after the collapse, to see whether the card recovers
        await card.click({ position: { x: 300, y: 60 } });
        await page.waitForTimeout(2500);
        const afterReExpand = await readPanel(page);

        R[`C_${mode}`] = { afterExpand, afterRewrap, afterCollapse, afterReExpand };
        await ctx.close();
    }

    // ---- C4/C5 · swatch identity + hover fan-out (no PRM) ------------------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page, "palettes");
    await page.locator('[role="article"]').first().click({ position: { x: 300, y: 60 } });
    await page.waitForTimeout(1600);

    R.C4_panelContents = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const panel = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"));
        if (!panel) return { ERROR: "panel not found" };
        const row = panel.querySelector(".flex-wrap");
        const kids = [...row.children];
        const first = kids[0];
        const dot = first?.querySelector("*") ?? first;
        return {
            swatchWrappers: kids.length,
            firstWrapperTag: first?.tagName,
            firstDot: dot ? {
                tag: dot.tagName,
                cls: (dot.getAttribute("class") ?? "").slice(0, 90),
                ariaLabel: dot.getAttribute("aria-label"),
                ariaHidden: dot.getAttribute("aria-hidden"),
                tabIndex: dot.tabIndex,
                pointerEvents: getComputedStyle(dot).pointerEvents,
                w: +dot.getBoundingClientRect().width.toFixed(1),
                h: +dot.getBoundingClientRect().height.toFixed(1),
            } : null,
            interactiveInPanel: panel.querySelectorAll("button, a, input, [tabindex='0']").length,
            panelHTMLHead: panel.innerHTML.replace(/\s+/g, " ").slice(0, 240),
        };
    });

    R.C5_hoverFanout = await (async () => {
        const ok = await page.evaluate(() => {
            const app = document.querySelector("#app")?.__vue_app__;
            if (!app) return false;
            app.config.performance = true;
            performance.clearMarks(); performance.clearMeasures();
            return true;
        });
        if (!ok) return { ERROR: "no __vue_app__ handle" };
        const boxes = await page.evaluate(() => {
            const card = document.querySelector('[role="article"]');
            const row = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"))?.querySelector(".flex-wrap");
            return [...row.children].slice(0, 4).map((e) => {
                const r = e.getBoundingClientRect();
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            });
        });
        for (const b of boxes.slice(0, 3)) {
            await page.mouse.move(b.x, b.y);
            await page.waitForTimeout(300);
        }
        return await page.evaluate(() => {
            const ms = performance.getEntriesByType("measure");
            const byName = {};
            ms.forEach((m) => { byName[m.name] = (byName[m.name] ?? 0) + 1; });
            return {
                totalMeasures: ms.length,
                topMeasures: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 12),
                floatingPanels: document.querySelectorAll("body > .floating-panel").length,
            };
        });
    })();

    // ---- C6 · #/mix Palettes tab -------------------------------------------
    await seed(page, "mix");
    R.C6_mix = await (async () => {
        try {
            await page.getByRole("tab", { name: /Palettes/i }).click({ timeout: 4000 });
        } catch {
            try { await page.getByRole("button", { name: /^Palettes$/ }).first().click({ timeout: 4000 }); } catch { /* noop */ }
        }
        await page.waitForTimeout(1400);
        return await page.evaluate(() => {
            const outer = [...document.querySelectorAll("button")].filter((b) => b.querySelector('[role="article"]'));
            return {
                articles: document.querySelectorAll('[role="article"]').length,
                outerButtonsWrappingCards: outer.length,
                nestedButtonInButton: document.querySelectorAll("button button").length,
                sample: outer.slice(0, 2).map((b) => ({
                    outerRole: b.tagName,
                    outerLabel: b.getAttribute("aria-label"),
                    innerInteractive: [...b.querySelectorAll("button, a[href], input, [tabindex]")]
                        .map((e) => `${e.tagName}:${e.getAttribute("aria-label") ?? ""}`),
                })),
                mainText: (document.querySelector("main")?.textContent ?? "").replace(/\s+/g, " ").slice(0, 160),
            };
        });
    })();

    await ctx.close();
    await browser.close();
    writeFileSync(OUT, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
