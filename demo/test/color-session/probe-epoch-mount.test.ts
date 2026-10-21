/**
 * OD19 repair 1 (C1-V-05) — a pane mount re-drives only the live-ink probes
 * that MISSED.
 *
 * Before the cure: every live-ink consumer's `onMounted` bumped the one
 * global probe epoch, which invalidated every tint memo in the app. So the
 * first mount of the Gradient pane (its easing rows certify their ink on the
 * resting rung) re-ran every live-ink computed in the app inside the
 * incoming pane's mount frame. On the Home → Gradient switch that frame was
 * 89–109 ms on ANGLE-Metal (`docs/tranches/X/execution/OD19/value/after/repair-1/v05/`).
 *
 * The cure: the bump fires only after a probe missed (no painted referent
 * yet). A mount whose referent was already measured re-drives nothing. A
 * probe that missed is still re-driven by the next mount (the epoch's
 * purpose).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, ref } from "vue";

const isDark = ref(false);
vi.mock("@mkbabb/glass-ui/dark", () => ({ useGlobalDark: () => ({ isDark }) }));

import { INK_AMBIENT_KEY } from "../../color-session/keys";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";

/** jsdom resolves no `var()`: the tier probe's computed background is stubbed. */
function paintPlate(bg: string) {
    const real = window.getComputedStyle.bind(window);
    return vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
        const cs = real(el, pseudo);
        if (!(el as HTMLElement).hasAttribute?.("data-ink-probe")) return cs;
        return new Proxy(cs, {
            get: (t, k) => (k === "backgroundColor" ? bg : Reflect.get(t, k)),
        });
    });
}

const PICK = "oklch(0.62 0.18 40)";

/** A live-ink consumer: certifies one colour on the resting rung and renders it. */
function consumer(runs: { n: number }, out: { css: string }) {
    return defineComponent({
        setup() {
            const { safeCss } = useSafeAccentFn("resting");
            const ink = computed(() => {
                runs.n++;
                return (out.css = safeCss(PICK));
            });
            return () => h("span", ink.value);
        },
    });
}

function mountInto(comp: ReturnType<typeof consumer>) {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(comp);
    app.provide(INK_AMBIENT_KEY, computed(() => 0.5));
    app.mount(host);
    return () => {
        app.unmount();
        host.remove();
    };
}

describe("OD19 repair 1 — the probe epoch bumps only after a missed probe", () => {
    const teardown: (() => void)[] = [];
    afterEach(() => {
        while (teardown.length) teardown.pop()!();
        vi.restoreAllMocks();
        document.documentElement.classList.remove("dark");
        isDark.value = false;
    });

    it("mounting a second consumer on a measured referent does not re-run the first consumer's ink", async () => {
        paintPlate("rgba(250, 248, 244, 0.72)");
        const a = { n: 0 };
        teardown.push(mountInto(consumer(a, { css: "" })));
        await nextTick();
        await nextTick();
        const settled = a.n;

        teardown.push(mountInto(consumer({ n: 0 }, { css: "" })));
        await nextTick();
        await nextTick();
        expect(a.n).toBe(settled);
    });

    it("a probe that missed is still re-driven by the next mount", async () => {
        // A fresh scheme stamp (the tint memo is stamped by the root `.dark` class),
        // so the measured read from the case above does not serve this one.
        isDark.value = true;
        document.documentElement.classList.add("dark");
        const spy = paintPlate("rgba(0, 0, 0, 0)"); // nothing painted: the probe misses
        const a = { n: 0 };
        teardown.push(mountInto(consumer(a, { css: "" })));
        await nextTick();
        await nextTick();
        spy.mockRestore();
        paintPlate("rgba(20, 16, 12, 0.18)"); // the plate now paints
        const missed = a.n;

        teardown.push(mountInto(consumer({ n: 0 }, { css: "" })));
        await nextTick();
        await nextTick();
        // The first consumer's ink was re-read once the referent can be measured.
        expect(a.n).toBeGreaterThan(missed);
    });
});
