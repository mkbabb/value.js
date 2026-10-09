/**
 * The API-status resolver — ONE status language, two seats (A2-VA-L1-9).
 *
 * T.W6 · W6-6 (T-9 re-home) built the dock STATUS LAMP to speak the register
 * the per-surface offline chip already spoke; the two then lived as two
 * hand-rolled chips (a dot, a small-caps label, a pill hairline) with the
 * "misconfigured" state rendered by both. X-W12U `.k2` folds them into ONE
 * component, `ApiStatusChip.vue` beside this file (glass `chipVariants()` +
 * glass `StatusDot`), and this pure resolver decides what each seat says:
 *
 *   - `dock`    — the band-chrome lamp. DEV-GATED: a dev instrument. It is the
 *                 ONE place "misconfigured" is said (the misconfig precondition
 *                 — loopback origin + unset VITE_API_URL + cross-origin
 *                 BASE_URL — is provably unreachable in production).
 *   - `surface` — the save surface's degraded affordance (the K-INV5 chip on
 *                 Current Palette). It ships in production and says only the
 *                 honest "backend offline — saved locally"; a misconfigured
 *                 dev box is the dock lamp's to name, never repeated here.
 *
 * THE S.W0-1 SEED-RIDER CONTRACT IS BYTE-PRESERVED (R10's survives column —
 * this module CONSUMES `availability.ts`, it never re-derives it):
 *   - the transport latch + the synchronous `DevMisconfigError` throw +
 *     the loud `console.error` all live untouched in
 *     `platform/transport/availability.ts` (the load-bearing signals);
 *   - misconfigured ≠ unavailable: the two preconditions resolve to DISTINCT
 *     variants with distinct roles — the designed dev-config error is never
 *     conflated with the honest "backend offline" degradation.
 *
 * Pure + total — the O-22 variant matrix is asserted over this function in
 * `test/status-lamp.test.ts`; the SFC is a thin consume.
 */

import type { ApiAvailability } from "../../../platform/transport/availability";

export type ApiStatusVariant = "misconfigured" | "unavailable";

/** The two seats the one chip renders from. */
export type ApiStatusSeat = "dock" | "surface";

export interface ApiStatus {
    variant: ApiStatusVariant;
    /** misconfigured is an ALERT (a dev-config error, loud); unavailable is a
     * STATUS (an honest degraded state, quiet). The a11y role IS the register. */
    role: "alert" | "status";
    label: string;
}

const MISCONFIGURED: ApiStatus = {
    variant: "misconfigured",
    role: "alert",
    label: "dev misconfigured — run `npm run dev`",
};

const UNAVAILABLE: ApiStatus = {
    variant: "unavailable",
    role: "status",
    label: "backend offline — saved locally",
};

/** The O-22 variant matrix: (availability × dev-gate × seat) → a face or nothing. */
export function resolveApiStatus(
    availability: ApiAvailability,
    isDev: boolean,
    seat: ApiStatusSeat = "dock",
): ApiStatus | null {
    if (seat === "surface") {
        // the save surface names only the honest degradation, in every build
        return availability === "unavailable" ? UNAVAILABLE : null;
    }
    if (!isDev) return null; // dev-gated — the lamp ships dark in production
    switch (availability) {
        case "misconfigured":
            return MISCONFIGURED;
        case "unavailable":
            return UNAVAILABLE;
        default:
            return null; // unknown/available — a healthy band carries no lamp
    }
}
