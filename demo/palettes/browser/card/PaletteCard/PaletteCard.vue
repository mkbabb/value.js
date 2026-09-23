<template>
    <!-- W5-a11y: role="article" provides a landmark for each palette; button semantics on the card
         are omitted because inner interactive controls must be reachable — using article + click is
         the correct pattern for a card container that also houses nested interactive elements. -->
    <!-- X.W7.c: the card is a HOST around the props-only `PaletteSpecimen`
         (strip + name + counts). The root is a grid whose areas the specimen's
         two parts (`display: contents`) and the card's own controls fill, so the
         specimen subtree holds no control and the row still reads as one line.
         The root is the `palette-card` inline-size container the meta cluster's
         declared collapse priority reads (A-20's ruled consumer interim). -->
    <div
        class="palette-card group rounded-card shadow-cartoon-md border-card-edge bg-well cursor-pointer"
        :data-layout="layout"
        role="article"
        :aria-label="`Palette: ${palette.name}`"
        v-bind="press.handlers"
        :style="press.pressStyle.value"
        @click="$emit('click')"
    >
        <!-- X.W7.c (G11): the cel cast is the ROOT's own box-shadow — the
             producer's `.shadow-cartoon-md` stamp (below) — so it follows the
             card's rounded silhouette by construction. The retired
             `<span class="cartoon-cast">` matched no served rule: glass-ui 7
             ships `.cartoon-cast` only in `dist/styles/glass/glass-atom.css`,
             which neither the `./styles` entry nor the exports map reaches. -->
        <PaletteSpecimen :palette="palette" :layout="layout" />

        <!-- Drag handle. T.W6.5 row 8 (F-4 sweep): the muted token is the
             de-emphasis rung. -->
        <GripVertical
            v-if="draggable"
            class="palette-card__grip drag-handle w-4 h-4 text-muted-foreground shrink-0 cursor-grab active:cursor-grabbing"
        />

        <!-- Tag chips (+N) and the vote control — the card's, not the specimen's. -->
        <PaletteCardMeta :palette="palette" @vote="emit('vote', $event)" />

        <!-- Dropdown menu -->
        <div class="palette-card__menu flex items-center gap-1" @click.stop>
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
                    <!-- S.W5-4: the glass-ui atom; the sm square cures the
                         ~24px touch target. -->
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

        <!-- The detail band: rename, feedback, and the expandable swatches. -->
        <div class="palette-card__detail">

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
                @copy-slug="(slug) => copyWithVerdict(slug, slug)"
            />
        </Transition>
        </div><!-- /detail band -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "../../../../ui/button";
import { MoreHorizontal, GripVertical } from "@lucide/vue";
import type { Palette, PaletteColor } from "../../../types";
import { getPaletteKind, type PaletteKind } from "../../../utils";
import { writeClipboard } from "@mkbabb/glass-ui";
import { useLiquidPress } from "@mkbabb/glass-ui/motion";
import { useSafeAccentFn } from "../../../../color-session/useContrastSafeColor";
import { useHoverPopover } from "../composables/useHoverPopover";
import { useHeightTransition } from "../composables/useHeightTransition";
import PaletteSpecimen from "../PaletteSpecimen.vue";
import PaletteCardMenu from "./PaletteCardMenu.vue";
import PaletteCardMeta from "./PaletteCardMeta.vue";
import PaletteCardSwatches from "./PaletteCardSwatches.vue";
import PaletteRenameInput from "./PaletteRenameInput.vue";
import ActionFeedback from "./ActionFeedback.vue";

const props = withDefaults(
    defineProps<{
        palette: Palette;
        expanded?: boolean | undefined;
        cssColor?: string | undefined;
        isOwned?: boolean | undefined;
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

// D6 (T.W3-5): the card IS the rung-2 WELL (Q4) — ink certifies on THAT tier.
const { safeCss } = useSafeAccentFn("well");
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

// T.W5-R4 — the producer press drive (the shared `press` spring clock, card
// amplitude): its uniform shrink `scale` is the press the card shows; CSS
// :active squash stays the no-JS floor. PRM-instant by construction.
// X.W7.c (fold N-12 · PC-4 ≡ PP-12 ≡ PG-17): the retired
// `pressVar: "--card-press-t"` had no reader anywhere (the cast it was meant
// for read `--cartoon-press-t`, and that cast is not served — see the
// template); the composable's default drive name is left to the producer.
const press = useLiquidPress({
    shrinkDepth: 0.02,
    maxStretch: 1.03,
});

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
        copyAll: () => void copyWithVerdict(props.palette.colors.map((c) => c.css).join(", "), "colors"),
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
    void copyWithVerdict(css, css);
}

/**
 * X.W7.c (fold N-11 · PC-21 ≡ PS-23 ≡ PS-32): every copy verb on the card
 * (all colours, one colour, the slug) routes here, and the producer's
 * discriminated `CopyResult` reaches the card's own verdict surface
 * (`ActionFeedback`) — never discarded.
 */
async function copyWithVerdict(text: string, what: string): Promise<void> {
    const result = await writeClipboard(text);
    if (result.ok) showFeedback(`Copied ${what}`, "success");
    else showFeedback(`Could not copy ${what}`, "error");
}
</script>

<style scoped>
/* X.W7.c — the card ROOT owns its geometry, its cast and its hover register
 * (root-styling law: no consumer passes a shadow or hover override).
 *
 * Layout: a grid whose areas the specimen's strip + head (`display: contents`)
 * and the card's own grip / meta / menu / detail fill — one visual row, two
 * owners. The root is also the `palette-card` inline-size container: the
 * card's width never follows its content (G9), and the meta cluster's
 * declared collapse priority reads it. */
.palette-card {
    position: relative;
    isolation: isolate;
    container: palette-card / inline-size;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-areas:
        "strip strip strip strip"
        "grip head meta menu"
        "detail detail detail detail";
    align-items: center;
    transition:
        translate var(--duration-fast) var(--ease-cartoon-punch),
        box-shadow var(--duration-fast) var(--ease-cartoon-punch);
    /* The strip sits INSIDE the stamp's 2px edge: its corners take the inner
     * radius, so no band pokes past the rounded silhouette (OM-11/OM-12). */
    --specimen-radius: calc(var(--radius-card) - 2px);
}
.palette-card[data-layout="aside"] {
    grid-template-columns: auto auto minmax(0, 1fr) auto auto;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "strip grip head meta menu"
        "strip detail detail detail detail";
}
.palette-card__grip {
    grid-area: grip;
    margin-inline: 0.75rem -0.25rem;
}
.palette-card__menu {
    grid-area: menu;
    margin-inline: 0.5rem 0.75rem;
}
.palette-card__detail {
    grid-area: detail;
    min-inline-size: 0;
}

/* The hover register (G11 · PC-4): a designed ELEVATION shift on the
 * producer's own cartoon ladder — the card rises one step (`translate` 0 -2px)
 * and its cel cast deepens md → lg (`--shadow-cartoon-lg`), exactly the
 * `.shadow-cartoon-lg` rung (the `hover:` variant of a components-layer class
 * generates no rule — SFB-5 — so the rung is composed here, at the root).
 * Hover-capable pointers only; reduced motion keeps the state, drops the
 * travel. */
@media (hover: hover) {
    .palette-card:hover {
        translate: 0 -2px;
        box-shadow: var(--shadow-cartoon-lg);
    }
}
@media (prefers-reduced-motion: reduce) {
    .palette-card {
        transition: none;
    }
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
