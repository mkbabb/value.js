#!/usr/bin/env node
// X-DS · value · pass 10 (critic V10, 2026-10-16) — AFTER cells for the critic's rule-tone and
// column-edge rows, plus the measurements each cure is judged on. Real Chrome, new headless (§0ei);
// one browser per cell, closed in a finally.
//   gradient-rule-{light,dark}: V10-01 the section rules (glass Separator) and the code paper edge.
//   atmosphere-rule / blob-rule-{light,dark}: V10-01 the Config footer rule (.config-action-bar).
//   mix-rule-{light,dark}: V10-01 Mix's footer rule.
//   browse-expanded-1440-{light,dark}: V10-01 the card's slug-row rule.
//   picker-1440-{light,dark}: the About card's glass Separators (the reference seam).
//   extract-loaded-{1440,390}-{light,dark}: V10-T1 the stat block's left edge vs the labels'.
// usage: node probe-v10.mjs [--base http://localhost:9000] [only-prefix]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const ONLY = args.find((a) => !a.startsWith("--") && !a.startsWith("http")) ?? "";
const OUT = import.meta.dirname;

const seams = (p) => p.locator('[data-slot="separator"]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().width > 0).map((e) => getComputedStyle(e).backgroundColor));
const borderTop = (sel) => async (p) => ({ m: { rules: await p.locator(sel).evaluateAll((els) => els.map((e) => getComputedStyle(e).borderTopColor)), seams: await seams(p) } });

const upload = async (p) => {
    const [fc] = await Promise.all([p.waitForEvent("filechooser"), p.getByText("Upload image").first().click()]);
    await fc.setFiles(path.join(OUT, "test.png"));
    await p.waitForTimeout(6000);
    const m = await p.evaluate(() => {
        const x = (el) => (el ? Math.round(el.getBoundingClientRect().x * 10) / 10 : null);
        const stat = [...document.querySelectorAll("span")].find((s) => s.textContent?.trim() === "% of the image")?.closest("div");
        const label = [...document.querySelectorAll("label")].find((l) => l.textContent?.trim() === "Colors");
        const chroma = [...document.querySelectorAll("label")].find((l) => l.textContent?.trim() === "Chroma weight");
        return { statX: x(stat), colorsLabelX: x(label), chromaLabelX: x(chroma), statPadLeft: stat ? getComputedStyle(stat).paddingLeft : null };
    });
    return { m };
};

const scenes = [
    { name: "gradient-rule", route: "/#/gradient", width: 1440, act: async (p) => ({ m: { seams: await seams(p), hr: await p.locator("hr").count(), codePaper: await p.locator('[aria-label="Gradient CSS"]').evaluate((e) => getComputedStyle(e).borderTopColor) } }) },
    { name: "atmosphere-rule", route: "/#/atmosphere", width: 1440, act: borderTop(".config-action-bar") },
    { name: "blob-rule", route: "/#/blob", width: 1440, act: borderTop(".config-action-bar") },
    { name: "mix-rule", route: "/#/mix", width: 1440, act: borderTop(".border-seam") },
    { name: "browse-expanded-1440", route: "/#/browse", width: 1440, browse: true, act: async (p) => {
        const card = p.getByRole("article").filter({ hasText: "Harbor at Dusk" }).first();
        await card.getByRole("button", { name: "Colors of Harbor at Dusk" }).click();
        await p.waitForTimeout(5000);
        return { m: { slugRowRule: await card.evaluate((c) => { const r = c.querySelector("[data-palette-swatches] > div"); return r ? getComputedStyle(r).borderTopColor : null; }) } };
    } },
    { name: "picker-1440", route: "/#/", width: 1440, act: async (p) => ({ m: { seams: await seams(p) } }) },
    { name: "extract-loaded-1440", route: "/#/extract", width: 1440, act: upload },
    { name: "extract-loaded-390", route: "/#/extract", width: 390, act: upload },
];

const results = [];
for (const s of scenes) for (const theme of ["light", "dark"]) {
    if (ONLY && !s.name.startsWith(ONLY)) continue;
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
        const page = await newPage(browser, s.width, theme);
        if (s.browse) await routeBrowseFixture(page);
        await bootRoute(page, BASE + s.route, { waitArticle: !!s.browse });
        const r = (await s.act(page)) ?? {};
        await page.screenshot({ path: path.join(OUT, `${s.name}-${theme}.png`) });
        results.push({ cell: `${s.name}-${theme}`, ok: true, ...r.m });
    } catch (e) {
        results.push({ cell: `${s.name}-${theme}`, ok: false, error: String(e).slice(0, 300) });
    } finally {
        try { await browser?.close(); } catch {}
    }
    console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(path.join(OUT, ONLY ? `probe-v10-${ONLY}.json` : "probe-v10.json"), JSON.stringify({ base: BASE, results }, null, 2) + "\n");
