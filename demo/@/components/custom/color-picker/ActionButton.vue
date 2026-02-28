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
                @click="emit('update:activeHover', null); emit('action')"
                :class="[
                    'h-8 aspect-square stroke-foreground hover:scale-125 transition-all cursor-pointer',
                    iconClass,
                    disabled && 'pointer-events-none opacity-50',
                ]"
                :style="activeStyle"
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
import { computed, type Component } from "vue";
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
}>();

const emit = defineEmits<{
    action: [];
    "update:activeHover": [value: string | null];
}>();

const isOpen = computed(() => props.activeHover === props.hoverKey);
</script>
