// Follow-up probe: header focus ring + whether a real click on the expanded header (390) reaches it.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
const tree = `${sh("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD")} dirty=${sh("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l")}`;
const res = { tree };
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const vp of [{ n: "1440", w: 1440, h: 900 }, { n: "390", w: 390, h: 844 }]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: "light", hasTouch: vp.n === "390" });
    ctx.setDefaultTimeout(240000); ctx.setDefaultNavigationTimeout(420000);
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/?debug=1", { waitUntil: "domcontentloaded" });
    await p.locator(".debug-overlay").waitFor(); await p.locator(".spectrum-picker").first().waitFor(); await p.waitForTimeout(3000);
    // keyboard focus: Tab until the header is focused
    let hops = 0, focused = false;
    for (; hops < 60 && !focused; hops++) { await p.keyboard.press("Tab"); focused = await p.evaluate(() => !!document.activeElement?.classList.contains("debug-header")); }
    const ring = await p.evaluate(() => { const h = document.querySelector(".debug-header"); const c = getComputedStyle(h); return { focusVisible: h.matches(":focus-visible"), outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor, shadow: c.boxShadow }; });
    await p.screenshot({ path: `${OUT}probe-focus__${vp.n}.png`, clip: { x: 0, y: vp.h - 60, width: 160, height: 60 } });
    // expand via keyboard, then real mouse click on header center
    await p.keyboard.press("Enter"); await p.waitForTimeout(600);
    const hb = await p.locator(".debug-header").boundingBox();
    const before = await p.evaluate(() => document.querySelector(".debug-header").getAttribute("aria-expanded"));
    await p.mouse.click(hb.x + hb.width - 12, hb.y + hb.height / 2); await p.waitForTimeout(600);
    const after = await p.evaluate(() => document.querySelector(".debug-header")?.getAttribute("aria-expanded"));
    await p.screenshot({ path: `${OUT}probe-click-header__${vp.n}.png` });
    res[vp.n] = { tabHops: hops, focused, ring, headerBox: hb, expandedBefore: before, expandedAfterRealClickOnToggle: after };
    await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-focus-occlusion.json`, JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));
