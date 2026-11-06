// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — THE RETIRED HAND PARSER, for the bench of record only. `src/css/grammar.ts` (the
// hand-rolled parser value.js shipped through 4.1.0) is deleted from the product at X.P.W6.x;
// nothing in `src/` reads it. The bench and the differential still need it as the INCUMBENT, so it
// is read back from git history — never copied into the tree: `git archive` materializes the
// pinned commit's `src/` into a repo-local cache under `node_modules/.cache/` (ignored by the
// `node_modules/` rule, and durable across reboots, unlike the system temp dir), and the module is
// imported from there. The tree is extracted into a unique sibling directory and renamed into place,
// so a reader never sees a partial tree. The blob is pinned, so the incumbent cannot drift.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

import type { CssList, CssScalar, CssValue } from "../src/value";
import type { CssColor, CssTimingFunction, KeyframeSelector, ParseResult, Stylesheet } from "../src/css/types";

/** The last commit whose `src/css/grammar.ts` is the shipping hand parser, and that file's blob. */
export const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
export const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";

const REPO = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(REPO, "node_modules", ".cache");

export type HandParser = Readonly<{
    parseCssColor(source: string): ParseResult<CssColor>;
    parseCssScalar(source: string): ParseResult<CssScalar>;
    parseCssValue(source: string): ParseResult<CssValue>;
    parseCssValues(source: string): ParseResult<CssList>;
    parseKeyframeSelector(source: string): ParseResult<KeyframeSelector>;
    parseTimingFunction(source: string): ParseResult<CssTimingFunction>;
}>;

/**
 * Materializes `src/` at `RETIRED_AT` (once per host); answers the REAL path of one of its modules.
 *
 * The path is canonical (`realpathSync`) because vite loads a module by its realpath while
 * `vi.doMock` keys on the id it is given: in a checkout whose `node_modules` is a symlink (a git
 * worktree sharing the primary's), a symlinked path would mock a module nothing loads, and the
 * stylesheet differential's HYBRID would silently be the retired layer (X §0hw adversarial check,
 * finding 1: RC-P(4.2.0) C3 read DEFECT 1304 from the instrument, not the parser).
 */
export function retiredModule(relative: string): string {
    const git = (...args: string[]) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8" }).trim();
    const blob = git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`);
    if (blob !== RETIRED_BLOB) throw new Error(`retired hand parser blob ${blob} ≠ pinned ${RETIRED_BLOB}`);
    const name = `value-js-retired-${RETIRED_AT.slice(0, 12)}`;
    const root = path.join(CACHE, name);
    if (!existsSync(root)) {
        mkdirSync(CACHE, { recursive: true });
        const staging = mkdtempSync(path.join(CACHE, `.${name}-`));
        execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${staging}"`]);
        try {
            renameSync(staging, root);
        } catch (error) {
            // A concurrent worker renamed its complete tree into place first; that tree is the same pinned bytes.
            const code = (error as NodeJS.ErrnoException).code;
            if ((code !== "ENOTEMPTY" && code !== "EEXIST") || !existsSync(root)) throw error;
            rmSync(staging, { recursive: true, force: true });
        }
    }
    return path.join(realpathSync(root), "src", relative);
}

/** The retired hand parser's six entries. */
export async function retiredHandParser(): Promise<HandParser> {
    return (await import(/* @vite-ignore */ retiredModule("css/grammar.ts"))) as HandParser;
}

/** The retired stylesheet layer (`parseStylesheet` over the hand parser and its scanners). */
export async function retiredStylesheet(): Promise<Readonly<{ parseStylesheet(source: string): ParseResult<Stylesheet> }>> {
    return (await import(/* @vite-ignore */ retiredModule("css/stylesheet.ts"))) as { parseStylesheet(source: string): ParseResult<Stylesheet> };
}
