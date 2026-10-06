import { expect, test } from "@playwright/test";
import { detectRenderer, isSoftwareGL } from "./frame-budget";

/**
 * COHESION §0ei (owner law, 2026-10-06; supersedes §0be/§0ax D1's headed
 * instrument) — THE REAL-GPU CELL RUNS IN THE BACKGROUND.
 *
 * `W12_REAL_GPU=1` opts a spec file into the installed Google Chrome
 * (`channel: "chrome"`) in new headless mode (the full browser, not
 * `chrome-headless-shell`) on ANGLE Metal. No window opens. Measured on the
 * owner's Mac 2026-10-06: WebGL `UNMASKED_RENDERER_WEBGL` = "ANGLE (Apple,
 * ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)"; WebGPU adapter
 * vendor "apple", architecture "metal-3", not a fallback adapter.
 *
 * `--force-device-scale-factor=2` gives the headless screen the Retina
 * display's scale, the screen the headed cell ran on: `devicePixelContentBoxSize`
 * reports the screen's scale, not the emulated `deviceScaleFactor` (measured
 * headless: a 1x box at DPR 1, 2 and 2.5 without the flag, a 2x box with it).
 *
 * The headless rAF clock is 60 Hz (measured: a blank page reads rAF p50/p95
 * 16.70/16.70 ms), so a reading of record taken on the headed 120 Hz panel
 * is not reproducible here; frame-budget gates are read as they stand.
 *
 * Every test in an opted-in file first asserts the renderer is hardware, so
 * the cell fails loudly rather than measuring SwiftShader.
 */
export const REAL_GPU = process.env.W12_REAL_GPU === "1";

export const REAL_GPU_ARGS = ["--use-angle=metal", "--force-device-scale-factor=2"];

/** Call at a spec file's top level: under `W12_REAL_GPU=1`, run the file on the background real-GPU cell. */
export function useRealGpuCell(): void {
    if (!REAL_GPU) return;
    test.use({ channel: "chrome", headless: true, launchOptions: { args: REAL_GPU_ARGS } });
    test.beforeEach(async ({ page }) => {
        const renderer = await detectRenderer(page);
        expect(isSoftwareGL(renderer), `the real-GPU cell landed on a software renderer: '${renderer}'`).toBe(false);
        expect(renderer, "the real-GPU cell runs on the Apple GPU (ANGLE Metal)").toMatch(/Apple.*Metal|Metal.*Apple/);
    });
}
