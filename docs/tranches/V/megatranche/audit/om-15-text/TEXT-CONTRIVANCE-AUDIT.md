# OM-15 — THE TEXT-CONTRIVANCE CENSUS + THE SHADOW-PALETTE SIZE ANALYSIS

**Seat:** Opus 5 census seat · mega-tranche audit program
**Date:** 2026-07-28
**Mark:** OM-15 — `docs/tranches/V/megatranche/audit/visual/owner-marked/OM-15-text-contrivance-shadow-palette.png`
**Owner edict (verbatim):** *"text items like this are to be totally abrogated--audit for all areas of duplicative, explicit, text contrivance. And that shadow palette is ugly and too large."*
**Method:** source-only. No browser. Every claim carries `file:line`. NO source edits landed by this formation.

**The marked artefact, identified:** `demo/workbenches/extract/ExtractWorkbench.vue:165` —
`· undeveloped plate — feed it an image ·`, rendered through
`demo/workbenches/extract/ExtractWorkbench.vue:163` (`class="text-mono-caption uppercase tracking-[0.18em] plate-ink text-center"`),
seated directly beneath `demo/workbenches/extract/ExtractWorkbench.vue:159` (`<ShadowPalette :count="session.colorCount.value" />`).

---

## §0 — VERDICT IN ONE PARAGRAPH

The marked string is not a one-off. It is the **thirteenth instance of a single reproducing idiom**: the dot-flanked, ALL-CAPS, letter-spaced *eyebrow caption* that sits above an empty-state's plain message. The idiom's breeding ground is structural, not editorial — `demo/shared/ui/EmptyState.vue:90` makes `eyebrow: "· empty plate ·"` a **prop default**, so every one of the component's consumers is born with a contrived caption whether it asked for one or not, and `dots: true` on the same line makes the WatercolorDot ghost trio mandatory alongside it. In **all 11 EmptyState consumer sites the eyebrow is a verbatim restatement of the `message` directly beneath it** (`· nothing flagged ·` over "No flagged palettes."; `· roster clear ·` over "No users found."). That is class 1 and class 2 in the same DOM node, 11 times over, plus the OM-15 site which reproduces the idiom *by hand* outside the component. Separately, 32 `aria-label`/visible-label pairs and 4 tooltip `title`/`description` pairs restate one another, and 16 strings narrate mechanics the affordance already performs.

**Totals: 68 hits — class 1 = 27 · class 2 = 27 · class 3 = 14.** (Nine strings carry two classes; they are counted once under their primary class and cross-referenced.)

---

## §1 — THE CENSUS

Disposition legend: **KILL** = the string dies outright, no replacement · **REDUCE** = collapse to plain minimal copy · **MERGE** = fold into the sibling that already says it · **KEEP** = correct as-is, listed for completeness of the idiom family.

### §1.A — CLASS 1 · PRECIOUS / CONTRIVED VOICE (27)

#### §1.A.1 — The eyebrow idiom (13 sites — the reproducing family)

| # | file:line | exact string | disposition |
|---|---|---|---|
| 1 | `demo/workbenches/extract/ExtractWorkbench.vue:165` | `· undeveloped plate — feed it an image ·` | **KILL** — the OM-15 mark. Also class 2 (§1.B #12) and class 3 (§1.C #13). The plate already sits beside a drop zone that says the same thing; nothing replaces it. |
| 2 | `demo/shared/ui/EmptyState.vue:90` | `{ variant: "empty", eyebrow: "· empty plate ·", dots: true }` | **KILL** — the prop DEFAULT. This is the breeding ground: it is why the idiom is universal. See §2. |
| 3 | `demo/palettes/PalettesPane.vue:78` | `empty-eyebrow="· empty plate ·"` | **KILL** |
| 4 | `demo/palettes/BrowsePane.vue:84` | `empty-eyebrow="· the commons ·"` | **KILL** |
| 5 | `demo/palettes/browser/admin/AdminAuditPanel.vue:56` | `eyebrow="· ledger clear ·"` | **KILL** |
| 6 | `demo/palettes/browser/admin/AdminFlaggedPanel.vue:39` | `eyebrow="· nothing flagged ·"` | **KILL** |
| 7 | `demo/palettes/browser/admin/AdminNamesPanel.vue:42` | `eyebrow="· queue clear ·"` | **KILL** |
| 8 | `demo/palettes/browser/admin/AdminNamesPanel.vue:92` | `eyebrow="· none approved yet ·"` | **KILL** |
| 9 | `demo/palettes/browser/admin/AdminTagsPanel.vue:82` | `eyebrow="· no tags minted ·"` | **KILL** — "minted" for "created" is the purest specimen of the class. |
| 10 | `demo/palettes/browser/admin/AdminUsersPanel.vue:63` | `eyebrow="· roster clear ·"` | **KILL** |
| 11 | `demo/palettes/browser/admin/AdminUsersPanel.vue:138` | `eyebrow="· none pinned ·"` | **KILL** — and *wrong*: nothing on this surface pins. |
| 12 | `demo/workbenches/mix/MixSourceSelector.vue:241` | `eyebrow="· nothing to mix ·"` | **KILL** |
| 13 | `demo/shared/ui/EmptyState.vue:55–57` | the eyebrow's renderer: `<p class="text-mono-caption uppercase tracking-[0.18em] plate-ink">{{ eyebrow }}</p>` | **KILL** — the element, not just the value. With every consumer's eyebrow dead the node is dead weight; leaving the prop keeps the idiom re-introducible. |

#### §1.A.2 — "The commons" / ledger metaphor family (9 sites)

The public palette wall is never called "browse" or "public palettes" in copy; it is uniformly "the commons," and each admin data table is a "ledger," "roster," or "queue."

| # | file:line | exact string | disposition |
|---|---|---|---|
| 14 | `demo/palettes/BrowsePane.vue:13` | `placeholder="Search the commons..."` | **REDUCE** → `Search palettes...` (the sibling pane at `demo/palettes/PalettesPane.vue:36` already says `Search your palettes...`; the scoping comment at `BrowsePane.vue:5-7` shows the twin was deliberately differentiated — differentiate on the plain word, not the metaphor). |
| 15 | `demo/palettes/BrowsePane.vue:65` | `message="The commons is unreachable."` | **REDUCE** → `Couldn't load palettes.` |
| 16 | `demo/palettes/BrowsePane.vue:86` | `empty-hint="Publish one from My Palettes and start the wall."` | **KILL** — also class 3 (§1.C #8). "start the wall" is decorative; the CTA is elsewhere. |
| 17 | `demo/palettes/BrowsePane.vue:142` | `More from the commons` | **REDUCE** → `Load more` |
| 18 | `demo/palettes/browser/admin/AdminAuditPanel.vue:45` | `message="The ledger is unreachable."` | **REDUCE** → `Couldn't load the audit log.` |
| 19 | `demo/palettes/browser/admin/AdminTagsPanel.vue:71` | `message="The tag ledger is unreachable."` | **REDUCE** → `Couldn't load tags.` |
| 20 | `demo/palettes/browser/admin/AdminUsersPanel.vue:54` | `message="The roster is unreachable."` | **REDUCE** → `Couldn't load users.` |
| 21 | `demo/palettes/browser/admin/AdminFlaggedPanel.vue:25` | `message="The flag queue is unreachable."` | **REDUCE** → `Couldn't load flagged palettes.` |
| 22 | `demo/palettes/browser/admin/AdminNamesPanel.vue:33` / `:83` | `message="The proposal queue is unreachable."` / `message="The approved list is unreachable."` | **REDUCE** → `Couldn't load proposals.` / `Couldn't load approved names.` (2 sites, counted once) |

#### §1.A.3 — Editorializing / jokey / fragmentary voice (5 sites)

| # | file:line | exact string | disposition |
|---|---|---|---|
| 23 | `demo/scenes/about/AboutPane.vue:15` | `description="The math, the science, the art, the beauty of color spaces."` | **REDUCE** → `How each color space is defined, and what it is for.` The rule-of-four incantation is the most decorative copy in the app. |
| 24 | `demo/scenes/about/AboutPane.vue:16` | `About the color spaces,` (heading; trailing comma, sentence fragment continued by an inline `<ColorSpaceSelector>`) | **REDUCE** → `About <selector>` — the trailing comma is a typographic conceit that makes the heading read as a broken sentence when the selector is closed. |
| 25 | `demo/scenes/about/markdown/Markdown.vue:26` | `Oh snap...` | **REDUCE** → `No documentation` — a jokey error headline in a reference surface; the description beneath (`Markdown.vue:28`) already carries the whole statement. Also class 2. |
| 26 | `demo/workbenches/generate/GeneratePane.vue:32` | `description="Create pleasing random palettes with aesthetic presets."` | **REDUCE** → `Random palettes from harmony presets.` "pleasing"/"aesthetic" are the app asserting its own quality. |
| 27 | `demo/workbenches/mix/MixSourceSelector.vue:243` | `hint="Save two or more palettes, then pour them together here."` | **REDUCE** → `Save two or more palettes first.` "pour them together" + "here" — also class 3 (§1.C #10). |

---

### §1.B — CLASS 2 · DUPLICATIVE TEXT (27)

#### §1.B.1 — Eyebrow ↔ message (11 sites — every EmptyState consumer)

The structural fact: `demo/shared/ui/EmptyState.vue:55-57` (eyebrow) and `:58-60` (message) are adjacent siblings in one flex column. **Every consumer pairs a caption with a restatement of itself.**

| # | file:line (eyebrow → message) | the pair | disposition |
|---|---|---|---|
| 1 | `PalettesPane.vue:78` → `:79` | `· empty plate ·` / `No saved palettes yet.` | **KILL eyebrow**, keep message |
| 2 | `BrowsePane.vue:84` → `:85` | `· the commons ·` / `No published palettes here yet.` | **KILL eyebrow**; message → `No palettes published yet.` |
| 3 | `AdminAuditPanel.vue:56` | `· ledger clear ·` / `No audit entries found.` (same line) | **KILL eyebrow** |
| 4 | `AdminFlaggedPanel.vue:39` → `:40` | `· nothing flagged ·` / `No flagged palettes.` | **KILL eyebrow** |
| 5 | `AdminNamesPanel.vue:42` | `· queue clear ·` / `No pending proposals.` | **KILL eyebrow** |
| 6 | `AdminNamesPanel.vue:92` | `· none approved yet ·` / `No approved color names.` | **KILL eyebrow** |
| 7 | `AdminTagsPanel.vue:82` | `· no tags minted ·` / `No tags yet.` | **KILL eyebrow** |
| 8 | `AdminUsersPanel.vue:63` | `· roster clear ·` / `No users found.` | **KILL eyebrow** |
| 9 | `AdminUsersPanel.vue:138` | `· none pinned ·` / `No palettes.` | **KILL eyebrow** |
| 10 | `MixSourceSelector.vue:241` → `:242` | `· nothing to mix ·` / `No saved palettes yet.` | **KILL eyebrow** |
| 11 | `EmptyState.vue:90` (default) | the default reproduces the pattern for any future consumer | **KILL default** |

#### §1.B.2 — The OM-15 site's cross-element duplication (1)

| # | file:line | the duplication | disposition |
|---|---|---|---|
| 12 | `demo/workbenches/extract/ExtractWorkbench.vue:165` **vs** `demo/workbenches/extract/ImageDropZone.vue:49` | `· undeveloped plate — feed it an image ·` **vs** `Drop an image or click to browse` — two elements, one view, one instruction. In split layout (`ExtractWorkbench.vue:6`, `sm:grid-cols-2`) the drop zone sits in the left column and this caption in the right; on phones (`layout='column'`) they stack, ~200px apart. The drop zone is the *actual* affordance; the caption is a second, non-interactive plea. | **KILL the caption.** The drop zone already carries the invitation and is clickable. |

#### §1.B.3 — Visible label ↔ `aria-label` on the same control (14 sites)

Pattern: a visible `<label>`/`<span class="section-label">` immediately above a `<SelectTrigger>`/`<Slider>` that carries its own `aria-label`. The visible label is never programmatically associated (no `for`/`aria-labelledby`), so the `aria-label` exists to name the control — but it restates, and in three cases restates *verbatim*, and in nine cases uses **different words for the same thing**, which is a WCAG 2.5.3 label-in-name mismatch (voice-control users say what they see; the accessible name disagrees).

| # | file:line (visible → aria) | visible / aria-label | disposition |
|---|---|---|---|
| 13 | `demo/workbenches/mix/MixConfigBar.vue:98` → `:100` | `Color space` / `Color space` | **KILL aria-label**, associate the visible label (`id`+`aria-labelledby`) — verbatim duplicate |
| 14 | `MixConfigBar.vue:121` → `:123` | `Hue method` / `Hue method` | **KILL aria-label** — verbatim duplicate |
| 15 | `MixConfigBar.vue:145` → `:147` | `Size mismatch` / `Size mismatch strategy` | **REDUCE** — name mismatch |
| 16 | `demo/scenes/ConfigSliderPane.vue:140` → `:145` | `:label="def.label"` / `:aria-label="def.label"` | **KILL aria-label** — the *same expression* emitted twice into one row |
| 17 | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:163` → `:165` | `Type` / `Gradient type` | **REDUCE** |
| 18 | `GradientVisualizer.vue:180` → `:182` | `Space` / `Interpolation space` | **REDUCE** |
| 19 | `GradientVisualizer.vue:197` → `:199` | `Hue` / `Hue interpolation` | **REDUCE** |
| 20 | `GradientVisualizer.vue:229` → `:232` | `Direction` / `Gradient direction` | **REDUCE** |
| 21 | `demo/workbenches/generate/GenerateControls.vue:221` → `:223` | `Preset` / `Generation preset` | **REDUCE** |
| 22 | `GenerateControls.vue:255` → `:257` | `Harmony` / `Color harmony` | **REDUCE** |
| 23 | `demo/scenes/atmosphere/AuroraPane.vue:120` → `:122` | `Harmony` / `Palette harmony` | **REDUCE** |
| 24 | `AuroraPane.vue:140` → `:142` | `Arrangement` / `Zone arrangement` | **REDUCE** |
| 25 | `AuroraPane.vue:154` → `:156` | `Medium` / `Painterly medium` | **REDUCE** — "Painterly" is class-1 voice smuggled into an accessible name |
| 26 | `AuroraPane.vue:168` → `:170` | `Motion` / `Motion register` | **REDUCE** — "register" is house jargon in an accessible name |

#### §1.B.4 — Pane heading ↔ description (1 counted; 2 sites)

| # | file:line | the pair | disposition |
|---|---|---|---|
| 27 | `demo/workbenches/mix/MixPane.vue:75` → `:76` | `description="Mix colors and palettes together."` under the heading `Mix` — the description is the heading conjugated. Sibling: `demo/workbenches/extract/ExtractPane.vue:7`, `description="Pull palettes from any image."` under `Extract` (weaker: "from any image" adds real information). | **KILL** the Mix description; **KEEP** Extract's. |

**Also noted, KEEP (correct as-is):** `demo/palettes/PalettesPane.vue:24` (`aria-hidden` count Badge) + `:25` (`sr-only " (n saved)"`) — deliberate, documented at `:16-18`, prevents "My Palettes2". `demo/shell/dock/ActionButton.vue:16` `:aria-label="title"` + `:41` `{{ title }}` — the popover title and the button's accessible name are the same string by design; the button has no visible label.
**Cross-repo copy duplication, KEEP-but-note:** `demo/shell/dock/menus/ProfileSection.vue:150` and `demo/shell/dock/menus/MobileMenuDropdown.vue:85` both hardcode `Color space picker &amp; converter`, and `:163`/`:97` both hardcode `GitHub`. One tagline, two literals — a drift hazard, not a contrivance.

---

### §1.C — CLASS 3 · EXPLICIT-MECHANICS TEXT (14)

| # | file:line | exact string | disposition |
|---|---|---|---|
| 1 | `demo/shell/dock/ActionToolbar.vue:8` | `description="Click to reset to the default color."` | **REDUCE** → `Back to the default color.` The popover already fires on hover over a button; "Click to" narrates the act the user is mid-performing. Also class 2 vs `title="Reset color"` at `:7`. |
| 2 | `ActionToolbar.vue:20` | `description="Click to copy the current color to the clipboard."` | **REDUCE** → `Copies the current color.` Also class 2 vs `:19`. |
| 3 | `ActionToolbar.vue:31` | `description="Click to generate a random color."` | **REDUCE** → `Picks a random color.` Also class 2 vs `:30`. |
| 4 | `ActionToolbar.vue:42` | `description="Save, browse, and publish color palettes."` | **KEEP** — enumerates capability, not mechanics. Borderline. |
| 5 | `ActionToolbar.vue:55` | `description="Open image palette extraction from a photo or camera."` | **REDUCE** → `Palettes from a photo or camera.` "Open … extraction" narrates the navigation. Also class 2 vs `title="Extract palette"` at `:54`. |
| 6 | `demo/workbenches/extract/ImageDropZone.vue:49` | `Drop an image or click to browse` | **REDUCE** → `Add an image` (or the icon alone). Both mechanics are already signalled: `border-2 border-dashed` (`:8`) is the universal drop affordance, `cursor-pointer` (`:10`) the click one. |
| 7 | `ImageDropZone.vue:20` | `'Image preview area, tap to sample colors'` / `'Replace image, click or drop a new image'` / `'Upload image, click to browse or drop an image here'` (3 branches of one `:aria-label`) | **REDUCE** → `Sample colors` / `Replace image` / `Add an image`. Screen readers announce `role="button"` themselves (`:18`); "click to", "tap to", "drop … here" is the label doing the role's job. |
| 8 | `demo/palettes/BrowsePane.vue:86` | `empty-hint="Publish one from My Palettes and start the wall."` | **KILL** — the instruction points at a different pane and no affordance here honours it. Also class 1 (§1.A #16). |
| 9 | `demo/palettes/PalettesPane.vue:80` | `empty-hint="Add colors above, then save the set."` | **REDUCE** → `Add colors, then save.` "above" is a positional instruction that is false on mobile single-pane layouts. |
| 10 | `demo/workbenches/mix/MixSourceSelector.vue:243` | `hint="Save two or more palettes, then pour them together here."` | **REDUCE** → `Save two or more palettes first.` Also class 1 (§1.A #27). |
| 11 | `demo/palettes/browser/slug/PaletteSlugBar.vue:57` | `This is your unique identity. Use it to sign in from any device and access your palettes.` | **REDUCE** → `Your sign-in identity — use it on any device.` Two sentences of onboarding narration inside a hover popover whose title (`:55`, `Your slug`) already frames it. |
| 12 | `demo/shell/dock/ColorInput.vue:99` | `<span class="italic">Any</span> valid CSS color string is accepted.` | **REDUCE** → `Any valid CSS color.` "is accepted" narrates the field's own contract; the italic emphasis on "Any" is decorative. Also class 2 vs `:97` `Enter a color`. |
| 13 | `demo/workbenches/extract/ExtractWorkbench.vue:165` | `feed it an image` (the imperative half of the OM-15 string) | **KILL** — see §1.A #1 / §1.B #12. |
| 14 | `demo/scenes/atmosphere/AuroraPane.vue:115` | `description="The background aurora derives its palette from the picked colour. Tune the field's shape — colour energy, zones, noise, medium, and motion."` | **REDUCE** → `Aurora palette follows the picked color.` Two sentences; the second enumerates the controls immediately visible below it. **Also a locale defect: `colour` twice**, against `color` everywhere else in the app (`demo/scenes/blob/BlobPane.vue:128`, `demo/palettes/PalettesPane.vue:10`, etc.). |

**Adjacent, KEEP:** `demo/scenes/blob/BlobPane.vue:128` `description="Tune metaball geometry, membrane, lit-glass surface, and satellite behavior."` — enumerates sections rather than narrating mechanics; survives, though `Tune` could go.

---

### §1.D — THE IDIOM FAMILY'S STYLE SITES (ALL-CAPS letter-spaced captions)

Not copy hits — the *typographic* carriers of the voice. Complete enumeration:

| file:line | carrier | note |
|---|---|---|
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` | `@utility text-mono-caption { … letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }` | **The producer token.** Uppercase + caps-tracking are *already in the utility*. |
| same file | `.section-label { @apply text-mono-caption; color: var(--muted-foreground); }` | the producer's label recipe — the legitimate consumer path |
| `demo/shared/ui/EmptyState.vue:55` | `text-mono-caption uppercase tracking-[0.18em]` | **redundant re-declaration** — the utility already does both |
| `demo/workbenches/extract/ExtractWorkbench.vue:163` | `text-mono-caption uppercase tracking-[0.18em]` | redundant (the OM-15 caption) |
| `demo/workbenches/extract/ExtractWorkbench.vue:131` | `text-mono-caption uppercase tracking-[0.18em]` (the `dominant` eyebrow) | redundant |
| `demo/workbenches/extract/ImageDropZone.vue:58` | `text-mono-caption uppercase tracking-[0.18em]` (the `sample`/`replace` corner tag, `:61`) | redundant; the copy itself is already one plain word — **KEEP the strings** |
| `demo/scenes/atmosphere/AuroraPane.vue:194-200` | `.aurora-row-label { font-mono; uppercase; letter-spacing: var(--tracking-caps) }` | **hand re-implementation** of `text-mono-caption` |
| `demo/scenes/ConfigSliderPane.vue:237-243` | `.config-section-title { … uppercase; letter-spacing: var(--tracking-caps) }` | **hand re-implementation** |
| `demo/workbenches/mix/MixResultDisplay.vue:58` | `text-caption font-bold text-muted-foreground uppercase tracking-wide` — `Result` | a *fourth* dialect (bold + `tracking-wide` + display font, not mono) |
| `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:155` | `text-mono-caption uppercase tracking-wider` — `Admin` | a fifth dialect (`tracking-wider`) |
| `demo/shell/dock/ParseEchoReadout.vue:12` | `uppercase tracking-[0.14em]` — the space token | a sixth (`0.14em`) |
| `demo/palettes/browser/status/ApiOfflineChip.vue:41-42` | `font-variant: small-caps; letter-spacing: 0.06em` | a seventh (small-caps, not uppercase) |
| `demo/picker/visual/DebugEventLog.vue:54`, `demo/picker/visual/PointerDebugOverlay.vue:203` | `text-transform: uppercase` | dev-only overlays — **out of scope, KEEP** |

**Seven mutually inconsistent dialects of one caption idiom, four of them re-declaring what the producer token already applies.**

---

## §2 — IDIOM-FAMILY ANALYSIS: WHERE THE VOICE COMES FROM

### §2.1 — The breeding ground is a prop default, not a writer

`demo/shared/ui/EmptyState.vue:89-90`:

```
    }>(),
    { variant: "empty", eyebrow: "· empty plate ·", dots: true },
```

Two defaults on one line make **four** things mandatory for every consumer of the app's single empty-state atom:

1. **`dots: true`** → the WatercolorDot ghost trio (`EmptyState.vue:39-48`, three dots at `w-8`/`w-11`/`w-6` with `opacity-80`/`opacity-60`) renders unconditionally.
2. **`eyebrow: "· empty plate ·"`** → the contrived caption renders even when the consumer passes nothing.
3. **The display line** (`:58-60`, `font-display text-heading`) — a Fraunces heading for a two-word absence statement.
4. **The optional hint** (`:61-63`) — which 4 of 11 consumers fill with an instruction.

The consequence is measurable: **`dots` is never passed `false` anywhere in the codebase** (verified — zero matches for `:dots` / `dots=` across `demo/`), despite the prop existing precisely to shed the trio (documented at `EmptyState.vue:81-88`). The escape hatch was built and never used. Meanwhile **every one of the 10 external consumers overrides `eyebrow` — with another string in the same idiom.** The default did not merely supply the voice; it *taught* it. Nine of the ten overrides were written to match a default nobody chose.

This is why the OM-15 caption exists outside the component at all: `ExtractWorkbench.vue:163-166` hand-rolls the eyebrow's exact class list and dot-flanked grammar because the idiom had become the house voice for "nothing here yet." The comment above it (`ExtractWorkbench.vue:162`, *"The resurrected `ec1b200` caption"*) records the reproduction consciously.

### §2.2 — The voice has a documented genealogy, and it is self-justifying

The idiom is not accidental — it is defended in prose at every site. `EmptyState.vue:5-9` names it *"the R.W4 specimen-plate invitation … a Fira eyebrow (the plate label — Q6 RATIFIED-NARROWED: this annotation class survives ONLY here, on TRUE EMPTY)."* `ShadowPalette.vue:12-16` invokes *"the GENESIS register, assayed directly (`ec1b200`, 2026-03-20)."* `PaletteCardGrid.vue:12-20` cites *"R12 — the owner overrule … MANDATE §0.6 t33-audit-07/08/12."*

Three structural observations:

- **The ratification narrowed the idiom's *scope* and never questioned its *content*.** Q6 "RATIFIED-NARROWED" restricted the eyebrow to true-empty surfaces. It did not ask whether `· ledger clear ·` above "No audit entries found." says anything. The narrowing preserved 100% of the duplication.
- **The metaphor system is load-bearing in the comments, so it leaks into the copy.** The codebase's internal vocabulary — *plate, developing, exposure pass, undeveloped, the commons, ledger, roster, specimen, register* — is a photographic/archival conceit used to name components and design tiers. That is legitimate as internal nomenclature. The defect is that it **crossed the boundary into user-facing strings**: `undeveloped plate` (`ExtractWorkbench.vue:165`), `the commons` (`BrowsePane.vue:13,65,84,142`), `ledger` (`AdminAuditPanel.vue:45,56`; `AdminTagsPanel.vue:71`), `roster` (`AdminUsersPanel.vue:54,63`), `minted` (`AdminTagsPanel.vue:82`), `register` (`AuroraPane.vue:170`, inside an `aria-label`). The user is being addressed in the developers' private schema.
- **The comment mass outweighs the code and immunizes it.** `ShadowPalette.vue` is 121 lines of which **43 are the opening template comment** (`:2-44`) — a 35% comment ratio arguing the component's own correctness before it renders. `EmptyState.vue:1-14` and `:29-38` do the same. Copy defended at this length is copy that is hard to delete, which is exactly how thirteen instances accumulated.

### §2.3 — The two mechanical reproducers

Beyond voice, two *mechanical* patterns manufacture duplicate strings:

- **The uncoupled label.** 14 sites (§1.B.3) place a visible caption above a control and then give the control an `aria-label` because the caption is not associated. Nobody wrote `<label for>` or `aria-labelledby`, so every control needs a second name, and the second name drifts (`Medium` / `Painterly medium`, `Motion` / `Motion register`). The *cure is structural*: associate the visible label once and the 14 duplicate strings evaporate. Three of them (`MixConfigBar.vue:98/100`, `:121/123`, `ConfigSliderPane.vue:140/145`) are already byte-identical, proving the aria-label carries no information.
- **The tooltip pair.** `ActionButton.vue:41-42` renders `title` then `description` as two stacked lines in a hover popover. Four of the five `ActionToolbar` call sites (`:7-8`, `:19-20`, `:30-31`, `:54-55`) fill the second line with a re-conjugation of the first, three of them prefixed `Click to`. The component's shape invites the restatement: given two slots, an author fills two slots.

### §2.4 — Verdict

**The contrived voice is not a writing problem; it is three structural defects.** (a) A shared atom's prop defaults make a decorative caption and a ghost trio mandatory, which propagated the idiom to 11 consumers and taught a 12th to hand-roll it. (b) The internal photographic/archival nomenclature has no boundary against user-facing strings. (c) Two component shapes — the uncoupled label and the two-slot tooltip — require a second string that has nothing new to say. **Editing the 68 strings without closing (a) and fixing (c) guarantees re-growth**, which is precisely what the Q6 "narrowing" already demonstrated once.

---

## §3 — SHADOW-PALETTE IDENTITY + SIZE ANALYSIS

### §3.1 — Identity: which component paints the marked plate

**`demo/palettes/browser/card/ShadowPalette.vue`** — confirmed as the OM-15 skeleton. It is a self-contained SFC (no `<Skeleton>` import; plain `<div>`s with `animate-pulse`), rendered at exactly one call site.

**Consumers — exhaustively enumerated (one live seat):**

| site | nature |
|---|---|
| `demo/workbenches/extract/ExtractWorkbench.vue:159` | **the only live render.** `<ShadowPalette :count="session.colorCount.value" />` inside the `v-else key="shadow"` branch of the `vj-morph` Transition (`:102`), i.e. the Extract workbench's true-empty state — no image loaded, not processing. |
| `demo/workbenches/extract/ExtractWorkbench.vue:199` | the import |
| `demo/palettes/browser/card/index.ts:7` | barrel export |
| `demo/palettes/browser/index.ts:22` | re-export |
| `e2e/smoke/oracles/o9-shadow-palette.spec.ts:17-18,59` | the oracle that **enforces** the single seat ("THE FILLER SWEEP — zero ShadowPalette-as-filler in the scoped host") |

**It is not reused.** The T.W6.5/R12 overrule removed it from every empty host; `PaletteCardGrid.vue:12-20` and `EmptyState.vue:29-38` both record the eviction, and `MixSourceSelector.vue:230-238` cites the same ruling (*"superfluous shadow palettes everywhere"*). The owner has already killed this species once, at every other seat. **OM-15 marks its last surviving instance.**

**Not to be confused with** `demo/palettes/browser/card/PaletteCardSkeleton.vue` — the *loading* sibling (`role="status"`, `aria-label="Loading palette"`, `:36-37`), which renders in the same Transition at `ExtractWorkbench.vue:104-107` while `isProcessing` is true, and in `BrowsePane.vue:41-49`/`:127-133`. Its template is **structurally identical** to ShadowPalette's (see §3.3). ShadowPalette is `aria-hidden="true"` (`ShadowPalette.vue:47`) with no role and no label — deliberately, per `:36-44`.

### §3.2 — Size drivers, with file:line

| driver | file:line | value | contribution |
|---|---|---|---|
| strip height | `ShadowPalette.vue:51` | `class="flex h-10 w-full gap-px"` | 40px, fixed |
| strip cell count | `ShadowPalette.vue:53` | `v-for="i in count"` | horizontal only (`flex-1`, `:55`) |
| meta row padding | `ShadowPalette.vue:60` | `px-3 py-2.5` | 20px vertical |
| meta blocks | `ShadowPalette.vue:62`, `:66` | `h-5 w-32` / `h-5 w-6` | 20px |
| **swatch row** | `ShadowPalette.vue:71` | `px-3 pb-3 flex flex-wrap gap-2` | **wraps — unbounded rows** |
| **swatch count** | `ShadowPalette.vue:73` | `v-for="i in count"` | **`count` = the live `k` slider** |
| **swatch size** | `ShadowPalette.vue:75` | `w-12 h-12 sm:w-14 sm:h-14` | **48px → 56px each** |
| **swatch radius** | `ShadowPalette.vue:75` | `rounded-badge` → `--radius-badge: var(--radius-pill)` → `9999px` (`@mkbabb/glass-ui/dist/styles/theme/radius.css`) | **full circles at 56px** — the marked "large circles" |
| the count source | `demo/workbenches/extract/composables/useExtractSession.ts:44` | `const colorCount = ref(5)` | default 5 |
| **the count ceiling** | `demo/workbenches/extract/ExtractControls.vue:29` | `:max="16"` | **the user can drive `count` to 16** |
| card shell | `ShadowPalette.vue:47` | `rounded-card border border-card-edge bg-well overflow-hidden shadow-cartoon-sm` | `--radius-card: var(--radius-2xl)` = 1rem |

**Arithmetic at the marked state.** The screenshot shows a 6 + 6 + 4 wrap = **16 circles**, i.e. `k = 16`, the slider maximum. At `sm` and above: strip 40 + meta (20 + 20) + swatches (3 rows × 56 + 2 gaps × 8 = 184) + `pb-3` 12 ≈ **276px of pure skeleton**, sitting in the right column beside a drop zone capped at `sm:max-h-[min(400px,50dvh)]` (`ExtractWorkbench.vue:19`). At `k = 5` (the default) it is one swatch row ≈ **148px**. **The plate's height is a user-driven variable that can nearly double, and it grows precisely when the user is exploring the slider — i.e. before any image exists.**

### §3.3 — What makes it structurally "too large"

1. **The ghost is sized as a 1:1 replica of the developed card.** `ExtractWorkbench.vue:150` passes `swatch-class="w-12 h-12 sm:w-14 sm:h-14"` to the real `<PaletteCard>`; `ShadowPalette.vue:75` hardcodes the identical `w-12 h-12 sm:w-14 sm:h-14`. The design intent is explicit (`ShadowPalette.vue:26-34`, *"ghost → skeleton → card stays ONE plate developing in place"*), but the effect is that **an empty state occupies exactly as much space as a full result**, in a workbench where the result is the point.
2. **The swatch count is unbounded by the empty state's own needs.** Communicating "k colors will come out" does not require k full-size circles; it is a legibility claim (`ShadowPalette.vue:48-50`) that the strip at `:51-57` — 16 thin cells in a 40px band — already satisfies on its own. The 16 circles restate the 16 strip cells. **The plate duplicates its own information at ~5× the height** — the visual analogue of the eyebrow/message duplication in §1.B.1.
3. **`rounded-badge` = `--radius-pill` = 9999px** turns a 56px square into a full disc. Sixteen 56px discs on a `bg-well` ground is the single highest-mass element on the pane at rest — the same failure mode the codebase already diagnosed and cured elsewhere (`PalettesPane.vue:57-61`: *"the highest-chroma element on the pane guarding its rarest action"*). Here it is the highest-*mass* element representing nothing at all.
4. **Two ghost registers stack in one column.** `ImageDropZone.vue:8` is `border-2 border-dashed` with `min-h-[140px]` (`:9`) — itself an empty-state affordance — directly above (column) or beside (split) a 148–276px second ghost. `EmptyState.vue:29-38` states the governing law in terms: *"never two ghost registers at two scales."* The Extract pane violates the spirit of its own rule: the drop zone is the working affordance, ShadowPalette is a decorative echo, and the caption at `:165` is a third restatement of both.
5. **It is a near-duplicate component.** `ShadowPalette.vue:51-80` and `PaletteCardSkeleton.vue:44-77` have the same four-block structure, the same `h-10` strip, the same `h-5 w-32` / `h-5 w-6` meta blocks, the same `w-12 h-12 sm:w-14 sm:h-14 rounded-badge` swatches, and the same `(i-1)*0.12` / `count*0.12+0.1` / `+0.22` / `+0.34+(i-1)*0.1` stagger arithmetic. They differ in: ink mechanism (scoped `background` vs glass-ui `<Skeleton>`), animation (`animate-pulse` vs `variant="breath"`), and semantics (`aria-hidden` vs `role="status"`). **The size problem is duplicated across both files**; any cure that touches only one leaves the other.

### §3.4 — Minimal-cure direction (analysis only — no source edits proposed or landed)

Ordered by force, for a future wave spec to choose among:

- **(A) Delete the seat.** The species has already been evicted from every other host by owner ruling (R12); OM-15 marks the survivor, and the mark names both the plate *and* its caption. `ImageDropZone` (`:8-15,46-51`) is a complete, self-sufficient empty state for this pane. This is the cure most consistent with the existing rulings and with `feedback_kiss_no_contrivance`. Cost: the `e2e/smoke/oracles/o9-shadow-palette.spec.ts` oracle's premise inverts (it currently asserts the seat *survives* here).
- **(B) Keep the instrument, drop the replica scale.** Retain the strip (`:51-57`) as the live-k readout — it is the part that actually earns its place — and delete the swatch row (`:71-80`) and meta row (`:59-69`). Removes ~230px at k=16 and ~110px at k=5, kills the self-duplication of §3.3.2, and keeps the "turn k and the plate re-segments" behaviour the component was built for.
- **(C) Decouple the ghost swatch from the card swatch.** If the swatch row survives, its size must stop tracking `PaletteCard`'s. A ghost does not need `sm:w-14`; a fixed 2-row cap (or a chip-scale swatch) bounds the plate's height independent of `k`'s 1–16 range.
- **Structural precondition for any of the three:** whatever lands must land on **both** `ShadowPalette.vue` and `PaletteCardSkeleton.vue`, or the duplicated geometry (§3.3.5) reintroduces the mass at the loading state.
- **The caption at `ExtractWorkbench.vue:163-166` dies under every option**, including (B) and (C) — its stated job (`:162-163`, *"the AT text for the aria-hidden ghost above"*) is already discharged by `ImageDropZone.vue:20`'s `aria-label`, and the ghost announcing nothing is the documented design (`ShadowPalette.vue:36-44`).

---

## §4 — COUNTS + ABROGATION DISPOSITION

### §4.1 — Counts

| class | hits | of which also carry a second class |
|---|---:|---:|
| **1 — precious / contrived voice** | **27** | 5 |
| **2 — duplicative text** | **27** | 3 |
| **3 — explicit mechanics** | **14** | 1 |
| **TOTAL** | **68** | 9 |

By disposition:

| disposition | count | meaning |
|---|---:|---|
| **KILL** (dies outright, nothing replaces it) | **26** | 13 eyebrow strings + the eyebrow prop & element + 10 aria/heading duplicates + the OM-15 caption |
| **REDUCE** (collapses to plain minimal copy) | **31** | metaphor family, mechanics narration, editorializing |
| **MERGE / associate** (structural, string evaporates) | **3** | the byte-identical `aria-label` triple |
| **KEEP** (listed for completeness, correct as-is) | **8** | sr-only count, ActionButton name, `sample`/`replace`, Extract & Browse descriptions, BlobPane, dev overlays |

By file, the densest sites:

| file | hits |
|---|---:|
| `demo/palettes/BrowsePane.vue` | 6 |
| `demo/scenes/atmosphere/AuroraPane.vue` | 6 |
| `demo/shell/dock/ActionToolbar.vue` | 5 |
| `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` | 4 |
| `demo/shared/ui/EmptyState.vue` | 3 (all structural — the highest *leverage*) |
| `demo/workbenches/extract/ExtractWorkbench.vue` | 3 (the mark) |
| `demo/workbenches/mix/MixConfigBar.vue` | 3 |
| the 5 admin panels | 12 combined |

### §4.2 — The abrogation disposition

Per the owner edict (*"totally abrogated"*) and `feedback_kiss_no_contrivance`:

**DIE OUTRIGHT — no replacement, no plain-word substitute (26).**

1. **All 12 eyebrow values** — `ExtractWorkbench.vue:165`; `EmptyState.vue:90` (default); `PalettesPane.vue:78`; `BrowsePane.vue:84`; `AdminAuditPanel.vue:56`; `AdminFlaggedPanel.vue:39`; `AdminNamesPanel.vue:42`, `:92`; `AdminTagsPanel.vue:82`; `AdminUsersPanel.vue:63`, `:138`; `MixSourceSelector.vue:241`. Every one is a restatement of the `message` beneath it; deleting each leaves a complete, plain empty state.
2. **The eyebrow element and prop** — `EmptyState.vue:55-57` and the `eyebrow` declaration in the props block. Leaving the prop with an empty default keeps the idiom one commit away from returning; the R12 "narrowing" already proved that scope-limiting a contrivance preserves it.
3. **`BrowsePane.vue:86`** — `Publish one from My Palettes and start the wall.` Instruction pointing at another pane, with no affordance here.
4. **`MixPane.vue:75`** — `Mix colors and palettes together.` The heading is `Mix`.
5. **The 3 byte-identical `aria-label`s** — `MixConfigBar.vue:100`, `:123`, `ConfigSliderPane.vue:145`. Zero information; the visible label needs association, not repetition.
6. **`Markdown.vue:26` `Oh snap...`** as a *headline* (the description at `:28` is the whole statement).

**REDUCE TO PLAIN MINIMAL COPY (31).** The class-1 metaphors (`the commons` ×4, `ledger` ×2, `roster`, `flag queue`, `proposal queue`, `approved list`, `minted`), the class-3 mechanics narration (the three `Click to …`, the two drop-zone labels, the slug popover, the ColorInput popover, the two hint lines, the `Open … extraction`), the two editorializing pane descriptions, and the 11 drifting `aria-label`s. Target register: **one plain clause, no metaphor, no "click/tap", no positional words ("above", "here"), no house jargon in an accessible name.** `demo/palettes/browser/status/ApiOfflineChip.vue:17,25` (`dev misconfigured — run \`npm run dev\``, `backend offline — saved locally`) is the model already in-tree: literal, machine-honest, zero conceit.

**PRESERVE (8).** `PalettesPane.vue:24-25` (the sr-only count — deliberate, documented); `ActionButton.vue:16`+`:41` (one string as both accessible name and popover title, no visible label to duplicate); `ImageDropZone.vue:61` (`sample`/`replace` — one plain word each; only the *style* is idiom-family); `ExtractPane.vue:7` and `BrowsePane.vue:3` descriptions (carry real information beyond their headings); `BlobPane.vue:128`; `ActionToolbar.vue:42`; the dev-only overlays (`DebugEventLog.vue`, `PointerDebugOverlay.vue`) — out of user-facing scope.

**THE STRUCTURAL PRECONDITION.** Per §2.4, a wave that edits only the 68 strings will regrow them. Three defects must close alongside:

- **`EmptyState.vue:89-90`** — remove `eyebrow` from the defaults *and* the props; reconsider `dots: true` (never once overridden in 11 consumers, despite the escape hatch existing at `:81-88`).
- **The 14 uncoupled labels (§1.B.3)** — associate the visible caption (`id` + `aria-labelledby`, or a real `<label for>`); the duplicate strings then evaporate rather than needing rewording.
- **`ActionButton.vue:41-42`** — the two-slot popover invites the restatement. Either the second line earns its place at every call site or the slot goes.

And per §1.D: the caption idiom has **seven dialects**, four of which re-declare `uppercase`/`tracking` that `text-mono-caption` already applies (`@mkbabb/glass-ui/dist/styles/typography/utilities.css`), and two of which (`AuroraPane.vue:194-200`, `ConfigSliderPane.vue:237-243`) re-implement the token from scratch. Consolidating on `.section-label` is the mechanical half of retiring the voice.

---

## §5 — EVIDENCE INDEX

Every file inspected in full or in the cited range:

`demo/shared/ui/EmptyState.vue` · `demo/shared/ui/PaneHeader.vue` · `demo/palettes/browser/card/ShadowPalette.vue` · `demo/palettes/browser/card/PaletteCardSkeleton.vue` · `demo/palettes/browser/card/PaletteCardGrid.vue` · `demo/palettes/browser/card/PaletteCardMenu.vue` · `demo/palettes/browser/card/CurrentPaletteEditor.vue` · `demo/workbenches/extract/ExtractWorkbench.vue` · `demo/workbenches/extract/ImageDropZone.vue` · `demo/workbenches/extract/ExtractControls.vue` · `demo/workbenches/extract/composables/useExtractSession.ts` · `demo/workbenches/mix/MixSourceSelector.vue` · `demo/workbenches/mix/MixConfigBar.vue` · `demo/workbenches/mix/MixResultDisplay.vue` · `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` · `demo/workbenches/generate/GenerateControls.vue` · `demo/palettes/BrowsePane.vue` · `demo/palettes/PalettesPane.vue` · `demo/palettes/browser/admin/{AdminAudit,AdminFlagged,AdminNames,AdminTags,AdminUsers}Panel.vue` · `demo/palettes/browser/slug/PaletteSlugBar.vue` · `demo/palettes/browser/status/ApiOfflineChip.vue` · `demo/palettes/browser/search/SearchFilterBar.vue` · `demo/palettes/browser/dialog/MigratePalettesDialog.vue` · `demo/shell/dock/ActionToolbar.vue` · `demo/shell/dock/ActionButton.vue` · `demo/shell/dock/ColorInput.vue` · `demo/shell/dock/ParseEchoReadout.vue` · `demo/shell/dock/menus/ProfileSection.vue` · `demo/shell/dock/menus/MobileMenuDropdown.vue` · `demo/shell/viewSchema.ts` · `demo/scenes/about/AboutPane.vue` · `demo/scenes/about/ColorNutritionLabel.vue` · `demo/scenes/about/markdown/Markdown.vue` · `demo/scenes/atmosphere/AuroraPane.vue` · `demo/scenes/blob/BlobPane.vue` · `demo/scenes/ConfigSliderPane.vue` · `demo/styles/utils.css` · `demo/palettes/browser/card/index.ts` · `e2e/smoke/oracles/o9-shadow-palette.spec.ts` · `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` · `node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css`

Sweep method: full template-text + copy-attribute extraction across all 88 `demo/**/*.vue` (excluding the 178 shadcn files under `demo/ui/`, per the DO-NOT-MODIFY rule), yielding 491 candidate strings, plus a targeted literal sweep of `demo/**/*.ts` for toast surrogates, error copy, placeholder factories, and label tables (`usePalettePorts.ts:106-108`, `viewSchema.ts:105-130`, the `use*` composables' `console.warn` family — all machine-honest, **no hits**).

**No source file was modified. This report is the only artefact written.**
