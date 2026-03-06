import { ref, computed, type Ref } from "vue";
import { createSession, loginWithSlug, setSessionToken } from "@lib/palette/api";

const SLUG_KEY = "palette-user-slug";
const TOKEN_KEY = "palette-user-token";

let _userSlug: Ref<string | null> | null = null;
let _userToken: Ref<string | null> | null = null;
let _autoRegisterPromise: Promise<string> | null = null;

function getUserSlug(): Ref<string | null> {
    if (!_userSlug) {
        try {
            _userSlug = ref<string | null>(localStorage.getItem(SLUG_KEY));
        } catch {
            _userSlug = ref<string | null>(null);
        }
    }
    return _userSlug;
}

function getUserToken(): Ref<string | null> {
    if (!_userToken) {
        try {
            _userToken = ref<string | null>(localStorage.getItem(TOKEN_KEY));
        } catch {
            _userToken = ref<string | null>(null);
        }
    }
    return _userToken;
}

function persist(slug: string, token: string) {
    const slugRef = getUserSlug();
    const tokenRef = getUserToken();
    slugRef.value = slug;
    tokenRef.value = token;
    try {
        localStorage.setItem(SLUG_KEY, slug);
        localStorage.setItem(TOKEN_KEY, token);
    } catch {
        // Safari private browsing
    }
    setSessionToken(token);
}

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
        const res = await createSession();
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
        slugRef.value = null;
        tokenRef.value = null;
        try {
            localStorage.removeItem(SLUG_KEY);
            localStorage.removeItem(TOKEN_KEY);
        } catch {
            // Safari private browsing
        }
        // Auto-register a fresh anonymous session so the slug UI reappears
        await register();
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

    return { userSlug, isLoggedIn, register, login, logout, ensureUser };
}
