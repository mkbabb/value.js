// CHALLENGE-D (design) · Markdown.vue — live read-only probe, second pass.
// node docs/tranches/V/megatranche/audit/components/Markdown/probe-D.mjs
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });

const out = {};
const DUMP = resolve(HERE, "probe-D.json");
process.on("exit", () => { try { writeFileSync(DUMP, JSON.stringify(out, null, 2)); } catch {} });
process.on("uncaughtException", (e) => { out.__crash = String(e).slice(0, 300); process.exit(1); });

function px(v) {
    return Math.round(v * 10) / 10;
}

async function ready(page) {
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".markdown-body", { timeout: 60000 });
    await page.waitForTimeout(2500);
}

// ── 1. desktop light: type roles vs glass-ui role tokens, measure, code species
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await ready(page);

    out.roleTokens = await page.evaluate(() => {
        const probe = document.createElement("div");
        document.body.appendChild(probe);
        const roles = {};
        for (const cls of [
            "text-display",
            "text-title",
            "text-heading",
            "text-prose",
            "text-small",
            "text-mono-small",
        ]) {
            probe.className = cls;
            const cs = getComputedStyle(probe);
            roles[cls] = {
                fontFamily: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
                fontSize: cs.fontSize,
                lineHeight: cs.lineHeight,
                fontWeight: cs.fontWeight,
            };
        }
        probe.remove();
        return roles;
    });

    out.desktopLight = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const wrap = document.querySelector(".markdown-wrapper");
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const shot = (el) => {
            if (!el) return null;
            const c = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                fontFamily: c.fontFamily.split(",")[0].replace(/["']/g, ""),
                fontSize: c.fontSize,
                lineHeight: c.lineHeight,
                fontWeight: c.fontWeight,
                color: c.color,
                bg: c.backgroundColor,
                marginTop: c.marginTop,
                marginBottom: c.marginBottom,
                paddingLeft: c.paddingLeft,
                width: Math.round(r.width * 10) / 10,
                contentVisibility: c.contentVisibility,
                containIntrinsicSize: c.containIntrinsicSize,
                transitionProperty: c.transitionProperty,
                transitionDuration: c.transitionDuration,
            };
        };
        // ch measure of the real prose font
        const p = body.querySelector(":scope > p");
        const meas = document.createElement("span");
        meas.textContent = "0".repeat(100);
        meas.style.cssText =
            "position:absolute;visibility:hidden;white-space:pre;font:" +
            getComputedStyle(p).font;
        document.body.appendChild(meas);
        const chPx = meas.getBoundingClientRect().width / 100;
        meas.remove();

        // inline code species
        const species = {};
        for (const c of body.querySelectorAll("code")) {
            const key = c.parentElement.tagName + ">code";
            if (!species[key]) {
                const s = getComputedStyle(c);
                species[key] = {
                    n: 0,
                    color: s.color,
                    bg: s.backgroundColor,
                    paddingLeft: s.paddingLeft,
                    paddingTop: s.paddingTop,
                    fontSize: s.fontSize,
                    borderRadius: s.borderRadius,
                };
            }
            species[key].n++;
        }

        // headings in document order
        const heads = [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => {
            const s = getComputedStyle(h);
            return {
                tag: h.tagName,
                text: h.textContent.trim().slice(0, 34),
                fontSize: s.fontSize,
                color: s.color,
                marginTop: s.marginTop,
                marginBottom: s.marginBottom,
                family: s.fontFamily.split(",")[0].replace(/["']/g, ""),
            };
        });

        // direct-child vs nested reach
        const nestedP = [...body.querySelectorAll("p")].filter(
            (x) => x.parentElement !== body,
        );
        const nestedH = [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(
            (x) => x.parentElement !== body,
        );

        // hr
        const hrs = [...body.querySelectorAll("hr")].map((h) => {
            const s = getComputedStyle(h);
            return {
                opacity: s.opacity,
                borderTopColor: s.borderTopColor,
                borderTopWidth: s.borderTopWidth,
                marginTop: s.marginTop,
            };
        });

        // content-visibility census + the scrollbar lie
        const kids = [...body.children];
        const cv = kids.filter(
            (k) => getComputedStyle(k).contentVisibility === "auto",
        );
        const scroller = document.querySelector(".about-card");
        const before = scroller ? scroller.scrollHeight : null;

        return {
            wrapperStyleAttr: wrap.getAttribute("style"),
            bodyMaxInlineSize: cs(body).maxInlineSize,
            bodyWidthPx: Math.round(body.getBoundingClientRect().width * 10) / 10,
            chPx: Math.round(chPx * 1000) / 1000,
            bodyCh: Math.round((body.getBoundingClientRect().width / chPx) * 10) / 10,
            cardWidthPx: scroller
                ? Math.round(scroller.getBoundingClientRect().width * 10) / 10
                : null,
            p: shot(body.querySelector(":scope > p")),
            h2: shot(body.querySelector(":scope > h2")),
            h3: shot(body.querySelector(":scope > h3")),
            li: shot(body.querySelector("li")),
            code: shot(body.querySelector("code")),
            mark: shot(body.querySelector("mark.cs-name")),
            a: shot(body.querySelector("a")),
            headings: heads,
            nestedPCount: nestedP.length,
            nestedHCount: nestedH.length,
            hrs,
            directChildren: kids.length,
            cvAuto: cv.length,
            species,
            scrollHeightBefore: before,
            markCount: body.querySelectorAll("mark.cs-name").length,
            docLandmarks: {
                h1OnPage: document.querySelectorAll("h1").length,
                mainOnPage: document.querySelectorAll("main").length,
            },
        };
    });

    // scrollbar-truth: scroll the About card to the bottom in steps, re-read scrollHeight
    out.scrollTruth = await page.evaluate(async () => {
        const sc = document.querySelector(".about-card");
        if (!sc) return null;
        const samples = [{ top: sc.scrollTop, scrollHeight: sc.scrollHeight }];
        for (let i = 0; i < 12; i++) {
            sc.scrollTop = sc.scrollTop + sc.clientHeight * 0.9;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            samples.push({
                top: Math.round(sc.scrollTop),
                scrollHeight: sc.scrollHeight,
            });
        }
        sc.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 400));
        samples.push({ top: sc.scrollTop, scrollHeight: sc.scrollHeight, note: "back-to-top" });
        return samples;
    });

    // wide-viewport measure sweep
    out.measureSweep = [];
    for (const w of [1440, 1920, 2560, 3440]) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.waitForTimeout(600);
        out.measureSweep.push(
            await page.evaluate((vw) => {
                const body = document.querySelector(".markdown-body");
                const p = body.querySelector(":scope > p");
                const meas = document.createElement("span");
                meas.textContent = "0".repeat(100);
                meas.style.cssText =
                    "position:absolute;visibility:hidden;white-space:pre;font:" +
                    getComputedStyle(p).font;
                document.body.appendChild(meas);
                const chPx = meas.getBoundingClientRect().width / 100;
                meas.remove();
                const card = document.querySelector(".about-card");
                return {
                    vw,
                    bodyPx: Math.round(body.getBoundingClientRect().width * 10) / 10,
                    cardPx: card ? Math.round(card.getBoundingClientRect().width * 10) / 10 : null,
                    ch: Math.round((body.getBoundingClientRect().width / chPx) * 10) / 10,
                };
            }, w),
        );
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    await page
        .locator(".markdown-body")
        .screenshot({ path: resolve(OUT, "D-desktop-light-body.png") })
        .catch(() => {});
    await browser.close();
}

// ── 2. desktop dark: ink deltas on the real plate
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "dark",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await ready(page);
    out.desktopDark = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const g = (sel) => {
            const el = body.querySelector(sel);
            return el ? getComputedStyle(el) : null;
        };
        const rgb = (s) => s;
        const plate = (() => {
            let el = body.parentElement;
            while (el) {
                const bg = getComputedStyle(el).backgroundColor;
                if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent")
                    return { sel: el.className.toString().slice(0, 40), bg };
                el = el.parentElement;
            }
            return null;
        })();
        return {
            plate,
            h2: rgb(g(":scope > h2")?.color),
            h3: rgb(g(":scope > h3")?.color),
            p: rgb(g(":scope > p")?.color),
            codeColor: rgb(g("code")?.color),
            codeBg: rgb(g("code")?.backgroundColor),
            markColor: rgb(g("mark.cs-name")?.color),
            hrColor: rgb(g("hr")?.borderTopColor),
            hrOpacity: g("hr")?.opacity,
            wrapperStyleAttr: document
                .querySelector(".markdown-wrapper")
                .getAttribute("style"),
        };
    });
    await page
        .locator(".markdown-body")
        .screenshot({ path: resolve(OUT, "D-desktop-dark-body.png") })
        .catch(() => {});
    await browser.close();
}

// ── 3. mobile: About pane + katex overflow + tap/measure
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        ...devices["iPhone 14"],
        colorScheme: "light",
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3500);
    let found = await page.locator(".markdown-body").count();
    out.mobile = { reachedWithoutInteraction: !!found, steps: [] };
    if (!found) {
        // hunt for the pane toggle
        const cands = await page.locator("button,[role=tab]").all();
        for (const c of cands) {
            const name = ((await c.getAttribute("aria-label")) || (await c.textContent()) || "")
                .trim()
                .slice(0, 40);
            out.mobile.steps.push(name);
        }
        // the pane sequence is horizontal — try swiping the pane stage
        for (const label of ["About", "about"]) {
            const b = page.getByRole("button", { name: label });
            if (await b.count()) {
                await b.first().click();
                await page.waitForTimeout(1500);
                break;
            }
        }
        found = await page.locator(".markdown-body").count();
        out.mobile.reachedAfterClick = !!found;
    }
    if (found) {
        await page.waitForTimeout(1500);
        out.mobile.measure = await page.evaluate(() => {
            const body = document.querySelector(".markdown-body");
            const p = body.querySelector(":scope > p");
            const meas = document.createElement("span");
            meas.textContent = "0".repeat(100);
            meas.style.cssText =
                "position:absolute;visibility:hidden;white-space:pre;font:" +
                getComputedStyle(p).font;
            document.body.appendChild(meas);
            const chPx = meas.getBoundingClientRect().width / 100;
            meas.remove();
            const card = document.querySelector(".about-card");
            const cardR = card ? card.getBoundingClientRect() : null;

            // katex display blocks
            const kd = [...body.querySelectorAll(".katex-display")].map((k) => {
                const outer = k.closest("div.inline-block") || k.parentElement;
                const ko = getComputedStyle(outer);
                const inner = k.querySelector(".katex") || k;
                const ir = inner.getBoundingClientRect();
                return {
                    outerOverflowX: ko.overflowX,
                    outerScrollW: outer.scrollWidth,
                    outerClientW: outer.clientWidth,
                    innerScrollW: inner.scrollWidth,
                    innerClientW: inner.clientWidth,
                    innerRight: Math.round(ir.right * 10) / 10,
                    cardRight: cardR ? Math.round(cardR.right * 10) / 10 : null,
                    clippedPx: cardR ? Math.round((ir.right - cardR.right) * 10) / 10 : null,
                    text: (inner.textContent || "").trim().slice(0, 40),
                };
            });

            // any element whose ink escapes the card's clip box
            const escapees = [];
            for (const el of body.querySelectorAll("*")) {
                const r = el.getBoundingClientRect();
                if (cardR && r.width > 0 && r.right > cardR.right + 1) {
                    escapees.push({
                        tag: el.tagName,
                        cls: el.className.toString().slice(0, 30),
                        right: Math.round(r.right),
                        over: Math.round(r.right - cardR.right),
                    });
                }
            }
            return {
                bodyPx: Math.round(body.getBoundingClientRect().width * 10) / 10,
                chPx: Math.round(chPx * 1000) / 1000,
                bodyCh: Math.round((body.getBoundingClientRect().width / chPx) * 10) / 10,
                cardOverflowX: card ? getComputedStyle(card).overflowX : null,
                cardRight: cardR ? Math.round(cardR.right * 10) / 10 : null,
                katexDisplay: kd,
                escapees: escapees.slice(0, 12),
                escapeeCount: escapees.length,
                codeFontSize: getComputedStyle(body.querySelector("code")).fontSize,
                pFontSize: getComputedStyle(p).fontSize,
            };
        });
        await page.screenshot({ path: resolve(OUT, "D-mobile-about.png") });
    }
    await browser.close();
}

// ── 4. reduced motion + forced colors + 200% zoom
{
    const browser = await webkit.launch();
    for (const [key, opts] of [
        ["reduce", { reducedMotion: "reduce", colorScheme: "light" }],
        ["forced", { forcedColors: "active", colorScheme: "light" }],
    ]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 2,
            ...opts,
        });
        const page = await ctx.newPage();
        try {
            await ready(page);
            out[key] = await page.evaluate(() => {
                const body = document.querySelector(".markdown-body");
                const g = (s) => {
                    const el = body.querySelector(s);
                    if (!el) return null;
                    const c = getComputedStyle(el);
                    return {
                        color: c.color,
                        bg: c.backgroundColor,
                        borderTopColor: c.borderTopColor,
                        borderLeftColor: c.borderLeftColor,
                        opacity: c.opacity,
                        fontWeight: c.fontWeight,
                        transitionProperty: c.transitionProperty,
                        transitionDuration: c.transitionDuration,
                    };
                };
                const sk = document.querySelector('[class*="skeleton" i]');
                return {
                    h2: g(":scope > h2"),
                    p: g(":scope > p"),
                    code: g("code"),
                    mark: g("mark.cs-name"),
                    hr: g("hr"),
                    pre: g("pre"),
                    forcedActive: matchMedia("(forced-colors: active)").matches,
                    reduceActive: matchMedia("(prefers-reduced-motion: reduce)").matches,
                    skeletonPresent: !!sk,
                };
            });
            await page
                .locator(".markdown-body")
                .screenshot({ path: resolve(OUT, `D-${key}-body.png`) })
                .catch(() => {});
        } catch (e) {
            out[key] = { error: String(e).slice(0, 200) };
        }
        await page.close();
        await ctx.close();
    }

    // 200% zoom == half viewport at dsf 2 is NOT the same; use real zoom
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: "light",
    });
    const page = await ctx.newPage();
    await ready(page);
    await page.evaluate(() => {
        document.documentElement.style.zoom = "2";
    });
    await page.waitForTimeout(1200);
    out.zoom200 = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const card = document.querySelector(".about-card");
        const p = body.querySelector(":scope > p");
        const meas = document.createElement("span");
        meas.textContent = "0".repeat(100);
        meas.style.cssText =
            "position:absolute;visibility:hidden;white-space:pre;font:" +
            getComputedStyle(p).font;
        document.body.appendChild(meas);
        const chPx = meas.getBoundingClientRect().width / 100;
        meas.remove();
        const cardR = card.getBoundingClientRect();
        let over = 0;
        for (const el of body.querySelectorAll("*")) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.right > cardR.right + 1)
                over = Math.max(over, Math.round(r.right - cardR.right));
        }
        return {
            bodyPx: Math.round(body.getBoundingClientRect().width * 10) / 10,
            ch: Math.round((body.getBoundingClientRect().width / chPx) * 10) / 10,
            h2Size: getComputedStyle(body.querySelector(":scope > h2")).fontSize,
            codeSize: getComputedStyle(body.querySelector("code")).fontSize,
            docOverflowX:
                document.documentElement.scrollWidth - document.documentElement.clientWidth,
            worstCardOverflowPx: over,
        };
    });
    await page.screenshot({ path: resolve(OUT, "D-zoom200.png") });
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-D.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
