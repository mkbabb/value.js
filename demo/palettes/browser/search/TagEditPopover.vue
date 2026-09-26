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
        <!-- UIA-V-565: the glass overlay pad and width, not a p-0/w-52 override.
             UIA-V-566: the editor is named for its palette. -->
        <PopoverContent align="start" :aria-label="`Tags of ${paletteName}`">
            <div>
                <div class="section-label mb-2 truncate">Tags · {{ paletteName }}</div>

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

                <!-- The one tag chooser (UIA-V-125), grouped by category; every
                     chip is inert while a save is in flight (UIA-V-318). -->
                <TagChipSet
                    v-else
                    :label="`Tags of ${paletteName}`"
                    :tags="tagEdit.allTags.value"
                    :selected="currentTags"
                    :disabled="saving"
                    @toggle="onToggle"
                />

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
import { computed, inject, onMounted, ref, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { PopoverAnchor } from "reka-ui";
import { Button } from "../../../ui/button";
import TagChipSet from "./TagChipSet.vue";
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

/** The palette being tagged, named in the editor (UIA-V-566). */
const paletteName = computed(
    () => pm.remotePalettes.value.find((p) => p.slug === paletteSlug)?.name ?? paletteSlug,
);

/** One save at a time (UIA-V-318): the chips hold still until the server answers. */
const saving = ref(false);

async function onToggle(name: string, checked: boolean) {
    if (saving.value) return;
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
    // `saveTags` settles a verdict (the palette, or `undefined` with the reason
    // on `tagEdit.error`); it does not throw.
    saving.value = true;
    const saved = await tagEdit.saveTags(paletteSlug, updated, ifMatch);
    saving.value = false;
    if (saved) emit("update:tags", saved.tags ?? updated);
}

watch(() => open, (isOpen) => {
    if (isOpen) tagEdit.loadAllTags();
});

onMounted(() => {
    if (open) tagEdit.loadAllTags();
});
</script>
