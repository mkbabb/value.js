// UIA-F visualize-animation-more-menu — headed Chromium, real GPU. READ-ONLY on the app trees.
// Reuses the sibling seat's seeded workspace (SEED env or the default slug). The only state change is
// the page's own client-side easing/speed pick (animation store); no API write.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const slug = process.env.SEED || "smoky-nesting-ruby-cat";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 60), border: cs.borderTopWidth + " " + cs.borderTopColor, pad: cs.padding, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 30), color: cs.color, cls: el.className?.toString().slice(0, 120) }; };
    const menu = document.querySelector("[role=menu]");
    const listbox = document.querySelector("[role=listbox]");
    const items = menu ? [...menu.querySelectorAll("[role=menuitemradio],[role=menuitem],[role=group],[role=separator],[id]")].slice(0, 20).map((e) => ({ role: e.getAttribute("role"), text: e.textContent.trim().slice(0, 30), checked: e.getAttribute("aria-checked"), hl: e.hasAttribute("data-highlighted"), ...box(e) })) : null;
    const opts = listbox ? [...listbox.querySelectorAll("[role=option]")].map((e) => ({ text: e.textContent.trim(), sel: e.getAttribute("aria-selected"), ...box(e) })) : null;
    const curves = menu ? [...menu.querySelectorAll("svg")].slice(0, 3).map(box) : null;
    const trig = document.querySelectorAll("[aria-label='Playback speed']");
    return { theme: document.documentElement.className, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      dock: box(document.querySelector(".animation-dock")), dockState: document.querySelector(".animation-dock")?.className.slice(0, 120),
      more: box(document.querySelector("[aria-label='More options']")),
      speedTriggers: [...trig].map(box), menu: box(menu), menuOverflow: menu ? { sh: menu.scrollHeight, ch: menu.clientHeight } : null,
      items, curves, listbox: box(listbox), opts, active: document.activeElement?.outerHTML.slice(0, 160),
      tooltips: [...document.querySelectorAll("[role=tooltip]")].map((t) => t.textContent.trim()) };
  });
}
async function shot(page, name, target) {
  await page.waitForTimeout(650);
  await page.screenshot({ path: OUT + name + ".png" });
  const m = metrics[name] = await measure(page);
  const boxes = [m.dock, m.menu, m.listbox].filter(Boolean);
  if (boxes.length) {
    const x0 = Math.max(0, Math.min(...boxes.map((b) => b.x)) - 40), y0 = Math.max(0, Math.min(...boxes.map((b) => b.y)) - 40);
    const x1 = Math.min(m.vw, Math.max(...boxes.map((b) => b.x + b.w)) + 40), y1 = Math.min(m.vh, Math.max(...boxes.map((b) => b.y + b.h)) + 40);
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
  }
}
async function expandDock(page, vp) {
  const dock = page.locator(".animation-dock").first();
  if (vp === "d") { await dock.hover(); } else { await dock.locator("[aria-label='Expand dock']").first().tap().catch((e) => errors.push("expand tap " + e.message.slice(0, 120))); }
  await page.waitForTimeout(800);
}
async function press(page, vp, loc) { if (vp === "d") { await loc.hover(); await loc.click(); } else { await loc.tap(); } }

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`;
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${tag} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${tag} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await page.locator(".animation-dock").waitFor({ timeout: 60000 }).catch((e) => errors.push(`${tag} no dock ` + e.message));
  await page.waitForTimeout(1500);
  if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) await t.first().click(); await page.waitForTimeout(600); }
  await shot(page, `${tag}-00-collapsed`);
  try {
    await expandDock(page, vp); await shot(page, `${tag}-0-dock-expanded`);
    const more = page.locator(".animation-dock [aria-label='More options']").first();
    await press(page, vp, more); await shot(page, `${tag}-1-more-open`);
    // hover / keyboard highlight on an easing row
    const expo = page.getByRole("menuitemradio", { name: /Exponential/ }).first();
    if (vp === "d") { await expo.hover(); await shot(page, `${tag}-2-row-hover`); }
    else { await page.keyboard.press("ArrowDown"); await shot(page, `${tag}-2-row-focus`); }
    await press(page, vp, expo); await page.waitForTimeout(400);
    await shot(page, `${tag}-3-after-select`); // does the menu close on radio select?
    if (!(await page.locator("[role=menu]").count())) { await expandDock(page, vp); await press(page, vp, more); }
    await shot(page, `${tag}-4-expo-selected`);
    if (vp === "m") {
      // compact SpeedSelect inside the menu
      const sp = page.locator("[role=menu] [aria-label='Playback speed']").first();
      if (await sp.count()) { await sp.tap(); await shot(page, `${tag}-5-menu-speed-open`);
        const o = page.getByRole("option", { name: /^2/ }).first(); if (await o.count()) { await o.tap(); await shot(page, `${tag}-6-menu-speed-picked`); } }
      else errors.push(`${tag} no speed row in menu`);
    } else {
      await page.keyboard.press("ArrowDown"); await shot(page, `${tag}-5-keyboard-arrow`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(300);
      await expandDock(page, vp);
      const sp = page.locator(".animation-dock [aria-label='Playback speed']").first();
      await press(page, vp, sp); await shot(page, `${tag}-6-speed-open`);
      const o = page.getByRole("option", { name: /^2/ }).first(); if (await o.count()) { await o.hover(); await shot(page, `${tag}-7-speed-option-hover`); await o.click(); await shot(page, `${tag}-8-speed-picked`); }
    }
    // restore defaults so the seed stays neutral for other seats (client state only)
  } catch (e) { errors.push(`${tag} flow ${e.message.slice(0, 220)}`); await page.screenshot({ path: OUT + tag + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors");
