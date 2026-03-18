import type { HeroPalettePreset } from "./types";

export const HERO_PALETTES: HeroPalettePreset[] = [
    {
        id: "ember-glass",
        label: "Ember Glass",
        description: "Burnt orange over warm cream.",
        surface: "#fff8f0",
        surfaceAlt: "#f6eadc",
        shadow: "rgba(174, 94, 35, 0.18)",
        tileStops: ["#fff6e7", "#f5d4a3", "#dd8b3f", "#9d4317"],
        atmosphereStops: ["#ffe2bb", "#f7b979", "#d96b35", "#662615"],
    },
    {
        id: "sea-glass",
        label: "Sea Glass",
        description: "Teal and mint with cool glass bloom.",
        surface: "#effaf7",
        surfaceAlt: "#dff4ef",
        shadow: "rgba(34, 133, 128, 0.16)",
        tileStops: ["#f2fffb", "#afe8dd", "#4fc4b8", "#1d7978"],
        atmosphereStops: ["#dcfff6", "#9ce2da", "#3fb0c8", "#1f5e83"],
    },
    {
        id: "citrine-mist",
        label: "Citrine Mist",
        description: "Lemon haze with brass and smoke.",
        surface: "#fdf9ea",
        surfaceAlt: "#f4edd0",
        shadow: "rgba(132, 117, 32, 0.18)",
        tileStops: ["#fffced", "#f2dd88", "#c6a13d", "#68501f"],
        atmosphereStops: ["#fff6bf", "#eace67", "#b8872a", "#534018"],
    },
    {
        id: "night-studio",
        label: "Night Studio",
        description: "Graphite base with electric green-blue light.",
        surface: "#13161b",
        surfaceAlt: "#1c2129",
        shadow: "rgba(5, 8, 12, 0.45)",
        tileStops: ["#d9fff7", "#78d8cf", "#1da3ba", "#0c2230"],
        atmosphereStops: ["#9effdd", "#39d5c7", "#157cd6", "#080f19"],
    },
];
