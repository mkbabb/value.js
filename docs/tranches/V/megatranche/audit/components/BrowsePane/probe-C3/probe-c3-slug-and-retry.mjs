/**
 * CHALLENGE-C pass 3 · probe C3-3
 *   (a) slug search — advertised by the CLIENT predicate
 *       (`useFilteredList` … `|| p.slug.includes(q)`) but pre-empted by the
 *       SERVER predicate (`$text` on a `{name:"text"}` index), so it is dead
 *       for every query of 2+ characters. Isolated with a slug suffix that
 *       appears in NO palette name: `7600d315` (slug `hey-7600d315`).
 *   (b) Retry (BrowsePane.vue:69-76) — the only affordance on the error plate,
 *       and the only state 4-of-4 Safari matrices actually photographed.
 *       Measure where focus goes when it is activated.
 * Read-only.
 */
import { chromium } from "playwright";

const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const API = "https://api.color.babb.dev";
const DEBOUNCE = 1100;
const out = {};
const browser = await chromium.launch();

// ── (a) slug search against the REAL commons, proxied ────────────────────────
{
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const q = [];
    await page.route(`${API}/**`, async (route) => {
        const req = route.request();
        if (req.method() === "OPTIONS")
            return route.fulfill({
                status: 204,
                headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*" },
            });
        if (req.method() !== "GET") return route.abort();
        const r = await fetch(req.url(), { headers: { accept: "application/json" } });
        const body = await r.text();
        route.fulfill({
            status: r.status,
            headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
            body,
        });
    });
    page.on("request", (r) => {
        if (r.url().startsWith(`${API}/palettes`)) q.push(r.url().slice(API.length));
    });

    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);
    const cards = () => page.locator('main [role="list"] [role="article"]').count();
    const box = page.locator('input[placeholder="Search the commons..."]').first();

    out.slugSearch = [];
    for (const term of ["7", "76", "7600d315", "cd3e1e3b"]) {
        q.length = 0;
        await box.fill(term);
        await page.waitForTimeout(DEBOUNCE);
        const t = await page.locator("main").innerText();
        out.slugSearch.push({
            typed: term,
            serverQuery: q.slice(),
            cards: await cards(),
            trueEmptyInvitation: t.includes("No published palettes here yet"),
        });
    }
    await page.close();
}

// ── (b) Retry focus — force a hard transport failure on /palettes only ───────
{
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    // catch-all FIRST so the more specific /palettes route (registered after)
    // wins — Playwright matches the most recently registered route first.
    await page.route(`${API}/**`, (route) =>
        route.fulfill({
            status: 200,
            headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
            body: "[]",
        }),
    );
    await page.route(`${API}/palettes**`, (route) => route.abort("connectionrefused"));

    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);

    const retry = page.getByRole("button", { name: "Retry" }).first();
    out.retry = { errorPlateRendered: await retry.count() };
    if (out.retry.errorPlateRendered) {
        out.retry.plateText = (await page.locator("main").innerText())
            .split("\n")
            .filter(Boolean)
            .slice(0, 6);
        out.retry.liveRegionsInPane = await page.evaluate(
            () => document.querySelectorAll("main [aria-live]").length,
        );
        out.retry.alertRoles = await page.evaluate(
            () => document.querySelectorAll('main [role="alert"]').length,
        );
        await retry.focus();
        out.retry.focusBefore = await page.evaluate(() =>
            document.activeElement?.textContent?.trim().slice(0, 40),
        );
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1500);
        out.retry.focusAfter = await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            text: document.activeElement?.textContent?.trim().slice(0, 60),
        }));
        out.retry.plateStillThere = await page
            .getByRole("button", { name: "Retry" })
            .count();
        await page.screenshot({
            path: new URL("./c3-retry-focus-lost.png", import.meta.url).pathname,
        });
    }
    await page.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
