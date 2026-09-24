// SERVED MODEL: claude-opus-5-5
// X-W12 Repair 1 (M-2): the two unbanked addendum reads, on the served page.
//   (a) §0cq OA-57 — value.js's collapsed dock at 390 (and 1440), light + dark:
//       engage the dock, leave it, wait past Dock.vue's 5 s collapse delay,
//       read the plate and its ancestor chain for a consumer clip; frame it.
//   (b) §0ct OA-68 — every side or canvas dock: census every `.dock-plate` on
//       every route, both themes, with its orientation and box; a vertical
//       (side) plate is framed and its ancestor chain read for a clip or a
//       missing gutter.
// Usage: BASE=http://localhost:8614 OUT=<dir> node dock-reads.mjs
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT ?? ".";
mkdirSync(OUT, { recursive: true });
const ROUTES = ["/", "/palettes", "/browse", "/gradient", "/mix", "/extract", "/generate", "/atmosphere", "/blob"];
const THEMES = ["light", "dark"];
const rows = [];

const browser = await chromium.launch({ headless: false });

async function open(vp, theme, route) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: theme });
    const page = await ctx.newPage();
    await page.addInitScript((t) => localStorage.setItem("vueuse-color-scheme", t), theme);
    await page.goto(`${BASE}/#${route}`);
    await page.locator(".dock-plate").first().waitFor({ state: "visible", timeout: 30000 });
    await page.waitForTimeout(1500);
    return { ctx, page };
}

function readPlates() {
    const clipOf = (el) => {
        const chain = [];
        for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
            const s = getComputedStyle(n);
            if (s.overflowX !== "visible" || s.overflowY !== "visible" || s.clipPath !== "none" || s.contain.includes("paint"))
                chain.push(`${n.tagName.toLowerCase()}.${[...n.classList].slice(0, 3).join(".")}[${s.overflowX}/${s.overflowY}${s.clipPath !== "none" ? " clip-path" : ""}${s.contain.includes("paint") ? " contain:paint" : ""}]`);
        }
        return chain;
    };
    return [...document.querySelectorAll(".dock-plate")].map((p) => {
        const r = p.getBoundingClientRect();
        const s = getComputedStyle(p);
        const host = p.closest("[data-orientation]");
        return {
            orientation: p.getAttribute("data-orientation") ?? host?.getAttribute("data-orientation") ?? "horizontal",
            w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1),
            radius: s.borderTopLeftRadius,
            consumerClipAncestors: clipOf(p),
        };
    });
}

// (b) census — every route, both themes, 1440 + 390
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    for (const theme of THEMES) {
        for (const route of ROUTES) {
            const { ctx, page } = await open(vp, theme, route);
            const plates = await page.evaluate(readPlates);
            rows.push({ read: "0ct-census", vp: vp.width, theme, route, plates });
            for (const [i, p] of plates.entries()) {
                if (p.orientation === "vertical")
                    await page.screenshot({ path: `${OUT}/side-${vp.width}-${theme}-${route.replace(/\W/g, "") || "home"}-${i}.png` });
            }
            await ctx.close();
        }
    }
}

// (a) collapsed dock — 390 (the unbanked leg) and 1440, both themes
for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    for (const theme of THEMES) {
        const { ctx, page } = await open(vp, theme, "/");
        const plate = page.locator(".dock-plate").first();
        const pb = await plate.boundingBox();
        if (pb) await page.mouse.move(pb.x + pb.width / 2, pb.y + pb.height / 2, { steps: 4 });
        await page.waitForTimeout(800);
        await page.mouse.move(vp.width / 2, vp.height - 4);
        await page.waitForTimeout(7000);
        const [p] = await page.evaluate(readPlates);
        const b = await plate.boundingBox();
        await page.screenshot({
            path: `${OUT}/collapsed-${vp.width}-${theme}.png`,
            clip: b ? { x: Math.max(0, b.x - 24), y: Math.max(0, b.y - 24), width: b.width + 48, height: b.height + 48 } : undefined,
        });
        rows.push({ read: "0cq-collapsed", vp: vp.width, theme, route: "/", plate: p, square: p ? Math.abs(p.w - p.h) <= 1 : null });
        await ctx.close();
    }
}

await browser.close();
writeFileSync(`${OUT}/dock-reads.json`, JSON.stringify(rows, null, 1));
const census = rows.filter((r) => r.read === "0ct-census");
const side = census.flatMap((r) => r.plates.filter((p) => p.orientation === "vertical").map((p) => ({ ...p, route: r.route, vp: r.vp, theme: r.theme })));
const clips = rows.flatMap((r) => (r.plates ?? [r.plate]).filter(Boolean).filter((p) => p.consumerClipAncestors.length));
console.log(`census legs=${census.length} plates=${census.reduce((n, r) => n + r.plates.length, 0)} vertical=${side.length} withAncestorClip=${clips.length}`);
for (const r of rows.filter((x) => x.read === "0cq-collapsed"))
    console.log(`collapsed ${r.vp} ${r.theme}: ${r.plate?.w}x${r.plate?.h} radius=${r.plate?.radius} square=${r.square} ancestorClip=${JSON.stringify(r.plate?.consumerClipAncestors)}`);
