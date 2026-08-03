// CHALLENGE-D pass 5 — probe 3: occlusion of the wall, rendered contrast crops,
// hover/focus registers, badge geometry. Read-only; network-stubbed.
import { chromium } from "playwright";
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
    { name: "high-contrast-accessible-ui", count: 3 },
    { name: "warm", count: 22 },
    { name: "cool", count: 19 },
    { name: "monochrome", count: 7 },
    { name: "duotone", count: 5 },
    { name: "retro", count: 14 },
    { name: "vaporwave", count: 2 },
];
const HEX = ["#4488cc", "#cc8844", "#44cc88", "#cc4488", "#8844cc"];
const pal = (i) => ({
    _id: `id${i}`, id: `id${i}`, slug: `palette-${i}`, name: `Palette ${i}`,
    colors: HEX, visibility: "public", tier: i % 3 === 0 ? "featured" : "standard",
    tags: [TAGS[i % TAGS.length].name],
    createdAt: new Date(Date.now() - i * 864e5).toISOString(),
    updatedAt: new Date(Date.now() - i * 864e5).toISOString(),
    attribution: "principal", userSlug: "mbabb", owner: { slug: "mbabb" },
    votes: 10 - (i % 10), voteCount: 10 - (i % 10), forkCount: i % 4, version: 1,
});

async function stub(ctx, n = 12) {
    await ctx.route(/\/colors\/tags/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json",
            headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(TAGS) }));
    await ctx.route(/:3000\/palettes/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify({ data: Array.from({ length: n }, (_, i) => pal(i)),
                nextCursor: null, hasMore: false }) }));
}

const OCC = `(() => {
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const q=(s,r=document)=>r.querySelector(s);
  const rect=e=>{const r=e.getBoundingClientRect();
    return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2),
      top:+r.top.toFixed(2),bottom:+r.bottom.toFixed(2),left:+r.left.toFixed(2),right:+r.right.toFixed(2)};};
  const pop=q('[role="dialog"][data-state="open"]');
  const cards=qa('[role="article"]');
  const rs=cards.map(rect);
  const pr=pop?rect(pop):null;
  const inter=(a,b)=>{const w=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));
    const h=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));return {w:+w.toFixed(2),h:+h.toFixed(2),area:+(w*h).toFixed(1)};};
  const union=rs.length?(()=>{const u=rs.reduce((a,r)=>({left:Math.min(a.left,r.left),top:Math.min(a.top,r.top),
    right:Math.max(a.right,r.right),bottom:Math.max(a.bottom,r.bottom)}),{left:1e9,top:1e9,right:-1e9,bottom:-1e9});
    u.w=+(u.right-u.left).toFixed(2);u.h=+(u.bottom-u.top).toFixed(2);return u;})():null;
  // visible portion of each card inside the viewport
  const vp={left:0,top:0,right:innerWidth,bottom:innerHeight};
  const visRs=rs.map(r=>inter(r,vp));
  const cov=rs.map((r,i)=>{const iv=inter(r,vp); if(iv.area<=0) return null;
    const io=pr?inter(pr,{...r,left:Math.max(r.left,0),top:Math.max(r.top,0),
      right:Math.min(r.right,innerWidth),bottom:Math.min(r.bottom,innerHeight)}):{area:0};
    return +(io.area/iv.area).toFixed(3);});
  const browsePane=q('.pane-scroll-fade');
  return {
    viewport:{w:innerWidth,h:innerHeight},
    cardCount:cards.length,
    cardsInViewport: visRs.filter(v=>v.area>0).length,
    popoverRect: pr, popoverArea: pr?+(pr.w*pr.h).toFixed(1):null,
    wallUnion: union,
    popoverOverWallUnion: pr&&union?inter(pr,union):null,
    pctOfWallUnionCovered: pr&&union?+((inter(pr,union).area)/(union.w*union.h)*100).toFixed(1):null,
    perVisibleCardCoverage: cov,
    visibleCardsWithAnyCoverage: cov.filter(c=>c!==null&&c>0).length,
    visibleCardsOver50: cov.filter(c=>c!==null&&c>0.5).length,
    browsePaneRect: browsePane?rect(browsePane):null,
    pctOfBrowsePaneCovered: pr&&browsePane?+((inter(pr,rect(browsePane)).area)/((r=>r.w*r.h)(rect(browsePane)))*100).toFixed(1):null,
    pctOfViewport: pr?+((pr.w*pr.h)/(innerWidth*innerHeight)*100).toFixed(1):null,
  };
})()`;

const RECTS = `(() => {
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const q=(s,r=document)=>r.querySelector(s);
  const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();
    return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)};};
  const pop=q('[role="dialog"][data-state="open"]');
  const label=q('.section-label',pop);
  const opt=qa('.filter-option',pop)[0];
  const input=q('input[aria-label="Search by CSS color"]',pop);
  const btn=qa('button',pop).find(b=>(b.textContent||'').trim()==='Search');
  const swatch=q('button[aria-label^="Open color picker"]',pop);
  const trig=q('button[aria-label="Filters"]');
  const field=q('.search-seated');
  return { label:rect(label), option:rect(opt), input:rect(input), btn:rect(btn),
           swatch:rect(swatch), trigger:rect(trig), field:rect(field),
           popover:rect(pop) };
})()`;

async function run(name, ctxOpts, opts = {}) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext(ctxOpts);
    await stub(ctx, opts.wall ?? 12);
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    if (opts.dark) { await page.evaluate(() => document.documentElement.classList.add("dark")); await page.waitForTimeout(400); }
    if (opts.rtl) { await page.evaluate(() => (document.documentElement.dir = "rtl")); await page.waitForTimeout(300); }

    const closedShot = path.join(OUT, `${name}-wall-closed.png`);
    await page.screenshot({ path: closedShot });

    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(700);
    const occ = await page.evaluate(OCC);
    const rects = await page.evaluate(RECTS);
    await page.screenshot({ path: path.join(OUT, `${name}-wall-open.png`) });

    // tight crops for pixel contrast
    const crops = {};
    for (const [k, r] of Object.entries(rects)) {
        if (!r || r.w < 1 || r.h < 1) continue;
        const p = path.join(OUT, `${name}-crop-${k}.png`);
        try {
            await page.screenshot({ path: p, clip: { x: r.x, y: r.y, width: Math.min(r.w, 400), height: Math.min(r.h, 400) } });
            crops[k] = p;
        } catch (e) { crops[k] = "ERR " + e.message; }
    }

    // focus-visible register on each species
    const focusReg = {};
    for (const [k, sel] of Object.entries({
        radio: '[role="radio"]',
        checkbox: '[role="checkbox"]',
        swatch: 'button[aria-label^="Open color picker"]',
        input: 'input[aria-label="Search by CSS color"]',
        searchBtn: 'button:has-text("Search")',
    })) {
        try {
            const el = page.locator(`[role="dialog"][data-state="open"] ${sel}`).first();
            await el.focus();
            await page.waitForTimeout(150);
            focusReg[k] = await page.evaluate(() => {
                const a = document.activeElement;
                const c = getComputedStyle(a);
                return { tag: a.tagName, role: a.getAttribute("role"),
                    outline: c.outline, outlineOffset: c.outlineOffset,
                    boxShadow: c.boxShadow.slice(0, 160), ring: c.getPropertyValue("--tw-ring-shadow") };
            });
            const r = await el.boundingBox();
            if (r) await page.screenshot({ path: path.join(OUT, `${name}-focus-${k}.png`),
                clip: { x: Math.max(0, r.x - 8), y: Math.max(0, r.y - 8), width: r.width + 16, height: r.height + 16 } });
        } catch (e) { focusReg[k] = "ERR " + e.message.slice(0, 80); }
    }

    // badge: set Featured, close, crop the trigger generously
    let badge = null;
    try {
        await page.locator(".filter-option").filter({ hasText: "Featured" }).first().click();
        await page.waitForTimeout(400);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(600);
        badge = await page.evaluate(`(() => {
          const t=document.querySelector('button[aria-label="Filters"]');
          const b=t&&t.querySelector('span');
          const r=e=>{const q=e.getBoundingClientRect();return {x:+q.x.toFixed(2),y:+q.y.toFixed(2),w:+q.width.toFixed(2),h:+q.height.toFixed(2),top:+q.top.toFixed(2),left:+q.left.toFixed(2),right:+q.right.toFixed(2),bottom:+q.bottom.toFixed(2)};};
          if(!b) return {noBadge:true};
          const tr=r(t), br=r(b); const c=getComputedStyle(b); const tc=getComputedStyle(t);
          return {trigger:tr,badge:br,text:b.textContent.trim(),
            bg:c.backgroundColor,fg:c.color,fontSize:c.fontSize,
            triggerOverflow:tc.overflow, triggerClip:tc.clipPath, triggerBorderRadius:tc.borderRadius,
            outsideLeft:+(tr.left-br.left).toFixed(2), outsideTop:+(tr.top-br.top).toFixed(2),
            fieldRect: (()=>{const f=document.querySelector('.search-seated'); return f?r(f):null;})(),
            fieldOverflow: (()=>{const f=document.querySelector('.search-seated'); return f?getComputedStyle(f).overflow:null;})()};
        })()`);
        const tb = await page.locator('button[aria-label="Filters"]').first().boundingBox();
        if (tb) await page.screenshot({ path: path.join(OUT, `${name}-badge-zoom.png`),
            clip: { x: Math.max(0, tb.x - 20), y: Math.max(0, tb.y - 20), width: tb.width + 40, height: tb.height + 40 } });
        await page.screenshot({ path: path.join(OUT, `${name}-badge-page.png`) });
    } catch (e) { badge = { err: e.message.slice(0, 120) }; }

    await browser.close();
    return { name, occ, rects, focusReg, badge, crops };
}

const R = {};
R.light = await run("p5-3-light", { viewport: { width: 1440, height: 900 }, colorScheme: "light" });
R.dark = await run("p5-3-dark", { viewport: { width: 1440, height: 900 }, colorScheme: "dark" }, { dark: true });
R.mobile = await run("p5-3-mobile", { viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
R.forced = await run("p5-3-forced", { viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });

fs.writeFileSync(path.join(OUT, "p5-3.json"), JSON.stringify(R, null, 2));
console.log("WROTE p5-3.json");
for (const [k, v] of Object.entries(R)) {
    console.log(k, "| cards", v.occ.cardCount, "inVP", v.occ.cardsInViewport,
        "| pop", v.occ.popoverRect && `${v.occ.popoverRect.w}x${v.occ.popoverRect.h}`,
        "| %wallUnion", v.occ.pctOfWallUnionCovered,
        "| %browsePane", v.occ.pctOfBrowsePaneCovered,
        "| cardsCovered", v.occ.visibleCardsWithAnyCoverage, "over50", v.occ.visibleCardsOver50);
}
