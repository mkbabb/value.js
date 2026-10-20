// OD19 P3 — where does input → swap-start time go? Class timeline of the pane roots after a hash hop.
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://127.0.0.1:8191";
const W = Number(process.argv[3] ?? 1440);
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    const ctx = await browser.newContext({ viewport: { width: W, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/`, { waitUntil: "load" });
    await page.waitForTimeout(12000);
    for (const hash of ["#/gradient", "#/", "#/mix"]) {
        const r = await page.evaluate(async (hash) => {
            const ev = [];
            const t0 = performance.now();
            const T = () => Math.round(performance.now() - t0);
            const mo = new MutationObserver((recs) => {
                for (const m of recs) {
                    const el = m.target;
                    if (!(el instanceof Element)) continue;
                    if (m.type === "attributes" && /vj-enter-(enter|leave)-(from|active|to)/.test(el.className) && el.parentElement?.className.includes("pane-wrapper"))
                        ev.push([T(), "class", el.parentElement.className.match(/pane-wrapper--\w+/)?.[0], String(el.className).match(/vj-enter-\S+/g)?.join(" ")]);
                    if (m.type === "childList" && el.className?.includes?.("pane-wrapper"))
                        ev.push([T(), "child", el.className.match(/pane-wrapper--\w+/)?.[0], `+${m.addedNodes.length}-${m.removedNodes.length}`]);
                }
            });
            mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"], childList: true });
            addEventListener("hashchange", () => ev.push([T(), "hashchange"]), { once: true });
            let frames = 0;
            const tick = () => { frames++; if (performance.now() - t0 < 1500) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
            location.hash = hash;
            await new Promise((r) => setTimeout(r, 1600));
            mo.disconnect();
            return { frames, ev: ev.slice(0, 24) };
        }, hash);
        console.log(hash, JSON.stringify(r));
        await page.waitForTimeout(800);
    }
} finally {
    await browser.close();
}
