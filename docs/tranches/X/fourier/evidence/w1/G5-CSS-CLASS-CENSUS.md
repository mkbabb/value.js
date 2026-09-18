SERVED MODEL: claude-opus-5[1m]

# G5 — THE P0 CSS-CLASS CENSUS, over the WHOLE emitted roster at the adopted pin

**Gate**: `waves/F-W1.md` §3 `G5` `:251` · **rows**: WU-D `:84-90` (`B-2` · `MG-β` · `FR-EQC-3/K-13`
· `FR-NP-13`) · **collision**: `AA-15` · **contingency**: `fr-GalleryMarquee GM-19`.
**Unit**: `c`. **Date**: 2026-09-17. **Pins**: installed **4.0.0** ⟷ adopted **`v8.0.0` @ `17a11bc5`**.

**Locks honoured.** The operand is the **WHOLE emitted roster at the adopted pin**, never a
two-file subset. `.btn-pill` is read as **producer roster ⟷ local shadow**, never a consumer grep.
**AA-15's cure/break collision is reconciled in writing (§3) BEFORE either side executes.**
`a11y-overrides.css` is **re-read at the target** (§5) — the re-read, not the cure.

---

## §0 THE CENSUS DIFF, BOTH DIRECTIONS

§4's Cadence names the evidence item *"G5 census diff **both directions**"*. They are:

| direction | question | where it is answered |
|---|---|---|
| **→** consumer-applied ⟶ target roster | *which glass-ui-owned class that fourier applies has no rule at `17a11bc5`?* | §2, one subsection per class, with the producer roster read at **both** pins and the consumer surface counted in the three units of §2 |
| **←** target roster ⟶ consumer | *what does the target publish that the broken applications can land on?* | §2.1 (`--paper-clean-texture` ⊕ `--paper-texture-size` survive ⇒ the restore arm is executable) · §2.2 (`text-micro` · `text-mono-micro` · `text-caption` weighed, with the 10px→11px delta disclosed) · §2.3 (`cartoon-surface` survives ⇒ fourier's shim survives) · §2.4 (`--radius-pill` survives ⇒ FR-NP-13 re-tokens) |

The **←** direction is what makes §4's split decidable: a break whose successor exists at the target
is a **consumer re-target**; a break with no successor is **producer-owned** and leaves on NWO-1.
Running only **→** would have returned four breaks and no dispositions.

---

## §1 THE DISCRIMINATOR, RUN IN BOTH FORMS — and the LAW vindicated on all four classes

`fr-PaperSidebar M3` supplies the census's one-command discriminator:
*"`grep -c '<class>' components.css glass-ui.css`; 0/0 ∧ absent from `web/src` ⇒ not painting."*
G5's own cell then corrects it into a LAW rather than a recipe, on the strength of one measurement
against `.btn-pill`. **This seat ran both forms against all four classes.** Both named operands
exist in the installed dist (`glass-ui.css` **42,082 B** · `styles/components.css` **60,076 B**), so
neither zero below is a missing-file artefact.

| class | **M3 two-file form** @4.0.0 | **WHOLE emitted roster** @4.0.0 | `web/src` | would M3 have been right? |
|---|---|---|---|---|
| `.paper-texture` | `components.css` **0** / `glass-ui.css` **0** | **6 artefacts**, incl. a live rule at `styles/cards.css:10` | 1 | **NO** |
| `text-admin-label` | **0** / **0** | **3 artefacts**, incl. `@utility` at `styles/typography/semantic.css:213` | 7 | **NO** |
| `.cartoon-card` | **0** / **0** | **1 artefact** — and it is a **comment** (`styles/cards.css:2`) | 24 | yes, by accident (§2.3) |
| `.btn-pill` | **0** / **0** | **8 artefacts** | 0 | **NO** |

Double-run of the whole-roster column: `6 · 3 · 1 · 8` twice, identical.

> **The two-file discriminator returns `0/0` for every one of the four classes and is wrong on
> three of them.** §2·R2b.3's seat correction proved this for `.btn-pill`; it holds for the whole
> class-set. R2-9's clause — *"a shape-restricted operand is defective at authoring whatever it
> returns"* — is therefore not a caution about one probe but a measured property of this one, and
> G5's operand below is the whole roster in every row.

The eight `.btn-pill` artefacts reproduce the spec's own eight-name list exactly:
`button-BNDWhAZb.js` · `styles/glass/squircle.css` · `styles/glass/surfaces.css` ·
`styles/utilities/a11y-overrides.css` · `styles/utilities/btn.css` · `styles/utilities/base.css` ·
`styles/tokens/scheme-motion.css` · `styles/tokens/offsets-sizing.css`.

---

## §2 THE CENSUS — four classes, producer roster ⟷ consumer surface, at both pins

**Consumer counting units, stated once and used throughout** (F.W0 `G-11`'s law):
**(a) class APPLICATIONS** = occurrences of the token inside a `class=`/`:class=` attribute value,
comments stripped — *the operand of any re-target*; **(b) substring occurrences** = unanchored
`grep -rn … | wc -l`, comment-inclusive — *a different object*; **(c) files** — stated for whichever
unit it qualifies.

### §2.1 `.paper-texture` — **B-2. A TRUE UPLIFT BREAK.**

| | |
|---|---|
| **producer @ installed 4.0.0** | **LIVE RULE** in `@layer components`: `styles/cards.css:10 .paper-texture { background-image: var(--paper-clean-texture); background-repeat: repeat; background-size: var(--paper-texture-size); background-blend-mode: multiply; }` ⊕ the dark arm `:17 :where(.dark) .paper-texture { background-blend-mode: screen; }` |
| **producer @ `17a11bc5`** | **NO RULE.** 4 mentions in `src`, none of them a selector: `tokens/offsets.css:106` (the token `--paper-texture-size`) · `dock/styles/dock.css:170` (a `background-size` read) · `tokens/scale-paper.css:111` and `:114` (**prose**, naming *"every downstream consumer of `.paper-texture`"*) |
| **consumer** | **1 application / 1 file** — `App.vue:24`, the app shell `<div class="… paper-texture overflow-hidden">` |
| **verdict** | **BREAKS.** The shell loses its paper ground at the hop. Silent: no import, no prop, no type, no build error |

**The cure's feasibility, measured rather than assumed.** B-2's decision is *"texture-restore vs
class-delete"*, under `fr-SvgFilters M-1/R-3`'s constraint *"never prescribe the 4.0.0 `@utility
paper-*` recipes — they paint uniform opaque black"*. At `17a11bc5`:

- the surviving `@utility paper-*` recipes are exactly **two** — `styles/paper.css:100
  paper-underpaint` and `:125 paper-grain-overlay` — and **neither is a drop-in** (the constraint
  reproduces at the adopted pin, not merely at 4.0.0);
- **both tokens the deleted rule composed SURVIVE**: `--paper-clean-texture`
  (`tokens/scale-paper.css:118`) and `--paper-texture-size` (`tokens/offsets.css:106`).

⇒ **the texture-restore arm is executable at the adopted pin as a consumer-local re-declaration of
the same four declarations plus the dark arm, built from surviving producer tokens** — no `paper-*`
recipe, no producer patch, no hardcoded data-URI. **CONSUMER RE-TARGET. Lands inside commit #4**
(§4 step 4's G5 LANDING CELL). The alternative arm (class-delete) is a design decision and is
**not** taken here; the evidence is put in front of it.

### §2.2 `text-admin-label` — **MG-β. A TRUE UPLIFT BREAK, and the worse-than-absence kind.**

| | |
|---|---|
| **producer @ installed 4.0.0** | **LIVE `@utility`**, emitted from 3 artefacts: `styles/typography/semantic.css:213-220` — `font-family: var(--font-mono)` · `font-size: var(--type-admin-label)` (`0.625rem`, `typography/scale.css:86`) · `line-height: 1` · `text-transform: uppercase` · `letter-spacing: var(--type-tracking-caps)` · `font-weight: 500`; plus `styles/typography.css` and `styles/theme/bridges.css` |
| **producer @ `17a11bc5`** | **ZERO mentions of `text-admin-label` in `src`.** `@utility` declarations: **0** (v4.0.0 **1** · v7.0.0 **1**). The **only** surviving trace is the allowlist: `src/components/_shared/class-names.ts:84` `/^text-(micro\|small\|caption\|body\|prose\|admin-label\|heading\|…)/` |
| **consumer** | **7 applications / 4 files** — `AdminFlaggedPanel.vue:176 :180 :189` · `AdminUserList.vue:376 :379` · `FrequencyGraph.vue:200` · `CoefficientsSpectrum.vue:110`. **Reproduces the banked 7/4 exactly** |
| **verdict** | **BREAKS — and MG-β's sharpest clause is TRUE AT 8.0.0**, not merely at v7: the class *"surviv[es] only as a regex-allowlist entry with no rule behind it, which is worse than absence"*. The allowlist makes `cn()` **keep** the token, so it rides into the DOM looking owned and painting nothing |

**Successor rungs, measured at the adopted pin.** There is **no byte-equivalent successor**:

| candidate @ `17a11bc5` | declaration | carries | misses |
|---|---|---|---|
| `@utility text-micro` (`typography/semantic.css:233`) | `font-size: var(--type-micro)` (`0.6875rem` = **11px**, fixed, `typography/scale.css:86`) · `line-height: 1.25` | the size rung | mono · uppercase · caps-tracking · 500 |
| **`@utility text-mono-micro`** (`typography/utilities.css:62`) | `font-family: var(--font-mono)` · `font-size: var(--type-micro)` · `line-height: 1.25` · `letter-spacing: 0.025em` | **mono ⊕ size ⊕ a tracking** | uppercase · weight 500 · the exact `--type-tracking-caps` value |
| `@utility text-caption` (`:222`) | `--type-caption` (a `clamp()`, fluid) | — | everything above, and it is **fluid** where the retired rung was fixed |

⇒ the cure is **`text-mono-micro uppercase font-medium`** (3 tokens, all live at 8.0.0), carrying a
**disclosed design delta**: **10px → 11px** and `0.025em` tracking in place of
`--type-tracking-caps`. WU-D's banked cure (*"`--type-micro`/`--type-caption` + `tabular-nums`"*)
is **refined, not contradicted**: `text-mono-micro` supplies the mono half the banked spelling
would have had to hand-patch, and `--type-caption` is the wrong arm (fluid). **CONSUMER RE-TARGET.
Lands inside commit #4.** The producer-restoration arm rides **NWO-1** and is not waited on — a
frontend re-target onto a live producer rung is a root-cause cure, not a workaround, because the
rung was **retired by producer design across two majors**, not broken by accident.

### §2.3 `.cartoon-card` — **FR-EQC-3 / K-13. NOT AN UPLIFT BREAK. The census's own premise moves.**

| | |
|---|---|
| **producer @ installed 4.0.0** | **ALREADY DEFINITION-ABSENT.** The class appears in exactly **one** emitted artefact, as a **comment**: `styles/cards.css:2` — *" \* `.cartoon-card` + `.elevated-card` recipe classes were removed at C.W5 per the …"*. v4.0.0 source: the same single comment line |
| **producer @ `17a11bc5`** | absent (0 mentions in `src`) |
| **consumer** | **18 class applications / 12 files**; **24 substring occurrences / 14 files**; fourier's **own shim** at `style.css:107` — `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }` |
| **`cartoon-surface`, the shim's base** | **SURVIVES the hop**: installed dist `styles/cards.css:33 @utility cartoon-surface`; `17a11bc5` `src/components/card/styles.css:256 @utility cartoon-surface` |
| **verdict** | **NO UPLIFT BREAK.** The class died at glass-ui **C.W5, before the installed pin**, and fourier already shimmed it. Because `cartoon-surface` survives at `17a11bc5`, **the shim survives the hop untouched** |

This confirms `fr-BasisCanvas D-corpus-C-1` (§2·R2a.3) at the adopted pin — *"`cartoon-surface`
SURVIVES the 4→7 uplift, so this family is a design ask at the hop and not a build break"* — and it
means **G5 returns NOTHING for this class that commit #4 must land.** `KILL-6` stands untouched
(`<Card tier="opaque" surface="cartoon">` remains unspellable at the target), and the retire-vs-adopt
ordering is **G17's ruling at unit `f`**, executing at F.W3 / F.W4.

**The three counting units, published side by side** (§Baseline finding 2 routed this here):

| unit | value | what it is |
|---|---|---|
| **class applications / files** | **18 / 12** | the operand of any re-target — **the load-bearing figure** |
| substring occurrences / files | **24 / 14** | unanchored; the 6 non-applications are `style.css:98 :99 :101` (shim comments) ⊕ `style.css:107` (the shim's own `@utility`) ⊕ `VisualizationView.vue:192` ⊕ `GalleryCardModal.vue:247` (consumer comments) |
| banked census of record | **21 / 14** | **the file count reproduces exactly**; the occurrence unit is not recoverable from these bytes. **Superseded, not averaged, not re-graded** |
| the shim's own comment | *"14 application sites (13 files; one uses it 5 times)"* | **also superseded** — measured **18 / 12**; `EquationView.vue` is the file with 5. FR-EQC-3 already grades this comment wrong (*"shim's '14' and lane's '25' both wrong"*); the correction is that **both** of its numbers are low |

### §2.4 `.btn-pill` — **FR-NP-13. PRODUCER-SIDE DELETION, ZERO CONSUMER CLASS LITERALS.**

Read as the lock requires — **producer roster ⟷ local shadow, never a consumer grep**:

| | |
|---|---|
| **producer roster @ installed 4.0.0** | emitted from **8** artefacts (§1). The `Button` cva **base string** composes it: `button-BNDWhAZb.js` — `"btn-pill tap-squish focus-ring whitespace-nowrap …"` |
| **producer roster @ `17a11bc5`** | **0 mentions in `src`.** The Button's geometry moved to `.button` + `[data-size]` (`components/button/styles.css`), and the coarse-pointer floor moved off `.btn-pill` entirely (§5) |
| **local shadow** | `NotationPills.vue:36-41` — `.notation-pill { border-radius: 9999px; min-width: 4.5rem; justify-content: center; }`. **`:38` hardcodes `9999px`**, exactly as FR-NP-13 banks |
| **consumer class literals** | **0** in `web/src` — as the gate's own text states |
| **`--radius-pill`** | **survives**: `17a11bc5 src/styles/theme/radius.css:116 --radius-pill: 9999px` |
| **verdict** | **NO CONSUMER BREAK, and the row's live half is the shadow.** Nothing in `web/src` applies `.btn-pill`, so the producer's deletion strands no class literal. What it does is make `:38` **load-bearing**: the 21 `variant="outline"` pill buttons stop inheriting the producer's pill geometry, and `.notation-pill`'s own `9999px` becomes the only source — hardcoded past a token that is numerically identical **today** and unowned **tomorrow** |

**Anchor drift, recorded with INTENT at the true bytes** (never guessed): the banked coordinate is
*"`:38/:40`"*. At the settled bytes the geometry block is **`:37-41`**, `:38` **is** the
`border-radius: 9999px` line the row names, and `:40` is `justify-content: center` — a member of
the same block, not a second geometry source. **The row's intent — one local block, one hardcoded
radius — is exact; its second coordinate names the block's interior.**

**Disposition: KEEP KNOWINGLY, RE-TOKENED.** `:38` becomes `border-radius: var(--radius-pill)` — a
one-declaration consumer edit onto a token live at **both** pins, which is precisely FR-NP-13's
*"Keep the local declarations knowingly, or re-token"* with the second arm taken because the token
exists. **CONSUMER RE-TARGET. Lands inside commit #4.**

---

## §3 AA-15's CURE/BREAK COLLISION — RECONCILED IN WRITING, BEFORE EITHER SIDE EXECUTES

G5's own clause: *"**AA-15's cure/break collision reconciled inside this gate**"*; WU-D's MG-β row:
*"**IDENTITY COLLISION: AA-15 books this class as a CURE — G5 must reconcile cure-vs-break before
either executes.**"* Unit `a` handed this forward measured-live at the adopted pin.

### §3.1 The two rows, and the collision stated exactly

- **`MG-β`** (`fr-App`, home **F.W1**, this gate): `text-admin-label` is a live `@utility` at the
  installed pin, applied at 7 sites / 4 files, and at the target is **an allowlist ghost with no
  rule**. It is a **BREAK**.
- **`AA-15 · D-M8`** (`fr-AdminAuditLog`, home **F.W4**, MAJOR): `text-[0.65rem]` is an off-scale
  magic 10.4 px / 11.7 px on the two least-legible columns (`AdminAuditLog.vue:134,:143`). Its
  banked **CURE is to adopt `@utility text-admin-label`** — and that cure exists because
  `fr-AdminAuditLog K-1` **killed** D-M8's *"no rung exists"* falsifier on the ground that
  *"the installed pin ships `@utility text-admin-label`"*.

**The collision**: at the adopted pin the rung AA-15's cure adopts **does not exist**. Executing
AA-15 as banked would **add two more application sites of the very class MG-β books as broken**,
taking the break class from **7 sites / 4 files to 9 sites / 5 files** — a cure that manufactures
more of the defect the sibling row is here to retire.

### §3.2 The measurement that decides it

| pin | `@utility text-admin-label` declarations in `src` |
|---|---|
| v4.0.0 | **1** |
| v7.0.0 | **1** |
| **`17a11bc5`** | **0** |

(Counting unit: `@utility` DECLARATIONS. The line-count unit over `src/styles` reads **5 · 5 · 0** —
see §6.2. Both units agree on the only thing that matters: **0 at the adopted tag.**)

### §3.3 THE RECONCILIATION — four rulings, in force in this order

1. **`fr-AdminAuditLog K-1`'s kill INVERTS at the adopted pin, and only its premise moves.** The
   falsifier *"no rung exists"* was killed because a rung shipped at the installed pin. At
   `17a11bc5` **no rung exists** — for that spelling. **AA-15's DEFECT stands unchanged** (the
   off-scale `text-[0.65rem]` is a fourier fact, independent of any producer pin); **AA-15's CURE is
   DEAD AS BANKED.** This is a re-baseline of a premise, **not** a re-grade of a severity, and no
   registry file is touched (E-3).
2. **AA-15 MUST NOT execute as written at F.W4.** Adopting `text-admin-label` at `:134,:143` would
   ship two sites of a class that paints nothing and that `class-names.ts:84` will not strip.
3. **ONE RUNG, DECIDED ONCE, HERE.** MG-β's consumer re-target (§2.2) chooses the successor —
   **`text-mono-micro uppercase font-medium`** — and lands at **7 sites / 4 files inside commit
   #4**. **AA-15 at F.W4 then re-points its two sites onto that same successor**, never onto
   `text-admin-label`. The two rows stop colliding because they stop naming the same dead token.
4. **ORDER IS BINDING: MG-β (F.W1) FIRST, AA-15 (F.W4) SECOND.** The reverse order lands AA-15's two
   sites on a rung F.W1 is about to retire, which is the collision executing rather than being
   reconciled.

**What this reconciliation deliberately does not do**: it does not re-grade AA-15 (MAJOR stands),
does not move its home (F.W4 stands), does not cancel the producer-restoration ask on NWO-1 (a
restored `@utility` would make the re-target redundant, not wrong), and does not decide the 10px →
11px design delta — that is stated in §2.2 as a disclosed consequence for the close to carry.

---

## §4 THE SPLIT — consumer re-targets (commit #4) vs producer-owned (NWO-1)

§4 step 4's **G5 LANDING CELL**: *"if the P0 CSS-class census returns consumer re-targets … those
edits land inside commit #4 … if it returns producer-owned cures instead, they leave on NWO-1 and
no consumer edit exists to land (a frontend workaround for a producer defect is a wave defect)."*

### §4.1 CONSUMER RE-TARGETS — land inside commit #4, as a limb's resolution

| # | edit | sites / files | why it is a re-target and not a workaround |
|---|---|---|---|
| **R1** | `.paper-texture` **texture-restore**: re-declare the four declarations ⊕ the `:where(.dark)` arm locally, composed from the surviving producer tokens `--paper-clean-texture` ⊕ `--paper-texture-size` | **1 application** (`App.vue:24`); the declaration block lands in `web/src/style.css` | The producer retired the RULE and kept the TOKENS. Consuming the tokens directly is the producer's own published seam, not a shim around a producer defect |
| **R2** | `text-admin-label` → **`text-mono-micro uppercase font-medium`** | **7 / 4** — `AdminFlaggedPanel.vue:176 :180 :189` · `AdminUserList.vue:376 :379` · `FrequencyGraph.vue:200` · `CoefficientsSpectrum.vue:110` | The rung was retired by producer design across two majors. Re-pointing onto a live producer rung is the root-cause cure |
| **R3** | `NotationPills.vue:38` `9999px` → `var(--radius-pill)` | **1** | `--radius-pill` is live at both pins. Re-tokening is FR-NP-13's own second arm |

**Three edits, 9 application sites, 6 files.** None of them presumes a hop beyond the adopted pin;
all three are correct at `17a11bc5` and R3 is additionally correct at 4.0.0.

### §4.2 PRODUCER-OWNED — leave on NWO-1, no consumer edit exists to land

| row | ask | status |
|---|---|---|
| **MG-β / FR-NP-32-adjacent** | restore `@utility text-admin-label`, **or** state the retirement and name the successor rung with its uppercase/weight treatment | **already on NWO-1** (sent by unit `b`, `70a87e7e`). §4.1 R2 is landed regardless: **the wave does not wait on the producer**, and if the rung is restored R2 becomes redundant, never wrong |
| **`.paper-texture`** | none filed, and **none is owed**: the tokens survive and the rule's retirement is coherent producer design | — |
| **`.cartoon-card`** | none — **not an uplift break** (§2.3) | — |
| **`.btn-pill`** | none — the deletion strands no consumer class literal (§2.4) | — |

**Nothing in §4.1 is a frontend workaround for a producer defect.** Each of the three lands on a
token or utility the producer **publishes at the adopted pin**; the one genuinely producer-owned
question (whether the admin-label rung should exist at all) is already in flight on NWO-1 and does
not gate the hop.

---

## §5 GM-19's RE-READ AT THE TARGET — OWED, PERFORMED, and it returns NO NEW CONSEQUENCE

G5's RE-READ OBLIGATION (`fr-GalleryMarquee GM-19`'s F.W1 contingency, §2·R2b.4): *"the census
re-reads `a11y-overrides.css` **AT THE TARGET** to decide whether the reduced-motion specificity
defect gains a painted consequence; **F.W1 owes the re-read, not the cure**."*

GM-19: the marquee's PRM guard targets `.marquee-inner` (0,2,0 scoped) while the animation is
declared on `.marquee-left/.marquee-right .marquee-inner` (0,3,0) — the guard **has never won**.
Painted consequence at the installed pin: **nil**, double-masked by (i) the dead mount and (ii) the
producer's `!important` PRM blanket.

**The re-read**, `src/styles/utilities/a11y-overrides.css` (installed **169** lines · `17a11bc5`
**137** lines):

| pin | the blanket |
|---|---|
| installed 4.0.0 | `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important } … transition-duration: 0.1s !important … }` ⊕ a separate `[data-allow-motion]` arm |
| **`17a11bc5`** | `@media (prefers-reduced-motion: reduce) { **`*`, `*::before`, `*::after`** { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0s !important } }` |

**VERDICT: the masking SURVIVES and BROADENS.** The 8.0.0 blanket is an **unconditional** `*`
selector — the `:not([data-allow-motion])` carve is gone from the PRM arm by explicit producer
ruling (*"accessibility is absolute: `[data-allow-motion]` is NOT carved out here"*), so it reaches
strictly more elements than the installed form. An unlayered `!important` on `*` still outranks an
unlayered scoped rule of any specificity. **GM-19's defect gains NO painted consequence at the
adopted pin.** Masker (ii) holds. Masker (i) also holds: `./scrolling-text` is **absent at
`17a11bc5`**, so `GalleryMarquee` still renders nowhere (FR-GFC-9).

**Two nuances recorded for the successor, neither a cure and neither owed here:**
1. At 8.0.0 the producer enumerates a **narrow PRM-AUTHORIZED-SET** that beats the fallback **by
   cascade LAYER, not specificity** (layered `!important` inside `@layer components` beats unlayered
   `!important`). **A consumer rule placed inside a layer could therefore defeat the blanket** — a
   real future route to a painted consequence, which did not exist at the installed pin. Routed to
   F.W4 with GM-19, as a changed hazard, not a changed verdict.
2. The blanket's transition clock moved **`0.1s` → `0s`** and the `transition-property` mint was
   deliberately dropped (the producer names it *"the resurrection vector"*). Nothing in fourier
   reads it; recorded because it changes what PRM does to every fourier surface at the hop, which
   the WU-F diff-review ledger (unit `f`) is the right home for.

**This gate stamps the re-read and nothing else**, exactly as the contingency says.

---

## §6 Corrections travelling as dated rows (E-3 — no dated artefact rewritten)

1. **`.cartoon-card` is not an uplift break** (§2.3). WU-D's cell and the whole G5 born-RED read it
   as one of *"four proven instances"* of the import-blind break class. It is a **pre-existing**
   absence, already shimmed locally, whose shim **survives the hop** because `cartoon-surface`
   survives. The class stays in the census as a **measured NIL**, which is a census result, not an
   omission.
2. **`text-admin-label` line-count vs declaration-count** (unit `a`'s residual 3, discharged). Over
   `src/styles`: **v4.0.0 5 · v7.0.0 5 · `17a11bc5` 0** matching LINES; `@utility` DECLARATIONS:
   **1 · 1 · 0**. `fr-FrequencyGraph`'s banked *"4 hits"* is a third unit. **The declaration count
   is the load-bearing one, and at the adopted tag every unit agrees on 0.** Unit `a`'s enumerated
   five lines at v7.0.0 are reproduced here at v4.0.0 as well — the drift is not a v7 artefact.
3. **`FR-NP-13`'s `:38/:40`** — INTENT taken at the true bytes, block `:37-41` (§2.4).
4. **The `.cartoon-card` shim's own comment** (`style.css:101`) understates its own consumption
   (*"14 application sites (13 files)"* vs measured **18 / 12**). It is fourier's byte and its
   correction belongs to whichever wave next opens `style.css` — **R1 in §4.1 is exactly that
   wave**, so the comment is corrected in the same edit (`fr-ContourPreview`'s *"shim's stale
   comment corrects in the same edit"*, WU-F `:114`).
5. **The M3 discriminator is a LAW, not a recipe** (§1), on four-for-four evidence rather than one.
