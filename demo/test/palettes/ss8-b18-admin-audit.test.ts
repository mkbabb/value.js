// SS-8 · B18-admin-panels — the AdminAuditPanel rows, over the REAL composition
// root (`providePalettePorts`) under the REAL `AdminPane`; `fetch` is stubbed at
// the platform boundary, nothing else is mocked.
//   SS8-0514 (Skeleton-vs-row, the gap limb) — the loading shadows stand at the
//            rows' own rhythm (the panel's gap), not a tighter private one.
//   SS8-0509 (AAP-1) · 0510 (AAP-9) · 0513 (AAP-19) · 0515 (Mobile) — already
//            cured at HEAD; these pins hold the cures (each RED under its mutant).
// Packet: docs/tranches/X/execution/SS8/packets/B18-admin-panels.md
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, provide, ref } from "vue";

import AdminPane from "../../palettes/admin/AdminPane.vue";
import { providePalettePorts } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";
import type { ViewId } from "../../shell/useViewManager";

const ENTRY = {
    id: "a1",
    action: "tag.create",
    target: "x".repeat(6144),
    timestamp: "2026-10-19T12:00:00.000Z",
    actorSlug: "admin",
};
let release: () => void;
const mounted: VueWrapper[] = [];

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

beforeEach(() => {
    let open!: () => void;
    const gate = new Promise<void>((r) => (open = r));
    release = open;
    vi.stubGlobal(
        "fetch",
        vi.fn(async (input: unknown) => {
            const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
            if (url.includes("/admin/audit")) {
                await gate;
                return json({ data: [ENTRY], total: 1, limit: 50, offset: 0 });
            }
            return json({ data: [], total: 0, limit: 50, offset: 0 });
        }),
    );
    vi.stubGlobal("matchMedia", (media: string) => ({
        matches: media.includes("prefers-reduced-motion: reduce"),
        media,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }));
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
    Element.prototype.scrollIntoView = () => {};
    useAdminAuth().login("t");
});
afterEach(() => {
    release();
    useAdminAuth().logout();
    vi.unstubAllGlobals();
    delete (Element.prototype as Partial<Element>).scrollIntoView;
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

function mountAudit() {
    const Host = defineComponent({
        setup() {
            provide(SAFE_ACCENT_KEY, computed(() => "#335"));
            provide(CSS_COLOR_KEY, computed(() => "#335"));
            providePalettePorts({
                currentView: computed<ViewId>(() => "admin-audit"),
                switchView: () => {},
                savedColorStrings: ref<string[]>([]),
                emitApply: () => {},
                emitAddColor: () => {},
                emitStartEdit: () => {},
                emitSetCurrentColor: () => {},
            });
            return () => h(AdminPane, { subView: "admin-audit" });
        },
    });
    mounted.push(mount(Host, { attachTo: document.body }));
}

/** The element's Tailwind gap rung (`gap-N`), the spacing it lays its children at. */
const gapOf = (el: Element | null) => [...(el?.classList ?? [])].find((c) => /^gap-\d/.test(c));
const refresh = () => document.body.querySelector<HTMLButtonElement>("button[aria-label='Refresh audit log']")!;

describe("SS8-0514 · the loading shadows stand at the rows' rhythm", () => {
    it("the skeleton stack spaces its shadows at the panel's row gap", async () => {
        mountAudit();
        await flushPromises();
        const region = document.body.querySelector("[role='status'][aria-label='Loading audit log']");
        expect(region, "first load paints the skeleton region").not.toBeNull();
        expect(region!.querySelectorAll("[data-slot='admin-list-skeleton']").length).toBe(3);
        // The rows are direct children of the panel root (its gap is their gap).
        expect(gapOf(region)).toBe(gapOf(region!.parentElement));
    });
});

describe("SS8-0509/0510/0513/0515 · the already-landed audit cures hold", () => {
    async function populated() {
        mountAudit();
        await flushPromises();
        release();
        await flushPromises();
        const row = [...document.body.querySelectorAll("div")].find((d) =>
            d.querySelector(":scope > div > span.truncate")?.textContent?.includes("xxxx"),
        );
        expect(row, "the 6 KB-target row renders").toBeTruthy();
        return row!;
    }

    it("0509 (UIA-V-52): the 6 KB-target row zeroes its own min-width, so the target truncates in the track", async () => {
        const row = await populated();
        expect(row.classList.contains("min-w-0")).toBe(true);
        expect(row.querySelector(":scope > div")!.classList.contains("min-w-0")).toBe(true);
    });

    it("0510/0515 (V16-05): count + Refresh are one non-wrapping ms-auto cluster, with no flex-1 spacer peer", async () => {
        await populated();
        const cluster = refresh().parentElement!;
        expect(cluster.classList.contains("ms-auto")).toBe(true);
        expect(cluster.classList.contains("shrink-0")).toBe(true);
        expect(cluster.textContent).toContain("1 entry");
        const toolbar = cluster.parentElement!;
        const spacers = [...toolbar.children].filter((c) => c.classList.contains("flex-1") && !c.querySelector("input"));
        expect(spacers).toEqual([]);
    });

    it("0513 (AAP-19): Refresh is the xs icon-only seat (28x28 fine / 44x44 coarse), never a wide capsule", async () => {
        await populated();
        const b = refresh();
        expect(b.dataset.size).toBe("xs");
        expect(b.dataset.iconOnly).toBe("true");
        expect(b.textContent?.trim()).toBe("");
    });
});
