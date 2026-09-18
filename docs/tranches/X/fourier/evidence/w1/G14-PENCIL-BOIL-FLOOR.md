SERVED MODEL: claude-opus-5[1m]

# G14 — THE PENCIL-BOIL FLOOR, read at the ADOPTED tag, and the three drifted registry rows

**Gate**: `waves/F-W1.md` §3 `G14` `:260` — *"**PENCIL-BOIL FLOOR.** Read the optional-peer range at
the ADOPTED tag; **correct the three drifted registry rows.**"* Blocks **M-2 · C-18.2 · L-2**.
**Unit**: `c`. **Date**: 2026-09-17. **Adopted tag**: `v8.0.0` @ `17a11bc5`.
**E-3**: every correction below travels as a **dated row here**. No registry file is edited, no
dated artefact is rewritten, no banked id is re-graded.

---

## §1 THE FLOOR, READ AT THE ADOPTED TAG

⟨cmd⟩ (cwd `/Users/mkbabb/Programming/glass-ui`) `git show <pin>:package.json`, parsed as JSON,
**double-run at `17a11bc5`** (identical both runs):

| pin | `@mkbabb/pencil-boil` peer | optional? |
|---|---|---|
| installed 4.0.0 / tag `v4.0.0` | **`^0.4.1`** | yes |
| `v7.0.0` | **`^0.9.2`** | yes |
| **`17a11bc5` (ADOPTED)** | **`^0.11.2`** | **yes** |

Corroborating byte at the adopted tag: the same manifest carries a **devDependency pinned exactly**
— `"@mkbabb/pencil-boil": "0.11.2"` — so the producer builds against the floor's lower bound itself.

**Fourier declares** `"@mkbabb/pencil-boil": "^0.4.1"` (`web/package.json:17`), resolving to
**0.4.1** exactly. **The floor move this wave lands is `^0.4.1 → ^0.11.2`.**

**Two neighbouring peer facts, measured in the same read and not priced by any cell**, recorded
because G13 consumes them: `@mkbabb/keyframes.js` is **`^6.0.0` and OPTIONAL at `v7.0.0`** but
**`^6.0.0` and REQUIRED at `17a11bc5`**; `@lucide/vue` is **`^1.16.0` and REQUIRED at all three
pins** (which is MISS-LC2's manifest gate, born-RED in fourier's manifest).

---

## §2 THE THREE DRIFTED REGISTRY ROWS — corrected as dated rows

`M-2` (`fr-SvgFilters.md:86`, MAJOR, *"the correction of record"*) names them and its own closing
clause names the condition under which it inverts:

> *"the task charter's `^0.11.2` figure is the 8.0.0 fact and **is correct only if G1 adopts 8**."*

**G1 adopted 8** (`COHESION` §0i.3; `F-W1.md` §8.1). The three rows therefore re-resolve as follows.

| # | row | what it asserts | measured at the ADOPTED tag | dated correction |
|---|---|---|---|---|
| **D1** | **`fr-FourierShapeExtractor.md:100` — `C-18.2`** | 7.0.0 peers `^0.11.2`, which excludes producer 0.12.0 | `v7.0.0` = **`^0.9.2`** · `17a11bc5` = **`^0.11.2`** | **HALF-WRONG, HALF-LIVE.** Its *v7 attribution* is **FALSE** (M-2 was right: that seat confirmed HEAD and back-projected). Its *conclusion* is **TRUE AND NOW UNCONDITIONAL**: `^0.11.2` is the adopted floor and `>=0.11.2 <0.12.0` excludes 0.12.0. **C-18.2 is LIVE at F.W1, not conditional** |
| **D2** | **`fr-FourierMorphSvg.md:54` — `FM-22`** | *"the F.W1 pencil-boil `0.4.1 → ^0.11.2` migration surface"* | fourier `^0.4.1` → adopted peer `^0.11.2` | **CORRECT AT THE ADOPTED TAG.** FM-22 was wrong only under a 4→7 target. G1's adoption of 8 makes its spelling **exactly the migration this wave lands**. The row needs no cure; **this is its ratification** |
| **D3** | **`kf-HeroAurora.md:9`** | transcribes an installed 7.0.0's `^0.9.2` | `v7.0.0` = **`^0.9.2`** ✓ | **CORRECT AS A v7.0.0 TRANSCRIPTION — AND NOT THE F.W1 TARGET.** The row is accurate about the pin it read and names a pin this wave does not adopt. Quoting it as the F.W1 floor would be a defect |
| **D4** | **`M-2`'s own headline** — *"the floor is `^0.9.2`, not `^0.11.2`"* | — | `17a11bc5` = **`^0.11.2`** | **FALSE AT THE ADOPTED TAG, by M-2's own stated condition.** The correction of record is itself corrected, in the direction its author anticipated. **M-2 is not re-graded** (MAJOR stands; it was right about v7.0.0, which is what it measured) |

**The net inversion, stated plainly so no successor reads the wrong half**: M-2 corrected the
registry against a **4→7** target. The wave's target is **4→8**. At 8 the figure M-2 struck is the
right one, the row M-2 convicted (`C-18.2`) is vindicated in its conclusion, and the row M-2 held up
as correct (`kf-HeroAurora`) is correct about a pin nobody adopts. **Three rows, one contradiction —
and G1's ruling resolves it by moving the target, not by finding a miscount.**

### §2.1 M-2's CONSTRUCTIVE HALF, re-checked at the adopted floor — and it SURVIVES

M-2's load-bearing consequence is *"both cures the corpus wants land at v0.9.2, signature
unchanged ⇒ **no-break at this site**, and every '7 minors'-derived risk weight overstates."* That
argument was run at **v0.9.2**. The wave lands **v0.11.x**, so it must be re-run or it is a claim
about a pin the wave does not take.

**Fourier's consumed surface: 5 symbols, 3 import statements, 3 files** (⟨cmd⟩
`grep -rn "pencil-boil" web/src` → **4 matching lines**, of which `SvgFilters.vue:19` is a comment
— the counting unit `L-i3 / C-18.1` books, reproduced):

| symbol | site | installed 0.4.1 | `v0.11.2` | signature |
|---|---|---|---|---|
| `catmullRomToBezier` | `lib/svg-fourier.ts:11` | `src/path.ts:27` | `src/path.ts:27` | **identical** — `(points: [number, number][]): string` |
| `generateSunRays` | `FourierShapeExtractor.vue:144` | `src/celestial.ts:45` | `src/celestial.ts:45` | **identical** — `(seed: number): { outerPoly: string; innerPoly: string }` |
| `wobbleDiamond` | same | `src/celestial.ts:4` | `src/celestial.ts:4` | **identical** |
| `wobbleStarPolygon` | same | `src/celestial.ts:22` | `src/celestial.ts:22` | **identical** |
| `useLineBoil` | `SvgFilters.vue:3` | `src/vue.ts:110` | `src/vue.ts:387` | **identical arg list** — `(frameCount: MaybeRefOrGetter<number> = 4, intervalMs: MaybeRefOrGetter<number> = 125)`; body re-implemented over `createSubscription` |

⟨cmd⟩ `diff <(grep -n "^export function" <installed>/src/celestial.ts) <(git show v0.11.2:src/celestial.ts | grep -n "^export function")` → **no output** (identical). The same diff on
`path.ts` returns **only additions** (`boilLineFrames` `:228` · `boilRectFrames` `:262`), with
`catmullRomToBezier` unmoved at `:27`.

⇒ **M-2's "no-break at this site" HOLDS at the adopted floor, re-derived rather than inherited.**
The 4.0.1 → 0.11.2 hop is signature-compatible across every symbol fourier consumes, and the only
change in the consumed bodies is L-2's cure (§2.3).

### §2.2 `C-18.2` — LIVE, and the escape hatch is ONE version wide

| ⟨cmd⟩ | output |
|---|---|
| `npm view @mkbabb/pencil-boil version` | **0.12.0** (`latest`) |
| `npm view "@mkbabb/pencil-boil@^0.11.2" version` (double-run) | **`0.11.2`** · **`0.11.2`** |
| `npm view "@mkbabb/pencil-boil@^0.9.2" version` | `0.9.2` |

**The in-range published set of `^0.11.2` is `{0.11.2}` — ONE version**, confirming unit `b`'s
measured correction of the §Baseline `G14` cell's two-element set `{0.11.0, 0.11.2}` (`0.11.0 <
0.11.2`, so it is in range of `^0.11.0`, not `^0.11.2`). **C-18.2's finding does not move** —
`^0.11.2` still excludes the published 0.12.0 — but the ask is sharpened: a consumer honouring the
adopted floor has **exactly one** choice and **no fallback**. Binding on unit `e`: *"an in-range
**0.11.x**"* has a **unique referent, `0.11.2`**.

### §2.3 `L-2` — the MECHANISM is cured at the floor; the MANIFEST rider is NOT

| leg | installed 0.4.1 | `v0.11.2` | verdict |
|---|---|---|---|
| the empty-loop rAF resume | `src/vue.ts:77` `document.addEventListener('visibilitychange', …)` with no live-subscriber guard | `src/vue.ts:274-286` — `:277` `else if (schedulerRunning && hasActiveSubscriber())`, comment: *"Resume ONLY with a live subscriber — a page whose marks all withdrew while hidden (or never enrolled) **must not resume an empty idle loop**"* | **CURED by the bump**, exactly as L-2's cure cell predicts |
| the false `sideEffects: false` | `package.json:9` `"sideEffects": false` while `vue.ts` attaches a module-scope listener | **`package.json:9` `"sideEffects": false` — UNCHANGED**, and the listener is **still module-scope** (`:274`) | **NOT DISCHARGED.** The rider stands verbatim: *"deleting `SvgFilters` does NOT discharge this row"* — and neither does the bump |

**NWO-6 (sent by unit `b`, `70a87e7e`) is therefore still owed in full on its manifest leg**, and
its range leg is sharpened by §2.2. No consumer edit substitutes for either.

---

## §3 GATE READING

| | |
|---|---|
| **BEFORE** (§Baseline) | **RED** — the floor was unread at the adopted tag; three registry rows carried mutually contradictory figures; the in-range set was banked as two versions |
| **AFTER** | **GREEN.** The optional-peer range is read at the adopted tag (`^0.11.2`, optional, double-run); the three drifted rows are corrected as the dated rows D1–D3 above **plus D4 against M-2's own headline**; M-2's constructive half is re-derived at the adopted floor and survives; C-18.2 is LIVE with a one-version in-range set; L-2's mechanism leg is cured by the bump and its manifest leg is measured **undischarged** |

**What the gate does not do.** It does not edit `web/package.json` — the floor's **landing** is unit
`e`'s, inside the atomic transaction (*"the pencil-boil floor per G14 (an in-range **0.11.x**, never
the excluded 0.12.0)"*), and the referent is now unique: **`0.11.2`**. It does not re-grade M-2,
C-18.2, FM-22 or L-2, and it rewrites nothing in the registry.
