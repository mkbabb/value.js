<template>
    <Popover :open="open" @update:open="$emit('update:open', $event)">
        <PopoverTrigger as-child>
            <slot name="trigger" />
        </PopoverTrigger>
        <PopoverContent align="start" class="w-52 p-0">
            <div class="px-3 py-2">
                <div class="section-label mb-2">Tags</div>

                <!-- Loading -->
                <div v-if="loading" class="flex items-center justify-center py-4">
                    <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
                </div>

                <!-- Empty -->
                <div v-else-if="allTags.length === 0" class="text-caption text-muted-foreground italic py-2">
                    No tags available.
                </div>

                <!-- Tag checkboxes -->
                <div v-else class="flex flex-col gap-0.5 max-h-40 overflow-y-auto">
                    <label
                        v-for="tag in allTags"
                        :key="tag.name"
                        class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                        <Checkbox
                            :checked="currentTags.includes(tag.name)"
                            @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
                            class="shrink-0"
                        />
                        <span class="truncate">{{ tag.name }}</span>
                        <span class="text-mono-caption text-muted-foreground ml-auto shrink-0">{{ tag.category }}</span>
                    </label>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Checkbox } from "@components/ui/checkbox";
import { Loader2 } from "lucide-vue-next";
import { getTags, updatePalette } from "@lib/palette/api";
import type { Tag } from "@lib/palette/types";

const props = defineProps<{
    open: boolean;
    paletteSlug: string;
    currentTags: string[];
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    "update:tags": [tags: string[]];
}>();

const allTags = ref<Tag[]>([]);
const loading = ref(false);

async function loadTags() {
    if (allTags.value.length > 0) return;
    loading.value = true;
    try {
        allTags.value = await getTags();
    } catch {
        // silent
    } finally {
        loading.value = false;
    }
}

async function onToggle(name: string, checked: boolean) {
    const updated = checked
        ? [...props.currentTags, name]
        : props.currentTags.filter((t) => t !== name);

    emit("update:tags", updated);

    try {
        await updatePalette(props.paletteSlug, { tags: updated });
    } catch (e) {
        console.warn("Failed to update tags:", e);
    }
}

watch(() => props.open, (isOpen) => {
    if (isOpen) loadTags();
});

onMounted(() => {
    if (props.open) loadTags();
});
</script>
