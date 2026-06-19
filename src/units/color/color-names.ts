/**
 * The runtime custom color-name registry — a self-contained, parse-that-free
 * low-level module (O.W1 S1).
 *
 * BACKGROUND. `parsing/color.ts` historically owned this registry inline, and
 * `units/index.ts:1` re-exported `registerColorNames`/`clearCustomColorNames`/
 * `getCustomColorNames` from there. That re-export dragged the ENTIRE parsing
 * grammar (and transitively `@mkbabb/parse-that`) into the static import closure
 * of `units/index.ts` — and therefore into anything composing the `./color` or
 * `./units` subpaths. The 145 KB monolith could never be tree-shaken because the
 * color/unit surface was statically welded to the parser.
 *
 * THE SEVERANCE. The mutable map + the three register/clear/get functions live
 * here, in the `units/color/` subgraph, which imports ZERO parsing modules. The
 * one coupling the registry has to the parser — invalidating `parseCSSColor`'s
 * memo cache when names change — is inverted via a subscription hook
 * (`onColorNamesChange`): the parser SUBSCRIBES its cache-clear at module load;
 * the registry NOTIFIES on every mutation WITHOUT importing the parser. The
 * dependency edge now points parser → registry (parsing already depends on
 * units), never registry → parser. `./color` reaches this module cleanly; the
 * grammar is gone from its graph.
 */

const customColorNames = new Map<string, string>();

/** Subscribers notified after every registry mutation (the parser's memo-cache
 *  invalidation, registered from `parsing/color.ts`). */
const changeListeners = new Set<() => void>();

/**
 * Subscribe a listener fired after every `registerColorNames` /
 * `clearCustomColorNames` mutation. Returns an unsubscribe function.
 *
 * This is the inversion that severs the registry → parser edge: the parser
 * registers its `parseCSSColor.cache.clear()` here at module load rather than
 * the registry reaching into the parser. The registry stays parse-that-free.
 */
export function onColorNamesChange(listener: () => void): () => void {
    changeListeners.add(listener);
    return () => {
        changeListeners.delete(listener);
    };
}

function notifyColorNamesChanged(): void {
    for (const listener of changeListeners) {
        listener();
    }
}

/**
 * The live custom-name map, exposed for the parser's map-first lookup
 * (`parsing/color.ts` reads it directly on the hot path). Read-only to callers
 * outside this module — mutate ONLY through `registerColorNames` /
 * `clearCustomColorNames` so the change-notification fires.
 */
export function getCustomColorNamesMap(): ReadonlyMap<string, string> {
    return customColorNames;
}

/**
 * Register custom color names that `parseCSSColor` resolves to their CSS value.
 * Names are matched case-insensitively (trimmed + lowercased on both register
 * and lookup).
 *
 * PRECEDENCE — custom names SHADOW built-in CSS color names (N.W7.B-F7). When a
 * registered name collides with a built-in (e.g. `registerColorNames({ red:
 * "#00ff00" })` then `parseCSSColor("red")`), the **custom** value wins — `red`
 * resolves to green. This is by design: the map is consulted before the rich
 * parser, so a registered name always takes precedence over the spec name it
 * collides with. To restore the built-in, `clearCustomColorNames()` (or
 * re-register the name to its canonical value). Names with no built-in
 * collision simply extend the recognised set.
 */
export function registerColorNames(names: Record<string, string>): void {
    for (const [name, css] of Object.entries(names)) {
        customColorNames.set(name.trim().toLowerCase(), css);
    }
    // Custom-name registration changes the resolution of unrecognized inputs;
    // notify subscribers so the parser's fallback memo re-runs.
    notifyColorNamesChanged();
}

export function clearCustomColorNames(): void {
    customColorNames.clear();
    notifyColorNamesChanged();
}

export function getCustomColorNames(): ReadonlyMap<string, string> {
    return customColorNames;
}
