# CHALLENGE-C — `EasingSpecimenStrip.vue` · implementation · **pass 3 (r3)**

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context tier this seat
was explicitly spawned with. Declared, not inherited.

---

## What this pass is

The tree **moved under the ledger**. Pass 2 measured at `80fc5c40`; the working tree is now
`f36f780c` (the prompt named `c654824e` — three heads back). A defect ledger asserted against a HEAD
that no longer exists is a hypothesis, so this pass re-derived every finding **independently, from
the source, at `f36f780c`**, before reading pass 2 — then reconciled.

| | |
|---|---|
| **HEAD verified** | `f36f780c` (pass 2: `80fc5c40`; prompt: `c654824e`) |
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216) |
| **Corpus** | `easing/easingCatalogue.ts` (231) · `easing/useSpecimenRows.ts` (74) · `easing/EasingAuthoringStage.vue` (117) · `GradientVisualizer/GradientEasingEditor.vue` (295) |
| **Producer read** | `glass-ui@7.0.0` `dist/chip-DFZQr6rV.js` · `dist/fading-scroll-DhxXIhm2.js` · `dist/easing.js` · `dist/styles/glass/glass-chip.css` · `dist/styles/glass.css` |
| **Live probes** | 8 headless WebKit runs, 1440×900 light, against `http://localhost:9000/#/gradient` — the same engine and viewport as the visual matrix |
| **Module probe** | 1 `vite-node` run over `easingCatalogue.ts` through the demo's own resolution |

**VERDICT — DEFECTIVE.** Seventeen findings. The BLOCKER **still reproduces at `f36f780c`**. One
finding is new to this pass; sixteen carry pass-2's ids unchanged so the fold never renumbers.

### Re-verification ledger at `f36f780c`

| id | sev | finding | status at `f36f780c` | my independent evidence |
|---|---|---|---|---|
| **C-01** | **BLOCKER** | all 3 `back` tiles tear down the Gradient pane on one click | **STILL RED** | `verify.mjs`, pasted below — 3/3 destroyed, control clean |
| C-02 | MAJOR | MT-F030 — five radius registers in one card; `--radius` clobbered by a producer layer collision | **STILL RED** | census re-measured, 5 registers, table below |
| C-03 | MAJOR | glass `Chip` cell recipe + pressed wash never paint — **FOLD-BANK (M3)** | **STILL RED** | `grep -rn "glass-chip.css" dist/` → 0 hits; 18-import list pasted |
| C-04 | MAJOR | the in-plate tile carries the floating glass elevation | **not re-probed** — pass-2 evidence stands, see caveat |
| C-05 | MAJOR | zero-letterbox law is dead code — `svg[role='img']` matches nothing | **STILL RED** | `svgImgCount: 0`; `--vb-ratio` stuck at `1.2`; witness PNG |
| C-06 | MAJOR | `FAMILY_ORDER` drops 6 of 30 library presets | **STILL RED** | module probe + **live authoring repro**, new witness |
| C-07 | MAJOR | the lit `steps` tile misreports identity and is inert | **STILL RED** | `verify2.mjs` A/B/C, pasted below |
| C-08 | MAJOR | 27-way single-select as 27 toggles behind a nameless roleless tab stop | **STILL RED** | `tabindex:"0", role:null, aria:null`; 27 tabbables |
| C-09 | MINOR | WCAG 2.5.3 Label in Name (`steps` / `n = 4`) | **STILL RED** | measured triple, below |
| C-10 | MINOR | per-instance override of the producer cell recipe (edict 5) | **STILL RED** | `:163-170` vs the cell recipe |
| C-11 | MINOR | one 27-Chip strip mounted per interval, forever | **STILL RED** | **133 of 511 page elements (26.0%)**, 18 541 path chars — new number |
| C-12 | MINOR | vacuous unit gate; both live oracles RED | **STILL RED** | mutation re-confirmed; O-17 premise dead |
| C-13 | INFO | `.specimen-strip` is a dead class hook | **STILL RED** | `specimenStripRules: 0` at runtime |
| C-14 | INFO | exported minters carry no arity/domain guard | **STILL RED** | `:48-56` |
| C-15 | INFO | watch getter allocates a fresh tuple each evaluation | **STILL RED** | `:50-51` |
| C-16 | INFO | keep-in-view flake — **did not reproduce again** (this pass 3/3 green) | **NEGATIVE PROOF, second pass** | `scrollLeft` 0 → 1046, survives collapse/reveal, `scrollY` stays 0 |
| **C-17** | **MINOR** | **hovering the pressed tile destroys half its selection ink** | **NEW** | computed-style transition, pasted below |

---

## C-01 · BLOCKER — re-verified at `f36f780c`: the `back` family still bricks the pane

Fresh run, one clean context per press, error boundary detected by text:

```
$ node scratchpad/verify.mjs
=== BACK-FAMILY / control presses at HEAD f36f780c ===
{"id":"ease-out-circ",    "clicked":true,"stripAlive":true, "pressed":["ease-out-circ"],
 "readout":"cubic-bezier(0.075, 0.82, 0.165, 1)","headName":"ease-out-circ","boundary":null}
{"id":"ease-in-back",     "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"unexpected error."}
{"id":"ease-out-back",    "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"unexpected error."}
{"id":"ease-in-out-back", "clicked":true,"stripAlive":false,"pressed":[],"readout":null,
 "headName":null,"boundary":"unexpected error."}
```

`ease-out-circ` — the tile immediately preceding the family — presses clean and reports its literal.
The three tiles after it replace the entire workbench with the boundary. The press path is fine; the
curve is the poison. Pass 2's chain re-read at this HEAD and unchanged:

- `src/color/operations.ts:65` returns `err({ code: "color_progress_out_of_range" })` — **the library
  is correct**, it never throws;
- `demo/workbenches/gradient/composables/useGradientInterpolation.ts:37` and
  `composables/useGradientCSS.ts:207` demote that `Result` into a bare `throw`;
- `easing/useSpecimenRows.ts:53-59` calls it **inside a `computed`**, so the throw escapes during
  render and the boundary eats the pane;
- `easingCatalogue.ts:176-190` mints `back` tiles with no domain check.

And the strip is not a bystander — its own stylesheet is written *for* these curves
(`EasingSpecimenStrip.vue:172-179`: *"overshoot curves (the back family) draw past the box — visible,
never clipped"*, `overflow: visible`). It renders headroom so the portrait reads, then offers a
control its host cannot survive.

**Cure (unchanged, and I concur after independent derivation).** A CSS gradient interval cannot
produce a color outside its endpoints, so an overshooting timing function *means* hold-at-endpoint.
Clamp progress to `[0,1]` **once**, where an eased `t` becomes a mix progress — in
`useGradientCSS.easingFnOf`'s return or a `rampProgress(fn, t)` beside it — so `useSpecimenRows`,
`serializeIntervalRamp` and `serializeCoalescedGradient` all inherit totality; then delete both
`throw` sites, which become unreachable. Deleting the `back` family is strictly worse: the producer's
picker still offers those curves (C-06) and it contradicts the strip's own overshoot design.

---

## C-07 · MAJOR — re-verified: the lit `steps` tile is still a trap

Fresh three-step reproduction at `f36f780c` — press the generic tile, bump `n` on the producer's own
`Step count` slider, then press the still-lit tile:

```
$ node scratchpad/verify2.mjs
A after pressing generic steps : {"pressed":["steps"],"readout":"steps(4, jump-end)","head":"steps"}
B after bumping n to 7         : {"pressed":["steps"],"readout":"steps(7, jump-end)","head":"steps"}
C after pressing lit 'steps'   : {"pressed":["steps"],"readout":"steps(7, jump-end)","head":"steps"}
```

At **B** the tile whose own literal is `steps(4, jump-end)` renders pressed while the readout three
pixels below it says `steps(7, jump-end)` — the strip's stated law (`:7-8`, *"pressed tile IS the
interval's curve"*) is false. At **C** the one control in the product that names
`steps(4, jump-end)` refuses to emit it, because `onTileToggle` (`:33-35`) drops `on === false` and
reka's `Toggle` reports exactly that for an already-pressed tile. There is no path back to the
default staircase through the selection surface.

Mechanism: a **surjective** identity function (`tileIdFor`, `easingCatalogue.ts:219-223`, many steps
intervals → one tile) feeding a press handler that assumes **injectivity**. Cure: make selection
idempotent — `function onTileToggle(tile) { emit("select", tile) }` — which is the radio semantics
the control already wants (C-08) and costs one boolean.

---

## C-06 · MAJOR — re-verified, and now with a live authoring witness

Module truth through the demo's own resolution:

```
$ npx vite-node scratchpad/probe.ts
bezierPresets count: 30      SPECIMEN_TILES count: 27
families: css(5) sine(3) quad(3) cubic(4) expo(3) circ(3) back(3) steps(3)
DROPPED presets (6): ease-in-quart, ease-out-quart, ease-in-out-quart,
                     ease-in-quint, ease-out-quint, ease-in-out-quint
  ease-in-quart -> cubic-bezier(0.895, 0.03, 0.685, 0.22)  tileIdFor => null
```

`easingCatalogue.ts:191` uses the `:174` literal as a **filter**, not an order:
`FAMILY_ORDER.filter((f) => byFamily.has(f))`. `quart`/`quint` are built, then discarded.

**New this pass — the cross-surface repro, driven end to end.** The producer's preset menu is
`Object.keys(bezierPresets)` (`dist/easing.js`: `Object.keys(P)`), so the seat's own authoring stage
offers all thirty:

```
$ node scratchpad/probe5.mjs
OPTIONS(30): [… "ease-in-quart","ease-out-quart","ease-in-out-quart",
              "ease-in-quint","ease-out-quint","ease-in-out-quint" …]

$ node scratchpad/probe6.mjs          # select "ease-in-quart" in that menu
AFTER ease-in-quart: {"pressed":[],"readout":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","headName":"custom"}
```

The literal mints correctly — `bezierLiteral` (`:48-51`) is byte-identical to the producer's
`` `cubic-bezier(${e}, ${t}, ${r}, ${a})` `` over `+n.toFixed(3)`, verified in `dist/easing.js`. But
the gallery goes **blank of selection** and the head labels a first-class value.js preset `custom`.
Witness: `evidence/C1-quart-no-tile-pressed.png`. Two halves of one widget, six curves apart, wired
to the same library — while the module docstring (`:15-17`) promises *"never a second mint"*.

**Cure.** `FAMILY_ORDER` must be a hint, never a gate:
`[...new Set([...FAMILY_HINT, ...byFamily.keys()])]` — an unlisted family appends instead of
vanishing. `src/easing.ts:34-63` already authors `PRESETS` in family order, so `byFamily.keys()`
alone would do. Enforced by C-12's exact-equality gate, not by prose.

---

## C-03 · MAJOR — re-verified: `glass-chip.css` is shipped and imported by nothing

```
$ grep -rn "glass-chip.css" node_modules/@mkbabb/glass-ui/dist/
(no output)

$ ls node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css
…/dist/styles/glass/glass-chip.css                        ← exists

$ tr ';' '\n' < node_modules/@mkbabb/glass-ui/dist/styles/glass.css | grep "@import"
material · ladder · ladder-undershadow · grain-overlay · accent-tone · rim · surfaces ·
surfaces-pager · control-surfaces · glass-capsule · liquid-fill · surface-axis ·
material-roles · reveal · liquid-enter · deep · defined · squircle      ← 18 siblings, not this one

$ grep -c "glass-chip" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
```

`demo/styles/foundation.css:56-57` imports **both** producer entry points
(`@mkbabb/glass-ui/styles` and `@mkbabb/glass-ui/styles.css`); neither reaches the file. This is the
D58 / INBOX I-9 born-RED glass row — our mark **M3** — located to the byte.

What our surface loses, read off the orphan and measured live:

| orphaned rule | intent | measured at `f36f780c` |
|---|---|---|
| `.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card) }` | cell chips take the card rung | falls through to `glass-capsule` → `9999px` on 44×44 = **full circles** |
| `[data-mode="selectable"][data-state="on"] { background-color: var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink) }` | the pressed wash + edge | pressed tile measured `border-width: 0px`; surface identical to unpressed |
| `[data-mode="selectable"]::after` + `--chip-flood-t` scale | press flood + punch | absent |
| `@media (pointer: coarse) { min-inline-size / min-block-size: var(--touch-target, 2.75rem) }` | the 44px touch floor | absent on both `safari-mobile-*` matrices |

**This is the causal root of the "too rounded" half of MT-F030 / OM-4.** The design system's own
answer for `shape="cell"` is `--radius-card`; the circles are manufactured by a missing `@import`.

**Disposition — FOLD-BANK ON GLASS. NO LOCAL PATCH.** A scoped `.specimen-tile { border-radius: … }`
would be exactly the masking fallback MT-F014 forbids, would double-book a fix glass must ship, and
would still leave the wash, the flood and the coarse-pointer floor missing. So would
`@import ".../dist/styles/glass/glass-chip.css"` from `demo/styles/` — a consumer reaching into a
producer's private tree. The relay is one line in the producer: *`glass.css` must import
`./glass/glass-chip.css`.*

**Ours in this row**: `EasingSpecimenStrip.vue:160-162` asserts the producer recipe *"carries
press/hover semantics + the pressed wash"*. That is false in the shipped build. Documentation drift
is a finding; correct the comment when glass lands.

---

## C-02 · MAJOR — MT-F030 re-measured at `f36f780c`

Computed `border-radius` over the whole easing card subtree, disclosed and undisclosed
(`probe2`, `probe4`):

| element | source | **computed** | box |
|---|---|---|---|
| interval row card | `GradientEasingEditor.vue:114` `rounded-card` | **16px** | 462 × 196 |
| live ramp strip | `:153` `rounded-md` | **6px** | 436 × 20 |
| **specimen strip port** | `EasingSpecimenStrip.vue:84` `class="specimen-strip"` | **0px** | 436 × 71 |
| specimen tile ×27 | producer `shape="cell"` + C-03 | **9999px** (circle) | 44 × 44 |
| endpoint dots | `:243` literal `9999px` | 9999px | 10 × 10 (legitimately round) |
| readout rail | `:176` `rounded-md` | **6px** | 436 × 32 |
| rail buttons ×2 | `:272` `var(--radius-input)` | **4px** | 24 × 24 |
| authoring card (disclosed) | producer `rounded-card` | **16px** nested inside 16px | 436 × 226 |
| preset combobox (disclosed) | producer capsule | **9999px** full-width pill | 436 × 40 |

**0 / 4 / 6 / 16 / 9999** — five registers, six if the nested 16-inside-16 counts. The owner counted
four; the instrument says five. Pass 2's producer mechanism — `components.css` re-emitting Tailwind's
stock `--radius: 0.25rem` in the **`components`** layer, outranking glass's own `@theme` `0.625rem` —
explains why `--radius-input` paints 4px instead of 10px, and I found nothing at this HEAD to
contradict it.

**The one row I would add to pass 2's "ours" list**: the **0px strip port**. A 436×71 square-cornered
band between a 6px ramp and a 6px rail inside a 16px card is the *"not rounded enough"* half of the
owner's sentence, and it is ours alone — see C-13, which is its mechanism.

---

## C-05 · MAJOR — re-verified: the zero-letterbox law matches nothing

```
$ node scratchpad/probe4.mjs
"svgImgCount": 0,
"svgAll": [ { "role": "group", "vb": "0 -0.1 1 1.2000000000000002",
              "cs": { "ar": "1 / 1", "bs": "200px", "is": "410px", "mi": "0px" } }, … ],
"vbRatio": "1.2",
"gridCols": "436px",
"cardCs": { "bg": "oklab(0.913299 …)", "bs": "none", "bf": "none", "r": "16px" }
```

`EasingAuthoringStage.vue:48` queries `svg[role='img']` and `:104` styles `:deep(svg[role="img"])`.
The producer's canvas is `role="group"`. Therefore `syncVbRatio()` returns early on every call —
`--vb-ratio` measured **stuck at the `1.2` literal default** (`:45`) — and `onMounted` (`:62`), the
`watch` (`:63-67`) and **both** `requestAnimationFrame` calls (`:58`, `:65`) are dead code. All five
declarations in the `:deep` block are inert: `inline-size: min(100%, 19rem)` (=304px) measured
**410px**; `block-size: auto !important` measured **200px** (the producer's `clamp(200px, 38cqi,
320px)` survives); `aspect-ratio: calc(1 / var(--vb-ratio)) !important` measured **`1 / 1`**;
`margin-inline: 0 !important`; and the T-48 `transition: aspect-ratio`.

**O-17 is not cured; it is live.** A 1 × 1.2 viewBox in a 410 × 200 box under `xMidYMid meet` draws
at ~166 × 200 — **~122px of dead well on each side**. Witness, captured this pass:
`evidence/C9-authoring-letterbox.png`.

Laws 1 and 2 *do* hold (`gridTemplateColumns: "436px"`; `box-shadow: none`, `backdrop-filter: none`),
which is what makes law 3's silence dangerous: the file reads as if all three are in force. Cure: do
not key a cross-package contract to an ARIA role — ask glass for `data-easing-canvas` on the svg (the
root already carries `data-testid="easing-picker"`), and make sizing a producer prop rather than five
`!important` overrides. Until then, delete the inert apparatus rather than ship it.

---

## C-17 · MINOR · **NEW** — hovering the pressed tile destroys half its selection ink

Not in pass 1 or pass 2 (`grep -n "hover" challenge-C-implementation.pass-2-*.md` → no matches).

`EasingSpecimenStrip.vue:208` and `:212` tie on specificity — after scope-attribute injection both
are `(0,4,0)`:

```css
.specimen-tile[data-state="on"] .tile-label { color: var(--motion-accent, …); font-weight: 600; }   /* :208 */
.specimen-tile:hover .tile-label            { color: var(--foreground); }                            /* :212 */
```

Source order decides, and `:212` is later. Measured:

```
$ node scratchpad/probeA.mjs
pressed, no hover  {"state":"on","labelColor":"oklch(0.438102 0.074812 205)","stroke":"oklch(0.438102 0.074812 205)"}
pressed, HOVERED   {"state":"on","labelColor":"rgb(28, 25, 23)",             "stroke":"oklch(0.438102 0.074812 205)"}
pressed, unhovered {"state":"on","labelColor":"oklch(0.438102 0.074812 205)","stroke":"oklch(0.438102 0.074812 205)"}
```

Hover the selected tile and its label leaves the interval accent for `--foreground` while the glyph
stays accent — the selection half-dissolves under the pointer, asymmetrically. This matters more than
it looks: with C-03 in force there is **no pressed wash and no pressed edge**, so the accent label is
one of only two selection signals the control has. Hover destroys one of the two.

It also sticks on touch: `:hover` is unqualified, so on the two `safari-mobile-*` matrices the last
tapped tile keeps the hover ink until another element is tapped — the classic sticky-hover, here
landing on the one element whose ink encodes state.

**Mechanism (family).** *Hand-inked state competing with hand-inked interaction at equal
specificity* — the same family as C-10 (the component re-authoring what the producer recipe owns).
Both disappear when C-03 lands and selection is carried by the producer's wash.

**Cure.** `.specimen-tile:not([data-state="on"]):hover .tile-label` — and, when C-03 lands, delete
both hand-inked label rules and let `--accent-ink` carry it. Guard the touch case with
`@media (hover: hover)`, which is the house idiom.

---

## Negative proofs — verified again this pass, independently

| claim | evidence at `f36f780c` |
|---|---|
| **No page-scroll yank** — the O-19 root cause is genuinely cured | `window.scrollY` measured `0` across mount → press `step-end` → collapse → reveal. The port is the only element written (`:72`). |
| **Nearest-edge keep-in-view works** (C-16, second clean pass) | `scrollLeft` 0 → **1046** on selecting `step-end` (`scrollW` 1482, `clientW` 436), position survives collapse/reveal. 3/3 green; pass-1's flake did not reproduce in either pass. |
| **`immediate: true` + `nextTick` is not a null-deref** | Resolves after the mount flush in both the synchronous-first-mount and in-flush-navigation cases; `rowEl` is populated. Verified by reasoning over `flushJobs`/`currentFlushPromise` and by a clean initial state (`pressed:["linear"]`, zero console errors). |
| **No rAF in the strip** — not a PRM-RAF epidemic site | The one animation it owns is PRM-gated: `:74` `behavior: prefersReducedMotion.value ? "auto" : "smooth"`. (The corpus's two rAF calls are in `EasingAuthoringStage` and are dead — C-05.) |
| **No `defineModel`** | The async round-trip stale-read hazard is absent by construction. No `ValueUnit` wrapping, no oklch→HSV roundtrip, no WebGL, no pointer capture, no network, no timers. The only subscription is `useMediaQuery`, disposed by VueUse on unmount — one per instance, which is C-11's multiplier, not a leak. |
| **Nothing here parses** | `parseCssColor` is unreachable from this subtree; `glyphPath` output checked `NaN`-free across all 27 tiles. |
| **Tap targets pass** | Tiles measured **45.2 × 43.8** and **44.0 × 43.8** — above the 24px floor, at the 44px ideal. The strip contributes **0** of the route's 6 `smallTapTargets` and **0** of its 1 `namelessButton`; that one is the dock's `title="Copy CSS"` `dock-icon-button` (measured, `probe2.nameless`). *Caveat*: the 44px is held by the seat's own `min-width: 2.75rem` (`:169`), not by glass's coarse-pointer floor, which C-03 removed. |
| **`verbatimModuleSyntax` clean** | `EasingSpecimenStrip.vue:11-16`, `easingCatalogue.ts:22-36` — every type-only import is `import type`. |
| **Idiomatic Vue 3.5** | Reactive props destructure (`:18`), `useTemplateRef` (`:48`). |
| **Mint byte-identity holds** | `bezierLiteral`/`stepsLiteral` (`:48-56`) match `dist/easing.js` exactly; the readout after a tile press equals the readout after a picker press. C-06 is a *coverage* break, not a mint break. |
| **Console + page errors** | **ZERO** on `/#/gradient` in all four Safari matrices — *because the capture never presses a tile*. My own runs show only the unrelated `dev is MISCONFIGURED … no VITE_API_URL` banner (owner mark OM-5). C-01 is invisible to the whole visual matrix. |

**One caveat I will not launder.** C-04 (the in-plate tile carrying the *floating* glass elevation,
`0 8px 24px`) I did **not** re-probe at this HEAD; my resting-tile read captured
`background-color` and `border-width` but not the resting `box-shadow`. Pass 2's measurement stands
unchallenged, not re-confirmed. It is the one row in this ledger whose status is "inherited".

---

## C-12 — the gate, re-stated with the mutation named

`test/gradient-v4-consume.test.ts:56-60` is the entire data coverage:
`expect(SPECIMEN_TILES.length).toBeGreaterThan(20)` against an actual **27** — a 7-tile slack that
already conceals C-06's six dropped presets and all three pane-destroying tiles of C-01.

**Exact mutations that keep it green** (pass 2's three, re-confirmed at this HEAD):

1. delete `"expo"` and `"circ"` from `FAMILY_ORDER` → 21 tiles, `21 > 20` holds, no `NaN`;
2. `glyphPath(fn, samples = 1)` → every portrait collapses to `"M 0.000 1.000 L 1.000 0.000"`;
3. every `payload()` returns the `linear` payload → ids, count and glyphs untouched.

There is no component test at all: no mount, no press, no assertion that `selectedId` maps to
`data-state="on"`, that a press emits, or that pressing a tile does not destroy its host. And the
e2e oracle `o17-easing-composition.spec.ts` is 3/3 RED on a **dead premise** — its
`discloseAuthoring` waits on `#easing-authoring-0 svg[role='img']`, the selector C-05 proves matches
nothing — so its two real clauses never execute, including the press of
`[data-specimen='ease-out-back']` at `:117` and `:189`, the exact pane-destroying tile of C-01.

**Cure.** Re-key O-17 off the dead role, then add two invariants that cannot pass vacuously:

```ts
// total domain — would have caught C-01 at authoring time
for (const tile of SPECIMEN_TILES)
    for (let t = 0; t <= 1; t += 1 / 64)
        expect(() => serializeIntervalRamp(modelWith(tile), 0)).not.toThrow();

// total catalogue — would have caught C-06
expect(new Set(SPECIMEN_TILES.map((t) => t.id)))
    .toEqual(new Set([...Object.keys(bezierPresets), "steps", "step-start", "step-end"]));
```

Exact equality, not a floor. Both fail today.

---

## Mechanism families (for the fold)

| family | findings |
|---|---|
| **Domain contract violated across a module boundary, with a `Result`→`throw` demotion at the seam** | C-01 |
| **A hand-maintained mirror of data the library already orders, used as a gate** | C-06 |
| **A many-to-one identity function feeding a one-way toggle** | C-07 |
| **Cross-package contract keyed to a volatile string (an ARIA role / an unimported sheet), unasserted** | C-03, C-05, C-12 |
| **Producer surface absent → consumer hand-inks what the recipe owns, then collides with itself** | C-03, C-10, **C-17** |
| **Semantics authored on the wrong element** (name on the unfocusable child; state on 27 toggles) | C-08, C-09 |
| **Per-row instantiation of a surface that is per-selection** | C-11, and the `querySelector` scoping it forces at `:39-41` |
| **Named hooks and declarations that bind to nothing** | C-13, C-05's five dead declarations |

---

## Dispositions

| id | owner | disposition |
|---|---|---|
| C-01 | **ours** | total the progress domain **once** at the ramp seam; delete both throw sites. Gated by C-12. **Blocks the wave.** |
| C-02 (c) | **glass (BH)** | FOLD-BANK — the `components`-layer `--radius` collision. No consumer re-declaration (MT-F014). |
| C-02 (d) | ours | one declared radius ladder: card rung, **one** in-card rung for ramp + rail + tile + **strip port**, pill for genuinely round things and ghost icon controls (match the dock). Five registers → three, each named. |
| C-03 | **glass (BJ)** | FOLD-BANK — `glass.css` must `@import "./glass/glass-chip.css"`. No local patch. Correct `:160-162` when it lands. |
| C-04 | ours | in-plate fixtures take the in-plate elevation. *(inherited from pass 2, not re-probed)* |
| C-05 | ours + glass hook ask | stable canvas hook; delete the inert rAF/watch/`--vb-ratio` apparatus. |
| C-06 | ours | `FAMILY_ORDER` becomes a hint, never a filter. |
| C-07 | ours | idempotent selection — emit on press regardless of `on`. |
| C-08 | ours + glass ask | `aria-label` onto `<FadingScroll>` (its `ariaLabel` prop flips `role` to `region`); radiogroup + roving tabindex; drop the inner group. |
| C-09 | ours | per-family `role="group"` + labelled eyebrow; drop `:aria-label="tile.id"`. |
| C-10 | ours | re-judge after C-03; if the override survives it belongs in glass as a size variant. |
| C-11 | ours | **one** hoisted strip bound to the open row — 27 tiles total regardless of stop count. |
| C-12 | ours | re-key O-17; add the two total invariants above. |
| C-13 | ours | style the port through `.specimen-strip` (it is the 0px band of C-02) or delete the class. |
| C-14, C-15 | ours | minor hygiene. |
| **C-17** | ours | `:not([data-state="on"]):hover` + `@media (hover: hover)`; delete both hand-inked label rules once C-03 lands. |

---

## Strongest defect

**C-01, re-confirmed at `f36f780c` and unrepaired across three heads.** Three of the twenty-seven
controls this component paints, labels, and renders bespoke overshoot headroom for will destroy the
entire Gradient workbench on a single click. The library returns a polite `Result`; a demo seam two
files away throws it away; a `computed` in the render path carries the throw to the boundary. It is
invisible to the unit gate (27 > 20), invisible to the visual matrix (the capture never presses), and
the one e2e oracle written to press exactly that tile dies earlier on a dead selector. Every
instrument this repo owns was pointed at it and none of them looked.
