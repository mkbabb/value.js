<template>
    <DropdownMenu :open="menuOpen" @update:open="$emit('updateOpen', $event)">
        <DropdownMenuTrigger as-child>
            <slot name="trigger" />
        </DropdownMenuTrigger>

        <!-- X.W12U.s2 · UIA-V-112 · V-289 · V-538: the menu sizes to its rows
             under the glass overlay minimum (no fixed w-48 / text-small), in
             the glass item register; the palette's name — printed beside the
             trigger — is not repeated as a truncated display-serif header. -->
        <DropdownMenuContent align="end">

            <!-- Save (temporary + another user's remote). UIA-V-110: an owned
                 remote palette is already the user's — Save made silent duplicate
                 copies, and said the same thing as Remix. -->
            <DropdownMenuItem
                v-if="paletteKind === 'temporary' || (paletteKind === 'remote' && !isOwned)"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'save')"
            >
                <Bookmark class="h-4 w-4 shrink-0" />
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
                <Globe class="h-4 w-4 shrink-0" />
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
                <component :is="isPublic ? EyeOff : Globe" class="h-4 w-4 shrink-0" />
                {{ isPublic ? "Make private" : "Publish" }}
                <DropdownMenuShortcut>{{ apiOffline ? "offline" : isPublic ? "public" : "private" }}</DropdownMenuShortcut>
            </DropdownMenuItem>

            <!-- Fork/remix (remote palettes) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote'"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'fork')"
            >
                <GitFork class="h-4 w-4 shrink-0" />
                Remix
            </DropdownMenuItem>

            <!-- Rename (temporary, saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind !== 'remote' || isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'rename')"
            >
                <Pencil class="h-4 w-4 shrink-0" />
                Rename
            </DropdownMenuItem>

            <!-- Edit Tags (remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'editTags')"
            >
                <Tag class="h-4 w-4 shrink-0" />
                Edit Tags
            </DropdownMenuItem>

            <!-- Version history (remote palettes with versions) -->
            <DropdownMenuItem
                v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'versions')"
            >
                <History class="h-4 w-4 shrink-0" />
                Versions
                <!-- UIA-V-288: the count is the item's trailing shortcut (upright). -->
                <DropdownMenuShortcut>{{ palette.versionCount }}</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <!-- Export. UIA-V-113: on a coarse pointer or a narrow viewport a
                 cascading sub lands on its parent, so the formats are a labelled
                 group in the root menu there; elsewhere they cascade.
                 UIA-V-288: no text-caption on the rows (it is italic). -->
            <DropdownMenuGroup v-if="inlineExport">
                <DropdownMenuLabel>Export</DropdownMenuLabel>
                <template v-for="fmt in EXPORTS" :key="fmt.action">
                    <DropdownMenuSeparator v-if="fmt.rule" />
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', fmt.action)">
                        {{ fmt.label }}
                    </DropdownMenuItem>
                </template>
            </DropdownMenuGroup>
            <DropdownMenuSub v-else>
                <DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
                    <Download class="h-4 w-4 shrink-0" />
                    Export
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <template v-for="fmt in EXPORTS" :key="fmt.action">
                        <DropdownMenuSeparator v-if="fmt.rule" />
                        <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', fmt.action)">
                            {{ fmt.label }}
                        </DropdownMenuItem>
                    </template>
                </DropdownMenuSubContent>
            </DropdownMenuSub>

            <!-- Delete (saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved' || (paletteKind === 'remote' && isOwned)"
                class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                @click="$emit('action', 'delete')"
            >
                <Trash2 class="h-4 w-4 shrink-0" />
                Delete
            </DropdownMenuItem>

            <!-- Report (remote, not owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && !isOwned"
                class="gap-2 cursor-pointer text-muted-foreground"
                @click="$emit('action', 'flag')"
            >
                <Flag class="h-4 w-4 shrink-0" />
                Report
            </DropdownMenuItem>

            <!-- Admin section -->
            <template v-if="isAdmin && paletteKind === 'remote'">
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuItem class="gap-2 cursor-pointer" @click="$emit('action', 'feature')">
                    <Star v-if="palette.tier !== 'featured'" class="h-4 w-4 shrink-0" />
                    <StarOff v-else class="h-4 w-4 shrink-0" />
                    {{ palette.tier === 'featured' ? 'Unfeature' : 'Feature' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                    class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    @click="$emit('action', 'adminDelete')"
                >
                    <Trash2 class="h-4 w-4 shrink-0" />
                    Delete (admin)
                </DropdownMenuItem>
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMediaQuery } from "@vueuse/core";
import type { Palette } from "../../../types";
import type { PaletteKind } from "../../../utils";
import { useApiClient } from "../../../../platform/transport/useApiClient";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
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
} from "@lucide/vue";

const { palette } = defineProps<{
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

/** The export formats, one list for both presentations (UIA-V-113). */
const EXPORTS = [
    { action: "exportJSON", label: "JSON", rule: false },
    { action: "exportCSS", label: "CSS Custom Properties", rule: false },
    { action: "exportTailwind", label: "Tailwind Config", rule: false },
    { action: "exportSVG", label: "SVG Swatch", rule: true },
    { action: "exportPNG", label: "PNG Swatch", rule: false },
] as const;

const inlineExport = useMediaQuery("(pointer: coarse), (max-width: 40rem)");

// Q1: the canonical remote state is `(visibility, tier)` — an absent
// visibility on an in-browse row means public (the browse feed is the
// public wall + your own rows, which always carry the field).
const isPublic = computed(() => palette.visibility !== "private");

defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
</script>
