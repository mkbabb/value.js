/**
 * Session management — thin wrapper that delegates to useUserAuth when a
 * persistent user token exists, and only creates anonymous sessions as a
 * fallback.
 *
 * This prevents the original bug where ensureSession() would create a
 * competing anonymous session that overwrote the user's real token in
 * the api module.
 *
 * Storage: sessionStorage (cleared on tab close) for anonymous sessions.
 * When useUserAuth has a token, it is synced to sessionStorage so both
 * systems see the same value.
 */
import { ref, type Ref } from "vue";
import { createSession, setSessionToken } from "@lib/palette/api";
import { safeGetItem, safeSetItem } from "../useSafeStorage";

const SESSION_KEY = "palette-session-token";
const USER_TOKEN_KEY = "palette-user-token"; // shared with useUserAuth

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

    // 1. Check sessionStorage (may have been synced from useUserAuth)
    if (token.value) {
        setSessionToken(token.value);
        return token.value;
    }

    // 2. Check if useUserAuth has a persistent token in localStorage
    //    (covers the case where sessionStorage was cleared on tab close
    //    but the user is still "logged in" via localStorage)
    const userToken = safeGetItem(localStorage, USER_TOKEN_KEY);
    if (userToken) {
        token.value = userToken;
        safeSetItem(sessionStorage, SESSION_KEY, userToken);
        setSessionToken(userToken);
        return userToken;
    }

    // 3. No token anywhere — create an anonymous session
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
