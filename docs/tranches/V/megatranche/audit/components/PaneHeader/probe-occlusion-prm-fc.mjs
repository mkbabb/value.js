// CHALLENGE-D · PaneHeader — three measurements:
//  (1) OCCLUSION LEAK: at the veil's terminal state (opacity 1, the "swell
//      complete" the source calls gate 3) measure how much of the content
//      scrolling beneath still reaches the pixel. A/B: header band with the
//      siblings visible vs. hidden, differenced in-browser on a canvas.
//  (2) prefers-reduced-motion: reduce — reproduce the scrub (MT-F023) and then
//      simulate the PROPOSED naive cure (all three declarations gated off) to
//      see what the cure leaves a PRM user looking at.
//  (3) forced-colors: active — the veil + title + caption under the forced palette.
// READ-ONLY against the live dev server.
import { webkit, chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";

const OUT = "docs/tranches/V/megatranche/audit/components/PaneHeader/shots";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:9000/#/gradient";

const settle = async (page) => {
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2600);
};
const scrollFull = (page) =>
    page.evaluate(() => {
        const el = document.querySelector(".pane-scroll-fade");
        const s = document.createElement("div");
        s.style.height = "1200px";
        s.dataset.probeSpacer = "1";
        el.appendChild(s);
        el.scrollTop = 400;
    });
const bandBox = (page) =>
    page.evaluate(() => {
        const h = document.querySelector(".pane-header");
        const r = h.getBoundingClientRect();
        // the veil covers the header box + 14px of feather overhang
        return {
            x: Math.round(r.left),
            y: Math.round(r.top),
            width: Math.round(r.width),
            height: Math.round(r.height + 14),
        };
    });

// ── (1) occlusion leak, both engines ───────────────────────────────────────
for (const [engName, eng] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    const b = await eng.launch();
    const ctx = await b.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
    });
    const page = await ctx.newPage();
    await settle(page);
    await scrollFull(page);
    await page.waitForTimeout(900);
    const clip = await bandBox(page);
    const withContent = await page.screenshot({ clip });
    const veil = await page.evaluate(
        () => getComputedStyle(document.querySelector(".pane-header"), "::before").opacity,
    );
    // hide every sibling of the header inside the scroll host
    await page.evaluate(() => {
        const host = document.querySelector(".pane-scroll-fade");
        for (const el of host.children)
            if (!el.classList.contains("pane-header")) el.style.visibility = "hidden";
    });
    await page.waitForTimeout(400);
    const withoutContent = await page.screenshot({ clip });
    writeFileSync(`${OUT}/${engName}-leak-A-content-under-veil.png`, withContent);
    writeFileSync(`${OUT}/${engName}-leak-B-content-hidden.png`, withoutContent);
    const diff = await page.evaluate(
        async ([a, b, w, h]) => {
            const load = (d) =>
                new Promise((res) => {
                    const i = new Image();
                    i.onload = () => res(i);
                    i.src = "data:image/png;base64," + d;
                });
            const [ia, ib] = await Promise.all([load(a), load(b)]);
            const g = (img) => {
                const c = document.createElement("canvas");
                c.width = img.naturalWidth;
                c.height = img.naturalHeight;
                c.getContext("2d").drawImage(img, 0, 0);
                return c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
            };
            const A = g(ia),
                B = g(ib);
            let max = 0,
                sum = 0,
                over8 = 0,
                over24 = 0,
                n = 0;
            for (let i = 0; i < A.length; i += 4) {
                const d = Math.max(
                    Math.abs(A[i] - B[i]),
                    Math.abs(A[i + 1] - B[i + 1]),
                    Math.abs(A[i + 2] - B[i + 2]),
                );
                max = Math.max(max, d);
                sum += d;
                if (d > 8) over8++;
                if (d > 24) over24++;
                n++;
            }
            return {
                px: n,
                maxChannelDelta: max,
                meanChannelDelta: +(sum / n).toFixed(3),
                pxOver8: over8,
                pctOver8: +((100 * over8) / n).toFixed(2),
                pxOver24: over24,
                pctOver24: +((100 * over24) / n).toFixed(2),
                imgW: ia.naturalWidth,
                imgH: ia.naturalHeight,
            };
        },
        [
            withContent.toString("base64"),
            withoutContent.toString("base64"),
            clip.width,
            clip.height,
        ],
    );
    console.log(`LEAK ${engName} terminalVeilOpacity=${veil}`, JSON.stringify(diff));
    await ctx.close();

    // ── (2) PRM: shipped scrub, then the naive cure simulated ──────────────
    const ctx2 = await b.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        reducedMotion: "reduce",
    });
    const p2 = await ctx2.newPage();
    await settle(p2);
    const pane2 = p2.locator(".pane-scroll-fade").first();
    await pane2.screenshot({ path: `${OUT}/${engName}-prm-REST.png` });
    await scrollFull(p2);
    await p2.waitForTimeout(900);
    await pane2.screenshot({ path: `${OUT}/${engName}-prm-STUCK-shipped.png` });
    const prmShipped = await p2.evaluate(() => ({
        title: getComputedStyle(document.querySelector(".pane-header-title")).transform,
        veil: getComputedStyle(document.querySelector(".pane-header"), "::before").opacity,
        desc: getComputedStyle(document.querySelector(".pane-header-desc-wrap > p")).opacity,
    }));
    // simulate the proposed cure: all three declarations wrapped in no-preference
    await p2.addStyleTag({
        content: `.pane-header::before, .pane-header-title, .pane-header-desc-wrap > p {
            animation: none !important; animation-timeline: auto !important; }`,
    });
    await p2.waitForTimeout(500);
    await pane2.screenshot({ path: `${OUT}/${engName}-prm-STUCK-naive-cure.png` });
    const prmCured = await p2.evaluate(() => ({
        title: getComputedStyle(document.querySelector(".pane-header-title")).transform,
        veil: getComputedStyle(document.querySelector(".pane-header"), "::before").opacity,
        desc: getComputedStyle(document.querySelector(".pane-header-desc-wrap > p")).opacity,
    }));
    console.log(
        `PRM ${engName} shipped=${JSON.stringify(prmShipped)} naiveCure=${JSON.stringify(prmCured)}`,
    );
    await ctx2.close();
    await b.close();
}

// ── (3) forced-colors (Chromium only) ──────────────────────────────────────
{
    const b = await chromium.launch();
    for (const scheme of ["light", "dark"]) {
        const ctx = await b.newContext({
            viewport: { width: 1440, height: 900 },
            colorScheme: scheme,
            forcedColors: "active",
        });
        const page = await ctx.newPage();
        await settle(page);
        const pane = page.locator(".pane-scroll-fade").first();
        await pane.screenshot({ path: `${OUT}/chromium-forcedcolors-${scheme}-REST.png` });
        const fc = await page.evaluate(() => {
            const h = document.querySelector(".pane-header");
            const before = getComputedStyle(h, "::before");
            const p = document.querySelector(".pane-header-desc-wrap > p");
            return {
                mqActive: matchMedia("(forced-colors: active)").matches,
                veilBg: before.backgroundColor,
                veilFilter: before.backdropFilter,
                veilOpacity: before.opacity,
                titleColor: getComputedStyle(document.querySelector(".pane-header-title")).color,
                descColor: getComputedStyle(p).color,
                forcedAdjust: getComputedStyle(h).forcedColorAdjust,
            };
        });
        console.log(`FORCED-COLORS ${scheme}`, JSON.stringify(fc));
        await scrollFull(page);
        await page.waitForTimeout(800);
        await pane.screenshot({ path: `${OUT}/chromium-forcedcolors-${scheme}-STUCK.png` });
        await ctx.close();
    }
    await b.close();
}
console.log("done ->", OUT);
