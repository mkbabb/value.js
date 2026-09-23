// UI-AUDIT seat `palettes-view` — ONE page load per (viewport, theme), then every
// remaining state is driven in-app (the shared dev server is saturated by sibling
// seats; fresh loads time out). Read-only; never starts/stops a server.
// usage: node session.mjs <1440|390> <light|dark> [offline]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const [vpName = "1440", theme = "light", mode = ""] = process.argv.slice(2);
const vp = vpName === "390" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim() + " dirty=" + execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const now = "2026-09-20T12:00:00.000Z";
const P = (id, name, colors) => ({ id, name, slug: name.toLowerCase().replace(/\s+/g, "-"), colors: colors.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tags: [] });
const PALETTES = [P("p-1", "Sunset Coast", ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"]), P("p-2", "Forest Floor", ["#2d4a22", "#5b7c3a", "#a3b18a", "#dad7cd"]), P("p-3", "Neon Arcade", ["oklch(0.7 0.3 330)", "oklch(0.8 0.2 190)", "oklch(0.9 0.2 110)", "#111", "#fff", "#7f5af0"]), P("p-4", "Quiet Greys", ["#f5f5f4", "#a8a29e", "#57534e"])];
const seed = `(() => { try { if (sessionStorage.getItem('__audit_seeded')) return; sessionStorage.setItem('__audit_seeded','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)}); localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify({ version: 1, palettes: PALETTES }))}); localStorage.setItem('color-picker', ${JSON.stringify(JSON.stringify({ inputColor: "oklch(0.65 0.2 30)", savedColors: ["#e63946", "#f1faee", "#a8dadc", "#457b9d"] }))}); } catch (e) {} })();`;
const log = [];
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: vp, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vpName === "390" });
await ctx.addInitScript(seed);
const page = await ctx.newPage();
page.setDefaultTimeout(30000);
const errs = [];
page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
if (mode === "offline") await page.route((u) => u.port === "3000" || u.pathname.startsWith("/api"), (r) => r.abort());
const t0 = Date.now();
try { await page.goto("http://localhost:9000/#/palettes", { waitUntil: "commit", timeout: 300000 }); } catch (e) { console.log("GOTO-WARN", String(e).slice(0, 160)); if (!page.url().includes("9000")) await page.goto("http://localhost:9000/#/palettes", { waitUntil: "commit", timeout: 300000 }); }
try { await page.getByPlaceholder("Search your palettes...").waitFor({ timeout: 300000 }); } catch (e) { await page.screenshot({ path: `${OUT}session-load-FAIL-${vpName}-${theme}.png` }).catch(() => {}); console.log("LOAD-FAIL", String(e).slice(0, 200)); await b.close(); process.exit(1); }
log.push({ load: Date.now() - t0 });
await page.waitForTimeout(2500);
const card = (n) => page.getByRole("article", { name: `Palette: ${n}` });
async function shot(state, fn) {
    const tag = `${state}__${vpName}__${theme}${mode ? "__" + mode : ""}`;
    try {
        const note = (await fn()) ?? "";
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${OUT}${tag}.png` });
        log.push({ tag, tree: tree(), note, errs: errs.splice(0) });
        console.log("OK", tag, note);
    } catch (e) { log.push({ tag, fail: String(e).slice(0, 300) }); console.log("FAIL", tag, String(e).slice(0, 200)); await page.screenshot({ path: `${OUT}${tag}__FAIL.png` }).catch(() => {}); }
    await page.keyboard.press("Escape").catch(() => {});
    await page.mouse.move(5, vp.height - 5);
    await page.waitForTimeout(400);
    writeFileSync(`${OUT}session-log-${vpName}-${theme}${mode ? "-" + mode : ""}.json`, JSON.stringify(log, null, 1));
}
if (mode === "offline") {
    await shot("offline", async () => { await page.waitForTimeout(2500); await page.locator(".api-offline-chip").first().scrollIntoViewIfNeeded().catch(() => {}); return "chips=" + (await page.locator(".api-offline-chip").count()); });
} else {
    await shot("swatchhover", async () => {
        const sw = page.locator(".dashed-well .swatch-row [aria-label^=\"Color swatch\"]").nth(2);
        await sw.scrollIntoViewIfNeeded();
        if (vpName === "390") await sw.click(); else await sw.hover();
        await page.waitForTimeout(800);
        return await page.evaluate(() => { const p = document.querySelector(".floating-panel") || document.querySelector("[role=dialog]"); if (!p) return "no panel"; const cs = getComputedStyle(p); return `panel=${p.className.slice(0, 60)} bg=${cs.backgroundColor} radius=${cs.borderRadius} shadow=${cs.boxShadow.slice(0, 40)} backdrop=${cs.backdropFilter} aria-hidden=${p.getAttribute("aria-hidden")} buttons=${p.querySelectorAll("button").length}`; });
    });
    await shot("menucolor", async () => {
        await card("Sunset Coast").getByRole("button", { name: "Palette menu" }).click();
        await page.waitForTimeout(700);
        const del = await page.getByRole("menuitem", { name: /^Delete/ }).evaluate((e) => getComputedStyle(e).color);
        const ren = await page.getByRole("menuitem", { name: /Rename/ }).evaluate((e) => getComputedStyle(e).color);
        const dest = await page.evaluate(() => { const d = document.createElement("span"); d.className = "text-destructive"; document.body.append(d); const c = getComputedStyle(d).color; d.remove(); return c; });
        return `delete=${del} rename=${ren} text-destructive=${dest}`;
    });
    await shot("cardhover", async () => { await card("Neon Arcade").scrollIntoViewIfNeeded(); await card("Neon Arcade").hover({ position: { x: 200, y: 60 } }); await page.waitForTimeout(500); return "hover"; });
    await shot("focus", async () => {
        await page.getByPlaceholder("Search your palettes...").focus();
        const seen = [];
        for (let i = 0; i < 10; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(120); seen.push(await page.evaluate(() => { const a = document.activeElement; return `${a.tagName.toLowerCase()}[${a.getAttribute("aria-label") ?? (a.textContent || "").trim().slice(0, 16)}]`; })); }
        return "tab order: " + seen.join(" > ");
    });
    await shot("dragmid", async () => {
        const grip = card("Quiet Greys").locator(".drag-handle"); await grip.scrollIntoViewIfNeeded();
        const a = await grip.boundingBox(); const t = await card("Forest Floor").boundingBox();
        await page.mouse.move(a.x + 8, a.y + 8); await page.mouse.down();
        for (let i = 1; i <= 14; i++) { await page.mouse.move(a.x + 8, a.y + 8 + (t.y + 10 - a.y) * i / 14); await page.waitForTimeout(50); }
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${OUT}dragmid__${vpName}__${theme}__INFLIGHT.png` });
        await page.mouse.up(); await page.waitForTimeout(800);
        return "order after drop=" + JSON.stringify(await page.getByRole("article").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label").replace("Palette: ", ""))));
    });
    await shot("dock", async () => {
        await card("Forest Floor").click({ position: { x: 90, y: 20 } });
        await page.waitForTimeout(1000);
        const collapsed = await page.locator(".glass-dock.collapsed").count();
        await page.screenshot({ path: `${OUT}dock__${vpName}__${theme}__AFTER-SELECT.png` });
        if (collapsed) { await page.locator(".glass-dock.collapsed").first().click(); await page.waitForTimeout(1500); }
        const ctl = await page.locator(".glass-dock").first().locator("button,[role=combobox],a").evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 24)));
        return `collapsedAfterSelect=${collapsed} dockControls=${JSON.stringify(ctl)}`;
    });
    await shot("dupe", async () => {
        await page.evaluate(() => window.scrollTo(0, 0));
        const i = page.locator(".dashed-well input").first(); await i.scrollIntoViewIfNeeded(); await i.fill("Forest Floor"); await i.press("Enter"); await page.waitForTimeout(700);
        return "save duplicate name";
    });
    if (vpName === "390") await shot("scrolled", async () => { await page.getByRole("heading", { name: /My Palettes/ }).scrollIntoViewIfNeeded(); await page.waitForTimeout(500); return "scrollY=" + (await page.evaluate(() => window.scrollY)); });
}
await b.close();
