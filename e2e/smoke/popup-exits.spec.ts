import { test, expect, type Page } from "@playwright/test";
import { mainPane, openView } from "./fixtures/dock";

/**
 * Popup exits: the site's own overlays leave on glass's tween, never in one
 * frame, and the palette swatches hover on the paint alone.
 *
 * The Report dialog, the version drawer and the eyedropper were mounted by
 * the datum they show (`v-if`) and the datum was released in the tick that
 * closed them, so the overlay was unmounted before its leave could run (gone
 * in one frame). Each now stays mounted, driven by `open`, and lets its datum
 * go on `closed` (the leave has finished). Each test films the leave per
 * animation frame from the closing input and asserts:
 *   · the surface is still on screen for the first 100 ms (never 0, never
 *     detached), and
 *   · it is removed only once its leave has run out (it is faded or slid
 *     away on its last mounted frame, not cut mid-flight).
 *
 * Writes are stubbed at the network boundary: every palette route is
 * answered here, and no request leaves for a real API.
 */

test.describe.configure({ timeout: 120_000 });

/**
 * The films are read on a GPU lane. Under the suite's software GL the closing
 * frame of a glass plate can take half a second to paint (the CPU draws its
 * backdrop blur), so a 300 ms leave is over before its first frame and no
 * per-frame claim can be judged. Each test reads the renderer first and skips,
 * saying so, where it is SwiftShader.
 */
test.use({
    launchOptions: { args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] },
});

async function requireGpu(page: Page) {
    const renderer = await page.evaluate(() => {
        const gl = document.createElement("canvas").getContext("webgl");
        if (!gl) return "no webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const r = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return r;
    });
    test.info().annotations.push({ type: "renderer", description: renderer });
    test.skip(/swiftshader|no webgl/i.test(renderer), `per-frame films need a GPU lane (renderer: ${renderer})`);
}

const NOW = "2026-07-05T00:00:00.000Z";
const WALL = [
    {
        name: "Leave Palette",
        slug: "leave-palette",
        userSlug: "gallery",
        colors: [
            { css: "#e11d48", position: 0 },
            { css: "#2563eb", position: 1 },
            { css: "#16a34a", position: 2 },
            { css: "#f59e0b", position: 3 },
        ],
        createdAt: NOW,
        updatedAt: NOW,
        isLocal: false,
        voteCount: 3,
        visibility: "public",
        tier: "standard",
        published: true,
        versionCount: 3,
        currentHash: "p3",
    },
];
const VERSIONS = [3, 2, 1].map((n) => ({
    hash: `r${n}`,
    payloadHash: `p${n}`,
    revisionNo: n,
    name: "Leave Palette",
    colors: WALL[0]!.colors,
    parentHash: n > 1 ? `r${n - 1}` : null,
    forkedFromHash: null,
    authorSlug: "gallery",
    paletteSlug: "leave-palette",
    createdAt: NOW,
}));

async function routeWall(page: Page) {
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) => {
            const req = route.request();
            const url = new URL(req.url());
            if (req.method() !== "GET") {
                return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
            }
            if (/\/versions(\/|$)/.test(url.pathname)) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ data: VERSIONS, total: VERSIONS.length, limit: 20, offset: 0 }),
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

interface Frame {
    /** ms since the closing input's own timestamp. */
    t: number;
    /** effective opacity × the share of the box inside the viewport; 0 once detached. */
    vis: number;
    connected: boolean;
}

/**
 * Arms a per-frame film of `selector`'s leave. The film's zero is the
 * timestamp of the first keydown or pointerdown after arming (the closing
 * input), and it runs until the node is detached.
 */
async function armLeaveFilm(page: Page, selector: string) {
    await page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) throw new Error(`no ${sel} to film`);
        const film = { t0: -1, frames: [] as { t: number; vis: number; connected: boolean }[], done: false };
        (window as unknown as { __leaveFilm: typeof film }).__leaveFilm = film;
        const mark = (e: Event) => {
            if (film.t0 < 0) film.t0 = e.timeStamp;
        };
        window.addEventListener("keydown", mark, { capture: true });
        window.addEventListener("pointerdown", mark, { capture: true });
        const visible = (node: HTMLElement): number => {
            if (!node.isConnected) return 0;
            let op = 1;
            for (let n: HTMLElement | null = node; n; n = n.parentElement) {
                const cs = getComputedStyle(n);
                if (cs.display === "none" || cs.visibility === "hidden") return 0;
                op *= parseFloat(cs.opacity);
            }
            const r = node.getBoundingClientRect();
            const area = r.width * r.height;
            if (area <= 0) return 0;
            const ix = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
            const iy = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
            return op * ((ix * iy) / area);
        };
        const tick = (now: number) => {
            film.frames.push({ t: now, vis: visible(el), connected: el.isConnected });
            if (!el.isConnected || film.frames.length > 4000) {
                film.done = true;
                return;
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, selector);
}

async function readLeaveFilm(page: Page): Promise<Frame[]> {
    await page.waitForFunction(
        () => (window as unknown as { __leaveFilm?: { done: boolean } }).__leaveFilm?.done === true,
        null,
        { timeout: 10_000 },
    );
    return page.evaluate(() => {
        const film = (window as unknown as {
            __leaveFilm: { t0: number; frames: { t: number; vis: number; connected: boolean }[] };
        }).__leaveFilm;
        return film.frames
            .filter((f) => f.t >= film.t0)
            .map((f) => ({ ...f, t: f.t - film.t0 }));
    });
}

function assertTweenedLeave(frames: Frame[], what: string) {
    const gone = frames.find((f) => !f.connected);
    expect(gone, `${what}: the film never saw the node leave`).toBeDefined();
    const early = frames.filter((f) => f.t < 100);
    expect(early.length, `${what}: no frames in the first 100 ms`).toBeGreaterThan(0);
    for (const f of early) {
        expect(f.connected, `${what}: detached ${f.t.toFixed(0)} ms after the close`).toBe(true);
        expect(f.vis, `${what}: invisible ${f.t.toFixed(0)} ms after the close`).toBeGreaterThan(0);
    }
    const mounted = frames.filter((f) => f.connected);
    const last = mounted[mounted.length - 1]!;
    // Its leave ran out before it was removed: faded or slid away, not cut.
    expect(last.vis, `${what}: removed mid-leave (last mounted frame ${last.vis.toFixed(2)})`).toBeLessThan(0.15);
    expect(gone!.t, `${what}: gone at ${gone!.t.toFixed(0)} ms`).toBeGreaterThanOrEqual(100);
}

async function openBrowseMenu(page: Page) {
    await routeWall(page);
    await page.goto("/");
    await requireGpu(page);
    const main = mainPane(page);
    await expect(main).toBeVisible();
    await openView(page, "Browse");
    const menu = main.getByRole("button", { name: "Palette menu" }).filter({ visible: true }).first();
    await expect(menu).toBeVisible();
    return menu;
}

for (const way of ["Escape", "Cancel"] as const) {
    test(`Report dialog leaves on its tween (${way})`, async ({ page }) => {
        const menu = await openBrowseMenu(page);
        await menu.click();
        await page.getByRole("menuitem", { name: /Report/ }).click();
        const dialog = page.getByRole("dialog", { name: "Report palette" });
        await expect(dialog).toBeVisible();
        // Let the entrance settle so the film reads the leave alone.
        await page.waitForTimeout(700);
        await armLeaveFilm(page, '[data-slot="dialog-content"]');
        if (way === "Escape") await page.keyboard.press("Escape");
        else await dialog.getByRole("button", { name: "Cancel" }).click();
        assertTweenedLeave(await readLeaveFilm(page), `Report dialog (${way})`);

        // The subject was let go after the leave: a fresh open is a fresh form.
        await menu.click();
        await page.getByRole("menuitem", { name: /Report/ }).click();
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole("radio", { checked: true })).toHaveCount(0);
    });
}

test("Version drawer leaves on its slide (Escape)", async ({ page }) => {
    const menu = await openBrowseMenu(page);
    await menu.click();
    await page.getByRole("menuitem", { name: /Versions/ }).click();
    const title = page.getByRole("heading", { name: "Version history" });
    await expect(title).toBeVisible();
    await expect(page.getByText("3 versions")).toBeVisible();
    await page.waitForTimeout(900);
    await armLeaveFilm(page, '[data-slot="sheet-content"]');
    await page.keyboard.press("Escape");
    assertTweenedLeave(await readLeaveFilm(page), "Version drawer (Escape)");
});

test("Eyedropper leaves on its tween (Escape)", async ({ page }) => {
    await page.goto("/#/extract", { waitUntil: "domcontentloaded" });
    await requireGpu(page);
    await expect(page.locator("text=Upload image").first()).toBeVisible({ timeout: 60_000 });
    const png = Buffer.from(
        await page.evaluate(() => {
            const c = document.createElement("canvas");
            c.width = 320;
            c.height = 240;
            const g = c.getContext("2d")!;
            ["#1e3a8a", "#e11d48", "#fde68a", "#16a34a"].forEach((col, i) => {
                g.fillStyle = col;
                g.fillRect((i % 2) * 160, Math.floor(i / 2) * 120, 160, 120);
            });
            return c.toDataURL("image/png").split(",")[1]!;
        }),
        "base64",
    );
    const [chooser] = await Promise.all([
        page.waitForEvent("filechooser", { timeout: 20_000 }),
        page.locator("text=Upload image").first().click(),
    ]);
    await chooser.setFiles({ name: "leave.png", mimeType: "image/png", buffer: png });
    await page.waitForFunction(() => /% of the image/.test(document.body.innerText), null, { timeout: 60_000 });
    await page.locator("text=Pick a color").first().click();
    const dialog = page.getByRole("dialog", { name: "Eyedropper" });
    await expect(dialog).toBeVisible({ timeout: 20_000 });
    await page.waitForTimeout(900);
    await armLeaveFilm(page, '[data-slot="dialog-content"]');
    await page.keyboard.press("Escape");
    assertTweenedLeave(await readLeaveFilm(page), "Eyedropper (Escape)");

    // It opens again after the leave released it.
    await page.locator("text=Pick a color").first().click();
    await expect(dialog).toBeVisible({ timeout: 20_000 });
});

/**
 * The palette dot's hover: the paint swells to 1.06 and takes its second
 * seeded outline, eased in and out; no box on the card moves. Boxes are read
 * as layout (offset) boxes, so the card's own hover lift, a transform on the
 * card, is not counted as a move of what it holds.
 */
async function swatchBoxes(page: Page) {
    return page.evaluate(() =>
        [
            ...document.querySelectorAll(
                "[data-palette-swatches], [data-palette-swatches] > *, [data-palette-swatches] .swatch-button, [data-palette-swatches] .watercolor-swatch",
            ),
        ].map((el) => {
            const h = el as HTMLElement;
            return [h.offsetLeft, h.offsetTop, h.offsetWidth, h.offsetHeight];
        }),
    );
}

async function openCardSwatches(page: Page) {
    await routeWall(page);
    await page.goto("/");
    await requireGpu(page);
    const main = mainPane(page);
    await expect(main).toBeVisible();
    await openView(page, "Browse");
    const swatch = main.locator("[data-palette-swatches] .swatch-button").filter({ visible: true }).first();
    if (!(await swatch.isVisible())) {
        await main.getByRole("article").first().click();
    }
    await expect(swatch).toBeVisible();
    return swatch;
}

test("Palette swatch hover swells the paint alone, eased in and out", async ({ page }) => {
    const swatch = await openCardSwatches(page);
    const dot = swatch.locator(".watercolor-swatch");
    await page.mouse.move(2, 2);
    await page.waitForTimeout(800);
    const before = await swatchBoxes(page);
    const rest = await dot.evaluate((el) => getComputedStyle(el).borderRadius);

    // Film the dot's scale per frame across the hover in, from the pointer's
    // arrival on the swatch.
    const box = (await swatch.boundingBox())!;
    await dot.evaluate((el) => {
        const w = window as unknown as { __scale: string[] };
        w.__scale = [];
        let t0 = -1;
        el.closest(".swatch-button")!.addEventListener("pointerenter", (e) => (t0 = e.timeStamp), { once: true });
        const tick = (now: number) => {
            if (t0 >= 0) w.__scale.push(getComputedStyle(el).scale);
            if (t0 < 0 || now - t0 < 600) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(800);
    const scales = await page.evaluate(() => (window as unknown as { __scale: string[] }).__scale);
    const values = scales.map((s) => (s === "none" ? 1 : parseFloat(s)));
    expect(Math.max(...values), "the swatch did not swell").toBeCloseTo(1.06, 3);
    expect(
        values.some((v) => v > 1.001 && v < 1.059),
        `the swell is a cut, not a tween (${values.join(", ")})`,
    ).toBe(true);
    const hovered = await dot.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(hovered, "the second seeded outline").not.toBe(rest);
    expect(await swatchBoxes(page), "a box moved on hover").toEqual(before);

    await page.mouse.move(2, 2);
    await page.waitForTimeout(100);
    const leaving = await dot.evaluate((el) => getComputedStyle(el).scale);
    expect(leaving, "the hover out is a cut").not.toBe("none");
    await page.waitForTimeout(800);
    expect(await dot.evaluate((el) => getComputedStyle(el).scale)).toBe("none");
    expect(await swatchBoxes(page)).toEqual(before);
});

test.describe("reduced motion", () => {
    test("Palette swatch hover under reduced motion changes the outline, never the scale", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        const swatch = await openCardSwatches(page);
        const dot = swatch.locator(".watercolor-swatch");
        await page.mouse.move(2, 2);
        await page.waitForTimeout(800);
        const rest = await dot.evaluate((el) => getComputedStyle(el).borderRadius);
        await swatch.hover();
        await page.waitForTimeout(800);
        expect(await dot.evaluate((el) => getComputedStyle(el).scale)).toBe("none");
        expect(await dot.evaluate((el) => getComputedStyle(el).borderRadius)).not.toBe(rest);
    });
});
