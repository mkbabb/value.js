# DESIGN-CANON CENSUS — seat C (excavation, Opus banausic band, M-14)

**modelObserved: `claude-opus-5[1m]`** (self-report; `$ANTHROPIC_MODEL` is unset in this shell —
`echo "MODEL_ENV: ${ANTHROPIC_MODEL:-unset}"` → `MODEL_ENV: unset`, so the harness string is the
only receipt available and is labelled as such).

**Seat:** READ-ONLY sweep of the constellation's design canon. Zero bytes written outside
`docs/tranches/V/megatranche/excavation/`. **Repos read:** `value.js`, `glass-ui`, `keyframes.js`,
`fourier-animate`, `fourier-analysis`, `colors`, plus every top-level `*.jsonl` under
`~/.claude/projects/*/` (owner-typed text only; `subagents/` never opened).

**Evidence rule honoured:** every row below carries a `file:line` quote or a pasted command +
output. Nothing here rests on memory recall.

**HEAD at census:** `c654824e` (branch `tranche-u`).

---

## §0 · THE HEADLINE

> **All three of the owner's design-canon terms are undefined inside value.js. `GOLDEN GLASS`
> has no definition anywhere in the constellation — the owner typed it exactly once, on
> 2026-07-27, three hours before this formation opened. And the value.js design corpus is
> orphaned in both directions: `demo/DESIGN.md`, `VISUAL-CONSTITUTION.md` and vnext's
> `DESIGN-PROGRAM.md` do not cite one another, and the megatranche's entire adjudicated corpus
> (`ROOT-FINDINGS.md` + `SCOPE.md` + `AUDIT-PLAN.md` + `STATE.md`) cites *none* of them — 0
> occurrences in all twelve cells.**

```
$ for f in registry/ROOT-FINDINGS.md SCOPE.md AUDIT-PLAN.md STATE.md; do
    echo "$f: DESIGN.md=$(grep -c 'DESIGN\.md' $f) VISUAL-CONSTITUTION=$(grep -c 'VISUAL-CONSTITUTION' $f) DESIGN-PROGRAM=$(grep -c 'DESIGN-PROGRAM' $f)"; done
registry/ROOT-FINDINGS.md: DESIGN.md=0 VISUAL-CONSTITUTION=0 DESIGN-PROGRAM=0
SCOPE.md:                  DESIGN.md=0 VISUAL-CONSTITUTION=0 DESIGN-PROGRAM=0
AUDIT-PLAN.md:             DESIGN.md=0 VISUAL-CONSTITUTION=0 DESIGN-PROGRAM=0
STATE.md:                  DESIGN.md=0 VISUAL-CONSTITUTION=0 DESIGN-PROGRAM=0
```

The design MD does not need editing. It needs **re-authoring, and then wiring** — the wiring is
the larger half.

---

## §1 · THE THREE TERMS — where the canon actually lives

### 1.1 · The constellation-wide occurrence census (command + output)

```
$ for t in "golden glass" "breath of life" "movement of momentum"; do
    for d in value.js glass-ui keyframes.js fourier-animate fourier-analysis colors; do
      files=$(rg -il -g '!node_modules' -g '!*.jsonl' "$t" "$d" | wc -l)
      hits=$(rg -ic -g '!node_modules' -g '!*.jsonl' "$t" "$d" | awk -F: '{s+=$NF} END{print s+0}')
      echo "$t | $d: files=$files hits=$hits"; done; done
```

| term | value.js | glass-ui | keyframes.js | fourier-animate | fourier-analysis | colors |
|---|---:|---:|---:|---:|---:|---:|
| `golden glass` | 4 files / 6 hits | 12 / 32 | **0 / 0** | 0 / 0 | 0 / 0 | 0 / 0 |
| `breath of life` | 53 / 74 | 78 / 140 | **0 / 0** | 0 / 0 | 0 / 0 | 0 / 0 |
| `movement of momentum` | 5 / 7 | 42 / 55 | **0 / 0** | 0 / 0 | 0 / 0 | 0 / 0 |

Every one of value.js's `golden glass` hits is a *seat prompt or a fold of the owner's 07-27
message*, not a law:
`docs/tranches/V/megatranche/workflows/excavation.js:96` (this seat's own brief),
`AUDIT-PLAN.md:181`, `SCOPE.md:155`, `excavation/extracts/value-exhortations.md:750`
(a peer seat's transcription of the same owner line).

### 1.2 · **GOLDEN GLASS — NO CANONICAL DEFINITION ANYWHERE. TOP FINDING.**

Owner-typed occurrences across every top-level session log in `~/.claude/projects/`:
**exactly one authoring event**, mirrored into a second repo's session eight minutes later.

```
===== 2026-07-27T22:28:17.882Z | -Users-mkbabb-Programming-value-js | 6614e90c
Audit our consumers, think of the library gestalt, the animations, the design aestheitc (does the
design MD need re-authoring? etc). Think of our GOLDEN GLASS, BREATH OF LIFE, and MOVEMENT OF
MOMENTUM. ECOUTE-MOI: how many more ecoute-moi's must this take. …
===== 2026-07-27T22:34:29.912Z | -Users-mkbabb-Programming-sci-report | 9a86e32c   (same text)
```

That is the **whole** owner corpus for the phrase. It is invoked as if it were an established
law — *"our* GOLDEN GLASS" — and no such law exists. There is no definition in value.js,
glass-ui, keyframes.js, or any sibling.

What *does* exist in glass-ui is a **lineage** — the phrase used as a named glass *tier*, never
defined:

- `glass-ui/tests-visual/search-custom.spec.ts:5` — *"a bare `<SearchBar>` resolves the GOLDEN
  GLASS PILL — a translucent `--glass-bg-floating` fill"* (the only live-spec usage).
- `glass-ui/docs/tranches/BC/EXECUTION-DAG.md:78` — *"the golden glass tier the census measures
  against"* (also `:345`).
- `glass-ui/docs/tranches/BC/waves/BC.W-OVERLAY-UNIFORM.md:59` — *"resolves the golden
  glass-floating tier (translucent α < 0.95) + the φ pad cadence"*.
- `glass-ui/docs/tranches/BC/waves/BC.W-SEARCH-CUSTOM.md:90` — *"resolves the golden glass pill
  … NOT a flat opaque slab"*.

A prior glass-ui adjudication reached the same verdict and is worth citing because it was reached
independently, by a Fable arbiter, on the same question:

> **RULING 3 — GOLDEN GLASS: 0 definitions, but a real in-repo lineage — FABLE's "zero occurrences
> anywhere" is FALSE.** … Net: **`W-DESIGN-CANON` authors the law from a lineage, not from
> nothing**
> — `glass-ui/docs/tranches/BJ/addenda/2026-07-24-refinement/GESTALT.md:26`

The nearest thing to owner-supplied *content* for the term is the negative space around it,
transcribed from the owner's own words in glass-ui's archaeology:

> **The glass identity**: "warm cream", "deft rounding", "our color palettes, our glass" — and
> negatively, not grey, not metallic ("That disgusting metallic wash needs to be abrogated on
> every single page."), not shiny ("far too trite, shiny, and bright--not like blurred and frosted
> glass."). The corpus's literal golds are four, one register — "gold standard", "somesort of
> golden factor of 2-3x", "goldilocks of files and modules", "should we make AI a subtle, subtle,
> gold?": warm, restrained, proportioned.
> — `glass-ui/docs/tranches/BJ/addenda/2026-07-24-refinement/ARCHAEOLOGY.md:275`

**Verdict: GOLDEN GLASS is an ABSENCE, and it is the top finding of this seat.** It must be
authored — from the BC tier lineage + the four warm/restrained "gold" usages + the negative
constraints — and it must be authored in a place value.js can cite, because value.js's own
`golden` hits are proportion arithmetic (`61.8033989%`), not material.

### 1.3 · **BREATH OF LIFE — one owner-typed definitional sentence; zero occurrences in any value.js design doc**

The canonical owner-typed sentence, and its first appearance in any session log
(`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/e79fce3f….jsonl`, owner turn,
**2026-07-17T04:09:20.806Z**):

> "The grow on slider--and some of the other facilities mentioned hereof--are novel and could be
> unique to our library--we wish to BEST ios27 and others with novelty and genuine design
> affordances. **Our edict: we suffuse the breath of life into our components with affordance and
> facility to always display engagement; within our aristotelian proporition in the abstract.**"

Transcribed into a repo exactly once, in glass-ui:
`glass-ui/docs/tranches/BJ/addenda/2026-07-24-refinement/ARCHAEOLOGY.md:109` (row E20) and
`:275`. The only compressed *statement of law* form found is
`glass-ui/docs/tranches/IOS27-MICRO/analysis/NOVELTY-CRIT-DESIGN.md:61`:

> "THE BREATH OF LIFE is a verbatim-standing user law (**"every component always displays
> engagement"**)"

with its operational reading at
`glass-ui/docs/tranches/IOS27-MICRO/analysis/corpus-redo/CORPUS-STILLS-A.md:16`:

> "(1) THE BREATH OF LIFE — where engagement lives, which of the six engagement scalars the
> surface expresses (SUFFUSION-MATRIX §3.1: `--flex-vel`, `--motion-weight`, `--engage-t`,
> `--overpull`, `--impulse`, `--scrub-t`), the momentum regime"

**The value.js side.** Owner-typed, 2026-07-19T22:33 (value.js session `46328b94`), binding
value.js AND keyframes.js:

> "this is REFINING the details, errors, animation curves, **suffusing the BREATH OF LIFE from
> glass-ui** (read the BREATH OF LIFE marked by that developing tranche set) into our animations
> and items: the little things, like how our water color dots animate and change on hover, and
> procedural beget; how the slider area's slider values are stylized… Padding, margins,
> animations, etc, should be refined, and scrupulously analyzed on every screen. **In both
> kyframes.js and value.js's demos.**"

Coverage of that order in the design corpus:

| doc | `BREATH OF LIFE` | `breath` |
|---|---:|---:|
| `demo/DESIGN.md` | **0** | 1 (`:355`, "the band's breathing room" — a padding token) |
| `docs/tranches/V/VISUAL-CONSTITUTION.md` | **0** | 1 (`:31`, "At rest it breathes" — a header) |
| `docs/tranches/V/PROPORTION-AUDIT.md` | **0** | 0 |
| `docs/tranches/V/PALETTE-CONTRACT.md` | **0** | 0 |
| `docs/tranches/V/vnext/DESIGN-PROGRAM.md` | 2 | 4 — **the only value.js-side chapter** (`:170 "## Breath of Life"`) |
| **`keyframes.js` (whole repo)** | **0** | 87 (all `breathing`/`breathes` animation names — never the law) |

**Verdict: BREATH OF LIFE has a canonical owner sentence, no repo home in value.js, and the one
value.js chapter that carries it (`vnext/DESIGN-PROGRAM.md`) is cited by nothing in the demo or
the megatranche.** The 2026-07-19 order explicitly named keyframes.js as a co-target and
keyframes.js's corpus contains the phrase **zero** times — the relay never landed.

### 1.4 · **MOVEMENT OF MOMENTUM — defined, but under a different name, in the wrong repo**

Owner-typed origin (earliest, `-Users-mkbabb-Programming-glass-ui/1cec2ef4….jsonl`,
**2026-06-23T14:06:11.874Z**) — the substance, before the phrase existed:

> "Ensure that the slide deck dots goo-moroph from one to another, too--most of our items and
> transitions in generality should have this inertia, weight, bouncy and liquid glass facility and
> quality. **Remember this always, and the principles of animation. All of our scrolling, movement
> in generality, should have inertia and liquid weight.**"

The phrase itself, first owner use, **2026-07-18T19:18:45.901Z** (glass-ui `e79fce3f`), purely
ostensive — it points at exemplar videos rather than stating a rule:

> "note the recent apps and search results drawer, how it morphs, expands, has the MOVEMENT OF
> MOMENTUM"
>
> "In the third video, mark the pop-over animation, and its MOVEMENT OF MOMENTUM and BREATH OF
> LIFE--mark this exactly how it fades in, snappy and tightly, with a spring and effervescent
> effect--our own animation curves and langguage should aspire and perfect such smoothness--
> SMOOTH, not sharp."

And, 2026-07-18T02:56 (same session): *"we certainly can best it in aristotelian expressivity:
**HEAR THE BREATH OF LIFE. MARK THE MOMENTUM.**"*

**The one real written law** — in glass-ui, under another name, at `glass-ui/DESIGN.md:113`
(verified this seat):

> "**The library ships substrate for all twelve** — the _Liquid Weight is Universal_ law: every
> **driver** motion (a motion the user's finger or a route-change caused) carries weight, inertia,
> bounce, and squish; it anticipates, overshoots, follows through, and travels an arc, and it
> morphs MORE the faster it moves (`useLiquidFlex` velocity-coupled squish). **Motion that snaps
> tight with no give — instant, fade-only, no settle — is the anti-pattern, not a style.**"

Two problems, both load-bearing for value.js:

1. **The name mismatch.** A value.js contributor grepping `MOVEMENT OF MOMENTUM` finds nothing;
   the law is filed as *Liquid Weight*. `glass-ui/DESIGN.md` is additionally **absent from
   `CANON_HOMES`** — `grep -c "DESIGN.md" glass-ui/scripts/lib/canon-doc.mjs` → **0**, against 17
   registered canon keys (`scripts/lib/canon-doc.mjs:39-57`). The library's largest design doc is
   not a registered canon home.
2. **The unreconciled carve.** `glass-ui/DESIGN.md:115` narrows it — *"It is **driver-scoped** …
   Liquid weight is universal on DRIVERS, not on every pixel that moves"* — while the owner's own
   words say *"movement in generality"*. The prior glass-ui arbiter flagged exactly this and
   escalated it rather than picking: *"MOMENTUM's driver-scope carve → **owner mark**, never a
   silent pick"* (`GESTALT.md:76`). **That carve decides whether MT-F034 binds sub-pane content
   swaps** (an observer-class change, not a driver) — value.js cannot author its motion law until
   the owner rules it.

**Verdict: MOVEMENT OF MOMENTUM is DEFINED (as Liquid Weight), UNFINDABLE by its own name,
UNREGISTERED as canon, and CARVED in a way that is unruled and materially blocks MT-F034.**

### 1.5 · Term-status summary

| # | Term | Owner-typed definition? | Repo-resident definition? | value.js design-doc coverage | Verdict |
|---|---|---|---|---|---|
| T-1 | **GOLDEN GLASS** | **NO** — 1 invocation, 2026-07-27, zero content | **NO** — lineage only (4 glass-ui sites + 1 spec) | 0/4 docs | **ABSENT — must be authored from lineage** |
| T-2 | **BREATH OF LIFE** | **YES** — 2026-07-17T04:09, one sentence | Transcribed only, in glass-ui addenda (`ARCHAEOLOGY.md:109,275`) | 0/4 docs (only `vnext/DESIGN-PROGRAM.md:170`, uncited) | **HOMELESS in value.js** |
| T-3 | **MOVEMENT OF MOMENTUM** | Partial — substance 2026-06-23, phrase 2026-07-18 (ostensive) | **YES**, renamed: `glass-ui/DESIGN.md:113` *Liquid Weight is Universal* | 0/4 docs; `momentum` = 0 in all four | **RENAMED + UNREGISTERED + carve UNRULED** |

---

## §2 · DESIGN-AUTHORITY DOC INVENTORY

### 2.1 · value.js (the seat's primary jurisdiction)

| # | Doc | Size | Added | Last touched | Governs | Staleness |
|---|---|---|---|---|---|---|
| D-1 | `demo/DESIGN.md` | 388 L / 38,214 B | 2026-05-12 | **2026-07-17** `e9d27673` | tokens, type, surfaces, depth, shadows, radii, motion, z, color, layout, anti-patterns | **SEVERE — see §3** |
| D-2 | `docs/tranches/V/VISUAL-CONSTITUTION.md` | 228 L / 39,599 B | 2026-07-17 | 2026-07-17 `ca4dcd20` | identity, material tiers, proportion, type, interaction, motion (7 bullets), per-route direction | MODERATE — no radius law, no elevation law, no transition law |
| D-3 | `docs/tranches/V/PROPORTION-AUDIT.md` | 83 L / 16,229 B | 2026-07-17 | 2026-07-17 `ca4dcd20` | spacing/proportion measurements | superseded in part by MT-F028's corrected census (see §4.3) |
| D-4 | `docs/tranches/V/PALETTE-CONTRACT.md` | 329 L / 28,293 B | 2026-07-17 | 2026-07-17 `d511c340` | palette semantics | narrow; 0 shadow/radius/spacing/vibrancy coverage |
| D-5 | `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md` | 115 L / 26,352 B | 2026-07-17 | 2026-07-17 `ca4dcd20` | per-route composition | co-dated with D-2 |
| D-6 | `docs/tranches/V/SUBTRACTION.md` | 46 L / 4,790 B | 2026-07-17 | 2026-07-17 `ca4dcd20` | what is removed | — |
| D-7 | `docs/tranches/V/vnext/DESIGN-PROGRAM.md` | 353 L / 22,809 B | 2026-07-27 | 2026-07-27 `5c13465d` | **the only Breath-of-Life chapter + a 6-tier motion table** | Codex-authored, transferred to Claude at M-15; **cited by 0 demo/megatranche docs** |
| D-8 | `docs/tranches/V/vnext/DESIGN-PROVENANCE.md` | 94 L / 5,078 B | 2026-07-27 | 2026-07-27 `5c13465d` | provenance of D-7 | same orphan status |
| D-9 | `docs/tranches/V/research/proportion-register.md` | 81 L / 25,328 B | 2026-07-27 | 2026-07-27 `c0078d96` | proportion register | current |
| D-10 | `docs/frontend-design/color-picker.md` | 167 L / 32,796 B | 2026-07-03 | **2026-07-04** `31723ea4` | the picker's design brief | 23 days stale; predates the whole W40–W45 restructure |
| D-11 | `docs/precepts/instructions/STYLE.md` | 252 L / 11,951 B | — | — | **prose** style (submodule `docs/precepts`, shared constellation-wide) | not a visual authority; correctly out of scope |
| D-12 | `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md` | 6,189 B | — | 2026-07-04 (mtime) | the per-site `<Transition>` mapping that `demo/styles/animations.css:69` names as the standing inventory | **23 days stale**; the demo tree was restructured after it |
| D-13 | **`CLAUDE.md` — the repo has NONE** | — | — | — | — | `find . -iname CLAUDE.md -not -path './node_modules/*' -not -path './.git/*'` → **1 result, and it is inside `.claude/worktrees/glass-ui-pinned/`, i.e. a vendored glass-ui checkout.** value.js has **no CLAUDE.md of its own.** |

### 2.2 · glass-ui (the producer — the canon value.js inherits)

| # | Doc | Size | Last touched | Note |
|---|---|---|---|---|
| G-1 | `DESIGN.md` | 1,781 L | 2026-07-22 | holds the momentum law (`:113`); **absent from `CANON_HOMES`** |
| G-2 | `docs/design/motion-canon.md` | 262 L | 2026-07-20 | |
| G-3 | `docs/design/design-idioms.md` | 509 L | 2026-07-20 | |
| G-4 | `docs/design/affordance-map.md` | 159 L | 2026-07-20 | |
| G-5 | `docs/design/tunable-anim.md` | 162 L | 2026-07-20 | |
| G-6 | `docs/canon/glass-system.md` | 93 L | 2026-07-22 | registered canon home |
| G-7 | `docs/canon/motion-system.md` | 80 L | 2026-07-20 | registered canon home |
| G-8 | `docs/canon/aristotelian-proportion.md` | **21 L** | 2026-07-16 | 21 lines for the governing proportion lens |
| G-9 | `docs/canon/design-axes.md` | **19 L** | 2026-07-16 | |
| G-10 | `docs/tranches/BJ/addenda/2026-07-24-refinement/GESTALT.md` | — | 2026-07-24 | the prior tri-fold verdict on this exact question; scores all three laws (`:46`) |

Seven-plus places design law lives in glass-ui alone; two more in value.js; no cross-citation
between the two sets.

### 2.3 · keyframes.js

| # | Doc | Size | Last touched | Note |
|---|---|---|---|---|
| K-1 | `demo/DESIGN.md` | 265 L | **2026-07-12** `db1e7795` "promote demo design stub to authoritative codex" | **0 occurrences of all three canon terms** despite the owner's 2026-07-19 order naming keyframes.js explicitly |

---

## §3 · STALENESS DOSSIER — `demo/DESIGN.md`

`demo/DESIGN.md` was last edited at `e9d27673` (2026-07-17, *"excise stale DESIGN prose"*).
**`git merge-base --is-ancestor 0d1d49fe e9d27673`** → *"style.css split AFTER DESIGN.md last
edit"*: the very next commit in the same wave (`0d1d49fe`, *"split style.css 1043L →
foundation.css + shell.css"*) invalidated the doc's core anchors, and the doc was never
re-anchored.

Since then: `git rev-list --count e9d27673..HEAD -- demo/` → **11 commits**,
`git diff --stat` → **230 files changed, 2,631 insertions, 1,080 deletions**.

| # | Claim in `demo/DESIGN.md` | Reality at HEAD | Class |
|---|---|---|---|
| S-1 | `style.css:1-4`, `:44-47`, `:46-47`, `:119`, `:146-147`, `:188-190`, `:217-219` (7 line-anchored citations; 20 `style.css` mentions total) | `find demo -name style.css` → **no results**. Split into `foundation.css` + `shell.css` at `0d1d49fe`. | **DEAD FILE — the shadow law, dark-mode law, pill-radius law and bare-utility default all cite a deleted file** |
| S-2 | `:212` `--duration-slow` = "the GooBlob hover-filter"; `:271` "WebGL RAF loops (GooBlob, aurora)" | `rg -ln "GooBlob" -g '*.vue' -g '*.ts' demo` → **0 files**. `find demo -type d -iname '*goo*'` → **0**. | **RETIRED COMPONENT cited twice as a live consumer** |
| S-3 | `:215` `--duration-shimmer-fast` = "PaletteDialogHeader's `.admin-golden`" | `find demo -name PaletteDialogHeader.vue` → **MISSING** | **RETIRED COMPONENT** |
| S-4 | `:215-217` Family A includes `--duration-xl`, `--duration-xxl`, `--duration-shimmer-fast`, `--duration-shimmer`, `--duration-sparkle` | `rg -o -g '*.vue' -g '*.css' -e "--duration-[a-z-]+" demo \| sort \| uniq -c` → **only 5 rungs live**: `fast` 32, `normal` 21, `instant` 3, `slow` 2, `panel` 2. The other five: **0**. | **PHANTOM VOCABULARY — 5 of 9 documented rungs unused** |
| S-5 | `:207` "The everyday vocabulary the demo reaches for **~74 times**" | measured **60** total `--duration-*` reaches across `*.vue` + `*.css` | **STALE FIGURE (−19%)** |
| S-6 | `:265` bespoke literal `PaletteCard.vue:388 golden-text-shimmer 4s` — "KEEP, not migrated" | `rg -n "golden-text-shimmer"` → `PaletteCard.vue:63` and `:341`, both prose: *"the local `golden-text-shimmer` keyframe fork is **retired**"* | **CONTRADICTION — the doc preserves a keyframe the code deleted** |
| S-7 | `:263` `PointerDebugOverlay.vue:266 blink 0.5s` | actual `:179` (keyframe at `:187`) | line drift 87 |
| S-8 | `:262` `ActionButton.vue:117,120,121` | actual `:122,:125,:126` | line drift 5 |
| S-9 | `:261` `ImageEyedropper.vue:286 swatch-pop 0.65s` | actual `:288` | line drift 2 |
| S-10 | `:264` `useHeightTransition.ts` 350/250 ms | `DEFAULT_EXPAND_DURATION = 350` / `DEFAULT_COLLAPSE_DURATION = 250` at `:7-8` | **ACCURATE** |
| S-11 | `:272` "Custom keyframes live in `demo/@/styles/animations.css`" | real path `demo/styles/animations.css`; the `demo/@/` tree no longer exists (`demo/` is now `picker/ shell/ palettes/ workbenches/ scenes/ platform/ shared/ styles/ ui/ color-picker/ color-session/ test/`) | **PATH DRIFT throughout** |
| S-12 | `:276` "the per-slot `<Transition>` in `panes/PaneSlot.vue`" | real path `demo/shell/PaneSlot.vue` | **PATH DRIFT** |
| S-13 | `demo/styles/animations.css:63-65` names `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md` as *"the standing inventory + per-site mapping"* | file exists, last written **2026-07-04**, i.e. before the entire demo restructure | **STALE SATELLITE AUTHORITY** |

**12 of 13 rows are defects. The doc's motion chapter — its longest and most normative — is
anchored to a deleted stylesheet, two deleted components, and a retired keyframe.**

### 3.1 · Contradictions with the adjudicated corpus

| # | `demo/DESIGN.md` / `VISUAL-CONSTITUTION.md` says | The adjudicated record says | Status |
|---|---|---|---|
| C-1 | `DESIGN.md:182` "**One cartoon language.** … Rest: `8px 8px 0 0 …` — flat offset, pop-art aesthetic" | `ROOT-FINDINGS.md` MT-F027: the three zero-blur cartoon layers **facet at rounded corners**; owner-marked OM-2 | the doc canonises the mechanism the owner marked as a defect |
| C-2 | `DESIGN.md` §Shadows says nothing about *what a shadow claims* | MT-F026: *"A drop shadow is a claim about **height above the surface behind it**"* — the pill/plate relation is **inverted** | **the governing semantic is absent from the doc entirely** — `grep -ic elevation` → **0 in all four value.js design docs** |
| C-3 | `VISUAL-CONSTITUTION.md:15` "Instrument veil … **no drop shadow**"; `:34` "Supporting fixtures do not compete … through equal size or equal **shadow**" | MT-F026 measured 2 dock controls at **2 cast layers each over a plate casting none** | the constitution states a rule it has no gate for and the tree violates |
| C-4 | `DESIGN.md:190-201` §Radii — four role tokens, no derivation between registers | MT-F030 (OM-4): *"four radius registers with no derivation between them"* in one instrument | the doc lists tokens; it never states a **derivation law**, which is exactly what OM-4 demands |
| C-5 | `VISUAL-CONSTITUTION.md:33` "**Spacing is container-scaled from glass-ui tokens.** No desktop-tight/mobile-airy fork and no breakpoint pile." | MT-F028 (M-13 corrected census): **102 adaptation sites in 3 incompatible dialects** — 7 viewport `@media` + 58 Tailwind `sm:/md:/lg:` across 28 files + 37 JS breakpoint refs across 13 files | the law is stated and comprehensively violated; **no gate exists** |
| C-6 | `DESIGN.md` §Motion: pane swap "landed"; the two-channel law is "INHERITED, not per-site" | MT-F034 (OM-8): pane **and sub-pane** transitions "need to be well-defined and ANIMATED, not just instantly transitioned" | the doc covers pane swaps and is **silent on sub-panes** — `grep -ic "sub-pane"` → **0 in all four docs** |

---

## §4 · DOES THE DESIGN MD NEED RE-AUTHORING? — the answer, with evidence

### **YES. And the deeper defect is that no single document is the design authority.**

Three independent proofs, each a measurement:

**Proof 1 — the corpus is orphaned in both directions.**
`grep -n "VISUAL-CONSTITUTION\|vnext\|DESIGN-PROGRAM" demo/DESIGN.md docs/tranches/V/VISUAL-CONSTITUTION.md`
→ **no output.** The two live design authorities do not know each other exists. And the
megatranche's whole adjudicated corpus cites neither (§0). A law nothing reads and nothing cites
is folklore with a filename.

**Proof 2 — the doc is anchored to a tree that no longer exists.** §3: 12 of 13 anchor rows
defective; 230 demo files changed since the last edit; the primary stylesheet the doc cites seven
times was deleted by the *next commit*.

**Proof 3 — the owner's three named laws have 0 coverage.** §1.5: `GOLDEN GLASS` 0/4,
`BREATH OF LIFE` 0/4, `MOVEMENT OF MOMENTUM` 0/4 across every value.js design authority.

### 4.1 · What the design MD does NOT govern that OM-1..OM-10 prove it must

Topical coverage matrix (`grep -ic` per doc; the four value.js design authorities):

| topic | `demo/DESIGN.md` | `VISUAL-CONSTITUTION` | `PROPORTION-AUDIT` | `PALETTE-CONTRACT` |
|---|---:|---:|---:|---:|
| shadow | 30 | 7 | 2 | 0 |
| radius / radii / rounded | 12 | 2 | 1 | **0** |
| spacing / gap / padding / margin | 7 | 6 | 14 | **0** |
| vibrancy / saturation / chroma | 2 | 8 | **0** | **0** |
| animation | 9 | 2 | **0** | 1 |
| transition | 11 | **0** | **0** | **0** |
| **"sub-pane"** | **0** | **0** | **0** | **0** |
| **"elevation"** | **0** | **0** | **0** | **0** |

Per-mark gap analysis (marks and their MT rows read from
`docs/tranches/V/megatranche/registry/ROOT-FINDINGS.md`, `STATE.md:23`):

| # | Mark | MT row | Owner's words | What the design MD lacks |
|---|---|---|---|---|
| OM-1 | dock pills carry a floating elevation shadow over a shadowless plate | MT-F026 | *"mark these inappropriate shadows on the dock items"* | **An ELEVATION SEMANTICS law**: shadow = a claim of height above the surface behind. The word `elevation` appears **0 times** in all four docs. §Shadows legislates *appearance* (offset/opacity) and never *meaning* — so a token can be applied to a category it contradicts and no rule is broken. Also missing: an **in-chrome vs free-floating register split**. |
| OM-2 | cartoon cast facets into sharp corners on rounded cards | MT-F027 | *"mark these shadow edge artifacts--sharp corners, on some cards/palette items"* | A **shadow-geometry law** (layer nesting/spread so multi-layer casts share one outer silhouette). `DESIGN.md:182` canonises the zero-blur three-layer recipe with no geometry constraint. |
| OM-3 | Picker headline card's dead vertical band | MT-F029 | *"the spacing here between the top row and the bottom row is too much"* | A **VERTICAL RHYTHM law**: intervals derive from the type scale, not from leftover flex/grid slack. `demo/DESIGN.md` scores **7** on all spacing words combined and has no rhythm scale; `VISUAL-CONSTITUTION:33` asserts container-scaling with no scale and no gate. |
| OM-4 | Easing configurator mixes four unrelated radii | MT-F030 | *"easing config is awful, too rounded in some areas, not rounded enough in others"* | A **RADIUS DERIVATION law**. §Radii lists four role tokens; it never says how a nested register derives from its parent, nor when circle (icon register) may sit adjacent to rounded-rect. |
| OM-5 | "DEV MISCONFIGURED" banner ordered removed | MT-F031 | *"this nonsense needs to be removed"* | A **product-vs-diagnostic surface law**: dev diagnostics never render as product chrome. §Idioms-NOT-used (`:377`) lists selector anti-patterns only. |
| OM-6 | HeroBlob does not carry the current color's vibrancy | MT-F032 | *"The blob current color is not nearly vibrant enough"* | A **CHROMA-FIDELITY law** for the sRGB-clamping path (canvas resolver → shader HSV perturbation). `demo/DESIGN.md` scores **2** on vibrancy/saturation/chroma; `VISUAL-CONSTITUTION` scores 8 but only for tier language, never a fidelity budget. |
| OM-7 | dock capsule buttons: three light models on one control pair | MT-F033 | *"these buttons have incorrect shadows and the like"* | **ONE LIGHT MODEL** per surface — inner shadow, outer highlight and cast elevation must agree on a single light source. Stated nowhere. |
| OM-8 | pane and sub-pane transitions must be ANIMATED | **MT-F034** | *"transitions between panes, and sub-panes, need to be well-defined and ANIMATED, not just instantly transitioned"* | A **TRANSITION MANDATE covering sub-panes**. `sub-pane` = **0** in all four docs; `transition` = **0** in three of four. See §5 for the measured inventory. |
| OM-9 | About pane top edge misaligns with Picker; Mix aligns | MT-F035 | *"why does this not line up in height"* | A **SHARED-ROW / cross-pane track-start contract**. `VISUAL-CONSTITUTION §3.1` binds route compositions but never a shared grid-row start. |
| OM-10 | the aligned CONTROL frame | MT-F035 | *"But this does"* | Proves the contract exists in code and is undocumented — the very definition of folklore. |

**Reading:** OM-1/2/7 (three of ten marks) are all **shadow** marks and all reduce to one missing
paragraph — *what a shadow means*. OM-3/4/9 are three **derivation** marks (spacing, radius,
alignment) that reduce to one missing idea — *magnitudes derive from a scale, never from slack*.
The design MD is not merely stale; it legislates **appearance without semantics**, which is why
appearance-level rules do not stop these defects.

### 4.2 · The one asset — and where it is buried

`docs/tranches/V/vnext/DESIGN-PROGRAM.md:170` already contains the chapter the demo needs:

> `## Breath of Life` → `### Motion tiers` — a six-tier table (Immediate 70–160 ms · Release
> 120–220 ms · Birth 180–320 ms · **Transition 180–420 ms** *"`relocate`: pane, route, drawer and
> scene changes … One spatial cause; outgoing semantic authority is removed before travel"* ·
> Ambient ≥4 s · Procedural) with the honest caveat *"These are **probe brackets**, not acceptance
> thresholds."*

That **Transition** row is MT-F034's mandate, already specified, nine days before the owner marked
OM-8. It sits in `vnext/`, cited by 0 demo files and 0 megatranche files. **Re-authoring is
therefore substantially a FOLD, not a greenfield.**

### 4.3 · A caution the re-authoring must respect

`PROPORTION-AUDIT.md` (D-3) predates MT-F028's corrected census. `ROOT-FINDINGS.md` records the
correction under **⛔ CENSUS CORRECTED**: *"'34 `@media`' was the TOTAL; only 7 are
viewport-dimension queries"*, the true adaptation surface is **102 sites in 3 dialects**, and
*"the ultrawide dead zone is worse … ~86% of the viewport AREA is dead, against my 65%-width
figure."* Any fold that carries D-3's numbers forward without re-measuring re-imports a
3.4×-undercounted census.

---

## §5 · THE MOTION INVENTORY vs THE MT-F034 MANDATE

### 5.1 · Keyframes

| # | Source | Count | Names / note |
|---|---|---:|---|
| M-1 | `demo/styles/animations.css` (global) | **4** | `edit-drawer-in` (+ a deliberate `@media (max-width:639px)` restatement, `:18`), `stagger-child-in` (`:34`), `vj-settle` (`:170`) |
| M-2 | `demo/color-picker/composables/boot/overture.css` | **3** | the boot overture |
| M-3 | scoped `<style>` blocks across `demo/**/*.vue` | **12 across 8 files** | `PaneHeader` 3 · `ColorInput` 2 · `ActionButton` 2 · `ImageEyedropper` 1 · `DockStatusLamp` 1 · `PointerDebugOverlay` 1 · `SpectrumCanvas` 1 · `ApiOfflineChip` 1 |
| M-4 | other `demo/styles/*.css` | **0** | `focus-ring`, `foundation`, `shell`, `utils`, `hljs` — none |
| M-5 | producer `@mkbabb/glass-ui@7.0.0` `dist/styles/*.css` | **24** (12 in `animations.css`) | the inherited shared set |
| | **demo-owned total** | **19** | |

### 5.2 · Transition tokens and declarations

| # | Metric | Count |
|---|---|---:|
| M-6 | `transition:` declarations in `demo/**/*.{vue,css}` | **43** across 21 files |
| M-7 | Tailwind `transition*` utility occurrences in `demo/**/*.vue` | **100** |
| M-8 | `animation:` shorthand sites | **19** |
| M-9 | `--duration-*` reaches (5 live rungs of 9 documented) | **60** — `fast` 32 · `normal` 21 · `instant` 3 · `slow` 2 · `panel` 2 |
| M-10 | spring reaches | **32** — `--spring-snappy` 18 · `--spring-smooth` 9 · `--spring-press` 3 · `--spring-bouncy` 2 |
| M-11 | easing reaches | **74** — `--ease-standard` 46 · `--ease-decelerate` 16 · `--ease-accelerate` 8 · `--ease-out` 3 · `--ease-cartoon-punch` 1 |
| M-12 | `--transition-liquid-spatial` (the two-channel spatial atom) | **5** |
| M-13 | `prefers-reduced-motion` sites | **14** files |
| M-14 | **`view-transition` / `startViewTransition`** | **0** — the modern cross-document/DOM transition API is unused anywhere in the demo |

### 5.3 · `<Transition>` sites — 22 across 17 files

`rg -n "<Transition" -g '*.vue' demo` → 22 hits (17 files), every one keyed to the three
sanctioned families (`vj-enter` / `vj-morph` / `vj-celebrate`, declared at
`demo/styles/animations.css:57-80` (comment block; class definitions follow at `:82+`) with the
gate *"a fourth name is a defect"*).

### 5.4 · The MT-F034 verdict — **the mandate splits, and only half is red**

**The pane half is GREEN and better-specified than the mark implies.** `demo/color-picker/App.vue`
passes a real family at all three slots — `:87`, `:106`, `:132`:
`:transition-name="viewManager.ready.value ? 'vj-enter' : ''"` — and
`demo/styles/animations.css:228-278` carries dedicated pane geometry
(`.pane-wrapper--left/--right` → `translateX(∓110%) rotate(∓2deg)`, opacity pinned so *"the swap
reads as travel, not a fade"*), a compositor-layer promotion scoped to `*-active` only, and the
two-channel law applied (enter on `--spring-snappy` at the spring's own clock; leave strictly
shorter on `--ease-out`, with the comment naming the F2 mid-flight-collision anti-pattern it
cures).

**The sub-pane half is RED, and here is the exact mechanism — measured this seat, not inferred.**
OM-8's witness is the Mix pane's `Colors | Palettes` segmented control. The owning file is
`demo/workbenches/mix/MixSourceSelector.vue`:

```
:105   <SegmentedTabs variant="pill" :options="tabOptions" :model-value="mode"
                      @update:model-value="onTabChange" />
:113   <!-- Colors mode -->
:114   <template v-if="mode === 'colors'">
```

The tab control writes `mode`; the content swaps through a **bare `<template v-if>` with no
`<Transition>` wrapper.** That is a one-frame cut — precisely *"just instantly transitioned."*
The single `<Transition>` in that file (`:120`, a `TransitionGroup` on the swatch row) animates
chips *within* a mode, never the mode swap itself.

Census of every segmented/tab-driven sub-pane swap in the demo:

| # | File | Control | Content swap | Verdict |
|---|---|---|---|---|
| M-15 | `demo/workbenches/mix/MixSourceSelector.vue:105` | `SegmentedTabs` (glass-ui) | `<template v-if="mode === 'colors'">` at `:114`, no wrapper | **RED — instant cut. The OM-8 witness.** |
| M-16 | `demo/palettes/browser/admin/AdminNamesPanel.vue` | `SegmentedTabs` | `grep -c "<Transition"` → **0** | **RED — same class** |
| M-17 | `demo/shell/PaneSegmentedControl.vue` (consumed at `Dock.vue:198`) | `SegmentedTabs` | drives `mobilePaneIndex` → `PaneSlot` → `vj-enter` | **GREEN by delegation** |

**So MT-F034 resolves into two rows, not one:**

- **F034-a (pane / route / KeepAlive swaps)** — already animated, tokenised, two-channel-correct.
  The wave's work is **documenting** it (the doc's own §Motion table is 12/13 stale) and
  extending it to route-level scene changes, not building it.
- **F034-b (sub-pane / segmented-content swaps)** — genuinely unanimated at **2 of 3** measured
  sites. Needs a fourth sanctioned register or a documented reuse of `vj-morph` (which is
  literally defined as *"ONE surface, NEW content (in-place swaps)"* at `animations.css:70` — the
  right family already exists and is simply not applied).

**Two blockers the wave inherits and must not paper over:**

1. **The PRM guard is a blunt kill.** `animations.css:184-192` zeroes *all* animation and
   transition durations under `prefers-reduced-motion: reduce`, with one carve-out for reka
   `[data-state]` opacity at `:202-210`. MT-F034 requires *"declarations inside
   `@media (prefers-reduced-motion: no-preference)`"* — the **corrected** idiom. Only
   `.stagger-children` (`:43`) currently uses it. Any new transition authored the current way is
   born non-compliant with the mandate that commissions it.
2. **The momentum carve is unruled.** A sub-pane content swap is an *observer* change, not a
   *driver* — `glass-ui/DESIGN.md:115` explicitly exempts observers from liquid weight
   (*"an over-springy carousel reads cheap"*), while the owner's own words say *"movement in
   generality."* `GESTALT.md:76` already escalated this as an **owner mark, never a silent pick.**
   **F034-b cannot choose its curve until that is ruled** — otherwise the wave silently decides a
   constitutional question.

---

## §6 · BRIEF FOR THE PHASE-E DESIGN TRI-FOLD

**Shape: ONE canonical `demo/DESIGN.md`, re-authored, with satellites folded in and deleted.**

Sections, in order, with the source each folds:

1. **The three laws, stated first.**
   - *GOLDEN GLASS* — **authored from lineage** (§1.2): the BC glass-tier usages + the four
     warm/restrained "gold" registers + the negative constraints (not grey, not metallic, not
     "trite, shiny, and bright"). This is the one act of genuine authorship.
   - *BREATH OF LIFE* — folded verbatim from the owner's 2026-07-17T04:09 sentence + the six
     engagement scalars (`CORPUS-STILLS-A.md:16`), landing as an engagement-ladder law
     (rest→hover→press→engaged→modal).
   - *MOVEMENT OF MOMENTUM* — cite `glass-ui/DESIGN.md:113` as the producer law, **state the
     rename explicitly** so the phrase is greppable, and **carry the driver-vs-observer carve to
     the owner as a mark** rather than picking.
2. **Material & elevation** — the missing paragraph: *a shadow is a claim about height above the
   surface behind it*; in-chrome vs free-floating registers; one light model per surface. Closes
   OM-1/OM-2/OM-7.
3. **Proportion & derivation** — vertical rhythm from the type scale; radius derivation between
   nested registers; the cross-pane shared-row track-start contract. Closes OM-3/OM-4/OM-9/OM-10.
   Re-measure before folding `PROPORTION-AUDIT.md` (§4.3).
4. **Chroma fidelity** — the wide-gamut → sRGB-clamp budget for procedural surfaces. Closes OM-6.
5. **Motion** — fold `vnext/DESIGN-PROGRAM.md:170`'s six-tier table wholesale (its **Transition**
   row already is MT-F034); add the sub-pane register (F034-b); restate the PRM idiom as
   `no-preference`-scoped; re-anchor every citation (§3).
6. **Product surfaces** — dev diagnostics are never product chrome. Closes OM-5.
7. **Anti-patterns** — keep `DESIGN.md:377`, extend from the OM roster.

**Deletions on fold:** `docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md` (D-12,
stale satellite named as authority by live CSS); `docs/frontend-design/color-picker.md` (D-10) if
nothing survives re-measurement.

**Born-RED gates the wave should mint (each falsifiable today):**

| gate | statement | value at HEAD |
|---|---|---|
| `G-ONE-DESIGN-DOC` | exactly one document is cited as the design authority by demo code comments and by the megatranche registry | **RED** — 0 citations either way (§0) |
| `G-THREE-LAWS-STATED` | each of GOLDEN GLASS / BREATH OF LIFE / MOVEMENT OF MOMENTUM has a stated definition in the design MD | **RED** — 0/3 |
| `G-CANON-ANCHORS-LIVE` | every `file:line` in the design MD resolves at HEAD | **RED** — 12 of 13 rows defective (§3) |
| `G-SUBPANE-ANIMATED` | every segmented/tab-driven content swap is wrapped in a sanctioned family | **RED** — 2 of 3 (M-15, M-16) |
| `G-PRM-NO-PREFERENCE` | new motion declarations live inside `@media (prefers-reduced-motion: no-preference)` | **RED** — 1 of 19 keyframe consumers |
| `G-ELEVATION-SEMANTIC` | the design MD states what a shadow claims; no in-chrome control carries a free-floating elevation token | **RED** — `elevation` = 0 in all four docs; MT-F026 measures 2 controls × 2 cast layers |

**One owner mark to raise before Phase E authors anything:** *does MOVEMENT OF MOMENTUM bind
observer-class motion (sub-pane content swaps, list reorders), or only driver-class motion?*
`glass-ui/DESIGN.md:115` says drivers only; the owner's 2026-06-23 words say "movement in
generality". F034-b's curve depends on the answer.

---

## §7 · ROW LEDGER

| block | rows |
|---|---:|
| §1 canon terms (T-1..T-3) | 3 |
| §2 doc inventory (D-1..D-13, G-1..G-10, K-1) | 24 |
| §3 staleness (S-1..S-13) | 13 |
| §3.1 contradictions (C-1..C-6) | 6 |
| §4.1 owner-mark gaps (OM-1..OM-10) | 10 |
| §5 motion inventory (M-1..M-17) | 17 |
| §6 born-RED gates | 6 |
| **TOTAL** | **79** |
