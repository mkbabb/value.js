/**
 * useAdminTags — admin tag CRUD + grouped listing.
 *
 * Wraps `getAdminTags`, `createTag`, `deleteTag` and owns the admin tag-list
 * state (tags, loading, creating, newName, newCategory + the grouped-by-
 * category computed). Exposed at the facade as `pm.tags`.
 *
 * Migration source: `palette-browser/AdminTagsPanel.vue` (D.W3 Lane B).
 */
import { ref, computed, type Ref } from "vue";
import { getAdminTags, createTag, deleteTag } from "@lib/palette/api";
import type { Tag } from "@lib/palette/types";
import { useAdminAuth } from "../auth/useAdminAuth";

export interface UseAdminTags {
    tags: Ref<Tag[]>;
    loading: Ref<boolean>;
    creating: Ref<boolean>;
    newName: Ref<string>;
    newCategory: Ref<string>;
    groupedTags: Ref<[string, Tag[]][]>;
    loadTags: () => Promise<void>;
    createTag: () => Promise<void>;
    deleteTag: (name: string) => Promise<void>;
}

export function useAdminTags(): UseAdminTags {
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

    async function createTagAction() {
        const token = getToken();
        if (!token || !newName.value.trim() || !newCategory.value.trim()) return;
        creating.value = true;
        try {
            const tag = await createTag(
                token,
                newName.value.trim().toLowerCase(),
                newCategory.value.trim().toLowerCase(),
            );
            tags.value = [...tags.value, tag].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
            newName.value = "";
            newCategory.value = "";
        } catch (e) {
            console.warn("Failed to create tag:", e);
        } finally {
            creating.value = false;
        }
    }

    async function deleteTagAction(name: string) {
        const token = getToken();
        if (!token) return;
        try {
            await deleteTag(token, name);
            tags.value = tags.value.filter((t) => t.name !== name);
        } catch (e) {
            console.warn("Failed to delete tag:", e);
        }
    }

    return {
        tags,
        loading,
        creating,
        newName,
        newCategory,
        groupedTags,
        loadTags,
        createTag: createTagAction,
        deleteTag: deleteTagAction,
    };
}
