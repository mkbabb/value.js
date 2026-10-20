import { writeFileSync } from "node:fs";
import type { Page } from "@playwright/test";
import { adminPopulatedTest as test, expect, QUEUE } from "./fixtures/admin-populated";

/**
 * SS-8 · B17-admin-shell-names — the four live REFUTED rows, read off the frame
 * (packet `docs/tranches/X/execution/SS8/packets/B17-admin-shell-names.md`).
 *
 *   SS8-0478  the names row's secondary line clears 4.5:1 over its own painted
 *             ground, both schemes, 1440 and 390, across a swept aurora hue.
 *   SS8-0483  the skeleton's bar reads as a register: |ΔL| ≥ 0.03 against the
 *             row ground beside it, one polarity per scheme at both widths.
 *   SS8-0487  the skeleton's content column is the live text stack's height.
 *   SS8-0504  forced-colors keeps each proposal's swatch colour.
 */
const TEXT_FLOOR = 4.5;
const INK_FLOOR = 0.03;
const CELLS = [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
] as const;
const HUES = [25, 145, 265] as const;
/** The AdminListItem row frame (its root classes at HEAD). */
const ROW = "#admin-names-pending .flex.items-center.gap-3.rounded-md";

/** Decode a PNG in-page and run `fn` over its pixels (sRGB 0..255). */
async function readFrame<T, A>(
    page: Page,
    png: Buffer,
    arg: A,
    fn: string,
): Promise<T> {
    return page.evaluate(
        async ({ b64, arg, fn }) => {
            const img = new Image();
            img.src = "data:image/png;base64," + b64;
            await img.decode();
            const cv = document.createElement("canvas");
            cv.width = img.width;
            cv.height = img.height;
            const ctx = cv.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            const px = (x: number, y: number) => [...ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data.slice(0, 3)];
            const mean = (x0: number, y0: number, x1: number, y1: number) => {
                const d = ctx.getImageData(Math.round(x0), Math.round(y0), Math.max(1, Math.round(x1 - x0)), Math.max(1, Math.round(y1 - y0))).data;
                const s: [number, number, number] = [0, 0, 0];
                for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) s[k as 0] += d[i + k]!;
                const n = d.length / 4;
                return [s[0] / n, s[1] / n, s[2] / n] as [number, number, number];
            };
            const lin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
            const lum = ([r, g, b]: readonly [number, number, number]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
            const cr = (a: [number, number, number], b: [number, number, number]) => {
                const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p) as [number, number];
                return (x + 0.05) / (y + 0.05);
            };
            const okL = ([r, g, b]: readonly [number, number, number]) => {
                const [R, G, B] = [lin(r), lin(g), lin(b)];
                const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
                const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
                const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
                return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
            };
            const solid = (css: string) => {
                const c = document.createElement("canvas").getContext("2d")!;
                c.fillStyle = css;
                c.fillRect(0, 0, 1, 1);
                const d = c.getImageData(0, 0, 1, 1).data;
                return [d[0]!, d[1]!, d[2]!, d[3]! / 255] as const;
            };
            // eslint-disable-next-line no-new-func
            return new Function("arg", "h", `return (${fn})(arg, h)`)(arg, { px, mean, cr, okL, solid });
        },
        { b64: png.toString("base64"), arg, fn },
    );
}

async function openNames(page: Page, hue?: number) {
    const color = hue === undefined ? "" : "?color=" + encodeURIComponent(`oklch(0.62 0.17 ${hue})`);
    // a fresh document per read: the hues differ only in the fragment, and a
    // fragment hop on an open document is not a boot
    await page.goto("about:blank");
    await page.goto(`/#/admin/names${color}`);
    await page.locator("#admin-names-pending").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(1, 1);
    // the atmosphere boot's ink stamp and the aurora settle
    await page.waitForTimeout(1500);
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`B17 names · ${scheme}`, () => {
        test.use({ colorScheme: scheme });

        for (const vp of CELLS) {
            test(`SS8-0478 secondary line ≥ ${TEXT_FLOOR}:1 over its ground · ${vp.width}`, async ({ page }) => {
                test.setTimeout(300_000); // three cold boots on a shared machine
                await page.setViewportSize(vp);
                const reads: string[] = [];
                let worst = Infinity;
                for (const hue of HUES) {
                    await openNames(page, hue);
                    const rows = await page.evaluate((sel) =>
                        [...document.querySelectorAll(sel)].map((row) => {
                            const s = row.children[1]!.children[1] as HTMLElement;
                            const g = document.createRange();
                            g.selectNodeContents(s);
                            const b = g.getBoundingClientRect();
                            const actions = (row.lastElementChild as HTMLElement).getBoundingClientRect();
                            return { run: [b.x, b.y, b.width, b.height], actionsX: actions.x, ink: getComputedStyle(s).color };
                        }), ROW,
                    );
                    expect(rows.length).toBe(QUEUE.length);
                    const png = await page.screenshot();
                    const ratios = await readFrame<number[], typeof rows>(page, png, rows, `(rows, h) => rows.map((r) => {
                        const y = r.run[1] + r.run[3] / 2;
                        const x = Math.min(r.run[0] + r.run[2] + 16, r.actionsX - 8);
                        const g = h.px(x, y);
                        const [ir, ig, ib, a] = h.solid(r.ink);
                        const ink = [ir * a + g[0] * (1 - a), ig * a + g[1] * (1 - a), ib * a + g[2] * (1 - a)];
                        return h.cr(ink, g);
                    })`);
                    worst = Math.min(worst, ...ratios);
                    reads.push(`h${hue}: ${ratios.map((r) => r.toFixed(2)).join("/")} ink ${rows[0]!.ink}`);
                }
                console.log(`[0478 ${scheme} ${vp.width}] min ${worst.toFixed(2)} · ${reads.join(" · ")}`);
                expect(worst, reads.join("\n")).toBeGreaterThanOrEqual(TEXT_FLOOR);
            });
        }

        test(`SS8-0483 + SS8-0487 skeleton ink register and column · ${scheme}`, async ({ page }) => {
            test.setTimeout(360_000);
            const signs: number[] = [];
            const reads: string[] = [];
            for (const vp of CELLS) {
                await page.setViewportSize(vp);
                let release!: () => void;
                const gate = new Promise<void>((r) => (release = r));
                const held: string[] = [];
                await page.route("**/admin/queue**", async (route) => {
                    held.push(route.request().url());
                    await gate;
                    await route.fallback();
                });
                const t0 = Date.now();
                // a fresh document per cell: a goto to the URL already open is a
                // same-document fragment hop that never re-issues the queue read
                await page.goto("about:blank");
                await page.goto("/#/admin/names");
                const skel = page.locator("[data-slot=admin-list-skeleton]");
                await expect(skel, `held ${held.join(" ")}`).toHaveCount(3, { timeout: 150_000 }).catch(async (e) => {
                    const state = await page.evaluate((w) => ({ w, hash: location.hash, panes: [...document.querySelectorAll("[data-pane]")].map((p) => p.getAttribute("data-pane")), text: document.body.innerText.slice(0, 400) }), vp.width);
                    if (process.env.SS8_SHOTS) await page.screenshot({ path: `${process.env.SS8_SHOTS}/diag-${scheme}-${vp.width}.png` });
                    throw new Error(`${JSON.stringify(state)}\n${e}`);
                });
                await page.evaluate(() => document.fonts.ready);
                await page.waitForTimeout(1200);
                const geo = await page.evaluate(() =>
                    [...document.querySelectorAll("[data-slot=admin-list-skeleton]")].map((row) => {
                        const r = (e: Element) => {
                            const b = e.getBoundingClientRect();
                            return [b.x, b.y, b.width, b.height];
                        };
                        const blocks = [...row.querySelectorAll("[data-slot=skeleton]")];
                        const bar = blocks[1]!;
                        const cs = getComputedStyle(bar);
                        return { col: r(row.children[1]!), bar: r(bar), lozenge: r(blocks[blocks.length - 1]!), ink: `${cs.backgroundColor}@${cs.opacity}` };
                    }),
                );
                const png = await page.screenshot();
                // SS8_SHOTS=<dir>: keep the measured frame beside the run's log
                if (process.env.SS8_SHOTS) writeFileSync(`${process.env.SS8_SHOTS}/skel-${scheme}-${vp.width}.png`, png);
                const dLs = await readFrame<number[][], typeof geo>(page, png, geo, `(rows, h) => rows.map(({ bar, lozenge }) => {
                    const [x, y, w, hh] = bar;
                    const block = h.mean(x + 2, y + 2, x + w - 2, y + hh - 2);
                    // the ground beside the bar's end (a narrow band: the card's lighting
                    // gradient across the row would bias a wide one)
                    const ground = h.mean(x + w + 4, y + 2, Math.min(x + w + 24, lozenge[0] - 4), y + hh - 2);
                    const above = h.mean(x + 2, y - 3, x + w - 2, y - 1), below = h.mean(x + 2, y + hh + 1, x + w - 2, y + hh + 3);
                    return [h.okL(block) - h.okL(ground), h.okL(block) - (h.okL(above) + h.okL(below)) / 2];
                })`);
                const dL = dLs.map((d) => d[0]!);
                release();
                await page.unroute("**/admin/queue**");
                await expect(page.locator(ROW)).toHaveCount(QUEUE.length);
                const liveCol = await page.evaluate(
                    (sel) => document.querySelector(sel)!.children[1]!.getBoundingClientRect().height,
                    ROW,
                );
                for (const d of dL) signs.push(Math.sign(d));
                reads.push(`${vp.width}: dL ${dL.map((d) => d.toFixed(3)).join("/")} col ${geo[0]!.col[3]!.toFixed(2)} vs live ${liveCol.toFixed(2)} ink ${geo[0]!.ink} vsAboveBelow ${dLs.map((d) => d[1]!.toFixed(3)).join("/")} t ${Date.now() - t0}ms`);
                for (const d of dL) expect(Math.abs(d), reads.join("\n")).toBeGreaterThanOrEqual(INK_FLOOR);
                expect(Math.abs(geo[0]!.col[3]! - liveCol), reads.join("\n")).toBeLessThanOrEqual(1);
            }
            console.log(`[0483/0487 ${scheme}] ${reads.join(" · ")}`);
            expect(new Set(signs).size, reads.join("\n")).toBe(1);
        });
    });
}

test.describe("B17 names · forced colors", () => {
    test.use({ colorScheme: "dark" });

    test("SS8-0504 each proposal swatch keeps its colour under forced-colors", async ({ page }) => {
        test.setTimeout(90_000);
        await openNames(page);
        // the same swatch centres read unforced, then forced: the subject colour
        // must survive the forcing (pre-cure the forced swatch is the Canvas ring)
        await page.emulateMedia({ reducedMotion: "reduce" });
        const unforced = await page.screenshot();
        await page.emulateMedia({ forcedColors: "active" });
        await page.waitForTimeout(500);
        expect(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)).toBe(true);
        const swatches = await page.evaluate((sel) =>
            [...document.querySelectorAll(sel)].map((row) => {
                const e = row.children[0]!.firstElementChild as HTMLElement;
                const b = e.getBoundingClientRect();
                return { c: [b.x + b.width / 2, b.y + b.height / 2], css: e.style.backgroundColor };
            }), ROW,
        );
        expect(swatches.length).toBe(QUEUE.length);
        const png = await page.screenshot();
        const read = (frame: Buffer) =>
            readFrame<number[][], typeof swatches>(page, frame, swatches, `(rows, h) => rows.map(({ c }) => h.px(c[0], c[1]))`);
        const [before, after] = [await read(unforced), await read(png)];
        const deltas = before.map((b, i) => Math.max(...[0, 1, 2].map((k) => Math.abs(b[k]! - after[i]![k]!))));
        console.log(`[0504] swatch Δ ${deltas.join("/")}`);
        for (const d of deltas) expect(d).toBeLessThanOrEqual(8);
    });
});
