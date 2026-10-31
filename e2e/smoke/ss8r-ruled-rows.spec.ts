import { test, expect, type Page } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8.r — the delegate-ruled consumer rows (COHESION §0gk.2/.3), each a live
 * falsifier on the served app:
 *
 *   · B15 SS8-0440  elevation reads the same in both schemes: the `--well-bg`
 *                   fixture LIFTS above its host (OKLab L up) in light AND dark.
 *   · B13 L-3       the card attribution ink takes the strong muted step and
 *                   clears 4.5:1 over the DARKEST ground pixel under it (the
 *                   §0gk.2 referent law), both schemes, a five-seed sweep.
 *   · B03 SS8-0085  at 390 the hero clips its own paint at the viewport (its
 *                   clipped extent never passes the viewport edge) with no
 *                   horizontal overflow, and the bead's seat is unchanged.
 *
 * Local seeds only: localStorage for the scheme / session colour / saved
 * palettes, and a routed `GET /palettes` for the browse wall. No server writes.
 */

type RGB = [number, number, number];
const lin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]: RGB) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a: RGB, b: RGB) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p) as [number, number];
    return (x + 0.05) / (y + 0.05);
};
const okL = ([r, g, b]: RGB) => {
    const [R, G, B] = [lin(r), lin(g), lin(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
};

/** Every pixel of a CSS-px clip (dpr 1) of the live frame. */
async function region(page: Page, clip: { x: number; y: number; width: number; height: number }): Promise<RGB[]> {
    const img = decodePng(await page.screenshot({ clip }));
    const out: RGB[] = [];
    for (let i = 0; i < img.width * img.height; i++) {
        const o = i * img.channels;
        out.push([img.data[o] ?? 0, img.data[o + 1] ?? 0, img.data[o + 2] ?? 0]);
    }
    return out;
}

async function seed(page: Page, scheme: "light" | "dark", color: string | null, saved?: unknown[]) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.addInitScript(
        ([s, c, p]) => {
            try {
                localStorage.setItem("vueuse-color-scheme", s as string);
                if (c) localStorage.setItem("color-picker", JSON.stringify({ inputColor: c, savedColors: [] }));
                if (p) localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: p }));
            } catch {
                /* storage unavailable: the boot seed stands */
            }
        },
        [scheme, color, saved ?? null] as const,
    );
}

const NOW = "2026-10-19T00:00:00.000Z";
const SEEDS = [null, "oklch(0.62 0.16 0)", "oklch(0.65 0.14 340)", "oklch(0.62 0.16 120)", "oklch(0.62 0.16 240)"];

test.describe.configure({ timeout: 240_000 });

test.describe("SS8-0440 · the well lifts above its host in both schemes", () => {
    test.use({ viewport: { width: 1440, height: 900 } });
    const hue = (n: number) => Array.from({ length: n }, (_, i) => `oklch(0.72 0.16 ${Math.round((i * 360) / n)})`);
    const SAVED = Array.from({ length: 6 }, (_, i) => ({
        id: `p${i}`, name: `Saved ${i}`, slug: `p${i}`,
        colors: hue(5).map((css, position) => ({ css, position })),
        createdAt: NOW, updatedAt: NOW, isLocal: true, published: false, visibility: "private", tags: [],
    }));
    for (const scheme of ["light", "dark"] as const) {
        for (const color of [null, "oklch(0.62 0.16 240)"]) {
            test(`${scheme} · seed ${color ?? "default"}`, async ({ page }) => {
                await seed(page, scheme, color, SAVED);
                await page.goto("/#/palettes", { waitUntil: "domcontentloaded", timeout: 180_000 });
                await expect(page.locator("[role=article]").nth(1)).toBeVisible({ timeout: 90_000 });
                await page.waitForTimeout(1500);
                // Adjacent sampling across the card's inline-start edge, where
                // no cartoon stamp falls (it casts down-right): the card's own
                // fill 8 px inside the edge against the host plate 8 px outside
                // it, on every row where the inside point is the card's own
                // surface (not a strip, swatch or label), at one instant.
                const g = await page.evaluate(() => {
                    const card = document.querySelector<HTMLElement>("[role=article]")!;
                    const a = card.getBoundingClientRect();
                    const rows: number[] = [];
                    for (let y = Math.ceil(a.top) + 10; y < a.bottom - 10; y += 4) {
                        const e = document.elementFromPoint(a.left + 8, y);
                        if (e === card) rows.push(y);
                    }
                    return { inX: Math.round(a.left + 8), outX: Math.round(a.left - 8), rows, wellBg: getComputedStyle(card).backgroundColor };
                });
                expect(g.rows.length, JSON.stringify(g)).toBeGreaterThan(2);
                const y0 = Math.min(...g.rows);
                const h = Math.max(...g.rows) - y0 + 1;
                const inside = await region(page, { x: g.inX, y: y0, width: 1, height: h });
                const outside = await region(page, { x: g.outX, y: y0, width: 1, height: h });
                const dLs = g.rows.map((y) => okL(inside[y - y0]!) - okL(outside[y - y0]!)).sort((p, q) => p - q);
                const dL = dLs[dLs.length >> 1]!;
                // RED before: light ΔL < 0 (the 8% ink wash sank the well), dark > 0.
                expect(dL, `median ΔL ${dL.toFixed(4)} over ${dLs.length} rows · ${JSON.stringify(g)}`).toBeGreaterThan(0.015);
            });
        }
    }
});

test.describe("B13 L-3 · the attribution ink clears 4.5:1 over its darkest ground", () => {
    test.use({ viewport: { width: 1440, height: 900 } });
    const COLORS = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"];
    const WALL = [{
        name: "Probe Five", slug: "probe-five", userSlug: "gallery",
        colors: COLORS.map((css, position) => ({ css, position })),
        createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 1, visibility: "public", tier: "standard", published: true,
    }];
    const CARD = '[role="article"][aria-label="Palette: Probe Five"]';
    const INK = `${CARD} [data-palette-swatches] span.text-small`;
    for (const scheme of ["light", "dark"] as const) {
        test(`${scheme} · five-seed sweep`, async ({ page }) => {
            await page.route(
                (u) => !/\/(@fs|@id|@vite|node_modules)\//.test(u.pathname) && !/\.\w+$/.test(u.pathname) && /(^|\/)palettes(\/|$)/.test(u.pathname),
                (r) => r.request().method() !== "GET"
                    ? r.continue()
                    : r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: WALL, nextCursor: null, hasMore: false }) }),
            );
            const worst: string[] = [];
            for (const color of SEEDS) {
                await page.evaluate(() => localStorage.clear()).catch(() => {});
                await seed(page, scheme, color);
                await page.goto("/#/browse", { waitUntil: "domcontentloaded", timeout: 180_000 });
                await page.reload({ waitUntil: "domcontentloaded" });
                await expect(page.locator(CARD)).toBeVisible({ timeout: 90_000 });
                await page.waitForTimeout(1000);
                await page.click(CARD, { position: { x: 30, y: 20 } });
                await expect(page.locator(INK)).toBeVisible({ timeout: 10_000 });
                await page.waitForTimeout(1200);
                const g = await page.$eval(INK, (el) => {
                    const cv = document.createElement("canvas").getContext("2d")!;
                    const rgb = (css: string) => {
                        cv.clearRect(0, 0, 1, 1);
                        cv.fillStyle = "#000";
                        cv.fillStyle = css;
                        cv.fillRect(0, 0, 1, 1);
                        return [...cv.getImageData(0, 0, 1, 1).data.slice(0, 3)];
                    };
                    const probe = document.createElement("span");
                    probe.style.color = "var(--muted-foreground-strong)";
                    el.append(probe);
                    const strong = getComputedStyle(probe).color;
                    probe.remove();
                    const r = el.getBoundingClientRect();
                    return { ink: rgb(getComputedStyle(el).color), inkCss: getComputedStyle(el).color, strong, r: { x: Math.floor(r.x), y: Math.floor(r.y), width: Math.ceil(r.width), height: Math.ceil(r.height) } };
                });
                // The ink IS the strong muted step (the ruled token step).
                expect(g.inkCss).toBe(g.strong);
                // The referent: every ground pixel under the text box, ink hidden.
                await page.$eval(INK, (el) => (el as HTMLElement).style.setProperty("color", "transparent", "important"));
                await page.waitForTimeout(120);
                const ground = await region(page, g.r);
                await page.$eval(INK, (el) => (el as HTMLElement).style.removeProperty("color"));
                const min = Math.min(...ground.map((p) => contrast(g.ink as RGB, p)));
                const L = ground.map(lum).sort((x, y) => x - y);
                worst.push(`${color ?? "default"}:${min.toFixed(2)} ink ${g.ink} ground lum ${L[0]!.toFixed(3)}/${L[L.length >> 1]!.toFixed(3)}/${L[L.length - 1]!.toFixed(3)}`);
                if (min < 4.5) await page.screenshot({ path: test.info().outputPath(`l3-${scheme}-${color ?? "default"}.png`) });
                // RED before (bare muted ink on the sinking well): light 3.41..3.82.
                expect(min, worst.join(" ")).toBeGreaterThanOrEqual(4.5);
            }
        });
    }
});

test.describe("SS8-0085 · at 390 the hero clips at the viewport", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    for (const route of ["/", "/blob"]) {
        test(`#${route}`, async ({ page }) => {
            await page.goto(`/#${route}`, { waitUntil: "load", timeout: 180_000 });
            await page.waitForSelector(".hero-blob-anchor canvas", { timeout: 90_000 });
            await page.waitForTimeout(2500);
            const m = await page.evaluate(() => {
                const anchor = document.querySelector<HTMLElement>(".hero-blob-anchor")!;
                const canvas = anchor.querySelector("canvas")!;
                const shell = anchor.closest<HTMLElement>(".pane-shell")!;
                const a = anchor.getBoundingClientRect();
                const c = canvas.getBoundingClientRect();
                const s = shell.getBoundingClientRect();
                const cs = getComputedStyle(anchor);
                // The hero's own clip: `inset(<len>)` on the anchor's border box.
                const inset = /^inset\((-?[\d.]+)px\)$/.exec(cs.clipPath);
                const seat = parseFloat(getComputedStyle(shell).getPropertyValue("--blob-seat")) || 0;
                return {
                    clipPath: cs.clipPath,
                    insetPx: inset ? Number(inset[1]) : null,
                    anchor: [a.left, a.top, a.right, a.bottom],
                    canvasRight: c.right,
                    shell: [s.left, s.top, s.right],
                    seat,
                    vw: window.innerWidth,
                    docSW: document.documentElement.scrollWidth,
                    bodySW: document.body.scrollWidth,
                };
            });
            const detail = JSON.stringify(m);
            // The overscan still reaches past the viewport (the producer's 1.6×
            // canvas is untouched) ...
            expect(m.canvasRight, detail).toBeGreaterThan(m.vw);
            // ... so the hero's own clip is what holds its paint to the viewport.
            expect(m.insetPx, detail).not.toBeNull();
            const paintRight = Math.min(m.canvasRight, m.anchor[2]! - m.insetPx!);
            expect(paintRight, detail).toBeLessThanOrEqual(m.vw + 0.5);
            // No horizontal overflow.
            expect(m.docSW, detail).toBeLessThanOrEqual(m.vw);
            expect(m.bodySW, detail).toBeLessThanOrEqual(m.vw);
            // The bead's seat is unchanged: flush top-right of the pane shell.
            expect(Math.abs(m.anchor[2]! - (m.shell[2]! - m.seat)), detail).toBeLessThan(0.5);
            expect(Math.abs(m.anchor[1]! - (m.shell[1]! + m.seat)), detail).toBeLessThan(0.5);
        });
    }
});
