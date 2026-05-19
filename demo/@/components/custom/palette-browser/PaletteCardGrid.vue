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
        <p
            v-if="empty"
            class="text-center text-muted-foreground py-8 fira-code text-mono-small italic"
        >
            {{ emptyText }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    empty?: boolean;
    emptyText?: string;
    gridClass?: string;
}>();
</script>
