import { webkit } from "playwright";

const URL_ = "http://localhost:9000/#/gradient";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const measure = () => {
    const out = {};
    const cs = (el, ...props) => {
        if (!el) return null;
        const c = getComputedStyle(el);
        const o = {};
        for (const p of props) o[p] = c[p] ?? c.getPropertyValue(p);
        const r = el.getBoundingClientRect();
        o._rect = { w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
        return o;
    };
    const root = getComputedStyle(document.documentElement);
    out.tokens = {};
    for (const t of [
        "--radius", "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl",
        "--radius-card", "--radius-pill", "--radius-panel", "--radius-input",
        "--radius-control", "--touch-target",
    ]) out.tokens[t] = root.getPropertyValue(t).trim();

    const rail = document.querySelector(".readout-rail");
    out.rail = cs(rail, "borderRadius", "backgroundColor", "boxShadow", "padding");

    const card = rail?.closest(".rounded-card");
    out.card = cs(card, "borderRadius", "boxShadow", "backgroundColor", "borderTopColor");

    const ramp = card?.querySelector('[role="img"]');
    out.ramp = cs(ramp, "borderRadius", "height");

    const strip = card?.querySelector(".fading-scroll");
    out.strip = cs(strip, "borderRadius", "overflowX", "overflowY", "maskImage",
        "webkitMaskImage", "backgroundColor", "direction", "padding");
    if (strip) {
        out.stripScroll = {
            scrollWidth: strip.scrollWidth,
            clientWidth: strip.clientWidth,
            scrollLeft: strip.scrollLeft,
            overflowing: strip.scrollWidth > strip.clientWidth + 1,
        };
    }

    const tiles = [...(card?.querySelectorAll(".specimen-tile") ?? [])];
    out.tileCount = tiles.length;
    out.tiles = tiles.map((t) => {
        const r = t.getBoundingClientRect();
        const c = getComputedStyle(t);
        const label = t.querySelector(".tile-label");
        const lr = label?.getBoundingClientRect();
        const g = t.querySelector(".tile-glyph");
        const gr = g?.getBoundingClientRect();
        const inner = r.width - parseFloat(c.paddingLeft) - parseFloat(c.paddingRight);
        return {
            id: t.getAttribute("data-specimen"),
            state: t.getAttribute("data-state"),
            w: +r.width.toFixed(2), h: +r.height.toFixed(2),
            radius: c.borderRadius,
            boxShadow: c.boxShadow.slice(0, 240),
            backdropFilter: c.backdropFilter || c.webkitBackdropFilter,
            bg: c.backgroundColor,
            border: c.borderTopWidth + " " + c.borderTopColor,
            padding: c.padding,
            fontSize: c.fontSize,
            labelW: lr ? +lr.width.toFixed(2) : null,
            labelOverflowPx: lr ? +(lr.width - inner).toFixed(2) : null,
            glyphW: gr ? +gr.width.toFixed(2) : null,
        };
    });

    out.eyebrow = cs(card?.querySelector(".family-eyebrow"), "fontSize", "fontFamily", "letterSpacing", "color", "opacity");
    out.tileLabel = cs(card?.querySelector(".tile-label"), "fontSize", "fontFamily", "color", "lineHeight");
    out.railBtn = cs(card?.querySelector(".rail-btn"), "borderRadius", "padding");
    out.railCode = cs(card?.querySelector(".readout-rail code"), "fontSize", "color");
    out.famSep = cs(card?.querySelector(".strip-family + .strip-family"), "borderLeftWidth", "borderLeftColor", "paddingLeft");
    out.head = cs(card?.querySelector(".interval-head"), "padding", "minHeight");
    out.stripRow = cs(card?.querySelector(".strip-row"), "gap", "padding");

    let cellRuleFound = false, chipRuleFound = false, capsuleRuleFound = false;
    for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rs) => {
            for (const r of rs) {
                if (r.cssRules) walk(r.cssRules);
                else if (r.selectorText) {
                    if (r.selectorText.includes("glass-chip--cell")) cellRuleFound = true;
                    if (r.selectorText.includes(".glass-chip")) chipRuleFound = true;
                    if (r.selectorText.includes(".glass-capsule")) capsuleRuleFound = true;
                }
            }
        };
        walk(rules ?? []);
    }
    out.cssRulePresence = { glassChipCell: cellRuleFound, glassChipAny: chipRuleFound, glassCapsule: capsuleRuleFound };
    out.tuneBtn = !!card?.querySelector('[aria-label="Author a custom curve"]');

    // Radius register across the whole open easing card, every visible box
    const reg = new Map();
    for (const el of card?.querySelectorAll("*") ?? []) {
        const c = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        const br = c.borderTopLeftRadius;
        if (br === "0px") continue;
        const key = br;
        const cls = (el.className?.baseVal ?? el.className ?? "").toString().split(/\s+/).slice(0, 4).join(".");
        if (!reg.has(key)) reg.set(key, []);
        const arr = reg.get(key);
        if (arr.length < 4) arr.push({ tag: el.tagName, cls, w: +r.width.toFixed(1), h: +r.height.toFixed(1), ratio: +(parseFloat(br) / Math.min(r.width, r.height)).toFixed(3) });
    }
    out.radiusRegister = Object.fromEntries(reg);
    return out;
};

const run = async () => {
    const results = {};
    const matrices = {
        "desktop-light": { viewport: { width: 1440, height: 900 }, colorScheme: "light" },
        "desktop-dark": { viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
        "mobile-light": { viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 3 },
        "rtl-desktop": { viewport: { width: 1440, height: 900 }, colorScheme: "light" },
        "reduced-motion": { viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" },
        "forced-colors": { viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" },
    };
    for (const [name, opts] of Object.entries(matrices)) {
        const browser = await webkit.launch();
        const ctx = await browser.newContext(opts);
        const page = await ctx.newPage();
        await page.goto(URL_, { waitUntil: "load" });
        if (name === "rtl-desktop") {
            await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
        }
        await page.waitForTimeout(3500);
        try { results[name] = await page.evaluate(measure); }
        catch (e) { results[name] = { error: String(e) }; }
        try {
            const h = await page.evaluateHandle(() => document.querySelector(".readout-rail")?.closest(".rounded-card"));
            const el = h.asElement();
            if (el) await el.screenshot({ path: `${OUT}/easing-${name}.png` });
        } catch { /* noop */ }
        await browser.close();
    }
    console.log(JSON.stringify(results, null, 1));
};
run();
