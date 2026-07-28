import { webkit } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const SNAP = () => {
    const rows = [...document.querySelectorAll(".interval-head")].map((h) => {
        const row = h.parentElement;
        const cs = getComputedStyle(row);
        const r = row.getBoundingClientRect();
        const hr = h.getBoundingClientRect();
        const p = h.querySelector(".head-glyph path");
        const nameSpan = [...h.querySelectorAll("span")].pop();
        return {
            head: h.textContent.trim().replace(/\s+/g, " "),
            expanded: h.getAttribute("aria-expanded"),
            ink: row.style.getPropertyValue("--motion-accent") || null,
            glyphStroke: p ? getComputedStyle(p).stroke : null,
            rowRect: [+r.x.toFixed(1), +r.y.toFixed(1), +r.width.toFixed(1), +r.height.toFixed(1)],
            headRect: [+hr.x.toFixed(1), +hr.y.toFixed(1), +hr.width.toFixed(1), +hr.height.toFixed(1)],
            insetTop: +(hr.y - r.y).toFixed(2),
            insetBottom: +(r.bottom - hr.bottom).toFixed(2),
            insetLeft: +(hr.x - r.x).toFixed(2),
            insetRight: +(r.right - hr.right).toFixed(2),
            name: nameSpan ? nameSpan.textContent : null,
            nameTrunc: nameSpan ? nameSpan.scrollWidth > nameSpan.clientWidth : null,
        };
    });
    const focusables = [...document.querySelectorAll(
        'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])',
    )].filter((e) => e.offsetParent !== null);
    const h3 = [...document.querySelectorAll("h3")].find((x) => x.textContent.trim() === "Easing");
    const wrap = h3 ? h3.nextElementSibling : null;
    const wr = wrap ? wrap.getBoundingClientRect() : null;
    return {
        rows: rows.length,
        rowsDetail: rows,
        distinctInks: [...new Set(rows.map((r) => r.ink))].length,
        codes: [...document.querySelectorAll(".readout-rail code")].map((c) => c.textContent),
        specimenTiles: document.querySelectorAll(".specimen-tile").length,
        svgPlots: document.querySelectorAll("svg[role='group']").length,
        fadingScrolls: document.querySelectorAll(".fading-scroll").length,
        allElements: document.querySelectorAll("*").length,
        routeFocusables: focusables.length,
        openRows: rows.filter((r) => r.expanded === "true").length,
        easingSectionRect: wr ? [+wr.x.toFixed(1), +wr.y.toFixed(1), +wr.width.toFixed(1), +wr.height.toFixed(1)] : null,
        tuneButtons: [...document.querySelectorAll('button[aria-label="Author a custom curve"]')].length,
        tryAgain: !!document.body.textContent.match(/Try again/),
    };
};

const run = async () => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const pageErrors = [], consoleErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });

    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
    await page.waitForSelector(".interval-head", { timeout: 20000 });
    await page.waitForTimeout(1000);

    const R = {};
    R.n1 = await page.evaluate(SNAP);

    // Add 3 stops on the gradient rail (click, no drag).
    const rail = await page.$(".gradient-rail");
    const rb = await rail.boundingBox();
    for (const frac of [0.25, 0.5, 0.75]) {
        await page.mouse.move(rb.x + rb.width * frac, rb.y + rb.height / 2);
        await page.mouse.down();
        await page.mouse.up();
        await page.waitForTimeout(350);
    }
    R.n4 = await page.evaluate(SNAP);
    await page.screenshot({ path: `${OUT}/n4-full.png`, fullPage: false });

    // Scroll the easing section into view and clip it.
    const sect = R.n4.easingSectionRect;
    if (sect) {
        await page.evaluate(() => {
            const h3 = [...document.querySelectorAll("h3")].find((x) => x.textContent.trim() === "Easing");
            h3.scrollIntoView({ block: "start", behavior: "instant" });
        });
        await page.waitForTimeout(400);
        const box = await page.evaluate(() => {
            const h3 = [...document.querySelectorAll("h3")].find((x) => x.textContent.trim() === "Easing");
            const w = h3.nextElementSibling.getBoundingClientRect();
            const t = h3.getBoundingClientRect();
            return { x: t.x - 14, y: t.y - 10, width: w.width + 28, height: w.bottom - t.y + 20 };
        });
        await page.screenshot({ path: `${OUT}/n4-easing.png`, clip: box });
    }

    // ---- FOCUS PAINT on a COLLAPSED row (live, not synthetic) ----
    // rows 1..3 are collapsed (row 0 open by default).
    const heads = await page.$$(".interval-head");
    const collapsedIdx = 2;
    const cBox = await heads[collapsedIdx].boundingBox();
    const clip = { x: cBox.x - 12, y: cBox.y - 12, width: cBox.width + 24, height: cBox.height + 24 };
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/focus-collapsed-BEFORE.png`, clip });
    await page.evaluate((i) => document.querySelectorAll(".interval-head")[i].focus(), collapsedIdx);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/focus-collapsed-AFTER.png`, clip });
    R.collapsedFocus = await page.evaluate((i) => {
        const h = document.querySelectorAll(".interval-head")[i];
        const cs = getComputedStyle(h);
        const row = h.parentElement;
        const rcs = getComputedStyle(row);
        const hr = h.getBoundingClientRect(), rr = row.getBoundingClientRect();
        return {
            isFocused: document.activeElement === h,
            matchesFocusVisible: h.matches(":focus-visible"),
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
            boxShadow: cs.boxShadow,
            rowOverflow: rcs.overflow,
            insets: {
                t: +(hr.y - rr.y).toFixed(2), b: +(rr.bottom - hr.bottom).toFixed(2),
                l: +(hr.x - rr.x).toFixed(2), r: +(rr.right - hr.right).toFixed(2),
            },
            rowH: +rr.height.toFixed(2), headH: +hr.height.toFixed(2),
        };
    }, collapsedIdx);

    // Also the OPEN row for comparison
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    const oBox = await heads[0].boundingBox();
    const oclip = { x: oBox.x - 12, y: oBox.y - 12, width: oBox.width + 24, height: oBox.height + 24 };
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/focus-open-BEFORE.png`, clip: oclip });
    await page.evaluate(() => document.querySelectorAll(".interval-head")[0].focus());
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/focus-open-AFTER.png`, clip: oclip });

    fs.writeFileSync(`${OUT}/R.json`, JSON.stringify({ ...R, pageErrors, consoleErrors }, null, 2));
    console.log(JSON.stringify({ n1: { rows: R.n1.rows, tiles: R.n1.specimenTiles, els: R.n1.allElements, foc: R.n1.routeFocusables, svg: R.n1.svgPlots, sect: R.n1.easingSectionRect },
        n4: { rows: R.n4.rows, tiles: R.n4.specimenTiles, els: R.n4.allElements, foc: R.n4.routeFocusables, svg: R.n4.svgPlots, sect: R.n4.easingSectionRect, inks: R.n4.distinctInks, codes: R.n4.codes, open: R.n4.openRows },
        rowsDetail: R.n4.rowsDetail, collapsedFocus: R.collapsedFocus, pageErrors, consoleErrors }, null, 2));
    await browser.close();
};
run();
