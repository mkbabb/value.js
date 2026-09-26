<template>
    <!-- X.W12U.s2 · UIA-V-125: the ONE tag chooser. The Browse filter and the
         tag editor both render the catalogue through it — glass selectable
         Chips (a pressed button each), grouped under one heading per category
         instead of a category label repeated on every row (UIA-V-316). The
         set wraps; nothing scrolls inside it. -->
    <div class="tag-chip-set">
        <div v-for="group in groups" :key="group.category" class="tag-chip-set__group">
            <div v-if="groups.length > 1" :id="`${uid}-${group.category}`" class="tag-chip-set__label">
                {{ group.category }}
            </div>
            <div
                class="flex flex-wrap gap-1.5"
                role="group"
                :aria-labelledby="groups.length > 1 ? `${uid}-${group.category}` : undefined"
                :aria-label="groups.length > 1 ? undefined : label"
            >
                <Chip
                    v-for="tag in group.tags"
                    :key="tag.name"
                    mode="selectable"
                    size="sm"
                    :disabled="disabled"
                    :model-value="selected.includes(tag.name)"
                    @update:model-value="(on: boolean) => $emit('toggle', tag.name, on)"
                >
                    {{ tag.name }}
                </Chip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";
import { Chip } from "@mkbabb/glass-ui/chip";
import type { Tag } from "../../types";

const { tags, selected, disabled = false, label = "Tags" } = defineProps<{
    tags: Tag[];
    selected: string[];
    /** Every chip inert (a save in flight). */
    disabled?: boolean;
    /** The set's accessible name when it is not grouped. */
    label?: string;
}>();

defineEmits<{
    toggle: [name: string, on: boolean];
}>();

const uid = useId();

/** Catalogue order is kept inside each category; categories keep first-seen order. */
const groups = computed(() => {
    const by = new Map<string, Tag[]>();
    for (const tag of tags) {
        const key = tag.category || "other";
        const list = by.get(key);
        if (list) list.push(tag);
        else by.set(key, [tag]);
    }
    return [...by].map(([category, list]) => ({ category, tags: list }));
});
</script>

<style scoped>
.tag-chip-set {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.tag-chip-set__label {
    margin-block-end: 0.25rem;
    font-size: var(--type-caption);
    line-height: var(--leading-caption);
    color: var(--muted-foreground);
}
</style>
