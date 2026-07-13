import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * G-ORACLE-2 — THE FEASIBILITY-LEG LAW, machine-checkable (U.W-ORACLE /
 * U-F6-oracle-half, via the U-F62 split; registry §2 U-F6 · §16 U-F62).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE LAW. Every GUARD-CONSTANT oracle — one that asserts an internal
 * serialization ≡ a paint (a token string, a `data-*` attribute, a computed
 * value matched against the guard's OWN output) — MUST carry a FEASIBILITY
 * LEG: a SECOND assertion that binds the constant to its REAL-WORLD referent
 * (a WCAG floor, a composited surface, a perceptual Δ threshold, measured
 * pixels, a device-resolution floor). Without it a PROXY predicate — "paint ≡
 * token, but never token ≡ floor" — ships gate-GREEN over a wreck: exactly the
 * S-disease that recurred in T's own instrument, where O-14 compared sites to
 * tokens but never tokens to their floors and stayed green over the near-black
 * letterform ramp.
 *
 * THIS TEST IS THE MACHINE-CHECKABLE FORM OF THE LAW (Pole A — the meta-audit;
 * the §Scope U-F6-oracle-half bracket). The `ORACLES` registry below IS the
 * law made enforceable: it ENUMERATES the guard-constant oracles in the slate
 * + the feasibility leg each must DECLARE (its proxy constant, its real
 * referent, and the marker that must appear in the source). The audit FAILS
 * while ANY required leg is undeclared — so a new guard-constant oracle cannot
 * merge, and a landed one cannot regress to proxy-only, without reddening here.
 *
 * WHAT THIS AUDIT PROVES / WHAT IT DOES NOT (the honest division of teeth).
 *   - Pole A (this test) proves the leg is DECLARED — the structural half.
 *   - The leg's own e2e assertion (it runs in the `smoke` project) proves the
 *     leg MEASURES the real referent — the semantic half.
 *   - The canon-doc precept (Pole B —
 *     `docs/tranches/U/audit/oracle/feasibility/PRECEPT.md`) binds the two at
 *     authorship review: a declared marker over a proxy assertion is a review
 *     failure, the mirror of the fabricated-red sin.
 * Each marker regex requires the phrase "feasibility leg" CO-LOCATED with the
 * leg's own keyword, so a bare phrase cannot rubber-stamp an unrelated block.
 * ─────────────────────────────────────────────────────────────────────────
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORACLE_DIR = resolve(__dirname, "..", "e2e", "smoke", "oracles");

interface FeasibilityLeg {
    /** The leg's short slug (also the keyword the marker must carry). */
    slug: string;
    /** The proxy constant the guard-constant leg asserts (serialization ≡ paint). */
    proxy: string;
    /** The real-world referent the feasibility leg must certify the constant against. */
    referent: string;
    /** The source marker that DECLARES the leg — "feasibility leg" co-located
     *  with the leg's keyword, so the declaration is specific, not a bare phrase. */
    marker: RegExp;
}

interface GuardConstantOracle {
    id: string;
    file: string;
    /** Why this oracle is a guard-constant oracle (asserts serialization ≡ paint). */
    why: string;
    legs: FeasibilityLeg[];
}

/**
 * THE REGISTRY — the guard-constant oracles + their required feasibility legs.
 * (Named by registry §2 U-F6: O-19 netting-luma floors, O-18 contrast census,
 * O-21 gradient-rail span, the O-14 T-17 chip half; + boot-G's o12 backing-
 * ratio mint — DISPOSITION-LEDGER §C.1 / ROWS.md pass-2 Row G — the R2 boot-
 * regression class made slate-visible.)
 */
const ORACLES: GuardConstantOracle[] = [
    {
        id: "O-14",
        file: "o14-preview-truth.spec.ts",
        why: "asserts painted letterform/chip stops ≡ the guard's own serialized tokens (paint ≡ token)",
        legs: [
            {
                slug: "ramp",
                proxy: "each site's painted letterform ramp ≡ its per-site --palettes-ramp tokens",
                referent: "each site's stops clear its WCAG floor against the composited surface the letterforms sit on",
                // ALREADY LANDED (WR-8 / T.W8, o14 :44-58 / :264) — the law's
                // proof-of-concept; a positive control this audit must keep GREEN.
                marker: /the ramp feasibility leg/i,
            },
            {
                slug: "chip",
                proxy: "each mix preview chip's painted gradient ≡ its stamped `data-stops`",
                referent: "each chip's stops are perceptible against the menu surface (not the near-transparent / near-black clamp a byte-honest sampler would still serialize)",
                marker: /feasibility leg[^\n]*chip|chip[^\n]*feasibility leg/i,
            },
        ],
    },
    {
        id: "O-18",
        file: "o18-contrast-census.spec.ts",
        why: "carries a token-identity leg (the consumer's color ≡ the certified --ink-muted token — serialization ≡ paint) that alone is floor-blind",
        legs: [
            {
                slug: "census",
                proxy: "the consumer wears the certified token (`caption color === --ink-muted`, the O-7 identity leg)",
                referent: "the effective ink clears its WCAG floor against the composited ancestor surface over the published page ambient",
                marker: /feasibility leg[^\n]*(surface|composit|census|ratio|wcag)|(census|surface)[^\n]*feasibility leg/i,
            },
        ],
    },
    {
        id: "O-19",
        file: "o19-netting-luma.spec.ts",
        why: "carries a token-string leg (the four --gamut-* tokens `.toContain(\"30%\"/\"4.75px\"/…)`) that alone cannot see a repaint drift",
        legs: [
            {
                slug: "netting",
                proxy: "the recalibrated --gamut-* tokens contain 30% / 36% / 45% / 4.75px (token-string identity)",
                referent: "the hatch-vs-paper luma delta on the LIVE composited plate clears the perceptual floor (screenshot pixels, both schemes + 390)",
                marker: /feasibility leg[^\n]*(luma|pixel|composit|netting|plate)|(netting|luma)[^\n]*feasibility leg/i,
            },
        ],
    },
    {
        id: "O-21",
        file: "o21-gradient-rail.spec.ts",
        why: "carries an owned-paint-stack leg (computed `background-image` ≡ `linear-gradient(90deg…)`, border-box origin+clip) that alone cannot see a terminal bleed",
        legs: [
            {
                slug: "span",
                proxy: "the owned paint stack (computed 90° ramp, no-repeat, border-box origin+clip)",
                referent: "terminal truth in real pixels: each rail edge paints ITS OWN stop's color — the ramp genuinely SPANS first→last, no mirrored sliver",
                marker: /feasibility leg[^\n]*(terminal|pixel|span|edge)|(span|terminal)[^\n]*feasibility leg/i,
            },
        ],
    },
    {
        id: "O-12",
        file: "o12-blob-seat.spec.ts",
        why: "carries a seat-geometry leg (--blob-seat resolves 0 + wrapper ⊂ card) that is blind to the backing-store RESOLUTION the emerge presize regressed (R2)",
        legs: [
            {
                // boot-G MINT (DISPOSITION-LEDGER §C.1 / ROWS.md pass-2 Row G):
                // born-GREEN — cured at af18e07; the leg makes the R2 boot-
                // regression class slate-visible against a future re-regression.
                slug: "backing",
                proxy: "seat identity (`--blob-seat === 0` + wrapper contained in the card)",
                referent: "the blob canvas backing store is at full device resolution — never the 0.35× emerge-presize wreck the idle park froze (R2)",
                marker: /feasibility leg[^\n]*backing|backing[^\n]*feasibility leg/i,
            },
        ],
    },
];

function read(file: string): string {
    return readFileSync(resolve(ORACLE_DIR, file), "utf8");
}

describe("G-ORACLE-2 · the feasibility-leg law (the meta-audit — every guard-constant oracle DECLARES its feasibility leg)", () => {
    for (const oracle of ORACLES) {
        describe(`${oracle.id} — ${oracle.file}`, () => {
            const src = read(oracle.file);

            for (const leg of oracle.legs) {
                it(`declares the '${leg.slug}' feasibility leg (constant ≡ real referent), not just the proxy`, () => {
                    // The guard-constant oracle asserts a PROXY (serialization ≡
                    // paint). The LAW requires a DECLARED feasibility leg binding
                    // that constant to a real referent. RED here means the leg is
                    // absent → the oracle can ship gate-green over a wreck.
                    expect(
                        leg.marker.test(src),
                        [
                            `${oracle.id} lacks a DECLARED feasibility leg for '${leg.slug}'.`,
                            `  guard-constant (proxy): ${leg.proxy}`,
                            `  required real referent : ${leg.referent}`,
                            `  declare a leg carrying the marker: ${leg.marker}`,
                            `  (the O-14 ramp leg at o14-preview-truth.spec.ts:44-58/:264 is the pattern to generalize.)`,
                        ].join("\n"),
                    ).toBe(true);
                });
            }
        });
    }

    it("the registry enumerates every guard-constant oracle in the slate (the law's coverage is complete)", () => {
        // A structural coverage check: if a NEW guard-constant oracle lands in
        // e2e/smoke/oracles/ that this registry does not name, the law is silent
        // over it. The named set is the registry §2 U-F6 slate + the boot-G mint;
        // this asserts the registry is non-empty and each entry is well-formed
        // (a coverage tripwire, not a filesystem crawl — new oracles are added
        // here BY THE AUTHOR, the Pole-B review gate).
        expect(ORACLES.length).toBeGreaterThanOrEqual(5);
        for (const o of ORACLES) {
            expect(o.legs.length, `${o.id} declares ≥1 leg`).toBeGreaterThanOrEqual(1);
            for (const leg of o.legs) {
                expect(leg.referent.length, `${o.id}/${leg.slug} names a real referent`).toBeGreaterThan(0);
            }
        }
    });
});
