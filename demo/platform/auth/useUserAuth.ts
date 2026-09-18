/**
 * User auth — module-level singleton with lazy slug initialization and
 * auto-registration deduplication.
 *
 * Same singleton pattern as useAdminAuth/useSession. Additionally manages:
 * - `_autoRegisterPromise` — deduplicates concurrent auto-registration calls
 *   (multiple components calling `ensureUser()` during mount)
 * - `_registrationCancelled` — cancellation flag for in-flight registrations
 *
 * The user slug persists in localStorage across sessions.
 *
 * U.W-DEMO · U-F46: the session token is single-sourced on the api client's
 * `sessionTokenRef` and persisted by the ONE `sessionToken` adapter (a user
 * token is the `persistent` case). This module holds NO private token ref — it
 * owns only the user SLUG, coupled to the token at each persist/clear.
 */
import { ref, computed, type Ref } from "vue";
import { createSession, deleteSession, loginWithSlug } from "./sessions";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../storage/useSafeStorage";

import { clearPersistedToken, persistToken, restoreToken } from "./sessionToken";

const SLUG_KEY = "palette-user-slug";

let _userSlug: Ref<string | null> | null = null;
let _autoRegisterPromise: Promise<string> | null = null;
let _registrationCancelled = false;

function getUserSlug(): Ref<string | null> {
    if (!_userSlug) {
        _userSlug = ref<string | null>(safeGetItem(localStorage, SLUG_KEY));
    }
    return _userSlug;
}

/** Persist the user's slug (localStorage) + token (the persistent adapter case). */
function persist(slug: string, token: string) {
    getUserSlug().value = slug;
    safeSetItem(localStorage, SLUG_KEY, slug);
    persistToken(token, true);
}

/** Clear the user's slug (localStorage) + token (both backends + canonical cell). */
function clearAuth() {
    getUserSlug().value = null;
    safeRemoveItem(localStorage, SLUG_KEY);
    clearPersistedToken();
}

/**
 * Module-level singleton: state is shared across all callers.
 * Lazy-init avoids accessing Storage at import time
 * (SSR safety + Safari private browsing).
 */
export function useUserAuth() {
    const slugRef = getUserSlug();

    // Restore the persisted token into the canonical cell on first use.
    restoreToken();

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
        clearAuth();
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
        // Clear storage + token but DON'T null the slug ref yet (avoids UI flash).
        safeRemoveItem(localStorage, SLUG_KEY);
        clearPersistedToken();

        // Register new user — persist() updates the slug ref atomically.
        const res = await createSession();
        if (!res.userSlug) throw new Error("Server did not return a user slug");
        persist(res.userSlug, res.token);
        return res.userSlug;
    }

    function clearSlug() {
        _registrationCancelled = true;
        _autoRegisterPromise = null;
        clearAuth();
    }

    return { userSlug, isLoggedIn, register, login, logout, ensureUser, regenerate, clearSlug };
}
