// X UI audit · dock-color-input — headed Chromium capture (READ-ONLY on the app).
// Usage: node capture.mjs <1440|390> <light|dark> [segment...]
// Segments run in isolated browsers (other seats kill Chromium mid-run; each segment retries).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = process.env.VJ_BASE ?? "http://localhost:9000";
const tree = "/Users/mkbabb/Programming/value.js";
const [vtag, theme, ...segArg] = process.argv.slice(2);
const vp = { "1440": { w: 1440, h: 900 }, "390": { w: 390, h: 844 } }[vtag];
const pre = `${vtag}-${theme}`;
const LOGF = path.join(OUT, `capture-log-${pre}.jsonl`);
const note = (o) => { const t = JSON.stringify({ pre, ...o }); fs.appendFileSync(LOGF, t + "\n"); console.log(t.slice(0, 300)); };
const treeState = () => ({ sha: execSync(`git -C ${tree} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${tree} status --porcelain | wc -l`).toString().trim() });

async function withPage(seg, fn) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const browser = await chromium.launch({ headless: false });
    let closed = false;
    browser.on("disconnected", () => { closed = true; });
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 500 });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 200)));
    page.on("crash", () => note({ seg, EVENT: "PAGE CRASH" }));
    await page.route("**/colors/propose", async (route) => { note({ seg, EVENT: "propose request", body: route.request().postData()?.slice(0, 120) }); await new Promise((r) => setTimeout(r, 2500)); await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ name: "audit teal", css: "#abcdef" }) }); });
    try {
      await fn(page, helpers(page, seg));
      note({ seg, done: true, attempt, consoleErrs: [...new Set(errs)].filter(e => !/aurora|GPU|Texture/.test(e)).slice(0, 8) });
      await browser.close();
      return;
    } catch (e) {
      note({ seg, attempt, failed: String(e).split("\n")[0].slice(0, 200), externallyClosed: closed });
      try { await browser.close(); } catch {}
    }
  }
}

function helpers(page, seg) {
  const shot = async (name) => {
    const f = path.join(OUT, `${pre}-${name}.png`);
    await page.screenshot({ path: f });
    try {
      const bb = await page.locator(".glass-dock").first().boundingBox();
      if (bb) {
        const pad = 24; const pop = await page.locator("[data-slot=popover-content]").first().boundingBox().catch(() => null);
        let x0 = bb.x - pad, y0 = bb.y - pad, x1 = bb.x + bb.width + pad, y1 = bb.y + bb.height + pad;
        if (pop) { x0 = Math.min(x0, pop.x - pad); y0 = Math.min(y0, pop.y - pad); x1 = Math.max(x1, pop.x + pop.width + pad); y1 = Math.max(y1, pop.y + pop.height + pad); }
        x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(vp.w, x1); y1 = Math.min(vp.h, y1);
        if (x1 > x0 && y1 > y0) await page.screenshot({ path: f.replace(/\.png$/, "-dock.png"), clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
      }
    } catch {}
    note({ seg, shot: path.basename(f), ...treeState() });
  };
  const state = async (label) => {
    const m = await page.evaluate(() => {
      const el = document.querySelector(".color-input"); const r = (e) => e ? Object.fromEntries(Object.entries(e.getBoundingClientRect().toJSON()).map(([k, v]) => [k, Math.round(v)])) : null;
      const c = el && getComputedStyle(el); const ph = el && getComputedStyle(el, "::before");
      const dock = document.querySelector(".glass-dock"); const send = document.querySelector(".send-btn");
      const pop = document.querySelector("[data-slot=popover-content]");
      return {
        input: el && { r: r(el), radius: c.borderRadius, border: c.borderColor, bg: c.backgroundColor, color: c.color, text: el.innerText, ph: el.getAttribute("data-placeholder"), phColor: ph?.color, phContent: ph?.content, err: el.classList.contains("color-input-error"), spell: el.spellcheck },
        dock: dock && { r: r(dock), collapsed: dock.classList.contains("collapsed") },
        send: send && { r: r(send), disabled: send.disabled, opacity: getComputedStyle(send).opacity, spin: !!send.querySelector(".animate-spin"), label: send.getAttribute("aria-label") },
        badge: document.querySelector(".error-badge")?.textContent ?? null,
        pop: pop && { r: r(pop), radius: getComputedStyle(pop).borderRadius, text: pop.innerText.replace(/\s+/g, " ").slice(0, 160) },
        toggles: [...document.querySelectorAll("button[aria-label]")].map(b => b.getAttribute("aria-label")).filter(l => /color input|Propose|Close/.test(l)),
        scrollY: Math.round(scrollY), overflowX: document.documentElement.scrollWidth > innerWidth,
      };
    });
    note({ seg, label, m });
    return m;
  };
  const boot = async () => {
    await page.goto(`${BASE}/?color=%23abcdef#/`, { waitUntil: "commit", timeout: 240000 });
    await page.locator('main[aria-labelledby="route-title"]').first().waitFor({ timeout: 300000 });
    await page.waitForTimeout(2500);
  };
  const expand = async (why) => { const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { note({ seg, collapsedAt: why }); await c.first().click(); await page.waitForTimeout(1200); } };
  const openInput = async () => {
    await expand("boot");
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    await page.waitForTimeout(1200);
    await page.getByRole("button", { name: "Open color input" }).click();
  };
  const toField = async () => { const fb = await page.locator(".color-input").first().boundingBox(); if (fb) await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2); };
  return { shot, state, boot, expand, openInput, toField };
}

const SEGMENTS = {
  async open(page, h) {
    await h.boot(); await h.shot("00-resting");
    await h.expand("pre-tools");
    await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(1200);
    await h.shot("01-tools-actions");
    await page.getByRole("button", { name: "Open color input" }).click();
    await page.waitForTimeout(90); await h.shot("02a-input-open-midflash");
    await page.waitForTimeout(700); await h.state("input-open"); await h.shot("02-input-mode-resting");
    await page.waitForTimeout(3000); const s = await h.state("probeA-pointer-at-click-site+3.8s"); await h.shot("02p-probeA-3s-after-open");
    await h.expand("probeA"); await h.toField(); await page.waitForTimeout(1200);
    await h.state("hover-popover"); await h.shot("03-hover-popover-open");
  },
  async typing(page, h) {
    await h.boot(); await h.openInput(); await page.waitForTimeout(900); await h.toField();
    await page.locator(".color-input").first().click({ timeout: 8000 }); await page.waitForTimeout(200);
    await page.keyboard.press("Meta+A"); await page.keyboard.press("Backspace"); await page.waitForTimeout(500);
    await h.state("empty-focused"); await h.shot("04-input-empty-focused");
    await page.keyboard.type("oklch(0.7 0.25 150)", { delay: 25 });
    await page.waitForTimeout(600); await h.state("typing+0.6s"); await h.shot("05-typing-parse-0.6s");
    await page.waitForTimeout(1900); await h.state("typing+2.5s (debounce fired)"); await h.shot("05b-typing-parse-2.5s");
    // re-hover to open the echo popover while focused
    await page.mouse.move(5, 5); await page.waitForTimeout(300); await h.toField(); await page.waitForTimeout(1000);
    await h.state("typing-rehover-popover"); await h.shot("05c-typing-parse-echo-popover");
  },
  async invalid(page, h) {
    await h.boot(); await h.openInput(); await page.waitForTimeout(900); await h.toField();
    const f = page.locator(".color-input").first();
    await f.click({ timeout: 8000 }); await page.keyboard.press("Meta+A"); await page.keyboard.press("Backspace");
    await page.keyboard.type("zzzz", { delay: 20 }); await page.keyboard.press("Enter");
    await page.waitForTimeout(60); await h.state("C-enter1+60ms");
    await page.waitForTimeout(340); await h.state("C-enter1+400ms"); await h.shot("06-invalid-enter-400ms");
    await page.waitForTimeout(2800); await h.state("C-enter1+3.2s");
    await page.keyboard.press("Enter"); await page.waitForTimeout(400); await h.state("C-enter2-same-text+400ms"); await h.shot("06b-invalid-enter-again-same-text");
    await page.keyboard.press("Meta+A"); await page.keyboard.press("Backspace");
    await page.keyboard.type("notacolor(", { delay: 20 });
    await page.waitForTimeout(1000); await h.state("D-typed+1.0s");
    await page.waitForTimeout(1400); await h.state("D-typed+2.4s"); await h.shot("06c-invalid-debounced-badge");
    await page.mouse.move(vp.w / 2, vp.h - 40); await page.waitForTimeout(3500);
    await h.state("probeB-focused-pointer-away+3.5s"); await h.shot("06d-probeB-focused-pointer-away");
    await page.mouse.click(12, vp.h / 2); await page.waitForTimeout(900);
    await h.state("after-blur"); await h.shot("07-after-blur");
  },
  async propose(page, h) {
    await h.boot(); await h.openInput(); await page.waitForTimeout(900);
    const pb = page.getByRole("button", { name: "Propose color name" });
    if (!(await pb.count())) { note({ seg: "propose", err: "no Propose color name toggle", s: await h.state("no-propose") }); return; }
    const b = await pb.boundingBox(); if (b) await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await pb.click(); await page.waitForTimeout(80); await h.shot("08a-propose-midflash");
    await page.waitForTimeout(900); await h.state("propose-empty"); await h.shot("08-propose-mode-empty");
    await h.expand("propose"); await h.toField(); await page.waitForTimeout(900); await h.shot("08b-propose-hover");
    await page.locator(".color-input").first().click({ timeout: 8000 });
    await page.keyboard.type("audit teal", { delay: 25 }); await page.waitForTimeout(400);
    await h.state("propose-typed"); await h.shot("09-propose-typed");
    await page.keyboard.press("Enter"); await page.waitForTimeout(600);
    await h.state("proposing"); await h.shot("10-proposing-spinner");
    await page.waitForTimeout(3500); await h.state("after-propose-success"); await h.shot("11-after-propose-success");
    const close = page.getByRole("button", { name: /Close (propose|input)/ });
    if (await close.count()) { await close.first().click(); await page.waitForTimeout(1000); await h.state("closed"); await h.shot("12-closed-back-to-actions"); }
  },
  async keyboard(page, h) {
    await h.boot(); await h.expand("kb");
    await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(1200);
    const o = page.getByRole("button", { name: "Open color input" }); await o.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1000);
    const a1 = await page.evaluate(() => { const a = document.activeElement; return { label: a?.getAttribute("aria-label"), cls: a?.className?.slice?.(0, 40) }; });
    note({ seg: "keyboard", afterEnterOpen: a1 });
    await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300);
    const a2 = await page.evaluate(() => { const a = document.activeElement; const c = a && getComputedStyle(a); return { label: a?.getAttribute("aria-label"), cls: a?.className?.slice?.(0, 50), outline: c && `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, shadow: c?.boxShadow.slice(0, 90), border: c?.borderColor }; });
    note({ seg: "keyboard", afterShiftTab: a2 }); await h.shot("13-keyboard-focus-field");
    await page.keyboard.press("Tab"); await page.waitForTimeout(300);
    const a3 = await page.evaluate(() => { const a = document.activeElement; const c = a && getComputedStyle(a); return { tag: a?.tagName, label: a?.getAttribute("aria-label"), cls: a?.className?.slice?.(0, 50), outline: c && `${c.outlineStyle} ${c.outlineWidth}`, shadow: c?.boxShadow.slice(0, 90) }; });
    note({ seg: "keyboard", afterTab: a3 }); await h.shot("13b-keyboard-focus-next");
  },
};

const segs = segArg.length ? segArg : Object.keys(SEGMENTS);
for (const s of segs) await withPage(s, SEGMENTS[s]);
