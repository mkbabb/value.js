import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";

async function run(scheme) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);
    const pre = await page.evaluate(() => ({
        hasMarkdown: !!document.querySelector(".markdown-wrapper"),
        dockText: [...document.querySelectorAll("header button, header [role='tab'], [class*='dock'] button")].map((b) => b.textContent.trim()).filter(Boolean).slice(0, 20),
    }));
    // click the About pane tab
    const about = page.locator("button", { hasText: /^About$/ }).first();
    let clicked = false;
    if (await about.count()) { await about.click({ force: true }); clicked = true; }
    await page.waitForTimeout(2500);
    const data = await page.evaluate(() => {
        const wrapper = document.querySelector(".markdown-wrapper");
        if (!wrapper) return { reached: false };
        const body = wrapper.querySelector(".markdown-body");
        const card = document.querySelector(".about-card");
        const g = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));
        if (card && g) card.scrollTop = g.offsetTop - 16;
        const p = body.querySelector(":scope > p");
        const probe = document.createElement("span");
        probe.textContent = "0".repeat(100);
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;content-visibility:visible;";
        p.appendChild(probe);
        const chPx = probe.getBoundingClientRect().width / 100;
        probe.remove();
        const kx = [...body.querySelectorAll(":scope > div.inline-block")];
        const pre_ = [...body.querySelectorAll("pre")];
        const cs = (el, ps) => Object.fromEntries(ps.map((x) => [x, getComputedStyle(el)[x]]));
        return {
            reached: true,
            bodyWidthPx: +body.getBoundingClientRect().width.toFixed(1),
            chPx: +chPx.toFixed(2),
            bodyWidthCh: +(body.getBoundingClientRect().width / chPx).toFixed(1),
            ulPaddingLeft: cs(body.querySelector("ul"), ["paddingLeft"]).paddingLeft,
            h2Size: cs(body.querySelector(":scope > h2"), ["fontSize"]).fontSize,
            proseSize: cs(p, ["fontSize", "lineHeight"]),
            codeSize: cs(body.querySelector("p > code, li > code"), ["fontSize"]).fontSize,
            katexOverflowing: kx.filter((k) => k.scrollWidth > k.clientWidth + 1).map((k) => ({ scrollW: k.scrollWidth, clientW: k.clientWidth })),
            katexCount: kx.length,
            preOverflowing: pre_.filter((k) => k.scrollWidth > k.clientWidth + 1).length,
            docHorizontalOverflow: document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
            cardHorizontalOverflow: card.scrollWidth - card.clientWidth,
            cardScrollHeight: card.scrollHeight,
        };
    });
    fs.writeFileSync(`${OUT}/mobile-${scheme}.json`, JSON.stringify({ pre, clicked, data }, null, 2));
    console.log(JSON.stringify({ pre, clicked, data }, null, 2));
    await page.waitForTimeout(600);
    const card = await page.$(".about-card");
    if (card) await card.screenshot({ path: `${OUT}/mobile-${scheme}-card.png` });
    await page.screenshot({ path: `${OUT}/mobile-${scheme}-page.png` });
    await b.close();
}
await run(process.argv[2] || "light");
