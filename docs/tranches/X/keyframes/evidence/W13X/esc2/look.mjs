// SERVED MODEL: claude-opus-5-5 — KF.W13X.esc2 design look (not a gate): the Scene list and trigger on home, DPR 3, both themes; the Share popover at 1440.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, out] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 3 });
    const p = await ctx.newPage();
    await p.goto(`${base}#/`, { waitUntil: "load" });
    await p.waitForSelector('[data-dock-tether="top"] .glass-dock');
    await sleep(2500);
    await p.hover('[data-dock-tether="top"] .glass-dock'); await sleep(800);
    const t = await p.$('[data-dock-tether="top"] [role="combobox"][aria-label="Scene"]');
    await t.screenshot({ path: `${out}/${tag}-home-trigger-${scheme}.png` });
    await t.click(); await sleep(900);
    const lb = await p.$('[role="listbox"]');
    if (lb) await lb.screenshot({ path: `${out}/${tag}-home-list-${scheme}.png` });
    await ctx.close();
}
await b.close();
