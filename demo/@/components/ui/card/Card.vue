<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@utils/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        :class="
            cn(
                'scrollbar-hidden lg:rounded-lg [&:nth-child(2)]:rounded-t-lg rounded-b-lg lg:border-4 border-gray-700 dark:shadow-gray-700  bg-card text-card-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
