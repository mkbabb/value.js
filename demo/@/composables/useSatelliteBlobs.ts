import { ref, onUnmounted, type Ref, watch } from "vue";
import { mulberry32, hashString, radiiToCSS } from "./prng";

export interface SatelliteState {
    /** translate3d + rotate + scale (GPU-composited, no layout thrash) */
    transform: string;
    opacity: number;
    borderRadius: string;
    phase: "orbiting" | "merging" | "absorbed" | "emerging";
}

type Phase = SatelliteState["phase"];

export interface UseSatelliteBlobsOptions {
    count?: number;
    /** Base orbit distance as fraction of parent (default 0.58) */
    orbitRadius?: number;
    /** Parent element size in px (default 64 = w-16) */
    parentSize?: number;
    /** Ref to the parent element for cursor tracking (enables cursor avoidance) */
    parentEl?: Ref<HTMLElement | null>;
    orbitDuration?: [number, number];
    absorbedDuration?: [number, number];
    mergeDuration?: number;
    emergeDuration?: number;
    baseOpacity?: number;
}

/** Per-vertex border-radius animation — runs continuously, decoupled from state machine */
interface VertexAnim {
    from: number;
    to: number;
    start: number;
    dur: number;
}

interface SatelliteInternal {
    phase: Phase;
    phaseStart: number;
    phaseDuration: number;

    // Polar orbit base
    timeOrigin: number; // orbit time relative to this (so phaseOffset controls start position)
    angularSpeed: number;
    phaseOffset: number;
    baseRadius: number;

    // Multi-frequency wobble for organic, non-repeating paths
    wobbleAmp1: number;
    wobbleFreq1: number;
    wobbleAmp2: number;
    wobbleFreq2: number;
    pertXAmp: number;
    pertXFreq: number;
    pertXPhase: number;
    pertYAmp: number;
    pertYFreq: number;
    pertYPhase: number;

    // Merge/emerge endpoints (fraction of parent from center)
    startX: number;
    startY: number;
    endX: number;
    endY: number;

    // Continuous border-radius
    vertices: VertexAnim[];
    radii: number[];

    rotation: number;
    rotationSpeed: number;
}

/** Fast start, slow end — lingers near blob edge during emerge */
function easeOut(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

/** Slow start, fast end — lingers near blob edge then absorbed */
function easeIn(t: number): number {
    return t * t;
}

function randRange(rng: () => number, lo: number, hi: number): number {
    return lo + rng() * (hi - lo);
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function clamp01(t: number): number {
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

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

    // Cursor avoidance — track mouse as fraction of parentSize from parent center
    // Raw mouse position (updated on mousemove), smoothed position (lerped each frame)
    let cursorX = NaN; // NaN = cursor not tracked / outside parent
    let cursorY = NaN;
    let smoothCursorX = NaN;
    let smoothCursorY = NaN;
    const CURSOR_REPEL_RADIUS = 1.2; // fraction of parentSize — repulsion range
    const CURSOR_REPEL_STRENGTH = 0.25; // max displacement (fraction of parentSize)
    const CURSOR_SMOOTH = 0.08; // lerp factor per frame (~5 frames to settle)

    function onMouseMove(e: MouseEvent) {
        const el = parentEl?.value;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Divide by rendered size (includes CSS scale) to get same fractional
        // coordinate system as satellite positions (fraction of parentSize)
        cursorX = (e.clientX - cx) / rect.width;
        cursorY = (e.clientY - cy) / rect.height;
    }
    function onMouseLeave() {
        cursorX = NaN;
        cursorY = NaN;
    }

    if (parentEl) {
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
        if (Number.isNaN(cursorX)) {
            smoothCursorX = NaN;
            smoothCursorY = NaN;
        } else if (Number.isNaN(smoothCursorX)) {
            smoothCursorX = cursorX;
            smoothCursorY = cursorY;
        } else {
            smoothCursorX += (cursorX - smoothCursorX) * CURSOR_SMOOTH;
            smoothCursorY += (cursorY - smoothCursorY) * CURSOR_SMOOTH;
        }

        // Compute cursor repulsion offset (shared across satellites)
        let repelValid = !Number.isNaN(smoothCursorX);

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
            let repX = 0;
            let repY = 0;
            if (repelValid && (s.phase === "orbiting" || s.phase === "emerging")) {
                // Get current satellite position (fraction of parent)
                const pos = s.phase === "orbiting" ? orbitPos(s, now) : { x: lerp(s.startX, s.endX, clamp01((now - s.phaseStart) / s.phaseDuration)), y: lerp(s.startY, s.endY, clamp01((now - s.phaseStart) / s.phaseDuration)) };
                const dx = pos.x - smoothCursorX;
                const dy = pos.y - smoothCursorY;
                const dist = Math.hypot(dx, dy);
                if (dist < CURSOR_REPEL_RADIUS && dist > 0.01) {
                    // Inverse-linear falloff: strongest when close
                    const strength = CURSOR_REPEL_STRENGTH * (1 - dist / CURSOR_REPEL_RADIUS);
                    repX = (dx / dist) * strength;
                    repY = (dy / dist) * strength;
                }
            }

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
        if (el) {
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);
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

function createSatellite(
    rng: () => number,
    index: number,
    orbitRadius: number,
): SatelliteInternal {
    const now = performance.now();

    // Per-vertex border-radius animation (continuous, never resets)
    const vertices: VertexAnim[] = [];
    const radii: number[] = [];
    for (let i = 0; i < 8; i++) {
        const from = 30 + rng() * 40;
        radii.push(from);
        vertices.push({
            from,
            to: 30 + rng() * 40,
            start: now - rng() * 3000, // staggered phase
            dur: 2500 + rng() * 3000,
        });
    }

    // Starting angles: satellite 0 → bottom-left (~3π/4), satellite 1 → top-right (~7π/4)
    // In screen coords: cos = x (right+), sin = y (down+)
    // 3π/4 ≈ 135° → cos < 0 (left), sin > 0 (bottom)
    // 7π/4 ≈ 315° → cos > 0 (right), sin < 0 (top)
    const startAngles = [
        (3 * Math.PI) / 4 + (rng() - 0.5) * 0.5, // bottom-left ± ~14°
        (7 * Math.PI) / 4 + (rng() - 0.5) * 0.5, // top-right ± ~14°
    ];

    return {
        phase: "orbiting",
        phaseStart: now,
        phaseDuration: 8000 + rng() * 6000,

        timeOrigin: now,
        angularSpeed: 0.12 + rng() * 0.1, // ~28-57s per revolution (slower, smoother)
        phaseOffset: startAngles[index] ?? rng() * Math.PI * 2,
        baseRadius: orbitRadius * (0.92 + rng() * 0.16),

        // Two radius wobble terms at slow, incommensurate frequencies
        wobbleAmp1: 0.03 + rng() * 0.04,
        wobbleFreq1: 0.15 + rng() * 0.15, // 0.15-0.30 Hz (3-7s cycle)
        wobbleAmp2: 0.02 + rng() * 0.03,
        wobbleFreq2: 0.25 + rng() * 0.2, // 0.25-0.45 Hz (2-4s cycle)

        // Per-axis perturbation — very slow drift for non-circular path
        pertXAmp: 0.02 + rng() * 0.03,
        pertXFreq: 0.1 + rng() * 0.12, // 0.10-0.22 Hz (5-10s cycle)
        pertXPhase: rng() * Math.PI * 2,
        pertYAmp: 0.02 + rng() * 0.03,
        pertYFreq: 0.12 + rng() * 0.12, // 0.12-0.24 Hz (4-8s cycle)
        pertYPhase: rng() * Math.PI * 2,

        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,

        vertices,
        radii,

        rotation: rng() * 360,
        rotationSpeed: 2 + rng() * 4, // 2-6 deg/s (slower, less distracting)
    };
}

function randomizeOrbit(
    s: SatelliteInternal,
    rng: () => number,
    orbitRadius: number,
    now: number,
) {
    s.timeOrigin = now;
    s.angularSpeed = 0.12 + rng() * 0.1;
    s.phaseOffset = rng() * Math.PI * 2;
    s.baseRadius = orbitRadius * (0.92 + rng() * 0.16);
    s.wobbleAmp1 = 0.03 + rng() * 0.04;
    s.wobbleFreq1 = 0.15 + rng() * 0.15;
    s.wobbleAmp2 = 0.02 + rng() * 0.03;
    s.wobbleFreq2 = 0.25 + rng() * 0.2;
    s.pertXAmp = 0.02 + rng() * 0.03;
    s.pertXFreq = 0.1 + rng() * 0.12;
    s.pertXPhase = rng() * Math.PI * 2;
    s.pertYAmp = 0.02 + rng() * 0.03;
    s.pertYFreq = 0.12 + rng() * 0.12;
    s.pertYPhase = rng() * Math.PI * 2;
}

function setPhase(
    s: SatelliteInternal,
    phase: Phase,
    now: number,
    duration: number,
) {
    s.phase = phase;
    s.phaseStart = now;
    s.phaseDuration = duration;
}

/** Continuous per-vertex border-radius animation — never resets at phase boundaries */
function tickVertices(
    s: SatelliteInternal,
    now: number,
    rng: () => number,
) {
    for (let i = 0; i < 8; i++) {
        const v = s.vertices[i];
        let t = (now - v.start) / v.dur;
        if (t >= 1) {
            v.from = v.to;
            v.to = 30 + rng() * 40;
            v.dur = 2500 + rng() * 3000;
            v.start = now;
            t = 0;
        }
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * t);
        s.radii[i] = v.from + ease * (v.to - v.from);
    }
}

/**
 * Organic polar orbit with multi-frequency wobble.
 * Returns position as fraction of parent from center (e.g. 0.72 = 72% of parent size).
 */
function orbitPos(
    s: SatelliteInternal,
    now: number,
): { x: number; y: number } {
    const t = (now - s.timeOrigin) / 1000;
    const angle = s.angularSpeed * t + s.phaseOffset;
    const r =
        s.baseRadius +
        s.wobbleAmp1 * Math.sin(s.wobbleFreq1 * t) +
        s.wobbleAmp2 * Math.sin(s.wobbleFreq2 * t + 1.3);
    const x =
        r * Math.cos(angle) +
        s.pertXAmp * Math.sin(s.pertXFreq * t + s.pertXPhase);
    const y =
        r * Math.sin(angle) +
        s.pertYAmp * Math.cos(s.pertYFreq * t + s.pertYPhase);
    return { x, y };
}

function computeOutput(
    s: SatelliteInternal,
    now: number,
    baseOpacity: number,
    parentSize: number,
    repelX: number,
    repelY: number,
): SatelliteState {
    const elapsed = now - s.phaseStart;
    const t = clamp01(
        s.phaseDuration > 0 ? elapsed / s.phaseDuration : 1,
    );

    let x: number; // fraction of parent from center
    let y: number;
    let opacity: number;
    let scale: number;

    switch (s.phase) {
        case "orbiting": {
            const pos = orbitPos(s, now);
            x = pos.x;
            y = pos.y;
            opacity = baseOpacity;
            scale = 1;
            break;
        }
        case "merging": {
            // ease-in: linger near blob edge, then quickly absorbed
            const ease = easeIn(t);
            x = lerp(s.startX, s.endX, ease);
            y = lerp(s.startY, s.endY, ease);
            // Stay opaque through the merge so gooey filter can bridge,
            // quick fade only in final 15%
            opacity =
                t > 0.85
                    ? lerp(baseOpacity, 0, (t - 0.85) / 0.15)
                    : baseOpacity;
            scale = lerp(1, 0.65, ease);
            break;
        }
        case "absorbed": {
            x = 0;
            y = 0;
            opacity = 0;
            scale = 0.5;
            break;
        }
        case "emerging": {
            // ease-out: fast exit from center, slow near edge = max gooey stretch time
            const ease = easeOut(t);
            x = lerp(s.startX, s.endX, ease);
            y = lerp(s.startY, s.endY, ease);
            // Quick opacity ramp-up at start, then fully opaque for gooey bridge
            opacity =
                t < 0.1
                    ? lerp(0, baseOpacity, t / 0.1)
                    : baseOpacity;
            scale = lerp(0.65, 1, ease);
            break;
        }
    }

    // Apply cursor repulsion + convert fraction → pixels for translate3d
    const px = (x + repelX) * parentSize;
    const py = (y + repelY) * parentSize;
    const rotation = s.rotation + (now / 1000) * s.rotationSpeed;

    return {
        transform: `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) rotate(${(rotation % 360).toFixed(1)}deg) scale(${scale.toFixed(3)})`,
        opacity: Math.round(opacity * 1000) / 1000,
        borderRadius: radiiToCSS(s.radii),
        phase: s.phase,
    };
}
