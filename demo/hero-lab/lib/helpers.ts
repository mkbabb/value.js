import type { HeroPalettePreset, TileHeroConfig } from "./types";

export function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function hexToRgb(hex: string): [number, number, number] {
    const normalized = hex.replace("#", "");
    const safeHex =
        normalized.length === 3
            ? normalized
                  .split("")
                  .map((part) => `${part}${part}`)
                  .join("")
            : normalized;

    const value = Number.parseInt(safeHex, 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function hexToRgbUnit(hex: string): [number, number, number] {
    const [r, g, b] = hexToRgb(hex);
    return [r / 255, g / 255, b / 255];
}

export function rgba(hex: string, alpha: number): string {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mixHex(a: string, b: string, t: number): string {
    const [ar, ag, ab] = hexToRgb(a);
    const [br, bg, bb] = hexToRgb(b);
    const toHex = (value: number) =>
        Math.round(value)
            .toString(16)
            .padStart(2, "0");

    return `#${toHex(lerp(ar, br, t))}${toHex(lerp(ag, bg, t))}${toHex(lerp(ab, bb, t))}`;
}

export function sampleGradient(stops: readonly string[], t: number): string {
    const safeT = clamp(t, 0, 0.9999);
    const segmentWidth = 1 / (stops.length - 1);
    const index = Math.min(stops.length - 2, Math.floor(safeT / segmentWidth));
    const localT = (safeT - index * segmentWidth) / segmentWidth;

    return mixHex(stops[index]!, stops[index + 1]!, localT);
}

export const ASCII_PATTERNS: ReadonlyArray<readonly number[]> = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const BAYER_4X4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
] as const;

export interface AsciiTileSample {
    field: number;
    reveal: number;
    quantized: number;
    band: number;
    pattern: readonly number[];
}

export function createTileField(
    x: number,
    y: number,
    time: number,
    intensity: number,
    speed: number,
): number {
    const t = time * speed * 0.001;
    const waveA = Math.sin(x * 6.5 + t * 1.4);
    const waveB = Math.cos(y * 8.25 - t * 1.15);
    const waveC = Math.sin((x + y) * 7.2 - t * 0.7);
    const waveD = Math.cos((x - y) * 5.4 + t * 1.75);
    const value = (waveA + waveB + waveC * 0.85 + waveD * 0.6) / 3.45;
    return clamp(0.5 + value * 0.5 * intensity, 0, 1);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
}

export function createRevealMask(
    x: number,
    y: number,
    time: number,
    speed: number,
    revealSpeed: number,
): number {
    const sweep = (time * 0.00012 * speed * revealSpeed + x * 0.95 + y * 0.34) % 1;
    const head = smoothstep(0.04, 0.24, sweep);
    const tail = 1 - smoothstep(0.62, 0.95, sweep);
    return clamp(0.26 + head * 0.58 + tail * 0.16, 0, 1);
}

export function sampleBayer4(x: number, y: number): number {
    return BAYER_4X4[y % 4]![x % 4]! / 15;
}

export function createAsciiTileSample(
    col: number,
    row: number,
    cols: number,
    rows: number,
    time: number,
    config: Pick<TileHeroConfig, "intensity" | "speed" | "bands" | "patternDensity" | "ditherStrength" | "revealSpeed">,
): AsciiTileSample {
    const nx = cols > 1 ? col / (cols - 1) : 0;
    const ny = rows > 1 ? row / (rows - 1) : 0;
    const field = createTileField(nx, ny, time, config.intensity, config.speed);
    const reveal = createRevealMask(nx, ny, time, config.speed, config.revealSpeed);
    const bands = Math.max(3, Math.round(config.bands));
    const rawBand = field * (bands - 1);
    const dither = (sampleBayer4(col, row) - 0.5) * config.ditherStrength;
    const band = clamp(Math.round(rawBand + dither + reveal * 0.35), 0, bands - 1);
    const quantized = band / Math.max(1, bands - 1);
    const densityT = clamp(config.patternDensity, 0.35, 1);
    const patternIndex = clamp(
        Math.round((quantized * 0.82 + reveal * 0.18) * (ASCII_PATTERNS.length - 1) * densityT),
        0,
        ASCII_PATTERNS.length - 1,
    );

    return {
        field,
        reveal,
        quantized,
        band,
        pattern: ASCII_PATTERNS[patternIndex]!,
    };
}

export function getMotionScale(reducedMotion: boolean): number {
    return reducedMotion ? 0.22 : 1;
}

export function getVisualCapabilityProfile() {
    if (typeof window === "undefined") {
        return {
            isSafari: false,
            isLowPower: false,
            dprMax: 2,
            blurScale: 1,
        };
    }

    const userAgent = navigator.userAgent;
    const isSafari = /Safari/i.test(userAgent) && !/Chrom(e|ium)|Android/i.test(userAgent);
    const lowPowerCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowMemory = typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number"
        && ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const isLowPower = lowPowerCpu || lowMemory || coarsePointer;

    return {
        isSafari,
        isLowPower,
        dprMax: isSafari || isLowPower ? 1.6 : 2,
        blurScale: isSafari || isLowPower ? 0.82 : 1,
    };
}

export function createFpsReporter(callback: (fps: number) => void) {
    let previous = performance.now();
    let frames = 0;
    let accumulator = 0;

    return () => {
        const now = performance.now();
        accumulator += now - previous;
        previous = now;
        frames += 1;

        if (accumulator >= 600) {
            callback(Math.round((frames / accumulator) * 1000));
            accumulator = 0;
            frames = 0;
        }
    };
}

export function createHeroBackground(palette: HeroPalettePreset): string {
    return `linear-gradient(145deg, ${palette.surface} 0%, ${palette.surfaceAlt} 100%)`;
}
