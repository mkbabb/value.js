// CHALLENGE-C pass 4 — probe B. READ-ONLY.
// (1) the expand transition's terminal state: does `onAfterEnter` ever run?
// (2) the real swatch selector + hover render fan-out
// (3) the click-to-rename title span's control semantics
// (4) the #/mix nested-interactive content model
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4b-pass4-results.json", import.meta.url).pathname;
const R = {};
const cols = (arr) => arr.map((css, position) => ({ css, position }));
const iso = (ms) => new Date(Date.now() - ms).toISOString();
const FIXTURE = {
    version: 1,
    palettes: [
        {
            id: "p-sunset", name: "Sunset Ridge", slug: "sunset-ridge",
            createdAt: iso(0), updatedAt: iso(0), isLocal: true,
            colors: cols(["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"]),
            tags: ["warm", "test", "alpha"], forkCount: 3, versionCount: 4,
        },
        {
            id: "p-ocean", name: "Deep Ocean", slug: "deep-ocean",
            createdAt: iso(1000), updatedAt: iso(1000), isLocal: true,
            colors: cols(["#03045e", "#0077b6", "#00b4d8"]), tags: ["cool"],
        },
        {
            id: "p-24", name: "Twentyfour", slug: "twentyfour",
            createdAt: iso(3000), updatedAt: iso(3000), isLocal: true,
            colors: cols(Array.from({ length: 24 }, (_, i) => `hsl(${i * 15} 70% 55%)`)),
        },
    ],
};

async function seed(page, hash) {
    await page.goto(`http://localhost:9000/#/${hash}`, { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
}

const patchScroll = (page) => page.evaluate(() => {
    window.__scrollCalls = [];
    const orig = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (arg) {
        window.__scrollCalls.push({ arg: JSON.stringify(arg ?? null), cls: (this.getAttribute?.("class") ?? "").slice(0, 46) });
        return orig.call(this, arg);
    };
});

const panelState = (page, name) => page.evaluate((name) => {
    const card = [...document.querySelectorAll('[role="article"]')].find((c) => (c.getAttribute("aria-label") ?? "").includes(name));
    if (!card) return { ERROR: "card missing" };
    const panel = [...card.querySelectorAll("div")].find((d) => d.className.includes("overflow-hidden") && d.getAttribute("style"));
    const anyPanel = [...card.querySelectorAll("div")].find((d) => d.className.includes("overflow-hidden"));
    const p = panel ?? anyPanel;
    return {
        inlineStyle: p?.getAttribute("style") ?? "",
        clientH: p ? p.clientHeight : null,
        scrollH: p ? p.scrollHeight : null,
        clipped: p ? p.scrollHeight - p.clientHeight : null,
        cardH: +card.getBoundingClientRect().height.toFixed(1),
        scrollCalls: window.__scrollCalls ?? null,
    };
}, name);

const main = async () => {
    const browser = await chromium.launch();

    for (const mode of ["no-prm", "prm"]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 1000 },
            ...(mode === "prm" ? { reducedMotion: "reduce" } : {}),
        });
        const page = await ctx.newPage();
        await seed(page, "palettes");
        await patchScroll(page);
        const card = page.locator('[role="article"]').filter({ hasText: "Twentyfour" }).first();
        await card.click({ position: { x: 300, y: 60 } });
        const samples = {};
        for (const t of [120, 500, 1200, 2500]) {
            await page.waitForTimeout(t === 120 ? 120 : t - Object.keys(samples).reduce((a, k) => Math.max(a, +k), 0));
            samples[t] = await panelState(page, "Twentyfour");
        }
        // resize narrower — if the inline height is frozen, the rewrapped
        // swatch rows are clipped by the panel's own overflow-hidden
        await page.setViewportSize({ width: 620, height: 1000 });
        await page.waitForTimeout(900);
        const afterResize = await panelState(page, "Twentyfour");
        R[`P1_${mode}`] = { prm: mode === "prm", samples, afterResize };
        await ctx.close();
    }

    // ---- P2 · swatch identity + hover fan-out ------------------------------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page, "palettes");
    const card24 = page.locator('[role="article"]').filter({ hasText: "Twentyfour" }).first();
    await card24.click({ position: { x: 300, y: 60 } });
    await page.waitForTimeout(1400);

    R.P2_swatchIdentity = await page.evaluate(() => {
        const card = [...document.querySelectorAll('[role="article"]')].find((c) => (c.getAttribute("aria-label") ?? "").includes("Twentyfour"));
        const panel = card.querySelector(".overflow-hidden");
        const kids = panel ? [...panel.querySelectorAll("*")] : [];
        const dots = kids.filter((e) => /watercolor|dot|swatch/i.test(e.getAttribute("class") ?? ""));
        const byTag = {};
        kids.forEach((e) => { byTag[e.tagName] = (byTag[e.tagName] ?? 0) + 1; });
        const first = dots[0];
        return {
            panelDescendants: kids.length,
            tagHistogram: byTag,
            dotLikeCount: dots.length,
            firstDot: first ? {
                tag: first.tagName,
                cls: (first.getAttribute("class") ?? "").slice(0, 60),
                ariaLabel: first.getAttribute("aria-label"),
                ariaHidden: first.getAttribute("aria-hidden"),
                role: first.getAttribute("role"),
                pointerEvents: getComputedStyle(first).pointerEvents,
                w: +first.getBoundingClientRect().width.toFixed(1),
                h: +first.getBoundingClientRect().height.toFixed(1),
            } : null,
            interactiveInPanel: panel ? panel.querySelectorAll("button, a, input, [tabindex]").length : null,
        };
    });

    R.P2_hoverFanout = await (async () => {
        const ok = await page.evaluate(() => {
            const app = document.querySelector("#app")?.__vue_app__;
            if (!app) return false;
            app.config.performance = true;
            performance.clearMarks(); performance.clearMeasures();
            return true;
        });
        if (!ok) return { ERROR: "no __vue_app__" };
        const sel = '[role="article"]:has-text("Twentyfour") .overflow-hidden';
        const dots = page.locator(`${sel} >> css=[class*=watercolor], ${sel} >> css=[class*=dot]`);
        let n = 0;
        try { n = await dots.count(); } catch { n = 0; }
        const box = await card24.boundingBox();
        // hover three positions along the swatch row via raw mouse moves
        const y = box.y + box.height - 30;
        for (const dx of [40, 100, 160]) {
            await page.mouse.move(box.x + dx, y);
            await page.waitForTimeout(260);
        }
        return await page.evaluate((n) => {
            const ms = performance.getEntriesByType("measure");
            const byName = {};
            ms.forEach((m) => { byName[m.name] = (byName[m.name] ?? 0) + 1; });
            return {
                dotLocatorCount: n,
                totalMeasures: ms.length,
                topMeasures: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 12),
            };
        }, n);
    })();

    // ---- P3 · the click-to-rename title control ----------------------------
    R.P3_titleControl = await page.evaluate(() => {
        const card = document.querySelector('[role="article"]');
        const title = [...card.querySelectorAll("span")].find((s) => /cursor-text/.test(s.getAttribute("class") ?? ""));
        if (!title) return { present: false };
        return {
            present: true, tag: title.tagName, role: title.getAttribute("role"),
            tabIndex: title.tabIndex, ariaLabel: title.getAttribute("aria-label"),
            text: title.textContent.trim().slice(0, 24),
            cls: (title.getAttribute("class") ?? "").slice(0, 70),
        };
    });

    // ---- P4 · #/mix nested interactive content ------------------------------
    await seed(page, "mix");
    R.P4_mix = await page.evaluate(() => {
        const outer = [...document.querySelectorAll("button")].filter((b) => b.querySelector('[role="article"]'));
        return {
            mainText: (document.querySelector("main")?.textContent ?? "").replace(/\s+/g, " ").slice(0, 220),
            articles: document.querySelectorAll('[role="article"]').length,
            outerButtonsWrappingCards: outer.length,
            nestedButtonInButton: document.querySelectorAll("button button").length,
            sample: outer.slice(0, 2).map((b) => ({
                outerLabel: b.getAttribute("aria-label"),
                inner: [...b.querySelectorAll("button, a[href], input, [tabindex]")].map((e) => e.getAttribute("aria-label") ?? e.tagName),
            })),
        };
    });

    await ctx.close();
    await browser.close();
    writeFileSync(OUT, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
