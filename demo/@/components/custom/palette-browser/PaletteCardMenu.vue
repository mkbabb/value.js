<template>
    <Teleport to="body">
        <div
            v-if="menuOpen"
            class="card-menu-panel"
            :style="menuStyle"
            @pointerenter="$emit('panelEnter')"
            @pointerleave="$emit('panelLeave')"
            @click.stop
        >
            <!-- Full palette name as header -->
            <div class="px-3 py-1.5 fraunces text-sm font-bold text-foreground border-b border-border truncate max-w-[200px]">
                {{ palette.name }}
            </div>

            <button class="card-menu-item" @click="$emit('action', 'apply')">
                <SwatchBook class="w-4 h-4" />
                <span>Apply palette</span>
            </button>
            <button class="card-menu-item" @click="$emit('action', 'copyAll')">
                <Copy class="w-4 h-4" />
                <span>Copy all colors</span>
            </button>

            <template v-if="palette.isLocal">
                <button class="card-menu-item" @click="$emit('action', 'publish')">
                    <Globe class="w-4 h-4" />
                    <span>Publish</span>
                </button>
                <button class="card-menu-item text-destructive" @click="$emit('action', 'delete')">
                    <Trash2 class="w-4 h-4" />
                    <span>Delete</span>
                </button>
            </template>

            <template v-if="!palette.isLocal">
                <button class="card-menu-item" @click="$emit('action', 'save')">
                    <Bookmark class="w-4 h-4" />
                    <span>Save locally</span>
                </button>
            </template>

            <template v-if="!palette.isLocal && isOwned">
                <button class="card-menu-item" @click="$emit('action', 'rename')">
                    <Pencil class="w-4 h-4" />
                    <span>Rename</span>
                </button>
            </template>

            <template v-if="isAdmin && !palette.isLocal">
                <div class="border-t border-border my-0.5"></div>
                <button class="card-menu-item" @click="$emit('action', 'feature')">
                    <Star v-if="palette.status !== 'featured'" class="w-4 h-4" />
                    <StarOff v-else class="w-4 h-4" />
                    <span>{{ palette.status === 'featured' ? 'Unfeature' : 'Feature' }}</span>
                </button>
                <button class="card-menu-item text-destructive" @click="$emit('action', 'adminDelete')">
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

<style scoped>
@reference "../../../styles/style.css";

.card-menu-panel {
    position: fixed;
    z-index: var(--z-overlay);
    display: flex;
    flex-direction: column;
    min-width: 160px;
    border-radius: var(--radius-md);
    border: 1px solid hsl(var(--border));
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    pointer-events: auto;
    animation: card-menu-in var(--duration-fast) ease-out;
    overflow: hidden;
}
.card-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-family: "Fraunces", sans-serif;
    @apply text-sm;
    cursor: pointer;
    transition: background-color 0.15s ease;
    width: 100%;
    text-align: left;
}
.card-menu-item:hover {
    background-color: hsl(var(--accent));
}
@keyframes card-menu-in {
    from {
        opacity: 0;
        filter: blur(4px);
        transform: translateX(-100%) scale(0.96);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateX(-100%) scale(1);
    }
}
</style>
