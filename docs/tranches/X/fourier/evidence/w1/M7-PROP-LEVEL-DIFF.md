SERVED MODEL: claude-opus-5[1m]

# M-7 — THE PROP-LEVEL DIFF over every surviving subpath, at `17a11bc5`

**Row**: `waves/F-W1.md` §2 WU-C `M-7` `:78` — *"SCOPE AMENDMENT: re-derive the break surface as a
**prop-level diff over every surviving subpath** (BasisSelector proof: 0 subpath breaks, 6 prop
breaks). **Precedes every per-file budget.** … Riders that ride this diff and nothing else …
`fr-BasisSelector i-4` … and `fr-NotationPills FR-NP-30` limb (c) … **Priced inside this diff or
not priced at all.**"*
**Folded in**: `WU-F FM-2` `:108` — the **token-level break-surface COLUMN** (§4 below).
**Unit**: `c`. **Date**: 2026-09-17. **Pins**: installed **4.0.0** ⟷ adopted **`v8.0.0` @ `17a11bc5`**.

---

## §0 Operand and method

**Subpath survival** is read from the two `package.json` `exports` maps, parsed as JSON (not
grepped), so no indentation anchor can move the count:

| | keys, **including the root `"."`** | keys spelled `"./…"` |
|---|---|---|
| installed 4.0.0 | **80** | **79** |
| `17a11bc5` | **70** | **69** |

**This settles the 69-vs-70 residual unit `a` handed forward** (§Baseline finding 6, *"a one-key
difference … stated, not resolved here"*). WU-G's banked *"80 @ 4.0.0 · 74 @ v7 TAG · 70 @ 8.0.0"*
is the **whole-map** count and reproduces **exactly**. Unit `a`'s probe
(`grep -c '^        "\./'`) anchors on the `./` prefix and therefore excludes the root key `"."`,
which is present in both maps — **69 = 70 − 1 root**. Two units, both true, neither averaged.
**The banked figure stands; nothing moves.**

**Prop surfaces** are read from the producer's own source at each pin — v4.0.0's
`src/components/{ui,custom}/…` and `17a11bc5`'s `src/components/…` — taking `interface *Props`,
`type *Props`, `defineProps<{…}>`, and the sibling `types.ts` declarations. **Asymmetry disclosed**:
the 4.0.0 side could equally have been read from the installed `dist/*.d.ts`; source-to-source was
chosen so both sides are the same kind of object. **Three extractor blind spots were found by
falsification and are corrected below rather than shipped** (§3).

---

## §1 SUBPATH-LEVEL — the half M-7 says is NOT the break surface

Every `@mkbabb/glass-ui*` specifier fourier imports, against the adopted map:

| subpath | import sites / files | at `17a11bc5` | verdict |
|---|---|---|---|
| `./button` | 34 / 34 | present | survives |
| `./slider` | 7 / 7 | present | survives |
| `.` (root) | 7 / 6 | present | survives — `useClipboard` · `Checkbox` · `supportsViewTransitions` all still exported (`src/index.ts:443` · `:127` · `:497`) |
| `./select` · `./dialog` · `./configurator` · `./tabs` · `./dock` · `./tooltip` · `./toast` · `./sidebar` · `./collapsible` · `./badge` · `./switch` · `./infinite-scroll` · `./dark` · `./styles` | 5·5·4·3·3·2·2·2·2·2·1·1·1·1 | present | survive |
| **`./metric-badge`** | **6 / 6** | **ABSENT** | **DEAD** → `./metric` (GAB-2's ruled seat) |
| **`./hover-popover`** | **2 / 2** | **ABSENT** | **DEAD** |
| **`./hover-card`** | **2 / 2** | **ABSENT** | **DEAD** |
| **`./dropdown-menu`** | **2 / 2** | **ABSENT** | **DEAD** → `./menu` (specifier-only; see §2.3) |
| **`./animated-digit`** | **1 / 1** | **ABSENT** | **DEAD** → `./motion` `useAnimatedNumber` (B-4) |
| `./pagination` | **0** (one prose mention, `useOffsetPagination.ts:11`) | ABSENT at **both** pins | AA-11 holds by construction |

**Five dead subpaths, 13 import sites / 13 files.** These are the census's visible half — the half
the import-shaped model *can* see. M-7's thesis is that they are not where the cost is.

---

## §2 PROP-LEVEL — the break surface M-7 asks for

**Operand**: every prop fourier actually passes to a glass-ui component (attribute names
normalised from kebab to camel, `v-`/`@`/`#` directives excluded, comments stripped), checked for
membership in that component's `17a11bc5` prop set. **659 passed-prop occurrences** in total.

### §2.1 Breaks on components whose SUBPATH SURVIVES — the amendment's whole point

| component | prop | occurrences | at `17a11bc5` | compiler-visible? |
|---|---|---|---|---|
| **`Button`** | **`variant`** | **88** | **the prop is GONE** — `ButtonProps` = `emphasis \| tone \| size \| iconOnly \| loading \| type \| disabled \| class` | **NO** — falls to `$attrs`, junk DOM attribute, zero diagnostic (FR-COB-2(a)) |
| **`Button`** | **`size="icon"`** | **35** | `ButtonSize = "xs" \| "sm" \| "md" \| "lg"` — **value gone** | **YES** — TS2322 |
| **`Button`** | **`size="default"`** | **6** | **value gone** | **YES** — TS2322 |
| **`Slider`** | **`variant="standard"`** | **9** | `SliderVariant = "scrubber" \| "spectrum"` — **value renamed** | **NO** (no `strictTemplates`) |
| **`TooltipContent`** | **`collisionPadding`** | **1** | `FloatingPlacementProps` = `side \| sideOffset \| align \| alignOffset` — **prop gone** | **NO** |
| **`GlassDock` member `DockIconButton`** | whole component | **19 callsites / 2 files** (28 passed props) | **COMPONENT DELETED** → `DockControl` | **YES** — unresolved import |
| **`GlassDock` member `DockDropdownTrigger`** | whole component | **1 callsite / 1 file** (1 passed prop) | **COMPONENT DELETED** → `DockTrigger` | **YES** |

**Total break surface on surviving subpaths: 139 attribute occurrences ⊕ 2 deleted components
(20 callsites).**

⟨cmd⟩ (cwd `/Users/mkbabb/Programming/glass-ui`)
`git grep -hn "type ButtonSize" 17a11bc5 -- src` → `export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;` ·
`git grep -hn "type SliderVariant" 17a11bc5 -- src` → `export type SliderVariant = "scrubber" | "spectrum";` ·
`git grep -h -A5 "interface FloatingPlacementProps" 17a11bc5 -- src` → `side? · sideOffset? · align? · alignOffset?` ·
`git ls-tree -r --name-only 17a11bc5 src/components/dock` → `DockControl.vue` · `DockTrigger.vue`, **no `DockIconButton.vue`, no `DockDropdownTrigger.vue`**.

**M-7's thesis is confirmed at the adopted pin and is stronger than its own statement.** The
subpath census sees **13** import sites. The prop diff sees **139 attribute occurrences plus 20
callsites of two deleted members on a subpath that survives**. `./dock` is present in both export
maps and is therefore invisible to every import-shaped probe, yet it is the second-largest single
cost in the wave after `Button.variant`.

### §2.2 The producer's own diagnostic — why §2.1's `size="default"` row is not pedantry

⟨cmd⟩ `git show 17a11bc5:src/components/button/Button.vue | grep -n "retired.push"` →
- `134:  if ("variant" in attrs) retired.push(\`variant="${String(attrs.variant)}"\`);`
- **`136:  if (size === "icon" || size === "default") retired.push(\`size="${size}"\`);`**

The DEV watcher `console.error`s on **`size="default"` as well as `size="icon"`**. §4 step 4's
limb-2 spelling names only `size="icon"`. The six `size="default"` attributes fire the same
`[glass-ui]` error into the same four zero-console-error e2e gates that G6 exists to protect.
**Handed to unit `e` by name.**

### §2.3 Breaks that are SPECIFIER-ONLY (the component survives under a new subpath)

| from | to | consumer cost |
|---|---|---|
| `./dropdown-menu` | `./menu` | **import line only.** `DropdownMenu` · `DropdownMenuTrigger` · `DropdownMenuContent` · `DropdownMenuItem` all export from `src/components/menu/index.ts` at `17a11bc5`, and `DropdownMenuContent`'s `align`/`sideOffset` (2 each, fourier's only passed props) are **real props** — `DropdownMenuContent.vue:14 extends FloatingPlacementProps`, defaults at `:30/:31` |
| `./animated-digit` | `./motion` | `useAnimatedNumber` at `src/composables/motion/number/useAnimatedNumber.ts:68`. **B-4's cure is executable at the adopted pin** — hand-wire, **not a rename** (the row's own words) |

### §2.4 `./metric-badge` → `./metric` — the cure is NOT one-for-one, and the diff prices it

`MetricBadge` (4.0.0) passes 7 distinct props at **48 occurrences**. Against `MetricProps` /
`MetricValueProps` at `17a11bc5`:

| passed prop | occ. | successor at 8.0.0 | note |
|---|---|---|---|
| `value` | 11 | `MetricValueProps.value` | ✓ |
| `size` | 11 | `MetricProps.size` | ✓ — and the value set is **identical**: `MetricBadgeSize = 'sm'\|'md'\|'lg'\|'xl'` ⟷ `MetricSize = "sm"\|"md"\|"lg"\|"xl"`. Fourier passes only `md` (6) and `sm` (5) |
| `class` | 7 | `MetricProps.class` | ✓ |
| `label` | 6 | `MetricProps.label` | ✓ |
| **`labelPosition`** | **6** | **`MetricProps.posture`** | **RENAME with a value superset**: `MetricBadgeLabelPosition = 'inline'\|'stacked'` ⊂ `MetricPosture = "inline"\|"stacked"\|"cell"\|"row"`. Fourier passes only `stacked` ⇒ `posture="stacked"` |
| `unit` | 3 | `MetricValueProps.unit` | ✓ |
| **`color`** | **4** (2 static · 2 bound) | **NONE** | **NO SUCCESSOR.** `MetricProps` has no colour axis. The four sites are `color="var(--tier-saved, #60a5fa)"` · `color="var(--tier-featured, #fbbf24)"` · `:color="eColor"` ×2 |

**The `./metric` migration is 6 clean props ⊕ 1 rename ⊕ 1 unmapped axis at 4 sites.** GAB-2's
"ruled cure seat" names the subpath; it does not supply the colour axis, and a mechanical port
would drop the tier tinting silently. **Priced here, as M-7 requires; routed to unit `e` / F.W3.**

---

## §3 FALSIFICATION — three extractor blind spots, found and corrected before publication

A prop-level diff that over-reports is worse than none, so every `NOT A PROP` hit was re-read at
the producer's bytes. **Four candidate breaks were withdrawn**, and they are recorded here because
a successor seat must be able to see that the negatives were tested:

| candidate | withdrawn because | receipt |
|---|---|---|
| `SegmentedTabs modelValue` (3 sites) | declared by **`defineModel`**, which no `interface Props` scan can see | `SegmentedTabs.vue:145` `const model = defineModel<string>({ required: true });` |
| `GlassDock startCollapsed` (3) · `collapseDelay` (2) | real props, declared in the composable's `DockProps`, not in the SFC | `composables/useDockShellProps.ts:105` `collapseDelay?: number;` · `:110` `startCollapsed?: boolean;` |
| `DropdownMenuContent align` (2) · `sideOffset` (2) · `TooltipContent side` (1) · `sideOffset` (1) | real props inherited through **`extends FloatingPlacementProps`**, which the scan did not follow | `_shared/overlay/placement.ts` · defaults at `DropdownMenuContent.vue:30/:31` and `TooltipContent.vue:25/:26` |
| **`Tooltip text` (33) · `side` (8)** | **not glass-ui's `Tooltip` at all** — these are fourier's own shim `@/components/ui/tooltip/Tooltip.vue`, whose docblock says so; only `App.vue:4` imports from `@mkbabb/glass-ui/tooltip`, and it imports `TooltipProvider` | `components/ui/tooltip/Tooltip.vue:13-17` imports `Tooltip as GlassTooltip, TooltipTrigger, TooltipContent` |

**The last one would have been the largest single false figure in this wave** — 41 phantom breaks
on a component fourier owns. The one survivor of the tooltip family is
`Tooltip.vue:33`'s `:collision-padding="8"`, retained in §2.1, and it confirms **FR-TT-5** at the
adopted pin: the attribute has no prop to land on and falls through as a junk DOM attribute.
(The v7-era mechanism name `RETIRED_FLOATING_ATTRS` is **absent at 8.0.0** — ⟨cmd⟩
`git grep -n "RETIRED_FLOATING_ATTRS" 17a11bc5 -- src` → no output. The effect survives; the
mechanism does not, and quoting the mechanism downstream would be quoting a v7 fact at an 8 pin.)

**Prop removals with ZERO consumer exposure**, measured and recorded so the transaction does not
budget for them: `SelectTrigger.size`/`.variant` (U-2's removal — **fourier passes neither**),
`DialogContent.showClose`/`.spring`/`.scrimAnimation` (fr-ExportModal M-α's three — **fourier
passes none**; its 4 `surface=` and 5 `class=` sites are all live props at 8.0.0),
`Configurator.density` / `ConfiguratorRow.density`. ⟨cmd⟩
`grep -rn "showClose\|spring\|scrimAnimation\|density\|inheritAttrs" web/src | grep -cE "DialogContent|SelectTrigger|Configurator"` → **0**, for each term.

---

## §4 FM-2's TOKEN-LEVEL BREAK-SURFACE COLUMN — folded in, as the row requires

`WU-F FM-2` `:108`: *"Both focus-ring registers deleted at the v7 TAG — six read sites / five files
lose focus indication, invisible to import/type surface. Cure: **a token-level break-surface COLUMN
in the census**."* A prop diff cannot see this class at all: a `var(--x)` read is neither an import
nor a prop.

| token | declared @ installed 4.0.0 | declared @ `17a11bc5` | fourier read sites | verdict |
|---|---|---|---|---|
| **`--ring`** | **3 sheets** — `tokens/color-radius.css:102` · `tokens/dark-arm.css:90` · `tokens/light-dark.css:115`, all three **emitted** in the installed dist | **0** | **5 sites / 4 files** — `style.css:140` · `ImageUpload.vue:200` · `GalleryCard.vue:222` · `GalleryCard.vue:223` · `AppHeader.vue:189` | **BREAKS — silent.** Five `outline`/`border-color`/`box-shadow` declarations resolve to the initial value at the hop; no build error, no type error, no lint |
| **`--focus-ring`** | 1 declaration | **0** | 0 | register retired; no consumer exposure |
| **`--focus-ring-color`** | **0** | **3 declarations** | 0 | the successor register, arriving |
| `--radius-pill` | 1 | **1** (`theme/radius.css:116`, `9999px`) | 0 (see G5 §`.btn-pill`) | survives |
| `--paper-texture-size` | present | **present** (`tokens/offsets.css:106`) | 0 | survives — the TOKEN outlives the CLASS (see G5) |
| `--type-admin-label` | `typography/scale.css:86` | **0** | 0 (consumers use the utility) | retired with its utility |
| `--spring-smooth-settle` | **0 files, whole dist** | **0** | 0 | **B-1's K-1 kill CONFIRMED** — the token named in the dead "250ms short" claim exists at **neither** pin |
| `--spring-present-duration` | **0 files, whole dist** | **13 files** (`tokens/scheme-spring.css:109`) | 0 | the "real clock" is an **8.0.0-only** fact, not a 4.0.0 one |

**Counting-unit note, and a disclosed difference.** FM-2 banks *"six read sites / five files"*. This
seat measures **5 / 4** under the unit *`var(--ring` occurrences in `web/src`*, double-run, and
**the same 5 / 4 at `5842377^`** — so the difference is **not** `G-10` drift and **not** a code
change; it is a unit this seat cannot recover from the bytes. **Published as measured; FM-2 is not
re-graded**, and its cure (six sites → `--focus-ring-color`, one edit, F.W4 rider) is unaffected in
kind — only in cardinality, from 6 to 5.

---

## §5 THE TWO RIDERS — priced inside this diff, per the row's own "or not priced at all"

### §5.1 `fr-BasisSelector i-4` — the single-file proof, RE-PRICED AT THE ADOPTED PIN

i-4 (`fr-BasisSelector.md:95`, INFO): *"all three imported subpaths SURVIVE 7.0.0, yet the file
breaks on six prop values + the lucide specifier — zero subpath breaks, six prop breaks."*

`BasisSelector.vue` at `17a11bc5`, every glass-ui attribute enumerated:

| line | element | attributes | at `17a11bc5` |
|---|---|---|---|
| :120 | `ConfiguratorLayer` | `label` · `sub` · `:default-open` | all live |
| :125 | `Button` | **`variant="ghost"`** · **`size="icon"`** · `class` · `aria-label` | **2 BREAK** |
| :140 | `Button` | **`variant="outline"`** · `size="sm"` · `class` | **1 BREAK** (`sm` survives) |
| :154 / :181 | `ConfiguratorRow` | `label` · `name` / `label` | all live |
| :168 | `Slider` | **`variant="standard"`** · `v-model` · `aria-label` · `class` | **1 BREAK** |
| :195 | `Slider` | **`variant="standard"`** · `v-model` · `aria-label` · `class` | **1 BREAK** |
| :9 | — | `import { RotateCcw } from "lucide-vue-next"` | specifier break (not a prop) |

- **Subpath breaks: 0.** `./slider` · `./button` · `./configurator` are all present at `17a11bc5`.
  **i-4's thesis holds at the ADOPTED pin, not merely at the v7 pin it was priced against.**
- **Prop breaks: 5 attribute occurrences** ⊕ the lucide specifier.
- **Disclosed, not averaged**: the banked *"six"* does not reproduce at either ≥7 pin under the unit
  this seat can measure. At **v7.0.0** the same file measures **3** (`SliderVariant = "standard" |
  "spectrum"` at v7 — the two Slider attributes do **not** break there); at **8.0.0** it measures
  **5**. i-4 is **not re-graded** — it is INFO, its load-bearing claim is the *shape*
  (`0 subpath : n prop`), and that shape is confirmed and sharpened.
- **The file gets WORSE at the adopted pin than at the pin the row was priced against** — 3 → 5 —
  and the whole of that delta is the Slider rename. Which is exactly why the next row fires.

### §5.2 `K-8 / SR-1` — the conditional re-book FIRES, measured

`waves/F-W1.md:145`: *"`SliderVariant` drift: `"standard"|"spectrum"` at v7 TAG; `"scrubber"|"spectrum"` only at 8.0.0. **REBASELINE BANK: at 4→7 the break does not exist — re-book iff G1 adopts 8** (then 9 live sites / 8 files)."*

**G1 adopted 8.** ⟨cmd⟩ per pin:

| pin | `SliderVariant` |
|---|---|
| installed 4.0.0 | cva keys `standard` · `spectrum`; `defaultVariants: variant: "standard", size: "md"` |
| `v7.0.0` | `export type SliderVariant = "standard" \| "spectrum";` |
| **`17a11bc5`** | **`export type SliderVariant = "scrubber" \| "spectrum";`** · `withDefaults(… variant: "scrubber" …)` |

**Live surface: 9 attribute callsites / 7 files** (⊕ **5** prose mentions), double-run:
`ConvergenceTimeline.vue:69` · `HarmonicLevelGrid.vue:17` · `:40` · `MorphPhaseConfig.vue:21` ·
`SliderControl.vue:81` · `BasisSelector.vue:168` · `:195` · `EditorControlsDock.vue:115` ·
`GlassTimeline.vue:65`. Raw unanchored `variant="standard"` reads **14 / 7** = 9 live ⊕ 5 prose.

**Two banked cells disagree on the file count and the bytes settle it**: `MPC-21 / BR-1`'s
*"9 attribute callsites / 7 files (+5 prose)"* is **correct to the digit**; K-8/SR-1's *"9 live
sites / 8 files"* is **off by one file**. Dated correction row, no re-grade.

**And the cure is MPC-21/BR-1's, unchanged and now provably free**: `variant="standard"` **IS the
4.0.0 cva default**, so deleting the attribute is a no-op today and lands on `scrubber` (the 8.0.0
default) tomorrow. **Delete, don't rename** — correct at both pins, and it pre-clears the surface
without a single decision.

### §5.3 `fr-NotationPills FR-NP-30` limb (c) — priced, and **DISCHARGED BY THE HOP**

FR-NP-30 (c): *"fixed `px-3` vs scaled height — rides M-7/i-4 at F.W1."*

`NotationPills.vue:17-21` renders `<Button variant="outline" size="sm" class="notation-pill">`.
The `px-3` is **not in fourier's bytes** — it is the producer's `sm` size arm:

| pin | the `sm` arm | reading |
|---|---|---|
| installed 4.0.0 | `h-(--control-h-sm) rounded-pill px-3` | height rides `--ui-scale`; **padding-inline is a fixed `0.75rem` literal** — the mismatch the row books |
| **`17a11bc5`** | `.button[data-size="sm"] { … padding-inline: var(--space-atom); … }` (`button/styles.css:232-235`) | **padding-inline is a TOKEN** |

**Limb (c) is discharged by the uplift, by the producer, at zero consumer cost.** It requires no
F.W1 edit and no F.W4 rider. Recorded as a **credit row** for the close: one banked defect the hop
retires without being asked. The remainder of FR-NP-30 — limbs (a) and (b) — is untouched here and
stays at its own homes.

---

## §6 Handed forward

1. **→ unit `e`, binding.** The breaking `size=` set is **`icon` (35) ⊕ `default` (6) = 41**, not 35.
   The producer's own DEV watcher (`Button.vue:136`) names both, and G6's four zero-console-error
   specs are the gate that catches the omission.
2. **→ unit `e`, binding.** `./dock`'s two deleted members — **`DockIconButton` 19 callsites /
   2 files**, **`DockDropdownTrigger` 1 / 1** — are invisible to a subpath census (`./dock` is
   present at both pins). Successors `DockControl` / `DockTrigger` (`dock/index.ts` at `17a11bc5`).
3. **→ unit `e` / F.W3.** `MetricBadge.color` at **4 sites** has **no successor** on `MetricProps`.
   `labelPosition` → `posture` is a clean rename at 6 sites.
4. **→ unit `e`.** `TooltipContent`'s `:collision-padding="8"` (`ui/tooltip/Tooltip.vue:33`) has no
   prop at 8.0.0 (FR-TT-5, confirmed at the adopted pin).
5. **→ F.W4.** FM-2's token column: **5 `var(--ring)` sites / 4 files** lose their register
   silently. One edit to `--focus-ring-color`.
6. **→ the close.** `FR-NP-30` limb (c) is a **discharged-by-uplift credit**; `fr-BasisSelector i-4`
   is **confirmed at the adopted pin and re-priced 3 → 5**; `K-8/SR-1`'s conditional **fired**.
