<template>
    <Dialog :open="open" @update:open="$emit('update:open', $event)">
        <SheetContent side="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
            <DialogHeader class="shrink-0">
                <!-- T.W4-6 (T-15/F7): the producer DialogTitle default is the
                     body-voice `text-subheading` — drawer headers join the
                     display voice (≤500 non-bold), same register as the
                     dialog headers. Glass 8 folded the side placement into
                     `<SheetContent side>` (the Drawer/Sheet fold). -->
                <DialogTitle class="font-display font-medium">Version history</DialogTitle>
                <!-- UIA-V-323: no "0 versions" while the first page is on its way. -->
                <DialogDescription>
                    {{ paletteName }} &mdash;
                    <template v-if="loading && versions.length === 0">loading versions…</template>
                    <template v-else>{{ total }} version{{ total === 1 ? "" : "s" }}</template>
                </DialogDescription>
            </DialogHeader>

            <div class="mt-4 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin">
                <!-- UIA-V-323: loading is three rows at row height, not a spinner. -->
                <template v-if="loading && versions.length === 0">
                    <Skeleton v-for="i in 3" :key="i" class="h-[4.5rem] w-full rounded-card" />
                </template>

                <!-- UIA-V-127: a failed read is not an empty history. -->
                <div v-else-if="loadError" class="flex flex-col items-start gap-2 py-2">
                    <p role="alert" class="text-caption text-destructive">{{ loadError }}</p>
                    <Button size="xs" @click="loadVersions(0)">Retry</Button>
                </div>
                <p
                    v-else-if="versions.length === 0"
                    class="py-2 text-caption text-muted-foreground"
                >
                    No versions yet.
                </p>

                <!-- Versions. X.W12U.s2: each row is a well on the card radius
                     (UIA-V-321) whose header line holds the label, the time and the
                     one action (UIA-V-129 · V-576); the palette is its own strip
                     (UIA-V-320); the name shows only where it differs (UIA-V-573). -->
                <div
                    v-for="(version, i) in versions"
                    :key="version.hash"
                    class="relative rounded-card border border-border bg-well p-3"
                    :class="{ 'ring-2 ring-primary': isCurrent(version) }"
                >
                    <div class="flex items-center gap-2">
                        <span class="text-small font-medium">
                            v{{ version.revisionNo ?? total - i }}
                            <span v-if="isCurrent(version)" class="ml-1 text-primary">(current)</span>
                        </span>
                        <span class="text-micro text-muted-foreground tabular-nums">
                            {{ formatTime(version.createdAt) }}
                        </span>
                        <!-- UIA-V-128 · V-324: the action is always visible where it
                             is offered, offered only to the owner, confirmed once,
                             and pending while the host's revert is in flight. -->
                        <template v-if="canRevert && !isCurrent(version)">
                            <Button
                                v-if="confirming !== version.hash"
                                emphasis="secondary"
                                size="xs"
                                class="ml-auto"
                                :disabled="pending"
                                @click="confirming = version.hash"
                            >
                                <RotateCcw class="h-3 w-3 shrink-0" aria-hidden="true" />
                                Revert
                            </Button>
                            <span v-else class="ml-auto flex items-center gap-1">
                                <Button emphasis="text" size="xs" :disabled="pending" @click="confirming = null">
                                    Keep
                                </Button>
                                <Button
                                    emphasis="primary"
                                    size="xs"
                                    :loading="pending"
                                    @click="$emit('revert', version.hash)"
                                >
                                    Revert to v{{ version.revisionNo ?? total - i }}
                                </Button>
                            </span>
                        </template>
                    </div>

                    <div
                        v-if="version.name !== paletteName"
                        class="mt-1 text-micro text-muted-foreground truncate"
                    >
                        {{ version.name }}
                    </div>

                    <div class="mt-2 h-5 overflow-hidden rounded-sm">
                        <PaletteColorStrip :colors="version.colors" />
                    </div>
                </div>

                <!-- Load more -->
                <Button
                    v-if="versions.length > 0 && versions.length < total"
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
import { RotateCcw } from "@lucide/vue";
import { Skeleton } from "../../../ui/skeleton";
import PaletteColorStrip from "../card/PaletteColorStrip.vue";
import { formatTime } from "../dateFormat";
import { BROWSE_PORT_KEY } from "../../usePalettePorts";
import type { PaletteVersion } from "../../types";

const { open, paletteSlug, paletteName, currentHash, canRevert = false, pending = false } = defineProps<{
    open: boolean;
    paletteSlug: string;
    paletteName: string;
    currentHash: string | null;
    /** X.W12U.s2 · UIA-V-324: only the owner is offered Revert (the route is owner-gated). */
    canRevert?: boolean;
    /** The host owns the revert request, so it owns its pending state. */
    pending?: boolean;
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
/** UIA-V-127: the last failed page read, said in the drawer (and on the host's rail). */
const loadError = ref<string | null>(null);
/** The release whose revert is being confirmed. */
const confirming = ref<string | null>(null);

async function loadVersions(offset = 0) {
    loading.value = true;
    loadError.value = null;
    try {
        const result = await pm.versions.fetchVersions(paletteSlug, 20, offset);
        if (!result.ok) {
            loadError.value = `The versions could not be read: ${result.message}`;
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
            confirming.value = null;
            loadVersions();
        }
    },
);

// UIA-V-126: a revert moves the palette's head (the host hands the drawer the
// server's palette), so the list is re-read — the new release appears and is
// the one marked current.
watch(
    () => currentHash,
    (next, prev) => {
        if (open && next !== prev) {
            confirming.value = null;
            loadVersions(0);
        }
    },
);
</script>
