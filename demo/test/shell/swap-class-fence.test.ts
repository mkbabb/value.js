/**
 * The pane swap's classes (`vj-enter-*`) move on the card's root at the
 * enter's second frame and again at its end. A rule keyed on one of them
 * whose subject is every element below the card (`… > .glass-resting > *`)
 * makes each move restyle the whole card: on Palettes -> Home at 390, About's
 * 1,400 elements, 71 ms of style at the second frame and 52 ms at the end on
 * a phone at 4x CPU. The arriving text fades on the Web Animations API
 * instead (PaneSlot's `dealText`). Fenced here: no rule in the demo's styles
 * keys a universal subject on the swap's classes.
 */
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const DEMO = resolve(import.meta.dirname, "../..");

function sources(): string[] {
    return (readdirSync(DEMO, { recursive: true }) as string[])
        .filter((f) => /\.(css|vue)$/.test(f) && !f.split(/[\\/]/).includes("node_modules"))
        .map((f) => join(DEMO, f));
}

/** Every selector in a stylesheet's text (comments dropped; at-rule preludes are harmless here). */
function selectors(text: string): string[] {
    const css = text.replace(/\/\*[\s\S]*?\*\//g, "");
    return [...css.matchAll(/([^{};]+)\{/g)].flatMap((m) => m[1]!.split(",").map((s) => s.trim()));
}

describe("the swap's classes never key a whole-card restyle", () => {
    it("no selector keyed on a vj-enter class has a universal subject", () => {
        const offenders: string[] = [];
        for (const file of sources()) {
            const text = readFileSync(file, "utf8");
            if (!text.includes("vj-enter")) continue;
            for (const sel of selectors(text)) {
                if (sel.includes("vj-enter") && /(^|[\s>+~])\*\s*$/.test(sel)) {
                    offenders.push(`${file.slice(DEMO.length + 1)}: ${sel}`);
                }
            }
        }
        expect(offenders).toEqual([]);
    });
});
