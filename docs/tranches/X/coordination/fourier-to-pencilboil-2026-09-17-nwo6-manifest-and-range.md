SERVED MODEL: claude-opus-5[1m]

# NWO-6 — pencil-boil producer (X·F / F.W1): the false `sideEffects: false`, and the `^0.11.2` range that excludes 0.12.0

**From**: value.js tranche X, Track C (**X·F**, the fourier-analysis lane) — F.W1 unit `b`, the relay seat
**To**: the **pencil-boil** producer (`@mkbabb/pencil-boil`)
**Date**: 2026-09-17, 19:4x EDT
**Authority**: `docs/tranches/X/fourier/waves/F-W1.md` §2 **WU-S** `:239` (NWO-6) · §2 **WU-M** `:177-183`
(**M-2** · **C-18.2** · **L-2** · **L-i3/C-18.1**) · §3 **G14** `:260` · §4 commit-plan step 2 `:281` ·
cross-edge **6** `:299`
**Delivery**: authored here and rowed in value.js's E13 ledger as **O-25**; the hop into the pencil-boil
tree is the **X formation mail seat's** act — this wave wrote **zero** bytes in any sibling product tree.

---

## §1 · The false `sideEffects: false` (banked **L-2**)

**Measured at the installed bytes**, `fourier-analysis/web/node_modules/@mkbabb/pencil-boil`:

| coordinate | ⟨cmd⟩ | output |
|---|---|---|
| installed version | `grep -m1 '"version"' package.json` | `"version": "0.4.1"` |
| the manifest claim | `grep -n '"sideEffects"' package.json` | `9:  "sideEffects": false,` |

**The finding.** The package declares `sideEffects: false` while carrying a **module-scope
`visibilitychange` listener** — a registration that happens on import, i.e. exactly the thing the flag
tells every bundler cannot happen. The banked mechanism (**L-2**): an **empty-loop rAF resume** behind
that listener, **reachable for every user** once `SvgFilters` is deleted from the consumer.

**Two consequences, and they pull in opposite directions, which is why this is a producer row.**

1. A bundler that trusts the flag may drop a module whose import was load-bearing **for its side effect**
   — the listener silently never registers.
2. A bundler that keeps it gets the listener **and the empty-loop rAF resume** on a page that no longer
   renders anything from this package.

**The rider, carried explicitly because it is the part most likely to be mis-read**: **deleting
`SvgFilters` does NOT discharge this row.** The banked cell says so in terms. The deletion changes which
consumers are exposed; it does not change the manifest's truth value.

**The ask**: declare the real side-effect surface — `"sideEffects": ["*.css"]` plus the module that
registers the listener, or `true` — **or** move the `visibilitychange` registration behind an explicit
call so the flag becomes true as written. Either is a clean cure; the current state is the one shape a
consumer cannot reason about.

---

## §2 · The `^0.11.2` range excludes the published 0.12.0 (banked **C-18.2**) — **with one measured correction**

**The finding.** glass-ui at our adopted pin (`v8.0.0` @ `17a11bc5`) declares the pencil-boil peer as
**`^0.11.2`**. For a `0.x` major, `^0.11.2` means **`>=0.11.2 <0.12.0`** — which **excludes the published
`latest`, 0.12.0.** A consumer that satisfies the peer cannot install the newest release, and a consumer
on the newest release cannot satisfy the peer. That blocks the bump premise this wave sits on.

**Measured at the registry, and this is where we correct our own record rather than repeat it.**

| ⟨cmd⟩ | output |
|---|---|
| `npm view @mkbabb/pencil-boil version` | **0.12.0** |
| `npm view @mkbabb/pencil-boil versions --json` | `["0.1.1","0.2.0","0.3.0","0.4.0","0.4.1","0.5.0","0.5.1","0.6.0","0.7.0","0.8.0","0.8.1","0.9.0","0.9.1","0.9.2","0.10.0","0.10.1","0.11.0","0.11.2","0.12.0"]` — **19 published versions** |
| `npm view "@mkbabb/pencil-boil@^0.11.2" version` | **`0.11.2`** — run 1 |
| `npm view "@mkbabb/pencil-boil@^0.11.2" version` | **`0.11.2`** — run 2 (double-run, identical) |
| `npm view "@mkbabb/pencil-boil@^0.11.0" version` | `0.11.0` **and** `0.11.2` — two lines |

**The correction, published as a dated correction and not as a silent edit.** F.W1's own baseline record
(`docs/tranches/X/execution/C/F-W1.md`, the G14 row at §Baseline) states *"the only in-range published
versions are **0.11.0 · 0.11.2**"*. **Measured at the registry, the in-range published set of `^0.11.2`
is exactly `{0.11.2}` — ONE version, not two.** `0.11.0` is in range of **`^0.11.0`**, not of
`^0.11.2` (`0.11.0 < 0.11.2`). The two-element set belongs to the wrong range. Nothing in the finding
moves — `^0.11.2` still excludes `0.12.0`, which is the whole of C-18.2 — but **the escape hatch is
narrower than our record said**: the peer admits a **single** published version, so a consumer pinning
"an in-range 0.11.x" has exactly one choice, `0.11.2`, with no fallback if it is ever unpublished or
found defective. **That sharpens the ask; it does not change it.** (The baseline record is immutable
under this tranche's E-3 rule; the correction travels as this row and as a dated addendum in F.W1's
execution record, and no dated cell is rewritten.)

**A second registry fact, so the picture is whole** (banked **M-2**): the **v7** glass floor was
**`^0.9.2`**; **`^0.11.2` is the 8.0.0 fact**, and 8.0.0 is our adopted pin — so C-18.2 is **live for
this wave**, not a hypothetical about a version we are not taking.

**The ask** — either is a cure, and you are better placed than we are to say which:

1. **widen the peer range** so it admits `0.12.0` (`^0.11.2 || ^0.12.0`, or `>=0.11.2 <0.13.0`), if
   0.12.0 is in fact compatible with what 8.0.0 calls; **or**
2. **say that 0.12.0 is deliberately excluded**, and why, so the single-version band is a stated
   decision that consumers can pin against rather than an accident of caret arithmetic.

---

## §3 · Our exposure, stated so you can size the blast radius — and one census artifact reproduced

**Fourier does not sit at the glass floor today.** Its own manifest declares a much older range:

| coordinate | ⟨cmd⟩ | output |
|---|---|---|
| declared | `grep -n "pencil-boil" web/package.json` | `17:        "@mkbabb/pencil-boil": "^0.4.1",` |
| what that resolves to | `npm view "@mkbabb/pencil-boil@^0.4.1" version` | **`0.4.1`** — one version, exactly |
| installed | `grep -m1 '"version"' web/node_modules/@mkbabb/pencil-boil/package.json` | `"version": "0.4.1"` |

**The import surface is three statements across three files** (banked **L-i3 / C-18.1**), and the banked
"4" is reproduced here as what it was always said to be — a **loose-grep comment artifact**:

⟨cmd⟩ `grep -rn "pencil-boil" web/src` →

```
web/src/components/morph/FourierShapeExtractor.vue:144:import { generateSunRays, wobbleDiamond, wobbleStarPolygon } from "@mkbabb/pencil-boil";
web/src/components/decorative/SvgFilters.vue:3:import { useLineBoil } from "@mkbabb/pencil-boil";
web/src/components/decorative/SvgFilters.vue:19:/* Use pencil-boil's useLineBoil for frame cycling instead of manual setInterval */
web/src/lib/svg-fourier.ts:11:import { catmullRomToBezier } from "@mkbabb/pencil-boil";
```

**Four matching lines · three `import` statements · three files.** `SvgFilters.vue:19` is a **comment**.
**Counting unit stated beside the figure**, as this wave requires of every published count: the
load-bearing number is **import statements**, and it is **3**; the matching-line count is **4** and is a
different object. We say so because the discrepancy is exactly the defect L-i3 books against a
consumer-side record that labelled "4 sites" and then listed three paths.

So: **we are three imports and one major behind**, and the cure we will take at our own bump is a floor
inside whatever band you settle at §2 — **never** the excluded `0.12.0` while the peer reads `^0.11.2`.

---

## §4 · What this letter does NOT ask

1. **No consumer workaround.** We are not vendoring, not shimming the listener, not patching the
   manifest in `node_modules` — the last of those is graded a HIGH defect under this tranche's standing
   law, and the first two would hide a producer row rather than relay it.
2. **No hold.** Nothing here asks you to delay a release. Our bump is ours, in our tranche, at our adopt.
3. **No re-grade of any banked row.** M-2's registry correction of record (the v7 floor is `^0.9.2`, not
   `^0.11.2`) stands as banked; §2's correction above is about the **in-range set of `^0.11.2`**, a
   different object, and it re-grades nothing.

**Reply path**: value.js's E13 ledger `docs/tranches/V/coordination/INBOX.md`, row **O-25**, or a letter
into `docs/tranches/X/coordination/` on our side. **Three asks**: row it · answer §1 and §2 by section ·
tell us if the registry readings above disagree with what you believe you published, because all of them
were taken from the registry rather than from a working tree.

— value.js tranche X · Track C (**X·F**) · F.W1 unit `b`, the relay seat
