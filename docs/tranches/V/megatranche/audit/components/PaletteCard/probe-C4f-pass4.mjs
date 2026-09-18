// CHALLENGE-C pass 4 — probe F. READ-ONLY.
// The REMOTE card legs, reached with the same route-mock the e2e delete flow
// uses (e2e/smoke/flows/palette-delete.spec.ts:26-34):
//   F1  the vote button's toggle semantics
//   F2  the copy-slug control's measured size
//   F3  under PRM: after collapse, is the retained zero-height panel's button
//       still in the tab order? (the keyboard consequence of the leave leak)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4f-pass4-results.json", import.meta.url).pathname;
const R = {};

const REMOTE = {
    slug: "fading-amber", name: "Fading Amber",
    colors: [{ css: "#ec0", position: 0 }, { css: "#b80", position: 1 }, { css: "#640", position: 2 }],
    userSlug: "test-user", voteCount: 3, voted: true, isLocal: false,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    visibility: "public", tier: "standard",
};

const main = async () => {
    const browser = await chromium.launch();
    for (const mode of ["no-prm", "prm"]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 1000 },
            ...(mode === "prm" ? { reducedMotion: "reduce" } : {}),
        });
        const page = await ctx.newPage();
        page.setDefaultTimeout(90000);
        page.setDefaultNavigationTimeout(90000);
        await page.route("**/palettes?**", (route) => route.fulfill({
            status: 200, contentType: "application/json",
            body: JSON.stringify({ data: [REMOTE], total: 1, limit: 50, offset: 0 }),
        }));
        await page.goto("http://localhost:9000/#/browse", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(3500);

        const card = page.locator('[role="article"]').first();
        const present = await card.count();
        if (!present) { R[mode] = { ERROR: "no remote card rendered" }; await ctx.close(); continue; }

        const vote = await page.evaluate(() => {
            const b = document.querySelector('[role="article"] button[aria-label*="votes"]');
            if (!b) return { present: false };
            const r = b.getBoundingClientRect();
            return {
                present: true, ariaPressed: b.getAttribute("aria-pressed"),
                ariaLabel: b.getAttribute("aria-label"), role: b.getAttribute("role"),
                w: +r.width.toFixed(1), h: +r.height.toFixed(1),
            };
        });

        await card.click({ position: { x: 300, y: 60 } });
        await page.waitForTimeout(1600);
        const expanded = await page.evaluate(() => {
            const card = document.querySelector('[role="article"]');
            const panel = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"));
            const copy = panel?.querySelector('button[aria-label^="Copy slug"]');
            const r = copy?.getBoundingClientRect();
            return {
                panelPresent: !!panel,
                copySlugButton: copy ? { w: +r.width.toFixed(1), h: +r.height.toFixed(1), label: copy.getAttribute("aria-label") } : null,
                panelInline: panel?.getAttribute("style") ?? null,
            };
        });

        await card.click({ position: { x: 300, y: 60 } });   // collapse
        await page.waitForTimeout(2200);
        const collapsed = await page.evaluate(() => {
            const card = document.querySelector('[role="article"]');
            const panel = [...card.querySelectorAll(".overflow-hidden")].find((d) => d.querySelector(".flex-wrap"));
            const copy = panel?.querySelector('button[aria-label^="Copy slug"]');
            const cs = copy ? getComputedStyle(copy) : null;
            const r = copy?.getBoundingClientRect();
            return {
                panelPresent: !!panel,
                panelInline: panel?.getAttribute("style") ?? null,
                panelClientH: panel?.clientHeight ?? null,
                copyStillInDom: !!copy,
                copyRect: r ? { w: +r.width.toFixed(1), h: +r.height.toFixed(1) } : null,
                copyVisibility: cs ? { display: cs.display, visibility: cs.visibility } : null,
            };
        });

        // tab-walk: does focus enter the retained (invisible) panel?
        const focusWalk = [];
        for (let i = 0; i < 30; i++) {
            await page.keyboard.press("Tab");
            const d = await page.evaluate(() => {
                const a = document.activeElement;
                if (!a) return null;
                const panel = [...document.querySelectorAll('[role="article"] .overflow-hidden')].find((d) => d.querySelector(".flex-wrap"));
                const r = a.getBoundingClientRect();
                return {
                    name: a.getAttribute("aria-label") ?? (a.textContent ?? "").trim().slice(0, 22),
                    insideRetainedPanel: !!(panel && panel.contains(a)),
                    rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
                };
            });
            if (d && d.insideRetainedPanel) focusWalk.push(d);
        }
        R[mode] = { vote, expanded, collapsed, focusStopsInsideRetainedPanel: focusWalk };
        await ctx.close();
    }
    await browser.close();
    writeFileSync(OUT, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
