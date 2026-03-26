import type { Palette, PaletteColor, ProposedColorName, User } from "./types";

const DEFAULT_REMOTE_API_URL = "https://mbabb.fi.ncsu.edu/colors";
const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;

interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}

// Session-aware request helper
let sessionToken: string | null = null;

export function setSessionToken(token: string | null) {
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
        if (res.status === 401) {
            sessionToken = null;
        }
        const body = await res.text().catch(() => "");
        throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json();
}

export function deleteSession(): Promise<{ ok: boolean }> {
    return request("/sessions", { method: "DELETE" });
}

export function createSession(): Promise<{ token: string; userSlug: string }> {
    return request("/sessions", { method: "POST" });
}

export function loginWithSlug(slug: string): Promise<{ token: string; userSlug: string }> {
    return request("/sessions/login", {
        method: "POST",
        body: JSON.stringify({ slug }),
    });
}

export function getMe(): Promise<{ userSlug: string; createdAt: string }> {
    return request("/sessions/me");
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

export function publishPalette(palette: {
    name: string;
    slug: string;
    colors: PaletteColor[];
}): Promise<Palette> {
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

export function deletePaletteUser(slug: string): Promise<{ deleted: boolean }> {
    return request(`/palettes/${encodeURIComponent(slug)}`, {
        method: "DELETE",
    });
}

export function renamePalette(slug: string, name: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
    });
}

// Admin API helpers
async function adminRequest<T>(
    path: string,
    token: string,
    init?: RequestInit,
): Promise<T> {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        ...(init?.headers as Record<string, string>),
    };
    // Only set Content-Type for requests with a body
    if (init?.body) {
        headers["Content-Type"] = "application/json";
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

export function getAdminQueue(token: string): Promise<ProposedColorName[]> {
    return adminRequest("/admin/queue", token);
}

export function approveColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/approve`, token, {
        method: "POST",
    });
}

export function rejectColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/reject`, token, {
        method: "POST",
    });
}

export function getApprovedColorNamesAdmin(token: string): Promise<ProposedColorName[]> {
    return adminRequest("/admin/colors/approved", token);
}

export function deleteColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
    });
}

export function featurePalette(token: string, slug: string): Promise<{ slug: string; status: string }> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}/feature`, token, {
        method: "POST",
    });
}

export function deletePaletteAdmin(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}`, token, {
        method: "DELETE",
    });
}

export function listUsers(
    token: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<User>> {
    return adminRequest(`/admin/users?limit=${limit}&offset=${offset}`, token);
}

export function getUserPalettes(token: string, slug: string): Promise<Palette[]> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/palettes`, token);
}

export function impersonateUser(
    token: string,
    slug: string,
): Promise<{ token: string; userSlug: string }> {
    return adminRequest("/admin/impersonate", token, {
        method: "POST",
        body: JSON.stringify({ slug }),
    });
}

export function importPalettes(
    token: string,
    slug: string,
    palettes: { name: string; slug: string; colors: { css: string; name?: string; position: number }[] }[],
): Promise<{ imported: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/import`, token, {
        method: "POST",
        body: JSON.stringify({ palettes }),
    });
}

export function pruneEmptyUsers(token: string): Promise<{ pruned: number }> {
    return adminRequest("/admin/users/prune-empty", token, {
        method: "POST",
    });
}

export function deleteUser(token: string, slug: string): Promise<{ deleted: boolean; palettesDeleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}`, token, {
        method: "DELETE",
    });
}

export function deleteUserPalettes(token: string, slug: string): Promise<{ deleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/palettes`, token, {
        method: "DELETE",
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
