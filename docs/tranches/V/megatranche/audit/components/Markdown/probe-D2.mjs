// CHALLENGE-D (design) · Markdown.vue — states probe: loading / failure / rhythm.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });
const out = {};
const DUMP = resolve(HERE, "probe-D2.json");
process.on("exit", () => {
    try {
        writeFileSync(DUMP, JSON.stringify(out, null, 2));
    } catch {}
});

// ── A. rhythm/ladder + sibling-h2 near-miss + divider census (desktop light)
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".markdown-body", { timeout: 60000 });
    await page.waitForTimeout(2500);

    out.rhythm = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const phi = {};
        for (let i = 0; i <= 5; i++) phi["--phi-" + i] = root.getPropertyValue("--phi-" + i).trim();
        const card = document.querySelector(".about-card");
        const paneH2 = [...card.querySelectorAll("h2")].filter(
            (h) => !h.closest(".markdown-body"),
        );
        const mdH2 = [...card.querySelectorAll(".markdown-body h2")];
        const sep = [
            ...card.querySelectorAll(
                '[data-slot="separator"],[role="separator"],hr,[data-orientation="horizontal"]',
            ),
        ];
        const shot = (el) => {
            const c = getComputedStyle(el);
            return {
                tag: el.tagName,
                text: el.textContent.trim().slice(0, 24),
                fontSize: c.fontSize,
                lineHeight: c.lineHeight,
                fontWeight: c.fontWeight,
                family: c.fontFamily.split(",")[0].replace(/["']/g, ""),
                color: c.color,
            };
        };
        // katex display outer box padding + widest scroller
        const kd = [...document.querySelectorAll(".markdown-body div.inline-block")]
            .filter((d) => d.querySelector(":scope > .katex-display"))
            .map((d) => {
                const c = getComputedStyle(d);
                return {
                    padding: `${c.paddingTop} ${c.paddingRight} ${c.paddingBottom} ${c.paddingLeft}`,
                    overflowX: c.overflowX,
                    scrollW: d.scrollWidth,
                    clientW: d.clientWidth,
                    overflowPx: d.scrollWidth - d.clientWidth,
                };
            });
        // visible (non-mathml) escapees past the card clip edge
        const cardR = card.getBoundingClientRect();
        const vis = [];
        for (const el of document.querySelectorAll(".markdown-body *")) {
            if (el.closest(".katex-mathml")) continue;
            const c = getComputedStyle(el);
            if (c.visibility === "hidden" || c.display === "none") continue;
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.right > cardR.right + 1)
                vis.push({ tag: el.tagName, over: Math.round(r.right - cardR.right) });
        }
        return {
            phi,
            paneH2: paneH2.map(shot),
            mdH2First: mdH2.length ? shot(mdH2[0]) : null,
            separatorCount: sep.length,
            separators: sep.map((s) => ({
                tag: s.tagName,
                cls: s.className.toString().slice(0, 40),
                inMarkdown: !!s.closest(".markdown-body"),
            })),
            katexDisplayBoxes: kd,
            visibleEscapees: vis.slice(0, 10),
            visibleEscapeeCount: vis.length,
        };
    });

    // nested <p> identity — which parents lose the phi rhythm
    out.nestedP = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        return [...body.querySelectorAll("p")]
            .filter((p) => p.parentElement !== body)
            .map((p) => ({
                parent: p.parentElement.tagName + "." + p.parentElement.className.toString().slice(0, 24),
                marginBottom: getComputedStyle(p).marginBottom,
                text: p.textContent.trim().slice(0, 40),
            }));
    });

    // live-drag color-transition lag: change the picked color and sample h2 color over time
    out.dragLag = await page.evaluate(async () => {
        const h2 = document.querySelector(".markdown-body h2");
        const before = getComputedStyle(h2).color;
        const wrap = document.querySelector(".markdown-wrapper");
        // simulate the accent var flipping the way a slider drag does
        wrap.style.setProperty("--md-color-h2", "oklch(0.30 0.20 250deg)");
        const samples = [];
        const t0 = performance.now();
        for (let i = 0; i < 10; i++) {
            await new Promise((r) => setTimeout(r, 60));
            samples.push({
                t: Math.round(performance.now() - t0),
                color: getComputedStyle(h2).color,
            });
        }
        return { before, samples, transition: getComputedStyle(h2).transition };
    });
    await browser.close();
}

// ── B. the failure state: block the doc chunk, observe what the user sees
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e.message).slice(0, 160)));
    page.on("console", (c) => {
        if (c.type() === "error") errs.push("CONSOLE " + c.text().slice(0, 160));
    });
    // abort every request for a color-space doc chunk
    await page.route("**/*", (route) => {
        const u = route.request().url();
        if (/assets\/docs\/.*\.md/.test(u)) return route.abort();
        return route.continue();
    });
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(9000);
    out.failureState = await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const sk = card ? card.querySelectorAll('[data-slot="skeleton"],[class*="skeleton" i]') : [];
        const alert = card ? card.querySelector('[role="alert"],[data-slot="alert"]') : null;
        const skShots = [...sk].map((s) => {
            const r = s.getBoundingClientRect();
            const c = getComputedStyle(s);
            return {
                w: Math.round(r.width),
                h: Math.round(r.height),
                animationName: c.animationName,
                animationDuration: c.animationDuration,
                animationIterationCount: c.animationIterationCount,
                borderRadius: c.borderRadius,
            };
        });
        return {
            markdownBodyPresent: !!document.querySelector(".markdown-body"),
            skeletonCount: sk.length,
            skeletons: skShots,
            alertPresent: !!alert,
            alertText: alert ? alert.textContent.trim().slice(0, 80) : null,
            cardTailText: card ? card.textContent.trim().slice(-160) : null,
        };
    });
    out.failureErrors = errs.slice(0, 10);
    await page.screenshot({ path: resolve(OUT, "D-failure-state.png"), fullPage: false });
    const card = page.locator(".about-card");
    if (await card.count())
        await card.screenshot({ path: resolve(OUT, "D-failure-card.png") }).catch(() => {});
    await browser.close();
}

// ── C. loading→content layout shift (slow the doc chunk instead of aborting)
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.route("**/*", async (route) => {
        const u = route.request().url();
        if (/assets\/docs\/.*\.md/.test(u)) {
            await new Promise((r) => setTimeout(r, 6000));
        }
        return route.continue();
    });
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);
    out.loadingGeometry = await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const sk = card ? [...card.querySelectorAll('[data-slot="skeleton"],[class*="skeleton" i]')] : [];
        const host = sk.length ? sk[0].closest("div").parentElement : null;
        const r = host ? host.getBoundingClientRect() : null;
        return {
            skeletonCount: sk.length,
            skeletonHostHeight: r ? Math.round(r.height) : null,
            skeletonRects: sk.map((s) => {
                const b = s.getBoundingClientRect();
                return { w: Math.round(b.width), h: Math.round(b.height) };
            }),
            cardScrollHeight: card ? card.scrollHeight : null,
        };
    });
    await page
        .locator(".about-card")
        .screenshot({ path: resolve(OUT, "D-loading-card.png") })
        .catch(() => {});
    await page.waitForSelector(".markdown-body", { timeout: 60000 });
    await page.waitForTimeout(2000);
    out.loadedGeometry = await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const body = document.querySelector(".markdown-body");
        return {
            bodyHeight: Math.round(body.getBoundingClientRect().height),
            cardScrollHeight: card.scrollHeight,
        };
    });
    await browser.close();
}

console.log(JSON.stringify(out, null, 2));
