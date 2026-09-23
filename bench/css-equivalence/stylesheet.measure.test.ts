// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — `parseStylesheet` over `stylesheet.bbnf` against the retired stylesheet layer (the hand
// block/prelude scanners over the hand parser, `src/css/stylesheet.ts` @ `RETIRED_AT`, read back from
// git by `../retired.ts`). The six-entry differential (`equivalence.measure.test.ts`) has no cell for
// a whole sheet (R-h-1); this one reads every sheet of the corpus through both layers.
//
// SHEETS: every CSS file and every SFC `<style>` block of value.js's demo and of keyframes.js (each
// at its pinned commit), whole and cut at 16 points (every prefix is a sheet, so the rule-list
// faults — an unclosed comment, block or prelude — are exercised where real text breaks), and every
// source of the two value corpora read as a sheet.
//
// THE ISOLATION: the retired layer is read TWICE. As shipped (`retired`), it differs from HEAD by the
// value grammar as well as by the sheet grammar — the value grammar's divergences are the six-entry
// differential's to classify, and this file only counts them. As a HYBRID — the retired sheet layer
// with its six value entries replaced by HEAD's BBNF entries (`vi.doMock` of the retired
// `grammar.ts`; its scanners, result law and tables stay the retired ones) — it differs from HEAD by
// the sheet grammar ALONE. Every hybrid ≠ HEAD cell is a STYLESHEET DEFECT unless it is one of the
// named, spec-ruled classes below (`SHEET_CLASSES`); the gate is STYLESHEET DEFECTS 0.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it, vi } from "vitest";

import * as bbnf from "../../src/css/bbnf/index";
import * as css from "../../src/css/index";
import { parseStylesheet } from "../../src/css/index";
import type { ParseResult, Stylesheet } from "../../src/css/types";
import { retiredModule, retiredStylesheet } from "../retired";

const retired = await retiredStylesheet();
vi.resetModules();
vi.doMock(retiredModule("css/grammar.ts"), async (importOriginal) => ({
    ...(await importOriginal<Record<string, unknown>>()),
    parseCssColor: bbnf.parseCssColor,
    parseCssScalar: bbnf.parseCssScalar,
    parseCssValue: bbnf.parseCssValue,
    parseCssValues: bbnf.parseCssValues,
    parseKeyframeSelector: bbnf.parseKeyframeSelector,
    parseTimingFunction: bbnf.parseTimingFunction,
}));
const hybrid = await retiredStylesheet();
type Entry = (source: string) => ParseResult<unknown>;
const retiredTimeline = (await import(/* @vite-ignore */ retiredModule("css/timeline.ts"))) as Record<"parseAnimationTimeline" | "parseAnimationRange", Entry>;
const REPO = path.resolve(import.meta.dirname, "..", "..");
const read = (file: string) => JSON.parse(readFileSync(path.join(import.meta.dirname, file), "utf8"));

const real = read("real-corpus.json") as { provenance: { valueJs: string; keyframesJs: string }; rows: { s: string }[] };
const assay = read("assay-corpus.json") as { rows: { s: string | { src: string } }[] };

const STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g;
function sheetsAt(repo: string, sha: string, root: string): string[] {
    const git = (...args: string[]) => execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 1 << 28 });
    const files = git("ls-tree", "-r", "--name-only", sha, "--", root)
        .split("\n")
        .filter((f) => f.endsWith(".css") || f.endsWith(".vue"));
    return files.flatMap((f) => {
        const text = git("show", `${sha}:${f}`);
        return f.endsWith(".css") ? [text] : [...text.matchAll(STYLE)].map((m) => m[1] ?? "");
    }).filter((t) => t.trim());
}

const whole = [
    ...sheetsAt(REPO, real.provenance.valueJs, "demo"),
    ...sheetsAt(path.resolve(REPO, "..", "keyframes.js"), real.provenance.keyframesJs, "."),
];
const cut = (sheet: string) => Array.from({ length: 16 }, (_, i) => sheet.slice(0, Math.floor((sheet.length * (i + 1)) / 17)));
const SHEETS = [...new Set([
    ...whole,
    ...whole.flatMap(cut),
    ...real.rows.map((r) => r.s),
    ...assay.rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src)),
])];

/**
 * SH-1 · UNMATCHED DELIMITER (css-syntax-3 §5.4.8 — a `(`-block runs to its matching `)`; a `)` with
 * no `(` closes nothing). The retired layer counted parentheses with a signed depth: a stray `)` drove
 * it negative and an unclosed `(` hid every later `;`/`{`, so it read `a { backgrou(d-color: red }` as
 * a declaration NAMED `backgrou(d-color`. `stylesheet.bbnf` reads a `(` only as the start of a block
 * that closes, and refuses the text. The class governs a cell only when HEAD refuses the sheet
 * (fail-closed) and removing exactly the unmatched `(`/`)` — found outside strings and comments —
 * makes the two layers agree: the delimiter is then the whole of the difference.
 */
function withoutUnmatchedDelimiters(sheet: string): string | null {
    const open: number[] = [];
    const unmatched: number[] = [];
    let quote = "";
    for (let i = 0; i < sheet.length; i++) {
        const char = sheet.charAt(i);
        if (quote) {
            if (char === "\\") i++;
            else if (char === quote) quote = "";
        } else if (sheet.startsWith("/*", i)) {
            const end = sheet.indexOf("*/", i + 2);
            if (end < 0) break;
            i = end + 1;
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "(") open.push(i);
        else if (char === ")") {
            if (open.pop() === undefined) unmatched.push(i);
        }
    }
    unmatched.push(...open);
    if (unmatched.length === 0) return null;
    const drop = new Set(unmatched);
    return [...sheet].filter((_, i) => !drop.has(i)).join("");
}

const SHEET_CLASSES: Readonly<Record<string, (sheet: string, after: ParseResult<Stylesheet>) => boolean>> = {
    "SH-1": (sheet, after) => {
        if (after.ok) return false;
        const repaired = withoutUnmatchedDelimiters(sheet);
        if (repaired === null) return false;
        const a = hybrid.parseStylesheet(repaired);
        const b = parseStylesheet(repaired);
        return isDeepStrictEqual(a, b) || (!a.ok && !b.ok);
    },
};

type Parse = (sheet: string) => ParseResult<Stylesheet>;

/** Every sheet classified: HEAD (`candidate`) against the retired layer, then the hybrid, then SH-1. */
function census(sheets: readonly string[], candidate: Parse) {
    const tally = { AGREE: 0, VALUE_GRAMMAR: 0, BOTH_REFUSE: 0, DEFECT: 0 };
    const classes: Record<string, number> = {};
    const defects: string[] = [];
    for (const sheet of sheets) {
        const after = candidate(sheet);
        if (isDeepStrictEqual(retired.parseStylesheet(sheet), after)) { tally.AGREE++; continue; }
        const before = hybrid.parseStylesheet(sheet);
        if (isDeepStrictEqual(before, after)) { tally.VALUE_GRAMMAR++; continue; }
        // The carried convention (`differential.ts`): a cell both layers REFUSE agrees — the
        // verdict and the value are compared, a refusal's span and label are not.
        if (!before.ok && !after.ok) { tally.BOTH_REFUSE++; continue; }
        const governing = Object.entries(SHEET_CLASSES).find(([, explains]) => explains(sheet, after));
        if (governing) { classes[governing[0]] = (classes[governing[0]] ?? 0) + 1; continue; }
        tally.DEFECT++;
        if (defects.length < 40) defects.push(`${JSON.stringify(sheet.slice(0, 160))}\n   before ${JSON.stringify(before).slice(0, 300)}\n   after  ${JSON.stringify(after).slice(0, 300)}`);
    }
    return { tally, classes, defects };
}

describe("X.P.W6.x — parseStylesheet: stylesheet.bbnf ≡ the retired stylesheet layer", () => {
    it(`${SHEETS.length} sheets: STYLESHEET DEFECTS 0`, () => {
        const { tally, classes, defects } = census(SHEETS, parseStylesheet);
        console.log(`parseStylesheet × ${SHEETS.length}: ${JSON.stringify(tally)} · classes ${JSON.stringify(classes)} · STYLESHEET DEFECTS ${tally.DEFECT}`);
        for (const d of defects) console.log(d);
        expect(defects).toEqual([]);
    }, 600_000);

    // The timeline entries read no value grammar, so the retired entry and HEAD's differ by the sheet
    // grammar alone; the verdict and the value are compared (a double refusal agrees).
    const HEAD_TIMELINE: Record<"parseAnimationTimeline" | "parseAnimationRange", Entry> = {
        parseAnimationTimeline: css.parseAnimationTimeline,
        parseAnimationRange: css.parseAnimationRange,
    };
    for (const entry of ["parseAnimationTimeline", "parseAnimationRange"] as const) {
        it(`${entry} × ${SHEETS.length} sources: STYLESHEET DEFECTS 0`, () => {
            const misses: string[] = [];
            let agree = 0;
            for (const source of SHEETS) {
                const before = retiredTimeline[entry](source);
                const after = HEAD_TIMELINE[entry](source);
                if (isDeepStrictEqual(before, after) || (!before.ok && !after.ok)) { agree++; continue; }
                misses.push(`${JSON.stringify(source.slice(0, 120))} before ${JSON.stringify(before).slice(0, 200)} after ${JSON.stringify(after).slice(0, 200)}`);
            }
            console.log(`${entry} × ${SHEETS.length}: AGREE ${agree} · STYLESHEET DEFECTS ${misses.length}`);
            expect(misses.slice(0, 20)).toEqual([]);
        }, 300_000);
    }

    // The instrument can fail: a sheet layer that drops `!important` reads RED on every sheet that has one.
    it("falsifier: a planted sheet-layer defect reads RED", () => {
        const planted: Parse = (sheet) => {
            const r = parseStylesheet(sheet);
            return r.ok ? { ...r, value: JSON.parse(JSON.stringify(r.value).replaceAll('"important":true', '"important":false')) } : r;
        };
        const sheets = ["a { color: red !important }", ".b { gap: 1px !important; }", "@scope (.c) { d { top: 0 !important } }"];
        expect(census(sheets, planted).tally.DEFECT).toBe(3);
    });
});
