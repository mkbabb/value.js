<!-- SERVED MODEL: claude-opus-5-5 -->
<template>
    <!-- A2-VA-L1-9 — THE ONE API-STATUS CHIP, rendered from both seats: the
         dock band's lamp (`seat="dock"`, dev-gated, the one place a
         misconfigured dev box is named) and the save surface's degraded
         affordance (`seat="surface"`, Current Palette). The mark is glass
         `StatusDot`; the pill is glass `chipVariants()`. The ROOT is the
         consumer's own span because it is the LIVE-REGION HOST: glass `Chip`
         drops `role` (its attr filter), and the alert/status role IS the
         register (api-status.ts) — relayed as O-74d K-1. -->
    <span
        v-if="status"
        :class="
            chipVariants({
                size: 'sm',
                class: ['api-status-chip font-mono', seat === 'dock' && 'dock-status-lamp'],
            })
        "
        :data-seat="seat"
        :data-variant="status.variant"
        :role="status.role"
    >
        <StatusDot
            class="api-status-dot"
            :state="status.variant === 'misconfigured' ? 'error' : 'unknown'"
            motion="off"
        />
        <span class="api-status-label">{{ status.label }}</span>
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { chipVariants } from "@mkbabb/glass-ui/chip";
import { StatusDot } from "@mkbabb/glass-ui/status-dot";
import { useApiClient } from "../../../platform/transport/useApiClient";
import { resolveApiStatus, type ApiStatusSeat } from "./api-status";

const { seat } = defineProps<{ seat: ApiStatusSeat }>();

// The same injected api-client seam the per-surface affordances read
// (S.W2 W2-4) — never a hard module-singleton import.
const { availability } = useApiClient();
const isDev = import.meta.env.DEV;
const status = computed(() => resolveApiStatus(availability.value, isDev, seat));
</script>

<style scoped>
@reference "../../../styles/foundation.css";

/* The instrument register both seats speak: a small-caps mono caption. The
 * pill, its hairline and its padding are glass's (`chipVariants`). */
.api-status-chip {
    font-variant: small-caps;
    letter-spacing: 0.06em;
    line-height: 1;
    white-space: nowrap;
}

/* The `misconfigured` face — a dev-config ERROR, the loud register: the
 * destructive ink on its own tint. Distinct by construction from the muted
 * `unknown` mark (misconfigured ≠ unavailable — the S.W0-1 contract). */
.api-status-chip[data-variant="misconfigured"] {
    color: var(--destructive);
    border-color: color-mix(in oklab, var(--destructive) 55%, transparent);
    background: color-mix(in oklab, var(--destructive) 12%, transparent);
}

/* THE DOCK SEAT: band chrome, parked at the band's inline-end and centred on
 * the pill's axis — out of flow, so the dock's own centring never shifts when
 * the lamp arrives (the `.dock-band` is the positioning context). Below the
 * desktop band the label folds to the screen-reader layer so the lamp
 * compacts to its dot and never crowds the always-expanded 390 pill; the role
 * and the words stay in the accessibility tree. */
.api-status-chip[data-seat="dock"] {
    position: absolute;
    inset-inline-end: 0;
    top: 50%;
    translate: 0 -50%;
    pointer-events: none;
}
@media (max-width: 1023.98px) {
    .api-status-chip[data-seat="dock"] .api-status-label {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }
}

/* X.W12.e: lamp-dot-pulse lives in styles/animations.css (moved, never
 * deleted; the surface chip's identical `offline-dot-pulse` folds into it).
 * X-DS pass 1 (V1-11): the pulse plays three times when the chip ARRIVES (it
 * is v-if'd, so its mount is the state's entry), then rests. */
@media (prefers-reduced-motion: no-preference) {
    .api-status-dot {
        animation: lamp-dot-pulse 2.4s var(--ease-standard) 3;
    }
}
</style>
