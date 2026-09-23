/**
 * X.W7.z1 · COHESION §0bt.1 — `useVersionHistory`'s two retired
 * `catch → console.warn` arms (load `:52`, fork `:73`) settle TYPED VERDICTS,
 * and each failure reaches the palette inspector's rail:
 *
 *   · fork  — `useDialogBrowseActions.onFork` hands the reason to the host's
 *     `onForkError`, which `BrowsePane` renders on the inspector (row 47).
 *   · load  — `VersionHistoryDrawer` emits `load-failed` with the reason instead
 *     of settling an empty page that reads as "0 versions"; `BrowsePane` says it
 *     on the inspector of the palette whose history was asked for.
 *
 * The transport is the one stub (the `./api` module boundary); the composable,
 * the drawer and the inspector run real.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed, shallowRef } from "vue";
import { useVersionHistory, type VersionsResult } from "../../palettes/useVersionHistory";
import { useDialogBrowseActions } from "../../palettes/browser/dialog/composables/useDialogBrowseActions";
import VersionHistoryDrawer from "../../palettes/browser/dialog/VersionHistoryDrawer.vue";
import PaletteInspector from "../../palettes/PaletteInspector.vue";
import { BROWSE_PORT_KEY } from "../../palettes/usePalettePorts";
import { API_CLIENT_KEY, createApiClient } from "../../platform/transport/useApiClient";
import {
    INK_AMBIENT_KEY,
    SELECTED_ENTITY_KEY,
    type PaletteSceneTarget,
} from "../../color-session/keys";
import type { Palette } from "../../palettes/types";

const api = vi.hoisted(() => ({
    listVersions: vi.fn(),
    forkPalette: vi.fn(),
    revertPalette: vi.fn(),
}));
vi.mock("../../palettes/api", () => api);

const warn = vi.spyOn(console, "warn");

const REMOTE: Palette = {
    name: "Versioned remote",
    slug: "versioned-remote",
    colors: [
        { css: "#123456", position: 0 },
        { css: "#abcdef", position: 1 },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: false,
    userSlug: "me",
    visibility: "public",
    versionCount: 3,
};

afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
});

describe("useVersionHistory settles typed verdicts (0 console.warn)", () => {
    it("a failed fork is { ok: false, message }", async () => {
        api.forkPalette.mockRejectedValueOnce(new Error("503 Service Unavailable"));
        const result = await useVersionHistory().fork(REMOTE.slug);
        expect(result).toEqual({ ok: false, message: "503 Service Unavailable" });
        expect(warn).not.toHaveBeenCalled();
    });

    it("a failed version load is { ok: false, message }", async () => {
        api.listVersions.mockRejectedValueOnce(new Error("backend unreachable"));
        const result = await useVersionHistory().fetchVersions(REMOTE.slug);
        expect(result).toEqual({ ok: false, message: "backend unreachable" });
        expect(warn).not.toHaveBeenCalled();
    });

    it("a completed fork carries the new palette", async () => {
        const forked = { ...REMOTE, slug: "forked" };
        api.forkPalette.mockResolvedValueOnce(forked);
        expect(await useVersionHistory().fork(REMOTE.slug)).toEqual({ ok: true, palette: forked });
    });
});

describe("each failure is handed to the host that renders it", () => {
    it("fork → onForkError with the verdict's reason", async () => {
        api.forkPalette.mockRejectedValueOnce(new Error("503 Service Unavailable"));
        const onForkError = vi.fn();
        const pm = {
            ensureUser: async () => {},
            ensureSession: async () => {},
            versions: useVersionHistory(),
            remotePalettes: shallowRef<Palette[]>([REMOTE]),
            loadRemotePalettes: async () => {},
            tierFilter: shallowRef(null),
            selectedTags: shallowRef<string[]>([]),
        };
        const { onFork } = useDialogBrowseActions({ pm: pm as never, onForkError });
        await onFork(REMOTE);
        expect(onForkError).toHaveBeenCalledWith(REMOTE, "Remix failed: 503 Service Unavailable");
        expect(pm.remotePalettes.value).toEqual([REMOTE]);
    });

    it("the drawer emits load-failed with the reason (not an empty page)", async () => {
        api.listVersions.mockRejectedValueOnce(new Error("backend unreachable"));
        const wrapper = mount(VersionHistoryDrawer, {
            props: {
                open: false,
                paletteSlug: REMOTE.slug,
                paletteName: REMOTE.name,
                currentHash: null,
            },
            global: {
                provide: { [BROWSE_PORT_KEY as symbol]: { versions: useVersionHistory() } },
            },
            attachTo: document.body,
        });
        await wrapper.setProps({ open: true });
        await flushPromises();
        expect(wrapper.emitted("load-failed")).toEqual([["backend unreachable"]]);
        wrapper.unmount();
    });

    it("a completed load emits no failure", async () => {
        const page: VersionsResult = { ok: true, page: { data: [], total: 0 } };
        const wrapper = mount(VersionHistoryDrawer, {
            props: { open: false, paletteSlug: REMOTE.slug, paletteName: REMOTE.name, currentHash: null },
            global: {
                provide: {
                    [BROWSE_PORT_KEY as symbol]: { versions: { fetchVersions: async () => page } },
                },
            },
            attachTo: document.body,
        });
        await wrapper.setProps({ open: true });
        await flushPromises();
        expect(wrapper.emitted("load-failed")).toBeUndefined();
        wrapper.unmount();
    });

    it("the inspector's rail says the host's verdict", async () => {
        const wrapper = mount(PaletteInspector, {
            props: { palette: REMOTE, expanded: true, isOwned: true },
            global: {
                stubs: { transition: true },
                provide: {
                    [API_CLIENT_KEY as symbol]: createApiClient(),
                    [INK_AMBIENT_KEY as symbol]: computed(() => 0.5),
                    [SELECTED_ENTITY_KEY as symbol]: shallowRef<readonly PaletteSceneTarget[]>([]),
                },
            },
            attachTo: document.body,
        });
        (wrapper.vm as unknown as { showFeedback: (m: string, v: "error") => void }).showFeedback(
            "Versions failed to load: backend unreachable",
            "error",
        );
        await flushPromises();
        expect(wrapper.get('[role="status"]').text()).toContain(
            "Versions failed to load: backend unreachable",
        );
        wrapper.unmount();
    });
});
