# CHALLENGE-L — library structure · `demo/palettes/browser/search/SearchFilterBar.vue`

## PASS 3 (2026-07-28) — read this header first

Two CHALLENGE-L seats preceded me on this axis. **I overwrote neither.** Both are preserved verbatim:

    challenge-L-library-pass1-c654824e.md   (42 745 B · 12-row ledger · HEAD c654824e · had a browser)
    challenge-L-library-pass2-80fc5c40.md   (31 870 B ·  8-row ledger · HEAD 80fc5c40 · no browser)

This file is the **third pass** (E-1 twice-audit, extended). I re-derived the axis independently
before reading either predecessor, then reconciled. It contains only what survives that
reconciliation:

1. **three findings neither pass has** (§2) — one of them a live-measured a11y hole whose cure is
   already written, and commented, one file away in this repo;
2. **one measurement reconciliation** (§3) that materially changes how pass 2's headline number
   should be read;
3. **one live confirmation** (§4) upgrading a pass-1 static finding to an observed one;
4. **a retraction of my own first measurement** (§5), published so that nobody inherits it.

For the import trace, `demo/ui/`, the dead G-DEMO eslint boundaries, the dead
`colorL/colorA/colorB` client params, the `BROWSE_PAGE_SIZE = 50` pagination consequence, the
`/^#[0-9a-f]{6}$/i` gate, the inert `:checked` Checkbox surface, `variant` not being a `ButtonProps`
key, `searching` being dead state, and the tag-list duplication — **read passes 1 and 2.** I
re-verified all of them at `f36f780c` and have nothing to add or correct.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared, not inherited.

## Substrate

- **HEAD at this pass: `f36f780c`** (`docs(V·mega): STATE — three OM censuses complete, findings at
  MT-F043`) — not the `c654824e` in my work order (pass 1's substrate), nor pass 2's `80fc5c40`.
  The branch has advanced twice under this axis. The subject file is byte-identical across all
  three; every line number cited by all three passes still resolves.
- **I had a browser.** The Playwright MCP profile was held by a concurrent seat
  (`Browser is already in use for …/mcp-chrome-83447af`), so I drove WebKit directly through the
  repo's own `playwright` dependency. Pass 2 had no browser at all; that is precisely the gap this
  pass fills.
- Dev server `:9000` is live but **CORS-blocked against the production API** (`DevMisconfigError`,
  no `VITE_API_URL`) → zero palettes load. Anything requiring populated palette data is labelled
  HYPOTHESIS or deferred to pass 1.

**Verdict: DEFECTIVE.** Confirming both predecessors. One new MAJOR, one new MAJOR, one new MINOR,
one measurement correction, one self-retraction.

---

## §1 · Ledger — pass 3 only

| id | sev | defect | status vs passes 1–2 |
|---|---|---|---|
| LP3-1 | **MAJOR** | **NEW** — the swatch's `focus-ring` never paints: its own `shadow-cartoon-sm` box-shadow beats glass-ui's layered `.focus-ring:focus-visible`. `:focus-visible` matches TRUE and the ring is absent. The repo already cured this exact death for `.search-seated` | neither pass has it |
| LP3-2 | **MAJOR** | **NEW** — `UserSortMenu` is admin **user** sorting living in the palette-browser **search** cluster, and is a second, primitive-incompatible implementation of this component's own sort affordance | neither pass has it |
| LP3-3 | MINOR | **NEW** — the visual-audit matrix cannot see this component: the popover is closed at capture. Opened, it yields two sub-44px targets (28×28, 53×24) that appear in no REPORT.json row | neither pass has it |
| LP3-4 | — | **RECONCILIATION** — the HSV divergence rate is grid-dependent: **12.49%** on 159 201 points vs pass 2's **27.37%** on 14 641. Both correct; the number is not a property of the defect | corrects how LP2-4 reads |
| LP3-5 | — | **LIVE CONFIRMATION** — pass 1's regex-gate finding, observed end-to-end in WebKit: badge asserts "1 active filter" for a search the user did not make | upgrades pass 1's L-5 evidence class |
| LP3-6 | — | **RETRACTION (mine)** — my first probe reported 0 `.focus-ring` and 0 `.scrollbar-thin` rules. Probe bug. Both classes exist | self-correcting |

---

## §2 · New findings

### LP3-1 · MAJOR · NEW · the swatch's focus ring is defeated by the shadow it carries

`SearchFilterBar.vue:74–79` — the mini-picker's trigger swatch:

```html
<!-- W5-a11y: swatch trigger needs accessible name -->
<button
    class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer transition-shadow hover:shadow-cartoon-md shrink-0 focus-ring"
    :style="{ backgroundColor: pickerHex }"
    :aria-label="`Open color picker, current color ${pickerHex}`"
/>
```

Two box-shadow authorities on one element: the Tailwind utility `shadow-cartoon-sm`, and the glass-ui
class `focus-ring`, which resolves to

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css — inside @layer components */
.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }
```

`box-shadow` does not compose across rules — the winner replaces, it does not add. And the winner is
decided by **cascade layer**, not specificity: `dist/styles/index.css:1` declares
`@layer theme, base, components, utilities;`, the focus ring is in `components`, and every Tailwind
utility is in `utilities`. Utilities win unconditionally.

**Measured, live** (WebKit, `/#/browse`, popover opened, swatch focused):

```
first .focus-ring element: {"tag":"BUTTON","cls":"button tap-squish focus-ring glass-wash glass-capsule …"}
RAW CSS TEXT AUDIT: {"sheets":42,"unreadable":0,"bytes":570808,
                     ".focus-ring:focus-visible": 2,   ".scrollbar-thin": 6,
                     "--focus-ring-shadow": "0 0 0 2px color-mix(in srgb, oklch(47.09% 0.188 9.83deg) 30%, transparent),
                                             0 0 8px color-mix(in srgb, oklch(47.09% 0.188 9.83deg) 15%, transparent)"}

swatch el.focus(): {"focusVisible": true,
                    "boxShadow": "oklab(0.28 …/0.32) -2px 2px 0px 0px,
                                  oklab(0.28 …/0.26) -3px 3px 0px 0px,
                                  oklab(0.28 …/0.18) -4px 4px 0px 0px"}
```

Every precondition is satisfied — the rule is loaded, the token resolves to a real two-layer ring,
the element **matches `:focus-visible`** — and the computed `box-shadow` contains **only the three
cartoon-elevation layers**. `outline-style` is `none`. **A keyboard user reaches this control and
receives no indication whatsoever.**

**This repo has already diagnosed and cured this exact death, one file away.**
`demo/styles/utils.css:140–144`:

```css
/* Compose, never replace: the producer's focus ring joins the stamp (the
 * unlayered base box-shadow above would otherwise silently beat the layered
 * `.input-bar:focus-within` ring). */
.search-seated:focus-within {
    box-shadow: var(--shadow-cartoon-sm), var(--focus-ring-shadow);
}
```

And `demo/styles/focus-ring.css:9–15` names it as the U-F25 lesson:
> "The U-F25 defect had TWO deaths: (1) an inline `boxShadow` on the control CLOBBERED Tailwind's
> `focus-visible:ring-2` box-shadow layer … The cascade half of the cure — hoisting the material
> shadow off the inline style so the ring COMPOSES with it — lives in the control's own scoped CSS."

The knowledge is written down twice. The swatch is a control the cure never reached — it writes the
class name and stops, which reads at a glance as compliance.

**Why this is a library-structure defect and not a CSS typo.** The design system publishes a focus
affordance as a class whose only mechanism is `box-shadow`, on a system whose material language
(`shadow-cartoon-*`, `glass-wash`, `glass-capsule`) is *also* `box-shadow`. The two are structurally
incapable of coexisting, and nothing — not the type system, not eslint, not `vue-tsc` — can observe
the collision. Every glass-ui control that carries both is silently ringless.

**Reproduction:** `node scratchpad/SFB-L-focusring2.mjs` (pasted above). One element measured
directly; I do **not** generalise to the whole control fleet — the sole non-focus-visible `.focus-ring`
element I sampled cannot support that claim, and I decline to make it.

**Cure — at the root, not the instance (edict 5).** The composition belongs in the design system, not
in 40 call sites. Relay to the glass-ui BH inbox: `.focus-ring:focus-visible` should emit
`box-shadow: var(--control-shadow, ), var(--focus-ring-shadow)` — a control sets `--control-shadow`
to its material stamp and the ring composes by construction — or move the affordance to `outline`,
which composes with `box-shadow` by definition and which WHCM already prefers
(`a11y-overrides.css` already ships the `@media (forced-colors: active)` outline fallback for exactly
these selectors). Until then the local fix is the one `.search-seated` already models: a scoped
`:focus-visible` rule that names both shadows.

---

### LP3-2 · MAJOR · NEW · wrong home, and a second implementation of this component's own sort affordance

`demo/palettes/browser/search/UserSortMenu.vue` sorts **admin users**. Its consumers:

```
$ grep -rn "UserSortMenu" demo/ | grep -v "search/index.ts"
demo/palettes/browser/index.ts:35:export { SearchFilterBar, UserSortMenu, TagEditPopover } from "./search";
demo/palettes/admin/AdminPane.vue:17:                <UserSortMenu
demo/palettes/admin/AdminPane.vue:86:import { UserSortMenu } from "../browser/search";
```

It lives in the palette-browser *search* cluster, is re-exported through the palette-browser seam,
and is consumed **only** by `demo/palettes/admin/` — which has its own barrel. `admin` reaches into
`browser/search` for a component about neither browsing nor searching. Unique semantic ownership
fails on the first question you can ask it: *what feature does this belong to?*

And it is a **parallel implementation of the affordance the subject builds fifteen lines into its own
template**:

| | `SearchFilterBar` Sort section (`:19–28`) | `UserSortMenu` (`:2–37`) |
|---|---|---|
| trigger | `Button icon-only variant="ghost"` + `EllipsisVertical` (`:5–6`) | `Button icon-only variant="ghost"` + `EllipsisVertical` (`:6–16`) |
| surface | `Popover` / `PopoverContent` | `DropdownMenu` / `DropdownMenuContent` |
| selection | `RadioGroup` + `RadioGroupItem` inside a hand-built `<label class="filter-option">` | `DropdownMenuRadioGroup` + `DropdownMenuRadioItem` |
| row styling | scoped CSS class (`:240–248`) | inline utilities |
| a11y name | `aria-label="Filters"` | `aria-label="Sort users"` |

Two glass-ui primitive families, two row-styling homes, one affordance, same directory. Edict 4 says
reuse existing component-type names; the `DropdownMenuRadioItem` path already ships the
selected/`data-state` register that `SearchFilterBar` re-builds by hand out of `<label>` +
`RadioGroupItem` — which is, per pass 1's L-1, the same surface whose `:checked`/`@update:checked`
sibling is inert under glass-ui 7. **The hand-built path is the one that breaks.**

**Cure.** Move `UserSortMenu.vue` to `demo/palettes/admin/` (its only consumer); drop it from
`search/index.ts` and `browser/index.ts`. Then collapse both onto the `DropdownMenuRadioGroup`
recipe, which is the one that gets selection state from the design system instead of re-deriving it.

**Folder-cohesion consequence, stated once.** `search/` holds four members: `SearchFilterBar`
(browse filters), `MiniColorPicker` (a color picker), `TagEditPopover` (a **mutation** surface —
`tagEdit.saveTags` writes tags to a palette), `UserSortMenu` (admin user sorting). **One of four is
search.** Pass 1's greenfield lattice renames the leaf; I would go further and split it —
`filters/`, `tags/`, and `admin/` — because the directory name is currently doing no work at all.

---

### LP3-3 · MINOR · NEW · the visual-audit matrix cannot see this component

`docs/tranches/V/megatranche/audit/visual/REPORT.json` records **4** small tap targets on `/#/browse`
in each of the four matrices — a 160×23 unlabeled input and three 22×22 slug-bar buttons
("Switch to slug", "Generate new slug", "Cancel"). **None belongs to `SearchFilterBar`.** The row
also reports `"dialog": 0` and `bodyTextLength: 280`: the popover is closed at capture, so everything
this component renders except its 32×32 kebab trigger is outside the audit's reach.

Opened, measured live:

```
POPOVER SMALL TAP TARGETS: [{"w":28,"h":28,"label":"Open color picker, current color #4488cc"},
                            {"w":53,"h":24,"label":"Search"}]
```

28×28 swatch; 53×24 inline Search button — sitting exactly on the 24px floor of WCAG 2.5.8 AA with
zero margin, and well under 2.5.5 AAA's 44px. Screenshot: `evidence-p3-L/SFB-L-popover-open.png`.

The screenshot carries one more thing no JSON row does: the placeholder `"#hex, hsl(...)"`
(`:92`) **truncates on screen to `#hex, …`**. The popover is `w-60` (240px) and the input reserves
`pr-16` (64px) for the inline button; ~110px survives. The single affordance that tells a user
non-hex CSS syntax is accepted is unreadable — and, per pass 1's L-5 and §4 below, would be a lie if
it were readable.

**This is a finding about the audit instrument as much as the component.** Any component whose
surface lives behind a `Popover`, `DropdownMenu`, `Dialog` or `Drawer` is structurally invisible to
the current capture. The `/#/browse` row's clean `smallTapTargets: 4` is a **false negative** for
this component's real surface.

**Cure.** The visual matrix needs an interaction pass per route — open each overlay trigger, re-probe,
re-shoot. Until then, treat every popover-hosted component's a11y row as UNMEASURED, not GREEN.

---

## §3 · Reconciliation — the HSV divergence rate is grid-dependent

Pass 2 (LP2-4) reports the two color engines disagreeing on **27.37%** of a 14 641-point HSV grid.
I measured the same defect independently, before reading it, on a different grid:

```
$ node scratchpad/SFB-L-hsv.mjs      # h ∈ [0,360] step 1 ; s,v ∈ [0,1] step 0.05  →  361×21×21
HSV->hex: 19884 mismatches / 159201 samples          (12.49%)
  h=0 s=0    v=0.3  handRolled=#4d4d4d  library=#4c4c4c
  h=0 s=0    v=0.5  handRolled=#7f7f7f  library=#808080
  h=0 s=0    v=0.7  handRolled=#b3b3b3  library=#b3b2b3
```

**12.49% and 27.37% are both correct.** They differ because the defect is a per-channel
quantization/rounding fork whose hit rate depends entirely on how densely the grid samples `s` and
`v` — pass 2's 121×121 grid samples those two axes ~6× more finely than mine and collapses the hue
axis, concentrating on exactly the region where the fork bites.

**Why this matters for the wave that fixes it.** A born-RED gate written as "assert divergence ==
27.37%" would be measuring the grid, not the code. The invariant a gate should assert is
**zero**: after `MiniColorPicker` is transposed onto `color-session`, the mismatch count is 0 on
*any* grid, and that is falsifiable without agreeing on a sampling policy first. I record 12.49%
solely so a future reader who finds two different numbers in two reports does not conclude one of us
mismeasured.

Independent corroboration of the fork's direction, for the record: HSV(0, 0, 0.5) →
hand-roll `#7f7f7f`, library `#808080`. The mini-picker and the main picker display **different hex
strings for the same coordinate** in the same running app. That is the user-visible face of pass 1's
L-6, and it needs no percentage at all.

---

## §4 · Live confirmation — the wrong-color search, observed

Pass 1 establishes the gate statically (`SearchFilterBar.vue:218`) and tabulates OKLab distances.
Neither pass drove it. I did.

WebKit, `/#/browse`, popover opened, typed `hsl(120, 80%, 40%)` into the field, clicked the inline
Search button:

```
AFTER hsl() SEARCH: {"fieldValue":"hsl(120, 80%, 40%)",
                     "swatchLabel":"Open color picker, current color #4488cc",
                     "swatchBg":"rgb(68, 136, 204)",
                     "badge":"1"}
```

The field still reads green. The swatch is still the default blue. **The filter badge asserts "1
active filter."** The UI reports success for a search the user did not make — the searched color is
`#4488cc`, `0.2957` in OKLab from the requested green, **≈2× the 0.15 match radius**
(`BrowsePane.vue:344`, `api/.../crud-list.ts:167`), i.e. a categorically different result set.

Independent replay of the gate against the real published surface, all nine inputs the placeholder
or CSS Color 4 would lead a user to type:

```
input                    libParses gatePass searchedColor  dist(intended,searched)
hsl(200 50% 50%)         true      false    #4488cc        0.0453
hsl(120, 80%, 40%)       true      false    #4488cc        0.2957   <-- beyond the 0.15 radius
#abc                     true      false    #4488cc        0.1950   <-- beyond
#4488ccff                true      false    #4488cc        0.0000
rebeccapurple            true      false    #4488cc        0.2171   <-- beyond
oklch(0.7 0.15 30)       true      false    #4488cc        0.2718   <-- beyond
color(display-p3 1 0 0)  true      false    #4488cc        0.4028   <-- beyond
  #ff0000                true      true     #ff0000        0.0000
#FF0000                  true      true     #FF0000        0.0000
```

**The library parses 9 of 9. The component accepts 2 of 9. Five of the seven rejections land beyond
the search radius.** The defect is not "unsupported syntax is ignored" — it is "unsupported syntax
silently searches a different color and the UI says it worked."

Evidence class upgraded: pass 1's L-5 is no longer inferred from a code path, it is observed in the
running app. Its severity should be read accordingly.

---

## §5 · Retraction — my own first measurement was wrong

My first CSS probe (`scratchpad/SFB-L-probe.mjs`) walked `document.styleSheets` testing
`rule.selectorText` and reported:

```
CSS AUDIT: {"focusRingRules":0,"scrollbarThinRules":0,"total":5322,"unreadable":0}
```

From which I drafted — and here retract — the claim that `.focus-ring` and `.scrollbar-thin` are
phantom classes that resolve to nothing.

**Both exist.** `node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css` defines
`.focus-ring:focus-visible` and `.scrollbar-thin` (with a `::-webkit-scrollbar` fallback), and the
chain reaches the app: `demo/styles/foundation.css:56` → `@mkbabb/glass-ui/styles` →
`dist/styles/index.css` → `./utilities.css` → `./utilities/base.css`. A raw-text audit of the loaded
CSSOM (`SFB-L-focusring2.mjs`, 42 sheets / 570 808 bytes) finds `.focus-ring:focus-visible` twice and
`.scrollbar-thin` six times. My walker under-counted rules nested in `@layer` blocks; `total: 5322`
was itself the tell, against 570 KB of actual CSS.

I publish this because the retracted claim is exactly the kind that gets folded into a ledger and
acted on — someone would have "cured" a non-defect by adding a duplicate `.focus-ring` rule to
`demo/styles/`, creating a genuine dual path in the process. **The real defect (LP3-1) is worse and
in a different place: the class exists, it matches, and it is overridden.** A probe that answers
"does the rule exist?" was the wrong probe; "what does the element actually compute?" was the right
one, and only the second one finds it.

---

## §6 · Negative proof — what pass 3 independently re-verified as sound

Stated so this pass is a measurement and not only a complaint. Each re-derived before reading the
predecessors.

1. **No demo → `src/` deep imports anywhere.**
   `grep -rn "from \"@src\|value.js/src\|\.\./\.\./\.\./src/" demo --include="*.vue" --include="*.ts"`
   → **0 hits.** The subject reaches value.js only transitively, via
   `color-session/color-utils.ts:1` → `@mkbabb/value.js/color` and `picker-color.ts:27,33` →
   `@mkbabb/value.js/color` + `/css` — both published `package.json#exports` subpaths. Every import
   on this path is one a real consumer could write. The demo is **not** a false proof of the public
   API here.
2. **`palettes → color-session` is a correct downward edge.** Measured inbound edges to
   `color-session/` by consuming area: `workbenches 28 · picker 19 · color-picker 17 · palettes 16 ·
   shell 14 · scenes 14` (108 total, 6 areas). Outbound edges from `color-session/` into
   `palettes|picker|workbenches|shell`: **0**. It is a clean lower layer by measurement, and
   `SearchFilterBar.vue:145` reaches down into it. *(Pass 2's LP2-5 is right that it lacks a barrel;
   the layering itself is sound.)*
3. **Relative-path climbing is not a defect here.** `../../../` is the sanctioned idiom since
   W43 · RF-15 deleted the demo `@…` aliases (`vite.config.ts:64–71`); `@src` survives only for the
   exempt `assets/docs/*.md` source-embed pages.
4. **`verbatimModuleSyntax` holds.** Line 144 is the file's only type-only import and is written
   `import type`. `npx eslint demo/palettes/browser/search/SearchFilterBar.vue` → clean.
5. **Idiomatic Vue 3.5.** Reactive props destructure (`:147`); `useTemplateRef` in the child
   (`MiniColorPicker.vue:82–83`). No `defineModel` stale-read hazard on this surface.
6. **The cluster barrel is correctly shaped** — named re-exports only (PI-6), and `MiniColorPicker`
   is deliberately unexported.
7. **Zero page errors and zero component-attributable console errors** on `/#/browse` across all four
   Safari matrices (`REPORT.json`: `pageErrors: []`, `consoleErrors: []` on every row). The one
   console error I observed live is the environment's `DevMisconfigError`, not this component.

---

## §7 · Where pass 3 lands the axis

Passes 1 and 2 established that four concepts here have two homes each — color filtering, CSS-color
validation, HSV↔sRGB conversion, and the design-system surface — and that the boundary meant to
prevent exactly that (`G-DEMO-3b`) lints zero files. I re-verified all of it and add nothing.

What pass 3 adds is that **the same disease has a fifth instance nobody had looked for, and it is in
the design system's own composition rules**: an affordance published as a `box-shadow` class, on a
system whose material language is `box-shadow`, on an element that carries both. It cannot be caught
by types, by lint, by `vue-tsc`, or by a screenshot — only by asking a focused element what it
actually computes. That the repo has already written the cure twice (`utils.css:140–144`,
`focus-ring.css:9–15`) and still shipped a ringless control is the structural point: **a cure that
lives in a comment is not an invariant.**

Priority order for the wave, folding all three passes:

1. pass 1 **L-1** (inert tags filter — a dead control beats every aesthetic concern),
2. pass 1 **L-5** / §4 here (silently wrong search — wrong answers with a success signal),
3. **LP3-1** (ringless control — keyboard users get nothing, and the cure exists),
4. pass 1 **L-4** / pass 2 **LP2-3** (the filter topology and the library's byte projection),
5. **LP3-2**, pass 1 **L-9**, pass 2 **LP2-7** (re-homing: `UserSortMenu`, `demo/ui/`),
6. the eslint boundaries last — but *before* the re-homing lands, or nothing will hold it.

---

## Appendix — pass 3 probes

| purpose | script | key result |
|---|---|---|
| Gate vs library parser; OKLab distance table (§4) | `scratchpad/probe.mjs` (overwritten by a concurrent seat mid-session; output pasted verbatim in §4) | lib 9/9, gate 2/9, 5 rejections beyond radius |
| HSV↔hex divergence on a 159 201-point grid (§3) | `scratchpad/SFB-L-hsv.mjs` | 19 884 mismatches = **12.49%** |
| First CSS audit — **retracted**, probe bug (§5) | `scratchpad/SFB-L-probe.mjs` | reported 0 rules; also produced the valid tap-target and live-search numbers |
| Raw-CSSOM audit + focused-element computation (§2 LP3-1, §5) | `scratchpad/SFB-L-focusring2.mjs` | rule present ×2; `:focus-visible` TRUE; ring absent from computed `box-shadow` |
| glass-ui dev module fan-out (context for pass 2's LP2-7) | `scratchpad/SFB-L-modules.mjs` | 13 glass-ui requests / 312 total — Vite pre-bundling absorbs the dev cost |
| Screenshots (§2 LP3-3) | `SFB-L-popover-open.png`, `SFB-L-after-hsl.png` | the popover interior — outside the visual-audit matrix |

All six artifacts are preserved in-tree beside this report at
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p3-L/` (the `scratchpad/`
paths in the table are where they ran; the scratchpad is shared with concurrent seats and is not
durable — `probe.mjs` was already overwritten under me, which is why its output is pasted verbatim
in §4 rather than cited by path).

**No source edits were made by this seat.** The only files written are this report and the
preservation copy `challenge-L-library-pass2-80fc5c40.md`.
