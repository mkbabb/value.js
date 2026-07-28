import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD";
fs.mkdirSync(OUT, { recursive: true });

const M2 = () => {
    const body = document.querySelector(".markdown-body");
    if (!body) return { error: "none" };
    const cs = getComputedStyle(body);

    // proper ch probe
    const probe = document.createElement("span");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.whiteSpace = "pre";
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontSize = cs.fontSize;
    probe.style.fontWeight = cs.fontWeight;
    probe.textContent = "0".repeat(100);
    body.appendChild(probe);
    const chW = probe.getBoundingClientRect().width / 100;
    // also measure a realistic prose alphabet width
    probe.textContent = "abcdefghijklmnopqrstuvwxyz ".repeat(4);
    const alphaW = probe.getBoundingClientRect().width / (27 * 4);
    probe.remove();

    const w = body.getBoundingClientRect().width;

    const ul = body.querySelector("ul");
    const ol = body.querySelector("ol");
    const ulcs = ul ? getComputedStyle(ul) : null;
    const olcs = ol ? getComputedStyle(ol) : null;

    // marker visibility: compare li content-box left edge to ul border-box left edge
    const markerBox = (list) => {
        if (!list) return null;
        const li = list.querySelector("li");
        const lr = li.getBoundingClientRect();
        const ur = list.getBoundingClientRect();
        const c = getComputedStyle(list);
        return {
            listStyle: c.listStyleType,
            dir: c.direction,
            padLeft: c.paddingLeft,
            padRight: c.paddingRight,
            padInlineStart: c.paddingInlineStart,
            padInlineEnd: c.paddingInlineEnd,
            ulLeft: Math.round(ur.left),
            ulRight: Math.round(ur.right),
            liLeft: Math.round(lr.left),
            liRight: Math.round(lr.right),
            // space available for the marker on the inline-start side:
            markerRoom:
                c.direction === "rtl"
                    ? Math.round(ur.right - lr.right)
                    : Math.round(lr.left - ur.left),
        };
    };

    const strong = body.querySelector("strong");
    const mark = body.querySelector("mark.cs-name");
    const em = body.querySelector("em");

    const px = (el) => (el ? getComputedStyle(el).color : null);

    // katex display block overflow
    const kd = [...body.querySelectorAll(":scope > div")].filter((d) =>
        d.querySelector(":scope > .katex-display"),
    );
    const kdInfo = kd.map((d) => {
        const c = getComputedStyle(d);
        return {
            overflowX: c.overflowX,
            clientW: d.clientWidth,
            scrollW: d.scrollWidth,
            padLeft: c.paddingLeft,
            padRight: c.paddingRight,
            overflowing: d.scrollWidth > d.clientWidth,
            tabIndex: d.tabIndex,
        };
    });

    // heading blocks reachability: any focusable inside body?
    const focusables = body.querySelectorAll(
        'a[href],button,[tabindex]:not([tabindex="-1"])',
    ).length;

    return {
        width: Math.round(w),
        chW: +chW.toFixed(3),
        alphaCharW: +alphaW.toFixed(3),
        measure_ch_units: +(w / chW).toFixed(1),
        measure_alpha_chars: +(w / alphaW).toFixed(1),
        maxInlineSize: cs.maxInlineSize,
        ul: markerBox(ul),
        ol: markerBox(ol),
        colors: {
            strong: px(strong),
            mark: px(mark),
            em: px(em),
            p: px(body.querySelector("p")),
            h2: px(body.querySelector("h2")),
            h3: px(body.querySelector("h3")),
            code: px(body.querySelector("p code, li code")),
            codeBg: body.querySelector("p code, li code")
                ? getComputedStyle(body.querySelector("p code, li code")).backgroundColor
                : null,
            bodyBg: (() => {
                let el = body;
                while (el) {
                    const b = getComputedStyle(el).backgroundColor;
                    if (b && b !== "rgba(0, 0, 0, 0)" && b !== "transparent") return b;
                    el = el.parentElement;
                }
                return null;
            })(),
        },
        strongWeight: strong ? getComputedStyle(strong).fontWeight : null,
        markWeight: mark ? getComputedStyle(mark).fontWeight : null,
        katexDisplayBlocks: kdInfo,
        focusablesInBody: focusables,
        scrollHeightNow: body.scrollHeight,
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
    await page.waitForTimeout(700);
}

async function arm(bt, name, ctxOpts, extra, shot = true) {
    const b = await bt.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...ctxOpts });
    const page = await ctx.newPage();
    if (extra) await extra(page);
    await openAbout(page);
    const m = await page.evaluate(M2);
    if (shot) await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log("\n===== " + name + " =====");
    console.log(JSON.stringify(m, null, 1));
    await b.close();
}

const rtlInit = async (page) => {
    await page.addInitScript(() => {
        const set = () => {
            document.documentElement.setAttribute("dir", "rtl");
            document.documentElement.setAttribute("lang", "ar");
        };
        if (document.documentElement) set();
        document.addEventListener("DOMContentLoaded", set);
    });
};

const which = process.argv[2] ?? "all";
if (which === "all" || which === "ltr") await arm(webkit, "m2-ltr", { colorScheme: "light" }, null, false);
if (which === "all" || which === "rtl") await arm(webkit, "m2-rtl", { colorScheme: "light" }, rtlInit, false);
if (which === "all" || which === "dark") await arm(webkit, "m2-dark", { colorScheme: "dark" }, null, false);
if (which === "all" || which === "wide")
    await arm(webkit, "m2-wide", { colorScheme: "light", viewport: { width: 2560, height: 1400 } }, null, true);
if (which === "all" || which === "fc")
    await arm(chromium, "m2-forced-colors", { colorScheme: "light", forcedColors: "active" }, null, true);
