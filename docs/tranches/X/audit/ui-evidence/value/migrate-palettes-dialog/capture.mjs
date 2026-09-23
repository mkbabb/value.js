// migrate-palettes-dialog audit capture — READ-ONLY on the app; headed Chromium, real GPU.
// Seeds 3 LOCAL palettes into localStorage (context-scoped), opens the dock slug-edit layer,
// submits a slug -> the switch-mode MigratePalettesDialog mounts from App.vue.
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
const now = new Date().toISOString();
const mk = (i, name, cols) => ({ id: `audit-local-${i}`, name, slug: `audit-local-${i}`, colors: cols.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true });
const STORE = JSON.stringify({ version: 1, palettes: [
  mk(1, "Harbor dusk", ["oklch(0.45 0.12 250)", "oklch(0.7 0.1 200)", "oklch(0.85 0.08 80)", "oklch(0.6 0.18 30)"]),
  mk(2, "Moss", ["oklch(0.5 0.1 140)", "oklch(0.75 0.12 120)", "oklch(0.3 0.05 150)"]),
  mk(3, "Signal", ["oklch(0.65 0.25 25)", "oklch(0.9 0.02 90)", "oklch(0.25 0.02 260)"]),
] });

async function newPage(b, vp, theme) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 2 });
  await ctx.addInitScript(([t, s]) => { try {
    if (!localStorage.getItem("vueuse-color-scheme")) localStorage.setItem("vueuse-color-scheme", t);
    if (!sessionStorage.getItem("audit-seeded")) { localStorage.setItem("color-palettes", s); localStorage.removeItem("palette-user-slug"); sessionStorage.setItem("audit-seeded", "1"); }
  } catch {} }, [theme, STORE]);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 240)); });
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
    await p.mouse.move(vp.w / 2, 30); await p.mouse.click(vp.w / 2, 30).catch(() => {});
    await p.waitForTimeout(700);
  }
  await p.waitForTimeout(900);
}

async function openDialog(p, vp) {
  await openLayer(p, vp);
  await p.locator('input[aria-label="Slug or admin token"]').fill("brave-quiet-amber-fox");
  await p.keyboard.press("Enter");
  await p.waitForTimeout(1200);
  if (!(await p.locator('[data-slot="dialog-content"]').isVisible().catch(() => false))) {
    // one retry: the layer may have opened late
    await openLayer(p, vp);
    await p.locator('input[aria-label="Slug or admin token"]').fill("brave-quiet-amber-fox");
    await p.keyboard.press("Enter"); await p.waitForTimeout(1500);
  }
}

async function metrics(p) {
  return p.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: +r.width.toFixed(1), h: +r.height.toFixed(1), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 90), outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.slice(0, 30), pad: cs.padding, justify: cs.justifyContent, cls: (el.className?.baseVal ?? el.className).toString().slice(0, 200) }; };
    const d = document.querySelector('[data-slot="dialog-content"]');
    const btns = d ? [...d.querySelectorAll("button")].map((b) => ({ text: b.textContent.trim(), aria: b.getAttribute("aria-label"), emphasis: b.dataset.emphasis ?? null, tone: b.dataset.tone ?? null, variantAttr: b.getAttribute("variant"), slot: b.dataset.slot ?? null, ...box(b) })) : [];
    const ae = document.activeElement;
    return {
      dialogOpen: !!d, dialog: box(d), title: box(d?.querySelector('[data-slot="dialog-title"]')), titleText: d?.querySelector('[data-slot="dialog-title"]')?.textContent.trim(),
      desc: box(d?.querySelector('[data-slot="dialog-description"]')), descText: d?.querySelector('[data-slot="dialog-description"]')?.textContent.trim(),
      header: box(d?.querySelector('[data-slot="dialog-header"]')), buttons: btns,
      overlay: box(document.querySelector('[data-slot="dialog-overlay"], [data-slot="modal-overlay"]')),
      active: ae ? (ae.textContent.trim().slice(0, 40) || ae.getAttribute("aria-label") || ae.tagName) : null,
      activeFocus: ae ? (() => { const c = getComputedStyle(ae); return c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor + " | " + c.boxShadow.slice(0, 100); })() : null,
      verdict: [...document.querySelectorAll("[data-identity-verdict]")].map((e) => e.textContent.trim()),
      alerts: [...document.querySelectorAll('[role="alert"],[role="status"]')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 5),
      slugInput: (() => { const i = document.querySelector('input[aria-label="Slug or admin token"]'); return i ? { value: i.value, visible: !!i.offsetParent } : null; })(),
      spinner: !!document.querySelector('[aria-label="Switch to slug"] .animate-spin'),
      url: location.href, ls: { slug: localStorage.getItem("palette-user-slug"), nPalettes: (() => { try { return JSON.parse(localStorage.getItem("color-palettes")).palettes.length; } catch { return null; } })() },
      dark: document.documentElement.classList.contains("dark"),
    };
  });
}

async function shot(p, name, vp, theme, errs, note = "") {
  const f = `${vp.tag}-${theme}-${name}.png`;
  await p.screenshot({ path: OUT + f, timeout: 120000 });
  const m = await metrics(p);
  let clip = null;
  if (m.dialog) {
    const pad = 24; const x = Math.max(0, m.dialog.x - pad), y = Math.max(0, m.dialog.y - pad);
    clip = `${vp.tag}-${theme}-${name}.crop.png`;
    await p.screenshot({ path: OUT + clip, clip: { x, y, width: Math.min(vp.w - x, m.dialog.w + pad * 2), height: Math.min(vp.h - y, m.dialog.h + pad * 2) } });
  }
  log.frames.push({ frame: f, clip, vp: vp.tag, theme, state: name, note, metrics: m, consoleErrors: errs.splice(0) });
  console.log("captured", f);
}

const b = await chromium.launch({ headless: false });
const ONLY = process.env.ONLY; const BLOCKS = (process.env.BLOCKS ?? "ABC").split("");
for (const vp of VPS) for (const theme of THEMES) {
  if (ONLY && ONLY !== `${vp.tag}-${theme}`) continue;
  const guard = async (label, fn) => { try { await fn(); } catch (e) { log.frames.push({ vp: vp.tag, theme, state: label + "-FAILED", error: e.message.slice(0, 300) }); console.log("FAILED", vp.tag, theme, label, e.message.slice(0, 120)); } };
  if (BLOCKS.includes("A")) await guard("A", async () => { // A · open + hover + keyboard focus walk + Esc dismissal outcome
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openDialog(p, vp);
    await shot(p, "01-switch-open", vp, theme, errs, "switch mode: slug submitted with 3 local palettes");
    await p.waitForTimeout(1200);
    await shot(p, "02-switch-settled", vp, theme, errs, "+1.2s settle (entrance spring done)");
    if (!vp.mobile) {
      for (const [i, n] of [["03", "Publish, then switch"], ["04", "Transfer to new account"], ["05", "Just switch"]]) {
        await p.getByRole("button", { name: n }).hover(); await p.waitForTimeout(350);
        await shot(p, `${i}-hover-${n.split(/[ ,]/)[0].toLowerCase()}`, vp, theme, errs, `hover ${n}`);
      }
      await p.mouse.move(5, vp.h - 5);
    }
    await p.keyboard.press("Tab"); await p.waitForTimeout(250);
    await shot(p, "06-focus-tab1", vp, theme, errs, "Tab x1");
    await p.keyboard.press("Tab"); await p.waitForTimeout(250);
    await shot(p, "07-focus-tab2", vp, theme, errs, "Tab x2");
    await p.keyboard.press("Escape"); await p.waitForTimeout(1500);
    await shot(p, "08-after-escape", vp, theme, errs, "Esc: dismissal = cancel? what state is the dock/slug layer in?");
    await ctx.close();
  }});
  if (BLOCKS.includes("B")) await guard("B", async () => {
  // B · "Just switch" to a nonexistent slug -> failure surface
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openDialog(p, vp);
    await shot(p, "08b-reopen-before-just-switch", vp, theme, errs, "fresh page: dialog opened again");
    await p.getByRole("button", { name: "Just switch" }).click({ timeout: 8000 });
    await p.waitForTimeout(150);
    await shot(p, "09-just-switch-150ms", vp, theme, errs, "Just switch, 150ms: pending feedback?");
    await p.waitForTimeout(2500);
    await shot(p, "10-just-switch-outcome", vp, theme, errs, "Just switch to nonexistent slug: outcome");
    await ctx.close();
  }});
  if (BLOCKS.includes("C")) await guard("C", async () => {
  // C · "Publish, then switch" with API aborted -> failure surface (no writes to the dev DB)
  {
    const { ctx, p, errs } = await newPage(b, vp, theme);
    await openDialog(p, vp);
    await p.route(API, (r) => r.abort());
    await p.getByRole("button", { name: "Publish, then switch" }).click();
    await p.waitForTimeout(2500);
    await shot(p, "11-publish-api-down-outcome", vp, theme, errs, "Publish then switch with API aborted");
    await p.unroute(API);
    // D · regenerate mode (same component, second mode) from the layer's Generate new slug
    await openLayer(p, vp);
    const regen = p.getByRole("button", { name: "Generate new slug" });
    if (await regen.isVisible().catch(() => false)) { await regen.click(); await p.waitForTimeout(1500); await shot(p, "12-regenerate-mode", vp, theme, errs, "regenerate mode via Generate new slug with local palettes"); }
    await ctx.close();
  }});
  writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}${process.env.BLOCKS ? "-" + process.env.BLOCKS : ""}.json`, JSON.stringify(log, null, 1));
}
await b.close();
writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}${process.env.BLOCKS ? "-" + process.env.BLOCKS : ""}.json`, JSON.stringify(log, null, 1));
console.log("done", log.frames.length, "frames", JSON.stringify(tree));
