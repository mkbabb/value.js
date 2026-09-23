/**
 * X.W7.c — fold N-11 at the card sites: no fallible copy discards its
 * `CopyResult`; every copy verb reaches a verdict surface.
 *
 *   · census — no `void writeClipboard` and no bare `writeClipboard(` statement
 *     under `demo/palettes/browser/card/`;
 *   · runtime — the card's slug copy and the editor's swatch copy each render
 *     the verdict (`role="status"`), for a rejected AND an accepted write.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { computed, defineComponent, h, ref } from "vue";
import PaletteInspector from "../../palettes/PaletteInspector.vue";
import { useSwatchActions } from "../../palettes/browser/card/composables/useSwatchActions";
import ActionFeedback from "../../palettes/browser/card/PaletteCard/ActionFeedback.vue";
import { API_CLIENT_KEY, createApiClient } from "../../platform/transport/useApiClient";
import { INK_AMBIENT_KEY } from "../../color-session/keys";
import type { Palette } from "../../palettes/types";

const PALETTE: Palette = {
    name: "Copy fixture",
    slug: "my-slug",
    colors: [{ css: "#123456", position: 0 }],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: false,
};

const CARD_DIR = path.resolve(import.meta.dirname, "../../palettes/browser/card");
/** X.W7.d2: the card's host moved to the selected-entity inspector. */
const INSPECTOR = path.resolve(import.meta.dirname, "../../palettes/PaletteInspector.vue");

function files(dir: string): string[] {
    return readdirSync(dir).flatMap((f) => {
        const p = path.join(dir, f);
        return statSync(p).isDirectory() ? files(p) : /\.(ts|vue)$/.test(p) ? [p] : [];
    });
}

function withClipboard(writeText: (t: string) => Promise<void>) {
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

afterEach(() => {
    Reflect.deleteProperty(navigator, "clipboard");
    document.body.innerHTML = "";
});

describe("N-11 · census at the card sites", () => {
    it("every writeClipboard result is bound", () => {
        for (const file of [...files(CARD_DIR), INSPECTOR]) {
            for (const line of readFileSync(file, "utf8").split("\n")) {
                if (!line.includes("writeClipboard(")) continue;
                expect(line, file).not.toMatch(/void writeClipboard|^\s*(await\s+)?writeClipboard\(|"writeClipboard\(/);
            }
        }
    });
});

describe("N-11 · the verdict renders", () => {
    const global = {
        provide: {
            [API_CLIENT_KEY as symbol]: createApiClient(),
            [INK_AMBIENT_KEY as symbol]: computed(() => 0.5),
        },
    };

    for (const [label, writeText, expected] of [
        ["rejected", () => Promise.reject(new Error("denied")), "Could not copy"],
        ["accepted", () => Promise.resolve(), "Copied"],
    ] as const) {
        it(`the inspector's slug copy — ${label}`, async () => {
            withClipboard(writeText);
            const w = mount(PaletteInspector, {
                props: { palette: PALETTE, expanded: true, showSlug: true },
                global,
            });
            await w.get('[aria-label="Copy slug my-slug"]').trigger("click");
            await flushPromises();
            expect(w.get('[role="status"]').text()).toContain(`${expected} my-slug`);
            w.unmount();
        });

        it(`the editor's swatch copy — ${label}`, async () => {
            withClipboard(writeText);
            const Host = defineComponent({
                setup() {
                    const actions = useSwatchActions({
                        savedColorStrings: ref(["#123456"]),
                        cssColorOpaque: ref("#000000"),
                        emit: () => {},
                    });
                    return () =>
                        h("div", [
                            h("button", { id: "copy", onClick: () => actions.onCurrentSwatchCopy("#123456") }),
                            h(ActionFeedback, {
                                message: actions.copyFeedback.value.message,
                                variant: actions.copyFeedback.value.variant,
                                visible: actions.copyFeedback.value.visible,
                            }),
                        ]);
                },
            });
            const w = mount(Host);
            await w.get("#copy").trigger("click");
            await flushPromises();
            expect(w.get('[role="status"]').text()).toContain(`${expected} #123456`);
            w.unmount();
        });
    }
});

vi.setConfig({ testTimeout: 10_000 });
