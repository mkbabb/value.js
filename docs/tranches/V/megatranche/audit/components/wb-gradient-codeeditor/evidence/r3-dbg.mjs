import { webkit } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);
const head = page.locator(".interval-head").last();
console.log("counts", JSON.stringify({editors: await page.locator(EDITOR).count(), heads: await page.locator(".interval-head").count()}));
await head.scrollIntoViewIfNeeded();
await head.click();
await sleep(1200);
const dbg = await page.evaluate(() => {
    const panels=[...document.querySelectorAll('[id^="easing-interval-"]')]; const panel = panels.find(p=>getComputedStyle(p).display!=="none") ?? panels[0];
    const tiles = [...document.querySelectorAll("[data-specimen]")].filter(t=>t.getBoundingClientRect().width>0).slice(0, 6).map((t) => {
        const r = t.getBoundingClientRect();
        const cs = getComputedStyle(t);
        return { id: t.getAttribute("data-specimen"), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), vis: cs.visibility, disp: cs.display, op: cs.opacity };
    });
    return {
        headExpanded: [...document.querySelectorAll(".interval-head")].map(h=>h.getAttribute("aria-expanded")),
        panelDisplay: panel ? getComputedStyle(panel).display : null,
        panelRect: panel ? panel.getBoundingClientRect().toJSON() : null,
        tileCount: document.querySelectorAll("[data-specimen]").length,
        tiles,
    };
});
console.log(JSON.stringify(dbg, null, 1));
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r3-dbg-accordion.png" });
await browser.close();
