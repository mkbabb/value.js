# KF-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 3)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md` (522 L, X.KF.W2 · Parse Façade; repaired twice, rounds 1 and 2, both 2026-08-28)
**Corpus authority**: the **58** `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` — re-enumerated by this seat (`ls kf-*.md | wc -l` → 58). Sole in-tree carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (confirmed by `ls`: one file).
**Substrate**: keyframes.js frontier **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (measured this seat: `HEAD 8281638c` · `merge-base a59d3a22` · neither an ancestor; the disqualified head is 2026-07-28, the frontier 2026-07-18). Every keyframes.js read was `git show` / `git grep` / `git ls-tree` / `git cat-file` at the frontier. Zero product-source writes. The only execution was a read-only node probe of the installed `@mkbabb/value.js` dist (version re-verified **4.0.0**).
**Seat**: FRESH. Every count, byte, command output and quotation below was re-derived by this seat. PASS-1 and PASS-2 registers and both RULINGS files were treated as claims to be re-tested, never as inputs. Nothing is inherited — not a denominator, not an escape list, not a witness reading.
**Verdict**: **DEFECTIVE** — **70 routed · 62 booked · 8 escaped · 15 defects (6 MAJOR)**.

The round-2 repair is the strongest work in this file's history and most of it survives a hostile re-derivation intact. What convicts pass 3 is one structural fact and its consequences: **the round-2 §Excluded closed 13 records with the exact instrument whose blindness produced the round-2 escapes**, and eight further banked cells in the registry's own subject matter sit outside the register behind it.

---

## §0 Method

Routing is read at the **operative** rule this spec established at round 2 — not the narrow one it writes down. The written rule is "terminal disposition in any markup"; the *practised* rule, demonstrated by the round-2 adoptions, is **any banked cell in the registry's declared subject matter** — because **X15 (kf-ChannelControls SUP-3) is a superlative with no wave disposition at all**, and **X1, X3, X5, X7 carry neither a `KF.W2` token nor an `R1` token**. This seat applies the practised rule, uniformly, to all 58. Applying the written rule instead would retire four of the spec's own round-2 adoptions.

Instruments, all re-executed here:

| instrument | result |
|---|---|
| `ls kf-*.md \| wc -l` | **58** |
| `grep -cE 'KF\.?W2\b'` over the 58 | **70** hit lines / **16** files — reproduced exactly |
| the `KF.W2-TABS` separation | **22** non-TABS hit lines / **12** files; kf-ChannelControls' 16, kf-KfPillTabs' 24, kf-AnimationControlsGroup's 4, kf-ControlsPaneWrapper's 2, kf-DemoGlobalChrome's 1 are **all** TABS (each inspected, not counted) |
| `grep -lE '\bR1\b'` over the 58 | **41** files |
| record-name presence in `KF-W2.md` | **58 of 58** — every record is named somewhere in the spec ✓ |
| F0 matrix, node, installed 4.0.0 | re-executed cell-for-cell (below) |
| every `§Bounds` path, every gate witness | re-executed at `81a56990` (below) |

---

## §1 WHAT REPRODUCES — and it is a great deal

**Every single byte-anchor in this spec verifies at the frontier.** This is not a formality; it is the finding. Round 2's "no witness is inherited" claim is *true*, and this seat could not break it.

### 1a · Gate witnesses, re-executed

**G-W2-2, command (i)** — `git grep -n 'from "@mkbabb/value.js/css"' 81a56990 -- src/ | wc -l` → **29**; `-l | wc -l` → **27**. Stated: 29 / 27. ✓

**G-W2-2, command (ii)** — the perl whole-import-block reader, run verbatim:

```
total runtime specifiers: 25      distinct modules: 13
  6 src/animation/scroll/grammar.ts        6 src/animation/compile/adapter.ts
  2 src/animation/validate.ts              2 src/animation/engine/css/metadata.ts
  1 src/animation/resolve/function.ts      1 src/animation/resolve/browser.ts
  1 src/animation/engine/options.ts        1 src/animation/compile/value/compile.ts
  1 src/animation/compile/selector.ts      1 src/animation/compile/frame/interp-slot.ts
  1 src/animation/compile/emit/format/options.ts   1 src/animation/compile/emit/css-text.ts
  1 src/animation/compile/easing/registry.ts
```

**25 runtime specifiers over 13 modules — the stated reading, module for module and count for count**, including the 22 grammar/collector split, the 2 emit-half `serializeCssColor` importers and the 1 stray `coerceToSyntax`. The three faults round 2 says it killed *are* killed by construction: no `\b`, no `-E`, whole-block reads across newlines, and specifier-anchoring that structurally excludes `frame/compiler.ts:40`'s `from "../selector"`. **This is a real gate with a real witness.**

**G-W2-2b** — the demo arm, same commands re-aimed: **7** files name the subpath, one type-only (`timeline/timelineTypes.ts:1`), **8 runtime specifiers over 6 modules**, and the six are exactly the six the spec enumerates. ✓

**KF.W8 §Gates · G1's denominator**, re-run: `git grep -l 'from "@src/' 81a56990 -- demo` → **6 files**, `-n | wc -l` → **7 specifier lines**, `parseAnimationCSS.ts` among them. ✓

**Path drift table**, all eight rows: `parse-facade.ts` → ABSENT at the ref ✓ · `resolve/resolve-if.ts` → *"exists on disk, but not in `origin/master`"* ✓ (the round-2 seventh member is real) · `resolve/conditional.ts` **150 L**, `:27` `const legacyClauses = (list: CssList)…`, `:52` `return legacyClauses(fn.args[0]);`, `:102` `const normalize = (value: string) => value.trim().replace(/\s+/g, " ");` — all three verbatim ✓ · `demo/utils/keyframeSelector.ts` present origin-side ✓.

**Tier-A eleven**, each line read: `adapter.ts:222` `parseStylesheet(source)` · `easing/registry.ts:131` · `emit/format/options.ts:104` · `selector.ts:24` `parseValueSelector(start)` · `value/compile.ts:32` · `engine/options.ts:31` · `resolve/browser.ts:162` · `scroll/grammar.ts:77/:85/:109` · `validate.ts:182`. ✓ The census correction is right: `adapter.ts:266` = `export const resolveKeyframes = (` (a definition) and `engine/css/animation.ts:176` = `const resolved = resolveKeyframes(keyframes);` (a call to it) — **neither is a value.js entry**. `frame/compiler.ts:146` = kf's own `parseKeyframeSelector`. ✓

**Tier-C six**, each verbatim: `catalog.ts:16` the `@keyframes` strip regex · `view-transition.ts:136` `CQ_UNIT_RE` + `:146` `body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)` · `composition.ts:175` `raw.match(/-?\d*\.?\d+…/gi)` · `format/format.ts:135-144` `formatCSSKeyframeString` · `draw-svg.ts:89` `/^\s*\d*\.?\d+\s*%\s*$/`. Plus the candidate seventh at `format/format.ts:341` `.replace(/\(\s*\{/g,"{").replace(/\}\s*\)/g,"}")`. ✓

**Tier-B** — `cssom.ts` **466 L**; `:214-216` = ``new RegExp(`\\banimation(?:-name)?\\s*:[^;}]*\\b${name}\\b`)`` verbatim. ✓

**Tier-D / MISS-β2** — `format/format.ts:20` `const selectorText` · `emit/css-text.ts:58` `const serializeSelector` · `demo/utils/keyframeSelector.ts:7` `export const selectorText`. `emit/index.ts` export list read whole: `compileToCSS` family, `compileChild`, `serializeEasing`, `cssIdent`, `colorUnitToOklabCSS`/`isColorUnit`, the refusal types — **no keyframe-selector serializer**. ✓ The E-3 correction is right: `namedSelectorToFraction` **is** exported (`selector.ts:42`) and re-exported (`compile/index.ts:24`); the breach at `demo/utils/keyframeSelector.ts:5` is the deep `@src/` path. ✓

**G-W2-7's fixtures** — 14 `.css` + `manifest.json`, and the fourteen names are exactly the fourteen listed. ✓ `scroll/grammar.ts:143` `roundTripScrollCSS` present. ✓ `requireParsed` THROW `:57-63` verbatim. ✓

### 1b · The F0 matrix, independently re-executed

```
input                      color        values/value   scalar       timing       kfsel
oklch() / rgb()            THROW        THROW          THROW        ok:false[css_syntax]  ok:false[keyframe_selector_invalid]
calc()                     THROW        ok:false       THROW        ok:false     ok:false
steps()                    THROW        ok:false       THROW        ok:false     ok:false
color-mix(in srgb,red,blue) ok:false[css_syntax]  ok:true  ok:false  ok:false    ok:false
var(--x)                   ok:false[color_context_required]  ok:true  ok:false[css_syntax]  ok:false  ok:false
oklch(0.7 0.1 200)         ok:true      ok:true        ok:true      ok:false     ok:false
null / undefined           THROW        THROW          THROW        THROW        —      parseStylesheet: THROW
42 / {} / []               THROW        THROW          THROW        THROW        —      parseStylesheet: ok:true (empty)
parseStylesheet("oklch()") → ok:false[css_syntax]      parseStylesheet("@keyframes a{from{color:oklch()}}") → THROW
parseCssScalar("500%"|"-20%"|"from"|"to") → ok:true    parseKeyframeSelector("500%"|"-20%") → ok:false[keyframe_selector_invalid]
parseKeyframeSelector("from"|"to"|"50%") → ok:true, value {kind:"percent", value: 0 | 1 | 0.5}
parseTimingFunction("ease-in-bounce") → ok:false[css_syntax]
```

Every headline the spec builds on this survives: the R1 class is empty-argument functional notation escaping **five** entries; `parseStylesheet` silently accepts non-strings as an empty sheet; `adapter.ts:219-226`'s ABSORB arm is genuinely unreachable on the class; `color-mix()` is rejected at the colour entry and accepted at the value entry; `parseCssScalar("from") → ok:true` refutes the banked "rejects from/to" as an *entry* behaviour; the selector grammar returns a fraction where the scalar returns 500/−20/50. **KF-ET-2's `parseTimingFunction("ease-in-bounce") → FAIL` reproduces.** One cell in the published table is wrong by omission (D-12 below).

### 1c · M-25 depth — quotations, locks, riders, dissents

Every quotation this seat spot-checked verifies **byte-exact at its stated anchor**, including all nine round-2 R1 negatives (**X1–X9**), all five round-2 posture cells (**X10–X14**), the positive exemplar **X15**, ★ S-7, C S-C/superlative 3, K-6's `:24`/`:100` reachability guard, KF-ET-28's `?? ""` decoy sentence with its MINOR grade and degrade-don't-detonate cure shape, D-15's two fold directions, L-11's KT-not-caret disambiguation, and X9's *"the adopting spec must state this trade"* cure note. **No invention found. No lock dropped in the rows that are carried.** The KF-AV-28 rider's three bank anchors (`kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36`) all resolve and all carry the rider; the enumeration of **exactly one governed row** (L-6/C-4 under KF.W7 G1's timeline cluster) is **correct** — this seat checked every other cluster-banked row in the spec and each is dispositioned to KF.W7 or KF.W8, not NO-WAVE-OWNER, so none is governed.

### 1d · Cross-spec receipts — AUTHORITY REALITY

Every named-anchor receipt resolves, and the R2-7 idiom (anchor on §-heading / gate id / row id, line numbers declared non-load-bearing) holds:

| receipt | resolution |
|---|---|
| `KF-W6 §Taxonomy` | `KF-W6.md:14` — *"Taxonomy (binding, adjudicated KF-W4 §11 ¶1): lane-frontend §10's KF.W2-TABS / W3-SHIM / W5-PARTIALS / W7-TOKENS all COLLAPSE INTO THIS WAVE"* ✓ verbatim |
| `KF-W7 §0 · OP-5` | `KF-W7.md:32` ✓ verbatim, including the `timelineEngine.ts:13`/`:90` clause |
| `KF-W7 §Gates · G14` | `KF-W7.md:298` — Carries line verbatim, all six names present incl. **KAD-10** ✓ |
| `KF-W7 §Gates · G1` verdict table | `KF-W7.md:242` — KeyframeTimeline 312 / TimelineTrack 246 / TimelineCaret 70 / TimelineHoverPreview 38 / SequenceScrubber 162 / AnimationVisualizer 256 ✓ **all six line counts exact** |
| `KF-W8 §Rows · MISS-β2 (unit d · G3)` | `KF-W8.md:149` — *"the publication act, and it PRECEDES KF.W2 (RULINGS R-16)"* ✓ |
| `KF-W8 §Cross-edges · → KF.W2/W3` | `KF-W8.md:318-319` — the reciprocal *"arms if-and-only-if KF.W8 has not preceded"* ✓ verbatim; the order is genuinely declared at both ends |
| `KF.W8 §Gates · G1` | `KF-W8.md:181` ✓, denominator re-measured 6/7 ✓ |
| OP-4's live-script reading | `git show 81a56990:package.json` → `check = tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`; `check:lib = tsc --noEmit -p tsconfig.lib.json`; `lint = depcruise src`; **no vue-tsc anywhere** ✓ exact |
| W4's `npm run check` re-cut composes | `KF-W4.md:195` G-KFW4-1 redefines `check` = `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` — a superset substitution on the same project; W2's `src/`-arms-ride-`check:lib` posture survives it ✓ |
| W4 holds the depcruise-over-demo arm W2 depends on | `KF-W4.md:173` row 21 (KF-CE-12 gate arm) + `:203` **G-KFW4-11** `npx depcruise --config .dependency-cruiser.cjs src demo` ✓ the dependency is not a phantom |
| W10's obligations to W2 | `KF-W10.md:398`/`:419` — the KF-HA-19 / KF-APP-56 / C-19 reconciliation is **declared and carried, booked nowhere**, with *"KF.W2/KF.W3 own the class in-repo"* ✓ closed by carriage |
| W1's mint site | `KF-W1.md:79`, `:136`, `:191-194`, `:315` — **O-21** at every load-bearing site, **O-20** correctly stated as the measured ledger maximum, MINT LAW attached ✓ |
| W3 gated-unscheduled | `KF-W3.md:1` *"Parser Consumption (GATED, never scheduled)"*; the opening condition is `RC-P(V)` ✓ — but see **D-8** |

---

## §2 ID-KEYED CENSUS — 70 routed, 62 booked, 8 escaped

The spec's arithmetic is internally sound: 28 + 19 + 15 = 62, no cell double-counted, the F3 registry numbers 1..16 with the D-15 limb-split and the KF-ET-28 book-once-point-twice both handled correctly. **The 62 are all real and all land.** The register is nonetheless short, and the short-fall has a single mechanism (§3, D-1).

### 2a · The eight escapes

| # | id ⟨record:line⟩ | banked bytes | why it is in this register's subject |
|---|---|---|---|
| **Y1** | **KF-ES-3 · C-8** ⟨kf-EasingScene:42, ruling at :29⟩ **MAJOR, BLOCKER dissent preserved** | *"a reachable `steps(1, jump-none)` **throws inside the glass-ui EasingPicker the scene mounts by default** … the throwing computed feeds the picker's `value` computed AND its emit watcher — **render and emit both fault**"*; ruling: *"`steppedEase(1,'jump-none') → step_count_invalid` (**value.js** is spec-correct…); the picker's `throw Error(…)` unwrapper sits inside a computed"* → **GLASS-OWNED (BH relay)** + NO-WAVE-OWNER rider | A **value.js Result reaching a render path through a throwing adapter with no boundary** — row 16's exact class, in the **easing organ** KF-CB-33's lock tells this wave to sweep. Bank grade MAJOR with a BLOCKER dissent and a named escalation trigger; row 16 was adopted at MINOR |
| **Y2** | **KC-2** ⟨kf-KeyframeCardList:34; library datum at :101; headline at :14⟩ **blocker-weight** | *"**the offset Slider is dead: the write throws, the read pins.** `KeyframesEditor.vue:40-47` `frame.start.value = starts![i]` writes into a **value.js deep-frozen** [envelope]"*; and *"**THE LIBRARY · value.js 4.0.0's frozen parse boundary** — every parse result deep-frozen in a frozen envelope — which is exactly why KC-2 is a **loud TypeError** instead of silent corruption"* | The spec adopts kf-KeyframeCardList **as a verified negative only** (*"class unreachable; the seam is KeyframesEditor.vue"*) and drops the record's actual value.js finding. **A façade that hands back value.js parse results hands back frozen objects** — this is an entry-point-**contract** fact (G-W2-6's subject) with a blocker-weight in-tree instance, and the spec's contract clause never mentions it |
| **Y3** | **KF-HA-13** ⟨kf-HeroAurora:55⟩ **MAJOR** | *"`resolveAtoms` runs unguarded at `<script setup>` top level and **glass-ui's bridge converts value.js DIAGNOSTICS to throws**: `var(--accent-kf)` / non-opaque hex / `color-mix()` seeds **all THREW in execution** — one token-ising edit … from a **white-screened home route with no error handler anywhere**"* → **KF.W6**; *"The bridge's throw posture is producer-domain → note on the **glass relay**"* | A **colour-organ ingress with an executed outcome** (G-W2-5's literal subject) in an **AUDITED** record whose *sibling row* KF-HA-19 the spec carries at length. It also bears directly on C-19's clause: the spec rules that the façade must treat `color-mix()` as *"a first-class not-an-error at the colour seam"* while the live tree already **throws** on `color-mix()` seeds one hop out |
| **Y4** | **S-5 / C-S5** ⟨kf-KeyframesEditor:147⟩ **superlative** | *"**The offset-field error posture (S-5/C-S5)** — the **typed `ParseIssue` surfaced verbatim**, stable per-index toast id, explicit dismiss, whole-selector replacement — **the reference implementation** of the write `:43` should have made, asking the wrong parser (KF-KE-3)"* | The corpus's **only positive posture over a value.js `ParseIssue`** — more on-subject for a *parse-façade* registry than X15 (an engine-API exemplar), adopted at round 2 on exactly the reasoning *"a registry of sixteen absences with no exemplar of the present tense teaches nothing"*. The spec quotes it **in passing**, inside KF-KE-3's banked routing, and gives it no row |
| **Y5** | **KF-CO-48** ⟨kf-ChannelOptions:205⟩ **MINOR** | *"**one defect, two product behaviours: refusal vs throw.** `backward.ts` (`:245-275`): the `@keyframes` block emitters run FIRST and unguarded — both call `serializeEasing`, which **throws** for a twinless closure — while only `animationShorthand` sits in the try/catch that records the designed `custom-renderer` refusal; **`compileToCSS` (`:352-`) has no outer guard**"* | A **`src/`-side library failure posture inside `compile/emit/`** — this wave's own Tier-D territory, and the same shape as row 10 (a posture over a throwing serializer). §Excluded's blanket *"no KF-CO row is routed to this wave"* names only KF-CO-1/KF-CO-8 |
| **Y6** | **SUP-D** ⟨kf-RibbonBar:109⟩ **superlative** | *"the Export CSS comment is TRUE and **guards the most dangerous action** … fully discharged by its tail (**`compileToCSS` + verbatim CC-3 refusal surfacing**) … it is the **ONLY** handler whose entire tail — incl…"* | The **positive** counterpart of Y5, on the same `compileToCSS` seam: the one handler that surfaces the refusal verbatim. It belongs in F3's positive block beside ★ S-7 and SUP-3. Its record is one of the thirteen §Excluded declares carries no routed cell |
| **Y7** | **KF-CB-1 · D-1 = L·B-1 = C·C-1 = EE-01** ⟨kf-CopyButton:40⟩ | *"`timingFunction: \"bounceInEase\"` **resolves to nothing under value.js 4.0.0; the ctor throws inside the uncaught async `onMounted`**; `group` is never assigned"* | The spec carries **KF-CB-33**, the organ lock (*"value.js broke this component through the easing/css organ"*), and omits **the break itself** — the executed instance the lock is a generalisation of. A lock carried without its instance is M-25's letter over its fact |
| **Y8** | **M-4 (+ C-2's mechanism half) / K-7** ⟨kf-SpringTarget:45, :30, :93⟩ | *"**SpringTrace round-trips the engine through CSS text** (`springLinearStops` string → ~40-line regex reparse, `SpringTrace.vue:50-86`)"*; and the kill: *"**C-2's exculpation ('keyframes.js publishes no numeric spring sampler; the parser is forced') KILLED at the bytes** — `springTimingFunction(opts): Easing` is barrel-exported … `useSpringKeyframesEditor.ts:44-52` already consumes it"* | The spec cites **kf-SpringTrace C-2 ≡ L-3** at §Carry F2 as its wider-Tier-C evidence and at §Excluded as NO-WAVE-OWNER — **without the sibling ruling that re-grounds it**. The kill strengthens the spec's own thesis (the reparse is elective, and the sanctioned route is already in the tree) and is exactly the qualifier M-25 forbids dropping |

**Routed 70 · booked 62 · escaped 8.**

### 2b · Where the escapes sit

Y1 (kf-EasingScene), Y6 (kf-RibbonBar), Y8 (kf-SpringTarget) sit in three of the **thirteen records §Excluded declares carry no routed cell**. Y2 (kf-KeyframeCardList), Y3 (kf-HeroAurora), Y4 (kf-KeyframesEditor), Y5 (kf-ChannelOptions), Y7 (kf-CopyButton) sit in **AUDITED** records — five of the eight. Sampling explains **none** of this pass's escapes; the instrument does (D-1).

---

## §3 THE DEFECT REGISTER

### D-1 · MAJOR — the round-2 basis line is founded on the instrument its own round-2 escapes proved blind

§Excluded (`:483`) closes thirteen records with a named instrument: *"**13 carry no routed cell**, and are excluded **by measurement, with the instrument named**: … `grep -cE 'KF\.?W2\b'` → **0** on twelve of the thirteen."* §Carry (`:137`) then declares the recurrence cured: *"**That is now impossible by construction.**"*

Re-measured by this seat, over the **nine cells this very round adopted**:

| record | `grep -cE 'KF\.?W2\b'` | non-TABS |
|---|--:|--:|
| kf-ControlsPaneWrapper (**X1**) | 2 | **0** |
| kf-EditorHeader (**X2**) | 0 | **0** |
| kf-MatrixEditor (**X3**) | 0 | **0** |
| kf-PlaybackRibbon (**X4**) | 0 | **0** |
| kf-SequencePlayhead (**X5**) | 0 | **0** |
| kf-SequenceScene (**X6**) | 0 | **0** |
| kf-SpringHeatmap (**X7**) | 0 | **0** |
| kf-StartingStyleTarget (**X8**) | 0 | **0** |
| kf-SpringTrace (**X9**) | 0 | **0** |

**All nine return zero.** The instrument §Excluded names as proof that a record carries no routed cell returns zero on **every record whose routed cell this round adopted**. It is not a weak instrument; it is the instrument whose blindness *is* the round-2 finding. Four of the nine (X1, X3, X5, X7) additionally carry no `\bR1\b` token, so no token-based instrument reaches them at all — the spec's own §Provenance says so, in the sentence that defines the routing rule as spanning *"R1 boundary cells recorded 'so parser waves skip this file'"* and superlative prose.

The consequence is exactly the recurrence the basis clause was minted to stop: **three of the eight escapes in §2a (Y1, Y6, Y8) are inside the thirteen this line closes.** The gate's own falsifier — *"the gate reds if its stated basis is smaller than the corpus"* — does not fire, because the basis is nominally the whole 58; what is smaller than the corpus is the **instrument's reach**, and no clause guards that.

*Receipt*: the table above, re-run at the current bytes; `KF-W2.md:137` and `:483`.

### D-2 · MAJOR — KF-ES-3 · C-8 escapes: a value.js Result → throw on a default-mounted surface, in the organ this wave's own lock names

Y1. `kf-EasingScene.md:42` and the ruling at `:29`. **MAJOR at bank with reader-1's BLOCKER preserved as dissent and a named escalation trigger (SS-13 #1)**; mechanism complete at the adjudicator's instruments; blast radius verified at the dist — *"render and emit both fault"*. `steppedEase(1,'jump-none')` returns value.js's `step_count_invalid`; the glass picker's `throw Error(…)` unwrapper converts it inside a computed.

G-W2-1 asserts *"**every banked failure-posture cell in the WHOLE 58-record corpus** has exactly one row in one place"*. This cell has none, and §Excluded gives it no line. The spec's own precedent forecloses the obvious exemption: **row 16 (KF-ET-28) was adopted at round 2 despite a NO-WAVE-OWNER cure**, on the reasoning that a cell can be an organ ingress *and* a posture and still be booked once here with its owner intact. Y1 has the identical shape, a heavier grade, and an executed mechanism.

*Receipt*: `kf-EasingScene.md:29`, `:42`; `KF-W2.md:336` (the assertion), `:483` (the exclusion that swallows the record).

### D-3 · MAJOR — KC-2 and the value.js frozen-parse boundary escape; the record is adopted as a negative and its finding is dropped

Y2. The spec books kf-KeyframeCardList exactly once, in F0's VERIFIED NEGATIVES line: *"kf-KeyframeCardList (class unreachable; the seam is `KeyframesEditor.vue`)"*. The record's actual value.js content is blocker-weight and is not a negative: `:34` **KC-2** — *"the offset Slider is dead: the write throws, the read pins … writes into a value.js deep-frozen [envelope]"* — and `:101`, the library datum stated as such: *"**THE LIBRARY · value.js 4.0.0's frozen parse boundary** … every parse result deep-frozen in a frozen envelope — which is exactly why KC-2 is a loud TypeError instead of silent corruption."*

This is an **entry-point contract fact**, which is G-W2-6's declared product (*"the façade publishes **one** answer per seam"*) and the INGRESS-CENSUS's subject. A façade that returns value.js parse results returns frozen objects, and the corpus already holds the in-tree defect that fact produces. The spec's contract section never mentions freezing.

*Receipt*: `kf-KeyframeCardList.md:14`, `:34`, `:101`; `KF-W2.md:166` (the negatives line), `:409-411` (G-W2-6).

### D-4 · MAJOR — KF-HA-13 escapes: the corpus's third executed value.js colour measurement, in an audited record whose sibling row the spec carries

Y3. `kf-HeroAurora.md:55`. Three seeds — `var(--accent-kf)`, non-opaque hex, `color-mix()` — **all THREW in execution**, through glass-ui's bridge, at `<script setup>` top level, on a route with *"no error handler anywhere"*. The spec reads this record carefully enough to adopt **KF-HA-19** from `:66` and to re-execute and re-scope its conclusion, and leaves `:55` unbooked and unexcluded.

It is also materially adjacent to a ruling the spec makes. C-19's clause (`:224`) rules that *"Any façade diagnostic surface must therefore treat `color-mix()` as **a first-class not-an-error at the colour seam**, or the demo's token system reads as broken."* KF-HA-13 is the banked cell showing that in the live tree `color-mix()` seeds **already throw** one hop out, through a producer adapter — the census datum that tells the façade's diagnostic surface what it is actually up against.

*Receipt*: `kf-HeroAurora.md:55`; `KF-W2.md:224`, `:336`, `:402`.

### D-5 · MAJOR — the BH-relay DECLARED NEGATIVE is refuted by the registry it gates on

§Cross-edges (`:471`): *"**glass-ui BH relay (SS-6)** — **DECLARED NEGATIVE.** No row routed to this wave by the registry is glass-producer-owned; this wave raises **zero** BH-relay asks. **Recorded so no later seat invents a relay here**…"*

Two banked cells in this register's declared subject matter are **explicitly producer-owned with relay dispositions written at the bank**:

- **KF-ES-3** ⟨kf-EasingScene:42⟩ → *"**GLASS-OWNED** (**BH relay**: constrain the term×count domain or degrade the Result instead of throwing; value.js is CSS-spec-correct and needs no change)"*;
- **KF-HA-13** ⟨kf-HeroAurora:55⟩ → *"The bridge's throw posture is producer-domain → **note on the glass relay**"*.

Both are value.js-Result-to-throw postures — the registry's subject — and both name the relay this cross-edge declares empty. The sentence's instruction to future seats (*"so no later seat invents a relay here"*) is therefore an instruction founded on a false premise, and under the standing BH/BI relay edict it suppresses a real ask.

*Receipt*: `KF-W2.md:471`; `kf-EasingScene.md:42`; `kf-HeroAurora.md:55`.

### D-6 · MAJOR — S-5/C-S5 escapes the positive block, on the exact reasoning that admitted X15

Y4. F3's positive block (`:303-306`) is justified thus: *"a registry of sixteen absences with no exemplar of the present tense teaches nothing"*, and X15 is admitted because it is *"the corpus's ONLY cell measured directly against §7.5"*. **S-5/C-S5 is the corpus's only positive posture over a value.js `ParseIssue`** — *"the typed `ParseIssue` surfaced verbatim, stable per-index toast id, explicit dismiss, whole-selector replacement — the reference implementation"* — which is nearer this registry's subject (a **parse** façade's failure posture) than X15's engine-API exemplar. The spec even quotes it, inside KF-KE-3's banked routing at `:256` (*"the S-5/C-S5 error posture stays"*), and never rows it. A register that carries a cell's name in a quotation and drops it as a row is the same M-25 failure round 2 convicted itself of over KAD-10.

*Receipt*: `kf-KeyframesEditor.md:147`; `KF-W2.md:256`, `:303-306`.

### D-7 · MINOR — KF-CO-48 escapes: a `src/`-side refusal-vs-throw posture inside this wave's own emit territory

Y5. `kf-ChannelOptions.md:205`. `compileToCSS` (`:352-`) has **no outer guard**; `serializeEasing` throws unguarded while only `animationShorthand` records the designed refusal. §Excluded's blanket (`:496`) reads *"**KF-CO-1 / KF-CO-8** — no KF-CO row is routed to this wave by the registry"* and names only those two — while the same record's **C·S-4** *is* carried at F0, so the record is not out of reach. G-W2-1's assertion is corpus-wide over failure-posture cells and this is one, in `compile/emit/backward.ts`.

*Receipt*: `kf-ChannelOptions.md:205`; `KF-W2.md:336`, `:496`.

### D-8 · MINOR — the repin is stated in a literal KF.W3's ratified law forbids

KF-W2 names the successor's repin as **`4.0.0 → 4.1.x`** at three load-bearing sites: **OP-5** (`:40`), **§Cross-edges · KF.W3** (`:462`), **§Excluded** (`:491`). KF-W3's opening condition — the sentence that spec declares *"this file is its only lawful site"* for — reads: *"the repin **4.0.0→`V`** … run against the **registry coordinate `V`**"*, followed by *"**`RC-P` is named as a predicate, never as a wave number — wave numbers renumber, predicates do not.**"* KF-W3 further records at `:212` *"**no emergency 4.0.1 — ruled**"* against *"one dated 4.0.1/4.1 cut"*.

So the version literal is not W3's scope statement; it is a coordinate W3's own law converts to a predicate precisely because it drifts. This spec's doctrine — *"a bare line number in a live repair round is a receipt with a half-life"*, *"a phantom coordinate convicts"* — applies to a version literal for the same reason.

*Receipt*: `KF-W2.md:40`, `:462`, `:491`; `KF-W3.md:9`, `:11`, `:212`.

### D-9 · MINOR — "the eight dotted `KF.W2/W3` rows" is false for three of the eight

§Cross-edges (`:463`) names *"the **eight dotted `KF.W2/W3` rows** (KF-APP-56 · EditorShell C-19 · CubeAxisLines C·§4 · KF-KE-54 · TimelineTrack SUP-3 · **ChannelOptions C·S-4** · **ChannelControls C's L-1** · **CubeTarget #11**)"*. Measured:

```
kf-ChannelOptions   grep -cE 'KF\.?W2\b' → 0    (non-TABS 0)
kf-ChannelControls  grep -cE 'KF\.?W2\b' → 16   (non-TABS 0 — all KF.W2-TABS)
kf-CubeTarget       grep -cE 'KF\.?W2\b' → 0    (non-TABS 0)
```

Three of the eight carry **no `KF.W2` token at all**; ChannelControls' sixteen are the lane-frontend collision this spec separates at its own head. The three cells are real (C·S-4 at `kf-ChannelOptions.md:126`, C's L-1 at `kf-ChannelControls.md:126`, #11 at `kf-CubeTarget.md:76` — each read and each genuinely an R1 cell), so this is a **markup-class mis-statement**, not a fabrication; but the sentence's whole force is that these rows are *visibly* dotted to both waves, and for three of them the grep trail it invites does not exist.

*Receipt*: the three counts above; `KF-W2.md:463`.

### D-10 · MINOR — §Excluded's "13 carry no routed cell" is contradicted by §Carry F5, in this spec's own hand

§Excluded (`:483`) lists **kf-SequenceScrubber** among the thirteen and concludes *"there is no routed cell to own."* §Carry F5 (`:320`) sources the standing rider this spec carries from that record: *"KF-AV-28 · STANDING SUPERSESSION RIDER (KF.W7's defining lock) — carried, not cited. Banked at `kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, **`kf-SequenceScrubber.md:36`**."* Verified: `kf-SequenceScrubber.md:36` = *"KF-AV-28's standing rider applies: the KF.W7 ScrubberTimeline evaluation gates the component-shape rows."* The spec cites the record as a bank source for a lock it carries and then declares the record contributes nothing. Y1/Y6/Y8 compound the same line from the other direction.

*Receipt*: `KF-W2.md:320`, `:483`; `kf-SequenceScrubber.md:36`.

### D-11 · MINOR — the registry's row 16 is minted twice

§Bounds (`:117`) says of `parseAnimationCSS.ts`'s throw posture: *"Its posture arm is the **sixteenth** row of the registry's subject matter but is **NOT counted in G-W2-1's floor**."* F3's table already numbers rows **12, 13, 14, 15, 16**, and **row 16 is KF-ET-28**. The tree-side cell is the **seventeenth** item of subject matter — and "seventeenth" is the reserved trigger word in G-W2-1's own count discipline (*"a **seventeenth** banked posture found at wave-open is **added and named** in the same commit"*). One integer is doing two jobs at the seam where the gate's floor is defined.

*Receipt*: `KF-W2.md:117`, `:293-299` (rows 12–16), `:337`.

### D-12 · MINOR — the F0 matrix drops the mirror half of the evidence it forwards

The published matrix (`:150`) leaves `parseCssColor` × `steps()` as **"—"**. Re-executed: `parseCssColor("steps()")` → **THROW TypeError**. The adjacent `calc()` row fills the same column with **THROW**, so the blank is an omission, not a scope choice. It matters because of what the spec does at `:204`: it forwards the **C-L-2 shared-dispatch residual** to the V·π parser program with one datum attached — *"a **scalar** entry dying on a **colour** functional notation is behavioural evidence that the dispatch is shared."* The mirror datum — a **colour** entry dying on **non-colour** functional notation (`steps()`, `calc()`) — is the other half of that same evidence, was measured by the same run, and is left as a dash.

*Receipt*: this seat's probe output (§1b); `KF-W2.md:150`, `:204`.

### D-13 · MINOR — SUP-D escapes the positive block

Y6. `kf-RibbonBar.md:109` — *"the Export CSS comment is TRUE and **guards the most dangerous action** … fully discharged by its tail (`compileToCSS` + **verbatim CC-3 refusal surfacing**) … the **ONLY** handler whose entire tail …"*. The positive twin of D-7's Y5 on the same `compileToCSS` seam, and the only banked instance of a **refusal surfaced verbatim**. F3's positive block carries two rows; this is the third and it is on the emit seam this wave owns.

*Receipt*: `kf-RibbonBar.md:109`; `KF-W2.md:303-306`.

### D-14 · MINOR — KF-CB-33's organ lock is carried without its instance

Y7. The spec carries **KF-CB-33** twice (F0's organ lock at `:206`, and X8's dependency note at `:195`) — *"value.js broke this component through the easing/css organ (`parseTimingFunction` + `bezierPresets`) — exactly the class a §4.6-scoped parser wave would miss."* The break itself is **KF-CB-1** ⟨kf-CopyButton:40⟩: *"`timingFunction: \"bounceInEase\"` resolves to nothing under value.js 4.0.0; **the ctor throws inside the uncaught async `onMounted`**; `group` is never assigned."* The lock is a generalisation of that instance; the census that exists to make the organ visible names the generalisation and omits the datum.

*Receipt*: `kf-CopyButton.md:40`; `KF-W2.md:195`, `:206`.

### D-15 · MINOR — kf-SpringTrace C-2 is cited without the sibling kill that re-grounds it

Y8. §Carry F2 (`:264`) and §Excluded (`:494`) both cite **kf-SpringTrace C-2 ≡ L-3** as the wider-Tier-C evidence, NO-WAVE-OWNER. `kf-SpringTarget.md:30`/`:93` **kills C-2's exculpation at the bytes** (ruling 12 / K-7): *"'keyframes.js publishes no numeric spring sampler … the parser is forced' — **KILLED at the bytes** — `springTimingFunction(...).fn` is the sanctioned public route and `useSpringKeyframesEditor.ts:44-52` already consumes it"*, with `:45` **M-4** naming the mechanism (*"SpringTrace round-trips the engine through CSS text … ~40-line regex reparse, SpringTrace.vue:50-86"*). The kill **strengthens** the spec's thesis. Carrying the cell without it is the M-25 pattern this file has now been convicted of three times in a row at different rows.

*Receipt*: `kf-SpringTarget.md:30`, `:45`, `:93`; `KF-W2.md:264`, `:494`.

---

## §4 AXIS VERDICTS

| axis | verdict | note |
|---|---|---|
| **(1) ID-KEYED CENSUS** | **RED** | 70 routed / 62 booked / **8 escaped**. The 62 booked are sound and the arithmetic reconciles; the instrument behind the exclusions does not reach the corpus (D-1) |
| **(2) AUTHORITY REALITY** | **AMBER** | Every named-anchor receipt resolves and every banked quotation is byte-exact — a genuinely clean result. Two coordinate faults: the `4.1.x` repin literal against W3's ratified predicate (D-8) and the dotted-eight mis-characterisation (D-9) |
| **(3) M-25 DEPTH** | **AMBER** | **No invention.** Every carried lock, rider, dissent, cure-shape lock and disambiguation verifies. Four dropped limbs on cells not carried: Y7's instance under a carried lock (D-14), Y8's kill under a cited cell (D-15), Y2's library datum, Y4's positive row |
| **(4) GATES / WITNESSES AT THE FRONTIER** | **GREEN** | All nine gates born-RED with live witnesses; **every command re-executed at `81a56990` produced its stated reading**, including the two-command G-W2-2 re-cut (25/13) and G-W2-2b (8/6). No witness anchored at the disqualified `8281638c`. One published matrix cell blank (D-12). This axis is the round-2 repair's real achievement |
| **(5) POSTURE** | **AMBER** | W4 head honoured and its `npm run check` re-cut **composes** with the live scripts (`vue-tsc -p tsconfig.json` substituting for bare `tsc` on the same project; `check:lib`/`lint` intact) ✓ · W4 genuinely holds the depcruise-over-demo arm W2 depends on (G-KFW4-11) ✓ · W3 gated-unscheduled honoured in form ✗ in coordinate (D-8) · KF-AV-28 present, and the one-governed-row enumeration is **correct** ✓ · O-21 (not O-20) at W1's mint sites ✓ · W10's carry-routed obligations closed by **carriage** at `KF-W10.md:398`/`:419` ✓ · the BH-relay declared negative is refuted (D-5) |

---

## §5 VERDICT

**DEFECTIVE.**

The round-2 repair did real, verifiable work: the two-command G-W2-2 re-cut is a genuine gate whose three prior faults die structurally, the seventh drift-table member is real, `parseAnimationCSS.ts` belongs in the census and now is, the fifteen round-2 adoptions are all byte-exact, and **not one witness in this file failed re-execution at the frontier**. On axis 4 this spec is now the strongest in its cohort.

It fails on the axis it declared cured. §Carry says *"That is now impossible by construction"*; the construction is a `grep -cE 'KF\.?W2\b'` that returns **zero on all nine cells this same round adopted**, and three of this pass's eight escapes sit behind it. The register's completeness claim has now been refuted in four consecutive passes — 5 → 8 → 11 → 16 → and short again — and the recurrence has not been arithmetic since round 1. It is that **the exclusion side of the ledger is measured by token-matching while the adoption side is measured by reading**, and the two are not the same instrument. Until the exclusion of a record is established by the same reading that establishes an adoption, the fifth pass will find a fifth shortfall.

The eight escapes are not marginal. **Y1** is a MAJOR-with-BLOCKER-dissent value.js-Result-to-throw on a default-mounted surface in the easing organ this wave's own lock names. **Y2** is a blocker-weight defect founded on a value.js **contract** fact — the frozen parse boundary — that the entry-point contract this wave publishes does not mention. **Y3** is the corpus's third executed value.js colour measurement, in an audited record whose sibling row the spec re-executes at length. Together Y1 and Y3 refute the BH-relay declared negative and, with it, an instruction written to stop later seats from raising the relay.

*Written by the PASS-3 seat, 2026-08-28. Sole write: this file. Zero product source opened for writing; zero writes outside `conformance/PASS-3/`. keyframes.js was read only through `git show`/`git grep`/`git ls-tree`/`git cat-file` at `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`; the sole execution was a read-only node probe of the installed `@mkbabb/value.js@4.0.0` dist.*
