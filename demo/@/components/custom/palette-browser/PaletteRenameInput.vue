<template>
    <div class="px-3 pb-2" @click.stop>
        <form class="flex gap-2" @submit.prevent="onSubmit">
            <Input
                v-model="localName"
                placeholder="New name..."
                class="fira-code text-sm h-8"
                autofocus
            />
            <Button type="submit" size="sm" variant="default" class="shrink-0 h-8">
                <Check class="w-4 h-4" />
            </Button>
            <Button type="button" size="sm" variant="ghost" class="shrink-0 h-8" @click="$emit('cancel')">
                Cancel
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Check } from "lucide-vue-next";

const props = defineProps<{
    name: string;
}>();

const emit = defineEmits<{
    submit: [newName: string];
    cancel: [];
}>();

const localName = ref(props.name);

watch(() => props.name, (v) => { localName.value = v; });

function onSubmit() {
    const trimmed = localName.value.trim();
    if (trimmed && trimmed !== props.name) {
        emit("submit", trimmed);
    } else {
        emit("cancel");
    }
}
</script>
