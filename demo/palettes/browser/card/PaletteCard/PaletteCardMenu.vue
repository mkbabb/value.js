<template>
    <DropdownMenu :open="menuOpen" @update:open="$emit('updateOpen', $event)">
        <DropdownMenuTrigger as-child>
            <slot name="trigger" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-48 text-small">
            <!-- Header: palette name -->
            <DropdownMenuLabel class="font-display font-bold truncate max-w-[180px]">
                {{ palette.name }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <!-- Save (temporary + remote) -->
            <DropdownMenuItem
                v-if="paletteKind === 'temporary' || paletteKind === 'remote'"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'save')"
            >
                <Bookmark class="h-4 w-4" />
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
                <Globe class="h-4 w-4" />
                Publish
                <span
                    v-if="apiOffline"
                    class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"
                    style="font-variant: small-caps"
                >offline</span>
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
                <component :is="isPublic ? EyeOff : Globe" class="h-4 w-4" />
                {{ isPublic ? "Make private" : "Publish" }}
                <span
                    class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"
                    style="font-variant: small-caps"
                >{{ apiOffline ? "offline" : isPublic ? "public" : "private" }}</span>
            </DropdownMenuItem>

            <!-- Fork/remix (remote palettes) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote'"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'fork')"
            >
                <GitFork class="h-4 w-4" />
                Remix
            </DropdownMenuItem>

            <!-- Rename (temporary, saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind !== 'remote' || isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'rename')"
            >
                <Pencil class="h-4 w-4" />
                Rename
            </DropdownMenuItem>

            <!-- Edit Tags (remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && isOwned"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'editTags')"
            >
                <Tag class="h-4 w-4" />
                Edit Tags
            </DropdownMenuItem>

            <!-- Version history (remote palettes with versions) -->
            <DropdownMenuItem
                v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'versions')"
            >
                <History class="h-4 w-4" />
                Versions
                <!-- inline count: dropdown-item sidebar count, not a heading-level count indicator; kept as caption span per exception -->
                <span class="ml-auto text-caption text-muted-foreground">{{ palette.versionCount }}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <!-- Export sub-menu -->
            <DropdownMenuSub>
                <DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
                    <Download class="h-4 w-4" />
                    Export
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent class="text-caption">
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportJSON')">
                        JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportCSS')">
                        CSS Custom Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportTailwind')">
                        Tailwind Config
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportSVG')">
                        SVG Swatch
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer" @select="() => $emit('action', 'exportPNG')">
                        PNG Swatch
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>

            <!-- Delete (saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved' || (paletteKind === 'remote' && isOwned)"
                class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                @click="$emit('action', 'delete')"
            >
                <Trash2 class="h-4 w-4" />
                Delete
            </DropdownMenuItem>

            <!-- Report (remote, not owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && !isOwned"
                class="gap-2 cursor-pointer text-muted-foreground"
                @click="$emit('action', 'flag')"
            >
                <Flag class="h-4 w-4" />
                Report
            </DropdownMenuItem>

            <!-- Admin section -->
            <template v-if="isAdmin && paletteKind === 'remote'">
                <DropdownMenuSeparator />
                <DropdownMenuLabel class="text-mono-caption uppercase tracking-wider text-muted-foreground">
                    Admin
                </DropdownMenuLabel>
                <DropdownMenuItem class="gap-2 cursor-pointer" @click="$emit('action', 'feature')">
                    <Star v-if="palette.tier !== 'featured'" class="h-4 w-4" />
                    <StarOff v-else class="h-4 w-4" />
                    {{ palette.tier === 'featured' ? 'Unfeature' : 'Feature' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                    class="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    @click="$emit('action', 'adminDelete')"
                >
                    <Trash2 class="h-4 w-4" />
                    Delete (admin)
                </DropdownMenuItem>
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Palette } from "../../../types";
import type { PaletteKind } from "../../../utils";
import { useApiClient } from "../../../../platform/transport/useApiClient";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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

// Q1: the canonical remote state is `(visibility, tier)` — an absent
// visibility on an in-browse row means public (the browse feed is the
// public wall + your own rows, which always carry the field).
const isPublic = computed(() => palette.visibility !== "private");

defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
</script>
