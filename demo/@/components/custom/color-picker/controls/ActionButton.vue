<template>
    <HoverCard
        v-if="!hidden"
        :open="isOpen"
        @update:open="onHoverOpenChange"
        :close-delay="0"
        :open-delay="300"
        class="pointer-events-auto"
    >
        <HoverCardTrigger as-child>
            <div class="action-button-wrapper" @click="handleClick">
                <component
                    :is="icon"
                    :aria-label="title"
                    :class="[
                        'action-icon w-6 h-6 stroke-foreground transition-[transform,stroke] cursor-pointer',
                        iconClass,
                        disabled && 'pointer-events-none opacity-50',
                        isClicked && (rotateOnClick ? 'action-rotate' : 'action-flash'),
                    ]"
                    :style="{ ...activeStyle, '--flash-color': cssColorOpaque ?? 'currentColor', '--hover-color': cssColorOpaque ?? 'currentColor' }"
                />
                <span v-if="label" class="action-label">{{ label }}</span>
            </div>
        </HoverCardTrigger>
        <HoverCardContent class="z-[var(--z-hovercard)] pointer-events-auto font-display">
            <div>
                <p class="text-lg">{{ title }}</p>
                <p class="text-sm opacity-60">{{ description }}</p>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Component } from "vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@components/ui/hover-card";

const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);

const props = defineProps<{
    icon: Component;
    hoverKey: string;
    activeHover: string | null;
    title: string;
    description: string;
    label?: string;
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

function onHoverOpenChange(v: boolean) {
    emit("update:activeHover", v ? props.hoverKey : null);
    if (v) {
        dockKeepOpen?.();
    } else {
        dockRelease?.();
    }
}

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
@reference "../../../../styles/style.css";

.action-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    flex-shrink: 0;
}
.action-icon:hover {
    transform: scale(1.2);
    stroke: var(--hover-color);
}
.action-flash {
    animation: action-pulse 0.4s var(--ease-standard) forwards;
}
.action-rotate {
    animation: action-pulse 0.4s var(--ease-standard) forwards,
               action-spin 0.4s var(--ease-standard) forwards;
}
@keyframes action-pulse {
    0%   { stroke: var(--flash-color, currentColor); stroke-width: 2.75; transform: scale(1.3); }
    50%  { stroke: var(--flash-color, currentColor); stroke-width: 2.5; transform: scale(1.15); }
    100% { stroke: currentColor; stroke-width: 2; transform: scale(1); }
}
@keyframes action-spin {
    0%   { transform: rotate(0deg) scale(1.3); }
    100% { transform: rotate(-360deg) scale(1); }
}
</style>
