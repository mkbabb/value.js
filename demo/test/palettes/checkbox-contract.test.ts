// SERVED MODEL: claude-opus-5-5[1m]
//
// X-W7 · X.W7.a — G2: the Checkbox contract, read from the EMIT LEDGER.
//
// Both `<Checkbox>` consumers in the demo bound `:checked` / `@update:checked`,
// an API glass-ui 7 does not declare (`Checkbox.vue.d.ts`: `modelValue` in,
// `update:modelValue` out). The box still ticked — reka's uncontrolled branch
// flips `data-state` — so a visual assertion passes the RED state. What the
// RED state cannot fake is the ledger: `update:selectedTags` never fired and
// `saveTags` was called 0 times. This file mounts both REAL SFCs against the
// REAL installed glass-ui, clicks a tag box, and counts.
//
// Mountability (fold R53): `TagEditPopover` hard-asserts `inject(BROWSE_PORT_KEY)!`,
// so the port is SUPPLIED here — the two members the leaf reads — rather than
// wrapping the SFC in its parent.
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";

import SearchFilterBar from "../../palettes/browser/search/SearchFilterBar.vue";
import TagEditPopover from "../../palettes/browser/search/TagEditPopover.vue";
import type { Palette, Tag } from "../../palettes/types";
import { BROWSE_PORT_KEY, type BrowsePort } from "../../palettes/usePalettePorts";

const TAGS: Tag[] = [
    { id: "t1", name: "warm", category: "temperature" },
    { id: "t2", name: "cool", category: "temperature" },
];

const mounted: VueWrapper[] = [];
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

/** X.W12U.s2 (UIA-V-32 · V-125): both tag surfaces render the one TagChipSet —
 *  glass selectable Chips (a pressed button), no longer checkbox rows; the
 *  ledger contract is the same. */
function chipFor(name: string): HTMLElement {
    const chip = [...document.body.querySelectorAll<HTMLElement>("button[data-mode=selectable]")].find(
        (b) => b.textContent?.trim() === name,
    );
    if (!chip) throw new Error(`no chip rendered for tag "${name}"`);
    return chip;
}

describe("G2 · SearchFilterBar — one click, one update:selectedTags", () => {
    // jsdom ships no `ResizeObserver` (the glass ToggleGroup measures itself).
    beforeEach(() => {
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
    });
    afterEach(() => vi.unstubAllGlobals());

    async function mountBar(selectedTags: string[]) {
        const w = mount(SearchFilterBar, {
            props: { sort: "newest", tier: "", selectedTags, availableTags: TAGS },
            attachTo: document.body,
        });
        mounted.push(w);
        await w.get("[aria-label^=Filters]").trigger("click");
        await flushPromises();
        return w;
    }

    it("reflects the prop-driven initial state", async () => {
        await mountBar(["warm"]);
        expect(chipFor("warm").getAttribute("aria-pressed")).toBe("true");
        expect(chipFor("cool").getAttribute("aria-pressed")).toBe("false");
    });

    it("ticking an unselected tag emits exactly one next array, with the tag added", async () => {
        const w = await mountBar(["warm"]);
        chipFor("cool").click();
        await flushPromises();
        expect(w.emitted("update:selectedTags")).toEqual([[["warm", "cool"]]]);
    });

    it("unticking a selected tag emits exactly one next array, with the tag removed", async () => {
        const w = await mountBar(["warm", "cool"]);
        chipFor("warm").click();
        await flushPromises();
        expect(w.emitted("update:selectedTags")).toEqual([[["cool"]]]);
    });
});

describe("G2 · TagEditPopover — one click, one saveTags", () => {
    function mountPopover(currentTags: string[]) {
        // X.W12.u1 (UIA-V-35): saveTags resolves the SAVED palette on success
        // (undefined = refused/failed), and the popover emits only after it.
        const saveTags = vi.fn<BrowsePort["tagEdit"]["saveTags"]>(
            async (slug, tags) => ({ slug, tags }) as Palette,
        );
        const port: Pick<BrowsePort, "tagEdit" | "remotePalettes"> = {
            tagEdit: {
                allTags: ref(TAGS),
                loading: ref(false),
                loaded: ref(true),
                error: ref<string | null>(null),
                loadAllTags: async () => {},
                saveTags,
            },
            remotePalettes: ref<Palette[]>([]),
        };
        const w = mount(TagEditPopover, {
            props: { open: true, paletteSlug: "p-1", currentTags },
            global: { provide: { [BROWSE_PORT_KEY as symbol]: port as BrowsePort } },
            attachTo: document.body,
        });
        mounted.push(w);
        return { w, saveTags };
    }

    it("reflects the prop-driven initial state", async () => {
        mountPopover(["warm"]);
        await flushPromises();
        expect(chipFor("warm").getAttribute("aria-pressed")).toBe("true");
        expect(chipFor("cool").getAttribute("aria-pressed")).toBe("false");
    });

    it("ticking a tag emits one update:tags and makes one saveTags call with it added", async () => {
        const { w, saveTags } = mountPopover(["warm"]);
        await flushPromises();
        chipFor("cool").click();
        await flushPromises();
        expect(w.emitted("update:tags")).toEqual([[["warm", "cool"]]]);
        expect(saveTags).toHaveBeenCalledTimes(1);
        expect(saveTags).toHaveBeenCalledWith("p-1", ["warm", "cool"], undefined);
    });

    it("unticking a tag makes one saveTags call with it removed", async () => {
        const { w, saveTags } = mountPopover(["warm", "cool"]);
        await flushPromises();
        chipFor("warm").click();
        await flushPromises();
        expect(w.emitted("update:tags")).toEqual([[["cool"]]]);
        expect(saveTags).toHaveBeenCalledTimes(1);
        expect(saveTags).toHaveBeenCalledWith("p-1", ["cool"], undefined);
    });
});
