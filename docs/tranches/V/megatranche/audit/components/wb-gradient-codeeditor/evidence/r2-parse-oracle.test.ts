// CHALLENGE-C r2 — the crash oracle, run through vitest so it resolves
// `@mkbabb/value.js/css` EXACTLY as the demo does.
//   npx vitest run docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r2-parse-oracle.test.ts
import { describe, it } from "vitest";
import { parseCssColor } from "@mkbabb/value.js/css";
import { parseGradientCSS } from "../../../../../../../../demo/workbenches/gradient/composables/gradientParse";

const EMPTY = [
    "oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hwb()",
    "hsl(  )", "rgb( )", "oklch(0.7 0.1 145)",
];

describe("MT-F001 blast radius through the gradient code editor's own path", () => {
    it("parseCssColor: throw vs failure-value", () => {
        for (const src of EMPTY) {
            let verdict: string;
            try {
                verdict = `returns ok=${parseCssColor(src).ok}`;
            } catch (e) {
                verdict = `THROWS ${(e as Error).name}: ${(e as Error).message}`;
            }
            console.log(`parseCssColor(${JSON.stringify(src)}) → ${verdict}`);
        }
    });

    it("parseGradientCSS: the editor's real entry point", () => {
        const cases = [
            "linear-gradient(90deg, oklch(), blue)",
            "linear-gradient(90deg, rgb(), blue)",
            "linear-gradient(90deg, red, hsl(  ))",
            "linear-gradient(90deg, color(), blue)",
            "radial-gradient(oklch(), blue)",
            "linear-gradient(90deg, red, blue)",
        ];
        for (const src of cases) {
            let verdict: string;
            try {
                const r = parseGradientCSS(src);
                verdict = r.ok ? "ok" : `reject: ${r.reason}`;
            } catch (e) {
                verdict = `THROWS ${(e as Error).name}: ${(e as Error).message}`;
            }
            console.log(`parseGradientCSS(${JSON.stringify(src)}) → ${verdict}`);
        }
    });

    it("the mid-typing prefix ladder a user actually produces", () => {
        const full = "linear-gradient(90deg, oklch(0.7 0.1 145), blue)";
        for (let i = 1; i <= full.length; i++) {
            const prefix = full.slice(0, i);
            // The user's text is only ever a prefix + the auto-closed paren the
            // editor never adds; test the bare prefix, which is what is fed.
            try {
                parseGradientCSS(prefix);
            } catch (e) {
                console.log(
                    `THROWS at prefix len ${i}: ${JSON.stringify(prefix)} → ${(e as Error).message}`,
                );
                break;
            }
        }
    });
});
