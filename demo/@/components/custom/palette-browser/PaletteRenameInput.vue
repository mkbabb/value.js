<template>
    <div class="px-3 pb-2.5 pt-1" @click.stop>
        <form
            class="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border"
            @submit.prevent="onSubmit"
        >
            <Pencil class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
                ref="inputRef"
                v-model="localName"
                placeholder="Palette name..."
                class="fira-code text-sm bg-transparent border-none outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
                @keydown.escape.stop="$emit('cancel')"
            />
            <button
                type="submit"
                class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"
            >
                <Check class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
                type="button"
                class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0"
                @click="$emit('cancel')"
            >
                <XIcon class="w-3.5 h-3.5 text-muted-foreground" />
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef } from "vue";
import { Check, X as XIcon, Pencil } from "lucide-vue-next";

const props = defineProps<{
    name: string;
}>();

const emit = defineEmits<{
    submit: [newName: string];
    cancel: [];
}>();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const localName = ref(props.name);

watch(() => props.name, (v) => { localName.value = v; });

onMounted(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
});

function onSubmit() {
    const trimmed = localName.value.trim();
    if (trimmed && trimmed !== props.name) {
        emit("submit", trimmed);
    } else {
        emit("cancel");
    }
}
</script>
