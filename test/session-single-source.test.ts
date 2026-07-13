/**
 * G-DEMO-2 (U.W-DEMO · U-F46) — the live session token has ONE canonical
 * reactive cell (the api-client `sessionTokenRef`) that `useSession` /
 * `useUserAuth` write through, and the dead incomplete-teardown twin
 * `clearSession` is gone.
 *
 * Born-RED: on the pre-cure tree this FAILS — the one logical token lives in
 * THREE independent `Ref` cells (`useSession._token`, `useUserAuth._userToken`,
 * `client.sessionTokenRef`) kept coherent only by hand-written write-through,
 * and `clearSession` is an exported dead landmine that nulls only one cell.
 * It flips GREEN only when the two composables hold NO private token ref (the
 * canonical is `client.sessionTokenRef`, driven through `setSessionToken`) and
 * `clearSession` is deleted.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { beforeEach, describe, expect, it } from "vitest";

import { useSession } from "@composables/auth/useSession";
import {
    clearPersistedToken,
    loadPersistedToken,
    persistToken,
} from "@composables/auth/sessionToken";
import { sessionTokenRef, setSessionToken } from "@lib/palette/api/client";

const authDir = resolve(process.cwd(), "demo/@/composables/auth");
const useSessionSrc = readFileSync(`${authDir}/useSession.ts`, "utf8");
const useUserAuthSrc = readFileSync(`${authDir}/useUserAuth.ts`, "utf8");

function count(haystack: string, needle: RegExp): number {
    return (haystack.match(needle) ?? []).length;
}

// This jsdom/Node context exposes a working bare `sessionStorage` but leaves
// `localStorage` undefined (Node 22 gates its experimental Web Storage
// `localStorage` behind `--localstorage-file`). The adapter reaches the bare
// browser globals, so install a minimal in-memory `localStorage` — the browser
// storage the code assumes — before any behavioral assertion runs.
class MemStorage implements Storage {
    private m = new Map<string, string>();
    get length(): number {
        return this.m.size;
    }
    clear(): void {
        this.m.clear();
    }
    getItem(key: string): string | null {
        return this.m.has(key) ? (this.m.get(key) as string) : null;
    }
    key(i: number): string | null {
        return [...this.m.keys()][i] ?? null;
    }
    removeItem(key: string): void {
        this.m.delete(key);
    }
    setItem(key: string, value: string): void {
        this.m.set(key, String(value));
    }
}
if (typeof (globalThis as { localStorage?: Storage }).localStorage === "undefined") {
    Object.defineProperty(globalThis, "localStorage", {
        value: new MemStorage(),
        configurable: true,
        writable: true,
    });
}

describe("G-DEMO-2 · session token single-source (U-F46)", () => {
    beforeEach(() => {
        setSessionToken(null);
        localStorage.clear();
        sessionStorage.clear();
    });

    describe("(a) one canonical reactive cell — no private token refs", () => {
        it("useSession.ts holds no private token ref (_token deleted)", () => {
            expect(count(useSessionSrc, /\b_token\b/g)).toBe(0);
        });

        it("useUserAuth.ts holds no private token ref (_userToken deleted)", () => {
            expect(count(useUserAuthSrc, /\b_userToken\b/g)).toBe(0);
        });

        it("useSession exposes the canonical client cell, not a private ref", () => {
            expect(useSession().token).toBe(sessionTokenRef);
        });

        it("writing through setSessionToken drives the cell useSession exposes", () => {
            setSessionToken("tok-canonical");
            expect(sessionTokenRef.value).toBe("tok-canonical");
            expect(useSession().token.value).toBe("tok-canonical");
        });
    });

    describe("(b) dead desync twin removed", () => {
        it("clearSession is absent from useSession.ts", () => {
            expect(count(useSessionSrc, /clearSession/g)).toBe(0);
        });

        it("useSession() does not expose clearSession", () => {
            expect("clearSession" in useSession()).toBe(false);
        });
    });

    describe("(c) single persistence owner — write/clear coherence", () => {
        it("one write path + one clear path keep the canonical cell and both storage backends coherent", () => {
            // persistent (user) token → localStorage; canonical cell set; anon backend cleared.
            persistToken("user-tok", true);
            expect(sessionTokenRef.value).toBe("user-tok");
            expect(localStorage.getItem("palette-user-token")).toBe("user-tok");
            expect(sessionStorage.getItem("palette-session-token")).toBeNull();
            expect(loadPersistedToken()).toEqual({
                token: "user-tok",
                persistent: true,
            });

            // anonymous token → sessionStorage; canonical cell set; persistent backend absent.
            clearPersistedToken();
            persistToken("anon-tok", false);
            expect(sessionTokenRef.value).toBe("anon-tok");
            expect(sessionStorage.getItem("palette-session-token")).toBe("anon-tok");
            expect(localStorage.getItem("palette-user-token")).toBeNull();

            // the ONE clear path nulls the canonical cell AND both backends together.
            clearPersistedToken();
            expect(sessionTokenRef.value).toBeNull();
            expect(localStorage.getItem("palette-user-token")).toBeNull();
            expect(sessionStorage.getItem("palette-session-token")).toBeNull();
        });
    });
});
