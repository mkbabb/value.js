/**
 * Session management — module-level singleton with lazy initialization.
 *
 * Same singleton pattern as useAdminAuth: a single `_token` Ref shared
 * across all callers. The `_initialized` flag prevents duplicate session
 * creation during concurrent component mounts.
 *
 * Session tokens are stored in sessionStorage (cleared on tab close)
 * and automatically passed to the API client via `setSessionToken()`.
 */
import { ref, type Ref } from "vue";
import { createSession, setSessionToken } from "@lib/palette/api";
import { safeGetItem, safeSetItem } from "../useSafeStorage";

const SESSION_KEY = "palette-session-token";

let _token: Ref<string | null> | null = null;
let _initialized = false;

function getToken(): Ref<string | null> {
    if (!_token) {
        _token = ref<string | null>(safeGetItem(sessionStorage, SESSION_KEY));
    }
    return _token;
}

function initialize() {
    if (_initialized) return;
    _initialized = true;
    const t = getToken();
    if (t.value) {
        setSessionToken(t.value);
    }
}

async function ensureSession(): Promise<string> {
    const token = getToken();
    if (token.value) return token.value;

    const res = await createSession();
    token.value = res.token;
    safeSetItem(sessionStorage, SESSION_KEY, res.token);
    setSessionToken(res.token);
    return res.token;
}

function clearSession() {
    const token = getToken();
    token.value = null;
    sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Module-level singleton: state is shared across all callers.
 * Lazy-init avoids accessing Storage at import time
 * (SSR safety + Safari private browsing).
 */
export function useSession() {
    initialize();
    return {
        token: getToken(),
        ensureSession,
        clearSession,
    };
}
