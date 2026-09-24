// SERVED MODEL: claude-opus-5-5 — dump the top dock's interactive roster (role, name) on a scene route.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false }); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:5173/" + (process.argv[2] || "#/cube")); await p.waitForTimeout(3500);
console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("button,[role=combobox],[role=tab],a,[role=menuitem]")].filter((e) => e.offsetParent).map((e) => `${e.tagName.toLowerCase()}|${e.getAttribute("role") || ""}|${e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24)}|${e.closest("[data-dock-tether]")?.getAttribute("data-dock-tether") || ""}`))));
await b.close();
