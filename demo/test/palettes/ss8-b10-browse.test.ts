// SERVED MODEL: claude-opus-5-5
//
// SS-8 · B10-browse CURE (EXECUTION-RUNBOOK §4.1; packet
// docs/tranches/X/execution/SS8/packets/B10-browse.md §cures).
//
// One falsifier per REFUTED row the batch could cure or pin in jsdom. The live
// readings (pixels, geometry) are the packet's; these assert the STRUCTURE each
// reading followed from, by mounting the real SFCs against the real glass-ui.
//   0291 PaginationBar  — one page turn per load (the double-activation window)
//   0285 BrowsePane U9  — the strip is a colour surface (forced-colors limb)
//   0288 BrowsePane U12 — the vote button carries a type rung of its own
//   0277 BrowsePane U1  — the filter trigger is the glass sm square, unsized
//   0282 BrowsePane U6  — the error plate is ONE element root
//   0289 BrowsePane U13 — the search barrel does not carry the admin sort menu
//   0294 PaginationBar  — no inert `variant` attribute reaches the DOM
//   0302/0303/0304 R-5/6/7 — Sort is one toggle row; tags are wrapping chips
//   0306 R-9 — the active-filter badge rides the accessible name
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PaginationBar from "../../palettes/admin/panels/PaginationBar.vue";
import SearchFilterBar from "../../palettes/browser/search/SearchFilterBar.vue";
import * as searchBarrel from "../../palettes/browser/search/index";
import PaletteCardMeta from "../../palettes/inspector/PaletteCardMeta.vue";
import type { Tag } from "../../palettes/types";
import { usePager } from "../../palettes/usePager";
import EmptyState from "../../shared/ui/EmptyState.vue";
import PaletteColorStrip from "../../shared/ui/PaletteColorStrip.vue";
import { fixtureColors, fixturePalette } from "./n-fixtures/fixtures";

const mounted: VueWrapper[] = [];
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

/** A reload that stays in flight until the test settles it. */
function deferredReload() {
    const settles: Array<() => void> = [];
    const reload = vi.fn(
        () =>
            new Promise<void>((resolve) => {
                settles.push(resolve);
            }),
    );
    return { reload, settleAll: () => settles.splice(0).forEach((s) => s()) };
}

describe("SS8-0291 · the pager turns one page per load", () => {
    it("two synchronous next() calls during one load request ONE page", async () => {
        const { reload, settleAll } = deferredReload();
        const pager = usePager(20, reload);
        pager.total = 45;
        pager.next();
        pager.next();
        expect(reload).toHaveBeenCalledTimes(1);
        expect(pager.page).toBe(2);
        settleAll();
        await flushPromises();
        pager.next();
        expect(reload).toHaveBeenCalledTimes(2);
        expect(pager.page).toBe(3);
    });

    it("prev() is gated the same way, and a failed load releases the gate", async () => {
        let fail = true;
        const reload = vi.fn(() => (fail ? Promise.reject(new Error("down")) : Promise.resolve()));
        const pager = usePager(20, reload);
        pager.total = 45;
        pager.page = 3;
        const unhandled = vi.fn();
        process.on("unhandledRejection", unhandled);
        try {
            pager.prev();
            pager.prev();
            expect(reload).toHaveBeenCalledTimes(1);
            expect(pager.page).toBe(2);
            await flushPromises();
            fail = false;
            pager.prev();
            expect(reload).toHaveBeenCalledTimes(2);
            expect(pager.page).toBe(1);
        } finally {
            await flushPromises();
            process.off("unhandledRejection", unhandled);
        }
    });

    it("mounted: two clicks on Next inside one load turn one page", async () => {
        const { reload, settleAll } = deferredReload();
        const pager = usePager(20, reload);
        pager.total = 45;
        const w = mount(PaginationBar, { props: { pager }, attachTo: document.body });
        mounted.push(w);
        const next = w.get("button[aria-label='Next page']");
        await next.trigger("click");
        await next.trigger("click");
        expect(reload).toHaveBeenCalledTimes(1);
        expect(w.text()).toContain("Page 2 of 3");
        settleAll();
        await flushPromises();
    });
});

describe("SS8-0294 · PaginationBar ships no inert variant attribute", () => {
    it("neither button carries a `variant` attribute", () => {
        const pager = usePager(20, () => undefined);
        pager.total = 45;
        const w = mount(PaginationBar, { props: { pager }, attachTo: document.body });
        mounted.push(w);
        const buttons = w.findAll("button");
        expect(buttons).toHaveLength(2);
        for (const b of buttons) expect(b.attributes("variant")).toBeUndefined();
    });
});

describe("SS8-0285 · the colour strip is a colour surface", () => {
    it("the strip root carries [data-color-surface] (forced-color-adjust: none, print exact)", () => {
        const w = mount(PaletteColorStrip, { props: { colors: fixtureColors(5) } });
        mounted.push(w);
        expect(w.element.hasAttribute("data-color-strip")).toBe(true);
        expect(w.element.hasAttribute("data-color-surface")).toBe(true);
    });

    it("the summary (≥100 colours) strip is a colour surface too", () => {
        const w = mount(PaletteColorStrip, { props: { colors: fixtureColors(120) } });
        mounted.push(w);
        expect(w.element.hasAttribute("data-summary")).toBe(true);
        expect(w.element.hasAttribute("data-color-surface")).toBe(true);
    });
});

describe("SS8-0288 · the vote button speaks a type rung of its own", () => {
    it("the vote button itself carries the canon's text-mono-small rung", () => {
        const w = mount(PaletteCardMeta, { props: { palette: fixturePalette({ voteCount: 42 }) } });
        mounted.push(w);
        const vote = w.get("button[aria-label$='votes, click to vote']");
        expect(vote.classes()).toContain("text-mono-small");
    });
});

describe("SS8-0282 · the error plate is one element root", () => {
    it("variant=error mounts a single element (no fragment anchor)", () => {
        const w = mount(EmptyState, { props: { variant: "error", message: "down", detail: "fetch failed" } });
        mounted.push(w);
        expect(w.element.nodeType).toBe(Node.ELEMENT_NODE);
        expect((w.element as HTMLElement).getAttribute("role")).toBe("alert");
    });
});

describe("SS8-0289 · the search barrel carries no admin module", () => {
    it("the barrel's names are the browse cluster only", () => {
        expect(Object.keys(searchBarrel).sort()).toEqual(["SearchFilterBar", "TagEditPopover"]);
    });
});

const TAGS: Tag[] = Array.from({ length: 10 }, (_, i) => ({
    id: `t${i}`,
    name: i === 9 ? "ocean-inspired palettes" : `tag-${i}`,
    category: "mood",
}));

describe("SS8-0277 / 0302 / 0303 / 0304 / 0306 · the filters trigger and menu", () => {
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

    async function openBar(selectedTags: string[] = []) {
        const w = mount(SearchFilterBar, {
            props: { sort: "newest", tier: "", selectedTags, availableTags: TAGS },
            attachTo: document.body,
        });
        mounted.push(w);
        await w.get("[aria-label^=Filters]").trigger("click");
        await flushPromises();
        return w;
    }

    it("0277: the trigger is the glass sm square — no consumer size, shape or radius", async () => {
        const w = await openBar();
        const trigger = w.get("[aria-label^=Filters]");
        const own = trigger.classes().filter((c) => /^(h|w|min-h|min-w|size|rounded|aspect)-/.test(c));
        expect(own).toEqual([]);
        expect(trigger.attributes("data-size") ?? "sm").toBe("sm");
    });

    it("0306: an active filter rides the trigger's accessible name", async () => {
        const w = await openBar(["tag-1"]);
        expect(w.get("[aria-label^=Filters]").attributes("aria-label")).toBe("Filters, 1 active");
    });

    it("0302/0304: Sort is one horizontal toggle row of three — no radio column", async () => {
        await openBar();
        const section = document.body.querySelector<HTMLElement>("section[aria-labelledby=browse-filter-sort]")!;
        const rows = section.querySelectorAll<HTMLElement>("[data-slot=toggle-group]");
        expect(rows).toHaveLength(1);
        expect(rows[0]!.dataset.orientation).toBe("horizontal");
        const items = [...rows[0]!.children].map((b) => [b.tagName, b.textContent?.trim()]);
        expect(items).toEqual([
            ["BUTTON", "Newest"],
            ["BUTTON", "Popular"],
            ["BUTTON", "Most forked"],
        ]);
        expect(section.querySelectorAll("input, label[for], [data-slot=radio-group]")).toHaveLength(0);
    });

    it("0303: tags are wrapping selectable chips — no checkboxes, no nested scroller", async () => {
        await openBar();
        const chips = [...document.body.querySelectorAll<HTMLElement>("button[data-mode=selectable]")].map(
            (b) => b.textContent?.trim(),
        );
        for (const t of TAGS) expect(chips).toContain(t.name);
        expect(document.body.querySelectorAll("[role=checkbox], input[type=checkbox]")).toHaveLength(0);
        const panel = document.body.querySelector(".filter-panel")!;
        const scrollers = [...panel.querySelectorAll<HTMLElement>("*")].filter((el) =>
            [...el.classList].some((c) => /^(overflow(-[xy])?-(auto|scroll)|max-h-)/.test(c)),
        );
        expect(scrollers).toEqual([]);
    });
});
