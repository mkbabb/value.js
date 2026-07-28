import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;

// Walk the live Vue tree to the MixPane instance and return its setupState.
const HOOK = `
window.__mix = (() => {
  const app = document.querySelector("#app")?.__vue_app__;
  if (!app) return null;
  const seen = new Set();
  const walk = (vn) => {
    if (!vn || seen.has(vn)) return null;
    seen.add(vn);
    const t = vn.type;
    const name = t && (t.__name || t.name);
    if (name === "MixPane" && vn.component) return vn.component;
    const c = vn.component;
    if (c) { const r = walk(c.subTree); if (r) return r; }
    if (Array.isArray(vn.children)) for (const ch of vn.children) { const r = walk(ch); if (r) return r; }
    if (vn.suspense) { const r = walk(vn.suspense.activeBranch); if (r) return r; }
    return null;
  };
  const inst = walk(app._instance.subTree);
  return inst ? inst.setupState : null;
})();
return !!window.__mix;
`;

const rects = () => {
  const q = (s) => document.querySelector(s);
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect();
    return { x:+b.x.toFixed(1), y:+b.y.toFixed(1), w:+b.width.toFixed(1), h:+b.height.toFixed(1), bottom:+b.bottom.toFixed(1) }; };
  const cards = [...document.querySelectorAll("main *")].filter(e => typeof e.className === "string" && e.className.includes("pane-scroll-fade"));
  const card = cards.find(c => c.textContent.trim().startsWith("Mix"));
  const col = card?.querySelector(".pane-header")?.nextElementSibling;
  const plate = card?.querySelector(".mix-plate");
  const chips = [...(card?.querySelectorAll("[data-mix-source]") ?? [])].map(r);
  return {
    card: r(card), col: r(col), plate: r(plate),
    plateText: plate?.innerText?.replace(/\n+/g, " | ") ?? null,
    scroll: card ? { scrollHeight: card.scrollHeight, clientHeight: card.clientHeight, scrollTop: card.scrollTop } : null,
    deadBelowContent: card && col ? +(card.getBoundingClientRect().bottom - col.getBoundingClientRect().bottom).toFixed(1) : null,
    chipCount: chips.length,
    chipRow: chips.length ? { first: chips[0], last: chips[chips.length-1] } : null,
    selectedWell: (() => { const w = [...card.querySelectorAll("div")].find(d => d.textContent.trim().startsWith("Selected")); return w ? r(w) : null; })(),
    canvas: r(card?.querySelector("canvas")),
  };
};

const b = await webkit.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
const p = await ctx.newPage();
p.on("pageerror", e => console.log("PAGEERROR:", e.message));
p.on("console", m => { if (m.type()==="error") console.log("CONSOLE-ERR:", m.text()); });
await p.goto("http://localhost:9000/#/mix", { waitUntil:"load" });
await p.waitForTimeout(4500);

console.log("hook:", await p.evaluate(new Function(HOOK)));

// ---- 2 operands
await p.evaluate(() => { window.__mix.addColor("#e11d48","picker"); window.__mix.addColor("#0ea5e9","picker"); });
await p.waitForTimeout(400);
console.log("### 2-operands"); console.log(JSON.stringify(await p.evaluate(rects), null, 2));
await p.screenshot({ path: OUT + "D-2operands.png" });

// ---- mix
await p.evaluate(() => window.__mix.startMix());
await p.waitForTimeout(300);
await p.screenshot({ path: OUT + "D-mixing-ghost.png" });
console.log("### mid-mix phase:", await p.evaluate(() => window.__mix.animationPhase.value ?? window.__mix.animationPhase));
await p.waitForTimeout(1600);
console.log("### settled"); console.log(JSON.stringify(await p.evaluate(rects), null, 2));
console.log("phase:", await p.evaluate(() => window.__mix.animationPhase.value));
await p.screenshot({ path: OUT + "D-result-2.png" });

// ---- STALE REPRO: change the space AFTER the result is shown
const before = await p.evaluate(() => document.querySelector(".mix-plate")?.innerText.replace(/\n+/g," | "));
await p.evaluate(() => { window.__mix.colorSpace.value = "srgb"; window.__mix.hueMethod.value = "longer"; });
await p.waitForTimeout(500);
const after = await p.evaluate(() => document.querySelector(".mix-plate")?.innerText.replace(/\n+/g," | "));
console.log("### STALE  before:", before, "\n### STALE  after :", after, "\n### changed:", before !== after);
await p.screenshot({ path: OUT + "D-stale-after-space-change.png" });

// ---- STALE 2: remove an operand after the result is shown
await p.evaluate(() => window.__mix.removeColor(0));
await p.waitForTimeout(400);
console.log("### after removeColor(0): canMix=", await p.evaluate(() => window.__mix.canMix.value),
            " plate still present=", await p.evaluate(() => !!document.querySelector(".mix-plate")),
            " plateText=", await p.evaluate(() => document.querySelector(".mix-plate")?.innerText.replace(/\n+/g," | ")));
await p.screenshot({ path: OUT + "D-stale-after-operand-removed.png" });

// ---- 12 operands
await p.evaluate(() => {
  window.__mix.clearSelection();
  const hs = [0,30,60,90,120,150,180,210,240,270,300,330];
  hs.forEach(h => window.__mix.addColor(`oklch(70% 0.15 ${h})`, "picker"));
});
await p.waitForTimeout(600);
console.log("### 12-operands"); console.log(JSON.stringify(await p.evaluate(rects), null, 2));
await p.screenshot({ path: OUT + "D-12operands.png" });
await p.evaluate(() => window.__mix.startMix());
await p.waitForTimeout(2000);
console.log("### 12-result"); console.log(JSON.stringify(await p.evaluate(rects), null, 2));
await p.screenshot({ path: OUT + "D-12operands-result.png" });
// scrolled to bottom
await p.evaluate(() => { const c=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade")); c.scrollTop = c.scrollHeight; });
await p.waitForTimeout(300);
await p.screenshot({ path: OUT + "D-12operands-scrolled.png" });
console.log("### scrolled"); console.log(JSON.stringify(await p.evaluate(rects), null, 2));

await b.close();
