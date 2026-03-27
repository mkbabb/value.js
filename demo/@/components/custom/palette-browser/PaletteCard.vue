<template>
    <div
        :class="[
            'group rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md cursor-pointer',
            layout === 'aside' && 'flex',
        ]"
        @click="$emit('click')"
    >
        <!-- Color strip -->
        <PaletteColorStrip
            :colors="palette.colors"
            :orientation="layout === 'aside' ? 'vertical' : 'horizontal'"
        />

        <!-- Card body (flex-1 in aside layout so it sits next to the vertical strip) -->
        <div :class="layout === 'aside' && 'flex-1 min-w-0'">

        <!-- Metadata row -->
        <div class="px-3 py-2.5 flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 min-w-0">
                <!-- Drag handle -->
                <GripVertical
                    v-if="draggable"
                    class="drag-handle w-4 h-4 text-muted-foreground/40 shrink-0 cursor-grab active:cursor-grabbing"
                />
                <span
                    class="text-subheading line-clamp-2 sm:line-clamp-1"
                    :class="editableName && 'cursor-text hover:underline decoration-dashed underline-offset-4'"
                    :title="palette.name"
                    @click.stop="editableName && startRenaming()"
                >{{ palette.name }}</span>
                <Badge v-if="palette.status === 'featured'" variant="outline" class="featured-badge text-mono-small shrink-0 gap-1 border-gold text-gold">
                    <Award class="w-3 h-3" />
                    Featured
                </Badge>
                <Badge variant="secondary" class="text-mono-small shrink-0">
                    {{ palette.colors.length }}
                </Badge>

                <!-- Fork indicator -->
                <span
                    v-if="palette.forkOf"
                    class="flex items-center gap-0.5 text-[10px] text-muted-foreground shrink-0"
                    :title="`Remixed from ${palette.forkOf}`"
                >
                    <GitFork class="w-3 h-3" />
                </span>

                <!-- Fork count -->
                <span
                    v-if="(palette.forkCount ?? 0) > 0"
                    class="flex items-center gap-0.5 text-[10px] text-muted-foreground shrink-0"
                    :title="`${palette.forkCount} remix${palette.forkCount === 1 ? '' : 'es'}`"
                >
                    <GitFork class="w-3 h-3" />
                    <span class="fira-code">{{ palette.forkCount }}</span>
                </span>

                <!-- Version count -->
                <span
                    v-if="(palette.versionCount ?? 0) > 1"
                    class="flex items-center gap-0.5 text-[10px] text-muted-foreground shrink-0"
                    :title="`${palette.versionCount} versions`"
                >
                    <History class="w-3 h-3" />
                    <span class="fira-code">{{ palette.versionCount }}</span>
                </span>

                <!-- Tag chips -->
                <span
                    v-for="tag in (palette.tags ?? []).slice(0, 3)"
                    :key="tag"
                    class="rounded-full bg-muted/60 px-1.5 py-0.5 text-[9px] text-muted-foreground shrink-0"
                >{{ tag }}</span>

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
                    <span class="text-mono-small text-muted-foreground">{{ palette.voteCount ?? 0 }}</span>
                </button>
            </div>

            <!-- Dropdown menu -->
            <div class="flex items-center gap-1" @click.stop>
                <PaletteCardMenu
                    :palette="palette"
                    :palette-kind="kind"
                    :menu-open="menuOpen"
                    :is-owned="isOwned"
                    :is-admin="isAdmin"
                    @update-open="menuOpen = $event"
                    @action="handleMenuAction"
                >
                    <template #trigger>
                        <button
                            class="p-1 bg-transparent border-none shadow-none cursor-pointer focus-visible:outline-none"
                            aria-label="Palette menu"
                        >
                            <MoreHorizontal class="w-4 h-4 text-muted-foreground" />
                        </button>
                    </template>
                </PaletteCardMenu>
            </div>
        </div>

        <!-- Inline rename input -->
        <Transition name="rename-slide">
            <PaletteRenameInput
                v-if="renaming"
                :name="palette.name"
                @submit="onRenameSubmit"
                @cancel="renaming = false"
            />
        </Transition>

        <!-- Action feedback -->
        <ActionFeedback
            :message="feedbackMessage"
            :variant="feedbackVariant"
            :visible="feedbackVisible"
            @update:visible="feedbackVisible = $event"
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
                        class="text-mono-small font-bold px-2 py-0.5 rounded-full border truncate max-w-[200px]"
                        :style="{ color: safeFirstColor, borderColor: safeFirstColor }"
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
                    <SwatchHoverMenu
                        v-for="(color, i) in palette.colors"
                        :key="`${color.css}-${i}`"
                        :color="color.css"
                        :open="openPopoverIndex === i"
                        :can-hover="canHover"
                        :floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"
                        :size-class="swatchClass"
                        @hover="onSwatchHover(i, $event)"
                        @leave="onSwatchLeave()"
                        @cancel-leave="cancelSwatchLeave()"
                        @click="onSwatchClick(i)"
                        @update:open="(v: boolean) => onPopoverUpdateTouch(v, i)"
                    >
                        <template #actions>
                            <button v-if="!palette.isLocal" @click="onPopoverAdd(color.css)" class="floating-panel-item p-1.5">
                                <Plus class="w-4 h-4" />
                            </button>
                            <button @click="onPopoverEdit(color, i)" class="floating-panel-item p-1.5">
                                <Pencil class="w-4 h-4" />
                            </button>
                            <button @click="onPopoverCopy(color.css)" class="floating-panel-item p-1.5">
                                <Copy class="w-4 h-4" />
                            </button>
                        </template>
                    </SwatchHoverMenu>
                </div>
            </div>
        </Transition>
        </div><!-- /card body -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Badge } from "@components/ui/badge";
import {
    Copy,
    Heart,
    Award,
    Pencil,
    Plus,
    MoreHorizontal,
    GripVertical,
    GitFork,
    History,
} from "lucide-vue-next";
import type { PaletteColor } from "@lib/palette/types";
import type { Palette } from "@lib/palette/types";
import { getPaletteKind } from "@lib/palette/utils";
import type { PaletteKind } from "@lib/palette/utils";
import { copyToClipboard } from "@composables/useClipboard";
import { useSafeAccentFn } from "@composables/useContrastSafeColor";
import { useHoverPopover } from "./composables/useHoverPopover";
import { useHeightTransition } from "./composables/useHeightTransition";
import SwatchHoverMenu from "./SwatchHoverMenu.vue";
import PaletteColorStrip from "./PaletteColorStrip.vue";
import PaletteCardMenu from "./PaletteCardMenu.vue";
import PaletteRenameInput from "./PaletteRenameInput.vue";
import ActionFeedback from "./ActionFeedback.vue";

const props = withDefaults(
    defineProps<{
        palette: Palette;
        expanded?: boolean;
        cssColor?: string;
        isOwned?: boolean;
        editableName?: boolean;
        isAdmin?: boolean;
        showSlug?: boolean;
        draggable?: boolean;
        /** "default" = strip on top; "aside" = vertical strip on left */
        layout?: "default" | "aside";
        /** CSS class(es) for swatch size override (default: "w-9 h-9 sm:w-10 sm:h-10") */
        swatchClass?: string;
    }>(),
    { layout: "default", swatchClass: "w-9 h-9 sm:w-10 sm:h-10" },
);

const emit = defineEmits<{
    click: [];
    delete: [palette: Palette];
    publish: [palette: Palette];
    save: [palette: Palette];
    vote: [palette: Palette];
    rename: [palette: Palette, newName: string];
    editColor: [palette: Palette, colorIndex: number, css: string];
    addColor: [css: string];
    feature: [palette: Palette];
    adminDelete: [palette: Palette];
    fork: [palette: Palette];
    versions: [palette: Palette];
    flag: [palette: Palette];
    editTags: [palette: Palette];
    export: [palette: Palette, format: string];
}>();

const kind = computed<PaletteKind>(() => getPaletteKind(props.palette));
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? '#888');

const { safeCss } = useSafeAccentFn();
const safeFirstColor = computed(() => safeCss(firstColor.value));
const displaySlug = computed(() => props.palette.userSlug ?? props.palette.slug);

const renaming = ref(false);
const feedbackMessage = ref("");
const feedbackVariant = ref<"success" | "error">("success");
const feedbackVisible = ref(false);

function showFeedback(message: string, variant: "success" | "error") {
    feedbackMessage.value = message;
    feedbackVariant.value = variant;
    feedbackVisible.value = true;
}

defineExpose({ showFeedback });

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

const menuOpen = ref(false);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function onMenuAction(fn: () => void, _isAdmin?: boolean) {
    menuOpen.value = false;
    fn();
}

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
    const isAdminAction = adminActions.has(action);

    const actions: Record<string, () => void> = {
        copyAll: () => copyToClipboard(props.palette.colors.map((c) => c.css).join(", "), "Copied all colors"),
        publish: () => emit("publish", props.palette),
        delete: () => emit("delete", props.palette),
        save: () => emit("save", props.palette),
        rename: () => startRenaming(),
        feature: () => emit("feature", props.palette),
        adminDelete: () => emit("adminDelete", props.palette),
        fork: () => emit("fork", props.palette),
        versions: () => emit("versions", props.palette),
        flag: () => emit("flag", props.palette),
        editTags: () => emit("editTags", props.palette),
        exportJSON: () => emit("export", props.palette, "json"),
        exportCSS: () => emit("export", props.palette, "css"),
        exportTailwind: () => emit("export", props.palette, "tailwind"),
        exportSVG: () => emit("export", props.palette, "svg"),
        exportPNG: () => emit("export", props.palette, "png"),
    };

    const fn = actions[action];
    if (fn) {
        if (action === "rename") {
            fn();
        } else {
            onMenuAction(fn, isAdminAction);
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
    animation: golden-text-shimmer 4s var(--ease-standard) infinite;
}
.featured-badge :deep(svg) {
    stroke: var(--color-gold);
    filter: drop-shadow(0 0 1px rgba(212, 175, 55, 0.4));
}

@keyframes golden-text-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

/* Rename input slide-in / slide-out */
.rename-slide-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate),
                transform var(--duration-normal) var(--ease-spring),
                max-height var(--duration-normal) var(--ease-decelerate);
    overflow: hidden;
}
.rename-slide-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate),
                transform var(--duration-fast) var(--ease-accelerate),
                max-height var(--duration-fast) var(--ease-accelerate);
    overflow: hidden;
}
.rename-slide-enter-from {
    opacity: 0;
    transform: translateY(calc(-1 * var(--animation-slide-md)));
    max-height: 0;
}
.rename-slide-enter-to,
.rename-slide-leave-from {
    max-height: 3rem;
}
.rename-slide-leave-to {
    opacity: 0;
    transform: translateY(calc(-1 * var(--animation-slide-md)));
    max-height: 0;
}
</style>
