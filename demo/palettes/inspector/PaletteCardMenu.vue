<template>
    <DropdownMenu :open="menuOpen" @update:open="$emit('updateOpen', $event)">
        <DropdownMenuTrigger as-child>
            <slot name="trigger" />
        </DropdownMenuTrigger>

        <!-- X.W12U.s2 · UIA-V-112 · V-289 · V-538: the menu sizes to its rows
             under the glass overlay minimum (no fixed w-48 / text-small), in
             the glass item register; the palette's name — printed beside the
             trigger — is not repeated as a truncated display-serif header. -->
        <!-- color-40 O-4 (his FORTIETH order: "the three dots options should
             have more icons, like for json, export should be a dropdown menu
             within a menu"): every row leads with its glyph in one column, 20 px
             beside 16 px labels (his FORTY-SECOND order, A: the label is glass's
             own menu token, `--dropdown-text`, at 1rem or glass's rung where
             that is larger). On a desk Export is
             glass's cascade; on a phone its formats take the root's place in
             the same plate, a back row first (`page`). -->
        <DropdownMenuContent align="end" class="[--dropdown-text:max(1rem,var(--type-small))]">
            <div
                ref="pager"
                class="menu-pager"
                :data-page="page"
            >
            <div
                v-if="page === 'root' || leaving === 'root'"
                ref="rootPage"
                class="menu-page"
                data-page-id="root"
                :inert="page !== 'root' || undefined"
            >

            <!-- Save (temporary + another user's remote). UIA-V-110: an owned
                 remote palette is already the user's — Save made silent duplicate
                 copies, and said the same thing as Remix. -->
            <DropdownMenuItem
                v-if="paletteKind === 'temporary' || (paletteKind === 'remote' && !isOwned)"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'save')"
            >
                <Bookmark class="size-5 shrink-0" />
                Save
            </DropdownMenuItem>

            <!-- Publish (saved only). K-INV5: a tripped availability latch
                 disables the doomed action and NAMES the degraded state
                 in-register (small-caps annotation, not a toast). -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved'"
                class="gap-2 cursor-pointer"
                :disabled="apiOffline"
                @click="$emit('action', 'publish')"
            >
                <Globe class="size-5 shrink-0" />
                Publish
                <DropdownMenuShortcut v-if="apiOffline">offline</DropdownMenuShortcut>
            </DropdownMenuItem>

            <!-- S.W5 · Q1 (RATIFIED WIRE, full-idiomatic): the VISIBILITY
                 control as a designed surface — one verb item naming the
                 flip, with the CURRENT state annotated in the K-INV5
                 small-caps register (never a checkbox bolt-on). Owned
                 remote palettes only; the doomed action disables + names
                 the degraded state when the backend is down. -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && isOwned"
                class="gap-2 cursor-pointer"
                :disabled="apiOffline"
                @click="$emit('action', isPublic ? 'makePrivate' : 'makePublic')"
            >
                <component :is="isPublic ? EyeOff : Globe" class="size-5 shrink-0" />
                {{ isPublic ? "Make private" : "Publish" }}
                <DropdownMenuShortcut>{{ apiOffline ? "offline" : isPublic ? "public" : "private" }}</DropdownMenuShortcut>
            </DropdownMenuItem>

            <!-- Fork/remix (remote palettes) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote'"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'fork')"
            >
                <GitFork class="size-5 shrink-0" />
                Remix
            </DropdownMenuItem>

            <!-- Rename (temporary, saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind !== 'remote' || isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'rename')"
            >
                <Pencil class="size-5 shrink-0" />
                Rename
            </DropdownMenuItem>

            <!-- color-40 O-4: the card's copy-all action, which had no row. -->
            <DropdownMenuItem class="gap-2 cursor-pointer" @click="$emit('action', 'copyAll')">
                <Copy class="size-5 shrink-0" />
                Copy colors
            </DropdownMenuItem>

            <!-- Edit Tags (remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'editTags')"
            >
                <Tag class="size-5 shrink-0" />
                Edit Tags
            </DropdownMenuItem>

            <!-- Version history (remote palettes with versions) -->
            <DropdownMenuItem
                v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'versions')"
            >
                <History class="size-5 shrink-0" />
                Versions
                <!-- UIA-V-288: the count is the item's trailing shortcut (upright). -->
                <DropdownMenuShortcut>{{ palette.versionCount }}</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <!-- Export. UIA-V-113: on a coarse pointer or a narrow viewport a
                 cascading sub lands on its parent, so there (`inlineExport`) the
                 row opens the formats in the menu's own plate (color-40 O-4);
                 elsewhere they cascade. -->
            <DropdownMenuItem
                v-if="inlineExport"
                data-export-row
                class="gap-2 cursor-pointer"
                aria-haspopup="menu"
                @select.prevent="go('export')"
            >
                <Download class="size-5 shrink-0" />
                Export
                <ChevronRight class="size-5 shrink-0 ms-auto text-muted-foreground" aria-hidden="true" />
            </DropdownMenuItem>
            <DropdownMenuSub v-else>
                <DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
                    <Download class="size-5 shrink-0" />
                    Export
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent class="[--dropdown-text:max(1rem,var(--type-small))]">
                    <ExportRows />
                </DropdownMenuSubContent>
            </DropdownMenuSub>

            <!-- Delete (saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved' || (paletteKind === 'remote' && isOwned)"
                class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                @click="$emit('action', 'delete')"
            >
                <Trash2 class="size-5 shrink-0" />
                Delete
            </DropdownMenuItem>

            <!-- Report (remote, not owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && !isOwned"
                class="gap-2 cursor-pointer text-muted-foreground"
                @click="$emit('action', 'flag')"
            >
                <Flag class="size-5 shrink-0" />
                Report
            </DropdownMenuItem>

            <!-- Admin section -->
            <template v-if="isAdmin && paletteKind === 'remote'">
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuItem class="gap-2 cursor-pointer" @click="$emit('action', 'feature')">
                    <Star v-if="palette.tier !== 'featured'" class="size-5 shrink-0" />
                    <StarOff v-else class="size-5 shrink-0" />
                    {{ palette.tier === 'featured' ? 'Unfeature' : 'Feature' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                    class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    @click="$emit('action', 'adminDelete')"
                >
                    <Trash2 class="size-5 shrink-0" />
                    Delete (admin)
                </DropdownMenuItem>
            </template>
            </div><!-- /root page -->

            <!-- The formats' page (a phone): its first row names the submenu and
                 goes back. -->
            <div
                v-if="page === 'export' || leaving === 'export'"
                ref="exportPage"
                class="menu-page"
                data-page-id="export"
                :inert="page !== 'export' || undefined"
                @keydown.left.prevent="go('root')"
            >
                <DropdownMenuItem data-back-row class="gap-2 cursor-pointer" @select.prevent="go('root')">
                    <ChevronLeft class="size-5 shrink-0" aria-hidden="true" />
                    Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <ExportRows />
            </div>
            </div><!-- /pager -->
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { computed, h, nextTick, onDeactivated, ref, useTemplateRef, watch, type FunctionalComponent } from "vue";
import { useMediaQuery } from "@vueuse/core";
import type { Palette } from "../types";
import type { PaletteKind } from "../utils";
import { useApiClient } from "../../platform/transport/useApiClient";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@mkbabb/glass-ui/menu";
import {
    Trash2,
    Globe,
    EyeOff,
    Bookmark,
    Pencil,
    Star,
    StarOff,
    GitFork,
    History,
    Download,
    Flag,
    Tag,
    Braces,
    Variable,
    Wind,
    PenTool,
    Image as ImageIcon,
    Copy,
    ChevronLeft,
    ChevronRight,
} from "@lucide/vue";

const { palette, menuOpen } = defineProps<{
    palette: Palette;
    paletteKind: PaletteKind;
    menuOpen: boolean;
    isOwned?: boolean | undefined;
    isAdmin?: boolean | undefined;
}>();

// K-INV5: the publish action reads the availability latch — through the
// injected api-client seam (S.W2 W2-4), not a hard module-singleton import.
const { availability } = useApiClient();
const apiOffline = computed(() => availability.value === "unavailable");

/** The export formats, one list for both presentations (UIA-V-113), each
 *  with its glyph (color-40 O-4). */
const EXPORTS = [
    { action: "exportJSON", label: "JSON", icon: Braces, rule: false },
    { action: "exportCSS", label: "CSS Custom Properties", icon: Variable, rule: false },
    { action: "exportTailwind", label: "Tailwind Config", icon: Wind, rule: false },
    { action: "exportSVG", label: "SVG Swatch", icon: PenTool, rule: true },
    { action: "exportPNG", label: "PNG Swatch", icon: ImageIcon, rule: false },
] as const;

/** The format rows, one list for the cascade and the phone's page. */
const ExportRows: FunctionalComponent = () =>
    EXPORTS.flatMap((fmt) => [
        ...(fmt.rule ? [h(DropdownMenuSeparator, { key: `${fmt.action}-rule` })] : []),
        h(
            DropdownMenuItem,
            { key: fmt.action, class: "gap-2 cursor-pointer", onSelect: () => emit("action", fmt.action) },
            { default: () => [h(fmt.icon, { class: "size-5 shrink-0", "aria-hidden": "true" }), fmt.label] },
        ),
    ]);

const inlineExport = useMediaQuery("(pointer: coarse), (max-width: 40rem)");
const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

/*
 * The phone's two pages in one plate. On a swap both pages are mounted for
 * its length (the leaving one inert and out of flow), the plate's block size
 * travels from the leaving page's to the arriving page's, and the pages cross
 * over; then the leaving page unmounts, so the menu's keyboard walk sees one
 * page's rows. Driven through the Web Animations API, so reduced motion (where
 * the CSS transitions are zeroed) keeps a fade rather than a cut: there the
 * pages fade without travel.
 */
type Page = "root" | "export";
const page = ref<Page>("root");
const leaving = ref<Page | null>(null);
const pager = useTemplateRef<HTMLElement>("pager");
const rootPage = useTemplateRef<HTMLElement>("rootPage");
const exportPage = useTemplateRef<HTMLElement>("exportPage");
const SWAP_MS = 210;
const FADE_MS = 160;
let swap: Animation[] = [];

async function go(next: Page) {
    if (next === page.value) return;
    for (const a of swap) a.cancel();
    const from = pager.value?.offsetHeight ?? 0;
    leaving.value = page.value;
    page.value = next;
    await nextTick();
    const host = pager.value;
    const arriving = next === "root" ? rootPage.value : exportPage.value;
    const departing = next === "root" ? exportPage.value : rootPage.value;
    if (!host || !arriving) {
        leaving.value = null;
        return;
    }
    // The keyboard follows the swap: back on the Export row, or into the formats.
    const focusTarget =
        next === "root"
            ? arriving.querySelector<HTMLElement>("[data-export-row]")
            : arriving.querySelector<HTMLElement>('[role="menuitem"]:not([data-back-row])');
    focusTarget?.focus({ preventScroll: true });
    const to = host.offsetHeight;
    const still = reducedMotion.value;
    const ms = still ? FADE_MS : SWAP_MS;
    const ease = "cubic-bezier(0.2, 0, 0, 1)";
    const shift = next === "export" ? 1 : -1;
    swap = [
        host.animate([{ blockSize: `${from}px` }, { blockSize: `${to}px` }], { duration: ms, easing: ease }),
        arriving.animate(
            still
                ? [{ opacity: 0 }, { opacity: 1 }]
                : [
                      { opacity: 0, translate: `${1.5 * shift}rem 0` },
                      { opacity: 1, translate: "0 0" },
                  ],
            { duration: ms, easing: ease },
        ),
    ];
    if (departing) {
        swap.push(
            departing.animate(
                still
                    ? [{ opacity: 1 }, { opacity: 0 }]
                    : [
                          { opacity: 1, translate: "0 0" },
                          { opacity: 0, translate: `${-1.5 * shift}rem 0` },
                      ],
                { duration: ms, easing: ease },
            ),
        );
    }
    const done = swap;
    await Promise.allSettled(done.map((a) => a.finished));
    if (swap === done) leaving.value = null;
}

// Q1: the canonical remote state is `(visibility, tier)` — an absent
// visibility on an in-browse row means public (the browse feed is the
// public wall + your own rows, which always carry the field).
const isPublic = computed(() => palette.visibility !== "private");

const emit = defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();

// Every open starts on the root page.
watch(
    () => menuOpen,
    (open) => {
        if (!open) return;
        for (const a of swap) a.cancel();
        swap = [];
        page.value = "root";
        leaving.value = null;
    },
);

// A2-VA-L2-11 — a popup never outlives its pane (shell/usePanePopups.ts): close on deactivate.
onDeactivated(() => {
    if (menuOpen) emit("updateOpen", false);
});
</script>

<style scoped>
/* The phone's two pages share one cell; the leaving page is out of flow, so the
 * plate is the arriving page's size once the swap ends. */
.menu-pager {
    position: relative;
    display: grid;
    overflow: clip;
}
.menu-page {
    grid-area: 1 / 1;
    min-inline-size: 0;
}
.menu-page[inert] {
    position: absolute;
    inset-block-start: 0;
    inset-inline: 0;
    opacity: 0;
    pointer-events: none;
}
</style>
