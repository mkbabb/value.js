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
            <!-- W5-a11y: native <button> for keyboard reach, focus-visible ring, and Enter/Space activation -->
            <button
                type="button"
                class="action-button-wrapper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm"
                :aria-label="title"
                :aria-disabled="disabled || undefined"
                :disabled="disabled || undefined"
                @click="handleClick"
            >
                <component
                    :is="icon"
                    aria-hidden="true"
                    :class="[
                        'action-icon w-6 h-6 stroke-foreground transition-[transform,stroke]',
                        iconClass,
                        disabled && 'opacity-50',
                        isClicked && (rotateOnClick ? 'action-rotate' : 'action-flash'),
                    ]"
                    :style="{ ...activeStyle, '--flash-color': cssColorOpaque ?? 'currentColor', '--hover-color': cssColorOpaque ?? 'currentColor' }"
                />
                <span v-if="label" class="action-label">{{ label }}</span>
            </button>
        </HoverCardTrigger>
        <HoverCardContent class="pointer-events-auto font-display">
            <div>
                <p class="text-subheading">{{ title }}</p>
                <p class="text-small text-muted-foreground">{{ description }}</p>
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
import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";

const dock = useOptionalDockContext();

const { hoverKey, activeHover } = defineProps<{
    icon: Component;
    hoverKey: string;
    activeHover: string | null;
    title: string;
    description: string;
    label?: string | undefined;
    iconClass?: string | undefined;
    activeStyle?: Record<string, string> | undefined;
    disabled?: boolean | undefined;
    hidden?: boolean | undefined;
    cssColorOpaque?: string | undefined;
    rotateOnClick?: boolean | undefined;
}>();

const emit = defineEmits<{
    action: [];
    "update:activeHover": [value: string | null];
}>();

const isOpen = computed(() => activeHover === hoverKey);

function onHoverOpenChange(v: boolean) {
    emit("update:activeHover", v ? hoverKey : null);
    if (v) {
        dock?.keepOpen();
    } else {
        dock?.release();
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
    background: none;
    border: none;
    padding: 0;
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
