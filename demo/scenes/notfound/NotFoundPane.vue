<!-- SERVED MODEL: claude-opus-5[1m] -->
<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card
            tier="resting"
            class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full"
        >
            <PaneHeader description="That address does not name a view of this app.">
                Not Found
            </PaneHeader>
            <div class="px-4 sm:px-6 pb-6 pt-2 flex flex-col items-start gap-4">
                <p class="text-body text-muted-foreground max-w-prose">
                    The demo resolves every address to a named view. This one resolves
                    to none of them — either it was mistyped, or it names a surface this
                    build does not carry.
                </p>
                <Button size="sm" @click="goHome">
                    <Home class="w-4 h-4 shrink-0" />
                    Back to the picker
                </Button>
            </div>
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
import { inject } from "vue";
import { Home } from "@lucide/vue";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import PaneHeader from "../../shared/ui/PaneHeader.vue";
import { VIEW_MANAGER_KEY } from "../../shell/useViewManager";

// The shell's own navigation seam (App.vue provides it) — not a raw
// `router.push`, so the return trip carries the query the rest of the app
// carries and records `previousView` like every other view switch.
const viewManager = inject(VIEW_MANAGER_KEY)!;

function goHome(): void {
    viewManager.switchView("picker");
}
</script>
