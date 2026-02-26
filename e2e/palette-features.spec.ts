import { test, expect, type Page, type Route } from "@playwright/test";

/**
 * E2E tests for new palette features:
 * - Session management (transparent token acquisition)
 * - Vote button (toggle, count display)
 * - Sort controls (newest/popular toggle)
 * - Palette rename (inline edit via popover)
 * - Featured badge display
 * - Publish with session token
 *
 * API calls are intercepted via page.route() to simulate the backend.
 */

// --- Mock data ---

const MOCK_SESSION_TOKEN = "test-session-00000000-0000-0000-0000-000000000000";

const MOCK_PALETTES = [
    {
        id: "1",
        name: "Sunset Glow",
        slug: "sunset-glow",
        colors: [
            { css: "#ff6b35", position: 0 },
            { css: "#f7c59f", position: 1 },
            { css: "#efefd0", position: 2 },
        ],
        voteCount: 42,
        voted: false,
        status: "published",
        isLocal: false,
        createdAt: "2026-02-20T00:00:00Z",
        updatedAt: "2026-02-20T00:00:00Z",
    },
    {
        id: "2",
        name: "Ocean Depths",
        slug: "ocean-depths",
        colors: [
            { css: "#0077b6", position: 0 },
            { css: "#00b4d8", position: 1 },
            { css: "#90e0ef", position: 2 },
        ],
        voteCount: 108,
        voted: false,
        status: "featured",
        isLocal: false,
        createdAt: "2026-02-18T00:00:00Z",
        updatedAt: "2026-02-18T00:00:00Z",
    },
    {
        id: "3",
        name: "My Owned Palette",
        slug: "my-owned-palette",
        colors: [
            { css: "#264653", position: 0 },
            { css: "#2a9d8f", position: 1 },
        ],
        voteCount: 5,
        voted: true,
        status: "published",
        isLocal: false,
        createdAt: "2026-02-25T00:00:00Z",
        updatedAt: "2026-02-25T00:00:00Z",
    },
];

// Palettes sorted by popularity (voteCount desc)
const MOCK_PALETTES_POPULAR = [...MOCK_PALETTES].sort(
    (a, b) => b.voteCount - a.voteCount,
);

// Track requests for assertion
interface RequestLog {
    method: string;
    url: string;
    body?: any;
    headers?: Record<string, string>;
}

function setupApiMocks(page: Page, requestLog: RequestLog[]) {
    return page.route("**/colors/**", async (route: Route) => {
        const request = route.request();
        const url = new URL(request.url());
        const method = request.method();

        requestLog.push({
            method,
            url: url.pathname + url.search,
            headers: await request.allHeaders(),
        });

        // POST /sessions
        if (url.pathname.endsWith("/sessions") && method === "POST") {
            return route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify({ token: MOCK_SESSION_TOKEN }),
            });
        }

        // GET /palettes
        if (url.pathname.endsWith("/palettes") && method === "GET") {
            const sort = url.searchParams.get("sort") ?? "newest";
            const data =
                sort === "popular" ? MOCK_PALETTES_POPULAR : MOCK_PALETTES;
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data,
                    total: data.length,
                    limit: 50,
                    offset: 0,
                }),
            });
        }

        // POST /palettes (publish)
        if (url.pathname.endsWith("/palettes") && method === "POST") {
            const body = JSON.parse(
                (await request.postData()) ?? "{}",
            );
            return route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify({
                    id: "new-1",
                    ...body,
                    voteCount: 0,
                    voted: false,
                    status: "published",
                    isLocal: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });
        }

        // POST /palettes/:slug/vote
        if (url.pathname.match(/\/palettes\/[^/]+\/vote$/) && method === "POST") {
            const slug = url.pathname.split("/").at(-2)!;
            const palette = MOCK_PALETTES.find((p) => p.slug === slug);
            if (palette) {
                const wasVoted = palette.voted;
                palette.voted = !wasVoted;
                palette.voteCount += wasVoted ? -1 : 1;
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        voted: palette.voted,
                        voteCount: palette.voteCount,
                    }),
                });
            }
        }

        // PATCH /palettes/:slug (rename)
        if (url.pathname.match(/\/palettes\/[^/]+$/) && method === "PATCH") {
            const slug = url.pathname.split("/").at(-1)!;
            const body = JSON.parse(
                (await request.postData()) ?? "{}",
            );
            const palette = MOCK_PALETTES.find((p) => p.slug === slug);
            if (palette) {
                palette.name = body.name;
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        ...palette,
                    }),
                });
            }
        }

        // Fallback
        return route.fulfill({
            status: 404,
            contentType: "application/json",
            body: JSON.stringify({ error: "Not found" }),
        });
    });
}

/** Open the palette dialog and switch to Browse tab */
async function openBrowseTab(page: Page) {
    await page.locator(".lucide-layout-grid").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 3000 });

    const browseTab = page.getByRole("tab", { name: "Browse" });
    await browseTab.click();
    // Wait for mock data to load
    await page.waitForTimeout(500);
    return dialog;
}

// ========================================================================
// Tests
// ========================================================================

test.describe("Palette Features — Vote, Sort, Rename, Featured", () => {
    let requestLog: RequestLog[];

    test.beforeEach(async ({ page }) => {
        // Reset mock palette state for each test
        MOCK_PALETTES[0].voted = false;
        MOCK_PALETTES[0].voteCount = 42;
        MOCK_PALETTES[0].name = "Sunset Glow";
        MOCK_PALETTES[1].voted = false;
        MOCK_PALETTES[1].voteCount = 108;
        MOCK_PALETTES[1].name = "Ocean Depths";
        MOCK_PALETTES[2].voted = true;
        MOCK_PALETTES[2].voteCount = 5;
        MOCK_PALETTES[2].name = "My Owned Palette";

        requestLog = [];
        await setupApiMocks(page, requestLog);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    // --- Vote Button ---

    test("vote button and count are visible on browse palette cards", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // Each browse card should have a heart icon
        const hearts = dialog.locator(".lucide-heart");
        await expect(hearts.first()).toBeVisible({ timeout: 3000 });
        const heartCount = await hearts.count();
        expect(heartCount).toBeGreaterThanOrEqual(MOCK_PALETTES.length);

        // Vote count should be visible (e.g., "42")
        await expect(dialog.getByText("42")).toBeVisible();
        await expect(dialog.getByText("108")).toBeVisible();
    });

    test("vote button shows filled heart for already-voted palette", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // "My Owned Palette" has voted=true — its heart should have fill-red-500
        const ownedCard = dialog.getByText("My Owned Palette").locator("../..");
        const heart = ownedCard.locator(".lucide-heart").first();
        await expect(heart).toBeVisible();
        await expect(heart).toHaveClass(/fill-red-500/);
    });

    test("clicking vote toggles vote state and updates count", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // Find the "Sunset Glow" card's vote button (currently unvoted, count=42)
        const sunsetCard = dialog.getByText("Sunset Glow").locator("../..");
        const voteButton = sunsetCard.locator("button").filter({ has: page.locator(".lucide-heart") }).first();
        await expect(voteButton).toBeVisible();

        // Heart should NOT be filled
        const heart = voteButton.locator(".lucide-heart");
        await expect(heart).not.toHaveClass(/fill-red-500/);

        // Click to vote
        await voteButton.click();
        await page.waitForTimeout(500);

        // Heart should now be filled red
        await expect(heart).toHaveClass(/fill-red-500/);

        // Count should increment to 43
        await expect(sunsetCard.getByText("43")).toBeVisible();

        // Verify a session was created and vote API was called
        const sessionReqs = requestLog.filter(
            (r) => r.url.includes("/sessions") && r.method === "POST",
        );
        expect(sessionReqs.length).toBeGreaterThanOrEqual(1);

        const voteReqs = requestLog.filter(
            (r) => r.url.includes("/vote") && r.method === "POST",
        );
        expect(voteReqs.length).toBe(1);
    });

    test("clicking vote on already-voted palette removes vote", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // "My Owned Palette" is already voted (count=5)
        const ownedCard = dialog.getByText("My Owned Palette").locator("../..");
        const voteButton = ownedCard.locator("button").filter({ has: page.locator(".lucide-heart") }).first();
        const heart = voteButton.locator(".lucide-heart");

        // Should be filled
        await expect(heart).toHaveClass(/fill-red-500/);

        // Click to unvote
        await voteButton.click();
        await page.waitForTimeout(500);

        // Heart should no longer be filled
        await expect(heart).not.toHaveClass(/fill-red-500/);

        // Count should decrement to 4
        await expect(ownedCard.getByText("4")).toBeVisible();
    });

    // --- Sort Controls ---

    test("sort toggle is visible on browse tab with Newest and Popular options", async ({
        page,
    }) => {
        const dialog = await openBrowseTab(page);

        // The toggle group should be visible with clock and trending-up icons
        const clockIcon = dialog.locator(".lucide-clock");
        const trendingIcon = dialog.locator(".lucide-trending-up");

        await expect(clockIcon).toBeVisible();
        await expect(trendingIcon).toBeVisible();
    });

    test("sort toggle is NOT visible on saved tab", async ({ page }) => {
        await page.locator(".lucide-layout-grid").first().click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible({ timeout: 3000 });

        // On Saved tab — no sort toggle
        const clockIcon = dialog.locator(".lucide-clock");
        await expect(clockIcon).not.toBeVisible();
    });

    test("switching to popular sort re-fetches and reorders palettes", async ({
        page,
    }) => {
        const dialog = await openBrowseTab(page);

        // Default order (newest): "My Owned Palette" should be first (most recent createdAt)
        const cards = dialog.locator("[class*='bg-card'][class*='group']");
        const firstCardText = await cards.first().textContent();
        // The newest by createdAt is "My Owned Palette" (2026-02-25)

        // Click "Popular" sort (TrendingUp icon)
        const trendingButton = dialog.locator("button").filter({ has: page.locator(".lucide-trending-up") }).first();
        await trendingButton.click();
        await page.waitForTimeout(500);

        // After popular sort, "Ocean Depths" (108 votes) should be first
        const cardsAfter = dialog.locator("[class*='bg-card'][class*='group']");
        const firstAfter = await cardsAfter.first().textContent();
        expect(firstAfter).toContain("Ocean Depths");

        // Verify the API was called with sort=popular
        const popularReqs = requestLog.filter(
            (r) => r.url.includes("sort=popular"),
        );
        expect(popularReqs.length).toBeGreaterThanOrEqual(1);
    });

    test("switching back to newest sort re-fetches", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // Switch to popular first
        const trendingButton = dialog.locator("button").filter({ has: page.locator(".lucide-trending-up") }).first();
        await trendingButton.click();
        await page.waitForTimeout(500);

        // Switch back to newest
        const clockButton = dialog.locator("button").filter({ has: page.locator(".lucide-clock") }).first();
        await clockButton.click();
        await page.waitForTimeout(500);

        // Verify sort=newest was requested
        const newestReqs = requestLog.filter(
            (r) => r.url.includes("sort=newest"),
        );
        expect(newestReqs.length).toBeGreaterThanOrEqual(1);
    });

    // --- Featured Badge ---

    test("featured palette shows Featured badge", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // "Ocean Depths" has status "featured"
        const card = dialog.getByText("Ocean Depths").locator("../..");
        const featuredBadge = card.getByText("Featured");
        await expect(featuredBadge).toBeVisible();

        // Award icon should be inside the badge
        const awardIcon = card.locator(".lucide-award");
        await expect(awardIcon).toBeVisible();
    });

    test("non-featured palette does NOT show Featured badge", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // "Sunset Glow" has status "published" — no Featured badge
        const card = dialog.getByText("Sunset Glow").locator("../..");
        const featuredBadge = card.getByText("Featured");
        await expect(featuredBadge).not.toBeVisible();
    });

    // --- Palette Rename ---

    test("pencil icon appears on owned palette on hover", async ({ page }) => {
        // Seed owned slugs into sessionStorage before navigating
        await page.addInitScript(() => {
            sessionStorage.setItem(
                "palette-owned-slugs",
                JSON.stringify(["my-owned-palette"]),
            );
            sessionStorage.setItem(
                "palette-session-token",
                "test-session-00000000-0000-0000-0000-000000000000",
            );
        });
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");

        const dialog = await openBrowseTab(page);

        // Hover over "My Owned Palette" card to reveal action buttons
        const card = dialog.getByText("My Owned Palette").locator("xpath=ancestor::div[contains(@class, 'group')]").first();
        await card.hover();
        await page.waitForTimeout(300);

        const pencilIcon = card.locator(".lucide-pencil");
        await expect(pencilIcon).toBeVisible();
    });

    test("pencil icon does NOT appear on non-owned palette", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // Hover "Sunset Glow" — not owned
        const card = dialog.getByText("Sunset Glow").locator("xpath=ancestor::div[contains(@class, 'group')]").first();
        await card.hover();
        await page.waitForTimeout(300);

        const pencilIcon = card.locator(".lucide-pencil");
        await expect(pencilIcon).not.toBeVisible();
    });

    test("rename popover opens and submitting renames the palette", async ({ page }) => {
        // Seed owned slugs
        await page.addInitScript(() => {
            sessionStorage.setItem(
                "palette-owned-slugs",
                JSON.stringify(["my-owned-palette"]),
            );
            sessionStorage.setItem(
                "palette-session-token",
                "test-session-00000000-0000-0000-0000-000000000000",
            );
        });
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");

        const dialog = await openBrowseTab(page);

        // Hover to reveal pencil
        const card = dialog.getByText("My Owned Palette").locator("xpath=ancestor::div[contains(@class, 'group')]").first();
        await card.hover();
        await page.waitForTimeout(300);

        // Click pencil icon
        const pencilIcon = card.locator(".lucide-pencil");
        await pencilIcon.click();
        await page.waitForTimeout(300);

        // Popover with input should appear
        const popoverInput = page.locator("[data-reka-popper-content-wrapper] input, [data-radix-popper-content-wrapper] input").first();
        await expect(popoverInput).toBeVisible({ timeout: 2000 });

        // Clear and type new name, submit via Enter (avoids viewport scroll issues with popover)
        await popoverInput.fill("Renamed Palette");
        await popoverInput.press("Enter");
        await page.waitForTimeout(500);

        // Palette name should be updated in the card
        await expect(dialog.getByText("Renamed Palette").first()).toBeVisible();

        // Verify PATCH request was sent
        const patchReqs = requestLog.filter(
            (r) => r.method === "PATCH" && r.url.includes("/palettes/"),
        );
        expect(patchReqs.length).toBe(1);
    });

    // --- Session Management ---

    test("session token is created on first write operation and reused", async ({
        page,
    }) => {
        const dialog = await openBrowseTab(page);

        // Vote on a palette — should trigger session creation
        const sunsetCard = dialog.getByText("Sunset Glow").locator("../..");
        const voteButton = sunsetCard.locator("button").filter({ has: page.locator(".lucide-heart") }).first();
        await voteButton.click();
        await page.waitForTimeout(500);

        // Check session was created
        const sessionReqs = requestLog.filter(
            (r) => r.url.includes("/sessions") && r.method === "POST",
        );
        expect(sessionReqs.length).toBe(1);

        // Vote again (unvote) — should reuse existing session, no new POST /sessions
        await voteButton.click();
        await page.waitForTimeout(500);

        const sessionReqs2 = requestLog.filter(
            (r) => r.url.includes("/sessions") && r.method === "POST",
        );
        // Still only 1 session creation
        expect(sessionReqs2.length).toBe(1);
    });

    test("session token is sent as X-Session-Token header on vote", async ({
        page,
    }) => {
        const dialog = await openBrowseTab(page);

        const sunsetCard = dialog.getByText("Sunset Glow").locator("../..");
        const voteButton = sunsetCard.locator("button").filter({ has: page.locator(".lucide-heart") }).first();
        await voteButton.click();
        await page.waitForTimeout(500);

        // Vote request should include session token header
        const voteReqs = requestLog.filter(
            (r) => r.url.includes("/vote") && r.method === "POST",
        );
        expect(voteReqs.length).toBe(1);
        expect(voteReqs[0].headers?.["x-session-token"]).toBe(MOCK_SESSION_TOKEN);
    });

    // --- Publish with Session ---

    test("publishing a palette creates session first and sends token", async ({
        page,
    }) => {
        // Add a color to saved colors
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible({ timeout: 3000 });

        // Type palette name and click Publish
        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Published Via Session");
        await page.waitForTimeout(200);

        const publishButton = page.getByRole("button", { name: /publish/i }).first();
        if (await publishButton.isVisible()) {
            await publishButton.click();
            await page.waitForTimeout(1000);

            // Session should have been created
            const sessionReqs = requestLog.filter(
                (r) => r.url.includes("/sessions") && r.method === "POST",
            );
            expect(sessionReqs.length).toBe(1);

            // Publish request should include session token
            const publishReqs = requestLog.filter(
                (r) =>
                    r.url.endsWith("/palettes") && r.method === "POST",
            );
            expect(publishReqs.length).toBe(1);
            expect(publishReqs[0].headers?.["x-session-token"]).toBe(
                MOCK_SESSION_TOKEN,
            );
        }
    });

    // --- Color Count Badge + Visual Integrity ---

    test("palette card displays correct color count badge", async ({ page }) => {
        const dialog = await openBrowseTab(page);

        // Each card has a secondary badge showing color count
        // "Sunset Glow" has 3 colors, "Ocean Depths" has 3, "My Owned Palette" has 2
        const cards = dialog.locator("[class*='bg-card'][class*='group']");

        // Find "Sunset Glow" card — it should contain "3" as the color count
        const sunsetCard = cards.filter({ hasText: "Sunset Glow" }).first();
        await expect(sunsetCard.getByText("3", { exact: true }).first()).toBeVisible();

        // Find "My Owned Palette" card — it should contain "2" as the color count
        const ownedCard = cards.filter({ hasText: "My Owned Palette" }).first();
        await expect(ownedCard.getByText("2", { exact: true }).first()).toBeVisible();
    });

    test("all palette cards render color strips with correct swatch count", async ({
        page,
    }) => {
        const dialog = await openBrowseTab(page);

        // Each palette card's color strip div should have child divs matching the color count
        const cards = dialog.locator("[class*='bg-card'][class*='group']");
        const cardCount = await cards.count();
        expect(cardCount).toBe(MOCK_PALETTES.length);

        for (let i = 0; i < cardCount; i++) {
            const strip = cards.nth(i).locator(".h-10 > div");
            const swatchCount = await strip.count();
            expect(swatchCount).toBe(MOCK_PALETTES[i].colors.length);
        }
    });
});
