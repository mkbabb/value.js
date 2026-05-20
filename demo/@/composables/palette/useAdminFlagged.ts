/**
 * useAdminFlagged — flagged palettes CRUD + pagination + user-side flag report.
 *
 * Wraps `getFlaggedPalettes`, `dismissFlags`, `deletePaletteAdmin` (slug-only
 * call shape used by the flagged panel) and the user-facing `flagPalette`
 * report endpoint. Exposed at the facade as `pm.flagged`.
 *
 * Migration source: `palette-browser/AdminFlaggedPanel.vue` (admin) +
 * `palette-browser/PaletteDialog/composables/useDialogModalStack.ts` (the
 * user-facing `flagPalette` report).
 */
import { ref, computed, type Ref } from "vue";
import {
    getFlaggedPalettes,
    dismissFlags,
    deletePaletteAdmin,
    flagPalette,
} from "@lib/palette/api";
import type { FlaggedPalette } from "@lib/palette/types";
import { useAdminAuth } from "../auth/useAdminAuth";

export interface UseAdminFlagged {
    items: Ref<FlaggedPalette[]>;
    total: Ref<number>;
    page: Ref<number>;
    pageSize: number;
    loading: Ref<boolean>;
    pageCount: Ref<number>;
    hasNext: Ref<boolean>;
    hasPrev: Ref<boolean>;
    loadFlagged: () => Promise<void>;
    dismiss: (paletteSlug: string) => Promise<void>;
    deletePalette: (paletteSlug: string) => Promise<void>;
    nextPage: () => void;
    prevPage: () => void;
    report: (
        paletteSlug: string,
        reason: string,
        detail?: string,
    ) => Promise<{ flagged: boolean } | undefined>;
}

export function useAdminFlagged(): UseAdminFlagged {
    const { getToken } = useAdminAuth();

    const items = ref<FlaggedPalette[]>([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = 20;
    const loading = ref(false);

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
    const hasNext = computed(() => page.value < pageCount.value);
    const hasPrev = computed(() => page.value > 1);

    async function loadFlagged() {
        const token = getToken();
        if (!token) return;
        loading.value = true;
        try {
            const res = await getFlaggedPalettes(
                token,
                pageSize,
                (page.value - 1) * pageSize,
            );
            items.value = res.data;
            total.value = res.total;
        } catch (e) {
            console.warn("Failed to load flagged palettes:", e);
        } finally {
            loading.value = false;
        }
    }

    async function dismiss(paletteSlug: string) {
        const token = getToken();
        if (!token) return;
        try {
            await dismissFlags(token, paletteSlug);
            items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
            total.value = Math.max(0, total.value - 1);
        } catch (e) {
            console.warn("Failed to dismiss flags:", e);
        }
    }

    async function deletePalette(paletteSlug: string) {
        const token = getToken();
        if (!token) return;
        try {
            await deletePaletteAdmin(token, paletteSlug);
            items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
            total.value = Math.max(0, total.value - 1);
        } catch (e) {
            console.warn("Failed to delete palette:", e);
        }
    }

    function nextPage() {
        if (hasNext.value) {
            page.value++;
            loadFlagged();
        }
    }

    function prevPage() {
        if (hasPrev.value) {
            page.value--;
            loadFlagged();
        }
    }

    /** User-facing flag/report — no admin token required. */
    async function report(
        paletteSlug: string,
        reason: string,
        detail?: string,
    ): Promise<{ flagged: boolean } | undefined> {
        try {
            return await flagPalette(paletteSlug, reason, detail);
        } catch (e) {
            console.warn("Failed to flag palette:", e);
            return undefined;
        }
    }

    return {
        items,
        total,
        page,
        pageSize,
        loading,
        pageCount,
        hasNext,
        hasPrev,
        loadFlagged,
        dismiss,
        deletePalette,
        nextPage,
        prevPage,
        report,
    };
}
