import { test, expect, type Page } from "@playwright/test";
import { decodePng, meanRgb } from "./fixtures/frame-diff";
import { ATMOSPHERE_TESTID } from "./fixtures/webgl-appearance";
import { detectRenderer } from "./perf/frame-budget";

/**
 * X.W12.a · OA-4 / OA-18 / UIA-V-1 — THE GROUND NEVER PAINTS BLACK.
 *
 * The reproduction script the owner's "the background is black" docket asks
 * for: a cold load, a 30 s idle, a tab hide/show, a resize and a surface drag,
 * reading the page GROUND (the viewport gutters, outside every pane) at each
 * step. Two structural witnesses ride beside the pixel read, because the
 * measured cause was structural, not chromatic:
 *   · the atmosphere canvas is VIEWPORT-sized (its box equals the viewport,
 *     never the document), so its backing store stays inside WebGPU's 8192
 *     `maxTextureDimension2D` — BEFORE it measured 2160×11368 on `/`;
 *   · the page raises 0 WebGPU validation errors (BEFORE: ~100 per second
 *     once the About pane grew the document).
 *
 * Legs (one spec, three cells):
 *   · SwiftShader, dev server   — the `smoke` project as-is.
 *   · gh-pages build            — `W12_ORIGIN=http://localhost:<port>/` over a
 *                                 static serve of `vite build --mode gh-pages`.
 *   · headed real GPU           — `W12_REAL_GPU=1 … --headed` drops the
 *                                 SwiftShader flags (§0ax D1's instrument), so
 *                                 the live WebGPU field is what is read.
 */

const REAL_GPU = process.env.W12_REAL_GPU === "1";
const ORIGIN = process.env.W12_ORIGIN; // undefined → the project baseURL
const BLACK_MAX_CHANNEL = 12; // a channel ceiling: the dark ground reads ≥ 30
const WEBGPU_MAX_TEXTURE = 8192;

if (REAL_GPU) test.use({ launchOptions: { args: [] }, headless: false });
test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

type Sample = { step: string; rgb: number[][]; backing: [number, number]; box: [number, number] };

async function sampleGround(page: Page, step: string): Promise<Sample> {
    const vp = page.viewportSize()!;
    const points: Array<[number, number]> = [
        [2, Math.round(vp.height * 0.33)],
        [2, vp.height - 40],
        [vp.width - 8, Math.round(vp.height * 0.5)],
        [vp.width - 8, vp.height - 40],
    ];
    const rgb: number[][] = [];
    for (const [x, y] of points) {
        const png = await page.screenshot({ clip: { x, y, width: 6, height: 6 } });
        rgb.push(meanRgb(decodePng(png)).map(Math.round));
    }
    const { backing, box } = await page.evaluate((id) => {
        const c = document.querySelector(`[data-testid="${id}"]`) as HTMLCanvasElement;
        const r = c.getBoundingClientRect();
        return {
            backing: [c.width, c.height] as [number, number],
            box: [Math.round(r.width), Math.round(r.height)] as [number, number],
        };
    }, ATMOSPHERE_TESTID);
    return { step, rgb, backing, box };
}

for (const route of ["#/", "#/mix→#/"] as const) {
    test(`w12-ground — the ground never paints black (${route})`, async ({ page, context }) => {
        test.setTimeout(150_000);
        let gpuErrors = 0;
        page.on("console", (m) => {
            if (/GPUValidationError|Invalid (TextureView|CommandBuffer)/.test(m.text())) gpuErrors++;
        });
        await page.addInitScript(() => localStorage.setItem("vueuse-color-scheme", "dark"));
        const [first, then] = route.split("→");
        await page.goto((ORIGIN ?? "/") + first);
        const renderer = await detectRenderer(page);
        const samples: Sample[] = [];
        const t0 = Date.now();
        const at = async (s: number, step: string) => {
            await page.waitForTimeout(Math.max(0, s * 1000 - (Date.now() - t0)));
            samples.push(await sampleGround(page, step));
        };
        await at(1, "cold+1s");
        await at(3, "cold+3s");
        if (then) {
            await page.evaluate((h) => (location.hash = h), then);
            await page.waitForTimeout(1500);
            samples.push(await sampleGround(page, "nav→/"));
        }
        for (const s of [6, 12, 20, 32]) await at(s + (then ? 2 : 0), `idle+${s}s`);

        // Playwright's focus emulation pins every page to `visible`; drop it
        // so the tab switch below really hides this page (visibilitychange,
        // rAF throttle — the owner's tab-away), and freeze it on the CDP
        // web-lifecycle door where the embedder keeps it visible (headless).
        const cdp = await context.newCDPSession(page);
        await cdp.send("Emulation.setFocusEmulationEnabled", { enabled: false });
        const other = await context.newPage();
        await other.goto("about:blank");
        await other.bringToFront();
        await page.waitForTimeout(1500);
        let hiddenState: string = await page.evaluate(() => document.visibilityState);
        if (hiddenState === "visible") {
            await cdp.send("Page.setWebLifecycleState", { state: "frozen" });
            await page.waitForTimeout(1500);
            await cdp.send("Page.setWebLifecycleState", { state: "active" });
            // …and drive the page's own visibility door (the handlers the
            // atmosphere and the blob pause/resume on), since the embedder
            // never reports `hidden` under Playwright (measured: headless,
            // headed, minimised window all read `visible`).
            await page.evaluate(async () => {
                const set = (v: string) => {
                    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => v });
                    Object.defineProperty(document, "hidden", { configurable: true, get: () => v === "hidden" });
                    document.dispatchEvent(new Event("visibilitychange"));
                };
                set("hidden");
                await new Promise((r) => setTimeout(r, 1500));
                set("visible");
                delete (document as { visibilityState?: unknown }).visibilityState;
                delete (document as { hidden?: unknown }).hidden;
            });
            hiddenState = "frozen+visibilitychange";
        }
        await page.bringToFront();
        await other.close();
        await page.waitForTimeout(800);
        samples.push(await sampleGround(page, `hide(${hiddenState})/show`));

        await page.setViewportSize({ width: 1100, height: 760 });
        await page.waitForTimeout(800);
        samples.push(await sampleGround(page, "resize-small"));
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.waitForTimeout(800);
        samples.push(await sampleGround(page, "resize-back"));

        const surface = page.locator(".spectrum-picker").first();
        const b = await surface.boundingBox();
        if (!b) throw new Error("w12-ground: picker surface not laid out");
        await page.mouse.move(b.x + 20, b.y + 20);
        await page.mouse.down();
        for (let i = 1; i <= 40; i++) {
            await page.mouse.move(
                b.x + 20 + (i * (b.width - 40)) / 40,
                b.y + 20 + (i * (b.height - 40)) / 40,
            );
            await page.waitForTimeout(40);
        }
        await page.mouse.up();
        await page.waitForTimeout(500);
        samples.push(await sampleGround(page, "drag"));
        await page.mouse.wheel(0, 3000);
        await page.waitForTimeout(800);
        samples.push(await sampleGround(page, "scrolled"));

        let black = 0;
        for (const s of samples) {
            const nb = s.rgb.filter((v) => Math.max(...v) <= BLACK_MAX_CHANNEL).length;
            black += nb;
            console.log(
                `[w12-ground ${route}] ${s.step} black=${nb} backing=${s.backing.join("x")} box=${s.box.join("x")} ${s.rgb.map((v) => v.join(",")).join(" | ")}`,
            );
        }
        const maxBacking = Math.max(...samples.flatMap((s) => s.backing));
        console.log(
            `[w12-ground ${route}] renderer=${renderer} origin=${ORIGIN ?? "dev"} samples=${samples.length * 4} black=${black} maxBacking=${maxBacking} gpuErrors=${gpuErrors}`,
        );
        expect(black, "ground samples painted black").toBe(0);
        expect(maxBacking, "atmosphere backing store past WebGPU's texture limit").toBeLessThanOrEqual(
            WEBGPU_MAX_TEXTURE,
        );
        for (const s of samples) {
            const vp = s.step === "resize-small" ? [1100, 760] : [1440, 900];
            expect(s.box, `atmosphere box is not the viewport at ${s.step}`).toEqual(vp);
        }
        expect(gpuErrors, "WebGPU validation errors on the page").toBe(0);
    });
}
