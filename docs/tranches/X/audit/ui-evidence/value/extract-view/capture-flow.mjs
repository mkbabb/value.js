// UI-AUDIT seat `extract-view` — FLOW capture (one navigation per viewport×theme; the
// served :9000 was answering its index in ~17 s under concurrent audit load, so
// per-state navigations timed out). Same instrument/law as capture.mjs.
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
const zone = (p) => p.locator("[role=button][aria-label='Upload image'],[role=button][aria-label='Sample colors'],[role=button][aria-label='Replace image']").first();
const probe = (p) => p.evaluate(() => {
    const q = (s) => [...document.querySelectorAll(s)].slice(0, 4).map((el) => { const cs = getComputedStyle(el), b = el.getBoundingClientRect(); return { s, box: [b.x, b.y, b.width, b.height].map(Math.round), radius: cs.borderRadius, bg: cs.backgroundColor, outline: cs.outline, shadow: cs.boxShadow.slice(0, 80), cls: String(el.className?.baseVal ?? el.className).slice(0, 140), label: el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent.trim().slice(0, 30) }; });
    return { overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        active: document.activeElement && (document.activeElement.tagName + " " + (document.activeElement.getAttribute("aria-label") || document.activeElement.getAttribute("title") || "")),
        els: [...q("[role=button][aria-label]"), ...q("[data-slot=shadow-palette]"), ...q("[data-o18=extract-k-rail]"), ...q("[role=slider]"), ...q("[title='Upload image'],[title='Open camera'],[title='Reset']"), ...q(".font-display.text-display"), ...q(".glass-floating"), ...q(".glass-floating button"), ...q(".loupe"), ...q(".swatch-pulse"), ...q("[data-slot=palette-inspector],[data-slot=palette-card]"), ...q("article"), ...q("article button")] };
});
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const vp of [{ n: "1440", w: 1440, h: 900 }, { n: "390", w: 390, h: 844 }]) for (const theme of ["light", "dark"]) {
    const tagB = `${vp.n}__${theme}`;
    if (only && !tagB.startsWith(only)) continue;
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.n === "390" });
    ctx.setDefaultTimeout(90000); ctx.setDefaultNavigationTimeout(180000);
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    p.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    const shot = async (state, note, full = false) => {
        const tag = `${state}__${tagB}`;
        await p.screenshot({ path: `${OUT}${tag}.png` });
        if (full) await p.screenshot({ path: `${OUT}${tag}__full.png`, fullPage: true });
        log.push({ tag, tree: tree(), note, errs: [...errs], ...(await probe(p)) });
        console.log("OK", tag, note);
    };
    const step = async (state, fn, full) => { try { const n = await fn(); await shot(state, n ?? "", full); } catch (e) { console.log("FAIL", state, tagB, String(e).slice(0, 200)); log.push({ tag: `${state}__${tagB}`, tree: tree(), fail: String(e).slice(0, 300) }); await p.screenshot({ path: `${OUT}${state}__${tagB}__FAIL.png` }).catch(() => {}); } };
    try {
        await p.goto(`${BASE}/#/extract`, { waitUntil: "domcontentloaded" });
        await p.getByText("Pull palettes from any image.").first().waitFor();
        await p.waitForTimeout(3000);
    } catch (e) { console.log("BOOTFAIL", tagB, String(e).slice(0, 200)); await ctx.close(); continue; }
    await step("loaded", async () => {
        await p.locator("input[type=file][accept='image/*']").first().setInputFiles(IMG);
        await p.getByText("% of the image").first().waitFor();
        await p.waitForTimeout(1500); await zone(p).scrollIntoViewIfNeeded(); return "cube.png loaded";
    }, true);
    if (vp.n === "1440") await step("zonehover", async () => { await zone(p).hover(); await p.waitForTimeout(600); return "hover loaded zone"; });
    await step("k12", async () => { const s = p.getByRole("slider", { name: "Number of colors" }); await s.focus(); for (let i = 0; i < 7; i++) await s.press("ArrowRight"); await p.getByText("% of the image").first().waitFor(); await p.waitForTimeout(3000); return "k -> 12 via kbd (slider keeps focus)"; }, true);
    await step("eyedropper", async () => { await p.mouse.move(1, 1); await zone(p).scrollIntoViewIfNeeded(); await zone(p).click(); await p.locator(".glass-floating canvas").first().waitFor(); await p.waitForTimeout(1200); return "eyedropper open"; });
    const vpBox = async () => p.locator(".glass-floating [class*=cursor-]").first().boundingBox();
    await step("loupe", async () => { const bx = await vpBox(); await p.mouse.move(bx.x + bx.width * 0.45, bx.y + bx.height * 0.5); await p.waitForTimeout(150); await p.mouse.move(bx.x + bx.width * 0.5, bx.y + bx.height * 0.55); await p.waitForTimeout(600); return "hover loupe"; });
    await step("pinned", async () => { const bx = await vpBox(); await p.mouse.click(bx.x + bx.width * 0.5, bx.y + bx.height * 0.55); await p.waitForTimeout(700); return "tap -> pinned"; });
    await step("swatchpop", async () => { await p.locator("[title='Add to palette']").first().click(); await p.waitForTimeout(150); return "add-to-palette -> swatch-pop mid-animation"; });
    await step("afteradd", async () => { await p.waitForTimeout(1200); return "after add (any confirmation?)"; });
    await step("zoom", async () => { await p.keyboard.press("Escape"); await p.waitForTimeout(300); const bx = await vpBox(); await p.mouse.move(bx.x + bx.width * 0.5, bx.y + bx.height * 0.5); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, -120); await p.waitForTimeout(80); } await p.waitForTimeout(1000); return "Escape unpin, wheel zoom x6"; });
    await step("closed", async () => { await p.keyboard.press("Escape"); await p.waitForTimeout(800); return "Escape closes eyedropper"; }, true);
    await ctx.close();
}
await b.close();
writeFileSync(`${OUT}capture-flow-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
