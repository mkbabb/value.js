// CHALLENGE-D pass 2 — probe 5: the self-colliding default name, the collision
// row's rendered anatomy, and the well's operable-target inventory.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D9.json", import.meta.url).pathname;
const FRAMES = new URL("./frames-D4/", import.meta.url).pathname;
mkdirSync(FRAMES, { recursive: true });

const FIVE = ["rgb(226 87 31)", "rgb(31 119 226)", "rgb(52 168 83)", "rgb(234 179 8)", "rgb(147 51 234)"];
const mk = (name, i) => ({ id: `local-${i}`, name, slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: [{ css: "rgb(10 10 10)", position: 0 }], createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z", isLocal: true });

const b = await webkit.launch();
const out = {};

// A — "Palette 2" + "Palette 3" already exist (the user deleted "Palette 1").
//     What does the field propose, and what happens on a bare Enter?
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(`localStorage.setItem("color-picker",JSON.stringify({inputColor:"rgb(226 87 31)",savedColors:${JSON.stringify(FIVE)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:${JSON.stringify([mk("Palette 2", 2), mk("Palette 3", 3)])}}))`);
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2200);
    const proposed = await page.evaluate(() => document.querySelector(".dashed-well input").placeholder);
    const existing = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map(p => p.name));
    // accept the proposal: click commit with the field left blank
    await page.locator(".dashed-well button").last().click();
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const dup = [...w.children].find(c => /already exists/.test(c.textContent));
        const cs = (el, p) => el ? getComputedStyle(el)[p] : null;
        const msg = dup && dup.querySelector("span");
        return {
            collisionShown: !!dup,
            text: dup ? dup.textContent.replace(/\s+/g, " ").trim() : null,
            role: dup ? dup.getAttribute("role") : null,
            ariaLive: dup ? dup.getAttribute("aria-live") : null,
            msgType: msg ? { family: cs(msg, "fontFamily").split(",")[0], size: cs(msg, "fontSize"), style: cs(msg, "fontStyle"), color: cs(msg, "color") } : null,
            rowRect: dup ? (r => ({ w: +r.width.toFixed(1), h: +r.height.toFixed(1) }))(dup.getBoundingClientRect()) : null,
            buttons: dup ? [...dup.querySelectorAll("button")].map(x => ({
                text: x.textContent.trim(),
                rect: (r => ({ w: +r.width.toFixed(1), h: +r.height.toFixed(1) }))(x.getBoundingClientRect()),
                authored: [...x.classList].filter(c => /^h-|^px-|^text-/.test(c)),
                fontSize: getComputedStyle(x).fontSize,
            })) : [],
            wellH: +document.querySelector(".dashed-well").getBoundingClientRect().height.toFixed(2),
            inputAria: (i => ({ invalid: i.getAttribute("aria-invalid"), describedby: i.getAttribute("aria-describedby"), labelledby: i.getAttribute("aria-labelledby"), id: i.id }))(document.querySelector(".dashed-well input")),
            hasLabelEl: !!document.querySelector(".dashed-well label"),
        };
    });
    await page.screenshot({ path: FRAMES + "p9-selfcollide.png" });
    out.selfCollide = { proposed, existing, after };
    await ctx.close();
}

// B — operable-target inventory in and around the well (44 px floor)
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(`localStorage.setItem("color-picker",JSON.stringify({inputColor:"rgb(226 87 31)",savedColors:${JSON.stringify(FIVE)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[]}))`);
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2200);
    await page.locator(".dashed-well .swatch-row [data-testid=watercolor-swatch]").first().hover({ force: true });
    await page.waitForTimeout(500);
    out.targets = await page.evaluate(() => {
        const els = [...document.querySelectorAll(".dashed-well button, body > .floating-panel button")];
        return els.map(e => {
            const r = e.getBoundingClientRect();
            return { name: e.getAttribute("aria-label") || e.textContent.trim() || "<nameless>",
                w: +r.width.toFixed(1), h: +r.height.toFixed(1), under44: r.width < 44 || r.height < 44,
                inViewport: r.top >= 0 && r.bottom <= innerHeight };
        });
    });
    await ctx.close();
}

await b.close();
writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
