// UIA-F shell-login-inline capture — headed Chromium, real GPU. READ-ONLY on the app:
// POST /api/sessions and /api/sessions/login are FULFILLED by page.route (no DB write).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const SLUG = "jasper-newt-of-rampant";

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + " " + cs.fontFamily.slice(0, 24), color: cs.color, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.boxShadow.slice(0, 60) }; };
    const grp = document.querySelector('[aria-label="Account"]');
    const ctrls = grp ? [...grp.querySelectorAll("button, input, p, .inline-flex")] : [];
    const toasts = [...document.querySelectorAll('[data-sonner-toast], [role=status], li[data-state], .toast, [class*=toast]')].filter(e => e.getBoundingClientRect().width > 0).slice(0, 3);
    return {
      dock: box(document.querySelector(".app-dock")),
      header: box(document.querySelector(".app-header")),
      controls: ctrls.map((e) => ({ tag: e.tagName, label: e.getAttribute("aria-label") || e.getAttribute("placeholder") || e.textContent.trim().slice(0, 50), disabled: e.disabled, ...box(e) })),
      toasts: toasts.map((e) => ({ cls: e.className.toString().slice(0, 80), text: e.textContent.trim().slice(0, 80), ...box(e) })),
      active: document.activeElement?.getAttribute("aria-label") || document.activeElement?.id,
      scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    };
  });
}
async function shot(page, name, wait = 700) {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: OUT + name + ".png" });
  await page.screenshot({ path: OUT + name + "-dock.png", clip: { x: 0, y: 0, width: page.viewportSize().width, height: 140 } });
  metrics[name] = await measure(page);
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m", permissions: ["clipboard-read", "clipboard-write"] });
  const page = await ctx.newPage();
  const calls = [];
  await page.route("**/api/sessions/login", (r) => { calls.push("login"); return r.fulfill({ status: 404, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Not Found", status: 404, detail: "No session found for that slug." }) }); });
  await page.route("**/api/sessions", (r) => { if (r.request().method() !== "POST") return r.continue(); calls.push("register"); return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ user_slug: SLUG, token: "audit-mock-token", session_id: "audit" }) }); });
  const P = `${vp}-${theme}`;
  await page.goto(BASE + "/paper", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(800);
  await shot(page, `${P}-1-collapsed`);
  const trigger = page.getByRole("button", { name: "Log in", exact: true });
  if (vp === "d") { await trigger.hover(); await shot(page, `${P}-1b-hover`, 400); }
  await page.mouse.move(700, 600);
  // keyboard focus ring on the trigger
  await trigger.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await shot(page, `${P}-1c-focus`, 300);
  await trigger.click();
  await shot(page, `${P}-2-form-empty`);
  const input = page.locator("#user-slug-input");
  metrics[`${P}-2-form-empty`].inputFocused = await input.evaluate((e) => e === document.activeElement);
  await input.focus(); await shot(page, `${P}-2b-form-focused`, 300);
  // mouse path: malformed slug -> submit disabled, no message
  await input.fill("my slug"); await shot(page, `${P}-3a-bad-typed-no-msg`, 300);
  // keyboard path: Enter -> client-side slugError
  await input.press("Enter"); await shot(page, `${P}-3b-slug-error-client`, 400);
  // empty + Enter
  await input.fill(""); await input.press("Enter"); await shot(page, `${P}-3c-slug-error-empty`, 300);
  // well-formed but unknown -> server error (mocked 404) + error toast
  await input.fill("amber-fox-of-quiet"); await page.getByRole("button", { name: "Submit slug and log in" }).click();
  await shot(page, `${P}-3d-slug-error-server-toast`, 500);
  // generate -> logged in + success toast
  await page.getByRole("button", { name: "Generate a new slug" }).click();
  await shot(page, `${P}-4-loggedin-toast`, 500);
  await page.waitForTimeout(5000);
  await shot(page, `${P}-4b-loggedin-settled`, 200);
  await page.getByRole("button", { name: "Copy your slug" }).click();
  await shot(page, `${P}-5-copy-success`, 250);
  metrics[`${P}-5-copy-success`].clipboard = await page.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e.message));
  metrics[`${P}-calls`] = calls;
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length);
