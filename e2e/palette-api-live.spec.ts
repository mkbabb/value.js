import { test, expect, type Page } from "@playwright/test";

const RUN_LIVE = process.env.PALETTE_API_E2E === "1";
const API_BASE_URL = process.env.VITE_API_URL ?? "http://127.0.0.1:3100";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_E2E ?? "test-admin-token";

async function openPaletteDialog(page: Page) {
    await page.locator(".lucide-palette").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

async function closePaletteDialog(page: Page) {
    const dialog = page.getByRole("dialog");
    if (!(await dialog.isVisible().catch(() => false))) return;
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press("Escape");
        if (!(await dialog.isVisible().catch(() => false))) return;
    }
    await expect(dialog).not.toBeVisible({ timeout: 5000 });
}

async function ensureProposableColor(page: Page) {
    const shuffleIcon = page.locator(".lucide-shuffle").first();
    for (let i = 0; i < 10; i++) {
        const tagIcon = page.locator(".lucide-tag").first();
        if (await tagIcon.isVisible().catch(() => false)) {
            return tagIcon;
        }
        await shuffleIcon.click();
        await page.waitForTimeout(250);
    }
    throw new Error("Could not find a color with propose-name action enabled.");
}

test.describe("Palette API Live Integration", () => {
    test.skip(!RUN_LIVE, "Set PALETTE_API_E2E=1 to run against a live API.");

    test("save, publish, vote, propose, and admin moderation flows work", async ({
        page,
        request,
    }) => {
        test.setTimeout(120_000);

        const runId = `pw${Date.now()}`;
        const paletteName = `${runId}-palette`;
        const proposedName = `${runId}-color`;

        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");

        const dialog = await openPaletteDialog(page);
        // Add the current color to the working palette.
        await dialog.locator(".lucide-plus").first().click();
        await page.waitForTimeout(250);

        const nameInput = dialog.getByPlaceholder("Palette name...");
        await nameInput.fill(paletteName);

        const saveButton = dialog
            .getByRole("button", { name: "Save", exact: true })
            .last();
        await expect(saveButton).toBeEnabled();
        await saveButton.click();
        await expect(
            dialog.getByText(paletteName, { exact: true }).first(),
        ).toBeVisible();

        // Publish to the backend.
        await nameInput.fill(paletteName);
        const publishButton = dialog.getByRole("button", { name: /publish/i }).first();
        await expect(publishButton).toBeEnabled();
        await publishButton.click();

        await expect
            .poll(() =>
                page.evaluate(() => sessionStorage.getItem("palette-session-token")),
            )
            .not.toBeNull();

        // Verify browse + vote flow against live API data.
        await dialog.getByRole("tab", { name: "Browse" }).click();
        await dialog.getByPlaceholder("Search palettes...").fill(paletteName);
        await expect(
            dialog.getByText(paletteName, { exact: true }).first(),
        ).toBeVisible({
            timeout: 10_000,
        });

        const card = dialog
            .getByText(paletteName, { exact: true })
            .locator("xpath=ancestor::div[contains(@class, 'group')]")
            .first();
        const voteButton = card
            .locator("button")
            .filter({ has: page.locator(".lucide-heart") })
            .first();
        const heartIcon = voteButton.locator(".lucide-heart");
        await expect(heartIcon).not.toHaveClass(/fill-red-500/);
        await voteButton.click();
        await expect(heartIcon).toHaveClass(/fill-red-500/);

        const palettesRes = await request.get(
            `${API_BASE_URL}/palettes?limit=100&offset=0&sort=newest`,
        );
        expect(palettesRes.ok()).toBeTruthy();
        const palettesJson = (await palettesRes.json()) as {
            data: Array<{ name: string; slug: string }>;
        };
        const publishedPalette = palettesJson.data.find(
            (entry) => entry.name === paletteName,
        );
        expect(publishedPalette).toBeTruthy();
        const paletteSlug = publishedPalette!.slug;

        await closePaletteDialog(page);

        // Propose a custom name from a fresh UI flow.
        const tagIcon = await ensureProposableColor(page);
        await tagIcon.click();
        const proposeInput = page.getByPlaceholder("Propose a name...");
        await expect(proposeInput).toBeVisible();
        // The propose form lives in ColorInput; switch to input mode so the field is interactive.
        await page.locator(".toggle-btn").first().click();
        await expect(proposeInput).toBeVisible();
        await proposeInput.fill(proposedName);
        await expect(proposeInput).toHaveValue(proposedName);
        const proposeForm = proposeInput
            .locator("xpath=ancestor::div[contains(@class, 'relative')]")
            .first();
        const proposeSubmit = proposeForm.locator("button").first();
        await expect(proposeSubmit).toBeEnabled();
        const proposeResponsePromise = page.waitForResponse(
            (res) =>
                res.url().includes("/colors/propose") &&
                res.request().method() === "POST",
        );
        await proposeInput.press("Enter");
        const proposeResponse = await proposeResponsePromise;
        expect(proposeResponse.status()).toBe(201);
        await expect(proposeInput).not.toBeVisible({ timeout: 10_000 });
        // Return to action-toolbar mode so the palette button is clickable again.
        await page.locator(".toggle-btn").first().click();

        // Admin moderation UI: approve proposal, feature + delete palette.
        const adminDialog = await openPaletteDialog(page);
        const dot = adminDialog.getByRole("button").first();
        await dot.click({ modifiers: ["Shift"] });

        await page
            .getByPlaceholder("Admin token...")
            .fill(`ADMIN_TOKEN="${ADMIN_TOKEN}"`);
        await page.getByRole("button", { name: /login/i }).click();

        const queueItem = page.getByText(proposedName, { exact: true });
        await expect(queueItem).toBeVisible({ timeout: 10_000 });
        const queueRow = queueItem
            .locator("xpath=ancestor::div[contains(@class, 'rounded-md border')]")
            .first();
        await queueRow.locator(".lucide-check").first().click();
        await expect(queueItem).not.toBeVisible({ timeout: 10_000 });

        const slugInput = page.getByPlaceholder("Palette slug...");
        await slugInput.fill(paletteSlug);
        await page.getByRole("button", { name: /feature/i }).click();
        await expect(slugInput).toHaveValue("");

        await slugInput.fill(paletteSlug);
        await page.getByRole("button", { name: /^Delete$/i }).click();
        await expect(slugInput).toHaveValue("");

        // Backend truth checks for moderation + deletion.
        const approvedRes = await request.get(`${API_BASE_URL}/colors/approved`);
        expect(approvedRes.ok()).toBeTruthy();
        const approved = (await approvedRes.json()) as Array<{
            name: string;
            status: string;
        }>;
        expect(
            approved.some(
                (entry) => entry.name === proposedName && entry.status === "approved",
            ),
        ).toBeTruthy();

        const deletedRes = await request.get(
            `${API_BASE_URL}/palettes/${encodeURIComponent(paletteSlug)}`,
        );
        expect(deletedRes.status()).toBe(404);
    });
});
