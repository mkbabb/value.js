// UIA-F visualize-view-options-popover — headed Chromium, real GPU. READ-ONLY on the app trees.
// The only API write: ONE synthetic star PNG uploaded through the page's own file input (dev DB) to
// reach /w/<slug>; reused via SEED env var on reruns. No publish, no edit, no save.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

let slug = process.env.SEED;
if (!slug) {
  const ctx = await browser.newContext({ viewport: VPS.d });
  const page = await ctx.newPage();
  await page.goto(BASE + "/visualize", { waitUntil: "networkidle" });
  const png = await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 512; const g = c.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, 512, 512); g.fillStyle = "#000"; g.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 90 : 210, a = -Math.PI / 2 + i * Math.PI / 5; g.lineTo(256 + r * Math.cos(a), 256 + r * Math.sin(a)); }
    g.closePath(); g.fill(); return c.toDataURL("image/png").split(",")[1];
  });
  await page.locator("[data-testid=image-file-input]").setInputFiles({ name: "uia-star.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
  await page.waitForURL(/\/w\/[^/]+/, { timeout: 60000 });
  slug = page.url().split("/w/")[1].split(/[?#]/)[0];
  await page.locator(".controls-dock-anchor").waitFor({ timeout: 90000 });
  await ctx.close();
}
writeFileSync(OUT + "seed.txt", slug + "\n");

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), pad: cs.padding, cls: el.className?.toString().slice(0, 140) }; };
    const pop = [...document.querySelectorAll("[data-reka-popper-content-wrapper] > *, [role=dialog], [role=group][data-state]")].find((e) => e.querySelector("[aria-label='Image overlay']"));
    const btns = [...document.querySelectorAll("[aria-label='Image overlay'],[aria-label='Contour trace']")].map((b) => ({ label: b.getAttribute("aria-label"), pressed: b.getAttribute("aria-pressed"), dataActive: b.getAttribute("data-active") ?? b.getAttribute("data-state"), ...box(b), color: getComputedStyle(b).color }));
    const tips = [...document.querySelectorAll("[role=tooltip]")].map((t) => ({ text: t.textContent.trim(), ...box(t.parentElement) }));
    return {
      theme: document.documentElement.className, url: location.pathname,
      dock: box(q(".controls-dock-anchor .glass-dock")), dockExpanded: q(".controls-dock-anchor .glass-dock")?.getAttribute("data-expanded") ?? q(".controls-dock-anchor .glass-dock")?.getAttribute("data-state"),
      anchor: box(q(".controls-dock-anchor")), header: box(q("header")),
      eye: box(q("[aria-label='View options']")), eyeAttrs: q("[aria-label='View options']") && [...q("[aria-label='View options']").attributes].map((a) => a.name + "=" + a.value).join(" ").slice(0, 300),
      viewDot: [...document.querySelectorAll(".view-dot")].map(box),
      popover: box(pop), popoverRole: pop?.getAttribute("role"), popoverInner: box(pop?.firstElementChild), btns, tips,
      canvas: box(q(".canvas-container canvas")), vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      active: document.activeElement?.outerHTML.slice(0, 140),
    };
  });
}
async function shot(page, name, clip) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
  const d = metrics[name].popover || metrics[name].dock;
  if (d) {
    const x0 = Math.max(0, Math.min(d.x, metrics[name].dock?.x ?? d.x) - 60), y0 = Math.max(0, Math.min(d.y, metrics[name].dock?.y ?? d.y) - 60);
    const x1 = Math.min(metrics[name].vw, Math.max(d.x + d.w, (metrics[name].dock?.x ?? 0) + (metrics[name].dock?.w ?? 0)) + 60);
    const y1 = Math.min(metrics[name].vh, Math.max(d.y + d.h, (metrics[name].dock?.y ?? 0) + (metrics[name].dock?.h ?? 0)) + 90);
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
  }
}
async function openPopover(page, vp) {
  const dock = page.locator(".controls-dock-anchor .glass-dock").first();
  if (vp === "d") { await dock.hover(); await page.waitForTimeout(700); await page.locator("[aria-label='View options']").hover(); }
  else { await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap({ timeout: 8000 }).catch((e) => errors.push("expand-tap " + e.message.slice(0, 120))); await page.waitForTimeout(700); await page.locator("[aria-label='View options']").tap({ timeout: 8000 }); }
  await page.waitForTimeout(600);
}
async function toggle(page, vp, label) {
  const b = page.locator(`[aria-label='${label}']`).first();
  if (vp === "d") { await b.hover(); await b.click(); } else { await b.tap(); }
}

for (const vp of (process.env.VPS || "d,m").split(",")) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await page.locator(".controls-dock-anchor").waitFor({ state: "attached", timeout: 60000 }).catch((e) => errors.push(`${vp}-${theme} no dock ` + e.message));
  await page.waitForTimeout(1500);
  if (vp === "m") { let t = page.getByRole("tab", { name: /^canvas$/i }); if (!(await t.count())) t = page.getByRole("button", { name: /^canvas$/i }); if (await t.count()) await t.first().click(); await page.waitForTimeout(600); }
  const tag = `${vp}-${theme}`;
  await shot(page, `${tag}-0-rest`);
  try {
    await openPopover(page, vp); await shot(page, `${tag}-1-popover-open`);
    await toggle(page, vp, "Image overlay"); await shot(page, `${tag}-2-image-overlay-on`);
    await toggle(page, vp, "Image overlay"); // off
    await page.waitForTimeout(300);
    await toggle(page, vp, "Contour trace"); await shot(page, `${tag}-3-contour-trace-on`);
    await toggle(page, vp, "Image overlay"); await shot(page, `${tag}-4-both-on`);
    // dismiss: move away / Escape — does the view-dot ride the resting face?
    if (vp === "d") await page.mouse.move(700, 880); else await page.keyboard.press("Escape");
    await page.waitForTimeout(3200); await shot(page, `${tag}-5-dismissed-both-on`);
    if (vp === "d" && theme === "light") {
      // keyboard: focus the Eye trigger and press Enter
      await page.locator(".controls-dock-anchor .glass-dock").first().hover(); await page.waitForTimeout(600);
      await page.locator("[aria-label='View options']").focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(500);
      metrics[`${tag}-6a-after-enter`] = await measure(page);
      await page.keyboard.press("Tab"); await shot(page, `${tag}-6-keyboard-tab`);
      // tooltip dwell on a popover item (the items carry no visible label)
      await page.mouse.move(700, 880); await page.waitForTimeout(2500);
      await openPopover(page, vp); await page.locator("[aria-label='Image overlay']").first().hover(); await page.waitForTimeout(1500);
      await shot(page, `${tag}-7-item-tooltip-dwell`);
    }
  } catch (e) { errors.push(`${tag} flow ${e.message.slice(0, 200)}`); await page.screenshot({ path: OUT + tag + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + `metrics-${process.env.VPS || "all"}.json`, JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors");
