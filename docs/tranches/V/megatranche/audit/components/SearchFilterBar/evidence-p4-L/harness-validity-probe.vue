<template>
  <Checkbox :checked="true" @update:checked="() => {}" :bogusPropXyz="1" />
</template>
<script setup lang="ts">
import { Checkbox } from "@mkbabb/glass-ui";
const x: number = "definitely-a-string";
</script>
