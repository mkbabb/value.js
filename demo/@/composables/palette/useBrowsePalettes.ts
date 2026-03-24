import { ref, type Ref } from "vue";
import { useFilteredList } from "../useFilteredList";
import { useSession } from "../auth/useSession";
import { usePaletteStore } from "./usePaletteStore";
import {
    listPalettes,
    votePalette,
    renamePalette,
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
    const sortMode = ref<"newest" | "popular">("newest");

    const filteredBrowse = useFilteredList(remotePalettes, deps.searchQuery, (p, q) =>
        p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );

    async function loadRemotePalettes(isSort = false) {
        if (!isSort) {
            browsing.value = true;
        } else {
            sortLoading.value = true;
        }
        try {
            const res = await listPalettes(50, 0, sortMode.value);
            remotePalettes.value = res.data;
        } catch (e) {
            console.warn("Failed to load remote palettes:", e);
        } finally {
            browsing.value = false;
            sortLoading.value = false;
        }
    }

    function onSortChange(value: string) {
        if (!value) return;
        sortMode.value = value as "newest" | "popular";
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
        filteredBrowse,
        loadRemotePalettes,
        onSortChange,
        onSaveRemote,
        onVote,
        onRename,
    };
}
