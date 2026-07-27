// CHALLENGE-D follow-up probe: stylesheet reality check for the two cited class
// atoms, the hover-panel position mechanism, the save-Button override outcome,
// and the nested caster-shadow directions. Read-only.
import { webkit, chromium } from "@playwright/test";
import fs from "node:fs";
const ORIGIN = "http://localhost:9000";
const ROOT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const OUT = `${ROOT}/frames-D`;
const FIVE = ["#e2571f", "#12b8bd", "#ffc60b", "#25232b", "#6aab2f"];

async function run(engine, label, { forcedColors = "none" } = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, forcedColors });
    await ctx.addInitScript((cols) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: "#e2571f", savedColors: cols }));
    }, FIVE);
    const page = await ctx.newPage();
    const console_ = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console_.push(m.type() + ": " + m.text().slice(0, 200)); });
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(4200);

    const sheets = await page.evaluate(() => {
        const wanted = ["btn-interactive", "floating-panel", "add-slot-ghost", "edit-overlay", "dashed-well", "swatch-row", "api-offline-chip"];
        const found = Object.fromEntries(wanted.map((w) => [w, []]));
        const walk = (rules, href) => {
            for (const r of rules) {
                if (r.cssRules) { walk(r.cssRules, href); continue; }
                const sel = r.selectorText;
                if (!sel) continue;
                for (const w of wanted) if (sel.includes("." + w)) found[w].push({ sel: sel.slice(0, 120), href: (href ?? "inline").split("/").pop() });
            }
        };
        for (const s of document.styleSheets) {
            try { walk(s.cssRules, s.href); } catch { /* cross-origin */ }
        }
        return Object.fromEntries(Object.entries(found).map(([k, v]) => [k, { count: v.length, first: v.slice(0, 3) }]));
    });

    const geom = await page.evaluate(() => {
        const wells = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0);
        const well = wells[0];
        const card = well.closest(".glass-card, [class*=card], article, section") ?? well.parentElement.closest("*");
        const btn = Array.from(well.querySelectorAll("button"))[0];
        const cs = (el) => el ? {
            w: +el.getBoundingClientRect().width.toFixed(2), h: +el.getBoundingClientRect().height.toFixed(2),
            height: getComputedStyle(el).height, minHeight: getComputedStyle(el).minHeight,
            width: getComputedStyle(el).width, minWidth: getComputedStyle(el).minWidth,
            borderRadius: getComputedStyle(el).borderRadius,
            outlineWidth: getComputedStyle(el).outlineWidth,
            transition: getComputedStyle(el).transition,
        } : null;
        // find the outer Card that hosts the pane
        let host = well.parentElement;
        let cardEl = null;
        while (host) {
            const bs = getComputedStyle(host).boxShadow;
            if (bs && bs !== "none" && host !== well) { cardEl = host; break; }
            host = host.parentElement;
        }
        return {
            saveBtn: cs(btn),
            wellShadow: getComputedStyle(well).boxShadow,
            wellClass: well.getAttribute("class"),
            cardEl: cardEl ? { cls: cardEl.getAttribute("class")?.slice(0, 120), shadow: getComputedStyle(cardEl).boxShadow, rect: (() => { const r = cardEl.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })() } : null,
            inputRow: (() => {
                const row = Array.from(well.children).find((c) => c.querySelector && c.querySelector("input"));
                if (!row) return null;
                const inp = row.querySelector("input"), b = row.querySelector("button");
                const ri = inp.getBoundingClientRect(), rb = b.getBoundingClientRect();
                return { input: { h: +ri.height.toFixed(2), y: +ri.y.toFixed(2) }, btn: { h: +rb.height.toFixed(2), y: +rb.y.toFixed(2) }, baselineDelta: +(ri.y - rb.y).toFixed(2) };
            })(),
        };
    });

    // hover the first swatch and capture what happens
    const hover = await page.evaluate(() => {
        const wells = Array.from(document.querySelectorAll(".dashed-well")).filter((w) => w.getBoundingClientRect().width > 0);
        const wrap = wells[0].querySelector(".swatch-row > div.relative");
        const r = wrap.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    await page.mouse.move(hover.x, hover.y);
    await page.waitForTimeout(800);
    const panel = await page.evaluate(() => {
        const p = document.querySelector("body > .floating-panel");
        if (!p) return null;
        const r = p.getBoundingClientRect();
        const c = getComputedStyle(p);
        return {
            rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
            position: c.position, top: c.top, left: c.left, zIndex: c.zIndex,
            background: c.backgroundColor, boxShadow: c.boxShadow, backdropFilter: c.backdropFilter,
            inlineStyle: p.getAttribute("style"),
            ariaHidden: p.getAttribute("aria-hidden"),
            parent: p.parentElement.tagName,
            inViewport: r.y < window.innerHeight && r.y + r.height > 0,
            buttons: Array.from(p.querySelectorAll("button")).map((b) => b.getAttribute("aria-label")),
        };
    });
    await page.screenshot({ path: `${OUT}/${label}-hover-full.png` });

    // forced-colors truth check
    const fc = await page.evaluate(() => ({
        forcedColorsActive: matchMedia("(forced-colors: active)").matches,
        dotBg: (() => { const d = document.querySelector(".dashed-well [data-testid=watercolor-swatch]"); return d ? getComputedStyle(d).backgroundColor : null; })(),
        dotForcedAdjust: (() => { const d = document.querySelector(".dashed-well [data-testid=watercolor-swatch]"); return d ? getComputedStyle(d).forcedColorAdjust : null; })(),
    }));

    await browser.close();
    return { label, engine: engine.name(), sheets, geom, panel, fc, consoleErrors: console_.slice(0, 12), pageErrors: errs };
}

const out = [];
out.push(await run(webkit, "wk"));
out.push(await run(chromium, "cr-forced", { forcedColors: "active" }));
fs.writeFileSync(`${ROOT}/probe-D2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
