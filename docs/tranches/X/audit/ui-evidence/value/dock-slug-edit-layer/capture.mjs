// dock-slug-edit-layer audit capture — READ-ONLY on the app; headed Chromium, real GPU.
// Usage: node capture.mjs   (dev server http://localhost:9000, api http://localhost:3000)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const APP = "http://localhost:9000/";
const API = "http://localhost:3000/**";
const sh = (c) => execSync(c, { cwd: "/Users/mkbabb/Programming/value.js" }).toString().trim();
const tree = { head: sh("git rev-parse --short HEAD"), dirty: Number(sh("git status --porcelain | wc -l")) };
const log = { tree, captured: new Date().toISOString(), frames: [] };

const VPS = [{ tag: "1440", w: 1440, h: 900, mobile: false }, { tag: "390", w: 390, h: 844, mobile: true }];
const THEMES = ["light", "dark"];

async function newPage(b, vp, theme) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => { try { if (!localStorage.getItem("vueuse-color-scheme")) localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 200)); });
  p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 200)));
  await p.goto(APP, { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(4000);
  return { ctx, p, errs };
}

async function openLayer(p, vp) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (!vp.mobile) {
      const login = p.getByRole("button", { name: "Login", exact: true });
      if (await login.isVisible().catch(() => false)) { await login.click(); break; }
      const prof = p.getByRole("button", { name: "Profile" });
      if (await prof.isVisible().catch(() => false)) { await prof.click(); await p.getByRole("menuitem", { name: "Switch account" }).click(); break; }
    } else {
      const menu = p.getByRole("button", { name: "Menu" }).first();
      if (await menu.isVisible().catch(() => false)) {
        await menu.click(); await p.waitForTimeout(400);
        await p.getByRole("menuitem", { name: /^(Login|Switch account)$/ }).first().click(); break;
      }
    }
    // dock collapsed or still booting: poke the top-centre seal
    await p.mouse.move(vp.w / 2, 30); await p.mouse.click(vp.w / 2, 30).catch(() => {});
    await p.waitForTimeout(700);
  }
  await p.waitForTimeout(900);
}

async function metrics(p) {
  return p.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const input = q('input[aria-label="Slug or admin token"]');
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: +r.width.toFixed(1), h: +r.height.toFixed(1), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, outline: cs.outlineStyle + " " + cs.outlineWidth, shadow: cs.boxShadow.slice(0, 120), font: cs.fontSize + " " + cs.fontFamily.slice(0, 40), cls: (el.className?.baseVal ?? el.className).toString().slice(0, 160) }; };
    let dock = input; while (dock && dock.parentElement && !/glass-dock(?![-_])|\bdock\b/.test((dock.className?.baseVal ?? dock.className ?? "").toString())) dock = dock.parentElement;
    const btn = (n) => document.querySelector(`[aria-label="${n}"]`);
    const ae = document.activeElement;
    const ph = input ? getComputedStyle(input, "::placeholder").color : null;
    return { active: ae ? (ae.getAttribute("aria-label") || ae.tagName + "." + (ae.className?.baseVal ?? ae.className ?? "").toString().slice(0, 60)) : null,
      activeFocusStyle: ae ? (() => { const c = getComputedStyle(ae); return c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor + " | " + c.boxShadow.slice(0, 100); })() : null,
      placeholderColor: ph, inputOverflow: input ? { scrollW: input.scrollWidth, clientW: input.clientWidth, value: input.value } : null,
      input: box(input), inputFocused: document.activeElement === input, dock: box(dock), submit: box(btn("Switch to slug")), regen: box(btn("Generate new slug")), cancel: box(btn("Cancel")),
      submitDisabled: btn("Switch to slug")?.disabled ?? null, spinner: !!btn("Switch to slug")?.querySelector(".animate-spin"),
      adminPill: [...document.querySelectorAll(".slug-pill")].map((e) => e.textContent.trim()), verdict: [...document.querySelectorAll("[data-identity-verdict]")].map((e) => e.textContent.trim()),
      alerts: [...document.querySelectorAll('[role="alert"],[role="status"]')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 5),
      loginBtn: !!document.querySelector("button") && [...document.querySelectorAll("button")].some((b) => b.textContent.trim() === "Login"),
      url: location.href, ls: Object.fromEntries(["palette-user-slug", "palette-admin-token"].map((k) => [k, localStorage.getItem(k)])),
      dark: document.documentElement.classList.contains("dark") };
  });
}

async function shot(p, name, vp, theme, errs, note = "") {
  const f = `${vp.tag}-${theme}-${name}.png`;
  await p.screenshot({ path: OUT + f });
  let clip = null;
  const m = await metrics(p);
  const anchor = m.dock ?? m.input;
  if (anchor) {
    const pad = 24; const y = Math.max(0, anchor.y - pad), h = Math.min(vp.h - y, anchor.h + pad * 2);
    clip = `${vp.tag}-${theme}-${name}.dock.png`;
    await p.screenshot({ path: OUT + clip, clip: { x: 0, y, width: vp.w, height: h } });
  }
  log.frames.push({ frame: f, clip, vp: vp.tag, theme, state: name, note, metrics: m, consoleErrors: errs.splice(0) });
  console.log("captured", f);
}

const b = await chromium.launch({ headless: false });
for (const vp of VPS) for (const theme of THEMES) {
  // A · empty / typed / focus / admin-typed / admin-submitted / malformed slug
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await shot(p, "00-resting-dock", vp, theme, errs, "before opening the layer");
    await openLayer(p, vp);
    await shot(p, "01-empty-field", vp, theme, errs, "layer open, field autofocused");
    await p.keyboard.press("Tab"); await p.waitForTimeout(200);
    await shot(p, "02-empty-tab-focus", vp, theme, errs, "Tab from empty field (submit disabled)");
    await p.locator('input[aria-label="Slug or admin token"]').fill("brave-quiet-amber-fox");
    await p.waitForTimeout(200);
    await shot(p, "03-typed-slug", vp, theme, errs, "slug-shaped text typed");
    await p.locator('input[aria-label="Slug or admin token"]').fill("dev");
    await p.waitForTimeout(200);
    await shot(p, "04-admin-token-typed", vp, theme, errs, "'dev' typed");
    await p.keyboard.press("Enter"); await p.waitForTimeout(1500);
    await shot(p, "05-admin-token-submitted", vp, theme, errs, "'dev' submitted -> admin mode");
    await ctx.close();
  }
  // B · switching spinner (API delayed 2.5s) + outcome of a nonexistent slug
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openLayer(p, vp);
    await p.route(API, async (r) => { await new Promise((res) => setTimeout(res, 2500)); await r.continue().catch(() => {}); });
    await p.locator('input[aria-label="Slug or admin token"]').fill("brave-quiet-amber-fox");
    await p.keyboard.press("Enter");
    await p.waitForTimeout(60);
    await shot(p, "06-switching-60ms", vp, theme, errs, "60ms after submit with API delayed 2.5s");
    await p.waitForTimeout(600);
    await shot(p, "07-switching-660ms", vp, theme, errs, "660ms after submit (request still in flight)");
    await p.waitForTimeout(3500);
    await shot(p, "08-switch-outcome-nonexistent-slug", vp, theme, errs, "after the (likely 404) login response");
    await p.unroute(API);
    // malformed slug (3 words) -> treated as admin token?
    await openLayer(p, vp);
    await p.locator('input[aria-label="Slug or admin token"]').fill("brave-quiet-amber");
    await p.keyboard.press("Enter"); await p.waitForTimeout(1500);
    await shot(p, "09-malformed-slug-submitted", vp, theme, errs, "3-word slug typo submitted");
    await ctx.close();
  }
  // C · identity verdict failed (API aborted) from the layer's Generate new slug — logged OUT
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openLayer(p, vp);
    await p.route(API, (r) => r.abort());
    await p.getByRole("button", { name: "Generate new slug" }).click();
    await p.waitForTimeout(1500);
    await shot(p, "10-regen-failed-logged-out", vp, theme, errs, "Generate new slug with API aborted, no prior slug");
    if (vp.mobile) { await p.getByRole("button", { name: "Menu" }).first().click(); await p.waitForTimeout(500); await shot(p, "11-regen-failed-logged-out-menu", vp, theme, errs, "Menu reopened: is the failed verdict anywhere?"); }
    await ctx.close();
  }
  // D · identity verdict failed — logged IN (first a live regenerate issues a slug on the local dev api)
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openLayer(p, vp);
    await p.getByRole("button", { name: "Generate new slug" }).click();
    await p.waitForTimeout(2000);
    await shot(p, "12-regen-live-ok", vp, theme, errs, "Generate new slug with API live (issues a slug)");
    await openLayer(p, vp);
    await p.route(API, (r) => r.abort());
    await p.getByRole("button", { name: "Generate new slug" }).click();
    await p.waitForTimeout(1500);
    await shot(p, "13-regen-failed-logged-in", vp, theme, errs, "Generate new slug from the layer with API aborted, logged in");
    if (vp.mobile) await p.getByRole("button", { name: "Menu" }).first().click();
    else await p.getByRole("button", { name: "Profile" }).click();
    await p.waitForTimeout(600);
    await shot(p, "14-regen-failed-logged-in-menu", vp, theme, errs, "menu reopened: the verdict row");
    await ctx.close();
  }
}
await b.close();
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
console.log("done", log.frames.length, "frames", JSON.stringify(tree));
