import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const zone = document.querySelector('[role="button"][aria-label*="Upload image"]');
    const zs = getComputedStyle(zone);
    const probe = document.createElement("div");
    document.body.appendChild(probe);
    const resolve = (expr) => { probe.style.color = ""; probe.style.color = expr; return getComputedStyle(probe).color; };
    const res = {
        easeStandard: cs.getPropertyValue("--ease-standard").trim(),
        primaryRaw: cs.getPropertyValue("--primary").trim(),
        accentLiveRaw: cs.getPropertyValue("--accent-live").trim(),
        resolved: {
            primary: resolve("var(--primary)"),
            accentLive: resolve("var(--accent-live)"),
            wellBg: resolve("var(--well-bg)"),
            cardEdge: resolve("var(--card-edge)"),
            card: resolve("var(--card)"),
        },
        zoneComputed: { bg: zs.backgroundColor, border: zs.borderTopColor, radius: zs.borderTopLeftRadius, shadow: zs.boxShadow },
    };
    const dw = document.querySelector(".dashed-well");
    if (dw) { const ds = getComputedStyle(dw); res.dashedWellComputed = { bg: ds.backgroundColor, border: ds.borderTopWidth + " " + ds.borderTopStyle + " " + ds.borderTopColor, radius: ds.borderTopLeftRadius, shadow: ds.boxShadow }; }
    else { res.dashedWellComputed = "no .dashed-well on this route"; }
    probe.remove();
    return res;
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
