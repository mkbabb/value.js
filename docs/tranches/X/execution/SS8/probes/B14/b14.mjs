// SS-8 · batch B14-card-grid-skeleton — the live witness probe.
// One headless Chromium per run; one context per cell; everything closed in finally.
// Run: ~/.claude/guard/guarded --timeout 15 -- node docs/tranches/X/execution/SS8/probes/B14/b14.mjs [cell ...]
// Output: evidence/B14-card-grid-skeleton/b14-<cell>.json (+ a few PNGs).
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../../evidence/B14-card-grid-skeleton");
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:9000/";
const VP = { width: 1440, height: 900 };
const API_LIST = /:3000\/palettes(\?|$)/;

const HUES = [20, 60, 140, 200, 260, 320];
const mockPalettes = (n = 6, colors = 5) =>
  Array.from({ length: n }, (_, i) => ({
    id: `mock-${i}`,
    name: `Probe palette ${i}`,
    slug: `probe-${i}`,
    userSlug: "probe-user",
    colors: Array.from({ length: colors }, (_, j) => ({
      css: `oklch(${0.45 + j * 0.1} 0.12 ${HUES[i % 6] + j * 12})`,
      position: j,
    })),
    tags: [],
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
    isLocal: false,
    voteCount: 2,
    visibility: "public",
    tier: "standard",
  }));

async function mockList(ctx, { delay = 0, status = 200 } = {}) {
  await ctx.route(API_LIST, async (route) => {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    if (status !== 200)
      return route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: "forbidden" }) });
    const q = new URL(route.request().url()).searchParams.get("q");
    let data = mockPalettes();
    if (q) data = data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data, nextCursor: null, hasMore: false }) });
  });
}

const save = (name, obj) => writeFileSync(resolve(OUT, `b14-${name}.json`), JSON.stringify(obj, null, 1));

// in-page helpers -----------------------------------------------------------
const skeletonRead = () => {
  const roots = [...document.querySelectorAll('[data-slot="palette-card-skeleton"]')];
  const blocks = roots.flatMap((r) => [...r.querySelectorAll('[data-slot="skeleton"], .skeleton-seg, [class*="skeleton"]')]).filter((e) => e !== null);
  const uniq = (a) => [...new Set(a)];
  const cs = (e, p) => getComputedStyle(e, p);
  const wc = [...document.querySelectorAll("*")].filter((e) => cs(e).willChange.includes("transform")).length;
  return {
    roots: roots.length,
    rootBg: uniq(roots.map((r) => cs(r).backgroundColor)),
    rootHeights: uniq(roots.map((r) => Math.round(r.getBoundingClientRect().height * 10) / 10)),
    blockCount: blocks.length,
    blockBgs: uniq(blocks.map((b) => cs(b).backgroundColor)),
    blockBgImgs: uniq(blocks.map((b) => cs(b).backgroundImage.slice(0, 90))),
    elementAnimationNames: uniq(blocks.map((b) => cs(b).animationName)),
    elementAnimDelays: uniq(blocks.map((b) => cs(b).animationDelay)),
    afterAnimationNames: uniq(blocks.map((b) => cs(b, "::after").animationName)),
    afterAnimDelays: uniq(blocks.map((b) => cs(b, "::after").animationDelay)),
    afterBgs: uniq(blocks.map((b) => cs(b, "::after").backgroundColor)),
    shimmerDelayVars: uniq(blocks.map((b) => cs(b).getPropertyValue("--skeleton-shimmer-delay").trim())),
    runningAnimations: document.getAnimations().filter((a) => roots.some((r) => r.contains(a.effect?.target))).length,
    willChangeTransformElements: wc,
  };
};

async function pixelAt(page, ctx, buf, points) {
  // decode a screenshot in a throwaway page; return rgb at points
  const p = await ctx.newPage();
  try {
    return await p.evaluate(async ({ b64, points }) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const c = new OffscreenCanvas(img.width, img.height);
      const g = c.getContext("2d");
      g.drawImage(img, 0, 0);
      return points.map(([x, y]) => [...g.getImageData(x, y, 1, 1).data.slice(0, 3)]);
    }, { b64: buf.toString("base64"), points });
  } finally { await p.close(); }
}

async function pixelDiff(ctx, a, b) {
  const p = await ctx.newPage();
  try {
    return await p.evaluate(async ({ a, b }) => {
      const load = async (s) => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = new OffscreenCanvas(i.width, i.height); const g = c.getContext("2d"); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height); };
      const A = await load(a), B = await load(b);
      let n = 0, maxd = 0; const w = A.width, h = A.height; let minX = w, maxX = -1, minY = h, maxY = -1;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2])); if (d > 2) { n++; if (d > maxd) maxd = d; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; } }
      return { w, h, changedPx: n, maxDelta: maxd, bbox: n ? { minX, maxX, minY, maxY } : null };
    }, { a: a.toString("base64"), b: b.toString("base64") });
  } finally { await p.close(); }
}

const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return Math.round(((x + 0.05) / (y + 0.05)) * 1000) / 1000; };

// cells ------------------------------------------------------------------------
const cells = {
  // PCS U-1 / U-4 / U-5 · loading wall, light + dark
  async loading(browser) {
    const res = {};
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: VP, colorScheme: scheme });
      try {
        await mockList(ctx, { delay: 8000 });
        const page = await ctx.newPage();
        await page.goto(BASE + "#/browse");
        await page.waitForSelector('[data-slot="palette-card-skeleton"]', { timeout: 6000 });
        await page.waitForTimeout(1200);
        const r = await page.evaluate(skeletonRead);
        const root = page.locator('[data-slot="palette-card-skeleton"]').first();
        const bb = await root.boundingBox();
        const blk = await root.evaluate((e) => { const s = e.querySelector("div > *"); const b = s.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
        const shot = await page.screenshot();
        writeFileSync(resolve(OUT, `loading-browse-1440-${scheme}.png`), shot);
        // well: inside the card, in the meta row right of the blocks; block: strip centre
        const pts = [[Math.round(bb.x + bb.width - 40), Math.round(bb.y + bb.height - 12)], [Math.round(blk.x + blk.w / 2), Math.round(blk.y + blk.h / 2)]];
        const [well, block] = await pixelAt(page, ctx, shot, pts);
        res[scheme] = { ...r, paintedWell: well, paintedBlock: block, paintedContrast: contrast(well, block), samplePoints: pts };
      } finally { await ctx.close(); }
    }
    save("loading", res);
  },

  // PCG U-1 U-3 U-4 U-5 U-6b · PCS U-2 (browse) · SP-6 · populated browse
  async populated(browser) {
    const ctx = await browser.newContext({ viewport: VP, colorScheme: "light" });
    try {
      await mockList(ctx);
      const page = await ctx.newPage();
      await page.goto(BASE + "#/browse", { waitUntil: "networkidle" });
      await page.waitForSelector('[role="article"]');
      await page.waitForTimeout(1500);
      const r = await page.evaluate(() => {
        const grids = [...document.querySelectorAll(".palette-card-grid")];
        const arts = [...document.querySelectorAll('[data-pane="browse"] [role="article"], .palette-card-grid [role="article"]')];
        const meta = arts[0] && [...arts[0].querySelectorAll("*")].find((e) => /Probe palette 0/.test(e.textContent || "") && e.children.length > 1 && e.getBoundingClientRect().height < 80);
        return {
          gridContain: grids.map((g) => ({ cls: g.className.slice(-40), contain: getComputedStyle(g).contain, h: g.getBoundingClientRect().height })),
          articleHeights: [...new Set(arts.map((a) => Math.round(a.getBoundingClientRect().height * 10) / 10))],
          articleCount: arts.length,
          firstArticleRows: arts[0] ? [...arts[0].querySelectorAll(":scope > *, :scope > * > *")].slice(0, 8).map((e) => ({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className).slice(0, 50), h: Math.round(e.getBoundingClientRect().height * 10) / 10 })) : [],
          nameRow: meta ? { cls: (meta.className || "").slice(0, 60), h: meta.getBoundingClientRect().height } : null,
        };
      });
      // AX tree: anonymous lists
      const cdp = await ctx.newCDPSession(page);
      const { nodes } = await cdp.send("Accessibility.getFullAXTree");
      const byId = new Map(nodes.map((n) => [n.nodeId, n]));
      const lists = nodes.filter((n) => n.role?.value === "list").map((n) => ({
        name: n.name?.value ?? "",
        ignored: n.ignored,
        childRoles: (n.childIds || []).map((c) => byId.get(c)?.role?.value),
      }));
      r.axLists = lists;
      // press: --cast-spread / scale of the card's caster before + during press
      const art = page.locator('.palette-card-grid [role="article"]').first();
      const castRead = () => art.evaluate((a) => {
        const c = a.querySelector(".cartoon-cast") || a.parentElement.querySelector(".cartoon-cast");
        return c ? { spread: getComputedStyle(c).getPropertyValue("--cast-spread").trim(), scale: getComputedStyle(c).scale, pressT: getComputedStyle(c).getPropertyValue("--cartoon-press-t").trim() } : { caster: "none in card subtree", rootTransform: getComputedStyle(a).transform, rootScale: getComputedStyle(a).scale };
      });
      r.castRest = await castRead();
      const ab = await art.boundingBox();
      await page.mouse.move(ab.x + ab.width - 30, ab.y + ab.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(250);
      r.castPressed = await castRead();
      await page.mouse.up();
      // PCG U-5: containment amputation pixel delta (browse grid, padded clip)
      await page.mouse.move(5, 5);
      await page.waitForTimeout(600);
      const g = await page.locator(".palette-card-grid").first().boundingBox();
      const clip = { x: Math.max(0, g.x - 24), y: Math.max(0, g.y - 24), width: g.width + 48, height: Math.min(g.height + 48, VP.height - g.y + 24) };
      const withRule = await page.screenshot({ clip });
      await page.addStyleTag({ content: ".palette-card-grid{contain:none !important}" });
      await page.waitForTimeout(400);
      const without = await page.screenshot({ clip });
      writeFileSync(resolve(OUT, "contain-on-browse-1440-light.png"), withRule);
      writeFileSync(resolve(OUT, "contain-off-browse-1440-light.png"), without);
      r.containDiff = { clip, ...(await pixelDiff(ctx, withRule, without)) };
      save("populated", r);
    } finally { await ctx.close(); }
  },

  // PCG U-2 U-6a U-8 · filtered-zero plate, timing + mutation shape
  async filter(browser) {
    const ctx = await browser.newContext({ viewport: VP, colorScheme: "light" });
    try {
      await mockList(ctx);
      const page = await ctx.newPage();
      await page.goto(BASE + "#/browse", { waitUntil: "networkidle" });
      await page.waitForSelector('.palette-card-grid [role="article"]');
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        window.__muts = [];
        const grid = document.querySelector(".palette-card-grid");
        new MutationObserver((ms) => {
          const t = performance.now();
          for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1) {
            const st = n.matches('[role="status"]') ? n : n.querySelector?.('[role="status"]');
            if (st) window.__muts.push({ t, statusInsertedWithText: (st.textContent || "").trim().slice(0, 60), sameNode: st === n });
          }
        }).observe(grid.parentElement, { childList: true, subtree: true });
      });
      const input = page.locator('input[placeholder="Search palettes..."]');
      const step = async (text) => {
        await input.fill("");
        await page.waitForTimeout(700);
        const t0 = await page.evaluate(() => performance.now());
        await input.fill(text);
        const res = await page.evaluate(async ({ t0 }) => {
          const start = performance.now();
          while (performance.now() - start < 3000) {
            await new Promise((r) => requestAnimationFrame(r));
            const g = document.querySelector(".palette-card-grid");
            const n = g.querySelectorAll('[role="article"]').length;
            const st = g.querySelector('[role="status"]');
            if ((window.__want === 0 && st) || (window.__want > 0 && n === window.__want)) return { ms: Math.round(performance.now() - t0), gridH: g.getBoundingClientRect().height, arts: n, artH: [...g.querySelectorAll('[role="article"]')].map((a) => a.getBoundingClientRect().height) };
          }
          return { ms: null };
        }, { t0 });
        return res;
      };
      await page.evaluate(() => (window.__want = 0));
      const zero = await step("zzzz-no-match");
      const muts = await page.evaluate(() => window.__muts);
      await page.evaluate(() => (window.__want = 1));
      const one = await step("Probe palette 3");
      save("filter", { zero, muts, one });
    } finally { await ctx.close(); }
  },

  // Standing note · 401/403 on the browse list
  async denied(browser) {
    const out = {};
    for (const status of [401, 403]) {
      const ctx = await browser.newContext({ viewport: VP });
      try {
        await mockList(ctx, { status });
        const page = await ctx.newPage();
        await page.goto(BASE + "#/browse", { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        out[status] = await page.evaluate(() => {
          const pane = document.querySelector('[data-pane="browse"]');
          return {
            browseGridPresent: !!pane?.querySelector(".palette-card-grid"),
            browseGridEmptyPlate: (pane?.querySelector(".palette-card-grid [role='status']")?.textContent || "").trim().slice(0, 80),
            statusTexts: [...(pane?.querySelectorAll('[role="status"],[role="alert"]') || [])].map((e) => (e.textContent || "").trim().slice(0, 100)),
          };
        });
      } finally { await ctx.close(); }
    }
    save("denied", out);
  },

  // PCS U-2 (library) · PCG U-7 dev drag
  async library(browser) {
    const ctx = await browser.newContext({ viewport: VP });
    try {
      const pals = mockPalettes(3).map((p, i) => ({ ...p, id: `lib-${i}`, slug: `lib-${i}`, name: `Library ${i}`, isLocal: true }));
      await ctx.addInitScript((s) => { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("color-palettes", s); sessionStorage.setItem("seeded", "1"); } }, JSON.stringify({ version: 1, palettes: pals }));
      const page = await ctx.newPage();
      const errs = [];
      page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 200)); });
      page.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 200)));
      await page.goto(BASE + "#/palettes", { waitUntil: "networkidle" });
      await page.waitForSelector('.palette-card-grid [role="article"]');
      await page.waitForTimeout(1200);
      const read = () => page.evaluate(() => {
        const g = [...document.querySelectorAll(".palette-card-grid")].find((x) => x.querySelector('[role="article"]'));
        const kids = [...g.childNodes].map((n) => n.nodeType === 1 ? "E:" + ((n.textContent || "").match(/Library \d/)?.[0] ?? n.tagName) : n.nodeType === 8 ? "C" : "T");
        return { heights: [...g.querySelectorAll('[role="article"]')].map((a) => Math.round(a.getBoundingClientRect().height * 10) / 10), order: kids, store: JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name) };
      });
      const before = await read();
      const handles = page.locator(".palette-card-grid .drag-handle");
      const hc = await handles.count();
      let after = null, after2 = null;
      if (hc >= 3) {
        const a = await handles.nth(0).boundingBox(), c = await handles.nth(2).boundingBox();
        await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
        await page.mouse.down();
        for (let i = 1; i <= 20; i++) { await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2 + ((c.y + c.height / 2 + 10 - (a.y + a.height / 2)) * i) / 20); await page.waitForTimeout(25); }
        await page.mouse.up();
        await page.waitForTimeout(800);
        after = await read();
        // second interaction: expand the moved card, re-render via search, to expose el/anchor desync
        await page.locator('.palette-card-grid [role="article"]').first().click({ position: { x: 200, y: 20 } });
        await page.waitForTimeout(600);
        after2 = await read();
      }
      save("library", { handleCount: hc, before, after, after2, consoleErrors: errs });
    } finally { await ctx.close(); }
  },

  // PCG U-6a · one short card in the library grid: does min-h-[120px] bind, by how much?
  async library1(browser) {
    const ctx = await browser.newContext({ viewport: VP });
    try {
      const pals = mockPalettes(1).map((p) => ({ ...p, id: "lib-0", slug: "lib-0", name: "Library 0", isLocal: true }));
      await ctx.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: pals }));
      const page = await ctx.newPage();
      await page.goto(BASE + "#/palettes", { waitUntil: "networkidle" });
      await page.waitForSelector('.palette-card-grid [role="article"]');
      await page.waitForTimeout(1200);
      save("library1", await page.evaluate(() => {
        const g = [...document.querySelectorAll(".palette-card-grid")].find((x) => x.querySelector('[role="article"]'));
        const a = g.querySelector('[role="article"]');
        const cs = getComputedStyle(g);
        return { gridH: g.getBoundingClientRect().height, gridMinH: cs.minHeight, padY: cs.paddingTop + "/" + cs.paddingBottom, cardH: a.getBoundingClientRect().height, gridChildrenH: [...g.children].map((c) => c.getBoundingClientRect().height) };
      }));
    } finally { await ctx.close(); }
  },

  // PCS U-6 U-8 · SP-1 SP-3 SP-35 · instrument face at k=5/k=16; PCS U-3 seat occupancy
  async extract(browser) {
    const out = {};
    for (const throttle of [1, 6]) {
      const ctx = await browser.newContext({ viewport: VP });
      try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/extract", { waitUntil: "networkidle" });
        await page.waitForSelector('[data-slot="shadow-palette"]');
        await page.waitForTimeout(1000);
        const inst = () => page.evaluate(() => {
          const s = document.querySelector('[data-slot="shadow-palette"]');
          const pane = s.closest('[data-pane="extract"]') || document.querySelector('[data-pane="extract"]');
          const r = document.documentElement;
          return {
            plateH: s.getBoundingClientRect().height, plateW: s.getBoundingClientRect().width,
            cells: s.querySelectorAll('[data-slot="shadow-palette-cell"]').length,
            cellW: s.querySelector('[data-slot="shadow-palette-cell"]')?.getBoundingClientRect().width,
            metaRows: s.children.length,
            ariaHidden: s.getAttribute("aria-hidden"), role: s.getAttribute("role"),
            paneH: pane?.getBoundingClientRect().height,
            animations: s.getAnimations({ subtree: true }).length,
            radius: getComputedStyle(r).getPropertyValue("--radius").trim(),
            radiusSet: ["--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-card", "--radius-full"].map((k) => k + "=" + getComputedStyle(r).getPropertyValue(k).trim()),
            shadowSegToken: getComputedStyle(r).getPropertyValue("--shadow-seg").trim(),
          };
        });
        if (throttle === 1) {
          out.k5 = await inst();
          const thumb = page.getByRole("slider", { name: "Number of colors" }).or(page.locator('[aria-label="Number of colors"] [role="slider"]')).first();
          out.sliderDisabled = await thumb.getAttribute("data-disabled").catch(() => "n/a");
          try { await thumb.focus(); await page.keyboard.press("End"); await page.waitForTimeout(500); } catch (e) { out.sliderErr = String(e).slice(0, 120); }
          out.k16 = await inst();
        }
        // seat occupancy during a real extraction
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
        const png = await page.evaluate(async () => {
          const c = new OffscreenCanvas(1600, 1200); const g = c.getContext("2d");
          for (let i = 0; i < 400; i++) { g.fillStyle = `hsl(${(i * 37) % 360} ${40 + (i % 50)}% ${30 + (i % 40)}%)`; g.fillRect((i * 97) % 1600, (i * 53) % 1200, 120, 90); }
          const b = await c.convertToBlob({ type: "image/png" }); const u = new Uint8Array(await b.arrayBuffer()); let s = ""; for (const x of u) s += String.fromCharCode(x); return btoa(s);
        });
        await page.evaluate(() => {
          window.__seat = []; const t0 = performance.now();
          new MutationObserver(() => {
            const sk = document.querySelector('[data-slot="palette-card-skeleton"]');
            const last = window.__seat[window.__seat.length - 1];
            const state = sk ? "skeleton" : document.querySelector('[data-slot="shadow-palette"]') ? "instrument" : document.querySelector('[data-pane="extract"] [role="article"]') ? "card" : "none";
            if (!last || last.state !== state) window.__seat.push({ t: Math.round(performance.now() - t0), state });
          }).observe(document.body, { childList: true, subtree: true });
        });
        const chooserP = page.waitForEvent("filechooser", { timeout: 5000 });
        await page.locator('[data-pane="extract"]').getByRole("button").filter({ hasText: /drop|choose|image|upload/i }).first().click().catch(async () => { await page.locator('[data-pane="extract"] [class*="drop"]').first().click(); });
        const chooser = await chooserP;
        await chooser.setFiles({ name: "probe.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
        await page.waitForSelector('[data-pane="extract"] [role="article"]', { timeout: 30000 }).catch(() => {});
        await page.waitForTimeout(800);
        out[`seat_throttle${throttle}`] = await page.evaluate(() => window.__seat);
      } catch (e) { out[`err_throttle${throttle}`] = String(e).slice(0, 300); }
      finally { await ctx.close(); }
    }
    save("extract", out);
  },

  // SP Forced-colors · the matrix hole: forced-colors desktop /#/extract
  async forced(browser) {
    const ctx = await browser.newContext({ viewport: VP, forcedColors: "active" });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + "#/extract", { waitUntil: "networkidle" });
      await page.waitForSelector('[data-slot="shadow-palette"]');
      await page.waitForTimeout(1200);
      const r = await page.evaluate(() => {
        const s = document.querySelector('[data-slot="shadow-palette"]');
        const cs = getComputedStyle(s);
        return {
          forced: matchMedia("(forced-colors: active)").matches,
          plateBg: cs.backgroundColor, plateBorder: cs.borderTopColor, plateFCA: cs.forcedColorAdjust,
          cellSeams: [...s.querySelectorAll('[data-slot="shadow-palette-cell"]')].map((c) => getComputedStyle(c).borderInlineStartColor + "/" + getComputedStyle(c).borderInlineStartWidth),
          cellBgs: [...new Set([...s.querySelectorAll('[data-slot="shadow-palette-cell"]')].map((c) => getComputedStyle(c).backgroundColor))],
          swatches: [...document.querySelectorAll('[data-pane="extract"] [style*="oklab"], [data-pane="extract"] [style*="oklch"]')].slice(0, 4).map((e) => ({ bg: getComputedStyle(e).backgroundColor, fca: getComputedStyle(e).forcedColorAdjust })),
        };
      });
      await page.screenshot({ path: resolve(OUT, "forced-colors-desktop-extract.png") });
      save("forced", r);
    } finally { await ctx.close(); }
  },

  // PCS U-7 · RTL: are the stagger mechanisms (delay seam / walk) live under dir=rtl?
  async rtl(browser) {
    const ctx = await browser.newContext({ viewport: VP });
    try {
      await mockList(ctx, { delay: 8000 });
      await ctx.addInitScript(() => document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("dir", "rtl")));
      const page = await ctx.newPage();
      await page.goto(BASE + "#/browse");
      await page.waitForSelector('[data-slot="palette-card-skeleton"]', { timeout: 6000 });
      await page.waitForTimeout(1000);
      const r = await page.evaluate(skeletonRead);
      r.dir = await page.evaluate(() => document.documentElement.dir);
      save("rtl", r);
    } finally { await ctx.close(); }
  },
};

const want = process.argv.slice(2);
const browser = await chromium.launch();
try {
  for (const [name, fn] of Object.entries(cells)) {
    if (want.length && !want.includes(name)) continue;
    try { await fn(browser); console.log("cell ok:", name); }
    catch (e) { console.log("cell FAIL:", name, String(e).slice(0, 300)); save(name + "-error", { error: String(e) }); }
  }
} finally { await browser.close(); }
