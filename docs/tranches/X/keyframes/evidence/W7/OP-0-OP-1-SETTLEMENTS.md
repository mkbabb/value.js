SERVED MODEL: claude-opus-5[1m]

# KF.W7 · OP-0 and OP-1 — THE TWO SETTLEMENTS, RULED

**Unit**: X.KF.W7.a. **Date**: 2026-09-18. **Ref of record**: keyframes.js `origin/master`
**`ae83da07`** (G12, `evidence/W7/G12-REF-PIN.md`). **Every anchor below is re-resolved at that ref
and double-run** (§4a/§4b of the G12 file; drifts recorded there, INTENT taken at the true bytes).

**What this file is.** §Sequencing items 1 and 2 open this wave's hard ordering with two
**SETTLEMENTS**. A settlement is *a design ruling, not a cure*: **both cures are NO-WAVE-OWNER and
out of KF.W7's §Bounds, and this unit writes no byte of either.** What was owed was a *written*
ruling that later seats and the owning packets execute against, and that this wave's own cluster work
may not silently contradict. That is what is discharged here.

**E-3**: the spec and the adjudicated registry are IMMUTABLE. Nothing below edits either; the two
rulings are dated records beside them.

---

## §1 · OP-0 — the document-singleton portal sink (kf-AnimationControlsGroup **D-1**, ADJUDICATED BLOCKER, restored)

### §1.1 The question, as the bank puts it

Terminal disposition, verbatim ⟨`kf-AnimationControlsGroup.md`, the §BLOCKER **D-1** row⟩:

> **NO-WAVE-OWNER**, must be settled **before** KF.W6-TIMELINE (any timeline-cluster swap inherits the
> portal architecture).

Cure space, **recorded by the bank and not chosen there** (verbatim): *"per-channel targets, a
selection-gated source, or this component becoming the single owner of the expanded instrument (it
already computes `activeTimelineRef`, :198-201)."*

**The settlement owed: KEEP or REPLACE the portal architecture**, carrying the banked scope
enumeration.

### §1.2 The scope enumeration, carried whole (the bank's own, not re-derived)

**cube 3 · amiga 3 · spring 2** — *"all animations stamped with the scene `superKey`, so ONE bucket
flips ALL instances."* The enumeration is the bank's (`kf-AnimationControlsGroup.md`'s D-1 proof and
its ruling 8, which KILLED RR-L's "one scene, spring" demotion premise). **It is carried, not
re-litigated.** It is load-bearing here because it is what makes the stacking the *majority* case
rather than a corner: the flagship cube scene and amiga stack THREE `KeyframeTimeline` instances into
one `overflow-hidden` box on expand; spring stacks two.

### §1.3 The mechanism, verified at `ae83da07`

| limb | measured | receipt |
|---|---|---|
| ONE sink, minted unconditionally, one hard-coded id | `AnimationControlsGroup.vue` `<div` **`:79`**, `id="timeline-expanded-target"` **`:80`**, `></div>` **`:88`**; `overflow-hidden` + `max-h-[var(--panel-max-h)]` | G12 §4a |
| N sources, one per painting channel | `ChannelControls.vue:186` `<Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>` | G12 §4b |
| **the gate cannot discriminate** | ⟨cmd⟩ `sed -n '381,383p' ChannelControls.vue` → `const isTimelineVisible = computed(() =>` / `    storedControls.selectedControl === "timeline" \|\| storedControls.isTimelineExpanded,` / `);` — **scene-shared on both disjuncts**; once `isTimelineExpanded` is true it is true for **every** channel instance at once | this seat |
| the asymmetry that proves it is an omission, not a design | the **in-place** panel, 36 lines above the Teleport, IS gated — `:150 v-if="hasSurface('timeline') && selectedControlSurface === 'timeline'"` — while the **teleported** node is gated on neither ⟨this is kf-ChannelControls **L-8** rider (iii), carried, not re-booked⟩ | this seat |
| **the discriminator already exists in the contract** | `:257` `const { animation, isPlaying: isPlayingProp, layerConfig, active, extraTabs } = defineProps<{…  active?: boolean; …}>` — bound by every host (`ControlsPaneWrapper.vue:50-58`, the props comment's own words) and already forwarded at `:108` | this seat |

Vue performs **no arbitration** between N Teleports naming one target: the nodes are appended in
mount order and stack. The defect is therefore **unarbitrated multiplicity at the SOURCE**, not
scarcity at the sink.

### §1.4 THE RULING — **KEEP the portal architecture. Cure by ARBITRATION AT THE SOURCE.**

**Settled: KEEP.** The portal (one `Teleport` per channel into one document-singleton sink, with
`defer` + `:disabled`) is **retained**. The cure is a **selection-gated source** — the bank's second
option — in this exact shape:

> **The Teleport's `:disabled` becomes a per-channel predicate: the node relocates into the sink iff
> the timeline is expanded AND this channel is the selected one.** Every non-selected channel's
> `:disabled` stays `true`, so its timeline **renders in place and stays mounted**, hidden by the
> pane's existing `v-show` exactly as it is today. **Exactly one source is ever live in the sink.**

**Three properties make this the root-cause cure and not a patch**, each stated so a later seat can
falsify it:

1. **It destroys no state.** The gate moves `:disabled`, **never a `v-if` and never a `:key`**. Vue's
   `Teleport` *relocates* a mounted subtree; it does not remount it — which is precisely what the
   `:182-185` comment says the architecture exists to guarantee (*"so Teleport lifecycle isn't tied to
   a panel mount/unmount"*). **A cure that gated the source with `v-if` would unmount the
   non-selected channels' timelines and destroy their authored keyframes — it would cure D-1 by
   committing L-2/C-2 on a second axis.** That form is REJECTED here by name so it cannot be
   re-proposed as an equivalent.
2. **It needs no new mechanism.** The discriminator is already a declared prop (`active?: boolean`,
   `:257`), already bound by every host, already forwarded at `:108`. The in-place panel already
   demonstrates the idiom at `:150`. This is the KISS reading, not a redesign.
3. **It fixes the right end.** `isTimelineVisible` reads a **per-scene** store bucket
   (`animation.superKey`), so no amount of work at the sink or in that predicate can separate three
   instances that share one bucket. Only a **per-channel** term can. This is the direct consequence
   of §1.2's enumeration, which is why the enumeration is carried rather than cited.

### §1.5 The two options DECLINED, each with its named reason

- **Per-channel targets (N sinks) — DECLINED.** It mints N ids where one is already one too many,
  and it does not by itself cure the defect: with all painting channels mounted under `v-show` and
  the predicate scene-shared, N sinks in one `overflow-hidden` cell stack exactly as N nodes in one
  sink do. It cures the symptom's address, not its cause.
- **AnimationControlsGroup becomes the single owner of the expanded instrument — DECLINED, and this
  is the decisive one.** It is the most attractive option on paper (the component already computes
  `activeTimelineRef`, measured at **`:202`**, banked `:198-201`, **DRIFT +4**), and it is wrong for
  a mechanical reason: it makes the collapsed and expanded cases **two different mount sites**, hence
  **two different component instances**, hence **state loss on every expand/collapse** —
  `useTimeline.ts:22` opens `state` literal-empty with **zero** rehydration paths (⟨cmd⟩
  `grep -c 'createGlobalState\|useStorage'` → **0**). It would replace a portal that preserves the
  instrument's state with an ownership model that discards it. Adopting it would require hoisting the
  timeline's whole state out of the component first — which is not in the bank's cure space and is
  not licensed by this settlement.

### §1.6 What rides this settlement, stated so nothing is silently dropped

- **kf-AnimationControlsGroup M-9** (the Teleport target contract is an unshared magic string across
  two files, in a subtree that owns a typed injection-key module) **RIDES this cure and is NOT
  mooted by it.** The bank routes M-9 as *"rides the D-1 cure — any per-channel-target redesign must
  produce a shared constant anyway."* This settlement declines the per-channel-target redesign, so
  the ride is restated at its true ground: **after this cure there is still ONE id spelled by hand in
  two files** (`AnimationControlsGroup.vue:80` mints it, `ChannelControls.vue:186` hard-codes it), a
  rename on either side still silently disables the whole feature with a dev-warning only, and
  `demo/components/instrument/transport/injectionKeys.ts` still exists as the established seam
  (verified present at `ae83da07`). M-9 stays NO-WAVE-OWNER and rides the D-1 cure as banked.
- **kf-ChannelControls L-8 rider (iii)** — *the Teleport gated on NEITHER the projection NOR
  `hasSurface('timeline')`* — is **exactly the hole this settlement rules shut**. It is carried, not
  re-booked, and the cure shape above is its disposition.
- **§Sequencing item 1's forward condition, DISCHARGED.** *"C-6's 'drive the scene's single engine
  through AnimationControlsGroup' arm and G2's restatement of it are CONDITIONED on this
  settlement — no cure routed through AnimationControlsGroup lands before the portal ruling."*
  **The portal ruling is now made.** G2's AnimationControlsGroup arm is **UNBLOCKED for `.b`**, under
  the standing condition that any engine cure routed through that component must hold §1.4's three
  properties (no unmount, no keyed subtree, per-channel arbitration) — a cure that re-stacks the
  instrument to reach the engine has failed this settlement.
- **§Sequencing item 8 / RB-7's expanded-timeline settlement** inherits this ruling whole: D-1's
  scope surface *is* the expanded, stacked timeline, and after this settlement the expanded cell
  holds **exactly one** instrument.
- **Rendered-stack geometry → SS-13 (UNPROVEN #2)** stays routed there, unexecuted here (probe
  parsimony).

---

## §2 · OP-1 — the `:key` remount (kf-ChannelControls **L-2/C-2**, ADJUDICATED BLOCKER)

### §2.1 The question, as the bank puts it

Terminal disposition, verbatim ⟨`kf-ChannelControls.md`, the **L-2/C-2** row⟩:

> **NO-WAVE-OWNER** (SS-1/SS-2 spec input), and it MUST be settled before **KF.W6-TIMELINE** — any
> timeline-cluster swap that inherits the `:key` inherits the data loss. Cure space recorded, not
> chosen: drop the key; if the entrance effect is wanted, retrigger it without keying the stateful
> subtree.

And ⟨`kf-KeyframeTimeline.md`, the *Cross-refs, not folds* line⟩: *"must be settled **before/within**
KF.W7."* ⟨Both quotations, and the paraphrase discipline that governs them, are §Sequencing item 2's;
they are cited here, not re-cut.⟩

### §2.2 The mechanism, verified at `ae83da07`

⟨cmd⟩ `git show origin/master:…/ChannelControls.vue | sed -n '186,193p'` →
```
                <Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>
                    <div
                        v-if="isTimelineVisible"
                        :key="storedControls.selectedControl"
                        class="animate-in fade-in slide-in-from-right-2 duration-fast"
                    >
                        <KeyframeTimeline
                            ref="timelineRef"
```

The `:key` is on the **wrapper**, so the whole `KeyframeTimeline` subtree beneath it is torn down and
rebuilt whenever `selectedControl` moves — and `isTimelineVisible` (**`:381`**) stays true on
`isTimelineExpanded` alone, so `selectedControl` is free to move *while the node stays mounted and
keyed*. The loss is total (`useTimeline.ts:22` literal-empty, **0** rehydration paths) and silent.
**The key buys a three-token entrance animation (`:190`) with the user's authored work.**

### §2.3 THE RULING — **DROP THE KEY.**

**Settled.** `ChannelControls.vue:189`'s `:key="storedControls.selectedControl"` is **deleted**. The
`Teleport`'s `defer` + `:disabled` pair already performs the relocation the key is nominally there
for; the key adds nothing but the remount.

**The entrance effect, ruled rather than left to taste.** If the `animate-in fade-in
slide-in-from-right-2` entrance is wanted on surface switch, it is retriggered **without keying the
stateful subtree** — the class re-application (or a keyed **inner presentational** wrapper that holds
no component state) is the lawful shape. **Keying any ancestor of `<KeyframeTimeline>` is forbidden
by this settlement**, in this file and in every successor: that is the mechanism, and relocating it
one level up or down does not change it.

**Interlock with §1, stated because the two settlements are one system.** With the key gone *and* the
Teleport arbitrated per channel (§1.4), a surface switch while expanded **relocates which node sits
in the sink and remounts nothing**. Neither settlement is sufficient alone: §1 without §2 still
destroys the selected channel's work on every switch; §2 without §1 preserves the work and still
stacks three instruments in one clipped box.

### §2.4 The second-order collision — KF-CE-2 (parent half), RESOLVED

The spec resolves this collision and this settlement records the resolution as binding
⟨§Sequencing item 2 · §Carry P8⟩:

- **The bank's "keyed remount" option is REJECTED.** It is the exact mechanism L-2/C-2 convicts as a
  data-loss BLOCKER; a keyed remount would need written justification against L-2/C-2 and none is
  offered. **Arm-time id capture is the ruled cure shape** for KF-CE-2's parent half: the 200 ms
  debounced emit **captures the target keyframe id when it ARMS** and applies to *that* id when it
  fires (dropping if it no longer exists), instead of resolving the live ref at emit time.
- **Verified at the bytes, so the cure is written against what is there**: `KeyframeTimeline.vue`
  mounts `<CSSCodeEditor>` at **`:123-127`** and binds **no `:key`** (⟨cmd⟩ `grep -c ':key='` →
  **0**); `onKeyframeCSSChange` resolves the target from the **live** ref at
  **`:247-248`**; and it **assigns, not merges**, at **`:263`** (`kf.vars = newVars;`) — which is why
  a late emit does not corrupt one property but **replaces the whole keyframe's `vars` with the
  previous keyframe's text**.
- **`L-15-PROTECTED` — the do-not-delete lock, RESTATED AND BINDING.** `if (!kf) return;` at
  **`:249`** is LOAD-BEARING against this exact timer ⟨the protection banked at
  `kf-KeyframeTimeline.md` § *Killed-claims register — 10 rows, refutations re-executed*, entry
  **`K-8 · L-15`**: *"REFUTED (ruled table): the stale 200 ms timer … makes the guard load-bearing;
  the axis's implied cleanup would ship a crash. **A kill that protects live code.**"*⟩. **No dedupe,
  no tidy-up and no arm-time-capture implementation may remove that guard**; the guard gains its
  comment (KF-CE-41) and binds L-16/L-17's descriptor de-duplication.
- **Neither half alone closes the loss.** The child half (cancel-on-external-write +
  cancel-on-unmount, one `replaceContent()` seam) is **EDITOR-UNIT's**, addressed at §Sequencing's
  cross-edge. This settlement makes no scheduling claim over that packet; it states the mechanism
  that binds whichever seat authors it.

### §2.5 What this settlement does NOT do

It does not write `ChannelControls.vue`, `CSSCodeEditor`'s helpers, or `KeyframeTimeline.vue`'s emit
path. **All three cures are NO-WAVE-OWNER and outside KF.W7's §Bounds** ⟨`ChannelControls.vue` is
named in the spec's read-only list: *"Not touched by any seat: … `demo/components/instrument/channels/ChannelControls.vue` (OP-1's owner)"* — and this seat records, without asserting anything further,
that at `ae83da07` the file's path is `demo/components/instrument/transport/channel-controls/ChannelControls.vue`; the **owner-exclusion is the binding thing, and it binds at the true path**⟩.

**The binding this wave's own seats inherit**: no KF.W7 cure may introduce a `:key` on a stateful
timeline subtree, may unmount a mounted timeline to satisfy a gate, or may land an
AnimationControlsGroup-routed engine cure that re-stacks the instrument. A KF.W7 commit that does any
of the three contradicts a settlement this wave itself made, and is defective on that ground alone.

---

## §3 · Verdict

| precondition | state BEFORE | state AFTER |
|---|---|---|
| **OP-0** — portal settlement | UNSETTLED (intake) | **SETTLED — KEEP the portal; cure by selection-gated source (`:disabled`, never `v-if`, never a key)**; cure NO-WAVE-OWNER |
| **OP-1** — `:key` settlement | UNSETTLED (intake) | **SETTLED — DROP the key; entrance retriggered without keying the stateful subtree; KF-CE-2 parent half = arm-time id capture; `L-15-PROTECTED` guard stays**; cures NO-WAVE-OWNER |

**§Sequencing hard-ordering items 1 and 2 are DISCHARGED.** Item 3's ref-pin is discharged at
`evidence/W7/G12-REF-PIN.md`; item 4's verdict table follows at
`evidence/W7/G1-VERDICT-TABLE.md`.
