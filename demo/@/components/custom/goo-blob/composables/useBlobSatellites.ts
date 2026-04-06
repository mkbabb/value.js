import { mulberry32, hashString } from "@composables/prng";
import type { BlobConfig, MetaballSource, MoodParams, SatelliteInternal, SatellitePhase } from "../types";

function randRange(rng: () => number, lo: number, hi: number): number {
    return lo + rng() * (hi - lo);
}

function clamp01(t: number): number {
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

function easeIn(t: number): number {
    return t * t;
}

function easeOut(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function createSatellite(
    rng: () => number,
    index: number,
    orbitRadius: number,
): SatelliteInternal {
    const now = performance.now();
    const startAngles = [
        (3 * Math.PI) / 4 + (rng() - 0.5) * 0.5,
        (7 * Math.PI) / 4 + (rng() - 0.5) * 0.5,
        Math.PI / 4 + (rng() - 0.5) * 0.5,
        (5 * Math.PI) / 4 + (rng() - 0.5) * 0.5,
    ];

    return {
        phase: "orbiting",
        phaseStart: now,
        phaseDuration: 8000 + rng() * 6000,

        timeOrigin: now,
        angularSpeed: 0.12 + rng() * 0.1,
        phaseOffset: startAngles[index] ?? rng() * Math.PI * 2,
        baseRadius: orbitRadius * (0.92 + rng() * 0.16),

        wobbleAmp1: 0.03 + rng() * 0.04,
        wobbleFreq1: 0.15 + rng() * 0.15,
        wobbleAmp2: 0.02 + rng() * 0.03,
        wobbleFreq2: 0.25 + rng() * 0.2,

        pertXAmp: 0.02 + rng() * 0.03,
        pertXFreq: 0.1 + rng() * 0.12,
        pertXPhase: rng() * Math.PI * 2,
        pertYAmp: 0.02 + rng() * 0.03,
        pertYFreq: 0.12 + rng() * 0.12,
        pertYPhase: rng() * Math.PI * 2,

        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    };
}

function setPhase(
    s: SatelliteInternal,
    phase: SatellitePhase,
    now: number,
    duration: number,
) {
    s.phase = phase;
    s.phaseStart = now;
    s.phaseDuration = duration;
}

function orbitPos(s: SatelliteInternal, now: number): { x: number; y: number } {
    const t = (now - s.timeOrigin) / 1000;
    const angle = s.angularSpeed * t + s.phaseOffset;
    const r =
        s.baseRadius +
        s.wobbleAmp1 * Math.sin(s.wobbleFreq1 * t) +
        s.wobbleAmp2 * Math.sin(s.wobbleFreq2 * t + 1.3);
    return {
        x: r * Math.cos(angle) + s.pertXAmp * Math.sin(s.pertXFreq * t + s.pertXPhase),
        y: r * Math.sin(angle) + s.pertYAmp * Math.cos(s.pertYFreq * t + s.pertYPhase),
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

const BASE_OPACITY = 0.75;

export function useBlobSatellites(config: BlobConfig, initialColor: string) {
    let rng = mulberry32(hashString(initialColor + "goo"));
    const internals: SatelliteInternal[] = [];
    const sources: MetaballSource[] = [];

    let lastMergeTime = -Infinity;
    const MERGE_STAGGER_MS = 3000;

    /** Ensure internals/sources arrays match the current config count */
    function syncCount() {
        const count = config.satelliteCount;
        // Add new satellites
        while (internals.length < count) {
            internals.push(createSatellite(rng, internals.length, config.orbitRadius));
            sources.push({ x: 0, y: 0, radius: config.satelliteRadius, opacity: 0 });
        }
        // Remove excess (from the end)
        if (internals.length > count) {
            internals.length = count;
            sources.length = count;
        }
    }

    // Initial population
    syncCount();

    function tick(now: number, mood: MoodParams) {
        syncCount();

        const count = internals.length;
        const mergeRateScale = mood.mergeRate;
        const orbitRadius = config.orbitRadius;
        const satelliteRadius = config.satelliteRadius;
        const mergeDuration = config.mergeDuration;
        const emergeDuration = config.emergeDuration;
        const orbitDuration = config.orbitDuration;
        const absorbedDuration = config.absorbedDuration;

        for (let i = 0; i < count; i++) {
            const s = internals[i]!;
            const elapsed = now - s.phaseStart;
            const t = clamp01(s.phaseDuration > 0 ? elapsed / s.phaseDuration : 1);

            switch (s.phase) {
                case "orbiting": {
                    if (t >= 1) {
                        if (now - lastMergeTime < MERGE_STAGGER_MS * mergeRateScale) {
                            s.phaseStart = now;
                            s.phaseDuration = randRange(rng, orbitDuration[0], orbitDuration[1]);
                        } else {
                            const pos = orbitPos(s, now);
                            s.startX = pos.x;
                            s.startY = pos.y;
                            const dist = Math.hypot(pos.x, pos.y);
                            const sc = dist > 0.01 ? 0.08 / dist : 0;
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
                        setPhase(s, "absorbed", now, randRange(rng, absorbedDuration[0], absorbedDuration[1]));
                    }
                    break;
                }
                case "absorbed": {
                    if (t >= 1) {
                        randomizeOrbit(s, rng, orbitRadius, now);
                        const pos = orbitPos(s, now + 2000);
                        s.endX = pos.x;
                        s.endY = pos.y;
                        const dist = Math.hypot(pos.x, pos.y);
                        const sc = dist > 0.01 ? 0.08 / dist : 0;
                        s.startX = pos.x * sc;
                        s.startY = pos.y * sc;
                        setPhase(s, "emerging", now, emergeDuration);
                    }
                    break;
                }
                case "emerging": {
                    if (t >= 1) {
                        setPhase(s, "orbiting", now, randRange(rng, orbitDuration[0], orbitDuration[1]));
                    }
                    break;
                }
            }

            // Compute output
            let x: number, y: number, opacity: number, scale: number;

            switch (s.phase) {
                case "orbiting": {
                    const pos = orbitPos(s, now);
                    x = pos.x;
                    y = pos.y;
                    opacity = BASE_OPACITY;
                    scale = 1;
                    break;
                }
                case "merging": {
                    const ease = easeIn(clamp01((now - s.phaseStart) / s.phaseDuration));
                    x = lerp(s.startX, s.endX, ease);
                    y = lerp(s.startY, s.endY, ease);
                    const mt = clamp01((now - s.phaseStart) / s.phaseDuration);
                    opacity = mt > 0.85 ? lerp(BASE_OPACITY, 0, (mt - 0.85) / 0.15) : BASE_OPACITY;
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
                    const ease = easeOut(clamp01((now - s.phaseStart) / s.phaseDuration));
                    x = lerp(s.startX, s.endX, ease);
                    y = lerp(s.startY, s.endY, ease);
                    const et = clamp01((now - s.phaseStart) / s.phaseDuration);
                    opacity = et < 0.1 ? lerp(0, BASE_OPACITY, et / 0.1) : BASE_OPACITY;
                    scale = lerp(0.65, 1, ease);
                    break;
                }
            }

            const src = sources[i]!;
            src.x = x;
            src.y = y;
            src.radius = satelliteRadius * scale;
            src.opacity = opacity;
        }
    }

    function nudge() {
        for (const s of internals) {
            s.phaseOffset += (rng() - 0.5) * 0.4;
            s.pertXPhase += rng() * Math.PI * 0.5;
            s.pertYPhase += rng() * Math.PI * 0.5;
        }
    }

    function reseed(color: string) {
        rng = mulberry32(hashString(color + "goo"));
    }

    return { sources, tick, nudge, reseed };
}
