# Library Band — Adjudication (M-12 tri-fold, arbiter-F, L-14)

**MODEL RECEIPT (L-11, first field):** arbiter-F ran on **Fable 5**, exact model id **`claude-fable-5`**,
as served by the harness. Worker receipts: worker-F = Fable 5 (`claude-fable-5`,
`design/library-band-worker-f.md`, 7 waves); worker-O = Opus 5 (`claude-opus-5[1m]`, in-seat, no
subagent, `design/library-band-worker-o.md`, 9 waves). Recorded, not relabeled; no Opus credit is
claimed for this seat's work.

Session 2026-07-27 · node v26.0.0 · darwin arm64 · value.js `tranche-u` @ `c654824e`.
Both programs read in full; all four sweep ledgers (MTS-\*, KF-\*, FP-\*/ISO-\*/PT-\*, AB-\*) read as
embedded and cross-checked. Every decisive number below was **re-measured by this seat** before any
adoption (L-10/L-14); the refutation duty was discharged against both workers before either was
believed.

**Writes.** This document only. READ-ONLY everywhere else. `scripts/dev/dev.sh` untouched.

---

## §0 — THE VERDICT IN ONE PARAGRAPH

Neither worker is adopted whole. **Worker-O's skeleton wins** (9 waves; the third crash class LIB-01
is real and worker-F's W.L1 would have closed green while it shipped) and **worker-F's two strongest
structural findings win** (LB-N1, the consumer-position blindness that collapses seven symptoms into
one disease, probe RED at exit 1 today; LB-N2, the 350-LoC src/ cap is a phantom — canon applies it
to `api/src`, which HOLDS). Thirteen disagreements were ruled (§2), five with re-measured evidence
overturning one worker's number or scope. The band lands as **nine waves** (§4), one dated 4.1 cut,
five coordination packets (§5), and a DISSENT register kept verbatim (§6).

---

## §1 — ARBITER VERIFICATION LEDGER (what this seat re-measured)

Every row was executed by this seat against the built `dist/subpaths/` artifact or the tree, not
inherited. Two of this seat's own first readings were false and are recorded per MT-F022 discipline:
both were pipeline exit-code reads (`node … | tail; echo $?` reports `tail`'s status), corrected by
direct invocation before anything was booked.

| claim | source | arbiter measurement | verdict |
|---|---|---|---|
| `parseCssColor("constructor")` / `("__proto__")` throw `e.trim is not a function` | both | **THROW, both keys**; control `red` ok | CONFIRMED — MT-F024's "one distinct failure mode / one-character cure" is **false at HEAD** |
| `parseStylesheet("a{color:constructor}")` throws | both | **THROW** — an entry MT-F024's sweep certified `ok 0/172` | CONFIRMED |
| `parseTimingFunction("steps(2, constructor)")` → `ok:true`, `position` a function | both | `{ok:true, pos:"function"}` | CONFIRMED (MTS-02 — escapes every throw-based gate incl. G1) |
| **LIB-01**: `easing("constructor")` etc. throw in `./easing` | **worker-O only** | **5/5 keys THROW** (`function is not iterable`); control `ease` ok, unknown → `easing_name_unknown` | **CONFIRMED — worker-F's W.L1 scope was incomplete**; mechanism verified at `src/easing.ts:168` (`name in PRESETS` walks the chain) + `:169` destructure |
| `easing()` reference stability | both | `ease`/`ease-in`/`ease-out`/`ease-in-out` all **fresh closures per call** | CONFIRMED (the 21/40 census stands on keyframes' own run) |
| bare `declare` in emitted d.ts: 32 (F) vs 33 (O) | disputed | `^declare (type\|interface)` → **32**; `^declare ` → **33** — the 33rd is **`declare const PRESETS`** at `easing.d.ts:44` | **O wins**; the gate uses the wider pattern (a `declare const` is exactly as unnameable) |
| `_2` refs in `css.d.ts`: 25 (F) vs 58 (O) | disputed | **25 lines · 58 occurrences · 5 identifiers** (`Alpha_2 Channel_2 ChannelsBySpace_2 Color_2 SpaceId_2`); css.d.ts = 382 of 940 total d.ts lines | both true under their own semantics; the gate pins **occurrences: 58 → 0** |
| DR-12 `src/css/` `!` sizing: 90 (F) vs 94 (O) | disputed | grammar **72** + stylesheet **18** + timeline **4** = **94** | **O wins**; F omitted `timeline.ts` |
| the 297 `src/` `!` census (identical per-file in both) | suspicious agreement | independently re-derived with this seat's own regex: **297**, per-file distribution identical (decompose 113 · grammar 72 · path 35 · stylesheet 18 · quantize 18 · anchors 11 · easing 11 · operations 8 · math 7 · timeline 4) | genuine agreement, verified not celebrated |
| exports map: 7 subpaths, no `.`/`main`/`module`/`types` | both | confirmed by `require('./package.json')` | CONFIRMED (FP-01/MTS-07) |
| keyframes pin exact `"4.0.0"` | both | `package.json:69` | CONFIRMED — one bump event |
| SCI-1 symbols absent from `src/` | both | grep → **0** | CONFIRMED (DR-21, ninth carry forbidden) |
| **LB-N2**: canon caps are demo ≤400 + `api/src` ≤350; **no `src/` cap exists** | worker-F only | `docs/tranches/V/ARCHITECTURE.md:943-945` verbatim; `api/src` breaches **0**; demo breaches **5**; src over-350 = 5 files (899/609/564/483/377) | **CONFIRMED — F wins**; LIB-05's "350-LoC cap" for `src/` is a phantom |
| `color/model` bypass census | disputed 5→3 (F) / 2 files·3 stmts (O) | **3 statements, 2 files**: `src/css/types.ts:1`, `src/css/grammar.ts:18,:19`; `anchors.ts`/`operations.ts` use relative `./model` **inside** `src/color/` and must (the barrel re-exports them — routing through it is a cycle) | both corrected sides confirmed; LIB-04's rule is the right one |
| MTS-03/04/05/06 numeric-leaf defects | both | truncated run → **NaN**; expanded arc **31.4033** vs compact **0**; singular 3D → all-NaN object (type `\| null`); `deCasteljau(.5,[])` → `undefined`; `lerpArray` mismatch → `[2.5, 3.5, NaN]` | CONFIRMED, all |
| `library-band-gates.mjs` born-RED | worker-O | **exit 1**, 12 failing assertions | CONFIRMED |
| `consumer-surface-compile.mjs` born-RED | worker-F | **exit 1**: TS2459 on `CssValue` (./css) + `ColorFactory` (./color); TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED` on the root | CONFIRMED (LB-N1's witness) |
| LB-N1 mechanism | worker-F | test census: **7** package-specifier imports (4 files) vs **19** deep `../src/` imports; `vite.config.ts:41-50` self-alias rewrites subpath specifiers to file paths | CONFIRMED — no compile in this repo resolves value.js from a consumer's position |
| `isActivePublic` has one caller | both | definition + `forks.ts:15,:201` only | CONFIRMED (AB-1) |
| cursor `_id: String(doc._id)` | both | `crud-list.ts:62` in `encodeCursor` | CONFIRMED (AB-2) |
| fourier http as-built = 30 (contract says 41) | both | `grep -rnE '@router\.(get\|post\|patch\|put\|delete)' api/routers/*.py \| wc -l` → **30** | CONFIRMED (ISO-02) |

**Correction against worker-F's own prose:** the claim "I authored and **committed** the standing
witness" is overstated — `docs/tranches/V/megatranche/audit/probes/` is **untracked** at HEAD
(`git status` → `??`; `git ls-files` → empty). Authored yes, committed no. The probes (and this
adjudication tree) ride DR-23's track-or-archive act; the band's first executing wave force-adds
them. A witness that is not committed does not exist (L-7).

**Refutations sustained (both workers agree, arbiter confirms):** MTS-13(f) `src/.DS_Store` is
untracked (`.gitignore:4`) — struck; the proposed gate would be born GREEN. PT-08's proposed
standing gate is already satisfied (`verify-packed-surface.mjs` takes a tarball arg); the surviving
item is the hardcoded `strictTypes: 62` at `:137`.

---

## §2 — RULED DISAGREEMENTS (the tri-fold's product)

Each ruling names the evidence that decided it.

**RD-1 · W.L1 scope — the third crash class.** Worker-F scoped the prototype wave to `src/css/`
only; worker-O found **LIB-01** (`easing("constructor")` → TypeError, **five** reachable keys, no
`.toLowerCase()` on the path). Re-measured: 5/5 throw live. **O wins.** F's wave would have closed
on its own evidence while a third shipped crash class — on the exact symbol this program routes
fourier onto (ISO I-4) and the call keyframes makes at module evaluation — kept shipping. F's
load-bearing sequencing note survives: curing MTS-01 alone **unmasks** the `stylesheet.ts:163-171`
twin; the sites land together.

**RD-2 · bare-declare census.** 32 vs 33. Re-measured: F's regex (`^declare (type|interface)`)
misses `declare const PRESETS` (`easing.d.ts:44`). **O's 33 and the wider `^declare ` pattern win.**

**RD-3 · `_2` census.** 25 vs 58. Both true (lines vs occurrences). **No winner; semantics pinned**:
the gate asserts occurrences, 58 → 0, so no later seat can manufacture a discrepancy from the units.

**RD-4 · DR-12 sizing.** 90 vs 94. Re-measured **94** (F omitted `timeline.ts`'s 4). **O wins.**
DR-12's "12 assertions remain" is corrected to 94 with no change of disposition.

**RD-5 · restored analytic easing arms vs an `approximated: boolean` discriminant.** F rules
restore (R-4.1-4); O leaves the choice to the tri-fold (I-4, §7.5). **RULED: RESTORE.** A name like
`ease-out-circ` denotes the analytic curve; max|Δ| = 0.192 was measured twice independently; a
discriminant labels the wrong curve instead of curing it, and restoration closes fourier's drift
leg with no new marker vocabulary. The curve change keyframes sees at its bump is a **declared
divergence row** in the packet (both workers agree on the declaration).

**RD-6 · `resolveCssColor(source, ctx)` (O's A-6/I-9).** O ships it in 4.1; F's program omits it
and demonstrates the 4.0.0-viable route. O's own concession (§7.5): *"whether value.js wants them on
its surface is an owner-adjacent design call."* **RULED: DECLINED for 4.1, with a runnable
re-trigger.** Context-free parsing in value.js, context resolution in the consumer that owns the
DOM, is the honest boundary — `color_context_required` is the API saying exactly that; one measured
consumer does not justify a new context-resolution surface (KISS feedback, standing). Re-trigger
(L-4): `grep -rn 'light-dark\|var(--' ../glass-ui/src ../keyframes.js/src demo/ | grep -il 'toHex\|ToRgb\|parseColor'`
producing a **second** hand-rolled context-resolution arm re-opens the question at the next cut.
`toHex` **SHIPS** (both agree; two hand-rolled hex implementations measured).

**RD-7 · fourier colour-arm sequencing.** O sequences the colour arm after the 4.1 cut; F proves
order-independence at 4.0.0 (fourier owns the DOM read + theme observer; `parseCssColor` →
`convertColor(c,"rgb")` → a 3-line local hex formatter). **RULED: order-independent (F).** Booking
the fix behind a cut that can decline to land is the deferral shape — and under RD-6's decline,
O's sequencing would never unblock the var/light-dark half at all. The 3-line hex residual is
declared in the wave and deleted at fourier's 4.1 adoption.

**RD-8 · facility 19's law.** O: the same bidirectional law as the 18 HTTP facilities. F: a
**different, stated law** — a one-way correspondence ledger, because fourier is an application and a
mirrored surface would be isomorphism in name only. **RULED: F's law, populated by O's table.**
O's own I-1..I-10 table is already one-way in substance; the label matters because "same law" would
oblige fourier to publish a mirror. Law text (binding): *every symbol fourier imports from
`@mkbabb/value.js` appears exactly once, with its subpath, its status against the shipped version,
and the fourier obligation it discharges; direction one-way (value publishes, fourier consumes);
completeness bidirectional (no unlisted import, no listed symbol without a consumer).* `counts`
annotated `as-specified` with an `as-built` sibling census and its command (fourier http = **30**
at HEAD, not 41 — re-measured by this seat).

**RD-9 · DR-18's home — the stylesheet split.** F leaves the split with W.W8 (the registry home);
O re-homes it to the band's surface wave. **RULED: O's home (W.L4), after W.L1.** The band that
opens `stylesheet.ts`'s own files lands the split; parking library-tree work on an out-of-band wave
is the FM-09 vacuum shape, and DR-18's own words ("one measured number, in CI or not at all") are
better served by removing the breach. L-5: identity preserved, home move recorded; DR-17's demo
half stays with W.W8.

**RD-10 · the src/ LoC cap.** O's LIB-05 born-REDs 5 files against "the 350-LoC cap"; F's LB-N2
refutes the premise — re-measured verbatim at `ARCHITECTURE.md:943-945`, the caps are demo ≤ 400
(five live breaches, handed to the demo band by name) and `api/src` ≤ 350 (**holds, 0 breaches**);
no `src/` cap has ever existed. **F wins.** No wave born-REDs against a phantom cap. Replacement is
F's **R-T1 ratchet**: `max(wc -l over src/**/*.ts)` may not increase — 899 today; the W.L4 split
drops it to 609 and the ratchet locks the gain. O's BANK-L4-1 (wire a 350 cap into CI at ≤2
residual files) is **RETIRED** — it would install a cap canon never stated; the ratchet already
locks every improvement. LIB-05 is re-premised as the ratchet's census, not a cap.

**RD-11 · keyframes-side work: wave or packet.** O's W.L7 edits the keyframes tree directly; F
delivers K1–K4 as an outbound packet with runnable gates ("value.js cannot land them and does not
pretend to"). **RULED: F's mechanism, O's content.** Both workers cite the D-15 direct-edit grant
as the vehicle for the **fourier** half; no analogous grant exists for keyframes, and the standing
coordination law (E13 mail law; the BH/BI relay shape) routes cross-repo work through the inbox.
O's richer content — the 9 reference-collision note, the `_boundTimeline` decide-don't-delete rider,
the comment-provenance generalisation, gates G-L7a–e — becomes the packet body verbatim (§5.1).

**RD-12 · parser-band debt #3 (the try/catch dissent).** F: preserved open, "exactly as
adjudicated." O: "leaving it open is not [adjudication-compatible]" — it must resolve one way or
the other. **RULED: O's closure discipline on F's timing.** The dissent stays open **until the port
wave opens**, and the port wave's spec closes it toward one side as its first ruling. Indefinitely
open is the FM-03 no-failing-state shape; resolving it now, outside the port's context, would be a
coin flip wearing a ruling's name.

**RD-13 · transform + math: one wave or two.** F merges; O splits. **RULED: O's split.** Each half
is completable alone; `./math`'s single design decision (the failure-protocol choice) should not
ride a tokenizer rework, and the measured 38% landing rate (MT-F020) argues for the smallest
completable units.

**Agreements verified, not echoed** (both workers, arbiter re-confirmed where decisive): cand-O
stands as parser base and W.L1 is its complement, not competitor; G1 untouched, gains a sibling; G6
gains a rejection-shape leg (PT-02); G7 gains an ARMED cell (PT-03, input to OC-1, pre-empting
nothing); `./value` not deleted, `./css` re-exports the four AST types, `isLayoutTrackingUnit` does
not move (shape (ii) explicitly rejected, closed); PSL-3/I-10 failure contracts declared per
boundary, never unified; root `.` entry stays retired **and** the migration is delivered (a shim
re-creates the dual path; a silent retirement is a break); D-GAP-6 retired permanently on measured
zero demand; DR-33 retired with the premise corrected (unreachable, never swept — a no-op with a
memory bill; either-or, not neither); AB-11 deleted with no gate; AB-2 tiebreaks on `slug` and the
false docblock is deleted (both workers converge on slug); AB-9's nine routes split in one sitting;
the api CI typecheck gains `-p tsconfig.test.json`.

---

## §3 — FINAL RULINGS (binding on the band)

**PSL — the public-surface law** (F's clauses, O's enforcement detail):
- **PSL-1 (derivation).** Subpath barrels are mechanically derived, never hand-kept pairs of lists.
  `src/subpaths/*.ts` become star-forwards over the area barrel; the area barrel is the one place
  public/internal is decided.
- **PSL-2 (nameability).** Every type in a published signature is nameable from the subpath that
  publishes it. Gates: `grep -cE '^declare ' dist/subpaths/*.d.ts` sums to **0** (33 today) and the
  consumer-compile probe is green (RED today, exit 1).
- **PSL-3 (declared failure shapes).** `ParseResult` for text→AST; `Result` for value→value.
  Declared per boundary in the contract and docstrings; **never unified** (a breaking change across
  61 keyframes sites for an ergonomics gain TypeScript already catches).

**Topology:** `color/model` reachable from `src/color/` only (3-statement edit, deletes the 5
mangled declarations / 58 `_2` refs = 382-line `css.d.ts`'s duplication); `stylesheet.ts` splits at
the measured cycle-free seam (265/381/153, two cross-seam edges), after W.L1; R-T1 ratchet replaces
the phantom cap; `serializeCssValue`'s bare `TypeError` at `stylesheet.ts:86` joins the `Result`
idiom **before** the symbol is published.

**The 4.1 cut — ONE dated event, versioned 4.1.0** (keyframes pins 4.0.0 exactly; one bump event):
SHIP — SCI-1 (`sampleColorRamp`/`mixColorsInto`/`toRgba8Into`, DR-21 discharged with the measured
evidence tuple `keyframes backward-color.ts:171/:250/:263 count=1024`); `toHex` (`./color`);
`easingNames()`; memoised `easing()` (stable references); the **restored analytic in/out arms**
(RD-5); the barrel corrections (serializers, four AST types, `ColorFactory`, zero bare declares);
`verify-packed-surface`'s behavioural half + `strictTypes: 62` deletion. DECLINE — `sampleBezier`
(permanently, measured zero demand); `resolveCssColor` (RD-6, with re-trigger). FENCE —
`bezierPresets`' 30-key set and the 40-name catalog (additions silently mutate keyframes' public
registry; removals are a `loadAnimationEngine()` boot crash).

**API:** AB-1 (`assertReadable` on the four unguarded reads) is a **precondition on DR-28's UI
arm**, not its sibling — building publish/unpublish over today's api ships a privacy control that
controls nothing and gives it a button. `palette_versions` gains `deleteByPaletteSlugs` in the three
cascades; `/versions/:hash` **retires** (zero consumers); `versionCount` follows the write;
`assertVisibilityTransition` deleted; cursor tiebreak on `slug`; boot probe becomes one indexed
`countDocuments` and `/health` survives one malformed row; idempotency either lifts the key to the
logical operation or deletes the middleware and the three inline `crypto.randomUUID()` keys — not
neither.

---

## §4 — THE WAVE BAND (9 waves, adjudicated)

Hard chains, stated once: **W.L1 → W.L4 → W.L6** (the split must not move MTS-02's twin mid-cure;
the cut must not publish a surface under repair) and **W.L8 → DR-28's UI arm**. Everything else is
independent. No gate is a `scripts/**/proof-*.mjs` (DR-19). Every probe named below is force-added
to git at the wave that first cites it (L-7; see §1's correction).

### W.L1 — PROTOTYPE-REACHABLE LOOKUPS (four sites, one mechanism, three subpaths)
- **DEFECT/BORN:** RED. `src-surface-totality.mjs` exit 1 (28 assertions; MTS-01 15, MTS-02 2);
  `library-band-gates.mjs` exit 1 (LIB-01 5/5, LIB-02). All re-verified live by the arbiter.
- **SCOPE:** `src/css/named-colors.ts:1` · `src/css/grammar.ts:265-266, :457-462` ·
  `src/css/stylesheet.ts:163-171` · `src/easing.ts:166-170`. End state: no object literal reachable
  by a parse-derived key remains in `src/`.
- **STRUCTURE (L-8):** `Object.create(null)`-filled tables (or `Map`) + `typeof x === "string"` /
  `map.has(k)` narrowings — cand-O's adjudicated idiom applied to the sites the colour-grammar port
  does not replace. **Sequencing (load-bearing):** MTS-01's cure unmasks the stylesheet twin; the
  sites land together.
- **GATES:** G-L1a `src-surface-totality.mjs` — no public `./css` entry throws on any string; RED
  inputs `constructor`/`__proto__` bare and embedded (`a{color:constructor}`,
  `a{animation:x 1s steps(2,constructor)}`). G-L1b `library-band-gates.mjs` — `easing()` total over
  `Object.prototype` keys; RED input `easing("constructor")`. G-L1c property test:
  `Object.getOwnPropertyNames(Object.prototype)` × 21 function heads over the 9 parsers +
  `easing()`, with a **shape leg** on every ok payload (MTS-02 is green under throws-only).
- **CARRIES:** MT-F024 FOLD (its "one character" clause corrected by measurement); MT-F001 FOLD;
  DR-12 FOLD (the non-colour half; sizing corrected 12→94); MTS-01/02, LIB-01/02 BUILD.
- **ENV:** node vs `dist/subpaths/` (built). Blind to browser CSSOM and exports-map defects (W.L4's
  probe owns those). **COMPLETABLE:** yes — alone it kills three shipped crash classes and a type lie.

### W.L2 — TRANSFORM TOTALITY
- **BORN:** RED (arbiter-verified: truncated run NaN; compact arc **0** vs expanded **31.4033**;
  singular 3D all-NaN vs declared `| null`).
- **SCOPE/STRUCTURE:** `tokenizePath` rejects/truncates non-multiple-of-arity runs (deletes 12
  asserted reads); **arcs tokenize positionally** (SVG 1.1 §8.3.9 single-char flags — what SVGO/
  Figma/Illustrator emit); `decomposeMatrix3D` joins its own null ladder
  (`if (scaleX===0||scaleY===0||scaleZ===0) return null` — the 2D sibling already does this).
- **GATES:** totality blocks MTS-03/05; the arc-spelling gate (|expanded − compact| < 1e-6, plus one
  committed SVGO-optimised fixture); MT-F019's hostile-transform test (9 throws today);
  `no-non-null-assertion` scoped to `src/transform src/foundation` after the retirements.
- **CARRIES:** MT-F019 FOLD; MTS-03/04/05 BUILD; MT-F002's blanket `!` gate RETIRE (150 of 297 are
  compiler-invisible proofs; an arc wearing a wave's name). **COMPLETABLE:** yes.

### W.L3 — `./math` GETS A FAILURE PROTOCOL
- **BORN:** RED (`deCasteljau(.5,[])` → `undefined` typed `number`; `lerpArray` length-mismatch →
  silent NaN; `scale` computes the quotient three lines above its own guard).
- **STRUCTURE:** one stated precondition policy, enforced (the docstring at `:58` already states the
  contract in prose; the fix is to enforce the sentence that is written); `scale`'s guard moves
  above the division. Retires 7 dangerous assertions.
- **KF COUPLING:** `lerpArray` is keyframes' FrameCompiler hot loop — a mis-sized buffer is NaN
  animation frames with no diagnostic; the packet asks keyframes to add the length leg at their end.
- **COMPLETABLE:** yes — one 120-line file, one design choice stated once.

### W.L4 — THE PUBLIC-SURFACE LAW + MODULE TOPOLOGY (incl. the stylesheet split)
- **BORN:** RED — `consumer-surface-compile.mjs` exit 1 (TS2459 ×2, TS2307,
  ERR_PACKAGE_PATH_NOT_EXPORTED); `library-band-gates.mjs` LIB-03/04 blocks; 33 bare declares; 58
  `_2` occurrences; 3 bypass statements.
- **STRUCTURE:** PSL-1 derivation (the two lists become one); R-2a colour boundary (3 statements, 2
  files — **not** the sweep's original gate, which would demand a cycle: `anchors.ts`/`operations.ts`
  must import `./model` because the barrel re-exports them); R-2b stylesheet split
  (265/381/153, after W.L1); R-2c `./css` re-exports `CssValue/CssScalar/CssCall/CssList`, `./value`
  stays, `isLayoutTrackingUnit` stays (shape (ii) rejected, closed); hoist the six double
  `declarations.get()` at `stylesheet.ts:709-717`; `serializeCssValue` joins the `Result` idiom
  before export; `isSupportedSyntaxDescriptor` goes `@internal`.
- **GATES:** consumer-compile probe (LEG1 green; upgraded to run over `npm pack` output — the packed
  tarball is the correct oracle, PT-08); `^declare ` census → 0 (33 today); `_2` occurrences → 0
  (58 today); `"serializeCssValue" in CSS` → true (false today); the differential serializer gate vs
  keyframes' fork (`"a : b"` → `"a: b"` vs `"a : b"`, 2 of 3 fixtures RED); **R-T1 ratchet** — max
  src file LoC may not increase (899 today → 609 after the split, locked).
- **CARRIES:** MTS-08/09/10/13(a–e)/15 BUILD/FOLD; MTS-13(f) RETIRE (refuted); DR-18 FOLD — **home
  moves here** (RD-9), identity preserved, terminal (split lands or the row retires at close);
  KF-SPLIT-HOME FOLD (goes green consumer-side at the bump); LIB-03/04 BUILD; LIB-05 re-premised as
  the ratchet census (RD-10); BANK-L4-1 RETIRED (RD-10).
- **COMPLETABLE:** yes — alone, the surface becomes self-describing and the largest god module is gone.

### W.L5 — FOURIER: ROOT RETIREMENT, COLOUR ROUTING, FACILITY 19
- **BORN:** RED ×3 — `fourier-value-import-drift.mjs` 3/3 legs (5 × ERR_PACKAGE_PATH_NOT_EXPORTED;
  `timingFunctions` deleted; 8/22 curves drift, max 0.192); `fourier-vizcolor-oklch.mjs` 5/6
  (four oklch tokens → `#888888`; Fourier = Chebyshev = Legendre = grey);
  `consumer-surface-compile.mjs` LEG2.
- **ACTS:** (1) migrate the five sites to `@mkbabb/value.js/easing`; `timingFunctions` →
  `easingNames()` + `easing(name)` with the mapping recorded; bump the pin. (2) **delete**
  `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` (`colors.ts:22-117`) — not extend; the
  4.0.0-viable route is fourier-side context resolution (it owns the DOM read + theme observer) +
  `parseCssColor` + `convertColor` + a **declared 3-line hex residual**, deleted at the 4.1
  adoption (RD-6/RD-7). (3) write facility 19 under RD-8's law, populated from O's I-1..I-10 table;
  annotate `counts` as-specified with the as-built census (http = 30). Vehicle: the D-15 direct-edit
  grant. **Order-independent of W.L6** (RD-7): whichever lands first, the drifted curves are either
  a probe-pinned declared divergence row or already restored.
- **π (L-7):** the one headed evaluate (probe parsimony) + before/after convergence-plot pair, light
  and dark, **force-added** past `.gitignore:34 *.png` under
  `audit/probes/app-wave/fourier-viz-{light,dark}-{before,after}.png`. DELTA: four grey curves →
  four distinct hues.
- **CARRIES:** FP-01..04, ISO-01, MTS-07 BUILD; ISO-02 RETIRE (record-only, annotation lands here);
  MT-F018's language-boundary note FOLD. BANK: fourier's Python half —
  `grep -rnE '@router\.…' api/routers/*.py | wc -l` leaving 30 stales the census.
- **COMPLETABLE:** yes.

### W.L6 — THE 4.1 CUT (one date, one bump event)
- **BORN:** RED — SCI-1 grep 0; the four `./color` symbols absent; `easing()` unstable on all four
  CSS keywords (arbiter-verified); drift leg RED pending RD-5's restoration.
- **CONTENTS:** §3's SHIP/DECLINE/FENCE list, exactly. Version **4.1.0**, dated, CHANGELOG'd.
- **GATES:** the absence probe flips; `verify-packed-surface.mjs <tarball>` behavioural half (one
  smoke invocation per runtime export; `strictTypes: 62` deleted); reference-stability gate
  (`easing(x).value === easing(x).value` for the CSS keywords — RED today); drift leg 3 green
  (restored arms match 0.13.0 to <1e-3); the catalog fence (G-L6c — deliberately GREEN at
  authorship, its RED input **named**: delete any `bezierPresets` key; plus the
  `timingFunctionEntries` snapshot so additions surface as reviewed diffs); the coordination gate
  (`npm ls @mkbabb/value.js` in keyframes and fourier reads 4.1.x post-window).
- **CARRIES:** DR-21 BUILD-DISCHARGED (evidence tuple in the same commit); DR-12 items 4–5 FOLD;
  D-GAP-6 RETIRE permanently; SCI-1's "dischargeable-on-adopt" framing RETIRE; KF-41-DEMAND /
  KF-EVAL-THROW FOLD. BANK: the keyframes pin (`grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json`)
  — any post-cut additive symbol landing while the pin reads an exact lower version owes a packet.
- **ENV:** node against the **packed tarball**, never worktree `dist/` (PT-08). **COMPLETABLE:**
  yes, conditional only on W.L4 (stated, the band's one hard dependency into the cut).

### W.L7 — THE COORDINATION PACKETS (F's mechanism, O's content — RD-11)
- **DELIVERABLE:** the five packets of §5, authored, sent per E13, logged in
  `docs/tranches/V/coordination/`. Each carries runnable gates measured in the target tree; none
  edits a peer repo (the fourier edits live in W.L5 under D-15's grant).
- **BORN:** RED in the targets' own trees (arbiter spot-verified the value-side halves): keyframes
  `tsc --noUnusedLocals` 9 errors; 21/40 unstable references; atlas 16 root-specifier sites against
  an exports map with no root. **COMPLETABLE:** yes — packets are authored and sent in one session.

### W.L8 — API AUTHORIZATION (precondition on DR-28's UI arm)
- **BORN:** RED — anon reads a private palette (200), its versions (200), forks it into a public
  child (201); `/versions/:hash` returns a foreign document self-reporting the mismatch. Static
  chain arbiter-verified (`isActivePublic` one caller; `forks.ts:76` public child;
  `versions.ts:86-94` never touches `palettes`).
- **STRUCTURE:** one `assertReadable(doc, currentUserSlug)` on `isActivePublic` at the four
  entrypoints (404 semantics, matching "invisible means absent"); `deleteByPaletteSlugs` in the
  three cascades; `/versions/:hash` **retires**; `versionCount` follows the write; AB-11 deleted
  same commit, no gate.
- **GATES:** `palette-visibility-gate` spec (G1–G5 incl. owner-still-200) + `version-orphan` spec
  (orphan 0 after hard delete; re-claimed slug inherits nothing; null-owner `versionCount` honest).
- **CARRIES:** AB-1/3/4/10 BUILD; AB-11 RETIRE-by-subtraction; AB-8 RETIRE (record-only: name
  `modules/`+`platform/`; "api is NOT runnable here" struck); DR-28 sequencing rider.
  **COMPLETABLE:** yes — alone, private means private.

### W.L9 — API CORRECTNESS + GATE TRUTH
- **BORN:** RED — dead keyset tiebreakers (`String(doc._id)` vs driver-minted ObjectId under
  type-bracketed `$lt`; tie producer `admin/service/import.ts:39`); boot `process.exit(1)` before
  `serve()`; unreachable replay store holding up to 50,000 bodies in a 256M container; CI typechecks
  70% of the api.
- **STRUCTURE:** tiebreak on **`slug`** (string, uniquely indexed, honest type) + **delete the false
  docblock** (`crud-list.ts:120-127` — the comment is the defect's cause); boot → one indexed
  `countDocuments` over `$nor`, log loudly, hard failure at the read boundary; idempotency
  either-or, not neither (DR-33 re-premised); `-p tsconfig.test.json` at `ci.yml:70`.
- **GATES:** `pagination-tie` (5 palettes, one shared `createdAt`, limit 2 — union must equal the
  set; 2 of 5 reachable today) · `boot-resilience` · `idempotency-reachability` · `config-truth`
  row · `route-consumers` (reads the transport path set, **never** greps the tree — MT-F022; 9
  unlisted today, split per the AB-9 sitting: `/versions/:hash` retires with W.L8; `/forks` +
  `/provenance` wired by DR-28's UI arm; the four admin rows to DR-29's owner sitting, suspend
  wired-or-deleted with its whole enforcement path).
- **CARRIES:** AB-2/5/7/9 BUILD; AB-6/DR-33 RETIRE re-premised; AB-12 RETIRE (record-only). BANK:
  the second replica (`grep -c 'replicas:' api/compose.yaml`) — a deployment fact, not a wave.
  **COMPLETABLE:** yes; split-safe.

---

## §5 — COORDINATION CONSEQUENCES (packets owed, E13)

1. **keyframes.js** — (a) the R1 input class **widened** (any CSS scalar, not just colour) **plus**
   the prototype class (`constructor`/`__proto__` reaching `parseStylesheet`, which was on their
   safe list, 5/5 RED) with the three reachable call sites and per-site verdicts
   (`resolve/browser.ts:165`, `engine/options.ts:31`, `compile/value-ast.ts:71`); (b)
   `serializeCssValue` published — retire the diverged fork at `compile/emit/css-text.ts:41`; (c)
   the four keyframes-side waves with runnable gates: **K1** KF-EASE-REF (sampled value-identity on
   the 33-point grid; note the 9 reference collisions — `.find()` reverse-maps 31 refs onto 40
   names today), **K2** KF-LEAVES-TAUT (delete the tautology spec; correct the two false
   docstrings; the honest guard is "`/math`'s module graph stays grammar-free"), **K3**
   KF-UNUSED-BLIND (9 errors; decide `_boundTimeline` — wire the guard or delete field + prose
   together; then set `noUnusedLocals`), **K4** KF-PROVENANCE (comment-provenance gate); (d) the
   `bezierPresets`/catalog fence (G-L6c) + the **declared analytic-arm restoration** (8 names change
   curve back at their bump, max|Δ| 0.192); (e) the pin-bump coordination for the 4.1 window +
   `lerpArray` length-assertion ask (W.L3).
2. **atlas** — the 16 root-specifier statements, the 4 absent symbols (`TimingFunction`,
   `CSSCubicBezier`, `oklabToRgb255`, `srgbToOKLab`), the 3.1.0→4.0.0 exports-map delta, so the bump
   is a planned migration, not a discovery. Bank re-trigger: installed version leaves 3.x.
   (SCOPE.md §1 correction rides along: atlas lives at `~/Programming/atlas`, not
   `~/Programming/sci-report`.)
3. **glass-ui** (standing BH/BI relay) — the prototype input class: glass 7.0.0 imports
   `parseCssColor` and feeds it user-supplied strings; `constructor` is a string a colour input can
   receive. Joins the already-owed empty-argument (R1) relay.
4. **fourier-analysis** — facility 19 + the migration table (the edits themselves land in W.L5 under
   the D-15 grant; the coordination note logs the contract change and the declared 3-line hex
   residual with its 4.1 deletion date).
5. **parse-that** — evidence packet attached to the standing 1.1.0 ask (owner-held; no code change
   requested): PT-01 (labels are a no-op unless the diagnostics flag is armed, and arming couples an
   unconditional `console.error`), PT-03 (`PACKRAT_ARMED` one-way latch, 93.9 → 138.2 ns/parse =
   1.47×, `resetPackrat()` does not disarm — an OC-1 input), PT-04 (`Parser.lazy` arity 1, depth
   ceiling 7,761, thrown `RangeError`), PT-07 (5/5 non-string inputs throw raw; `.parse()` returns
   `undefined` on failure).

---

## §6 — DISSENT, VERBATIM

Recorded per L-14: where the workers disagreed and the losing side's words, so the disagreement
survives its own resolution.

**On the try/catch debt (RD-12).** Worker-F: *"This program does not pick — the try/catch dissent
is preserved as live disagreement, exactly as adjudicated."* Worker-O: *"Both are
adjudication-compatible; leaving it open is not."* Ruled: open until the port wave opens; closed by
the port wave's first ruling.

**On `resolveCssColor` (RD-6).** Worker-O: *"`var(--section-color-4)` → `color_context_required`
and `light-dark(oklch(…),oklch(…))` → `css_syntax` — both verified, and both appear verbatim in
`getComputedStyle` output for glass-ui custom properties. Without this, FP-04 only half-closes.
**SHIP in 4.1.**"* — and his own concession: *"whether value.js *wants* them on its surface is an
owner-adjacent design call."* Ruled DECLINED with a re-trigger; **this ruling is the arbiter's
closest call** and reverses cheaply at the next cut if the owner rules value.js should own context
resolution.

**On the easing discriminant (RD-5).** Worker-O: *"`easing(name)`'s ok arm gains an
`approximated: boolean` discriminant, OR the analytic in/out arms return to DIRECT_EASINGS. EITHER
closes leg 3; the choice is a tri-fold ruling (R-12) because it is a semantic decision about what a
named curve means."* Ruled: restore; the discriminant would canonise the wrong curve under a label.

**On the keyframes wave (RD-11).** Worker-O's W.L7 scoped direct edits to nine keyframes files.
Worker-F: *"value.js cannot land them and does not pretend to."* Ruled: packet mechanism; if the
owner grants keyframes direct-edit (a D-15 analogue), O's W.L7 spec is execution-ready as written.

**Standing dissents inherited from the parser band** (token-juxtaposition; non-finite policy) are
owner-held and untouched by this adjudication.

---

## §7 — CONSISTENCY ATTESTATION

Against `registry/adjudicated/parser-band.md`: cand-O stands; W.L1 is the port's complement (the
`steps()` aliases, the stylesheet twin, and `easing.ts` are outside the colour grammar); G1
untouched and stays wired; G6 gains the rejection-shape leg; G7 gains the ARMED cell as an OC-1
input; debts #1 and #3 re-specified against measured 1.0.0 limits with the dissent handled per
RD-12. Nothing here amends the verdict.

Against `DISEASE-REGISTRY.md`: DR-12 BUILD honoured (sizing corrected 12→94); DR-17 FOLD (demo half
stays W.W8; the five demo breaches handed to the demo band by name); DR-18 FOLD with a ruled home
move (RD-9), identity preserved, terminal; DR-19 RETIRE honoured structurally (zero `proof-*.mjs`
anywhere in this band); DR-20 RETIRE untouched and reinforced; DR-21 BUILD discharged on a dated
cut; DR-26 not touched (named only as an ENV note: `test/v4-color-behavior.test.ts` is not a valid
oracle for this band's colour claims); DR-28 BUILD with the W.L8 precondition rider; DR-29 FOLD (the
four admin routes join the sitting); DR-33 RETIRE with the premise corrected under L-10. The
forbidden deferral string of SCOPE.md §3 — and every synonym — appears nowhere in this document
(stated without quoting it, per the L-11 method note).

**L-5 compliance:** every carried row above holds exactly one of BUILD / FOLD / RETIRE with its
original identifier. **L-1 compliance:** each of the nine waves answers the one-wave test in its
spec. **L-7 debt, owned:** this document, both workers' programs, and the three probes are untracked
at HEAD; they are force-added at the band's first executing wave or at DR-23's W.W0 track-or-archive
act, whichever runs first.
