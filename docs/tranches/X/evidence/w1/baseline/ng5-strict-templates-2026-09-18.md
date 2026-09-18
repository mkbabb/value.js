SERVED MODEL: claude-opus-5[1m]

# NG-5 — the `strictTemplates` born-RED count, measured and split

**NG-5's falsifier**: *"A published count without the split, or a count copied from a
prior document."* So this file carries a run, its command, and a classification
derived from the diagnostics' own text — not a figure re-typed from the corpus.

**R8's DISSENT is honoured, not resolved here.** SFB-17 routes the FLAG to X-W1;
PaletteCardSkeleton §9 and TagEditPopover TEP-4 route the identical flag to
**X.W7.a G3**. The fold's proposed ruling — *"W7.a keeps the FLAG (it owns the files
the flag reds); W1 owns the born-RED baseline and its split, because W1 owns the
`typecheck` script and the measurement is a gate artefact, not a product edit"* — is
what this file executes. **No flag is set in any tracked config by this unit.**
`grep -rn 'strictTemplates\|vueCompilerOptions' <tracked files>` remains **0**.

## The run

⟨cmd⟩ a scratch `tsconfig` copied from `tsconfig.demo.json`, with
`"vueCompilerOptions": { "strictTemplates": true }` added and nothing else changed,
then `npx vue-tsc -p <scratch> --noEmit`, 2026-09-18, at `ec654158`'s tree.

The scratch config lives in this session's scratchpad **on purpose**: publishing it
into the repo would be setting the flag, which is X.W7.a's.

## The count

| figure | value |
|---|---|
| **total diagnostics** | **271** |
| `TS2353` — unknown property on a component/element props type | 263 |
| `TS2322` — assignability | 8 |

The corpus's witness (SFB-17's executed run) reported **10 diagnostics = 6 real / 4
noise** over the SearchFilterBar PAIR. That number is not contradicted here: it is a
different denominator. **271 is the whole demo program**; 10 was one pair. Both are
recorded so neither is mistaken for the other.

## The split, derived from the diagnostics' own target types

| class | n | reading |
|---|---|---|
| **NATIVE-ELEMENT over-report** — the target type is `HTMLAttributes` / `SVGAttributes` / `ReservedProps` | **21** | `strictTemplates` rejects `data-*` on some intrinsic elements even though the attribute is legal HTML. **NOISE** — not product drift. |
| **PRODUCER PROP-SURFACE GAP** — the target is a component's own props object | **250** | the component's published type does not admit the attribute or listener the demo passes |

Within the 250, by the property the template passes:

| property | n | what it means |
|---|---|---|
| `onClick` | 98 | the producer component declares no `click` emit and drops the listener |
| `'aria-label'` | 50 | the producer declares no such prop **and** does not forward attrs |
| `variant` | 38 | a variant name the published union does not carry |
| `title` | 14 | |
| `tag` | 14 | the `as`/`tag` polymorphism the demo relies on is untyped |
| `surface` | 12 | |
| `data-*` on a component | 17 | `data-testid` · `data-slot` · `data-o18` · `data-stops` · `data-mix-source` · `data-stop-id` · `data-variant` · `data-layout` · `data-generate-plate` |
| other | 7 | `onKeydown` · `key` · `checked` · `asChild` · `onSubmit` · `onAnimationend` · `dataO18` |

## The finding this measurement makes, which the count alone does not

**The 98 `onClick` and 50 `aria-label` rows are the SAME SEAM this unit measured live
at the add-slot blocker.** The most frequent target types carry `readonly as`,
`readonly tone`, `readonly size`, `readonly iconOnly`, `readonly emphasis` — the
glass-ui button/dot family. A component that declares `inheritAttrs: false` and
publishes no `click` emit will both *type-reject* the listener here and *silently
drop* it at runtime, which is exactly what
`e2e/smoke/**`'s six add-slot sites measured as a dead affordance.

So `strictTemplates` is not merely a stricter compiler setting for this tree: **it is
a static detector for the producer-seam class that the dead-locator census found by
hand.** That is the argument for X.W7.a landing the flag, and it is stated here
rather than acted on, because the flag is X.W7.a's.

The 21 native-element rows and the producer d.t.s gaps ride the **BH relay** (fold
R8's *"the 4 noise rows are producer d.ts gaps → BH relay note"*, generalised to this
denominator).
