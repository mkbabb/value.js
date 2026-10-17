// SERVED MODEL: claude-opus-5-5
// X.W12U.o5c — the band-floor read: at each viewport, the settled dock band's height, the producer pill
// (.glass-dock) height, and the floor tokens (--dock-band-min-h, --dock-h) as computed. A band whose floor is
// below the pill would grow when the post-paint dock mounts (a layout shift). Usage: node band-floor-probe.mjs <origin>
import { chromium } from "@playwright/test";
const [origin] = process.argv.slice(2);
const VPS = [[1280, 720], [1440, 900], [1024, 768], [768, 1024], [390, 844], [360, 780], [430, 932], [844, 390], [932, 430], [667, 375]];
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    for (const [w, h] of VPS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h } });
        try {
            const page = await ctx.newPage();
            await page.goto(origin + "/");
            await page.locator("nav.dock-band .glass-dock").waitFor({ state: "attached", timeout: 20000 });
            await page.waitForTimeout(1200);
            const r = await page.evaluate(() => {
                const nav = document.querySelector("nav.dock-band");
                const d = nav.querySelector(".glass-dock");
                const probe = document.createElement("div");
                probe.style.cssText = "position:absolute;visibility:hidden;height:var(--dock-band-min-h);width:var(--dock-h)";
                document.body.appendChild(probe);
                const out = { band: nav.offsetHeight, bandMinH: getComputedStyle(nav).minHeight, pill: Math.round(d.getBoundingClientRect().height * 100) / 100, floorPx: probe.offsetHeight, dockHPx: probe.offsetWidth };
                probe.remove();
                return out;
            });
            console.log(`[band ${w}x${h}] ${JSON.stringify(r)} ${r.floorPx >= r.band ? "floor>=band" : "BAND>FLOOR"}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
