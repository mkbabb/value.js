/**
 * X.W7.d2 · COHESION §0bk.1 — the selected-entity inspector.
 *
 *   · G7 (host) — an export that THROWS is rendered on the inspector's rail
 *     (`role="status"`): `usePaletteExport`'s `failure` reaches the user.
 *   · the typed `SceneActionSet` seam — while its palette is the selected
 *     entity the inspector registers exactly the verbs it offers under
 *     `SELECTED_ENTITY_KEY`, and removes exactly its own on deselect/unmount.
 *
 * The download is the one stub, at the platform boundary (`downloadFile`
 * writes a Blob URL and clicks an anchor); capture and serialization run real.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed, shallowRef } from "vue";
import PaletteInspector from "../../palettes/PaletteInspector.vue";
import { API_CLIENT_KEY, createApiClient } from "../../platform/transport/useApiClient";
import {
    INK_AMBIENT_KEY,
    SELECTED_ENTITY_KEY,
    type PaletteSceneTarget,
} from "../../color-session/keys";
import type { Palette } from "../../palettes/types";

const download = vi.hoisted(() => ({ impl: (): void => {} }));
vi.mock("../../palettes/export/download", () => ({
    downloadFile: () => download.impl(),
}));

const SAVED: Palette = {
    id: "p-1",
    name: "Inspector fixture",
    slug: "inspector-fixture",
    colors: [
        { css: "#123456", position: 0 },
        { css: "#abcdef", position: 1 },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true,
};

const REMOTE_OWNED: Palette = {
    name: "Owned remote",
    colors: SAVED.colors,
    createdAt: SAVED.createdAt,
    updatedAt: SAVED.updatedAt,
    slug: "owned-remote",
    isLocal: false,
    userSlug: "me",
    visibility: "public",
    versionCount: 3,
};

function mountInspector(
    palette: Palette,
    props: Record<string, unknown> = {},
    registry = shallowRef<readonly PaletteSceneTarget[]>([]),
) {
    const wrapper = mount(PaletteInspector, {
        props: { palette, expanded: true, ...props },
        global: {
            // The detail band's height morph reads `getAnimations()`, which
            // jsdom does not implement; the morph is not under test here.
            stubs: { transition: true },
            provide: {
                [API_CLIENT_KEY as symbol]: createApiClient(),
                [INK_AMBIENT_KEY as symbol]: computed(() => 0.5),
                [SELECTED_ENTITY_KEY as symbol]: registry,
            },
        },
        attachTo: document.body,
    });
    return { wrapper, registry };
}

afterEach(() => {
    download.impl = () => {};
    document.body.innerHTML = "";
});

describe("G7 · the export failure is rendered by its host", () => {
    it("a thrown download is said on the inspector's rail", async () => {
        download.impl = () => {
            throw new Error("disk full");
        };
        const { wrapper, registry } = mountInspector(SAVED);
        await registry.value.at(-1)?.commands.export?.();
        await flushPromises();
        expect(wrapper.get('[role="status"]').text()).toContain("Export failed: disk full");
        wrapper.unmount();
    });

    it("a completed export is said too (same rail)", async () => {
        const { wrapper, registry } = mountInspector(SAVED);
        await registry.value.at(-1)?.commands.export?.();
        await flushPromises();
        expect(wrapper.get('[role="status"]').text()).toMatch(/^Exported .+\.json$/);
        wrapper.unmount();
    });
});

describe("the selected entity rides X-W4's typed SceneActionSet", () => {
    const verbs = (registry: { value: readonly PaletteSceneTarget[] }) =>
        Object.keys(registry.value.at(-1)?.commands ?? {}).sort();

    it("a saved palette offers exactly the menu's verbs for its kind", () => {
        const { wrapper, registry } = mountInspector(SAVED);
        expect(registry.value).toHaveLength(1);
        expect(registry.value[0]?.name).toBe("Inspector fixture");
        expect(verbs(registry)).toEqual(["delete", "export", "publish", "rename"]);
        wrapper.unmount();
    });

    it("an owned remote palette offers its owner's verbs", () => {
        const { wrapper, registry } = mountInspector(REMOTE_OWNED, { isOwned: true });
        expect(verbs(registry)).toEqual([
            "delete", "export", "fork", "rename", "save", "tags", "versions", "visibility", "vote",
        ]);
        expect(registry.value[0]?.isPublic).toBe(true);
        wrapper.unmount();
    });

    it("a dock verb dispatches the inspector's own emit (one path)", () => {
        const { wrapper, registry } = mountInspector(REMOTE_OWNED, { isOwned: true });
        void registry.value[0]?.commands.visibility?.();
        void registry.value[0]?.commands.vote?.();
        expect(wrapper.emitted("setVisibility")?.[0]?.[1]).toBe("private");
        expect(wrapper.emitted("vote")).toHaveLength(1);
        wrapper.unmount();
    });

    it("deselect and unmount remove exactly this inspector's target", async () => {
        const registry = shallowRef<readonly PaletteSceneTarget[]>([]);
        const a = mountInspector(SAVED, {}, registry);
        const b = mountInspector(REMOTE_OWNED, { isOwned: true }, registry);
        expect(registry.value.map((t) => t.name)).toEqual(["Inspector fixture", "Owned remote"]);
        await b.wrapper.setProps({ expanded: false });
        expect(registry.value.map((t) => t.name)).toEqual(["Inspector fixture"]);
        a.wrapper.unmount();
        expect(registry.value).toEqual([]);
        b.wrapper.unmount();
    });

    it("an unselected inspector registers nothing", () => {
        const { wrapper, registry } = mountInspector(SAVED, { expanded: false });
        expect(registry.value).toEqual([]);
        wrapper.unmount();
    });
});

describe("S.W5-7 · never the same string twice (Repair 1, Check 1 M-3)", () => {
    it("the specimen's name yields while the rename input shows it, and returns on cancel", async () => {
        const { wrapper, registry } = mountInspector(SAVED);
        const name = () => wrapper.find("[data-palette-name]");
        expect(name().classes()).not.toContain("invisible");
        void registry.value[0]?.commands.rename?.();
        await flushPromises();
        const input = wrapper.find('input[placeholder="Palette name..."]');
        expect(input.exists()).toBe(true);
        expect(name().classes()).toContain("invisible");
        await input.trigger("keydown", { key: "Escape" });
        await flushPromises();
        expect(wrapper.find('input[placeholder="Palette name..."]').exists()).toBe(false);
        expect(name().classes()).not.toContain("invisible");
        wrapper.unmount();
    });
});
