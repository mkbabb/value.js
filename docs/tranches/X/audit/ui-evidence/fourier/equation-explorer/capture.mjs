// UIA-F equation-explorer — headed Chromium, real GPU. READ-ONLY on the app trees; no API writes
// (compute/simplify are stateless POSTs). Cache is sessionStorage, so every fresh context starts cold.
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
const ONLY = process.env.ONLY; // e.g. "d-light"
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

const measure = (page) => page.evaluate(() => {
  const q = (s, r = document) => r.querySelector(s);
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderTopLeftRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, color: cs.color, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 28), shadow: cs.boxShadow.slice(0, 60) }; };
  const all = (s) => [...document.querySelectorAll(s)].map(box);
  return {
    vw: innerWidth, sw: document.documentElement.scrollWidth, dark: document.documentElement.classList.contains("dark"),
    cards: all(".cartoon-card"), sectionTitles: [...document.querySelectorAll(".collapsible-trigger")].map((t) => ({ text: t.textContent.trim().replace(/\s+/g, " "), ...box(t), open: t.getAttribute("aria-expanded") })),
    input: box(q("#fn-expression")), domain: all("[aria-label^='Domain']"), compute: box(q(".compute-btn")),
    presets: all(".preset-pill"), notation: all(".notation-pill"), autoBtn: box(q("[aria-label^='Auto-select']")),
    sliders: all(".slider-control"), numbers: all(".inline-number"), sliderLabels: all(".slider-label"),
    configLayer: box(q(".eq-panel-left [class*=configurator]")), coeffHeader: (() => { const e = [...document.querySelectorAll(".eq-panel-left *")].find((n) => n.childElementCount === 0 && n.textContent.trim() === "Coefficients"); return box(e?.closest("button") ?? e); })(),
    eqCard: box(q(".eq-card")), katex: box(q(".eq-scroll-region .katex")), katexScroll: (() => { const s = q(".eq-scroll-region"); return s ? [s.scrollWidth, s.clientWidth] : null; })(),
    modeToggle: box(q(".eq-toggle")), modeTabs: all(".eq-toggle [role=tab], .eq-toggle button"), copy: box(q(".copy-pos")), info: box(q(".info-anchor")),
    hovercard: box(q(".info-hovercard")), coeffPop: box(q(".coeff-popover")), coeffs: document.querySelectorAll(".eq-coeff").length,
    plotCanvas: box(q(".convergence-container canvas")), legend: box(q(".legend-overlay")), tooltip: box(q(".curve-tooltip")), tooltipText: q(".curve-tooltip")?.textContent,
    play: box(q(".play-btn")), timeline: box(q(".convergence-timeline")), count: q(".timeline-count")?.textContent,
    mobileTabs: box(q(".lg\\:hidden")), spinner: !!q(".eq-panel-right .animate-spin"), statusText: [...document.querySelectorAll(".eq-panel-right [role=status], .eq-panel-right [role=alert]")].map((e) => e.textContent.trim().replace(/\s+/g, " ").slice(0, 120)),
    dock: box(q(".glass-dock")), header: box(q("header")),
    active: document.activeElement?.outerHTML.slice(0, 140),
  };
});

async function open(ctx, { delayCompute = 0, state = null } = {}) {
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 200)); });
  if (state) await page.addInitScript((s) => { try { sessionStorage.setItem("eq-tab-state-v2", JSON.stringify(s)); } catch {} }, state);
  if (delayCompute) await page.route("**/api/equations/compute", async (r) => { await new Promise((z) => setTimeout(z, delayCompute)); await r.continue(); });
  await page.goto(`${BASE}/equation`, { waitUntil: "domcontentloaded" });
  return page;
}
async function shot(page, tag, name, rec) { await page.waitForTimeout(500); await page.screenshot({ path: `${OUT}${tag}-${name}.png` }); rec[name] = await measure(page); }
const settle = async (page) => { await page.locator(".eq-card").waitFor({ timeout: 20000 }); await page.waitForTimeout(1800); };
const canvasTab = (page) => page.getByRole("tab", { name: /canvas/i }).first();
const controlsTab = (page) => page.getByRole("tab", { name: /controls/i }).first();

for (const [vk, vp] of Object.entries(VPS)) for (const theme of ["light", "dark"]) {
  const tag = `${vk}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const rec = (metrics[tag] = {}); const mob = vk === "m";
  const ctx = await browser.newContext({ viewport: vp, colorScheme: theme, deviceScaleFactor: mob ? 2 : 1, hasTouch: mob, isMobile: mob });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  try {
    // 1 computing spinner (compute delayed 5s)
    let page = await open(ctx, { delayCompute: 5000 });
    await page.waitForTimeout(1500);
    if (mob) { await shot(page, tag, "01-computing-controls", rec); await canvasTab(page).click(); }
    await shot(page, tag, "01-computing", rec);
    await page.unrouteAll({ behavior: "ignoreErrors" }); await page.close();

    // 2 loaded default
    page = await open(ctx); await page.waitForTimeout(800);
    if (mob) { await shot(page, tag, "02-loaded-controls", rec); await page.evaluate(() => document.querySelector(".eq-panel-left")?.scrollTo(0, 99999)); await page.evaluate(() => window.scrollTo(0, 99999)); await shot(page, tag, "02b-loaded-controls-scrolled", rec); await canvasTab(page).click(); }
    await settle(page); await shot(page, tag, "02-loaded", rec);

    if (!mob) {
      // hover + focus probes on the left column (desktop only)
      await page.locator(".preset-pill").nth(2).hover(); await page.waitForTimeout(900); await shot(page, tag, "02c-preset-hover-tooltip", rec);
      await page.mouse.move(700, 880); await page.locator("#fn-expression").focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await shot(page, tag, "02d-kbd-focus", rec);
    }

    // 3 coefficient hover popover (sigma)
    const coeff = page.locator(".eq-coeff").first();
    if (await coeff.count()) { await coeff.hover(); await page.waitForTimeout(700); await shot(page, tag, "03-coeff-popover", rec); } else rec["03-coeff-popover"] = "NO .eq-coeff in sigma mode";

    // 4 expanded mode
    await page.locator(".eq-toggle").getByRole("tab").nth(1).click().catch(async () => page.locator(".eq-toggle button").nth(1).click());
    await page.waitForTimeout(2500); await shot(page, tag, "04-expanded", rec);
    const coeff2 = page.locator(".eq-coeff").first();
    if (await coeff2.count()) { await coeff2.hover(); await page.waitForTimeout(700); await shot(page, tag, "04b-expanded-coeff-popover", rec); }
    await page.locator(".eq-toggle").getByRole("tab").nth(0).click().catch(() => {}); await page.waitForTimeout(1200);

    // 5 convergence hover tooltip — sweep the canvas until a tooltip appears
    await page.locator(".play-btn").click(); await page.waitForTimeout(300); // pause the sweep if playing
    const cb = await page.locator(".convergence-container canvas").boundingBox();
    let found = false;
    for (let fy = 0.15; fy < 0.9 && !found; fy += 0.05) for (let fx = 0.2; fx < 0.7 && !found; fx += 0.1) {
      await page.mouse.move(cb.x + cb.width * fx, cb.y + cb.height * fy); await page.waitForTimeout(40);
      found = (await page.locator(".curve-tooltip").count()) > 0;
    }
    rec.tooltipFound = found; await shot(page, tag, "05-plot-tooltip", rec);
    await page.locator(".legend-entry").nth(0).hover(); await page.waitForTimeout(400); await shot(page, tag, "05b-legend-hover-sum", rec);

    // 6 info hovercard
    if (mob) { await page.locator(".info-anchor").tap(); } else { await page.locator(".info-anchor").hover(); }
    await page.waitForTimeout(900); await shot(page, tag, "06-info-hovercard", rec);
    await page.keyboard.press("Escape"); await page.mouse.move(5, 5); await page.waitForTimeout(500);

    // 7 collapsibles closed (+ coefficients layer opened)
    if (mob) { await controlsTab(page).click(); await page.waitForTimeout(500); }
    for (const t of await page.locator(".collapsible-trigger").all()) await t.click();
    await page.waitForTimeout(700); await shot(page, tag, "07-collapsibles-closed", rec);
    const ch = page.locator(".eq-panel-left").getByRole("button", { name: /Coefficients/ }).first();
    if (await ch.count()) { await ch.click(); await page.waitForTimeout(900); await shot(page, tag, "07b-coefficients-open", rec); }
    await page.close();

    // 8 error + retry: cold (no prior result) and warm (inline banner)
    page = await open(ctx, { state: { expression: "sin((x", domainStart: 0, domainEnd: Math.PI, nHarmonics: 20, budget: 10, notation: "trig" } });
    await page.waitForTimeout(2500); if (mob) await canvasTab(page).click();
    await shot(page, tag, "08-error-cold", rec);
    await page.getByRole("button", { name: /try again/i }).hover().catch(() => {}); await shot(page, tag, "08b-error-cold-retry-hover", rec);
    await page.close();
    page = await open(ctx); await settle(page).catch(() => {});
    if (mob) { /* controls pane is the default */ }
    await page.locator("#fn-expression").fill("x +"); await page.locator("#fn-expression").press("Enter");
    await page.waitForTimeout(2500);
    if (mob) { await shot(page, tag, "09-error-warm-controls", rec); await canvasTab(page).click(); }
    await shot(page, tag, "09-error-warm", rec);
    await page.close();
  } catch (e) { errors.push(`${tag}: ${String(e).slice(0, 300)}`); }
  await ctx.close();
}
writeFileSync(OUT + (ONLY ? `metrics-${ONLY}.json` : "metrics.json"), JSON.stringify({ metrics, errors }, null, 1));
await browser.close(); console.log("errors:", JSON.stringify(errors, null, 1));
