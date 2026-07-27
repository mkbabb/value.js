#!/usr/bin/env node
/**
 * MT-F024 — the born-RED gate for the R1 totality violation.
 *
 * Every public `parse*` in `@mkbabb/value.js/css` is typed `(source: string) => ParseResult<T>`.
 * A parser that reports failure through a result type is a TOTAL function by construction — that
 * is the entire reason the type exists. This probe asserts that property and nothing else.
 *
 * It runs against the PACKED ARTIFACT, not the source tree (L-12: the witness environment must be
 * able to see the defect; a source-resolved import cannot witness what npm actually ships).
 *
 *   node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs
 *
 * RED today: 324 throws / 1548 calls, all one failure mode, all from src/css/grammar.ts:181.
 * GREEN condition: zero throws. Exit code is the assertion.
 */
import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const REPO = new URL("../../../../../..", import.meta.url).pathname;
const dir = mkdtempSync(join(tmpdir(), "vjs-totality-"));
let failed = 1;
try {
    const tarball = execSync(`npm pack --silent --pack-destination ${dir}`, { cwd: REPO })
        .toString().trim().split("\n").pop();
    writeFileSync(join(dir, "package.json"), '{"name":"p","type":"module","private":true}');
    execSync(`npm i --silent --no-audit --no-fund ./${tarball}`, { cwd: dir, stdio: "ignore" });

    const css = await import(pathToFileURL(join(dir, "node_modules/@mkbabb/value.js/dist/subpaths/css.js")).href);

    const FNS = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues",
        "parseKeyframeSelector", "parseStylesheet", "parseTimingFunction",
        "parseAnimationTimeline", "parseAnimationRange"];
    // The degenerate cross-product: every CSS function head x every empty-ish body.
    const NAMES = ["rgb", "rgba", "hsl", "hsla", "lab", "lch", "oklab", "oklch", "color", "hwb",
        "scroll", "view", "cubic-bezier", "steps", "linear", "var", "calc", "translate"];
    const BODIES = ["()", "( )", "(/)", "(,)", "(/ )", "( / )", "(,,)", "(/ / )", "( ,)"];
    const corpus = new Set(["", "  ", "/", ",", "()", "(", ")", "null", "undefined", "NaN"]);
    for (const n of NAMES) for (const b of BODIES) corpus.add(n + b);

    const crashes = [];
    for (const fn of FNS) {
        const f = css[fn];
        if (typeof f !== "function") { console.log(`SKIP ${fn} — not exported`); continue; }
        let n = 0;
        for (const input of corpus) {
            try { f(input); }
            catch (e) { n++; crashes.push({ fn, input, msg: String(e).split("\n")[0] }); }
        }
        console.log(`${n ? "RED " : "ok  "} ${fn.padEnd(24)} ${String(n).padStart(4)}/${corpus.size} throw`);
    }

    const modes = [...new Set(crashes.map((c) => c.msg))];
    console.log(`\nTOTAL ${crashes.length} throws / ${FNS.length * corpus.size} calls`);
    console.log(`DISTINCT FAILURE MODES: ${modes.length}`);
    for (const m of modes) console.log(`  ${crashes.filter((c) => c.msg === m).length}x  ${m}`);

    if (crashes.length === 0) { console.log("\nGREEN — every public parser is total."); failed = 0; }
    else console.log(`\nRED — ${crashes.length} totality violations. A ParseResult-returning parser must not throw.`);
} finally {
    rmSync(dir, { recursive: true, force: true });
}
process.exit(failed);
