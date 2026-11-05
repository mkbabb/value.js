// MT-REGISTER C-2 ≡ D-1 (records crosswalk §2): the palette → picker intents
// (addColor's fallback, startEdit) wait for the picker to mount. A poll that gives
// up after ~2 s drops the intent on a slow mount; the wait belongs to the ref.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { whenRefReady } from "../../app/composables/usePaletteWiring";

describe("whenRefReady", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("runs at once when the ref is already set", () => {
        const r = ref<{ id: number } | null>({ id: 1 });
        const run = vi.fn();
        whenRefReady(r, run, "t");
        expect(run).toHaveBeenCalledWith({ id: 1 });
    });

    it("applies the intent when the picker mounts late (after 3 s), never dropping it", async () => {
        const r = ref<{ id: number } | null>(null);
        const run = vi.fn();
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        whenRefReady(r, run, "late");
        await vi.advanceTimersByTimeAsync(3000);
        r.value = { id: 2 };
        await nextTick();
        await vi.advanceTimersByTimeAsync(100);
        expect(run).toHaveBeenCalledTimes(1);
        expect(run).toHaveBeenCalledWith({ id: 2 });
        expect(warn).not.toHaveBeenCalled();
        warn.mockRestore();
    });

    it("schedules no timer while it waits (no poll)", () => {
        const r = ref<{ id: number } | null>(null);
        whenRefReady(r, vi.fn(), "idle");
        expect(vi.getTimerCount()).toBe(0);
    });

    it("keeps only the latest intent per label", async () => {
        const r = ref<{ id: number } | null>(null);
        const a = vi.fn();
        const b = vi.fn();
        whenRefReady(r, a, "same");
        whenRefReady(r, b, "same");
        r.value = { id: 3 };
        await nextTick();
        expect(a).not.toHaveBeenCalled();
        expect(b).toHaveBeenCalledTimes(1);
    });
});
