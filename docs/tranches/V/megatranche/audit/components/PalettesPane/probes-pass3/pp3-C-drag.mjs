// PROBE C — drag mechanics: order truth, post-drag click leakage, forced reflow,
// PRM neutralisation, and the keyboard walk of a populated pane.
import { chromium } from "playwright";
const KEY = "color-palettes";
const mk = (names) => JSON.stringify({ version: 1, palettes: names.map((n, i) => ({
    id: `id-${n}`, name: n, slug: n.toLowerCase(),
    colors: [{ css: "#ff0000", position: 0 }, { css: "#0000ff", position: 1 }],
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: `2026-01-0${i + 1}T00:00:00.000Z`, isLocal: true,
})) });

const NAMES = ["Alpha", "Beta", "Gamma", "Delta"];
const browser = await chromium.launch();

async function open(seed, opts = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, ...opts });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e.message).slice(0, 90)));
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, seed]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    return { ctx, page, errs };
}
const order = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name));
const shown = (page) => page.evaluate(() => [...document.querySelectorAll('[role="article"]')].map((e) => e.getAttribute("aria-label")));

async function dragHandle(page, from, to) {
    const hs = await page.$$(".drag-handle");
    const a = await hs[from].boundingBox(), b = await hs[to].boundingBox();
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    for (let s = 1; s <= 12; s++) {
        await page.mouse.move(a.x + a.width / 2, a.y + (b.y - a.y) * (s / 12) + a.height / 2);
        await page.waitForTimeout(18);
    }
    await page.mouse.up();
    await page.waitForTimeout(500);
}

// ── C1 · first-drag order truth + post-drag click leakage ────────────────────
{
    const { ctx, page, errs } = await open(mk(NAMES));
    console.log("=== C1 first drag (handle idx0 -> idx2), no search ===");
    console.log("store BEFORE :", (await order(page)).join(" "));
    console.log("shown BEFORE :", (await shown(page)).join(" "));
    const expandedBefore = await page.evaluate(() => document.querySelectorAll('[role="article"] .flex-wrap').length);
    await dragHandle(page, 0, 2);
    console.log("store AFTER  :", (await order(page)).join(" "));
    console.log("shown AFTER  :", (await shown(page)).join(" "));
    console.log("EXPECTED     : Beta Gamma Alpha Delta");
    const expandedAfter = await page.evaluate(() => document.querySelectorAll('[role="article"] .flex-wrap').length);
    console.log("expanded swatch-panels before/after drag:", expandedBefore, "/", expandedAfter, "(non-zero after = click leaked through the drag)");
    console.log("2nd drag (same gesture):");
    await dragHandle(page, 0, 2);
    console.log("store AFTER 2:", (await order(page)).join(" "));
    console.log("pageErrors:", errs.length);
    await ctx.close();
}

// ── C2 · forced synchronous layout during a drag, by card count ──────────────
{
    console.log("\n=== C2 forced reflow (offsetWidth reads) during ONE drag ===");
    for (const n of [4, 20, 60]) {
        const names = Array.from({ length: n }, (_, i) => `P${String(i).padStart(3, "0")}`);
        const { ctx, page } = await open(mk(names));
        await page.evaluate(() => {
            const d = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth");
            window.__reflow = 0;
            Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
                configurable: true, get() { window.__reflow++; return d.get.call(this); },
            });
        });
        await dragHandle(page, 0, 3);
        const r = await page.evaluate(() => window.__reflow);
        console.log(`cards=${String(n).padStart(3)}  forced offsetWidth reads during drag = ${r}`);
        await ctx.close();
    }
}

// ── C3 · prefers-reduced-motion: does the global CSS guard reach Sortable's
//        inline transition? ───────────────────────────────────────────────────
{
    console.log("\n=== C3 prefers-reduced-motion ===");
    for (const rm of ["no-preference", "reduce"]) {
        const { ctx, page } = await open(mk(NAMES), { reducedMotion: rm === "reduce" ? "reduce" : "no-preference" });
        const mq = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
        const hs = await page.$$(".drag-handle");
        const a = await hs[0].boundingBox(), b = await hs[2].boundingBox();
        await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
        await page.mouse.down();
        for (let s = 1; s <= 8; s++) { await page.mouse.move(a.x + 8, a.y + (b.y - a.y) * (s / 8) + 8); await page.waitForTimeout(15); }
        const mid = await page.evaluate(() => {
            const c = document.querySelectorAll('[role="article"]');
            return [...c].slice(0, 3).map((e) => ({
                inline: e.style.transition || "(none)",
                computed: getComputedStyle(e).transitionDuration,
            }));
        });
        await page.mouse.up();
        await page.waitForTimeout(300);
        console.log(`reducedMotion=${rm.padEnd(13)} matchMedia=${mq}`, JSON.stringify(mid));
        await ctx.close();
    }
}

// ── C4 · keyboard walk of the populated pane ────────────────────────────────
{
    console.log("\n=== C4 keyboard walk (30 Tabs from document start) ===");
    const { ctx, page } = await open(mk(NAMES));
    await page.evaluate(() => document.body.focus());
    const seq = [];
    for (let i = 0; i < 30; i++) {
        await page.keyboard.press("Tab");
        const d = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a) return null;
            const inPane = !!a.closest(".palette-card-grid, .pane-scroll-fade");
            return { tag: a.tagName.toLowerCase(), name: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 32), inPane, card: !!a.closest('[role="article"]') };
        });
        seq.push(d);
    }
    console.log("focus sequence (pane-scoped entries only):");
    seq.forEach((d, i) => { if (d && d.inPane) console.log(` ${String(i).padStart(2)} <${d.tag}> "${d.name}" inCard=${d.card}`); });
    const inCard = seq.filter((d) => d && d.card).length;
    console.log("stops inside a palette card:", inCard);
    const canExpand = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        return { tabindex: c.getAttribute("tabindex"), role: c.getAttribute("role"), hasKeyHandler: !!c.onkeydown };
    });
    console.log("card element:", JSON.stringify(canExpand));
    await ctx.close();
}

await browser.close();
