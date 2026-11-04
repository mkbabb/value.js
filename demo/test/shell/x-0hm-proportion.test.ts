/**
 * X·§0hm.1 D-19 / D-20 / D-24 / D-31 — the value proportion rows, as unit
 * falsifiers beside the served measurements (evidence/0hm/cures-value).
 *
 * D-19: the pane floor is block-aware (`min(25rem, 100svh)`), and every size
 *   query that writes the row's two-track condition out writes that floor, so
 *   the grid and its contracts flip at one width.
 * D-20: in one track a row companion's ceiling is the scene band's block.
 * D-24: the card's meta is two grid cells (tags, vote); the vote has its own
 *   area on the name row, and the card's actions sit on glass's `xs` rung.
 * D-31: the vote's coarse-pointer target meets `--touch-target`.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PaletteCardMeta from "../../palettes/inspector/PaletteCardMeta.vue";
import type { Palette } from "../../palettes/types";

const DEMO = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(DEMO, p), "utf8");

/** Every two-track condition the row's size queries write out. */
function rowConditions(src: string): string[] {
    return [...src.matchAll(/@container (?:scene|pane-row)(?: not)? \(inline-size >= (calc\([^{]*\))\)\s*\{/g)].map(
        (m) => m[1]!,
    );
}

describe("D-19 — the pane floor is block-aware, and every row query writes it", () => {
    it("--pane-min never exceeds the viewport's block size", () => {
        expect(read("styles/foundation.css")).toMatch(/--pane-min:\s*min\(25rem,\s*100svh\);/);
    });

    it("the row's two-track condition is the token's value at every site", () => {
        const sites = [...rowConditions(read("styles/shell.css")), ...rowConditions(read("shell/PaneShell.vue"))];
        expect(sites.length).toBeGreaterThanOrEqual(5);
        for (const c of sites) {
            expect(c).toBe("calc(2 * min(25rem, 100svh) + clamp(0.5rem, 1.25vw, 1.618rem))");
        }
    });
});

describe("D-20 — in one track the companion's port is the scene band", () => {
    it("the negated row query bounds the follower to --scene-band-block", () => {
        const css = read("styles/shell.css");
        const block = css.match(
            /@container pane-row not \([^{]*\)\s*\{\s*\.pane-wrapper--inspector > \.pane-row-follow \{([^}]*)\}/,
        );
        expect(block, "one-track follower rule").not.toBeNull();
        expect(block![1]).toMatch(/max-block-size:\s*var\(--scene-band-block\)/);
        expect(block![1]).toMatch(/flex-direction:\s*column/);
    });
});

function palette(over: Partial<Palette> = {}): Palette {
    return {
        id: "p1",
        slug: "p1",
        name: "Daraksha Gradient",
        colors: [],
        tags: [],
        voteCount: 5,
        ...over,
    } as unknown as Palette;
}

describe("D-24 — the vote is the card's own cell on the name row", () => {
    it("with no tags only the vote cell renders (no second-row occupant)", () => {
        const w = mount(PaletteCardMeta, { props: { palette: palette() } });
        expect(w.find(".palette-meta__tags").exists()).toBe(false);
        expect(w.find("button.palette-meta__vote").exists()).toBe(true);
        w.unmount();
    });

    it("with tags the vote is a sibling of the tags cell, never inside it", () => {
        const w = mount(PaletteCardMeta, { props: { palette: palette({ tags: ["warm", "skin"] }) } });
        const tags = w.get(".palette-meta__tags");
        expect(tags.find("button.palette-meta__vote").exists()).toBe(false);
        expect(w.find("button.palette-meta__vote").exists()).toBe(true);
        w.unmount();
    });

    it("the card grid names a vote area on the name row; narrow cards move only the tags", () => {
        const sfc = read("palettes/inspector/PaletteInspector.vue");
        expect(sfc).toMatch(/"grip head meta vote menu"/);
        expect(sfc).toMatch(/"strip grip head meta vote menu"/);
        const narrow = sfc.match(/@container palette-card \(width < 30rem\) \{([\s\S]*?)\n\}/);
        expect(narrow).not.toBeNull();
        // one row at every width: nothing is re-placed onto a second row
        expect(narrow![1]).not.toMatch(/grid-row/);
        const meta = read("palettes/inspector/PaletteCardMeta.vue");
        expect(meta).toMatch(/\.palette-meta__vote \{[^}]*grid-area:\s*vote/);
        // below 30rem the tags speak their compact reveal (band 0), no chip
        expect(meta).toMatch(/@container palette-card \(width < 30rem\) \{\s*\.palette-meta__band-0/);
        expect(meta).toMatch(/@container palette-card \(width >= 30rem\) \{\s*\.palette-meta__rank-0/);
    });

    it("the card's two actions sit on glass's xs rung", () => {
        const sfc = read("palettes/inspector/PaletteInspector.vue");
        const tpl = sfc.slice(0, sfc.indexOf("<script"));
        const sizes = [...tpl.matchAll(/icon-only\s+emphasis="quiet"\s+size="(\w+)"/g)].map((m) => m[1]);
        expect(sizes).toEqual(["xs", "xs"]);
    });
});

describe("D-31 — the vote's coarse target meets --touch-target", () => {
    it("a coarse-pointer ::after slop insets negatively to the touch floor on both axes", () => {
        const meta = read("palettes/inspector/PaletteCardMeta.vue");
        const rule = meta.match(/@media \(pointer: coarse\) \{\s*\.palette-meta__vote::after \{([^}]*)\}/);
        expect(rule, "coarse slop rule").not.toBeNull();
        expect(rule![1]).toMatch(/position:\s*absolute/);
        expect(rule![1]).toMatch(/inset-block:[^;]*var\(--touch-target/);
        expect(rule![1]).toMatch(/inset-inline:[^;]*var\(--touch-target/);
        expect(meta).toMatch(/\.palette-meta__vote \{[^}]*position:\s*relative/);
    });
});
