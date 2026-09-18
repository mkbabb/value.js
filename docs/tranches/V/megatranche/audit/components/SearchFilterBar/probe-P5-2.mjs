// CHALLENGE-D pass 5 — SearchFilterBar live probe 2: occlusion, state matrix.
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
    _id: `id${i}`,
    id: `id${i}`,
    slug: `palette-${i}`,
    name: `Palette ${i}`,
    colors: HEX,
    visibility: "public",
    tier: i % 3 === 0 ? "featured" : "standard",
    tags: [TAGS[i % TAGS.length].name],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    attribution: "principal",
    userSlug: "mbabb",
    owner: { slug: "mbabb" },
    votes: 10 - (i % 10),
    voteCount: 10 - (i % 10),
    forkCount: i % 4,
    version: 1,
});

async function stub(ctx, n = 8) {
    await ctx.route(/\/colors\/tags/, (r) =>
        r.fulfill({
            status: 200,
            contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify(TAGS),
        }),
    );
    await ctx.route(/\/palettes(\?|$)/, (r) =>
        r.fulfill({
            status: 200,
            contentType: "application/json",
            headers: { "access-control-allow-origin": "*" },
            body: JSON.stringify({
                data: Array.from({ length: n }, (_, i) => pal(i)),
                nextCursor: null,
                hasMore: false,
            }),
        }),
    );
}

const M = `(() => {
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const q=(s,r=document)=>r.querySelector(s);
  const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();
    return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2),
      top:+r.top.toFixed(2),bottom:+r.bottom.toFixed(2),left:+r.left.toFixed(2),right:+r.right.toFixed(2)};};
  const cs=(e,p)=>{if(!e)return null;const c=getComputedStyle(e);const o={};for(const k of p)o[k]=c.getPropertyValue(k);return o;};
  const pop=q('[role="dialog"][data-state="open"]');
  const trig=q('button[aria-label="Filters"]');
  const cards=qa('article');
  const rs=cards.map(rect);
  const union=rs.length?rs.reduce((a,r)=>({left:Math.min(a.left,r.left),top:Math.min(a.top,r.top),
    right:Math.max(a.right,r.right),bottom:Math.max(a.bottom,r.bottom)}),{left:1e9,top:1e9,right:-1e9,bottom:-1e9}):null;
  if(union){union.w=+(union.right-union.left).toFixed(2);union.h=+(union.bottom-union.top).toFixed(2);}
  const pr=rect(pop);
  const inter=(a,b)=>{if(!a||!b)return null;const w=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));
    const h=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));return {w:+w.toFixed(2),h:+h.toFixed(2),area:+(w*h).toFixed(1)};};
  // how many cards are wholly/partly covered
  const covered = rs.map(r=>{const i=inter(pr,r); return i? +(i.area/(r.w*r.h)).toFixed(3):0;});
  const opt=qa('.filter-option',pop||document);
  return {
    viewport:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio},
    scheme:document.documentElement.classList.contains('dark')?'dark':'light',
    dir:getComputedStyle(document.documentElement).direction,
    forcedColors: matchMedia('(forced-colors: active)').matches,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    cards: cards.length, cardRects: rs.slice(0,3), wallUnion: union,
    popover: pr && {rect:pr, belowFold:+(pr.bottom-innerHeight).toFixed(2), aboveFold:+(0-pr.top).toFixed(2),
      scrollH: pop.scrollHeight, clientH: pop.clientHeight,
      cs: cs(pop,['max-height','overflow-y','background-color','backdrop-filter','padding','transition-duration','animation-duration','forced-color-adjust'])},
    trigger: {rect:rect(trig), cs: cs(trig,['background-color','box-shadow','border','forced-color-adjust','height','width'])},
    occlusion: pr && union ? {
      popoverArea:+(pr.w*pr.h).toFixed(1), wallArea:+(union.w*union.h).toFixed(1),
      overlap: inter(pr,union),
      pctOfWallCovered: +((inter(pr,union).area)/(union.w*union.h)*100).toFixed(1),
      cardsFullyCovered: covered.filter(c=>c>=0.999).length,
      cardsPartlyCovered: covered.filter(c=>c>0 && c<0.999).length,
      perCardCoverage: covered,
      pctOfViewport: +((pr.w*pr.h)/(innerWidth*innerHeight)*100).toFixed(1),
    } : null,
    motion: {
      filterOption: cs(opt[0],['transition-property','transition-duration','transition-timing-function']),
      popoverTransitionDuration: pop && getComputedStyle(pop).transitionDuration,
      spinner: (()=>{const s=q('.animate-spin',pop||document); return s?cs(s,['animation-name','animation-duration','animation-iteration-count']):null;})(),
      spinnerRuleExists: (()=>{ // does .animate-spin still animate under reduced motion?
        const d=document.createElement('div'); d.className='animate-spin'; document.body.appendChild(d);
        const c=getComputedStyle(d); const o={name:c.animationName,dur:c.animationDuration}; d.remove(); return o; })(),
    },
    optionCS: opt[0] ? cs(opt[0],['font-family','font-size','line-height','min-height','padding','color']) : null,
    optionRects: opt.map(o=>({t:o.textContent.trim().slice(0,24), ...rect(o)})),
    swatch: (()=>{const s=q('button[aria-label^="Open color picker"]',pop||document);
      return s?{rect:rect(s),cs:cs(s,['box-shadow','border','background-color','forced-color-adjust'])}:null;})(),
    badge: (()=>{const b=trig&&trig.querySelector('span'); if(!b)return null;
      const r=rect(b); const tr=rect(trig);
      return {rect:r, text:b.textContent.trim(), cs:cs(b,['background-color','color','font-size','width','height','border-radius','overflow']),
        outsideTriggerLeft:+(tr.left-r.left).toFixed(2), outsideTriggerTop:+(tr.top-r.top).toFixed(2),
        parentOverflow: getComputedStyle(trig).overflow, parentClip: getComputedStyle(trig).clipPath};})(),
  };
})()`;

async function tabOrder(page) {
    return await page.evaluate(async () => {
        const seen = [];
        const el = () => {
            const a = document.activeElement;
            if (!a) return "null";
            return `${a.tagName}${a.getAttribute("role") ? "[" + a.getAttribute("role") + "]" : ""}:${(
                a.getAttribute("aria-label") ||
                a.textContent ||
                ""
            )
                .trim()
                .slice(0, 24)}`;
        };
        for (let i = 0; i < 22; i++) {
            seen.push(el());
            await new Promise((r) => setTimeout(r, 10));
            // synthetic Tab is not possible from JS; caller drives keys
        }
        return seen;
    });
}

async function run(engine, name, ctxOpts, opts = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext(ctxOpts);
    await stub(ctx, opts.wall ?? 8);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    if (opts.dark) {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(400);
    }
    if (opts.rtl) {
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        await page.waitForTimeout(300);
    }
    await page.screenshot({ path: path.join(OUT, `${name}-closed.png`) });
    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(600);
    const open = await page.evaluate(M);
    await page.screenshot({ path: path.join(OUT, `${name}-open.png`) });

    // hover a sort option and a tag option, capture
    let hover = null;
    try {
        await page.locator(".filter-option").first().hover();
        await page.waitForTimeout(200);
        await page.screenshot({ path: path.join(OUT, `${name}-hover-sort.png`) });
        hover = await page.evaluate(
            `(() => { const o=document.querySelectorAll('.filter-option')[0];
               const c=getComputedStyle(o); return {bg:c.backgroundColor, w:o.getBoundingClientRect().width}; })()`,
        );
    } catch {}

    // keyboard traversal from the trigger
    let tabs = [];
    try {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
        await page.locator('button[aria-label="Filters"]').first().focus();
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
        for (let i = 0; i < 16; i++) {
            const cur = await page.evaluate(() => {
                const a = document.activeElement;
                if (!a) return "null";
                const inPop = !!a.closest('[role="dialog"]');
                return `${inPop ? "IN " : "OUT "}${a.tagName}${
                    a.getAttribute("role") ? "[" + a.getAttribute("role") + "]" : ""
                }:${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 22)}`;
            });
            tabs.push(cur);
            await page.keyboard.press("Tab");
            await page.waitForTimeout(60);
        }
    } catch (e) {
        tabs.push("ERR " + e.message);
    }

    // badge state: pick Featured tier, close, shoot the trigger
    let badge = null;
    try {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        await page.locator('button[aria-label="Filters"]').first().click();
        await page.waitForTimeout(400);
        await page
            .locator(".filter-option")
            .filter({ hasText: "Featured" })
            .first()
            .click();
        await page.waitForTimeout(400);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
        badge = await page.evaluate(M);
        const t = page.locator('button[aria-label="Filters"]').first();
        await t.screenshot({ path: path.join(OUT, `${name}-badge-trigger.png`) });
        await page.screenshot({ path: path.join(OUT, `${name}-badge-page.png`) });
    } catch (e) {
        badge = { err: e.message };
    }

    await browser.close();
    return { name, ctxOpts, opts, open, hover, tabs, badgeState: badge, errs: [...new Set(errs)].slice(0, 10) };
}

const R = {};
R.desktopLight = await run(chromium, "p5-2-desktop-light", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
});
R.desktopDark = await run(chromium, "p5-2-desktop-dark", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
}, { dark: true });
R.zoom200 = await run(chromium, "p5-2-zoom200", {
    viewport: { width: 720, height: 450 },
    colorScheme: "light",
});
R.mobile = await run(chromium, "p5-2-mobile", {
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
});
R.forcedColors = await run(chromium, "p5-2-forced-colors", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    forcedColors: "active",
});
R.reducedMotion = await run(chromium, "p5-2-reduced-motion", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    reducedMotion: "reduce",
});
R.rtl = await run(chromium, "p5-2-rtl", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
}, { rtl: true });
R.webkit = await run(webkit, "p5-2-webkit", {
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
});

fs.writeFileSync(path.join(OUT, "p5-2.json"), JSON.stringify(R, null, 2));
console.log("WROTE p5-2.json");
for (const [k, v] of Object.entries(R)) {
    const o = v.open;
    console.log(
        k,
        "| cards",
        o.cards,
        "| pop",
        o.popover && `${o.popover.rect.w}x${o.popover.rect.h}`,
        "| below",
        o.popover && o.popover.belowFold,
        "| occl%wall",
        o.occlusion && o.occlusion.pctOfWallCovered,
        "| fullyCov",
        o.occlusion && o.occlusion.cardsFullyCovered,
        "| errs",
        v.errs.length,
    );
}
