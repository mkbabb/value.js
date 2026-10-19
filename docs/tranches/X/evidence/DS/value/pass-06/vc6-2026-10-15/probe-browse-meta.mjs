#!/usr/bin/env node
// X-DS · value · pass 6 (VC6-01) — the Browse card meta row as served: card width, meta row
// width, each chip / +N / vote box, and whether anything clips. Real Chrome, new headless.
// usage: node probe-browse-meta.mjs [--base http://localhost:9000] [--tag before|after]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const TAG = opt("tag", "after");
const out = { base: BASE, tag: TAG, cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
        const page = await newPage(browser, width, theme);
        await routeBrowseFixture(page);
        await bootRoute(page, BASE + "/#/browse", { waitArticle: true });
        await page.waitForTimeout(1500);
        out.cells[`${width}-${theme}`] = await page.evaluate(() => [...document.querySelectorAll('[role="article"]')].map((card) => {
            const meta = card.querySelector(".palette-meta");
            const r = (el) => { const b = el.getBoundingClientRect(); return Math.round(b.width); };
            const vis = (el) => getComputedStyle(el).display !== "none" && el.getBoundingClientRect().width > 0;
            const chips = [...meta.querySelectorAll("[data-tag-chip]")].filter(vis).map((c) => ({ text: c.textContent, w: r(c) }));
            const more = meta.querySelector("[data-tag-more]");
            const moreText = more && vis(more) ? [...more.querySelectorAll(".palette-meta__band")].filter(vis).map((b) => b.textContent).join("") : null;
            const name = card.querySelector("[data-specimen-name], h3, .specimen-name");
            return {
                name: card.getAttribute("aria-label"),
                cardW: r(card), cardRem: +(card.getBoundingClientRect().width / 16).toFixed(2),
                metaW: r(meta), metaScrollW: meta.scrollWidth, clips: meta.scrollWidth > meta.clientWidth + 1,
                chips, more: moreText, moreW: more && vis(more) ? r(more) : 0,
                nameClipped: name ? name.scrollWidth > name.clientWidth + 1 : null,
            };
        }));
        await page.screenshot({ path: path.join(import.meta.dirname, `browse-cards-${TAG}-${width}-${theme}.png`) });
        await page.context().close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(import.meta.dirname, `probe-browse-meta-${TAG}.json`), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.cells["1440-light"]?.slice(0, 6)), "\n", JSON.stringify(out.cells["390-light"]?.slice(0, 6)));
