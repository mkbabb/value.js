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
        <!-- T.W3-2 · D9 (the shadow-palette rule, T-19 generalized —
             supersedes R.W4 A4's naked plate): the empty grid renders
             shadow palettes IN the grid cells — absence occupies the same
             space presence would — with the caption seated in-grid
             (dot-ghosts shed per N-3) and the CTA slot surviving on the
             caption. The text plate captions the ghost; it never
             substitutes. One change, every grid host cured. -->
        <template v-if="empty">
            <ShadowPalette
                v-for="i in ghostCount"
                :key="`ghost-${i}`"
                :hue-offset="(i - 1) * 2"
            />
            <EmptyState
                class="col-span-full"
                :dots="false"
                :message="emptyText"
                :eyebrow="emptyEyebrow"
                :hint="emptyHint"
            >
                <template v-if="$slots.emptyAction" #action>
                    <slot name="emptyAction" />
                </template>
            </EmptyState>
        </template>
    </div>
</template>

<script setup lang="ts">
import EmptyState from "@components/common/EmptyState.vue";
import ShadowPalette from "./ShadowPalette.vue";

const { ghostCount = 3 } = defineProps<{
    empty?: boolean;
    emptyText?: string;
    emptyEyebrow?: string;
    emptyHint?: string;
    gridClass?: string;
    /** D9: how many ghost cards seat in the empty cells (grid default 3). */
    ghostCount?: number;
}>();
</script>

<style scoped>
/* CSS containment — isolates layout/paint scope for the card grid (D.W4 Lane A
 * §4: colocated from styles/style.css). */
.palette-card-grid {
    contain: content;
}
</style>
