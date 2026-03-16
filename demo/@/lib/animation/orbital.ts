import { radiiToCSS } from "@composables/prng";
import type { SatelliteInternal, SatelliteState, Phase, VertexAnim } from "./satellite-types";

/** Fast start, slow end — lingers near blob edge during emerge */
export function easeOut(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

/** Slow start, fast end — lingers near blob edge then absorbed */
export function easeIn(t: number): number {
    return t * t;
}

export function randRange(rng: () => number, lo: number, hi: number): number {
    return lo + rng() * (hi - lo);
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function clamp01(t: number): number {
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

export function createSatellite(
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

export function randomizeOrbit(
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

export function setPhase(
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
export function tickVertices(
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
export function orbitPos(
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

export function computeOutput(
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
