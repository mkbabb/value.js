<template>
    <!-- W5-a11y: role="article" provides a landmark for each palette; button semantics on the card
         are omitted because inner interactive controls must be reachable — using article + click is
         the correct pattern for a card container that also houses nested interactive elements. -->
    <div
        :class="[
            // Z2 in-plate card (DESIGN.md §Depth): the --card-edge hairline
            // (consumed via the border-card-edge bridge), the chip-scale
            // cartoon rung at rest, and a law-3 hover that DEEPENS the same
            // voice (sm → md) instead of lurching from none to the full rung.
            // T.W3-1 (D1 rung-2 WELL; supersedes S-20 — R8): the card is an
            // in-plate fixture — an opaque tone-step of the host plate
            // (`bg-well`), never heavier glass than its host (RC-2). The
            // blur dies with the glass recipe. PaletteCardSkeleton +
            // .dashed-well speak the same shell by construction.
            // NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip
            // rasterizes 1-bit at compositing-layer bounds (the stair-stepped
            // strip corner in the owner's shot); the strip clips its OWN
            // corners below — an interior clip keeps normal AA.
            'group rounded-card border border-card-edge bg-well shadow-cartoon-sm transition-shadow hover:shadow-cartoon-md cursor-pointer',
            layout === 'aside' && 'flex',
        ]"
        role="article"
        :aria-label="`Palette: ${palette.name}`"
        @click="$emit('click')"
    >
        <!-- Color strip — the card's only full-bleed child; it carries the
             corner radius itself now that the card no longer clips. -->
        <PaletteColorStrip
            :colors="palette.colors"
            :orientation="layout === 'aside' ? 'vertical' : 'horizontal'"
            :class="layout === 'aside' ? 'rounded-l-card' : 'rounded-t-card'"
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
                <!-- S.W5-7: the title hides while the rename input is open —
                     never the same string twice on one card. -->
                <span
                    v-if="!renaming"
                    class="text-subheading line-clamp-2 sm:line-clamp-1"
                    :class="editableName && 'cursor-text hover:underline decoration-dashed underline-offset-4'"
                    :title="palette.name"
                    @click.stop="editableName && startRenaming()"
                >{{ palette.name }}</span>
                <!-- S.W7-7: the featured badge's gold TEXT shimmer consumes the
                     producer's ONE metal register (glass-ui `.gold-shimmer` —
                     gradient-clip + metal-shimmer-sweep, PRM-gated); the local
                     `golden-text-shimmer` keyframe fork is retired. -->
                <Badge v-if="palette.tier === 'featured'" variant="outline" class="featured-badge gold-shimmer text-mono-small shrink-0 gap-1 border-gold">
                    <!-- Wrapper class lets the scoped `.featured-badge__icon`
                         selector style the icon without :deep(svg) reach. -->
                    <span class="featured-badge__icon inline-flex">
                        <Award class="w-3 h-3" />
                    </span>
                    Featured
                </Badge>
                <Badge variant="secondary" class="text-mono-small shrink-0">
                    {{ palette.colors.length }}
                </Badge>

                <!-- Fork indicator -->
                <span
                    v-if="palette.forkOf"
                    class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
                    :title="`Remixed from ${palette.forkOf}`"
                >
                    <GitFork class="w-3 h-3" />
                </span>

                <!-- Fork count -->
                <span
                    v-if="(palette.forkCount ?? 0) > 0"
                    class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
                    :title="`${palette.forkCount} remix${palette.forkCount === 1 ? '' : 'es'}`"
                >
                    <GitFork class="w-3 h-3" />
                    <span class="fira-code">{{ palette.forkCount }}</span>
                </span>

                <!-- Version count -->
                <span
                    v-if="(palette.versionCount ?? 0) > 1"
                    class="flex items-center gap-0.5 text-micro text-muted-foreground shrink-0"
                    :title="`${palette.versionCount} versions`"
                >
                    <History class="w-3 h-3" />
                    <span class="fira-code">{{ palette.versionCount }}</span>
                </span>

                <!-- Tag chips -->
                <span
                    v-for="tag in (palette.tags ?? []).slice(0, 3)"
                    :key="tag"
                    class="rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground shrink-0"
                >{{ tag }}</span>

                <!-- Vote count -->
                <button
                    v-if="!palette.isLocal"
                    class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                    :aria-label="`${palette.voteCount ?? 0} votes, click to vote`"
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
                        <!-- S.W5-4: 3rd copy of the hand-rolled icon-trigger
                             recipe dies onto the glass-ui atom; the sm square
                             also cures the ~24px touch target. -->
                        <Button
                            icon-only
                            variant="ghost"
                            size="sm"
                            aria-label="Palette menu"
                            class="shrink-0"
                        >
                            <MoreHorizontal class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        </Button>
                    </template>
                </PaletteCardMenu>
            </div>
        </div>

        <!-- Inline rename input — morph family with a height morph (the row
             unfurls in place; geometry vars on .rename-morph below). -->
        <Transition name="vj-morph">
            <PaletteRenameInput
                v-if="renaming"
                class="rename-morph"
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
            <PaletteCardSwatches
                v-if="expanded"
                :colors="palette.colors"
                :is-local="palette.isLocal"
                :display-slug="showSlug ? displaySlug : undefined"
                :safe-first-color="safeFirstColor"
                :open-popover-index="openPopoverIndex"
                :can-hover="canHover"
                :floating-style="floatingStyle"
                :swatch-class="swatchClass"
                @hover="onSwatchHover"
                @leave="onSwatchLeave()"
                @cancel-leave="cancelSwatchLeave()"
                @swatch-click="onSwatchClick"
                @popover-touch="onPopoverUpdateTouch"
                @popover-add="onPopoverAdd"
                @popover-edit="onPopoverEdit"
                @popover-copy="onPopoverCopy"
            />
        </Transition>
        </div><!-- /card body -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
    Heart,
    Award,
    MoreHorizontal,
    GripVertical,
    GitFork,
    History,
} from "@lucide/vue";
import type { Palette, PaletteColor } from "@lib/palette/types";
import { getPaletteKind, type PaletteKind } from "@lib/palette/utils";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { useSafeAccentFn } from "@composables/color/useContrastSafeColor";
import { useHoverPopover } from "../composables/useHoverPopover";
import { useHeightTransition } from "../composables/useHeightTransition";
import PaletteColorStrip from "../PaletteColorStrip.vue";
import PaletteCardMenu from "./PaletteCardMenu.vue";
import PaletteCardSwatches from "./PaletteCardSwatches.vue";
import PaletteRenameInput from "./PaletteRenameInput.vue";
import ActionFeedback from "./ActionFeedback.vue";

const props = withDefaults(
    defineProps<{
        palette: Palette;
        expanded?: boolean | undefined;
        cssColor?: string | undefined;
        isOwned?: boolean | undefined;
        editableName?: boolean | undefined;
        isAdmin?: boolean | undefined;
        showSlug?: boolean | undefined;
        draggable?: boolean | undefined;
        /** "default" = strip on top; "aside" = vertical strip on left */
        layout?: "default" | "aside" | undefined;
        /** CSS class(es) for swatch size override (default: "w-9 h-9 sm:w-10 sm:h-10") */
        swatchClass?: string | undefined;
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
    /** Q1 (S.W5): the visibility flip from the card-menu control. */
    setVisibility: [palette: Palette, visibility: "public" | "private"];
    fork: [palette: Palette];
    versions: [palette: Palette];
    flag: [palette: Palette];
    editTags: [palette: Palette];
    export: [palette: Palette, format: string];
}>();

// S.W2 W2-9: a palette with zero colors is a real, reachable state (a
// freshly-created palette before any swatch). This neutral mid-gray is the
// designed empty-state swatch, named rather than an inline magic literal.
const EMPTY_PALETTE_SWATCH = "#888";

const kind = computed<PaletteKind>(() => getPaletteKind(props.palette));
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);

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
    // `rename` opens an inline input — keep the menu open visually until the
    // input takes focus; all other actions close the menu immediately.
    const actions: Record<string, () => void> = {
        copyAll: () => copyToClipboard(props.palette.colors.map((c) => c.css).join(", ")),
        publish: () => emit("publish", props.palette),
        delete: () => emit("delete", props.palette),
        save: () => emit("save", props.palette),
        rename: () => startRenaming(),
        feature: () => emit("feature", props.palette),
        adminDelete: () => emit("adminDelete", props.palette),
        // Q1: the designed visibility flip (owned remote palettes).
        makePublic: () => emit("setVisibility", props.palette, "public"),
        makePrivate: () => emit("setVisibility", props.palette, "private"),
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
    if (!fn) return;
    if (action !== "rename") menuOpen.value = false;
    fn();
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
/* S.W7-7 (god-module census §2.2): the badge's gold text shimmer is the
 * producer's `.gold-shimmer` metal register (see the template class); this
 * scoped block keeps only what the register doesn't own — the outline hue
 * and the icon ink. The local `golden-text-shimmer` keyframe fork is
 * retired onto glass-ui's `metal-shimmer-sweep` (moved, not lost). */
.featured-badge {
    border-color: var(--color-gold);
}
/* Featured-badge icon — selector-stable replacement for the prior
 * `.featured-badge :deep(svg)` reach (D.W4 Lane A §3). The wrapper span
 * carries the `.featured-badge__icon` class; targeting via that wrapper
 * survives lucide-vue API shifts and avoids the deep-piercing.
 * Specificity may shift by 0 or 1 — accepted per the wave-spec drift list. */
.featured-badge__icon svg {
    stroke: var(--color-gold);
    filter: drop-shadow(0 0 1px color-mix(in srgb, var(--color-gold) 40%, transparent));
}

/* vj-morph geometry for the rename unfurl: drops in from above (enter and
 * exit share the -0.5rem offset) with the family height morph. */
.rename-morph {
    --vj-morph-y: -0.5rem;
    --vj-morph-exit-y: -0.5rem;
    --vj-morph-collapse: 0px;
    --vj-morph-expanded: 3rem;
}
</style>
