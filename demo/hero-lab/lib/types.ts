export type MotionMode = "full" | "reduced";

export interface HeroPalettePreset {
    id: string;
    label: string;
    description: string;
    surface: string;
    surfaceAlt: string;
    shadow: string;
    tileStops: [string, string, string, string];
    atmosphereStops: [string, string, string, string];
}

export interface BaseHeroConfig {
    paletteId: string;
    speed: number;
    intensity: number;
    reducedMotion: boolean;
}

export interface AsciiTileConfig {
    tileSize: number;
    bands: number;
    patternDensity: number;
    ditherStrength: number;
    revealSpeed: number;
}

export interface TileHeroConfig extends BaseHeroConfig, AsciiTileConfig {
}

export interface AtmosphereHeroConfig extends BaseHeroConfig {
    blurRadius: number;
    blobCount: number;
}
