SERVED MODEL: claude-opus-5[1m]

# G7 — THE BUTTON BUDGET OF RECORD, at the adopted pin

**Gate**: `waves/F-W1.md` §3 `G7` `:253` — *"One stripped-comment grep of record, re-run at the
adopted pin; its output is the sole budget."*
**Unit**: `c`, X.F.W1, Track C. **Date**: 2026-09-17.
**Adopted pin**: glass-ui **`v8.0.0` @ `17a11bc5`** (COHESION §0i.3; recorded at `F-W1.md` §8.1).
**Consumer operand**: fourier-analysis `web/src` at the settled bytes **`5842377`**
(branch `m/w1-bump-migration`, ⟨cmd⟩ `git status --porcelain | wc -l` → **0**).
**Locks honoured**: the six banked figures are **NOT averaged**; every figure below carries its
**counting unit**; `162` enters **as a member of the set, never as its answer**.

---

## §0 THE GREP OF RECORD — its definition, stated before its output

A "stripped-comment grep" is not a `grep` flag; it is a probe shape, and the whole of G7's
authority rests on that shape being stated rather than assumed. This seat's probe is:

1. **Comment strip, line-numbering preserved.** Each file under `web/src` (130 files: `.vue` ·
   `.ts` · `.js` · `.css`) is passed through a stripper that blanks `<!-- … -->`, `/* … */` and
   `// …` (the last only when the `//` opens at line start or after whitespace/punctuation, so
   `https://` survives), replacing every removed non-newline character with a space. Line numbers
   and byte offsets are therefore unchanged, and a coordinate quoted from the stripped stream is a
   coordinate in the real file.
2. **Tag attribution.** Over the stripped stream, `<script>` and `<style>` blocks of every SFC are
   blanked, element open-tags are matched with quoted attribute values consumed as units, and each
   `variant=` / `size=` attribute is attributed to **its enclosing element's tag name**.

**Why the attribution half is not optional.** D-M3's own rejection cell says the rival cells
*"measure FILES not Button tags"* and that a rival tag-scan's `<Button\b[^>]*>` regex *"terminates
at the `>` inside `v-if="navStack.length > 0"` (PaperView.vue:398-405), dropping a real
`variant="glass" size="icon"` site."* This probe consumes `"…"` as a unit, so that site is **not**
dropped: `PaperView.vue:400/:401` appear in the attributed set below.

**The probe's own closure proof, so it cannot be silently lossy.** Every attributed hit sums back
to the unattributed total:

| | |
|---|---|
| ⟨cmd⟩ comment-stripped `variant=` occurrences, all files | **106** |
| attributed: `Button` **88** ⊕ `Slider` **9** ⊕ `SegmentedTabs` **3** ⊕ `Badge` **2** ⊕ `PaperSearch` **2** ⊕ `PaperSearchInput` **1** ⊕ `PaperSearchDropdown` **1** | **106** |
| residue unattributed to any element open tag | **0** |

Double-run: both figures reproduce **106 / 106** on an independent rebuild of the stripped corpus.

---

## §1 THE BUDGET — G7's output, which is the sole budget

Every row is **double-run** (the corpus rebuilt from the bytes between runs; both readings
identical).

| # | figure | **counting unit** | value |
|---|---|---|---|
| B1 | **`<Button>` `variant=` attributes** | attribute occurrences on a `Button` element open tag, comments stripped — **86 static ⊕ 2 bound (`:variant=`)** | **88** |
| B2 | **`<Button>` `size=` attributes** | attribute occurrences on a `Button` open tag | **69** |
| B3 | **the BREAKING attribute surface** | B1 ⊕ the `size=` values retired at `17a11bc5` (see §2) | **129** |
| B4 | **Button-bearing files** | files holding ≥1 `<Button>` carrying `variant=` or `size=` | **34** |
| B5 | **`glass-ui/button` importers** | files with an `@mkbabb/glass-ui/button` import | **34** |
| B6 | **non-Button `variant=` attributes** | attribute occurrences on a non-`Button` open tag | **18** |
| B7 | **comment-resident `variant=`** | occurrences inside a comment (doc debt, **not** rewrite surface) | **16** — of which **9** are `<Button variant=` |
| B8 | **comment-resident `size="icon"`** | occurrences inside a comment | **1** |
| B9 | **raw, unanchored `variant=` lines** | `grep -rn "variant=" web/src \| wc -l` (comment-inclusive, all tags) | **122** |
| B10 | **raw, unanchored `size="icon"` lines** | same shape | **36** |

### §1.1 B1 by value — the re-grammar's per-arm operand

| `variant=` value | occurrences | files | AA-2's successor at `17a11bc5` |
|---|---|---|---|
| `ghost` | **46** | **21** | `emphasis="quiet"` |
| `outline` | **21** | **14** | **NO SUCCESSOR — ESC-7, UNRULED** |
| `glass` | **9** | **7** | `emphasis="primary"` (via the `default` limb — see §3) |
| `default` | **4** | **4** | `emphasis="primary"` (`fr-FunctionInput N-1`, §2·R2b.1) |
| `destructive` | **4** | **4** | `emphasis="primary" tone="destructive"` |
| `secondary` | **1** | **1** | `emphasis="secondary"` |
| `link` | **1** | **1** | `emphasis="text"` (nearest; **not** a banked mapping — flagged) |
| bound `:variant=` | **2** | **2** | expression-valued; hand-migrated, never swept |
| **total** | **88** | **34** | |

The two bound sites are `GalleryView.vue:431`
(`:variant="pendingBatch?.action === 'delete' ? 'destructive' : 'default'"`) and
`AdminUserList.vue:502` (a multi-line ternary). **A mechanical string sweep cannot see either** —
they are named here so the transaction unit does not discover them at the cut.

### §1.2 B2 by value — and the finding the banked cells do not carry

| `size=` value | occurrences | at `17a11bc5` | verdict |
|---|---|---|---|
| `icon` | **35** | `ButtonSize = "xs" \| "sm" \| "md" \| "lg"` — **absent** | **BREAKS** |
| `sm` | **27** | present | survives |
| `default` | **6** | **absent** | **BREAKS** |
| `lg` | **1** | present | survives |

⟨cmd⟩ (cwd `/Users/mkbabb/Programming/glass-ui`)
`git grep -hn "type ButtonSize" 17a11bc5 -- src` →
`src/components/button/Button.vue:40:export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;`

⟨cmd⟩ `git show 17a11bc5:src/components/button/Button.vue | grep -n "retired.push"` →
`:134  if ("variant" in attrs) retired.push(...)` · **`:136  if (size === "icon" || size === "default") retired.push(\`size="${size}"\`);`**

**The producer's own DEV diagnostic names `size="default"` alongside `size="icon"`.** §4 step 4's
limb-2 spelling is *"`size="icon"`→`size="md" iconOnly`"* and is silent on `size="default"`; at the
adopted pin the six `size="default"` attributes fire the same `console.error` into the same four
zero-console-error e2e gates (G6). **B3 is therefore 88 ⊕ 41 = 129, not 88 ⊕ 35 = 123.** Recorded
here as a measured budget fact; it adds no limb (it is inside limb 2) and it is handed to unit `e`
by name.

---

## §2 THE G-10 DRIFT — arithmetic, not opinion

F.W0's `G-10` deleted two files at `5842377` (§0j.D: *"F8-REACH-01 … and F8-REACH-02 …: DELETE, in
one breath"*). §Baseline finding 1 stated the consequence as one subtraction. **It is two
subtractions in two different files**, and saying so is the difference between a reproducible
census and a coincidence.

| budget | at `5842377^` | deleted by | at `5842377` |
|---|---|---|---|
| `lucide-vue-next` import sites | **35** / **35** files | `components/equation/InfoCard.vue:3` (`import { Info } from "lucide-vue-next"`) | **34** / **34** |
| `glass-ui/button` importer files | **35** | `components/visualization/CanvasOverlayButton.vue:9` | **34** |
| static `<Button variant=…>` | **87** | `CanvasOverlayButton.vue:18` (`variant="glass"`) | **86** |
| `size="icon"` (comment-stripped) | **36** | `CanvasOverlayButton.vue:19` | **35** |
| Button-bearing files | **35** | `CanvasOverlayButton.vue` | **34** |
| comment-resident `<Button variant=` | **10** | `CanvasOverlayButton.vue:5` (docblock) | **9** |
| comment-resident `size="icon"` | **2** | `CanvasOverlayButton.vue:5` (same line) | **1** |

Receipts: ⟨cmd⟩ (cwd fourier) `git show '5842377^:web/src/components/visualization/CanvasOverlayButton.vue' | grep -n 'variant=\|size="icon"\|glass-ui/button'` →
`5: * Forwards every attr/listener to \`<Button variant="glass" size="icon">\` and` · `9:import { Button } from "@mkbabb/glass-ui/button";` · `18:        variant="glass"` · `19:        size="icon"` ·
⟨cmd⟩ `git show '5842377^:web/src/components/equation/InfoCard.vue' | grep -n 'lucide-vue-next'` → `3:import { Info } from "lucide-vue-next";` ·
⟨cmd⟩ `git grep -ln "glass-ui/button" '5842377^' -- web/src | wc -l` → **35**, today **34** ·
⟨cmd⟩ `git grep -n "lucide-vue-next" '5842377^' -- web/src | wc -l` → **35**, today **34**
(double-run **34/34** twice).

**The two budgets lost different files.** The lucide budget lost `InfoCard.vue`; the Button budget
lost `CanvasOverlayButton.vue`. The equality `35 → 34` in both is a coincidence of cardinality, not
a shared cause, and a successor seat that treats it as one subtraction will look for a Button in
`InfoCard.vue` and find none.

---

## §3 THE FIVE SUPERSEDED CELLS, BESIDE THE BUDGET — each with its counting unit recovered

G7's own text: *"**SIX** banked figures disagree."* Five are superseded by §1; the sixth (`162`) is
a different object and is entered in §4. **None is averaged.** Four of the five are reproduced
**exactly** once their unit is named — which is the whole of what G7 exists to do.

| # | banked cell | source | **the unit it was counting** | measured | verdict |
|---|---|---|---|---|---|
| S1 | **87 / 36 / 35** | `fr-PaperSearchInput D-M3`, the budget of record (`carry:19`) | static `<Button variant=…>` attributes · comment-stripped `size="icon"` · Button-bearing files, **at the PRE-`G-10` tree** | at `5842377^`: **87 / 36 / 35** | **EXACT — superseded only by `G-10`'s deletion** → **86 / 35 / 34** today; +2 bound ⇒ B1 = **88** |
| S2 | **37 files / 38 / 124** | `AA-2` (via `carry:19` dissent) | files containing `<Button` · **raw** `size="icon"` lines · **raw** `variant=` lines, at the PRE-`G-10` tree | ⟨cmd⟩ at `5842377^`: `<Button` files **37** · `size="icon"` **38** · `variant=` **124** | **EXACT, all three.** Today the same three units read **36 / 36 / 122** |
| S3 | **9 glass / 7 files + 36 icon (35 live)** | `FR-COB-2` (corrected budget) | `variant="glass"` **comment-stripped** / files · raw `size="icon"` with the live count beside it | **9 / 7** comment-stripped (raw **10 / 7**); `size="icon"` raw **36**, live **35** | **EXACT.** This cell was never wrong — §Baseline finding 3's *"10/7, not the banked 9/7"* is the **raw** unit; the banked 9 is the **stripped** one. **Resolved, not averaged** |
| S4 | **96 / 77 / 35** | `fr-GalleryCard D-8` — *"D's repo-scale 96 `variant=` / 77 `size=` / 35 files"* | repo-scale `variant=` and `size=` occurrences and files, **at the megatranche audit's corpus moment** (pre-F.W0) | the same units at these bytes: **106 / 128 / 41** (all-tag, comment-stripped) | **NOT REPRODUCIBLE at these bytes** — the operand tree is a different moment and is not re-derivable from the frozen corpus. **Named as a prior run, never re-cut, never averaged** |
| S5 | **icon ×38 / glass ×12** | `fr-ConvergenceTimeline` | **raw** `size="icon"` lines · **raw** `variant="glass"` lines, at the PRE-`G-10` tree | ⟨cmd⟩ at `5842377^`: **38** and **12** | **EXACT, both.** `CanvasOverlayButton.vue` carried 2 `glass` mentions (`:5` comment ⊕ `:18` live) and 2 `size="icon"` (`:5` ⊕ `:19`) ⇒ **12 → 10**, **38 → 36** today |

**Four of five reproduce to the digit.** The disagreement G7 was built to arbitrate was never a
measurement dispute: it was five different objects wearing the same three numerals, plus one
(`S4`) taken against a tree that no longer exists. **The budget of §1 supersedes all five as the
sizing operand; none of them was wrong about the thing it was counting**, and the one unit
correction owed is S3's, in the banked cell's favour.

### §3.1 One residual difference, disclosed and not laundered

D-M3 banks *"9 `variant=` + 2 `size="icon"` comment-resident"*. At `5842377^` this seat measures
**10** comment-resident `<Button variant=` and **2** comment-resident `size="icon"`; at the settled
bytes, **9** and **1** — both dropping by exactly one with `CanvasOverlayButton.vue:5`. So D-M3's
**2** is a pre-`G-10` reading while its **9** matches the **post**-`G-10` tree: the two halves of
that sub-figure sit at different moments, by one unit. **Neither is load-bearing** (comment-
resident mentions are doc-update debt, never rewrite surface), the figures are published as
measured, and no banked cell is re-graded.

---

## §4 `162` — ENTERED AS A MEMBER OF THE SET, NEVER AS ITS ANSWER

`162` is banked at `fr-EquationResult.md:37/:38` and G7's own cell warns that the record spells it
**both** ways (*"the 162-attribute surface"* and *"the 162-site prop rewrite"*), so *"a seat that
reads the `-site` spelling as a file/site count against D-M3's 35 files has mis-reconciled by
transcription, not by measurement."*

**Its unit, recovered at the frozen corpus's own arithmetic.** `fr-EquationResult.md:37` states its
instrument in the same sentence: *"my dirty-tree counts reproduce the banked instrument exactly
(**124 / 38 / 21 files**)"*. Those are raw `variant=` lines, raw `size="icon"` lines, and files
holding `size="icon"` — and this seat reproduces all three at `5842377^`: **124** · **38** ·
**21**. **124 + 38 = 162.**

> **`162` = raw `variant=` lines ⊕ raw `size="icon"` lines, comment-inclusive, all tags, at the
> pre-`G-10` tree.** It is an ATTRIBUTE count in the sense that each grep line is one attribute
> occurrence. It is **not** a site count and **not** a file count.

**The derivation is this seat's reconstruction, disclosed as such**: the record does not spell the
addition. It is offered because a member of a reconciliation set must carry a unit to be a member
at all, and `162`'s unit is otherwise unrecoverable. It is **not** averaged with §1, and **not**
used to size any limb.

| the same unit, moved to the settled bytes | |
|---|---|
| raw `variant=` ⊕ raw `size="icon"` at `5842377` | **122 + 36 = 158** |
| comment-stripped, all tags | **106 + 35 = 141** |
| comment-stripped, `Button`-attributed (**the rewrite's operand**) | **88 + 41 = 129** (B3) |

§4 step 4's *"162-attribute Button rewrite"* is a quotation of a pre-`G-10`, comment-inclusive,
all-tag figure. **The limb is sized by B3 = 129, per G7's own clause** (*"The transaction's limb is
sized by THIS gate's output; `162` may be quoted only as an entry in this set"*).

---

## §5 What this gate does NOT decide

- **ESC-7 is not answered here.** §1.1 measures `outline` at **21 occurrences / 14 files**
  (comment-stripped, `Button`-attributed). **The register's ESC-7 figure is 30 / 16** — the raw,
  comment-inclusive, all-tag grep taken 2026-08-28. Both are true of their units; **the owner is
  being asked to rule on a class whose live Button surface is 21/14, not 30/16**, and the
  difference is 7 comment-resident mentions ⊕ 2 `<Badge variant="outline">` sites
  (`GalleryCard.vue:115` · `GalleryCardModal.vue:129`) that are not Buttons at all. Routed to
  G19/unit `f` as a **sharpening of the escalation's operand, never a ruling on it**. The sweep may
  still not proceed on the map's silence.
- **No averaging was performed anywhere**, and no banked id was re-graded. Every correction in §2,
  §3.1 and §5 travels as a dated row here (E-3), and no dated artefact was rewritten.
