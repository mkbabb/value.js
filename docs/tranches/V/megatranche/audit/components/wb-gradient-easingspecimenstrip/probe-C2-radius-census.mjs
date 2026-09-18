import { chromium } from "playwright";

const URL = "http://localhost:9000/#/gradient";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 160)); });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// ── A. Radius census over the whole easing bench subtree ──
const census = await page.evaluate(() => {
    const strip = document.querySelector(".specimen-strip");
    if (!strip) return { err: "no strip" };
    // the interval card = nearest ancestor with class rounded-card
    let card = strip.closest("[class*='rounded-card']");
    const out = [];
    const seen = new Set();
    const walk = (el, depth) => {
        const cs = getComputedStyle(el);
        const r = cs.borderRadius;
        const rect = el.getBoundingClientRect();
        const key = el.className + "|" + r;
        const tag = el.tagName.toLowerCase();
        const cls = (typeof el.className === "string" ? el.className : el.className.baseVal || "").slice(0, 70);
        if (r !== "0px" && !seen.has(key)) {
            seen.add(key);
            out.push({
                depth, tag, cls,
                radius: r,
                topLeft: cs.borderTopLeftRadius,
                w: +rect.width.toFixed(1), h: +rect.height.toFixed(1),
                bg: cs.backgroundColor,
            });
        }
        for (const c of el.children) walk(c, depth + 1);
    };
    walk(card, 0);
    // also the easing section heading + card itself
    return {
        cardCls: (card.className || "").slice(0, 90),
        cardRadius: getComputedStyle(card).borderRadius,
        rows: out,
        tokens: Object.fromEntries(
            ["--radius", "--radius-xs", "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl",
             "--radius-2xl", "--radius-3xl", "--radius-pill", "--radius-card", "--radius-input",
             "--radius-strip", "--radius-panel", "--radius-well", "--radius-field", "--radius-control"]
            .map((t) => [t, getComputedStyle(document.documentElement).getPropertyValue(t).trim()]),
        ),
    };
});
console.log("=== A. RADIUS CENSUS ===");
console.log(JSON.stringify(census, null, 1));

// ── B. tile geometry + chip css orphan ──
const chip = await page.evaluate(() => {
    const strip = document.querySelector(".specimen-strip");
    const tiles = [...strip.querySelectorAll(".specimen-tile")];
    const cs = (e) => getComputedStyle(e);
    const on = tiles.find((t) => t.getAttribute("data-state") === "on");
    const off = tiles.find((t) => t.getAttribute("data-state") !== "on");
    let chipCssPresent = false;
    for (const ss of document.styleSheets) {
        try { for (const r of ss.cssRules) { if ((r.cssText || "").includes("glass-chip--cell")) chipCssPresent = true; } } catch {}
    }
    const rects = tiles.map((t) => t.getBoundingClientRect());
    return {
        count: tiles.length,
        chipCssPresent,
        tileClass: on ? on.className : null,
        onRadius: cs(on).borderRadius, offRadius: cs(off).borderRadius,
        onBg: cs(on).backgroundColor, offBg: cs(off).backgroundColor,
        onBorder: cs(on).borderColor, offBorder: cs(off).borderColor,
        onBox: [+rects[tiles.indexOf(on)].width.toFixed(1), +rects[tiles.indexOf(on)].height.toFixed(1)],
        widths: [...new Set(rects.map((r) => +r.width.toFixed(1)))].sort((a, b) => a - b),
        heights: [...new Set(rects.map((r) => +r.height.toFixed(1)))],
        // label overhang: how far the label box extends beyond the painted circle at its baseline
        overhang: tiles.map((t) => {
            const lab = t.querySelector(".tile-label").getBoundingClientRect();
            const box = t.getBoundingClientRect();
            const r = Math.min(box.width, box.height) / 2;
            const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
            // half-chord of the circle at the label's vertical centre
            const dy = Math.abs((lab.y + lab.height / 2) - cy);
            const half = dy >= r ? 0 : Math.sqrt(r * r - dy * dy);
            const over = +(lab.width / 2 - half).toFixed(1);
            return { id: t.getAttribute("data-specimen"), labW: +lab.width.toFixed(1), chord: +(half * 2).toFixed(1), over };
        }).filter((o) => o.over > 0),
    };
});
console.log("=== B. CHIP GEOMETRY ===");
console.log(JSON.stringify(chip, null, 1));

// ── C. steps-tile inert press ──
const stepsProbe = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const strip = document.querySelector(".specimen-strip");
    const q = (id) => strip.querySelector(`[data-specimen="${id}"]`);
    const readout = () => document.querySelector(".readout-rail code")?.textContent;
    const pressed = () => [...strip.querySelectorAll(".specimen-tile")].filter((t) => t.getAttribute("data-state") === "on").map((t) => t.dataset.specimen);
    const log = [];
    // 1. select the generic `steps` tile
    q("steps").click(); await wait(500);
    log.push({ step: "click steps", readout: readout(), pressed: pressed() });
    // 2. select step-start (n=1 jump-start)
    q("step-start").click(); await wait(500);
    log.push({ step: "click step-start", readout: readout(), pressed: pressed() });
    // 3. press the ALREADY-PRESSED step-start again
    q("step-start").click(); await wait(500);
    log.push({ step: "re-click step-start (already on)", readout: readout(), pressed: pressed(), domState: q("step-start").getAttribute("data-state"), ariaPressed: q("step-start").getAttribute("aria-pressed") });
    // 4. back to steps generic
    q("steps").click(); await wait(500);
    log.push({ step: "click steps again", readout: readout(), pressed: pressed() });
    return log;
});
console.log("=== C. STEPS / RE-PRESS ===");
console.log(JSON.stringify(stepsProbe, null, 1));

// ── D. keyboard operability of the strip ──
const kb = await page.evaluate(() => {
    const strip = document.querySelector(".specimen-strip");
    const focusables = [...strip.querySelectorAll('button,[tabindex]:not([tabindex="-1"]),a[href],input')];
    return {
        portTabindex: strip.getAttribute("tabindex"),
        portRole: strip.getAttribute("role"),
        portLabel: strip.getAttribute("aria-label"),
        focusableCount: focusables.length,
        firstThree: focusables.slice(0, 3).map((e) => e.tagName + "." + String(e.className).slice(0, 40)),
        scrollWidth: strip.scrollWidth, clientWidth: strip.clientWidth,
    };
});
console.log("=== D. KEYBOARD/PORT ===");
console.log(JSON.stringify(kb, null, 1));

console.log("=== ERRORS SO FAR ===");
console.log(JSON.stringify(errs, null, 1));

// ── E. the back-family crash (LAST — it destroys the pane) ──
const crash = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const strip = document.querySelector(".specimen-strip");
    const q = (id) => strip?.querySelector(`[data-specimen="${id}"]`);
    const out = [];
    for (const id of ["ease-out-circ", "ease-in-back", "ease-out-back", "ease-in-out-back"]) {
        const el = q(id);
        if (!el) { out.push({ id, note: "tile gone — pane torn down" }); continue; }
        el.click(); await wait(700);
        const body = document.querySelector("main")?.innerText?.slice(0, 200) ?? "";
        out.push({
            id,
            stripAlive: !!document.querySelector(".specimen-strip"),
            boundary: body.includes("unexpected error") ? body.replace(/\s+/g, " ").slice(0, 160) : null,
        });
    }
    return out;
});
console.log("=== E. BACK-FAMILY CRASH ===");
console.log(JSON.stringify(crash, null, 1));
console.log("=== ERRORS AFTER ===");
console.log(JSON.stringify(errs.slice(-8), null, 1));

await browser.close();
