import { test, expect, type Page } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * T.W6 — THE T-31 DOCK-ATOP BAND ORACLE (MANDATE §0.5, owner-verbatim: "our
 * core layout should have the dock atop, with the card/scene area on the
 * bottom below that"; the pass-B §3 sharpened structural spec).
 *
 * The occlusion CLASS dies STRUCTURALLY — never by z-index patching:
 * `.app-layout` is a two-band grid (`auto 1fr`), the <nav> dock band is
 * in-flow/static, the scene band sits below behind the designed --dock-gap
 * row-gap, and the retired trio (fixed overlay · --dock-total reservation ·
 * load-bearing z-dock) is asserted DEAD. `elementFromPoint` over the dock
 * band is NEVER a card surface — probed views × scroll × both schemes ×
 * 390 × the pass-B short-viewport worst case × the ultra-wide pin.
 */

/** Grid-sample the dock band; return any card-surface hits (empty = law holds). */
async function probeDockBand(page: Page): Promise<string[]> {
    return page.evaluate(() => {
        const nav = document.querySelector(
            'nav[aria-label="Application navigation"]',
        );
        if (!nav) return ["NO NAV BAND FOUND"];
        const r = nav.getBoundingClientRect();
        const offenders: string[] = [];
        const cols = 20;
        const rows = 5;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = r.left + ((i + 0.5) / cols) * r.width;
                const y = r.top + ((j + 0.5) / rows) * r.height;
                const el = document.elementFromPoint(x, y);
                if (!el) continue;
                if (el.closest(".pane-container, .pane-wrapper, .pane-main")) {
                    offenders.push(
                        `${x.toFixed(0)},${y.toFixed(0)} → ${(el as HTMLElement).className}`,
                    );
                }
            }
        }
        return offenders;
    });
}

async function setScheme(page: Page, scheme: "light" | "dark"): Promise<void> {
    await page.evaluate(
        (s) => document.documentElement.classList.toggle("dark", s === "dark"),
        scheme,
    );
    await page.waitForTimeout(120);
}

/**
 * COLD-BOOT WARM-UP (recorded, not a gate-weakening): the very first page
 * load of a fresh SwiftShader browser process can leave the W2 dock-arrival
 * veil unreleased for 20–30s+ (the mount-morph settle race under a cold
 * software-GL boot). LIVE-BISECTED PRE-EXISTING: reproduced identically at
 * the pre-T-31 head (`c237d24`, fixed-overlay layout) — a W2 boot-chain
 * residual outside this lane's bounds, recorded in the lane close artefacts
 * for the W8 slate. One throwaway navigation warms the process so every
 * asserted load below observes the app's designed steady behavior.
 */
test.beforeAll(async ({ browser }) => {
    test.setTimeout(90000); // the stuck cold load can eat the default 30s
    // beforeAll sees worker fixtures only — resolve the origin the same way
    // playwright.config.ts does (the lane-unique VJS_E2E_PORT seam).
    const origin = `http://localhost:${process.env.VJS_E2E_PORT ?? 8090}`;
    const page = await browser.newPage();
    await page.goto(origin);
    await page
        .waitForSelector(".glass-dock", { timeout: 45000 })
        .catch(() => {});
    await page.close();
});

test.describe("T-31 · band structure (the retired trio stays dead)", () => {
    test("two-band grid, in-flow static nav, zero z-index arms, designed gap", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        const s = await page.evaluate(() => {
            const layout = document.querySelector(".app-layout")!;
            const nav = document.querySelector("nav.dock-band")!;
            const main = document.querySelector("main.pane-main")!;
            const wrapper = nav.firstElementChild!;
            const cs = getComputedStyle(layout);
            const navCs = getComputedStyle(nav);
            const navR = nav.getBoundingClientRect();
            const mainR = main.getBoundingClientRect();
            return {
                display: cs.display,
                rowCount: cs.gridTemplateRows.trim().split(/\s+/).length,
                rowGap: parseFloat(cs.rowGap),
                navPosition: navCs.position,
                navInset: `${navCs.top} ${navCs.right} ${navCs.bottom} ${navCs.left}`,
                navZ: navCs.zIndex,
                wrapperPosition: getComputedStyle(wrapper).position,
                wrapperZ: getComputedStyle(wrapper).zIndex,
                bandFloor: navR.height,
                sceneBelow: mainR.top - navR.bottom,
            };
        });
        // The band layout is REAL structure…
        expect(s.display).toBe("grid");
        expect(s.rowCount).toBe(2);
        // …behind a DESIGNED gap (the 0–1px arithmetic clearance is dead)…
        expect(s.rowGap).toBeGreaterThanOrEqual(7);
        expect(s.sceneBelow).toBeGreaterThanOrEqual(s.rowGap - 1);
        // …with the nav IN-FLOW (never fixed/absolute/sticky — `relative` is
        // the band-chrome positioning context for the W6-6 lamp, offsets all
        // auto, so the band occupies its grid row exactly) and ZERO z-index
        // arms (the paint order no longer depends on any token chain — the
        // P9 class killed).
        expect(["static", "relative"]).toContain(s.navPosition);
        // Zero offsets (Chromium computes relative auto-offsets as 0px).
        expect(s.navInset).toMatch(/^(auto|0px)( (auto|0px)){3}$/);
        expect(s.navZ).toBe("auto");
        expect(s.wrapperPosition).toBe("static");
        expect(s.wrapperZ).toBe("auto");
        // The band floors at --dock-band-min-h (the expanded-pill reservation)
        // so the collapse morph never jitters it (T-57, asserted invariant in
        // the census extension below).
        expect(s.bandFloor).toBeGreaterThanOrEqual(40);
    });

    test("the retired utilities are gone from the dock root (fixed/z-dock/top-dock-inset)", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        const cls = await page.evaluate(
            () =>
                document.querySelector("nav.dock-band")!.firstElementChild!
                    .className,
        );
        expect(cls).not.toMatch(/\bfixed\b|z-dock|top-dock-inset/);
    });
});

test.describe("T-31/T-57 · band-height invariance across the collapse↔expand morph", () => {
    /**
     * T.W8 · P9-R2/WR-9 — the census extension the §0.7 T-57 amendment orders.
     * The dock idle-collapses to the seal (shorter) and re-expands to the pill
     * (taller); before the cure the band tracked that height change (expanded
     * 71.4px, collapsed 65.4px) and shifted the centred scene +3.0px on every
     * cycle. The T-31 band law now EXTENDS to the collapse↔expand axis: the
     * band floors at --dock-band-min-h (the expanded-pill reservation), so the
     * band height AND the scene top are INVARIANT across the whole morph — by
     * construction, never a z/margin patch. Born-RED against the pre-cure 3px
     * reflow (this asserts ≤1px).
     */
    test("the band height + scene top never change across seal↔pill (T-57 reflow cure)", async ({
        page,
    }) => {
        test.setTimeout(30000);
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await page.waitForTimeout(3500); // overture settle

        const read = () =>
            page.evaluate(() => {
                const band = document
                    .querySelector("nav.dock-band")!
                    .getBoundingClientRect();
                const pane = document
                    .querySelector(".pane-container")
                    ?.getBoundingClientRect();
                const dock = document.querySelector(".glass-dock")!;
                return {
                    bandH: band.height,
                    paneTop: pane?.top ?? null,
                    collapsed: dock.className.includes("collapsed"),
                };
            });

        // Arm the producer collapse timer (hover then leave the dock).
        const dockBox = (await page.locator(".glass-dock").boundingBox())!;
        await page.mouse.move(
            dockBox.x + dockBox.width / 2,
            dockBox.y + dockBox.height / 2,
        );
        await page.waitForTimeout(300);
        const expanded = await read();

        // Leave the dock; the producer collapse-delay (5000ms) fires the morph.
        await page.mouse.move(dockBox.x + dockBox.width / 2, dockBox.y + 320);
        await expect
            .poll(async () => (await read()).collapsed, { timeout: 12000 })
            .toBe(true);
        const collapsed = await read();

        // Re-expand by hovering back onto the dock band.
        await page.mouse.move(dockBox.x + dockBox.width / 2, dockBox.y + 8);
        await expect
            .poll(async () => (await read()).collapsed, { timeout: 6000 })
            .toBe(false);
        const reexpanded = await read();

        // INVARIANCE — the band never changes height, the scene never shifts
        // (≤1px sub-pixel; the pre-cure defect was 6px band / 3px scene).
        expect(
            Math.abs(collapsed.bandH - expanded.bandH),
            `band height changed on collapse (${expanded.bandH}→${collapsed.bandH})`,
        ).toBeLessThanOrEqual(1);
        expect(
            Math.abs(reexpanded.bandH - expanded.bandH),
            `band height changed on re-expand (${expanded.bandH}→${reexpanded.bandH})`,
        ).toBeLessThanOrEqual(1);
        expect(
            Math.abs((collapsed.paneTop ?? 0) - (expanded.paneTop ?? 0)),
            `scene shifted on collapse (${expanded.paneTop}→${collapsed.paneTop})`,
        ).toBeLessThanOrEqual(1);
        expect(
            Math.abs((reexpanded.paneTop ?? 0) - (expanded.paneTop ?? 0)),
            `scene shifted on re-expand (${expanded.paneTop}→${reexpanded.paneTop})`,
        ).toBeLessThanOrEqual(1);
    });
});

test.describe("T-31 · occlusion probe @1280 (views × scroll × schemes)", () => {
    for (const scheme of ["light", "dark"] as const) {
        test(`the dock band is never a card — ${scheme}`, async ({ page }) => {
            await page.goto("/");
            await page.waitForSelector(".glass-dock");
            await setScheme(page, scheme);

            // Default view (picker), at rest.
            expect(await probeDockBand(page)).toEqual([]);

            // Palettes (the browse wall — the scrollable card population).
            await openView(page, "Palettes");
            await page.waitForTimeout(400); // dock settle beat
            expect(await probeDockBand(page)).toEqual([]);

            // Scrolled: pane content scrolls INTERNALLY (the shell clips) —
            // the band must stay card-free mid-scroll and after.
            await page.mouse.move(640, 400);
            await page.mouse.wheel(0, 800);
            await page.waitForTimeout(200);
            expect(await probeDockBand(page)).toEqual([]);

            // Mix (a third pane composition).
            await openView(page, "Mix");
            await page.waitForTimeout(400);
            expect(await probeDockBand(page)).toEqual([]);
        });
    }
});

test.describe("T-31 · occlusion probe @390 (the mobile band)", () => {
    test.use({ viewport: { width: 390, height: 844 } });
    for (const scheme of ["light", "dark"] as const) {
        test(`the dock band is never a card — 390 ${scheme}`, async ({
            page,
        }) => {
            await page.goto("/");
            await page.waitForSelector(".glass-dock");
            await setScheme(page, scheme);
            expect(await probeDockBand(page)).toEqual([]);

            await openView(page, "Palettes");
            await page.waitForTimeout(400);
            expect(await probeDockBand(page)).toEqual([]);

            await page.mouse.move(195, 500);
            await page.mouse.wheel(0, 800);
            await page.waitForTimeout(200);
            expect(await probeDockBand(page)).toEqual([]);
        });
    }
});

test.describe("T-31 · the pass-B worst case (short viewport)", () => {
    test.use({ viewport: { width: 1100, height: 430 } });
    test("the flush 0–1px clearance is dead — band and card never touch", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        expect(await probeDockBand(page)).toEqual([]);
        // The About card's top edge used to press flush against the pill
        // (overlap-1100x430.png). Structurally: the scene band starts a full
        // designed gap below the dock band.
        const gap = await page.evaluate(() => {
            const nav = document
                .querySelector("nav.dock-band")!
                .getBoundingClientRect();
            const main = document
                .querySelector("main.pane-main")!
                .getBoundingClientRect();
            return main.top - nav.bottom;
        });
        expect(gap).toBeGreaterThanOrEqual(7);
    });
});

test.describe("T-31 · the ultra-wide pin (re-confirmed in-band)", () => {
    test.use({ viewport: { width: 2560, height: 1080 } });
    test("the dock keeps its pinned-at-top read — the band IS the top", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        const navTop = await page.evaluate(
            () =>
                document.querySelector("nav.dock-band")!.getBoundingClientRect()
                    .top,
        );
        // In-flow at the shell's own --dock-inset padding (≤1rem) — pinned
        // at the top, never floating with the centred content.
        expect(navTop).toBeLessThanOrEqual(20);
        expect(await probeDockBand(page)).toEqual([]);
    });
});
