// UI-AUDIT seat `extract-view` (COHESION §0bl) — read-only capture.
// HEADED Chromium on the real GPU; served dev page :9000 (never started/stopped here).
// Loads demo/color-picker/cube.png via setInputFiles — in-page state only, no DB write.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/value.js/demo/color-picker/cube.png";
const only = process.argv[2];
const sh = (c) => execSync(c).toString().trim();
const tree = () => `${sh("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD")} dirty=${sh("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l")}`;
const log = [];

async function metrics(page) {
    return page.evaluate(() => {
        const r = (sel, n = 3) => [...document.querySelectorAll(sel)].slice(0, n).map((el) => {
            const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
            return { sel, x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: cs.borderRadius, font: cs.fontSize, ff: cs.fontFamily.slice(0, 24), bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 160), label: el.getAttribute("aria-label") || el.getAttribute("title") || "" };
        });
        return {
            dark: document.documentElement.classList.contains("dark"),
            overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            m: [...r("[role=button][aria-label$='image'],[role=button][aria-label='Sample colors']"), ...r("[data-slot=shadow-palette]"), ...r("[data-o18=extract-k-rail]"),
                ...r("[data-o18=extract-kc]"), ...r("[aria-label='Number of colors'],[aria-label='Chroma weight']"), ...r("[title='Upload image'],[title='Open camera'],[title='Reset']"),
                ...r(".font-display.text-display"), ...r("h1,h2,h3", 6), ...r(".glass-floating"), ...r(".loupe"), ...r(".swatch-pulse"), ...r("[data-slot=palette-card], .palette-card", 2),
                ...r("[data-slot=palette-inspector], .palette-inspector", 2), ...r("button", 60).filter(b => b.w > 0)],
            active: (() => { const a = document.activeElement; return a ? a.tagName + " " + (a.getAttribute("aria-label") || a.getAttribute("title") || "") : null; })(),
        };
    });
}

async function load(page) {
    await page.locator("input[type=file][accept='image/*']").first().setInputFiles(IMG);
    await page.getByText("% of the image").first().waitFor({ timeout: 30000 });
    await page.waitForTimeout(1200);
}
const zone = (page) => page.locator("[role=button][aria-label='Upload image'],[role=button][aria-label='Sample colors'],[role=button][aria-label='Replace image']").first();
async function openDropper(page) {
    await load(page);
    await zone(page).scrollIntoViewIfNeeded();
    await zone(page).click();
    await page.locator(".glass-floating canvas").first().waitFor({ timeout: 10000 });
    await page.waitForTimeout(1000);
}

const STATES = {
    empty: [async (page) => { await zone(page).scrollIntoViewIfNeeded(); return "pristine"; }, { full: true }],
    dragover: [async (page) => {
        await zone(page).scrollIntoViewIfNeeded();
        await zone(page).evaluate((el) => { const dt = new DataTransfer(); dt.items.add(new File(["x"], "x.png", { type: "image/png" })); el.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: dt })); });
        await page.waitForTimeout(500); return "dragover dispatched";
    }],
    focus: [async (page) => { await zone(page).focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300); return "focus drop zone (kbd)"; }],
    loaded: [async (page) => { await load(page); await zone(page).scrollIntoViewIfNeeded(); return "cube.png loaded"; }, { full: true }],
    zonehover: [async (page, vp) => { await load(page); if (vp.name === "390") return "n/a touch"; await zone(page).hover(); await page.waitForTimeout(500); return "hover loaded zone"; }],
    k12: [async (page) => { await load(page); const s = page.getByRole("slider", { name: "Number of colors" }); await s.focus(); for (let i = 0; i < 7; i++) await s.press("ArrowRight"); await page.waitForTimeout(2500); return "k -> 12 via kbd"; }, { full: true }],
    eyedropper: [async (page) => { await openDropper(page); return "eyedropper open"; }],
    loupe: [async (page) => { await openDropper(page); const c = page.locator(".glass-floating [class*=cursor-]").first(); const b = await c.boundingBox(); await page.mouse.move(b.x + b.width * 0.45, b.y + b.height * 0.5); await page.waitForTimeout(150); await page.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.55); await page.waitForTimeout(500); return "hover loupe"; }],
    pinned: [async (page) => { await openDropper(page); const c = page.locator(".glass-floating [class*=cursor-]").first(); const b = await c.boundingBox(); await page.mouse.click(b.x + b.width * 0.5, b.y + b.height * 0.55); await page.waitForTimeout(600); return "tap pinned"; }],
    swatchpop: [async (page) => { await openDropper(page); const c = page.locator(".glass-floating [class*=cursor-]").first(); const b = await c.boundingBox(); await page.mouse.click(b.x + b.width * 0.5, b.y + b.height * 0.55); await page.waitForTimeout(600); await page.locator("[title='Add to palette']").first().click(); await page.waitForTimeout(160); return "add-to-palette -> swatch-pop mid"; }, { noSettle: true }],
    zoom: [async (page) => { await openDropper(page); const c = page.locator(".glass-floating [class*=cursor-]").first(); const b = await c.boundingBox(); await page.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.5); for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, -120); await page.waitForTimeout(80); } await page.waitForTimeout(900); return "wheel zoom x6"; }],
};

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const VPS = [{ name: "1440", w: 1440, h: 900 }, { name: "390", w: 390, h: 844 }];
for (const [state, [fn, opts = {}]] of Object.entries(STATES)) for (const vp of VPS) for (const theme of ["light", "dark"]) {
    const tag = `${state}__${vp.name}__${theme}`;
    if (only && !tag.startsWith(only)) continue;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.name === "390" });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    try {
        await page.goto(`${BASE}/#/extract`, { waitUntil: "domcontentloaded" });
        await page.getByText("Pull palettes from any image.").first().waitFor({ timeout: 45000 });
        await page.waitForTimeout(2500);
        const note = (await fn(page, vp)) ?? "";
        if (!opts.noSettle) await page.waitForTimeout(500);
        await page.screenshot({ path: `${OUT}${tag}.png` });
        if (opts.full) await page.screenshot({ path: `${OUT}${tag}__full.png`, fullPage: true });
        log.push({ tag, tree: tree(), url: page.url(), note, errs, ...(await metrics(page)) });
        console.log("OK", tag, note, errs.length ? `errs=${errs.length}` : "");
    } catch (e) {
        await page.screenshot({ path: `${OUT}${tag}__FAIL.png` }).catch(() => {});
        log.push({ tag, tree: tree(), fail: String(e).slice(0, 300), errs });
        console.log("FAIL", tag, String(e).slice(0, 200));
    }
    await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
