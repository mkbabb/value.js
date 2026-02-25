import type { Palette, PaletteColor, ProposedColorName } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://mbabb.fi.ncsu.edu/colors";

interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json();
}

export function listPalettes(limit = 20, offset = 0): Promise<PaginatedResponse<Palette>> {
    return request(`/palettes?limit=${limit}&offset=${offset}`);
}

export function getPalette(slug: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`);
}

export function publishPalette(
    palette: { name: string; slug: string; colors: PaletteColor[] },
): Promise<Palette> {
    return request("/palettes", {
        method: "POST",
        body: JSON.stringify(palette),
    });
}

export function getApprovedColorNames(): Promise<ProposedColorName[]> {
    return request("/colors/approved");
}

export function proposeColorName(
    name: string,
    css: string,
    contributor?: string,
): Promise<ProposedColorName> {
    return request("/colors/propose", {
        method: "POST",
        body: JSON.stringify({ name, css, contributor }),
    });
}
