// UI-AUDIT seat `mix-view` (COHESION §0bl) — read-only capture.
// Headed Chromium on the real GPU; the served dev page :9000; never starts/stops a server.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const onlyList = process.argv[2]?.split(",");
const only = process.env.RUN ?? (onlyList ? "sel" : undefined);
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();

const now = "2026-09-20T12:00:00.000Z";
const P = (id, name, colors) => ({ id, name, slug: name.toLowerCase().replace(/\s+/g, "-"),
    colors: colors.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now,
    isLocal: true, visibility: "private", tags: [] });
const PALETTES = [
    P("p-1", "Sunset Coast", ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"]),
    P("p-2", "Forest Floor", ["#2d4a22", "#5b7c3a", "#a3b18a", "#dad7cd"]),
    P("p-3", "Neon Arcade", ["oklch(0.7 0.3 330)", "oklch(0.8 0.2 190)", "oklch(0.9 0.2 110)", "#111", "#fff", "#7f5af0"]),
];
const seed = ({ palettes = PALETTES, theme }) => `(() => { try {
    if (sessionStorage.getItem('__audit_seeded')) return; sessionStorage.setItem('__audit_seeded','1');
    localStorage.clear();
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)});
    localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify({ version: 1, palettes }))});
    localStorage.setItem('color-picker', ${JSON.stringify(JSON.stringify({ inputColor: "oklch(0.62 0.19 25)", savedColors: [] }))});
} catch (e) {} })();`;

async function metrics(page) {
    return page.evaluate(() => {
        const pane = [...document.querySelectorAll(".pane-scroll-fade")].find((e) => e.textContent.includes("Mix colors and palettes"));
        if (!pane) return { pane: null };
        const pick = (sel, n = 3) => [...pane.querySelectorAll(sel)].slice(0, n).map((el) => {
            const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
            return { sel, w: Math.round(b.width), h: Math.round(b.height), r: cs.borderRadius, font: `${cs.fontSize}/${cs.fontFamily.split(",")[0]}`, bg: cs.backgroundColor, bs: cs.boxShadow.slice(0, 90), border: cs.borderStyle + " " + cs.borderWidth, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 140) };
        });
        const pb = pane.getBoundingClientRect();
        // content bottom inside the pane: the last child of the column
        const col = pane.querySelector(":scope > div.flex.flex-col");
        const cb = col?.getBoundingClientRect();
        return {
            pane: { w: Math.round(pb.width), h: Math.round(pb.height), r: getComputedStyle(pane).borderRadius, contentBottom: cb && Math.round(cb.bottom - pb.top), deadSpace: cb && Math.round(pb.bottom - cb.bottom) },
            items: [
                ...pick("[role=group], [role=tablist]", 2), ...pick("[role=group] button, [role=tablist] [role=tab]", 2),
                ...pick("[class*=indicator], [data-slot*=indicator]", 2),
                ...pick(".dashed-well", 1), ...pick("button[role=combobox]", 3), ...pick("label, [id*=label]", 3),
                ...pick(".mix-plate", 1), ...pick(".mix-plate .h-4", 1), ...pick("button[aria-pressed]", 3),
                ...pick("canvas", 1), ...pick("h1, h2, h3", 2), ...pick(".section-label", 1),
            ],
            mixBtn: pick("button", 60).filter((x) => x.cls.includes("primary") || x.cls.includes("audacious")),
        };
    });
}

const log = [];
const head = () => execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirtyNow = () => execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const flush = () => writeFileSync(`${OUT}capture-log${only ? "-" + only : ""}.json`, JSON.stringify(log, null, 1));
const swatchDom = (page) => page.evaluate(() => [...document.querySelectorAll(".pane-scroll-fade [aria-label], .pane-scroll-fade button")].slice(0, 40).map((e) => `${e.tagName}|${e.getAttribute("role") ?? ""}|${e.getAttribute("aria-label") ?? ""}|${e.getAttribute("title") ?? ""}`));
const paneOf = (page) => page.locator(".pane-scroll-fade").filter({ hasText: "Mix colors and palettes" });
async function framePane(page, vp) {
    if (vp.name !== "390") return;
    await paneOf(page).evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.evaluate(() => window.scrollBy(0, -8));
    await page.waitForTimeout(250);
}

async function run(flow, vp, theme, fn, opts = {}) {
    const tag = `${vp.name}-${theme}-${flow}`;
    if (onlyList && !onlyList.includes(tag)) return;
    if (!browser?.isConnected()) browser = await launch();
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.name === "390" });
    await ctx.addInitScript(seed({ ...opts, theme }));
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
    const shots = [];
    const shot = async (name, o = {}) => { const f = `${tag}-${name}.png`; await page.screenshot({ path: OUT + f, ...o }); shots.push(f); };
    try {
        page.setDefaultTimeout(20000);
        for (let a = 0; ; a++) { try { await page.goto(`${BASE}/#/mix`, { waitUntil: "domcontentloaded", timeout: 240000 }); break; } catch (e) { if (a >= 2) throw e; } }
        await paneOf(page).waitFor({ timeout: 240000 });
        await page.waitForTimeout(2500);
        const notes = (await fn(page, vp, shot)) ?? "";
        const m = await metrics(page);
        log.push({ tag, sha: head(), dirty: dirtyNow(), url: page.url(), notes, errs, shots, m }); flush();
        console.log("OK", tag, shots.length, notes, errs.length ? `errs=${errs.length}` : "");
    } catch (e) {
        await shot("FAIL").catch(() => {});
        log.push({ tag, sha: head(), dirty: dirtyNow(), fail: String(e).slice(0, 400), errs, shots, dom: await swatchDom(page).catch(() => null) }); flush();
        console.log("FAIL", tag, String(e).slice(0, 300));
    }
    await ctx.close().catch(() => {});
}

const btn = (scope, name) => scope.getByRole("button", { name, exact: true });
const FLOWS = {
    colors: async (page, vp, shot) => {
        const pane = paneOf(page);
        if (vp.name === "390") await shot("00-fullpage", { fullPage: true });
        await framePane(page, vp);
        await shot("01-colors-empty");
        // focus ring on the tab strip (keyboard)
        await btn(pane, "Colors").focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(40);
        await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(700);
        await shot("02-tab-focus");
        // open "From palettes"
        await pane.getByText("From palettes").click(); await page.waitForTimeout(700);
        await framePane(page, vp);
        await shot("03-from-palettes-open");
        for (const lbl of ["Sunset Coast", "Forest Floor", "Neon Arcade"]) {
            await pane.locator(`[aria-label*="from ${lbl}"]`).first().click(); await page.waitForTimeout(250);
        }
        await pane.getByText("From palettes").click(); await page.waitForTimeout(700);
        await framePane(page, vp);
        await shot("04-colors-chosen");
        // hover a chosen chip → remove affordance
        const chip = pane.locator("[data-mix-source]").nth(1);
        if (vp.name === "390") await chip.tap(); else await chip.hover();
        await page.waitForTimeout(400);
        await shot("05-chip-hover");
        // config selects (operand preview ramps)
        await pane.getByRole("combobox").nth(0).click(); await page.waitForTimeout(700);
        await shot("06-space-select-open");
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        await pane.getByRole("combobox").nth(1).click(); await page.waitForTimeout(700);
        await shot("07-hue-select-open");
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        await framePane(page, vp);
        // the mix — capture the canvas narration mid-flight
        const t0 = Date.now();
        await btn(pane, "Mix").click();
        for (const t of [120, 420, 750, 1050]) { const wait = t - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait); await shot(`08-anim-${t}ms`); }
        await page.waitForTimeout(1200);
        await shot("09-result-color");
        const canvas = await pane.locator("canvas").evaluate((c) => ({ w: c.width, h: c.height, cw: c.clientWidth, ch: c.clientHeight }));
        return "canvas=" + JSON.stringify(canvas);
    },
    palettes: async (page, vp, shot) => {
        const pane = paneOf(page);
        await framePane(page, vp);
        await btn(pane, "Palettes").click();
        await page.waitForTimeout(110); await shot("11-tab-swap-110ms");
        await page.waitForTimeout(700); await shot("12-palettes");
        await pane.getByRole("button", { name: "Select palette Sunset Coast" }).click(); await page.waitForTimeout(200);
        await pane.getByRole("button", { name: "Select palette Neon Arcade" }).click(); await page.waitForTimeout(500);
        if (vp.name !== "390") await pane.getByRole("button", { name: /palette Forest Floor/ }).hover();
        await page.waitForTimeout(400);
        await shot("13-palettes-selected");
        await btn(pane, "Palettes").focus(); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(110);
        await shot("14-tab-swap-back-110ms");
        await page.waitForTimeout(700);
        await btn(pane, "Palettes").click(); await page.waitForTimeout(800);
        // scroll the pane down to the Mix button + size-mismatch select
        await btn(pane, "Mix").scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
        await shot("15-palettes-config");
        const t0 = Date.now();
        await btn(pane, "Mix").click();
        for (const t of [200, 600]) { const wait = t - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait); await shot(`16-anim-${t}ms`); }
        await page.waitForTimeout(1500);
        await pane.locator(".mix-plate").scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
        await shot("17-result-palette");
        return "";
    },
    "palettes-empty": async (page, vp, shot) => {
        const pane = paneOf(page);
        await framePane(page, vp);
        await btn(pane, "Palettes").click(); await page.waitForTimeout(900);
        await shot("18-palettes-empty");
        await btn(pane, "Colors").click(); await page.waitForTimeout(900);
        await shot("19-colors-no-library");
        return "";
    },
    dock: async (page, vp, shot) => {
        // Colors mode cannot gain operands (the WatercolorDot add paths are inert — see probe-inert.json),
        // so the dock verb is exercised in Palettes mode.
        const pane = paneOf(page);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(900);
        await shot("20-dock-tools-colors-empty");
        const dockMixDisabledColors = await page.getByRole("button", { name: "Mix", exact: true }).first().evaluate((e) => e.disabled || e.getAttribute("aria-disabled"));
        await btn(pane, "Palettes").click(); await page.waitForTimeout(800);
        await pane.getByRole("button", { name: "Select palette Sunset Coast" }).click(); await page.waitForTimeout(200);
        await pane.getByRole("button", { name: "Select palette Forest Floor" }).click(); await page.waitForTimeout(400);
        await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
        await shot("20b-dock-tools-palettes-ready");
        await page.getByRole("button", { name: "Mix", exact: true }).first().click();
        await page.waitForTimeout(2400);
        const hasResult = await pane.locator(".mix-plate").count();
        await framePane(page, vp);
        await shot("21-dock-mix-result");
        await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
        await page.getByRole("button", { name: "Clear", exact: true }).first().click().catch(() => {});
        await page.waitForTimeout(900);
        const pressed = await pane.locator("button[aria-pressed=true]").count();
        const plate = await pane.locator(".mix-plate").count();
        await framePane(page, vp);
        await shot("22-dock-clear");
        return `dockMixDisabledInEmptyColors=${dockMixDisabledColors} dockMixResult=${hasResult} afterClear pressed=${pressed} plate=${plate}`;
    },
};

const launch = () => chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
let browser = await launch();
const VPS = [{ name: "1440", w: 1440, h: 900 }, { name: "390", w: 390, h: 844 }];
for (const [flow, fn] of Object.entries(FLOWS))
    for (const vp of VPS)
        for (const theme of ["light", "dark"])
            for (let attempt = 0; attempt < 2; attempt++) {
                const before = log.length;
                await run(flow, vp, theme, fn, flow === "palettes-empty" ? { palettes: [] } : {});
                const last = log[log.length - 1];
                if (log.length === before || !last?.fail || !/closed/.test(last.fail)) break;
            }
await browser.close().catch(() => {});
flush();
