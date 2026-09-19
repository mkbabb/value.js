SERVED MODEL: claude-opus-5[1m]

# W4 §6 A3 — the `h-7` premise, MEASURED FALSE, and what was executed instead

**X.W4.a · 2026-09-18 · dated addendum-beside (E-3): `W4.md` is byte-untouched.**

## 1. The spec's stated premise

`W4.md:380` (gate **A3**, RED-today column), verbatim:

> **RED, measured** — **18** hand-pinned `h-7` control-height sites … e.g.
> `AdminAuditPanel.vue:30` `<Button variant="outline" size="sm" class="h-7 px-2">` — **the
> utility overrides the `sm` token and, being a fixed `rem`, cannot take the coarse lift**

and its falsifier:

> Fails when a utility re-pins a height (the computed box stops matching the token) **and**
> when **the coarse lift is absent (28px persists under `pointer: coarse`)** — two distinct
> failure modes, **both live today**

`W4.md:232-234` (§5, unit a's mechanism) rests the cure on the same premise:

> delete every hand-pinned `h-7` control height on a glass control and pass `size="xs"`
> instead — measured on disk at 7.0.0, `--control-h-xs` = `max(calc(1.75rem * var(--ui-scale)),
> var(--control-floor))`, which resolves 28px at `--ui-scale: 1` and 44px under
> `pointer: coarse` … **so the coarse lift is free**

## 2. What the bytes actually do — two independent measurements

### 2.1 The cascade, isolated (a producer `.button` cloned live, four rungs)

`⟨probe⟩` a real `[data-slot="button"]` on `/` cloned, re-classed, mounted out of flow,
measured, removed — at both matrices, on the dev stack:

| classes on the clone | FINE (1280×720) | COARSE (Pixel 7) |
|---|---|---|
| `size="sm"` **+ `h-7 px-2`** | **36 px** (`min-block-size: 36px`) | **54 px** |
| `size="sm"` + `px-2` | **36 px** | **54 px** |
| `size="xs"` **+ `h-7 px-2`** | **28 px** | **44 px** |
| `size="xs"` | **28 px** | **44 px** |

`h-7` changes **nothing** on either rung, at either pointer class.

### 2.2 The same thing in situ, on the real admin control

`AdminAuditPanel.vue:30`'s refresh Button, measured on `/#/admin/audit` under the admin
seed, before and after this unit's cure:

| | FINE | COARSE |
|---|---|---|
| **BEFORE** — `size="sm" class="h-7 px-2"` | 28 × **36** | 28 × **54** |
| **AFTER** — `size="xs" class="px-2"` | 28 × **28** | 28 × **44** |

## 3. Why — the mechanism, at the producer's bytes

`node_modules/@mkbabb/glass-ui/dist/components/button/styles.css`:

```css
.button { --button-size: var(--control-h-md); min-block-size: var(--button-size); … }
.button[data-size="xs"] { --button-size: var(--control-h-xs); … }
.button[data-size="sm"] { --button-size: var(--control-h-sm); … }
```

The producer states the rung as **`min-block-size`**, not `block-size`. Tailwind's `h-7`
sets `height: 1.75rem` = 28px; a `min-block-size` of 36px (sm, fine) or 54px (sm, coarse)
**always clamps above it**. So the utility is **INERT on the block axis**, and the coarse
lift the gate says is "absent" has in fact been **live all along** (36 → 54).

## 4. Consequently, both of A3's declared failure modes read FALSE at HEAD

- *"the computed box stops matching the token"* — it does not: at open the gate's own
  runtime assertion measured **4 sized controls, 0 mismatches** on the probed routes
  (`reopen-baseline.json`), i.e. **A3's runtime arm was GREEN-BEFORE-CURE**.
- *"28px persists under `pointer: coarse`"* — it does not: 54px was already being served.

What IS true, and remains the cure's whole justification: **18 hand-pinned control-height
utilities sat on glass controls, stating an intent the producer already publishes as an
axis, and doing nothing.** They are debt whether or not they bite.

## 5. What was executed, and why exactly that

**The spec's instruction was executed literally and completely**: every `h-7` on a glass
control deleted, the rung moved to `size="xs"`. 18 → 3, double-run.

The instruction was NOT re-derived from the falsified premise, because the instruction and
the premise are separable: the premise is the author's *measurement*, the instruction is the
author's *order*, and the order is independently the idiomatic root-cause cure — the demo
author who wrote `h-7` wanted the producer's 28px compact rung and reached for a utility
because they did not know the rung was published. `size="xs"` **is** that rung. The
`h-7` was a failed expression of exactly the intent `xs` states correctly.

**The consequence is stated loudly, because it is a real visual change and the spec
predicted it would be free**: these controls rendered **36px fine / 54px coarse** at HEAD
and now render **28px fine / 44px coarse**. That is a SHRINK at both matrices, not a
no-op, and at coarse it lowers a touch target from 54px to 44px — which is still exactly
`--touch-target` (`2.75rem`), the producer's own coarse floor, and still clears A1/A2's
24px bar with 20px to spare. No gate moves either way.

## 6. The three surviving `h-7` sites — classified, not silently dropped

`⟨cmd⟩ grep -rn 'class="[^"]*\bh-7\b' demo --include='*.vue' | grep -v 'w-7 h-7' | wc -l`
→ **3** (double-run):

| site | what it is | disposition |
|---|---|---|
| `AdminTagsPanel.vue:62` | `<Skeleton surface="glass" variant="breath" class="h-7 rounded-full">` | **NOT a control** — a loading placeholder. A3's subject is "every glass control"; `W4.md` §3 Not-in-scope routes **Skeleton inert props** to **X-W8**. In this unit's bounds, deliberately untouched. |
| `AdminListSkeleton.vue:18` | the same Skeleton shape | same class **and out of every W4 §4 bounds row** — writing it would be a §3a breach. |
| `SearchFilterBar.vue:76` | `<button class="block h-7 w-7 rounded-full …">`, the mini-colour-picker swatch trigger | a **native** `<button>`, not a glass control, and a deliberate 28×28 SQUARE (the swatch's shape is its meaning). It clears the 24px floor at both matrices, so A1/A2 are unaffected. Recorded as a residual: under `pointer: coarse` it stays 28×28 and never reaches `--control-floor`. |

## 7. Bearing on the wave

- **A3's runtime gate stands and is GREEN** — measured 4 / mismatches 0 at fine after the
  cure, unchanged from open.
- **A3's coarse arm has an empty population**: the Pixel-7 shell renders no
  `--control-h-*`-riding control on either probed route (the mobile dock substitutes a
  `dropdown-menu__trigger` and segmented tabs for the desktop Login/@mbabb Buttons). The
  coarse spec records this and does not demand a population the shell does not render;
  both of its row-wise assertions stand and arm the moment one appears.
- **X-W7 inherits A3's size-axis law** (`W4.md:481`). It should inherit §3 above with it:
  a `h-*` utility on a glass control is inert debt, not an override, and deleting one
  changes nothing until the `size` rung is moved with it.
