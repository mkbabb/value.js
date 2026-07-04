<template>
    <!-- The K-INV5 degraded-backend affordance (R.W3 residual): a DESIGNED
         state in the instrument's own register — a Fira Code small-caps
         annotation chip with a hairline ink edge and a slow status pulse —
         never an apologetic toast. Self-gating: renders nothing while the
         backend is reachable. -->
    <span v-if="offline" role="status" class="api-offline-chip fira-code">
        <span class="offline-dot" aria-hidden="true"></span>
        backend offline — saved locally
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { apiAvailability } from "@lib/palette/api";

const offline = computed(() => apiAvailability.value === "unavailable");
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

@media (prefers-reduced-motion: no-preference) {
    @keyframes offline-dot-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
    }
    .offline-dot {
        animation: offline-dot-pulse 2.4s var(--ease-standard) infinite;
    }
}
</style>
