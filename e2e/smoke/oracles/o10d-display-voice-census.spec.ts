import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { openView, expandDock } from "../fixtures/dock";

/**
 * T.W4 W4-6 · O-10d — THE DISPLAY-VOICE FAMILY CENSUS (SYNTHESIS §6.1 O-10d;
 * T-15 · t-title-typography F7; the W4-6 hard-gate row).
 *
 * The three-voice law assigns TITLES to the display voice (Fraunces — the
 * `--font-stack-display` root, style.css). F7's defect class: a title reaches
 * for `text-subheading` as a SIZE rung and silently takes the BODY family
 * (Plus Jakarta Sans 600) with it — the owner's "this font is not right"
 * (t-2006-46, PaletteCard). The W4-6 sweep joined every such site to the
 * display voice at the same optical rung (`font-display font-medium
 * text-subheading` — Fraunces, subheading scale, the ≤500 non-bold register;
 * NON-ITALIC for user-data names, the italic stays reserved for the
 * instrument's own titles). This census is the POPULATION gate — every title
 * surface, not the one card:
 *
 *   1 · the heading population — every visible h1/h2/h3 inside main across
 *       the 7 user-walkable views (pane titles, section headings, markdown
 *       doc headings) speaks Fraunces;
 *   2 · the picker title (`.space-trigger`) — the instrument's own title;
 *   3 · user-data names (PaletteCard, browse wall) — Fraunces, weight 500,
 *       font-style NORMAL (catalog entries, never the instrument italic),
 *       with the `line-clamp-2 sm:line-clamp-1` metrics re-verified under
 *       the serif at desktop AND the 390 phone band;
 *   4 · the gated title surfaces — FlagReportDialog's DialogTitle,
 *       VersionHistoryDrawer's SheetTitle, the action-bar hover-card titles
 *       ("Copy color", "Enter a color") — driven open and censused rendered;
 *   5 · the rename-input morph re-verified under the serif (seeded local
 *       palette: serif title → input focused → Escape → serif title back);
 *   6 · MigratePalettesDialog — SESSION-GATED (slug-migration flow only); a
 *       SOURCE row asserts its DialogTitle carries the register classes (the
 *       byte-honest fallback for the one surface no cheap user path reaches).
 *
 * The AdminFlaggedPanel name row (admin-session-gated) lives in the sibling
 * `admin/o10d-admin-title-voice.spec.ts` (smoke-admin project, populated
 * fixture). NOT title surfaces, deliberately: AlertTitle labels (the
 * ColorNutritionLabel "Definition" alert is the atlas-plate DATA register —
 * the landed A1 body-voice decision, a div, not a heading) and menu/control
 * labels (dock labels, dropdown labels — producer registers).
 *
 * Family predicate: the COMPUTED font-family leads with Fraunces (the
 * declared stack `"Fraunces", "Fraunces Fallback", serif` — computed style
 * returns the specified stack independent of face-load state, so the census
 * is load-order-deterministic).
 */

const DISPLAY_FACE = /^"?Fraunces\b/;

const VIEWS = [
    "Home",
    "Palettes",
    "Browse",
    "Extract",
    "Mix",
    "Generate",
    "Gradient",
] as const;

/** Per-view settle signal — each view settles on its OWN pane heading (the
 *  walk.spec-proven locators; the O-7 census idiom) before the census reads. */
const VIEW_HEADING: Record<(typeof VIEWS)[number], string> = {
    Home: "About the color spaces",
    Palettes: "My Palettes",
    Browse: "Browse",
    Extract: "Extract",
    Mix: "Mix",
    Generate: "Generate",
    Gradient: "Gradient",
};

/** Census every VISIBLE h1/h2/h3 inside main: text + computed type voice. */
async function censusHeadings(page: import("@playwright/test").Page) {
    return page.evaluate(() => {
        const main = document.querySelector("main");
        return Array.from(main?.querySelectorAll("h1, h2, h3") ?? [])
            .filter((el) => el.getClientRects().length > 0)
            .map((el) => {
                const cs = getComputedStyle(el);
                return {
                    text: (el.textContent ?? "").trim().slice(0, 60),
                    fontFamily: cs.fontFamily,
                };
            });
    });
}

/** Computed type voice of one located node. */
async function typeVoice(locator: import("@playwright/test").Locator) {
    return locator.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
            fontFamily: cs.fontFamily,
            fontWeight: cs.fontWeight,
            fontStyle: cs.fontStyle,
            lineClamp:
                (cs as unknown as Record<string, string>).webkitLineClamp ??
                "none",
            overflow: cs.overflow,
        };
    });
}

/** The browse-wall mock for the user-data name rows: one short name, one
 *  LONG name (the clamp probe), one versioned palette (the drawer leg). */
const LONG_NAME =
    "The Unabridged Chromatic Atlas of Every Sunset We Have Ever Archived Together";
const WALL = [
    {
        name: "Census Palette",
        slug: "census-palette",
        userSlug: "gallery",
        colors: [
            { css: "#e11d48", position: 0 },
            { css: "#2563eb", position: 1 },
        ],
        isLocal: false,
        voteCount: 3,
        visibility: "public",
        tier: "standard",
        published: true,
        versionCount: 3,
    },
    {
        name: LONG_NAME,
        slug: "census-long-name",
        userSlug: "gallery",
        colors: [{ css: "#0f766e", position: 0 }],
        isLocal: false,
        voteCount: 1,
        visibility: "public",
        tier: "standard",
        published: true,
    },
];

async function routeCensusWall(page: import("@playwright/test").Page) {
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) => {
            const url = new URL(route.request().url());
            // The drawer leg: versions list for the versioned palette.
            if (/\/versions(\/|$)?/.test(url.pathname)) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
                });
            }
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: WALL, nextCursor: null, hasMore: false }),
            });
        },
    );
}

test("O-10d census — every heading across the 7-view walk speaks the display voice (+ the picker title)", async ({
    page,
}) => {
    test.setTimeout(120_000);
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // The instrument's own title — the ONE italic-sanctioned title surface.
    const spaceTrigger = page.locator(".space-trigger").first();
    await expect(spaceTrigger).toBeVisible();
    const trigger = await typeVoice(spaceTrigger);
    expect(trigger.fontFamily, "picker title off the display face").toMatch(
        DISPLAY_FACE,
    );

    for (const view of VIEWS) {
        if (view !== "Home") await openView(page, view);
        await expect(
            main
                .getByRole("heading", { name: VIEW_HEADING[view] })
                .filter({ visible: true })
                .last(),
        ).toBeVisible();

        const headings = await censusHeadings(page);
        expect(
            headings.length,
            `${view}: census walked zero headings`,
        ).toBeGreaterThan(0);
        for (const h of headings) {
            expect
                .soft(
                    h.fontFamily,
                    `${view}: heading "${h.text}" off the display face`,
                )
                .toMatch(DISPLAY_FACE);
        }

        // The Palettes stop also carries the saved-grid empty state (fresh
        // context, zero saved palettes): the Fraunces statement line.
        if (view === "Palettes") {
            const statement = main
                .locator('[role="status"] p.font-display')
                .filter({ visible: true })
                .first();
            await expect(statement).toBeVisible();
            const voice = await typeVoice(statement);
            expect(
                voice.fontFamily,
                "empty-state statement off the display face",
            ).toMatch(DISPLAY_FACE);
        }
    }
});

test("O-10d census — user-data names (browse wall): display voice, ≤500, non-italic; line-clamp under the serif", async ({
    page,
}) => {
    test.setTimeout(60_000);
    await routeCensusWall(page);
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await openView(page, "Browse");
    await expect(
        main.getByRole("heading", { name: "Browse" }).filter({ visible: true }).last(),
    ).toBeVisible();

    for (const name of ["Census Palette", LONG_NAME]) {
        const title = page
            .getByText(name, { exact: true })
            .filter({ visible: true })
            .first();
        await expect(title).toBeVisible();
        const voice = await typeVoice(title);
        expect(voice.fontFamily, `"${name}" off the display face`).toMatch(
            DISPLAY_FACE,
        );
        // The T-2 non-bold register (F7: ≤500) — the landed rung is 500.
        expect(
            Number(voice.fontWeight),
            `"${name}" heavier than the ≤500 register`,
        ).toBeLessThanOrEqual(500);
        // User-data names are catalog entries — NEVER the instrument italic.
        expect(voice.fontStyle, `"${name}" italicized user data`).toBe("normal");
    }

    // line-clamp re-verified under the serif — desktop (≥sm) locks ONE line.
    const longTitle = page
        .getByText(LONG_NAME, { exact: true })
        .filter({ visible: true })
        .first();
    const desktop = await typeVoice(longTitle);
    expect(desktop.lineClamp, "sm:line-clamp-1 not active at desktop").toBe("1");
    expect(desktop.overflow).toBe("hidden");
    const oneLine = await longTitle.evaluate((el) => {
        const cs = getComputedStyle(el);
        return el.getBoundingClientRect().height <= parseFloat(cs.lineHeight) * 1.5;
    });
    expect(oneLine, "long name overflows its 1-line clamp box").toBe(true);
});

test("O-10d census — the 390 phone band: the card name clamps to TWO lines under the serif", async ({
    page,
}) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await routeCensusWall(page);
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await openView(page, "Browse");

    const longTitle = page
        .getByText(LONG_NAME, { exact: true })
        .filter({ visible: true })
        .first();
    await expect(longTitle).toBeVisible();
    const voice = await typeVoice(longTitle);
    expect(voice.fontFamily, "390: name off the display face").toMatch(
        DISPLAY_FACE,
    );
    expect(voice.lineClamp, "line-clamp-2 not active <sm").toBe("2");
    const twoLinesMax = await longTitle.evaluate((el) => {
        const cs = getComputedStyle(el);
        return el.getBoundingClientRect().height <= parseFloat(cs.lineHeight) * 2.5;
    });
    expect(twoLinesMax, "390: long name exceeds its 2-line clamp box").toBe(true);
});

test("O-10d census — gated title surfaces: report dialog · versions drawer · hover-card titles", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await routeCensusWall(page);
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await openView(page, "Browse");
    await expect(
        main.getByRole("heading", { name: "Browse" }).filter({ visible: true }).last(),
    ).toBeVisible();

    // FlagReportDialog — Report lives on a non-owned remote card's menu.
    const menuButton = main
        .getByRole("button", { name: "Palette menu" })
        .filter({ visible: true })
        .first();
    await menuButton.click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    const reportTitle = page.getByRole("heading", { name: "Report Palette" });
    await expect(reportTitle).toBeVisible();
    const report = await typeVoice(reportTitle);
    expect(report.fontFamily, "Report dialog title off the display face").toMatch(
        DISPLAY_FACE,
    );
    expect(Number(report.fontWeight)).toBeLessThanOrEqual(500);
    await page.keyboard.press("Escape");
    await expect(reportTitle).toBeHidden();

    // VersionHistoryDrawer — Versions on the versioned card's menu.
    await menuButton.click();
    await page.getByRole("menuitem", { name: /Versions/ }).click();
    const drawerTitle = page.getByRole("heading", { name: "Version History" });
    await expect(drawerTitle).toBeVisible();
    const drawer = await typeVoice(drawerTitle);
    expect(drawer.fontFamily, "drawer title off the display face").toMatch(
        DISPLAY_FACE,
    );
    expect(Number(drawer.fontWeight)).toBeLessThanOrEqual(500);
    await page.keyboard.press("Escape");
    await expect(drawerTitle).toBeHidden();

    // Hover-card titles ride the dock's action-bar layer (the proven
    // color-propose choreography: toggle → settle → interact) — on HOME,
    // where the picker action bar lives (the toggle is view-dependent).
    await openView(page, "Home");
    await expect(
        main
            .getByRole("heading", { name: VIEW_HEADING.Home })
            .filter({ visible: true })
            .last(),
    ).toBeVisible();
    await expandDock(page);
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 5000,
    });

    // ActionButton's hover-card title ("Copy color").
    await page.getByRole("button", { name: "Copy color" }).hover();
    const hoverTitle = page.getByText("Copy color", { exact: true });
    await expect(hoverTitle).toBeVisible();
    const hover = await typeVoice(hoverTitle);
    expect(hover.fontFamily, "hover-card title off the display face").toMatch(
        DISPLAY_FACE,
    );
    expect(Number(hover.fontWeight)).toBeLessThanOrEqual(500);
    await page.mouse.move(0, 0);
    await expect(hoverTitle).toBeHidden();

    // ColorInput's hover-card title ("Enter a color") — cycle to the input
    // sub-layer first.
    await page.getByRole("button", { name: "Open color input" }).click();
    const inputEl = page.locator('[aria-label="Enter a CSS color"]');
    await expect(inputEl).toBeVisible();
    await inputEl.hover();
    const inputTitle = page.getByText("Enter a color", { exact: true });
    await expect(inputTitle).toBeVisible();
    const inputVoice = await typeVoice(inputTitle);
    expect(
        inputVoice.fontFamily,
        "color-input hover title off the display face",
    ).toMatch(DISPLAY_FACE);
    expect(Number(inputVoice.fontWeight)).toBeLessThanOrEqual(500);
});

test("O-10d census — the rename-input morph re-verified under the serif (seeded local palette)", async ({
    page,
}) => {
    test.setTimeout(60_000);
    // Seed ONE local palette pre-boot (the palette-save store shape).
    await page.addInitScript(
        ([name]) => {
            localStorage.setItem(
                "color-palettes",
                JSON.stringify({
                    version: 1,
                    palettes: [
                        {
                            id: "o10d-census-local",
                            name,
                            slug: "o10d-census-local",
                            colors: [
                                { css: "#e11d48", position: 0 },
                                { css: "#2563eb", position: 1 },
                            ],
                            isLocal: true,
                            createdAt: "2026-07-10T00:00:00.000Z",
                            updatedAt: "2026-07-10T00:00:00.000Z",
                        },
                    ],
                }),
            );
        },
        ["Census Local Palette"],
    );
    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await openView(page, "Palettes");

    const title = page
        .getByText("Census Local Palette", { exact: true })
        .filter({ visible: true })
        .first();
    await expect(title).toBeVisible();
    const voice = await typeVoice(title);
    expect(voice.fontFamily, "local card name off the display face").toMatch(
        DISPLAY_FACE,
    );
    expect(voice.fontStyle).toBe("normal");

    // The serif title yields to the rename input (S.W5-7: never the same
    // string twice) — the input mounts focused; Escape restores the title.
    await title.click();
    const renameInput = page
        .getByPlaceholder("Palette name...")
        .filter({ visible: true })
        .first();
    await expect(renameInput).toBeVisible();
    await expect(renameInput).toBeFocused();
    await expect(title).toBeHidden();
    await renameInput.press("Escape");
    await expect(
        page
            .getByText("Census Local Palette", { exact: true })
            .filter({ visible: true })
            .first(),
    ).toBeVisible();
});

test("O-10d census — MigratePalettesDialog (session-gated): the SOURCE register row", () => {
    // The slug-migration dialog opens only inside the account-switch flow —
    // no cheap user path reaches it in this project. The census therefore
    // pins the SOURCE: its DialogTitle must carry the display-voice register
    // classes (the byte-honest guard against the F7 regression class).
    const sfc = readFileSync(
        fileURLToPath(
            new URL(
                "../../../demo/@/components/custom/palette-browser/dialog/MigratePalettesDialog.vue",
                import.meta.url,
            ),
        ),
        "utf8",
    );
    const titleLine = sfc
        .split("\n")
        .find((l) => l.includes("<DialogTitle"));
    expect(titleLine, "MigratePalettesDialog lost its DialogTitle").toBeTruthy();
    expect(
        titleLine,
        "MigratePalettesDialog title off the display-voice register",
    ).toMatch(/font-display/);
    expect(titleLine).toMatch(/font-medium/);
});
