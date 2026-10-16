<template>
    <div data-palette-swatches @click.stop class="overflow-hidden">
        <!-- User slug display. X-DS pass 9 (P9R-04): attribution speaks the
             meta rung — "by <author>" (the bare slug when the palette has no
             author slug) in the muted ink at regular weight, no ring
             (the bold, colour-ringed pill read as a tag button and outweighed
             the name). The copy verb is glass's quiet icon Button, anchored to
             the slug it copies. -->
        <div
            v-if="displaySlug"
            class="px-3 pt-2 flex items-center gap-1 border-t border-seam"
        >
            <span class="text-small text-muted-foreground truncate max-w-tooltip"><template v-if="slugIsAuthor">by </template><span class="font-mono">{{ displaySlug }}</span></span>
            <Button
                icon-only
                emphasis="quiet"
                size="sm"
                class="shrink-0"
                :aria-label="`Copy slug ${displaySlug}`"
                @click="$emit('copySlug', displaySlug)"
            >
                <Copy class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
            </Button>
        </div>
        <div
            class="px-3 pb-3 flex flex-wrap gap-2 items-start pt-3 min-w-0"
            :class="!displaySlug && 'border-t border-seam'"
        >
            <SwatchHoverMenu
                v-for="(color, i) in colors"
                :key="`${color.css}-${i}`"
                :color="color.css"
                :open="openPopoverIndex === i"
                :size="swatchSize"
                @update:open="(v: boolean) => $emit('popoverOpen', v, i)"
            >
                <template #actions>
                    <!-- W5-a11y: icon-only buttons need explicit aria-label.
                         X-DS pass 14 (V14-T2): the actions speak the card's ONE
                         quiet-icon grammar (glass Button, as the slug copy above),
                         with no local hover / press / ring classes. -->
                    <Button
                        v-if="!isLocal"
                        icon-only
                        emphasis="quiet"
                        size="sm"
                        :aria-label="`Add ${formatCssCaption(color.css)} to current palette`"
                        @click="$emit('popoverAdd', color.css)"
                    >
                        <Plus class="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button
                        icon-only
                        emphasis="quiet"
                        size="sm"
                        :aria-label="`Edit color ${formatCssCaption(color.css)}`"
                        @click="$emit('popoverEdit', color, i)"
                    >
                        <Pencil class="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button
                        icon-only
                        emphasis="quiet"
                        size="sm"
                        :aria-label="`Copy color ${formatCssCaption(color.css)}`"
                        @click="$emit('popoverCopy', color.css)"
                    >
                        <Copy class="w-4 h-4" aria-hidden="true" />
                    </Button>
                </template>
            </SwatchHoverMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Copy, Pencil, Plus } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import type { PaletteColor } from "../types";
import SwatchHoverMenu from "../browser/card/SwatchHoverMenu.vue";
import type { SwatchSize } from "../../shared/ui/SwatchButton.vue";
import { formatCssCaption } from "../../color-session/format-color";

defineProps<{
    colors: readonly PaletteColor[];
    isLocal: boolean | undefined;
    displaySlug: string | undefined;
    /** The slug is the author's (`userSlug`), so it reads "by <slug>". */
    slugIsAuthor: boolean;
    openPopoverIndex: number | null;
    swatchSize: SwatchSize;
}>();

defineEmits<{
    popoverOpen: [open: boolean, index: number];
    popoverAdd: [css: string];
    popoverEdit: [color: PaletteColor, index: number];
    popoverCopy: [css: string];
    /** The slug copy — the card owns every copy verb and its verdict (N-11 · PS-32). */
    copySlug: [slug: string];
}>();
</script>
