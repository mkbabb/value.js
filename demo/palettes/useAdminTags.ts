/**
 * useAdminTags — admin tag CRUD + grouped listing.
 *
 * Wraps `getAdminTags`, `createTag`, `deleteTag` and owns the admin tag-list
 * state (tags, loading, creating, newName, newCategory + the grouped-by-
 * category computed). Exposed at the facade as `pm.tags`.
 *
 * Migration source: `palette-browser/AdminTagsPanel.vue` (D.W3 Lane B).
 */
import { ref, computed, type Ref, type ShallowRef } from "vue";
import { getAdminTags, createTag, deleteTag } from "./api";
import type { Tag } from "./types";
import {
    useAdminAccess,
    useAdminNotice,
    latestRequest,
    type AdminFailure,
    type AdminNotice,
    type AdminResult,
} from "./api/admin-call";
import { isTagName, tagNameProblem, PALETTE_WIRE_LIMITS } from "./api/preflight";

export interface UseAdminTags {
    tags: Ref<Tag[]>;
    loading: Ref<boolean>;
    /** W5-5 (F-2): load failure, surfaced — error ≠ empty at the panel. */
    loadError: Ref<string | null>;
    /** N-2: `null` while admitted; otherwise why not (signed out / denied). */
    access: Ref<AdminFailure | null>;
    /** S-13: the last tag write's one visible verdict. */
    notice: ShallowRef<AdminNotice | null>;
    dismissNotice: () => void;
    creating: Ref<boolean>;
    newName: Ref<string>;
    newCategory: Ref<string>;
    /** W7.80 (ATP-10): the typed name's contract problem, before any request. */
    newNameProblem: Ref<string | null>;
    groupedTags: Ref<[string, Tag[]][]>;
    loadTags: () => Promise<void>;
    createTag: () => Promise<AdminResult<unknown> | null>;
    deleteTag: (name: string) => Promise<AdminResult<unknown>>;
}

/**
 * The admin tag taxonomy. `onChange` is the ONE reconciliation seam (fold
 * W7.79 · ATP-19): an admin tag write invalidates the palette tag editor's
 * catalog in the same act, so the two client caches cannot disagree.
 */
export function useAdminTags(deps: { onChange: () => void }): UseAdminTags {
    const { access, call } = useAdminAccess();
    const { notice, settle, dismiss: dismissNotice } = useAdminNotice();
    const reads = latestRequest();

    const tags = ref<Tag[]>([]);
    const loading = ref(false);
    const loadError = ref<string | null>(null);
    const creating = ref(false);
    const newName = ref("");
    const newCategory = ref("");

    const newNameProblem = computed(() => {
        const name = newName.value.trim().toLowerCase();
        return name === "" || isTagName(name) ? null : tagNameProblem(name);
    });

    const groupedTags = computed(() => {
        const groups = new Map<string, Tag[]>();
        for (const tag of tags.value) {
            const cat = tag.category || "uncategorized";
            if (!groups.has(cat)) groups.set(cat, []);
            groups.get(cat)!.push(tag);
        }
        // UIA-V-651: "uncategorized" is the absence of a category — it sorts
        // after every real one, never alphabetically among them.
        const rank = (c: string) => (c === "uncategorized" ? 1 : 0);
        return Array.from(groups.entries()).sort(
            ([a], [b]) => rank(a) - rank(b) || a.localeCompare(b),
        );
    });

    async function loadTags() {
        const ticket = reads.issue();
        loading.value = true;
        const result = await call((token) => getAdminTags(token));
        if (!reads.isCurrent(ticket)) return;
        loading.value = false;
        if (result.ok) {
            tags.value = result.value;
            loadError.value = null;
        } else if (result.kind === "failed") {
            // W5-5 (F-2): a dead backend must never read as "no tags yet".
            loadError.value = result.message;
            // UIA-V-653: an earlier write's success notice does not stand over
            // the error plate — one verdict at a time.
            dismissNotice();
        }
    }

    async function createTagAction(): Promise<AdminResult<unknown> | null> {
        const name = newName.value.trim().toLowerCase();
        const category = newCategory.value.trim().toLowerCase();
        if (!name || !category || newNameProblem.value) return null;
        if (category.length > PALETTE_WIRE_LIMITS.maxTagLength) return null;
        creating.value = true;
        const result = await call((token) => createTag(token, name, category));
        creating.value = false;
        if (result.ok) {
            tags.value = [...tags.value, result.value].sort((a, b) => a.name.localeCompare(b.name));
            // W7.81 (ATP-11): a successful write clears a stale load error, so
            // the created tag is never hidden behind it.
            loadError.value = null;
            newName.value = "";
            newCategory.value = "";
            deps.onChange();
        }
        settle(result, `Created tag “${name}”`, "Could not create the tag");
        return result;
    }

    async function deleteTagAction(name: string): Promise<AdminResult<unknown>> {
        const result = await call((token) => deleteTag(token, name));
        if (result.ok) {
            tags.value = tags.value.filter((t) => t.name !== name);
            deps.onChange();
        }
        settle(result, `Deleted tag “${name}”`, "Could not delete the tag");
        return result;
    }

    return {
        tags,
        loading,
        loadError,
        access,
        notice,
        dismissNotice,
        creating,
        newName,
        newCategory,
        newNameProblem,
        groupedTags,
        loadTags,
        createTag: createTagAction,
        deleteTag: deleteTagAction,
    };
}
