<template>
    <div class="grid gap-3 pb-3">
        <!-- Toolbar -->
        <div class="flex items-center gap-2">
            <span class="text-mono-small text-muted-foreground">
                {{ tags.length }} tag{{ tags.length === 1 ? "" : "s" }}
            </span>
            <div class="flex-1" />
            <Button variant="outline" size="sm" class="h-7 px-2" @click="loadTags">
                <RefreshCw class="h-3 w-3" />
            </Button>
        </div>

        <!-- Create form -->
        <div class="flex items-center gap-2">
            <input
                v-model="newName"
                type="text"
                placeholder="Tag name..."
                class="h-7 flex-1 rounded-[var(--radius-input)] border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <input
                v-model="newCategory"
                type="text"
                placeholder="Category..."
                class="h-7 w-28 rounded-[var(--radius-input)] border border-input bg-background px-2.5 text-mono-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <Button
                variant="outline"
                size="sm"
                class="h-7 px-2"
                :disabled="!newName.trim() || !newCategory.trim() || creating"
                @click="onCreate"
            >
                <Plus class="h-3 w-3" />
            </Button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-8">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- Empty -->
        <EmptyState v-else-if="tags.length === 0" message="No tags yet." />

        <!-- Tag list grouped by category -->
        <div v-else class="flex flex-col gap-4">
            <div v-for="[category, catTags] in groupedTags" :key="category">
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
                        <button
                            class="ml-0.5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                            @click="onDelete(tag.name)"
                        >
                            <X class="h-3 w-3 text-muted-foreground hover:text-destructive transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Button } from "@components/ui/button";
import { Loader2, Plus, RefreshCw, X } from "lucide-vue-next";
import EmptyState from "./EmptyState.vue";
import { getAdminTags, createTag, deleteTag } from "@lib/palette/api";
import type { Tag } from "@lib/palette/types";
import { useAdminAuth } from "@composables/auth/useAdminAuth";

const { getToken } = useAdminAuth();

const tags = ref<Tag[]>([]);
const loading = ref(false);
const creating = ref(false);
const newName = ref("");
const newCategory = ref("");

const groupedTags = computed(() => {
    const groups = new Map<string, Tag[]>();
    for (const tag of tags.value) {
        const cat = tag.category || "uncategorized";
        if (!groups.has(cat)) groups.set(cat, []);
        groups.get(cat)!.push(tag);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
});

async function loadTags() {
    const token = getToken();
    if (!token) return;
    loading.value = true;
    try {
        tags.value = await getAdminTags(token);
    } catch (e) {
        console.warn("Failed to load tags:", e);
    } finally {
        loading.value = false;
    }
}

async function onCreate() {
    const token = getToken();
    if (!token || !newName.value.trim() || !newCategory.value.trim()) return;
    creating.value = true;
    try {
        const tag = await createTag(token, newName.value.trim().toLowerCase(), newCategory.value.trim().toLowerCase());
        tags.value = [...tags.value, tag].sort((a, b) => a.name.localeCompare(b.name));
        newName.value = "";
        newCategory.value = "";
    } catch (e) {
        console.warn("Failed to create tag:", e);
    } finally {
        creating.value = false;
    }
}

async function onDelete(name: string) {
    const token = getToken();
    if (!token) return;
    try {
        await deleteTag(token, name);
        tags.value = tags.value.filter((t) => t.name !== name);
    } catch (e) {
        console.warn("Failed to delete tag:", e);
    }
}

onMounted(loadTags);
</script>
