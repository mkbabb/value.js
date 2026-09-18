SERVED MODEL: claude-opus-5[1m]

# X.W1.b · G-9 — THE INJECTION RECEIPT

**Unit**: X.W1.b · **Date**: 2026-09-17/18 · **Substrate**: `tranche-u`; the goldens these
receipts run against are the COMMITTED ones at `e2347c0e`
**Tolerance under test**: `maxDiffPixels: 120` · `threshold: 0.15`

G-9's falsifier, verbatim:

> Set tolerance high enough to absorb a visible change → a hand-injected 20px
> block passes. **The tolerance is validated by that injection, not by
> assertion.**

W1.md §X.W1.b's sub-gate:

> a one-pixel hand-edit to one golden turns the suite red, receipt in the wave
> log.

And the Archaeology row both come from — **D.W4's 0% pixel-drift gate, NOT
EXECUTED** ("pixel-isomorphic by construction", to preserve a 120-minute cap),
whose substituting analysis then conceded two non-isomorphic changes. W1.md's
guardrail: *"a tolerance is validated by a deliberate visible change, never by
argument."*

This file is that deliberate visible change, run.

---

## The tool

`e2e/visual/g9-injection.mjs` — committed, so the validation is reproducible
rather than something that happened once in a terminal. It paints an opaque
magenta block of a stated size at the centre of a named golden and reports the
exact pixel count it changed.

Magenta (`#FF00FF`) deliberately: it is maximally distant in YIQ from every
colour this UI paints, so the per-pixel `threshold` cannot be what rejects the
injection. **The test is the COUNT**, which is what the bar is made of.

The tool adds no dependency. The repo has no image codec — `pngjs` and
`pixelmatch` are both absent, as `e2e/smoke/fixtures/frame-diff.ts` already
records — so it reuses that file's `node:zlib`-only DECODER and adds the ~30
lines of encoder it needs.

---

## INJECTION 1 — a 20×20 block (G-9's own unit)

Run against the **committed** goldens at `e2347c0e`, so `--restore` is `git checkout`
and the demonstration leaves nothing behind.

⟨`node e2e/visual/g9-injection.mjs --golden at-rest-picker-both-1024-light-real-…png --size 20`⟩

```
  INJECTED into at-rest-picker-both-1024-light-real-angle-…-be9edeaf.png
    image     1024×768, 3 channels
    block     20×20 at (502, 374)
    pixels    400 differing
```

⟨`npx playwright test -c e2e/visual/visual.config.ts --project=visual -g "picker · both · light"`⟩

```
  ✘  1 [visual] › routes.visual.spec.ts:63:21 › at-rest · 1024 › picker · both · light (8.9s)
  ✓  2 [visual] › routes.visual.spec.ts:63:21 › at-rest · 3440 › picker · both · light (9.5s)
      394 pixels (ratio 0.01 of all image pixels) are different.
  1 failed
  1 passed (22.1s)
```

**394 differing pixels against a 120-px bar — RED, 3.3× over.** Two things in that
output matter as much as the failure:

- the grep matched **two** cells and the sibling `3440` cell **passed**, so the gate
  reddened the cell that was altered and not the run;
- Playwright counts **394**, not 400. Six of the painted pixels were already within
  `threshold: 0.15` of magenta in the original frame. The count is the *measured*
  difference, not the size of the edit, which is exactly what a pixel gate should
  report.

⟨`… -g "manifest digest"`⟩ — the digest gate reds on the same edit, independently:

```
    ALTERED  at-rest-picker-both-1024-light-real-angle-…-be9edeaf.png
               manifest 59e73e672aa7e04cf9bd55712b1a6a588306964c7fa63a07bbfd13a5fec0b378 (239793 bytes)
               on disk  eee1769907b157eba492e41d72e92a3099e945efc5e2c34373a2eac6bcb20391 (254923 bytes)
```

**THE BAR CANNOT ABSORB G-9's UNIT.** It was not chosen to be comfortable: at 120 it
sits 1.8–2.1× above the measured run-to-run floor (58–65 px) and 3.3× below this
injection.

---

## INJECTION 2 — a single pixel (the sub-gate's unit)

⟨`node e2e/visual/g9-injection.mjs --golden at-rest-picker-both-1024-light-real-…png --size 1`⟩

```
    block     1×1 at (511, 383)
    pixels    1 differing
```

⟨`… -g "picker · both · light"`⟩ → **`2 passed (28.5s)`** — exit 0.
⟨`… -g "manifest digest"`⟩ → **`1 failed`** — exit 1:

```
    ALTERED  at-rest-picker-both-1024-light-real-angle-…-be9edeaf.png
               manifest 59e73e672aa7e04cf9bd55712b1a6a588306964c7fa63a07bbfd13a5fec0b378 (239793 bytes)
               on disk  4aefa3fc656030765a35624169966e615e54f7695c6546e1cb0ab806235e627a (255009 bytes)
```

**That is the claim, demonstrated in one pair of commands.** The pixel comparison
passing on a one-pixel edit is not a failure of the gate — it is what a 120-px
tolerance *means*, and a bar low enough to red on one pixel would sit below the
measured 58–65-px noise floor and red on correct pages. The clause is answered by the
instrument the question actually needs: a digest, which is exact at any edit size down
to one bit.

Neither instrument substitutes for the other, and now neither has to.

---

## INJECTION 3 — the whole frame (the flat-frame backstop's own falsifier)

Not asked for by G-9. Run because the flat-frame assertion was **added by this seat**
after two committed goldens in this matrix's first mint turned out to be a single flat
colour, and a guard authored in response to a defect must be shown able to catch it.

⟨`node e2e/visual/g9-injection.mjs --golden at-rest-picker-both-1024-light-real-…png --size 1024`⟩
→ `block 1024×1024 at (0, 0)` · `pixels 786432 differing` — the entire frame is one colour.

⟨`… -g "flat colour"`⟩ → **`1 failed`**:

```
    at-rest-picker-both-1024-light-real-angle-…-be9edeaf.png — 1 distinct colour(s)
```

The guard reds for its own reason, naming the file and the count.

---

## Restoration

After each of the three, ⟨`node e2e/visual/g9-injection.mjs --restore`⟩ (which is
`git checkout -- e2e/visual/goldens`), then ⟨`git status --porcelain e2e/visual scripts/visual | wc -l`⟩
→ **`0`**, three times. No injected byte survives in the tree, and the goldens these
receipts describe are the committed ones.

---

## The regeneration script's own two clauses, RUN rather than read

G-9's second half: *"`scripts/visual/regenerate-goldens.mjs` requires `--accept` and
refuses a dirty tree."* Both were executed at these bytes, on the tree state each one
is about:

| command | tree | exit | what it printed |
|---|---|---|---|
| ⟨`node scripts/visual/regenerate-goldens.mjs`⟩ | clean | **2** | *"DRY RUN — nothing written… `--accept` means: I have read the visual diff and I ratify these pixels as the new baseline."* |
| ⟨`node scripts/visual/regenerate-goldens.mjs --accept`⟩ | one byte appended to `e2e/visual/tolerance.ts` | **1** | *"REFUSED — the working tree is dirty where it can change a pixel."* + the blocking path |

The dirty-tree arm was exercised with a **pixel-relevant** edit deliberately: the rule
is scoped (`demo/`, `src/`, `plugins/`, `e2e/`, `scripts/visual/`, the build config and
the goldens), and everything outside it is printed but does not block — because four
tranche-X tracks share one git index and a rule that always refuses is a rule someone
adds a bypass flag to.

**And running it is how the hole in it was found.** `git()` returned `stdout.trim()`,
which eats the leading space of `git status --porcelain`'s first line, so the first
path came back one character short — `ocs/tranches/…` for `docs/tranches/…`. Harmless
on that tree; not harmless with an unstaged `demo/App.vue` sorting first, which would
arrive as `emo/App.vue`, match no pixel-relevant prefix, and let the regeneration run
over an uncommitted product edit. Cured with `gitRaw()`; the full record is
`FIRST-MINT-VERIFICATION.md` §3.

---

## What this proves, and what it does not

**PROVES**: the pair (`maxDiffPixels: 120`, `threshold: 0.15`) cannot absorb a
change of G-9's stated size. The bar was measured against a 58-px floor
(`TOLERANCE.md` §2) and validated against a 400-px injection — from below and
from above, by measurement in both directions.

**PROVES**: a hand-edit to a committed golden, down to one pixel, is detected —
by the digest gate, which is the instrument that question needs.

**DOES NOT PROVE**: that every visible regression is caught. A change smaller
than 120 differing pixels passes the pixel comparison by construction; that is
what a tolerance IS, and the honest statement of this gate's sensitivity is the
number, not a claim of completeness. What the injection establishes is that the
number was not chosen to be comfortable.

**DOES NOT PROVE** anything about renderers other than the one in the goldens'
own filenames, or platforms other than `darwin` (IC-8), or the aurora and blob
surfaces (IC-5), or production typography (IC-1).
