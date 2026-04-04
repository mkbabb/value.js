<template>
    <div class="text-center text-muted-foreground py-4 text-mono-small italic">
        <slot>{{ message }}</slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>
