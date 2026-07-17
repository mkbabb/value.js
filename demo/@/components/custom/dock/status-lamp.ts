/**
 * T.W6 · W6-6 (T-9 re-home) — the dock STATUS LAMP's pure variant resolver.
 *
 * The dev-misconfig BANNER died by owner order ("This banner should be
 * removed", re-confirmed live at R10/W4.5 — it dominated the overture's first
 * read and overlapped the dock band). Its affordance re-homes HERE: a designed
 * lamp in the dock band's own chrome, speaking the instrument register the
 * per-surface `ApiOfflineChip` already speaks (Fira Code small-caps annotation,
 * hairline edge, status pulse), never a foreign red slab over the composition.
 *
 * THE S.W0-1 SEED-RIDER CONTRACT IS BYTE-PRESERVED (R10's survives column —
 * this module CONSUMES `availability.ts`, it never re-derives it):
 *   - the transport latch + the synchronous `DevMisconfigError` throw +
 *     the loud `console.error` all live untouched in
 *     `@lib/palette/api/availability.ts` (the load-bearing signals);
 *   - misconfigured ≠ unavailable: the two preconditions resolve to DISTINCT
 *     lamp variants with distinct roles — the designed dev-config error is
 *     never conflated with the honest "backend offline" degradation.
 *
 * DEV-GATED: the lamp is a dev instrument. The misconfig precondition
 * (loopback origin + unset VITE_API_URL + cross-origin BASE_URL) is provably
 * unreachable in production, and the `unavailable` face already has its
 * designed PROD affordance (the per-surface ApiOfflineChip). `isDev` is
 * threaded as an argument so the matrix is closed-form testable (the SFC
 * passes `import.meta.env.DEV`).
 *
 * Pure + total — the O-22 variant matrix is asserted over this function in
 * `test/status-lamp.test.ts`; the SFC is a thin consume.
 */

import type { ApiAvailability } from "../../../../palettes/api/availability";

export type LampVariant = "misconfigured" | "unavailable";

export interface LampState {
    variant: LampVariant;
    /** misconfigured is an ALERT (a dev-config error, loud); unavailable is a
     * STATUS (an honest degraded state, quiet). The a11y role IS the register. */
    role: "alert" | "status";
    label: string;
}

/** The O-22 variant matrix: (availability × dev-gate) → lamp face or nothing. */
export function resolveLampState(
    availability: ApiAvailability,
    isDev: boolean,
): LampState | null {
    if (!isDev) return null; // dev-gated — the lamp ships dark in production
    switch (availability) {
        case "misconfigured":
            return {
                variant: "misconfigured",
                role: "alert",
                label: "dev misconfigured — run `npm run dev`",
            };
        case "unavailable":
            return {
                variant: "unavailable",
                role: "status",
                label: "backend offline — saved locally",
            };
        default:
            return null; // unknown/available — a healthy band carries no lamp
    }
}
