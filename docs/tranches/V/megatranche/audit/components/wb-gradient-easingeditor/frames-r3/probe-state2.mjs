import { webkit } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });

const SNAP = () => {
    const rows = [...document.querySelectorAll(".interval-head")];
    return {
        rows: rows.length,
        heads: rows.map((h) => h.textContent.trim().replace(/\s+/g, " ")),
        expanded: rows.map((h) => h.getAttribute("aria-expanded")),
        openCount: rows.filter((h) => h.getAttribute("aria-expanded") === "true").length,
        visibleLiterals: [...document.querySelectorAll(".readout-rail code")].filter((c) => c.offsetParent !== null).map((c) => c.textContent),
        visibleRamps: [...document.querySelectorAll('[role="img"][aria-label^="Eased ramp"]')].filter((c) => c.offsetParent !== null).length,
        visibleStrips: [...document.querySelectorAll(".fading-scroll")].filter((c) => c.offsetParent !== null).length,
        sectionH: (() => { const h3=[...document.querySelectorAll("h3")].find(x=>x.textContent.trim()==="Easing"); return h3? +h3.nextElementSibling.getBoundingClientRect().height.toFixed(1):null; })(),
        tryAgain: /Try again/.test(document.body.textContent),
    };
};
const clipEasing = async (page) => {
    await page.evaluate(() => { const h3=[...document.querySelectorAll("h3")].find(x=>x.textContent.trim()==="Easing"); h3.scrollIntoView({block:"start",behavior:"instant"}); });
    await page.waitForTimeout(300);
    return page.evaluate(() => { const h3=[...document.querySelectorAll("h3")].find(x=>x.textContent.trim()==="Easing");
        const w=h3.nextElementSibling.getBoundingClientRect(), t=h3.getBoundingClientRect();
        return {x:Math.max(0,t.x-14),y:Math.max(0,t.y-10),width:w.width+28,height:Math.min(w.bottom-t.y+20,880)}; });
};

const run = async () => {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1512, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const pageErrors = [], consoleErrors = [];
    page.on("pageerror", e => pageErrors.push(String(e)));
    page.on("console", m => { if (m.type()==="error" && !/MISCONFIGURED/.test(m.text())) consoleErrors.push(m.text()); });
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
    await page.waitForSelector(".interval-head", { timeout: 20000 });
    await page.waitForTimeout(900);
    const R = {};

    const rail = await page.$(".gradient-rail"); const rb = await rail.boundingBox();
    for (const f of [0.25,0.5,0.75]) { await page.mouse.move(rb.x+rb.width*f, rb.y+rb.height/2); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(320); }
    // open the LAST row
    await page.evaluate(() => { const hs=document.querySelectorAll(".interval-head"); hs[hs.length-1].click(); });
    await page.waitForTimeout(400);
    R.before = await page.evaluate(SNAP);
    await page.screenshot({ path: `${OUT}/A-lastrow-open.png`, clip: await clipEasing(page) });

    // remove a MIDDLE stop with the keyboard: focus handle at 50%, press Delete
    await page.evaluate(() => {
        const h = [...document.querySelectorAll("[data-stop-id]")].find(x => /50%/.test(x.getAttribute("aria-label")||""));
        h.focus(); h.click();
    });
    await page.waitForTimeout(300);
    await page.keyboard.press("Delete");
    await page.waitForTimeout(600);
    R.afterRemoveMiddle = await page.evaluate(SNAP);
    await page.screenshot({ path: `${OUT}/B-after-remove.png`, clip: await clipEasing(page) });

    // press the head that WAS open (index 3 no longer exists) — what does the user see?
    R.headsNow = R.afterRemoveMiddle.heads;

    // ---- computed-style census for the radius / material register at N>1 ----
    R.register = await page.evaluate(() => {
        const g = (el) => { const c = getComputedStyle(el), r = el.getBoundingClientRect();
            return { cls: String(el.className).slice(0,60), w:+r.width.toFixed(1), h:+r.height.toFixed(1),
                radius: c.borderRadius, curvature: +(parseFloat(c.borderRadius)/Math.min(r.width,r.height)).toFixed(3),
                bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor }; };
        const rows = [...document.querySelectorAll(".interval-head")].map(h => h.parentElement);
        const open = rows.find(r => r.querySelector(".interval-head").getAttribute("aria-expanded")==="true");
        const closed = rows.find(r => r.querySelector(".interval-head").getAttribute("aria-expanded")==="false");
        return {
            openRow: open ? g(open) : null,
            closedRow: closed ? g(closed) : null,
            ramp: (()=>{const e=document.querySelector('[role="img"][aria-label^="Eased ramp"]'); return e?g(e):null;})(),
            rail: (()=>{const e=document.querySelector(".readout-rail"); return e?g(e):null;})(),
            railBtn: (()=>{const e=document.querySelector(".rail-btn"); return e?g(e):null;})(),
            dot: (()=>{const e=document.querySelector(".specimen-dot"); return e?g(e):null;})(),
            tile: (()=>{const e=document.querySelector(".specimen-tile"); return e?g(e):null;})(),
        };
    });

    fs.writeFileSync(`${OUT}/R.json`, JSON.stringify({...R,pageErrors,consoleErrors}, null, 2));
    console.log(JSON.stringify({...R,pageErrors,consoleErrors}, null, 2));
    await browser.close();
};
run();
