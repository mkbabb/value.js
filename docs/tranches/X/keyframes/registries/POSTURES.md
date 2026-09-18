SERVED MODEL: claude-opus-5[1m]

# X·KF · THE FAILURE-POSTURE REGISTRY

**Wave**: X.KF.W2 — Parse Façade · **Unit**: `KF.W2.a` · **Published**: 2026-09-17
**Authority**: `docs/tranches/X/keyframes/waves/KF-W2.md` §Carry **F3** (the registry) · §Carry **F0**
(the census that bounds its subject) · §Gates **G-W2-1**.
**Ref of record**: keyframes.js `7d958f212fd519142ee9ed5e298d5afe456a7967` (`origin/master`, verified
by this seat). **Artifact of record for every executed reading cited here**:
`node_modules/@mkbabb/value.js/dist/subpaths/{css,easing}.js`, version **4.0.0**.
**Basis**: the **58**-record adjudicated corpus at
`docs/tranches/V/megatranche/registry/adjudicated/kf-*.md`, read **cell by cell**, whole.

---

## §0 · What this file is, and the one thing it is forbidden to say

This is the **enumeration** G-W2-1 asserts: *one row each, in one place*, for every banked
failure-posture cell that **this seat's reading of the 58-record corpus has established**, with scope
spanning `src/` **and** `demo/`.

**Per LAW B, no completeness claim is made in this file's voice.** A spec cannot certify the
completeness of the set it is itself the enumeration of. The completeness statement is **carried** by
the freshest conformance census artifact and is cited at **§3**, never re-asserted here. The number
below is a **FLOOR under a reading-established enumeration**, never a closure over the set and never a
target.

**Subject, as the register practises it** (F3's own words, used as the test for every cell read):
a cell whose CLAIM is a **failure posture over a value.js-bearing path** — the handling (or the
absence of handling) of a value.js parse/easing **Result**, or of the throw a value.js-bearing seam
raises, at the seam where library and consumer meet. Cells whose thrower, whose discarded Result, or
whose absent boundary belongs to **kf's own engine**, to a **vendor helper**, to a **Vue prop**, or to
a **chunk load** are read, named, and dispositioned with their ground at **§5** — they are not booked
here, and none of them is excluded by a token match.

---

## §1 · THE FLOOR — 20 rows

Rows 1–5 are the library postures of `lane-library §7.5`, re-pinned at `origin/master` by the fold
seat. Rows 6–20 are banked corpus cells, each carried **at the bank's own id, grade, owner and cure
shape**; **no cure moves here, no id is renamed, no grade is inflated or softened** (M-25).

| # | banked id ⟨record:line⟩ | the posture | grade at bank | disposition / owner (carried, not moved) | adopted |
|--:|---|---|---|---|---|
| **1** | `adapter.ts:219-226` `parseSource` ⟨lane-library §7.5⟩ | **ABSORB** — `result.ok ? {ast, issues:[]} : {ast:[], issues:result.diagnostics}`; failure becomes an empty AST + `ParseIssue[]` surfaced as Diagnostic rows | — | library posture (§7.5) | authoring |
| **2** | `scroll/grammar.ts:57-63` `requireParsed` ⟨lane-library §7.5⟩ | **THROW `TypeError`** | — | library posture (§7.5) | authoring |
| **3** | `validate.ts:180-192` `keyframesNames` ⟨lane-library §7.5⟩ | **SWALLOW** — `try{}catch{return []}` | — | library posture (§7.5) | authoring |
| **4** | `compile/selector.ts:23-35` ⟨lane-library §7.5⟩ | **THROW `AnimationOptionError`, code `EMPTY_PARSE`** (at `:33`) | — | library posture (§7.5) | authoring |
| **5** | `compile/value/compile.ts:33-38` ⟨lane-library §7.5⟩ | **THROW `TypeError`**; `parseAuthoredValue` type-guards `typeof value === "string"` first (`value/compile.ts:31`) — kf's value arm is the only seam that normalises non-string input today, **by accident of shape rather than by contract** | — | library posture (§7.5) | authoring |
| **6** | **R-4** ⟨kf-CSSPasteDialog:42⟩ | submit has **no acknowledgement channel** and a failed parse **destroys the paste**; the close sits inside `if (text.trim())` — conditional on non-empty text, **unconditional on parse result** | MAJOR | **KF.W7** (busy/error/awaitable-close or `v-model:text` hoisting), cross-referenced to this registry from the consumer's end | authoring |
| **7** | **KAD-9** ⟨kf-KeyframesAddDialog:53⟩ | the only in-dialog completion signal **fires on failure**, and there is no in-dialog error surface; success unmounts the bar mid-flight, so the sweep is only ever *visible* on failure | MAJOR | **KF.W7** — the failure-posture / busy-state contract, joined to this registry | authoring |
| **8** | **C-7** ⟨kf-KeyframeTimeline:48⟩ | the silent `console.error`: `useTimelineBuild.ts:47-50` (`console.error` + `animation.value = null`) — **the file's ONLY non-toasting failure** against five toasting ones at `:121/:133/:137/:148/:155/:157` | MAJOR | **KF.W7** (one failure posture); the crash identity FOLDS to the megatranche R1 row and is **never re-booked** | authoring |
| **9** | **D-12 = L-6 = C-4** ⟨kf-SpringTrace:56⟩ | **silent-swallow error posture** — an unparseable stop becomes `{v: 0}`, indistinguishable from a legitimate baseline datum, while the header still counts it as plotted; one line earlier `filter(Boolean)` silently **RENUMBERS** the axis. Latent, not live (the emitter is total over the regex today); **violates the engine's own fail-explicit law** (`easing.ts:13-16`) | — | **NO-WAVE-OWNER** — cure-shape lock carried: *"one fail-explicit cure for both mechanisms"*; the packet names it *"the parser posture (D-12/L-6/C-4 + the filter-cell)"* ⟨:140⟩ | repair round 1 |
| **10** | **C-2** ⟨kf-KeyframesStringControls:63; row head `:62`⟩ | the pane's **only content-production path is unguarded over a throwing, value.js-bearing serializer**; a mount-time rejection boots Monaco empty, indistinguishable from *"no keyframes"*, with no remount available; the chain ends at `css-text.ts:54` `throw new TypeError("Value returned an unserializable CSS color.")`; every sibling op routes through `withErrorToastAsync` with Retry — **only the mount path is bare** | MAJOR | **absence-of-posture → NO-WAVE-OWNER**; **reachability → KF.W3**. The split is carried whole: the posture counts here, the reachability question is W3's and is **not answered here** | repair round 1 |
| **11** | **D-6 / L-BL-3 / C-1** ⟨kf-KeyframesStringControls:60⟩ | `formatEditor` **has no error posture**: a prettier rejection latches `isFormatting` true for the life of the never-unmounted instance, permanently muting the success channel, with **both callsites bare** — one of them a discarded promise in a sync keydown, i.e. a **true unhandled rejection** | MAJOR | **NO-WAVE-OWNER** (EDITOR-UNIT adjacency; success-path twin banked at **KF-CE-7**). Cure-shape lock: *"one `finally` + the idiom"* | repair round 1 |
| **12** *(=X10)* | **L-15** ⟨kf-TimelineCaret:68⟩ | **silent swallow on unparseable input diverges from the cluster's toasting posture**; the axis itself flags it **ruling-dependent** (a garbage keystroke is arguably a cancel); *recorded as filed, unactioned pending the W7 posture ruling* | INFO | **KF.W7** — the *ruling-dependent* qualifier is carried; this registry records the posture and does **not** pre-empt the ruling | repair round 2 |
| **13** *(=X11)* | **L-11 (KeyframeTimeline)** ⟨kf-KeyframeTimeline:72⟩ | `rebuild` is `async` typed/called as `() => void`; `snapshot` **toasts success before the rebuild can fail**; **failures reach only `console.error`** | MINOR | **KF.W7**. Disambiguation carried: this is **KT's** L-11, **NOT the caret's L-11** — two banked ids, one glyph; conflating them is an anti-rename breach | repair round 2 |
| **14** *(=X12)* | **D-15 (KeyframeTimeline)** ⟨kf-KeyframeTimeline:59⟩ | empty / single-frame / **rebuild-failure states are unexpressed**; **the one failure reachable BY TYPING is the one that doesn't toast** | MAJOR | **KF.W7**. Fold directions carried whole: the whitespace-submit arm FOLDS → **R-17**; the closes-before-parse arm FOLDS → **R-4** (already row 6) — **this row books only the rebuild-failure limb** | repair round 2 |
| **15** *(=X13)* | **KAD-10** ⟨kf-KeyframesAddDialog:54⟩ | **async submit, no busy state**; re-entry re-appends stops; `addKeyframesStringToAnimation` awaits `parseAnimationCSS` and loops `addFrame` (`useKeyframeOps.ts:172-177`) **with no in-flight guard**, so repeated clicks duplicate the stops | MAJOR | **KF.W7** — the **busy-state half** of the very contract row 7 already quotes; carried in name and dropped in limb until round 2 (M-25) | repair round 2 |
| **16** *(=X14)* | **KF-ET-28 · D-3 = C-6** ⟨kf-EasingTarget:70⟩ | **value.js's Result API reaches the render path through a throwing adapter with no boundary**, latent by measurement (25/25 names resolve; the catalogue test REDs a typo before a browser can); the `?? ""` **decoy at `:288` guarantees the throw it appears to prevent** | MINOR *(bank's own grade, stated not inflated)* | **NO-WAVE-OWNER** with the **do-not-re-probe lock**; cure shape carried verbatim: **degrade-don't-detonate** (skip-not-throw on missing attribute). **The cure is not this wave's** | repair round 2 |
| **17** *(=Y1)* | **KF-ES-3 · C-8** ⟨kf-EasingScene:42; ruled at `:29`⟩ | a reachable `steps(1, jump-none)` **throws inside the glass-ui EasingPicker the scene mounts by default**; the throwing computed feeds the picker's `value` computed **AND** its emit watcher — **render and emit both fault**. Ruled mechanism: `steppedEase(1,'jump-none') → step_count_invalid` (**value.js is spec-correct** — CSS requires ≥2 for jump-none); the picker's `throw Error(…)` unwrapper sits inside a computed; `terms` exported unfiltered; the demo seeds `steps: 1` for `step-start`/`step-end` (`EasingSidebar :106-110`) | MAJOR, with reader-1's **BLOCKER preserved as dissent** | **GLASS-OWNED** (BH relay: constrain the term×count domain or degrade the Result instead of throwing; **value.js is CSS-spec-correct and needs no change**) **+ NO-WAVE-OWNER rider** (the demo's steps-1 seeds gain a guard until the producer cure lands). **Escalation trigger carried**: whether the term control offers `jump-none` while `steps === 1` (**SS-13 #1**) — if it does, this is a one-click crash of a default-mounted surface and **the row escalates to BLOCKER**; the trigger is armed at `KF-W9 §H`; the cure-lock limb folds at `KF-W4 §Carry`'s carry-table row 8 (`KF-ET-6 ≡ KF-ES-3 ≡ KF-ES-14` → `G-KFW4-14`). **This registry books the POSTURE and nothing else** | repair round 3 |
| **18** *(=Y5)* | **KF-CO-48** ⟨kf-ChannelOptions:205⟩ | **one defect, two product behaviours: refusal vs throw.** `backward.ts:245-275` — the `@keyframes` block emitters run **FIRST and unguarded**, both calling `serializeEasing`, **which throws for a twinless closure** — while only `animationShorthand` sits in the try/catch that records the designed `custom-renderer` refusal; **`compileToCSS` (`:352-`) has no outer guard** | MINOR, engine-lane rider | **Engine lane.** The demo's export button catches + toasts, so this is the engine lane's asymmetry. At `origin/master` this component no longer triggers it (**EE-02**); **the asymmetry itself is unchanged.** Full booking by gate id: `KF-W5 §Carry · Arm B · row B-15` · `KF-W5 §Gates · G-OPTSET` third leg (*"an option setter reaches the frames, or refuses"*, ONE letter, four legs — do not split). **This registry books the POSTURE; the cure is G-OPTSET's** | repair round 3 |
| **19** *(=Z1)* | **KF-KE-2 · L-B1 + D-2(read) + C-M3** ⟨kf-KeyframesEditor:41⟩ | `:43` writes `frame.start.value = starts![i]` into a **value.js deep-frozen selector** → `TypeError` at i=0, the loop aborts, `:45` never runs — **and the user sees nothing**: Vue wraps template handlers in `callWithAsyncErrorHandling`, so **the throw is a console line, not a surfaced error**. Third limb, executed: the declared domain offers **20 points value.js rejects at parse** (`keyframe_selector_invalid, expected:["0%..100%"]`) | blocker-weight at bank (three independent kills, one control) | **KFED-UNIT** — one spec: read via `selectorPercent`, write by whole-selector replacement à la `:206-209`, domain `0..100`, fractional step, `marks`, per-thumb `aria-valuetext`, with KF-KE-34. **Ordering constraint carried whole and load-bearing (M-25)**: *"fixing the freeze without the unit creates the 100×-destructive write L-B1 warned of."* **Booked ONCE**: the same write's **contract** half is KC-2/Y2 at F0 → G-W2-6; this row books the **POSTURE** | repair round 4 |
| **20** | **KF-KE-58 · C-m7** ⟨kf-KeyframesEditor:103⟩ | three async engine calls **opt out of the closure's own `withErrorToastAsync` contract** (`:45`, `:210`, `:280`); no `app.config.errorHandler`. **Reachability honestly UNPROVEN; the asymmetry is the row.** With Apply inert (KF-KE-4), an unhandled rejection here can be a user's only signal | **absence-of-posture over an engine-bearing path** — `withErrorToastAsync` is the house idiom this register books as positive row **★ S-7**, and the three calls are ENGINE calls that reach the grammar through `loadAnimationEngine` | **KFED-UNIT** (the bank's disposition, carried; reachability UNPROVEN carried verbatim; **no cure moved, no re-grade**). Precedent recorded at the row: **row 10** books the identical shape — *"absence-of-posture → NO-WAVE-OWNER; reachability → KF.W3"*. **An unproven reachability does not disqualify an absence-of-posture row; it SPLITS it** | repair round 6 (PASS-6 D-4 · escape E3) |

### §1a · The two footnotes that are part of the assertion, not decoration

1. **Posture 1 is UNREACHABLE on the R1 class.** `adapter.ts:219-226`'s absorb arm is written
   `result.ok ? {ast, issues:[]} : {ast:[], issues:result.diagnostics}` — but **`parseStylesheet`
   throws before returning** on a stylesheet containing `color: oklch()` (the nested form; re-executed
   at F0). **The library's most defensive posture never runs on precisely the input it exists for.**
   *A registry that lists ABSORB without this footnote is a registry that lies.*
2. **The positive rows at §2 are reference rows, OUTSIDE the count.** Counting an exemplar would
   inflate the number the gate depends on.

---

## §2 · POSITIVE POSTURE ROWS — reference only, **NOT** counted in the floor

*A registry of twenty absences with no exemplar of the present tense teaches nothing.* Six rows, at
the bank's own dispositions — **superlatives, not defects; no cure, no owner change.**

| ★ | banked id ⟨record:line⟩ | what it exemplifies | why it is carried |
|---|---|---|---|
| **1** | **★ S-7** ⟨kf-SpringPhysicsFacet:107⟩ | *"**every user-driven parse below the facet runs through `withErrorToastAsync` with Retry**; the single exception is machine-fed"* (`useKeyframeOps.ts:25-40`) | the house idiom, already in the tree — named by kf-KeyframesStringControls **D-6** as *"the house idiom sits unused in the same closure"*. **Its own stated exception (SPF-19/20) rides the row as its qualifier** and is not separately booked: the facet's one boundary-free parse call is machine-fed and its cure folds into SPF-20 → KFED-UNIT |
| **2** | **SUP-3 (L axis)** ⟨kf-ChannelControls:121⟩ | *"`trySetOption` **catches BY ERROR NAME and re-throws everything else** while the store still records the raw string — **the best consumption of a fail-explicit engine API in the repo**, against lane-library §7.5's five inconsistent postures"* (re-read at `ChannelOptions.vue:461-477`) | the corpus's **only** cell measured directly against §7.5, this registry's own governing authority; the only banked exemplar of *correct* consumption of a fail-explicit **engine** API. The `proof:bezier-*` limb at that file is routed elsewhere and **no limb of it is taken here** |
| **3** | **S-5 / C-S5** ⟨kf-KeyframesEditor:147⟩ | **the corpus's only positive posture over a typed value.js `ParseIssue`**: *"the typed `ParseIssue` surfaced verbatim, stable per-index toast id, explicit dismiss, whole-selector replacement — **the reference implementation** of the write `:43` should have made, asking the wrong parser (KF-KE-3)"* | its irony is load-bearing for **G-W2-6**: the corpus's best error posture sits on top of the corpus's wrong entry point — the posture is right and the **grammar** is wrong, exactly the pair the entry-point contract exists to separate |
| **4** | **SUP-D** ⟨kf-RibbonBar:109⟩ | **the refusal-surfaced-verbatim twin, on the same `compileToCSS` seam as row 18**: *"the Export CSS comment is TRUE and guards the most dangerous action … fully discharged by its tail (`compileToCSS` + verbatim CC-3 refusal surfacing) … **the ONLY handler whose entire tail sits in try/catch, and the only ribbon-reachable path into value.js's throwing serializer**"* | the exact positive counterpart of row 18 — one seam, both postures, banked in two records. **The three stale claims in that file are NOT this wave's** |
| **5** | **Z4 · superlative 11** ⟨kf-EasingScene:135⟩ | **the single-funnel exemplar over the Result API**: *"`timingCurveUtils`' single `requireEasing` funnel over the Result API (three named helpers, source-tagged throws; glass-ui's bundle converged on the identical shape independently) — with the banked **KF-ET-28** posture note (**the funnel throws where the render path needed degrade**)"* | **the one positive row that carries its own negative.** Row 3 is the right posture on the wrong grammar; **Z4 is the right SHAPE with the wrong DISPOSITION.** A façade that collapses twenty-one call sites into one funnel inherits this cell's virtue **and its failure mode in the same act** — which is why it is a reference row and not a decoration |
| **6** | **kf-KeyframesEditor ruling 9** ⟨kf-KeyframesEditor:153⟩ | *"**The engine's selector guard (`frame-compiler.ts:135-168`)** — **fail-explicit, total, correctly frozen; what makes KF-KE-2 a consumer defect, not a library one.**"* | load-bearing in three directions: **(i)** M-25 depth — without it **row 19** reads as a LIBRARY posture in a register whose whole subject is where library and consumer meet; **(ii)** a positive posture over a parse path **at a module this wave's §Bounds owns** (`src/animation/compile/frame/compiler.ts`, modify-carve — *"`:146` calls kf's own `parseKeyframeSelector` — the façade's first natural consumer"*); **(iii)** it corroborates **G-W2-6**'s frozen-parse clause from the **library** side — *correctly frozen* is the same invariant `value4-immutable-resolve.test.ts` pins at `:43`/`:67`/`:84` |

---

## §3 · CARRIAGE (LAW B) — the completeness statement, cited, never asserted here

**The clause this registry obeys**, from G-W2-1: *the completeness statement lives in the freshest
conformance census artifact, cited by path … when a later pass supersedes that artifact the citation
is **RE-POINTED**; the claim is never re-asserted in this file's voice.*

**Cited, with its defects, exactly as the gate names it** —
`docs/tranches/X/keyframes/conformance/PASS-5/KF-W2-CHECK.md` **§2 / §2a** (2026-08-28):

> **86 routed · 77 booked · 9 escaped · 16 defects (7 MAJOR)** — the nine escapes named **E1–E9**, of
> which **one (`KF-ES-13 · L-i2`) is a failure-posture cell in this registry's subject matter** and is
> **excluded on the stated ground written at §Excluded** (the seed end of the producer defect already
> booked at **row 17**), the floor accordingly unchanged at **19** at that pass.

**The artifact's own verdict on the register is carried, not softened**: three of its nine escapes and
two of its MAJORs refute sentences **repair round 4 itself wrote**, and its span finding (D-3)
convicts a round-4 cure of moving an error into the load-bearing direction.

**RE-POINTED by this seat, per the clause's own standing instruction** — a deferral that points one
pass behind is hollow. Measured at the bytes this seat:

| artifact | census reading | defects | what it did to this registry |
|---|---|---|---|
| `PASS-6/KF-W2-CHECK.md` §2 / §2a (the freshest **per-wave** census) | **92 routed · 86 accounted · 6 escaped** (E1–E6) | **13** (5 MAJOR · 8 MINOR) | **E3 → floor row 20** (`KF-KE-58`, D-4) · **E2 → positive row 6** (kf-KeyframesEditor ruling 9, D-3) · E1/E4/E5/E6 dispositioned at round 6 without rows. Its §2b mechanism finding is quoted at §4 below |
| `PASS-7/CHECK.md` §1 (whole-corpus, seventh independent enumeration) | 2,632 candidate rows over **all 58**, all 58 yielding; 730 booked directly; **28 residual candidates adjudicated individually → 28 of 28 LAWFUL**; **HARD ESCAPES 0** | — | **`censusEscapes = 0`**, reported *"per LAW B … **this seat's dated measurement, never as a closure of the class**"* |
| `PASS-8/CHECK.md` §1 (whole-corpus, eighth independent enumeration) | 2,633 candidate rows over **all 58**, **zero** zero-yield records; 713 booked directly; 20 residual candidates adjudicated individually; record-attribution sweep — **uncited records: none** | — | **`censusEscapes = 0`**, same LAW-B framing |

**Dated predecessors retained, not deleted** (the citation is re-pointed; the history is kept):
`PASS-4` — *77 routed · 70 booked · 7 escaped*, named **Z1–Z7**, one of them a posture (row 19), 17
defects (9 MAJOR). `PASS-3` — *70 routed · 62 booked · 8 escaped*, named **Y1–Y8**, two of them
postures (rows 17–18).

**Nothing in this section is a closure claim by this file.** It is a citation of four dated
measurements, three of which say so about themselves.

---

## §4 · COUNT DISCIPLINE, AND THE ONE DRIFT THIS SEAT RESOLVED AT THE TRUE BYTES

**The discipline, carried from G-W2-1 and honoured by the instrument at §5:**

- **20 is a FLOOR under a reading-established enumeration, not a target.** A **twenty-first** banked
  posture found later is **ADDED and named in the same commit**, never absorbed silently.
- **The gate reds on an *unenumerated* posture, never on the arithmetic.**
- **The gate reds if the stated basis is smaller than the corpus.** Stated basis: **58 of 58**
  (§5), measured, not inherited.
- **The gate reds if any exclusion rests on a token-match alone.** No exclusion in this file rests on
  a token match. Every non-carry at §5 states what the cell **claims**, read at the corpus bytes.
- **The gate reds if any record is dispositioned at the RECORD level rather than cell by cell** —
  *adoption from a record does not discharge the record.* §5 disposes **cells**, and names them.

**The failure this discipline is made of, in its own register's words** (five recurrences, five
different levels): the charter's **5** → the drafting seat's **8** → round 1's **11** over 37 records
(basis) → round 2's **16** over the 58 with the basis named (instrument: exclusions by
`grep -cE 'KF\.?W2\b'`) → round 3's **18** (re-entry: *the records it was already inside*) → round 5's
**19**, and then `PASS-6` §2b named the sixth mechanism and it was **SCOPE**:

> *"Round 5 named the missing thing precisely — 'the missing thing was never a cell; it was a
> **relation**' — wrote a counting rule that enumerates **48 records**, and applied it to **7**. The
> relation exists; the sweep does not."*

**This file answers that finding directly: the sweep at §5 runs over all 58.**

### §4.1 · DRIFT RESOLVED — INTENT at the true bytes, recorded (METHOD; D-19)

The unit brief this seat was dispatched with states a **FLOOR of 19** and **five** positive reference
rows. So do **G-W2-1**'s assertion line and its second footnote. **Both are round-5 text.** At the
spec's current bytes the register itself has moved twice since:

| where | text at the true bytes | round |
|---|---|---|
| §Carry **F3** tail | *"**The registry's floor is therefore 20** ⟨18 → 19 at repair round 4; **19 → 20 at repair round 6** (PASS-6 D-4 · escape E3 — `KF-KE-58` booked as row 20)⟩"* | 6 |
| §Carry **F3** positive block | **six** bullets — the sixth, ⟨kf-KeyframesEditor ruling 9, `:153`⟩, *"added at repair round 6, PASS-6 D-3 · escape E2"* | 6 |
| §Gates **G-W2-1** assertion | *"a **FLOOR of 19** today"* | 5 |
| §Gates **G-W2-1** footnote | *"the **five positive rows** … are recorded as **reference rows, outside the count**"* | 5 |
| §Gates **G-W2-1** carriage | *"the floor accordingly unchanged at **19**"* (PASS-5 sentence) | 5 |

**Resolution adopted, and it is the only one available under the register's own laws**: *the spec
governs, and within it the latest repair round governs.* Round 6 **added** row 20 and positive row 6
by banked id with their check-defect provenance stated; G-W2-1's round-5 sentences were not re-read
when it did — the very *"the row was added and the sentence it falsifies was not re-read"* failure the
register convicted itself of at round 4 over KAD-10, reproduced once more at the gate line.
**Published here: floor 20, positive rows 6.** G-W2-1's count discipline is satisfied in the
direction it cares about — *the gate reds on an unenumerated posture, never on the arithmetic* — and a
registry publishing 19 while F3 enumerates 20 would red that gate by construction.

**No spec byte is edited by this act** (E-3). This is a dated record of the drift, beside the
authority, and it is reported as a residual of `KF.W2.a` at `docs/tranches/X/execution/B/KF-W2.md`.

---

## §5 · THE BASIS — the 58-record corpus, read CELL BY CELL

**Measured, not inherited**:

```
$ ls docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l    → 58
```

**Instrument (stated so a later pass can falsify it by construction).** Every record's roster cells,
ruled-disagreement rows, killed-claims rows, superlative rows and routing summaries were extracted
mechanically (`grep -n '^- \*\*\|^| \*\*'` over each record, all 58 yielding) and **read**. Any cell
whose text touched the register's subject vocabulary — a value.js entry or subpath, a parse/serialize
call, a throw/catch/swallow, a console-only failure, a toast/boundary/error-surface, an easing entry,
a posture word — was printed and read **in full**; every other cell was read at its **claim head**,
which is where a roster cell states its subject. **A cell was excluded only after its CLAIM was read**
— no exclusion below rests on a token match, and every non-carry names the thing the cell actually
claims. Where a record's cells were adjudicated at multiple levels (roster + rulings + kills +
superlatives), each level was read; **no record is dispositioned as a whole.**

**Legend** — `FLOOR n` = booked at §1 row *n* · `POS n` = carried at §2 as positive row *n* ·
`NEG` = a banked R1/parse-surface **negative**, already enumerated in the register's boundary set
(F0) · `CENSUS` = a value.js-bearing cell whose subject is an **ingress/measurement/contract fact**,
dispositioned in `INGRESS-CENSUS.md` · `OUT` = read, and out of the register's practised subject,
with the ground stated.

| # | record | posture-shaped cells read, and their disposition |
|--:|---|---|
| 1 | kf-AmigaScene | `S+2 / superlative 6` ⟨:150⟩ → **NEG** (*"amiga is the negative exemplar (zero exposure); the R1 row itself stays owned by KF.W3"*). `C-1` = the F-1/SCH-1 phantom-dependency census cell — a **substrate/manifest** claim, no parse path. **No cell claims a failure posture over a value.js-bearing path.** |
| 2 | kf-AnimatedText | `C-10` ⟨:105⟩ → **NEG** (*"the R1 crash-class exposure delta of adopting `splitText` is exactly zero"*; one value.js edge, 1,110-byte artifact, zero import specifiers). `KF-AT-15` claims an **unvalidated numeric PROP** (`cycleMs`) degrading to silent IACVT — the guard absent is a prop guard; **no value.js Result is in the path** → **OUT**. `KF-AT-12/-14/-16/-28` claim type/idiom/motion defects → **OUT**. |
| 3 | kf-AnimationControlsGroup | `SUP-1/2/3` ⟨:106⟩ → **NEG** (*"the 1.1 KB `value.js/math` leaf … **the direct cause of the R1-unreachable verified negative**"*), carried with **M-11**'s scope correction (the runtime `RAFPlayback` edge one hop out). `M-1` claims suppressed native activation (input) → **OUT**. |
| 4 | kf-AnimationVisualizer | `SUP-7` ⟨:124⟩ → **NEG** (*"parser-free subpath (no R1 crash class in this call graph)"*). `KF-AV-8 · L·M-5 = C-3` ⟨:49⟩ claims a **graph-entry** fact — the lone deep `@src` import whose target is *"value.js-bearing, parser-touching, and side-effectful at module eval"* → **CENSUS** (PASS-6 escape **E5**, dispositioned at round 6; a link, never a Result unwrap). `KF-AV-28` ⟨:35⟩ = the standing supersession rider (F6 #28) → **OUT**. |
| 5 | kf-App | `KF-APP-56` ⟨:111⟩ → **NEG** (F6 #3 — *"the boot graph is OUT"*). `KF-APP-3` ⟨:43⟩ (*"No error state exists demo-wide — 0 grep hits … `scenes.ts:118-123` swallows the warm rejection citing a `<Suspense>` receiver that does not exist"*) and `KF-APP-11` ⟨:56⟩ (*"`warmKfEngine().catch(() => undefined)` + `.finally(mount)` … a rejected engine load is memoised"*) **are failure postures, and their path is the async CHUNK-LOAD / engine-warm boot** — the same record's own `KF-APP-56` establishes that the **value.js parse surface is not on that graph**. → **OUT**, on the record's own affirmative negative, not on absence of a token. `KF-APP-4` = the vue-tsc/`noUnusedLocals` gate identity (F6 #22) → **OUT**. |
| 6 | kf-App.skeleton | `KF-SKEL-5` (GPU/chunk posture) · `KF-SKEL-16` (skeleton geometry, cites THP:17-18) — no value.js edge is claimed by any cell → **OUT**. |
| 7 | kf-CSSCodeEditor | `KF-CE-12` (R1 ingress arm only) ⟨:46⟩ → **CENSUS** (F6 #2; `:116` = the **fuzz entry of record**; the arm-split lock is a hard lock and the other arms are W8's/W4's). `KF-CE-7` / `KF-CE-9` claim the **prettier no-error-path** — **one mechanism with FLOOR 11**, and kf-KeyframesStringControls' own ruling forbids double-weighting (*"already banked at KF-CE-7 and may not be double-weighted here"*) → **booked once, at row 11**. `KF-CE-38` books a wiring/rate + prose-truth defect whose posture half rides that same identity → **booked once, at row 11**. `KF-CE-16 ≡ KF-APP-4` ⟨:50⟩ = the gate-topology identity (F6 #22) → **OUT**. `KF-CE-13` claims forced-colors → **OUT** (KF.W9). |
| 8 | kf-CSSPasteDialog | `R-4` ⟨:42⟩ → **FLOOR 6**. `C-4` ⟨:76⟩ → **NEG** (F6 #11, *"Cleared — do not re-file"*). `R-17` = the fold target of FLOOR 14's whitespace-submit arm → **booked once, at row 14's parent**. |
| 9 | kf-ChannelControls | `SUP-3 (L axis)` ⟨:121⟩ → **POS 2**. `C's L-1` ⟨:126⟩ → **NEG** (F6 #17). `D-5` claims a GPU/chunk posture → **OUT**. |
| 10 | kf-ChannelOptions | `KF-CO-48` ⟨:205⟩ → **FLOOR 18**. `C·S-4` ⟨:126⟩ → **CENSUS** (F6 #7, the non-string third shape, generalised by the F0 matrix). `ruling 3` ⟨:105⟩ → **CENSUS** (Z6). `ruling 5` ⟨:215⟩ → **CENSUS** (Z7, with its do-not-chase lock). `KF-CO-10` → dispositioned at §Excluded with a written read reason (OPTIONS-UNIT; LAW F(1) shadow recorded) → **OUT**. `L·B-4 = KF-CO-4` ⟨:48⟩ claims *"a curve authored in the Keyframes pane is silently rewritten"* — root is **the store's two representations of one curve with no reconciler**, disposition **OPTIONS-UNIT**; no value.js Result is unwrapped at the site → **OUT**. `L·I-2` ⟨:99⟩ is an INFO-tail crumb (*"unguarded `String(key)` → `\"null\"` reaches the TypeError thrower"*) on kf's own option path → **OUT**. |
| 11 | kf-ChromeDock | dock/pointer/keyboard/propagation cells throughout; **no cell claims a value.js edge** → **OUT**. |
| 12 | kf-ControlsPaneWrapper | `S-9 (RR-2)` ⟨:121⟩ → **NEG** (X1: *"100% `import type` … the parser blast radius has no entry point in this component's import closure"*). `RR-1` claims a PRM/motion posture → **OUT**. |
| 13 | kf-CopyButton | `KF-CB-33` ⟨:81⟩ = the **organ lock** (F6 #18) → **CENSUS**. `KF-CB-1 · EE-01` ⟨:40⟩ (*"`timingFunction: \"bounceInEase\"` resolves to nothing under value.js 4.0.0; the ctor throws inside the uncaught async `onMounted`"*) → **CENSUS** as **Y7**, at the register's own adoption, with **all three qualifiers**: TRUE at the audited bytes and **ALREADY CURED at the ref of record** (frontier `:42` = `"easeInBounce"`), identity **EE-01** → KF.W0, and the surviving phantom trail → KF-CB-18/KF.W4. A seat re-filing it as live work is in breach of the record. `KF-CB-16` (two constant keyframe strings re-parsed per instance, unmemoized) and `KF-CB-24` (`"steps"` fails CSS Easing L1 parse) → **CENSUS**. `KF-CB-2/-5/-6/-14` are fold destinations for kf-StartingStyleTarget → **OUT**. |
| 14 | kf-CubeAxisLines | `C·§4` ⟨:108⟩ → **NEG** (F6 #9). Remaining cells claim geometry/token defects → **OUT**. |
| 15 | kf-CubeScene | `C-L-2 residual` ⟨:170⟩ → **CENSUS** (F0's OPEN PARSER-LANE QUESTION, partly answered by the F0 matrix; **no id minted**). `C-11` (`easeInBounce`, the only `@mkbabb/value.js/easing` edge in the subtree) → **CENSUS**. `L-3` / `L-5` claim **matrix / `parseFloat` throws** — the thrower is kf's own scene code → **OUT**. `L-2/C-5` = the `isPlaying` shadow family → **OUT**. |
| 16 | kf-CubeTarget | `#11` ⟨:76⟩ → **NEG** (F6 #16). `#3` claims a rAF throw whose thrower is kf's own → **OUT**. |
| 17 | kf-DemoGlobalChrome | `C-10` ⟨:77⟩ → **NEG** (*"zero value.js/engine edges; R1 reachability CLEAN … recorded so parser waves skip this file"*), with the mechanism named: the only neighbourhood edge is the parent's `@mkbabb/value.js/math`, **and `/math` is not the parse surface** — *"the negative is topological, not probabilistic."* |
| 18 | kf-EasingScene | `KF-ES-3 · C-8` ⟨:42; ruled :29⟩ → **FLOOR 17**. `Z4 · superlative 11` ⟨:135⟩ → **POS 5**. `SUP-2` ⟨:131⟩ → **OUT** (PASS-6 escape **E6**, dispositioned at round 6 on the register's own kf-EditorStartScreen rule: *a correct-consumption positive over a subpath edge is not a posture*). `KF-ES-13 · L-i2` → **OUT** (PASS-5 escape **E1**, excluded on the stated §Excluded ground: **the seed end of the producer defect already booked at row 17**). `KF-ES-12(b)` carries the remount mechanism as a rider — component-primary booking is kf-TimingFunctionPanel's `KF-TFP-1`, an interaction defect → **OUT**. `KF-ES-6` (rebuild-fallback wrong-seed) is the class sibling of `KF-TFP-2` → **OUT**. `KF-ES-22` (glass-ui's `JumpTerm` imported FROM value.js; type-only, inert casts) → **CENSUS**. |
| 19 | kf-EasingSidebar | the record's executed easing probes (`easing("smooth-step-3")` → ok and IS Hermite smoothstep; `bezierPresets["smooth-step-3"]` deviating max **0.111014** at t=0.35; `steppedEase(1,"jump-none")` → `step_count_invalid`; **19 of 30** quads failing 2-dp round-trip, max Δ **0.005**) → **CENSUS** (the easing organ). The `steps: 1` seed at `:106-110` is the **demo half of FLOOR 17's ruled mechanism**, carried there and **not re-booked**. |
| 20 | kf-EasingTarget | `KF-ET-28 · D-3 = C-6` ⟨:70⟩ → **FLOOR 16**. `KF-ET-2` ⟨:41⟩ → **CENSUS** (the name-branch failure measurement; its cure-lock is a lock **ON** `KF-ET-1`). `KF-ET-1` ⟨:37⟩ → **CENSUS** (PASS-6 escape **E1**, named at the engaged row at round 6): a **serializer-precision** defect plus the **value.js lossless-serializer rider** — a contract ask at the seam G-W2-6 publishes, not a failure-handling posture. `Z5 · superlative 12` ⟨:119⟩ → **CENSUS** (four `easing_name_unknown` readings; the guard `timingCurveUtils.ts:43-44` is *"what keeps three of 28 specimens from taking the scene down at render"*). `KF-ET-32` (the 41.6 KB `/css` module in the static graph for two frozen tables — **link, not call**) → **CENSUS**. `KF-ET-6` = the KF.W4 catalogue lock → **OUT**. |
| 21 | kf-EditorHeader | `C S-A` ⟨:95⟩ → **NEG** (X2: *"proving a negative: the full import-closure walk that DECLINED an R1 parser-crash claim"*). |
| 22 | kf-EditorShell | `C-19` ⟨:77⟩ → **CENSUS** (F6 #4 — the `color-mix()` token-idiom rider; **(ii)** names `useSquareTumble.ts:22` into the census **by name**); its `RR-2` is CONFIRMED at F0. `S-8` (*"conduit, not originator"*) is the record's own boundary statement → **OUT**. |
| 23 | kf-EditorStartScreen | `S-C2` ⟨:113⟩ → **NEG** (*"the one string that crosses into value.js was **EXECUTED** against the installed 4.0.0, not reasoned about"* — the method precedent this wave's F0 follows). `KF-EST-17` claims the engine-warm/boot class (identity at kf-App) → **OUT**. `KF-EST-18`/`-22`/`-5` claim contract-validation, ref-permutation and shadow-tick defects → **OUT**. This record is also the source of the rule applied at row 18's E6 disposition. |
| 24 | kf-HeroAurora | `KF-HA-19` ⟨:66⟩ → **CENSUS** (F6 #6 — **CONFIRMED IN MEASUREMENT and REFUTED IN CONCLUSION**; its probe set is the well-formed one). `KF-HA-13` ⟨:55⟩ → **CENSUS** as **Y3**, at the register's own round-3 adoption: *"`resolveAtoms` runs unguarded at `<script setup>` top level and **glass-ui's bridge converts value.js DIAGNOSTICS to throws** … one token-ising edit from a **white-screened home route with no error handler anywhere**"*, cure **KF.W6**, bridge posture **producer-domain → the glass relay**, *"this wave takes the census datum only."* **TENSION RECORDED, NOT RE-BOOKED**: this cell and FLOOR 17 share a shape — a producer bridge converting a spec-correct value.js Result into a throw, unguarded at the consumer. The register dispositioned Y3 into **F0** deliberately (it is load-bearing there for C-19's diagnostic-surface ruling) and three subsequent passes let that stand; **it is enumerated by banked id, so it is not an escape.** Whether its home is F0 or F3 is a register-SHAPE question, forwarded at §7 for the next check — not a row this seat mints. `KF-HA-15` (no error handler anywhere) is Y3's own compounding limb → carried with it. |
| 25 | kf-KeyboardShortcutsModal | `C-§1 / R-B` ⟨:78⟩ → **NEG** (*"CLEARED — the R1 crash class is not on this component's graph … **Do not re-file.**"*). `R-7` claims a prose/manifest gate (the dead `proof:font-census` witness) → **OUT**. |
| 26 | kf-KeyframeCard | `KF-KC-53` ⟨:101⟩ → **NEG** (F6 #13). `KF-KC-17 · L-7` ⟨:59⟩ → **CENSUS** as **Z3**, homed at G-W2-5's third clause: *"the keydown pass-through injects U+00A0 into CSS and bypasses the card's only model channel … the next real keystroke hands 4×NBSP (not CSS whitespace) to `parseAnimationCSS` via ops:111."* **Its corrected mechanism is why it is not a posture**: value.js's `/\s/` **matches** U+00A0 (kf-KeyframesAddDialog `K-11`, re-verified at the bank, do-not-re-derive lock), so the parse **succeeds** and the defect is the **bypassed model channel**, not a failure the consumer mishandles. **Never merged with the negative.** |
| 27 | kf-KeyframeCardList | `KC-2` ⟨:34⟩ → **CENSUS** as **Y2**: an entry-point **CONTRACT** fact (value.js 4.0.0's **frozen parse boundary** — *"which is exactly why KC-2 is a loud TypeError instead of silent corruption"*), booked at **G-W2-6**; its **posture** twin is **FLOOR 19** at kf-KeyframesEditor. *Nothing is counted twice: the write is one, the registers are two, the subjects are disjoint.* `the S-C R1 note` ⟨:122⟩ → **NEG** (F6 #8, qualified: *this line no longer stands for the whole record*). `KC-1` = the `selectorText` cure-citation correction (→ KF.W8/`MISS-β2`) → **OUT**. |
| 28 | kf-KeyframeTimeline | `C-7` ⟨:48⟩ → **FLOOR 8** (and F6 #1, and the §F-2 falsifier). `L-11` ⟨:72⟩ → **FLOOR 13**. `D-15` ⟨:59⟩ → **FLOOR 14**. `L-6/C-4` ⟨:47⟩ claims a hand-rolled declaration **parser AND emitter** — a **BYPASS**, not a posture → F4 + **G-W2-7**. `C-13` (`clamp` from `/math` at five sites) and `C-12` (`@src` deep imports → KF.W8) → **CENSUS** / **OUT**. `C-15` = the producer seam → **OUT**. |
| 29 | kf-KeyframesAddDialog | `KAD-9` ⟨:53⟩ → **FLOOR 7**. `KAD-10` ⟨:54⟩ → **FLOOR 15**. `K-5` ⟨:91⟩ → **NEG** (F6 #12, *"CONTAINED … Cleared — do not re-file"*). `K-11` ⟨:107⟩ → **CENSUS** (the cited refuting datum at G-W2-5; dispositioned at round 5 **without a row**; do-not-re-derive lock). |
| 30 | kf-KeyframesEditor | `KF-KE-2` ⟨:41⟩ → **FLOOR 19**. `KF-KE-58` ⟨:103⟩ → **FLOOR 20**. `ruling 9` ⟨:153⟩ → **POS 6**. `S-5/C-S5` ⟨:147⟩ → **POS 3**. `ruling 8` ⟨:152⟩ → **OUT** (PASS-6 escape **E4**, dispositioned at round 6: the bank's **concurring** reading of `parseAnimationCSS`'s kept invariant — *"why KF-KE-58 is an asymmetry rather than a missing posture"*, i.e. the qualifier on row 20, not a row). `KF-KE-3` ⟨:42⟩ → **CENSUS** (F6 #20 + **G-W2-6**, the wrong entry point). `KF-KE-46` ⟨:91⟩ → **CENSUS** (F6 #21). `KF-KE-54` ⟨:99⟩ → **CENSUS** (F6 #19 — *"the gate guarding the façade must not be `src/`-scoped"*, which is **G-W2-2b**'s whole existence). `KF-KE-37` claims the **durability/locality of an EXISTING** posture, not an absent or wrong one → **OUT**. `KF-KE-51` claims the engine-warm/boot class (identity at kf-App) → **OUT**. `KF-KE-34`/`KF-KE-17`/`KF-KE-4` are cure-partner/sequencing/stakes cells → **OUT**. |
| 31 | kf-KeyframesStringControls | `C-2` ⟨:63; row head `:62`⟩ → **FLOOR 10**. `D-6 / L-BL-3 / C-1` ⟨:60⟩ → **FLOOR 11**. `L-M-6` / `C-15` claim the engine-warm/boot class → **OUT**. `D-19` claims the **durability/locality of an existing** posture → **OUT**. The record's own ruling (*"already banked at KF-CE-7 and may not be double-weighted here"*) is what keeps kf-CSSCodeEditor's pair from double-booking. |
| 32 | kf-KfPillTabs | `C:C-1` = the R-6 limb-manifest row 8 (KF.W4); no cell claims a value.js parse edge → **OUT**. |
| 33 | kf-LayerConfigPanel | `LP-24` ⟨:79⟩ → **NEG** (F6 #14, dev-graph exposure only). `LP-21/-22/-23` → OPTIONS-UNIT design cells → **OUT**. |
| 34 | kf-MatrixEditor | `superlative 7` ⟨:139⟩ → **NEG** (X3: *"The value.js edge is type-only and R1-clean … no parser entered"*). `ME-1` / `ME-23` claim matrix/`parseFloat` throws — thrower is kf's own → **OUT**. `ME-22` = FOLD ≡ kf-CubeScene L-9 → **OUT**. |
| 35 | kf-MbabbMenu | `MM-37` ⟨:93⟩ → **NEG** (F6 #15, bundle-graph presence, no reachable path). `MM-9` claims a manifest/prose gate → **OUT**. |
| 36 | kf-OrbitalDrag | `superlative 3 / C S★1` ⟨:132⟩ → **NEG** (*"a 1,110-byte zero-import leaf making the R1 crash class **unreachable by module topology** while a sibling scene took the exposed edge"*). `MISS-6` is a **killed-claims** id (kills do not book) → **OUT**. |
| 37 | kf-PlaybackRibbon | `C-negative (upheld)` ⟨:88⟩ → **NEG** (X4: *"the value.js R1 parser-crash class is NOT reachable from this component's scrub path … **Negative recorded so it is never re-litigated.**"*). `D-10` is a contrast fold target → **OUT**. |
| 38 | kf-RibbonBar | `SUP-D` ⟨:109⟩ → **POS 4**. `RB-1` claims the forced-colors focus family → **OUT**. |
| 39 | kf-SequenceAxis | `D-4` claims the multi-consumer token idiom; no cell claims a value.js edge → **OUT**. |
| 40 | kf-SequencePlayhead | `superlative 7` ⟨:121⟩ → **NEG** (X5). `D-15` = the RTL-posture precedent → **OUT**. `K-28` is a killed-claims id → **OUT**. |
| 41 | kf-SequenceScene | `superlative 4` ⟨:119⟩ → **NEG** (X6: *"R1 is structurally unreachable — four imports, all `clamp` from `/math` … **Package-enforced, not discipline-enforced**"*). `C-10` claims the engine-warm class and says so itself — *"Fold-noted to kf-App's surface; no local cure"* → **OUT**. |
| 42 | kf-SequenceScrubber | `KF-AV-28`'s third bank ⟨:36⟩ = the supersession rider (F6 #28) → **OUT**; no other cell claims a value.js edge. |
| 43 | kf-SequenceTarget | target/transform/motion cells; **no cell claims a value.js parse edge** → **OUT**. |
| 44 | kf-SharePopover | `SP-18` claims **bundle-graph exposure, not reachability** → **OUT**. |
| 45 | kf-SpringHeatmap | `superlative 7` ⟨:101⟩ → **NEG** (X7: *"one pure function (`clamp`) by exact subpath … `/css`/`/color` untouched, transitive reach verified absent"*). |
| 46 | kf-SpringPhysicsFacet | `★ S-7` ⟨:107⟩ → **POS 1** (and the F0 round-1 negative). `SPF-19` (*"the one parse call in the facet's reach with no error boundary"*, machine-fed; *"folds into SPF-20's cure → KFED-UNIT"*) is **the named exception INSIDE ★ S-7** — carried as the positive row's own qualifier and **booked once, there**, never as a second row. `SPF-1` = FOLD ≡ KF-CO-2 → **OUT**. |
| 47 | kf-SpringScene | scene/compile-artifact cells; **no cell claims a failure posture over a value.js Result** → **OUT**. |
| 48 | kf-SpringTarget | target/spring cells; **no cell claims a value.js parse edge** → **OUT**. |
| 49 | kf-SpringTrace | `D-12 = L-6 = C-4` ⟨:56⟩ → **FLOOR 9**. `S-A (C)` ⟨:108⟩ → **NEG** (X9: *"the R1 crash class is provably unreachable — the closure is value.js-free by construction (`sample.ts:16`), **proven by enumeration**"*), with the **N-2 trade note carried verbatim** (the N-2 route imports runtime `@mkbabb/value.js/easing`; R1 (`/css`) stays unreachable either way; **this register adopts X9 as an R1(`/css`) negative only** and takes no position on the N-2 route). `C-2 = L-3` ⟨:48⟩ = the serialize→regex-reparse class one layer out — **evidence, not a gated row** (F6 #23, with Y8's kill qualifier) → **OUT**. |
| 50 | kf-SquareInstrument | `K-6` ⟨:24/:100⟩ → **CENSUS** (F6 #5): the **empty-args probe** (*"the true R1 degenerate form"*, credit K-6's) **and** the reachability guard (*"which no token can produce (`getPropertyValue` → `\"\"` → the `if (value)` guard)"*). Its kill is a kill of exactly one claim — **R1-through-a-token** — and is read as a **pair** with kf-SquareScene's authored-CSS path, never merged. Remaining cells claim geometry/a11y/token defects → **OUT**. |
| 51 | kf-SquareScene | `C S-C / superlative 3` ⟨:132⟩ → the register's **F0 POSITIVE EXEMPLAR**, cited upward and consumed at **G-W2-3** rather than at a gate of its own (*"`parseCssScalar` at the two-writer boundary — the demo's best use of value.js and the counter-example to the library's own internal regex re-parsing"*), carried **whole, both halves**, with `L-10`'s unit-blindness riding it so the façade's scalar seam does not inherit the flaw it is praised for avoiding. **`D-27/L-7/C-9` ⟨:53, identity at `:125`⟩ → CENSUS/ANNOTATION, on the register's own written ground**: *"**CRASH-SURFACE ANNOTATION, not a new row** (KF-W2-CHECK D-6; anti-rename)"*, honouring the cell's **own identity lock** at `:125` — *"the R1 parser crash-class note inside D-27/L-7/C-9 ≡ the megatranche R1 identity (V·π parser program) — **annotated, never re-booked**."* Its two riders travel with it: `C-1` (the colour half is **dead paint** — user-visible stake zero, crash stake total) and `MISS-4` (`colorAt` re-parses two static colour strings per tumble frame — *"the per-frame parse is what moves the C-9 throw from a survivable init site into the loop-bricking frame path"*). `L-10` is **one mechanism** with the annotation's `num()` throw and is not separately booked. `MISS-3` is cited at §Excluded as **evidence, booked nowhere**. **Cure is the square packet's (KF.W11), not this wave's.** |
| 52 | kf-StartingStyleTarget | `KF-SST-36 · C-13` ⟨:80⟩ → **NEG** (X8: *"the R1 colour-parser class is unreachable here (opacity/transform only; `eligible: true` re-executed)"*; routing carried whole — the negative is the census's, the **KF.W3 scoping input** stays W3's). `KF-SST-12` claims `eligible`/`refusals` discarded + `void recompile()` unguarded → silent degrade to a mislabelled fallback — **the discarded Result is kf's own `entry.ts` refusal taxonomy** (9 reasons, `css: ""`), and the same record affirmatively books the R1 negative above; MINOR, NO-WAVE-OWNER, reachable path = an import rejection → **OUT**, forwarded at §7. `KF-SST-7/-8/-38/-39` are folds by reference to kf-CopyButton / kf-PlaybackRibbon → **OUT**. |
| 53 | kf-TimelineCaret | `L-15` ⟨:68⟩ → **FLOOR 12**. `MISS-β2` ⟨:46⟩ → **CENSUS** (F6 #27 + **G-W2-8** — three serializer copies, zero exported; the act is KF.W8's). `S-2` (*"the empty-input trap is closed … `parseFloat(… ?? \"\")` behind `!isNaN`"*) is a **correct guard over JavaScript's own `parseFloat`** — no value.js Result in the path → **OUT**. `S-3` (`clamp` from the published `/math` subpath at the trust boundary) → **CENSUS** (`/math` is not the parse surface). `C-1`'s kill relocated the float mechanism to `MISS-β2`, its true locus → **OUT**. |
| 54 | kf-TimelineHoverPreview | `S+3 / S-d` ⟨:112⟩ → **NEG** (*"**structural immunity to the R1 crash class by construction**"* — zero `@mkbabb` imports in the SFC). `D-7`/`MISSED-4`/`GHOST-PLATE` claim ghost-fidelity defects and name value.js's `decompose.ts` as a **cure input**, not a Result → **OUT**. |
| 55 | kf-TimelineTrack | `SUP-3` ⟨:130⟩ → **NEG** (F6 #10: *"the only path from a TimelineTrack emit into the value.js parser is wrapped with the `await` inside the `try` (`useTimelineBuild.ts:40-50`) … **recorded as a negative result so parser waves skip this file**"*). **TENSION RECORDED**: those same bytes are what **FLOOR 8** books at its consumer end — `useTimelineBuild.ts:47-50`'s `console.error` — i.e. the corpus calls one wrapper *containment* here and *the file's only silent failure* there. Both readings are true and are booked once each, by subject: **the negative is the track's topology; the posture is the timeline's handling.** Not re-booked. `RR-B missed-2` (a full engine construction **and CSS parse per pointermove**, no throttle/coalescing/dirty-check) → **CENSUS** (rate). `C-14` (*"imports zero keyframes.js symbols — and correctly so"*) → **OUT**. |
| 56 | kf-TimingFunctionPanel | `KF-TFP-20` ⟨:63⟩ → **CENSUS** (*"`kind` runs value.js's full timing-function grammar once per pointermove … a parser recovering a two-valued tag the handler already holds verbatim as `v.mode`"* — the census's **only live per-move grammar consumer**; registry-swept: *"KF-CO-10 and the R1 class are different mechanisms"*). `KF-TFP-18` → **CENSUS** (the 2-dp-lossy `cubicBezierToString` twin; fold-extension of **KF-ET-1**, dispositioned at round 5 without a row). `KF-TFP-24` (*"`cubicBezierEasing` throws a bare `Error`, unguarded, inside the per-pointermove handler; unreachable today only because the vendor clamps x∈[0,1] — **the invariant lives entirely in the vendor**"*) — **read at the ref of record: `cubicBezierEasing` is kf's OWN demo helper** (`demo/utils/reference-data/timingCurveUtils.ts:25`, imported at `TimingFunctionPanel.vue:55` from `@utils/reference-data/timingCurveUtils`), **not a value.js entry**; it unwraps no Result; INFO at both axes, and its cure *"dies with L-5's `v.fn` consumption in the seat spec"* → **OUT**. `KF-TFP-21`/`-27` claim the two-sided **option-setter** gap → **CENSUS** (KF.W5 riders). `KF-TFP-17` claims a `string`-collapse typechecking crumb → **OUT**. `C-3⟨TFP⟩` was dispositioned at round 5 without a row → **OUT**. |
| 57 | kf-TransportDock | transport/pointer/keyboard/propagation cells (TD-1..TD-41); **no cell claims a value.js edge** → **OUT**. |
| 58 | kf-TypingDots | `C's S★-3` ⟨:89⟩ → **NEG** (*"the one string crossing the package boundary **checked against the installed `@mkbabb/value.js@4.0.0` dist**"* — the second method precedent F0 follows). `KF-TD-3` claims an unvalidated **Vue prop** (`count`) → `RangeError` inside the LCP `<h1>` with no `errorHandler` — a render throw with **no value.js Result in the path** → **OUT**. `KF-TD-8` claims a `steps()` densify cost → **OUT**. |

**Basis stated**: **58 of 58 records read, cell by cell.** Zero records dispositioned at the record
level. Zero exclusions established by a token match.

---

## §6 · THE CANDIDATES THIS READING ADJUDICATED HARDEST

Recorded because a register that publishes only its carries is unfalsifiable. Each of these is
posture-**shaped** and each is **not** a floor row, on a ground read at the bytes:

1. **kf-SquareScene `D-27/L-7/C-9`** — five `throw` sites in the rAF frame, unguarded, reachable via
   `parseCssScalar("calc(1px + 2px)")` → ERR → `num()` throws, and the throw **bricks** the loop for
   the mount's lifetime. **Not booked**: the register already disposes it, cell-level and in writing,
   as a **CRASH-SURFACE ANNOTATION, not a new row** (KF-W2-CHECK D-6), honouring the cell's own
   identity lock *"annotated, never re-booked"*. Booking it here would re-book the megatranche R1
   identity the guard forbids.
2. **kf-HeroAurora `KF-HA-13`** — a producer bridge converting value.js **diagnostics** into throws,
   unguarded at a top-level `<script setup>`. **Not booked**: enumerated as **Y3** in the F0 census by
   the register's own round-3 adoption, where it is load-bearing for C-19's diagnostic-surface ruling.
   The shape-tension with FLOOR 17 is recorded at §5 and forwarded at §7.
3. **kf-App `KF-APP-3` / `KF-APP-11`** — a demo-wide absence of any error state and a memoised boot
   rejection. **Not booked**: the path is the async chunk-load / engine-warm boot, and the same
   record's `KF-APP-56` books the affirmative negative that the value.js parse surface is not on that
   graph.
4. **kf-StartingStyleTarget `KF-SST-12`** — `eligible`/`refusals` discarded, `void recompile()`
   unguarded, silent degrade to a mislabelled fallback. **Not booked**: the discarded Result is **kf's
   own `entry.ts` refusal taxonomy**; the record itself books the R1 negative for this component.
5. **kf-TimingFunctionPanel `KF-TFP-24`** — a bare `Error` thrown unguarded in a per-pointermove
   handler. **Not booked**: measured at the ref of record, `cubicBezierEasing` is kf's own demo helper
   (`demo/utils/reference-data/timingCurveUtils.ts:25`), not a value.js entry.
6. **kf-CSSCodeEditor `KF-CE-7`/`KF-CE-9`/`KF-CE-38`** — the prettier no-error-path. **Not booked
   twice**: one mechanism with **FLOOR 11**, and the sibling record's own ruling forbids
   double-weighting.
7. **kf-SpringPhysicsFacet `SPF-19`** — the one boundary-free parse call in the facet's reach. **Not
   booked twice**: it is the stated exception *inside* **POS 1**, and it is machine-fed.
8. **kf-TimelineCaret `S-2`** — a correct empty-input guard. **Not booked**: the parser guarded is
   JavaScript's `parseFloat`, not a value.js entry.

---

## §7 · RESIDUALS, forwarded — not spent here

- **R-1 · The floor/positive drift at G-W2-1's own lines** (§4.1). The gate's round-5 assertion,
  footnote and carriage sentence say **19 / five**; §Carry F3 says **20 / six** at round 6. This file
  publishes 20/6 and edits no spec byte (E-3). **For the next repair round or check to reconcile in
  the gate's own voice.**
- **R-2 · `KF-HA-13`'s register home.** F0 or F3? Its shape is FLOOR 17's. Enumerated either way, so
  it is not an escape — a shape question for the next check, raised here with its ground.
- **R-3 · `KF-SST-12`'s class.** If a later ruling widens the register's subject from *value.js
  Result* to *any parse-or-compile Result at a value.js-bearing consumer*, this cell and
  `KF-TFP-24`'s vendor-invariant arm enter together. This seat did **not** widen the subject.
- **R-4 · The `useTimelineBuild.ts:40-50` double reading** (§5 row 55) — containment at kf-TimelineTrack,
  *the file's only silent failure* at kf-KeyframeTimeline. Booked once each by subject; recorded so no
  later seat reads the pair as a contradiction and re-books either.

---

## §8 · SELF-COUNT RECEIPT (measured from these settled bytes, double-run)

Run from `docs/tranches/X/keyframes/registries/`, twice, identical output both times:

```
$ awk '/^## §2/{exit} /^\| \*\*[0-9]+\*\*/{n++} END{print n+0}' POSTURES.md              → 20
$ awk '/^## §2/{f=1} /^## §3/{exit} f && /^\| \*\*[0-9]+\*\*/{n++} END{print n+0}' POSTURES.md → 6
$ grep -c '^| [0-9]\{1,2\} | kf-' POSTURES.md                                            → 58
$ grep -o '^| [0-9]\{1,2\} | kf-[A-Za-z.]*' POSTURES.md | sed 's/.*| //' | sort -u | wc -l → 58
$ ls ../../../V/megatranche/registry/adjudicated/kf-*.md | wc -l                          → 58
```

**Floor: 20. Positive reference rows: 6, outside the count. Basis: 58 of 58.**
**No completeness claim is made in this file's voice** — see §3.
