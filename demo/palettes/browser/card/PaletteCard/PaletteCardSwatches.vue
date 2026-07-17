<template>
    <div @click.stop class="overflow-hidden">
        <!-- User slug display -->
        <div
            v-if="displaySlug"
            class="px-3 pt-2.5 flex items-center gap-1.5 border-t border-border/15"
        >
            <span
                class="text-mono-small font-bold px-2 py-0.5 rounded-full border truncate max-w-tooltip"
                :style="{ color: safeFirstColor, borderColor: safeFirstColor }"
            >{{ displaySlug }}</span>
            <!-- W5-a11y: icon-only copy button needs accessible name -->
            <button
                class="p-0.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                :aria-label="`Copy slug ${displaySlug}`"
                @click="copyToClipboard(displaySlug)"
            >
                <Copy class="w-3 h-3 text-muted-foreground" aria-hidden="true" />
            </button>
        </div>
        <div
            class="px-3 pb-3 flex flex-wrap gap-2 items-start pt-3 min-w-0"
            :class="!displaySlug && 'border-t border-border/15'"
        >
            <SwatchHoverMenu
                v-for="(color, i) in colors"
                :key="`${color.css}-${i}`"
                :color="color.css"
                :open="openPopoverIndex === i"
                :can-hover="canHover"
                :floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"
                :size-class="swatchClass"
                @hover="$emit('hover', i, $event)"
                @leave="$emit('leave')"
                @cancel-leave="$emit('cancelLeave')"
                @click="$emit('swatchClick', i)"
                @update:open="(v: boolean) => $emit('popoverTouch', v, i)"
            >
                <template #actions>
                    <!-- W5-a11y: icon-only buttons need explicit aria-label -->
                    <button
                        v-if="!isLocal"
                        :aria-label="`Add ${color.css} to current palette`"
                        class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="$emit('popoverAdd', color.css)"
                    >
                        <Plus class="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                        :aria-label="`Edit color ${color.css}`"
                        class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="$emit('popoverEdit', color, i)"
                    >
                        <Pencil class="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                        :aria-label="`Copy color ${color.css}`"
                        class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        @click="$emit('popoverCopy', color.css)"
                    >
                        <Copy class="w-4 h-4" aria-hidden="true" />
                    </button>
                </template>
            </SwatchHoverMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Copy, Pencil, Plus } from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import type { PaletteColor } from "../../../types";
import SwatchHoverMenu from "../SwatchHoverMenu.vue";

defineProps<{
    colors: readonly PaletteColor[];
    isLocal: boolean | undefined;
    displaySlug: string | undefined;
    safeFirstColor: string;
    openPopoverIndex: number | null;
    canHover: boolean;
    floatingStyle: Record<string, string | number>;
    swatchClass: string;
}>();

defineEmits<{
    hover: [index: number, evt: PointerEvent];
    leave: [];
    cancelLeave: [];
    swatchClick: [index: number];
    popoverTouch: [open: boolean, index: number];
    popoverAdd: [css: string];
    popoverEdit: [color: PaletteColor, index: number];
    popoverCopy: [css: string];
}>();
</script>
