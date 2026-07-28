/**
 * CHALLENGE-C pass 3 · probe C3-2 — the REAL commons, end to end.
 *
 * Both earlier passes had to STUB the commons, because the only origins that
 * boot the client are (a) localhost, which `detectDevMisconfig` latches so no
 * request is ever issued, and (b) a LAN host, which the production API's CORS
 * allow-list rejects (measured this pass: `probe-c3-debug-state.mjs` →
 * `Access to fetch at 'https://api.color.babb.dev/palettes?...' from origin
 * 'http://192.168.1.166:9000' has been blocked by CORS policy`).
 *
 * This probe removes the stub: it PROXIES every api.color.babb.dev call through
 * Node (no CORS in Node) to the REAL production API and fulfils the page with
 * the real bytes. So the wall below is the live commons, and every search
 * result is the live Mongo `$text` engine answering.
 *
 * Read-only against the API (GET only). No source edits.
 *   node docs/.../BrowsePane/probe-C3/probe-c3-live-proxy.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const DEBOUNCE = 1100; // usePaletteWiring.ts:162 → 400ms, plus the round-trip

const out = {};
const browser = await chromium.launch();

async function newProbePage(viewport) {
    const page = await browser.newPage({ viewport });
    await page.route(`${API}/**`, async (route) => {
        const req = route.request();
        if (req.method() === "OPTIONS") {
            return route.fulfill({
                status: 204,
                headers: {
                    "access-control-allow-origin": "*",
                    "access-control-allow-headers": "*",
                    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
                },
            });
        }
        if (req.method() !== "GET") return route.abort(); // read-only probe
        try {
            const r = await fetch(req.url(), { headers: { accept: "application/json" } });
            const body = await r.text();
            route.fulfill({
                status: r.status,
                headers: {
                    "content-type": r.headers.get("content-type") ?? "application/json",
                    "access-control-allow-origin": "*",
                },
                body,
            });
        } catch (e) {
            route.abort();
        }
    });
    return page;
}

const page = await newProbePage({ width: 1440, height: 900 });
const serverQueries = [];
page.on("request", (r) => {
    const u = r.url();
    if (u.startsWith(`${API}/palettes`) && r.method() === "GET")
        serverQueries.push(u.slice(API.length));
});

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const cards = () => page.locator('main [role="list"] [role="article"]').count();
const paneText = async () => {
    const t = await page.locator("main").innerText();
    return {
        trueEmptyInvitation: t.includes("No published palettes here yet"),
        errorPlate: t.includes("The commons is unreachable"),
        loadMoreOffered: t.includes("More from the commons"),
    };
};

out.wallLoaded = { cards: await cards(), ...(await paneText()) };
out.cardNames = await page
    .locator('main [role="list"] [role="article"]')
    .evaluateAll((els) => els.map((e) => e.innerText.split("\n")[0]));

// ── 1 · the two-predicate cliff, typed one character at a time ───────────────
const WORD = "ocean";
const box = page.locator('input[placeholder="Search the commons..."]').first();
out.perKeystroke = [];
for (let n = 1; n <= WORD.length; n++) {
    serverQueries.length = 0;
    await box.fill(WORD.slice(0, n));
    await page.waitForTimeout(DEBOUNCE);
    out.perKeystroke.push({
        typed: WORD.slice(0, n),
        serverQuery: serverQueries.slice(),
        cards: await cards(),
        ...(await paneText()),
    });
}
await page.screenshot({
    path: new URL("./c3-cliff-at-oc.png", import.meta.url).pathname,
});

// ── 2 · trim divergence: the server trims, the client filter does not ────────
serverQueries.length = 0;
await box.fill("Ocean ");
await page.waitForTimeout(DEBOUNCE);
out.trailingSpace = { typed: "'Ocean '", serverQuery: serverQueries.slice(), cards: await cards(), ...(await paneText()) };

serverQueries.length = 0;
await box.fill(" o");
await page.waitForTimeout(DEBOUNCE);
out.leadingSpace = { typed: "' o'", serverQuery: serverQueries.slice(), cards: await cards(), ...(await paneText()) };

// ── 3 · slug search: advertised by the client predicate, dead past 1 char ────
const slug = await page.evaluate(() => {
    const r = document.querySelector("#app")?.__vue_app__?._instance;
    return null;
});
serverQueries.length = 0;
await box.fill("depths-");
await page.waitForTimeout(DEBOUNCE);
out.slugFragment = { typed: "depths-", serverQuery: serverQueries.slice(), cards: await cards(), ...(await paneText()) };

await box.fill("");
await page.waitForTimeout(DEBOUNCE);
out.afterClear = { cards: await cards(), ...(await paneText()) };

// ── 4 · Retry destroys focus (the error branch's only affordance) ────────────
const errPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await errPage.route(`${API}/palettes**`, (r) => r.abort()); // force the error plate
await errPage.route(`${API}/**`, (r) => r.fulfill({ status: 200, headers: { "content-type": "application/json", "access-control-allow-origin": "*" }, body: "[]" }));
await errPage.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await errPage.waitForTimeout(3000);
const retry = errPage.getByRole("button", { name: "Retry" }).first();
out.retryFocus = { errorPlateShown: await retry.count() };
if (await retry.count()) {
    await retry.focus();
    out.retryFocus.before = await errPage.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
    await errPage.keyboard.press("Enter");
    await errPage.waitForTimeout(1200);
    out.retryFocus.after = await errPage.evaluate(() => ({
        tag: document.activeElement?.tagName,
        text: document.activeElement?.textContent?.trim().slice(0, 40),
    }));
    out.retryFocus.liveRegionsInPane = await errPage.evaluate(
        () => document.querySelectorAll("main [aria-live]").length,
    );
}

// ── 5 · how many BrowsePane instances exist? (pass-2 claimed two) ────────────
const mob = await newProbePage({ width: 390, height: 844 });
await mob.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await mob.waitForTimeout(3500);
out.instanceCount = {
    desktop1440_commonsInputs: await page
        .locator('input[placeholder="Search the commons..."]')
        .count(),
    mobile390_commonsInputs: await mob
        .locator('input[placeholder="Search the commons..."]')
        .count(),
    mobile390_cards: await mob.locator('[role="list"] [role="article"]').count(),
};

console.log(JSON.stringify(out, null, 2));
await browser.close();
