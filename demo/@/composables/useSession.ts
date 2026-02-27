import { ref, type Ref } from "vue";
import { createSession, setSessionToken } from "@lib/palette/api";

const SESSION_KEY = "palette-session-token";
const OWNED_KEY = "palette-owned-slugs";

let _token: Ref<string | null> | null = null;
let _ownedSlugs: Ref<Set<string>> | null = null;
let _initialized = false;

function getToken(): Ref<string | null> {
    if (!_token) {
        try {
            _token = ref<string | null>(sessionStorage.getItem(SESSION_KEY));
        } catch {
            _token = ref<string | null>(null);
        }
    }
    return _token;
}

function getOwnedSlugs(): Ref<Set<string>> {
    if (!_ownedSlugs) {
        _ownedSlugs = ref<Set<string>>(loadOwnedSlugs());
    }
    return _ownedSlugs;
}

function initialize() {
    if (_initialized) return;
    _initialized = true;
    const t = getToken();
    if (t.value) {
        setSessionToken(t.value);
    }
}

function loadOwnedSlugs(): Set<string> {
    try {
        const raw = sessionStorage.getItem(OWNED_KEY);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
        return new Set();
    }
}

function persistOwnedSlugs() {
    try {
        sessionStorage.setItem(OWNED_KEY, JSON.stringify([...getOwnedSlugs().value]));
    } catch {
        // Safari private browsing — silently ignore
    }
}

async function ensureSession(): Promise<string> {
    const token = getToken();
    if (token.value) return token.value;

    const res = await createSession();
    token.value = res.token;
    try {
        sessionStorage.setItem(SESSION_KEY, res.token);
    } catch {
        // Safari private browsing
    }
    setSessionToken(res.token);
    return res.token;
}

function markOwned(slug: string) {
    const ownedSlugs = getOwnedSlugs();
    ownedSlugs.value = new Set([...ownedSlugs.value, slug]);
    persistOwnedSlugs();
}

function isOwned(slug: string): boolean {
    return getOwnedSlugs().value.has(slug);
}

export function useSession() {
    initialize();
    return {
        token: getToken(),
        ownedSlugs: getOwnedSlugs(),
        ensureSession,
        markOwned,
        isOwned,
    };
}
