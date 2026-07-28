// CHALLENGE-D design probe — GradientVisualizer.vue
// Read-only. Measures: render-tile geometry/aspect, select-trigger truncation,
// type-jurisdiction computed type, divider count, direction-readout reflow,
// dead-control state for type=radial, accessible names, motion tokens.
import { chromium, webkit } from "playwright";

const URL = "http://localhost:9000/#/gradient";
const out = {};

const measure = () => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const pane = [...document.querySelectorAll("main *")].find(
    (e) => e.querySelector('[data-testid="gradient-render-tile"]')
  );
  const tile = q('[data-testid="gradient-render-tile"]');
  const rail = q('[data-testid="gradient-render-tile"]')
    ? document.querySelector('main').querySelector('div[class*="rounded-full"], div[class*="rounded"]')
    : null;
  const rect = (e) => { if (!e) return null; const r = e.getBoundingClientRect();
    return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; };

  // The gradient section root = the flex-col that owns the three <hr>
  const hrs = qa('main hr');

  // Section h3s inside the gradient pane
  const h3s = qa('main h3').map((h) => {
    const cs = getComputedStyle(h);
    return { text: h.textContent.trim(), fontFamily: cs.fontFamily.split(",")[0],
             fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, cls: h.className };
  });

  // Select triggers (Type/Space/Hue)
  const triggers = qa('main button[role="combobox"], main [role="combobox"]').map((t) => {
    const span = t.querySelector('span');
    const inner = [...t.querySelectorAll('*')].find((e) => e.textContent.trim().length && !e.children.length) || t;
    const r = t.getBoundingClientRect();
    return {
      label: t.getAttribute('aria-label'),
      text: t.textContent.trim(),
      clientW: t.clientWidth, scrollW: t.scrollWidth,
      innerText: inner.textContent.trim(),
      innerClientW: inner.clientWidth, innerScrollW: inner.scrollWidth,
      truncated: inner.scrollWidth > inner.clientWidth + 0.5,
      w: +r.width.toFixed(2), h: +r.height.toFixed(2),
    };
  });

  // Tile
  const tcs = tile ? getComputedStyle(tile) : null;
  const tr = rect(tile);

  // The stop-editor bar (the meniscus rail) — the pane protagonist
  const bar = q('main [data-stop-id]') ? q('main [data-stop-id]').parentElement : null;
  const bcs = bar ? getComputedStyle(bar) : null;

  // Direction readout
  const dirLabels = qa('main .section-label').map((s) => s.textContent.trim());
  const dirRow = qa('main .section-label').find((s) => s.textContent.trim() === 'Direction');
  const readout = dirRow ? dirRow.parentElement.lastElementChild : null;
  const rr = rect(readout);

  const slider = q('main [aria-label="Gradient direction"]');
  const sliderRoleEl = slider ? (slider.querySelector('[role="slider"]') || slider) : null;

  const copyBtns = qa('main button').filter((b) => /copy/i.test(b.getAttribute('title') || '') ||
    /copy/i.test(b.getAttribute('aria-label') || '') || b.querySelector('svg.lucide-copy'));

  // nameless buttons in the gradient pane
  const nameless = qa('main button').filter((b) => {
    const n = (b.getAttribute('aria-label') || b.getAttribute('title') || b.textContent || '').trim();
    return n.length === 0;
  }).map((b) => ({ cls: b.className, html: b.outerHTML.slice(0, 220) }));

  return {
    tile: tr && { ...tr, aspect: +(tr.w / tr.h).toFixed(3),
      background: tcs.backgroundImage.slice(0, 160),
      boxShadow: tcs.boxShadow, borderRadius: tcs.borderRadius,
      transition: tcs.transition, ariaLabel: tile.getAttribute('aria-label'), role: tile.getAttribute('role') },
    rail: bar && { ...rect(bar), boxShadow: bcs.boxShadow, borderRadius: bcs.borderRadius },
    hrCount: hrs.length,
    hrStyles: hrs.map((h) => ({ borderColor: getComputedStyle(h).borderTopColor, y: +h.getBoundingClientRect().y.toFixed(1) })),
    h3s, triggers,
    sectionLabels: dirLabels,
    sectionLabelStyle: dirRow ? (() => { const cs = getComputedStyle(dirRow);
      return { fontFamily: cs.fontFamily.split(",")[0], fontSize: cs.fontSize, fontWeight: cs.fontWeight,
               letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, color: cs.color }; })() : null,
    readout: rr && { ...rr, text: readout.textContent.trim(),
      fontVariant: getComputedStyle(readout).fontVariantNumeric,
      minWidth: getComputedStyle(readout).minWidth, width: getComputedStyle(readout).width },
    sliderAria: sliderRoleEl ? {
      role: sliderRoleEl.getAttribute('role'),
      ariaLabel: sliderRoleEl.getAttribute('aria-label') || slider.getAttribute('aria-label'),
      ariaValueNow: sliderRoleEl.getAttribute('aria-valuenow'),
      ariaValueText: sliderRoleEl.getAttribute('aria-valuetext'),
      ariaDisabled: sliderRoleEl.getAttribute('aria-disabled'),
      dataDisabled: sliderRoleEl.getAttribute('data-disabled'),
    } : null,
    copyBtns: copyBtns.map((b) => ({ title: b.getAttribute('title'), ariaLabel: b.getAttribute('aria-label'),
      text: b.textContent.trim(), cls: b.className,
      accName: (b.getAttribute('aria-label') || b.getAttribute('title') || b.textContent.trim()) })),
    namelessInMain: nameless.length,
    namelessSample: nameless.slice(0, 3),
    cssOut: (q('main pre, main code, main textarea') || {}).textContent || null,
  };
};

async function run(engine, name, viewport, extra = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, ...extra });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    out[name] = await page.evaluate(measure);

    // Direction readout reflow: drag readout by keyboard to 0 then 360
    const slider = page.locator('[aria-label="Gradient direction"] [role="slider"]').first();
    const readLeft = async () =>
        page.evaluate(() => {
      const l = [...document.querySelectorAll('main .section-label')].find(s => s.textContent.trim() === 'Direction');
      const r = l.parentElement.lastElementChild.getBoundingClientRect();
      return { left: +r.x.toFixed(2), right: +r.right.toFixed(2), w: +r.width.toFixed(2), text: l.parentElement.lastElementChild.textContent.trim() };
    });
    if (await slider.count()) {
        await slider.focus();
        await page.keyboard.press("Home");
        await page.waitForTimeout(150);
        out[name].readoutAtMin = await readLeft();
        await page.keyboard.press("End");
        await page.waitForTimeout(150);
        out[name].readoutAtMax = await readLeft();
    }

    // type = radial: is the direction slider marked dead? does the tile show a circle?
    const typeTrigger = page.locator('[aria-label="Gradient type"]').first();
    if (await typeTrigger.count()) {
        await typeTrigger.click();
        await page.waitForTimeout(400);
        await page.getByRole("option", { name: /Radial/ }).first().click();
        await page.waitForTimeout(600);
        out[name].radial = await page.evaluate(() => {
      const tile = document.querySelector('[data-testid="gradient-render-tile"]');
      const cs = getComputedStyle(tile);
      const slider = document.querySelector('main [aria-label="Gradient direction"]');
      const thumb = slider ? (slider.querySelector('[role="slider"]') || slider) : null;
      const pre = document.querySelector('main pre, main code, main textarea');
      return {
        tileBg: cs.backgroundImage.slice(0, 200),
        tileAria: tile.getAttribute('aria-label'),
        sliderDisabled: thumb ? { ariaDisabled: thumb.getAttribute('aria-disabled'),
          dataDisabled: thumb.getAttribute('data-disabled'), tabIndex: thumb.tabIndex,
          pointerEvents: getComputedStyle(thumb).pointerEvents, opacity: getComputedStyle(slider).opacity } : null,
        cssOut: pre ? pre.textContent.trim().slice(0, 300) : null,
      };
    });
        await page.screenshot({
            path: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence/challenge-D-${name}-radial.png`,
            clip: (() => {
                const t = out[name].tile;
                return { x: Math.max(0, t.x - 320), y: Math.max(0, t.y - 60), width: 460, height: 240 };
            })(),
        });
    }
    await browser.close();
}

await run(chromium, "desktop-1440", { width: 1440, height: 900 });
await run(chromium, "mobile-390", { width: 390, height: 844 });
await run(chromium, "zoom-200-720", { width: 720, height: 900 });
console.log(JSON.stringify(out, null, 1));
