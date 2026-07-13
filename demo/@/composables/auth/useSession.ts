/**
 * Session management — resolves the live API session token, delegating to the
 * persistent user token (useUserAuth / localStorage) when one exists and only
 * minting an anonymous session (sessionStorage) as a fallback.
 *
 * This prevents the original bug where ensureSession() would create a competing
 * anonymous session that overwrote the user's real token.
 *
 * U.W-DEMO · U-F46: the token is single-sourced on the api client's
 * `sessionTokenRef` (the transport's own read cell) and persisted by the ONE
 * `sessionToken` adapter. This module holds NO private token ref — `token`
 * exposes the canonical cell directly, driven through the adapter's single
 * write path.
 */
import { createSession } from "@lib/palette/api";
import { sessionTokenRef } from "@lib/palette/api/client";

import { loadPersistedToken, persistToken, restoreToken } from "./sessionToken";

async function ensureSession(): Promise<string> {
    // 1. Canonical in-memory cell already populated?
    if (sessionTokenRef.value) {
        return sessionTokenRef.value;
    }

    // 2. A persisted token — the logged-in user's localStorage token, or an
    //    anonymous sessionStorage token minted earlier this tab (covers the
    //    case where sessionStorage was cleared on tab close but the user is
    //    still "logged in" via localStorage).
    const persisted = loadPersistedToken();
    if (persisted) {
        persistToken(persisted.token, persisted.persistent);
        return persisted.token;
    }

    // 3. No token anywhere — mint an anonymous session.
    const res = await createSession();
    persistToken(res.token, false);
    return res.token;
}

/**
 * Module-level singleton: the canonical token cell is shared across all callers.
 * `restoreToken()` lazily hydrates it from storage on first use (SSR safety +
 * Safari private browsing).
 */
export function useSession() {
    restoreToken();
    return {
        token: sessionTokenRef,
        ensureSession,
    };
}
