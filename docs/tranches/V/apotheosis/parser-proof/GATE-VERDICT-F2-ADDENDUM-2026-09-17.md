SERVED MODEL: claude-opus-5[1m]

# ADDENDUM BESIDE `GATE-VERDICT.md` §F-2 — 2026-09-17

**This file corrects nothing by rewriting.** `GATE-VERDICT.md` (2026-07-20) is a **pinned authority**
under the epoch rule and **E-3**: dated specs, adjudicated registries, conformance artifacts and prior
evidence are IMMUTABLE, and a correction sits **beside** them, dated, never inside them. **No byte of
`GATE-VERDICT.md` is edited by this act.**

- **Issued by**: X.KF.W2 (Parse Façade), unit `KF.W2.a`, under **G-W2-5** clause 1 — *"§F-2 is
  corrected **by addendum** (E-3, beside the pinned authority — never a rewrite)."*
- **Subject**: `GATE-VERDICT.md` **§F-2** (heading at `:32`), the clause at **`:42`**.
- **Ref of record**: keyframes.js `7d958f212fd519142ee9ed5e298d5afe456a7967` (`origin/master`).
- **Artifact of record for every executed reading below**:
  `node_modules/@mkbabb/value.js/dist/subpaths/{css,easing}.js`, version **4.0.0** (verified at run
  time), re-executed by this seat on 2026-09-17 and **double-run with identical output**.

---

## §1 · The sentence, quoted as it stands, and what is falsified

`GATE-VERDICT.md:41-43`, verbatim at the current bytes:

> 4.0.0 is immutable; the mirror
> swap is the cure; **no known consumer feeds the crash shape (kf's 37 seams
> verified — none constructs empty functional colors).**

**FALSIFIED**, in the bolded clause only. A **live consumer feeds the crash shape**: the keyframes.js
timeline's **inline variable editor** admits `oklch()` as a declaration value **verbatim** and hands it
to the engine's parse.

**The scope of the falsification is stated exactly**, because an addendum that over-reaches is worth
no more than the sentence it corrects:

| §F-2 claim | status after this addendum |
|---|---|
| *"The LIVE v4 parser has 5 recorded defects; R1 is a shipping crash."* | **STANDS.** Re-executed: `parseCssColor("oklch()")` → `THROW TypeError: Cannot read properties of undefined (reading 'replace')` |
| *"`parseCssColor(\"oklch()\")` (and `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`) throws `TypeError` … the frozen public contract says clean `ok:false`"* | **STANDS**, and is **WIDER than filed** — see §3 |
| *"4.0.0 is immutable; the mirror swap is the cure"* | **STANDS.** This addendum asks for no library change and moves no cure |
| *"no known consumer feeds the crash shape"* | **FALSIFIED** — §2 |
| *"(kf's 37 seams verified — none constructs empty functional colors)"* | **SCOPE-CORRECTED, not refuted.** The verification was real and its conclusion was true **of what it covered**: kf's `src/` **seams**. It did not cover the demo's **live typing surface**, which is not a seam — it is an ingress. *"A genuine scope-correction … the census covered kf's `src/` seams, not this live typing surface."* |

---

## §2 · The witness — banked, and re-walked byte-exact at the ref of record

**Banked id**: **`C-7`** ⟨`docs/tranches/V/megatranche/registry/adjudicated/kf-KeyframeTimeline.md:48`⟩,
**MAJOR**, adjudicated. It is also row **8** of the X·KF failure-posture registry
(`docs/tranches/X/keyframes/registries/POSTURES.md`) — *for its silent-failure posture*. **The crash
identity itself FOLDS to the megatranche R1 row and is never re-booked**; what this addendum carries
is the **reachability**, which is the only thing §F-2's clause asserted.

**The chain, verbatim from the bank**:

> `:252-260` admits `oklch()` as a value verbatim → `kf.vars` → un-awaited `rebuild()` (`:264`) →
> `buildAnimationFromTimeline` → engine parse → **THROW** → swallowed at `useTimelineBuild.ts:47-50`
> (`console.error` + `animation.value = null` — the file's ONLY non-toasting failure; compare
> `:121/:133/:137/:148/:155/:157`).

**Re-walked at `7d958f21` by this seat** (`git show <ref>:<path>`, read-only):

| link | path | measured |
|---|---|---|
| the emitter (round-trip head) | `demo/components/instrument/timeline/KeyframeTimeline.vue` | `:239-244` — `selectedKeyframeCSS` joins `${prop}: ${value};` out of `selectedKeyframe.value.vars` |
| the hand-rolled scanner | same | `:251-261` — `css.split("\n")`, `trimmed.startsWith("/*")` skip, `indexOf(":")`, trailing-`;` strip, `if (prop && value) newVars[prop] = value` — **no grammar, no validation: any non-empty value string survives, including `oklch()`** |
| whole replacement | same | `:263` — `kf.vars = newVars` (a replacement, so anything the scanner misses is **deleted**, not mis-parsed) |
| un-awaited rebuild | same | `:264` — `rebuild();` with **no `await`**, against an `async` function |
| the swallow | `demo/components/instrument/timeline/composables/useTimelineBuild.ts` | `:34` `const rebuild = async () =>` · `:40` `try {` · `:41-45` `await buildAnimationFromTimeline(...)` · `:47-50` `} catch (e) { console.error("Failed to rebuild timeline animation:", e); animation.value = null; }` |

**Consequence, stated plainly**: a user typing `color: oklch()` into the timeline's variable editor —
ordinary authored CSS, in a field that exists to accept authored CSS — reaches value.js's grammar and
detonates the R1 `TypeError`. The consumer's only handling is a **console line**; the animation
silently becomes `null` while the UI keeps painting. That is precisely *"a known consumer feeding the
crash shape"*, and it ships.

**A second, independent reachability, carried so the correction is not a singleton** — kf-SquareScene
**`D-27/L-7/C-9`** ⟨`:53`⟩: *"`calc()` is ordinary authored CSS; `parseCssScalar(\"calc(1px + 2px)\")`
→ ERR → `num()` throws"*, inside a rAF frame with no engine guard, where the throw **bricks the loop
for the mount's lifetime**. That cell's own identity lock — *"annotated, never re-booked"* — is
honoured: it is cited here as **reachability evidence** and is booked in no registry by this act.

**And the pair reading that keeps the older negative true** (kf-SquareInstrument **K-6**): K-6's
measurement is **CONFIRMED** and its kill stands for exactly one claim — **R1-through-a-CSS-token** at
`useSquareTumble.ts:22`, where `getComputedStyle().getPropertyValue()` yields `""` for an undefined
token and the `if (value)` guard skips it, so **no token can produce empty-args `oklch()`**. The token
path is guarded; the **authored-CSS** path is not. **Token path and authored-CSS path are read as a
pair, never merged.**

---

## §3 · The scope correction §F-2's own defect row earns — R1 is wider than "`parseCssColor`"

Re-executed against the artifact of record, 2026-09-17, double-run identical:

```
"oklch()" / "rgb()" / "hsl()" / "lab()" / "color()"
  parseCssColor         → THROW TypeError: Cannot read properties of undefined (reading 'replace')
  parseCssValues        → THROW TypeError (same)
  parseCssScalar        → THROW TypeError (same)
  parseTimingFunction   → ok:false [css_syntax]
  parseKeyframeSelector → ok:false [keyframe_selector_invalid]
  parseStylesheet       → ok:false [css_syntax]   (top level)
  parseStylesheet("@keyframes a{from{color:oklch()}}")
                        → THROW TypeError (same)  (nested)
"calc()"  parseCssColor → THROW TypeError   |  parseCssValues → ok:false [css_syntax]
"steps()" parseCssColor → THROW TypeError   |  parseCssValues → ok:false [css_syntax]
"steps(2, end)"  (the well-formed control)
  parseCssColor → ok:false [css_syntax] | parseCssValues → ok:true | parseTimingFunction → ok:true
null / undefined  → THROW TypeError on every entry (`…reading 'trim'`; parseStylesheet `…reading 'length'`)
42 / {} / []      → THROW TypeError ("e.trim is not a function") on five entries
                  → parseStylesheet: ok:true {"ok":true,"value":[],"diagnostics":[]}
```

**Three facts this addendum adds to §F-2's record, none of which asks for a library change here:**

1. **The crash shape is "empty-argument functional notation", not "empty-argument COLOR notation at
   `parseCssColor`".** It escapes **five** entries — `parseCssColor`, `parseCssValues`,
   `parseCssValue`, `parseCssScalar`, and `parseStylesheet` **on the nested form**. A *scalar* entry
   dying on a *colour* functional notation, and a *colour* entry dying on `calc()`/`steps()`, are
   evidence in **both** directions that the dispatch is shared. This is black-box evidence from the
   dist, **not** a read of value.js source; the source-level question stays routed to the V·π parser
   program.
2. **The library's most defensive posture is unreachable on this class.** `adapter.ts:219-226`'s
   `parseSource` is written `result.ok ? {ast, issues:[]} : {ast:[], issues:result.diagnostics}` —
   but `parseStylesheet` **throws before returning** on a stylesheet containing `color: oklch()`. The
   absorb arm never runs on precisely the input it exists for.
3. **`parseStylesheet(42|{}|[])` returns `ok:true` with an empty stylesheet** — a non-string silently
   accepted as *"no rules"*. **Worse than a throw for a validator.** Forwarded to the value.js parser
   lane as evidence; **no defect id is minted by this addendum.**

---

## §4 · What this addendum does NOT do

- It **edits no byte** of `GATE-VERDICT.md`, and it retires none of its four other findings (F-1, F-3,
  F-4, and R2–R5 stand untouched).
- It **mints no id**, moves no cure, and changes no owner. `C-7`'s cure is **KF.W7**'s;
  `D-27/L-7/C-9`'s is the square packet's (**KF.W11**); the R1 crash identity remains the megatranche
  R1 row's, in the V·π parser program.
- It makes **no completeness claim**. It falsifies one universal (*"no known consumer"*) with a named,
  re-walked witness — which needs one instance, and has two.

**Full census of record**, per ingress, with the value.js entry reached and the executed outcome:
`docs/tranches/X/keyframes/registries/INGRESS-CENSUS.md` (published in the same commit as this file,
under the wave's declared commit-family lock).
