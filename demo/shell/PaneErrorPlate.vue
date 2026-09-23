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
        <Card
            tier="resting"
            class="w-full h-full min-w-0 flex flex-col items-center justify-center gap-3 py-10 px-6 text-center"
            role="alert"
        >
            <CircleAlert class="w-7 h-7 text-destructive/80" aria-hidden="true" />
            <p class="font-display text-heading text-foreground max-w-[28ch] text-balance leading-snug">
                This scene could not be loaded.
            </p>
            <p v-if="detail" class="text-mono-small plate-ink max-w-[46ch] break-words">
                {{ detail }}
            </p>
            <Button variant="outline" size="sm" class="font-display mt-1" @click="reload">
                <RotateCcw class="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Reload the app
            </Button>
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
import { computed } from "vue";
import { CircleAlert, RotateCcw } from "@lucide/vue";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

/** `defineAsyncComponent` hands its `errorComponent` the loader's error. */
const { error } = defineProps<{ error?: unknown }>();

const detail = computed(() => (error instanceof Error ? error.message : null));

function reload() {
    window.location.reload();
}
</script>

<style scoped>
/* The certified de-emphasis rung, the same one ErrorBoundary's detail rides. */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
