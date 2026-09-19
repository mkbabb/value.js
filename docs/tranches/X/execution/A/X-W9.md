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
