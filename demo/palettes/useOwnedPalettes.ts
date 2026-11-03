import { shallowRef, ref, watch, type Ref } from "vue";

import { useUserAuth } from "../platform/auth/useUserAuth";
import { ApiProblem } from "../platform/transport/api-problem";
import { ApiUnavailableError, DevMisconfigError } from "../platform/transport/availability";
import { listMyPalettes } from "./api";
import type { Palette } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// X·§0hi item 1 (OD-3b) — My Palettes is LOCAL ∪ ACCOUNT.
//
// The library used to be `savedPalettes` (localStorage) alone, so a palette
// the session user owns on the server but never saved in this browser was
// invisible from their own library. This module owns the ACCOUNT half — the
// user's `GET /palettes/mine` shelf — and the two rules that join it to the
// local half: one list deduped by slug (the server row wins), and each row's
// verbs routed by the row's own `isLocal` discriminant (no second flag).
// ─────────────────────────────────────────────────────────────────────────────

/** The account shelf's load state. `idle`: no user, or no session to read with. */
export type OwnedStatus = "idle" | "loading" | "ready" | "error";

/** The server's page ceiling for `/palettes/mine`. */
const MINE_PAGE_SIZE = 100;

/**
 * The one My Palettes list: local rows (store order, sortable) then account
 * rows (newest first). A local row whose slug an account row carries is the
 * same record published — it is hidden, never listed twice.
 */
export function mergeMyPalettes(local: readonly Palette[], owned: readonly Palette[]): Palette[] {
    const ownedSlugs = new Set(owned.map((p) => p.slug));
    return [...local.filter((p) => !ownedSlugs.has(p.slug)), ...owned];
}

/** A row's key in the union: the local store id, else the server slug (namespaced). */
export function myPaletteKey(p: Palette): string {
    return p.isLocal && p.id != null ? p.id : `srv:${p.slug}`;
}

/**
 * The session user's account shelf, following `userSlug`. No slug is `idle`
 * and fetches nothing — viewing never mints an identity. A slug change (login,
 * regenerate, logout) drops the previous user's rows and re-reads; a sequence
 * token discards a response that lands after a newer read began. A 401/403 (a
 * stale token) and an unavailable backend are "no account to show" — `idle`,
 * not an error; a service failure is `error` with the problem's title.
 */
export function createOwnedPalettes(deps: { userSlug: Readonly<Ref<string | null>>; pageSize?: number }) {
    const pageSize = deps.pageSize ?? MINE_PAGE_SIZE;
    const ownedPalettes = shallowRef<Palette[]>([]);
    const status = ref<OwnedStatus>("idle");
    const error = ref<string | null>(null);
    let seq = 0;

    async function refresh(): Promise<void> {
        const mine = ++seq;
        if (!deps.userSlug.value) {
            ownedPalettes.value = [];
            status.value = "idle";
            error.value = null;
            return;
        }
        status.value = "loading";
        error.value = null;
        try {
            const rows: Palette[] = [];
            for (let offset = 0; ; ) {
                const page = await listMyPalettes({ limit: pageSize, offset });
                if (mine !== seq) return;
                rows.push(...page.data);
                offset += page.data.length;
                if (page.data.length === 0 || offset >= page.total) break;
            }
            ownedPalettes.value = rows;
            status.value = "ready";
        } catch (e) {
            if (mine !== seq) return;
            ownedPalettes.value = [];
            if (e instanceof ApiProblem && e.isServiceFailure) {
                // The service failed (5xx, no answer, a malformed body).
                status.value = "error";
                error.value = e.title;
            } else if (
                e instanceof ApiProblem ||
                e instanceof ApiUnavailableError ||
                e instanceof DevMisconfigError
            ) {
                // A 4xx (the session is stale or absent), or a call the
                // availability latch short-circuited while the app works
                // locally: there is no account to show, and nothing to report.
                status.value = "idle";
            } else {
                throw e;
            }
        }
    }

    watch(
        () => deps.userSlug.value,
        () => {
            ownedPalettes.value = [];
            void refresh();
        },
        { immediate: true },
    );

    return { ownedPalettes, status, error, refresh };
}

export type OwnedPalettes = ReturnType<typeof createOwnedPalettes>;

let _owned: OwnedPalettes | null = null;

/** Module-level singleton (the useSession/useUserAuth lazy-init idiom). */
export function useOwnedPalettes(): OwnedPalettes {
    if (!_owned) _owned = createOwnedPalettes({ userSlug: useUserAuth().userSlug });
    return _owned;
}

/** One verb's visible result (the shape `BrowseVerdict` and `onPublish` settle). */
export interface MyPaletteVerdict {
    readonly success: boolean;
    readonly message: string;
}

/**
 * Route each My Palettes verb by the row's own `isLocal`: a local row writes
 * the store, an account row writes the API through the Browse verbs. A
 * successful account write — or a publish, which mints the account twin of a
 * local row — re-reads the shelf so the list shows the server's truth.
 */
export function routeMyPaletteVerbs(deps: {
    local: {
        onDelete: (p: Palette) => void;
        onRenameSaved: (p: Palette, name: string) => void;
        onPublish: (p: Palette) => Promise<MyPaletteVerdict>;
    };
    account: {
        onDeleteOwned: (p: Palette) => Promise<MyPaletteVerdict>;
        onRename: (p: Palette, name: string) => Promise<MyPaletteVerdict>;
        onSetVisibility: (p: Palette, v: "public" | "private") => Promise<MyPaletteVerdict>;
    };
    refresh: () => Promise<void>;
}) {
    async function afterWrite(verdict: Promise<MyPaletteVerdict>): Promise<MyPaletteVerdict> {
        const v = await verdict;
        if (v.success) await deps.refresh();
        return v;
    }

    async function onDelete(p: Palette): Promise<MyPaletteVerdict | null> {
        if (p.isLocal) {
            deps.local.onDelete(p);
            return null;
        }
        return afterWrite(deps.account.onDeleteOwned(p));
    }

    async function onRename(p: Palette, name: string): Promise<MyPaletteVerdict | null> {
        if (p.isLocal) {
            deps.local.onRenameSaved(p, name);
            return null;
        }
        return afterWrite(deps.account.onRename(p, name));
    }

    function onPublish(p: Palette): Promise<MyPaletteVerdict> {
        return afterWrite(deps.local.onPublish(p));
    }

    function onSetVisibility(p: Palette, v: "public" | "private"): Promise<MyPaletteVerdict> {
        return afterWrite(deps.account.onSetVisibility(p, v));
    }

    return { onDelete, onRename, onPublish, onSetVisibility };
}
