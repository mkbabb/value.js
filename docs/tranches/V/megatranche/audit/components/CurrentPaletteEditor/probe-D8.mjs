// CHALLENGE-D pass 2 — probe 4: the ONE reachable list mutation (save →
// clearCurrent → apply([])). Where do the leaving swatches go, and what does
// the well's geometry do? Read-only; localStorage seeded only.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D8.json", import.meta.url).pathname;
const FRAMES = new URL("./frames-D4/", import.meta.url).pathname;
mkdirSync(FRAMES, { recursive: true });

const FIVE = ["rgb(226 87 31)", "rgb(31 119 226)", "rgb(52 168 83)", "rgb(234 179 8)", "rgb(147 51 234)"];
const seed = `localStorage.setItem("color-picker", JSON.stringify({inputColor:"rgb(226 87 31)",savedColors:${JSON.stringify(FIVE)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[]}))`;

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(seed);
await page.goto(ORIGIN + "/#/palettes");
await page.waitForSelector(".dashed-well");
await page.waitForTimeout(2200);

const snap = async (tag) => {
    const m = await page.evaluate(() => {
        const well = document.querySelector(".dashed-well");
        const row = well && well.querySelector(".swatch-row");
        const card = well && well.closest("[class*=glass-], .card");
        const leaving = [...document.querySelectorAll(".vj-enter-leave-active")].map(e => {
            const r = e.getBoundingClientRect();
            return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                position: getComputedStyle(e).position,
                offsetParent: e.offsetParent ? e.offsetParent.tagName + "." + e.offsetParent.className.toString().slice(0, 46) : null };
        });
        return {
            wellH: well ? +well.getBoundingClientRect().height.toFixed(2) : null,
            wellY: well ? +well.getBoundingClientRect().y.toFixed(2) : null,
            rowRect: row ? (r => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }))(row.getBoundingClientRect()) : null,
            rowPosition: row ? getComputedStyle(row).position : null,
            rowOffsetParent: row && row.offsetParent ? row.offsetParent.tagName + "." + row.offsetParent.className.toString().slice(0, 46) : null,
            cardRect: card ? (r => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1) }))(card.getBoundingClientRect()) : null,
            dots: document.querySelectorAll(".dashed-well [data-testid=watercolor-swatch]").length,
            leavingCount: leaving.length, leaving,
            wellText: well ? well.textContent.replace(/\s+/g, " ").trim().slice(0, 90) : null,
            liveRegionText: [...document.querySelectorAll("[role=alert],[role=status],[aria-live=polite],[aria-live=assertive]")]
                .map(e => (e.getAttribute("role") || e.getAttribute("aria-live")) + ":" + e.textContent.trim().slice(0, 40)),
            cardsBelow: document.querySelectorAll("article, [class*=palette-card]").length,
        };
    });
    return { tag, ...m };
};

const frames = [];
frames.push(await snap("t0-before-save"));
await page.locator(".dashed-well input").first().fill("Zebra Sunset");
frames.push(await snap("t1-named"));

// click the commit control and sample the transition window
const btn = page.locator(".dashed-well button").last();
await btn.click();
for (const dt of [40, 90, 160, 260, 420, 700, 1200]) {
    await page.waitForTimeout(dt === 40 ? 40 : 0);
    if (dt !== 40) await page.waitForTimeout(0);
    frames.push(await snap("t2+" + dt + "ms"));
    if (dt === 40) await page.waitForTimeout(50);
    else await page.waitForTimeout(dt / 2);
}
await page.screenshot({ path: FRAMES + "p8-after-save.png" });
frames.push(await snap("t3-settled"));

const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map(p => ({ name: p.name, n: p.colors.length })));

// second run: sample tightly right after the click to catch the leave frame
const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();
await p2.addInitScript(seed);
await p2.goto(ORIGIN + "/#/palettes");
await p2.waitForSelector(".dashed-well");
await p2.waitForTimeout(2200);
await p2.locator(".dashed-well input").first().fill("Zebra Sunset");
const tight = [];
await p2.evaluate(() => {
    window.__samples = [];
    const tick = () => {
        const leaving = [...document.querySelectorAll(".vj-enter-leave-active")];
        if (leaving.length) {
            window.__samples.push({
                t: +performance.now().toFixed(0), n: leaving.length,
                rects: leaving.map(e => { const r = e.getBoundingClientRect(); return [+r.x.toFixed(0), +r.y.toFixed(0)]; }),
                position: getComputedStyle(leaving[0]).position,
                offsetParent: leaving[0].offsetParent ? leaving[0].offsetParent.className.toString().slice(0, 50) : null,
            });
        }
        if (window.__samples.length < 40) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
});
await p2.locator(".dashed-well button").last().click();
await p2.waitForTimeout(900);
tight.push(...(await p2.evaluate(() => window.__samples)));
await ctx2.close();

await ctx.close();
await b.close();
writeFileSync(OUT, JSON.stringify({ frames, stored, tightSamples: tight }, null, 2));
console.log(JSON.stringify({ frames: frames.map(f => ({ tag: f.tag, wellH: f.wellH, dots: f.dots, leaving: f.leavingCount, live: f.liveRegionText, text: f.wellText })), stored, tight: tight.slice(0, 12) }, null, 2));
