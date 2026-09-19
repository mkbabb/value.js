SERVED MODEL: claude-opus-5[1m]

# value.js → latex-paper — X.F.W4's `/paper` producer relay

**From**: value.js, tranche X · Track C · sub-tranche **X·F** (fourier-analysis), wave **F.W4**. Unit `.z` (closure), `claude-opus-5[1m]`.
**Date sent**: **2026-09-18**. Sitting's date of record: 2026-09-17.
**Pin read against**: `@mkbabb/latex-paper` **0.2.1**, the installed dist in `fourier-analysis/web/node_modules`.
**Consumer**: `fourier-analysis` `web/src/components/paper/**`, branch `m/w1-bump-migration`.

⊘ **Producer rows ride mail, never frontend hacks.** No byte of latex-paper was written; no `node_modules` was patched; no producer selector was copied into consumer source; the pin was not moved. Every row below is the `/paper` route's own measurement, taken by unit `.e` and re-stated at close by unit `.z`.

⊘ **Filename note**: this letter's path carries the dispatch's unexpanded `DD` placeholder; the date of record is the one above. See `docs/tranches/X/fourier/F-W4-ADDENDA-z-2026-09-18.md` **A-z-9**.

---

## §1 `PAW-1` / `PAW-30` — the theme sheet is **inert in this app**, and that is the finding

Two banked rows charge latex-paper's `theme.css` with defeating the consumer's tokens. **Measured, both halves are true and the consequence is nil, for two independent reasons — and the second one kills the cure that was prescribed for it.**

**(a) The sheet's declarations are IACVT and dropped.** `theme.css` consumes its tokens as **bare HSL triplets**:

```
⟨cmd⟩ (node_modules/@mkbabb/latex-paper) grep -cE "hsl\(var\(" …/theme.css   → 42
```

This app's tokens are **whole colours**, not triplets. `hsl(var(--x))` over a whole colour is invalid at computed-value time, so every one of the 42 declarations is **dropped by the engine**.

**(b) The sheet is NEVER LOADED.** It is an opt-in subpath — `package.json:22 "./theme"` — and:

```
⟨cmd⟩ grep -rn "theme.css" src/ vite.config.ts   → no output
```

⊘ **Consequence for the banked cure, stated because it is the load-bearing half**: the prescribed consumer-side fix was to author an alias layer mapping your triplets onto our colours. **`K-9`'s kill of that limb is confirmed at the bytes: there is no alias to author, and authoring one would invent a dependency in order to patch it.** We wrote nothing.

**The ask, and it is a real one even though we are unaffected**: `hsl(var(--token))` makes `theme.css` usable **only** by consumers whose tokens are bare triplets. A consumer whose design system ships whole colours — ours, and glass-ui's — cannot opt in at all, and gets **silence** rather than a diagnostic when it tries. Either accept whole colours (`var(--token)` directly, or `color-mix()`), or state the triplet contract in the subpath's own docs so the opt-in fails loudly instead of invisibly.

---

## §2 `PAW-38` — slug uniquification. **The blocking prerequisite for `D5`, and it renews itself silently if this letter does not carry it**

`F-W4.md` §3 **D5** (deep-link restoration) is ruled **DEFERRED-WITH-DEFAULT — posed and blocked**, and §5.1's **LAW-5** states why in terms: *"any deep-link cure routes through `ensureTargetWindow`, under LAW-4, and **REQUIRES `PAW-38`'s slug uniquification FIRST**"*.

**`PAW-38` is yours.** Section slugs minted by the producer are not guaranteed unique across a document, so a deep link cannot name a target unambiguously, and a consumer-side deep-link restoration would be restoring to *a* section rather than *the* section.

⊘ **Unit `.i`'s Residual 3 is the reason this row is in this letter and not in a backlog**: *"`PAW-38`'s slug uniquification must ride `.z`'s LATEX-PAPER letter, **or the deferral renews itself silently at the next wave**."* A deferral whose prerequisite is never asked for is not a deferral; it is a drop with a date on it.

**The ask**: unique slugs per document (a disambiguating suffix on collision is enough), or a published statement that slugs are not unique so consumers stop building on the assumption.

---

## §3 The `parentId` defect — **BOTH producers carry it, in the same shape**

```
latex-paper : parentId: depth === 0 ? node.id : parentId
glass-ui    : parentId: a === 0     ? l.id    : o
```

**A root is its own parent, and every descendant inherits the ROOT's id** instead of its own parent's. Any consumer building a tree from the emitted `parentId` gets a flat two-level structure wearing a nested one's types.

⊘ **We routed around it.** Unit `.e`'s `D9` collapse replaced three parallel derivations of one 98-node ToC with **one** `useSidebarState` owned by `PaperView` and provided on a typed `InjectionKey`, and the losing adapter (`paperSectionToTreeNode`) is deleted — so our tree no longer reads your `parentId` at all. **That is exactly why this row will stay broken unless it is relayed**: the consumer that would have complained has stopped consuming it.

The identical row is in this wave's glass-ui letter. It is one defect with two homes and it is sent to both.

---

## §4 Cap-don't-delete: the KaTeX memo pair and four sequencing rows

These are booked at our end as **producer-routed**, not as consumer work. Named so the routing is checkable rather than asserted:

| row | substance | our posture |
|---|---|---|
| `PAW-45` / `PAW-46` | the KaTeX memo pair — an unbounded render memo whose growth the consumer cannot bound from outside | **CAP, DON'T DELETE.** We did not delete it and we did not cap it locally; the bound belongs where the memo lives |
| `PAW-28` · `PAW-32` · `PAW-39` · `PAW-54` | producer-side layout/semantics rows on the same surface | carried, routed here, **no local patch** |

⊘ **Why "cap, don't delete" is the whole instruction**: deleting the memo trades a growth problem for a re-render problem on the densest math surface in the app, and a consumer deleting a producer's memo is a consumer making a performance decision it cannot measure.

---

## §5 A measurement we owe you, from the wave's own gate chassis

Unit `.g`'s deriver (`G-F4-DERIVER`) publishes **producer-internal loop counts from first-party `d.ts`**, because a consumer-side `v-for` census is blind to them. At the installed pin:

```
@mkbabb/latex-paper@0.2.1   renderList modules=1   calls=8   d.ts components=7
```

⊘ Offered as data, not as an ask. It is the number a consumer's loop budget must add to its own, and no consumer census can derive it — which is `BS-3`'s whole point.

---

## §6 What we ask of this letter

1. **Disposition §1's triplet contract**, §2's `PAW-38`, §3's `parentId`, and §4's cap-don't-delete rows — accepted, declined, or already-fixed-and-we-misread.
2. **§2 is the one with a schedule consequence at our end**: `D5` stays *posed and blocked* until `PAW-38` moves, and F.W4 closed saying so rather than quietly renewing the deferral.
3. ⊘ **Nothing here is scheduled against you by us.**

**Our side's receipts**: `docs/tranches/X/execution/C/F-W4.md` (the wave record), `docs/tranches/X/fourier/F-W4-CLOSURE.md` (the closure transcript), `docs/tranches/X/fourier/F-W4-ADDENDA-e-2026-09-18.md` (unit `.e`'s dated addendum, where every `/paper` measurement above is banked with its command).
