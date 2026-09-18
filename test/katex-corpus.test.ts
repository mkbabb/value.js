/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the KaTeX corpus oracle (fold R21 / NG-9).
 *
 * BORN-RED WITNESS (measured at authoring, read-only):
 *   · `grep -rl katex test/ e2e/ demo/test/` → 0 — the About pane's entire
 *     mathematical surface had ZERO coverage of any species;
 *   · the 64 call sites live in the `assets/docs` markdown, which `tsconfig.demo.json`
 *     EXCLUDES (`assets/` is outside its include), which eslint ignores
 *     (its markdown ignore glob), and which the Tailwind scan never reaches (`class=` in
 *     assets/docs = 0);
 *   · `grep -c 'katex|about'` over the 92-shot visual corpus → 0.
 *   So a broken expression could not be caught by the typecheck, the lint, the
 *   unit suite, or a screenshot. K-7's exact mutation genuinely kept every gate
 *   green.
 *
 * WHY A UNIT ORACLE AND NOT A ROUTE MATRIX: About is a PANE
 * (`demo/shell/viewSchema.ts`), not a route, so it is unreachable by a route
 * cross-product — the structural reason the visual matrix could not have
 * covered it either. `renderToString` is the same KaTeX entry point the
 * component drives, one layer below the SFC.
 *
 * `throwOnError: true` here, deliberately, while `Katex.vue` ships
 * `throwOnError: false`. The shipped default is a RENDERING choice (a bad
 * expression paints in red rather than blanking the pane); it is not a
 * correctness claim, and reading the corpus through it would make this oracle
 * pass on an expression KaTeX cannot parse. The gate reads the parse.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import katex from "katex";
import { describe, expect, it } from "vitest";

// `process.cwd()` is the vitest root (this repo's root — `vitest.config.ts`
// sits there). `import.meta.url` is NOT a `file:` URL under the vitest/jsdom
// transform, so `fileURLToPath` throws at module scope.
const DOCS = resolve(process.cwd(), "assets/docs");

/** Every `<Katex expression="…">` in the shipped About corpus, with its home. */
function corpus(): { file: string; expression: string }[] {
    const rows: { file: string; expression: string }[] = [];
    for (const name of readdirSync(DOCS).sort()) {
        if (!name.endsWith(".md")) continue;
        const text = readFileSync(join(DOCS, name), "utf8");
        for (const m of text.matchAll(/<Katex\b[^>]*?expression="([^"]*)"/g)) {
            rows.push({ file: name, expression: m[1]! });
        }
    }
    return rows;
}

const ROWS = corpus();

describe("the About corpus is typesettable — every shipped KaTeX expression", () => {
    it("is discovered: the corpus is non-empty and lives where the pane reads it", () => {
        // A census that silently found nothing would report green forever; this
        // is the denominator's own guard (L-19).
        expect(ROWS.length).toBeGreaterThan(0);
        expect(new Set(ROWS.map((r) => r.file)).size).toBeGreaterThan(1);
    });

    for (const { file, expression } of ROWS) {
        it(`${file} · ${expression.slice(0, 60)}`, () => {
            expect(() =>
                katex.renderToString(expression, {
                    displayMode: true,
                    throwOnError: true,
                    output: "htmlAndMathml",
                }),
            ).not.toThrow();
        });
    }

    it("renders BOTH layers — the HTML layer and the MathML accessibility layer", () => {
        // AB-1's cure was to make the stylesheet reach the injected nodes; the
        // accessibility half of `output: "htmlAndMathml"` is what the hidden
        // MathML layer exists for, and a silent drop to `html` only would take
        // the About pane off the accessibility tree without any other signal.
        const html = katex.renderToString(ROWS[0]!.expression, {
            displayMode: true,
            throwOnError: true,
            output: "htmlAndMathml",
        });
        expect(html).toContain("katex-mathml");
        expect(html).toContain("katex-html");
    });
});
