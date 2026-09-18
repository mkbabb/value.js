// CHALLENGE-D pass 5 — SearchFilterBar live probe 1
// Read-only: stubs /colors/tags + /palettes at the network layer, drives the
// live dev server at http://localhost:9000. Writes JSON + PNG under evidence-p5/.
import { chromium, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
    "docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p5",
);
fs.mkdirSync(OUT, { recursive: true });

const TAGS = [
    { name: "pastel", count: 41 },
    { name: "neon", count: 12 },
    { name: "muted", count: 8 },
    { name: "high-contrast-accessible-ui", count: 3 }, // long-label state
    { name: "warm", count: 22 },
    { name: "cool", count: 19 },
    { name: "monochrome", count: 7 },
    { name: "duotone", count: 5 },
    { name: "retro", count: 14 },
    { name: "vaporwave", count: 2 },
];

function palette(i) {
    return {
        id: `p${i}`,
        slug: `palette-${i}`,
        name: `Palette ${i}`,
        colors: ["#4488cc", "#cc8844", "#44cc88", "#cc4488", "#8844cc"],
        visibility: "public",
        tier: i % 3 === 0 ? "featured" : "standard",
        tags: [TAGS[i % TAGS.length].name],
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
        attribution: "principal",
        owner: { slug: "mbabb" },
        votes: 10 - (i % 10),
        forkCount: i % 4,
        version: 1,
    };
}

async function stub(ctx, { tags = TAGS, wall = 8 } = {}) {
    await ctx.route("**/colors/tags*", (r) =>
        r.fulfill({
            status: 200,
            contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify(tags),
        }),
    );
    await ctx.route("**/palettes?*", (r) =>
        r.fulfill({
            status: 200,
            contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify({
                data: Array.from({ length: wall }, (_, i) => palette(i)),
                nextCursor: null,
                hasMore: false,
            }),
        }),
    );
}

const MEASURE = `(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const rect = (e) => { if (!e) return null; const r = e.getBoundingClientRect();
    return { x:+r.x.toFixed(2), y:+r.y.toFixed(2), w:+r.width.toFixed(2), h:+r.height.toFixed(2),
             top:+r.top.toFixed(2), bottom:+r.bottom.toFixed(2), left:+r.left.toFixed(2), right:+r.right.toFixed(2) }; };
  const cs = (e, props) => { if (!e) return null; const c = getComputedStyle(e); const o = {};
    for (const p of props) o[p] = c.getPropertyValue(p); return o; };

  const content = q('[data-radix-popper-content-wrapper], [data-reka-popper-content-wrapper]')
                || q('[role="dialog"][data-state="open"]');
  const popover = q('[role="dialog"][data-state="open"]') || content;
  const trigger = qa('button[aria-label="Filters"]')[0];
  const searchField = q('.search-seated');
  const wall = qa('article, [data-palette-card]');
  const browseCard = trigger ? trigger.closest('.pane-scroll-fade') : null;

  const sections = qa('.filter-section', popover || document);
  const labels = qa('.section-label', popover || document);
  const options = qa('.filter-option', popover || document);
  const radios = qa('[role="radio"]', popover || document);
  const checks = qa('[role="checkbox"]', popover || document);
  const dividers = qa('.divide-y > *', popover || document);
  const swatch = popover ? qa('button[aria-label^="Open color picker"]', popover)[0] : null;
  const input = popover ? q('input[aria-label="Search by CSS color"]', popover) : null;
  const searchBtn = popover ? qa('button', popover).find(b => (b.textContent||'').trim() === 'Search') : null;
  const tagScroller = popover ? q('.max-h-28', popover) : null;

  const inter = (a, b) => {
    if (!a || !b) return null;
    const w = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const h = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    return { w:+w.toFixed(2), h:+h.toFixed(2), area:+(w*h).toFixed(1) };
  };

  const pr = rect(popover);
  const bc = rect(browseCard);
  const wallRects = wall.map(rect);
  const wallUnion = wallRects.length ? wallRects.reduce((a,r)=>({
     left:Math.min(a.left,r.left), top:Math.min(a.top,r.top),
     right:Math.max(a.right,r.right), bottom:Math.max(a.bottom,r.bottom)}),
     {left:1e9,top:1e9,right:-1e9,bottom:-1e9}) : null;
  if (wallUnion) { wallUnion.w = wallUnion.right-wallUnion.left; wallUnion.h = wallUnion.bottom-wallUnion.top; }

  return {
    viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio, zoom: +(outerWidth/innerWidth).toFixed(3) },
    scheme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    dir: document.documentElement.dir || getComputedStyle(document.documentElement).direction,
    trigger: {
      rect: rect(trigger),
      cs: cs(trigger, ['border-radius','background-color','box-shadow','width','height','padding','color','opacity','outline']),
      ariaExpanded: trigger && trigger.getAttribute('aria-expanded'),
      ariaHasPopup: trigger && trigger.getAttribute('aria-haspopup'),
      ariaLabel: trigger && trigger.getAttribute('aria-label'),
      classes: trigger && trigger.className,
    },
    searchField: { rect: rect(searchField), cs: cs(searchField, ['border-radius','background-color','height']) },
    triggerProudOfField: (() => { const t=rect(trigger), f=rect(searchField);
      if (!t||!f) return null; return { top:+(f.top-t.top).toFixed(2), bottom:+(t.bottom-f.bottom).toFixed(2) }; })(),
    popover: {
      rect: pr,
      cs: cs(popover, ['background-color','backdrop-filter','-webkit-backdrop-filter','border-radius','box-shadow','max-height','overflow','overflow-y','padding','width','opacity','z-index','transform','animation-name','animation-duration','transition']),
      role: popover && popover.getAttribute('role'),
      ariaLabel: popover && (popover.getAttribute('aria-label') || popover.getAttribute('aria-labelledby')),
      belowFold: pr ? +(pr.bottom - innerHeight).toFixed(2) : null,
      aboveFold: pr ? +(0 - pr.top).toFixed(2) : null,
      scrollHeight: popover ? popover.scrollHeight : null,
      clientHeight: popover ? popover.clientHeight : null,
      scrollable: popover ? (popover.scrollHeight > popover.clientHeight) : null,
    },
    occlusion: {
      browseCard: bc, popoverOverBrowseCard: inter(pr, bc),
      browseCardArea: bc ? +(bc.w*bc.h).toFixed(1) : null,
      wallUnion, popoverOverWall: inter(pr, wallUnion),
      wallArea: wallUnion ? +(wallUnion.w*wallUnion.h).toFixed(1) : null,
      wallCards: wall.length,
      viewportArea: innerWidth*innerHeight,
      popoverArea: pr ? +(pr.w*pr.h).toFixed(1) : null,
    },
    sections: sections.map(s => ({
      label: (qa('.section-label', s)[0]||{}).textContent,
      rect: rect(s), cs: cs(s, ['padding','border-top','border-bottom','border-color','border-top-width']),
    })),
    labels: labels.map(l => ({ text: l.textContent, rect: rect(l),
      cs: cs(l, ['font-family','font-size','font-weight','letter-spacing','text-transform','color','line-height','margin-bottom']) })),
    options: options.map(o => ({ text: o.textContent.trim(), rect: rect(o),
      cs: cs(o, ['font-family','font-size','line-height','padding','gap','border-radius','min-height','cursor','transition']) })),
    optionPitch: (() => { const rs = options.map(o=>rect(o)); const out=[];
      for (let i=1;i<rs.length;i++) out.push(+(rs[i].top-rs[i-1].top).toFixed(2)); return out; })(),
    optionWidths: options.map(o => +rect(o).w.toFixed(2)),
    radios: radios.map(r => ({ rect: rect(r), checked: r.getAttribute('aria-checked'),
      name: r.getAttribute('aria-label') || r.textContent.trim(),
      cs: cs(r, ['width','height','border-radius','border-color','background-color','box-shadow','outline']) })),
    checkboxes: checks.map(c => ({ rect: rect(c), checked: c.getAttribute('aria-checked'),
      attrs: [...c.attributes].map(a=>a.name+'='+a.value) })),
    dividers: dividers.map(d => ({ cs: cs(d, ['border-top-width','border-top-color','border-top-style']), rect: rect(d) })),
    swatch: swatch ? { rect: rect(swatch),
      cs: cs(swatch, ['box-shadow','border-width','border-color','background-color','border-radius','transition']) } : null,
    input: input ? { rect: rect(input), placeholder: input.placeholder,
      cs: cs(input, ['font-family','font-size','padding-right','width','color']),
      scrollWidth: input.scrollWidth, clientWidth: input.clientWidth } : null,
    searchBtn: searchBtn ? { rect: rect(searchBtn), text: searchBtn.textContent.trim(),
      cs: cs(searchBtn, ['background-color','color','font-size','height','border-radius','transition']) } : null,
    tagScroller: tagScroller ? { rect: rect(tagScroller),
      scrollHeight: tagScroller.scrollHeight, clientHeight: tagScroller.clientHeight,
      cs: cs(tagScroller, ['max-height','overflow-y','scrollbar-width','scrollbar-color']),
      overflowingRows: +( (tagScroller.scrollHeight - tagScroller.clientHeight) ).toFixed(2) } : null,
    tagLabelOverflow: (() => {
      const spans = popover ? qa('.filter-option span', popover) : [];
      return spans.map(s => ({ text: s.textContent.trim(), w:+s.getBoundingClientRect().width.toFixed(2),
        scrollW: s.scrollWidth, clientW: s.clientWidth, overflow: s.scrollWidth > s.clientWidth + 0.5,
        cs: getComputedStyle(s).textOverflow + '|' + getComputedStyle(s).whiteSpace }));
    })(),
    docOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    focusables: (() => {
      if (!popover) return null;
      const sel = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"]),[role="radio"],[role="checkbox"]';
      return qa(sel, popover).map(e => ({ tag: e.tagName, role: e.getAttribute('role'),
        name: e.getAttribute('aria-label') || e.textContent.trim().slice(0,30), tabindex: e.getAttribute('tabindex') }));
    })(),
  };
})()`;

async function run(engine, name, opts, steps) {
    const browser = await engine.launch();
    const ctx = await browser.newContext(opts);
    await stub(ctx, steps.stubOpts || {});
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    if (steps.dark) {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(300);
    }
    if (steps.rtl) {
        await page.evaluate(() => {
            document.documentElement.dir = "rtl";
        });
        await page.waitForTimeout(300);
    }
    const closed = await page.evaluate(MEASURE);
    await page.screenshot({ path: path.join(OUT, `${name}-closed.png`) });
    // open the menu
    const trig = page.locator('button[aria-label="Filters"]').first();
    if (await trig.count()) {
        await trig.click();
        await page.waitForTimeout(500);
    }
    const open = await page.evaluate(MEASURE);
    await page.screenshot({ path: path.join(OUT, `${name}-open.png`) });
    await page.screenshot({
        path: path.join(OUT, `${name}-open-full.png`),
        fullPage: true,
    });
    await browser.close();
    return { name, opts, closed, open, consoleErrors: [...new Set(consoleErrors)].slice(0, 12) };
}

const results = {};
results["chromium-desktop-light"] = await run(chromium, "chromium-desktop-light", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
}, { stubOpts: {} });

results["chromium-desktop-dark"] = await run(chromium, "chromium-desktop-dark", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
}, { dark: true });

results["chromium-mobile-light"] = await run(chromium, "chromium-mobile-light", {
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
}, {});

results["webkit-desktop-light"] = await run(webkit, "webkit-desktop-light", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
}, {});

fs.writeFileSync(path.join(OUT, "p5-1.json"), JSON.stringify(results, null, 2));
console.log("WROTE", path.join(OUT, "p5-1.json"));
for (const [k, v] of Object.entries(results)) {
    console.log(
        k,
        "| popover",
        v.open.popover.rect && `${v.open.popover.rect.w}x${v.open.popover.rect.h}`,
        "| belowFold",
        v.open.popover.belowFold,
        "| scrollable",
        v.open.popover.scrollable,
        "| wallCards",
        v.open.occlusion.wallCards,
        "| occludesWall",
        v.open.occlusion.popoverOverWall && v.open.occlusion.popoverOverWall.area,
        "| errs",
        v.consoleErrors.length,
    );
}
