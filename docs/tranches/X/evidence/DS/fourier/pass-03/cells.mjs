// X-DS fourier pass 3 — AFTER frames for the pass-3 critic's cells (critic-cells/), plus the not-found card.
// Headless real Chrome only (§0ei: channel "chrome", headless true). Usage: node cells.mjs OUT_DIR [BASE]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const notes = {};
async function page(theme, w, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, reducedMotion: opts.reduced ? "reduce" : "no-preference", ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  return p;
}
const shot = (p, name) => p.screenshot({ path: `${OUT}/${name}.png` });
async function paperTo(p, id) {
  await p.goto(`${BASE}/paper`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  // Walk the port down until the anchor exists (sections mount as they near), then park it under the bar.
  for (let i = 0; i < 400; i++) {
    const found = await p.evaluate((id) => { const el = [...document.querySelectorAll(".math-block__number")].find((n) => n.textContent.trim() === id); const port = document.querySelector(".paper-scroll"); if (el) { port.scrollTop += el.getBoundingClientRect().top - 330; return true; } port.scrollTop += 900; return false; }, id);
    await p.waitForTimeout(40);
    if (found) break;
  }
  await p.waitForTimeout(1200);
}
for (const theme of ["light", "dark"]) {
  // /v under reduced motion: the terminal frame (C1), the stage dock expanded (G1), the animation dock expanded.
  {
    const p = await page(theme, 1440, { reduced: true });
    await p.goto(`${BASE}/v/${SLUG}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(5000);
    const c = await p.locator("canvas").first().boundingBox();
    await p.mouse.move(c.x + c.width * 0.6, c.y + c.height * 0.45);
    await p.waitForTimeout(800);
    await shot(p, `v-epicycle-hover-${theme}-1440`);
    notes[`v-${theme}`] = await p.evaluate(() => {
      const a = document.querySelector('[data-slot="configurator"] > .configurator-aside')?.getBoundingClientRect();
      const s = document.querySelector('[data-slot="configurator"] > .configurator-stage')?.getBoundingClientRect();
      return { asideBottom: a && Math.round(a.bottom), stageBottom: s && Math.round(s.bottom) };
    });
    const exp = p.getByRole("button", { name: "Expand dock" });
    if (await exp.count()) { await exp.first().click().catch(() => {}); await p.waitForTimeout(900); }
    await shot(p, `v-stage-dock-expanded-${theme}-1440`);
    if ((await exp.count()) > 0) { await exp.last().click().catch(() => {}); await p.waitForTimeout(900); }
    await shot(p, `v-anim-dock-expanded-${theme}-1440`);
    await p.context().close();
  }
  // /paper: the ToC rail and the sticky bar (C3, C4, C11), wide math (C2), section rule and theorem blocks (C9, C10: latex-paper repin owed).
  for (const w of [1440, 390]) {
    const p = await page(theme, w);
    await paperTo(p, "(1.5)");
    await shot(p, `paper-deep-${theme}-${w}`);
    await p.context().close();
  }
  {
    const p = await page(theme, 1440);
    await paperTo(p, "(1.51)");
    await shot(p, `paper-deeper-${theme}-1440`);
    notes[`katex-${theme}`] = await p.evaluate(() => {
      const n = [...document.querySelectorAll(".math-block__number")].find((x) => x.textContent.trim() === "(1.51)");
      const d = n?.closest(".math-block")?.querySelector(".katex-display");
      if (!d) return null;
      const cs = getComputedStyle(d);
      return { sw: d.scrollWidth, cw: d.clientWidth, mask: cs.maskImage.slice(0, 160), anim: cs.animationName, edgeEnd: cs.getPropertyValue("--math-edge-end") };
    });
    await p.context().close();
  }
  // /equation: Coefficients open (C15), Auto (C7), the f-caption (C14), the thin scrub track (C5).
  {
    const p = await page(theme, 1440);
    await p.goto(`${BASE}/equation`, { waitUntil: "networkidle" });
    await p.waitForTimeout(4000);
    await shot(p, `eq-info-button-${theme}-1440`);
    const hdr = p.locator(".configurator-layer").filter({ hasText: "Coefficients" }).locator(".configurator-layer-header button, .configurator-layer-header [role=button]").first();
    await hdr.click().catch(() => {});
    await p.waitForTimeout(900);
    await p.locator(".configurator-layer").filter({ hasText: "Coefficients" }).scrollIntoViewIfNeeded().catch(() => {});
    await p.waitForTimeout(500);
    await shot(p, `eq-coeffs-open-${theme}-1440`);
    notes[`eq-${theme}`] = await p.evaluate(() => ({
      track: Math.round(document.querySelector(".timeline-row .slider-track")?.getBoundingClientRect().height ?? -1),
      hit: Math.round(document.querySelector(".timeline-row .timeline-slider")?.getBoundingClientRect().height ?? -1),
      fnSub: document.querySelector(".configurator-layer .configurator-layer-header")?.textContent.replace(/\s+/g, " ").trim(),
      coeffSub: [...document.querySelectorAll(".configurator-layer")].find((l) => /Coefficients/.test(l.textContent))?.querySelector(".configurator-layer-header")?.textContent.replace(/\s+/g, " ").trim(),
    }));
    await p.context().close();
  }
  // /gallery card hover (unchanged by this pass; the critic's cell), the dock About card (C12).
  {
    const p = await page(theme, 1440);
    await p.goto(`${BASE}/gallery`, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    const card = p.locator("[data-testid=gallery-card], .gallery-card").first();
    if (await card.count()) { await card.hover(); await p.waitForTimeout(600); }
    await shot(p, `gallery-card-hover-${theme}-1440`);
    const brand = p.getByRole("button", { name: /Fourier analysis|About/i }).first();
    if (await brand.count()) { await brand.click().catch(() => {}); await p.waitForTimeout(800); }
    await shot(p, `about-card-${theme}-1440`);
    await p.context().close();
  }
  // /morph bottom (C13).
  for (const w of [1440, 390]) {
    const p = await page(theme, w);
    await p.goto(`${BASE}/morph`, { waitUntil: "networkidle" });
    await p.waitForTimeout(2500);
    await p.evaluate(() => { const m = document.querySelector("main") ?? document.scrollingElement; m.scrollTop = m.scrollHeight; window.scrollTo(0, document.body.scrollHeight); });
    await p.waitForTimeout(800);
    await shot(p, `morph-bottom-${theme}-${w}`);
    await p.context().close();
  }
  // Not-found card (C6).
  for (const w of [1440, 390]) {
    const p = await page(theme, w);
    await p.goto(`${BASE}/no-such-route`, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    await shot(p, `not-found-${theme}-${w}`);
    await p.context().close();
  }
}
console.log(JSON.stringify(notes, null, 1));
await b.close();
