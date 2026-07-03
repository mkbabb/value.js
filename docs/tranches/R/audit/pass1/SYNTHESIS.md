# SYNTHESIS — Tranche R, Pass-1 specification draft

**Synthesizer**: Fable (design + synthesis mandate) · **Date**: 2026-07-02 · **Inputs**: R1–R8 full reports (`docs/tranches/R/audit/pass1/`), `docs/frontend-design/{color-picker,hero-lab}.md`, N wave specs (`docs/tranches/N/waves/`), live tree on `tranche-q` @ `e80b359` (1.2.0).
**Mode**: tranche development only. Nothing here modifies source; this is the refined tranche set for ratification.

---

## §0 — The verdict in one paragraph

O/P/Q perfected the library and left everything else where N-death dropped it. The ratified N.W10–W18 block is **three weeks dead** and its central premise — *interim now, consume at the BA 4.0.0 pin* — **died twice**: value.js floats on `file:../glass-ui` at 4.2.0 (no pin to discharge), and the producer fixes the interims were waiting for **already shipped** (R3 §1: slider track-height, bounded Select, font-rung, WatercolorDot ghost, published `/easing`). The correct move is not to resurrect N.W10–W18 as-written and not to re-ratify a 9-wave demo block that will stall again. It is to **collapse the design mass into two executable design waves speced by the two taste-approved treatments** (which strictly supersede the N.W12/13/16/17 prose), **head the library work with the one live, reproduced, sole-owned defect (U10 gamut policy)**, close the functional P0s before any beauty lands, and run hygiene/merge/tags/deploy as the opening and closing ceremonies they always should have been. The N failure mode was *ratified-but-unbuilt*; R's structural answer is **fewer, denser waves, each executable in one session-fleet, with the 5.0.0 cross-repo events booked — never gating**.

---

## §1 — The N.W10–W18 challenge, wave by wave

Legend: **PRUNE** (landed or premise dead — do not carry) · **REWRITE** (premise died; re-derived content survives under a new frame) · **FOLD** (content survives, absorbed into an R wave) · **BOOK** (survives as a triggered event, not R work).

| N wave | Verdict | Disposition |
|---|---|---|
| **N.W10** functional truth (U9 reset · U11 cascade root · save-P0 · kC placebo · dual-mount blob · aurora motion U33) | **FOLD → R.W2** | The only part of the block that is *bugs*, not design. All rows verified live (R1, R7 §1, R8-8/13). Behavior outranks polish: it runs before any design wave. Add the new N-era-unknown: the demo **does not boot** (rolldown chokes on a stale sibling keyframes dist, R7 §1) — no before/after gate is honest until it does. |
| **N.W11 / W11′ / W11.D** color-SOTA · scroll grammar · sampleColorRamp | **PRUNE (landed 0.13.0)** — *except* the gamut-POLICY lane, which never shipped (R6 §1: `gamut.ts:242` α=0.05 byte-unchanged; O.W6.md:270 scoped it out). | Policy lane **FOLD → R.W1** as the library head (U10). |
| **N.W12** grand hierarchy (font root · accent axis · dark ladder · container-query layout · depth grammar · φ ramp) | **FOLD → R.W3 (superseded as prose)** | The keystone intent survives whole, but `docs/frontend-design/color-picker.md` now *is* the spec — it carries everything N.W12 asked (font split-brain cure, `--accent-live`, `--card-edge`, `--gamut-edge/--gamut-hatch` tokens) inside one coherent POV plus design mass N never authored (readout rhythm, plate-land). The N.W12 file becomes a residual checklist under the treatment, not a parallel authority. |
| **N.W13** controls (spectrum slider · interims · dropdown · a11y) | **REWRITE → pure-consume + design (R.W3)** | The wave's spine — `[data-*]` interims that "DIE at W18" — is **void**: every producer fix landed at 4.0.0–4.2.0 (R3 §1 rows 2/3/5/8). What survives is the *consume* (delete the raw-reka fork at `ComponentSliders.vue:59-122` onto `variant="spectrum"`; font-rung; bounded Select) and the *design* (thumb paints live color, U14 centering, U13 veil capsule, U7/U30a audacious space dropdown, D8 focus-rings). ComponentSliders lands ≤400 LoC by construction (today 418 — a live precept breach, R8-14). Consume-sufficiency is the risk → prototype order **proto-glassui-consume**. |
| **N.W14** cards + skeletons + empty states | **FOLD → R.W4** | Producer halves landed (Skeleton `surface="glass"`, WatercolorDot ghost). Residual = depth grammar (Z0–Z4 + six laws), `--card-edge` hairlines, shimmer bones that carry color, empty-state CTAs. Small, real, survives intact. |
| **N.W15** perf (idle floor · zombie canvas · PRM · dock morph) | **REWRITE — split** | The value.js-side halves (X6 dual-mount WebGL, mix-RAF PRM hole R8-8) → **R.W2**. The producer halves (blob single-canvas + PRM/visibility gate) → **relay GAP-4** + verify at the 5.0.0 adopt event. The born-RED dock-morph gate re-anchors on the BG dock-fission surface — verify at cut, **BOOK**. |
| **N.W16** per-pane (picker hero · docs φ · easing motif · extract dedup · router 4→5) | **SPLIT** | Picker hero → **R.W3** (the treatment owns it: φ readout, blob/number collision, cascade-no-op fix). Docs φ ladder + easing hierarchy + extract dedup (T19/T20/T21) → **R.W4**. Router 4→5 (K-W5RT) → **BOOK** on a stable vue-router 5 (still a moving target; carrying it into R repeats the N over-stuffing). |
| **N.W17** shell + motion (dock scale · 12→3 families · view-select moment · per-view accent) | **FOLD → R.W4** | Survives; the picker-adjacent beats (plate-land, space-switch cross-fade) live in R.W3 via the treatment; the shell-wide collapse (12→3 families, per-view accent) is R.W4. |
| **N.W18** consume-at-pin (re-pin BA 4.0.0 · abrogation sweep · interim death · easing consume) | **PRUNE the frame; REWRITE the residue** | Premise dead twice (§0). Residue: `/easing` consume → **R.W3/W4** (it's just work now, no wait); the abrogation/interim-death sweep is empty (the interims were never authored); the pin question becomes a **policy decision** (§3.4) + a **booked 5.0.0 adopt event** (goo-blob→blob, `/api` reshape, uSatColor consume, aurora-metal re-tune). |
| **N.W8′** hygiene + master-merge + wire-deploy + doc-truth | **REWRITE → R.W0 + R.W7** | The 13-file sweep list is stale (the tree moved); re-derived against today's tree in R.W0 (R1 §b is the new inventory). Master-merge debt is now 3 versions deep; tags-gap is 7 versions incl. v1.0.0 itself (R8-2 — the most-degraded gate). Wire-deploy → R.W7. |
| **N.W9′** v1.0.0 close | **PRUNE the version event (O.W6 shipped it); FOLD the hygiene tail** | N/FINAL.md, phantom `@mkbabb/keyframes.js` devDep verify-then-disposition, pin-policy record → R.W0/R.W7. |

**The structural lesson, stated as a binding posture for R**: N died because a 9-wave demo block was ratified atop a constellation that kept moving, with waits wired as gates. R inverts this: **7 waves, functional-truth before design, treatments as specs (not fresh prose), every cross-repo wait a BOOK with a named trigger, and the close wave gates on nothing outside this repo.**

---

## §2 — Design POV (the aesthetic stance, and the treatments' verdicts)

**The register is settled and it is good: the editorial instrument.** A color-science atlas plate reissued by a magazine art department — Fraunces as the atlas voice, Fira Code as the readout, the cartoon-offset shadow as the editorial swagger, the crayon primaries kept and *proportioned* (accents that land, never wash), ink + grain + a perceptually-true field. Nothing else on the web occupies this register; every competitor is rounded, soft-shadowed, Inter-on-white. The demo's thesis — *perceptual color truth made visible* — is exactly what the library uniquely enables (it alone computes gamut boundaries cheaply per frame), so the design signature and the engine's identity are the same thing. That coherence is the whole point of a flagship.

### 2.1 `docs/frontend-design/color-picker.md` → **ADOPT as the R.W3 spec.**
Grounded (every cited line re-verified live, R7 §1), verdict-reconciled (the square KEPT with perception as overlay; crayons KEPT and proportioned — the correct reversal of its own earlier over-reaches), and strictly richer than the N.W12/13/16 prose it folds in. Three amends, all minor:
1. Refresh the stale App.vue aurora refs (`:229-262` → `:3-7,:216`); the aurora clause is *already satisfied* by N.W5.B — only the graticule-grain layer is residual.
2. The gamut-contour overlay is net-new render surface with an unproven per-frame cost — the render path (CSS mask vs 2D canvas vs WebGL) is **decided by prototype**, not by prose (→ **proto-gamut-overlay**).
3. Sequence after the font/accent keystone (the treatment's own implementation plan already respects this).

### 2.2 `docs/frontend-design/hero-lab.md` → **AMEND + ADOPT; second priority, slippable.**
hero-lab is extant, genuinely below-bar (no font `<link>` — ships Times/Courier; sRGB grey-on-grey wash on a *perceptual color* library's showcase; commit-message copy), and worth a wave. The one real amend: **its signature collides with the picker's**. Two pages both claiming "the perceptual-truth reveal" dilutes both. Assignment, binding: **the picker owns the gamut BOUNDARY** (where color runs out — the breathing contour); **hero-lab owns the interpolation PATH** (how hue travels — the sRGB grey-death vs the oklch arc, the flip-toggle where you watch the grey die). Complementary halves of one thesis. Everything else in the treatment (font-load first — highest leverage; oklch mesh promotion; PAPER graticule; the crayon-datum calibration tick) is adopt-as-written. R.W5 carries it, explicitly slippable to S without breaking any dependency.

### 2.3 O.W7 (Parse-Lab + gamut-truth) → **FUSE, don't bolt on.**
The gamut-truth indicator *is* the picker treatment's signature moment — one `isInGamut`/boundary computation feeds the square overlay (output side) and the input echo (parse side). Parse-Lab lands as an **enrichment of `ColorInput`/`useColorParsing`** (which already calls `parseCSSColor`): the input echoes the parsed AST + the gamut verdict inline. The input *is* the parse lab. A detached teaching pane is contrivance until arbitrary-`parseCSSValue` teaching demand is demonstrated (KISS; ratification question §11-Q10). Zero-drop: the O.W7 intent is fully housed across R.W3 (overlay) + R.W4 (input echo).

### 2.4 What R **rejects**
- Re-authoring fresh design prose for surfaces the treatments cover — the treatments are the spec; the N wave files demote to residual checklists.
- Shipping any `[data-*]` glass-ui interim: the producer fixes landed; interims now would be manufacturing legacy (NO-legacy precept).
- The bare OKLCH-plane square replacement and the crayon-kill (already reversed inside the treatments — recorded here so they stay dead).
- A detached Parse-Lab god-pane (2.3).

---

## §3 — The Tranche R wave DAG

### 3.1 Waves

**R.W0 — SUBSTRATE** (hygiene + truth; mechanical, one session)
Commit the two treatments (they are untracked and at risk — the seed of the design block); commit the staged `CONTRIBUTING.md`/`VENDOR-POLICY.md` deletions (standing 2026-06-02 proof-purge decision); resolve the `docs/precepts` submodule edits inside the submodule; discard `$OUT`, `.w6a-audit*.mjs`, `mix-1440-snapshot.md`, `*-dataurl.txt` (findings already canonized in LEDGER U1–U33); mint a `.gitignore` class for probe scratch; **merge `tranche-q` → master** (the N.W8′ debt, 3 commits deep); **retro-tag the 7 untagged versions** incl. v1.0.0 (annotated, from the exact publish commits — R8-2); author the lean P/Q close records (empty dirs today, R8-7) + `N/FINAL.md` (a fold-forward pointer to R, dropping the obsolete v1.0.0 framing); doc-truth pass (CLAUDE.md parse-that `^0.7.0`→`^0.13.0` etc., R8-5); verify-then-disposition the `@mkbabb/keyframes.js` devDep (R1: check demo imports before deleting). **Gate**: clean `git status`; `master` carries 1.2.0; `git tag` == registry; docs spot-check true.

**R.W1 — GAMUT + PERCEPTUAL** (library; the U10 head)
- **U10 gamut-policy re-anchor** — the one live, reproduced, sole-owned, highest-severity library defect (R6 §1). Policy chosen by **proto-gamut-policy** (α-tune vs MINDE-unification vs gamut-relative); hold hue exactly; land between washed-out and hue-broken; add the §13.2 spec-oracle suite vs browser references.
- **OKHSL/OKHSV** (R-2 — fixes the documented HSV low-chroma hue drift; reuses `gamut.ts` cusp math).
- **ΔE-2000 + ΔE-ITP** (R-3 — pure functions; unblocks quantize dedup).
- **`extractFunctions` param-shape rename** — `CustomFunctionParameter.type→syntax`, `defaultValue→default`, matching value.js's own `@property` descriptor (`stylesheet.ts:38` vs `:46`); kf deletes `normalizeParam` and re-pins (R5 risk-2). Clean break per the no-backwards-compat precept.
- **K-DISP** (`dispatch.ts` hue-cluster → `mix.ts` real decomp — the M.W6 modern-web carry, library-structural).
- **`/easing` export-stability guard** — a small test asserting the 5 exports glass-ui's published `/easing` subpath composes (`CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`, `parseSteps`) exist on the barrel (R5 risk-3).
- `Color.try()` (R-9) only if trivial; otherwise book.
**Version**: this cut is **2.0.0** — the param rename is an unambiguous BC break on a published 1.2.0 descriptor, and the gamut-policy change alters observable output for OOG colors; semver honesty (the keyframes 2.2.0 lesson) says one clean major, not a euphemistic minor. Dispatch the kf re-pin + glass-ui peer-floor note (`^1.1.1`→`^2.0.0`) with the cut. *(Ratify: §11-Q5/Q6.)*
**Gate**: oracle suite green vs browser refs; vitest green; 2.0.0 published; kf dispatch letter written.

**R.W2 — FUNCTIONAL TRUTH** (demo P0s; behavior before beauty)
Demo boot fix (rolldown/stale sibling keyframes dist — **proto-boot-cascade** burns this + the cascade root down first); U9 reset-broken; U11 root = the 1440 dual-pane `lg:hidden` display bug + the unlayered glass-ui dist-CSS cascade kill (D8-1); X6 dual-mount WebGL blob; X8 pane-router cold-hash; X9 tags-warn; **mix-RAF PRM gate** (R8-8 — the last live PRM hole, 5 ungated rAF in `useMixingAnimation.ts`); `watercolor-swatch` phantom define-or-delete (R8-9); U33 aurora **motion** (derive landed; the actual complaint didn't); save-with-backend-down P0 + kC placebo (N.W10 rows); kill-list verify-then-delete (`useCardMenu`, `useCodeFormatting`, dup `usePaletteExport` — R8-6); K-W3DIFF/K-PALID/K-INV5 (the remaining modern-web carries).
**Gate**: demo boots clean; e2e 5-project suite green; dual-pane renders at 1440 **without** the w6a shim; zero ungated rAF; zero phantom classes.

**R.W3 — THE INSTRUMENT** (picker design keystone; Fable + frontend-design; spec = `color-picker.md`)
Font/accent/layout keystone (N.W12 folded: `--font-stack-display` cure, `--accent-live`, dark ladder, de-navy borders, container-query clamp, `--card-edge`, card-lock law) → the **gamut-truth overlay signature** (O.W7 fused; render path from **proto-gamut-overlay**) → controls consume + design (N.W13 rewritten: spectrum-slider consume, thumb paints live color, letter centering, veil capsule, audacious space dropdown with specimen rows, D8 focus-rings) → readout rhythm (tnum int/frac/unit split) → plate-land + paint-in + stagger three-beat + space-switch cross-fade.
**Gate**: `document.fonts.check` true for Fraunces; thumb paints live color under keyboard drive; `document.getAnimations()` shows the orchestrated open; ComponentSliders ≤400 LoC; focus ring paints on every keyboard control; re-run w6a-equivalent probes as the falsifiable before/after oracle (π shots).

**R.W4 — SUFFUSION** (cards + shell + panes)
N.W14 depth grammar + shimmer skeletons (`surface="glass"`) + empty-state CTAs; N.W17 12→3 transition families + per-view accent + view-select moment; N.W16 residuals: docs φ-ladder (U4/U5), easing hierarchy via **`/easing` consume** (retire the `gradient/EasingSelector.vue` fork + the `ColorSpaceSelector.vue:17` trigger-only font override — R3 §5), extract-pane dedup + population/dominance surfacing + EditDrawer (T19/T20/T21); **Parse-Lab-as-input** (the ColorInput AST + gamut-verdict echo, §2.3).
**Gate**: transition families ≤3; both forks deleted; `demo/` ≤400 LoC everywhere; a11y snapshot parity.

**R.W5 — OBSERVATORY** (hero-lab; Fable; spec = `hero-lab.md` amended; **slippable to S**)
Font-load fix first; grey wash → oklch mesh; PAPER graticule kept structural; crayon-datum calibration tick; the sRGB↔oklch grey-death toggle as the signature — the *interpolation-path* half, never the gamut half.
**Gate**: fonts load; page gradients interpolate in oklch; the toggle demonstrably kills the grey.

**R.W6 — TWIN-TIE** (CRUD union + fourier pairing; independent of the demo lanes)
Golden-vector fixture (shape + byte-parity proven by **proto-golden-vectors**) landed in value.js tests + paired-authored into fourier's; the **contract-currency invariant** recorded (any change to `atomdiff.ts`/`PaletteVersion`/URN catalog re-verifies the fourier twin + updates CONFORMANCE-MATRIX — the value.js analog of fourier `inv-32`); the contract-doc neutral-home decision executed or pointered (§5); optional `canonical_digest` one-primitive adoption in `hash.ts` if parity holds; **paired-author the fourier-N uplift charter** into `fourier-analysis/docs/tranches/N/` (§6).
**Gate**: both repos' tests read the same fixture; fourier-N charter exists; invariant recorded.

**R.W7 — WIRE + CLOSE**
Wire-deploy ceremony (prod serves I-era code): deploy HEAD api (X1), NCSU-alias on-host retirement (X2 — maintainer op, §11-Q2), first CF-Pages run (X3), rollback runbook fold (X5) + X4 decision record; dispatch the **glass-ui relay letter** (§7) + the **kf/parse-that slate** (§8); author R/FINAL.md; merge + tag.
**Gate**: prod serves current; relay letters dispatched; FINAL.md; master merged, tagged. **Gates on nothing outside this repo.**

### 3.2 DAG

```
R.W0 ──┬── R.W1 (library) ──────┐
       ├── R.W2 (functional) ───┼── R.W3 (picker) ──┬── R.W4 (suffusion) ──┐
       └── R.W6 (twin-tie) ─────┘                   └── R.W5 (hero-lab)* ──┼── R.W7 (close)
                                                     *slippable to S       ┘
```
W1/W2/W6 run parallel after W0. W3 requires W1 (the overlay renders the settled policy) + W2 (design on a working substrate). W4/W5 parallel after W3. W7 requires W4 + W6 (+ W5 if not slipped).

### 3.3 Booked cross-repo events (BOOKS, never gates)

| Book | Trigger | Action |
|---|---|---|
| **glass-ui 5.0.0 adopt event** | the BG/BH joint cut | Re-point `App.vue:115` `/goo-blob`→`/blob`; walk the by-name subpath table (GAP-3); consume `uSatColor[]` if it rode the cut (GAP-1); re-verify aurora-metal tunes + dock-fission surfaces; verify producer blob PRM/single-canvas (GAP-4). |
| **parse-that `^1.0.0` re-pin** | kf S.H2 publishes the 1.0.0 cut | Re-pin, full suite re-verify (0 `*Span` consumers — API-safe). Wait, don't pre-pin. |
| **vue-router 4→5** (K-W5RT) | stable vue-router 5 | Migrate then. |
| **S.H3 Pratt consume-edge** | parse-that presents the sketch | Design-review the `math.ts` calc() transposition; ratify or decline. |
| **CH-10 / CH-13 / R8-23 spec-gated grammar longhands** | as previously recorded | Unchanged carries. |

### 3.4 The pin policy (decide once, record forever)
**POV: keep `file:../glass-ui` deliberately, and RECORD it.** The constellation is a paired-authorship monorepo-in-spirit; a registry pin during active co-development is theater that goes stale the day it's written (as 3.13.0 and "BA 4.0.0" both proved). The discipline that actually protects value.js is the **adopt-event book** (§3.3) + the by-name MIGRATION tables the relay letter demands. Record the policy in CLAUDE.md so no future wave re-litigates a "pin discharge" that structurally cannot exist. *(Ratify: §11-Q4.)*

---

## §4 — The library slate (R.W1 detail + later letters)

**In R** (rationale in §3.1): U10 policy (head) · OKHSL/OKHSV · ΔE-2000/ΔE-ITP · param rename · K-DISP · easing-export guard · (Color.try() if trivial).

**Deferred to S+ with recorded rationale** (R6 §5): R-4 raytrace N-gamut map (depends on R-1 settling policy); R-8 gamut-relative spaces (evaluated *inside* proto-gamut-policy — if it wins, it ships as the R-1 answer, not a later item); R-5 HDR rec2100 (spec still Draft); R-6 Jzazbz/ICtCp spaces (after ΔE-ITP shares the math); R-7 HCT/CAM16 (heavy, no demand); R-10 `if()`/`random()` parser nodes (gate on Baseline ~late-2026). **Do-NOT** (recorded): sibling-index/count, device-cmyk, ICC profiles.

---

## §5 — The CRUD-union verdict: **LEAVE** (leave the code; keep the contract current; tighten the twin-tie)

Picked over *extract* and *converge*, and it is not a compromise — it is the only correct answer:
1. **Extract is impossible and was deliberately rejected.** Cross-language (Python/FastAPI vs TS/Hono); fourier `inv-16` ("shared by contract; frameworks rejected") + `inv-26` (no codegen) already codify it on both sides. A shared package for a 145-LoC pure function would be enormous contrivance for negative benefit.
2. **Converge already happened where it matters.** The union EXISTS as the shared contract corpus (CRUD-CONTRACT v2.0.0 + SCHEMA + 187-row CONFORMANCE-MATRIX + J-diff-shape); value.js converged its URNs at N.W3.H; the twins are wire-identical today (R4 §2.1). There is zero copy-pasted code to de-duplicate.
3. **The one live risk is silent twin-drift**, and it closes for the price of a fixture: the **shared golden-vector file** both suites assert (R.W6), plus the **contract-currency invariant**, plus the **neutral-home** fix (the bilateral contract-of-record currently lives in a *sibling's tranche folder*, `fourier-analysis/docs/tranches/B/coordination/` — relocate or, at minimum, pointer it from CONSTELLATION.md so it stops reading as fourier-local).

The three named divergences (layering, txn posture, index-lead order) are **legitimate per-repo design choices, not drift** — fourier's zero-transaction crash-safe-by-construction design is arguably *simpler* than value.js's `withTransaction`+rs0; do not "unify" it. What crosses the seam is knowledge, not code: fourier adopts value.js's `deletedAt`-leading index lesson; value.js optionally adopts fourier's `canonical_digest` one-primitive shape.

---

## §6 — The fourier-analysis uplift plan (paired-authored into `fourier-analysis/docs/tranches/N/`)

Authored by R.W6 as a charter seed (fourier owns execution; its head tranche M is deploy/design-only, db/CRUD explicitly out of M's scope — these are net-new N candidates):

| # | Item | Shape |
|---|---|---|
| FN-1 | Heal the create/fork non-atomic root-version window via read-time/startup recompute (KISS, no replica-set dep) — or record the accepted gap as an invariant | small |
| FN-2 | Adopt `deletedAt`-leading compound indexes for gallery cursor sorts (the value.js `db.ts:51` lesson) | small |
| FN-3 | Optional: thin `repositories/visualization.py` seam (14× direct `get_db()` in the viz router) — a boundary, not a framework; compatible with the no-framework stance | optional |
| FN-4 | Unify problem+json construction under one FastAPI exception handler (today two layers: direct return + HTTPException-detail) | low |
| FN-5 | Extend `inv-32`'s spirit to the CRUD twins: any `atomdiff.py`/version-shape/URN change re-verifies the value.js twin + CONFORMANCE-MATRIX (pairs with value.js's R.W6 invariant) | invariant |
| FN-6 | Read the shared golden-vector fixture from `test_crud_lib_atomdiff.py` (value.js lands the fixture; fourier wires the reader) | small |
| FN-7 | Co-decide the contract-doc neutral home (§5.3) | coordination |

---

## §7 — The glass-ui relay letter (to the ACTIVE BG/BH agent; route by owner: BG owns src/, BH owns the 5.0.0 reshape + ceremony)

Dispatch at R.W7 (or earlier if the 5.0.0 cut approaches). Content, in priority order:

1. **GAP-1 · `uSatColor[]` (C-1/BA-VJS-5) — HIGH, escalated.** The ONE N ask never shipped; it has silently slipped **three cuts** (booked "4.x" at W-GOO-REDRESS arm B; out of BB W-VIZ-SUITE; absent after BG WS5's blob rebuild — DIRECTIVE WS5-02 PARTIAL; `grep uSatColor dist/` = 0). value.js's hero blob (`/goo-blob`, `App.vue:115`) cannot derive satellite shades without it — the U3 residual. **Ask: ride the 5.0.0 blob rebuild as the natural rider, or re-book with an explicit named owner.** No more ownerless slips. Companion: `bodyLightness`/`lightnessFloor` on `deriveBlobPalette`.
2. **GAP-2 · `goo-blob → blob` rename — HIGH.** Name value.js by-name in the 5.0.0 MIGRATION row (`App.vue:115` imports `/goo-blob`; confirm whether `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`GooBlob` symbols also rename).
3. **GAP-3 · the 5.0.0 `/api` fold + subpath regen — MED.** value.js consumes **15 subpaths** (`(root)`, `/aurora`, `/color`, `/configurator`, `/confirm-dialog`, `/controls`, `/dark`, `/dock`, `/dom`, `/forms`, `/goo-blob`, `/search`, `/styles`, `/styles/animations`, `/tabs`, `/watercolor-dot`); the cut-notes owe a by-name renamed/moved/dropped table.
4. **GAP-4 · blob producer perf half — MED, verify-first.** Confirm the BG-rebuilt `useMetaballRenderer` is single-canvas + IntersectionObserver/`document.hidden`/PRM-gated (N2 A′-1/A′-2). If not, land it in BG WS5.
5. **GAP-5 · cut-ceremony carries — LOW.** F-1 dts-emitting `build:watch`; F-3 AuroraConfig slider descriptor via `/configurator`; F-4 `.retired-classes.txt`/MIGRATION by-name rename discipline.
6. **NEW · peer-floor + `/easing` contract.** When value.js R.W1 cuts 2.0.0, glass-ui's peer floor (`@mkbabb/value.js ^1.1.1`, planned at BH B2.1-swap) must ride to `^2.0.0`. Also RECORD glass-ui's `/easing` dependency on the 5 value.js easing exports — value.js now guards them with a test (R.W1); glass-ui should cite them in its own contract notes.

---

## §8 — The keyframes.js / parse-that alignment slate

| # | Item | R action |
|---|---|---|
| KF-1 | `extractFunctions` param-shape (`{type,defaultValue}` vs `@property`'s `syntax`) — the one live implicit ask (kf `normalizeParam` shim + S-ledger 61) | **Rename** at R.W1 (`type→syntax`, `defaultValue→default`) inside the 2.0.0 cut; dispatch the letter; kf deletes `normalizeParam` + re-pins `^2.0.0`. Fallback if ratification prefers no break: RECORD `{type,defaultValue}` canonical and kf's shim becomes permanent-by-contract. *(§11-Q5)* |
| KF-2 | parse-that `^0.13.0` pin | **Current — no action.** Book the `^1.0.0` re-pin on kf S.H2's cut (§3.3). Do not pre-pin. |
| KF-3 | glass-ui `/easing` × 5 value.js exports | Export-stability guard test at R.W1 (§3.1); recorded as a standing contract in the relay letter (§7.6). |
| KF-4 | `/math` subpath importmap sensitivity (kf DM-13) | One doc line in RELEASE.md (R.W0 doc-truth): the `/math` leaf is a load-bearing externalization target; non-npm hosts must map it. |
| KF-5 | parse-that S.H1 packrat-arming | No action — transparent GC win inherited at the next re-pin. |
| KF-6 | parse-that S.H3 Pratt combinator | Booked design review (§3.3); value.js's `math.ts` calc() is the ratifying consume-edge; respond when the sketch arrives. |

---

## §9 — Zero-drop fold ledger (R8 + R2 outputs → homes)

Every R8 row and every R2 PNI cluster has exactly one home. No silent drops.

| Item(s) | Home |
|---|---|
| R8-1 dirty-tree sweep + .gitignore class · R8-2 retro-tags ×7 · R8-3 master-merge · R8-5 doc-truth · R8-7 P/Q records · R8-16 N/FINAL.md + devDep verify + pin-policy record | **R.W0** |
| U10 (R8-10 library row) · R-2/R-3 spaces+metrics · KF-1 rename · K-DISP (of R8-12) · KF-3 easing guard · R8-24 `<syntax>` validator verify (VJ-Q6 — verify shipped in 1.2.0, close the row) | **R.W1** |
| U9 · U11-root · U33-motion · R8-8 mix-RAF PRM · R8-9 watercolor-swatch phantom · R8-13 X6/X8/X9 · R8-6 kill-list · K-W3DIFF/K-PALID/K-INV5 (of R8-12) · N.W10 save-P0/kC rows · boot fix | **R.W2** |
| U1 U2 U7 U13 U14 U15 U17 U19 U21 U23 U24 U26 U28 U29 U30a U30b U31 U32 (the picker-bearing U-rows) · R8-14 ComponentSliders lift · O.W7 gamut-truth half (R8-15) | **R.W3** |
| U4 U5 U12 U16 U18 U20 U22 U25 U27-consume (via `/easing`) · R8-11 T19/T20/T21 · O.W7 Parse-Lab half (R8-15) · glass-ui §5 self-owed retirements (EasingSelector fork, trigger-font override, Skeleton glass) | **R.W4** |
| hero-lab treatment (full) | **R.W5** (slippable) |
| R4 fold items: golden-vector fixture · contract-currency invariant · neutral-home · canonical_digest option · FN-1..7 paired-authoring | **R.W6** |
| R8-4 wire-deploy (X1/X2/X3/X5 + X4 decision) · relay letter (R8-17 re-targeted to BG/BH incl. U3-uSatColor) · FINAL.md | **R.W7** |
| U3-uSatColor consume · goo-blob→blob · subpath table · aurora-metal/dock-fission verify · parse-that 1.0.0 re-pin · K-W5RT router-5 · S.H3 Pratt · R8-20 CH-10 · R8-21 CH-13 · R8-23 timeline longhands · R-4/5/6/7/8/10 library defers | **BOOKS** (§3.3 + §4) |
| R8-18 fourier conformance-matrix corrections + fourier-web pin bump | **carry, fourier-owned** (named in the FN charter, §6) |
| R8-19 kf-side BOOKs (MCI-5 pad, P3-keyframe, light-dark per-target) | **carry, kf-owned** |
| CLOSED by O/P/Q (do NOT re-fold): setSubProperty O(N²) · color2Into egress · mixColorsInto · parseCSSSubValue · contrast-color() · VJ-Q5..Q9 | **closed** |
| OBSOLETE (evidence): "reach v1.0.0" event · 3.13.0/BA-4.0.0 pin targets · N.W18 abrogation sweep (interims never authored) | **pruned** |

---

## §10 — Prototype work-orders (emitted with this synthesis)

Five orders, each targeting a genuinely load-bearing uncertainty (not an easy win). Full self-contained prompts in the structured return.

| Key | Burns down | Kind | Design |
|---|---|---|---|
| `proto-gamut-policy` | R-1 vs R-8: which gamut policy (α-tune / MINDE-unify / gamut-relative) actually lands the U10 oracle — the head of R.W1 | impl | no |
| `proto-gamut-overlay` | The treatment's signature is net-new render surface with an unproven <2ms/frame budget and an undecided render path — the heart of R.W3 | impl | **yes** |
| `proto-boot-cascade` | Demo unbootable + is the 1440 dual-pane cascade root still live under glass-ui 4.2.0 (R7 could not confirm live) — gates R.W2 honesty | impl | no |
| `proto-glassui-consume` | The N.W13 rewrite assumes pure-consume works; if the landed primitives can't carry thumb-live-color / specimen rows, R.W3 needs interims after all | impl | no |
| `proto-golden-vectors` | R4 §4's own caveat: the twins' canonical-JSON cores must be byte-identical before the fixture is worth authoring — gates R.W6 | impl | no |

---

## §11 — Open questions for ratification

1. **Q1 — hero-lab placement**: in-R as the slippable R.W5 (this spec's stance), or formally deferred to S now?
2. **Q2 — wire-deploy X2**: the NCSU-alias retirement needs a maintainer on-host op — fire it inside R.W7, or record as a standing maintainer action and gate R.W7 only on X1/X3?
3. **Q3 — retro-tags**: annotate all 7 missing versions incl. v1.0.0 (this spec's stance: tags==registry is the most-degraded gate), or accept the gap and tag forward only?
4. **Q4 — pin policy**: ratify "keep `file:../glass-ui` deliberately + adopt-event books" (§3.4), or require a registry pin at the 5.0.0 cut (making every glass-ui break an explicit version event)?
5. **Q5 — the param rename**: clean-break `type→syntax`/`defaultValue→default` (kf deletes its shim) vs RECORD the current shape as canonical (no break, permanent shim)?
6. **Q6 — the 2.0.0 major**: is bundling gamut-policy + param rename into one honest 2.0.0 at R.W1 acceptable, or should the policy change ship alone as 1.3.0 with the rename deferred?
7. **Q7 — U10 target**: match browser `lab()` rendering exactly, or the L-COLOR midpoint (modest-L-trade, chroma-preserving)? proto-gamut-policy will table both; the final taste call is the owner's.
8. **Q8 — uSatColor escalation**: relay GAP-1 as a hard "ride 5.0.0 or name an owner" demand (this spec's stance after three silent slips), or accept it as a standing forward-dependency?
9. **Q9 — contract-doc neutral home**: R.W6 relocates (with fourier's concurrence) vs CONSTELLATION.md pointer only vs leave to fourier-N?
10. **Q10 — Parse-Lab**: ratify the fuse-into-ColorInput stance (§2.3), or does the O.W7 teaching intent (arbitrary `parseCSSValue`) still warrant a dedicated pane?
