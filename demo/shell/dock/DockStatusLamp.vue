<template>
    <!-- T.W6 · W6-6 (T-9 re-home) — the dock STATUS LAMP.
         First-paint: mounted with the dock band itself (never inside a
         collapsible layer, never gated on a palette save), so the
         `misconfigured` state is guaranteed visible the moment the shell
         paints — the guarantee the dead banner used to carry, re-homed as
         band chrome. Dev-gated + variant matrix: status-lamp.ts (the pure
         resolver; O-22 asserts the matrix there and the live render e2e).
         The S.W0-1 honesty contract (transport latch, synchronous
         DevMisconfigError, loud console.error, misconfigured ≠ unavailable)
         lives untouched in availability.ts — this lamp only READS the latch. -->
    <span
        v-if="lamp"
        class="dock-status-lamp fira-code"
        :data-variant="lamp.variant"
        :role="lamp.role"
    >
        <span class="lamp-dot" aria-hidden="true"></span>
        <span class="lamp-label">{{ lamp.label }}</span>
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useApiClient } from "../../platform/transport/useApiClient";
import { resolveLampState } from "./status-lamp";

// The same injected api-client seam the per-surface affordances read
// (S.W2 W2-4) — never a hard module-singleton import.
const { availability } = useApiClient();
const isDev = import.meta.env.DEV;
const lamp = computed(() => resolveLampState(availability.value, isDev));
</script>

<style scoped>
@reference "../../styles/foundation.css";

/* Band chrome: the lamp parks at the band's inline-end, vertically centred
   on the pill's axis — out of flow, so the dock's own centring never shifts
   when the lamp arrives. It reads as an instrument annotation etched into
   the chrome, in the ApiOfflineChip's exact register (small-caps mono
   caption, hairline edge, pill radius) — one status language, two seats. */
.dock-status-lamp {
    position: absolute;
    inset-inline-end: 0;
    top: 50%;
    translate: 0 -50%;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    pointer-events: none;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    font-size: var(--type-mono-caption, 0.6875rem);
    line-height: 1;
    padding: 0.3rem 0.55rem;
    border-radius: var(--radius-pill, 9999px);
    border: 1px solid var(--card-edge);
    color: color-mix(in oklab, var(--foreground) 72%, transparent);
    background: color-mix(in oklab, var(--background) 55%, transparent);
    white-space: nowrap;
}

/* Below the desktop band the label folds away — the lamp compacts to its
   dot so it never crowds the always-expanded 390 pill. The role + label
   stay in the accessibility tree (visually-hidden, not v-if'd). */
.lamp-label {
    display: none;
}
@media (min-width: 1024px) {
    .lamp-label {
        display: inline;
    }
}

/* The `unavailable` face — the instrument's "no signal" glyph: an OPEN
   ring in the muted ink, with the slow status pulse. Honest degradation,
   quiet register. */
.lamp-dot {
    flex: none;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: var(--radius-pill, 9999px);
    border: 1.5px solid currentColor;
    background: transparent;
}

/* The `misconfigured` face — a dev-config ERROR, the loud register: warning
   ink, a FILLED lamp. Distinct by construction from the muted open ring
   (misconfigured ≠ unavailable — the S.W0-1 contract, made visible). */
.dock-status-lamp[data-variant="misconfigured"] {
    color: var(--destructive, oklch(0.58 0.19 25));
    border-color: color-mix(
        in oklab,
        var(--destructive, oklch(0.58 0.19 25)) 55%,
        transparent
    );
    background: color-mix(
        in oklab,
        var(--destructive, oklch(0.58 0.19 25)) 12%,
        transparent
    );
}
.dock-status-lamp[data-variant="misconfigured"] .lamp-dot {
    border: none;
    background: currentColor;
}

@media (prefers-reduced-motion: no-preference) {
    @keyframes lamp-dot-pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.35;
        }
    }
    .lamp-dot {
        animation: lamp-dot-pulse 2.4s var(--ease-standard) infinite;
    }
}
</style>
