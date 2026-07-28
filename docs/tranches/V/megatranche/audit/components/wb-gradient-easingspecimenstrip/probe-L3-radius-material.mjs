import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForSelector("#easing-interval-0", { timeout: 20000 });
await page.waitForTimeout(2500);

const out = await page.evaluate(() => {
    const row = document.querySelector("#easing-interval-0");
    const card = row?.closest(".rounded-card");
    const q = (sel, root = row) => root?.querySelector(sel);
    const r = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const b = el.getBoundingClientRect();
        return {
            cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 140),
            radius: cs.borderRadius,
            w: +b.width.toFixed(1),
            h: +b.height.toFixed(1),
            bg: cs.backgroundColor,
            shadow: cs.boxShadow.slice(0, 120),
            backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
        };
    };
    // does ANY loaded stylesheet carry the .glass-chip--cell / selectable-on rules?
    let cellRule = null,
        onRule = null,
        chipBase = null,
        scanned = 0;
    const walk = (rules) => {
        for (const rule of rules) {
            scanned++;
            if (rule.cssRules) walk(rule.cssRules);
            const t = rule.selectorText;
            if (!t) continue;
            if (t.includes("glass-chip--cell")) cellRule = rule.cssText.slice(0, 160);
            if (t.includes('glass-chip[data-mode="selectable"][data-state="on"]'))
                onRule = rule.cssText.slice(0, 160);
            if (/^\.glass-chip$/.test(t.trim())) chipBase = rule.cssText.slice(0, 160);
        }
    };
    for (const sheet of document.styleSheets) {
        try {
            walk(sheet.cssRules);
        } catch {
            /* cross-origin */
        }
    }
    const tiles = [...(row?.querySelectorAll(".specimen-tile") ?? [])];
    const pressed = tiles.find((t) => t.getAttribute("data-state") === "on");
    const tokens = getComputedStyle(document.documentElement);
    return {
        rulesScanned: scanned,
        cellRule,
        onRule,
        chipBase,
        tokens: {
            "--radius-card": tokens.getPropertyValue("--radius-card").trim(),
            "--radius-md": tokens.getPropertyValue("--radius-md").trim(),
            "--radius-input": tokens.getPropertyValue("--radius-input").trim(),
            "--radius-pill": tokens.getPropertyValue("--radius-pill").trim(),
            "--radius-panel": tokens.getPropertyValue("--radius-panel").trim(),
        },
        parts: {
            rowCard: r(card),
            ramp: r(q("div[role=\"img\"]")),
            readoutRail: r(q(".readout-rail")),
            railBtn: r(q(".rail-btn")),
            tileFirst: r(tiles[0]),
            tilePressed: r(pressed),
            glyph: r(q(".tile-glyph")),
            stripPort: r(q(".fading-scroll") ?? q(".specimen-strip")),
        },
        tileCount: tiles.length,
        tileClassList: tiles[0] ? [...tiles[0].classList] : [],
        pressedDataState: pressed?.getAttribute("data-state") ?? null,
        pressedBg: pressed ? getComputedStyle(pressed).backgroundColor : null,
        restBg: tiles[1] ? getComputedStyle(tiles[1]).backgroundColor : null,
        pressedBorder: pressed ? getComputedStyle(pressed).borderColor : null,
        restBorder: tiles[1] ? getComputedStyle(tiles[1]).borderColor : null,
        // strip scroll port geometry
        portScrollW: (() => {
            const p = row?.querySelector(".fading-scroll");
            return p ? { sw: p.scrollWidth, cw: p.clientWidth, ox: getComputedStyle(p).overflowX } : null;
        })(),
    };
});
console.log(JSON.stringify(out, null, 1));
console.log("CONSOLE ERRORS:", JSON.stringify(errs));
await browser.close();
