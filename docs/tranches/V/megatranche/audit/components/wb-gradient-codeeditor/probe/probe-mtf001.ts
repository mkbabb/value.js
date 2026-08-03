/**
 * CHALLENGE-C probe — MT-F001 propagation through the gradient code editor's
 * parse path. Read-only; drives the SHIPPING modules, no source edits.
 *
 * Run:
 *   npx vite-node --config docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe/probe.config.ts \
 *                 docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/probe/probe-mtf001.ts
 */
import { parseGradientCSS } from "../../../../../../../../demo/workbenches/gradient/composables/gradientParse";

// Mid-edit states a user actually produces while editing the SEEDED canonical
// text `linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)`.
const CASES = [
    // seeded text, untouched
    "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
    // select the first oklch's args and delete them (one gesture)
    "linear-gradient(90deg, oklch() 0%, oklch(0.65 0.18 265) 100%)",
    // backspace the last arg char-by-char: the terminal state before the paren
    "linear-gradient(90deg, oklch( ) 0%, oklch(0.65 0.18 265) 100%)",
    // swap a literal to rgb and pause before typing channels
    "linear-gradient(90deg, rgb() 0%, blue 100%)",
    "linear-gradient(90deg, hsl(  ) 0%, blue 100%)",
    "linear-gradient(90deg, lab() 0%, blue 100%)",
    "linear-gradient(90deg, lch() 0%, blue 100%)",
    "linear-gradient(90deg, oklab() 0%, blue 100%)",
    "linear-gradient(90deg, color() 0%, blue 100%)",
    // the empty function in the SECOND (trailing) stop
    "linear-gradient(90deg, red, oklch())",
    // control: a plain unparseable token must REJECT, not throw
    "linear-gradient(90deg, notacolor, blue)",
];

for (const css of CASES) {
    let out: string;
    try {
        const r = parseGradientCSS(css);
        out = r.ok ? "OK (model applied)" : `reject: ${r.reason}`;
    } catch (e) {
        out = `**THROWS** ${(e as Error).constructor.name}: ${(e as Error).message}`;
    }
    console.log(`${JSON.stringify(css)}\n    -> ${out}`);
}
