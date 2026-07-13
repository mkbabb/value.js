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

<script setup lang="ts">
import { ref, nextTick, onErrorCaptured, useTemplateRef } from "vue";
import { CircleAlert, RotateCcw } from "@lucide/vue";
import { Button } from "@components/ui/button";

const {
    message = "This panel hit an unexpected error.",
    retryLabel = "Try again",
} = defineProps<{
    /** The Fraunces statement of failure (plain register — no second invitation). */
    message?: string;
    /** The recovery affordance label. */
    retryLabel?: string;
}>();

const emit = defineEmits<{ reset: [] }>();

const caught = ref(false);
const detail = ref<string | null>(null);
const alertRef = useTemplateRef<HTMLElement>("alertRef");

onErrorCaptured((err) => {
    caught.value = true;
    detail.value = err instanceof Error ? err.message : String(err);
    // Focus-manage: move focus INTO the announced boundary AFTER the fallback
    // paints, so the keyboard / SR user is never left on the unmounted subtree.
    nextTick(() => alertRef.value?.focus());
    // This boundary OWNS the failure — stop the throw propagating to the app
    // root (the white-screen). Returning false halts further onErrorCaptured /
    // app.config.errorHandler propagation.
    return false;
});

function reset() {
    caught.value = false;
    detail.value = null;
    emit("reset");
}
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
