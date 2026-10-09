/**
 * usePopupMutex — THE ONE single-open mutex for a group of popups
 * (A2-VA-L1-16). The app had three: this composable (a local fork of the one
 * glass retired at the D-II tranche, held by the dock), `useHoverPopover` (an
 * index mutex for a row of swatches) and an `activeHover` prop + emit chain
 * the dock's action bar threaded through every ActionButton. One keyed mutex
 * serves all three now; a key is whatever names a popup in its group (the
 * dock's popup names, a swatch's index, a scene action's token).
 *
 *   - `swapDelay` (ms, default 180): swapping from one open popup to another
 *     closes the first and opens the second after the delay, so two panels
 *     never cross-fade on top of each other (the dock's menus). `0` swaps in
 *     the same tick (hover cards, whose own open/close delays already pace
 *     the hand-off).
 *   - A2-VA-L2-11: a popup never outlives its pane — a group mounted under the
 *     pane KeepAlive closes when its pane is deactivated (shell/usePanePopups).
 */
import { computed, onDeactivated, onUnmounted, ref } from "vue";
import type { Ref, WritableComputedRef } from "vue";

export type PopupKey = string | number;

export interface UsePopupMutexOptions {
    /** Delay when swapping between popups (ms, default 180; 0 = same tick). */
    swapDelay?: number;
}

export interface UsePopupMutexReturn<K extends PopupKey> {
    /** Currently open popup key, or null */
    current: Ref<K | null>;
    /** Whether any popup is open or mid-swap */
    isAnyOpen: Ref<boolean>;
    /** Open or close one popup — the `update:open` handler of its trigger. */
    setOpen(key: K, open: boolean): void;
    /** Close whatever is open. */
    close(): void;
    /** A writable computed get/set for one popup key (a `v-model:open`). */
    popupModel(key: K): WritableComputedRef<boolean>;
}

export function usePopupMutex<K extends PopupKey>(
    options?: UsePopupMutexOptions,
): UsePopupMutexReturn<K> {
    const { swapDelay = 180 } = options ?? {};

    const current = ref<K | null>(null) as Ref<K | null>;
    const pending = ref<K | null>(null) as Ref<K | null>;
    let swapTimer: ReturnType<typeof setTimeout> | null = null;

    function clearSwapTimer() {
        if (swapTimer) {
            clearTimeout(swapTimer);
            swapTimer = null;
        }
    }

    function setOpen(key: K, open: boolean) {
        if (open) {
            if (current.value === key) return;
            clearSwapTimer();

            // Swapping: close current, delay, then open new
            if (swapDelay > 0 && current.value !== null && current.value !== key) {
                pending.value = key;
                current.value = null;
                swapTimer = setTimeout(() => {
                    current.value = pending.value;
                    pending.value = null;
                    swapTimer = null;
                }, swapDelay);
                return;
            }

            pending.value = null;
            current.value = key;
            return;
        }

        // Closing
        if (pending.value === key) {
            pending.value = null;
        }
        if (current.value === key) {
            current.value = null;
        }
    }

    function close() {
        clearSwapTimer();
        pending.value = null;
        current.value = null;
    }

    const isAnyOpen = computed(
        () => current.value !== null || pending.value !== null,
    );

    function popupModel(key: K): WritableComputedRef<boolean> {
        return computed({
            get: () => current.value === key,
            set: (open: boolean) => setOpen(key, open),
        });
    }

    onDeactivated(close);
    onUnmounted(clearSwapTimer);

    return { current, isAnyOpen, setOpen, close, popupModel };
}
