import { webkit } from "playwright";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";

const deep = () => {
    const wrapper = document.querySelector(".markdown-wrapper");
    const body = wrapper.querySelector(".markdown-body");
    const root = document.documentElement;
    const gp = (n) => getComputedStyle(root).getPropertyValue(n).trim();

    // correct ch: probe OUTSIDE .markdown-body children (avoid the cv:auto rule)
    const probe = document.createElement("span");
    probe.textContent = "0".repeat(100);
    probe.style.cssText =
        "position:absolute;visibility:hidden;white-space:pre;content-visibility:visible;contain-intrinsic-size:none;";
    const p0 = body.querySelector(":scope > p");
    p0.appendChild(probe);
    const chPx = probe.getBoundingClientRect().width / 100;
    probe.remove();

    // ---- contrast helpers (WCAG 2.1) ----
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const toRgb = (css) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
    };
    const lum = ([r, g, b]) => {
        const f = (c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const over = (fg, bg) => {
        const a = fg[3];
        return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
    };
    const ratio = (a, b) => {
        const [L1, L2] = [lum(a), lum(b)].sort((x, y) => y - x);
        return +((L1 + 0.05) / (L2 + 0.05)).toFixed(2);
    };

    const accentCss = getComputedStyle(body.querySelector(":scope > h2")).color;
    const codeEl = body.querySelector("p > code, li > code");
    const codeBg = getComputedStyle(codeEl).backgroundColor;
    const codeFg = getComputedStyle(codeEl).color;
    const hrEl = body.querySelector("hr");
    const hrColor = getComputedStyle(hrEl).borderTopColor;
    const hrOpacity = parseFloat(getComputedStyle(hrEl).opacity);
    // the composited ground behind the markdown = sample the actual painted pixel
    const cardEl = document.querySelector(".about-card");
    const cardBg = getComputedStyle(cardEl).backgroundColor;

    const accentRgb = toRgb(accentCss);
    const codeBgRgb = toRgb(codeBg);
    const cardBgRgb = toRgb(cardBg);
    // approximate the plate composited over the page ground:
    const pageBg = toRgb(getComputedStyle(document.body).backgroundColor);
    const plateComposited = over(cardBgRgb, pageBg.length ? pageBg : [255, 255, 255, 1]);

    const hrRgb = toRgb(hrColor);
    const hrEffective = over([hrRgb[0], hrRgb[1], hrRgb[2], hrOpacity], over(codeBgRgb[3] < 1 ? plateComposited.concat(1) : plateComposited.concat(1), [255, 255, 255]));

    // ---- mark parent census ----
    const markParents = [...body.querySelectorAll("mark.cs-name")].map((m) => ({
        parent: m.parentElement.tagName,
        text: m.textContent,
        color: getComputedStyle(m).color,
        parentColor: getComputedStyle(m.parentElement).color,
        sameAsParent: getComputedStyle(m).color === getComputedStyle(m.parentElement).color,
    }));

    // ---- content-visibility scrollHeight lie ----
    const kids = [...body.children];
    const cvKids = kids.filter((k) => getComputedStyle(k).contentVisibility === "auto");
    const heights = cvKids.map((k) => +k.getBoundingClientRect().height.toFixed(1));
    const at200 = heights.filter((h) => Math.abs(h - 200) < 0.6).length;

    return {
        chPx: +chPx.toFixed(3),
        bodyWidthPx: +body.getBoundingClientRect().width.toFixed(1),
        bodyWidthCh: +(body.getBoundingClientRect().width / chPx).toFixed(1),
        constitutionCapCh: 66,
        typeTokens: {
            "--type-prose": gp("--type-prose"),
            "--type-leading-prose": gp("--type-leading-prose"),
            "--type-heading": gp("--type-heading"),
            "--type-title": gp("--type-title"),
            "--type-small": gp("--type-small"),
            "--type-body": gp("--type-body"),
        },
        contrast: {
            accentCss,
            "accent-on-well(inline code)": ratio(codeBgRgb[3] < 1 ? over(toRgb(codeFg), over(codeBgRgb, plateComposited)) : toRgb(codeFg), over(codeBgRgb, plateComposited)),
            codeBg,
            codeFg,
            cardBg,
            pageBg: getComputedStyle(document.body).backgroundColor,
            "hr-effective-vs-plate": (() => {
                const g = over(cardBgRgb, [255, 255, 255, 1]);
                const f = over([hrRgb[0], hrRgb[1], hrRgb[2], hrOpacity], g);
                return ratio(f, g);
            })(),
            "h2-accent-vs-plate": (() => {
                const g = over(cardBgRgb, [255, 255, 255, 1]);
                return ratio(over(accentRgb, g), g);
            })(),
        },
        markParents,
        cvChildCount: cvKids.length,
        cvChildrenAtExactly200px: at200,
        cvHeights: heights,
        sumFictitious: cvKids.length * 200,
        cardScrollHeightNow: document.querySelector(".about-card").scrollHeight,
    };
};

async function run() {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);

    // ---- A. scrollHeight lie: measure BEFORE any scroll-through, then after ----
    const before = await page.evaluate(() => {
        const c = document.querySelector(".about-card");
        return { scrollHeight: c.scrollHeight, scrollTop: c.scrollTop };
    });
    // full scroll-through to force every cv:auto block to render + remember
    await page.evaluate(async () => {
        const c = document.querySelector(".about-card");
        for (let y = 0; y <= c.scrollHeight; y += 300) {
            c.scrollTop = y;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        }
    });
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => {
        const c = document.querySelector(".about-card");
        return { scrollHeight: c.scrollHeight };
    });

    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const g = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));
        card.scrollTop = g.offsetTop - 24;
    });
    await page.waitForTimeout(600);
    const data = await page.evaluate(deep);
    const out = { scrollHeightBeforeAnyScroll: before, scrollHeightAfterFullScroll: after, ...data };
    fs.writeFileSync(`${OUT}/deep.json`, JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
    await browser.close();
}
await run();
