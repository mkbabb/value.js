// CHALLENGE-D pass 2 · probe 7 — submenu gutter/width, disabled-compounding,
// contrast, mobile trigger target. Read-only against the live dev server.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D7-pass2-results.json", import.meta.url).pathname;

const SAVED = {
    id: "pal-longname-1",
    name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "muted-terracotta-and-deep-sea-foam-study",
    isLocal: true,
    tier: "featured",
    versionCount: 4,
    colors: [
        { css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" },
        { css: "#e8dcc0" }, { css: "#7a4a32" },
    ],
};
const TEMP = { id: "__extracted__t1", name: "Temp", slug: "temp", isLocal: true, colors: [{ css: "#123a5f" }, { css: "#9dc0e8" }] };

const seed = (page) =>
    page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED, TEMP] }));

const R = {};

const CONTRAST = `
function srgbToLin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function lum(rgb){const[r,g,b]=rgb;return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b);}
function parse(s){const m=s.match(/-?[\\d.]+/g);return m?m.slice(0,3).map(Number):null;}
function over(fg,bg,a){return fg.map((c,i)=>c*a+bg[i]*(1-a));}
function ratio(a,b){const l1=lum(a),l2=lum(b);const[hi,lo]=l1>l2?[l1,l2]:[l2,l1];return +( (hi+0.05)/(lo+0.05) ).toFixed(2);}
`;

async function desktop(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await seed(page);
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(600);

    // tokens
    R.tokens = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return {
            "--opacity-disabled": cs.getPropertyValue("--opacity-disabled").trim(),
            "--dropdown-text": cs.getPropertyValue("--dropdown-text").trim(),
            "--type-small": cs.getPropertyValue("--type-small").trim(),
            "--overlay-min-width": cs.getPropertyValue("--overlay-min-width").trim(),
            "--radius-panel": cs.getPropertyValue("--radius-panel").trim(),
            "--radius-card": cs.getPropertyValue("--radius-card").trim(),
        };
    });

    // header contrast on the real menu surface
    R.headerContrast = await page.evaluate(
        (fnSrc) => {
            eval(fnSrc);
            const lbl = document.querySelector(".dropdown-menu__label");
            const menu = document.querySelector('[role="menu"]');
            const item = document.querySelector('[role="menuitem"]');
            // walk up for the first opaque-ish backdrop
            let bg = getComputedStyle(menu).backgroundColor;
            const surf = parse(bg);
            const page = parse(getComputedStyle(document.body).backgroundColor) || [255, 255, 255];
            const alpha = (bg.match(/[\d.]+\)$/) && bg.startsWith("rgba")) ? parseFloat(bg.match(/([\d.]+)\)$/)[1]) : 1;
            const composited = surf ? over(surf, page, alpha) : page;
            const lblC = parse(getComputedStyle(lbl).color);
            const itemC = parse(getComputedStyle(item).color);
            return {
                menuBackgroundColor: bg,
                menuBackdropFilter: getComputedStyle(menu).backdropFilter,
                compositedSurface: composited.map((n) => +n.toFixed(1)),
                labelColor: getComputedStyle(lbl).color,
                labelRatio: ratio(lblC, composited),
                itemColor: getComputedStyle(item).color,
                itemRatio: ratio(itemC, composited),
                labelFontSize: getComputedStyle(lbl).fontSize,
            };
        },
        CONTRAST,
    );

    // compounded disabled + opacity-55 annotation — force the disabled arm on a live row
    R.compounded = await page.evaluate(() => {
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((i) => /Publish/.test(i.textContent));
        if (!item) return { found: false };
        const before = getComputedStyle(item).opacity;
        item.setAttribute("data-disabled", "");
        const after = getComputedStyle(item).opacity;
        // build the exact annotation span the SFC writes
        const span = document.createElement("span");
        span.className = "ml-auto fira-code text-mono-caption opacity-55 tracking-wide";
        span.style.fontVariant = "small-caps";
        span.textContent = "offline";
        item.appendChild(span);
        const acs = getComputedStyle(span);
        const res = {
            found: true,
            itemOpacityBefore: before,
            itemOpacityDisabled: after,
            annotationOpacity: acs.opacity,
            effectiveAlpha: +(parseFloat(after) * parseFloat(acs.opacity)).toFixed(4),
            annotationColor: acs.color,
            annotationFontSize: acs.fontSize,
            annotationTextTransform: acs.textTransform,
            annotationLetterSpacing: acs.letterSpacing,
            cursor: getComputedStyle(item).cursor,
            pointerEvents: getComputedStyle(item).pointerEvents,
        };
        span.remove();
        item.removeAttribute("data-disabled");
        return res;
    });

    // open the Export submenu by hover, then measure the two panels
    const sub = page.locator('[role="menuitem"]', { hasText: "Export" }).first();
    await sub.hover();
    await page.waitForTimeout(900);
    R.submenu = await page.evaluate(() => {
        const panels = [...document.querySelectorAll('[role="menu"]')].map((m) => {
            const r = m.getBoundingClientRect();
            const cs = getComputedStyle(m);
            return {
                cls: m.className.toString().split(" ").slice(0, 2).join(" "),
                x: +r.left.toFixed(1), y: +r.top.toFixed(1),
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                fontStyle: cs.fontStyle, fontSize: cs.fontSize,
                minWidth: cs.minWidth, borderRadius: cs.borderRadius,
            };
        });
        const items = [...document.querySelectorAll('[role="menuitem"]')].map((it) => {
            const r = it.getBoundingClientRect();
            const svg = it.querySelector("svg");
            let tx = null;
            const w = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
            while (w.nextNode()) if (w.currentNode.textContent.trim()) { const rg = document.createRange(); rg.selectNode(w.currentNode); tx = +rg.getBoundingClientRect().left.toFixed(2); break; }
            const cs = getComputedStyle(it);
            return {
                text: it.textContent.trim().slice(0, 26),
                panel: it.closest(".dropdown-menu__sub-content") ? "sub" : "parent",
                itemLeft: +r.left.toFixed(2),
                hasIcon: !!svg,
                textLeft: tx,
                textInset: tx == null ? null : +(tx - r.left).toFixed(2),
                fontStyle: cs.fontStyle,
                h: +r.height.toFixed(1),
            };
        });
        const seps = [...document.querySelectorAll('[role="separator"], .dropdown-menu__separator')].map((s) => ({
            panel: s.closest(".dropdown-menu__sub-content") ? "sub" : "parent",
            y: +s.getBoundingClientRect().top.toFixed(1),
        }));
        return { panels, items, separators: seps };
    });
    await page.screenshot({ path: new URL("./evidence/pass2-desktop-submenu.png", import.meta.url).pathname });
    await ctx.close();
}

async function mobileTrigger(browser) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    await seed(page);
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    R.mobile = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Palette menu"]');
        const card = document.querySelector('[role="article"]');
        const nameSpan = card?.querySelector("span[title]");
        const row = t?.closest("div.flex.items-center.justify-between");
        const rr = row?.getBoundingClientRect();
        const r = t?.getBoundingClientRect();
        return {
            trigger: r ? { w: +r.width.toFixed(1), h: +r.height.toFixed(1), right: +r.right.toFixed(1) } : null,
            viewportW: innerWidth,
            metaRow: rr ? { w: +rr.width.toFixed(1), h: +rr.height.toFixed(1) } : null,
            nameShown: nameSpan ? { scrollW: nameSpan.scrollWidth, clientW: nameSpan.clientWidth, text: nameSpan.textContent.trim() } : null,
        };
    });
    await ctx.close();
}

const browser = await chromium.launch();
for (const [k, fn] of [["desktop", desktop], ["mobile", mobileTrigger]]) {
    try { await fn(browser); } catch (e) { R[k + "Error"] = String(e).slice(0, 300); }
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
