import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const res = await page.evaluate(async () => {
    const ink = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/ink.ts");
    const { certifyAccentInk, resolveSurfaceLightness } = ink;
    // rung lightnesses, static producer model, light scheme, mid ambient
    const ambient = 0.62, dark = false;
    const Lresting = resolveSurfaceLightness("resting", ambient, dark, undefined, undefined);
    const Lfloating = resolveSurfaceLightness("floating", ambient, dark, undefined, undefined);
    const picks = [
        "oklch(0.75 0.15 30)", "oklch(0.62 0.2 140)", "oklch(0.55 0.18 250)",
        "oklch(0.85 0.1 90)", "oklch(0.45 0.22 320)", "rgb(255 0 0)", "rgb(0 128 255)",
    ];
    const rows = picks.map((p) => {
        const once = certifyAccentInk(p, Lfloating);            // the CONTRACT: raw pick -> floating
        const twice = certifyAccentInk(certifyAccentInk(p, Lresting), Lfloating); // what SHIPS
        return { pick: p, contract_once: once, shipped_twice: twice, same: once === twice };
    });
    return { Lresting: +Lresting.toFixed(4), Lfloating: +Lfloating.toFixed(4), rows };
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
