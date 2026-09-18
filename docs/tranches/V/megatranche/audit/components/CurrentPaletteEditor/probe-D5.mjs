// CHALLENGE-D pass 2 — follow-up probe: boundary contrast, hover side effects,
// touch-path reachability, RTL, transition inventory. Read-only.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D5.json", import.meta.url).pathname;
const FRAMES = new URL("./frames-D4/", import.meta.url).pathname;
mkdirSync(FRAMES, { recursive: true });

const FIVE = [
    "rgb(226 87 31)", "rgb(31 119 226)", "rgb(52 168 83)",
    "rgb(234 179 8)", "rgb(147 51 234)",
];
const seed = (saved) => `localStorage.setItem("color-picker", JSON.stringify({inputColor:${JSON.stringify(saved[0] ?? "rgb(226 87 31)")},savedColors:${JSON.stringify(saved)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[]}))`;

const CONTRAST = `
(() => {
  const parse = (c) => {
    const m = c.match(/[-\\d.]+/g); if (!m) return null;
    const v = m.map(Number);
    // handle oklab()/oklch()/color() by painting into a probe element and re-reading rgb
    return v;
  };
  // paint each color into a helper so WebKit serialises it to rgb()
  const probe = document.createElement("div");
  probe.style.position = "fixed"; probe.style.left = "-9999px";
  document.body.appendChild(probe);
  const toRGB = (css) => { probe.style.color = ""; probe.style.color = css;
    const c = getComputedStyle(probe).color; const m = c.match(/[\\d.]+/g);
    return m ? { r:+m[0], g:+m[1], b:+m[2], a: m[3] !== undefined ? +m[3] : 1 } : null; };
  const over = (fg, bg) => ({ r: fg.a*fg.r + (1-fg.a)*bg.r, g: fg.a*fg.g + (1-fg.a)*bg.g, b: fg.a*fg.b + (1-fg.a)*bg.b, a:1 });
  const lum = (c) => { const f = [c.r,c.g,c.b].map(v => { v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); });
    return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2]; };
  const ratio = (a,b) => { const x=lum(a),y=lum(b); const [hi,lo]=x>y?[x,y]:[y,x]; return +(((hi+0.05)/(lo+0.05)).toFixed(3)); };

  const well = document.querySelector(".dashed-well");
  const wcs = getComputedStyle(well);
  const root = getComputedStyle(document.documentElement);
  const cardEdgeVar = root.getPropertyValue("--card-edge").trim();
  const wellBgVar = root.getPropertyValue("--well-bg").trim();
  const wellFill = toRGB(wcs.backgroundColor);
  const edgeRaw = toRGB(wcs.borderTopColor);
  const edgeComposited = over(edgeRaw, wellFill);
  // the pane plate the well sits on
  const card = well.closest(".card, [class*=glass-]") || well.parentElement;
  const plate = toRGB(getComputedStyle(card).backgroundColor);

  const ghost = document.querySelector(".add-slot-ghost .watercolor-ghost-stroke")
             || document.querySelector(".add-slot-ghost");
  const ghostCS = ghost ? getComputedStyle(ghost) : null;
  const ghostEdge = ghostCS ? toRGB(ghostCS.borderTopColor) : null;

  const out = {
    tokens: { cardEdgeVar, wellBgVar },
    wellFill, edgeRaw, edgeComposited,
    borderWidthUsed: wcs.borderTopWidth,
    borderStyle: wcs.borderTopStyle,
    edgeVsFill: ratio(edgeComposited, wellFill),
    wellVsPlate: plate ? ratio(wellFill, over(plate, {r:255,g:255,b:255,a:1})) : null,
    ghostEdge, ghostEdgeWidth: ghostCS ? ghostCS.borderTopWidth : null,
    ghostVsWell: ghostEdge ? ratio(over(ghostEdge, wellFill), wellFill) : null,
    wellTransition: wcs.transition,
    wellWillChange: wcs.willChange,
    zoneTransitions: [...well.children].map(c => ({ cls: c.className.toString().slice(0,40), transition: getComputedStyle(c).transition })),
    docScrollH: document.body.scrollHeight,
  };
  probe.remove();
  return out;
})()
`;

const results = {};
const b = await webkit.launch();

// P1 — contrast / boundary / transition inventory, light then dark
for (const dark of [false, true]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: dark ? "dark" : "light" });
    const page = await ctx.newPage();
    await page.addInitScript(seed(FIVE));
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2000);
    results["p1-" + (dark ? "dark" : "light")] = await page.evaluate(CONTRAST);
    await ctx.close();
}

// P2 — hover side effects on document height + full-document search for the action verbs
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(seed(FIVE));
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2000);
    const before = await page.evaluate(() => ({
        scrollH: document.body.scrollHeight, clientH: document.documentElement.clientHeight,
        bodyChildren: document.body.children.length,
    }));
    await page.locator(".dashed-well .swatch-row [data-testid=watercolor-swatch]").first().hover({ force: true });
    await page.waitForTimeout(500);
    const during = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        const r = p && p.getBoundingClientRect();
        return {
            scrollH: document.body.scrollHeight, clientH: document.documentElement.clientHeight,
            bodyChildren: document.body.children.length,
            panelRect: r && { x: r.x, y: r.y, w: r.width, h: r.height },
            panelPosition: p && getComputedStyle(p).position,
            panelBg: p && getComputedStyle(p).backgroundColor,
            panelShadow: p && getComputedStyle(p).boxShadow,
            panelBackdrop: p && getComputedStyle(p).backdropFilter,
            panelZ: p && getComputedStyle(p).zIndex,
            panelInline: p && p.getAttribute("style"),
            panelInViewport: r ? (r.top >= 0 && r.bottom <= innerHeight) : null,
            floatingPanelRuleExists: [...document.styleSheets].some(ss => {
                try { return [...ss.cssRules].some(r => r.selectorText && r.selectorText.includes(".floating-panel")); }
                catch { return false; }
            }),
            btnInteractiveRuleExists: [...document.styleSheets].some(ss => {
                try { return [...ss.cssRules].some(r => r.selectorText && r.selectorText.includes(".btn-interactive")); }
                catch { return false; }
            }),
        };
    });
    await page.screenshot({ path: FRAMES + "p2-hover-1440.png" });
    results["p2-hover"] = { before, during };
    await ctx.close();
}

// P3 — touch: after a tap, does ANY node in the document expose the three verbs?
{
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const page = await ctx.newPage();
    await page.addInitScript(seed(FIVE));
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2000);
    const dot = page.locator(".dashed-well .swatch-row [data-testid=watercolor-swatch]").first();
    const box = await dot.boundingBox();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => ({
        canHover: matchMedia("(hover: hover)").matches,
        anyEditNode: [...document.querySelectorAll("*")]
            .filter(e => (e.getAttribute("aria-label") || "").startsWith("Edit color")).length,
        anyRemoveNode: [...document.querySelectorAll("*")]
            .filter(e => (e.getAttribute("aria-label") || "").startsWith("Remove color")).length,
        popperWrappers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
        openDialogs: document.querySelectorAll("[data-state=open]").length,
        bodyTail: [...document.body.children].slice(-3).map(e => e.tagName + "." + e.className.toString().slice(0, 40)),
    }));
    await page.screenshot({ path: FRAMES + "p3-tap-390.png" });
    results["p3-touch"] = r;
    await ctx.close();
}

// P4 — RTL
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(seed(FIVE));
    await page.addInitScript(() => {
        document.addEventListener("DOMContentLoaded", () => {
            document.documentElement.setAttribute("dir", "rtl");
            document.documentElement.setAttribute("lang", "ar");
        });
    });
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2000);
    results["p4-rtl"] = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const row = w.querySelector(".swatch-row");
        const kids = [...row.children].map(c => +c.getBoundingClientRect().x.toFixed(1));
        const chip = w.querySelector(".api-offline-chip");
        return {
            dir: getComputedStyle(w).direction,
            wellRect: (r => ({ x: +r.x.toFixed(1), w: +r.width.toFixed(1) }))(w.getBoundingClientRect()),
            rowChildX: kids,
            chipX: chip ? +chip.getBoundingClientRect().x.toFixed(1) : null,
            chipText: chip ? chip.textContent.trim() : null,
            countText: [...w.querySelectorAll("span")].map(s => s.textContent.trim()).filter(t => /colors?$/.test(t)),
            inputX: +w.querySelector("input").getBoundingClientRect().x.toFixed(1),
            btnX: +w.querySelector("button").getBoundingClientRect().x.toFixed(1),
        };
    });
    await page.screenshot({ path: FRAMES + "p4-rtl-1440.png" });
    await ctx.close();
}

// P5 — reduced motion: does anything in the well still animate?
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.addInitScript(seed(FIVE));
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2000);
    results["p5-reduced"] = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        return {
            wellRect: (r => ({ h: +r.height.toFixed(2) }))(w.getBoundingClientRect()),
            animatedDots: [...w.querySelectorAll(".watercolor-animated")].length,
            rowTransition: getComputedStyle(w.querySelector(".swatch-row")).transition,
            anyRunning: document.getAnimations ? document.getAnimations().length : "n/a",
        };
    });
    await ctx.close();
}

await b.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
