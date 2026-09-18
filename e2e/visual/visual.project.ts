// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — THE `visual` PLAYWRIGHT PROJECT, as a module.
 *
 * ─── Why a module and not an edit to `playwright.config.ts` ──────────────────
 *
 * `playwright.config.ts` is X.W1.a's sole `modify` path (W1.md §Disjointness);
 * `ci.yml` likewise. W1.md says of exactly this seam: *"They do not write it.
 * They deliver runnable artifacts with documented invocations; X.W1.a wires
 * every job, which is why X.W1.a runs in sub-wave 2 after both."* So this unit
 * ships the project DEFINITION and the invocation contract, and X.W1.a spreads
 * it into the root config. One source of truth, no copy to drift.
 *
 * X.W1.a wires it as:
 *
 *     import { VISUAL_PROJECTS } from "./e2e/visual/visual.project";
 *     export default defineConfig({
 *         …,
 *         projects: [ …the six smoke projects…, ...VISUAL_PROJECTS ],
 *     });
 *
 * — one spread and nothing else. `snapshotPathTemplate` is carried INSIDE each
 * project rather than at config level, so wiring the visual projects cannot
 * relocate the six smoke projects' snapshot paths as a side effect.
 *
 * and G-5's oracle slate then sees a seventh project, which must have a CI job
 * or the slate reds — which is the correct coupling, not an accident.
 *
 * ─── The CI contract X.W1.a wires (G-10's "every push" half) ─────────────────
 *
 *   job id:   visual
 *   runs-on:  macos-15          ← LOAD-BEARING, see PLATFORM below
 *   steps:    npx playwright install --with-deps chromium
 *             npx playwright test --project=visual
 *   no `continue-on-error`, no branch-push substitution (G-2 forbids both by
 *   name; the whole wave exists to undo D48 and D55(iv)).
 *
 * ─── PLATFORM: why the golden path carries `{platform}` ──────────────────────
 *
 * Text rasterisation is an OS property, not a GPU one; the renderer slug in each
 * filename pins the GL stack but says nothing about CoreText vs FreeType. A
 * darwin-minted golden compared against a linux run is a false verdict in
 * whichever direction it lands. Putting `{platform}` in the path makes that
 * impossible: a linux run finds NO golden and reports a missing one — loud,
 * honest, and unmistakably not a pixel verdict. That is why the CI job names a
 * macOS runner, and why changing it to `ubuntu-latest` without minting a linux
 * golden set is a G-10 failure rather than a cost saving.
 *
 * ─── Renderer: SwiftShader, and CC-029's two halves ──────────────────────────
 *
 * The launch arguments are the six smoke projects' own, for their own measured
 * reasons (`playwright.config.ts`'s N.W2 note: default-GPU headless Chromium
 * kills the renderer process a few hundred ms after the two live WebGL2 surfaces
 * mount). Goldens minted here are therefore SOFTWARE-GL goldens — CC-029 half
 * (a) — and every filename says so, because `renderer.ts` reads the string out
 * of the live browser and puts it there. Half (b), the real-GPU session, is
 * X.W1.f's and is discharged by frames or by a dated tombstone. This project
 * discharges no part of it.
 */
import type { PlaywrightTestConfig, Project } from "@playwright/test";

/**
 * `{arg}` is the name passed to `toHaveScreenshot`, which `fixtures.ts` builds
 * from the cell's axes plus the live renderer slug — so a golden's FILENAME is
 * its full coordinates and there is no naming convention held somewhere else.
 * No `{projectName}`: there is one project, and the axes already disambiguate
 * every cell within it.
 */
export const VISUAL_SNAPSHOT_PATH_TEMPLATE = "{testDir}/goldens/{platform}/{arg}{ext}";

const SWIFTSHADER_LAUNCH = {
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
};

const BASE_USE = {
    browserName: "chromium" as const,
    channel: "chromium" as const,
    headless: true,
    launchOptions: SWIFTSHADER_LAUNCH,
    // Every cell sets its own viewport; this is only the pre-navigation default.
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
};

/**
 * ONE project.
 *
 * An earlier draft split public and admin arms into two, so that a public cell
 * could never inherit an admin context. Measured: it cannot anyway — Playwright
 * gives each test its own `BrowserContext`, and `seedAdmin()` is applied per
 * test by the specs that need it, so the isolation the split was buying already
 * exists. A second project would only be a second place for a tolerance, a
 * stylesheet or a renderer label to drift, and a second CI job for G-5's slate
 * to need. It is not minted.
 */
export const VISUAL_PROJECTS: Project[] = [
    {
        name: "visual",
        testDir: "./e2e/visual",
        testMatch: [
            "**/*.visual.spec.ts",
            // The three gates that mint no golden and guard the ones that exist:
            // the denominator (NG-11), the digests (the one-pixel clause), and
            // the substrate the whole matrix is photographed against. They sit
            // in THIS project deliberately — a guard in a project nobody runs is
            // the CI-orphan disease G-5 exists to red.
            "**/census-parity.spec.ts",
            "**/golden-integrity.spec.ts",
            "**/substrate-integrity.spec.ts",
        ],
        snapshotPathTemplate: VISUAL_SNAPSHOT_PATH_TEMPLATE,
        // Goldens are a serial resource and the suite is WebGL-heavy; the root
        // config's `workers: 1` rationale (R.W2 DETERMINISM) applies verbatim.
        workers: 1,
        use: BASE_USE,
    },
];

/** The project names, for `scripts/ci/oracle-slate.mjs` (X.W1.a's, G-5). */
export const VISUAL_PROJECT_NAMES = VISUAL_PROJECTS.map((p) => p.name as string);

/** The CI invocation, as one string, so the slate and the workflow agree. */
export const VISUAL_CI_INVOCATION =
    "npx playwright test " +
    VISUAL_PROJECT_NAMES.map((n) => `--project=${n}`).join(" ");

/** The runner class the goldens were minted on. See PLATFORM above. */
export const VISUAL_CI_RUNNER = "macos-15";

export type { PlaywrightTestConfig };
