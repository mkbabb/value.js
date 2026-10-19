/**
 * usePager — the ONE pager behind every admin list (X.W12U.k · A2-VA-X-12).
 *
 * The audit log and the flag queue each hand-wrote the same six members
 * (`page`, `total`, `pageCount`, `hasNext`, `hasPrev`, next/prev → reload),
 * and the users roster and the two name lists had none: they fetched one
 * 50-row page and rendered no way to reach the rest. One state, one
 * `<PaginationBar :pager>`; a list is paged by constructing this with its own
 * reload.
 */
import { computed, reactive } from "vue";

export interface Pager {
    /** 1-based. */
    page: number;
    /** The server's total for the list (not the loaded page's length). */
    total: number;
    readonly pageSize: number;
    readonly pageCount: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
    /** The request offset of the current page. */
    readonly offset: number;
    next: () => void;
    prev: () => void;
    /**
     * A row left the list. If that emptied a page past the new end, step back
     * to the last real page and say so (`true`) — the caller re-reads.
     */
    settle: (total: number, loadedRows: number) => boolean;
}

export function usePager(pageSize: number, reload: () => unknown): Pager {
    const pager: Pager = reactive({
        page: 1,
        total: 0,
        pageSize,
        pageCount: computed((): number =>
            Math.max(1, Math.ceil(pager.total / pageSize)),
        ),
        hasNext: computed((): boolean => pager.page < pager.pageCount),
        hasPrev: computed((): boolean => pager.page > 1),
        offset: computed((): number => (pager.page - 1) * pageSize),
        next() {
            if (!pager.hasNext) return;
            pager.page++;
            void reload();
        },
        prev() {
            if (!pager.hasPrev) return;
            pager.page--;
            void reload();
        },
        settle(total: number, loadedRows: number): boolean {
            pager.total = Math.max(0, total);
            if (loadedRows > 0 || pager.page <= pager.pageCount) return false;
            pager.page = pager.pageCount;
            return true;
        },
    });
    return pager;
}
