<template>
    <!-- W5-a11y: role="button" + tabindex + keyboard activation so the drop zone is reachable via keyboard -->
    <!-- S.W5-6 · F4: the specimen never lies — no veil over the field. The
         affordance lives at the EDGE: border ink on hover, a crosshair cursor
         when the click samples, and a corner Fira tag. -->
    <div
        :class="[
            'group relative rounded-panel border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden',
            'min-h-[140px]',
            preview && disableClick ? 'cursor-crosshair' : 'cursor-pointer',
            dragging
                ? 'border-primary bg-primary/10 scale-[1.01]'
                : preview
                    ? 'border-transparent hover:border-primary/50 bg-primary/5'
                    : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10',
        ]"
        :style="{ transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-standard)' }"
        role="button"
        :tabindex="disableClick ? -1 : 0"
        :aria-label="preview ? (disableClick ? 'Image preview area, tap to sample colors' : 'Replace image, click or drop a new image') : 'Upload image, click to browse or drop an image here'"
        @click="!disableClick && openFilePicker()"
        @keydown.enter.space.prevent="!disableClick && openFilePicker()"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
    >
        <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileSelected"
        />

        <!-- morph family: one zone, new content (placeholder ↔ preview). -->
        <Transition name="vj-morph" mode="out-in">
            <img
                v-if="preview"
                :key="preview"
                :src="preview"
                class="w-full h-full object-contain rounded-xl"
                alt="Uploaded image"
            />
            <!-- T.W6.5 row 8 (F-4 sweep): the /50 post-hoc alpha dies — the
                 muted token is already the de-emphasis rung. -->
            <div v-else class="flex flex-col items-center gap-2 py-6 plate-ink">
                <ImagePlus class="w-7 h-7" />
                <span class="text-mono-small text-center px-4">
                    Drop an image or click to browse
                </span>
            </div>
        </Transition>

        <!-- Corner Fira tag — the edge affordance (never a wash over the
             specimen): a tiny chip that inks in on hover/focus. -->
        <span
            v-if="preview"
            class="absolute bottom-1.5 right-1.5 rounded-sm bg-background/85 px-1.5 py-0.5 text-mono-caption uppercase tracking-[0.18em] plate-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            :style="{ transitionDuration: 'var(--duration-fast)' }"
            aria-hidden="true"
        >{{ disableClick ? 'sample' : 'replace' }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { ImagePlus } from "@lucide/vue";

defineProps<{
    preview: string | null;
    disableClick?: boolean;
}>();

const emit = defineEmits<{
    file: [file: File];
}>();

const fileInputRef = useTemplateRef<HTMLInputElement>("fileInputRef");
const dragging = ref(false);

function openFilePicker() {
    fileInputRef.value?.click();
}

defineExpose({ openFilePicker });

function onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) emit("file", file);
    input.value = "";
}

function onDrop(e: DragEvent) {
    dragging.value = false;
    const file = e.dataTransfer?.files[0];
    if (file?.type.startsWith("image/")) {
        emit("file", file);
    }
}
</script>

<style scoped>
/* E1-R1 (T.W8 remediation_1): the drop-zone caption family (placeholder icon +
 * prompt, corner Fira tag) threads the certified de-emphasis rung
 * (`--ink-muted` — boot-stamped, floor-clamped against the live resting plate;
 * D6) instead of the STATIC `text-muted-foreground` that failed the text floor
 * over the live-ambient plate in light. */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>

