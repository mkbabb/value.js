// UI-AUDIT seat `pointer-debug-overlay` (OA-36). READ-ONLY on the app; headed Chromium, real GPU.
// States: collapsed chip, expanded (gauges + event log after spectrum + slider drags), freeze detection
// (pointer held still > 2.5 s), plus probes: z-index resolution / occlusion, log scroll, buttons, focus.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const only = process.argv[2];
const sh = (c) => execSync(c).toString().trim();
const tree = () => `${sh("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD")} dirty=${sh("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l")}`;
const log = [];
const probe = (p) => p.evaluate(() => {
    const o = document.querySelector(".debug-overlay");
    if (!o) return { overlay: null };
    const cs = getComputedStyle(o), b = o.getBoundingClientRect();
    const h = o.querySelector(".debug-header"), hb = h.getBoundingClientRect();
    const hit = document.elementFromPoint(hb.x + hb.width / 2, hb.y + hb.height / 2);
    const sc = o.querySelector(".debug-scroll");
    const btns = [...o.querySelectorAll(".debug-btn")].map((x) => { const c = getComputedStyle(x), r = x.getBoundingClientRect(); return { t: x.textContent.trim(), box: [r.x, r.y, r.width, r.height].map(Math.round), radius: c.borderRadius, font: c.fontSize }; });
    const dock = document.querySelector("[data-slot=dock], .glass-dock, nav");
    const db = dock?.getBoundingClientRect();
    return {
        zIndexRaw: cs.getPropertyValue("z-index"), zDebugVar: getComputedStyle(document.documentElement).getPropertyValue("--z-debug"),
        zToast: getComputedStyle(document.documentElement).getPropertyValue("--z-toast"),
        box: [b.x, b.y, b.width, b.height].map(Math.round), radius: cs.borderRadius, bg: cs.backgroundColor, font: cs.fontFamily + " " + cs.fontSize,
        headerHitIsOverlay: !!hit?.closest(".debug-overlay"), headerHit: hit ? hit.tagName + "." + String(hit.className).slice(0, 60) : null,
        headerFocusOutline: getComputedStyle(h).outlineStyle, headerBox: [hb.x, hb.y, hb.width, hb.height].map(Math.round),
        scroll: sc ? { st: sc.scrollTop, sh: sc.scrollHeight, ch: sc.clientHeight, pe: getComputedStyle(sc).pointerEvents } : null,
        btns, dockBox: db ? [db.x, db.y, db.width, db.height].map(Math.round) : null,
        text: o.innerText.slice(0, 400),
    };
});
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const vp of [{ n: "1440", w: 1440, h: 900 }, { n: "390", w: 390, h: 844 }]) for (const theme of ["light", "dark"]) {
    const tagB = `${vp.n}__${theme}`;
    if (only && !tagB.startsWith(only)) continue;
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.n === "390" });
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
    ctx.setDefaultTimeout(90000); ctx.setDefaultNavigationTimeout(180000);
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const errs = [];
    p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    p.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    const shot = async (state, note, clip) => {
        const tag = `${state}__${tagB}`;
        await p.screenshot({ path: `${OUT}${tag}.png` });
        if (clip) { const bx = await p.locator(".debug-overlay").boundingBox().catch(() => null); if (bx) await p.screenshot({ path: `${OUT}${tag}__crop.png`, clip: { x: Math.max(0, bx.x - 8), y: Math.max(0, bx.y - 8), width: Math.min(vp.w, bx.width + 16), height: Math.min(vp.h, bx.height + 16) } }); }
        log.push({ tag, tree: tree(), note, errs: [...errs], probe: await probe(p) });
        console.log("OK", tag, note);
    };
    const step = async (state, fn, clip) => { try { const n = await fn(); await shot(state, n ?? "", clip); } catch (e) { console.log("FAIL", state, tagB, String(e).slice(0, 200)); log.push({ tag: `${state}__${tagB}`, tree: tree(), fail: String(e).slice(0, 300) }); await p.screenshot({ path: `${OUT}${state}__${tagB}__FAIL.png` }).catch(() => {}); } };
    try {
        await p.goto(`${BASE}/#/?debug=1`, { waitUntil: "domcontentloaded" });
        await p.locator(".debug-overlay").waitFor();
        await p.locator(".spectrum-picker").first().waitFor();
        await p.waitForTimeout(3500);
    } catch (e) { console.log("BOOTFAIL", tagB, String(e).slice(0, 200)); log.push({ tag: `boot__${tagB}`, fail: String(e).slice(0, 300), tree: tree() }); await p.screenshot({ path: `${OUT}boot__${tagB}__FAIL.png` }).catch(() => {}); await ctx.close(); continue; }
    await step("01-collapsed", async () => "?debug=1 boot: collapsed chip", true);
    await step("02-header-focus", async () => { await p.locator(".debug-header").focus(); await p.keyboard.press("Tab"); await p.keyboard.press("Shift+Tab"); await p.waitForTimeout(300); return "header keyboard focus (focus-visible ring?)"; }, true);
    await step("03-expanded-empty", async () => { await p.locator(".debug-header").click(); await p.waitForTimeout(700); return "expanded, gauges from interval only"; }, true);
    await step("04-expanded-after-drags", async () => {
        const sp = await p.locator(".spectrum-picker").first().boundingBox();
        await p.mouse.move(sp.x + sp.width * 0.3, sp.y + sp.height * 0.4); await p.mouse.down();
        for (let i = 0; i < 8; i++) { await p.mouse.move(sp.x + sp.width * (0.3 + i * 0.04), sp.y + sp.height * (0.4 + i * 0.03)); await p.waitForTimeout(40); }
        await p.mouse.up();
        const sl = p.locator("[role=slider]").first(); const sb = await sl.boundingBox().catch(() => null);
        if (sb) { await p.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await p.mouse.down(); await p.mouse.move(sb.x + sb.width / 2 + 30, sb.y + sb.height / 2); await p.mouse.up(); }
        await p.waitForTimeout(800); return "after spectrum drag + slider drag";
    }, true);
    await step("05-log-wheel", async () => {
        const o = await p.locator(".debug-scroll").boundingBox();
        const before = await p.evaluate(() => [document.querySelector(".debug-scroll").scrollTop, scrollY, document.scrollingElement.scrollTop]);
        await p.mouse.move(o.x + o.width / 2, o.y + o.height / 2); await p.mouse.wheel(0, 300); await p.waitForTimeout(600);
        const after = await p.evaluate(() => [document.querySelector(".debug-scroll").scrollTop, scrollY, document.scrollingElement.scrollTop]);
        return `wheel over log: [logScrollTop,winY,docScrollTop] before=${before} after=${after}`;
    }, true);
    await step("06-freeze", async () => {
        await p.evaluate(() => { const s = document.querySelector(".debug-scroll"); if (s) s.scrollTop = 0; scrollTo(0, 0); });
        const sp = await p.locator(".spectrum-picker").first().boundingBox();
        await p.mouse.move(sp.x + sp.width * 0.6, sp.y + sp.height * 0.5); await p.mouse.down();
        await p.waitForTimeout(3300); return "pointer held still 3.3 s on spectrum (FREEZE_DETECTED expected)";
    }, true);
    await step("07-freeze-release", async () => { await p.mouse.up(); await p.waitForTimeout(900); return "pointer released"; }, true);
    await step("08-copy", async () => { await p.locator(".debug-btn-copy").click(); await p.waitForTimeout(250); const clip = await p.evaluate(() => navigator.clipboard.readText().then((t) => t.length, (e) => "ERR " + e)); return "Copy JSON clicked; clipboard len=" + clip; }, true);
    await step("09-reset-hover", async () => { await p.waitForTimeout(1400); await p.locator(".debug-btn-danger").hover(); await p.waitForTimeout(300); return "hover Reset"; }, true);
    await step("10-reset", async () => { await p.locator(".debug-btn-danger").click(); await p.waitForTimeout(500); return "Reset clicked"; }, true);
    await step("11-clear", async () => { await p.mouse.move(2, 2); await p.locator(".debug-btn").filter({ hasText: "Clear" }).click(); await p.waitForTimeout(600); return "Clear clicked (empty log state)"; }, true);
    await ctx.close();
}
await b.close();
writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 2));
console.log("DONE", tree());
