<template>
    <div
        class="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-3 grid gap-2"
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
                            class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
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
                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
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
                            class="swatch-floating-panel"
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
                                class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                            >
                                <Pencil class="w-4 h-4" />
                            </button>
                            <button
                                @click="
                                    onCurrentSwatchCopy(
                                        color,
                                    )
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
                        </div>
                    </Teleport>
                </template>
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
                class="fira-code text-sm h-8 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                @keydown.enter="saveCurrentPalette"
            />
            <Button
                variant="outline"
                size="sm"
                class="fraunces text-sm h-8 cursor-pointer border-primary/30"
                :disabled="savedColorStrings.length === 0"
                @click="saveCurrentPalette"
            >
                Save
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
                class="h-6 px-2 text-xs cursor-pointer fraunces"
                @click="confirmUpdatePalette"
            >
                Update
            </Button>
            <Button
                variant="ghost"
                size="sm"
                class="h-6 px-2 text-xs cursor-pointer fraunces"
                @click="duplicateTarget = null"
            >
                Cancel
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, TransitionGroup } from "vue";
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
}>();

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

<style scoped>
.swatch-floating-panel {
    position: fixed;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);
    pointer-events: auto;
    animation: swatch-panel-in 0.15s ease-out;
}

@keyframes swatch-panel-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(4px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}
</style>
