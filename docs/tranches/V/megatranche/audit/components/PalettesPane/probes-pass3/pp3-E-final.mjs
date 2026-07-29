// PROBE E — search-query scope leak, no-match empty state, cardRefs growth,
//           publish in-flight guard (API stubbed, no real network).
import { chromium } from "playwright";
const KEY = "color-palettes";
const API = "https://api.color.babb.dev";
const mk = (names) => JSON.stringify({ version: 1, palettes: names.map((n, i) => ({
    id: `id-${n}`, name: n, slug: n.toLowerCase(),
    colors: [{ css: "#ff0000", position: 0 }, { css: "#0000ff", position: 1 }],
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: `2026-01-0${i + 1}T00:00:00.000Z`, isLocal: true,
})) });
const NAMES = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
const browser = await chromium.launch();

async function open(seed, { stub = false, viewport = { width: 1600, height: 1000 } } = {}) {
    const ctx = await browser.newContext({ viewport });
    const page = await ctx.newPage();
    const reqs = [];
    if (stub) {
        await page.route(API + "/**", async (route) => {
            const r = route.request();
            reqs.push(r.method() + " " + new URL(r.url()).pathname);
            const p = new URL(r.url()).pathname;
            if (p.includes("session")) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "t", userSlug: "u" }) });
            await new Promise((res) => setTimeout(res, 900));           // slow publish
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ name: "x", slug: "x", colors: [], createdAt: "", updatedAt: "", isLocal: false }) });
        });
    }
    await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [KEY, seed]);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    return { ctx, page, reqs };
}

// ── E1 · searchQuery scope ──────────────────────────────────────────────────
{
    console.log("=== E1 searchQuery scope (type in MY palettes, then visit /#/browse) ===");
    const { ctx, page } = await open(mk(NAMES));
    await page.fill('input[placeholder="Search your palettes..."]', "leaktest");
    await page.waitForTimeout(400);
    const myPane = await page.evaluate(() => [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, v: i.value })));
    console.log("palettes route inputs:", JSON.stringify(myPane));
    await page.evaluate(() => { location.hash = "#/browse"; });
    await page.waitForTimeout(1800);
    const browsePane = await page.evaluate(() => [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, v: i.value })));
    console.log("browse route inputs  :", JSON.stringify(browsePane));
    await ctx.close();
}

// ── E2 · no-match empty state ───────────────────────────────────────────────
{
    console.log("\n=== E2 no-match search vs empty library ===");
    const { ctx, page } = await open(mk(NAMES));
    await page.fill('input[placeholder="Search your palettes..."]', "zzzznomatch");
    await page.waitForTimeout(500);
    const m = await page.evaluate(() => ({
        heading: document.querySelector(".pane-header-title")?.textContent?.trim(),
        gridText: [...document.querySelectorAll(".palette-card-grid")].map((g) => g.innerText.replace(/\n+/g, " | ")).join(""),
        cards: document.querySelectorAll('[role="article"]').length,
        deleteAllVisible: [...document.querySelectorAll('[aria-label="Delete all saved palettes"]')].filter((e) => e.getBoundingClientRect().width > 0).length,
        storedCount: JSON.parse(localStorage.getItem("color-palettes")).palettes.length,
    }));
    console.log(JSON.stringify(m, null, 1));
    await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/pp3-nomatch.png" });
    await ctx.close();
}

// ── E3 · cardRefs growth under filter churn ─────────────────────────────────
{
    console.log("\n=== E3 cardRefs growth (search churn; 2 cards ever rendered) ===");
    const { ctx, page } = await open(mk(NAMES));
    const read = () => page.evaluate(() => {
        const walk = (n) => { let out = null; const rec = (v) => { if (!v || out) return; if (v.type && v.type.__name === "PalettesPane") { out = v; return; } if (v.component) rec(v.component.subTree), rec(v.component.vnode); if (Array.isArray(v.children)) v.children.forEach(rec); if (v.subTree) rec(v.subTree); }; rec(n); return out; };
        const app = document.querySelector("#app").__vue_app__;
        const found = walk(app._instance.subTree);
        const inst = found?.component;
        return { cards: document.querySelectorAll('[role="article"]').length, refKeys: inst ? Object.keys(inst.setupState.cardRefs).length : "N/A" };
    });
    console.log("round 0:", JSON.stringify(await read()));
    for (let r = 1; r <= 5; r++) {
        await page.fill('input[placeholder="Search your palettes..."]', "alpha");
        await page.waitForTimeout(160);
        await page.fill('input[placeholder="Search your palettes..."]', "beta");
        await page.waitForTimeout(160);
        console.log(`round ${r}:`, JSON.stringify(await read()));
    }
    await ctx.close();
}

// ── E4 · publish: in-flight guard? ──────────────────────────────────────────
{
    console.log("\n=== E4 publish double-invoke (API stubbed, 900ms latency) ===");
    const { ctx, page, reqs } = await open(mk(["Solo"]), { stub: true });
    // drive publish twice through the card menu without waiting for the first
    await page.click('[aria-label="Palette menu"]');
    await page.waitForTimeout(350);
    const items = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"],[role="option"],button')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 30));
    console.log("menu items:", JSON.stringify(items.filter((t) => /publish|export|delete|rename|copy/i.test(t))));
    const pub = page.getByRole("menuitem", { name: /publish/i }).first();
    if (await pub.count()) {
        await pub.click();
        await page.waitForTimeout(120);
        // second invocation: reopen menu and click again while the first is in flight
        await page.click('[aria-label="Palette menu"]').catch(() => {});
        await page.waitForTimeout(250);
        await page.getByRole("menuitem", { name: /publish/i }).first().click().catch(() => {});
        await page.waitForTimeout(2500);
    } else {
        console.log("(no publish menuitem found)");
    }
    console.log("API requests seen:", JSON.stringify(reqs));
    const fb = await page.evaluate(() => document.body.innerText.match(/Published!|Failed to publish[^\n]*/g));
    console.log("feedback text on screen:", JSON.stringify(fb));
    await ctx.close();
}

await browser.close();
