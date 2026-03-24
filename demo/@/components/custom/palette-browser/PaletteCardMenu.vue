<template>
    <Teleport to="body">
        <div
            v-if="menuOpen"
            class="floating-panel card-menu-panel flex flex-col min-w-[160px] overflow-hidden"
            :style="{ ...menuStyle, transform: 'translateX(-100%)' }"
            @pointerenter="$emit('panelEnter')"
            @pointerleave="$emit('panelLeave')"
            @click.stop
        >
            <!-- Full palette name as header -->
            <div class="px-3 py-1.5 fraunces text-sm font-bold text-foreground border-b border-border/50 truncate max-w-[200px]">
                {{ palette.name }}
            </div>

            <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'apply')">
                <SwatchBook class="w-4 h-4" />
                <span>Apply palette</span>
            </button>
            <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'copyAll')">
                <Copy class="w-4 h-4" />
                <span>Copy all colors</span>
            </button>

            <template v-if="palette.isLocal">
                <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'publish')">
                    <Globe class="w-4 h-4" />
                    <span>Publish</span>
                </button>
                <button class="floating-panel-item px-3 py-2 fraunces text-sm text-destructive" @click="$emit('action', 'delete')">
                    <Trash2 class="w-4 h-4" />
                    <span>Delete</span>
                </button>
            </template>

            <template v-if="!palette.isLocal">
                <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'save')">
                    <Bookmark class="w-4 h-4" />
                    <span>Save locally</span>
                </button>
            </template>

            <template v-if="!palette.isLocal && isOwned">
                <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'rename')">
                    <Pencil class="w-4 h-4" />
                    <span>Rename</span>
                </button>
            </template>

            <template v-if="isAdmin && !palette.isLocal">
                <div class="border-t border-border my-0.5"></div>
                <button class="floating-panel-item px-3 py-2 fraunces text-sm" @click="$emit('action', 'feature')">
                    <Star v-if="palette.status !== 'featured'" class="w-4 h-4" />
                    <StarOff v-else class="w-4 h-4" />
                    <span>{{ palette.status === 'featured' ? 'Unfeature' : 'Feature' }}</span>
                </button>
                <button class="floating-panel-item px-3 py-2 fraunces text-sm text-destructive" @click="$emit('action', 'adminDelete')">
                    <Trash2 class="w-4 h-4" />
                    <span>Delete</span>
                </button>
            </template>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { Palette } from "@lib/palette/types";
import {
    SwatchBook,
    Copy,
    Trash2,
    Globe,
    Bookmark,
    Pencil,
    Star,
    StarOff,
} from "lucide-vue-next";

defineProps<{
    palette: Palette;
    menuOpen: boolean;
    menuStyle: Record<string, string>;
    isOwned?: boolean;
    isAdmin?: boolean;
}>();

defineEmits<{
    action: [action: string];
    panelEnter: [];
    panelLeave: [];
}>();
</script>

<style>
/* Card menu panel uses .floating-panel (global) — only override the animation for translateX offset */
.card-menu-panel {
    animation: card-menu-in var(--duration-fast) ease-out;
}
</style>
