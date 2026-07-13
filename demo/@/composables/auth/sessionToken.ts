/**
 * Session-token persistence — the SINGLE owner of the live session token's
 * storage and the bridge to its ONE canonical reactive cell.
 *
 * U.W-DEMO · U-F46 (registry §13). Before this module the one logical session
 * token lived in THREE reactive cells across TWO storage backends, kept
 * coherent only by hand-written write-through at every mutation. The canonical
 * reactive cell is now the api client's `sessionTokenRef` — the transport's own
 * read cell, so transport-truth and app-truth are one object. `useSession` /
 * `useUserAuth` hold NO private token ref; they drive the one cell through this
 * adapter.
 *
 * The user-vs-anon distinction is a `persistent` FLAG on the one token, not a
 * second cell: a persistent (user) token lives in localStorage (survives tab
 * close); an anonymous session token lives in sessionStorage (cleared on tab
 * close). Exactly ONE write path (`persistToken`), ONE clear path
 * (`clearPersistedToken`), ONE boot restore (`restoreToken`).
 */
import { sessionTokenRef, setSessionToken } from "@lib/palette/api/client";
import { safeGetItem, safeRemoveItem, safeSetItem } from "../useSafeStorage";

/** Persistent user token — survives tab close (localStorage). */
export const USER_TOKEN_KEY = "palette-user-token";
/** Anonymous session token — cleared on tab close (sessionStorage). */
export const ANON_SESSION_KEY = "palette-session-token";

export interface PersistedToken {
    token: string;
    /** True for a persistent user token (localStorage); false for anonymous. */
    persistent: boolean;
}

/**
 * Read the persisted token, preferring the persistent (user) token over the
 * anonymous one. Returns null when neither backend holds a token.
 */
export function loadPersistedToken(): PersistedToken | null {
    const user = safeGetItem(localStorage, USER_TOKEN_KEY);
    if (user) return { token: user, persistent: true };
    const anon = safeGetItem(sessionStorage, ANON_SESSION_KEY);
    if (anon) return { token: anon, persistent: false };
    return null;
}

/**
 * The ONE write path: persist the token to the backend its `persistent` flag
 * selects, then set the canonical cell. A persistent token supersedes any stale
 * anonymous copy (so the two backends never both hold a live token); an
 * anonymous token never touches localStorage.
 */
export function persistToken(token: string, persistent: boolean): void {
    if (persistent) {
        safeSetItem(localStorage, USER_TOKEN_KEY, token);
        safeRemoveItem(sessionStorage, ANON_SESSION_KEY);
    } else {
        safeSetItem(sessionStorage, ANON_SESSION_KEY, token);
    }
    setSessionToken(token);
}

/** The ONE clear path: drop both backends and null the canonical cell. */
export function clearPersistedToken(): void {
    safeRemoveItem(localStorage, USER_TOKEN_KEY);
    safeRemoveItem(sessionStorage, ANON_SESSION_KEY);
    setSessionToken(null);
}

let _restored = false;

/**
 * Restore the persisted token into the canonical cell once, at boot. Idempotent
 * and a no-op when the cell is already populated (another consumer restored it
 * first). Lazy so Storage is never touched at import time (SSR / Safari-private
 * safety — the same discipline the composables' lazy refs used).
 */
export function restoreToken(): void {
    if (_restored) return;
    _restored = true;
    if (sessionTokenRef.value) return;
    const persisted = loadPersistedToken();
    if (persisted) setSessionToken(persisted.token);
}
