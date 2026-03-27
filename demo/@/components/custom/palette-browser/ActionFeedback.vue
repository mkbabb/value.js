<template>
    <Transition name="feedback-slide">
        <div
            v-if="visible"
            :class="[
                'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-code',
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
import { CheckCircle2, AlertCircle } from "lucide-vue-next";

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
.feedback-slide-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate),
                max-height var(--duration-normal) var(--ease-decelerate);
    overflow: hidden;
}
.feedback-slide-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate),
                max-height var(--duration-fast) var(--ease-accelerate);
    overflow: hidden;
}
.feedback-slide-enter-from {
    opacity: 0;
    max-height: 0;
}
.feedback-slide-enter-to,
.feedback-slide-leave-from {
    max-height: 2.5rem;
}
.feedback-slide-leave-to {
    opacity: 0;
    max-height: 0;
}
</style>
