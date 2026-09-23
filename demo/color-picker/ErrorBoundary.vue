<template>
    <!-- U.W-A11Y · U-F58 (thrown-error a11y half): a focus-managed,
         SR-ANNOUNCED error boundary — NEVER a silent white-screen dead plate.
         When any descendant pane throws during render / lifecycle, this catches
         it and paints an announced fallback IN PLACE of the dead subtree:
           · role="alert" + aria-live="assertive" — a status message a screen
             reader speaks the moment it appears (WCAG 4.1.3 Status Messages);
           · tabindex=-1 + focus() on catch — focus moves INTO the boundary so a
             keyboard / SR user LANDS on the recovery affordance instead of being
             stranded on the now-unmounted tree (WCAG 2.4.3 Focus Order);
           · a real recovery <button> — never a terminal dead end.
         The plain register mirrors EmptyState's `error` variant (Q6: quiet
         destructive glyph, Fraunces statement, the machine truth in Fira on the
         certified `--ink-muted` de-emphasis rung — no new sub-floor detail). -->
    <div
        v-if="caught"
        ref="alertRef"
        class="vj-error-boundary flex flex-col items-center justify-center gap-3 py-10 px-6 text-center h-full w-full min-h-0"
        role="alert"
        aria-live="assertive"
        tabindex="-1"
    >
        <CircleAlert class="w-7 h-7 text-destructive/80" aria-hidden="true" />
        <p class="font-display text-heading text-foreground max-w-[28ch] text-balance leading-snug">
            {{ message }}
        </p>
        <p v-if="detail" class="text-mono-small plate-ink max-w-[46ch] break-words">
            {{ detail }}
        </p>
        <Button variant="outline" size="sm" class="font-display mt-1" @click="reset">
            <RotateCcw class="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
            {{ retryLabel }}
        </Button>
    </div>
    <slot v-else />
</template>

<script lang="ts">
import type { InjectionKey } from "vue";

/**
 * X.W5.d2 · EB-2 (fold W5F-53) — the reporting half of the containment
 * transposition. An owning boundary stops propagation (it must: the failure is
 * contained here, not white-screened), which also stopped it reaching the
 * composition root's reporting floor — a caught failure was contained AND
 * unreported. `main.ts` provides its reporter under this key; every boundary
 * reports what it catches through it, then stops the throw.
 */
export type FailureReporter = (channel: string, thrown: unknown, info?: string) => void;
export const FAILURE_REPORTER_KEY: InjectionKey<FailureReporter> = Symbol("failure-reporter");
</script>

<script setup lang="ts">
import { ref, nextTick, onErrorCaptured, useTemplateRef, inject, watch } from "vue";
import { CircleAlert, RotateCcw } from "@lucide/vue";
import { Button } from "../ui/button";
import { PaneChunkError } from "../shell/PaneErrorPlate.vue";

const {
    message = "This panel hit an unexpected error.",
    retryLabel = "Try again",
    resetKey,
} = defineProps<{
    /** The Fraunces statement of failure (plain register — no second invitation). */
    message?: string;
    /** The recovery affordance label. */
    retryLabel?: string;
    /**
     * X.W5.d2 · EB-2's ROUTE-RESET arm (fold W5F-07: "per-slot boundary keyed
     * on `componentKey`"). The key of the pane this boundary currently guards.
     * When it changes, a caught plate belongs to a pane the user has left, so
     * the latch clears and the region renders the pane they navigated to.
     * This is a WATCH, never a `:key` on the boundary: keying would remount the
     * slot beneath it and destroy its `<KeepAlive>` cache and WebGL contexts on
     * every navigation, and the only other shape — a boundary cached INSIDE
     * `<KeepAlive>` — is KILLED by ⟨ErrorBoundary R-7⟩.
     */
    resetKey?: string;
}>();

const emit = defineEmits<{ reset: [] }>();

const caught = ref(false);
const detail = ref<string | null>(null);
const alertRef = useTemplateRef<HTMLElement>("alertRef");
const report = inject(FAILURE_REPORTER_KEY, null);

onErrorCaptured((err, _instance, info) => {
    report?.(err instanceof PaneChunkError ? "pane-chunk" : "boundary", err, info);
    // A pane CHUNK that failed to load is an environment failure its own
    // error plate owns (`PaneErrorPlate`, rendered in place by the async
    // wrapper, with the reload that is its only cure). Latching here too would
    // replace that plate with a retry that cannot succeed — EB R-1's latch.
    if (err instanceof PaneChunkError) return false;
    caught.value = true;
    detail.value = err instanceof Error ? err.message : String(err);
    // Focus-manage: move focus INTO the announced boundary AFTER the fallback
    // paints, so the keyboard / SR user is never left on the unmounted subtree.
    nextTick(() => alertRef.value?.focus());
    // This boundary OWNS the failure — stop the throw propagating to the app
    // root (the white-screen). Returning false halts further onErrorCaptured /
    // app.config.errorHandler propagation; the report above already went out.
    return false;
});

function reset() {
    caught.value = false;
    detail.value = null;
    emit("reset");
}

watch(
    () => resetKey,
    () => {
        if (caught.value) reset();
    },
);
</script>

<style scoped>
/* The machine-truth detail line threads the certified de-emphasis rung
 * (`--ink-muted` — boot-stamped, floor-clamped against the live resting plate;
 * the same rung EmptyState's error `detail` rides), so this new surface adds NO
 * sub-floor contrast debt (the U-F26 error-detail contrast lane is coordinated,
 * not double-cured here). */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
