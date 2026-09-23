// X.W7.e — DELIBERATE DISMISSAL AT DESTRUCTIVE SEATS, over the REAL composition
// root (`providePalettePorts`) under the REAL `AdminPane` — the unit half of
// G14 · G15 · N-6 (the browser half is `e2e/smoke/oracles/w7-destructive-seats.spec.ts`).
//   G14 — activating a destructive seat issues NO mutation request; only the
//         confirm's acceptance does.
//   N-6 — a double activation of the confirm issues EXACTLY ONE request.
//   G15 — the delete-all control states the destruction in its visible AND
//         accessible names; S-15 — N "Dismiss" buttons are distinguishable, and
//         the two irreversible user acts no longer share one glyph.
// `fetch` is stubbed at the platform boundary — no composable, panel or port is mocked.
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, provide, ref } from "vue";

import AdminPane from "../../palettes/admin/AdminPane.vue";
import { providePalettePorts, type PalettePorts } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useAdminAuth } from "../../platform/auth/useAdminAuth";
import type { ViewId } from "../../shell/useViewManager";

type AdminView = "admin-users" | "admin-names" | "admin-flagged" | "admin-tags";

const NOW = "2026-09-23T00:00:00.000Z";
const ROSTER = [{ slug: "azure-fox-01", createdAt: NOW, paletteCount: 2 }];
const USER_PALETTES = [
    { slug: "azure-one-11aa", name: "Azure One", colors: [{ css: "red", position: 0 }], tier: "standard" },
];
const QUEUE = [
    { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "a", createdAt: NOW },
];
const TAGS = [{ id: "t1", name: "moody", category: "mood", createdAt: NOW }];
const flaggedItem = (slug: string, name: string) => ({
    paletteSlug: slug,
    palette: { slug, name, colors: [{ css: "red", position: 0 }], userSlug: "someone" },
    flagCount: 1,
    flags: [{ reason: "spam", createdAt: NOW }],
});
const FLAGGED = [flaggedItem("sunset-riot-9a3f", "Sunset Riot"), flaggedItem("shady-spam-1b2c", "Shady Spam")];

const mounted: VueWrapper[] = [];
let fetchMock: ReturnType<typeof vi.fn>;
/** Every mutation request the panels issue: method + path. */
let mutations: string[];

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}
const page = (data: unknown[]) => json({ data, total: data.length, limit: 50, offset: 0 });

beforeEach(() => {
    mutations = [];
    fetchMock = vi.fn(async (input: unknown, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
        const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
        if (method !== "GET") {
            mutations.push(`${method} ${new URL(url, "http://x").pathname}`);
            if (url.includes("/users/") && url.endsWith("/palettes")) return json({ deleted: 2 });
            if (method === "DELETE" && url.includes("/palettes/")) return json({ deleted: true });
            return json({});
        }
        if (url.includes("/admin/users/azure-fox-01/palettes")) return json(USER_PALETTES);
        if (url.includes("/admin/users")) return page(ROSTER);
        if (url.includes("/admin/tags")) return json(TAGS);
        if (url.includes("/admin/flagged")) return page(FLAGGED);
        if (url.includes("/admin/queue") || url.includes("/admin/colors/approved")) return page(QUEUE);
        return page([]);
    });
    vi.stubGlobal("fetch", fetchMock);
    // jsdom ships no `matchMedia`; the suite runs as a reduced-motion user, so
    // the producer's tab press (`SegmentedTabs`) takes its PRM exit.
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
    // jsdom ships no `ResizeObserver` either (the tab strip measures its indicator).
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
    useAdminAuth().login("t");
});
afterEach(() => {
    useAdminAuth().logout();
    vi.unstubAllGlobals();
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

function mountAdmin(subView: AdminView) {
    let ports!: PalettePorts;
    const view = ref<ViewId>(subView);
    const Host = defineComponent({
        setup() {
            provide(SAFE_ACCENT_KEY, computed(() => "#335"));
            provide(CSS_COLOR_KEY, computed(() => "#335"));
            ports = providePalettePorts({
                currentView: computed(() => view.value),
                switchView: (id) => {
                    view.value = id;
                },
                savedColorStrings: ref<string[]>([]),
                emitApply: () => {},
                emitAddColor: () => {},
                emitStartEdit: () => {},
                emitSetCurrentColor: () => {},
            });
            return () => h(AdminPane, { subView });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push(wrapper);
    return { wrapper, ports };
}

async function loadRoster(ports: PalettePorts) {
    await ports.admin.loadAdminUsers();
    await flushPromises();
}

const byName = (name: string) =>
    [...document.body.querySelectorAll<HTMLButtonElement>("button")].find(
        (b) => (b.getAttribute("aria-label") ?? b.textContent?.trim()) === name,
    );

/** Accept the open confirm TWICE, synchronously — the double activation N-6 names. */
async function acceptTwice(label: string) {
    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog, "a confirm is open").not.toBeNull();
    const accept = [...dialog!.querySelectorAll<HTMLButtonElement>("button")].find(
        (b) => b.textContent?.trim() === label,
    );
    expect(accept, `confirm button "${label}"`).toBeDefined();
    accept!.click();
    accept!.click();
    await flushPromises();
}

interface Seat {
    seat: string;
    view: AdminView;
    /** Brings the seat on screen (a tab, a disclosure). */
    reach?: (ports: PalettePorts) => Promise<void>;
    trigger: string;
    accept: string;
    request: RegExp;
}

const SEATS: Seat[] = [
    {
        seat: "color-name delete (AdminNamesPanel)",
        view: "admin-names",
        reach: async (ports) => {
            await ports.admin.loadApprovedColors();
            await flushPromises();
            [...document.body.querySelectorAll<HTMLElement>("button, [role=tab], [role=radio]")]
                .find((el) => el.textContent?.trim().startsWith("Approved"))!
                .click();
            // The Pending | Approved swap is a real `vj-morph` out-in transition
            // (the harness never stubs it): let its frames settle.
            await new Promise((resolve) => setTimeout(resolve, 100));
            await flushPromises();
        },
        trigger: "Delete color name Wax Seal",
        accept: "Delete name",
        request: /^DELETE .*\/admin\/colors\/c1$/,
    },
    {
        seat: "color-name reject (AdminNamesPanel, W7.93)",
        view: "admin-names",
        reach: async (ports) => {
            await ports.admin.loadColorQueue();
            await flushPromises();
        },
        trigger: "Reject color name Wax Seal",
        accept: "Reject name",
        request: /^POST .*\/admin\/colors\/c1\/reject$/,
    },
    {
        seat: "tag delete (AdminTagsPanel)",
        view: "admin-tags",
        trigger: "Delete tag moody",
        accept: "Delete tag",
        request: /^DELETE .*\/admin\/tags\/moody$/,
    },
    {
        seat: "flagged-palette delete (AdminFlaggedPanel)",
        view: "admin-flagged",
        trigger: "Delete palette Sunset Riot",
        accept: "Delete palette",
        request: /^DELETE .*\/admin\/palettes\/sunset-riot-9a3f$/,
    },
    {
        seat: "delete-all-palettes (AdminUsersPanel)",
        view: "admin-users",
        reach: loadRoster,
        trigger: "Delete all palettes of azure-fox-01",
        accept: "Delete all palettes",
        request: /^DELETE .*\/admin\/users\/azure-fox-01\/palettes$/,
    },
    {
        seat: "user-disclosure palette delete (AdminUsersPanel)",
        view: "admin-users",
        reach: async (ports) => {
            await loadRoster(ports);
            await ports.admin.toggleUserExpand("azure-fox-01");
            await flushPromises();
        },
        trigger: "Delete palette Azure One",
        accept: "Delete palette",
        request: /^DELETE .*\/admin\/palettes\/azure-one-11aa$/,
    },
    {
        seat: "delete user (AdminUsersPanel)",
        view: "admin-users",
        reach: loadRoster,
        trigger: "Delete user azure-fox-01",
        accept: "Delete user",
        request: /^DELETE .*\/admin\/users\/azure-fox-01$/,
    },
];

describe("G14 · N-6 — a destructive seat fires nothing until accepted, then exactly once", () => {
    for (const s of SEATS) {
        it(s.seat, async () => {
            const { ports } = mountAdmin(s.view);
            await flushPromises();
            await s.reach?.(ports);

            const trigger = byName(s.trigger);
            expect(trigger, `seat "${s.trigger}"`).toBeDefined();
            trigger!.click();
            trigger!.click(); // a double activation of the seat opens one confirm, fires nothing
            await flushPromises();
            expect(mutations, "requests before acceptance").toEqual([]);

            await acceptTwice(s.accept);
            expect(mutations, "requests after a double acceptance").toHaveLength(1);
            expect(mutations[0]).toMatch(s.request);
        });
    }

    it("a dismissed confirm releases its act — Cancel then nothing can fire it", async () => {
        mountAdmin("admin-tags");
        await flushPromises();
        byName("Delete tag moody")!.click();
        await flushPromises();
        const dialog = document.body.querySelector('[role="dialog"]')!;
        const [cancel, accept] = ["Cancel", "Delete tag"].map((label) =>
            [...dialog.querySelectorAll<HTMLButtonElement>("button")].find((b) => b.textContent?.trim() === label)!,
        );
        cancel.click();
        accept.click();
        await flushPromises();
        expect(mutations).toEqual([]);
    });
});

describe("G15 · S-15 — destructive naming", () => {
    it("delete-all states the destruction in its visible AND accessible names, before activation", async () => {
        await loadRoster(mountAdmin("admin-users").ports);
        const control = byName("Delete all palettes of azure-fox-01");
        expect(control, "accessible name").toBeDefined();
        expect(control!.textContent?.trim()).toBe("Delete all palettes");
        // label-in-name: the visible words lead the accessible name.
        expect(control!.getAttribute("aria-label")!.startsWith(control!.textContent!.trim())).toBe(true);
        expect(byName("Palettes")).toBeUndefined();
    });

    it("N Dismiss buttons each name their palette; the two irreversible user acts wear distinct glyphs", async () => {
        mountAdmin("admin-flagged");
        await flushPromises();
        const dismiss = [...document.body.querySelectorAll<HTMLButtonElement>("button")].filter(
            (b) => b.textContent?.trim() === "Dismiss",
        );
        expect(dismiss.map((b) => b.getAttribute("aria-label"))).toEqual([
            "Dismiss reports on Sunset Riot",
            "Dismiss reports on Shady Spam",
        ]);
        mounted.pop()!.unmount();

        await loadRoster(mountAdmin("admin-users").ports);
        const glyph = (name: string) => byName(name)!.querySelector("svg")!.getAttribute("class");
        expect(glyph("Delete all palettes of azure-fox-01")).not.toBe(glyph("Delete user azure-fox-01"));
    });
});
