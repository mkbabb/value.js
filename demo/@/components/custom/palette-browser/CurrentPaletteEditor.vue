<template>
    <div
        class="max-w-sm rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 grid gap-2"
    >
        <div
            class="flex items-center justify-between gap-2"
        >
            <span
                class="fraunces text-sm font-bold text-muted-foreground"
            >
                {{
                    savedColorStrings.length > 0
                        ? "Current Palette"
                        : "Start a new palette"
                }}
            </span>
            <span
                v-if="savedColorStrings.length > 0"
                class="fira-code text-xs text-muted-foreground"
                >{{ savedColorStrings.length }} colors</span
            >
        </div>
        <TransitionGroup
            name="swatch-item"
            tag="div"
            class="flex items-center gap-2.5 flex-wrap"
        >
            <div
                v-for="(color, i) in savedColorStrings"
                :key="swatchKeys[i]"
                class="relative"
                @pointerenter="
                    onCurrentSwatchHover(i, $event)
                "
                @pointerleave="onCurrentSwatchLeave()"
            >
                <!-- Touch: native Popover click toggle -->
                <Popover
                    v-if="!canHover"
                    :open="currentSwatchPopoverIndex === i"
                    @update:open="
                        (v: boolean) =>
                            onCurrentSwatchPopoverUpdateTouch(
                                v,
                                i,
                            )
                    "
                >
                    <PopoverTrigger as-child>
                        <WatercolorDot
                            :color="color"
                            tag="button"
                            :class="['w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer', isSwatchEditing(i) && 'swatch-editing']"
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        class="w-auto p-1.5 flex items-center gap-1"
                        :side-offset="8"
                    >
                        <button
                            @click="
                                onCurrentSwatchEdit(
                                    color,
                                    i,
                                )
                            "
                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                        >
                            <Pencil class="w-4 h-4" />
                        </button>
                        <button
                            @click="
                                onCurrentSwatchCopy(color)
                            "
                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                        >
                            <Copy
                                class="w-4 h-4"
                            />
                        </button>
                        <button
                            @click="
                                onCurrentSwatchRemove(
                                    color,
                                    i,
                                )
                            "
                            class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                        >
                            <Trash2
                                class="w-4 h-4 text-destructive"
                            />
                        </button>
                    </PopoverContent>
                </Popover>

                <!-- Hover: manually positioned floating panel -->
                <template v-else>
                    <WatercolorDot
                        :color="color"
                        tag="button"
                        :class="['w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer', isSwatchEditing(i) && 'swatch-editing']"
                        @click.stop="
                            onCurrentSwatchClick(i)
                        "
                    />
                    <Teleport to="body">
                        <div
                            v-if="
                                currentSwatchPopoverIndex ===
                                i
                            "
                            class="floating-panel flex items-center gap-1 p-1.5"
                            :style="currentFloatingStyle"
                            @pointerenter="
                                cancelCurrentSwatchLeave()
                            "
                            @pointerleave="
                                onCurrentSwatchLeave()
                            "
                        >
                            <button
                                @click="
                                    onCurrentSwatchEdit(
                                        color,
                                        i,
                                    )
                                "
                                class="floating-panel-item"
                            >
                                <Pencil class="w-4 h-4" />
                            </button>
                            <button
                                @click="
                                    onCurrentSwatchCopy(
                                        color,
                                    )
                                "
                                class="floating-panel-item"
                            >
                                <Copy
                                    class="w-4 h-4"
                                />
                            </button>
                            <button
                                @click="
                                    onCurrentSwatchRemove(
                                        color,
                                        i,
                                    )
                                "
                                class="floating-panel-item"
                            >
                                <Trash2
                                    class="w-4 h-4 text-destructive"
                                />
                            </button>
                        </div>
                    </Teleport>
                </template>

                <!-- Edit overlay popover (desktop) — wraps around the swatch -->
                <Transition name="edit-overlay">
                    <div v-if="isSwatchEditing(i)" class="edit-overlay hidden lg:flex">
                        <div class="flex items-center gap-2">
                            <WatercolorDot
                                :color="color"
                                tag="div"
                                class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 opacity-50 grayscale-[0.4] swatch-cutout"
                                :seed="'edit-from-' + i"
                            />
                            <span class="text-muted-foreground text-xs">&rarr;</span>
                            <WatercolorDot
                                :color="cssColorOpaque"
                                tag="div"
                                class="w-11 h-11 sm:w-12 sm:h-12 shrink-0"
                                :seed="'edit-to-' + i"
                            />
                        </div>
                        <div class="flex gap-2 mt-2 self-center">
                            <button
                                class="p-2 rounded-full bg-foreground/5 hover:bg-foreground/15 transition-all cursor-pointer hover:scale-110 active:scale-95"
                                title="Save edit"
                                @click.stop="emit('commitEdit')"
                            >
                                <Check class="w-5 h-5" :style="{ color: cssColorOpaque }" />
                            </button>
                            <button
                                class="p-2 rounded-full bg-foreground/5 hover:bg-foreground/15 transition-all cursor-pointer hover:scale-110 active:scale-95"
                                title="Cancel edit"
                                @click.stop="emit('cancelEdit')"
                            >
                                <Undo2 class="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
            <!-- Add current color button -->
            <TooltipProvider
                key="__add__"
                :delay-duration="200"
            >
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all"
                            @click="addCurrentColor"
                        >
                            <Plus
                                class="w-5 h-5 text-primary/40"
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent
                        class="fira-code text-xs"
                    >
                        Add current color ({{
                            cssColorOpaque
                        }})
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
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
                class="fira-code text-sm h-8 flex-1 rounded-2xl bg-background border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                @keydown.enter="saveCurrentPalette"
            />
            <Button
                variant="outline"
                size="icon"
                class="h-8 w-8 rounded-full cursor-pointer border-border/50 shrink-0"
                :disabled="savedColorStrings.length === 0"
                @click="saveCurrentPalette"
            >
                <Check class="w-4 h-4" />
            </Button>
        </div>
        <div
            v-if="duplicateTarget"
            class="flex items-center gap-2 flex-wrap"
        >
            <span class="fira-code text-xs text-muted-foreground italic">
                "{{ duplicateTarget.name }}" already exists.
            </span>
            <Button
                variant="outline"
                size="sm"
                class="h-6 px-2 text-xs cursor-pointer fraunces rounded-full"
                @click="confirmUpdatePalette"
            >
                Update
            </Button>
            <Button
                variant="ghost"
                size="sm"
                class="h-6 px-2 text-xs cursor-pointer fraunces rounded-full"
                @click="duplicateTarget = null"
            >
                Cancel
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch, TransitionGroup } from "vue";
import type { Ref } from "vue";
import type { EditTarget } from "@components/custom/color-picker";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
    Plus,
    Pencil,
    Copy,
    Trash2,
    Check,
    Undo2,
} from "lucide-vue-next";
import { copyToClipboard } from "@composables/useClipboard";
import { useHoverPopover } from "@composables/useHoverPopover";
import type { Palette, PaletteColor } from "@lib/palette/types";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
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
}>();

// --- Edit target from parent (for dashed outline on editing swatch) ---
const activeEditTarget = inject<Ref<EditTarget | null>>("activeEditTarget", ref(null));
function isSwatchEditing(index: number): boolean {
    const et = activeEditTarget.value;
    return !!et && et.paletteId === "__current__" && et.colorIndex === index;
}

// --- Hover popover for current swatches ---
const {
    canHover,
    openIndex: currentSwatchPopoverIndex,
    style: currentFloatingStyle,
    onHover: onCurrentSwatchHover,
    onLeave: onCurrentSwatchLeave,
    cancelLeave: cancelCurrentSwatchLeave,
    close: closeCurrentSwatchPopover,
    onPopoverUpdateTouch: onCurrentSwatchPopoverUpdateTouch,
    onSwatchClick: onCurrentSwatchClick,
} = useHoverPopover();

// --- Stable keys for TransitionGroup ---
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    props.savedColorStrings.map((color, i) => {
        const mapKey = `${color}::${i}`;
        if (!swatchKeyMap.has(mapKey)) {
            swatchKeyMap.set(mapKey, swatchKeyCounter++);
        }
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(
    () => props.savedColorStrings,
    () => {
        const validKeys = new Set(props.savedColorStrings.map((c, i) => `${c}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
    },
);

// --- Current palette save ---
const currentPaletteName = ref("");
const duplicateTarget = ref<Palette | null>(null);

function addCurrentColor() {
    const existingIdx = props.savedColorStrings.indexOf(props.cssColorOpaque);
    if (existingIdx !== -1 && props.savedColorStrings.length > 1) {
        const reordered = props.savedColorStrings.filter((_, i) => i !== existingIdx);
        reordered.push(props.cssColorOpaque);
        emit("apply", reordered);
        return;
    }
    if (existingIdx !== -1) {
        return;
    }
    emit("addColor", props.cssColorOpaque);
}

function onCurrentSwatchEdit(css: string, index: number) {
    closeCurrentSwatchPopover();
    emit("startEdit", {
        paletteId: "__current__",
        colorIndex: index,
        originalCss: css,
    });
}

function onCurrentSwatchCopy(css: string) {
    closeCurrentSwatchPopover();
    copyToClipboard(css);
}

function onCurrentSwatchRemove(css: string, index: number) {
    closeCurrentSwatchPopover();
    const updated = props.savedColorStrings.filter((_, i) => i !== index);
    emit("apply", updated);
}

function colorsFromStrings(colors: string[]): PaletteColor[] {
    return colors.map((css, i) => ({ css, position: i }));
}

function saveCurrentPalette() {
    if (props.savedColorStrings.length === 0) return;
    const name =
        currentPaletteName.value.trim() || `Palette ${props.savedPaletteCount + 1}`;

    // Check for duplicate name
    const existing = props.savedPalettes.find(
        (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    if (existing) {
        duplicateTarget.value = existing;
        return;
    }

    emit("saved", name, colorsFromStrings(props.savedColorStrings));
    currentPaletteName.value = "";
    duplicateTarget.value = null;
}

function confirmUpdatePalette() {
    if (!duplicateTarget.value) return;
    emit("updated", duplicateTarget.value.id, colorsFromStrings(props.savedColorStrings));
    currentPaletteName.value = "";
    duplicateTarget.value = null;
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

/* Editing swatch — dashed outline + grayed out */
.swatch-editing {
    outline: 2px dashed hsl(var(--foreground) / 0.3);
    outline-offset: 2px;
    opacity: 0.4;
    filter: grayscale(0.5);
    transition: opacity var(--duration-normal) var(--ease-standard),
                filter var(--duration-normal) var(--ease-standard);
}

/* Cutout effect on the FROM swatch in the edit overlay */
.swatch-cutout {
    outline: 2px dashed hsl(var(--foreground) / 0.3);
    outline-offset: -2px;
    box-shadow: inset 0 2px 8px hsl(var(--foreground) / 0.15);
}

/* Edit overlay — anchored so the FROM swatch aligns exactly over the original */
.edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    align-items: flex-start;
    z-index: 20;
    padding: 0.375rem;
    background: var(--glass-bg-heavy);
    backdrop-filter: var(--glass-blur-heavy);
    -webkit-backdrop-filter: var(--glass-blur-heavy);
    border: 1px solid hsl(var(--border) / 0.6);
    border-radius: var(--radius-lg, 1rem);
    box-shadow: var(--glass-shadow-elevated);
    /* Offset so the padding + first swatch aligns with the original swatch position */
    margin-top: -0.375rem;
    margin-left: -0.375rem;
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
