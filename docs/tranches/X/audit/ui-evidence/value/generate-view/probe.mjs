// generate-view supplementary probe — READ-ONLY (local-first store seeded in a fresh context; no API writes).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
import { existsSync, readFileSync } from "node:fs";
const log = existsSync(OUT + "probe-log.json") ? JSON.parse(readFileSync(OUT + "probe-log.json")) : { tree: tree(), at: new Date().toISOString(), res: {} };
const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const tag = `${w}-${theme}`; if (process.env.ONLY && process.env.ONLY !== tag) continue; const R = (log.res[tag] = { errs: [], net: [] });
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: theme, hasTouch: w < 500, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { if (sessionStorage.getItem("__s")) return; sessionStorage.setItem("__s", "1"); localStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  p.on("console", (m) => m.type() === "error" && R.errs.push(m.text().slice(0, 200)));
  p.on("pageerror", (e) => R.errs.push("PAGEERROR " + String(e).slice(0, 200)));
  p.on("request", (q) => { if (q.method() !== "GET") R.net.push(`${q.method()} ${q.url().slice(0, 100)}`); });
  const shot = async (n, o = {}) => { await p.screenshot({ path: `${OUT}${tag}-${n}.png`, ...o }); (R.frames ??= []).push({ f: `${tag}-${n}.png`, tree: tree() }); };
  try {
  await p.goto("http://localhost:9000/#/generate", { waitUntil: "commit", timeout: 120000 });
  await p.locator("[data-generate-plate]").waitFor({ timeout: 150000 }); await wait(3500);
  const trig = p.locator("[data-generate-plate] ~ div button[role=combobox]");
  R.triggerCount = await trig.count();
  // Preset select open (the pane's own trigger, not the dock view-select)
  await trig.nth(0).click(); await wait(800);
  await shot("07-preset-open");
  R.presetList = await p.evaluate(() => { const lb = document.querySelector("[role=listbox]"); const r = lb.getBoundingClientRect(); const trig = document.querySelectorAll("[data-generate-plate] ~ div button[role=combobox]")[0].getBoundingClientRect(); const s = getComputedStyle(lb.closest("[data-slot=select-content]") ?? lb); return { box: [r.x, r.y, r.width, r.height].map(Math.round), trigBox: [trig.x, trig.y, trig.width, trig.height].map(Math.round), rad: s.borderRadius, opts: [...lb.querySelectorAll("[role=option]")].map((o) => { const b = o.getBoundingClientRect(); return { t: o.textContent.trim().slice(0, 40), sel: o.getAttribute("aria-selected"), inView: b.bottom <= r.bottom && b.top >= r.top, rad: getComputedStyle(o).borderRadius }; }), scrollBtns: document.querySelectorAll("[data-slot*=scroll], [class*=scroll-button]").length }; });
  await p.keyboard.press("ArrowDown"); await wait(300); await shot("07b-preset-kbd");
  await p.keyboard.press("Enter"); await wait(600);
  R.afterPick = await p.evaluate(() => ({ preset: document.querySelectorAll("[data-generate-plate] ~ div button[role=combobox]")[0].textContent.trim(), seed: document.querySelector("[data-generate-plate] p").textContent.trim() }));
  R.listboxStillOpen = await p.locator("[role=listbox]").count(); await shot("07c-after-enter");
  try { await trig.nth(1).click({ timeout: 5000 }); await wait(800); await shot("08-harmony-open"); await p.keyboard.press("Escape"); await wait(400); } catch (e) { R.errs.push("harmony click: " + e.message.split("\n").slice(0,6).join(" | ").slice(0,500)); await p.keyboard.press("Escape"); await wait(400); }
  // keyboard focus tour through the plate
  await p.locator("[data-generate-plate] input").focus();
  R.focusTour = [];
  for (let i = 0; i < 9; i++) {
    await p.keyboard.press("Tab"); await wait(120);
    R.focusTour.push(await p.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); return { tag: a.tagName, aria: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 20), outline: `${s.outlineStyle} ${s.outlineWidth}`, ring: s.boxShadow.slice(0, 70), cls: String(a.className).slice(0, 60) }; }));
    if (i === 3 || i === 4) await p.locator("[data-generate-plate]").screenshot({ path: `${OUT}${tag}-09-focus-${i}.png` });
  }
  // swatch click → copy: any feedback?
  await p.evaluate(() => navigator.clipboard.writeText("SENTINEL").catch(() => {})); { const bb = await p.locator(".generate-swatch").first().boundingBox(); await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); } await wait(250);
  await p.locator("[data-generate-plate]").screenshot({ path: `${OUT}${tag}-10-swatch-copied.png` });
  R.swatchCopy = await p.evaluate(async () => ({ clip: await navigator.clipboard.readText().catch((e) => "ERR " + e.message), live: [...document.querySelectorAll("[role=status],[aria-live],[data-copied],[data-state=copied]")].map((e) => e.textContent.trim().slice(0, 60)).filter(Boolean) }));
  // rename the plate → save → does the saved palette carry the name?
  const name = p.locator("[data-generate-plate] input");
  await name.fill("Audit Rename"); await wait(200);
  await p.locator('[data-generate-plate] button[aria-label="Save palette"]').click(); await wait(900);
  await p.locator('[data-generate-plate] button[aria-label="Save palette"]').click(); await wait(900);
  R.saved = await p.evaluate(() => { try { return JSON.parse(localStorage.getItem("color-palettes")).palettes.map((x) => x.name); } catch (e) { return "ERR " + e.message; } });
  R.cards = await p.evaluate(() => [...document.querySelectorAll("[role=article]")].map((e) => e.getAttribute("aria-label")));
  await shot("11-renamed-saved-twice");
  if (w < 500) await shot("11b-renamed-saved-twice-full", { fullPage: true });
  // count slider to 12 → strip/swatch/plate wrap
  const sl = p.locator("[aria-label='Color count'] [role=slider], [role=slider][aria-label='Color count']").first();
  await (await sl.count() ? sl : p.locator("[role=slider]").last()).focus(); await p.keyboard.press("End"); await wait(600);
  await p.locator("[data-generate-plate]").screenshot({ path: `${OUT}${tag}-12-count-12.png` });
  await p.keyboard.press("Home"); await wait(600);
  await p.locator("[data-generate-plate]").screenshot({ path: `${OUT}${tag}-13-count-1.png` });
  R.countEnds = await p.evaluate(() => ({ badge: document.querySelector("[data-generate-plate] .badge-atom")?.textContent.trim(), swatches: document.querySelectorAll(".generate-swatch").length }));
  } catch (e) { R.fatal = e.message.split("\n").filter(l => !l.includes("waiting") && !l.includes("retrying") && !l.includes("scroll") && !l.includes("visible")).slice(0, 8).join(" | ").slice(0, 700); }
  writeFileSync(OUT + "probe-log.json", JSON.stringify(log, null, 1));
  await ctx.close();
}
writeFileSync(OUT + "probe-log.json", JSON.stringify(log, null, 1));
await b.close(); console.log("ok");
