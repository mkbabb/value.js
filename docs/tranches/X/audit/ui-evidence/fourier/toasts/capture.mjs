// UIA-F toasts — headed Chromium, real GPU. READ-ONLY on the app: POST /api/sessions(+/login) FULFILLED by page.route
// (no DB write); /api/admin/verify with a bad token is a real GET (401 read). navigator.clipboard.writeText is
// rejected via addInitScript to drive the copy-failure arm. No app/glass tree is touched.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")} (app runs node_modules glass-ui 8.0.0 dist)\n${new Date().toString()}\n`);
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const SLUG = "jasper-newt-of-rampant";
const metrics = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), pad: cs.padding, font: cs.fontSize + "/" + cs.lineHeight + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 22),
        color: cs.color, op: cs.opacity, z: cs.zIndex, bf: cs.backdropFilter.slice(0, 60) }; };
    const vp = document.querySelector("[role=region] ol, ol[tabindex]") || document.querySelector("[aria-live=polite]");
    const toasts = [...document.querySelectorAll("[data-slot=toast]")];
    return {
      viewport: box(vp), viewportCls: vp?.className?.toString().slice(0, 160),
      dock: box(document.querySelector(".app-dock")) || box(document.querySelector("[data-slot=dock]")),
      toasts: toasts.map((t) => ({ tone: t.dataset.tone, state: t.dataset.state, text: t.textContent.trim().slice(0, 120), ...box(t),
        title: box(t.querySelector("[data-slot=toast-title], .text-small, div.grid > :first-child")),
        desc: box(t.querySelector("div.grid > :nth-child(2)")),
        close: box(t.querySelector("[aria-label=Dismiss]")) })),
      active: document.activeElement?.outerHTML.slice(0, 120),
      inlineErr: [...document.querySelectorAll("[role=alert], .text-destructive")].map((e) => e.textContent.trim().slice(0, 80)).filter(Boolean),
      scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    };
  });
}
async function shot(page, name, wait = 600) {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
  const t = await page.$("[data-slot=toast]");
  if (t) { const r = await t.boundingBox(); if (r) await page.screenshot({ path: OUT + name + "-crop.png", clip: { x: Math.max(0, r.x - 24), y: Math.max(0, r.y - 24), width: Math.min(page.viewportSize().width - Math.max(0, r.x - 24), r.width + 48), height: r.height + 48 } }); }
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const P = `${vp}-${theme}`;
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript(() => { try { Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new DOMException("Write permission denied.", "NotAllowedError")), readText: () => Promise.reject(new Error("x")) }, configurable: true }); } catch {} });
  const page = await ctx.newPage();
  const calls = [];
  page.on("response", (r) => { if (r.url().includes("/api/admin") || r.url().includes("/api/sessions")) calls.push(r.status() + " " + r.request().method() + " " + new URL(r.url()).pathname); });
  page.on("pageerror", (e) => calls.push("PAGEERR " + e.message.slice(0, 120)));
  await page.route("**/api/sessions/login", (r) => r.fulfill({ status: 404, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Not Found", status: 404, detail: "No session found for that slug." }) }));
  await page.route("**/api/sessions", (r) => r.request().method() !== "POST" ? r.continue() : r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ user_slug: SLUG, token: "audit-mock-token", session_id: "audit" }) }));

  // 1 ERROR — invalid admin token (real 401 GET)
  await page.goto(BASE + "/gallery?admin=bad", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-slot=toast]", { timeout: 8000 }).catch(() => calls.push("no error toast"));
  await shot(page, `${P}-1a-error-entering`, 60);
  await shot(page, `${P}-1b-error-settled`, 700);
  if (vp === "d") {
    await page.hover("[data-slot=toast]"); await shot(page, `${P}-1c-error-hover`, 300);
    await page.hover("[data-slot=toast] [aria-label=Dismiss]"); await shot(page, `${P}-1d-close-hover`, 300);
  }
  await page.locator("[data-slot=toast] [aria-label=Dismiss]").first().focus().catch(() => {});
  await page.mouse.move(5, VPS[vp].height - 5);
  await shot(page, `${P}-1e-close-focus`, 250);
  metrics[`${P}-1e-close-focus`].focusVisible = await page.evaluate(() => document.activeElement?.matches(":focus-visible"));
  // dismiss -> vaporize mid-exit
  await page.locator("[data-slot=toast] [aria-label=Dismiss]").first().click();
  await shot(page, `${P}-1f-dismiss-mid`, 90);
  await shot(page, `${P}-1g-dismissed`, 900);

  // 2 SUCCESS — generate slug (POST stubbed) -> "Logged in!"
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Generate a new slug" }).click();
  await page.waitForSelector("[data-slot=toast]", { timeout: 5000 }).catch(() => calls.push("no success toast"));
  await shot(page, `${P}-2-success`, 700);
  // auto-dismiss timing
  const t0 = Date.now(); let gone = null;
  for (let i = 0; i < 24; i++) { await page.waitForTimeout(500); if ((await page.$$("[data-slot=toast]")).length === 0) { gone = Date.now() - t0; break; } }
  metrics[`${P}-2-success`].autoDismissMsAfterShot = gone;

  // 3 STACKED — admin bad (error) + copy failure (long error) + logout/login-fail (error) + generate (success)
  await page.goto(BASE + "/gallery?admin=bad", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-slot=toast]", { timeout: 8000 }).catch(() => {});
  await page.getByRole("button", { name: "Copy your slug" }).click().catch((e) => calls.push("copy btn " + e.message.slice(0, 60)));
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Log out" }).click().catch((e) => calls.push("logout " + e.message.slice(0, 60)));
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Log in", exact: true }).click().catch(() => {});
  await page.waitForTimeout(300);
  await page.locator("#user-slug-input").fill("amber-fox-of-quiet").catch(() => {});
  await page.getByRole("button", { name: "Submit slug and log in" }).click().catch(() => {});
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Generate a new slug" }).click().catch(() => {});
  await shot(page, `${P}-3-stacked`, 700);
  if (vp === "d") { await page.hover("[data-slot=toast] >> nth=0"); await shot(page, `${P}-3b-stacked-hover`, 300); }

  // 4 MORPH EXPORT with clipboard rejected — does anything report the failure?
  await page.goto(BASE + "/morph", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /Export/ }).first().click().catch((e) => calls.push("export " + e.message.slice(0, 60)));
  await shot(page, `${P}-4-morph-export-fail`, 700);
  metrics[`${P}-4-morph-export-fail`].exportLabel = await page.getByRole("button", { name: /Export|Copied/ }).first().textContent().catch(() => null);
  metrics[`${P}-calls`] = calls;
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length);
