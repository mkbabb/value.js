<template>
    <!-- celebration family: the saved!/error beat (geometry vars below). -->
    <Transition name="vj-celebrate">
        <div
            v-if="visible"
            :class="[
                'feedback-chip flex items-center gap-2 px-3 py-1.5 rounded-panel text-xs fira-code',
                variant === 'success' && 'bg-green-500/10 text-green-600 dark:text-green-400',
                variant === 'error' && 'bg-destructive/10 text-destructive',
            ]"
        >
            <CheckCircle2 v-if="variant === 'success'" class="w-3.5 h-3.5 shrink-0" />
            <AlertCircle v-else class="w-3.5 h-3.5 shrink-0" />
            <span>{{ message }}</span>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { CheckCircle2, AlertCircle } from "@lucide/vue";

const props = withDefaults(
    defineProps<{
        message: string;
        variant: "success" | "error";
        visible: boolean;
        autoDismissMs?: number;
    }>(),
    { autoDismissMs: 2500 },
);

const emit = defineEmits<{
    "update:visible": [value: boolean];
}>();

let timer: ReturnType<typeof setTimeout> | undefined;

watch(
    () => props.visible,
    (v) => {
        if (timer) clearTimeout(timer);
        if (v && props.autoDismissMs > 0) {
            timer = setTimeout(() => emit("update:visible", false), props.autoDismissMs);
        }
    },
);
</script>

<style scoped>
/* vj-celebrate geometry: the chip unfurls (height morph) with the family's
 * bouncy pop; scale stays 1 so the row never jitters horizontally. */
.feedback-chip {
    --vj-celebrate-collapse: 0px;
    --vj-celebrate-expanded: 2.5rem;
    --vj-celebrate-scale: 1;
}
</style>
