import { webkit } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });

const run = async () => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
    await page.waitForSelector(".interval-head", { timeout: 20000 });
    await page.waitForTimeout(1000);
    const rail = await page.$(".gradient-rail"); const rb = await rail.boundingBox();
    for (const f of [0.25, 0.5, 0.75]) { await page.mouse.move(rb.x + rb.width * f, rb.y + rb.height / 2); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(300); }

    const R = await page.evaluate(() => {
        const rows = [...document.querySelectorAll(".interval-head")].map(h => h.parentElement);
        const r = (e) => { const b = e.getBoundingClientRect(); return { y: +b.y.toFixed(2), b: +b.bottom.toFixed(2), h: +b.height.toFixed(2), w: +b.width.toFixed(2), x: +b.x.toFixed(2), right: +b.right.toFixed(2) }; };
        const interRowGaps = [];
        for (let i = 1; i < rows.length; i++) interRowGaps.push(+(rows[i].getBoundingClientRect().y - rows[i - 1].getBoundingClientRect().bottom).toFixed(2));
        const open = rows.find(x => x.querySelector(".interval-head").getAttribute("aria-expanded") === "true");
        const panel = open.querySelector('[id^="easing-interval-"]');
        const kids = [...panel.children].map(k => ({ cls: String(k.className).slice(0, 40), ...r(k) }));
        const intraGaps = [];
        for (let i = 1; i < kids.length; i++) intraGaps.push(+(kids[i].y - kids[i - 1].b).toFixed(2));
        const cs = getComputedStyle(panel);
        const head = open.querySelector(".interval-head");
        const hcs = getComputedStyle(head);
        // head content occupancy
        const spans = [...head.querySelectorAll("span")];
        const nameSpan = spans[spans.length - 1];
        const nameRange = document.createRange(); nameRange.selectNodeContents(nameSpan);
        const textW = +nameRange.getBoundingClientRect().width.toFixed(2);
        return {
            interRowGaps,
            panelGap: cs.rowGap, panelPad: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
            headPad: `${hcs.paddingTop} ${hcs.paddingRight} ${hcs.paddingBottom} ${hcs.paddingLeft}`,
            headGap: hcs.columnGap,
            panelChildren: kids, intraGaps,
            openRow: r(open), closedRow: r(rows[1]),
            curvatureOpen: +(16 / Math.min(r(open).w, r(open).h)).toFixed(3),
            curvatureClosed: +(16 / Math.min(r(rows[1]).w, r(rows[1]).h)).toFixed(3),
            nameSpanW: +nameSpan.getBoundingClientRect().width.toFixed(2),
            nameTextW: textW,
            nameSlackPx: +(nameSpan.getBoundingClientRect().width - textW).toFixed(2),
            headW: +head.getBoundingClientRect().width.toFixed(2),
            headSlackPct: +(100 * (nameSpan.getBoundingClientRect().width - textW) / head.getBoundingClientRect().width).toFixed(1),
            // states never expressed
            hasDisabled: document.querySelectorAll(".interval-head[disabled], .rail-btn[disabled]").length,
            ariaBusy: document.querySelectorAll("[aria-busy]").length,
            liveRegions: document.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
        };
    });
    fs.writeFileSync(`${OUT}/R.json`, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
};
run();
