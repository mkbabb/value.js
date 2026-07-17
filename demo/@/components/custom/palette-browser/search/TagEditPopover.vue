<template>
    <Popover :open="open" @update:open="$emit('update:open', $event)">
        <PopoverTrigger as-child>
            <slot name="trigger" />
        </PopoverTrigger>
        <PopoverContent align="start" class="w-52 p-0">
            <div class="px-3 py-2">
                <div class="section-label mb-2">Tags</div>

                <!-- Loading -->
                <div v-if="tagEdit.loading.value" class="flex items-center justify-center py-4">
                    <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
                </div>

                <!-- Empty -->
                <div v-else-if="tagEdit.allTags.value.length === 0" class="text-caption text-muted-foreground italic py-2">
                    No tags available.
                </div>

                <!-- Tag checkboxes -->
                <div v-else class="flex flex-col gap-0.5 max-h-40 overflow-y-auto scrollbar-thin">
                    <label
                        v-for="tag in tagEdit.allTags.value"
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
import { inject, onMounted, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Checkbox } from "../../../ui/checkbox";
import { Loader2 } from "@lucide/vue";
import { paletteETag } from "../../../../../palettes/api";
import { PALETTE_MANAGER_KEY } from "../../../../composables/palette/usePaletteManager";

const { open, paletteSlug, currentTags } = defineProps<{
    open: boolean;
    paletteSlug: string;
    currentTags: string[];
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    "update:tags": [tags: string[]];
}>();

// D.W3 Lane B: route through pm.tagEdit sub-object (was: direct getTags/updatePalette)
const pm = inject(PALETTE_MANAGER_KEY)!;
const tagEdit = pm.tagEdit;

async function onToggle(name: string, checked: boolean) {
    const updated = checked
        ? [...currentTags, name]
        : currentTags.filter((t) => t !== name);

    // W5-13 · F-9: derive the captured If-Match validator from the palette we
    // already hold in the browse list (BEFORE the emit mutates its tags — the
    // ETag reads `currentHash`/`updatedAt`, which the tag edit hasn't bumped
    // yet). Falls back to the `"*"` match-any when the row isn't in hand.
    const source = pm.remotePalettes.value.find((p) => p.slug === paletteSlug);
    const ifMatch = source ? paletteETag(source) : undefined;

    emit("update:tags", updated);
    await tagEdit.saveTags(paletteSlug, updated, ifMatch);
}

watch(() => open, (isOpen) => {
    if (isOpen) tagEdit.loadAllTags();
});

onMounted(() => {
    if (open) tagEdit.loadAllTags();
});
</script>
