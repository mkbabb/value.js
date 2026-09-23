/**
 * X.W7.f — G17, compact counts (W7.md §6 G17; fold S-17 · W7.103).
 *
 * Fixture `voteCount = 12345` (the G9 row's own fixture, `g9Palette`): the
 * count renders `12.3k` and its `title` keeps `12345`. The falsifier asserts
 * BOTH halves — a formatter that loses the exact value fails the second.
 * G9 and G17 share one cure surface: the compacted count is what keeps the
 * meta row from spending ≈80px of unshrinkable width on 5-digit counts.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PaletteCardMeta from "../../palettes/browser/card/PaletteCard/PaletteCardMeta.vue";
import PaletteSpecimen from "../../palettes/browser/card/PaletteSpecimen.vue";
import { formatCount } from "../../color-session/format-color";
import { fixturePalette, g9Palette } from "./n-fixtures/fixtures";

describe("G17 — the compact-number formatter", () => {
    it.each([
        [0, "0"],
        [999, "999"],
        [1000, "1k"],
        [12345, "12.3k"],
        [999999, "999.9k"],
        [1234567, "1.2m"],
        [2_500_000_000, "2.5b"],
        [-12345, "-12.3k"],
    ])("%i → %s, title exact", (count, text) => {
        expect(formatCount(count)).toEqual({ text, title: String(count) });
    });
});

describe("G17 — mounted: the count surface", () => {
    it("the vote count renders 12.3k with title 12345 (voteCount = 12345)", () => {
        const wrapper = mount(PaletteCardMeta, { props: { palette: g9Palette() } });
        const votes = wrapper.get("button[aria-label$='votes, click to vote'] .text-mono-small");
        expect(votes.text()).toBe("12.3k");
        expect(votes.attributes("title")).toBe("12345");
        wrapper.unmount();
    });

    it("the specimen's fork and version counts compact; their titles stay exact", () => {
        const wrapper = mount(PaletteSpecimen, { props: { palette: g9Palette() } });
        const forks = wrapper.get("[data-count='forks']");
        expect(forks.text()).toBe("12.3k");
        expect(forks.attributes("title")).toBe("12345 remixes");
        const versions = wrapper.get("[data-count='versions']");
        expect(versions.text()).toBe("4.3k");
        expect(versions.attributes("title")).toBe("4321 versions");
        wrapper.unmount();
    });

    it("a count under a thousand is exact on both halves", () => {
        const wrapper = mount(PaletteCardMeta, { props: { palette: fixturePalette({ voteCount: 42 }) } });
        const votes = wrapper.get("button[aria-label$='votes, click to vote'] .text-mono-small");
        expect(votes.text()).toBe("42");
        expect(votes.attributes("title")).toBe("42");
        wrapper.unmount();
    });
});
