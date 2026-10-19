SERVED MODEL: claude-opus-5[1m]

# Glass-forward ask — a readout-rail field primitive for the easing instrument

**Row**: CC-063 · MT-F037 · gate **d2** (`W6.md:224`).
**Dated**: 2026-09-19, branch `tranche-u`, against installed `@mkbabb/glass-ui` **7.0.0**.
**Direction**: consumer (value.js) → producer (glass-ui). **glass-ui is READ-ONLY, ALWAYS** — this is
a letter, and no byte of the producer tree was written to author it.
**Authority for the branch**: `W6.md:217` — _"If the open-time census confirms that, the readout's
cure is a dated glass-forward BJ ask with the census pasted — **never a local restyle** (M-14 clause
1, glass-first law)."_
**Machine oracle**: `node docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-readout.mjs`.
That gate re-runs the census below on every run and **reds if a fitting primitive appears**, so this
letter cannot outlive the fact that justifies it.

---

## 0. Why this is a letter and not a restyle

`W6.md:226` makes d2 fail **in both directions**:

> _"d2 fails in both directions — if the readout is locally restyled instead of composed, and
> equally if a fitting published primitive exists at open and the wave filed a letter instead. (This
> is what stops d2 being satisfiable by writing prose.)"_

So the census below was taken **before** the branch was chosen, and it was taken against the
installed producer's own shipped declarations — not against the spec's prose, which is a year of
citation inheritance old (L-18 target 4). The gate re-derives every line of it.

---

## 1. The surface under discussion

`GradientEasingEditor.vue:184-205` — one readout rail per easing row:

```html
<div class="readout-rail flex items-center gap-1.5 rounded-md bg-well px-2 py-1">
    <code class="fira-code text-mono-small text-muted-foreground truncate flex-1 min-w-0"
          :title="row.css">{{ row.css }}</code>
    <button type="button" class="rail-btn shrink-0" :aria-label="…">   <!-- copy -->
    <button type="button" class="rail-btn shrink-0" :aria-expanded="…" :aria-controls="…">
</div>
```

It is **not a form field**. It has no label, no description, no error, and nothing editable: it is a
**read-only literal with two trailing icon actions on a well ground**. The owner's mark
`OM-13-easing-readout-not-glass-input.png` reads it as _"none of the glass input register"_, and the
ask is for the register it should have been composed from.

---

## 2. The census, pasted (re-derived by the gate every run)

Installed **`@mkbabb/glass-ui@7.0.0`**. `./input` is **NOT** a published subpath — measured against
the packed exports map, which publishes `./labeled-field` and `./number-field` and no bare input
register. Every field primitive those two subpaths publish, with the slot surface read out of its own
shipped `.d.ts`:

| subpath           | component              | `label` prop | shipped slots      |
| ----------------- | ---------------------- | ------------ | ------------------ |
| `./labeled-field` | `LabeledField`         | **REQUIRED** | `default`, `error` |
| `./labeled-field` | `LabeledInput`         | **REQUIRED** | `error`            |
| `./labeled-field` | `LabeledSelect`        | **REQUIRED** | `error`            |
| `./labeled-field` | `LabeledSlider`        | **REQUIRED** | `error`            |
| `./labeled-field` | `LabeledSwitch`        | **REQUIRED** | `error`            |
| `./number-field`  | `NumberField`          | optional     | `default`          |
| `./number-field`  | `NumberFieldContent`   | optional     | `default`          |
| `./number-field`  | `NumberFieldDecrement` | optional     | `default`          |
| `./number-field`  | `NumberFieldIncrement` | optional     | `default`          |
| `./number-field`  | `NumberFieldInput`     | optional     | —                  |

**Fitting primitives — a primitive fits iff it can host a read-only literal and two trailing icon
actions WITHOUT inventing a label the design does not have, i.e. (a) `label` optional AND (b) a
leading/trailing action slot: NONE.**

### 2a. The one candidate that had to be ruled on explicitly

`LabeledField` is the near miss and the reason this ask is not three lines. It **does** ship a
generic `default(props: LabeledFieldSlotProps)` slot — a real composition seam the spec's prose
(_"`LabeledInput` declares no trailing/leading slot"_) does not mention, because it is about a
different component. It is ruled **NOT FITTING**, on its own shipped declarations:

```ts
export interface LabeledFieldCommonProps {
    label: string; // REQUIRED — not `label?`
    description?: string;
    requirement?: LabelRequirement;
    layout?: LabeledFieldLayout;
    errorLive?: LabeledFieldErrorLive;
}
export interface LabeledFieldSlotProps {
    controlId: string;
    labelledBy: string;
    describedBy?: string;
    errorId?: string;
    invalid: boolean;
    disabled: boolean;
    required: boolean;
}
```

Composing the readout from it would mean **inventing a required visible label** the design does not
have, setting `controlLabelable: false` to suppress a `for` that has no target, and leaving
`controlId` / `labelledBy` / `errorId` / `required` unconsumed — a read-only literal wearing a form
field's clothes. And it would still supply **none** of the three things the readout actually needs:
the well ground, the mono-literal register, and a trailing action seam. That is not composition.

`NumberField` is ruled out on its subject: the readout carries a CSS `cubic-bezier(…)` **string**,
not a number.

---

## 3. The ask

A published readout/field primitive in the glass register that composes:

1. **a read-only literal** in the mono register (`fira-code` / `text-mono-small`), truncating with
   its full value on `title`, as the single source of the row's one-literal law;
2. **a well ground** — the `bg-well` backing already certified for ink-on-well contrast (the
   readout's own comment records **~2.7:1** on the raw translucent pane over the saturated
   atmosphere, i.e. failing AA, which is why the well is load-bearing here and not decoration);
3. **a trailing action seam** taking 1..n ghost icon buttons, each keeping its own
   `aria-label` / `aria-expanded` / `aria-controls`;
4. **no required label** — the affordance is the literal itself.

`LabeledField` is the natural home if the producer prefers to widen rather than add: `label` becomes
optional and a `trailing` slot lands beside `default`. Either shape closes this row.

**What the consumer will do on receipt**: delete `.readout-rail` and `.rail-btn` from
`GradientEasingEditor.vue` and compose the primitive. Nothing here is a request for a token or a
restyle.

---

## 4. Scope and honesty (L-18 targets 3 and 6)

- The census is scoped to the **installed 7.0.0 packed exports map** and the **shipped `.d.ts`
  declarations**. It is not a claim about the producer's source tree, which this seat did not read.
- _"No fitting primitive"_ is a claim about **this readout's** requirements as enumerated in §3, not
  a claim that the glass field register is deficient in general.
- **No motion, bundle, perf or safari-app property is claimed**, and d1 (the radius register) is a
  separate gate this letter does not touch or relieve.
- **d2 is the only gate this letter closes.** `.d` remains undispatched and **d1 stays RED**.

## 5. Relay status — ESCALATED, stated rather than assumed

The standing BH/BI relay edict (owner, 2026-07-12) requires every glass-ui-level ask to be relayed
into the coordination register at `docs/tranches/V/coordination/INBOX.md` as an `O-` row with its
letter file. **That file is in no `W6.md` §4 bounds row**, so minting the row from this seat would be
a write outside the wave's writable set. The row is therefore **returned as an escalation**, with
this document as the letter it should carry, rather than taken. The register tail at the time of
writing is **I-35 / O-39**; the row this ask owes is the next `O-`.
