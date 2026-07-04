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
        <!-- R.W4 Lane A / A4: the designed specimen-plate invitation replaces
             the former grey italic mono apology. -->
        <EmptyState
            v-if="empty"
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
import EmptyState from "./EmptyState.vue";

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
