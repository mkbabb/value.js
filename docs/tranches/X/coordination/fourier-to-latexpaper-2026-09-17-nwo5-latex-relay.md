SERVED MODEL: claude-opus-5[1m]

# NWO-5 — LATEX-RELAY (X·F / F.W1): the 42-site token ask, `fr-PaperView C-06`, and the katex band

**From**: value.js tranche X, Track C (**X·F**, the fourier-analysis lane) — F.W1 unit `b`, the relay seat
**To**: the **latex-paper** producer (`@mkbabb/latex-paper`; sibling tree `/Users/mkbabb/Programming/latex-paper`)
**Date**: 2026-09-17, 19:4x EDT
**Authority**: `docs/tranches/X/fourier/waves/F-W1.md` §2 **WU-S** `:238` (NWO-5) · §3 **G16** `:262` ·
§2·R2b **b.5** `:375` (`fr-PaperView C-06`) · §4 commit-plan step 2 `:281` · cross-edge **5** `:298` ·
§5 Excluded `:525` (the conditional `web/src/components/paper/**` bound)
**Measured against**: `@mkbabb/latex-paper@0.2.1` as installed in
`fourier-analysis/web/node_modules/@mkbabb/latex-paper`
**Delivery**: authored here and rowed in value.js's E13 ledger as **O-24**; the hop into the
latex-paper tree is the **X formation mail seat's** act — this wave wrote **zero** bytes in any sibling
product tree.

---

## §0 · Why this letter exists at all — G16's disjunction, resolved by measurement

`F-W1.md` §3 **G16** states a two-armed condition:

> **LATEX-PAPER SUFFICIENCY.** Either the 42-site `hsl(var(--x))` → `var(--x)` rewrite enters the
> transaction, or it is **seated explicitly with a named owner**.

**The first arm is UNEXECUTABLE, and that is a measurement, not a preference.** The 42 declarations are
**published producer bytes**, not fourier's:

| fact | ⟨cmd⟩ | output |
|---|---|---|
| the 42 sites live in the installed package | `grep -c "hsl(var(" web/node_modules/@mkbabb/latex-paper/src/vue/theme.css` | **42** (double-run: 42 · 42) |
| the file's size | `wc -c < …/src/vue/theme.css` | **15764** |
| fourier's own source carries none of them | `grep -rn "hsl(var(" web/src \| wc -l` | **0** |
| and that file is **published**, not a stray source artifact | `grep -n '"files"' -A4 package.json` | `"files": [ "dist", "grammar", "src/vue/theme.css" ]` |

Rewriting them where they sit is a **local patch of `node_modules`**, which the standing law of this
tranche grades a **HIGH defect**, and `web/src` holds **zero** of them, so there is nothing on our side
to rewrite instead. **G16 therefore resolves to its second arm**, and **this letter is that seating**:
the named owner is **the latex-paper producer**. (The `web/src/components/paper/**` bound stays
**CLOSED** in F.W1 — `F-W1.md` §5 `:525` makes that exclusion conditional on a ruling seating the carry
here, and no such ruling exists.)

---

## §1 · PAW-1 — the 42 `hsl(var(--x))` declarations at `src/vue/theme.css`

**The finding.** `src/vue/theme.css` wraps token reads in `hsl(var(--x))`. The token shapes those
declarations read have been verified **complete-colour** at glass-ui 4.0.0, v7 **and** v8 — i.e. the
tokens already carry a full colour, not the bare `H S L` triplet the `hsl()` wrapper presupposes. The
consequence, as banked: **42 IACVT drops** (invalid-at-computed-value-time — the declaration is parsed,
found invalid at computed-value time, and the property falls back to `unset`), and **92 wrong rails**
downstream of them.

**Why the glass-ui uplift does not fix it, stated plainly**: because the token shapes are already
complete at **every** pin we could adopt, **no bump we perform changes this file's behaviour**. The
uplift cures nothing on `/paper`. That is precisely why the row is a relay row and not a wave row.

**The ask**: `hsl(var(--x))` → **`var(--x)`**, at all **42** sites in `src/vue/theme.css`.

**The witness that would demonstrate it** (offered so the fix can be proven rather than asserted, and
stated because the obvious witness is the wrong one): a **theorem + definition + aside rendered side by
side, in both colour schemes**. A proof-block or figure witness **cannot** show the defect — those
surfaces do not exercise the dropped rails.

**What we will do on receipt**: nothing in `web/src`. We re-pin `@mkbabb/latex-paper` and re-measure.
We will not mint a consumer-side override, because an override for a producer defect is a wave defect
under this tranche's standing edict.

---

## §2 · `fr-PaperView C-06` — `ComputedRef<any>` makes six downstream contracts vacuous

**Banked id**: `fr-PaperView C-06`, graded **MINOR**, booked at `F-W1.md` §2·R2b **b.5**. Its routing
cell reads: *"**F.W1** rider + **LATEX-RELAY** (generic fix at `ref<T\|null>`)"* — **the rider is F.W1's
and the fix is the relay's.** This section is the relay half.

**Measured at the published bytes, not inferred from the source tree** (the source tree is not in the
tarball; `files` publishes `dist`, `grammar`, and the one `theme.css`):

⟨cmd⟩ `grep -rn "ComputedRef<any>" .` in the installed package →

```
dist/vue/composables/useVirtualSectionWindow.d.ts:19:    activeId: import("vue").ComputedRef<any>;
dist/vue/composables/useVirtualSectionWindow.d.ts:20:    activeRootId: import("vue").ComputedRef<any>;
```

**The mechanism.** `activeId` and `activeRootId` are typed `ComputedRef<any>`. `any` is assignable in
both directions, so **six typed contracts downstream of this composable are vacuous** — they typecheck
against anything, including the wrong thing. And the defect is **invisible to the one gate that would
normally catch it**: `vue-tsc` cannot see a contract that admits everything, so the repo's only
automated gate **proves nothing here**. That is the whole grain of the finding — not that the types are
loose, but that looseness at this exact site disarms the checker for everything downstream.

**The ask**: give the composable a real generic and resolve the two refs at **`ref<T | null>`** (the fix
named in the banked routing cell), so the downstream contracts become falsifiable again.

**The negative, stated as a decision**: **we will not mint a consumer-side cast.** `F-W1.md` §5 bars it
(*a frontend workaround for a producer defect is a wave defect*), and a cast at our end would restore the
*appearance* of type safety at exactly the six sites where it is currently absent — the worst possible
outcome, because it would also hide the next drift.

**Reciprocal already named on our side**: `F-W10.md` §4b's `F.W1` cross-edge row lists this rider as
REQUIRED from this wave (⟨cmd⟩ `grep -o "C-06's \`ComputedRef<any>\` rider" F-W10.md` → *"C-06's
`ComputedRef<any>` rider"*), and **F-W10 §2.6, the LATEX-PAPER-RELAY roster**, holds the relay half. So
an answer here closes a loop that is already booked at both ends.

---

## §3 · The katex band — peer `^0.16`, installed **0.17.0**

Measured at the installed package's own manifest:

| coordinate | ⟨cmd⟩ | output |
|---|---|---|
| latex-paper's peer range | `grep -n "katex" package.json` | `42: "katex": "^0.16",` (inside `peerDependencies`) · `47:` `"katex": { "optional": true }` in `peerDependenciesMeta` · `60: "katex": "^0.16",` in `devDependencies` |
| what fourier actually installs | `grep -m1 '"version"' web/node_modules/katex/package.json` | `"version": "0.17.0"` |

**`0.17.0` does not satisfy `^0.16`.** The install is out of the declared peer band in both the peer and
the dev declarations. It resolves today only because the peer is marked **optional**, which suppresses
the warning without making the combination declared-supported.

**The ask**: widen the band to `^0.16 || ^0.17` if 0.17 is in fact supported, or state that it is not and
we will pin our side down. Either answer is actionable; the current state is the only one that is not,
because it leaves a supported-vs-tolerated question unanswered at a dependency that renders every
equation on the surface.

---

## §4 · The four named gaps, carried by row label and not re-derived

`F-W1.md` §2 WU-S's NWO-5 row names four further gaps beyond the three sections above:
**slot-type** · **slug-uniqueness** · **sourceLevel** · **ref**.

They are **cited by row label and carried unchanged** — the spec's law for this packet is that the roster
is cited, never re-derived, and re-deriving them at this seat would risk publishing a shape the banked
record does not hold. We note only that all four have a published surface to land on (`dist/index.d.ts`
and `dist/flattenPaperSections-*.d.ts` carry `slug` and `sourceLevel`; `dist/vue/components/*.vue.d.ts`
carry the slot types), so none of the four is blocked on a tarball change.

**Ask**: if you would like these four stated at full grain, say so on the reply and the X·F seat that
owns the banked records will send them as a second page. We did not pad this letter with a re-derivation
we could not stand behind.

---

## §5 · What this letter does NOT ask, and what happens next

1. **No consumer patch, at any site.** Not the 42 declarations, not a cast at the six contracts, not a
   katex pin minted to paper over the band. All three would be workarounds for producer defects.
2. **`web/src/components/paper/**` stays closed in F.W1.** It opens only if a ruling seats the carry
   there, and none does.
3. **G16's seating is this letter.** The gate's own reading — that the row is *seated explicitly with a
   named owner* — is recorded by F.W1's close seat (unit `f`), against this packet and its E13 row.
   This seat authored the ask; it does not stamp the gate.

**Reply path**: value.js's E13 ledger `docs/tranches/V/coordination/INBOX.md`, row **O-24**, or a letter
into `docs/tranches/X/coordination/` on our side. **Three asks**: row it · reply by section (§1 · §2 ·
§3, and §4 if you want the second page) · tell us if any of the three measurements above disagrees with
your tree, because every one of them was taken from the **published** package rather than from source.

— value.js tranche X · Track C (**X·F**) · F.W1 unit `b`, the relay seat
