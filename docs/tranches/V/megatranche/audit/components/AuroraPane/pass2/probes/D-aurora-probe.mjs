import { chromium } from "playwright";

const URL = "http://localhost:9000/#/atmosphere";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const measure = () => {
    const q = (s) => Array.from(document.querySelectorAll(s));
    const r = (el) => {
        const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) };
    };
    const cs = (el, props) => {
        const c = getComputedStyle(el);
        return Object.fromEntries(props.map((p) => [p, c.getPropertyValue(p)]));
    };
    const rows = q(".aurora-row").map((row) => {
        const label = row.querySelector(".aurora-row-label");
        const trig = row.querySelector("[role='combobox'],button");
        return {
            label: label ? label.textContent.trim() : null,
            labelRect: label ? r(label) : null,
            labelCS: label ? cs(label, ["font-family", "font-size", "text-transform", "letter-spacing", "color", "font-style"]) : null,
            trigRect: trig ? r(trig) : null,
            trigCS: trig ? cs(trig, ["font-family", "font-size", "font-style", "min-width", "height"]) : null,
            trigTag: trig ? trig.tagName + "/" + (trig.getAttribute("role") || "") : null,
            ariaLabel: trig ? trig.getAttribute("aria-label") : null,
            ariaLabelledby: trig ? trig.getAttribute("aria-labelledby") : null,
            labelHasId: label ? !!label.id : null,
        };
    });
    const sect = document.querySelector(".config-section-title");
    const card = document.querySelector("main [data-slot='card']") || document.querySelector("main .glass-card") || document.querySelector("main > * > *");
    return {
        viewport: { w: innerWidth, h: innerHeight },
        docScrollW: document.documentElement.scrollWidth,
        rows,
        sectionTitle: sect ? { text: sect.textContent.trim(), rect: r(sect), cs: cs(sect, ["font-family", "font-size", "text-transform", "letter-spacing", "color"]) } : null,
        cardRect: card ? r(card) : null,
        cardSel: card ? String(card.className).slice(0, 90) : null,
        mainRect: document.querySelector("main") ? r(document.querySelector("main")) : null,
        scrollers: q("*").filter((e) => e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflowY !== "visible").map((e) => ({ cls: String(e.className || "").slice(0, 70), sh: e.scrollHeight, ch: e.clientHeight })),
    };
};

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    for (const [name, vp] of [["desktop-1440", { width: 1440, height: 900 }], ["mobile-390", { width: 390, height: 844 }], ["narrow-320", { width: 320, height: 800 }]]) {
        const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        out[name] = await page.evaluate(measure);
        await page.screenshot({ path: `${OUT}/D-probe-${name}.png`, fullPage: false });
        await ctx.close();
    }

    for (const [name, opts] of [
        ["zoom200", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }],
        ["forced-colors", { viewport: { width: 1440, height: 900 }, forcedColors: "active" }],
        ["rtl", { viewport: { width: 1440, height: 900 } }],
    ]) {
        const ctx = await browser.newContext(opts);
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        if (name === "rtl") { await page.evaluate(() => { document.documentElement.dir = "rtl"; }); await page.waitForTimeout(500); }
        out[name] = await page.evaluate(measure);
        await page.screenshot({ path: `${OUT}/D-probe-${name}.png` });
        await ctx.close();
    }

    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.click("[aria-label='Palette harmony']");
        await page.waitForTimeout(700);
        out.menuOpen = await page.evaluate(() => {
            const content = document.querySelector("[role='listbox']");
            const items = Array.from(document.querySelectorAll("[role='option']"));
            const b = (e) => { const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
            return {
                content: content ? { rect: b(content), maxHeight: getComputedStyle(content).maxHeight, overflow: getComputedStyle(content).overflowY, sh: content.scrollHeight, ch: content.clientHeight } : null,
                items: items.map((i) => ({ text: i.textContent.trim().slice(0, 40), rect: b(i), sel: i.getAttribute("aria-selected"), fontStyle: getComputedStyle(i).fontStyle, fontSize: getComputedStyle(i).fontSize })),
                viewportH: innerHeight,
            };
        });
        await page.screenshot({ path: `${OUT}/D-probe-menu-open.png` });
        await ctx.close();
    }

    console.log(JSON.stringify(out, null, 1));
    await browser.close();
};
run();
