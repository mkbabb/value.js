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
import { listVersions, revertPalette, forkPalette } from "./api";
import type { Palette, PaletteVersion } from "./types";

export interface VersionsPage {
    data: PaletteVersion[];
    total: number;
}

/** The revert verdict (W7-failure-dispositions row 5: SURFACE). */
export type RevertResult =
    | { readonly ok: true; readonly palette: Palette }
    | { readonly ok: false; readonly message: string };

export interface UseVersionHistory {
    fetchVersions: (
        slug: string,
        limit?: number,
        offset?: number,
    ) => Promise<VersionsPage | undefined>;
    revert: (slug: string, hash: string) => Promise<RevertResult>;
    fork: (
        slug: string,
        name?: string,
        forkSlug?: string,
    ) => Promise<Palette | undefined>;
}

function messageOf(e: unknown, fallback: string): string {
    return e instanceof Error && e.message ? e.message : fallback;
}

export function useVersionHistory(): UseVersionHistory {
    async function fetchVersions(
        slug: string,
        limit = 20,
        offset = 0,
    ): Promise<VersionsPage | undefined> {
        try {
            const res = await listVersions(slug, limit, offset);
            return { data: res.data, total: res.total };
        } catch (e) {
            console.warn("Failed to load versions:", e);
            return undefined;
        }
    }

    async function revert(slug: string, hash: string): Promise<RevertResult> {
        try {
            return { ok: true, palette: await revertPalette(slug, hash) };
        } catch (e) {
            return { ok: false, message: messageOf(e, "The revert did not reach the server.") };
        }
    }

    async function fork(
        slug: string,
        name?: string,
        forkSlug?: string,
    ): Promise<Palette | undefined> {
        try {
            return await forkPalette(slug, name, forkSlug);
        } catch (e) {
            console.warn("Failed to fork palette:", e);
            return undefined;
        }
    }

    return { fetchVersions, revert, fork };
}
