/**
 * boot/hydrate — THE HYDRATION-BEFORE-DERIVATION RESOLVER (T.W2 · W2-1).
 *
 * The ordering LAW (t-load-sync LS-2, adopted as D3 law 1): the boot sequence
 * is (1) resolve the seed — URL hash, else storage, else default — (2) THEN
 * construct the derivation graph, (3) THEN wire the token sinks. Nothing on
 * screen may ever carry the default's color unless the default IS the seed.
 *
 * Before this module, App.vue constructed the pipeline (whose rAF-coalesced
 * frame ref seeds SYNCHRONOUSLY from the default model) and the atmosphere
 * boot (whose immediate watches write root tokens) BEFORE `useColorUrl` +
 * `restoreFromStorage` ran — so every cold load derived one full commit of
 * DEFAULT-pink tokens (t-aurora-boot F-1's demo half) and double-wrote
 * `--saved-bg` persisted → default → persisted (F-3's latent flash, masked
 * only by the boot jank T-27 names). This module is the transposition: a
 * PURE, synchronous seed resolution that runs BEFORE the model ref is
 * created, so the derivation graph is BORN hydrated. (R11: FOLD-FORWARD +
 * NEW BUG — the S-era cold-load gate seeded sessions via addInitScript and
 * could not see this ordering; O-2 now drives the natural path.)
 *
 * Pure module — no Vue, no side effects beyond environment READS
 * (location.hash, localStorage). Throw-safe: every arm falls through to the
 * next source on any malformed input (the shape-validated read discipline).
 *
 * The existing collaborators are NOT forked: `useColorUrl`'s initial apply
 * re-applies the same URL color (idempotent — same value, one commit) and
 * keeps owning the LIVE URL↔model sync; `restoreFromStorage` keeps owning
 * the savedColors restore + the write-through. This module owns only the
 * FIRST value — the seed the graph is constructed from.
 */

import { parseCSSColor } from "@mkbabb/value.js/parsing";
import { colorUnit2, normalizeColorUnit } from "@mkbabb/value.js/color";
import type { ColorModel, DisplayColorSpace } from "@components/custom/color-picker";
import {
    createDefaultColorModel,
    resolveColorSpace,
} from "@components/custom/color-picker";
// The persisted color-state projection key — single-sourced (U-F48), shared
// with useColorPersistence. boot→lib is a legal DOWN import.
import { COLOR_STORE_KEY } from "@lib/palette/constants";

export type BootSeedSource = "url" | "storage" | "default";

export interface HydratedBootModel {
    model: ColorModel;
    source: BootSeedSource;
}

/** Parse the hash-router query (`#/?space=…&color=…`) without the router —
 *  this resolver runs before router installation, at model construction. */
function readUrlSeed(): { space: string; color: string } | null {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    const q = hash.indexOf("?");
    if (q === -1) return null;
    const params = new URLSearchParams(hash.slice(q + 1));
    const space = params.get("space");
    const color = params.get("color");
    if (!space || !color) return null;
    return { space, color };
}

/** Shape-validated read of the persisted input color (string, non-empty). */
function readStoredSeed(): string | null {
    try {
        const raw = localStorage.getItem(COLOR_STORE_KEY);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== "object" || parsed === null) return null;
        const input = (parsed as { inputColor?: unknown }).inputColor;
        if (typeof input !== "string" || !input.trim()) return null;
        return input;
    } catch {
        return null;
    }
}

/** Build a hydrated model from a css string + display space (throws on
 *  malformed input — the caller's arm falls through). */
function modelFrom(css: string, space: DisplayColorSpace): ColorModel {
    const parsed = parseCSSColor(css.trim().toLowerCase());
    const normalized = normalizeColorUnit(parsed);
    const converted = colorUnit2(
        normalized,
        resolveColorSpace(space),
        true,
        false,
        false,
    );
    return {
        selectedColorSpace: space,
        color: converted,
        inputColor: css,
        savedColors: [], // restored later by restoreFromStorage (data, not material)
    };
}

/**
 * Resolve the hydrated boot model: URL hash wins, else the persisted last
 * session, else the default. The default is a seed like any other — never a
 * flash (D3 law 1).
 */
export function resolveHydratedBootModel(): HydratedBootModel {
    // 1 — URL hash (the share-link path; useColorUrl keeps live sync).
    const url = readUrlSeed();
    if (url) {
        try {
            return {
                model: modelFrom(url.color, url.space as DisplayColorSpace),
                source: "url",
            };
        } catch {
            /* malformed URL color — fall through (useColorUrl warns) */
        }
    }

    // 2 — the persisted last session (the natural returning-user path).
    const stored = readStoredSeed();
    if (stored) {
        try {
            const parsed = parseCSSColor(stored.trim().toLowerCase());
            const normalized = normalizeColorUnit(parsed);
            // Mirror parseAndSetColor's space detection: a hex input selects
            // the "hex" display mode rather than "rgb".
            const own = normalized.value.colorSpace;
            const space: DisplayColorSpace =
                own === "rgb" && stored.trim().startsWith("#") ? "hex" : own;
            return { model: modelFrom(stored, space), source: "storage" };
        } catch {
            /* corrupt store — fall through to the default */
        }
    }

    // 3 — the default seed.
    return { model: createDefaultColorModel(), source: "default" };
}
