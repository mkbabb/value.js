import { chromium, webkit } from "playwright";

const engine = process.env.ENGINE === "webkit" ? webkit : chromium;
const browser = await engine.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleMsgs = [];
page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 300)}`));
page.on("pageerror", (e) => consoleMsgs.push(`PAGEERROR: ${e.message.slice(0, 300)}`));

await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.waitForSelector(".markdown-body", { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(2500);

const report = await page.evaluate(() => {
    const out = {};
    const katexRoots = [...document.querySelectorAll("div.inline-block")].filter((d) =>
        d.querySelector(":scope > .katex, :scope > .katex-display"),
    );
    out.katexRootCount = katexRoots.length;
    out.totalKatexSpans = document.querySelectorAll(".katex").length;
    out.katexErrors = [...document.querySelectorAll(".katex-error")].map((e) => ({
        text: e.textContent.slice(0, 120),
        title: e.getAttribute("title"),
    }));

    const divInP = [...document.querySelectorAll("p div")].filter((d) =>
        d.querySelector(":scope > .katex, :scope > .katex-display"),
    );
    out.divInsideP = divInP.length;
    out.divInsideLi = [...document.querySelectorAll("li div")].filter((d) =>
        d.querySelector(":scope > .katex, :scope > .katex-display"),
    ).length;
    out.sampleDivInPOuter = divInP[0] ? divInP[0].parentElement.outerHTML.slice(0, 500) : null;

    out.scrollables = katexRoots
        .map((d, i) => {
            const cs = getComputedStyle(d);
            return {
                i,
                display: cs.display,
                overflowX: cs.overflowX,
                scrollWidth: d.scrollWidth,
                clientWidth: d.clientWidth,
                overflowing: d.scrollWidth > d.clientWidth + 1,
                tabIndex: d.tabIndex,
                role: d.getAttribute("role"),
                ariaLabel: d.getAttribute("aria-label"),
                expr: (d.querySelector("annotation") || {}).textContent?.slice(0, 80) ?? null,
            };
        })
        .filter((x) => x.overflowing || x.overflowX === "auto" || x.overflowX === "scroll");

    const anyKatex = document.querySelector(".katex .mord");
    out.katexCssAlive = anyKatex ? getComputedStyle(anyKatex).fontFamily : null;
    const mathml = document.querySelector(".katex-mathml");
    out.mathmlHidden = mathml
        ? {
              position: getComputedStyle(mathml).position,
              clip: getComputedStyle(mathml).clip,
              width: mathml.getBoundingClientRect().width,
              height: mathml.getBoundingClientRect().height,
          }
        : null;
    const htmlLayer = document.querySelector(".katex-html");
    out.htmlLayerAriaHidden = htmlLayer ? htmlLayer.getAttribute("aria-hidden") : null;

    const container = document.querySelector(".markdown-body");
    out.containerWidth = container ? container.clientWidth : null;
    out.firstRootOuter = katexRoots[0] ? katexRoots[0].outerHTML.slice(0, 600) : null;
    return out;
});

console.log(JSON.stringify(report, null, 2));
console.log("--- console ---");
console.log(consoleMsgs.join("\n"));
await browser.close();
