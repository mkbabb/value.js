<template>
    <!-- X.W7.d2 (COHESION §0bk.1 · W7.md §5.d) — the SELECTED-ENTITY INSPECTOR.
         The props-only `PaletteSpecimen` (strip + name + counts) renders the
         palette's truth; this host owns the entity's verbs — rename, menu,
         feedback, versions, tags, export, publication, vote, feature and
         delete — and the one rail their verdicts render on. When its palette
         is the selected entity (`expanded`), the same verbs are registered as
         the dock's `palette` scene on X-W4's typed `SceneActionSet`.

         W5-a11y: role="article" provides a landmark for each palette; button
         semantics are omitted because inner interactive controls must be
         reachable. The root is the `palette-card` inline-size container the
         meta cluster's declared collapse priority reads (A-20's ruled
         consumer interim). -->
    <div
        class="palette-card group rounded-card shadow-cartoon-md border-card-edge bg-well cursor-pointer"
        :data-layout="layout"
        :data-selected="expanded ? '' : undefined"
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
        <PaletteSpecimen
            :palette="palette"
            :layout="layout"
            :name-yielded="renaming"
        />

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
                        size="sm"
                        aria-label="Palette menu"
                        class="shrink-0"
                        @focus="onMenuFocusReturned"
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
                :swatch-class="swatchClass"
                @popover-open="onPopoverOpenChange"
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
import {
    computed,
    inject,
    onActivated,
    onDeactivated,
    onScopeDispose,
    ref,
    watch,
} from "vue";
import { Button } from "../ui/button";
import { MoreHorizontal, GripVertical } from "@lucide/vue";
import type { Palette, PaletteColor } from "./types";
import { getPaletteKind, type PaletteKind } from "./utils";
import { writeClipboard } from "@mkbabb/glass-ui";
import { useLiquidPress } from "@mkbabb/glass-ui/motion";
import { useSafeAccentFn } from "../color-session/useContrastSafeColor";
import {
    SELECTED_ENTITY_KEY,
    type PaletteSceneTarget,
    type PaletteSceneVerb,
    type SceneCommand,
} from "../color-session/keys";
import { usePaletteExport } from "./usePaletteExport";
import { useHoverPopover } from "./browser/card/composables/useHoverPopover";
import { useHeightTransition } from "./browser/card/composables/useHeightTransition";
import PaletteSpecimen from "./browser/card/PaletteSpecimen.vue";
import PaletteCardMenu from "./browser/card/PaletteCard/PaletteCardMenu.vue";
import PaletteCardMeta from "./browser/card/PaletteCard/PaletteCardMeta.vue";
import PaletteCardSwatches from "./browser/card/PaletteCard/PaletteCardSwatches.vue";
import PaletteRenameInput from "./browser/card/PaletteCard/PaletteRenameInput.vue";
import ActionFeedback from "./browser/card/PaletteCard/ActionFeedback.vue";

const props = withDefaults(
    defineProps<{
        palette: Palette;
        /** The SELECTED entity: its detail band is open and its verbs are the dock's set. */
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

/**
 * The entity's mutations. The HOST owns the port each one reaches (and the
 * dialogs some of them open); the inspector owns the one place they are
 * taken from — its menu, its meta row and the dock's `palette` scene all
 * dispatch the same emit — and the one rail their verdicts render on
 * (`showFeedback`, the `role="status"` `ActionFeedback`). Export and copy are
 * not mutations: the inspector performs them itself and renders their result.
 */
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
    /** Q1 (S.W5): the visibility flip. */
    setVisibility: [palette: Palette, visibility: "public" | "private"];
    fork: [palette: Palette];
    versions: [palette: Palette];
    flag: [palette: Palette];
    editTags: [palette: Palette];
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

const { openIndex: openPopoverIndex, onOpenChange: onPopoverOpenChange } = useHoverPopover();

const menuOpen = ref(false);

// T.W5-R4 — the producer press drive (the shared `press` spring clock, card
// amplitude): its uniform shrink `scale` is the press the card shows; CSS
// :active squash stays the no-JS floor. PRM-instant by construction.
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

// ── Export: performed here, its `failure` rendered here (G7 host) ─────────
//
// `usePaletteExport` resolves every failure — a capture refusal, the PNG
// serializer's contract failure, an unknown format, a thrown platform error —
// into `failure`; the inspector renders it on its own rail, so an export can
// no longer fail anywhere the user cannot see.
const { onExport: exportPalette, failure: exportFailure } = usePaletteExport();

async function exportAs(format: string): Promise<void> {
    const outcome = await exportPalette(props.palette, format);
    if (outcome.ok) showFeedback(`Exported ${outcome.filename}`, "success");
}

watch(exportFailure, (failed) => {
    if (failed !== null) showFeedback(failed.message, "error");
});

const isPublic = computed(() => props.palette.visibility !== "private");

/**
 * The tag editor is a NON-modal popover. Opened synchronously from a menu item,
 * it raced the closing menu's focus return to this trigger and was dismissed
 * as an outside focus — the Edit Tags act intermittently never began
 * (measured: 1 of 3 runs, `w7-inspector-rows › tag`). The menu always hands
 * focus back to its trigger when it closes, so the verb dispatches on THAT
 * event: the popover opens after the menu has finished closing, every time.
 */
let afterMenu: (() => void) | null = null;
function afterMenuFocusReturns(act: () => void): void {
    afterMenu = act;
}
function onMenuFocusReturned(): void {
    const act = afterMenu;
    afterMenu = null;
    act?.();
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
        makePublic: () => emit("setVisibility", props.palette, "public"),
        makePrivate: () => emit("setVisibility", props.palette, "private"),
        fork: () => emit("fork", props.palette),
        versions: () => emit("versions", props.palette),
        flag: () => emit("flag", props.palette),
        editTags: () => afterMenuFocusReturns(() => emit("editTags", props.palette)),
        exportJSON: () => void exportAs("json"),
        exportCSS: () => void exportAs("css"),
        exportTailwind: () => void exportAs("tailwind"),
        exportSVG: () => void exportAs("svg"),
        exportPNG: () => void exportAs("png"),
    };

    const fn = actions[action];
    if (!fn) return;
    if (action !== "rename") menuOpen.value = false;
    fn();
}

// ── The selected entity's verbs, on X-W4's typed `SceneActionSet` ─────────
//
// The gating is the menu's own (`PaletteCardMenu`), stated once for the dock:
// a verb this entity does not offer is ABSENT from the target, so the dock
// never shows a dead seat for it.
function offeredCommands(): { [V in PaletteSceneVerb]?: SceneCommand } {
    const p = props.palette;
    const k = kind.value;
    const owned = props.isOwned === true;
    const remote = k === "remote";
    const commands: { [V in PaletteSceneVerb]?: SceneCommand } = {
        export: () => exportAs("json"),
    };
    if (k === "temporary" || remote) commands.save = () => emit("save", p);
    if (k === "saved") commands.publish = () => emit("publish", p);
    if (!remote || owned) commands.rename = () => startRenaming();
    if (remote && owned) {
        commands.tags = () => emit("editTags", p);
        commands.visibility = () =>
            emit("setVisibility", p, isPublic.value ? "private" : "public");
    }
    if (remote) commands.fork = () => emit("fork", p);
    if (!p.isLocal) commands.vote = () => emit("vote", p);
    if (!p.isLocal && (p.versionCount ?? 0) > 1) {
        commands.versions = () => emit("versions", p);
    }
    if (k === "saved" || (remote && owned)) commands.delete = () => emit("delete", p);
    return commands;
}

const sceneTarget = computed<PaletteSceneTarget>(() => ({
    name: props.palette.name,
    isPublic: isPublic.value,
    voted: props.palette.voted === true,
    commands: offeredCommands(),
}));

// The registry is the shell's (provided beside the dock's action-set
// builder). Outside the shell — a mounted test, the n-fixture harness —
// there is no dock, so there is nothing to register with.
const selectedEntities = inject(SELECTED_ENTITY_KEY, null);
const active = ref(true);
onActivated(() => { active.value = true; });
onDeactivated(() => { active.value = false; });

let registered: PaletteSceneTarget | null = null;
function unregister(): void {
    if (selectedEntities === null || registered === null) return;
    const mine = registered;
    registered = null;
    selectedEntities.value = selectedEntities.value.filter((t) => t !== mine);
}

watch(
    () => (props.expanded === true && active.value ? sceneTarget.value : null),
    (next) => {
        if (selectedEntities === null) return;
        const others = selectedEntities.value.filter((t) => t !== registered);
        registered = next;
        selectedEntities.value = next === null ? others : [...others, next];
    },
    { immediate: true },
);
onScopeDispose(unregister);

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
 * X.W7.c (fold N-11 · PC-21 ≡ PS-23 ≡ PS-32): every copy verb on the
 * inspector (all colours, one colour, the slug) routes here, and the
 * producer's discriminated `CopyResult` reaches the rail (`ActionFeedback`)
 * — never discarded.
 */
async function copyWithVerdict(text: string, what: string): Promise<void> {
    const result = await writeClipboard(text);
    if (result.ok) showFeedback(`Copied ${what}`, "success");
    else showFeedback(`Could not copy ${what}`, "error");
}
</script>


<style scoped>
/* X.W7.c — the inspector ROOT owns its geometry, its cast and its hover register
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
