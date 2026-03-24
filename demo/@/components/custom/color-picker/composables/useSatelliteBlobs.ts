import { ref, onUnmounted, type Ref, watch } from "vue";
import { mulberry32, hashString } from "./prng";

export type { SatelliteState, UseSatelliteBlobsOptions } from "@lib/animation/satellite-types";
import type { SatelliteState, UseSatelliteBlobsOptions } from "@lib/animation/satellite-types";
import type { SatelliteInternal } from "@lib/animation/satellite-types";
import {
    randRange,
    clamp01,
    lerp,
    createSatellite,
    randomizeOrbit,
    setPhase,
    tickVertices,
    orbitPos,
    computeOutput,
} from "@lib/animation/orbital";
import {
    createCursorState,
    setupCursorTracking,
    smoothCursor,
    computeRepulsion,
} from "@lib/animation/cursor-repulsion";

export function useSatelliteBlobs(
    color: Ref<string>,
    options: UseSatelliteBlobsOptions = {},
) {
    const {
        count = 2,
        orbitRadius = 0.58,
        parentSize = 64,
        parentEl,
        orbitDuration = [8000, 14000],
        absorbedDuration = [2000, 4000],
        mergeDuration = 1800,
        emergeDuration = 2200,
        baseOpacity = 0.75,
    } = options;

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rng = mulberry32(hashString(color.value + "satellite"));

    const internals: SatelliteInternal[] = [];
    for (let i = 0; i < count; i++) {
        internals.push(createSatellite(rng, i, orbitRadius));
    }

    // Cursor avoidance
    const cursorState = createCursorState();
    let cleanupListeners: { onMouseMove: (e: MouseEvent) => void; onMouseLeave: () => void } | null = null;

    if (parentEl) {
        cleanupListeners = setupCursorTracking(parentEl, cursorState);
    }

    const satellites = ref<SatelliteState[]>(
        internals.map((s) => computeOutput(s, performance.now(), baseOpacity, parentSize, 0, 0)),
    );

    let lastMergeTime = -Infinity;
    const MERGE_STAGGER_MS = 3000;

    let rafId: number | null = null;
    let paused = false;

    function tick(now: number) {
        if (paused) {
            rafId = requestAnimationFrame(tick);
            return;
        }

        // Smooth cursor position
        smoothCursor(cursorState);

        const states: SatelliteState[] = [];
        for (let i = 0; i < count; i++) {
            const s = internals[i];

            // Always tick border-radius (smooth, independent of state)
            tickVertices(s, now, rng);

            const elapsed = now - s.phaseStart;
            const t = clamp01(s.phaseDuration > 0 ? elapsed / s.phaseDuration : 1);

            switch (s.phase) {
                case "orbiting": {
                    if (t >= 1) {
                        if (now - lastMergeTime < MERGE_STAGGER_MS) {
                            // Extend orbit, don't merge yet
                            s.phaseStart = now;
                            s.phaseDuration = randRange(rng, orbitDuration[0], orbitDuration[1]);
                        } else {
                            // Snapshot current position
                            const pos = orbitPos(s, now);
                            s.startX = pos.x;
                            s.startY = pos.y;
                            // Merge end: ~25% from center, same direction
                            const dist = Math.hypot(pos.x, pos.y);
                            const sc = dist > 0.01 ? 0.25 / dist : 0;
                            s.endX = pos.x * sc;
                            s.endY = pos.y * sc;
                            setPhase(s, "merging", now, mergeDuration);
                            lastMergeTime = now;
                        }
                    }
                    break;
                }
                case "merging": {
                    if (t >= 1) {
                        setPhase(
                            s,
                            "absorbed",
                            now,
                            randRange(rng, absorbedDuration[0], absorbedDuration[1]),
                        );
                    }
                    break;
                }
                case "absorbed": {
                    if (t >= 1) {
                        // Randomize new orbit params
                        randomizeOrbit(s, rng, orbitRadius, now);
                        // Future orbit position = emerge destination
                        const pos = orbitPos(s, now + 2000);
                        s.endX = pos.x;
                        s.endY = pos.y;
                        // Emerge start: ~25% from center toward destination
                        const dist = Math.hypot(pos.x, pos.y);
                        const sc = dist > 0.01 ? 0.25 / dist : 0;
                        s.startX = pos.x * sc;
                        s.startY = pos.y * sc;
                        setPhase(s, "emerging", now, emergeDuration);
                    }
                    break;
                }
                case "emerging": {
                    if (t >= 1) {
                        setPhase(
                            s,
                            "orbiting",
                            now,
                            randRange(rng, orbitDuration[0], orbitDuration[1]),
                        );
                    }
                    break;
                }
            }

            // Per-satellite cursor repulsion (only during orbiting/emerging)
            const { repX, repY } = computeRepulsion(s, now, cursorState);

            states.push(computeOutput(s, now, baseOpacity, parentSize, repX, repY));
        }

        satellites.value = states;
        rafId = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
    }

    // Reseed on color change
    watch(color, (c) => {
        rng = mulberry32(hashString(c + "satellite"));
    });

    onUnmounted(() => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        const el = parentEl?.value;
        if (el && cleanupListeners) {
            el.removeEventListener("mousemove", cleanupListeners.onMouseMove);
            el.removeEventListener("mouseleave", cleanupListeners.onMouseLeave);
        }
    });

    /** Nudge: retarget all satellite vertices + perturb orbit for a visible jiggle */
    function nudge() {
        const now = performance.now();
        for (const s of internals) {
            // Retarget border-radius vertices with short durations
            for (let i = 0; i < 8; i++) {
                const v = s.vertices[i];
                v.from = s.radii[i];
                v.to = 30 + rng() * 40;
                v.dur = 800 + rng() * 600; // fast jiggle (0.8-1.4s)
                v.start = now;
            }
            // Small angular kick — shifts orbit position slightly
            s.phaseOffset += (rng() - 0.5) * 0.4;
            // Bump perturbation phases for immediate path shift
            s.pertXPhase += rng() * Math.PI * 0.5;
            s.pertYPhase += rng() * Math.PI * 0.5;
        }
    }

    return {
        satellites,
        nudge,
        pause: () => {
            paused = true;
        },
        resume: () => {
            paused = false;
        },
    };
}
