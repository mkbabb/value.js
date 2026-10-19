// SERVED MODEL: claude-opus-5-5 · SS-8 B15 recon: live structure of /#/palettes, seeded populated.
import { chromium } from "playwright";
import { open, hue } from "./b15-seed.mjs";
const b = await chromium.launch();
try {
    const { ctx, p, errors } = await open(b, { current: hue(5, 10) });
    const r = await p.evaluate(() => {
        const q = (s) => document.querySelectorAll(s).length;
        const well = document.querySelector(".dashed-well");
        const art = document.querySelector("[data-palette-id], article, [role=article]");
        return { well: well?.getBoundingClientRect().toJSON(), wellText: well?.innerText.slice(0, 120),
            swatchButtons: well?.querySelectorAll("button").length, sliders: q("[role=slider]"),
            articles: q("article, [role=article]"), firstArticle: art?.outerHTML.slice(0, 600),
            presentation: q("[role=presentation]"), paneScrollFade: q(".pane-scroll-fade"),
            addSlot: document.querySelector(".add-slot-ghost")?.outerHTML.slice(0, 700), h1: document.querySelector("h1")?.innerText };
    });
    console.log(JSON.stringify({ ...r, errors }, null, 1));
    await ctx.close();
} finally { await b.close(); }
