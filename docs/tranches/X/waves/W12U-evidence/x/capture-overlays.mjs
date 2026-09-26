// SERVED MODEL: claude-opus-5-5
// X.W12U.x · §2.3 — overlays and sub-states at phone widths (and landscape),
// headed Chromium on :9000, both themes, saved + remote palettes seeded, a
// logged-in slug. Each step opens one overlay, reads measure-x.js, closes it.
// A step that cannot be reached records {unreached: reason} — never a pass.
// Usage: node capture-overlays.mjs <out.json> <vpTags> [frames dir]
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { prepare, VIEWPORTS, isPhone } from "./seed-x.mjs";

const HERE = dirname(new URL(import.meta.url).pathname);
const BASE = process.env.BASE ?? "http://localhost:9000";
const MX = readFileSync(join(HERE, "measure-x.js"), "utf8");
const OUT = process.argv[2];
const TAGS = (process.argv[3] ?? "v360,v430,l844").split(",");
const FR = process.argv[4];
if (FR) mkdirSync(FR, { recursive: true });

async function settle(page) {
    await page.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await page.waitForTimeout(1200);
}
const mx = (page) => page.evaluate(() => window.__mx());
async function menuItem(page, cardIdx, item) {
    const trig = page.getByRole("button", { name: "Palette menu" }).nth(cardIdx);
    await trig.scrollIntoViewIfNeeded();
    await trig.click();
    await page.waitForTimeout(400);
    if (!item) return;
    await page.getByRole("menuitem", { name: item }).first().click();
    await page.waitForTimeout(700);
}

const STEPS = [
    { id: "palettes-card-menu", route: "/palettes", act: (p) => menuItem(p, 0, null) },
    { id: "palettes-delete-all", route: "/palettes", act: (p) => p.getByRole("button", { name: "Delete all saved palettes" }).click() },
    { id: "browse-card-menu", route: "/browse", act: (p) => menuItem(p, 0, null) },
    { id: "browse-tag-edit", route: "/browse", act: (p) => menuItem(p, 0, "Edit Tags") },
    { id: "browse-versions", route: "/browse", act: (p) => menuItem(p, 0, /Versions/) },
    { id: "browse-flag-report", route: "/browse", act: (p) => menuItem(p, 1, "Report") },
    { id: "dock-profile-menu", route: "/", act: (p) => p.getByRole("button", { name: "Menu" }).first().click() },
    { id: "dock-slug-edit", route: "/", act: async (p) => { await p.getByRole("button", { name: "Menu" }).first().click(); await p.waitForTimeout(300); await p.getByRole("menuitem", { name: /Switch account|Edit slug|Log ?in/ }).first().click(); } },
    { id: "migrate-dialog", route: "/", act: async (p) => { await p.getByRole("button", { name: "Menu" }).first().click(); await p.waitForTimeout(300); await p.getByRole("menuitem", { name: /Switch account|Edit slug|Log ?in/ }).first().click(); await p.waitForTimeout(500); await p.getByRole("button", { name: "Generate new slug" }).click(); } },
    { id: "dock-color-input", route: "/", act: (p) => p.getByRole("button", { name: "Open color input" }).first().click() },
];

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = [];
for (const tag of TAGS) {
    const [w, h] = VIEWPORTS[tag];
    for (const theme of ["light", "dark"]) {
        for (const plate of ["ok", "error", "slow"]) {
            const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: isPhone(tag), isMobile: isPhone(tag) });
            await prepare(ctx, { theme, palettes: true, user: true, browse: plate });
            await ctx.addInitScript(MX);
            const page = await ctx.newPage();
            if (plate !== "ok") {
                // the pane plates: browse's error (500) and loading (held) states
                try {
                    await page.goto(BASE + "/#/browse", { timeout: 60000 });
                    await settle(page);
                    const m = await mx(page);
                    res.push({ tag, theme, id: `browse-plate-${plate}`, m, text: (await page.locator("main").innerText().catch(() => "")).slice(0, 160) });
                    if (FR) await page.screenshot({ path: join(FR, `${tag}-${theme}-plate-${plate}.jpg`), type: "jpeg", quality: 50 });
                } catch (e) {
                    res.push({ tag, theme, id: `browse-plate-${plate}`, unreached: String(e.message).split("\n")[0].slice(0, 160) });
                }
                await ctx.close();
                continue;
            }
            for (const s of STEPS) {
                try {
                    await page.goto(BASE + "/#" + s.route, { timeout: 60000 });
                    await settle(page);
                    await s.act(page);
                    await page.waitForTimeout(600);
                    const m = await mx(page);
                    res.push({ tag, theme, id: s.id, m });
                    if (FR) await page.screenshot({ path: join(FR, `${tag}-${theme}-${s.id}.jpg`), type: "jpeg", quality: 50 });
                } catch (e) {
                    res.push({ tag, theme, id: s.id, unreached: String(e.message).split("\n")[0].slice(0, 160) });
                }
                await page.keyboard.press("Escape").catch(() => {});
                await page.keyboard.press("Escape").catch(() => {});
            }
            await ctx.close();
        }
    }
    writeFileSync(OUT, JSON.stringify(res, null, 1)); // incremental: a later crash keeps the finished viewports
    console.log(tag, "done");
}
await browser.close();
writeFileSync(OUT, JSON.stringify(res, null, 1));
