// Probe: do the WatercolorDot swatches / add-slot render as buttons with names and live click handlers?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await ctx.addInitScript(`(() => { try { if (sessionStorage.getItem('s')) return; sessionStorage.setItem('s','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme','light'); localStorage.setItem('color-picker', JSON.stringify({ inputColor: 'oklch(0.65 0.2 30)', savedColors: ['#e63946','#f1faee','#a8dadc','#457b9d'] })); } catch (e) {} })();`);
const page = await ctx.newPage();
try { await page.goto("http://localhost:9000/#/palettes", { waitUntil: "commit", timeout: 300000 }); } catch (e) { console.log("GOTO-WARN", String(e).slice(0, 100)); }
await page.getByPlaceholder("Search your palettes...").waitFor({ timeout: 300000 });
await page.waitForTimeout(2000);
const dom = await page.evaluate(() => [...document.querySelectorAll(".dashed-well [data-testid=watercolor-swatch]")].map((d) => { const w = d.parentElement; return `${w.tagName.toLowerCase()} > ${d?.tagName.toLowerCase()} role=${d?.getAttribute("role")} tag=${d?.getAttribute("tag")} aria-label=${d?.getAttribute("aria-label")} tabindex=${d?.getAttribute("tabindex")}`; }));
console.log("SWATCH-ROW", JSON.stringify(dom, null, 1));
const count = async () => (await page.locator(".dashed-well").first().innerText()).match(/(\d+) colors?/)?.[1];
const before = await count();
const addSlot = page.locator(".dashed-well .add-slot-ghost").first();
console.log("add-slot tag", await addSlot.evaluate((e) => `${e.tagName} aria=${e.getAttribute("aria-label")} tag-attr=${e.getAttribute("tag")}`));
const bb = await addSlot.boundingBox(); await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
console.log("add-slot listeners-bound?", await addSlot.evaluate((e) => Object.keys(e).filter((k) => k.startsWith("_vei")).join(",") || "none"));
await page.waitForTimeout(900);
console.log("count before/after add click", before, await count());
const sw = page.locator(".dashed-well .swatch-row > *").nth(2);
await sw.hover(); await page.waitForTimeout(900);
const panel = await page.evaluate(() => { const p = document.querySelector(".floating-panel"); if (!p) return "no .floating-panel"; const cs = getComputedStyle(p); const r = p.getBoundingClientRect(); return `rect=${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} bg=${cs.backgroundColor} radius=${cs.borderRadius} shadow=${cs.boxShadow.slice(0, 50)} backdrop=${cs.backdropFilter} position=${cs.position} aria-hidden=${p.getAttribute("aria-hidden")} buttons=${p.querySelectorAll("button").length}`; });
console.log("HOVER-PANEL", panel);
await page.screenshot({ path: `${OUT}swatchhover__1440__light.png` });
await page.setViewportSize({ width: 1440, height: 900 });
await page.evaluate(() => document.documentElement.classList.add("dark"));
await b.close();
