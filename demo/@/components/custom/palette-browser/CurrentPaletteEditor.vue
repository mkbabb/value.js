<template>
    <div
        class="dashed-well"
    >
        <div
            class="flex items-center justify-between gap-2"
        >
            <span
                class="text-small font-display font-semibold text-muted-foreground"
            >
                {{
                    savedColorStrings.length > 0
                        ? "Current Palette"
                        : "Start a new palette"
                }}
            </span>
            <span
                v-if="savedColorStrings.length > 0"
                class="text-mono-small text-muted-foreground"
                >{{ savedColorStrings.length }} colors</span
            >
        </div>
        <TransitionGroup
            name="swatch-item"
            tag="div"
            class="flex items-center gap-2.5 flex-wrap"
        >
            <SwatchHoverMenu
                v-for="(color, i) in savedColorStrings"
                :key="swatchKeys[i] ?? i"
                :color="color"
                :open="currentSwatchPopoverIndex === i"
                :can-hover="canHover"
                :floating-style="currentFloatingStyle"
                size-class="w-11 h-11 sm:w-12 sm:h-12"
                :swatch-extra-class="isSwatchEditing(i) ? 'swatch-editing' : undefined"
                @hover="onCurrentSwatchHover(i, $event)"
                @leave="onCurrentSwatchLeave()"
                @cancel-leave="cancelCurrentSwatchLeave()"
                @click="onCurrentSwatchClick(i)"
                @update:open="(v: boolean) => onCurrentSwatchPopoverUpdateTouch(v, i)"
            >
                <template #actions>
                    <!-- W5-a11y: icon-only swatch action buttons need accessible names -->
                    <button :aria-label="`Edit color ${color}`" @click="onCurrentSwatchEdit(color, i)" class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                        <Pencil class="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button :aria-label="`Copy color ${color}`" @click="onCurrentSwatchCopy(color)" class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                        <Copy class="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button :aria-label="`Remove color ${color} from palette`" @click="onCurrentSwatchRemove(color, i)" class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                        <Trash2 class="w-4 h-4 text-destructive" aria-hidden="true" />
                    </button>
                </template>
                <template #overlay>
                    <Transition name="edit-overlay">
                        <div v-if="isSwatchEditing(i)" class="edit-overlay glass-floating hidden lg:flex">
                            <div class="flex items-center gap-2">
                                <WatercolorDot :color="color" tag="div" class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 opacity-50 grayscale-[0.4] swatch-cutout" :seed="'edit-from-' + i" />
                                <span class="text-muted-foreground text-caption">&rarr;</span>
                                <WatercolorDot :color="cssColorOpaque" tag="div" class="w-11 h-11 sm:w-12 sm:h-12 shrink-0" :seed="'edit-to-' + i" />
                            </div>
                            <div class="flex gap-2 mt-2 self-center">
                                <!-- W5-a11y: title is tooltip-only; add aria-label so AT reads it -->
                                <button class="p-2 rounded-full bg-foreground/5 hover:bg-accent/50 transition-all cursor-pointer hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" title="Save edit" aria-label="Save edit" @click.stop="emit('commitEdit')">
                                    <Check class="w-5 h-5" :style="{ color: safeAccent }" aria-hidden="true" />
                                </button>
                                <button class="p-2 rounded-full bg-foreground/5 hover:bg-accent/50 transition-all cursor-pointer hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" title="Cancel edit" aria-label="Cancel edit" @click.stop="emit('cancelEdit')">
                                    <Undo2 class="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </Transition>
                </template>
            </SwatchHoverMenu>
            <!-- Add current color button — wrapped in div for TransitionGroup compatibility -->
            <div key="__add__">
                <TooltipProvider :delay-duration="200">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <!-- W5-a11y: tooltip provides name but aria-label ensures AT reads it -->
                            <button
                                class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                                :aria-label="`Add current color ${cssColorOpaque} to palette`"
                                @click="addCurrentColor"
                            >
                                <Plus class="w-5 h-5 text-primary/40" aria-hidden="true" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="text-mono-small">
                            Add current color ({{ cssColorOpaque }})
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </TransitionGroup>
        <div
            v-if="savedColorStrings.length > 0"
            class="flex items-center gap-2"
        >
            <Input
                v-model="currentPaletteName"
                :placeholder="
                    'Palette ' + (savedPaletteCount + 1)
                "
                class="text-mono-small h-8 flex-1 rounded-input bg-background border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                @keydown.enter="saveCurrentPalette"
            />
            <Button
                variant="outline"
                size="icon"
                class="h-8 w-8 rounded-full cursor-pointer border-border/50 shrink-0"
                :disabled="savedColorStrings.length === 0"
                @click="saveCurrentPalette"
            >
                <Check class="w-4 h-4 text-foreground" />
            </Button>
        </div>
        <div
            v-if="duplicateTarget"
            class="flex items-center gap-2 flex-wrap"
        >
            <span class="text-mono-small text-muted-foreground italic">
                "{{ duplicateTarget.name }}" already exists.
            </span>
            <Button
                variant="outline"
                size="sm"
                class="h-6 px-2 text-caption cursor-pointer font-display rounded-full"
                @click="confirmUpdatePalette"
            >
                Update
            </Button>
            <Button
                variant="ghost"
                size="sm"
                class="h-6 px-2 text-caption cursor-pointer font-display rounded-full"
                @click="duplicateTarget = null"
            >
                Cancel
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, toRef, TransitionGroup } from "vue";
import { SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import {
    Plus,
    Pencil,
    Copy,
    Trash2,
    Check,
    Undo2,
} from "@lucide/vue";
import type { Palette, PaletteColor } from "@lib/palette/types";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import SwatchHoverMenu from "./SwatchHoverMenu.vue";
import { useSwatchActions } from "./composables/useSwatchActions";

const { savedColorStrings, cssColorOpaque, savedPaletteCount, savedPalettes } =
    defineProps<{
        savedColorStrings: string[];
        cssColorOpaque: string;
        savedPaletteCount: number;
        savedPalettes: Palette[];
    }>();

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
    startEdit: [target: { paletteId: string; colorIndex: number; originalCss: string }];
    saved: [name: string, colors: PaletteColor[]];
    updated: [id: string, colors: PaletteColor[]];
    commitEdit: [];
    cancelEdit: [];
    clearCurrent: [];
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;

// --- Swatch interaction state & actions ---
const {
    canHover,
    currentSwatchPopoverIndex,
    currentFloatingStyle,
    swatchKeys,
    onCurrentSwatchHover,
    onCurrentSwatchLeave,
    cancelCurrentSwatchLeave,
    onCurrentSwatchPopoverUpdateTouch,
    onCurrentSwatchClick,
    isSwatchEditing,
    addCurrentColor,
    onCurrentSwatchEdit,
    onCurrentSwatchCopy,
    onCurrentSwatchRemove,
} = useSwatchActions({
    savedColorStrings: toRef(() => savedColorStrings),
    cssColorOpaque: toRef(() => cssColorOpaque),
    emit,
});

// --- Current palette save ---
const currentPaletteName = ref("");
const duplicateTarget = ref<Palette | null>(null);

function colorsFromStrings(colors: string[]): PaletteColor[] {
    return colors.map((css, i) => ({ css, position: i }));
}

function saveCurrentPalette() {
    if (savedColorStrings.length === 0) return;
    const name =
        currentPaletteName.value.trim() || `Palette ${savedPaletteCount + 1}`;

    // Check for duplicate name
    const existing = savedPalettes.find(
        (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    if (existing) {
        duplicateTarget.value = existing;
        return;
    }

    emit("saved", name, colorsFromStrings(savedColorStrings));
    currentPaletteName.value = "";
    duplicateTarget.value = null;
    emit("clearCurrent");
}

function confirmUpdatePalette() {
    // K-PALID: `duplicateTarget` is an existing LOCAL (store) palette — its
    // store key drives the update. Guard the honest optional `id`.
    const id = duplicateTarget.value?.id;
    if (id == null) return;
    emit("updated", id, colorsFromStrings(savedColorStrings));
    currentPaletteName.value = "";
    duplicateTarget.value = null;
    emit("clearCurrent");
}
</script>

<style>
/* Swatch add/remove animation (TransitionGroup) — unscoped for Vue Transition classes */
.swatch-item-enter-active,
.swatch-item-leave-active {
    transition: opacity var(--duration-normal) var(--ease-standard),
                transform var(--duration-normal) var(--ease-standard);
}
.swatch-item-enter-from {
    opacity: 0;
    transform: scale(0);
}
.swatch-item-leave-to {
    opacity: 0;
    transform: scale(0);
}
.swatch-item-leave-active {
    position: absolute;
}
.swatch-item-move {
    transition: transform var(--duration-normal) var(--ease-standard);
}

.edit-overlay-enter-active {
    transition: opacity var(--duration-normal) var(--ease-standard),
                transform var(--duration-slow) var(--ease-dock);
}
.edit-overlay-leave-active {
    transition: opacity var(--duration-fast) var(--ease-standard),
                transform var(--duration-fast) var(--ease-standard);
}
.edit-overlay-enter-from {
    opacity: 0;
    transform: scale(0.5);
    transform-origin: top left;
}
.edit-overlay-leave-to {
    opacity: 0;
    transform: scale(0.8);
    transform-origin: top left;
}
</style>

<style scoped>
/* Editing swatch — dashed outline + grayed out */
.swatch-editing {
    outline: 2px dashed color-mix(in srgb, var(--foreground) 30%, transparent);
    outline-offset: 2px;
    opacity: 0.4;
    filter: grayscale(0.5);
    transition: opacity var(--duration-normal) var(--ease-standard),
                filter var(--duration-normal) var(--ease-standard);
}

/* Cutout effect on the FROM swatch in the edit overlay */
.swatch-cutout {
    outline: 2px dashed color-mix(in srgb, var(--foreground) 30%, transparent);
    outline-offset: -2px;
    box-shadow: inset 0 2px 8px color-mix(in srgb, var(--shadow-color) 15%, transparent);
}

/* Edit overlay — anchored so the FROM swatch aligns exactly over the original */
.edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    align-items: flex-start;
    z-index: var(--z-content);
    padding: 0.375rem;
    border-radius: var(--radius-lg);
    /* Offset so the padding + first swatch aligns with the original swatch position */
    margin-top: -0.375rem;
    margin-left: -0.375rem;
}
</style>
