import { webkit } from "@playwright/test";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD";
fs.mkdirSync(OUT, { recursive: true });

const M3 = () => {
    const body = document.querySelector(".markdown-body");
    const wrapper = document.querySelector(".markdown-wrapper");
    if (!body) return { error: "none" };
    const cs = getComputedStyle(body);

    // resolve any CSS color to sRGB via canvas
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const toRGB = (c) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
    };
    const lin = (u) => {
        u /= 255;
        return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
    };
    const oklab = (c) => {
        const [R, G, B] = toRGB(c);
        const r = lin(R), g = lin(G), b = lin(B);
        const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
        const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
        const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
        ];
    };
    const dE = (a, b) => {
        const A = oklab(a), B = oklab(b);
        return +Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]).toFixed(4);
    };
    const chroma = (c) => {
        const A = oklab(c);
        return +Math.hypot(A[1], A[2]).toFixed(4);
    };
    const relLum = (c) => {
        const [R, G, B] = toRGB(c);
        return 0.2126 * lin(R) + 0.7152 * lin(G) + 0.0722 * lin(B);
    };
    const contrast = (a, b) => {
        const l1 = relLum(a), l2 = relLum(b);
        const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
        return +((hi + 0.05) / (lo + 0.05)).toFixed(2);
    };

    // measure prose measure with a probe OUTSIDE the contained subtree
    const probe = document.createElement("span");
    probe.style.cssText =
        "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;";
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontSize = cs.fontSize;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.letterSpacing = cs.letterSpacing;
    probe.textContent = "0".repeat(100);
    document.body.appendChild(probe);
    const chW = probe.getBoundingClientRect().width / 100;
    probe.textContent =
        "The quick brown fox jumps over the lazy dog and keeps on running past the hedge. ".repeat(3);
    const proseW = probe.getBoundingClientRect().width / (81 * 3);
    probe.remove();

    const w = body.getBoundingClientRect().width;

    const strong = body.querySelector("strong");
    const mark = body.querySelector("mark.cs-name");
    const cc = (el) => (el ? getComputedStyle(el).color : null);
    const bg = (el) => (el ? getComputedStyle(el).backgroundColor : null);

    // find first opaque painted ancestor bg for contrast maths
    let plate = "rgb(255,255,255)";
    let el = body;
    while (el) {
        const b = getComputedStyle(el).backgroundColor;
        if (b && b !== "rgba(0, 0, 0, 0)" && !/, 0\)$/.test(b)) { plate = b; break; }
        el = el.parentElement;
    }

    const markC = cc(mark), strongC = cc(strong), pC = cc(body.querySelector("p"));
    const h2C = cc(body.querySelector("h2")), h3C = cc(body.querySelector("h3"));
    const codeC = cc(body.querySelector("p code, li code"));
    const codeBg = bg(body.querySelector("p code, li code"));

    return {
        scheme: document.documentElement.classList.contains("dark") ? "dark" : "light",
        bodyWidthPx: Math.round(w),
        chWidthPx: +chW.toFixed(3),
        proseAvgCharPx: +proseW.toFixed(3),
        measure_ch: +(w / chW).toFixed(1),
        measure_realChars: +(w / proseW).toFixed(1),
        maxInlineSize: cs.maxInlineSize,
        resolved: { markC, strongC, pC, h2C, h3C, codeC, codeBg, plate },
        deltas: {
            mark_vs_strong: dE(markC, strongC),
            mark_vs_body: dE(markC, pC),
            h2_vs_body: dE(h2C, pC),
            h3_vs_h2: dE(h3C, h2C),
            code_vs_body: dE(codeC, pC),
            codeBg_vs_plate: dE(codeBg, plate),
        },
        chromas: { accent: chroma(markC), h3: chroma(h3C), body: chroma(pC) },
        contrasts: {
            h2_on_plate: contrast(h2C, plate),
            code_on_codeBg: contrast(codeC, codeBg),
            hr_effective_note: "hr opacity 0.3",
        },
    };
};

async function openAbout(page, w) {
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

async function run(name, ctxOpts) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...ctxOpts });
    const page = await ctx.newPage();
    await openAbout(page);
    console.log("\n===== " + name + " =====");
    console.log(JSON.stringify(await page.evaluate(M3), null, 1));
    await b.close();
}

// ── skeleton arm: delay the compiled .md module so the loading state is held ──
async function skeletonArm() {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.route(/assets\/docs\/.*\.md/, async (route) => {
        await new Promise((r) => setTimeout(r, 20000));
        await route.continue();
    });
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(5000);
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const h2 = [...document.querySelectorAll("h2")].find((e) =>
            e.textContent.includes("Detailed Guide"),
        );
        if (card && h2) card.scrollTop = h2.offsetTop - 24;
    });
    await page.waitForTimeout(600);
    const skel = await page.evaluate(() => {
        const sk = [...document.querySelectorAll('[class*="skeleton"], [data-slot="skeleton"]')];
        const guide = [...document.querySelectorAll("h2")].find((e) =>
            e.textContent.includes("Detailed Guide"),
        );
        const host = guide?.parentElement;
        return {
            skeletonNodes: sk.length,
            skeletonRects: sk.map((e) => {
                const r = e.getBoundingClientRect();
                return { cls: e.className.toString().slice(0, 70), w: Math.round(r.width), h: Math.round(r.height) };
            }),
            loadingHostHeight: host ? Math.round(host.getBoundingClientRect().height) : null,
            hasMarkdownBody: !!document.querySelector(".markdown-body"),
            cardScrollHeight: document.querySelector(".about-card")?.scrollHeight,
        };
    });
    await page.screenshot({ path: `${OUT}/m3-skeleton.png` });
    console.log("\n===== skeleton (md module delayed 20s) =====");
    console.log(JSON.stringify(skel, null, 1));
    await b.close();
}

// ── error arm: abort the .md module request entirely ──
async function errorArm() {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 160)));
    page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 160)));
    await page.route(/assets\/docs\/.*\.md/, (route) => route.abort("failed"));
    await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
    await page.waitForTimeout(9000);
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const h2 = [...document.querySelectorAll("h2")].find((e) =>
            e.textContent.includes("Detailed Guide"),
        );
        if (card && h2) card.scrollTop = h2.offsetTop - 24;
    });
    await page.waitForTimeout(600);
    const st = await page.evaluate(() => {
        const alert = document.querySelector('[role="alert"], [data-slot="alert"]');
        const sk = document.querySelectorAll('[class*="skeleton"], [data-slot="skeleton"]');
        return {
            alertPresent: !!alert,
            alertText: alert?.textContent?.trim().slice(0, 120) ?? null,
            skeletonStillPresent: sk.length,
            markdownBodyPresent: !!document.querySelector(".markdown-body"),
        };
    });
    await page.screenshot({ path: `${OUT}/m3-error.png` });
    console.log("\n===== error (md module aborted) =====");
    console.log(JSON.stringify({ ...st, errs: errs.slice(0, 6) }, null, 1));
    await b.close();
}

const which = process.argv[2] ?? "all";
if (which === "all" || which === "light") await run("m3-light", { colorScheme: "light" });
if (which === "all" || which === "dark") await run("m3-dark", { colorScheme: "dark" });
if (which === "all" || which === "skeleton") await skeletonArm();
if (which === "all" || which === "error") await errorArm();
