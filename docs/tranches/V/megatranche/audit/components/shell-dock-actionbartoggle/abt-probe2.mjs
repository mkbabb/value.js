// ActionBarToggle probe 2 — the PRM settle-stamp hole, the dead T-36 token,
// the sibling type/glyph rungs, and a clean focus-visible read.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const ORIGIN = "http://localhost:9000";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const out = {};
const browser = await chromium.launch();

const SNAP = () => {
  const t = document.querySelector('[aria-label="Toggle action bar"]');
  const slot = document.querySelector(".action-bar-toggle-slot");
  const inner = document.querySelector(".action-bar-toggle-inner");
  const cs = (el) => (el ? getComputedStyle(el) : null);
  return {
    slotCls: slot ? String(slot.className) : null,
    slotTransProp: cs(slot)?.transitionProperty,
    slotTransDur: cs(slot)?.transitionDuration,
    slotCols: cs(slot)?.gridTemplateColumns,
    innerOverflow: cs(inner)?.overflow,
    toolsW: t ? +t.getBoundingClientRect().width.toFixed(1) : null,
    // does the SFC's T-36 declaration actually reach the producer's hook?
    compactPadVar: t ? getComputedStyle(t).getPropertyValue("--dock-compact-control-padding") : null,
    compactPadUsed: t ? getComputedStyle(t).padding : null,
    gapUsed: t ? getComputedStyle(t).gap : null,
    marginUsed: t ? getComputedStyle(t).marginInlineStart : null,
  };
};

// ── 1 · PRM round-trip: does .is-settled ever come back? ──
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const trail = [];
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  trail.push({ at: "gradient (boot)", ...(await page.evaluate(SNAP)) });
  await page.goto(`${ORIGIN}/#/browse`); await page.waitForTimeout(2000);
  trail.push({ at: "browse (departed)", ...(await page.evaluate(SNAP)) });
  await page.goto(`${ORIGIN}/#/gradient`); await page.waitForTimeout(2500);
  trail.push({ at: "gradient (re-arrival)", ...(await page.evaluate(SNAP)) });
  await page.goto(`${ORIGIN}/#/browse`); await page.waitForTimeout(2000);
  await page.goto(`${ORIGIN}/#/gradient`); await page.waitForTimeout(2500);
  trail.push({ at: "gradient (2nd re-arrival)", ...(await page.evaluate(SNAP)) });
  // hover at the re-arrived state — does the hover capsule get clipped?
  await page.hover('[aria-label="Toggle action bar"]');
  await page.waitForTimeout(400);
  trail.push({ at: "hover after re-arrival", ...(await page.evaluate(SNAP)),
    hoverBox: await page.evaluate(() => { const t = document.querySelector('[aria-label="Toggle action bar"]');
      const r = t.getBoundingClientRect(); const ir = t.closest(".action-bar-toggle-inner").getBoundingClientRect();
      return { tools: [ +r.x.toFixed(1), +r.width.toFixed(1), +r.height.toFixed(1) ],
               inner: [ +ir.x.toFixed(1), +ir.width.toFixed(1), +ir.height.toFixed(1) ],
               overflowLeft: +(ir.left - r.left).toFixed(2), overflowRight: +(r.right - ir.right).toFixed(2),
               overflowTop: +(ir.top - r.top).toFixed(2), overflowBottom: +(r.bottom - ir.bottom).toFixed(2) }; }) });
  await page.screenshot({ path: `${OUT}/abt-prm-rearrival-hover.png`, clip: { x: 440, y: 0, width: 560, height: 90 } });
  out.prmRoundTrip = trail;
  // which rule is rewriting transition-property under PRM?
  out.prmRules = await page.evaluate(() => {
    const slot = document.querySelector(".action-bar-toggle-slot");
    const hits = [];
    for (const ss of document.styleSheets) {
      let rules; try { rules = ss.cssRules; } catch { continue; }
      const walk = (list, cond) => { for (const r of list) {
        if (r.cssRules && (r.conditionText !== undefined || r.media)) walk(r.cssRules, (r.conditionText || r.media?.mediaText || "") + (cond ? " | " + cond : ""));
        else if (r.style && r.selectorText) {
          try { if (!slot.matches(r.selectorText)) continue; } catch { continue; }
          const tp = r.style.getPropertyValue("transition-property") || r.style.getPropertyValue("transition");
          const td = r.style.getPropertyValue("transition-duration");
          if (tp || td) hits.push({ sel: r.selectorText.slice(0, 90), cond, tp, td,
                                     prio: r.style.getPropertyPriority("transition-duration") });
        } } };
      walk(rules, "");
    }
    return hits;
  });
  await ctx.close();
}

// ── 2 · non-PRM round-trip control ──
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  const trail = [];
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  trail.push({ at: "gradient (boot)", ...(await page.evaluate(SNAP)) });
  await page.goto(`${ORIGIN}/#/browse`); await page.waitForTimeout(1800);
  await page.goto(`${ORIGIN}/#/gradient`); await page.waitForTimeout(2500);
  trail.push({ at: "gradient (re-arrival)", ...(await page.evaluate(SNAP)) });
  out.normalRoundTrip = trail;

  // sibling type + glyph rungs
  out.siblings = await page.evaluate(() => {
    const rows = [];
    for (const sel of ['[aria-label="Select view"]', '[aria-label="Toggle action bar"]']) {
      const el = document.querySelector(sel); if (!el) continue;
      const svg = el.querySelector("svg");
      const txt = [...el.querySelectorAll("span")].find((s) => s.textContent.trim().length);
      const s = txt ? getComputedStyle(txt) : null;
      rows.push({ sel, box: (() => { const r = el.getBoundingClientRect(); return [+r.width.toFixed(1), +r.height.toFixed(1)]; })(),
        cls: String(el.className).slice(0, 90),
        pad: getComputedStyle(el).padding, gap: getComputedStyle(el).gap,
        svg: svg ? [+svg.getBoundingClientRect().width.toFixed(1), +svg.getBoundingClientRect().height.toFixed(1)] : null,
        label: txt?.textContent.trim(), font: s?.fontFamily.split(",")[0], size: s?.fontSize, weight: s?.fontWeight, color: s?.color });
    }
    const g = getComputedStyle(document.documentElement);
    rows.push({ tokens: { "--type-small": g.getPropertyValue("--type-small").trim(),
                          "--type-body": g.getPropertyValue("--type-body").trim(),
                          "--dock-icon-glyph": g.getPropertyValue("--dock-icon-glyph").trim(),
                          "--scale-hover-dock": g.getPropertyValue("--scale-hover-dock").trim(),
                          rootFontSize: g.fontSize } });
    return rows;
  });

  // clean focus-visible: mouse parked far away
  await page.mouse.move(20, 700);
  await page.evaluate(() => document.activeElement?.blur?.());
  await page.keyboard.press("Tab"); await page.waitForTimeout(120);
  await page.keyboard.press("Tab"); await page.waitForTimeout(300);
  out.focus = await page.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a);
    return { label: a.getAttribute("aria-label"), outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth,
             outlineColor: s.outlineColor, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow,
             background: s.backgroundColor, scale: s.scale, matchesFV: a.matches(":focus-visible") }; });
  const t = await page.$('[aria-label="Toggle action bar"]');
  const b = await t.boundingBox();
  await page.screenshot({ path: `${OUT}/abt-focus.png`, clip: { x: b.x - 14, y: b.y - 14, width: b.width + 28, height: b.height + 28 } });
  // rest shot of the same crop for a pixel delta
  await page.evaluate(() => document.activeElement?.blur?.());
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/abt-rest-crop.png`, clip: { x: b.x - 14, y: b.y - 14, width: b.width + 28, height: b.height + 28 } });
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/abt-probe2.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
