/**
 * HTTP client infrastructure shared by every palette-API sub-module.
 *
 * Exposes the two transport primitives consumed across the surface:
 *   - `request<T>(path, init?)` — session-token JSON fetch
 *   - `adminRequest<T>(path, token, init?)` — bearer-token admin JSON fetch
 *
 * Owns the in-module `sessionToken` cell; `setSessionToken` is re-exported
 * through the `sessions` sub-module + the top-level barrel for API parity
 * with the pre-decomposition `api.ts` surface.
 *
 * H.W3 Lane A — extracted from the 484-LoC `api.ts` god module.
 */

const DEFAULT_REMOTE_API_URL = "https://mbabb.fi.ncsu.edu/colors";
export const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;

let sessionToken: string | null = null;

export function setSessionToken(token: string | null) {
    sessionToken = token;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
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

export async function adminRequest<T>(
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
