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
                    class="px-3 pb-3 flex flex-wrap gap-1.5 items-start border-t border-gray-700/15 pt-2 max-h-[200px] scrollbar-hidden min-w-0 overflow-x-hidden"
                >
                    <TooltipProvider
                        v-for="(color, i) in palette.colors"
                        :key="i"
                        :delay-duration="100"
                    >
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button
                                    class="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-accent/50 transition-colors cursor-pointer group/swatch"
                                    @click="copyColor(color.css)"
                                >
                                    <div
                                        class="w-5 h-5 rounded-full shrink-0 transition-transform group-hover/swatch:scale-125"
                                        :style="{ backgroundColor: color.css }"
                                    ></div>
                                    <span class="fira-code text-sm text-muted-foreground">
                                        {{ color.name || color.css }}
                                    </span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent class="fira-code text-xs">
                                {{ color.css }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
import { toast } from "vue-sonner";
import type { Palette } from "@lib/palette/types";

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
}>();

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
