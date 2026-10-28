// SERVED MODEL: claude-opus-5-5
//
// X · SS-8 B08 · SS8-0241 (EB U-1): the error plate's machine-truth detail
// line (Fira's small mono rung) read 4.32:1 off the dark served frame: the
// bare de-emphasis rung `--ink-muted` (via `.plate-ink`) over the resting
// plate on a mid-tone atmosphere band, under the 4.5:1 text floor. The
// statement (8.80) and the light detail (4.73) clear.
//
// The cure is at the component root, not per host: the error variant's
// detail speaks the STRONG muted rung, `--muted-foreground-strong` (the
// golden step of `--ink-muted` toward `--ink-primary` that `.pane-wrapper`
// seats; the rung the admin panels' mono captions already read). Every
// error plate (ErrorBoundary, PaneErrorPlate, the pane error states) renders
// through this one variant.
//
// Falsifier: (1) the detail wears the strong rung, never the bare one;
// (2) the strong rung, mixed in oklab from the two inks the dark frame
// served, clears 4.5:1 on the ground that frame served, where the bare rung
// does not. Frame source: docs/tranches/X/execution/SS8/evidence/
// B08-shared-feedback/eb-frame-cr.out.txt (eb-frame-cr.py over eb-contrast).

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { mixColors, rgb, toRgba8 } from "@mkbabb/value.js/color";
import EmptyState from "../../shared/ui/EmptyState.vue";

type RGB = readonly [number, number, number];

// The dark served frame (eb-frame-cr.out.txt, `dark`).
const DARK_GROUND: RGB = [116, 23, 50]; // detail ground
const DARK_MUTED: RGB = [164, 162, 160]; // served `--ink-muted` (detail ink)
const DARK_PRIMARY: RGB = [233, 230, 226]; // served `--ink-primary` (statement ink)
const GOLDEN_STEP = 0.382; // shell.css `--muted-foreground-strong`

const luminance = ([r, g, b]: RGB) => {
    const lin = (v: number) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (a: RGB, b: RGB) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
    return (hi + 0.05) / (lo + 0.05);
};
const color = (c: RGB) => {
    const made = rgb(c[0], c[1], c[2], 1);
    if (!made.ok) throw new Error("rgb failed");
    return made.value;
};

/** `color-mix(in oklab, muted, primary 38.2%)`, as the browser resolves it. */
function strongRung(muted: RGB, primary: RGB): RGB {
    const mixed = mixColors(color(muted), color(primary), GOLDEN_STEP, { space: "oklab" });
    if (!mixed.ok) throw new Error("mix failed");
    const bytes = toRgba8(mixed.value, { gamut: "clip" });
    if (!bytes.ok) throw new Error("rgba8 failed");
    return [bytes.value[0], bytes.value[1], bytes.value[2]];
}

const global = { stubs: { CircleAlert: true } };

describe("SS8-0241: the error plate's detail ink clears the text floor", () => {
    it("the detail line speaks the strong muted rung, not the bare plate-ink rung", () => {
        const w = mount(EmptyState, {
            props: { variant: "error", message: "Something broke", detail: "induced render throw" },
            global,
        });
        const detail = w.findAll("p").find((p) => p.text() === "induced render throw");
        expect(detail).toBeDefined();
        const classes = detail!.classes();
        expect(classes).toContain("text-(color:--muted-foreground-strong)");
        expect(classes).not.toContain("plate-ink");
        expect(classes).toContain("text-mono-small");
    });

    it("the strong rung clears 4.5:1 on the dark served ground where the bare rung did not", () => {
        expect(contrast(DARK_MUTED, DARK_GROUND)).toBeLessThan(4.5);
        expect(contrast(strongRung(DARK_MUTED, DARK_PRIMARY), DARK_GROUND)).toBeGreaterThanOrEqual(4.5);
    });
});
