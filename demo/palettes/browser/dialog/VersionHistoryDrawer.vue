<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)">
        <SheetContent side="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
            <DialogHeader class="shrink-0">
                <!-- T.W4-6 (T-15/F7): the producer DialogTitle default is the
                     body-voice `text-subheading` — drawer headers join the
                     display voice (≤500 non-bold), same register as the
                     dialog headers. Glass 8 folded the side placement into
                     `<SheetContent side>` (the Drawer/Sheet fold). -->
                <DialogTitle class="font-display font-medium">Version History</DialogTitle>
                <DialogDescription>
                    {{ paletteName }} &mdash; {{ total }} version{{ total === 1 ? "" : "s" }}
                </DialogDescription>
            </DialogHeader>

            <div class="mt-4 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
                <!-- Loading -->
                <div v-if="loading" class="flex items-center justify-center py-8">
                    <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
                </div>

                <!-- Versions -->
                <div
                    v-for="(version, i) in versions"
                    :key="version.hash"
                    class="group relative rounded-lg border border-border bg-well p-3 transition-colors hover:bg-accent/50"
                    :class="{ 'ring-2 ring-primary': isCurrent(version) }"
                >
                    <!-- Current indicator -->
                    <div
                        v-if="isCurrent(version)"
                        class="absolute -left-px top-3 h-4 w-1 rounded-r bg-primary"
                    />

                    <!-- Header: version number + timestamp -->
                    <div class="flex items-center justify-between">
                        <span class="text-micro font-medium">
                            v{{ total - i }}
                            <span v-if="isCurrent(version)" class="ml-1 text-primary">(current)</span>
                        </span>
                        <span class="text-micro text-muted-foreground tabular-nums">
                            {{ formatTime(version.createdAt) }}
                        </span>
                    </div>

                    <!-- Name (if different from current) -->
                    <div class="mt-1 text-micro text-muted-foreground truncate">
                        {{ version.name }}
                    </div>

                    <!-- Color swatches -->
                    <div class="mt-2 flex -space-x-0.5">
                        <div
                            v-for="(c, ci) in version.colors.slice(0, 8)"
                            :key="ci"
                            class="h-5 w-5 rounded-full border border-background"
                            :style="{ backgroundColor: c.css }"
                        />
                        <span
                            v-if="version.colors.length > 8"
                            class="flex h-5 items-center px-1 text-micro text-muted-foreground"
                        >
                            +{{ version.colors.length - 8 }}
                        </span>
                    </div>

                    <!-- Fork indicator -->
                    <div
                        v-if="version.forkedFromHash"
                        class="mt-1 text-micro text-muted-foreground"
                    >
                        Forked from {{ version.forkedFromHash.slice(0, 8) }}...
                    </div>

                    <!-- Revert button (hidden for current version) -->
                    <!-- X.W12.u1 (UIA-V-37): Revert is revealed on hover only where a
                         fine pointer can hover; on touch it is always shown, so it is
                         never an invisible hit target. Keyboard focus reveals it too. -->
                    <Button
                        v-if="!isCurrent(version)"
                        emphasis="secondary"
                        size="xs"
                        class="mt-2 transition-opacity pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 focus-visible:opacity-100"
                        @click="$emit('revert', version.hash)"
                    >
                        <RotateCcw class="mr-1 h-3 w-3" />
                        Revert
                    </Button>
                </div>

                <!-- Load more -->
                <Button
                    v-if="versions.length < total"
                    emphasis="quiet"
                    size="sm"
                    class="self-center"
                    :disabled="loading"
                    @click="loadMore"
                >
                    Load older versions
                </Button>
            </div>
        </SheetContent>
    </Dialog>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { SheetContent } from "@mkbabb/glass-ui/sheet";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Loader2, RotateCcw } from "@lucide/vue";
import { formatTime } from "../dateFormat";
import { BROWSE_PORT_KEY } from "../../usePalettePorts";
import type { PaletteVersion } from "../../types";

const { open, paletteSlug, paletteName, currentHash } = defineProps<{
    open: boolean;
    paletteSlug: string;
    paletteName: string;
    currentHash: string | null;
}>();

const emit = defineEmits<{
    "update:open": [value: boolean];
    revert: [hash: string];
    /** X.W7.z1 (COHESION §0bt.1): a failed page load, handed to the host's rail. */
    "load-failed": [message: string];
}>();

// X.W12.u1 (UIA-V-36): the list's `hash` is the release id, while the palette's
// `currentHash` is the payload hash — the live row is the one whose CONTENT matches.
function isCurrent(version: PaletteVersion): boolean {
    return !!currentHash && version.payloadHash === currentHash;
}

// D.W3 Lane B: route the api call through pm.versions, keep per-drawer local
// list (each drawer instance owns its display state).
const pm = inject(BROWSE_PORT_KEY)!;
const versions = ref<PaletteVersion[]>([]);
const total = ref(0);
const loading = ref(false);

async function loadVersions(offset = 0) {
    loading.value = true;
    try {
        const result = await pm.versions.fetchVersions(paletteSlug, 20, offset);
        if (!result.ok) {
            emit("load-failed", result.message);
            return;
        }
        const page = result.page;
        if (offset === 0) {
            versions.value = page.data;
        } else {
            versions.value = [...versions.value, ...page.data];
        }
        total.value = page.total;
    } finally {
        loading.value = false;
    }
}

function loadMore() {
    loadVersions(versions.value.length);
}

// Load versions when drawer opens
watch(
    () => open,
    (isOpen) => {
        if (isOpen && paletteSlug) {
            versions.value = [];
            total.value = 0;
            loadVersions();
        }
    },
);
</script>
