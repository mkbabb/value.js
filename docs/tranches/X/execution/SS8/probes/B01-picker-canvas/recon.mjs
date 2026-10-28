// Recon: confirm readout + spectrum handles at #/ (dev :9000).
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:9000";
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(BASE + "/#/?space=rgb&color=rgb(200%2050%2050)", { waitUntil: "networkidle" });
    await page.waitForSelector(".spectrum-picker", { timeout: 20000 });
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
        const figs = [...document.querySelectorAll(".readout-fig")].map((e) => ({
            label: e.getAttribute("aria-label"), html: e.innerHTML.slice(0, 120),
        }));
        const sp = document.querySelector(".spectrum-picker");
        const dot = document.querySelector(".spectrum-dot");
        const cs = getComputedStyle(sp);
        return {
            url: location.href, figs,
            spRect: sp.getBoundingClientRect().toJSON(),
            spClass: sp.className, spOutline: [cs.outlineStyle, cs.outlineWidth, cs.outlineColor],
            spTouch: cs.touchAction,
            dotPos: getComputedStyle(dot).position, dotClass: dot.className,
            arrival: document.querySelector(".pane-shell")?.getAttribute("data-arrival"),
            anims: document.getAnimations().map((a) => a.animationName).filter(Boolean).slice(0, 10),
        };
    });
    console.log(JSON.stringify({ ...r, errs }, null, 1));
    await ctx.close();
} finally {
    await browser.close();
}
