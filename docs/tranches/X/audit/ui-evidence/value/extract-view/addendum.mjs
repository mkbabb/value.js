// UI-AUDIT seat `extract-view` — ADDENDUM probes: processing frame, ctrl+wheel (trackpad-pinch)
// zoom, repeat add (does swatch-pop replay?), menu-button geometry, control focus ring,
// the dock state + scrollY while the eyedropper is open. Same instrument/law.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/value.js/demo/color-picker/cube.png";
const sh = (c) => execSync(c).toString().trim();
const tree = () => `${sh("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD")} dirty=${sh("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l")}`;
const log = [];
const zone = (p) => p.locator("[role=button][aria-label='Upload image'],[role=button][aria-label='Sample colors']").first();
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const [vn, w, h, theme] of [["1440", 1440, 900, "light"], ["390", 390, 844, "dark"]]) {
    const T = `${vn}__${theme}`;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vn === "390" });
    ctx.setDefaultTimeout(120000); ctx.setDefaultNavigationTimeout(180000);
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const rec = async (k, v) => { log.push({ k: `${k}__${T}`, tree: tree(), ...v }); console.log(k, T, JSON.stringify(v).slice(0, 300)); };
    const shot = async (k) => { await p.screenshot({ path: `${OUT}${k}__${T}.png` }); };
    try {
        await p.goto("http://localhost:9000/#/extract", { waitUntil: "domcontentloaded" });
        await p.getByText("Pull palettes from any image.").first().waitFor();
        await p.waitForTimeout(3000);
        // focus ring on the Upload DockControl (keyboard)
        await zone(p).focus(); await p.keyboard.press("Tab"); await p.keyboard.press("Tab"); await p.waitForTimeout(300);
        await rec("ctlfocus", await p.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a); return { active: a.getAttribute("title") || a.getAttribute("aria-label") || a.tagName, outline: cs.outline, shadow: cs.boxShadow.slice(0, 120) }; }));
        await shot("ctlfocus");
        // processing frame
        await p.locator("input[type=file][accept='image/*']").first().setInputFiles(IMG);
        await p.waitForTimeout(60); await shot("processing");
        await rec("processing", await p.evaluate(() => ({ preview: !!document.querySelector("img[alt='Uploaded image']"), skeleton: !!document.querySelector("[data-slot=palette-card-skeleton], [data-slot*=skeleton]"), shadow: !!document.querySelector("[data-slot=shadow-palette]") })));
        await p.getByText("% of the image").first().waitFor();
        await p.waitForTimeout(1500);
        const mb = p.getByRole("button", { name: "Palette menu" }).first();
        await rec("menubtn", await mb.evaluate((e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); const card = e.closest("[data-slot],article,.palette-card,div[class*=rounded-card]"); const cr = card?.getBoundingClientRect(); return { box: [r.x, r.y, r.width, r.height].map(Math.round), radius: cs.borderRadius, cls: String(e.className).slice(0, 160), card: cr && [cr.x, cr.y, cr.width, cr.height].map(Math.round) }; }));
        await mb.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
        await mb.screenshot({ path: `${OUT}menubtn__${T}.png` }).catch(() => {});
        // eyedropper + dock state
        await zone(p).scrollIntoViewIfNeeded(); await zone(p).click();
        await p.locator(".glass-floating canvas").first().waitFor(); await p.waitForTimeout(1200);
        await rec("dockstate", await p.evaluate(() => ({ scrollY: Math.round(scrollY), docH: document.documentElement.scrollHeight, dock: [...document.querySelectorAll(".glass-dock")].map((d) => ({ cls: String(d.className).slice(0, 160), box: (() => { const r = d.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); })() })) })));
        const vp = p.locator(".glass-floating [class*=cursor-]").first(); const bx = await vp.boundingBox();
        const cz = async () => p.evaluate(() => getComputedStyle(document.querySelector(".eyedropper-canvas")).transform);
        const before = await cz();
        await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2);
        for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, -120); await p.waitForTimeout(60); }
        await p.waitForTimeout(700); const afterPlain = await cz();
        await p.keyboard.down("Control");
        for (let i = 0; i < 14; i++) { await p.mouse.wheel(0, -40); await p.waitForTimeout(40); }
        await p.keyboard.up("Control");
        await p.waitForTimeout(900); const afterCtrl = await cz();
        await rec("zoomprobe", { before, afterPlainWheel: afterPlain, afterCtrlWheel: afterCtrl });
        await shot("ctrlzoom");
        // repeat-add: does swatch-pop replay?
        await p.mouse.click(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.waitForTimeout(600);
        const add = p.locator("[title='Add to palette']").first();
        const anim = () => p.evaluate(() => { const s = document.querySelector(".glass-floating .swatch-pulse"); return { hasClass: !!s, running: s ? s.getAnimations().filter(a => a.animationName === "swatch-pop" && a.playState === "running").length : 0, names: s ? s.getAnimations().map(a => a.animationName + ":" + a.playState) : [] }; });
        await add.click(); await p.waitForTimeout(120); const a1 = await anim();
        await p.waitForTimeout(1500); const a1end = await anim();
        await add.click(); await p.waitForTimeout(120); const a2 = await anim();
        await shot("readd");
        await rec("repeatadd", { first: a1, afterFirst: a1end, second: a2, count: await p.getByText(/\d+ colors?$/).first().textContent().catch(() => null) });
    } catch (e) { console.log("FAIL", T, String(e).slice(0, 300)); log.push({ k: T, fail: String(e).slice(0, 300) }); await p.screenshot({ path: `${OUT}addendum__${T}__FAIL.png` }).catch(() => {}); }
    await ctx.close();
}
await b.close();
writeFileSync(`${OUT}addendum-log.json`, JSON.stringify(log, null, 1));
