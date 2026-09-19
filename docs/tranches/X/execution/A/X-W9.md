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
