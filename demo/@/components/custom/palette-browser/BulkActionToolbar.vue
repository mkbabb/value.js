<template>
    <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
    >
        <div
            v-if="count > 0"
            class="sticky bottom-2 z-[var(--z-popover)] mx-auto flex w-fit items-center gap-2 rounded-xl border border-border bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm"
        >
            <span class="text-xs font-medium tabular-nums">
                {{ count }} selected
            </span>

            <div class="h-4 w-px bg-border" />

            <slot />

            <Button variant="ghost" size="sm" class="h-7 text-xs" @click="$emit('clear')">
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
