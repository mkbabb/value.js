# CRIT-SPEC — Critique of SYNTHESIS.md (Tranche R, pass-1)

**Critic**: Fable · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass1/SYNTHESIS.md` @ `tranche-q` `e80b359`
**Method**: live-tree spot-checks (value.js, glass-ui, keyframes.js, fourier-analysis), npm registry cross-check, corpus re-read (R1/R3/R5/R6/R8, N LEDGER, O.W6).

**Convergence: 88%. Verdict: structurally ratifiable; three must-fix defects, one substantive (KF-1 is a grammar BUG, not a rename).**

---

## 1. MUST-FIX findings

### 1.1 KF-1 / R.W1 param item is mis-specced: it is a live GRAMMAR BUG, not a field rename (SUBSTANTIVE)

SYNTHESIS §3.1 R.W1 and §8 KF-1 spec the `extractFunctions` item as a pure shape rename
(`CustomFunctionParameter.type→syntax`, `defaultValue→default`), inheriting R5 §B's claim that
"**the parse is correct, only the field names differ** from kf's expectation"
(`R5-KF-PT.md:67-68`). That claim is **false against both trees**:

- **value.js parser** — `src/parsing/stylesheet.ts:637-659` (`parseFunctionParameters`) implements
  a **colon-separated** grammar, per its own comment at `:641`:
  `` `--x: <length>: 0` → name "--x", type "<length>", default "0" ``.
  CSS Functions & Mixins L1's actual grammar is
  `<custom-property-name> <css-type>? [ : <default-value> ]?` — the `<syntax>` follows the name by
  **whitespace**, and the single colon precedes the default. Fed the spec form
  `@function --f(--x <length>: 0px)`, the parser splits at the first colon and produces
  `{ name: "--x <length>", type: "0px" }` — `<syntax>` glued onto `name`, the default mis-landed
  on `type`.
- **kf ground truth** — `keyframes.js/src/animation/resolve/resolve-function.ts:22-35`
  documents exactly this ("value.js ≤1.2.0 `extractFunctions` mislays `<syntax>` onto `name` and
  the default onto `type`"), guards it with `VJS_PARAM_BUG_MAX = "1.2.0"` (`:36`), and performs
  string-surgery recovery in `normalizeParam` (`:69-90`).

Consequences for the SPEC:
1. **A rename alone does NOT unblock kf** — `normalizeParam` compensates for the mis-split, not
   the field names; the R.W1 gate "kf deletes `normalizeParam` and re-pins" is unreachable as
   written. The item must be re-specced: **fix the `<function-parameter>` grammar**
   (whitespace-separated `<css-type>`, single top-level colon → default) **+ the field rename**,
   with the spec-form test vector `--x <length>: 0px` in the suite.
2. **The §8 KF-1 fallback dies** — "RECORD `{type,defaultValue}` canonical and kf's shim becomes
   permanent-by-contract" would canonize a spec-violating parse (garbage on all typed params).
   That is the NO-legacy precept violated at contract level. Strike the fallback; §11-Q5 collapses
   from a taste question to a defect fix (the rename half remains ratifiable).
3. **2.0.0 rationale survives but the framing shifts**: the grammar fix changes output for
   typed-param input (today: garbage → arguably a patch); the rename is the true BC break. §11-Q6
   should be re-argued on that split.

### 1.2 Retro-tag count is wrong: 10 untagged versions, not 7

R8-2 (`R8-DEFERRED.md:66`) lists MISSING as `v0.11.2, v0.12.0, v0.13.1, v0.14.0, v0.15.0,
v0.16.0, v1.0.0` (7) and SYNTHESIS §3.1 W0 + §9 carry "retro-tag the 7 untagged versions".
Live registry (`npm view @mkbabb/value.js versions`) vs `git tag`: post-`v0.11.1` the untagged set
is **`0.11.2, 0.12.0, 0.13.0, 0.13.1, 0.14.0, 0.15.0, 0.16.0, 1.0.0, 1.0.1, 1.0.2` = 10** —
R8-2 omitted **v0.13.0, v1.0.1, v1.0.2** (the last two are on `master` at `f1d9bab`/`15b0382`,
so the publish commits exist to tag). Additionally the registry carries 11 pre-modernization
versions (`0.1.0`–`0.5.1`, published 2024-07→2026-03) below the first tag `v0.6.0`, so the W0
gate "**`git tag` == registry**" is unsatisfiable as literally stated. Fix: correct the count to
10 and scope the gate (e.g. "tags == registry for ≥ v0.6.0" or an explicit pre-modernization
carve-out recorded in the W0 close note).

### 1.3 Zero-drop breach: U6 and U8 have no home in §9

§9 assigns 32 of the 34 LEDGER U-rows (U1–U33 incl. U30a/b). Missing:
- **U6** — "Dock animations/transitions take FAR too long… slow, laggy, jittery"
  (`N/audit/user-audit-2026-06-12/LEDGER.md:30`). Implicitly coverable by the §1 N.W15 dock-morph
  BOOK ("re-anchors on the BG dock-fission surface") but never named in §9's BOOKS row.
- **U8** — "Dropdowns must bound themselves on the page + scroll within"
  (`LEDGER.md:40`). The producer half landed (glass-ui bounded Select, R3 §1 — verified live:
  `variant="spectrum"`/bounded primitives in glass-ui 4.2.0 `src/components/ui/`); the consume
  half is implicit in R.W3's "bounded Select" but U8 is never cited.

§9's own header claims exhaustiveness ("No silent drops"). Add explicit rows: U6 → BOOK
(glass-ui 5.0.0 adopt event, dock-fission verify) and U8 → R.W3 (bounded-Select consume).

---

## 2. SHOULD-FIX refinements (non-blocking)

1. **R8-9 `watercolor-swatch` "phantom define-or-delete" under-specifies the precept-correct fix.**
   The class IS defined in glass-ui — but **scoped** (`.watercolor-swatch[data-v-a14ed6a5]` in
   `dist/glass-ui.css`; `WatercolorDot.vue:218-228 <style scoped>`), so the demo's bare usage at
   `demo/@/components/custom/mix/MixSourceSelector.vue:148` receives nothing (phantom-in-effect ✓).
   But "define" in the demo would be a design-system bypass; the correct disposition is
   **consume `WatercolorDot` (ghost variant) or delete the class** — sharpen the W2 wording.
2. **§3.1 W0 "P/Q close records (empty dirs today, R8-7)"** — `docs/tranches/P/` and `docs/tranches/Q/`
   do not exist at all on the live tree (git cannot track empty dirs). Trivial wording fix; the
   work item stands.
3. **§7 GAP-3 "15 subpaths"** enumerates 16 specifiers (root + 15 subpaths); live grep confirms
   exactly those 16. Disambiguate ("the root + 15 subpaths") so the relay letter's table has an
   unambiguous row count.

---

## 3. Verified-accurate (the grounding is otherwise excellent)

Every other load-bearing citation spot-checked came back TRUE against the live trees:

| Claim | Verified |
|---|---|
| `gamut.ts:242` `GAMUT_ALPHA = 0.05` unchanged; `O.W6.md:270` scopes out policy | ✓ both exact |
| ComponentSliders.vue **418 LoC** (>400 breach) + raw `SliderRoot` fork at `:59` | ✓ |
| `App.vue:115` imports `@mkbabb/glass-ui/goo-blob`; aurora canvas at `:3-7`, N.W5.B comment at `~:216` | ✓ |
| `useMixingAnimation.ts` — 5 `requestAnimationFrame` sites, zero PRM/reduced-motion gating | ✓ (`:77,:83,:99,:189,:196`) |
| CLAUDE.md still says parse-that `^0.7.0`; package.json `^0.13.0` (doc-truth item real) | ✓ |
| master-merge debt = 3 commits (`master..tranche-q`: 1.1.0/1.1.1/1.2.0) | ✓ |
| Treatments untracked (`?? docs/frontend-design/` — both files present); CONTRIBUTING/VENDOR-POLICY deletions staged | ✓ |
| `@mkbabb/keyframes.js` is a `file:../keyframes.js` **devDependency** (verify-then-disposition sound) | ✓ |
| glass-ui **4.2.0**; `/easing` subpath in exports; slider `variant="spectrum"` shipped → the N.W13 pure-consume premise is sound | ✓ |
| `grep uSatColor ../glass-ui/dist/` = 0 → GAP-1 escalation justified | ✓ |
| All 5 easing exports (`CSSCubicBezier, steppedEase, bezierPresets, jumpTerms, parseSteps`) on the barrel (`src/index.ts:243-255`) | ✓ |
| Kill-list trio exists incl. the duplicate `usePaletteExport` (×2 paths) | ✓ |
| Fourier contract-of-record lives in the sibling's `docs/tranches/B/coordination/` (neutral-home issue real) | ✓ |
| kf 5.1.0; parse-that pin `^0.13.0` current | ✓ |

## 4. Precept fidelity, staleness, scoping — PASS

- **No-legacy / no-workaround**: honored (§2.4 rejects interims post-producer-landing; the one
  breach is the §8 KF-1 fallback, struck in 1.1 above).
- **KISS / no-contrivance**: the §5 LEAVE verdict and the §2.3 Parse-Lab fuse are the strongest
  parts of the document — both refuse manufactured abstraction with recorded reasoning.
- **Design-system-first**: honored (spectrum consume, `/easing` consume, fork deletions);
  one sharpening needed (2.1 watercolor-swatch).
- **Staleness**: current against glass-ui 4.2.0/BG-executing (relay routed BG/BH by owner;
  5.0.0 as BOOK not gate) and kf 5.1.0. The BOOKs-not-gates inversion is the correct structural
  answer to the N failure mode.
- **Over-scoping**: R.W6's fourier-N charter is paired-authorship with fourier-owned execution
  (J precedent); acceptable. Library slate (§4) is modest with recorded defers/do-nots.
- **Prototype orders** (§10): all five target genuine load-bearing uncertainties; none is an
  easy-win vanity proto. proto-boot-cascade correctly refuses to assume R7's unbootable-demo
  diagnosis.

## 5. Convergence

**88%.** The wave DAG, fold ledger discipline, design POV, and cross-repo routing are ratifiable
as-is; the three must-fixes are localized (one R.W1 item re-specced + one §8 row + one §11
question re-framed; one number + one gate scope in W0; two ledger rows in §9). No structural
rework required.
