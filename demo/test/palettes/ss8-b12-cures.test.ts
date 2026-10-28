/**
 * SS-8 B12-card-shell — CURE falsifiers (docs/tranches/X/execution/SS8/packets/B12-card-shell.md §cures).
 *
 *   · SS8-0350 (PC U-11 → PC-20's PROVEN descendant-keydown limb, row 0346):
 *     Space typed in an inner control (the rename input, a button) must not
 *     drive the CARD's press. The card's own Enter/Space are `.self`; its
 *     press keyboard leg is bound the same way.
 *   · SS8-0366 (Meta U-4): a double-click on the vote control fires ONE
 *     toggle — the second press while the first is in flight is dropped.
 *
 * The transport (`../../palettes/api`) and the session are the stubs; the
 * composable and the inspector run real. The press drive is the producer's
 * `useLiquidPress`, wrapped only to observe its keyboard leg.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed, ref, shallowRef } from "vue";
import type { Palette } from "../../palettes/types";

const pressSpy = vi.hoisted(() => ({ keydown: vi.fn() }));
vi.mock("@mkbabb/glass-ui/motion", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@mkbabb/glass-ui/motion")>();
    return {
        ...actual,
        useLiquidPress: (...args: Parameters<typeof actual.useLiquidPress>) => {
            const r = actual.useLiquidPress(...args);
            const onKeydown = r.handlers.onKeydown;
            return {
                ...r,
                handlers: {
                    ...r.handlers,
                    onKeydown: (e: KeyboardEvent) => {
                        pressSpy.keydown(e);
                        onKeydown(e);
                    },
                },
            };
        },
    };
});

const api = vi.hoisted(() => ({ votePalette: vi.fn() }));
vi.mock("../../palettes/api", async (importOriginal) => ({
    ...(await importOriginal<object>()),
    votePalette: api.votePalette,
}));
vi.mock("../../platform/auth/useSession", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../platform/auth/useSession")>();
    return {
        ...actual,
        useSession: () => ({ ...actual.useSession(), ensureSession: async () => "token" }),
    };
});

import PaletteInspector from "../../palettes/inspector/PaletteInspector.vue";
import { useBrowsePalettes } from "../../palettes/useBrowsePalettes";
import { API_CLIENT_KEY, createApiClient } from "../../platform/transport/useApiClient";
import { INK_AMBIENT_KEY, SELECTED_ENTITY_KEY } from "../../color-session/keys";

const REMOTE: Palette = {
    name: "Votable remote",
    slug: "votable-remote",
    colors: [
        { css: "#123456", position: 0 },
        { css: "#abcdef", position: 1 },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: false,
    userSlug: "someone",
    visibility: "public",
    voteCount: 0,
    voted: false,
};

afterEach(() => {
    pressSpy.keydown.mockReset();
    api.votePalette.mockReset();
    document.body.innerHTML = "";
});

describe("SS8-0350 · the card press ignores keydown from its descendants", () => {
    function mountCard() {
        return mount(PaletteInspector, {
            props: { palette: { ...REMOTE, isLocal: true, id: "p-1" }, expanded: true },
            global: {
                stubs: { transition: true },
                provide: {
                    [API_CLIENT_KEY as symbol]: createApiClient(),
                    [INK_AMBIENT_KEY as symbol]: computed(() => 0.5),
                    [SELECTED_ENTITY_KEY as symbol]: shallowRef([]),
                },
            },
            attachTo: document.body,
        });
    }

    it("Space on the card itself drives the press (positive control)", () => {
        const w = mountCard();
        const card = w.get(".palette-card").element;
        card.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
        expect(pressSpy.keydown).toHaveBeenCalledTimes(1);
        w.unmount();
    });

    it("Space typed in an inner input or button never reaches the card's press", () => {
        const w = mountCard();
        // The rename input is an inner editable; an injected one stands for it
        // (the editable descendant is what matters, not which control).
        const card = w.get(".palette-card").element;
        const input = document.createElement("input");
        card.appendChild(input);
        const inner = [input, ...Array.from(card.querySelectorAll("button"))];
        expect(inner.length).toBeGreaterThan(1);
        for (const el of inner) {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
        }
        expect(pressSpy.keydown).toHaveBeenCalledTimes(0);
        w.unmount();
    });
});

describe("SS8-0366 · one vote per palette in flight", () => {
    it("a double press sends ONE toggle; the next press after it settles sends another", async () => {
        let resolve!: (v: { voted: boolean; voteCount: number }) => void;
        api.votePalette.mockImplementation(
            () => new Promise((r) => (resolve = r)),
        );
        const browse = useBrowsePalettes({ searchQuery: ref("") });
        browse.remotePalettes.value = [{ ...REMOTE }];

        const first = browse.onVote(REMOTE);
        const second = browse.onVote(REMOTE);
        await flushPromises();
        expect(api.votePalette).toHaveBeenCalledTimes(1);
        expect(await second).toBeNull();

        resolve({ voted: true, voteCount: 1 });
        expect(await first).toEqual({ success: true, message: "Voted" });
        expect(browse.remotePalettes.value[0]).toMatchObject({ voted: true, voteCount: 1 });

        api.votePalette.mockResolvedValueOnce({ voted: false, voteCount: 0 });
        expect(await browse.onVote(REMOTE)).toEqual({ success: true, message: "Vote removed" });
        expect(api.votePalette).toHaveBeenCalledTimes(2);
    });
});
