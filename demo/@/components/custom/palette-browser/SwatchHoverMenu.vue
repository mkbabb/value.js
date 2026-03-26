<template>
    <div
        class="relative"
        @pointerenter="$emit('hover', $event)"
        @pointerleave="$emit('leave')"
    >
        <!-- Touch: native Popover click toggle -->
        <Popover
            v-if="!canHover"
            :open="open"
            @update:open="$emit('update:open', $event)"
        >
            <PopoverTrigger as-child>
                <WatercolorDot
                    :color="color"
                    tag="button"
                    :class="[sizeClass, 'shrink-0 cursor-pointer', swatchExtraClass]"
                />
            </PopoverTrigger>
            <PopoverContent class="w-auto p-1.5 flex items-center gap-1" :side-offset="8">
                <slot name="actions" />
            </PopoverContent>
        </Popover>

        <!-- Hover: manually positioned floating panel -->
        <template v-else>
            <WatercolorDot
                :color="color"
                tag="button"
                :class="[sizeClass, 'shrink-0 cursor-pointer', swatchExtraClass]"
                @click.stop="$emit('click')"
            />
            <Teleport to="body">
                <div
                    v-if="open"
                    class="floating-panel flex items-center gap-1 p-1.5"
                    :style="floatingStyle"
                    @pointerenter="$emit('cancelLeave')"
                    @pointerleave="$emit('leave')"
                >
                    <slot name="actions" />
                </div>
            </Teleport>
        </template>

        <!-- Optional overlay content (e.g., edit overlay) -->
        <slot name="overlay" />
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { WatercolorDot } from "@components/custom/watercolor-dot";

withDefaults(
    defineProps<{
        color: string;
        open: boolean;
        canHover: boolean;
        floatingStyle?: CSSProperties;
        sizeClass?: string;
        swatchExtraClass?: string;
    }>(),
    {
        sizeClass: "w-9 h-9 sm:w-10 sm:h-10",
    },
);

defineEmits<{
    hover: [e: PointerEvent];
    leave: [];
    cancelLeave: [];
    click: [];
    "update:open": [value: boolean];
}>();
</script>
