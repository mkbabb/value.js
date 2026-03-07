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
                <span
                    class="fraunces text-lg font-bold line-clamp-2 sm:line-clamp-1"
                    :class="editableName && 'cursor-text hover:underline decoration-dashed underline-offset-4'"
                    :title="palette.name"
                    @click.stop="editableName ? startRenaming() : toggleMenu()"
                >{{ palette.name }}</span>
                <Badge v-if="palette.status === 'featured'" variant="outline" class="featured-badge fira-code text-xs shrink-0 gap-1 border-gold text-gold">
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
                    aria-label="Vote for palette"
                    @click.stop="emit('vote', palette)"
                >
                    <Heart
                        class="w-3.5 h-3.5 transition-colors"
                        :class="palette.voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'"
                    />
                    <span class="fira-code text-xs text-muted-foreground">{{ palette.voteCount ?? 0 }}</span>
                </button>
            </div>

            <!-- Hamburger menu trigger -->
            <div
                class="flex items-center gap-1"
                @click.stop
            >
                <button
                    ref="menuTriggerRef"
                    class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                    aria-label="Palette menu"
                    @click="toggleMenu"
                    @pointerenter="onMenuTriggerEnter"
                    @pointerleave="onMenuTriggerLeave"
                >
                    <MoreHorizontal class="w-4 h-4 text-muted-foreground" />
                </button>

                <!-- Floating menu panel -->
                <Teleport to="body">
                    <div
                        v-if="menuOpen"
                        class="card-menu-panel"
                        :style="menuStyle"
                        @pointerenter="onMenuPanelEnter"
                        @pointerleave="onMenuPanelLeave"
                        @click.stop
                    >
                        <!-- Full palette name as header -->
                        <div class="px-3 py-1.5 fraunces text-sm font-bold text-foreground border-b border-border truncate max-w-[200px]">
                            {{ palette.name }}
                        </div>

                        <button class="card-menu-item" @click="onMenuAction(() => emit('apply', palette))">
                            <SwatchBook class="w-4 h-4" />
                            <span>Apply palette</span>
                        </button>
                        <button class="card-menu-item" @click="onMenuAction(() => copyAllColors())">
                            <Copy class="w-4 h-4" />
                            <span>Copy all colors</span>
                        </button>

                        <template v-if="palette.isLocal">
                            <button class="card-menu-item" @click="onMenuAction(() => emit('publish', palette))">
                                <Globe class="w-4 h-4" />
                                <span>Publish</span>
                            </button>
                            <button class="card-menu-item text-destructive" @click="onMenuAction(() => emit('delete', palette))">
                                <Trash2 class="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </template>

                        <template v-if="!palette.isLocal">
                            <button class="card-menu-item" @click="onMenuAction(() => emit('save', palette))">
                                <Bookmark class="w-4 h-4" />
                                <span>Save locally</span>
                            </button>
                        </template>

                        <template v-if="!palette.isLocal && isOwned">
                            <button class="card-menu-item" @click="startRenaming">
                                <Pencil class="w-4 h-4" />
                                <span>Rename</span>
                            </button>
                        </template>

                        <template v-if="isAdmin && !palette.isLocal">
                            <div class="border-t border-border my-0.5"></div>
                            <button class="card-menu-item" @click="onMenuAction(() => emit('feature', palette), true)">
                                <Star v-if="palette.status !== 'featured'" class="w-4 h-4" />
                                <StarOff v-else class="w-4 h-4" />
                                <span>{{ palette.status === 'featured' ? 'Unfeature' : 'Feature' }}</span>
                            </button>
                            <button class="card-menu-item text-destructive" @click="onMenuAction(() => emit('adminDelete', palette), true)">
                                <Trash2 class="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </template>
                    </div>
                </Teleport>
            </div>
        </div>

        <!-- Inline rename input -->
        <div v-if="renaming" class="px-3 pb-2" @click.stop>
            <form class="flex gap-2" @submit.prevent="submitRename">
                <Input
                    v-model="renameValue"
                    placeholder="New name..."
                    class="fira-code text-sm h-8"
                    autofocus
                />
                <Button type="submit" size="sm" variant="default" class="shrink-0 h-8">
                    <Check class="w-4 h-4" />
                </Button>
                <Button type="button" size="sm" variant="ghost" class="shrink-0 h-8" @click="renaming = false">
                    Cancel
                </Button>
            </form>
        </div>

        <!-- Expandable detail: color swatches -->
        <Transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div v-if="expanded" @click.stop class="overflow-hidden">
                <!-- User slug display -->
                <div v-if="showSlug && displaySlug" class="px-3 pt-2.5 flex items-center gap-1.5 border-t border-gray-700/15">
                    <span
                        class="fira-code text-xs font-bold px-2 py-0.5 rounded-full border truncate max-w-[200px]"
                        :style="{ color: firstColor, borderColor: firstColor }"
                    >{{ displaySlug }}</span>
                    <button
                        class="p-0.5 rounded-sm hover:bg-accent transition-colors cursor-pointer shrink-0"
                        @click="copyToClipboard(displaySlug)"
                    >
                        <Copy class="w-3 h-3 text-muted-foreground" />
                    </button>
                </div>
                <div
                    class="px-3 pb-3 flex flex-wrap gap-2 items-start pt-3 min-w-0"
                    :class="!(showSlug && displaySlug) && 'border-t border-gray-700/15'"
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
                                    <Copy class="w-4 h-4" />
                                </button>
                            </PopoverContent>
                        </Popover>

                        <!-- Hover: no Popover wrapper — just the dot + a floating panel -->
                        <template v-else>
                            <WatercolorDot
                                :color="color.css"
                                tag="button"
                                class="w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer"
                                @click.stop="onSwatchClick(i)"
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
                                        <Copy class="w-4 h-4" />
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
import { ref, computed } from "vue";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
    SwatchBook,
    Copy,
    Trash2,
    Globe,
    Bookmark,
    Heart,
    Award,
    Pencil,
    Check,
    Plus,
    MoreHorizontal,
    Star,
    StarOff,
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import type { Palette } from "@lib/palette/types";
import { copyToClipboard } from "@composables/useClipboard";
import { useHoverPopover } from "@composables/useHoverPopover";
import { useCardMenu } from "@composables/useCardMenu";
import { useHeightTransition } from "@composables/useHeightTransition";
import { WatercolorDot } from "@components/custom/watercolor-dot";

const props = defineProps<{
    palette: Palette;
    expanded?: boolean;
    cssColor?: string;
    isOwned?: boolean;
    editableName?: boolean;
    isAdmin?: boolean;
    showSlug?: boolean;
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
    feature: [palette: Palette];
    adminDelete: [palette: Palette];
}>();

const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? '#888');
const displaySlug = computed(() => props.palette.userSlug ?? props.palette.slug);

const renaming = ref(false);

const {
    canHover,
    openIndex: openPopoverIndex,
    style: floatingStyle,
    onHover: onSwatchHover,
    onLeave: onSwatchLeave,
    cancelLeave: cancelSwatchLeave,
    onPopoverUpdateTouch,
    onSwatchClick,
} = useHoverPopover();

const {
    menuOpen,
    menuTriggerRef,
    menuStyle,
    toggleMenu,
    onMenuTriggerEnter,
    onMenuTriggerLeave,
    onMenuPanelEnter,
    onMenuPanelLeave,
    onMenuAction,
} = useCardMenu({ canHover });

const {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
} = useHeightTransition({
    onBeforeCollapse: () => { openPopoverIndex.value = null; },
});

const floatingPanelRefs = ref<HTMLElement[]>([]);

function startRenaming() {
    menuOpen.value = false;
    renaming.value = true;
    renameValue.value = props.palette.name;
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

function submitRename() {
    const name = renameValue.value.trim();
    if (name && name !== props.palette.name) {
        emit("rename", props.palette, name);
    }
    renaming.value = false;
}

function copyColor(css: string) {
    copyToClipboard(css);
}

function copyAllColors() {
    const text = props.palette.colors.map((c) => c.css).join(", ");
    copyToClipboard(text, "Copied all colors");
}
</script>

<style scoped>
.card-menu-panel {
    position: fixed;
    z-index: 50;
    display: flex;
    flex-direction: column;
    min-width: 160px;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    pointer-events: auto;
    animation: card-menu-in 0.15s ease-out;
    overflow: hidden;
}
.card-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-family: "Fraunces", sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
    width: 100%;
    text-align: left;
}
.card-menu-item:hover {
    background-color: hsl(var(--accent));
}
@keyframes card-menu-in {
    from {
        opacity: 0;
        filter: blur(4px);
        transform: translateX(-100%) scale(0.96);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateX(-100%) scale(1);
    }
}

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
        filter: blur(4px);
        transform: translateX(-50%) scale(0.96);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateX(-50%) scale(1);
    }
}

.featured-badge {
    background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light), var(--color-gold), var(--color-gold-light), var(--color-gold));
    background-size: 300% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-color: var(--color-gold);
    animation: golden-text-shimmer 4s ease-in-out infinite;
}
.featured-badge :deep(svg) {
    stroke: var(--color-gold);
    filter: drop-shadow(0 0 1px rgba(212, 175, 55, 0.4));
}

@keyframes golden-text-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}
</style>
