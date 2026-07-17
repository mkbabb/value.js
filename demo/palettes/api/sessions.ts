/**
 * Session lifecycle endpoints.
 *
 * Anonymous-first session model: `createSession` mints a new user + token;
 * `loginWithSlug` rehydrates an existing one; `deleteSession` invalidates
 * server-side.
 *
 * H.W3 Lane A — extracted from `api.ts §SESSIONS`. W5-13 · F-5: `getMe`
 * (`GET /sessions/me`) deleted — a wired wrapper with zero UI consumers.
 */

import { request } from "./client";

export function createSession(): Promise<{ token: string; userSlug: string }> {
    return request("/sessions", { method: "POST" });
}

export function loginWithSlug(
    slug: string,
): Promise<{ token: string; userSlug: string }> {
    return request("/sessions/login", {
        method: "POST",
        body: JSON.stringify({ slug }),
    });
}

export function deleteSession(): Promise<{ ok: boolean }> {
    return request("/sessions", { method: "DELETE" });
}
