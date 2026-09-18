// CHALLENGE-D pass 5 — probe 4: dock behaviour on open, mark geometry,
// override losses, menu growth vs tag count, reduced-motion, sibling comparison.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
    "docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p5",
);
fs.mkdirSync(OUT, { recursive: true });

const mkTags = (n) =>
    Array.from({ length: n }, (_, i) => ({ name: `tag-${i}`, count: n - i }));
const HEX = ["#4488cc", "#cc8844", "#44cc88", "#cc4488", "#8844cc"];
const pal = (i) => ({
    _id: `id${i}`, id: `id${i}`, slug: `palette-${i}`, name: `Palette ${i}`,
    colors: HEX, visibility: "public", tier: "standard", tags: [],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    attribution: "principal", userSlug: "mbabb", owner: { slug: "mbabb" },
    votes: 1, voteCount: 1, forkCount: 0, version: 1,
});

async function stub(ctx, tags) {
    await ctx.route(/\/colors\/tags/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json",
            headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(tags) }));
    await ctx.route(/:3000\/palettes/, (r) =>
        r.fulfill({ status: 200, contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify({ data: Array.from({ length: 8 }, (_, i) => pal(i)), nextCursor: null, hasMore: false }) }));
}

const DOCK = `(() => {
  const q=s=>document.querySelector(s);
  const dock = q('[class*="dock"]') || q('header') || q('nav');
  const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();
    return {x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)};};
  const info=e=>{if(!e)return null;const c=getComputedStyle(e);
    return {rect:r(e), opacity:c.opacity, visibility:c.visibility, display:c.display,
      ariaHidden:e.getAttribute('aria-hidden'), inert:e.hasAttribute('inert'),
      dataAriaHidden:e.getAttribute('data-aria-hidden'), text:(e.innerText||'').trim().slice(0,60),
      childCount:e.children.length};};
  // every element that reka marks aria-hidden while the popover is open
  const hidden=[...document.querySelectorAll('[aria-hidden="true"],[data-aria-hidden="true"],[inert]')]
    .filter(e=>e.getBoundingClientRect().width>40)
    .map(e=>({tag:e.tagName, cls:(e.className||'').toString().slice(0,60), rect:r(e),
      ariaHidden:e.getAttribute('aria-hidden'), inert:e.hasAttribute('inert'),
      text:(e.innerText||'').trim().slice(0,40)})).slice(0,14);
  return { dock: info(dock), hiddenBig: hidden,
    bodyPointerEvents: getComputedStyle(document.body).pointerEvents,
    bodyOverflow: getComputedStyle(document.body).overflow,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
    scrollY: window.scrollY };
})()`;

const MARKS = `(() => {
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const pop=document.querySelector('[role="dialog"][data-state="open"]');
  const cs=(e,p)=>{const c=getComputedStyle(e);const o={};for(const k of p)o[k]=c.getPropertyValue(k);return o;};
  const g=e=>{const r=e.getBoundingClientRect();return {w:+r.width.toFixed(2),h:+r.height.toFixed(2)};};
  const props=['border-radius','width','height','border-width','border-color','background-color','box-shadow','color'];
  const radios=qa('[role="radio"]',pop).map(e=>({...g(e), checked:e.getAttribute('aria-checked'), cs:cs(e,props),
     inner:(()=>{const i=e.firstElementChild;return i?{...g(i),cs:cs(i,['border-radius','background-color','width','height'])}:null;})()}));
  const checks=qa('[role="checkbox"]',pop).map(e=>({...g(e), checked:e.getAttribute('aria-checked'), cs:cs(e,props)}));
  const popEl=pop;
  return {
    radios: radios.slice(0,3), checkboxes: checks.slice(0,3),
    radioVsCheckboxRadius: radios[0] && checks[0] ? [radios[0].cs['border-radius'], checks[0].cs['border-radius']] : null,
    radioVsCheckboxSize: radios[0] && checks[0] ? [radios[0].w+'x'+radios[0].h, checks[0].w+'x'+checks[0].h] : null,
    popoverPadding: getComputedStyle(popEl).padding,
    popoverClassList: popEl.className,
    popoverWidth: getComputedStyle(popEl).width,
    popoverMaxHeight: getComputedStyle(popEl).maxHeight,
    popoverOverflow: getComputedStyle(popEl).overflowY,
    popoverRect: (()=>{const r=popEl.getBoundingClientRect();return {y:+r.y.toFixed(2),h:+r.height.toFixed(2),bottom:+r.bottom.toFixed(2)};})(),
    triggerBox: (()=>{const t=document.querySelector('button[aria-label="Filters"]');
      const c=getComputedStyle(t);const r=t.getBoundingClientRect();
      return {classes:t.className, cssW:c.width, cssH:c.height, minH:c.minHeight, minW:c.minWidth,
        rendered:r.width.toFixed(2)+'x'+r.height.toFixed(2), aspect:+(r.width/r.height).toFixed(3),
        borderRadius:c.borderRadius};})(),
    tagCount: qa('.filter-option',pop).length - 5,
    divider: (()=>{const d=qa('.divide-y > *',pop)[1];return d?cs(d,['border-top-width','border-top-color','border-top-style']):null;})(),
    dividerWidth: (()=>{const d=qa('.divide-y > *',pop)[1];return d?+d.getBoundingClientRect().width.toFixed(2):null;})(),
    sectionLabelVsOption: (()=>{const l=document.querySelector('.section-label');const o=qa('.filter-option',pop)[0];
      if(!l||!o)return null;const lc=getComputedStyle(l),oc=getComputedStyle(o);
      return {label:{ff:lc.fontFamily.split(',')[0],fs:lc.fontSize,ls:lc.letterSpacing,tt:lc.textTransform,color:lc.color},
              option:{ff:oc.fontFamily.split(',')[0],fs:oc.fontSize,ls:oc.letterSpacing,color:oc.color}};})(),
  };
})()`;

async function menuHeightFor(tagN) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stub(ctx, mkTags(tagN));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(500);
    const m = await page.evaluate(MARKS);
    await browser.close();
    return { tagN, h: m.popoverRect.h, bottom: m.popoverRect.bottom, tagCount: m.tagCount };
}

const R = {};

// 1. dock behaviour, marks, overrides
{
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await stub(ctx, mkTags(10));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    R.dockClosed = await page.evaluate(DOCK);
    await page.screenshot({ path: path.join(OUT, "p5-4-dock-closed.png"), clip: { x: 400, y: 0, width: 640, height: 110 } });
    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(900);
    R.dockOpen = await page.evaluate(DOCK);
    await page.screenshot({ path: path.join(OUT, "p5-4-dock-open.png"), clip: { x: 400, y: 0, width: 640, height: 110 } });
    await page.waitForTimeout(1500);
    R.dockOpenLate = await page.evaluate(DOCK);
    await page.screenshot({ path: path.join(OUT, "p5-4-dock-open-late.png"), clip: { x: 400, y: 0, width: 640, height: 110 } });
    R.marks = await page.evaluate(MARKS);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(900);
    R.dockAfterClose = await page.evaluate(DOCK);
    await page.screenshot({ path: path.join(OUT, "p5-4-dock-after-close.png"), clip: { x: 400, y: 0, width: 640, height: 110 } });
    R.focusAfterClose = await page.evaluate(() => {
        const a = document.activeElement;
        return a ? `${a.tagName}:${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 30)}` : "null";
    });
    await browser.close();
}

// 2. menu growth vs tag count
R.growth = [];
for (const n of [0, 3, 10, 40]) R.growth.push(await menuHeightFor(n));

// 3. reduced motion
{
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });
    await stub(ctx, mkTags(6));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(600);
    R.reducedMotion = await page.evaluate(`(() => {
      const pop=document.querySelector('[role="dialog"][data-state="open"]');
      const opt=document.querySelector('.filter-option');
      const c=getComputedStyle(pop), o=getComputedStyle(opt);
      const probe=document.createElement('div'); probe.className='animate-spin'; pop.appendChild(probe);
      const pc=getComputedStyle(probe); const spin={name:pc.animationName,dur:pc.animationDuration,iter:pc.animationIterationCount};
      probe.remove();
      const probe2=document.createElement('div'); probe2.className='duration-fast'; pop.appendChild(probe2);
      const p2=getComputedStyle(probe2); const durFast={transitionDuration:p2.transitionDuration};
      probe2.remove();
      return { prm: matchMedia('(prefers-reduced-motion: reduce)').matches,
        popoverTransitionDuration: c.transitionDuration.split(',').slice(0,4).join(','),
        popoverTransitionProperty: c.transitionProperty.split(',').slice(0,4).join(','),
        optionTransition: o.transitionProperty+' / '+o.transitionDuration+' / '+o.transitionTimingFunction,
        spinUnderPRM: spin, durationFastToken: getComputedStyle(document.documentElement).getPropertyValue('--duration-fast'),
        durFastUtility: durFast };
    })()`);
    await browser.close();
}

// 4. sibling: UserSortMenu on /#/admin/users (same folder, same job)
{
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    R.sibling = await page.evaluate(`(() => {
      const t=document.querySelector('button[aria-label="Sort users"]');
      if(!t) return {absent:true, reason:'trigger not rendered (admin gate)'};
      const c=getComputedStyle(t); const r=t.getBoundingClientRect();
      return {classes:t.className, rendered:r.width.toFixed(2)+'x'+r.height.toFixed(2),
        borderRadius:c.borderRadius, ariaLabel:t.getAttribute('aria-label')};
    })()`);
    await browser.close();
}

fs.writeFileSync(path.join(OUT, "p5-4.json"), JSON.stringify(R, null, 2));
console.log("WROTE p5-4.json");
console.log("dock closed:", JSON.stringify(R.dockClosed.dock));
console.log("dock open  :", JSON.stringify(R.dockOpen.dock));
console.log("dock late  :", JSON.stringify(R.dockOpenLate.dock));
console.log("dock closed2:", JSON.stringify(R.dockAfterClose.dock));
console.log("focusAfterClose:", R.focusAfterClose);
console.log("growth:", JSON.stringify(R.growth));
console.log("marks radius:", JSON.stringify(R.marks.radioVsCheckboxRadius), "size", JSON.stringify(R.marks.radioVsCheckboxSize));
console.log("popover padding:", R.marks.popoverPadding, "| classes:", R.marks.popoverClassList);
console.log("trigger:", JSON.stringify(R.marks.triggerBox));
console.log("PRM:", JSON.stringify(R.reducedMotion));
console.log("sibling:", JSON.stringify(R.sibling));
