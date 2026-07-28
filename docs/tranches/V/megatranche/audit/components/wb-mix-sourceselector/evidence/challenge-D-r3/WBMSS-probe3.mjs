import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const FIND = `
(() => {
  const root = document.querySelector('#app') || document.body.firstElementChild;
  const app = root && root.__vue_app__;
  if (!app) return null;
  const out = [];
  const seen = new Set();
  function visitVNode(v, depth) {
    if (!v || depth > 60) return;
    if (Array.isArray(v)) return v.forEach(x => visitVNode(x, depth));
    if (v.component) visitInst(v.component, depth + 1);
    if (v.children && typeof v.children === 'object') visitVNode(v.children, depth + 1);
    if (v.dynamicChildren) visitVNode(v.dynamicChildren, depth + 1);
    if (v.suspense) { visitVNode(v.suspense.activeBranch, depth+1); }
  }
  function visitInst(inst, depth) {
    if (!inst || seen.has(inst) || depth > 60) return;
    seen.add(inst);
    out.push(inst);
    visitVNode(inst.subTree, depth + 1);
  }
  visitInst(app._instance, 0);
  return out;
})()`;

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await p.waitForTimeout(4500);

const found = await p.evaluate(`(() => {
  const insts = ${FIND};
  if (!insts) return 'NO APP';
  window.__WB = insts;
  return insts.map((i,ix) => ix + ':' + (i.type && (i.type.__name || i.type.name) || '?') + ' keys=' + (i.setupState ? Object.keys(i.setupState).slice(0,6).join(',') : 'none')).filter(s => /Mix/i.test(s));
})()`);
console.log("INSTANCES:", JSON.stringify(found, null, 1));

// inject N operands
async function setOperands(n) {
  return p.evaluate((n) => {
    const inst = window.__WB.find((i) => i.setupState && i.setupState.addColor && i.setupState.clearSelection);
    if (!inst) return "no-mixpane-setupState";
    inst.setupState.clearSelection();
    const cols = ["#e11d48", "#0ea5e9", "#22c55e", "#eab308", "#a855f7", "#f97316",
      "#14b8a6", "#ec4899", "#6366f1", "#84cc16", "#f43f5e", "#06b6d4"];
    for (let i = 0; i < n; i++) inst.setupState.addColor(cols[i], i % 2 ? "picker" : "Sunset Vibes");
    return "ok:" + inst.setupState.selectedColors.length;
  }, n);
}

for (const n of [1, 2, 12]) {
  const r = await setOperands(n);
  await p.waitForTimeout(700);
  console.log(`setOperands(${n}) ->`, r);
  const m = await p.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const wr = well.getBoundingClientRect();
    const row = document.querySelector(".swatch-row");
    const rr = row.getBoundingClientRect();
    const chips = [...document.querySelectorAll("[data-mix-source]")];
    const btns = chips.map((c) => {
      const bt = c.querySelector("button");
      if (!bt) return null;
      const br = bt.getBoundingClientRect();
      const cs = getComputedStyle(bt);
      return { w: +br.width.toFixed(1), h: +br.height.toFixed(1), opacity: cs.opacity,
        name: bt.getAttribute("aria-label") || bt.textContent.trim() || bt.title || "«NONE»",
        disabled: bt.disabled, type: bt.getAttribute("type") };
    });
    const dots = chips.map((c) => {
      const d = c.querySelector("[data-testid=watercolor-swatch]");
      return d && { title: d.getAttribute("title"), aria: d.getAttribute("aria-hidden"), cls: String(d.className).slice(0,40) };
    });
    return {
      well: { w: +wr.width.toFixed(1), h: +wr.height.toFixed(1) },
      row: { w: +rr.width.toFixed(1), h: +rr.height.toFixed(1) },
      chipCount: chips.length,
      removeButtons: btns,
      dots,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      wellOverflow: well.scrollHeight - well.clientHeight,
    };
  });
  console.log(`  n=${n}`, JSON.stringify(m));
  await p.screenshot({ path: `${OUT}/WBMSS-n${n}.png` });
}

// hover the first chip to reveal the remove button
await setOperands(3);
await p.waitForTimeout(500);
await p.locator("[data-mix-source]").first().hover();
await p.waitForTimeout(400);
const hov = await p.evaluate(() => {
  const bt = document.querySelector("[data-mix-source] button");
  const cs = getComputedStyle(bt);
  const r = bt.getBoundingClientRect();
  return { opacity: cs.opacity, w: +r.width.toFixed(1), h: +r.height.toFixed(1), transition: cs.transitionProperty + " " + cs.transitionDuration, bg: cs.backgroundColor };
});
console.log("HOVERED REMOVE BUTTON:", JSON.stringify(hov));
await p.screenshot({ path: `${OUT}/WBMSS-hover3.png` });

// keyboard reach: how many tab stops to reach a remove button
const kb = await p.evaluate(() => {
  const well = document.querySelector(".dashed-well");
  const els = [...well.querySelectorAll("button,a[href],input,[tabindex]")];
  return els.map((e) => `${e.tagName}|tabindex=${e.tabIndex}|name=${e.getAttribute("aria-label") || e.textContent.trim() || "«NONE»"}`);
});
console.log("FOCUSABLES IN WELL @n=3:", JSON.stringify(kb));

// contrast of ghost stroke vs well bg
const contrast = await p.evaluate(() => {
  function parse(c) {
    const d = document.createElement("div"); d.style.color = c; document.body.appendChild(d);
    const rgb = getComputedStyle(d).color; d.remove();
    const m = rgb.match(/[\d.]+/g).map(Number); return m.slice(0, 3);
  }
  function lum([r, g, b]) {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  const stroke = document.querySelector(".watercolor-ghost-stroke");
  const sc = getComputedStyle(stroke).borderTopColor;
  const wellBg = getComputedStyle(document.querySelector(".dashed-well")).backgroundColor;
  const L1 = lum(parse(sc)), L2 = lum(parse(wellBg));
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return { strokeColor: sc, wellBg, ratio: +ratio.toFixed(2) };
});
console.log("GHOST STROKE vs WELL (current pink):", JSON.stringify(contrast));

// now set picker color to something near the well tone and re-measure
await setOperands(0);
const setColor = await p.evaluate(() => {
  const inst = window.__WB.find((i) => i.setupState && (i.setupState.inputColor || i.setupState.cssColor));
  return inst ? Object.keys(inst.setupState).slice(0, 25) : "none";
});
console.log("color-session setupState keys:", JSON.stringify(setColor));

await b.close();
