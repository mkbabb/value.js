SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G12 — THE REF PIN, AND THE D-19 ANCHOR RE-RESOLUTION

**Unit**: X.KF.W7.a (phase 1, the S-9 evaluate seat). **Date**: 2026-09-18.
**Gate**: G12 — *"The spec names its ref; every anchor re-resolves against it."*
**Authority**: the owner's 2026-09-17 begin-word (COHESION §0j, verbatim there); write authority
COHESION §0j.C **KF-WRITE (b)** — *"after §B-12, the sacred checkout on `master` (= `origin/master`)
is the execution substrate for KF.W2 · W4 · W5 · W6 · **W7** · W8 · W9 · W10"*.
**E-3**: `docs/tranches/X/keyframes/waves/KF-W7.md` is IMMUTABLE. Every correction below is a dated
finding *beside* it, never an edit of it.

**This is the wave's OPENING COMMIT (§Sequencing item 3).** No cure commit of this wave precedes it.

---

## §1 · The ref, stated

The spec pins *"keyframes.js `origin/master` `81a56990` **or later**"*. It is later.

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js rev-parse master origin/master` →
```
ae83da0764a77ebe176d6314b179cfa5b3dd287b
ae83da0764a77ebe176d6314b179cfa5b3dd287b
```
⟨cmd⟩ `git merge-base master origin/master` → `ae83da0764a77ebe176d6314b179cfa5b3dd287b`

**THE REF OF RECORD FOR KF.W7 IS `ae83da07` — `master` ≡ `origin/master` ≡ `ae83da07`.**

**Consequence, stated once so no later seat re-derives it.** The spec's G12 witness recorded the
triple state `8281638c` / `81a56990` / merge-base `a59d3a22` and the kf-App ruling-1 clause *"local
HEAD `8281638c` is DISQUALIFIED as witness substrate"*. **That clause is DISCHARGED BY THE BYTES**:
after §B-12's reset (COHESION §0j.C **KF-OP1**) and the Track-B commits since, there is no second ref
to disqualify. The *assertion* G12 makes is unaffected and is what this file discharges.

**Working tree at this seat's clock** — ⟨cmd⟩ `git status --porcelain` → two untracked
`docs/tranches/V/coordination/VALUEJS-INBOUND-*.md` files (the 07-24 / 07-27 value.js letters, two of
the six §0m.0 survivors), **nothing else**. **Zero tracked modifications**, so **origin-side and
worktree bytes are the same bytes** for every anchor below — which is what makes the §Bounds
"origin-side anchor tier" marking (below) a statement about *provenance*, not about a divergence.

---

## §2 · The composable / engine anchors, MARKED ORIGIN-SIDE

G12's assertion requires the opening commit to *"mark composable/engine anchors origin-side"*. The
five §Bounds rows carrying that tier are marked here, each read **`git show origin/master:<f>`** and
never from the worktree:

| file | §Bounds tier | read as |
|---|---|---|
| `demo/components/instrument/timeline/composables/useTimeline.ts` | origin-side anchor tier (G12) | `git show origin/master:…` |
| `demo/components/instrument/timeline/composables/useTimelineBuild.ts` | origin-side | `git show origin/master:…` |
| `demo/components/instrument/timeline/composables/useTimelineOps.ts` | origin-side | `git show origin/master:…` |
| `demo/components/instrument/timeline/utils/timelineEngine.ts` | origin-side; SHARED — serial-only | `git show origin/master:…` |
| `demo/utils/keyframeSelector.ts` | exists at origin/master ONLY — untracked at the stale HEAD | `git show origin/master:…` |

**Binding on every later seat of this wave**: a §Bounds anchor is read `git show origin/master:<f>`
at `ae83da07`, or it is not read. At this ref the worktree agrees byte-for-byte (§1), so a seat that
reads the worktree gets the same answer — but it gets it by luck, not by law, and the law is the
thing that survives the next fetch.

---

## §3 · D-19 re-resolution — the §Bounds line-count tier

**Consumed, not re-run.** The 18-row §Bounds re-measurement at `ae83da07` was executed read-only and
double-run by the OPEN seat and is banked at `docs/tranches/X/execution/B/KF-W7.md` §*Bounds
re-measured at `ae83da07`* — **17 of 18 EXACT, one DRIFTED**
(`…/timeline/components/TimelineHoverPreview.vue` spec **38** → measured **44**, **+6**). This unit
does not re-issue those figures in its own voice (LAW D(3): a count is stated AT its enumeration, and
dependent cells point at it); it consumes them as the input its brief names.

---

## §4 · D-19 re-resolution — THE ANCHORS THIS UNIT CONSUMES

Every anchor below is one this unit's own rulings (OP-0 · OP-1 · G1) rest on. **Each was re-resolved
against `ae83da07` by command and DOUBLE-RUN (identical both runs).** Where an anchor DRIFTED, the
row records **INTENT AT THE TRUE BYTES** — the spec/registry coordinate is history, the predicate is
the anchor, and the number below is this seat's dated measurement.

### §4a · OP-0 — the portal sink (kf-AnimationControlsGroup **D-1**)

| banked anchor | measured at `ae83da07` | state |
|---|---|---|
| sink minted unconditionally, `AnimationControlsGroup.vue:79-88` | `<div` at **`:79`** · `id="timeline-expanded-target"` at **`:80`** · `></div>` at **`:88`** | **EXACT** |
| `activeTimelineRef`, `:198-201` | `const activeTimelineRef = computed(() => {` at **`:202`** | **DRIFT +4** — INTENT at `:202` |
| file length | **340 L** | recorded |

⟨cmd⟩ `git show origin/master:demo/components/instrument/transport/AnimationControlsGroup.vue | sed -n '79,88p'` →
```
        <div
            id="timeline-expanded-target"
            :class="[
                'timeline-expanded-cell z-dock overflow-hidden',
                'transition-[max-height,opacity] duration-slow ease-standard',
                storedControls.isTimelineExpanded
                    ? 'max-h-[var(--panel-max-h)] border-t border-border/50 glass-wash px-4 py-3'
                    : 'max-h-0',
            ]"
        ></div>
```
**The BLOCKER's mechanism verifies at the bytes**: ONE sink, one hard-coded id, `overflow-hidden` +
`max-h-[var(--panel-max-h)]`, minted with **no `v-if` and no per-channel discriminator**.

### §4b · OP-1 — the `:key` remount (kf-ChannelControls **L-2/C-2**)

| banked anchor | measured at `ae83da07` | state |
|---|---|---|
| decoupling comment, `:182-185` | comment runs **`:182-185`** (*"so Teleport lifecycle isn't tied to a panel mount/unmount"*) | **EXACT** |
| Teleport source, `:186` | `<Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>` at **`:186`** | **EXACT** |
| the `:key`, `:187-191` | wrapper `<div` at **`:187`** · `v-if="isTimelineVisible"` **`:188`** · **`:key="storedControls.selectedControl"` at `:189`** · `class="animate-in fade-in slide-in-from-right-2 duration-fast"` **`:190`** | **EXACT-IN-RANGE** |
| `isTimelineVisible`, `:377-379` | `const isTimelineVisible = computed(() =>` at **`:381`** | **DRIFT +4** — INTENT at `:381` |
| file length | **460 L** | recorded |

**The BLOCKER's mechanism verifies at the bytes**: the `:key` sits on the **wrapper**, so the whole
`KeyframeTimeline` subtree (`ref="timelineRef"` at `:193`) is torn down and rebuilt whenever
`selectedControl` moves — and the Teleport `defer` + `:disabled` pair three lines above already does
the relocation job the key is nominally there for.

**The falsifier, attacked and dead at this ref** — ⟨cmd⟩
`git show origin/master:…/timeline/composables/useTimeline.ts | sed -n '22,26p'` →
```
    const state = ref<TimelineState>({
        keyframes: [],
        captureProperties: [...DEFAULT_CAPTURE_PROPERTIES],
        animationName: "timeline-animation",
    });
```
⟨cmd⟩ `… | grep -c 'createGlobalState\|useStorage'` → **0**. **Literal-empty on mount, no rehydration
path.** The remount's data loss is therefore total and unrecoverable, at this ref, today.

### §4c · KF-CE-2 (parent half) — the stale-emit collision OP-1 resolves

| banked anchor | measured at `ae83da07` | state |
|---|---|---|
| *"KeyframeTimeline binds NO `:key`"*, `:123-127` | `<CSSCodeEditor … />` spans **`:123-127`**; ⟨cmd⟩ `grep -c ':key=' KeyframeTimeline.vue` → **0** | **EXACT** |
| live-ref target resolution, `:246-249` | `if (!selectedKeyframeId.value) return;` **`:247`** · `const kf = state.value.keyframes.find(…)` **`:248`** | **EXACT-IN-RANGE** |
| the `L-15-PROTECTED` load-bearing guard | `if (!kf) return;` at **`:249`** | **EXACT** — present, and it stays |
| *"assigns, not merges"*, `:263` | `kf.vars = newVars;` at **`:263`** | **EXACT** |

### §4d · G1 — the importable-surface witness

| witness | measured at this seat's clock | state |
|---|---|---|
| `wc -l …/glass-ui/dist/components/timeline/index.d.ts` | **2** | EXACT |
| `ls …/dist/components/timeline/` | **9** files | EXACT |
| `grep SliderVariant …/dist/components/slider/types.d.ts` | `:4 export type SliderVariant = "standard" \| "spectrum";` — **no "timeline" member** | EXACT |
| demo imports of glass `/timeline` | **0** | EXACT |
| `AnimationVisualizer.vue` `aria-hidden="true"` | **`:7`** (root element) | recorded |
| `SequenceScrubber.vue` `role="slider"` | **`:22`** | recorded |
| `SequenceScrubber.vue` `.progress-rail`/`.progress-ball` hits | **3** | recorded |
| `TimelineCaret.vue` `"update:percent"` (C-10's subject) | **`:43`** declaration · **`:62`** emit | recorded |
| kf `package.json` `test-utils` hits, BEFORE this unit's add | **0** | recorded |

---

## §5 · Double-run block (WRITE-THEN-MEASURE)

Every figure in §4 was produced by one script over the settled bytes and run **twice**; ⟨cmd⟩
`diff run1.txt run2.txt` → **no output** (**DOUBLE-RUN IDENTICAL**). Nothing above is inherited from
the spec, from the registry, or from the OPEN seat except where §3 says so by name and by path.

---

## §6 · Verdict

**G12: GREEN**, stamped at this commit. The ref is named (`ae83da07`), the composable/engine anchors
are marked origin-side, and every anchor this unit's rulings consume is re-resolved against that ref
with its drift recorded. Two anchors drifted (**+4** each, §4a and §4b), **neither moves a mechanism
and neither moves a verdict** — both BLOCKERs verify at the true bytes.

**Carried by this gate** (the spec's own list): MISS-α5 ≡ RR-β K-BASE · the witness law (kf-App
ruling 1) · KF.W0 §B-12 · the F-1 per-baseline re-rule.
