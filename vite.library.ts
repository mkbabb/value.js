import { resolve } from "node:path";

const ENTRY_NAMES = ["color", "value", "css", "easing", "math", "transform", "quantize"] as const;

export function libraryEntries(rootDir: string): Record<string, string> {
    return Object.fromEntries(ENTRY_NAMES.map((name) => [name, resolve(rootDir, `src/subpaths/${name}.ts`)]));
}

export function libraryFileName(_format: string, entryName: string): string {
    return `subpaths/${entryName}.js`;
}

export const libraryExternal: string[] = [];

/**
 * X-W12U `.g2s2` (COHESION §0ft.1) — the library's chunk graph. Every `dist/subpaths/*.js` is a
 * re-export FACADE over shared chunks: no entry carries a module's own statements, because a
 * consumer's bundler places code per MODULE, so an entry that held the stylesheet grammar pinned the
 * whole grammar into any eager chunk that imported one name from it (`g2s/chunk-exp`). Each group
 * claims its modules before the next (higher `priority` first; a group also takes the dependencies
 * no earlier group claimed), so the leaf areas are claimed before the grammars that import them:
 *   - the colour, math and result leaves, and the value/easing/quantize/transform capabilities;
 *   - `serialize` (`serializeCssColor` and the value serializers; no grammar);
 *   - `actions`: the math and colour action tables BOTH grammars bind (`math`/`color`/`mix`);
 *   - `color-grammar`: `color.bbnf` compiled alone, its action table and `parseCssColor`;
 *   - `css-grammar`: the stylesheet grammar, the parser instance and every reader that calls it.
 * The grammar instances (`createParser(...)` at module load) live only in their grammar's chunk, so
 * an eager colour import from `./css` or `./color` leaves the stylesheet grammar lazy.
 */
const area = (pattern: string): RegExp => new RegExp(`[\\\\/]src[\\\\/]${pattern}`);

export const libraryCodeSplitting = {
    groups: [
        { name: "result", test: area("(?:foundation[\\\\/]result|css[\\\\/]result)\\.ts$"), priority: 100 },
        { name: "math", test: area("foundation[\\\\/]math\\.ts$"), priority: 95 },
        { name: "anchors", test: area("color[\\\\/]anchors\\.ts$"), priority: 90 },
        { name: "color", test: area("color[\\\\/]"), priority: 85 },
        { name: "value", test: area("value\\.ts$"), priority: 80 },
        { name: "easing", test: area("easing\\.ts$"), priority: 80 },
        { name: "quantize", test: area("quantize\\.ts$"), priority: 80 },
        { name: "transform", test: area("transform[\\\\/]"), priority: 80 },
        { name: "serialize", test: area("css[\\\\/]serialize\\.ts$"), priority: 75 },
        { name: "actions", test: area("css[\\\\/](?:named-colors|bbnf[\\\\/](?:math|color|mix))\\.ts$"), priority: 70 },
        { name: "color-grammar", test: area("css[\\\\/]bbnf[\\\\/](?:color-parse|color-actions|generated[\\\\/]color)\\.[jt]s$"), priority: 60 },
        { name: "css-grammar", test: area("css[\\\\/]"), priority: 50 },
    ],
};
