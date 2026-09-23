// UIA-F visualize-equation-panel — headed Chromium, real GPU. READ-ONLY on the app trees.
// Reuses the seeded workspace slug from the sibling seat (visualize-view-options-popover/seed.txt); no API writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const slug = process.env.SEED || readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, color: cs.color, font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 40), pad: cs.padding, cls: el.className?.toString().slice(0, 160) }; };
    const panel = q(".eq-panel");
    return {
      theme: document.documentElement.className, url: location.pathname, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      panel: box(panel), panelRole: panel?.getAttribute("role"), panelAria: panel && [...panel.attributes].map((a) => a.name + "=" + a.value).join(" ").slice(0, 300),
      header: box(panel?.querySelector(":scope > *")), title: box([...(panel?.querySelectorAll("span") ?? [])].find((s) => s.textContent.trim() === "Equation")),
      metric: box(panel?.querySelector("[class*=metric]")), metricText: panel?.querySelector("[class*=metric]")?.textContent.trim(),
      close: box(q("[aria-label='Close equation panel']")),
      pillGroup: box(panel?.querySelector("[role=group][aria-label=Notation]")),
      pills: [...(panel?.querySelectorAll(".notation-pill") ?? [])].map((b) => ({ text: b.textContent.trim().replace(/\s+/g, " "), pressed: b.getAttribute("aria-pressed"), ...box(b) })),
      slider: box(panel?.querySelector(".slider-control")), label: box(panel?.querySelector(".slider-label")),
      num: box(panel?.querySelector(".inline-number")), numInput: box(panel?.querySelector(".inline-number input")), numVal: panel?.querySelector(".inline-number input")?.value,
      track: box(panel?.querySelector(".slider-track-host")), thumb: box(panel?.querySelector("[role=slider]")), sliderVal: panel?.querySelector("[role=slider]")?.getAttribute("aria-valuenow"),
      katex: box(panel?.querySelector(".eq-katex")), katexScroll: (() => { const s = panel?.querySelector(".max-h-32"); return s ? { sw: s.scrollWidth, cw: s.clientWidth, sh: s.scrollHeight, ch: s.clientHeight } : null; })(),
      spinner: !!panel?.querySelector(".animate-spin"), err: panel?.querySelector(".text-red-400")?.textContent,
      dock: box(q(".controls-dock-anchor .glass-dock")), eqBtn: box(q("[aria-label='Equation']")), eqBtnAttrs: q("[aria-label='Equation']") && [...q("[aria-label='Equation']").attributes].map((a) => a.name + "=" + a.value).join(" ").slice(0, 240),
      canvas: box(q(".canvas-container canvas")),
      active: document.activeElement?.outerHTML.slice(0, 160),
    };
  });
}
async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
  const p = metrics[name].panel;
  if (p) {
    const x0 = Math.max(0, p.x - 24), y0 = Math.max(0, Math.min(p.y, metrics[name].dock?.y ?? p.y) - 24);
    const x1 = Math.min(metrics[name].vw, Math.max(p.x + p.w, (metrics[name].dock?.x ?? 0) + (metrics[name].dock?.w ?? 0)) + 24);
    const y1 = Math.min(metrics[name].vh, p.y + p.h + 24);
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
  }
}
async function openPanel(page, vp) {
  const dock = page.locator(".controls-dock-anchor .glass-dock").first();
  if (vp === "d") { await dock.hover(); await page.waitForTimeout(700); await page.locator("[aria-label='Equation']").first().click(); }
  else { await dock.tap().catch(() => dock.click()); await page.waitForTimeout(700); await page.locator("[aria-label='Equation']").first().tap().catch(() => page.locator("[aria-label='Equation']").first().click()); }
  await page.locator(".eq-panel").waitFor({ timeout: 8000 });
  await page.waitForTimeout(1200);
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await page.locator(".controls-dock-anchor").waitFor({ timeout: 60000 }).catch((e) => errors.push(`${vp}-${theme} no dock ` + e.message));
  await page.waitForTimeout(1500);
  if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) await t.first().click(); await page.waitForTimeout(600); }
  const tag = `${vp}-${theme}`;
  try {
    await openPanel(page, vp); await shot(page, `${tag}-1-open`);
    // dock collapses away from pointer: move off
    if (vp === "d") { await page.mouse.move(900, 700); await page.waitForTimeout(2500); await shot(page, `${tag}-1b-open-dock-rest`); }
    // Terms slider scrubbed: drag the thumb to ~75%
    const tr = await page.locator(".eq-panel .slider-track-host").boundingBox();
    if (tr) {
      const y = tr.y + tr.height / 2;
      if (vp === "d") { await page.mouse.move(tr.x + tr.width * 0.2, y); await page.mouse.down(); await page.mouse.move(tr.x + tr.width * 0.75, y, { steps: 12 }); await page.waitForTimeout(150); await shot(page, `${tag}-2a-scrub-midrag`); await page.mouse.up(); }
      else { await page.touchscreen.tap(tr.x + tr.width * 0.75, y); await page.waitForTimeout(100); await shot(page, `${tag}-2a-scrub-tap`); }
      await page.waitForTimeout(1800); await shot(page, `${tag}-2-scrubbed-settled`);
      // max terms: overflow of the latex
      if (vp === "d") { await page.locator(".eq-panel [role=slider]").focus(); await page.keyboard.press("End"); } else { await page.touchscreen.tap(tr.x + tr.width - 2, y); }
      await page.waitForTimeout(2000); await shot(page, `${tag}-3-terms-max`);
    }
    // other notation
    const pills = page.locator(".eq-panel .notation-pill");
    const n = await pills.count();
    if (n > 1) { await pills.nth(n - 1).click(); await page.waitForTimeout(2000); await shot(page, `${tag}-4-notation-last`); }
    if (vp === "d" && theme === "light") {
      // hover a pill + hover close
      await pills.nth(0).hover(); await shot(page, `${tag}-5-pill-hover`);
      await page.locator("[aria-label='Close equation panel']").hover(); await shot(page, `${tag}-6-close-hover`);
      // keyboard: Tab into the panel from the pill
      await pills.nth(0).focus(); await page.keyboard.press("Tab"); await shot(page, `${tag}-7-kbd-focus-next`);
      // Escape with focus on body: does it close?
      await page.locator("body").click({ position: { x: 1300, y: 850 } }).catch(() => {}); await page.waitForTimeout(500);
      await page.keyboard.press("Escape"); await page.waitForTimeout(600);
      metrics[`${tag}-8-esc-from-body`] = { panelStillOpen: await page.locator(".eq-panel").count() };
      if (await page.locator(".eq-panel").count()) { await pills.nth(0).focus(); await page.keyboard.press("Escape"); await page.waitForTimeout(600); metrics[`${tag}-8b-esc-from-pill`] = { panelStillOpen: await page.locator(".eq-panel").count() }; }
    } else {
      await page.locator("[aria-label='Close equation panel']").click(); await page.waitForTimeout(700);
      metrics[`${tag}-9-closed`] = { panelStillOpen: await page.locator(".eq-panel").count() };
      await page.screenshot({ path: OUT + `${tag}-9-closed.png` });
    }
  } catch (e) { errors.push(`${tag} flow ${e.message.slice(0, 240)}`); await page.screenshot({ path: OUT + tag + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors");
