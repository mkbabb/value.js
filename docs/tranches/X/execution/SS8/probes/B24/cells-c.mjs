// SERVED MODEL: claude-opus-5-5 · SS-8 B24 cells C — wb-mix-sourceselector U-10: the five STATE arms of #/mix,
// rest frame each (reduced-motion · forced-colors [EMULATED, labelled per the two-channel law] · zoom-200 [EMULATED:
// 720x450 @ dsf 2] · rtl · keyboard-focus). One browser per run, one context per cell, all closed in finally.
import fs from "node:fs";
import { launch, open, readyMix, save, pal, hues, EVID } from "./lib.mjs";
const SAVED = [pal("sunset", "Sunset", hues(5)), pal("ocean", "Ocean", hues(5, 0.6, 0.12, 40))];
const out = {};
const b = await launch();
async function cell(name, opts, fn) {
    const t0 = Date.now();
    let ctx;
    try {
        const o = await open(b, { saved: SAVED, inst: false, ...opts });
        ctx = o.ctx;
        await readyMix(o.p);
        const r = (await fn?.(o.p)) ?? {};
        const file = `u10-${name}.png`;
        fs.writeFileSync(`${EVID}/${file}`, await o.p.screenshot());
        const probe = await o.p.evaluate(() => ({
            prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
            forced: matchMedia("(forced-colors: active)").matches,
            dir: getComputedStyle(document.querySelector(".add-slot-ghost")).direction,
            vw: innerWidth, vh: innerHeight, dpr: devicePixelRatio,
            focus: document.activeElement ? `${document.activeElement.tagName}.${(document.activeElement.className?.baseVal ?? document.activeElement.className ?? "").toString().slice(0, 50)} [${document.activeElement.getAttribute("aria-label") ?? document.activeElement.textContent.trim().slice(0, 30)}] fv=${document.activeElement.matches(":focus-visible")}` : null,
            h3: [...document.querySelectorAll("h3")].map((h) => h.textContent.trim().slice(0, 30)),
        }));
        out[name] = { file, ...probe, ...r, errors: o.errors.filter((e) => !/3000|ERR_FAILED/.test(e)).slice(0, 5), ms: Date.now() - t0 };
    } catch (e) {
        out[name] = { fail: String(e).slice(0, 400), ms: Date.now() - t0 };
    } finally {
        if (ctx) await ctx.close().catch(() => {});
        save("cells-c.out.json", out);
        console.log(name, JSON.stringify(out[name]).slice(0, 600));
    }
}
try {
    await cell("reduced-motion-1024", { viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" });
    await cell("forced-colors-1024-EMULATED", { viewport: { width: 1024, height: 768 }, forcedColors: "active" });
    await cell("zoom-200-720x450-dsf2-EMULATED", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    await cell("rtl-1024", { viewport: { width: 1024, height: 768 } }, async (p) => {
        await p.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await p.waitForTimeout(500);
        return {};
    });
    await cell("keyboard-focus-1024", { viewport: { width: 1024, height: 768 } }, async (p) => {
        await p.locator(".add-slot-ghost").first().focus();
        await p.keyboard.press("Shift");
        await p.locator(".add-slot-ghost").first().focus();
        await p.waitForTimeout(300);
        return {};
    });
} finally {
    await b.close();
    save("cells-c.out.json", out);
}
