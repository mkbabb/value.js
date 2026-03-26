import type {
    Palette,
    PaletteColor,
    PaletteVersion,
    ProvenanceNode,
    ProposedColorName,
    User,
    Tag,
    FlaggedPalette,
    AuditEntry,
    PaginatedResponse,
    CursorPaginatedResponse,
} from "./types";

const DEFAULT_REMOTE_API_URL = "https://mbabb.fi.ncsu.edu/colors";
const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;

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

async function adminRequest<T>(
    path: string,
    token: string,
    init?: RequestInit,
): Promise<T> {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        ...(init?.headers as Record<string, string>),
    };
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

// ============================================================
// SESSIONS
// ============================================================

export function createSession(): Promise<{ token: string; userSlug: string }> {
    return request("/sessions", { method: "POST" });
}

export function loginWithSlug(slug: string): Promise<{ token: string; userSlug: string }> {
    return request("/sessions/login", {
        method: "POST",
        body: JSON.stringify({ slug }),
    });
}

export function deleteSession(): Promise<{ ok: boolean }> {
    return request("/sessions", { method: "DELETE" });
}

export function getMe(): Promise<{ userSlug: string; createdAt: string }> {
    return request("/sessions/me");
}

// ============================================================
// PALETTES — CRUD
// ============================================================

export interface ListPalettesOptions {
    limit?: number;
    offset?: number;
    cursor?: string;
    sort?: "newest" | "popular" | "most-forked";
    q?: string;
    status?: string;
    tags?: string[];
    userSlug?: string;
    colorL?: number;
    colorA?: number;
    colorB?: number;
    colorRadius?: number;
}

export function listPalettes(
    opts: ListPalettesOptions = {},
): Promise<PaginatedResponse<Palette> | CursorPaginatedResponse<Palette>> {
    const params = new URLSearchParams();
    if (opts.limit) params.set("limit", String(opts.limit));
    if (opts.offset != null && !opts.cursor) params.set("offset", String(opts.offset));
    if (opts.cursor) params.set("cursor", opts.cursor);
    if (opts.sort) params.set("sort", opts.sort);
    if (opts.q) params.set("q", opts.q);
    if (opts.status) params.set("status", opts.status);
    if (opts.tags?.length) params.set("tags", opts.tags.join(","));
    if (opts.userSlug) params.set("userSlug", opts.userSlug);
    if (opts.colorL != null) params.set("colorL", String(opts.colorL));
    if (opts.colorA != null) params.set("colorA", String(opts.colorA));
    if (opts.colorB != null) params.set("colorB", String(opts.colorB));
    if (opts.colorRadius != null) params.set("colorRadius", String(opts.colorRadius));
    return request(`/palettes?${params}`);
}

export function getMyPalettes(
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<Palette>> {
    return request(`/palettes/mine?limit=${limit}&offset=${offset}`);
}

export function getPalette(slug: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`);
}

export function publishPalette(palette: {
    name: string;
    slug: string;
    colors: PaletteColor[];
    tags?: string[];
}): Promise<Palette> {
    return request("/palettes", {
        method: "POST",
        body: JSON.stringify(palette),
    });
}

export function updatePalette(
    slug: string,
    update: { name?: string; colors?: PaletteColor[]; tags?: string[] },
): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        body: JSON.stringify(update),
    });
}

export function renamePalette(slug: string, name: string): Promise<Palette> {
    return updatePalette(slug, { name });
}

export function votePalette(slug: string): Promise<{ voted: boolean; voteCount: number }> {
    return request(`/palettes/${encodeURIComponent(slug)}/vote`, { method: "POST" });
}

export function deletePaletteUser(slug: string): Promise<{ deleted: boolean }> {
    return request(`/palettes/${encodeURIComponent(slug)}`, { method: "DELETE" });
}

// ============================================================
// VERSIONING
// ============================================================

export function listVersions(
    slug: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<PaletteVersion>> {
    return request(`/palettes/${encodeURIComponent(slug)}/versions?limit=${limit}&offset=${offset}`);
}

export function getVersion(slug: string, hash: string): Promise<PaletteVersion> {
    return request(`/palettes/${encodeURIComponent(slug)}/versions/${encodeURIComponent(hash)}`);
}

export function revertPalette(slug: string, hash: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
        method: "POST",
        body: JSON.stringify({ hash }),
    });
}

// ============================================================
// FORKING / PROVENANCE
// ============================================================

export function forkPalette(
    slug: string,
    name?: string,
    forkSlug?: string,
): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/fork`, {
        method: "POST",
        body: JSON.stringify({ name, slug: forkSlug }),
    });
}

export function listForks(
    slug: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<Palette>> {
    return request(`/palettes/${encodeURIComponent(slug)}/forks?limit=${limit}&offset=${offset}`);
}

export function getProvenance(slug: string): Promise<ProvenanceNode[]> {
    return request(`/palettes/${encodeURIComponent(slug)}/provenance`);
}

// ============================================================
// FLAGGING
// ============================================================

export function flagPalette(
    slug: string,
    reason: string,
    detail?: string,
): Promise<{ flagged: boolean }> {
    return request(`/palettes/${encodeURIComponent(slug)}/flag`, {
        method: "POST",
        body: JSON.stringify({ reason, detail }),
    });
}

// ============================================================
// COLORS
// ============================================================

export function getApprovedColorNames(
    limit?: number,
    offset?: number,
): Promise<PaginatedResponse<ProposedColorName>> {
    const params = new URLSearchParams();
    if (limit != null) params.set("limit", String(limit));
    if (offset != null) params.set("offset", String(offset));
    const qs = params.toString();
    return request(`/colors/approved${qs ? `?${qs}` : ""}`);
}

export function searchColorNames(
    q: string,
    limit = 10,
): Promise<{ data: ProposedColorName[] }> {
    return request(`/colors/search?q=${encodeURIComponent(q)}&limit=${limit}`);
}

export function getTags(): Promise<Tag[]> {
    return request("/colors/tags");
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

// ============================================================
// ADMIN — COLORS
// ============================================================

export function getAdminQueue(
    token: string,
    limit = 50,
    offset = 0,
): Promise<PaginatedResponse<ProposedColorName>> {
    return adminRequest(`/admin/queue?limit=${limit}&offset=${offset}`, token);
}

export function approveColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/approve`, token, { method: "POST" });
}

export function rejectColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/reject`, token, { method: "POST" });
}

export function getApprovedColorNamesAdmin(
    token: string,
    limit = 50,
    offset = 0,
): Promise<PaginatedResponse<ProposedColorName>> {
    return adminRequest(`/admin/colors/approved?limit=${limit}&offset=${offset}`, token);
}

export function deleteColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}`, token, { method: "DELETE" });
}

// ============================================================
// ADMIN — PALETTES
// ============================================================

export function featurePalette(
    token: string,
    slug: string,
): Promise<{ slug: string; status: string }> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}/feature`, token, { method: "POST" });
}

export function deletePaletteAdmin(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}`, token, { method: "DELETE" });
}

// ============================================================
// ADMIN — USERS
// ============================================================

export function listUsers(
    token: string,
    limit = 20,
    offset = 0,
    q?: string,
): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (q) params.set("q", q);
    return adminRequest(`/admin/users?${params}`, token);
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

export function setUserStatus(
    token: string,
    slug: string,
    status: "active" | "suspended",
): Promise<{ slug: string; status: string }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/status`, token, {
        method: "POST",
        body: JSON.stringify({ status }),
    });
}

export function deleteUser(
    token: string,
    slug: string,
): Promise<{ deleted: boolean; palettesDeleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}`, token, { method: "DELETE" });
}

export function deleteUserPalettes(token: string, slug: string): Promise<{ deleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/palettes`, token, { method: "DELETE" });
}

export function pruneEmptyUsers(token: string): Promise<{ pruned: number }> {
    return adminRequest("/admin/users/prune-empty", token, { method: "POST" });
}

export function importPalettes(
    token: string,
    slug: string,
    palettes: { name: string; slug: string; colors: { css: string; name?: string; position: number }[] }[],
): Promise<{ imported: number; errors: string[] }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/import`, token, {
        method: "POST",
        body: JSON.stringify({ palettes }),
    });
}

// ============================================================
// ADMIN — BATCH ACTIONS
// ============================================================

export function batchPaletteAction(
    token: string,
    action: "delete" | "feature" | "unfeature",
    slugs: string[],
): Promise<{ processed: number }> {
    return adminRequest("/admin/batch/palettes", token, {
        method: "POST",
        body: JSON.stringify({ action, slugs }),
    });
}

export function batchUserAction(
    token: string,
    action: "delete" | "suspend" | "unsuspend",
    slugs: string[],
): Promise<{ processed: number }> {
    return adminRequest("/admin/batch/users", token, {
        method: "POST",
        body: JSON.stringify({ action, slugs }),
    });
}

// ============================================================
// ADMIN — TAGS
// ============================================================

export function getAdminTags(token: string): Promise<Tag[]> {
    return adminRequest("/admin/tags", token);
}

export function createTag(
    token: string,
    name: string,
    category: string,
): Promise<Tag> {
    return adminRequest("/admin/tags", token, {
        method: "POST",
        body: JSON.stringify({ name, category }),
    });
}

export function deleteTag(token: string, name: string): Promise<{ deleted: boolean }> {
    return adminRequest(`/admin/tags/${encodeURIComponent(name)}`, token, { method: "DELETE" });
}

// ============================================================
// ADMIN — FLAGGED PALETTES
// ============================================================

export function getFlaggedPalettes(
    token: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<FlaggedPalette>> {
    return adminRequest(`/admin/flagged?limit=${limit}&offset=${offset}`, token);
}

export function dismissFlags(
    token: string,
    paletteSlug: string,
): Promise<{ dismissed: number }> {
    return adminRequest(`/admin/flags/${encodeURIComponent(paletteSlug)}`, token, { method: "DELETE" });
}

// ============================================================
// ADMIN — AUDIT LOG
// ============================================================

export interface AuditLogOptions {
    action?: string;
    after?: string;
    before?: string;
    target?: string;
    limit?: number;
    offset?: number;
}

export function getAuditLog(
    token: string,
    opts: AuditLogOptions = {},
): Promise<PaginatedResponse<AuditEntry>> {
    const params = new URLSearchParams();
    if (opts.limit != null) params.set("limit", String(opts.limit));
    if (opts.offset != null) params.set("offset", String(opts.offset));
    if (opts.action) params.set("action", opts.action);
    if (opts.after) params.set("after", opts.after);
    if (opts.before) params.set("before", opts.before);
    if (opts.target) params.set("target", opts.target);
    return adminRequest(`/admin/audit?${params}`, token);
}
