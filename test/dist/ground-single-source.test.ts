import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    FIRST_VISIT_GROUND,
    GROUND_RECORD_VERSION,
    GROUND_STOP_COUNT,
    injectGroundTokens,
} from "../../demo/color-picker/composables/boot/ground";

/**
 * G-CANON-4 (U-F23) — the boot GroundRecord contract is single-sourced.
 *
 * The GroundRecord WRITE is TS (`boot/ground.ts` `buildGroundRecord` /
 * `GROUND_RECORD_VERSION`), but the boot READ runs pre-module in
 * `index.html`'s fouc-guard `<script>` (it cannot import the module). Pre-U-F23
 * that reader HAND-DUPLICATED the constants — `var VERSION = 1`, a literal
 * FIRST_VISIT hex array, `rec.stops.length === 4` — so a `GROUND_RECORD_VERSION`
 * bump in the TS origin silently STRANDED the boot script (it kept comparing
 * against the hard-typed `1`).
 *
 * The cure carries `__GROUND_*__` tokens in the boot HTML that vite's
 * `transformIndexHtml` resolves through the TS origin's `injectGroundTokens` at
 * build/serve time. This gate asserts the boot read DERIVES from `ground.ts`
 * (not hand-typed) so a bump propagates automatically.
 *
 * Born-RED before the cure: the boot HTML still hand-typed `var VERSION = 1`
 * and carried no injection token — the first spec fails. GREEN once the
 * constants are tokenized + the injection resolves them from the origin.
 */

const repoRoot = path.resolve(import.meta.dirname, "..", "..");
const rawHtml = readFileSync(
    path.join(repoRoot, "demo/color-picker/index.html"),
    "utf8",
);

describe("G-CANON-4 · boot GroundRecord single-source (U-F23)", () => {
    it("the boot HTML carries injection tokens, not hand-typed constants", () => {
        // A hand-typed `var VERSION = <n>` is the pre-U-F23 fork — a version
        // bump in ground.ts would strand it. The source must carry NONE.
        expect(
            rawHtml,
            "no hand-typed `var VERSION = <n>` may survive — the version is injected from ground.ts",
        ).not.toMatch(/var VERSION = \d+;/);
        // The single source is the injection token, resolved from ground.ts.
        expect(rawHtml).toContain("__GROUND_RECORD_VERSION__");
        expect(rawHtml).toContain("__GROUND_FIRST_VISIT__");
        expect(rawHtml).toContain("__GROUND_STOP_COUNT__");
    });

    it("resolves every token to the ground.ts origin constant (a bump propagates)", () => {
        const injected = injectGroundTokens(rawHtml);
        expect(injected).toContain(`var VERSION = ${GROUND_RECORD_VERSION};`);
        expect(injected).toContain(
            `var FIRST_VISIT = ${JSON.stringify(FIRST_VISIT_GROUND)};`,
        );
        expect(injected).toContain(`rec.stops.length === ${GROUND_STOP_COUNT}`);
        // Every placeholder resolves — none survives the projection.
        expect(injected).not.toMatch(/__GROUND_[A-Z0-9_]+__/);
    });

    it("born-RED proof: the injected VERSION EQUALS GROUND_RECORD_VERSION (tracks a bump)", () => {
        // injectGroundTokens is a pure projection of the module constant: bump
        // GROUND_RECORD_VERSION in ground.ts and this equality still holds (the
        // boot read tracks). Pre-cure the boot read was a hard-typed `1`
        // independent of the origin — the equality would break on the next bump.
        const injected = injectGroundTokens(rawHtml);
        const m = injected.match(/var VERSION = (\d+);/);
        expect(
            m,
            "the injected boot script must declare a numeric VERSION",
        ).not.toBeNull();
        expect(Number(m?.[1])).toBe(GROUND_RECORD_VERSION);
    });

    it("single-sources the @property + theme-color light seed from FIRST_VISIT_GROUND", () => {
        const injected = injectGroundTokens(rawHtml);
        FIRST_VISIT_GROUND.light.forEach((hex, i) => {
            expect(
                injected,
                `--saved-bg-${i} initial-value must derive from FIRST_VISIT_GROUND.light[${i}]`,
            ).toContain(`initial-value: ${hex};`);
        });
        // theme-color + --saved-bg base stop = light[0].
        expect(injected).toContain(`content="${FIRST_VISIT_GROUND.light[0]}"`);
    });
});
