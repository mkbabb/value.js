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
    // SS-8 B10 (SS8-0291): one page turn per load. Two activations inside one
    // load (a double click, a held key) stepped the page twice and issued two
    // reads; the turn now waits for its own reload to settle. The buttons stay
    // enabled (a disabled, focused button drops focus to <body>).
    let turning = false;
    async function turn(step: 1 | -1) {
        turning = true;
        pager.page += step;
        try {
            await reload();
        } finally {
            turning = false;
        }
    }
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
            if (!pager.hasNext || turning) return;
            void turn(1);
        },
        prev() {
            if (!pager.hasPrev || turning) return;
            void turn(-1);
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
