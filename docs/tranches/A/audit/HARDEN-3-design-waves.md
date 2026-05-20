# HARDEN-3 — Design waves A.W1 / A.W2 / A.W3

Hardening lane 3, tranche A. Adversarial challenge of the three design waves: W1 (Card surface + real-bug sweep), W2 (style co-location + resilience), W3 (design tokens + hierarchy). Evidence drawn from `research/Ab`, `research/Ac`, `research/Ad`, the wave specs, and a direct re-skim of `demo/@/styles/*.css`, the glass-ui `Card` source, and the 11 Card-consumer SFCs.

The headline result: A.md §8 declares "every `research/Aa..Ae` finding is assigned to a wave or to `coordination/Q.md`." That declaration is false. Eleven findings have no wave home and no coordination destination, which makes invariant A5 (zero deferral) un-satisfiable as the plan currently stands. The wave-boundary split is otherwise sound, but W1 and W3 fight over the Card shadow, the W1 tier choice is wrong for one of the 11 sites, and three of the four hard gates close green on grep alone where the audit's own invariant A3 demands a runtime check.

---

## §1 — Finding assignment

The wave specs cite findings by ID in lane headers. W4 uses range notation (`Ad-1..Ad-6`, `Ad-7..Ad-12`, `Ad-16..Ad-19`), so the Ad findings inside those ranges are covered even though a literal ID grep misses them. W2 and W3 cite individual IDs only, with no range notation, so a finding absent from a lane header is genuinely unassigned.

Count correction first. The task brief states Ac has 14 findings; the document has 13 (Ac-1 through Ac-13). There is no Ac-14. Ab has 19 (Ab-1..Ab-19, confirmed). Ad has 20 (Ad-1..Ad-20, confirmed). The brief's Ac count is off by one; treat the Ac population as 13.

### Assignment table

| Finding | Audit priority | Assigned to | Verdict |
|---|---|---|---|
| Ab-1 (glass surface ladder unused) | P1 | W2 Lane B header + Q.md | Covered (Ab-1 is named in W2 Lane B? — see note) |
| Ab-2 (PaletteDialog hand-rolled shadow) | P1 | — | **UNASSIGNED** — overlaps Ac-7; see §1.1 |
| Ab-3 (inline-style hex gradient stops) | P1 | — | **UNASSIGNED** |
| Ab-4 (gold hardcoded as rgb triples ×5) | P1 | — | **UNASSIGNED** |
| Ab-5 (per-instance input utility soup) | P1 | — | **UNASSIGNED** |
| Ab-6 (`transition-[…]` arbitrary props) | P1 | — | **UNASSIGNED** |
| Ab-7 (arbitrary menu widths ×8) | P1 | — | **UNASSIGNED** |
| Ab-8 (six unscoped `<style>` blocks) | P0 | W2 Lane B | Covered |
| Ab-9 (`style.css` component recipes) | P1 | W2 Lane B | Covered |
| Ab-10 (`underline-tabs` reka override) | P1 | W2 Lane B + Q.md | Covered |
| Ab-11 (`-webkit-box` line-clamp) | P2 | W2 Lane C | Covered |
| Ab-12 (dead `-webkit-` prefixes) | P2 | W2 Lane C | Covered |
| Ab-13 (`ExtractControls` native slider) | P1 | W2 Lane C | Covered |
| Ab-14 (dock `calc()` fold-back) | P0 | W2 Lane A | Covered |
| Ab-15 (`z-index` magic integers) | P0 | W2 Lane A | Covered |
| Ab-16 (`PointerDebugOverlay` raw colors) | P2 | — | **UNASSIGNED** (audit says "acceptable to defer", but A5 still needs a destination) |
| Ab-17 (`--radius-lg, 1rem` wrong fallback) | P2 | — | **UNASSIGNED** |
| Ab-18 (`max-h-[calc(100dvh-160px)]`) | P1 | — | **UNASSIGNED** |
| Ab-19 (`SpectrumCanvas` raw rgba shadow) | P2 | — | **UNASSIGNED** (overlaps Ac-7) |
| Ac-1 (raw Tailwind type scale ×91) | P2 | W3 Lane B | Covered |
| Ac-2 (`font-mono-code` undefined ×14) | P1 | W1 Lane B | Covered |
| Ac-3 (`text-2xs` undefined ×9) | P1 | W1 Lane B | Covered |
| Ac-4 (`text-pane-description` undefined) | P1 | W1 Lane B | Covered |
| Ac-5 (`--shadow-card` cartoon override) | P2 | W3 Lane A | Covered — but W1/W3 collide; see §3 |
| Ac-6 (`--glass-opacity-subtle` dead override) | P1 | — | **UNASSIGNED** |
| Ac-7 (three parallel shadow languages) | P2 | W3 Lane A | Covered |
| Ac-8 (radius four ways) | P2 | W1 Lane B (`ColorInput` bug) + W3 Lane A (rest) | Covered, split correctly |
| Ac-9 (`ColorNutritionLabel` flat hierarchy) | P3 | W3 Lane B | Covered |
| Ac-10 (`font-normal` ×27) | P3 | W3 Lane B | Covered |
| Ac-11 (`@apply` in one component) | P3 | W3 Lane C | Covered |
| Ac-12 (divergent repeated components) | P3 | W3 Lane C | Covered |
| Ac-13 (spreadsheet admin lists) | P3 | W3 Lane D | Covered |
| Ad-1..Ad-20 | mixed | W4 Lanes A/B + Q.md | Covered by W4 range notation |

Note on Ab-1: W2 Lane B's header text names `Ab-8, Ab-9, Ab-10`. Ab-1 (the glass-surface-ladder-unused finding — `EditDrawer` and `CurrentPaletteEditor` rebuild surfaces from private `--glass-bg-*` primitives) is **not** in that header and is **not** in W2's lane body. The literal grep showed `Ab-1` matching `waves/W2.md`, but that match is the substring `Ab-1` inside `Ab-14`/`Ab-15`/`Ab-10` etc. — a false positive. Ab-1 is in fact **UNASSIGNED**.

### §1.1 — The eleven unassigned findings

Confirmed with no wave home and no `coordination/Q.md` destination:

- **Ab-1** — glass surface ladder unused; `EditDrawer`/`CurrentPaletteEditor` rebuild surfaces from `--glass-bg-*`. P1.
- **Ab-2** — `PaletteDialog.vue:611` hand-rolls a shadow that literally reimplements `--shadow-2xl`. P1.
- **Ab-3** — `MiniColorPicker.vue:11` bakes `#000`/`#fff` into a `:style` template literal. P1.
- **Ab-4** — gold hardcoded as `rgb(212,175,55)` / `#D4AF37` / `rgb(255,215,0)` across 5 sites. P1.
- **Ab-5** — `PaletteRenameInput`/`BulkActionToolbar` assemble an input surface from 12 utilities glass-ui already classes. P1.
- **Ab-6** — `ColorPicker.vue:2` pins three `transition-[…]`/`duration-[var()]`/`ease-[var()]` arbitrary properties. P1.
- **Ab-7** — 8+ dropdown/select panels each pick their own `min-w-[…]`. P1.
- **Ab-16** — `PointerDebugOverlay` hardcodes ~20 raw colors. P2, dev-only.
- **Ab-17** — `CurrentPaletteEditor.vue:299` `var(--radius-lg, 1rem)` fallback contradicts the real `0.625rem`. P2.
- **Ab-18** — `VersionHistoryDrawer.vue:12` `max-h-[calc(100dvh-160px)]` magic-pixel subtraction. P1.
- **Ab-19** — `SpectrumCanvas.vue:260` raw `rgba(0,0,0,0.3)` shadow. P2.
- **Ac-6** — `--glass-opacity-subtle: 0.75` (`style.css:42`) overrides a token glass-ui retired in v0.8.0; the panes silently do not get the opacity the adjacent comment promises. P1.

That is eleven Ab findings plus Ac-6 — twelve in total. Of those, six are P1 (Ab-1/3/4/5/6/7, Ab-18, Ac-6). This is not a rounding error in the plan; it is a structural gap. W2's three lane headers (`Ab-14/15`, `Ab-8/9/10`, `Ab-11/12/13`) account for only 8 of Ab's 19 findings. The remaining 11 Ab findings — every Category-1 non-idiomatic-usage finding (Ab-1 through Ab-7) and four Category-4 fragile-rule findings (Ab-16 through Ab-19) — were never written into a lane. The Ab P0 set (Ab-8/14/15) and the Ab P2-cleanup set (Ab-11/12) landed; the entire Ab P1 middle dropped.

A.md §8 ("None within value.js's bounds … every finding is assigned") and the AGENT.md zero-deferral clause are both contradicted by this. Either §8 is wrong or W2's scope is incomplete; the evidence says the latter.

---

## §2 — Wave-boundary correctness

The three-way split — W1 "real bugs", W2 "co-location + resilience", W3 "tokens + hierarchy" — is a sensible decomposition and the stated dependency order (W1 → W2 → W3) is mostly right. Three boundary problems.

### W2 is under-scoped, then will balloon

W2 ships three lanes against 8 findings. The 11 unassigned Ab findings (§1.1) are all W2-shaped — non-idiomatic-usage and fragile-rule items that belong with "style co-location + resilience." When they are folded back in, W2 carries 19 findings across what is currently 3 lanes. AGENT.md sets no explicit lane hard-cap, but W3 (13 findings) runs 4 lanes and W4 runs 4. W2 with 19 findings on 3 lanes is the largest wave in the tranche and exceeds the per-lane density of every sibling. W2 needs a fourth lane (Lane D — non-idiomatic-usage cleanup: Ab-1/2/3/4/5/6/7) and the four fragile-rule findings Ab-16/17/18/19 distributed across Lanes A and C. See §7.

### W1 Lane B and Ac-8 are split, and the split is correct

Ac-8 (radius expressed four ways) appears in both W1 (the `ColorInput.vue:15` input-radius bug) and W3 Lane A (the systemic radius-vocabulary consolidation). This is the right split: the `ColorInput` site is a real bug (an input wearing card radius) and belongs with W1's bug sweep; the broader collapse of `rounded-2xl`/`rounded-[var()]`/raw-rung into semantic aliases is token work and belongs with W3. No correction needed here — it is the model the rest of the plan should follow.

### W3 Lane A depends on a W1 decision it cannot see

W1 migrates the 11 Card sites off `variant="pane"`. W3 Lane A (Ac-5) consolidates `--shadow-card`. These two interact through the Card component: glass-ui `Card` reads `shadow-[var(--shadow-card)]` only when `shadow=true`. If W1 sets `:shadow="false"` on the pane Cards (the glass-ui Q.W2 Lane B recommendation per the task brief), then those 11 cards stop consuming `--shadow-card` entirely, and W3's Ac-5 shadow-card consolidation becomes a no-op for every pane — it would only affect `PaletteCard` and `GradientVisualizer`, the two remaining `--shadow-card` consumers Ac-7 names. That is not a dependency violation, but it is a silent scope shift: W3's hard gate ("one shadow language") is satisfied trivially for panes because W1 already removed them from the shadow system. W3 Lane A's spec should be rewritten to say so. See §3.

No W2 fix depends on a W3 token, and no W3 fix depends on a W2 co-location — that ordering is clean. The one real cross-wave coupling is W1↔W3 on the Card shadow, addressed next.

---

## §3 — Sequencing traps: W1 / W2 / W3 do not collide on the calc chain, but W1 and W3 collide on the Card shadow

### W2 calc-chain refactor does not depend on a W3 token — clean

Ab-14's fix recomputes `--dock-pos` from `--dock-inset` + `--dock-h` + `--dock-gap`, and replaces the `0.75rem` (`style.css:52`) and the `+0.5rem` (`style.css:99`) literals with named tokens. Those new tokens (`--dock-padding-y` or similar) are layout tokens W2 defines itself; they are not glass-ui design tokens and not W3-owned. W3 does shadows, radii, type scale — it never touches the dock layout chain. W2 Lane A and W3 are disjoint. The z-tier adoption in W2 Lane A consumes glass-ui's `--z-*` tokens, which already exist (`tokens.css:150-167`); it does not wait on W3. Verdict: no W2→W3 inversion.

### W1 and W3 fight over the Card shadow — real trap

The cartoon shadow is the through-line. The chain of facts:

1. The demo overrides `--shadow-card` at `style.css:37-38` to an 8px/80%-alpha cartoon recipe (Ac-5). glass-ui's canonical `--shadow-card` is `var(--shadow-md)`, a soft 4px-blur drop (`tokens.css:357`, verified).
2. glass-ui `Card` applies `shadow-[var(--shadow-card)]` when `shadow=true` (verified in `Card.vue`). `shadow` defaults to `true`.
3. The 11 demo sites pass `<Card variant="pane">`. `variant` is not a `Card` prop; it is swallowed as a passthrough attribute. `tier` defaults to `resting`, `shadow` defaults to `true` — so every pane gets the 8px cartoon `--shadow-card`. This is the "hard black drop-shadow" in `A-crash-default-partial-render.png` and is exactly A-key-4.
4. W1 Lane A migrates the 11 sites to real props. W3 Lane A (Ac-5) then decides the single shadow language.

The trap: W1 must choose `shadow` and `tier` per site **before** W3 has decided what `--shadow-card` resolves to. If W1 sets `:shadow="false"` on all 11 (the safe, flat-surface choice the W1 hard gate demands — "render flat-surface, no cartoon shadow"), then W3's Ac-5 decision about `--shadow-card` no longer reaches panes. If W1 leaves `shadow` defaulted-true on any site and W3 later re-points `--shadow-card` at a cartoon token, that site silently re-acquires a cartoon shadow at W3 close — a regression W1's own Playwright re-probe gate would not catch, because W1's probe runs before W3.

This is a genuine ordering hazard, not a phantom. Resolution: W1 must set `:shadow="false"` explicitly on all 11 pane-class Cards (so they are flat regardless of what W3 does to `--shadow-card`), and W3 Lane A's spec must record that the pane Cards are already out of the `--shadow-card` system and Ac-5 therefore only governs `PaletteCard`/`GradientVisualizer`. With that written down, the two waves stop fighting. Without it, W3's "one shadow language" gate is met by accident and a future un-`shadow=false` site would silently break.

A second trap inside Ac-5 itself: the demo overrides `--shadow-card` in **both** `:root` (`style.css:37`) and `.dark` (`style.css:134`). Ac-5's fix ("point `--shadow-card` at a cartoon token") must update both blocks or the dark-mode card shadow desyncs from light mode. W3 Lane A's spec mentions only `style.css:37-38`; it must also name `:134-135`. See §4.

---

## §4 — Coverage gaps in styling / tokens / hierarchy

A direct re-skim of `demo/@/styles/style.css` (243 lines), `animations.css`, `utils.css`, the glass-ui `Card` source, and the pane SFCs surfaced gaps the three waves do not name.

### The `@theme` block is never audited

`style.css:6-15` is a Tailwind v4 `@theme` block defining `--font-display`, `--font-serif`, `--font-mono`, `--color-gold`, `--color-gold-light`, `--color-ppmycota`, `--ppmycota-primary`. Two problems no wave touches. First, `--ppmycota-primary` and `--color-ppmycota` hold the identical value `hsl(248 88% 71%)` — a duplicate token, exactly the drift class Ac-4/Ab-4 catalogue elsewhere. Second, `font-mono-code` (Ac-2, 14 sites) is undefined precisely because no `--font-mono-code` key exists in this `@theme` block; W1 Lane B's fix is to swap the class for `fira-code`, but the `@theme` block is where a real `font-mono-code` utility would be registered if the demo wanted one. W1 Lane B should re-confirm against this exact block (it does, per challenge C4's grep-against-HEAD instruction), but no wave audits the block for the duplicate token. Assign the `--ppmycota` duplicate to W3 Lane A or a new W2 cleanup lane.

### `@layer` ordering is unexamined

`style.css` carries exactly one `@layer base` block (`:234-242`) and imports four sheets at the top (`tailwindcss`, `tw-animate-css`, `@mkbabb/glass-ui/styles`, `./animations.css`). No wave audits whether the demo's bare top-level rules (`.section-subtitle`, `.filter-option`, `.underline-tabs`, `.touch-gate-target`, the dock tokens) sit in the right cascade layer relative to glass-ui's own layers. W2 moves component recipes out of `style.css` but does not state which layer the survivors land in. A bare unlayered rule outranks any `@layer` rule; if glass-ui ships its surface classes inside a layer and the demo's `.touch-gate-active .slider-track` override is unlayered, the demo rule wins by layer precedence, not by intent. W2 Lane B should add a layer-ordering check to its scope.

### `animations.css` keyframes are not audited — and the user explicitly said "animations broken"

The user's intake (`findings.md §1`) names animations as broken. `animations.css` is 17 lines: one `edit-drawer-in` keyframe plus a mobile `@media` redefinition of the same keyframe. No wave audits it. The W0 crash (A-key-2) aborts the App `mounted` hook, which is the actual reason "animations" appeared broken — the dock and panes never finished wiring, so their entrance transitions never ran. That root cause is W0's. But the demo-authored keyframe in `animations.css` and the scoped keyframes in SFCs (the `<style>` blocks W2 Lane B splits) are never checked for whether they reference retired glass-ui animation tokens or duplicate glass-ui's `animations.css` (the comment at `animations.css:2-3` claims the shared keyframes "are provided by `@mkbabb/glass-ui/styles/animations.css`" — that claim is unverified by any wave). The duplicate-keyframe risk is real and parallel to Ac-7's duplicate-shadow finding. Assign an `animations.css` + scoped-keyframe audit to W2 Lane B (it already splits the `<style>` blocks; checking the keyframes inside them is the same pass) or to W3.

### `utils.css` is not imported by `style.css` and no wave knows this

`utils.css` defines `.fraunces` and `.fira-code`. It is imported by `App.vue:163` and `Markdown.vue:28` via `@styles/utils.css`, **not** by `style.css`. The W2 spec names `style.css`, `animations.css`, `utils.css` in A.md §5's ownership table but no W2 lane actually touches `utils.css`. This matters because W1 Lane B's Ac-2 fix replaces `font-mono-code` with `fira-code` — and `.fira-code` is defined in `utils.css`, a sheet loaded only where `App.vue` or `Markdown.vue` import it. If a `font-mono-code` consumer SFC is reachable in a build context that does not transitively import `App.vue`'s side-effect import (unlikely in the single-page demo, but not guaranteed for an isolated component), the `fira-code` class resolves to nothing — the same failure class W1 is fixing. W1 Lane B must verify `.fira-code` is globally available, or move it into `style.css` so it loads with the rest of the global sheet. This is a real W1 hazard the spec does not mention.

### Dark-mode token coverage is partial

The `.dark` block (`style.css:133-141`) overrides `--shadow-card`, `--shadow-card-hover`, `--popover`, `--border`, `--input`, `--shadow`. Ac-5 (W3 Lane A) names only the `:root` `--shadow-card` at `style.css:37`; it does not name the `.dark` override at `:134`. If W3 re-points `--shadow-card` at a cartoon token in `:root` but not in `.dark`, dark mode keeps the 8px literal and light mode gets the token — a desync. Ac-6's dead `--glass-opacity-subtle` is a `:root`-only override; no `.dark` equivalent, which is itself a finding (the panes' "solid-feeling surface" requirement is dark-mode-blind). W3 Lane A must audit `.dark` as a paired surface to `:root` for every token it touches. The W3 spec does not say this.

### `style.css:87` `content-visibility: hidden` on inactive tabs

`.palette-tab-content[data-state="inactive"]` sets `content-visibility: hidden` (`:87`) and the same selector at `:154` sets `height: 0; opacity: 0; position: absolute`. Two rules for the same state, in the same file, 67 lines apart. This is Ac-12-class divergence (same role, two treatments) sitting inside `style.css` itself. No wave names it. W2 Lane B's `style.css` extraction pass should consolidate it.

---

## §5 — Hard-gate validity

Each design wave's gate, tested against invariant A3 ("Do not treat source grep as proof of rendered behavior").

### W1 gate — partially honest

W1 gate items 1 and 2 are pure grep (`grep -rl 'variant="pane"'` → zero; `grep` for the 3 undefined classes → zero). Item 3 is the Playwright re-probe. Item 4 is `vue-tsc` + `npm test`. The grep gates are necessary but not sufficient: `grep` returning zero for `variant="pane"` proves the string is gone, not that the replacement `tier`/`shadow` props render a flat surface. The Playwright item (no black drop-shadow, mono readouts render in Fira Code, descriptions de-emphasized) is the real gate and it is honest — it is a visual check. But item 1 also asserts "glass-ui Q.W2's `Card` warning is silent at boot," which is a runtime assertion folded into a grep-section item; it should be moved into the Playwright item with an explicit console-assertion. Hardened gate in §7.

### W2 gate — dishonest on the unscoped-style and component-recipe items

W2 gate item 1 ("`style.css` contains no plain component selector — manual review + `grep`") and item 2 ("no unscoped `<style>` block contains a non-transition selector") are grep + eyeball. Neither has a runtime check. Splitting an unscoped `<style>` block into scoped + unscoped can silently change which rules apply — a selector that worked because it leaked globally stops matching once scoped. The W2 gate has a Playwright probe (item 3) but it checks **only** the dock vertical position; it does not re-probe the six components whose `<style>` blocks Lane B splits (`WatercolorDot`, `Markdown`, `EditDrawer`, `PaletteDialog`, `PaletteDialogHeader`, `CurrentPaletteEditor`). A split that drops a rule would pass the W2 gate. The gate must add a visual re-probe of those six components. Hardened gate in §7.

W2 gate item 4 (`grep` for `-webkit-box` etc.) is appropriate as a grep gate — a vendor-prefix retire is genuinely a source-text fact.

### W3 gate — "one shadow language" closes green by accident

W3 gate item 1 ("one shadow recipe per role — `grep` shows no `box-shadow:` literal outside a documented one-off") is grep. Item 2 (radius) is grep. Item 3 (type roles) is grep. Item 4 is the Playwright visual-diff re-probe. The grep gates miss the real risk: as established in §3, if W1 set `:shadow="false"` on the panes, then "one shadow language" is true for panes because they have **no** shadow, not because the language was consolidated. The grep gate cannot tell "consolidated" from "removed." W3 gate item 4's visual diff is the honest gate, but it diffs against the W1 baseline — and the W1 baseline already has the panes flat, so the diff shows nothing and the gate passes whether or not Ac-5 actually did anything. W3 gate item 1 must be rewritten to assert positively: every shadow-bearing surface resolves to a named token from one family, verified by enumerating the surfaces, not by grepping for the absence of a literal.

### General

No design-wave gate closes purely on "the string is gone" without a paired Playwright item — that part is sound. The weakness is that the Playwright items are scoped too narrowly (W2 checks only the dock; W3 diffs against a baseline that pre-absorbs the change). Grep is a fine *pre*-condition; it is never the *close* condition. The hardened gates in §7 move every visual claim into the probe.

---

## §6 — The 11 Card sites: `tier="wash"` is right for 10, wrong for 1

The task brief states glass-ui Q.W2 Lane B prescribes migrating `<Card variant="pane">` to `<Card tier="wash" :shadow="false">`. Reading the 11 actual consumers against the glass-ui `Card` tier ladder (documented in `Card.vue`: `wash` ~0.30α scroll-pane host, `quiet` ~0.50α ambient panel, `resting` ~0.65α protagonist plate, `floating` popover-class, `overlay` modal):

The 11 sites are: `AuroraPane`, `GradientPane`, `BrowsePane`, `ExtractPane`, `AdminPane`, `BlobPane`, `GeneratePane`, `MixPane`, `AboutPane`, `PalettesPane` (10 panes) and `ColorPicker.vue` (1).

The 10 panes are all `pane-scroll-fade w-full overflow-y-auto … h-full` scroll containers — the exact "scroll-pane host" the `Card.vue` doc-comment assigns to `wash`. `tier="wash" :shadow="false"` is correct for all 10. The `grain` prop should also be `false` for these: the `Card.vue` comment states grain "conflicts with overflow:auto repaints" and every pane is `overflow-y-auto`. Q.W2 Lane B's prescription names `tier` and `shadow` but the task brief does not mention `grain`; W1 Lane A must add `:grain="false"` to all 10 panes or the paper-grain `::after` overlay fights their scroll repaint. This is a W1 spec omission.

`ColorPicker.vue` is **not** a pane. It is the protagonist color-picker plate — `<Card variant="pane" class="flex flex-col rounded-2xl …">` wrapping `CardHeader` + `CardContent`, the card that "carries a hard black drop-shadow" in the crash screenshot because it is the visual centre of the default render. It is the canonical `resting` surface in the glass-ui ladder, and a protagonist plate normally **wants** a shadow to lift it off the aurora background. Migrating it to `tier="wash" :shadow="false"` alongside the 10 panes would flatten the app's focal element into the background. The correct call for `ColorPicker.vue` is `tier="resting"` with `shadow` decided deliberately — most likely `:shadow="true"` once W3's Ac-5 has settled what `--shadow-card` resolves to, or a soft `--shadow-md` if the demo wants the picker lifted without the cartoon offset.

This is the §3 trap in concrete form. `ColorPicker.vue` is the one site where W1's tier choice cannot be made without knowing W3's shadow decision. W1 Lane A's spec says "choose the correct `tier` per call-site" but treats all 11 as one homogeneous batch ("the 11 `<Card variant="pane">` sites"). They are not homogeneous: 10 are `wash` scroll hosts, 1 is a `resting` protagonist plate. W1 must split the migration: 10 panes → `tier="wash" :shadow="false" :grain="false"` now; `ColorPicker.vue` → `tier="resting"`, with the `shadow` value either fixed at W1 (a soft non-cartoon shadow) or explicitly carried as a W1→W3 coordination note so W3 Lane A's `--shadow-card` decision lands it correctly. Note also `ColorPicker.vue:3` carries a raw `rounded-2xl` — that is an Ac-8 radius-vocabulary site and should become `rounded-[var(--radius-card)]` in the same W1 edit.

---

## §7 — Corrections

### Corrections to W1

1. **Split the migration.** The 11 sites are not homogeneous. The 10 scroll-pane Cards (`AuroraPane`, `GradientPane`, `BrowsePane`, `ExtractPane`, `AdminPane`, `BlobPane`, `GeneratePane`, `MixPane`, `AboutPane`, `PalettesPane`) → `tier="wash" :shadow="false" :grain="false"`. `ColorPicker.vue` → `tier="resting"`; its `shadow` value is a deliberate protagonist-plate decision, not a batch default — fix it to a soft non-cartoon shadow at W1 or carry it as an explicit W1→W3 note.
2. **Add `:grain="false"` to the 10 panes.** The `Card.vue` doc-comment states grain conflicts with `overflow:auto`; all 10 panes are scroll containers. W1's current spec names only `tier`/`shadow`.
3. **Verify `.fira-code` is globally loaded.** Ac-2's fix swaps `font-mono-code`→`fira-code`, but `.fira-code` is defined in `utils.css`, which `style.css` does not import (it is loaded via `App.vue:163` / `Markdown.vue:28` side-effect imports). W1 Lane B must confirm `.fira-code` reaches every `font-mono-code` consumer, or move the rule into `style.css`.
4. **Fix `ColorPicker.vue:3` raw `rounded-2xl`** in the same edit — it is an Ac-8 site.

### Corrections to W2

5. **Add Lane D — non-idiomatic-usage cleanup.** Absorb the unassigned Ab-1/2/3/4/5/6/7. These are the entire Ab Category-1 finding set and have no current home.
6. **Distribute Ab-16/17/18/19** into existing lanes — Ab-17 (wrong radius fallback) and Ab-19 (raw rgba shadow) into Lane C's cleanup; Ab-16 (debug-overlay colors) into Lane C or a recorded P2-defer with a destination; Ab-18 (magic-pixel `max-h`) into Lane A's fragile-rules scope alongside Ab-14.
7. **Audit `animations.css` and the scoped SFC keyframes** as part of Lane B's `<style>`-block work — check the duplicate-keyframe claim at `animations.css:2-3` and whether any keyframe references a retired glass-ui token.
8. **Add an `@layer` ordering check** to Lane B — state which cascade layer the surviving `style.css` rules land in relative to glass-ui's layers.
9. **Consolidate the split `.palette-tab-content[data-state="inactive"]` rules** (`style.css:87` and `:154`) in Lane B's extraction pass.

### Corrections to W3

10. **Assign Ac-6.** The dead `--glass-opacity-subtle` override (`style.css:42`) belongs in W3 Lane A alongside Ac-5 — both are `style.css` `:root` token overrides targeting glass-ui surface tokens. The fix is to override the live rung (`--glass-opacity-resting` or `-floating`) and delete the stale line.
11. **W3 Lane A must audit `.dark` paired with `:root`** for every token it touches. Ac-5 names only `style.css:37-38`; the `.dark` override at `:134-135` must move in lockstep or light/dark desync.
12. **Rewrite the W3 "one shadow language" gate** to assert positively (enumerate every shadow-bearing surface and confirm each resolves to one token family), not negatively (grep for the absence of a `box-shadow:` literal). Record in Lane A's spec that the 10 pane Cards are out of the `--shadow-card` system after W1, so Ac-5 governs only `PaletteCard`/`GradientVisualizer`.
13. **Audit the `@theme` block** — `--ppmycota-primary` and `--color-ppmycota` are a duplicate-value pair (`hsl(248 88% 71%)`). Collapse to one.

### Findings that need reassignment

| Finding | Current state | Reassign to |
|---|---|---|
| Ab-1 | unassigned | W2 Lane D (new) |
| Ab-2 | unassigned | W2 Lane D, or merge with Ac-7 in W3 Lane A |
| Ab-3 | unassigned | W2 Lane D |
| Ab-4 | unassigned | W2 Lane D |
| Ab-5 | unassigned | W2 Lane D |
| Ab-6 | unassigned | W2 Lane D |
| Ab-7 | unassigned | W2 Lane D |
| Ab-16 | unassigned | W2 Lane C, or recorded P2 defer with destination |
| Ab-17 | unassigned | W2 Lane C |
| Ab-18 | unassigned | W2 Lane A |
| Ab-19 | unassigned | W2 Lane C (overlaps Ac-7) |
| Ac-6 | unassigned | W3 Lane A |

### Coverage gaps that need a wave home

- `@theme` duplicate token (`--ppmycota`) → W3 Lane A.
- `@layer` ordering of surviving `style.css` rules → W2 Lane B.
- `animations.css` + scoped-keyframe audit → W2 Lane B.
- `utils.css` `.fira-code` load-path verification → W1 Lane B.
- `.dark` token-pair coverage → W3 Lane A.
- Split `.palette-tab-content` inactive-state rules → W2 Lane B.

### Hardened hard gates

- **W1** — grep gates kept as pre-conditions only. Close condition: Playwright re-probe ×3 viewports asserts (a) no black/cartoon drop-shadow on any of the 10 panes, (b) `ColorPicker.vue` renders with its intended `resting` surface, (c) mono readouts render in Fira Code — visually confirmed, not class-name-confirmed, (d) pane descriptions render de-emphasized, (e) **console carries zero `Card` unknown-prop warnings** (moved here from the grep section). `vue-tsc` + `npm test` green.
- **W2** — grep gates kept as pre-conditions. Close condition: Playwright probe measures the dock vertical position at 1280×800 and a 21:9 viewport within 1px of the W0 baseline, **and** re-probes the six components whose `<style>` blocks Lane B splits (`WatercolorDot`, `Markdown`, `EditDrawer`, `PaletteDialog`, `PaletteDialogHeader`, `CurrentPaletteEditor`) for a visual match against the W1 baseline — a dropped rule must fail the gate. `vue-tsc` + `npm test` green.
- **W3** — the "one shadow language" gate asserts positively: enumerate every shadow-bearing surface in `demo/` and confirm each resolves to one named token family; a surface with no shadow is recorded as deliberate, not counted as "consolidated." Radius and type gates likewise enumerate surfaces by role. Playwright visual-diff ×3 viewports against the W1 baseline, with the shadow/radius/type changes expected and itemized so the diff is read, not waved through. `vue-tsc` + `npm test` green.

---

## §8 — Disposition

The W1/W2/W3 split is sound in concept and the W1→W2→W3 dependency order holds: no W2 fix waits on a W3 token, no W3 fix waits on a W2 co-location. Two real defects. First, twelve findings (Ab-1 through Ab-7, Ab-16 through Ab-19, Ac-6 — six of them P1) have no wave and no coordination destination, which makes A.md §8's "every finding is assigned" claim false and invariant A5 un-satisfiable until W2 gains a fourth lane and W3 Lane A absorbs Ac-6. Second, W1 and W3 collide on the Card shadow: W1 must choose `shadow`/`tier` before W3 decides what `--shadow-card` resolves to, and `ColorPicker.vue` is a `resting` protagonist plate wrongly batched with 10 `wash` scroll-pane Cards. The hard gates lean on grep where invariant A3 demands a runtime check — W2 probes only the dock, W3's "one shadow language" gate closes green whether or not Ac-5 did anything. All corrections are in §7.
