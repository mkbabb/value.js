export const FRAME_RATE = 1000 / 60;

export const isObject = (value: any) => {
    return !!value && value.constructor === Object;
};

export function clone(obj: any): any {
    if (isObject(obj)) {
        return Object.entries(obj)
            .map(([k, v]) => [k, clone(v)])
            .reduce((acc: Record<string, any>, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});
    } else if (obj != null && typeof obj.clone === "function") {
        return obj.clone();
    } else if (Array.isArray(obj)) {
        return obj.map(clone);
    } else {
        return obj;
    }
}

export const arrayEquals = (a: any[], b: any[]) => {
    if (!a || !b || a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};

export async function sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitUntil(condition: () => boolean, delay: number = FRAME_RATE) {
    return await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (condition()) {
                clearInterval(interval);
                return resolve();
            }
        }, delay);
    });
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number = 100,
    immediate: boolean = false,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let result: ReturnType<T>;

    const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;

        const later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) result = func.apply(context, args);
    };

    debounced.cancel = () => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}

export async function createHash(algorithm: string, data: string) {
    const sourceBytes = new TextEncoder().encode(data);

    const digestBytes = await crypto.subtle.digest(algorithm, sourceBytes);

    const digestArray = Array.from(new Uint8Array(digestBytes));

    return digestArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export interface MemoizeOptions<T extends (...args: any[]) => any = (...args: any[]) => any> {
    maxCacheSize?: number;
    ttl?: number;
    keyFn?: (...args: any[]) => string;
    /** When provided, the result is only cached if this returns true. */
    shouldCache?: (result: ReturnType<T>, ...args: Parameters<T>) => boolean;
}

export type Memoized<T extends (...args: any[]) => any> = T & {
    cache: Map<string, { value: ReturnType<T>; timestamp: number }>;
};

export function memoize<T extends (...args: any[]) => any>(
    func: T,
    options: MemoizeOptions<T> = {},
): Memoized<T> {
    const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();
    const {
        maxCacheSize = Infinity,
        ttl = Infinity,
        keyFn = (JSON.stringify as (...args: any[]) => string),
        shouldCache,
    } = options;

    // C4 (tranche-F Wave C) — `ttl === Infinity` fast path. When no TTL is set
    // (the common case: `getComputedValue`, the parse caches) the
    // `now - timestamp <= ttl` guard is a tautology and the `Date.now()` read
    // on every hit is dead work. Hoist the predicate once and skip the clock
    // read on the hot path; the timestamp stored is then irrelevant (0).
    const hasTtl = ttl !== Infinity;

    // F3 / VJ-F6 (tranche-N W7) — LRU eviction. A `Map` preserves insertion
    // order, and `cache.keys().next().value` yields the *first-inserted* key.
    // FIFO drops that key outright; LRU instead promotes a key to most-recent
    // on every hit (delete + re-set re-appends it to the tail), so the head is
    // always the least-recently-*used* key. Under a flood that exceeds the
    // bound, a hot (recently-touched) key survives where FIFO would evict it.
    // Promotion is independent of the C4 no-clock path — it only reorders.
    const memoized = function (
        this: ThisParameterType<T>,
        ...args: Parameters<T>
    ): ReturnType<T> {
        const key = keyFn.apply(this, args);

        if (cache.has(key)) {
            const cached = cache.get(key)!;
            if (!hasTtl || Date.now() - cached.timestamp <= ttl) {
                // LRU promote: re-insert so the entry moves to the tail
                // (most-recently-used). A bare read leaves it at its old
                // position and FIFO would evict it despite being hot.
                cache.delete(key);
                cache.set(key, cached);
                return cached.value;
            } else {
                cache.delete(key);
            }
        }

        const result = func.apply(this, args);

        if (!shouldCache || shouldCache(result, ...args)) {
            cache.set(key, { value: result, timestamp: hasTtl ? Date.now() : 0 });

            if (cache.size > maxCacheSize) {
                // The head of a `Map` is the least-recently-used key (every hit
                // promoted its key to the tail above).
                const lruKey = cache.keys().next().value!;
                cache.delete(lruKey);
            }
        }

        return result;
    } as Memoized<T>;

    memoized.cache = cache;

    return memoized;
}

export const hyphenToCamelCase = (str: string) =>
    str.replace(/([-_][a-z])/gi, (group) =>
        group.toUpperCase().replace("-", "").replace("_", ""),
    );

export function camelCaseToHyphen(str: string) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0]!.toLowerCase()}`);
}

export function seekPreviousValue<T>(ix: number, values: T[], pred: (f: T) => boolean) {
    for (let i = ix - 1; i >= 0; i--) {
        if (pred(values[i]!)) {
            return i;
        }
    }

    return undefined;
}

export function requestAnimationFrame(callback: FrameRequestCallback) {
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
    }

    let delay = FRAME_RATE;
    let prevT = Date.now();

    return setTimeout(() => {
        let t = Date.now();
        let delta = t - prevT;

        prevT = t;
        delay = Math.max(0, FRAME_RATE - delta);

        callback(t);
    }, delay);
}

export function cancelAnimationFrame(handle: number | undefined | null | any) {
    if (typeof window !== "undefined" && window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(handle);
    }

    clearTimeout(handle);
}

