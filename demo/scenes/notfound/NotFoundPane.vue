<!-- SERVED MODEL: claude-opus-5[1m] -->
<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card
            tier="resting"
            class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full"
        >
            <PaneHeader>Not Found</PaneHeader>
            <!-- X.W12.u3 — the dead end speaks the app's EmptyState register
                 (UIA-V-447): one statement, the address that missed as the
                 plate's machine-truth line in Fira on the certified ink
                 (UIA-V-446/449; it replaces the two developer-voice sentences
                 and the static muted ink), and the way home on glass's quiet
                 emphasis, which paints its own hover (UIA-V-183/656). -->
            <EmptyState
                variant="error"
                message="This address names no view of this app."
                :detail="missedAddress"
            >
                <template #action>
                    <Button size="sm" emphasis="quiet" @click="goHome">
                        <Home class="w-4 h-4 shrink-0" aria-hidden="true" />
                        Back to the picker
                    </Button>
                </template>
            </EmptyState>
        </Card>
    </div>
</template>

<script setup lang="ts">
/**
 * NotFoundPane — the terminal view for an address that names no route, and the
 * destination the admin guard fail-closes to.
 *
 * X-W3 · X.W3.6 · G-20. This is the wave's ONE non-`Stub` route component
 * (W3.md §Dispositions D-4): `router/index.ts` carried fourteen
 * `component: Stub` records and a `{ path: "/:pathMatch(.*)*", redirect: "/" }`
 * catch-all that rewrote every unknown URL to the picker — "a correct render of
 * the wrong thing". The catch-all is now a named `not-found` record rendering
 * THIS component, and `viewSchema.ts` carries the matching `not-found` view so
 * the pane system resolves it the same way it resolves every other view. The
 * remaining fourteen `Stub` records are X-W5's (CC-049), not smuggled here.
 *
 * It is also where `router/guards.ts` sends an unauthenticated visitor who types
 * an admin URL: resolving to not-found rather than to the picker keeps the guard
 * from confirming that `/admin/users` is a real route.
 */
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { Home } from "@lucide/vue";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import PaneHeader from "../../shared/ui/PaneHeader.vue";
import EmptyState from "../../shared/ui/EmptyState.vue";
import { VIEW_MANAGER_KEY } from "../../shell/useViewManager";

// The shell's own navigation seam (App.vue provides it) — not a raw
// `router.push`, so the return trip carries the query the rest of the app
// carries and records `previousView` like every other view switch.
const viewManager = inject(VIEW_MANAGER_KEY)!;
const route = useRoute();

// The address that missed, as the visitor reads it: the catch-all's decoded
// `pathMatch` segments (the guard's fail-close carries the same param), never
// the percent-encoded `route.path`.
const missedAddress = computed(() => {
    const match = route.params.pathMatch;
    return match === undefined ? route.path : `/${[match].flat().join("/")}`;
});

function goHome(): void {
    viewManager.switchView("picker");
}
</script>
