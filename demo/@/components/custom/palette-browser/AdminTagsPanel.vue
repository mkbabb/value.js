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
            <input
                v-model="tagsApi.newName.value"
                type="text"
                placeholder="Tag name..."
                class="h-7 flex-1 rounded-input border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <input
                v-model="tagsApi.newCategory.value"
                type="text"
                placeholder="Category..."
                class="h-7 w-28 rounded-input border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
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

        <!-- Loading -->
        <div v-if="tagsApi.loading.value" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <EmptyState v-else-if="tagsApi.tags.value.length === 0" message="No tags yet." />

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
                        class="group flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2.5 py-1 text-mono-small transition-colors hover:bg-accent/50"
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
import { Loader2, Plus, RefreshCw, X } from "@lucide/vue";
import EmptyState from "./EmptyState.vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

// D.W3 Lane B: route through pm.tags sub-object (was: direct getAdminTags/createTag/deleteTag)
const pm = inject(PALETTE_MANAGER_KEY)!;
const tagsApi = pm.tags;

onMounted(() => tagsApi.loadTags());
</script>
