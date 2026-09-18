<template>
    <div
        role="list"
        class="palette-card-grid grid grid-cols-1 gap-3 min-h-[120px]"
        :class="gridClass"
    >
        <!-- role="list" — each child PaletteCard (role="article") sits in a list
             landmark. This comment is the div's first CHILD, not a sibling: a
             leading comment node would make this a multi-root component, and
             PalettesPane reads `$el` for useSortable — a fragment root resolves
             $el to the comment node, not the <div>. -->
        <slot />
        <!-- T.W6.5 · Lane S (R12 — the owner overrule of the D9 as-filler
             deployment; MANDATE §0.6 t33-audit-07/08/12): TRUE EMPTY is the
             EmptyState invitation ALONE — the watercolor dot trio + dashes
             speak (its default register, N-3 re-aimed), and "no palettes
             found" is never preceded by ghost cards. The ShadowPalette
             species survives at its ONE standing-instrument seat (Extract's
             k-threaded undeveloped plate). The CTA slot survives on the
             caption. -->
        <EmptyState
            v-if="empty"
            class="col-span-full"
            :message="emptyText"
            :eyebrow="emptyEyebrow"
            :hint="emptyHint"
        >
            <template v-if="$slots.emptyAction" #action>
                <slot name="emptyAction" />
            </template>
        </EmptyState>
    </div>
</template>

<script setup lang="ts">
import EmptyState from "../../../shared/ui/EmptyState.vue";

defineProps<{
    empty?: boolean;
    emptyText?: string;
    emptyEyebrow?: string;
    emptyHint?: string;
    gridClass?: string;
}>();
</script>

<style scoped>
/* CSS containment — isolates layout/paint scope for the card grid (D.W4 Lane A
 * §4: colocated from styles/style.css). */
.palette-card-grid {
    contain: content;
}
</style>
