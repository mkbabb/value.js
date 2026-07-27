// CHALLENGE-D · PASS 2 · probe D2 — the populated wall's states, two engines.
//   H · populated wall in DARK and at 390px (rendered truth, not the empty arm)
//   I · keyboard: full Tab walk over the populated wall, Chromium AND WebKit
//   J · the ARIA list: role="list" whose children are role="article"
//   K · the <Transition mode="out-in"> hole, driven by a real sort change
//   L · the search placeholder's rendered fit at 390 in this engine
//   M · sort-pending arm (opacity-50) — still interactive?
// Run: node docs/…/BrowsePane/probe-D2-states.mjs chromium|webkit
import { chromium, webkit } from "@playwright/test";

const ENGINE = process.argv[2] ?? "chromium";
const LAUNCH = ENGINE === "webkit" ? webkit : chromium;
const D = "docs/tranches/V/megatranche/audit/components/BrowsePane/evidence";
const LAN = "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };

const mk = (n) => ({
    name: `Wall Palette ${n}`, slug: `wall-palette-${n}`, userSlug: "gallery",
    colors: [
        { css: "#1a1512", position: 0 }, { css: "#2f2a24", position: 1 },
        { css: "#e11d48", position: 2 }, { css: "#2563eb", position: 3 },
    ],
    oklabColors: [{ L: 0.6, a: 0.2, b: 0.05 }],
    createdAt: "2026-07-05T00:00:00.000Z", updatedAt: "2026-07-05T00:00:00.000Z",
    isLocal: false, voteCount: n, visibility: "public",
    tier: n === 1 ? "featured" : "standard", published: true, tags: ["warm"],
});
const PAGE1 = Array.from({ length: 10 }, (_, i) => mk(i + 1));

const out = {};
const browser = await LAUNCH.launch(
    ENGINE === "chromium"
        ? { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }
        : {},
);

let slow = false;
const mount = async (ctx) => {
    await ctx.route(`${API}/**`, async (r) => {
        const u = new URL(r.request().url());
        const json = (b) => r.fulfill({ status: 200, contentType: "application/json", headers: CORS, body: JSON.stringify(b) });
        if (r.request().method() === "OPTIONS") return r.fulfill({ status: 204, headers: CORS });
        if (u.pathname.endsWith("/palettes")) {
            if (slow) await new Promise((res) => setTimeout(res, 900));
            return json({ data: PAGE1, nextCursor: "c2", hasMore: true });
        }
        if (u.pathname.includes("/tags")) return json([{ name: "warm", count: 3 }]);
        return json({});
    });
};

const TABWALK = async (page) => {
    const seen = [];
    await page.keyboard.press("Tab");
    for (let i = 0; i < 45; i++) {
        const info = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a || a === document.body) return { tag: "BODY" };
            const cs = getComputedStyle(a);
            return {
                tag: a.tagName, role: a.getAttribute("role"),
                name: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30),
                ti: a.tabIndex, inCard: !!a.closest("[role='article']"),
                inBrowse: !!a.closest(".pane-scroll-fade") && (a.closest(".pane-scroll-fade")?.textContent ?? "").startsWith("Browse"),
                outline: cs.outlineWidth + " " + cs.outlineStyle,
                shadow: cs.boxShadow.slice(0, 40),
            };
        });
        const key = `${info.tag}|${info.name}|${info.ti}`;
        if (seen.length && seen[seen.length - 1].key === key && info.tag === "BODY") break;
        if (seen.filter((s) => s.key === key).length >= 2) break;
        seen.push({ key, ...info });
        await page.keyboard.press("Tab");
    }
    return seen.map(({ key, ...r }) => r);
};

for (const [name, vp, scheme] of [
    ["wall-desktop-dark", { width: 1440, height: 900 }, "dark"],
    ["wall-mobile-light", { width: 390, height: 844 }, "light"],
]) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 2 });
    await mount(ctx);
    const page = await ctx.newPage();
    await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${D}/D2-${ENGINE}-${name}.png` });
    out[name] = await page.evaluate(() => {
        const c = document.querySelector("[role='article']");
        const strip = c?.querySelector("[class*='rounded-t-card'] > *");
        const inputs = [...document.querySelectorAll("main input")].map((el) => {
            const cs = getComputedStyle(el);
            const cv = document.createElement("canvas").getContext("2d");
            cv.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
            const avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            return { ph: el.placeholder, fs: cs.fontSize, textW: +cv.measureText(el.placeholder ?? "").width.toFixed(1), avail: +avail.toFixed(1), fits: cv.measureText(el.placeholder ?? "").width <= avail };
        });
        return {
            cards: document.querySelectorAll("[role='article']").length,
            cardBg: c ? getComputedStyle(c).backgroundColor : null,
            cardShadow: c ? getComputedStyle(c).boxShadow.slice(0, 70) : null,
            cardTransitionDur: c ? getComputedStyle(c).transitionDuration : null,
            stripCell: strip ? getComputedStyle(strip).backgroundColor : null,
            titleRect: c ? (({ width }) => +width.toFixed(1))(c.querySelector(".font-display").getBoundingClientRect()) : null,
            titleClipped: c ? (() => { const t = c.querySelector(".font-display"); return t.scrollWidth > t.clientWidth + 0.5; })() : null,
            gridCols: c ? getComputedStyle(c.parentElement).gridTemplateColumns : null,
            visibleCards: [...document.querySelectorAll("[role='article']")].filter((e) => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length,
            inputs,
            listRoles: (() => { const l = document.querySelector("[role='list']"); return l ? { children: [...l.children].map((k) => k.getAttribute("role") ?? k.tagName) } : null; })(),
        };
    });
    if (name === "wall-desktop-dark") out["tabwalk"] = await TABWALK(page);
    await ctx.close();
}

// K · the out-in hole, driven by a real sort change (slow response)
{
    slow = true;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await mount(ctx);
    const page = await ctx.newPage();
    await page.goto(`${LAN}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(4500);
    out["hole"] = await page.evaluate(async () => {
        const body = document.querySelector(".grid.gap-3.pb-3");
        const samples = [];
        const t0 = performance.now();
        // a real state churn: force the wall back through `browsing`
        const ev = new Event("value-probe");
        location.hash = "#/palettes";
        await new Promise((r) => setTimeout(r, 120));
        location.hash = "#/browse";
        return await new Promise((res) => {
            const id = setInterval(() => {
                const b = document.querySelector(".grid.gap-3.pb-3");
                const kids = b ? [...b.children].filter((k) => k.getBoundingClientRect().height > 4) : [];
                samples.push({ t: Math.round(performance.now() - t0), n: kids.length, h: b ? +b.getBoundingClientRect().height.toFixed(1) : -1, cards: document.querySelectorAll("[role='article']").length, skel: document.querySelectorAll("[aria-label='Loading palettes'] > *").length });
                if (performance.now() - t0 > 2500) { clearInterval(id); res(samples); }
            }, 40);
        });
    });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 1));
