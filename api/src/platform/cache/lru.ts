/**
 * `LRU<K, V>` — single consolidated in-memory LRU + TTL cache (D.W2 Lane D
 * — D-HARDEN-3 §1 C3 triplication consolidation).
 *
 * Three independent implementations existed prior to this module:
 *   1. `middleware.ts:createRateLimiter` — per-IP rate-limit entries (4 instances).
 *   2. `middleware.ts:suspendedCache` — slug → suspension-expiry timestamp.
 *   3. (latent) cron sweep loop ad-hoc map cleanup.
 *
 * Each retains its own capacity + TTL configuration; the underlying
 * eviction semantics (size cap + lazy expiry) are now shared here.
 *
 * Eviction policy: lazy. Entries are evicted when:
 *   - `.get(key)` finds an entry with `expiresAt < now` (returns undefined).
 *   - `.set(key, value)` is called and `size >= capacity` — oldest entry by
 *     insertion order is dropped (Map iteration order is insertion order
 *     per the JS spec).
 *
 * Not LRU in the strict access-order sense; this is FIFO + TTL, which is
 * sufficient for the rate-limit + suspended-user use cases (both have a
 * natural TTL that bounds the working set).
 */

export interface LRUEntry<V> {
    value: V;
    expiresAt: number;
}

export class LRU<K, V> {
    private readonly map = new Map<K, LRUEntry<V>>();

    constructor(
        public readonly capacity: number,
        public readonly defaultTtlMs?: number,
    ) {
        if (capacity <= 0) {
            throw new Error(`LRU capacity must be > 0 (got ${capacity})`);
        }
    }

    get size(): number {
        return this.map.size;
    }

    /** Underlying Map iteration (used by the rate-limit sweeper). */
    entries(): IterableIterator<[K, LRUEntry<V>]> {
        return this.map.entries();
    }

    has(key: K): boolean {
        const entry = this.map.get(key);
        if (!entry) return false;
        if (entry.expiresAt < Date.now()) {
            this.map.delete(key);
            return false;
        }
        return true;
    }

    get(key: K): V | undefined {
        const entry = this.map.get(key);
        if (!entry) return undefined;
        if (entry.expiresAt < Date.now()) {
            this.map.delete(key);
            return undefined;
        }
        return entry.value;
    }

    /**
     * Get the raw entry (value + expiresAt) without TTL eviction. Used by
     * the rate-limiter to read+mutate the count atomically.
     */
    getEntry(key: K): LRUEntry<V> | undefined {
        return this.map.get(key);
    }

    /**
     * Set a value with an explicit expiresAt (absolute ms timestamp). The
     * rate-limiter computes its own window-resetAt and uses this signature.
     */
    setWithExpiry(key: K, value: V, expiresAt: number): void {
        if (!this.map.has(key) && this.map.size >= this.capacity) {
            this.evictOne();
        }
        this.map.set(key, { value, expiresAt });
    }

    set(key: K, value: V, ttlMs?: number): void {
        const effectiveTtl = ttlMs ?? this.defaultTtlMs;
        if (effectiveTtl === undefined) {
            throw new Error(
                "LRU.set requires a ttlMs argument when constructed without defaultTtlMs",
            );
        }
        this.setWithExpiry(key, value, Date.now() + effectiveTtl);
    }

    delete(key: K): boolean {
        return this.map.delete(key);
    }

    /**
     * Sweep expired entries. Called by the rate-limit interval timer in
     * `middleware.ts`.
     */
    sweepExpired(now: number = Date.now()): number {
        let dropped = 0;
        for (const [key, entry] of this.map) {
            if (entry.expiresAt < now) {
                this.map.delete(key);
                dropped++;
            }
        }
        return dropped;
    }

    /**
     * Evict the oldest expired entry; fall back to evicting the
     * insertion-oldest entry if no entries are expired. Returns true on
     * any eviction.
     */
    evictOne(now: number = Date.now()): boolean {
        for (const [key, entry] of this.map) {
            if (entry.expiresAt < now) {
                this.map.delete(key);
                return true;
            }
        }
        // No expired entries: fall back to FIFO eviction.
        const first = this.map.keys().next();
        if (!first.done) {
            this.map.delete(first.value);
            return true;
        }
        return false;
    }
}
