import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";
fs.mkdirSync(OUT, { recursive: true });

const measure = () => {
    const wrapper = document.querySelector(".markdown-wrapper");
    if (!wrapper) return { error: "no .markdown-wrapper", html: document.querySelector(".about-card")?.innerHTML.slice(0, 2000) };
    const body = wrapper.querySelector(".markdown-body");
    const r = (el) => {
        const b = el.getBoundingClientRect();
        return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.x.toFixed(2), y: +b.y.toFixed(2) };
    };
    const cs = (el, props) => Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]]));

    const probe = document.createElement("span");
    probe.textContent = "0".repeat(100);
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
    body.appendChild(probe);
    const chPx = probe.getBoundingClientRect().width / 100;
    probe.remove();

    const kids = [...body.children];
    const cvKids = kids.filter((k) => getComputedStyle(k).contentVisibility === "auto");

    const firstP = body.querySelector(":scope > p");
    const h2 = body.querySelector(":scope > h2");
    const h3 = body.querySelector(":scope > h3");
    const inlineCode = body.querySelector("p > code, li > code");
    const hrs = [...body.querySelectorAll("hr")];
    const katexBlocks = [...body.querySelectorAll(":scope > div.inline-block")];
    const marks = [...body.querySelectorAll("mark.cs-name")];
    const guide = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));

    return {
        wrapperRect: r(wrapper),
        bodyRect: r(body),
        chPx: +chPx.toFixed(3),
        bodyWidthInCh: +(body.getBoundingClientRect().width / chPx).toFixed(1),
        bodyMaxInlineSize: getComputedStyle(body).maxInlineSize,
        bodyMaxWidth: getComputedStyle(body).maxWidth,
        bodyFont: cs(body, ["fontFamily", "fontSize", "lineHeight"]),
        guideHeading: guide && { text: guide.textContent.trim(), ...cs(guide, ["fontSize", "fontFamily", "fontWeight"]) },
        directChildren: kids.length,
        contentVisibilityAutoChildren: cvKids.length,
        containIntrinsic: cvKids[0] ? getComputedStyle(cvKids[0]).containIntrinsicSize : null,
        childTagCensus: kids.reduce((a, k) => ((a[k.tagName] = (a[k.tagName] || 0) + 1), a), {}),
        p: firstP && { rect: r(firstP), ...cs(firstP, ["fontFamily", "fontSize", "lineHeight", "marginBottom"]), widthCh: +(firstP.getBoundingClientRect().width / chPx).toFixed(1) },
        h2: h2 && { text: h2.textContent.trim(), rect: r(h2), ...cs(h2, ["fontFamily", "fontSize", "fontWeight", "color", "transitionProperty", "transitionDuration", "marginTop", "marginBottom"]) },
        h3: h3 && { text: h3.textContent.trim(), ...cs(h3, ["fontSize", "color", "fontFamily", "fontWeight"]) },
        inlineCode: inlineCode && { text: inlineCode.textContent, ...cs(inlineCode, ["fontSize", "fontFamily", "color", "backgroundColor", "paddingLeft"]) },
        hrCount: hrs.length,
        hr: hrs[0] && cs(hrs[0], ["opacity", "borderTopColor", "borderTopWidth", "marginBlockStart"]),
        katexBlockCount: katexBlocks.length,
        katexBlock: katexBlocks[0] && { ...cs(katexBlocks[0], ["display", "overflowX", "paddingLeft", "paddingRight"]), rect: r(katexBlocks[0]), scrollW: katexBlocks[0].scrollWidth, clientW: katexBlocks[0].clientWidth },
        katexOverflowing: katexBlocks.filter((k) => k.scrollWidth > k.clientWidth + 1).length,
        markCount: marks.length,
        mark: marks[0] && cs(marks[0], ["color", "backgroundColor", "fontWeight"]),
        ul: (() => { const ul = body.querySelector("ul"); return ul && cs(ul, ["paddingLeft", "paddingRight", "paddingInlineStart", "marginBottom"]); })(),
        blockquote: (() => { const b = body.querySelector("blockquote"); return b && cs(b, ["paddingLeft", "borderLeftWidth"]); })(),
        mdVars: {
            h2: getComputedStyle(wrapper).getPropertyValue("--md-color-h2").trim(),
            h3: getComputedStyle(wrapper).getPropertyValue("--md-color-h3").trim(),
            accent: getComputedStyle(wrapper).getPropertyValue("--md-color-accent").trim(),
        },
        wellBg: getComputedStyle(document.documentElement).getPropertyValue("--well-bg").trim(),
        cardBg: getComputedStyle(document.querySelector(".about-card")).backgroundColor,
        aboutSeparatorCount: document.querySelectorAll('.about-card [data-orientation="horizontal"], .about-card hr, .about-card [role="separator"]').length,
        aboutCardScrollH: document.querySelector(".about-card")?.scrollHeight,
    };
};

async function run(name, opts) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const g = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));
        if (card && g) card.scrollTop = g.offsetTop - 24;
    });
    await page.waitForTimeout(1500);
    const data = await page.evaluate(measure);
    fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({ errs, data }, null, 2));
    const card = await page.$(".about-card");
    if (card) await card.screenshot({ path: `${OUT}/${name}-card.png` });
    await browser.close();
    console.log("=== " + name + " ===");
    console.log(JSON.stringify(data, null, 2));
    if (errs.length) console.log("ERRORS:", errs.slice(0, 5));
}

const mode = process.argv[2];
const cfg = {
    "desktop-light": { viewport: { width: 1440, height: 900 }, colorScheme: "light" },
    "desktop-dark": { viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
    "mobile-light": { viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    "mobile-dark": { viewport: { width: 390, height: 844 }, colorScheme: "dark", isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};
await run(mode, cfg[mode]);
