import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/palettes";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(2500);

const dom = await page.evaluate(() => {
  const well = document.querySelector(".dashed-well");
  return { html: well.outerHTML.slice(0, 3000) };
});
console.log("=== EMPTY DOM ===\n" + dom.html + "\n");

const addInfo = await page.evaluate(() => {
  const g = document.querySelector(".add-slot-ghost");
  if (!g) return null;
  const cs = getComputedStyle(g);
  return {
    tagName: g.tagName, role: g.getAttribute("role"), type: g.getAttribute("type"),
    tabIndex: g.tabIndex, ariaLabel: g.getAttribute("aria-label"),
    ariaHidden: g.getAttribute("aria-hidden"),
    pointerEvents: cs.pointerEvents, cursor: cs.cursor,
    rect: g.getBoundingClientRect().toJSON(),
  };
});
console.log("=== ADD SLOT ===\n" + JSON.stringify(addInfo, null, 1));

const tabWalk = await page.evaluate(() => {
  const all = [...document.querySelectorAll("*")].filter((e) => {
    if (e.tabIndex < 0) return false;
    const t = e.tagName;
    if (!["A","BUTTON","INPUT","SELECT","TEXTAREA"].includes(t) && !e.hasAttribute("tabindex")) return false;
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  const well = document.querySelector(".dashed-well");
  return all.map((e) => ({
    tag: e.tagName,
    name: (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 28) || e.placeholder || ""),
    inWell: well ? well.contains(e) : false,
  }));
});
console.log("=== TABBABLES (whole doc) ===\n" + JSON.stringify(tabWalk, null, 1));

const before = await page.evaluate(() => document.querySelectorAll('.dashed-well [aria-label^="Color swatch"]').length);
await page.click(".add-slot-ghost", { force: true });
await page.waitForTimeout(700);
const after = await page.evaluate(() => document.querySelectorAll('.dashed-well [aria-label^="Color swatch"]').length);
console.log(`=== ADD CLICK: swatches ${before} -> ${after}`);

for (let i = 0; i < 4; i++) {
  const sliders = await page.$$('[role="slider"]');
  if (sliders[2]) { await sliders[2].focus(); for (let k = 0; k < 12; k++) await page.keyboard.press("ArrowLeft"); }
  await page.waitForTimeout(200);
  await page.click(".add-slot-ghost", { force: true });
  await page.waitForTimeout(300);
}
await page.waitForTimeout(500);

const pop = await page.evaluate(() => {
  const well = document.querySelector(".dashed-well");
  const r = well.getBoundingClientRect();
  const dots = [...well.querySelectorAll('[aria-label^="Color swatch"]')];
  const input = well.querySelector("input");
  const btns = [...well.querySelectorAll("button")];
  const accName = (e) => {
    if (e.getAttribute("aria-label")) return e.getAttribute("aria-label");
    if (e.getAttribute("title")) return "TITLE:" + e.getAttribute("title");
    const t = e.textContent.replace(/\s+/g, " ").trim();
    return t || "<<EMPTY>>";
  };
  return {
    wellH: +r.height.toFixed(2),
    swatchCount: dots.length,
    swatchTag: dots[0]?.tagName, swatchTabIndex: dots[0]?.tabIndex,
    swatchRect: dots[0] ? { w: +dots[0].getBoundingClientRect().width.toFixed(1), h: +dots[0].getBoundingClientRect().height.toFixed(1) } : null,
    input: input ? {
      rect: { w: +input.getBoundingClientRect().width.toFixed(1), h: +input.getBoundingClientRect().height.toFixed(1) },
      ariaLabel: input.getAttribute("aria-label"), placeholder: input.placeholder,
      id: input.id, labelled: !!(input.labels && input.labels.length),
      fontSize: getComputedStyle(input).fontSize,
    } : null,
    buttons: btns.map((b) => ({
      name: accName(b),
      rect: { w: +b.getBoundingClientRect().width.toFixed(1), h: +b.getBoundingClientRect().height.toFixed(1) },
      disabled: b.disabled,
    })),
    wellFocusables: [...well.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].map((e) => ({ tag: e.tagName, name: accName(e) })),
    offlineChip: !!well.querySelector(".api-offline-chip"),
    chipRole: well.querySelector(".api-offline-chip")?.getAttribute("role"),
  };
});
console.log("=== POPULATED ===\n" + JSON.stringify(pop, null, 1));
await page.screenshot({ path: `${OUT}/populated-desktop.png`, fullPage: false });

const dot = await page.$('.dashed-well [aria-label^="Color swatch"]');
if (dot) {
  await dot.hover();
  await page.waitForTimeout(600);
  const hp = await page.evaluate(() => {
    const p = document.querySelector(".floating-panel");
    if (!p) return { present: false };
    const cs = getComputedStyle(p);
    const r = p.getBoundingClientRect();
    let ruleCount = 0;
    for (const ss of document.styleSheets) {
      let rules; try { rules = ss.cssRules; } catch { continue; }
      const walk = (rs) => { for (const rl of rs) { if (rl.selectorText && rl.selectorText.includes("floating-panel")) ruleCount++; if (rl.cssRules) walk(rl.cssRules); } };
      if (rules) walk(rules);
    }
    return {
      present: true, parent: p.parentElement.tagName, isBodyChild: p.parentElement === document.body,
      inline: p.getAttribute("style"), position: cs.position, top: cs.top, left: cs.left,
      zIndex: cs.zIndex, background: cs.backgroundColor, boxShadow: cs.boxShadow,
      border: cs.borderTopWidth + " " + cs.borderTopStyle, borderRadius: cs.borderRadius,
      rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      ariaHidden: p.getAttribute("aria-hidden"),
      cssRulesDefiningFloatingPanel: ruleCount,
      viewportH: window.innerHeight, docScrollH: document.documentElement.scrollHeight,
      offscreen: r.y > window.innerHeight || r.y + r.height < 0,
    };
  });
  console.log("=== HOVER PANEL ===\n" + JSON.stringify(hp, null, 1));
  await page.screenshot({ path: `${OUT}/hover-desktop.png`, fullPage: false });
  await page.screenshot({ path: `${OUT}/hover-desktop-full.png`, fullPage: true });
}

await page.fill('.dashed-well input', "DupTest").catch((e) => console.log("fill1 fail", e.message));
await page.waitForTimeout(150);
await page.keyboard.press("Enter");
await page.waitForTimeout(900);
const afterSave = await page.evaluate(() => ({
  wellText: document.querySelector(".dashed-well")?.textContent.replace(/\s+/g," ").trim().slice(0,200),
}));
console.log("=== AFTER SAVE 1 ===\n" + JSON.stringify(afterSave));

await page.click(".add-slot-ghost", { force: true }).catch(()=>{});
await page.waitForTimeout(400);
await page.fill('.dashed-well input', "DupTest").catch(()=>{});
await page.keyboard.press("Enter");
await page.waitForTimeout(800);
const dup = await page.evaluate(() => {
  const well = document.querySelector(".dashed-well");
  if (!well) return null;
  const live = [...well.querySelectorAll("[role='status'],[role='alert'],[aria-live]")].map((e)=>({role:e.getAttribute("role"),live:e.getAttribute("aria-live"),text:e.textContent.trim().slice(0,60)}));
  return { text: well.textContent.replace(/\s+/g," ").trim().slice(0,240), liveRegions: live, activeEl: document.activeElement.tagName + "/" + (document.activeElement.getAttribute("aria-label")||document.activeElement.placeholder||"") };
});
console.log("=== DUPLICATE FLOW ===\n" + JSON.stringify(dup, null, 1));
await page.screenshot({ path: `${OUT}/duplicate-desktop.png`, fullPage: false });

await browser.close();
