// CHALLENGE-D pass 5 · BrowsePane — geometry + containment + focus completion.
// READ-ONLY (non-GET aborted). Stub-fulfilled wall on localhost:9000.
//
// NOTE ON STUB HONESTY: demo/palettes/types.ts:38 names the vote field
// `voteCount`, NOT `votes`. An earlier stub set `votes`, so the frames from
// p5-D-modality.mjs render "0" on every heart. That is the STUB's bug, not the
// app's; it is named in the report and no finding rests on it. This probe sets
// `voteCount` correctly.

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const API = "http://localhost:3000";
const OUT = new URL("../evidence/", import.meta.url).pathname;

const mk = (slug, name, cssList, tags = ["warm"]) => ({
    slug, name, userSlug: "user-1",
    colors: cssList.map((css) => ({ css })),
    oklabColors: cssList.map(() => ({ L: 0.6, a: 0.05, b: 0.09 })),
    tags, voteCount: 14, voted: false, forkCount: 1,
    visibility: "public", tier: "published", currentHash: "abc123",
});
const WALL = [
    mk("sunset-commons", "Sunset Commons", ["#e5533d", "#f2a65a", "#f7d6a0", "#8c5f4d", "#3b2c2a"]),
    mk("cold-open", "Cold Open", ["#22333b", "#5e7d7e"], ["cool"]),
    mk("long-name", "A Very Long Palette Name That Wraps Twice", ["#123", "#456", "#789"]),
];

async function stub(ctx) {
    await ctx.route(`${API}/**`, async (route) => {
        const u = route.request().url();
        if (route.request().method() !== "GET") return route.abort();
        if (u.includes("/tags")) return route.fulfill({ json: [{ name: "warm", count: 3 }] });
        if (u.includes("/palettes")) return route.fulfill({ json: { data: WALL, nextCursor: "C2", hasMore: true } });
        return route.fulfill({ status: 200, json: {} });
    });
}

const browser = await chromium.launch();
const out = {};

// ── A · containment + shadow clipping + baseline alignment (desktop 1440) ────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await stub(ctx);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForSelector('[role="article"]', { timeout: 15000 });
    await page.waitForTimeout(2200);

    out.geometry = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        const card = document.querySelector('[role="article"]');
        const gs = getComputedStyle(grid);
        const cs = getComputedStyle(card);
        const gr = grid.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        // the metadata row: name span vs the chips beside it
        const name = card.querySelector(".font-display");
        const row = name?.parentElement?.parentElement;
        const kids = row ? [...row.querySelectorAll("span,button,div")].slice(0, 8) : [];
        return {
            gridContain: gs.contain,
            gridOverflow: `${gs.overflowX}/${gs.overflowY}`,
            gridRect: { x: +gr.x.toFixed(1), w: +gr.width.toFixed(1) },
            cardRect: { x: +cr.x.toFixed(1), w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) },
            cardBoxShadow: cs.boxShadow,
            cardBorderRadius: cs.borderRadius,
            cardOverflow: `${cs.overflowX}/${cs.overflowY}`,
            // horizontal slack between the card box and the paint-clip boundary
            slackLeft: +(cr.x - gr.x).toFixed(2),
            slackRight: +((gr.x + gr.width) - (cr.x + cr.width)).toFixed(2),
            strip: (() => {
                const s = card.querySelector('[role="presentation"]');
                const ss = getComputedStyle(s);
                return {
                    borderRadius: ss.borderRadius,
                    overflow: ss.overflowX,
                    h: +s.getBoundingClientRect().height.toFixed(1),
                    segCount: s.children.length,
                };
            })(),
            metaRowAlign: row ? getComputedStyle(row).alignItems : null,
            metaChildren: kids.map((el) => {
                const r = el.getBoundingClientRect();
                const st = getComputedStyle(el);
                return {
                    txt: (el.textContent || "").trim().slice(0, 18),
                    fontSize: st.fontSize,
                    lineHeight: st.lineHeight,
                    top: +r.top.toFixed(1),
                    bottom: +r.bottom.toFixed(1),
                };
            }),
        };
    });

    // NOMENCLATURE: every noun the pane uses for the same object
    out.lexicon = await page.evaluate(() => {
        const pane = document.querySelector(".pane-header")?.closest("div[class*='pane'],*")
            ?? document.body;
        const t = document.body.innerText;
        const terms = ["community", "commons", "the wall", "My Palettes", "published palettes"];
        return Object.fromEntries(terms.map((k) => [k, (t.match(new RegExp(k, "gi")) || []).length]));
    });
    await ctx.close();
}

// ── B · load-more focus, completed: does the trigger come back? ─────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await stub(ctx);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForSelector('[role="article"]', { timeout: 15000 });
    await page.waitForTimeout(2200);

    const btn = page.getByRole("button", { name: /More from the commons/i });
    await btn.focus();
    const snap = async () => page.evaluate(() => ({
        active: document.activeElement?.tagName,
        activeName: (document.activeElement?.textContent || "").trim().slice(0, 34),
        isBody: document.activeElement === document.body,
        cards: document.querySelectorAll('[role="article"]').length,
        trigger: [...document.querySelectorAll("button")]
            .filter((b) => /More from the commons/i.test(b.textContent || "")).length,
        loadingBlock: document.querySelectorAll('[aria-label="Loading more palettes"]').length,
        statusRegions: document.querySelectorAll('[role="status"],[aria-live]').length,
    }));
    const before = await snap();
    await page.keyboard.press("Enter");
    const frames = [];
    for (const t of [30, 60, 120, 300, 900, 2500]) {
        await page.waitForTimeout(frames.length ? t - frames.at(-1).t : t);
        frames.push({ t, ...(await snap()) });
    }
    out.loadMore = { before, frames };
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}D-p5-geometry.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
