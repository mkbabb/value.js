import { test, expect, type Page } from "@playwright/test";

/**
 * SS-8 B05 — THE DOCK ACTION-BAR CURE ORACLE (tranche X, EXECUTION-RUNBOOK §4.1;
 * the verdicts live in docs/tranches/X/execution/SS8/packets/B05-dock-actionbar.md).
 *
 * Each case falsifies one REFUTED row's live residue, measured on the served
 * app (pixels for ink, layout boxes for proportion):
 *   - 0122 / 0136  bar-less routes: the Tools slot is inert, 0 px, absent from
 *                  the AX tree, and the dock keeps its width (guard: cured at HEAD).
 *   - 0125         the layer root's separator air equals the face's (MISS-1 gap-0).
 *   - 0146         the seat row is spaced by `--dock-layer-gap` (ABN-19).
 *   - 0132         the Tools wordmark clears 4.5:1 on the dock band, light scheme,
 *                  across a six-hue seed sweep (ABT-8: certified on the band).
 *   - 0133         the Tools focus ring clears 3:1 against the band (ABT-11).
 *   - 0140         coarse pointer: the Tools target clears the 44 px floor; at
 *                  200 % zoom of a 1440 desktop the wordmark survives (ABT-10).
 */

const HUES = [0, 60, 120, 180, 240, 300];
const TOOLS = '[aria-label="Toggle action bar"]';

async function seed(page: Page, scheme: "light" | "dark", hue: number): Promise<void> {
    await page.addInitScript(
        ([css, sc]) => {
            try {
                localStorage.setItem("vueuse-color-scheme", sc);
                localStorage.setItem("color-picker", JSON.stringify({ inputColor: css, savedColors: [] }));
            } catch {
                /* storage unavailable: the boot seed stands */
            }
        },
        [`oklch(0.62 0.16 ${hue})`, scheme] as const,
    );
}

async function boot(page: Page, hash = "/"): Promise<void> {
    await page.goto(`/#${hash}`, { waitUntil: "load", timeout: 240_000 });
    await page.waitForSelector(".glass-dock", { timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2000);
}

async function dockRect(page: Page) {
    const b = await page.locator(".glass-dock").first().boundingBox();
    if (b === null) throw new Error("no dock box");
    return b;
}

/** Rest the pointer on the plate's inline-start padding (keeps the dock open, hovers nothing). */
async function parkOnDock(page: Page): Promise<void> {
    const b = await dockRect(page);
    await page.mouse.move(b.x + 3, b.y + b.height / 2);
}

async function openBar(page: Page): Promise<void> {
    await parkOnDock(page);
    await page.locator(TOOLS).click({ timeout: 5000 });
    await page.waitForTimeout(900);
    await parkOnDock(page);
    await page.waitForTimeout(300);
    await settleBar(page);
}

/**
 * SS-8.r B05 0125 / 0146: the bar's posture lands over a few hundred ms (the
 * scene-action seats tween their gaps 6 → 4 px under the open bar while the
 * face's `--dock-layer-gap` re-resolves), and at host load the tween ran past
 * the fixed 1.2 s wait: the face gap was read on one posture and the seats
 * mid-flight (5.398 < 5.5; an air delta of 2 px). Every proportion below is
 * read once the layer root's own geometry and both gaps hold for consecutive
 * frames (the §0gl.8 instrument law: sample the settled posture).
 */
async function settleBar(page: Page): Promise<void> {
    const settled = await page.evaluate(async () => {
        const key = () => {
            const row = document.querySelector('[data-testid="scene-action-row"]');
            const root = row?.closest(".dock-crossfade")?.parentElement;
            const face = row?.closest(".dock-face-content");
            if (!row || !root || !face) return "absent";
            const boxes = [root, ...root.querySelectorAll("button, .dock-separator")].map((e) => {
                const b = e.getBoundingClientRect();
                return `${b.left.toFixed(2)}/${b.width.toFixed(2)}`;
            });
            return `${getComputedStyle(face).columnGap}|${getComputedStyle(root).columnGap}|${boxes.join(",")}`;
        };
        const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
        let last = key();
        for (let held = 0, n = 0; n < 600; n++) {
            await frame();
            const k = key();
            held = k === last && k !== "absent" ? held + 1 : 0;
            last = k;
            if (held >= 10) return true;
        }
        return false;
    });
    expect(settled, "the open bar's posture settles").toBe(true);
}

type RGB = [number, number, number];

async function pixels(page: Page, png: Buffer, pts: Array<[number, number]>): Promise<RGB[]> {
    return page.evaluate(
        async ({ b64, pts }) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width;
            c.height = img.height;
            const g = c.getContext("2d")!;
            g.drawImage(img, 0, 0);
            return pts.map(([x, y]) => {
                const d = g.getImageData(Math.round(x), Math.round(y), 1, 1).data;
                return [d[0], d[1], d[2]] as [number, number, number];
            });
        },
        { b64: png.toString("base64"), pts },
    );
}

function contrast(a: RGB, b: RGB): number {
    const lum = ([r, g, bl]: RGB) => {
        const f = (v: number) => {
            const s = v / 255;
            return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
    };
    const la = lum(a);
    const lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** The max-contrast pixel inside `box` against the plate sample (the SS-8 ink instrument). */
async function inkRatio(page: Page, box: { x: number; y: number; width: number; height: number }) {
    const d = await dockRect(page);
    const shot = await page.screenshot();
    const pts: Array<[number, number]> = [[d.x + 6, d.y + d.height / 2]];
    for (let x = box.x + 1; x < box.x + box.width - 1; x++) {
        for (let y = box.y + 1; y < box.y + box.height - 1; y++) pts.push([x, y]);
    }
    const [plate, ...ink] = await pixels(page, shot, pts);
    return Math.max(...ink.map((p) => contrast(p, plate!)));
}

test.describe("B05 · bar-less routes (0122 · 0136 guard)", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    for (const hash of ["/atmosphere", "/browse", "/extract"]) {
        test(`${hash}: the Tools slot is inert, 0 px and unexposed; the dock keeps its face`, async ({
            page,
        }) => {
            await boot(page, hash);
            await parkOnDock(page);
            const slot = await page.locator(".action-bar-toggle-slot").evaluate((el) => ({
                inert: el.hasAttribute("inert"),
                width: el.getBoundingClientRect().width,
            }));
            expect(slot).toEqual({ inert: true, width: 0 });
            const cdp = await page.context().newCDPSession(page);
            const ax = await cdp.send("Accessibility.getFullAXTree");
            const node = ax.nodes.find(
                (n) => n.name?.value === "Toggle action bar" && n.ignored !== true,
            );
            expect(node).toBeUndefined();
            // The retired collapse: 254.7 → 28.1 px. The dock holds its main face.
            expect((await dockRect(page)).width).toBeGreaterThan(200);
        });
    }
});

test.describe("B05 · the action-bar proportion (0125 · 0146)", () => {
    test.use({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });

    test("0125: the layer root breathes on the face's own gap — both separators get equal air", async ({
        page,
    }) => {
        await boot(page, "/");
        await openBar(page);
        // Layout boxes, not a hover-scaled capsule: the pointer leaves the dock
        // (an open bar does not idle-collapse; SS8-0129 S1).
        await page.mouse.move(1430, 890);
        await page.waitForTimeout(400);
        await settleBar(page);
        const air = await page.evaluate(() => {
            const row = document.querySelector('[data-testid="scene-action-row"]')!;
            const crossfade = row.closest(".dock-crossfade")!;
            const layerRoot = crossfade.parentElement!;
            const outer = layerRoot.closest(".dock-face-content")!;
            // Leading: Back · separator · the layer root (in the face's content row).
            const leadSep = layerRoot.previousElementSibling!;
            const back = leadSep.previousElementSibling!;
            // Trailing: the seat crossfade · separator · the input toggle (in the layer root).
            const trailSep = layerRoot.querySelector(":scope > .dock-separator")!;
            const toggle = trailSep.nextElementSibling!;
            const r = (el: Element) => el.getBoundingClientRect();
            return {
                rootGap: parseFloat(getComputedStyle(layerRoot).columnGap) || 0,
                faceGap: parseFloat(getComputedStyle(outer).columnGap) || 0,
                backToSep: r(leadSep).left - r(back).right,
                sepToRoot: r(layerRoot).left - r(leadSep).right,
                rowToSep: r(trailSep).left - r(crossfade).right,
                sepToToggle: r(toggle).left - r(trailSep).right,
            };
        });
        expect(air.faceGap).toBeGreaterThan(0);
        expect(air.rootGap).toBeCloseTo(air.faceGap, 1);
        // Both separators get the same air on both sides (12/12 vs 6/6 at HEAD).
        expect(Math.abs(air.rowToSep - air.sepToRoot)).toBeLessThanOrEqual(0.5);
        expect(Math.abs(air.sepToToggle - air.backToSep)).toBeLessThanOrEqual(0.5);
    });

    test("0146: the seat row is spaced by --dock-layer-gap, not by justify-around slack", async ({
        page,
    }) => {
        await boot(page, "/");
        await openBar(page);
        const row = await page.evaluate(() => {
            const el = document.querySelector('[data-testid="scene-action-row"]')!;
            const btns = [...el.querySelectorAll("[data-scene-action] button")].map((b) =>
                b.getBoundingClientRect(),
            );
            return {
                // `--dock-layer-gap` resolved: the column-gap of the face the row sits in.
                token: parseFloat(getComputedStyle(el.closest(".dock-face-content")!).columnGap),
                gaps: btns.slice(1).map((b, i) => b.left - btns[i]!.right),
            };
        });
        expect(row.token).toBeGreaterThan(0);
        expect(row.gaps.length).toBeGreaterThan(0);
        for (const gap of row.gaps) expect(gap).toBeGreaterThanOrEqual(row.token - 0.5);
    });
});

test.describe("B05 · the Tools ink on the dock band (0132 · 0133)", () => {
    test.use({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });

    for (const hue of HUES) {
        test(`0132: the Tools wordmark clears 4.5:1 on the light band (seed hue ${hue})`, async ({
            page,
        }) => {
            await seed(page, "light", hue);
            await boot(page, "/");
            await parkOnDock(page);
            await page.waitForTimeout(300);
            const label = await page.locator(`${TOOLS} span`).boundingBox();
            expect(label).not.toBeNull();
            expect(await inkRatio(page, label!)).toBeGreaterThanOrEqual(4.5);
        });
    }

    for (const hue of [0, 180]) {
        test(`0133: the Tools focus ring clears 3:1 against the band (seed hue ${hue})`, async ({
            page,
        }) => {
            await seed(page, "light", hue);
            await boot(page, "/");
            await parkOnDock(page);
            await page.waitForTimeout(300);
            const before = await page.screenshot();
            let reached = false;
            for (let i = 0; i < 30 && !reached; i++) {
                await page.keyboard.press("Tab");
                reached = await page.evaluate(
                    () => document.activeElement?.getAttribute("aria-label") === "Toggle action bar",
                );
            }
            expect(reached).toBe(true);
            await page.waitForTimeout(400);
            const after = await page.screenshot();
            const b = (await page.locator(TOOLS).boundingBox())!;
            const ring: Array<[number, number]> = [];
            for (let x = b.x - 4; x <= b.x + b.width + 4; x++) {
                for (const y of [b.y - 3, b.y - 2, b.y - 1, b.y + b.height, b.y + b.height + 1, b.y + b.height + 2]) {
                    ring.push([x, y]);
                }
            }
            const pa = await pixels(page, before, ring);
            const pb = await pixels(page, after, ring);
            const best = Math.max(...pa.map((p, i) => contrast(pb[i]!, p)));
            expect(best).toBeGreaterThanOrEqual(3);
        });
    }
});

test.describe("B05 · the Tools target and wordmark (0140)", () => {
    test.describe("coarse 390", () => {
        test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
        test("the Tools target holds the 44 px coarse floor", async ({ page }) => {
            await boot(page, "/");
            const b = (await page.locator(TOOLS).boundingBox())!;
            expect(b.height).toBeGreaterThanOrEqual(44 - 0.5);
            expect(b.width).toBeGreaterThanOrEqual(44 - 0.5);
        });
        // SS-8.r B05 0140 (COHESION §0gk.2, record-only): the phone Tools seat
        // is icon-only BY DESIGN (S.W7-2), so its name is the accessible name,
        // never the hidden wordmark.
        test("the icon-only Tools seat carries its accessible name", async ({ page }) => {
            await boot(page, "/");
            const tools = page.getByRole("button", { name: "Toggle action bar" });
            await expect(tools).toHaveCount(1);
            await expect(tools).toBeVisible();
            await expect(tools).toHaveAccessibleName("Toggle action bar");
            await expect(page.locator(`${TOOLS} span`)).toBeHidden();
        });
    });

    test.describe("zoom 200 % of 1440×900", () => {
        test.use({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
        test("the Tools wordmark survives the zoom", async ({ page }) => {
            await boot(page, "/");
            await expect(page.locator(`${TOOLS} span`)).toHaveText("Tools");
            await expect(page.locator(`${TOOLS} span`)).toBeVisible();
        });
    });
});
