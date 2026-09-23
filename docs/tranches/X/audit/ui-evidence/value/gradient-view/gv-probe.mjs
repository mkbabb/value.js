// Supplementary probe (READ-ONLY): easing authoring stage open, card shadow provenance, selected-stop Remove hover.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const theme = process.env.THEME ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
await ctx.addInitScript(`try{ if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.clear();localStorage.setItem('vueuse-color-scheme','${theme}');} }catch(e){}`);
const page = await ctx.newPage(); page.setDefaultTimeout(45000);
const out = { tree: tree(), theme };
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded", timeout: 600000 });
await page.locator("[data-testid=gradient-stop-bar]").first().waitFor({ timeout: 600000 });
await wait(3000);
out.card = await page.evaluate(() => { const bar = document.querySelector("[data-testid=gradient-stop-bar]"); const chain = []; let e = bar; while (e && e !== document.body) { const s = getComputedStyle(e); if (s.boxShadow !== "none" || String(e.className).includes("pane")) chain.push({ cls: String(e.className).slice(0, 100), shadow: s.boxShadow.slice(0, 200), rad: s.borderRadius, r: [e.getBoundingClientRect().right, e.getBoundingClientRect().bottom].map(Math.round) }); e = e.parentElement; } return chain; });
out.rowOpen = await page.locator(".interval-head").first().getAttribute("aria-expanded");
const tune = page.locator("[aria-label='Author a custom curve']").first();
await tune.scrollIntoViewIfNeeded(); await tune.click(); await wait(1500);
await page.screenshot({ path: OUT + `1440-${theme}-04c-easing-author-stage.png` });
out.stage = await page.evaluate(() => { const s = document.querySelector("[id^=easing-authoring-]"); const r = s?.getBoundingClientRect(); return s ? { box: [r.x, r.y, r.width, r.height].map(Math.round), inner: [...s.querySelectorAll("*")].slice(0, 40).map((e) => e.getAttribute("data-slot") || e.getAttribute("role") || "").filter(Boolean).slice(0, 20), rad: [...s.querySelectorAll("*")].slice(0, 5).map((e) => getComputedStyle(e).borderRadius) } : null; });
await tune.click(); await wait(400);
// select a stop then hover Remove
await page.locator(".rail-handle").first().scrollIntoViewIfNeeded();
await page.locator(".rail-handle").nth(1).click(); await wait(400);
await page.locator(".stop-inspector-remove").hover(); await wait(400);
await page.locator("[data-testid=gradient-stop-bar]").screenshot({ path: OUT + `1440-${theme}-03f-selected-remove-hover-rail.png` }).catch(() => {});
await page.locator("[data-testid=gradient-stop-inspector]").screenshot({ path: OUT + `1440-${theme}-03g-inspector-2stops.png` });
out.inspector = await page.evaluate(() => ({ text: document.querySelector("[data-testid=gradient-stop-inspector]").innerText, removeDisabled: document.querySelector(".stop-inspector-remove").disabled }));
// hover a specimen tile + text-wrap stats on code editor
out.code = await page.evaluate(() => { const e = document.querySelector("[aria-label='Gradient CSS']"); const s = getComputedStyle(e); return { wordBreak: s.wordBreak, overflowWrap: s.overflowWrap, ws: s.whiteSpace, rad: s.borderRadius }; });
writeFileSync(OUT + `probe-log-${theme}.json`, JSON.stringify(out, null, 1));
await b.close(); console.log(JSON.stringify(out, null, 1));
