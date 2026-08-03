import { webkit } from "playwright";
const ORIGIN = "http://localhost:9000";
const browser = await webkit.launch();
const out = {};

const grab = () => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    // the k label is the previous sibling of the rail's wrapper
    const wrap = rail.parentElement;              // .relative.flex-1.h-6
    const row = wrap.parentElement;               // .flex.items-center.gap-2.w-full
    const label = row.querySelector("label");
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), r: +b.right.toFixed(1), w: +b.width.toFixed(1) }; };
    const cs = getComputedStyle(label);
    // ink measurement without the w-5 reservation
    const measure = (cls, text) => {
        const p = document.createElement("span");
        p.className = cls.replace(/\bw-5\b/, "").trim();
        p.style.cssText = "position:absolute;white-space:pre;visibility:hidden";
        p.textContent = text;
        document.body.appendChild(p);
        const w = +p.getBoundingClientRect().width.toFixed(2);
        p.remove();
        return w;
    };
    return {
        dir: document.documentElement.dir || "ltr",
        labelText: label.textContent.trim(),
        labelCls: label.className,
        labelRect: R(label),
        labelTextAlign: cs.textAlign,
        labelFontSize: cs.fontSize,
        railRect: R(rail),
        rowRect: R(row),
        kcRect: R(kc),
        kcLabelRect: R(kc.querySelector("label")),
        kcReadoutRect: R(kc.querySelector("span.tabular-nums")),
        // reservation truth
        kBoxW: R(label).w,
        kInk_1: measure(label.className, "1"),
        kInk_9: measure(label.className, "9"),
        kInk_16: measure(label.className, "16"),
        // gap between the numeral's ink edge and the rail edge, both dirs
        gapLabelToRail: null,
    };
};

for (const dir of ["ltr", "rtl"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    if (dir === "rtl") {
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(500);
    }
    out[dir] = await page.evaluate(grab);
    await page.screenshot({ path: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-${dir}.png`, clip: { x: 300, y: 470, width: 420, height: 100 } });
    await ctx.close();
}

// narrow arm — 320px (constitution's named narrow viewport)
{
    const ctx = await browser.newContext({ viewport: { width: 320, height: 800 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    out.narrow320 = await page.evaluate(() => {
        const g = grabInner();
        function grabInner() {
            const rail = document.querySelector('[data-o18="extract-k-rail"]');
            const kc = document.querySelector('[data-o18="extract-kc"]');
            const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), r: +b.right.toFixed(1), w: +b.width.toFixed(1) }; };
            const btns = [...document.querySelectorAll("button[title]")].filter(b => ["Upload image","Open camera","Reset"].includes(b.getAttribute("title"))).map(b => ({ t: b.getAttribute("title"), ...R(b) }));
            return {
                railRect: R(rail),
                kcRect: R(kc),
                kcSliderW: R(kc.querySelector(".glass-slider")),
                kcLabelRect: R(kc.querySelector("label")),
                kcReadoutRect: R(kc.querySelector("span.tabular-nums")),
                buttons: btns,
                thumbs: [...document.querySelectorAll('[role="slider"]')].map(t => ({ l: t.getAttribute("aria-label"), ...R(t) })),
                overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            };
        }
        return g;
    });
    await page.screenshot({ path: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-320.png`, fullPage: false });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
