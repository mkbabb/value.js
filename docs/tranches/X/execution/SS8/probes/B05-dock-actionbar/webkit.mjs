// SERVED MODEL: claude-opus-5-5 — SS-8 B05 WebKit cells (engine-specific items ONLY; run via
// `guarded --exclusive webkit`). One browser; one context per cell; closed in finally.
// tab    — ABL D-2 engine differential: Tab reachability of the action-bar seats.
// prm    — ABT D-01 webkit PRM cell: route round trip + hover clip under reduced motion.
// boot   — ABT C-3 stale-boot trace on WebKit.
// forced — ABN U-11 Safari arm: does WebKit report forced-colors under emulation?
import { webkit } from "playwright";
import { boot, parkOnDock, dockState, toolsState, tabWalk, save } from "./lib.mjs";

const browser = await webkit.launch();
const out = {};
try {
    // tab
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 3000);
            await parkOnDock(page);
            const t = page.getByRole("button", { name: "Toggle action bar" });
            await t.click();
            await page.waitForTimeout(900);
            await page.getByRole("button", { name: "Back" }).focus();
            const back = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
            out.tab = { focusedBack: back, walk: await tabWalk(page, 10) };
            // Alt+Tab is WebKit's "tab to all controls" chord on macOS.
            await page.getByRole("button", { name: "Back" }).focus();
            const alt = [];
            for (let i = 0; i < 8; i++) { await page.keyboard.press("Alt+Tab"); alt.push(await page.evaluate(() => (document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName) + (document.activeElement?.closest('[data-testid="scene-action-row"]') ? " [seat]" : ""))); }
            out.tab.altWalk = alt;
        } finally { await ctx.close(); }
    }
    // prm
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        try {
            const page = await ctx.newPage();
            await boot(page, "/gradient", 3000);
            await parkOnDock(page);
            const legs = [];
            const snap = async (l) => { const t = await toolsState(page); legs.push({ l, cls: t.slotClass, overflow: t.innerOverflow, w: t.slotRect?.w }); };
            await snap("boot");
            for (const h of ["#/atmosphere", "#/gradient", "#/atmosphere", "#/gradient"]) { await page.evaluate((x) => { location.hash = x; }, h); await page.waitForTimeout(1500); await snap(h); }
            const bb = await page.getByRole("button", { name: "Toggle action bar" }).boundingBox();
            await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
            await page.waitForTimeout(700);
            const hover = await page.evaluate(() => { const b = document.querySelector('[aria-label="Toggle action bar"]'); const i = b.closest(".action-bar-toggle-inner"); const br = b.getBoundingClientRect(), ir = i.getBoundingClientRect(); return { overflow: getComputedStyle(i).overflow, transform: getComputedStyle(b).transform, btn: [br.x, br.right].map((v) => +v.toFixed(2)), inner: [ir.x, ir.right].map((v) => +v.toFixed(2)) }; });
            out.prm = { legs, hover };
        } finally { await ctx.close(); }
    }
    // boot
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => {
                window.__slot = []; const t0 = performance.now();
                const tick = () => { const s = document.querySelector(".action-bar-toggle-slot"); if (s) { const r = s.getBoundingClientRect(); window.__slot.push({ t: Math.round(performance.now() - t0), w: +r.width.toFixed(1), o: +(+getComputedStyle(s).opacity).toFixed(3), cls: s.className.replace("action-bar-toggle-slot", "").trim() }); } if (performance.now() - t0 < 2500) requestAnimationFrame(tick); };
                requestAnimationFrame(tick);
            });
            const boots = [];
            for (let i = 0; i < 3; i++) {
                await boot(page, "/", 2700);
                const tr = await page.evaluate(() => window.__slot);
                const fin = tr.at(-1);
                boots.push({ frames: tr.length, first: tr[0], final: fin, partial: tr.filter((f) => f.w > 0.5 && fin && f.w < fin.w - 0.5).length, lowOpPainted: tr.filter((f) => f.w > 0.5 && f.o < 0.95).slice(0, 4) });
            }
            out.boot = boots;
        } finally { await ctx.close(); }
    }
    // forced
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
        try {
            const page = await ctx.newPage();
            await boot(page, "/", 3000);
            out.forced = await page.evaluate(() => ({ mq: matchMedia("(forced-colors: active)").matches, toolsSvgStroke: getComputedStyle(document.querySelector('[aria-label="Toggle action bar"] svg')).stroke }));
            out.forced.dock = (await dockState(page)).cls;
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
save("webkit.json", out);
console.log("webkit ok");
