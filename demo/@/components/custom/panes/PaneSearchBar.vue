<template>
    <SearchBar v-model="searchModel" :placeholder="placeholder">
        <slot />
    </SearchBar>
</template>

<script setup lang="ts">
import { SearchBar } from "@mkbabb/glass-ui";

defineProps<{
    placeholder: string;
}>();

const searchModel = defineModel<string>("search", { required: true });
</script>
