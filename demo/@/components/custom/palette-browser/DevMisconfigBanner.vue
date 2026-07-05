<template>
    <!-- S.W0 W0-1 (seed rider 1): the ALWAYS-MOUNTED dev-misconfig banner.
         `ApiOfflineChip` only mounts inside `CurrentPaletteEditor` (and only
         once a palette is saved), so the `misconfigured` state is not
         guaranteed visible at first paint. This App-level banner guarantees
         it. Bound to the same designed `apiAvailability === "misconfigured"`
         state; the unconditional `console.error` in `initApiEnvironment`
         remains the load-bearing signal. Dev-only: the misconfig precondition
         (loopback origin + unset VITE_API_URL + cross-origin prod BASE_URL) is
         provably unreachable in production, and `import.meta.env.DEV` makes the
         gate explicit — this banner ships zero bytes of runtime cost to the
         production build. -->
    <div
        v-if="isDev && misconfigured"
        role="alert"
        class="dev-misconfig-banner fira-code"
    >
        <span class="dev-misconfig-dot" aria-hidden="true"></span>
        <span class="dev-misconfig-text">
            value.js dev is misconfigured — no local backend. Run
            <code>npm run dev</code> (the full local stack) instead of
            <code>npm run dev:web-only</code>. Palette / API features will fail
            until then. This is a dev-config error, not "backend offline".
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useApiClient } from "@lib/palette/api/useApiClient";

const isDev = import.meta.env.DEV;
// S.W2 W2-4: read the availability latch through the injected api-client seam,
// not a hard module-singleton import. This banner mounts under App.vue's
// provideApiClient() root, so inject resolves (mirrors ApiOfflineChip /
// PaletteCardMenu, the already-migrated siblings).
const { availability } = useApiClient();
const misconfigured = computed(() => availability.value === "misconfigured");
</script>

<style scoped>
.dev-misconfig-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 1rem;
    font-size: var(--type-mono-caption, 0.6875rem);
    letter-spacing: 0.02em;
    line-height: 1.3;
    color: var(--destructive-foreground, oklch(0.98 0 0));
    background: var(--destructive, oklch(0.58 0.19 25));
    border-bottom: 1px solid
        color-mix(in oklab, black 30%, var(--destructive, oklch(0.58 0.19 25)));
    box-shadow: 0 2px 12px color-mix(in oklab, black 25%, transparent);
}

.dev-misconfig-banner code {
    font-weight: 600;
    padding: 0.05rem 0.3rem;
    border-radius: var(--radius-sm, 0.25rem);
    background: color-mix(in oklab, black 22%, transparent);
}

.dev-misconfig-dot {
    flex: none;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--radius-pill, 9999px);
    background: currentColor;
}

.dev-misconfig-text {
    min-width: 0;
}

@media (prefers-reduced-motion: no-preference) {
    @keyframes dev-misconfig-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
    .dev-misconfig-dot {
        animation: dev-misconfig-pulse 2s var(--ease-standard, ease) infinite;
    }
}
</style>
