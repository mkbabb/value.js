<template>
    <Popover :open="open" @update:open="$emit('update:open', $event)">
        <!-- UIA-V-28 · A2-VA-X-4: a host that opens the editor from elsewhere
             (a card menu, the inspector, a dock seat) passes the element it
             belongs to; the content places against it. A PopoverContent with
             neither a trigger nor an anchor resolved against a null reference
             and painted at the viewport's corner, or above it. -->
        <PopoverAnchor v-if="anchor" :reference="anchor" />
        <PopoverTrigger v-else as-child>
            <slot name="trigger" />
        </PopoverTrigger>
        <PopoverContent align="start" class="w-52 p-0">
            <div class="px-3 py-2">
                <div class="section-label mb-2">Tags</div>

                <!-- Loading -->
                <div v-if="tagEdit.loading.value" class="flex items-center justify-center py-4">
                    <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
                </div>

                <!-- X.W12U.s2 · UIA-V-124: an unreachable catalog is not an empty
                     one — the failure is said, with a Retry, and the save-error
                     line below is left to save failures. -->
                <div v-else-if="catalogFailed" class="flex flex-col items-start gap-2 py-1">
                    <p role="alert" class="text-caption text-destructive">
                        {{ tagEdit.error.value }}
                    </p>
                    <Button size="xs" @click="tagEdit.loadAllTags(true)">Retry</Button>
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
                            :model-value="currentTags.includes(tag.name)"
                            @update:model-value="(v) => onToggle(tag.name, v === true)"
                            class="shrink-0"
                        />
                        <span class="truncate">{{ tag.name }}</span>
                        <span class="text-mono-caption text-muted-foreground ml-auto shrink-0">{{ tag.category }}</span>
                    </label>
                </div>

                <p
                    v-if="tagEdit.error.value && !catalogFailed"
                    role="alert"
                    class="mt-2 text-caption text-destructive"
                >
                    {{ tagEdit.error.value }}
                </p>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { PopoverAnchor } from "reka-ui";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Loader2 } from "@lucide/vue";
import { paletteETag } from "../../api";
import { BROWSE_PORT_KEY } from "../../usePalettePorts";

const { open, paletteSlug, currentTags, anchor = null } = defineProps<{
    open: boolean;
    paletteSlug: string;
    currentTags: string[];
    /** The element the editor belongs to, when it has no trigger slot. */
    anchor?: HTMLElement | null;
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    "update:tags": [tags: string[]];
}>();

// D.W3 Lane B: route through pm.tagEdit sub-object (was: direct getTags/updatePalette)
const pm = inject(BROWSE_PORT_KEY)!;
const tagEdit = pm.tagEdit;

/** The catalog never arrived: the error is the load's, not a save's. */
const catalogFailed = computed(
    () => !tagEdit.loaded.value && tagEdit.error.value !== null,
);

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

    // X.W12.u1 (UIA-V-35): the card's tags change only after the server keeps
    // them — a refused or failed save leaves the card and the checkbox as they
    // were, and says why beside the list.
    const saved = await tagEdit.saveTags(paletteSlug, updated, ifMatch);
    if (saved) emit("update:tags", saved.tags ?? updated);
}

watch(() => open, (isOpen) => {
    if (isOpen) tagEdit.loadAllTags();
});

onMounted(() => {
    if (open) tagEdit.loadAllTags();
});
</script>
