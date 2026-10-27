// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — CAPTURE INPUTS.
 *
 * R35's CURE-SHAPE LOCK, verbatim: *"seeded storage, seeded fixtures and forced
 * states are CAPTURE INPUTS, not product edits — X.W1.b writes no `demo/` byte,
 * per W1.md's own Triumvirate trigger."* Everything in this file is an input
 * applied to a browser context from outside the product: an init script, a route
 * mock, an emulated media preference, a keypress. No `demo/`, `src/` or `api/`
 * byte is written by this unit.
 */
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import type { BrowserContext, Page } from "@playwright/test";
import { MAIN_PANE, mainPane } from "../smoke/fixtures/dock";
import type { CensusRoute } from "./census";

/** The stylesheet Playwright injects at screenshot time. See `capture.css`. */
export const CAPTURE_STYLE_PATH = resolve(import.meta.dirname, "capture.css");

/**
 * PIN THE PRODUCT'S ONE RENDER-TIME ENTROPY SOURCE.
 *
 * ─── The defect, measured ────────────────────────────────────────────────────
 *
 * `demo/workbenches/generate/composables/useColorGeneration.ts:24` reads
 * `Math.floor(Math.random() * 0xffffffff)` into the `seed` ref AT COMPOSABLE
 * CONSTRUCTION — i.e. once per mount of the generate workbench. `palette` is a
 * computed over that seed, and `GenerateControls.vue:59` prints the seed itself
 * as a fixed-width hex bench-note. So every mount of `/#/generate` paints five
 * different swatches and a different label, and the surface is unphotographable
 * without a capture input.
 *
 * Measured, first verification pass of this matrix (2026-09-17, 216 cells):
 * **12 of the 28 failures were `generate` cells** — every at-rest generate-pane
 * cell and every one of the six modality arms — at 33,909…46,184 differing
 * pixels, each bounded to the generated plate. The 12 are the whole `generate`
 * roster; not one passed. A tolerance that absorbed 46,184 px would absorb
 * 115× G-9's own 20-px unit, which is the D.W4 failure this wave exists to end,
 * so the randomness is removed at the capture instead.
 *
 * ─── Why this is a capture input and not a product edit ─────────────────────
 *
 * R35's CURE-SHAPE LOCK: seeded storage, seeded fixtures and forced states are
 * CAPTURE INPUTS. This is the same species — an init script applied to the
 * browser context from outside the product — and it writes no `demo/` byte, so
 * W1.md's Triumvirate trigger does not fire. The product keeps its randomness
 * for every real user; only the photographic darkroom is lit deterministically.
 *
 * The generator is **mulberry32**, the one `generate-color.ts:219` already uses
 * for its own seeded path, so a pinned run walks a sequence the product itself
 * considers well-formed rather than a foreign distribution.
 *
 * WHAT THIS COSTS, stated (IC-15): the generate cells witness the workbench's
 * LAYOUT, TYPOGRAPHY and AFFORDANCE under one pinned seed. They do not witness
 * the distribution of generated colour, and a regression that changed only
 * which colours a preset produces would pass them. That is `generate-color.ts`'s
 * own unit-test surface, not a pixel matrix's.
 *
 * `Math.random` is replaced and not merely seeded because the product reads the
 * global; the only other live caller in `demo/` is
 * `SpectrumCanvas.vue:163`, gated on `debug.state.enabled`, which is off in
 * every cell (measured: `grep -rn 'Math.random' demo/` → 5 rows, 2 of them the
 * generate composable, 1 the debug gate, 2 the pure generator's own defaults).
 */
export async function pinEntropy(context: BrowserContext): Promise<void> {
    await context.addInitScript(() => {
        // mulberry32 — `generate-color.ts`'s own PRNG, fixed seed.
        let state = 0x9e3779b9 >>> 0;
        Math.random = () => {
            state = (state + 0x6d2b79f5) >>> 0;
            let t = state;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    });
}

/**
 * The faces of the producer's font corpus that declare `font-display: optional`,
 * read from the corpus the dev server imports (`deferGlassFonts`, dev branch).
 */
interface OptionalFace {
    family: string;
    data: string;
    weight: string;
    style: string;
    unicodeRange: string;
}

function readOptionalFaces(): OptionalFace[] {
    const corpus = readFileSync(
        createRequire(import.meta.url).resolve("@mkbabb/glass-ui/styles/fonts"),
        "utf8",
    );
    const descriptor = (block: string, name: string) =>
        block.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1]?.trim() ?? "";
    return [...corpus.matchAll(/@font-face\s*\{([^}]*)\}/g)]
        .map((m) => m[1] ?? "")
        .filter((block) => descriptor(block, "font-display") === "optional")
        .map((block) => ({
            family: descriptor(block, "font-family").replace(/^"|"$/g, ""),
            data: block.match(/url\("data:font\/woff2;base64,([^"]+)"\)/)?.[1] ?? "",
            weight: descriptor(block, "font-weight"),
            style: descriptor(block, "font-style"),
            unicodeRange: descriptor(block, "unicode-range"),
        }))
        .map((face) => {
            if (!face.family || !face.data)
                throw new Error(`visual: an optional face of the corpus has no family or woff2 bytes`);
            return face;
        });
}

/**
 * The body voice is decoded BEFORE the first layout, so `font-display:
 * optional` has no window for the shutter to race (X.W11.v1b).
 *
 * ─── The race, measured ──────────────────────────────────────────────────────
 *
 * Since `fbc2affa9` (X-DS VR3-01, 2026-10-13) the dev server imports glass's
 * real font corpus. Its Plus Jakarta Sans faces declare `font-display:
 * optional`: the face paints only if it is ready inside the ~100 ms block
 * window from its first use, and otherwise the Arial-metric "Plus Jakarta Sans
 * Fallback" paints for the life of the document. Which side wins is a property
 * of the host's load at that instant, not of the product:
 *   - this mint host, 4 cold loads of `/#/browse` (CDP
 *     `CSS.getPlatformFontsForNode` on the pane subtitle): Arial ×4, with the
 *     Jakarta face reporting `loaded` — decoded, too late, never used;
 *   - CI run 39613889291, cell `at-rest · 3440 › browse · both · dark`:
 *     attempts 1 and 2 painted Arial, attempt 3 painted Jakarta (2,133 px).
 * A golden of a coin flip is not a golden.
 *
 * ─── The pin ─────────────────────────────────────────────────────────────────
 *
 * Every `optional` face of the corpus is registered once more from the SAME
 * bytes and the SAME descriptors, as a binary `FontFace` — which is parsed at
 * construction, so it is `loaded` before the document's first layout (probe,
 * 3/3 cold loads: the subtitle paints "Plus Jakarta Sans"). The faces are read
 * from the corpus file at run time; no family, weight or range is written here.
 * It settles the race on the side the product declares as its body voice; the
 * fallback face stays the product's own first-paint answer for a real user
 * whose decode misses the window, and it is not this matrix's subject. Swap
 * faces (Fira Code) need no pin: they swap in and `document.fonts.ready` is
 * awaited before every shutter.
 */
export async function pinOptionalFaces(context: BrowserContext): Promise<void> {
    await context.addInitScript((faces: OptionalFace[]) => {
        for (const face of faces) {
            const binary = atob(face.data);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            document.fonts.add(
                new FontFace(face.family, bytes, {
                    weight: face.weight,
                    style: face.style,
                    unicodeRange: face.unicodeRange,
                }),
            );
        }
    }, readOptionalFaces());
}

/** The producer's mono metric-fallback face, the one family this host leaks into. */
const MONO_FALLBACK_FAMILY = "Fira Code Fallback";

/** The stock-macOS mono every darwin host carries, by the name Chrome matches. */
const STOCK_MONO_LOCAL = 'local("Menlo-Regular")';

function readMonoFallbackOverrides(): Record<string, string> {
    const stylesDir = dirname(
        createRequire(import.meta.url).resolve("@mkbabb/glass-ui/styles"),
    );
    for (const file of readdirSync(stylesDir, { recursive: true })) {
        if (!String(file).endsWith(".css")) continue;
        const css = readFileSync(join(stylesDir, String(file)), "utf8");
        for (const m of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
            const block = m[1] ?? "";
            if (!block.includes(`"${MONO_FALLBACK_FAMILY}"`)) continue;
            const read = (name: string) =>
                block.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1]?.trim();
            const out: Record<string, string> = {};
            for (const [descriptor, key] of [
                ["ascent-override", "ascentOverride"],
                ["descent-override", "descentOverride"],
                ["line-gap-override", "lineGapOverride"],
                ["size-adjust", "sizeAdjust"],
            ] as const) {
                const value = read(descriptor);
                if (value) out[key] = value;
            }
            return out;
        }
    }
    throw new Error(`visual: no @font-face for "${MONO_FALLBACK_FAMILY}" in ${stylesDir}`);
}

/**
 * The mono fallback resolves to the stock-macOS face on every darwin host
 * (X.W11.v1b).
 *
 * ─── The leak, measured ──────────────────────────────────────────────────────
 *
 * Glass's `"Fira Code Fallback"` face lists `local("SF Mono"),
 * local("SFMono-Regular"), local("Menlo"), …`, and the gradient easing rows'
 * `1 → 2` index paints its arrow from it (U+2192 is outside both Fira Code
 * subsets' `unicode-range`). Whether `local("SF Mono")` matches is a property
 * of the HOST, not of darwin: this mint host carries a user-installed SF Mono
 * (`/Library/Fonts/SF-Mono-*.otf`), the stock `macos-15` runner does not, and
 * Chrome matches `local()` by full / PostScript name, so `local("Menlo")`
 * matches on neither (probe: `local("SF Mono")` → loaded here;
 * `local("Menlo")` → not matched; `local("Menlo-Regular")` → loaded). The
 * goldens minted here therefore carried SF Mono's arrow and CI painted
 * another: run 39613889291, `at-rest › gradient · both · dark` at 1024 / 3440
 * (127 / 198 px) and `forced-colors-desktop › gradient` (195 px), every
 * differing pixel inside the arrow's box, every attempt.
 *
 * ─── The pin ─────────────────────────────────────────────────────────────────
 *
 * One more face of the same family, with the producer's own metric overrides
 * read from its stylesheet at run time and the source set to the stock mono by
 * the name Chrome matches. Script-added faces follow the CSS-connected ones, so
 * it takes precedence on every host and the darwin goldens stop depending on
 * which fonts the mint host happens to have installed — the same species as
 * `visual.project.ts`'s `prefersReducedTransparency` pin of a host setting.
 * The producer's `local("Menlo")` name is relayed as a glass row (receipt).
 */
export async function pinStockMonoFallback(context: BrowserContext): Promise<void> {
    await context.addInitScript(
        ({ family, source, descriptors }) => {
            const face = new FontFace(family, source, descriptors);
            document.fonts.add(face);
            void face.load();
        },
        {
            family: MONO_FALLBACK_FAMILY,
            source: STOCK_MONO_LOCAL,
            descriptors: readMonoFallbackOverrides(),
        },
    );
}

/** The storage key `useGlobalDark` reads. Seeded before the first script runs. */
const SCHEME_STORAGE_KEY = "vueuse-color-scheme";

/** The storage key `useAdminAuth` reads once, lazily, on its first call. */
const ADMIN_TOKEN_KEY = "palette-admin-token";

/**
 * The storage key `usePaletteStore` binds (`demo/palettes/usePaletteStore.ts:6`),
 * and the envelope shape its serializer accepts: anything whose `version` is not
 * a number falls back to the empty default, so a seed with the wrong shape seeds
 * NOTHING and the arm would photograph an empty state under a populated name.
 * Measured live at authoring — `Object.keys(localStorage)` after a cold boot →
 * `["color-picker", "color-palettes", "color-picker-ground", "vueuse-color-scheme"]`.
 */
export const PALETTE_STORE_KEY = "color-palettes";

/**
 * Force BOTH the media preference and the `dark` class on `<html>`.
 *
 * The demo drives dark via a class (`useGlobalDark`), so emulating the media
 * query ALONE can photograph a light shell under a dark preference and call it a
 * dark cell. `capture.mjs` learned this and wrote it down; the same belt-and-
 * braces is applied here, before the page's first script runs.
 */
export async function seedScheme(
    context: BrowserContext,
    scheme: "light" | "dark",
): Promise<void> {
    await context.addInitScript(
        ([key, value]) => {
            try {
                localStorage.setItem(key, value);
                const de = document.documentElement;
                if (value === "dark") de.classList.add("dark");
                else de.classList.remove("dark");
            } catch {
                /* storage may be denied; the media emulation still applies */
            }
        },
        [SCHEME_STORAGE_KEY, scheme] as const,
    );
}

/**
 * Seed the admin session at CONTEXT scope.
 *
 * The seam — `localStorage["palette-admin-token"]` written by `addInitScript`
 * before any page script runs, plus wildcard empty envelopes for `**\/admin/**`
 * and `**\/sessions` — is the one `e2e/smoke/admin/fixtures/admin-auth.ts`
 * established at D.W5 Lane B, and its docstring is the authority for why no
 * login UI is driven. That fixture is PAGE-scoped and test-object-shaped
 * (`adminTest`), and it belongs to X.W1.a's writable set, not this unit's.
 * The visual matrix needs the seeding at CONTEXT scope and conditionally, per
 * route's `meta.admin` — so this is the same seam expressed at the scope the
 * matrix needs, not a second policy. HANDOFF, recorded rather than left to
 * drift: X.W1.a owns `e2e/smoke/**` and can export the constants from
 * `admin-auth.ts` for both callers; until it does, the two agree by review and
 * `census-parity.spec.ts` is the thing that reds if an admin route stops
 * rendering.
 */
export async function seedAdmin(context: BrowserContext): Promise<void> {
    await context.addInitScript(
        ([key, value]) => {
            try {
                localStorage.setItem(key, value);
            } catch {
                /* storage may be denied */
            }
        },
        [ADMIN_TOKEN_KEY, "test-admin-token"] as const,
    );

    const paginated = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });

    await context.route("**/sessions", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body:
                route.request().method() === "POST"
                    ? JSON.stringify({
                          token: "test-session-token",
                          userSlug: "test-user",
                      })
                    : "{}",
        }),
    );

    await context.route("**/admin/**", (route) => {
        const url = route.request().url();
        // T.W1 F4: `/admin/` also appears in vite MODULE urls. Mock only genuine
        // API calls (pathname `/admin/…`); let module/asset requests through.
        if (!new URL(url).pathname.startsWith("/admin/")) return route.continue();
        // getAdminTags returns Tag[] directly — no PaginatedResponse wrapper.
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: url.includes("/admin/tags") ? "[]" : paginated,
        });
    });
}

/**
 * Navigate to a census route and wait until the shell is a thing worth
 * photographing.
 *
 * The main-pane landmark (`mainPane`, the one `<main>` the route H1 names —
 * `e2e/smoke/fixtures/dock.ts`) is the shell's own mount proof — the
 * assertion `e2e/smoke/page-load.spec.ts` has made since D.W5. Fonts are waited
 * on explicitly because a golden minted mid-swap is a golden of a fallback face
 * (and see IC-1 in the caveat register: under the dev server the production
 * faces never arrive at all).
 */
export async function gotoRoute(page: Page, path: string): Promise<void> {
    await page.goto(path, { waitUntil: "networkidle", timeout: 60_000 });
    await mainPane(page).waitFor({
        state: "visible",
        timeout: 30_000,
    });
    // ─── The shell mounts BEFORE its lazy graph lands ────────────────────────
    //
    // `goto`'s own `networkidle` is satisfied by the shell's request set. Every
    // pane is a `defineAsyncComponent` (`usePaneRouter.ts:73`) and every dock
    // icon a separate module, so the pane chunk and the icon chunks are issued
    // AFTER mount and are not covered by it.
    //
    // MEASURED, first verification pass of this matrix: the golden for
    // `at-rest · 390 · picker · about · dark` carries a dock whose leading
    // HOME ICON IS ABSENT — 6,230 differing pixels in a 220×41 box over the
    // dock control — because the icon module had not arrived when that cell was
    // minted. Downstream of the same absence, three `keyboard-focus` cells red
    // at 30,277…46,416 px: one fewer focusable element in the dock moves where
    // 12 Tab presses land, so the focus ring is on a different control.
    //
    // Waiting for a second `networkidle` AFTER the mount covers exactly that
    // window, and it costs nothing on a warm server. It is also the right layer
    // for it: the module fetch is instrument latency, and absorbing it here
    // keeps `waitForQuiescence`'s 12 s cap a measure of the product's own boot
    // choreography rather than of the dev server's transform queue.
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await requireQuiescence(page, path);
}

/**
 * `waitForQuiescence`, with the cap turned into a FAILURE.
 *
 * ─── Why the cap must fail, and why that is not a mask ───────────────────────
 *
 * `waitForQuiescence` returns `{ quiescent: false }` when it hits `capMs`, and
 * its own docstring reasons that the cell *"is photographed anyway — and then
 * fails loudly against its golden, which is the honest report."* That reasoning
 * is correct on a VERIFICATION run and wrong on a MINT run, and the difference
 * is the whole hole: **at mint there is no golden to fail against**, so a page
 * that never stilled becomes the baseline silently, and every later run is
 * measured against a frame nobody chose.
 *
 * That is not hypothetical here. Two committed goldens in the first mint of this
 * matrix — `at-rest-gradient-gradient-390-dark` and
 * `at-rest-admin-admin-tags-palettes-390-dark` — are a SINGLE FLAT COLOUR: the
 * pre-mount ground gradient, photographed and ratified as the product's
 * appearance. Measured over all 207: exactly those two hold ≤ 8 distinct
 * colours on an 8-px sampling grid; every other cell holds ≥ 401.
 *
 * So a cell that will not still is refused. Nothing is skipped, nothing is
 * allowed through, and no bar moves: the run reds with the elapsed time and the
 * route, which is the honest report at BOTH ends of the gate's life.
 */
export async function requireQuiescence(
    page: Page,
    label: string,
    options?: Parameters<typeof waitForQuiescence>[1],
): Promise<void> {
    const { quiescent, elapsedMs } = await waitForQuiescence(page, options);
    if (!quiescent)
        throw new Error(
            `QUIESCENCE NOT REACHED at ${label} after ${elapsedMs} ms. The page was ` +
                "still moving when the capture was due. It is refused rather than " +
                "photographed: a mint run has no golden to fail against, so an " +
                "unsettled frame would become the baseline silently (two such " +
                "flat-ground goldens were found in this matrix's first mint).",
        );
}

/**
 * PROOF OF LIFE — the shell must have rendered before the shutter opens.
 *
 * The floors are MEASURED, not guessed. Read at this clock over all 14 census
 * routes, after `networkidle` + `role=main` visible, at the two viewports that
 * set the extremes (recorded at
 * `docs/tranches/X/evidence/w1/instrument-caveats.md` IC-16b; re-derivable by
 * the same navigation):
 *
 *   1024 : min descendants **81** (`/#/admin/flagged`) · min body text **185** (`/#/mix`)
 *    390 : min descendants **26** (`/#/admin/flagged`) · min body text  **68** (`/#/blob`)
 *
 * The floors below sit at less than half the smallest measured cell, so no real
 * cell can approach them, while a shell that mounted no pane — the state behind
 * the flat-ground goldens above — is single digits and reds.
 *
 * NECESSARY, NOT SUFFICIENT, and said so rather than implied: this is a DOM
 * predicate, and a frame whose DOM is complete while the compositor emitted
 * nothing would pass it (IC-16c records one such class, measured: under heavy
 * host load SwiftShader returned blank composited frames for four consecutive
 * 1024 cells whose page snapshots show a full DOM). The byte-level backstop for
 * that is `golden-integrity.spec.ts`'s flat-frame assertion, which reads the
 * COMMITTED bytes and reds on any golden that is one flat colour. The two
 * instruments are complementary: this one refuses to take the photograph, that
 * one refuses to keep it.
 */
const PROOF_OF_LIFE_MIN_DESCENDANTS = 12;
const PROOF_OF_LIFE_MIN_TEXT = 24;

export async function assertRendered(page: Page, label: string): Promise<void> {
    const state = await page.evaluate((selector) => {
        const main = document.querySelector(selector);
        return {
            present: main !== null,
            descendants: main ? main.querySelectorAll("*").length : 0,
            text: (document.body.innerText ?? "").trim().length,
        };
    }, MAIN_PANE);
    if (
        !state.present ||
        state.descendants < PROOF_OF_LIFE_MIN_DESCENDANTS ||
        state.text < PROOF_OF_LIFE_MIN_TEXT
    )
        throw new Error(
            `PROOF OF LIFE FAILED at ${label}: main present=${state.present}, ` +
                `descendants=${state.descendants} (floor ${PROOF_OF_LIFE_MIN_DESCENDANTS}), ` +
                `body text=${state.text} chars (floor ${PROOF_OF_LIFE_MIN_TEXT}). ` +
                "The shell had not rendered, so there is nothing to photograph. " +
                "A golden minted here would be a picture of the boot, ratified as " +
                "the product's appearance.",
        );
}

/**
 * Wait until the boot choreography has finished — the readiness signal this
 * suite needs and that no fixed sleep can supply.
 *
 * MEASURED, because the first instinct (a settle timeout) is wrong here. Polling
 * `document.getAnimations()` once a second after `networkidle` + `role=main`
 * visible, at 3440×1440 on `/#/`:
 *
 *   t+1s   31 finite animations running  (--saved-bg-0..3, border radii,
 *                                         plate-land, field-paint-in, 8×
 *                                         stagger-child-in, colour transitions)
 *   t+3s    3  (transform ×2, overture-plate-land)
 *   t+5s    3  (opacity 900ms, transform ×2)
 *   t+9s    2
 *   t+11s   2  (grid-template-columns 300ms, opacity 300ms)
 *   t+13s   0 finite   ← quiescent
 *
 * The choreography is still MINTING NEW finite animations at eleven seconds, so
 * a 6-second settle photographs a mid-choreography frame and WHICH frame depends
 * on host scheduling. (The separate, larger instability a strict re-run found —
 * one cell alternating between two settled states 10,719 px apart — turned out
 * NOT to be this: it is the half-pixel layout tie of `ensureOffLayoutTie` /
 * IC-11, and it is cured there, not by waiting longer. Recorded so the next
 * reader does not conflate the two.)
 *
 * ─── THE PREDICATE IS "NOTHING IS MOVING", NOT "NOTHING IS REGISTERED" ───────
 *
 * The obvious predicate — wait until no finite animation is `running` — was
 * authored first and MEASURED WRONG. Elapsed-to-quiescence, per route:
 *
 *   390  /#/browse   3667 ms      1024 /#/browse   2422 ms     3440 /#/browse  2122 ms
 *   390  /#/gradient 5819 ms      1024 /#/gradient 2424 ms     3440 /#/gradient 2730 ms
 *   390  /#/          CAP         1024 /#/          CAP        3440 /#/         CAP
 *
 * `/#/` NEVER satisfies it. The cell that will not clear is a 200 ms `transform`
 * transition whose `playState` reads `running` while its `currentTime` stays
 * pinned at 0 — indefinitely. A registered transition that never advances is not
 * motion; it is an entry in `getAnimations()`. Had the naive predicate shipped,
 * every `/#/` cell in the matrix would have burned the full cap and the suite
 * would have been ~4× slower for no signal at all. (Recorded as IC-7 in the
 * instrument-caveat register: any gate anywhere that waits on
 * `getAnimations()` going EMPTY will hang on this app's home route.)
 *
 * So the predicate is a SIGNATURE of the animation set including each entry's
 * `currentTime`, compared across consecutive polls. Something genuinely in
 * flight advances its clock and the signature changes; something merely
 * registered does not, and the page is — correctly — still.
 *
 * Infinite animations are excluded: they advance forever by construction, and
 * Playwright's `animations: "disabled"` cancels them to their initial state at
 * screenshot time. Scroll/view-timeline animations (`duration: "auto"`) are
 * excluded because their clock is the scroll position, which this suite does not
 * move.
 *
 * ─── AND THE ANIMATION SET ALONE IS NOT ENOUGH EITHER ───────────────────────
 *
 * That predicate was shipped, then MEASURED WRONG in turn. Sampling
 * `/#/admin/users` at 390 once a second:
 *
 *   t+1s   18 entries, every clock frozen at @42
 *   t+2s   18 entries, every clock frozen at @42     ← signature IDENTICAL
 *   t+3s    2 entries  (overture-plate-land, transform)
 *   t+4s    4 entries
 *   t+7s    1 entry
 *   t+9s    0 entries                                ← actually still
 *
 * At t+2s the animation signature had been stable for a full second while the
 * app was still mounting — a batch of QUEUED transitions sits registered with
 * pinned clocks, so "no clock advanced" reported stillness during the busiest
 * part of the boot. A capture taken there is a mid-choreography capture, which
 * is precisely the bistability this function exists to remove: the predicate
 * would have CAUSED the defect it was written to prevent.
 *
 * So the signature also carries a cheap DOM fingerprint — element count and
 * `textContent` length. Vue mounting, unmounting and filling panes moves both,
 * and neither forces layout (`textContent`, not `innerText`), so the poll stays
 * cheap enough to run every 300 ms. A page is still when its animation clocks
 * AND its DOM have both stopped moving; either alone reports stillness during a
 * boot that is visibly in flight.
 *
 * `capMs` is **12 s, which is 2× the worst quiescence this app was measured to
 * need** (5819 ms, `/#/gradient` at 390). It is a ceiling on a pathological
 * cell, not a budget every cell spends: the loop returns the moment two polls
 * agree, so a 2.1 s route costs 2.1 s. The first draft set it to 20 s "to be
 * safe" and the matrix ran ~30 s per cell — a cap chosen above the measurement
 * is a cap that gets paid, and it made a 214-cell suite a 107-minute suite.
 *
 * A cell that never stills hits `capMs` and is photographed anyway — and then
 * fails loudly against its golden, which is the honest report. It is never
 * silently absorbed.
 */
export async function waitForQuiescence(
    page: Page,
    { capMs = 12_000, pollMs = 300, stablePolls = 2 } = {},
): Promise<{ quiescent: boolean; elapsedMs: number }> {
    const started = Date.now();
    let previous: string | null = null;
    let stable = 0;

    while (Date.now() - started < capMs) {
        const signature = await page.evaluate(() => {
            const animations = document
                .getAnimations()
                .filter((a) => {
                    if (a.playState !== "running") return false;
                    const timing = a.effect?.getTiming();
                    if (!timing) return false;
                    if (timing.duration === "auto") return false;
                    if (timing.iterations === Infinity || timing.iterations === null)
                        return false;
                    return true;
                })
                .map((a) => {
                    const t =
                        typeof a.currentTime === "number"
                            ? Math.round(a.currentTime)
                            : -1;
                    // `getAnimations()` is typed as the BASE `Animation`, which
                    // carries neither name: `animationName` belongs to
                    // `CSSAnimation` and `transitionProperty` to `CSSTransition`,
                    // and a script-driven `Animation` has neither. Feature-test
                    // rather than cast — `instanceof CSSAnimation` would also
                    // narrow, but those globals are absent in WebKit and this
                    // helper is shared with the safari arms. A script animation
                    // falls back to its `id`, which is stable across the polls
                    // this signature compares.
                    const name =
                        ("animationName" in a ? String(a.animationName) : "") ||
                        ("transitionProperty" in a
                            ? String(a.transitionProperty)
                            : "") ||
                        a.id;
                    return `${name}@${t}`;
                })
                .sort()
                .join("|");
            // The DOM half. `textContent`, never `innerText` — the latter forces
            // layout and this runs every 300 ms at up to 3440×1440.
            const elements = document.querySelectorAll("*").length;
            const text = (document.body.textContent ?? "").length;
            return `${animations}##els=${elements}##txt=${text}`;
        });

        if (previous !== null && signature === previous) {
            stable += 1;
            if (stable >= stablePolls)
                return { quiescent: true, elapsedMs: Date.now() - started };
        } else {
            stable = 0;
        }
        previous = signature;
        await page.waitForTimeout(pollMs);
    }
    return { quiescent: false, elapsedMs: Date.now() - started };
}

/**
 * The layout element whose vertical centring produces the raster tie below.
 * Named once, here, because both the detector and the caveat register cite it.
 */
const PANE_CONTAINER = ".pane-container";

/** How close to `.5` a fractional offset must be to count as a raster tie. */
const TIE_EPSILON = 0.05;

/**
 * Move the capture off a half-pixel LAYOUT TIE, if it is sitting on one.
 *
 * ─── The measurement ─────────────────────────────────────────────────────────
 *
 * At 3440×1440 on `/#/`, the ancestor chain of the picker card reads, in EVERY
 * run:
 *
 *   main.pane-main              y = 91        h = 1341
 *   div.pane-container--dual    y = 457.5     h = 608      ← exactly .5, always
 *   div.pane-wrapper--left      y = 457.016  OR  457.984   ← flips, run to run
 *   div.glass-resting.card      y = 457.016  OR  457.984
 *
 * `main` is 1341 tall and the card is 608, so the vertical centring leftover is
 * 733 — an ODD number — and the container lands at exactly x.5. Chrome then has
 * to break a LayoutUnit tie to snap the child, and it breaks it ±0.484 px
 * NON-DETERMINISTICALLY: measured 4 runs at .016 and 2 at .984, with all inputs
 * identical. The whole 512×608 card moves by one device pixel, which is
 * **10,719 differing pixels** — 27× G-9's 20-px injection unit. A tolerance
 * sized to absorb that would absorb the injection, and the gate would be
 * decorative.
 *
 * ─── The cure, and why it hides nothing ──────────────────────────────────────
 *
 * The tie is a property of the CONTAINER's position, which is deterministic
 * (457.5 in every run); only the child's snap is not. So the condition is
 * detectable before the shutter opens, and the cure is to move the layout off
 * the tie by making the capture viewport ONE CSS PIXEL taller.
 *
 * That changes no breakpoint, no element, no style and no content — 1 px of
 * viewport height cannot cross a media query in this app, and every element in
 * the frame is identical. What it changes is the parity of the centring
 * leftover, so the container lands on an integer and Chrome has no tie to break.
 * It is a capture geometry choice, not a mask over a defect: there IS no defect
 * to mask — a half-pixel centre is ordinary CSS, and the bistability is the
 * browser's rasteriser, not the product's layout.
 *
 * The adjustment is bounded at 2 attempts and RECORDED: the returned height is
 * what the cell was photographed at, and it is what the caller reports. A cell
 * that cannot be moved off a tie in two steps is photographed anyway and will
 * fail loudly against its golden — it is never silently absorbed.
 *
 * Recorded as IC-11 in `docs/tranches/X/evidence/w1/instrument-caveats.md`, with
 * the flip measurement, because the tie is a real 3440-class property of this
 * app that any future pixel gate will meet.
 */
export async function ensureOffLayoutTie(
    page: Page,
    viewport: { width: number; height: number },
): Promise<{ height: number; adjustedBy: number; tieFound: boolean }> {
    let height = viewport.height;
    let tieFound = false;

    for (let attempt = 0; attempt < 2; attempt++) {
        const fractional = await page.evaluate(
            ([selector, epsilon]) => {
                const element = document.querySelector(selector as string);
                if (!element) return null;
                const y = element.getBoundingClientRect().y;
                const frac = y - Math.floor(y);
                return Math.abs(frac - 0.5) < (epsilon as number) ? y : null;
            },
            [PANE_CONTAINER, TIE_EPSILON] as const,
        );
        if (fractional === null) break;
        tieFound = true;
        height += 1;
        await page.setViewportSize({ width: viewport.width, height });
        // A bounded re-settle, not a full quiescence wait: only the viewport
        // changed, so what is owed is a reflow and whatever short transition it
        // triggers — not another boot choreography. Paying the full 12 s cap
        // here would double the cost of every cell that sits on a tie.
        await waitForQuiescence(page, { capMs: 4_000 });
    }

    return { height, adjustedBy: height - viewport.height, tieFound };
}

/**
 * Prove the frame holds every region the census names for this route.
 *
 * The shell mounts a scene's ordered `regions[]` at every width — side by side
 * where two `--pane-min` tracks fit, stacked into one scrolling column where
 * they do not (`App.vue`'s single `v-for`; `shell.css` `.pane-container`). Each
 * region is a `.pane-container > .pane-wrapper[data-pane="<PaneId>"]`, and the
 * shutter is full-page, so one frame witnesses the whole scene. About (R34's
 * `Katex R6` limb, *"About is a PANE, structurally unreachable by a route
 * matrix"*) is therefore photographed in `picker`'s own frame.
 *
 * Returns `false` unless EXACTLY the census's regions are mounted, in order, each
 * with a laid-out box — so a scene that stopped mounting a region, or mounts one
 * the census does not name, fails by name and is never photographed as if it
 * were whole (the sameness trap: "a visual audit that captures the same pane N
 * times is worse than no audit: it reads green").
 *
 * Re-planned at X.W11.h14 (2026-10-20, COHESION §0gd.1 E14). The predecessor
 * clicked `.pane-segmented-control button.segmented-tab`, the 390 pane switch
 * X.W5.c deleted (`50633f195`, `PaneSegmentedControl.vue`); every dual scene's
 * sibling cell then read "unreachable" (DISPOSITION §5a, 28 cells).
 */
export async function showPane(
    page: Page,
    route: CensusRoute,
    _pane: 0 | 1,
): Promise<boolean> {
    const declared = route.right === null ? [route.left] : [route.left, route.right];
    const regions = page.locator(".pane-container > .pane-wrapper[data-pane]");
    await regions.first().waitFor({ state: "visible" });
    const mounted = await regions.evaluateAll((els) =>
        els.map((el) => {
            const box = el.getBoundingClientRect();
            return {
                pane: el.getAttribute("data-pane"),
                laidOut: box.width > 0 && box.height > 0,
            };
        }),
    );
    return (
        mounted.length === declared.length &&
        mounted.every((m, i) => m.pane === declared[i] && m.laidOut)
    );
}

/**
 * Apply `dir="rtl"` POST-load.
 *
 * MT-F022, from `states.mjs`'s own header: *"`dir=rtl` is applied POST-load —
 * documentElement is null at addInitScript time in WebKit."* Inherited verbatim
 * rather than rediscovered.
 */
export async function applyRtl(page: Page): Promise<void> {
    await page.evaluate(() => {
        document.documentElement.setAttribute("dir", "rtl");
    });
    await page.waitForTimeout(400);
}

/**
 * Walk focus `steps` tabs in. `states.mjs` uses 12; the same depth is used here
 * so the two corpora are comparable.
 *
 * MT-F022 again: *"keyboard rows are meaningless in WebKit alone — macOS ships
 * Full Keyboard Access OFF, so run ENGINE=chromium before believing any focus
 * gap."* This suite IS chromium, which is the condition that record names.
 */
export async function tabTo(page: Page, steps = 12): Promise<void> {
    for (let i = 0; i < steps; i++) await page.keyboard.press("Tab");
    // ─── The walk's TERMINAL dock posture, waited on as state (X.W11.v1) ─────
    //
    // The dock is first in tab order, so the walk passes through it. When the
    // last press leaves focus OUTSIDE the dock, glass's dock state machine
    // (`useDockState` `onFocusOut`) schedules `hover → collapsed` after its
    // idle window (`DOCK_COLLAPSE_DELAY_MS`, 3600 ms in glass 10.1.1). The old
    // fixed 250 ms sleep photographed whichever side of that timer the
    // quiescence wait happened to land on: measured on CI run 39613889291, 10
    // of the 14 cells photographed the collapsed seal against goldens minted
    // with the dock still open (and admin-flagged flipped between attempts).
    // The walk's settled frame is the collapsed seal, so the shutter waits for
    // it; the morph to it is then covered by `requireQuiescence`. A walk that
    // ends INSIDE the dock leaves it open (no timer is armed), and is
    // photographed as it stands.
    const focusInDock = await page.evaluate(
        () => document.activeElement?.closest(".glass-dock") != null,
    );
    if (!focusInDock)
        await page
            .locator(".glass-dock.collapsed")
            .waitFor({ state: "attached", timeout: 10_000 });
}

/**
 * The shutter waits for every timed toast to finish its life (X.W11.v1b).
 *
 * In this matrix the palette service is absent (the dev server answers
 * `/palettes` with its SPA HTML), so every cell that mounts a palette surface
 * raises glass's service-failure toast through `reportServiceProblem`
 * (`demo/platform/transport/useApiClient.ts`, `SERVICE_TOAST_MS` = 10 s), and
 * the forced-state arm raises it on purpose. A toast with a timer is not a
 * settled frame: the shutter photographed whichever side of that timer the
 * host's speed landed it on. Measured — probe, `/#/browse` cold, no
 * interaction: the toast opens at 0.66 s, closes at 10.62 s, leaves the DOM at
 * 10.82 s, and no second toast follows in 26 s. On CI run 39613889291:
 * `at-rest · 3440 › browse · both · dark` photographed the toast gone against a
 * golden with it present (attempts 1–2), and `forced-state › api-unavailable
 * latch` and `forced-colors-desktop › browse` red on the toast's own text and
 * Retry rows (1,103 and 222 px), bimodal at the parent too (`b34f5aeee`).
 * The terminal frame is the one without the toast, so the shutter waits for
 * it — the same law as `tabTo`'s collapsed seal. The toast's own pixels are
 * the e2e suite's subject, not this matrix's; no cell names it.
 */
export async function settleTimedToasts(page: Page): Promise<void> {
    await page
        .locator('[data-slot="toast"]')
        .first()
        .waitFor({ state: "detached", timeout: 15_000 });
}

/**
 * Seed N saved palettes into storage before boot.
 *
 * R35 / A-30 (MigratePalettesDialog): *"zero visual-matrix coverage BY
 * CONSTRUCTION (double-gated on `savedPalettes.length > 0` + an interaction; no
 * route). X-W1 — the visual-golden harness needs a seeded-storage arm, or every
 * gated modal stays permanently unwitnessed."* This is that arm.
 * R35 / U-9 ≡ SH-28 ≡ A-3 want the same seed for a populated `/#/palettes`:
 * *"without it this component's entire defective surface is invisible to the
 * visual matrix."*
 */
export async function seedSavedPalettes(
    context: BrowserContext,
    count = 3,
): Promise<void> {
    const now = "2026-01-01T00:00:00.000Z";
    // `PaletteStore` = `{ version: number; palettes: Palette[] }`. The version
    // field is load-bearing: `usePaletteStore`'s serializer returns the EMPTY
    // default for any payload whose `version` is not a number, so an envelope-
    // less array would seed nothing and this arm would photograph an empty state
    // under a populated name — the exact false-green R35 exists to end.
    const store = {
        version: 1,
        palettes: Array.from({ length: count }, (_, i) => ({
            id: `seeded-${i + 1}`,
            name: `Seeded Palette ${i + 1}`,
            slug: `seeded-palette-${i + 1}`,
            userSlug: "local",
            colors: [
                { css: "#e11d48", position: 0 },
                { css: "#2563eb", position: 1 },
                { css: "#16a34a", position: 2 },
            ],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
            voteCount: 0,
            visibility: "private" as const,
            tier: "standard" as const,
            published: false,
        })),
    };
    await context.addInitScript(
        ([key, value]) => {
            try {
                localStorage.setItem(key, value);
            } catch {
                /* storage may be denied */
            }
        },
        [PALETTE_STORE_KEY, JSON.stringify(store)] as const,
    );
}

/**
 * Deep-link a colour and a space.
 *
 * R35 / CNL-5 asks for *"the parameterised `?space=` / `?color=` sweep"* — the
 * surviving kernel of the killed L-14, and the same sweep R37's Katex residue 9
 * / D-4 wants ridden (*"does `.font-display` paint Fraunces at these five sites
 * … Ride the X-W1 matrix with the parameterised space/color sweep"*).
 */
export function parameterisedUrl(path: string, color: string, space: string): string {
    const sep = path.includes("?") ? "&" : "?";
    return `${path}${sep}color=${encodeURIComponent(color)}&space=${encodeURIComponent(space)}`;
}
