<!-- SERVED MODEL: claude-opus-5-5[1m] -->
<template>
    <div class="pane-plate relative w-full mx-auto h-full min-w-0">
        <!-- X.W5.d2 · P-3 (fold W5F-07 ≡ EB-4): a pane chunk that failed to load.
             The shipped detail string for this class is "Importing a module
             script failed." — a stale chunk after a deploy, whose only cure is a
             reload. So the plate offers the reload, in place, inside its region;
             the region's `<ErrorBoundary>` does NOT latch on this failure (it
             reads `PaneChunkError` and lets this plate own it — EB R-1: loader
             options alone never stop propagation into the boundary, so EB-4 and
             EB-2 land together). -->
        <!-- ONE root element, no sibling comment: a comment beside the root
             makes a dev-root fragment, which loses the slot's out-in
             continuation (PaneSlot.vue header). -->
        <!-- X.W7.g2 (N-9 · §0bk.3 — the drifted error-plate set, one copy):
             the statement, glyph, detail and their magnitudes are EmptyState's
             `error` variant — composed, never cloned (ErrorBoundary composes
             the same plate). This plate adds only what is its own: the pane's
             resting surface filling the region, and the reload action. -->
        <Card
            tier="resting"
            class="w-full h-full min-w-0 flex flex-col justify-center px-6"
        >
            <!-- X.W12.u3 (UIA-V-453): the loader's raw message (dev URL,
                 filesystem path, cache-buster) stays out of the UI — the
                 failure reporter already carries it; the plate states the
                 failure and its one cure in the human register. -->
            <EmptyState
                variant="error"
                message="This scene could not be loaded. Reload to continue."
            >
                <template #action>
                    <Button size="sm" class="font-display mt-1" @click="reload">
                        <RotateCcw class="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                        Reload the app
                    </Button>
                </template>
            </EmptyState>
        </Card>
    </div>
</template>

<script lang="ts">
/**
 * The typed failure of a pane's CHUNK LOAD — the loader's rejection, carried
 * with the pane it belongs to. `usePaneRouter` raises it from each pane's
 * loader; `ErrorBoundary` reads it to tell an environment failure this plate
 * owns (reload) from a render/lifecycle throw the boundary owns (retry).
 */
export class PaneChunkError extends Error {
    override readonly name = "PaneChunkError";

    constructor(
        readonly pane: string,
        options: { cause: unknown },
    ) {
        const cause = options.cause;
        super(cause instanceof Error ? cause.message : String(cause), options);
    }
}
</script>

<script setup lang="ts">
import { RotateCcw } from "@lucide/vue";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import EmptyState from "../shared/ui/EmptyState.vue";

/** `defineAsyncComponent` hands its `errorComponent` the loader's error; the
 *  plate does not print it (UIA-V-453) — the region's reporter logs it. */
defineProps<{ error?: unknown }>();

function reload() {
    window.location.reload();
}
</script>
