// UIA-F visualize-empty — headed Chromium, real GPU. READ-ONLY on the app (navigation, hover, focus,
// synthetic dragenter/dragover/dragleave only — NO drop, NO upload, nothing written to the API).
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

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 120), font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 30), color: cs.color, display: cs.display }; };
    return {
      theme: document.documentElement.className, url: location.pathname,
      configurator: box(q(".viz-configurator")), cfgCols: q(".viz-configurator") && getComputedStyle(q(".viz-configurator")).gridTemplateColumns,
      cfgDataSidebar: q(".viz-configurator")?.getAttribute("data-sidebar"),
      stage: box(q(".configurator-stage")), aside: box(q(".configurator-aside")),
      canvasContainer: box(q(".canvas-container")), canvas: box(q(".canvas-container canvas")),
      dropTarget: box(q(".drop-target")), dropDragging: q(".drop-target")?.hasAttribute("data-dragging"),
      button: box(q(".drop-target-button")), buttonText: q(".drop-target-button")?.textContent.trim(),
      caption: box(q(".drop-target p")), captionText: q(".drop-target p")?.textContent.trim(),
      tabs: box(q("[role=tablist]")), tabsText: q("[role=tablist]")?.textContent.trim(),
      imageUpload: !!q(".configurator-layer"), overlay: !!q(".fixed.inset-0.backdrop-blur-sm"),
      header: box(q("header")), headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 30)),
      main: box(q("main")), bodyBg: getComputedStyle(document.body).backgroundColor,
      scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, vw: innerWidth, vh: innerHeight,
      activeEl: document.activeElement?.outerHTML.slice(0, 120),
    };
  });
}
async function shot(page, name, extra) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
// synthetic drag with a real DataTransfer holding a File (no drop dispatched)
async function drag(page, sel, type) {
  return page.evaluate(({ sel, type }) => {
    const el = document.querySelector(sel); if (!el) return "no-el";
    const dt = new DataTransfer(); dt.items.add(new File(["x"], "probe.png", { type: "image/png" }));
    const r = el.getBoundingClientRect();
    const ev = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 });
    el.dispatchEvent(ev); return ev.defaultPrevented;
  }, { sel, type });
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme} console.${m.type()} ${m.text().slice(0, 220)}`); });
  const t0 = Date.now();
  await page.goto(BASE + "/visualize", { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await shot(page, `${vp}-${theme}-1-empty`, { loadMs: Date.now() - t0 });
  // 390: the task names Controls/Canvas tabs — probe for them
  if (vp === "m") {
    const tabs = page.getByRole("tab");
    const n = await tabs.count();
    metrics[`${vp}-${theme}-1-empty`].tabCount = n;
    if (n >= 2) { await tabs.nth(0).click(); await shot(page, `${vp}-${theme}-1b-controls-tab`); await tabs.nth(1).click(); await shot(page, `${vp}-${theme}-1c-canvas-tab`); }
  }
  // hover + keyboard focus on the one upload affordance
  if (vp === "d") { await page.locator(".drop-target-button").hover(); await shot(page, `${vp}-${theme}-2-hover`); await page.mouse.move(5, 895); }
  await page.locator("body").click({ position: { x: 5, y: VPS[vp].height - 5 } }).catch(() => {});
  await page.locator(".drop-target-button").focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
  await shot(page, `${vp}-${theme}-3-focus`);
  await page.locator(".drop-target-button").blur();
  // drag-over: file dragged over the drop target (main stage)
  const pEnter = await drag(page, ".drop-target", "dragenter"); const pOver = await drag(page, ".drop-target", "dragover");
  await shot(page, `${vp}-${theme}-4-dragover-stage`, { pEnter, pOver });
  await drag(page, ".drop-target", "dragleave");
  // drag-over the app header (outside the view root) — does anything catch it?
  const hOver = await drag(page, "header", "dragover");
  metrics[`${vp}-${theme}-4-dragover-stage`].headerDragoverPrevented = hOver;
  await page.waitForTimeout(300);
  await shot(page, `${vp}-${theme}-5-after-dragleave`);
  // error-state adjunct: an unknown workspace slug (GET only)
  if (theme === "light" || vp === "d") {
    await page.goto(BASE + "/w/audit-nonexistent-slug-zz", { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1500);
    await shot(page, `${vp}-${theme}-6-error-unknown-slug`);
  }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors }, null, 1));
await browser.close();
console.log("done", errors.length, "errors");
