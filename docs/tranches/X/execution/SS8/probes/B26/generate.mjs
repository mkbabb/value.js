// SS-8 B26 — #/generate cells (Chromium headless). Usage: APP=http://localhost:9026/ node generate.mjs [cell ...]
import { chromium, goto, meanRgb, resolveColorFn, contrast, save, runCells, EV } from "./lib.mjs";
const want = process.argv.slice(2);

const READ = `(() => {
  const resolve = ${resolveColorFn};
  const h = [...document.querySelectorAll("h1,h2,h3")].find((x) => x.textContent.trim() === "Generate");
  const shell = h && h.closest(".pane-shell");
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), right: +b.right.toFixed(1), bottom: +b.bottom.toFixed(1) }; };
  const plate = shell && shell.querySelector("[data-generate-plate]");
  const main = document.querySelector("main");
  const titleRow = plate && plate.children[0];
  const input = plate && plate.querySelector("input");
  const seed = plate && [...plate.querySelectorAll("p")].find((p) => p.classList.contains("text-mono-small"));
  const verbs = plate && plate.querySelector(".ml-auto");
  const triggers = shell ? [...shell.querySelectorAll("[aria-labelledby]")].filter((e) => e.tagName === "BUTTON").map((t) => { const v = t.querySelector("span") || t; return { text: t.textContent.trim(), w: t.clientWidth, valueSW: v.scrollWidth, valueCW: v.clientWidth, truncated: v.scrollWidth > v.clientWidth + 1 }; }) : [];
  const body = shell && shell.querySelector(".pane-scroll-fade");
  const lastContent = body && [...body.querySelectorAll("*")].reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom), 0);
  const thumb = shell && shell.querySelector('[aria-label="Number of colors"] [role="slider"], [role="slider"][aria-label="Number of colors"]');
  const ts = thumb && getComputedStyle(thumb);
  const slider = shell && shell.querySelector('[aria-label="Number of colors"]');
  const track = slider && (slider.querySelector(".slider-track") || slider.querySelector("[data-slot=slider-track]"));
  const countLabel = slider && slider.closest(".flex.flex-col") && slider.closest(".flex.flex-col").querySelector(".tabular-nums");
  const gradDivs = shell ? [...shell.querySelectorAll("*")].filter((e) => /gradient/.test(getComputedStyle(e).backgroundImage)).map((e) => { const s = getComputedStyle(e); return { cls: String(e.className).slice(0, 80), bgImage: s.backgroundImage.slice(0, 60), bgColor: s.backgroundColor, fca: s.forcedColorAdjust, ...r(e) }; }) : [];
  return {
    heading: h ? h.tagName + ":" + h.textContent.trim() : null, hash: location.hash,
    mainRect: r(main), paneRect: r(shell), plateRect: r(plate), cardShare: shell && main ? +(shell.getBoundingClientRect().width / main.getBoundingClientRect().width).toFixed(4) : null,
    titleRowH: titleRow ? +titleRow.getBoundingClientRect().height.toFixed(1) : null,
    input: input ? { sw: input.scrollWidth, cw: input.clientWidth, value: input.value } : null,
    seed: seed ? { color: getComputedStyle(seed).color, rgba: resolve(getComputedStyle(seed).color), rect: r(seed), text: seed.textContent.trim().slice(0, 40) } : null,
    plateBg: plate ? getComputedStyle(plate).backgroundColor : null,
    verbsRect: r(verbs), seedRowWraps: seed && verbs ? Math.abs(seed.getBoundingClientRect().top - verbs.getBoundingClientRect().top) > 8 : null,
    triggers,
    emptyTailPx: shell && lastContent ? +(shell.getBoundingClientRect().bottom - lastContent).toFixed(1) : null,
    thumb: thumb ? { ...r(thumb), bg: ts.backgroundColor, border: ts.borderTopColor + " " + ts.borderTopWidth, boxShadow: ts.boxShadow.slice(0, 80) } : null,
    trackRect: r(track), countLabel: countLabel ? { color: getComputedStyle(countLabel).color, rgba: resolve(getComputedStyle(countLabel).color), rect: r(countLabel) } : null,
    gradDivs: gradDivs.slice(0, 6),
  };
})()`;

/** Ink contrast against the rendered ground: hide the ink, sample the ground under it. */
async function inkContrast(page, sel, rect, rgba) {
  if (!rect) return null;
  await page.evaluate((s) => { const e = document.querySelector(s); if (e) e.style.setProperty("color", "transparent", "important"); }, sel);
  const g = await meanRgb(page, { x: rect.x, y: rect.y, width: Math.max(4, rect.w), height: Math.max(4, rect.h) });
  await page.evaluate((s) => { const e = document.querySelector(s); if (e) e.style.removeProperty("color"); }, sel);
  const a = rgba[3] ?? 1;
  const ink = [0, 1, 2].map((i) => rgba[i] * a + [g.r, g.g, g.b][i] * (1 - a));
  return { ink: ink.map(Math.round), ground: [g.r, g.g, g.b].map((v) => +v.toFixed(1)), ratio: contrast(ink, [g.r, g.g, g.b]) };
}

async function choosePreset(page, name) {
  const trig = page.locator(".pane-shell button[aria-labelledby]").first();
  await trig.click();
  await page.waitForTimeout(600);
  await page.locator('[role="option"]').filter({ hasText: new RegExp("^\\s*" + name, "i") }).first().click();
  await page.waitForTimeout(1500);
}

/** Thumb ring vs the track pixels either side of the thumb. */
async function thumbRatio(page) {
  const d = await page.evaluate(`(() => { const resolve = ${resolveColorFn}; const t = document.querySelector('[aria-label="Number of colors"] [role="slider"], [role="slider"][aria-label="Number of colors"]'); const r = t.getBoundingClientRect(); const s = getComputedStyle(t); return { x: r.x, y: r.y, w: r.width, h: r.height, ring: resolve(s.borderTopColor), ringW: s.borderTopWidth, bg: s.backgroundColor }; })()`);
  const left = await meanRgb(page, { x: Math.max(0, d.x - 8), y: d.y + d.h / 2 - 2, width: 6, height: 4 });
  const right = await meanRgb(page, { x: d.x + d.w + 2, y: d.y + d.h / 2 - 2, width: 6, height: 4 });
  const ring = d.ring.slice(0, 3);
  return { thumb: { w: d.w, h: d.h, ringW: d.ringW, bg: d.bg, ring: d.ring }, vsLeft: contrast(ring, [left.r, left.g, left.b]), vsRight: contrast(ring, [right.r, right.g, right.b]) };
}

const cell = (name, opts, extra) => [name, opts, async (page) => {
  await goto(page, "generate");
  const read = await page.evaluate(READ);
  const out = { read };
  if (extra) Object.assign(out, await extra(page, read));
  await page.screenshot({ path: EV + "generate-" + name + ".png" });
  return out;
}];

const cells = [
  cell("1440-light", { w: 1440, h: 900 }, async (page, read) => ({
    seedContrast: await inkContrast(page, "[data-generate-plate] p.text-mono-small", read.seed && read.seed.rect, read.seed && read.seed.rgba),
    countContrast: await inkContrast(page, ".pane-shell .tabular-nums.plate-ink", read.countLabel && read.countLabel.rect, read.countLabel && read.countLabel.rgba),
  })),
  cell("1440-dark", { w: 1440, h: 900, scheme: "dark" }, async (page, read) => ({
    seedContrast: await inkContrast(page, "[data-generate-plate] p.text-mono-small", read.seed && read.seed.rect, read.seed && read.seed.rgba),
  })),
  cell("1280-light", { w: 1280, h: 800 }),
  cell("390-light", { w: 390, h: 844, mobile: true, hasTouch: true }, async (page) => {
    try { await page.locator(".pane-shell button[aria-labelledby]").nth(1).click(); await page.waitForTimeout(600); await page.locator('[role="option"]').filter({ hasText: /Split complementary/i }).first().click(); await page.waitForTimeout(1200); } catch (e) { return { splitErr: String(e.message).slice(0, 120) }; }
    return { afterSplit: (await page.evaluate(READ)).triggers };
  }),
  cell("320-light", { w: 320, h: 720, mobile: true, hasTouch: true }, async (page) => {
    try { await page.locator(".pane-shell button[aria-labelledby]").nth(1).click(); await page.waitForTimeout(600); await page.locator('[role="option"]').filter({ hasText: /Split complementary/i }).first().click(); await page.waitForTimeout(1200); } catch (e) { return { splitErr: String(e.message).slice(0, 120) }; }
    return { afterSplit: (await page.evaluate(READ)).triggers };
  }),
  cell("r8-route-hold", { w: 1440, h: 900 }, async (page) => {
    const trail = [];
    for (let t = 0; t < 6; t++) {
      if (t === 2) await page.locator(".pane-shell button", { hasText: "Regenerate" }).first().click();
      if (t === 4) { await page.locator(".pane-shell button[aria-labelledby]").first().click(); await page.waitForTimeout(500); await page.keyboard.press("Escape"); }
      await page.waitForTimeout(3000);
      trail.push(await page.evaluate(() => ({ hash: location.hash, h1: (document.querySelector("h1") || {}).textContent?.trim() || null })));
    }
    return { trail, drifted: trail.some((x) => x.hash !== "#/generate" || x.h1 !== "Generate") };
  }),
  ...[[320, 720], [360, 740], [390, 844]].map(([w, h]) => cell("r9-trunc-" + w, { w, h, mobile: true, hasTouch: true }, async (page) => {
    const measure = () => page.evaluate(() => {
      const shell = document.querySelector(".pane-shell");
      const pr = shell.getBoundingClientRect();
      return [...shell.querySelectorAll("button[aria-labelledby]")].map((t) => {
        const r = t.getBoundingClientRect();
        const leaf = [...t.querySelectorAll("*")].filter((e) => e.children.length === 0 && e.textContent.trim()).map((e) => ({ text: e.textContent.trim(), sw: e.scrollWidth, cw: e.clientWidth, overflowX: getComputedStyle(e).textOverflow }));
        const cell = t.parentElement.getBoundingClientRect();
        return { full: t.textContent.trim(), x: +r.x.toFixed(1), w: +r.width.toFixed(1), right: +r.right.toFixed(1), cellW: +cell.width.toFixed(1), paneRight: +pr.right.toFixed(1), vw: innerWidth, overflowPanePx: +(r.right - pr.right).toFixed(1), leaf };
      });
    });
    const before = await measure();
    await page.locator(".pane-shell button[aria-labelledby]").nth(1).click(); await page.waitForTimeout(600);
    await page.locator('[role="option"]').filter({ hasText: /Split complementary/i }).first().click(); await page.waitForTimeout(1200);
    await page.locator("h1").first().click(); await page.waitForTimeout(400);
    return { before, afterSplit: await measure() };
  })),
  cell("forced-1440", { w: 1440, h: 900, forcedColors: "active" }),
  cell("thumbs-1440", { w: 1440, h: 900 }, async (page) => {
    const presets = await page.evaluate(() => null);
    const trig = page.locator(".pane-shell button[aria-labelledby]").first();
    await trig.click(); await page.waitForTimeout(600);
    const names = (await page.locator('[role="option"] .font-display').allTextContents()).map((s) => s.trim());
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    const per = {};
    for (const n of names) {
      try { await choosePreset(page, n); const rs = []; for (let i = 0; i < 3; i++) { rs.push(await thumbRatio(page)); await page.locator(".pane-shell button", { hasText: "Regenerate" }).first().click(); await page.waitForTimeout(900); } per[n] = { min: Math.min(...rs.flatMap((x) => [x.vsLeft, x.vsRight])), samples: rs.map((x) => [x.vsLeft, x.vsRight]), thumb: rs[0].thumb }; }
      catch (e) { per[n] = { error: String(e.message).slice(0, 120) }; }
    }
    return { presets: names, per };
  }),
];

const out = { app: process.env.APP, at: new Date().toISOString() };
const browser = await chromium.launch();
try { await runCells(browser, cells.filter(([n]) => !want.length || want.includes(n)), out); }
finally { await browser.close(); save("generate" + (want.length ? "-" + want.join("+") : "") + ".json", out); }
