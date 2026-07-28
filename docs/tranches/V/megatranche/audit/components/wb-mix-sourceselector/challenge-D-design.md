# CHALLENGE-D — `demo/workbenches/mix/MixSourceSelector.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. Seat declared, not inherited.

- **Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
- **Subject:** `demo/workbenches/mix/MixSourceSelector.vue` (283 L), mounted once, by
  `demo/workbenches/mix/MixPane.vue:80`, on route `/#/mix`
- **Base:** branch `tranche-u`, HEAD `c654824e`; glass-ui `7.0.0`
  (`node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`)
- **Verdict:** **DEFECTIVE** — **two BLOCKERs**, thirteen MAJOR, ten MINOR, two INFO.
- **Write scope honoured:** only files under
  `docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/` were created or modified.

### Provenance — this is a three-pass consolidated report

| pass | date | method | contribution |
|---|---|---|---|
| 1 | 2026-07-27 | isolated WebKit, 2-palette seeded fixture | D-1 established; proportion / type / boundary body |
| 2 | 2026-07-28 | shared MCP browser, live 5-palette store | D-17…D-23; overturned one pass-1 negative proof |
| **3** | **2026-07-28 (this seat)** | **isolated WebKit, live dev server, populated rack driven through the component's own `addColor`/`removeColor`** | **D-24…D-27; live reproduction of D-11; three corrections; the state matrix filled in** |

**Passes 1–2 are preserved verbatim at `./challenge-D-design.r2-prior.md`.** Nothing is discarded.
This head document carries the complete register (§3), the pass-3 evidence in full (§2), the
corrections (§4) and the merged cure order (§7); the long-form prose for D-1…D-23 lives in the
preserved prior and is cited per row.

Pass-3 artefacts: probe scripts `./evidence/challenge-D-r3/WBMSS-probe{,2,3,4,5,6}.mjs`; frames
`./frames/WBMSS-*.png`.

---

## 0. The finding, in one paragraph

**Colors mode — the mode the route boots into — cannot accept a single colour.** Both add paths are
`WatercolorDot`s carrying `tag="button"`, an API glass-ui 7.0.0 does not have. The producer's
component is `inheritAttrs: false`, reads only `class` and `style` out of `useAttrs()`, renders a
hard-coded `<span aria-hidden="true" style="pointer-events:none">`, and has no slot — so `@click`,
`aria-label`, `:disabled`, `:title` and the `<Plus>` glyph are all silently discarded. Pass 3 adds
the second blocker: **the two e2e specs that gate this exact flow assert an accessible name that
resolves to zero nodes**, so the behavioural gate that should have caught D-1 is itself red. The
tranche canon named this site in advance — `VISUAL-CONSTITUTION.md:91` abrogates the
`tag="button"` interactive host on `WatercolorDot` and lists **Mix** among the consumer sites to
migrate. The producer shipped the abrogation in 7.0.0. This consumer never moved.

---

## 1. What pass 3 was for

Pass 2 closed with four evidence gaps (`r2-prior.md §6`). The largest was gap 4:

> **Every populated-state render** — blocked by D-1. Fix D-1 first; the populated, hover, focus,
> pressed, disabled, overflow, reorder and motion states must then all be re-photographed before
> this component can be called verified.

Pass 3 **unblocked that gap without touching source.** The dev build exposes the Vue app instance
(`#app.__vue_app__`); walking `subTree` reaches the live `MixPane` component and its `setupState`,
which carries `useMixingState`'s own `addColor` / `removeColor` / `clearSelection`. Driving the
shipped code through its own public functions is a read-only probe — no patch, no stub, no mock —
and it renders exactly the DOM a working add-affordance would have produced. Every populated-state
number below is a real render of the shipped component.

That closes the states pass 2 could not reach, and it converts D-11 from an algorithm replay into a
measured DOM observation.

---

## 2. Pass-3 evidence

### 2.1 D-1 confirmed by a fourth independent method — and the corpus-blindness explained

```
$ node evidence/challenge-D-r3/WBMSS-probe.mjs        # WebKit, /#/mix, settled 4.5 s
ghost: {
  tagName: "SPAN",
  attrs: [ 'data-v-292b9032=""', 'data-v-a3e86846=""', 'aria-hidden="true"',
           'class="add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer hover:scale-110
                   active:scale-95 transition-transform focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30
                   disabled:cursor-not-allowed disabled:pointer-events-none watercolor-swatch"',
           'data-testid="watercolor-swatch"', 'data-variant="ghost"',
           'style="border-radius: …; pointer-events: none;
                   --watercolor-color: lab(92% 88.8 20); …"' ],
  pointerEvents: "none", ariaHidden: "true", tabIndex: -1, isFocusable: false,
  svgClasses: ["watercolor-filter-host"]          // ← the <Plus> glyph is absent
}
ADD-SLOT FORCE-CLICK: chips before = 0  after = 0
FOCUSABLES IN SOURCE SELECTOR SUBTREE: ["BUTTON|name=Colors","BUTTON|name=Palettes"]
```

`attrs` is the **complete** attribute list. No `aria-label`, no `disabled`, no `title`, no `tag`,
no `onclick`. Playwright's `force: true` click — which bypasses actionability and
`pointer-events` — changes nothing, because no listener is bound. The entire source selector
contains **two** focusable elements, both of them the mode tabs.

### 2.2 D-24 · **BLOCKER (new)** — the behavioural gate for D-1 is red and its assertion is unsatisfiable

Two shipped specs open on the affordance D-1 destroys:

```ts
// e2e/smoke/views/mix.spec.ts:39–43   and   e2e/smoke/safari/mix-flow.spec.ts:28–34
const addSlot = main.getByRole("button", { name: "Add current color to the mix" });
await expect(addSlot).toBeVisible();
await addSlot.click();
await addSlot.click();
await expect(main.locator("[data-mix-source]")).toHaveCount(2);
```

Against the shipped route, using that exact locator:

```
$ node evidence/challenge-D-r3/WBMSS-probe6.mjs
getByRole('button', {name: "Add current color to the mix"}).count() = 0
any node with that accessible text: 0
total buttons in main: 3
```

And the spec itself:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1 failed
    [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
```

**Two claims, stated separately because they have separate evidence.** (a) The spec is RED — pasted
run. (b) Its add-slot assertion is independently unsatisfiable — DOM probe, count 0. I do **not**
claim (a) proves (b): the observed failure is *earlier*, a Dock `option` instability at
`e2e/smoke/fixtures/dock.ts:78` (`element is not stable`). Either way, the only automated gate
protecting this component's headline interaction is not currently protecting it, and has not been
for the life of the glass-ui 7 adoption.

This is the mechanism behind pass 1's observation that the visual matrix "captured it without
noticing": the *visual* sweep counts `namelessButtons` and cannot see non-buttons
(`REPORT.md:99` — `/#/mix: 1`), and the *behavioural* sweep that names the affordance directly is
failing upstream of the assertion. Two independent gates, both blind, for the same reason: nothing
asserts that a route's primary mode has at least one operable control.

### 2.3 D-11 — the key churn, reproduced live on the real DOM

Pass 2 labelled this *"Reproduction blocked by D-1; the algorithm replay above is exact."*
Pass 3 reproduces it on the shipped component:

```
$ node evidence/challenge-D-r3/WBMSS-probe4.mjs     # 3 operands seeded, then removeColor(0)
before marks = ["m0","m1","m2"]
after        = { count: 5,
                 marks: ["m0","m1","m2","«NEW NODE»","«NEW NODE»"],
                 leaving: 3, entering: 2 }
```

Deleting **one** operand leaves **five** chips in the DOM at once: all three original nodes in
`.vj-enter-leave-active`, plus two brand-new nodes entering. The survivors are not the same
elements — they are `«NEW NODE»`s. `utils.css:177` takes leaving children out of flow
(`.swatch-row > .vj-enter-leave-active { position: absolute }`) and `:174–175` sets
`--vj-enter-scale: 0`, so the two survivors re-inflate from `scale(0)` underneath three
absolutely-positioned corpses.

`frames/WBMSS-remove-churn.png` catches it at +120 ms: the red operand is gone and the blue and
green survivors are visibly **mid-scale** — they are *entering*, not moving. `.vj-enter-move`
(`animations.css:99`) can never fire because no element survives with its key.

`VISUAL-CONSTITUTION.md §6`: *"A scene swap preserves the specimen and changes the surrounding
instrument."* Here the specimen is destroyed and re-created in order to remove a sibling.

The cure remains pass 2's: identity in `useMixingState.addColor`, key on `sc.id`, delete the Map,
the counter and the watcher (`:78–98`, ≈ 20 lines).

### 2.4 The populated rack — states pass 2 could not photograph

Measured live, `n ∈ {1, 3, 12}` (`WBMSS-probe3.mjs`, `WBMSS-probe4.mjs`; frames
`WBMSS-n1-crop.png`, `WBMSS-hover3-crop.png`, `WBMSS-n12.png`):

| n | well (CSS px) | chips | remove button (each) |
|---|---|---|---|
| 0 | 462.0 × 107.9 | 0 | — |
| 1 | 462.0 × 115.1 | 1 | `{w:16, h:16, opacity:"0.3", name:"«NONE»", disabled:true, type:null}` |
| 3 (rest) | 462.0 × 115.1 | 3 | `{w:16, h:16, opacity:"0", name:"«NONE»", disabled:false}` |
| 3 (hovered) | — | — | `{opacity:"1", bg:"rgb(219,36,36)", transition:"all 0.2s"}` |
| 12 | 462.0 × **180.3** | 12 | ×12, all `{16×16, opacity:"0", name:"«NONE»"}` |

Consequences, each new to this pass:

- **Wrap is sound.** At `n = 12` the well grows 107.9 → 180.3 px, two rows of 7 + 6,
  `overflowX 0`, `well.scrollHeight − well.clientHeight = 0`. This is the one populated behaviour
  that works; it is recorded as sound, not as absence of evidence.
- **`n = 1` is a rendered terminal state, not a theoretical one** (D-18 confirmed). The single
  chip carries a **permanently visible** dimmed `×` — `disabled:opacity-30` wins over the
  hover-gated `opacity-0`, so it never hides — with no name, no tooltip, no message. `canMix` is
  false, the add slot is inert, and the only exit is the Dock overflow menu.
  `frames/WBMSS-n1-crop.png`.
- **`n = 12` (MAX) is unenforced and unannounced (D-25, new).** `canAddColor` is false, so
  `:disabled` is bound — and dropped by the producer. The ghost therefore **still renders at slot
  13** (`frames/WBMSS-n12.png`), advertising capacity that does not exist, while the operand counter
  that would have said "12 / 12" was deleted at W5-7 (`:117–118`). The cap is invisible in every
  direction. `PROPORTION-AUDIT.md` PR-08 — *"Pending/failure/export/recovery truth only transient →
  ADD-AFFORDANCE."*
- **The remove control's twelve anonymous tab stops.** `FOCUSABLES IN WELL @n=3:
  ["BUTTON|tabindex=0|name=«NONE»", ×3]`. At twelve operands the AT transcript of the rack is
  twelve consecutive `"button"`s. (Family with D-15; the measurement is new.)
- **The remove badge is anchored to a bounding box, on a randomised silhouette (D-26, new).**
  `-top-1 -right-1` anchors to the wrapper rect; the blob's edge is a per-seed `border-radius`
  (glass-ui `randomRadii`, range `[20,80]`). The badge's distance from the mark is therefore
  **seed-dependent**, i.e. chance. Visible in `frames/WBMSS-hover3-crop.png`.
  And the badge is fixed `bg-destructive` `rgb(219,36,36)` over **arbitrary user colour** — on the
  crimson operand in that same frame it is nearly invisible. In a chromatic laboratory, a control
  whose colour is fixed and whose ground is the user's data has no contrast floor by construction.

### 2.5 D-27 · **MINOR (new)** — the sole affordance in the well fails non-text contrast, at the default colour

The `n = 0` well contains exactly one mark: `.watercolor-ghost-stroke`, a 2 px dashed border whose
colour is `--watercolor-color`, i.e. `cssColorOpaque` — the user's live picker colour.

```
$ node evidence/challenge-D-r3/WBMSS-probe3.mjs
GHOST STROKE vs WELL: { strokeColor: "lab(92 88.800003 20)",
                        wellBg:      "oklab(0.913299 0.005463 0.013024)",
                        ratio:       2.88 }
```

**2.88 : 1**, below the 3 : 1 non-text floor (WCAG 1.4.11), at the application's *default* colour.
And because the stroke colour is user data, the ratio is unbounded below: pick a colour near the
well tone and the only mark in a 462 × 108 px fixture disappears entirely.
`VISUAL-CONSTITUTION.md:82` (§4.1) — *"Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; a token name is not evidence."*

**This narrows pass 2's negative proof.** `r2-prior.md §5` records *"Contrast passes"* with three
text ratios (5.08 / 6.29 / 5.71). Those are correct and stand — they are **text**. No pass measured
the boundary/state contrast of the only non-text mark on the surface. It fails.

Dark-mode corollary (`frames/WBMSS-dark-1440.png`): the same stroke keeps its full-chroma
`lab(92 88.8 20)` while the well darkens, so the pink dashed blob becomes the single
highest-chroma mark in an otherwise desaturated inspector column — and it is `aria-hidden` and
inert. Decoration where an affordance is advertised.

### 2.6 The state matrix, completed

Pass 3 ran the state arms the corpus is missing (`shots/{forced-colors,keyboard-focus,
reduced-motion,rtl,zoom-200}-desktop/` each contain only `adminusers · blob · browse · gradient ·
picker` — **`/mix` is in none of them**). `WBMSS-probe2.mjs`, all against the live route:

| arm | well | ghost | `overflowX` | note |
|---|---|---|---|---|
| desktop 1440 dark | 462.0 × 107.9 | 48 × 48 | 0 | ghost stroke `lab(92 88.8 20)` unchanged in dark |
| mobile 390 light / dark | 324.0 × 100.6 | 44 × 44 | 0 | `frames/WBMSS-mobile-390.png` |
| **320 narrow** | 254.0 × 100.6 | 44 × 44 | **0** | new arm; clean |
| **actual 200 % zoom** (`documentElement.style.zoom = 2`) | 700.0 × 215.9 | 96 × 96 | **0** | new arm; closes pass-2 gap 2's 720 px approximation |
| **reduced-motion** | 462.0 × 107.9 | 48 × 48 | 0 | geometry identical; survival by the app-wide guard (`animations.css:184`), not by design |
| **RTL** (`dir=rtl`) | 462.0 × 107.9 | 48 × 48 | 0 | container mirrors; the badge's `-right-1` is physical (D-14 stands, still unphotographed at chip level) |
| **forced-colors** (`forcedColors:"active"`) | 462.0 × 107.9 | 48 × 48 | 0 | **still unproven** — this WebKit build reported identical computed colours, so the arm renders but does not test |

Pass-2 gap 2 (200 % zoom) is **closed**: actual in-app zoom, not a substituted narrow viewport,
per `VISUAL-CONSTITUTION.md:62`. Gaps 1 (forced colors) and 3 (RTL chip badge) remain open, and
gap 4 (populated states) is closed by §2.3–§2.4.

### 2.7 Two corrections to the standing register

**Correction C-1 — `animate-collapsible-down/up` is not a dead class.** Pass 2's D-7(c) is right
that it is a fourth family name; a CSSOM scan of the live page settles that the utilities and their
keyframes do ship:

```
hits: { "collapsible-down": [".animate-collapsible-down",
                             ".data-\\[state\\=open\\]\\:animate-collapsible-down"],
        "collapsible-up":   [".data-\\[state\\=closed\\]\\:animate-collapsible-up"] }
keyframesWithCollapsible: ["gl-chrome-collapse", "collapsible-down", "collapsible-up"]
totalKeyframes: 71
```

D-7 stands unchanged on grounds (a) wrong curve, (b) per-instance `overflow-hidden` over a producer
recipe, (c) fourth family name against `animations.css:60`, (d) animates `height`. It does **not**
stand on "the class does not exist" — a claim no pass made, and which this correction forecloses.

**Correction C-2 — `.add-slot-ghost` is a scoped twin (D-28, new · MINOR).** CSSOM shows both
copies shipping: `[".add-slot-ghost[data-v-0ce6f2b0]", ".add-slot-ghost[data-v-a3e86846]"]`. Source:

```
demo/workbenches/mix/MixSourceSelector.vue:277           .add-slot-ghost { display:inline-flex; align-items:center; justify-content:center }
demo/palettes/browser/card/CurrentPaletteEditor.vue:286  .add-slot-ghost { … }
```

Its sibling in the very same well, `.dashed-well`, is correctly a **single shared recipe** in
`demo/styles/utils.css:90`. `utils.css:186` states the rule against exactly this — *"never a scoped
twin (the S.W7-7 lesson)."* And with `WatercolorDot` slot-less, both copies are inert: they centre a
child that no longer renders.

---

## 3. The consolidated register

Long-form prose for D-1…D-23 is in `./challenge-D-design.r2-prior.md` at the cited section.

| id | sev | defect | pass | detail |
|---|---|---|---|---|
| **D-1** | **BLOCKER** | Every interactive `WatercolorDot` is inert; colors mode cannot accept a colour. `tag`/slot/attrs/listeners all dropped by glass-ui 7 (`inheritAttrs:false`, hard `<span aria-hidden pointer-events:none>`) | 1·2·**3** | prior §3 D-1; **§2.1** |
| **D-24** | **BLOCKER** | The two e2e gates for that flow (`views/mix.spec.ts:39–43`, `safari/mix-flow.spec.ts:28–34`) assert an accessible name resolving to **0** nodes; the spec is RED | **3** | **§2.2** |
| D-2 | MAJOR | The file's own register law (`:134–145`) is enforced on the chips and violated by the cards (`:256–261` re-mints `ring-2 ring-primary`; `:260` re-mints post-hoc alpha as `opacity-75`) | 1 | prior §3 D-2 |
| D-3 | MAJOR | The colors-mode empty state was never designed — a 462 × 108 well at ~4.6 % ink where the sibling mode ships a full `EmptyState` | 1·**3** | prior §3 D-3; §2.6 |
| D-4 | MAJOR | One palette entity, two presentations; the colours encoded twice inside the hand-rolled tile | 1 | prior §3 D-4 |
| D-5 | MAJOR | `<button>` wrapping `PaletteCard` — interactive content inside a button, inverting `PROPORTION-AUDIT.md §5.12` verbatim | 1 | prior §3 D-5 |
| D-6 | MAJOR | Selection and focus share one cascade channel; ring offset paints `--background`, not the plate | 1 | prior §3 D-6 |
| D-7 | MAJOR | The disclosure overrides its producer recipe with a fourth animation family that animates `height` | 2 | prior §3 D-7; **C-1** |
| D-8 | MAJOR | Two type registers for one job; `Selected` is Fraunces 600 @ 16.4 px beside `.section-label` Fira 400 uppercase @ 14.38 px | 1·**3** | prior §3 D-8; §2.6 |
| D-9 | MINOR | Disclosure trigger is a 29.6 px tap target; glass-ui's own recipe carries `min-block-size: 2.75rem`, unused | 2 | prior §3 D-9 |
| D-10 | MINOR | The trigger announces `"From palettes2"`; two count marks in two families | 2 | prior §3 D-10 |
| **D-11** | MAJOR | Index-composite `TransitionGroup` keys ⇒ removing one operand tears down the whole rack | 1·**3 (live repro)** | prior §3 D-11; **§2.3** |
| D-12 | MINOR | One interval nudged out of the tokenised rhythm (`gap-3` + `pb-1` on one seam) | 1 | prior §3 D-12 |
| D-13 | MINOR | `:css-color="''"` defeats `EMPTY_PALETTE_SWATCH` (`'' ?? X` is `''`) | 1·2 | prior §3 D-13 |
| D-14 | MINOR | Remove badge uses physical `-right-1` in a layout that mirrors | 1·**3** | prior §3 D-14; §2.6 |
| D-15 | MINOR | Remove control is hover-only, nameless, 16 × 16; the only full-clear lives in the Dock overflow menu | 1·2·**3** | prior §3 D-15; **§2.4** |
| D-16 | INFO | Import discipline inconsistent — `demo/ui/collapsible` (a one-line re-export barrel) beside two direct glass-ui subpath imports | 1 | prior §3 D-16 |
| D-17 | MAJOR | The disclosure is unbounded and evicts `COLOR SPACE` / `HUE METHOD` / `Mix` below the fold at real library size | 2 | prior §3.1 D-17 |
| D-18 | MAJOR | Operand floor authored twice with two values (`MIN_COLORS=1` vs `canMix ≥ 2`); `n=1` is terminal | 2·**3 (rendered)** | prior §3.1 D-18; **§2.4** |
| D-19 | MAJOR | The "ordered N-operand rack" has no reorder affordance, against `VC:202` and `VC:131` which name operands explicitly | 2 | prior §3.1 D-19 |
| D-20 | MAJOR | Mode control has no accessible name (`ariaLabel` unused) and takes toggle semantics while owning a panel | 2·**3** | prior §3.1 D-20; §3.1 below |
| D-21 | MINOR | Five dead utility classes on the add slot (`disabled:*`, `focus-visible:*` on a `<span>`) — the cascade-dead sin the file documents excising | 2·**3** | prior §3.1 D-21; §2.1 |
| D-22 | MINOR | Three compositions in one file | 2 | prior §3.1 D-22 |
| D-23 | MINOR | Dead defensive `string[]` branch against a `(value: string) => any` emit | 2 | prior §4 D-23 |
| **D-25** | MAJOR | `MAX_COLORS` is silently unenforced *and* unannounced — the ghost renders at slot 13, the counter was deleted, `:disabled` is dropped | **3** | **§2.4** |
| **D-26** | MAJOR | Remove badge is bounding-box anchored on a per-seed randomised silhouette, in fixed `bg-destructive` over arbitrary user colour | **3** | **§2.4** |
| **D-27** | MINOR | Ghost stroke vs well = **2.88 : 1** at the default colour; the sole affordance's contrast is user data with no floor | **3** | **§2.5** |
| **D-28** | MINOR | `.add-slot-ghost` is a scoped twin in two components; its sibling `.dashed-well` is correctly shared | **3** | **C-2** |
| **D-29** | INFO | `SelectedColor.source` provenance is spent on `:title`, which the producer drops — measured `title: null` on every chip. `VC:202` requires provenance in the Mix control grammar | **3** | §2.4 |
| **D-30** | INFO | `/mix` appears in **zero** of the six state matrices in `audit/visual/shots/`; every state row for this component is probe-derived | **3** | §2.6 |

### 3.1 Pass-3 confirmation of D-20

```
group = { role: "group", ariaLabel: null, ariaLabelledby: null,
          cls: "segmented-tabs segmented-tabs--pill glass-capsule-track" }
tabBtn = { role: null, aria-pressed: "true", aria-selected: null, type: "button" }
```

Independently reproduced. The component's **only working control** announces as an unnamed group of
toggle buttons while it owns a `v-if`/`v-else` panel swap.

---

## 4. Standing-edict check (merged)

| edict | verdict | rows |
|---|---|---|
| 1 · no god modules | **PASS** (with D-22 as a composition note) | — |
| 2 · no legacy code / masking fallbacks | **FAIL** | D-1 (a stale 6.x producer API kept alive by silence), D-13, D-16, D-23 |
| 3 · KISS, no contrivance | **FAIL** | D-4, D-11 (20 lines of key bookkeeping standing in for one `id`), D-23, D-28 |
| 4 · glass-ui is the design system | **FAIL** | D-1, D-4, D-7, D-9, D-17, D-20, D-28 |
| 5 · root-level styling, no per-instance overrides | **FAIL** | D-7, D-28 |
| 6 · animations moved or tokenized, never deleted | **FAIL** | D-7 (fourth family, `height` keyframe), D-11 (a designed motion architecturally prevented) |
| 7 · idiomatic Vue 3.5 | **PASS** | reactive props destructure `:13–23`; `watch` at `:90` genuinely fires (every `useMixingState` mutation replaces the array) |
| 8 · `verbatimModuleSyntax` | **PASS** | `:10, :11` both `import type` |

---

## 5. What is sound — the negative proof, as narrowed by pass 3

- **Wrap and overflow are correct** (pass-3 measurement, previously unverifiable): 107.9 → 180.3 px
  at `n = 12`, two rows of 7 + 6, `overflowX 0`, no internal scroll. This is a genuine design
  success and the only populated behaviour that is right.
- **No horizontal overflow at any arm** — 1440 / 390 / 320 / actual-200 %-zoom / RTL /
  reduced-motion, all `scrollWidth − clientWidth = 0`, matching `REPORT.json`'s four `/#/mix` rows.
- **No console or page errors** on `/#/mix` in any matrix row (`REPORT.md:15–27`); the only console
  line in any pass's probes is the repo-wide `dev misconfigured` banner.
- **Reduced motion is honoured** and geometry is identical — by the app-wide guard
  (`animations.css:184`), not by the component's own design.
- **RTL mirrors at the container level.**
- **Palette identity keys on `slug`** (`:55–67`), correct per K-PALID; `aria-pressed` is present and
  truthful on the palettes-mode seats.
- **The palettes-mode empty state is genuinely well-designed** — `EmptyState` with eyebrow, message
  and hint, defended by a 22-line comment refusing ghost-card filler. It is the standard the colors
  branch fails to meet (D-3).
- **Text contrast passes** — 5.08 / 6.29 / 5.71 : 1. **Narrowed by pass 3:** *non-text* contrast on
  the surface's only mark does **not** pass (D-27).
- **The tabs component choice is canon** (`VC:89`). **Narrowed by pass 2:** the configuration is not
  (D-20).

---

## 6. Evidence gaps still open after three passes

1. **Forced colors.** `shots/forced-colors-desktop/` has no `/#/mix`, and a WebKit
   `forcedColors: "active"` context rendered the ordinary palette in both pass 2 and pass 3, so it
   cannot settle whether the box-shadow selection ring (D-6) or the inline-styled ghost stroke
   (D-27) survive a real high-contrast render. **Unproven, not clean.**
2. **RTL at chip level.** `shots/rtl-desktop/` has no `/#/mix`; D-14's mirrored badge is
   source-derived. Pass 3 could have driven it through the injected rack; it did not, and says so.
3. **Palettes-mode and the "From palettes" disclosure could not be re-rendered in pass 3.** The dev
   server logs `value.js dev is MISCONFIGURED … targeting the cross-origin production API`, and
   `pm.savedPalettes` is a read-only computed, so pass 3 could not seed the library. D-4/D-5/D-6/
   D-7/D-9/D-10/D-13/D-17 rest on pass-2 live measurement and on source; pass 3 neither confirms
   nor disturbs them.
4. **Actual 200 % zoom is now closed** (§2.6) — the one gap three passes did retire.

---

## 7. Cure order — the sequence that collapses the most

1. **One `SwatchSeat` in glass-ui** — a named `<button>` seat wrapping a `WatercolorDot` face plus
   its glyph, owning accessible name, `disabled`, focus and press. This is the enclosing seat
   `VISUAL-CONSTITUTION.md:91` already specifies for Gradient stops and Generate specimens; it is a
   producer composition, not a demo wrapper (edict 4). **Discharges D-1, D-21, D-25, D-26 (the seat
   carries the remove control at a real target size, on the seat rect rather than the silhouette),
   D-27 (the affordance stops being a user-coloured hairline), D-28 (both twins delete), and the
   naming half of D-15.**
2. **Operand identity in `useMixingState`** — `{ id, css, source }` minted at `addColor`, plus
   `canAdd` / `canRemove` beside the existing `canMix`. **Discharges D-11, D-18, D-29**, and supplies
   **D-19**'s key.
3. **Restore the gate before the fix, not after.** D-24 is the reason D-1 survived a major-version
   adoption. The gate that belongs here is not "the add button is visible" but "every route's
   default mode exposes at least one operable, named control" — a census the visual matrix can run
   and the current `namelessButtons` sweep structurally cannot. **Discharges D-24, and D-30 as a
   by-product.**
4. **The rack collapses at zero** — invitation, not fixture; the palettes-mode `EmptyState`
   register. **Discharges D-3** and the §1.1 proportion body.
5. **A `compact` register on `PaletteCard`; the mix tile stops wrapping** — the pressed seat moves
   inside, spanning specimen/identity, per §5.12. **Discharges D-4, D-5, D-6, D-13, D-22.**
6. **Delete the disclosure's per-instance overrides; bound it.** Consume `.disclosure-content` and
   the producer `data-state` chevron; add `max-block-size` + `overflow-y: auto`.
   **Discharges D-7, D-9, D-17.**
7. **Re-read the type marks from §4; name the mode strip.** `.section-label` for `Selected`,
   `--type-subheading` for palette identity, Fira for both counts; `ariaLabel` + `semantics="tabs"` +
   `controls` on `SegmentedTabs`. **Discharges D-8, D-10, D-20.**
8. **Logical properties; drop the dead union guard; drop the barrel.**
   **Discharges D-14, D-16, D-23.**

`PROPORTION-AUDIT.md:71` (§5.6) states the ordering this cure follows: **"Subtraction precedes
explanation."** Steps 1, 2, 4, 6 and 8 are all net deletions.

---

## 8. Reproduction

Dev server live at `http://localhost:9000`. Passes 1–2 are documented in
`./challenge-D-design.r2-prior.md §8`. Pass 3:

| script | proves |
|---|---|
| `evidence/challenge-D-r3/WBMSS-probe.mjs` | D-1 (attrs / pointer-events / tabIndex / force-click / focusables), D-8 (computed type), D-21 |
| `evidence/challenge-D-r3/WBMSS-probe2.mjs` | §2.6 state matrix — dark, 390, 320, actual-200 %-zoom, RTL, reduced-motion, forced-colors |
| `evidence/challenge-D-r3/WBMSS-probe3.mjs` | populated rack `n = 1/3/12`, remove-button geometry + names, D-27 contrast, D-25 |
| `evidence/challenge-D-r3/WBMSS-probe4.mjs` | **D-11 live churn**, CSSOM scan (C-1, C-2) |
| `evidence/challenge-D-r3/WBMSS-probe5.mjs` | D-20 group semantics, layout rhythm, `162.9 / 684.7 = 23.8 %` share |
| `evidence/challenge-D-r3/WBMSS-probe6.mjs` | **D-24** — the e2e locator resolves to 0 |
| `npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke` | **D-24** — 1 failed |

**Method note.** Populated states were reached by calling the live component's own `addColor` /
`removeColor` / `clearSelection` through the Vue app instance (`#app.__vue_app__`, walking
`subTree` to `MixPane.setupState`). That is a read-only drive of shipped code — no source
modification, no stub, no mock. No file outside this directory was written.

Frames: `./frames/WBMSS-desktop-1440.png`, `WBMSS-dark-1440.png`, `WBMSS-mobile-390.png`,
`WBMSS-n1-crop.png`, `WBMSS-hover3-crop.png`, `WBMSS-n12.png`, `WBMSS-remove-churn.png`.
