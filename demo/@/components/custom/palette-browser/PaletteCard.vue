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
            <div v-if="expanded" ref="expandRef" @click.stop>
                <div
                    class="px-3 pb-3 flex flex-wrap gap-2 items-start border-t border-gray-700/15 pt-3 max-h-[220px] scrollbar-hidden min-w-0 overflow-x-hidden"
                >
                    <div
                        v-for="(color, i) in palette.colors"
                        :key="i"
                        class="group/swatch relative"
                    >
                        <TooltipProvider :delay-duration="100">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <WatercolorDot
                                        :color="color.css"
                                        tag="button"
                                        class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer relative"
                                        @click="(e) => onSwatchClick(e, color, i)"
                                        v-on="swatchLongPress.bind({ color, index: i })"
                                    >
                                        <Pencil class="absolute inset-0 m-auto w-3 h-3 text-white drop-shadow-sm opacity-0 group-hover/swatch:opacity-80 transition-opacity pointer-events-none" />
                                    </WatercolorDot>
                                </TooltipTrigger>
                                <TooltipContent class="fira-code text-xs">
                                    <div>{{ color.name || color.css }}</div>
                                    <div class="text-muted-foreground text-[10px]">Tap to copy / Hold to edit</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import { toast } from "vue-sonner";
import type { Palette } from "@lib/palette/types";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import { createLongPress } from "@composables/useLongPress";

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
}>();

// Long-press on touch → edit; shift+click on desktop → edit
const swatchLongPress = createLongPress<{ color: PaletteColor; index: number }>(
    ({ color, index }) => emit("editColor", props.palette, index, color.css),
);

function onSwatchClick(e: MouseEvent, color: PaletteColor, index: number) {
    if (swatchLongPress.consume()) return; // was a long press
    if (e.shiftKey) {
        emit("editColor", props.palette, index, color.css);
    } else {
        copyColor(color.css);
    }
}

const renameValue = ref(props.palette.name);
const expandRef = ref<HTMLElement | null>(null);

// After the expand animation finishes, enable scrolling and scroll into view
function onExpandEnter(el: Element) {
    const inner = (el as HTMLElement).querySelector<HTMLElement>("[class*='max-h-']");
    if (inner) inner.style.overflowY = "auto";
    // Scroll the expanded card into view so the last palette on screen is visible
    (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "nearest" });
}
// Before collapsing, disable scrolling so the animation is clean
function onExpandLeave(el: Element) {
    const inner = (el as HTMLElement).querySelector<HTMLElement>("[class*='max-h-']");
    if (inner) inner.style.overflowY = "hidden";
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
