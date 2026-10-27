import { test, expect, type Page } from "@playwright/test";
import { decodePng, type DecodedImage } from "./fixtures/frame-diff";

/**
 * SS-8 B19-color-chips — the live falsifiers for the REFUTED rows of the T-17
 * preview chips (packet docs/tranches/X/execution/SS8/packets/B19-color-chips.md).
 *
 *   · R-13 (SS8-0537): the chip's ring is an OUTSET boundary drawn from the
 *     one `--card-edge` mint, never an inset veil painted over the specimen.
 *     Live: the specimen's first and last content pixels equal the first and
 *     last stamped stops (an inset ring veils exactly those two endpoint stops).
 *   · D-11 (SS8-0554a) via PS-2's specimen well: the chip sits on its own opaque
 *     stage, so the selected row's highlight cannot composite through the masked
 *     tail segment or the corner arcs. Live: the Vibrant chip's content box is
 *     pixel-identical with its (selected) row highlighted and with the highlight
 *     moved to a non-adjacent row, in one open menu (frames registered from
 *     the pixels of the opaque head segments).
 *   · SS8-0546 rides o14's chip feasibility leg (e2e/smoke/oracles/o14-preview-truth.spec.ts),
 *     which walks the ground from the chip itself: with the well, the stops are
 *     measured against the stage they actually sit on.
 */

test.describe.configure({ timeout: 120_000 });

async function boot(page: Page, route: string, dark: boolean) {
    await page.emulateMedia({ colorScheme: dark ? "dark" : "light" });
    await page.addInitScript((dark) => {
        try {
            localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
        } catch {
            /* the media emulation still holds */
        }
    }, dark);
    await page.goto(`/#/${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 60_000 });
    await page.waitForTimeout(1500);
}

async function openMenu(page: Page, name: string) {
    const trigger = page.getByRole("combobox", { name, exact: true }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(700);
}

/** The chip's content box (inside its border) in CSS px, viewport-relative. */
async function contentBox(page: Page, chip: ReturnType<Page["locator"]>) {
    return chip.evaluate((el) => {
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const l = parseFloat(cs.borderLeftWidth) + parseFloat(cs.paddingLeft);
        const r = parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight);
        const t = parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop);
        const bo = parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom);
        return { x: b.x + l, y: b.y + t, width: b.width - l - r, height: b.height - t - bo };
    });
}

const px = (img: DecodedImage, x: number, y: number) => {
    const i = (y * img.width + x) * img.channels;
    return [img.data[i] ?? 0, img.data[i + 1] ?? 0, img.data[i + 2] ?? 0];
};
const delta = (a: number[], b: number[]) => Math.max(...a.map((v, i) => Math.abs(v - (b[i] ?? 0))));

for (const dark of [false, true]) {
    const scheme = dark ? "dark" : "light";

    test(`R-13 · the ramp chip's ring is an outset --card-edge boundary that never veils the endpoint stops (${scheme})`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "gradient", dark);
            await openMenu(page, "Color space");
            const chips = page.getByRole("listbox").locator("[data-stops]");
            const n = await chips.count();
            expect(n, "ramp chips render").toBeGreaterThan(0);
            for (let i = 0; i < n; i++) {
                const chip = chips.nth(i);
                const s = await chip.evaluate((el) => {
                    const cs = getComputedStyle(el);
                    const probe = document.createElement("span");
                    probe.style.color = "var(--card-edge)";
                    el.parentElement!.appendChild(probe);
                    const edge = getComputedStyle(probe).color;
                    probe.remove();
                    const cv = document.createElement("canvas").getContext("2d")!;
                    const rgb = (css: string) => {
                        cv.fillStyle = "#000";
                        cv.fillRect(0, 0, 1, 1);
                        cv.fillStyle = css;
                        cv.fillRect(0, 0, 1, 1);
                        return [...cv.getImageData(0, 0, 1, 1).data].slice(0, 3);
                    };
                    const stops = (el.getAttribute("data-stops") ?? "").split("|");
                    return {
                        boxShadow: cs.boxShadow,
                        outlineStyle: cs.outlineStyle,
                        outlineColor: cs.outlineColor,
                        edge,
                        first: rgb(stops[0]!),
                        last: rgb(stops[stops.length - 1]!),
                    };
                });
                const tag = `ramp chip ${i}`;
                expect.soft(s.boxShadow, `${tag}: no inset ring painted over the specimen`).toBe("none");
                expect.soft(s.outlineStyle, `${tag}: the boundary is an outset outline`).toBe("solid");
                expect.soft(s.outlineColor, `${tag}: the outline is the one --card-edge mint`).toBe(s.edge);

                // The listbox scrolls to the selected row; centre this chip in its
                // viewport, clear of the select's scroll buttons. Only the select's
                // own scroll viewport moves: `scrollIntoView` also scrolled the page
                // scroller under the open select, and the anchored content re-seats
                // to its trigger a frame (under load, hundreds of ms) later, so the
                // clip read a box the chip had left (SS-8.r: rim 194,91,135 = the
                // selected row's fill, RED 1/10 at 5d98dba67). The clip is taken
                // once the chip's box holds across consecutive frames.
                const settled = await chip.evaluate(async (el) => {
                    const lb = el.closest("[role=listbox]") as HTMLElement;
                    let vp: HTMLElement | null = el.parentElement;
                    while (vp && vp !== lb.parentElement && vp.scrollHeight <= vp.clientHeight) vp = vp.parentElement;
                    if (vp && vp !== lb.parentElement) {
                        const e = el.getBoundingClientRect();
                        const v = vp.getBoundingClientRect();
                        vp.scrollTop += e.top + e.height / 2 - (v.top + v.height / 2);
                    }
                    const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
                    const key = () => {
                        const b = el.getBoundingClientRect();
                        return `${b.x},${b.y},${b.width},${b.height}`;
                    };
                    let last = key();
                    for (let held = 0, n = 0; n < 120; n++) {
                        await frame();
                        const k = key();
                        held = k === last ? held + 1 : 0;
                        last = k;
                        if (held >= 3) return true;
                    }
                    return false;
                });
                expect(settled, `${tag}: the chip's box settles before the clip`).toBe(true);
                const box = await contentBox(page, chip);
                const img = decodePng(await page.screenshot({ clip: box, path: test.info().outputPath(`r13-${scheme}-clip${i}.png`) }));
                const mid = Math.floor(img.height / 2);
                const w = img.width;
                // The rim must be continuous with the interior: an inset ring
                // paints a veil over the first and last CSS px, a step the
                // gradient's own slope never makes. Compare the edge step
                // (rim pixel → first interior pixel past one CSS px) with the
                // interior slope over the same run.
                const dpr = 2;
                const step = (x0: number, x1: number) => delta(px(img, x0, mid), px(img, x1, mid));
                const headEdge = step(0, dpr);
                const headSlope = step(dpr, 2 * dpr);
                const tailEdge = step(w - 1, w - 1 - dpr);
                const tailSlope = step(w - 1 - dpr, w - 1 - 2 * dpr);
                if (headEdge > headSlope + 4 || tailEdge > tailSlope + 4) {
                    await page.screenshot({
                        path: test.info().outputPath(`r13-${scheme}-chip${i}.png`),
                        clip: { x: box.x - 40, y: box.y - 20, width: box.width + 200, height: box.height + 40 },
                    });
                }
                expect.soft(headEdge, `${tag}: head rim step ${headEdge} vs interior slope ${headSlope} (rim ${px(img, 0, mid)}, first stop ${s.first})`).toBeLessThanOrEqual(headSlope + 4);
                expect.soft(tailEdge, `${tag}: tail rim step ${tailEdge} vs interior slope ${tailSlope} (rim ${px(img, w - 1, mid)}, last stop ${s.last})`).toBeLessThanOrEqual(tailSlope + 4);
            }
            await page.keyboard.press("Escape");
        } finally {
            await ctx.close();
        }
    });

    test(`D-11 · the strip chip sits on its own opaque stage — the selected row's highlight never reaches it (${scheme})`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await boot(page, "generate", dark);
            const slider = page.getByRole("slider", { name: "Number of colors" }).first();
            await slider.focus();
            await page.keyboard.press("End"); // count 12: the tail segment is masked
            await page.waitForTimeout(500);

            // ONE open menu, so the chip's geometry is identical across both
            // frames: the only change is the row fill (reka's highlight, which
            // the selected row wears on open) arriving on or leaving the row.
            await openMenu(page, "Preset");
            const row = page.getByRole("option").filter({ hasText: "Vibrant" }).first();
            // The highlight goes to a row NOT adjacent to Vibrant: an adjacent
            // row's highlight pill casts its edge over the neighbouring row
            // (painted OVER the chip, a separate z-order effect, measured in
            // the debug frames), which is not the composite-through channel.
            const options = page.getByRole("option");
            const names = await options.allTextContents();
            const vi = names.findIndex((t) => t.includes("Vibrant"));
            const far = names.findIndex((_, i) => Math.abs(i - vi) >= 3);
            expect(far, "a row three or more away from Vibrant exists").toBeGreaterThanOrEqual(0);
            const other = options.nth(far);
            const chip = row.locator("[data-stops]");
            expect(await row.getAttribute("aria-selected"), "Vibrant is the selected preset at boot").toBe("true");
            await chip.evaluate((el) => el.scrollIntoView({ block: "center" }));
            await page.waitForTimeout(200);
            // The stage's alpha: composite its colour over black and over white.
            const stage = await chip.evaluate((el) => {
                const cv = document.createElement("canvas").getContext("2d")!;
                const over = (g: string) => {
                    cv.fillStyle = g;
                    cv.fillRect(0, 0, 1, 1);
                    cv.fillStyle = getComputedStyle(el).backgroundColor;
                    cv.fillRect(0, 0, 1, 1);
                    return cv.getImageData(0, 0, 1, 1).data[0] ?? 0;
                };
                return 1 - (over("#fff") - over("#000")) / 255;
            });
            expect.soft(stage, "the chip carries its own opaque stage (alpha)").toBe(1);

            // ONE fixed whole-CSS-px clip for both frames (a fractional clip is
            // rounded by the capture, which would re-register the frames).
            const a0 = await contentBox(page, chip);
            const clip = {
                x: Math.floor(a0.x) - 2,
                y: Math.floor(a0.y) - 2,
                width: Math.ceil(a0.width) + 4,
                height: Math.ceil(a0.height) + 5,
            };
            const shot = async (hover: typeof row) => {
                const hb = (await hover.boundingBox())!;
                await page.mouse.move(hb.x + hb.width - 12, hb.y + hb.height / 2);
                // The highlight moves the row (a sub-px lift); wait until the
                // chip's box holds still across 300 ms before capturing.
                let last = await contentBox(page, chip);
                for (let k = 0; k < 15; k++) {
                    await page.waitForTimeout(300);
                    const now = await contentBox(page, chip);
                    if (now.x === last.x && now.y === last.y) break;
                    last = now;
                }
                const tag = (await hover.textContent())?.trim().slice(0, 12).replace(/\W+/g, "") ?? "row";
                return {
                    box: await contentBox(page, chip),
                    img: decodePng(await page.screenshot({ clip, path: test.info().outputPath(`d11-${scheme}-${tag}.png`) })),
                    lit: await row.getAttribute("data-highlighted"),
                    fill: await row.evaluate((el) => getComputedStyle(el).backgroundColor),
                };
            };
            const a = await shot(row);
            const b = await shot(other);
            expect(a.lit, "frame A: the Vibrant row is highlighted").not.toBeNull();
            expect(b.lit, "frame B: the Vibrant row is not highlighted").toBeNull();
            expect(a.fill, "the row fill really changes between frames").not.toBe(b.fill);

            // The highlight moves the row (measured 0.5-1 CSS px), and the box
            // read and the capture can straddle that settle. Register B onto A
            // FROM THE PIXELS: the whole-device-px (dx, dy) that best aligns the
            // opaque head segments (the first 60 % of the chip, which no
            // highlight can reach either way). The verdict is then read over
            // the whole specimen shape, masked tail and corner arcs included.
            const x0 = Math.ceil((a.box.x - clip.x) * 2);
            const x1 = Math.floor((a.box.x + a.box.width - clip.x) * 2);
            const y0 = Math.ceil((a.box.y - clip.y) * 2);
            const y1 = Math.floor((a.box.y + a.box.height - clip.y) * 2);
            // Only the specimen's own painted shape is compared: device pixels
            // whose centre lies inside the content box rounded by the INNER
            // radius (radius-sm less the border). A content-box corner pixel
            // beyond the chip's outer arc is the row itself, not the chip.
            const { radius, border } = await chip.evaluate((el) => {
                const cs = getComputedStyle(el);
                return { radius: parseFloat(cs.borderTopLeftRadius), border: parseFloat(cs.borderTopWidth) };
            });
            const rIn = Math.max(0, radius - border);
            // The shape is taken 1 CSS px (2 device px) inside the content
            // edge: the row's settle leaves a sub-device-px residue (measured
            // ≤ 0.12 device px) that re-rasterises the clip's own antialiased
            // edge (measured Δ5-6 at an inner corner, cured tree, light).
            const inset = 1;
            const inside = (cx: number, cy: number) => {
                const x = cx - inset;
                const y = cy - inset;
                const w = a.box.width - 2 * inset;
                const h = a.box.height - 2 * inset;
                const r = Math.max(0, rIn - inset);
                if (x < 0 || y < 0 || x > w || y > h) return false;
                const qx = Math.max(r - x, x - (w - r), 0);
                const qy = Math.max(r - y, y - (h - r), 0);
                return qx * qx + qy * qy <= r * r;
            };
            const pts: [number, number][] = [];
            for (let y = y0; y < y1; y++) {
                for (let x = x0; x < x1; x++) {
                    const cx = (x + 0.5) / 2 + clip.x - a.box.x;
                    const cy = (y + 0.5) / 2 + clip.y - a.box.y;
                    if (inside(cx, cy)) pts.push([x, y]);
                }
            }
            const headPts = pts.filter(([x]) => x < x0 + 0.6 * (x1 - x0));
            let dx = 0;
            let dy = 0;
            let best = Infinity;
            for (let ty = -6; ty <= 6; ty++) {
                for (let tx = -2; tx <= 2; tx++) {
                    let sum = 0;
                    for (const [x, y] of headPts) sum += delta(px(a.img, x, y), px(b.img, x + tx, y + ty));
                    if (sum < best) [best, dx, dy] = [sum, tx, ty];
                }
            }
            let worst = 0;
            let at = [0, 0];
            const compared = pts.length;
            for (const [x, y] of pts) {
                const d = delta(px(a.img, x, y), px(b.img, x + dx, y + dy));
                if (d > worst) [worst, at] = [d, [x - x0, y - y0]];
            }
            expect(
                worst,
                `Vibrant chip content (${compared} device px inside the r=${rIn} shape less 1px, registered dx ${dx} dy ${dy}): highlighted vs not, worst channel delta at ${at}; boxes ${JSON.stringify(a.box)} ${JSON.stringify(b.box)}`,
            ).toBeLessThanOrEqual(4);
            await page.keyboard.press("Escape");
        } finally {
            await ctx.close();
        }
    });
}
