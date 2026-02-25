export interface PaletteColor {
    css: string;
    name?: string;
    position: number;
}

export interface Palette {
    id: string;
    name: string;
    slug: string;
    colors: PaletteColor[];
    createdAt: string;
    updatedAt: string;
    isLocal: boolean;
}

export interface ProposedColorName {
    id: string;
    name: string;
    css: string;
    status: "proposed" | "approved" | "rejected";
    contributor?: string;
    createdAt: string;
    approvedAt?: string;
}

export interface PaletteStore {
    version: number;
    palettes: Palette[];
}
