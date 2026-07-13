import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// U.W-ORACLE · U-F43 — G-ORACLE-4 (born-RED → GREEN).
//
// THE UNIT SUITE MUST NEVER BUILD DIST. A full `npm run build` inside a vitest
// `beforeAll` (the retired `dts-published-surface.test.ts:23` pattern) spent
// ~70–80% of the unit-suite wall time compiling dist for two string checks. The
// build's rightful home is the post-build `test:dist` slate (`package.json`),
// where the build ALREADY runs as the slate's first step — so a dist-surface
// check there reads the fresh dist for FREE (see `scripts/gates/proof-dts-
// surface.mjs`).
//
// This gate is the standing tripwire that keeps a build from EVER creeping back
// into the vitest unit suite. It walks the whole `test/` tree and fails while
// ANY unit-test file spawns `npm run build` (in a `beforeAll`, a `beforeEach`,
// or top-level — the offender scanned is the SPAWN, not the location).
//
// PRECISION (never over-fire): it matches a `npm run build` invocation ONLY —
// `execSync('grep …')` in `tranche-u-lib.test.ts` and a "build" mention in a
// `docs-source-snippets.test.ts` comment are NOT builds and MUST NOT trip it.
//
// BORN-RED at authorship (`dts-published-surface.test.ts` still built in its
// `beforeAll`); GREEN once U-F43 moves the two checks to `proof-dts-surface.mjs`
// and the unit suite is build-free.
// ─────────────────────────────────────────────────────────────────────────────

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SELF = path.basename(fileURLToPath(import.meta.url));

// Only unit-test source files (this tree is `test/`); walk it recursively.
const TEST_FILE = /\.(test|spec)\.(ts|mts|cts|js|mjs|cjs)$/;

function walk(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) {
            out.push(...walk(full));
        } else if (TEST_FILE.test(entry) && entry !== SELF) {
            out.push(full);
        }
    }
    return out;
}

// A build SPAWN — `npm run build` in either the array-args form
// (`execFileSync("npm", ["run", "build"], …)` / `spawnSync` / `execFile` …) or
// the inline-string form (`execSync("npm run build")`). The `build` token is
// anchored (`build` exactly, not `build:watch`) so only the full dist build
// trips it. Assembled from fragments so this guard file never self-matches even
// if it were (it is not) scanned.
const NPM = "npm";
const RUN = "run";
const BUILD = "build";
const ARRAY_FORM = new RegExp(
    String.raw`\b(?:execFileSync|execSync|spawnSync|execFile|spawn|exec)\s*\(\s*(['"\`])${NPM}\1\s*,\s*\[\s*(['"\`])${RUN}\2\s*,\s*(['"\`])${BUILD}\3`,
);
const STRING_FORM = new RegExp(String.raw`(['"\`])${NPM} ${RUN} ${BUILD}\1`);

describe("no build in the vitest unit suite (U-F43 · G-ORACLE-4)", () => {
    it("no unit-test file spawns `npm run build` (the build lives in test:dist)", () => {
        const offenders: { file: string; snippet: string }[] = [];
        for (const file of walk(HERE)) {
            const src = readFileSync(file, "utf8");
            const hit = ARRAY_FORM.exec(src) ?? STRING_FORM.exec(src);
            if (hit) {
                offenders.push({
                    file: path.relative(HERE, file),
                    snippet: hit[0],
                });
            }
        }
        expect(
            offenders,
            `the unit suite must be build-free — move the build to the ` +
                `post-build test:dist slate (U-F43). Offenders: ` +
                JSON.stringify(offenders, null, 2),
        ).toEqual([]);
    });
});
