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
            // htmlAndMathml (P2-1 / S-22): the KaTeX HTML layer renders with the
            // self-hosted KaTeX fonts (shipped via the katex.min.css @import
            // below) for cross-browser typeset consistency; the MathML layer
            // remains for the accessibility tree. MathML-only delegated glyph
            // metrics to each browser's math engine — WebKit's MathML-Core is
            // the least mature, an S-22 (Safari-truth) risk.
            output: "htmlAndMathml",
        });
    }
};

onMounted(renderKatex);

watch(() => expression, renderKatex);
</script>

<style scoped>
@import "katex/dist/katex.min.css";
</style>
