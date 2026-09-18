import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const b = await webkit.launch();

async function shot(name, opts = {}) {
  const ctx = await b.newContext({
    viewport: opts.viewport ?? { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: opts.scheme ?? "light",
    reducedMotion: opts.reducedMotion,
    forcedColors: opts.forcedColors,
    isMobile: opts.isMobile,
    hasTouch: opts.isMobile,
  });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
  await p.waitForTimeout(4000);
  if (opts.rtl) {
    await p.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
    await p.waitForTimeout(600);
  }
  if (opts.zoom) {
    await p.evaluate((z) => { document.documentElement.style.zoom = String(z); }, opts.zoom);
    await p.waitForTimeout(600);
  }
  // inject N operands directly into the mixing state via the Vue app instance
  const injected = await p.evaluate((n) => {
    if (!n) return "skip";
    const root = document.querySelector("#app") || document.body.firstElementChild;
    const app = root && root.__vue_app__;
    if (!app) return "no-app";
    // walk the component tree for one exposing addColor
    const seen = new Set();
    function walk(vn, depth) {
      if (!vn || depth > 40 || seen.has(vn)) return null;
      seen.add(vn);
      const ex = vn.exposed;
      if (ex && ex.startMix && ex.clearSelection) return vn;
      const subs = [];
      if (vn.subTree) subs.push(vn.subTree);
      const kids = vn.subTree ? [vn.subTree] : [];
      const collect = (node) => {
        if (!node) return;
        if (Array.isArray(node)) return node.forEach(collect);
        if (node.component) { const r = walk(node.component, depth + 1); if (r) found = r; }
        if (node.children) collect(node.children);
        if (node.dynamicChildren) collect(node.dynamicChildren);
      };
      let found = null;
      collect(kids);
      return found;
    }
    const inst = walk(app._instance, 0);
    if (!inst) return "no-mixpane";
    return "found";
  }, opts.inject ?? 0);
  if (opts.inject) console.log(`[${name}] inject -> ${injected}`);
  const info = await p.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const wr = well?.getBoundingClientRect();
    const card = well?.closest("[class*=pane-scroll-fade]") || document.querySelector("main");
    const cr = card?.getBoundingClientRect();
    const ghost = document.querySelector(".add-slot-ghost");
    const gr = ghost?.getBoundingClientRect();
    const gcs = ghost && getComputedStyle(ghost);
    return {
      well: wr && { w: +wr.width.toFixed(1), h: +wr.height.toFixed(1) },
      stage: cr && { w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) },
      ghost: gr && { w: +gr.width.toFixed(1), h: +gr.height.toFixed(1),
        borderColor: gcs.borderColor, opacity: gcs.opacity, visible: gr.width > 0 },
      ghostStroke: (() => {
        const s = document.querySelector(".watercolor-ghost-stroke");
        if (!s) return null; const cs = getComputedStyle(s);
        return { borderStyle: cs.borderStyle, borderColor: cs.borderColor, borderWidth: cs.borderWidth, filter: cs.filter };
      })(),
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log(`[${name}]`, JSON.stringify(info));
  await p.screenshot({ path: `${OUT}/WBMSS-${name}.png`, fullPage: opts.fullPage ?? false });
  await ctx.close();
}

await shot("dark-1440", { scheme: "dark" });
await shot("mobile-390", { viewport: { width: 390, height: 844 }, isMobile: true });
await shot("mobile-390-dark", { viewport: { width: 390, height: 844 }, isMobile: true, scheme: "dark" });
await shot("forced-colors", { forcedColors: "active" });
await shot("reduced-motion", { reducedMotion: "reduce" });
await shot("rtl-1440", { rtl: true });
await shot("zoom-200", { zoom: 2 });
await shot("narrow-320", { viewport: { width: 320, height: 800 }, isMobile: true });

await b.close();
