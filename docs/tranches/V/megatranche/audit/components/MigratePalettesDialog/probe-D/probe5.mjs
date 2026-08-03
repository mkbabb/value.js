// CHALLENGE-D probe 5 — the 320px collision, the scrim, and the alignment fork.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const seed = `
try {
  localStorage.setItem('vueuse-color-scheme','light');
  localStorage.setItem('palette-user-slug','quiet-amber-river-fox');
  localStorage.setItem('palette-user-token','probe-token');
  localStorage.setItem('color-palettes', JSON.stringify({version:1,palettes:[0,1,2].map(i=>({id:'p'+i,name:'Probe '+i,slug:'probe-'+i,colors:[{css:'oklch(70% 0.18 30)',position:0}],createdAt:'2026-01-01T00:00:00.000Z',updatedAt:'2026-01-01T00:00:00.000Z',isLocal:true}))}));
} catch(e){}`;

const out = {};
const browser = await webkit.launch();
for (const arm of [
    { id: "w320", vp: { width: 320, height: 640 } },
    { id: "w390", vp: { width: 390, height: 664 } },
    { id: "w1440", vp: { width: 1440, height: 900 } },
]) {
    const ctx = await browser.newContext({
        viewport: arm.vp,
        colorScheme: "light",
        hasTouch: arm.vp.width < 900,
        isMobile: arm.vp.width < 900,
    });
    await ctx.addInitScript(seed);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2400);
    try {
        if (arm.vp.width < 1024) {
            await page.click('[aria-label="Menu"]');
        } else {
            await page.click('[data-o18="profile-trigger"]');
        }
        await page.waitForTimeout(350);
        await page.click("text=Regenerate slug");
        await page.waitForTimeout(700);
        out[arm.id] = await page.evaluate(() => {
            const r2 = (n) => Math.round(n * 100) / 100;
            const dlg = document.querySelector('[role="dialog"]');
            const title = dlg.querySelector("h2,[data-slot='dialog-title']");
            const desc = dlg.querySelector("p,[data-slot='dialog-description']");
            const close = [...dlg.querySelectorAll("button")].find((b) =>
                /close/i.test(b.getAttribute("aria-label") || b.textContent || ""),
            );
            const actions = [...dlg.querySelectorAll("button")].filter((b) => b !== close);
            const tr = title.getBoundingClientRect();
            const cr = close.getBoundingClientRect();
            // overlay / scrim: the sibling of the content inside the portal
            const portal = dlg.closest("[data-reka-portal]") || document.body;
            const cands = [...portal.querySelectorAll("div")].filter((d) => {
                const s = getComputedStyle(d);
                return s.position === "fixed" && d !== dlg && !d.contains(dlg);
            });
            const scrim = cands[0] || null;
            return {
                viewport: { w: innerWidth, h: innerHeight },
                dialogRect: (() => {
                    const r = dlg.getBoundingClientRect();
                    return { x: r2(r.x), w: r2(r.width), y: r2(r.y), h: r2(r.height) };
                })(),
                titleRect: { x: r2(tr.x), right: r2(tr.right), w: r2(tr.width) },
                closeRect: { x: r2(cr.x), right: r2(cr.right), w: r2(cr.width), h: r2(cr.height) },
                titleClosePx: r2(cr.x - tr.right), // negative == overlap
                titleAlign: getComputedStyle(title).textAlign,
                descAlign: getComputedStyle(desc).textAlign,
                actionAlign: actions.map((b) => getComputedStyle(b).justifyContent),
                actionLabelWraps: actions.map((b) => {
                    const r = b.getBoundingClientRect();
                    // the label is the trailing text node; detect wrap by height
                    return r.height > parseFloat(getComputedStyle(b).lineHeight) * 1.6;
                }),
                scrim: scrim
                    ? {
                          bg: getComputedStyle(scrim).backgroundColor,
                          backdrop:
                              getComputedStyle(scrim).backdropFilter ||
                              getComputedStyle(scrim).webkitBackdropFilter,
                          cls: scrim.className.toString().slice(0, 120),
                      }
                    : null,
                bodyScrollLocked: getComputedStyle(document.body).overflow,
            };
        });
    } catch (e) {
        out[arm.id] = { error: String(e).slice(0, 200) };
    }
    await ctx.close();
}
await browser.close();
writeFileSync(`${HERE}/telemetry5.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
