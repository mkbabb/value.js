// CHALLENGE-D probe 4 — is the focus-ring contrast a free variable of the
// user's picked color?  Measure the rendered ring vs its adjacent plate for
// several seeds and both hosts.
import { chromium } from "playwright";
const ORIGIN = "http://127.0.0.1:9000";
const DIR = "docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/";

const ARMS = [
    { tag: "dark-default", scheme: "dark", seed: null, host: 0 },
    { tag: "light-default", scheme: "light", seed: null, host: 0 },
    { tag: "light-default-about", scheme: "light", seed: null, host: 1 },
    { tag: "dark-seed-dim", scheme: "dark", seed: "v1:30000:80000:250000", host: 0 },
    { tag: "light-seed-pale", scheme: "light", seed: "v1:95000:30000:100000", host: 0 },
];

const b = await chromium.launch();
for (const a of ARMS) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: a.scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const url = ORIGIN + "/#/" + (a.seed ? `?seed=${encodeURIComponent(a.seed)}` : "");
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3800);
    const box = await page.evaluate((i) => {
        const t = document.querySelectorAll(".space-trigger")[i];
        if (!t) return null;
        t.setAttribute("data-probe", "1");
        const r = t.getBoundingClientRect();
        return { x: Math.max(0, r.x - 22), y: Math.max(0, r.y - 22), width: r.width + 44, height: r.height + 44 };
    }, a.host);
    if (!box) { console.log(JSON.stringify({ arm: a.tag, skipped: "no host " + a.host })); await ctx.close(); continue; }
    await page.screenshot({ path: DIR + `D-ring-${a.tag}-rest.png`, clip: box });
    for (let i = 0; i < 60; i++) {
        await page.keyboard.press("Tab");
        if (await page.evaluate(() => document.activeElement?.hasAttribute("data-probe"))) break;
    }
    await page.waitForTimeout(400);
    const ok = await page.evaluate(() => document.activeElement?.hasAttribute("data-probe"));
    await page.screenshot({ path: DIR + `D-ring-${a.tag}-focus.png`, clip: box });
    const css = await page.evaluate(() => {
        const t = document.querySelector("[data-probe]");
        return {
            boxShadow: getComputedStyle(t).boxShadow,
            accentLive: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
            triggerColor: getComputedStyle(t).color,
        };
    });
    console.log(JSON.stringify({ arm: a.tag, focused: ok, ...css }));
    await ctx.close();
}
await b.close();
