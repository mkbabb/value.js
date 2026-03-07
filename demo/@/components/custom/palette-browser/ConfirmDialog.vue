<template>
    <Transition name="confirm-overlay">
        <div
            v-if="open"
            class="absolute inset-0 z-50 grid place-items-center bg-black/50 rounded-lg"
            @click.self="open = false"
        >
            <Transition name="confirm-panel" appear>
                <div
                    v-if="open"
                    class="w-[calc(100%-2rem)] sm:max-w-sm bg-card text-card-foreground border border-border rounded-lg shadow-lg"
                >
                    <div class="p-6 grid gap-4">
                        <div class="grid gap-2">
                            <h2 class="fraunces text-lg font-semibold leading-none tracking-tight">
                                {{ title }}
                            </h2>
                            <div class="fira-code text-sm text-muted-foreground">
                                <slot>{{ description }}</slot>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                class="fraunces cursor-pointer"
                                @click="open = false"
                            >
                                Cancel
                            </Button>
                            <Button
                                :variant="destructive ? 'destructive' : 'default'"
                                class="fraunces cursor-pointer gap-1.5"
                                @click="onConfirm"
                            >
                                <slot name="action">{{ confirmLabel }}</slot>
                            </Button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { Transition } from "vue";
import { Button } from "@components/ui/button";

defineProps<{
    title: string;
    description?: string;
    confirmLabel: string;
    destructive?: boolean;
}>();

const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits<{ confirm: [] }>();

function onConfirm() {
    emit("confirm");
    open.value = false;
}
</script>

<style scoped>
.confirm-overlay-enter-active,
.confirm-overlay-leave-active {
    transition: opacity 0.2s ease;
}
.confirm-overlay-enter-from,
.confirm-overlay-leave-to {
    opacity: 0;
}

.confirm-panel-enter-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.confirm-panel-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.confirm-panel-enter-from {
    opacity: 0;
    transform: scale(0.95);
}
.confirm-panel-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
