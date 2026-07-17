<template>
    <!-- The K-INV5 degraded-backend affordance (R.W3 residual): a DESIGNED
         state in the instrument's own register — a Fira Code small-caps
         annotation chip with a hairline ink edge and a slow status pulse —
         never an apologetic toast. Self-gating: renders nothing while the
         backend is reachable.

         S.W0 W0-1: the `misconfigured` state is a DISTINCT, louder register
         (a filled warning dot + an actionable dev message), never conflated
         with the honest "backend offline — saved locally" degraded state. -->
    <span
        v-if="misconfigured"
        role="alert"
        class="api-offline-chip api-misconfig-chip fira-code"
    >
        <span class="misconfig-dot" aria-hidden="true"></span>
        dev misconfigured — run `npm run dev`
    </span>
    <span
        v-else-if="offline"
        role="status"
        class="api-offline-chip fira-code"
    >
        <span class="offline-dot" aria-hidden="true"></span>
        backend offline — saved locally
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useApiClient } from "../../../../../platform/transport/useApiClient";

// S.W2 W2-4: read the availability latch through the injected api-client seam,
// not a hard module-singleton import.
const { availability } = useApiClient();
const offline = computed(() => availability.value === "unavailable");
const misconfigured = computed(() => availability.value === "misconfigured");
</script>

<style scoped>
.api-offline-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    font-size: var(--type-mono-caption, 0.6875rem);
    line-height: 1;
    padding: 0.3rem 0.7rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--card-edge);
    color: color-mix(in oklab, var(--foreground) 72%, transparent);
    background: color-mix(in oklab, var(--background) 55%, transparent);
    white-space: nowrap;
}

.offline-dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: var(--radius-pill);
    /* An OPEN ring, not a filled lamp: the instrument's "no signal" glyph. */
    border: 1.5px solid currentColor;
    background: transparent;
}

/* The misconfig register: a warning ink, a FILLED lamp — a deliberate,
   attention-owning state, distinct from the muted "no signal" ring. */
.api-misconfig-chip {
    color: var(--destructive, oklch(0.58 0.19 25));
    border-color: color-mix(in oklab, var(--destructive, oklch(0.58 0.19 25)) 55%, transparent);
    background: color-mix(in oklab, var(--destructive, oklch(0.58 0.19 25)) 12%, transparent);
}

.misconfig-dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: var(--radius-pill);
    background: currentColor;
}

@media (prefers-reduced-motion: no-preference) {
    @keyframes offline-dot-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
    }
    .offline-dot,
    .misconfig-dot {
        animation: offline-dot-pulse 2.4s var(--ease-standard) infinite;
    }
}
</style>
