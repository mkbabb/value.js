<template>
    <div
        class="group rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
        @click="$emit('click')"
    >
        <!-- Color strip -->
        <PaletteColorStrip :colors="palette.colors" />

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

                <!-- Vote count -->
                <button
                    v-if="!palette.isLocal"
                    class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
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
            <div class="flex items-center gap-1" @click.stop>
                <button
                    ref="menuTriggerRef"
                    class="p-1 rounded-sm hover:bg-accent transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                    aria-label="Palette menu"
                    @click="toggleMenu"
                    @pointerenter="onMenuTriggerEnter"
                    @pointerleave="onMenuTriggerLeave"
                >
                    <MoreHorizontal class="w-4 h-4 text-muted-foreground" />
                </button>

                <PaletteCardMenu
                    :palette="palette"
                    :menu-open="menuOpen"
                    :menu-style="menuStyle"
                    :is-owned="isOwned"
                    :is-admin="isAdmin"
                    @panel-enter="onMenuPanelEnter"
                    @panel-leave="onMenuPanelLeave"
                    @action="handleMenuAction"
                />
            </div>
        </div>

        <!-- Inline rename input -->
        <PaletteRenameInput
            v-if="renaming"
            :name="palette.name"
            @submit="onRenameSubmit"
            @cancel="renaming = false"
        />

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
                <div v-if="showSlug && displaySlug" class="px-3 pt-2.5 flex items-center gap-1.5 border-t border-border/15">
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
                    :class="!(showSlug && displaySlug) && 'border-t border-border/15'"
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
                                <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="floating-panel-item p-1.5">
                                    <Plus class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverEdit(color, i)" class="floating-panel-item p-1.5">
                                    <Pencil class="w-4 h-4" />
                                </button>
                                <button @click="onPopoverCopy(color.css)" class="floating-panel-item p-1.5">
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
                                    class="floating-panel flex items-center gap-1 p-1.5"
                                    :style="{ ...floatingStyle, transform: 'translateX(-50%)' }"
                                    @pointerenter="cancelSwatchLeave()"
                                    @pointerleave="onSwatchLeave()"
                                >
                                    <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="floating-panel-item p-1.5">
                                        <Plus class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverEdit(color, i)" class="floating-panel-item p-1.5">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                    <button @click="onPopoverCopy(color.css)" class="floating-panel-item p-1.5">
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
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
    Copy,
    Heart,
    Award,
    Pencil,
    Plus,
    MoreHorizontal,
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import type { Palette } from "@lib/palette/types";
import { copyToClipboard } from "@composables/useClipboard";
import { useHoverPopover } from "@composables/useHoverPopover";
import { useCardMenu } from "@composables/useCardMenu";
import { useHeightTransition } from "@composables/useHeightTransition";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import PaletteColorStrip from "./PaletteColorStrip.vue";
import PaletteCardMenu from "./PaletteCardMenu.vue";
import PaletteRenameInput from "./PaletteRenameInput.vue";

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
}

function onRenameSubmit(newName: string) {
    emit("rename", props.palette, newName);
    renaming.value = false;
}

function handleMenuAction(action: string) {
    const adminActions = new Set(["feature", "adminDelete"]);
    const isAdmin = adminActions.has(action);

    const actions: Record<string, () => void> = {
        apply: () => emit("apply", props.palette),
        copyAll: () => copyToClipboard(props.palette.colors.map((c) => c.css).join(", "), "Copied all colors"),
        publish: () => emit("publish", props.palette),
        delete: () => emit("delete", props.palette),
        save: () => emit("save", props.palette),
        rename: () => startRenaming(),
        feature: () => emit("feature", props.palette),
        adminDelete: () => emit("adminDelete", props.palette),
    };

    const fn = actions[action];
    if (fn) {
        if (action === "rename") {
            fn();
        } else {
            onMenuAction(fn, isAdmin);
        }
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
    copyToClipboard(css);
}
</script>

<style scoped>
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
