export interface SatelliteState {
    /** translate3d + rotate + scale (GPU-composited, no layout thrash) */
    transform: string;
    opacity: number;
    borderRadius: string;
    phase: "orbiting" | "merging" | "absorbed" | "emerging";
}

export type Phase = SatelliteState["phase"];

export interface UseSatelliteBlobsOptions {
    count?: number;
    /** Base orbit distance as fraction of parent (default 0.58) */
    orbitRadius?: number;
    /** Parent element size in px (default 64 = w-16) */
    parentSize?: number;
    /** Ref to the parent element for cursor tracking (enables cursor avoidance) */
    parentEl?: import("vue").Ref<HTMLElement | null>;
    orbitDuration?: [number, number];
    absorbedDuration?: [number, number];
    mergeDuration?: number;
    emergeDuration?: number;
    baseOpacity?: number;
}

/** Per-vertex border-radius animation — runs continuously, decoupled from state machine */
export interface VertexAnim {
    from: number;
    to: number;
    start: number;
    dur: number;
}

export interface SatelliteInternal {
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
