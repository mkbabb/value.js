// Dock-ellipse probe: walk the dock's layers and dump geometry-relevant computed style.
// usage: node probe.mjs <url> <label> <width> <scheme> <anchorText>
import { chromium } from "playwright";
const [url = "http://localhost:9000/", label = "value-light-1440", width = "1440", scheme = "light", anchor = "Login"] = process.argv.slice(2);
const out = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: +width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3500);
const res = await page.evaluate((anchor) => {
  const props = ["border-top-left-radius","border-top-right-radius","background-color","background-image","border-top","box-shadow","backdrop-filter","clip-path","mask-image","inset","width","height","position","opacity","transform","content","display","filter","outline"];
  const dump = (el, pseudo) => { const cs = getComputedStyle(el, pseudo); const o = {}; for (const p of props) { const v = cs.getPropertyValue(p); if (v && !["none","normal","0px","auto","rgba(0, 0, 0, 0)","static"].includes(v)) o[p] = v; } return o; };
  const desc = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}.${[...el.classList].join(".")}${el.dataset.slot ? `[data-slot=${el.dataset.slot}]` : ""}`;
  // find anchor text element
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let t; while ((t = walker.nextNode())) if (t.textContent.trim() === anchor) break;
  if (!t) return { error: "anchor not found" };
  // climb to the dock root (first ancestor with 'dock' in class/slot and width > 200)
  let root = t.parentElement, chain = [];
  while (root && root !== document.body) { chain.push(root); root = root.parentElement; }
  const dockRoot = chain.find((e) => /dock/i.test(e.className + (e.dataset.slot || "")) && e.getBoundingClientRect().width > 250 && e.getBoundingClientRect().height < 160) || chain[4];
  let top = dockRoot; for (const e of chain) { if (chain.indexOf(e) > chain.indexOf(dockRoot) && /dock/i.test(e.className + (e.dataset.slot||"")) && e.getBoundingClientRect().height < 200) top = e; }
  const layers = [];
  const visit = (el, depth) => {
    const r = el.getBoundingClientRect();
    if (r.width < 150) return; // only large layers
    const entry = { depth, el: desc(el), rect: [r.x, r.y, r.width, r.height].map(Math.round), self: dump(el) };
    for (const ps of ["::before", "::after"]) { const c = getComputedStyle(el, ps).content; if (c && c !== "none" && c !== "normal") entry[ps] = dump(el, ps); }
    layers.push(entry);
    for (const c of el.children) visit(c, depth + 1);
  };
  visit(top, 0);
  const tr = top.getBoundingClientRect();
  const pts = [[tr.x + tr.width / 2, tr.y + 3], [tr.x + tr.width / 2, tr.y + tr.height / 2], [tr.x + 12, tr.y + tr.height / 2], [tr.x + 20, tr.y + 6]];
  const hits = pts.map(([x, y]) => ({ pt: [Math.round(x), Math.round(y)], stack: document.elementsFromPoint(x, y).slice(0, 8).map(desc) }));
  return { top: desc(top), topRect: [tr.x, tr.y, tr.width, tr.height].map(Math.round), layers, hits };
}, anchor);
const fs = await import("node:fs");
fs.writeFileSync(`${out}${label}.json`, JSON.stringify(res, null, 1));
if (res.topRect) { const [x, y, w, h] = res.topRect; await page.screenshot({ path: `${out}${label}.png`, clip: { x: Math.max(0, x - 30), y: Math.max(0, y - 30), width: w + 60, height: h + 60 } }); }
await page.screenshot({ path: `${out}${label}-full.png` });
await browser.close();
console.log(JSON.stringify(res, null, 1).slice(0, 200));
