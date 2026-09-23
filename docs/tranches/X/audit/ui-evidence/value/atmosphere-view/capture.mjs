// UI-AUDIT seat `atmosphere-view` (COHESION §0bl) — READ-ONLY capture. Headed Chromium, real GPU.
// Served dev page :9000 (already running; never started/stopped here). No API writes; localStorage only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000";
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.env.ONLY?.split(",");
const log = { tree: tree(), at: new Date().toISOString(), frames: [], metrics: {}, errs: {}, net: {}, motion: {}, clip: {} };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const seed = (theme) => `(() => { try { if (sessionStorage.getItem('__audit_seeded')) return; sessionStorage.setItem('__audit_seeded','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)}); } catch (e) {} })();`;

async function measure(page) {
  return page.evaluate(() => {
    const r = (el) => { const b = el.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    const st = (el, sel) => { const s = getComputedStyle(el); return { sel, box: r(el), rad: s.borderRadius, font: `${s.fontSize}/${s.fontWeight} ${s.fontFamily.slice(0, 22)}`, color: s.color, bg: s.backgroundColor, border: s.borderTopWidth + " " + s.borderTopColor, pad: s.padding, cls: String(el.className?.baseVal ?? el.className).slice(0, 110), text: (el.textContent || "").trim().slice(0, 40) }; };
    const m = (sel, n = 6) => [...document.querySelectorAll(sel)].slice(0, n).map((el) => st(el, sel));
    const card = [...document.querySelectorAll(".pane-scroll-fade")].map((e) => e.parentElement).find((c) => c && c.querySelector(".config-console"));
    return {
      hash: location.hash, html: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      card: card ? st(card, "card") : null,
      scroll: (() => { const s = card?.querySelector(".pane-scroll-fade"); return s ? { scrollH: s.scrollHeight, clientH: s.clientHeight } : null; })(),
      h1: m("h1", 2), title: m(".pane-header-title", 2), desc: m(".pane-header-desc", 2),
      rowLabels: m(".aurora-row .section-label", 4),
      triggers: m("[data-slot=select-trigger], button[role=combobox]", 6),
      console: m(".config-console", 1), sectionTitle: m(".config-section-title", 2),
      cfgRows: m(".configurator-row", 4), rowLabelText: m(".configurator-row label, .configurator-row span", 6),
      thumbs: [...document.querySelectorAll("[role=slider]")].map((e) => ({ label: e.getAttribute("aria-label"), now: e.getAttribute("aria-valuenow"), box: r(e), rad: getComputedStyle(e).borderRadius })),
      track: m("[data-slot=slider-track]", 1),
      actionBar: m(".config-action-bar", 1), actionDock: m(".config-action-bar [data-slot], .config-action-bar > *", 3), actionBtns: m(".config-action-bar button", 3),
      listbox: m("[role=listbox]", 1), options: m("[role=option]", 8),
      dockItems: [...document.querySelectorAll("nav button, [data-slot=dock] button")].slice(0, 20).map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 30)),
      canvases: [...document.querySelectorAll("canvas")].map((c) => ({ box: r(c), cls: String(c.className).slice(0, 60), z: getComputedStyle(c).zIndex, parent: String(c.parentElement?.className).slice(0, 60) })),
      regions: [...document.querySelectorAll("[data-region], [data-pane], .pane-shell")].map((e) => ({ box: r(e), region: e.getAttribute("data-region"), pane: e.getAttribute("data-pane"), cls: String(e.className).slice(0, 60) })),
      toasts: [...document.querySelectorAll("[role=status], [role=alert]")].map((e) => e.textContent.trim().slice(0, 80)).filter(Boolean),
      focus: document.activeElement ? st(document.activeElement, "focus") : null,
      focusRing: document.activeElement ? (() => { const s = getComputedStyle(document.activeElement); return { outline: s.outline, shadow: s.boxShadow.slice(0, 120) }; })() : null,
    };
  });
}

// mean abs pixel diff of two PNG buffers of the same rect (decoded in-page)
async function diff(page, a, b) {
  return page.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = "data:image/png;base64," + s; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height; const x = c.getContext("2d");
    x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, c.width, c.height).data;
    x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, c.width, c.height).data;
    let s = 0, n = 0, lum = 0; for (let i = 0; i < da.length; i += 4) { s += Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]); lum += (da[i] + da[i + 1] + da[i + 2]) / 3; n++; }
    return { meanAbsDiff: +(s / n / 3).toFixed(3), meanLum: +(lum / n).toFixed(1), w: c.width, h: c.height };
  }, [a.toString("base64"), b.toString("base64")]);
}

const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [vk, vp] of Object.entries(VPS)) {
  const tag = `${vk === "d" ? 1440 : 390}-${theme}`;
  if (ONLY && !ONLY.includes(tag)) continue;
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vk === "m", isMobile: false });
  await ctx.addInitScript(seed(theme));
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE }).catch(() => {});
  const page = await ctx.newPage();
  const errs = (log.errs[tag] = []);
  const net = (log.net[tag] = []);
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 220)));
  page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 220)));
  page.on("request", (q) => { if (q.method() !== "GET") net.push(`${q.method()} ${q.url().slice(0, 120)}`); });
  const shot = async (name, opts = {}) => { const f = `${tag}-${name}.png`; await page.screenshot({ path: OUT + f, ...opts }).catch((e) => errs.push("shot " + name + " " + e.message.slice(0, 80))); log.frames.push({ frame: f, tree: tree(), hash: await page.evaluate(() => location.hash) }); };
  const cardLoc = () => page.locator(".config-console").first().locator("xpath=ancestor::*[contains(@class,'pane-scroll-fade')][1]/..");
  const cardShot = async (name) => { const f = `${tag}-${name}.png`; await cardLoc().screenshot({ path: OUT + f }).catch((e) => errs.push("card " + name + " " + e.message.slice(0, 80))); log.frames.push({ frame: f, tree: tree() }); };
  const trig = page.locator(".aurora-row button[role=combobox], .aurora-row [data-slot=select-trigger]");

  await page.goto(`${BASE}/#/atmosphere`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator(".config-console").first().waitFor({ timeout: 60000 }).catch(() => errs.push("NO CONFIG CONSOLE in 60s"));
  await wait(4000);
  await shot("01-default");
  await cardShot("01b-card");
  if (vk === "m") await shot("01c-fullpage", { fullPage: true });
  log.metrics[`${tag}-default`] = await measure(page);

  // motion: drifting (default) — two frames 2.5s apart, pane-free region if possible
  const vpRect = vk === "d" ? { x: 0, y: 0, width: 1440, height: 900 } : { x: 0, y: 0, width: 390, height: 844 };
  const m1 = await page.screenshot({ clip: vpRect }); await wait(2500); const m2 = await page.screenshot({ clip: vpRect });
  log.motion[`${tag}-drifting`] = await diff(page, m1, m2);
  writeFileSync(OUT + `${tag}-10a-motion-drifting-t0.png`, m1); writeFileSync(OUT + `${tag}-10b-motion-drifting-t2500.png`, m2);

  // hover + keyboard focus on first trigger
  if (vk === "d") { await trig.first().hover().catch(() => {}); await wait(300); await cardShot("02a-trigger-hover"); }
  await trig.first().focus().catch(() => {}); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await wait(300);
  await cardShot("02b-trigger-focus"); log.metrics[`${tag}-focus`] = { focus: (await measure(page)).focus, ring: (await measure(page)).focusRing };

  // each select open
  const names = ["harmony", "arrangement", "medium", "motion"];
  for (let i = 0; i < 4; i++) {
    await trig.nth(i).click().catch((e) => errs.push(`${names[i]} trigger ` + e.message.slice(0, 80))); await wait(900);
    await shot(`03${"abcd"[i]}-select-${names[i]}-open`);
    log.metrics[`${tag}-open-${names[i]}`] = await measure(page).then((x) => ({ listbox: x.listbox, options: x.options, triggers: x.triggers.slice(i, i + 1) }));
    if (i === 0) { await page.keyboard.press("ArrowDown"); await wait(300); await shot("03a2-harmony-kbd-hover"); }
    await page.keyboard.press("Escape"); await wait(500);
  }

  // Medium walk: smooth .. oil-pastel — pick several, capture the ground each time
  const MEDIA = ["pastel", "watercolor", "oil", "crayon", "vangogh", "oil-pastel", "smooth"];
  for (const [k, med] of MEDIA.entries()) {
    await trig.nth(2).click().catch(() => {}); await wait(600);
    await page.locator("[role=option]").nth(k + 1 === 7 ? 0 : k + 1).click().catch((e) => errs.push("medium " + med + " " + e.message.slice(0, 60))); await wait(1600);
    if (vk === "d" || ["watercolor", "vangogh", "oil-pastel"].includes(med)) await shot(`04-medium-${med}`);
  }
  log.metrics[`${tag}-afterMedia`] = { triggers: (await measure(page)).triggers.map((t) => t.text) };

  // Motion: still — verify stillness
  await trig.nth(3).click().catch(() => {}); await wait(600);
  await page.locator("[role=option]", { hasText: "Still" }).first().click().catch((e) => errs.push("still " + e.message.slice(0, 60))); await wait(1500);
  const s1 = await page.screenshot({ clip: vpRect }); await wait(2500); const s2 = await page.screenshot({ clip: vpRect });
  log.motion[`${tag}-still`] = await diff(page, s1, s2);
  writeFileSync(OUT + `${tag}-10c-motion-still-t0.png`, s1); writeFileSync(OUT + `${tag}-10d-motion-still-t2500.png`, s2);
  // back to drifting
  await trig.nth(3).click().catch(() => {}); await wait(600);
  await page.locator("[role=option]", { hasText: "Drifting" }).first().click().catch(() => {}); await wait(800);

  // slider tuning: Colour Energy -> end, Noise -> home, Zones -> 1 via keyboard
  const thumbs = page.locator(".config-console [role=slider]");
  await thumbs.nth(0).scrollIntoViewIfNeeded().catch(() => {});
  await thumbs.nth(0).focus().catch(() => {}); await page.keyboard.press("End"); await wait(300);
  await cardShot("05a-slider-focus-energy-max");
  await thumbs.nth(1).focus().catch(() => {}); await page.keyboard.press("Home"); await wait(200);
  await thumbs.nth(2).focus().catch(() => {}); await page.keyboard.press("Home"); await wait(1200);
  // pointer drag on noise
  const nb = await thumbs.nth(1).boundingBox();
  if (nb) { await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2); await page.mouse.down(); for (let i = 1; i <= 10; i++) { await page.mouse.move(nb.x + nb.width / 2 + i * 12, nb.y + nb.height / 2); await wait(25); } await cardShot("05b-slider-dragging"); await page.mouse.up(); }
  await wait(1200);
  await shot("05c-tuned");
  log.metrics[`${tag}-tuned`] = { thumbs: (await measure(page)).thumbs };

  // Copy JSON
  await page.locator(".config-action-bar button", { hasText: "Copy JSON" }).first().click().catch((e) => errs.push("copy " + e.message.slice(0, 80))); await wait(700);
  await shot("06a-after-copy");
  log.clip[tag] = await page.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e)).then((t) => String(t).slice(0, 700));
  log.metrics[`${tag}-copy`] = { toasts: (await measure(page)).toasts };
  // Reset
  await page.locator(".config-action-bar button", { hasText: "Reset" }).first().click().catch((e) => errs.push("reset " + e.message.slice(0, 80))); await wait(1500);
  await shot("06b-after-reset");
  const after = await measure(page);
  log.metrics[`${tag}-reset`] = { thumbs: after.thumbs, triggers: after.triggers.map((t) => t.text), toasts: after.toasts };
  await ctx.close();
}
await b.close();
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
console.log("done", log.tree, Object.fromEntries(Object.entries(log.errs).map(([k, v]) => [k, v.length])));
