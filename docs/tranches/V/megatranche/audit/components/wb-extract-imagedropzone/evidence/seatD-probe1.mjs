import { chromium } from "playwright";

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract");
await page.waitForTimeout(4000);

const z = page.locator('[role="button"][aria-label*="Upload image"]');
const out = await z.evaluate((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const parent = el.parentElement;
    return {
        classAttr: el.getAttribute("class"),
        tabIndex: el.tabIndex,
        rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(2), y: +r.y.toFixed(2) },
        minHeight: cs.minHeight, maxHeight: cs.maxHeight, height: cs.height,
        borderColor: cs.borderTopColor, borderStyle: cs.borderTopStyle, borderWidth: cs.borderTopWidth,
        bg: cs.backgroundColor,
        radius: cs.borderTopLeftRadius,
        cornerShape: cs.getPropertyValue("corner-shape"),
        transitionProperty: cs.transitionProperty.slice(0, 300),
        transitionDuration: cs.transitionDuration.slice(0, 300),
        transitionTiming: cs.transitionTimingFunction.slice(0, 120),
        cursor: cs.cursor,
        parentRect: (() => { const pr = parent.getBoundingClientRect(); return { w: +pr.width.toFixed(2), h: +pr.height.toFixed(2) }; })(),
    };
});

const rules = await z.evaluate((el) => {
    const hits = [];
    for (const sheet of document.styleSheets) {
        let rs; try { rs = sheet.cssRules; } catch { continue; }
        const walk = (list) => {
            for (const r of list) {
                if (r.cssRules) { walk(r.cssRules); continue; }
                if (!r.selectorText) continue;
                if (!/min-height/.test(r.cssText)) continue;
                try { if (el.matches(r.selectorText)) hits.push({ sel: r.selectorText, text: r.cssText.slice(0, 120) }); } catch { }
            }
        };
        walk(rs);
    }
    return hits;
});

const vars = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const names = ["--primary", "--ink-muted", "--muted-foreground", "--duration-normal", "--duration-fast", "--ease-standard", "--radius-panel", "--radius-xl", "--background"];
    const o = {}; names.forEach((n) => (o[n] = cs.getPropertyValue(n).trim())); return o;
});

const shot = await page.screenshot({ clip: { x: out.rect.x - 4, y: out.rect.y - 4, width: out.rect.w + 8, height: 40 } });
await (await import("node:fs/promises")).writeFile("/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD/border-strip.png", shot);

const capt = await page.locator("text=Drop an image or click to browse").evaluate((el) => {
    const cs = getComputedStyle(el);
    return { color: cs.color, fontFamily: cs.fontFamily.slice(0, 60), fontSize: cs.fontSize, letterSpacing: cs.letterSpacing, lineHeight: cs.lineHeight };
});

const flicker = await page.evaluate(() => {
    const el = document.querySelector('[role="button"][aria-label*="Upload image"]');
    const child = el.querySelector("span") || el.querySelector("div");
    const mk = (t) => new DragEvent(t, { bubbles: true, cancelable: true });
    const cls = () => (el.className.includes("border-primary bg-primary/10") ? "DRAG-LIT" : "IDLE");
    const log = [];
    el.dispatchEvent(mk("dragover"));
    return new Promise((res) => {
        requestAnimationFrame(() => {
            log.push(["after dragover on container", cls()]);
            child.dispatchEvent(mk("dragleave"));
            requestAnimationFrame(() => {
                log.push(["after dragleave dispatched on CHILD (bubbles)", cls()]);
                res(log);
            });
        });
    });
});

console.log(JSON.stringify({ out, rules, vars, capt, flicker }, null, 1));
await b.close();
