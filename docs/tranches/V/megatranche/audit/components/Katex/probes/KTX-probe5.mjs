// (a) live desktop re-measure AFTER scrolling the formula into view (defeats
//     the content-visibility:auto layout-skip that made probe1/3 read 0 overflow)
// (b) WebKit keyboard reachability of the overflowing scroll container
import { chromium, webkit } from "playwright";

const engineName = process.argv[2] || "chromium";
const engine = engineName === "webkit" ? webkit : chromium;
const browser = await engine.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForSelector(".markdown-body", { timeout: 25000 }).catch(() => {});
await page.waitForTimeout(3000);

const before = await page.evaluate(() =>
    [...document.querySelectorAll("div.inline-block")]
        .filter((d) => d.querySelector(":scope > .katex-display"))
        .map((d) => ({ sw: d.scrollWidth, cw: d.clientWidth })),
);

// scroll each into view, then measure
const after = await page.evaluate(async () => {
    const roots = [...document.querySelectorAll("div.inline-block")].filter((d) =>
        d.querySelector(":scope > .katex-display"),
    );
    const out = [];
    for (const d of roots) {
        d.scrollIntoView({ block: "center" });
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        out.push({
            expr: (d.querySelector("annotation") || {}).textContent?.slice(0, 40) ?? null,
            sw: d.scrollWidth,
            cw: d.clientWidth,
            hidden: d.scrollWidth - d.clientWidth,
            tabIndex: d.tabIndex,
            cv: getComputedStyle(d).contentVisibility,
        });
    }
    return out;
});
console.log(engineName, "BEFORE scrollIntoView:", JSON.stringify(before));
console.log(engineName, "AFTER  scrollIntoView:", JSON.stringify(after, null, 1));

// keyboard reachability: tab-walk from the top of the About card
await page.evaluate(() => {
    const d = [...document.querySelectorAll("div.inline-block")].find(
        (d) => d.querySelector(":scope > .katex-display") && d.scrollWidth > d.clientWidth + 1,
    );
    if (d) {
        d.setAttribute("data-ktx-probe", "1");
        d.scrollIntoView({ block: "center" });
    }
    document.body.focus();
});
await page.waitForTimeout(400);
let hit = false;
const seen = [];
for (let i = 0; i < 90; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
        const a = document.activeElement;
        return {
            tag: a ? a.tagName : null,
            cls: a ? (a.getAttribute("class") || "").slice(0, 40) : null,
            probe: a ? a.hasAttribute("data-ktx-probe") : false,
        };
    });
    seen.push(`${info.tag}.${info.cls}`);
    if (info.probe) {
        hit = true;
        console.log(engineName, "TAB reached the katex scroller at press", i + 1);
        break;
    }
}
console.log(engineName, "katex scroller reachable by Tab (90 presses):", hit);
console.log(engineName, "unique stops:", [...new Set(seen)].length, [...new Set(seen)].slice(0, 25).join(" | "));
await browser.close();
