<template>
    <div class="inline-block" ref="katexElement"></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, watch } from "vue";
import katex from "katex";

const { expression, displayMode = true } = defineProps<{
    expression: string;
    displayMode?: boolean;
}>();

const katexElement = useTemplateRef<HTMLElement>("katexElement");

const renderKatex = () => {
    if (katexElement.value) {
        katex.render(expression, katexElement.value, {
            displayMode,
            throwOnError: false,
            output: "mathml",
        });
    }
};

onMounted(renderKatex);

watch(() => expression, renderKatex);
</script>

<style scoped>
@import "katex/dist/katex.min.css";
</style>
