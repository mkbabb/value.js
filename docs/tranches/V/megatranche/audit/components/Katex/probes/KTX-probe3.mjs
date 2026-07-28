import { chromium } from "playwright";

const browser = await chromium.launch();

async function measure(w, h, clickAbout) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const katexReqs = [];
    page.on("response", (r) => {
        if (/katex/i.test(r.url())) katexReqs.push(`${r.status()} ${r.url().replace("http://localhost:9000", "")}`);
    });
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    if (clickAbout) {
        // mobile: flip the pane segmented control to slot 1 (About)
        const btns = await page.$$(".pane-segmented-control button, .pane-segmented-control [role=tab]");
        if (btns.length > 1) await btns[1].click();
        else console.log("  [no segmented control found; buttons:", btns.length, "]");
        await page.waitForTimeout(2500);
    }
    await page.waitForSelector(".markdown-body", { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const out = await page.evaluate(() => {
        const roots = [...document.querySelectorAll("div.inline-block")].filter((d) =>
            d.querySelector(":scope > .katex, :scope > .katex-display"),
        );
        const body = document.querySelector(".markdown-body");
        return {
            bodyWidth: body ? body.clientWidth : null,
            n: roots.length,
            inline: roots
                .filter((d) => !d.querySelector(":scope > .katex-display"))
                .map((d) => ({ display: getComputedStyle(d).display, parent: d.parentElement.tagName })),
            display: roots
                .filter((d) => d.querySelector(":scope > .katex-display"))
                .map((d) => ({
                    display: getComputedStyle(d).display,
                    overflowX: getComputedStyle(d).overflowX,
                    sw: d.scrollWidth,
                    cw: d.clientWidth,
                    overflowing: d.scrollWidth > d.clientWidth + 1,
                    tabIndex: d.tabIndex,
                    role: d.getAttribute("role"),
                    label: d.getAttribute("aria-label"),
                    expr: (d.querySelector("annotation") || {}).textContent?.slice(0, 42) ?? null,
                })),
            perfKatex: performance
                .getEntriesByType("resource")
                .filter((e) => /katex/i.test(e.name))
                .map((e) => ({
                    n: e.name.split("/").pop().slice(0, 60),
                    start: Math.round(e.startTime),
                    dur: Math.round(e.duration),
                    dec: e.decodedBodySize,
                })),
            fcp: Math.round((performance.getEntriesByName("first-contentful-paint")[0] || {}).startTime || 0),
            fonts: [...document.fonts].filter((f) => /KaTeX/.test(f.family)).map((f) => `${f.family} ${f.status}`),
        };
    });
    console.log(`\n=== ${w}x${h}${clickAbout ? " (about tab)" : ""} ===`);
    console.log(JSON.stringify(out, null, 2));
    console.log("katex net:", katexReqs.slice(0, 8).join(" | "));
    await ctx.close();
}

await measure(1440, 900, false);
await measure(1024, 900, false);
await measure(390, 844, true);

await browser.close();
