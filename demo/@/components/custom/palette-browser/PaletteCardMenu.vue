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

            <!-- Publish (saved only) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved'"
                class="gap-2 cursor-pointer"
                @click="$emit('action', 'publish')"
            >
                <Globe class="h-4 w-4" />
                Publish
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
                    <Star v-if="(palette.tier ?? palette.status) !== 'featured'" class="h-4 w-4" />
                    <StarOff v-else class="h-4 w-4" />
                    {{ (palette.tier ?? palette.status) === 'featured' ? 'Unfeature' : 'Feature' }}
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
import type { Palette } from "@lib/palette/types";
import type { PaletteKind } from "@lib/palette/utils";
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
} from "@components/ui/dropdown-menu";
import {
    Trash2,
    Globe,
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

defineProps<{
    palette: Palette;
    paletteKind: PaletteKind;
    menuOpen: boolean;
    isOwned?: boolean | undefined;
    isAdmin?: boolean | undefined;
}>();

defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
</script>
