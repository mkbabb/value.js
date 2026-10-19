// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — THE RETIRED HAND PARSER, for the bench of record only. `src/css/grammar.ts` (the
// hand-rolled parser value.js shipped through 4.1.0) is deleted from the product at X.P.W6.x;
// nothing in `src/` reads it. The bench and the differential still need it as the INCUMBENT, so it
// is read back from git history — never copied into the tree: `git archive` materializes the
// pinned commit's `src/` into a temporary directory outside the repository, and the module is
// imported from there. The blob is pinned, so the incumbent cannot drift.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import type { CssList, CssScalar, CssValue } from "../src/value";
import type { CssColor, CssTimingFunction, KeyframeSelector, ParseResult, Stylesheet } from "../src/css/types";

/** The last commit whose `src/css/grammar.ts` is the shipping hand parser, and that file's blob. */
export const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
export const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";

const REPO = path.resolve(import.meta.dirname, "..");

export type HandParser = Readonly<{
    parseCssColor(source: string): ParseResult<CssColor>;
    parseCssScalar(source: string): ParseResult<CssScalar>;
    parseCssValue(source: string): ParseResult<CssValue>;
    parseCssValues(source: string): ParseResult<CssList>;
    parseKeyframeSelector(source: string): ParseResult<KeyframeSelector>;
    parseTimingFunction(source: string): ParseResult<CssTimingFunction>;
}>;

/** Materializes `src/` at `RETIRED_AT` (once per host); answers the path of one of its modules. */
export function retiredModule(relative: string): string {
    const git = (...args: string[]) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8" }).trim();
    const blob = git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`);
    if (blob !== RETIRED_BLOB) throw new Error(`retired hand parser blob ${blob} ≠ pinned ${RETIRED_BLOB}`);
    const root = path.join(tmpdir(), `value-js-retired-${RETIRED_AT.slice(0, 12)}`);
    if (!existsSync(path.join(root, "src", "css", "grammar.ts"))) {
        mkdirSync(root, { recursive: true });
        execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${root}"`]);
    }
    return path.join(root, "src", relative);
}

/** The retired hand parser's six entries. */
export async function retiredHandParser(): Promise<HandParser> {
    return (await import(/* @vite-ignore */ retiredModule("css/grammar.ts"))) as HandParser;
}

/** The retired stylesheet layer (`parseStylesheet` over the hand parser and its scanners). */
export async function retiredStylesheet(): Promise<Readonly<{ parseStylesheet(source: string): ParseResult<Stylesheet> }>> {
    return (await import(/* @vite-ignore */ retiredModule("css/stylesheet.ts"))) as { parseStylesheet(source: string): ParseResult<Stylesheet> };
}
