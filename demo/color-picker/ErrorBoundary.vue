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
         X.W7.g (N-9 · EB-9 ≡ ES-6): the plate IS EmptyState's `error`
         variant — the one failure-register implementation, composed, never
         cloned. The fork this replaced re-authored the same glyph / Fraunces
         statement / Fira detail with five drifted magnitudes (gap, block and
         inline padding, glyph size, both measure caps) and a byte-identical
         de-emphasis-rung rule;
         the boundary now adds only what is its own: the assertive live
         region, the focus target, and the full-region fill. -->
    <!-- X.W12.u3 (UIA-V-184): the fallback stands on the pane's resting
         surface, filling the region — the composition PaneErrorPlate already
         uses — never a bare plate painted on the atmosphere ground. The
         landing target is a screen-reader landing, not a control, so it draws
         no square UA outline around the region (UIA-V-455); the Try-again
         button keeps glass's focus ring. -->
    <Card
        v-if="caught"
        tier="resting"
        class="w-full h-full min-w-0 min-h-0 flex flex-col justify-center px-6"
    >
        <EmptyState
            ref="plateRef"
            variant="error"
            class="vj-error-boundary w-full min-h-0 outline-none"
            aria-live="assertive"
            tabindex="-1"
            :message="message"
            :detail="detail ?? undefined"
        >
            <template #action>
                <Button size="sm" class="font-display mt-1" @click="reset">
                    <RotateCcw class="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    {{ retryLabel }}
                </Button>
            </template>
        </EmptyState>
    </Card>
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
import { RotateCcw } from "@lucide/vue";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import EmptyState from "../shared/ui/EmptyState.vue";
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
const plateRef = useTemplateRef<InstanceType<typeof EmptyState>>("plateRef");
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
    nextTick(() => plateRef.value?.focus());
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
