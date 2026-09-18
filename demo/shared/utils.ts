import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The demo's ONE debounce (T.W6.5 Lane M · row 12 — the root-barrel shed).
 *
 * `debounce` was the last symbol holding 7 demo files on the BARE
 * `@mkbabb/value.js` specifier — the full-barrel import that drags the
 * scroll-timeline grammar chunk (~36 KiB gz) into the eager graph for a
 * 40-line timer utility. The utility tail has no rightful subpath home
 * (it is not color/parsing/units/math domain), so the demo owns its copy;
 * the library's root-barrel export stands for external consumers.
 *
 * Semantics match the library's trailing-edge debounce for every demo call
 * site (none used `immediate` or `this`): one pending timer, last-args-win,
 * `.cancel()` drops a pending invocation.
 */
export function debounce<Args extends unknown[]>(
    func: (...args: Args) => unknown,
    wait: number = 100,
): ((...args: Args) => void) & { cancel: () => void } {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: Args): void => {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func(...args);
        }, wait);
    };

    debounced.cancel = (): void => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}
