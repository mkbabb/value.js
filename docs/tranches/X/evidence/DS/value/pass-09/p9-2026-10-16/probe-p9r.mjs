#!/usr/bin/env node
// X-DS · value · pass 9 (critic P9R, 2026-10-16) — AFTER cells for the critic's interaction frames,
// plus the measurements each cure is judged on. Real Chrome, new headless (§0ei); one browser per
// cell, closed in a finally.
//   browse-expanded-{1440,390}-{light,dark}: P9R-01 meta/detail geometry, P9R-03 strip block-size,
//     P9R-04 slug text/weight/border; crop exp-crop-<theme>.png around the expanded card.
//   gradient-rule-{light,dark}: P9R-02 the three section rules' computed border colour.
//   palettes-editor-{light,dark}: P9R-05 a click on the "Start a new palette" label adds a swatch.
//   extract-loaded-{1440,390}-{light,dark}: P9R-06 the zone badge's text.
// usage: node probe-p9r.mjs [--base http://localhost:9000] [only-prefix]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const ONLY = args.find((a) => !a.startsWith("--") && !a.startsWith("http")) ?? "";
const OUT = import.meta.dirname;

const expandCard = async (p) => {
    const card = p.getByRole("article").filter({ hasText: "Harbor at Dusk" }).first();
    await card.getByRole("button", { name: "Colors of Harbor at Dusk" }).click();
    await p.waitForTimeout(5000);
    const m = await card.evaluate((c) => {
        const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
        const meta = box(c.querySelector(".palette-meta"));
        const detail = box(c.querySelector(".palette-card__detail"));
        const strip = c.querySelector('[data-color-strip][data-orientation="horizontal"]');
        const slugRow = c.querySelector("[data-palette-swatches] > div");
        const slug = slugRow?.querySelector("span");
        const cs = slug ? getComputedStyle(slug) : null;
        const intersects = !!meta && !!detail && meta.x < detail.x + detail.w && detail.x < meta.x + meta.w && meta.y < detail.y + detail.h && detail.y < meta.y + meta.h;
        return {
            cardWidth: c.getBoundingClientRect().width, meta, detail, metaDetailIntersect: intersects,
            stripBlockSize: strip ? getComputedStyle(strip).blockSize : null,
            slugText: slug?.textContent?.trim() ?? null, slugWeight: cs?.fontWeight, slugBorder: cs?.borderTopWidth, slugColor: cs?.color,
            copyIsGlassButton: !!slugRow?.querySelector("button[aria-label^='Copy slug']")?.className.match(/glass|btn|button/i),
            slugRowRule: slugRow ? getComputedStyle(slugRow).borderTopColor : null,
        };
    });
    const r = await card.boundingBox();
    return { m, clip: r ? { x: Math.max(0, r.x - 8), y: Math.max(0, r.y - 8), width: r.width + 16, height: r.height + 16 } : null };
};

const upload = async (p) => {
    const [fc] = await Promise.all([p.waitForEvent("filechooser"), p.getByText("Upload image").first().click()]);
    await fc.setFiles(path.join(OUT, "test.png"));
    await p.waitForTimeout(6000);
    const badge = p.locator("[data-zone-affordance]").first();
    return { m: { badgeText: (await badge.textContent())?.trim() ?? null, badgeHasGlyph: (await badge.locator("svg").count()) > 0 } };
};

const scenes = [
    { name: "browse-expanded-1440", route: "/#/browse", width: 1440, browse: true, act: expandCard, crop: "exp-crop" },
    { name: "browse-expanded-390", route: "/#/browse", width: 390, browse: true, act: expandCard },
    { name: "gradient-rule", route: "/#/gradient", width: 1440, act: async (p) => ({ m: { rules: await p.locator("hr").evaluateAll((hs) => hs.map((h) => getComputedStyle(h).borderTopColor)) } }) },
    { name: "palettes-editor", route: "/#/palettes", width: 1440, act: async (p) => {
        const before = await p.locator(".current-palette-well button[aria-label^='Edit color'], .current-palette-well [data-swatch]").count();
        const wellEmpty = await p.locator(".current-palette-well[data-empty]").count();
        await p.getByText("Start a new palette").first().click();
        await p.waitForTimeout(1500);
        return { m: { wellEmptyBefore: wellEmpty > 0, wellEmptyAfter: (await p.locator(".current-palette-well[data-empty]").count()) > 0, label: (await p.locator(".current-palette-well [data-well-label-row]").first().textContent())?.trim(), swatchHostsBefore: before } };
    } },
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
        if (s.crop && r.clip) await page.screenshot({ path: path.join(OUT, `${s.crop}-${theme}.png`), clip: r.clip });
        results.push({ cell: `${s.name}-${theme}`, ok: true, ...r.m });
    } catch (e) {
        results.push({ cell: `${s.name}-${theme}`, ok: false, error: String(e).slice(0, 300) });
    } finally {
        try { await browser?.close(); } catch {}
    }
    console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(path.join(OUT, ONLY ? `probe-p9r-${ONLY}.json` : "probe-p9r.json"), JSON.stringify({ base: BASE, results }, null, 2) + "\n");
