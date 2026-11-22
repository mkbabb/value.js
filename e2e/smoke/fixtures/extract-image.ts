/**
 * Extract's intake for a spec: a synthetic photo drawn in the page (no binary
 * fixture in the repo), handed to the empty zone's file dialog, and the
 * developed palette card waited for. The photo is four flat quadrants by
 * default; `noise` scatters a seeded speckle over them so a sampler that reads
 * one source pixel and a sampler that reads the mean disagree.
 */
import { expect, type Page } from "@playwright/test";
import { mainPane } from "./dock";

export interface ExtractPhoto {
    readonly width: number;
    readonly height: number;
    readonly colors?: readonly string[];
    readonly noise?: boolean;
    readonly name?: string;
}

export const LANDSCAPE: ExtractPhoto = { width: 320, height: 240 };
/** A 3:4 portrait, the phone camera's shape. */
export const PORTRAIT: ExtractPhoto = { width: 600, height: 800 };

export async function drawPhoto(page: Page, photo: ExtractPhoto = LANDSCAPE): Promise<Buffer> {
    const b64 = await page.evaluate(
        ({ width, height, colors, noise }) => {
            const c = document.createElement("canvas");
            c.width = width;
            c.height = height;
            const g = c.getContext("2d")!;
            const fills = colors ?? ["#1e3a8a", "#e11d48", "#fde68a", "#16a34a"];
            const hw = width / 2;
            const hh = height / 2;
            fills.forEach((col, i) => {
                g.fillStyle = col;
                g.fillRect((i % 2) * hw, Math.floor(i / 2) * hh, hw, hh);
            });
            if (noise) {
                let s = 7;
                const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
                const img = g.getImageData(0, 0, width, height);
                for (let p = 0; p < img.data.length; p += 4) {
                    const d = (rnd() - 0.5) * 120;
                    img.data[p] = Math.max(0, Math.min(255, img.data[p]! + d));
                    img.data[p + 1] = Math.max(0, Math.min(255, img.data[p + 1]! + d));
                    img.data[p + 2] = Math.max(0, Math.min(255, img.data[p + 2]! + d));
                }
                g.putImageData(img, 0, 0);
            }
            return c.toDataURL("image/png").split(",")[1]!;
        },
        { width: photo.width, height: photo.height, colors: photo.colors ?? null, noise: photo.noise ?? false },
    );
    return Buffer.from(b64, "base64");
}

/** The developed card on Extract: the inspector's article. */
export const extractedCard = (page: Page) =>
    mainPane(page).locator('[role="article"][aria-label^="Palette:"]').first();

/** Opens Extract, hands it the photo through the empty zone, waits for the card. */
export async function loadExtractImage(page: Page, photo: ExtractPhoto = LANDSCAPE): Promise<void> {
    await page.goto("/#/extract", { waitUntil: "domcontentloaded" });
    const zone = page.getByRole("button", { name: "Upload image" });
    await expect(zone).toBeVisible({ timeout: 60_000 });
    const png = await drawPhoto(page, photo);
    const [chooser] = await Promise.all([page.waitForEvent("filechooser", { timeout: 20_000 }), zone.click()]);
    await chooser.setFiles({ name: photo.name ?? "photo.png", mimeType: "image/png", buffer: png });
    await expect(extractedCard(page)).toBeVisible({ timeout: 60_000 });
}

/** Replaces the loaded photo through the image actions' "Replace image". */
export async function replaceExtractImage(page: Page, photo: ExtractPhoto = LANDSCAPE): Promise<void> {
    const png = await drawPhoto(page, photo);
    const [chooser] = await Promise.all([
        page.waitForEvent("filechooser", { timeout: 20_000 }),
        page.getByRole("button", { name: "Replace image" }).click(),
    ]);
    await chooser.setFiles({ name: photo.name ?? "photo-2.png", mimeType: "image/png", buffer: png });
}
