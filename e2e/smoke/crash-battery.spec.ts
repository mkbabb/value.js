import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { deflateSync } from "node:zlib";

import { openView, mainPane } from "./fixtures/dock";

/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — NG-8, THE BORN-RED CRASH BATTERY (fold R14 · R15 · R16 ·
 * R17 · R18 · R19).
 *
 * NG-8's falsifier is the sharpest in the register: *"Each arm has a named
 * product mechanism; a battery that greens without its cure landing means the
 * arm was authored to the cure, not to the defect."* So every arm below names
 * the mechanism it reds on, in the assertion message, and **W1 owns only the
 * gates** — each cure lives at the wave the fold routes it to and none of them
 * has landed. These are expected to fail. That is the point.
 *
 * The arms and their routed cures:
 *   R14 · Retry blanks the Browse wall (dev-permanent)    → cure X-W7.g
 *   R15 · two clicks kill the pane grid (256/256 greys)   → cure X-W9
 *   R16 · the boot seed matrix (28/256 greys)             → cure X-W9/X-W5
 *   R17 · the none-URL, outside the boundary              → cure X-W5 + X-W9
 *   R18 · the extract flow (setInputFiles = 0 repo-wide)  → cure NO-WAVE-OWNER
 *   R19 · the mobile dropdown (zero coverage of any kind) → cure X-W5
 */

/** Errors this app publishes to the console while crashing. */
function collectPageErrors(page: Page): string[] {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
    });
    return errors;
}

// ── R14 · BrowsePane M1 — the Retry gate ────────────────────────────────────
//
// MECHANISM (the corpus's, re-stated so a green here is readable): a leading
// template COMMENT makes `EmptyState.vue` a multi-root component under the dev
// compiler, which breaks `<Transition mode="out-in">`'s leave and strands
// `isLeaving` forever. One press of Retry blanks the Browse wall — permanently
// in dev (KeepAlive holds the blank across search, clear, a route round-trip
// and even a backend restore), transiently in prod. `PaletteCard.vue` and
// `PaletteCardSkeleton.vue` compile dev-fragment the same way, so the gate is
// written against the HOST, not against one component.
test("R14 · pressing Retry on a dead Browse wall leaves a plate behind", async ({
    page,
}) => {
    let abort = true;
    await page.route("**/palettes*", (route) =>
        abort ? route.abort("failed") : route.continue(),
    );

    await page.goto("/#/browse");
    await expect(mainPane(page)).toBeVisible();

    const errorPlate = page.getByText(/The commons is unreachable/);
    await expect(errorPlate, "the error plate paints at all").toBeVisible({
        timeout: 15_000,
    });

    const retry = page.getByRole("button", { name: "Retry" });
    await expect(retry).toBeVisible();
    await retry.click();

    // The wall must still SHOW something — the error plate again (the request
    // is still aborted), never an empty region. A blank wall here is the
    // stranded `isLeaving`, and it is the whole defect.
    await expect(
        errorPlate,
        "Retry blanked the Browse wall — EmptyState.vue's leading template comment makes it multi-root under the dev compiler, which breaks Transition mode=out-in's leave and strands isLeaving forever (cure: X-W7.g's EmptyState carve)",
    ).toBeVisible({ timeout: 8000 });

    // …and it recovers when the backend does, rather than holding the blank.
    //
    // R2 · DEAD-LOCATOR RULING (X-W1 repair 1, Check 1 D-4). This bound
    // `"article, [data-palette-card], .palette-card"` — a three-member union in
    // which EVERY member was dead, so the recovery leg could not pass however
    // the product behaved. Measured: `[data-palette-card]` appears in 0 bytes of
    // `demo/`, `src/` or the installed `@mkbabb/glass-ui`; the only class in the
    // tree is `.palette-card-grid` (`PaletteCardGrid.vue:4`), which `.palette-card`
    // does not match, class tokens being exact; and ⟨`grep -rn '<article' demo/
    // --include='*.vue'`⟩ → **0** — `PaletteCard.vue:22` carries `role="article"`
    // on a `<div>`, which the CSS tag selector `article` never matches. The live
    // hook is the ROLE, which is also what `views/browse-loading.spec.ts` binds.
    abort = false;
    await retry.click();
    await expect(
        mainPane(page).getByRole("article").first(),
        "the wall never repopulated after the backend recovered — KeepAlive is holding a stranded leave",
    ).toBeVisible({ timeout: 15_000 });
});

// ── R15 · ColorNutritionLabel CNL-2 — the two-click crash ───────────────────
//
// MECHANISM: all 256 greys emit hue `"none"` in both lch and oklch. The chain
// `ColorPicker.vue:348-354` → `updateToColorSpace` → `setCurrentColor` (whose
// hue refresh is guarded and whose WRITE is not) → `clampPickerColor` (which
// preserves `"none"`) → `channelNumber`, which throws `Missing lch.h` IN
// RENDER. The ErrorBoundary then paints its fallback over the whole pane grid,
// and Try-again re-throws into the same state.
test("R15 · an achromatic colour then LCh does not kill the pane grid", async ({
    page,
}) => {
    const errors = collectPageErrors(page);

    // Click 1 — an achromatic colour, by URL (the same seed a user reaches by
    // dragging chroma to zero; the two-click shape is preserved below).
    await page.goto("/?color=%23808080");
    await expect(mainPane(page)).toBeVisible();

    // Click 2 — switch the space to LCh through the app's own control.
    const spaceTrigger = page
        .getByRole("combobox", { name: /Color space/i })
        .filter({ visible: true })
        .first();
    await expect(spaceTrigger).toBeVisible({ timeout: 10_000 });
    await spaceTrigger.click();
    await page.getByRole("option", { name: /^lch$/i }).first().click();

    await expect(
        page.locator('[role="alert"]').filter({ visible: true }),
        'the pane grid fell to its ErrorBoundary: 256/256 greys emit hue "none" in lch/oklch, setCurrentColor\'s WRITE is unguarded, clampPickerColor preserves "none", and channelNumber throws `Missing lch.h` in RENDER (cure: X-W9, the "none" protocol at the demo boundary)',
    ).toHaveCount(0, { timeout: 6000 });

    expect(
        errors.filter((e) => /Missing (lch|oklch)\.h/.test(e)),
        "the render throw reached the console",
    ).toEqual([]);
});

// ── R16 · ColorNutritionLabel CNL-3 — the boot seed matrix ──────────────────
//
// MECHANISM: `useColorPipeline.ts:75-76` runs unguarded in `App.vue:245`'s
// setup — OUTSIDE the ErrorBoundary — while the identical conversion twelve
// lines below sits inside a try/catch. 28 of 256 greys round-trip to
// hsv-powerless, so any of them as a persisted or deep-linked seed throws
// `Missing hsv.h` BEFORE MOUNT: a white screen, self-perpetuating through the
// persisted seed. The gate's floor is `?color=black`; the matrix is what makes
// it honest, because the failure is seed-conditional and a default cold boot
// cannot see it.
// The seeds are held in their PLAIN form and encoded at the call site — a
// half-encoded literal is how a matrix silently stops testing what it names.
const BOOT_SEEDS = [
    "black",
    "white",
    "#000000",
    "#808080",
    "#fefefe",
    "rgb(17,17,17)",
    "hsl(0 0% 50%)",
];

for (const seed of BOOT_SEEDS) {
    test(`R16 · the app boots at ?color=${seed}`, async ({ page }) => {
        const errors = collectPageErrors(page);
        await page.goto(`/?color=${encodeURIComponent(seed)}`);
        await expect(
            mainPane(page),
            `boot at seed "${seed}" never mounted — useColorPipeline.ts:75-76 runs unguarded in App.vue:245's setup, OUTSIDE the ErrorBoundary, and 28 of 256 greys round-trip to hsv-powerless (cure: X-W9 / X-W5)`,
        ).toBeVisible({ timeout: 20_000 });

        expect(
            errors.filter((e) => /Missing (hsv|hsl|lch|oklch)\.h/.test(e)),
            `a hue-refresh throw escaped at boot for seed "${seed}"`,
        ).toEqual([]);
    });
}

// ── R17 · picker-componentsliders R-2 ≡ parseechoreadout A-1 — the none-URL ─
//
// MECHANISM: `none` is a LEGAL CSS hue, and it reaches an unguarded throw in
// root setup. The boundary sits one level too low — `ErrorBoundary` is inside
// App's template while `main.ts:5-7` mounts bare, so a descendant's
// `onErrorCaptured` cannot catch an ancestor's setup throw. A-1 adds two throw
// sites to the enumeration: `astEcho` (`useColorParsing.ts:97`) and
// `gamutVerdict` (`:108`), with the R⑤ asymmetry that Route A throws `astEcho`
// only; and it records that the dock mount (`ActionBarLayer.vue:115` →
// `ColorInput.vue:109`) sits OUTSIDE the boundary too.
const NONE_COLORS = ["oklch(0.5 0 none)", "lch(50 0 none)", "hsl(none 0% 50%)"];

for (const color of NONE_COLORS) {
    test(`R17 · a legal none-hue URL boots: ${color}`, async ({ page }) => {
        const errors = collectPageErrors(page);
        await page.goto(`/?color=${encodeURIComponent(color)}`);
        await expect(
            mainPane(page),
            `a LEGAL none-hue URL did not boot — the throw is in ROOT SETUP and ErrorBoundary sits one level too low to catch it (main.ts:5-7 mounts bare); cure halves are X-W5 (demo Result propagation) + X-W9 (library Result battery)`,
        ).toBeVisible({ timeout: 20_000 });

        // The dock mounts OUTSIDE the boundary, so its survival is a separate
        // fact from the pane grid's.
        await expect(
            page.locator(".glass-dock"),
            "the dock did not mount — ActionBarLayer -> ColorInput sits outside the ErrorBoundary",
        ).toBeVisible({ timeout: 10_000 });

        expect(
            errors.filter((e) => /Missing .*\.h|astEcho|gamutVerdict/.test(e)),
            "a none-hue throw escaped",
        ).toEqual([]);
    });
}

// ── R18 · XP-7 ≡ XW-18 ≡ EY-46 — the extract flow ───────────────────────────
//
// MECHANISM: no gate has ever handed this route a file. `setInputFiles` was
// **0 across all of `e2e/`** before this spec (three independent greps),
// `dataTransfer` and `input[type=file]` were 0, and deleting `@pick` /
// `@add-color` (`ExtractPane.vue:15-16`) kept every existing gate green. Three
// rosters call this "the single highest-leverage artifact this record
// proposes"; the product cures are NO-WAVE-OWNER, so W1 authors only the spec.
//
// The fixture is MINTED, not committed: a hand-built 2×2 PNG keeps the suite
// free of a binary asset while still exercising the real file path.

/** A valid 2x2 8-bit RGB PNG, built here so no binary fixture is committed. */
function mintPng(pixels: Array<[number, number, number]>): Buffer {
    const crcTable = Array.from({ length: 256 }, (_, n) => {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        return c >>> 0;
    });
    const crc = (buf: Buffer) => {
        let c = 0xffffffff;
        for (const byte of buf) c = crcTable[(c ^ byte) & 0xff]! ^ (c >>> 8);
        return (c ^ 0xffffffff) >>> 0;
    };
    const chunk = (type: string, data: Buffer) => {
        const len = Buffer.alloc(4);
        len.writeUInt32BE(data.length);
        const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
        const sum = Buffer.alloc(4);
        sum.writeUInt32BE(crc(body));
        return Buffer.concat([len, body, sum]);
    };
    const width = 2;
    const height = 2;
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 2; // colour type: RGB
    const raw: number[] = [];
    for (let y = 0; y < height; y++) {
        raw.push(0); // filter: None
        for (let x = 0; x < width; x++) {
            const [r, g, b] = pixels[y * width + x] ?? [0, 0, 0];
            raw.push(r, g, b);
        }
    }
    return Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        chunk("IHDR", ihdr),
        chunk("IDAT", deflateSync(Buffer.from(raw))),
        chunk("IEND", Buffer.alloc(0)),
    ]);
}

const FIXTURE_PNG = mintPng([
    [220, 40, 40],
    [40, 200, 90],
    [50, 90, 220],
    [240, 210, 60],
]);

async function openExtract(page: Page) {
    await page.goto("/");
    await openView(page, "Extract");
    await expect(
        mainPane(page).getByRole("heading", { name: "Extract" }).last(),
    ).toBeVisible({ timeout: 10_000 });
}

test("R18 · a real image file develops a palette", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openExtract(page);

    const input = mainPane(page).locator('input[type="file"]').first();
    await expect(
        input,
        "the extract route publishes a file input at all",
    ).toBeAttached();
    await input.setInputFiles({
        name: "x-w1-fixture.png",
        mimeType: "image/png",
        buffer: FIXTURE_PNG,
    });

    await expect(
        mainPane(page).locator("img[alt='Uploaded image']"),
        "the drop zone never showed the uploaded image — the file path itself is broken",
    ).toBeVisible({ timeout: 15_000 });

    // R2 · DEAD-LOCATOR RULING (X-W1 repair 1, Check 1 D-4). This bound
    // `".extract-swatch, [data-extract-swatch], [data-palette-swatch]"`, and all
    // three members are dead: ⟨`grep -rl` each literal over `demo/ src/` and the
    // installed `@mkbabb/glass-ui`⟩ → **0 files** apiece. A developed extract
    // palette renders through `ExtractWorkbench.vue:145`'s `<PaletteCard>` →
    // `PaletteCardSwatches.vue:25` → `SwatchHoverMenu.vue:18/:33`, whose swatch
    // carries `aria-label="Color swatch <css>"`. That is the live hook, so that
    // is what this arm binds. The arm's RED must come from R18's mechanism —
    // the extract flow no gate had ever handed a file — never from a selector
    // that could not have matched under any behaviour.
    await expect(
        mainPane(page).locator('[aria-label^="Color swatch "]').first(),
        "no palette developed from a valid image: no gate had ever handed this route a file (setInputFiles was 0 repo-wide), so the whole flow was unmeasured",
    ).toBeVisible({ timeout: 20_000 });

    expect(errors, "extracting a valid image logged errors").toEqual([]);
});

test("R18 · a corrupt file surfaces a visible error, never a silent half-state", async ({
    page,
}) => {
    await openExtract(page);

    const input = mainPane(page).locator('input[type="file"]').first();
    await input.setInputFiles({
        name: "x-w1-corrupt.png",
        mimeType: "image/png",
        buffer: Buffer.from("this is not a PNG at all", "utf8"),
    });

    await expect(
        page.getByText(/could not|unsupported|failed|invalid|error/i).first(),
        "a corrupt image produced no visible error — XP-2's witness: the flow must say so, not leave a half-developed palette",
    ).toBeVisible({ timeout: 15_000 });
});

// ── R19 · shell-dock-mobilemenudropdown C-9/L-8 — the mobile viewport ───────
//
// MECHANISM: zero unit, e2e or oracle coverage of any kind; the only
// references anywhere are `Dock.vue:11` and `:207`. C's mutation argument is a
// correct vacuity proof — replacing the whole template with
// `<div class="lg:hidden"/>` keeps every existing gate green.
test.describe("R19 · the mobile menu dropdown", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("opens, publishes its rows, and its external link is operable", async ({
        page,
    }) => {
        const errors = collectPageErrors(page);
        await page.goto("/");
        await expect(mainPane(page)).toBeVisible();

        const trigger = page.getByRole("button", { name: "Menu" });
        await expect(
            trigger,
            "the mobile dropdown's trigger never rendered — replacing this component with an empty `lg:hidden` div keeps every other gate green, which is the vacuity C-9 proved",
        ).toBeVisible({ timeout: 10_000 });
        await trigger.click();

        const menu = page.getByRole("menu").filter({ visible: true }).first();
        await expect(menu).toBeVisible({ timeout: 4000 });
        await expect(
            menu.getByRole("menuitem"),
            "the dropdown opened empty",
        ).not.toHaveCount(0);

        // L-8's arm: the wordmark link is a real, reachable anchor, not decor.
        const link = menu.getByRole("link").first();
        await expect(link).toHaveAttribute("href", /github\.com/);
        await expect(link).toHaveAttribute("rel", /noopener/);

        // Keyboard operability — the arm the corpus measured RED today.
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden({ timeout: 4000 });
        await trigger.focus();
        await page.keyboard.press("Enter");
        await expect(
            page.getByRole("menu").filter({ visible: true }).first(),
            "Enter on the mobile menu trigger did not open it — keyboard operability is the arm measured RED",
        ).toBeVisible({ timeout: 4000 });

        expect(errors).toEqual([]);
    });
});
