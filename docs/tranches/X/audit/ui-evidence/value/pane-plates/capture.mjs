// pane-plates UI audit capture (READ-ONLY on the tree; mutates only served bytes in-browser).
// States: loading plate (in-app hop + deep link), resolve transition, chunk error plate (+hover/focus),
// region ErrorBoundary plate (+focus/hover) and its reset. Headed Chromium, real GPU.
// Usage: node capture.mjs [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = process.argv[2] ?? "http://localhost:9000";
const ONLY = process.argv[3] && process.argv[3] !== "all" ? process.argv[3] : null; // optional "1440-light" etc.
const SCEN = process.argv[4] ? process.argv[4].split(",") : null; // optional scenario labels
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const metaPath = path.join(OUT, "capture-meta.json");
const prior = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : { runs: {} };
const meta = { base: BASE, sha, dirty, at: new Date().toISOString(), runs: prior.runs ?? {} };
const VIEWPORTS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const THEMES = ["light", "dark"];
const T = 240000;

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

function measure(page) {
  return page.evaluate(() => {
    const px = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
    const cs = (e, ...k) => { const s = getComputedStyle(e); return Object.fromEntries(k.map((x) => [x, s[x]])); };
    const ae = document.activeElement;
    return {
      doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, scrollH: document.documentElement.scrollHeight },
      active: ae ? { tag: ae.tagName, cls: String(ae.className).slice(0, 90), text: (ae.textContent || "").trim().slice(0, 60), focusVisible: ae.matches?.(":focus-visible"), outline: getComputedStyle(ae).outline, boxShadow: getComputedStyle(ae).boxShadow.slice(0, 120) } : null,
      regions: [...document.querySelectorAll(".pane-wrapper")].map((w) => {
        const plate = w.querySelector(".pane-plate");
        const eb = w.querySelector(".vj-error-boundary");
        const card = plate?.querySelector("[data-slot=card]");
        const host = eb ?? plate;
        return {
          label: w.getAttribute("aria-label"), rect: px(w),
          plate: plate ? { rect: px(plate), card: card ? { rect: px(card), role: card.getAttribute("role"), busy: card.getAttribute("aria-busy"), tier: card.getAttribute("data-tier"), ...cs(card, "borderRadius", "backgroundColor", "paddingTop", "paddingLeft", "boxShadow", "backdropFilter") } : null } : null,
          boundary: eb ? { rect: px(eb), role: eb.getAttribute("role"), live: eb.getAttribute("aria-live"), tabindex: eb.getAttribute("tabindex"), ...cs(eb, "backgroundColor", "borderRadius", "outline") } : null,
          skeletons: host ? [...host.querySelectorAll("[data-slot=skeleton]")].map((s) => ({ rect: px(s), ...cs(s, "borderRadius", "backgroundColor", "animationName") })) : [],
          texts: host ? [...host.querySelectorAll("p")].map((p) => ({ text: p.textContent.trim().slice(0, 80), ...cs(p, "fontFamily", "fontSize", "fontWeight", "color", "lineHeight"), rect: px(p) })) : [],
          buttons: host ? [...host.querySelectorAll("button")].map((b) => ({ text: b.textContent.trim(), rect: px(b), ...cs(b, "borderRadius", "backgroundColor", "fontFamily", "fontSize"), slot: b.getAttribute("data-slot"), variant: b.getAttribute("data-variant") })) : [],
          icons: host ? [...host.querySelectorAll("svg")].map((s) => ({ rect: px(s), color: getComputedStyle(s).color })) : [],
        };
      }),
    };
  });
}

async function shoot(page, run, name, { scrollTo } = {}) {
  if (scrollTo) await page.locator(scrollTo).first().scrollIntoViewIfNeeded().catch(() => {});
  const f = `${run.key}-${name}.png`;
  // CDP capture: Playwright's page.screenshot waits on document.fonts.ready, which the
  // loaded dev server can stall past 30 s; the compositor frame is what we judge.
  const cdp = await page.context().newCDPSession(page);
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, f), Buffer.from(data, "base64"));
  await cdp.detach();
  run.frames[name] = { file: f, m: await measure(page) };
  return f;
}

async function boot(page, hash) {
  await page.goto(`${BASE}/#${hash}`, { waitUntil: "domcontentloaded", timeout: T });
  await page.waitForSelector(".pane-wrapper", { timeout: T });
}

async function settle(page, ms = 900) { await page.waitForTimeout(ms); }

const hold = () => { let release; const p = new Promise((r) => (release = r)); return { p, release }; };

for (const vp of VIEWPORTS) for (const theme of THEMES) {
  const key = `${vp.tag}-${theme}`;
  if (ONLY && ONLY !== key) continue;
  const run = (meta.runs[key] = meta.runs[key] ?? { key, errors: [], console: [], frames: {} });
  run.passes = [...(run.passes ?? []), { sha, dirty, at: new Date().toISOString(), scen: SCEN }];
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: vp.w < 500 ? 2 : 1 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const scoped = async (label, fn) => {
    if (SCEN && !SCEN.includes(label)) return;
    const page = await ctx.newPage();
    page.on("console", (m) => { if (m.type() === "error") run.console.push(`[${label}] ${m.text().slice(0, 220)}`); });
    page.on("pageerror", (e) => run.console.push(`[${label}] PAGEERROR ${String(e).slice(0, 220)}`));
    try { await fn(page); } catch (e) { run.errors.push(`[${label}] ${String(e).slice(0, 300)}`); }
    await page.close();
  };

  // A. LOADING — in-app hop / -> /mix with the Mix chunk held; then release and catch the swap.
  await scoped("loading-hop", async (page) => {
    const h = hold();
    await page.route(/\/MixPane\.vue(\?|$)/, async (route) => { await h.p; await route.continue().catch(() => {}); });
    await boot(page, "/"); await settle(page, 2500);
    await shoot(page, run, "00-home-before-hop");
    await page.evaluate(() => { location.hash = "#/mix"; });
    await page.waitForSelector(".pane-plate", { timeout: 30000 });
    await settle(page, 1200);
    await shoot(page, run, "01-loading-hop-mix", { scrollTo: ".pane-plate" });
    h.release();
    await page.waitForTimeout(120);
    await shoot(page, run, "02-loading-release-t120");
    await page.waitForFunction(() => !document.querySelector(".pane-plate"), null, { timeout: 60000 }).catch(() => {});
    await settle(page, 1500);
    await shoot(page, run, "03-resolved-mix");
  });

  // B. LOADING — cold deep link /gradient: both regions lazy -> two plates.
  await scoped("loading-deeplink", async (page) => {
    const h = hold();
    await page.route(/\/(GradientPane|PalettesPane)\.vue(\?|$)/, async (route) => { await h.p; await route.continue().catch(() => {}); });
    await boot(page, "/gradient");
    await page.waitForSelector(".pane-plate", { timeout: 30000 });
    await settle(page, 1500);
    await shoot(page, run, "04-loading-deeplink-gradient");
    if (vp.w < 500) { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await settle(page, 500); await shoot(page, run, "04b-loading-deeplink-gradient-scrolled"); }
    h.release();
  });

  // C. CHUNK ERROR — in-app hop with the Mix chunk aborted -> PaneErrorPlate (+hover/focus).
  await scoped("chunk-error-hop", async (page) => {
    await page.route(/\/MixPane\.vue(\?|$)/, (route) => route.abort("failed"));
    await boot(page, "/"); await settle(page, 2500);
    await page.evaluate(() => { location.hash = "#/mix"; });
    await page.waitForSelector(".pane-plate button", { timeout: 30000 });
    await settle(page, 1200);
    await shoot(page, run, "05-chunk-error-hop-mix", { scrollTo: ".pane-plate" });
    const btn = page.locator(".pane-plate button").first();
    await btn.hover(); await settle(page, 400);
    await shoot(page, run, "06-chunk-error-reload-hover");
    await page.mouse.move(2, 2);
    await page.keyboard.press("Tab"); await btn.focus(); await settle(page, 300);
    await shoot(page, run, "07-chunk-error-reload-focus");
  });

  // D. CHUNK ERROR — cold deep link /gradient with both chunks aborted -> two error plates.
  await scoped("chunk-error-deeplink", async (page) => {
    await page.route(/\/(GradientPane|PalettesPane)\.vue(\?|$)/, (route) => route.abort("failed"));
    await boot(page, "/gradient");
    await page.waitForSelector(".pane-plate button", { timeout: 30000 });
    await settle(page, 1500);
    await shoot(page, run, "08-chunk-error-deeplink-gradient");
    if (vp.w < 500) { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await settle(page, 500); await shoot(page, run, "08b-chunk-error-deeplink-gradient-scrolled"); }
  });

  // E. BOUNDARY — the Mix pane's setup throws ONCE (served bytes rewritten in-browser) -> ErrorBoundary plate;
  //    then hover / keyboard focus / Try again -> the real pane mounts.
  await scoped("boundary", async (page) => {
    await page.route(/\/MixPane\.vue(\?|$)/, async (route) => {
      let resp;
      try { resp = await route.fetch({ timeout: 200000 }); } catch (e) { run.errors.push("boundary: route.fetch " + String(e).slice(0, 120)); return route.continue().catch(() => {}); }
      let body = await resp.text();
      if (!/export default /.test(body)) { run.errors.push("boundary: no `export default` in MixPane module"); return route.fulfill({ response: resp, body }); }
      body = body.replace(/export default /, "const __auditReal = ");
      body += `\nexport default { ...__auditReal, setup(p, c) { if (!window.__auditThrew) { window.__auditThrew = true; throw new Error("audit: induced render throw (MixPane setup)"); } return __auditReal.setup(p, c); } };\n`;
      run.boundaryRewrite = body.slice(-600);
      await route.fulfill({ response: resp, body });
    });
    await boot(page, "/"); await settle(page, 2500);
    await page.evaluate(() => { location.hash = "#/mix"; });
    await page.waitForSelector(".vj-error-boundary", { timeout: 150000 }).catch(async (e) => {
      run.boundaryDiag = await page.evaluate(() => ({ threw: !!window.__auditThrew, regions: [...document.querySelectorAll(".pane-wrapper")].map((w) => w.getAttribute("aria-label") + ": " + w.innerText.slice(0, 160)) }));
      await shoot(page, run, "09x-boundary-diag");
      throw e;
    });
    await settle(page, 1200);
    await shoot(page, run, "09-boundary-caught-mix", { scrollTo: ".vj-error-boundary" });
    const btn = page.locator(".vj-error-boundary button").first();
    await btn.hover(); await settle(page, 400);
    await shoot(page, run, "10-boundary-tryagain-hover");
    await page.mouse.move(2, 2);
    await page.keyboard.press("Tab"); await settle(page, 300);
    await shoot(page, run, "11-boundary-tab-from-plate");
    await btn.click();
    await page.waitForFunction(() => !document.querySelector(".vj-error-boundary"), null, { timeout: 20000 }).catch(() => {});
    await settle(page, 1800);
    await shoot(page, run, "12-boundary-after-reset");
  });

  await ctx.close();
  fs.writeFileSync(path.join(OUT, "capture-meta.json"), JSON.stringify(meta, null, 1));
}
await browser.close();
fs.writeFileSync(path.join(OUT, "capture-meta.json"), JSON.stringify(meta, null, 1));
console.log("done", sha, dirty);
