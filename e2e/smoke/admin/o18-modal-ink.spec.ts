import type { Locator, Page } from "@playwright/test";
import { adminPopulatedTest as test, expect } from "./fixtures/admin-populated";
import { mainPane } from "../fixtures/dock";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";

/**
 * X-DS value pass 16 (V16-01) — O-18 · THE MODAL PLATE'S INK, READ OFF THE PIXELS.
 *
 * A dialog is glass's floating material laid over glass's 50 % ink scrim, so in
 * light its ground composites DARK. The house's floating ink (`--ink-floating-*`)
 * is solved over the bare ambient, with no scrim, so it kept the light scheme's
 * dark ink on that dark ground, and no pass had ever opened a dialog: the
 * confirm's title and body read 1.27:1 off the frame and the Report dialog's
 * options 1.61–2.13:1. The census's model composites an element's ANCESTOR
 * stack, and the scrim is a sibling layer, so the model is blind here; this row
 * reads the painted frame instead (the critic's instrument): each element's
 * ground is the median-luminance pixel of its own box, its ink the pixel that
 * contrasts most with that ground, WCAG 2.x ratio.
 *
 * Rows: the admin "Delete all palettes?" confirm (title, body, Cancel) and
 * Browse's "Report palette" (title, body, every reason label, Cancel), both
 * schemes, each ≥ 4.5:1. Born-RED in light against the floating-only seat.
 */
const TEXT_FLOOR = 4.5;

async function pixelRatio(page: Page, dialog: Locator, target: Locator): Promise<number> {
    const box = await dialog.boundingBox();
    const r = await target.boundingBox();
    if (!box || !r) throw new Error("the dialog or its row has no box");
    const png = (await page.screenshot({ clip: box })).toString("base64");
    return page.evaluate(
        async ({ png, box, r }) => {
            const img = new Image();
            img.src = "data:image/png;base64," + png;
            await img.decode();
            const cv = document.createElement("canvas");
            cv.width = img.width;
            cv.height = img.height;
            const ctx = cv.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            const sx = img.width / box.width;
            const data = ctx.getImageData(0, 0, img.width, img.height).data;
            const lin = (v: number) => {
                const s = v / 255;
                return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            const lum = (i: number) =>
                0.2126 * lin(data[i] ?? 0) + 0.7152 * lin(data[i + 1] ?? 0) + 0.0722 * lin(data[i + 2] ?? 0);
            const x0 = Math.max(0, Math.floor((r.x - box.x) * sx));
            const y0 = Math.max(0, Math.floor((r.y - box.y) * sx));
            const x1 = Math.min(img.width, Math.ceil((r.x + r.width - box.x) * sx));
            const y1 = Math.min(img.height, Math.ceil((r.y + r.height - box.y) * sx));
            const lums: number[] = [];
            for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) lums.push(lum((y * img.width + x) * 4));
            const ground = [...lums].sort((a, b) => a - b)[Math.floor(lums.length / 2)] ?? 0;
            let best = 1;
            for (const l of lums) best = Math.max(best, (Math.max(l, ground) + 0.05) / (Math.min(l, ground) + 0.05));
            return Math.round(best * 100) / 100;
        },
        { png, box, r },
    );
}

async function settleDialog(page: Page): Promise<Locator> {
    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible();
    // the open transition and the plate's blur settle before the frame is read
    await page.waitForTimeout(900);
    return dialog;
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`O-18 · V16-01 the modal plate's ink (${scheme})`, () => {
        test.use({ colorScheme: scheme });

        test("the admin confirm: title, body and Cancel ≥4.5:1 on the composited modal ground", async ({
            page,
        }) => {
            await page.goto("/#/admin/users");
            await expect(mainPane(page)).toBeVisible();
            await page
                .getByRole("button", { name: "Delete all palettes of azure-fox-01", exact: true })
                .filter({ visible: true })
                .first()
                .click();
            const dialog = await settleDialog(page);
            const rows: [string, Locator][] = [
                ["title", dialog.getByRole("heading").first()],
                ["body", dialog.locator("p").first()],
                ["Cancel", dialog.getByRole("button", { name: "Cancel", exact: true })],
            ];
            for (const [name, row] of rows) {
                const ratio = await pixelRatio(page, dialog, row);
                expect(ratio, `${scheme} confirm ${name} reads ${ratio}:1 off the frame`).toBeGreaterThanOrEqual(TEXT_FLOOR);
            }
        });

        test("the Report dialog: title, body, every reason and Cancel ≥4.5:1 on the composited modal ground", async ({
            page,
        }) => {
            test.setTimeout(90_000);
            await routeBrowsePalettes(page);
            await page.goto("/#/browse");
            await expect(mainPane(page)).toBeVisible();
            await mainPane(page)
                .getByRole("button", { name: "Palette menu" })
                .filter({ visible: true })
                .first()
                .click();
            await page.getByRole("menuitem", { name: /Report/ }).click();
            const dialog = await settleDialog(page);
            const rows: [string, Locator][] = [
                ["title", dialog.getByRole("heading", { name: "Report palette" })],
                ["body", dialog.locator("p").first()],
                ["Cancel", dialog.getByRole("button", { name: "Cancel", exact: true })],
            ];
            const reasons = dialog.locator("label[for^='reason-']");
            const n = await reasons.count();
            expect(n, "the reasons are enrolled").toBeGreaterThan(2);
            for (let i = 0; i < n; i++) rows.push([`reason ${i + 1}`, reasons.nth(i)]);
            for (const [name, row] of rows) {
                const ratio = await pixelRatio(page, dialog, row);
                expect(ratio, `${scheme} Report ${name} reads ${ratio}:1 off the frame`).toBeGreaterThanOrEqual(TEXT_FLOOR);
            }
        });
    });
}
