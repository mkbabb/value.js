# KF-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Spec under trial**: `docs/tranches/X/keyframes/waves/KF-W3.md` (57 164 B, 232 lines)
**Corpus authority**: the 58 `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
**Method**: ID-KEYED CENSUS (the X·P terminal method) — enumerate every adjudicated row id whose
terminal disposition routes to the parser-consumption wave, in any markup (tables, prose routings,
dotted `KF.W2/W3` forms, `parser lane` / `parser waves` prose), then test the spec for carriage.
**Seat instruments (all read-only)**: `grep`/`sed` over the 58 records; `git show origin/master:<path>`
and `git grep origin/master` in `/Users/mkbabb/Programming/keyframes.js` (ref `81a56990`); `sed` over
`value.js:src/css/grammar.ts`; `ls`/`grep` over `docs/tranches/X/**` and `docs/tranches/V/coordination/INBOX.md`.
**No product source was opened for writing. This file is the only write.**

**VERDICT: DEFECTIVE.**

---

## §1 CENSUS TOTALS

| bucket | count |
|---|---|
| **routedTotal** (distinct registry row-ids routing to this wave, all markups) | **24** |
| **BOOKED** (carried as a row, a named fold-identity, or a quoted rider) | **9** |
| **EXCLUDED WITH REASON** (the `KF.W3-SHIM` taxonomy family, §Excluded E-1 → KF.W6) | **5** |
| **ESCAPED** (no row, no fold-identity, no exclusion line) | **10** |

Carriage rate on the canonical routed set (24 − 5 excluded = 19): **9 / 19 = 47.4 %**.

---

## §2 BOOKED — id for id (9)

| # | record : line | row id | routing bytes (verbatim) | spec site |
|---|---|---|---|---|
| B-01 | `kf-AmigaScene.md:150` | **S+2 / superlative 6** | *"the R1 row itself stays owned by KF.W3."* | §Carry **C-1** provenance ⟨…⟩ + quoted verbatim in the C-1 witness cell; also C-2 provenance |
| B-02 | `kf-CSSCodeEditor.md:46, :134, :147` | **KF-CE-12 · C-7** | *"the R1 ingress note → **KF.W2/KF.W3**"*; :134 *"folds to the R1 identity in the parser lanes (KF.W2/KF.W3); no new row"* | §Carry **C-1** rider **(a)**, quoted (*"the demo's largest untrusted-CSS ingress … the fuzz entry of record"*); §B.3 row 6; G-KF3-7 falsifier |
| B-03 | `kf-KeyframeTimeline.md:48, :112, :18` | **C-7** | *"the fuzz-entry note rides **KF.W2/KF.W3**; the silent `console.error` posture books HERE → KF.W7"* | §Carry **C-1** rider **(b)**, with the KF.W7 posture split preserved; §B.3 row 8; §Excluded E-5 |
| B-04 | `kf-KeyframeCardList.md:122` | **Axis C · S-C** (R1 note) | *"folds to the megatranche **R1** identity in the parser lanes (KF.W2/KF.W3) … no new row"* | §Carry **C-1** rider **(d)**; named again in C-2 provenance |
| B-05 | `kf-KeyframesStringControls.md:63, :161, :174` | **C-2** | *"absence-of-posture → NO-WAVE-OWNER; reachability → **KF.W3** (parser consumption / R1 surface)"* | §Carry **C-1** rider **(c)**, quoted; §B.3 row 7; G-KF3-4 falsifier; §Excluded E-5 + E-14 (the BLOCKER→MAJOR demotion dissent carried) |
| B-06 | `kf-CopyButton.md:81` | **KF-CB-33 · C-14** | *"→ recorded as a **KF.W3** (Parser Consumption) scoping input."* | §Carry **C-2** — the row carried whole, verbatim, with EE-01/DP2-02 and the two-channel edict |
| B-07 | `kf-StartingStyleTarget.md:80, :139` | **KF-SST-36 · C-13** | *"recorded as a KF.W3 scoping input, per the banked row"*; :139 *"— **KF.W3**: KF-SST-36's scoping input (per KF-CB-33)."* | §Carry **C-2** provenance, with the *"Not re-booked"* fold-by-reference law preserved |
| B-08 | `kf-KeyframeCard.md:101` | **KF-KC-53 · C-7** | *"Same posture as banked KF-CB-33 → recorded as a **KF.W3** scoping input."* | §Carry **C-2** provenance, quoted (*"Same posture as banked KF-CB-33"*) |
| B-09 | `kf-EasingTarget.md:77` | **KF-ET-32** (KF.W3 leg) | *"(link, not call — N1 keeps this component **clean** on the R1 map, a **KF.W3** scoping input)"* | §Carry **C-3** as METHOD-BINDING; becomes G-KF3-7's call-graph predicate; the record's other legs routed away (SS-6 BH letter, KF.W5 letter) |

**Carriage quality on the booked nine**: good. Each is carried as a fold-identity with its cure-shape
lock and its away-routings intact; none is re-booked; none is re-graded. B-05's dissent (axis-C
BLOCKER demoted to MAJOR on RR-L's motion) is preserved at §Excluded E-14. This half of M-25 holds.

---

## §3 EXCLUDED WITH REASON — the `KF.W3-SHIM` taxonomy family (5)

`lane-frontend.md §10`'s seven-wave sketch spells a wave `KF.W3-SHIM` (F-5, the shim/barrel deletes).
Under the canonical `CENSUS-2026-08-03.md:177-206` KF.W0–W10 taxonomy this wave is Parser Consumption.
The spec **rejects the collision by an act**, not a mention (§Carry **C-6** → §Excluded **E-1** → KF.W6),
and carries all five riders intact. **This disposal is correct and is the spec's strongest single move.**

| # | record : line | row id | disposal |
|---|---|---|---|
| X-01 | `kf-ChannelControls.md:79` | **L-15 / C-10** | E-1 (c) — the 4-line `transport/composables/useKfPillTabs.ts` shim, sole consumer `ChannelControls.vue:230`, the duplicate-name hazard, *"under §0 the whole triple deletes together"* → KF.W6 |
| X-02 | `kf-AnimationControlsGroup.md:74` (+ :39 cross-ref) | **L-5** | E-1 (a) — carried **with its evidence correction**: census F-5's *"zero consumers"* is wrong; the test's `:21` import traverses the shim; *"the deletion wave must repoint the test import — and per L-1, that test must move to the component seam in the same stroke"* → KF.W6 |
| X-03 | `kf-KfPillTabs.md:58` | **N-KPT-2** | E-1 (d) — the whole instrument barrel chain dead, *"one deletion family with the F-5 shim"* → KF.W6 |
| X-04 | `kf-KfPillTabs.md:70` | **L:D-8 / C:C-6** | E-1 (b) — carried with the repoint lock: *"its deletion must repoint `ChannelControls.vue:230` at `../KfPillTabs/useKfPillTabs`, **NOT** at the `.vue`"* → KF.W6 |
| X-05 | `kf-DemoGlobalChrome.md:70` | **M-L3** | E-1 (e) — the `transport/`/`instrument/` barrels + three `defineAsyncComponent` wrappers, zero consumers → KF.W6 · **see D-09: M-L3's terminal disposition is NO-WAVE-OWNER, not KF.W3-SHIM** |

**Squaring check (posture axis 5)**: `carry/KF-W6-CARRY.md` (199 055 B) receives them —
`F-5` ×10, `KF.W3-SHIM` ×2, `rainbow` ×8, `N-KPT-2` ×1, `M-L3` ×2, `L-15` ×2. **The KF.W6 routing
lands. No orphaning.**

---

## §4 ESCAPED — named by bytes (10)

### E-01 · `kf-App.md:111` — **KF-APP-56** · C-i2 / N-1 — *hard escape, dotted form*
> `| KF-APP-56 | C-i2 / N-1 | value.js R1 parser-crash class NOT reachable from App's boot graph (`css_syntax` ×0 in the entry; colour module is the exposure = KF-APP-15) | **fold by reference → megatranche R1 / census risk-3** (KF.W2/W3 own the class; App books nothing) |`

`grep -cF 'KF-APP-56' KF-W3.md` → **0**. `grep -cF 'risk-3' KF-W3.md` → **0**. The spec cites kf-App
twice (ruling 1, KF-APP-4) and never this row. This is a **UNREACHABLE-with-the-mechanism-named**
datum — precisely the shape **G-KF3-7** requires of every site in the call-map, and the entry-graph
negative is the map's root node.

### E-02 · `kf-EditorShell.md:77` — **C-19** — *hard escape, and adversarial to the spec's own E-12*
> `- **C-19 — MINOR · FOLD (parser class) → kf-App KF-APP-56 ≡ megatranche R1 / census risk-3 (KF.W2/W3 own the class).** Component rider booked: EditorShell.vue:239-248 establishes `color-mix(in srgb, …)` as the demo's token idiom — the exact form value.js 4.0.0 rejects — while a sibling scene pipes computed token text through `parseCssColor` and throws on `!ok` (RR-2 reproduced R1 live against the installed 4.0.0). The square-scene seam is spec input for whichever component adjudication owns `useSquareTumble`.`

`grep -cF 'EditorShell' KF-W3.md` → **0**. `grep -cF 'color-mix' KF-W3.md` → **0**. The row is a booked
component rider naming (i) the demo's token idiom as the exact form 4.0.0 rejects, (ii) a live
reproduction of R1 against installed 4.0.0, and (iii) `useSquareTumble` **by name** as the seam.
It is the single most load-bearing uncarried row in the corpus for this wave. See **D-01**.

### E-03 · `kf-CubeAxisLines.md:108` — **C·§4's R1 negative** — *hard escape, dotted form*
> `**C·§4's R1 negative → megatranche R1** (KF.W2/W3)`

`grep -cF 'CubeAxisLines' KF-W3.md` → **0**. A scoped negative, *"folded"* (`:97`), sustained — another
UNREACHABLE-with-mechanism row the call-map must contain.

### E-04 · `kf-KeyframesEditor.md:99` — **KF-KE-54 · C-m2** — *hard escape, dotted form*
> `- **KF-KE-54 · C-m2** — `kf-engine.ts`'s "the one place value.js enters the graph" is false as written (three static edges in this closure alone); the cited gate scopes `src/` only … → **KFED-UNIT** prose cure; the ingress note folds by reference to the megatranche R1 identity (per the KF-CE-12 precedent) → **KF.W2/W3** scoping input.`

`grep -cF 'KF-KE-54' KF-W3.md` → **0**. **Partial mitigation**: the spec's §B.3 row 3 does carry the
*site* (`KeyframesEditor.vue:123` import / `:186` call, with the KF-ET-32 link≠call correction against
the census). But M-25 requires the **row** — and this row's payload is a *false written invariant about
value.js's edge count into the graph*, which is exactly what G-KF3-7's call-map must overturn. The site
is carried; the row, its prose cure and its KFED-UNIT sequencing are not.

### E-05 · `kf-TimelineTrack.md:18, :130` — **axis-C SUP-3** — *hard escape, dotted form + prose*
> `:18  … with discrete rows to KF.W6 (Glass Suffusion), KF.W8 (Structure, by fold), KF.W4 (type-gate, by fold), **KF.W2/W3 (parser ingress, by fold)**, KF.W9/SS-13 …`
> `:130 - **value.js consumption is minimal, granular, and R1-contained** (axis-C SUP-3): `clamp` from the `/math` SUBPATH …; the only path from a TimelineTrack emit into the value.js parser is wrapped with the `await` inside the `try` (`useTimelineBuild.ts:40-50` — my read). … recorded as a negative result **so parser waves skip this file**.`

`grep -cF 'TimelineTrack' KF-W3.md` → **0**; `grep -cF 'useTimelineBuild' KF-W3.md` → **0**.
This is the corpus's **only positive containment posture** (an ingress wrapped `await`-inside-`try`) —
the reference shape G-KF3-7's REACHABLE/UNREACHABLE classification needs, and the one file the bank
explicitly instructs parser waves to skip.

### E-06 · `kf-ChannelOptions.md:126, :155` — **C·S-4** — *hard escape; falsifies §Excluded E-8's stated reason*
> `:126 - **`timingFunctionState`'s type guard shields a live value.js Result-contract hole** (C·S-4): `parseTimingFunction(null|42|{})` throws a raw TypeError out of a Result-returning parser — **the banked R1 class**; every string returns `ok:false` cleanly. Evidence FOLDED by reference to the **value.js parser lane** (lane-library §4.6 / parser-proof R1) — one identity, no re-booking here.`
> `:155 - **value.js parser lane**: the `parseTimingFunction` non-string raw-TypeError (R1 class) — evidence forwarded, identity already banked.`

The spec's **§Excluded E-8** states: *"no ChannelOptions, ChromeDock or TransportDock row lands in this
wave's CARRY."* That reason is **false**: C·S-4 is a parser-lane-forwarded row, it is the **R1 class**
by the bank's own words, and it lives in **channel (ii)** (`parseTimingFunction`) — the exact class
**C-2 / KF-CB-33** predicts a §4.6-scoped wave will miss. An exclusion resting on a false premise is
not a lawful disposal. See **D-04**.

### E-07 · `kf-DemoGlobalChrome.md:77` — **C-10** — *prose-form escape*
> `- **C-10 — INFO · zero value.js/engine edges; R1 reachability CLEAN** (imports are `vue` + `vue-sonner` only; the parent's `@mkbabb/value.js/math` edge is at `AnimationControlsGroup.vue:125` — the live line, settling the readers' :131/:125 drift — and `/math` is not the parse surface). Identity guard: respects value.js's banked R1 row; **recorded so parser waves skip this file**.`

Another explicit *"parser waves skip this file"* instruction, with the `/math`-is-not-the-parse-surface
mechanism named. Uncarried.

### E-08 · `kf-ChannelControls.md:126` — **C-axis L-1 identity guard** — *prose-form escape*
> `- **C's L-1** (C axis; grep re-run by this seat: `parseCssColor` = 1 file, `scenes/square/useSquareTumble.ts`, outside this closure) · **the value.js R1 blast radius through this subtree is ZERO**, and the one grammar edge reached (`parseTimingFunction`) is consumed on the result contract with diagnostics surfaced — the best posture available. **Identity guard: corroborates …**`

An **independent second-seat re-run of the `parseCssColor` grep** — direct corroboration of the spec's
own §B.3 / G-KF3-7 (c) measurement, plus a second *"best posture available"* reference shape in
channel (ii). The spec presents its six-hit grep as this seat's novel finding; the bank already held
the corroborating measurement.

### E-09 · `kf-CubeTarget.md:76` — **challenge-C S-1** (superlative #11) — *prose-form escape*
> `11. **The R1-parser-unreachability negative proof (challenge-C S-1), sustained through two hostile re-reads.** A negative established on three structural legs (colour rides `var(--face-N)` and never becomes a parsed string; the only parse leaves are `"0deg"` and computed-number templates; the sole value.js edge is the certified grammar-free `/math` leaf) with its one near-miss …`

A three-leg structural negative proof, twice-hostile-re-read — the highest-evidence UNREACHABLE row in
the corpus. Uncarried.

### E-10 · `kf-SquareScene.md:132` — **C · S-C** — *prose-form escape, with an explicit upward-citation instruction*
> `3. **`parseCssScalar` at the two-writer boundary** (C S-C) — the demo's best use of value.js and the counter-example to the library's own internal regex re-parsing; **worth citing upward when the parser wave lands**. (Its unit-blindness is L-10; the shape is still right.)`

The bank instructs the parser wave, by name, to cite this row upward. The spec carries kf-SquareScene's
D-27/L-7/C-9 (as C-5) and D-23 (as E-13) but not S-C.

---

## §5 DEFECT REGISTER

### D-01 · **BLOCKER** — §Excluded **E-12** and §B.3 row 1 declare `useSquareTumble.ts:22` unreachable; the spec's own carried **C-5** and the frontier bytes say otherwise. C-4 and C-5 contradict each other inside one §Carry table and are never reconciled.

**Spec, §Excluded E-12** (`:229`):
> *"**E-12 · A reachability claim at `useSquareTumble.ts:22`.** **Reason**: **K-6, DEAD BY EXECUTION** — *"Safe regardless of cascade order. Reader-B overruled."* Asserting that RED violates **L-19**."*

**Spec, §B.3 row 1** (`:92`): *"**K-6 kill applies** — not a reachable crash surface (§Carry C-4)."*

**What K-6 actually killed** (`kf-SquareInstrument.md:24`, verbatim): the narrow claim that a *token* can
produce the **empty-args** degenerate — *"`parseCssColor("oklch(0.684 0.250 327.9)")` → `{ok:true,…}` …
R1's true input is empty-args `oklch()` … which **no token can produce**."* K-6 kills **R1-through-a-token**.
It does **not** kill *a throw at `:22`*.

**The frontier bytes** (`git show origin/master:demo/scenes/square/useSquareTumble.ts`, ref `81a56990`):
```
21    const asColor = (css: string): CssColor => {
22        const parsed = parseCssColor(css);
23        if (!parsed.ok) throw new TypeError(`Invalid square palette color: ${css}`);
24        return parsed.value;
25    };
```
The `!ok` arm **throws** — a kf-authored throw that fires on every rejected-but-not-crashing input.
`:22`'s call site is a crash surface independent of R1.

**The spec's own carried C-5** (`kf-SquareScene.md:53`, CONFIRMED **MAJOR**) indicts exactly this:
*"Five `throw` sites execute inside the rAF frame (`num()` ×2, **`colorAt` ×3**) with no engine guard …
it **BRICKS the loop** for the mount's lifetime."* `colorAt` calls `asColor` — i.e. `useSquareTumble.ts:22-23` —
three times per frame (corroborated at `kf-SquareScene.md:89`, MISS-4: *"the per-frame parse is what moves
the C-9 throw from a survivable init site into the loop-bricking frame path"*).

**Consequence**: E-12 forbids the wave from asserting a RED that its own C-5 supplies and that
`kf-EditorShell C-19` (E-02 above) says RR-2 **reproduced live against installed 4.0.0**. The spec even
writes *"Read as a pair with C-4: … the genuinely reachable one is at sites the census does not list"* —
but one of D-27's sites **is** `useSquareTumble.ts:22`. Under L-19 the spec has inverted the test: it
bans the gate that can fail for its intended reason.

### D-02 · **BLOCKER** — 10 of 19 canonically-routed registry ids escape the census (47.4 % carriage).
Receipt: §4 above, id for id, with routing bytes. `grep -cF` in `KF-W3.md` → `KF-APP-56` 0 ·
`EditorShell` 0 · `CubeAxisLines` 0 · `KF-KE-54` 0 · `TimelineTrack` 0 · `useTimelineBuild` 0 ·
`color-mix` 0 · `risk-3` 0 · `SUP-3` 0. Six of the ten (E-01, E-03, E-05, E-07, E-08, E-09) are
**UNREACHABLE-with-the-mechanism-named** rows — the denominator of **G-KF3-7**'s call-map. A map
authored without them cannot be complete, and the gate cannot know what completeness is.

### D-03 · **MAJOR** — M-25 carry violation: **C-5 is quoted selectively**, dropping the reachability leg that would falsify E-12.
Spec §Carry C-5 (`:122`): *"Reachable verbatim: *"`calc()` is ordinary authored CSS; `parseCssScalar("calc(1px + 2px)")` → ERR → `num()` throws"*."*
Bank, `kf-SquareScene.md:53`, the **same sentence**, continued:
> *"Reachable via the same editor path L-2 opens (`calc()` is ordinary authored CSS; `parseCssScalar("calc(1px + 2px)")` → ERR → `num()` throws), **and via any `--rainbow-*` re-author in a syntax value.js 4.0.0 rejects** (the megatranche R1 identity — `parseCssColor("oklch()")` throws; noted as a fold to the V·π parser program, never re-booked here)."*

The spec quotes the first conjunct of a two-conjunct "Reachable via X, **and via** Y" sentence and drops Y —
then routes Y's substrate (the `--rainbow-*` two-producer collision) away at **§Excluded E-13** as
*"a token-namespace defect, **not a parse defect**"*. The bank books it as **both**. Cure-shape locks must
be carried, not trimmed to fit an exclusion.

### D-04 · **MAJOR** — §Excluded **E-8**'s stated reason is factually false.
E-8 (`:225`): *"**Reason**: no ChannelOptions, ChromeDock or TransportDock row lands in this wave's CARRY."*
Falsified by `kf-ChannelOptions.md:126` / `:155` (E-06 above) — a row the bank forwards to the
**value.js parser lane** and names **"the banked R1 class"**, in channel (ii). An exclusion whose reason
is untrue is not a lawful disposal under M-25.

### D-05 · **MAJOR** — **OP-3** and the `COHESION §1` cross-edge are stale against the named governing authority.
Spec **OP-3** (`:38`): *"**KF.W3 IS ASSIGNED TO NEITHER** (nor is KF.W10). Per COHESION §3.7 an unowned cell
is a **cohesion defect**."* Cross-edge (`:210`): *"**Two owner rulings are owed before this wave can execute
even after RC-P turns TRUE: the authoring seat, and the write hand.**"*

`docs/tranches/X/COHESION.md` **§0b ADDENDUM 2026-08-28** (the spec's own header cites COHESION as authority):
> *"**KF.W3 ownership gap (found by the SS-1/SS-2 taxonomy seat): CURED by assignment.** §1 assigned
> parser-consumption to neither SS-1 nor SS-2. Disposition: KF.W3 is a library wave (parse façade →
> consumption); it belongs to **SS-1**, and its spec was authored under that seat at `KF-W3.md`
> (banked `b6e09ed4`). The wave's GATED posture is unchanged — PLAW-BIND keys it to the X·P release
> condition; never scheduled by this assignment."*

The addendum names **this very file**. One of the two "owed rulings" is discharged; the spec still
declares it open. (Fairness note: the addendum is dated the same day and may post-date authoring —
but the file as it stands is now false against its cited authority, and OP-3 is a *hard* precondition.)

### D-06 · **MAJOR** — **G-KF3-1 is not born-RED**; its stated condition is satisfied by the act of authoring, and it names no discharge.
Gate title (`:132`): *"**G-KF3-1 — RC-P RECIPROCITY SENTENCE EXISTS AND THE PREDICATE IS FALSE.**"*
Both conjuncts are **TRUE at authoring**: the sentence exists at `:9`, and the predicate is FALSE
(re-measured by this seat: `ls docs/tranches/X/parse-that/RELEASE-CONDITION.md` → *No such file*;
`RELEASE-PACKET.md` → *No such file*; `grep '"version"' package.json` → `4.0.0`;
`grep -c 'RC-P' docs/tranches/V/coordination/INBOX.md` → **0** — all four confirmed).
A gate that is green the moment it is written is not a gate; and a gate whose green condition is
*"the predicate is FALSE"* can never be discharged by the wave that opens on the predicate being TRUE.
The gate also has no falsifier that the wave can cause to fire — it re-derives its own oracle (the
spec's own **C-7 clause (d)**).

### D-07 · **MAJOR** — **G-KF3-9** is undischargeable by this wave in its own words; **G-KF3-8** declares itself fail-open.
G-KF3-9 (`:175`): *"the cure is **KF.W4's** … **This wave may NOT author that gate.** It fails **honestly by
naming the missing enforcement** rather than by pretending its own demo-side gates bind."*
G-KF3-8 (`:170`): *"**this gate fails-open if KF.W4 has not landed** — which is exactly the sequencing it
exists to expose."*
Both are honest declarations, and both are **not close gates**: one cannot be turned green by this wave
at all; the other is stated to not block. §Gates' own preamble promises *"Nine conditions, all born-RED
with a named live witness."* Two of the nine are declarations wearing gate numbers — the count is
inflated by 2 (7 real gates, not 9).

### D-08 · **MINOR** — the §Provenance completeness claim rests on a source that does not exist, and its "0 dropped" is false.
Spec (`:17`): *"This spec is the fresh-Fable fold (M-23) of one draft against the 7-row CARRY: **7/7 rows
carried, 0 dropped**."* `ls docs/tranches/X/keyframes/carry/` → **`KF-W6-CARRY.md` only**. There is no
KF-W3 CARRY on disk; the denominator is unverifiable. Measured against the registry — the authority M-25
names — the true routed denominator is **19**, and **10 are dropped**.

### D-09 · **MINOR** — E-1 re-routes a terminal **NO-WAVE-OWNER** disposition as if it were a shim-family routing.
`kf-DemoGlobalChrome.md:70` M-L3 ends: *"**NO-WAVE-OWNER** (hygiene; **cross-ref** KF.W3-SHIM's
no-backwards-compat law)."* KF.W3-SHIM is a *cross-reference to a law*, not the row's terminal home.
E-1 (e) books it to KF.W6 regardless. Severity is the bank's; so is routing.

### D-10 · **MINOR** — E-1 cites `kf-ControlsPaneWrapper §6` as a shim-family row; line 6 is the record's header taxonomy sentence, not an adjudicated row.
`kf-ControlsPaneWrapper.md:6` is the *"Status verbs per M-25 … Wave targets follow the census lane
taxonomy … **KF.W3-SHIM** …"* header. No F-5/shim row is booked in that record. The sixth member of
C-6's *"Six adjudicated records name a wave literally spelled KF.W3-SHIM"* is a header, not a row —
so the family is **five rows across five records**, not six.

### D-11 · **MINOR** — §Bounds B.2 declares `create` access for the file it is.
`| `docs/tranches/X/keyframes/waves/KF-W3.md` *(in value.js: this spec)* | **create** | …` — the file
exists (57 164 B). A bounds row stale at its own authoring instant.

### D-12 · **MINOR** — G-KF3-8's exhibit is carried at half width.
The spec names only `bounceInEase`. The frontier line the spec pins (`test/orchestration/orchestration-api.test.ts:143-145`,
read by this seat at `origin/master`) asserts **two** phantoms under the same false comment:
```
143        // `easeOutCubic` / `bounceInEase` are real registry curves but map to NO
144        // CSS keyword — a silent twin here would mis-delegate to the compositor.
145        expect(cssTwinFor("easeOutCubic")).toBeUndefined();
146        expect(cssTwinFor("bounceInEase")).toBeUndefined();
```
`easeOutCubic` is uncarried; the comment-stated-invariant obligation (L-6) attaches to both.

### D-13 · **MINOR** — the KF-AV-28 supersession rider is not noted on the rows this spec routes to KF.W7.
`kf-AnimationVisualizer.md:35`: *"A standing sequencing rider on every NO-WAVE-OWNER row below:
**KF.W7's S-9 evaluation (KF-AV-28) may supersede any behavioral cure here**."* The spec routes
KeyframeTimeline C-7's `console.error` posture and L-6/C-4's hand-rolled parser to KF.W7
(§Excluded E-5, cross-edge `:206`) with no note that a KF.W7 *evaluate* verdict may discharge them.
`grep -cF 'KF-AV-28' KF-W3.md` → **0**.

---

## §6 WHAT HOLDS — recorded so no seat re-spends the budget

**Axis 3 (gates / L-19 contrivance presumption): the receipts are REAL.** Every load-bearing anchor this
seat sampled verified byte-exact at `origin/master` `81a56990` and in value.js:

| spec claim | this seat's measurement | result |
|---|---|---|
| `package.json:70` = `"@mkbabb/value.js": "4.0.0"`; `:77` = `"@mkbabb/glass-ui": "7.0.0"` | `git show origin/master:package.json \| sed -n '69,71p;76,78p'` | **EXACT** |
| `format-options.ts` PATH WRONG → true path `emit/format/options.ts` | `git cat-file -e origin/master:…/emit/format-options.ts` → *"exists on disk, but not in 'origin/master'"*; `…/emit/format/options.ts` → OK | **CORRECTION CONFIRMED** |
| `backward.ts` → `emit/backward/backward.ts` | `git cat-file -e` → OK | **CONFIRMED** |
| easing fence = `easing/registry.ts`, `DIRECT_NAMES :18-28` (`"smoothStep3"` `:26`, `"easeInBounce"` `:27`), `registryNames :30-34` with `:31 ...Object.keys(bezierPresets),`, `timingFunctionEntries :37-48` module-top-level, `throw` at `:43-46` | `git show origin/master:src/animation/compile/easing/registry.ts \| sed -n '26,48p'` | **EXACT, line for line** — boot-evaluation confirmed (top-level `const` initializer) |
| `css-text.ts:17 / :41 / :54` | `sed -n '17p;41p;54p'` | **EXACT**, including the `:54` throw string |
| value.js `src/css/grammar.ts:181` verbatim | `sed -n '179,183p'` | **EXACT** |
| `test/orchestration/orchestration-api.test.ts:142-148` | `sed -n '142,148p'` | **EXACT** |
| `demo/components/CopyButton.vue:42 timingFunction: "easeInBounce",` | `sed -n '42p'` | **EXACT** |
| fixtures = 14 `.css` + `manifest.json`, all 14 names | `git ls-tree --name-only origin/master test/fixtures/keyframes/` → 15 entries | **EXACT, all 14 names match** |
| *"exactly six hits: three imports and three calls"* | `git grep -n "parseCssColor\|parseCssScalar\|parseCssValues" origin/master -- demo/` | **EXACT — six hits, the three files as listed** |
| `animationDescriptions.ts:76` is `parseTimingFunction` (wrong organ) | `sed -n '76p'` → `const parsed = parseTimingFunction(value);` | **CORRECTION CONFIRMED** |
| `keyframeSelector.ts` `requireKeyframeSelector :14-21` converts `!ok` → `throw new TypeError` at `:18` | `sed -n '14,21p'` | **EXACT** |
| `scroll/grammar.ts:143 export function roundTripScrollCSS`; `emit/index.ts:53 export { cssIdent } from "./backward";` | `sed -n` at both | **EXACT** |
| probe on disk, 3476 B | `ls -l docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` | **EXACT** |

**L-19 contrivance presumption: REBUTTED for this spec.** No proof-script is authored; every gate names a
command against a pinned artifact or a physical coordinate; the EXECUTE-NO-WRITE (R-E) discipline on the
probe is correct. G-KF3-2's *"a green obtained by editing the probe or pointing it at `src/` fails"* is a
real falsifier. **§B.1's five anchor corrections are genuine and consequential** — two dead paths and a
wholly dead fence file (`easing-registry.ts` does not exist at the frontier) that would have sent cures
to files that do not exist. This is the spec's best work.

**Axis 4 (E-3 + STATUS): CLEAN.** `grep -n 'VERIFIED' KF-W3.md` → **one hit**, line 24, and it reads
`| VERIFIED | NO | stamped only at X·KF close (KF.W10); no wave stamps VERIFIED at its own close |`.
**Zero VERIFIED stamps.** `**Status**: **planned**` at `:5`. `IMPLEMENTED | NO`. Every keyframes.js
anchor is declared re-resolved read-only via `git show origin/master:<path>` — corroborated by the
byte-exactness above, which is reproducible from git alone. **The spec opens no product source.**

**Axis 5 (posture axes): 3 of 4 HOLD.**
- **KF.W4 is the DECLARED SEQUENCING HEAD** — **HELD**: OP-6 (hard), L-3 (*"KF.W4 BEFORE THE REPIN … Ordering, not advice"*), E-3, E-4 (*"authored there as the sub-tranche's declared sequencing head"*), cross-edge `:203` with three blocking legs.
- **KF.W3 GATED via PLAW-BIND, never scheduled** — **HELD**: title `(GATED, never scheduled)`; the opening condition stated verbatim and by predicate name at `:9`; L-1 (*"gate-keyed and NEVER scheduled … A row that unblocks on a document's status word is exactly the defect RC-P exists to kill"*); cross-edge `:199` (*"**PLAW-BIND is the only route** … There is **no direct parse-that → keyframes edge, and none may be created**"*). Corroborated by COHESION §0b: *"The wave's GATED posture is unchanged."*
- **KF.W6 squares with its 424-row CARRY** — **HELD** (§3 above): every E-1 rider and the E-13 rainbow row is present in `KF-W6-CARRY.md`.
- **KF.W7 carries the KF-AV-28 supersession rider** — **NOT HELD** at this end: see **D-13**.

**M-25 carriage on the booked nine: HOLDS** (§2 above) — fold-identities not re-booked, severities not
re-graded, dissents preserved (E-14 carries three), away-routings intact. The failure is **coverage**,
not transcription-quality — with the single exception of **D-03**, where a carried row is quoted at
half its reachability.

---

## §7 VERDICT

**verdictLocal = DEFECTIVE.**

Two BLOCKERs. The spec is well-instrumented, honestly measured and byte-accurate — and it is
**materially incomplete against the registry (9/19 carried)** while **excluding, by name, the one
reachability claim its own carried C-5 and the uncarried kf-EditorShell C-19 both establish**. The
census escapes are not incidental: six of the ten are the UNREACHABLE-with-mechanism rows that
constitute G-KF3-7's denominator, and one (kf-ChannelOptions C·S-4) is a channel-(ii) R1-class row —
the exact miss C-2/KF-CB-33 was banked to prevent, firing a **third** time.

Minimum repair set for PASS 2: carry E-01..E-10 as rows or exclusions-with-true-reasons; strike or
re-found E-12 on the `!ok`-arm bytes; restore C-5's second reachability conjunct; re-found E-8's reason;
re-anchor OP-3 on COHESION §0b; re-found G-KF3-1 with a discharge condition; re-class G-KF3-8/G-KF3-9
as declared floors rather than gates (7 gates, not 9).
