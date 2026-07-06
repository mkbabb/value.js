<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <span class="text-mono-small text-muted-foreground">
                {{ tagsApi.tags.value.length }} tag{{ tagsApi.tags.value.length === 1 ? "" : "s" }}
            </span>
            <div class="flex-1" />
            <!-- W5-a11y: icon-only refresh button needs accessible name -->
            <Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh tags" @click="tagsApi.loadTags">
                <RefreshCw class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- Create form -->
        <div class="flex items-center gap-2">
            <!-- S.W5-3 (S-17/F-7): glass-ui Input pills, sm rung; the pair
                 sized honestly (name vs category was ~5×; the category well
                 no longer clips its own placeholder). -->
            <Input
                v-model="tagsApi.newName.value"
                type="text"
                size="sm"
                placeholder="Tag name..."
                aria-label="New tag name"
                class="flex-1 min-w-0 font-mono"
            />
            <Input
                v-model="tagsApi.newCategory.value"
                type="text"
                size="sm"
                placeholder="Category..."
                aria-label="New tag category"
                class="w-36 font-mono"
            />
            <!-- W5-a11y: icon-only create tag button needs accessible name -->
            <Button
                variant="outline"
                size="sm"
                class="h-7 px-2"
                aria-label="Create tag"
                :disabled="!tagsApi.newName.value.trim() || !tagsApi.newCategory.value.trim() || tagsApi.creating.value"
                @click="tagsApi.createTag"
            >
                <Plus class="h-3 w-3" aria-hidden="true" />
            </Button>
        </div>

        <!-- W5-1 + F-13: tag chips load as chip-shaped shadows in the ONE
             loading-ink register — never a centered generic spinner. -->
        <div
            v-if="tagsApi.loading.value"
            class="skeleton-ink-register flex flex-wrap gap-1.5"
            role="status"
            aria-label="Loading tags"
        >
            <Skeleton
                v-for="i in 5"
                :key="i"
                surface="glass"
                variant="breath"
                class="h-7 rounded-full"
                :class="i % 2 ? 'w-20' : 'w-14'"
            />
        </div>

        <!-- Empty -->
        <EmptyState v-else-if="tagsApi.tags.value.length === 0" eyebrow="· no tags minted ·" message="No tags yet." />

        <!-- Tag list grouped by category -->
        <div v-else class="flex flex-col gap-4">
            <div v-for="[category, catTags] in tagsApi.groupedTags.value" :key="category">
                <div class="mb-1.5 section-label text-muted-foreground">
                    {{ category }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <div
                        v-for="tag in catTags"
                        :key="tag.name"
                        class="group flex items-center gap-1 rounded-full border border-card-edge bg-muted/30 px-2.5 py-1 text-mono-small transition-colors hover:bg-accent/50"
                    >
                        <span>{{ tag.name }}</span>
                        <!-- W5-a11y: icon-only delete button needs accessible name -->
                        <button
                            class="ml-0.5 p-0.5 rounded-sm opacity-0 transition-all group-hover:opacity-100 hover:bg-accent/50 active:scale-95 active:bg-accent/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:opacity-100"
                            :aria-label="`Delete tag ${tag.name}`"
                            @click="tagsApi.deleteTag(tag.name)"
                        >
                            <X class="h-3 w-3 text-muted-foreground hover:text-destructive transition-colors" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Skeleton } from "@components/ui/skeleton";
import { Plus, RefreshCw, X } from "@lucide/vue";
import EmptyState from "./EmptyState.vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route through pm.tags sub-object (was: direct getAdminTags/createTag/deleteTag)
const pm = inject(PALETTE_MANAGER_KEY)!;
const tagsApi = pm.tags;

onMounted(() => tagsApi.loadTags());
</script>
