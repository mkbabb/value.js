import { chromium } from "playwright";

const OUT = process.argv[2] ?? "/tmp/strip";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);

const data = await page.evaluate(() => {
  const out = {};
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];

  let chipRuleFound = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs) => {
      for (const r of rs) {
        if (r.cssRules) walk(r.cssRules);
        if (r.selectorText && r.selectorText.includes("glass-chip")) chipRuleFound.push(r.selectorText);
      }
    };
    walk(rules);
  }
  out.chipRulesInCascade = chipRuleFound;

  const strip = q(".specimen-strip");
  out.stripPresent = !!strip;
  if (strip) {
    const cs = getComputedStyle(strip);
    out.strip = {
      rect: strip.getBoundingClientRect().toJSON(),
      scrollWidth: strip.scrollWidth,
      clientWidth: strip.clientWidth,
      overflowX: cs.overflowX,
      borderRadius: cs.borderRadius,
      background: cs.backgroundColor,
      maskImage: (cs.maskImage || cs.webkitMaskImage || "").slice(0, 120),
      className: strip.className,
    };
  }

  const chips = qa(".specimen-tile");
  out.chipCount = chips.length;
  out.chips = chips.slice(0, 40).map((c) => {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    const label = q(".tile-label", c);
    const glyph = q(".tile-glyph path", c);
    return {
      id: c.getAttribute("data-specimen"),
      state: c.getAttribute("data-state"),
      w: +r.width.toFixed(2), h: +r.height.toFixed(2),
      borderRadius: cs.borderRadius,
      bg: cs.backgroundColor,
      bgImage: cs.backgroundImage.slice(0, 70),
      borderColor: cs.borderColor,
      labelColor: label ? getComputedStyle(label).color : null,
      labelSize: label ? getComputedStyle(label).fontSize : null,
      labelWeight: label ? getComputedStyle(label).fontWeight : null,
      labelFamily: label ? getComputedStyle(label).fontFamily.split(",")[0] : null,
      glyphStroke: glyph ? getComputedStyle(glyph).stroke : null,
      glyphWidth: glyph ? getComputedStyle(glyph).strokeWidth : null,
    };
  });

  const radiusOf = (sel, name) => {
    const el = q(sel);
    if (!el) return { name, sel, missing: true };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { name, sel, borderRadius: cs.borderRadius, w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
  };
  out.radiusCorpus = [
    radiusOf(".border-card-edge.rounded-card", "interval row card"),
    radiusOf("[id^=easing-interval] .h-5", "eased ramp"),
    radiusOf(".specimen-strip", "specimen strip (FadingScroll root)"),
    radiusOf(".specimen-tile", "specimen tile (Chip cell)"),
    radiusOf(".readout-rail", "readout rail"),
    radiusOf(".rail-btn", "rail icon button"),
    radiusOf(".specimen-dot", "endpoint dot"),
    radiusOf(".interval-head", "interval head button"),
  ];

  const eyebrow = q(".family-eyebrow");
  if (eyebrow) {
    const cs = getComputedStyle(eyebrow);
    out.eyebrow = { fontSize: cs.fontSize, family: cs.fontFamily.split(",")[0], color: cs.color, opacity: cs.opacity, letterSpacing: cs.letterSpacing, text: eyebrow.textContent };
  }
  const fam2 = qa(".strip-family")[1];
  if (fam2) {
    const cs = getComputedStyle(fam2);
    out.familyDivider = { borderLeft: cs.borderLeftWidth + " " + cs.borderLeftStyle + " " + cs.borderLeftColor, paddingLeft: cs.paddingLeft };
  }

  const rs = getComputedStyle(document.documentElement);
  out.tokens = Object.fromEntries(["--radius-card","--radius-pill","--radius-input","--radius-md","--radius-lg","--touch-target","--card-edge","--muted-foreground","--foreground","--well-bg","--accent-band","--accent-ink","--accent-edge"].map(t => [t, rs.getPropertyValue(t).trim()]));

  const row = q("[style*='--motion-accent']");
  out.rowMotionAccent = row ? getComputedStyle(row).getPropertyValue("--motion-accent").trim() : null;

  const grp = q(".strip-row");
  out.group = grp ? { role: grp.getAttribute("role"), label: grp.getAttribute("aria-label") } : null;
  const first = chips[0];
  if (first) {
    out.chipSemantics = {
      tag: first.tagName, role: first.getAttribute("role"),
      ariaPressed: first.getAttribute("aria-pressed"),
      ariaLabel: first.getAttribute("aria-label"),
      tabindex: first.getAttribute("tabindex"),
      type: first.getAttribute("type"),
      textContent: first.textContent.trim(),
      outerStart: first.outerHTML.slice(0, 300),
    };
  }
  return out;
});

console.log("=== MAIN ===");
console.log(JSON.stringify(data, null, 2));

await page.locator(".specimen-strip").first().screenshot({ path: `${OUT}-strip-1440.png` });
await page.locator("[id^=easing-interval]").first().screenshot({ path: `${OUT}-row-1440.png` });

await page.locator(".specimen-tile").first().focus();
const focusInfo = await page.evaluate(() => {
  const el = document.activeElement;
  const cs = getComputedStyle(el);
  return { tag: el.tagName, cls: el.className, outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, boxShadow: cs.boxShadow };
});
console.log("=== FOCUS ===");
console.log(JSON.stringify(focusInfo, null, 2));
await page.locator(".specimen-strip").first().screenshot({ path: `${OUT}-strip-focus.png` });

await page.locator('[data-specimen="steps"]').first().click({ force: true });
await page.waitForTimeout(700);
const after = await page.evaluate(() => {
  const on = document.querySelector('.specimen-tile[data-state="on"]');
  const offs = [...document.querySelectorAll('.specimen-tile')].filter(e => e.getAttribute("data-state") !== "on");
  const g = (e) => e ? { id: e.getAttribute("data-specimen"), state: e.getAttribute("data-state"), bg: getComputedStyle(e).backgroundColor, bgImg: getComputedStyle(e).backgroundImage.slice(0,60), border: getComputedStyle(e).borderColor, radius: getComputedStyle(e).borderRadius, labelColor: getComputedStyle(e.querySelector(".tile-label")).color, labelWeight: getComputedStyle(e.querySelector(".tile-label")).fontWeight, w: +e.getBoundingClientRect().width.toFixed(1) } : null;
  return { on: g(on), off: g(offs[0]), rowAccent: getComputedStyle(document.querySelector("[style*='--motion-accent']")).getPropertyValue("--motion-accent").trim(), readout: document.querySelector(".readout-rail code")?.textContent };
});
console.log("=== AFTER SELECT steps ===");
console.log(JSON.stringify(after, null, 2));
await page.locator(".specimen-strip").first().screenshot({ path: `${OUT}-strip-steps.png` });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(1000);
const mob = await page.evaluate(() => {
  const strip = document.querySelector(".specimen-strip");
  const chips = [...document.querySelectorAll(".specimen-tile")];
  const r = chips.map(c => { const b = c.getBoundingClientRect(); return { id: c.getAttribute("data-specimen"), w: +b.width.toFixed(1), h: +b.height.toFixed(1), radius: getComputedStyle(c).borderRadius }; });
  return { scrollWidth: strip?.scrollWidth, clientWidth: strip?.clientWidth, under44: r.filter(x => x.w < 44 || x.h < 44).length, total: r.length, sample: r.slice(0,5) };
});
console.log("=== MOBILE 390 ===");
console.log(JSON.stringify(mob, null, 2));
await page.locator(".specimen-strip").first().screenshot({ path: `${OUT}-strip-390.png` });
await page.locator("[id^=easing-interval]").first().screenshot({ path: `${OUT}-row-390.png` });

await browser.close();
