// CHALLENGE-D pass 5 — probe 6: settle the click-outside focus dispute, measure
// the 200%-zoom reachable fraction, and the long-tag row.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
    "docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p5",
);
const TAGS = [
    { name: "pastel", count: 41 },
    { name: "neon", count: 12 },
    { name: "high-contrast-accessible-ui", count: 3 },
    { name: "warm", count: 22 },
];
const HEX = ["#4488cc", "#cc8844", "#44cc88"];
const pal = (i) => ({ _id: `id${i}`, id: `id${i}`, slug: `p-${i}`, name: `Palette ${i}`, colors: HEX,
    visibility: "public", tier: "standard", tags: [], createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), attribution: "principal", userSlug: "mbabb",
    owner: { slug: "mbabb" }, votes: 1, voteCount: 1, forkCount: 0, version: 1 });

async function stub(ctx) {
    await ctx.route(/\/colors\/tags/, (r) => r.fulfill({ status: 200, contentType: "application/json",
        headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(TAGS) }));
    await ctx.route(/:3000\/palettes/, (r) => r.fulfill({ status: 200, contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify({ data: Array.from({ length: 6 }, (_, i) => pal(i)), nextCursor: null, hasMore: false }) }));
}

const ACTIVE = `(() => { const a=document.activeElement;
  if(!a) return 'null';
  return a.tagName+(a.getAttribute('role')?'['+a.getAttribute('role')+']':'')+':'+
    (a.getAttribute('aria-label')||a.textContent||'').trim().slice(0,28); })()`;

const R = {};

// A. close paths → where does focus land?
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stub(ctx);
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await p.waitForTimeout(1600);

    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(600);
    await p.keyboard.press("Escape");
    await p.waitForTimeout(700);
    R.focusAfterEscape = await p.evaluate(ACTIVE);

    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(600);
    await p.mouse.click(300, 780); // outside, on the wall
    await p.waitForTimeout(700);
    R.focusAfterOutsideClick = await p.evaluate(ACTIVE);

    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(600);
    await p.locator('button[aria-label="Filters"]').first().click(); // toggle shut
    await p.waitForTimeout(700);
    R.focusAfterTriggerToggle = await p.evaluate(ACTIVE);
    await b.close();
}

// B. 200 % zoom reachable fraction (CSS viewport 720x450 == 1440x900 @ 200 %)
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 720, height: 450 }, colorScheme: "light" });
    await stub(ctx);
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await p.waitForTimeout(1600);
    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(700);
    R.zoom200 = await p.evaluate(`(() => {
      const pop=document.querySelector('[role="dialog"][data-state="open"]');
      const r=pop.getBoundingClientRect();
      const vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));
      const clear=document.evaluate("//*[contains(text(),'Clear all')]",document,null,9,null).singleNodeValue;
      const cr=clear?clear.getBoundingClientRect():null;
      const colour=document.querySelector('[role="dialog"][data-state="open"] input[aria-label="Search by CSS color"]');
      const ir=colour?colour.getBoundingClientRect():null;
      return { viewport:{w:innerWidth,h:innerHeight},
        popover:{top:+r.top.toFixed(2),bottom:+r.bottom.toFixed(2),h:+r.height.toFixed(2)},
        visibleBlockPx:+vis.toFixed(2), visibleFraction:+(vis/r.height).toFixed(3),
        offscreenBelowPx:+(r.bottom-innerHeight).toFixed(2),
        popoverScrollable: pop.scrollHeight>pop.clientHeight,
        popoverMaxHeight: getComputedStyle(pop).maxHeight,
        docScrollHeight: document.documentElement.scrollHeight,
        docClientHeight: document.documentElement.clientHeight,
        docScrollable: document.documentElement.scrollHeight>document.documentElement.clientHeight,
        colourFieldTop: ir?+ir.top.toFixed(2):null, colourFieldOffscreen: ir?ir.top>innerHeight:null,
        clearRowPresent: !!clear };
    })()`);
    await p.screenshot({ path: path.join(OUT, "p5-6-zoom200-open.png") });
    // can the user scroll the page to reach the rest?
    await p.mouse.wheel(0, 600);
    await p.waitForTimeout(500);
    R.zoom200AfterScroll = await p.evaluate(`(() => {
      const pop=document.querySelector('[role="dialog"][data-state="open"]');
      if(!pop) return {popoverGone:true, scrollY:window.scrollY};
      const r=pop.getBoundingClientRect();
      return {scrollY:window.scrollY, top:+r.top.toFixed(2), bottom:+r.bottom.toFixed(2),
        stillOffscreen:+(r.bottom-innerHeight).toFixed(2)};
    })()`);
    await p.screenshot({ path: path.join(OUT, "p5-6-zoom200-after-scroll.png") });
    await b.close();
}

// C. the long-tag row: does it wrap, clip, or truncate?
{
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stub(ctx);
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await p.waitForTimeout(1600);
    await p.locator('button[aria-label="Filters"]').first().click();
    await p.waitForTimeout(700);
    R.longTag = await p.evaluate(`(() => {
      const pop=document.querySelector('[role="dialog"][data-state="open"]');
      const rows=[...pop.querySelectorAll('.filter-option')].slice(5);
      const scroller=pop.querySelector('.max-h-28');
      return { rows: rows.map(r=>{const b=r.getBoundingClientRect();
          const s=r.querySelector('span');
          const sc=s?getComputedStyle(s):null;
          return {t:r.textContent.trim(), h:+b.height.toFixed(2), w:+b.width.toFixed(2),
            lines: s? Math.round(s.getBoundingClientRect().height/parseFloat(sc.lineHeight)) : null,
            whiteSpace: sc?sc.whiteSpace:null, textOverflow: sc?sc.textOverflow:null,
            overflowWrap: sc?sc.overflowWrap:null};}),
        scroller: scroller?{clientH:scroller.clientHeight, scrollH:scroller.scrollHeight,
          visibleFraction:+(scroller.clientHeight/scroller.scrollHeight).toFixed(3),
          scrollbarWidth:getComputedStyle(scroller).scrollbarWidth}:null };
    })()`);
    const sc = await p.locator('[role="dialog"][data-state="open"] .max-h-28').first().boundingBox();
    if (sc) await p.screenshot({ path: path.join(OUT, "p5-6-tag-scroller.png"),
        clip: { x: sc.x - 6, y: sc.y - 6, width: sc.width + 12, height: sc.height + 12 } });
    await b.close();
}

fs.writeFileSync(path.join(OUT, "p5-6.json"), JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
