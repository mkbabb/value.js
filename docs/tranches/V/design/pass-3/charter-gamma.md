# V · pass-3 · CHARTER-γ — CLOSE THE D3 LOSSY-SUCCESS ACCOUNTING

**Lane**: pass-3 Charter-γ (AGGLOMERATION §3 · charter γ — "close the D3 lossy-success accounting").
**Mode: RAN** — every round-trip below is measured in an ISOLATED worktree at `tranche-u` HEAD
(`07bf61d`; fast-forwarded from the T-close base the launcher checked out — U-F29 `329932b` is now in
history, `git merge-base --is-ancestor 329932b HEAD` ✓). `npm ci` clean; the `prepare` hook built
`dist/value.js` exit 0. Measurements run against the BUILT dist (the shipped surface), the same
serialize-fidelity philosophy charter-c used. **Model**: opus (declared). **Nothing merged** — this is a
docs+evidence deliverable; the src tree is untouched.

**Reads over**: `charter-c.md` (the pass-2 D3 lane I harden), `critiques/critique-charter-c.md` (the fresh
critic — G1 U-F29 uncredited, G2 permissive-string un-measured, G3 inventory un-swept, G5 no-masking
headline, G6 verbatim-vs-structural), AGGLOMERATION §3 charter γ + §9 spine fact 9 + §5 (agglomerator-
verified U-F29-is-on-disk). This lane discharges charter γ's three obligations **plus** the convergence-gate
minor-corrections that touch the D3 docs (AGGLOMERATION §3 (b)).

**The one-line result**: charter-c's item-2 lossy leg was directionally right about a lossy class existing but
**mis-assigned WHICH class it is**. Measured on HEAD: the "permissive-string" class it flagged (`@@@`, `///`,
`1px @ bad`) is **NON-lossy** (friction #1 RETRACTED); the genuine open lossy class is the **partial-recovery
tail** (`)(`, `rgb(`, `calc(1 +`) — which is exactly the class item-1's `.eof()` extension already closes. And
the `.eof()`+`CSSParseError` idiom charter-c presented as its resolution is **twice-ratified in-tree** (U-F29
`parseCSSValue` + S.W1 F-9 `parseCSSStylesheet`); item-1 re-scopes to an EXTENSION of it, credited.

---

## §0 Headline — the three obligations RAN + the convergence-gate cleanup

| Obligation (AGGLOMERATION §3 γ) | verdict | the decisive measured / cited fact |
|---|---|---|
| **1 · cite + reconcile U-F29** (crit G1) | **CLOSED** | the `.eof()`+`CSSParseError` idiom is **twice-ratified in-tree** — `parseCSSValue` (U-F29 `329932b`, `parsing/index.ts:518/528/542`) + `parseCSSStylesheet` (S.W1 F-9, `stylesheet.ts:633`, same "silent partial parse hides grammar bugs" rationale `:626-632`). Charter-c's move re-scoped from "introduce grammar-fail-closed" → "**extend the ratified idiom to the permissive plural entry**"; the two senses of "permissive" (uniform-WRAP vs garbage-TAIL) are orthogonal, so the extension keeps U-F29's plural design (`:569-576`) intact. Credited; cost booked against U-F29, not the proto-era "OPEN." |
| **2 · MEASURE the permissive-string round-trip** (crit G2/G6) | **CLOSED — friction #1 RETRACTED** | `parseCSSValues("@@@")→"@@@"` (verbatim), `("1px @ bad")→"1px @ bad"` (verbatim, all 3 tokens), `("///")→"/ / /"` (all 3 `/` tokens kept, whitespace-normalized). **NON-lossy.** The genuine lossy class is the **partial-recovery tail**: `")("→""` (all dropped), `"rgb("→"rgb"`, `"calc(1 +"→"calc"` — silent truncation. `kind:"unknown"` re-scoped "verbatim"→"**captured STRUCTURALLY** (`body:null`)" for symmetry (G6). |
| **3 · sweep for other silent-drop sites** (crit G3) | **CLOSED — "single site" FALSIFIED (2 sites, same class)** | the keyframe parser has **TWO** spec-conformant silent drops, not one: `stylesheet.ts:233` (`!important`, CSS Animations §3) AND `stylesheet.ts:239-244` (**invalid `animation-composition` keyword** — `"bogus"` measured to vanish). Both the same CLASS (keyframe declaration ignored per spec). Six other `continue`/`filter`/`.map` matches swept + cleared as non-drops. |
| **cleanup · convergence-gate minor-corrections** (§3 (b)) | **CLOSED (D3-touching)** | `units/index.ts` = **451** on disk (`wc -l`); `barrel-cycle` re-framed unbuilt-banked-F2 (no `proof:barrel-cycle` in `package.json`); no-masking headline caveated at the spec-forced class; **lib typecheck EXIT=0, 0-byte output** (captured with `$?`). |

**Net effect on the composed thesis**: charter-c's D3 leg is now load-bearing. Item-2's "remaining lossy
class" survives — but as the partial-recovery class (already closed by item-1's extension), not the
retracted permissive-string phantom. Item-2's inventory gains a second spec-forced site. No new primitive is
required; the closers are attribution, one round-trip, and one grep — exactly as the critique scoped them.

---

## §1 · Obligation 1 — cite + reconcile U-F29 (crit G1 CLOSED)

### §1.1 The idiom charter-c presented as its own is TWICE-RATIFIED in-tree

Charter-c §1.3 framed `.eof()` fail-closed as ITS resolution of the owner-law axis ("I added `.eof()` to the
`parseCSSValues` parser"). The critique (G1) correctly showed the idiom already landed for the singular
sibling. This lane confirms it on disk **and finds a SECOND landed instance** the critique did not cite —
which strengthens the "ratified in-tree precedent" frame:

| landed site | mechanism | rationale (verbatim from the source comment) | cite |
|---|---|---|---|
| `parseCSSValue` (singular) | `ValuesValueEOF = ValuesValue.eof()` → `tryParse` → throw typed `CSSParseError` | *".eof() requires FULL-INPUT consumption (U-F29 · U.W-LIB LIB-G1): the parse fails when any trailing token remains … so a multi-token string is rejected instead of silently dropping every token past the first."* | `parsing/index.ts:518` (class), `:528` (`.eof()`), `:542-558` (throw); commit **`329932b`** |
| `parseCSSStylesheet` | `stylesheetItem.many().trim(ws).eof()` | *"`.eof()` … still requires the whole input to be consumed — **a silent partial parse hides grammar bugs** — but fails through `mergeErrorState` … strictly richer diagnostics … for less code."* | `stylesheet.ts:633` (S.W1 · lib-parsing F-9); rationale `:626-632` |

So the `.eof()`+loud-fail idiom is not a charter-c novelty; it is a **standing value.js parser discipline**
with two ratified instances and an explicit design rationale ("silent partial parse hides grammar bugs") that
is verbatim the owner's "no masking fallbacks" law. `parseCSSValue` was the U-F29 payoff; `parseCSSStylesheet`
predates it (S.W1). The ONE public entry that does not carry `.eof()` is `parseCSSValues` (plural) — by
deliberate design, next.

### §1.2 U-F29's ratified split: strict singular vs permissive plural — the design charter-c must reconcile with

U-F29 did not just add `.eof()` to `parseCSSValue`; it **renamed the full-list parser** `parseCSSSubValue →
parseCSSValues` and stated its permissive contract in-code (`parsing/index.ts:569-576`, the site AGGLOMERATION
§3 γ points at):

> *"`parseCSSValues` is the discoverable full-list parser: `FunctionArgs` is a whitespace/comma
> `sepBy(Value)`, so it consumes the WHOLE list and always wraps in a `ValueArray` (even for a bare `"10px"`)
> — exactly the uniform shape a flatten-to-leaves consumer expects."*

The commit body is explicit: singular = "parses a SINGLE CSS value and now LOUD-FAILS on unconsumed trailing
tokens"; plural = the "discoverable full-list parser." **This is a ratified two-parser split** (strict
singular / permissive plural), and charter-c never engaged with it — the critique's G1 core charge.

### §1.3 The reconciliation — WHY the full-list parser SHOULD reject an unconsumable tail while keeping its permissive wrap

The apparent tension ("U-F29 made the plural deliberately permissive; charter-c adds `.eof()` to make it
throw — a reversal?") dissolves once **"permissive" is disambiguated into two orthogonal senses**:

- **Permissive-WRAP (a SHAPE guarantee)** — always emit a `ValueArray`, even for a bare scalar, so a
  flatten-to-leaves consumer gets a uniform shape. This is what U-F29's `:569-576` design promises. Confirmed
  by measurement: `parseCSSValues("10px")` and `("1px 2px 3px")` both round-trip verbatim into a value list.
- **Permissive-of-garbage-TAIL (a CORRECTNESS hole)** — tolerate an ungrammatical, unconsumable remainder by
  silently dropping it. This is NOT part of U-F29's design; it is an accident of `any(FunctionArgs, Value)`
  recovering to a partial parse. Measured (§2.3): `")("→""`, `"calc(1 +"→"calc"` — silent truncation.

Adding `.eof()` closes the **second** sense without touching the first. "Consume the WHOLE list or fail" is
the natural completion of "the discoverable full-list parser" — a full-list parser that silently keeps only a
prefix is a full-list parser in name only (the exact footgun U-F29's commit body calls out for the singular:
*"the footgun was a full-list parser named as if it parsed LESS"*). The `ValueArray` wrap survives untouched;
only the silent-tail-drop dies. **The extension is therefore not a reversal of U-F29 — it is U-F29's own
`.eof()` discipline, applied to the one entry it did not yet reach, preserving the plural's SHAPE contract.**

### §1.4 The re-scope + the credit + the true cost

- **Re-scope** (crit G1's closer, verbatim): charter-c's item is not "introduce grammar-fail-closed" but
  **"extend the ratified `.eof()`+`CSSParseError` idiom (U-F29 `329932b`, S.W1 F-9) to the permissive plural
  entry, threading a diagnostic sink."** Its unique surface is one `.eof()` composition on the
  `any(FunctionArgs, Value)` parser + a sink wire — NOT the idiom itself.
- **Credit**: U-F29 (`329932b`) is the in-tree precedent for BOTH the mechanism (`.eof()`) and the typed
  error (`CSSParseError`, exported for `catch`-by-type). S.W1 F-9 is the precedent for `.eof()` on a
  `many()`-based list parser — the structural twin of `parseCSSValues`. The extension is landable precisely
  BECAUSE it matches twice-ratified precedent (a point in its favor, as the critique noted).
- **Cost, booked against U-F29 not the proto-era "OPEN"**: extending `.eof()` to the plural is a
  value.js-local, same-major change (adds a throw path to a parser that today never throws — a **behavioral
  break** for any consumer relying on silent-tail-drop, so it rides the same 2.0.0 loud-fail cadence U-F29
  established, not a patch). It couples to the exported `CSSParseError` type U-F29 already ships. No new
  primitive; the sink is the one charter-c already built and measured (3/6 firing).

---

## §2 · Obligation 2 — MEASURE the permissive-string round-trip (crit G2/G6 CLOSED)

### §2.1 The measurement (against `dist/value.js`)

```
$ node measure.mjs   # parseCSSValues(input) → String(result), compared to input
```

| input | `parseCSSValues` → `String(...)` | verbatim? | inner structure | class |
|---|---|---|---|---|
| `"10px"` | `"10px"` | ✓ | `[{unit:px value:10}]` | legit |
| `"1px 2px 3px"` | `"1px 2px 3px"` | ✓ | 3 length leaves | legit |
| `"scale(2) rotate(45deg)"` | `"scaleX(2) scaleY(2) rotateZ(45deg)"` | (normalized) | both fns survive | legit |
| **`"@@@"`** | **`"@@@"`** | **✓** | `[{value:"@@@"}]` | **permissive-string** |
| **`"1px @ bad"`** | **`"1px @ bad"`** | **✓** | `[{unit:px value:1},{value:"@"},{value:"bad"}]` | **permissive-string** |
| **`"///"`** | **`"/ / /"`** | (whitespace only) | `[{unit:string value:"/"} ×3]` | **permissive-string** |
| **`")("`** | **`""`** | **— DROPPED** | `[]` (empty) | **partial-recovery** |
| **`"rgb("`** | **`"rgb"`** | **— `(` dropped** | `[{value:"rgb"}]` | **partial-recovery** |
| **`"calc(1 +"`** | **`"calc"`** | **— `(1 +` dropped** | `[{value:"calc"}]` | **partial-recovery** |
| `"1px )("` | `"1px"` | — `)(` dropped | `[{unit:px value:1}]` | partial-recovery |
| `"10px rgb("` | `"10px rgb"` | — `(` dropped | `[{unit:px value:10},{value:"rgb"}]` | partial-recovery |

### §2.2 Friction #1 is RETRACTED — the permissive-string class is NON-lossy

Charter-c §5.1 (friction #1) and §1.3 ("the honest, sharper finding") asserted `@@@`/`///`/`1px @ bad`
"still succeed **silently**," implying dropped data. **Measured: no data is dropped.**
- `@@@` → `@@@`: the whole input is captured as a single permissive ident-value; byte-identical round-trip.
- `1px @ bad` → `1px @ bad`: **all three tokens** (`1px`, `@`, `bad`) are preserved as leaves; verbatim.
- `///` → `/ / /`: **all three `/` tokens** survive as string ValueUnits; the only difference is inter-token
  whitespace, which serialization normalizes for EVERY input (`"1px  2px"→"1px 2px"`, `"scale(2)"→
  "scaleX(2) scaleY(2)"`). Whitespace normalization is not data loss.

This is exactly the reasoning charter-c §2 used to REFUTE lossiness for `kind:"unknown"` ("captured … NOT a
silent drop") — the self-contradiction critique-G2 flagged. Applying that logic consistently: **the
permissive-string class is non-lossy forward-compat token capture, not a silent drop.** Friction #1 is a
phantom, retracted; item-2's "residual permissive-string class" evaporates.

### §2.3 The measurement REVEALS the mis-assigned class — the genuine lossy class is PARTIAL-RECOVERY

The retraction does not empty item-2; it **relocates** the lossy class. The genuine silent-lossy-success on
HEAD's permissive `parseCSSValues` is the **partial-recovery tail** — inputs with a syntactically-unconsumable
remainder that `any(FunctionArgs, Value)` recovers from by dropping:

- `")("` → `""` — **total loss** (empty `ValueArray`);
- `"rgb("` → `"rgb"`, `"calc(1 +"` → `"calc"`, `"1px )("` → `"1px"` — **tail truncation**.

These succeed silently today (no throw, no diagnostic) — the precise footgun U-F29 killed for the singular.
And this is **exactly the class item-1's `.eof()` extension closes**: `.eof()` demands full consumption, so an
unconsumable tail becomes a `CSSParseError` the sink rides (charter-c measured 3/6 firing — the 3 are these
partial-recovery inputs). So item-2's "remaining lossy class" is REAL and already has its closer in item-1;
what was wrong was the charter's assignment of it to the permissive-string inputs (which have no tail for
`.eof()` to catch precisely because nothing is unconsumed).

**Corrected item-2 accounting:**

| class | example | HEAD behavior | lossy? | disposition |
|---|---|---|---|---|
| permissive-string (whole input consumed) | `@@@`, `1px @ bad`, `///` | verbatim / whitespace-normalized | **NO** (measured §2.1) | non-lossy capture — no fix; friction #1 retracted |
| partial-recovery (unconsumable tail) | `)(`, `rgb(`, `calc(1 +` | silent truncation | **YES** (measured §2.1) | **closed by item-1's `.eof()` extension** (sink fires 3/6) |
| `@keyframes !important` decl | `color:red !important` | dropped, no diagnostic | yes (spec-mandated) | embed-warn (charter-c §1.2) — spec-forced |
| `@keyframes` invalid composition | `animation-composition: bogus` | dropped, no diagnostic | yes (spec-conformant) | **NEW site — §3.2** |
| `kind:"unknown"` at-rule | `@media …`, `@layer a;` | structural capture | **NO** (§2.4) | non-lossy STRUCTURAL capture |

### §2.4 Symmetry (crit G6) — `kind:"unknown"` is captured STRUCTURALLY, not "verbatim"

Charter-c §2 called the unknown at-rule "captured VERBATIM." On disk (`stylesheet.ts:412-433`) the block form
hardcodes `body: null` (`:425`, `:430`) and retains only the recursively-parsed `children`. Measured:

```
"@layer base;"                 → {kind:"unknown", atName:"layer", prelude:"base", body:null}
"@media (min-width:700px){.a{color:red}}"
                               → {kind:"unknown", atName:"media", prelude:"(min-width: 700px)",
                                   body:null, children:[{kind:"style", selectors:[".a"], …}]}
"@supports (display:grid){.a{color:red} zzz}"   → THREW  (Parse error at offset 51, the stray `zzz`)
```

So the accurate wording is **"captured STRUCTURALLY (`body:null`) — prelude + recursively-parsed children;
raw body text discarded."** Two consequences, both favorable to charter-c's DIRECTION (fail-closed would
wrongly reject real `@media`) while correcting its overclaim:
- the raw body TEXT is not recoverable (not "verbatim") — a serialization-fidelity nuance, not a rule drop
  (all rules survive as typed `children`);
- the inner-token drop G6 worried about **does not happen silently**: a non-rule token inside an unknown block
  (`zzz`) makes the WHOLE stylesheet parse throw via the top-level `.eof()` (`stylesheet.ts:633`). The block is
  either fully structured or loudly rejected — it is non-lossy in the same "capture-or-fail-closed" sense as
  the permissive-string class.

**The symmetry that resolves critique-G2**: the permissive-string class (§2.2) and `kind:"unknown"` (§2.4) are
BOTH non-lossy captures — one at the token grain, one at the rule grain — each backed by a top-level `.eof()`
that converts any unstructurable remainder into a loud failure. Charter-c classified verbatim capture as
non-lossy in one place and lossy in another; measured, they are uniformly non-lossy. The one genuine open
lossy class (partial-recovery) is closed by item-1.

---

## §3 · Obligation 3 — the silent-drop sweep (crit G3 CLOSED)

### §3.1 Method

Grepped the declaration/rule/keyframe parsers for the silent-skip idioms the critique named (`continue`,
`.filter(Boolean)`, discarded-branch `.map`) across `src/parsing/` — the same idiom class that surfaced the
`!important` drop:

```
$ grep -rnE '\bcontinue\b|\.filter\(Boolean\)|\.filter\(|flatMap|body:\s*null' src/parsing/
```

11 matches. Each was read in context and measured where behavioral. The result: the spec-mandated / silent-
drop set is **NOT `{@keyframes !important}` alone** — there is a second keyframe drop, and six matches are
non-drops (false positives) that a "grep-only" sweep would have mis-counted.

### §3.2 The complete drop-site set (per-site cites + measured behavior)

**GENUINE silent drops in the keyframe/declaration parsers:**

| # | site | trigger | measured behavior | class |
|---|---|---|---|---|
| D1 | `stylesheet.ts:233` (`liftKeyframeMetadata`, `continue` on `d.important`) | `@keyframes` decl with `!important` | `color:red !important` → **vanishes** (only `opacity` survives; no diagnostic) | **spec-MANDATED** (CSS Animations §3: the declaration "is ignored") — charter-c's named site |
| D2 | `stylesheet.ts:239-244` (`liftKeyframeMetadata`, `continue` after the valid-keyword guard) | `@keyframes` `animation-composition` with an **invalid keyword** | `animation-composition: bogus` → **vanishes** (neither pushed to `declarations` NOR lifted to `composition`; contrast `add` → `composition:"add"`) | **spec-CONFORMANT** (invalid declaration ignored per cascade) — **NEW: charter-c's inherited enumeration MISSED this** |

**Structural-capture caveat (not a whole-rule drop):**

| # | site | behavior | class |
|---|---|---|---|
| D3 | `stylesheet.ts:425/430` (`unknownBody`, `body:null`) | raw body text discarded; block kept as prelude + recursively-parsed children; non-rule inner token → whole parse throws (§2.4) | non-lossy STRUCTURAL capture (the G6 correction) — bounded by the top-level `.eof()`, not a silent drop |

**Swept + CLEARED as non-drops (grep false positives — recorded so the set is defensible):**

| site | why NOT a drop |
|---|---|
| `stylesheet.ts:235-237` (`animation-timing-function`, `continue`) | a **LIFT**, not a drop — the value is stored in `out.timingFunction` (measured: `ease-in` → `timingFunction:"ease-in"`), then `continue` skips re-pushing. Data preserved in a typed field. |
| `extract.ts:67` (`collectKeyframes`, `continue` on keyframes item) | extractor **control-flow** — "handled this item, skip the child-walk." Operates on the already-parsed AST; loses nothing. |
| `extract.ts:93` (`extractProperties`, `continue` on non-`property`) | **selective index** — builds a focused `Map<name, descriptor>`; the skipped items remain in the `Stylesheet` AST. |
| `extract.ts:117` (`collectFunctions`, `continue` on function item) | same control-flow pattern as `extract.ts:67`. |
| `index.ts:96` (`TRANSFORM_DIMENSIONS.filter(d => d !== "z")`) | transform-axis selection (x/y from x/y/z); not a parse drop. |
| `declarationList = declaration.many()` (`stylesheet.ts:168`) | combinator partial-recovery, not a `continue`-idiom drop — this is the SAME partial-recovery class §2.3 measured on `parseCSSValues`, closed by `.eof()` at the top-level stylesheet parser (`:633`), which fails-closed on a malformed declaration (measured §2.4, the `zzz` case). |

### §3.3 Verdict on "the single spec-mandated site"

Charter-c §1.1/§6 concluded embed-warn "survives ONLY at the single spec-mandated `!important` site." **The
sweep FALSIFIES "single" as stated**: the keyframe parser silently drops declarations at **two** sites (D1
`!important` + D2 invalid `animation-composition`), both spec-conformant, both diagnostic-less today. They are
the **same CLASS** — "a `@keyframes` declaration the spec says to ignore" — reached by two code paths. The
correct re-scope: **"the `@keyframes` ignored-declaration class (two triggers: `!important` and an invalid
`animation-composition` keyword)."** charter-c's embed-warn resolution (§1.2) generalizes cleanly to both (the
`liftKeyframeMetadata` `.map()`-closure diagnostic rides `KeyframeRule.diagnostics` for either trigger); the
OF-3 owner residual widens from "1 site" to "1 class / 2 sites" but its CHARACTER is unchanged (spec-forced
keyframe-declaration drops where fail-closed is spec-invalid). No third silent-drop site exists in the
declaration/rule/keyframe parsers.

---

## §4 · Convergence-gate minor-corrections (the D3-touching subset of §3 (b))

| item | correction | evidence |
|---|---|---|
| **451-not-452** | `units/index.ts` is **451** lines on disk, not the 452 charter-b §0/§3 states (critique-charter-b G4). This is charter-**B**'s number (the `units/index.ts` carve), not a charter-c/D3 figure — **booked here as part of the shared cleanup**; charter-β/the reconciled manifest carries the fix in charter-B's own doc. charter-c's `r4` site-count (491) is already correct — no D3 correction there. | `$ wc -l src/units/index.ts → 451` |
| **`barrel-cycle` framed unbuilt-banked** | charter-c §3.5 frames `barrel-cycle` as "CI-only, **like the incumbent `size-graph`**" — but there is **no `proof:barrel-cycle` in `package.json`**; only `proof:size-graph` is incumbent. Re-frame: `barrel-cycle` is an **UNBUILT banked-F2 proposal to be authored in Charter B** (the runtime-edge scanner), NOT an existing CI gate; its 28-node/true-2-SCC figure is cited from proto-f5 §2, un-refreshed on HEAD. | `$ grep -nE 'barrel-cycle\|size-graph' package.json` → only `proof:size-graph` (`:99`); `test:dist` chains exactly **10** gates (`:86`), none `barrel-cycle` |
| **no-masking headline caveated** | charter-c §0/§6 "owner-law-clean (no masking)" over-claims by the spec-forced embed-warn class: a consumer ignoring `KeyframeRule.diagnostics` sees the identical silent-drop — a masking fallback by §0's own definition. **Caveat**: "no masking **except** the spec-forced `@keyframes` ignored-declaration class (D1 `!important` + D2 invalid composition, §3.2), whose embed-warn-vs-full-`{value,diagnostics}` residual is owner-routed (OF-3)." | §3.2 D1/D2 measured; the class is 2 sites, so the caveat now covers both |
| **exit-code-captured typecheck** | the lib surface (the D3 parsing surface) typechecks clean on HEAD, captured with the exit code and the byte count of output — the "0-byte typecheck evidence with exit codes" the gate wants. (The demo surface is Charter A's; not re-run here.) | `$ npx vue-tsc -p tsconfig.lib.json --noEmit; echo $?` → **`0`**; `wc -c` of captured output → **`0`** bytes |

---

## §5 · Owner-reserved forks (PRESENTED, not decided)

- **OF-3 — the `{value,diagnostics}` boundary vs additive soft-add** (retro-f4 G4). Charter-c largely
  dissolved it: fail-closed (no masking) is the general answer; embed-warn survives only where the drop is
  spec-forced. **This lane's ONLY change to OF-3: its scope widens from "1 site" to "1 class / 2 sites"**
  (§3.3 — `!important` + invalid `animation-composition`). The owner question is unchanged in CHARACTER: for
  the `@keyframes` ignored-declaration class, is an embedded `KeyframeRule.diagnostics` warning acceptable, or
  must the full top-level `{value,diagnostics}` return (breaking: r4 measured **491** sites, a 2.0.0 major) be
  adopted so a lossy parse cannot read as a plain success? **Presented at its true widened-but-narrow scope
  (one class / two spec-forced sites, not 491) — not pre-decided.**
- **OF-1 (`@`-ban idiom)** and **OF-2 (api vocabulary)** are not this lane's surface (Charter A) — held
  owner-reserved, untouched.
- **No fork pre-decided.** The `.eof()` extension (item-1) is not a fork — it is the completion of a
  twice-ratified in-tree discipline (§1.1), landable on the U-F29 2.0.0 loud-fail cadence, gated on OF-5 like
  every other landing.

---

## §6 · Honest retractions + residual frictions (measured)

**Retractions this lane makes against charter-c (each earned by a measurement, per the campaign law):**
1. **Friction #1 RETRACTED** (§2.2): the permissive-string class (`@@@`/`///`/`1px @ bad`) is NON-lossy —
   measured verbatim / whitespace-normalized, all tokens preserved. charter-c called it a lossy silent
   success; it is not.
2. **"captured VERBATIM" → "captured STRUCTURALLY (`body:null`)"** (§2.4, crit G6): the `kind:"unknown"` block
   discards raw body text; direction sound, wording corrected.
3. **"single spec-mandated site" → "the `@keyframes` ignored-declaration class (2 sites)"** (§3.3, crit G3):
   the sweep found D2 (invalid `animation-composition`) alongside D1 (`!important`).
4. **charter-c's `.eof()` NOVELTY over-claim retracted** (§1, crit G1): re-scoped to an EXTENSION of the
   twice-ratified U-F29 / S.W1-F-9 idiom, credited.

**Residual frictions (flagged, not smoothed):**
- The partial-recovery lossy class (§2.3) is closed by item-1's `.eof()` extension **as a proto**; the
  extension is NOT landed on HEAD (nothing merges — OF-5). This lane proves the class is real and the closer
  correct; the landing is owner-gated.
- The D2 invalid-composition drop is a **very narrow** edge (a malformed `animation-composition` keyword
  inside `@keyframes`); it is spec-conformant and diagnostic-less like D1. It is booked for completeness of the
  set, not asserted as a high-frequency defect.
- The measurements run against the BUILT dist (ctor names minified: `String(...)`/structure are the signal,
  not class identity) — the round-trip strings and token structures are the load-bearing evidence and are
  unaffected by minification.

---

## §7 · Convergence verdict for Charter γ

The three critique-charter-c gaps that capped the D3 leg are closed with evidence:
- **G1** (U-F29 uncredited/unreconciled) → §1: twice-ratified idiom cited, re-scoped to an extension,
  reconciled via the wrap-vs-tail disambiguation, cost booked against U-F29.
- **G2** (permissive-string un-measured + self-contradicting) → §2: measured; friction #1 retracted; the
  genuine lossy class relocated to partial-recovery (already closed by item-1); the §2/§5.1 self-contradiction
  resolved by uniform non-lossy-capture logic.
- **G3** (inventory un-swept, "one site" unproven) → §3: swept; "single site" falsified (2 sites, same
  class); six false positives cleared; the set is now defensible.
- **G6/G5/G4 (minor)** → §2.4 (structural not verbatim), §4 (no-masking caveat, barrel-cycle unbuilt-banked),
  §4 (451-not-452, exit-code typecheck).

**What remains for the fresh full adversarial audit** (the 100%-convergence precondition — not this lane's to
self-certify): whether the widened OF-3 scope (1 class / 2 sites) changes the owner's boundary-vs-soft-add
call; whether a THIRD non-keyframe drop exists in a parser this sweep did not reach (the sweep covered
`src/parsing/` declaration/rule/keyframe parsers — the color/units/math parsers were out of the crit-G3 scope
and are not swept here). The D3 leg is now load-bearing: an accounting that names the real lossy class,
credits the real precedent, and publishes the real drop set — each with a command and a number.
