SERVED MODEL: claude-opus-5[1m]

# KF.W4 — the type-surface RESIDUALS, dated and routed (R-10's triumvirate register)

**Wave** X.KF.W4 · **Unit** KF.W4.a · **Gate** G-KFW4-1 · **Dated** 2026-09-17
**Substrate** `/Users/mkbabb/Programming/keyframes.js` @ `origin/master 55e9bf0d` + this unit's
commit `5388907b`. Every row below was re-measured at those bytes
⟨`npx vue-tsc --noEmit -p tsconfig.json`⟩, double-run.

**The arithmetic, with its counting rule stated at the figure: one unit = one `error TS` line of
`vue-tsc`'s output.** Day-one **64** (63 `demo/**` + 1 `src/`) → after this unit **13** (12 `demo/**`
+ 1 `src/`). **51 demo diagnostics cured, type-only. 12 demo diagnostics remain**, and the one `src/`
row is F-1's, which no seat of this wave may touch.

R-10, verbatim: *"Any inventory row that cannot be cured type-only … is a **triumvirate trigger**; if it
cannot be resolved in-wave the wave closes `complete_with_misses` with the gate wired and the miss
dated. **It does not stage a RED gate and call it green.**"* This file is those dated misses. **None of
the twelve is suppressed**: no `@ts-expect-error`, no `any`, no `skipLibCheck` widening, no allowlist,
no `node_modules` patch — the gate reads RED and says why.

---

## A · CLASS 1 — PRODUCER TYPE GAPS (8 rows) → SS-6 / BH mail, never a demo-side hack

Standing law: *"glass-ui is READ-ONLY always (producer rows ride mail, never frontend hacks)."* Each row
below is a consumer binding a value the producer's own declared type cannot accept, where the producer's
declaration — not the demo's use — is what is short. **The spec anticipates exactly this class**: its
named example, **KF-APP-45's `Component | undefined` into `<component :is>`**, is this shape.

| # | site | code | the producer declaration that is short | measured |
|---|---|---|---|---|
| P-1 | `demo/components/instrument/shell/EditorShell.vue:75` | TS2379 | **vue-core** `VNodeProps.key?: PropertyKey` — no `\| undefined` ⟨`grep -n 'key?:' node_modules/@vue/runtime-core/dist/runtime-core.d.ts`⟩ → `:1213 key?: PropertyKey;` | `:key="superKey"`, and `superKey`'s own `withDefaults` default IS `undefined` |
| P-2 | `demo/components/instrument/shell/HeroAurora.vue:63` | TS2345 | **glass-ui** `AuroraAtoms` painterly arm REQUIRES `medium: { kind: … }` | the demo's atoms literal carries no `medium`; supplying one is a DESIGN choice (which medium), not a type act — KF-HA-1's banked *"shipping TS2345"* |
| P-3 | `demo/components/instrument/timeline/KeyframeTimeline.vue:105` | TS2379 | **glass-ui** `InputProps.modelValue?: string \| number` ⟨`node_modules/@mkbabb/glass-ui/dist/components/input/types.d.ts`⟩ | `v-model="selectedKeyframe.label"` where `TimelineKeyframe.label?: string` — the field is genuinely optional |
| P-4 | `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:204` | TS2379 | **glass-ui/reka** `Select.modelValue?: AcceptableValue \| AcceptableValue[]` | `:model-value="timingFunctionKind(...)"` returns `string \| undefined` |
| P-5 | `demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue:42` | TS2322 | **glass-ui** `InputProps.type?: "email" \| "password" \| "search" \| "tel" \| "text" \| "url"` — **no `"number"`** | the panel asks for `type="number"`; every numeric field in the demo needs it |
| P-6 | `demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue:61` | TS2345 | **glass-ui** `LabeledSwitch` requires `modelValue` (+ `onUpdate:modelValue`) | the demo passes `checked` / `onUpdate:checked` — an **API drift**, and if the producer ignores `checked` the switch is inert TODAY; curing it changes rendered behaviour and is a packet act, not a type act |
| P-7 | `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue:32` | TS2379 | **glass-ui** `EasingPicker.preset?: string` | `:preset="seedPreset"` is `string \| undefined` **by the site's own documented design** (*"A custom stored quad has no seedable preset"*, `:29-31`) |
| P-8 | `demo/scenes/easing/EasingSidebar.vue:27` | TS2379 | **glass-ui** `EasingPicker.preset?/steps?/term?` | same picker, same gap, through `pickerSeed` |

**Why no demo-side cure was spent on these.** Each is bindable-green by a non-null assertion at the
call site, and **that is precisely the demo-side hack the standing law forbids**: it would move a
producer's contract defect into eight consumer files and delete the evidence that the contract is
short. P-5 and P-6 cannot even be asserted — the demo is using an API the producer does not declare.

**Routing**: the six glass-ui rows (P-2 · P-3 · P-4 · P-5 · P-6 · P-7/P-8) are one **SS-6 / BH relay**
packet to the active glass-ui coordination inbox, under the standing formation invariant (*"EVERY
component/glass-ui-level change relayed to the active glass-ui BH inbox"*). Their common shape is one
sentence: **glass-ui's prop types were authored without `exactOptionalPropertyTypes` in mind**, and a
consumer that enables the flag cannot bind an optional prop it means to leave at its default. P-1 is
**vue-core's**, not glass-ui's, and has no mail lane: it is recorded here as an upstream bound.

---

## B · CLASS 2 — BEHAVIOURAL ROWS (4 diagnostics, 2 defects) → their own packets, not `.a`'s

R-10 bounds this unit to *"type annotations, guards, type declarations, and import specifiers"* and
forbids changing *"a runtime expression's value or a template's rendered output"*. Both rows below are
cured only by changing what the code DOES.

| # | site | code | the defect the gate just exposed |
|---|---|---|---|
| B-1 | `demo/app/dock/MbabbMenu.vue:100` (×2) | TS2339 | **A LIVE RUNTIME CRASH.** `togglePpMode()` reads `stored.value.ppMode` where `stored = getStoredAnimationGroupControlOptions(...)` returns the **object, not a `Ref`** ⟨`demo/state/controlOptionsStore.ts:79-83`⟩ — so `stored.value` is `undefined` and the write `stored.value.ppMode = …` throws a `TypeError` **every time the pp-mode item is clicked**. The cure is `stored.ppMode`, a runtime change. **This is the single most valuable thing the gate hole was hiding, and it is handed to the dock/menu packet intact.** |
| B-2 | `demo/components/instrument/keyframes/KeyframesEditor.vue:38, :43` | TS2339 | **KC-37.** The Slider reads AND writes `frame.start.value` over `KeyframeSelector`, a **`Readonly` union** whose `named` arm has no `value` ⟨`@mkbabb/value.js/dist/subpaths/css.d.ts:210-217`⟩. The read is `undefined` on a named selector; the write mutates a value the library declares immutable. Correct cure = narrow the arm and stop mutating a readonly library type — a modelling change the **CARD-UNIT / keyframes packet** owns (the spec books KC-37 as a *witness* here, and its sibling KC-17 explicitly as *"the witness, never the cure"*). |

---

## C · CLASS 3 — F-1, the substrate (1 `src/` diagnostic + ALL 24 `proof:structure` violations)

**The wave record's F-1 is confirmed and WIDENED by measurement: F-1 reds TWO of `check`'s three legs,
not one.**

| leg | command | reading at this unit's close | F-1's share |
|---|---|---|---|
| 1 | `vue-tsc --noEmit -p tsconfig.json` | 13 `error TS` | **1 of 13** — `src/animation/group/composite-storage.ts(2,32) TS2307: Cannot find module './composite-state'` |
| 2 | `tsc --noEmit -p tsconfig.test.json` | **exit 0** | none |
| 3 | `npm run proof:structure` | **FAIL: 24 violations on scope=src (R6×24)** | **24 of 24** — ⟨`npm run proof:structure \| grep -E '^\s+R[0-9]' \| sed -E 's/^ *R[0-9] *//' \| sort \| uniq -c`⟩ → `14 src/animation/compile/value-ast.ts` · `6 src/animation/compile/interp-slot.ts` · `2 src/animation/group/composite-storage.ts` · `2 src/animation/compile/compiled-frame.ts` (double-run identical) |

**All four files are untracked, exist at no committed coordinate, are named by no §Bounds row, and are
the residue of KF.W0's §B-12 absorption.** This unit did not delete, edit, `.gitignore`, move or
gate-wrap them, and did not widen any flag to tolerate them. **Leg 3 was RED before this unit opened
and is RED for reasons this unit did not author** — the `&& npm run proof:structure` tail survives
verbatim, as R2-3 requires, which is exactly why the substrate's state is now visible.

**Routing: ORCHESTRATOR / TRIUMVIRATE**, with the wave record's three named dispositions unchanged —
(i) the owner's hand removes them as a §B-12 tail; (ii) the same hand moves them outside `src/`;
(iii) KF.W4 books G-KFW4-1 `GREEN-EXCEPT-F-1` with the residue named. **This seat takes none of the
three; it measures and reports.**

---

## D · The gate reading this file supports

**G-KFW4-1: RED — wired, not green.** The chassis is landed and load-bearing (`check` leg 1 is
`vue-tsc`, legs 2 and 3 verbatim, the `any`-shim narrowed, an SFC can now fail a build — proven by the
63 real SFC diagnostics the day-one run produced). Exit 0 is reachable only after (A)'s eight producer
rows, (B)'s two behavioural rows and (C)'s substrate act land. **No seat of this unit staged a RED gate
and called it green.**
