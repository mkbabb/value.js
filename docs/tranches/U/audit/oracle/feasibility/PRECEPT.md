# The Feasibility-Leg Law — the oracle-authoring precept (canon)

**Lane**: U.W-ORACLE · FLOOR / FEASIBILITY-LEG-LAW half · U-F6-oracle-half (via the U-F62 split).
**Gate**: G-ORACLE-2 (born-RED → GREEN). **Mechanism**: `test/oracle-feasibility-leg.test.ts`.
**Precedence**: owner verbatim → `../../registry.md §2 U-F6 / §16 U-F62` → `U.md` → `../../../waves/U.W-ORACLE.md`.

---

## §1 The law (the class the S-disease belongs to)

> **Every GUARD-CONSTANT oracle carries a FEASIBILITY LEG.**

A **guard-constant oracle** asserts an internal *serialization ≡ a paint*: a token string, a
`data-*` attribute, or a computed value matched against **the guard's own output**. Such an
assertion is a **proxy predicate** — "paint ≡ token" — and it is structurally blind to a wreck the
guard itself serialized. O-14 was the archetype: it compared preview sites to their resolver tokens
but **never the tokens to their floors**, so it shipped gate-GREEN over the near-black letterform
ramp (stops clamped to L ≈ 0.02 — floor-passing against nothing). That is the **S-disease**, and it
recurred inside T's own instrument.

A **feasibility leg** is a SECOND assertion that binds the constant to its **real-world referent** —
a WCAG floor, a composited surface, a perceptual threshold, measured screenshot pixels, a device-
resolution floor. It certifies the constant against the world, not against its own serialization, so
a proxy predicate can never again pass green over a wreck.

The O-14 ramp leg (WR-8 / T.W8, `o14-preview-truth.spec.ts:44-58` + the `:264` describe) is the
law's **proof-of-concept** — the pattern, not the law. This precept is the **generalization**.

## §2 The mechanism — Pole A (the meta-audit) + Pole B (this precept)

The `§Scope U-F6-oracle-half` bracket named two poles; both are delivered, because the two are the
two halves of one enforceable law:

- **Pole A — the meta-audit** (`test/oracle-feasibility-leg.test.ts`, run under the standing
  `vitest run` CI step). It ENUMERATES the guard-constant oracles + the feasibility leg each must
  declare (the `ORACLES` registry **is** the machine-checkable law) and FAILS while any required leg
  is undeclared. This is the *structural* half: it proves the leg is **declared**.
- **Pole B — this precept** (the canon-doc, reviewed at authorship). It binds the declaration to a
  real referent: a marker over a proxy assertion is a **review failure**. This is the *semantic*
  half: it demands the declared leg actually **measures** the referent.

**The honest division of teeth** (stated so no one mistakes the meta-audit for the whole law): the
meta-audit proves the leg is DECLARED; the leg's own e2e assertion (it runs in the `smoke` project)
proves the leg MEASURES the referent; this precept binds the two at review. Each registry marker
regex requires the phrase *"feasibility leg"* CO-LOCATED with the leg's own keyword, so a bare
phrase cannot rubber-stamp an unrelated block — but a determined author could still declare a marker
over a hollow assertion. That is what review is for. A hollow feasibility leg is the mirror of the
**fabricated-red** sin (a born-RED gate over sound code): both are an oracle lying about the world.

## §3 The authoring convention (what a compliant guard-constant oracle looks like)

1. Identify the **guard constant** — the proxy assertion (serialization ≡ paint). Name it in a
   comment.
2. Add a **feasibility leg** — an assertion binding that constant to a **real referent**. Reuse the
   composited-surface canvas resolver (the O-18 census / O-14 ramp pattern) for contrast/visibility
   referents; use screenshot pixels for paint-span referents; use the DOM for resolution/geometry
   referents.
3. **Declare** the leg with a marker carrying *"feasibility leg"* co-located with the oracle's
   keyword, e.g. `// O-19 NETTING FEASIBILITY LEG — …`, `test("… the chip feasibility leg: …")`.
4. **Register** the oracle in the meta-audit's `ORACLES` list (id, file, why-guard-constant, the
   leg's proxy + referent + marker). A NEW guard-constant oracle that is not registered leaves the
   law silent over it — the registry-coverage tripwire flags a too-small registry, and review adds
   the entry.

A feasibility leg is **not** an excuse to author a born-RED over sound code. Where the referent is
already met (the cure landed), the leg is **born-GREEN** — a regression tripwire, honestly recorded
(the O-12 backing-ratio leg, §5). Fabricating a red there is the O-14 sin inverted.

## §4 The registry as landed (the slate audited)

| Oracle | Guard constant (the proxy) | Feasibility leg (the real referent) | Status |
|---|---|---|---|
| **O-14** ramp | painted letterform ≡ per-site `--palettes-ramp` tokens | each site's stops clear its WCAG floor vs the composited surface | **landed** (WR-8/T.W8) — the positive control the meta-audit keeps green |
| **O-14** chip | painted gradient ≡ stamped `data-stops` | each chip perceptible vs the menu surface (opaque, off the near-black clamp) | **added** (this lane) |
| **O-18** census | consumer color ≡ `--ink-muted` (the O-7 identity leg) | effective ink/surface ≥ WCAG floor vs the composited ancestor stack over the page ambient | **declared** (the census IS the leg; marker names it) |
| **O-19** netting | `--gamut-*` tokens contain 30%/36%/45%/4.75px | hatch-vs-paper luma delta ≥ floor on the LIVE composited plate (pixels, both schemes + 390) | **declared** (the canvas leg IS the leg) |
| **O-21** span | computed 90° ramp, border-box origin+clip | terminal truth in pixels: each rail edge paints ITS OWN stop — the ramp genuinely spans | **declared** (the terminal-truth leg IS the leg) |
| **O-12** backing | seat geometry (`--blob-seat === 0` + wrapper ⊂ card) | the canvas backing store at full device resolution (never the 0.35× emerge wreck) | **minted born-GREEN** (boot-G, §5) |

O-18/O-19/O-21 already *carried* a real-referent measurement (a composited-surface ratio, a
screenshot luma-delta, a terminal-pixel probe) — but the class was **unaudited**: no declared marker,
so the law could not see the leg and a new sibling could ship proxy-only. Declaring the marker is the
audit passing; the meta-audit is the standing register that keeps it so. The genuinely-new
assertions are the O-14 chip leg and the O-12 backing-ratio leg.

## §5 boot-G — the O-12 backing-ratio leg: MINTED (born-GREEN)

**Route**: `ROWS.md` pass-2 Row G → the triumvirate record → `DISPOSITION-LEDGER §C.1` (un-homed in
U) → this wave's oracle-slate BOUNDS-EXPANSION decision.

**Decision: MINT** (not decline). Rationale:

- **It is the feasibility-leg law applied to O-12.** O-12's seat-identity leg certifies the seat
  GEOMETRY (`--blob-seat === 0`, wrapper ⊂ card) but is BLIND to the backing-store RESOLUTION — the
  box is full-size; only its pixels are starved. That is precisely a guard-constant certifying its
  own serialization while a wreck (the R2 0.35× emerge-presize the idle park froze) hides in a
  dimension the guard never measures. Minting the leg makes the R2 regression class **slate-visible**
  — "an oracle must certify the FLOOR, not a proxy."
- **It is headless-measurable and renderer-INDEPENDENT.** The backing store is sized by the
  substrate's `getBoundingClientRect()` sizer (JS), not by the GL backend, so the leg reads the same
  on SwiftShader and a real GPU. It is NOT the aurora's GPU-only class (U-F15) — no mis-hosting.
- **Born-GREEN, not fabricated-red.** The R2 defect was cured at `af18e07` (HeroBlob drives the
  producer's re-measure seam — `pause()`/`resume()` at the `blob-emerge` animationend — sizing the
  backing against the untransformed box). A born-RED here would be a fabricated red over cured code
  (the O-14 sin inverted). The leg is a born-GREEN regression tripwire: green today, red if a future
  change re-freezes the low-res emerge frame.

**Floor derivation (E-3 — from measurement, not hand-tuned).** The R2 cure forensics
(`ROWS.md` W45-checkpoint) measured, at dpr 2: cured backing **360×360** for a **180.2px** box →
ratio `360 / (180.2 × 2) = 0.999` (full device resolution); the wreck froze **126×126** →
`126 / (180.2 × 2) = 0.35`. The invariant `backing ÷ (css × dpr)` is dpr-agnostic: cured ≈ 1.0,
wreck ≈ 0.35 at any dpr. The floor **0.6** sits well above the wreck (`0.35 × 1.1 noise = 0.385 < 0.6`
→ caught) and below full-res (`1.0 × 0.9 noise = 0.9 > 0.6` → passes) — centred, with margin on both
sides. Live re-measurement rides the substrate unblock (§6); the derivation is anchored on the
recorded af18e07 forensic, not on a value chosen to pass.

**Books to U.W-CLOSE**: the minted-leg outcome rides the close ledger walk (parallels U-F1 /
U-F6-oracle-half). Not re-booked, not silently dropped.

## §6 Verification record + the substrate caveat (honest)

- **Meta-audit born-RED → GREEN** — witnessed under `vitest run test/oracle-feasibility-leg.test.ts`:
  RED with 5 undeclared legs (O-14 chip, O-18, O-19, O-21, O-12) while the O-14 ramp positive control
  stayed GREEN; GREEN (7/7) after the legs landed. This transcript is the G-ORACLE-2 flip.
- **Type/lint** — the touched specs are ESLint-clean and tsc-clean for all NEW code (the one tsc flag
  is pre-existing O-21 ruler-grammar code, untouched by this lane and un-typechecked by the repo's
  lib+demo-only `typecheck`).
- **Live e2e drive — SUBSTRATE-BLOCKED (recorded, baseline-parity).** The demo cannot boot on the
  current tree: `../glass-ui/dist/dock.js` imports `rawOklabToOklch` from `@mkbabb/value.js`, an
  export the tranche-u lib does not yet ship (a U.W-LIB / U.W-ADOPT deliverable — the mid-flight
  glass-ui BI dist the SUBSTRATE CAVEAT names). Every oracle that loads the app fails identically in
  the **shared landed `bootWithBlob` / boot helper** — the failure is in the substrate, not in these
  legs (baseline parity). The O-18/O-19/O-21 marker additions are **comment-only** (zero runtime
  change; the landed-green assertions are untouched). The O-14 chip + O-12 legs reuse the proven
  composited-surface resolver / DOM patterns verbatim. Their live pass rides the substrate unblock;
  their correctness is carried here by pattern-parity + the meta-audit + the recorded floor
  derivation.
