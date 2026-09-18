/**
 * CHALLENGE-C · AdminPane — isolated SFC mounts against a hand-built ADMIN_PORT.
 *
 * READ-ONLY audit artifact. It mounts the REAL `demo/palettes/admin/AdminPane.vue`
 * with every child panel stubbed, so the only logic under test is AdminPane's own:
 * the `adminCount` badge, the header switch tables, the prop hand-off, and the
 * behaviour at the domain boundary (an out-of-union subView).
 *
 * Run:
 *   npx vitest run --config docs/tranches/V/megatranche/audit/components/AdminPane/probe-C-vitest.config.ts
 */
import { describe, it, expect } from "vitest";
import { ref, computed } from "vue";
import { mount } from "@vue/test-utils";

import AdminPane from "../../../../../../../demo/palettes/admin/AdminPane.vue";
import { ADMIN_PORT_KEY } from "../../../../../../../demo/palettes/usePalettePorts";
import { CSS_COLOR_KEY } from "../../../../../../../demo/color-session/keys";

const USERS = [
    { slug: "azure-fox-01", paletteCount: 4 },
    { slug: "crimson-owl-77", paletteCount: 1 },
    { slug: "verdant-mole-33", paletteCount: 0 },
    { slug: "empty-ghost-44", paletteCount: 0 },
];

function makePort(query = "") {
    const searchQuery = ref(query);
    const adminUsers = ref<any[]>([...USERS]);
    // Mirrors useAdminUsers.ts:29-48 (slug substring filter).
    const filteredAdminUsers = computed(() =>
        adminUsers.value.filter((u) =>
            u.slug.toLowerCase().includes(searchQuery.value.toLowerCase()),
        ),
    );
    const queue = ref<any[]>([{ id: "c1" }, { id: "c2" }]);
    const noop = () => {};
    return {
        searchQuery,
        adminUsers,
        filteredAdminUsers,
        loadingUsers: ref(false),
        usersLoadError: ref<string | null>(null),
        userSortMode: ref("newest"),
        adminUsersPanelRef: ref(null),
        expandedId: ref<string | null>(null),
        adminColorQueue: queue,
        filteredColorQueue: queue,
        filteredApproved: ref<any[]>([]),
        loadingColorQueue: ref(false),
        loadingApproved: ref(false),
        queueLoadError: ref<string | null>(null),
        approvedLoadError: ref<string | null>(null),
        approvedLoaded: ref(true),
        loadAdminUsers: noop, loadColorQueue: noop, loadApprovedColors: noop,
        onUserSortChange: noop, onDeleteUser: noop, onDeleteUserPalettes: noop,
        onAdminDeleteUserPalette: noop, onFeaturePalette: noop, onPrune: noop,
        toggleExpand: noop, onApproveColor: noop, onRejectColor: noop, onDeleteColor: noop,
        audit: {}, flagged: {}, tags: {},
    } as any;
}

const STUBS = {
    AdminUsersPanel: {
        props: ["users", "totalUsers", "loading", "loadError", "expandedId", "cssColor"],
        template: `<div class="stub-users" :data-users="users.length" :data-total="totalUsers" />`,
    },
    AdminNamesPanel: {
        name: "AdminNamesPanel",
        props: ["pendingItems", "approvedItems", "loadingPending", "loadingApproved",
                "pendingError", "approvedError", "cssColorOpaque"],
        template: `<div class="stub-names" :data-pending="pendingItems.length"
                        :data-css="String(cssColorOpaque)" />`,
    },
    AdminAuditPanel: true, AdminFlaggedPanel: true, AdminTagsPanel: true,
    SearchBar: {
        name: "SearchBar",
        props: ["modelValue", "placeholder"],
        emits: ["update:modelValue"],
        template: `<input class="stub-search" :value="modelValue" :placeholder="placeholder"
                          @input="$emit('update:modelValue', $event.target.value)" />`,
    },
    UserSortMenu: true,
    Card: { template: `<div><slot /></div>` },
    Badge: { template: `<span class="stub-badge"><slot /></span>` },
    PaneHeader: { props: ["description"], template: `<h3 class="stub-head"><slot /></h3>` },
};

function mountPane(subView: string, port = makePort()) {
    return mount(AdminPane as any, {
        props: { subView },
        global: {
            provide: { [ADMIN_PORT_KEY as symbol]: port, [CSS_COLOR_KEY as symbol]: computed(() => "#abc") },
            stubs: STUBS,
        },
    });
}

describe("AdminPane — badge vs. body denominator", () => {
    it("C-1 · unfiltered: badge 4, rows 4 (consistent)", () => {
        const w = mountPane("admin-users", makePort(""));
        const badge = w.find(".stub-badge").text();
        const rows = w.find(".stub-users").attributes("data-users");
        console.log(`C-1 badge=${badge} rowsRendered=${rows}`);
        expect(badge).toBe("4");
        expect(rows).toBe("4");
    });

    it("C-2 · filtered 'azure': badge STILL 4 while ONE row renders", () => {
        const w = mountPane("admin-users", makePort("azure"));
        const badge = w.find(".stub-badge").text();
        const rows = w.find(".stub-users").attributes("data-users");
        const total = w.find(".stub-users").attributes("data-total");
        console.log(`C-2 badge=${badge} rowsRendered=${rows} totalUsersProp=${total}`);
        // The defect, asserted as it currently behaves:
        expect(badge).toBe("4");
        expect(rows).toBe("1");
    });

    it("C-3 · never-attempted load renders a hard 0, not a suppressed badge", () => {
        const port = makePort("");
        port.adminUsers.value = [];      // no token ⇒ loadAdminUsers() returned early
        port.loadingUsers.value = false; // ...without ever setting loadingUsers
        port.usersLoadError.value = null;
        const w = mountPane("admin-users", port);
        console.log(`C-3 badgeExists=${w.find(".stub-badge").exists()} text=${JSON.stringify(w.find(".stub-badge").text())}`);
        expect(w.find(".stub-badge").text()).toBe("0");
    });
});

describe("AdminPane — domain boundary", () => {
    it("C-4 · an out-of-union subView renders a titleless, bodyless card", () => {
        const w = mountPane("admin-webhooks" as any);
        const title = w.find(".stub-head").text();
        const bodyChildren = w.findAll(".stub-users,.stub-names,.stub-search").length;
        const html = w.html().replace(/\s+/g, " ");
        console.log(`C-4 title=${JSON.stringify(title)} bodyControls=${bodyChildren}`);
        console.log(`C-4 html=${html}`);
        expect(title).toBe("");
        expect(bodyChildren).toBe(0);
    });
});

describe("AdminPane — prop hand-off", () => {
    it("C-5 · AdminNamesPanel is handed a cssColorOpaque it never reads", () => {
        const w = mountPane("admin-names");
        const delivered = w.find(".stub-names").attributes("data-css");
        console.log(`C-5 cssColorOpaque prop delivered to AdminNamesPanel = ${JSON.stringify(delivered)}`);
        expect(delivered).toBe("#abc");
    });

    it("C-6 · the search field is bound to the SHARED port query (writes escape the pane)", async () => {
        const port = makePort("");
        const w = mountPane("admin-users", port);
        await w.find(".stub-search").setValue("verdant");
        console.log(`C-6 port.searchQuery after typing in AdminPane = ${JSON.stringify(port.searchQuery.value)}`);
        expect(port.searchQuery.value).toBe("verdant");
    });

    it("C-7 · a11y: the pane emits no live region for its async counts", () => {
        const w = mountPane("admin-users");
        const live = w.findAll("[aria-live]").length;
        const labelled = w.findAll("[aria-label],[aria-labelledby]").length;
        console.log(`C-7 ariaLive=${live} ariaLabelled=${labelled}`);
        expect(live).toBe(0);
    });
});
