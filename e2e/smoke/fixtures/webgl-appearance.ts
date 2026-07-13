import type { Page } from "@playwright/test";

/**
 * S.W0 W0-2(d) — WebGL canvas APPEARANCE oracle helpers, shared by
 * `webgl-blob.spec.ts` + `webgl-atmosphere.spec.ts`.
 *
 * The wave's intent (e2e-coverage-gaps §4 P0 item 3) is a non-blank / actually-
 * rendering assertion beyond "canvas is attached + no context-loss". readPixels
 * (or toDataURL / getImageData) is NOT a stable oracle for these canvases: both
 * the goo-blob metaball renderer and the aurora runtime create their WebGL2
 * context with `preserveDrawingBuffer:false` (verified in glass-ui: goo-blob
 * `useMetaballRenderer.ts`, aurora `runtime.ts` — live default false), so after
 * the browser composites a frame the drawing buffer is cleared; a read landing
 * between draws sees an empty buffer. The blob further renders on-demand (~a few
 * draws/second when idle), so most frames read blank — the readPixels approach
 * is inherently racy (measured: flaky pass/fail).
 *
 * The robust, buffer- and timing-INDEPENDENT signal is to count the WebGL2 draw
 * calls each canvas receives: a canvas whose shader failed to compile/link, or
 * whose render loop is dead, draws NOTHING (count 0); a live pipeline draws
 * geometry (count > 0). This is instrumented on the WebGL2 prototype via
 * `addInitScript` (installed before any context is created) and attributed to
 * the owning canvas element.
 */

export const GOO_BLOB_TESTID = "goo-blob-canvas";
export const ATMOSPHERE_TESTID = "atmosphere-canvas";

interface CountedCanvas extends HTMLCanvasElement {
    __vjDrawCount?: number;
}

/**
 * Install per-canvas WebGL2 draw-call counting. MUST be called before
 * `page.goto` (it runs via `addInitScript`, before any `getContext("webgl2")`).
 * Each `drawArrays` / `drawElements` (incl. instanced) increments
 * `canvas.__vjDrawCount` on the context's owning canvas.
 */
export async function instrumentWebglDraws(page: Page): Promise<void> {
    await page.addInitScript(() => {
        const proto = window.WebGL2RenderingContext?.prototype;
        if (!proto) return;
        const methods = [
            "drawArrays",
            "drawElements",
            "drawArraysInstanced",
            "drawElementsInstanced",
        ] as const;
        for (const m of methods) {
            const orig = (proto as unknown as Record<string, unknown>)[m];
            if (typeof orig !== "function") continue;
            (proto as unknown as Record<string, unknown>)[m] = function (
                this: WebGL2RenderingContext,
                ...args: unknown[]
            ) {
                const canvas = this.canvas as CountedCanvas | OffscreenCanvas;
                if (canvas instanceof HTMLCanvasElement) {
                    const c = canvas as CountedCanvas;
                    c.__vjDrawCount = (c.__vjDrawCount ?? 0) + 1;
                }
                return (orig as (...a: unknown[]) => unknown).apply(this, args);
            };
        }
    });
}

/** Draw count on the LAST canvas matching `testid` (−1 if none). */
export function lastCanvasDrawCount(page: Page, testid: string): Promise<number> {
    return page.evaluate((id) => {
        const list = document.querySelectorAll(`[data-testid="${id}"]`);
        const c = list[list.length - 1] as (HTMLCanvasElement & { __vjDrawCount?: number }) | undefined;
        return c ? c.__vjDrawCount ?? 0 : -1;
    }, testid);
}

/**
 * Whether a canvas "presents" — used for the atmosphere, whose `useAtmosphere`
 * render-mode tiers between the live WebGL aurora and a CSS-gradient placeholder
 * (`paletteToCssGradient`, painted as the canvas `background-image`; the
 * placeholder path is taken under headless software-GL). Honest to BOTH paths:
 * a non-`none` background-image (placeholder) OR ≥1 WebGL draw (live aurora).
 */
export function canvasPresents(
    page: Page,
    testid: string,
): Promise<{ cssPlaceholder: boolean; draws: number }> {
    return page.evaluate((id) => {
        const c = document.querySelector(`[data-testid="${id}"]`) as
            | (HTMLCanvasElement & { __vjDrawCount?: number })
            | null;
        if (!c) return { cssPlaceholder: false, draws: -1 };
        const bg = getComputedStyle(c).backgroundImage;
        return {
            cssPlaceholder: Boolean(bg) && bg !== "none",
            draws: c.__vjDrawCount ?? 0,
        };
    }, testid);
}
