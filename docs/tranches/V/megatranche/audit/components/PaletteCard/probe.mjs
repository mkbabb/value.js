// PaletteCard CHALLENGE-D probe — isolated WebKit instance (the shared MCP
// browser is contested by parallel audit seats).
import { webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { writeFileSync } from "node:fs";

const OUT = new URL("./shots/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const now = "2026-07-24T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug,
    colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const STORE = { version: 1, palettes: [
    mk("Sunset", "sunset", ["#ff6b6b", "#f7b267", "#f79d65", "#f4845f", "#f27059"]),
    mk("A very long palette name that will absolutely not fit on one line inside this card body row",
       "longname", ["#264653", "#2a9d8f", "#e9c46a"],
       { tags: ["warm", "earthy", "autumn", "fourth"], forkCount: 3, versionCount: 4, forkOf: "other-slug" }),
    mk("Featured One", "featured-one",
       ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226","#333333","#777777"],
       { tier: "featured" }),
    mk("Single", "single", ["#8ecae6"]),
    mk("Empty", "empty", []),
] };

const results = {};

async function scene({ name, viewport, colorScheme, dir = "ltr", reducedMotion = "no-preference", forcedColors = "none", zoom = 1, measure }) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({
        viewport, colorScheme, reducedMotion, forcedColors,
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.addInitScript(([store, d, z]) => {
        localStorage.setItem("color-palettes", JSON.stringify(store));
        localStorage.setItem("value-color-mode/v1", JSON.stringify("light"));
        document.addEventListener("DOMContentLoaded", () => {
            document.documentElement.setAttribute("dir", d);
            if (z !== 1) document.documentElement.style.zoom = String(z);
        });
    }, [STORE, dir, zoom]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    // expand the first card so the swatch tray + slug row render
    const out = measure ? await page.evaluate(measure) : null;
    await page.screenshot({ path: OUT + name + ".png", fullPage: true });
    results[name] = { out, errors };
    await browser.close();
}

const MEASURE = () => {
    const px = (v) => Math.round(parseFloat(v) * 100) / 100;
    const cards = [...document.querySelectorAll('[role="article"]')];
    const root = cards[0];
    if (!root) return { cards: 0, bodyText: document.body.innerText.slice(0, 400) };
    const cs = getComputedStyle(root);
    const metaRow = root.querySelector(".px-3.py-2\\.5") || root.children[2]?.querySelector("div");
    const title = root.querySelector("span.font-display");
    const tcs = title ? getComputedStyle(title) : null;
    const rootStyles = {
        tag: root.tagName, role: root.getAttribute("role"),
        cursor: cs.cursor, borderWidth: cs.borderWidth, boxShadow: cs.boxShadow,
        borderRadius: cs.borderRadius, background: cs.backgroundColor,
        tabIndex: root.tabIndex, hasInert: root.hasAttribute("inert"),
        classes: root.className,
    };
    // padding of the metadata row (the "C" ladder anchor)
    const rows = [...root.querySelectorAll("div")].slice(0, 6).map((d) => {
        const c = getComputedStyle(d);
        return { cls: d.className.slice(0, 60), padT: px(c.paddingTop), padR: px(c.paddingRight), padB: px(c.paddingBottom), padL: px(c.paddingLeft) };
    });
    const spacing = getComputedStyle(document.documentElement).getPropertyValue("--spacing");
    // interactive descendants inside the card
    const interactive = [...root.querySelectorAll('button,a,input,[tabindex]:not([tabindex="-1"])')].map((el) => {
        const r = el.getBoundingClientRect();
        return {
            tag: el.tagName, name: (el.getAttribute("aria-label") || el.innerText || "").trim().slice(0, 32),
            w: px(r.width), h: px(r.height), tooSmall: r.width < 24 || r.height < 24,
        };
    });
    // buttons with aria-pressed anywhere in the field
    const pressed = document.querySelectorAll("[aria-pressed]").length;
    const ariaSelected = document.querySelectorAll("[aria-selected]").length;
    const inertCount = document.querySelectorAll(".palette-card-grid [inert]").length;
    return {
        cards: cards.length, rootStyles, rows, spacing,
        titleFont: tcs ? { family: tcs.fontFamily.split(",")[0], size: tcs.fontSize, weight: tcs.fontWeight, lineHeight: tcs.lineHeight } : null,
        interactive, pressedSeats: pressed, ariaSelected, inertCount,
        cardRects: cards.map((c) => { const r = c.getBoundingClientRect(); return { w: px(r.width), h: px(r.height) }; }),
        gridCols: (() => { const g = document.querySelector(".palette-card-grid"); return g ? getComputedStyle(g).gridTemplateColumns : null; })(),
    };
};

await scene({ name: "d-light", viewport: { width: 1440, height: 1200 }, colorScheme: "light", measure: MEASURE });
await scene({ name: "d-dark", viewport: { width: 1440, height: 1200 }, colorScheme: "dark", measure: MEASURE });
await scene({ name: "m-light", viewport: { width: 390, height: 844 }, colorScheme: "light", measure: MEASURE });
await scene({ name: "m-dark", viewport: { width: 390, height: 844 }, colorScheme: "dark", measure: MEASURE });
await scene({ name: "d-forced", viewport: { width: 1440, height: 1200 }, colorScheme: "light", forcedColors: "active", measure: MEASURE });
await scene({ name: "d-rtl", viewport: { width: 1440, height: 1200 }, colorScheme: "light", dir: "rtl", measure: MEASURE });
await scene({ name: "d-prm", viewport: { width: 1440, height: 1200 }, colorScheme: "light", reducedMotion: "reduce", measure: MEASURE });
await scene({ name: "d-zoom200", viewport: { width: 1440, height: 1200 }, colorScheme: "light", zoom: 2, measure: MEASURE });
await scene({ name: "m320", viewport: { width: 320, height: 720 }, colorScheme: "light", measure: MEASURE });

writeFileSync(new URL("./probe-results.json", import.meta.url).pathname, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1).slice(0, 6000));
