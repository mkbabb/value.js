// PaletteCardMenu — CHALLENGE-C pass 2, probe C
// (1) scroll-lock content jump: open a card menu on a list long enough to scroll
// (2) scroll position preservation
// (3) per-card cost: N cards → N reka menu roots (DOM node + component census)
// (4) /#/mix — PaletteCard nested inside a native <button>: AX tree effect
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const N = 30;
const SEED = {
    version: 1,
    palettes: Array.from({ length: N }, (_, i) => ({
        id: `seed${i}`,
        name: `Probe Palette ${String(i).padStart(2, "0")}`,
        slug: `probe-${i}`,
        isLocal: true,
        createdAt: NOW,
        updatedAt: NOW,
        colors: [
            { css: "#ff0055", position: 0 },
            { css: "#00ddaa", position: 1 },
            { css: "#3355ff", position: 2 },
        ],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
await ctx.addInitScript((seed) => localStorage.setItem("color-palettes", JSON.stringify(seed)), SEED);
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

log("cardCount", await page.locator('[role="article"]').count());

// find the actual scroll container (the app may scroll a pane, not body)
const scrollInfo = await page.evaluate(() => {
    const cands = [];
    document.querySelectorAll("*").forEach((el) => {
        if (el.scrollHeight > el.clientHeight + 4) {
            const cs = getComputedStyle(el);
            if (["auto", "scroll", "overlay"].includes(cs.overflowY) || el === document.documentElement || el === document.body) {
                cands.push({
                    tag: el.tagName, cls: (el.className || "").toString().slice(0, 60),
                    scrollH: el.scrollHeight, clientH: el.clientHeight, overflowY: cs.overflowY,
                });
            }
        }
    });
    return {
        docScrollH: document.documentElement.scrollHeight,
        innerH: window.innerHeight,
        docHasVScroll: document.documentElement.scrollHeight > window.innerHeight,
        scrollbarW: window.innerWidth - document.documentElement.clientWidth,
        candidates: cands.slice(0, 8),
    };
});
log("scrollInfo", scrollInfo);

const measure = () => page.evaluate(() => {
    const el = document.querySelector('[role="article"]');
    const r = el.getBoundingClientRect();
    return {
        cardLeft: +r.left.toFixed(2), cardRight: +r.right.toFixed(2), cardWidth: +r.width.toFixed(2),
        clientW: document.documentElement.clientWidth,
        scrollbarW: window.innerWidth - document.documentElement.clientWidth,
        scrollY: window.scrollY,
        bodyOverflow: getComputedStyle(document.body).overflow,
        bodyPadRight: getComputedStyle(document.body).paddingRight,
        htmlOverflow: getComputedStyle(document.documentElement).overflow,
        appAriaHidden: document.querySelector("#app")?.getAttribute("aria-hidden") ?? null,
    };
});

// scroll down so a restore failure is observable
await page.mouse.wheel(0, 600);
await page.waitForTimeout(400);
const b4 = await measure();
log("beforeOpen", b4);

const card = page.locator('[role="article"]').first();
await page.locator('[aria-label="Palette menu"]').nth(3).click();
await page.waitForTimeout(500);
const after = await measure();
log("afterOpen", after);
log("SHIFT", {
    cardLeftDelta: +(after.cardLeft - b4.cardLeft).toFixed(2),
    cardWidthDelta: +(after.cardWidth - b4.cardWidth).toFixed(2),
    clientWDelta: after.clientW - b4.clientW,
    scrollbarWDelta: after.scrollbarW - b4.scrollbarW,
    scrollYDelta: after.scrollY - b4.scrollY,
});
await page.keyboard.press("Escape");
await page.waitForTimeout(500);
const closed = await measure();
log("afterClose", closed);
log("SHIFT_BACK", {
    cardLeftDelta: +(closed.cardLeft - after.cardLeft).toFixed(2),
    scrollYDelta: closed.scrollY - after.scrollY,
});

// (3) DOM census with N cards, all menus closed
log("domCensus", await page.evaluate(() => ({
    totalNodes: document.querySelectorAll("*").length,
    triggers: document.querySelectorAll('[aria-label="Palette menu"]').length,
    menuItemsInDom: document.querySelectorAll('[role="menuitem"]').length,
    menusInDom: document.querySelectorAll('[role="menu"]').length,
    articles: document.querySelectorAll('[role="article"]').length,
})));

// (4) /#/mix — nested interactive
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
log("mixBodyHead", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 500));

// try to reach "palettes" mode
const modeButtons = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button,[role="tab"],[role="radio"]'))
        .map((e) => ({ text: e.textContent.replace(/\s+/g, " ").trim().slice(0, 40), role: e.getAttribute("role"), label: e.getAttribute("aria-label") }))
        .filter((e) => e.text || e.label).slice(0, 40));
log("mixControls", modeButtons);

const palettesToggle = page.getByRole("button", { name: /palettes/i }).first();
if (await palettesToggle.count()) {
    await palettesToggle.click().catch(() => {});
    await page.waitForTimeout(1200);
}
const nested = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("button").forEach((b) => {
        const inner = b.querySelectorAll('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"]),[role="menuitem"],[role="button"]');
        if (inner.length) {
            out.push({
                outerLabel: b.getAttribute("aria-label"),
                outerText: b.textContent.replace(/\s+/g, " ").trim().slice(0, 60),
                innerCount: inner.length,
                inner: Array.from(inner).slice(0, 5).map((e) => ({ tag: e.tagName, label: e.getAttribute("aria-label"), role: e.getAttribute("role") })),
            });
        }
    });
    return out;
});
log("nestedInteractiveButtons", nested);
log("mixArticles", await page.locator('[role="article"]').count());

const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const ax = await cdp.send("Accessibility.getFullAXTree");
const paletteMenuNodes = ax.nodes.filter((n) => (n.name?.value || "").includes("Palette menu"));
log("AX_paletteMenuNodesOnMix", paletteMenuNodes.map((n) => ({
    role: n.role?.value, name: n.name?.value, ignored: n.ignored,
    ignoredReasons: (n.ignoredReasons || []).map((r) => r.name),
})));
const articleNodes = ax.nodes.filter((n) => n.role?.value === "article");
log("AX_articleNodesOnMix", articleNodes.length);
log("pageErrors", pageErrors);

writeFileSync(new URL("./pcm-p2-c-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
