<template>
    <DropdownMenu :open="menuOpen" @update:open="$emit('updateOpen', $event)">
        <DropdownMenuTrigger as-child>
            <slot name="trigger" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-48 text-sm">
            <!-- Header: palette name -->
            <DropdownMenuLabel class="font-display font-bold truncate max-w-[180px]">
                {{ palette.name }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <!-- Save (temporary + remote) -->
            <DropdownMenuItem
                v-if="paletteKind === 'temporary' || paletteKind === 'remote'"
                @click="$emit('action', 'save')"
            >
                <Bookmark class="mr-2 h-4 w-4" />
                Save
            </DropdownMenuItem>

            <!-- Publish (saved only) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved'"
                @click="$emit('action', 'publish')"
            >
                <Globe class="mr-2 h-4 w-4" />
                Publish
            </DropdownMenuItem>

            <!-- Fork/remix (remote palettes) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote'"
                @click="$emit('action', 'fork')"
            >
                <GitFork class="mr-2 h-4 w-4" />
                Remix
            </DropdownMenuItem>

            <!-- Rename (temporary, saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind !== 'remote' || isOwned"
                @click="$emit('action', 'rename')"
            >
                <Pencil class="mr-2 h-4 w-4" />
                Rename
            </DropdownMenuItem>

            <!-- Edit Tags (remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && isOwned"
                @click="$emit('action', 'editTags')"
            >
                <Tag class="mr-2 h-4 w-4" />
                Edit Tags
            </DropdownMenuItem>

            <!-- Version history (remote palettes with versions) -->
            <DropdownMenuItem
                v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
                @click="$emit('action', 'versions')"
            >
                <History class="mr-2 h-4 w-4" />
                Versions
                <span class="ml-auto text-caption text-muted-foreground">{{ palette.versionCount }}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <!-- Export sub-menu -->
            <DropdownMenuSub>
                <DropdownMenuSubTrigger @click.prevent>
                    <Download class="mr-2 h-4 w-4" />
                    Export
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent class="text-xs">
                    <DropdownMenuItem @select="() => $emit('action', 'exportJSON')">
                        JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="() => $emit('action', 'exportCSS')">
                        CSS Custom Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="() => $emit('action', 'exportTailwind')">
                        Tailwind Config
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @select="() => $emit('action', 'exportSVG')">
                        SVG Swatch
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="() => $emit('action', 'exportPNG')">
                        PNG Swatch
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>

            <!-- Delete (saved, or remote+owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'saved' || (paletteKind === 'remote' && isOwned)"
                class="text-destructive focus:text-destructive"
                @click="$emit('action', 'delete')"
            >
                <Trash2 class="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>

            <!-- Report (remote, not owned) -->
            <DropdownMenuItem
                v-if="paletteKind === 'remote' && !isOwned"
                class="text-muted-foreground"
                @click="$emit('action', 'flag')"
            >
                <Flag class="mr-2 h-4 w-4" />
                Report
            </DropdownMenuItem>

            <!-- Admin section -->
            <template v-if="isAdmin && paletteKind === 'remote'">
                <DropdownMenuSeparator />
                <DropdownMenuLabel class="text-mono-caption uppercase tracking-wider text-muted-foreground">
                    Admin
                </DropdownMenuLabel>
                <DropdownMenuItem @click="$emit('action', 'feature')">
                    <Star v-if="palette.status !== 'featured'" class="mr-2 h-4 w-4" />
                    <StarOff v-else class="mr-2 h-4 w-4" />
                    {{ palette.status === 'featured' ? 'Unfeature' : 'Feature' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                    class="text-destructive focus:text-destructive"
                    @click="$emit('action', 'adminDelete')"
                >
                    <Trash2 class="mr-2 h-4 w-4" />
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
} from "lucide-vue-next";

defineProps<{
    palette: Palette;
    paletteKind: PaletteKind;
    menuOpen: boolean;
    isOwned?: boolean;
    isAdmin?: boolean;
}>();

defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
</script>
