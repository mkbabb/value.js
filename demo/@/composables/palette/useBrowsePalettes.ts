import { ref, type Ref } from "vue";
import { useFilteredList } from "../useFilteredList";
import { useSession } from "../auth/useSession";
import { usePaletteStore } from "./usePaletteStore";
import {
    listPalettes,
    votePalette,
    renamePalette,
    deletePaletteUser,
} from "@lib/palette/api";
import type { Palette } from "@lib/palette/types";

export function useBrowsePalettes(deps: {
    searchQuery: Ref<string>;
}) {
    const session = useSession();
    const { addPublishedPalette } = usePaletteStore();

    const remotePalettes = ref<Palette[]>([]);
    const browsing = ref(false);
    const sortLoading = ref(false);
    const sortMode = ref<"newest" | "popular" | "most-forked">("newest");
    const browseError = ref<string | null>(null);

    // Filter state — set externally by PaletteDialog
    const statusFilter = ref("");
    const selectedTags = ref<string[]>([]);

    const filteredBrowse = useFilteredList(remotePalettes, deps.searchQuery, (p, q) =>
        p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );

    let loadGeneration = 0;

    async function loadRemotePalettes(isSort = false) {
        const gen = ++loadGeneration;
        if (!isSort) {
            browsing.value = true;
        } else {
            sortLoading.value = true;
        }
        try {
            browseError.value = null;
            const q = deps.searchQuery.value.trim();
            const res = await listPalettes({
                limit: 50,
                offset: 0,
                sort: sortMode.value,
                q: q.length >= 2 ? q : undefined,
                status: statusFilter.value || undefined,
                tags: selectedTags.value.length > 0 ? selectedTags.value : undefined,
            });
            if (gen !== loadGeneration) return; // stale response
            remotePalettes.value = Array.isArray(res.data) ? res.data : [];
        } catch (e) {
            if (gen !== loadGeneration) return;
            browseError.value = "Failed to load palettes";
            console.warn("Failed to load remote palettes:", e);
        } finally {
            if (gen === loadGeneration) {
                browsing.value = false;
                sortLoading.value = false;
            }
        }
    }

    function onSortChange(value: string) {
        if (!value) return;
        sortMode.value = value as typeof sortMode.value;
        loadRemotePalettes(true);
    }

    function onSaveRemote(palette: Palette) {
        addPublishedPalette(palette);
    }

    async function onVote(palette: Palette) {
        try {
            await session.ensureSession();
            const result = await votePalette(palette.slug);
            const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            if (idx !== -1) {
                remotePalettes.value[idx] = {
                    ...remotePalettes.value[idx],
                    voted: result.voted,
                    voteCount: result.voteCount,
                };
            }
        } catch (e) {
            console.warn("Failed to vote:", e);
        }
    }

    async function onDeleteOwned(palette: Palette): Promise<{ success: boolean; message: string }> {
        try {
            await session.ensureSession();
            await deletePaletteUser(palette.slug);
            remotePalettes.value = remotePalettes.value.filter((p) => p.slug !== palette.slug);
            return { success: true, message: "Deleted" };
        } catch (e: any) {
            console.warn("Failed to delete palette:", e?.message);
            return { success: false, message: e?.message ?? "Failed to delete" };
        }
    }

    async function onRename(palette: Palette, newName: string) {
        try {
            await session.ensureSession();
            const updated = await renamePalette(palette.slug, newName);
            const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            if (idx !== -1) {
                remotePalettes.value[idx] = {
                    ...remotePalettes.value[idx],
                    name: updated.name,
                };
            }
        } catch (e: any) {
            console.warn("Failed to rename palette:", e?.message);
        }
    }

    return {
        remotePalettes,
        browsing,
        sortLoading,
        sortMode,
        browseError,
        statusFilter,
        selectedTags,
        filteredBrowse,
        loadRemotePalettes,
        onSortChange,
        onSaveRemote,
        onDeleteOwned,
        onVote,
        onRename,
    };
}
