<template>
    <!-- B4: the lens-named micro-label, surfaced for the detent's duration.
         Appear/fade is a CSS transition (neutralised by the global
         prefers-reduced-motion guard); the detent itself is drag physics —
         state, not decoration. -->
    <Transition name="vj-enter">
        <span
            v-if="visible"
            :class="['detent-label', flip && 'detent-label--flip']"
            :style="{ left, top }"
            aria-hidden="true"
            >{{ text }} ⊣</span
        >
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    visible: boolean;
    text: string;
    left: string;
    top: string;
    /** Near the right edge the chip flips to the cursor's left. */
    flip: boolean;
}>();
</script>

<style scoped>
@reference "../../../../styles/style.css";

/* Fira Code, lens-named, a paper chip so the tick reads over any field
 * region. Painted above the dot by DOM order. The contour lives near the
 * TOP edge, so the label falls BELOW the cursor (never off-plate). */
.detent-label {
    position: absolute;
    transform: translate(0.9rem, 0.9rem);
    /* vj-enter geometry pinned to the REST transform → pure opacity fade. */
    --vj-enter-x: 0.9rem;
    --vj-enter-y: 0.9rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    line-height: 1;
    white-space: nowrap;
    padding: 0.1875rem 0.375rem;
    border-radius: var(--radius-sm);
    color: var(--foreground);
    background: color-mix(in oklab, var(--background) 82%, transparent);
    border: 1px solid var(--gamut-edge);
    pointer-events: none;
}

.detent-label--flip {
    transform: translate(calc(-100% - 0.9rem), 0.9rem);
    --vj-enter-x: calc(-100% - 0.9rem);
}

</style>
