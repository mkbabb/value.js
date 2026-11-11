import { computed, getCurrentScope, onScopeDispose, readonly, ref, watch, type ComputedRef, type Ref } from "vue";
import { useEventListener } from "@vueuse/core";

/**
 * The drag clock's two schedulers: one write per animation frame, and one
 * write once the input settles.
 *
 * `useFrameCoalesce` — AT MOST ONE write per animation frame, the latest value
 * wins (S.W3 · W3-1). `push` schedules; `flush` writes a pending value now (a
 * gesture's release lands its terminal value without waiting a frame);
 * `cancel` drops it (a cancelled gesture commits nothing, GRADSTOP-A §12).
 * Non-rAF env (SSR): writes synchronously. The scope's end cancels.
 *
 * `useAtmosphereFrameCoalesce` — the atmosphere fan-out on it (the aurora seed
 * and blob-palette derives in useAtmosphere, the `--accent-live` contrast
 * solve) is the tranche's #1 perf cost (perf-transitions P0-1): three heavy
 * derives would otherwise fire SYNCHRONOUSLY on EVERY `cssColorOpaque` change,
 * 60×/s under a slider drag. The atmosphere consumers read the RETURNED signal
 * (never the synchronous `cssColorOpaque`), so each frame's intermediate
 * colours collapse to ONE derive; the picker's own instant surfaces (readout,
 * tooltip, spectrum) keep the synchronous colour. S-18 holds bit-for-bit: the
 * last colour of every frame wins, so a settled drag lands its terminal colour
 * on the next frame. Seeded with the current value, so the first paint derives
 * synchronously (no atmosphere flash).
 *
 * `useSettle` — a trailing settle (OD19-V3 · o1105 U2): `settle(run, now)`
 * runs `run` at once when `now`, else {@link SETTLE_MS} after the last call; a
 * newer call replaces a pending one. Tokens that are off screen during a drag
 * mint on it, reading the latest inputs, so the settled tokens are byte-equal
 * to a per-frame mint. There is no release hook: settle is trailing only.
 *
 * `useColourLive` — whether a continuous input is driving the colour (o1105-r2
 * perf). A colour frame under a held pointer, or a second frame inside
 * {@link SETTLE_MS} of the one before, turns it on; {@link SETTLE_MS} of quiet
 * with no pointer held turns it off. A click picks on release, one frame, so it never turns it on:
 * a swatch click still breathes, a drag tracks.
 *
 * Call each synchronously within a setup/effect scope.
 */
export function useFrameCoalesce<T>(write: (value: T) => void) {
    let pending: { value: T } | null = null;
    let frame: number | null = null;
    const run = () => {
        frame = null;
        const next = pending;
        pending = null;
        if (next) write(next.value);
    };
    const cancel = () => {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        pending = null;
    };
    if (getCurrentScope()) onScopeDispose(cancel);
    return {
        push(value: T) {
            pending = { value };
            if (frame !== null) return;
            if (typeof requestAnimationFrame !== "function") run();
            else frame = requestAnimationFrame(run);
        },
        flush() {
            if (frame !== null) cancelAnimationFrame(frame);
            run();
        },
        cancel,
    };
}

export function useAtmosphereFrameCoalesce(
    source: ComputedRef<string>,
): ComputedRef<string> {
    const latest = ref(source.value);
    const frame = useFrameCoalesce((value: string) => {
        latest.value = value;
    });
    watch(source, (value) => frame.push(value));
    // A ComputedRef so it drops into the existing `ComputedRef<string>` consumer
    // signatures unchanged.
    return computed(() => latest.value);
}

/** The quiet interval after the last colour frame before a settled token
 *  mints (well past one frame, well under a reach for the view menu). */
export const SETTLE_MS = 120;

export function useSettle(ms: number = SETTLE_MS) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancel = () => {
        clearTimeout(timer);
        timer = undefined;
    };
    if (getCurrentScope()) onScopeDispose(cancel);
    return (run: () => void, now: boolean) => {
        cancel();
        if (now) run();
        else timer = setTimeout(() => {
            timer = undefined;
            run();
        }, ms);
    };
}

export function useColourLive(frame: Readonly<Ref<string>>, ms: number = SETTLE_MS) {
    const live = ref(false);
    const settle = useSettle(ms);
    // A colour frame under a held pointer is a drag at any frame rate (a slow
    // device spaces its frames past SETTLE_MS); the interval test covers a
    // held key.
    // A held pointer keeps it on through a pause: the drag ends on release.
    let pressed = false;
    const end = () => {
        if (!pressed) live.value = false;
    };
    if (typeof window !== "undefined") {
        const opts = { capture: true, passive: true } as const;
        useEventListener(window, "pointerdown", () => (pressed = true), opts);
        for (const type of ["pointerup", "pointercancel"] as const) {
            useEventListener(window, type, () => {
                pressed = false;
                if (live.value) settle(end, false);
            }, opts);
        }
    }
    let last = -Infinity;
    // Sync, so the flag is on before any reader of the same frame runs: a
    // pre-flush watcher ordered ahead of this one read the first frame of a
    // drag as settled and wrote it to the root (the 11 start-of-drag root
    // writes, o1110 D2).
    watch(frame, () => {
        const now = performance.now();
        if (pressed || now - last < ms) live.value = true;
        last = now;
        settle(end, false);
    }, { flush: "sync" });
    return readonly(live);
}

/**
 * `source`, held while `live` is on: a token whose readers sit on a ground the
 * drag moves (the dock band's inks) keeps its settled value through the drag
 * and takes the latest once it ends. Re-minted per colour frame, such a token
 * restarted its readers' colour transitions on every frame, so they ran, and
 * restyled, for the whole drag (o1105-r2 perf). The referent precedent is
 * OD19-V3: the ink ambient already holds while the colour moves.
 */
export function useHeldWhileLive<T>(source: Readonly<Ref<T>>, live: Readonly<Ref<boolean>>) {
    let held = source.value;
    return computed(() => {
        const value = source.value;
        if (!live.value) held = value;
        return held;
    });
}
