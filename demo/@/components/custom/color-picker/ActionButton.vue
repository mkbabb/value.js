<template>
    <HoverCard
        v-if="!hidden"
        :open="isOpen"
        @update:open="(v) => emit('update:activeHover', v ? hoverKey : null)"
        :close-delay="0"
        :open-delay="700"
        class="pointer-events-auto"
    >
        <HoverCardTrigger>
            <component
                :is="icon"
                @click="handleClick"
                :class="[
                    'h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer',
                    iconClass,
                    disabled && 'pointer-events-none opacity-50',
                    isClicked && (rotateOnClick ? 'action-rotate' : 'action-flash'),
                ]"
                :style="{ ...activeStyle, '--flash-color': cssColorOpaque ?? 'currentColor' }"
            />
        </HoverCardTrigger>
        <HoverCardContent class="z-[100] pointer-events-auto fraunces">
            <div>
                <p class="font-bold text-lg">{{ title }}</p>
                <p class="text-sm opacity-60">{{ description }}</p>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";

const props = defineProps<{
    icon: Component;
    hoverKey: string;
    activeHover: string | null;
    title: string;
    description: string;
    iconClass?: string;
    activeStyle?: Record<string, string>;
    disabled?: boolean;
    hidden?: boolean;
    cssColorOpaque?: string;
    rotateOnClick?: boolean;
}>();

const emit = defineEmits<{
    action: [];
    "update:activeHover": [value: string | null];
}>();

const isOpen = computed(() => props.activeHover === props.hoverKey);

const isClicked = ref(false);

function handleClick() {
    emit("update:activeHover", null);
    isClicked.value = true;
    setTimeout(() => {
        isClicked.value = false;
    }, 400);
    emit("action");
}
</script>

<style scoped>
.action-flash {
    animation: action-color-flash 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.action-rotate {
    animation: action-color-flash 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
               action-spin 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes action-color-flash {
    0%   { stroke: var(--flash-color, currentColor); stroke-width: 2.75; }
    100% { stroke: currentColor; stroke-width: 2; }
}
@keyframes action-spin {
    0%   { transform: rotate(0deg) scale(1.25); }
    100% { transform: rotate(-360deg) scale(1); }
}
</style>
