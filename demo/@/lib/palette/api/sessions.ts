/**
 * Session lifecycle endpoints.
 *
 * Anonymous-first session model: `createSession` mints a new user + token;
 * `loginWithSlug` rehydrates an existing one; `deleteSession` invalidates
 * server-side; `getMe` echoes the active session's user-slug + createdAt.
 *
 * H.W3 Lane A — extracted from `api.ts §SESSIONS`.
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

export function getMe(): Promise<{ userSlug: string; createdAt: string }> {
    return request("/sessions/me");
}
