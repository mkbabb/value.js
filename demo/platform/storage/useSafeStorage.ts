/**
 * Safe localStorage/sessionStorage wrappers that silently handle
 * errors (e.g. Safari private browsing, quota exceeded).
 *
 * The ONE imperative storage form in the demo (X.W12U.k · A2-VA-L1-22): every
 * one-shot read or write goes through these; a REACTIVE store is a vueuse
 * `useStorage` binding (`usePaletteStore`, `useColorPersistence`), which
 * guards itself. No call site names `localStorage` directly.
 *
 * `safeStorage` is the twin of fourier's UIA-F-120 / UIA-F-213 guard
 * (`fourier-analysis/web/src/composables/useSafeStorage.ts`, one owner per
 * app, cross-cited): with site data blocked, READING the `window.localStorage`
 * property itself throws a SecurityError — before any wrapper below is
 * entered, because a call site that names `localStorage` evaluates it as the
 * argument. Call sites therefore name an AREA, and the property is resolved
 * inside the guard; losing storage then only means nothing is remembered.
 */
export type StorageArea = "local" | "session";

export function safeStorage(area: StorageArea): Storage | null {
    try {
        return area === "local" ? window.localStorage : window.sessionStorage;
    } catch {
        return null;
    }
}

export function safeGetItem(area: StorageArea, key: string): string | null {
    try {
        return safeStorage(area)?.getItem(key) ?? null;
    } catch {
        return null;
    }
}

export function safeSetItem(area: StorageArea, key: string, value: string): void {
    try {
        safeStorage(area)?.setItem(key, value);
    } catch {
        // Safari private browsing or quota exceeded
    }
}

export function safeRemoveItem(area: StorageArea, key: string): void {
    try {
        safeStorage(area)?.removeItem(key);
    } catch {
        // Safari private browsing
    }
}
