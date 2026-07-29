// CHALLENGE-D pass 4 — probe 2: full state matrix.
// Read-only against the LIVE dev server. API is stubbed at the NETWORK layer
// (page.route) so no app source is touched.
import { webkit } from "playwright";
import fs from "node:fs";

const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
const BASE = "http://192.168.1.166:9000";
const R = {};

const TAGS = ["pastel", "neon", "earth", "monochrome", "retro", "vaporwave",
    "muted", "high-contrast", "duotone", "sunset", "forest", "oceanic"]
    .map((n, i) => ({ name: n, count: 30 - i }));

function palettes(n) {
    return Array.from({ length: n }, (_, i) => ({
        slug: `p-${i}`, name: `Palette ${i}`, userSlug: "someone",
        colors: ["#c86a4a", "#8a6b4f", "#d8c3a5", "#6b7a5e", "#3f4a3a"],
        oklabColors: [{ L: 0.6, a: 0.05, b: 0.05 }],
        visibility: "public", tier: i % 4 === 0 ? "featured" : null,
        tags: ["pastel"], votes: 10 - (i % 10), forkCount: i % 5,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }));
}

async function stub(page) {
    await page.route(/^https?:\/\/(api\.color\.babb\.dev|localhost:1)/, async (route) => {
        const u = route.request().url();
        const j = (b) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(b) });
        if (u.includes("/colors/tags")) return j(TAGS);
        if (u.includes("/palettes/mine")) return j({ palettes: [], hasMore: false });
        if (u.includes("/palettes")) return j({ palettes: palettes(6), hasMore: true, nextCursor: "x" });
        if (u.includes("/sessions/me")) return route.fulfill({ status: 401, contentType: "application/json", body: "{}" });
        return j({});
    });
}

const rect = () => `(el)=>{const b=el.getBoundingClientRect();return{x:+b.x.toFixed(2),y:+b.y.toFixed(2),w:+b.width.toFixed(2),h:+b.height.toFixed(2),top:+b.top.toFixed(2),bottom:+b.bottom.toFixed(2),left:+b.left.toFixed(2),right:+b.right.toFixed(2)};}`;

async function newPage(browser, opts) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await stub(page);
    return page;
}

const browser = await webkit.launch();

// ────────────────────────────────────────────────────────────── A. desktop, populated
{
    const page = await newPage(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(900);

    R.desktopPopulated = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2) }; };
        if (!root) return { error: "no popover" };
        const rows = [...root.querySelectorAll("label.filter-option")].map((l) => {
            const radio = l.querySelector('[role="radio"],[role="checkbox"],button');
            const span = l.querySelector("span:not([class*=shrink])") || [...l.querySelectorAll("span")].pop();
            return {
                text: l.textContent.trim(),
                label: rr(l),
                control: radio ? rr(radio) : null,
                controlRole: radio ? radio.getAttribute("role") : null,
                controlAccName: radio ? (radio.getAttribute("aria-label") || radio.textContent.trim() || null) : null,
                textRect: span ? rr(span) : null,
            };
        });
        const sections = [...root.querySelectorAll(".filter-section")].map((s) => {
            const c = getComputedStyle(s);
            return { label: s.querySelector(".section-label")?.textContent.trim(), rect: rr(s), borderBottomWidth: c.borderBottomWidth, borderBottomColor: c.borderBottomColor, borderTopWidth: c.borderTopWidth };
        });
        const scroller = root.querySelector(".scrollbar-thin");
        const inp = root.querySelector('input[aria-label="Search by CSS color"]');
        let placeholderFits = null;
        if (inp) {
            const c = getComputedStyle(inp);
            const m = document.createElement("span");
            m.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${c.font};letter-spacing:${c.letterSpacing}`;
            m.textContent = inp.placeholder;
            document.body.appendChild(m);
            const need = m.getBoundingClientRect().width;
            m.textContent = "oklch(0.72 0.14 244)";
            const needVal = m.getBoundingClientRect().width;
            m.remove();
            const avail = inp.clientWidth - parseFloat(c.paddingLeft) - parseFloat(c.paddingRight);
            placeholderFits = { placeholder: inp.placeholder, needPx: +need.toFixed(2), needValPx: +needVal.toFixed(2), availPx: +avail.toFixed(2), paddingLeft: c.paddingLeft, paddingRight: c.paddingRight, clientWidth: inp.clientWidth, truncated: need > avail, valTruncated: needVal > avail };
        }
        return {
            popover: rr(root),
            viewport: { w: innerWidth, h: innerHeight },
            popoverBottomOverflowsViewport: rr(root).bottom > innerHeight,
            popoverComputed: (() => { const c = getComputedStyle(root); return { maxHeight: c.maxHeight, overflow: c.overflow, overflowY: c.overflowY, height: c.height, backgroundColor: c.backgroundColor, backdropFilter: c.backdropFilter, opacity: c.opacity }; })(),
            sections, rows,
            tagScroller: scroller ? (() => { const c = getComputedStyle(scroller); return { rect: rr(scroller), maxHeight: c.maxHeight, scrollHeight: scroller.scrollHeight, clientHeight: scroller.clientHeight, overflowY: c.overflowY, tabIndex: scroller.tabIndex, role: scroller.getAttribute("role"), ariaLabel: scroller.getAttribute("aria-label"), scrollable: scroller.scrollHeight > scroller.clientHeight, tagCount: scroller.querySelectorAll("label").length }; })() : null,
            placeholderFits,
            radiogroupNames: [...root.querySelectorAll('[role="radiogroup"]')].map((g) => ({ ariaLabel: g.getAttribute("aria-label"), ariaLabelledby: g.getAttribute("aria-labelledby") })),
            checkboxNames: [...root.querySelectorAll('[role="checkbox"]')].map((c) => ({ name: c.getAttribute("aria-label") || c.textContent.trim() || null, w: c.getBoundingClientRect().width, h: c.getBoundingClientRect().height })),
        };
    });
    await page.screenshot({ path: `${OUT}p4-desktop-populated.png` });
    const bb = await page.locator('[role="dialog"]').first().boundingBox();
    if (bb) await page.screenshot({ path: `${OUT}p4-desktop-populated-crop.png`, clip: { x: bb.x - 10, y: Math.max(0, bb.y - 10), width: bb.width + 20, height: Math.min(bb.height + 20, 900 - Math.max(0, bb.y - 10)) } });

    // ── now activate filters: pick Featured tier + 3 tags → badge + Clear all
    const featured = page.locator('label.filter-option', { hasText: "Featured" });
    await featured.click();
    await page.waitForTimeout(400);
    const tagLabels = page.locator('.scrollbar-thin label.filter-option');
    const n = await tagLabels.count();
    for (let i = 0; i < Math.min(3, n); i++) { await tagLabels.nth(i).click(); await page.waitForTimeout(150); }
    await page.waitForTimeout(500);

    R.activeState = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2) }; };
        const clear = root ? [...root.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all")) : null;
        return {
            popover: root ? rr(root) : null,
            popoverBottom: root ? rr(root).bottom : null,
            viewportH: innerHeight,
            overflowsViewport: root ? rr(root).bottom > innerHeight : null,
            clearAll: clear ? { rect: rr(clear), text: clear.textContent.trim(), fontSize: getComputedStyle(clear).fontSize, fontFamily: getComputedStyle(clear).fontFamily, height: getComputedStyle(clear).height, minHeight: getComputedStyle(clear).minHeight } : null,
        };
    });
    // close popover, inspect badge
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    R.badge = await page.evaluate(() => {
        const trig = document.querySelector('button[aria-label="Filters"]');
        const badge = trig ? trig.querySelector("span") : null;
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2) }; };
        if (!badge) return { error: "no badge", triggerText: trig ? trig.textContent.trim() : null };
        const c = getComputedStyle(badge);
        // clipping ancestors
        const clippers = [];
        let el = badge.parentElement;
        while (el && el !== document.documentElement) {
            const cs = getComputedStyle(el);
            if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible" || cs.clipPath !== "none" || cs.maskImage !== "none") {
                clippers.push({ tag: el.tagName, cls: (el.className || "").toString().slice(0, 90), overflow: cs.overflow, overflowX: cs.overflowX, overflowY: cs.overflowY, clipPath: cs.clipPath.slice(0, 60), maskImage: cs.maskImage.slice(0, 60), rect: rr(el) });
            }
            el = el.parentElement;
        }
        return {
            text: badge.textContent.trim(),
            rect: rr(badge),
            triggerRect: rr(trig),
            computed: { position: c.position, top: c.top, right: c.right, left: c.left, insetInlineEnd: c.insetInlineEnd, insetInlineStart: c.insetInlineStart, background: c.backgroundColor, color: c.color, fontSize: c.fontSize, fontWeight: c.fontWeight, width: c.width, height: c.height, borderRadius: c.borderRadius, zIndex: c.zIndex, forcedColorAdjust: c.forcedColorAdjust },
            ariaHidden: badge.getAttribute("aria-hidden"),
            triggerAccName: trig.getAttribute("aria-label"),
            triggerAccNameIncludesCount: (trig.getAttribute("aria-label") || "").match(/\d/) !== null,
            clippingAncestors: clippers,
        };
    });
    await page.screenshot({ path: `${OUT}p4-badge-desktop.png` });
    const tb = await page.locator('button[aria-label="Filters"]').boundingBox();
    if (tb) await page.screenshot({ path: `${OUT}p4-badge-crop.png`, clip: { x: tb.x - 40, y: tb.y - 20, width: tb.width + 90, height: tb.height + 40 } });
    await page.close();
}

// ────────────────────────────────────────────────────────────── B. mobile 390 + 320
for (const [name, vw, vh] of [["mobile390", 390, 844], ["narrow320", 320, 568]]) {
    const page = await newPage(browser, { viewport: { width: vw, height: vh }, deviceScaleFactor: 3, colorScheme: "light", isMobile: true, hasTouch: true });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const trig = page.locator('button[aria-label="Filters"]');
    const vis = await trig.count();
    if (vis) {
        await trig.click({ force: true });
        await page.waitForTimeout(900);
    }
    R[name] = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2) }; };
        const trig = document.querySelector('button[aria-label="Filters"]');
        return {
            viewport: { w: innerWidth, h: innerHeight },
            trigger: trig ? rr(trig) : null,
            popover: root ? rr(root) : null,
            popoverOverflowsBottom: root ? +(rr(root).bottom - innerHeight).toFixed(2) : null,
            popoverOverflowsTop: root ? +(0 - rr(root).top).toFixed(2) : null,
            popoverMaxHeight: root ? getComputedStyle(root).maxHeight : null,
            popoverOverflowY: root ? getComputedStyle(root).overflowY : null,
            docScrollW: document.documentElement.scrollWidth,
            hOverflow: document.documentElement.scrollWidth > innerWidth,
            smallTargets: root ? [...root.querySelectorAll('button,input,[role="radio"],[role="checkbox"]')].map((el) => { const b = el.getBoundingClientRect(); return { name: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 24) || el.getAttribute("role") || el.tagName, w: +b.width.toFixed(1), h: +b.height.toFixed(1), under44: b.width < 44 || b.height < 44 }; }).filter((t) => t.under44) : null,
        };
    });
    await page.screenshot({ path: `${OUT}p4-${name}.png`, fullPage: false });
    await page.close();
}

// ────────────────────────────────────────────────────────────── C. reduced motion
{
    const page = await newPage(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(700);
    R.reducedMotion = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const out = { prefers: matchMedia("(prefers-reduced-motion: reduce)").matches };
        if (root) {
            const c = getComputedStyle(root);
            out.popoverAnimation = c.animation; out.popoverTransition = c.transition.slice(0, 140);
        }
        // measure the spinner: force `searching` by clicking Search and sampling within the tick
        const btn = root ? [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search") : null;
        out.searchBtnFound = !!btn;
        // static probe: what does .animate-spin compute to under reduce?
        const p = document.createElement("div"); p.className = "animate-spin"; root?.appendChild(p);
        const pc = getComputedStyle(p);
        out.animateSpin = { animationName: pc.animationName, animationDuration: pc.animationDuration, animationIterationCount: pc.animationIterationCount, animationPlayState: pc.animationPlayState };
        p.remove();
        const q = document.createElement("div"); q.className = "filter-option"; root?.appendChild(q);
        q.remove();
        return out;
    });
    await page.close();
}

// ────────────────────────────────────────────────────────────── D. forced colors
{
    const page = await newPage(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, forcedColors: "active", colorScheme: "light" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(800);
    R.forcedColors = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const out = { active: matchMedia("(forced-colors: active)").matches };
        if (!root) return { ...out, error: "no popover" };
        const sw = root.querySelector('button[aria-label^="Open color picker"]');
        const opt = root.querySelector("label.filter-option");
        const sec = root.querySelector(".filter-section");
        const c = (el) => el ? (() => { const s = getComputedStyle(el); return { bg: s.backgroundColor, color: s.color, borderColor: s.borderTopColor, borderWidth: s.borderTopWidth, forcedColorAdjust: s.forcedColorAdjust, boxShadow: s.boxShadow.slice(0, 60) }; })() : null;
        out.swatch = c(sw);
        out.swatchInlineStyle = sw ? sw.getAttribute("style") : null;
        out.option = c(opt);
        out.popover = c(root);
        out.sectionBorderBottom = sec ? getComputedStyle(sec).borderBottomWidth + " " + getComputedStyle(sec).borderBottomColor : null;
        // hover recipe under forced colors
        const probe = document.createElement("div");
        probe.style.backgroundColor = "color-mix(in srgb, var(--accent) 50%, transparent)";
        root.appendChild(probe);
        out.hoverMixResolves = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return out;
    });
    await page.screenshot({ path: `${OUT}p4-forced-colors.png` });
    const fb = await page.locator('[role="dialog"]').first().boundingBox();
    if (fb) await page.screenshot({ path: `${OUT}p4-forced-colors-crop.png`, clip: { x: fb.x - 8, y: Math.max(0, fb.y - 8), width: fb.width + 16, height: Math.min(fb.height + 16, 900 - Math.max(0, fb.y - 8)) } });
    await page.close();
}

// ────────────────────────────────────────────────────────────── E. keyboard traversal + focus ring
{
    const page = await newPage(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.focus('button[aria-label="Filters"]');
    await page.keyboard.press("Enter");
    await page.waitForTimeout(700);
    const seq = [];
    for (let i = 0; i < 14; i++) {
        const cur = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a) return null;
            const c = getComputedStyle(a);
            const b = a.getBoundingClientRect();
            return {
                tag: a.tagName, role: a.getAttribute("role"),
                name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 34) || "(none)",
                inPopover: !!a.closest('[role="dialog"]'),
                outline: c.outlineWidth + " " + c.outlineStyle + " " + c.outlineColor,
                boxShadow: c.boxShadow.slice(0, 90),
                w: +b.width.toFixed(1), h: +b.height.toFixed(1),
            };
        });
        seq.push(cur);
        await page.keyboard.press("Tab");
        await page.waitForTimeout(90);
    }
    R.tabOrder = seq;
    // Escape restores focus?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    R.escapeRestoresFocus = await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a.tagName, name: a.getAttribute("aria-label") || a.textContent.trim().slice(0, 30), isTrigger: a.getAttribute("aria-label") === "Filters" };
    });
    await page.close();
}

// ────────────────────────────────────────────────────────────── F. 200% zoom
{
    const page = await newPage(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await page.waitForTimeout(700);
    const t = page.locator('button[aria-label="Filters"]');
    if (await t.count()) { await t.click({ force: true }); await page.waitForTimeout(800); }
    R.zoom200 = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), bottom: +b.bottom.toFixed(2), top: +b.top.toFixed(2), right: +b.right.toFixed(2) }; };
        return {
            viewport: { w: innerWidth, h: innerHeight },
            popover: root ? rr(root) : null,
            bottomOverflow: root ? +(rr(root).bottom - innerHeight).toFixed(2) : null,
            maxHeight: root ? getComputedStyle(root).maxHeight : null,
            hOverflow: document.documentElement.scrollWidth > innerWidth,
        };
    });
    await page.screenshot({ path: `${OUT}p4-zoom200.png` });
    await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}p4-2.json`, JSON.stringify(R, null, 2));
console.log("WROTE p4-2.json");
