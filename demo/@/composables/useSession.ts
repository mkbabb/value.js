import { ref } from "vue";
import { createSession, setSessionToken } from "@lib/palette/api";

const SESSION_KEY = "palette-session-token";
const OWNED_KEY = "palette-owned-slugs";

const token = ref<string | null>(sessionStorage.getItem(SESSION_KEY));
const ownedSlugs = ref<Set<string>>(loadOwnedSlugs());

// Initialize API module if we already have a token
if (token.value) {
    setSessionToken(token.value);
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
    sessionStorage.setItem(OWNED_KEY, JSON.stringify([...ownedSlugs.value]));
}

async function ensureSession(): Promise<string> {
    if (token.value) return token.value;

    const res = await createSession();
    token.value = res.token;
    sessionStorage.setItem(SESSION_KEY, res.token);
    setSessionToken(res.token);
    return res.token;
}

function markOwned(slug: string) {
    ownedSlugs.value = new Set([...ownedSlugs.value, slug]);
    persistOwnedSlugs();
}

function isOwned(slug: string): boolean {
    return ownedSlugs.value.has(slug);
}

export function useSession() {
    return {
        token,
        ownedSlugs,
        ensureSession,
        markOwned,
        isOwned,
    };
}
