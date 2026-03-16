import type { Ref } from "vue";
import { watch } from "vue";
import { lerp, clamp01, orbitPos } from "./orbital";
import type { SatelliteInternal } from "./satellite-types";

export const CURSOR_REPEL_RADIUS = 1.2; // fraction of parentSize — repulsion range
export const CURSOR_REPEL_STRENGTH = 0.25; // max displacement (fraction of parentSize)
export const CURSOR_SMOOTH = 0.08; // lerp factor per frame (~5 frames to settle)

export interface CursorState {
    cursorX: number;
    cursorY: number;
    smoothCursorX: number;
    smoothCursorY: number;
}

export function createCursorState(): CursorState {
    return {
        cursorX: NaN,
        cursorY: NaN,
        smoothCursorX: NaN,
        smoothCursorY: NaN,
    };
}

export function setupCursorTracking(
    parentEl: Ref<HTMLElement | null>,
    state: CursorState,
) {
    function onMouseMove(e: MouseEvent) {
        const el = parentEl.value;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Divide by rendered size (includes CSS scale) to get same fractional
        // coordinate system as satellite positions (fraction of parentSize)
        state.cursorX = (e.clientX - cx) / rect.width;
        state.cursorY = (e.clientY - cy) / rect.height;
    }

    function onMouseLeave() {
        state.cursorX = NaN;
        state.cursorY = NaN;
    }

    watch(
        () => parentEl.value,
        (el, oldEl) => {
            oldEl?.removeEventListener("mousemove", onMouseMove);
            oldEl?.removeEventListener("mouseleave", onMouseLeave);
            el?.addEventListener("mousemove", onMouseMove);
            el?.addEventListener("mouseleave", onMouseLeave);
        },
        { immediate: true },
    );

    return { onMouseMove, onMouseLeave };
}

export function smoothCursor(state: CursorState) {
    if (Number.isNaN(state.cursorX)) {
        state.smoothCursorX = NaN;
        state.smoothCursorY = NaN;
    } else if (Number.isNaN(state.smoothCursorX)) {
        state.smoothCursorX = state.cursorX;
        state.smoothCursorY = state.cursorY;
    } else {
        state.smoothCursorX += (state.cursorX - state.smoothCursorX) * CURSOR_SMOOTH;
        state.smoothCursorY += (state.cursorY - state.smoothCursorY) * CURSOR_SMOOTH;
    }
}

export function computeRepulsion(
    s: SatelliteInternal,
    now: number,
    state: CursorState,
): { repX: number; repY: number } {
    if (Number.isNaN(state.smoothCursorX)) return { repX: 0, repY: 0 };
    if (s.phase !== "orbiting" && s.phase !== "emerging") return { repX: 0, repY: 0 };

    // Get current satellite position (fraction of parent)
    const pos = s.phase === "orbiting"
        ? orbitPos(s, now)
        : {
            x: lerp(s.startX, s.endX, clamp01((now - s.phaseStart) / s.phaseDuration)),
            y: lerp(s.startY, s.endY, clamp01((now - s.phaseStart) / s.phaseDuration)),
        };

    const dx = pos.x - state.smoothCursorX;
    const dy = pos.y - state.smoothCursorY;
    const dist = Math.hypot(dx, dy);

    if (dist < CURSOR_REPEL_RADIUS && dist > 0.01) {
        // Inverse-linear falloff: strongest when close
        const strength = CURSOR_REPEL_STRENGTH * (1 - dist / CURSOR_REPEL_RADIUS);
        return {
            repX: (dx / dist) * strength,
            repY: (dy / dist) * strength,
        };
    }

    return { repX: 0, repY: 0 };
}
