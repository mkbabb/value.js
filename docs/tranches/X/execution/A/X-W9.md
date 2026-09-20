SERVED MODEL: claude-opus-5[1m]

# X-W9 — Parser and library apotheosis (the 4.1 cut) — EXECUTION RECORD (Track A · X·V)

**Spec of record**: `docs/tranches/X/waves/W9.md`, dated 2026-08-03, **IMMUTABLE** (E-3 — this record
never edits it; the status fields at §State are moved only by the wave's own close act, which is the
spec's single named exception, §File Bounds row `docs/tranches/X/waves/W9.md | modify (status fields
at close)`).
**Runbook**: `EXECUTION-RUNBOOK.md` §1.1 (order) · §3.4 (locks) · §5 (seat law).
**Rulings consumed, by id, never re-opened**: COHESION **§0k.2** (DR-21 — NO opt-out; CC-088 BUILD at
X-W9.f in the same dated cut as CC-084) · **§0k.3 S-3** (`src/color/model.ts` — narrow reading) ·
**§0j.F** (BRANCH-TOPOLOGY, three words) · **§0i.1** (S-4 disposition C — no parser adoption in this
wave; G31 is unamended) · **§0i.2** (glass 8.0.0 — informational here; this wave is producer-free).

---

## Open

**Opened 2026-09-17** (the sitting's date; wall clock 2026-09-18 20:0x–20:2x EDT). **Seat 0 (OPEN)**,
`claude-opus-5[1m]`, Track A. Substrate: `tranche-u` @ **`ba4e1de5`**, node **v26.0.0**, darwin arm64,
`dist/subpaths/` present and fresh (built 2026-09-18 19:57 by a sibling seat's typecheck).

### 0. CRASH-RECOVERY sweep (standing law — the host was restarted 2026-09-18)

⟨cmd⟩ `git status --porcelain` → 15 rows. **None is inside this seat's writable set**
(`docs/tranches/X/execution/A/X-W9.md` — absent before this act — and
`docs/tranches/X/execution/LEDGER.md`, clean). The dirty rows are, by owner:

- `demo/palettes/**` (7 files) · `demo/shell/dock/layers/SlugEditLayer.vue` — sibling-seat work (X-W7 /
  X-W4 surfaces). **Not touched.**
- `demo/picker/controls/ComponentSliders/ConsoleRail.vue` — **X-W4.a's in-flight carve** (the file
  X-W9.h is sequenced against; see §3 below). **Read read-only, not touched.**
- `docs/tranches/V/reformation/CARRY-LEDGER.md` — pre-X standing row. **Not touched.**
- `scripts/dev/dev.sh` — unowned, dirty by standing arrangement, **NEVER staged, NEVER touched**
  (DR-24, permanent for tranche X).
- untracked `docs/tranches/X/waves/evidence/` · `e2e/smoke/a11y-control-targets.spec.ts` ·
  `e2e/smoke/mobile/a11y-control-targets.spec.ts` — X-W1's evidence and specs.

**No killed predecessor's partial work exists on X-W9**: no file of §File Bounds' writable set is
dirty except `ConsoleRail.vue`, whose diff is X-W4's (rail focus + keyboard operability, not the
`componentDescription()` carve X-W9.h owns). Nothing inherited; nothing stashed; nothing restored.

### 1. E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**2026-09-18 20:03 EDT**), compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **Status/Routing cell**,
never from a bare `grep -i unread` (X.P.W0 CHECK 1 D-1); `INBOX.md` **self-excluded** (SELF-COUNT law).

1. `docs/tranches/V/` — 10 `.md`; newest `PALETTE-CONTRACT.md` (18:43) is an architecture doc, not mail.
   `docs/tranches/V/coordination/` — 18 entries; newest
   `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` (19:00) = **O-31**, rowed (3 hits).
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**:
   ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` (Sep 18 17:53) · `BJ/` (Aug 3) ·
   `BI/` (Jul 28). 9 entries; newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` (17:18) =
   **I-35**, rowed (10 hits) and its Status cell reads READ + CONSUMED WHOLE.
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 `.md` + `vnext/`; newest Sep 17 19:08; all rowed.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 entries; newest Aug 3 15:01; all rowed.

Delta command, against the last recorded sweep clock:
⟨cmd⟩ `/usr/bin/find <each path> -maxdepth 1 -name '*.md' -newermt '2026-09-18 01:36'` →
`docs/tranches/V/PALETTE-CONTRACT.md` (not mail) · `…/coordination/INBOX.md` (self-excluded) ·
`…/valuejs-outbound-2026-09-18-kfw7-bh-relay{,-ADDENDUM-A9}.md` (ours, outbound, rowed) ·
`…/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md` (rowed as I-35).

**Result: 0 unrowed · 0 `I-n` minted · 0 UNREAD addressed to X-W9's scope.** The three live UNREAD
status cells reproduce — **I-32** (`…-valuejs-o20-disposition.md`), **I-33**
(`…-constellation-o20-relay.md`), **I-34** (`…-bbnf-lang-9.0.0-addendum.md`) — and **all three route
by their own Routing cells to X-W0.j / the X formation mail seat / X-EXT-1..6**, none to the library
band, the 4.1 cut, or the five packets X-W9.i owes. `INBOX.md` therefore carries **no edit** from this
open act (a sweep line is appended by the wave's mail-bearing unit, X-W9.i, with its packet rows —
one commit, one meaning).

Standing inbound relevant to this wave's **content** (already rowed, already READ, listed so the
packet author does not re-derive them): `value-inbox-2026-07-24-parser-totality-exposure.md` and
`value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md` — the **widened R1 input class** and
**K1–K4** that ride X-W9.a's commit-1 battery and X-W9.i's keyframes packet.

### 2. `Opens after` — verified at the bytes AND in the ledger

| condition (spec §State / §Dependencies) | verification | verdict |
|---|---|---|
| **X-W0** closed | `execution/LEDGER.md` Track A row X-W0 = **CLOSED 2026-09-17 (honest-RED: HG-8 — ESC-N1)**; record present at `execution/A/X-W0.md` (367,190 B) | **MET** |
| (a) DR-21 ruled | COHESION **§0k.2**: *"DR-21 — NO opt-out. … CC-088 is BUILD at X-W9.f in the same dated cut as CC-084 … **X-W9 §X.W9.f may open.**"* | **MET** |
| (b) DR-19 structural proof-farm ban | COHESION **§0j.A** row DR-19 = RETIRE + grep-checkable ban. This wave's gate set is checked against it: **0** of the 33 gates is a `scripts/**/proof-*.mjs` (§Hard Gate denominator note, structurally honoured) | **MET** |
| (c) CC-025 relabel — no gate cites `264/264` | ⟨cmd⟩ `grep -c '264/264' docs/tranches/X/waves/W9.md` → **0** | **MET** |
| (d) DR-23 track-or-archive for the four probes | ⟨cmd⟩ `git ls-files <four probe paths>` → all four printed (`src-surface-totality.mjs`, `library-band-gates.mjs`, `consumer-surface-compile.mjs`, `fourier-value-import-drift.mjs`) | **MET** |
| P-7 (a)–(d) booked (orchestrator note) | **verified, never edited**: `docs/tranches/X/refinement/X-W9-FOLD.md` §20 — *"P-7 is hereby RECEIVED at the X·V end"*, clauses **(a)** `:1467` · **(b)** `:1476` · **(c)** `:1501` · **(d)** `:1445`, and §15 CrossEdges carries *"the F.W2 → X-W9 P-7 reciprocal, RECEIVED"*. `W9.md` is untouched by this seat | **MET** |
| BRANCH-TOPOLOGY (§0j.F) | word (1) the two `ci(release)` commits (`e2652f1c` · `44ddaff7`) ride into `tranche-u` **before X-W9's cut**, as **X-W1's first commit** (word (3): `release.yml` joins X-W1's bounds) — **an X-W1 obligation, re-measured by X-W9.f at its open**; word (2) `7334c793`'s `src/v4` relocation **does not bind X-W9**; `tranche-u` is the tree of record | **RECORDED — gating X-W9.f only** |

### 3. The three carve-sequenced cross-wave files (§Disjointness §4a), measured now

| file | other writer | that wave's ledger status **now** | consequence for this wave |
|---|---|---|---|
| `docs/tranches/V/ARCHITECTURE.md` (`:657`) | X-W8 (`:943-945`) | **planned** (not open) | **X-W9.g free to run** — the spec's own alternative (*"or runs while X-W8 is not open"*). `.g` re-reads the row at its open and halts if X-W8 has since opened |
| `demo/picker/controls/ComponentSliders/ConsoleRail.vue` | X-W4.a (`modify-carve`) | **OPEN 2026-09-17** — and the file is **dirty in the working tree with X-W4's edit** | **X-W9.h is GATED**: it is scheduled last and its first act is to re-read the X-W4 ledger row; if X-W4 is not CLOSED it writes **no byte** and returns the deferral |
| `eslint.config.js` | X-W4.d **and** X-W8.b/.e | X-W4 **OPEN**, X-W8 **planned** | **X-W9.f is GATED on X-W4 alone**; scheduled last, re-reads both rows at open, and halts before any write if either is OPEN (the two scoped rule objects ride commit 9 and may not be split out — §4a, Commit Plan row 9) |

This is a **unit-level** sequencing, not a wave-level block: the wave's own `Opens after` (X-W0) is MET,
and §State says *"No other unit is ordered against X-W2..X-W8."* Seven of the nine units are free.

---

## Baseline — the §6 born-RED table re-executed READ-ONLY at open

Every count below was read from the settled bytes at `ba4e1de5` and **double-run**; the two probe
transcripts are byte-identical across runs (⟨cmd⟩ `diff -q run1 run2` → silent, twice). `src/` itself
has **not moved** since the spec's substrate: ⟨cmd⟩ `git diff --stat 41450f02..HEAD -- src/
package.json scripts/ci/` → `package.json | 8 +-`, `scripts/ci/boot-smoke.mjs` (new, X-W1),
`scripts/ci/oracle-slate.mjs` (new, X-W1) — **zero `src/` bytes changed**, so the 2026-08-03 baselines
are expected to reproduce, and they do.

| # | measured at open (2026-09-18) | spec's banked state | verdict |
|---|---|---|---|
| G1 | `src-surface-totality.mjs` **exit 1 · RED — 28 failing assertions** | RED · 28 | **RED-AS-SPEC** |
| G2 | 9/9 empty-body colour functions throw `TypeError: Cannot read properties of undefined (reading 'replace')` (`oklch() rgb() hsl() lab() color() rgba() lch() oklab() hwb()`) | RED · 9/9 | **RED-AS-SPEC** |
| G3 | `library-band-gates.mjs` LIB-02 — **33** published functions throw on a JS-boundary value; by subpath **value 1 · css 18 · easing 1 · math 5 · transform 8** | RED · 33 (1/18/1/5/8) | **RED-AS-SPEC** |
| G4 | LIB-01 — **5/5** `Object.prototype` keys throw (`constructor: TypeError`); control `easing('ease')` ok, unknown → `easing_name_unknown` | RED · 5/5 | **RED-AS-SPEC** |
| G5 | `npx eslint 'src/css/**/*.ts' --rule …` → **94 problems (94 errors)**, exit 1 | RED · 94 | **RED-AS-SPEC** |
| G6 | `getTotalLength` over the 10 M-less hostile inputs → **10/10 throw** `Cannot read properties of undefined (reading 'len')` | RED · 10/10 | **RED-AS-SPEC** |
| G7 | MTS-04 — expanded **31.403311569547547** vs compact **0** (true circumference 31.41592653589793) | RED · expanded 31.403311569547533 | **RED-AS-SPEC** · INFO: the expanded arm differs from the banked figure in the last two digits (Δ ≈ 1.4e-14, float-order noise); the defect (compact = 0) is identical |
| G8 | `getTotalLength("M 0 0 L 10")` → **NaN**, `typeof number`; same for `C`-short and `Q`-short | RED · *returns `null`* | **RED-AS-SPEC, sentinel DIVERGENT** — the banked reading says `null`, the tree returns `NaN`; both violate `transform.d.ts:55`'s `: number`. X-W9.b cures the class (reject, don't truncate) and restates the falsifier at its own bytes |
| G9 | MTS-05 — `decomposeMatrix3D(singular)` → `{translate:[0,0,0], scale:[0,NaN,NaN], skew:[NaN,NaN,NaN], quaternion:[NaN,NaN,NaN,NaN], perspective:[0,0,0,1]}` (expected `null`) | RED · `[0,null,null]` | **RED-AS-SPEC, sentinel DIVERGENT** (NaN where the spec banked null; same defect) |
| G10 | `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule …` → **155 problems (155 errors)**, exit 1 | RED · 155 | **RED-AS-SPEC** |
| G11 | MTS-06 — `deCasteljau(0.5,[])` → `undefined` typed `number`; `interpBezier(0.5,[])` → `[undefined,undefined]`; `lerpArray(len3,len2,.5,out3)` → `[2.5,3.5,NaN]` | RED, same three | **RED-AS-SPEC** |
| G12 | `consumer-surface-compile.mjs` **exit 1 · RED — 4 failing assertions**: TS2459 `CssValue` (`./css`), TS2459 `ColorFactory` (`./color`), TS2307 on the root, `ERR_PACKAGE_PATH_NOT_EXPORTED` at the 5 fourier sites | RED · 4 | **RED-AS-SPEC** |
| G13 | `grep -c '^declare ' dist/subpaths/*.d.ts` → **33** (css 18 · value 6 · quantize 6 · easing 2 · color 1) | RED · 33 | **RED-AS-SPEC** |
| G14 | `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **58**; `grep -c '_2'` → **25** lines | RED · 58 / 25 | **RED-AS-SPEC** |
| G15 | MTS-08 — `./css` exports `serializeCssColor` + `serializeTimelineOptions` but **not** `serializeCssValue`; the keyframes fork at `compile/emit/css-text.ts:41` is live | RED | **RED-AS-SPEC** |
| G16 | max `src/**/*.ts` LoC → **899** (`src/css/stylesheet.ts`); then 609 · 564 · 483 · 377 | RED · 899 | **RED-AS-SPEC** |
| G17 | LIB-04 — **2** modules reach past the barrel (`src/css/grammar.ts`, `src/css/types.ts`; 3 statements) | RED · 2 / 3 | **RED-AS-SPEC** |
| G18 | `test/v4-color-behavior.test.ts:66` reads `expect(converted.channels[1]).toBeCloseTo((byte / 255) / 12.92, 12)` under the name *"matches the independent IEC sRGB dark-band oracle"* | RED | **RED-AS-SPEC** |
| G19 | no coverage configuration anywhere: `grep -c coverage vite.config.ts` → **0**; `grep -n coverage vitest.config.ts` → **nothing**. Denominators re-measured: **142** declared export names across `dist/subpaths/*.d.ts` · **79** runtime exports (color 23 · css 19 · easing 16 · math 9 · transform 9 · quantize 2 · value 1) | RED · 142 / 79 | **RED-AS-SPEC** — the two denominators reproduce exactly |
| G20 | `scripts/ci/verify-packed-surface.mjs:137` emits hardcoded `strictTypes: 62`, produced by no check | RED | **RED-AS-SPEC** |
| G21 | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/` → **0** | RED · 0 | **RED-AS-SPEC** |
| G22 | `'toHex' in color` → **false**; `'easingNames' in easing` → **false** | RED | **RED-AS-SPEC** |
| G23 | `easing(k) === easing(k)` and `.value` identity → **false 4/4** (`ease`, `ease-in`, `ease-out`, `ease-in-out`) | RED · 4/4 | **RED-AS-SPEC** |
| G24 | legs 1–2 RED at this seat (`exports` has no `.` key → `ERR_PACKAGE_PATH_NOT_EXPORTED` at all 5 fourier sites; `timingFunctions` absent from every 4.0.0 subpath; `./easing` ships 16 flat names). **Leg 3 (the drift, 8 names, `<1e-3`) is UNRUNNABLE by this probe today** | RED — MEASURE-AT-OPEN (banked 8/22 drift, max\|Δ\| 0.192) | **DIVERGENT-AT-OPEN → handed to X-W9.f** (see the escalation note below) |
| G25 | `Object.keys(bezierPresets).length` → **30** | GREEN at authorship, deliberately | **GREEN-BEFORE-CURE (declared)** |
| G26 | `grep -rn 'colorScale\|sampleToSVGPath' src/` → **0** | GREEN at authorship [measured] — 0 | **GREEN-BEFORE-CURE (declared)** |
| G27 | packed/dist `./transform` still exports all **6** (`decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`, `interpolateDecomposed`, `slerp`); `PathGeometry` · `getTotalLength` · `getPointAtLength` all present | RED · 6 | **RED-AS-SPEC** |
| G28 | R1 leg reproduces on its empty-body half (9/9 throw, G2 above; the prototype half is G3/G4's 33+5). **`P4-EVIDENCE-REPLAY.json` is measured ABSENT**: the TCC wall is gone (§0j, gate 24) but ⟨cmd⟩ `find ~/Documents/Codex -name 'P4-EVIDENCE-REPLAY*'` → **nothing**, and `find ~/Documents/Codex -maxdepth 2 -type d` returns the directory alone — it is **empty** | RED for R1 · MEASURE-AT-OPEN for accepted/reject + the TCC-gated reading | **RED-AS-SPEC** — and the `1,870,633 µs` figure **stays UNCITABLE**; every budget restates against **1,636,680 µs** (3× = 545,560 · 2× = 818,340; native floor 311,883 → headroom 233,677 / 506,457) exactly as §6 directs |
| G29 | `package.json` version → **4.0.0**; keyframes pins `"@mkbabb/value.js": "4.0.0"` exactly, at `../keyframes.js/package.json:71` | RED · 4.0.0, pin cited at `:69` | **RED-AS-SPEC** · INFO: the pin's line number has drifted `:69` → **`:71`** (same exact string); X-W9.i and X-W9.f cite `:71` |
| G30 | `grep -n 'src/parsing' docs/tranches/V/ARCHITECTURE.md` → **1 hit, at `:657`** (cites `src/parsing/stylesheet/serialize.ts` et al.); `src/parsing/` absent from the tree; `find -name '*.bbnf'` → nothing | RED · `:657` | **RED-AS-SPEC** |
| G31 | dependencies are exactly `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `@mkbabb/parse-that` absent | RED, same set | **RED-AS-SPEC** (and §0i.1 disposition C keeps it that way — this wave adopts no parser) |
| G32 | `componentDescription()` at `ConsoleRail.vue` still prefix-matches (`c.startsWith(upper) \|\| c.startsWith(component)`); `ictcp.components = ["Intensity (I)","Ct (tritan)","Cp (protan)"]` → `cp` resolves to **"Ct (tritan)"**; `jzazbz.components = ["Lightness (Jz)","az (red-green)","bz (yellow-blue)"]` → `jz` matches nothing and **degrades to the bare key** | RED, both | **RED-AS-SPEC** (read read-only; the file carries X-W4's uncommitted carve, which does not touch `:172-180`) |
| G33 | `ls docs/tranches/V/coordination/*-inbox-2026-09-1*.md` → **no matches / 0 packets**; keyframes' exact pin reads `"4.0.0"`; the post-window `npm ls` leg is unreadable before the window | RED · 0 packets | **RED-AS-SPEC** (post-window leg MEASURE-AT-OPEN, as written) |

**Tally at open: 31 RED · 2 GREEN (both declared fences, G25 · G26) · 1 of the 31 (G24) RED with an
unrunnable leg.** No gate was GREEN that the spec expected RED.

### R.2 — GREEN-before-cure

- **G25** (catalog fence) — GREEN **by design**, declared *"GREEN at authorship, deliberately"*;
  measured 30 keys. Its named RED input (delete a `bezierPresets` key) is X-W9.f's fence, not a cure.
- **G26** (ND-01 prune fence) — GREEN **by design**, declared; measured 0. Same shape.

No undeclared GREEN. Both are recorded so the close cannot cite either as a cure it performed.

### Escalation raised at open (handed to X-W9.f, whose gate it is)

**ESC-W9-G24-SUBSTRATE.** `fourier-value-import-drift.mjs:54` imports
`${FOURIER}/web/node_modules/@mkbabb/value.js/dist/value.js` — the **0.13.0** layout. Measured now:
that install is **4.0.0** (⟨cmd⟩ `node -e` on its `package.json` → `version 4.0.0`, exports
`./color ./value ./css ./easing ./math ./transform ./quantize`), which ships **no** `dist/value.js`, so
the probe dies `ERR_MODULE_NOT_FOUND` after printing legs 1 and 2. The drift leg is therefore
**not measurable through the sibling tree today**, and `../fourier-analysis` is **READ-ONLY** (runbook
§5.5) — no install, no write, no `node_modules` repair from this wave. **Cure named, not performed**:
X-W9.f obtains 0.13.0 from the **registry** into a scratch directory (`npm pack @mkbabb/value.js@0.13.0`
outside the repo) and measures the 8 named analytic arms against that tarball, recording the command and
the tarball's integrity hash in `bench-table-4.1.md` / the close record. If that fails too, G24's
`<1e-3` claim is reported **honest-RED with its reason**, never inherited from the banked 0.192 — and,
per §Triumvirate Dispatch, a G24 that cannot reach `<1e-3` **reopens RD-5 as an adjudication**, which is
the sitting's, not an implementer's.

### Pasted outputs (BEFORE)

```
⟨cmd⟩ node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs   → exit 1
RED  MTS-02  steps(2, __proto__) -> ok:true with position = [Object: null prototype] {} (typeof object), not a JumpPosition
RED  MTS-03  getTotalLength("M 0 0 L 10") -> NaN
RED  MTS-03  getTotalLength("M 0 0 C 1 1 2 2 3") -> NaN
RED  MTS-03  getTotalLength("M 0 0 Q 1 1 2") -> NaN
RED  MTS-03  getTotalLength("M 0 0 L 3 4 L 5") -> NaN
RED  MTS-04  compact arc flags mis-tokenized: expanded=31.403311569547547 compact=0 (true circumference 31.41592653589793)
RED  MTS-05  decomposeMatrix3D(singular) -> { translate: [0,0,0], scale: [0,NaN,NaN], skew: [NaN,NaN,NaN], quaternion: [NaN,NaN,NaN,NaN], perspective: [0,0,0,1] } (expected null)
RED  MTS-06  deCasteljau(0.5, []) -> undefined, typed number
RED  MTS-06  interpBezier(0.5, []) -> [ undefined, undefined ], typed [number, number]
RED  MTS-06  lerpArray(len3, len2, .5, out3) -> [ 2.5, 3.5, NaN ] (silent NaN; docstring states the length contract, nothing enforces it)
RED  MTS-08  ./css exports serializeCssColor + serializeTimelineOptions but NOT serializeCssValue; keyframes.js re-implements it at src/animation/compile/emit/css-text.ts:41 and the copies have diverged
RED  MTS-09  css.d.ts carries 18 unexported declares referenced by the public signatures: Alpha, Alpha_2, AnyColor, Channel, Channel_2, ChannelsBySpace, ChannelsBySpace_2, Color, Color_2, ColorIssue, CssCall, CssList, CssScalar, CssValue, JumpPosition, Result, SpaceId, SpaceId_2

RED — 28 failing assertions
```

```
⟨cmd⟩ node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs   → exit 1
RED  LIB-01  easing(name) throws on 5/5 Object.prototype keys — constructor: TypeError
RED  LIB-01  mechanism src/easing.ts:168 `if (!(name in PRESETS))` admits the prototype chain; :169 destructures the result
ok   LIB-01  control: easing('ease') ok, unknown name -> easing_name_unknown
RED  LIB-02  33 published functions throw on a JS-boundary value (7-value corpus, all 7 subpaths)
RED  LIB-02  by subpath: value=1 css=18 easing=1 math=5 transform=8
RED  LIB-02  G1 (r1-published-totality.mjs) names 9 ./css parsers only — 15 of these are outside its FNS list
RED  LIB-03  33 bare `declare` in the emitted subpath d.ts — unnameable from the subpath that returns them (color=1 value=6 css=18 easing=2 quantize=6)
RED  LIB-03  ./css exports serializeCssColor but withholds the general serializers: serializeCssValue (src/css/stylesheet.ts:81), serializeKeyframeSelector (src/css/grammar.ts:429)
RED  LIB-03  ColorFactory exported at src/color/index.ts, dropped by src/subpaths/color.ts — the type of 23 factories is unnameable
RED  LIB-03  ./css returns but cannot name: CssValue, CssScalar, CssCall, CssList — a consumer must take a second dependency on ./value
RED  LIB-04  css.d.ts emits 5 duplicated colour declarations under mangled names (Alpha_2, Channel_2, ChannelsBySpace_2, Color_2, SpaceId_2), 58 references
RED  LIB-04  2 module(s) outside src/color/ reach colour types past the barrel: src/css/grammar.ts, src/css/types.ts
RED  LIB-05  5 src files over the 350-LoC cap: src/css/stylesheet.ts=899 src/transform/decompose.ts=609 src/transform/path.ts=564 src/css/grammar.ts=483 src/color/anchors.ts=377

RED — 12 failing assertion(s)
```

```
⟨cmd⟩ node docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs   → exit 1
RED  LEG1  2 public type(s) unnameable from the subpath that returns them:
       leg1.ts(2,15): error TS2459: Module '"@mkbabb/value.js/css"' declares 'CssValue' locally, but it is not exported.
       leg1.ts(3,15): error TS2459: Module '"@mkbabb/value.js/color"' declares 'ColorFactory' locally, but it is not exported.
RED  LEG2  root specifier does not type-resolve:
       leg2.ts(2,31): error TS2307: Cannot find module '@mkbabb/value.js' or its corresponding type declarations.
RED  LEG2  Node runtime resolution of the root specifier -> ERR_PACKAGE_PATH_NOT_EXPORTED
       consumers: fourier web/src ConvergencePlot.vue:5, harmonics.ts:5, useCurveTransition.ts:8, easings.ts:9, easings.ts:16

RED — 4 failing assertion(s)
```

```
⟨cmd⟩ npx eslint 'src/css/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'
✖ 94 problems (94 errors, 0 warnings)            [G5 — run 1 and run 2 identical]

⟨cmd⟩ npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule '{…}'
✖ 155 problems (155 errors, 0 warnings)          [G10 — run 1 and run 2 identical]
```

```
⟨cmd⟩ node — public-surface reads against dist/subpaths/
G2   oklch() rgb() hsl() lab() color() rgba() lch() oklab() hwb()  → 9/9 THROWS TypeError: Cannot read properties of undefined (reading 'replace')
G6   L l H V C Q A T S + leading-space                              → 10/10 THROWS Cannot read properties of undefined (reading 'len')
G8   getTotalLength("M 0 0 L 10") → NaN (typeof number)
G22  'toHex' in color → false        'easingNames' in easing → false
G23  ease / ease-in / ease-out / ease-in-out → identity false 4/4
G25  Object.keys(bezierPresets).length → 30
G27  exported of the six: decomposeMatrix2D, decomposeMatrix3D, recomposeMatrix2D, recomposeMatrix3D, interpolateDecomposed, slerp (count 6)
     PathGeometry true · getTotalLength true · getPointAtLength true
G19  runtime exports: color 23 · css 19 · easing 16 · math 9 · transform 9 · quantize 2 · value 1  = 79
     declared export names across dist/subpaths/*.d.ts = 142
G13  sum of `^declare ` across dist/subpaths/*.d.ts = 33   (color 1 · css 18 · easing 2 · math 0 · quantize 6 · transform 0 · value 6)
G14  '_2' occurrences in dist/subpaths/css.d.ts = 58 over 25 lines
G16  max src LoC = 899 (src/css/stylesheet.ts); then 609 · 564 · 483 · 377
```

Evidence for the close is written under `docs/tranches/X/waves/evidence/W9/` per §Verification
Artefacts; this record's pastes are the BEFORE bank of record.

---

## Unit plan

**9 units, all Opus 5** — model law **M-23**, quoted: *"every unit below is an **Opus 5**
implementation seat. No design content is authored here."* No Fable seat exists in this wave.
**5 ordered groups, peak concurrency 2** (owner cap: 4 workflows; §Disjointness caps this wave lower).
No two concurrent units hold `modify` on any shared path — checked pairwise, including
`src/subpaths/*.ts`, which **X-W9.b** (`transform.ts`), **X-W9.c** (`math.ts`), **X-W9.d** (all, PSL-1)
and **X-W9.f** (barrel corrections) all reach: those four are **fully serialized** by the grouping.

| group | units | why this pairing is disjoint |
|---|---|---|
| 1 | **X-W9.a** ∥ **X-W9.b** | Chain A head ∥ Chain B head. `src/css/**` + `src/easing.ts` + `src/foundation/result.ts` vs `src/transform/**` + `src/subpaths/transform.ts`. Zero shared paths; both have their own worktree |
| 2 | **X-W9.c** ∥ **X-W9.e** | `src/foundation/math.ts` + `src/subpaths/math.ts` + `test/math.test.ts` vs `test/v4-color-behavior.test.ts` + `test/color-anchors.test.ts` + `scripts/ci/verify-packed-surface.mjs`. Both precede `.d` because both reach `src/subpaths/*` or the packed surface |
| 3 | **X-W9.d** (alone) | Chain A middle — the PSL-1 derivation + the `stylesheet.ts` split. It rewrites `src/subpaths/*.ts` wholesale, so nothing runs beside it. Consumes `.a`'s landed bytes (the band ruling: the split must not move the MTS-01 twin mid-cure) |
| 4 | **X-W9.g** ∥ **X-W9.i** | docs-only both: `ARCHITECTURE.md:657` vs `coordination/**`. `.i` must precede the tag (G33), so it sits before `.f` |
| 5 | **X-W9.f** ∥ **X-W9.h** | the cut (library + `eslint.config.js`) vs the two demo files. Zero shared paths. Both carry the §4a re-read guard on X-W4/X-W8 and halt before writing if either is OPEN |

**Worktree idiom (§Worktree Plan, binding for `.a`, `.b`, `.c`, `.e`, `.h`).** `npm run typecheck` runs
`prepare`/`build` first, so two concurrent agents sharing one `dist/` measure each other. Each of those
five units: `git worktree add --detach /Users/mkbabb/Programming/value.js-x-w9-<u> HEAD`, then
`ln -s /Users/mkbabb/Programming/value.js/node_modules <worktree>/node_modules` (or `npm ci` there if the
symlink misbehaves), edit and **measure** in the worktree against its private `dist/`, commit there, then
**integrate into the primary checkout on `tranche-u`** with
`git -C /Users/mkbabb/Programming/value.js checkout <worktree-sha> -- <exact paths>` followed by the
unit's pathspec commit (that commit is the unit's *integration commit*, named in §Verification
Artefacts), re-run its gates in the primary (double-run law), then `git worktree remove <path>`.
**`git -C … checkout <sha> -- <paths>` is path-scoped and never unstages a sibling seat's rows.**
`X-W9.d`, `.f`, `.g`, `.i` run on integrated main, as §Worktree Plan says.

**Commit map (§Commit Plan, in order; pathspec on the commit itself, `--no-verify`, `Claude-Session`
trailer).** 1 → `.a` (RED-first, its own commit, failing output in the body) · 2 → `.a` (cure) · 3, 4 →
`.b` · 5 → `.c` · 6 → `.d` · 7, 8 → `.e` · 9 → `.f` (the cut; SCI-1 + the atlas evidence tuple + both
`no-non-null-assertion` rule objects ride **this one commit**) · 10 → `.g` · 11 → `.h` (both demo files,
one commit) · 12 → `.i` (five packets + five `INBOX.md` rows + the sweep line) · 13 → the close seat.

### The nine units

| id | model | sections (W9.md) | writable set | gates | locks / same-commit family |
|---|---|---|---|---|---|
| **X-W9.a** | opus | §Agent Units `X.W9.a` **:183-197**; §Hard Gate G1–G5 **:343-347**; §Commit Plan rows 1–2 **:455-456** | `src/css/named-colors.ts` · `src/css/grammar.ts` · `src/css/stylesheet.ts` · `src/easing.ts` · `src/foundation/result.ts` · `test/parser-totality.test.ts` (create) · `docs/tranches/X/waves/evidence/W9/**` · `docs/tranches/X/execution/A/X-W9.md` (its receipt only) | G1 G2 G3 G4 G5 | **RED-first commit is its own commit, before any cure**, failing output pasted in the body (§Archaeology guardrail 1 — a rename cannot satisfy it). The MTS-01 cure **unmasks** the `stylesheet.ts:163-171` twin: both sites land **together** (band ruling). Does **not** touch `eslint.config.js` (§4a) |
| **X-W9.b** | opus | §Agent Units `X.W9.b` **:199-214**; G6–G10, G27 **:348-352, :369**; Commit rows 3–4 **:457-458** | `src/transform/path.ts` · `src/transform/decompose.ts` · `src/subpaths/transform.ts` · `test/transform/path-geometry.test.ts` · `test/transform/decompose-targeted.test.ts` · evidence · its receipt | G6 G7 G8 G9 G10 G27 | The matrix-family **retirement is its own commit** with the deletion proof + consumer census (measured 0 in `demo/` and `../keyframes.js/src`); **no shim, no forwarding export**; `PathGeometry`/`getTotalLength`/`getPointAtLength` preserved (4+1 keyframes seams). Does **not** touch `eslint.config.js` |
| **X-W9.c** | opus | §Agent Units `X.W9.c` **:216-226**; G11 **:353**; Commit row 5 **:459** | `src/foundation/math.ts` · `src/subpaths/math.ts` · `test/math.test.ts` · evidence · its receipt | G11 | One precondition policy, stated **once** in the module docstring and enforced **by code**. The `lerpArray` length leg is **asked of keyframes in `.i`'s packet, never assumed** |
| **X-W9.d** | opus | §Agent Units `X.W9.d` **:228-246**; G12–G17 **:354-359**; Commit row 6 **:460** | `src/subpaths/*.ts` · `src/css/index.ts` · `src/css/types.ts` · `src/css/grammar.ts` · `src/css/stylesheet.ts` · `src/css/serialize.ts` (create) · `src/css/rules.ts` (create) · `src/color/index.ts` · `src/color/operations.ts` · evidence · its receipt | G12 G13 G14 G15 G16 G17 | After `.a` (Chain A). `ParseResult` and `Result` stay **declared per boundary, never unified** (PSL-3). **Third re-cut attempt on the 265/381/153 seam halts** (§Triumvirate). `src/color/model.ts` **zero bytes changed** — COHESION §0k.3 **S-3** narrow reading: read / re-export / return-type retarget only |
| **X-W9.e** | opus | §Agent Units `X.W9.e` **:248-262**; G18–G20 **:360-362**; Commit rows 7–8 **:461-462** | `test/v4-color-behavior.test.ts` · `test/color-anchors.test.ts` (create) · `scripts/ci/verify-packed-surface.mjs` · evidence · its receipt | G18 G19 G20 | Coverage is **published, not gated on a threshold** (a floor with no consumer is L-19 contrivance). The denominator is **the recorded command**, not the remembered number — 142 declared / 79 runtime re-measured at this open |
| **X-W9.f** | opus | §Agent Units `X.W9.f` **:264-284**; G21–G26, G28, G29 **:363-371**; Commit row 9 **:463**; §Dependencies **:472-489** | `package.json` · `CHANGELOG.md` · `src/color/index.ts` · `src/color/operations.ts` · `src/easing.ts` · `src/subpaths/*.ts` · `eslint.config.js` · `test/easing-export-stability.test.ts` · evidence · its receipt | G21 G22 G23 G24 G25 G26 G28 G29 (+ G5 · G10 **config-resident**) | **ONE dated cut, ONE version bump, no emergency 4.0.1** (ruled). SCI-1 ships **with** the atlas evidence tuple in the **same commit**; both `no-non-null-assertion` rule objects ride that same commit; `.f` is the file's **sole writer**. Gated: re-read X-W4 **and** X-W8 rows; halt before any write if either is OPEN. §0j.F word (1) verified before the cut |
| **X-W9.g** | opus | §Agent Units `X.W9.g` **:286-298**; G30, G31 **:372-373**; Commit row 10 **:464** | `docs/tranches/V/ARCHITECTURE.md` (**`:657` region only**) · evidence · its receipt | G30 G31 | `:943-945` is X-W8's (CC-082) — **not touched**. This wave **adopts no parser** (§0i.1 disposition C); G31 records why value.js ships none of parse-that today |
| **X-W9.h** | opus | §Agent Units `X.W9.h` **:300-312**; G32 **:374**; Commit row 11 **:465** | `demo/color-session/colorSpaceInfo.ts` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` (`:172-180` carve only) · evidence · its receipt | G32 | **Gated on X-W4**: first act is to re-read the ledger's X-W4 row; if not CLOSED, write **no byte** and return the deferral. Both files in **one** commit. **No new library export** — the id vocabulary already exists in `ChannelsBySpace` |
| **X-W9.i** | opus | §Agent Units `X.W9.i` **:314-334**; G33 **:375**; Commit row 12 **:466** | `docs/tranches/V/coordination/*-inbox-2026-*.md` (**5 create**) · `docs/tranches/V/coordination/INBOX.md` · evidence · its receipt | G33 | **RD-11: packet mechanism, no peer-repo file is edited by this wave.** Five packets — keyframes · atlas · glass-ui (BH/BI relay) · fourier-analysis · parse-that — **before the tag**, five `INBOX.md` rows, and the E13 sweep line in the same commit |

### Unit briefs

- **X-W9.a** — Worktree `value.js-x-w9-a`. (1) Land the RED-first battery `test/parser-totality.test.ts` in its OWN commit: 56 vectors (empty-body + whitespace-body) **widened by the R1 input class** of `docs/tranches/V/coordination/value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md`; watch it fail; paste the failing output in the commit body. (2) Cure: `Object.create(null)`/`Map` tables at `named-colors.ts:1`, `grammar.ts:265-266,:457-462`, `stylesheet.ts:163-171`, `easing.ts:166-170` with `typeof x === "string"`/`map.has(k)` narrowings; `grammar.ts:181` returns the typed failure `Result`, never `slash[0]!`. The MTS-01 cure and its stylesheet twin land together. (3) Turn G1–G5 (`npx eslint … --rule`, no config edit). Double-run every count.
- **X-W9.b** — Worktree `value.js-x-w9-b`. (1) `tokenizePath` **rejects** non-multiple-of-arity runs (no truncation; deletes 12 asserted reads); arcs tokenize **positionally** (SVG 1.1 §8.3.9 single-char flags), with one committed SVGO-optimised fixture; `decomposeMatrix3D` joins its own null ladder (`if (scaleX===0||scaleY===0||scaleZ===0) return null`). (2) Separate commit: delete `decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`, `interpolateDecomposed`, `slerp` (CC-094) with the consumer census as proof; **no shim**; preserve `PathGeometry`/`getTotalLength`/`getPointAtLength`. (3) Turn G6–G10, G27; G8's banked `null` reads **NaN** today — restate the falsifier at the measured bytes.
- **X-W9.c** — Worktree `value.js-x-w9-c`. Enforce the sentence already written at `src/foundation/math.ts:58` at the boundary — `deCasteljau`, `interpBezier`, `lerpArray` reject mis-sized input instead of returning `undefined`/NaN; move `scale`'s equal-bounds guard **above** its own division; retire the 7 dangerous assertions. State the policy **once** in the module docstring; enforce it in code, never in a comment. `lerpArray` is keyframes' FrameCompiler hot loop — the length leg is **asked** in `.i`'s packet, never assumed. Turn G11 (`test/math.test.ts`), double-run.
- **X-W9.d** — Integrated main, after `.a`. **PSL-1**: `src/subpaths/*.ts` become star-forwards over the area barrel (two hand-kept lists → one derivation), preserving `.b`'s and `.c`'s landed subpath semantics. **PSL-2**: zero bare `declare`; `./css` re-exports `CssValue`/`CssScalar`/`CssCall`/`CssList`; `ColorFactory` from `./color`. **Colour boundary**: exactly 3 statements move (`css/types.ts:1`, `css/grammar.ts:18,:19`); `anchors.ts`/`operations.ts` keep relative `./model`. **Split**: `stylesheet.ts` 899 → 265/381/153, two cross-seam edges; `serializeCssValue` joins the `Result` idiom **before** export; hoist the six double `declarations.get()` at `:709-717`; `isSupportedSyntaxDescriptor` `@internal`. Zero bytes inside `color/model.ts` (S-3). Turn G12–G17.
- **X-W9.e** — Worktree `value.js-x-w9-e`. (1) Restore **external** reference vectors in `test/color-anchors.test.ts` for the v4 conversion API (the record at `docs/tranches/U/audit/oracle/color-anchors/README.md` describes them) plus the 34-pair Sharma CIEDE2000 table; fix `test/v4-color-behavior.test.ts:66` — no expected value re-derived from the implementation. (2) Publish coverage-by-export over a **recorded denominator command** (142 declared / 79 runtime re-measured at open) as `coverage-by-export.md`; no threshold. (3) Give `verify-packed-surface.mjs` one smoke invocation per runtime export in the tarball and **delete** the hardcoded `strictTypes: 62` at `:137`. Turn G18–G20.
- **X-W9.f** — Integrated main, LAST; after `.a`, `.b`, `.d`, `.i`. **First**: re-read the ledger's X-W4 and X-W8 rows; if either is OPEN, write nothing and return the deferral (§4a). Verify §0j.F word (1) — the two `ci(release)` commits in `tranche-u` — before the cut. SHIP: SCI-1 (`sampleColorRamp`/`mixColorsInto`/`toRgba8Into`) **with** the atlas evidence tuple in the same commit; `toHex`; `easingNames()`; memoised `easing()`; the restored analytic in/out arms (RD-5); barrel corrections; AM-13 strip; both scoped `no-non-null-assertion` objects into `eslint.config.js` in one edit. DECLINE `sampleBezier`, `resolveCssColor` (RD-6, re-trigger preserved). **4.1.0, one bump, one date, CHANGELOG'd; no 4.0.1.** G24 per ESC-W9-G24-SUBSTRATE; G28 restates against 1,636,680 µs. Re-run G5/G10 config-resident.
- **X-W9.g** — Integrated main. Re-read the ledger's X-W8 row first (must not be OPEN). Carve **`docs/tranches/V/ARCHITECTURE.md:657` only**: delete/repoint the three `src/parsing/**` citations (measured: `src/parsing/` absent, zero `.bbnf`, the CSS parser is `src/css/grammar.ts`). Record the parse-that position against ground truth — `PAUSED_RESEARCH` / `TERMINAL_SOURCE_RED` / `NO_ACTIVE_WRITER`, fresh writer root `parse-that-css-totality-p2` (M-22 §3), the `≥10x` floor retired as admission law, the replacement portfolio (strict-3x / strict-2x / measured-break-even) governing. **Adopt no parser** (§0i.1 C). Leave `:943-945` untouched. Turn G30, G31.
- **X-W9.h** — Worktree `value.js-x-w9-h`. **First act**: re-read the ledger's X-W4 row; if it is not CLOSED, write **no byte**, commit nothing, and return the deferral naming the §4a sequencing (the file is dirty with X-W4's carve today). Otherwise: re-key the descriptor tables in `demo/color-session/colorSpaceInfo.ts` by the library's **exact** channel ids from `ChannelsBySpace` (`ictcp: [i, ct, cp]`, `jzazbz: [jz, az, bz]`) and **delete the prefix `find`** at `ConsoleRail.vue:172-180`. No new library export. Prove G32 under node over all 17 spaces × their channel ids; both files in ONE commit; touch no focus, pointer or template surface.
- **X-W9.i** — Integrated main, before `.f`. Author and send five packets under `docs/tranches/V/coordination/`: **keyframes.js** (widened R1 input class; prototype class with per-site verdicts at `resolve/browser.ts:165`, `engine/options.ts:31`, `compile/value-ast.ts:71`; `serializeCssValue` published so the fork at `compile/emit/css-text.ts:41` retires; K1–K4 with runnable gates; catalog fence; the declared analytic-arm restoration, 8 names, max|Δ| 0.192; the pin-bump window — their exact pin reads `"4.0.0"` at `../keyframes.js/package.json:71`, line drifted from `:69`; the `lerpArray` length ask), **atlas**, **glass-ui** (BH/BI relay, joins the owed R1 relay), **fourier-analysis** (facility 19, RD-8 one-way correspondence, http = **30** at HEAD), **parse-that** (PT-01/03/04/07). Row all five in `INBOX.md` with the E13 sweep line, one commit. **No peer-repo file is edited.**

---

## Unit receipts

*(appended by each unit at its close, in dispatch order; line 1 of every receipt names the served
model; every published count read from the settled bytes and double-run; ⟨cmd⟩ … → output for every
claim.)*

---

### X-W9.a

SERVED MODEL: `claude-opus-5[1m]` · Prototype-reachable lookups and empty-body colour totality
(W9.md §Agent Units `X.W9.a` :183-197 · §Hard Gate G1–G5 :343-347 · §Commit Plan rows 1–2 :455-456 ·
§Disjointness Chain A :123-127 · §Archaeology :503-509).
**Status: PARTIAL** — G2, G4, G5-in-bounds GREEN; G1 and G3 carry residuals owned by other units,
and G5 carries one out-of-bounds residual raised as **ESC-W9a-TIMELINE-NNA**.
Worktree `/Users/mkbabb/Programming/value.js-x-w9-a` @ `e24a7cfb`, `node_modules` symlinked; all
figures read from settled bytes and **double-run** in the worktree and again after integration.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → 15 rows, **none inside this unit's writable set**
(`src/css/named-colors.ts` · `src/css/grammar.ts` · `src/css/stylesheet.ts` · `src/easing.ts` ·
`src/foundation/result.ts` · `test/parser-totality.test.ts` · `docs/tranches/X/waves/evidence/W9/**` ·
this record). ⟨cmd⟩ `git status --porcelain -- <those seven paths>` → **empty**. **No killed
predecessor's partial work on X-W9.a exists; nothing inherited, nothing stashed, nothing restored.**
`scripts/dev/dev.sh` never touched. `ConsoleRail.vue` (X-W4's live carve) never touched.

#### 1. Anchors verified at TRUE bytes before any edit (spec :186-188)

| spec anchor | measured at `e24a7cfb` | verdict |
|---|---|---|
| `named-colors.ts:1` | `export const NAMED_COLORS: Readonly<Record<string,string>> = Object.freeze({` | **EXACT** |
| `grammar.ts:265-266` | `const named = NAMED_COLORS[input.toLowerCase()];` / `if (named) return parseCssColor(named);` | **EXACT** |
| `grammar.ts:181` | `const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");` | **EXACT** |
| `grammar.ts:457-462` | the `aliases` object literal + `aliases[args[1]?.toLowerCase() ?? "jump-end"]` at `:461` | **EXACT** |
| `stylesheet.ts:163-171` | the twin `aliases` literal + `aliases[authoredPosition]` at `:169` | **EXACT** |
| `easing.ts:166-170` | `if (!(name in PRESETS))` at `:168`; destructure at `:169` | **EXACT** |

No anchor drifted. Root-cause confirmed by measurement, not by prose: ⟨cmd⟩ a 760-vector head sweep
(38 heads × 5 body shapes × 4 entries) printed **410 throwing vectors and exactly ONE distinct
message** — `TypeError: Cannot read properties of undefined (reading 'replace')`. One site, one
failure mode, as R1 §A1 states.

#### 2. Act 1 — the RED-first battery, its OWN commit, watched failing

`test/parser-totality.test.ts` (create): **123 tests**, §1 the 56 empty-/whitespace-body vectors
(14 heads that reach `parseFunctionalColor` × {`""`, `"   "`} × {`parseCssColor`, `parseCssScalar`};
self-counted in-test), §2–§5 **widened by the R1 input class** of
`docs/tranches/V/coordination/value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md` — §A1 the
scalar widening (20), §A2 the prototype class on five `./css` entries + five embedded
`parseStylesheet` forms (16), §A2 the `steps()` TYPE LIE and its `collectAnimationOptions` twin (4),
§A2 `easing()` over the 5 `Object.prototype` keys (5) + the control arm.

⟨cmd⟩ `npx vitest run test/parser-totality.test.ts` → **exit 1 · `Tests  120 failed | 3 passed
(123)`**. Three distinct shapes: `Cannot read properties of undefined (reading 'replace')` ·
`source.trim is not a function` · `expected 'function' to be 'string'`.
Full 496-line capture committed at `docs/tranches/X/waves/evidence/W9/parser-totality-red-first.txt`;
the same three shapes are pasted verbatim in the commit body, per §Archaeology guardrail 1.

**Commit 1 (worktree `51fc69a8` → primary `c18a78f8`)** — `test(x-w9): RED-first empty-body +
prototype battery`. **No cure byte rides it**: ⟨cmd⟩ `git show --stat c18a78f8` → exactly
`test/parser-totality.test.ts` + the evidence capture. A rename cannot satisfy this commit.

#### 3. Act 2 — the cure, exactly the specified mechanism

| site | cure | why it is the root, not a mask |
|---|---|---|
| `named-colors.ts:1` | `Object.freeze(Object.assign(Object.create(null), {…}))` | the table is indexed by a lowercased parse-derived key; with a prototype, `NAMED_COLORS["constructor"]` WAS the `Object` constructor, truthy, and `parseCssColor` recursed on a `Function` |
| `grammar.ts:265-266` | `if (typeof named === "string")` | the type-side half of the same cure; keeps the recursion honest if the table is re-typed |
| `grammar.ts:181` | `const head = slash[0]; if (head === undefined) return failure(source, "css_syntax", ["color components"]);` | an empty/whitespace body IS a syntax error, so it returns the module's own `ParseResult` failure — the shape every other syntax error already returns |
| `grammar.ts:457-462` **+** `stylesheet.ts:163-171` | ONE exported `JUMP_ALIASES: ReadonlyMap<string, JumpPosition>`, read by both | `Map.get` reads own entries only; the two copies were why the defect had two homes |
| `easing.ts:166-170` | prototype-free `PRESETS` **and** `DIRECT_EASINGS`; `in` and the destructure-of-`Object` are gone | `PRESET_TABLE` stays the single authored source of the table **and** `BezierPresetName`; `bezierPresets`' 30-key set byte-identical (G25 untouched) |

**`src/foundation/result.ts`: ZERO bytes changed.** In this unit's writable set, and deliberately
not written — PSL-3 keeps `ParseResult` (text→AST) and `Result` (value→value) declared per boundary,
never unified, and `grammar.ts:181` is on the `ParseResult` side.

Riding in the same commit because G5 demands the crash **shape** go, not the instance
(§Archaeology guardrail 4): **all 90** non-null assertions in `grammar.ts` (72) and `stylesheet.ts`
(18) retired by narrowing — `channelTriple` returns a **tuple** so the seven colour heads carry their
narrowing in the type; scanners take `String.prototype.charAt`; every `match(…)` is destructured and
tested. The six DOUBLE `declarations.get()` reads at `stylesheet.ts:709-717` are hoisted to one read
each: that is **X-W9.d's listed row, discharged here** because it is also four of the 90 — `.d`
re-measures rather than inherits.

**Commit 2 (worktree `ec481324` → primary `97ab3991`)** — `fix(css/lookup): prototype-reachable
tables + grammar.ts:181 typed failure`. The MTS-01 cure and its `stylesheet.ts:163-171` twin land
**together**, as the band ruled.
**Commit 3 (worktree `695fbdd3`, folded into primary `97ab3991`)** — `eslint-nna.css.before.json`,
the 94-error BEFORE reading regenerated at the base blobs to complete the §Verification-Artefacts
before/after pair.

#### 4. Gate readings, BEFORE → AFTER, double-run

| gate | command | BEFORE | AFTER (worktree) | AFTER (integrated primary) | verdict |
|---|---|---|---|---|---|
| **G1** | `node …/probes/src-surface-totality.mjs` | **28 RED** (MTS-01 15 · 02 2 · 03 4 · 04 1 · 05 1 · 06 3 · 08 1 · 09 1) | **11 RED** | **5 RED** (X-W9.b landed `474846ce`/`4be22189` beside this seat and took MTS-03/04/05) | **THIS UNIT'S LEGS GREEN — MTS-01 15→0, MTS-02 2→0.** Residual 5 = MTS-06 ×3 (X-W9.c) · MTS-08 ×1 · MTS-09 ×1 (X-W9.d) |
| **G2** | `npx vitest run test/parser-totality.test.ts` | `120 failed \| 3 passed (123)` | `123 passed` | `123 passed` (×2, identical) | **GREEN** |
| **G3** | `library-band-gates.mjs` LIB-02 leg | **33** (value 1 · css 18 · easing 1 · math 5 · transform 8) | 33 | **28** (value 1 · css 18 · easing 1 · math 5 · transform 3 — .b's deletions) | **RED, with its reason measured** (below) |
| **G4** | same probe, LIB-01 leg | 5/5 throw `TypeError` | total | total; control `easing('ease')` ok, unknown → `easing_name_unknown` | **GREEN** |
| **G5** | `npx eslint 'src/css/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'` | **94** (grammar 72 · stylesheet 18 · timeline 4) | **4** | **4** (×2, identical) | **GREEN IN BOUNDS — 90 of 94 retired, grammar 72→0, stylesheet 18→0.** The 4 left are `src/css/timeline.ts:23,38,71,72`, **outside this unit's writable set** → ESC-W9a-TIMELINE-NNA |

`eslint.config.js` **not touched** (§4a — X-W9.f is its sole writer); G5 driven by the explicit
`--rule` invocation exactly as the wave directs.

Collateral, measured: ⟨cmd⟩ `npx vue-tsc -p tsconfig.lib.json --noEmit` → **exit 0**.
⟨cmd⟩ `npx vitest run` → **583 passed, 2 failed**; both failures are other waves' declared born-RED
rows and import **neither** `src/css` nor `src/easing` (⟨cmd⟩ `grep -c 'css\|easing'
test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts` → **0** and **0**; their own
titles read *"C-5 · BORN-RED"* and *"NG-6 · the reka binding-correctness canary"*).
⟨cmd⟩ `npm run lint` → 55 findings, **all** under `docs/tranches/**` (X-W8 G-6's ignore owns them),
**zero** in this unit's writable set.

#### 5. Why G3's leg did not move — measured, not asserted

G3 is named *"Prototype-key totality across all 7 subpaths"* and its falsifier is *"Add a public
function that indexes an object literal by an unvalidated argument"*. That class **is** cured here.
Its cited leg, LIB-02, measures something else: it applies the corpus
`[undefined, null, 42, {}, [], "", NaN]` as a **first argument**, so it reads **arity and shape
violations of the published `.d.ts`**, not parse-derived-key lookups.

The control that settles it is `coerceToSyntax`, which appears on **both** legs and answers
differently: ⟨cmd⟩ MTS-01 calls `CSS.coerceToSyntax(key, "*")` — its two declared arguments — and is
now **`ok`**; LIB-02 calls `fn(h)` with one, so `syntax` is `undefined` and `syntax.split` throws.
Same function, same bytes, opposite readings.

The gate this unit's **Goal** states — *"no string reaches a public `./css` or `./easing` entry and
produces a `TypeError`"* — is met and independently measured: ⟨cmd⟩ a 13-value **string** corpus
(`"" "   " constructor __proto__ toString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable
toLocaleString "rgb()" "steps(2,constructor)" "a{color:constructor}"`) over **every** function of
**all 7 subpaths** → **0 throws** from `parseCssColor`, `parseCssScalar`, `parseCssValue`,
`parseCssValues`, `parseKeyframeSelector`, `parseTimingFunction`, `parseStylesheet`,
`serializeCssColor`, `serializeTimelineOptions` and `easing`. The 12 names that still throw on a
string are each being handed a string where their signature declares a `Stylesheet`, a
`readonly LinearEasingStop[]`, a number, an array or a `new`-only class:
`coerceToSyntax` (arity) · `collectCustomFunctions` · `collectKeyframes` ·
`collectPropertyDescriptors` · `collectStyleRules` (`src/css/stylesheet.ts`, shape) ·
`linearEasing` (`src/easing.ts`) · `cubicBezierToString` · `deCasteljau` · `interpBezier` ·
`lerpArray` · `scale` (**X-W9.c**) · `PathGeometry` (**X-W9.b**).

**No substitution was made.** The specified cure was executed exactly; the leg's remainder is
dispatched, not worked around, and no `try/catch`, `test.skip`, allowlist or fallback was written.

#### 6. Escalations

**ESC-W9a-TIMELINE-NNA — G5's last 4 errors are out of bounds.**
G5's command is scoped to `src/css/**/*.ts`, which includes `src/css/timeline.ts`. That file is
listed `modify` in W9.md §File Bounds but is in **no unit's writable set** in this record's §Unit
plan table, and it is not in this unit's. The 4 remaining errors are, verbatim:
`timeline.ts:23:36` `splitTopLevel(scroll[1]!.replace(/,/g, " "), "space")` ·
`timeline.ts:38:36` `splitTopLevel(view[1]!.replace(/,/g, " "), "space")` ·
`timeline.ts:71:51` / `:72:49` `rangeBoundary(splitTopLevel(comma[0]!, "space"))` and `comma[1]!`.
Cure named, **not performed**: the same narrowing idiom this unit used everywhere else —
`const body = input.match(/^scroll\((.*)\)$/i)?.[1]; if (body !== undefined) …`, and destructure
`comma` and test both parts. Four lines, no behaviour change, no signature change.
**Ask**: the orchestrator assigns `src/css/timeline.ts` to a unit (naturally X-W9.d, which already
holds `src/css/**` for the split and runs next in Chain A) — G5 is then green config-resident at
X-W9.f without any unit writing outside its bounds.

**ESC-W9a-G3-LEG-SCOPE — G3's name and its cited leg measure different classes.**
Recorded in §5 with its control. Not a request to change the gate (E-3: the spec is immutable); a
request that the close read G3 **staged** per CC-096, and that the leg's remainder be attributed to
the units that own the files — `src/foundation/math.ts` (X-W9.c, 5), `src/transform/*` (X-W9.b, 3),
`src/css/stylesheet.ts` collectors + `src/css/syntax.ts` (18 css; `syntax.ts` is in **no** §File
Bounds row at all), `src/easing.ts` `linearEasing` (1), `src/value` (1). No single unit can turn it.

#### 7. Residuals recorded, not hidden

- `src/easing.ts` carries **10** non-null assertions in `linearEasing` (`:171-181`). They are outside
  **both** lint gates' scopes (G5 is `src/css/**`, G10 is `src/transform/**` + `src/foundation/**`),
  outside this unit's named mechanism, and `src/easing.ts` is X-W9.f's next writer (memoisation +
  the restored analytic arms). Left standing, deliberately, and booked here so the close cannot
  discover them.
- `docs/tranches/X/waves/evidence/W9/src-surface-totality.after.txt` is the **worktree** reading
  (11 RED, this unit's cure alone). The integrated reading is 5 RED because X-W9.b landed beside it;
  both are stated above so neither number can be mistaken for the other.
- The `steps()` alias table now has ONE home (`grammar.ts`'s exported `JUMP_ALIASES`). X-W9.d's split
  must carry that import across the seam rather than re-declare it.

#### 8. Commits

| # | worktree | primary (`tranche-u`) | scope |
|---|---|---|---|
| 1 | `51fc69a8` | **`c18a78f8`** | `test(x-w9): RED-first empty-body + prototype battery` — battery + its failing capture, **no cure** |
| 2 | `ec481324` | **`97ab3991`** | `fix(css/lookup): prototype-reachable tables + grammar.ts:181 typed failure` — 5 sites + the 90 `!` retirements + probe/lint evidence |
| 3 | `695fbdd3` | folded into `97ab3991` | `eslint-nna.css.before.json` — the 94-error BEFORE reading |

Pathspec on every commit itself, `--no-verify`, `Claude-Session` trailer. ⟨cmd⟩ `git status
--porcelain` after integration → the **same** sibling-seat rows as at open, `scripts/dev/dev.sh`
among them, untouched and unstaged.

#### 9. ADDENDUM at final double-run — **ESC-W9a-PROBE-UNRUNNABLE** (a wave finding, not this unit's)

Re-running G1 on the **integrated** tree after X-W9.b landed beside this unit (`474846ce`,
`4be22189`) found the probe no longer completes:

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs` →
`TypeError: TR.decomposeMatrix3D is not a function at …/src-surface-totality.mjs:74:15`, exit 1.

X-W9.b **correctly** retired the matrix family (CC-094, G27 — *"no shim, no forwarding export"*),
and the probe's MTS-05 block calls `TR.decomposeMatrix3D` unconditionally. So **G1's command dies at
MTS-05**, and MTS-06 / MTS-08 / MTS-09 are now **UNREACHED — not green**. Two of this wave's gates
are in direct tension: G27 requires the symbol gone, G1's probe requires it present.

This unit **cannot** cure it: the probe is `execute, no write` in §File Bounds for every unit, and
`docs/tranches/V/megatranche/audit/probes/**` is outside this unit's writable set. Reported, not
worked around.

What the run **does** establish, read before the crash (full capture at
`docs/tranches/X/waves/evidence/W9/src-surface-totality.integrated.txt`):

```
ok   MTS-01  parseCssColor("constructor") returned           …15/15 ok, all five entries × both keys
ok   MTS-01  parseStylesheet("a{animation:x 1s steps(2,constructor)}") returned
ok   MTS-02  steps(2, constructor) -> failure
ok   MTS-02  steps(2, __proto__)   -> failure
```

**X-W9.a's G1 legs are GREEN on the integrated tree: MTS-01 15/15, MTS-02 2/2.**

**Ask of the orchestrator** (an adjudication, not an edit — E-3): rule one of —
(i) a dated addendum-beside authorising a guard at the probe's `:74` (`typeof TR.decomposeMatrix3D
=== "function"`, skipping MTS-05 as SUPERSEDED-BY-G27) with a named writer; or
(ii) G1 read **staged** per CC-096, its MTS-05 leg struck as superseded by G27 and its remaining
legs (MTS-06 → X-W9.c, MTS-08/09 → X-W9.d) measured by those units' own commands instead.
Until it is ruled, **G1 is honest-RED for a reason that is not a defect in the library**, and no
seat should read the pre-crash `ok` lines as a whole-probe pass.

---

### X-W9.b

SERVED MODEL: `claude-opus-5[1m]` · Transform totality and the matrix-family retirement
(W9.md §Agent Units `X.W9.b` :199-214 · §Hard Gate G6–G10 :348-352, G27 :369 · §Commit Plan rows 3–4
:457-458 · §Disjointness Chain B :128).
**Status: DONE in bounds** — **G6 · G7 · G8 · G9 · G27 GREEN**, double-run; **G10 GREEN over
`src/transform/**` (148 → 0) and RED at 7 over the combined scope**, every one of the 7 in
`src/foundation/math.ts`, which is **X-W9.c's** writable set and this seat's hard bound forbids.
Two escalations raised, not worked around.
Worktree `/Users/mkbabb/Programming/value.js-x-w9-b` @ `e24a7cfb`, `node_modules` symlinked, private
`dist/`; every figure read from settled bytes, measured in the worktree and **again after
integration** into `tranche-u`.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → 15 rows. ⟨cmd⟩ `git status --porcelain -- src/transform/path.ts
src/transform/decompose.ts src/subpaths/transform.ts test/transform/path-geometry.test.ts
test/transform/decompose-targeted.test.ts docs/tranches/X/waves/evidence/W9
docs/tranches/X/execution/A/X-W9.md` → **empty**. **No killed predecessor's partial work on X-W9.b
exists; nothing inherited, nothing stashed, nothing restored.** `scripts/dev/dev.sh` never touched;
the ten dirty `demo/**` rows (X-W4/X-W7 seats) never touched; `CARRY-LEDGER.md` never touched.

#### 1. Anchors verified at the true bytes — three drifts, recorded

| spec anchor | measured here | disposition |
|---|---|---|
| *"deletes 12 asserted reads"* (:203) | `src/transform/path.ts` carried **35** non-null assertions: **27** argument-list reads inside the flattener switch (M 2 · L 2 · C 6 · S 4 · Q 4 · T 2 · A 7) + 8 polyline/cursor reads (tokenizer 2 · `pushVertex` 1 · constructor 1 · `sampleAtLength` 4 = 8; 27+8 = 35, exactly eslint's count) | **INTENT AT TRUE BYTES**: rejection instead of truncation makes every argument read provably in-bounds, so all **27** go; the other 8 go with the same rewrite. 35 → **0** |
| G8 banked *"returns `null`"* (:350) | the tree returns **NaN** (`getTotalLength("M 0 0 L 10")` → `NaN`, `typeof number`) — as the record's own open note says | **FALSIFIER RESTATED AT THE MEASURED BYTES**: the violation is `NaN` where `transform.d.ts` declares `: number`; the cure returns **0**, a finite number, and the falsifier is *"let `tokenizePath` truncate instead of reject; the run reads past its end and NaN returns"* |
| G27 *"`getTotalLength` **1** keyframes file"* (:369) | 1 file, `../keyframes.js/src/animation/svg/draw-svg.ts` — but its `getTotalLength` is the **DOM** `SVGGeometryElement` method, not this export. The only true import seam is `PathGeometry` (`morph-svg.ts:45`, `morph-geometry.ts:18`) | **INFO**; both symbols preserved either way, so the seam count is unchanged in effect |

#### 2. Act 1 — commit 3: path totality, positional arc flags, singular-3D null (`474846ce`)

One root cures three of the four: **SVG 1.1 §8.3's error-handling rule is made the module's stated
contract** — path data renders *"up to, but not including, the path command containing the first
error"*. `tokenizePath` therefore **rejects** malformed data instead of truncating it: it reads each
command's own arity per repetition and emits one fully-formed, **named** segment per repetition, so
the flattener indexes nothing and cannot read past an argument run. Arc flags are read as single
**characters** (SVG 1.1 §8.3.9 `flag ::= "0" | "1"`), which is what makes the tokenizer positional.
`decomposeMatrix3D` gains the one statement the spec names —
`if (scaleX === 0 || scaleY === 0 || scaleZ === 0) return null` — joining the wrong-length and
zero-`w` guards already above it.

#### 3. Act 2 — commit 4: the matrix family retired (`4be22189`)

`decomposeMatrix2D` · `decomposeMatrix3D` · `recomposeMatrix2D` · `recomposeMatrix3D` ·
`interpolateDecomposed` · `slerp` leave the surface **with their module**: `src/transform/decompose.ts`
(617 lines) and `test/transform/decompose-targeted.test.ts` (475 lines) DELETED, the four types that
existed only for them (`DecomposedMatrix2D`, `DecomposedMatrix3D`, `Vec4`, `Mat4`) dropped from
`src/subpaths/transform.ts`. **No shim, no forwarding export, nothing moved anywhere.** Full
deletion proof and the nine-tree consumer census:
`docs/tranches/X/waves/evidence/W9/matrix-family-census.md` — **0** executable consumers in `demo/`,
`api/`, `e2e/`, `../keyframes.js/src`, `../glass-ui/src`, `../fourier-analysis`,
`../sci-report/atlas`; the only non-zero rows are one docstring mention and two inventory lists
(§6 below). `./transform` runtime exports **9 → 3**.

#### 4. Gate readings — BEFORE → AFTER, every one double-run

| gate | command | BEFORE | AFTER | verdict |
|---|---|---|---|---|
| **G6** | 10 M-less hostile inputs (`L l H V C Q A T S` + leading-space) through `getTotalLength` | **10/10 THROW** `TypeError: Cannot read properties of undefined (reading 'len')` | **0/10** — every one returns `0`, finite | **GREEN** |
| **G7** | `abs(expanded − compact) < 1e-6` over 3 fixtures | expanded `31.403311569547547` vs compact **0**, \|Δ\| = **31.4033**; the committed SVGO fixture read **NaN** | \|Δ\| = **0** on all three; `31.403311569547547` both ways; the r=5 circle measures `2πr` to 1 dp | **GREEN** |
| **G8** | `getTotalLength` over 5 truncated runs | 4/5 RED — `"M 0 0 L 10"` → **NaN**, `"M 0 0 L 3 4 L 5"` → **NaN** | 0/5 RED — `0`, `0`, `0`, **`5`**, `0`; all finite, all `typeof number` | **GREEN** |
| **G9** | `decomposeMatrix3D` on 3 singular matrices | `{translate:[0,0,0], scale:[0,NaN,NaN], skew:[NaN,NaN,NaN], quaternion:[NaN,NaN,NaN,NaN], perspective:[0,0,0,1]}` — 3/3 | **`null` 3/3**, measured at commit 3's bytes and double-run (`evidence/W9/singular-3d-null.at-commit-3.txt`) | **GREEN at its own commit**; at commit 4 the subject retires with the family, which is what G27 asserts |
| **G10** | `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'` | **155** (decompose 113 · path 35 · foundation/math 7) | **7** — transform leg **148 → 0** (exit 0); the 7 are `src/foundation/math.ts`, **X-W9.c's** file | **GREEN IN BOUNDS, RED at the combined scope** → §5 |
| **G27** | packed/`dist` `./transform` export list + keyframes seams | 6 of the six exported; list of **9** | **0 of the six**; list of **3** — `PathGeometry`, `getPointAtLength`, `getTotalLength`; `PathGeometry` still imported at `morph-svg.ts:45` / `morph-geometry.ts:18` | **GREEN** |

⟨cmd⟩ `node <harness> .` twice on the integrated tree → ⟨cmd⟩ `diff -q run1 run2` **silent**
(`evidence/W9/transform-totality.{before,after}.txt`). ⟨cmd⟩ eslint JSON either side:
`evidence/W9/eslint-nna.transform.{before,after}.json`.

**Tree state after integration** (`tranche-u`, with X-W9.a landed beside this unit):
⟨cmd⟩ `npm run typecheck` → **clean** (all four projects). ⟨cmd⟩ `npx eslint src test` → **clean**;
⟨cmd⟩ `npm run lint` → 55 problems, **every one under `docs/tranches/**`** (X-W8 G-6's ignore), zero
under `src/` or `test/`. ⟨cmd⟩ `npx vitest run` → **583 passed · 3 failed**: two inherited born-RED
canaries outside this unit's bounds (`test/spectrum-luma.test.ts` C-5, routed to X-W4; `demo/test/
shell/reka-binding-idiom.test.ts` NG-6, routed to demo) and **one caused by this unit's lawful
retirement** — `test/v4-c1.test.ts`, §5 below. ⟨cmd⟩ `node …/library-band-gates.mjs` → LIB-02's
transform leg **8 → 3**, LIB-05 loses `src/transform/decompose.ts=609`
(`evidence/W9/library-band-gates.integrated-after-b.txt`; X-W9.a's `library-band-gates.after.txt` is ITS worktree reading, 33 / transform=8, and is left untouched).

#### 5. Escalations — raised, never worked around

**ESC-W9b-V4C1-SNAPSHOT — the retirement reddens a test no unit of this wave may write.**
`test/v4-c1.test.ts:548-558` (*"Value 4 exact runtime surfaces — contains no extra, default,
root-facade, or retired runtime name"*) pins `./transform` at all nine names; it now fails
9-expected vs 3-actual. That file is in **no unit's writable set** and is **absent from W9.md
§File Bounds entirely**, so this seat may not touch it. The same snapshot will collide with
**X-W9.d** (PSL-2 re-exports) and **X-W9.f** (`toHex` / `easingNames` / SCI-1) — it is a wave-level
omission, not a `.b` finding. **Cure (one edit):** delete the six retired names from the
`./transform` expectation, which turns the snapshot into G27's own ratchet — the test's title
already promises exactly that (*"or retired runtime name"*). **Ask:** the orchestrator names its
writer (naturally X-W9.f, which already owns the tuple the snapshot describes) by dated addendum.

**ESC-W9a-PROBE-UNRUNNABLE — already raised by X-W9.a (`5266ac97`); this seat CONFIRMS it and names
its cause.** `…/probes/src-surface-totality.mjs:74` calls `TR.decomposeMatrix3D(…)` at MTS-05 and
dies `TypeError: TR.decomposeMatrix3D is not a function` once the retirement lands. The probe is
held `execute, no write (re-run unmodified)` by §File Bounds, so no unit may repair it. Recorded
here only to state the seam from the causing end: **G27 and MTS-05 are mutually exclusive by
construction** — the spec ordered the symbol deleted and ordered the probe that asserts on it run
unmodified. This seat takes no position on which; the ruling is the orchestrator's, and X-W9.a's §9
states the two options. The retirement is **not** reverted for it: CC-094 is RETIRE, G27's falsifier
is *"export any of the six again (RED)"*, and the probe is an instrument, not the product.

#### 6. Residuals — booked so the close cannot discover them

1. **G10's last 7** are `src/foundation/math.ts`, X-W9.c's file and its named mechanism (*"retire the
   7 dangerous assertions"*). G10 goes green the moment `.c` lands; no byte of it is this seat's.
2. **`scripts/ci/verify-packed-surface.mjs:39-41`** still lists the six as expected `./transform`
   exports. The file is **X-W9.e's** (`modify`, G20). The six must leave that list in `.e`'s act or
   the packed-surface check reddens at the 4.1.0 tag.
3. **`src/foundation/math.ts:42`** names `interpolateDecomposed` in prose. Harmless; X-W9.c's file.
4. **LIB-02's transform leg is 3, not 0.** The three preserved entries throw on the non-string
   corpus `[undefined, null, 42, {}, [], NaN]` (`""` is fine). **Not cured here, deliberately**: it
   is X-W9.a's G3, this unit's mechanism names no `typeof` narrowing, and returning `0` for
   `getTotalLength(42)` is a surface decision, not a defect repair. Cure if ruled: one
   `typeof d !== "string"` narrowing at `PathGeometry`'s constructor covers all three at one root,
   inside this unit's file. X-W9.a's **ESC-W9a-G3-LEG-SCOPE** already books these 3 to `.b`.
5. **`src/transform/path.ts` grew 564 → 672 lines** — positional, validating tokenization is more
   code than one global `String.match`. It is not the max (`src/css/stylesheet.ts` = 920), so G16's
   ratchet is unmoved by it, **but X-W9.d should know that after the 265/381/153 split the new max
   `src/**/*.ts` is `src/transform/path.ts` at 672, not the 609 the spec names.** Splitting the
   module was not available: a new file under `src/` is a §Triumvirate Dispatch trigger.
6. **`cubicAt` (`path.ts`) is dead** — defined, never called, and no lint rule sees it. Pre-existing,
   outside this unit's named mechanism, left standing and recorded.
7. **Pre-existing quirk preserved, not cured:** a `moveto` that starts a new subpath emits a jump
   vertex through `pushVertex`, so the gap between subpaths is COUNTED in `totalLength`
   (`getTotalLength("M0 0 L10 0 M20 0 L30 0")` → 30; a browser answers 20). Untouched here — no gate
   names it and it is a behaviour change, not a totality repair.
8. **Relay owed by X-W9.i's keyframes packet:** O-8 §5 told keyframes that *"`/transform` … is
   unaffected"*. That sentence is now stale in two ways — the six are gone (they import none of
   them), and `PathGeometry`'s tokenizer is **stricter**: malformed `d` data yields the well-formed
   prefix instead of NaN-poisoned geometry, per SVG 1.1 §8.3. MorphSVG's seam is unchanged for
   well-formed paths.

#### 7. E13 mail — swept at this seat's own clock

⟨cmd⟩ `find <the four coordination paths> -maxdepth 1 -name '*.md' -newermt '2026-09-18 20:03'` →
`docs/tranches/V/coordination/INBOX.md` alone (self-excluded, a sibling seat's row edit). **0 new
mail files · 0 rows addressed to the library band's transform surface · 0 UNREAD in this unit's
scope.** The one standing row that touches it, **O-8** §5, is answered by residual 6.8 above, which
rides X-W9.i's packet, not this commit.

#### 8. Commits (worktree sha → integration sha on `tranche-u`)

| # | worktree | `tranche-u` | scope |
|---|---|---|---|
| 3 | `ef0f84c2` | **`474846ce`** | `fix(transform): path totality, positional arc flags, singular-3D null` — `src/transform/path.ts` · `src/transform/decompose.ts` · `test/transform/path-geometry.test.ts` · `test/transform/decompose-targeted.test.ts` |
| 4 | `f9794f85` | **`4be22189`** | `refactor(transform): retire the unused matrix family` — `src/subpaths/transform.ts` · DELETE `src/transform/decompose.ts` · DELETE `test/transform/decompose-targeted.test.ts` |

Pathspec on every commit (`git commit … -- <the same exact paths>`), `--no-verify`,
`Claude-Session` trailer, integration by `git checkout <worktree-sha> -- <paths>` + `git rm` for the
two deletions. ⟨cmd⟩ `git diff --cached --name-only` after each → **empty**; the same twelve sibling dirty
rows reproduce in `git status --porcelain` before and after, none of them ever staged by this seat.

---

### X-W9.c

SERVED MODEL: `claude-opus-5[1m]` · `./math` failure protocol
(W9.md §Agent Units `X.W9.c` :216-226 · §Hard Gate **G11** :353 · §Commit Plan row 5 :459 ·
§Disjointness free lanes :129-130).
**Status: DONE in bounds** — **G11 GREEN**, double-run in the worktree and again after
integration; **G10's residual 7 retired**, so its combined `src/transform/**` +
`src/foundation/**` scope now reads **0**. Two escalations raised, neither worked around.
Worktree `/Users/mkbabb/Programming/value.js-x-w9-c` @ base `fdebfef5`, `node_modules`
symlinked, private `dist/`; every figure read from settled bytes.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → 15 rows. ⟨cmd⟩ `git status --porcelain -- src/foundation/math.ts
src/subpaths/math.ts test/math.test.ts docs/tranches/X/waves/evidence/W9
docs/tranches/X/execution/A/X-W9.md` → **empty**. **No killed predecessor's partial work on
X-W9.c exists; nothing inherited, nothing stashed, nothing restored.** `scripts/dev/dev.sh` never
touched, never staged. The ten dirty `demo/**` rows and `CARRY-LEDGER.md` (sibling seats) never
touched. This unit's lock — *"it writes `src/subpaths/math.ts`, which `.d`'s PSL-1 derivation
rewrites wholesale, so it runs STRICTLY BEFORE `.d`"* — verified: ⟨cmd⟩ `git log --oneline -12`
carries no PSL-1 commit (`.e`'s two, `42727db0` and `df0807fe`, landed beside this seat instead);
⟨cmd⟩ `git diff --stat fdebfef5..HEAD -- src/foundation/math.ts
src/subpaths/math.ts test/math.test.ts` → **empty** at integration time, so no sibling had moved
this unit's three files.

#### 1. Anchors verified at TRUE bytes before any edit

| spec anchor | measured at `fdebfef5` | verdict |
|---|---|---|
| *"the sentence already written at `src/foundation/math.ts:58`"* (:218) | `:58` = `` * `start`, `stop`, `out` must share the same length; only `out` is written. `` | **EXACT** |
| *"retire the 7 dangerous assertions"* (:221) | ⟨cmd⟩ `npx eslint 'src/foundation/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'` → **7 problems**, all `src/foundation/math.ts`: `:69:22` `:69:38` (`lerpArray`) · `:92:25` `:92:32` `:95:12` (`deCasteljau`) · `:107:40` `:108:40` (`interpBezier`) | **EXACT — 7, and exactly the three functions the spec names** |
| *"move `scale`'s equal-bounds guard ABOVE its own division"* (:220) | `:15` computes `slope = (toMax - toMin) / (fromMax - fromMin)`; the guard is at `:18-20`, **below it** | **EXACT** |
| G11's three banked legs (:353) | `deCasteljau(0.5,[])` → `undefined` typed `number` · `interpBezier(0.5,[])` → `[undefined, undefined]` · `lerpArray(len3,len2,.5,out3)` → `[2.5, 3.5, NaN]` | **REPRODUCED**, plus two the bank does not name: `out` short → silent partial write `[2]`; `stop` long → silent ignore `[2, 3]` |

Two stale citations found **inside this unit's own file** and repaired in passing, both named to
this seat by X-W9.b's residuals 3 and 6.3: `:42` named `interpolateDecomposed`, retired with its
module at `4be22189`; `:56` cited `bench/numeric-soa.mjs`, which ⟨cmd⟩ `git log --all
--diff-filter=A --name-only | grep numeric-soa` shows was **deleted at `164343c1`** (the v4 cut).
The measured figures it carries are kept as the reading of record and marked as not a live command.

#### 2. The cure — the specified mechanism, nothing else

| site | cure | why it is the root |
|---|---|---|
| module head | a **module docstring** stating ONE precondition policy: every export checks its own size preconditions itself and throws a `RangeError` naming the function and the constraint; no export absorbs a violation into `undefined`, `NaN` or a short write; each check is O(1); type-level misuse is explicitly NOT the policy's subject | the sub-gate's words — *"stated once in the module docstring and enforced by code, not by a comment"* |
| `scale` | the equal-bounds guard moved **above** the division, and raised to `RangeError` with the message text preserved verbatim inside it | the module computed an infinite or NaN slope from an empty input range before rejecting it |
| `deCasteljau` | entry guard on the empty polygon; the three `!` retired by narrowing the reads | the `.d.ts` said `number` and the function returned `undefined` |
| `interpBezier` | its **own** entry guard (so the message names `interpBezier`, not the primitive it delegates to); the two `!` simply deleted — `xy[0]`/`xy[1]` are **tuple** reads, which `noUncheckedIndexedAccess` never widened, so those two assertions were pure noise | `[undefined, undefined]` under a declared `[number, number]` |
| `lerpArray` | one entry check pinning `start`/`stop`/`out` to a single length, **before** a byte of `out` is written; the two `!` retired by narrowing | the silent NaN frame — the shape G11's falsifier names |

**One policy, one error class.** All four throw `RangeError` (`RangeError extends Error`, so the
pre-existing `toThrow("fromMax and fromMin cannot be equal")` assertion stays green — verified,
not assumed). The test asserts the policy as a policy: every violation is a `RangeError` whose
message matches `^<functionName>: `.

**`src/subpaths/math.ts`**: four lines, a **pointer**, not a second statement of the policy —
*"stated once and enforced in code in `../foundation/math`'s module docstring"* — so the published
subpath describes its own failure protocol. **X-W9.d must carry that sentence across the PSL-1
rewrite** (it rewrites `src/subpaths/*.ts` wholesale).

#### 3. The two shapes were CHOSEN by measurement, not by taste

Retiring the `!` under `noUncheckedIndexedAccess` forces a choice of loop body, and the first
draft's index-free bodies were **measured and rejected** before landing
(`evidence/W9/math-lerparray-shapes.txt`, node v26.0.0, darwin arm64, best-of-3, interleaved,
double-run):

| body | K=1 / deg 2 | K=2 / deg 4 | K=8 / deg 8 | K=64 / deg 16 | verdict |
|---|---|---|---|---|---|
| `lerpArray` `for…of` over `start` | 2.28× | 1.26× | 1.94× | **5.88×** | **REJECTED** |
| `lerpArray` `start.forEach` | 6.67× | 4.21× | 7.97× | **11.92×** | **REJECTED** |
| `lerpArray` counted loop, both reads narrowed | 2.33× | **0.999×** | **1.02×** | **1.00×** | **SHIPPED** |
| `deCasteljau` index-free pairwise fold | 1.15× | 2.54× | 3.66× | **4.30×** | **REJECTED** |
| `deCasteljau` in-place triangle, reads narrowed | **1.00×** | **1.01×** | **1.01×** | **1.01×** | **SHIPPED** |

Ratios are against the pre-cure body (two `!`, **no** precondition check). The shipped `lerpArray`
is within noise of it from K≥2 — the multi-channel band its own docstring endorses — and costs
~3 ns/call at K=1, the band that docstring already tells callers not to use it in.

**The cure moves no valid input.** ⟨cmd⟩ `equiv-probe.mts` replays both shipped bodies against the
pre-cure bodies transcribed verbatim: `deCasteljau` degree 1..12 × 40 random polygons × 41 `t`
samples (extrapolation included), `interpBezier` degree 1..8 likewise, `lerpArray`
K∈{0,1,2,3,4,8,16,33,64} × 41 `t` → **cases=33169 mismatches=0, BIT-IDENTICAL** (`Object.is`, not
`toBeCloseTo`), double-run. `evidence/W9/math-equivalence.txt` carries the harness verbatim.

#### 4. Gate readings, BEFORE → AFTER, every one double-run

| gate | command | BEFORE | AFTER (worktree) | AFTER (integrated `tranche-u`) | verdict |
|---|---|---|---|---|---|
| **G11** | `npx vitest run test/math.test.ts` | **`Tests 11 failed \| 58 passed (69)`** — measured by restoring `src/foundation/math.ts` to HEAD under the cured battery, i.e. G11's own falsifier *"remove the boundary check"*, run | `70 passed (70)` | **`70 passed (70)`** (×2, identical) | **GREEN** |
| **G10 residual** (X-W9.b's gate, its last 7 are this unit's file) | `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule '{…no-non-null-assertion…}'` | **7** (all `src/foundation/math.ts`) | **0**, exit 0 | **0**, exit 0 (×2) | **GREEN — .b's residual 1 discharged** |

Collateral, measured on the integrated tree: ⟨cmd⟩ `npx vue-tsc -p tsconfig.lib.json --noEmit` →
**exit 0**. ⟨cmd⟩ `npx eslint src test` → **exit 0**. ⟨cmd⟩ `npm run lint` → 55 problems, **all 35
carriers under `docs/**`** (X-W8 G-6's ignore), zero under `src/` or `test/`. ⟨cmd⟩ `npx vitest
run` (after `npm run build`) → **`Tests 3 failed | 610 passed (613)`**; the three are the inherited
rows X-W9.b already named — `test/spectrum-luma.test.ts` (C-5 born-RED, X-W4) ·
`test/v4-c1.test.ts` (**ESC-W9b-V4C1-SNAPSHOT**) · `demo/test/shell/reka-binding-idiom.test.ts`
(NG-6, demo) — and none of the three imports `./math`.

#### 5. Escalations — raised, never worked around

**ESC-W9c-MTS06-SUPERSEDED — G1's probe asserts the pre-cure shape at MTS-06, as it does at
MTS-05.** `…/probes/src-surface-totality.mjs:79-85` reads
`Number.isFinite(M.deCasteljau(0.5, []))`, `M.interpBezier(0.5, []).every(Number.isFinite)` and
`Array.from(M.lerpArray(len3, len2, .5, out3)).every(Number.isFinite)`. That pass-condition can
only be met by **returning a finite number for an empty control polygon and a mis-sized buffer** —
which is the defect. W9.md :222 and G11 :353 both order **rejection**, and G11's command is
`test/math.test.ts`, not this probe. Replayed against the cured `dist/subpaths/math.js`, all three
calls throw their stated `RangeError`s (`evidence/W9/math-precondition.after-addendum-2026-09-18.txt`
§2). So **MTS-06 is superseded by G11 exactly as MTS-05 is superseded by G27** —
same structure, same cause: the spec ordered a cure and ordered a probe that asserts the pre-cure
shape to be **run unmodified** (§File Bounds, `execute, no write`). In practice the probe never
reaches MTS-06 today — it dies at `:74` on `TR.decomposeMatrix3D is not a function`
(**ESC-W9a-PROBE-UNRUNNABLE**, confirmed at this seat, ⟨cmd⟩ re-run on the integrated tree) — so
this escalation is a **second** instance of the same seam, not a new blocker. **Ask**: fold it into
whichever of X-W9.a §9's two options is ruled, so that a guard or a strike covers MTS-05 **and**
MTS-06 together. No unit may repair the probe; the ruling is the orchestrator's.

**ESC-W9c-PARSER-TOTALITY-TSC — `npm run typecheck` is RED in the shared tree, on a sibling's
file.** ⟨cmd⟩ `npx vue-tsc -p tsconfig.test.json --noEmit` → **2 errors, both
`test/parser-totality.test.ts` (`:89:40`, `:146:44`, TS2322 — a `ParseResult<CssValue>` assigned
where `ParseResult<CssColor>` is declared)**. Measured **identical with this unit's three files
reverted to HEAD**, so it is inherited, not caused here. It matters because §Format And Lint
Cadence names `npm run typecheck` (which runs **four** projects) before close, and X-W9.a's receipt
records only `tsconfig.lib.json`, which does not include `test/`. The file is X-W9.a's creation and
is in **no** other unit's writable set. **Cure named, not performed**: widen the fixture's
annotation to the union the call actually returns, or split the two batteries by return type —
one line either way, no assertion changed. **Ask**: the orchestrator names its writer (naturally
X-W9.a, re-dispatched, or X-W9.e which already holds `test/**`).

#### 6. Residuals — booked so the close cannot discover them

1. **The `lerpArray` length ask is now WITNESSED, and it inverts.** `evidence/W9/math-lerparray-consumer-ask.txt`.
   Read at their bytes (READ-ONLY, no keyframes byte written): `interpolate.ts:274` is **safe** —
   `compile/frame/numeric-plan.ts:18-30` builds `from`/`to`/`out` all as `new
   Float64Array(numeric.length)`. **`physics/numeric.ts:193` is not**: `:186-192` grows a shared
   `_out` scratch *"never shrink it"*, while `buildSegment` (`:135-141`) sizes each segment's
   `from`/`to` to **that segment's own** `Object.keys(start).length`. A segment narrower than one
   already visited therefore calls with `out.length > start.length`, which the cured contract
   rejects — replayed: `K=3 → ok`, then `K=2, out.length=3 → RangeError`. **Nothing breaks today**
   (their pin is exactly `"4.0.0"`, `../keyframes.js/package.json:71`); it breaks **with the 4.1
   pin bump**, i.e. inside X-W9.f's dated cut — which is exactly why W9.md :222-223 says the leg is
   **asked**, never assumed. **X-W9.i's keyframes packet must carry**: the site, the witness, the
   one-line allocation-free cure at their end (`this._out.subarray(0, n)` — a view, so their
   zero-alloc idiom survives), and the inversion of O-11 §E's ask (`INBOX.md:79`, SENT 2026-07-27,
   *no reply on record*): the silent `[2.5, 3.5, NaN]` is gone and a **rejection** has taken its
   place at one measured site. Not taken here, named so it can be ruled rather than discovered:
   relaxing `out` to `>= n` would accommodate their idiom without reopening the NaN class — but
   `:58` says **share the same length**, and changing the sentence this unit was ordered to enforce
   is an adjudication, not an implementer's edit (E-3).
2. **LIB-02's `./math` leg reads 5 → 6.** ⟨cmd⟩ `library-band-gates.mjs` → `by subpath: value=1
   css=18 easing=1 math=6 transform=3` (total 29). The +1 is **`cubicBezier`**: called with its
   four numeric arguments missing it builds `[0, undefined, undefined, 1]`, which pre-cure
   multiplied straight through `lerp` and **returned `[NaN, NaN]`**, and now throws. That is the
   silent-NaN class G11 exists to kill, so the +1 is the cure working — but it is a measured +1 on
   a leg **X-W9.a already escalated as mis-scoped** (ESC-W9a-G3-LEG-SCOPE: LIB-02 reads arity and
   shape violations of the published `.d.ts`). G3 is not this unit's gate; G11 is, and its command
   is `test/math.test.ts`. Booked, not hidden.
3. **`cubicBezier` has no guard of its own.** Its precondition is *five numbers*, a type contract,
   not a size one, so the policy's own words put it outside the policy. A JS caller who omits
   arguments now gets `deCasteljau: points must hold a number at every index; index 1 of 4 holds
   none` — diagnosable, but it names the delegate. Left standing deliberately; a `cubicBezier`
   guard would be a second policy for a case TypeScript already rejects at compile time.
4. **`src/foundation/math.ts` is prettier-non-conformant on ONE pre-existing line** — the
   `interpBezier` signature, wider than the 88-column `.prettierrc.json`. It was non-conformant at
   HEAD and is untouched here (⟨cmd⟩ `prettier --stdin-filepath` on HEAD's blob prints the same
   single delta). `src/subpaths/math.ts` and `test/math.test.ts` are fully conformant. No formatter
   gate exists in the repo (`npm run lint` is eslint only), so this is a note, not a defect.
5. **`lerpArray`'s in-loop narrowing has no test.** It is reachable only from plain JS (a
   `Float64Array` read is never empty in bounds), and covering it from a TypeScript test needs a
   cast this seat will not write. Its `deCasteljau` twin **is** covered, three ways — interior
   hole, leading hole, and the degree-0 arm the unwrap catches — using `new Array<number>(n)`,
   which TypeScript still types `number[]`, so no cast was needed there either.

#### 7. E13 mail — swept at this seat's own clock

⟨cmd⟩ `/usr/bin/find <the four coordination paths> -maxdepth 1 -name '*.md' -newermt '2026-09-18
20:03'` → `docs/tranches/V/coordination/INBOX.md` alone (**self-excluded**, a sibling seat's row
edit); the glass BK, keyframes V and atlas P paths return **nothing**. **0 new mail files · 0 rows
addressed to `./math` · 0 UNREAD in this unit's scope** — the three live UNREAD rows (I-32, I-33,
I-34) route by their own Routing cells to X-W0.j / the formation mail seat / X-EXT-1..6, as the
wave's open recorded. The one standing row that touches this unit's surface, **O-11 §E**
(`INBOX.md:79`), is answered by residual 6.1 above, which rides **X-W9.i's** packet, not this
unit's commits. `INBOX.md` carries **no edit** from this seat.

#### 8. Commits (worktree sha → integration sha on `tranche-u`)

| # | worktree | `tranche-u` | scope |
|---|---|---|---|
| 5 | `1d6c68c0` | **`a692069f`** | `fix(math): stated precondition protocol` — `src/foundation/math.ts` · `src/subpaths/math.ts` · `test/math.test.ts` + four evidence files |
| 5b | `9ff9b897` | **`5ba934fc`** | `fix(math): name what the narrowed read actually found` — the truthfulness correction below, + its dated addendum-beside |

**Row 5 is two commits, and the reason is recorded rather than amended away.** After integrating
`a692069f` this seat replayed the LIB-02 corpus over `./math` and found the per-element narrowings
in `deCasteljau` and `lerpArray` are **not** unreachable as `a692069f`'s comments claimed: an
in-bounds read comes back empty whenever the caller's array carries a hole, and `cubicBezier(42)`
reaches `deCasteljau` as exactly such an array. Their messages (*"read past the end"*) therefore
described the wrong fault. `git commit --amend` would have rewritten a tip that three sibling seats
share — it is not this seat's to rewrite, and the standing law forbids reset and force-push — so
the correction is its own commit with its own meaning, and the committed evidence was left
**immutable** with a **dated addendum-beside** per E-3
(`math-precondition.after-addendum-2026-09-18.txt`), never a rewrite.

Pathspec on every commit itself (`git commit … -- <the same exact paths>`), `--no-verify`,
`Claude-Session` trailer; integration by `git checkout <worktree-sha> -- <paths>`. ⟨cmd⟩ `git diff
--cached --name-only` before and after each → **empty**; the same fifteen sibling dirty rows
reproduce in `git status --porcelain` either side, `scripts/dev/dev.sh` among them, never staged.
Worktree left in place for the close's re-measure; ⟨cmd⟩ `git -C <worktree> status --porcelain` →
**clean**.

#### 9. Evidence

`docs/tranches/X/waves/evidence/W9/` — `math-precondition.before.txt` (the born-RED readings and
G11's falsifier run, with each of its 11 named failures) · `math-precondition.after.txt` (the gate
either side, double-run, with the harness verbatim) · `math-precondition.after-addendum-2026-09-18.txt`
(the E-3 addendum-beside: the LIB-02 delta, ESC-W9c-MTS06-SUPERSEDED, and the settled-byte sha256s)
· `math-equivalence.txt` (33,169 `Object.is` comparisons, 0 mismatches) ·
`math-lerparray-shapes.txt` (why the shipped bodies are the shipped bodies) ·
`math-lerparray-consumer-ask.txt` (the witnessed keyframes ask for X-W9.i).

---

### X-W9.e

SERVED MODEL: `claude-opus-5[1m]` · Oracle truth, coverage truth, packed-surface truth
(W9.md §Agent Units `X.W9.e` :248-262 · §Hard Gate G18–G20 :360-362 · §Commit Plan rows 7–8
:461-462 · §Format And Lint Cadence :429-431 PT-08).
**Status: PARTIAL** — **G18 GREEN in bounds · G19 GREEN · G20 GREEN in bounds, RED at the
repository command** for a cause outside this seat's writable set. **Three escalations raised, none
worked around**; one named mechanism item (the 34-pair Sharma table) is **unperformed and recorded**
because its subject does not exist on the 4.x surface.
Worktree `/Users/mkbabb/Programming/value.js-x-w9-e` @ `fdebfef5`, `node_modules` symlinked, private
`dist/`; every figure read from settled bytes, measured in the worktree and **again after
integration** into `tranche-u`, and **double-run** at both.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → 15 rows at open. ⟨cmd⟩ `git status --porcelain --
test/v4-color-behavior.test.ts test/color-anchors.test.ts scripts/ci/verify-packed-surface.mjs
docs/tranches/X/waves/evidence/W9 docs/tranches/X/execution/A/X-W9.md` → **empty**. **No killed
predecessor's partial work on X-W9.e exists; nothing inherited, nothing stashed, nothing restored.**
`scripts/dev/dev.sh` never touched; the ten dirty `demo/**` rows (X-W4 / X-W7 seats) never touched;
`CARRY-LEDGER.md` never touched. Siblings landed beside this seat during the run (`5ba934fc`
X-W9.c · `ed1593cc` X-KF) and **not one of their rows was ever staged by this seat** — ⟨cmd⟩
`git diff --cached --name-only` after each of this unit's two commits → **empty**.

#### 1. Anchors verified at TRUE bytes before any edit

| spec anchor | measured at `fdebfef5` | verdict |
|---|---|---|
| `v4-color-behavior.test.ts:66` | `expect(converted.channels[1]).toBeCloseTo((byte / 255) / 12.92, 12)` under *"matches the independent IEC sRGB dark-band oracle"* (`:63`) | **EXACT** |
| `verify-packed-surface.mjs:137` | `process.stdout.write(\`${JSON.stringify({ runtime, strictTypes: 62 })}\n\`)` | **EXACT** |
| `test/color-anchors.test.ts` absent | ⟨cmd⟩ `git show fdebfef5:test/color-anchors.test.ts` → `fatal: path … does not exist` | **EXACT** |
| the U-era oracle record | `docs/tranches/U/audit/oracle/color-anchors/README.md` present, naming U-F72's three transforms and U-F73's 34 Sharma pairs | **EXACT** |
| denominators *"142 declared / 79 runtime"* (:256) | **reproduce exactly** at `aa8c8cbd`, the last commit before X-W9 touched `src/`: ⟨cmd⟩ scratch worktree + `npm run build` → `grep -h '^export declare ' dist/subpaths/*.d.ts \| wc -l` = **142**; runtime `color 23 · value 1 · css 19 · easing 16 · math 9 · transform 9 · quantize 2` = **79** | **EXACT at the spec's substrate; MOVED at this open** → §4 |

Why `:66` was circular, measured rather than asserted: `Y` is the sum of the D65 matrix's middle row
(`0.21263900587151027 + 0.715168678767756 + 0.07219231536073371` = 1 to float), and below the knee
`srgbDecode(v) = v / 12.92`, so the expectation *reduces to the implementation re-derived in the
test*. It could not fail for the reason its name claimed.

#### 2. Act 1 — commit 7: the external vectors, and the false name deleted

`test/color-anchors.test.ts` (create): **12 assertions** over **four published families**, every
expected value transcribed from an INDEPENDENT implementation, none re-derived from `src/color/`,
**none a round-trip** (a round-trip is blind to the shared-error class these exist to catch). They
bind the **published** v4 surface (`rgb`/`xyz`/`ictcp`/`convertColor` from `./color`), not the
retired `src/units/` internals the U-era files addressed:

| family | source | vectors | measured max abs error | tolerance asserted |
|---|---|---|---|---|
| sRGB → XYZ-D65 | culori `test/xyz65.test.js` | 3 (white · red · `#00cc00`) | **2.220e-16** | `toBeCloseTo(_, 10)` |
| XYZ-D65 → Lab-D50 | culori `test/lab.test.js` | 2 | **2.349e-5** | `toBeCloseTo(_, 3)` |
| XYZ → OKLab | Ottosson's own published triples | 4 | **4.031e-4** | abs ≤ **1e-3** |
| XYZ ↔ ICtCp | culori `test/itp.test.js` | 3 (incl. the inverse leg, both ends external) | **3.553e-14** | `toBeCloseTo(_, 9)` |

`v4-color-behavior.test.ts:63-68` — the false name and the circular expectation are **both gone**.
What replaces them asserts the shape IEC 61966-2-1 specifies **without quoting either branch's
constants**: the transfer function is a straight line through the origin below the knee at encoded
`0.04045` (⟨cmd⟩ `0.04045 × 255` = **10.31475**), so `Y(b)/b` is constant for bytes 1..10 — measured
spread **≤ 1.626e-19**, asserted at `toBeCloseTo(_, 18)` — and departs at byte 11 (measured
**7.035e-7**) and at 128. A single-branch implementation, or one whose knee has moved, fails it.

**The anchors are measured BINDING, not vacuous.** A scratch copy with one golden per family
perturbed (`xyz65` white z +1e-9 · lab-D50 white L* +1e-2 · Ottosson X a +2e-3 · culori itp red I
+1e-8) reddens **5 of 12** — one per perturbed family plus the inverse ICtCp leg. The probe file was
deleted in the same shell act and **never committed**: ⟨cmd⟩ `ls test/anchors-falsifier.test.ts` →
`No such file or directory`. Transcript, both double-runs and the falsifier:
`docs/tranches/X/waves/evidence/W9/color-anchors.measured.txt`.

#### 3. Act 2 — commit 8: the packed-surface behavioural half

`SMOKE` carries **one case per runtime export**, invoked with representative **valid** arguments
**inside the consumer workspace**, so every case exercises the **INSTALLED TARBALL** and not this
tree (PT-08 — the oracle is the packed tarball, never the worktree `dist/`). A case must not throw
and must not produce `undefined`/`null`; the driver refuses to run when the smoke set and the export
set disagree in **either** direction. `strictTypes: 62` is **deleted**; both printed counts are
summed from checks that just ran.

Riding the same commit because the check could not otherwise reach its own surface:
`expected.transform` loses the six symbols X-W9.b retired — **X-W9.b booked this to this unit at its
receipt §6.2** (*"The six must leave that list in `.e`'s act or the packed-surface check reddens at
the 4.1.0 tag"*), and it is discharged here.

**G20's falsifier, executed verbatim** rather than asserted. A tarball was doctored from the real one
by appending to `package/dist/subpaths/math.{js,d.ts}` an export that imports fine and throws when
called:

| leg | script | reading |
|---|---|---|
| **A** | the **presence-only** script at `fdebfef5`, new name admitted | **exit 0 — GREEN** over a surface containing a throwing export, printing `{"runtime":{…,"math":10,…},"strictTypes":62}` |
| **B** | **this** script, same tarball, name admitted **and** given a smoke case | **exit 1** — `/math throwsOnCall threw on a valid invocation: this export imports fine and throws on invocation` |
| **C** | **this** script, name admitted, **no** smoke case | **exit 1** — `/math has no smoke case for: throwsOnCall` |

The ratchet fires in both directions and the pre-cure script does not. Full transcript:
`evidence/W9/packed-surface.measured.txt`; the run itself: `evidence/W9/packed-surface.after.json`.

**Relay to X-W9.f**: adding a runtime export now costs **two** edits in this one file — its
`expected` row (as it always did) **and** its `SMOKE` case. `toHex`, `easingNames()` and SCI-1's
three names each need both, or the pre-tag `npm pack` → `verify-packed-surface.mjs` cadence reddens.

#### 4. Act 3 — commit 8: coverage-by-export, PUBLISHED over a recorded command

⟨cmd⟩ `node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs` — the command is **committed
beside its output**, always exits 0 and asserts **no threshold** (*"a coverage floor with no consumer
is L-19 contrivance"*, :261-262).

| | at `aa8c8cbd` (the spec's substrate) | **at this open (`fdebfef5`)** |
|---|---|---|
| declared export names (`^export declare ` across `dist/subpaths/*.d.ts`) | **142** | **131** lines / 131 distinct |
| runtime exports (7 subpaths) | **79** | **73** |

**The denominator MOVED and is re-recorded, not carried** (G19's falsifier names exactly that). One
cause, named symbol by symbol: X-W9.b's retirement — runtime −6 (the six functions); declared −11
(those six, plus `DecomposedMatrix2D` `DecomposedMatrix3D` `Vec4` `Mat4`, plus the second
`export declare` line `interpolateDecomposed` occupied). `transform.d.ts` reads **16 → 5**.

**Coverage, whole suite: 73 / 73 = 100.0%.** **Minus `test/v4-c1.test.ts` (the exact-surface
snapshot, which names every export by construction): 70 / 73 = 95.9%.** Both are published, because
a single figure leaning on the snapshot would over-claim. The three names reached by nothing else in
the tree are **`isLayoutTrackingUnit`** (`./value`), **`collectDeclarations`** and
**`parseKeyframeSelector`** (`./css`) — recorded as the finding it is; authoring three behavioural
tests is not this unit's named mechanism. The measure is reachability-by-name over vitest's own
include globs (36 seeds, 78 first-party modules outside `src/`), parsed with the **TypeScript
compiler API, not a grep**, and its limits are stated in §4 of the published file. The
`NODE_V8_COVERAGE` route was tried and measured **unusable**: vitest evaluates transformed modules
under synthetic URLs, so ⟨cmd⟩ `NODE_V8_COVERAGE=<dir> npx vitest run --pool=forks` produced 958
script URLs of which **0** resolve to `src/`. No coverage provider is installed and installing one is
a `package.json` edit this unit does not hold.

#### 5. Gate readings, BEFORE → AFTER, every one double-run

| gate | command | BEFORE | AFTER (worktree) | AFTER (integrated `tranche-u`) | verdict |
|---|---|---|---|---|---|
| **G18** | `npx vitest run test/v4-color-behavior.test.ts test/color-anchors.test.ts` | `:66` asserts `(byte/255)/12.92` under an independent-oracle name; anchor file **absent** | `2 passed · 20 tests`; 4 external families; 5/12 redden under the falsifier | `2 passed · 20 tests` (×2, identical) | **GREEN IN BOUNDS** — the circular oracle is deleted and the committed vectors bind. Residual: the Sharma half, **ESC-W9e-SHARMA-NO-SUBJECT** |
| **G19** | `node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs` | no coverage configuration exists anywhere; no number, no command | 131/73 · 73/73 · 70/73 | **identical** (×2, `diff -q` silent), with X-W9.c's `5ba934fc` landed beside | **GREEN** |
| **G20** | `npm pack` → `node scripts/ci/verify-packed-surface.mjs <tarball>` | presence-only + hardcoded `strictTypes: 62`; **and the command itself exits 1 at the TYPES half** on a stale fixture | 73 runtime / **73 smoke**, `strictTypes` gone; falsifier A green / B red / C red | 73 / **73**, exit 0, ×2 identical, over the primary tarball `a4b89cf2…badd` | **GREEN IN BOUNDS, RED at the repository command** → **ESC-W9e-FIXTURE-V4TYPES** |

Collateral on the integrated tree, measured: ⟨cmd⟩ `npx vitest run` → **610 passed · 3 failed** —
`test/spectrum-luma.test.ts` (C-5 BORN-RED, X-W4's), `demo/test/shell/reka-binding-idiom.test.ts`
(NG-6, demo's) and `test/v4-c1.test.ts` (**ESC-W9b-V4C1-SNAPSHOT**, already raised); **none is this
unit's**. ⟨cmd⟩ `npx eslint scripts/ci/verify-packed-surface.mjs
docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs test/color-anchors.test.ts
test/v4-color-behavior.test.ts` → **exit 0**. ⟨cmd⟩ `npm run lint` → **55 problems, unchanged** from
X-W9.a's reading, every one under `docs/tranches/**` (X-W8 G-6's ignore owns them); this unit adds
**zero**.

#### 6. Escalations — raised, never worked around

**ESC-W9e-SHARMA-NO-SUBJECT — the 34-pair Sharma CIEDE2000 table has no subject on the 4.x surface.**
⟨cmd⟩ `grep -rniE "ciede|delta_?e|colou?rDifference" src/ \| wc -l` → **0**. `./color` publishes 23
names and **none is a colour-difference metric**; nor is one on any of the other six subpaths (73
runtime names total). `deltaE2000` left the tree **with its module**: ⟨cmd⟩
`git show 7334c793 --stat -- src/units/color/difference.ts test/units/color/color-difference.test.ts`
→ `243` and `193` lines deleted, fifteen months before this wave's spec was written. **No substitute
was made** — a test-local CIEDE2000 would certify the test's own arithmetic, not the library, which
is exactly the circularity this unit's other half deletes; and shipping a `deltaE2000` export is a
**surface decision** bound by G21/G22/G29 and `X-W9.f`'s closed ship list, not an implementer's act.
Measured reason and the two named cures — **(i)** rule the clause SUPERSEDED-BY-THE-V4-CUT by dated
addendum-beside, or **(ii)** name a writer for a colour-difference export folded into `.f`'s one
dated cut with the table as its certification — are written out at
`docs/tranches/X/waves/evidence/W9/sharma-no-subject.md`. **Ask**: the orchestrator rules one.

**ESC-W9e-FIXTURE-V4TYPES — G20's command dies before its own surface check, on a file no unit may
write.** `scripts/ci/verify-packed-surface.mjs` compiles `fixtures/public-types/value-v4.ts` as its
TYPES half; that fixture still names the ten symbols X-W9.b retired, so ⟨cmd⟩ `node
scripts/ci/verify-packed-surface.mjs <tarball>` → **exit 1**, `TS2305 DecomposedMatrix2D`,
`DecomposedMatrix3D`, `Mat4`, `Vec4` and `TS2339` on the six runtime names — **and it did so before
this unit touched anything** (measured with the `fdebfef5` script, `evidence/W9/packed-surface.measured.txt`).
`fixtures/**` is **absent from W9.md §File Bounds entirely** and is in no unit's writable set, so
this seat wrote **no byte** of it; the AFTER reading was taken through a scratch overlay holding a
corrected copy of that one fixture, with the script's bytes byte-identical (⟨cmd⟩ `cmp -s` → **YES**)
and the tarball unchanged, and the overlay is declared in both evidence files rather than hidden.
**Cure, one edit**: delete its **14** stale lines (4 type imports, 4 names in the declaration list, 6
runtime references). **Ask**: the orchestrator names its writer — naturally **X-W9.f**, which already
owns the 4.1 tuple that fixture describes and must re-run this exact command before the tag. Same
class as **ESC-W9b-V4C1-SNAPSHOT**; both are the retirement's downstream artifacts, and both are one
deletion each.

**ESC-W9e-TESTPROJ-TSC — `npm run typecheck` is RED at the wave's own cadence, in a file outside this
unit.** ⟨cmd⟩ `npm run typecheck` → **exit 2**, exactly **2** errors, both
`test/parser-totality.test.ts` (`:89:40`, `:146:44`, TS2322 — a `ParseResult<CssColor>` annotation
over a `parseCssScalar`/`parseCssValue` result). Measured **pre-existing**: the same two errors
reproduce at the untouched primary before this unit's first commit, and X-W9.a's receipt measured
only `tsconfig.lib.json`, which is clean — `tsconfig.test.json` was never run there. This unit's four
files contribute **zero** errors. **Ask**: route it to `test/parser-totality.test.ts`'s owner
(X-W9.a's file); §Format And Lint Cadence :425 requires a green `npm run typecheck` before the wave
closes and no unit can currently deliver it.

#### 7. Residuals — booked so the close cannot discover them

1. **Three published entries are reached only by the surface snapshot** — `isLayoutTrackingUnit`,
   `collectDeclarations`, `parseKeyframeSelector`. All three ARE now invoked against the packed
   tarball by G20's smoke half, so they are exercised somewhere; they have no behavioural test in the
   tree. Published in `coverage-by-export.md` §3.2, not repaired.
2. **The `SMOKE` table is a ratchet X-W9.f must feed.** Five names arrive at the cut (`toHex`,
   `easingNames`, `sampleColorRamp`, `mixColorsInto`, `toRgba8Into`); each needs an `expected` row
   **and** a `SMOKE` case in `scripts/ci/verify-packed-surface.mjs`, or the pre-tag cadence reddens
   with `has no smoke case for: …`. `scripts/ci/verify-packed-surface.mjs` is listed `modify` at
   §File Bounds (wave level) but sits in **this** unit's writable set in §Unit plan; `.f` needs the
   grant, exactly as ESC-W9e-FIXTURE-V4TYPES needs one for the fixture.
3. **`coverage-by-export.mjs` lives under `docs/…/evidence/W9/`**, not `scripts/`, because that is
   this unit's writable set. It is lint-clean (⟨cmd⟩ `npx eslint` → exit 0) and adds **zero** to the
   repo-wide 55. If the close wants it run by CI it must move, and that move is X-W1's file.
4. **The `.d.ts` denominator counts LINES, and 131 lines = 131 distinct names today** only because
   the duplicate `interpolateDecomposed` line left with the family. The script prints both figures so
   a future divergence is visible rather than silent.
5. **`test/color-anchors.test.ts` carries the ICtCp family**, which the U-era README does not
   describe (it lived in the deleted `color-difference.test.ts`). It is included deliberately: it is
   external, forward-only, and `ictcp` is the space X-W9.h's descriptor defect sits on, which had
   **no** external anchor on the v4 surface at all. Provenance is stated in-file.

#### 8. E13 mail — swept at this seat's own clock

⟨cmd⟩ `find <the four coordination paths> -maxdepth 1 -name '*.md' -newermt '2026-09-18 20:03'`
(2026-09-18 21:10 EDT) → `docs/tranches/V/coordination/INBOX.md` **alone** — self-excluded per the
SELF-COUNT law, and a sibling seat's row edit, not this unit's. ⟨cmd⟩ `grep -nE '\| *UNREAD'
docs/tranches/V/coordination/INBOX.md` → **0 rows**. ⟨cmd⟩
`grep -niE 'oracle|coverage|packed-surface|ciede|sharma|color-anchors' …/INBOX.md` → one hit, **I-28**
(glass 8.0.0), whose Routing cell sends it to the X·V refinement fold, not the library band.
**0 new mail files · 0 rows addressed to this unit's scope · 0 UNREAD.** `INBOX.md` carries no edit
from this unit.

#### 9. Commits (worktree sha → integration sha on `tranche-u`)

| # | worktree | `tranche-u` | scope |
|---|---|---|---|
| 7 | `a5f255f5` | **`42727db0`** | `test(oracle): external colour vectors; rename the circular oracle` — `test/color-anchors.test.ts` (create) · `test/v4-color-behavior.test.ts` · `evidence/W9/color-anchors.measured.txt` · `evidence/W9/sharma-no-subject.md` |
| 8 | `2dac4228` | **`df0807fe`** | `ci(packed-surface): behavioural half; delete strictTypes:62` — `scripts/ci/verify-packed-surface.mjs` · `evidence/W9/packed-surface.{after.json,measured.txt}` · `evidence/W9/coverage-by-export.{mjs,md,txt}` |

Two commits, one meaning each, exactly as §Commit Plan rows 7–8 and this unit's LOCKS require.
Pathspec on the commit itself, `--no-verify`, `Claude-Session` trailer, integration by
`git checkout <worktree-sha> -- <exact paths>`. ⟨cmd⟩ `git diff --cached --name-only` after each →
**empty**; the sibling dirty rows reproduce unchanged before and after, none ever staged here.

---

### X-W9.d

SERVED MODEL: `claude-opus-5[1m]` · Public-surface law and module topology
(W9.md §Agent Units `X.W9.d` :228-246 · §Hard Gate G12–G17 :354-359 · §Commit Plan row 6 :460 ·
§Triumvirate Dispatch :56-70 · COHESION §0k.3 **S-3**).
**Status: PARTIAL** — **G12 LEG1 · G15 · G16 · G17's boundary leg GREEN**, double-run; **G13
(33 → 20) and G14 (58 → 60) honest-RED for a root the gate's own model does not name**, measured
here for the first time; **G12 LEG2 RED on a file this unit may not write** and on a position this
repo has already SENT to the consumer it affects. **Three escalations raised, none worked around.**
Ran on integrated main (`tranche-u`), after `.a`, `.b`, `.c`, `.e` landed, alone in its group as the
LOCKS require. Every figure read from settled bytes and **double-run**.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → **15 rows**. ⟨cmd⟩ `git status --porcelain -- src/subpaths
src/css/index.ts src/css/types.ts src/css/grammar.ts src/css/stylesheet.ts src/css/serialize.ts
src/css/rules.ts src/color/index.ts src/color/operations.ts docs/tranches/X/waves/evidence/W9
docs/tranches/X/execution/A/X-W9.md` → **empty**. **No killed predecessor's partial work on X-W9.d
exists; nothing inherited, nothing stashed, nothing restored.** `scripts/dev/dev.sh` never touched
and never staged; the ten dirty `demo/**` rows (X-W4 / X-W7 seats), `CARRY-LEDGER.md` and the three
untracked X-W1 paths never touched. The same fifteen rows reproduce after this unit's commits.

#### 1. Anchors verified at TRUE bytes before any edit

| spec anchor | measured at `efe3db89` | verdict |
|---|---|---|
| *"exactly 3 statements move (`css/types.ts:1`, `css/grammar.ts:18`,`:19`)"* (:236-237) | `types.ts:1` = `import type { Color, ColorIssue } from "../color/model";` · `grammar.ts:3-18` = the 16-name value import **ending at `:18`** (`isAnyColor` is one of them, `:16`) · `grammar.ts:19` = `import type { Alpha, Channel, ChannelsBySpace, ColorIssue, SpaceId } from "../color/model";` | **EXACT** — three statements, and the `:18` one carries `isAnyColor`, which is why the barrel must publish it (§5) |
| *"`anchors.ts`/`operations.ts` keep their relative `./model` imports"* (:237-238) | `anchors.ts:1` and `operations.ts:3-15` import `./model`; routing either through the barrel cycles (`index → operations → index`) | **EXACT — left untouched** |
| *"`stylesheet.ts` 899 → 265/381/153"* (:238-239) | ⟨cmd⟩ `wc -l src/css/stylesheet.ts` → **920**; ⟨cmd⟩ `git show 41450f02:src/css/stylesheet.ts \| wc -l` → **899**. X-W9.a's cure added 21 lines before this seat opened the file | **DRIFTED — INTENT AT TRUE BYTES** (§3) |
| *"hoist the six double `declarations.get()` at `:709-717`"* (:241) | **already hoisted by X-W9.a** (its receipt §3: *"X-W9.d's listed row, discharged here… `.d` re-measures rather than inherits"*). Re-measured: ⟨cmd⟩ `grep -n 'declarations.get' src/css/stylesheet.ts` → 8 reads, **one per key**, zero doubles | **DISCHARGED UPSTREAM, re-measured** — and one MORE double found and cured here (§4) |
| *"`isSupportedSyntaxDescriptor` goes `@internal`"* (:242) | it is declared in **`src/css/syntax.ts`**, which is in **no** unit's writable set and **absent from W9.md §File Bounds entirely**. Measured: ⟨cmd⟩ `grep -rn 'isSupportedSyntaxDescriptor' dist/` → **nothing** — it reaches no emitted `.d.ts` and no subpath | **NOT WRITTEN, and nothing asks it to be** (§7.3) |
| *"`./value` is not deleted and `isLayoutTrackingUnit` does not move"* (:242) | `src/subpaths/value.ts` present; ⟨cmd⟩ `Object.keys(./value)` → `["isLayoutTrackingUnit"]` | **HONOURED** |
| COHESION §0k.3 **S-3** (`src/color/model.ts` narrow reading) | ⟨cmd⟩ `git diff --stat 41450f02..HEAD -- src/color/model.ts src/color/operations.ts src/color/anchors.ts` → **empty** | **ZERO BYTES, all three** |

#### 2. PSL-1 — two hand-kept lists become one derivation

All seven `src/subpaths/*.ts` are now star-forwards. The **delta was measured before it was landed**,
name by name, so the derivation could not widen the surface by accident: `easing`, `value`,
`quantize`, `math`, `transform` and `css` deltas are **empty** (the hand list and the module's own
`export` keywords already agreed); `color`'s delta is exactly **`ColorFactory`** — the type of all 23
published factories, which the hand list had dropped and which G12's LEG1 names by TS2459.

The barrels keep explicit lists: PSL-1 puts the public/internal decision **in the area barrel**, so
`src/css/index.ts` and `src/color/index.ts` are where it is written, once.

#### 3. The split — three products, TWO cross-seam edges, zero cycles

| product | layer | LoC |
|---|---|---|
| `src/css/rules.ts` (create) | text → `Declaration[]`, the `CssValue` readers, the `animation` shorthand, `collectDeclarations`, `collectAnimationOptions` | **519** |
| `src/css/stylesheet.ts` | the block scanner, the at-rule dispatch, `parseStylesheet`, the `collect*` family, `collectTimelineOptions` | **476** |
| `src/css/serialize.ts` (create) | `serializeCssValue` | **50** |

⟨cmd⟩ `grep -n 'from "./\(serialize\|rules\|stylesheet\)"' src/css/{serialize,rules,stylesheet}.ts`
→ `serialize.ts` **none** · `rules.ts` **none** · `stylesheet.ts:31 "./rules"`, `:32 "./serialize"`.
**Two edges, both out of one product** — a fan, so the seam is acyclic *by construction*, not by
inspection. **The banked seam's edge property reproduces exactly**; its 265/381/153 triple does not,
for two measured reasons: X-W9.a's +21 lines (899 → 920) and the per-product header each of the
three now carries (⟨cmd⟩ first-declaration line → **25 · 35 · 59**), which the banked 799-line sum
does not include. **ONE cut was made. No re-cut**, so the §Triumvirate third-attempt halt is not
approached; the drift is recorded, not iterated away.

`collectTimelineOptions` sits with the stylesheet layer, not beside its sibling
`collectAnimationOptions`, for one measured reason: it is the **only** declaration-level collector
that round-trips a `CssValue` back through the serializer (three times — range, scope, trigger),
and keeping it in `rules.ts` would put a **third** edge on the seam for one function. Written out
at `evidence/W9/psl-seam.md` §1 so the choice is reviewable rather than implicit.

**The cut moves no behaviour — measured, not asserted.**
⟨cmd⟩ `node docs/tranches/X/waves/evidence/W9/split-equivalence.mjs <scratch>` → **exit 0**, twice,
⟨cmd⟩ `diff -q run1 run2` **silent**. The harness bundles the **pre-split** entry (`git archive HEAD
src` at the parent commit, through `esbuild --bundle`) and the post-split entry and replays one
corpus through both: **933 cases · 0 mismatches** (75 value inputs × 9 published entries + 37
stylesheets × `parseStylesheet` + the whole `collect*` family + `serializeTimelineOptions`, deep-JSON
equality, throws compared as throws) and **59 parse→serialize→parse round-trips · 0 failures**.

#### 4. `serializeCssValue` — published, and it joins the `Result` idiom BEFORE it is exported

⟨cmd⟩ `'serializeCssValue' in CSS` → **true** (was `false`). Its signature is
`(value: CssValue) => Result<string, ColorIssue>`: the pre-split body **threw**
`TypeError: Cannot serialize CSS color` when handed an `AnyColor` that CSS cannot spell, and
`AnyColor` is wider than `CssColor` (`hsv`, `kelvin`, `ictcp`, `jzazbz`). Measured on an `hsv`
scalar → `{"ok":false,"error":{"code":"color_invalid_input"}}`. **PSL-3 honoured**: `ParseResult`
(text→AST) stays on the parsers, `Result` (value→value) on the serializer; the two are never
unified, and `src/foundation/result.ts` is not touched.

Thirteen internal call sites were converted rather than wrapped: nine raise the module's own typed
`failure(...)` (`@property`'s three descriptors, the five timeline-descriptor reads, the keyframe
timing/composition pair), and the three inside `collectTimelineOptions`/`parseRangeValue` degrade to
*absent option* — the same degradation that collector already applies when the re-parse fails. **No
`try/catch`, no fallback, no `!`**: ⟨cmd⟩ `npx eslint 'src/css/**/*.ts' --rule
'{"@typescript-eslint/no-non-null-assertion":"error"}'` → **4**, all `src/css/timeline.ts` — X-W9.a's
ESC-W9a-TIMELINE-NNA, **unmoved**; the three files this unit wrote add **zero**.

One more double read found and cured while the lines were open: `parseKeyframes` called
`collectDeclarations(declarations.value)` **twice**, building the whole map once per key. One
construction, two reads.

**G15's differential, measured against the verbatim fork** (`../keyframes.js/src/animation/compile/
emit/css-text.ts:42-57`, transcribed into the harness): the spec's banked reading reproduces —
**2 of the 3 fixtures diverge**, `"a : b"` → ours `"a: b"`, fork `"a : b"` — and this seat names the
cause the bank did not. A CSS `if()` condition parses as a **space-separated list whose `:` and `;`
are their own keyword tokens**:

```
ours -> if(supports(color: rgb(255 0 0)): rgb(255 0 0); else: rgb(0 0 255))
fork -> if(supports(color : rgb(255 0 0)) : rgb(255 0 0) ; else : rgb(0 0 255))
```

The library collapses that whitespace; the fork does not, so **the fork loses the declaration's own
spelling on every `if()` it is handed** — 8 of 59 corpus inputs, every one in the `:`/`;` class.
The direction was settled by measurement, not preference: this seat first dropped the collapse step
(it looked like a lossy rewrite) and `test/v4-css-emerging.test.ts`'s
`if(supports(color: red): red; else: blue)` round-trip **reddened**, which is the witness. The
fork's retirement is a keyframes act and rides **X-W9.i's packet** (RD-11); O-11 §B already told them
`serializeCssValue` would be published — this receipt adds the direction and the witness.

#### 5. The colour boundary, and the two names this cut publishes

The three statements moved onto `../color/index`. ⟨cmd⟩ `grep -rn "color/model" src | grep -v
"^src/color/"` → **nothing**, and the probe agrees: `ok LIB-04 colour types cross src/color/'s
boundary through the barrel only`.

`isAnyColor` joins the barrel because the statement at `grammar.ts:18` carries it —
`serializeCssColor` (`grammar.ts:326`) guards on it — and PSL-1 makes the barrel the one place
public/internal is decided, so a name the barrel carries **is published**. Runtime surface
⟨cmd⟩ `Object.keys` over the 7 packed entries → **73 → 75**: `./color` 23 → 24 (`isAnyColor`),
`./css` 19 → 20 (`serializeCssValue`). Both are booked as relays, not discovered at the tag (§7.1).

#### 6. Gate readings, BEFORE → AFTER, every one double-run

| gate | command | BEFORE | AFTER | verdict |
|---|---|---|---|---|
| **G12** | `node …/probes/consumer-surface-compile.mjs` | **4 RED** — TS2459 `CssValue` (`./css`), TS2459 `ColorFactory` (`./color`), TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED` on the root | **2 RED** — `ok LEG1 public return types are nameable from their own subpath`; both LEG2 rows stand | **LEG1 GREEN** (the exact two the falsifier names). **LEG2 RED on `package.json`** — not in this unit's set, and a *sent position* (§7.2) |
| **G13** | `grep -c '^declare ' dist/subpaths/*.d.ts` (sum) | **33** (color 1 · css 18 · easing 2 · quantize 6 · value 6) | **20** (color **0** · css **6** · easing 2 · quantize 6 · value 6) | **RED — 13 retired, 20 irreducible in bounds** (§7.2, ESC-W9d-DTS-SPELLING) |
| **G14** | `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` | **58** occurrences / 25 lines / **5** duplicated names | **60** / 26 / **5** | **RED — duplicate count unmoved, and the falsifier's stated cause is CURED without the observable following** (§7.2) |
| **G15** | `'serializeCssValue' in CSS` + 3 fixtures vs the fork | **false**; fork live, 2/3 fixtures diverge | **true**, `Result`-typed; 2/3 still diverge **and the divergence is measured to be the fork's** | **GREEN IN BOUNDS** — publication + `Result` landed; the fork's retirement is keyframes' act, routed to X-W9.i |
| **G16** | `wc -l src/**/*.ts \| sort -rn \| head -1` | **920** (`src/css/stylesheet.ts`); then 672 · 539 · 377 · 331 | **672** (`src/transform/path.ts`); then 539 · 519 · 476 · 377 | **GREEN** — the ratchet falls 920 → 672, below the spec's ≤609 target; `stylesheet.ts` leaves the top at **476** |
| **G17** | `library-band-gates.mjs` LIB-04 leg | **2** modules outside `src/color/` reach past the barrel (3 statements); **5** mangled duplicates | **0** modules (`ok`); **5** mangled names (`Alpha_2 SpaceId_2 Color_2 Channel_2 ChannelsBySpace_2`), 60 references | **BOUNDARY LEG GREEN** (the gate's named subject); its `_2` observable stays RED for the root in §7.2 |

Collateral, measured on the integrated tree: ⟨cmd⟩ `npx vue-tsc -p tsconfig.lib.json --noEmit` →
**exit 0**. ⟨cmd⟩ `npx eslint src test` → **exit 0**. ⟨cmd⟩ `npm run lint` → **55 problems,
unchanged**, every carrier under `docs/tranches/**` (X-W8 G-6's ignore); this unit adds **zero**,
including its committed harness (⟨cmd⟩ `npx eslint …/split-equivalence.mjs` → exit 0).
⟨cmd⟩ `npx vitest run` → **600 passed · 13 failed**: the three inherited rows (`spectrum-luma` C-5,
`v4-c1` ESC-W9b, `reka-binding-idiom` NG-6) **and ten in `test/v4-css-emerging.test.ts`**, all one
cause, ESC-W9d-EMERGING-SERIALIZE below. ⟨cmd⟩ `npm run typecheck` → exit 2, **3** errors: the two
pre-existing `test/parser-totality.test.ts` rows (ESC-W9c-PARSER-TOTALITY-TSC / ESC-W9e-TESTPROJ-TSC,
already raised) and one TS2459 in the same `v4-css-emerging` file.

#### 7. Escalations — raised, never worked around

**7.1 ESC-W9d-EMERGING-SERIALIZE — the spec's own cure reddens a test no unit of this wave may
write.** `test/v4-css-emerging.test.ts:12` deep-imports `serializeCssValue` from
`"../src/css/stylesheet"` and calls it as a **string-returning** function at `:37`, `:45`, `:64-65`
and `:103`. W9.md :239-240 orders that function to *"join the `Result` idiom before it is exported"*,
and §File Bounds names seven `test/**` files — **this is not one of them**, and it is in no unit's
writable set. Ten tests fail; **none is a behaviour change** (the split-equivalence harness replays
the same assertions' subjects with 0 mismatches). **Cure, mechanical, one file:** repoint the import
to `"../src/css/serialize"` and unwrap the four call sites (`const text = serializeCssValue(v);
expect(text.ok && text.value).toBe(…)`). **Ask**: the orchestrator names its writer — naturally
**X-W9.f**, which already owes the same one-edit class at `test/v4-c1.test.ts`
(ESC-W9b-V4C1-SNAPSHOT) and `fixtures/public-types/value-v4.ts` (ESC-W9e-FIXTURE-V4TYPES). This is
the **third** instance of one wave-level omission: the cures were bounded, the artifacts that assert
on them were not.
**Riding relay (same edit class, measured here):** the +2 runtime names need **two edits each** in
`scripts/ci/verify-packed-surface.mjs` — an `expected` row and a `SMOKE` case — or the pre-tag
cadence reddens with `has no smoke case for: …`. ⟨cmd⟩ `grep -n 'isAnyColor\|serializeCssValue'
scripts/ci/verify-packed-surface.mjs` → **nothing**. `test/v4-c1.test.ts:540-560` pins both surfaces
by `Object.keys` and takes the same one edit.

**7.2 ESC-W9d-DTS-SPELLING — G13 and G14 have a root the gates' model does not name, and it is
outside this unit's bounds.** G14's falsifier reads *"Reach `color/model` from outside `src/color/`;
the duplicate declarations re-emit"*. The boundary is cured and the duplicates **did not follow**.
The experiment that settles it: `src/css/serialize.ts` imported `ColorIssue` from `"../color/index"`;
changing that ONE import to `"../color"` — **the same file, resolved identically, spelled
differently** — split the type in the emitted rollup:

```
export declare type ColorIssue = …
declare type ColorIssue_2 = …
export declare function serializeCssColor(color: CssColor): Result<string, ColorIssue>;
export declare function serializeCssValue(value: CssValue): Result<string, ColorIssue_2>;
```

The dts rollup (`vite-plugin-dts` `rollupTypes: true` → api-extractor) keys its entity cache on the
**import specifier string**, not the resolved file, for any type that arrives through a re-export
chain. The experiment was reverted in the same shell act; **no byte of it is committed**.
Consequence: `css.d.ts` carries two copies of the colour vocabulary — the exported one (entered by
`src/css/*`, spelled `"../color/index"`) and the `_2` one that rides in with `CssScalar`'s colour
payload from **`src/value.ts`**, spelled `"./color/index"` — a spelling **no module under
`src/css/` or `src/subpaths/` can reproduce**. The same mechanism silently drops the PSL-2
re-exports this seat wrote into `src/subpaths/{value,quantize,easing}.ts`: **three variants were
tried in this unit's own files** (`export type {…} from`, `import type` + `export type {…}`,
`export type * from`) and **all three left `value.d.ts` at 6 bare `declare`s**. They are kept because
they are correct TypeScript — the repo's own tests import those subpath modules by source — and the
receipt, not the code, carries the measurement.
**Candidate cure, NAMED and NOT performed** (one line each, in files outside every unit's set):
`src/value.ts` publishing its own colour vocabulary
(`export type { Alpha, AnyColor, Channel, ChannelsBySpace, Color, SpaceId } from "./color/index";`),
so the declaration arrives under that module's own spelling and `./css` can re-export it from
`"../value"`; likewise `src/quantize.ts` (`Color`, `Result`) and `src/easing.ts` (`Result`, plus
`PRESET_TABLE`'s leak at `src/easing.ts:15`, which `BezierPresetName = keyof typeof PRESET_TABLE`
forces into `easing.d.ts`). **The spelling rule is measured; the cure's effect is NOT** — whoever
holds those files must measure it rather than inherit this sentence. **Ask**: the orchestrator names
a writer for `src/value.ts` / `src/quantize.ts` / `src/easing.ts` (naturally **X-W9.f**, which
already writes `src/easing.ts` for the memoised `easing()` and `easingNames()`), or rules G13/G14
**staged per CC-096** with their measured remainder attributed here.

**7.3 ESC-W9d-ROOT-AND-SYNTAX — two rows whose files are in no unit's writable set.**
**(a) G12's LEG2** is the root specifier. `package.json` is **X-W9.f's** file, and the root's absence
is not an oversight: the probe's own header says *"declaring the root retired is a legitimate
GREEN"*, and **O-12 (SENT 2026-07-27)** told atlas in writing that *"the root stays retired, no shim
for any consumer"*, enumerating their 16 root-specifier statements. §Triumvirate Dispatch names
exactly this shape — *"G12 still RED after PSL-1 derivation lands — that means the exports map, not
the barrels, is the defect"* — and this seat supplies the evidence the ruling needs: **the barrels
are green (LEG1 `ok`), the exports map is RED, and the exports map's shape is a position already
delivered to the affected consumer.** **Ask**: rule LEG2 either (i) a defect X-W9.f cures by adding a
`"."` key to the map — which reverses O-12 and needs its own packet — or (ii) **declared-retired**,
in which case G12 reads GREEN-BY-POLICY on that leg and the probe's banked 4 becomes 2.
**(b) `isSupportedSyntaxDescriptor` `@internal`** (:242) is declared in **`src/css/syntax.ts`**,
which is absent from W9.md §File Bounds entirely — the same gap X-W9.a recorded for that file at
ESC-W9a-G3-LEG-SCOPE. Measured: it reaches **no** emitted `.d.ts` and **no** subpath, so the row's
*effect* already holds; only the JSDoc tag is unwritten. **No byte of `syntax.ts` was touched.**

#### 8. Residuals — booked so the close cannot discover them

1. **`./css` still withholds `serializeKeyframeSelector`** (`grammar.ts:429`, LIB-03's other leg).
   Not in this unit's named mechanism — PSL-2 names four value types and `ColorFactory`, and G15
   names `serializeCssValue` alone. `test/v4-c1.test.ts:9` deep-imports it today, so publishing it
   is a **surface decision** bound by X-W9.f's closed ship list, not an implementer's act.
2. **`AnyColor` is deliberately NOT re-exported from `./css`.** Measured both ways: exporting it
   adds a **sixth** duplicated declaration (`AnyColor_2`, 62 occurrences) without removing one bare
   `declare`, because the copy `CssScalar` actually references is `src/value.ts`'s. A `./css`
   consumer names the colour payload through `Color<S>`/`SpaceId` (both published) or through
   `./color`. Recorded so the choice is not read as an omission.
3. **`src/color/operations.ts` is in this unit's writable set and carries ZERO bytes of change** —
   deliberately: the spec keeps its relative `./model` import, because routing it through the barrel
   is the cycle LIB-04's own comment warns about.
4. **`src/css/rules.ts` is 519 lines**, the third-largest `src/**` file. It is one layer, not three,
   and the seam's own arithmetic put it there; a fourth product under `src/` is a §Triumvirate
   Dispatch trigger (*"adds a file under `src/` not named in §4"*), so it was not taken.
5. **`dist/subpaths/css.js` grew 44.24 kB → 45.14 kB** (+2.0%). Measured cause: `src/css/*` now
   reaches the colour barrel, so rollup keeps the barrel module in the css graph; the factories are
   the same objects the grammar already imported. No new runtime dependency crossed the boundary.
6. **The `:`/`;` collapse in `serializeCssValue` is now a documented behaviour with its witness**
   in-file. It was nearly deleted as a lossy rewrite; the `if()` round-trip is the only thing in the
   tree that says otherwise, and it is a test, not a comment.

#### 9. E13 mail — swept at this seat's own clock

⟨cmd⟩ `/usr/bin/find <the four coordination paths> -maxdepth 1 -name '*.md' -newermt '2026-09-18
21:10'` (2026-09-18 **21:48 EDT**) → `docs/tranches/V/coordination/INBOX.md` **alone** — self-excluded
per the SELF-COUNT law, and a sibling seat's row edit. ⟨cmd⟩ `grep -nE '\| *UNREAD' …/INBOX.md` →
**0 rows**. **0 new mail files · 0 UNREAD in this unit's scope.** Two standing rows touch this unit's
surface and both are answered above, by packet and not by edit: **O-11 §B** (`serializeCssValue`
published + the fork's retirement — §4 supplies the measured direction and the `if()` witness for
X-W9.i's packet) and **O-12** (the retired root — §7.3(a)). `INBOX.md` carries **no edit** from this
unit.

#### 10. Commits

| # | `tranche-u` | scope |
|---|---|---|
| 6 | **`c8848bed`** | `refactor(css/surface): PSL-1 derivation, colour boundary, stylesheet split` — 7 subpath barrels · `src/css/{index,types,grammar,stylesheet}.ts` · `src/css/{rules,serialize}.ts` (create) · `src/color/index.ts` · 8 evidence files |

ONE commit, as §Commit Plan row 6 requires: PSL-1, PSL-2, the colour boundary and the split are one
meaning and the cut must not publish a surface under repair. Pathspec on the commit itself
(`git commit … -- <the same exact paths>`), `--no-verify`, `Claude-Session` trailer.
⟨cmd⟩ `git diff --cached --name-only` after → **empty**; ⟨cmd⟩ `git status --porcelain` reproduces
the **same fifteen sibling rows** as at open, `scripts/dev/dev.sh` among them, never staged.

#### 11. Evidence

`docs/tranches/X/waves/evidence/W9/` — `split-equivalence.mjs` (the harness: pre-split vs post-split
bundles, plus G15's fork differential) · `split-equivalence.txt` (its double-run output) ·
`psl-seam.md` (the seam, the equivalence, G15's direction with its witness, the spelling-key finding,
and the two names this cut publishes) · `surface-census.after.json` (bare `declare` 33 → 20, `_2`
58 → 60, max src LoC 920 → 672, runtime exports 73 → 75, with every command recorded) ·
`consumer-surface-compile.{before,after-d}.txt` · `library-band-gates.{before-d,after-d}.txt` (both
probe pairs double-run, `diff -q` silent).

---

### X-W9.g

SERVED MODEL: `claude-opus-5[1m]` · Canon-truth diff and the parse-that reconciliation

**Integrated main**, no worktree (§Worktree Plan — `.g` is docs-only). Substrate at open:
`tranche-u` @ **`4147e478`**. Sections executed: §Agent Units `X.W9.g` (`:286-298`) · §Hard Gate
**G30, G31** (`:372-373`) · §Commit Plan **row 10** (`:464`) · §Disjointness cross-wave
`ARCHITECTURE.md` (`:138-141`) · COHESION **§0i.1** (S-4 disposition **C**).
**Commit: `0e37318e`** — the wave's only `.g` commit. Evidence:
`docs/tranches/X/waves/evidence/W9/canon-parse-that.g.md`.

#### Act 0 — CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → 16 rows. **Not one is inside this unit's writable set**
(`docs/tranches/V/ARCHITECTURE.md` clean · `docs/tranches/X/waves/evidence/W9/**` holds only `.a`–`.e`'s
committed artefacts, no uncommitted file · `docs/tranches/X/execution/A/X-W9.md` clean). **Nothing
inherited; nothing stashed; nothing restored.** The dirty rows are the same sibling-seat set seat 0
enumerated (`demo/palettes/**`, `ConsoleRail.vue`, `CARRY-LEDGER.md`, `dev.sh`, X-W1's untracked
specs); all left untouched, and re-measured identical after this unit's commit.

#### Act 1 — the §4a lock, re-read immediately before writing

⟨cmd⟩ `sed -n '38p' docs/tranches/X/execution/LEDGER.md` →
`| X-W8 | W4·W5·W6·W7 | planned | | 5 serial Opus; LAST of the demo waves |` — **not OPEN**, so the
spec's own alternative applies (*"or runs while X-W8 is not open"*). Re-read a second time in the
same command as the commit, immediately before `git add`: **still `planned`**. `:943-945` was never
opened for writing.

#### Act 2 — measure before editing

| anchor (spec) | measured at true bytes | verdict |
|---|---|---|
| `ARCHITECTURE.md:657` cites three `src/parsing/**` paths | **1 hit, exactly at `:657`**, all three paths present | **ANCHOR TRUE** |
| `src/parsing/` absent | ⟨`ls -d src/parsing`⟩ → *No such file or directory* | **TRUE** |
| zero `.bbnf` files | ⟨`find . -name '*.bbnf' -not -path './node_modules/*' \| wc -l`⟩ → **0** | **TRUE** |
| the CSS parser is `src/css/grammar.ts` | present; beside it X-W9.d's landed split products `rules.ts` · `serialize.ts` | **TRUE, widened** |
| G31's dependency set | ⟨`node -e`⟩ → `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`, `@mkbabb/parse-that` in **neither** `dependencies` nor `devDependencies` (double-run identical) | **ANCHOR TRUE** |

**Two findings the spec's sentence did not anticipate, measured, not assumed:**

1. **"Exactly four text-only helpers" is three.** `serializeStylesheetItem`, `reverseAnimationShorthand`
   and `reverseCSSTime` each carry exactly **1** `export const` definition in
   `../keyframes.js/src/animation/compile/emit/css-text.ts`; ⟨`grep -rn '…' src/ | wc -l`⟩ → **0**
   (double-run **0**), so value keeps no implementation, export or forwarding export. **`formatCSS`
   resolves as a bare name in neither tree** — ⟨`grep -rn 'formatCSS\b' ../keyframes.js/src | grep -v
   formatCSSKeyframeString`⟩ → **no output**; the nearest surviving Keyframes symbol is
   `formatCSSKeyframeString` in `compile/emit/format/format.ts`. The transposition the paragraph wrote
   in future tense **had already happened**; what was false was the three value-side source paths and
   the count.
2. **The rest of `:657` is true and was preserved verbatim.** Eight names of the "not 4.0 exports"
   roster spot-checked against the built `dist/subpaths/*.d.ts` → **0 hits each**
   (`serializeStylesheet`, `serializeDeclaration`, `stylesheetToString`, `parseCSSPercent`,
   `evaluateMathFunction`, `CSS_WIDE_KEYWORDS`, `CSSParseError`, `registerColorNames`). Canon that
   holds is not rewritten by a canon-truth unit.

#### Act 3 — the carve, at ZERO LINE DELTA (the load-bearing decision)

**X-W8's spec cites this file by line**: ⟨`grep -rn 'ARCHITECTURE.md:944' docs/tranches/X/`⟩ →
`docs/tranches/X/waves/W8.md:373` — *"Exactly one of: (i) `docs/tranches/V/ARCHITECTURE.md:944`'s cap
sentence deleted…"*. `W8.md` is IMMUTABLE (E-3) and outside this unit's bounds, so a carve that grew
the file would silently drift a live sibling's only coordinate — and would falsify this wave's own
Do-NOT-touch citation `ARCHITECTURE.md:943-945`, manufacturing precisely the class G30 convicts.
**The carve is therefore line-count-neutral**: line `:657` is rewritten in place, as one paragraph,
in the file's own long-line idiom (union repair round 1's *"zero-line-delta … no sibling coordinate
displaced"* is the standing precedent).

⟨cmd⟩ `wc -l docs/tranches/V/ARCHITECTURE.md` → **975** before, **975** after.
⟨cmd⟩ `git diff --numstat` → **`1 1 docs/tranches/V/ARCHITECTURE.md`**.
⟨cmd⟩ `git diff -U0 | grep '^@@'` → **`@@ -657 +657 @@`** — one hunk, one line.
⟨cmd⟩ `sed -n '943,945p'` → the cap sentence, **byte-identical and still at `:943-945`**.

What the line now says: (a) the transposition recorded as **done and measured done**, three helpers
named at their single Keyframes home, `formatCSS`'s non-resolution stated, **no value-side path cited
because none exists**; (b) the "not 4.0 exports" roster preserved verbatim; (c) the parse-that
position appended as the paragraph's close — the paragraph already ended on *"parse-that utilities …
are not 4.0 exports"*, so the record sits where the subject already was.

#### Act 4 — the parse-that position, every clause sourced

| clause recorded | where it was read |
|---|---|
| `PAUSED_RESEARCH / TERMINAL_SOURCE_RED / NO_ACTIVE_WRITER` | the `Status:` line of `docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` — **in-repo and `git ls-files`-TRACKED** (the `../parse-that/coordination/` path M-22 names does **not** resolve; the tracked mirror is the citable authority, and is what the paragraph cites) |
| original root idle | ⟨`git -C ../parse-that log -1`⟩ → **`ef10d5b` 2026-07-05** (double-run identical) |
| fresh writer root + fresh-root law | `CONSTELLATION-COMMISSION-2026-08-03.md` §2's parse-that block (**M-22**), quoted: *"a **FRESH, non-overlapping writer root** (fresh-root law; frozen/preserved roots untouched forever)"* — cited by §-heading + block name, **no line numeral** (§0g.2's standing rule) |
| that root is live | ⟨`git -C ../parse-that-css-totality-p2 log -1`⟩ → **`b10f62e` 2026-09-18** (double-run identical) |
| `≥10×` **retired as law** | M-22 §2 · `parse-that/evidence/W1/BAR-LEDGER-2026-09-17.md` §2.4 row `historical 10×` |
| the portfolio | same §2.4 — strict-3× · strict-2× · measured break-even |
| **no bar is ratified** | same §2.4 `bar` cells → `OWNER-GATED-PENDING-RATIFICATION` ×3; COHESION **§0j.E OC-1** — *"the bench table is RECORDED-NOT-GATING"*, admission on **correctness** |
| **no adoption** | COHESION **§0i.1** — disposition **C**, `BLOCKED-ON` the parser proof gate reading GREEN, re-trigger = X.P.W4's RC-P evaluator TRUE at a dated run; **A** is what fires then |

**Arithmetic recomputed, never remembered** (`budget = 1,636,680 ÷ k`, native floor `311,883 µs`):
`k=10` → **163,668 µs**, floor/budget **1.906×** → RETIRED AS LAW; `k=3` → **545,560 µs**;
`k=2` → **818,340 µs**; `k=1` → **1,636,680 µs**. **`1,870,633 µs` is not published here** —
`P4-EVIDENCE-REPLAY.json` measured absent at this wave's open, so it and its 311,661 / 623,434
headrooms stay uncitable (G28 / CC-097).

**One spec-sentence correction recorded, not silently applied.** The unit brief says the replacement
portfolio is *"governing"*. At true bytes it governs the **denominator every budget restates
against** and governs **no admission verdict**: all three bars are unratified and §0j.E OC-1 (ruled
2026-09-17, *after* this spec was authored 2026-08-03) makes the bench table RECORDED-NOT-GATING.
The recorded paragraph states exactly that and says in terms that no performance sentence in
`ARCHITECTURE.md` may be read as a bar. This is INTENT honoured at the true bytes, not a substitution.

#### Act 5 — gates, BEFORE → AFTER (each double-run, read from the settled bytes post-commit)

| gate | command | BEFORE | AFTER |
|---|---|---|---|
| **G30** | `grep -rn 'src/parsing' docs/tranches/V/ARCHITECTURE.md` | **RED** — 1 hit at `:657` (three dead paths) | **GREEN** — exit 1 / `grep -c` → **0**, **0** |
| **G31** | `node -e` on `package.json` dependencies + the recorded paragraph | **RED** — manifest as banked, **no paragraph records it** | **GREEN** — paragraph exists and quotes the manifest exactly (⟨`grep -c '{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}'`⟩ → **1**); ⟨`git diff --stat -- package.json package-lock.json src/`⟩ → **empty** (no parser adopted) |

**Cadence (§Format And Lint Cadence, docs-only leg):** ⟨`git diff --check`⟩ → exit **0**. **No
formatter is configured for `docs/**` and none was introduced.** No `npm run lint/typecheck/test` is
owed by a docs-only unit and none was run — this unit moved zero product bytes.

**E13:** delta sweep at this seat's own clock over the four paths since seat 0's 20:03 →
`docs/tranches/V/coordination/INBOX.md` alone (**self-excluded**, SELF-COUNT law; a sibling seat's
appended sweep line). **0 new packets · 0 UNREAD in this unit's scope.** The standing parse-that row
**O-15** (the 1.1.0 evidence packet) is outbound, ROWED, and is **X-W9.i's** business, not this
unit's — `.i` owes the parse-that packet (PT-01/03/04/07); `.g` records the position only.

#### Residuals and escalations

- **Escalations: none.** The specified cure was possible at the bytes and was executed as specified.
- **Residual (informational, for the close seat and for X-W8's seat):** `W8.md:373`'s
  `ARCHITECTURE.md:944` coordinate **still resolves** — this unit deliberately took zero line delta
  to keep it true. Any later writer of `:657` who grows the file displaces it; the durable cure is
  X-W8's own, to re-anchor by sentence (§0g.2's standing rule), and it is **not** authored here.
- **Residual (INFO):** the pause-handoff path M-22 names (`../parse-that/coordination/…`) does not
  resolve in the sibling tree; the tracked in-repo mirror does, and is what the record cites. No
  sibling byte was touched to establish this (peer trees READ-ONLY).
- **Bounds:** writes confined to `docs/tranches/V/ARCHITECTURE.md` (`:657` only),
  `docs/tranches/X/waves/evidence/W9/canon-parse-that.g.md`, and this receipt. `:943-945` untouched.
  `scripts/dev/dev.sh` never staged. Pathspec on the commit itself; no sibling path entered it
  (⟨`git show --stat HEAD`⟩ → exactly 2 files).

---

### X-W9.i

SERVED MODEL: `claude-opus-5[1m]` · Coordination packets
(W9.md §Agent Units `X.W9.i` :314-334 · §Hard Gate **G33** :375 · §Commit Plan row 12 :466 ·
runbook §5.3 E13 · §Disjointness free lane :129-130, group 4 beside `.g`).
**Status: DONE in bounds** — **G33 GREEN on its three readable legs** (five packets · five ledger
rows · the exact pin acknowledged before the tag), its fourth leg **UNREADABLE BEFORE THE WINDOW by
the gate's own construction**, with its pre-window reading banked. Ran on integrated main
(`tranche-u`), docs-only; **no peer-repo byte written in any tree** (RD-11). Every figure read from
the settled bytes and **double-run**.

#### 0. CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → **16 rows**. ⟨cmd⟩ `git status --porcelain -- docs/tranches/V/coordination
docs/tranches/X/waves/evidence/W9 docs/tranches/X/execution/A/X-W9.md` → **empty**. **No killed
predecessor's partial work on X-W9.i exists; nothing inherited, nothing stashed, nothing restored.**
`scripts/dev/dev.sh` never touched and never staged; the ten dirty `demo/**` rows (X-W4 / X-W7
seats), `CARRY-LEDGER.md` and the untracked X-W1/X-KF paths never touched. The same rows reproduce
after this unit's commits, `dev.sh` among them.

#### 1. Anchors verified at TRUE bytes before any write — six drifts, recorded

| spec / source anchor | measured 2026-09-18 | verdict |
|---|---|---|
| keyframes' exact pin *"`../keyframes.js/package.json:69` reads `"4.0.0"`"* (:333) | ⟨cmd⟩ `sed -n '71p'` → `        "@mkbabb/value.js": "4.0.0"` | **DRIFTED `:69`→`:71`, string identical** — INTENT at the true bytes; both cited in the packet |
| `resolve/browser.ts:165` (:320) | **`:164`** — `requireParsed(parseCssScalar(source), unresolvable)` | **DRIFTED by one line** |
| `engine/options.ts:31` (:320) | `:31` — `orFallback(parseCssScalar(raw), undefined)` | **EXACT** |
| `compile/value-ast.ts:71` (:321) | **file deleted** by their split `eb4379ca`; `parseCssValues` now at `compile/value/compile.ts:33` (`requireParsed`) and `engine/composition.ts:203` (`swallowParsed`) | **DRIFTED — successor sites given verdicts individually** |
| the fork `compile/emit/css-text.ts:41` (:321) | **`:42`** — `export const serializeCssValue = (value: CssValue): string =>` | **DRIFTED by one line** |
| fourier `counts.fourier.http` *"= 30 at HEAD"* (:327) | ⟨cmd⟩ at F HEAD `0a16b83` → **30** (`contours 4 · equations 2 · images 7 · sessions 4 · visualizations 13`) | **EXACT — the bank did NOT fire** |
| atlas *"16 root-specifier statements, 4 absent symbols"* (:325) | ⟨cmd⟩ at atlas `1e2b911` → **16**; the four absent from every built `.d.ts` | **EXACT** |

A seventh drift was measured **for another unit and recorded rather than acted on**: the atlas
evidence tuple `keyframes backward-color.ts:171/:250/:263 count=1024` (W9.md :269, **X-W9.f's `G21`**)
no longer resolves — their carve moved it to `compile/emit/backward/color.ts`, where the 1024-sample
ramp is at **`:263`** (`sampleRamp(fromColor, toColor_, 1024, space, hueOpt.hueMethod)`) with
`backward.ts:33` describing it. Booked in the evidence file §4 so `.f` re-measures rather than
inherits a dead coordinate.

#### 2. E13 Step-0 — the seven-path sweep at this seat's own clock (22:0x EDT)

Four landing paths ⊕ the atlas **P**-lane ⊕ the Track-C fourier mail-ledger surface (§0k.1) ⊕
`../keyframes-v-exec/…/coordination`. Classification from **each row's own Status cell**, never a
bare `grep -i unread` (D-1); `INBOX.md` **self-excluded**. Delta ⟨cmd⟩ `/usr/bin/find <seven paths>
-maxdepth 1 -name '*.md' -newermt '2026-09-18 21:10'` → `docs/tranches/V/ARCHITECTURE.md` (X-W9.g's
carve, canon not mail) and `INBOX.md` (self-excluded). ⟨cmd⟩ `grep -cE '\| *UNREAD' …/INBOX.md` →
**0**. **0 unrowed · 0 `I-n` minted · 0 UNREAD in this unit's scope** — I-32 / I-33 / I-34 reproduce
and route by their own Routing cells to X-W0.j / the formation mail seat / X-EXT-1..6; I-35 mints no
obligation. The two standing rows this unit's content consumes — **O-11** (widened R1 + K1–K4) and
**O-12** (the export delta) — were read whole and answered by packet, never re-derived.

#### 3. The five packets — what each one had to MEASURE rather than inherit

| row | file (all `docs/tranches/V/coordination/`) | the thing it could not have inherited |
|---|---|---|
| **O-34** | `keyframes-inbox-2026-09-18-value-4.1-cut-notice.md` (283 L) | **the 8 restored analytic arms are all `bezierPresets` keys**, so all 8 are entries of their 40-name `timingFunctionEntries` — a consequence O-11 did not carry; **the `lerpArray` ask INVERTS** (their `physics/numeric.ts:193` grow-never-shrink `_out` trips our new `RangeError`; cure `this._out.subarray(0, n)`); and `parse-facade.ts:33-38`'s *"ABSORB IS UNREACHABLE ON THE R1 CLASS"* goes **false** at the bump |
| **O-35** | `atlas-inbox-2026-09-18-value-4.1-export-delta-refresh.md` (153 L) | a **crosswalk** for the four absent symbols (`TimingFunction`→`EasingFunction`; `CSSCubicBezier`→`CubicBezier`, renamed **and** `Result`-shaped; `srgbToOKLab`→`convertColor`; `oklabToRgb255`→`toRgba8`), read from their 3.1.0 `.d.ts` on one side and ours on the other; and **a second exact-pin consumer** (`sci-report/dashboards/package.json:20` `"4.0.0"`) whose six statements survive 4.1 unchanged |
| **O-36** | `glassui-inbox-2026-09-18-value-4.1-r1-relay.md` (132 L) | that the R1 throw **bypassed their own error boundary** — `composables/color/value.ts:42`'s `if (!parsed.ok)` could never see it — reached from `cssToOklch` at four consumer-string entry points; and that **their picker does not move at 4.1** (⟨cmd⟩ `grep -rn "= easing(" src/` → **0**) |
| **O-37** | `fourier-inbox-2026-09-18-value-4.1-facility19-delta.md` (152 L) | that our `<1e-3` acceptance target **cannot certify their ESC-4 Δ = 0 gate**, so MPC-5's own sampler is named as the instrument instead of a guarantee being sold; plus the `http` bank re-run (**30**, not fired) |
| **O-38** | `parse-that-inbox-2026-09-18-value-4.1-evidence-addendum-2.md` (133 L) | PT-01/PT-03 re-read at the **published 1.0.0** byte coordinates, PT-07 re-run **5/5**, and PT-04's ceiling **carried, not re-run**, because this seat's re-construction did not match the original instrument |

Byte counts and sha256s: `docs/tranches/X/waves/evidence/W9/packets/PACKETS-2026-09-18.md` §1.
Line 1 of every packet is `SERVED MODEL: claude-opus-5[1m]`.

#### 4. Gate reading, BEFORE → AFTER, double-run

| gate | leg | BEFORE (wave open) | AFTER | verdict |
|---|---|---|---|---|
| **G33** | five packets | ⟨cmd⟩ `ls …/*-inbox-2026-09-1*.md` → **no matches / 0** | ⟨cmd⟩ `ls …/*-inbox-2026-09-18-*.md \| wc -l` → **5** (×2) | **GREEN** |
| **G33** | five `INBOX.md` rows | 0 | ⟨cmd⟩ `grep -c '^\| O-3[4-8] \|'` → **5** (×2) | **GREEN** |
| **G33** | the exact pin acknowledged **before the tag** | pin `"4.0.0"`, zero packets | pin `"4.0.0"` at `:71`, quoted in O-34 §E1 with its drift; ⟨cmd⟩ `node -p "require('./package.json').version"` → **`4.0.0`** — **the tag is NOT cut** | **GREEN** |
| **G33** | post-window `npm ls` in keyframes and fourier | **MEASURE-AT-OPEN** (*"it can only be read after the window"*) | **UNREADABLE BEFORE THE WINDOW.** Pre-window bank taken: kf → `@mkbabb/value.js@4.0.0` (direct **and** deduped under glass 7.0.0); fourier `web` → `4.0.0` deduped under glass 8.0.0 **and** keyframes 6.0.0 | **CARRIED, by the gate's own construction — not asserted GREEN** |

#### 5. Escalations

**None raised.** The specified mechanism was executable exactly as written at the true bytes; every
drift was an anchor, not an impossibility, and each was recorded with its INTENT (§1). No
substitution, no workaround, no masking fallback, no peer-repo edit.

One thing is handed to the wave rather than escalated, because it is another unit's gate and not a
blocker: **X-W9.f's `G21` atlas evidence tuple coordinate is dead** (§1's seventh row) — `.f`
re-measures at `compile/emit/backward/color.ts:263`.

#### 6. Residuals — booked so the close cannot discover them

1. **"SENT" here means AUTHORED + ROWED, and the letters have not been copied into the peer trees.**
   RD-11 and this unit's writable set forbid a peer-repo byte, and E13's own law makes the ledger row
   the durable mark (D37 — *a letter counts only once rowed here*). Each packet says so in its own
   §Standing and names the hand that carries the copy: **KF-WRITE** (COHESION §0j.C) for keyframes,
   the constellation mail seat for glass-ui/atlas/fourier, the O-15 thread for parse-that. **Booked
   as a residual, not as a discharge**: if the close reads G33's *"sent"* as *"landed in the
   counterparty's tree"*, that is a wave-level adjudication and the letters are ready to be copied
   verbatim by a seat that holds those bounds.
2. **The packets describe a surface that is landed but not tagged.** `package.json` reads `4.0.0`;
   SCI-1, `toHex`, `easingNames()`, the memoised `easing()` and the restored arms are **X-W9.f's**.
   Every packet states this in its own words rather than writing the future tense as fact; a reader
   who takes a 4.1 sentence as shipped today would be reading against the letters' own §Standing.
3. **The keyframes packet asks one question that only an adjudication can answer** — whether
   `lerpArray`'s `out` contract relaxes to `length >= n`. It is put to them as a question **before**
   the tag precisely so the ruling has both ends' evidence; this unit took no position on it beyond
   naming `src/foundation/math.ts:58`'s own sentence (E-3).
4. **PT-04's ceiling is the one carried figure in the five packets**, and it is marked as carried in
   the letter, in the ledger row and in the evidence file. Nothing else left this tree unmeasured.
5. **Two letters were rowed by a sibling seat between this unit's read and its edit** (X.F.W4 `.z`
   took O-32/O-33 at 22:0x), which is why these five are **O-34..O-38**. `INBOX.md` was re-read
   immediately before the edit, as the standing law requires, and the rows were **appended** — no
   other seat's row was rewritten.

#### 7. Commits

| # | `tranche-u` | scope |
|---|---|---|
| 12 | **`8f0a0e79`** | `docs(X·mail): the five 4.1 coordination packets` — the five packets + the five `INBOX.md` rows + the E13 sweep line + `evidence/W9/packets/PACKETS-2026-09-18.md`, **ONE commit** as §Commit Plan row 12 and the LOCKS require (the family may not split, and it lands **before** `.f`'s tag) |
| 13 | see below | this receipt (`docs/tranches/X/execution/A/X-W9.md`), its own pathspec commit |

⟨cmd⟩ `git show --stat 8f0a0e79` → exactly **7 files, 978 insertions**, no sibling path.
Pathspec on the commit itself (`git commit … -- <the same exact paths>`), `--no-verify`,
`Claude-Session` trailer. ⟨cmd⟩ `git diff --cached --name-only` after → **empty**; ⟨cmd⟩
`git status --porcelain` reproduces the same sibling rows as at open, `scripts/dev/dev.sh` among
them, never staged.

#### 8. Evidence

`docs/tranches/X/waves/evidence/W9/packets/PACKETS-2026-09-18.md` — the five paths with line/byte
counts and sha256s, G33's four legs each measured, the pre-window `npm ls` bank, the full table of
every figure the packets publish with the command that produced it, the seven anchor drifts, and the
per-tree `git status --porcelain` readings that witness RD-11.

---

### X-W9.h

SERVED MODEL: `claude-opus-5[1m]` · RESUME ROUND 2, dispatched under `ESC-W9R1-SEQUENCING`
(COHESION §0ac) once X-W4 closed. Spec: §Agent Units `X.W9.h` W9.md:300-312 · G32 W9.md:374 ·
§Commit Plan row 11 W9.md:465 · §Disjointness §4a W9.md:142-146 · §Worktree Plan W9.md:170.

#### 1. The §4a precondition, re-read first

FIRST ACT, before any byte: ⟨cmd⟩ `grep -n '^| X-W4 ' docs/tranches/X/execution/LEDGER.md` →
`33:| X-W4 | X-W0 | **CLOSED 2026-09-17** — promoted at **CHECK 2** …`. The gate that held this
unit through the close, Check 1–3, Repair 1–2 and Resume 1 is **DISCHARGED**: §Disjointness'
*"X-W9.h sequences after X-W4 closes"* is satisfied on its first disjunct. X-W4's carve is landed
and committed — ⟨cmd⟩ `git status --porcelain -- demo/picker/controls/ComponentSliders/ConsoleRail.vue`
→ **empty** — so the file is no longer dirty with a live sibling's work, which is the condition
Repair 2 §R2 recorded as blocking (`X-W9.md:2835`).

CRASH-RECOVERY sweep, before any other act: ⟨cmd⟩ `git status --porcelain` in
`/Users/mkbabb/Programming/value.js` → 17 modified + 9 untracked paths, **none inside this unit's
writable set** (`demo/color-session/colorSpaceInfo.ts`, `ConsoleRail.vue`,
`docs/tranches/X/waves/evidence/W9/**`, `docs/tranches/X/execution/A/X-W9.md`). **Nothing inherited;
nothing stashed; nothing restored.** The dirty rows belong to sibling seats (`demo/shell/*`,
`e2e/smoke/*`, `docs/tranches/X/parse-that/**`, `X-W5.md`, `KF-W13.md`) and `scripts/dev/dev.sh`,
which is never touched.

Worktree per §Worktree Plan: ⟨cmd⟩ `git worktree add /Users/mkbabb/Programming/value.js-x-w9-h
tranche-u --detach` → `HEAD is now at f866de45`. `node_modules` symlinked to the primary's;
`dist/` is worktree-local, which is the isolation the plan names (`npm run typecheck` resolves
`@mkbabb/value.js/*` → `./dist/*.d.ts` per `tsconfig.demo.json`, so two seats sharing one `dist/`
would measure each other).

E13 sweep: ⟨cmd⟩ `grep -cE '\|\s*\**UNREAD\**\s*(\||$)' docs/tranches/V/coordination/INBOX.md` →
**0**. No mail addressed to this unit's scope; no UNREAD row anywhere in the ledger.

#### 2. Anchors measured at true bytes

| spec anchor | measured | verdict |
|---|---|---|
| `ConsoleRail.vue:172-180` — `componentDescription()` prefix `find` | `:172` `function componentDescription(`, `:176-179` the `find` with `c.startsWith(upper) \|\| c.startsWith(component)`, `:180` `return match ?? component;` | **EXACT**, no drift |
| `ChannelsBySpace` publishes `ictcp: [i, ct, cp]` / `jzazbz: [jz, az, bz]` | `src/color/model.ts:10-28`, tuple labels verbatim | **EXACT** |
| `SpaceId` = 17 spaces | `src/color/model.ts:4-7` → 17 | **EXACT** |
| descriptor table covers those 17 | `demo/color-session/colorSpaceInfo.ts` carried **13** rows — 12 `SpaceId`s + `hex`; `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020` **ABSENT** | **DRIFT — recorded, cured below** |

The fourth row is the one the spec's Mechanism sentence does not name and G32's command does:
the gate runs *"over all 17 spaces × their `ChannelsBySpace` ids"* and its falsifier is *"add a
space to the table without descriptors for every id"*. Five offered spaces had no row at all, so
their channels printed bare keys — the same degradation class as `jz`, fifteen pairs wide. The
unit's Goal is *"every channel of every space resolves to exactly its own description"*; a re-key
alone leaves it false for 15 of 49 pairs. Recorded as INTENT at the true bytes and cured.

#### 3. The cure

**`demo/color-session/colorSpaceInfo.ts`** — the descriptor tables are re-keyed by the library's
exact channel ids (`{ i: "Intensity (I)", ct: "Ct (tritan)", cp: "Cp (protan)" }`,
`{ jz: "Lightness (Jz)", az: "az (red-green)", bz: "bz (yellow-blue)" }`, and so through all 18
display spaces). **No new library export**: the vocabulary stays `ChannelsBySpace`'s, spelled by
the consumer, per W9.md:309.

Space totality is made **structural** rather than gated: the annotation is
`Readonly<Record<DisplayColorSpace, ChannelDescriptors>>`, so a space the product offers without a
descriptor row is now a COMPILE ERROR. That is the X-W6 `space-catalog.ts` idiom (L-8, structure
over gates) applied to the table that X-W6 did not reach. Id exactness cannot be made structural —
TypeScript tuple element labels are syntax, not types — so it is measured by G32's probe instead,
and the docstring says so rather than implying the compiler checks it.

**`demo/picker/controls/ComponentSliders/ConsoleRail.vue:172-180`** — the carve, and only the
carve. Ten lines become four:

```ts
function componentDescription(component: string): string {
    const space = currentColorSpace.value as DisplayColorSpace;
    return colorSpaceInfo[space].components[component] ?? component;
}
```

The prefix `find` is deleted, and with it the `(colorSpaceInfo as any)` cast and the
`if (!info?.components) return component` guard, which the total record makes unreachable. The
`as DisplayColorSpace` cast at `:173` is **kept**: it is a sound widening (`currentColorSpace` is
`ComputedRef<PickerSpace>` and `PickerSpace = SpaceId ⊂ DisplayColorSpace`), and it is the only
use of the `DisplayColorSpace` import at `:100` — dropping it would orphan an import outside the
`:172-180` bound. `?? component` is preserved, not as a fallback but as the honest answer for
`"alpha"`, which is not a `ChannelsBySpace` id and resolved to `"alpha"` before this unit too.

**Touched no focus, pointer, template or roving-tabindex surface.** ⟨cmd⟩ `git show --stat 95792b44`
→ `ConsoleRail.vue | 8 +-`; the diff is `componentDescription()`'s body alone. X-W4's landed carve
(`railTabIndex`, `onRailKeydown`, `railItemEls`, the template) is byte-untouched.

#### 3a. Why the file's prose fields left with the re-key — measured, not assumed

Making the table total demanded five more rows. Copying them whole from `space-catalog.ts` would
have taken `colorSpaceInfo.ts` from 334 to ≈459 lines, **past the canon cap** — ⟨cmd⟩
`grep -n '400' docs/tranches/V/ARCHITECTURE.md` → `:944` *"`demo/` file … stays ≤ 400 LoC"* — and
would have deepened a duplication instead of curing one. So the file was measured before anything
was added:

- ⟨cmd⟩ `grep -rn "colorSpaceInfo" --include='*.ts' --include='*.vue' --include='*.js'
  --include='*.mjs' --include='*.json' .` (node_modules and `docs/` excluded) → **one runtime
  consumer**, `ConsoleRail.vue:99`, which reads **`components` only**; the sole other hit is a
  prose comment at `demo/picker/index.ts:2`.
- ⟨cmd⟩ node census of every field value against `space-catalog.ts`'s bytes → `colorSpaceInfo rows:
  13 · field values checked: 358 · values NOT present verbatim in space-catalog.ts: **0**`.

X-W6 (`e0e204a9`, 2026-09-19, X:CSS-1) made `SPACE_CATALOG` the one total record over
`DisplayColorSpace` and moved `ColorNutritionLabel.vue` onto it. That left this module's
`name`/`definition`/`whitePoint`/`gamut`/`applications`/… fields with **zero readers** and a
docstring still claiming the nutrition label read them — a canon-truth defect of exactly G30's
class, inside this wave's own file bounds. Of the 358 values, **37 are the descriptors** this unit
re-keys and **321 are the dead prose**: the 321 are therefore **retired, not duplicated a second
time**. The facts keep one home (`space-catalog.ts`), this module keeps the one field its one
consumer reads, and the five missing spaces cost five short rows instead of 125 duplicated lines. ⟨cmd⟩ `wc -l demo/color-session/colorSpaceInfo.ts` → **334 → 124**; `ConsoleRail.vue`
**354 → 348**; both well inside the ≤400 cap.

**Stated plainly for adjudication**: the re-key and the `find` deletion are the spec's Mechanism
verbatim. The five added rows are required by **G32's own command and falsifier**, and the 358
retired values are the lawful way to add them under the ≤400 cap without minting a second
authority — the very shape W9.md:309 forbids. Nothing was invented: every surviving descriptor
string is the prose the tree already carried. If the adjudicator reads the deletion as out of
scope, the re-key and the carve stand on their own and only §3a reverts.

#### 4. G32 — BEFORE → AFTER

Command of record, committed with this unit:
⟨cmd⟩ `node docs/tranches/X/waves/evidence/W9/g32-channel-descriptors.mjs`

The probe reads three live surfaces and restates none: the ids are parsed out of
`ChannelsBySpace`'s own bytes, the table is loaded from `colorSpaceInfo.ts`, and
**`componentDescription()` is lifted out of `ConsoleRail.vue`'s own bytes and executed** — so the
gate measures the resolver the product ships, not a copy of it. Three legs: **L1 KEYED** (the
space's table is keyed by exactly the library's ids), **L2 EXACT** (the resolver returns that
table's entry for that id), **L3 HONEST** (non-empty string, not the bare id, unique within its
space).

| reading | spaces | pairs | failures | `ictcp.cp` | `jzazbz.jz` | exit |
|---|---|---|---|---|---|---|
| **BEFORE** (pre-cure blobs of `f866de45`, scratch tree, double-run, byte-identical) | 17 | 49 | **35** | `"Ct (tritan)"` — **ct's row** | `"jz"` — **bare key** | **1** |
| **AFTER** (worktree `value.js-x-w9-h` @ `4c306e12`, double-run) | 17 | 49 | **0** | `"Cp (protan)"` | `"Lightness (Jz)"` | **0** |
| **AFTER** (integrated `tranche-u` @ `e5d8f196`, double-run) | 17 | 49 | **0** | `"Cp (protan)"` | `"Lightness (Jz)"` | **0** |

The BEFORE reading was **re-taken from settled bytes** (`git show f866de45:<path>` into a scratch
tree) rather than trusted from the pre-edit worktree, and run twice — ⟨cmd⟩ `diff -q r1.txt r2.txt`
→ identical. Its 35 failures decompose as: **17 L1** (12 spaces UNKEYED positional + 5 ABSENT),
**18 L3** — `ictcp.cp` resolving to `ct`'s row, `jzazbz.jz` and `kelvin.kelvin` degrading to their
bare keys, and the **15** wide-gamut pairs (`srgb-linear`/`display-p3`/`a98-rgb`/`prophoto-rgb`/
`rec2020` × r,g,b) printing bare keys. **Both named RED witnesses reproduced exactly** as
W9.md:374 banked them, at this seat's own command.

`kelvin.kelvin` is a third defect the gate surfaced and the cure kills: its id equals its own key,
so the prefix `find` matched `"Temperature (K)"` against neither `"K"` nor `"kelvin"` and the
tooltip read `"kelvin"`. It now reads `"Temperature (K)"`.

Both files land in **ONE commit** per §Commit Plan row 11's no-split lock. Evidence rides a second
commit, one meaning each.

**G32 GREEN.** No gate RED. Nothing inherited, nothing deferred.

#### 5. Verification cadence

| check | command | reading |
|---|---|---|
| lint | ⟨cmd⟩ `npx eslint demo/color-session/colorSpaceInfo.ts demo/picker/controls/ComponentSliders/ConsoleRail.vue --max-warnings=0` | **exit 0**, no output |
| build | ⟨cmd⟩ `npm run build` (worktree `dist/`) | **exit 0** |
| typecheck (demo program — the one this change is in) | ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` | **exit 0** |

All three were run in the **isolated worktree on a clean tree**, which is the lawful reading: the
primary carries four sibling seats' uncommitted work (`demo/shell/*`, `demo/color-picker/App.vue`,
`e2e/smoke/*`, …), so a typecheck there would measure their bytes, not this unit's. The integrated
blobs are **byte-identical** to the measured ones — ⟨cmd⟩ `git rev-parse 4c306e12:<path>` vs
`95792b44:<path>` → `93ea4495…` and `c5c2ba6f…` on both sides.

`npm test` was not run: this unit touches no `src/**` and no test file, and vitest's suite does not
cover `demo/`. G32 is this unit's gate and it is executed, double-run, on both trees.

#### 6. Commits

| # | tree | sha | meaning | paths |
|---|---|---|---|---|
| 1 | worktree | `4c306e12` | the cure | 2 |
| 2 | worktree | `bcfdb0d0` | the evidence | 3 |
| 3 | **`tranche-u`** | **`95792b44`** | `fix(demo/console-rail): exact channel-id descriptor lookup` (§Commit Plan row 11) | `demo/color-session/colorSpaceInfo.ts` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` |
| 4 | **`tranche-u`** | **`e5d8f196`** | `docs(X.W9.h/evidence): G32 probe over 17 spaces x ChannelsBySpace ids, before/after` | the probe + `.before.txt` + `.after.txt` |

Integration by the wave's idiom, ⟨cmd⟩ `git checkout <worktree-sha> -- <paths>` then a pathspec
commit carrying the same paths. ⟨cmd⟩ `git show --stat 95792b44` → **2 files changed**; ⟨cmd⟩
`git show --stat e5d8f196` → **3 files changed**. **No sibling path was swept in** — the four
tracks share the primary's index and every commit carried its own `--` pathspec.

#### 7. Residuals and escalations

**Escalations: none.** No write left the writable set; the cure was possible at the bytes.

1. **`colorSpaceInfo.ts` vs `SPACE_CATALOG` — one duplication survives, narrowed.** The channel
   descriptors now exist in two places: keyed here (18 spaces, the rail's lookup) and positional in
   `space-catalog.ts`'s `info.components` (18 spaces, read by index at
   `ColorNutritionLabel.vue:65`). Collapsing them means re-keying `SPACE_CATALOG` and moving the
   nutrition label off positional indexing — **both outside this unit's bounds** (`space-catalog.ts`
   and `ColorNutritionLabel.vue` are named in neither W9.md §File Bounds nor this unit's writable
   set), and the rail's import at `ConsoleRail.vue:99` sits outside the `:172-180` carve. Recorded
   for X-W10/X-W11: the honest end state is one keyed table. Measured — ⟨cmd⟩ node census over
   both blobs → `BEFORE rows 13 · field values 358 · of which descriptors 37 · non-descriptor
   (retired) **321**` / `AFTER rows 18 · descriptor values **52**`. So **321** duplicated values
   are gone and the duplication that survives is the descriptor prose alone, in two different
   shapes for two different consumers.
2. **Id exactness is probe-enforced, not compiler-enforced.** TS tuple labels are not extractable
   as types, so `ChannelsBySpace`'s ids cannot pin the table's keys structurally. G32 is the
   enforcement and is now committed and runnable; the docstring states the division rather than
   implying the compiler checks it.
3. **`hex` is outside G32's denominator by construction** — it is a `DisplayColorSpace` but not a
   `SpaceId`, so `ChannelsBySpace` has no row for it. Its descriptors are compile-required by the
   `Record<DisplayColorSpace, …>` annotation and carry RGB's ids (`resolveColorSpace("hex")` is
   `"rgb"`), in Hex's own encoding terms. 49 pairs = 17 spaces' ids; the 50th..52nd are hex's and
   are structurally, not probe-, guaranteed.

---

## Close

SERVED MODEL: `claude-opus-5[1m]` · **CLOSE SEAT, VERIFY-ONLY** — this seat authored **zero cure
bytes**. Every one of the 33 gates was re-run by this seat at the settled bytes of `tranche-u`
@ **`8a0c3c63`**, node **v26.0.0**, darwin arm64, against a `dist/subpaths/` **this seat rebuilt**
(⟨cmd⟩ `npm run build` → `✓ built in 2.13s`, 2026-09-18 22:2x EDT). Every published count is read
from the settled bytes and **double-run**. Full transcript:
`docs/tranches/X/waves/evidence/W9/close-gates-2026-09-18.txt`.

**VERDICT: PARTIAL.** **19 GREEN · 14 RED** of 33. Two of the nine units — **X-W9.f** (the 4.1.0
cut) and **X-W9.h** (the ICtCp/Jzazbz descriptors) — **never ran**, and their non-running is
**lawful**: §Disjointness §4a sequences both behind X-W4's close on `eslint.config.js` and
`ConsoleRail.vue`, and ⟨cmd⟩ `sed -n '33p' docs/tranches/X/execution/LEDGER.md` re-read immediately
before this act → `| X-W4 | X-W0 | **OPEN 2026-09-17** |`. Neither unit left a deferral receipt,
so this close records the deferral on their behalf rather than leaving it to inference.

### C.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → **15 rows**. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/A/X-W9.md
docs/tranches/X/execution/LEDGER.md docs/tranches/X/waves/evidence/W9 docs/tranches/X/waves/W9.md`
→ **empty** before this act. **No killed predecessor's partial work on the close seat exists;
nothing inherited, nothing stashed, nothing restored.** `scripts/dev/dev.sh` never touched and never
staged; the ten dirty `demo/**` rows (X-W4 / X-W7 seats), `CARRY-LEDGER.md` and the three untracked
X-W1 paths never touched.

**Correction at the settled bytes, 2026-09-18 22:4x EDT, WRITE-THEN-MEASURE.** The sentence this
paragraph first carried — *"the same fifteen rows reproduce after this seat's commits"* — is FALSE,
and is corrected here rather than quietly rewritten. ⟨cmd⟩ `git status --porcelain` after this
seat's two commits → **17 rows**. The delta is **two sibling-seat rows that arrived while the gates
were running**: ` M docs/tranches/X/execution/C/F-W4.md` (Track C) and
`?? docs/tranches/X/keyframes/waves/KF-W11.md` (Track B). **Neither was touched, staged or
committed by this seat** — ⟨cmd⟩ `git diff --cached --name-only` after each commit → **empty**, and
⟨cmd⟩ `git show --stat` on both commits names only this seat's four paths.
`scripts/dev/dev.sh` is among the seventeen, untouched and never staged.

### C.1 Commit roster — every commit exists, and every one is in bounds

⟨cmd⟩ `git log -1 --format='%h %s'` on each, then ⟨cmd⟩ `git show --stat --format=''` on each; the
union of every path across all **twenty** commits (eleven substance + nine receipt) was taken and
compared against §File Bounds.

| plan row | commit | unit | scope verified |
|---|---|---|---|
| 1 | **`c18a78f8`** | .a | `test/parser-totality.test.ts` (222 +) · `evidence/W9/parser-totality-red-first.txt` (496 +). **No `src/` byte rides it** — ⟨cmd⟩ `git show c18a78f8 --stat -- src/` → 0 lines. The RED-first guardrail holds |
| 2 | **`97ab3991`** | .a | `src/css/{grammar,named-colors,stylesheet}.ts` · `src/easing.ts` · 5 evidence files |
| 3 | **`474846ce`** | .b | `src/transform/{path,decompose}.ts` · `test/transform/{path-geometry,decompose-targeted}.test.ts` |
| 4 | **`4be22189`** | .b | `src/subpaths/transform.ts` · DELETE `src/transform/decompose.ts` (617) · DELETE `test/transform/decompose-targeted.test.ts` (475) |
| 5 | **`a692069f`** | .c | `src/foundation/math.ts` · `src/subpaths/math.ts` · `test/math.test.ts` · 4 evidence |
| 5b | **`5ba934fc`** | .c | the truthfulness correction + its dated addendum-beside |
| 6 | **`c8848bed`** | .d | 7 subpath barrels · `src/css/{index,types,grammar,stylesheet}.ts` · `src/css/{rules,serialize}.ts` (create) · `src/color/index.ts` · 8 evidence |
| 7 | **`42727db0`** | .e | `test/color-anchors.test.ts` (create) · `test/v4-color-behavior.test.ts` · 2 evidence |
| 8 | **`df0807fe`** | .e | `scripts/ci/verify-packed-surface.mjs` · 5 evidence |
| 9 | **— NEVER TAKEN —** | .f | the 4.1.0 cut. **Lawfully deferred on X-W4 OPEN** (§4a) |
| 10 | **`0e37318e`** | .g | `docs/tranches/V/ARCHITECTURE.md` (1 line, `@@ -657 +657 @@`) · `evidence/W9/canon-parse-that.g.md` |
| 11 | **— NEVER TAKEN —** | .h | the descriptor re-key. **Lawfully deferred on X-W4 OPEN** (§4a) |
| 12 | **`8f0a0e79`** | .i | 5 packets · `INBOX.md` (7 +) · `evidence/W9/packets/PACKETS-2026-09-18.md` |
| receipts | `86461bc2` · `5266ac97` · `c42e245d` · `efe3db89` · `83da21d5` · `4db2fb64` · `4147e478` · `3281fbdd` · `d6065411` | .a–.i | `docs/tranches/X/execution/A/X-W9.md` only |

**Bounds: CLEAN.** The union is **71 paths**; every one sits in a §File Bounds `modify`/`create` row
or under `docs/tranches/X/waves/evidence/W9/**`. ⟨cmd⟩ the union grepped for
`dev.sh|eslint.config.js|package.json|CHANGELOG` → **0**. No `demo/**`, no `api/**`, no `e2e/**`, no
`.github/**`, no `src/color/model.ts`, no peer-repo byte. `scripts/dev/dev.sh` appears in **no**
commit of this wave.

### C.2 The gate table, BEFORE → AFTER, re-run by this seat

BEFORE is §Baseline's reading at wave open. AFTER is this seat's own double-run command.

| # | gate | BEFORE | AFTER (this seat) | verdict |
|---|---|---|---|---|
| G1 | no `./css` entry throws on any string | exit 1 · **28** failing assertions | probe **dies at `:74`** — `TypeError: TR.decomposeMatrix3D is not a function`, exit 1. **22 `ok` / 0 RED before the crash**: MTS-01 **15/15** · MTS-02 **2/2** · MTS-03 **4/4** · MTS-04 **1/1**. MTS-05/06/08/09 **UNREACHED** | **RED** — for a reason that is not a library defect (ESC-W9a-PROBE-UNRUNNABLE) |
| G2 | empty-body colour functions return typed failure | `120 failed \| 3 passed (123)` | **`123 passed (123)`** | **GREEN** |
| G3 | prototype-key totality, 7 subpaths (LIB-02) | **33** (value 1 · css 18 · easing 1 · math 5 · transform 8) | **30** (value 1 · **css 19** · easing 1 · **math 6** · transform 3) | **RED** — net −3, and see LW-3 |
| G4 | `easing()` total over `Object.prototype` keys | 5/5 throw | `ok LIB-01 easing(name) is total over the Object.prototype key set`; control `ease` ok, unknown → `easing_name_unknown` | **GREEN** |
| G5 | `no-non-null-assertion` clean under `src/css/` | **94** (grammar 72 · stylesheet 18 · timeline 4) | **4**, all `src/css/timeline.ts:23:36 :38:36 :71:51 :72:49` | **RED** — 90 of 94 retired; the 4 are in **no unit's writable set** (ESC-W9a-TIMELINE-NNA) |
| G6 | `PathGeometry` total on M-less paths | 10/10 throw | `test/transform/path-geometry.test.ts` **43 passed**; probe MTS-03 **4/4 ok** | **GREEN** |
| G7 | arc-flag spelling equivalent | expanded 31.4033 vs compact **0**, Δ 31.4033 | expanded **31.403311569547547** = compact **31.403311569547547**, **\|Δ\| = 0**; probe `ok MTS-04`; the committed SVGO fixtures pass | **GREEN** |
| G8 | truncated runs honour the declared type | `"M 0 0 L 10"` → **NaN** | `0` · `0` · `0` · **`5`** — all finite, all `typeof number` | **GREEN** |
| G9 | singular 3D matrices return `null` | null-filled object with NaNs | re-measured by **this seat** at `474846ce`'s own bytes (`git archive` → esbuild bundle): **`null` 3/3**, control `.translate` `[5,6,7]`. At the settled bytes the subject is **retired** (`4be22189`) | **GREEN at its own commit; SUPERSEDED-BY-G27 thereafter** |
| G10 | `no-non-null-assertion` under `src/transform/` + `src/foundation/` | **155** (decompose 113 · path 35 · math 7) | **exit 0 · 0 problems** ×2 | **GREEN** |
| G11 | `./math` enforces its stated preconditions | 3 named legs return `undefined`/NaN | `test/math.test.ts` **70 passed (70)** | **GREEN** |
| G12 | a consumer compiles against the packed tarball | exit 1 · **4** assertions | exit 1 · **2** — `ok LEG1 public return types are nameable from their own subpath`; both LEG2 rows stand (TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED`) | **RED** — LEG1 GREEN, LEG2 on `package.json` (ESC-W9d-ROOT-AND-SYNTAX (a)) |
| G13 | zero bare `declare` in emitted `.d.ts` | **33** (css 18 · value 6 · quantize 6 · easing 2 · color 1) | **20** (css 6 · value 6 · quantize 6 · easing 2 · color 0) | **RED** — 13 retired, 20 irreducible in bounds (ESC-W9d-DTS-SPELLING) |
| G14 | zero `_2` mangles in `css.d.ts` | **58** / 25 lines | **60** / **26 lines** | **RED, and REDDER** — see LW-1 |
| G15 | `serializeCssValue` published + `Result` | `false`; fork live | **`true`**; `"a : b"` → `{"ok":true,"value":"a: b"}` | **GREEN** (the fork's retirement is keyframes' act, rides O-34) |
| G16 | R-T1 ratchet: max `src/**/*.ts` LoC may not increase | **899** (`src/css/stylesheet.ts`) | **672** (`src/transform/path.ts`); then 539 · 519 · 476 · 377 | **GREEN** — the ratchet falls. See LW-2: the split's **stated ≤609 target is MISSED** |
| G17 | colour boundary: `color/model` from `src/color/` only | **2** modules reach past the barrel | `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` — **0** | **GREEN** |
| G18 | colour oracles are external | `:66` asserts `(byte/255)/12.92` under an independent-oracle name | `test/v4-color-behavior.test.ts` **8** + `test/color-anchors.test.ts` **12** = **20 passed**; four external families bind | **GREEN in bounds** — the Sharma half unperformed (ESC-W9e-SHARMA-NO-SUBJECT) |
| G19 | coverage-by-export over a recorded denominator | no coverage configuration anywhere | ⟨cmd⟩ `node …/evidence/W9/coverage-by-export.mjs` → **exit 0**, `74 / 75 = 98.7%` whole-suite and `71 / 75 = 94.7%` minus the surface snapshot | **GREEN** — the command publishes; the committed **prose** is stale (LW-4) |
| G20 | packed-surface check is behavioural | presence-only + hardcoded `strictTypes: 62` | ⟨cmd⟩ `npm pack` → `node scripts/ci/verify-packed-surface.mjs <tarball>` → **exit 1**: 4× TS2305 + 6× TS2339 on `fixtures/public-types/value-v4.ts`. Through a scratch overlay with that one fixture corrected (script bytes `cmp -s` **identical**, no repo byte written) it reaches the runtime half and **reddens again**: `/color exports [… isAnyColor …]` | **RED** for **two** causes, both escalated (ESC-W9e-FIXTURE-V4TYPES · X-W9.d's riding relay) |
| G21 | SCI-1 shipped with its evidence tuple | **0** occurrences in `src/` | **0** | **RED — UNATTEMPTED** (X-W9.f never ran). **Ninth carry** |
| G22 | `toHex` and `easingNames()` published | `false` / `false` | `false` / `false` | **RED — UNATTEMPTED** |
| G23 | `easing()` reference stability | 4/4 fresh closures | **4/4 fresh closures** | **RED — UNATTEMPTED** |
| G24 | restored analytic arms match 0.13.0 | legs 1–2 RED, drift leg unrunnable | leg1 RED (no `.` key, 5 fourier sites) · leg2 RED (`timingFunctions` absent, `./easing` ships 16 flat names) · **leg3 `ERR_MODULE_NOT_FOUND`** on `…/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | **RED** — ESC-W9-G24-SUBSTRATE **unrelieved**, and the arms were never restored |
| G25 | catalog fence | GREEN at authorship · 30 keys | `Object.keys(bezierPresets).length` → **30** | **GREEN (declared fence, unmoved)** |
| G26 | ND-01 prune fence | GREEN at authorship · 0 | **0** | **GREEN (declared fence, unmoved)** |
| G27 | matrix family retired, path geometry preserved | **6** of the six exported | **0** of the six; `./transform` keys = `PathGeometry, getPointAtLength, getTotalLength`; all three present | **GREEN** |
| G28 | bench table under the restated denominator | R1 throws 13/13; accepted/reject MEASURE-AT-OPEN | **R1 leg: 0 throws** over the 13-vector corpus × `{parseCssColor, parseCssScalar}` + `easing` over the 5 prototype keys. **No `bench-table-4.1.md` exists**; accepted/reject legs **unmeasured** | **RED** — R1's half turned, the table was never published (X-W9.f never ran) |
| G29 | one dated cut | version `4.0.0` | version **`4.0.0`**; **no 4.1.0 tag**; keyframes' pin still `"4.0.0"` | **RED — UNATTEMPTED** |
| G30 | canon cites no non-existent tree | 1 hit at `:657` | ⟨cmd⟩ `grep -c 'src/parsing' …/ARCHITECTURE.md` → **0** (grep exit 1) | **GREEN** |
| G31 | parse-that position recorded against ground truth | manifest as banked, no paragraph | dependencies **exactly** `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`, `@mkbabb/parse-that` absent from both maps; the paragraph exists at `:657` and quotes the manifest verbatim | **GREEN** |
| G32 | channel descriptors resolve exactly | `cp` → `"Ct (tritan)"`, `jz` → `"jz"` | **`cp` → `"Ct (tritan)"`** (wrong row) · **`jz` → `"jz"`** (silent degradation). `ConsoleRail.vue:176-178` still prefix-matches | **RED — UNATTEMPTED** (X-W9.h never ran) |
| G33 | packets sent, exact-pin consumers notified | 0 packets | **5** packets · **5** `INBOX.md` rows (O-34..O-38) · the exact pin `"4.0.0"` at `../keyframes.js/package.json:71` quoted in O-34 **before** any tag (version still `4.0.0`) | **GREEN on its three readable legs**; the post-window `npm ls` leg is unreadable **because the window never opened** |

**Tally: 19 GREEN · 14 RED.** GREEN = G2 G4 G6 G7 G8 G9 G10 G11 G15 G16 G17 G18 G19 G25 G26 G27
G30 G31 G33. RED = G1 G3 G5 G12 G13 G14 G20 G21 G22 G23 G24 G28 G29 G32.
Of the 14 RED, **six are UNATTEMPTED** (G21 G22 G23 G28 G29 G32 — the two unrun units' gates),
**five are escalated with named owners** (G1 G5 G12 G13/G14 G20), **two are honest-RED remainders
of a mis-scoped leg** (G3, and G24's substrate).

Per **CC-096** the gates are read **staged** — equivalence (G1–G4), coverage (G19) and bench (G28)
each stand on their own. **No composite verdict is reported**, exactly as the disposition directs.

### C.3 §Verification Artefacts, run as written

⟨cmd⟩ `ls docs/tranches/X/waves/evidence/W9/` → **36 files + `packets/`**. Against the spec's list:

| artefact | state |
|---|---|
| `born-red-2026-XX-XX.json` | **ABSENT.** The born-RED re-execution exists as §Baseline's prose table in this record (33 rows, every count double-run), not as a JSON file. **Residual R-8** |
| `src-surface-totality.{before,after}.txt` | present (+ `.integrated.txt`) |
| `library-band-gates.{before,after}.txt` | present under the names `.before-d.txt` / `.after.txt` / `.after-d.txt` / `.integrated-after-b.txt` — four readings at four tree states, each labelled. **The spec's two exact filenames do not both exist**; nothing is missing in substance |
| `consumer-surface-compile.{before,after}.txt` | `before` exact; `after` spelled `.after-d.txt` |
| `parser-totality-red-first.txt` | present, 496 lines, commit `c18a78f8` named in-file |
| `eslint-nna.{css,transform}.{before,after}.json` | all four present. **The spec says "94 → 0 and 155 → 0"; the measured pair is 94 → 4 and 155 → 0** |
| `surface-census.after.json` | present |
| `coverage-by-export.md` | present — see **LW-4** |
| `bench-table-4.1.md` | **ABSENT** (X-W9.f never ran) |
| `packed-surface.after.json` | present |
| `packets/` | present — 5 paths, byte counts, sha256s |
| commit hashes: RED-first · each integration · **the cut** · **the tag** | RED-first and every integration commit are rowed at C.1. **The cut commit and the tag do not exist** |

This seat adds `close-gates-2026-09-18.txt` — the full transcript of every gate above.

### C.4 Landed-wrong findings — named here, cured by nobody at this seat

**LW-1 · G14 moved REDDER, and the wave's own publication is one of the two causes.**
`_2` occurrences in `dist/subpaths/css.d.ts` went **58 → 60**, lines **25 → 26**, over a wave whose
G14 reads *"Zero `_2` mangles"*. X-W9.d measured this and named the root (ESC-W9d-DTS-SPELLING: the
dts rollup keys its entity cache on the **import-specifier string**, so the `_2` copy rides in from
`src/value.ts`'s `"./color/index"` spelling, which no module under `src/css/` can reproduce) — that
diagnosis is this seat's finding too, re-read and not disputed. What the receipt does **not** say is
that the count **rose**. Owner of the cure: a writer for `src/value.ts` / `src/quantize.ts` /
`src/easing.ts`, naturally **X-W9.f**. Owner of the record: this close.

**LW-2 · X-W9.d's receipt calls 672 "below the spec's ≤609 target". It is not.**
The receipt's G16 AFTER cell (`4db2fb64`) reads *"the ratchet falls 920 → 672, **below the spec's
≤609 target**"*. ⟨cmd⟩ 672 > 609. The **gate** is still GREEN — G16's pass condition is *"max
`src/**/*.ts` LoC may not increase"*, and 672 < 899 — but the split's **stated target is MISSED by
63 lines**, and the new maximum is not the split product at all: it is `src/transform/path.ts`,
which X-W9.b grew 564 → 672 and **booked correctly at its own residual 6.5** (*"X-W9.d should know
that after the split the new max is `src/transform/path.ts` at 672, not the 609 the spec names"*).
Two receipts of one wave contradict each other on the same number; **.b is right**. E-3 keeps both
immutable; the correction is this paragraph.

**LW-3 · X-W9.d's publication of `serializeCssValue` added +1 to G3's RED count, undisclosed.**
LIB-02's `./css` leg went **18 → 19**; ⟨cmd⟩ the corpus enumerated name-by-name at this seat names
the new entry: **`serializeCssValue`**. It is the same arity/shape class X-W9.a escalated
(ESC-W9a-G3-LEG-SCOPE) — a JS caller passing `undefined` where the signature declares `CssValue` —
not a new crash class, and G15 required the publication. But X-W9.d's receipt measured G12–G17 and
**never re-ran LIB-02**, so the +1 arrives at the close undeclared. `./math` went 5 → 6 for the same
reason (`cubicBezier`) and **X-W9.c DID declare it** (its residual 6.2). The asymmetry is the
finding.

**LW-4 · `coverage-by-export.md` publishes a denominator the settled bytes no longer carry.**
The committed document's headline figures are **73 / 73 = 100.0%** and **70 / 73 = 95.9%** over a
runtime denominator of **73**. ⟨cmd⟩ the **committed command beside it** now prints **74 / 75** and
**71 / 75** — X-W9.d's `isAnyColor` and `serializeCssValue` moved the denominator to **75** after
X-W9.e published. G19's falsifier is, in its own words, *"change the denominator without
re-recording it"*. The **command** re-records honestly and is why this gate reads GREEN; the
**prose beside it** does not. Cure: a dated addendum-beside re-publishing at 75, owner **X-W9.f** or
a named docs writer. Not performed here (E-3, and this seat is VERIFY-ONLY).

**LW-5 · three receipts publish `0 UNREAD rows` from a probe that cannot see the bytes.**
X-W9.d §9, X-W9.e §8 and X-W9.i §2 each print ⟨cmd⟩ `grep -nE '\| *UNREAD' …/INBOX.md` → **0 rows**.
On these bytes that reading is **FALSE**: the live cells are spelled `| **UNREAD 2026-09-17** —` and
the un-bolded pattern misses them. This seat's per-row **status-cell** scan returns **3** —
**I-32 · I-33 · I-34**. The same trap was already caught twice in this tranche and written into
`INBOX.md` itself (the F.W4 `.c` sweep line; X.P.W3 round 4's **F-w1**), so it is a repeat, not a
discovery. **The conclusion survives** — all three route by their own Routing cells to X-W0.j / the
X formation mail seat / X-EXT-1..6, none to the library band — but the published **count** did not.

**No landed-wrong of the bounds kind exists.** No commit of this wave touched a path outside
§File Bounds; `scripts/dev/dev.sh` appears in none; **no masking construct was found**. ⟨cmd⟩ over
all eleven substance commits, added lines only,
`grep -cE 'test\.skip|it\.skip|describe\.skip|\.only\(|@ts-ignore|@ts-expect-error|eslint-disable'`
→ **0** (one apparent hit is `process.exit(` matching the `xit(` fragment, inspected and discarded).
⟨cmd⟩ `git show <each> -- src/ scripts/ | grep -cE '^\+.*try *\{'` → **1**, in `df0807fe`. It is
inspected, not counted on trust: `scripts/ci/verify-packed-surface.mjs` carries **three** `try`
blocks — `:232` the workspace install, `:304` the smoke harness, which **rethrows with the export's
name** (`/${entry} ${name} threw on a valid invocation: …`), and `:320` the forbidden-root
assertion, which **rethrows anything that is not `ERR_PACKAGE_PATH_NOT_EXPORTED`**. Not one
swallows a defect; the middle one exists precisely to surface one.

### C.5 The eleven RED tests this wave caused, and did not get to cure

⟨cmd⟩ `npx vitest run` (double-run identical) → **`Test Files 4 failed | 32 passed (36)` ·
`Tests 13 failed | 600 passed (613)`**. Two are inherited (`test/spectrum-luma.test.ts` C-5,
X-W4's; `demo/test/shell/reka-binding-idiom.test.ts` NG-6, demo's). **Eleven are this wave's own
downstream artifacts**, every one of them a *correct cure's* collision with an artifact that
asserts the *pre-cure* shape:

| rows | file | cause | escalation | owner named |
|---|---|---|---|---|
| 10 | `test/v4-css-emerging.test.ts` | `serializeCssValue` joined the `Result` idiom and moved to `src/css/serialize.ts`, as W9.md :239-240 ordered | ESC-W9d-EMERGING-SERIALIZE | X-W9.f |
| 1 | `test/v4-c1.test.ts` | the exact-surface snapshot pins `./transform` at 9 names; the retirement left 3, and `./color`/`./css` each gained one | ESC-W9b-V4C1-SNAPSHOT | X-W9.f |

⟨cmd⟩ `npm run typecheck` → **exit 2, 3 errors**: `test/parser-totality.test.ts:89,146` (TS2322,
ESC-W9c-PARSER-TOTALITY-TSC / ESC-W9e-TESTPROJ-TSC) and `test/v4-css-emerging.test.ts:12` (TS2459,
the same cause as the ten). ⟨cmd⟩ `npm run lint` → **55 problems, all 35 carriers under
`docs/tranches/**`** (X-W8 G-6's ignore owns them), **zero** under `src/` or `test/`.

**§Format And Lint Cadence is therefore NOT met at close** — it requires a green `npm run lint`,
`npm run typecheck` and `npm test` before close. `lint` is green in substance (the 55 are another
wave's ignore); `typecheck` and `test` are **RED**, for three files that sit in **no unit's writable
set** and are **absent from W9.md §File Bounds entirely**. That is the wave's single largest
structural finding: **the cures were bounded, the artifacts that assert on them were not.** Four
separate units raised it independently (`.b`, `.c`, `.d`, `.e`); it is not a seat's oversight, it is
a spec-level omission, and it needs one grant, not four.

### C.6 Escalations carried to the sitting — eleven, none worked around

| id | raised by | one-line ask | still open at close |
|---|---|---|---|
| **ESC-W9a-TIMELINE-NNA** | .a | assign `src/css/timeline.ts` (in §File Bounds, in no unit's set) to a writer; 4 lines, no behaviour change | **YES** — G5 reads 4 |
| **ESC-W9a-G3-LEG-SCOPE** | .a | read G3 staged per CC-096 and attribute LIB-02's remainder by file | **YES** — G3 reads 30 |
| **ESC-W9a-PROBE-UNRUNNABLE** | .a, confirmed by .b | rule a dated addendum-beside guarding the probe's `:74`, **or** read G1 staged with MTS-05 struck as SUPERSEDED-BY-G27 | **YES** — reproduced by this seat at its own run |
| **ESC-W9b-V4C1-SNAPSHOT** | .b | name a writer for `test/v4-c1.test.ts` (absent from §File Bounds) | **YES** — 1 RED test |
| **ESC-W9c-MTS06-SUPERSEDED** | .c | fold MTS-06 into whichever option is ruled for MTS-05 | **YES** |
| **ESC-W9c-PARSER-TOTALITY-TSC** | .c | name a writer for `test/parser-totality.test.ts`'s 2 TS2322s | **YES** — typecheck exit 2 |
| **ESC-W9d-EMERGING-SERIALIZE** | .d | name a writer for `test/v4-css-emerging.test.ts` (absent from §File Bounds) | **YES** — 10 RED tests |
| **ESC-W9d-DTS-SPELLING** | .d | name a writer for `src/value.ts` / `src/quantize.ts` / `src/easing.ts`, **or** rule G13/G14 staged | **YES** — G13 20, G14 60 |
| **ESC-W9d-ROOT-AND-SYNTAX** | .d | rule G12's LEG2 either a defect `.f` cures by adding a `"."` key (which reverses **O-12**, already SENT) or **declared-retired** | **YES** — G12 reads 2 |
| **ESC-W9e-SHARMA-NO-SUBJECT** | .e | rule the 34-pair Sharma clause SUPERSEDED-BY-THE-V4-CUT, **or** name a writer for a colour-difference export | **YES** |
| **ESC-W9e-FIXTURE-V4TYPES** | .e | name a writer for `fixtures/public-types/value-v4.ts` (absent from §File Bounds); 14 stale lines | **YES** — G20 exit 1 at line one |
| **ESC-W9-G24-SUBSTRATE** | seat 0 | obtain 0.13.0 from the registry into a scratch dir and measure the 8 arms there | **YES** — leg 3 still `ERR_MODULE_NOT_FOUND` |

**Seven of the twelve name a file that W9.md §File Bounds never listed** (`src/css/timeline.ts` is
listed but unassigned; `src/css/syntax.ts`, `test/v4-c1.test.ts`, `test/v4-css-emerging.test.ts`,
`fixtures/public-types/value-v4.ts`, `src/value.ts`, `src/quantize.ts` are not listed at all).
That is one adjudication, not seven.

### C.7 Residuals, with named owners

| id | residual | owner |
|---|---|---|
| R-1 | `src/easing.ts` carries **10** non-null assertions in `linearEasing` (`:171-181`), outside both lint gates' scopes | X-W9.f (next writer of the file) |
| R-2 | `src/foundation/math.ts:58`'s *"share the same length"* sentence vs keyframes' `physics/numeric.ts:193` grow-never-shrink `_out` — **the ask INVERTS at the 4.1 pin bump**, witnessed at their bytes, carried in O-34 | the sitting (an adjudication, per .c's residual 6.1) |
| R-3 | `./css` still withholds `serializeKeyframeSelector` (`grammar.ts:429`) — a surface decision | X-W9.f's ship list |
| R-4 | `src/transform/path.ts` is the new max at **672**; `cubicAt` inside it is dead code; the inter-subpath `moveto` gap is still counted in `totalLength` | X-W9.f / a later ratchet wave |
| R-5 | three published entries have no behavioural test — `isLayoutTrackingUnit`, `collectDeclarations`, `parseKeyframeSelector` (all now smoke-invoked against the tarball) | published in `coverage-by-export.md` §3.2 |
| R-6 | **"SENT" at G33 means AUTHORED + ROWED.** The five letters are **not copied into the peer trees** — RD-11 forbids a peer-repo byte. If the sitting reads *sent* as *landed in the counterparty's tree*, a seat holding those bounds must carry the copies | the sitting / KF-WRITE (§0j.C) + the constellation mail seat |
| R-7 | `coverage-by-export.mjs` lives under `docs/…/evidence/W9/`, not `scripts/`; moving it to CI is X-W1's file | X-W1 |
| R-8 | `born-red-2026-XX-XX.json` was never written; the born-RED bank is §Baseline's prose table | this record (substance present, artefact name unmet) |
| R-9 | **The L-18 closing rider is wholly undischarged** — no quartet, no gestalt pass, no Fable apotheosis has run on this wave. Landing gates green was never going to make it ACCEPTED, and 14 are not green | the sitting |

### C.8 E13 close sweep — the four paths, at this seat's own clock

⟨cmd⟩ `date` → **2026-09-18 22:28 EDT**. ⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -name
'*.md' -newermt '2026-09-18 21:10'` (21:10 = X-W9.d's sweep clock) → `ARCHITECTURE.md` (X-W9.g's
carve, **canon not mail**) · `INBOX.md` (**self-excluded**, SELF-COUNT law) · the five
`*-inbox-2026-09-18-*` packets (**ours**, outbound, rowed O-34..O-38). ⟨cmd⟩
`ls -dt ../glass-ui/docs/tranches/*/ | head -3` → **`BK/` · `BJ/` · `BI/`** — BK re-confirmed the
newest glass tranche dir, never a pinned letter; **nothing new** on it, on keyframes' V lane, or on
atlas' P lane.

Classification from **each row's own Status cell** (D-1), by a per-row `awk` over the status column
rather than a line grep — see **LW-5**. **3 UNREAD rows: I-32 · I-33 · I-34**, every one routed by
its **own Routing cell** to X-W0.j / the X formation mail seat / X-EXT-1..6. ⟨cmd⟩ none of the three
names a library-band, 4.1-cut, parser, transform, math or packet surface.

**0 unrowed · 0 `I-n` minted · 0 UNREAD addressed to X-W9's scope.** `INBOX.md` carries **no edit**
from this seat. **This wave does not close with unread mail.**

### C.9 The four-verb line

Moved **only** as §State permits, and no further:

- **AUDITED**: yes (unmoved)
- **SPECIFIED**: yes (unmoved)
- **IMPLEMENTED**: **PARTIAL 2026-09-17** — seven of nine units landed and are measured; **X-W9.f
  and X-W9.h never ran**, lawfully deferred by §4a on X-W4, which reads **OPEN** at this seat's
  re-read. 19 of 33 gates GREEN.
- **VERIFIED**: **no** (unmoved). §Dependencies makes **X-W11** the *"release and verified close"*;
  this seat is not designated to stamp it, and would not: the L-18 rider (R-9) is undischarged and
  fourteen gates are RED.

**The W9.md status edit is LINE-COUNT-NEUTRAL, deliberately.** This record cites the spec by line
throughout (§Unit plan's `:183-197`, `:343-347`, `:455-456`, `:363-371`, `:472-489` …), and X-W10
and X-W11 name it from their own Opens-after. A status block that grew would displace every one of
those coordinates by its own delta — the same trap X-W9.g refused at `ARCHITECTURE.md:657`, and the
same precedent (union repair round 1's *"zero-line-delta … no sibling coordinate displaced"*).
Three lines were therefore replaced by three. ⟨cmd⟩ `wc -l docs/tranches/X/waves/W9.md` → **522**
before, **522** after. ⟨cmd⟩ `git diff --numstat` → **`3 3`**; ⟨cmd⟩ `git diff -U0 | grep '^@@'` →
**`@@ -17,3 +17,3 @@`**, one hunk. ⟨cmd⟩ `sed -n '183p;343p;370p;455p'` → the four cited anchors
(`### X.W9.a …`, the `G1` row, the `G28` row, Commit Plan row 1) **all still resolve exactly**.

**What the wave's own Goal criterion says at the bytes.** Clause 1 — *"no public entry throws on a
string"* — is **TRUE and independently measured**: a string corpus over every function of all seven
subpaths returns **0 throws** from `parseCssColor`, `parseCssScalar`, `parseCssValue`,
`parseCssValues`, `parseKeyframeSelector`, `parseTimingFunction`, `parseStylesheet`,
`serializeCssValue`, `serializeCssColor`, `serializeTimelineOptions` and `easing`. Clause 2 —
*"no public signature returns a value its own `.d.ts` forbids"* — is **TRUE** on every leg the wave
touched (G8, G9, G11, G15). Clause 3 — *"every type a subpath returns is nameable from that
subpath"* — is **TRUE at the consumer** (G12 LEG1 `ok`) and **FALSE in the emitted bytes**
(20 bare `declare`, G13). Clause 4 — *"ships as one dated 4.1.0 cut whose exact-pin consumers were
notified by packet before the tag"* — **the packets were sent; the cut was not taken.** The wave
delivered the surface and withheld the event.

**Commits of this close**: the evidence transcript and this section ride one commit; the LEDGER row
rides its own.

---

## Check 1

SERVED MODEL: `claude-opus-5[1m]` · **FRESH ADVERSARIAL L-20 PASS 1, VERIFY-ONLY** — this seat
authored **no cure byte, no unit receipt and no line of `## Close`**. Every one of the **33** gates
was re-run at this seat's own commands against the settled bytes of `tranche-u` @ **`34409ad1`**,
node **v26.0.0**, darwin arm64, against the `dist/subpaths/` already standing at those bytes
(⟨cmd⟩ `find src -name '*.ts' -newer dist/subpaths/css.d.ts` → **nothing**, so `dist/` IS the
settled bytes' build and no rebuild was imposed on the four sibling tracks). Both probes were
**double-run** (⟨cmd⟩ `diff -q run1 run2` → silent, twice). Two sibling seats committed during
this pass (HEAD `34409ad1` → **`8116cefd`**, Track C's `F.W3 OPEN` and Track D's `x-p-w3/.h`);
⟨cmd⟩ `git diff --stat 34409ad1..HEAD -- src/ test/ scripts/ docs/tranches/X/waves/W9.md
docs/tranches/X/execution/A/X-W9.md docs/tranches/V/ARCHITECTURE.md
docs/tranches/V/coordination/` → **`INBOX.md | 2 ++` alone**, a sibling's appended sweep line, so
**no subject of any gate above moved under this seat** and every reading below stands at HEAD.

**VERDICT: NOT-CONFORMANT.** **All 33 gate verdicts reproduce — 19 GREEN · 14 RED, zero
divergence from the close.** Bounds are clean, no masking construct exists anywhere in the diff,
and the record is honest about every figure it publishes. The row is **NOT promoted** for one
reason, stated plainly: **seven of the fourteen RED gates have no relief of the kind the bar
admits** — they are RED because two of this wave's own nine units never ran, and the spec assigns
those units' work to **this wave**, not to a producer and not to a successor. The wave is
**incomplete, not wrong**; the cure is a repair round, not a rewrite.

### CH1.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → **17 rows**. ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md` → **empty** before this
act. **No killed predecessor's partial work on the check seat exists; nothing inherited, nothing
stashed, nothing restored.** `scripts/dev/dev.sh` never touched and never staged; the ten dirty
`demo/**` rows (X-W4 / X-W7 seats), `CARRY-LEDGER.md` and the untracked X-W1 / X-KF / X·P paths
never touched.

### CH1.1 Every gate re-run at this seat's own commands — 33 of 33 verdicts reproduce

| # | this seat's command → reading | close's verdict | reproduces |
|---|---|---|---|
| G1 | probe dies at `:74` `TypeError: TR.decomposeMatrix3D is not a function`, exit 1; **22 `ok` / 0 RED** before the crash (MTS-01 15 · MTS-02 2 · MTS-03 4 · MTS-04 1) | RED | **YES** |
| G2 | `npx vitest run test/parser-totality.test.ts` → **123 passed (123)** | GREEN | **YES** |
| G3 | LIB-02 → **30** (`value=1 css=19 easing=1 math=6 transform=3`) | RED | **YES** |
| G4 | `ok LIB-01 easing(name) is total over the Object.prototype key set`; control `ease` ok, unknown → `easing_name_unknown` | GREEN | **YES** |
| G5 | `npx eslint 'src/css/**/*.ts' --rule …` → **4**, all `src/css/timeline.ts:23:36 :38:36 :71:51 :72:49` | RED | **YES** |
| G6 | `test/transform/path-geometry.test.ts` **43 passed**; probe `ok MTS-03` 4/4 | GREEN | **YES** |
| G7 | probe `ok MTS-04 compact == expanded (31.403311569547547)`, \|Δ\| = **0**; the three committed SVGO fixtures pass inside the 43 | GREEN | **YES** |
| G8 | `getTotalLength` over the four truncated runs → `0 · 0 · 0 · 5`, **all finite, all `typeof number`** | GREEN | **YES** |
| G9 | re-measured by THIS seat at `474846ce`'s own bytes (⟨cmd⟩ `git archive 474846ce src` → esbuild bundle): **`null` 3/3** on three distinct singular matrices; control `.translate` → `[5,6,7]` | GREEN at its own commit | **YES** |
| G10 | `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule …` → **exit 0 · 0 problems** | GREEN | **YES** |
| G11 | `npx vitest run test/math.test.ts` → **70 passed (70)** | GREEN | **YES** |
| G12 | probe exit 1 · **2** — `ok LEG1 public return types are nameable from their own subpath`; both LEG2 rows stand (TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED`, 5 fourier sites) | RED, LEG1 GREEN | **YES** |
| G13 | `grep -c '^declare ' dist/subpaths/*.d.ts` → **20** (css 6 · value 6 · quantize 6 · easing 2 · color 0) | RED | **YES** |
| G14 | `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60**; `grep -c` → **26** lines; probe names the same 5 mangles | RED (redder) | **YES** |
| G15 | `'serializeCssValue' in CSS` → **true**; `serializeCssValue(parseCssValue("a : b").value)` → **`{"ok":true,"value":"a: b"}`** | GREEN | **YES** |
| G16 | `wc -l` over `src/**/*.ts` → max **672** (`src/transform/path.ts`); then 539 · 519 · 476 · 377 | GREEN | **YES** |
| G17 | `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` — **0** modules | GREEN | **YES** |
| G18 | `test/v4-color-behavior.test.ts` **8** + `test/color-anchors.test.ts` **12** = **20 passed** | GREEN in bounds | **YES** |
| G19 | `node …/evidence/W9/coverage-by-export.mjs` → **exit 0**, `74 / 75 = 98.7%` and `71 / 75 = 94.7%`, each printed beside the command that produced it | GREEN | **YES** (and LW-4 reproduces — CH1.3 D-4) |
| G20 | `npm pack` → `node scripts/ci/verify-packed-surface.mjs <tarball>` → **exit 1**, **4× TS2305** (`DecomposedMatrix2D` `DecomposedMatrix3D` `Mat4` `Vec4`) + **6× TS2339** on `fixtures/public-types/value-v4.ts` | RED | **YES** |
| G21 | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/` → **0** | RED — UNATTEMPTED | **YES** |
| G22 | `'toHex' in color` → **false** · `'easingNames' in easing` → **false** | RED — UNATTEMPTED | **YES** |
| G23 | `easing(k)`/`.value` identity over the four CSS keywords → **false 4/4** | RED — UNATTEMPTED | **YES** |
| G24 | `node …/probes/fourier-value-import-drift.mjs` → **`ERR_MODULE_NOT_FOUND`** on `…/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | RED, escalation **unrelieved** | **YES** |
| G25 | `Object.keys(bezierPresets).length` → **30** | GREEN (declared fence) | **YES** |
| G26 | `grep -rn 'colorScale\|sampleToSVGPath' src/` → **0** | GREEN (declared fence) | **YES** |
| G27 | `./transform` keys → **`PathGeometry, getPointAtLength, getTotalLength`**; **0** of the six present | GREEN | **YES** |
| G28 | R1 leg re-run by this seat: 13-vector corpus × `{parseCssColor, parseCssScalar}` + `easing` over the 5 prototype keys → **total 31 · throws 0**. `bench-table-4.1.md` → **does not exist** | RED | **YES** |
| G29 | `require('./package.json').version` → **`4.0.0`**; no 4.1.0 tag; keyframes' pin `"4.0.0"` at `:71` | RED — UNATTEMPTED | **YES** |
| G30 | `grep -c 'src/parsing' docs/tranches/V/ARCHITECTURE.md` → **0** | GREEN | **YES** |
| G31 | dependencies **exactly** `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `@mkbabb/parse-that` absent from `dependencies` **and** `devDependencies` | GREEN | **YES** |
| G32 | `ConsoleRail.vue` `componentDescription()` still reads `c.startsWith(upper) \|\| c.startsWith(component)` — **at HEAD's committed blob as well as in the working tree** (⟨cmd⟩ `git show HEAD:…` compared, identical, so X-W4's dirty carve is not masking the reading) | RED — UNATTEMPTED | **YES** |
| G33 | `ls …/*-inbox-2026-09-18-*.md \| wc -l` → **5**; `grep -c '^| O-3[4-8] |' INBOX.md` → **5**; `sed -n '71p' ../keyframes.js/package.json` → `"@mkbabb/value.js": "4.0.0"`, quoted before any tag | GREEN on its three readable legs | **YES** |

**33 of 33 verdicts reproduce. Zero divergence.** No GREEN the close claimed failed at this seat's
hand, and no RED it claimed was secretly green.

### CH1.2 The clean axes — measured here, not inherited

- **Bounds (axis 2).** ⟨cmd⟩ `git show --name-only` over **all 23** commits of this wave (11
  substance ⊕ 9 receipt ⊕ close ⊕ ledger ⊕ correction) → union **74 paths**; the close's own
  reading of **71 over 20** reproduces exactly (the three extra commits add `W9.md`,
  `close-gates-2026-09-18.txt` and `LEDGER.md`). ⟨cmd⟩ the union filtered against
  `dev\.sh|eslint\.config|package\.json|CHANGELOG|node_modules|fixtures/|^demo/|^api/|^e2e/|^\.github/|src/color/model\.ts`
  → **0 hits**. Every one of the 26 `src/`, `test/` and `scripts/ci/` paths sits in a §File Bounds
  `modify`/`create` row. **`scripts/dev/dev.sh` appears in no commit of this wave**, and is dirty
  and unstaged at this seat's own `git status`, exactly as it was at open.
- **No masking fallback (axis 3).** ⟨cmd⟩ over the added lines of all eleven substance commits,
  `test\.skip|it\.skip|describe\.skip|\.only\(|@ts-ignore|@ts-expect-error|eslint-disable|xit\(|xdescribe\(`
  → **0**. ⟨cmd⟩ `grep -rn 'catch' src/` at HEAD → **nothing at all**: the product tree carries
  **zero** try/catch. The three `try` blocks the diff adds are each inspected here, not trusted:
  `test/parser-totality.test.ts` captures the throw so the battery can assert on it;
  `test/math.test.ts` captures it so the `RangeError` policy can be asserted;
  `scripts/ci/verify-packed-surface.mjs:300` **rethrows with the export's name**. Not one swallows
  a defect. The `grammar.ts:181` cure was read at the bytes and is a typed `failure(source,
  "css_syntax", ["color components"])`, not a guard around a crash; the thirteen
  `serializeCssValue` call sites were read and every `!ok` propagates the module's own typed
  failure. **No allowlist, no copied producer selector, no patched `node_modules`, no narrowed
  assertion.**
- **E-3 (axis 5).** ⟨cmd⟩ `git diff --stat ba4e1de5..HEAD --` over
  `docs/tranches/V/megatranche/registry/`, the nine sibling wave specs (`W1..W8`, `W10`, `W11`),
  `docs/tranches/V/megatranche/audit/probes/`, `scripts/dev/dev.sh`, `eslint.config.js`,
  `package.json`, `CHANGELOG.md` → **prints nothing**. The adjudicated registry, every sibling
  spec and all four probes are **byte-untouched by this wave**. `W9.md` moved **3 lines for 3**
  (`@@ -17,3 +17,3 @@`, 522 → 522) — the status fields only, which is §File Bounds' own named
  exception, and the line-count neutrality means no sibling's `W9.md:NNN` coordinate is displaced.
- **Commit families (axis 4).** Every §Commit Plan row maps to exactly one commit except row 5,
  which is two: `a692069f` then `5ba934fc`. Read at the bytes, `5ba934fc` is a **truthfulness
  correction** — the narrowed reads' messages said *"read past the end"* for a fault that is
  actually a hole in a caller's array — and it is its own meaning; `--amend` would have rewritten a
  tip three sibling seats already shared, which the standing law forbids. **Lawful, INFO not
  defect.** Row 9 and row 11 were never taken (CH1.3 D-1). Row 12's family is intact in one commit
  (`8f0a0e79` → 5 packets ⊕ 5 `INBOX.md` rows ⊕ the evidence file, 7 files / 978 insertions).
- **No peer-repo byte (RD-11).** ⟨cmd⟩ `ls` over the keyframes V lane, the glass BK lane and the
  atlas P lane for any `*2026-09-18*value*` packet → **no matches**; the one 09-18 file in BK is
  **glass's own outbound to us** (`glass-outbound-2026-09-18-valuejs-o26-reply.md`), not a write by
  this wave.
- **E13 mail (axis 6).** A **per-row status-cell** `awk` over `INBOX.md` — never a bare line grep
  (LW-5's own lesson) — returns **3 UNREAD**: **I-32 · I-33 · I-34**. Each one's **Routing cell**
  was read whole at this seat: I-32 → *"the X formation mail seat / X-W0.j … and X-EXT-1..6"*;
  I-33 → *"the X formation mail seat, which relays each sibling's section to that sibling's lane"*;
  I-34 → *"X-W0.j / X-EXT-1, beside I-32. **Not X·P's, not a value.js act today**"*. **None routes
  to the library band, the 4.1 cut, the parser, `./transform`, `./math` or the five packets.**
  **0 UNREAD in X-W9's scope — this wave does not close with unread mail.** Re-swept at the new
  HEAD `8116cefd` after the sibling's `INBOX.md` append: the same three rows, unchanged; the two
  added lines are Track C's F.W3 sweep line, not a row.
- **The four-verb line (axis 7).** AUDITED and SPECIFIED unmoved; IMPLEMENTED moved to
  **PARTIAL 2026-09-17** with its reason; **VERIFIED unmoved at `no`**, which is correct — §R-A of
  `W11.md` reserves that stamp to X-W11 alone and this seat confirms the close did not reach for
  it. **Moved lawfully.**
- **The record's published figures (axis 9).** Re-measured here: the 55 `npm run lint` problems
  (⟨cmd⟩ every carrier outside `docs/tranches/**` → **none**), the 13 failed / 600 passed vitest
  tally with its per-file split (`v4-css-emerging` **10** · `v4-c1` **1** · `spectrum-luma` **1**
  inherited · `reka-binding-idiom` **1** inherited), the 3 `npm run typecheck` errors, the union's
  71 paths, the `_2` 60/26, the bare-`declare` 20, the max-LoC 672. **Every one reproduces.**

### CH1.3 Defect register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** | **Seven RED gates have no relief of the kind the bar admits — G21 · G22 · G23 · G24 · G28 · G29 · G32** — and with them the spec's own **Goal criterion clause 4** is FALSE at the bytes. The close's relief is §Disjointness' sequencing of `.f`/`.h` behind X-W4's close. That sequencing is **real and was obeyed correctly** — a seat that had written `eslint.config.js` or `ConsoleRail.vue` while X-W4 reads OPEN would have committed the §4a violation this wave exists to avoid — but it is **deferral, not relief**: the spec assigns the 4.1.0 cut and the descriptor re-key to **this wave's own units**, not to a producer (nothing here is glass-coupled — §COMPLETABLE 2) and not to a successor (X-W11 *consumes* the 4.1.0 tuple, it does not author it). A gate that its own wave can still turn is an unfinished gate | ⟨cmd⟩ `require('./package.json').version` → **`4.0.0`**, no 4.1.0 tag · `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/` → **0** · `'toHex' in color` → false · `easing(k)` identity **false 4/4** · `bench-table-4.1.md` **absent** · `ConsoleRail.vue` still prefix-matches at HEAD's own blob · G24 `ERR_MODULE_NOT_FOUND`. **§Dispositions CC-088 reads *"BUILD at X-W9.f — same dated cut as CC-084; **a ninth carry may not happen**"* — the close's own G21 cell reads *"**Ninth carry**"*. The prohibition is violated in fact, by nobody's error** | **A repair round, not a rewrite.** When X-W4 closes, re-dispatch **X-W9.f** and **X-W9.h** under the same spec, then re-check. This is the tranche's own settled idiom for exactly this shape: **X.KF.W8 CHECK 1 returned NOT-CONFORMANT** for *"eleven gates RED with no relief because units e-h never ran"*, repair-1 (`fdcee4cc`) ran them, CHECK 2 (`369a31f5`) promoted the row; **X-W3** took the same path through Repair 1. Until then the row stays **PARTIAL** and X-W11 stays lawfully shut behind its own *"X-W0 … X-W10 are IMPLEMENTED"* conjunct |
| **D-2** | **HIGH** | **§Format And Lint Cadence is not met, and eleven of the thirteen RED tests plus the third type error are this wave's own** — correct cures colliding with artifacts that assert the pre-cure shape. The tree at HEAD does not typecheck | ⟨cmd⟩ `npx vitest run` (×2, identical) → **`Tests 13 failed \| 600 passed (613)`**, of which `test/v4-css-emerging.test.ts` **10** and `test/v4-c1.test.ts` **1** are this wave's; ⟨cmd⟩ `npm run typecheck` → **exit 2**, `test/parser-totality.test.ts:89,146` TS2322 + `test/v4-css-emerging.test.ts:12` TS2459. ⟨cmd⟩ `npm run lint` → 55, **every carrier under `docs/tranches/**`**, zero under `src/` or `test/` | **ONE bounds grant, not four asks.** `test/v4-css-emerging.test.ts`, `test/v4-c1.test.ts` and `fixtures/public-types/value-v4.ts` are **absent from §File Bounds entirely** and `test/parser-totality.test.ts` is in no unit's set; each takes **one mechanical edit** (repoint + unwrap · delete 6 retired names and add the 2 new · delete 14 stale lines · widen one annotation). Grant them to X-W9.f's repair and the cadence goes green in the same round as D-1. **No seat masked this: four units raised it independently and not one wrote a `test.skip`** |
| **D-3** | MINOR | **G14 moved REDDER over a wave that owns it** — `_2` occurrences 58 → **60**, lines 25 → **26** | ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60** (double-run) | Mitigated: the close declares it as **LW-1**, X-W9.d measured the root (the dts rollup keys its entity cache on the **import-specifier string**, so the copy rides in from `src/value.ts`'s `"./color/index"` spelling, reproducible from no module under `src/css/`), and the +2 is the forced consequence of publishing `serializeCssValue`, which **G15 required**. Owner named: a writer for `src/value.ts`/`src/quantize.ts`/`src/easing.ts` (ESC-W9d-DTS-SPELLING). **Does not block** |
| **D-4** | MINOR | **`coverage-by-export.md` publishes a denominator the settled bytes no longer carry** — headline **73 / 73 = 100.0%** and **70 / 73 = 95.9%** where its own committed command now reads **74 / 75** and **71 / 75**. G19's falsifier is, verbatim, *"change the denominator without re-recording it"* | ⟨cmd⟩ `node …/coverage-by-export.mjs` → `TOTAL 74 / 75 = 98.7%` · `TOTAL 71 / 75 = 94.7%`; ⟨cmd⟩ `grep -nE '73' …/coverage-by-export.md` → `:65` `**73 / 73 = 100.0%**`, `:78` `**70 / 73 = 95.9%**` | Mitigated: the **command** is committed beside the prose and re-records honestly, which is why the gate reads GREEN at this seat's own run; the close declares the gap as **LW-4** with its owner. Cure: a dated **addendum-beside** re-publishing at 75 (E-3 — never a rewrite of the committed document). **Does not block** |
| **D-5** | INFO | X-W9.d's receipt calls **672** *"below the spec's ≤609 target"*; 672 > 609. The **gate** is green by its own pass condition (*"may not increase"*, 672 < 899) and the new max is not a split product but `src/transform/path.ts`, which X-W9.b grew and **booked first and correctly** | ⟨cmd⟩ `wc -l` → 672 · 539 · 519 · 476 · 377 | Already corrected in-record as **LW-2**; E-3 keeps both receipts immutable. Nothing owed |
| **D-6** | INFO | Three unit receipts publish `0 UNREAD` from a pattern the bold `**UNREAD` spelling defeats | this seat's per-row status-cell `awk` → **3** (I-32 · I-33 · I-34), every Routing cell read whole and every one routed away from this wave | Declared as **LW-5**; the **conclusion survives at this seat's own independent scan**. Nothing owed |
| **D-7** | INFO | **G33's *"sent"* means AUTHORED + ROWED** — the five letters are not copied into the counterparties' trees | ⟨cmd⟩ `ls` over the three peer coordination lanes for a 09-18 value packet → **no matches** | This is **RD-11's own mechanism**, quoted in §COMPLETABLE 3 — *"the wave closes when the packets are sent, not when peers adopt"* — and the close books it as **R-6** with the carrying hands named (KF-WRITE §0j.C, the constellation mail seat). Nothing owed by this wave |

**Zero BLOCKER. Zero CRITICAL. Two HIGH.** Both HIGH rows are cured by **one repair round**, and
both name the same natural writer.

### CH1.4 The honest-RED set — seven gates, each with its relief cited

These seven RED gates **are** relieved at the spec's own bytes and are **not** counted against the
wave:

| gate | relief, cited | owner named in the record |
|---|---|---|
| **G1** | **Spec-internal mutual exclusion, not a library defect.** §Hard Gate G27 orders the six symbols **deleted** (*"no shim, no forwarding export"*) while §File Bounds orders the probe **`execute, no write (re-run unmodified)`** — and the probe calls `TR.decomposeMatrix3D` unconditionally at `:74`. Both cannot hold. The 22 assertions the probe reaches before the crash are **all `ok`**, and its remaining legs are each superseded by a gate that is GREEN (MTS-06 → G11, measured GREEN here) or RED under its own escalation (MTS-08 → G15 GREEN, MTS-09 → G13). **CC-096**, FOLDED into this wave by §Dispositions, orders the equivalence band (G1–G4) read **staged**, and it is | ESC-W9a-PROBE-UNRUNNABLE (.a, confirmed by .b) → the sitting, two named options |
| **G3** | **The gate's name and its cited leg measure different classes**, settled by a control both legs share: `coerceToSyntax` is `ok` on MTS-01 (two declared arguments) and throws on LIB-02 (one), same bytes, opposite readings. LIB-02 applies `[undefined, null, 42, {}, [], "", NaN]` as a **first argument**, so it reads arity and shape violations of the published `.d.ts`, not parse-derived-key lookups. The class G3 **names** is cured and independently measured: a 13-value **string** corpus over every function of all seven subpaths → **0 throws** from the eleven public parse/serialize entries. Read staged per **CC-096** | ESC-W9a-G3-LEG-SCOPE (.a) → the sitting; the remainder attributed by file, incl. `src/css/syntax.ts`, **absent from §File Bounds entirely** |
| **G5** | **90 of 94 retired** (grammar 72 → 0, stylesheet 18 → 0). The remaining **4** are all `src/css/timeline.ts`, which §File Bounds lists `modify` at the wave level but which **no unit's writable set contains**. A seat that wrote it would have written outside its bounds — an ESCALATION by the standing law | ESC-W9a-TIMELINE-NNA (.a) → the sitting, to assign the file; the cure is named and four lines long |
| **G12** | **LEG1 — the leg the barrels own — is GREEN** (`ok`, the exact two names the falsifier lists). LEG2 is the **root specifier**, which lives in `package.json` (X-W9.f's file) and whose absence is **a position this repo already SENT**: **O-12**, 2026-07-27, told atlas in writing that *"the root stays retired, no shim for any consumer"*. §Triumvirate Dispatch names this exact shape as an **adjudication**, not an edit — *"that means the exports map, not the barrels, is the defect"* — and the probe's own header allows *"declaring the root retired is a legitimate GREEN"* | ESC-W9d-ROOT-AND-SYNTAX (a) (.d) → the sitting, two named options |
| **G13** | **33 → 20, thirteen retired.** The remaining 20 have a root the gate's model does not name and **no unit's writable set contains**: the dts rollup's entity cache keys on the **import-specifier string**, so the declarations arrive under `src/value.ts` / `src/quantize.ts` / `src/easing.ts` spellings. X-W9.d tried **three** re-export variants inside its own files and measured all three ineffective — the measurement, not a claim | ESC-W9d-DTS-SPELLING (.d) → the sitting: name a writer for those three files, or rule G13/G14 staged per CC-096 |
| **G14** | Same root as G13, plus the +2 that **G15 required** (see D-3) | ESC-W9d-DTS-SPELLING (.d) → same |
| **G20** | **The behavioural half landed and its falsifier fires in both directions** — verified by X-W9.e as legs A/B/C over a doctored tarball, and the hardcoded `strictTypes: 62` is gone. The command dies **before** reaching that half, on `fixtures/public-types/value-v4.ts`, which is **absent from W9.md §File Bounds entirely** and which **already failed at `fdebfef5`, before this unit touched anything** | ESC-W9e-FIXTURE-V4TYPES (.e) → the sitting; 14 stale lines, one deletion. Same class as ESC-W9b-V4C1-SNAPSHOT |

**Seven relieved. Seven unrelieved — G21 · G22 · G23 · G24 · G28 · G29 · G32 — which is D-1.**

### CH1.5 The successors' `Opens after` conjuncts, measured against this wave

| successor | its conjunct naming X-W9 | state at these bytes | verdict |
|---|---|---|---|
| **X-W10** | *"X-W5, X-W6, X-W7, X-W8, X-W9 **stable** (surviving structure fixed) AND the CC-104 precondition ruled"* | X-W9's **library** structure is fixed and measured (PSL-1 derived, the boundary `ok`, the god module split, the ratchet fallen 899 → 672); its **published surface** is not (`package.json` 4.0.0, `.f` unrun). ⟨cmd⟩ the ledger reads **X-W5 `planned` · X-W6 `planned` · X-W7 `planned` · X-W8 `planned`** | **LAWFULLY BLOCKED — and not by this wave.** Four of the five conjuncts are `planned`; X-W10's own row already reads `BLOCKED-ON`. This check moves nothing for it |
| **X-W11** | *"X-W0 … X-W10 are **IMPLEMENTED** (four-verb law; not 'closed', not 'reported')"*, and §Dependencies makes *"the 4.1.0 tuple its input"* | `W9.md` §State reads **IMPLEMENTED: PARTIAL**, not `yes`; the 4.1.0 tuple **does not exist** | **LAWFULLY BLOCKED on this wave**, and the block is load-bearing: it is the structural guard that keeps the un-taken cut from being inherited as done. **This is the second reason the row must not read `CLOSED` today** — the ledger's own vocabulary puts `CLOSED` *downstream* of `IMPLEMENTED`, so a `CLOSED` row would read to a later seat as a satisfied X-W11 conjunct while `package.json` still says `4.0.0` |

### CH1.6 The spec's own Goal criterion, at the bytes (axis 8)

| clause | reading at this seat | verdict |
|---|---|---|
| 1 — *"no public entry throws on a string"* | 13-value string corpus × every function of all 7 subpaths → **0 throws** from the eleven public parse/serialize/easing entries; G28's R1 leg **31 calls · 0 throws** | **TRUE** |
| 2 — *"no public signature returns a value its own `.d.ts` forbids"* | G8 `0 · 0 · 0 · 5` all finite · G9 `null` 3/3 · G11 70 passed · G15 `Result`-typed | **TRUE on every leg the wave touched** |
| 3 — *"every type a subpath returns is nameable from that subpath"* | **TRUE at the consumer** (G12 LEG1 `ok`) · **FALSE in the emitted bytes** (20 bare `declare`, G13) | **SPLIT** |
| 4 — *"ships as one dated 4.1.0 cut whose exact-pin consumers were notified by packet before the tag"* | the **packets were sent** (5 authored, 5 rowed, the exact pin quoted before any tag) · the **cut was not taken** (`4.0.0`, no tag) | **FALSE** |

**The goal criterion is NOT met.** The close says so in its own words — *"The wave delivered the
surface and withheld the event"* — and this seat, measuring independently, agrees. That honesty is
why this check returns NOT-CONFORMANT rather than a defect of integrity: **nothing here is hidden,
and nothing here is finished.**

### CH1.7 Superlatives, reported with the same provenance duty as defects (L-18)

- **The RED-first guardrail actually held.** ⟨cmd⟩ `git show c18a78f8 --stat -- src/` → **0 lines**.
  The battery landed alone, 120 of 123 failing, with its 496-line capture committed. After three
  prior closures of this class against surfaces that did not hold it (§Archaeology), this is the
  first time the instrument preceded the cure in the history.
- **Zero try/catch in the entire product tree.** ⟨cmd⟩ `grep -rn 'catch' src/` → nothing. Every
  cure is a narrowing or a typed failure; the crash **shape** was removed, not the instance.
- **Escalation discipline is the wave's best feature.** Twelve escalations, each naming its file,
  its measured cause and a one-edit cure — and **seven of them name a file §File Bounds never
  listed**. Four units found the same structural omission independently and **not one of them
  wrote outside its bounds to make a gate green**. That is the behaviour the standing law asks for,
  and it is the reason this check can be short.
- **X-W9.c's shipped loop bodies were chosen by measurement, not taste** (five candidate bodies
  benchmarked, two shipped, 33,169 `Object.is` comparisons at 0 mismatches), and **X-W9.d's split
  was proven behaviour-neutral** (933 cases · 0 mismatches, 59 round-trips · 0 failures) before it
  landed. Neither was asked for by a gate.

### CH1.8 Disposition

**NOT-CONFORMANT.** The row **stays `PARTIAL 2026-09-17`**; this seat sets no `CLOSED` stamp and
moves no verb. Nothing is asked of the units that ran: their bounds are clean, their gates
reproduce, and their honesty is the reason this verdict could be reached in one pass. What is owed
is **one repair round behind X-W4's close** — `X-W9.f` and `X-W9.h` re-dispatched under the same
spec, carrying with them the single bounds grant D-2 names — and then **CHECK 2**.

**This check wrote no cure byte, moved no gate, and edited no spec.** Its only writes are this
section and one appended ledger event line.

## Repair 1

SERVED MODEL: `claude-opus-5[1m]` · **REPAIR SEAT, round 1.** Dispatched against Check 1's register.
Every figure below is read from the settled bytes and **double-run**. This seat wrote **four paths**,
all inside the wave's own surface: `test/parser-totality.test.ts` (§File Bounds `create`, X-W9.a's
`Files` list), `docs/tranches/X/waves/evidence/W9/coverage-by-export.addendum-2026-09-18.md`
(§Verification Artefacts' own directory), this section, and one appended ledger event line.
**It wrote no `src/` byte, no `eslint.config.js`, no `package.json`, no `ConsoleRail.vue`.**

**DISPOSITION: the row stays `PARTIAL 2026-09-17`.** One defect of four is cured outright (**D-4**),
one is cured on the single carrier §File Bounds admits and **escalated** on the other three
(**D-2**), and the round's two structural defects (**D-1**, **D-3**) are **escalated with their
measured reasons**: their cures lie behind a sequencing condition that is **still false at this
seat's own re-read**, and behind files the spec never listed. **No gate was masked to close this
round and no verdict moved.**

### R1.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` at entry → **16 rows**. Filtered against this seat's writable set
(⟨cmd⟩ `git status --porcelain -- test/parser-totality.test.ts
docs/tranches/X/waves/evidence/W9/ docs/tranches/X/execution/A/X-W9.md
docs/tranches/X/execution/LEDGER.md`) → **empty**. **Nothing inherited; nothing stashed; nothing
restored; no blanket anything.**

The one dirty row that *names* a path in this wave's §File Bounds is
`demo/picker/controls/ComponentSliders/ConsoleRail.vue`, and it was read whole before being left
alone: ⟨cmd⟩ `git diff -- …/ConsoleRail.vue` → **two hunks, both X-W4's and both self-labelled** —
`X-W4 · A1 (CC-040) — THE FINE-POINTER FLOOR` (`min-inline-size`/`min-block-size: 1.5rem` on
`.channel-rail-item`) and `X-W4 · A2 (CC-040)` (the touch rung's media condition widened to
`(max-width: 1023px), (pointer: coarse)`). **Zero lines touch `componentDescription()` at
`:172-180`, which is X-W9.h's carve.** This is a **live sibling seat's** work, not a killed
predecessor's on this unit; it is left exactly as found. `scripts/dev/dev.sh` never touched, never
staged, never read for edit.

HEAD moved under this seat during the round (`f208ff31` → **`6a73542b`**, a Track-B ledger
commit rowing KF.W11–W13). ⟨cmd⟩ `git diff --stat f208ff31..6a73542b -- src/ test/ scripts/
docs/tranches/X/waves/W9.md docs/tranches/X/execution/A/X-W9.md` → **prints nothing**. No subject
of any reading below moved under this seat.

### R1.1 Defect → cure → commit → gate re-reading

| id | sev | disposition | commit | gate re-reading |
|---|---|---|---|---|
| **D-1** | HIGH | **ESCALATED — precondition still false** (R1.2) | none | G21 G22 G23 G24 G28 G29 G32 **unmoved, all RED**, re-read at this seat's own commands |
| **D-2** | HIGH | **CURED on its one in-bounds carrier · ESCALATED on the other three** (R1.3) | `4a27a65d` | `npm run typecheck` **3 errors → 1** (double-run); G2 **123 passed (123)**, ×2, still GREEN; `npx eslint test/parser-totality.test.ts` **exit 0**; `npm run lint` **55**, carriers outside `docs/tranches/**` → **0** |
| **D-3** | MINOR | **ESCALATED — no in-bounds cure exists, measured** (R1.4) | none | G14 **60 / 26 lines**, unmoved |
| **D-4** | MINOR | **CURED — dated addendum-beside (E-3)** (R1.5) | `e4d98aca` | G19 **exit 0**, `74 / 75 = 98.7%` and `71 / 75 = 94.7%`, double-run `diff -q` silent; the published prose now carries the same denominator its own command reads |
| D-5 · D-6 · D-7 | INFO | **nothing owed** (Check 1's own words), and nothing taken | none | — |

**Cured: 1 of 4 outright (D-4), 1 partially (D-2). Escalated: 3.**

### R1.2 D-1 — the cure's precondition is still false, re-read at this seat's own command

Check 1's cure for D-1 is not a code change. It is, verbatim: *"When X-W4 closes, re-dispatch
X-W9.f and X-W9.h under the same spec, then re-check."* That condition was **re-read immediately
before this act and is unmet**:

```
⟨cmd⟩ grep -n '^| X-W4 ' docs/tranches/X/execution/LEDGER.md   → :33  | X-W4 | X-W0 | **OPEN 2026-09-17** |
⟨cmd⟩ grep -n '^| X-W8 ' docs/tranches/X/execution/LEDGER.md   → :38  | X-W8 | W4·W5·W6·W7 | planned |
```

`W9.md` §Disjointness sets the condition as *"X-W9.f sequences after both X-W4 and X-W8 close, **or
runs while neither is open**"*. X-W8 is `planned` — free. **X-W4 is OPEN**, so neither limb holds,
and X-W9.h's own gate (*"X-W9.h sequences after X-W4 closes, or runs while X-W4 is not open"*) fails
on the same row. The working tree corroborates the ledger rather than merely echoing it: X-W4's seat
has **uncommitted CC-040 work in `ConsoleRail.vue` right now** (R1.0).

**Why the unit cannot be split to get part of it.** The obvious half-measure — take the 4.1.0 cut's
SHIP limb now (`src/color/*`, `src/easing.ts`, `src/subpaths/*`, `package.json`, `CHANGELOG.md`,
none of which X-W4 holds) and defer only the LINT limb to `eslint.config.js` — is **forbidden by the
spec's own commit plan**, not by caution. §Commit Plan row 9 reads:

> `feat(4.1.0): SCI-1 + toHex + easingNames + restored analytic arms` | yes — the atlas evidence
> tuple **and the two scoped `no-non-null-assertion` rule objects (§4a) ride here**

The `eslint.config.js` edit is declared part of **that one commit**, and the standing law is
*"commit families the spec declares must not split."* So the file-scoped sequencing propagates to
the whole unit: with `eslint.config.js` locked, the cut commit cannot be authored at all. The same
holds for X-W9.h, whose §Commit Plan row 11 (`fix(demo/console-rail): exact channel-id descriptor
lookup`) binds `demo/color-session/colorSpaceInfo.ts` — which is free — to `ConsoleRail.vue` —
which is not. Landing only the free half would leave G32 RED *and* split a declared family, buying
nothing. **Two independent prior seats (close, Check 1) read the deferral the same way; this seat
makes a third reading and agrees.**

**ESC-W9R1-SEQUENCING** — *D-1 is re-dispatch-ready and precondition-blocked.* Nothing in it is
mis-specified, mis-rooted or contested; it needs **X-W4 to close**, then one dispatch of X-W9.f and
X-W9.h under the unchanged spec. Seven gates move with it: G21 G22 G23 G28 G29 G32 by construction,
and G24 only if **ESC-W9-G24-SUBSTRATE** is also relieved (⟨cmd⟩ `node
docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` → **`ERR_MODULE_NOT_FOUND`**
on `…/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js`; curing that would require
writing a **peer tree**, which RD-11 and the standing law both forbid).

### R1.3 D-2 — one carrier cured, three escalated for want of a bounds grant

Check 1's cure names **four** files and asks for **one bounds grant**. The grant was **not given to
this seat**, and the standing law is explicit: *"if a defect's only cure lies outside bounds, record
it as an escalation with the measured reason."* The four were therefore tested one by one against
`W9.md` §File Bounds:

| carrier | in §File Bounds? | this seat |
|---|---|---|
| `test/parser-totality.test.ts` | **YES** — §File Bounds row `create`, and X-W9.a's `Files` list names it | **CURED**, `4a27a65d` |
| `test/v4-css-emerging.test.ts` | **no** — ⟨cmd⟩ `grep -c 'v4-css-emerging' docs/tranches/X/waves/W9.md` → **0** | **ESCALATED** |
| `test/v4-c1.test.ts` | **no** — same command, **0** | **ESCALATED** |
| `fixtures/public-types/value-v4.ts` | **no** — same command, **0**; and §File Bounds' Do-NOT-touch reasoning gives no writer | **ESCALATED** |

Check 1 asserts *"`test/parser-totality.test.ts` is in no unit's writable set"*. **That one line of
Check 1 is wrong, and this seat corrects it at the bytes rather than inheriting it** (E-3: Check 1
stays immutable; this is the dated correction beside it). ⟨cmd⟩ `grep -n 'parser-totality'
docs/tranches/X/waves/W9.md` → **`:91` `| `test/parser-totality.test.ts` | create (RED-first
battery) |`** (§File Bounds) and **`:195`**, the continuation of X-W9.a's own **Files** line, which
names it explicitly. It is squarely in bounds, which is why it could be cured here.

**The cure, root-cause not mask.** `call<T>(fn: () => ParseResult<T>): ParseResult<T> | Error`
narrowed the battery's capture helper to **one** result shape while the battery drives
heterogeneous entry tables — `parseCssColor` ⊕ `parseCssScalar` (§1), the six `PROTO_ENTRIES` (§3)
— whose call yields a **union** of result types, and `easing()` returns a `Result`, not a
`ParseResult`. Each union call site inferred `T` from its first member and rejected the rest. The
same narrowing had already forced `easing(name) **as never**` at §5 — a type lie inside a battery
whose entire subject is type honesty. The helper now takes the thunk's own return type,
`<T>(fn: () => T): T | Error`; the then-unused `import type { ParseResult }` goes with it and the
`as never` cast is **deleted**.

**No assertion was touched, no test skipped, nothing narrowed.** Every assertion in the file is
`threw(...)` / `toHaveProperty("ok")` / `toMatchObject`, so the totality claim never depended on the
helper naming one result shape. ⟨cmd⟩ `git show 4a27a65d --stat` → **1 file, `test/parser-totality.test.ts`**.

```
⟨cmd⟩ npm run typecheck   BEFORE  exit 2, 3 errors:
        test/parser-totality.test.ts(89,40)  TS2322
        test/parser-totality.test.ts(146,44) TS2322
        test/v4-css-emerging.test.ts(12,10)  TS2459  serializeCssValue not exported from ../src/css/stylesheet
⟨cmd⟩ npm run typecheck   AFTER   1 error (run A prints only test/v4-css-emerging.test.ts;
                                  run B counts 1) — the survivor is the out-of-bounds carrier
⟨cmd⟩ npx vitest run test/parser-totality.test.ts  →  123 passed (123), twice   [G2 GREEN, unmoved]
⟨cmd⟩ npx eslint test/parser-totality.test.ts      →  exit 0
⟨cmd⟩ npx vitest run  (x2, identical)  →  Tests 13 failed | 600 passed (613); Test Files 4 failed | 32 passed (36)
⟨cmd⟩ npm run lint    →  55 problems (23 errors, 32 warnings); carriers outside docs/tranches/** → 0
```

**§Format And Lint Cadence remains NOT met**, honestly and visibly: `typecheck` is exit 2 on one
error and `vitest` is 13 failed. The thirteen split exactly as Check 1 measured — `v4-css-emerging`
**10**, `v4-c1` **1** (both this wave's correct cures colliding with artifacts that assert the
pre-cure shape, both out of bounds), `spectrum-luma` **1** and `demo/test/shell/reka-binding-idiom`
**1** (both **inherited**, neither this wave's). **This seat masked none of them**, exactly as the
four units before it did not.

**ESC-W9R1-BOUNDS-GRANT** — *the three carriers, with their one-edit cures named.* `test/v4-css-emerging.test.ts`
(repoint the `serializeCssValue` import to the module that now exports it, and unwrap the call
sites the split moved), `test/v4-c1.test.ts` (delete the six retired matrix names from the surface
snapshot and add `serializeCssValue` ⊕ `isAnyColor`), `fixtures/public-types/value-v4.ts` (delete
the 14 stale lines naming `DecomposedMatrix2D` `DecomposedMatrix3D` `Mat4` `Vec4` — this one also
unblocks **G20**, per Check 1 §CH1.4 and ESC-W9e-FIXTURE-V4TYPES). **A grant of these three paths
to X-W9.f's re-dispatch turns the cadence green in the same round as D-1** — which is what Check 1
asked for, and which this seat cannot self-grant.

### R1.4 D-3 — no in-bounds cure exists, and that is measured rather than asserted

G14 re-read here, double-run: ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts | wc -l` → **60**;
⟨cmd⟩ `grep -c '_2' dist/subpaths/css.d.ts` → **26**. Unmoved.

X-W9.d measured the root: the dts rollup keys its entity cache on the **import-specifier string**,
so the duplicate declarations ride in under `src/value.ts`'s `"./color/index"` spelling — and the
unit tried **three** re-export variants inside its own files and measured all three ineffective.
The two files that carry the spelling, `src/value.ts` and `src/quantize.ts`, are **absent from
§File Bounds** (⟨cmd⟩ `grep -c 'src/value.ts\|src/quantize.ts' docs/tranches/X/waves/W9.md` → **0**).
The third, `src/easing.ts`, **is** in bounds but is not where the spelling lives. There is therefore
**no edit this seat could lawfully make that moves this number**, and the +2 over the wave is the
forced consequence of publishing `serializeCssValue`, which **G15 required**.

Carried as **ESC-W9d-DTS-SPELLING**, unchanged and unrelieved: name a writer for `src/value.ts` /
`src/quantize.ts`, or rule G13/G14 staged per **CC-096**. Check 1 grades it *"does not block"*, and
this seat concurs at its own reading.

### R1.5 D-4 — cured, by the wave's own addendum idiom

`docs/tranches/X/waves/evidence/W9/coverage-by-export.addendum-2026-09-18.md`, commit `e4d98aca`.
`coverage-by-export.md` published **73 / 73 = 100.0%** and **70 / 73 = 95.9%** over a runtime
denominator of **73** and a declared-name denominator of **131**, all measured in X-W9.e's worktree
at `fdebfef5` — which carried `.a` and `.b` but **not** `.d`. G19's falsifier is, verbatim,
*"change the denominator without re-recording it."*

**E-3 honoured: the committed document is byte-untouched.** The addendum sits beside it, the same
way `math-precondition.after-addendum-2026-09-18.txt` already sits beside X-W9.c's evidence.
⟨cmd⟩ `git show e4d98aca --stat` → **1 file, the addendum**.

```
⟨cmd⟩ node docs/tranches/X/waves/evidence/W9/coverage-by-export.mjs   →  exit 0  (twice; diff -q silent)
    declared export names        131 → 146
    runtime exports               73 → 75
    whole suite                  74 / 75 = 98.7%      uncovered: isAnyColor
    minus the v4-c1 snapshot     71 / 75 = 94.7%      + isLayoutTrackingUnit, collectDeclarations, parseKeyframeSelector
    first-party modules visited outside src/:  78 (whole) · 77 (minus snapshot)  — both unmoved
```

**Cause measured, not inferred.** ⟨cmd⟩ `git log --oneline -S'serializeCssValue' -- src/subpaths/css.ts
src/css/index.ts` and ⟨cmd⟩ `git log --oneline -S'isAnyColor' -- src/` **both** name `c8848bed`
(X-W9.d, PSL-1). `./css` +1 is `serializeCssValue`, whose publication **G15 required**; `./color`
+1 is `isAnyColor`, carried onto the barrel by the derivation and named at `src/color/index.ts:10`.
Neither is drift; both are a gate's own consequence, now recorded.

**G19 stays GREEN** on the basis it was already green at Check 1 — the command is committed beside
the prose — and is now green with its prose re-recording the denominator the command reads.
**PUBLISHED, NOT GATED** still holds: no threshold is asserted here either.

### R1.6 E13 mail — 0 UNREAD in scope, re-swept at this seat's own commands

A **per-row status-cell** scan (never a bare line grep — LW-5's lesson) over
`docs/tranches/V/coordination/INBOX.md` → **3 UNREAD: I-32 · I-33 · I-34**, the same three Check 1
found, each Routing cell read whole here: I-32 *"Zero parse-that bytes; not X·P's to dispose"*
→ X-W0.j/X-EXT; I-33 *"names no parse-that byte and asks value.js for nothing beyond relay"*;
I-34 *"no obligation is minted here"* → X-EXT-1 inside X-W4.g's atomic cut. **None routes to the
library band, the 4.1 cut, the parser, `./transform`, `./math` or the five packets.**

Four-path sweep for anything new since the close: ⟨cmd⟩ `ls -t docs/tranches/V/coordination/`
→ newest are this wave's own five 09-18 packets ⊕ the two `valuejs-outbound-2026-09-18-kfw7-bh-relay`
files; ⟨cmd⟩ `find ../{keyframes.js,glass-ui,atlas,fourier-analysis,parse-that}/docs -name '*2026-09-1[89]*'`
→ the only inbound is `../glass-ui/…/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md`,
which is **already rowed as I-35** and whose own cell routes it *"X·KF (Track B), NOT X-W1"*.
**0 unrowed · 0 `I-n` minted · 0 UNREAD in X-W9's scope.** This round closes with no unread mail.

### R1.7 What Repair 1 changed, stated so no successor over-reads it

- **The wave's verdict did not move.** 19 GREEN · 14 RED of 33 stands. **No gate went RED→GREEN in
  this round**; G2 and G19 were GREEN before it and are GREEN after, and G19's *published prose* —
  not its verdict — is what the round repaired.
- **`npm run typecheck` fell from 3 errors to 1**, and the survivor names a file the spec never
  listed. That is the whole of the cadence movement available inside bounds.
- **The row stays `PARTIAL 2026-09-17`.** X-W11 stays lawfully shut behind its own *"X-W0 … X-W10
  are IMPLEMENTED"* conjunct, which is the structural guard that keeps the un-taken 4.1.0 cut from
  being inherited as done. `package.json` still reads `4.0.0` and there is no tag.
- **Owed, unchanged and now with two named escalations**: X-W4 closes → **ESC-W9R1-SEQUENCING**
  (re-dispatch X-W9.f and X-W9.h under the unchanged spec) carrying **ESC-W9R1-BOUNDS-GRANT** (the
  three test/fixture paths) → **CHECK 2**. `ESC-W9-G24-SUBSTRATE` and `ESC-W9d-DTS-SPELLING` ride
  into that round unrelieved, both naming trees this wave may not write.

### R1.8 Correction at the bytes — this seat's ledger act landed inside a sibling's commit

**Recorded rather than quietly absorbed.** §Repair 1's preamble and R1.1 describe this seat's
ledger write as its own act. At the bytes it is **not its own commit**: between this seat writing
`LEDGER.md` and staging it, a **Track-B** seat ran a pathspec commit that named `LEDGER.md`, and
because this seat's edit was still *unstaged in that same file*, it was swept in.

```
⟨cmd⟩ git log --oneline -1            → 9101f343  docs(X·exec): KF.W10 BLOCKED-ON OP-6 — baseline banked, 7 units planned (undispatched)
⟨cmd⟩ git show 9101f343 --stat        → INBOX.md +2 · execution/B/KF-W10.md +194 · execution/LEDGER.md 8 ±
⟨cmd⟩ git show 9101f343 -- …/LEDGER.md | grep -c '^+.*REPAIR 1 2026-09-18'   → 1
```

**Nothing was lost in either direction, and both readings are measured, not assumed:**

```
⟨cmd⟩ git show HEAD:…/LEDGER.md | grep -c 'REPAIR 1 2026-09-18'        → 3   (this seat's row-cell clause)
⟨cmd⟩ git show HEAD:…/LEDGER.md | grep -c 'X-W9 REPAIR 1 (Track A'     → 1   (this seat's event line, :289)
⟨cmd⟩ git show HEAD:…/LEDGER.md | grep -c "repair-1 \`4a27a65d\`"        → 1   (this seat's commits cell)
⟨cmd⟩ git show HEAD:…/LEDGER.md | grep -c 'BLOCKED-ON OP-6'            → 2   (the sibling's own KF.W10 work, intact)
```

This seat **did not clobber the sibling**: its `LEDGER.md` write was a read-modify-write of the
working tree as it then stood, which already carried the sibling's uncommitted KF.W10 row, and that
row was written back byte-for-byte. It also **did not stage, reset or unstage anything of theirs**
— the sweep ran in their process, on their pathspec, not this one's.

**So: this round's four acts are `4a27a65d`, `e4d98aca`, `10f562b4` and — for the ledger — the
LEDGER.md hunks carried inside `9101f343`, which is a Track-B commit.** A later seat reading the
X-W9 row's commits cell will find three hashes there and should read this paragraph for the fourth.

**Lesson, stated because the standing law's own warning is about exactly this file.** The law
measures the hazard in one direction — *"a commit without its own pathspec sweeps in whatever a
sibling seat has staged"* — and both commits here **were** pathspec'd; the sweep still happened,
because a pathspec commit also carries the **unstaged working-tree edits of the paths it names**.
`LEDGER.md` is written concurrently by four tracks, so the safe idiom on it is **write → `git add`
→ `git commit` in one uninterrupted step**, never write-then-measure-then-commit. This seat left a
measuring gap and a sibling's act landed in it.

---

## Check 2

SERVED MODEL: `claude-opus-5[1m]` · **FRESH ADVERSARIAL L-20 PASS 2, VERIFY-ONLY** — this seat
authored **no cure byte, no unit receipt, no line of `## Close`, `## Check 1` or `## Repair 1`**.
Every one of the **33** gates was re-run at this seat's own commands against the settled bytes of
`tranche-u` @ **`f7dae874` → `14b25279`** (a Track-B chassis commit landed mid-pass; ⟨cmd⟩
`git diff --stat f7dae874..HEAD -- src/ test/ scripts/ fixtures/ eslint.config.js package.json
docs/tranches/X/waves/W9.md docs/tranches/X/execution/A/X-W9.md docs/tranches/V/ARCHITECTURE.md
docs/tranches/V/coordination/ docs/tranches/V/megatranche/` → **prints nothing**, so **no subject of
any reading below moved under this seat**), node **v26.0.0**, darwin arm64, 2026-09-18 23:0x–23:1x
EDT. `dist/subpaths/` was verified to BE the settled bytes' build before any surface gate ran
(⟨cmd⟩ `find src -name '*.ts' -newer dist/subpaths/css.d.ts` → **nothing**). Both probes and the
coverage command were **double-run** (⟨cmd⟩ `diff -q run1 run2` → silent, three times).

**VERDICT: NOT-CONFORMANT.** **All 33 gate verdicts reproduce — 19 GREEN · 14 RED, zero divergence
from the close, from Check 1, and from Repair 1's re-readings.** Bounds are clean over **28**
commits and **75** paths, no masking construct exists anywhere in the diff, E-3 holds to the byte,
the four-verb line moved lawfully, and the record is honest about every figure it publishes —
including the four it corrects against itself. The row is **NOT promoted**, for the two reasons
Check 1 named and Repair 1 could not retire: **D-1** (seven RED gates whose only owner is this
wave's own `X-W9.f`/`X-W9.h`, still precondition-blocked on X-W4) and **D-2** (§Format And Lint
Cadence unmet — the tree at HEAD does not typecheck and eleven of this wave's own artifacts are
RED). Both are HIGH; the bar admits zero. **Incomplete, not wrong** — and this pass adds four
independent measurements that make the *incompleteness* sharper rather than the *wrongness*.

### CH2.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` at entry → **15 rows**. ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md` → **empty**; ⟨cmd⟩
`git diff --cached --name-only` → **empty**. **No killed predecessor's partial work on the check-2
seat exists; nothing inherited, nothing stashed, nothing restored, no blanket anything.**
`scripts/dev/dev.sh` is among the fifteen — ⟨cmd⟩ `git status --porcelain -- scripts/dev/dev.sh` →
` M scripts/dev/dev.sh`, **never touched, never staged, never read for edit**. The ten dirty
`demo/**` rows (X-W4 / X-W7 seats), `CARRY-LEDGER.md` and the three untracked X-W1 / X-W4-evidence
paths are sibling seats' and were left exactly as found.

### CH2.1 Every gate re-run at this seat's own commands — 33 of 33 verdicts reproduce

| # | this seat's command → reading | close / Check 1 verdict | reproduces |
|---|---|---|---|
| G1 | ⟨cmd⟩ `node …/probes/src-surface-totality.mjs` ×2, byte-identical → exit 1, dies at `:74` `TypeError: TR.decomposeMatrix3D is not a function`; ⟨cmd⟩ `grep -c '^ok'` → **22**, ⟨cmd⟩ `grep -c '^RED'` → **0** before the crash | RED | **YES** |
| G2 | ⟨cmd⟩ `npx vitest run test/parser-totality.test.ts` → **123 passed (123)** | GREEN | **YES** |
| G3 | LIB-02 → **30** (`value=1 css=19 easing=1 math=6 transform=3`) | RED | **YES** |
| G4 | `ok LIB-01 easing(name) is total over the Object.prototype key set`; control `ease` ok, unknown → `easing_name_unknown` | GREEN | **YES** |
| G5 | ⟨cmd⟩ `npx eslint 'src/css/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'` → **4 problems**, all `src/css/timeline.ts:23:36 :38:36 :71:51 :72:49` | RED | **YES** |
| G6 | ⟨cmd⟩ `npx vitest run test/transform/path-geometry.test.ts` → **43 passed (43)**; probe `ok MTS-03` 4/4 | GREEN | **YES** |
| G7 | probe `ok MTS-04 compact == expanded (31.403311569547547)`, \|Δ\| = **0** | GREEN | **YES** |
| G8 | `getTotalLength` over the four truncated runs → `0 · 0 · 0 · 5`; ⟨cmd⟩ `typeof` → `number` 4/4, `Number.isFinite` → `true` 4/4 | GREEN | **YES** |
| G9 | the guard read at its own commit: ⟨cmd⟩ `git show 474846ce -- src/transform/decompose.ts` → `if (scaleX === 0 \|\| scaleY === 0 \|\| scaleZ === 0) return null;` added above the row-2 division, joining the module's existing null ladder. At the settled bytes the subject is retired by `4be22189` | GREEN at its own commit; SUPERSEDED-BY-G27 | **YES** |
| G10 | ⟨cmd⟩ `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts' --rule …` → **0 problems** | GREEN | **YES** |
| G11 | ⟨cmd⟩ `npx vitest run test/math.test.ts` → **70 passed (70)** | GREEN | **YES** |
| G12 | ⟨cmd⟩ `node …/probes/consumer-surface-compile.mjs` → exit 1 · **2**; `ok LEG1 public return types are nameable from their own subpath`; both LEG2 rows stand (TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED`, the 5 fourier sites named) | RED, LEG1 GREEN | **YES** |
| G13 | ⟨cmd⟩ `grep -c '^declare ' dist/subpaths/*.d.ts` → **20** (`css 6 · value 6 · quantize 6 · easing 2 · color 0 · math 0 · transform 0`) | RED | **YES** |
| G14 | ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60**; ⟨cmd⟩ `grep -c` → **26** lines; probe names the same 5 mangles | RED (redder) | **YES** |
| G15 | `'serializeCssValue' in CSS` → **true**; `serializeCssValue(parseCssValue("a : b").value)` → **`{"ok":true,"value":"a: b"}`** | GREEN | **YES** |
| G16 | ⟨cmd⟩ `find src -name '*.ts' -exec wc -l {} + \| sort -rn` → max **672** (`src/transform/path.ts`); then 539 · 519 · 476 · 377 · 331 | GREEN (ratchet falls 899 → 672) | **YES** |
| G17 | `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` — **0** modules | GREEN | **YES** |
| G18 | `test/v4-color-behavior.test.ts` **8** + `test/color-anchors.test.ts` **12** = **20 passed** | GREEN in bounds | **YES** |
| G19 | ⟨cmd⟩ `node …/evidence/W9/coverage-by-export.mjs` ×2, `diff -q` silent → exit 0, `TOTAL 74 / 75 = 98.7%` and `TOTAL 71 / 75 = 94.7%`, each printed beside its own denominator command | GREEN | **YES** |
| G20 | ⟨cmd⟩ `npm pack --ignore-scripts --pack-destination <scratch>` (dist verified fresh, so the tarball is the settled build) → `node scripts/ci/verify-packed-surface.mjs <tarball>` → exit 1, **4× TS2305** (`DecomposedMatrix2D` `DecomposedMatrix3D` `Mat4` `Vec4`) + **6× TS2339** on `fixtures/public-types/value-v4.ts` | RED | **YES** |
| G21 | ⟨cmd⟩ `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/` → **0** | RED — UNATTEMPTED | **YES** |
| G22 | `'toHex' in color` → **false** · `'easingNames' in easing` → **false** | RED — UNATTEMPTED | **YES** |
| G23 | `easing(k) === easing(k)` and `.value` identity over the four CSS keywords → **false 4/4, both spellings** | RED — UNATTEMPTED | **YES** |
| G24 | ⟨cmd⟩ `node …/probes/fourier-value-import-drift.mjs` → **`ERR_MODULE_NOT_FOUND`** on `…/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | RED, escalation unrelieved | **YES** |
| G25 | `Object.keys(bezierPresets).length` → **30** | GREEN (declared fence) | **YES** |
| G26 | ⟨cmd⟩ `grep -rn 'colorScale\|sampleToSVGPath' src/` → **0** | GREEN (declared fence) | **YES** |
| G27 | `./transform` keys → **`PathGeometry, getPointAtLength, getTotalLength`**; **0** of the six present. Other direction measured at the consumers' own bytes: ⟨cmd⟩ `grep -rn '<the six>' ../keyframes.js/src demo/` → **0**, and `PathGeometry` is imported at `../keyframes.js/src/animation/svg/morph-svg.ts:45` and `morph-geometry.ts:18` | GREEN | **YES** |
| G28 | R1 leg re-run wider than any prior seat (CH2.7 ①): **949 calls · 0 throws from every entry that declares a string parameter**. ⟨cmd⟩ `ls …/evidence/W9/bench-table-4.1.md` → **No such file or directory**; accepted/reject legs unmeasured | RED | **YES** |
| G29 | ⟨cmd⟩ `node -e 'require("./package.json").version'` → **`4.0.0`**; ⟨cmd⟩ `git tag -l \| grep -c 4.1.0` → **0**; ⟨cmd⟩ `grep -n '@mkbabb/value.js' ../keyframes.js/package.json` → `:71 "4.0.0"` | RED — UNATTEMPTED | **YES** |
| G30 | ⟨cmd⟩ `grep -c 'src/parsing' docs/tranches/V/ARCHITECTURE.md` → **0** | GREEN | **YES** |
| G31 | dependencies **exactly** `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `@mkbabb/parse-that` absent from `dependencies` **and** `devDependencies` | GREEN | **YES** |
| G32 | ⟨cmd⟩ `sed -n '170,182p'` on the working tree **and** ⟨cmd⟩ `git show HEAD:…` on the committed blob — **identical**, both still `c.startsWith(upper) \|\| c.startsWith(component)`; `demo/color-session/colorSpaceInfo.ts` still keys `ictcp` `:261` / `jzazbz` `:287` by prose labels | RED — UNATTEMPTED | **YES** |
| G33 | ⟨cmd⟩ `ls docs/tranches/V/coordination/*-inbox-2026-09-18-*.md` → **5**; ⟨cmd⟩ `grep -cE '^\| *O-3[4-8] ' INBOX.md` → **5**; the keyframes packet quotes the exact pin and states *"The 4.1 tag has NOT been cut yet"* at `:17` | GREEN on its three readable legs | **YES** |

**33 of 33 verdicts reproduce. Zero divergence.** No GREEN any prior seat claimed failed at this
seat's hand, and no RED any prior seat claimed was secretly green.

### CH2.2 The clean axes — measured here, not inherited

- **Bounds (axis 2).** ⟨cmd⟩ `git show --name-only --format=''` over **all 28** commits of this wave
  (11 substance ⊕ 9 unit receipts ⊕ close ⊕ ledger ⊕ close-correction ⊕ check-1 ⊕ 3 repair-1 ⊕ the
  R1.8 correction), unioned and sorted → **75 paths**. Check 1's 74-over-23 reproduces exactly; the
  one new path is Repair 1's `coverage-by-export.addendum-2026-09-18.md`. ⟨cmd⟩ the union filtered
  through `dev\.sh|eslint\.config|package\.json|CHANGELOG|node_modules|^demo/|^api/|^e2e/|^\.github/|src/color/model\.ts|fixtures/`
  → **0 hits**. Every `src/`, `test/` and `scripts/ci/` path sits in a §File Bounds `modify`/`create`
  row — including the two declared split products `src/css/rules.ts` and `src/css/serialize.ts`, whose
  *"exact names bind at open"*. ⟨cmd⟩ `scripts/dev/dev.sh` summed across all 28 commits → **0
  appearances**.
- **No masking fallback (axis 3).** ⟨cmd⟩ over the **added** lines of all twelve cure commits,
  `test\.skip|it\.skip|describe\.skip|\.only\(|@ts-ignore|@ts-expect-error|eslint-disable|xit\(|xdescribe\(|as any|as never|allowlist|skipIf`
  → **two hits, both about the same deleted cast**: `c18a78f8` added `easing(name) as never` and
  `4a27a65d` **deleted it**, the second hit being the prose that records the deletion. ⟨cmd⟩
  `grep -rn 'catch' src/` at HEAD → **0**: the product tree carries **zero** try/catch. The three
  `try` blocks in the diff were read whole at this seat: `test/parser-totality.test.ts` and
  `test/math.test.ts` capture the throw **so it can be asserted**, and
  `scripts/ci/verify-packed-surface.mjs` carries three — `:232` the workspace install, `:304` which
  **rethrows with the export's name** (`/${entry} ${name} threw on a valid invocation: …`) and `:320`
  which **rethrows anything that is not `ERR_PACKAGE_PATH_NOT_EXPORTED`**. Not one swallows a defect.
  ⟨cmd⟩ `git status --porcelain \| grep -c node_modules` → **0**: no patched dependency. **No
  allowlist, no copied producer selector, no silently narrowed assertion** — Repair 1's helper
  re-annotation was read at the bytes and every assertion in the file is still `threw(...)` /
  `toHaveProperty("ok")` / `toMatchObject`, and it **deleted** a type lie rather than adding one.
- **E-3 (axis 5).** ⟨cmd⟩ `git diff --stat ba4e1de5..HEAD -- docs/tranches/V/megatranche/registry/
  docs/tranches/V/megatranche/audit/probes/ eslint.config.js package.json CHANGELOG.md
  scripts/dev/dev.sh` and the nine sibling specs `W1..W8 W10 W11` → **prints nothing**. The
  adjudicated registry, all four probes, every sibling spec and the three cut-bearing manifests are
  **byte-untouched across the entire wave window**, not merely by this wave's own commits. `W9.md`
  moved **3 lines for 3** (⟨cmd⟩ `git diff -U0 ba4e1de5..HEAD -- …/W9.md \| grep '^@@'` →
  `@@ -17,3 +17,3 @@`, one hunk; ⟨cmd⟩ `wc -l` → **522**), which is §File Bounds' own named
  exception and leaves every `W9.md:NNN` coordinate this record and the successors cite undisplaced.
- **Commit families (axis 4).** Every §Commit Plan row maps to exactly one commit except row 5
  (`a692069f` ⊕ `5ba934fc`, the second a truthfulness correction of the first's *error message*
  wording — its own meaning, and `--amend` on an already-shared tip is forbidden by the standing law:
  **INFO, lawful**) and row 13 (`c23e1795` ⊕ `bac0d467`, close report ⊕ ledger row — *"the evidence
  transcript and this section ride one commit; the LEDGER row rides its own"*, which is the standing
  one-commit-per-meaning rule, not a split family). **Rows 9 and 11 were never taken** — absent, not
  split (CH2.3 D-1). Row 12's declared family is intact in one commit (`8f0a0e79` → 5 packets ⊕ 5
  `INBOX.md` rows ⊕ the evidence file, 7 files / 978 insertions). Runbook §3.4's lock table names no
  X-W9 row beyond the spec's own row 9.
- **No peer-repo byte (RD-11).** ⟨cmd⟩ `/usr/bin/find ../keyframes.js/docs ../glass-ui/docs
  ../sci-report/atlas/docs ../fourier-analysis/docs -name '*2026-09-1[89]*'` → four hits, **all
  glass-ui's own** (`glass-outbound-…-valuejs-o26-reply.md`, already rowed I-35; a KF.W6 BH relay we
  sent through the standing mail path; two of glass's own execution dirs). **No packet of this wave
  is copied into a peer tree**, exactly as RD-11 orders and R-6 books.
- **E13 mail (axis 6).** A **per-row status-cell** `awk` over `INBOX.md` — never a bare line grep
  (LW-5's own lesson) — returns **3 UNREAD of 35 `I-` rows: I-32 · I-33 · I-34**. Each row was read
  whole here: I-32 is glass-ui's O-20 disposition (*"the bump is yours, in your tranche … Nothing in
  this letter asks you to hold"*), I-33 its constellation relay, I-34 a bbnf-lang letter *"addressed
  to bbnf-lang, not to us"* whose own cell says **"no obligation is minted here"**. **None names the
  library band, the 4.1 cut, the parser, `./transform`, `./math` or the five packets.** **0 UNREAD in
  X-W9's scope — this wave does not close with unread mail.**
- **The four-verb line (axis 7).** AUDITED `yes` and SPECIFIED `yes` unmoved; IMPLEMENTED at
  **PARTIAL 2026-09-17** with its reason and its gate tally; **VERIFIED unmoved at `no`**. ⟨cmd⟩
  `grep -n -A6 '^\*\*Opens after\*\*' docs/tranches/X/waves/W11.md` confirms X-W11 is *"the release
  and verified close"*, so the close was right not to reach for that stamp. **Moved lawfully.**
- **The record's published figures (axis 9).** Re-measured independently: the **55** `npm run lint`
  problems with **0** carriers outside `docs/tranches/**`; `npm run typecheck` **exit 2, 1 error**
  (Repair 1's 3 → 1 reproduces exactly, and the survivor is the out-of-bounds carrier it named); the
  vitest tally **`Test Files 4 failed | 32 passed (36)` · `Tests 13 failed | 600 passed (613)`** with
  the per-file split re-derived by ⟨cmd⟩ `grep -c 'FAIL  <file>'` → `v4-css-emerging` **10** ·
  `v4-c1` **1** · `spectrum-luma` **1** (inherited) · `reka-binding-idiom` **1** (inherited); the
  union's path count; the `_2` 60/26; the bare-`declare` 20; the max-LoC 672; the coverage 74/75 and
  71/75. **Every one reproduces.**

### CH2.3 Defect register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** (carried, **UNCURED**) | **Seven RED gates have no relief of the kind the bar admits — G21 · G22 · G23 · G24 · G28 · G29 · G32** — and with them the spec's own **Goal criterion clause 4** is FALSE at the bytes. §Disjointness §4a's sequencing is real and was obeyed correctly, but it defers a *time*, not an *owner*: all three reliefs the bar admits transfer ownership **away** from the wave (producer / later wave / spec-named honest-RED id), and §4a transfers nothing. §COMPLETABLE 2 says in the spec's own words *"No producer dependency … no Glass-8 trigger gates any unit"*; X-W11 **consumes** the 4.1.0 tuple, it does not author it. §Dispositions CC-088 reads *"a ninth carry may not happen"* — the ninth carry happened | ⟨cmd⟩ `version` → **4.0.0**, `git tag -l \| grep -c 4.1.0` → **0** · `grep -rn '<SCI-1>' src/` → **0** · `'toHex' in color` → false · `easing` identity **false 4/4** · `bench-table-4.1.md` **absent** · `ConsoleRail.vue` still prefix-matches **at HEAD's own blob** · G24 `ERR_MODULE_NOT_FOUND`. **Precondition re-read at this seat, immediately before this act**: ⟨cmd⟩ `awk -F'\|' '/^\| X-W4 \|/{print $4}' …/LEDGER.md` → **`**OPEN 2026-09-17**`**; ⟨cmd⟩ same for X-W8 → `planned`. §4a's disjunct *"or runs while neither is open"* therefore still fails on X-W4 alone | **A repair round behind X-W4's close, not a rewrite.** Re-dispatch `X-W9.f` and `X-W9.h` under the unchanged spec (**ESC-W9R1-SEQUENCING**), carrying **ESC-W9R1-BOUNDS-GRANT**, then CHECK 3. Three independent seats (close · Check 1 · Repair 1) read the deferral the same way; this is the fourth reading and it agrees at its own command |
| **D-2** | **HIGH** (carried, **PARTIALLY CURED**) | **§Format And Lint Cadence is not met: the tree at HEAD does not typecheck and eleven of the thirteen RED tests are this wave's own** — correct cures colliding with artifacts that assert the pre-cure shape. The spec requires a green `npm run lint`, `npm run typecheck` and `npm test` *"after each integration batch and before close"* | ⟨cmd⟩ `npm run typecheck` → **exit 2**, `test/v4-css-emerging.test.ts(12,10): error TS2459` (Repair 1's 3 → 1 reproduces) · ⟨cmd⟩ `npx vitest run` → **`Tests 13 failed \| 600 passed (613)`**, of which `v4-css-emerging` **10** and `v4-c1` **1** are this wave's · ⟨cmd⟩ `npm run lint` → **55**, every carrier under `docs/tranches/**` (X-W8 G-6's ignore), **0** under `src/` or `test/` | **ONE bounds grant, unchanged.** Repair 1 cured the single carrier §File Bounds admits (`test/parser-totality.test.ts`, `4a27a65d`) and escalated the other three by name. `test/v4-css-emerging.test.ts`, `test/v4-c1.test.ts` and `fixtures/public-types/value-v4.ts` are **absent from §File Bounds entirely** (⟨cmd⟩ `grep -c` each in `W9.md` → **0 · 0 · 0**); each takes one mechanical edit, and the third also unblocks **G20**. **No seat masked any of it: four units and two verify seats raised it and not one wrote a `test.skip`** |
| **D-3** | MINOR (carried) | **G14 moved REDDER over a wave that owns it** — `_2` occurrences 58 → **60**, lines 25 → **26** | ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60** (double-run) | Mitigated, unchanged: declared as **LW-1**, root measured by X-W9.d (the dts rollup keys its entity cache on the **import-specifier string**, so the copy rides in under `src/value.ts`'s `"./color/index"` spelling, which no module under `src/css/` can reproduce), three re-export variants measured ineffective, and the +2 is the forced consequence of publishing `serializeCssValue`, which **G15 required**. Carriers `src/value.ts` / `src/quantize.ts` are absent from §File Bounds. **Does not block** |
| **D-4** | MINOR → **CURED, verified here** | Check 1's *"`coverage-by-export.md` publishes a denominator the settled bytes no longer carry"* | ⟨cmd⟩ `node …/coverage-by-export.mjs` ×2 → `74 / 75 = 98.7%` and `71 / 75 = 94.7%`; ⟨cmd⟩ `ls …/coverage-by-export.addendum-2026-09-18.md` → present, `e4d98aca`, **1 file**; the committed `coverage-by-export.md` is **byte-untouched** (E-3 honoured, addendum-beside not rewrite) | **Nothing owed.** The cure is the wave's own dated-addendum idiom and it reproduces |
| **D-8** | **MINOR** (**NEW at this pass**) | **§Archaeology's fourth new guardrail did not land.** The spec's own anti-recurrence clause reads *"The lint rule is **scoped and enabled in-tree**, so the crash **shape** — not just the instance — is prevented; the crash was authored by a `!` that silenced `noUncheckedIndexedAccess`, and until this wave `eslint` had no rule that could see it."* At HEAD it still has none: G5 and G10 are GREEN/RED only under an **explicit `--rule` flag**, so a new `!` under `src/css/`, `src/transform/` or `src/foundation/` would **not** redden `npm run lint` and CI would not see it | ⟨cmd⟩ `grep -n 'no-non-null-assertion' eslint.config.js` → **no match**; ⟨cmd⟩ `npm run lint` → 55 problems, **none** of them a non-null assertion | **Rides D-1, and is one more thing D-1 costs.** §4a makes `X-W9.f` the file's **sole writer** and §Commit Plan row 9 binds both rule objects into the cut commit, so no in-bounds seat could have landed it. Named here because the close's G5/G10 cells report the `--rule` readings without saying that the *shape* guardrail behind them is still absent from the repo. **Does not block on its own** |
| D-5 · D-6 · D-7 | INFO (carried) | the `672 > 609` receipt slip (already corrected in-record as **LW-2**, and `.b` booked it first and correctly) · three receipts' `0 UNREAD` from a pattern the bold `**UNREAD` spelling defeats (**LW-5**; the conclusion survives at this seat's own per-row scan) · G33's *"sent"* = AUTHORED + ROWED (**RD-11's own mechanism**, booked as R-6) | re-measured at CH2.1/CH2.2 | Nothing owed |
| **D-9** | INFO (**NEW at this pass**) | **G33 is tallied GREEN with one of its three declared legs unreadable** — the post-window `npm ls @mkbabb/value.js` in keyframes and fourier — because the window never opened | ⟨cmd⟩ `grep -n '4\.0\.0' …/keyframes-inbox-2026-09-18-value-4.1-cut-notice.md` → `:17` *"The 4.1 tag has NOT been cut yet"* | **Disclosed in-cell by the close itself** (*"GREEN on its three readable legs; the post-window `npm ls` leg is unreadable because the window never opened"*). The unmeasured leg is downstream of D-1, not a separate debt. Nothing owed |

**Zero BLOCKER. Zero CRITICAL. Two HIGH.** The bar admits zero HIGH, so the row is not promoted.

### CH2.4 Honest-RED adjudication — seven relieved, seven not

**Relieved at the spec's own bytes, owner named, NOT counted against the wave:**

| gate | relief, cited at the bytes | owner named |
|---|---|---|
| **G1** | **Spec-internal mutual exclusion, not a library defect.** §Hard Gate G27 orders the six symbols **deleted** (*"no shim, no forwarding export"*); §File Bounds orders this probe **`execute, no write (re-run unmodified)`**; the probe calls `TR.decomposeMatrix3D` unconditionally at `:74`. Both cannot hold, and no unit may lawfully write the probe. This seat's own run reaches **22 `ok` / 0 RED** before the crash — the wave's cures pass every assertion the instrument survives to make | ESC-W9a-PROBE-UNRUNNABLE → the sitting, two named options; read staged per **CC-096**, which §Dispositions FOLDS into this wave |
| **G3** | **The gate's name and its cited leg measure different classes.** This seat re-measured the remainder itself rather than inheriting the diagnosis (CH2.7 ①): **all 14 throwing exports** are (a) arity/shape violations of the published `.d.ts` (11), (b) the ES class-constructor rule (`PathGeometry` called without `new`), or (c) the **spec-ordered** `./math` precondition policy §Scope 4 / G11 demanded. **Not one is an entry that declares a string parameter throwing on a string** | ESC-W9a-G3-LEG-SCOPE → the sitting; carriers include `src/css/syntax.ts`, absent from §File Bounds |
| **G5** | **90 of 94 retired** (grammar 72 → 0, stylesheet 18 → 0). The 4 survivors are all `src/css/timeline.ts`, which §File Bounds lists at wave level but **no unit's writable set contains** — a seat that wrote it would have written outside *its* bounds. Read at the bytes here, none is a live crash (CH2.7 ③) | ESC-W9a-TIMELINE-NNA → the sitting, to assign the file; the cure is four lines |
| **G12** | **LEG1 — the leg the barrels own — is GREEN**, the exact two names the falsifier lists. LEG2 is the **root specifier**, which lives in `package.json` (X-W9.f's file) and whose absence is a position this repo **already SENT** as **O-12**. §Triumvirate Dispatch names this exact shape an **adjudication, not an edit** | ESC-W9d-ROOT-AND-SYNTAX (a) → the sitting, two named options |
| **G13** | **33 → 20, thirteen retired.** The remaining 20 arrive under `src/value.ts` / `src/quantize.ts` spellings the dts rollup's entity cache keys on; **both files are absent from §File Bounds**, and three in-bounds re-export variants were *measured* ineffective | ESC-W9d-DTS-SPELLING → the sitting |
| **G14** | Same root as G13, plus the +2 that **G15 required** (D-3) | ESC-W9d-DTS-SPELLING → same |
| **G20** | **The behavioural half landed and the hardcoded `strictTypes: 62` is gone** (⟨cmd⟩ `grep -n 'strictTypes'` → one **comment** recording the deletion, no emission; the smoke harness rethrows per export name at `:304-307`). The command dies **before** reaching that half, on `fixtures/public-types/value-v4.ts`, **absent from §File Bounds entirely** | ESC-W9e-FIXTURE-V4TYPES → the sitting; 14 stale lines, one deletion |

**Unrelieved — G21 · G22 · G23 · G24 · G28 · G29 · G32.** Every one is owned by `X-W9.f` or
`X-W9.h`, units of **this wave**; none is producer-owned, none is routed to a successor by the spec,
and none is named honest-RED by id anywhere in `W9.md`. G24 belongs here too and not with the
relieved set: its substrate escalation names **X-W9.f** as the hand that obtains 0.13.0 from the
registry into a scratch directory, *and* the analytic arms it measures were never restored, so both
halves of it wait on the same unrun unit. **That is D-1, and it is why this pass does not promote.**

### CH2.5 The successors' `Opens after` conjuncts, measured against this wave

| successor | its conjunct naming X-W9 | state at these bytes | verdict |
|---|---|---|---|
| **X-W10** | *"X-W5, X-W6, X-W7, X-W8, X-W9 **stable** (surviving structure fixed) AND the CC-104 precondition ruled"* (⟨cmd⟩ `W10.md:6-7`) | X-W9's **library structure** is fixed and measured here (PSL-1 derived · boundary `ok` · the god module split behaviour-neutrally · the ratchet fallen 899 → 672); its **published surface** is not. ⟨cmd⟩ the ledger reads **X-W5 `planned` · X-W6 `planned` · X-W7 `planned` · X-W8 `planned`** | **LAWFULLY BLOCKED — and not by this wave alone.** Four of the five conjuncts are `planned` and X-W10's own row already reads `BLOCKED-ON`. This check moves nothing for it |
| **X-W11** | *"X-W0 … X-W10 are **IMPLEMENTED** (four-verb law; not 'closed', not 'reported')"* (⟨cmd⟩ `W11.md:6`), and §Dependencies makes *"the 4.1.0 tuple its input"* | `W9.md` §State reads **IMPLEMENTED: PARTIAL**; ⟨cmd⟩ `version` → `4.0.0`, no tag | **LAWFULLY BLOCKED on this wave**, and the block is load-bearing: it is the structural guard that keeps the un-taken cut from being inherited as done |

Both successors are correctly blocked, and neither block is manufactured by this check.

### CH2.6 The spec's own Goal criterion, at the bytes (axis 8)

| clause | reading at this seat | verdict |
|---|---|---|
| 1 — *"no public entry throws on a string"* | **949 calls** — every exported function of all seven subpaths × a 13-string corpus (empty · whitespace · the nine empty-body colour functions · `__proto__` · `constructor`) — **0 throws from any entry that declares a string parameter**; the 14 that do throw are shape/arity violations, the `new`-less class, or the spec-ordered `./math` policy (CH2.7 ①) | **TRUE** |
| 2 — *"no public signature returns a value its own `.d.ts` forbids"* | G8 `0 · 0 · 0 · 5` all finite `number` · G9's null ladder read at its own commit · G11 70 passed · G15 `Result`-typed | **TRUE on every leg the wave touched** |
| 3 — *"every type a subpath returns is nameable from that subpath"* | **TRUE at the consumer** (G12 LEG1 `ok`) · **FALSE in the emitted bytes** (20 bare `declare`, G13) | **SPLIT** |
| 4 — *"ships as one dated 4.1.0 cut whose exact-pin consumers were notified by packet before the tag"* | the **packets were sent** (5 authored · 5 rowed · the exact pin quoted before any tag) · the **cut was not taken** (`4.0.0`, no tag, no CHANGELOG entry, no bench table) | **FALSE** |

**The goal criterion is NOT met**, which the close states in its own words — *"The wave delivered the
surface and withheld the event"* — and which this second independent measurement confirms.

### CH2.7 What this pass measured that pass 1 did not

① **The clause-1 sweep, run at four times pass 1's width.** Pass 1 measured 0 throws *"from the
eleven public parse/serialize/easing entries"*. This seat ran **every** exported function of all
seven subpaths against the same 13-string corpus — **949 calls, 180 throws, 14 distinct exports** —
and then read each of the fourteen at its own signature: `coerceToSyntax` (arity 2, called with 1),
the four `collect*` readers (declared `Declaration[]`/rule arrays, not text), `serializeCssValue`
(declared `CssValue`), `linearEasing` (declared numeric array), five `math` entries under the policy
X-W9.c was **ordered** to enforce, `math.scale`'s stated equal-bounds refusal, and `PathGeometry`
called without `new`. **Not one is a string entry throwing on a string.** This is the first
independent confirmation of G3's relief *at a corpus wider than the gate's own*, and it holds.

② **The retirement verified in the direction that can only fail at a consumer.** G27's falsifier has
two arms; every prior seat measured the first. ⟨cmd⟩ `grep -rn '<the six>' ../keyframes.js/src demo/`
→ **0**, and ⟨cmd⟩ `grep -rn 'value.js/transform' ../keyframes.js/src` → `morph-svg.ts:45` and
`morph-geometry.ts:18`, **both importing `PathGeometry` alone**. **No MorphSVG seam is broken.**

③ **G5's four survivors are shape, not crash.** Read at the bytes: `scroll[1]!` and `view[1]!` sit
behind a successful `input.match(/^(scroll|view)\((.*)\)$/i)` whose group is `(.*)` — defined
whenever the match is truthy — and `comma[0]!` / `comma[1]!` behind `comma.length === 2`. The
clause-1 sweep confirms it: no timeline entry appears among the 14. **G5's RED is real and its cure
is four lines, but it hides no live defect** — stated so a later seat neither over-reads nor
under-reads it.

④ **The split's seam drift was disclosed, not hidden.** The spec banked `265/381/153`; the tree
carries **476 / 519 / 50**. ⟨cmd⟩ `psl-seam.md:29-38` names both causes at X-W9.d's own measurement —
X-W9.a's cure landed 21 lines in first (899 → 920) and each product carries its own header (25 · 35 ·
59) the banked 799-line sum never included — while **the edge property the seam was chosen for
reproduces exactly**: two cross-seam edges, both out of `stylesheet.ts`, leaves elsewhere, acyclic by
construction. Behaviour neutrality was proven before the cut landed (**933 cases · 0 mismatches**, 59
round-trips · 0 failures). A divergence declared with its two measured causes is not a defect.

⑤ **The de-circularised oracle is a cure, not a rename** — the failure mode §Archaeology says this
class survived three times. `test/v4-color-behavior.test.ts` now asserts the IEC 61966-2-1 **shape**
(a straight line through the origin below the knee at encoded `0.04045`, so bytes 1..10 are on the
line and byte 11 is not) and **quotes no constant of either branch**; the independent vectors moved
to `test/color-anchors.test.ts` (12 passed). ⟨cmd⟩ `grep -rn '12.92' test/` shows the old expression
survives only inside a **comment that records what it was and why it was false**.

### CH2.8 Superlatives, reported with the same provenance duty as defects (L-18)

- **The RED-first guardrail held, and this pass re-proves it at the bytes**: ⟨cmd⟩ `git show
  c18a78f8 --stat` → `test/parser-totality.test.ts` (222 +) ⊕ its 496-line failing capture, **and no
  `src/` byte**. After three prior closures of this class against surfaces that did not hold it, the
  instrument preceded the cure in the history for the first time.
- **Zero try/catch in the entire product tree** at HEAD. Every cure is a narrowing or a typed
  failure; `grammar.ts:181` returns `failure(source, "css_syntax", ["color components"])` where a
  `slash[0]!` used to sit.
- **Escalation discipline remains the wave's best feature, and Repair 1 extended it**: the repair
  seat found **one** of Check 1's four carriers actually in bounds, cured it at the root (deleting a
  type lie rather than adding one), and escalated the other three **by name with their one-edit
  cures** rather than reaching for them. It also **corrected Check 1 at the bytes** (`parser-totality`
  *is* in §File Bounds, `:91` and `:195`) instead of inheriting the error, and disclosed that its own
  ledger act had been swept into a sibling's pathspec commit (**R1.8**) rather than letting a later
  seat find three hashes where four acts happened. Four units and three verify seats, and **not one
  masking construct in 75 paths**.

### CH2.9 Disposition

**NOT-CONFORMANT.** The row **stays `PARTIAL 2026-09-17`**; this seat sets no `CLOSED` stamp, moves
no verb, and edits no spec. All 33 gate verdicts reproduce, bounds and E-3 are clean, mail is clean,
and every published figure re-measures — but **two HIGH defects stand**, and the bar admits zero.
Both are the same shape and neither is a fault of the units that ran: **the wave is incomplete
because two of its nine units are precondition-blocked on a sibling wave that is still OPEN, and
because the artifacts that assert on this wave's cures were never granted to any unit that could
repair them.**

What is owed, unchanged and now measured three times: **X-W4 closes → ESC-W9R1-SEQUENCING**
(re-dispatch `X-W9.f` and `X-W9.h` under the unchanged spec) **carrying ESC-W9R1-BOUNDS-GRANT** (the
three test/fixture paths) → **CHECK 3**. `ESC-W9-G24-SUBSTRATE`, `ESC-W9d-DTS-SPELLING`,
`ESC-W9a-TIMELINE-NNA`, `ESC-W9a-PROBE-UNRUNNABLE`, `ESC-W9a-G3-LEG-SCOPE`,
`ESC-W9d-ROOT-AND-SYNTAX`, `ESC-W9e-SHARMA-NO-SUBJECT` and `ESC-W9e-FIXTURE-V4TYPES` ride into that
round unrelieved, every one naming a file or a ruling this wave may not write.

**This check wrote no cure byte, moved no gate, and edited no spec.** Its only writes are this
section and one appended ledger event line.

---

## Repair 2

SERVED MODEL: `claude-opus-5[1m]` · **REPAIR SEAT, round 2.** Dispatched against Check 2's register.
Every figure below is read from the settled bytes and **double-run**. This seat wrote **four paths**,
all inside the wave's own §File Bounds surface: `src/css/timeline.ts` (§File Bounds `:81`, `modify`),
`docs/tranches/X/waves/evidence/W9/timeline-nna.repair-2-2026-09-18.md` (§Verification Artefacts'
own directory), this section, and the X-W9 ledger row. **It wrote no `eslint.config.js`, no
`package.json`, no `CHANGELOG.md`, no `ConsoleRail.vue`, no peer-repo byte and no test or fixture
the spec never listed.**

**DISPOSITION: the row stays `PARTIAL 2026-09-17`.** One long-carried escalation is **relieved in
bounds** — **ESC-W9a-TIMELINE-NNA**, and with it **G5 goes RED → GREEN (4 → 0)**, the first gate
verdict to move since the close. A second, **ESC-W9c-PARSER-TOTALITY-TSC**, is found **already
relieved** by Repair 1 and is struck here at the bytes. The two HIGH defects **D-1** and **D-2** are
**escalated again with their preconditions re-read at this seat's own commands and still false**,
and **D-3** and **D-8** are escalated with the reason each is unreachable from inside §File Bounds.
**No gate was masked, no test skipped, no assertion narrowed, and the tally moves only where a cure
actually landed: 19 GREEN · 14 RED → 20 GREEN · 13 RED.**

### R2.0 CRASH-RECOVERY sweep (standing law — the host was restarted 2026-09-18)

⟨cmd⟩ `git status --porcelain` at entry → **15 rows**. ⟨cmd⟩ `git diff --cached --name-only` →
**empty**. Filtered against this seat's writable set — ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md
docs/tranches/X/waves/evidence/W9/ docs/tranches/X/waves/W9.md src/ test/ scripts/ci/
eslint.config.js package.json CHANGELOG.md demo/color-session/colorSpaceInfo.ts
docs/tranches/V/ARCHITECTURE.md docs/tranches/V/coordination/` → **empty**. **Nothing inherited;
nothing stashed; nothing restored; no blanket anything.**

The one dirty row that *names* a path in §File Bounds is
`demo/picker/controls/ComponentSliders/ConsoleRail.vue`. It was **read whole** before being left
alone: ⟨cmd⟩ `git diff -- …/ConsoleRail.vue` → **two hunks, both X-W4's and both self-labelled** —
`X-W4 · A1 (CC-040) — THE FINE-POINTER FLOOR` (`min-inline-size`/`min-block-size: 1.5rem` on
`.channel-rail-item`) and `X-W4 · A2 (CC-040)` (the touch rung's condition widened to
`(max-width: 1023px), (pointer: coarse)`). Both sit in the `<style>` block; **zero lines touch
`componentDescription()` at `:172-180`, which is X-W9.h's carve.** This is a **live sibling seat's**
work, not a killed predecessor's on this unit, and it is left exactly as found — it is also the
working tree's own corroboration that X-W4 is open. `scripts/dev/dev.sh` never touched, never
staged, never read for edit; ⟨cmd⟩ `git show --stat 7d02e405` names **2 files**, neither of them it.

HEAD moved under this seat during the round (`00370074` → **`773429a2`**, a Track-B commit opening
KF.W10). ⟨cmd⟩ `git diff --stat 00370074..HEAD -- src/ test/ scripts/ fixtures/ eslint.config.js
package.json docs/tranches/X/waves/W9.md docs/tranches/X/execution/A/X-W9.md
docs/tranches/V/ARCHITECTURE.md docs/tranches/V/coordination/ docs/tranches/V/megatranche/` →
`INBOX.md` **+2** (the sibling's own KF.W10 sweep note) ⊕ `src/css/timeline.ts` **21 ±** (**this
seat's own cure**). **No subject of any reading below moved under this seat.**

### R2.1 Defect → cure → commit → gate re-reading

| id | sev | disposition | commit | gate re-reading |
|---|---|---|---|---|
| **D-1** | HIGH | **ESCALATED — precondition re-read at this seat's own command, still false** (R2.3) | none | G21 G22 G23 G24 G28 G29 G32 **unmoved, all RED** |
| **D-2** | HIGH | **ESCALATED — the three carriers are still absent from §File Bounds and no grant reached this seat** (R2.4) | none | `typecheck` **exit 2 · 1 error** (×2); `vitest` **13 failed \| 600 passed (613)** (×2), split `10 · 1 · 1 · 1`; `lint` **55**, **0** carriers outside `docs/tranches/**` |
| **D-3** | MINOR | **ESCALATED — no in-bounds cure exists, re-measured** (R2.5) | none | G14 **60 / 26 lines**, unmoved across this round's rebuild |
| **D-8** | MINOR | **ESCALATED on its own subject; its reachable half CURED** (R2.2) | `7d02e405` | the four `!` **retired**; the rule **object** still absent from `eslint.config.js` — that write is X-W9.f's alone |
| **D-9 · D-5 · D-6 · D-7** | INFO | **nothing owed** (Check 2's own words), and nothing taken | none | — |
| **ESC-W9a-TIMELINE-NNA** | — | **RELIEVED IN BOUNDS** (R2.2) | `7d02e405` | **G5 RED → GREEN**: ⟨cmd⟩ `npx eslint 'src/css/**/*.ts' --rule …` → **0 problems, exit 0**, twice |
| **ESC-W9c-PARSER-TOTALITY-TSC** | — | **ALREADY RELIEVED by Repair 1, struck here at the bytes** (R2.6) | `4a27a65d` (R1's) | `typecheck` carries **no** `test/parser-totality.test.ts` row; the two TS2322s are gone |

**Cured: 1 (ESC-W9a-TIMELINE-NNA, G5 RED → GREEN). Found already cured: 1
(ESC-W9c-PARSER-TOTALITY-TSC). Escalated: 4 (D-1, D-2, D-3, D-8).**

### R2.2 ESC-W9a-TIMELINE-NNA — relieved in bounds, and why this seat could take it

X-W9.a retired **90 of G5's 94** non-null assertions (grammar 72 → 0, stylesheet 18 → 0) and raised
the remaining four as an escalation because `src/css/timeline.ts` sat outside **that unit's**
writable set — which was correct for a unit seat, and which three later seats faithfully carried.
**It has never sat outside the *wave's*.** The standing law binds a seat to *"the wave's §File Bounds
writable set"*, and the repair seat's set is the wave's, which is the same test Repair 1 applied when
it found `test/parser-totality.test.ts` in bounds and cured it. The file needed no bounds expansion —
only a writer.

Ownership measured **before** the write, never assumed:

```
⟨cmd⟩ grep -rn 'src/css/timeline' docs/tranches/X/waves/*.md
        → docs/tranches/X/waves/W9.md:81  | `src/css/timeline.ts` | modify |     (sole hit, all 13 specs)
⟨cmd⟩ git log --oneline -8 -- src/css/timeline.ts
        → 6aca8602 (V·W43a) only — no X-W9 unit and no sibling X wave has touched it
⟨cmd⟩ git status --porcelain -- src/                                → empty
⟨cmd⟩ X-P-W3's own bounds line → "`typescript/src/css/**` is already create/modify for this wave"
        → Track D (X·P) writes the parse-that tree's typescript/src/css/**, NOT this repo's src/css/
```

No unit holds `modify` on the path, so §Disjointness' *"no two units hold `modify` on the same path
at the same time"* is satisfied **by measurement**, not by intent.

**The cure is X-W9.a's own idiom**, from `97ab3991`'s body — *"every `match(...)` result is
destructured and tested"* — never a cast, never a fallback, never a `!` moved elsewhere:

| site | was | is |
|---|---|---|
| `:23:36` | `const scroll = input.match(/^scroll\((.*)\)$/i); if (scroll) { … scroll[1]!` | `const scrollBody = input.match(…)?.[1]; if (scrollBody !== undefined)` |
| `:38:36` | `const view = input.match(/^view\((.*)\)$/i); if (view) { … view[1]!` | `const viewBody = input.match(…)?.[1]; if (viewBody !== undefined)` |
| `:71:51` | `rangeBoundary(splitTopLevel(comma[0]!, "space"))` | `const [commaStart, commaEnd] = comma;` both tested |
| `:72:49` | `rangeBoundary(splitTopLevel(comma[1]!, "space"))` | same destructure |

**Each is an equivalence, argued at the regex and proven at the bytes.** Both capture groups are
`(.*)`, which matches the empty string, so group 1 is a `string` on **every** truthy match and
`undefined` on **every** null match — `body !== undefined` is exactly the old `if (match)`. For the
range pair, the `comma.length > 2` refusal on the line above leaves lengths 0, 1 and 2 only, so
*"both halves are present"* is exactly the old `comma.length === 2` (`splitTopLevel` yields no
`undefined` element; an empty half is `""`, which is `!== undefined`).

**Differential proof, old bytes vs cured bytes over one corpus.** Both trees bundled with `esbuild`
from a scratch copy of `src/`, the old one carrying `git show HEAD:src/css/timeline.ts` verbatim
(⟨cmd⟩ `diff` against the HEAD blob → **silent**):

```
⟨cmd⟩ node <scratch>/diffprobe.mjs   →  cases 156 · divergences 0   exit 0
⟨cmd⟩ node <scratch>/diffprobe.mjs   →  byte-identical (diff -q silent)
```

127 `parseAnimationTimeline` inputs (`auto` · `none` · dashed-idents · bare `scroll`/`view` ·
unbalanced bodies · 28 bodies × 4 case-and-function spellings, including `__proto__`, `constructor`,
`toString`, empty and whitespace bodies), 22 `parseAnimationRange` inputs (bare and doubled commas,
empty halves, 1–3 token runs, prototype keys) and 7 `serializeTimelineOptions` option shapes. Every
case compared as `OK <json>` or `THROW <ctor> <message>`, so a divergence in **either** direction — a
new throw **or a silenced one** — would have printed. Evidence banked beside at
`docs/tranches/X/waves/evidence/W9/timeline-nna.repair-2-2026-09-18.md`.

```
⟨cmd⟩ npx eslint 'src/css/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'
        run A → 0 problems, exit 0     run B → 0 problems, exit 0        G5  4 → 0   RED → GREEN
⟨cmd⟩ npx vitest run test/v4-css-public.test.ts          → 6 passed (6)   (the entries' own file)
⟨cmd⟩ git show 7d02e405 --stat  → 2 files: src/css/timeline.ts, the evidence file. Nothing else.
```

**G5's src-wide neighbourhood, stated so no successor over-reads the green.** ⟨cmd⟩
`npx eslint 'src/**/*.ts' --rule …` → **47**, in `src/quantize.ts` 18 · `src/color/anchors.ts` 11 ·
`src/easing.ts` 10 · `src/color/operations.ts` 8. **None is inside G5's or G10's declared scope** —
§Scope 2 scopes the rule to `src/css/`, `src/transform/` and `src/foundation/`, and all three now
read **0**. `src/easing.ts`'s 10 are already booked as residual **R-1**, owned by X-W9.f. This seat
did **not** widen the rule's scope to manufacture more green.

### R2.3 D-1 — the precondition re-read at this seat's own command, immediately before this act

Check 2's cure for D-1 is not a code change. It is, verbatim: *"Re-dispatch `X-W9.f` and `X-W9.h`
under the unchanged spec (ESC-W9R1-SEQUENCING), carrying ESC-W9R1-BOUNDS-GRANT, then CHECK 3."*
The condition was **re-read immediately before this act and is unmet**:

```
⟨cmd⟩ awk -F'|' '/^\| X-W4 \|/{print $4}' docs/tranches/X/execution/LEDGER.md → **OPEN 2026-09-17**
⟨cmd⟩ awk -F'|' '/^\| X-W8 \|/{print $4}' docs/tranches/X/execution/LEDGER.md → planned
```

`W9.md` §Disjointness sets the condition as *"X-W9.f sequences after both X-W4 and X-W8 close, **or
runs while neither is open**"*. X-W8 is `planned` — free. **X-W4 is OPEN**, so neither limb holds,
and X-W9.h's own gate (*"X-W9.h sequences after X-W4 closes, or runs while X-W4 is not open"*) fails
on the same row. **The working tree corroborates the ledger rather than merely echoing it**: X-W4's
seat has uncommitted CC-040 work in `ConsoleRail.vue` at this very clock (R2.0), so the file is
under a live sibling's hand, not merely reserved on paper.

**The unit still may not be split**, and this seat re-read the two rows that say so rather than
inheriting the conclusion. §Commit Plan row 9 binds the two scoped `no-non-null-assertion` rule
objects into the **cut commit** (*"the atlas evidence tuple **and the two scoped
`no-non-null-assertion` rule objects (§4a) ride here**"*), and the standing law is *"commit families
the spec declares must not split"* — so the `eslint.config.js` lock propagates to the whole of
X-W9.f, and the free SHIP limb cannot be taken alone. §Commit Plan row 11 binds X-W9.h's free
`demo/color-session/colorSpaceInfo.ts` to the locked `ConsoleRail.vue` the same way; landing the free
half would leave **G32 still RED** — the descriptor table and the prefix `find` must retire in the
same act or `componentDescription()` keeps resolving `cp` → `"Ct (tritan)"` — **and** split a
declared family, buying nothing.

The seven gates, re-read at this seat's own commands at the settled bytes:

```
⟨cmd⟩ node -e 'require("./package.json").version'        → 4.0.0            G29 RED
⟨cmd⟩ git tag -l | grep -c '4\.1\.0'                     → 0                G29 RED
⟨cmd⟩ grep -rn 'sampleColorRamp|mixColorsInto|toRgba8Into' src/ | wc -l → 0 G21 RED
⟨cmd⟩ 'toHex' in <./color>  → false ·  'easingNames' in <./easing> → false  G22 RED
⟨cmd⟩ easing(k)===easing(k) || .value identity, 4 CSS keywords → false,false,false,false  G23 RED
⟨cmd⟩ ls …/evidence/W9/bench-table-4.1.md                → No such file     G28 RED
⟨cmd⟩ node …/probes/fourier-value-import-drift.mjs       → RED leg1, then
        ERR_MODULE_NOT_FOUND on …/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js
                                                                            G24 RED
⟨cmd⟩ git show HEAD:…/ConsoleRail.vue | sed -n '172,180p' → still
        `c.startsWith(upper) || c.startsWith(component)`; colorSpaceInfo.ts still keys
        `ictcp` :261 / `jzazbz` :287 by prose labels                        G32 RED
```

**ESC-W9R1-SEQUENCING stands, unchanged, at its fifth independent reading** (close · Check 1 ·
Repair 1 · Check 2 · this seat). Nothing in it is mis-specified, mis-rooted or contested; it needs
**X-W4 to close**, then one dispatch of X-W9.f and X-W9.h under the unchanged spec. **ESC-W9-G24-SUBSTRATE**
rides with it unrelieved — curing it means writing a peer tree, which RD-11 and the standing law
both forbid.

### R2.4 D-2 — the three carriers re-tested against §File Bounds, one by one

The grant Check 2 asks for (**ESC-W9R1-BOUNDS-GRANT**) **did not reach this seat**, and the standing
law is explicit: *"if a defect's only cure lies outside bounds, record it as an escalation with the
measured reason."* Each carrier was re-tested here rather than inherited:

| carrier | in §File Bounds? | this seat |
|---|---|---|
| `test/v4-css-emerging.test.ts` | **no** — ⟨cmd⟩ `grep -c 'v4-css-emerging' docs/tranches/X/waves/W9.md` → **0** | **ESCALATED** (ESC-W9d-EMERGING-SERIALIZE) |
| `test/v4-c1.test.ts` | **no** — same command → **0** | **ESCALATED** (ESC-W9b-V4C1-SNAPSHOT) |
| `fixtures/public-types/value-v4.ts` | **no** — same command → **0**; and it is a **tracked** file read by `scripts/ci/verify-packed-surface.mjs:258`, so the script cannot route around it without becoming a mask | **ESCALATED** (ESC-W9e-FIXTURE-V4TYPES) |

**The one in-bounds shape that looks like a cure is a mask, and is refused by name.**
`src/css/stylesheet.ts` **is** in §File Bounds, and the single typecheck error is
`Module '"../src/css/stylesheet"' declares 'serializeCssValue' locally, but it is not exported`.
Adding a forwarding `export { serializeCssValue }` there would turn the error green in one line —
and it would be a **legacy-compat shim for a stale consumer**, which the standing law forbids as a
masking fallback and which PSL-1 forbids structurally (*"the area barrel is the one place
public/internal is decided"*). The honest cure is to repoint the test's import to the module that
now exports it. That file is out of bounds. **This seat did not reach for the shim.**

```
⟨cmd⟩ npm run typecheck   run A → exit 2, 1 error   run B → exit 2, 1 error
        test/v4-css-emerging.test.ts(12,10): error TS2459
⟨cmd⟩ npx vitest run      run A → Test Files 4 failed | 32 passed (36) · Tests 13 failed | 600 passed (613)
                          run B → identical
        per-file ⟨cmd⟩ grep -c 'FAIL  <file>' → v4-css-emerging 10 · v4-c1 1 ·
        spectrum-luma 1 (inherited) · demo/test/shell/reka-binding-idiom 1 (inherited)
⟨cmd⟩ npm run lint        → 55 problems (23 errors, 32 warnings); by -f json, carriers outside
                            docs/tranches/** → 0
```

**§Format And Lint Cadence remains NOT met**, honestly and visibly, and **this round moved none of
those thirteen in either direction** — the cure above touched a file none of them import for a
symbol none of them name, which is exactly why the split reproduces to the row.

### R2.5 D-3 — re-measured across this round's rebuild, unmoved

The cure forced a rebuild of `dist/` (`npm run typecheck` runs `prepare`/`build`), so every
dist-reading gate was re-read afterwards to prove nothing moved sideways under it:

```
⟨cmd⟩ grep -o '_2' dist/subpaths/css.d.ts | wc -l   → 60   (double-run)      G14 RED, unmoved
⟨cmd⟩ grep -c '_2' dist/subpaths/css.d.ts           → 26                     G14 RED, unmoved
⟨cmd⟩ grep -c '^declare ' dist/subpaths/*.d.ts      → sum 20
        css 6 · value 6 · quantize 6 · easing 2 · color 0 · math 0 · transform 0   G13 RED, unmoved
⟨cmd⟩ find src -name '*.ts' -exec wc -l {} + | sort -rn → max 672 src/transform/path.ts  G16 GREEN, unmoved
```

**The carriers were read at the bytes, not inferred, and the escalation is sharpened rather than
re-asserted.** `css.d.ts`'s six bare `declare`s are exactly the five `_2` mangles
(`Alpha_2 Channel_2 ChannelsBySpace_2 Color_2 SpaceId_2`) plus `AnyColor` — one root, the dts
rollup's entity cache keyed on the **import-specifier string**, which rides in under `src/value.ts`'s
`"./color/index"` spelling. `src/value.ts` and `src/quantize.ts` are **absent from §File Bounds**
(⟨cmd⟩ `grep -c` each in `W9.md` → **0**), and X-W9.d already measured **three** in-bounds re-export
variants ineffective.

`easing.d.ts`'s two were read here for the first time, because **ESC-W9d-DTS-SPELLING names
`src/easing.ts`, which IS in §File Bounds** — so this seat owed that file a look rather than a
citation:

- `declare type Result<T, E>` at `:77` — `src/subpaths/easing.ts` **already** carries
  `export type { Result } from "../foundation/result"`, the exact publication PSL-2 asks for, and the
  rollup emits the bare copy anyway. **The source is already correct; the defect is in the emitter.**
  A fourth re-export variant after three measured ineffective is the diagnostic loop §Triumvirate
  Dispatch names, not a cure.
- `declare const PRESET_TABLE` at `:44` — forced by `export type BezierPresetName = keyof typeof
  PRESET_TABLE` (`src/easing.ts:15`). Spelling the union by hand would erase the const **and** create
  a **second authority for the 30-key set that G25 fences** — the very duplicate-authority shape
  X-W9.h's mechanism refuses (*"a second one would be a duplicate authority"*). **A cure that
  endangers a green fence to move a red count by one is not a cure.**

So: **no edit this seat could lawfully make moves G13 or G14**, and two of the three alternatives
inside bounds are worse than the RED. Carried as **ESC-W9d-DTS-SPELLING**, unchanged: name a writer
for `src/value.ts` / `src/quantize.ts`, or rule G13/G14 staged per **CC-096**. **Does not block.**

### R2.6 ESC-W9c-PARSER-TOTALITY-TSC — struck at the bytes, already relieved

§C.6 row 6 asks the sitting to *"name a writer for `test/parser-totality.test.ts`'s 2 TS2322s"* and
records it **still open at close**. **Repair 1 relieved it** at `4a27a65d` — the file was in
§File Bounds all along (`:91` and `:195`), which is the correction Repair 1 made to Check 1 — and no
later seat struck the row. Measured here rather than assumed:

```
⟨cmd⟩ npm run typecheck | grep -c 'parser-totality'   → 0   (the only error names v4-css-emerging)
```

E-3 holds: §C.6 is immutable and stays byte-untouched; **this paragraph is the dated correction
beside it**, in the same idiom as Repair 1's own correction of Check 1. A successor reading C.6's
twelve-row table should read this paragraph for the two that are no longer open —
ESC-W9c-PARSER-TOTALITY-TSC (here) and ESC-W9a-TIMELINE-NNA (R2.2).

### R2.7 E13 mail — 0 UNREAD in scope, re-swept at this seat's own commands

A **per-row status-verb** `awk` over `docs/tranches/V/coordination/INBOX.md`. **Two cheaper readings
were tried first and both are wrong, so the method is stated rather than implied** (LW-5's lesson,
sharpened):

```
⟨cmd⟩ whole-row match on /UNREAD/                      → 6   I-30 I-31 I-32 I-33 I-34 I-35
⟨cmd⟩ fixed field 6 (the header's Status column, :41)  → 4   I-31 I-32 I-33 I-34
⟨cmd⟩ leading bold verb of each row's own status cell  → 3   I-32 I-33 I-34
```

The whole-row match over-counts because three settled cells *quote* the word while reporting a
different verdict. The fixed-column read over-counts for a second, independent reason this seat
found at the bytes: **`I-30`'s row has 9 fields, not 6**, because its Letter cell contains an inline
`` `cut -c1-12` `` — so field 6 is that row's *evidence* text, and any fixed index is unsound on this
table. The sound read takes, per row, the **first cell whose content begins with a bold status verb**
(`UNREAD|READ|ROWED|FOLDED|CLOSED|DISPOSED|CONSUMED`) and reads that verb: **35 rows → 7 ROWED · 7
FOLDED · 5 READ · 3 UNREAD · 13 rows predating the verb convention**.

**3 UNREAD of 35 `I-` rows: I-32 · I-33 · I-34** — the same three every seat
since Check 1 has found, each Routing cell read whole here: I-32 glass-ui's O-20 disposition, I-33
its constellation relay, I-34 a bbnf-lang letter whose own cell says *"no obligation is minted
here"*. **None names the library band, the 4.1 cut, the parser, `./transform`, `./math` or the five
packets.**

Four-path sweep for anything new since Check 2: ⟨cmd⟩ `ls -t docs/tranches/V/coordination/` → newest
are this wave's own five 09-18 packets ⊕ the two `valuejs-outbound-2026-09-18-kfw7-bh-relay` files;
⟨cmd⟩ `/usr/bin/find ../{keyframes.js,glass-ui,sci-report/atlas,fourier-analysis,parse-that}/docs
-name '*2026-09-1[89]*'` → **four hits, all glass-ui's own**, of which the only inbound letter
(`glass-outbound-2026-09-18-valuejs-o26-reply.md`) is **already rowed as I-35** and reads
**READ + CONSUMED WHOLE** at KF.W6's close seat. The sibling Track-B commit that landed mid-round
(`773429a2`) added **2 lines** to `INBOX.md` — its own KF.W10 sweep note, **no new `I-` row**
(⟨cmd⟩ row count **35** before and after). **0 unrowed · 0 `I-n` minted · 0 UNREAD in X-W9's scope.**

### R2.8 What Repair 2 changed, stated so no successor over-reads it

- **One gate verdict moved, and it moved the right way.** **G5 RED → GREEN**, the first movement
  since the close. The wave now reads **20 GREEN · 13 RED of 33**. Every other verdict was re-read
  at this seat's own commands and is **unmoved**, including the four dist-reading gates that a
  rebuild could have disturbed.
- **Two of §C.6's twelve escalations are no longer open**: ESC-W9a-TIMELINE-NNA (cured here) and
  ESC-W9c-PARSER-TOTALITY-TSC (cured by Repair 1, struck here). **Ten stand.** §C.6 groups seven of
  the twelve as *"nam[ing] a file that `W9.md` §File Bounds never listed … that is one adjudication,
  not seven"*, and parenthesises `src/css/timeline.ts` inside that seven as *"listed but
  unassigned"*. **Both escalations that turned out curable came from that group of seven, and both
  for the same reason: their file was in §File Bounds all along** — `test/parser-totality.test.ts`
  at `:91` and `:195` (Repair 1's correction of Check 1), `src/css/timeline.ts` at `:81` (this
  round's). The group is now **five of ten**, and every one of the five names a file §File Bounds
  genuinely never listed. **The adjudication §C.6 asks for is real; it was just two rows smaller
  than it looked.**
- **`npm run typecheck` is unchanged at 1 error and `vitest` at 13 failed.** The cadence is still
  NOT met, and the sole remaining typecheck carrier is still a file the spec never listed. That is
  the whole of the cadence movement available inside bounds without the grant.
- **The row stays `PARTIAL 2026-09-17`.** `package.json` still reads `4.0.0`, there is no tag, and
  X-W11 stays lawfully shut behind its *"X-W0 … X-W10 are IMPLEMENTED"* conjunct — the structural
  guard that keeps the un-taken 4.1.0 cut from being inherited as done.
- **Owed, unchanged**: **X-W4 closes → ESC-W9R1-SEQUENCING** (re-dispatch X-W9.f and X-W9.h under
  the unchanged spec) **carrying ESC-W9R1-BOUNDS-GRANT** (`test/v4-css-emerging.test.ts`,
  `test/v4-c1.test.ts`, `fixtures/public-types/value-v4.ts`) → **CHECK 3**. `ESC-W9-G24-SUBSTRATE`,
  `ESC-W9d-DTS-SPELLING`, `ESC-W9a-PROBE-UNRUNNABLE`, `ESC-W9a-G3-LEG-SCOPE`,
  `ESC-W9d-ROOT-AND-SYNTAX`, `ESC-W9e-SHARMA-NO-SUBJECT`, `ESC-W9e-FIXTURE-V4TYPES`,
  `ESC-W9b-V4C1-SNAPSHOT`, `ESC-W9d-EMERGING-SERIALIZE` and `ESC-W9c-MTS06-SUPERSEDED` ride into
  that round unrelieved, every one naming a file or a ruling this wave may not write.
- **Lesson carried forward, and acted on rather than recorded.** Repair 1's R1.8 warns that
  `LEDGER.md` is written concurrently by four tracks and that the safe idiom is **write → `git add`
  → `git commit` in one uninterrupted step**. This seat used exactly that idiom for both of its
  commits, and its cure commit landed clean at **2 files** while a sibling's KF.W10 commit landed in
  the same window. The deeper lesson this round adds is a different one: **an escalation raised
  against a *unit's* bounds is not the same as an escalation against the *wave's*, and four seats
  carried ESC-W9a-TIMELINE-NNA forward without re-testing which of the two it was.** A carried
  escalation deserves the same re-measurement at every seat that a carried gate does.

---

## Check 3

SERVED MODEL: `claude-opus-5[1m]` · **FRESH ADVERSARIAL L-20 PASS 3, VERIFY-ONLY** — a third
independent seat that authored **no cure byte, no unit receipt, and no line of `## Close`,
`## Check 1`, `## Repair 1`, `## Check 2` or `## Repair 2`**. Every gate below was re-run at this
seat's own commands against the settled bytes of `tranche-u` @ **`0343ebbb`**, node **v26.0.0**,
darwin arm64. ⟨cmd⟩ `find src -name '*.ts' -newer dist/subpaths/css.d.ts` → **nothing**, so the
standing `dist/` IS the settled bytes' build and no rebuild was imposed on the sibling tracks
(`npm run typecheck`'s own `prepare`/`build` later rebuilt it; every dist-reading gate was re-read
after and is unmoved). Both probes were **double-run** (⟨cmd⟩ `diff -q run1 run2` → silent, twice).

**VERDICT: NOT-CONFORMANT.** **All 33 gate verdicts reproduce at this seat's own double-run
commands — 20 GREEN · 13 RED, zero divergence from Repair 2's tally.** Bounds are clean over
**32 commits / 77 paths**, E-3 is byte-clean measured from the wave's **true** pre-wave base, mail
is clean, the four-verb line is lawful, and every published figure re-measures. The row is **NOT
promoted** for the two HIGH rows the bar admits zero of, both carried and both still uncured:
**D-1** (seven RED gates owned by this wave's own unrun units) and **D-2** (§Format And Lint
Cadence unmet — the tree at HEAD does not typecheck). **0 BLOCKER · 0 CRITICAL · 2 HIGH · 3 MINOR ·
5 INFO.**

### CH3.0 CRASH-RECOVERY sweep (standing law — the host was restarted 2026-09-18)

⟨cmd⟩ `git status --porcelain` → **15 rows**. ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md` → **empty** before this
act. **No killed predecessor's partial work on the check seat exists; nothing inherited, nothing
stashed, nothing restored, no blanket anything.** ⟨cmd⟩ `git diff --cached --name-only` → **empty**.
`scripts/dev/dev.sh` never touched, never staged, never read for edit. The ten dirty `demo/**` rows
(X-W4 / X-W7 seats), `CARRY-LEDGER.md` and the untracked X-W1 / X·F / X-W4 evidence paths were left
exactly as found — every one outside this seat's writable set, which is this section and the X-W9
ledger row.

### CH3.1 Every gate re-run at this seat's own commands — 33 of 33 verdicts reproduce

| # | this seat's command | reading | verdict | vs Repair 2 |
|---|---|---|---|---|
| G1 | `node …/probes/src-surface-totality.mjs` ×2 | exit 1, dies at `:74` `TypeError: TR.decomposeMatrix3D is not a function`; **22 `ok` / 0 RED** before the crash | **RED** | same |
| G2 | `npx vitest run test/parser-totality.test.ts` | **123 passed (123)** | **GREEN** | same |
| G3 | `library-band-gates.mjs` LIB-02 ×2 | **30** — value 1 · css 19 · easing 1 · math 6 · transform 3 | **RED** | same |
| G4 | same probe, LIB-01 | `ok LIB-01 easing(name) is total over the Object.prototype key set`; control ok, unknown → `easing_name_unknown` | **GREEN** | same |
| G5 | `npx eslint 'src/css/**/*.ts' --rule …` ×2 | **0 problems, exit 0**, twice | **GREEN** | same — Repair 2's cure reproduces |
| G6 | `npx vitest run test/transform/path-geometry.test.ts` | **43 passed** | **GREEN** | same |
| G7 | `getTotalLength` expanded vs compact arc flags | expanded `15.701655784773767` = compact `15.701655784773767`, **\|Δ\| = 0** (this seat's own fixture, not the close's) | **GREEN** | same |
| G8 | `getTotalLength` on 4 truncated runs | `0 · 0 · 0 · 5`, every one `typeof "number"`, none NaN | **GREEN** | same |
| G9 | subject retired at `4be22189` | `decomposeMatrix3D` absent from `./transform` | **SUPERSEDED-BY-G27** | same |
| G10 | `npx eslint 'src/transform/**' 'src/foundation/**' --rule …` ×2 | **0 problems, exit 0**, twice | **GREEN** | same |
| G11 | `npx vitest run test/math.test.ts` | **70 passed (70)** | **GREEN** | same |
| G12 | `node …/probes/consumer-surface-compile.mjs` | exit 1 · **2** — `ok LEG1 public return types are nameable from their own subpath`; both LEG2 rows stand (TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED`) | **RED** | same |
| G13 | `grep -c '^declare ' dist/subpaths/*.d.ts` | **20** — css 6 · value 6 · quantize 6 · easing 2 · color 0 · math 0 · transform 0 | **RED** | same |
| G14 | `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` ×2 | **60** occurrences / **26** lines | **RED** | same |
| G15 | `'serializeCssValue' in CSS` + round-trip | **`true`**; `"a : b"` → `{"ok":true,"value":"a: b"}` | **GREEN** | same |
| G16 | `find src -name '*.ts' -exec wc -l {} + \| sort -rn` | **672** `src/transform/path.ts`; then 539 · 519 · 476 · 377 | **GREEN** (672 < 899) | same |
| G17 | `library-band-gates.mjs` LIB-04 leg | `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` | **GREEN** | same |
| G18 | `npx vitest run test/v4-color-behavior.test.ts test/color-anchors.test.ts` | **8 + 12 = 20 passed** | **GREEN** | same |
| G19 | `node …/evidence/W9/coverage-by-export.mjs` ×2 | exit 0 · **`74 / 75 = 98.7%`** and **`71 / 75 = 94.7%`**, byte-identical on both runs | **GREEN** | same |
| G20 | `npm pack` → `node scripts/ci/verify-packed-surface.mjs <tarball>` | exit 1 — **4× TS2305 + 6× TS2339**, every one naming a **retired** matrix symbol or its type (`DecomposedMatrix2D/3D`, `Mat4`, `Vec4`, `decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`, `interpolateDecomposed`, `slerp`) | **RED** | same |
| G21 | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ \| wc -l` | **0** | **RED — UNATTEMPTED** | same |
| G22 | `'toHex' in <./color>` · `'easingNames' in <./easing>` | **false · false** | **RED — UNATTEMPTED** | same |
| G23 | `easing(k)` identity over the 4 CSS keywords | **false, false, false, false** | **RED — UNATTEMPTED** | same |
| G24 | `node …/probes/fourier-value-import-drift.mjs` | `ERR_MODULE_NOT_FOUND` on `…/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | **RED** | same |
| G25 | `Object.keys(bezierPresets).length` | **30** | **GREEN (declared fence)** | same |
| G26 | `grep -rn 'colorScale\|sampleToSVGPath' src/ \| wc -l` | **0** | **GREEN (declared fence)** | same |
| G27 | packed `./transform` export list | keys = `PathGeometry, getPointAtLength, getTotalLength`; **0 of the six** present | **GREEN** | same |
| G28 | `ls …/evidence/W9/bench-table-4.1.md` | **No such file**; accepted/reject legs unmeasured | **RED** | same |
| G29 | `version` · `git tag -l \| grep -c 4.1.0` | **`4.0.0`** · **0** | **RED — UNATTEMPTED** | same |
| G30 | `grep -c 'src/parsing' …/ARCHITECTURE.md` | **0** (grep exit 1) | **GREEN** | same |
| G31 | `package.json` dependency maps | exactly `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `@mkbabb/parse-that` absent from **both** maps | **GREEN** | same |
| G32 | `ConsoleRail.vue:172-180` at HEAD's own blob | still `c.startsWith(upper) \|\| c.startsWith(component)`; `colorSpaceInfo.ts` still keys `ictcp` `:261` / `jzazbz` `:287` by prose labels | **RED — UNATTEMPTED** | same |
| G33 | 5 packets · 5 `INBOX.md` rows · the keyframes exact pin | **5** files dated 2026-09-18 · ⟨cmd⟩ `grep -cE '^\| *O-3[45678]'` → **5** · `../keyframes.js/package.json:71` → `"@mkbabb/value.js": "4.0.0"`, quoted before any tag (there is none) | **GREEN on its three readable legs** | same |

**Tally: 20 GREEN · 13 RED of 33 — identical to Repair 2's, and every one of the 33 reached by this
seat's own command.** GREEN = G2 G4 G5 G6 G7 G8 G9 G10 G11 G15 G16 G17 G18 G19 G25 G26 G27 G30 G31
G33. RED = G1 G3 G12 G13 G14 G20 G21 G22 G23 G24 G28 G29 G32. Read **staged per CC-096**; no
composite verdict is reported.

### CH3.2 The clean axes — measured here, not inherited

**Bounds (axis 2) — CLEAN over 32 commits / 77 paths.** ⟨cmd⟩ `git show --pretty=format:
--name-only` over every commit the ledger row names (11 substance + 9 unit receipts + close ⊕ its
2 ledger/correction commits + Check 1 + 3 Repair-1 commits + Check 2 + Repair 2's 2), unioned and
sorted: **77 distinct paths**. ⟨cmd⟩ the union grepped for
`dev\.sh|eslint\.config|package\.json|CHANGELOG|^demo/|^api/|^e2e/|^\.github/|^fixtures/|node_modules|src/color/model\.ts`
→ **0 hits**. Every non-evidence path resolves to a §File Bounds row: `ARCHITECTURE.md` ·
`coordination/INBOX.md` ⊕ the 5 `*-inbox-2026-*` packets · `scripts/ci/verify-packed-surface.mjs` ·
`src/color/index.ts` · `src/css/{grammar,index,named-colors,rules,serialize,stylesheet,timeline,types}.ts` ·
`src/easing.ts` · `src/foundation/math.ts` · all 7 `src/subpaths/*.ts` ·
`src/transform/{decompose,path}.ts` · `test/{color-anchors,math,parser-totality,v4-color-behavior}.test.ts`
· `test/transform/{decompose-targeted,path-geometry}.test.ts` · `W9.md` · the record · the ledger.
**`scripts/dev/dev.sh` appears in no commit of this wave.** `src/css/rules.ts` and
`src/css/serialize.ts` are the §File Bounds `create` split products whose *"exact names bind at
open"*; `src/css/timeline.ts` is §File Bounds `:81` `modify`, which is Repair 2's own citation and
it holds at the bytes.

**The carve boundaries, re-measured (axis 2).** ⟨cmd⟩ `git diff aa8c8cbd..HEAD --numstat --
docs/tranches/V/ARCHITECTURE.md` → **`1 1`**; ⟨cmd⟩ `-U0 | grep '^@@'` → **`@@ -657 +657 @@`**, one
hunk, one line. X-W8's cap sentence at `:943-945` is **untouched**, which is the cross-wave carve
§Disjointness declares.

**Masking (axis 3) — ZERO.** ⟨cmd⟩ over all 32 commits, **added lines only**, under `src/ test/
scripts/`, grepped for `test\.skip|it\.skip|describe\.skip|\.only\(|@ts-ignore|@ts-expect-error|
eslint-disable|as any|as unknown as` → **one hit**: `474846ce`'s
`expect(decomposeMatrix3D(values as unknown as Mat4)).toBeNull()` — a cast *constructing* hostile
input for a null-return assertion, in `test/transform/decompose-targeted.test.ts`, a file the very
next commit (`4be22189`) **deleted** with the matrix family. ⟨cmd⟩ `git ls-files test/transform/` →
`path-geometry.test.ts` alone. At HEAD: ⟨cmd⟩ `grep -rn 'catch' src/` → **0**; ⟨cmd⟩
`grep -rnE '\.skip\(|\.todo\(|\.only\(' test/` → **0**. ⟨cmd⟩ `grep -nE
'skip|allow|exclude|ignore|strictTypes' scripts/ci/verify-packed-surface.mjs` → four hits, every one
inspected: `:14` a **comment** recording the `strictTypes: 62` deletion, `:220` `stdio: ["ignore",…]`,
`:236` npm's `--ignore-scripts`, `:265` **`skipLibCheck: false`** — which is *stricter*, not a mask.
Its three `try` blocks were read: `:232` the workspace install, `:304` the smoke harness which
**rethrows with the export's name**, `:320` which **rethrows anything that is not
`ERR_PACKAGE_PATH_NOT_EXPORTED`**. **No allowlist, no copied producer selector, no patched
`node_modules`, no narrowed assertion.**

**Repair 2's cure audited for masking, line by line, not inherited (axis 3).** ⟨cmd⟩
`git show 7d02e405 -- src/css/timeline.ts`: three hunks, +21/−9, no cast, no fallback, no `!` moved
elsewhere. This seat re-derived the equivalence rather than reading the differential proof's
verdict: both capture groups are **`(.*)`**, which matches the empty string, so on a truthy match
group 1 is a `string` — never `undefined` — and `input.match(…)?.[1] !== undefined` is therefore
*exactly* the old `if (match)`; on a null match `?.` short-circuits to `undefined`, which is exactly
the old falsy arm. For the range pair, the `comma.length > 2` refusal **on the line above** leaves
lengths 0, 1, 2 only, and `splitTopLevel` yields no `undefined` element (an empty half is `""`), so
`commaStart !== undefined && commaEnd !== undefined` is exactly the old `comma.length === 2`. **The
cure narrows at the root in X-W9.a's own destructure-and-test idiom. It is not a mask, and G5's
green is real.**

**Commit families (axis 4).** §Commit Plan rows 1–8, 10, 12, 13 each landed as **one** commit for
one meaning; ⟨cmd⟩ `git show c18a78f8 --stat -- src/` → **0 lines**, so row 1's RED-first guardrail
holds in the history. Rows **9** (the 4.1.0 cut, which §Commit Plan binds to the two scoped
`no-non-null-assertion` rule objects) and **11** (`colorSpaceInfo.ts` ⊕ `ConsoleRail.vue`) were
**never taken at all** — **no declared family is split**, which is the correct reading of *"commit
families the spec declares must not split"* under a precondition block: not taking a family is
lawful, taking half of it is not, and Repair 2 refused exactly that (R2.3). `5ba934fc` and
`4147e478` are dated in-record corrections beside their receipts, and `7d02e405` is a repair-round
commit on a path no Commit Plan row claims — none splits a family.

**E-3 (axis 5) — byte-clean, measured from the wave's TRUE pre-wave base.** This seat did **not**
use the §State substrate `41450f02`, which predates the authoring of the whole X wave book and would
have printed a spurious 38,000-line delta. ⟨cmd⟩ `git rev-parse c18a78f8^` → **`aa8c8cbd`** (the
commit before this wave's first act). ⟨cmd⟩ `git diff --stat aa8c8cbd..HEAD --
docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/V/megatranche/audit/probes/
docs/tranches/X/waves/W{0,1,2,3,4,5,6,7,8,10,11}.md` → **prints nothing**. The adjudicated registry,
all four probes this wave invokes (`execute, no write` held), and all **eleven** sibling wave specs
are untouched. ⟨cmd⟩ `git diff aa8c8cbd..HEAD --numstat -- docs/tranches/X/waves/W9.md` → **`3 3`**;
⟨cmd⟩ `-U0 | grep '^@@'` → **`@@ -17,3 +17,3 @@`**, one hunk; ⟨cmd⟩ `wc -l` → **522**. ⟨cmd⟩
`sed -n '183p;343p;370p;455p'` → `### X.W9.a …`, the G1 row, the G28 row and Commit Plan row 1 **all
still resolve exactly**, so no sibling's `W9.md:NNN` coordinate is displaced.

**Mail (axis 6) — 0 UNREAD in scope.** ⟨cmd⟩ a per-row `awk` taking each row's **first cell whose
content begins with a bold status verb** (the method Repair 2 established after LW-5; the whole-row
and fixed-column reads are both unsound on this table) → **35 `I-` rows**, of which **3 UNREAD:
I-32 · I-33 · I-34** — ⟨cmd⟩ `grep -oE '^\| *\*?\*?I-[0-9]+ '` confirms 35 distinct ids. Each
Routing cell read whole: I-32 glass-ui's O-20 disposition, I-33 its constellation relay, I-34 a
bbnf-lang letter whose own cell says *"no obligation is minted here"*. **None names the library
band, the 4.1 cut, the parser, `./transform`, `./math` or the five packets.** Four-path sweep for
anything new since Repair 2: ⟨cmd⟩ `/usr/bin/find ../{keyframes.js,glass-ui,fourier-analysis,parse-that}/docs
-name '*2026-09-1[89]*'` → **4 hits, all glass-ui's own**, of which the only inbound letter
(`glass-outbound-2026-09-18-valuejs-o26-reply.md`) is **already rowed I-35** and reads READ +
CONSUMED. **0 unrowed · 0 `I-n` minted · 0 UNREAD addressed to X-W9's scope.** This seat wrote no
byte of `INBOX.md`.

**The four-verb line (axis 7) — lawful.** AUDITED `yes` and SPECIFIED `yes` unmoved; **IMPLEMENTED
`PARTIAL 2026-09-17`**; **VERIFIED `no`**, unmoved, and correctly so — §Dependencies makes X-W11 the
*"release and verified close"*, and the §Closing rider's L-18 quartets are wholly undischarged
(residual R-9). The status edit is the one §File Bounds permits (`W9.md` *"modify (status fields at
close)"*) and it is line-count-neutral.

**Published figures (axis 9) — every one re-measures.** `74 / 75 = 98.7%` and `71 / 75 = 94.7%`
(double-run, byte-identical) · G14 `60 / 26` · G13 `20` (css 6 · value 6 · quantize 6 · easing 2) ·
G16 `672 · 539 · 519 · 476 · 377` · G3 `30` split `1 · 19 · 1 · 6 · 3` · G25 `30` · vitest
`13 failed | 600 passed (613)` split `10 · 1 · 1 · 1` · typecheck `exit 2, 1 error` · lint `55,
0 carriers outside docs/tranches/**`. **Not one published count diverged.**

### CH3.3 Defect register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** (carried, **UNCURED**) | **Seven RED gates have no relief of the kind the bar admits — G21 · G22 · G23 · G24 · G28 · G29 · G32** — and with them the spec's own **Goal criterion clause 4** is FALSE at the bytes. Axis (10) admits exactly three reliefs — producer-owned, routed to a successor by the spec, or an honest-RED the spec names by id — and **§Disjointness §4a is none of them**: it defers a *time* and transfers no owner. §COMPLETABLE 2 says in the spec's own words *"No producer dependency … no Glass-8 trigger gates any unit"*; §Dependencies makes X-W11 the *consumer* of the 4.1.0 tuple, not its author; no `W9.md` byte names any of the seven honest-RED by id. §Dispositions CC-088's *"a ninth carry may not happen"* is violated in fact | **Precondition re-read at this seat's own command immediately before this act**: ⟨cmd⟩ `awk -F'\|' '/^\| X-W4 \|/{print $4}' …/LEDGER.md` → **`**OPEN 2026-09-17**`**; ⟨cmd⟩ same for X-W8 → `planned`. §4a's disjunct *"or runs while neither is open"* therefore still fails on X-W4 alone, and X-W9.h's own gate fails on the same row. The seven, re-read here: ⟨cmd⟩ `version` **4.0.0** · `git tag -l \| grep -c '4\.1\.0'` **0** · `grep -rn '<SCI-1>' src/ \| wc -l` **0** · `'toHex' in color` **false** · `'easingNames' in easing` **false** · `easing` identity **false ×4** · `ls bench-table-4.1.md` **No such file** · G24 `ERR_MODULE_NOT_FOUND` · `ConsoleRail.vue` still prefix-matches at HEAD's own blob | **A repair round behind X-W4's close, not a rewrite** — `ESC-W9R1-SEQUENCING`, carrying `ESC-W9R1-BOUNDS-GRANT`. **Six independent readings now agree** (close · Check 1 · Repair 1 · Check 2 · Repair 2 · this seat), and the units that ran are not at fault: Repair 2 re-tested the split question at the bytes and refused the free half of both families because §Commit Plan rows 9 and 11 bind them. Until X-W4 closes the row stays **PARTIAL** |
| **D-2** | **HIGH** (carried, **UNCURED**) | **§Format And Lint Cadence is not met: the tree at HEAD does not typecheck, and eleven of the thirteen RED tests are this wave's own** — correct cures colliding with artifacts that assert the pre-cure shape. The spec requires `npm run lint`, `npm run typecheck` and `npm test` *"after each integration batch and before close"* | ⟨cmd⟩ `npm run typecheck` ×2 → **exit 2, 1 error**, `test/v4-css-emerging.test.ts(12,10): error TS2459: Module '"../src/css/stylesheet"' declares 'serializeCssValue' locally, but it is not exported` · ⟨cmd⟩ `npx vitest run` ×2 → **`Tests 13 failed \| 600 passed (613)`**, split at this seat's own per-name read: `v4-css-emerging` **10** · `v4-c1` **1** · `spectrum-luma` **1** (inherited, X-W4's C-5) · `demo/test/shell/reka-binding-idiom` **1** (inherited, NG-6) · ⟨cmd⟩ `npx eslint . -f json` → **55 problems across 35 files, 0 of them outside `docs/tranches/**`** | **ONE bounds grant, unchanged.** ⟨cmd⟩ `grep -c` each carrier in `W9.md` → `test/v4-css-emerging.test.ts` **0** · `test/v4-c1.test.ts` **0** · `fixtures/public-types/value-v4.ts` **0**. This seat independently confirms the third: G20's ten errors name **only** retired matrix symbols and their types, so the fixture asserts the pre-cure shape and one deletion cures it. **The one in-bounds shape that would green the typecheck — a forwarding `export { serializeCssValue }` in `stylesheet.ts` — is a legacy-compat shim, forbidden by the standing law and by PSL-1; Repair 2 refused it by name and this seat confirms it is still absent at HEAD.** No seat masked any of it |
| **D-3** | MINOR (carried) | **G14 moved REDDER over a wave that owns it** — `_2` 58 → **60**, lines 25 → **26** | ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60** (double-run, after this seat's rebuild) | Mitigated, unchanged: declared **LW-1**; root measured (the dts rollup keys its entity cache on the **import-specifier string**, so the copy rides in under `src/value.ts`'s `"./color/index"` spelling); three in-bounds re-export variants **measured** ineffective; the +2 is the forced consequence of publishing `serializeCssValue`, which **G15 required**. Carriers `src/value.ts` / `src/quantize.ts` absent from §File Bounds. **Does not block** |
| **D-8** | MINOR (carried) | **§Archaeology's fourth guardrail — the crash *shape* prevention — is still absent from the repo.** G5 and G10 are green only under an explicit `--rule` flag; a new `!` under `src/css/`, `src/transform/` or `src/foundation/` would not redden `npm run lint` | ⟨cmd⟩ `grep -n 'no-non-null-assertion' eslint.config.js` → **no match**; ⟨cmd⟩ `npm run lint` → 55 problems, **none** a non-null assertion | **Rides D-1.** §4a makes `X-W9.f` the file's **sole writer** and §Commit Plan row 9 binds both rule objects into the cut commit. Repair 2 cured the reachable half (the four surviving `!`); the write itself is unreachable in bounds. **Does not block on its own** |
| **D-10** | **MINOR** (**NEW at this pass**) | **`W9.md` §State still publishes *"19 of 33 gates GREEN"* while the ledger — the tranche's authority of record — reads **20 GREEN · 13 RED** since Repair 2.** A successor reading the spec's own status block gets a figure one gate stale | ⟨cmd⟩ `sed -n '17p' docs/tranches/X/waves/W9.md` → *"**19 of 33 gates GREEN** at the close seat's own double-run commands"*; ⟨cmd⟩ the ledger row → *"the tally reads **20 GREEN · 13 RED of 33**"* | Mitigated on three counts and **does not block**: the sentence is **attributed and dated** (*"at the close seat's own double-run commands"*), so it is **true as stated**; §File Bounds admits the `W9.md` status field *"at close"*, and Repair 2 is not a close; and the ledger row — which every successor's `Opens after` reads — carries the current tally in bold. Cure: the figure moves with the next lawful status edit, i.e. X-W9.f's repair round |
| **D-11** | INFO (**NEW at this pass**) | **Goal criterion clause 1 read literally is FALSE for three `./css` shapes, one of which this wave itself published.** ⟨cmd⟩ a 10-string corpus × **every** export of all seven subpaths: `serializeCssValue("")` → `TypeError: n is not iterable`, `coerceToSyntax("")` → `TypeError: … reading 'split'`, the four `collect*` readers → `e.forEach is not a function`. G3's falsifier reads *"Add a public function that indexes an object literal by an unvalidated argument"* — X-W9.d's publication of `serializeCssValue` is literally that, and LIB-02's `./css` leg went 18 → 19 for it | this seat's own enumeration (CH3.4 ①) | **Disclosed twice already** — as **LW-3** at the close (*"the asymmetry is the finding"*) and inside Check 2's CH2.7 ①. Each of the three declares a non-string parameter in its own `.d.ts`, and **G15 required** `serializeCssValue`'s publication. The record's reading — clause 1 binds the entries that declare a string parameter — is **stated and argued, never silent**, and at this seat's own corpus all eleven such entries measure **0 throws**. Nothing owed by this wave |
| D-4 | MINOR → **CURED, re-verified here** | Check 1's stale-denominator finding | ⟨cmd⟩ `node …/coverage-by-export.mjs` ×2 → `74 / 75` and `71 / 75`, byte-identical; the addendum-beside is present at `e4d98aca` and the committed `coverage-by-export.md` is **byte-untouched** (E-3 honoured) | Nothing owed |
| D-5 · D-6 · D-7 · D-9 | INFO (carried) | the `672 > 609` receipt slip (**LW-2**; `.b` booked it first and correctly) · three receipts' `0 UNREAD` from a pattern the bold `**UNREAD` spelling defeats (**LW-5**; the conclusion survives at this seat's own per-row scan) · G33's *"sent"* = AUTHORED + ROWED (**RD-11's own mechanism**, booked R-6) · G33 tallied GREEN with its post-window `npm ls` leg unreadable because the window never opened | re-measured at CH3.1/CH3.2 | Nothing owed |

**Zero BLOCKER. Zero CRITICAL. Two HIGH. The bar admits zero, so the row is not promoted.**

### CH3.4 What this pass measured that passes 1 and 2 did not

① **G3's remainder enumerated from outside the probe, at two corpora, and it matches the probe
name-for-name.** This seat re-derived LIB-02's own count without running LIB-02's logic: every
exported function of all seven subpaths × the probe's 7-value JS-boundary corpus →
**30 throwers**, *exactly* the 30 LIB-02 reports and in exactly its subpath split
(value 1 · css 19 · easing 1 · math 6 · transform 3). Then the same exports × a 10-**string** corpus
(empty · whitespace · the nine empty-body colour functions · `__proto__` · `constructor` ·
`toString`) → **14 throwers**, each read at its own signature: `coerceToSyntax` (arity 2, called
with 1), the four `collect*` readers (declared rule arrays, not text), `serializeCssValue` (declared
`CssValue`), `linearEasing` (declared numeric array), six `./math` entries under the policy §Scope 4
and G11 **ordered** X-W9.c to enforce, and `PathGeometry` called without `new`. **Not one of the
eleven entries that declares a `string` parameter throws on any string** — `parseCssColor`,
`parseCssScalar`, `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`, `parseStylesheet`,
`parseTimingFunction`, `parseAnimationTimeline`, `parseAnimationRange`, `serializeCssColor`,
`easing`. G3's relief holds at a corpus wider than the gate's own, now confirmed a third time and
for the first time **by reproducing the probe's count from the outside**.

② **G20's first cause read at the error text, not at the escalation.** Pass 1 and pass 2 cited
`fixtures/public-types/value-v4.ts` as out of bounds. This seat ran the gate from a fresh
`npm pack` and read the ten errors: **4× TS2305** on `DecomposedMatrix2D`, `DecomposedMatrix3D`,
`Mat4`, `Vec4` and **6× TS2339** on `decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`,
`interpolateDecomposed`, `slerp`. **Every one is a symbol G27 ordered deleted.** The fixture is not
merely stale — it asserts precisely the surface the wave was told to retire, so **G20 and G27 cannot
both be satisfied while the fixture stands**, and the single deletion `ESC-W9e-FIXTURE-V4TYPES` asks
for is the whole of the first cause.

③ **Repair 2's cure re-derived rather than inherited.** The three hunks were read and the
equivalence argued at the regex and at the `> 2` refusal (CH3.2). A verify seat that only re-runs
G5 would see `0 problems` and learn nothing about whether the zero was bought with a silenced
branch; this seat established it was not, from the bytes.

④ **The E-3 base corrected.** `W9.md` §State names `41450f02` as the substrate, and a naive E-3
sweep from it prints a 38,022-line delta across the registry and the whole X wave book — because
that commit **predates the authoring of both**. The wave's true pre-wave base is
⟨cmd⟩ `git rev-parse c18a78f8^` → **`aa8c8cbd`**, and from there the E-3 surfaces are byte-clean.
Stated so no later seat reads a spurious RED off the spec's own substrate line.

⑤ **`skipLibCheck: false`.** X-W9.e's packed-surface script compiles the consumer with library
checking **on** — a strictly harder bar than the default, and the opposite of the mask an
`"allowlist"` grep is looking for. Reported as a superlative with the same provenance duty as a
defect.

### CH3.5 Honest-RED adjudication (axis 10) — six relieved, seven not

**Relieved at the spec's own bytes, owner named, NOT counted against the wave:**

| gate | relief, cited at the bytes | owner named |
|---|---|---|
| **G1** | **Spec-internal mutual exclusion, and the cure is out of bounds.** §Hard Gate G27 orders the six symbols **deleted** (*"no shim, no forwarding export"*); §File Bounds orders this probe **`execute, no write (re-run unmodified)`**; the probe calls `TR.decomposeMatrix3D` unconditionally at `:74`. Both cannot hold and **no unit may lawfully write the probe**. This seat's own run reaches **22 `ok` / 0 RED** before the crash — every assertion the instrument survives to make, the wave's cures pass | ESC-W9a-PROBE-UNRUNNABLE → the sitting, two named options; read staged per **CC-096**, which §Dispositions FOLDS into this wave |
| **G3** | **The gate's name and its cited leg measure different classes**, re-established here from outside the probe (CH3.4 ①): all 30 are shape/arity violations of the published `.d.ts`, the `new`-less class, or the **spec-ordered** `./math` policy. Carriers include `src/css/syntax.ts`, **absent from §File Bounds entirely** | ESC-W9a-G3-LEG-SCOPE → the sitting |
| **G12** | **LEG1 — the leg the barrels own — is GREEN**, the exact two names the falsifier lists. LEG2 is the **root specifier**, which lives in `package.json` (X-W9.f's file, precondition-blocked) and whose absence is a position this repo **already SENT** as **O-12**. §Triumvirate Dispatch names this exact shape an **adjudication, not an edit** (*"that means the exports map, not the barrels, is the defect and the topology ruling is wrong"*) | ESC-W9d-ROOT-AND-SYNTAX (a) → the sitting, two named options |
| **G13** | **33 → 20, thirteen retired.** The remaining 20 arrive under `src/value.ts` / `src/quantize.ts` spellings the dts rollup's entity cache keys on; ⟨cmd⟩ `grep -c` each in `W9.md` → **0 · 0**, and three in-bounds re-export variants were *measured* ineffective. Repair 2 additionally read `easing.d.ts`'s two at the bytes and showed both in-bounds alternatives are **worse than the RED** (one is a fourth ineffective variant, the other creates a second authority for the 30-key set **G25 fences**) | ESC-W9d-DTS-SPELLING → the sitting |
| **G14** | Same root as G13, plus the +2 that **G15 required** (D-3) | ESC-W9d-DTS-SPELLING → same |
| **G20** | **The behavioural half landed and the hardcoded `strictTypes: 62` is gone** (⟨cmd⟩ `grep -n 'strictTypes'` → one **comment**, no emission; the smoke harness rethrows per export name at `:304-307`; `skipLibCheck: false`). The command dies **before** reaching that half, on `fixtures/public-types/value-v4.ts`, **absent from §File Bounds entirely**, whose ten errors are exactly G27's ten retired names (CH3.4 ②) | ESC-W9e-FIXTURE-V4TYPES → the sitting; 14 stale lines, one deletion |

**G5 is no longer on this list** — Repair 2 relieved it *in bounds* and it now measures GREEN at this
seat's own double-run, so the relieved set is **six**, not seven.

**UNRELIEVED — G21 · G22 · G23 · G24 · G28 · G29 · G32.** Every one is owned by `X-W9.f` or
`X-W9.h`, units of **this wave**. None is producer-owned (§COMPLETABLE 2 forecloses it in the
spec's own words), none is routed to a successor by the spec (X-W11 *consumes* the 4.1.0 tuple),
and none is named honest-RED by id anywhere in `W9.md`. **G24 belongs here and not with the
relieved set**: its substrate half is out of bounds (RD-11 forbids the peer-tree write) but the
**analytic arms it measures were never restored**, and that restoration is X-W9.f's own ship list —
both halves wait on the same unrun unit. **That is D-1, and it is why this pass does not promote.**

### CH3.6 The successors' `Opens after` conjuncts, measured against this wave

| successor | its conjunct naming X-W9 | state at these bytes | verdict |
|---|---|---|---|
| **X-W10** | ⟨cmd⟩ `W10.md:6-7` → *"X-W5, X-W6, X-W7, X-W8, X-W9 **stable** (surviving structure fixed) AND the CC-104 precondition ruled at the X-W0 owner sitting"* | X-W9's **library structure** is fixed and measured here (PSL-1 derived · `ok LIB-04` · the god module split · the ratchet fallen 899 → **672**); its **published surface** is not (`4.0.0`, no tag). ⟨cmd⟩ the ledger reads **X-W5 `planned` · X-W6 `planned` · X-W7 `planned` · X-W8 `planned`** | **LAWFULLY BLOCKED — and not by this wave alone.** Four of the five conjuncts are `planned`; X-W10's own row already reads `BLOCKED-ON`. **This check moves nothing for it.** CC-104 is separately discharged at §0k.2 |
| **X-W11** | ⟨cmd⟩ `W11.md:6` → *"X-W0 … X-W10 are **IMPLEMENTED** (four-verb law; not 'closed', not 'reported')"*, and §Dependencies makes *"the 4.1.0 tuple its input"* | `W9.md` §State reads **IMPLEMENTED: PARTIAL**, not `yes`; ⟨cmd⟩ `version` → `4.0.0`, `git tag -l` → no 4.1.0 | **LAWFULLY BLOCKED on this wave**, and the block is load-bearing: it is the structural guard that keeps the un-taken cut from being inherited as done. A `CLOSED` stamp here would read to a later seat as a satisfied X-W11 conjunct while `package.json` still says `4.0.0` |

**Neither block is manufactured by this check, and neither successor is blocked by anything this
pass found.**

### CH3.7 The spec's own Goal criterion, at the bytes (axis 8)

| clause | reading at this seat | verdict |
|---|---|---|
| 1 — *"no public entry throws on a string"* | **every export of all 7 subpaths × a 10-string corpus** → the **eleven** entries that declare a `string` parameter throw **0** times; the 14 that do throw are shape/arity violations, the `new`-less class, or the spec-ordered `./math` policy (CH3.4 ① · D-11) | **TRUE** on the record's stated reading; **FALSE** read literally, disclosed as D-11 |
| 2 — *"no public signature returns a value its own `.d.ts` forbids"* | G8 `0 · 0 · 0 · 5`, every one a finite `number` · G9's null ladder at its own commit, the subject since retired · G11 70 passed · G15 `Result`-typed | **TRUE on every leg the wave touched** |
| 3 — *"every type a subpath returns is nameable from that subpath"* | **TRUE at the consumer** (G12 LEG1 `ok`) · **FALSE in the emitted bytes** (20 bare `declare`, G13) | **SPLIT** |
| 4 — *"ships as one dated 4.1.0 cut whose exact-pin consumers were notified by packet before the tag"* | the **packets were sent** (5 authored · 5 rowed O-34..O-38 · the exact pin `"4.0.0"` at `../keyframes.js/package.json:71` quoted before any tag) · the **cut was not taken** (`4.0.0`, no tag, no CHANGELOG entry, no bench table) | **FALSE** |

**The goal criterion is NOT met.** The close says it in its own words — *"The wave delivered the
surface and withheld the event"* — and a third independent measurement confirms it. **The wave is
incomplete, not dishonest**: nothing is hidden and nothing is finished.

### CH3.8 Superlatives, reported with the same provenance duty as defects (L-18)

- **Three verify passes, three repair-or-close seats, and not one masking construct in 77 paths.**
  ⟨cmd⟩ `grep -rn 'catch' src/` → **0** at HEAD; 0 skips, 0 `@ts-ignore`, 0 `eslint-disable`, 0
  allowlists, 0 patched `node_modules`. The one `try` added to `scripts/ci/` exists **to surface** a
  defect, rethrowing with the failing export's name.
- **Repair 2 corrected a carried escalation rather than carrying it a fifth time**, and its own
  receipt names the lesson without softening it: *"an escalation raised against a **unit's** bounds
  is not the same as an escalation against the **wave's**, and four seats carried
  ESC-W9a-TIMELINE-NNA forward without re-testing which of the two it was."* Both escalations that
  turned out curable came from §C.6's group of seven and both for the same reason — their file was
  in §File Bounds all along. **§C.6's adjudication ask is real; it was two rows smaller than it
  looked**, and the seat that shrank it said so in public.
- **The shim was named and refused.** One line in `src/css/stylesheet.ts` — a file squarely in
  §File Bounds — would have turned `npm run typecheck` green. Repair 2 identified it, called it a
  legacy-compat shim, and left the RED standing. ⟨cmd⟩ at HEAD the export is still absent and the
  TS2459 still fires. **That refusal is worth more than the green it declined.**
- **The RED-first guardrail held and re-proves at the bytes**: ⟨cmd⟩ `git show c18a78f8 --stat --
  src/` → **0 lines**. After §Archaeology's three prior closures of this class against surfaces that
  did not hold it, the instrument preceded the cure in the history — and it is still there,
  123 passing.
- **`skipLibCheck: false`** in the packed-surface consumer (CH3.4 ⑤) — the wave made its own
  hardest gate harder, unasked.

### CH3.9 Disposition

**NOT-CONFORMANT.** The row **stays `PARTIAL 2026-09-17`**; this seat sets no `CLOSED` stamp, moves
no verb, edits no spec and writes no cure byte. All **33** gate verdicts reproduce at its own
double-run commands (**20 GREEN · 13 RED**, G5's movement confirmed real and unbought), bounds are
clean over 32 commits / 77 paths, E-3 is byte-clean from the wave's true pre-wave base, mail is
clean, the four-verb line is lawful, and every published figure re-measures — but **two HIGH defects
stand and the bar admits zero**. Both are the same shape, both were raised by the units themselves,
and neither is curable from inside this wave's §File Bounds today.

What is owed, unchanged and now measured four times: **X-W4 closes → `ESC-W9R1-SEQUENCING`**
(re-dispatch `X-W9.f` and `X-W9.h` under the unchanged spec) **carrying `ESC-W9R1-BOUNDS-GRANT`**
(`test/v4-css-emerging.test.ts`, `test/v4-c1.test.ts`, `fixtures/public-types/value-v4.ts`) →
**CHECK 4**. `ESC-W9-G24-SUBSTRATE`, `ESC-W9d-DTS-SPELLING`, `ESC-W9a-PROBE-UNRUNNABLE`,
`ESC-W9a-G3-LEG-SCOPE`, `ESC-W9d-ROOT-AND-SYNTAX`, `ESC-W9e-SHARMA-NO-SUBJECT`,
`ESC-W9e-FIXTURE-V4TYPES`, `ESC-W9b-V4C1-SNAPSHOT`, `ESC-W9d-EMERGING-SERIALIZE` and
`ESC-W9c-MTS06-SUPERSEDED` ride into that round unrelieved — **ten**, exactly as Repair 2 left them,
of which **five** name a file `W9.md` §File Bounds genuinely never listed.

**This check wrote no cure byte, moved no gate, and edited no spec.** Its only writes are this
section and one appended ledger event line.

---

## Resume — SEAT 0, 2026-09-19 (`ESC-W9R1-SEQUENCING` fires; COHESION §0ac)

SERVED MODEL: `claude-opus-5[1m]`

**Authority**: COHESION **§0ac** (2026-09-19), quoted: *"**`ESC-W9R1-SEQUENCING` fires.** X-W9
re-opens in RESUME MODE; units **`X-W9.f`** … and **`X-W9.h`** … are dispatched under the unchanged
spec, then CHECK 4."* The spec `docs/tranches/X/waves/W9.md` is **unchanged and IMMUTABLE** (E-3);
this section edits no byte of it. Seven units stand on their commits and are **never re-dispatched**.

### RS.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` → **27 rows** (19 tracked-modified/deleted, 8 untracked). **None is
inside this seat's writable set** — `docs/tranches/X/execution/A/X-W9.md`,
`docs/tranches/X/execution/LEDGER.md` and `docs/tranches/V/coordination/INBOX.md` are all **clean**
at HEAD. By owner: `demo/color-picker/**` · `demo/palettes/**` · `demo/shell/**` ·
`demo/styles/shell.css` · `e2e/smoke/**` (sibling demo/e2e seats) · `docs/tranches/X/execution/A/X-W5.md`
(X-W5's resuming close seat) · `docs/tranches/X/execution/B/KF-W13.md` (Track B) ·
`docs/tranches/X/execution/C/F-W9.md` (Track C) · `docs/tranches/X/parse-that/**` (X.P.W4S) ·
`docs/tranches/V/reformation/CARRY-LEDGER.md` (pre-X standing row) · `scripts/dev/dev.sh`
(**unowned, NEVER staged, NEVER touched** — DR-24). **Nothing inherited on X-W9**: the two owed
units' files are clean — ⟨cmd⟩ `git status --porcelain` names neither
`demo/picker/controls/ComponentSliders/ConsoleRail.vue` (X-W4's carve **landed and committed** when
X-W4 closed) nor `package.json` / `eslint.config.js` / `CHANGELOG.md` / `src/**`. No stash, no
restore, no reset.

**Substrate**: branch `tranche-u` @ ⟨cmd⟩ `git log --oneline -1` → **`8b3f7185`**, node **v26.0.0**,
darwin arm64; `dist/subpaths/` present (14 files, built 2026-09-19 16:08 by a sibling seat).

### RS.1 E13 Step-0 — the four-path mail sweep, at this seat's own clock

Swept read-only **2026-09-19**, compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification read from each row's Status/Routing cell by
position, never from a bare `grep -i unread` (X.P.W0 CHECK 1 D-1); `INBOX.md` **self-excluded**
(SELF-COUNT law).

Delta command, against this record's last banked sweep clock:
⟨cmd⟩ `/usr/bin/find <each path> -maxdepth 1 -name '*.md' -newermt '2026-09-18 20:03'` →

1. `docs/tranches/V/` — **1** hit, `ARCHITECTURE.md` (X-W9.g's own `:657` carve + sibling waves):
   an architecture document, **not mail**.
   `docs/tranches/V/coordination/` — **6** hits: the **five packets this wave's `.i` sent**
   (`keyframes-inbox-…-4.1-cut-notice`, `atlas-inbox-…-export-delta-refresh`,
   `glassui-inbox-…-4.1-r1-relay`, `fourier-inbox-…-facility19-delta`,
   `parse-that-inbox-…-evidence-addendum-2`) — rowed **O-34 · O-35 · O-36 · O-37 · O-38** — plus
   `INBOX.md` itself (self-excluded).
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**:
   ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`. Delta = **0**;
   newest is `glass-outbound-2026-09-18-valuejs-o26-reply.md` (Sep 18 17:18) = **I-35**, rowed, cell
   reads READ + CONSUMED WHOLE.
3. `../keyframes.js/docs/tranches/V/coordination/` — **1** hit, `INBOUND-LEDGER.md` (Sep 19 00:36):
   **keyframes' own inbound ledger**, their terminal-verb record of *our* mail, not a packet addressed
   to value.js; ⟨cmd⟩ `grep -c 'INBOUND-LEDGER' docs/tranches/V/coordination/INBOX.md` → **15** — the
   surface is already rowed. Its 2026-09-19 addendum terminalizes **IN-VALUE-2** (`sampleBezier` NOT
   ADOPTED, permanently), which **confirms** `X-W9.f`'s standing DECLINE; nothing is owed back.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — delta **0** (newest Aug 3 15:01), all rowed.

**Result: 0 unrowed · 0 UNREAD addressed to value.js.** No `I-n` minted. One dated sweep line
appended at the end of `INBOX.md`.

### RS.2 Preconditions, verified at the bytes AND in the ledger

| conjunct | where | measured |
|---|---|---|
| §2 `Opens after` **X-W0** | LEDGER row `X-W0` | **CLOSED 2026-09-17** (honest-RED close, §0k.3) — satisfied |
| `X-W9.h` gate: X-W4 **CLOSED** (§4a, `ConsoleRail.vue`) | LEDGER row `X-W4` | **CLOSED 2026-09-17**, promoted at CHECK 2 (16/16 GREEN, honest-RED set EMPTY) — **the gate the unit was deferred on is now open**, and §0ac fires the re-dispatch by name |
| `X-W9.f` gate: **neither X-W4 nor X-W8 OPEN** on `eslint.config.js` (§Disjointness cross-wave) | LEDGER rows `X-W4` · `X-W8` | X-W4 **CLOSED**; X-W8 ⟨cmd⟩ `awk -F'\|' '$2 ~ /X-W8/ {print $4}'` → **`planned`** — **not OPEN**. §Disjointness' own words: *"sequences after both X-W4 and X-W8 close, **or runs while neither is open**"* — satisfied on the second arm |
| `ConsoleRail.vue` free of a sibling's in-flight carve | working tree | **clean at HEAD** — not in `git status --porcelain` |
| the seven standing units' commits exist | `git log -1 --format='%h %s'` ×20 | **20/20 resolve** (11 substance + 9 receipt), listed at §C.1 — **none re-dispatched** |

**No precondition fails. The wave resumes.**

### RS.3 Baseline — **only the gates the two owed units turn**, re-run READ-ONLY at this seat

RESUME LAW: the still-owed units turn **G21–G26 · G28 · G29** (`.f`), **G32** (`.h`), and **G5 · G10
config-resident** (`.f`). Those are re-measured here at this seat's own double-run commands. Every
other gate's reading is **cited from the banked §C.2 / CH3.1 table**, not re-run and not re-claimed.

| # | gate | command (this seat) | reading 2026-09-19 | verdict |
|---|---|---|---|---|
| G21 | SCI-1 shipped with its evidence tuple | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ \| wc -l` (×2) | **0** · **0** | **RED** — ninth carry; unmoved since open |
| G22 | `toHex` + `easingNames()` published | `grep -rn 'toHex' src/` → nothing; `grep -rn 'easingNames' src/` → nothing; then `node -e "'toHex' in require('./dist/subpaths/color.js')"` / `'easingNames' in …/easing.js` | source **0** / **0**; packed **`false`** / **`false`** | **RED** |
| G23 | `easing()` reference stability | `node -e` identity over the four CSS keywords against `dist/subpaths/easing.js`; `grep -n 'memo\|cache\|Map()' src/easing.ts` | `ease=false ease-in=false ease-out=false ease-in-out=false` (**4/4 fresh closures**); **0** memo constructs in source | **RED** |
| G24 | restored analytic arms vs 0.13.0 | `timeout 100 node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` | **the probe cannot run at its written substrate**: `ERR_MODULE_NOT_FOUND … /Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | **RED — and its substrate is the one §0ac ruled**: `X-W9.f` measures the eight arms against the **registry `0.13.0` tarball** (`npm pack` into a scratch dir outside every repo, integrity hash into `bench-table-4.1.md`); `../fourier-analysis` **stays untouched** (`ESC-W9-G24-SUBSTRATE`) |
| G25 | catalog fence (`bezierPresets` 30-key set) | read at the bytes | **GREEN at authorship, deliberately** (the spec says so) — the fence's RED input is a deletion, which is a reviewed diff | **GREEN (spec-declared)** |
| G26 | ND-01 prune fence | `grep -rn 'colorScale\|sampleToSVGPath' src/ \| wc -l` (×2) | **0** · **0** | **GREEN (spec-declared at authorship)** |
| G28 | bench table under the restated denominator | not run here | **MEASURE-AT-OPEN, banked**: R1 throws 13/13 at the wave's open; every 3×/2× budget restates against **1,636,680 µs** (3× = 545,560 · 2× = 818,340 against the native floor 311,883). The `1,870,633 µs` figure stays **UNCITABLE** | **RED (unmoved)** |
| G29 | one dated cut | `node -e "require('./package.json').version"` (×2) · `git tag --list 'v4*'` · `grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json` | **`4.0.0`** · **`4.0.0`** · tags = **`v4.0.0`** only · keyframes pins **`"4.0.0"` exactly at `:71`** | **RED** — the cut is the one thing this wave never took |
| G5 | `no-non-null-assertion` under `src/css/` | `npx eslint 'src/css/**/*.ts' --rule '{…:"error"}'` (×2) | **exit 0 · 0 problems** ×2 | **GREEN at the source bytes** — but **config-resident it does not exist**: ⟨cmd⟩ `grep -n 'no-non-null-assertion' eslint.config.js` → **exit 1, no match**. `.f` is the file's sole writer |
| G10 | same, `src/transform/` + `src/foundation/` | same invocation, scoped (×2) | **exit 0 · 0 problems** ×2 | **GREEN at the source bytes**, same config-resident absence |
| G32 | channel descriptors resolve exactly | read at the bytes — `sed -n '172,180p' demo/picker/controls/ComponentSliders/ConsoleRail.vue` | `componentDescription()` still holds the prefix `find`: `info.components.find((c) => c.startsWith(upper) \|\| c.startsWith(component))`; `colorSpaceInfo.ts` still keys `ictcp:` (`:261`) and `jzazbz:` (`:287`) by description-prose, not by the library's channel ids | **RED** — `cp` → `"Ct (tritan)"`, `jz` → bare key; unmoved |

#### RS.3.1 — R.2 GREEN-before-cure, named

- **G25** and **G26** are **GREEN at authorship by the spec's own words** — declared fences, not
  cures. Recorded for completeness, not as findings.
- **G5** and **G10** read **exit 0** at the source bytes *before* `X-W9.f` writes either rule object.
  That is real (`.a` and `.b` retired all 94 + 155 assertions, and `ESC-W9a-TIMELINE-NNA` was
  relieved in bounds at Repair 2) — but the **ratchet does not yet exist**: no `no-non-null-assertion`
  object is in `eslint.config.js`, so nothing stops a `!` returning. `.f`'s config edit is what turns
  a measured absence into an enforced one; its config-resident re-run must stay exit 0 **and** the
  grep must then find both objects.

### RS.4 Unit plan — TWO units, ONE group, concurrency 2

**Already done, never re-dispatched** (commits at §C.1, all 20 shas re-resolved at this seat):
`X-W9.a` · `X-W9.b` · `X-W9.c` · `X-W9.d` · `X-W9.e` · `X-W9.g` · `X-W9.i`.

**Owed**: `X-W9.f` ∥ `X-W9.h` — the original §Unit plan's **group 5**, re-dispatched unchanged.
Disjoint at every path: `.f` holds `package.json` · `CHANGELOG.md` · `src/**` · `eslint.config.js` ·
`test/**` · `fixtures/**`; `.h` holds exactly two `demo/` files. Zero shared `modify`. Model: **opus**
for both (M-23 — *"every unit below is an Opus 5 implementation seat"*; no Fable seat exists in this
wave).

| id | model | sections (`W9.md`) | writable set | gates | locks / same-commit family |
|---|---|---|---|---|---|
| **X-W9.f** | opus | §Agent Units `X.W9.f` **:264-284**; §Hard Gate G21–G26, G28, G29 **:363-371** (+ G5 **:345**, G10 **:350** config-resident); §Commit Plan row 9 **:463**; §Dependencies **:472-489** | `package.json` · `CHANGELOG.md` · `src/color/index.ts` · `src/color/operations.ts` · `src/easing.ts` · `src/subpaths/*.ts` · `eslint.config.js` · `test/easing-export-stability.test.ts` · **§0ac grants**: `test/v4-css-emerging.test.ts` · `test/v4-c1.test.ts` · `fixtures/public-types/value-v4.ts` · `src/value.ts` · `src/quantize.ts` · `docs/tranches/V/megatranche/audit/probes/src-surface-totality.2026-09-19.mjs` (**create**, dated sibling) · `docs/tranches/X/waves/W9-bounds-grant-addendum-2026-09-19.md` (**create**, the dated addendum-beside) · `docs/tranches/X/waves/evidence/W9/**` · its receipt in this record · `docs/tranches/X/waves/W9.md` **§State status fields only, at close** (D-10) | G21 G22 G23 G24 G25 G26 G28 G29 · G5 + G10 **config-resident** | **ONE dated cut, ONE version bump, no emergency 4.0.1** (ruled). SCI-1 ships **with** the atlas evidence tuple in the **same** commit; **both** `no-non-null-assertion` rule objects ride that same commit; `.f` is `eslint.config.js`'s **sole writer** in this wave. Re-read the X-W4 **and** X-W8 rows immediately before the first write; halt if either reads OPEN. §0j.F word (1) verified **before** the cut |
| **X-W9.h** | opus | §Agent Units `X.W9.h` **:300-312**; §Hard Gate G32 **:374**; §Commit Plan row 11 **:465** | `demo/color-session/colorSpaceInfo.ts` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` (**`:172-180` carve only**) · `docs/tranches/X/waves/evidence/W9/**` · its receipt in this record | G32 | **Both files in ONE commit.** Re-read the LEDGER's X-W4 row first (**measured CLOSED 2026-09-17** at this open). **No new library export** — `ChannelsBySpace` already publishes the id vocabulary. Touch **no** focus, pointer, template or roving-tabindex surface: X-W4's landed carve is adjacent in the same file |

**Groups**: `[ [X-W9.f, X-W9.h] ]` — one ordered group, peak concurrency **2** (owner cap 4; the
spec's §Disjointness caps this wave lower). After both: **CHECK 4** (§0ac).

**Worktree idiom**: `.h` takes `value.js-x-w9-h` per §Worktree Plan (`npm run typecheck` runs
`prepare`/`build`, so two concurrent seats sharing one `dist/` measure each other); `.f` runs on
integrated main, as §Worktree Plan says, and is the **last** writer.

### RS.5 The ten carried escalations, each with its §0ac ruling and its owner

| escalation | §0ac ruling | who executes it |
|---|---|---|
| `ESC-W9R1-SEQUENCING` | **fires** — `.f` and `.h` dispatched under the unchanged spec, then CHECK 4 | this open |
| `ESC-W9R1-BOUNDS-GRANT` | dated addendum to §File Bounds, **writer `X-W9.f`**: `test/v4-css-emerging.test.ts` · `test/v4-c1.test.ts` · `fixtures/public-types/value-v4.ts` | `.f` |
| `ESC-W9d-EMERGING-SERIALIZE` | the import migrates to `serializeCssValue`'s new home; **the forwarding shim in `stylesheet.ts` stays REFUSED** | `.f` |
| `ESC-W9b-V4C1-SNAPSHOT` | the six retired `./transform` names leave the snapshot, which becomes **G27's own ratchet** | `.f` |
| `ESC-W9e-FIXTURE-V4TYPES` | the fourteen stale lines naming G27's retired symbols are **deleted** | `.f` |
| `ESC-W9d-DTS-SPELLING` | `src/value.ts` + `src/quantize.ts` granted: **one import spelling**, the one the subpath barrels use, so the dts rollup's entity cache merges; G13/G14 measured after, any remainder **named by count** | `.f` |
| `ESC-W9d-ROOT-AND-SYNTAX` (a) | G12 LEG2 = option **(ii) declared-retired**; O-12 is the position of record; **no `"."` key is added** | `.f` (records it) |
| `ESC-W9a-G3-LEG-SCOPE` | G3 binds to entries declaring a `string` parameter; shape/arity and the `./math` policy are **outside its class**; `src/css/syntax.ts` **is not written** | `.f` (records it) |
| `ESC-W9a-PROBE-UNRUNNABLE` · `ESC-W9c-MTS06-SUPERSEDED` | E-3 keeps the dated instrument; `.f` lands the **dated sibling** `src-surface-totality.2026-09-19.mjs` with MTS-05/MTS-06 re-pointed to the cured contract, **every other arm unchanged**; G1's command of record re-points by the same addendum | `.f` |
| `ESC-W9e-SHARMA-NO-SUBJECT` | option (i) — **SUPERSEDED-BY-THE-V4-CUT**; G18's Sharma half is relieved by this id | `.f` (records it) |
| `ESC-W9-G24-SUBSTRATE` | the registry **`0.13.0` tarball** via `npm pack` into a scratch dir **outside every repo**; integrity hash into `bench-table-4.1.md`; `../fourier-analysis` untouched | `.f` |
| **D-10** | `W9.md` §State's tally moves with `.f`'s **close-time status edit** (the spec's single named §File Bounds exception) | `.f` |

### RS.6 Unit receipts (resume round)

*(appended by each unit at its close; line 1 names the served model; every count read from the
settled bytes and double-run; ⟨cmd⟩ … → output for every claim.)*

### RS.7 The LEDGER act landed, and is **WITHHELD from this seat's commit** — measured, not assumed

Both LEDGER edits are **written and present in the working tree**: the `X-W9` status cell now reads
**`RESUME-OPEN 2026-09-19`** with the `PARTIAL 2026-09-17` disposition **preserved inside the same
cell** (nothing regressed, nothing deleted — a minimal in-place replacement of one unique anchor,
verified `count == 1` before the substitution, and the file's line count is **unchanged at 411 → 412**
after the appended event line).

They are **not in this seat's commit**, for a reason read at the bytes immediately before committing:

⟨cmd⟩ `git diff --unified=0 docs/tranches/X/execution/LEDGER.md | grep '^@@'` →
```
@@ -32 +32 @@    <- mine (the X-W9 status cell)
@@ -83 +83 @@    <- A SIBLING SEAT'S: the X.P.W4S row, OPEN 2026-09-17 -> PARTIAL 2026-09-19
@@ -411,0 +412 @@ <- mine (the event line)
```
Line 83 is **Track D's uncommitted work**, written into the shared file between this seat's opening
`git status` (clean) and this act. A pathspec commit is file-granular: `git commit … -- LEDGER.md`
takes the **working-tree** content of that path, so it would sweep the sibling's row into a Track-A
commit — exactly the contamination measured at X-W0 (three contaminated commits) and the same
judgement the Track-C seat recorded at `0f93a570`. Staging a partial blob does not help: the standing
law's own idiom re-reads the working tree at `git commit -- <paths>`.

**Therefore**: this seat commits `docs/tranches/X/execution/A/X-W9.md` and
`docs/tranches/V/coordination/INBOX.md` only. The LEDGER bytes stand in the working tree, readable by
every seat, and the **next Track-A act that finds line 83 committed** commits them. No `git stash`, no
`reset`, no unstaging of another seat's rows, no `git add -u`, no `-A`.

## Resume 2 — SEAT 0, 2026-09-19 (the tracks relaunch under COHESION §0ag; §0ac's re-dispatch unchanged)

SERVED MODEL: `claude-opus-5[1m]`

**Authority**: COHESION **§0ac** (the re-dispatch of record, unchanged) read together with **§0ag**
(2026-09-20), quoted: *"the synchronized kill times are the tick delivery times to the second …
the session-only cron `e8961b17` is **deleted** … All four tracks relaunch in RESUME MODE now
(A live · D · C · B), inside the owner's cap. §0ae/§0af are superseded on their diagnosis, not on
their durability posture."* This seat is Track A's relaunch. The spec `docs/tranches/X/waves/W9.md`
is **unchanged and IMMUTABLE** (E-3); this section edits no byte of it, and no byte of the prior
`## Resume` section — it is an addendum-beside.

### RS2.0 CRASH-RECOVERY sweep (standing law) — one inherited path, adopted

⟨cmd⟩ `git status --porcelain` → **27 rows**. Exactly **one** is inside this seat's writable set:

```
 M docs/tranches/X/execution/LEDGER.md
```

That is **not** a killed seat's half-work — it is the prior resume seat's *deliberately withheld*
act, documented at §RS.7: both edits written, the commit withheld because a sibling's X.P.W4S row
sat uncommitted at line 83 and a pathspec commit would have swept it. The condition it named has
now cleared. ⟨cmd⟩ `git diff --unified=0 docs/tranches/X/execution/LEDGER.md | grep '^@@'` →

```
@@ -32 +32 @@      <- the X-W9 status cell (RESUME-OPEN 2026-09-19)
@@ -411,0 +412 @@  <- the resume event line
```

**Two hunks, both Track A's own.** Line 83 is gone from the diff: the sibling committed it. Every
hunk was read whole and judged against the spec — the cell preserves `PARTIAL 2026-09-17` inside
itself (nothing regressed, nothing deleted), the event line is append-only at the file end. Both
**conform**; this seat **adopts them unrewritten** and commits them with its own event line beside.
Inherited path named in this receipt: `docs/tranches/X/execution/LEDGER.md`.

The two owed units' files are **clean at HEAD** — ⟨cmd⟩ `git status --porcelain` names none of
`package.json` · `CHANGELOG.md` · `eslint.config.js` · `src/**` · `test/**` · `fixtures/**` ·
`demo/color-session/colorSpaceInfo.ts` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue`.
**Nothing is inherited on `.f` or `.h`.** The other 26 rows belong to sibling seats by owner
(`demo/color-picker/**` · `demo/palettes/**` · `demo/shell/**` · `demo/styles/shell.css` ·
`e2e/smoke/**` · `docs/tranches/X/execution/A/X-W5.md` · `docs/tranches/X/execution/B/KF-W13.md` ·
`docs/tranches/X/parse-that/**` · `docs/tranches/V/reformation/CARRY-LEDGER.md`) and
`scripts/dev/dev.sh` (**unowned, NEVER staged, NEVER touched** — DR-24). No stash, no restore, no
reset, no blanket add.

**Substrate**: branch `tranche-u` @ ⟨cmd⟩ `git log --oneline -1` → **`7bc3cc0d`** (§0ag), node
**v26.0.0**, darwin arm64; `dist/subpaths/` present (14 files).

### RS2.1 A finding against the ruling that re-seated this track (E-3, reported loud)

**§0af's parenthetical is FALSE at the bytes.** It reads *"the orchestrator **stops both runs** (A at
X-W9's close seat with `.f` and `.h` landed …)"*. Measured here:

⟨cmd⟩ `git log --oneline df721da5..HEAD` → **4** commits, all `docs(X·exec…)` chassis/COHESION acts;
⟨cmd⟩ `git log --oneline -200 | grep -iE 'x-w9|w9\.[a-z]'` → **6** lines, **none** a `.f` or `.h`
unit commit. §0ae's own words agree: *"`X-W9.f` burning all six attempts in 57 minutes with **zero
receipts**"*. `X-W9.f` and `X-W9.h` have **never landed a byte**; plan rows 9 and 11 still read
`— NEVER TAKEN —` at §C.1. The parenthetical describes a state that does not exist, and this seat
records it **beside** the ruling rather than acting on it: the units stay owed and are re-dispatched.

### RS2.2 E13 Step-0 — the four-path mail sweep, at this seat's own clock

Swept read-only **2026-09-19**, compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification read from each row's Status cell **by
position**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 D-1); `INBOX.md` **self-excluded**
(SELF-COUNT law).

Delta command, against the prior resume seat's banked clock:
⟨cmd⟩ `/usr/bin/find <each path> -maxdepth 1 -name '*.md' -newermt '2026-09-19 16:00'` →
**one hit, `docs/tranches/V/coordination/INBOX.md` itself** (self-excluded). **Delta = 0.**

1. `docs/tranches/V/` + `docs/tranches/V/coordination/` — newest five packets are this wave's own
   `.i` outbound set, rowed **O-34 · O-35 · O-36 · O-37 · O-38**: ⟨cmd⟩ `grep -c` each →
   `keyframes-…-cut-notice` **1** · `atlas-…-export-delta-refresh` **1** ·
   `glassui-…-4.1-r1-relay` **1** · `fourier-…-facility19-delta` **1** ·
   `parse-that-…-evidence-addendum-2` **2**. All rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3`
   → `BK/` · `BJ/` · `BI/`: **BK re-confirmed the newest glass tranche dir**. Newest packet
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, ⟨cmd⟩ `grep -c` → **33** citations,
   rowed READ + CONSUMED WHOLE. Delta **0**.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest is `INBOUND-LEDGER.md` (their terminal-verb
   record of *our* mail, not a packet addressed to value.js); ⟨cmd⟩ `grep -c 'INBOUND-LEDGER'` → **16**
   — the surface is rowed. Delta **0** since the prior clock.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest `valuejs-inbound-2026-07-27-…`,
   delta **0**, all rowed.

Positional read of the whole ledger: ⟨cmd⟩
`awk -F'|' '/^\| *[IO]-[0-9]+ /{…field trimmed == "UNREAD"…}'` → **positional UNREAD rows: 0**
(the file's 79 raw `UNREAD` occurrences are vocabulary prose and `UNREAD → READ` transitions).

**Result: 0 unrowed · 0 UNREAD addressed to value.js.** No `I-n` minted. One dated sweep line
appended at the end of `INBOX.md`.

### RS2.3 Preconditions, verified at the bytes AND in the ledger

| conjunct | where | measured |
|---|---|---|
| §2 `Opens after` **X-W0** | LEDGER row `X-W0` | **CLOSED 2026-09-17** (honest-RED close, §0k.3) — satisfied |
| `X-W9.h` gate: X-W4 **CLOSED** (§4a) | LEDGER row `X-W4` | **CLOSED 2026-09-17**, promoted at CHECK 2 (16/16 GREEN) — the deferral gate is open |
| `X-W9.f` gate: neither X-W4 nor X-W8 **OPEN** on `eslint.config.js` (§Disjointness) | LEDGER rows `X-W4` · `X-W8` | X-W4 **CLOSED**; X-W8 cell reads **`planned`** — **not OPEN**. §Disjointness' second arm (*"or runs while neither is open"*) satisfied |
| `ConsoleRail.vue` free of a sibling's in-flight carve | working tree | **clean at HEAD** — absent from `git status --porcelain` |
| the seven standing units' commits exist | ⟨cmd⟩ `git cat-file -t` ×20 | **resolved: 20/20** (11 substance + 9 receipt) — **none re-dispatched** |
| the cron that read as a wall is gone | COHESION §0ag | cron `e8961b17` **deleted**; all four tracks relaunch inside the owner's cap |

**No precondition fails. The wave resumes at the same two units.**

### RS2.4 Baseline re-bank — the owed units' gates only, re-run READ-ONLY at this seat's clock

RESUME LAW: only the gates `X-W9.f` and `X-W9.h` turn are re-measured here. Every other gate's
reading is **cited from the banked §C.2 / CH3.1 / RS.3 tables**, not re-run and not re-claimed.
Nothing below is inherited: each row names the command this seat ran, 2026-09-19.

| # | gate | command (this seat) | reading | verdict |
|---|---|---|---|---|
| G21 | SCI-1 + atlas evidence tuple shipped | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ \| wc -l` (×2) | **0** · **0** | **RED** — unmoved (tenth reading, ninth carry) |
| G22 | `toHex` + `easingNames()` published | `grep -rn 'toHex' src/` / `grep -rn 'easingNames' src/`; then `node -e "'toHex' in require('./dist/subpaths/color.js')"` and the same for `easingNames` on `easing.js` (×2) | source **0** / **0**; packed **`false`** / **`false`** ×2 | **RED** |
| G23 | `easing()` reference stability | `node -e "e.easing('ease')===e.easing('ease')"` against `dist/subpaths/easing.js` (×2); `grep -n 'memo\|cache\|Map()' src/easing.ts` | **`identity false`** ×2; **0** memo constructs in source | **RED** |
| G24 | restored analytic arms vs `0.13.0` | `ls ../fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js` | **`No such file or directory`** — the written substrate is still absent | **RED — substrate ruled**: `ESC-W9-G24-SUBSTRATE` (§0ac) sends `.f` to the registry `0.13.0` **tarball** (`npm pack` into a scratch dir outside every repo, integrity hash into `bench-table-4.1.md`); `../fourier-analysis` **stays untouched** |
| G25 | catalog fence (30-key `bezierPresets`) | read at the bytes | **GREEN at authorship, by the spec's own words** — the fence's RED input is a deletion | **GREEN (spec-declared)** |
| G26 | ND-01 prune fence | banked at RS.3 (`grep` → 0 · 0) | **0** | **GREEN (spec-declared at authorship)** |
| G28 | bench table under the restated denominator | not run here (MEASURE-AT-OPEN) | banked: R1 throws **13/13**; every 3×/2× budget restates against **1,636,680 µs** (3× = 545,560 · 2× = 818,340 vs native floor 311,883); `1,870,633 µs` stays **UNCITABLE**; no `bench-table-4.1.md` exists | **RED (unmoved)** |
| G29 | one dated cut | `node -e "require('./package.json').version"` (×2) · `git tag --list 'v4*'` · `grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json` | **`4.0.0`** ×2 · tags = **`v4.0.0`** only · keyframes pins **`"4.0.0"` at `:71`** | **RED** — the cut is still untaken |
| G5 | `no-non-null-assertion` under `src/css/` | `npx eslint 'src/css/**/*.ts' --rule '{…:"error"}'`, exit captured **without a pipe** | **exit 0 · 0 bytes of output** | **GREEN at the source bytes · RED config-resident**: ⟨cmd⟩ `grep -c 'no-non-null-assertion' eslint.config.js` → **0** |
| G10 | same, `src/transform/` + `src/foundation/` | same invocation, scoped, exit captured directly | **exit 0 · 0 bytes** | same split verdict — **`.f` is the config file's sole writer** |
| G32 | channel descriptors resolve exactly | `sed -n '172,180p' demo/picker/controls/ComponentSliders/ConsoleRail.vue` · `grep -n 'ictcp:\|jzazbz:' demo/color-session/colorSpaceInfo.ts` | `componentDescription()` still prefix-matches — `info.components.find((c) => c.startsWith(upper) \|\| c.startsWith(component))`; the tables still key `ictcp:` (`:261`) and `jzazbz:` (`:287`) by description-prose | **RED** — `cp` → `"Ct (tritan)"`, `jz` → bare key |

**Eleven rows, two GREEN by declaration, nine unmoved since RS.3 at a different seat's commands.**

#### RS2.4.1 R.2 — every GREEN that precedes its cure, named as a finding

- **G25** · **G26** — GREEN **at authorship, by the spec's own declaration** (fences, not cures).
  Recorded for completeness; neither is evidence that anything was done.
- **G5** · **G10** — **exit 0 at the source bytes before `X-W9.f` writes either rule object.** The
  cleanliness is real (`.a` retired 94 assertions, `.b` 155, and `ESC-W9a-TIMELINE-NNA` was relieved
  in bounds at Repair 2) — but **the ratchet does not exist**: `grep -c 'no-non-null-assertion'
  eslint.config.js` → **0**, so nothing stops a `!` returning tomorrow. `.f`'s config edit is what
  turns a measured absence into an enforced one; after it, the scoped runs must stay **exit 0** *and*
  the grep must find **both** objects. A GREEN whose enforcement is absent is a finding, not a pass.

### RS2.5 Unit plan — unchanged from RS.4: TWO units, ONE group, concurrency 2

**Already done, never re-dispatched.** Seven units stand on their commits; all **20** shas re-resolved
by object type at this seat — ⟨cmd⟩ `git cat-file -t` ×20 → **resolved = 20 · missing = 0**
(11 substance: `c18a78f8` `97ab3991` `474846ce` `4be22189` `a692069f` `5ba934fc` `c8848bed`
`42727db0` `df0807fe` `0e37318e` `8f0a0e79`; 9 receipt: `86461bc2` `5266ac97` `c42e245d` `efe3db89`
`83da21d5` `4db2fb64` `4147e478` `3281fbdd` `d6065411`):
`X-W9.a` · `X-W9.b` · `X-W9.c` · `X-W9.d` · `X-W9.e` · `X-W9.g` · `X-W9.i`.

**Owed**: `X-W9.f` ∥ `X-W9.h` — the spec's own §Sequencing **group 5**, re-dispatched under the
**unchanged** spec (§0ac). Disjoint at every path: `.f` holds `package.json` · `CHANGELOG.md` ·
`src/**` · `eslint.config.js` · `test/**` · `fixtures/**`; `.h` holds exactly two `demo/` files.
**Zero shared `modify` path.** Model **opus** for both (M-23 — *"every unit below is an Opus 5
implementation seat"*; this wave names no Fable, adjudicator or design-author seat).

**Groups**: `[ [X-W9.f, X-W9.h] ]` — one group, peak concurrency **2** (owner cap 4; §Disjointness
caps this wave lower). After both land: **CHECK 4** (§0ac), which this seat does not dispatch.

**Worktree idiom** (§Worktree Plan): `.h` takes `value.js-x-w9-h` — `npm run typecheck` runs
`prepare`/`build`, so two concurrent seats sharing one `dist/` would measure each other; `.f` runs on
integrated main as the **last** writer.

**Gate guard, restated for both seats**: the first act is to re-read the LEDGER's `X-W4` row (`.h`)
and the `X-W4` **and** `X-W8` rows (`.f`); if either reads `OPEN`, write **no byte** and return the
deferral (§4a). Measured at this open: **X-W4 CLOSED 2026-09-17** · **X-W8 `planned`** — both seats
are clear to write.

### RS2.6 A claim in RS2.2 corrected BESIDE, not rewritten (E-3)

RS2.2 above closes *"One dated sweep line appended at the end of `INBOX.md`."* **That was unrealised
at the bytes when this seat opened.** ⟨cmd⟩ `git status --porcelain docs/tranches/V/coordination/INBOX.md`
→ **no rows**; ⟨cmd⟩ `git log --oneline -1 -- docs/tranches/V/coordination/INBOX.md` → **`df721da5`**,
the *prior* resume seat's commit. The Resume-2 predecessor was killed between writing its section and
appending the line — the same shape Track C recorded at `c616ef1f` (a section claiming *published*
that no commit carried). The predecessor's prose is **left exactly as written**; this correction sits
beside it, and **this seat performs the append**, so the sentence becomes true by act rather than by
edit.

This seat's own sweep, re-run at its own clock (not inherited): ⟨cmd⟩
`/usr/bin/find <each of the four paths> -maxdepth 1 -name '*.md' -newermt '2026-09-19 00:00'` →
`docs/tranches/V/` **0** · `docs/tranches/V/coordination/` **1** (`INBOX.md` itself, **self-excluded**)
· `../glass-ui/docs/tranches/BK/coordination/` **0** (⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK/` · `BJ/` · `BI/` — **BK re-confirmed the newest glass tranche dir**) ·
`../keyframes.js/docs/tranches/V/coordination/` **1** (`INBOUND-LEDGER.md`, keyframes' own terminal-verb
record of *our* mail — a rowed surface, ⟨cmd⟩ `grep -c 'INBOUND-LEDGER' INBOX.md` → **16**) ·
`../sci-report/atlas/docs/tranches/P/coordination/` **0**. Register, read positionally from each row's
status cell and never from a bare `grep -i unread`: ⟨cmd⟩ `awk -F'|' …` → **positional UNREAD rows: 0**
over ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **81** rows. **0 unrowed · 0 UNREAD addressed to
value.js · no `I-n` minted.**

### RS2.7 Unit receipts (resume round 2)

*(appended by each unit at its close; line 1 names the served model; every count read from the settled
bytes and double-run; ⟨cmd⟩ … → output for every claim.)*

### RS2.8 The commit this seat takes

Pathspec, on the commit itself: `docs/tranches/X/execution/A/X-W9.md` ·
`docs/tranches/X/execution/LEDGER.md` · `docs/tranches/V/coordination/INBOX.md`. The LEDGER's two
inherited hunks are **adopted unrewritten and carried here**: ⟨cmd⟩
`git diff --unified=0 docs/tranches/X/execution/LEDGER.md | grep '^@@'` → `@@ -32 +32 @@` (the X-W9
status cell, `RESUME-OPEN 2026-09-19` with `PARTIAL 2026-09-17` **preserved inside the same cell**) and
`@@ -411,0 +412 @@` (the resume event line) — **the sibling's line-83 hunk is gone**, committed by its
own track, so RS.7's withholding condition has cleared and no foreign byte rides this commit. A second
event line is appended for the §0ag relaunch. Nothing else is staged; no `git add -u`, no `-A`, no
stash, no reset; `scripts/dev/dev.sh` untouched (**DR-24**).

### X-W9.f

SERVED MODEL: claude-opus-5[1m]

**The 4.1.0 cut, taken 2026-09-19** under `ESC-W9R1-SEQUENCING` (COHESION §0ac), on integrated main
as the wave's LAST writer. Eight acts, in order, each with its ⟨cmd⟩ receipt. Every published count
is read from the settled bytes and double-run; the packed tarball is the oracle wherever a surface
is the subject (PT-08).

#### F.0 CRASH-RECOVERY sweep (standing law) — nothing inherited

⟨cmd⟩ `git status --porcelain -- package.json CHANGELOG.md src/ eslint.config.js test/ fixtures/
docs/tranches/X/waves/ docs/tranches/X/execution/A/X-W9.md
docs/tranches/V/megatranche/audit/probes/` → **no rows**. The writable set was clean at open; no
predecessor seat's partial work was adopted, and no path outside it was touched to find that out.

The index was **not** clean, and that matters: ⟨cmd⟩ `git diff --cached --name-only` after this
unit's first `git add` printed `demo/shell/PaneSegmentedControl.vue` — a sibling seat's **staged
deletion**, present before this seat existed. It was neither unstaged nor committed. Every commit
below carries its own pathspec ON THE COMMIT, and ⟨cmd⟩ `git show --name-only --format= <sha>`
confirms that file rides none of them.

#### F.1 The §4a gate and §0j.F word (1), verified BEFORE the first write

| precondition | ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| LEDGER X-W4 row | `awk -F'\|' … LEDGER.md` (row 33) | **CLOSED 2026-09-17** — promoted at CHECK 2, 16/16 §6 gates GREEN, honest-RED set EMPTY | clear to write |
| LEDGER X-W8 row | same, row 38 | **`planned`** — not OPEN | clear to write (§4a's own alternative) |
| §0j.F word (1) | `git log --oneline tranche-u -- .github/workflows/release.yml` | `8a7792b9` ⊕ `62ccf4a1` — the cherry-picks of `44ddaff7` ⊕ `e2652f1c` | **PRESENT** |
| §0j.F word (1), byte identity | `git show <each>:.github/workflows/release.yml \| shasum -a 256` ×3 | `f928c28a…6bc6ad` for `44ddaff7`, `8a7792b9` **and `tranche-u`** | **VERBATIM** |

The two `ci(release)` hardening commits rode in before the cut, byte-for-byte, as the word requires.
`.github/workflows/**` stays in this unit's Do-NOT-touch and no byte of it was written.

#### F.2 The ship list, act by act

- **SCI-1 + its evidence tuple, ONE commit** (`f3fccfb7`). `sampleColorRamp` / `mixColorsInto` /
  `toRgba8Into` on `./color`. The tuple is **re-resolved at the consumer's bytes rather than
  quoted**: ⟨cmd⟩ `sed -n '171,190p;245,265p' ../keyframes.js/src/animation/compile/emit/backward/color.ts`
  → `sampleRamp` defined at `:171`, called at `:250`
  (`sampleRamp(fromColor, toColor_, stopCount, space, hueOpt.hueMethod)`) and at **`:263` with
  `1024`** — the densify's OKLab reference ramp. Their implementation `throw new TypeError`s on a
  failed mix; ours answers in a `Result`. `count === 1` samples progress 0, their measured
  convention, preserved rather than re-decided.
- **`toHex`** on `./color` — `#rrggbb`, `#rrggbbaa` below full opacity, the spelling both measured
  hand-rolled copies already agree on (`demo/color-session/picker-color.ts:295`,
  `../fourier-analysis/web/src/lib/colors.ts:69`).
- **`easingNames()`** on `./easing` — 40 names, frozen, reference-stable.
- **Memoised `easing()`** — a `Map`, not an object literal, for the same reason `PRESETS` is
  prototype-free: the key is caller-supplied.
- **RD-5, the 8 restored analytic arms** — module-private functions bound to catalog names that
  already exist, so the catalog stays 40 and `bezierPresets` stays 30.
- **Barrel corrections** — `src/value.ts`, `src/quantize.ts` and `src/easing.ts` publish the
  vocabulary they return; the three subpath barrels drop the hand-kept lists PSL-1 retires.
- **AM-13 strip** — see F.4.
- **Both `no-non-null-assertion` rule objects into `eslint.config.js`, one edit, same commit**, as
  §Commit Plan row 9 binds and §4a requires. Sole writer.
- **DECLINED, and the decline is at the bytes**: ⟨cmd⟩ `grep -rn 'sampleBezier\|resolveCssColor' src/`
  → **0**; ⟨cmd⟩ `grep -rn 'colorScale\|sampleToSVGPath' src/` → **0** (G26's fence, unmoved).

#### F.3 Gate readings, BEFORE → AFTER, every one double-run

`cut-gates-2026-09-19.txt` holds both runs; ⟨cmd⟩ `diff run1 run2` → **empty**.

| gate | BEFORE (this seat's own re-measure at open) | AFTER | verdict |
|---|---|---|---|
| **G21** SCI-1 + tuple | `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ \| wc -l` → **0** | **6**; packed `sampleColorRamp=true mixColorsInto=true toRgba8Into=true`; ramp at **n=1024 → length 1024**; `mixColorsInto` → `ok=true`, out `0.430277,0.041826,0.026516,1`; `toRgba8Into` → `ok=true`, `out[4..7]=12,34,56,255` | **GREEN** |
| **G22** `toHex` + `easingNames` | packed `'toHex' in color` → **false**, `'easingNames' in easing` → **false** | **true** / **true**; `toHex(rgb(12,34,56))` → `{"ok":true,"value":"#0c2238"}`; `easingNames()` → **40** | **GREEN** |
| **G23** reference stability | `easing(n).value === easing(n).value` → **false 4/4** | **true 4/4**, and **true 40/40** across the whole catalog | **GREEN** |
| **G24** restored arms vs 0.13.0 | 8 of 22 drift, max\|Δ\| **1.923e-1** (`ease-out-circ`) | **0 of 22**; worst residual **4.563e-6** on `ease-in-out-back`, untouched by this wave; exit 0 | **GREEN** |
| **G25** catalog fence | 30 `bezierPresets` keys | **30**, and `bezierPresets["ease-out-circ"]` still `[0.075,0.82,0.165,1]` — the restoration moved resolution, not data | **GREEN** (fence held) |
| **G26** ND-01 prune fence | 0 | **0** | **GREEN** (fence held) |
| **G28** bench table | no `bench-table-4.1.md`; R1 throws 13/13 | table published under the restated denominator; **R1 0 throws / 13 calls** on the packed tarball | **GREEN** |
| **G29** one dated cut | `4.0.0`; tags `v4.0.0` only | `4.1.0`; tags `v4.0.0 v4.1.0`; one `## [4.1.0] — 2026-09-19` CHANGELOG entry; **one** bump event, **no 4.0.1** | **GREEN** |
| **G5** config-resident | `grep -c 'no-non-null-assertion' eslint.config.js` → **0** | **2** objects; ⟨cmd⟩ `npx eslint 'src/css/**/*.ts'` (no `--rule`) → **exit 0** | **GREEN** |
| **G10** config-resident | same, **0** | ⟨cmd⟩ `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts'` → **exit 0**; ⟨cmd⟩ `npx eslint 'src/**/*.ts'` → **exit 0** | **GREEN** |

**Ten of ten turned.** RS2.4.1's finding is answered in its own terms: the ratchet that did not exist
now exists, so G5/G10's green is enforced rather than merely measured.

#### F.4 AM-13 — the strip, and the cycle it closed

⟨cmd⟩ `grep -rn 'glass-ui' src/` → **nothing**; ⟨cmd⟩ `grep -rl '@mkbabb/glass-ui' demo/ | wc -l` →
**84**. So glass-ui is a `demo/` dependency carried as a **runtime** dependency of a library whose
published `files` are `dist/` alone. It moves to `devDependencies`.

⟨cmd⟩ `grep -rn '@mkbabb/keyframes' --exclude-dir={node_modules,.git,docs,dist} .` → **5 hits, all
in `package-lock.json`**. Zero source consumers anywhere. It is **removed outright**, not demoted —
and the lockfile diff shows what that entry actually was:

```
-        "node_modules/@mkbabb/keyframes.js": {
-            "dependencies": { "@mkbabb/value.js": "4.0.0"
```

**Installing value.js installed a copy of value.js.** AM-13's "day-one defuse" was load-bearing and
nobody had measured what it defused. Runtime dependencies are now **empty**, which satisfies the
standing allowlist `runtime deps ⊆ {@mkbabb/parse-that}` vacuously — and the allowlist, not a bare
"no runtime deps", is what the P1.6 decree needs.

Tombstone, backfilled where the act happens rather than by editing an immutable release entry: the
4.1.0 CHANGELOG records that [4.0.0] shipped these two and never said so.

#### F.5 Escalations — four, each with its exact one-act cure

| id | what | the cure, named precisely | why not here |
|---|---|---|---|
| **`ESC-W9f-CSSD-VOCAB-SPELLING`** | `css.d.ts`'s **6** bare declares (`AnyColor` + the five `_2`) and all **60** `_2` references are ONE defect: the exported copy enters from `src/css/index.ts:51-58`'s `export type { … } from "../color/index"`, the duplicate rides in with `CssScalar` from `src/value.ts` | **one 8-line edit**: re-point that block to `"../value"`, which now publishes the same vocabulary, so both routes name one entity | `src/css/index.ts` is `modify` in `W9.md` §File Bounds but is **not in this unit's writable set**. It is worth G13's whole remainder bar one, G14 entire, and G1's last RED (MTS-09) |
| **`ESC-W9f-PACKED-SURFACE-EXPECTED`** | G20 RED. Its **type** leg now passes — the fixture cure landed — and it fails at the runtime export-list assertion because `scripts/ci/verify-packed-surface.mjs`'s `expected` and `SMOKE` maps are stale by **7** names: `isAnyColor` and `serializeCssValue` (X-W9.d's, stale before this cut) plus this cut's five | add those 7 to `expected` and one smoke case each | `scripts/ci/verify-packed-surface.mjs` is X-W9.e's file, outside this unit's set. **Disclosed as authored-into**: 2 of the 7 predate this cut, 5 are this cut's |
| **`ESC-W9f-LOCKFILE-DERIVATIVE`** | `package-lock.json` is in no §File Bounds row, and a manifest whose lock contradicts it breaks `npm ci` | regenerated mechanically — ⟨cmd⟩ `npm install --package-lock-only`, **zero authored bytes**; diff confined to the bump, the deps→devDeps move, the keyframes removal and its `"dev": true` markers | raised against this seat itself, for the check seat to rule |
| **`ESC-W9f-ARCH-DEPS-CLAUSE`** | `ARCHITECTURE.md`'s parse-that paragraph enumerates the two now-stripped deps | one sentence | **G31 is NOT reddened** — the paragraph dates itself (*"recorded against ground truth 2026-09-18"*) and every parse-that claim in it stays true. INFO |

**A finding against the ruling that authorized this seat, reported loud (E-3).**
`ESC-W9d-DTS-SPELLING` rules that the dts rollup keys its entity cache on the **import-specifier
string**. That premise is **false at the bytes**, measured twice: the two spellings can never be
equal across directories, and rewriting `src/value.ts`/`src/quantize.ts` to the directory form
`"./color"` and rebuilding left ⟨cmd⟩ `grep -c '^declare ' dist/subpaths/*.d.ts` → **sum 20** and
⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts | wc -l` → **60**, both unmoved. The seat did **not**
substitute a third spelling and did not loop: it performed the cure X-W9.d had **named** one
paragraph later and left unexecuted — the module that returns a type publishes it — and measured it.
**G13 33 → 20 → 7** (`value` 6→0, `quantize` 6→0, `easing` 2→1, `css` 6 unmoved). The spelling was
restored to its original bytes so no cosmetic change survives that cures nothing.

#### F.6 §Format And Lint Cadence, and what this cut did NOT fix

All ×2, at this seat's own commands, after the cut.

| command | at Check 3 (banked) | at this close | carriers |
|---|---|---|---|
| `npx vue-tsc -p tsconfig.lib.json --noEmit` | exit 0 | **exit 0** | — |
| `npx vue-tsc -p tsconfig.test.json --noEmit` | **1 error** | **2 errors** | both `test/gradient-parse.test.ts:32,:63` — `ParsedGradientModel.intervals`, removed from the demo model by an earlier commit. The 1→2 is not a regression: the ONE error Check 3 counted was `v4-css-emerging`'s, **cured here**, and these two were behind it in the same file list |
| `npx vitest run` | **13 failed / 600 passed** | **4 failed / 628 passed (632)** | `gradient-parse` 2 · `spectrum-luma` 1 (*its own message* routes it to X-W4) · `demo/test/shell/reka-binding-idiom` 1 (demo/, routed). **Not one is in a file any unit of this wave may write** |
| `npx eslint . --max-warnings=0` | 55, 0 carriers outside `docs/tranches/**` | **55, 0 carriers outside `docs/tranches/**`** | unchanged; the `docs/tranches/**` ignore is X-W8's G-6. The dated sibling probe this unit authored is **clean** (⟨cmd⟩ eslint on it → exit 0) |

**Zero masking constructs written.** ⟨cmd⟩ `grep -rn 'catch' src/` → **nothing at all**; no
`test.skip`, no `@ts-ignore`, no `eslint-disable`, no allowlist, no `as any`, no node_modules patch.
The one shape that would have greened the typecheck without any of this — re-exporting
`serializeCssValue` from `stylesheet.ts` — is a legacy-compat shim and stays **REFUSED BY NAME**, as
Repair 2 refused it; the import was migrated to the published home instead.

#### F.7 Measurements this seat adds that no prior seat made

1. **The 40-name catalog is derived, not asserted.** `easingNames()` returns
   `Object.keys(PRESET_TABLE)` ⊕ the direct-only names, and ⟨cmd⟩ the committed test measures **40**,
   `new Set(names).size === 40`, and every name resolving. It is the exact set keyframes builds
   `timingFunctionEntries` from (`compile/easing/registry.ts:29`), so G25's fence now holds **by
   derivation** rather than by two lists agreeing.
2. **The 8 restored arms are bit-exact, not merely inside tolerance.** Each of the eight reads
   `max|Δ| = 0.000e+0` against 0.13.0 over 1001 samples, because both spell the same closed form.
   The table also **discloses the limit it cannot certify**: fourier's ESC-4 gate is `Δ = 0` while
   our target is `<1e-3`, so MPC-5's sampler stays the correct instrument at their end.
3. **G24's substitute substrate is validated against a PUBLISHED artifact.** Run against the
   `4.0.0` **tarball from the registry** — not this worktree — the substitute oracle reproduces the
   banked drift table name-for-name (8/22, max 1.923e-1). The substitution is therefore proven, not
   asserted, and `../fourier-analysis` was neither read nor written.
4. **The five new `./color` symbols add ZERO JS-boundary throwers.** ⟨cmd⟩
   `node …/library-band-gates.mjs` → LIB-02 `30`, split `value=1 css=19 easing=1 math=6 transform=3`
   — **identical to Check 3's split, `color=0` on both sides of the cut**. A surface addition that
   moves G3's count by nothing is the strongest statement available that it is total.
5. **G16's ratchet is not endangered by SCI-1.** ⟨cmd⟩ `find src -name '*.ts' -exec wc -l {} + | sort -rn | head -1`
   → **672** `src/transform/path.ts`, against 899 at wave open. `src/color/operations.ts` grew
   331 → **440** with the SCI-1 trio and `toHex`, well under the max and colocated with the
   `mixColors` / `toRgba8` it builds on. Reported as a superlative's shadow, with the same
   provenance duty as a defect (L-18): it is the largest single-file growth this cut caused.
6. **G12 LEG1 moved GREEN under the dts publications** — ⟨cmd⟩ `node …/consumer-surface-compile.mjs`
   → `ok LEG1 public return types are nameable from their own subpath`. LEG2 is the declared-retired
   root, GREEN by `ESC-W9d-ROOT-AND-SYNTAX` (a); ⟨cmd⟩ `node -e` on the manifest confirms the
   `exports` map still holds **exactly the seven subpath keys** and the cut added no `"."`.

#### F.8 E13 mail — 0 UNREAD in scope, swept at this seat's own clock

⟨cmd⟩ `/usr/bin/find <each of the four paths> -maxdepth 1 -name '*.md' -newermt '2026-09-19 00:00'` →
`docs/tranches/V/` **0** · `docs/tranches/V/coordination/` **1** (`INBOX.md` itself, self-excluded) ·
`../glass-ui/docs/tranches/BK/coordination/` **0** · `../keyframes.js/docs/tranches/V/coordination/`
**1** (`INBOUND-LEDGER.md`, their terminal-verb record of our mail, already rowed) ·
`../sci-report/atlas/docs/tranches/P/coordination/` **0**.

Register read **positionally** from each row's status cell, never from a bare `grep -i unread`:
⟨cmd⟩ `awk -F'|' …` → **0 positional UNREAD** over ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` →
**81** rows. **0 unrowed · 0 minted · 0 UNREAD addressed to value.js.** No packet was authored here:
G33 is X-W9.i's and its five packets were sent **before** this tag, which is the ordering the gate
requires. `INBOX.md` is not in this unit's writable set and no byte of it was written.

#### F.9 Commits, the tag, and the disposition

| # | sha | scope | pathspec verified |
|---|---|---|---|
| 1 | **`f3fccfb7`** | `feat(4.1.0): SCI-1 + toHex + easingNames + restored analytic arms` — §Commit Plan **row 9**, the family that may not split: SCI-1 ⊕ its atlas/keyframes evidence tuple ⊕ **both** scoped `no-non-null-assertion` rule objects, one edit, one commit | **16** files; ⟨cmd⟩ `git show --name-only` — the sibling's staged `demo/shell/PaneSegmentedControl.vue` rides **none** |
| 2 | **`a37073cf`** | `docs(X-W9.f): the dated totality-probe sibling and the bounds-grant addendum` | 2 files |
| 3 | **`10e9a446`** | `docs(X-W9.f/evidence): the 4.1 bench table, G24's re-substrated drift leg, the cut's gates` | 5 files |
| 4 | *(this record)* | `docs(X-W9.f): receipt + W9.md §State status fields (D-10)` | 2 files |

**Tag `v4.1.0` → `f3fccfb7`**, annotated, carrying the ship list, the three permanent declines and
one sentence that is deliberate: *"Publication to the registry is X-W11's act, not this tag's."*
G29 names the tag and this unit takes it; §State names **X-W11** as the release-and-verified close,
so the tag is created and **not pushed and not published** by this seat.

**D-10 discharged** — `W9.md` §State now carries the tally history at each seat's own clock
(19 → 20 → **26 of 33**) and names the seven RED. ⟨cmd⟩ `wc -l W9.md` → **526**, unchanged: two
lines replaced by two, no line delta, §File Bounds' single named exception honoured exactly.

**Disposition: DONE.** All ten gates this unit owns are GREEN and double-run. Four escalations ride,
each with its one-act cure named and its file identified; none of the four is a gate this unit was
given. The wave stays PARTIAL until X-W9.h's G32 and CHECK 4, neither of which is this seat's to
stamp.

**Superlatives, with the same provenance duty as defects (L-18).** Two, both measured. The
`ESC-W9d-DTS-SPELLING` cure X-W9.d *named and did not perform* was right — 20 bare declares to 7 on
three `export type` blocks, after three re-export variants in the barrels had failed — which says
the defect was never in the barrels and the earlier seats' honesty about "measured ineffective"
preserved exactly the information needed to find it. And the AM-13 strip, which the spec lists in a
half-sentence, turned out to be removing an **install-time dependency cycle** on a library whose
own consumer exact-pins it; the lockfile diff is the only place that fact was ever visible.

#### F.10 The LEDGER act — written by this seat, CARRIED BY A SIBLING'S COMMIT (measured, reported)

The four resume seats before this one **withheld** their LEDGER act because a sibling's hunk sat
uncommitted in the shared index (§RS.7, §R.10.6). This seat hit the mirror image of that hazard and
reports it rather than letting it pass as a clean act.

⟨cmd⟩ `git status --porcelain docs/tranches/X/execution/LEDGER.md` **immediately before writing** →
**no rows** (clean). The act was then written: one **minimal in-place** insertion into the X-W9 row's
status cell and one appended event line — ⟨cmd⟩ `git diff --unified=0 … | grep '^@@'` → `@@ -32`,
`@@ -418,0 +419,2`, and **`@@ -56`**, a Track B `KF.W11 · W12 · W13` edit that landed **between this
seat's read and its write**. A pathspec commit could not have separated them, so the commit was
**withheld** and the foreign hunk polled instead: ⟨cmd⟩ 4 polls at 15 s → `hunks=3 foreign56=1` ×3,
then **`hunks=0`**.

Zero hunks with the content still present means the file was committed by someone else. ⟨cmd⟩
`git log --oneline -3 -- docs/tranches/X/execution/LEDGER.md` → **`3c1bcf8c`**, Track C's
`docs(x-f-w9/repair-1/ledger)` — and ⟨cmd⟩ `git show HEAD:…/LEDGER.md | grep -c 'X-W9.f\` LANDED'` →
**1**, with both edits intact at `:32` and `:420`.

**So: the ledger act is in HEAD and readable by CHECK 4, and this seat authored no contaminated
commit — but a sibling's did.** Four consecutive seats have now been blocked or crossed by the same
shared index on the same file. The withholding idiom protects the *withholder* and nothing else; the
hazard is structural and belongs to the sitting, not to any one seat. Recorded as an observation,
not an escalation: no byte was lost and none was wrongly rewritten.

---

## Close — RESUME ROUND, 2026-09-19 (VERIFY-ONLY; E-3: the 2026-09-18 `## Close` above is IMMUTABLE and is not rewritten)

SERVED MODEL: `claude-opus-5[1m]` · **CLOSE SEAT, VERIFY-ONLY** — this seat authored **zero cure
bytes**. All **33** gates were re-run by this seat at the settled bytes of `tranche-u` @
**`8afe7145`**, node **v26.0.0**, darwin arm64, against a `dist/subpaths/` **this seat rebuilt**
(⟨cmd⟩ `npm run build` → `✓ built in 2.82s`) and against a tarball **this seat packed**
(⟨cmd⟩ `npm pack` → `mkbabb-value.js-4.1.0.tgz`, 37 222 bytes, 20 files). Every published count is
read from the settled bytes and **double-run**.

**VERDICT: PARTIAL.** **26 GREEN · 7 RED** of 33 — the same *count* §State carries, and a
**different set**. §State (written by X-W9.f) names the seven RED as
`G1 · G3 · G12 · G13 · G14 · G20 · G32`. At this seat's own commands **G32 is GREEN** (X-W9.h
landed at `95792b44`, two commits *before* the cut, and turned it) and **G31 is RED** (X-W9.f's
AM-13 strip landed *after* X-W9.g's paragraph and falsified its enumeration clause). The corrected
set is **`G1 · G3 · G12 · G13 · G14 · G20 · G31`**. The arithmetic coincidence is recorded rather
than smoothed: a tally that reproduces is not the same as a membership that reproduces.

**One HIGH landed-wrong is found here that no prior seat measured** — `LW-A`, the AM-13 strip's
removal of `@mkbabb/keyframes.js`, reproduced in a clean room. It is reported, not cured.

### CL2.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md
docs/tranches/X/waves/evidence/W9 docs/tranches/X/waves/W9.md` → **empty** before this act.
**Nothing inherited, nothing stashed, nothing restored.** The seventeen dirty rows in the tree are
sibling seats' (`demo/**`, `e2e/**`, `docs/tranches/X/execution/A/X-W5.md`,
`docs/tranches/X/keyframes/waves/KF-W13.md`, `CARRY-LEDGER.md`) and were never touched;
`scripts/dev/dev.sh` was never touched and never staged.

### CL2.1 Commit roster — the resume round's eight, every one in bounds

⟨cmd⟩ `git show --name-only --format= <sha>` on each; the union was taken and compared to
§File Bounds plus the `ADDENDUM 2026-09-19` and `W9-bounds-grant-addendum-2026-09-19.md`.

| # | commit | unit | paths | bounds |
|---|---|---|---|---|
| 11 | **`95792b44`** | .h | `demo/color-session/colorSpaceInfo.ts` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` | both are §File Bounds `modify` rows; §4a satisfied (X-W4 `CLOSED 2026-09-17`) |
| — | **`e5d8f196`** | .h | 3 × `evidence/W9/g32-channel-descriptors.*` | evidence |
| — | **`413feebb`** | .h | `docs/tranches/X/execution/A/X-W9.md` (+213) | record |
| 9 | **`f3fccfb7`** | .f | **16** files — `package.json` · `CHANGELOG.md` · `eslint.config.js` · `src/{value,quantize,easing}.ts` · `src/color/{index,operations}.ts` · `src/subpaths/{easing,quantize,value}.ts` · `test/{easing-export-stability,v4-c1,v4-css-emerging}.test.ts` · `fixtures/public-types/value-v4.ts` · **`package-lock.json`** | 15 of 16 are §File Bounds or addendum rows; **`package-lock.json` is in NO row** — `ESC-W9f-LOCKFILE-DERIVATIVE`, ruled below |
| — | **`a37073cf`** | .f | the dated probe sibling · `W9-bounds-grant-addendum-2026-09-19.md` | addendum grant (create) |
| — | **`10e9a446`** | .f | 5 × evidence, incl. `bench-table-4.1.md` | evidence |
| 13 | **`cf8c54b4`** | .f | `X-W9.md` · `W9.md` (§State only, `wc -l` 526 → 526) | record + the §File Bounds status-field exception |
| — | **`daae1fc6`** | .f | `X-W9.md` | record |

**Bounds: CLEAN with one disclosed exception.** Union = **29** paths. ⟨cmd⟩ the union grepped for
`dev.sh` → **0**; for `PaneSegmentedControl` (the sibling's staged deletion that sat in the shared
index throughout) → **0**. No `api/**`, no `e2e/**`, no `.github/**`, no `src/color/model.ts`, no
peer-repo byte. **§Commit Plan row 9's family did not split**: SCI-1, its atlas evidence tuple and
**both** scoped `no-non-null-assertion` rule objects all ride `f3fccfb7`.

**`ESC-W9f-LOCKFILE-DERIVATIVE` — RULED BENIGN, at the bytes rather than on the argument.** ⟨cmd⟩
`git show f3fccfb7 -- package-lock.json --stat` → `50 insertions, 29 deletions`, and the diff is
exactly the version bump, the `dependencies`→`devDependencies` move with its fourteen `"dev": true`
markers, and the `@mkbabb/keyframes.js` block's removal — **zero authored bytes**. ⟨cmd⟩
`npm ci --dry-run` → **exit 0**, so the lock does not contradict the manifest it derives from. A
lock that lagged its manifest would break `npm ci` in all four CI jobs; carrying it was correct.

### CL2.2 The gate table, BEFORE → AFTER, every row re-run by this seat

BEFORE is the **2026-09-18 close's** own AFTER column (§C.2) — the last reading taken before the
resume round wrote a byte. AFTER is this seat's own double-run command at `8afe7145`.

| # | gate | BEFORE (close 1, 2026-09-18) | AFTER (this seat, double-run) | verdict |
|---|---|---|---|---|
| G1 | no `./css` entry throws on any string | probe **died at `:74`**, 22 ok / 0 RED, MTS-05..09 unreached | command of record is the dated sibling (ADDENDUM): exit 1, **1 failing assertion** — `RED MTS-09 css.d.ts carries 6 unexported declares referenced by the public signatures: Alpha_2, AnyColor, Channel_2, ChannelsBySpace_2, Color_2, SpaceId_2`. All 8 other arms **ok** | **RED** — one head, `ESC-W9f-CSSD-VOCAB-SPELLING` |
| G2 | empty-body colour functions typed-failure | `123 passed (123)` | **`123 passed (123)`** | **GREEN** |
| G3 | prototype-key totality, 7 subpaths (LIB-02) | **30** (value 1 · css 19 · easing 1 · math 6 · transform 3) | **30**, split **identical**: `value=1 css=19 easing=1 math=6 transform=3` — **`color=0` on both sides of the cut** | **RED** — unmoved; the five new `./color` exports added **zero** throwers |
| G4 | `easing()` total over `Object.prototype` keys | `ok LIB-01` | **`ok LIB-01`**; control `ease` ok, unknown → `easing_name_unknown` | **GREEN** |
| G5 | `no-non-null-assertion` under `src/css/` | **4** (`timeline.ts`), `--rule` flag only, **no config object** | ⟨cmd⟩ `grep -c 'no-non-null-assertion' eslint.config.js` → **2**; ⟨cmd⟩ `npx eslint 'src/css/**/*.ts'` (**no `--rule`**) → **exit 0** | **GREEN — and now enforced** rather than measured |
| G6 | `PathGeometry` total on M-less paths | 43 passed | **43 passed**; probe MTS-03 **4/4 ok** | **GREEN** |
| G7 | arc-flag spelling equivalent | \|Δ\| = 0 | `ok MTS-04 compact == expanded (31.403311569547547)` | **GREEN** |
| G8 | truncated runs honour the declared type | 0 · 0 · 0 · 5, all finite | **0 · 0 · 0 · 5**, all finite `number` | **GREEN** |
| G9 | singular 3D matrices return `null` | GREEN at `474846ce`; subject retired at `4be22189` | subject still retired — ⟨cmd⟩ `ls src/transform/decompose.ts` → absent | **GREEN at its own commit; SUPERSEDED-BY-G27** |
| G10 | `no-non-null-assertion` under `src/transform/` + `src/foundation/` | exit 0, `--rule` flag only | ⟨cmd⟩ `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts'` → **exit 0**; ⟨cmd⟩ `npx eslint 'src/**/*.ts'` → **exit 0** | **GREEN — and now enforced** |
| G11 | `./math` enforces its stated preconditions | 70 passed | **70 passed (70)** | **GREEN** |
| G12 | consumer compiles against the packed tarball | exit 1 · 2 — LEG1 ok, LEG2 ×2 | exit 1 · **2** — `ok LEG1 public return types are nameable from their own subpath`; LEG2 TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED`. ⟨cmd⟩ `node -e` on the manifest → `exports` holds **exactly** the seven subpath keys; the cut added no `"."` | **RED on the probe's exit; LEG2 relieved declared-retired** (ADDENDUM · O-12) |
| G13 | zero bare `declare` in emitted `.d.ts` | **20** (css 6 · value 6 · quantize 6 · easing 2 · color 0) | **7** — `css 6 · easing 1`, everything else **0** | **RED, and much less red** — 33 → 20 → **7** |
| G14 | zero `_2` mangles in `css.d.ts` | **60** / 26 lines | **60** / **26 lines** | **RED** — unmoved; one head with G1's, one 8-line cure |
| G15 | `serializeCssValue` published + `Result` | `true`; `"a : b"` → `"a: b"` | **`true`**; three fixtures through the **packed** tarball: `"a : b"`→`{"ok":true,"value":"a: b"}` · `"1px solid red"`→`"1px solid rgb(255 0 0)"` · `"translate(1px, 2px)"`→`"translate(1px, 2px)"` | **GREEN** |
| G16 | R-T1 ratchet: max `src/**/*.ts` LoC | **672** (`path.ts`) | **672** (`path.ts`); then 539 · 519 · 476 · **440** (`color/operations.ts`, +109 for SCI-1) | **GREEN** — ratchet fell 899 → 672 and did not rise |
| G17 | colour boundary via the barrel only | `ok LIB-04` | **`ok LIB-04 colour types cross src/color/'s boundary through the barrel only`** | **GREEN** |
| G18 | colour oracles are external | 20 passed | **8 + 12 = 20 passed** | **GREEN in bounds** — Sharma half `SUPERSEDED-BY-THE-V4-CUT` (ADDENDUM) |
| G19 | coverage over a recorded denominator | `74/75 = 98.7%` · `71/75 = 94.7%` | ⟨cmd⟩ `node …/coverage-by-export.mjs` → **exit 0**, **`75/80 = 93.8%`** whole-suite · **`72/80 = 90.0%`** minus the snapshot; declared names **164** | **GREEN by the command; `LW-C` against the committed prose** |
| G20 | packed-surface check is behavioural | exit 1 — 4× TS2305 + 6× TS2339 on the fixture | exit 1 — the **type leg now passes** (the fixture cure landed) and it dies at the **runtime export-list** assertion: `/color exports [… isAnyColor … mixColorsInto … sampleColorRamp, toHex, toRgba8Into]` | **RED** — `ESC-W9f-PACKED-SURFACE-EXPECTED`, **7** stale names |
| G21 | SCI-1 shipped with its evidence tuple | **0** in `src/` — ninth carry pending | ⟨cmd⟩ grep → **6**; packed `sampleColorRamp=true mixColorsInto=true toRgba8Into=true`; the atlas tuple rides `f3fccfb7` itself | **GREEN** — the eighth carry is DISCHARGED |
| G22 | `toHex` + `easingNames()` published | `false` / `false` | **`true` / `true`**; `easingNames().length` → **40** | **GREEN** |
| G23 | `easing()` reference stability | 4/4 fresh closures | **`true,true,true,true`** and **40/40 true** across the whole catalog | **GREEN** |
| G24 | restored analytic arms match 0.13.0 | leg3 `ERR_MODULE_NOT_FOUND` | ⟨cmd⟩ dated sibling vs the registry `0.13.0` tarball (sha256 `b943f722…1b36aa`, re-packed and re-hashed **at this seat**) → **exit 0**, `0 of 22 names drift ≥ 1e-3; worst overall 4.563e-6 (ease-in-out-back)` | **GREEN** |
| G25 | catalog fence | 30 keys | **30**; `bezierPresets["ease-out-circ"]` → `[0.075,0.82,0.165,1]` | **GREEN (fence held)** |
| G26 | ND-01 prune fence | 0 | **0** | **GREEN (fence held)** |
| G27 | matrix family retired, geometry preserved | 0 of six; 3 seam names present | packed `./transform` keys → **`PathGeometry,getPointAtLength,getTotalLength`**; probe `ok MTS-05` ×2 | **GREEN** |
| G28 | bench table under the restated denominator | R1 0 throws; **no table** | table **published** (125 lines) with `1,636,680 / 545,560 / 818,340 / 311,883 / 233,677 / 506,457`, `10×` **RETIRED AS LAW** at 1.906× over, `1,870,633` **UNCITABLE**; R1 re-measured on the **packed** tarball → **0 throws / 13 calls** | **GREEN**; `accepted`/`reject` recorded **NO-SUBJECT**, not faked |
| G29 | one dated cut | `4.0.0`, no 4.1.0 tag | version **`4.1.0`**; ⟨cmd⟩ `git rev-list -n1 v4.1.0` → **`f3fccfb7`**; ⟨cmd⟩ `grep -c '^## \[4.1.0\]' CHANGELOG.md` → **1**; **one** bump, **no 4.0.1** | **GREEN** |
| G30 | canon cites no non-existent tree | 0 hits | ⟨cmd⟩ `grep -c 'src/parsing' …/ARCHITECTURE.md` → **0** | **GREEN** |
| G31 | parse-that position recorded against ground truth | GREEN — the paragraph quoted the manifest verbatim | ⟨cmd⟩ `node -e` on `package.json` → **`dependencies` is ABSENT** (`undefined`); the paragraph at `:657` still states *"`dependencies` reads exactly `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`"* | **RED — REGRESSED BY THIS WAVE'S OWN CUT.** See `LW-B` |
| G32 | channel descriptors resolve exactly | `cp`→`"Ct (tritan)"`, `jz`→`"jz"` — UNATTEMPTED | ⟨cmd⟩ `node …/g32-channel-descriptors.mjs` → **exit 0**: 17 spaces · **49** pairs · **0** failures; `ictcp.cp` → `"Cp (protan)"`, `jzazbz.jz` → `"Lightness (Jz)"` | **GREEN** — §State's RED reading is stale |
| G33 | packets sent, exact-pin consumers notified | 5 packets · 5 rows · pin quoted before any tag | **5** files under `coordination/` · **5** rows `O-34..O-38` dated **2026-09-18** · tag `v4.1.0` dated **2026-09-19** — the required order holds. ⟨cmd⟩ `npm ls @mkbabb/value.js` in `../keyframes.js` → `4.0.0` | **GREEN on its three readable legs**; the post-window leg stays unreadable because **publication is X-W11's act**, not this tag's |

**Tally: 26 GREEN · 7 RED.** GREEN = G2 G4 G5 G6 G7 G8 G9 G10 G11 G15 G16 G17 G18 G19 G21 G22 G23
G24 G25 G26 G27 G28 G29 G30 G32 G33. RED = **G1 G3 G12 G13 G14 G20 G31**.
Per **CC-096** the gates are read **staged** — equivalence (G1–G4), coverage (G19) and bench (G28)
each stand alone. **No composite verdict is reported.**

### CL2.3 §Verification Artefacts, run as written

⟨cmd⟩ `ls docs/tranches/X/waves/evidence/W9/` → **44 files + `packets/`** (36 at close 1).

| artefact | state at this close |
|---|---|
| `born-red-2026-XX-XX.json` | **still ABSENT** — the born-RED re-execution lives as §Baseline's prose table. **Residual R-8, unmoved** |
| `src-surface-totality.{before,after}.txt` | present, `+ .integrated.txt` and now `.after-f.txt` |
| `library-band-gates.{before,after}.txt` | four labelled readings; the spec's two exact filenames still do not both exist, nothing missing in substance |
| `consumer-surface-compile.{before,after}.txt` | `before` exact; `after` spelled `.after-d.txt` |
| `parser-totality-red-first.txt` | present, 496 lines, commit `c18a78f8` named in-file |
| `eslint-nna.{css,transform}.{before,after}.json` | four present. The spec says 94 → 0 / 155 → 0; the measured pair was 94 → 4 → **0 config-resident** and 155 → 0 |
| `surface-census.after.json` | present; its `declare` figure is close 1's 20, **now 7** at the bytes (`LW-C`'s sibling; the census is dated evidence and is not rewritten) |
| `coverage-by-export.md` + its `addendum-2026-09-18.md` | present; **both stale by one cut** — `LW-C` |
| `bench-table-4.1.md` | **PRESENT** (125 lines) — the close-1 absence is cured |
| `packed-surface.after.json` | present |
| `packets/` | present — 5 paths, byte counts, sha256s |
| commit hashes: RED-first · each integration · **the cut** · **the tag** | all present — RED-first `c18a78f8`, the integrations at §C.1 and §CL2.1, the cut **`f3fccfb7`**, the tag **`v4.1.0` → `f3fccfb7`** |

This seat adds no evidence file: it authored zero cure bytes and its readings are the table above.

### CL2.4 Landed-wrong findings — named here, cured by nobody at this seat

#### `LW-A` · **HIGH · CONFIRMED BY CLEAN-ROOM REPRODUCTION** — the AM-13 strip breaks every clean install

X-W9.f **removed** `@mkbabb/keyframes.js` from `package.json` outright (F.4: *"Zero source consumers
anywhere. It is removed outright, not demoted"*). The census that justified the removal is ⟨cmd⟩
`grep -rn '@mkbabb/keyframes' --exclude-dir={node_modules,.git,docs,dist} .` — **it excludes
`node_modules`, so it cannot see a transitive requirement of a devDependency, which is exactly what
this was.** Five measurements, each double-run:

1. ⟨cmd⟩ `npm ls @mkbabb/keyframes.js` → `└── @mkbabb/keyframes.js@6.0.0 **extraneous**` — on disk
   only because it *used* to be a manifest dependency.
2. ⟨cmd⟩ `npm ci --dry-run` → exit 0, and its plan reads **`remove @mkbabb/keyframes.js 6.0.0`**.
3. ⟨cmd⟩ `grep -rl '@mkbabb/keyframes' node_modules/@mkbabb/glass-ui/dist/` → **11 files**, incl.
   `dock.js`, `drawer.js`, `blob.js`, `motion.js`, `useSpring-*.js`. The import is **static and
   unconditional**: `import { SpringProgress as fe } from "@mkbabb/keyframes.js";`
4. glass-ui declares it an **OPTIONAL peer** — ⟨cmd⟩ `node -e` on glass-ui's manifest →
   `peer: ^6.0.0 | optional: {"optional":true}` — so npm will **never** supply it on its own.
5. ⟨cmd⟩ `grep -rho '@mkbabb/glass-ui[a-z/-]*' demo/ | sort | uniq -c` → **39** bare
   `@mkbabb/glass-ui` and **15** `@mkbabb/glass-ui/dock` sites.

**The reproduction, in a directory outside every repository** (`mktemp -d`; the session scratchpad
could not be used — a prior seat symlinked `scratchpad/node_modules` → this repo's, which resolves
the very package under test): ⟨cmd⟩ `npm init -y && npm install @mkbabb/glass-ui@7.0.0 vue@^3.5`
(keyframes absent, exactly what `npm ci` now produces), then

```
node --input-type=module -e "import '@mkbabb/glass-ui/dock'"
→ Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@mkbabb/keyframes.js'
  imported from …/node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js
```

and the **root barrel fails identically** — ⟨cmd⟩ `import '@mkbabb/glass-ui'` → the same
`ERR_MODULE_NOT_FOUND`. Both re-run; both reproduce.

**Blast radius, read from the workflow this seat may not write.** `.github/workflows/ci.yml` runs
`npm ci` in **four** jobs; the `e2e-smoke` job then runs `npm run build` and `npm run gh-pages` —
the demo build, which imports `@mkbabb/glass-ui` at 39 sites. `release.yml:31` runs `npm ci` then
`npm run build`.

**The cure is one word, and X-W9.f had already performed it for the sibling case:** glass-ui was
**demoted** to `devDependencies`; `@mkbabb/keyframes.js` should have been demoted the same way, not
deleted. Runtime `dependencies` stays empty either way, so the AM-13 decree and the
`runtime deps ⊆ {@mkbabb/parse-that}` allowlist are satisfied by the demotion exactly as they are by
the removal — the strip bought nothing the demotion would not have. **Owner: `package.json` (+ its
derivative lock) — X-W9.f's files. Not cured here: this seat is VERIFY-ONLY.**

**What the finding does *not* say.** The install-time cycle F.4 discovered is real and the lockfile
quote is accurate. The defect is only in the *verb*: remove where demote was required.

#### `LW-B` · **MEDIUM** — G31's paragraph now states a dependency set the manifest does not have

`docs/tranches/V/ARCHITECTURE.md:657` reads *"`dependencies` reads exactly
`{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`"*. ⟨cmd⟩ `node -e` on the manifest
→ the `dependencies` key is **absent**. That is G31's falsifier verbatim (*"Record a dependency
state the manifest does not show"*), so the gate is read **RED** here rather than INFO.
X-W9.f raised it as `ESC-W9f-ARCH-DEPS-CLAUSE` (INFO) on the ground that the sentence dates itself;
this seat dissents **at the gate's own text**: the gate compares the paragraph to `package.json`
*today*, and a date-stamp inside a sentence does not exempt it from the comparison the gate names.
**Every parse-that claim in the paragraph remains true** — `@mkbabb/parse-that` is in neither map
(measured), no parser is adopted, the roots and the retired `≥10×` floor are unchanged — so the
cure is **one clause**, not a rewrite. **Owner: X-W9.g's carve, `ARCHITECTURE.md:657`.**

#### `LW-C` · **MINOR** — the coverage denominator moved again and was not re-recorded

G19's falsifier includes *"change the denominator without re-recording it"*. The cut moved it:
runtime **75 → 80**, declared names **131 → 164**. `coverage-by-export.md` and its
`addendum-2026-09-18.md` both publish the old figures. The gate reads GREEN only because its
**command** is committed beside the prose and re-records honestly at any seat's run — which is the
same adjudication Repair 1 made for `D-4`, and this is its **second occurrence**. The re-recording
is a dated addendum-beside, never an edit. **Owner: X-W9.e / whoever holds `evidence/W9/`.**

Beside it, a fact the command prints that no seat has stated: the five symbols this cut shipped are
**measured uncovered** — `color 23 / 28 uncovered: isAnyColor, mixColorsInto, sampleColorRamp,
toHex, toRgba8Into`. ⟨cmd⟩ `grep -rln 'sampleColorRamp\|mixColorsInto\|toRgba8Into' test/` → **one
file, `test/v4-c1.test.ts`** — the *surface snapshot*, which names them and never calls them. SCI-1
shipped with a packed smoke in a receipt and **no committed behavioural test**.

#### `LW-D` · **MINOR** — §State's RED membership is wrong in both directions

`W9.md` §State names `G32` RED and omits `G31`. `G32` was turned by `95792b44`, which landed **two
commits before** the cut that wrote that sentence; `G31` was reddened by the cut itself. Corrected
by this close in §State's status fields (the one §File Bounds exception), minimally and in place.

### CL2.5 Escalations carried out of the wave — five, none worked around

| id | gate it holds | the one-act cure, quoted from its own receipt | owner |
|---|---|---|---|
| `ESC-W9f-CSSD-VOCAB-SPELLING` | **G1** (MTS-09) · **G13**'s css-6 remainder · **G14** entire | re-point `src/css/index.ts:51-58` from `"../color/index"` to `"../value"`, **8 lines** | `src/css/index.ts` — a §File Bounds `modify` row held by **X-W9.d**, outside X-W9.f's set |
| `ESC-W9f-PACKED-SURFACE-EXPECTED` | **G20** | add the **7** stale names to `expected` and one `SMOKE` case each | `scripts/ci/verify-packed-surface.mjs` — **X-W9.e**'s |
| `ESC-W9d-ROOT-AND-SYNTAX` (a) | **G12** LEG2 | ruled **(ii) declared-retired**; O-12 is the position of record, no `"."` key | adjudication, not an edit |
| `ESC-W9a-G3-LEG-SCOPE` | **G3** | G3 binds to entries declaring a `string` parameter | adjudication |
| `ESC-W9f-LOCKFILE-DERIVATIVE` | — | **ruled benign at §CL2.1** | discharged here |

`ESC-W9-G24-SUBSTRATE` and `ESC-W9e-SHARMA-NO-SUBJECT` are **DISCHARGED**: G24 is GREEN on the
re-substrated leg, re-packed and re-hashed at this seat, and G18's Sharma half is
`SUPERSEDED-BY-THE-V4-CUT` by the ADDENDUM. `ESC-W9f-ARCH-DEPS-CLAUSE` is **promoted** from INFO to
`LW-B` and now carries a RED gate.

**Masking census over the resume round's diff — CLEAN.** ⟨cmd⟩ `grep -rn 'catch' src/` → **nothing
at all**. No `test.skip`, no `@ts-ignore`, no `eslint-disable`, no allowlist, no `as any`, no
node_modules patch, no forwarding shim — the `stylesheet.ts` re-export that would have greened the
typecheck stayed **REFUSED BY NAME** for a third sitting.

### CL2.6 §Format And Lint Cadence, re-run here

| command | close 1 | this close | carriers |
|---|---|---|---|
| `npx vue-tsc -p tsconfig.lib.json --noEmit` | exit 0 | **exit 0** | — |
| `npx vue-tsc -p tsconfig.demo.json --noEmit` | — | **exit 0 · 0 errors** | — |
| `npx vue-tsc -p tsconfig.test.json --noEmit` | 1 error | **2 errors** | both `test/gradient-parse.test.ts:32,:63` — `ParsedGradientModel.intervals`, inherited drift in a file **no unit of this wave may write** |
| `npx vitest run` | 13 failed / 600 passed | **4 failed / 628 passed (632)** | `gradient-parse` **2** · `spectrum-luma` **1** (its own message routes it to X-W4) · `demo/test/shell/reka-binding-idiom` **1** (demo/, routed). **Not one is in a file this wave may write** |
| `npx eslint . --max-warnings=0` | 55 problems, 0 carriers outside `docs/tranches/**` | **55 problems (23 errors, 32 warnings)**, ⟨cmd⟩ carriers outside `docs/tranches/**` → **0** | unchanged; the ignore is X-W8's G-6 |

### CL2.7 E13 close sweep — the four paths, at this seat's own clock

⟨cmd⟩ `/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-19 00:00'` →
`docs/tranches/V/` **0** · `docs/tranches/V/coordination/` **1** (`INBOX.md` itself, self-excluded) ·
`../glass-ui/docs/tranches/BK/coordination/` **0** ·
`../keyframes.js/docs/tranches/V/coordination/` **1** (`INBOUND-LEDGER.md`, their terminal-verb
record of our mail, already rowed) · `../sci-report/atlas/docs/tranches/P/coordination/` **0**.

Status read **positionally** from each row's cell (field 6 in both tables — ⟨cmd⟩ the headers at
`:41` and `:66` were read to fix the index), never from a bare `grep -i unread`: ⟨cmd⟩ `awk -F'|'`
→ **4** rows whose status cell contains the word, **0** whose status *is* UNREAD. Each of the four
was read: `O-20` **SENT** 2026-08-28 (its sweep *note* mentions two glass letters) · `I-31`
**FOLDED** 2026-09-17 · `I-32` **READ IN FULL + ROUTED — TERMINAL** 2026-09-19 · `O-39` **SENT**
2026-09-19. Over ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **82** rows.
**0 UNREAD addressed to value.js. No row minted, no status changed, no byte of `INBOX.md` written.**

**One INFO this seat adds, because it is the first census of the directory rather than of the
window.** ⟨cmd⟩ a per-file check of every `coordination/*.md` against `INBOX.md` → **4 unrowed**,
all dated **2026-07-20** (`d23-ruled-mirror-primary`, `parser-proof-evidence`,
`pi-minitranche-notice`, `residual-repairs`), all committed 2026-07-27, all inside the ledger's own
span (its oldest row is 2026-07-15). They are V·π-era letters, terminal by the epoch rule, and they
redden **no gate of this wave** — the prior sweeps' "0 unrowed" is true of the **dated window** they
swept and is not contradicted. Filed for the sitting's E13 owner as `R-14`.

### CL2.8 Residuals, with named owners

| id | residual | owner |
|---|---|---|
| `R-8` | `born-red-*.json` never materialised; the born-RED table is prose in §Baseline | X-W11 or the §Verification Artefacts holder |
| `R-9` | **G1 · G13 (css 6) · G14** — one head, one 8-line cure at `src/css/index.ts:51-58` | X-W9.d's file; needs a bounds grant or a successor wave |
| `R-10` | **G20** — `expected`/`SMOKE` stale by 7 names, 2 of them predating the cut | X-W9.e |
| `R-11` | **G3** — 30 prototype-throwers over the 7-value corpus; 19 are `./css` entries outside G3's `string`-parameter binding | `ESC-W9a-G3-LEG-SCOPE`, adjudicated |
| `R-12` | **G12 LEG2** — the root specifier; 5 fourier call sites read it | O-12, declared-retired |
| `R-13` | **G33**'s post-window `npm ls` leg — unreadable until the registry publish | **X-W11** |
| `R-14` | 4 unrowed 2026-07-20 coordination letters (§CL2.7) | the sitting's E13 owner |
| `LW-A` | **the demo build breaks on any clean `npm ci`** — one-word cure, demote not delete | **X-W9.f's `package.json`; escalated to the sitting as the wave's only HIGH** |
| `LW-B` | G31's stale enumeration clause | X-W9.g's carve |
| `LW-C` | the coverage denominator's second unrecorded move; SCI-1 has no behavioural test | X-W9.e |

### CL2.9 The four-verb line

**AUDITED: yes** (unmoved — carry-cut ledger §1.K + `registry/adjudicated/library-band.md`).
**SPECIFIED: yes** (unmoved — this file's spec, 2026-08-03, plus the dated 2026-09-19 ADDENDUM).
**IMPLEMENTED: PARTIAL 2026-09-19.** All **nine** units have now run — the two that were lawfully
deferred at close 1 (`.f`, `.h`) both landed in the resume round — and **26 of 33** gates are GREEN
at this seat's own double-run commands. It is **not** promoted past PARTIAL: seven gates are RED,
one of them (**G31**) *regressed by this wave's own cut*, and `LW-A` is a shipped defect on the
merge path that this VERIFY-ONLY seat may not touch.
**VERIFIED: no.** §State designates **X-W11** the release-and-verified close and **does not
designate this wave's close seat to stamp it**; the §Closing rider's two L-18 quartets and the
fresh-Fable apotheosis are undischarged, and CHECK 4 (§0ac) has not run. The verb is left where the
spec leaves it.

**Superlatives, with the same provenance duty as defects (L-18).** Two, both measured here.
**(1)** G3's split is **byte-identical either side of the cut** — `value=1 css=19 easing=1 math=6
transform=3`, `color=0` on both runs — so five new public entries were added to the most
crash-prone area of the library and moved the prototype-thrower count by **nothing**. **(2)** G13
fell **33 → 20 → 7** across three seats, and the last drop came from a seat that measured its own
authorising ruling **false** and performed the cure the ruling's own next paragraph had named. The
honesty of the intermediate "measured ineffective" receipts is what preserved the information.

**Disposition: PARTIAL.** Handed to CHECK 4 with one HIGH (`LW-A`), one regressed gate (`G31`) and
one 8-line cure (`R-9`) that is worth three of the remaining six REDs.

---

## Check 1 — RESUME ROUND (L-20 fresh adversarial pass 1 against `## Close — RESUME ROUND`, 2026-09-20)

SERVED MODEL: `claude-opus-5[1m]` · **VERIFY-ONLY** — this seat authored no cure byte, no unit
receipt and no line of any `## Close`, `## Check 1..3` or `## Repair 1..2` above. E-3: the three
2026-09-18 `## Check` sections are IMMUTABLE and are **not** rewritten; this section is a dated
sibling beside them, because it reads a close they could not have read.

**VERDICT: NOT-CONFORMANT.** **0 BLOCKER · 0 CRITICAL · 3 HIGH · 1 MEDIUM · 2 MINOR · 1 INFO.**
**All 33 gate verdicts reproduce at this seat's own double-run commands — 26 GREEN · 7 RED, and the
close's corrected MEMBERSHIP `G1 · G3 · G12 · G13 · G14 · G20 · G31` reproduces exactly.** The close
is unusually honest: it found its own regression (G31), corrected §State against its own author's
reading, and returned `LW-A` unsoftened. It is still NOT-CONFORMANT, for reasons the close itself
names: **five of its seven REDs have NO relief under axis (10)** — their cures sit inside this
wave's own §File Bounds and no successor is assigned — and **`LW-A` is a HIGH that shipped under
the tag**, reproduced here in a clean room.

Substrate: `tranche-u` @ `65866bdb`, node v26.0.0, darwin arm64, `dist/subpaths/` **rebuilt by this
seat** (⟨cmd⟩ `npm run build` → `✓ built in 2.72s`), tarball **packed by this seat** (⟨cmd⟩
`npm pack` → `mkbabb-value.js-4.1.0.tgz`, **37 222 bytes, 20 files** — the close's figure, reproduced
to the byte).

### CH-R.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/A/X-W9.md docs/tranches/X/execution/LEDGER.md
docs/tranches/X/waves/evidence/W9 docs/tranches/X/waves/W9.md` → **empty** before this act. Nothing
inherited, nothing stashed, nothing restored. The seventeen dirty rows are sibling seats'
(`demo/**`, `e2e/**`, `X-W5.md`, `KF-W12.md`, `KF-W13.md`, `CARRY-LEDGER.md`) and were never touched;
`scripts/dev/dev.sh` was never touched and never staged.

### CH-R.1 Every gate re-run at this seat's own commands — 33 of 33 verdicts reproduce

| # | this seat's reading | vs close | verdict |
|---|---|---|---|
| G1 | dated sibling probe → exit 1, **1** failing assertion, `RED MTS-09 … 6 unexported declares: Alpha_2, AnyColor, Channel_2, ChannelsBySpace_2, Color_2, SpaceId_2`; 8 other arms **ok** | identical | **RED ✓** |
| G2 | `test/parser-totality.test.ts` **123 passed** | identical | **GREEN ✓** |
| G3 | LIB-02 → **30**, split `value=1 css=19 easing=1 math=6 transform=3` | identical | **RED ✓** |
| G4 | `ok LIB-01` + control | identical | **GREEN ✓** |
| G5 | ⟨cmd⟩ `grep -c 'no-non-null-assertion' eslint.config.js` → **2**; `npx eslint 'src/css/**/*.ts'` (no `--rule`) → **exit 0** | identical | **GREEN ✓** |
| G6 | `path-geometry.test.ts` **43 passed**; probe MTS-03 4/4 | identical | **GREEN ✓** |
| G7 | `ok MTS-04 compact == expanded (31.403311569547547)` | identical to the digit | **GREEN ✓** |
| G8 | MTS-03 → `0 · 0 · 0 · 5`, all finite | identical | **GREEN ✓** |
| G9 | subject retired — ⟨cmd⟩ `ls src/transform/decompose.ts` → *No such file* | identical | **GREEN at its commit; SUPERSEDED-BY-G27 ✓** |
| G10 | `npx eslint 'src/transform/**/*.ts' 'src/foundation/**/*.ts'` → **exit 0**; `src/**/*.ts` → **exit 0** | identical | **GREEN ✓** |
| G11 | `test/math.test.ts` **70 passed** | identical | **GREEN ✓** |
| G12 | probe exit 1 · **2** — `ok LEG1`, LEG2 TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED` | identical | **RED ✓** |
| G13 | ⟨cmd⟩ `grep -c '^declare ' dist/subpaths/*.d.ts` summed → **7** (`css 6 · easing 1`), double-run | identical | **RED ✓** |
| G14 | **60** occurrences / **26** lines, double-run | identical | **RED ✓** |
| G15 | packed tarball: `"a : b"`→`{"ok":true,"value":"a: b"}` · `"1px solid red"`→`"1px solid rgb(255 0 0)"` · `"translate(1px, 2px)"`→`"translate(1px, 2px)"` | identical | **GREEN ✓** |
| G16 | max `src/**/*.ts` = **672** (`path.ts`), then 539 · 519 · 476 · 440, double-run | identical | **GREEN ✓** |
| G17 | `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` | identical | **GREEN ✓** |
| G18 | `v4-color-behavior` **8** + `color-anchors` **12** = **20 passed** | identical | **GREEN in bounds ✓** |
| G19 | `coverage-by-export.mjs` → exit 0, **75/80 = 93.8%** · **72/80 = 90.0%** | identical | **GREEN ✓** |
| G20 | `verify-packed-surface.mjs <4.1.0 tgz>` → exit 1 at the **runtime export-list**; stale names counted independently → **7** (`color 5 · css 1 · easing 1`) | identical, and the 7 named | **RED ✓** |
| G21 | ⟨cmd⟩ grep `src/` → **6**; packed `sampleColorRamp/mixColorsInto/toRgba8Into` all `true` | identical | **GREEN ✓** |
| G22 | packed `'toHex' in color` **true** · `'easingNames' in easing` **true** · `easingNames().length` **40** | identical | **GREEN ✓** |
| G23 | `true,true,true,true` | identical | **GREEN ✓** |
| G24 | registry `0.13.0` **re-packed at this seat**, sha256 `b943f722a9681f698a6925ef26ae0e3638c7a4f62d4d8009bb3851bc5f1b36aa` — the close's hash to the byte; drift → **`0 of 22 names drift ≥ 1e-3; worst overall 4.563e-6 (ease-in-out-back)`**, `GREEN` | identical | **GREEN ✓** |
| G25 | packed `Object.keys(bezierPresets).length` → **30** | identical | **GREEN ✓** |
| G26 | **0** | identical | **GREEN ✓** |
| G27 | packed `./transform` keys → `PathGeometry,getPointAtLength,getTotalLength`; probe `ok MTS-05` ×2 | identical | **GREEN ✓** |
| G28 | `bench-table-4.1.md` **125 lines**, carrying `1,636,680 / 545,560 / 818,340 / 311,883 / 233,677 / 506,457` and `1,870,633` marked UNCITABLE; R1 on the **packed** tarball → **0 throws / 31 calls** | identical | **GREEN ✓** |
| G29 | `4.1.0`; ⟨cmd⟩ `git rev-list -n1 v4.1.0` → `f3fccfb7`; `grep -c '^## \[4.1.0\]' CHANGELOG.md` → **1** | identical | **GREEN ✓** |
| G30 | `grep -c 'src/parsing' …/ARCHITECTURE.md` → **0** (exit 1) | identical | **GREEN ✓** |
| G31 | ⟨cmd⟩ `node -e` on the manifest → `dependencies` **undefined**; `:657` still reads *"`dependencies` reads exactly `{…glass-ui…keyframes.js…}`"* | identical | **RED ✓** |
| G32 | `g32-channel-descriptors.mjs` → **17** spaces · **49** pairs · **0** failures; `ictcp.cp`→`"Cp (protan)"`, `jzazbz.jz`→`"Lightness (Jz)"` | identical | **GREEN ✓** |
| G33 | **5** packets dated 2026-09-18 · **5** rows `O-34..O-38` · tag `v4.1.0` 2026-09-19 · `npm ls @mkbabb/value.js` in `../keyframes.js` → `4.0.0` | identical | **GREEN on 3 readable legs ✓** |

**Tally: 26 GREEN · 7 RED**, membership `G1 · G3 · G12 · G13 · G14 · G20 · G31` — **the close's
corrected set, not §State's original.** Zero divergences of verdict over 33 gates.

### CH-R.2 The clean axes — measured here, not inherited

**Axis 2 — bounds.** ⟨cmd⟩ `git show --name-only --format=` over the wave's **45** commits (the 20
of §C.1, Repair 1/2's `4a27a65d` + `7d02e405`, the check/repair receipts, the three resume opens and
the resume round's eight) → union **97** paths. Every one sits in a §File Bounds `modify`/`create`
row, in the `ADDENDUM 2026-09-19`, in `W9-bounds-grant-addendum-2026-09-19.md`, or under
`docs/tranches/X/waves/evidence/W9/**`. ⟨cmd⟩ the union grepped for `dev.sh` → **0**; for
`PaneSegmentedControl` → **0**. No `api/**`, no `e2e/**`, no `.github/**`, no `src/color/model.ts`,
no `src/color/anchors.ts`, no peer-repo byte. **One disclosed exception stands: `package-lock.json`
is in no row** (`ESC-W9f-LOCKFILE-DERIVATIVE`) — re-measured here at the bytes: ⟨cmd⟩
`git show f3fccfb7 --stat -- package-lock.json` is the version bump, the deps→devDeps move and the
keyframes block's removal, and ⟨cmd⟩ `npm ci --dry-run` → **exit 0**. Carried, not authored: INFO.

**Axis 3 — masking census: CLEAN.** ⟨cmd⟩ `grep -rn 'catch' src/` → **nothing at all**. ⟨cmd⟩
`grep -rn '@ts-ignore|@ts-expect-error|eslint-disable' src/ test/ scripts/ci/ fixtures/` → **0**.
⟨cmd⟩ `grep -rn '\.skip(|\.todo(|skipIf' test/` → **0**. No allowlist, no copied producer selector,
no `patches/`, no `node_modules` write in any of the 45 commits. Exactly **two** type-escapes were
*added* by the wave, both read line by line: `474846ce` `decomposeMatrix3D(values as unknown as Mat4)`
in a hostile-input test (the subject was deleted two commits later), and `a692069f`
`Array.from(v as any)` inside a `RangeError` **message** formatter. Neither wraps a defect. The
`stylesheet.ts` forwarding re-export that would have greened the typecheck stayed REFUSED for a
fourth sitting.

**The one axis-3 question that had to be settled by measurement, not by reading the escalation.**
The `ADDENDUM`'s clause *"G3 binds to the entries declaring a `string` parameter"* narrows a gate,
and a narrowed assertion is a HIGH if the narrowing hides the thing the gate was for. It does not.
⟨cmd⟩ over the emitted `.d.ts`: **12** public entries declare a sole `string` parameter; each was
called with `"" · "   " · "__proto__" · "constructor" · "zzz" · "oklch()" · "a{color:__proto__}"` →
**0 throwers**. `coerceToSyntax(source: string, syntax: string)` — the only other string-declaring
`./css` entry — was called over the **49** ordered pairs of that corpus → **0 throwers**. The 30
LIB-02 offenders are arity and shape violations (`collectKeyframes("")` reaches `e.forEach`,
`PathGeometry("")` is a class called without `new`, `deCasteljau("")` is the spec-ordered `./math`
rejection). **The narrowing is sound at the bytes** and `ESC-W9a-G3-LEG-SCOPE` is a real relief, not
a laundering. Recorded because no prior seat measured the narrowing's own premise.

**The probe sibling, read the same way.** ⟨cmd⟩ `diff src-surface-totality.mjs
src-surface-totality.2026-09-19.mjs` → **the header, MTS-05 and MTS-06 only**; every other arm is
byte-identical, as the sibling's own docblock claims. Both moved arms are **stronger**, not weaker:
MTS-05 went from one `decomposeMatrix3D(singular) → null` reading to a two-way retirement+seam
assertion, and MTS-06 from *"must return a finite value"* to *"must reject with a `RangeError` whose
message names the function"*. The original is byte-untouched. **Not a masking re-point.**

**Axis 4 — commit families.** §Commit Plan row 9's family did **not** split: ⟨cmd⟩
`git show f3fccfb7 --name-only` → SCI-1's `src/color/*`, the atlas evidence tuple and **both** scoped
`no-non-null-assertion` rule objects ride the single commit `f3fccfb7`, which is also the tag's
object. One commit per meaning across all 13 plan rows; the two never-taken rows (9, 11 at close 1)
were taken in the resume round as single commits.

**Axis 5 — E-3 held, as an absence.** The union of all 45 wave commits contains **zero** paths under
`docs/tranches/V/megatranche/registry/`, **zero** sibling wave specs (`W4.md` · `W8.md` · `W10.md` ·
`W11.md`), and **none** of the four read-only probes named `execute, no write` in §File Bounds —
`src-surface-totality.mjs`, `library-band-gates.mjs`, `consumer-surface-compile.mjs`,
`fourier-value-import-drift.mjs` are all byte-untouched. `W9.md` moved **twice**, both lawful: the
dated ADDENDUM appended beside (never over) and §State's status fields, the row §File Bounds names.
`ARCHITECTURE.md` moved **1 line**, at `@@ -657 +657 @@`, inside the carve and nowhere near
`:943-945`.

**Axis 6 — mail.** ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **82** rows. Status read
**positionally** (field 6 of both tables; the headers at `:41` and `:66` fix the index, exactly as
§CL2.7 says): **4** rows whose Status cell contains the word — `O-20` **SENT**, `I-31` **FOLDED**,
`I-32` **READ IN FULL + ROUTED — TERMINAL**, `O-39` **SENT** — and **0** whose Status *is* UNREAD.
The naive whole-row grep answers **6**; the two extra (`I-30`, `I-35`) carry the word in their
**Owner** cells, which is why the positional read is the one of record. **0 UNREAD in scope.**

**Axis 7 — the four-verb line moved lawfully.** IMPLEMENTED went `PARTIAL 2026-09-17` →
`PARTIAL 2026-09-19` with the resume history beside it, and was **not** promoted past PARTIAL at 7
RED. VERIFIED stays `no`, where §State reserves it for X-W11. The LEDGER row reads
`IMPLEMENTED (PARTIAL) 2026-09-19 … CHECK 4 owed` — not CLOSED. Nothing was claimed that was not
measured.

### CH-R.3 Honest-RED adjudication (axis 10) — **two relieved, five not**

Each RED was taken to the spec bytes and to `COHESION.md` §0ac, and asked the axis-10 question:
producer-owned, routed to a successor by the spec's own words, or named honest-RED by id?

| gate | relief pleaded | at the spec bytes | verdict |
|---|---|---|---|
| **G3** | `ESC-W9a-G3-LEG-SCOPE` | §0ac rules it verbatim: *"G3 binds to the entries that declare a `string` parameter … shape/arity violations and the spec-ordered `./math` policy are outside its class."* The premise is **measured true here** (CH-R.2) | **RELIEVED — adjudication, owner: the sitting** |
| **G12** | `ESC-W9d-ROOT-AND-SYNTAX` (a) | §0ac rules it verbatim: *"G12 LEG2: option (ii) declared-retired. O-12 … is the position of record … no `"."` key is added."* LEG1 is GREEN at this seat | **RELIEVED — adjudication, owner: O-12** |
| **G1** | `ESC-W9f-CSSD-VOCAB-SPELLING` | §0ac grants `src/value.ts`/`src/quantize.ts` and says *"any irreducible remainder is named by count"* — it **names**, it does not relieve, and it assigns **no successor**. The cure the escalation states is `src/css/index.ts:51-58`, a §File Bounds **`modify` row of this wave** | **UNRELIEVED** |
| **G13** | same head | same. `grep` puts 6 of the 7 bare declares in `css.d.ts`, the same 6 names MTS-09 lists | **UNRELIEVED** |
| **G14** | same head | same. All **60** `_2` references are the same five colour names | **UNRELIEVED** |
| **G20** | `ESC-W9f-PACKED-SURFACE-EXPECTED` | raised **after** §0ac and ruled by nobody. Owner `scripts/ci/verify-packed-surface.mjs` — a §File Bounds `modify` row of this wave, X-W9.e's | **UNRELIEVED** |
| **G31** | `ESC-W9f-ARCH-DEPS-CLAUSE` (INFO) → `LW-B` | ruled by nobody; **regressed by this wave's own cut**, against its own gate's falsifier. Owner `ARCHITECTURE.md:657`, X-W9.g's carve — in bounds | **UNRELIEVED** |

**The honest-RED set is `{G3, G12}`.** The other five are ordinary open defects whose cures lie
inside the wave's own writable set, and the bar treats an unrelieved RED as a real defect.

### CH-R.4 Defect register

| sev | claim | receipt | cure |
|---|---|---|---|
| **HIGH-1** | **`LW-A` reproduces: the AM-13 strip removed `@mkbabb/keyframes.js` where it had to demote it, and the 4.1.0 tag was taken over that manifest.** Every clean `npm ci` now drops a package glass-ui statically imports | ⟨cmd⟩ `node -e` on `package.json` → `dependencies` **undefined**, keyframes in **neither** map · ⟨cmd⟩ `npm ls @mkbabb/keyframes.js` → `extraneous` · ⟨cmd⟩ `npm ci --dry-run` → plan reads **`remove @mkbabb/keyframes.js 6.0.0`** · ⟨cmd⟩ `grep -rl '@mkbabb/keyframes' node_modules/@mkbabb/glass-ui/dist/` → **11** files · glass-ui declares it `peer ^6.0.0, {"optional":true}` so npm never supplies it · ⟨cmd⟩ `grep -rho '@mkbabb/glass-ui[a-z/-]*' demo/` → **39** bare + **15** `/dock` · **clean room in `mktemp -d`**: `npm install @mkbabb/glass-ui@7.0.0 vue@^3.5` leaves `node_modules/@mkbabb/` holding **glass-ui alone**, and both `import '@mkbabb/glass-ui/dock'` and `import '@mkbabb/glass-ui'` throw `ERR_MODULE_NOT_FOUND` · blast radius read from the workflows: `ci.yml` runs `npm ci` in four jobs then `npm run build`; `deploy-pages.yml:97` runs `npm ci` then `:131` `npm run build` + `:133` `npm run gh-pages`; `release.yml:31` runs `npm ci` then `:35` `npm run build` | **Demote, do not delete**: `"@mkbabb/keyframes.js": "^6.0.0"` joins `devDependencies` beside glass-ui, lock regenerated. Runtime `dependencies` stays empty either way, so AM-13 is satisfied identically. `package.json` is X-W9.f's §File Bounds row — **one word, in bounds** |
| **HIGH-2** | **G1 · G13 · G14 are one unrelieved head with an 8-line in-bounds cure that four seats named and none performed.** The wave's own Goal criterion clause *"every type a subpath returns is nameable from that subpath"* is **FALSE at the bytes** | `MTS-09` names the six: `Alpha_2, AnyColor, Channel_2, ChannelsBySpace_2, Color_2, SpaceId_2`; `declare` sum **7**, `_2` **60/26 lines**, double-run. ⟨cmd⟩ `sed -n '51,58p' src/css/index.ts` → `export type { Alpha, Channel, ChannelsBySpace, Color, ColorIssue, SpaceId } from "../color/index";` and ⟨cmd⟩ `grep -n` on `src/value.ts` shows the same five names already exported there. §0ac names no successor and grants no relief | Re-point `src/css/index.ts:51-58` from `"../color/index"` to `"../value"` so the dts rollup's entity cache merges. `src/css/index.ts` is a §File Bounds `modify` row — **in bounds, one edit, three gates** |
| **HIGH-3** | **G20 unrelieved: the shipped 4.1.0 tarball fails the repository's own packed-surface check, and that check is wired into two workflows** | ⟨cmd⟩ `node scripts/ci/verify-packed-surface.mjs <4.1.0 tgz>` → exit 1 at the runtime export-list. Stale names counted independently against `dist/` → **7**: `color` +`isAnyColor, mixColorsInto, sampleColorRamp, toHex, toRgba8Into`, `css` +`serializeCssValue`, `easing` +`easingNames`. ⟨cmd⟩ `grep -rn 'verify-packed-surface' .github/workflows/` → **`ci.yml:71`** and **`release.yml:110`**. §Format And Lint Cadence orders this command *"before the tag"*; the tag was taken with it RED | Add the 7 names to `expected` and one `SMOKE` case each — `scripts/ci/verify-packed-surface.mjs` is a §File Bounds `modify` row, X-W9.e's. **In bounds** |
| **MEDIUM-1** | **G31 unrelieved: the wave reddened its own green gate and left it red.** `ARCHITECTURE.md:657` states a dependency set the manifest does not have — G31's falsifier verbatim | ⟨cmd⟩ `git show 0e37318e -- …/ARCHITECTURE.md` shows X-W9.g wrote *"`dependencies` reads exactly `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`"* against a true manifest; `f3fccfb7` then emptied the map. Every **parse-that** claim in the paragraph is still true (measured: the name is in neither map, no parser adopted, roots and the retired `≥10×` floor unchanged) | One clause, not a rewrite, at `ARCHITECTURE.md:657` — X-W9.g's carve, **in bounds**. Note it is *coupled to HIGH-1*: demoting keyframes restores a `devDependencies` sentence the clause can state truthfully |
| **MINOR-1** | `LW-C` sustained and sharpened: **SCI-1 shipped with zero behavioural tests.** The coverage command prints `color 23/28 uncovered: isAnyColor, mixColorsInto, sampleColorRamp, toHex, toRgba8Into` | ⟨cmd⟩ `node …/coverage-by-export.mjs` → `75/80 = 93.8%` and `72/80 = 90.0%`, both reproduced; the only file naming the three SCI-1 symbols is the surface snapshot `test/v4-c1.test.ts`, which names and never calls them | The denominator re-recording is a dated addendum-beside; a behavioural test per shipped symbol belongs to X-W9.e or X-W11's release battery |
| **MINOR-2** | **A published figure does not reproduce (self-count law).** §CL2.3 reads *"`ls …/evidence/W9/` → 44 files + `packets/`"* | ⟨cmd⟩ `git ls-files docs/tranches/X/waves/evidence/W9/ \| grep -v '/packets/' \| wc -l` → **46**, both at HEAD and at the close's own commit `4b51a447`; `packets/` holds 1 file. Nothing is missing — the count is simply two low | A dated addendum-beside correcting 44 → 46. No gate moves |
| **INFO-1** | `package-lock.json` rides `f3fccfb7` in no §File Bounds row | re-measured: derivative only, `npm ci --dry-run` exit 0 | Add the lockfile to §File Bounds beside `package.json` in the next dated addendum; carrying it was correct |

### CH-R.5 The spec's own Goal criterion, at the bytes (axis 8)

Four clauses, each measured rather than argued.

1. *"no public entry throws on a string"* — **MET, under the sitting's own binding.** 12 sole-string
   entries × 7 hostile strings and `coerceToSyntax` × 49 ordered pairs → **0 throwers** (CH-R.2).
2. *"no public signature returns a value its own `.d.ts` forbids"* — **MET.** G8 `0·0·0·5` all finite
   `number`; G11 70 passed; G9's subject retired.
3. *"every type a subpath returns is nameable from that subpath"* — **NOT MET.** 7 bare `declare`,
   60 `_2` references over 26 lines, and MTS-09 naming six unexported declares referenced by public
   signatures. This is HIGH-2.
4. *"ships as one dated 4.1.0 cut whose exact-pin consumers were notified by packet before the tag"*
   — **MET.** 5 packets dated 2026-09-18, 5 rows `O-34..O-38`, tag `v4.1.0` dated 2026-09-19 on
   `f3fccfb7`, one `## [4.1.0]` heading, no 4.0.1.

**Three of four.** The close does not claim otherwise; it returns PARTIAL. But the criterion is the
wave's own success test, and one clause is false at the bytes with an in-bounds cure outstanding.

### CH-R.6 The successors' `Opens after` conjuncts, measured against this wave

- **X-W10** — *"Opens after X-W5, X-W6, X-W7, X-W8, X-W9 **stable** (surviving structure fixed) AND
  the CC-104 precondition ruled"*. The X-W9 conjunct is **NOT GREEN**: a wave carrying a shipped
  HIGH on its merge path, a self-regressed gate and an unperformed in-bounds cure is not *structure
  fixed*. Three sibling conjuncts are independently false (X-W5 · X-W7 · X-W8 read `planned`; X-W6
  reads `PARTIAL`). **X-W10 is lawfully blocked** — and would be even if X-W9 were clean.
- **X-W11** — *"Opens after X-W0 … X-W10 are IMPLEMENTED (four-verb law; not 'closed', not
  'reported')"*. X-W9's IMPLEMENTED cell reads **PARTIAL**, which is not IMPLEMENTED; X-W10 has not
  opened. **X-W11 is lawfully blocked.** Its inputs from here — the 4.1.0 tuple, G33's post-window
  `npm ls` leg (`R-13`) and `born-red-*.json` (`R-8`) — are unaffected by this verdict.

No successor is blocked *by this check*; both were already blocked by their own conjuncts.

### CH-R.7 Superlatives, with the same provenance duty as defects (L-18)

**(1)** The close seat found and published a regression **caused by its own wave's cut** (`G31`),
corrected §State against the reading of the seat that wrote it, and reported `LW-A` — a HIGH it was
forbidden to cure — in full, with a clean-room reproduction. Every one of those readings reproduced
here. That is the behaviour the L-20 idiom exists to produce, and it is rarer than a green gate.
**(2)** `G24` is the wave's quietest success: a gate whose substrate did not exist on this machine
was re-substrated against the **registry** tarball, and the integrity hash the close published
(`b943f722…1b36aa`) reproduces byte-for-byte at an independent `npm pack` a day later, with
`0 of 22` names drifting where `8 of 22` drifted at open. **(3)** The masking census is not merely
clean but **empty**: ⟨cmd⟩ `grep -rn 'catch' src/` returns nothing at all, across a library that
ships seven public subpaths and a typed-failure `Result` idiom.

### CH-R.8 Disposition

**NOT-CONFORMANT.** The LEDGER row is **NOT** promoted and stays
`IMPLEMENTED (PARTIAL) 2026-09-19 … CHECK 4 owed`. Three HIGHs are returned, and all three have
cures **inside this wave's own §File Bounds** — one word in `package.json` (HIGH-1), eight lines in
`src/css/index.ts` (HIGH-2), seven names in `scripts/ci/verify-packed-surface.mjs` (HIGH-3) — plus
one clause in `ARCHITECTURE.md:657` (MEDIUM-1) that HIGH-1's cure makes truthful again. Nothing here
needs a successor wave, a producer act or a bounds grant beyond what §0ac already wrote. This seat
cured nothing, moved no gate verdict in either direction, minted no INBOX row and wrote no byte
outside `X-W9.md` and `LEDGER.md`.

## Repair 1 — RESUME ROUND (against `## Check 1 — RESUME ROUND`, 2026-09-20)

SERVED MODEL: `claude-opus-5[1m]` · **REPAIR SEAT, round 1.** This seat authored no byte of any
unit receipt, of any `## Close`, or of any `## Check` or `## Repair` section above. E-3: the
2026-09-18 `## Repair 1` and `## Repair 2` sections are IMMUTABLE and are **not** rewritten; this
section is a dated sibling beside them, because it repairs a check they could not have read.

**VERDICT: ALL FOUR DEFECTS AT ≥ MEDIUM ARE CURED, at their own gates' commands.**
`HIGH-1` · `HIGH-2` · `HIGH-3` · `MEDIUM-1` — four cures, four commits, every one inside the
wave's own §File Bounds. **The gate tally moves 26 GREEN / 7 RED → 31 GREEN / 2 RED**, and the two
that stay RED are exactly the two the check adjudicated RELIEVED by name (`G3` under §0ac's
`string`-parameter binding, `G12 LEG2` under O-12's declared-retired ruling). **The five unrelieved
REDs are gone.** The Goal criterion's third clause — *"every type a subpath returns is nameable
from that subpath"* — is **TRUE at the bytes** for the first time in this wave.

Substrate: `tranche-u`, repair commits `e4f5f843` · `21aa8d4c` · `b4fbfdcc` · `2f900da0`, node
v26.0.0, darwin arm64, `dist/subpaths/` rebuilt by this seat, tarball packed by this seat.

### RP-R.0 CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git status --porcelain` read at open, filtered to **this seat's** writable set
(`package.json`, `package-lock.json`, `src/css/**`, `src/easing.ts`, `scripts/ci/`,
`docs/tranches/V/ARCHITECTURE.md`, `X-W9.md`, `LEDGER.md`) → **empty**. Nothing inherited from a
killed predecessor, nothing stashed, nothing restored. The seventeen dirty rows at open were
sibling seats' (`demo/**`, `e2e/**`, `X-W5.md`, `KF-W13.md`, `CARRY-LEDGER.md`) and were never
touched; `scripts/dev/dev.sh` was never touched and never staged. Every commit below carries its
own pathspec on the commit itself.

### RP-R.1 Defect → cure → commit

| defect | cure performed | file(s) | commit |
|---|---|---|---|
| **HIGH-1** `LW-A` — the AM-13 strip DELETED `@mkbabb/keyframes.js` where it had to DEMOTE it; glass-ui statically imports it and declares it an *optional* peer, so a clean `npm ci` drops it and the demo build breaks in four `ci.yml` jobs, `deploy-pages.yml` and `release.yml` | `"@mkbabb/keyframes.js": "^6.0.0"` joins `devDependencies` beside glass-ui; lockfile regenerated mechanically. Runtime `dependencies` stays absent, so AM-13 is satisfied identically — **demote, not delete**, exactly the check's cure | `package.json`, `package-lock.json` | `e4f5f843` |
| **HIGH-2** `G1 · G13 · G14`, one unrelieved head — 6 unexported declares + 60 `_2` references, the Goal criterion clause FALSE | **one spelling** for the colour vocabulary inside `src/css/`: `index.ts` re-exports the five names **plus `AnyColor`** from `../value`, and `grammar.ts:19` / `types.ts:1` take the same spelling. `ColorIssue` has no `../value` spelling and keeps its own. `src/easing.ts` carried the 7th bare declare for the same reason — `BezierPresetName = keyof typeof PRESET_TABLE` named an unexported const — so the authored literal **is** `export const bezierPresets` now, one binding, 30 keys byte-unchanged | `src/css/index.ts`, `src/css/grammar.ts`, `src/css/types.ts`, `src/easing.ts` | `21aa8d4c` |
| **HIGH-3** `G20` — the shipped tarball fails the repository's own packed-surface check, wired into `ci.yml:71` and `release.yml:110`, ordered by §Format And Lint Cadence *before the tag* | the seven names the 4.1.0 cut shipped join `expected` **and** each gets one behavioural `SMOKE` case, which is the file's own documented two-edit ratchet — not a loosened assertion. The two void-Result writers are asserted on the **buffer they wrote** | `scripts/ci/verify-packed-surface.mjs` | `b4fbfdcc` |
| **MEDIUM-1** `G31` — the wave reddened its own green gate: `ARCHITECTURE.md:657` states a dependency set the manifest does not have, G31's falsifier verbatim | one clause, not a rewrite: runtime `dependencies` is recorded ABSENT since the AM-13 strip, and the two peers recorded in `devDependencies` at `^7.0.0` / `^6.0.0` — the state HIGH-1's cure restored. Every parse-that claim in the paragraph re-measured true and left untouched | `docs/tranches/V/ARCHITECTURE.md` (`:657` carve) | `2f900da0` |

### RP-R.2 Every gate a cure could move, re-run at this seat's own commands

Double-run unless marked. `dist/subpaths/` rebuilt (⟨cmd⟩ `npm run build` → `✓ built in 2.75s`),
tarball packed at this seat (⟨cmd⟩ `npm pack` → `mkbabb-value.js-4.1.0.tgz`, **20 files**).

| # | before (Check 1 — RESUME ROUND) | this seat, after the cures | verdict |
|---|---|---|---|
| G1 | dated sibling probe exit 1 · `RED MTS-09 css.d.ts carries 6 unexported declares: Alpha_2, AnyColor, Channel_2, ChannelsBySpace_2, Color_2, SpaceId_2` | ⟨cmd⟩ `node …/src-surface-totality.2026-09-19.mjs` → **exit 0**, `ok MTS-09 no unexported declares in css.d.ts`, `GREEN` | **RED → GREEN** |
| G13 | ⟨cmd⟩ `grep -c '^declare ' dist/subpaths/*.d.ts` summed → **7** (css 6 · easing 1) | summed → **0**, and **0 in every one of the seven** subpath `.d.ts` | **RED → GREEN** |
| G14 | ⟨cmd⟩ `grep -o '_2' dist/subpaths/css.d.ts \| wc -l` → **60** over 26 lines | → **0** | **RED → GREEN** |
| G20 | ⟨cmd⟩ `node scripts/ci/verify-packed-surface.mjs <tgz>` → **exit 1** at the runtime export-list assertion | → **exit 0**, `{"runtime":{"color":28,"value":1,"css":20,"easing":17,"math":9,"transform":3,"quantize":2},"runtimeExports":80,"smokeInvocations":80}` — **80 exports, 80 behavioural invocations, none skipped** | **RED → GREEN** |
| G31 | ⟨cmd⟩ `node -e` on the manifest → `dependencies` **undefined** while `:657` read *"`dependencies` reads exactly `{…glass-ui…keyframes.js…}`"* | `dependencies` **undefined** (unchanged — AM-13 holds), `devDependencies['@mkbabb/glass-ui']` **^7.0.0**, `['@mkbabb/keyframes.js']` **^6.0.0**, `@mkbabb/parse-that` in **neither**; `:657` now states exactly that | **RED → GREEN** |
| G17 | LIB-04 boundary leg ok; its `_2` leg named **5 duplicated colour declarations** | ⟨cmd⟩ `library-band-gates.mjs` → `ok LIB-04 no duplicated declarations in css.d.ts` **and** `ok LIB-04 colour types cross src/color/'s boundary through the barrel only` — **both legs** | **GREEN, strengthened** |
| G3 | LIB-02 → **30**, `value=1 css=19 easing=1 math=6 transform=3` | **30**, `value=1 css=19 easing=1 math=6 transform=3` — identical | **RED, unmoved · RELIEVED (§0ac)** |
| G12 | probe exit 1 · LEG1 ok, LEG2 `TS2307` + `ERR_PACKAGE_PATH_NOT_EXPORTED` | identical: `ok LEG1 public return types are nameable from their own subpath`; LEG2 the same two | **RED, unmoved · RELIEVED (O-12)** |
| G2 | `test/parser-totality.test.ts` 123 passed | **123 passed** | **GREEN ✓** |
| G4 | `ok LIB-01` + control | `ok LIB-01 easing(name) is total over the Object.prototype key set` + control | **GREEN ✓** |
| G5 | `npx eslint 'src/css/**/*.ts'` exit 0 | **exit 0** (config-resident, no `--rule`) | **GREEN ✓** |
| G10 | `npx eslint 'src/transform/**' 'src/foundation/**'` exit 0; `src/**` exit 0 | **exit 0** and **exit 0** | **GREEN ✓** |
| G15 | packed `"a : b"` → `"a: b"` | packed: `'serializeCssValue' in css` **true**, `"a : b"` → `"a: b"` | **GREEN ✓** |
| G16 | max `src/**/*.ts` = **672** (`path.ts`) | **672** (`path.ts`) — the ratchet does not rise; `grammar.ts` 539 → **544** (four comment lines) stays third | **GREEN ✓** |
| G18 | `v4-color-behavior` 8 + `color-anchors` 12 = 20 passed | **20 passed** inside a 5-file run of **190 passed** | **GREEN ✓** |
| G19 | `75/80 = 93.8%` · `72/80 = 90.0%` | **`75/80 = 93.8%`** · **`72/80 = 90.0%`** — both denominators unmoved at **80** runtime exports | **GREEN ✓** |
| G21 | packed SCI-1 all three `true` | packed `sampleColorRamp=true mixColorsInto=true toRgba8Into=true`, and each now **invoked** by G20's smoke half | **GREEN, strengthened** |
| G22 | packed `toHex` / `easingNames` true, 40 names | **true** / **true**, `easingNames().length` **40** | **GREEN ✓** |
| G23 | `true,true,true,true` | **`true,true,true,true`** on the packed tarball | **GREEN ✓** |
| G25 | packed `Object.keys(bezierPresets).length` → 30 | **30**, and `bezierPresets["ease-out-circ"]` → `[0.075,0.82,0.165,1]` | **GREEN ✓** |
| G27 | packed `./transform` keys | `PathGeometry,getPointAtLength,getTotalLength` | **GREEN ✓** |
| G30 | `grep -c 'src/parsing' …/ARCHITECTURE.md` → 0 | **0** | **GREEN ✓** |

**Tally: 31 GREEN · 2 RED** (`G3` · `G12`), against the check's 26 · 7.

### RP-R.3 §Format And Lint Cadence, re-run whole

| command | Check 1 — RESUME ROUND | this seat | carriers |
|---|---|---|---|
| `npx vue-tsc -p tsconfig.lib.json --noEmit` | exit 0 | **exit 0** | — |
| `npx vue-tsc -p tsconfig.demo.json --noEmit` | exit 0 · 0 errors | **exit 0 · 0 errors** | — |
| `npx vue-tsc -p tsconfig.test.json --noEmit` | **2** errors | **2 errors** | the same two, `test/gradient-parse.test.ts:32,:63` — `ParsedGradientModel.intervals`. Inherited: ⟨cmd⟩ `git log --oneline -3` on both the test (`a61094e3`, V·W43) and its subject (`f90aeb02`) puts the drift **before this wave opened**, in a file no unit of this wave may write |
| `npx vitest run` | **4 failed / 628 passed (632)** | **4 failed / 628 passed (632)** | the same three files by name: `test/gradient-parse.test.ts` **2** · `test/spectrum-luma.test.ts` **1** (routes itself to X-W4) · `demo/test/shell/reka-binding-idiom.test.ts` **1** (demo/, routed). **Zero regression: not one test moved in either direction** |
| `npx eslint . --max-warnings=0` | **55 problems (23 errors, 32 warnings)**, carriers outside `docs/tranches/**` → 0 | **55 problems (23 errors, 32 warnings)**, ⟨cmd⟩ carriers outside `docs/tranches/**` → **0** | unchanged; the ignore is X-W8's G-6 |
| `npm pack` → `verify-packed-surface.mjs` → `consumer-surface-compile.mjs` | pack ok · **verify exit 1** · compile LEG1 ok / LEG2 red | pack **20 files** · **verify exit 0 · 80/80** · compile LEG1 **ok** / LEG2 red (O-12) | the pre-tag cadence now passes its own middle step |

One correction of this seat's own making, caught by the cadence and cured before any commit: the
first draft of the `mixColorsInto` smoke case carried a backtick inside `SMOKE_SOURCE`, which is
itself a template literal — ⟨cmd⟩ `npx eslint` → `146:62 Parsing error: Unexpected token undefined`,
one error over the close's 55. Reworded, ⟨cmd⟩ `node --check` → clean, ⟨cmd⟩ `npx eslint` on the
file → exit 0, and the suite total returned to **55 problems**. Recorded because a repair seat's
own defect is a defect.

### RP-R.4 The two REDs that remain, and why they are the check's own honest-RED set

- **G3** — LIB-02 reads **30** at this seat, the same 30, split identically. COHESION §0ac binds
  the gate to *"the entries that declare a `string` parameter"*, and the check independently
  measured that binding sound at the bytes (12 sole-`string` entries × 7 hostile strings and
  `coerceToSyntax` over 49 ordered pairs → **0 throwers**). Unmoved by this repair, and not this
  repair's to move: **RELIEVED, owner: the sitting.**
- **G12 LEG2** — `TS2307` + `ERR_PACKAGE_PATH_NOT_EXPORTED` on the root specifier. §0ac rules
  option (ii) **declared-retired**, O-12 is the position of record, and no `"."` key is added.
  LEG1 — *"public return types are nameable from their own subpath"* — reads `ok`, which is the
  leg HIGH-2's cure touches. **RELIEVED, owner: O-12.**

Neither is an unrelieved RED, so **the set the check called unrelieved — `G1 · G13 · G14 · G20 ·
G31` — is empty.**

### RP-R.5 Two gates re-measured because this repair touched their subject

**G24 — the analytic arms, re-substrated again.** `src/easing.ts` is one of HIGH-2's four files, so
the drift leg was re-run rather than inherited. The registry `0.13.0` tarball was **re-packed at
this seat** (⟨cmd⟩ `npm pack @mkbabb/value.js@0.13.0` → sha256
`b943f722a9681f698a6925ef26ae0e3638c7a4f62d4d8009bb3851bc5f1b36aa` — **the close's hash and the
check's hash, to the byte, a third time**), installed with its `@mkbabb/parse-that` dependency, and
compared over 1001 samples × 22 names against this seat's `dist/subpaths/easing.js`:
**`0 of 22 names drift ≥ 1e-3; worst overall 4.563e-6 (ease-in-out-back)`** — the published figure,
unmoved. Renaming the authored literal to `export const bezierPresets` moved **no curve**.
(The probe's own `leg3` path stays unrunnable here: ⟨cmd⟩ `node …/fourier-value-import-drift.mjs` →
`ERR_MODULE_NOT_FOUND …/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js`,
`ESC-W9-G24-SUBSTRATE`, unchanged by this repair.)

**G19 — one declared name was ADDED, and it is the cure itself.** The coverage command's second
denominator is `^export declare ` lines across `dist/subpaths/*.d.ts`. Measured at a detached
worktree built from `d39fe188` (the pre-repair commit) against this seat's tree:

⟨cmd⟩ `git worktree add --detach <scratch> d39fe188` → `npx vite build --mode production` →
`grep -h '^export declare ' dist/subpaths/*.d.ts | wc -l` → **164**; same command here → **165**
(double-run). Bare declares **7 → 0** and `_2` **60 → 0** at the same two clocks, which is the
delta's whole cause: five of the six css names already had an exported twin beside their `_2`
duplicate, and the sixth — `AnyColor` — was bare, so publishing it is `+1`. **Recorded here rather
than left silent, because G19's falsifier is "change the denominator without re-recording it".**
The published coverage denominators (80 runtime exports) and both published ratios
(`75/80 = 93.8%`, `72/80 = 90.0%`) are unmoved. The worktree was removed
(⟨cmd⟩ `git worktree remove --force` → `git worktree list` no longer lists it).

### RP-R.6 The MINOR and INFO rows

- **MINOR-1 (`LW-C`, SCI-1 shipped with zero behavioural tests) — PARTIALLY DISCHARGED, by
  HIGH-3's cure, and the remainder routed.** All three SCI-1 symbols are now **invoked** against
  the packed tarball on every `ci.yml:71` and `release.yml:110` run, with assertions on what they
  write: `mixColorsInto` must put the rgb midpoint `106` and alpha `1` in its `Float64Array`,
  `toRgba8Into` must put `12,34,56,255` in its `Uint8ClampedArray`, `sampleColorRamp` must return
  5 stops. `toHex` is pinned to `#0c2238`. That is a behavioural test per shipped symbol, on the
  artifact a consumer receives — the check's own cure text, in the file the check named as its
  owner (X-W9.e's row). What does **not** move is the vitest-suite reading: ⟨cmd⟩
  `node …/coverage-by-export.mjs` still prints `color 23 / 28 uncovered: isAnyColor, mixColorsInto,
  sampleColorRamp, toHex, toRgba8Into`, because that command measures `test/**`, not the packed
  smoke. A `test/**` battery is not this repair's to author against a defect the check itself
  routed to *"X-W9.e or X-W11's release battery"*; **it stays owed, now with its packed half paid.**
- **MINOR-2 (a published figure does not reproduce) — CORRECTED, dated addendum-beside.**
  §CL2.3 reads *"44 files + `packets/`"*. ⟨cmd⟩
  `git ls-files docs/tranches/X/waves/evidence/W9/ | grep -v '/packets/' | wc -l` → **46** at this
  seat, double-run. **The figure of record is 46; `packets/` holds 1 file.** E-3: §CL2.3 is not
  rewritten — this sentence is the correction beside it. No gate moves.
- **INFO-1 (`package-lock.json` sits in no §File Bounds row) — CARRIED AGAIN, disclosed again.**
  HIGH-1's cure necessarily regenerates it (⟨cmd⟩ `npm install --package-lock-only`, **+24 lines**,
  mechanical). It is `ESC-W9f-LOCKFILE-DERIVATIVE`'s exact shape and the check ruled the carry
  correct. Re-measured: ⟨cmd⟩ `npm ci --dry-run` → **exit 0**, no `remove @mkbabb/keyframes.js`
  line in the plan (its presence was the whole of HIGH-1). The standing ask is unchanged: the
  lockfile should join §File Bounds beside `package.json` in the next dated addendum.

### RP-R.7 Bounds and masking, measured over this repair's own commits

**Bounds.** ⟨cmd⟩ `git show --name-only --format=` over `e4f5f843 21aa8d4c b4fbfdcc 2f900da0` →
union **8 paths**: `package.json` · `package-lock.json` · `src/css/index.ts` · `src/css/grammar.ts`
· `src/css/types.ts` · `src/easing.ts` · `scripts/ci/verify-packed-surface.mjs` ·
`docs/tranches/V/ARCHITECTURE.md`. Seven are §File Bounds `modify` rows by name (lines 76, 79, 80,
82, 96, 102, 105 of `W9.md`); the eighth is the disclosed `ESC-W9f-LOCKFILE-DERIVATIVE`. **Zero** writes
outside: no `api/**`, no `e2e/**`, no `.github/**`, no `demo/**`, no `src/color/model.ts`, no peer
repository, no sibling wave spec, no `registry/adjudicated/**`, no read-only probe. ⟨cmd⟩ the union
grepped for `dev.sh` and `PaneSegmentedControl` → **0** and **0**; `scripts/dev/dev.sh` was never
touched and never staged. The `ARCHITECTURE.md` carve moved **one paragraph's one clause** at
`:657` and nothing at `:943-945` (X-W8's, CC-082). Every commit carried its own pathspec on the
commit itself, and the seventeen sibling-seat dirty rows are untouched at close.

**Masking: none.** ⟨cmd⟩ over every added line of all four commits, grepped for
`try {|catch|@ts-ignore|@ts-expect-error|eslint-disable|.skip(|.todo(|skipIf|as any|as unknown as`
→ **0**. ⟨cmd⟩ added `export * from` in `src/` → **0**: the `stylesheet.ts` forwarding re-export
that would green the inherited typecheck stayed **REFUSED for a fifth sitting**, and HIGH-2 was
cured by deleting a duplicate spelling rather than by re-exporting past it. `expected` in
`verify-packed-surface.mjs` was **widened with its behavioural half**, never relaxed — the driver
still refuses both an unexercised export and a stale case, and it now runs **80 invocations over 80
exports**. No allowlist, no copied producer selector, no `patches/`, no `node_modules` write, no
`test.skip`. Two REDs were left RED **by name** rather than cured by narrowing.

### RP-R.8 Disposition

**Four defects at ≥ MEDIUM, four cures, four commits, zero escalations.** Every cure was the one
the check itself named, in the file the check itself named, inside §File Bounds. The gate tally
reads **31 GREEN · 2 RED**, both remaining REDs carrying the check's own relief by id. The Goal
criterion now reads **four clauses of four** at the bytes: no public entry throws on a string; no
public signature returns a value its own `.d.ts` forbids; **every type a subpath returns is
nameable from that subpath** (this repair); and the surface shipped as one dated 4.1.0 cut whose
exact-pin consumers were packeted before the tag.

Three things this seat did **not** do, each deliberate. (1) It did **not** move the tag or the
version: `v4.1.0` remains `f3fccfb7`, ⟨cmd⟩ `npm view @mkbabb/value.js dist-tags` → `{ latest:
'4.0.0' }` and ⟨cmd⟩ `npm view … versions` shows **no 4.1.0 on the registry**, so no published
artifact is contradicted by these bytes and no second version was cut inside the wave (G29 intact).
The repaired tree is what X-W11 publishes. (2) It did **not** promote the LEDGER row or the
four-verb line: CHECK 4 (§0ac) has not run, and a repair seat does not stamp its own work — the row
stays `IMPLEMENTED (PARTIAL)` with the repair commits appended for the next check to read.
(3) It did **not** author a `test/**` battery for SCI-1 (MINOR-1's remainder), which the check
routed to X-W9.e or X-W11.

E13 mail, at this seat's own clock: ⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'` → **82** rows;
status read **positionally** (field 6) → **0 UNREAD**; the naive whole-row grep answers 6, of which
four carry the word in a Status cell that is not `UNREAD` and two in an Owner cell. **No UNREAD
mail in scope**, and this repair minted no INBOX row: it sent nothing, because every cure was
in-tree and no peer's surface moved.
