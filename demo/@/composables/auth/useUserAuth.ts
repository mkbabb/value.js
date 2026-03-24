import { ref, computed, type Ref } from "vue";
import { createSession, deleteSession, loginWithSlug, setSessionToken } from "@lib/palette/api";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../useSafeStorage";

const SLUG_KEY = "palette-user-slug";
const TOKEN_KEY = "palette-user-token";

let _userSlug: Ref<string | null> | null = null;
let _userToken: Ref<string | null> | null = null;
let _autoRegisterPromise: Promise<string> | null = null;
let _registrationCancelled = false;

function getUserSlug(): Ref<string | null> {
    if (!_userSlug) {
        _userSlug = ref<string | null>(safeGetItem(localStorage, SLUG_KEY));
    }
    return _userSlug;
}

function getUserToken(): Ref<string | null> {
    if (!_userToken) {
        _userToken = ref<string | null>(safeGetItem(localStorage, TOKEN_KEY));
    }
    return _userToken;
}

function persist(slug: string, token: string) {
    const slugRef = getUserSlug();
    const tokenRef = getUserToken();
    slugRef.value = slug;
    tokenRef.value = token;
    safeSetItem(localStorage, SLUG_KEY, slug);
    safeSetItem(localStorage, TOKEN_KEY, token);
    setSessionToken(token);
}

/**
 * Module-level singleton: state is shared across all callers.
 * Lazy-init avoids accessing Storage at import time
 * (SSR safety + Safari private browsing).
 */
export function useUserAuth() {
    const slugRef = getUserSlug();
    const tokenRef = getUserToken();

    // Restore session token on first use
    if (tokenRef.value) {
        setSessionToken(tokenRef.value);
    }

    const userSlug = computed(() => slugRef.value);
    const isLoggedIn = computed(() => !!slugRef.value);

    async function register(): Promise<string> {
        _registrationCancelled = false;
        const res = await createSession();
        if (_registrationCancelled) {
            return res.userSlug ?? "";
        }
        if (!res.userSlug) {
            throw new Error("Server did not return a user slug");
        }
        persist(res.userSlug, res.token);
        return res.userSlug;
    }

    async function login(slug: string): Promise<void> {
        const res = await loginWithSlug(slug);
        if (!res.userSlug) {
            throw new Error("Server did not return a user slug");
        }
        persist(res.userSlug, res.token);
    }

    async function logout() {
        // Revoke session on server before clearing local state
        try {
            await deleteSession();
        } catch {
            // Session may already be expired
        }
        slugRef.value = null;
        tokenRef.value = null;
        safeRemoveItem(localStorage, SLUG_KEY);
        safeRemoveItem(localStorage, TOKEN_KEY);
        setSessionToken(null);
    }

    /**
     * Ensure a user slug exists. If none in localStorage, auto-register.
     * Deduplicates concurrent calls.
     */
    async function ensureUser(): Promise<string> {
        if (slugRef.value) return slugRef.value;
        if (_autoRegisterPromise) return _autoRegisterPromise;
        _autoRegisterPromise = register().finally(() => {
            _autoRegisterPromise = null;
        });
        return _autoRegisterPromise;
    }

    /**
     * Atomically replace the current slug: revoke old session, register new one.
     * The slug ref transitions directly from old → new with no null gap, avoiding UI flash.
     */
    async function regenerate(): Promise<string> {
        try {
            await deleteSession();
        } catch {
            // Old session may already be expired
        }
        // Clear storage but DON'T null the ref yet
        safeRemoveItem(localStorage, SLUG_KEY);
        safeRemoveItem(localStorage, TOKEN_KEY);
        setSessionToken(null);

        // Register new user — persist() updates the ref atomically
        const res = await createSession();
        if (!res.userSlug) throw new Error("Server did not return a user slug");
        persist(res.userSlug, res.token);
        return res.userSlug;
    }

    function clearSlug() {
        _registrationCancelled = true;
        _autoRegisterPromise = null;
        slugRef.value = null;
        tokenRef.value = null;
        safeRemoveItem(localStorage, SLUG_KEY);
        safeRemoveItem(localStorage, TOKEN_KEY);
    }

    return { userSlug, isLoggedIn, register, login, logout, ensureUser, regenerate, clearSlug };
}
