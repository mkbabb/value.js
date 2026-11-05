// @vitest-environment node
// SERVED MODEL: claude-opus-5-5
//
// E-6 — the emitted parsers' size ceilings, held by a test. Each file under
// `src/css/bbnf/generated/` is minified the way the gate reads it (esbuild
// `--minify --loader=js`) and gzipped at the default level; the result must
// sit at or under its ceiling in `e6-ceilings.json`. The ceilings are ruled
// figures (COHESION §0hy, ESC-W10-1: 15,200 / 6,100 gz), so a crossing is a
// ruling to ask for, not bytes to shave.

import { readFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

import { transformSync } from "esbuild";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "../..");
const config = JSON.parse(
    readFileSync(path.join(import.meta.dirname, "e6-ceilings.json"), "utf8"),
) as { files: Record<string, { gz: number }> };

function minifiedGzipBytes(file: string): number {
    const source = readFileSync(path.join(root, file), "utf8");
    const { code } = transformSync(source, { minify: true, loader: "js" });
    return gzipSync(code).length;
}

describe("E-6 emitted-parser size ceilings", () => {
    it("names both emitted files at the ruled ceilings", () => {
        expect(config.files).toEqual({
            "src/css/bbnf/generated/grammar.js": { gz: 15200 },
            "src/css/bbnf/generated/color.js": { gz: 6100 },
        });
    });

    for (const [file, { gz }] of Object.entries(config.files)) {
        it(`${file} fits in ${gz} B of minified gzip`, () => {
            expect(minifiedGzipBytes(file)).toBeLessThanOrEqual(gz);
        });
    }
});
