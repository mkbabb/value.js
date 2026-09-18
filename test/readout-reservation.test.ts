/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the readout-reservation oracle (fold R22 / NG-9).
 *
 * BORN-RED WITNESS: 209 lines of hand-derived packing arithmetic with ZERO unit
 * coverage, colocated in ONE consumer's private folder and reached
 * cross-boundary from `ComponentSliders.vue`. R22's lock names why that matters:
 * *"the sibling `valueDomain.ts` names its own oracle, so the house standard
 * EXISTS and this module sits outside it — which is exactly why M-7 survived."*
 *
 * Every constant in the module is DERIVED (the doc block says so explicitly:
 * *"not measured at runtime and not nudged to fit"*), so the oracle asserts the
 * derivation's own laws rather than a table of today's outputs — a snapshot
 * would pass a nudge and fail a legitimate re-derivation, which is backwards.
 *
 * The module's home is X-W8's (R22 splits it: *"module home → X-W8; unit oracle
 * → X-W1"*), so nothing here moves a byte of it.
 */
import { describe, expect, it } from "vitest";

import {
    READOUT_CH,
    readoutCh,
    readoutDecimals,
    readoutFit,
    readoutLineCount,
} from "../demo/picker/display/ColorComponentDisplay/readoutReservation";

/** The one-line `ch` budget the header guarantees (module-internal constant). */
const CAPACITY_CH = 11.7;
/** Q11b lever 2's floor: a shave deeper than 3% is refused. */
const FIT_FLOOR = 0.97;
/** The tnum mint's non-digit advances (module-internal constants). */
const DOT_CH = 0.45;
const SIGN_CH = 0.65;

describe("readoutReservation — the least-count knob", () => {
    it("the lever-1 set takes 0 decimals; everything else takes 1", () => {
        // The module's OWN membership list (`INTEGER_LEAST_COUNT`), asserted
        // as the law it declares rather than as a list re-typed here.
        for (const space of ["rgb", "hsl", "hsv", "hwb", "lch", "xyz"]) {
            expect(readoutDecimals(space, "x"), space).toBe(0);
        }
        for (const space of ["oklch", "oklab", "kelvin", "display-p3"]) {
            expect(readoutDecimals(space, "x"), space).toBe(1);
        }
    });

    it("lab is DELIBERATELY outside the lever-1 set — the ruled lever-3 arm", () => {
        // Pinned on its own because it is the module's one documented
        // exception: *"lab is DELIBERATELY absent (1-decimal + the honest
        // 2-line lock)"*. Folding lab into the integer set would buy a line
        // back by changing the ruled notation, which is the nudge the whole
        // module forswears — so the exception gets an assertion, not a
        // footnote.
        expect(readoutDecimals("lab", "l")).toBe(1);
        expect(readoutDecimals("lab", "a")).toBe(1);
    });

    it("the component argument is INERT — the knob is per-space, by design", () => {
        // Its signature takes one (`_component`) and ignores it. If that ever
        // becomes per-component the callers' shared assumption breaks silently,
        // because `READOUT_CH` and `figParts` both read this one function.
        const space = "oklch";
        const answers = new Set(
            ["l", "c", "h", "alpha", "nonsense"].map((k) => readoutDecimals(space, k)),
        );
        expect(answers.size).toBe(1);
    });
});

describe("readoutReservation — the ch table", () => {
    it("every space carries an `alpha` cell beside its own channels", () => {
        for (const [space, cells] of Object.entries(READOUT_CH)) {
            expect(Object.keys(cells), `${space}`).toContain("alpha");
        }
    });

    it("the dot is NOT counted at 1ch — the tnum mint's whole point", () => {
        // `chOf` charges 1 per digit, DOT_CH per dot, SIGN_CH per sign.
        // Counting the dot at 1ch was the retired approximation that
        // over-reserved ~0.5ch per fractional cell, and the mint exists
        // precisely because only DIGITS are tabular on the shipped face.
        //
        // Read as a DIFFERENCE between two cells of the module's own table,
        // never as a snapshot: `lab.l` renders `100.0` (4 digits + a dot) and
        // `rgb.r` renders `255` (3 digits, integer least-count). Their gap is
        // therefore one digit plus one dot, and the dot's charge falls out.
        const labL = READOUT_CH["lab"]?.["l"];
        const rgbR = READOUT_CH["rgb"]?.["r"];
        expect(labL, "lab.l").toBeDefined();
        expect(rgbR, "rgb.r").toBeDefined();
        expect(rgbR).toBeCloseTo(3, 10);
        expect(
            labL! - rgbR! - 1,
            "the dot's charge, recovered from the table itself",
        ).toBeCloseTo(DOT_CH, 10);
        expect(DOT_CH, "a dot is narrower than a tabular digit").toBeLessThan(1);
    });

    it("negative bounds pay the sign, once", () => {
        // Same difference idiom. `oklab.a` runs to −0.4 → `-0.4`; the
        // `srgb-linear` channels run 0..1 → `1.0`. Both are 1-decimal cells
        // with a single integer digit, so the ONLY difference between them is
        // the sign — and a second sign would show up here as 2×SIGN_CH.
        const oklabA = READOUT_CH["oklab"]?.["a"];
        const linearR = READOUT_CH["srgb-linear"]?.["r"];
        expect(oklabA, "oklab.a").toBeDefined();
        expect(linearR, "srgb-linear.r").toBeDefined();
        expect(
            oklabA! - linearR!,
            "the sign's charge, recovered from the table itself",
        ).toBeCloseTo(SIGN_CH, 10);
        // …and the signed cells of a space are its signed channels only: lab's
        // lightness is unsigned, its a/b are not, and they cost one sign each.
        const labL = READOUT_CH["lab"]?.["l"];
        expect(READOUT_CH["lab"]?.["a"]! - labL!).toBeCloseTo(SIGN_CH, 10);
        expect(READOUT_CH["lab"]?.["b"]! - labL!).toBeCloseTo(SIGN_CH, 10);
    });

    it("an unknown pair falls back to the widest single-cell format, not to zero", () => {
        // A zero fallback would silently under-reserve and the line lock would
        // read one line for a tuple that paints two.
        expect(readoutCh("no-such-space", "no-such-channel")).toBe(9);
        expect(readoutCh("hex", "hex")).toBe(9);
        expect(readoutCh("rgb", "not-a-channel")).toBe(9);
    });
});

describe("readoutReservation — lever 2, the fit coefficient", () => {
    it("is exactly 1 when the tuple already packs", () => {
        expect(readoutFit("rgb", ["r", "g", "b"])).toBe(1);
    });

    it("never returns a shave deeper than the floor — it returns 1 instead", () => {
        // The REJECTED arm, pinned: a space needing more than ~3% takes its
        // honest extra line; it is never squeezed further. So the range of
        // `readoutFit` is exactly {1} ∪ [0.97, 1).
        const spaces = Object.keys(READOUT_CH);
        for (const space of spaces) {
            const components = Object.keys(READOUT_CH[space] ?? {}).filter(
                (k) => k !== "alpha",
            );
            const fit = readoutFit(space, components);
            expect(fit, `${space}`).toBeLessThanOrEqual(1);
            if (fit < 1) expect(fit, `${space}`).toBeGreaterThanOrEqual(FIT_FLOOR);
        }
    });

    it("a shave, when it happens, lands the tuple exactly ON the budget", () => {
        // `fit = CAPACITY / packWidth`, so `packWidth × fit === CAPACITY`. A fit
        // that under- or over-shot would be a nudge, not a derivation.
        const wide = ["l", "c", "h", "alpha"];
        const fit = readoutFit("oklch", wide);
        if (fit < 1) {
            const packed =
                wide.reduce(
                    (w, c, i) => w + (i === 0 ? 0 : 0.75) + readoutCh("oklch", c),
                    0,
                ) * fit;
            expect(packed).toBeCloseTo(CAPACITY_CH, 9);
        }
    });
});

describe("readoutReservation — the line count", () => {
    it("a fit-down space IS a one-line space (lever 2 precedes the pack)", () => {
        for (const space of Object.keys(READOUT_CH)) {
            const components = Object.keys(READOUT_CH[space] ?? {}).filter(
                (k) => k !== "alpha",
            );
            if (readoutFit(space, components) < 1) {
                expect(readoutLineCount(space, components), space).toBe(1);
            }
        }
    });

    it("no space is given a BLANKET 2 — every count is derived", () => {
        // The blanket lock left a permanent blank second line under every
        // one-line space; this is the assertion that the blanket is gone.
        const counts = Object.keys(READOUT_CH).map((space) =>
            readoutLineCount(
                space,
                Object.keys(READOUT_CH[space] ?? {}).filter((k) => k !== "alpha"),
            ),
        );
        expect(counts.some((n) => n === 1)).toBe(true);
        expect(Math.max(...counts)).toBeLessThanOrEqual(3);
    });

    it("a cell is ATOMIC — it never splits across the line break", () => {
        // A single cell wider than the whole budget must still be one line, not
        // a fractional wrap: the greedy packer's `used > 0` guard is what makes
        // that true, and deleting it would silently mint an extra line.
        expect(readoutLineCount("hex", ["hex"])).toBe(1);
    });

    it("counts rise monotonically as cells are added", () => {
        const space = "rgb";
        let previous = 0;
        for (const components of [
            ["r"],
            ["r", "g"],
            ["r", "g", "b"],
            ["r", "g", "b", "alpha"],
        ]) {
            const n = readoutLineCount(space, components);
            expect(n, components.join(",")).toBeGreaterThanOrEqual(previous);
            previous = n;
        }
    });
});
