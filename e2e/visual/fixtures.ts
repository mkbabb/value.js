// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — the visual-matrix test fixture.
 *
 * ONE test object for every arm — public, admin, modality and state — because
 * every arm must mint its goldens through the same `shot()` path. The admin arm
 * differs only by a capture input it applies itself (`seedAdmin`), never by a
 * second capture policy: a second path is how one arm quietly acquires a
 * different tolerance, a different style injection, or a renderer label nobody
 * read from a browser.
 *
 * The fixture's whole job is to make ONE thing impossible: photographing a cell
 * without recording, from the live browser, what rendered it (G-10).
 */
import { test as base, expect, type BrowserContext, type Page } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
    readRenderer,
    rendererDigest,
    rendererHeaderLine,
    rendererSlug,
    type RendererIdentity,
} from "./renderer";
import {
    assertRendered,
    CAPTURE_STYLE_PATH,
    ensureOffLayoutTie,
    pinEntropy,
} from "./capture";
import { TOLERANCE } from "./tolerance";

export { expect };

/** Where goldens live. `{platform}` is a directory, for the reason in `visual.project.ts`. */
export const GOLDEN_ROOT = resolve(import.meta.dirname, "goldens");

/**
 * The axes of one cell. Every field lands in the filename, in that order, so a
 * golden's name IS its coordinates — no lookup table, no naming convention held
 * somewhere else.
 */
export interface CellAxes {
    /** `at-rest` | a modality id | a non-route state id. */
    readonly arm: string;
    /** The census route id, or the state's own id for non-route arms. */
    readonly subject: string;
    /** The pane witnessed. `both` at desktop, where one frame holds two panes. */
    readonly pane: string;
    /** The viewport id — `390` | `1024` | `3440` | a modality's own geometry. */
    readonly viewport: string;
    /** `light` | `dark`. */
    readonly scheme: string;
    /**
     * R36, the load-bearing label: `real` when the modality is genuinely present
     * in this cell, `emulated` when Playwright is emulating it. An EMULATED
     * modality *"is labelled emulation and discharges no real-modality
     * obligation"*. A cell that cannot say which is not evidence.
     */
    readonly fidelity: "real" | "emulated";
    /**
     * The capture viewport, when the cell is one `ensureOffLayoutTie` may need to
     * nudge. Omitted for cells that set no viewport of their own.
     */
    readonly capture?: { width: number; height: number };
}

/** `<arm>__<subject>__<pane>__<viewport>__<scheme>__<fidelity>__<renderer>.png` */
export function goldenName(axes: CellAxes, renderer: RendererIdentity): string {
    return (
        [
            axes.arm,
            axes.subject,
            axes.pane,
            axes.viewport,
            axes.scheme,
            axes.fidelity,
            rendererSlug(renderer),
        ].join("__") + ".png"
    );
}

/** Per-worker cache: the renderer is a property of the browser, not the page. */
let cachedRenderer: RendererIdentity | null = null;

export interface VisualApi {
    /** The live-read identity. Available only after the first `shot()`. */
    renderer(): RendererIdentity | null;
    /** Read (and cache) the renderer from this live page. */
    identify(page: Page): Promise<RendererIdentity>;
    /** Photograph the page as one matrix cell. */
    shot(page: Page, axes: CellAxes): Promise<string>;
}

function makeVisualApi(): VisualApi {
    const identify = async (page: Page): Promise<RendererIdentity> => {
        if (cachedRenderer) return cachedRenderer;
        cachedRenderer = await readRenderer(page);
        // Written beside the goldens, not into docs/: this is a run artefact the
        // manifest generator joins on, and it must sit with the bytes it
        // describes. Idempotent — every worker writes the same identity.
        const path = resolve(GOLDEN_ROOT, process.platform, "RENDERER.json");
        mkdirSync(dirname(path), { recursive: true });
        const serialised =
            JSON.stringify(
                {
                    note:
                        "Read from the LIVE browser by e2e/visual/renderer.ts (G-10). " +
                        "Never declared, never copied from playwright.config.ts.",
                    readAt: new Date().toISOString().slice(0, 10),
                    platform: process.platform,
                    arch: process.arch,
                    slug: rendererSlug(cachedRenderer),
                    digest: rendererDigest(cachedRenderer),
                    header: rendererHeaderLine(cachedRenderer),
                    identity: cachedRenderer,
                    // The AUTHORED bar, and only it. `VJS_VISUAL_MAX_DIFF_PIXELS`
                    // can tighten the effective value for a re-measurement run,
                    // and recording that too made this committed record move with
                    // an environment variable — a record of the bar that changes
                    // while the bar has not is not a record of the bar (IC-12).
                    tolerance: {
                        authoredMaxDiffPixels: TOLERANCE.authoredMaxDiffPixels,
                        threshold: TOLERANCE.threshold,
                        stabilisationTimeoutMs: TOLERANCE.stabilisationTimeoutMs,
                        g9InjectionPixels: TOLERANCE.g9InjectionPixels,
                    },
                },
                null,
                2,
            ) + "\n";
        // Write only on a real change. A VERIFICATION run asserts and mints
        // nothing, so it must not dirty the tree — an unconditional write
        // re-dated this file on every run and would then have made
        // `regenerate-goldens.mjs` refuse on its own gate's output. `readAt` is
        // excluded from the comparison so the date records when the IDENTITY was
        // recorded, not when a run last happened (IC-12).
        const onDisk = existsSync(path) ? readFileSync(path, "utf8") : null;
        const withoutDate = (text: string) => text.replace(/^\s*"readAt":.*$/m, "");
        if (onDisk === null || withoutDate(onDisk) !== withoutDate(serialised))
            writeFileSync(path, serialised);
        return cachedRenderer;
    };

    return {
        renderer: () => cachedRenderer,
        identify,
        shot: async (page, axes) => {
            const renderer = await identify(page);
            // A cell sitting on a half-pixel layout tie rasterises two ways for
            // identical inputs (see `ensureOffLayoutTie`, and IC-11). Move it off
            // the tie BEFORE the shutter opens, or the golden is a coin flip.
            if (axes.capture) await ensureOffLayoutTie(page, axes.capture);
            const name = goldenName(axes, renderer);
            // THE LAST THING BEFORE THE SHUTTER. Every arm reaches the camera
            // through this one call, so this is the one place a proof-of-life
            // cannot be forgotten by an arm that navigates its own way — and
            // `states.visual.spec.ts`'s forced-state arm does exactly that
            // (`waitUntil: "commit"`, because a run with the transport aborted
            // never reaches `networkidle`). See `assertRendered` for the
            // measured floors and for what it deliberately does NOT cover.
            await assertRendered(page, name);
            await expect(page).toHaveScreenshot(name, {
                fullPage: true,
                animations: "disabled",
                caret: "hide",
                scale: "css",
                stylePath: CAPTURE_STYLE_PATH,
                maxDiffPixels: TOLERANCE.maxDiffPixels,
                threshold: TOLERANCE.threshold,
                timeout: TOLERANCE.stabilisationTimeoutMs,
            });
            return name;
        },
    };
}

export interface VisualFixtures {
    visual: VisualApi;
}

/**
 * The extension itself, exported so an arm that must build on an EXISTING test
 * object gets the identical capture policy rather than a second copy of it.
 *
 * `states-admin-populated.visual.spec.ts` builds on
 * `e2e/smoke/admin/fixtures/admin-populated.ts`'s `adminPopulatedTest` — the
 * "populated-fixture pattern" fixture that already routes shape-correct
 * NON-EMPTY envelopes per admin endpoint. R35 / AdminNamesPanel residue 2 asks
 * for exactly that arm (*"the populated row has never been photographed … one
 * seeded-fixture capture pair (light/dark) discharges five hypotheses at
 * once"*), and the fixture it needs already exists in this repo. Composing on it
 * is the difference between consuming the fixture and re-authoring it — and
 * R35's whole PCS-11/K-8 limb is that the visual matrix never consumed the
 * fixtures the e2e suite already had.
 */
export const VISUAL_FIXTURE = {
    /**
     * The context override exists for ONE reason: the entropy pin has to be
     * installed before the first page script of every cell, in every arm, and
     * an arm that had to remember to call it is an arm that will one day not.
     * Putting it on the shared fixture object means
     * `admin-populated.visual.spec.ts` — which composes this object onto a
     * DIFFERENT base test — gets the identical capture policy rather than a
     * second copy of it. See `pinEntropy` for the measurement that put it here.
     */
    context: async (
        { context }: { context: BrowserContext },
        use: (context: BrowserContext) => Promise<void>,
    ) => {
        await pinEntropy(context);
        await use(context);
    },
    visual: async ({}, use: (api: VisualApi) => Promise<void>) => {
        await use(makeVisualApi());
    },
} as const;

export const visualTest = base.extend<VisualFixtures>(VISUAL_FIXTURE);
