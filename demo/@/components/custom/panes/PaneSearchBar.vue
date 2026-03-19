<template>
    <div class="search-bar flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border">
        <Search class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <input
            v-model="searchModel"
            :placeholder="placeholder"
            class="fira-code text-sm bg-transparent border-none outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
        />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";

defineProps<{
    placeholder: string;
}>();

const searchModel = defineModel<string>("search", { required: true });
</script>
