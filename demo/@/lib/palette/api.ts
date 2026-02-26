import type { Palette, PaletteColor, ProposedColorName } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://mbabb.fi.ncsu.edu/colors";

interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}

// Session-aware request helper
let sessionToken: string | null = null;

export function setSessionToken(token: string) {
    sessionToken = token;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(init?.headers as Record<string, string>),
    };
    if (sessionToken) {
        headers["X-Session-Token"] = sessionToken;
    }
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers,
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json();
}

export function createSession(): Promise<{ token: string }> {
    return request("/sessions", { method: "POST" });
}

export function listPalettes(
    limit = 20,
    offset = 0,
    sort: "newest" | "popular" = "newest",
): Promise<PaginatedResponse<Palette>> {
    return request(`/palettes?limit=${limit}&offset=${offset}&sort=${sort}`);
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

export function votePalette(
    slug: string,
): Promise<{ voted: boolean; voteCount: number }> {
    return request(`/palettes/${encodeURIComponent(slug)}/vote`, {
        method: "POST",
    });
}

export function renamePalette(slug: string, name: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
    });
}

// Admin API helpers
async function adminRequest<T>(path: string, token: string, init?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(init?.headers as Record<string, string>),
    };
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers,
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json();
}

export function getAdminQueue(token: string): Promise<ProposedColorName[]> {
    return adminRequest("/admin/queue", token);
}

export function approveColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/approve`, token, { method: "POST" });
}

export function rejectColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/reject`, token, { method: "POST" });
}

export function featurePalette(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}/feature`, token, { method: "POST" });
}

export function deletePaletteAdmin(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}`, token, { method: "DELETE" });
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
