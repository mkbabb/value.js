SERVED MODEL: claude-opus-5[1m]

# OP-5 — G-KFW9-9's redundancy ground, RE-DERIVED at the frontier, both selectors

**Seat**: X.KF.W13.**`.c`** (repair round 1, dispatched against `## Check 1`'s **H-1**).
**Written BEFORE the act** (spec `KF-W13.md:166` — *"re-derive the redundancy ground … before"*;
`§Commit plan 3` puts this receipt's sha ahead of the act's).
**Substrate**: keyframes.js `master` `05c577ed` (local == remote at this seat's open), glass-ui
**7.0.0** installed, READ-ONLY.
**Date**: 2026-09-20. Every figure below was produced by re-running its own command at this seat,
twice; a figure printed once was identical on both runs.

## 1 · What was inherited, and what it asserts

KF-W9's own words, read whole at `docs/tranches/X/keyframes/waves/KF-W9.md`:

- `:238` **G-KFW9-9** — witness pair `design-idioms.css:76-79` (`.focus-ring:focus-visible`) AND
  `playback-idiom.css:72-75` (`.btn-playback:focus-visible`), *"both unlayered `outline: none` —
  different selectors, same (0,2,0) specificity … under WHC no glass Button demo-wide has ANY focus
  indicator (WCAG 2.4.7/2.4.11)"*. The **AFTER witness** is *"re-shot here once KF.W13's act lands
  (S-9 discipline); until then it reads UNMEASURED, never inherited."*
- `:130` **D-3 + DU-M-1** — *"the bank's stated ground, **'both demo copies are wholly redundant
  against producer `base.css`'s identical rule'**, is asserted for a selector the producer does not
  ship. RE-DERIVATION OBLIGATION, carried to the acting wave: the redundancy ground for
  `.btn-playback:focus-visible` is UNTESTED here and must be re-derived at KF.W13 **before** the
  deletion lands."* **CURE LOCK (ruling 2)**: *"the complete cure is two deletions, K-5 SUSTAINED,
  ONE act, never split."*
- `:488` — the blast radius, corrected at repair round 4: **4 class-consumers for `.focus-ring`
  across 4 files** and **4 class applications plus one selector-string registry entry for
  `.btn-playback`, over a 7-file radius**; *"the `--focus-ring-shadow` token consumers are NOT class
  consumers."*

KF.W6's ruling, read where it lives — **in the tree, at `demo/styles/design-idioms.css:77-105`**
(KF-KE-30, `a6418729`): the demo's rule is renamed `.kf-focus-ring` because glass-ui 7.0.0 ships a
**realized** `.focus-ring:focus-visible` in `@layer components`, and *"the forced-colors arm below is
NOT decoration … the demo carries its own restoration so the indicator survives the rename —
G-W6-6's 'visible indicator in ordinary AND forced-colors', both arms."*

**So the two halves are no longer the same object.** One was renamed and given parity by a ruling;
the other stands exactly as banked. The re-derivation below is run **per selector**, against the
producer's installed bytes, and it does not take the bank's word for either.

## 2 · The producer, measured (READ-ONLY; not one byte written under `node_modules/`)

| # | ⟨cmd⟩ | output (run 1 · run 2) |
|---|---|---|
| P-1 | `grep '"version"' node_modules/@mkbabb/glass-ui/package.json` | `"version": "7.0.0",` · same |
| P-2 | `grep -o '.\{120\}focus-ring.\{120\}' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js` (via `python3` find, the minified chunk) | `… x = r(() => e(` **`"button tap-squish focus-ring"`** `, g.value && "glass-wash glass-capsule", …, p.class))` · same |
| P-3 | `grep -n '\.focus-ring' node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css` | `:1` inside `@layer components { … .focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); } … }` · same |
| P-4 | `grep -n '\.focus-ring' node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css` | `:1` inside `@media (forced-colors: active) { .focus-ring:focus-visible, .interactive-item:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px; } … }` · same |
| P-5 | `grep -c '@layer' …/utilities/a11y-overrides.css` · `… /utilities/base.css` | **0 · 0** and **1 · 1** — the producer's forced-colors restoration is **UNLAYERED**; its ordinary-mode ring is **LAYERED** |
| P-6 | `head -c 600 …/dist/styles/accessibility.css` and `index.css` | `index.css` ends `@import "./accessibility.css";` → `accessibility.css` opens `@import "./glass/a11y-fallback.css"; … @import "./utilities/a11y-overrides.css";` — both sheets ARE loaded by `@import "@mkbabb/glass-ui/styles"` |
| P-7 | `grep -n 'import' demo/styles/style.css \| head -12` and `grep -rn 'playback-idiom' demo/styles/` | `style.css:3 @import "@mkbabb/glass-ui/styles"` → `:14 @import "./design-idioms.css"` → `design-idioms.css:10 @import "./playback-idiom.css"`. **Every demo byte cascades AFTER every producer byte.** |

**P-2 is the finding the bank never had.** Every glass `Button` renders `focus-ring` **in its own
class list**. The producer does not ship a `.btn-playback` rule (it cannot; the class is the demo's)
— but it does ship the ring, on the very element, through a class it applies itself.

## 3 · The subjects, censused (LAW A census 3 — both selectors, pasted together)

**`.btn-playback` (the playback half).** ⟨cmd⟩ `grep -rn 'btn-playback' demo | grep 'class'` → **7 ·
7** lines, of which **5 are class applications** and 2 are prose (`playback-idiom.css:5`,
`KeyframeTimeline.vue:55`). The five, each host read at its own bytes:

| # | site | host element |
|---|---|---|
| 1 | `demo/components/playback/PlaybackRibbon.vue:70` | `<Button class="btn-playback btn-playback-accent">` |
| 2 | `demo/components/playback/PlaybackRibbon.vue:80` | `<Button class="btn-playback rounded-full gap-2">` (`sed -n '79,83p'`) |
| 3 | `demo/scenes/spring/SpringScene.vue:225` | `h(Button, { class: "btn-playback btn-playback-accent", … })` |
| 4 | `demo/scenes/spring/SpringScene.vue:254` | `h(Button, { class: "btn-playback w-full gap-2", … })` |
| 5 | `demo/scenes/spring/StartingStyleTarget.vue:58` | `<Button class="btn-playback btn-playback-accent shrink-0">` |

**FIVE of five are producer `Button`s** — so all five carry `focus-ring` by P-2. File radius ⟨cmd⟩
`git grep -l 'btn-playback' HEAD -- demo | wc -l` → **8 · 8** (the frontier denominator; RULINGS-4's
**7** quoted beside it and amended nowhere — E-3), the eighth being KF.W7's `KeyframeTimeline.vue`,
**counted, routed, never edited**, and it applies the class **nowhere** (its three hits are prose).

**`.kf-focus-ring` (the counterpart).** ⟨cmd⟩ `grep -rn 'kf-focus-ring' demo | grep -c 'class'` →
**11 · 11**; the applications sit on `SquareScene.vue:61` · `AmigaScene.vue:49` ·
`SequenceScrubber.vue:24` · `SequenceTarget.vue:148` · `SpringTarget.vue:105` ·
`SpringHeatmap.vue:46` · `ChannelOptions.vue:433` · `KeyframeCard.vue:255` · `TimelineCaret.vue:69`
and `:106` · `TimelineTrack.vue:43`, `:109`, `:195`. **Not one is a glass `Button`** — they are
`div`/`canvas`/rail/caret/text-entry hosts, i.e. exactly the *"demo's own BESPOKE focusables"* the
KF-KE-30 block names. **None of them wears the producer's `.focus-ring`**, by construction: the
rename is what took them off that selector (KF.W6's stated mechanism).

## 4 · The derivation, per selector

### 4.1 · `.btn-playback:focus-visible` (`playback-idiom.css:74-77`) — REDUNDANT in ordinary mode, HARMFUL in forced-colors

Bytes at open (⟨cmd⟩ `sed -n '74,77p' demo/styles/playback-idiom.css`, `grep -n 'outline' …` → the
file's **only** `outline` declaration outside `.b`'s D-12 block is `:76`):

```css
.btn-playback:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
}
```

**Ordinary mode.** Producer `@layer components` (P-3) already paints
`box-shadow: var(--focus-ring-shadow)` on the same element, because that element carries
`focus-ring` from the Button's own class expression (P-2) — all five subjects, §3. The demo rule is
unlayered, so it wins the cascade; but it wins it with the **identical token value** and the
**identical `outline: none`**, and it declares **no `border-radius`**, so the producer's
`border-radius: var(--radius-pill)` was binding through the layered rule already and keeps binding.
**Deleting it is pixel-identical in ordinary mode.** This is the redundancy the bank asserted — and
it is true, but **NOT for the reason banked**: the producer ships no `.btn-playback` rule (KF-W9's
own correction at `:130` is right). It ships the *class the host already wears*. The ground is
re-derived and **HOLDS in its corrected form**.

**Forced-colors mode.** `box-shadow` does not paint. The producer's restoration (P-4) is
**UNLAYERED** (P-5: `@layer` count **0**) and lists `.focus-ring:focus-visible` at
`outline: 2px solid Highlight; outline-offset: 2px`. The demo's rule is also unlayered, is the same
**(0,2,0)** specificity, and cascades **later** (P-7: producer at `style.css:3`, the demo's sheet
reached at `:14` → `design-idioms.css:10`). **Later, equal specificity, unlayered → the demo's
`outline: none` wins and erases the producer's Highlight outline.** That is G-KFW9-9's WHC finding,
reproduced here from the bytes rather than inherited: **no glass Button wearing `.btn-playback` has
any focus indicator under forced-colors.** The rule is not merely redundant — **it is the defect**,
and it is the ONLY thing standing between these five buttons and a producer indicator that already
exists.

**Output: DELETE.** The safety predicate is not a line count (LAW A): it is §3's five-of-five
producer-`Button` census × P-2 × P-4. After the deletion the ring is painted by
`.focus-ring:focus-visible` in both modes, by the producer, on the same element.

### 4.2 · `.kf-focus-ring:focus-visible` (`design-idioms.css:106-116`) — NOT redundant, NOT defeating, RULED LOAD-BEARING: it STAYS

Bytes at open: the rule (`:106-109`) **plus its own** `@media (forced-colors: active)` parity block
(`:111-116`, `outline: 2px solid Highlight; outline-offset: 2px`) — ⟨cmd⟩
`sed -n '106,116p' demo/styles/design-idioms.css | grep -c 'outline'` → **3 · 3**.

1. **Redundancy: FALSE.** Its 11 hosts (§3) are bespoke `div`/`canvas`/rail/caret/text-entry
   surfaces. None wears `focus-ring`, so **no producer rule matches them**. Deleting it leaves them
   with **no focus indicator in either mode** — a WCAG 2.4.7 regression manufactured by the act
   itself.
2. **K-5's ground — *"both copies defeat the producer's forced-colors outline"* — NO LONGER HOLDS
   for this half.** It cannot defeat a producer rule that does not match its hosts, and it supplies
   the Highlight outline itself at `:111-116`. **KF.W6 `a6418729` already cured this half**, by
   rename + parity, and ruled the parity arm load-bearing in the file
   (`design-idioms.css:93-98`: *"The forced-colors arm below is NOT decoration … the demo carries
   its own restoration so the indicator survives the rename"*).
3. **OP-5 anticipated exactly this**: *"lands whatever the re-derivation finds as ONE commit naming
   both stylesheets (a deletion, **or the forced-colors parity the counterpart already carries**) —
   never a silent single-file edit where the bank named two, and **never a deletion of a rule KF.W6
   ruled load-bearing without saying so**."*

**Output: NOT DELETED — and said so, in the file.** The counterpart's byte in this act is the
**dated ledger paragraph** recording that the pair was re-derived, that this half is the surviving
authority, and why K-5's ground has lapsed **here and only here**. The act therefore names both
stylesheets in one sha (K-5's lock honoured at its own terms: *one deletion fixes nothing* — the act
is one, and neither half is touched in ignorance of the other), and the pair stops being two copies
of one rule: it is now **one producer contract (`.focus-ring`) for producer controls** and **one
demo contract (`.kf-focus-ring`) for bespoke focusables**, each carrying both modes.

## 5 · The act this derivation authorises

ONE commit, both stylesheets:

1. `demo/styles/playback-idiom.css` — the `:74-77` rule **deleted**, replaced by a comment naming
   the act, the ground and the surviving authority (the N-3 precedent at `:78-81`).
2. `demo/styles/design-idioms.css` — the `:106-116` counterpart **kept**, with the dated
   re-derivation ledger written beside it inside the carve.

Then, in its own sha, the focus-affordance case in
`test/demo/instrument/playback-ribbon-contract.test.ts`, and the AFTER witness handed to
**KF.W9 / SS-13** by row id (`G-KFW9-9`).
