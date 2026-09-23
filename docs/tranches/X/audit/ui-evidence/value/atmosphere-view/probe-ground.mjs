// READ-ONLY probe (atmosphere-view): ground luminance timeline after each Medium / Motion switch, + 1:1 texture crops.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
await ctx.addInitScript(`try{ if(!sessionStorage.getItem('s')){sessionStorage.setItem('s',1);localStorage.clear();localStorage.setItem('vueuse-color-scheme','light')} }catch(e){}`);
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => m.type() !== "log" && m.type() !== "debug" && errs.push(m.type() + " " + m.text().slice(0, 200))); page.on("pageerror", (e) => errs.push("PAGEERROR " + e));
await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "domcontentloaded", timeout: 240000 });
await page.locator(".config-console").first().waitFor({ timeout: 60000 }); await wait(4000);
const clip = { x: 1260, y: 700, width: 170, height: 190 };
const lum = async () => { const buf = await page.screenshot({ clip }); return page.evaluate(async (s) => { const i = new Image(); await new Promise((r) => { i.onload = r; i.src = "data:image/png;base64," + s; }); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let L = 0, v = 0, n = 0; const a = []; for (let k = 0; k < d.length; k += 4) { const l = (d[k] + d[k + 1] + d[k + 2]) / 3; a.push(l); L += l; n++; } const m = L / n; for (const l of a) v += (l - m) ** 2; return [+m.toFixed(1), +Math.sqrt(v / n).toFixed(2)]; }, buf.toString("base64")); };
const trig = page.locator(".aurora-row button[role=combobox]");
const pick = async (i, text) => { await trig.nth(i).click(); await wait(400); await page.locator("[role=option]", { hasText: new RegExp(`^\\s*${text}\\s*$`, "i") }).first().click(); };
const res = { tree: tree(), series: {}, errs };
const series = async (name) => { const s = []; const t0 = Date.now(); for (let k = 0; k < 16; k++) { s.push([Date.now() - t0, ...(await lum())]); await wait(250); } res.series[name] = s; };
res.series.baseline = [[0, ...(await lum())]];
for (const med of ["Watercolor", "Vangogh", "Oil Pastel", "Crayon", "Smooth"]) {
  await pick(2, med); await series("medium→" + med);
  await page.screenshot({ path: OUT + `probe-1x-texture-${med.replace(" ", "-").toLowerCase()}.png`, clip: { x: 1240, y: 560, width: 200, height: 330 } });
}
await pick(3, "Still"); await series("motion→Still");
await pick(3, "Breathing"); await series("motion→Breathing");
await pick(0, "Triad"); await series("harmony→Triad");
await pick(1, "Centred"); await series("arrangement→Centred");
writeFileSync(OUT + "probe-ground.json", JSON.stringify(res, null, 0));
console.log(JSON.stringify(res));
await b.close();
