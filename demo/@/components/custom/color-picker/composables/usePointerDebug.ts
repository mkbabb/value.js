import { reactive, onUnmounted, type InjectionKey } from "vue";

export interface PointerDebugEvent {
    ts: number;
    type: string;
    pointerId: number;
    target: string;
    hasCapture: boolean;
    extra?: string;
}

export interface PointerDebugState {
    enabled: boolean;
    events: PointerDebugEvent[];
    gauges: Record<string, string | number | boolean>;
    frozen: boolean;
    frozenSince: number;
}

const MAX_EVENTS = 80;
const FREEZE_THRESHOLD_MS = 2500;

function describeElement(el: EventTarget | null): string {
    if (!el || !(el instanceof HTMLElement)) return "??";
    const tag = el.tagName.toLowerCase();
    const cls = el.className
        ? typeof el.className === "string"
            ? el.className.split(" ").slice(0, 2).join(".")
            : ""
        : "";
    return `${tag}${cls ? "." + cls : ""}`.slice(0, 40);
}

function isDebugEnabled(): boolean {
    if (typeof window === "undefined") return false;
    // Check both hash params and search params for debug=1
    return window.location.hash.includes("debug=1") ||
        window.location.search.includes("debug=1");
}

export function usePointerDebug() {
    const enabled = isDebugEnabled();

    const state = reactive<PointerDebugState>({
        enabled,
        events: [],
        gauges: {},
        frozen: false,
        frozenSince: 0,
    });

    // Freeze detection: track last meaningful pointer activity
    let lastPointerActivity = performance.now();
    let hasActivePointer = false;
    let freezeCheckInterval: ReturnType<typeof setInterval> | null = null;

    function log(
        type: string,
        pointerId: number,
        target: EventTarget | null,
        hasCapture: boolean,
        extra?: string,
    ) {
        if (!state.enabled) return;
        const evt: PointerDebugEvent = {
            ts: performance.now(),
            type,
            pointerId,
            target: describeElement(target),
            hasCapture,
            extra,
        };
        state.events.push(evt);
        if (state.events.length > MAX_EVENTS) {
            state.events.splice(0, state.events.length - MAX_EVENTS);
        }
    }

    function logEvent(e: PointerEvent, label?: string) {
        if (!state.enabled) return;
        const t = e.target as HTMLElement;
        const hasCap = t?.hasPointerCapture?.(e.pointerId) ?? false;
        log(label ?? e.type, e.pointerId, e.target, hasCap);
    }

    function setGauge(key: string, value: string | number | boolean) {
        if (!state.enabled) return;
        state.gauges[key] = value;
    }

    function clearEvents() {
        state.events.splice(0, state.events.length);
    }

    function forceReleaseAll() {
        log("FORCE_RELEASE", -1, null, false, "manual");
        state.gauges["lastForceRelease"] = performance.now();
        state.frozen = false;
        state.frozenSince = 0;
        hasActivePointer = false;
        lastPointerActivity = performance.now();
    }

    // --- Global pointer monitoring (only when debug enabled) ---

    function isDebugOverlay(el: EventTarget | null): boolean {
        if (!el || !(el instanceof HTMLElement)) return false;
        return !!el.closest(".debug-overlay");
    }

    if (enabled && typeof document !== "undefined") {
        // Track per-pointer state to detect missing pointerup
        const activePointers = new Map<number, { target: string; ts: number }>();

        const onGlobalPointerDown = (e: PointerEvent) => {
            // Skip events on the debug overlay itself
            if (isDebugOverlay(e.target)) return;

            lastPointerActivity = performance.now();
            hasActivePointer = true;
            state.frozen = false;
            state.frozenSince = 0;

            const t = e.target as HTMLElement;
            const hasCap = t?.hasPointerCapture?.(e.pointerId) ?? false;
            activePointers.set(e.pointerId, {
                target: describeElement(t),
                ts: performance.now(),
            });

            setGauge("global.lastDown.pid", e.pointerId);
            setGauge("global.lastDown.hasCap", hasCap);
            setGauge("global.lastDown.target", describeElement(t));
            setGauge("global.activePointers", activePointers.size);
        };

        const onGlobalPointerUp = (e: PointerEvent) => {
            if (isDebugOverlay(e.target)) return;

            lastPointerActivity = performance.now();
            activePointers.delete(e.pointerId);
            hasActivePointer = activePointers.size > 0;
            if (!hasActivePointer) {
                state.frozen = false;
                state.frozenSince = 0;
            }
            setGauge("global.activePointer", hasActivePointer);
            setGauge("global.activePointers", activePointers.size);
        };

        const onGlobalPointerMove = (e: PointerEvent) => {
            if (isDebugOverlay(e.target)) return;
            lastPointerActivity = performance.now();
            if (state.frozen) {
                state.frozen = false;
                state.frozenSince = 0;
                log("UNFREEZE", e.pointerId, e.target, false, "moves detected");
            }
        };

        const onGlobalPointerCancel = (e: PointerEvent) => {
            if (isDebugOverlay(e.target)) return;
            activePointers.delete(e.pointerId);
            hasActivePointer = activePointers.size > 0;
            setGauge("global.activePointers", activePointers.size);
            log("global:cancel", e.pointerId, e.target, false);
        };

        // Also monitor touch events for extra context
        const onGlobalTouchStart = (e: TouchEvent) => {
            if (isDebugOverlay(e.target)) return;
            setGauge("global.touches", e.touches.length);
        };
        const onGlobalTouchEnd = (e: TouchEvent) => {
            if (isDebugOverlay(e.target)) return;
            setGauge("global.touches", e.touches.length);
            // If all touches ended but we still have active pointers, that's suspicious
            if (e.touches.length === 0 && activePointers.size > 0) {
                log("ORPHAN_POINTERS", -1, null, false,
                    `${activePointers.size} ptrs, 0 touches. pids: ${[...activePointers.keys()].join(",")}`);
            }
        };

        document.addEventListener("pointerdown", onGlobalPointerDown, { capture: true });
        document.addEventListener("pointerup", onGlobalPointerUp, { capture: true });
        document.addEventListener("pointermove", onGlobalPointerMove, { capture: true, passive: true });
        document.addEventListener("pointercancel", onGlobalPointerCancel, { capture: true });
        document.addEventListener("touchstart", onGlobalTouchStart, { capture: true, passive: true });
        document.addEventListener("touchend", onGlobalTouchEnd, { capture: true, passive: true });

        // Periodic freeze check
        freezeCheckInterval = setInterval(() => {
            const now = performance.now();
            const elapsed = now - lastPointerActivity;
            setGauge("global.activePointer", hasActivePointer);
            setGauge("global.activePointers", activePointers.size);
            setGauge("global.silenceMs", Math.round(elapsed));

            if (hasActivePointer && elapsed > FREEZE_THRESHOLD_MS) {
                if (!state.frozen) {
                    state.frozen = true;
                    state.frozenSince = now;
                    // Include which pointers are stuck
                    const stuckPids = [...activePointers.entries()]
                        .map(([pid, info]) => `p${pid}@${info.target}(${((now - info.ts) / 1000).toFixed(1)}s)`)
                        .join(", ");
                    log("FREEZE_DETECTED", -1, null, false,
                        `${Math.round(elapsed)}ms silence. stuck: ${stuckPids}`);
                }
            }
        }, 500);

        onUnmounted(() => {
            document.removeEventListener("pointerdown", onGlobalPointerDown, { capture: true });
            document.removeEventListener("pointerup", onGlobalPointerUp, { capture: true });
            document.removeEventListener("pointermove", onGlobalPointerMove, { capture: true });
            document.removeEventListener("pointercancel", onGlobalPointerCancel, { capture: true });
            document.removeEventListener("touchstart", onGlobalTouchStart, { capture: true });
            document.removeEventListener("touchend", onGlobalTouchEnd, { capture: true });
            if (freezeCheckInterval) clearInterval(freezeCheckInterval);
        });
    }

    return {
        state,
        log,
        logEvent,
        setGauge,
        clearEvents,
        forceReleaseAll,
    };
}

export type UsePointerDebugReturn = ReturnType<typeof usePointerDebug>;

export const POINTER_DEBUG_KEY: InjectionKey<UsePointerDebugReturn> =
    Symbol("POINTER_DEBUG_KEY");
