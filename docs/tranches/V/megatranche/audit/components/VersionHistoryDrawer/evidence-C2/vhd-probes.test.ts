/**
 * CHALLENGE-C executable probes against the REAL SFC.
 * No repo file is written; the SFC is imported by absolute path.
 */
import { describe, it, expect, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";

// --- the injected port: only `versions.fetchVersions` is consumed -----------
const BROWSE_PORT_KEY = Symbol("browse-port");
vi.mock("/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts", () => ({
    BROWSE_PORT_KEY,
}));

const VersionHistoryDrawer = (
    await import(
        "/Users/mkbabb/Programming/value.js/demo/palettes/browser/dialog/VersionHistoryDrawer.vue"
    )
).default;

const passthrough = (name: string) =>
    defineComponent({
        name,
        inheritAttrs: false,
        setup: (_p, { slots, attrs }) => () =>
            h("div", { "data-stub": name, class: attrs.class as string }, slots.default?.()),
    });

const STUBS = {
    Dialog: passthrough("Dialog"),
    DialogContent: passthrough("DialogContent"),
    DialogHeader: passthrough("DialogHeader"),
    DialogTitle: passthrough("DialogTitle"),
    DialogDescription: passthrough("DialogDescription"),
    Button: defineComponent({
        name: "Button",
        inheritAttrs: false,
        setup: (_p, { slots, attrs }) => () => h("button", { ...attrs }, slots.default?.()),
    }),
    Loader2: passthrough("Loader2"),
    RotateCcw: passthrough("RotateCcw"),
};

function version(hash: string, name = "n", createdAt = "2026-07-01T12:00:00.000Z") {
    return {
        hash,
        name,
        colors: [{ css: "#e11d48", position: 0 }],
        parentHash: null,
        forkedFromHash: null,
        authorSlug: "gallery",
        paletteSlug: "p",
        createdAt,
        rootHash: hash,
        depth: 0,
    };
}

/** The BrowsePane host, verbatim in shape: BrowsePane.vue:157-164 + 269-275. */
const Host = defineComponent({
    setup() {
        const versionDrawerOpen = ref(false);
        const versionPalette = ref<{
            slug: string;
            name: string;
            currentHash: string | null;
        } | null>(null);
        function onVersions(p: { slug: string; name: string; currentHash: string | null }) {
            versionPalette.value = p; // BrowsePane.vue:273
            versionDrawerOpen.value = true; // BrowsePane.vue:274
        }
        return { versionDrawerOpen, versionPalette, onVersions };
    },
    render() {
        return this.versionPalette
            ? h(VersionHistoryDrawer, {
                  open: this.versionDrawerOpen,
                  paletteSlug: this.versionPalette.slug,
                  paletteName: this.versionPalette.name,
                  currentHash: this.versionPalette.currentHash,
                  "onUpdate:open": (v: boolean) => (this.versionDrawerOpen = v),
                  onRevert: () => {},
              })
            : h("div", "closed");
    },
});

function mountHost(fetchVersions: unknown, attachToDocument = false) {
    return mount(Host, {
        attachTo: attachToDocument ? document.body : undefined,
        global: {
            stubs: STUBS,
            provide: {
                [BROWSE_PORT_KEY as unknown as string]: { versions: { fetchVersions } },
            },
        },
    });
}

const tick = async (ms = 10) => {
    await nextTick();
    await new Promise((r) => setTimeout(r, ms));
    await nextTick();
};

/** open → close → open, the sequence a user must perform to see any data. */
async function openTwice(
    w: ReturnType<typeof mountHost>,
    p: { slug: string; name: string; currentHash: string | null },
) {
    w.vm.onVersions(p);
    await tick();
    w.vm.versionDrawerOpen = false;
    await tick(0);
    w.vm.onVersions(p);
    await tick();
}

describe("C-1 — first open of the drawer never fetches", () => {
    it("mounts already-open, so the watcher edge never happens", async () => {
        const fetchVersions = vi.fn(async () => ({
            data: [version("aaa"), version("bbb")],
            total: 2,
        }));
        const w = mountHost(fetchVersions);

        w.vm.onVersions({ slug: "p", name: "Census Palette", currentHash: "aaa" });
        await tick();

        const firstOpenCalls = fetchVersions.mock.calls.length;
        const firstOpenRows = w.findAll(".group").length;
        const firstOpenDesc = w.find("[data-stub='DialogDescription']").text();

        w.vm.versionDrawerOpen = false;
        await tick(0);
        w.vm.onVersions({ slug: "p", name: "Census Palette", currentHash: "aaa" });
        await tick();

        const secondOpenCalls = fetchVersions.mock.calls.length;
        const secondOpenRows = w.findAll(".group").length;
        const secondOpenDesc = w.find("[data-stub='DialogDescription']").text();

        console.log(
            "C-1 " +
                JSON.stringify({
                    firstOpenCalls,
                    firstOpenRows,
                    firstOpenDesc,
                    secondOpenCalls,
                    secondOpenRows,
                    secondOpenDesc,
                }),
        );

        expect(firstOpenCalls).toBe(0); // ← the defect
        expect(firstOpenRows).toBe(0);
        expect(secondOpenCalls).toBe(1);
        expect(secondOpenRows).toBe(2);
    });
});

describe("C-2 — cross-palette stale-response race", () => {
    it("a slow response for palette A lands into the drawer showing palette B", async () => {
        const resolvers: Record<string, (v: unknown) => void> = {};
        const fetchVersions = vi.fn(
            (slug: string) =>
                new Promise((res) => {
                    resolvers[slug] = res as (v: unknown) => void;
                }),
        );
        const w = mountHost(fetchVersions);

        // open A (no fetch — C-1), close, open A again → fetch A in flight
        await openTwice(w, { slug: "A", name: "Alpha", currentHash: null });
        // close and open B before A's response lands
        w.vm.versionDrawerOpen = false;
        await tick(0);
        w.vm.onVersions({ slug: "B", name: "Bravo", currentHash: null });
        await tick(0);

        expect(Object.keys(resolvers).sort()).toEqual(["A", "B"]);

        // B answers first, then the stale A answers
        resolvers["B"]({ data: [version("b1", "B-v1")], total: 1 });
        await tick(5);
        resolvers["A"]({ data: [version("a1", "A-v1"), version("a2", "A-v2")], total: 2 });
        await tick(5);

        const desc = w.find("[data-stub='DialogDescription']").text();
        const body = w.find("[data-stub='DialogContent']").text();
        console.log("C-2 " + JSON.stringify({ desc, body }));

        expect(desc).toContain("Bravo"); // header says B
        expect(body).toContain("A-v1"); // body shows A's versions
        expect(body).toContain("A-v2");
    });
});

describe("C-3 — the Revert control is opacity:0 and still in the tab order", () => {
    it("renders a focusable button with opacity-0 and no focus escape hatch", async () => {
        const fetchVersions = vi.fn(async () => ({
            data: [version("aaa", "one"), version("bbb", "two")],
            total: 2,
        }));
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: "aaa" });

        const cls = w.findAll("button").map((b) => b.attributes("class") ?? "");
        console.log("C-3 " + JSON.stringify({ buttons: cls.length, cls }));
        const revert = cls.find((c) => c.includes("group-hover:opacity-100"));
        expect(revert).toBeDefined();
        expect(revert).toContain("opacity-0");
        expect(revert).not.toContain("focus"); // no focus-visible / group-focus-within escape
        // and it is a real, tabbable button: no tabindex="-1", no disabled
        const revertBtn = w.findAll("button").find((b) => (b.attributes("class") ?? "").includes("group-hover:opacity-100"))!;
        expect(revertBtn.attributes("tabindex")).toBeUndefined();
        expect(revertBtn.attributes("disabled")).toBeUndefined();
        expect(revertBtn.attributes("aria-hidden")).toBeUndefined();
    });
});

describe("C-4 — error path is silent", () => {
    it("a failed fetch (undefined page) leaves an empty body, no error, no retry", async () => {
        const fetchVersions = vi.fn(async () => undefined);
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });

        const text = w.find("[data-stub='DialogContent']").text();
        console.log("C-4 " + JSON.stringify({ text }));
        expect(text).not.toMatch(/error|fail|retry|try again|unavailable/i);
        expect(text).toContain("0 versions");
        expect(w.findAll("[role='alert'],[aria-live],[role='status']").length).toBe(0);
    });
});

describe("C-5 — formatTime never throws, so its catch is dead", () => {
    it("malformed ISO renders 'Invalid Date' in the row", async () => {
        const fetchVersions = vi.fn(async () => ({
            data: [version("aaa", "one", "not-a-date")],
            total: 1,
        }));
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });
        const text = w.find("[data-stub='DialogContent']").text();
        console.log("C-5 " + JSON.stringify({ text }));
        expect(text).toContain("Invalid Date");
    });
});

describe("C-6 — version numbering goes non-positive when total lags the list", () => {
    it("a page whose total is smaller than the rows renders v0 / v-1", async () => {
        const fetchVersions = vi.fn(async () => ({
            data: [version("a"), version("b"), version("c")],
            total: 1,
        }));
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });
        const text = w.find("[data-stub='DialogContent']").text();
        console.log("C-6 " + JSON.stringify({ text }));
        expect(text).toContain("v0");
        expect(text).toContain("v-1");
    });
});

describe("C-7 — load-more spinner + no in-flight guard on the watcher", () => {
    it("reopening while a page is in flight double-fetches and drops the spinner early", async () => {
        const resolvers: ((v: unknown) => void)[] = [];
        const fetchVersions = vi.fn(
            () => new Promise((res) => resolvers.push(res as (v: unknown) => void)),
        );
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });
        // one request in flight
        w.vm.versionDrawerOpen = false;
        await tick(0);
        w.vm.onVersions({ slug: "p", name: "P", currentHash: null });
        await tick(0);
        expect(resolvers.length).toBe(2); // two concurrent GETs for one drawer

        // the first (stale) answers → `finally` clears `loading` while #2 is live
        resolvers[0]({ data: [version("x")], total: 1 });
        await tick(5);
        const spinnerGone = w.findAll("[data-stub='Loader2']").length === 0;
        console.log("C-7 " + JSON.stringify({ requests: resolvers.length, spinnerGone }));
        expect(spinnerGone).toBe(true); // spinner off while a request is still open
    });
});

describe("C-8 — offset pagination + a concurrent insert ⇒ a row shown twice, a row lost", () => {
    it("renders the same hash twice and then skips past the unseen one", async () => {
        // page 1 = the newest 3 (offset 0). A new version lands server-side, so
        // the descending window shifts and offset 3 re-serves a row page 1 had.
        const page1 = { data: [version("h5"), version("h4"), version("h3")], total: 6 };
        const page2 = { data: [version("h3"), version("h2"), version("h1")], total: 7 };
        let n = 0;
        const fetchVersions = vi.fn(async () => (n++ === 0 ? page1 : page2));
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });
        expect(w.findAll(".group").length).toBe(3);

        await w.findAll("button").at(-1)!.trigger("click"); // "Load older versions"
        await tick();

        const rows = w.findAll(".group").length;
        const offsets = fetchVersions.mock.calls.map((c) => c[2]);
        const text = w.find("[data-stub='DialogContent']").text();
        const vLabels = (text.match(/v-?\d+/g) ?? []).join(",");
        console.log("C-8 " + JSON.stringify({ rows, offsets, vLabels }));

        expect(rows).toBe(6);          // 6 rows for 5 distinct versions
        expect(offsets).toEqual([0, 3]);
        // the duplicated row makes the version numbering repeat a label
        expect(vLabels).toBe("v7,v6,v5,v4,v3,v2");
        // and the NEXT page would be requested at offset 6 though only 5 rows
        // are actually distinct — the 6th distinct version is never reachable.
        expect(w.findAll(".group").length).toBeGreaterThan(
            new Set(page1.data.concat(page2.data).map((v) => v.hash)).size,
        );
    });
});

describe("C-9 — the Load-more button unmounts under the focus it holds", () => {
    it("focus falls to <body> when the last page retires the button", async () => {
        const page1 = { data: [version("h3"), version("h2")], total: 3 };
        const page2 = { data: [version("h1")], total: 3 };
        let n = 0;
        const fetchVersions = vi.fn(async () => (n++ === 0 ? page1 : page2));
        const w = mountHost(fetchVersions, true);
        await openTwice(w, { slug: "p", name: "P", currentHash: null });

        const more = w.findAll("button").at(-1)!;
        (more.element as HTMLButtonElement).focus();
        const focusedBefore = document.activeElement === more.element;
        await more.trigger("click");
        await tick();

        const stillThere = w
            .findAll("button")
            .some((b) => b.text().includes("Load older versions"));
        console.log(
            "C-9 " +
                JSON.stringify({
                    focusedBefore,
                    stillThere,
                    activeAfter: document.activeElement?.tagName,
                }),
        );
        expect(focusedBefore).toBe(true);
        expect(stillThere).toBe(false); // the button that held focus is gone
        expect(document.activeElement?.tagName).toBe("BODY"); // focus lost
    });
});

describe("C-10 — a11y surface census of a loaded drawer", () => {
    it("dumps the rendered DOM and counts the semantics that are absent", async () => {
        const fetchVersions = vi.fn(async () => ({
            data: [
                { ...version("aaa", "Sunset"), forkedFromHash: "0123456789abcdef" },
                version("bbb", "Sunset v2"),
                version("ccc", "Sunset v3"),
            ],
            total: 3,
        }));
        const w = mountHost(fetchVersions);
        await openTwice(w, { slug: "p", name: "Sunset", currentHash: "aaa" });
        const html = w.find("[data-stub='DialogContent']").html();
        console.log("C-10-HTML\n" + html);
        const census = {
            liveRegions: w.findAll("[aria-live],[role='status'],[role='alert']").length,
            lists: w.findAll("[role='list'],ul,ol").length,
            listitems: w.findAll("[role='listitem'],li").length,
            headings: w.findAll("h1,h2,h3,h4,h5,h6,[role='heading']").length,
            ariaBusy: w.findAll("[aria-busy]").length,
            buttonNames: w.findAll("button").map((b) => b.text().trim()),
            swatchDivsWithoutName: w.findAll(".rounded-full").length,
            ariaHiddenIcons: w.findAll("[aria-hidden]").length,
        };
        console.log("C-10 " + JSON.stringify(census));
        expect(census.liveRegions).toBe(0);
        expect(census.lists).toBe(0);
        expect(census.headings).toBe(0);
        expect(new Set(census.buttonNames).size).toBe(1); // every button is "Revert"
    });
});
