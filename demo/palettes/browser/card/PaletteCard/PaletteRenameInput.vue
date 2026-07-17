<template>
    <div class="px-3 pb-2.5 pt-1" @click.stop>
        <form
            class="input-bar max-w-sm"
            @submit.prevent="onSubmit"
        >
            <Pencil class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <!-- S.W5-3 (S-17): the field consumes the producer's
                 `.input-bar-field` recipe (font/placeholder/flex all
                 producer-owned) instead of hand-forking it class by class. -->
            <input
                ref="inputRef"
                v-model="localName"
                placeholder="Palette name..."
                class="input-bar-field"
                @keydown.escape.stop="$emit('cancel')"
            />
            <button
                type="submit"
                class="p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
                <Check class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
                type="button"
                class="p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                @click="$emit('cancel')"
            >
                <XIcon class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef } from "vue";
import { Check, X as XIcon, Pencil } from "@lucide/vue";

const { name } = defineProps<{
    name: string;
}>();

const emit = defineEmits<{
    submit: [newName: string];
    cancel: [];
}>();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const localName = ref(name);

watch(() => name, (v) => { localName.value = v; });

onMounted(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
});

function onSubmit() {
    const trimmed = localName.value.trim();
    if (trimmed && trimmed !== name) {
        emit("submit", trimmed);
    } else {
        emit("cancel");
    }
}
</script>
