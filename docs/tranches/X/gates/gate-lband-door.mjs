// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.i · gate **i2** — THE DARK lBAND DOOR.
//
//   node docs/tranches/X/gates/gate-lband-door.mjs
//
// `W6.md:305`, RED at open: *"measured today against installed 7.0.0:
// `lightnessScheme` **2 occurrences**, `lBand` **4 occurrences** in
// `dist/aurora.js` — the door plausibly shipped. Three live sites still cite a
// wave that closed TRIGGER-NOT-FIRED on 2026-07-12: `useAtmosphere.ts:236`,
// `atmosphere-calibration.ts:24`, `aurora-bracket.test.ts:29."*
//
// The gate closes the row EITHER WAY (`W6.md:298`: *"CC-066 re-probes the
// installed dist and either lands the dark lBand and deletes the three stale
// comments, or files one dated §D letter — the row closes either way"*), and
// `W6.md:308` makes it fail in BOTH directions:
//
//   *"i2 fails in both directions (band unreachable and no letter; or a letter
//    filed while the probe shows the atoms exist)."*
//
// So the PROBE runs first and DECIDES. Nothing here is inherited from the
// spec's occurrence counts — a grep count is not reachability, and the three
// deferring comments were written against an older dist, which is exactly the
// citation-inheritance species L-18 target 4 names.
//
//   L1 · THE PROBE. Drive the producer's own `resolveAtoms` door with
//        `lightnessScheme: "dark"` and with an explicit `lBand`, and measure
//        the derived ramp's L values against the untouched resolve. Reachable
//        = the band MOVES and an explicit `lBand` is honoured to its endpoints.
//        This is the refutation of *"seed-atom resolution clobbers a
//        base-palette override"*, measured rather than argued.
//   L2 · THE BRANCH. Reachable → the three sites must no longer defer the row,
//        AND a letter must NOT exist (the falsifier's second direction).
//        Unreachable → the dated letter must exist with this probe pasted.
//   L3 · REACHABLE MEANS LANDED. "The band is reachable and the comments are
//        gone" is not satisfied by deleting prose: on the reachable branch the
//        field must actually take the band through the shipped door. Checked
//        at `useAtmosphere.ts`'s bytes.
//   L4 · AND COVERED BY AN EXECUTABLE. A comment that was wrong for a year was
//        wrong because nothing ran. The door must be asserted in
//        `aurora-bracket.test.ts`, so the next dist that closes it reds a test
//        rather than ageing into another deferral.
//
// STALE-SERVER LAW: headless against the installed package and the tree.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const LETTER = resolve(ROOT, "docs/tranches/X/waves/W6-lband-letter.md");

// The three sites `W6.md:305` names, with the stale predicate each carried.
// A site is CLEAN when it either no longer carries the predicate at all, or
// carries it inside the dated i2 correction that refutes it — quoting a
// superseded claim in order to overturn it is the E-3 idiom, not a survival.
const CORRECTION = /X\.W6\.i \(i2\)/;
const SITES = [
    {
        path: "demo/color-picker/composables/boot/useAtmosphere.ts",
        stale: /ships no\s+\/\/?\s*scheme\/lBand|ships no scheme\/lBand/,
    },
    {
        path: "demo/color-picker/composables/boot/atmosphere-calibration.ts",
        stale: /atom-unreachable/,
    },
    {
        path: "demo/test/glass/aurora-bracket.test.ts",
        stale: /drift · lBand|counterpoint · drift · lBand/,
    },
];

const failures = [];
const fail = (message) => failures.push(message);

/**
 * The source with its comments removed. L3 and L4 assert that the band is
 * LANDED and ASSERTED, and both files necessarily *talk about* the band in
 * prose — including the dated correction this gate itself requires. Reading
 * the raw text would let either leg pass on a comment, which is precisely the
 * failure that kept this row deferred for three waves. (Caught by negative
 * control: deleting the landing left the gate GREEN because the explanatory
 * comment still carried the literal.)
 */
const codeOf = (source) =>
    source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

// ------------------------------------------------------------- L1: the probe
const { resolveAtoms } = await import("@mkbabb/glass-ui/aurora");
const { DEFAULT_ATOMS } = await import("@mkbabb/glass-ui/aurora");

const SEED = "oklch(0.66 0.16 28)"; // the T-26 judge family's warm seed
const BAND = [0.1, 0.34];
const bandOf = (config) => (config.palette ?? []).map((stop) => stop.L);

const plain = bandOf(resolveAtoms({ ...DEFAULT_ATOMS, seed: SEED }));
const dark = bandOf(
    resolveAtoms({ ...DEFAULT_ATOMS, seed: SEED, lightnessScheme: "dark" }),
);
const banded = bandOf(resolveAtoms({ ...DEFAULT_ATOMS, seed: SEED, lBand: BAND }));

const schemeMoves =
    plain.length > 0 &&
    dark.length === plain.length &&
    dark.every((L, i) => L < plain[i]);
const bandHonoured =
    banded.length > 0 &&
    Math.abs(Math.min(...banded) - BAND[0]) < 1e-4 &&
    Math.abs(Math.max(...banded) - BAND[1]) < 1e-4;
const reachable = schemeMoves && bandHonoured;

// ------------------------------------------------------------ L2: the branch
const letterExists = existsSync(LETTER);
const siteState = SITES.map((site) => {
    const full = resolve(ROOT, site.path);
    const source = existsSync(full) ? readFileSync(full, "utf8") : null;
    if (source === null) return { ...site, missing: true, deferring: false };
    const carries = site.stale.test(source);
    const corrected = CORRECTION.test(source);
    return { ...site, missing: false, deferring: carries && !corrected, corrected };
});

for (const site of siteState) {
    if (site.missing) fail(`the named site ${site.path} does not exist`);
}

if (reachable) {
    for (const site of siteState) {
        if (site.deferring) {
            fail(
                `${site.path} still defers the row to a later wave while the probe ` +
                    `shows the door is REACHABLE — W6.md:298 requires the three stale ` +
                    `comments to go on this branch`,
            );
        }
    }
    if (letterExists) {
        fail(
            "a dated letter was filed while the probe shows the atoms door EXISTS — " +
                "W6.md:308 fails i2 in exactly this direction",
        );
    }
} else {
    if (!letterExists) {
        fail(
            "the door is UNREACHABLE and no dated §D letter exists at " +
                LETTER.slice(ROOT.length + 1),
        );
    } else {
        const letter = readFileSync(LETTER, "utf8");
        if (!/2026-\d\d-\d\d/.test(letter)) fail("the letter carries no date");
        if (!/lightnessScheme/.test(letter) || !/lBand/.test(letter)) {
            fail("the letter does not paste the probe it rests on");
        }
    }
}

// --------------------------------------------- L3: reachable means LANDED
if (reachable) {
    const atmosphere = codeOf(
        readFileSync(
            resolve(ROOT, "demo/color-picker/composables/boot/useAtmosphere.ts"),
            "utf8",
        ),
    );
    if (!/lightnessScheme:\s*"dark"/.test(atmosphere)) {
        fail(
            "the door is reachable and the field does not take it — deleting the " +
                "deferring prose without landing the band satisfies nothing",
        );
    }
    // and it must reach the RESOLVE, not sit in a comment
    if (!/resolveCalibratedAtmosphere\(fieldAtoms\(\)\)/.test(atmosphere)) {
        fail("the banded atoms are not the ones the field resolves");
    }
}

// ----------------------------------------- L4: covered by an executable
if (reachable) {
    const test = codeOf(
        readFileSync(resolve(ROOT, "demo/test/glass/aurora-bracket.test.ts"), "utf8"),
    );
    if (!/lBand/.test(test) || !/lightnessScheme/.test(test)) {
        fail(
            "the door has no executable owner in aurora-bracket.test.ts — a claim " +
                "with no test is how this row aged into three deferrals",
        );
    }
}

// ------------------------------------------------------------------ verdict
const green = failures.length === 0;
console.log(
    [
        `GATE i2 (dark lBand door) — ${green ? "GREEN" : "RED"}`,
        `  probe seed ${SEED}, through the producer's own resolveAtoms door:`,
        `    plain                   L ${plain.map((L) => L.toFixed(4)).join(" ")}`,
        `    lightnessScheme:"dark"  L ${dark.map((L) => L.toFixed(4)).join(" ")}  moves=${schemeMoves}`,
        `    lBand [${BAND.join(", ")}]      L ${banded.map((L) => L.toFixed(4)).join(" ")}  honoured=${bandHonoured}`,
        `  REACHABLE = ${reachable}  →  branch: ${reachable ? "LAND THE BAND" : "DATED §D LETTER"}`,
        `  letter present: ${letterExists}`,
        ...siteState.map(
            (site) =>
                `    ${site.deferring ? "DEFERRING" : "clean    "} ${site.path}` +
                `${site.corrected ? "  (carries the dated i2 correction)" : ""}`,
        ),
        ...failures.map((message) => `  FAIL ${message}`),
    ].join("\n"),
);

process.exit(green ? 0 : 1);
