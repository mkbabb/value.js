<template>
    <div
        ref="zoneRef"
        :class="[
            'group relative border-2 border-dashed transition-colors flex flex-col items-center justify-center overflow-hidden',
            'min-h-[140px]',
            disabled ? 'cursor-not-allowed' : preview ? 'cursor-crosshair' : 'cursor-pointer',
            isOverDropZone && !disabled
                ? 'rounded-panel border-primary bg-primary/10'
                : preview
                    ? 'rounded-panel border-transparent hover:border-primary/50'
                    : 'dashed-well',
        ]"
        role="button"
        :tabindex="disabled ? -1 : 0"
        :aria-disabled="disabled ? 'true' : undefined"
        :aria-label="preview ? 'Sample colors from the image' : 'Upload image'"
        :data-dragging="isOverDropZone && !disabled ? 'true' : undefined"
        @click="activate"
        @keydown.enter.space.prevent="activate"
    >
        <!-- W5-a11y: role="button" + tabindex + keyboard activation so the drop zone is reachable via keyboard -->
        <!-- S.W5-6 · F4: the specimen never lies — no veil over the field. The
             affordance lives at the EDGE: border ink on hover, a crosshair cursor
             when the click samples, and a corner badge.
             X.W7.g3 (§R3.2, wb-extract-imagedropzone): ONE act per state — empty,
             the zone asks its parent for the file dialog (`open`, R-16: the dialog
             is owned where both of its triggers live); populated, it samples
             (`sample`). The phantom `disableClick` degree of freedom is gone (R-19).
             Drag tracking is `useDropZone`'s enter/leave counter (R-5, R-17). -->
        <!-- morph family: one zone, new content (placeholder ↔ preview). -->
        <Transition name="vj-morph" mode="out-in">
            <img
                v-if="preview"
                :key="preview"
                :src="preview"
                class="w-full h-full object-contain rounded-panel"
                alt="Uploaded image"
            />
            <!-- T.W6.5 row 8 (F-4 sweep): the /50 post-hoc alpha dies — the
                 muted token is already the de-emphasis rung. -->
            <div v-else class="flex flex-col items-center gap-2 py-6 plate-ink">
                <ImagePlus class="w-7 h-7" />
                <span class="text-mono-small text-center px-4">Upload image</span>
            </div>
        </Transition>

        <!-- R-8 / R-27: the populated affordance is a real badge, painted on
             every device (no hover gate, no focus-visible dead code) on its own
             opaque ground — never plate ink composited over specimen pixels. -->
        <Badge
            v-if="preview"
            data-zone-affordance
            variant="secondary"
            size="sm"
            class="absolute bottom-1.5 right-1.5 section-label"
        >sample</Badge>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useDropZone } from "@vueuse/core";
import { ImagePlus } from "@lucide/vue";
import { Badge } from "@mkbabb/glass-ui/badge";

const { preview, disabled = false } = defineProps<{
    preview: string | null;
    /** Camera live or a run in flight: the zone takes no intake (R-12). */
    disabled?: boolean;
}>();

const emit = defineEmits<{
    file: [file: File];
    /** Empty zone activated: the owner opens the file dialog. */
    open: [];
    /** Populated zone activated: sample colours from the image. */
    sample: [];
}>();

const zoneRef = useTemplateRef<HTMLElement>("zoneRef");

function activate() {
    if (disabled) return;
    if (preview) emit("sample");
    else emit("open");
}

// X-W7 Repair 1 (EY-10): one intake rule for both paths. A non-image is not
// silently dropped here; the decode verdict says so in words.
const { isOverDropZone } = useDropZone(zoneRef, {
    multiple: false,
    preventDefaultForUnhandled: true,
    onDrop(files) {
        const file = files?.[0];
        if (file && !disabled) emit("file", file);
    },
});
</script>
