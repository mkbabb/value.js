import { chromium } from "playwright";

const seed = () => {
    const now = new Date().toISOString();
    const mk = (name, slug, css) => ({ id: slug, name, slug, isLocal: true, createdAt: now, updatedAt: now, colors: css.map((c, i) => ({ css: c, position: i })) });
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff"]), mk("Probe B", "probe-b", ["#ffff00", "#00ffff", "#ff00ff"])] }));
};
const rafCounter = () => {
    const orig = window.requestAnimationFrame;
    window.__raf = 0;
    window.requestAnimationFrame = function (cb) { window.__raf++; return orig.call(window, cb); };
};

const run = async (reducedMotion) => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion });
    await page.addInitScript(seed);
    await page.addInitScript(rafCounter);
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(300);
    await main.getByRole("button", { name: /Select palette Probe A/ }).click();
    await main.getByRole("button", { name: /Select palette Probe B/ }).click();
    await page.waitForTimeout(400);

    const a11yPre = await page.evaluate(() => {
        const card = document.querySelector("main .pane-scroll-fade");
        return {
            paneScrollContainer: card ? {
                tag: card.tagName, tabIndex: card.tabIndex, role: card.getAttribute("role"),
                scrollable: card.scrollHeight > card.clientHeight,
                overflowY: getComputedStyle(card).overflowY,
                ariaLabel: card.getAttribute("aria-label"),
            } : null,
            liveRegionsInPane: document.querySelectorAll("main [aria-live]").length,
            headingLevels: [...document.querySelectorAll("main h1,main h2,main h3,main h4")].map((h) => h.tagName + ":" + h.innerText.trim().slice(0, 24)),
        };
    });

    const rafBefore = await page.evaluate(() => window.__raf);
    const t0 = Date.now();
    await main.getByRole("button", { name: "Mix", exact: true }).click();
    // poll for settle (plate no longer ghosted, content branch present)
    let settleMs = null;
    for (let i = 0; i < 200; i++) {
        const done = await page.evaluate(() => !!document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"));
        if (done) { settleMs = Date.now() - t0; break; }
        await page.waitForTimeout(25);
    }
    await page.waitForTimeout(1600);
    const rafAfter = await page.evaluate(() => window.__raf);
    // does the loop keep spinning after the epilogue?
    await page.waitForTimeout(1000);
    const rafIdle = await page.evaluate(() => window.__raf);

    const plateA11y = await page.evaluate(() => {
        const plate = document.querySelector(".mix-plate");
        if (!plate) return null;
        return {
            buttons: [...plate.querySelectorAll("button")].map((b) => ({
                name: (b.getAttribute("aria-label") || b.getAttribute("title") || b.innerText || "").trim().slice(0, 32),
                w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height),
                tabIndex: b.tabIndex,
            })),
            liveRegions: document.querySelectorAll("main [aria-live]").length,
            resultAriaHidden: [...plate.querySelectorAll("[aria-hidden='true']")].length,
            plateRole: plate.getAttribute("role"),
        };
    });

    console.log(JSON.stringify({ reducedMotion, a11yPre, settleMs, rafDuringMix: rafAfter - rafBefore, rafAfterIdle1s: rafIdle - rafAfter, plateA11y }, null, 1));
    await browser.close();
};

await run("no-preference");
await run("reduce");
