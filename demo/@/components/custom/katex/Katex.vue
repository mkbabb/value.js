<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import katex from 'katex';

interface Props {
  expression: string;
  displayMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  displayMode: false,
});

const katexElement = ref<HTMLElement | null>(null);

const renderKatex = () => {
  if (katexElement.value) {
    katex.render(props.expression, katexElement.value, {
      displayMode: props.displayMode,
      throwOnError: false,
    });
  }
};

onMounted(renderKatex);

watch(() => props.expression, renderKatex);
</script>

<template>
  <div ref="katexElement"></div>
</template>

<style scoped>
@import 'katex/dist/katex.min.css';
</style>