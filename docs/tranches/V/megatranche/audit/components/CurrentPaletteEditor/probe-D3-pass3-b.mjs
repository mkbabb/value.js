import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const BASE = "http://localhost:9000/";

const SEED = {
  inputColor: "lab(92% 88.8 20)",
  savedColors: [
    "lab(92% 88.8 20)", "lab(60% -40 40)", "lab(45% 20 -60)",
    "lab(80% 5 70)", "lab(30% 60 30)", "lab(70% -50 -10)",
    "lab(95% 2 2)", "lab(20% 10 -40)", "lab(55% 70 60)", "lab(88% -20 80)",
    "lab(40% -30 -50)", "lab(65% 40 -30)",
  ],
};

async function seededPage(browser, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, ...opts });
  const page = await ctx.newPage();
  await page.addInitScript((s) => {
    localStorage.setItem("color-picker", JSON.stringify(s));
  }, SEED);
  await page.goto(BASE + "#/palettes", { waitUntil: "load" });
  await page.waitForTimeout(2600);
  return { ctx, page };
}

const browser = await chromium.launch();

{
  const { page } = await seededPage(browser, { width: 1440, height: 900 });
  const pop = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return { found: false };
    const r = well.getBoundingClientRect();
    const dots = [...well.querySelectorAll(".watercolor-swatch")];
    const input = well.querySelector("input");
    const btns = [...well.querySelectorAll("button")];
    const accName = (e) => e.getAttribute("aria-label") || (e.getAttribute("title") ? "TITLE:" + e.getAttribute("title") : "") || e.textContent.replace(/\s+/g, " ").trim() || "<<NO ACCESSIBLE NAME>>";
    const row = well.querySelector(".swatch-row");
    return {
      found: true,
      wellRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      rowRect: row ? { w: +row.getBoundingClientRect().width.toFixed(1), h: +row.getBoundingClientRect().height.toFixed(1) } : null,
      countLabel: well.querySelector(".text-mono-small")?.textContent.trim(),
      swatches: dots.map((d) => ({
        tag: d.tagName, aria: d.getAttribute("aria-label"), ariaHidden: d.getAttribute("aria-hidden"),
        tabIndex: d.tabIndex, pe: getComputedStyle(d).pointerEvents,
        w: +d.getBoundingClientRect().width.toFixed(0), h: +d.getBoundingClientRect().height.toFixed(0),
      })),
      input: input ? {
        w: +input.getBoundingClientRect().width.toFixed(1), h: +input.getBoundingClientRect().height.toFixed(1),
        ariaLabel: input.getAttribute("aria-label"), placeholder: input.placeholder,
        labelled: !!(input.labels && input.labels.length), id: input.id,
        fontSize: getComputedStyle(input).fontSize,
      } : null,
      buttons: btns.map((b) => ({ name: accName(b), w: +b.getBoundingClientRect().width.toFixed(1), h: +b.getBoundingClientRect().height.toFixed(1), disabled: b.disabled })),
      wellFocusables: [...well.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].map((e) => ({ tag: e.tagName, name: accName(e) })),
      offlineChipPresent: !!well.querySelector(".api-offline-chip"),
      offlineChipRole: well.querySelector(".api-offline-chip")?.getAttribute("role"),
      offlineChipText: well.querySelector(".api-offline-chip")?.textContent.trim().slice(0, 60),
      labelStyle: (() => { const l = well.querySelector(".text-small"); if (!l) return null; const c = getComputedStyle(l); return { font: c.fontFamily.split(",")[0], size: c.fontSize, weight: c.fontWeight }; })(),
      captionUtilityResolves: (() => {
        const probe = document.createElement("span"); probe.className = "text-caption"; probe.textContent = "x";
        document.body.appendChild(probe); const fs = getComputedStyle(probe).fontSize; probe.remove(); return fs;
      })(),
      bodyFontSize: getComputedStyle(document.body).fontSize,
    };
  });
  console.log("=== DESKTOP POPULATED (12 colors) ===\n" + JSON.stringify(pop, null, 1));
  await page.screenshot({ path: `${OUT}/pop-desktop-1440.png` });

  const dot = await page.$('.dashed-well .watercolor-swatch');
  if (dot) {
    await dot.hover({ force: true });
    await page.waitForTimeout(700);
    const hp = await page.evaluate(() => {
      const p = document.querySelector(".floating-panel");
      if (!p) return { present: false };
      const cs = getComputedStyle(p); const r = p.getBoundingClientRect();
      let ruleCount = 0;
      for (const ss of document.styleSheets) {
        let rules; try { rules = ss.cssRules; } catch { continue; }
        const walk = (rs) => { for (const rl of rs) { if (rl.selectorText && rl.selectorText.includes("floating-panel")) ruleCount++; if (rl.cssRules) walk(rl.cssRules); } };
        if (rules) walk(rules);
      }
      return { present: true, parent: p.parentElement.tagName, isBodyChild: p.parentElement === document.body,
        inline: p.getAttribute("style"), position: cs.position, top: cs.top, left: cs.left, zIndex: cs.zIndex,
        background: cs.backgroundColor, boxShadow: cs.boxShadow, borderTop: cs.borderTopWidth + " " + cs.borderTopStyle,
        borderRadius: cs.borderRadius, backdropFilter: cs.backdropFilter,
        rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        ariaHidden: p.getAttribute("aria-hidden"), cssRulesDefiningFloatingPanel: ruleCount,
        viewportH: window.innerHeight, docScrollH: document.documentElement.scrollHeight,
        belowFold: r.y > window.innerHeight,
      };
    });
    console.log("=== HOVER PANEL (desktop, canHover=true) ===\n" + JSON.stringify(hp, null, 1));
    await page.screenshot({ path: `${OUT}/hover-panel-viewport.png` });
    await page.screenshot({ path: `${OUT}/hover-panel-full.png`, fullPage: true });
  }

  await page.fill(".dashed-well input", "Dup").catch((e) => console.log("fill fail:", e.message.slice(0, 80)));
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
  console.log("=== after save 1 ===", JSON.stringify(await page.evaluate(() => document.querySelector(".dashed-well")?.textContent.replace(/\s+/g, " ").trim().slice(0, 160))));
  await page.reload({ waitUntil: "load" }); await page.waitForTimeout(2600);
  await page.fill(".dashed-well input", "Dup").catch(() => {});
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
  const dup = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    const live = [...well.querySelectorAll("[role='status'],[role='alert'],[aria-live]")].map((e) => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0, 60) }));
    const btns = [...well.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim(), h: +b.getBoundingClientRect().height.toFixed(1), w: +b.getBoundingClientRect().width.toFixed(1) }));
    return { text: well.textContent.replace(/\s+/g, " ").trim().slice(0, 220), liveRegions: live, buttons: btns, active: document.activeElement.tagName + "/" + (document.activeElement.placeholder || document.activeElement.getAttribute("aria-label") || "") };
  });
  console.log("=== DUPLICATE STATE ===\n" + JSON.stringify(dup, null, 1));
  await page.screenshot({ path: `${OUT}/duplicate-state.png` });
  await page.context().close();
}

{
  const { page } = await seededPage(browser, { width: 390, height: 844 }, { hasTouch: true, isMobile: true });
  const m = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return { found: false };
    const r = well.getBoundingClientRect();
    const dots = [...well.querySelectorAll(".watercolor-swatch")];
    const input = well.querySelector("input");
    const btns = [...well.querySelectorAll("button")];
    return {
      found: true, wellRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      swatchCount: dots.length,
      swatchTags: [...new Set(dots.map((d) => d.tagName))],
      swatchSize: dots[0] ? { w: +dots[0].getBoundingClientRect().width.toFixed(0), h: +dots[0].getBoundingClientRect().height.toFixed(0) } : null,
      canHoverMq: window.matchMedia("(hover: hover)").matches,
      popoverTriggers: document.querySelectorAll('[data-reka-popover-trigger],[aria-haspopup="dialog"]').length,
      inputH: input ? +input.getBoundingClientRect().height.toFixed(1) : null,
      inputW: input ? +input.getBoundingClientRect().width.toFixed(1) : null,
      buttonSizes: btns.map((b) => ({ n: b.getAttribute("aria-label") || b.textContent.trim() || "<<NONE>>", w: +b.getBoundingClientRect().width.toFixed(0), h: +b.getBoundingClientRect().height.toFixed(0) })),
      editOverlayDisplayAt390: (() => { const s = document.createElement("div"); s.className = "edit-overlay glass-floating hidden lg:flex"; document.body.appendChild(s); const d = getComputedStyle(s).display; s.remove(); return d; })(),
    };
  });
  console.log("=== MOBILE 390 POPULATED ===\n" + JSON.stringify(m, null, 1));
  await page.screenshot({ path: `${OUT}/pop-mobile-390.png` });
  await page.context().close();
}

{
  const { page } = await seededPage(browser, { width: 1440, height: 900 }, { colorScheme: "dark" });
  await page.screenshot({ path: `${OUT}/pop-desktop-dark.png` });
  const dk = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const cs = getComputedStyle(well);
    const label = well.querySelector(".text-small");
    const count = well.querySelector(".text-mono-small");
    return { dark: document.documentElement.classList.contains("dark"), bg: cs.backgroundColor, border: cs.borderTopColor, shadow: cs.boxShadow, labelColor: label ? getComputedStyle(label).color : null, countColor: count ? getComputedStyle(count).color : null };
  });
  console.log("=== DARK ===\n" + JSON.stringify(dk, null, 1));
  await page.context().close();
}

{
  const { page } = await seededPage(browser, { width: 1440, height: 900 }, { forcedColors: "active" });
  await page.screenshot({ path: `${OUT}/pop-forced-colors.png` });
  console.log("=== forced-colors shot written ===");
  await page.context().close();
}

{
  const { page } = await seededPage(browser, { width: 1440, height: 900 });
  await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
  await page.waitForTimeout(500);
  const rtl = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const row = well.querySelector(".swatch-row");
    const dots = [...row.querySelectorAll(".watercolor-swatch")];
    return { firstDotX: +dots[0].getBoundingClientRect().x.toFixed(1), lastDotX: +dots[dots.length - 1].getBoundingClientRect().x.toFixed(1), wellX: +well.getBoundingClientRect().x.toFixed(1), wellRight: +well.getBoundingClientRect().right.toFixed(1) };
  });
  console.log("=== RTL ===\n" + JSON.stringify(rtl, null, 1));
  await page.screenshot({ path: `${OUT}/pop-rtl.png` });
  await page.context().close();
}

{
  const { page } = await seededPage(browser, { width: 360, height: 900 });
  const z = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    const r = well.getBoundingClientRect();
    const row = well.querySelector(".swatch-row");
    const input = well.querySelector("input");
    return { wellH: +r.height.toFixed(1), rowH: row ? +row.getBoundingClientRect().height.toFixed(1) : null, inputW: input ? +input.getBoundingClientRect().width.toFixed(1) : null, docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  console.log("=== 360 NARROW ===\n" + JSON.stringify(z, null, 1));
  await page.screenshot({ path: `${OUT}/pop-360.png` });
  await page.context().close();
}

await browser.close();
