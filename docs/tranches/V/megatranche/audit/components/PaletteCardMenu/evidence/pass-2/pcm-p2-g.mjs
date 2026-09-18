// PaletteCardMenu — CHALLENGE-C pass 2, probe G
// LIVE reproduction of the 3-state `visibility` collapse (`isPublic = v !== "private"`)
// and of the K-INV5 offline annotation, by serving the browse feed from a stub.
//
// Served from the LAN host (non-loopback) so `detectDevMisconfig` is false and the
// transport actually issues requests — which page.route() then fulfils.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const HOST = process.env.PROBE_HOST || "http://192.168.1.166:9000";
const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const mk = (slug, name, visibility, extra = {}) => ({
    name, slug, userSlug: "probeuser",
    colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }],
    createdAt: NOW, updatedAt: NOW,
    visibility,
    published: visibility === "public",
    tier: "standard",
    voteCount: 0,
    versionCount: 3,
    ...extra,
});
const FEED = {
    data: [
        mk("pub-one", "PUBLIC palette", "public"),
        mk("unl-one", "UNLISTED palette", "unlisted"),
        mk("prv-one", "PRIVATE palette", "private"),
        mk("und-one", "UNDEFINED-visibility palette", undefined),
    ],
    nextCursor: null,
    hasMore: false,
};

async function run(mode) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await ctx.addInitScript(() => {
        localStorage.setItem("palette-user-slug", "probeuser");
        localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));

    await page.route("**://api.color.babb.dev/**", async (route) => {
        if (mode === "offline") return route.abort("connectionrefused");
        const url = route.request().url();
        if (url.includes("/palettes?") || /\/palettes$/.test(url.split("?")[0])) {
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(FEED) });
        }
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto(`${HOST}/#/browse`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    const cards = await page.locator('[role="article"]').count();
    const names = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="article"]')).map((e) => e.getAttribute("aria-label")));

    const rows = [];
    for (let i = 0; i < cards; i++) {
        await page.locator('[aria-label="Palette menu"]').nth(i).click();
        await page.waitForTimeout(450);
        const items = await page.evaluate(() =>
            Array.from(document.querySelectorAll('[role="menuitem"]')).map((el) => ({
                text: el.textContent.replace(/\s+/g, " ").trim(),
                ariaDisabled: el.getAttribute("aria-disabled"),
                dataDisabled: el.getAttribute("data-disabled"),
            })));
        rows.push({ card: names[i], items });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    }

    // AX names for one card's menu
    let ax = [];
    if (cards > 1) {
        await page.locator('[aria-label="Palette menu"]').nth(1).click();
        await page.waitForTimeout(450);
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Accessibility.enable");
        const t = await cdp.send("Accessibility.getFullAXTree");
        ax = t.nodes.filter((n) => n.role?.value === "menuitem")
            .map((n) => ({ name: n.name?.value, disabled: n.properties?.find((p) => p.name === "disabled")?.value?.value ?? null }));
        await page.keyboard.press("Escape");
    }

    const latch = await page.evaluate(() => {
        const lamp = document.querySelector("[data-variant]");
        return lamp ? { variant: lamp.getAttribute("data-variant"), text: lamp.textContent.replace(/\s+/g, " ").trim().slice(0, 80) } : null;
    });

    await browser.close();
    return { mode, cards, names, rows, ax, latch, errs };
}

log("ONLINE", await run("online"));
log("OFFLINE", await run("offline"));

writeFileSync(new URL("./pcm-p2-g-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
