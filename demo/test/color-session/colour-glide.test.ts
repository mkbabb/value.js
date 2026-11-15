// A discrete colour change glides the page's colour; a drag never waits.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, nextTick, ref } from "vue";
import { useColourGlide } from "../../color-session/useColourGlide";

let rafQueue: Array<(t: number) => void> = [];
let now = 0;
beforeEach(() => {
    rafQueue = [];
    now = 0;
    vi.stubGlobal("requestAnimationFrame", (cb: (t: number) => void) => {
        rafQueue.push(cb);
        return rafQueue.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {
        rafQueue = [];
    });
});
afterEach(() => vi.unstubAllGlobals());

function frames(n: number, ms = 16) {
    for (let i = 0; i < n; i++) {
        now += ms;
        const q = rafQueue;
        rafQueue = [];
        for (const cb of q) cb(now);
    }
}

function setup() {
    const source = ref("oklch(0.6 0.2 300)");
    const live = ref(false);
    const scope = effectScope();
    const glide = scope.run(() => useColourGlide(source, live, () => 160))!;
    return { source, live, glide, scope };
}

describe("useColourGlide", () => {
    it("glides a discrete change through intermediate colours to the exact target", async () => {
        const { source, glide } = setup();
        source.value = "oklch(0.7 0.18 40)";
        await nextTick();
        expect(glide.gliding.value).toBe(true);
        expect(glide.colour.value).toBe("oklch(0.6 0.2 300)");
        frames(1);
        frames(3);
        const mid = glide.colour.value;
        expect(mid).toMatch(/^oklab\(/);
        frames(20);
        expect(glide.colour.value).toBe("oklch(0.7 0.18 40)");
        expect(glide.gliding.value).toBe(false);
    });

    it("never holds a drag: a live frame lands at once", async () => {
        const { source, live, glide } = setup();
        live.value = true;
        source.value = "oklch(0.5 0.1 120)";
        await nextTick();
        expect(glide.colour.value).toBe("oklch(0.5 0.1 120)");
        expect(glide.gliding.value).toBe(false);
    });

    it("a drag takes over mid-glide, and a new change retargets from the drawn colour", async () => {
        const { source, live, glide } = setup();
        source.value = "oklch(0.7 0.18 40)";
        await nextTick();
        frames(4);
        source.value = "oklch(0.4 0.1 200)";
        await nextTick();
        frames(1);
        expect(glide.gliding.value).toBe(true);
        live.value = true;
        expect(glide.colour.value).toBe("oklch(0.4 0.1 200)");
        expect(glide.gliding.value).toBe(false);
    });
});
