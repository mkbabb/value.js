// ─────────────────────────────────────────────────────────────────────────────
// Tranche U · U.W-LIB — THE LIBRARY-CORRECTNESS WAVE — the born-RED gate slate.
//
// Governing doc: docs/tranches/U/waves/U.W-LIB.md (§Hard gate LIB-G1..LIB-G12).
//
// THE BORN-RED LAW (U.W-LIB §Hard gate): each gate below guards a LIVE defect
// CONFIRMED shipping in published 3.1.0. Every LIVE-defect gate is authored
// born-RED with vitest `it.fails(...)` — the test BODY asserts the CURED frame,
// so today (defect alive) the body throws and `it.fails` records a PASS: the
// suite stays GREEN while the defect lives. When the E-3-class cure lands the
// body passes, `it.fails` flips to a FAILURE, and the implementer flips
// `it.fails` → `it` (the standing green gate). Do NOT "fix" a gate by weakening
// its assertion — the assertion IS the cured-frame contract.
//
// Two gates are NOT born-RED:
//   · LIB-G4 is a born-GREEN GUARD (plain `it`, MUST pass today and STAY green) —
//     the R-2 double-denorm tripwire: it reddens iff the U-F30 fix hits the wrong
//     (shared-wrapper) locus and perturbs the working direct-parse path.
//   · LIB-G12 is a CONVENTION-CHECK (authored `it.fails` because the naming drift
//     exists today) — it codifies the `{from}2{to}` convention.
//
// π/DELTA (U.W-LIB §π): this wave mints ZERO visual claims. Each gate's RED
// assertion IS its "before" frame (a serialized string / resolved value); the
// flip IS the "after". No GPU, no owner-eye still.
//
// The current (RED) outputs each assertion contradicts were captured empirically
// against 3.1.0 HEAD and are recorded inline per gate as `// TODAY: …`.
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { parseCSSValue } from "@src/parsing";
import { parseCSSColor } from "@src/parsing/color";
import { evaluateMathFunction } from "@src/parsing/math";
import { FunctionValue } from "@src/units";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { color2 } from "@src/units/color/dispatch";
import { DisplayP3Color } from "@src/units/color";
import * as decompose from "@src/transform/decompose";

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "..", "..");

// ─── LIB-G1 · U-F29 — parseCSSValue silent truncation ────────────────────────
// Anchor: src/parsing/index.ts:494-500. Defect: `parseCSSValue` =
// memoize(tryParse(ValuesValue)) parses ONE sub-value; `tryParse` never requires
// full-input consumption → drops every trailing token with NO throw/warn.
//
// AMELIORATE (owner-ruled §13.5): the cure SHAPE is design-loop-picked — either
// LOUD-FAIL (throws/warns on unconsumed input) OR FULL-VALUE (returns the whole
// value). This gate is cure-SHAPE-agnostic: it asserts only "no silent drop" —
// the multi-token input must NOT resolve to the bare first token. It flips GREEN
// under EITHER cure and never over-constrains the design loop.
describe("LIB-G1 · U-F29 — parseCSSValue must not silently truncate", () => {
    it.fails("'1px solid red' does not silently return the bare '1px'", () => {
        // TODAY: parseCSSValue('1px solid red').toString() === '1px'  (silent drop)
        let full: string | undefined;
        let threw = false;
        try {
            full = parseCSSValue("1px solid red").toString();
        } catch {
            threw = true; // LOUD-FAIL cure reaches here
        }
        // GREEN under loud-fail (threw) OR full-value (all tokens retained).
        const noSilentDrop =
            threw ||
            (full !== "1px" && full!.includes("solid") && full!.includes("red"));
        expect(noSilentDrop).toBe(true);
    });

    it.fails("'0 0 4px red' does not silently collapse to the first '0'", () => {
        // TODAY: parseCSSValue('0 0 4px red').toString() === '0'
        let full: string | undefined;
        let threw = false;
        try {
            full = parseCSSValue("0 0 4px red").toString();
        } catch {
            threw = true;
        }
        const noSilentDrop = threw || (full !== "0" && full!.includes("4px"));
        expect(noSilentDrop).toBe(true);
    });

    it.fails("'translate(10px) rotate(45deg)' retains the trailing rotate", () => {
        // TODAY: drops rotate → 'translateX(10px) translateY(10px) translateZ(10px)'
        let full: string | undefined;
        let threw = false;
        try {
            full = parseCSSValue("translate(10px) rotate(45deg)").toString();
        } catch {
            threw = true;
        }
        const noSilentDrop = threw || full!.includes("rotate");
        expect(noSilentDrop).toBe(true);
    });
});

// ─── LIB-G2 · U-F30 — color-mix normalized-serialization leak ─────────────────
// Anchor: mix.ts + color-unit.ts:32 + base.ts:202. Defect: `mixColors` returns a
// NORMALIZED [0,1] Color; `createColorValueUnit` wraps WITHOUT denorm; toString
// emits values() verbatim → near-black. Fixed at the mix OUTPUT locus (physical
// range), matching the direct-parse convention (§13.5 / R-2).
describe("LIB-G2 · U-F30 — color-mix serializes physical-range CSS", () => {
    it.fails("color-mix(in srgb, red 30%, blue) → 'rgb(76.5 0 178.5)'", () => {
        // TODAY: 'rgb(0.30000000000000004 0 0.7)'  (normalized [0,1] leaked)
        expect(
            parseCSSColor("color-mix(in srgb, red 30%, blue)").toString(),
        ).toBe("rgb(76.5 0 178.5)");
    });
});

// ─── LIB-G3 · U-F30 — relative-color normalized-serialization leak ────────────
// Anchor: src/parsing/color/relative-color.ts:125-163,137-142.
// TWO legs (the BR-7 pole-conditional idiom):
//   (a) CURE-AGNOSTIC — the plain serialization leg; every sanctioned U-F30 cure
//       (denorm-on-output / normalize-on-construct / normalization-state brand)
//       reaches rgb(255 0 0).
//   (b) CURE-CONDITIONAL — the calc leg (§Cure APPROACH "the calc-case
//       discriminator" + LIB-G3-b). CSS `rgb(from red calc(r + 10) g b)` = 265 is
//       reachable ONLY when calc evaluates on PHYSICAL bindings — i.e. under
//       normalize-on-construct. Under denorm-on-output AND the normalization-state
//       brand, calc still runs on the NORMALIZED bindings (relative-color.ts:137-142)
//       → 1+10=11, never 265. So leg (b) is the DISCRIMINATOR: it flips GREEN iff
//       normalize-on-construct is chosen, and BOOKS the relative-color
//       physical-binding co-migration to U.W-ADOPT under the other two poles
//       (PP-16 — a born-RED whose cure is a co-migration is BOOKED, not counted
//       red at close). It does NOT silently force the invariant.
describe("LIB-G3 · U-F30 — relative-color serializes physical-range CSS", () => {
    it.fails("(a, cure-agnostic) rgb(from red r g b) → 'rgb(255 0 0)'", () => {
        // TODAY: 'rgb(1 0 0)'  (normalized r=1 leaked)
        expect(parseCSSColor("rgb(from red r g b)").toString()).toBe(
            "rgb(255 0 0)",
        );
    });

    it.fails(
        "(b, CURE-CONDITIONAL — normalize-on-construct ONLY, else BOOKED→U.W-ADOPT) " +
            "rgb(from red calc(r + 10) g b) → 'rgb(265 0 0)'",
        () => {
            // TODAY: 'rgb(11 0 0)'  (calc on NORMALIZED binding 1+10=11)
            // GREEN iff normalize-on-construct (physical binding 255+10=265).
            expect(
                parseCSSColor("rgb(from red calc(r + 10) g b)").toString(),
            ).toBe("rgb(265 0 0)");
        },
    );
});

// ─── LIB-G4 · U-F30 — the R-2 direct-path GUARD (born-GREEN, MUST STAY green) ──
// Anchor: src/parsing/color/color.ts direct-parse. The direct path stores
// PHYSICAL channels already; the U-F30 fix MUST land at the mix/relative output
// locus, NOT the shared createColorValueUnit wrapper (denorming there
// double-denorms the working direct path — the confirmed R-2 trap). If this
// GUARD reddens, the fix hit the wrong locus.
describe("LIB-G4 · U-F30 — direct-parse path is UNCHANGED (guard)", () => {
    it("rgb(76.5 0 178.5) round-trips verbatim (physical channels preserved)", () => {
        expect(parseCSSColor("rgb(76.5 0 178.5)").toString()).toBe(
            "rgb(76.5 0 178.5)",
        );
    });
    it("rgb(255 0 0) round-trips verbatim", () => {
        expect(parseCSSColor("rgb(255 0 0)").toString()).toBe("rgb(255 0 0)");
    });
});

// ─── LIB-G5 · U-F30 — the re-fed normalize pipeline (glass-ui's exact path) ────
// Anchor: src/units/color/normalize.ts colorUnit2/normalizeColorUnit. §23
// STRENGTHENED: a normalized-channel ValueUnit re-fed through normalizeColorUnit
// double-normalizes (0.3 → 0.3/255 = 0.00118) — the EXACT pipeline glass-ui uses.
// The physical-output fix resolves this at the same locus as the toString leak:
// a color-mix result carries PHYSICAL channels (76.5), so normalizeColorUnit
// yields the correct 76.5/255 = 0.3.
describe("LIB-G5 · U-F30 — re-fed color-mix does not double-normalize", () => {
    it.fails(
        "normalizeColorUnit(color-mix(...red 30%…)) → r ≈ 0.3, NOT 0.00118",
        () => {
            const mixed = parseCSSColor(
                "color-mix(in srgb, red 30%, blue)",
            ) as unknown as {
                value: { entries(): [string, unknown][] };
            };
            const renorm = normalizeColorUnit(mixed as never) as unknown as {
                value: { entries(): [string, unknown][] };
            };
            const r = Number(
                renorm.value.entries().find(([k]) => k === "r")![1],
            );
            // TODAY: r === 0.0011764705882352942  (double-normalized)
            expect(Math.abs(r - 0.3)).toBeLessThan(0.01);
        },
    );
});

// ─── LIB-G6 · U-F30 / §28 — build-time raw-channel re-enumeration ─────────────
// Anchor: §28.2 (structural). A gate that greps the THEN-CURRENT constellation
// for RAW readers of mixColors / sampleColorRamp / color2 (channels read
// bypassing toString) and asserts the chosen U-F30 invariant preserves the
// channel convention for ALL of them — OR names the co-migrants (U.W-ADOPT + the
// BH relay addendum). Born-RED (it.fails) until the invariant decision LANDS and
// is proven convention-preserving OR the co-migration is BOOKED.
//
// The grep TARGET LIST is explicit + regenerable (never a hardcoded count): the
// SOURCE trees of value.js + the two convention-sensitive siblings (READ-ONLY —
// the foreign-tree fence; this gate READS, never writes). The census is
// re-derived every run so a fresh sibling commit cannot invalidate it.
describe("LIB-G6 · U-F30 — raw-channel convention re-enumeration (build-time)", () => {
    // The convention-decision marker. Flipped to `true` by the implementer ONLY
    // when the chosen U-F30 invariant is proven to preserve the raw
    // mixColors/sampleColorRamp/color2 channel convention for every reader the
    // census below discovers (LIB-G6 GREEN) — OR the co-migration is booked to
    // U.W-ADOPT + the BH relay addendum names each co-migrant.
    const CONVENTION_INVARIANT_LANDED = false;

    // Explicit, regenerable grep targets: {dir, token-pattern}. Only SOURCE trees
    // (src/) — never dist/.claude/worktrees/.cache noise.
    const GREP_TARGETS = [
        {
            label: "value.js (self)",
            dir: path.resolve(REPO_ROOT, "src"),
            pattern: "mixColors|sampleColorRamp|color2",
        },
        {
            label: "glass-ui spectrum-walk lane",
            dir: path.resolve(REPO_ROOT, "..", "glass-ui", "src"),
            pattern: "mixColors|sampleColorRamp|rawOklab",
        },
        {
            label: "keyframes backward-color lane",
            dir: path.resolve(REPO_ROOT, "..", "keyframes.js", "src"),
            pattern: "sampleColorRamp|color2|rawOklab",
        },
    ];

    const enumerateRawReaders = (): { target: string; files: string[] }[] =>
        GREP_TARGETS.filter((t) => existsSync(t.dir)).map((t) => {
            let out = "";
            try {
                // -r recursive, -l names-only, -E extended, --include *.ts.
                out = execSync(
                    `grep -rlE --include='*.ts' '${t.pattern}' '${t.dir}' 2>/dev/null || true`,
                    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
                );
            } catch {
                out = "";
            }
            const files = out
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((f) => path.relative(REPO_ROOT, f));
            return { target: t.label, files };
        });

    it.fails(
        "the chosen U-F30 invariant is proven convention-preserving for every raw reader",
        () => {
            const census = enumerateRawReaders();
            const totalReaders = census.reduce(
                (n, c) => n + c.files.length,
                0,
            );
            // The census must be LIVE (raw readers exist → the convention matters).
            // If this ever hits 0, the grep targets drifted — the gate is moot.
            expect(totalReaders).toBeGreaterThan(0);
            // Born-RED core: the invariant decision has not landed / been proven.
            // The implementer flips CONVENTION_INVARIANT_LANDED → true only once
            // the chosen U-F30 invariant preserves the census's convention (or the
            // co-migration is booked). Attach the census so the flip is auditable.
            expect(CONVENTION_INVARIANT_LANDED, JSON.stringify(census)).toBe(
                true,
            );
        },
    );
});

// ─── LIB-G7 · U-F31 — transform single-axis over-expansion ────────────────────
// Anchor: src/parsing/index.ts:87-91. Defect: the single-value branch iterates
// ALL `dimensions` for values.length===1 → rotate(45deg) fans to X/Y/Z. CSS
// `rotate` is Z-ONLY; `scale`/`translate`/`skew` have their single-arg semantics.
describe("LIB-G7 · U-F31 — single-arg transforms respect axis cardinality", () => {
    it.fails("rotate(45deg) is a single Z-rotation, NOT X/Y/Z fan-out", () => {
        // TODAY: 'rotateX(45deg) rotateY(45deg) rotateZ(45deg)'
        const s = parseCSSValue("rotate(45deg)").toString();
        expect(s).not.toContain("rotateX");
        expect(s).not.toContain("rotateY");
        expect(s).toBe("rotateZ(45deg)");
    });

    it.fails("scale(2) stays 2D — no scaleZ", () => {
        // TODAY: 'scaleX(2) scaleY(2) scaleZ(2)'  (scaleZ is wrong for scale(n))
        const s = parseCSSValue("scale(2)").toString();
        expect(s).not.toContain("scaleZ");
    });

    it.fails("translate(10px) does not push 10px onto Y or Z", () => {
        // TODAY: 'translateX(10px) translateY(10px) translateZ(10px)'
        const s = parseCSSValue("translate(10px)").toString();
        expect(s).not.toContain("translateZ");
        expect(s).not.toContain("translateY(10px)");
    });
});

// ─── LIB-G8 · U-F32 — forward-trig unit leak ──────────────────────────────────
// Anchor: src/parsing/math.ts:504-524,515. Defect: inferResultUnit lists only the
// INVERSE trig fns (asin/acos/atan/atan2 → rad); sin/cos/tan fall through to
// "inherit-from-argument" and carry `deg` out. Per css-values-4 sin/cos/tan are
// UNITLESS <number>.
describe("LIB-G8 · U-F32 — forward trig resolves unitless", () => {
    it.fails("evaluateMathFunction(sin(30deg)) is unitless 0.5, NOT 0.5deg", () => {
        // TODAY: value 0.5, unit 'deg'
        const evaluated = evaluateMathFunction(
            parseCSSValue("sin(30deg)") as FunctionValue,
        );
        expect(evaluated).not.toBeNull();
        expect(Math.abs(evaluated!.value - 0.5)).toBeLessThan(1e-9);
        expect(evaluated!.unit === "" || evaluated!.unit == null).toBe(true);
    });

    it.fails("calc(sin(30deg)*100px) resolves to 50px, NOT 50deg", () => {
        // TODAY: value ≈ 50, unit 'deg'
        const evaluated = evaluateMathFunction(
            parseCSSValue("calc(sin(30deg)*100px)") as FunctionValue,
        );
        expect(evaluated).not.toBeNull();
        expect(Math.abs(evaluated!.value - 50)).toBeLessThan(1e-6);
        expect(evaluated!.unit).toBe("px");
    });
});

// ─── LIB-G9 · U-F33 — positioned gradient-stop round-trip ─────────────────────
// Anchor: src/units/index.ts:300. Defect: FunctionValue.toString default
// comma-join has no positioned-stop case for *-gradient → the stop-position
// comma-joins away from its color (invalid CSS, reads as 5 stops).
describe("LIB-G9 · U-F33 — gradient stops round-trip to valid CSS", () => {
    it.fails(
        "linear-gradient(90deg, red 20%, blue 80%) round-trips space-joined",
        () => {
            // TODAY: 'linear-gradient(90deg, rgb(255 0 0), 20%, rgb(0 0 255), 80%)'
            const s = parseCSSValue(
                "linear-gradient(90deg, red 20%, blue 80%)",
            ).toString();
            expect(s).toBe(
                "linear-gradient(90deg, rgb(255 0 0) 20%, rgb(0 0 255) 80%)",
            );
        },
    );
});

// ─── LIB-G10 · U-F74 — silent gamut-map on conversion ─────────────────────────
// Anchor: src/units/color/conversions/xyz-extended.ts:71,81 + dispatch.ts.
// Defect: xyz2rgb defaults correctGamut=true so color2(x,'rgb') silently
// gamut-maps; correctGamut=false is NOT dispatch-exposed. A caller converting
// wide→sRGB to DETECT out-of-gamut never sees raw OOB channels.
//
// The cure exposes the raw-OOB detect path through the dispatch surface. The
// wave doc sanctions "an idiomatic option on color2 (or a sibling color2Raw / an
// options bag)". This gate encodes the options-bag form `color2(c,'rgb',
// {correctGamut:false})`; if the design loop lands color2Raw instead, the
// implementer adjusts the call at flip.
describe("LIB-G10 · U-F74 — dispatch exposes raw out-of-gamut channels", () => {
    it.fails(
        "a wide-gamut color → sRGB with correctGamut:false reports RAW OOB",
        () => {
            const p3green = new DisplayP3Color(0, 1, 0); // out of sRGB gamut
            // TODAY: the options arg is ignored → silently gamut-mapped, all in [0,1].
            const raw = (
                color2 as unknown as (
                    c: unknown,
                    to: string,
                    opts: { correctGamut: boolean },
                ) => { entries(): [string, unknown][] }
            )(p3green, "rgb", { correctGamut: false });
            const channels = raw
                .entries()
                .filter(([k]) => k !== "alpha")
                .map(([, v]) => Number(v));
            const hasOOB = channels.some((c) => c < -1e-6 || c > 1 + 1e-6);
            expect(hasOOB).toBe(true);
        },
    );
});

// ─── LIB-G11 · U-F35 — 2D recompose round-trip ────────────────────────────────
// Anchor: src/transform/decompose.ts:41,510. Defect: decomposeMatrix2D has no
// recomposeMatrix2D inverse (recomposeMatrix3D exists) and interpolateDecomposed
// is 3D-only → 2D decompose is a dead-end. Access via the module namespace so the
// missing export is a runtime RED (undefined → not callable), not a compile stop.
describe("LIB-G11 · U-F35 — decompose/recompose 2D round-trips", () => {
    const ns = decompose as unknown as {
        decomposeMatrix2D: (
            a: number,
            b: number,
            c: number,
            d: number,
            e: number,
            f: number,
        ) => unknown;
        recomposeMatrix2D?: (d: unknown) => number[];
        interpolateDecomposed: (a: unknown, b: unknown, t: number) => unknown;
    };

    it.fails("recomposeMatrix2D(decomposeMatrix2D(M)) ≈ M", () => {
        // TODAY: recomposeMatrix2D is undefined → TypeError (not a function).
        const M: [number, number, number, number, number, number] = [
            2, 0, 0, 3, 10, 20,
        ]; // scale(2,3) translate(10,20)
        const d = ns.decomposeMatrix2D(...M);
        const back = ns.recomposeMatrix2D!(d);
        expect(back.length).toBe(6);
        for (let i = 0; i < 6; i++) {
            expect(Math.abs(back[i]! - M[i]!)).toBeLessThan(1e-6);
        }
    });

    it.fails("interpolateDecomposed accepts the 2D decomposed shape", () => {
        // TODAY: interpolateDecomposed reads 3D fields (.translate[0]) → NaN on a
        // 2D shape (which carries translateX/scaleX/angle/skew, not translate[]).
        const a = ns.decomposeMatrix2D(1, 0, 0, 1, 0, 0);
        const b = ns.decomposeMatrix2D(1, 0, 0, 1, 10, 0);
        const mid = ns.interpolateDecomposed(a, b, 0.5) as {
            translateX?: number;
        };
        expect(typeof mid.translateX).toBe("number");
        expect(Number.isNaN(mid.translateX)).toBe(false);
        expect(mid.translateX).toBeCloseTo(5, 6);
    });
});

// ─── LIB-G12 · U-F34 — {from}2{to} naming-parity CONVENTION CHECK ─────────────
// Anchor: src/units/color/conversions/* (+ gamut/*, difference.ts) + CLAUDE.md
// ("Naming convention: {from}2{to}"). The `{from}To{to}` camelCase drift
// (xyzToICtCp, srgbToOKLab, oklabToLinearSRGB, linearToSrgb, …) coexists with the
// one-true `{from}2{to}` form. Cure (U-F34 fold): rename the drift at the root,
// NO legacy aliases (E-3). This gate codifies the convention so a future
// `{from}To{to}` addition is caught.
//
// Authored `it.fails` because the drift EXISTS today. Regenerable, NOT a
// hardcoded count: the drift is re-derived every run by scanning the conversion
// source surface for exported names matching /[a-z0-9]To[A-Z]/. The expected
// one-true form for the doc-named exemplars (documentation only — the empty-set
// assertion is the contract):
//   xyzToICtCp → xyz2ictcp · ictcpToXYZ → ictcp2xyz · xyzToJzazbz → xyz2jzazbz ·
//   srgbToOKLab → srgb2oklab · oklabToLinearSRGB → oklab2linearSrgb ·
//   linearToSrgb → linear2srgb · srgbToLinear → srgb2linear
describe("LIB-G12 · U-F34 — every conversion export uses {from}2{to}", () => {
    // Explicit, regenerable scan surface (the LIB-G12 anchor).
    const SCAN = [
        path.resolve(REPO_ROOT, "src/units/color/conversions"),
        path.resolve(REPO_ROOT, "src/units/color/gamut"),
    ];
    const EXTRA_FILES = [
        path.resolve(REPO_ROOT, "src/units/color/difference.ts"),
    ];

    const collectDrift = (): string[] => {
        const files: string[] = [...EXTRA_FILES.filter(existsSync)];
        for (const dir of SCAN) {
            if (!existsSync(dir)) continue;
            for (const f of readdirSync(dir)) {
                if (f.endsWith(".ts")) files.push(path.join(dir, f));
            }
        }
        const drift = new Set<string>();
        const exportRe = /export\s+(?:function|const)\s+([A-Za-z_$][\w$]*)/g;
        // {from}To{to} camelCase drift: a lowercase/digit, then `To`, then an
        // uppercase — distinguishes `xyzToICtCp` from the `{from}2{to}` form.
        const driftRe = /[a-z0-9]To[A-Z]/;
        for (const file of files) {
            const src = readFileSync(file, "utf8");
            let m: RegExpExecArray | null;
            while ((m = exportRe.exec(src)) !== null) {
                if (driftRe.test(m[1]!)) drift.add(m[1]!);
            }
        }
        return [...drift].sort();
    };

    it.fails("no exported conversion uses the {from}To{to} drift form", () => {
        const drift = collectDrift();
        // TODAY: non-empty (xyzToICtCp, linearToSrgb, oklabToLinearSRGB, …).
        expect(drift, `drift exports: ${JSON.stringify(drift)}`).toEqual([]);
    });
});
