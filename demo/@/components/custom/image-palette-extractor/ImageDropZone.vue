<template>
    <div
        :class="[
            'relative rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden',
            'min-h-[140px]',
            dragging
                ? 'border-primary bg-primary/10 scale-[1.01]'
                : preview
                    ? 'border-transparent bg-primary/5 hover:bg-primary/10'
                    : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10',
        ]"
        :style="{ transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-standard)' }"
        @click="!disableClick && openFilePicker()"
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

        <Transition name="fade" mode="out-in">
            <img
                v-if="preview"
                :key="preview"
                :src="preview"
                class="w-full h-full object-contain rounded-xl"
                alt="Uploaded image"
            />
            <div v-else class="flex flex-col items-center gap-2 py-6">
                <ImagePlus class="w-7 h-7 text-muted-foreground/50" />
                <span class="text-mono-small text-muted-foreground/60 text-center px-4">
                    Drop an image or click to browse
                </span>
            </div>
        </Transition>

        <!-- Replace overlay on hover -->
        <div
            v-if="preview"
            class="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 hover:opacity-100 transition-opacity"
            :style="{ transitionDuration: 'var(--duration-fast)' }"
        >
            <span class="text-mono-small text-muted-foreground">{{ disableClick ? 'Click to sample colors' : 'Click or drop to replace' }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { ImagePlus } from "lucide-vue-next";

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

