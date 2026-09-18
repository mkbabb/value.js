SERVED MODEL: `claude-opus-5[1m]`

# KF.W7 RE-CLOSE — all fifteen gates, BEFORE → AFTER against BOTH baselines

**Unit**: X.KF.W7.`j` (resume group 4, the re-close seat) · **2026-09-18** · **VERIFY-ONLY — this
seat cured nothing, wrote zero keyframes.js bytes and zero glass-ui bytes.**

**Refs of record.** keyframes.js `master` ≡ `HEAD` ≡ **`1fa98a5d`** (`origin/master` **`41a7ebb6`**
at the read — four resume commits unpublished, pushed by this seat at §5); value.js `HEAD` ≡
**`fff145da`** at the read.

**Method.** Every AFTER reading is taken from `git show HEAD:<path>` in the keyframes.js tree, never
from the worktree — four tracks share this checkout. ONE script, **double-run**: ⟨cmd⟩
`diff run1 run2` → **no output — DOUBLE-RUN IDENTICAL**.

**TWO BEFOREs are published, because the resume has two.** **BEFORE-A** = this record's original
**Baseline**, banked READ-ONLY at kf `ae83da07` (fifteen RED, **0 GREEN-BEFORE-CURE**).
**BEFORE-B** = **§Resume baseline**, the three owed gates re-measured READ-ONLY at kf `41a7ebb6`
after KF.W6's 20 commits moved every owed anchor (G9 RED · G10 RED · G14·L-11 RED, double-run
identical, **0 GREEN-BEFORE-CURE**). The twelve gates `## Close` stamped GREEN carry no BEFORE-B
because the resume did not re-open them; they are re-read here at BEFORE-A and re-verdicted at the
settled bytes.

---

## §1 · The fifteen

| gate | BEFORE-A (`ae83da07`) | BEFORE-B (`41a7ebb6`) | **AFTER (`1fa98a5d`, this seat)** | the witness this seat measured |
|---|---|---|---|---|
| **G1** the evaluate verdict | RED | — | **GREEN** | six §Verdict rows in this record (`:514-519`) — KeyframeTimeline/TimelineTrack rail · TimelineCaret · TimelineHoverPreview · SequenceScrubber · AnimationVisualizer · the SpringTarget/SpringTrace idiom arms; `G1-VERDICT-TABLE.md` **432 L**, `KEEP-BESPOKE` ×**21**. Importable surface re-measured at the installed dist: `/timeline` `index.d.ts` **2 L**, that dir **9** files, `dist/timeline.js` `^export` → **1**, `SliderVariant = "standard" \| "spectrum"` (no `"timeline"`), demo imports of glass `/timeline` → **0** |
| **G2** scrub seam | RED | — | **GREEN** | `KeyframeTimeline.vue` `@update:scrub-t="scrub"` → **1** (the ENGINE, not a bare ref) and the destructured bare `scrub,` → **1**; `isPrimary\|pointerType` in `TimelineTrack.vue` → **2**; `createPreviewSubject` **2** in KT + **2** in the engine; the engine's `NEVER PAINTS THE SCENE` contract docblock → **1** |
| **G3** a grab is not a teleport | RED | — | **GREEN** | `grabDx` in `TimelineTrack.vue` → **4** |
| **G4** rebuild rate bounded | RED | — | **GREEN — and re-verified AFTER `.i`'s G14 cure, which is the trade `## Close` named in advance** | `scheduleRebuild` in `useTimelineOps.ts` → **7** (was 6; `.i` added the settlement's own return); the file's **only** `rebuild()` invocation is **`:66` `void rebuild().then(settle, settle)`, INSIDE the rAF latch**; latch guard `rebuildFrame !== null` → **1**; dirty check `next === kf.percent` → **1**. **Nothing was un-latched** |
| **G5** UI and artifact agree | RED | — | **GREEN** | `coalesceKeyframes` — declared in `timelineTypes.ts` (**1**), engine partition **3** hits, render partition **2** hits; the old `Merge vars into keyframe` loop → **0** (gone, not shadowed); both render `v-for`s over `stops` → **2** |
| **G6** round-trip | RED | — | **GREEN** | `authoredSelector` in THP → **4** (was 2 at `## Close`; `.g`/`.h` widened the same derivation); the `value !== "none"` drop filter in `snapshotCapture.ts` → **0**; `mergeCSS` reaches **3** modules |
| **G7** a read gesture writes nothing | RED | — | **GREEN** | `Math.round` in `TimelineCaret.vue` → **1 hit, and it is the docblock** (*"The MODEL's value, not an integer lie"*); **live `Math.round` → 0**, measured by excluding comment lines, not assumed; `openedWith` (the compare) → **3** |
| **G8** keyboard parity | RED | — | **GREEN** | `role="slider"` across the cluster → **9** (TT **7** · caret **2**), plus SequenceScrubber 1 / SequenceTarget 1 / SpringTarget 1 / SquareScene 4 outside the cluster; `onTrackKeydown` → **2** |
| **G9** the tooltip announces what it shows | RED | **RED** (re-measured: `TooltipContent` at `:193` carried no `:aria-label`; `describeKeyframe` **0 files**; `role="group"` **0**) | **GREEN** | `TimelineTrack.vue` `:aria-label="describeStop(stop)"` at the `TooltipContent` mount → **1**; `describeKeyframe` in `demo/` → **2 files** (was 0); `role="group"` → **1**; `aria-label` in TT → **6 lines enumerated whole** (`:10` prose · **`:16` group** · `:46` pan · `:114` rail · `:206` marker · **`:256` TooltipContent**); `aria-hidden="true"` → **2** (`:150` the tick band · `:223` the multi-member stop count); marker `@focus` → **1** and `@mouseenter` → **1** code hits (a second `@mouseenter` at `:185` is prose); `text-admin-label` in THP → **0**; THP `^export const` → **6** |
| **G10** no thumbnail outlives its keyframe | RED | **RED** (re-measured: write-once cache, no eviction, no retry ceiling, `scale(0.3) ${vars["transform"]}` at `:324`) | **GREEN** | `previews.delete` in `useTimelineBuild.ts` → **1** (inside `evictStalePreviews`); **live** `previewCache`/`previewLoading` anywhere in `demo/`+`test/` → **0** (the 2 surviving hits are the comment at `useTimelineBuild.ts:20-21` that convicts the old shape); **live** `return null` in the builder → **0** (the 1 hit is the `:201` comment); **live** `getGhostStyle`/`:ghost-style` → **0** (the 1 hit is `TimelineTrack.vue:434`'s comment); `scale(0.3) ${vars` as code → **0**; THP terminal bare `v-else` → **1** (`:68`); `Preview unavailable` → **2**; the reserved box `w-36 h-24` → **1**; `scrubAndCapture` typed `Promise<string>` → present |
| **G11** the cluster is mounted by a test at all | RED (leg (i) **0**) | — | **GREEN — with its leg-(i) denominator RE-READ, disclosed at §2** | the surface-naming probe over `test/` returns **exactly the four W7 fixtures and only those four**; `test/demo/instrument/` tracked → **16**, **0** filename collisions; the four fixtures + the two named read-only witnesses (`timeline-undo` · `resize-tracks`) → **71 passed / 71**, run **twice**, identical; masking sweep over all four fixtures → **1 hit, and it is the PROSE line** *"They are stated, not skipped"* |
| **G12** the spec names its ref | RED until stamped | — | **GREEN** | opening commit **`0dc2941a`** (value.js, **2026-09-18 00:16:02**) precedes the first keyframes.js commit of the wave **`3a01e362`** (**00:16:28**) — **no cure commit precedes the ref pin**, measured at the timestamps rather than asserted; ref `ae83da07` resolves; `demo/utils/keyframeSelector.ts` PRESENT at this ref |
| **G13** the wheel does not eat the page | RED | — | **GREEN** | **live** `@wheel.prevent` → **0** (the 1 hit is the `:633` docblock explaining the retirement) and **live** `touch-none` → **0** (the 1 hit is the `:634` docblock), replaced by `touch-pan-y` → **2**; `onTrackWheel` → **2**; `deltaX` in `useZoomPan.ts` → **2**; `role="scrollbar"` → **1 code hit (`:44`)**, 2 further hits prose |
| **G14** ONE failure posture | RED (six postures) | **RED** on its fifth consumer byte (ops typed `rebuild: () => void`; `toast.success` after a non-awaited latch) | **GREEN — the ruling AND all five consumer bytes** | `G14-POSTURE-RULING.md` **152 L** against KF.W2's `POSTURES.md` **342 L**, cross-referenced **both** ends (`POSTURES.md` names KF.W7 → **7**; the ruling names POSTURES → **4**); `buildError` reaches **5** sites in `useTimelineBuild.ts` and **3** in KT. **L-11 LANDED**: `rebuild: () => void` → **0**, `rebuild: () => Promise<void>` → **1**, `const scheduleRebuild = (): Promise<void>` → **1**, and **`await scheduleRebuild()` at `:87` PRECEDES `toast.success` at `:89`** |
| **G15** one dialog shell | RED (80 / 161 L) | — | **GREEN — the fold holds; its line-count witnesses moved under a CLOSED sibling, disclosed at §2** | `KeyframesAddDialog.vue` still wraps `<CSSPasteDialog>` (`:2`/`:55`, imported `:70`) — **one shell, the twin a thin adapter**; `initialText` across `demo/` → **1 file, 1 hit**, the shell's own doc comment; `.label` in KT → **4** (N-2 wired); `flattenVars.ts` → **DELETED** at this ref |

**TALLY AT THIS SEAT: 15 GREEN · 0 RED · 0 ESCALATED.** Twelve reproduce `## Close`'s verdicts
exactly; the three the resume owed (**G9 · G10 · G14·L-11**) move **RED → GREEN** against BEFORE-B,
each at the anchors KF.W6 had moved. **No verdict this seat publishes was manufactured: every GREEN
is read from a settled byte, and the two readings whose DENOMINATOR moved are disclosed below rather
than smoothed.**

---

## §2 · The two readings whose denominator moved — disclosed, not smoothed

**(1) G11's leg (i), under the literal baseline pattern, now returns 2 of 4 — and the gate is GREEN
anyway, for the reason its own Assertion states.** The baseline command is
`git grep -n "TimelineHoverPreview\|previewCache\|SequenceScrubber" -- test/` → **0** at
`origin/master`, and at `## Close` it returned all four fixtures. `.i`'s `1fa98a5d` then deleted the
dead `previewCache: {}` / `previewLoading: {}` keys from fixtures 1 and 2 — a residual **two prior
seats routed to it by name** — so those two files no longer contain the token `previewCache`.
Re-measured at this seat under the SURFACE-naming probe the gate is actually about ⟨cmd⟩
`git grep -lE 'TimelineTrack|TimelineHoverPreview|KeyframeTimeline|SequenceScrubber|previewCache|previews' HEAD -- test/`
→ **exactly the four W7 fixtures and only those four**. **Both halves of the Assertion hold**: the
four named fixtures exist and mount, and *"only those files"* is EXACT — **no tracked file in
`test/demo/instrument/` names the surface, and none was edited to make this gate pass** (the twelve
tracked witnesses are byte-untouched by every seat of this wave). The probe that shrank is a proxy
for a cache prop that no longer exists; the mount it proxied for is measured directly above at
**71 passed / 71**.

**(2) G15's `useCodeHighlight(` witness moved 3 files → 2, under a CLOSED sibling wave.**
`## Close` read **3**; this seat reads **2** (`KeyframesEditor.vue` · `useHighlightCSS.ts`). The
cause is named at its commit: KF.W6's **`6cebdb33`** (S-9 — the paste well becomes the producer's
`Textarea`) retired the highlighter at the CSS-paste well, so the shell that carried the third hit
no longer calls it. **L-4's falsifier is answered in substance and the fold itself is unmoved** —
`KeyframesAddDialog.vue` still wraps `<CSSPasteDialog>`, which is G15's actual subject. The two
dialogs' LINE COUNTS likewise moved (`## Close`: 138 / 142 → this seat: **184 / 289**) under eleven
KF.W6 commits landing on the folded shell. **That is residual 5's ruling — FOLD FIRST, SWAP SECOND —
holding by measurement: KF.W6 wrote onto one shell rather than two.**

---

## §3 · Commit audit — every resume commit against its OWN unit's writable set

Four tracks share this git index, so each commit is read whole and compared against the unit plan's
grant for the unit that authored it.

| repo | sha | unit | files | verdict |
|---|---|---|---|---|
| kf | `4e2a715f` | `.g` | `KeyframeTimeline.vue` · `components/TimelineHoverPreview.vue` · `components/TimelineTrack.vue` · `composables/useTimelineBuild.ts` · `test/…/timeline-hover-preview.test.ts` | **CLEAN** — 5 files, all granted; the family whole in ONE commit, unsplit (the split is what `## Close` escalated). `snapshotCapture.ts` was granted and **not written** — lawful |
| kf | `15c95de1` | `.h` | `components/TimelineHoverPreview.vue` · `components/TimelineTrack.vue` · `test/…/timeline-hover-preview.test.ts` | **CLEAN** — 3 files, all granted, ONE family unsplit. `KeyframeTimeline.vue` granted and not written — lawful |
| kf | `16f58d54` | `.i` | `composables/useTimelineOps.ts` · `test/…/timeline-mount-keyboard.test.ts` · `test/…/timeline-mount-projection.test.ts` | **CLEAN** — 3 files, all granted; the two fixture edits are the typechecker's own demand, declared at the receipt |
| kf | `1fa98a5d` | `.i` | `test/…/timeline-mount-keyboard.test.ts` · `test/…/timeline-mount-projection.test.ts` | **CLEAN** — 2 files, granted; a SEPARATE commit precisely so the two meanings read apart |
| vjs | `6ee51051` | seat 0 | `INBOX.md` · `execution/B/KF-W7.md` · `execution/LEDGER.md` | **CLEAN** |
| vjs | `c1e883fc` | `.g` | `execution/B/KF-W7.md` · `evidence/W7/G10-GHOST-CACHE-LANDING.md` | **CLEAN** |
| vjs | `f4e19aed` | `.h` | `execution/B/KF-W7.md` · `evidence/W7/G9-A11Y-LANDING.md` | **CLEAN** |
| vjs | `6effd200` | `.i` | `execution/B/KF-W7.md` · `evidence/W7/G14-L11-CONSUMER-BYTE.md` | **CLEAN** |

**The negative findings, each measured at this seat:**

1. **`scripts/dev/dev.sh` in ZERO commits, both repos** — ⟨cmd⟩ `git log --format=%h <window> -- scripts/dev/dev.sh | wc -l` → **0** (kf, `41a7ebb6..HEAD`) and **0** (vjs).
2. **`vitest.config.ts` in ZERO KF.W7 commits** — ⟨cmd⟩ over the whole wave window `ae83da07..HEAD` → **0**. The STRUCK §Bounds row is honoured across both sittings.
3. **Session trailer on 8 of 8** — ⟨cmd⟩ `git log -1 --format=%B <sha> | grep -c 'Claude-Session:'` → **1** on each of the four kf and four vjs resume commits.
4. **Eight commits, SIX distinct value.js paths, all granted** — this record · `LEDGER.md` · `INBOX.md` · three `evidence/W7/` files. **Not one fourier, X-W, X.P or registry path appears.**
5. **E-3 HELD** — no resume commit touches `keyframes/waves/`, `megatranche/registry/` or `keyframes/conformance/`.
6. **The twelve tracked `test/demo/instrument/` witnesses are UNEDITED** by every seat of this wave — ⟨cmd⟩ 0 commits in the window on `typing-dots-engine-seam.test.ts` or `value4-editor-boundary.test.ts`, and no resume commit names any of the twelve.

**LANDED-WRONG: NONE.** No commit wrote outside its own unit's writable set and no commit swept in a
sibling track's staged paths.

---

## §4 · Suites and typecheck, at this seat's own runs

- **The wave's own test surface**: the four fixtures + the two named read-only witnesses →
  **71 passed / 71**, run twice, identical.
- **Full keyframes.js suite**: ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed
  · 3 expected fail · 14 skipped · 0 FAILED.**
- **Residual 15 did NOT reproduce.** The two sibling-owned fixtures `## Close` measured as
  non-deterministic (`typing-dots-engine-seam.test.ts`, `value4-editor-boundary.test.ts`) pass in the
  full run **and** in three consecutive isolated runs (**8 passed** each time). **Nothing was done to
  make that true**: ⟨cmd⟩ **0** commits touch either file in the whole wave window, and no
  `testTimeout` was written anywhere. The residual is **narrowed, not discharged** — it is a
  load-dependent timeout risk on two unowned fixtures, and the `## Close` diagnosis (*"every failure
  is a timeout, never an assertion"*) is corroborated by their passing under this seat's lighter load.
- **Typecheck (OP-2 live)**: ⟨cmd⟩ `npm run check` → exit **2**; `error TS` → **54** over **22**
  files; the same output filtered to **every** KF.W7 bound path → **0**. Byte-identical to the count
  `.g`, `.h` and `.i` each measured. **Published SCOPED, never as a green-or-red claim about another
  wave's bytes.**

---

## §5 · I-35's third revision, consumed — and O-28's addendum-beside, RULED

**The delta, verified at the producer's bytes.** ⟨cmd⟩ `/bin/ls -l` → **43,967 B** · ⟨cmd⟩
`shasum -a 256 | cut -c1-16` → **`fe75887ccb505eee`** · committed at glass **`6e5a35bc`**. The row is
**not re-minted** — a revision of an already-rowed, already-read letter is not unrowed mail.

**The ruling: O-28 NEEDS a dated addendum-beside, on exactly one clause.** I-35 §2 corrects a
mis-read — *"`/timeline` is A-8 alone. A-9 is TooltipContent's block ceiling … If you re-file A-9
under '/timeline' at W7 the row will go missing."* Read against O-28's own bytes, **O-28 §2.4 is
precisely that filing**: *"The `/timeline` rows A-8/A-9 from your O-20 disposition — they are answered
by R-1..R-3 rather than re-asked."* R-1..R-3 are `/timeline` subpath rows; **A-9 is not among them.**

**And O-28 contradicted itself about the same object, which is what makes this substantive rather
than clerical**: A-9 ≡ O-28's own **R-5** (*"glass `TooltipContent` consumes none of reka's
`--reka-tooltip-content-available-height`"*, banked `kf-TimelineHoverPreview` **D-15**), filed **LIVE**
two sections above §2.4. A producer seat disposing O-28 row by row would have read §2.4 as
*answered* and closed A-9 — the row going missing exactly as warned, **despite** the live ask.

**Sent as `O-31`**, `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md`: §2.4's A-9 bundling
**STRUCK**; A-9 re-homed to R-5, which **stands exactly as sent**; I-35's answer consumed (the tooltip
arm exists only at glass HEAD, is not in 9.0.0, and reaches us at the cut after it, inherited by every
`<TooltipContent>` with no markup change — **answered, not declined**); one clerical ask (grade A-9 at
R-5). **No new ask is minted, O-28 is UNEDITED (E-3), and zero bytes were written into the glass tree.**

**Our interim is measured to have landed on the demo side only** — ⟨cmd⟩
`git grep -c 'reka-tooltip-content-available-height' 1fa98a5d -- demo/` → **1 file**,
`TimelineHoverPreview.vue`, `.g`'s bound on our own preview root. **Nothing was re-filed under
`/timeline`** and no producer selector was copied.

---

## §6 · E13 — the four-path close sweep, at this seat's own clock

Swept read-only at **2026-09-18 19:00 EDT**, delta against `.i`'s **18:37**, classification taken from
each `INBOX.md` row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**
(SELF-COUNT law). ⟨cmd⟩ `/bin/ls -dlt ../glass-ui/docs/tranches/*/ | head -4` → **`BK/`** (Sep 18
17:53) · `BJ/` · `BI/` · `IOS27-MICRO/` — **BK is still the live glass tranche**. Counts:
`docs/tranches/V/` **10** `.md` · `V/coordination/` **19** entries (18 + this seat's own O-31) · BK
coordination **9** · `../keyframes.js/…/V/coordination/` **12** `.md` · atlas `P/coordination/` **28**.

⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 18:37'` →
**TWO hits, both classified**:
1. `docs/tranches/V/PALETTE-CONTRACT.md` — **not mail**. Track A's own contract artifact, committed at
   **`47ea1029`** (*"docs(X·W3): WRITE-CONTRACT canon + PALETTE-CONTRACT §5"*), clean in the worktree.
   No `I-n` is owed and none is minted; the `docs/tranches/V/` `.md` count is **unmoved at 10**, so
   nothing arrived — one file was edited by a sibling lane.
2. `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` — **this seat's own O-31**, rowed in the
   same act (SELF-COUNT).

**0 unrowed · 0 new `I-n` minted · 0 UNREAD in KF.W7's scope.** The three live UNREAD cells —
**I-32 · I-33 · I-34** — reproduce, and each was read at its **Routing** cell by this seat: all three
route to **X-W0.j / the X formation mail seat** (I-34 beside it to X-EXT-1; I-33's own cell says the
formation mail seat relays each sibling's section onward, so nothing is owed at this end today). Not
one names a keyframes timeline byte. **E13 is MET by routing, and this wave does not close with
UNREAD mail in its scope.**

---

## §7 · The push

**keyframes.js — PUSHED by this seat.** The four resume commits were unpublished
(`origin/master` `41a7ebb6`, `HEAD` `1fa98a5d`). ⟨cmd⟩ `git log --oneline origin/master..HEAD` before
the push → **exactly four, and every one is KF.W7's** (`4e2a715f` `.g` · `15c95de1` `.h` ·
`16f58d54` `.i` · `1fa98a5d` `.i`). **This push carries NO sibling commit** — the disclosure the brief
asks for is, at these bytes, an empty set, and it is stated rather than assumed: KF.W6 closed
2026-09-17 and its last commit `41a7ebb6` was already published.

**value.js — NOT pushed by this seat.** `origin` is many commits behind on a history four tracks are
writing concurrently (X·V, X·F, X·P and this one), and the brief's push instruction names keyframes.js.
Each track publishes its own close; this seat publishes none of theirs and stamps no sibling gate.

---

## §8 · The four-verb line — where this wave leaves it

| verb | state | basis |
|---|---|---|
| AUDITED | **YES** (unchanged) | the 13 named `registry/adjudicated/` records |
| SPECIFIED | **YES** (unchanged) | `docs/tranches/X/keyframes/waves/KF-W7.md`, IMMUTABLE (E-3) |
| **IMPLEMENTED** | **YES — 15 of 15 gates GREEN, zero carried RED, zero escalations** | the table at §1, re-run whole at this seat's own double-run commands. **IMPLEMENTED is this wave's ceiling by its own §Locks** |
| VERIFIED | **NO** | *"stamped only at sub-tranche close"* — the spec's own words; **no seat of this wave may stamp it and this seat does not.** No CHECK pass has run against KF.W7 |

**The KF-AV-28 verdict is SETTLED and is NOT re-opened by this seat**: six surfaces, **six
KEEP-BESPOKE, ZERO SWAP**, the discharge set **EMPTY**, and KF.W10 carries **every** governed row
naming its pending surface. This wave emits **zero** `DISCHARGED by KF.W7 SWAP verdict <surface>,
<date>` receipts, which is the produced artifact W10's §G-2 consumes — a stated emptiness, never
silence.
