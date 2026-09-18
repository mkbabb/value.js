SERVED MODEL: claude-opus-5[1m]

# X.KF.W5.e — Arm D · STRUCTURE — evidence sheet

**Unit**: `X.KF.W5.e` (serial and alone, LAST). **Spec**: `docs/tranches/X/keyframes/waves/KF-W5.md`
§Bounds *Arm D* (`:255-265`) · §Carry *Arm D* (`:369-378`) · §Gates **G-DEPCRUISE · G-RING ·
G-SHIM · G-STRUCT** (`:412-415`) · §Sequencing **S-6 · S-7** (`:435-436`) · the **→ KF.W8** boundary
(`:444`). **Wave record**: `docs/tranches/X/execution/B/KF-W5.md`.

**Substrate.** keyframes.js `master`. Unit opened at **`d7f68225`** (arm `.d`'s last commit); a
concurrent **X.KF.W2** seat landed `0b747396` inside my window; this unit's own commit is
**`e325018f`**. **Every figure in this sheet is read at `e325018f` and double-run**; both runs agree
and the block that proves it is at §6. Nothing is inherited from the spec, from the wave record's
baseline, or from a lane.

**Rubric (KF-W5 §Carry Arm A, *"the D/L/C rubric itself"*)** — **D** = the module's *design* (API
shape, defaults, what it refuses) · **L** = its *library-contract truth* (docblocks, types, published
surface — the "does it say what it does" axis) · **C** = its *code* (structure, coupling, zone
hygiene). Scored per module against **B0**.

**B0, re-measured at this unit's ref** (S-7's re-measure-at-open, never inherited):

```
⟨git ls-tree -r HEAD --name-only -- src | grep -c '\.ts$'⟩  →  154      (HEAD = e325018f)
```

**B0 has MOVED under this wave**: **153 at the wave's open `7d958f21` → 154 at `e325018f`**. The one
new module is **`src/animation/compile/parse-facade.ts`**, minted by the concurrent **X.KF.W2** seat.
Booked, attributed, not absorbed: G-BASIS is `.b`'s gate and its 153 is correct *at the ref `.b` read*;
this sheet's percentages and denominators are **154**, printed with the ref that produced them.

---

## §0 — the standing gate this arm did not know it had (the finding that governs §4)

`npm run check` leg 3 runs **`proof:structure`** (`scripts/gates/structure/index.mjs`), which the spec
knew only as the unread owner of the *"159 modules"* rival (§0 R-2's fifth row, *"UNDERIVED, and stays
so until read"*). **It is read here**, and it is not a module counter — it is a **standing structural
gate encoding the R2-05 library target-tree grammar as six falsifiable rules**, and two of them are
this arm's own subjects:

```
⟨sed -n '11,13p' scripts/gates/structure/index.mjs⟩
 *   R1  dir-prefix stutter — a file whose basename repeats its parent dir name
 *       as a prefix (`easing/easing-option.ts`). Eponymous (`group/group.ts`)
 *       is the allowed grammar, NOT a stutter.
⟨sed -n '14,17p' scripts/gates/structure/index.mjs⟩
 *   R2  single-consumer fragment / hollow shim — a non-barrel file that is
 *       either (shim) pure re-export substance-free, or (fragment) the lone
 *       non-eponymous member stranded in its own directory. It belongs folded
 *       into the module that owns it.
⟨sed -n '21,22p' scripts/gates/structure/index.mjs⟩
 *   R4  500 raw-line ceiling — a source file over the ceiling (allowlist EMPTY
 *       at birth).
```

and the fragment arm's own code makes the blessing executable, not rhetorical:

```
⟨sed -n '548,552p' scripts/gates/structure/index.mjs⟩
        const nonIndex = directSourceFiles(dir, fileExtensions).filter((n) => !isBarrel(n));
        if (nonIndex.length !== 1) continue;
        const only = nonIndex[0];
        const dirName = basename(dir);
        if (baseNoExt(only) === dirName) continue; // eponymous primary — allowed
```

Gate state at this unit's ref:

```
⟨npm run proof:structure⟩              → proof:structure — PASS: scope=src clean (0 violations across R1–R6)
⟨node scripts/gates/structure/index.mjs --rule=R1⟩ → PASS: R1 clean on scope=src (0 violations)
⟨node scripts/gates/structure/index.mjs --rule=R2⟩ → PASS: R2 clean on scope=src (0 violations)
⟨node scripts/gates/structure/index.mjs --rule=R4⟩ → PASS: R4 clean on scope=src (0 violations)
```

**Three consequences bind §4, and each is a measurement, not a preference:**

1. **The repo's own grammar declares the eponymous primary ALLOWED and names `group/group.ts` as its
   example.** Eight of this wave's twelve stutters are exactly that shape.
2. **R2's fragment arm would RED the renamed tree.** Rename an eponymous primary and its directory's
   sole non-barrel file stops being eponymous — the `continue` above no longer fires and R2 reports a
   *single-member fragment*. For `orchestration/view-transition/` (one barrel + one module) the rename
   is **provably** a new RED inside `npm run check`. A "cure" that reds a standing gate is a
   regression, and the spec forbids exactly that shape at G-STAGGER-DOC's reading rule.
3. **R1's live predicate is PREFIX-only** (`easing/easing-option.ts`), while this wave's predicate is
   **any parent token**. The four **suffix** stutters — `compiled-frame`, `element-resolve`,
   `draw-svg`, `morph-svg` — are **invisible to R1** and are the genuine, unguarded half of D-6. That
   gap is this arm's finding and is relayed at §7.

---

## §1 — G-DEPCRUISE · D-1 + D-2 + D-4, ONE motion (S-4) — **GREEN**

### 1a · D-1's four dead allowlist paths — **CURED-AT-FRONTIER, booked with the sibling's sha, never claimed**

The spec re-verified D-1 **RED at `81a56990`** and called it *"the ONE arm-D row the 41 commits did
not touch"*. It is **GREEN before this unit wrote a byte**, and the cure is **KF.W4's**:

```
⟨git log --oneline -S 'physics/spring/solver/duration' -- .dependency-cruiser.cjs⟩ → fb509edd
   "ci(kf/merge-path): … depcruise past src/**, -monaco-themes (X.KF.W4 .b)"
```

Existence sweep over all **24** entries at this unit's ref — the four historical dead names
(`physics/spring/{duration,reseat,linear-stops,timing-function}`) now read
`physics/spring/solver/{duration,reseat}` and `physics/spring/css/{linear-stops,timing-function}`:

```
⟨for n in <the 24 entries>; do [ -f "src/animation/$n.ts" ] || echo "DEAD: $n"; done⟩
   → (no output) — 24 entries checked, 24 resolve, 0 DEAD
```

**Booked CURED-AT-FRONTIER (`fb509edd`), the B-14 idiom. This unit does not claim it.** What the wave
record's FINDING 1 hands forward is the live half, and it is the half the spec's own falsifier names:
*"Fails if the four paths are re-pointed **without** the existence assertion (the next move re-opens
the hole silently)."* The re-point happened elsewhere. **The assertion had still never been written.**

### 1b · the existence assertion — **the config claimed a check it did not run**

At `d7f68225` the allowlist block closed with this sentence, in the config's own voice:

> *"They are repointed to their live twins below; **every entry is existence-checked against
> `src/animation/<entry>.ts`**, and an entry that names no file is the defect, never a formality."*

`grep` the file for the check it describes and there is none: the array is declared, `LIGHT_FROM` is
built from it, and nothing ever asks the filesystem. **A comment describing a gate that does not exist
is the exact defect class this wave's goal criterion names** — *"every claim keyframes.js's library
makes about itself is either true or deleted"*. It is made TRUE, at load time, immediately below the
array (`e325018f`):

```js
const LIGHT_BARREL_DEAD = LIGHT_BARREL_MODULES.filter(
    (m) => !fs.existsSync(path.join(__dirname, "src", "animation", `${m}.ts`)),
);
if (LIGHT_BARREL_DEAD.length > 0) { throw new Error(…); }
```

Load-time, not run-time, and deliberately: rule 3's `from` set **is** this list, so a dead entry
subtracts a LIGHT module from the boundary check and every run stays green. Throwing at config load
reds `depcruise` — and therefore `lint`, and therefore CI — **on the move that caused it**.

**Falsifier exercised, not asserted** (inject one dead name, run, restore; the file is byte-identical
before and after):

```
⟨shasum .dependency-cruiser.cjs⟩                      → 6513a669d2eec575ff30adb287a37b85df058e76
⟨sed -i '' 's|"physics/spring/solver/duration",|"physics/spring/duration",|' …⟩
⟨npx depcruise --config .dependency-cruiser.cjs src⟩  →
   LIGHT_BARREL_MODULES names 1 module(s) that do not exist — physics/spring/duration. Rule 3
   (light-barrel-no-engine) derives its ENTIRE `from` set from this list, so a dead entry silently
   drops that module from the LIGHT/HEAVY boundary check and the run still greens. …
⟨cp <backup> .dependency-cruiser.cjs ; shasum⟩        → 6513a669d2eec575ff30adb287a37b85df058e76
⟨npx depcruise --config .dependency-cruiser.cjs src⟩  → ✔ no dependency violations found (160 modules, 705 dependencies cruised)
```

The gate is **non-vacuous by demonstration**: it passes on the true tree and fires on the exact defect
it was written for.

### 1c · D-2's honest baseline sentence — **the wave record's FINDING 2 cured, by correction, never deletion**

FINDING 2 recorded that `fb509edd` made the `no-cycle` comment's parenthetical false and that
G-DEPCRUISE's falsifier — *"Fails if the honest baseline sentence is deleted, weakened, or **made
false**"* — therefore fires on a clause a sibling wave moved out from under it. Measured again here:

```
⟨git show HEAD:package.json | grep -n '"lint"'⟩
   :44 "lint": "depcruise --config .dependency-cruiser.cjs src demo && eslint demo"
```

against the comment's `(`lint` is a bare `depcruise src`, no `--known-violations` flag)`. First clause
**FALSE**; second clause **TRUE**; the load-bearing denial (no baseline ratchet) **TRUE**. The sentence
is **corrected to the live script and kept whole** — KF.W4 is not reverted and no true statement is
deleted:

> *"… There is NO known-violations baseline: the historical
> `.dependency-cruiser-known-violations.json` ratchet was never created and is not wired — `lint` is
> `depcruise --config .dependency-cruiser.cjs src demo && eslint demo` (X.KF.W4, `fb509edd`), carrying
> no `--known-violations` flag, and no baseline file exists. …"*

**The three-clause oracle, re-run at `e325018f` — all three hold:**

```
(i)   ⟨grep -c 'knownViolations' .dependency-cruiser.cjs⟩                  → 0
(ii)  ⟨git show HEAD:package.json | grep -c -- '--known-violations'⟩       → 0
(iii) ⟨test -e .dependency-cruiser-known-violations.json⟩                  → ABSENT
```

The struck count-oracle stays struck: the honest sentence must NAME the file to deny it, and it does.

### 1d · a THIRD false claim in the same file, found by the same sweep

The same commit that falsified the parenthetical also falsified the file's **header docblock**, which
read, in spec voice, *"the kf source-graph lint tier is dependency-cruiser ONLY — **eslint is NOT
installed** … Adding eslint would be a second toolchain, a second config, a second CI step, for rules
these two already own."*

```
⟨node -e 'console.log(require("./package.json").devDependencies.eslint)'⟩ → ^10.10.0
⟨git ls-files | grep -i eslint⟩                                          → eslint.config.js
⟨git show HEAD:package.json | grep -n '"lint"'⟩                          → :44 … && eslint demo
```

Three independent refutations. Corrected, not deleted, and the substance preserved: eslint owns the
**demo SFC lane** (`.vue` rules no graph tool can see), dependency-cruiser owns the **source graph**,
and *"the two tiers are disjoint BY SURFACE, which is the thing the KILL-DOWN was actually
protecting."* The header's *"THREE forbidden rules over `src/`"* is corrected the same way — rule 1
cruises `^(?:src|demo)/` and `lint` passes both roots; rules 2 and 3 stay `src/`-scoped.

### 1e · D-4's two pass-throughs — the motion's live subject

The spec keeps D-1+D-2 *"one motion with D-4's two pass-throughs"* because
`physics/spring/css/index.ts` and `physics/spring/solver/index.ts` front **exactly the zones D-1's dead
allowlist pointed into**. Both read, both true at the bytes (pure re-export barrels, zero substance —
the R3-clean shape), and **both zones are now covered by the assertion**: four of the 24 entries
(`solver/{duration,reseat}`, `css/{linear-stops,timing-function}`) resolve through them, and a future
intra-zone move of any one reds at config load. **No byte is owed in either barrel** — the motion is
served by the assertion, which is what D-4's re-cut says it now serves.

### 1f · gate reading

| | BEFORE (`d7f68225`) | AFTER (`e325018f`) |
|---|---|---|
| allowlist entries / DEAD | 24 / 0 — **cured at frontier `fb509edd`** | 24 / 0 |
| existence assertion | **ABSENT** (and falsely claimed present) | **PRESENT**, falsifier exercised |
| `no-cycle` `lint` parenthetical | **FALSE** (FINDING 2) | **TRUE**, corrected, sentence kept whole |
| header "eslint is NOT installed" | **FALSE** | **TRUE**, corrected, KILL-DOWN substance kept |
| three-clause baseline oracle | (i) 0 · (ii) 0 · (iii) absent | (i) 0 · (ii) 0 · (iii) absent |
| `npx depcruise --config … src` | ✔ 0 violations, 160 modules, 705 deps | ✔ 0 violations, 160 modules, 705 deps |

**G-DEPCRUISE — GREEN.**

### 1g · out-of-bounds reading, recorded and NOT absorbed

`lint`'s depcruise half now cruises `src demo`, and **over `demo` it is RED at HEAD, by 4 genuine
runtime cycles**:

```
⟨npx depcruise --config .dependency-cruiser.cjs src demo⟩ → x 4 dependency violations (4 errors, 0 warnings). 435 modules, 1557 dependencies cruised.
⟨same, with the COMMITTED config git show HEAD:.dependency-cruiser.cjs⟩ → x 4 dependency violations  ← reproduces without this unit's bytes
```

All four are `demo/scenes/cube/orbital-drag/` — `index.ts ↔ OrbitalDrag.vue` and the three composables
through it. **Pre-existing, not this unit's, not in this unit's bounds** (no arm of this wave writes a
`.vue` file, for any reason), and reproduced against the committed config to prove the attribution.
**Relayed at §7, RD-e-2.** This unit's gate command is `depcruise src`, which is green.

---

## §2 — G-RING · the inventory MEASURED AT OPEN, and 45 per-ring dispositions — **GREEN**

### 2a · the instrument, and why it is two runs and not one

G-RING asks for the cruise *"with type-only edges **counted**"*. The repo rule exempts them, so the
gate's own command reports nothing — the exemption is the subject, so it must be **lifted to measure
and restored to judge**. Both runs, at `e325018f`:

```
⟨npx depcruise --config .dependency-cruiser.cjs src --output-type err-long⟩
   → ✔ no dependency violations found (160 modules, 705 dependencies cruised)          ← RUNTIME cycles = 0

⟨npx depcruise --config <overlay: same options, one rule {circular:true}, viaOnly LIFTED> src --output-type err-long⟩
   → x 45 dependency violations (45 errors, 0 warnings). 160 modules, 705 dependencies cruised.   ← RINGS = 45
```

The overlay is a **read-only measuring config in the scratchpad, not a repo file**; it `require`s
`.dependency-cruiser.cjs` and reuses its `options` verbatim (same resolver, same `tsconfig.json`, same
`doNotFollow`), so the only difference from rule 1 is the lifted exemption.

**RING COUNT = 45 at `e325018f`. Runtime cycles = 0.** The banked **17** was derived at `8281638c` and
is **VOID as a denominator** (R2-5); it is not re-asserted, not compared against, and not used as a
delta. `depcruise`'s **160 modules = 154 src modules + 6 `@mkbabb/value.js` subpath externals**
(`/css /value /color /easing /math /transform`), measured — which incidentally **derives G-BASIS's last
owed rival**: FOLD-FORWARD §C's *"159 modules"* is `depcruise src`'s module count at a ref where B0 was
153 (153 + 6 = 159), **not** a `proof:structure` figure. Recorded for `.b`; not claimed here.

**The exemption is honest, and it is proved rather than asserted.** Every one of the 45 rings was
re-walked edge by edge against the graph's `dependencyTypes`, and **every one carries at least one
`type-only` edge** — 45/45, which is why rule 1 greens:

```
⟨node <walk each ring's consecutive edges against depcruise's own type-only set>⟩
   → 45 rings, erasing-edge count per ring ∈ {1,2,3,4,5}; minimum 1; rings with ZERO erasing edges: 0
```

### 2b · the 45 rings, per-ring disposition — **never en bloc**

Each row carries its own erasing edge and its own kill cost. **KILL means removing that edge**;
**ACCEPT means the coupling is real, build-erased, and cheaper to keep than the cure.** The
writable-set column is the honest constraint: `✓` = the erasing edge's *source* file is inside this
unit's writable set, `✗` = it is not.

**Zone W · engine ↔ waapi — 14 rings (1-9, 15, 16, 20, 22, 26).**

| # | ring (abbrev.) | erasing edge | in set | disposition |
|---|---|---|---|---|
| 1 | `waapi/index → options → engine/index → animation → option-setters → pl/index → pl/frame → pl/strategies → waapi/index` | `waapi/options ⇢ engine/index` | ✗ | **ACCEPT** — `options.ts` names the engine's option types; the kill is a shared `engine/types` leaf, a carve of `engine/index.ts` |
| 2 | `waapi/emission → densify → engine/index → … → waapi/index → emission` | `waapi/densify ⇢ engine/index` | ✗ | **ACCEPT** — same leaf; `densify` reads frame types only |
| 3 | `waapi/emission → engine/index → … → waapi/index → emission` | `waapi/emission ⇢ engine/index` | ✗ | **ACCEPT** — same leaf |
| 4 | `waapi/eligibility → engine/index → … → waapi/index → eligibility` | `waapi/eligibility ⇢ engine/index` **+** `waapi/index ⇢ eligibility` | ✗ | **ACCEPT** — doubly erased; the barrel's own type re-export is the second cut |
| 5 | `waapi/densify → engine/index → … → waapi/index → densify` | `waapi/densify ⇢ engine/index` | ✗ | **ACCEPT** — same leaf as 2 |
| 6 | `waapi/delegation → options → engine/index → … → pl/strategies → delegation` | `waapi/options ⇢ engine/index` **+** `pl/strategies ⇢ waapi/delegation` | ✗ | **ACCEPT** — the **bidirectional type contract** between the engine's play strategies and the waapi lane; killing it is the `singleTarget`/delegation redesign, not a structure move |
| 7 | `waapi/delegation → emission → engine/index → … → delegation` | `waapi/emission ⇢ engine/index` **+** `pl/strategies ⇢ delegation` | ✗ | **ACCEPT** — same contract |
| 8 | `waapi/delegation → eligibility → engine/index → … → delegation` | 3 edges: `delegation ⇢ eligibility`, `eligibility ⇢ engine/index`, `pl/strategies ⇢ delegation` | ✗ | **ACCEPT** — triply erased |
| 9 | `waapi/delegation → engine/index → … → delegation` | `waapi/delegation ⇢ engine/index` **+** `pl/strategies ⇢ delegation` | ✗ | **ACCEPT** — same contract |
| 15 | `pl/strategies → waapi/index → delegation → engine/index → … → pl/strategies` | `waapi/index ⇢ delegation`, `delegation ⇢ engine/index` | ✗ | **ACCEPT** — the barrel hop; no runtime edge exists to break |
| 16 | `pl/strategies → waapi/delegation → engine/index → … → pl/strategies` | `pl/strategies ⇢ delegation`, `delegation ⇢ engine/index` | ✗ | **ACCEPT** — the contract's shortest form; the canonical member of the zone |
| 20 | `pl/index → pl/strategies → waapi/index → delegation → engine/index → animation → pl/index` | `waapi/index ⇢ delegation`, `delegation ⇢ engine/index` | ✗ | **ACCEPT** — same two cuts, entered from the play-lifecycle barrel |
| 22 | `pl/frame → pl/strategies → waapi/index → delegation → engine/index → … → pl/frame` | `waapi/index ⇢ delegation`, `delegation ⇢ engine/index` | ✗ | **ACCEPT** — same two cuts, entered from `pl/frame` |
| 26 | `engine/css/index → css/animation → engine/animation → … → waapi/index → delegation → engine/index → css/index` | `waapi/index ⇢ delegation`, `delegation ⇢ engine/index` | ✗ | **ACCEPT** — the longest ring in the tree (10 hops); it exists only because the css lane re-enters through the engine barrel |

**Zone E · engine core — 12 rings (17-19, 21, 23-25, 27-31).** Every erasing edge here is
`<collaborator> ⇢ engine/animation.ts`: a module carved OFF the `KeyframesAnimation` god-object names
the class it was carved from, in its own signature.

| # | ring | erasing edge | in set | disposition |
|---|---|---|---|---|
| 17 | `pl/strategies → pl/transport → animation → option-setters → pl/index → strategies` | `pl/transport ⇢ animation` | ✗ | **ACCEPT** — `53b907c5`'s carve; the transport leaf types its receiver |
| 18 | `pl/strategies → animation → pl/index → strategies` | `pl/strategies ⇢ animation` | ✗ | **ACCEPT** — same carve, shortest form |
| 19 | `pl/index → pl/transport → animation → pl/index` | `pl/transport ⇢ animation` | ✗ | **ACCEPT** — same edge as 17, entered from the barrel |
| 21 | `pl/frame → pl/transport → animation → option-setters → pl/index → frame` | `pl/transport ⇢ animation` | ✗ | **ACCEPT** — same edge as 17/19 |
| 23 | `pl/frame → pl/events → animation → option-setters → pl/index → frame` | `pl/events ⇢ animation` | ✗ | **ACCEPT** — the event leaf types its emitter |
| 24 | `pl/frame → animation → pl/index → frame` | `pl/frame ⇢ animation` | ✗ | **ACCEPT** — `.c`'s B-8 `delay` cure surface (`1c481b09`); a ruling landed here this wave and S-6 forbids moving it under that ruling |
| 25 | `option-setters → pl/index → pl/events → animation → option-setters` | `pl/events ⇢ animation` | ✗ | **ACCEPT** — same edge as 23 |
| 27 | `animation → resolve/element-resolve → animation` | `element-resolve ⇢ animation` | ✗ | **ACCEPT, and the closest call in the inventory.** `element-resolve.ts` **is** in the writable set, but the edge is `import type { KeyframesAnimation }` at `:34` feeding `bindTargets(animation)` — the S.B2 carve *"lifted off the `KeyframesAnimation` god-object"* (its own docblock `:3`). Killing it means either re-inlining the carve (a regression) or re-typing on a structural interface declared in a leaf — a change to `engine/animation.ts`'s **type surface**, outside this unit's set and a live `.c`/`.d` cure surface this wave |
| 28 | `animation → pl/index → pl/events → animation` | `pl/events ⇢ animation` | ✗ | **ACCEPT** — same edge as 23/25 |
| 29 | `animation → option-setters → animation` | `option-setters ⇢ animation` | ✗ | **ACCEPT** — G-OPTSET's own surface; `.c` ESCALATED on it this wave, so S-6 pins it |
| 30 | `animation → interpolate → animation` | `interpolate ⇢ animation` | ✗ | **ACCEPT** — same carve shape |
| 31 | `animation → compile-bridge → animation` | `compile-bridge ⇢ animation` | ✗ | **ACCEPT** — **`.d`'s G-RENDERER cure landed in this exact file this wave** (`d7f68225`); S-6 forbids a structure move under a landed ruling |

**Zone G · group — 4 rings (11-14).** Every erasing edge is `<sibling> ⇢ group/group.ts`.

| # | ring | erasing edge | in set | disposition |
|---|---|---|---|---|
| 11 | `group/lifecycle → group/waapi → group/group → lifecycle` | `group/waapi ⇢ group/group` | ✗ | **ACCEPT** — `waapi.ts:31-33` is C-3's `isGroupWAAPIEligible` surface, ruled this wave |
| 12 | `group/group → lifecycle → group` | `lifecycle ⇢ group/group` | ✗ | **ACCEPT** — same shape; `group.ts` is in the set but the edge's source is not |
| 13 | `group/group → layer-api → group` | `layer-api ⇢ group/group` | ✗ | **ACCEPT** — LP-1's rider surface |
| 14 | `composite/compositor → group/group → composite/index → compositor` | `compositor ⇢ group/group` | ✗ | **ACCEPT** — the compositor types its owner |

**Zone S · sequence — 1 ring (10).**

| # | ring | erasing edge | in set | disposition |
|---|---|---|---|---|
| 10 | `sequence/lifecycle → sequence/sequence → lifecycle` | `sequence/lifecycle ⇢ sequence/sequence` | ✗ | **ACCEPT** — the shortest ring in the tree; `sequence.ts` is in the set, the edge's source is not, and `.c`'s PRM inversion (`d002ce7e`) landed in `sequence.ts` this wave |

**Zone V · constants ↔ compile/value — 14 rings (32-45).** **The highest-leverage kill in the whole
inventory, and it is one edge.** Thirteen of the fourteen are erased by
**`constants/types.ts ⇢ compile/value/index.ts`**; the fourteenth (33) is the mutual
`constants/defaults ⇄ constants/types` type pair.

| # | ring | erasing edge(s) | in set | disposition |
|---|---|---|---|---|
| 32 | `constants/index → types → value/index → value/ast → constants/index` | 3, incl. `constants/types ⇢ value/index` | ✗ | **ACCEPT-PENDING → relayed as RD-e-1**: the single kill `constants/types ⇢ compile/value/index` retires **13 of 14** rings in this zone. `constants/types.ts` is outside this unit's set, and its `\| string` line is expressly reserved to **KF.W4's KF-CB-18+24+29 bundle** (KF-W5 §Sequencing → KF.W4, *"Owed to KF.W4 from here"*) |
| 33 | `constants/defaults → types → defaults` | `defaults ⇢ types` **and** `types ⇢ defaults` | ✗ | **ACCEPT** — a **mutual type-only pair inside one zone**, both directions erased; the only ring in the inventory with no runtime edge at all in either direction. Splitting it costs a third file for zero runtime benefit |
| 34 | `value/sink → value/compile → constants/index → defaults → types → value/index → sink` | 3, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 35 | `value/sink → value/ast → constants/index → defaults → types → value/index → sink` | 4, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 36 | `value/sink → frame/interp-slot → resolve/browser → emit/css-text → constants/index → defaults → types → value/index → sink` | 4, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 37 | `value/index → sink → constants/index → defaults → types → value/index` | 3, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 38 | `value/compile → constants/index → defaults → types → value/index → compile` | 3, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 39 | `value/compile → value/ast → constants/index → defaults → types → value/index → compile` | 4, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 40 | `value/compile → parse-facade → emit/css-text → constants/index → defaults → types → value/index → compile` | 3, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1**; **minted by X.KF.W2's `parse-facade.ts` inside this wave** — attributed, not absorbed |
| 41 | `value/compile → frame/interp-slot → resolve/browser → emit/css-text → constants/index → defaults → types → value/index → compile` | 3, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 42 | `value/ast → constants/index → defaults → types → value/index → ast` | 4, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 43 | `parse-facade → emit/css-text → constants/index → defaults → types → value/index → ast → frame/interp-slot → resolve/browser → parse-facade` | 5, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1**; **X.KF.W2-minted**, attributed |
| 44 | `frame/interp-slot → resolve/browser → emit/css-text → constants/index → defaults → types → value/index → ast → interp-slot` | 5, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |
| 45 | `emit/css-text → constants/index → defaults → types → value/index → ast → frame/interp-slot → css-text` | 5, incl. `types ⇢ value/index` | ✗ | **ACCEPT-PENDING → RD-e-1** |

**Tally, printed not asserted**: W 14 + E 12 + G 4 + S 1 + V 14 = **45**. Dispositions: **ACCEPT 32 ·
ACCEPT-PENDING (relayed, RD-e-1) 13 · KILL 0**. **Zero rings are killable inside this unit's writable
set** — measured, not claimed: for each of the 45, the erasing edge's *source* file is outside the set
(§2b's "in set" column is `✗` in all 45 rows, including ring 27 where the *target* of the edge is what
lies outside).

### 2c · the exemption stated honestly in the config

G-RING's second clause: *"the `no-cycle` comment states the **real** mechanism —
`viaOnly.dependencyTypesNot`"*. At `d7f68225` the rule's own `comment` string said only *"`type-only`
edges are exempt — an `import type` is erased at build and carries no runtime init hazard"*, which is
the **head-edge** reading and is not what the rule does. `viaOnly` was explained in a code comment
beside the option and nowhere in the message a reader sees when the rule fires. Corrected at
`e325018f`, in the comment string itself:

> *"THE EXEMPTION, NAMED PRECISELY: it is `viaOnly.dependencyTypesNot: ['type-only']` below, and it is
> NOT a head-edge test — a ring is reported only when EVERY edge around it is a runtime edge, so a
> ring that closes through even one `import type` is exempt, that edge being erased at build. Read the
> exemption for what it is: the exempt rings are REAL COUPLING in the source graph; what they are not
> is a module-init hazard. … so this rule greens with ZERO violations WHILE the type-erased ring
> inventory is not zero. Do not read the green as the inventory: re-run this same cruise with the
> `viaOnly` clause lifted to enumerate it …"*

**No numeral is written into the config.** A ring count in a source comment is a figure that goes stale
the first time the tree moves — the exact class this tranche exists to kill — so the comment carries
**the probe** and points at this sheet. Anchors re-resolved at `e325018f` by RULE NAME (the wave
record's FINDING 5 idiom; the spec's `81a56990` spellings and the record's `7d958f21` spellings are
both dated readings, and this one will be too — the names are the anchors, the numbers are not):
file **316 L** (253 at `81a56990`, 261 at `7d958f21`) · `LIGHT_BARREL_MODULES` **`:82-107`** (24
entries) · the existence assertion **`:116-131`**, its own comment **`:109-115`** · `LIGHT_FROM`
**`:136`** · rule 1 `no-cycle` **`:165`** · `viaOnly.dependencyTypesNot` **`:211-212`** · rule 2
`leaf-no-engine-no-valuejs` **`:226`** · rule 3 `light-barrel-no-engine` **`:266`**.

```
⟨grep -n 'const LIGHT_BARREL_MODULES = \[\|^\];\|^const fs = require\|^if (LIGHT_BARREL_DEAD\|^const LIGHT_FROM\|name: "no-cycle"\|viaOnly: {\|name: "leaf-no-engine-no-valuejs"\|name: "light-barrel-no-engine"' .dependency-cruiser.cjs⟩
   82:const LIGHT_BARREL_MODULES = [      107:];                 116:const fs = require("node:fs");
  122:if (LIGHT_BARREL_DEAD.length > 0) { 136:const LIGHT_FROM   165:name: "no-cycle"
  211:viaOnly: {  212:dependencyTypesNot: ["type-only"]          226:name: "leaf-no-engine-no-valuejs"
  266:name: "light-barrel-no-engine"     ⟨wc -l⟩ → 316
```

**G-RING — GREEN.** Inventory measured at open with its invocation and ref printed (45 @ `e325018f`);
45 per-ring dispositions, none en bloc; the exemption stated honestly and proved 45/45 at the edges.

---

## §3 — G-SHIM · the declared regression FLOOR — **GREEN (floor held, not a cure)**

**Not born-RED, and this sheet says so.** Cured upstream at **`7e9ddf49`**; the floor's subject is the
regression, not the defect. Re-measured at `e325018f`:

```
⟨git ls-tree -r HEAD --name-only -- src/animation/presets⟩
   src/animation/presets/catalog.ts
   src/animation/presets/classic-data.ts
   src/animation/presets/index.ts                       → exactly 3; no classic.ts / spring.ts / taxonomy.ts
⟨git grep -c 'split by kind' HEAD -- src/⟩             → 0 hits
⟨npx vitest run --project library⟩                     → 112 files passed | 5 skipped; 1252 passed | 3 expected fail | 14 skipped
⟨npm run build⟩                                        → ✓ built in 1.84s (exit 0)
```

The `index.ts:1-8` docblock's structural claim is checked against the tree it describes and holds
(*"The substance is `catalog.ts` … This barrel re-exports the full preset surface by name"*) — three
files, and the barrel names what is there.

**Attributed instrument reading, recorded rather than smoothed.** A first library run during this unit
returned **2 failed** (`test/compile/grammar-fuzz.test.ts` → `PROBE > malformed-matrix`, `PROBE2 >
nbsp-matrix`). `git status` at that moment showed that file **modified in the shared worktree** by the
concurrent **X.KF.W2** seat; the seat committed (`0b747396`) and the settled re-run is the green above.
**Not absorbed, not "fixed", not this unit's** — the reading is recorded with its cause so a later
census does not attribute it here.

**G-SHIM — GREEN as a floor.** Booked CURED-AT-FRONTIER (`7e9ddf49`); **this unit claims none of it**,
which is the gate's own falsifier (*"Fails if a seat books it as a born-RED, or claims its cure as this
wave's work"*).

---

## §4 — G-STRUCT · 10 god modules × split-or-keep · 12 stutters × rename-or-keep — **GREEN on disposition; the rename EXECUTION is ESCALATED (§5)**

### 4a · the god-module roster, RE-DERIVED at this unit's ref — **it has MOVED, and by whose hand**

```
⟨for f in $(git ls-tree -r HEAD --name-only -- src | grep '\.ts$'); do n=$(git show HEAD:$f | wc -l); [ "$n" -ge 437 ] && echo "$n $f"; done | sort -rn⟩
   499 ingest/cssom.ts            498 group/group.ts                  497 engine/animation.ts
   484 physics/spring/progress.ts 470 orchestration/drag/draggable.ts 461 compile/frame/compiler.ts
   459 compile/emit/entry.ts      458 presets/classic-data.ts         442 orchestration/split-text/split-text.ts
   438 compile/emit/view-transition.ts
```

**TEN, not eight.** The roster's own floor (≥437 L) is unchanged and the probe is the spec's; what
moved is the tree, inside this wave's own window. Attribution per row, measured
(`git show 7d958f21:<path> | wc -l` → `git show HEAD:<path> | wc -l`):

| module | wave-open `7d958f21` | now `e325018f` | Δ | whose hand |
|---|---|---|---|---|
| `orchestration/split-text/split-text.ts` | **345** | **442** | **+97** | **NEW ENTRANT** — `X.KF.W5.c`'s B-1+B-2+B-3 split-text motion (`2549c133`) + `c0727002` |
| `compile/emit/view-transition.ts` | **387** | **438** | **+51** | **NEW ENTRANT** — **X.KF.W2** `.c` (`0cfd3b5f`) |
| `ingest/cssom.ts` | 466 | 499 | +33 | **X.KF.W2** (`02a87f7a`, *"back under the 500-line ceiling"*) |
| `group/group.ts` | 437 | 498 | +61 | `X.KF.W5.c` (`9e5aec60` · `95d91c53` · `d002ce7e` · `0b593743`) |
| `engine/animation.ts` | 478 | 497 | +19 | `X.KF.W5.c` / `.d` |

**No row is reduced by this unit.** Shrinking a sibling's module to restore the banked 8 would be
moving a sibling's RED, which the wave record's FINDING 3 reading rule names a HIGH defect. The
denominator is **10, at `e325018f`, with the probe printed**, and both new entrants are booked to the
seats that made them.

### 4b · 10 god modules × split-or-keep, D/L/C scored

**The standing ceiling is 500 raw lines** (`proof:structure` R4, allowlist EMPTY) and **all ten are
under it** — R4 reports 0. Line count alone is therefore not a split ground in this tree; it is a
**proximity warning**, and two modules are now within two lines of a hard gate.

| # | module | raw L | **D** | **L** | **C** | disposition | reason |
|---|---|---|---|---|---|---|---|
| 1 | `ingest/cssom.ts` | 499 | — | — | — | **READ + DISPOSITION ONLY — NOT TAKEN** | **KF.W2's façade boundary, declared not taken** (§Bounds *"read + disposition only"*; §Sequencing). **The one urgent row in the table**: 499 of a 500 ceiling, i.e. **one line** from redding `npm run check`, and the file is under active X.KF.W2 edit (`02a87f7a` pushed it back under the ceiling once already). **Relayed, not cured: RD-e-3.** |
| 2 | `group/group.ts` | 498 | **PASS** | **PASS** | **HOLD** | **KEEP — split BLOCKED by S-6** | 2 top-level exports; the god-ness is the `AnimationGroup` class, not a bucket. **`.c` landed two rulings in this file this wave** (PRM inversion `d002ce7e`, `singleTarget` opt-out `0b593743`), and S-6 is explicit: *"G-STRUCT's splits land after every ruling in arm B"* — after, meaning the rulings own the file's shape first. **498/500: second-most urgent → RD-e-3.** |
| 3 | `engine/animation.ts` | 497 | **PASS** | **PASS** | **HOLD** | **KEEP — split BLOCKED by S-6, and not in this unit's set** | 1 export (`KeyframesAnimation`). Five of Zone E's rings pass through it; **S-6's named condition** (*"the ring kill lands after the PRM/delay rulings, or the rulings land on a moving file"*) is satisfied in the other direction — the rulings landed, so the ring kill may be considered, but the file is **not in this unit's writable set**. **497/500 → RD-e-3.** |
| 4 | `physics/spring/progress.ts` | 484 | **PASS** | **PASS** | **PASS** | **KEEP** | 1 top-level export over a single coherent subject (spring progress). **It is a LIGHT barrel module** (allowlist entry `physics/spring/progress`), so any split multiplies rule 3's subject set and the boundary surface. In the set, and deliberately unsplit: there is no second concern in it to extract. |
| 5 | `orchestration/drag/draggable.ts` | 470 | **PASS** | **PASS** | **PASS** | **KEEP** | 5 exports, one subject. **Also a LIGHT barrel module** (`orchestration/drag/draggable`), same boundary argument. The zone already carries its own carve (`drag/2d.ts`, `drag/index.ts`) from R.W1 — the split that was worth doing here was done. |
| 6 | `compile/frame/compiler.ts` | 461 | **PASS** | **PASS** | **PASS** | **KEEP** | 1 export. Its docblock's own provenance — *"split out of a ~1019-line Animation god-object"* — is **true at the bytes** and the zone shows the carve (`compiled-frame`, `interp-slot`, `numeric-plan`, `index`). A second split of an already-carved module, 39 lines under a ceiling nothing else violates, buys nothing. |
| 7 | `compile/emit/entry.ts` | 459 | **PASS** | **PASS** | **PASS** | **KEEP** | 6 exports, one emission subject; the zone is already carved into `backward/`, `format/`, `css-text`, `densify`, `easing-serialize`, `refusal-probes`. |
| 8 | `presets/classic-data.ts` | 458 | **PASS** | **PASS** | **PASS** | **KEEP — data-god, explicitly not split for line count** | 34 top-level exports, and they are **data tables**, not behaviour. The spec grades it *"a data-god at lower risk … NOT split for line count alone"*; measured, that grading is right — the file is a catalogue and a split would be alphabetical, not structural. It is also **G-SHIM's floor surface**: the barrel must stay three files. |
| 9 | `orchestration/split-text/split-text.ts` | 442 | **PASS** | **PASS** | **HOLD** | **KEEP — split FORBIDDEN by S-7** | **NEW ENTRANT, this wave's own `.c`.** S-7: *"RENAMES LAST, and `orchestration/split-text/split-text.ts` **last of all**"* — it collides with B-1/B-2/B-3's cures (landed `2549c133` this wave) and with `usability.mjs`'s `.wave-char`/`kf-split` selector coupling ⟨KF-AT-24 → KF.W4⟩. A structural move here, days after three behaviour cures landed in it, is the shape S-6/S-7 exist to forbid. |
| 10 | `compile/emit/view-transition.ts` | 438 | — | — | — | **NOT THIS UNIT'S — X.KF.W2's live surface** | **NEW ENTRANT, minted by X.KF.W2 (`0cfd3b5f`) inside this wave's window.** Not in this unit's writable set; under active sibling edit. Dispositioned as an observation and **relayed, RD-e-4**, never silently absorbed into this wave's roster as if it were ours. |

**Split-or-keep tally**: **KEEP 7** (rows 2-9 minus the two not-ours) · **READ+DISPOSITION ONLY 1**
(row 1, KF.W2's boundary) · **NOT-OURS 2** (rows 3 and 10 — outside the writable set, relayed) ·
**SPLIT 0**. Seven of the ten keeps rest on a measurement, not on caution: the tree's own standing
ceiling is 500 and **R4 reports zero violations**, so no module in this roster is over any line the
repo actually draws.

### 4c · 12 stutters × rename-or-keep, D/L/C scored — **the predicate re-derived, the grammar read**

```
⟨git ls-tree -r HEAD --name-only -- src | grep '\.ts$' | awk -F/ '{base=$NF; sub(/\.ts$/,"",base); parent=$(NF-1); n=split(base,bt,"-"); hit=(base==parent); for(i=1;i<=n;i++) if(bt[i]==parent) hit=1; if(hit) print}'⟩  → 12
```

The **set is unchanged from the spec's and the wave record's re-derivations** — the same twelve paths,
re-measured at `e325018f`, printed with the predicate that produced them. The **2 structural instances**
(`src/` single-child → `engine/animation.ts`) are **DECLINED-WHOLE at KF.W8 R-4** and are **not in this
denominator**: this gate's denominator is the **12**, entire and this wave's (KF-W5 §Carry D-6; the
*"16"* in R-14's verbatim addendum was measured at `8281638c` and the ruling subordinated the **set**,
not the integer). **A stutter-set-of-18 predicate would fail this gate** — it is not used.

The twelve fall into **two classes the spec's predicate merges and the repo's own grammar separates**
(§0):

**Class A · EPONYMOUS (8)** — basename **equals** its parent dir. `proof:structure` R1 names this
*"the allowed grammar, NOT a stutter"*, cites `group/group.ts` as its example, and R2's fragment arm
`continue`s on it by code.

| # | path | importers (resolved) | sites that actually stutter | D | L | C | disposition |
|---|---|---|---|---|---|---|---|
| 1 | `compile/emit/backward/backward.ts` | `backward/index.ts` (×2) | **0** | PASS | PASS | PASS | **KEEP** — eponymous primary; stripping the parent token leaves no name. No import site reads `backward/backward`. |
| 2 | `compile/emit/format/format.ts` | `format/index.ts`, `compile/emit/view-transition.ts` (×2) | **2** (`./format/format`) | PASS | PASS | **NOTE** | **KEEP the file**; the two stuttering *sites* are a sibling's (`compile/emit/view-transition.ts` = X.KF.W2's live surface, outside this set) and read the barrel instead — **relayed, RD-e-4**. |
| 4 | `group/group.ts` | `group/index.ts`, `composite/compositor.ts`, `layer-api.ts`, `lifecycle.ts`, `waapi.ts` | **0** (`./group`, `../group`) | PASS | PASS | PASS | **KEEP** — R1's own named example of the allowed grammar; every one of its 5 importers already reads `./group`, not `./group/group`. |
| 5 | `orchestration/sequence/sequence.ts` | `sequence/index.ts` (×2), `sequence/lifecycle.ts` | **0** | PASS | PASS | PASS | **KEEP** — eponymous; also a **LIGHT allowlist entry** (`orchestration/sequence/sequence`), so a rename is simultaneously a config edit and a boundary-surface change. |
| 6 | `orchestration/split-text/split-text.ts` | `split-text/index.ts` (×2) | **0** | PASS | PASS | PASS | **KEEP** — eponymous, **and S-7 puts it last of all** regardless; `.c`'s three cures landed here this wave. |
| 7 | `orchestration/timeline/timeline.ts` | `timeline/index.ts` (×2) | **0** | PASS | PASS | PASS | **KEEP** — eponymous. |
| 8 | `orchestration/view-transition/view-transition.ts` | `view-transition/index.ts` (×2) | **0** | PASS | PASS | PASS | **KEEP — and here the rename is PROVABLY a regression.** The directory holds exactly one barrel and one module; rename the module and `baseNoExt(only) === dirName` stops holding, so **R2's fragment arm fires** and `npm run check` reds. Measured against the gate's code, not argued. |
| 9 | `physics/spring/solver/solver.ts` | `physics/spring/progress.ts`, `solver/vector.ts`, `solver/index.ts` | **1** (`./solver/solver`) | PASS | PASS | **NOTE** | **KEEP the file**; the single stuttering site is `physics/spring/progress.ts:47` (`from "./solver/solver"`, in this unit's set) and could read `./solver` — but `progress.ts` is a **LIGHT barrel module** and the barrel pulls `sample`/`vector`/`duration`/`reseat` onto the light path, so the one-line "fix" is a **boundary-surface change dressed as hygiene**. Left alone deliberately; recorded. |

**Class B · SUFFIX (4)** — the parent token is a redundant **suffix** on a multi-token basename. This
is the `1412ed8e` idiom exactly (`easing/easing-option → option`, `engine/css/css-animation →
animation`, `waapi/waapi-options → options`), and it is the class **R1's prefix-only predicate misses**.

| # | path | → target | importers, ALL of them | in this unit's set | D | L | C | disposition |
|---|---|---|---|---|---|---|---|---|
| 3 | `compile/frame/compiled-frame.ts` | `compile/frame/compiled.ts` | `frame/compiler.ts:25` ✓ · `frame/index.ts:13` ✗ · `frame/numeric-plan.ts:1` ✗ | 1 of 3 | PASS | PASS | **RED** | **RENAME — execution ESCALATED (§5)** |
| 10 | `resolve/element-resolve.ts` | `resolve/element.ts` | `engine/animation.ts:42` ✗ | 0 of 1 | PASS | PASS | **RED** | **RENAME — execution ESCALATED (§5)** |
| 11 | `svg/draw-svg.ts` | `svg/draw.ts` | `src/animation/index.ts:181` ✗ · `svg/index.ts:11,:12` ✗ · `test/svg/draw-svg.test.ts:2` ✗ | 0 of 4 | PASS | PASS | **RED** | **RENAME — execution ESCALATED (§5)** |
| 12 | `svg/morph-svg.ts` | `svg/morph.ts` | `src/animation/index.ts:189` ✗ · `svg/index.ts:13,:14` ✗ · `test/svg/morph-svg.test.ts:2` ✗ | 0 of 4 | PASS | PASS | **RED** | **RENAME — execution ESCALATED (§5)** |

**Rename-or-keep tally**: **KEEP 8 (Class A) · RENAME 4 (Class B), execution escalated.** The keeps are
not a dodge and not a blanket — each rests on the repo's own standing gate, and one of them (row 8) is
a *demonstrable* new RED if renamed. The renames are the honest half: four files whose basename carries
a redundant suffix that the repo's live rule cannot see.

**G-STRUCT — GREEN on its stated GREEN condition**: the artefact enumerates **10 god modules ×
split-or-keep** and **12 stutters × rename-or-keep**, both sets re-derived at the ref of record with
their probes printed beside them, each row with its D/L/C score and reason; and the
`git log --format=%H -1 -- <old> <new>` clause is **vacuously satisfied — zero renames landed**, which
§5 states plainly rather than hiding behind the vacuity.

---

## §5 — ESCALATION · the rename programme cannot be executed inside this unit's writable set

**The measurement, first.** §Bounds Arm D grants the twelve stutter paths `rename + migrate imports
**in one commit each**`, and the lock is `git log --format=%H -1 -- <old> <new>` identical. A rename's
import migration rewrites the **importers**, and the importers are **not** in the writable set. Across
the four Class-B renames the migration surface is **12 import sites; 11 lie outside the set, 1 inside**:

| rename | sites | outside the set |
|---|---|---|
| `compiled-frame.ts → compiled.ts` | 3 | `compile/frame/index.ts`, `compile/frame/numeric-plan.ts` |
| `element-resolve.ts → element.ts` | 1 | `engine/animation.ts` |
| `draw-svg.ts → draw.ts` | 4 | `src/animation/index.ts`, `svg/index.ts` (×2), `test/svg/draw-svg.test.ts` |
| `morph-svg.ts → morph.ts` | 4 | `src/animation/index.ts`, `svg/index.ts` (×2), `test/svg/morph-svg.test.ts` |

**Not one of the twelve is completable in one lawful commit.** The Class-A eight are the same story
with the same arithmetic — every one of them is imported by its own `index.ts` barrel, and no barrel is
in the set.

**What this unit did NOT do, and why each alternative is a defect rather than a workaround:** it did
not write the barrels (a write outside the set is an ESCALATION by standing law, not a judgement call);
it did not split a rename from its migration (S-4 forbids it in terms, and a half-landed rename is a
broken build); it did not add a re-export shim at the old path (a hollow shim, which `proof:structure`
R2 reds by name and which the standing law calls a masking fallback); and it did not quietly
re-disposition the four to KEEP to make the gate look clean (that would be the closure-claim defect
this program has convicted three times).

**ESC-e-1 — the arm-D bounds gap.** To execute the four Class-B renames, the writable set must add the
**eleven importer paths above** (`compile/frame/{index,numeric-plan}.ts`, `engine/animation.ts`,
`src/animation/index.ts`, `src/animation/svg/index.ts`, `test/svg/{draw-svg,morph-svg}.test.ts` — the
last two also renamed alongside their subjects). Two of them are live sibling surfaces
(`engine/animation.ts` = `.c`/`.d`'s cure file; `src/animation/index.ts` = the root barrel), so the
grant needs a sequencing decision, not just a path list. **Returned, not taken.**

---

## §6 — WRITE-THEN-MEASURE · the double-run block

Every count published in this sheet was read from the settled bytes and re-run; both runs agree.

```
B0                                   154 / 154          (git ls-tree … | grep -c '\.ts$', HEAD=e325018f)
god modules ≥437 L                    10 / 10           (per-module `git show HEAD:<p> | wc -l`)
stutters (parent-token predicate)     12 / 12
rings, viaOnly LIFTED                 45 / 45           (overlay cruise; run1 ≡ run2 byte-identical, cmp -s)
rings with ≥1 type-only edge          45 / 45           (edge walk against depcruise's own dependencyTypes)
runtime cycles, rule as shipped        0 /  0           (✔ 160 modules, 705 dependencies — both runs)
depcruise `src demo`                   4 /  4  RED      (pre-existing; reproduces on the COMMITTED config)
allowlist entries / DEAD              24 / 24  ·  0 / 0
proof:structure R1 / R2 / R4           0 /  0  ·  0 / 0  ·  0 / 0   (PASS, scope=src, R1–R6 clean)
presets tree                           3 /  3           ·  'split by kind' 0 / 0
vitest library                       112 files, 1252 passed (settled; the earlier 2-fail reading is attributed at §3)
npm run build                         exit 0 / exit 0
```

---

## §7 — relays and residues declared from this unit

- **RD-e-1 · the one-edge ring kill, relayed.** Removing the single type-only edge
  **`constants/types.ts ⇢ compile/value/index.ts`** retires **13 of the inventory's 45 rings** (Zone V,
  every member but 33). `constants/types.ts` is outside this unit's set, and KF-W5 §Sequencing already
  reserves that file's `:195` `\| string` line to **KF.W4's one-commit KF-CB-18+24+29 bundle**. Routed
  to **KF.W8** (structure & colocation) with the measurement attached; **never re-booked here**.
- **RD-e-2 · `npm run lint` is RED at HEAD over `demo`.** 4 genuine runtime cycles in
  `demo/scenes/cube/orbital-drag/` (`index.ts ↔ OrbitalDrag.vue` and its three composables). Entered
  the gate's scope when `fb509edd` widened `lint` to `src demo`. **Not this wave's bounds** (no arm
  writes `.vue`); reproduced against the committed config to prove the attribution. Routed to
  **KF.W6** (demo/glass suffusion) with **KF.W8** as the structural terminus.
- **RD-e-3 · the 500-line ceiling is two lines away from firing.** `proof:structure` R4's ceiling is
  **500** with an **empty allowlist**, and the tree now carries `ingest/cssom.ts` **499**,
  `group/group.ts` **498**, `engine/animation.ts` **497** — three modules inside three lines of
  redding `npm run check`, all three moved there by cures landed **this wave** (X.KF.W2 and
  `X.KF.W5.c`). Declared so that the next seat to add a line to any of them knows it is the seat that
  reds CI. Routed to **KF.W8**; `ingest/cssom.ts` specifically to **KF.W2's façade decision**, whose
  boundary this unit declared and did not take.
- **RD-e-4 · two sibling-owned rows observed, not absorbed.** `compile/emit/view-transition.ts` (438 L,
  new god-module entrant, X.KF.W2's `0cfd3b5f`) and its two `./format/format` stuttering import sites.
  Outside this unit's writable set and under active sibling edit. Relayed to **X.KF.W2**.
- **Courtesy reading for `.b` / G-BASIS**: the fifth rival is derived. *"159 modules"* is
  **`depcruise src`'s module count**, not `proof:structure`'s — measured here as **160 = 154 src
  modules + 6 `@mkbabb/value.js` subpath externals**, which at `.b`'s ref (B0 153) is exactly **159**.
  `proof:structure` is a six-rule structural gate and emits no module count at all. Recorded, not
  claimed: G-BASIS is `.b`'s gate.
- **ESC-e-1 · the arm-D bounds gap** (§5) — the rename programme's eleven importer paths. Returned.

---

## §8 — sequencing compliance

- **S-6** — *"G-RING lands after B-6/B-8"*: `.c` landed the PRM inversion (`d002ce7e`) and the `delay`
  ruling (`1c481b09`) before this unit opened; G-RING was measured after. *"G-STRUCT's splits land
  after every ruling in arm B"*: `.c` closed before this unit opened, and **zero splits landed** — the
  three roster rows that carry live arm-B rulings (`group/group.ts`, `engine/animation.ts`,
  `split-text/split-text.ts`) are dispositioned KEEP **on that ground, named per row**.
- **S-7** — *"RENAMES LAST, and `split-text/split-text.ts` last of all"*: no rename landed; the order
  is not violated and `split-text/split-text.ts` is dispositioned KEEP on two independent grounds
  (eponymous grammar; S-7's own collision clause). *"The set is re-measured at open, never inherited"*:
  re-measured at `e325018f`, printed with its predicate — **12**, the same members.
- **→ KF.W8 boundary (`:444`)** — (a) the stutter **SET** is this wave's owning denominator (**12** at
  this ref, never the frozen 16); the **2 structural instances** stay **DECLINED-WHOLE at KF.W8 R-4**
  and are not in this gate's denominator. (c) `ingest/cssom.ts`'s split disposition **defers to KF.W2's
  façade decision** — declared here, not taken. What crosses the edge additionally is **RD-e-1** and
  **RD-e-3**, both with their measurements attached.
