SERVED MODEL: claude-opus-5[1m]

# FOURIER EVIDENCE RELAY — G24 · G33

**X·F · F.W10 unit `.f`** · spec `docs/tranches/X/fourier/waves/F-W10.md` §1a row 6, §2.4 (G24 ·
G33 · RELAY-RECEIPT-LAW · MG-ι · GAB-29), §3 G-F10-3 / G-F10-4 / G-F10-12, §4a.12, §4b's X·V row.
Written **2026-09-20**; the `2026-08-25` in the filename is the **spec row's authoring date**, fixed
by §1a row 6 *"so no seat invents a third channel"* — nothing is back-dated and no second file is
minted.

## §0 What this letter is, and what it is not

**RELAY-ONLY. THE GATES ARE X-W9's AND ARE NEVER CLAIMED HERE.** G24 and G33 are rows in **X·W9's
gate table** (cited by gate id; `X/waves/` is a live sibling, R2-2 clause 2). This letter relays
**measured state** and nothing else. Three prohibitions bind every line below, and each is
self-tested at the end of its section:

1. **MEASURE-AT-OPEN.** No banked number is quoted as current. Where a banked figure appears it is
   labelled **BANKED** and its provenance named.
2. **No fourier-tree edit is credited as an X-W9 gate.** Several legs below are green today because
   *fourier's own waves* landed work; every one is credited to the wave that landed it and to
   nothing else.
3. **ROUTE LAW (§4a.12).** Direct `parse-that → fourier` is FORBIDDEN — parser → value (X·V L1/L5)
   → packed release → consumers. **This letter mints no such edge.**

**Nothing here is asked of anybody.** No verb in this file is conditioned on a peer actor's act.

---

## §1 G24 — the import-drift relay (G-F10-3)

### §1.1 The instrument, re-run at this seat's own clock — UNRUNNABLE TO COMPLETION

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` (2026-09-20,
run ×2, identical) → prints **leg 1 RED**, **leg 2 RED**, then **throws** on leg 3:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
  '/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js'
  imported from …/probes/fourier-value-import-drift.mjs
```

exit **1** — by the uncaught throw, **not** by the probe's own `process.exit(red ? 1 : 0)` at `:74`.
**Leg 3 is the drift leg**, and it is the one that never runs.

**The cause, named rather than guessed.** Leg 3's *old* operand is a hard-coded path into fourier's
installed tree (`:54`): `${FOURIER}/web/node_modules/@mkbabb/value.js/dist/value.js` — the
**0.13.0-era layout**. F.W1's atomic tri-package transaction replaced that install with **4.0.0**,
whose export map ships `./color ./value ./css ./easing ./math ./transform ./quantize` over
`dist/subpaths/*` and **no `dist/value.js`**:

⟨cmd⟩ `node -e` on `fourier-analysis/web/node_modules/@mkbabb/value.js/package.json` →
`installed version: 4.0.0` · `has "." key: false` · `main: undefined` · `module: undefined` ·
⟨cmd⟩ `ls …/@mkbabb/value.js/dist/` → `anchors-C_wdoOYd.js` · `operations-CB_1wGy4.js` ·
`result-CZJK1CwL.js` · `subpaths`. **The reference build the instrument measures against is gone
from the machine** — which is a consequence of the uplift the constellation wanted, not a defect in
fourier's tree.

**Repaired by nobody here.** The probe lives at
`docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` — **outside F.W10's §1a
writable set** — and its cure is already homed: **`ESC-W9-G24-SUBSTRATE`** (COHESION §0ac) rules
that *"X-W9.f measures the eight analytic arms against the registry `0.13.0` tarball (`npm pack`
into a scratch directory outside every repo …); `../fourier-analysis` stays untouched."* **Cited,
not duplicated.** F.W10 relays the measured state and repairs no instrument.

### §1.2 The banked figures, labelled BANKED — and X-W9's own reproduction, READ not asserted

**BANKED (2026-08-28, the spec's own cell):** *8/22 curves drift, max|Δ| **0.192** vs `<1e-3` over 8
names.* **That number is NOT re-measurable with the instrument as written today** (§1.1), and it is
**not quoted here as current**.

It was, however, **reproduced from a different substrate by the wave that owns the gate**, and that
receipt is read at its bytes rather than taken on trust —
`docs/tranches/X/waves/evidence/W9/bench-table-4.1.md` §3 (`ESC-W9-G24-SUBSTRATE`'s discharge):
`@mkbabb/value.js@0.13.0` `npm pack`ed, `mkbabb-value.js-0.13.0.tgz`, 90,832 bytes, sha256
`b943f722a968…`, registry `dist.shasum` `0a8806331c4e…`; run against the **published 4.0.0 tarball**
it returns *"8 of 22 names drift >= 1e-3; worst overall 1.923e-1 (ease-out-circ)  RED"*, name for
name. §4 of the same file then reads the **4.1.0 worktree cut**: *"0 of 22 names drift >= 1e-3;
worst overall 4.563e-6 (ease-in-out-back)  GREEN"*, the eight restored arms bit-exact at `0.000e+0`.

**Credited to `X-W9.f`, claimed by nothing here**, and read with the limit its own author disclosed:
*"Our acceptance target is `<1e-3`; fourier's ESC-4 gate is `Δ = 0`, which a `1e-3` tolerance cannot
certify."* **And 4.1.0 is not published** — ⟨cmd⟩ `npm view @mkbabb/value.js version` → **4.0.0**;
⟨cmd⟩ `node -p "require('./package.json').version"` → **4.1.0** (worktree). What fourier resolves
today is **4.0.0**, the build in which the eight arms *do* drift.

### §1.3 The consumer coupling, measured at fourier's live bytes — and the TWO EIGHTS that must never be fused

Every figure in this sub-section was read at fourier's tree **read-only**, 2026-09-20, double-run:

| what the probe's prose asserts | what the bytes read today | credit |
|---|---|---|
| *"fourier's 5 import sites all write `from "@mkbabb/value.js"`"* (`:4`, `:26-32`) | ⟨cmd⟩ `grep -rn 'from "@mkbabb/value.js"' web/src/` → **0 sites**; ⟨cmd⟩ `grep -rn 'from "@mkbabb/value.js/' web/src/` → **7 subpath sites** | **F.W1** (the uplift), NOT an X-W9 gate |
| *"`timingFunctions` … consumed at `web/src/lib/easings.ts:9,55-58`"* (`:45`) | ⟨cmd⟩ `grep -rn 'timingFunctions' web/src/` → **2 hits, both prose comments** (`:9`, `:157`); **zero call sites** | **F.W1 / ESC-4** |
| leg 3's drift question (does the consumer carry the bump's shape change?) | `web/src/lib/easings.ts:8-23` — **ESC-4 (COHESION §0o), DRIFT REFUSED**: eight analytic keys imported from `@mkbabb/value.js/easing`, the other **fourteen DEFINED THERE**, *"each reproducing the pre-bump 0.13.0 function EXACTLY (MPC-5's sampler asserts Δ = 0 at every sample point, all 22 keys)"* | **F.W1 / ESC-4** |

⚠ **THE TWO EIGHTS ARE DIFFERENT SETS, AND THEY ARE DISJOINT.** A later seat reading "eight" twice
in one paragraph would fuse them; the sets are therefore printed whole, from the bytes:

- **G24's eight** (the arms that drift 0.13.0 → 4.0.0, from the banked table and X-W9's
  reproduction): `ease-out-circ` · `ease-in-expo` · `ease-in-circ` · `ease-in-quad` ·
  `ease-in-cubic` · `ease-out-sine` · `ease-in-sine` · `ease-out-quad`.
- **ESC-4's eight** (the names fourier still imports from the producer, ⟨cmd⟩ `sed -n '26,35p'
  web/src/lib/easings.ts`): `linear` · `easeInOutQuad` · `easeOutCubic` · `easeInOutCubic` ·
  `easeInOutSine` · `easeOutExpo` · `easeInOutExpo` · `easeInOutCirc`.

**Intersection = ∅.** Fourier imports exactly the names that did **not** drift and owns the ones
that did. That is the consumer-side shape of the coupling today — **relayed, never booked as a
gate**, and never as a claim that G24 is green: G24 measures the **producer's curves**, and its
falsifier list names *"claiming the gate"* first.

### §1.4 Two instrument-scope drifts, recorded beside the instrument and repaired by nobody here

1. **Leg 1's site list is a hard-coded literal** (`:26-32`), not a measurement. It prints five
   consumer breakages that **no longer exist** (§1.3 row 1). The leg's *package* finding still holds
   — the installed 4.0.0 genuinely has no `"."` key — but its *consumer* half is stale by
   construction and cannot self-correct.
2. **Leg 1 reads the wrong package.json for a consumer question**: `:24` requires
   `${VALUE}/package.json`, this **worktree** (`4.1.0`), while fourier resolves the **published
   4.0.0**. Both answer `has "." → false` today, so the verdict coincides; the *version string the
   probe prints* is the worktree's, and a reader taking it for the resolved version reads a build
   fourier cannot install.

Both are **findings against an X-W9 instrument**, filed here because this relay measured them, and
**routed nowhere by this wave**: the file is outside §1a, and `ESC-W9-G24-SUBSTRATE` already owns
the substrate cure. **No masking fallback was added, no import was patched, no `try/catch` was
placed around the throw.**

**G-F10-3's falsifiers, self-tested**: the banked `0.192` appears **twice above, both times labelled
BANKED** and never as a current reading · **no gate is claimed** · **no fourier-tree edit is credited
as an X-W9 gate** — every green leg in §1.3 is credited to F.W1/ESC-4 in its own row.

**The disjointness is measured, not eyeballed** (the two sets are spelled in different cases, which
is exactly how a fusion happens): ⟨cmd⟩ `node -e` mapping the eight imported identifiers to kebab
labels → `linear · ease-in-out-quad · ease-out-cubic · ease-in-out-cubic · ease-in-out-sine ·
ease-out-expo · ease-in-out-expo · ease-in-out-circ`; `drift n=8 · imported n=8 · intersection: 0`.

---

## §2 G33 — packets, ledger rows, and the post-window pin (G-F10-4)

### §2.1 The three readable legs — measured here, credited to `X-W9.i`

⟨cmd⟩ (this seat, 2026-09-20, ×2 identical):

| leg | reading | whose act |
|---|---|---|
| five packets | `ls docs/tranches/V/coordination/*-inbox-2026-09-18-*.md \| wc -l` → **5** — `atlas-…-export-delta-refresh` · `fourier-…-facility19-delta` · `glassui-…-r1-relay` · `keyframes-…-cut-notice` · `parse-that-…-evidence-addendum-2` | **X-W9.i** |
| five ledger rows | `grep -cE '^\| O-3[4-8] \|' docs/tranches/V/coordination/INBOX.md` → **5** | **X-W9.i** |
| the exact pin acknowledged before the tag | `../keyframes.js/package.json:71` → `"@mkbabb/value.js": "4.0.0"` (exact, unchanged) | **X-W9.i** |

**Relayed, not claimed.** X-W9's own record reads *"**G33 GREEN on its three readable legs**"*; this
letter reproduces the three readings at its own clock and credits them where they were earned.

### §2.2 The post-window `npm ls` leg — READ TODAY, AND DECLARED **PRE-WINDOW**

⟨cmd⟩ `npm ls @mkbabb/value.js`, exit code captured, ×2 per tree:

- `fourier-analysis/web` → **exit 0 · 0**; tree: `@mkbabb/glass-ui@8.0.0 → 4.0.0 deduped` ·
  `@mkbabb/keyframes.js@6.0.0 → 4.0.0 deduped` · `@mkbabb/value.js@4.0.0` direct.
- `keyframes.js` → **exit 0 · 0**; `@mkbabb/glass-ui@7.0.0 → 4.0.0 deduped` · `@mkbabb/value.js@4.0.0`.

⊘ **THIS IS NOT THE POST-WINDOW LEG, AND IT IS NOT PUBLISHED AS ONE.** G-F10-4's own falsifier list
names *"reading the post-window leg before the window"*. **The window has not opened**: ⟨cmd⟩
`npm view @mkbabb/value.js version` → **4.0.0** while this worktree reads **4.1.0** — the 4.1.0 cut
is **unpublished and untagged**, and X-W9's own G33 cell states the pin leg green *"before any
tag (version still `4.0.0`)"*. What the two exit-0s measure is therefore the **4.0.0 resolution
state**, banked here as a **PRE-WINDOW reading**, exactly as X-W9 banked its own.

**Credit: F.W1's atomic tri-package transaction**, which moved fourier's manifest off `^0.13.0` —
⟨cmd⟩ `grep -n '@mkbabb' web/package.json` → `glass-ui ^8.0.0` · `keyframes.js ^6.0.0` ·
`latex-paper ^0.2.1` · `pencil-boil ^0.11.2` · `value.js ^4.0.0`. **A fourier-tree edit, and it is
not credited as an X-W9 gate.**

### §2.3 IDENTITY DISCIPLINE ×6 — ONE row, never re-booked per component

**`fr-AnimationControls C-1` ≡ `fr-BasisCanvas C-8`** — **one identity, component-altitude INFO**,
folded to the F.W1 tri-package charter by the registry itself (`fr-AnimationControls.md:36`:
*"Identity = census §1 pins row AMENDED + the G33 gate — already FOLDED … ONE identity,
component-altitude INFO, never re-booked per component"*; `fr-BasisCanvas.md:59`: *"one identity,
**→ F.W1**, not a second booking"*).

**The reproductions, named so no seat books a seventh row**: `C:B-1` · `C-2` · `C-4` · `C-27` ·
`F-1` · `PaperView C-03`. **C-03's only increment is the live-today framing**, not a second finding.
**This letter carries ONE row for the identity, and it is this paragraph.**

Its banked condition — glass-ui 4.0.0 declaring `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` against
an installed 0.13.0, `ELSPROBLEMS exit 1`, *"reproduced ×6 across the registry"* — is **discharged
at the bytes**: glass resolves **8.0.0** in fourier and `npm ls` exits **0** (§2.2). Discharged by
**F.W1**, credited there, claimed by nothing here.

### §2.4 The uncommitted-bump dissent — CARRIED, and its predicate re-measured

**The dissent, verbatim in substance** (fr-CollapsibleSection rider, ADOPTED at §2.4's G33 row):
*the ERESOLVE is the UNCOMMITTED M.W1a bump — "red today" is true of the working tree ONLY; ties
GAB-13.*

**It travels intact, and it is now measured rather than argued.** ⟨cmd⟩
`git -C ../fourier-analysis status --porcelain` → **one row, `?? .worktrees/`** (untracked
worktree dir; no tracked modification); ⟨cmd⟩ `git -C ../fourier-analysis log --oneline -1 --
web/package.json` → **`8fd35a9`** — **the manifest is committed**. So the dissent's predicate no
longer holds in *either* direction: the reading above is not a working-tree reading, and a seat that
re-ran it tomorrow against a clean checkout would get the same exit 0. **The dissent is not
withdrawn** — it is recorded with the measurement that retires its condition, which is what GAB-13's
*"gates written against the dirty worktree measure a tree no commit holds"* asks for.

⚠ **One adjacent dirty tree, disclosed rather than smoothed**: ⟨cmd⟩
`git -C ../keyframes.js status --porcelain` → **2 rows**, both `??` letters under
`docs/tranches/V/coordination/` (`VALUEJS-INBOUND-2026-07-24-…` · `VALUEJS-INBOUND-2026-07-27-…`).
**Neither is a manifest** — `package.json` is clean there, so §2.1's pin reading and §2.2's exit-0
are unaffected. Recorded because the dissent's whole point is that a reader cannot tell without
looking.

---

## §3 RELAY-RECEIPT-LAW applied to this wave (G-F10-12)

**The law, as §2.4 adopts it**: *"no value.js gate goes RED when a relay does not leave"* → **(a)** an
arm declared GLASS-OWNED / RELAY / LATEX-RELAY may not CLOSE *"until a packet file exists **under the
producer's inbox path** CONTAINING THE ARM'S IDENTIFYING TERM"*; **(b)** *"relay-declared-never-sent"*
enters DISEASE-REGISTRY; and its second failure mode, **RELAY-SENT-NEVER-READ**, is cured by binding
the sweep to the recipient's **live** inbox path. **This wave is bound by it to itself.**

### §3.1 The denominator, re-measured: **TWELVE**

⟨cmd⟩ `find ../glass-ui/docs -name 'valuejs-outbound-*.md' | wc -l` → **12** (×2). The spec's cell
banks **eleven** (BJ's ten ⊕ BK's O-20); the twelfth is
`BK/coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md`, landed since the spec was written.
**The denominator is published, not inherited** — a sweep over a stale denominator is the same defect
as a sweep over a superseded inbox path (§2.8 E-2's own lesson, one axis over).

### §3.2 The sweep — three arms, **three zeros, three different causes**

⟨cmd⟩ `grep -rl <term> ../glass-ui/docs/tranches/B*/coordination/valuejs-outbound-*.md | wc -l`,
double-run, over all twelve:

| arm | files carrying its term, of 12 | what the zero means |
|---|---|---|
| **`MetricPill`** | **0** · **0** | **CORRECT, AND IT MUST STAY 0.** GAB-29 is a **cure-falsifier, not a destination** (§2.4): MetricPill is barrel-only-reachable with **no source at 8.0.0**. A packet naming it would be the wave adopting a dead primitive *off the name* — the precise thing GAB-29 exists to prevent. **No relay debt is booked for this arm** |
| **`IntersectionObserver`** (FR-GIG-5's observer-root fix) | **0** · **0** | **RED — AUTHORED, NOT LANDED.** §3.3 |
| **`latex-paper`** | **0** · **0** | **RED, but not against this path** — latex-paper is a *different producer*, and it **has no inbox path at all** (E-7, re-measured by unit `.d`). Its arm cannot be discharged by a glass packet, and the delivery point unit `.d` named is where its receipt will have to appear |

**A zero published without its cause is a number a later seat will mis-read.** Two of the three are
findings; one is the correct reading of a falsifier.

### §3.3 The cross-check that sharpens the RED — **authored in our tree, not landed under theirs**

Re-swept over the wider correspondence set (the twelve ⊕ the three glass-addressed letters that live
in **our** tree), ⟨cmd⟩ over 15 files:

- `IntersectionObserver` → **1** · `FR-GIG-5` → **1** — both in
  `docs/tranches/X/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (**NWO-1**, rowed
  **O-23**).
- `latex-paper` → **1** — in `docs/tranches/X/coordination/value-to-glassui-2026-09-DD-fw4-relay.md`
  (rowed **O-32**).

**Both letters exist; neither is under the producer's inbox path.** That is G-F10-12's own falsifier
spelled out — *"a relay counted green because a letter was authored but not landed under the
producer's path"* — and it is published **against this sub-tranche's own interest**, because
`X.F.W10.c` reasonably counted `FR-GIG-5` as *dispatched at NWO-1 L-1* when reconciling the
seventeen §4a arms. **Both readings are true of different questions**: the arm **is** disposed in our
register (c's question) and its **receipt does not yet exist at the recipient's path** (this gate's
question). The carriage hop is the **X formation mail seat's** act — sibling trees are READ-ONLY to
every wave seat — and `O-43`'s own status cell already says so: *"Cross-repo placement PENDING the
SS-6 batch's next boundary."*

⚠ **Disclosed because it is visible in the filenames**: two of those letters are named
`…-2026-09-DD-…` — a **literal unresolved date token**. Recorded as further evidence of
*authored-not-landed*; **the paths are outside this unit's writable set and nothing was renamed.**

### §3.4 The two GREEN-BY-RECEIPT arms — READ at the bytes, never asserted

- **U-1..U-11**: `BJ/coordination/valuejs-outbound-2026-07-28-o17-full-debt-discharge.md` (76 lines)
  — ⟨cmd⟩ `grep -oE 'B-[0-9]+' | sort -u` → **B-1 … B-10** (ten rows) and ⟨cmd⟩
  `grep -oE 'U-[0-9]+' | sort -u` → **U-1 … U-11** (all eleven arms named), with `:20` reading
  *"**B-1 (U-1 + U-5 — CONVERGENT…)**"* — the convergent pair that makes ten rows carry eleven arms.
- **The F-side `@source` / FR-NP-32 arm**: ⟨cmd⟩ `grep -rl '@source'` and `grep -rl 'FR-NP-32'` over
  the twelve → **exactly one file each, the same file**,
  `BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` (O-20, row A-1).

**Both are receipts READ.** Neither is re-sent, re-authored or re-counted here.

**G-F10-12 therefore stays SPLIT, and this letter does not average it**: GREEN by verified receipt on
the U-arms and the `@source`/FR-NP-32 arm; **RED** on `IntersectionObserver` and `latex-paper` with
the cause now named; **`MetricPill` books no debt at all**.

---

## §4 MG-ι — the value-side limb ⚑ **OWNER-MAIL FLAG**

**The banked limb** (`fr-App:82/:143`, MINOR): *the `color2` dispatch mis-reads its sibling parser —
`color2(parseCSSColor(x))` **THROWS**; the `.value` unwrap **SILENTLY RETURNS WRONG CHANNELS**;
`light-dark()` still needs the used-value probe.*

**Routing, restated and not re-minted**: the fourier-side remedy constraint is **F.W1's** (with C-2)
— *the sound path is `colorUnit2`; `color2` NEVER*. **The value.js-side limb is NO-WAVE-OWNER in the
F-taxonomy** and is relayed to the **V·π / parser-seam ledger WITH THE OWNER-MAIL FLAG**. **No
fourier wave adopts it.** `X.F.W10.c` has already landed it in COHESION **§4.2 row 10** under exactly
that verb — **cited here, not re-booked**.

⚠ **MEASURED AT OPEN, AND THE MEASUREMENT MATTERS**: the limb is stated against the **0.13.0**
surface, and **both of its symbols have moved at the 4.x cut**. ⟨cmd⟩ `Object.keys()` over each
published subpath of this worktree's `dist/`:

| symbol as the limb spells it | on the 4.x published surface |
|---|---|
| `color2` | **absent from all seven subpaths** (`./color` 28 names · `./css` 20 · `./value` 1 · `./easing` 17 · `./math` 9 · `./transform` 3 · `./quantize` 2) |
| `colorUnit2` | **absent** likewise — the "sound path" the constraint names is not an exported name at 4.x |
| `parseCSSColor` | **absent under that spelling**; the shipped name is **`parseCssColor`**, on **`./css`** (⟨cmd⟩ `grep -rn 'export function parseCssColor' src/` → `src/css/grammar.ts:290`) |

**Consequence, relayed and not resolved here**: the limb cannot be actioned as written — a seat
grepping the 4.x surface for `color2` finds nothing and would wrongly conclude the defect is cured.
**It is re-stated as an owner-mail item, not re-adjudicated**: whether the dispatch defect survives
the 4.x re-shaping is a **parser-seam question for V·π**, and answering it here would be this wave
re-ruling an owner-gated row. **ROUTE LAW holds: no `parse-that → fourier` edge is minted by this
letter** — the path is parser → value (X·V L1/L5) → packed release → consumers.

---

## §5 GAB-29 — terminal record (INFO; **cure-falsifier, NOT a destination**)

**Banked**: *MetricPill is barrel-only-reachable and has **NO source at v8.0.0** (dies with
MetricBadge) — "the wave must not adopt it off the name either."*

**Re-measured at the build fourier actually resolves** (read-only, 2026-09-20):
⟨cmd⟩ `node -p` on `fourier-analysis/web/node_modules/@mkbabb/glass-ui/package.json` → **8.0.0** ·
⟨cmd⟩ `grep -rl 'MetricPill' …/glass-ui/dist` → **0 files** · `grep -rl 'MetricBadge' …/dist` → **0
files** · ⟨cmd⟩ `ls …/dist | grep -i metric` → `metric.d.ts` · `metric.js`, whose whole content is
`export * from "./components/metric/index.js";` and whose export-map entry is
`"./metric": {"types":"./dist/metric.d.ts","import":"./dist/metric.js"}`.

**The banked record holds at the bytes**: both names are gone; the live primitive is **`./metric`**,
which is K-4's ruling for the F.W1 seat (`<Metric posture="cell">` from `./metric` at 8.0.0).
**LOAD-BEARING and terminal**: this row keeps the wave off **two** dead primitives, and it is
recorded as a falsifier — **it is not a relay destination, and §3.2 books no packet debt for it.**

---

## §6 Bounds, self-count, and what is claimed

**CLAIMED: nothing.** G24 and G33 are **X-W9's** gates. This letter turns **G-F10-3**, **G-F10-4**
and **G-F10-12** — F.W10's *relay* gates — and every reading it publishes is either measured here at
its own clock or read from another wave's evidence **with that wave named**.

**Credited elsewhere, by name**: the consumer-side drift refusal and the uplifted manifest → **F.W1 /
ESC-4**; the five packets, five rows and pre-window pin bank → **X-W9.i**; the tarball substitution
and the 4.1.0-cut table → **X-W9.f** under `ESC-W9-G24-SUBSTRATE`; the seventeen-arm §4a
reconciliation → **X.F.W10.c**; the latex delivery point and the O-24/O-33 reconciliation →
**X.F.W10.d**. **No fourier-tree edit is credited as an X-W9 gate anywhere above.**

**BOUNDS.** Writes: **three paths**, all inside this unit's §1a writable set — this letter (CREATE),
`docs/tranches/V/coordination/INBOX.md` (**append only**), and the wave record
`docs/tranches/X/execution/C/F-W10.md`. **`fourier-analysis/**` was READ-ONLY throughout** (`git`,
`grep`, `ls`, `sed`, `node -e` as readers only) and its porcelain is byte-identical at open and
close; **glass-ui READ-ONLY always**; **keyframes.js READ-ONLY**; the X-W9 probe **not repaired, not
patched, not wrapped**; `scripts/dev/dev.sh` never opened. Pathspec commits only.

**SELF-COUNT**, read from the settled bytes from outside the file: ⟨cmd⟩ `wc -l` → the count
published in this unit's receipt at `docs/tranches/X/execution/C/F-W10.md` `### X.F.W10.f`, measured
after the final append and double-run. Line 1 reads `SERVED MODEL: claude-opus-5[1m]`.
