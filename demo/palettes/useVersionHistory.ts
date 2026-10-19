/**
 * useVersionHistory — version fetch + revert + fork. Exposed at the facade as
 * `pm.versions`.
 *
 * X.W7.d (fold W7.77 · VHD-8): the paging state machine this file used to carry
 * (`versions` / `total` / `loading` / `paletteSlug` / `loadVersions` /
 * `loadMore` / `reset`) was a line-for-line copy of the drawer's own, with zero
 * consumers — the drawer pages through `fetchVersions`. The copy is deleted;
 * one state machine remains, in the drawer (X-W4's file).
 */
import { listVersions, revertPalette, forkPalette, paletteETag } from "./api";
import type { Palette, PaletteVersion } from "./types";

export interface VersionsPage {
    data: PaletteVersion[];
    total: number;
}

/** The revert verdict (W7-failure-dispositions row 5: SURFACE). */
export type RevertResult =
    | { readonly ok: true; readonly palette: Palette }
    | { readonly ok: false; readonly message: string };

/**
 * The fork verdict (X.W7.z1 · COHESION §0bt.1; W7-failure-dispositions row 47:
 * SURFACE). The failure carries its reason to the host, which says it on the
 * palette inspector's rail; nothing is swallowed.
 */
export type ForkResult = RevertResult;

/**
 * The version-page verdict (X.W7.z1 · COHESION §0bt.1). A failed load is a
 * reason the drawer hands its host (said on the inspector's rail), not an
 * empty page that reads as "0 versions".
 */
export type VersionsResult =
    | { readonly ok: true; readonly page: VersionsPage }
    | { readonly ok: false; readonly message: string };

export interface UseVersionHistory {
    fetchVersions: (
        slug: string,
        limit?: number,
        offset?: number,
    ) => Promise<VersionsResult>;
    /** Revert `palette` to the release `hash`; the held palette is the
     *  If-Match validator's source (X.W12U.s2 · UIA-V-38). */
    revert: (palette: Palette, hash: string) => Promise<RevertResult>;
    fork: (slug: string, name?: string, forkSlug?: string) => Promise<ForkResult>;
}

function messageOf(e: unknown, fallback: string): string {
    return e instanceof Error && e.message ? e.message : fallback;
}

export function useVersionHistory(): UseVersionHistory {
    async function fetchVersions(
        slug: string,
        limit = 20,
        offset = 0,
    ): Promise<VersionsResult> {
        try {
            const res = await listVersions(slug, limit, offset);
            return { ok: true, page: { data: res.data, total: res.total } };
        } catch (e) {
            return { ok: false, message: messageOf(e, "The versions did not reach the server.") };
        }
    }

    async function revert(palette: Palette, hash: string): Promise<RevertResult> {
        try {
            return {
                ok: true,
                palette: await revertPalette(palette.slug, hash, paletteETag(palette)),
            };
        } catch (e) {
            return { ok: false, message: messageOf(e, "The revert did not reach the server.") };
        }
    }

    async function fork(
        slug: string,
        name?: string,
        forkSlug?: string,
    ): Promise<ForkResult> {
        try {
            return { ok: true, palette: await forkPalette(slug, name, forkSlug) };
        } catch (e) {
            return { ok: false, message: messageOf(e, "The fork did not reach the server.") };
        }
    }

    return { fetchVersions, revert, fork };
}
