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
                aria-label="Palette name"
                class="input-bar-field"
                @keydown.escape.stop="$emit('cancel')"
            />
            <!-- X.W12U.s2 · UIA-V-99: named glass squares at the control floor,
                 not 18 px unnamed raw buttons. -->
            <Button type="submit" icon-only size="xs" emphasis="quiet" aria-label="Save name" class="shrink-0">
                <Check class="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
            <Button
                type="button"
                icon-only
                size="xs"
                emphasis="quiet"
                aria-label="Cancel rename"
                class="shrink-0"
                @click="$emit('cancel')"
            >
                <XIcon class="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef } from "vue";
import { Check, X as XIcon, Pencil } from "@lucide/vue";
import { Button } from "../../../../ui/button";

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
