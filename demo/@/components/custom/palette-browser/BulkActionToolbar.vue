<template>
    <Transition
        enter-active-class="transition-all duration-fast ease-decelerate"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-instant ease-accelerate"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
    >
        <div
            v-if="count > 0"
            class="glass-floating sticky bottom-2 z-popover mx-auto flex w-fit items-center gap-2 rounded-panel px-4 py-2"
        >
            <span class="text-caption font-medium tabular-nums">
                {{ count }} selected
            </span>

            <div class="h-4 w-px bg-border" />

            <slot />

            <Button variant="ghost" size="sm" class="h-7 text-caption" @click="$emit('clear')">
                <X class="mr-1 h-3 w-3" />
                Clear
            </Button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import { X } from "lucide-vue-next";

defineProps<{
    count: number;
}>();

defineEmits<{
    clear: [];
}>();
</script>
