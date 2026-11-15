// Copy color confirms: for a beat after the copy lands, the seat reads
// "Copied" and wears a check; at rest it reads "Copy color".
import { describe, expect, it } from "vitest";
import { computed, ref } from "vue";
import { Check, Copy } from "@lucide/vue";
import { colorSceneActions } from "../../picker/sceneActions";
import type { ColorSceneTarget, ResolveSceneAction } from "../../color-session/keys";

const resolve: ResolveSceneAction = () => ({ kind: "ready", run: () => {} }) as never;

function target(copied: boolean): ColorSceneTarget {
    const flag = ref(copied);
    return {
        isEditing: computed(() => false),
        canProposeName: computed(() => false),
        paletteActive: computed(() => false),
        reset: () => {},
        copy: () => {},
        copied: computed(() => flag.value),
        random: () => {},
    };
}

describe("Copy color seat", () => {
    it("reads Copy color at rest", () => {
        const seat = colorSceneActions(target(false), resolve, () => () => {}).find((a) => a.token === "color.copy")!;
        expect(seat.title).toBe("Copy color");
        expect(seat.icon).toBe(Copy);
    });
    it("confirms a landed copy", () => {
        const seat = colorSceneActions(target(true), resolve, () => () => {}).find((a) => a.token === "color.copy")!;
        expect(seat.title).toBe("Copied");
        expect(seat.icon).toBe(Check);
    });
});
