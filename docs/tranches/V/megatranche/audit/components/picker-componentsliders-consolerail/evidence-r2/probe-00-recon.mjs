// CHALLENGE-D r2 · recon probe — find the ConsoleRail in the live app and
// dump its geometry + computed styles. Read-only; no source edits.
// Run: node docs/.../evidence-r2/probe-00-recon.mjs
import { webkit } from "playwright";

const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2000);

const out = await page.evaluate(() => {
    const rail = document.querySelector(".channel-rail");
    if (!rail) return { found: false, html: document.body.innerHTML.slice(0, 600) };
    const items = [...rail.querySelectorAll(".channel-rail-item")];
    const r = rail.getBoundingClientRect();
    const cs = getComputedStyle(rail);
    return {
        found: true,
        route: location.hash,
        rail: {
            box: { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
            border: cs.border, borderColor: cs.borderColor, borderRadius: cs.borderRadius,
            padding: cs.padding, restInk: cs.getPropertyValue("--console-rest-ink"),
            role: rail.getAttribute("role"), ariaOrientation: rail.getAttribute("aria-orientation"),
        },
        items: items.map((el) => {
            const b = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            const glyph = el.querySelector(".rail-glyph");
            const gb = glyph?.getBoundingClientRect();
            const gs = glyph ? getComputedStyle(glyph) : null;
            const seat = el.querySelector(".rail-dot-seat");
            const sb = seat?.getBoundingClientRect();
            const dot = el.querySelector(".rail-dot");
            const db = dot?.getBoundingClientRect();
            return {
                label: el.getAttribute("aria-label"),
                text: el.textContent.trim(),
                selected: el.getAttribute("aria-selected"),
                tabindex: el.getAttribute("tabindex"),
                box: { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) },
                color: s.color, bg: s.backgroundColor, padding: s.padding, fontSize: s.fontSize,
                fontFamily: s.fontFamily.slice(0, 60), fontStyle: s.fontStyle, lineHeight: s.lineHeight,
                minHeight: s.minHeight, minWidth: s.minWidth,
                glyph: gb ? { w: +gb.width.toFixed(2), h: +gb.height.toFixed(2), fam: gs.fontFamily.slice(0, 40), style: gs.fontStyle, size: gs.fontSize } : null,
                seat: sb ? { x: +sb.x.toFixed(2), y: +sb.y.toFixed(2), w: +sb.width.toFixed(2), h: +sb.height.toFixed(2) } : null,
                dot: db ? { w: +db.width.toFixed(2), h: +db.height.toFixed(2), bg: getComputedStyle(dot).backgroundColor, cls: dot.className } : null,
            };
        }),
        console: (() => {
            const c = document.querySelector(".sliders-console");
            if (!c) return null;
            const b = c.getBoundingClientRect();
            const s = getComputedStyle(c);
            return { box: { w: +b.width.toFixed(2), h: +b.height.toFixed(2) }, padding: s.padding, gap: getComputedStyle(c.firstElementChild).columnGap };
        })(),
        rows: [...document.querySelectorAll(".channel-strip")].map((el) => {
            const b = el.getBoundingClientRect();
            return { y: +b.y.toFixed(2), h: +b.height.toFixed(2) };
        }),
    };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
