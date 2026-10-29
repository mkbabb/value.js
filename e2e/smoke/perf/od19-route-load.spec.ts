// SERVED MODEL: claude-opus-5-5
import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * OD19-ALL (owner docket 2026-10-19, value): "All loading times for all apps
 * needs to be improved, every page, every app", and route-to-route navigation
 * "smoothly and subtly". The route-level falsifier. Boot (the first paint of
 * `/`) is X.W11.p2's and is gated by `eager-payload.spec.ts`, not here.
 *
 * Every route in the router (`demo/app/router/index.ts`) is loaded COLD, as a
 * deep link into a fresh context, against the BUILT bundle (the smoke-perf
 * origin), at CPU 4x (CDP `Emulation.setCPUThrottlingRate`). Per
 * route:
 *
 *   1 · THE DEEP-LINK WARM. A lazy route's pane chunk is requested within
 *       `PANE_REQUEST_GAP_MS` of the entry chunk's arrival. Before the cure the
 *       pane graph was requested only when PaneSlot mounted, after the entry had
 *       evaluated and the router had resolved: measured 600 ms after the entry
 *       on `#/gradient` (OD19/value.md "### load"). The router now names the
 *       linked view at module evaluation and starts its chunks then. Measured
 *       through this spec: the cure 82-129 ms, the parent 258-673 ms (higher on
 *       a loaded machine), so the bar sits at 180 ms. RED on the parent tree
 *       (14 of 15; not-found has no lazy pane), GREEN on the cure.
 *   2 · TIME TO ROUTE CONTENT ≤ the route's measured bar. Content = every scene
 *       region holds a mounted pane, none holds the loading plate, the route's
 *       H1 is in `<main>`, and the address is still the route (an admin bounce
 *       is not content). The bars are the AFTER runs' worst cell plus headroom
 *       for a loaded shared machine; they are regression bars, not targets.
 *   3 · THE IN-APP HOP. From a settled `#/` (the idle warm has landed the
 *       route's chunk), the hash is set to the route; the hop must reach its
 *       content, and its time is logged. It carries NO ms bar: the hop is the
 *       out-in leave plus the incoming pane's mount, measured 310-1460 ms on a
 *       quiet machine and 2.2-6.2 s at load 30+, in BEFORE and AFTER alike, so
 *       an absolute bar here would time the machine, not the tree. The hop's
 *       budget is P3's escalation (OD19/value.md "### P3" and "### load").
 *
 * Admin routes hold a seeded token and the admin endpoints answer empty
 * envelopes (the admin-auth fixture's strategy), so the pane renders instead of
 * bouncing on the served API's refusal. Interception costs nothing here: every
 * cell is a cold, empty-cache load.
 */

const CPU = 4;

/** [route, scene regions, pane chunk prefix (null = eager pane), cold content bar ms] */
const ROUTES: ReadonlyArray<readonly [string, number, string | null, number]> = [
    ["", 2, "AboutPane", 2500],
    ["palettes", 2, "PalettesPane", 2500],
    ["browse", 2, "BrowsePane", 2500],
    ["extract", 2, "ExtractPane", 2500],
    ["mix", 2, "MixPane", 2500],
    ["generate", 2, "GeneratePane", 2500],
    ["gradient", 2, "GradientPane", 2500],
    ["atmosphere", 1, "AuroraPane", 2500],
    ["blob", 2, "BlobPane", 2500],
    ["admin/users", 1, "AdminPane", 2500],
    ["admin/names", 1, "AdminPane", 2500],
    ["admin/audit", 1, "AdminPane", 2500],
    ["admin/flagged", 1, "AdminPane", 2500],
    ["admin/tags", 1, "AdminPane", 2500],
    ["no-such-route", 1, null, 1500],
];

const PANE_REQUEST_GAP_MS = 180;
const ADMIN_TOKEN_KEY = "palette-admin-token";
const PAGINATED = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });

async function seedAdmin(page: Page): Promise<void> {
    await page.addInitScript(
        ({ key }) => localStorage.setItem(key, "od19-route-load"),
        { key: ADMIN_TOKEN_KEY },
    );
    await page.route(/\/admin\//, (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: /\/admin\/tags(\?|$)/.test(route.request().url()) ? "[]" : PAGINATED,
        }),
    );
}

/** performance.now() of the first frame holding the route's content, or null. */
function waitContent(page: Page, route: string, regions: number, since: number, limit: number) {
    return page.evaluate(
        async ([route, regions, since, limit]) => {
            const want = `#/${route}`;
            const ok = () => {
                if (location.hash !== want && !(route === "" && location.hash === "")) return false;
                const ws = document.querySelectorAll("main .pane-wrapper");
                if (ws.length < regions) return false;
                for (const w of ws) {
                    if (w.querySelector(".pane-plate")) return false;
                    const c = w.firstElementChild;
                    if (!c || c.getBoundingClientRect().height < 8) return false;
                }
                return document.querySelector("main h1") !== null;
            };
            while (performance.now() - since < limit) {
                const t = await new Promise<number>((r) => requestAnimationFrame(r));
                if (ok()) return t - since;
            }
            return null;
        },
        [route, regions, since, limit] as const,
    );
}

test.describe("OD19-ALL route load (built bundle, CPU 4x)", () => {
    test.describe.configure({ timeout: 120_000 });

    // One throwaway load first: the first context of a fresh browser pays the GPU
    // process and font-cache start-up (measured: the first two cells read 5-12 s
    // without it, ~1 s after it). The cells below still each start cold-cache.
    test.beforeAll(async ({ browser }) => {
        const ctx = await browser.newContext();
        try {
            const page = await ctx.newPage();
            await page.goto("/#/", { waitUntil: "load" }).catch(() => {});
            await page.waitForTimeout(3000);
        } finally {
            await ctx.close();
        }
    });

    for (const [route, regions, chunk, bar] of ROUTES) {
        test(`#/${route || ""} cold: pane chunk early, content ≤ ${bar} ms, hop reaches content`, async ({
            page,
        }) => {
            if (route.startsWith("admin/")) await seedAdmin(page);
            // A cold load issues 300+ requests; the default 250-entry resource buffer drops the tail.
            await page.addInitScript(() => performance.setResourceTimingBufferSize(4000));
            const cdp = await page.context().newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });

            await page.goto(`/#/${route}`, { waitUntil: "commit" });
            const content = await waitContent(page, route, regions, 0, 30_000);
            // X.W11.v1e (COHESION §0gt.7): a resource-timing entry is queued at
            // its responseEnd, and the prerendered `#/` shell reaches content
            // (CI 135-239 ms) before the entry chunk has finished arriving, so a
            // read at the content frame found no `index-*.js` (CI 40807181060 and
            // 40822407656: "the entry chunk loaded", every attempt). The read
            // waits for the entry's own timing entry — the state it measures.
            await page.waitForFunction(() =>
                performance
                    .getEntriesByType("resource")
                    .some((e) => /^index-[^/]*\.js$/.test(e.name.split("/").pop() ?? "")),
            );

            const scripts = await page.evaluate(() =>
                performance
                    .getEntriesByType("resource")
                    .filter((e) => /\.js(\?|$)/.test(e.name))
                    .map((e) => ({
                        file: e.name.split("/").pop() ?? "",
                        start: e.startTime,
                        end: (e as PerformanceResourceTiming).responseEnd,
                    })),
            );
            const entry = scripts.find((s) => /^index-[^/]*\.js$/.test(s.file));
            const pane = chunk ? scripts.find((s) => s.file.startsWith(`${chunk}-`)) : undefined;
            const gap = entry && pane ? Math.round(pane.start - entry.end) : null;
            console.log(
                `[od19-route-load] #/${route} content=${content == null ? "none" : Math.round(content)}ms` +
                    ` paneRequestGap=${gap}ms`,
            );

            expect(entry, "the entry chunk loaded").toBeDefined();
            if (chunk) {
                expect(pane, `${chunk} was requested`).toBeDefined();
                expect(gap!, `${chunk} requested ≤ ${PANE_REQUEST_GAP_MS} ms after the entry`).toBeLessThanOrEqual(
                    PANE_REQUEST_GAP_MS,
                );
            }
            expect(content, `#/${route} reached its content`).not.toBeNull();
            expect(content!).toBeLessThanOrEqual(bar);

            if (route === "") return;
            // The hop: a settled home, then the in-app hash change.
            await page.goto("/#/", { waitUntil: "commit" });
            expect(await waitContent(page, "", 2, 0, 30_000)).not.toBeNull();
            await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
            // The idle warm (usePaneRouter) has landed the route's pane graph: the hop
            // times the in-app swap, not a chunk fetch.
            if (chunk)
                await page.waitForFunction(
                    (c) =>
                        performance
                            .getEntriesByType("resource")
                            .some((e) => (e.name.split("/").pop() ?? "").startsWith(`${c}-`)),
                    chunk,
                    { timeout: 30_000 },
                );
            await page.waitForTimeout(1500);
            const since = await page.evaluate((r) => {
                const t = performance.now();
                location.hash = `#/${r}`;
                return t;
            }, route);
            const hop = await waitContent(page, route, regions, since, 15_000);
            console.log(`[od19-route-load] #/${route} hop=${hop == null ? "none" : Math.round(hop)}ms`);
            expect(hop, `the hop to #/${route} reached its content`).not.toBeNull();
        });
    }
});
