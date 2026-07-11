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
            <!-- S.W5-7: singular form — "1 color", never "1 colors". -->
            <span
                v-if="savedColorStrings.length > 0"
                class="text-mono-small text-muted-foreground"
                >{{ savedColorStrings.length }} color{{ savedColorStrings.length !== 1 ? "s" : "" }}</span
            >
        </div>
        <TransitionGroup
            name="vj-enter"
            tag="div"
            class="swatch-row flex items-center gap-2.5 flex-wrap"
        >
            <SwatchHoverMenu
                v-for="(color, i) in savedColorStrings"
                :key="swatchKeys[i] ?? i"
                :color="color"
                :open="currentSwatchPopoverIndex === i"
                :can-hover="canHover"
                :floating-style="currentFloatingStyle"
                size-class="w-11 h-11 sm:w-12 sm:h-12"
                :ghost="isSwatchEditing(i)"
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
                    <Transition name="vj-enter">
                        <div v-if="isSwatchEditing(i)" class="edit-overlay glass-floating hidden lg:flex">
                            <div class="flex items-center gap-2">
                                <!-- The FROM slot reads as the shipped ghost variant — the
                                     seeded dashed silhouette (A3, U22) — not an outline fork. -->
                                <WatercolorDot :color="color" variant="ghost" tag="div" class="w-11 h-11 sm:w-12 sm:h-12 shrink-0" :seed="'edit-from-' + i" />
                                <span class="text-muted-foreground text-caption">&rarr;</span>
                                <WatercolorDot :color="cssColorOpaque" tag="div" class="w-11 h-11 sm:w-12 sm:h-12 shrink-0" :seed="'edit-to-' + i" />
                            </div>
                            <div class="flex gap-2 mt-2 self-center">
                                <!-- W5-a11y: title is tooltip-only; add aria-label so AT reads it -->
                                <!-- T.W5-R5 (T-14 / D7): the per-site spatial strays
                                     (transition-all + hover:scale-110/active:scale-95 on the
                                     dead 150ms bare-utility default — F3) retire onto the
                                     producer's `btn-interactive` atom: the scale leg rides
                                     --transition-liquid-spatial @ --spring-smooth-duration
                                     (inherited, never re-implemented), press/hover magnitudes
                                     + the house focus register come with it. -->
                                <button class="btn-interactive p-2 rounded-full bg-foreground/5 hover:bg-accent/50 cursor-pointer" title="Save edit" aria-label="Save edit" @click.stop="emit('commitEdit')">
                                    <Check class="w-5 h-5" :style="{ color: safeAccent }" aria-hidden="true" />
                                </button>
                                <button class="btn-interactive p-2 rounded-full bg-foreground/5 hover:bg-accent/50 cursor-pointer" title="Cancel edit" aria-label="Cancel edit" @click.stop="emit('cancelEdit')">
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
                            <!-- R.W4 Lane A / A3 (U18): the add-slot is the shipped
                                 WatercolorDot ghost — the seeded dashed silhouette the
                                 committed swatch will fill — seeded by the LIVE color. -->
                            <WatercolorDot
                                :color="cssColorOpaque"
                                variant="ghost"
                                tag="button"
                                seed="add-current-slot"
                                class="add-slot-ghost btn-interactive w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
                                :aria-label="`Add current color ${cssColorOpaque} to palette`"
                                @click="addCurrentColor"
                            >
                                <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
                            </WatercolorDot>
                        </TooltipTrigger>
                        <TooltipContent class="text-mono-small">
                            Add current color ({{ cssColorOpaque }})
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </TransitionGroup>
        <!-- K-INV5 degraded affordance: the save surface names its state
             when the backend is down — the palette still saves locally. -->
        <ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />
        <div
            v-if="savedColorStrings.length > 0"
            class="flex items-center gap-2"
        >
            <!-- S.W5-3 (S-17): the producer Input speaks unmodified — the
                 per-instance override list (pill-strip, opaque bg, halved
                 border, SUPPRESSED focus ring — an a11y regression) is dead.
                 Only layout survives. -->
            <Input
                v-model="currentPaletteName"
                :placeholder="
                    'Palette ' + (savedPaletteCount + 1)
                "
                size="sm"
                class="flex-1"
                @keydown.enter="saveCurrentPalette"
            />
            <Button
                variant="outline"
                icon-only
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
import { SAFE_ACCENT_KEY } from "@composables/color/keys";
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
import ApiOfflineChip from "../status/ApiOfflineChip.vue";
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

<style scoped>
/* R.W4 Lane A / A3 (U18/U22): the former `.swatch-editing` dashed-outline +
 * `.swatch-cutout` forks are DELETED — the being-edited slot and the edit
 * overlay's FROM slot now consume the glass-ui WatercolorDot ghost variant
 * (the seeded dashed silhouette; one shape source, producer-owned). */

/* The add-slot ghost hosts a centred Plus glyph in its default slot. */
.add-slot-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* Edit overlay — anchored so the FROM swatch aligns exactly over the original.
 * vj-enter geometry: grows from its top-left anchor; the explicit vars also
 * OVERRIDE the .swatch-row list geometry it would otherwise inherit. */
.edit-overlay {
    --vj-enter-x: 0px;
    --vj-enter-y: 0px;
    --vj-enter-scale: 0.5;
    transform-origin: top left;
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
