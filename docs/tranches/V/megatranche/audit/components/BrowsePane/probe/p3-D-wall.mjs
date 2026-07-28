// CHALLENGE-D · the POPULATED Browse wall — the state no capture in the audit reached.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/D";
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9010";

const browser = await chromium.launch();

async function open(ctxOpts, extra = {}) {
  const ctx = await browser.newContext({ ...ctxOpts, ...extra });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 140)));
  page.on("pageerror", (e) => errs.push("PAGEERR " + String(e).slice(0, 140)));
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}

const WALL = async (page) => page.evaluate(() => {
  const pane = document.querySelector(".pane-scroll-fade");
  const rr = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) }; };
  const cards = [...pane.querySelectorAll('[data-slot="card"], article')];
  const btns = [...pane.querySelectorAll("button")];
  const smalls = btns.filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && (r.width < 24 || r.height < 24); })
    .map(b => { const r = b.getBoundingClientRect(); return `${(b.getAttribute("aria-label") || b.textContent || "?").trim().slice(0, 22)} ${Math.round(r.width)}x${Math.round(r.height)}`; });
  const state = document.querySelector('[role="alert"]') ? "error"
    : document.querySelector('[aria-label="Loading palettes"]') ? "loading"
    : cards.length > 1 ? "wall" : "empty/other";
  const loadMore = [...pane.querySelectorAll("button")].find(b => /More from the commons/.test(b.textContent || ""));
  return {
    state,
    paneRect: rr(pane), cardCount: cards.length,
    firstCard: rr(cards[1]), lastCard: rr(cards[cards.length - 1]),
    scrollH: pane.scrollHeight, clientH: pane.clientHeight,
    loadMore: rr(loadMore), loadMoreText: loadMore?.textContent?.trim(),
    subCardControls: btns.length,
    tinyControls: smalls,
    // do the palette cards obey the ratified tuple? read their data attrs
    cardTuple: cards.slice(1, 3).map(c => ({
      tag: c.tagName.toLowerCase(),
      cls: String(c.className).slice(0, 120),
      tier: c.getAttribute("data-tier"), material: c.getAttribute("data-material"),
      surface: c.getAttribute("data-surface"), size: c.getAttribute("data-size"),
      role: c.getAttribute("role"), inert: c.hasAttribute("inert"),
      shadow: getComputedStyle(c).boxShadow.slice(0, 60),
      pressedSeats: c.querySelectorAll("[aria-pressed]").length,
      clickableRoot: !!c.onclick || c.getAttribute("tabindex") !== null,
    })),
    // the loading-div AX identity claim
    loadingDivs: [...document.querySelectorAll('[aria-label^="Loading"]')].map(d => `${d.tagName.toLowerCase()} role=${d.getAttribute("role") ?? "NONE"} label=${d.getAttribute("aria-label")}`),
  };
});

// ---------- 1. desktop light, populated
{
  const { ctx, page, errs } = await open({ viewport: { width: 1440, height: 900 } });
  console.log("\n===== WALL desktop-1440 light =====");
  console.log(JSON.stringify(await WALL(page), null, 1), "\nerrs:", errs.slice(0, 4));
  await page.screenshot({ path: `${OUT}/wall-desktop-light.png` });

  // --- filtered-to-zero: type a query that matches nothing
  const input = page.locator(".search-seated input").first();
  await input.fill("zzzzqqqqxxxx");
  await page.waitForTimeout(2500);
  const zero = await page.evaluate(() => {
    const pane = document.querySelector(".pane-scroll-fade");
    return {
      text: pane.innerText.replace(/\s+/g, " ").slice(0, 400),
      loadMoreVisible: [...pane.querySelectorAll("button")].some(b => /More from the commons/.test(b.textContent || "")),
      statusRole: !!pane.querySelector('[role="status"]'),
      eyebrow: pane.querySelector(".text-mono-caption")?.textContent?.trim(),
    };
  });
  console.log("\n----- filtered-to-zero (query 'zzzzqqqqxxxx') -----\n", JSON.stringify(zero, null, 1));
  await page.screenshot({ path: `${OUT}/wall-filtered-zero.png` });
  await input.fill("");
  await page.waitForTimeout(2500);

  // --- sortLoading dim: is the dimmed wall still interactive?
  const dim = await page.evaluate(() => {
    const grid = document.querySelector(".pane-scroll-fade .grid.gap-3 .grid, .pane-scroll-fade [class*='transition-opacity']");
    return grid ? { cls: String(grid.className), pointerEvents: getComputedStyle(grid).pointerEvents, opacity: getComputedStyle(grid).opacity } : null;
  });
  console.log("\n----- wall grid class/pointer-events at rest -----\n", JSON.stringify(dim));

  // --- the out-in transition: measure the pane's scrollHeight through a sort change
  const samples = [];
  await page.evaluate(() => { window.__h = []; const p = document.querySelector(".pane-scroll-fade"); window.__t = setInterval(() => window.__h.push(p.scrollHeight), 16); });
  // trigger a re-load (sort) via the filter popover
  await page.locator('button[aria-label="Filters"]').click();
  await page.waitForTimeout(600);
  await page.locator('label:has-text("Most Popular")').click().catch(() => {});
  await page.waitForTimeout(2600);
  const heights = await page.evaluate(() => { clearInterval(window.__t); return window.__h; });
  const min = Math.min(...heights), max = Math.max(...heights);
  console.log(`\n----- pane scrollHeight through a sort change: min=${min} max=${max} swing=${max - min} samples=${heights.length}`);
  console.log("  trace:", heights.filter((v, i) => i === 0 || v !== heights[i - 1]).slice(0, 40).join(" "));
  await page.keyboard.press("Escape");
  await ctx.close();
}

// ---------- 2. desktop dark
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  await page.screenshot({ path: `${OUT}/wall-desktop-dark.png` });
  await ctx.close();
}

// ---------- 3. mobile
{
  const { ctx, page } = await open({ ...devices["iPhone 14"] });
  console.log("\n===== WALL mobile-390 =====");
  console.log(JSON.stringify(await WALL(page), null, 1));
  await page.screenshot({ path: `${OUT}/wall-mobile-light.png`, fullPage: true });
  await ctx.close();
}

// ---------- 4. 200% zoom
{
  const { ctx, page } = await open({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
  console.log("\n===== WALL zoom200 =====");
  console.log(JSON.stringify(await WALL(page), null, 1));
  await page.screenshot({ path: `${OUT}/wall-zoom200.png` });
  await ctx.close();
}

// ---------- 5. reduced motion — does the wall transition still animate?
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const prm = await page.evaluate(() => {
    // read the vj-morph declarations that apply
    const probe = document.createElement("div");
    probe.className = "vj-morph-enter-active";
    document.body.appendChild(probe);
    const cs = getComputedStyle(probe);
    const out = { transitionDuration: cs.transitionDuration, animationDuration: cs.animationDuration, animationName: cs.animationName };
    probe.remove();
    return { ...out, prm: matchMedia("(prefers-reduced-motion: reduce)").matches };
  });
  console.log("\n===== reduced-motion: vj-morph-enter-active computed =====\n", JSON.stringify(prm));
  await ctx.close();
}

await browser.close();
