<template>
    <Popover
        v-if="!hidden"
        trigger="hover"
        :open="isOpen"
        @update:open="onHoverOpenChange"
        :close-delay="0"
        :open-delay="300"
        class="pointer-events-auto"
    >
        <PopoverTrigger as-child>
            <!-- X.W12U.m · A2-VA-L2-6 (value half, A2-VA-X-9): the seat IS the
                 dock's own control. It was a consumer `<button>` held to 32×32
                 by a scoped rule no glass touch floor reaches; as a DockControl
                 its hit cell is `--dock-control-size`, which the producer's
                 density clamp lifts to `--dock-touch-target` (44px) on a coarse
                 pointer. DockControl keeps a disabled seat focusable
                 (`aria-disabled`) and suppresses its activation. -->
            <DockControl
                class="action-button-wrapper"
                :aria-label="title"
                :disabled="disabled || false"
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
            </DockControl>
        </PopoverTrigger>
        <PopoverContent class="pointer-events-auto font-display">
            <div>
                <!-- T.W4-6 (T-15/F7): the popover TITLE speaks the display
                     voice on its own class list — the bare `text-subheading`
                     set the body family directly on this node, silently
                     overriding the parent's `font-display` intent. -->
                <p class="font-display font-medium text-subheading">{{ title }}</p>
                <p class="text-small text-muted-foreground">{{ description }}</p>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@mkbabb/glass-ui/popover";
import { DockControl, useOptionalDockContext } from "@mkbabb/glass-ui/dock";

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
@reference "../../styles/foundation.css";

.action-icon:hover {
    transform: scale(1.2);
    stroke: var(--hover-color);
}
/* X.W12.e: the action-pulse / action-spin keyframes live in
 * styles/animations.css (moved, never deleted — 0 local dock keyframes). */
.action-flash {
    animation: action-pulse 0.4s var(--ease-standard) forwards;
}
.action-rotate {
    animation: action-pulse 0.4s var(--ease-standard) forwards,
               action-spin 0.4s var(--ease-standard) forwards;
}
</style>
