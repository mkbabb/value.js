// CHALLENGE-D · Markdown.vue — live read-only design probe.
// node docs/tranches/V/megatranche/audit/components/Markdown/probe-md.mjs
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });

const MATRIX = [
    { name: "desktop-light", viewport: { width: 1440, height: 900 }, scheme: "light", device: null },
    { name: "desktop-dark", viewport: { width: 1440, height: 900 }, scheme: "dark", device: null },
    { name: "mobile-light", viewport: null, scheme: "light", device: "iPhone 14" },
];

const results = [];

for (const m of MATRIX) {
    const browser = await webkit.launch();
    const ctxOpts = {
        colorScheme: m.scheme,
        ...(m.device ? devices[m.device] : { viewport: m.viewport, deviceScaleFactor: 2 }),
    };
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (c) => c.type() === "error" && consoleErrors.push(c.text()));
    page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

    await page.goto(ORIGIN + "/#/", { waitUntil: "networkidle" });
    await page.waitForTimeout(4000);

    // Mobile: the About pane is pane-index 1 — flip to it if the markdown is absent.
    let has = await page.locator(".markdown-body").count();
    if (!has) {
        // try the mobile pane toggle
        const toggles = await page.locator("button").all();
        for (const t of toggles) {
            const label = ((await t.getAttribute("aria-label")) ?? "") + " " + ((await t.textContent()) ?? "");
            if (/about/i.test(label)) {
                await t.click();
                await page.waitForTimeout(2500);
                break;
            }
        }
        has = await page.locator(".markdown-body").count();
    }

    const measure = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        if (!body) return { found: false };
        const wrapper = document.querySelector(".markdown-wrapper");
        const card = body.closest(".about-card") || body.closest('[class*="card"]');
        const cs = getComputedStyle(body);

        // ch width of the prose measure
        const probe = document.createElement("span");
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
        probe.style.font = cs.font;
        probe.textContent = "0";
        body.appendChild(probe);
        const chPx = probe.getBoundingClientRect().width;
        probe.remove();

        const roles = {};
        for (const sel of ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "code", "pre", "th", "blockquote", "hr", ".toc"]) {
            const el = body.querySelector(":scope > " + sel) || body.querySelector(sel);
            if (!el) { roles[sel] = null; continue; }
            const s = getComputedStyle(el);
            roles[sel] = {
                fontFamily: s.fontFamily.split(",")[0].replace(/["']/g, ""),
                fontSize: s.fontSize,
                lineHeight: s.lineHeight,
                fontWeight: s.fontWeight,
                color: s.color,
                marginTop: s.marginTop,
                marginBottom: s.marginBottom,
                width: Math.round(el.getBoundingClientRect().width),
                contentVisibility: s.contentVisibility,
                containIntrinsicSize: s.containIntrinsicSize,
                transition: s.transition,
            };
        }

        // content-visibility census across direct children
        const kids = [...body.children];
        const cvKids = kids.filter((k) => getComputedStyle(k).contentVisibility === "auto");
        const cvHidden = cvKids.filter((k) => {
            const r = k.getBoundingClientRect();
            return r.height > 0 && Math.abs(r.height - 200) < 1;
        });

        // heading census: which levels exist, and do consecutive-heading rules apply
        const headingCensus = kids
            .filter((k) => /^H[1-6]$/.test(k.tagName))
            .map((k) => ({ tag: k.tagName, text: (k.textContent || "").slice(0, 40), fontSize: getComputedStyle(k).fontSize, color: getComputedStyle(k).color }));

        // longest rendered prose line in ch
        const paras = [...body.querySelectorAll(":scope > p")];
        const widest = paras.reduce((a, p) => Math.max(a, p.getBoundingClientRect().width), 0);

        // marks
        const marks = body.querySelectorAll("mark.cs-name");
        const markStyle = marks[0] ? (() => { const s = getComputedStyle(marks[0]); return { color: s.color, background: s.backgroundColor, weight: s.fontWeight }; })() : null;

        return {
            found: true,
            wrapperVars: {
                h2: wrapper ? getComputedStyle(wrapper).getPropertyValue("--md-color-h2").trim() : null,
                h3: wrapper ? getComputedStyle(wrapper).getPropertyValue("--md-color-h3").trim() : null,
                accent: wrapper ? getComputedStyle(wrapper).getPropertyValue("--md-color-accent").trim() : null,
            },
            bodyMaxWidth: cs.maxWidth,
            bodyMaxInlineSize: cs.maxInlineSize,
            bodyWidthPx: Math.round(body.getBoundingClientRect().width),
            chPx: +chPx.toFixed(3),
            bodyWidthCh: +(body.getBoundingClientRect().width / chPx).toFixed(1),
            widestParaCh: +(widest / chPx).toFixed(1),
            cardWidthPx: card ? Math.round(card.getBoundingClientRect().width) : null,
            directChildren: kids.length,
            cvAutoChildren: cvKids.length,
            cvStuckAt200: cvHidden.length,
            scrollHeight: body.scrollHeight,
            roles,
            headingCensus,
            markCount: marks.length,
            markStyle,
            tocPresent: !!body.querySelector(".toc"),
            calloutPresent: !!body.querySelector(".callout"),
            taskListPresent: !!body.querySelector("ul.contains-task-list"),
            footnotesPresent: !!body.querySelector(".footnotes"),
            dlPresent: !!body.querySelector("dl"),
            tablePresent: !!body.querySelector("table"),
            imgPresent: !!body.querySelector("img"),
            blockquotePresent: !!body.querySelector("blockquote"),
            katexDisplay: body.querySelectorAll("div.inline-block:has(> .katex-display)").length,
            preCount: body.querySelectorAll("pre").length,
            hrCount: body.querySelectorAll("hr").length,
            anchorIds: [...body.querySelectorAll("[id]")].length,
        };
    });

    // scroll-height instability from content-visibility: measure before/after a full scroll
    const instability = await page.evaluate(async () => {
        const body = document.querySelector(".markdown-body");
        if (!body) return null;
        const scroller = body.closest(".about-card") || document.scrollingElement;
        const before = scroller.scrollHeight;
        const step = 400;
        for (let y = 0; y < before + 4000; y += step) {
            scroller.scrollTop = y;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        }
        const after = scroller.scrollHeight;
        scroller.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 300));
        return { before, after, deltaPx: after - before, pctChange: +(((after - before) / before) * 100).toFixed(1) };
    });

    // screenshot the markdown region
    if (has) {
        const el = page.locator(".markdown-wrapper").first();
        await el.scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(800);
        await page.screenshot({ path: resolve(OUT, `${m.name}-viewport.png`) });
        await el.screenshot({ path: resolve(OUT, `${m.name}-markdown.png`) }).catch(() => {});
    }

    results.push({ matrix: m.name, consoleErrors, measure, instability });
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-md.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
