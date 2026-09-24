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
import { ref, computed, type Ref, type ShallowRef } from "vue";
import {
    getFlaggedPalettes,
    dismissFlags,
    flagPalette,
} from "./api";
import {
    useAdminAccess,
    useAdminNotice,
    latestRequest,
    type AdminFailure,
    type AdminNotice,
    type AdminResult,
} from "./api/admin-call";
import type { FlaggedPalette } from "./types";
import { ApiProblem } from "../platform/transport/api-problem";

/** The report verdict — W7.22: an API failure is a failure, never a success. */
export type ReportResult =
    | { readonly ok: true; readonly flagged: boolean }
    | { readonly ok: false; readonly message: string };

export interface UseAdminFlagged {
    items: Ref<FlaggedPalette[]>;
    total: Ref<number>;
    page: Ref<number>;
    pageSize: number;
    loading: Ref<boolean>;
    /** W5-5 (F-2): load failure, surfaced — error ≠ empty at the panel. */
    loadError: Ref<string | null>;
    /** N-2: `null` while admitted; otherwise why not (signed out / denied). */
    access: Ref<AdminFailure | null>;
    /** S-13: the last moderation act's one visible verdict. */
    notice: ShallowRef<AdminNotice | null>;
    dismissNotice: () => void;
    pageCount: Ref<number>;
    hasNext: Ref<boolean>;
    hasPrev: Ref<boolean>;
    loadFlagged: () => Promise<void>;
    dismiss: (paletteSlug: string) => Promise<AdminResult<unknown>>;
    deletePalette: (paletteSlug: string) => Promise<AdminResult<unknown>>;
    nextPage: () => void;
    prevPage: () => void;
    report: (paletteSlug: string, reason: string, detail?: string) => Promise<ReportResult>;
}

/**
 * The flag queue. The palette delete is NOT owned here: `deletePalette` is the
 * admin users domain's one delete (G13 — one call site per mutation), injected.
 */
export function useAdminFlagged(deps: {
    deletePalette: (slug: string) => Promise<AdminResult<unknown>>;
}): UseAdminFlagged {
    const { access, call } = useAdminAccess();
    const { notice, settle, dismiss: dismissNotice } = useAdminNotice();
    // N-16: only the most recently ISSUED read may paint or clear `loading`.
    const reads = latestRequest();

    const items = ref<FlaggedPalette[]>([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = 20;
    const loading = ref(false);
    const loadError = ref<string | null>(null);

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
    const hasNext = computed(() => page.value < pageCount.value);
    const hasPrev = computed(() => page.value > 1);

    async function loadFlagged() {
        const ticket = reads.issue();
        loading.value = true;
        const offset = (page.value - 1) * pageSize;
        const result = await call((token) => getFlaggedPalettes(token, pageSize, offset));
        if (!reads.isCurrent(ticket)) return;
        loading.value = false;
        if (result.ok) {
            items.value = result.value.data;
            total.value = result.value.total;
            loadError.value = null;
            // W7.72 (AF-28): emptying the last page must not strand the panel on
            // an offset past the end — clamp and re-read the last real page.
            if (items.value.length === 0 && page.value > pageCount.value) {
                page.value = pageCount.value;
                await loadFlagged();
            }
        } else if (result.kind === "failed") {
            // W7.81 (AF-4): the error plate replaces the rows; none are retained.
            items.value = [];
            loadError.value = result.message;
            // UIA-V-432: an earlier act's success notice does not stand beside
            // the error plate — one verdict at a time.
            dismissNotice();
        }
    }

    function removeRow(paletteSlug: string) {
        items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
        total.value = Math.max(0, total.value - 1);
        if (items.value.length === 0 && page.value > pageCount.value) {
            page.value = pageCount.value;
            void loadFlagged();
        }
    }

    async function dismiss(paletteSlug: string) {
        const result = await call((token) => dismissFlags(token, paletteSlug));
        if (result.ok) {
            items.value = items.value.filter((i) => i.paletteSlug !== paletteSlug);
            // UIA-V-176: the server dropped the dismissed row, so every later
            // report shifted up one offset. Re-read the current page so the
            // shifted report refills it, and page 2 does not skip it. (A
            // palette delete keeps its reports in the server's queue —
            // UIA-V-178, the API cascade — so its offsets do not shift and
            // the local removal stays exact.) `loadFlagged` also clamps an
            // emptied last page.
            void loadFlagged();
        }
        settle(result, `Dismissed the reports on ${paletteSlug}`, "Could not dismiss the reports");
        return result;
    }

    async function deletePalette(paletteSlug: string) {
        const label = items.value.find((i) => i.paletteSlug === paletteSlug)?.palette?.name ?? paletteSlug;
        const result = await deps.deletePalette(paletteSlug);
        if (result.ok) removeRow(paletteSlug);
        settle(result, `Deleted “${label}”`, "Could not delete the palette");
        return result;
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
    ): Promise<ReportResult> {
        try {
            const res = await flagPalette(paletteSlug, reason, detail);
            return { ok: true, flagged: res.flagged };
        } catch (error) {
            const message =
                error instanceof ApiProblem
                    ? (error.detail ?? error.title)
                    : error instanceof Error && error.message
                      ? error.message
                      : "The report could not be sent.";
            return { ok: false, message };
        }
    }

    return {
        items,
        total,
        page,
        pageSize,
        loading,
        loadError,
        access,
        notice,
        dismissNotice,
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
