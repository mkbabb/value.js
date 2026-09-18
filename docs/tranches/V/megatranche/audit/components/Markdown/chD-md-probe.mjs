import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD";
fs.mkdirSync(OUT, { recursive: true });

const MEASURE = () => {
    const body = document.querySelector(".markdown-body");
    if (!body) return { error: "no .markdown-body", html: document.body.innerText.slice(0, 300) };
    const wrapper = document.querySelector(".markdown-wrapper");
    const cs = getComputedStyle(body);
    const rect = body.getBoundingClientRect();

    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
    probe.style.font = cs.font;
    probe.textContent = "0".repeat(100);
    body.appendChild(probe);
    const chW = probe.getBoundingClientRect().width / 100;
    probe.remove();

    const roleOf = (el) => {
        if (!el) return null;
        const c = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            tag: el.tagName,
            font: c.fontFamily.split(",")[0].replace(/["']/g, ""),
            size: c.fontSize,
            weight: c.fontWeight,
            lh: c.lineHeight,
            color: c.color,
            bg: c.backgroundColor,
            mt: c.marginTop,
            mb: c.marginBottom,
            pl: c.paddingLeft,
            pr: c.paddingRight,
            blw: c.borderLeftWidth,
            trans: c.transitionDuration + "/" + c.transitionProperty,
            cv: c.contentVisibility,
            cis: c.containIntrinsicSize,
            op: c.opacity,
            w: Math.round(r.width),
            h: Math.round(r.height),
        };
    };

    const paras = [...body.querySelectorAll("p")];
    const longest = paras.reduce((a, b) => ((a?.textContent?.length ?? 0) > b.textContent.length ? a : b), paras[0]);

    return {
        bodyWidth: Math.round(rect.width),
        bodyScrollWidth: body.scrollWidth,
        bodyHeight: Math.round(rect.height),
        maxInlineSize: cs.maxInlineSize,
        chWidth: +chW.toFixed(3),
        measureCh: +(rect.width / chW).toFixed(1),
        longestParaChars: longest?.textContent?.length ?? 0,
        dir: wrapper ? getComputedStyle(wrapper).direction : null,
        counts: {
            h1: body.querySelectorAll("h1").length,
            h2: body.querySelectorAll("h2").length,
            h3: body.querySelectorAll("h3").length,
            h4h5h6: body.querySelectorAll("h4,h5,h6").length,
            p: body.querySelectorAll("p").length,
            ul: body.querySelectorAll("ul").length,
            ol: body.querySelectorAll("ol").length,
            hr: body.querySelectorAll("hr").length,
            table: body.querySelectorAll("table").length,
            pre: body.querySelectorAll("pre").length,
            blockquote: body.querySelectorAll("blockquote").length,
            img: body.querySelectorAll("img").length,
            dl: body.querySelectorAll("dl").length,
            toc: body.querySelectorAll(".toc").length,
            callout: body.querySelectorAll(".callout").length,
            footnotes: body.querySelectorAll(".footnotes").length,
            taskList: body.querySelectorAll("ul.contains-task-list").length,
            a: body.querySelectorAll("a").length,
            code: body.querySelectorAll("code").length,
            markCs: body.querySelectorAll("mark.cs-name").length,
            katexDisplay: body.querySelectorAll(".katex-display").length,
            directChildren: body.children.length,
        },
        h2: roleOf(body.querySelector("h2")),
        h3: roleOf(body.querySelector("h3")),
        p: roleOf(body.querySelector("p")),
        li: roleOf(body.querySelector("li")),
        code: roleOf(body.querySelector("p code, li code")),
        a: roleOf(body.querySelector("a")),
        hr: roleOf(body.querySelector("hr")),
        mark: roleOf(body.querySelector("mark.cs-name")),
        secondChild: roleOf(body.children[1]),
        mdVars: (() => {
            if (!wrapper) return null;
            const c = getComputedStyle(wrapper);
            return {
                h2: c.getPropertyValue("--md-color-h2").trim(),
                h3: c.getPropertyValue("--md-color-h3").trim(),
                accent: c.getPropertyValue("--md-color-accent").trim(),
            };
        })(),
    };
};

async function openAbout(page) {
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(4500);
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const h2 = [...document.querySelectorAll("h2")].find((e) =>
            e.textContent.includes("Detailed Guide"),
        );
        if (card && h2) card.scrollTop = h2.offsetTop - 24;
    });
    await page.waitForTimeout(900);
}

async function arm(browserType, name, ctxOpts, extra) {
    const b = await browserType.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...ctxOpts });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text()));
    if (extra) await extra(page, ctx);
    await openAbout(page);
    const m = await page.evaluate(MEASURE);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log("\n===== " + name + " =====");
    console.log(JSON.stringify({ ...m, pageErrors: errs.slice(0, 4) }, null, 1));
    await b.close();
}

const which = process.argv[2] ?? "all";

if (which === "all" || which === "light") await arm(webkit, "wk-desktop-light", { colorScheme: "light" });
if (which === "all" || which === "dark") await arm(webkit, "wk-desktop-dark", { colorScheme: "dark" });
if (which === "all" || which === "rtl")
    await arm(webkit, "wk-rtl", { colorScheme: "light" }, async (page) => {
        await page.addInitScript(() => {
            const set = () => {
                document.documentElement.setAttribute("dir", "rtl");
                document.documentElement.setAttribute("lang", "ar");
            };
            if (document.documentElement) set();
            document.addEventListener("DOMContentLoaded", set);
        });
    });
if (which === "all" || which === "fc")
    await arm(chromium, "cr-forced-colors", { colorScheme: "light", forcedColors: "active" });
if (which === "all" || which === "prm")
    await arm(webkit, "wk-reduced-motion", { colorScheme: "light", reducedMotion: "reduce" });
if (which === "all" || which === "narrow")
    await arm(webkit, "wk-narrow-390", { colorScheme: "light", viewport: { width: 390, height: 844 } });
