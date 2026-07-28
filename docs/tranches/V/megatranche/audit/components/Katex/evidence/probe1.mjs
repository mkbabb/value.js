import { webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/katex-seat";

const probe = async (scheme, width, height, tag) => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width, height },
        colorScheme: scheme,
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(4500);

    const found = await page.evaluate(() => {
        const el = document.querySelector(".katex-display");
        if (!el) return false;
        el.scrollIntoView({ block: "center" });
        return true;
    });
    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
        const out = {};
        const disp = document.querySelectorAll(".katex-display");
        out.displayCount = disp.length;
        out.katexTotal = document.querySelectorAll(".katex").length;
        out.mathmlCount = document.querySelectorAll(".katex-mathml").length;
        out.wrapperCount = document.querySelectorAll("div.inline-block").length;

        const mb = document.querySelector(".markdown-body");
        out.markdownBodyWidth = mb ? +mb.getBoundingClientRect().width.toFixed(2) : null;
        if (mb) {
            const cs = getComputedStyle(mb);
            out.markdownBodyMaxInline = cs.maxInlineSize;
            out.markdownBodyFontSize = cs.fontSize;
            out.markdownBodyFontFamily = cs.fontFamily;
            out.markdownBodyLineHeight = cs.lineHeight;
            out.markdownBodyColor = cs.color;
        }
        const p = mb && mb.querySelector("p");
        if (p) {
            const pcs = getComputedStyle(p);
            out.proseWidth = +p.getBoundingClientRect().width.toFixed(2);
            out.proseMaxInline = pcs.maxInlineSize;
            out.proseColor = pcs.color;
            out.proseFont = pcs.fontFamily;
            out.proseFontSize = pcs.fontSize;
            out.proseLineHeight = pcs.lineHeight;
        }
        const code = mb && mb.querySelector("p > code, li > code");
        if (code) {
            const ccs = getComputedStyle(code);
            out.inlineCodeColor = ccs.color;
            out.inlineCodeFont = ccs.fontFamily;
            out.inlineCodeBg = ccs.backgroundColor;
            out.inlineCodeFontSize = ccs.fontSize;
        }

        out.rows = [];
        disp.forEach((d, i) => {
            const wrap = d.parentElement;
            const wcs = getComputedStyle(wrap);
            const dcs = getComputedStyle(d);
            const k = d.querySelector(".katex");
            const kcs = k ? getComputedStyle(k) : null;
            const html = d.querySelector(".katex-html");
            const wr = wrap.getBoundingClientRect();
            const hr = html ? html.getBoundingClientRect() : null;
            out.rows.push({
                i,
                wrapperClass: wrap.className,
                wrapperDisplay: wcs.display,
                wrapperOverflowX: wcs.overflowX,
                wrapperPadding: wcs.padding,
                wrapperMargin: wcs.margin,
                wrapperContentVisibility: wcs.contentVisibility,
                wrapperW: +wr.width.toFixed(2),
                wrapperH: +wr.height.toFixed(2),
                scrollW: wrap.scrollWidth,
                clientW: wrap.clientWidth,
                overflows: wrap.scrollWidth > wrap.clientWidth + 1,
                dispMargin: dcs.margin,
                dispTextAlign: dcs.textAlign,
                katexFont: kcs ? kcs.fontFamily : null,
                katexFontSize: kcs ? kcs.fontSize : null,
                katexLineHeight: kcs ? kcs.lineHeight : null,
                katexColor: kcs ? kcs.color : null,
                inkW: hr ? +hr.width.toFixed(2) : null,
                inkLeftGap: hr ? +(hr.left - wr.left).toFixed(2) : null,
                inkRightGap: hr ? +(wr.right - hr.right).toFixed(2) : null,
            });
        });

        const inlineWraps = [...document.querySelectorAll("div.inline-block")].filter(
            (w) => w.querySelector(":scope > .katex") && !w.querySelector(":scope > .katex-display"),
        );
        out.inlineCount = inlineWraps.length;
        if (inlineWraps[0]) {
            const w = inlineWraps[0];
            const cs = getComputedStyle(w);
            const k = w.querySelector(".katex");
            const kcs = getComputedStyle(k);
            const parentP = w.closest("p,li");
            const pcs = parentP ? getComputedStyle(parentP) : null;
            out.inlineSample = {
                text: w.textContent.slice(0, 60),
                wrapperDisplay: cs.display,
                wrapperMargin: cs.margin,
                verticalAlign: cs.verticalAlign,
                katexFontSize: kcs.fontSize,
                katexFontFamily: kcs.fontFamily,
                katexLineHeight: kcs.lineHeight,
                katexColor: kcs.color,
                parentFontSize: pcs ? pcs.fontSize : null,
                parentLineHeight: pcs ? pcs.lineHeight : null,
                parentFont: pcs ? pcs.fontFamily : null,
                wrapperRectH: +w.getBoundingClientRect().height.toFixed(2),
            };
        }

        out.katexFontFaces = [...document.fonts]
            .filter((f) => f.family.startsWith("KaTeX"))
            .map((f) => `${f.family}|${f.weight}|${f.style}|${f.status}`);

        let katexRules = 0;
        let katexSheets = 0;
        for (const s of document.styleSheets) {
            try {
                const txt = [...s.cssRules].map((r) => r.cssText).join("\n");
                if (txt.includes(".katex")) {
                    katexSheets++;
                    katexRules += s.cssRules.length;
                }
            } catch {}
        }
        out.katexSheets = katexSheets;
        out.katexRuleCount = katexRules;

        const first = document.querySelector(".katex");
        out.firstKatexWrapperHTML = first ? first.parentElement.outerHTML.slice(0, 500) : null;
        const htmlLayer = document.querySelector(".katex-html");
        out.htmlLayerAriaHidden = htmlLayer ? htmlLayer.getAttribute("aria-hidden") : null;

        return out;
    });

    fs.writeFileSync(`${OUT}/${tag}.json`, JSON.stringify({ data, errors, found }, null, 2));
    await page.screenshot({ path: `${OUT}/${tag}-viewport.png`, scale: "css" });
    await browser.close();
    console.log(tag, "OK", JSON.stringify({ found, displayCount: data.displayCount, errs: errors.length }));
};

await probe("light", 1440, 900, "light-1440");
await probe("dark", 1440, 900, "dark-1440");
