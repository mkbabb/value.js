<template>
    <div
        class="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-md cursor-pointer"
        @click="$emit('click')"
    >
        <!-- Color strip — clamp each swatch to min 4px so large palettes don't collapse -->
        <div class="h-10 flex w-full overflow-hidden">
            <div
                v-for="(color, i) in palette.colors"
                :key="i"
                class="h-full shrink-0"
                :style="{
                    backgroundColor: color.css,
                    width: `${Math.max(100 / palette.colors.length, 0.5)}%`,
                }"
            ></div>
        </div>

        <!-- Metadata row -->
        <div class="px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 min-w-0">
                <span class="fraunces text-lg truncate font-bold">{{ palette.name }}</span>
                <Badge v-if="palette.status === 'featured'" variant="default" class="fira-code text-xs shrink-0 gap-1">
                    <Award class="w-3 h-3" />
                    Featured
                </Badge>
                <Badge variant="secondary" class="fira-code text-sm shrink-0">
                    {{ palette.colors.length }}
                </Badge>

                <!-- Vote count (always visible for remote palettes) -->
                <button
                    v-if="!palette.isLocal"
                    class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent transition-colors cursor-pointer shrink-0"
                    @click.stop="emit('vote', palette)"
                >
                    <Heart
                        class="w-3.5 h-3.5 transition-colors"
                        :class="palette.voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'"
                    />
                    <span class="fira-code text-xs text-muted-foreground">{{ palette.voteCount ?? 0 }}</span>
                </button>
            </div>

            <!-- Actions (always visible on mobile, hover-reveal on desktop) -->
            <div
                class="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                @click.stop
            >
                <TooltipProvider :delay-duration="200">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                @click="emit('apply', palette)"
                            >
                                <Pipette class="w-4 h-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Apply palette</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider :delay-duration="200">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                @click="copyAllColors"
                            >
                                <ClipboardCopy class="w-4 h-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Copy all colors</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider :delay-duration="200" v-if="palette.isLocal">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                @click="emit('delete', palette)"
                            >
                                <Trash2 class="w-4 h-4 text-destructive" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Delete</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider :delay-duration="200" v-if="palette.isLocal">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                @click="emit('publish', palette)"
                            >
                                <Globe class="w-4 h-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Publish</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider :delay-duration="200" v-if="!palette.isLocal">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                @click="emit('save', palette)"
                            >
                                <Bookmark class="w-4 h-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent class="fira-code text-xs">Save locally</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <!-- Rename (owner only, remote palettes) -->
                <Popover v-if="!palette.isLocal && isOwned">
                    <TooltipProvider :delay-duration="200">
                        <Tooltip>
                            <PopoverTrigger as-child>
                                <TooltipTrigger as-child>
                                    <button
                                        class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                    >
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <TooltipContent class="fira-code text-xs">Rename</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <PopoverContent class="w-64 p-3" @click.stop>
                        <form class="flex gap-2" @submit.prevent="submitRename">
                            <Input
                                v-model="renameValue"
                                placeholder="New name..."
                                class="fira-code text-sm h-8"
                            />
                            <Button type="submit" size="sm" variant="default" class="shrink-0 h-8">
                                <Check class="w-4 h-4" />
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            </div>
        </div>

        <!-- Expandable detail: color swatches (capped with overflow for very large palettes) -->
        <Transition name="card-expand" @after-enter="onExpandEnter" @before-leave="onExpandLeave">
            <div v-if="expanded" @click.stop>
                <div
                    class="px-3 pb-3 flex flex-wrap gap-2 items-start border-t border-gray-700/15 pt-3 min-w-0 overflow-x-hidden"
                >
                    <div
                        v-for="(color, i) in palette.colors"
                        :key="i"
                        class="relative"
                        @pointerenter="onSwatchHover(i, $event)"
                        @pointerleave="onSwatchLeave()"
                    >
                        <!-- Touch: native Popover click toggle. Hover: manually controlled. -->
                        <Popover v-if="!canHover" :open="openPopoverIndex === i" @update:open="(v: boolean) => onPopoverUpdateTouch(v, i)">
                            <PopoverTrigger as-child>
                                <WatercolorDot
                                    :color="color.css"
                                    tag="button"
                                    class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer"
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                class="w-auto p-1.5 flex items-center gap-1"
                                :side-offset="8"
                            >
                                <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <Plus class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverEdit(color, i)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <Pencil class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverCopy(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                    <ClipboardCopy class="w-4 h-4" />
                                </button>
                            </PopoverContent>
                        </Popover>

                        <!-- Hover: no Popover wrapper — just the dot + a floating panel -->
                        <template v-else>
                            <WatercolorDot
                                :color="color.css"
                                tag="button"
                                class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer"
                                @click="onSwatchClick(i)"
                            />
                            <Teleport to="body">
                                <div
                                    v-if="openPopoverIndex === i"
                                    ref="floatingPanelRefs"
                                    class="swatch-floating-panel"
                                    :style="floatingStyle"
                                    @pointerenter="cancelSwatchLeave()"
                                    @pointerleave="onSwatchLeave()"
                                >
                                    <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <Plus class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverEdit(color, i)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverCopy(color.css)" class="p-1.5 rounded-sm hover:bg-accent transition-colors cursor-pointer">
                                        <ClipboardCopy class="w-4 h-4" />
                                    </button>
                                </div>
                            </Teleport>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import {
    Pipette,
    ClipboardCopy,
    Trash2,
    Globe,
    Bookmark,
    Heart,
    Award,
    Pencil,
    Check,
    Plus,
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import { toast } from "vue-sonner";
import type { Palette } from "@lib/palette/types";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
    palette: Palette;
    expanded?: boolean;
    cssColor?: string;
    isOwned?: boolean;
}>();

const emit = defineEmits<{
    click: [];
    apply: [palette: Palette];
    delete: [palette: Palette];
    publish: [palette: Palette];
    save: [palette: Palette];
    vote: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
    addColor: [css: string];
}>();

const openPopoverIndex = ref<number | null>(null);
let hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// Floating panel positioning (hover devices only)
const floatingStyle = reactive({ top: "0px", left: "0px" });
const floatingPanelRefs = ref<HTMLElement[]>([]);

function positionFloatingPanel(swatchEl: Element) {
    const rect = swatchEl.getBoundingClientRect();
    floatingStyle.top = `${rect.top - 42}px`;
    floatingStyle.left = `${rect.left + rect.width / 2}px`;
}

// Touch: let Popover handle open/close natively
function onPopoverUpdateTouch(open: boolean, index: number) {
    openPopoverIndex.value = open ? index : null;
}

// Hover: pointer events drive everything, no Popover involved
function onSwatchHover(index: number, e: PointerEvent) {
    if (!canHover || e.pointerType === "touch") return;
    cancelSwatchLeave();
    openPopoverIndex.value = index;
    nextTick(() => positionFloatingPanel(e.currentTarget as Element));
}

function onSwatchClick(index: number) {
    // Toggle on click for hover devices as a fallback
    if (openPopoverIndex.value === index) {
        openPopoverIndex.value = null;
    } else {
        openPopoverIndex.value = index;
    }
}

function onSwatchLeave() {
    if (!canHover) return;
    hoverCloseTimer = setTimeout(() => {
        openPopoverIndex.value = null;
    }, 250);
}

function cancelSwatchLeave() {
    if (hoverCloseTimer) {
        clearTimeout(hoverCloseTimer);
        hoverCloseTimer = null;
    }
}

function onPopoverAdd(css: string) {
    openPopoverIndex.value = null;
    emit("addColor", css);
}

function onPopoverEdit(color: PaletteColor, index: number) {
    openPopoverIndex.value = null;
    emit("editColor", props.palette, index, color.css);
}

function onPopoverCopy(css: string) {
    openPopoverIndex.value = null;
    copyColor(css);
}

const renameValue = ref(props.palette.name);

// After expand animation, scroll card into view
function onExpandEnter(el: Element) {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "nearest" });
}
// Before collapsing, close popovers for clean animation
function onExpandLeave() {
    openPopoverIndex.value = null;
}

function submitRename() {
    const name = renameValue.value.trim();
    if (name && name !== props.palette.name) {
        emit("rename", props.palette, name);
    }
}

function copyColor(css: string) {
    navigator.clipboard.writeText(css).then(
        () => toast.success(`Copied ${css}`),
        () => toast.error("Failed to copy"),
    );
}

function copyAllColors() {
    const text = props.palette.colors.map((c) => c.css).join(", ");
    navigator.clipboard.writeText(text).then(
        () => toast.success("Copied all colors"),
        () => toast.error("Failed to copy"),
    );
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
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
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
