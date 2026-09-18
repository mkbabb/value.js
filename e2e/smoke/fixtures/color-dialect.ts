/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — THE ORACLE DIALECT LAW, as an instrument (fold R3 / NG-2).
 *
 * THE DISEASE. The chip and plate oracles compared the app's own serializer
 * output to a HAND-ROLLED REGEX that cannot parse it. `o14`'s
 * `parseOklchTriples` matched `/oklch\(([\d.]+)[ ,]+…/` — a component-level
 * pattern whose separator class cannot cross a `%` or a `deg`, while
 * `grammar.ts:309` emits `oklch(62% 0.27 9.8deg)`. Measured: **0** matches on
 * the shipped dialect against **1** on the canonical form, while the same test
 * asserted `painted.length === stamped.length` — so the leg was defective on
 * BOTH branches (17-vs-0 RED, or 0-vs-0 VACUOUS). `o20` had the same disease in
 * its terminal form, comparing `data-stops` to `getComputedStyle()` by STRING
 * EQUALITY across two encodings, with a comment claiming *"byte-identical
 * rgb() strings"* the serializer has never produced — its own record calls it
 * *"unfixable as written"*. No green paint-oracle existed for either chip
 * species anywhere in the repository.
 *
 * THE CURE, verbatim from PreviewRamp R-2's lock: *"pass both sides through the
 * app's own parser, one encoding, the GenerateControls G1 precedent."*
 *
 * The app's own encoder, at the layer these oracles actually compare at, is the
 * **CSSOM** — the same engine that produced the `background-image` one side is
 * read from. So both sides are set on a probe element and read back as computed
 * values: whatever dialect a stamp is written in, the engine canonicalizes it
 * to the one form, and equality becomes a fact about colour rather than about
 * notation. No regex ever reads a component here. The only scanning done is
 * PAREN-BALANCED extraction of whole colour functions out of a gradient string,
 * which is dialect-blind by construction.
 *
 * WHY NOT `@mkbabb/value.js/css`'s `parseCssColor`: it is the app's parser for
 * the app's own values, but a spec body runs in NODE, and the package does not
 * install itself — reaching it would mean importing a built `dist/` path from
 * `e2e/`, re-coupling the browser suite to a build artifact and to a tree later
 * waves will move. The CSSOM is in the page, needs no build, and is the exact
 * encoder that produced the value under test.
 */
import type { Page } from "@playwright/test";

/** The CSS colour-function heads a stop may be written in. */
const COLOR_HEADS = [
    "oklch",
    "oklab",
    "lch",
    "lab",
    "hsl",
    "hsla",
    "hwb",
    "rgb",
    "rgba",
    "color",
    "color-mix",
];

/**
 * Every whole colour function inside `value`, extracted by PAREN BALANCE.
 *
 * Dialect-blind on purpose: it never looks inside the parentheses, so a `%`, a
 * `deg`, a `none`, an alpha slash or a nested `color-mix()` cannot break it —
 * which is precisely how the regex this replaces broke.
 */
export function extractColorFunctions(value: string): string[] {
    const out: string[] = [];
    for (let i = 0; i < value.length; i++) {
        const head = COLOR_HEADS.find(
            (h) =>
                value.startsWith(h, i) &&
                value[i + h.length] === "(" &&
                // a head must start at a token boundary, never mid-identifier
                (i === 0 || !/[A-Za-z0-9_-]/.test(value[i - 1]!)),
        );
        if (!head) continue;
        let depth = 0;
        let j = i + head.length;
        for (; j < value.length; j++) {
            if (value[j] === "(") depth++;
            else if (value[j] === ")") {
                depth--;
                if (depth === 0) break;
            }
        }
        if (depth !== 0) continue; // unbalanced — not a colour function
        out.push(value.slice(i, j + 1));
        i = j;
    }
    return out;
}

/**
 * Canonicalize each CSS colour through the PAGE's own CSSOM.
 *
 * `null` for a value the engine refuses, so an unparseable stamp reports itself
 * instead of silently inheriting the probe's colour and matching by accident —
 * the sentinel below is what makes that detectable.
 */
export async function canonicalizeColors(
    page: Page,
    values: string[],
): Promise<(string | null)[]> {
    return page.evaluate((vals: string[]) => {
        const probe = document.createElement("span");
        probe.style.display = "none";
        document.body.appendChild(probe);
        // A colour no stop will ever be. If setting a value leaves the computed
        // colour at the sentinel, the engine REFUSED it.
        const SENTINEL = "rgb(1, 2, 3)";
        const out = vals.map((v) => {
            probe.style.color = SENTINEL;
            probe.style.color = v;
            const computed = getComputedStyle(probe).color;
            return computed === SENTINEL ? null : computed;
        });
        probe.remove();
        return out;
    }, values);
}

/**
 * The two sides of a paint oracle, in ONE encoding.
 *
 * `painted` is a computed `background-image` (or any value carrying colour
 * stops); `stamped` is the authored token list the element declares. Both come
 * back canonicalized by the same engine, so a comparison between them is a
 * comparison of colours.
 */
export async function canonicalStops(
    page: Page,
    painted: string,
    stamped: string[],
): Promise<{ painted: (string | null)[]; stamped: (string | null)[] }> {
    const paintedFns = extractColorFunctions(painted);
    const stampedFns = stamped.flatMap((token) =>
        // A token may itself be a whole stop list; if it holds no colour
        // function it IS the colour (a keyword or a hex).
        extractColorFunctions(token).length > 0
            ? extractColorFunctions(token)
            : [token.trim()],
    );
    return {
        painted: await canonicalizeColors(page, paintedFns),
        stamped: await canonicalizeColors(page, stampedFns),
    };
}
