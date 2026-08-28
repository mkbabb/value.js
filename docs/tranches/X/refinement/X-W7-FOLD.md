# X-W7 — REFINEMENT FOLD (addendum to `waves/W7.md`)

**Wave**: X-W7 · *Palette Specimen and Domain Split* · status `planned` · 7 units (X.W7.a–g) · 20 hard gates G1–G20 (19 born-RED).
**Seat**: fold seat, X·V refinement fold. **Date**: 2026-08-28. **Corpus base**: `docs/tranches/V/megatranche/registry/adjudicated/` (value.js band — every record NOT `kf-*`/`fr-*`/`pt-*`).
**Sole write**: this file. **Nothing in this fold opens product source.** Execution stays gated; the wave's status is unchanged by this document.

**E-3 posture.** `docs/tranches/X/waves/W0..W11.md` and `CONFORMANCE-2026-08-03.md` are UNTOUCHABLE and were not edited. This file is an **addendum beside** `W7.md`, never a patch to it. The exemplar for form is the X·P fold at `docs/tranches/X/parse-that/REFINEMENT-FOLD-2026-08-06.md` (§1a notes idiom, provenance ⟨…⟩ lines, dated corrections, id-keyed census law).

**Reading rule.** The wave reads its dated spec **first**, then this addendum, in that order. Where the two disagree on a *fact*, this addendum's clause governs and the disagreement is recorded in §1a. Where they disagree on **access** (§4 File Bounds), **the dated §4 governs** — an addendum cannot widen a bounds table; every widening this corpus requires is booked in §BoundsDelta for the formation boundary to rule.

**M-25 compliance.** Rows are deduped **by banked identity**, not by record. A single mechanism witnessed in six records is ONE fold row with six ⟨…⟩ provenance cells. Cure-shape locks, sequencing edicts, binding caveats and dissents are carried verbatim where load-bearing. Transcription without dedupe is defective; ignoring an adjudicated row is defective.

**Anti-rename.** Every banked id below is original for life. `W7.n` numbering is an **addressing index for this fold only** — it is not an id, never replaces one, and may not be cited as one.

**L-19.** Every born-RED gate named in §Gates carries a **real witness**: a repo path + line, a producer byte, an owner PNG, or a measured count. Proof-scripts whose only consumer is themselves are presumed contrivance and are marked as such.

## Fold classes

- **cl.1** — spec sharpening / law / correction the wave must read before executing the named unit.
- **cl.2** — cure-shape lock or binding contract: the cure is adjudicated *separately from the defect*, and the lock constrains which cures are admissible.
- **cl.3** — MEASURE-AT-OPEN: mechanism certain, magnitude live; the wave takes the number, it does not inherit one.
- **cl.4** — EXCLUDED from this wave with a written reason (routed elsewhere or declined).

---

## §1a — Collator challenged: corrections, never silent

Twelve corrections. Each is a claim in the corpus or the spec that this fold could not carry as written. None is applied silently; none rewrites a dated file.

**C-1 · The corpus's bare ids are not unique, and no successor may cite one bare.** Six id namespaces collide inside the value.js band: `PCS-*` is both `PaletteCardSkeleton.md` (PCS-1..PCS-22) and `PaletteColorStrip.md` (PCS-1..PCS-31); `AF-*` is both `ActionFeedback.md` (AF-1..AF-25) and `AdminFlaggedPanel.md` (AF-1..AF-54); `PS-*` is both `PaletteCardSwatches.md` (PS-1..PS-41) and `PreviewStrip.md`; `AP-*` is `PaletteCardMenu.md`, `ApiOfflineChip.md` and `AuroraPane.md`; `A-*` is `FlagReportDialog.md`, `MigratePalettesDialog.md`, `PaletteRenameInput.md`, `PaletteSlugBar.md` and `CurrentPaletteEditor.md`; `L-5` is at least four distinct rows. **Law adopted for this fold and every successor: the citable identity is `⟨record.md · id⟩`, never `id`.** Anti-rename forbids re-minting; it does not license ambiguity. ⟨whole-corpus census, this seat⟩

**C-2 · `PaletteColorStrip.md` PCS-19 and its §COORDINATION 3(ii) are FALSE at the spec.** Both assert that `MixSourceSelector.vue` "appears in no W7 file list". `W7.md` §4 carries `demo/workbenches/mix/MixSourceSelector.vue | modify` **and** `demo/workbenches/mix/MixConfigBar.vue | modify`, and §4a names both among the four cross-wave paths X-W6 writes first. The registry itself knows this — `wb-mix-animationcanvas.md` header: "X-W7 shares MixSourceSelector/MixConfigBar (W7.md:125-126)". The mis-statement is corrected here; the underlying composition row survives unharmed. ⟨PaletteColorStrip.md · PCS-19⟩ ⟨wb-mix-animationcanvas.md · instruments⟩ ⟨W7.md §4⟩

**C-3 · §5's unit `Files` globs are wider than §4's enumerated bounds, and most of this corpus routes to the glob.** `X.W7.c` declares `demo/palettes/browser/card/**`; `X.W7.d` declares `browser/admin/*.vue`. §4 enumerates. The real tree contains, inside those globs and **outside** §4: `browser/card/CurrentPaletteEditor.vue`, `SwatchHoverMenu.vue`, `composables/{useSwatchActions,useHoverPopover,useLeaveTimer,useHeightTransition}.ts`, `PaletteCard/ActionFeedback.vue`, `PaletteCard/PaletteRenameInput.vue`, `browser/admin/{AdminListItem,AdminListSkeleton,PaginationBar}.vue`. **The bounds table governs**; the delta is booked whole in §BoundsDelta. This is the single most consequential finding of the fold: a large fraction of the corpus's "→ X-W7" dispositions land on files the wave may not open.

**C-4 · §5's `X.W7.d` says "`PaletteCard.vue` deletes"; §4 grants it `modify-carve`.** A delete is not within a carve. Under the reading rule the access verb governs, so as written X.W7.d must stop at carve and the deletion is a formation-boundary amendment. `ActionFeedback.md:9` has already read the §5 prose as authoritative ("X.W7.d … **deletes PaletteCard.vue**") and authored every AF-row against a successor surface that the bounds table does not authorise creating by deletion. Recorded, not resolved. ⟨ActionFeedback.md · Wave authority⟩ ⟨W7.md §4, §5.d⟩

**C-5 · `wb-generate-pane.md` K-10's evidence cell is FALSE at the installed pin.** It asserts the producer exports `SelectProps`/`SelectEmits`/`SelectionValue` at the component barrel and root. Two independent later probes (`wb-mix-configbar.md` PIN 6, and its 2026-08-24 addendum's third probe) find `SelectionValue` = 0 hits in `dist/index.d.ts` and in the select barrel; it is declared only in `_shared/selection.d.ts`, which no export key reaches. Consequence for this wave: the prescribed `import type { SelectionValue }` cure **does not compile**, and **no BH relay is required** — the type is derivable from `SelectProps["modelValue"]` / `SelectItemProps["value"]` / `SelectEmits["update:modelValue"][0]`. Relevant because X-W7 shares `MixConfigBar.vue`. ⟨wb-mix-configbar.md · PIN 6, K-6, MC-21⟩ ⟨wb-generate-pane.md · K-10⟩

**C-6 · The sweep-is-a-claim law.** `wb-mix-resultdisplay.md` K-19 killed a reader's "REGISTRY-FIRST sweep → ZERO files / not banked" cell: five files already carried the term, two predating the reader's own session. **Adopted as a fold law**: a registry sweep that returns zero must be re-run with a second instrument before "not banked" may be written. This fold's own dedupe was run twice (per-record grep + whole-corpus grep) for exactly this reason. ⟨wb-mix-resultdisplay.md · K-19⟩

**C-7 · `MR-24`'s "five clicks make five rows" limb is false at source and may not be quoted.** `usePaletteStore.ts:61-81` dedupes on `isLocal` + case-insensitive name + `colorsMatch`, splices, unshifts, bumps `updatedAt` and **returns the existing row**. The surviving MR-24 limb (Save emits into a void) is *worsened*: created / silently-reordered / would-fail collapse into zero signal. This bears on X.W7.d's "one visible result" goal and on `usePaletteStore.ts`, which is in bounds. ⟨wb-mix-pane.md · MP-7, Ruled events⟩ ⟨wb-mix-resultdisplay.md · MR-24⟩

**C-8 · MT-AU1 is adjudicated but exists in no CARRY-CUT-LEDGER row and no X wave.** `AdminListSkeleton.md` states the gap verbatim and books itself NO-WAVE-OWNER on it. X-W7 owns all five admin panels **and** `AdminPane.vue` by name — it is the only wave whose bounds could receive MT-AU1's operative core — but MT-AU1 was never cut into X, so its seven BLOCKERs (§2 L-5 + §3 Δ-1/Δ-3/Δ-7/Δ-10/Δ-11/Δ-13/Δ-14) have **no wave**. Booked in §BoundsDelta as the MT-AU1 packet. ⟨AdminListSkeleton.md · Terminal disposition⟩ ⟨AdminUsersPanel.md · §2, §3⟩ ⟨AdminPane.md · scoreboard⟩

**C-9 · `FlagReportDialog.md`'s own §Correction 2 is adopted, and it corrects that record's roster.** A-1/KILL-1 booked `vueCompilerOptions.strictTemplates` as "→ boundary row". Wrong: **X-W7 owns it by name** (`X.W7.a`, gate G3, `tsconfig.base.json | modify`). The recurrence-stopper for the whole BUTTON-VARIANT-INERT family is therefore wave-owned, not boundary-owned. ⟨FlagReportDialog.md · §Correction 2⟩ ⟨W7.md · G3⟩

**C-10 · `wb-extract-controls.md` RULING PIN 1 is a spec inconsistency this fold cannot resolve.** `ExtractControls.vue` appears in **no** X wave's file-bounds table; the only named receiving surface for any of its bytes is CC-105 → X-W4.g, trigger-gated on the X-W0.j Glass-8 repin census — **and W4.g's own bounds table omits the file**. X-W7 owns exactly one byte-surface in the extract cone (`ExtractWorkbench.vue | modify-carve`, and G20 requires deleting its `:163-166` caption). Booked whole as the XP-EXTRACT packet. ⟨wb-extract-controls.md · RULING PIN 1⟩ ⟨wb-extract-pane.md⟩ ⟨wb-extract-imagedropzone.md⟩ ⟨wb-extract-imageeyedropper.md⟩

**C-11 · The `--ink-muted` masking-fallback ruling is settled *against* the two-arm form.** `shell-dock-parseechoreadout.md` R① rules the bare `var(--ink-muted)` read the ONLY reference-correct site and kills the counter-row; `EmptyState.md` ES-13 finds the token has **no declaration in the stylesheet layer at all**, so the two-arm `var(--ink-muted, var(--muted-foreground))` resolves to the sub-floor ink the class exists to retire, copy-pasted five times; `ErrorBoundary.md` EB-20 pins the two quantities (5 byte-identical `.plate-ink` rules / 12 expression sites across 9 files). One identity, three witnesses; the fond normalises **to** the bare read. ⟨shell-dock-parseechoreadout.md · R①⟩ ⟨EmptyState.md · ES-13⟩ ⟨ErrorBoundary.md · EB-20⟩

**C-12 · Six gate baselines in `W7.md` §6 are re-confirmed by the corpus from independent instruments and one is widened.** G8's `slice(0,3)` is corroborated by `AdminFlaggedPanel.md` AF-20 (the `slice(0,5)` sibling) **and widened**: `VersionHistoryDrawer.vue:59-63` renders exactly the `+N` residue mark the same feature omits — the cure already ships one file away. G14's "0 matches repo-wide" is corroborated at four further seats (ATP-1, AF-2, AdminNamesPanel D-2, VHD-3). G19's `EmptyState.vue:90` prop default is corroborated by `AdminTagsPanel.md`'s reading of `X-W7.md:62` and by ES-36's guard-asymmetry derivation. No baseline in §6 was found false.

---

## §Rows

Every row: `**W7.n · ⟨record · id⟩ — headline** (class)` → mechanism → *Sharpens* → provenance. Dispositions are **ADJUDICATED, not VERIFIED**: nothing here stamps a gate green.

### X.W7.a — search band, checkbox contract, template strictness (W7.md §5.a; G1–G3)

**W7.1 · ⟨TagEditPopover.md · TEP-1/TEP-2/TEP-3⟩ — the three BLOCKERs are ONE mechanism, and it is exactly G1/G2's witness** (cl.1). All three are born-dead: the `:checked`/`update:checked` pair at `TagEditPopover.vue:28,:29` addresses a glass-ui 7.0.0 API that does not exist, so the box renders `aria-checked="false"` against a non-empty `currentTags` and `saveTagsCalls` is 0. The wave must book them as one cure, not three. *Sharpens*: G1 (occurrence count), G2 (emit ledger) — and confirms G2's design choice, since a visual assertion passes the RED state. ⟨TagEditPopover.md · TEP-1..TEP-3⟩ ⟨W7.md · G1, G2⟩

**W7.2 · ⟨TagEditPopover.md · TEP-13⟩ — `ariaLabel` is a one-token cure on a control with 25 X-W7 routings** (cl.1). The prop exists on the producer and is unpassed. Cheapest row in the unit; it must not be deferred into X.W7.g's naming pass. ⟨TagEditPopover.md · TEP-13⟩

**W7.3 · ⟨SearchFilterBar.md · SFB-2 + S-7⟩ — colour-search substitution, with a KEEP-AND-WIDEN cure lock** (cl.2). SFB-2 is the substitution defect; **S-7 is the binding lock: the existing search must be kept and widened, never replaced.** A cure that swaps the colour path for a new one fails the lock even if it fixes SFB-2. ⟨SearchFilterBar.md · SFB-2, S-7⟩

**W7.4 · ⟨SearchFilterBar.md · SFB-4⟩ — the same change lands on `UserSortMenu.vue`, which is NOT in bounds** (cl.1 + BoundsDelta). SFB-4 is a same-change rider; `demo/palettes/browser/search/UserSortMenu.vue` is absent from §4 (only `TagEditPopover.vue` and `SearchFilterBar.vue` are named) while X-W8's G-9 holds `UserSortMenu.vue:8` under a null-DELTA proof. Executing SFB-4 inside X-W7 is a bounds violation; leaving it is a half-cure. See §CrossEdges CE-3. ⟨SearchFilterBar.md · SFB-4⟩ ⟨UserSortMenu.md · R-G⟩

**W7.5 · ⟨BrowsePane.md · B2⟩ — the 2-character search cliff, booked NO-WAVE-OWNER at its record, is ownable here** (cl.1). `BrowsePane.vue` IS in §4 (`modify`). The record's NO-WAVE-OWNER booking was taken against a narrower reading of the bounds; the fold re-homes it into X.W7.a/d. ⟨BrowsePane.md · B2⟩ ⟨W7.md §4⟩

**W7.6 · ⟨BrowsePane.md · M5⟩ ≡ ⟨SearchFilterBar.md · SFB-2⟩ — colour-search blindness is the same identity seen from the pane end** (cl.1). One row, two witnesses; the fold declines the second booking. ⟨BrowsePane.md · M5⟩

**W7.7 · ⟨AdminPane.md · C-2/L-1⟩ ≡ ⟨AdminNamesPanel.md · L-8⟩ ≡ ⟨AdminUsersPanel.md · Δ-7 search limb⟩ — one global `searchQuery` ref serves five domains and is never reset** (cl.1). `usePalettePorts.ts:54` → `:141/:183/:224`; v-model-bound at `AdminPane.vue:13`, `BrowsePane.vue:11`, `PalettesPane.vue:34`; `searchQuery.value =` → 0 hits repo-wide; every admin view mounts PalettesPane beside it. A moderation query leaks into the personal library. All three files are in bounds. *Sharpens*: X.W7.d (`usePalettePorts.ts | modify`). ⟨AdminPane.md · C-2/L-1⟩ ⟨AdminNamesPanel.md · L-8⟩

**W7.8 · ⟨AdminPane.md · expandedId aliasing⟩ ≡ ⟨AdminUsersPanel.md · Δ-17⟩ — the same class on a second cell, with a namespace fork** (cl.1). `usePaletteActions.ts:24` one ref; writers `:28/:76/:81/:129`; handed to all three ports; `BrowsePane.vue:97` and `AdminUsersPanel.vue:144` compare it to `palette.slug` while `PalettesPane.vue:87` compares the SAME cell to an id. One ref, two ID namespaces. ⟨AdminPane.md · missed, reader 2⟩ ⟨AdminUsersPanel.md · Δ-17⟩

**W7.9 · ⟨FlagReportDialog.md · §Correction 2⟩ — `strictTemplates` is wave-owned, and it is the recurrence-stopper for the whole inert-prop family** (cl.1). See §1a C-9. G3's falsifier demonstration is therefore not a formality: it is the proof that the *class* is closed. ⟨FlagReportDialog.md · §Correction 2⟩

**W7.10 · BUTTON-VARIANT-INERT — one identity, eight witnesses, 51-site census** (cl.1). `variant="…"` is not a glass-ui 7 Button prop; every site renders `data-emphasis="secondary"` and the string lands in the DOM as junk. Witnesses: ⟨wb-mix-configbar.md · MC-10⟩ ⟨GenerateControls.md · §3 row 5⟩ ⟨PaletteSlugBar.md · A-11⟩ ⟨AdminFlaggedPanel.md · AF-6⟩ ⟨AdminNamesPanel.md · C-2⟩ ⟨FlagReportDialog.md · A-1⟩ ⟨MigratePalettesDialog.md⟩ ⟨shell-dock-profilesection.md · C-2/D-3⟩. **The "gates structurally cannot see this class" headline is KILLED** (`wb-mix-configbar.md` K-7): the gate exists and is off — a one-line omission with a known blast radius (271 errors / 263 × TS2353 in the banked counterfactual). *Sharpens*: G3. ⟨wb-mix-configbar.md · MC-10, K-7⟩

**W7.11 · ⟨MiniColorPicker.md · MCP-1..MCP-47⟩ — "X-W7 rider else NO-WAVE-OWNER (the ApiOfflineChip precedent)", and the file is NOT in bounds** (cl.1 + BoundsDelta). 2 BLOCKERs. Two binding cure-caveats ride the record (K-11 and MCP-13); MCP-44 is a DESIGN.md deletion-carry. `browser/search/MiniColorPicker.vue` is absent from §4. ⟨MiniColorPicker.md · MCP-1..47, K-11, MCP-13, MCP-44⟩

**W7.12 · ⟨PalettesPane.md · PP-3⟩ — `"onCommit-edit"` hyphenated prop-bag keys** (cl.1). Routed to X-W5 at the record; recorded here because G3's `strictTemplates` is what makes the class *visible*, and `PalettesPane.vue` is in X-W7's bounds. Sequencing, not ownership: X-W7 turns the light on, X-W5 fixes the key. See §CrossEdges CE-6. ⟨PalettesPane.md · PP-3⟩

### X.W7.b — export truth, one slug, failure disposition (W7.md §5.b; G4–G7)

**W7.13 · EXPORT-DUAL-PATH — ONE identity, six independent witnesses** (cl.1). `demo/palettes/export.ts` (the file) shadows `demo/palettes/export/` (12 modules, **no `index.ts`**), so `usePaletteExport.ts:9`'s `from "./export"` resolves to the FILE; the W51 byte-exact certified tree's only consumer is its own test. Witnesses: ⟨PaletteSlugBar.md · A-7⟩ ⟨CurrentPaletteEditor.md · L-10⟩ ⟨wb-mix-resultdisplay.md · MR-12 ≡ PCS-8⟩ ⟨VersionHistoryDrawer.md · VHD-27⟩ ⟨AdminAuditPanel.md · AAP-17 "a file-beats-directory accident ships the uncertified exporter"⟩ ⟨AdminFlaggedPanel.md · AF-42 "X-W7 — explicit"⟩. *Sharpens*: G4 — and confirms G4's L-19 clause, since the serializer's sole importer is its own test. ⟨W7.md · G4⟩

**W7.14 · ⟨PaletteSlugBar.md · superlative + KILL of L5-1⟩ — the correct answer already exists in the same directory, and the shared-slugify cure is KILLED** (cl.2). `demo/palettes/export/canonical.ts:49-71` refuses to slugify and composes typed filename stems, byte-exact-tested; its own comment records the decision ("no slugifier exists"). **Cure lock: X-W7 makes `canonical.ts` the shipped path — it must NOT introduce a shared `slugify` under `export/`.** L5-1's prescribed cure and its risk mechanism are killed by the record and upheld here. *Sharpens*: G4 GREEN clause, G6. ⟨PaletteSlugBar.md · A-7, kill #3, superlative⟩

**W7.15 · ⟨AdminFlaggedPanel.md · AF-31⟩ ≡ ⟨VersionHistoryDrawer.md · VHD-16⟩ — `dateFormat.ts`'s BOTH exports carry an unreachable `catch`** (cl.1). ECMA-402: `toLocaleString`/`toLocaleDateString` return `"Invalid Date"`, never throw — re-run by both seats. The honest-looking guard is decoration and the bad string ships to screen. `demo/palettes/browser/dateFormat.ts` is NOT in bounds. *Sharpens*: G7's failure-disposition table (a `catch` that cannot fire is a `DELETE` row, not a `LOG-ONLY-BY-RULING` row). ⟨AdminFlaggedPanel.md · AF-31⟩ ⟨VersionHistoryDrawer.md · VHD-16⟩

**W7.16 · ⟨AdminFlaggedPanel.md · AF-18⟩ — one provenance format** (cl.1). `formatDate` is month+day only, in the one queue whose only ordering signal is recency; the sibling uses `formatTime` for the same class of datum. Ambiguous by a year. Same file as W7.15; one edit. ⟨AdminFlaggedPanel.md · AF-18⟩

**W7.17 · G7's denominator is larger than 31, and the corpus names the missing terms** (cl.1). ⟨ActionFeedback.md · AF-8⟩: the feature's only failure channel is wired to **5 of ~38 failure paths**; `onRename` and `onVote` swallow to `console.warn` in `useBrowsePalettes.ts` while their siblings return a result. The wave's table must be authored over the *failure paths*, not over the `console.warn` occurrences — the occurrence count is the floor, not the set. ⟨ActionFeedback.md · AF-8⟩ ⟨W7.md · G7⟩

**W7.18 · ⟨AdminTagsPanel.md · ATP-9⟩ — create and delete have no pending, no failure, no result; only load has one; refresh speaks two grammars in one suite** (cl.1). `useAdminTags.ts:80-82/:93-95` = `console.warn` and nothing; the composable interface `:15-27` has no create/delete error member at all. The *type* is the defect, not the handler. ⟨AdminTagsPanel.md · ATP-9⟩

**W7.19 · ⟨AdminNamesPanel.md · D-1/C-4⟩ — write failures are invisible and the buttons are ungated, so a double-click double-POSTs and the losing 404 dies in `console.warn`** (cl.1). Full error idiom for reads, none for writes; `:disabled`/`:loading` = 0. ⟨AdminNamesPanel.md · D-1/C-4⟩

**W7.20 · ⟨AdminFlaggedPanel.md · AF-5⟩ — both mutation catches are `console.warn` and nothing else, while glass-ui 7 ships `loading?: boolean` on Button, used zero times** (cl.1). `:88-90`, `:100-102`. The categorical "no live region" claim is KILLED at the record (PaginationBar has one) — carry the correction with the row. ⟨AdminFlaggedPanel.md · AF-5⟩

**W7.21 · ⟨wb-generate-pane.md · GEN-6⟩ + ⟨ActionFeedback.md · AF-20⟩ — the discriminated `CopyResult` is discarded at every fallible copy seat, and the house pattern is in-tree** (cl.1). Producer documents `CopyResult` as the honest primitive "for consumers that own their own feedback"; `App.vue:362` is the pattern; PaletteCard has two `void writeClipboard(...)` sites. ⟨wb-generate-pane.md · GEN-6⟩ ⟨ActionFeedback.md · AF-20⟩

**W7.22 · ⟨FlagReportDialog.md · A-3⟩ — every API failure renders as success, on a moderation surface** (cl.1). `report()` swallows all (`useAdminFlagged.ts:126-130`); the host closes unconditionally (`BrowsePane.vue:298-299`); 401/400/404/own-palette/409 are all live server paths. ⟨AdminFlaggedPanel.md · AF-52⟩ is the same identity from the panel end (the `{flagged} | undefined` return discarded at the call site) — one row, two witnesses. `FlagReportDialog.vue` is NOT in bounds; `BrowsePane.vue` is. ⟨FlagReportDialog.md · A-3⟩ ⟨AdminFlaggedPanel.md · AF-52⟩

**W7.23 · ⟨MigratePalettesDialog.md · A-7 + A-26⟩ — the surface is destroyed before the operation begins, and N serialised POSTs run behind a closed dialog with no tally** (cl.1). `:69-72` closes before the emit; every failure terminates at `console.warn`. **A-26's cure shape is named: the tally becomes the visible result** X.W7 scope 8 demands. Not in bounds. ⟨MigratePalettesDialog.md · A-7, A-26⟩

**W7.24 · ⟨AdminFlaggedPanel.md · AF-51 + AF-53⟩ — an expired token renders as a backend outage, and singleton state survives unmount** (cl.1). api 401/403 → `ApiProblem.message` → the FIXED sentence "The flag queue is unreachable."; re-entering the route re-requests the stale `page` and paints the previous visit's rows as live. Both compound the AF-28 trap (W7.60). ⟨AdminFlaggedPanel.md · AF-51, AF-53⟩

### X.W7.c — palette specimen and the arbitrary-N law (W7.md §5.c; G8–G12)

**W7.25 · ⟨PaletteCardGrid.md · PG-1 + PG-2⟩ — first-drag order corruption and filtered-drag; the named-addition rider is the record's most load-bearing line** (cl.2). PG-1 is a BLOCKER. **Cure lock (verbatim in force): the reorder cure must carry the named-addition rider** — a cure that fixes the first-drag index without it re-opens the filtered case. No X-W7 gate covers drag order today; see §Gates N-7. ⟨PaletteCardGrid.md · PG-1, PG-2⟩

**W7.26 · PC-7 ≡ ⟨PaletteColorStrip.md · PCS-2⟩ ≡ ⟨PalettesPane.md · PP-11⟩ ≡ ⟨BrowsePane.md · B1⟩ — the strip is outside BOTH arms of the demo's colour-surface roster** (cl.1). Corroborated from a fifth seat: ⟨wb-mix-resultdisplay.md · MR-18⟩ ("a SIBLING of `.swatch-row`, unreached by `.swatch-row > *`", `foundation.css:679-694` / `:830-841`). BLOCKER-class by identity, grade held at PC-7. One row, five witnesses. ⟨PaletteCard.md · PC-7⟩ ⟨wb-mix-resultdisplay.md · MR-18⟩ ⟨PreviewStrip.md · PS-3⟩

**W7.27 · ⟨PaletteColorStrip.md · PCS-1⟩ — WEIGHT_FLOOR renormalisation undoes the documented 8% floor** (cl.1). This is G10's `Math.max(100 / n, 0.5)` witness read from the other end: the floor the code documents is not the floor the render produces. *Sharpens*: G10's colour fixtures at `N = 50, 200, 201` and the `n ≥ 13` flattening clause. ⟨PaletteColorStrip.md · PCS-1⟩ ⟨W7.md · G10⟩

**W7.28 · ⟨PaletteCardSkeleton.md · PCS-1⟩ — BLOCKER: every prop and custom property on the skeleton addresses a dead glass-ui 7.0.0 API** (cl.1). Corroborated at ⟨AdminTagsPanel.md · ATP-36⟩ (`surface="glass"` / `variant="breath"` on `<Skeleton>` are inert fallthrough attributes; d.ts is `{class}` only) with identity to motion-quarantine M-12/M-14 (**TRUE rows — carryable**). *Sharpens*: G20 (the cure must land on both components) and G3. ⟨PaletteCardSkeleton.md · PCS-1⟩ ⟨AdminTagsPanel.md · ATP-36⟩

**W7.29 · ⟨PaletteCardSkeleton.md · PCS-10⟩ — CLIP-IS-LOAD-BEARING caveat** (cl.2). The clip the cure would remove is doing work. Any G9/G20 geometry cure that deletes it must replace the containment it provides, not merely delete it. Carried verbatim as a lock on X.W7.c and X.W7.g. ⟨PaletteCardSkeleton.md · PCS-10⟩

**W7.30 · ⟨PaletteCardSkeleton.md · PCS-12⟩ — the Extract seat's both-branches-false state** (cl.1). Couples to G20's `ExtractWorkbench.vue:163-166` caption deletion: the caption and the seat are one composition. ⟨PaletteCardSkeleton.md · PCS-12⟩

**W7.31 · ⟨PaletteCardSwatches.md · PS-34⟩ — a third device class has no panel at all** (cl.1). Neither hover nor touch branch serves it. *Sharpens*: G9's 390×844 cell is necessary but not sufficient; the fold books the third class as cl.3 (MEASURE-AT-OPEN). ⟨PaletteCardSwatches.md · PS-34⟩

**W7.32 · ⟨PaletteCardSwatches.md · PS-18⟩ — the slug-pill opts out of `prefers-contrast`** (cl.1). Same family as ⟨AdminTagsPanel.md · ATP-8⟩ (a consumer utility actively DEFEATING the producer's contrast arm) and ⟨wb-mix-resultdisplay.md · MR-34⟩ (the well recipe unreachable by the border bump). Three surfaces, one class; X-W10 owns the survivor recipe — **cite, don't fork** (EAS-12's law). ⟨PaletteCardSwatches.md · PS-18⟩ ⟨wb-mix-resultdisplay.md · MR-34, K-19⟩

**W7.33 · SH-1 ≡ PC-2 ≡ PS-1 · SH-2 ≡ PC-3 ≡ ⟨CurrentPaletteEditor.md · A-1⟩ → CC-044 · SH-3 = canon** (cl.2). `.floating-panel` matches zero CSS rules anywhere (1 use + 2 prose comments repo-wide; 0 in the entire glass 7.0.0 dist), so the teleported hover panel is unstyled; `tag="button"`, `:aria-label`, `@click.stop` and the entire `PopoverTrigger as-child` contract are silently discarded by the producer; and **VISUAL-CONSTITUTION.md:102 forbids the concept by name** — "The card body owns no … hover-only swatch-action path". **Cure lock: SH-3 means the cure is SUBTRACTION under canon, not a repair of the panel.** CC-044 is the atomic cut and is BLOCKED-ON CC-003's Glass ≥8 trigger; **no pre-8 wrapper.** ⟨SwatchHoverMenu.md · SH-1, SH-2, SH-3⟩ ⟨wb-mix-sourceselector.md · MSS-1⟩ ⟨CurrentPaletteEditor.md · A-1⟩

**W7.34 · ⟨SwatchHoverMenu.md · SH-10..SH-13⟩ — four promoted rows, two of them named "the cure rider every axis's cure needs"** (cl.2). SH-10: PaletteCard destructures `useHoverPopover()` **without `close`** and hand-writes `openPopoverIndex.value = null` in all three handlers. SH-11: `PANEL_LAYOUT`'s `p-1.5` never paints on the touch branch. SH-12: the touch panel is an accessible-name-less `role="dialog"` — glass strips any consumer `role`. SH-13: the two paths open on **opposite sides** (`side:"bottom"` vs `offsetY = -42`). Any SH-1/SH-2 cure that does not carry SH-12 and SH-13 ships a nameless dialog on the wrong side. ⟨SwatchHoverMenu.md · SH-10..SH-13⟩

**W7.35 · SH-16 ≡ PC-23 ≡ ⟨CurrentPaletteEditor.md · C-12⟩ — `useLeaveTimer` (17 lines) registers no `onScopeDispose`/`onUnmounted` anywhere in the cluster** (cl.1). A leave scheduled within 250 ms of unmount fires against a disposed scope. One identity, three witnesses; the composable is NOT in bounds. ⟨SwatchHoverMenu.md · SH-16⟩ ⟨CurrentPaletteEditor.md · C-12⟩

**W7.36 · SH-24 ≡ PS-28 · SH-27 — the spread re-renders the whole swatch list per hover-position write, and `<Teleport to="body">` is unconditional inside the hover branch** (cl.1). One Teleport + body anchor **per swatch per hover-capable render**. ⟨SwatchHoverMenu.md · SH-24, SH-27⟩

**W7.37 · ⟨CurrentPaletteEditor.md · C-9-as-rescoped⟩ ≡ ⟨wb-mix-sourceselector.md · MSS-3⟩ ≡ ⟨SwatchHoverMenu.md · SH-7⟩ — `${color}::${i}` puts the index inside the key identity; the cure is TWO-SITE** (cl.2). `useSwatchActions.ts:45-53` (closure state, **not** module state — K-8/K-9 kill that reading) and `MixSourceSelector.vue:79-98`. Any non-tail removal re-mints every survivor's key, TransitionGroup tears the rack down, and `.vj-enter-move` is unreachable. Root cause: `SelectedColor { css, source }` has no identity. **Cure lock (MSS-3, verbatim in force): "the TWO-SITE identity cure, carrying MSS-16 as a rider — the `.swatch-row` positioning fix must land in the same wave or the cure unmasks a second defect in three components."** Both sites are in X-W7's reach (`MixSourceSelector.vue` in bounds; `useSwatchActions.ts` is not — §BoundsDelta). ⟨wb-mix-sourceselector.md · MSS-3, MSS-16⟩

**W7.38 · MSS-16 ≡ ⟨wb-mix-resultdisplay.md · MR-35⟩ — the shared `.swatch-row` leave recipe absolutely-positions leavers with no positioned containing block** (cl.2 + cl.3). `utils.css:177-179`; no consumer establishes a positioned ancestor; Vue writes no coordinates to leaving elements (runtime-dom read); Flexbox L1 §4.1 resolves the abspos child *as if it were the sole flex item* — the leading edge, not the former slot. **Sequencing obligation (MR-35, verbatim): measure the rendered jump in the two LIVE consumers (`MixSourceSelector`, `CurrentPaletteEditor`) BEFORE the MR-4/MSS-3 cure lands, not after. Fix the recipe ONCE — never per consumer.** DISSENT preserved: r8-LC declined to rule the mechanism from source ("engine-dependent"); the adjudicator ruled it spec-certain with the magnitude live. If any target engine is shown non-conformant, the mechanism reverts to r8-LC's caution. ⟨wb-mix-resultdisplay.md · MR-35, DISSENT 1⟩ ⟨wb-mix-sourceselector.md · MSS-16⟩

**W7.39 · ⟨wb-mix-sourceselector.md · MSS-4⟩ — button-inside-button at the palette-card selection register, with a CURE-SAFETY RIDER** (cl.2). `MixSourceSelector.vue:246-268` wraps `<PaletteCard>` in a native `<button :aria-pressed>`; the card's menu trigger is an unconditional real `<button>` and `role="article"` sits inside a button — against the child's own root contract. **Rider (K-3, verbatim): the isolation that keeps the menu click from toggling selection is the demo's own `@click.stop` at `PaletteCard.vue:82`, NOT reka-ui — a cure that moves the seat inside the card believing reka guarantees isolation re-opens the double-fire.** ⟨wb-mix-sourceselector.md · MSS-4, K-3⟩

**W7.40 · ⟨wb-mix-sourceselector.md · MSS-9⟩ — the ordered N-operand rack has no reorder affordance, and the cure is SEQUENCED AFTER MSS-3** (cl.2). Canon specifies the full grammar twice (VC:202 add/remove/reorder; VC:131 the Space-grab/arrow/announce protocol). Index keys make reorder unanimatable and unannounceable — MSS-3 is the stated prerequisite. Couples to W7.25 (PG-1): two reorder surfaces, one law. ⟨wb-mix-sourceselector.md · MSS-9⟩

**W7.41 · ⟨wb-mix-sourceselector.md · MSS-18⟩ ≡ ⟨CurrentPaletteEditor.md · C4-1⟩ — one specimen, three silhouettes: the seed contract is broken and the in-file comment is self-refuting** (cl.1). Chips carry NO seed (default `""`), the ghost carries `seed="mix-add-slot"`, dropdown swatches `palette-${slug}-${ci}`; the producer's published ghost contract says the ghost of `color + seed` traces the SAME outline the solid of that seed fills. Second file, second self-refuting comment. *Sharpens*: G12 (specimen purity is identity as well as import-graph). ⟨wb-mix-sourceselector.md · MSS-18⟩ ⟨CurrentPaletteEditor.md · C4-1⟩

**W7.42 · ⟨wb-mix-sourceselector.md · MSS-25⟩ ≡ PC-25 — Mix's `:css-color=""` defeats `?? EMPTY_PALETTE_SWATCH`** (cl.1). Contract violation, not a live crash (C's R-6 negative carried). Banked verbatim; not re-booked. ⟨PaletteCard.md · PC-25⟩

**W7.43 · ⟨PaletteCardMeta.md · PM-9⟩ — the vote button is dead: `@vote` listeners = exactly 1, at AdminUsersPanel** (cl.1). *Sharpens*: G12 (the vote `<button>` at `PaletteCardMeta.vue:43-49` is one of the three interactive descendants G12 counts) and G13 (vote is a named mutation row with no reachable owner). ⟨PaletteCardMeta.md · PM-9⟩

**W7.44 · ⟨PaletteCardMeta.md · PM-10⟩ — split-brain provenance** (cl.1). Two sources disagree about where a card's identity came from. Couples to ⟨AdminNamesPanel.md · ADJ-1⟩ (W7.66): provenance is broken at the DTO layer too. ⟨PaletteCardMeta.md · PM-10⟩

**W7.45 · ⟨PaletteCardMenu.md · AP-1⟩ — constitutional abrogation, VC:102** (cl.1). Canon-level, not stylistic; the menu's existence in the card body is what VC:102 forbids. Identity with SH-3 (W7.33): one canon clause, two seats. ⟨PaletteCardMenu.md · AP-1⟩

**W7.46 · ⟨PaletteCardMenu.md · AP-2⟩ — `@click.prevent` kills the submenu on click and on tap** (cl.1). The most-used affordance on the card is inoperable by the two most common input modes. ⟨PaletteCardMenu.md · AP-2⟩

**W7.47 · ⟨PaletteCardMenu.md · AP-6 + K-10⟩ — BOTH destructive verbs are unconfirmed, and "the admin branch is already confirmed" is KILLED** (cl.1). K-10 removes the last mitigation the corpus offered. *Sharpens*: G14 — the four seats G14 names are a floor; the card menu is a fifth. ⟨PaletteCardMenu.md · AP-6, K-10⟩

**W7.48 · ⟨PaletteCard.md · PC-11⟩ ≡ ⟨wb-mix-pane.md · DB-2⟩ — button-in-button, and **zero** of PaletteCard's 16 emits are wired** (cl.1). Sixteen declared emits, none consumed. *Sharpens*: G12 (a specimen with 16 dead emits is not a specimen) and G13. ⟨PaletteCard.md · PC-11, R-6⟩

**W7.49 · ⟨PaletteCard.md · PC-35⟩ + ⟨PaletteCardMeta.md · PM-13⟩ — the post-hoc-alpha census, and the adopted discipline that declines the house idioms** (cl.2). PM-13 is the *discipline* row: the cure declines the house alpha idioms rather than re-applying them. Same species at ⟨EmptyState.md · ES-32⟩, ⟨ErrorBoundary.md · EB-28⟩ (2 sites, demoted at R-6) and ⟨wb-mix-animationcanvas.md · MX-42⟩. Under X-W10 canon. ⟨PaletteCard.md · PC-35⟩ ⟨PaletteCardMeta.md · PM-13⟩

**W7.50 · ⟨PaletteCard.md · PC-42⟩ — a registry repair booked NO-WAVE-OWNER at its own record** (cl.1). Carried forward unresolved; the fold does not re-home it because the repair surface is the registry, not the tree. ⟨PaletteCard.md · PC-42⟩

**W7.51 · ⟨EmptyState.md · ES-9⟩ — `role="list"` is malformed in EVERY state, and in the empty state EmptyState becomes the list's only owned child** (cl.1). `PaletteCardGrid.vue:3` declares `role="list"`; populated children are `role="article"` cards. *Sharpens*: G12 (the specimen's role posture) and G19 (the empty plate's). ⟨EmptyState.md · ES-9⟩

**W7.52 · ⟨EmptyState.md · ES-4⟩ — `dots` is a dead configuration axis LOCKED IN PLACE by a standing oracle** (cl.2). Default `true` at `:90`; consumers 0; unreachable through the only wrapper (`PaletteCardGrid:24-26/:38-44`). **The lock: `o9-shadow-palette.spec.ts` asserts the current shape, so deleting `dots` without re-ruling o9 in the same commit leaves the oracle inverted** — the identical obligation G20 states for the plate. One re-ruling, two rows. ⟨EmptyState.md · ES-4, ES-19⟩ ⟨W7.md · G20 GREEN clause⟩

**W7.53 · ⟨EmptyState.md · ES-5⟩ — canon names `EmptyPaletteMark`; it does not exist, so the mark is hand-rolled with per-instance sizing and a non-scaling stroke** (cl.1). VC:186 names the primitive verbatim. The dash-token limb is KILLED (K-5) — carry the kill with the row. ⟨EmptyState.md · ES-5, K-5⟩

**W7.54 · ⟨AdminFlaggedPanel.md · AF-9⟩ — the loading shadow is a single-tier grammar for a two-tier row, at `v-for="i in 2"` against `pageSize = 20`; and it must NOT ride X-W8's cure** (cl.2). The record states the exclusion explicitly. Call-site shape and count are X-W7's; the shared skeleton anatomy is not. ⟨AdminFlaggedPanel.md · AF-9⟩

**W7.55 · ⟨AdminListItem.md · AL-M6⟩ — four Admin routes ship four different primary-identity registers under a one-anatomy canon; booked "X-W7 (rider — surfaces owned, unification unclaimed)"** (cl.1). The five panels ARE in bounds; `AdminListItem.vue` is NOT. The unification therefore has a home for its call sites and no home for its anatomy. See §BoundsDelta B-6. ⟨AdminListItem.md · AL-M6, C-3, AL-M3, AL-M8, AL-M10⟩

**W7.56 · ⟨AdminNamesPanel.md · M-LC2⟩ — the panel truncates the very string the moderator judges** (cl.1). `truncate`, no `title` (grep 0), no expand — against the repo's own 100-char fixture stressor; all three axes recorded the truncation as designed success. Same identity at ⟨AdminFlaggedPanel.md · AF-49⟩ (the delete label interpolates a name only ever seen clipped) and ⟨AdminListItem.md · AL-M3⟩. ⟨AdminNamesPanel.md · M-LC2⟩

**W7.57 · ⟨VersionHistoryDrawer.md · VHD-21⟩ + ⟨AdminFlaggedPanel.md · AF-41⟩ — four parallel "render palette colours" implementations, one of them a verbatim fork** (cl.1). The drawer's swatches are a hand-rolled second species (anonymous to AT, not `aria-hidden`) with a verbatim fork at `AdminFlaggedPanel.vue:51-58`, while the canonical `PaletteColorStrip` carries the fix and is used by none of the three hand-rolls. Fifth mint: ⟨PreviewStrip.md · PS-12⟩ (`GenerateControls.vue:16/:20` imports BOTH strip species and renders them on one screen). *Sharpens*: G12 — the specimen is the consolidation target. ⟨VersionHistoryDrawer.md · VHD-21⟩ ⟨AdminFlaggedPanel.md · AF-41⟩ ⟨PreviewStrip.md · PS-12⟩

**W7.58 · ⟨wb-generate-pane.md · GEN-26⟩ — GenerateControls imports a sibling feature's card internals** (cl.1). `PaletteColorStrip` from `palettes/browser/card` at `:16`, while its true shared sibling lives in `color-session`. Booked "X-W7 (palettes tree owner) else NO-WAVE-OWNER" — X-W7 owns `browser/card/index.ts`, so the seam is decidable here even though `GenerateControls.vue` is not in bounds. ⟨wb-generate-pane.md · GEN-26, GEN-20⟩

**W7.59 · ⟨AdminAuditPanel.md · AAP-1⟩ — the hand-rolled row is the byte-prefix of `AdminListItem.vue:11` **minus** the `min-w-0` that `AdminListItem.vue:6-10` documents as the S.W5-12/F-1 cure** (cl.1). The grid track blows on guaranteed input. The comment naming the cure is in the file the copy was taken from. *Sharpens*: G9 (the same `min-w-0` law, a second surface). ⟨AdminAuditPanel.md · AAP-1⟩

### X.W7.d — entity inspector and CRUD ownership (W7.md §5.d; G13)

**W7.60 · Δ-1 ≡ ⟨AdminPane.md · C-1⟩ ≡ D-1 ≡ L-19 ≡ C-2 — BLOCKER: the prune confirm sizes a server-global irreversible delete from the SEARCH-FILTERED list** (cl.1, one row for life). Five links re-verified at HEAD: `AdminUsersPanel.vue:241` computes `emptyCount` over the filtered `users` prop; `AdminPane.vue:28` binds `pm.filteredAdminUsers` while `:33` binds `total-users` to the UNFILTERED page; the dialog quotes the filtered number. Compounded by W7.7 (the shared `searchQuery`), which makes an *unrelated pane's* query the divisor. Both files in bounds. ⟨AdminUsersPanel.md · Δ-1⟩ ⟨AdminPane.md · C-1⟩

**W7.61 · L-5 ≡ ⟨AdminPane.md · D-03/C-4⟩ ≡ ⟨AdminFlaggedPanel.md · AF-1⟩ ≡ ⟨AdminNamesPanel.md · C-5/L-10⟩ ≡ ⟨AdminTagsPanel.md · ATP-12⟩ — BLOCKER: an unauthenticated stranger is told, as fact, that the collection is empty, and is handed operable controls** (cl.1, one identity across all five panels). `useAdminUsers.ts:54-56` returns before touching `loadingUsers`/`usersLoadError` (never-attempted ≡ loaded-empty); `useAdminFlagged.ts:60-61` `if (!token) return` BEFORE `loading=true` ⇒ the triple `(false, null, [])` ⇒ the TRUE-EMPTY plate; AdminNames renders "· QUEUE CLEAR ·" — a false moderation fact — over a dead `meta:{admin:true}` guard nothing reads; AdminTags publishes "0 tags" over skeletons and over the error plate. **The parent codifies the prohibiting law (A-3) in a comment 30 lines away** (`AdminPane.vue:117-131`). This is the wave's single highest-value row: one cure, five surfaces, all in bounds. ⟨AdminUsersPanel.md · L-5⟩ ⟨AdminPane.md · D-03/C-4⟩ ⟨AdminFlaggedPanel.md · AF-1⟩ ⟨AdminNamesPanel.md · C-5/L-10⟩ ⟨AdminTagsPanel.md · ATP-12⟩

**W7.62 · ⟨AdminUsersPanel.md · Δ-7⟩ ≡ C-3 ≡ C-16 ≡ L-20 — pagination, search and sort are theatre** (cl.1). Client declares and forwards limit/offset/q; the sole call is `listUsers(token, 50)`; `res.total` discarded; `q` never sent; sort reorders an arbitrary page; an off-page query renders ROSTER CLEAR **with zero requests**. Same species at ⟨AdminNamesPanel.md · L-7/D-10⟩ (pagination envelope discarded, silent truncation at 50, search filters the loaded page only) and ⟨AdminTagsPanel.md · ATP-17⟩ (no filter, no pagination, no ordering, no cap; the endpoint returns the whole collection). ⟨AdminUsersPanel.md · Δ-7⟩

**W7.63 · ⟨AdminUsersPanel.md · Δ-10⟩ — nested-interactive rows** (cl.1). `:85-86` `role=button`/`tabindex` on a row CONTAINING two Buttons; WAI-ARIA 1.2 forbids it (button ⇒ presentational children). **The `:344-345` target guard and the `:106 @click.stop` exist solely to contain the nesting — they die with it.** Native disclosure is the cure. ⟨AdminUsersPanel.md · Δ-10⟩

**W7.64 · ⟨AdminUsersPanel.md · Δ-11⟩ + ⟨AdminPane.md · "the prune count's only truth is a 3-second flourish"⟩ — the destructive receipt is announced to nobody, and a later beat is truncated by an earlier timer** (cl.1). Bare span in a Transition, zero role/aria-live in the file; `:308` arms a NEW 3 s timer without clearing the last; `aria-label` on role-generic divs (ARIA 1.2 prohibits). VC:101 verbatim: a transient flourish is not an operation state. Identity with ⟨ActionFeedback.md · AF-1/AF-2/AF-3⟩ — same defect, different surface, and AF-3's clock-inheritance is the same timer bug. *Sharpens*: G13's "visible result" clause — a 3 s unannounced flourish is not one. ⟨AdminUsersPanel.md · Δ-11⟩ ⟨ActionFeedback.md · AF-1, AF-2, AF-3⟩

**W7.65 · ⟨AdminUsersPanel.md · Δ-13⟩ — Refresh never invalidates the open disclosure** (cl.1). Nothing watches the users prop or `loading`; an open row renders GEN-1 after Refresh while re-expand fetches GEN-2. Rides G13's ownership module (reload-on-refresh is a module write path). ⟨AdminUsersPanel.md · Δ-13⟩

**W7.66 · ⟨AdminNamesPanel.md · ADJ-1⟩ — the demo DTO and the wire disagree on the provenance field's NAME, and the cure is BLOCKED until the DTO is re-derived** (cl.2). Server DTOs carry `proposerSlug`; the demo type does not. **Binding sequencing edict, carried verbatim in force: D-7's cure (render actor/provenance/slot) is BLOCKED by ADJ-1 until the DTO is re-derived against the wire.** Same class at ⟨AdminAuditPanel.md · AAP-4/AAP-5⟩ — the client type lies in BOTH directions (`actorSlug` dropped from a seven-field server event; `ipHash` **required client-side and never on the wire at all**). `demo/palettes/types.ts` is NOT in bounds. ⟨AdminNamesPanel.md · ADJ-1, D-7⟩ ⟨AdminAuditPanel.md · AAP-4, AAP-5⟩

**W7.67 · ⟨AdminUsersPanel.md · L-1 (RESCOPED BLOCKER→MAJOR)⟩ + ⟨AdminPane.md · L-7/C-9/D-13⟩ — a composable owns a component INSTANCE; five imperative pokes; AdminPane exists partly to wire it** (cl.1). `useAdminUsers.ts:99/:121/:136/:150` + `usePalettePorts.ts`; every `?.` silently discards the result. **The BLOCKER→MAJOR retirement is NOT overturned** (worker-O attacked it with the r4 cycle evidence and could not reach the corruption arm); the id is preserved per anti-rename. One new arm folded: the `remotePalettes` divergence — staleness, not corruption, same cure. ⟨AdminUsersPanel.md · L-1⟩ ⟨AdminPane.md · L-7⟩

**W7.68 · ⟨AdminPane.md · L-2⟩ + ⟨AdminPane.md · L-6⟩ — 12 forwarded port members into a port-injecting child, and a 34-member adminPort over four domains** (cl.1). `AdminPane.vue:28-40` forwards 13 bindings, 12 `pm.*`-sourced, into a child that ALREADY injects the same port at `AdminUsersPanel.vue:200/:234/:361`; two boundary idioms fifteen lines apart. Member count re-derived: 14 users + 13 queue + 7 misc = **34 exact**; the RF-15 header claims dissolution and `:245` re-aggregates. ⟨AdminPane.md · L-2, L-6⟩

**W7.69 · `cssColorOpaque` is a REQUIRED prop never read — one identity, four witnesses** (cl.1). `AdminNamesPanel.vue:140` sole occurrence; supplied at `AdminPane.vue:52` from `inject(CSS_COLOR_KEY)!` at `:94` — an injected value prop-drilled OUT of an injection built to avoid prop-drilling. Two-line delete. ⟨AdminNamesPanel.md · D-13/C-11/L-4⟩ ⟨AdminPane.md · L-8/C-7⟩ ⟨AdminListItem.md · AL-X2⟩

**W7.70 · ⟨AdminAuditPanel.md · AAP-20⟩ — the debounce timer outlives the panel and mutates the singleton port** (cl.1). `:110-117`, no `onUnmounted`/`onScopeDispose` in the whole file; a pending 300 ms debounce past unmount writes `audit.page.value = 1` and fires a network call into app-scoped port state. Second uncleaned timer at ⟨AdminPane.md · missed reader 2⟩ (the prune `setTimeout`, ≡ Δ-11). `useAdminAudit.ts` is NOT in bounds. ⟨AdminAuditPanel.md · AAP-20⟩

**W7.71 · ⟨AdminFlaggedPanel.md · AF-27⟩ — delete does not clear the queue, and the service docstring CLAIMS a cascade the body does not perform** (cl.1). `deleteByPaletteSlug(slug, session)` sits unused in the same repository module. The lie is in the code's own comment. ⟨AdminFlaggedPanel.md · AF-27⟩

**W7.72 · ⟨AdminFlaggedPanel.md · AF-28⟩ — emptying the last page strands the panel forever** (cl.1). Mutations decrement `total`, `pageCount` collapses, PaginationBar unmounts (`v-if="pageCount > 1"`), `page` stays high, refresh re-requests the empty offset forever. ⟨AdminFlaggedPanel.md · AF-28⟩

**W7.73 · NO REQUEST IDENTITY — one identity, five witnesses** (cl.1). No sequence token, no AbortController, unawaited loaders, a boolean `loading` cleared by whichever request settles first ⇒ out-of-order paints the wrong page. ⟨AdminFlaggedPanel.md · AF-29⟩ ⟨VersionHistoryDrawer.md · VHD-9 (cure relocated per R-5/K-12)⟩ ⟨AdminTagsPanel.md · ATP-14 (and the sibling's one-prop guard `:disabled="loading"` sits three files away unadopted)⟩ ⟨AdminNamesPanel.md · M-LC3 (demoted; narrow window)⟩ ⟨VersionHistoryDrawer.md · VHD-13⟩. ⟨AdminFlaggedPanel.md · AF-29⟩

**W7.74 · ⟨AdminFlaggedPanel.md · AF-38 + AF-39⟩ — one composable owns two audiences, and offset pagination is duplicated byte-for-byte, with a SEQUENCING edict** (cl.2). `useAdminFlagged` holds both the token-gated moderation queue and the area's one **unauthenticated** write path (`report`, `:119-131`) in a single shared instance a browsing visitor reaches. AF-39: `useAdminFlagged` `:49-57/:105-117` is byte-identical to `useAdminAudit`, while `PaginatedResponse<T>` and the `useFilteredList` idiom already exist in-directory. **AF-39 is sequenced after the M-L extraction** per its own record. Neither composable is in bounds. ⟨AdminFlaggedPanel.md · AF-38, AF-39⟩

**W7.75 · ⟨VersionHistoryDrawer.md · VHD-1⟩ — BLOCKER, re-proven by execution: the first open never fetches** (cl.1). `node repro-L1-first-open.mjs` → `after FIRST open → loadVersions calls = 0`; the panel asserts "— 0 versions" over an empty body until closed and reopened. ⟨VersionHistoryDrawer.md · VHD-1⟩

**W7.76 · ⟨VersionHistoryDrawer.md · VHD-4 + VHD-6 + VHD-11⟩ — after a revert the list is never refetched; revert is offered to users who provably cannot use it; version identity is invented from render position** (cl.1). `loadVersions` has exactly two call sites, neither on the revert path; `PaletteCardMenu.vue:94` gates Versions on `!isLocal && versionCount > 1` with **no `isOwned`** while its neighbours gate on it; `v{{ total - i }}` is rendered while the record carries a real server `depth` the component never reads. ⟨VersionHistoryDrawer.md · VHD-4, VHD-6, VHD-11⟩

**W7.77 · ⟨VersionHistoryDrawer.md · VHD-8 + VHD-10⟩ — the paging state machine exists twice and the shipped copy is the broken one; offset paging over non-unique `createdAt` re-serves rows** (cl.1). `useVersionHistory.ts:65-86` is line-for-line the panel's copy; 7 of its 10 exported members have zero consumers. `repository/paletteVersion.ts:22-27` has no `_id` tiebreak, so a duplicate renders under two ordinals. `useVersionHistory.ts` IS in bounds. ⟨VersionHistoryDrawer.md · VHD-8, VHD-10⟩

**W7.78 · ⟨VersionHistoryDrawer.md · VHD-35⟩ ≡ ⟨FlagReportDialog.md · A-2⟩ — the subject is never reset, so a KeepAlive'd pane retains the drawer plus a full `Palette` and up to N version records for the session** (cl.1). `versionPalette` never nulled; `flagPalette` set at `BrowsePane.vue:292` and never cleared (grep). Same identity, two dialogs, one host. `BrowsePane.vue` is in bounds; neither dialog is. ⟨VersionHistoryDrawer.md · VHD-35⟩ ⟨FlagReportDialog.md · A-2⟩

**W7.79 · ⟨AdminTagsPanel.md · ATP-19⟩ — "Tag" has four client homes and two unreconciled caches** (cl.1). An admin tag write leaves `TagEditPopover`'s catalog stale for the session; the one reconciliation mechanism is dead. `TagEditPopover.vue` is in bounds (X.W7.a) and `AdminTagsPanel.vue` is in bounds (X.W7.d/e) — the two ends are in the same wave and must be cured in one edit. ⟨AdminTagsPanel.md · ATP-19⟩

**W7.80 · ⟨AdminTagsPanel.md · ATP-10⟩ — `toLowerCase()` is mistaken for validation** (cl.1). `:70-74` sends `trim().toLowerCase()`; `schema.ts:28-32` demands `/^[a-z0-9-]+$/` + `max(30)`. The most ordinary human input violates the published contract invisibly. Identity with G10's `N_tags = 11` cell (a 400 with no visible failure path). ⟨AdminTagsPanel.md · ATP-10⟩

**W7.81 · ⟨AdminTagsPanel.md · ATP-11⟩ — branch ordering hides a successfully created tag behind a stale load error** (cl.1). Chain `:52 → :69 → :82 → :85`; `loadError` cleared only on a successful load, never by create; the always-rendered form stays operable above the error. Same shape at ⟨AdminNamesPanel.md · C-10⟩ (a failed refresh hides rows still in memory) and ⟨AdminFlaggedPanel.md · AF-4⟩ (error plate + stale interactive rows render together; the catch never clears `items`). ⟨AdminTagsPanel.md · ATP-11⟩

**W7.82 · ⟨AdminTagsPanel.md · ATP-29⟩ — `onMounted` under KeepAlive `:max` makes refresh-on-entry a function of LRU pressure** (cl.1). 6 desktop-left / 9 mobile vs 11 left keys; `PaneSlot.vue:120`; App.vue's own admin-eviction design note. `onActivated` is the correct hook and is unused. ⟨AdminTagsPanel.md · ATP-29⟩

**W7.83 · FILTERED-ZERO COSTUMED AS TRUE-EMPTY — one identity, five witnesses** (cl.1). ⟨EmptyState.md · ES-1⟩ (BLOCKER; `PalettesPane.vue:77` binds `pm.filteredSaved.value.length === 0` and the contradiction is **in the accessibility tree**) ≡ ⟨AdminAuditPanel.md · AAP-6⟩ (`:56` gates on `entries.length === 0` alone while filters are server-side and Action is exact equality over a closed verb set) ≡ ⟨AdminNamesPanel.md · D-5⟩ ("· QUEUE CLEAR ·" over a merely FILTERED queue) ≡ ⟨CurrentPaletteEditor.md · D4-04⟩ (one empty state, two meanings, measured over a non-empty library with `headerBadge "(1 saved)"`) ≡ ⟨AdminFlaggedPanel.md · AF-33⟩. Distinct from W7.61 (auth ≠ empty); both must be cured or the plate keeps lying in one of its two modes. ⟨EmptyState.md · ES-1⟩

**W7.84 · ⟨BrowsePane.md · M1 (P-1 cure)⟩ — the cure is one moved comment** (cl.1). Carried because it is the cheapest confirmed row in the pane and is trivially lost in a large wave. ⟨BrowsePane.md · M1⟩

**W7.85 · ⟨PalettesPane.md · PP-6⟩ — a corrupt store whitescreens the pane** (cl.1). Compounds ⟨AdminUsersPanel.md · Δ-12⟩ (rescoped from "white-screens" to "caught at panel granularity, console fully denied"; `:247-251` unguarded `slug.length`; ErrorBoundary replaces the whole console) — the two rows disagree about blast radius and both are right at their own surface. ⟨PalettesPane.md · PP-6⟩ ⟨AdminUsersPanel.md · Δ-12⟩

**W7.86 · ⟨AdminUsersPanel.md · Δ-2/C-21⟩ + ⟨AdminPane.md · missed reader 2⟩ — error ≠ empty is INVERTED on the destructive paths** (cl.1). `useAdminUsers.ts:188-191` catch → `return 0` → "No empty users to prune" — the **success register for a failed irreversible operation**; `:157-166` `loadUserPalettes` returns `[]` on failure → "No palettes."; five further ops swallow. ⟨AdminUsersPanel.md · Δ-2⟩

**W7.87 · ⟨AdminUsersPanel.md · Δ-15 + Δ-18⟩ — key homing, and three dead exports with 0/0/0 consumers** (cl.1). `:200` value-imports `ADMIN_PORT_KEY` from the 272-line wiring module while the repo owns the cure pattern (`color-session/keys.ts`, imported by the same file at `:187`); gate G-19 of MT-AU1 names `palettes/keys.ts`. Δ-18: `onImpersonate` is the sole reader of a live transport wrapper; **the deletion is the proof.** Same class at ⟨AdminFlaggedPanel.md · AF-54⟩ (dead widened surface: `pageSize` exported twice with zero external consumers, `badgeVariants` re-exported with zero consumers). ⟨AdminUsersPanel.md · Δ-15, Δ-18⟩

**W7.88 · ⟨AdminPane.md · "all five panels are statically imported"⟩ — the corpus's "three lazy sibling panels" is FALSE** (cl.1). `AdminPane.vue:79-85` are value imports; only AdminPane itself is async. First admin navigation fetches the whole five-panel transitive closure. Correction carried so no cure is authored against the false premise. ⟨AdminPane.md · missed, reader 2⟩

### X.W7.e — deliberate dismissal at destructive seats (W7.md §5.e; G14–G15)

**W7.89 · ⟨AdminTagsPanel.md · ATP-1⟩ — BLOCKER: one click of a hover-only glyph fires an unconfirmed, unbounded, cross-collection destructive write with no result surface** (cl.1). `AdminTagsPanel.vue:98-104` bare `<button>` → `:101 @click="tagsApi.deleteTag(...)"`. This is G14's most severe named seat. ⟨AdminTagsPanel.md · ATP-1⟩

**W7.90 · ⟨AdminTagsPanel.md · ATP-2⟩ — the delete control is invisible at rest, hover-gated, and on touch the invisible box remains hit-testable** (cl.1). `:99` verbatim `opacity-0 transition-all group-hover:opacity-100 … focus-visible:opacity-100`. **A confirm dialog alone does not cure this row**: the seat must also become visible. G14's network assertion passes with the invisible box intact — the fold books an added visibility clause (§Gates S-14). ⟨AdminTagsPanel.md · ATP-2, ATP-43⟩

**W7.91 · ⟨AdminFlaggedPanel.md · AF-2⟩ — BLOCKER: one click on the trash glyph soft-deletes another user's palette; no Dialog, no undo, no announced result** (cl.1). `:93-101` — while `AdminUsersPanel.vue:157-181/:263-333` gates the *same* operation. The asymmetry is inside one folder. ⟨AdminFlaggedPanel.md · AF-2⟩

**W7.92 · ⟨AdminUsersPanel.md · Δ-3/C-15⟩ — BLOCKER: the destructive confirm double-fires, and there is no idempotency key anywhere** (cl.1). `:283-286` fires the closure then closes; the closure is NEVER cleared (grep 0); the footer confirm `:175` has no `:disabled`; the dialog leaves by transition — hit-testable window measured at **271 ms chromium / 159 ms webkit**: two POSTs, one receipt. C-25 verified: **0 admin wrappers carry an idempotency key.** *Sharpens*: G14's e2e must assert **exactly one** request, not "no request before acceptance". ⟨AdminUsersPanel.md · Δ-3, C-25⟩

**W7.93 · ⟨AdminNamesPanel.md · D-2⟩ — Reject and Delete are irreversible, unconfirmed single-click commands with no undo and no post-fact observability** (cl.1), on the one Admin surface the canon names for dangerous confirmation, **while the sibling panel ships the exact mechanism**. The precondition ADJ-1 (W7.66) blocks the provenance half, not the confirm half. ⟨AdminNamesPanel.md · D-2⟩

**W7.94 · ⟨VersionHistoryDrawer.md · VHD-3 (demoted per R-2)⟩ — revert fires on a single activation with zero confirmation; the "irreversible" cell is KILLED (K-11)** (cl.1). Carry both halves: the seat needs a confirm; the *irreversibility* claim is refuted from the service source both readers cite. ⟨VersionHistoryDrawer.md · VHD-3, K-11⟩

**W7.95 · ⟨AdminFlaggedPanel.md · AF-44 + AF-49⟩ — N identically-named "Dismiss" buttons with no programmatic association to their palette, while the rarer destructive twin IS disambiguated** (cl.1). `:90` visible label only; the row has no role/labelledby; `:65` is a plain span. And `:97`'s delete label interpolates a name the moderator may only ever have seen clipped (W7.56). *Sharpens*: G15 — destructive naming is not only the delete-all control. ⟨AdminFlaggedPanel.md · AF-44, AF-49⟩

**W7.96 · ⟨AdminUsersPanel.md · Δ-19⟩ — two irreversible actions share one `Trash2` glyph** (`:119`/`:129`/`:176`) (cl.1). Statically certain member of the design-canon cluster; the remainder of Δ-19 is fleet-adopted, not statically decided. *Sharpens*: G15. ⟨AdminUsersPanel.md · Δ-19⟩

**W7.97 · ⟨PaletteCardMenu.md · AP-6⟩ is the FIFTH destructive seat and G14 names four** (cl.1). See W7.47. The gate's GREEN clause ("four seats confirmed") is arithmetically satisfiable while a fifth unconfirmed seat ships. Booked as a gate sharpening, not a new gate (§Gates S-14). ⟨PaletteCardMenu.md · AP-6⟩

### X.W7.f — display formatting facility (W7.md §5.f; G16–G18)

**W7.98 · G16's root emitter is confirmed and its consumer count is a floor** (cl.1). `src/css/grammar.ts:283-285` reaches 29 user-facing sites; `ColorSpaceSelector.vue:91` renders `rgb(154.029889788152 …` **seventeen times at once**, once per dropdown row. `ColorSpaceSelector.vue` is in bounds and shared with X-W6 (§4a: W6 writes first). The corpus adds no contradicting count. ⟨W7.md · G16⟩ ⟨wb-mix-configbar.md · MC-8/PIN 5 (label vocabulary, distinct subject)⟩

**W7.99 · ⟨wb-mix-configbar.md · MC-4⟩ — the caption:value type ratio INVERTS ~34% between pointer classes, by token construction** (cl.2). `.section-label` → `--type-caption` (viewport-fluid, `--ui-scale`-blind, `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = 14.384 px @1440 / 12.179 px @390) vs the trigger's `--control-text` (scale-riding). **OWNERSHIP CAVEAT, carried verbatim: `.section-label` is a producer utility — the cure is either a consumer move to the control register or a producer typography decision; no producer ask is mandated by this row.** Informational note on the standing glass-ui BH relay. ⟨wb-mix-configbar.md · MC-4⟩

**W7.100 · ⟨wb-mix-configbar.md · MC-3⟩ — four hard heights collide with the coarse-pointer register: `h-10` is dead at BOTH ends, `h-9` ×3 defeats the 60 px register / 44 px floor** (cl.1). `--control-h-md = max(2.5rem·--ui-scale, --control-floor)` = exactly 40 px at scale 1 (so `h-10` is a no-op) and max(60,44) = 60 px on coarse (so `h-10` is defeated); the SelectTrigger applies its size class with NO `min-block-size`, so the consumer's `h-9` WINS the merge → 36 px. `MixConfigBar.vue` is shared X-W6/X-W7. Same family: ⟨AdminFlaggedPanel.md · AF-7⟩ (`h-7` loses to `min-block-size: var(--control-h-sm)` = 36 px; ≈27×54 portrait lozenge on coarse) and ⟨VersionHistoryDrawer.md⟩'s `h-7` size-axis row (held by **X-W4**, `W4.md:127` — cross-edge). ⟨wb-mix-configbar.md · MC-3⟩ ⟨AdminFlaggedPanel.md · AF-7⟩

**W7.101 · ⟨AdminFlaggedPanel.md · AF-45⟩ — `text-caption` opts the LABEL out of the coarse-pointer scale while the box grows to 54 px** (cl.1). `--type-caption` is viewport-fluid only, never `--ui-scale`-multiplied. A 1.5× box around a 1.0× label. Same token, different consequence from W7.99 — one facility, two rows. ⟨AdminFlaggedPanel.md · AF-45⟩

**W7.102 · ⟨AdminAuditPanel.md · AAP-15⟩ + ⟨AdminTagsPanel.md · ATP-7/ATP-8⟩ — the declared hierarchy is flat by construction and the heading is the smaller rung** (cl.1). `text-small` and `text-mono-small` share `--type-small`; the Badge sets `text-[length:var(--control-text)]`; the Tags category heading is caption against small (ratio 0.877, re-derived from `clamp()` tokens twice) in the same mono family as the values it heads; and ATP-8's extra utility class actively DEFEATS the producer's contrast arm on a rung already booked under the 4.5:1 floor. ⟨AdminAuditPanel.md · AAP-15⟩ ⟨AdminTagsPanel.md · ATP-7, ATP-8⟩

**W7.103 · G17 is confirmed and widened: compaction has zero helpers repo-wide and the count row is also the G9 overflow row** (cl.1). `PaletteCardMeta.vue:22,32` adds ≈80 px of unshrinkable width at 4–5 digits — the same `shrink-0` chips G9 measures. **The two gates share one cure surface; a G17 cure that keeps the chips `shrink-0` re-opens G9.** ⟨W7.md · G9, G17⟩

**W7.104 · BIDI/RTL is a facility concern, not a styling one — one identity, four witnesses** (cl.1). ⟨AdminAuditPanel.md · AAP-25⟩ (machine strings un-isolated; no `<bdi>`/`dir` in the SFC; canon's two-place rule verbatim-verified by both readers) ≡ ⟨AdminFlaggedPanel.md · AF-48⟩ (`ml-auto` is physical, inside an audited RTL matrix) ≡ ⟨EmptyState.md · ES-24⟩ (the mark's 24/44/32 composition mirrors; the machine `detail` string has no LTR isolation) ≡ ⟨VersionHistoryDrawer.md · VHD-19⟩ (physical `right: 0` placement arms; `-left-px` marker with physical `rounded-r`). The formatting facility is where isolation belongs. ⟨AdminAuditPanel.md · AAP-25⟩

**W7.105 · G18's containment is correct and the corpus corroborates the reason** (cl.4 for X-W7, cl.1 as a boundary). `grammar.ts:285` is a library contract asserted by `test/v4-css-public.test.ts:86` and `test/v4-c1.test.ts:177,189` under the live parser proof gate; the additive `{ precision }` option on `serializeCssColor` is X-W9's. ⟨wb-gradient-codeeditor.md · A-27⟩ independently reaches the same seam from the parser end (`parsePickerColor` throws on ANY rejection; six call sites, five guard postures). **X-W7 must not touch `src/`;** the row is recorded so the two waves stay unconflated. ⟨W7.md · G18⟩ ⟨wb-gradient-codeeditor.md · A-27⟩

### X.W7.g — text abrogation and the ShadowPalette plate (W7.md §5.g; G19–G20)

**W7.106 · ⟨EmptyState.md · ES-2⟩ — BLOCKER: activating Retry annihilates the Browse pane and the error plate never returns; and it is homed on `BrowsePane.vue:40`, NOT the atom** (cl.2). Ruled CONFIRMED at R-1 over both hostile readers' "unproven" filings, measured cross-engine. **Homing lock: a cure authored in `EmptyState.vue` cannot reach this defect.** `BrowsePane.vue` is in bounds. ⟨EmptyState.md · ES-2, R-1⟩

**W7.107 · ⟨EmptyState.md · ES-11⟩ — the decorative eyebrow is announced verbatim inside an atomic polite region while the authoritative count is silent, and Admin routes structurally seat TWO identical live plates** (cl.1). This is the accessibility half of G19's structural precondition: deleting the `eyebrow` prop removes an announced string, not only a decoration. ⟨EmptyState.md · ES-11⟩

**W7.108 · ⟨EmptyState.md · ES-16⟩ — the empty species has ZERO actions at every one of its 9 source call sites; the three navigations ride as monospace prose; the one forward slot has no consumer** (cl.1). The corpus's second-worst truth after ES-1/ES-2. G19 rewrites copy; **this row says the copy is not the problem.** ⟨EmptyState.md · ES-16⟩

**W7.109 · ⟨EmptyState.md · ES-6⟩ — "the ONE shared empty atom" is false: the error plate is cloned with four unexplained numeric drifts and a third file falsely claims membership** (cl.1). Drift re-measured exactly (`gap-2.5 py-8` vs the clone's). Identity with ⟨ErrorBoundary.md · EB-9⟩ (a fork of `variant="error"` with five drifted magnitudes, a byte-identical CSS clone, two prop idioms, and **no design-system home for the failure register at all**). ⟨EmptyState.md · ES-6⟩ ⟨ErrorBoundary.md · EB-9⟩

**W7.110 · ⟨EmptyState.md · ES-7 + ES-8⟩ — `font-display text-heading` is a pairing the closed type matrix does not contain, live at four sites, standing only on cascade emission order; and the protagonist line renders Fraunces at weight 700, breaching the owner's pinned non-bold display edict; THE SHARED CURE IS KILLED** (cl.2). Both readers found ES-8 independently; the seat admitted it after byte-derivation **and killed the shared cure** — the two rows must be cured separately. The `font-display`-on-a-control family is one identity across five records: ⟨AdminAuditPanel.md · AAP-26⟩ ("the family repeats it at 5 sibling sites"), ⟨AdminTagsPanel.md · ATP-47⟩ (one of the five), ⟨AdminFlaggedPanel.md · AF-13⟩, ⟨ErrorBoundary.md · EB-10/EB-29⟩ (three per-instance overrides in one line), ⟨EmptyState.md · ES-27⟩ (seven Retry re-authorings). Cure under **X-W10** law. ⟨EmptyState.md · ES-7, ES-8, K-6⟩

**W7.111 · ⟨EmptyState.md · ES-19⟩ — the o9 oracle asserts glass-ui PRIVATE internals one line past the component's own published seam** (cl.2). `[data-variant="ghost"]`, `.watercolor-ghost-stroke` at `o9:75-76`, while the good seam `data-slot="empty-state-…"` is right there. **This is the same file G20 orders re-ruled in the same commit.** One re-ruling closes ES-4, ES-19 and G20's dangling premise; three separate re-rulings would leave two inverted. ⟨EmptyState.md · ES-19, ES-4⟩ ⟨W7.md · G20⟩

**W7.112 · ⟨EmptyState.md · ES-28 + ES-35 + ES-36⟩ — the prop bag is not a discriminated union, the two roots' byte-identical class string is LOAD-BEARING, and the eyebrow's guard asymmetry is why `eyebrow=""` renders an empty caption plus its gap band** (cl.2). **ES-35's lock, verbatim in force: collapsing to one root with `:role="…"` patches the attribute in place and is REFUSED** (challenge-C's N-4 guard, adopted by both readers and the seat). A tidy-looking G19 refactor that merges the roots breaks a guard nobody documented outside this row. ⟨EmptyState.md · ES-28, ES-35, ES-36⟩

**W7.113 · ⟨AdminTagsPanel.md · ATP-39⟩ — the "· no tags minted ·" annotation dies formation-side, by X-W7's own OM-15 abrogation** (cl.1). The record reads `X-W7.md:62` and rules the row moot ahead of execution: "delete `EmptyState.vue`'s `eyebrow`". Carried so the wave does not author a second cure for a string already scheduled to disappear. ⟨AdminTagsPanel.md · ATP-39, Challenges⟩

**W7.114 · QUADRUPLE/QUINTUPLE NULLITY — one identity, four witnesses** (cl.1). ⟨AdminFlaggedPanel.md · AF-23⟩ (the same nullity asserted FOUR times: count, ghost trio, eyebrow, display line; the reader's undercount correction adopted) ≡ ⟨AdminNamesPanel.md · D-1.5⟩ (the same zero stated FIVE times in one card; the axis undercounted by one) ≡ ⟨AdminTagsPanel.md · ATP-32⟩ (three count grammars in one suite) ≡ ⟨AdminFlaggedPanel.md · AF-24⟩ (one class of datum, two homes — header Badge vs in-body toolbar count). **Subtraction precedes explanation** (AF-23's own disposition). ⟨AdminFlaggedPanel.md · AF-23⟩ ⟨AdminNamesPanel.md · D-1.5⟩

**W7.115 · ⟨AdminFlaggedPanel.md · AF-47⟩ — the TRUE-EMPTY plate seats the specimen-plate INVITATION register on a moderation queue whose GOOD state is emptiness** (cl.1). Dots default true; EmptyState's own header names the affect. The empty plate has one voice and two opposite meanings. ⟨AdminFlaggedPanel.md · AF-47⟩

**W7.116 · ⟨AdminNamesPanel.md · M-DU5⟩ — the multi-line machine readout is centre-set (`text-center` container, ragged-both Fira); machine truth needs a left rail, and the row reaches ALL 12 EmptyState consumers** (cl.1). Verified in `EmptyState.vue:16/:23`. Independent of copy shortening — a G19 that only rewrites strings leaves it. ⟨AdminNamesPanel.md · M-DU5⟩

**W7.117 · ⟨ShadowPalette.md · SP-31⟩ — BINDING SEQUENCING RIDER against X-W10** (cl.2). Carried verbatim in force: the ShadowPalette cure is sequenced against X-W10's register canon and may not land ahead of it. G20's height assertion is executable independently; the *register* is not. ⟨ShadowPalette.md · SP-31⟩

**W7.118 · ⟨ShadowPalette.md · SP-17⟩ — the `foundation.css` roster rider** (cl.2). The plate's cure must reconcile with the roster, not fork it — the same "cite, don't fork" law EAS-12 states for the well recipe (W7.32). `foundation.css` is in NO X-W7 bounds; X-W10 owns the survivor recipe. ⟨ShadowPalette.md · SP-17⟩

**W7.119 · ⟨ShadowPalette.md · SP-34⟩ — `:key="count"` re-mints 38 nodes, and the o9 delay assertion is coupled to it** (cl.2). A keying cure changes the timing the oracle asserts; **both land in the same commit or the oracle is inverted** — the third row (with ES-4 and ES-19) that shares G20's single re-ruling. ⟨ShadowPalette.md · SP-34⟩

**W7.120 · G20's two-component clause is corroborated and its Extract limb is the wave's only extract byte-surface** (cl.1). `PaletteCardSkeleton.vue:44-77` duplicates the geometry (same four blocks, same `h-10` strip, same `h-5 w-32`/`h-5 w-6` meta, same swatch classes, same stagger arithmetic), so a one-file cure leaves the mass at the loading state — corroborated from the skeleton's own record (W7.28). `ExtractWorkbench.vue` is `modify-carve` and the `:163-166` caption dies under every option. ⟨PaletteCardSkeleton.md · PCS-1⟩ ⟨W7.md · G20⟩

**W7.121 · ⟨wb-extract-workbench.md · XW-1⟩ — BLOCKER: the preview crop** (cl.1). Fourteen of that record's rows route to X-W7, and `ExtractWorkbench.vue` is the ONLY extract file in bounds — as `modify-carve`, which does not obviously authorise the crop cure. The camera-mode cluster (XW-8/9/35) is NO-WAVE-OWNER. See §BoundsDelta B-1. ⟨wb-extract-workbench.md · XW-1, XW-8, XW-9, XW-35⟩

**W7.122 · ⟨wb-extract-imageeyedropper.md · EY-7⟩ — the swatch-pulse LOAD-BEARING-SIZE correction** (cl.2). The record corrects the size claim and the correction is load-bearing for any cure. Carried here because the same pulse idiom appears in the plate family; the file itself is NO-WAVE-OWNER. ⟨wb-extract-imageeyedropper.md · EY-7⟩

**W7.123 · ⟨wb-extract-pane.md · XP-7⟩ — the flow spec routes to X-W1, not here** (cl.4). Recorded so X.W7.g does not absorb it while cutting the caption. ⟨wb-extract-pane.md · XP-7⟩

### Cross-band riders routed to X-W7 by their records

**W7.124 · ⟨AuroraPane.md · AP-29 + K-12⟩ — the caps-eyebrow recipe is hand-rolled twice, 5/5 declaration-identical, and the proposed cure is KILLED** (cl.2). Byte-compare of `AuroraPane.vue:194–200` vs `ConfigSliderPane.vue:237–243`. **K-12 kills `class="text-admin-label text-muted-foreground"` on three independent axes** (≈40% shrink to a fixed 10 px rung; weight/leading changes breaking the claimed 5/5 identity; re-inking the exact token AP-13 indicts). `AuroraPane.vue` IS in X-W7 bounds and carries 6 of G19's 68 hits. ⟨AuroraPane.md · AP-29, K-12⟩

**W7.125 · ⟨AuroraPane.md · AP-30⟩ — the pane's description enumerates five of its seven controls, omitting Harmony (the strip-bearing protagonist) and Arrangement** (cl.1). A G19 REDUCE row whose reduction must not delete the two missing names. ⟨AuroraPane.md · AP-30⟩

**W7.126 · ⟨shell-dock-actiontoolbar.md · AT-2⟩ — descriptions are unreachable on ALL touch and exploratory taps EXECUTE commands; five bare glyphs explained only via `aria-*`** (cl.1). `ActionToolbar.vue` IS in X-W7 bounds (`modify`) and carries 5 of G19's 68 hits — so the wave that rewrites its captions is the wave that must not leave the glyphs bare. *Sharpens*: G19's "14 uncoupled labels" clause. ⟨shell-dock-actiontoolbar.md · AT-2⟩

**W7.127 · ⟨ApiOfflineChip.md · AP-3⟩ — the honest transport truth is gated on an unrelated swatch count** (cl.1). `CurrentPaletteEditor.vue:116 v-if="savedColorStrings.length > 0"` ANDed over the self-gating chip — the exact failure the T-9 re-home was meant to end. `CurrentPaletteEditor.vue` is NOT in bounds (§1a C-3). ⟨ApiOfflineChip.md · AP-3⟩

**W7.128 · ⟨CurrentPaletteEditor.md · A-2⟩ — BLOCKER composite: the duplicate-name latch destroys user work three ways, and arm (ii) is the reachability proof for two OTHER waves' rows** (cl.2). Arm (ii) writes `colors: []` through ordinary controls — the operand that makes ⟨wb-mix-sourceselector.md · MSS-13⟩ and ⟨wb-mix-pane.md · MP-1⟩ reachable rather than hypothetical (K-13 is "load-bearing" at its own record). ⟨ADJ-M5⟩ folds into A-2's cure. `CurrentPaletteEditor.vue` is NOT in bounds. ⟨CurrentPaletteEditor.md · A-2, ADJ-M5⟩ ⟨wb-mix-sourceselector.md · MSS-13, K-13⟩

**W7.129 · ⟨CurrentPaletteEditor.md · C4-4/L-16⟩ — three membership predicates, two insertion orders, one gesture** (cl.1). `useSwatchActions.ts:62-74` (indexOf on opaque strings; hit → push END; single-hit → silent no-op) vs `usePaletteWiring.ts:84-98`. Compounds W7.37's identity defect. ⟨CurrentPaletteEditor.md · C4-4/L-16⟩

**W7.130 · ⟨CurrentPaletteEditor.md · L-8-as-rescoped⟩ — the collision rule has two disagreeing homes** (cl.1). Component name-only (`:253-255`) vs store name + `colorsMatch` with move-to-front reuse (`usePaletteStore.ts:66-82`). **This is the same store behaviour §1a C-7 corrects MR-24 on.** `usePaletteStore.ts` IS in bounds; the component is not. ⟨CurrentPaletteEditor.md · L-8⟩ ⟨wb-mix-pane.md · MP-7⟩

**W7.131 · ⟨CurrentPaletteEditor.md · L-25 + ADJ-m4 + ADJ-m5⟩ — `EditTarget.paletteId` flattens two kinds behind a sentinel sharing the temp-id namespace, declared THREE times; the prop type erases the store's proven `& { id: string }` refinement; `swatchExtraClass` is dead public API** (cl.1). ADJ-m5 is identity with ⟨SwatchHoverMenu.md · SH-15(a)⟩ — one dead surface, two records. ⟨CurrentPaletteEditor.md · L-25, ADJ-m4, ADJ-m5⟩

**W7.132 · ⟨PaginationBar.md · 5-row NO-WAVE-OWNER envelope + DISSENT #6⟩ — preserved whole, and its G-9 trap is carried** (cl.2). The record preserves a five-row NO-WAVE-OWNER envelope and a DISSENT (#6) naming a G-9 trap. `PaginationBar.vue` is NOT in bounds while three panels that mount it ARE. See §BoundsDelta B-6 and §CrossEdges CE-3. ⟨PaginationBar.md · M1..M11, CR-1..CR-3, DISSENT #6⟩

**W7.133 · ⟨UserSortMenu.md · R-G⟩ — a CURE COLLISION on `UserSortMenu.vue:8`** (cl.2). X-W8's G-9 holds that byte under a null-DELTA proof; the record's own cure is a quiet migration of the same line. **Two waves, one line, two incompatible proofs.** US-7/US-8/US-13 are "MT-AU1 named-adopt else NO-WAVE-OWNER" — and MT-AU1 is not cut (§1a C-8). ⟨UserSortMenu.md · R-G, US-7, US-8, US-13⟩

**W7.134 · ⟨PaletteRenameInput.md · A-3 + A-18 + A-8⟩ — a rejected rename fails in TOTAL silence, and the two naming paths enforce different rules** (cl.1). Leaf emits `submit: [newName]` / `cancel: []` — no ack, no pending, no rejection channel, nothing disabled. A-18: CurrentPaletteEditor checks `savedPalettes` case-insensitively and messages; the rename path checks only non-empty + changed and PATCHes straight through. A-8: the prop watcher unconditionally mirrors with no dirty guard (latent conflict-clobber under a user-triggered refetch). `PaletteRenameInput.vue` is NOT in bounds (§1a C-3) while `usePaletteStore.ts` and `usePaletteActions.ts` are. ⟨PaletteRenameInput.md · A-3, A-8, A-18, A-19⟩

**W7.135 · ⟨PaletteSlugBar.md · the `setActiveTab("saved")` route-throw⟩ — a NEW BLOCKER admitted at that record, breaking every live login success path today** (cl.1). Recorded here because `PaletteSlugBar.vue` is NOT in bounds while `BrowsePane.vue`/`PalettesPane.vue` are, and the throw lands on the pane router. ⟨PaletteSlugBar.md · closing verdict⟩

**W7.136 · ⟨ErrorBoundary.md · EB-1⟩ — BLOCKER: the caught plate's ink paints UNDER the atmosphere canvas; only the Button survives; and NO X wave names `ErrorBoundary.vue`** (cl.1). Repo-wide grep over `waves/*.md` → 0. Every W7 row whose failure surface is "the boundary catches it" (W7.85, W7.22) terminates at a component no wave owns. Also ⟨EB-12⟩: "This panel" understates an app-wide blast radius, and one catch latches the entire application dead for the session. ⟨ErrorBoundary.md · EB-1, EB-12, Wave authority⟩

**W7.137 · ⟨PreviewStrip.md · PS-3⟩ — forced-colors and print erase the chip's entire payload; the component is absent from BOTH arms of the roster; the 42 px reservation outlives the glyph** (cl.1). Third witness of W7.26's roster identity, on a third surface. ⟨PreviewStrip.md · PS-3, PS-2⟩

**W7.138 · ⟨shell-dock-mobilemenudropdown.md · MMD-2⟩ — BLOCKER, and the CARRY LOCK: this is the row no formation may open without** (cl.2). `Regenerate slug` (`:61`; twin `:87`) is a fire-and-forget promise over a chain that **clears the persisted identity BEFORE the replacement is confirmed**, with no catch and no error surface; `useSlugMigration.ts:102` is a bare `await deps.userRegenerate()` whose >0-palettes branch reaches only `console.warn`. Compounded by ⟨MMD · D-07⟩ (`:61` is the ONLY identity row without `@select.prevent`, so selecting Regenerate closes the menu — and the pill inside that menu is the new slug's only mobile display surface) and ⟨MMD · M-B⟩ (**the single most destructive control wears the quietest ink** — the only row with `text-muted-foreground`). Every disposition on the record is NO-WAVE-OWNER. `demo/shell/dock/menus/**` and `demo/palettes/useSlugMigration.ts` are NOT in bounds; `ActionToolbar.vue` is the only dock file X-W7 holds. ⟨shell-dock-mobilemenudropdown.md · MMD-2, D-07, M-B⟩

**W7.139 · ⟨shell-dock-mobilemenudropdown.md · MMD-1⟩ ≡ ⟨shell-dock-profilesection.md · D-2 + A-2⟩ — BLOCKER: `as-child` on `DropdownMenuItem` is actively STRIPPED by the producer** (cl.1). ~73% dead zone, keyboard-dead (reka's `SELECTION_KEYS` fire a synthetic click on the `[role=menuitem]` DIV that no descendant anchor receives), 55.4 px vs 44 px siblings. One identity, two records, both twins. The producer's strip set is "a principled refusal … the defect is that the refusal is SILENT rather than typed" — **that observation is the BH-relay ask in one sentence** (carried verbatim). ⟨shell-dock-mobilemenudropdown.md · MMD-1⟩ ⟨shell-dock-profilesection.md · D-2, A-2, superlative 10⟩

**W7.140 · ⟨shell-dock-profilesection.md · C-5/L-1(a)⟩ — BLOCKER: the `chrome` ink probe reads `.glass-dock`, which paints nothing under Glass 7** (cl.1). The guard silently degenerates to the static model for every `useSafeAccentFn("chrome")` consumer and no test can notice. **Already named by X-W8's G-13** — cross-edge, not an X-W7 row, recorded so the MMD packet is not routed here whole. ⟨shell-dock-profilesection.md · C-5/L-1(a)⟩

---

## §Gates

Two registers. **Sharpenings** attach to an existing `W7.md` §6 gate and change what GREEN means or what the baseline covers — the dated gate text is untouched; the addendum's clause governs at read time. **New born-RED candidates** are defects with real witnesses that **no** current W7 gate can fail on. Total entries: **29** at pass 1 → **37 after the round-1 repair** (20 sharpenings + 17 new born-RED: N-1…N-9 below, **N-10…N-17 at §R1.36**). Amended 2026-08-28, stated never silently; the sharpenings' witness lists also grow at §R1.36's amendment note, without adding entries.

### Sharpenings of existing gates (S-1 … S-20)

| # | Gate | Sharpening (this fold) | Witness |
|---|---|---|---|
| **S-1** | G1 | The 4 lines / 2 files baseline is exactly TEP-1/2/3's mechanism; the three banked BLOCKERs are ONE cure, not three. | W7.1 |
| **S-2** | G2 | The emit-ledger design is *validated* by the corpus: a visual assertion passes the RED state because `data-state` flips while `netAfterTagClick` is unchanged. **Precondition N-1 applies** — this gate cannot run today. | W7.1; N-1 |
| **S-3** | G3 | G3 is the recurrence-stopper for the whole 51-site BUTTON-VARIANT-INERT family (8 witnesses), and `FlagReportDialog.md` §Correction 2 re-homes that family's stopper from "boundary" to "wave-owned". The MEASURE-AT-OPEN diagnostic count has a banked counterfactual: **271 errors, 263 × TS2353** on a sibling instrument. | W7.9, W7.10, §1a C-9 |
| **S-4** | G4 | Six independent witnesses; GREEN's "product consumer" clause is exactly what five of them describe. | W7.13 |
| **S-5** | G5 | Unchanged; corroborated. | W7.13 |
| **S-6** | G6 | **Cure lock**: `canonical.ts` becomes the shipped path and NO shared `slugify` may be introduced under `export/` (L5-1's cure is KILLED). GREEN "exactly 1" must be read as *one, in `utils.ts`*. | W7.14 |
| **S-7** | G7 | The denominator is the **failure-path set (~38)**, not the `console.warn` occurrence count (31); occurrences are the floor. Unreachable `catch`es (`dateFormat.ts`, both exports) are `DELETE` rows by ECMA-402, not rulings. | W7.15, W7.17 |
| **S-8** | G8 | Sibling widened: `VersionHistoryDrawer.vue:59-63` already renders the `+N` residue mark for the same idiom — the cure exists in-tree and the fixture should assert against it. | §1a C-12, W7.57 |
| **S-9** | G9 | (a) `AdminAuditPanel.vue:62` is a second `min-w-0` surface of the same law. (b) **G9 and G17 share one cure surface** — a compaction cure that keeps the chips `shrink-0` re-opens G9. (c) A third device class has no panel at all (cl.3). | W7.59, W7.103, W7.31 |
| **S-10** | G10 | The `Math.max(100/n, 0.5)` clause is corroborated from the other end: the renormalisation undoes the documented 8% floor. `N_tags = 11` is not only a 400 — `toLowerCase()` is mistaken for validation against `/^[a-z0-9-]+$/`. **Precondition N-1 applies.** | W7.27, W7.80 |
| **S-11** | G11 | Unchanged. Dependency on X-W1 stands; the corpus adds no contradicting witness. | — |
| **S-12** | G12 | Purity is **identity as well as import-graph**: the seed contract (three silhouettes for one specimen) and the 16 dead emits are specimen defects an import-graph assertion cannot see. **Precondition N-1 applies** to the mounted-count half. | W7.41, W7.48 |
| **S-13** | G13 | "One visible result" must exclude a 3 s unannounced flourish (VC:101 verbatim). The mutation table's `vote` row has no reachable owner (`@vote` listeners = 1). The table must also carry `report` — `FlagReportDialog.md` records that G13's ten-mutation table has **no flag/report row**. | W7.64, W7.43, W7.22 |
| **S-14** | G14 | Three sharpenings: (a) assert **exactly one** request, not "no request before acceptance" — Δ-3's double-fire passes the weaker form; (b) the confirm does not cure ATP-2 — the seat must also become **visible at rest**; (c) four seats is a floor, `PaletteCardMenu` AP-6 is a fifth. | W7.92, W7.90, W7.97 |
| **S-15** | G15 | Destructive naming is not only the delete-all control: N identical "Dismiss" buttons with no programmatic association, and two irreversible actions sharing one `Trash2`. | W7.95, W7.96 |
| **S-16** | G16 | Confirmed; `ColorSpaceSelector.vue:91` renders the raw 12dp string 17× per open. **X-W6 writes this file first** (§4a). | W7.98 |
| **S-17** | G17 | See S-9(b). Additionally the label/box scale inversion (`--type-caption` is `--ui-scale`-blind) is a facility row, not a styling row. | W7.99, W7.101, W7.103 |
| **S-18** | G18 | Containment is correct and its reason is corroborated from the parser end; the `{precision}` option is X-W9's. | W7.105 |
| **S-19** | G19 | (a) The eyebrow is **announced** inside an atomic polite region — deletion removes a string from the a11y tree, not only a decoration. (b) The empty species has zero actions at all 9 call sites: rewriting copy does not cure the dead end. (c) 5 of the 68 hits live in `ActionToolbar.vue`, whose glyphs are bare on touch — the "14 uncoupled labels" clause must reach them. (d) `AuroraPane`'s 6 hits carry a KILLED cure (K-12) that must not be re-proposed. | W7.107, W7.108, W7.126, W7.124 |
| **S-20** | G20 | **The single o9 re-ruling closes THREE rows at once** — ES-4 (`dots` locked by the oracle), ES-19 (the oracle asserts producer privates), SP-34 (`:key="count"` changes the delay the oracle asserts). Separate re-rulings leave two inverted. SP-31 is a **binding sequencing rider against X-W10**. | W7.52, W7.111, W7.119, W7.117 |

### New born-RED candidates (N-1 … N-9) — real witnesses, no current gate can fail on them

**N-1 · THE MOUNT SUBSTRATE DOES NOT EXIST — the precondition for G2, G9, G10, G12, G17, G20** (BLOCKER-class, born-RED).
Witness ⟨AdminUsersPanel.md · Δ-14⟩, arbiter-read: `vitest.config.ts` has **NO `@vitejs/plugin-vue`**; the plugin sits in devDependencies; `mount(` = **0 anywhere in the repo**. Corroborated independently at ⟨wb-mix-sourceselector.md · MSS-2⟩ ("no `@vue/test-utils` import and no `mount(` anywhere — grep EMPTY") and ⟨wb-mix-sourceselector.md · MSS-29⟩ (`@vue/test-utils` is installed and unused — "the exact harness MSS-2's cheapest cure needs"). Δ-14's own words: **"r2's G-6/G-4 unit gates were UNBUILDABLE as specced"** — recorded there so no future wave specs jsdom component tests without this precondition. `W7.md` §6 specifies **six** mounted assertions and does not gate their substrate.
*Command*: `grep -c "@vitejs/plugin-vue" vitest.config.ts` → **0** today; `grep -rn "mount(" demo/test/ test/` → **0**. *GREEN*: plugin registered, one real SFC mounts, `mount(` census ≥ 1 with a product SFC. *Falsifier*: remove the plugin and every mounted gate errors at import, not at assertion — which is how the RED state hides today.

**N-2 · AUTH ≠ EMPTY, across all five admin panels and the never-attempted state** (BLOCKER-class, born-RED).
Witnesses: `useAdminUsers.ts:54-56` returns before touching `loadingUsers`/`usersLoadError`; `useAdminFlagged.ts:60-61` `if (!token) return` before `loading=true`; AdminNames' "· QUEUE CLEAR ·" over a dead `meta:{admin:true}` guard (**zero router-guard readers**, banked grep); AdminTags' unconditional `:5-7` count; and the law the parent already codifies in prose at `AdminPane.vue:117-131`. No W7 gate asserts a distinguishable unauthenticated state.
*Command*: per-panel assertion — token absent ⇒ the rendered plate is neither the empty species nor an operable control set; plus `grep -rn 'meta:{ *admin' demo/ | xargs` reader census ≥ 1. *GREEN*: five panels, five distinguishable states. *Falsifier*: restore `if (!token) return` and the plate reverts to TRUE-EMPTY.

**N-3 · PRUNE SCOPE — the confirm's number and the operation's scope are the same quantity** (BLOCKER-class, born-RED).
Witness: `AdminUsersPanel.vue:241` `emptyCount` over the filtered prop; `AdminPane.vue:28` filtered vs `:33` unfiltered; the dialog quotes the filtered number for a server-global delete. Aggravated by N-4.
*Command*: a mounted assertion with a non-empty filter — the confirm's stated count equals the count the request will delete. *GREEN*: equal, or the confirm names the global scope explicitly. *Falsifier*: rebind `:users` to the filtered list and the two diverge. **Depends on N-1.**

**N-4 · ONE `searchQuery` PER DOMAIN, and it resets** (born-RED).
Witness: `usePalettePorts.ts:54` → `:141/:183/:224`; three simultaneous v-models; `searchQuery.value =` → **0 hits repo-wide**; every admin view mounts PalettesPane beside the admin panel (`right:"palettes"` ×5 in viewSchema).
*Command*: `grep -rn "searchQuery" demo/palettes/ | grep -c "= \"\"\|= ''"` → **0** today; plus a distinct-ref census per port. *GREEN*: one ref per domain, reset on route change. *Falsifier*: re-alias two ports to one ref and the census collapses to 1.

**N-5 · IDENTITY KEYS — no rendered list may put an index inside its key** (born-RED, two sites).
Witness: `useSwatchActions.ts:45-53` `${color}::${i}` and `MixSourceSelector.vue:79-98` `${sc.css}::${i}`; `SelectedColor { css, source }` has no identity; `.vj-enter-move` is unreachable by construction. **Cure lock: two-site, and MSS-16's `.swatch-row` positioning fix lands in the same wave.**
*Command*: `grep -rn '::\${i}\|:key="[^"]*index' demo/ --include='*.vue' --include='*.ts'`. *GREEN*: 0. *Falsifier*: the removal test — remove a non-tail element and assert survivors' DOM nodes are identical objects.

**N-6 · EXACTLY-ONE-REQUEST on every destructive commit** (born-RED).
Witness: Δ-3's measured hit-testable window (**271 ms chromium / 159 ms webkit**), the never-cleared closure at `:283-286`, the un-`:disabled` footer confirm at `:175`, and C-25's census: **0 admin wrappers carry an idempotency key**. G14 asserts "no request before acceptance" — which the double-fire satisfies.
*Command*: e2e double-activation of each destructive confirm; assert request count === 1. *GREEN*: one. *Falsifier*: remove the guard and the count is 2 within the measured window.

**N-7 · DRAG ORDER INTEGRITY** (born-RED).
Witness ⟨PaletteCardGrid.md · PG-1⟩ (BLOCKER, first-drag order corruption) + PG-2 (filtered-drag), with the **named-addition rider** as the cure lock. No W7 gate touches drag order; G10's fixtures are cardinality, not permutation.
*Command*: a fixture that drags item k to position j, unfiltered and under an active filter, and asserts the persisted order equals the rendered order. *GREEN*: equal in both. *Falsifier*: the first drag is the RED case — a gate that drags twice passes the defect.

**N-8 · THE PROVENANCE FIELD EXISTS ON BOTH SIDES** (born-RED, and a BLOCKING precondition).
Witness ⟨AdminNamesPanel.md · ADJ-1⟩ (server `proposerSlug` absent from the demo DTO) + ⟨AdminAuditPanel.md · AAP-4/AAP-5⟩ (`actorSlug` dropped from a seven-field event; `ipHash` **required client-side and never on the wire at all**). D-7's cure is BLOCKED until this closes.
*Command*: a type-level assertion that every client DTO field is produced by some server formatter, and vice versa, over `demo/palettes/types.ts` ↔ `api/src/modules/*/service/*.ts`. *GREEN*: no field on either side without a counterpart. *Falsifier*: re-add `ipHash: string` and the census reports an unproduced required field. **`types.ts` is not in bounds — see §BoundsDelta.**

**N-9 · THE FAILURE REGISTER HAS A HOME** (born-RED).
Witness ⟨EmptyState.md · ES-6⟩ + ⟨ErrorBoundary.md · EB-9⟩: the error plate is cloned with four/five unexplained numeric drifts, a byte-identical CSS clone, and two prop idioms — **and there is no design-system home for the failure register at all**; ⟨ErrorBoundary.md · EB-13⟩ books it as an unratified nineteenth composition. G19 governs copy; nothing governs the register.
*Command*: one error-plate implementation; `grep -c` of the drifted magnitude set → 1 site each. *GREEN*: one implementation, cited not forked (EAS-12's law). *Falsifier*: re-introduce a drifted magnitude and the census is 2.

**Contrivance note (L-19).** N-1's `mount(` census and N-5's key grep both have product consumers (the shipped components under test / the rendered lists), so neither is the shape L-19 forbids. N-8's type census has **no** product consumer today and is therefore marked: it is a gate on a *cure*, admissible only once the DTO reconciliation is in-wave. The `probe-au1.mjs` gates inherited from MT-AU1 (G-3b, G-8, G-9) are **wave-committed probes**, not proof-scripts, and their PNG-witness clause (`git ls-files … | grep -c png ≥ 6`, RED at **0** repo-wide because `.gitignore:34 *.png` requires `git add -f`) is carried into §BoundsDelta with the packet, not adopted here.

---

## §BoundsDelta

Files this wave must ADD to `W7.md` §4 for the corpus's dispositions to be executable. **This fold cannot amend §4** (E-3); every row below is a formation-boundary decision. Grouped by packet; the "why" cites the rows that die without it.

### B-1 · XP-EXTRACT packet — the extract cone's operative core has no owner

`demo/workbenches/extract/ExtractPane.vue` · `ExtractControls.vue` · `ImageDropZone.vue` · `ImageEyedropper/**` · `composables/useExtractSession.ts` · `composables/useImageQuantize.ts` · `quantize-worker.ts`.
X-W7 holds exactly one byte-surface here (`ExtractWorkbench.vue | modify-carve`) and G20 requires deleting its `:163-166` caption. Everything else is unowned: ⟨wb-extract-controls.md · RULING PIN 1⟩ (in no X wave's bounds; the only named receiver is CC-105 → X-W4.g, trigger-gated, **and W4.g's own bounds omit the file**), ⟨wb-extract-imagedropzone.md⟩ (no X wave owner; 2 BLOCKERs), ⟨wb-extract-imageeyedropper.md⟩ (4 BLOCKERs, **all** NO-WAVE-OWNER), ⟨wb-extract-pane.md · XP-2/3/4/23/27⟩ (the session cluster, NO-WAVE-OWNER; RULING PIN CC-108/A-17 = chassis dead), ⟨wb-extract-workbench.md · XW-8/9/35⟩ (camera-mode cluster, NO-WAVE-OWNER). Also carried: EY-CLUSTER, and ⟨wb-extract-imageeyedropper.md · RULING PIN 3⟩ (the r3 files exist and **neither reader consumed them**).

### B-2 · MT-AU1 packet — seven adjudicated BLOCKERs with no wave

`demo/palettes/browser/admin/AdminListItem.vue` · `AdminListSkeleton.vue` · `PaginationBar.vue` · `demo/palettes/browser/admin/index.ts` · `demo/palettes/useAdminAudit.ts` · `useAdminFlagged.ts` · `useAdminTags.ts` · `useColorNameQueue.ts` · `useFilteredList.ts` · `demo/palettes/types.ts` · `demo/palettes/api/**` · `demo/palettes/browser/dateFormat.ts` · `demo/shell/viewSchema.ts` · `demo/palettes/browser/search/UserSortMenu.vue`.
X-W7 owns the five panels and `AdminPane.vue`; **MT-AU1 owns the operative core and was never cut into X** (§1a C-8). Without this delta: W7.61's cure has five view surfaces and no composables; W7.66/N-8 cannot touch the DTO; W7.15/W7.16 cannot touch `dateFormat.ts`; W7.70 cannot dispose the audit timer; W7.74's extraction target (`useFilteredList`) is unreachable; W7.55's anatomy has no home; W7.132's PaginationBar envelope stays orphaned. MT-AU1's own gates G-3b/G-8/G-9 and its `completableAlone: YES` claim (13 files, `demo/palettes/**` + `demo/shared/ui/**` + `demo/shell/viewSchema.ts` + two test files) come with the packet. ⟨AdminListSkeleton.md · Terminal disposition⟩ ⟨AdminUsersPanel.md · §3 The wave⟩

### B-3 · MMD-IDENTITY packet — the CARRY LOCK

`demo/shell/dock/menus/**` (MobileMenuDropdown + ProfileSection + SlugEditLayer twins) · `demo/palettes/useSlugMigration.ts`.
**MMD-2 is "the row no formation may open without"** (W7.138): identity destroyed before the replacement is confirmed, no catch, no error surface. Every disposition on both dock records is NO-WAVE-OWNER; X-W7's only dock file is `ActionToolbar.vue`. The packet also carries MMD-1/D-2 (the stripped `as-child` BLOCKER, both twins) whose sibling `C-5/L-1(a)` is **already named by X-W8's G-13** — so the packet must be routed as a unit or the two halves land in different waves (§CrossEdges CE-5). ⟨shell-dock-mobilemenudropdown.md⟩ ⟨shell-dock-profilesection.md⟩

### B-4 · BROWSE-SEARCH packet — partially owned today

`demo/palettes/browser/search/MiniColorPicker.vue` · `UserSortMenu.vue` · `browser/search/index.ts`.
`BrowsePane.vue` IS in bounds (so W7.5/W7.6 become executable), but the three search leaves are not. MCP's 2 BLOCKERs and its two binding cure-caveats (K-11, MCP-13) and the MCP-44 DESIGN.md deletion-carry have no home; SFB-4's same-change rider cannot land; US-7/US-8/US-13 remain "MT-AU1 named-adopt else NO-WAVE-OWNER". ⟨MiniColorPicker.md⟩ ⟨UserSortMenu.md⟩ ⟨SearchFilterBar.md · SFB-4⟩

### B-5 · The §5-glob vs §4-table delta (§1a C-3) — the largest single block

`demo/palettes/browser/card/CurrentPaletteEditor.vue` · `SwatchHoverMenu.vue` · `composables/{useSwatchActions,useHoverPopover,useLeaveTimer,useHeightTransition}.ts` · `browser/card/PaletteCard/ActionFeedback.vue` · `browser/card/PaletteCard/PaletteRenameInput.vue`.
All sit inside `X.W7.c`'s declared glob `demo/palettes/browser/card/**` and outside §4. Rows that die without it: W7.33/34/35/36 (the whole SwatchHoverMenu BLOCKER set), W7.37's **second** cure site, W7.128/129/130/131 (CurrentPaletteEditor, including the A-2 BLOCKER that is the reachability proof for two other waves' rows), W7.134 (PaletteRenameInput), and every ActionFeedback row — which `ActionFeedback.md` authored against a successor surface §4 does not authorise creating (§1a C-4).

### B-6 · Adjacent surfaces the corpus routes here but no wave holds

`demo/color-picker/ErrorBoundary.vue` (**no X wave names it** — repo-wide grep 0; W7.136, and the terminus of every "the boundary catches it" row) · `demo/palettes/browser/dialog/{FlagReportDialog,MigratePalettesDialog}.vue` (W7.22, W7.23; `VersionHistoryDrawer.vue` is held by **X-W4**, `W4.md:127`) · `demo/palettes/browser/slug/PaletteSlugBar.vue` (W7.135) · `demo/palettes/browser/status/ApiOfflineChip.vue` (W7.127) · `demo/color-session/color-chips/PreviewStrip.vue` (W7.137) · `demo/workbenches/generate/GenerateControls.vue` (W7.58) · `demo/styles/foundation.css` (W7.32/W7.118 — **X-W10 owns the survivor recipe; X-W7 must cite, not fork**).

### B-7 · Access-verb deltas (not file additions)

- `demo/palettes/browser/card/PaletteCard/PaletteCard.vue`: §5.d says "deletes"; §4 grants `modify-carve` (§1a C-4). Either §4 gains `delete` or X.W7.d stops at carve.
- `demo/workbenches/extract/ExtractWorkbench.vue`: `modify-carve` may not obviously authorise XW-1's preview-crop cure (W7.121); G20's caption deletion is within a carve, the crop may not be.

---

## §CrossEdges

**CE-1 · X-W6 → X-W7 (write order, already in §4a).** Four shared `modify` paths — `ColorSpaceSelector.vue`, `AuroraPane.vue`, `MixConfigBar.vue`, `MixSourceSelector.vue`. **W6 writes first**; `X.W7.f`'s `format-color.ts` registers are sized against W6's `formatSpecimen` digit policy and this wave mints no second one. Corpus corroboration: ⟨wb-mix-animationcanvas.md⟩'s bounds census reads the same split ("X-W7 shares MixSourceSelector/MixConfigBar"), and ⟨wb-mix-configbar.md⟩ routes ~11 rows to X-W6.j on files X-W7 also holds. Any X-W7 edit to those four must be authored against **post-W6** bytes. Corrects §1a C-2.

**CE-2 · X-W7 ↔ X-W4.g (trigger-gated).** The WatercolorDot impostor seats (CC-044) are X.W4.g's, **CLOSED unless the X-W0.j Glass-8 repin census PASSES**, and they include `MixSourceSelector.vue:168`/`:215` — lines inside a file X-W7 also holds. W7.33's cure is CC-044's atomic cut with **no pre-8 wrapper**; if the trigger never fires, the rows fall to MX-CLUSTER/NO-WAVE-OWNER, not to X-W7. X-W7 must not pre-empt the cut.

**CE-3 · X-W7 ↔ X-W8 · a CURE COLLISION on one line.** X-W8's G-9 holds `UserSortMenu.vue:8` under a **null-DELTA proof** while ⟨UserSortMenu.md · R-G⟩ prescribes a quiet migration of the same byte, and ⟨SearchFilterBar.md · SFB-4⟩ makes it a same-change rider of an X-W7 row. Additionally ⟨AdminListSkeleton.md⟩'s arbiter rider records that **G-9's census as written misses `AdminListSkeleton`**. Two waves, one line, two incompatible proofs — a boundary ruling, not a wave decision.

**CE-4 · X-W7 ↔ X-W10 (canon; two binding riders).** SP-31 is a **binding sequencing rider against X-W10** (W7.117); SP-17's roster rider and MR-34/EAS-12's law bind the same way — **X-W10 owns `foundation.css`'s survivor recipe: cite, don't fork.** The type-matrix family (W7.110), the post-hoc-alpha family (W7.49) and `AdminAuditPanel` AAP-26's "cure under X-W10 law" all terminate there. X-W7 executes; X-W10 rules.

**CE-5 · X-W7 ↔ X-W8 · the MMD packet splits.** `shell-dock-profilesection.md`'s BLOCKER `C-5/L-1(a)` (the dead `chrome` ink probe) is **already named by X-W8's G-13**, while its twin BLOCKER `D-2`/`MMD-1` and the `MMD-2` CARRY LOCK are NO-WAVE-OWNER. Routing the packet piecemeal puts one twin in X-W8 and the other nowhere.

**CE-6 · X-W7 → X-W5 (visibility, not ownership).** G3's `strictTemplates` is what makes ⟨PalettesPane.md · PP-3⟩'s hyphenated prop-bag keys visible; the file is X-W7's, the row is X-W5's. Also ⟨EmptyState.md · ES-25⟩: the `26ch` measure is inert at today's 462 px pane and **arms the moment X-W5 lands Admin full-width** — an X-W5 change detonates an X-W7 surface.

**CE-7 · X-W7 → X-W1 (gates and witnesses).** G11 depends on X-W1's `e2e/visual/` harness (blocks G11 only). ⟨wb-extract-pane.md · XP-7⟩ routes the flow spec to X-W1. ⟨AdminUsersPanel.md · Δ-14⟩'s substrate row (N-1) and ⟨AdminFlaggedPanel.md · AF-30⟩ / ⟨AdminTagsPanel.md⟩ / ⟨VersionHistoryDrawer.md · VHD-15⟩ / ⟨FlagReportDialog.md · A-12⟩ / ⟨ActionFeedback.md · AF-21⟩'s vacuous-gate rows are the same identity: **the suites cannot see these components.** X-W1 owns the harness; X-W7 owns none of it and must not author a second screenshot mechanism (§4, verbatim).

**CE-8 · X-W7 → X-W9 (the epoch rule).** G18 is the seam. The additive `{ precision }` option on `serializeCssColor` is X-W9's; ⟨wb-gradient-codeeditor.md · A-27⟩ and the live parser-proof R1 (`parseCssColor("oklch()")`) sit on the same surface. Zero `src/` lines in this wave's range.

**CE-9 · X-W7 → glass-ui BH relay (standing owner edict/fond).** Three informational asks and one refusal, all consumer-derivable: MC-4's `.section-label` typography ownership (**no producer ask is mandated**); the `SelectionValue` naming gap (§1a C-5 — **no relay required**, the type is derivable from three exported annotated surfaces); ⟨shell-dock-profilesection.md · superlative 10⟩'s one-sentence ask — *the producer's strip set is a principled refusal; the defect is that it is SILENT rather than typed*; and the standing **P051** refusal — the BH relay may inform on blast radius, it may **never** ask to restore attribute forwarding or mint an `as`/`tag` prop (K-10, carried).

---

## §MEASURE-AT-OPEN (cl.3)

Carried from the corpus, additional to `W7.md`'s own three (G3's diagnostic count, G9's overflow px, G11's tolerance).

1. The third device class with no swatch panel (⟨PaletteCardSwatches.md · PS-34⟩).
2. MSS-16/MR-35's rendered teleport distance, **measured in the two LIVE consumers before the MSS-3/MR-4 cure lands** (⟨wb-mix-resultdisplay.md · R-11⟩).
3. MC-3/MC-4's rendered magnitudes on a coarse device (36/60 px; ratio 0.877 → 0.580) — ⟨wb-mix-configbar.md · R-5⟩.
4. The MMD 40-char slug ceiling arm at 320 px and 200% zoom (⟨shell-dock-mobilemenudropdown.md · D-01⟩; both readers' provenance cells were corrected — the 62-char specimen is synthetic).
5. MR-34/R-12's `prefers-contrast: more` computed read + one print-preview of the result region (promotes MINOR→MAJOR; take with R-1 in one session).
6. ⟨SwatchHoverMenu.md · U-4⟩ — the 28×28 rendered action-button rects, "relevant only to the X-W7.c seat spec".

---

## §EXCLUDED (cl.4)

- **Motion-quarantine FALSE rows** M-03/M-07/M-11/M-17/M-26/M-32/M-33 — may not be carried, and are not. The TRUE rows M-10/M-12/M-14/M-16/M-19/M-20/M-34 and MQ-1 (quarantine-authored, NEW, HIGH) are carryable; M-12/M-14 ride W7.28 (the inert `<Skeleton>` props). ⟨AdminTagsPanel.md · ATP-36⟩ ⟨motion-quarantine.md⟩
- **The RETIRED PROBE** — the mix plate's reduced-motion cell. K-14/K-15 close both PRM accusations; the served posture is ruled CORRECT. A PRM capture would witness a non-defect. ⟨wb-mix-resultdisplay.md · RETIRED PROBE⟩
- **The chassis cure family** — K-CHASSIS: the corpus's eleven-times-repeated "compose on InstrumentChassis" cure is dead (CC-108/A-17; W6 gate H1 forbids rebuilding the housing). The REGION argument survives ratified. Any "dissolves under the chassis" cure must be re-derived. ⟨wb-mix-pane.md · K-CHASSIS⟩ ⟨wb-extract-pane.md · RULING PIN CC-108/A-17⟩
- **`src/` edits** — G18. The `{precision}` option is X-W9's (CE-8).
- **A second screenshot mechanism** — `W7.md` §4 forbids it; `e2e/visual/**` is X-W1's.
- **L5-1's shared-`slugify` cure** — KILLED (W7.14).
- **AuroraPane K-12's `text-admin-label` cure** — KILLED on three axes (W7.124).
- **⟨wb-extract-pane.md · XP-7⟩** — routes to X-W1, not X.W7.g.

---

## §Closing

**Status verbs.** This wave remains `planned`. This fold **CONSUMED** 48 named corpus records plus 2 found by whole-corpus grep (`AdminListSkeleton.md`, `shell-dock-parseechoreadout.md`); **DEDUPED** ~60 duplicate bookings into single identities (the largest folds: EXPORT-DUAL-PATH 6 witnesses, auth≠empty 5, filtered-zero 5, BUTTON-VARIANT-INERT 8, no-request-identity 5, colour-surface-roster 5, `cssColorOpaque` 4, bidi 4, nullity 4, `--ink-muted` 3, index-in-key 3, `font-display`-on-controls 6); **CARRIED** 21 cure-shape locks and binding riders, 6 sequencing edicts, and 5 preserved dissents; **BOOKED** 4 NO-WAVE-OWNER packets and 7 bounds deltas; **CORRECTED** 12 corpus/spec cells on the record; and **NAMED** 9 born-RED gate candidates with real witnesses plus 20 sharpenings of the dated gates.

**The fold's headline for the formation boundary.** X-W7 is the only wave whose bounds could receive the admin operative core, the palette-card composables and the extract cone — and its §4 table holds none of them, while its own §5 unit prose assumes all of them (§1a C-3). Two adjudicated BLOCKER identities in this wave's own subject matter (auth-costumed-as-empty, prune-scope fabrication) have five in-bounds view surfaces and zero in-bounds composables; six of the wave's twenty gates specify mounted assertions on a substrate that does not exist (N-1); and the one row a formation "may not open without" (MMD-2) sits in a packet no wave holds.

**Nothing above stamps a gate, opens product source, or edits a dated file.**

---

## §R1 — ROUND-1 FOLD REPAIR (2026-08-28) · the id-keyed census re-run fresh and CLOSED

**What this section is.** The X-W7 repair seat's answer to `PASS-1-CHECK-RETURN.json` BLOCKER 1 (census)
and MAJOR 2 (NWO row-carriage), consumed through `refinement/ROUND-1-ASSIGNMENTS.md` under the spine's
ROW-CARRIAGE LAW. It carries **394 rows** the pass-1 fold did not: every ⟨record.md · id⟩ this seat's own
fresh census finds routed to X-W7 and absent from this file, **plus** the assignment's §A/§B roster, **plus**
the one §C EXTERNAL row. Sole write: this file. No dated file touched (E-3). No product source opened.
Status stays `planned`; dispositions stay ADJUDICATED.

**Why the count is larger than the work order.** The work order assigns X-W7 **223 identities** (38 §A NWO +
185 §B census, minus declared overlaps) + 1 external. This seat's re-run — mandated as a floor, not a
ceiling — finds **393 registry identities**. The excess is not invention: it is what the **⟨record.md · id⟩
citation law of §1a C-1** costs when it is actually applied. The check said so itself ("under the fold's OWN
citation law the figure rises to 274, because 85 further ids are matched only by a colliding namespace").
The check's roster and the work order both tested **bare bytes across the whole fold layer**; this seat tests
**record-attributed bytes inside this fold**, which is the law this file wrote. Under that test whole records
the roster never named are gutted here — `PaletteCardSwatches` (33), `PaletteColorStrip` (24),
`ActionFeedback` (15), `PaletteCardSkeleton` (13), `FlagReportDialog` (10), `MiniColorPicker` (10).

**Method (falsifiable, re-runnable).** Corpus = the 92 non-`kf-*`/`fr-*`/`pt-*` `*.md` at
`docs/tranches/V/megatranche/registry/adjudicated/` (non-recursive). **Row** = a bold-leading id line
(`- **ID` / `| **ID`) whose id carries a digit and a separator, plus its continuation block to the next row
line or heading → **3,828 rows / 1,966 distinct ids**. **Routed to X-W7** = the row's text carries a wave
token `X[-·.–]W7` (hyphen, en-dash and dotted forms all counted, with unit suffixes `.a`–`.g`) within 30
characters after a routing marker (`→` · `Disposition` · `BUILD` · `BOOK` · `Terminal` · `routes to` ·
`re-homed` · `rides` · `owns/owner` · `| **`) → **529 rows**. **Carried** = the id, in any separator form,
appears in THIS file inside a `⟨…⟩` citation naming its own record, or bare on a line naming its record, or
bare when the id is unique corpus-wide → **171**. **ESCAPED = 356.** Union with the work order's 223 (which
adds 37 NWO/roster identities whose own row lines carry no routing verb — the extract-cone `EC-*` band,
`R-32`/`R-33`, `AL-X3`, `P-5`, `V-11`, `MMD-3`, the `US-*` limbs, `SP-32`, `AAP-11/23/31`, `ATP-28/30/33/42`,
`TEP-26/30`, `D4-01`) = **393**. Zero-padding is identity (`D-06` ≠ `D-6`); case is identity (`ADJ-M1` ≠
`ADJ-m1`); every id below is original for life.

**Row-band arithmetic.** §Rows held **W7.1 … W7.140**. This band is **W7.141 … W7.533** (393, gapless), plus
**W7.X1** for the EXTERNAL row. New §Rows total = **534**. Of the 393, **48 carry an NO-WAVE-OWNER limb** and
are folded *as* NO-WAVE-OWNER — carried, never re-homed silently (the §BoundsDelta packet is named per row).
Where a new id is a facet of an already-folded identity, the row is an explicit **`≡`-pointer** to the
existing `W7.n` — the byte census closes without a second booking, exactly as the consumption rule requires.

**Classes** are the fold's own (cl.1 sharpening · cl.2 cure-lock/binding · cl.3 MEASURE-AT-OPEN · cl.4
excluded/routed-elsewhere-but-recorded). **Bounds**: a very large share of this band lands on files §4 does
not grant — `PaletteCardSwatches.vue`, `SwatchHoverMenu.vue`, `CurrentPaletteEditor.vue`, the card
composables, `MiniColorPicker.vue`, `UserSortMenu.vue`, `ExtractControls.vue`, `dateFormat.ts`, the admin
composables. Those rows are marked `[BD-n]` against the existing §BoundsDelta blocks B-1…B-7; **this fold
still cannot amend §4** and does not.

### §R1.1 — ⟨PaletteCardSwatches.md⟩ — 33 rows (W7.141–W7.173)

*Band context: the swatch row + its hover/touch disclosure. Every file in this record except
`PaletteCard.vue` sits in `[BD-B5]` (the §5-glob vs §4-table delta). The band's spine is W7.33/34/36 (SH-1/2/3)
— these are the 33 identities that ride it and were never carried.*

**W7.141 · ⟨PaletteCardSwatches.md · PS-2⟩ — BLOCKER: the swatch is a control on NO input path** (cl.2). glass-ui 7 `WatercolorDot` declares no `tag`, sets `inheritAttrs:false`, hardcodes `aria-hidden="true"` + `pointer-events:none`, so `tag="button"`, `:aria-label`, `@click.stop` (hover path, `SwatchHoverMenu.vue:32-35`) and the `PopoverTrigger as-child` merge (touch path, `:13-20`) are ALL silently discarded — and `vue-tsc` exits 0 over all of it. **≡ W7.33's SH-1/SH-2 identity, second witness, folded id-for-life; the cure is SUBTRACTION under canon (SH-3), not a repair.** [BD-B5]

**W7.142 · ⟨PaletteCardSwatches.md · PS-3⟩ — MAJOR: `aria-hidden="true"` over three focusable native buttons, teleported to document end with no trap/restore/Escape** (cl.1). axe `aria-hidden-focus`, WCAG 4.1.2; the file's self-declared mitigation (`SwatchHoverMenu.vue:38-39`, "the reka-ui Popover (touch path) is the accessible route") names a route PS-2 proves dead. BLOCKER→MAJOR demotion ratified at the record. **≡ W7.34's SH-4 limb.** [BD-B5]

**W7.143 · ⟨PaletteCardSwatches.md · PS-4⟩ — MAJOR: under `prefers-reduced-motion` the expand/collapse Transition NEVER COMPLETES** (cl.2). `done()` is gated exclusively on a `height` transitionend (`useHeightTransition.ts:35-39/:66-70`); the central PRM guard strikes `height` from the transition set entirely (author-`!important` beats the author-normal inline shorthand at `:30/:61`), so the hook never resolves and the subtree is never unmounted. **≡ ⟨PaletteCard.md · PC-1⟩ (W7.170) — one identity, two records; new gate N-13.** [BD-B5]

**W7.144 · ⟨PaletteCardSwatches.md · PS-5⟩ — MAJOR: the animated property is layout-forcing `height` off a synchronous `scrollHeight` with deliberate double-forced reflow** (cl.1). `:29-32`, `:54-56`, `:61-63`, on bespoke 350/250 ms durations the file's own header admits match no token (`:1-7`), while the tokenized `--vj-morph-*` alternative is in use in the same parent (`PaletteCard.vue:358-363`). Dies with the disclosure. [BD-B5]

**W7.145 · ⟨PaletteCardSwatches.md · PS-6⟩ — MAJOR: the press leg of all four buttons is untimed in BOTH motion modes, and the ruled migration target does not exist** (cl.2). `active:scale-95` under `transition-colors` (property list excludes `transform` at no-preference and under reduce alike); `btn-interactive` (T.W5-R5 via `demo/DESIGN.md:237,247`) has **zero matches in glass-ui 7**. **Cure lock: the prescribed migration target must be re-derived before it is cited — it is not a shipping recipe.**

**W7.146 · ⟨PaletteCardSwatches.md · PS-7⟩ — MAJOR: affordance inversion, and the COPY-SEAT rider the check found absent from the whole fold layer** (cl.2). The inert slug pill wears the bordered-control signature while the row's only real control is a 16×16 px bare glyph (`p-0.5` + `w-3 h-3`, no min-size); the ratified cure sits eleven lines up (`PaletteCard.vue:93-104` `Button icon-only size="sm"` + the S.W5-4 comment naming this exact defect). **Lock carried verbatim (PaletteCardSwatches.md:24): "the successor must size the copy seat BEFORE or WITH the swatch-activation cure."** WCAG 2.5.8 framing struck per R-1. *This is the id the check named as resolvable only through `PreviewStrip`'s colliding `PS-7` — ⟨record · id⟩ closes it.* [BD-B5]

**W7.147 · ⟨PaletteCardSwatches.md · PS-8⟩ — MAJOR: the icon-button recipe is hand-rolled six times verbatim across two files** (cl.1). `:44/:51/:58` + `CurrentPaletteEditor:46/:49/:52`, plus the `p-0.5`/`shrink-0` near-copy at `:14`, with the producer atom already imported by the parent. D-8's premise sentence is KILLED (K-3) — carry the kill with the row. [BD-B5]

**W7.148 · ⟨PaletteCardSwatches.md · PS-9⟩ — MAJOR: `focus-visible:ring-ring/40` reaches a token that does not exist in the served cascade** (cl.1). No `--color-ring`/`--ring` declaration anywhere; the sole textual hit is the `focus-ring.css:11` postmortem naming this exact death, so the utility emits nothing and bare `ring-2` falls back to `currentColor`. Witness for new gate **N-12** (dead-token census). [BD-B5]

**W7.149 · ⟨PaletteCardSwatches.md · PS-10⟩ — MAJOR: the disclosure has no payload** (cl.1). The expanded panel re-renders the SAME `palette.colors` array the collapsed strip already shows (`PaletteCard.vue:33-37` vs `:139-141`); on `/#/palettes` (no `show-slug`) the expansion adds literally nothing. Canon verb verbatim (PR-26): **REMOVE / ADD-AFFORDANCE**. *Sharpens*: G12 — a specimen whose disclosure discloses nothing is not a specimen.

**W7.150 · ⟨PaletteCardSwatches.md · PS-11⟩ — MAJOR: N = 0 is a named, reachable state that expands into an undesigned 24 px blank band** (cl.1). The parent's own S.W2/W2-9 comment (`PaletteCard.vue:220-223`) names the state; the band is ruled with a border precisely when the slug row is absent (`:23`), while the designed empty mark sits unused (`EmptyState.vue:40-48`, three ghost `WatercolorDot`s). Couples to W7.53 (ES-5). → X.W7.c.

**W7.151 · ⟨PaletteCardSwatches.md · PS-12⟩ — MAJOR: the padding ladder is 12 px against the named canon `C = --spacing(4)` = 16 px** (cl.1). `px-3` plus internal 10/12/12 drift (`pt-2.5` vs `pt-3`), PROPORTION-AUDIT §5 item 12 verbatim. **IDENTITY-family ≡ ⟨PaletteCard.md · PC-24⟩ (W7.191)** — a card-cluster non-conformance, understated if booked against the leaf alone.

**W7.152 · ⟨PaletteCardSwatches.md · PS-13⟩ — MAJOR: the provenance chip is the boldest ink on the card and is tinted with the palette SEED, which VC:21 forbids outside named lanes** (cl.2). 700 vs the palette identity's 500; sibling chips tint with ROLE tokens. **Weight limb RESCOPED at the record: `font-bold` is the ratified `.slug-pill` recipe's own weight (`foundation.css:586`) — a cure that re-weights the pill forks the ratified recipe.** Cite, don't fork (EAS-12).

**W7.153 · ⟨PaletteCardSwatches.md · PS-14⟩ — MAJOR: false press affordance** (cl.1). The card's pointer-phase press spring (`v-bind="press.handlers"`, `PaletteCard.vue:24`) runs under a swatch that then does nothing — `@click.stop` at `:2` stops the CLICK phase only, and the dot itself is `pointer-events:none`. Converges with ⟨PaletteCard.md · PC-20⟩ (W7.179). → X-W7.c G11 / X-W7.d.

**W7.154 · ⟨PaletteCardSwatches.md · PS-15⟩ — MAJOR: one affordance, two implementations, and the branch that ships to every desktop is the broken one** (cl.2). `v-if="!canHover"` reka Popover vs the `v-else` hand-rolled Teleport — which is exactly why no gate ever exercised the working branch. **≡ ⟨SwatchHoverMenu.md · SH-5⟩ (W7.456).** Cure buildable TODAY at the record. [BD-B5]

**W7.155 · ⟨PaletteCardSwatches.md · PS-17⟩ — MAJOR: panel-centring ownership is split across the composable and its two consumers, and they DISAGREE** (cl.1). `useHoverPopover` emits the swatch CENTRE as `left` (`:23`); this file adds `translateX(-50%)` in transit (`:31`); `CurrentPaletteEditor` passes the style with NO transform (`:35`). One box, two renderings. **≡ SH-5's centring-drift limb.** [BD-B5]

**W7.156 · ⟨PaletteCardSwatches.md · PS-19⟩ — MINOR: the `border-border/15` divider is in the DOM and not on the screen; four post-hoc alpha families contradict the parent's own retirement edict** (cl.1). **IDENTITY ≡ ⟨PaletteCard.md · PC-35⟩ (W7.49)** — folder-wide census banked there; the rider this corpus ADDS: `prefers-contrast: more` re-derives `--border` toward full ink, so the invisible divider becomes visible only for the users the alpha was hiding it from. Under X-W10 canon.

**W7.157 · ⟨PaletteCardSwatches.md · PS-20⟩ — MINOR (SCOPED per R-6): the ~111 px expanded region is a click dead-zone** (cl.1). The bare `@click.stop` at `:2` swallows clicks that would collapse/select the card and, per PS-2, nothing inside responds either. The teleported panel is explicitly OUT of this claim (K-12) — carry the exclusion. → X-W7.d.

**W7.158 · ⟨PaletteCardSwatches.md · PS-21⟩ — MINOR: `min-w-0` at `:22` is a dead declaration on the primary path** (cl.1). Block-formatting parent at `layout="default"`; the `items-start` limb is DEMOTED to conditional per R-7. → X-W7.c.

**W7.159 · ⟨PaletteCardSwatches.md · PS-22⟩ — MINOR: one box's position is owned by three files with the type WIDENED at the middle hop** (cl.1). `reactive({top,left})` → `Record<string, string|number>` (`:82`) → `CSSProperties` (`SwatchHoverMenu:73`); structural typing passes all three, so key drift is not a compile error. **IDENTITY ≡ ⟨SwatchHoverMenu.md · SH-19⟩ (W7.461).** Dies with the composable. [BD-B5]

**W7.160 · ⟨PaletteCardSwatches.md · PS-23⟩ — MAJOR at the bank: the clipboard verdict is discarded at 6/6 palettes sites while `ActionFeedback` + `showFeedback` sit wired to nothing** (cl.1). Grep census exact. The "worst of six / floating rejection" sub-limb is KILLED per R-2/K-9 — carry the kill. **IDENTITY ≡ ⟨PaletteCard.md · PC-21⟩ (W7.180) ≡ W7.21.** Witness for new gate **N-11**.

**W7.161 · ⟨PaletteCardSwatches.md · PS-24⟩ — MINOR: raw CSS colour strings interpolated into accessible names** (cl.1). `:43/:50/:57` — "Edit color oklch zero point six two…". Cross-booked LINE-EXACT with om-14 FORMAT-AUDIT B5–B7 **RAW-ARIA**. → X-W7.f (the formatting facility owns the spoken form) / X-W7.d. *Sharpens*: G16 — the raw-serializer blast radius reaches the a11y tree, not only the screen.

**W7.162 · ⟨PaletteCardSwatches.md · PS-25⟩ — MINOR: no cap, no scroll, no ceiling at large N** (cl.1). Unconditional `v-for`, no `slice`, store keeps `colors` verbatim, while the codebase ships the idiom twice (`VersionHistoryDrawer.vue:53`, `PreviewStrip.vue:34` — drifted lines corrected at the record). → X-W7.c, the arbitrary-N law's own unit.

**W7.163 · ⟨PaletteCardSwatches.md · PS-26⟩ — MINOR: panel position is computed ONCE inside `nextTick` with a magic `−42`** (cl.2). No scroll/resize/ResizeObserver/clamp/flip anywhere in the file. **Anti-resurrection guard carried: PS-1's cure must not revive this.** Converges with PS-17. **≡ ⟨SwatchHoverMenu.md · SH-17⟩ (W7.459).** [BD-B5]

**W7.164 · ⟨PaletteCardSwatches.md · PS-28⟩ — MINOR (UPGRADED per R-3): one hover re-renders all N swatches** (cl.1). The reactive style object is spread inside the `v-for`, so every `positionPanel` write mints N fresh prop objects and patches N children where one element's `:style` write would do. **≡ W7.36 (SH-24) — second witness, id preserved.**

**W7.165 · ⟨PaletteCardSwatches.md · PS-31⟩ — MINOR: a domain rule lives as a negated `boolean | undefined` in a presentational leaf** (cl.1). `v-if="!isLocal"` (`:42`) while the same parent computes `PaletteKind` and hands it to a sibling child (`PaletteCard.vue:225` vs `:142`). → X-W7.d (capability gating becomes the inspector's, typed).

**W7.166 · ⟨PaletteCardSwatches.md · PS-32⟩ — MINOR: clipboard ownership splits inside one parent/child pair eleven lines apart** (cl.1). Slug copy executes locally (`:16`); colour copy emits up (`:59` → `PaletteCard.vue:331-334`); four homes across the feature. → X-W7.d, with W7.160/N-11.

**W7.167 · ⟨PaletteCardSwatches.md · PS-33⟩ — MINOR: the truncating slug pill has no `title` while the equivalently-truncating name one row up has one, and the adjacent button copies the slug IN FULL** (cl.1). `truncate max-w-tooltip` = 200 px (`foundation.css:117`) vs `PaletteCard.vue:53-59`'s `:title`. What is copied is not what is shown, with no way to see the difference. Same family as W7.56 (M-LC2).

**W7.168 · ⟨PaletteCardSwatches.md · PS-35⟩ — MINOR: every swatch mounts an unconditional `<Teleport to="body">` whose content guard sits one level in** (cl.1). `:37` vs `:41 v-if="open"` — M × N Teleport instances + anchor comments for zero output on every expanded card; the corpus's own probe photographed the residue (`bodyTail: "<div><!--teleport start--><!--teleport end--></div>"`) without recognising it. **≡ W7.36 (SH-27); cure is one token.**

**W7.169 · ⟨PaletteCardSwatches.md · PS-36⟩ — MINOR: `useBreakpoint("(hover: hover)")` is instantiated once per PaletteCard for a global environment fact** (cl.1). `useHoverPopover.ts:11` via `PaletteCard.vue:255`, again via `useSwatchActions.ts:40`; the producer creates a fresh `matchMedia` + listener per call with no cache. Duplication, **not a leak** (it disposes correctly) — carry the correction. [BD-B5]

**W7.170 · ⟨PaletteCardSwatches.md · PS-38⟩ — INFO: the seam runs across one interaction rather than around one concern** (cl.1). 8 props / 8 emits, zero reactive state; 4 props and 5 emits forwarded verbatim; five files own one popover (state `PaletteCard.vue:246-255` · geometry `useHoverPopover:20-24` · transform `:31` · DOM `SwatchHoverMenu:37-51` · CSS the DELETED `floating-panel.css`). **Reader 1's causal sentence stands: no single file's review surfaces this.** ≡ SH-5's five-file-seam limb.

**W7.171 · ⟨PaletteCardSwatches.md · PS-39⟩ — INFO: `readonly PaletteColor[]` here vs mutable `PaletteColor[]` in the sibling fed the same array, plus bare `defineProps` against the 3.5 reactive destructure** (cl.1). → X-W7.c.

**W7.172 · ⟨PaletteCardSwatches.md · PS-40⟩ — INFO: vacuous gate — ZERO spec files reference the component, its composables, classes or aria-labels** (cl.1). Re-run by both readers and the seat. **This is the load-bearing explanation for how two BLOCKERs survived the Glass 7 adoption (W44).** → X-W7.c: born-RED reachability gates on the successor are a wave-open obligation. Same identity as CE-7's vacuous-gate family.

**W7.173 · ⟨PaletteCardSwatches.md · V-11⟩ — NO-WAVE-OWNER: glass-ui's `@utility touch-hit-area` reserves layout without enlarging the hit region; zero demo consumers** (cl.4). **NOT a finding against this component** (reader 1 correctly withdrew it) — recorded as a **BH/BI relay question for the glass-ui seat**: is it intended as a hit-area cure? It cannot currently be one. Rides §CrossEdges CE-9; no wave owns it.

### §R1.2 — ⟨PaletteCard.md⟩ — 30 rows (W7.174–W7.203)

*Band context: the specimen itself. `PaletteCard.vue` IS in §4 as `modify-carve`, so most of this band is
executable — except the deletion §5.d assumes (§1a C-4, §BoundsDelta B-7).*

**W7.174 · ⟨PaletteCard.md · PC-1⟩ — BLOCKER: under `prefers-reduced-motion` the expand/collapse Transition never completes and the swatch subtree is never unmounted** (cl.2). Three legs re-derived at the record: `useHeightTransition.ts:35-39/:66-70` gate the only `done()` on `propertyName === "height"`; `a11y-overrides.css` rewrites the PRM transition set to five colour properties `!important` (height absent); the 2-arity hooks mean Vue 3.5 waits for the callback forever. **≡ W7.143 (PS-4) — one identity, two records. Gate N-13.** [BD-B5 for the composable]

**W7.175 · ⟨PaletteCard.md · PC-4⟩ — BLOCKER (RESCOPED per R-1): the card root has zero hover/focus feedback and a false choreography comment; the press register is live but landlocked** (cl.1). No `:hover/:active/:focus-visible` rule matches the root anywhere; `.cartoon-cast` (`:30`) matches nothing (R-1b); `--card-press-t` has zero readers. **≡ ⟨PaletteCardGrid.md · PG-17⟩ (W7.398) and ⟨PalettesPane.md · PP-12⟩ (W7.376) — one write/read mismatch, three records.** Witness for gate **N-12**.

**W7.176 · ⟨PaletteCard.md · PC-5⟩ — BLOCKER: `contain: content` on the zero-padding grid paint-clips the card's −3/−5/−7 px cartoon caster** (cl.2). Every card loses its left facets, the last its bottom. **IDENTITY ≡ ⟨PaletteCardGrid.md · PG-4⟩ (W7.387) ≡ ⟨BrowsePane.md · M9·D5-03⟩ — banked → X-W7.c G11, with PG-4's rider intact: audit the second clip ancestor `.pane-scroll-fade` in the same cure.** *This is the id-pair the check named as absent from the whole layer while the record asserts it "already banked".*

**W7.177 · ⟨PaletteCard.md · PC-6⟩ — BLOCKER: at 390 px the palette name renders at 0 px while the row reserves two line boxes for it** (cl.1). `line-clamp-2 sm:line-clamp-1` (`:55`) sets `overflow: hidden`, resolving the flex item's `min-width: auto` to 0; every sibling in the row is `shrink-0`, so the title is the only crushable member and it crushes to nothing. Pixels are residue U-5. **≡ ⟨PaletteCardMeta.md · PM-5⟩ (W7.328).** *Sharpens*: G9 — the overflow gate's 390 px cell has a named zero.

**W7.178 · ⟨PaletteCard.md · PC-8⟩ — BLOCKER (AGGREGATE): the card ships no functioning colour-copy path in any register** (cl.1). `copyAll` is dispatch-registered (`:294`) and emitted by NOBODY (one hit repo-wide: the definition); `PaletteCardMenu` emits 17 verbs, never `copyAll`; the per-swatch Copy button lives inside the unpositioned panel (PC-2) behind an inert trigger (PC-3). *Sharpens*: G13 — a mutation table cannot certify a verb with no emitter.

**W7.179 · ⟨PaletteCard.md · PC-9⟩ — MAJOR (RESCOPED per R-6/K-5): the card's primary action is pointer-only** (cl.1). `role="article"` + `cursor-pointer` + `@click` (`:19-26`), no `tabindex`, no `aria-expanded`. **The "no @keydown" support sentence is KILLED — `v-bind="press.handlers"` (`:24`) installs onKeydown/onKeyup/onBlur — but they drive only the spring, and with tabIndex −1 no keystroke reaches them.** Carry the kill with the row.

**W7.180 · ⟨PaletteCard.md · PC-10⟩ — MAJOR: `role="list"` owns zero `listitem`s in both states** (cl.1). **≡ ⟨PaletteCardGrid.md · PG-3⟩ (W7.386) ≡ ⟨EmptyState.md · ES-9⟩ (W7.51)** — one identity, three records; `≡`-pointer only, not re-booked.

**W7.181 · ⟨PaletteCard.md · PC-12⟩ — MAJOR (MERGED): the title span is a click dead-zone at three of five hosts and a rename hijack on coarse pointers at the other two** (cl.1). `.stop` at `:58` kills propagation unconditionally (withModifiers stops before the guard runs); `editableName` is passed only by PalettesPane and ExtractWorkbench, so at Browse/Admin/Mix the largest target in the row does nothing.

**W7.182 · ⟨PaletteCard.md · PC-13⟩ — MAJOR: every async verdict is unannounced; ActionFeedback has no live region** (cl.1). **IDENTITY ≡ ⟨ActionFeedback.md · AF-1⟩ ≡ W7.64** — not re-booked; this record adds only the card-side reach map (`:123-128`, `defineExpose :244`, `cardRefs` at both panes).

**W7.183 · ⟨PaletteCard.md · PC-14⟩ — MAJOR: the `aside` layout arm is unreachable dead surface, and it drags `PaletteColorStrip`'s `orientation` prop down with it** (cl.1). ExtractPane hard-codes `layout="column"`; the sole `:layout` ternary can never yield `'aside'`. **≡ ⟨PaletteColorStrip.md · PCS-16⟩ (W7.267).** → X-W7.c; X-W8's dead-surface gate is the backstop.

**W7.184 · ⟨PaletteCard.md · PC-15⟩ — MAJOR: the "one shared shell" has three hand-typed homes already drifted** (cl.2). Card = `cartoon-surface` (md shadow / 2 px border); skeleton + ShadowPalette = `border … shadow-cartoon-sm` (1 px) — against `DESIGN.md:98` ("PaletteCard (+skeleton — one shared shell)"). **G11 owns the shell; the dueling-cures INFO row is subsumed, not carried twice.** ≡ ⟨ShadowPalette.md · SP-15⟩ (W7.242), ⟨PaletteCardSkeleton.md · PCS-6⟩ (W7.403).

**W7.185 · ⟨PaletteCard.md · PC-16⟩ — MAJOR: `.cartoon-cast` has two producer homes; the loaded one is descendant-scoped and unreachable from this root** (cl.2). The hand-authored span is inert markup. **Cure lock carried: if G11 wants the cel cast, the vehicle is the producer's own `liquid-enter is-cel` contract or a BH-relay ask — NEVER a local unscoped duplicate.**

**W7.186 · ⟨PaletteCard.md · PC-18⟩ — MAJOR: the loading ghosts model a component that does not exist** (cl.1). A 56 px swatch row the collapsed card never renders, `overflow-hidden` the card explicitly refuses, `sm` where the card wears `md`. The CLS narrative is KILLED (#6) — carry the kill. **≡ ⟨PaletteCardSkeleton.md · PCS-4⟩ (W7.401).**

**W7.187 · ⟨PaletteCard.md · PC-19⟩ — MAJOR: the Featured badge's gold shimmer cannot reach text contrast in light mode, and the producer's PRM gate parks the gradient at its least legible stop permanently** (cl.1). `.gold-shimmer` = 5-stop gradient, `background-size: 250% 100%`, clip-text, `color: transparent`; the sweep lives ONLY under `no-preference`. **Exactly the users who asked for less motion get the worst legibility.** Under X-W10 canon; relay-informational only.

**W7.188 · ⟨PaletteCard.md · PC-20⟩ — MAJOR: the press register is bound to the article CONTAINER, so every descendant interaction squashes the whole card** (cl.1). Space/Enter typed in the rename input, pointerdown on menu/vote/copy/swatch buttons, pointerenter with a held button during a sortable drag; the folder's four `.stop` modifiers stop `click`, not the press phases. ≡ W7.153 (PS-14).

**W7.189 · ⟨PaletteCard.md · PC-21⟩ — MAJOR: all four clipboard writes discard the producer's discriminated `CopyResult`** (cl.1). `void writeClipboard(…)` at `:294/:333`, bare call at `PaletteCardSwatches.vue:16`, `useSwatchActions`; the component owns a purpose-built verdict surface it never uses for them. **≡ W7.21 · W7.160 (PS-23) — one identity, three records. Gate N-11.**

**W7.190 · ⟨PaletteCard.md · PC-22⟩ — MAJOR (RESCOPED per R-6): the emit surface is a 16-verb bus the average host wires 5.6/16** (cl.1). Corrected census 15/6/3/4/0 over FIVE hosts (the sixth was invented — K-3); Mix's menu emits every verb into silence. → X-W7.d: menu verbs become the inspector's, availability-gated per host capability (the K-INV5 pattern in `PaletteCardMenu` is the model). ≡ W7.48.

**W7.191 · ⟨PaletteCard.md · PC-24⟩ — MINOR: `px-3` (12 px) hand-codes what the producer canon binds at 16 px** (cl.1). `--card-pad-inline` is unreachable because the root is a bare div, not `.card`. ≡ W7.151 (PS-12). → X-W7.c.

**W7.192 · ⟨PaletteCard.md · PC-26⟩ — MINOR: the drag handle is a 16 px unnamed `<svg>` with no keyboard reorder path, bound from the pane's options bag as a bare class-string contract** (cl.1). The sortable data-integrity rows are banked at W7.25 (PG-1/PG-2) with the named-addition rider. → X-W7.c/d; gate N-7.

**W7.193 · ⟨PaletteCard.md · PC-27⟩ — MINOR: the disclosure exposes no state to AT** (cl.1). No `aria-expanded`, no `aria-pressed` anywhere in the file. Dies with the disclosure. → X-W7.d.

**W7.194 · ⟨PaletteCard.md · PC-29⟩ — MINOR: the strip's `rounded-t-card` arc exceeds the card's inner arc by exactly one 2 px border-width** (cl.1). Concentricity is broken by construction because the card refuses a root clip and the strip clips itself; arithmetic source-certain, pixels residue U-5. → X-W7.c G11 (silhouette law). ≡ ⟨PaletteColorStrip.md · PCS-6⟩'s corner-law limb.

**W7.195 · ⟨PaletteCard.md · PC-30⟩ — MINOR: one shared `expandedId` ref carries two disjoint key spaces** (cl.1). PalettesPane keys `palette.id`; Browse/Admin key `palette.slug`; the composable's own writers use the id axis (`usePaletteActions.ts:24-29`). **≡ W7.8 (AdminPane expandedId aliasing ≡ Δ-17) — second witness, id preserved.**

**W7.196 · ⟨PaletteCard.md · PC-31⟩ — MINOR (R-5 ruled): the rename confirm/cancel buttons announce as bare "button" in the folder that documents the icon-button naming rule four times** (cl.1). → X-W7.d (the rename seat rebuild). ≡ ⟨PaletteRenameInput.md · A-3⟩ family (W7.134).

**W7.197 · ⟨PaletteCard.md · PC-32⟩ — MINOR: the colour-count badge is an unlabelled bare numeral — and it is the only quantitative fact about the specimen that reaches AT** (cl.1). `:72-74`; strip and faces are both aria-hidden (PC-3/PC-7), so the AT transcript of a five-colour palette is "Palette: … · Featured · 5 · Palette menu". → X-W7.c + X-W7.f (W7.f owns count formatting at `PaletteCardMeta`). ≡ ⟨PaletteColorStrip.md · PCS-20⟩ (W7.270).

**W7.198 · ⟨PaletteCard.md · PC-33⟩ — MINOR: `:title` is the card's only truncation recovery and it is unavailable precisely where truncation is total** (cl.1). Coarse pointers at 390 px (PC-6): the recovery and the failure are disjoint by construction. → X-W7.c.

**W7.199 · ⟨PaletteCard.md · PC-34⟩ — MINOR: Extract's card is unconditional `cursor-pointer` over `@click="() => {}"`** (cl.1). A false affordance with no hover register to contradict it (PC-4); `ExtractWorkbench.vue:152`. **≡ ⟨wb-extract-workbench.md · XW-12⟩ (W7.415).** → X-W7.c/d.

**W7.200 · ⟨PaletteCard.md · PC-36⟩ — MINOR: the dispatcher's rename special case is a no-op wearing an explanatory comment** (cl.1). `startRenaming()`'s first statement closes the menu the guard claimed to hold open (`:291-292` vs `:281/:317`). → X-W7.d (the dispatcher dies).

**W7.201 · ⟨PaletteCard.md · PC-37⟩ — MINOR: the unnamed `<Transition>` runs Vue's CSS machinery and stamps undefined `v-enter-*` classes per toggle** (cl.1). Folded as PC-1's rider at the record; counted here so the find is not lost. → X-W7.c.

**W7.202 · ⟨PaletteCard.md · PC-38⟩ — MINOR: the default swatch-size utility string is triplicated with no shared source** (cl.1). Prop default `:197`, JSDoc `:194`, `SwatchHoverMenu` default `:82` — sixteen lines from a comment naming the exact discipline (`PANEL_LAYOUT`) it breaks. → X-W7.c.

**W7.203 · ⟨PaletteCard.md · PC-39⟩ — INFO: the cone's comments cite `PaletteDialog.vue` (with a line number) as a live consumer; no such file exists** (cl.1). `constants.ts:6`, `useHoverPopover.ts:8`, `DESIGN.md:386`. → X-W7.c/d (dies with the rebuild); the DESIGN.md citations ride X-W10's canon pass.

### §R1.3 — ⟨SearchFilterBar.md⟩ — 28 rows (W7.204–W7.231)

*Band context: `SearchFilterBar.vue` IS in §4 (X.W7.a). The record's own S-7 KEEP-AND-WIDEN lock (W7.3)
governs every colour-search row below; `MiniColorPicker.vue` and `UserSortMenu.vue` are `[BD-B4]`.*

**W7.204 · ⟨SearchFilterBar.md · SFB-1⟩ — BLOCKER: the tag Checkbox binds `:checked`/`@update:checked`, which glass-ui 7 does not declare** (cl.1). `:51-55`; `Checkbox.vue.d.ts` declares `modelValue…class` and emits only `update:modelValue`; `toggleTag` (`:197-203`) is unreachable; the box ticks via reka's `passive` branch and **lies** — a filter UI announcing state the product does not hold. **≡ W7.1 (TEP-1/2/3) and ⟨TagEditPopover.md · TEP-17⟩ (W7.291) — 2 of 2 `<Checkbox>` sites in the demo, ONE cure stroke, publicly reachable without auth.** *Sharpens*: G1's occurrence count is exactly this pair.

**W7.205 · ⟨SearchFilterBar.md · SFB-3⟩ — the count badge renders for no one and is spoken to no one** (cl.1). `absolute -right-1 -top-1` (`:7-12`) is clipped by the trigger's own `contain: paint` (the trigger carries `glass-wash`) AND `aria-label="Filters"` (`:5`) overrides the subtree per accname. **Correction carried for the reformation: the governing D pass-5 DEMOTED this mechanism-proved, cross-engine BLOCKER — the demotion is recorded at the record and is not re-litigated here.**

**W7.206 · ⟨SearchFilterBar.md · SFB-5⟩ — `hover:shadow-cartoon-md` generates NO rule** (cl.1). `.shadow-cartoon-sm/md/lg` are `@layer components` classes, not `@utility`s; the token sits in plain `:root`; 0 `@theme` blocks — so `transition-shadow` transacts nothing on hover. Repo-wide `hover:shadow-cartoon` = 1 (the subject). Witness for gate **N-12**; see also W7.221 (SFB-25).

**W7.207 · ⟨SearchFilterBar.md · SFB-6⟩ — the disclosure is NOT shallow and its vertical economy is unowned** (cl.2). `:16` sets no height contract; producer `PopoverContent` ships no `max-h-*`/`overflow-y`; a second dialog (`MiniColorPicker`) nests inside. → X-W7 for consumer height/composition **+ BH relay** on the producer's missing overflow contract (informational, per CE-9's P051 refusal — no ask to restore forwarding).

**W7.208 · ⟨SearchFilterBar.md · SFB-7⟩ ≡ ⟨MiniColorPicker.md · MCP-13⟩ — the pending state is fiction** (cl.2). `async` with zero `await` (`:213-225`): `searching` flips true→false in one tick, so the spinner (`:102`), `:disabled` (`:98`) and all four `disabled:` utilities (`:99`) are unreachable; the parent handler is synchronous too. **CROSS-BOOKED — ONE identity; MCP-13 is the binding cure-caveat W7.11 already carries. Not re-booked, pointer only.**

**W7.209 · ⟨SearchFilterBar.md · SFB-8⟩ — two dead per-instance overrides ship a 32×40 trigger** (cl.1). `p-0` (`:16`) is beaten by the producer's `px-`/`py-` longhands (shorthand ordered first in the v4 sheet); `h-8` (`:5`) is beaten by `.button`'s `min-block-size` — `w-8` lands, `h-8` does not. Same mechanism family as W7.100 (MC-3) and ⟨AdminFlaggedPanel.md · AF-7⟩.

**W7.210 · ⟨SearchFilterBar.md · SFB-9⟩ — the tag list has no length contract** (cl.3). No truncate/`title`/`min-w-0`; `.filter-option` flex with no shrink basis; an authored `overflow-y: auto` mints an unauthored `overflow-x: auto` (CSS overflow-3 computed-value rule) — **and tag names are admin data, i.e. unbounded by another user.** Geometries are MEASURE-AT-OPEN.

**W7.211 · ⟨SearchFilterBar.md · SFB-10⟩ — 0-tag and failed-fetch render identically as nothing** (cl.1). `:47 v-if`; no loading/error/retry arm anywhere; props (`:147-152`) carry no request state; upstream `catch {}` in `useTagEdit`. **Same identity family as W7.83 (filtered-zero costumed as true-empty), here in its zero-vs-failure form.**

**W7.212 · ⟨SearchFilterBar.md · SFB-11⟩ — the sanctioned menu idiom is 58 lines away and the migration stopped next door** (cl.2). `UserSortMenu` = DropdownMenu + Label + RadioGroup, `size="xs"`, `aria-hidden` glyphs; the full family is re-exported in-repo. **Binding caveat, both readers converging: the exemplar is NOT clean — `variant="ghost"` at `UserSortMenu.vue:8` (the BUTTON-VARIANT-INERT family, W7.10) and the `(v: any)` seam ride with it. A migration that copies the exemplar copies two banked defects — and `:8` is the CE-3 cure-collision byte.**

**W7.213 · ⟨SearchFilterBar.md · SFB-12⟩ — "search/filter chrome is one family" is broken** (cl.1). Both panes bind the SAME model (`pm.searchQuery.value`) through the same `search-seated` SearchBar — one query state, two placeholders, filter menu on Browse only. **≡ W7.7 / gate N-4 (one `searchQuery` per domain).**

**W7.214 · ⟨SearchFilterBar.md · SFB-13⟩ — after a typed search the swatch fill AND its `aria-label` name a colour different from the applied filter** (cl.1). `applyColorSearch` never writes `pickerHex` (`:175-187` are the only writers; `:213-225`) — a false contract even for regex-ACCEPTED input. Rides the S-7 keep-and-widen lock (W7.3).

**W7.215 · ⟨SearchFilterBar.md · SFB-14⟩ — "Clear all filters" unmounts itself while focused** (cl.2). `v-if` (`:110`) on the very count (`:189-195`) its activation zeroes (`BrowsePane:329-332`). **Cure stated at the record: `:disabled` + stay mounted — which also stops the menu resizing under the pointer.** Same species as W7.106 (ES-2) and ⟨PalettesPane.md · PP-15⟩ (W7.378): self-removing actuators.

**W7.216 · ⟨SearchFilterBar.md · SFB-16⟩ — the colour filter runs client-side over one loaded page and duplicates the API's shipped matcher** (cl.1). The wire params exist at BOTH ends and are dead (`currentFilterOpts` omits them): `BrowsePane:336-355` · `palettes.ts:27-30/:50-53` · `schema.ts:89-93` · `crud-list.ts:159-181`. Three lines in `currentFilterOpts()` (the record's superlative S-2). Same species as W7.62 (Δ-7 pagination theatre).

**W7.217 · ⟨SearchFilterBar.md · SFB-20⟩ — the closed `sort`/`tier` vocabularies are laundered to bare `string` across the emit seam** (cl.1). `:154-161`, `String(v)` at `:21/:33`, restored downstream by an unchecked `as` (`useBrowsePalettes:116-118`); `tier` crosses with no cast at all; the only guard on a server-validated enum is a literal array in a template file. `UserSortMenu:20` ships the same `(v: any)` — ≡ ⟨UserSortMenu.md · US-2⟩ (W7.504). *Sharpens*: G3 (`strictTemplates` makes the seam visible, it does not type it).

**W7.218 · ⟨SearchFilterBar.md · SFB-21⟩ — the banked error-state cure is structurally inoperative** (cl.2). The producer field-control destructures **exactly `aria-invalid` out** of forwarded attrs; the working path is the declared `invalid?: boolean` prop, never passed (`:88-96`). **Under `strictTemplates` the dead binding is indistinguishable from the `:93` noise — P4-4's triage applied mechanically would wave the operative cure through as noise. Carried as a G3 triage caveat.**

**W7.219 · ⟨SearchFilterBar.md · SFB-23⟩ — the trigger's affordance is a hairline** (cl.3). A 52%-alpha wash over the same wash family inside a glass pill; corroborated at passes 1+4 ("invisible except for a hairline" in dark). **The 1.4.11 BLOCKER framing is dead (K-10)** — the surviving argument is on the glyph, and **all numbers are MEASURE-AT-OPEN (R-3)**; MAJOR is contingent on that measurement.

**W7.220 · ⟨SearchFilterBar.md · SFB-24⟩ — DEMOTED (RULED #4): doubled icon-label interval** (cl.1). `mr-1.5` (`:117`) atop the producer `.button` gap = 12 px vs the 6 px system interval, on the menu's dominant row; physical-axis family with the badge's `-right-1 -top-1` (`:9`) under `dir="rtl"`. Cure: delete `mr-1.5`. Rider on any SFB touch; RTL census → X-W10 (W7.104).

**W7.221 · ⟨SearchFilterBar.md · SFB-25⟩ — the 1 px optical-centre disagreement has its mechanism** (cl.1). `.shadow-cartoon-sm` carries `translate: 0 -1px` and the swatch (`:76`) is the one row element with no competing translate utility; the MiniColorPicker sites are immune because Tailwind utility translates beat the components-layer rule. P3-m4's measurement, finally connected. Rider (`translate-none`).

**W7.222 · ⟨SearchFilterBar.md · SFB-26⟩ — two colour-mix spaces paint one popover's hovers** (cl.1). `.filter-option:hover` `in srgb` (`:248`) vs `bg-muted/50` → Tailwind `in oklab` (`:99`), intra-file; adopting `.interactive-item` (itself srgb) alone leaves the fork standing. Subject → X-W7; **the mixing-space law → X-W10** (cite, don't fork).

**W7.223 · ⟨SearchFilterBar.md · SFB-27⟩ — the tag scroller has no `overscroll-behavior`** (cl.1). `:49` — end-of-scroll chains the wheel to the pane behind an anchored popover (the corpus's 253 px drag-away, at any zoom). **Every in-corpus `overscroll-contain` proposal aimed at the PRODUCER; this is the consumer's own scroll container — one class, no relay.**

**W7.224 · ⟨SearchFilterBar.md · SFB-28⟩ — the colour-search commit exists twice** (cl.2). `:180-187` vs `:213-225`; the picker copy honours none of the guards (no `searching` check/set, no `try`). **Every prescribed C-2 cure rewrites only one copy — the cure lock is ONE commit function.** Rides W7.3's keep-and-widen lock.

**W7.225 · ⟨SearchFilterBar.md · SFB-29⟩ — menu geometry forks, mechanism source-certain** (cl.3). Radio pitch = seat-gap `calc(2.75rem − 1.125rem)` = 26 px vs tag rows `gap-0.5` = 2 px; shrink-to-fit `<label>` hover boxes vs a full-width column; the area INVERSION (Sort outweighs Find-by-Color) follows. All rendered numbers → R-5/R-7, MEASURE-AT-OPEN.

**W7.226 · ⟨SearchFilterBar.md · SFB-32⟩ — `w-60` plus a literal pile in a container-scaled system** (cl.1). `max-h-28`, `h-7 w-7`, `pr-16`, `h-6 px-2`, `gap-1.5`, `gap-0.5`, `-right-1 -top-1` against VISUAL-CONSTITUTION §3 law 7. Subject → X-W7; **law → X-W10**.

**W7.227 · ⟨SearchFilterBar.md · SFB-34⟩ — `.filter-option` forks the published `.interactive-item` lossily** (cl.2). `:active`/`[data-disabled]` legs dropped, `--radius-md` vs `--radius-lg`; the recipe is consumed 0 times and documented once in prose. **The focus-leg and its cure are DEAD (K-5) — carry the kill.** Plus the `colorToHexString` alias + 3-of-20 `color-utils` facade feeding the child's hand-rolled writer.

**W7.228 · ⟨SearchFilterBar.md · SFB-39⟩ — the naming triangle** (cl.1). The file says Search (and renders no search field — the field is BrowsePane's SearchBar); the control says Filters (`:5`); the first section is Sort (`:19-28`), which the badge deliberately excludes; the badge counts neither sort nor the text query. **The cheapest fix in the ledger and the first thing a reader trips on.** → X.W7.a with G19's copy pass.

**W7.229 · ⟨SearchFilterBar.md · SFB-40⟩ — both tag lists key `v-for` on `tag.name` while `Tag` carries `id` and `category` exists precisely because names are scoped** (cl.1). `:50`; `TagEditPopover:24`. Latent list-identity bug in surfaces already declared dead. Same law as gate **N-5** (no index-or-non-identity inside a key).

**W7.230 · ⟨SearchFilterBar.md · SFB-41⟩ — the child repeats the mixed-emit idiom charged only against the parent** (cl.1). `MiniColorPicker :2/:51 $emit` vs typed `emit` at `:70/:107`; recorded for parity, dies with the child rebuild. `[BD-B4]`.

**W7.231 · ⟨SearchFilterBar.md · SFB-42⟩ — vestigial root wrapper and two dead ceremonies** (cl.1). `:2` wraps exactly one child (`gap`/`items-center` transact nothing); `@reference` (`:236`) buys nothing (the scoped block uses only `var(--…)`); `$emit` at `:21/:33` beside the typed `emit` (`:154`). Pure subtraction.

### §R1.4 — ⟨ShadowPalette.md⟩ — 25 rows (W7.232–W7.256)

*Band context: X.W7.g's own plate. `ShadowPalette.vue`, `PaletteCardSkeleton.vue`, `EmptyState.vue` (carve)
and `o9-shadow-palette.spec.ts` (carve) are in §4; `foundation.css` is NOT (`[BD-B6]`, X-W10 owns the
survivor recipe — cite, don't fork). Every row below is `Disposition: BUILD → X-W7` at its record unless
marked NO-WAVE-OWNER.*

**W7.232 · ⟨ShadowPalette.md · SP-1⟩ — the live-k interaction destroys the plate's own choreography** (cl.1). A k rise appends `:key="i"` nodes whose animations start at **insertion time** against a mount-origin delay ladder (`:53/:56`), while the same tick rewrites `count`-dependent delays (`:63/:67/:77`) on the 2 + min(old,new) running, never-re-created animations — per CSS Animations, phase = (currentTime − delay) mod duration with startTime unchanged: an instantaneous phase teleport. Host threads k LIVE (`ExtractWorkbench.vue:159` ← `useExtractSession.ts:44/:171`). Telemetry is live-only residue. *Sharpens*: G20 — **if a living register survives the mass cut, the re-ruled o9 must assert one shared startTime + monotone phase, not declared delays (SP-7).**

**W7.233 · ⟨ShadowPalette.md · SP-2⟩ — the ladder outruns the period** (cl.1). `maxDelay(count) = 0.22·count + 0.24 s` vs a 2.000 s pulse period (`theme.css:440`): the wave folds back on itself at **k ≥ 8** (adjudicated threshold, K-4), so the "one wave, strip → meta → swatches" reading holds on 7 of the slider's 16 stops and inverts where the plate is busiest (k=12: swatch #3 at 1.98 s sits 20 ms of phase from seg #1; k=13 maxDelay 3.10 s = 1.55 periods).

**W7.234 · ⟨ShadowPalette.md · SP-3⟩ — the seat is the species the canon forbids on this route** (cl.2). VC:198 verbatim ("the undeveloped state remains contextual, **not a giant shadow placeholder**"), §3 law 2 (≤15% invitation tray), law 8, and :202's outright ban in Mix. Geometry re-derived: ~148 px @ k=5, 214 @ k=12, 276-278 @ k=13 against a 180 px stage — **and G20's own born-RED measurement (276 px of pure skeleton @ k=16) independently confirms it.** The VC:186 citation is KILLED (K-7); the "48% of the pane" ratio stays UNPROVEN. **The surviving REMOVE-vs-TIGHTEN question rides X.W7.g's execution + the o9 re-rule, ordered in the same commit.**

**W7.235 · ⟨ShadowPalette.md · SP-4⟩ — two "nothing yet" grammars in one viewport, three in one column** (cl.2). Extract's undeveloped result is an opaque cold-neutral slab with a cartoon cast — the coldest object in a warm scene — beside My Palettes' dashed translucent WatercolorDot trio over `· EMPTY PLATE ·`, with the drop zone stating "nothing yet" a third way. **CAVEAT preserved verbatim: `EmptyState.vue:31-40` is a ratified in-tree ruling deliberately splitting the registers — which register dies is the X.W7.g ruling, not a measurement.**

**W7.236 · ⟨ShadowPalette.md · SP-5⟩ — the continuity premise is void; polarity inverts at the swap, in BOTH schemes** (cl.1). Glass 7's Skeleton reads none of the house seams (`--skeleton-glass-bg`/`--skeleton-shimmer-delay`/`--skeleton-shimmer-tint` → 0/0/0 in the bundle; d.ts = `class` only), so the skeleton renders `var(--muted)` while the ghost renders `--skeleton-ink`; both readers' oklab computations agree within 0.005. The light-mode 1.000:1 "blank" headline is KILLED (K-1). **Split disposition: demo halves → X-W7; the missing producer tone/stagger/register seams are GLASS-OWNED → the standing BH relay (with SP-12).** ≡ ⟨PaletteCardSkeleton.md · PCS-2⟩ (W7.399).

**W7.237 · ⟨ShadowPalette.md · SP-6⟩ — the instrument lies about its output shape, four limbs less one** (cl.1). (1) `flex-1` equal strip vs the population-weighted developed strip, with the "never equal-width" absolutism struck (K-8); (2) ghost meta row 40 px (`py-2.5` + `h-5`) vs the real row's `text-subheading` + Badges + Button (direction certain, 56 px magnitude UNPROVEN); (3) `shadow-cartoon-sm` vs `cartoon-surface`'s `--shadow-cartoon-md` — a confirmed sm→md jump; (4) `gap-px` hairlines + missing `rounded-t-card`.

**W7.238 · ⟨ShadowPalette.md · SP-7⟩ — the sole gate is vacuous over two of three stages and locks in the design it protects** (cl.2). o9 queries `.shadow-seg` ONLY (`:83/:108/:150`); zero test references to `shadow-swatch|shadow-block` outside the SFC; the live-k leg asserts element COUNT only (5→6→5); `assertPulsesLive` reads the **declared** `animationDelay`, correct while the rendered animation is shattered — so SP-1/SP-2 are invisible by construction; and the rest-presence assertion (`:136-142`) makes a green suite evidence *for* the SP-3 violation. **Feeds G20's ordered o9 re-rule (S-20): four rows now share that single re-ruling — ES-4, ES-19, SP-34 and SP-7.**

**W7.239 · ⟨ShadowPalette.md · SP-8⟩ — NO-WAVE-OWNER limb: forced-colors dissolves the plate and the one pinned element is the least meaningful** (cl.2). `.shadow-swatch` sits in `foundation.css`'s tier-1 `forced-color-adjust:none` block (~`:690`) — whose own docblock defines tier 1 as "surfaces whose whole PURPOSE is to show a color" — and again in the print block (~`:835`), though it shows no colour and is aria-hidden; under WHCM the tier-2 plate/segs/blocks adopt system colours while the swatch row keeps a ~1.1:1 author grey over an uncalibrated Canvas. The producer primitive ships the exact designed fallback the hand-roll forfeits. L-1's BLOCKER framing killed (K-9). **NAMED GAP carried verbatim: the roster rows degrade to NO-WAVE-OWNER if W7 does not adopt the two `foundation.css` lines** `[BD-B6]`. `shots/forced-colors-desktop/` still has **no extract.png** (5 files) — MEASURE-AT-OPEN.

**W7.240 · ⟨ShadowPalette.md · SP-9⟩ — the component lives in the wrong feature, and a green gate forbids its own feature from rendering it** (cl.1). The ONLY render is `ExtractWorkbench.vue:159` importing from `../../palettes/browser/card`; inside `demo/palettes/` there are two barrel exports + prose and **zero renders**; o9's `assertNoFillers` (`:59-62`) asserts zero ghosts at every palette-browser host. → X-W7.g decides the species' fate and touches `card/index.ts`.

**W7.241 · ⟨ShadowPalette.md · SP-14⟩ — both ghosts clip at the card root, the exact mechanism the house RETIRED** (cl.2). `ShadowPalette.vue:43` and `PaletteCardSkeleton.vue:34` carry root `overflow-hidden`; `PaletteCard.vue:15-19` records the ratified opposite verbatim (S.W5-10 / S-15-A) and implements it. **CLIP-IS-LOAD-BEARING (K-3): the cure gives the ghost strip its own radius — never a bare deletion.** ≡ W7.29 (PCS-10's clip lock), one law, two plates.

**W7.242 · ⟨ShadowPalette.md · SP-15⟩ — the border jumps 1 px → 2 px at the swap, on top of the shadow-rung jump** (cl.1). Ghost = Tailwind `border` + `shadow-cartoon-sm`; the developed card takes `border-width: 2px` + `--shadow-cartoon-md` from `@utility cartoon-surface`. A true layout jump inside the seat `ExtractWorkbench.vue:94-95` calls "a material change, not a layout jump". ≡ W7.184 (PC-15's one-shell law).

**W7.243 · ⟨ShadowPalette.md · SP-16⟩ — NO-WAVE-OWNER (named candidates): the Extract seat never announces completion** (cl.1). Zero `aria-live`/`role="status"`/`sr-only`/`visually-hidden` in `demo/workbenches/extract/`; the chain is each-part-correct, whole-part-broken — idle ghost aria-hidden (correct), `PaletteCardSkeleton role="status"` (correct) but UNMOUNTED at completion by `<Transition mode="out-in">`, then `PaletteCard role="article"`. No surviving region carries "5 colors extracted". The k slider has `aria-label` with no `aria-valuetext` (`ExtractControls.vue:26-31`). **Candidates: X-W7 carves `ExtractWorkbench.vue`; X-W4 owns the semantic-controls axis; `ExtractControls.vue` is in no X file list** `[BD-B1]`.

**W7.244 · ⟨ShadowPalette.md · SP-18⟩ — the derived rungs were never certified; the swatch rung is near-invisible** (cl.1). Independent oklab tables agree within 0.005: ~1.10:1 at rest, ~1.05:1 at the pulse trough, against an E1-R2 certification that covers the base ink alone. The contradiction limb is killed (K-5); the plate is aria-hidden so WCAG 1.4.11 is not binding — **the breach is of the file's own "reads as BLOCKS" contract.** **E1-R2 may not be cited for this component until re-measured** (the named edict the check found absent from the whole fold layer — carried here verbatim in force).

**W7.245 · ⟨ShadowPalette.md · SP-19⟩ — perfect circles where the instrument's real output is a seeded irregular WatercolorDot** (cl.2). `rounded-badge` → `--radius-pill` = 9999px; the disagreement is sighted in the desktop screenshot. The axis re-label to MAJOR-structure is rejected and **L-4's cure as written is KILLED (K-11); only the repaired cure travels.** ≡ ⟨PaletteCardSkeleton.md · PCS-8⟩ (W7.405).

**W7.246 · ⟨ShadowPalette.md · SP-20⟩ — one wave, two implementations** (cl.1). All four stagger expressions are byte-duplicated between `ShadowPalette.vue:56/:63/:67/:77` and `PaletteCardSkeleton.vue:50/:60/:66/:77`; the sibling already speaks custom properties; `utils.css:42` records the house performing this exact lift for the INK and not the wave. **G20's own two-component clause is this row.**

**W7.247 · ⟨ShadowPalette.md · SP-21⟩ — three strip geometries in one morph seat** (cl.1). Ghost `gap-px`+`flex-1` · skeleton no-gap `100/count%` · developed no-gap population-weighted — all three inside one `<Transition name="vj-morph" mode="out-in">` (`ExtractWorkbench.vue:102-168`). ≡ ⟨PaletteColorStrip.md · PCS-14⟩ (W7.265).

**W7.248 · ⟨ShadowPalette.md · SP-22⟩ — untokenized motion, magic constants, inline style churn** (cl.2). Neither 2 s nor the curve is a house token; 0.12/0.1/0.34/0.22 live in per-render inline `:style` objects (2·count+2 = 34 @ k=16); the tokenized PRM-gated `.stagger-children` idiom (`animations.css:34-54`) sits unused. Fourth-name limb killed (K-2), no-lever limb killed (K-6). **→ X-W7 under X-W10 law: no fourth transition family; house tokens for any surviving motion.**

**W7.249 · ⟨ShadowPalette.md · SP-23⟩ — under PRM the claimed at-rest k readout rests on a 1 px ~1.4:1 hairline** (cl.1). The global guard (`animations.css:184-193`) sets duration/iteration only, no fill-mode, and Tailwind pulse has no fill-mode — so the plate settles at base opacity and **1.402/1.435:1 IS the resting number, best case**, carrying the file's own `:47-50` charter. The honest readout is the numeric k label one element up.

**W7.250 · ⟨ShadowPalette.md · SP-25⟩ — the oracle reaches past the published contract into scoped CSS** (cl.2). o9 finds the ghost by `data-slot` (`:55`) then asserts on `.shadow-seg` in all three legs — pinning the exact class SP-35 renames and SP-12's cure deletes. **≡ W7.111 (ES-19): the re-ruled o9 asserts published data-slots. One re-ruling, now four rows.**

**W7.251 · ⟨ShadowPalette.md · SP-26⟩ — the ghost omits the developed card's swatch-region separator and top pad** (cl.1). `PaletteCardSwatches.vue:22-24` = `pt-3` + conditional `border-t border-border/15`; the ghost carries `px-3 pb-3` only (`:71`). A third un-named limb of SP-6's shape lie.

**W7.252 · ⟨ShadowPalette.md · SP-28⟩ — the morph-identity swatch scale is a hand-copied literal in three files** (cl.1). `w-12 h-12 sm:w-14 sm:h-14` verbatim at `ShadowPalette.vue:75`, `PaletteCardSkeleton.vue:76`, `ExtractWorkbench.vue:150` — the host's prop copy makes it three-way drift, not C-7's two-way.

**W7.253 · ⟨ShadowPalette.md · SP-29⟩ — the k domain has no home; `count` is unvalidated on a public export** (cl.1). Range declared only on the slider; four independent `5` defaults across four files; `count?: number` admits values no producer emits, and Vue's guard warn-and-empties non-integers/negatives. ≡ ⟨PaletteCardSkeleton.md · PCS-14⟩ (W7.407) — one unvalidated `count`, two plates. *Sharpens*: G10's fixture set is a cardinality contract, not only a render check.

**W7.254 · ⟨ShadowPalette.md · SP-30⟩ — the caption the aria-hidden plate delegates all meaning to breaks its own typographic unit on mobile** (cl.1). CONFIRMED BY THE SEAT'S OWN EYES (`safari-mobile-light/extract.png`): `· UNDEVELOPED PLATE — FEED IT AN` / `IMAGE ·`, the closing dot orphaned. Reader-disputed; the screenshot read settles it. **Discharge by ordered deletion in X.W7.g** — the same caption G20 deletes at `ExtractWorkbench.vue:163-166` (W7.120).

**W7.255 · ⟨ShadowPalette.md · SP-32⟩ — NO-WAVE-OWNER: `tsconfig.demo.json` types a different published surface than `package.json#exports` ships** (cl.4). 7 exports keys, no `.` root; three phantom typed paths (root, `/parsing`, `/units`) pointing at files that do not exist; two shipped subpaths untyped; the block's "CLOSED 8-key set" comment false by one. **Reader-2's kill of the "typechecks green, crashes at runtime" mechanism is adopted (K-12) — phantom paths are dead, not dangerous.** No X-W7 surface; routed with the config packet at the formation boundary.

**W7.256 · ⟨ShadowPalette.md · SP-35⟩ — author classes squat the producer's generated `shadow-*` utility namespace, on the same line that consumes it** (cl.2). Present facts confirmed; the collision is a self-labelled hypothesis about a future token (INFO per reader-2). **Any rename executes WITH SP-17's roster rider (W7.118) — the two `foundation.css` lines travel in the same commit or they are orphaned with zero compiler/linter/test signal.**

### §R1.5 — ⟨PaletteColorStrip.md⟩ — 24 rows (W7.257–W7.280)

*Band context: the canonical strip — X.W7.c's consolidation target (W7.57). `PaletteColorStrip.vue` is in
§4. §1a C-2 already corrects this record's PCS-19/§COORDINATION 3(ii); nothing below re-opens it.*

**W7.257 · ⟨PaletteColorStrip.md · PCS-3⟩ — NO-WAVE-OWNER limb: the wire schema silently discards `weight`** (cl.2). `api/src/modules/palette/schema.ts:27-31` = `{css, name?, position}` — zod strips unknown keys, no 400, no log — so a saved extracted palette loses the population story the component exists to draw the moment the user presses Save, falsifying `types.ts:5-11` and the strip's own `:40-42` prose. Sole producer `useExtractSession.ts:88`. **The api surface is in NO X-W7 bounds; witness for new gate N-14 (wire/DTO fidelity for `weight`), sibling of N-8.**

**W7.258 · ⟨PaletteColorStrip.md · PCS-4⟩ — vacuous gate: zero tests anywhere reference the component** (cl.1). Replacing `:50-71` with `colors.map(() => 100/n)` deletes WEIGHT_FLOOR, the weighted path and the whole S.W5-6/F7/T19 deliverable while vitest, playwright, `vue-tsc` and eslint stay green. **The arithmetic is a pure function trapped in an SFC computed — which is exactly why PCS-1 shipped.** Same identity as W7.172 (PS-40) and CE-7's vacuous-gate family; *sharpens* G10 (the fixtures must assert the arithmetic, not the render).

**W7.259 · ⟨PaletteColorStrip.md · PCS-5⟩ — no boundary of any kind** (cl.1). (i) n colours render as fewer than n bands beside a badge asserting n (5→2 in the axis's own probe, re-seen by the seat); (ii) the strip collapses into the card ground for dark-dominant palettes — the `N/audit/lanes/C5.md:123-131` [P1] filing ("a single near-black bar … indistinguishable from the card chrome"), unfiled in the N tranche and adopted here. *Sharpens*: G10's colour fixtures need a dark-dominant case.

**W7.260 · ⟨PaletteColorStrip.md · PCS-6⟩ — the corner law is authored at three call sites by three mechanisms, one of which re-introduces the banned ancestor clip** (cl.2). `MixSourceSelector.vue:199-203`'s `rounded-card overflow-hidden` wrapper re-mints the exact S.W5-10/S-15-A pattern, because the law survives only as prose in a sibling consumer (`PaletteCard.vue:16-18`). **The comment itself is ACCURATE — L-7 limb 2 is KILLED (W7.280): calling it false invites deleting a correct statement.** `MixSourceSelector.vue` is shared with X-W6 (CE-1: W6 writes first).

**W7.261 · ⟨PaletteColorStrip.md · PCS-7⟩ — the prop type is the palette DOMAIN type, and the fabrication is type-MANDATED** (cl.2). The strip reads exactly `css` and `weight`, yet `position` is REQUIRED, so `GenerateControls.vue:55-56` mints fabricated positions and imports `palettes/types` across an area boundary to paint a coloured bar. **⟨GenerateControls.md · R-G⟩'s sharpening adopted verbatim: the fabrication is type-mandated — "retype on the move" is the cure, not a caller fix.** ≡ W7.58 (GEN-26's cross-area import).

**W7.262 · ⟨PaletteColorStrip.md · PCS-8⟩ — `export.ts` (live, 132 L) vs `export/` (ratified byte-exact, 12 modules)** (cl.1). The contract half is reachable only from `demo/test/export/byte-exact.test.ts`; both host panes download through the legacy module — **CI proves a module users never run.** **≡ W7.13 EXPORT-DUAL-PATH, seventh witness; `≡`-pointer only.** Booked at area scope per the L-9.1 scope law.

**W7.263 · ⟨PaletteColorStrip.md · PCS-10⟩ — NO-WAVE-OWNER limb: five parallel implementations of "render a palette compactly" with incompatible truncation policies** (cl.2). Two are imported into ONE file and rendered on one screen; `.preview-chip` is defined twice, divergently, under a directory whose index claims uniqueness. Grade ruled MAJOR. **≡ W7.57 (VHD-21/AF-41/PS-12) — the consolidation identity; X.W7.c owns the strip's own half, the `PreviewStrip`/`GenerateControls` half is `[BD-B6]`.**

**W7.264 · ⟨PaletteColorStrip.md · PCS-12⟩ — the `weights` prop is dead public surface** (cl.1). Zero consumers, a six-line doc, a per-recompute branch, and a permanently unreachable tier-1 of the documented precedence. → X-W7.c (dies in the specimen rebuild). Carries W7.275 (PCS-26) and W7.277 (PCS-28) with it.

**W7.265 · ⟨PaletteColorStrip.md · PCS-14⟩ — the 40 px strip geometry has four literal homes and the ghost's segment mechanics genuinely diverge** (cl.1). `h-10` ×3 + `w-10`; ShadowPalette `gap-px` + `flex-1` vs seamless percentage widths ⇒ segments shift at the loaded handoff; no token binds them, no test asserts agreement. The a11y sub-limb is killed (K-9). ≡ W7.247 (SP-21).

**W7.266 · ⟨PaletteColorStrip.md · PCS-15⟩ — the guard-then-swallow ladder, reachable from tampered localStorage** (cl.1). Wrong-length `weights` silently ignored; one NaN silently reverts to equal (the population story vanishes without signal); one Infinity blanks the ENTIRE strip. `JSON.parse("1e999")` → Infinity, and the store serializer validates only `version` (`usePaletteStore.ts:19-26`). Adversarial-only → MINOR stands. **≡ W7.279 (C-3's reachability ruling — B's strengthening ADOPTED).**

**W7.267 · ⟨PaletteColorStrip.md · PCS-16⟩ — the entire `orientation="vertical"` branch has never executed** (cl.1). The sole `:layout` ternary requires `layout === 'split'`, which no shipped mount produces (`layout="split"` grep → 0; `ExtractPane.vue:13` hard-codes `column`). **Roughly half the rendering surface ships, typechecks, and has never painted.** ≡ W7.183 (PC-14) ≡ ⟨wb-extract-pane.md · XP-20⟩ (W7.523). X-W8's dead-surface gate is the backstop.

**W7.268 · ⟨PaletteColorStrip.md · PCS-17⟩ — the zero-colour palette renders a 40 px transparent void** (cl.1). The host mints `EMPTY_PALETTE_SWATCH` (`PaletteCard.vue:220-223`) and routes it away from the one surface that shows swatches. Reachability is bounded (API `.min(1)`; the local save is double-guarded; no card-level colour delete exists) — but ⟨CurrentPaletteEditor.md · A-2⟩ arm (ii) writes `colors: []` through ordinary controls (W7.128), so the bound is not a proof of unreachability.

**W7.269 · ⟨PaletteColorStrip.md · PCS-18⟩ — one raw isotropic 40 px literal serves as both band thickness and rail width, bound to no token and no ratio** (cl.1), while the far smaller sibling carries `2.618rem /* φ² × 1em (F7) */` with provenance. **Both quantitative support limbs are KILLED (K-6): `--ratio-phi` does not exist anywhere, and the `C = 16px` anchor is the constitution's forward spec, not the live card's measure.** Carry the kills — a cure citing either is citing nothing.

**W7.270 · ⟨PaletteColorStrip.md · PCS-20⟩ — the population story has no non-visual equivalent anywhere** (cl.1). The strip is the app's sole rendering of `weight` and it is aria-hidden; the card's accessible name is name + bare count. Hiding a decorative rail is right; **hiding the sole rendering of a data dimension was never stated as a decision.** Adjacent to (not identical with) W7.197 (PC-32). → X-W7.c + the X-W7.f count-formatting seat.

**W7.271 · ⟨PaletteColorStrip.md · PCS-21⟩ — the gate is `some`, the coercion is `?? 0`** (cl.1). One weighted entry switches the whole strip into the weighted branch, where every weight-LESS colour is floored to WEIGHT_FLOOR and reads as "small but measured" rather than "unknown": `[0.3, 0×4]` → 75.76/6.06×4, a fabricated population relation. Unreachable today (the sole producer writes all-or-none) — **latent by producer discipline, not by construction.**

**W7.272 · ⟨PaletteColorStrip.md · PCS-23⟩ — `Math.max(100/n, 0.5)` is dead for every reachable n and incorrect where it would fire** (cl.1). API max 50, extract 16, generate 12; past n=200 the un-renormalised sum exceeds 100% and `shrink-0` + `overflow-hidden` silently clip trailing colours. **The one row an X mechanism already names verbatim (`W7.md:210`, "delete the `Math.max(…, 0.5)` clip-inducing floor").** *Sharpens*: G10 — the `N = 200/201` fixtures are this row's falsifier. ≡ W7.27 (PCS-1).

**W7.273 · ⟨PaletteColorStrip.md · PCS-24⟩ — `role="presentation"` beside `aria-hidden="true"` is inert** (cl.1). ARIA mandates the role be IGNORED on an element carrying a global `aria-*` attribute — spec-mandated noise, not mere redundancy. Keep `aria-hidden`, drop the role, **after PCS-22's hook lands** (sequencing carried).

**W7.274 · ⟨PaletteColorStrip.md · PCS-25⟩ — `:key="i"` index keys on a list the product intends to reorder/animate** (cl.1). Benign today; forecloses TransitionGroup and mis-animates the moment a colour transition lands. **Third site of gate N-5's law** (with `useSwatchActions.ts:45-53` and `MixSourceSelector.vue:79-98`) — the gate's grep must reach `:key="i"`, not only `::${i}`.

**W7.275 · ⟨PaletteColorStrip.md · PCS-26⟩ — `weights = undefined` destructure default is a no-op** (cl.1). Dies with PCS-12 (W7.264). → X-W7.c.

**W7.276 · ⟨PaletteColorStrip.md · PCS-27⟩ — zero motion: no style block, no transition class** (cl.1). The strip hard-cuts on every Regenerate while its plate-mate rides the register. **A recorded ABSENCE, not an adjudicated violation; no M-xx quarantine row applies.** → X-W7.c under X-W10 law.

**W7.277 · ⟨PaletteColorStrip.md · PCS-28⟩ — six lines of tranche provenance in a prop doc for a facility with no caller** (cl.1). Dies with PCS-12. → X-W7.c.

**W7.278 · ⟨PaletteColorStrip.md · PCS-29⟩ — the third dead guard between the two the axes catalogued** (cl.1). `segmentPcts[i] ?? 0` (`:20-21`) can never be nullish — `segmentPcts` maps `colors` itself, so inside `v-for="(color, i) in colors"` the index always exists. → X-W7.c.

**W7.279 · ⟨PaletteColorStrip.md · C-3⟩ — NO-WAVE-OWNER ruling row: the Infinity vector is reachable from tampered client storage, not only from the caller-less prop** (cl.1). `JSON.parse('{"weight":1e999}')` → Infinity; `usePaletteStore.ts:19-26` rehydrates through a serializer that validates `version` and nothing else; the strip's `own` channel (`:53`) reads `c.weight` straight off store palettes. **B's strengthening ADOPTED.** Adversarial-only → MINOR stands at PCS-15. *(Namespace note: `C-3` here is PaletteColorStrip's, not `⟨AdminPane.md · C-3⟩` — §1a C-1 in force.)*

**W7.280 · ⟨PaletteColorStrip.md · L-7⟩ — NO-WAVE-OWNER ruling row: the "the comment is false" limb is KILLED — B wins** (cl.2). `PaletteCard.vue:16-18` describes the clip's LOCATION (the S-15-A AA rationale) and is accurate as written; the strip's own root (`PaletteColorStrip.vue:7`) does carry `overflow-hidden`. **The true defect is unowned SHAPE (limb 1 = PCS-6). Carried so no successor "fixes" a correct comment.**

### §R1.6 — ⟨TagEditPopover.md⟩ — 23 rows (W7.281–W7.303)

*Band context: X.W7.a's own control (`TagEditPopover.vue` in §4). W7.1/W7.2 carry TEP-1/2/3/13; these are
the 23 that ride them. `useTagEdit.ts` is in bounds; `client.ts` and the api barrel are not.*

**W7.281 · ⟨TagEditPopover.md · TEP-4⟩ — MAJOR: vacuous gate on three instruments at once** (cl.1). Zero tests/e2e touch the component, the composable or the `editTags` path (grep exit 1, re-run); the HARD `vue-tsc` gate is structurally blind to the C-1 class (fallthrough attrs, exit 0 on two independent runs); zero visual coverage (never mounted in 60 captures). Flourish killed at K-6. **This is why TEP-1/2/3 shipped; it is the same identity as W7.172/W7.258 and CE-7.**

**W7.282 · ⟨TagEditPopover.md · TEP-5⟩ — MAJOR: optimistic `emit` before the await, return value discarded, every failure swallowed** (cl.1). `:76-77`; `useTagEdit.ts:63-66` catch→warn→undefined; no rollback, no surface. *Sharpens*: G7's failure table (this is one of the ~38 paths) and G10 (`N_tags = 11` → 400 with no visible failure path, which `W7.md` already cites at `TagEditPopover.vue:64-66,77`).

**W7.283 · ⟨TagEditPopover.md · TEP-6⟩ — MAJOR: a leaf owns If-Match policy, and the end-to-end result is a lost update** (cl.2). Derives the validator (`:73-74`), silently downgrades `undefined→"*"` (`useTagEdit.ts:54` → `etag.ts:44` skips the check), discards the PATCH response, and `BrowsePane.vue:312-319` re-caches the stale `updatedAt`; the server twin bumps `updatedAt` always and `currentHash` only on content change. All four legs source-verified. **`BrowsePane.vue` and `useTagEdit.ts` are in bounds — the whole loop is curable in-wave.**

**W7.284 · ⟨TagEditPopover.md · TEP-7⟩ — MAJOR: `browsePort` publishes `remotePalettes` as a raw writable `Ref` and the pane writes into it from outside the owning composable** (cl.1). `BrowsePane.vue:317`, while `useBrowsePalettes.ts:165-171` already owns the row-replacement idiom. **The unencapsulated port is what makes TEP-6's stale re-cache possible — and the corpus's "fold the response back" cure writes through the same open door.** ≡ W7.67's `remotePalettes` divergence arm.

**W7.285 · ⟨TagEditPopover.md · TEP-8⟩ — MAJOR: a 32-member port injected for 2 members, one of which re-finds an object the parent already holds** (cl.1). `usePalettePorts.ts:157-192`; `tagEditPalette` at `BrowsePane.vue:305`. **Reader-1's perf-framing correction adopted: a ≤50-row `find` is irrelevant — ownership duplication is the defect.** ≡ W7.68 (L-2/L-6, the 34-member adminPort) — one law, two ports. → X.W7.d.

**W7.286 · ⟨TagEditPopover.md · TEP-11⟩ — MAJOR: the async catalog swap is unannounced** (cl.1). Zero live regions, no `aria-busy`, no `role="status"` in the 87-line file; the sibling `AdminListSkeleton` already carries `role="status" aria-label="Loading"` (`:10-11`). Motion itself is governed — **no FALSE motion-quarantine row is carried (M-20 TRUE only)**, per §EXCLUDED.

**W7.287 · ⟨TagEditPopover.md · TEP-12⟩ — MAJOR: `p-0` silently loses to glass-ui's overlay-pad recipe by source order** (cl.1). Byte offsets exact: `.p-0`@11161 < `px-(--overlay-pad-inline)`@11323 / `py-…`@11679 ⇒ both win; the panel measures `padding 20.35px 16px` → 28 px/side, a 150 px content column in a 208 px surface — **the mechanical cause of TEP-3.** Three-site family with `SearchFilterBar`'s `p-0` (W7.209). *Sharpens*: G3 — dead per-instance overrides are the same class as inert props.

**W7.288 · ⟨TagEditPopover.md · TEP-14⟩ — MAJOR: the only heading renders in the identical register as ten repetitions of row metadata** (cl.1). Heading and category both Fira Code 14.384 px uppercase, 1.4384 px tracking (`headingEqualsCategoryRegister: true`), and 2 px smaller than the body it governs; `:33` open-codes the `.section-label` recipe longhand. **Corrects K-1's direction — carry the correction.** Same facility as W7.102 (AAP-15/ATP-7).

**W7.289 · ⟨TagEditPopover.md · TEP-15⟩ — MAJOR: loading→ready jumps the anchored panel ~114 px (134.3 → 248.3) with nothing reserving space and nothing announcing** (cl.2). **The house already solved both in one component (`AdminListSkeleton`: shaped to the row grammar AND `role="status"`) — the cure is skeleton recomposition on the ATP-16 precedent, and it deletes the `@lucide/vue` import with it (TEP-24).** [BD-B2 for `AdminListSkeleton.vue`]

**W7.290 · ⟨TagEditPopover.md · TEP-16⟩ — MAJOR: no busy, no disabled, no error surface, no close affordance — and the payload loses a tag** (cl.1). `:64-78` + template `:1-39`; M-6 sharpens the race: `updated` derives from the `currentTags` **prop**, which cannot have re-propagated within one tick, so **two same-tick toggles construct the second PATCH body WITHOUT the first tag** — a payload-construction loss upstream of any ordering fix. Feeds gate N-6's family (exactly-one/ordered writes).

**W7.291 · ⟨TagEditPopover.md · TEP-17⟩ — MAJOR (RAISED): the identical dead binding at `SearchFilterBar.vue:51-55`** (cl.2). 2 of 2 `<Checkbox>` sites in the demo; publicly reachable without auth. **Two cures, not one rename (M-5) — already encoded at `W7.md:180-182`.** ≡ W7.204 (SFB-1) ≡ W7.1. → X.W7.a, same stroke.

**W7.292 · ⟨TagEditPopover.md · TEP-18⟩ — MINOR: three load paths for one permanently-frozen catalog** (cl.1). `loaded` is exported dead surface (zero `.loaded` readers) and `force` has zero callers, so the one invalidation seam has never been invoked. **IDENTITY = ⟨AdminTagsPanel.md · ATP-19⟩ (W7.79) — already booked; `≡`-pointer only. Both ends are in X-W7's bounds and must be cured in one edit.**

**W7.293 · ⟨TagEditPopover.md · TEP-19⟩ — MINOR + a NO-WAVE-OWNER arm** (cl.2). Consumer asymmetry (BrowsePane coerces via the X9 fossil, this file does not) + a dead empty-state branch under any non-array. **Cure INVERTED per M-4: delete the X9 computed and validate once at `getTags()`.** The unbounded arm — `client.ts:127`'s unchecked `res.json()` cast for **every** endpoint — is **NO-WAVE-OWNER** `[BD-B2]`.

**W7.294 · ⟨TagEditPopover.md · TEP-20⟩ — MINOR: the `<label>` wraps the `role="checkbox"` button plus the category, so every accessible name is `"warm temperature"`-shaped** (cl.1). Names remain unique and resolvable, so MINOR is right. → `W7.md:269`'s uncoupled-labels mechanism is the exact cure home; *sharpens*: G19(c).

**W7.295 · ⟨TagEditPopover.md · TEP-21⟩ — MINOR: pointer rows get `hover:bg-accent/50`; keyboard gets no `focus-within:` counterpart** (cl.1). The row paints nothing while its checkbox holds focus. **Correction carried: probe-7's `rowHasFocusStyle:true` field is an artifact.** Same species as ⟨AdminAuditPanel.md · AAP-24⟩ (W7.431).

**W7.296 · ⟨TagEditPopover.md · TEP-22⟩ — MINOR: `ml-auto` is physical and mis-resolves under `dir=rtl`** (cl.1). The auto margin absorbed 14.875 px on the wrong side; honest scope stands — no RTL commitment repo-wide, 8 physical-margin sites. Subject → X-W7 (`ms-auto`); **census → X-W10 canon (W7.104).**

**W7.297 · ⟨TagEditPopover.md · TEP-23⟩ — MINOR: clipped names have no recovery, producing the inversion where AT reads what sighted users cannot** (cl.1). No `title`/tooltip. Dies with TEP-3's width cure. ≡ W7.56 / W7.167 — one truncation-recovery law, four surfaces.

**W7.298 · ⟨TagEditPopover.md · TEP-24⟩ — MINOR: direct `@lucide/vue` import for a loading affordance the DS pattern owns** (cl.1). `:45`; the centred panel-fill census is exactly 2 sites (this file `:12`, `VersionHistoryDrawer.vue:18`) — **the other seven `Loader2` sites are legitimate inline button-state spinners** (carry the scope, it is the difference between a cure and a purge). Deleted by TEP-15's cure.

**W7.299 · ⟨TagEditPopover.md · TEP-26⟩ — NO-WAVE-OWNER: one 2-line pure function reached through a 7-module barrel** (cl.4). The barrel drags `deleteUser`/`impersonateUser`/`pruneEmptyUsers` + the side-effecting transport into a leaf's graph. **Rides TEP-10's ownerless-contract-home dissent, which stays recorded at X-W3's declinations (W7.63's note).** `[BD-B2]`.

**W7.300 · ⟨TagEditPopover.md · TEP-27⟩ — INFO: `italic` restates `text-caption`'s own `font-style: italic`** (cl.1). Rides any file touch.

**W7.301 · ⟨TagEditPopover.md · TEP-28⟩ — INFO: the decorative spinner is not `aria-hidden`** (cl.1). Additive to TEP-11, distinct from it; dies with TEP-15's cure. Same convention breach as ⟨ActionFeedback.md · AF-17⟩ (W7.367).

**W7.302 · ⟨TagEditPopover.md · TEP-29⟩ — MINOR: `useTagEdit.ts`'s docstring is stale three ways** (cl.1). `palette-browser/` migration paths do not exist; the "PaletteDialog shell" consumer claim has no reader (two `pm.tagEdit` readers only). **Same drift class the corpus caught once (L-5) and missed here** — and the same phantom file as W7.203 (PC-39). `useTagEdit.ts` is in bounds.

**W7.303 · ⟨TagEditPopover.md · TEP-30⟩ — NO-WAVE-OWNER, ANTI-FIX RECORD** (cl.4). `browser/index.ts:35` re-exports `TagEditPopover` through the PI-6 seam while the sole consumer correctly reaches the sub-barrel (`BrowsePane.vue:190`) per the seam's own tree-shake rationale. **Recorded verbatim so no later seat "fixes" the import or deletes the seam export.** Epistemic record; nothing to execute.

### §R1.7 — ⟨AdminNamesPanel.md⟩ — 20 rows (W7.304–W7.323)

*Band context: X.W7.d's colour-name queue. `AdminNamesPanel.vue` is in §4; `useColorNameQueue.ts`,
`AdminListItem.vue`, `types.ts` and the transport are `[BD-B2]` (MT-AU1, §1a C-8). W7.19/W7.56/W7.66/W7.93
already carry D-1/C-4, M-LC2, ADJ-1 and D-2 — these 20 ride them.*

**W7.304 · ⟨AdminNamesPanel.md · C-6 / L-9⟩ — raw transport `e.message` forwarded verbatim to user copy** (cl.2). The 484-char dev runbook fills the card; `string | null` cannot express audience/category/retryability; and the type-level root is five `catch (e: any)` discarding the discriminated hierarchy (`DevMisconfigError`/`ApiUnavailableError`/`ApiProblem`) the transport ALREADY ships. **Cure shape carried: `catch (e: unknown)` + `instanceof` dispatch — NOT a new union.** ≡ W7.322 (M-LC4). `[BD-B2]`

**W7.305 · ⟨AdminNamesPanel.md · C-7⟩ — Retry issues zero requests under the latch and re-renders byte-identical text into an already-present alert** (cl.1). No announcement, no observable transition. **Cure: latch-honest retry — read `apiAvailability`, then either a cooldown label or a guaranteed observable transition.** Same species as W7.106 (ES-2's Retry) and W7.108 (ES-16).

**W7.306 · ⟨AdminNamesPanel.md · C-15 / L-14 / D-swatch⟩ — an unparseable literal paints nothing yet stays approvable** (cl.2). Indistinguishable from transparent; zero value.js imports in the file. **Split disposition carried verbatim: the FACE → X-W7; VALIDATION → X-W9, BLOCKED on the V·π / R1 parser gate (project memory: live `parseCssColor("oklch()")` crash). `CSS.supports` is the interim.** X-W7 must not author a validator (§EXCLUDED, CE-8).

**W7.307 · ⟨AdminNamesPanel.md · D-6 / C-3 / L-11⟩ — tab labels count with no load/error guard, and the counted lists are the FILTERED page** (cl.1). "Pending · 0" over skeletons; retained-length over an error plate; "matches in the loaded page" presented as queue depth — **violating the A-3 law the same route's parent codifies in a comment 90 lines away (`AdminPane.vue:118-128`).** ≡ W7.61 (auth≠empty) + W7.83 (filtered-zero) — this row is where the two families meet on one label.

**W7.308 · ⟨AdminNamesPanel.md · D-9⟩ — four-sided box per row + swatch ring where the binding inventory grants one adjacent separator, none terminal** (cl.1). `AdminListItem.vue:11`; panel `:43/:46/:93/:96`; OPTICAL-BENCH `:83` verbatim. Dies in the row-anatomy rebuild; **canon authority X-W10.** ≡ ⟨AdminAuditPanel.md · AAP-14⟩ (W7.429) — one boundary budget, two panels.

**W7.309 · ⟨AdminNamesPanel.md · L-3b⟩ — `ProposedColorName` homed at its minority consumer (16/24 refs in `palettes/`), imported back up-and-across** (cl.1). **Same edit as ADJ-1 (W7.66) — and therefore behind the same BLOCKING precondition: the DTO is re-derived against the wire first.** `[BD-B2]`

**W7.310 · ⟨AdminNamesPanel.md · L-6⟩ — the async quad-state ladder is transcribed twice in this file (32/44 lines identical) and six times across the cluster** (cl.2). **The missing atom is the LADDER, not the row. SEQUENCED AFTER M-LC1 (W7.321), verbatim in force: grafting an `AsyncList` onto a cluster with three load-ownership conventions is the contrivance the KISS edict bans.** ≡ W7.74 (AF-39, sequenced after the M-L extraction) — same law, same order.

**W7.311 · ⟨AdminNamesPanel.md · L-15 / D-17 / C-13⟩ — `ref<string>` over a closed two-member union + catch-all `v-else` renders Approved for any invalid value, on a moderation surface** (cl.1). Free cure (a typed union). *Sharpens*: G3 — the class `strictTemplates` cannot see, because the widening is in script.

**W7.312 · ⟨AdminNamesPanel.md · L-16 / C-12⟩ — the `:options` literal re-allocates per render, the only such site** (cl.1). **Comparison limb corrected at the record: one sibling uses `computed`, the other a plain array — reference stability, not `computed`, is the invariant.** Carry the correction so the cure is not mis-specified.

**W7.313 · ⟨AdminNamesPanel.md · M-DU1⟩ — the judged NAME is typeset in the control/label register while the sibling panel received the exact population-sweep cure** (cl.1). `text-small` sans here vs `AdminFlaggedPanel.vue:62-67`'s display voice `text-subheading`, **under a named wave that skipped this file**; VC:72 vs :75. One class swap in the rebuild; canon X-W10.

**W7.314 · ⟨AdminNamesPanel.md · M-DU2⟩ — the canon's "one review-row anatomy" exists as a component with exactly ONE consumer while its loading shadow is shared by four panels** (cl.1). `AdminListItem` consumers = AdminNamesPanel only (+ a comment); AdminFlaggedPanel hand-transcribes the identical anatomy. **≡ W7.55 (AL-M6) and W7.59 (AAP-1) — the unification has call-site homes and no anatomy home** `[BD-B2]`.

**W7.315 · ⟨AdminNamesPanel.md · M-DU4⟩ — the colour specimen is hand-rolled on the one surface whose job is judging colour** (cl.2). `:style` backgroundColor on a bordered div (`:46/:96`) while `WatercolorDot` is the repo's specimen face in 14 files — **including the EmptyState this very panel renders (`EmptyState.vue:45-47`).** Split: FACE → X-W7; **validity flag → X-W9 (with C-15).**

**W7.316 · ⟨AdminNamesPanel.md · M-DU6⟩ — the hard-coded headlines assert a network category the panel cannot know** (cl.1). A 401, a 500 and a CORS misconfig all render "unreachable". **Cures with C-6's typed dispatch (W7.304); ≡ W7.24 (AF-51) — an expired token rendering as a backend outage, second panel.**

**W7.317 · ⟨AdminNamesPanel.md · M-DU7⟩ — Approve is a one-way door** (cl.1). The Approved tab's only action is destructive Delete (filtering BOTH arrays); the demote path exists in the API and is unwired. **Folded into D-2's confirmation/undo design (W7.93).**

**W7.318 · ⟨AdminNamesPanel.md · M-DU8⟩ — the skeleton promises a 56 px action cluster; Pending delivers 66 px, Approved 30 px** (cl.1). `AdminListSkeleton.vue:18` `h-7 w-14`. Every load ends in a lateral jump with no transition to absorb it. ≡ W7.289 (TEP-15's 114 px jump) and ⟨AdminTagsPanel.md · ATP-16⟩ (W7.477) — one skeleton-fidelity law, three panels.

**W7.319 · ⟨AdminNamesPanel.md · M-DU9⟩ — the tree's only `w-full`-stretched SegmentedTabs: ~228 px per tab for ~110 px of ink** (cl.1). What makes the producer defect maximally visible, and the sharpest surviving D-3 suspect. Composition → X-W7; **evidence rider on the D-3 relay (CE-9, informational).**

**W7.320 · ⟨AdminNamesPanel.md · M-DU12⟩ — `AdminListItem`'s doc comment instructs the next author to commit a type-matrix violation** (cl.1). It prescribes `text-caption` secondary while its only consumer correctly uses `text-mono-small` per F-9; the comment predates the correction. Comment corrected in the rebuild. *(The record's adjacent `D-misc-mobile-order` cell routes to X-W5 — recorded, not folded here.)*

**W7.321 · ⟨AdminNamesPanel.md · M-LC1⟩ — three contradictory data-ownership conventions coexist in one nine-file directory** (cl.2). Three self-loading container panels (inject + `onMounted`, all paginated), one pure props/emits panel (this one, boot-loaded, unpaginated), one hybrid. **The SPLIT, not a missing atom, is the mechanism behind L-6 and L-7 — and L-6/AF-39 are both sequenced after this extraction.** The panels are in bounds; the composables are `[BD-B2]`.

**W7.322 · ⟨AdminNamesPanel.md · M-LC4⟩ — five `catch (e: any)`: a deliberate strict-mode opt-out erasing the transport's typed hierarchy at the first touch** (cl.1). The type-level half of C-6's cure. ≡ ⟨AdminTagsPanel.md · ATP-30⟩ (W7.479) — 23 sites across `demo/palettes` (count corrected per K-11).

**W7.323 · ⟨AdminNamesPanel.md · M-LC7⟩ — the optimistic approve fabricates a DTO the server never returns** (cl.2). `{...item, status:"approved"}` — no `approvedAt`, and (per ADJ-1) no provenance field the wire would recognise; `approveColorName: Promise<void>` makes the honest echo impossible without a second round trip. **Cure shape: the endpoint returns the updated DTO, or re-fetch on settle. Precondition for D-7's Approved-tab provenance (W7.66) and a second witness for gate N-8.**

### §R1.8 — ⟨PaletteCardMeta.md⟩ — 16 rows (W7.324–W7.339)

*Band context: the card's meta row — X.W7.f's count/format seat and X.W7.c's overflow seat meet here.
`PaletteCardMeta.vue` is in §4. W7.43/W7.44/W7.49 carry PM-9/PM-10/PM-13.*

**W7.324 · ⟨PaletteCardMeta.md · PM-1⟩ — `tags.slice(0, 3)` silently discards up to 7 legal tags with no overflow count** (cl.2). `schema.ts:35` admits 10 on create and patch; the only route to the full list is the menu's Edit Tags, gated `remote && isOwned` — **so the majority reader (the non-owner browser) has NO path to the remainder.** *Sharpens*: G8 — and the cure already ships one file away (`VersionHistoryDrawer.vue:59-63` renders the `+N` residue mark; §1a C-12).

**W7.325 · ⟨PaletteCardMeta.md · PM-2⟩ — the vote button has no pressed/busy/disabled state and can double-fire, and the server toggle makes the race semantically destructive** (cl.1). `:43-54` carries only `class`/`:aria-label`/`@click.stop`; `useBrowsePalettes.ts:126-142` `onVote` holds no in-flight lock — **while its sibling `loadMore` DOES gate on `loadGeneration` (`:104`): the pattern exists in the same file.** Witness for gate **N-6** (exactly-one-request) on a non-admin surface.

**W7.326 · ⟨PaletteCardMeta.md · PM-3⟩ — fork/version meaning rides native `title` on non-interactive spans, and the forkOf span carries ZERO text** (cl.1). `:10/:19/:29` are the sole carriers; `:7-13` contains only a `<GitFork>`; lucide ships no `role`/`aria-hidden`/`<title>`, so `:12/:21/:31/:49` are nameless graphics. **Provenance does not exist for touch or AT.** ≡ W7.44 (PM-10's split-brain provenance) — one datum, two failures.

**W7.327 · ⟨PaletteCardMeta.md · PM-4⟩ — a rejected vote is a silent no-op: the sole mutating action in the row is the one action wired past the card's own feedback surface** (cl.1). `ActionFeedback` is mounted (`PaletteCard.vue:123-128`), exposed (`:244`) and consumed by five call sites for save/delete/rename — **the vote path alone terminates in `console.warn("Failed to vote:", e)`.** *Sharpens*: G7's denominator (W7.17) and G13's mutation table (S-13).

**W7.328 · ⟨PaletteCardMeta.md · PM-5⟩ — five `shrink-0` roots with no wrap/truncation policy injected into a no-wrap row whose only shrinkable member is the palette's NAME** (cl.1). `:9/:18/:28/:39/:45` all `shrink-0`, no `max-w`/`truncate`; `PaletteCard.vue:43-44` has no `flex-wrap`; the title's `line-clamp` collapses its `min-width:auto` to 0. **≡ W7.177 (PC-6) — the 0 px name at 390 px is this row seen from the other end. The corpus's "collides" consequence is corrected: it crushes, it does not collide.** *Sharpens*: G9 and S-9(b) — a compaction cure that keeps the chips `shrink-0` re-opens it.

**W7.329 · ⟨PaletteCardMeta.md · PM-6⟩ — the vote button hand-owns colour/pressed/focus/geometry where the producer atom is structural, and its measured box (47.2 × 23.6 px) fails WCAG 2.5.8 on every phone-width viewport** (cl.1). `:45/:51/:53`; the cure sits 40 lines away. **Motion row M-16 = TRUE is carried with its caveat: `active:scale-95` is PRM-safe because `transform` is struck from the reduce list** (contrast W7.145 — same utility, opposite consequence, because the property lists differ).

**W7.330 · ⟨PaletteCardMeta.md · PM-7⟩ — the tag pill parallel-mints a producer primitive the demo already consumes elsewhere** (cl.2). `Chip` is shipped (`./chip`; `mode="static"` is the exact case) and consumed (`EasingSpecimenStrip`); `:39` re-mints it at `rounded-full bg-muted/60 px-1.5 py-0.5 text-micro`. **The geometry limb and the one-line cure are KILLED (R-3): the local pill is smaller than Chip's smallest rung on all three axes — adoption is a size decision, not a swap.** ≡ ⟨AdminTagsPanel.md · ATP-5⟩ (W7.475).

**W7.331 · ⟨PaletteCardMeta.md · PM-8⟩ — the accessible name is factually WRONG in the voted state, state-blind, and ungrammatical at n=1** (cl.1). `:46` `` `${palette.voteCount ?? 0} votes, click to vote` `` — the endpoint is a toggle (`votes.ts:39`), so activating a voted heart REMOVES the vote while the name promises the opposite: **the name LIES about the action's direction.** → X-W7.f owns the spoken form (with W7.161).

**W7.332 · ⟨PaletteCardMeta.md · PM-11⟩ — two identical `GitFork` glyphs render adjacently with OPPOSITE meanings** (cl.1). `:12` vs `:21`, same `w-3 h-3`; the `v-if`s (`:8`, `:17`) are independent and jointly satisfiable — `forks.ts:82` sets `forkOf` on a child while the parent's count increments, so **any forked fork renders `⑂ ⑂3`**, disambiguated only by whether a numeral follows.

**W7.333 · ⟨PaletteCardMeta.md · PM-12⟩ — three sibling counters, two type sizes, one FLUID against two FIXED** (cl.1). Fork/version counts inherit `text-micro` (11 px fixed) via bare `fira-code` spans (`:22/:32`); the vote count is `text-mono-small` (`:53`), a clamp growing 14→20 px with viewport. **Two spellings of mono in one file are the signature of drift, not emphasis.** → X-W7.f; canon X-W10.

**W7.334 · ⟨PaletteCardMeta.md · PM-14⟩ — the component is a rootless five-fragment with an unwritten layout contract** (cl.2). `:1-55` has five sibling roots; every geometry fact rides `PaletteCard.vue:44`'s `flex items-center gap-2 min-w-0`. **There is no element on which to hang a cure — this is WHY the G9/G17 overflow cure cannot be authored inside this file. The successor must own a root (or the cure lands in the parent, stated).**

**W7.335 · ⟨PaletteCardMeta.md · PM-15⟩ — zero test coverage on a network-mutating control whose SERVER side IS pinned** (cl.1). 0 references in `test/` + `e2e/`; the toggle contract is asserted at `palettes-votes-flags.test.ts` on the API side only. **→ X-W7 G8/G9/G10/G17 (the mounted N-fixture battery IS the coverage cure) + an X-W1 rider (the AP-4 precedent) — and it is blocked on gate N-1: the mount substrate does not exist.**

**W7.336 · ⟨PaletteCardMeta.md · PM-16⟩ — `voted` conflates unknown with false, and the collapse hides an identity-minting side effect** (cl.1). `format.ts:47/:89` `voted: votedSlugs ? … : undefined` — `undefined` is a deliberate third state ("we did not resolve this user's vote", `:55-56`); `:51`'s binary ternary renders it as not-voted, so the anonymous visitor and the confirmed non-voter get one hollow heart. **Same family as W7.61 (auth ≠ empty), at field granularity.**

**W7.337 · ⟨PaletteCardMeta.md · PM-20⟩ — the mutating vote count lacks `tabular-nums`, so 9→10 reflows the button and nudges the whole `shrink-0` row** (cl.1). **The producer ships both cures (`.tabular-nums`; `AnimatedDigit`).** → X-W7.f G17: the compact-count formatter carries numeric stability. ≡ ⟨wb-extract-workbench.md · XW-16⟩'s tabular limb (W7.418).

**W7.338 · ⟨PaletteCardMeta.md · PM-22⟩ — the vote button is a LATENT second occupant of Mix's nested-interactive content model, not a live one** (cl.4). Real and measured at the card/menu pair (ledger 24360) and banked as PC-11 → X-W7.c (W7.48); **here it never renders on the reachable state (locals-only feed, verified).** Corrected attribution recorded; not re-booked (anti-rename).

**W7.339 · ⟨PaletteCardMeta.md · R-1⟩ — ruling row: RESCOPED + CROSS-BOOKED ≡ PC-11, both readers partly wrong** (cl.1). The invalid content model is REAL (`nestedButtonInButton:2`), but the probe's own sample reads `innerInteractive:["BUTTON:Palette menu"]` — the MENU trigger, not the vote button; MixSourceSelector's list is `pm.savedPalettes` where `isLocal:true` is minted and forced, so `v-if="!palette.isLocal"` fails and **the vote button never renders in Mix**. **A citation-discipline event is recorded in that record's DISSENT — carried here as the reason the row is a pointer, not a booking.**

### §R1.9 — ⟨wb-extract-controls.md⟩ — 16 rows (W7.340–W7.355) · the XP-EXTRACT packet's NWO band

*Band context: §1a C-10 and §BoundsDelta B-1 — `ExtractControls.vue` appears in NO X wave's file-bounds
table; the only named receiver is CC-105 → X-W4.g, trigger-gated on the X-W0.j Glass-8 repin census, **and
W4.g's own bounds omit the file**. All 15 rows below are booked **NO-WAVE-OWNER** at their record and are
carried here id-for-id under the ROW-CARRIAGE LAW because the packet's home wave is X-W7; the one exception
(EC-28) is the single row with an in-bounds byte-surface.*

**W7.340 · ⟨wb-extract-controls.md · EC-1⟩ — NO-WAVE-OWNER: both `<DockSeparator/>` render at height 0 and paint nothing** (cl.1). `.dock-separator{height:var(--dock-separator-height)}` with no fallback; the var's ONLY authoring site is inside `.glass-dock{}` (`shell.css`; zero `:root` blocks) — **a `.glass-dock`-scoped primitive used on a card plate.** Same class as W7.140 (the dead `chrome` ink probe reading `.glass-dock`). `[BD-B1]`

**W7.341 · ⟨wb-extract-controls.md · EC-4⟩ — NO-WAVE-OWNER · PIN: the kC axis is unoperable at 320 px** (cl.3). One non-wrapping `flex items-center gap-2` row (`:39-91`) carrying 3 DockControls + 2 separators + a `w-5` label + a `w-5` readout, with the kC group the ONLY `flex-1 min-w-0` child — **all shrink lands on the one element that must not shrink.** Corpus: 22.5 px track, 0.70 px/step; rendered witness `D-narrow-320-light.png`. The P5 producer ask rides the BH relay (informational). `[BD-B1]`

**W7.342 · ⟨wb-extract-controls.md · EC-5⟩ — NO-WAVE-OWNER: the camera is a one-way door and a stream leak** (cl.1). No off control exists (`stopCamera` reachable only via `onFile`/`onBeforeUnmount`, `:235/:281`); `disabled` never reaches Camera, so a second press re-enters `startCamera` (`:239-250`), assigning `cameraStream` without stopping the previous stream — **orphaned live tracks.** The producer lever exists and is unused (`DockControl active`). `[BD-B1]`

**W7.343 · ⟨wb-extract-controls.md · EC-6⟩ — NO-WAVE-OWNER · PIN: `disabled` is a whole-component contract honoured by 1 of FIVE controls** (cl.1). `:110` declared, `:84` the sole reference; Upload/Camera/both Sliders ignore it, against the parent's stated intent ("camera running / quantize in flight, stand down", `:70`). **Live consequence beyond the door: both sliders keep re-arming the 300 ms debounce mid-flight.** Denominator corrected (K-O). `[BD-B1]`

**W7.344 · ⟨wb-extract-controls.md · EC-19⟩ — NO-WAVE-OWNER: the accent spent on a surface collides with the accent-derived focus ring** (cl.3). Source-certain half: `--focus-ring-color` = `--accent-live` (demo-pinned, twice) and `trackInk` is the certified live pick with hue preserved — **state signal and surface share one hue axis by construction.** Rendered 1.03–1.14:1 and the 1.976 producer-default counterfactual are UNPROVEN-NEEDS-LIVE; the "wholly gated" framing is killed (K-D). `[BD-B1]`

**W7.345 · ⟨wb-extract-controls.md · EC-21⟩ — NO-WAVE-OWNER: the unguarded token and the assert-inject, one latent portability fact** (cl.1). `:124` emits bare `var(--ink-muted)` (zero CSS declarations repo-wide; the sole definition is the boot-stamp) while `:149` in the same file guards it; the chain hard-asserts `INK_AMBIENT_KEY`. No live break on any shipped route (K-J). **≡ §1a C-11 — the ruling is settled AGAINST the two-arm form: the bare read is reference-correct, and this row is its fourth witness.** `[BD-B1]`

**W7.346 · ⟨wb-extract-controls.md · EC-23⟩ — NO-WAVE-OWNER: a fixed 20 px reservation against a viewport-fluid font** (cl.1). **The 1440 overflow claim is KILLED (K-F); the real defect is static:** `w-5` is a constant, `--type-small` is a clamp — two Fira digits exceed 20 px once the clamp passes 16.667 px (viewport ≈1547 px), +4.0 px at ≥2880, with `text-right` sending the excess back across the cluster. VC §4: "reserve their widest legal representation". `[BD-B1]`

**W7.347 · ⟨wb-extract-controls.md · EC-24⟩ — NO-WAVE-OWNER · PIN: "ONE mono voice" is two type recipes whose ratio is itself viewport-dependent** (cl.1). 1.24× (320) → 1.49× (1440) → 1.82× (clamp saturation ≈1800 px), re-derived from the tokens. The `:12-13` comment narrows parenthetically to weight (which does match); **size is the visible half.** Same facility as W7.99/W7.101 (`--type-caption` is `--ui-scale`-blind). `[BD-B1]`

**W7.348 · ⟨wb-extract-controls.md · EC-26⟩ — NO-WAVE-OWNER · PIN: dead scoped `.touch-gate-target`** (cl.1). `:140-142`; the class is absent from the 93-line template, and scoped compilation could not reach producer internals anyway. Pure subtraction at the next file touch. `[BD-B1]`

**W7.349 · ⟨wb-extract-controls.md · EC-28⟩ — the one row with an in-bounds surface: `cssColorOpaque` reaches this subtree by two mechanisms with three stacked dead degenerates** (cl.1). inject-default `undefined` → `?? ''` → the `:124` falsy arm (the last two unreachable per K-J). **Demoted from MAJOR: dead defensive layers, no live break. → X-W7 — `ExtractWorkbench.vue | modify-carve` owns the `?? ''` sites.** ≡ W7.69 (`cssColorOpaque` required-and-never-read, fifth witness) ≡ ⟨wb-extract-workbench.md · XW-28⟩ (W7.422).

**W7.350 · ⟨wb-extract-controls.md · EC-32⟩ — NO-WAVE-OWNER: the vite dogfood-alias comment is factually false** (cl.1). "A package does not install itself" vs the installed transitive 4.0.0. One-line truth fix at the next config-touching wave. `[BD-B1]`

**W7.351 · ⟨wb-extract-controls.md · EC-37⟩ — NO-WAVE-OWNER: the `@reference` directive is dead in this file** (cl.1). `:137`; the block contains only plain declarations — no `@apply`, no theme function — **and per the reader's census it is dead in 15 of 17 carrying files, at a per-block `foundation.css` re-processing cost.** ≡ W7.231 (SFB-42's `@reference` limb). Styles-hygiene sweep. `[BD-B1]`

**W7.352 · ⟨wb-extract-controls.md · EC-40⟩ — NO-WAVE-OWNER: two controls, one function, in the boot state** (cl.1). The labelled well and the icon both invoke `openFilePicker` (`:24-25` / `ImageDropZone:21-22`). **RESCOPED from the axis MAJOR: both owners are named and functional — the defect is a missing state-aware action region (the icon is redundant empty, load-bearing populated), not a broken path.** `[BD-B1]`

**W7.353 · ⟨wb-extract-controls.md · EC-41⟩ — NO-WAVE-OWNER · PIN: `text-right` on the k label is a physical alignment in a bidirectional app** (cl.1). `:15`, source-certain; the corpus's 8.0→17.9 px RTL delta is its live face. ≡ W7.104 (BIDI/RTL is a facility concern) — fifth witness. `[BD-B1]`

**W7.354 · ⟨wb-extract-controls.md · EC-42⟩ — NO-WAVE-OWNER · PIN: one `:style` object welds three keys whose lifetimes differ by orders of magnitude** (cl.1). Gradient per-image, `trackInk` per-frame; Vue's `patchStyle` re-sets unconditionally. Rider on EC-2's cure. `[BD-B1]`

**W7.355 · ⟨wb-extract-controls.md · EC-45⟩ — NO-WAVE-OWNER · PIN: producer defaults restated per-instance ×3 and `--btn-hover-color` pinned identically ×3** (cl.1). `:42/:45/:51/:54/:86/:89`. **≡ ⟨wb-extract-workbench.md · XW-32(c)⟩ (W7.423) — the only `--btn-hover-color` sites in demo; one declaration on the row does the job (owner edict 5).** `[BD-B1]`

### §R1.10 — ⟨ActionFeedback.md⟩ — 15 rows (W7.356–W7.370)

*Band context: the card's verdict chip. §1a C-4 records that this record authored every row against a
successor surface §4 does not authorise creating (`PaletteCard.vue` is `modify-carve`, not `delete`);
`ActionFeedback.vue` itself is `[BD-B5]`. W7.64 carries AF-1/AF-2/AF-3, W7.17 carries AF-8, W7.21 AF-20.
Namespace: these are ⟨ActionFeedback.md · AF-n⟩, NOT ⟨AdminFlaggedPanel.md · AF-n⟩ (§1a C-1).*

**W7.356 · ⟨ActionFeedback.md · AF-4⟩ — MAJOR: the success rung forks the producer's SEALED tone register three ways, and the one-line cure is KILLED for light mode** (cl.2). Prop named `variant`, vocabulary `error` ∉ TONES, rendering raw green literals (`axes.d.ts` seal byte-read). **Cure lock (R-5): the r2 one-line cure measures 1.65:1 in light — the fix ships only with a legibility answer (Alert's foreground-ink idiom or an ink pair), never as a rename.**

**W7.357 · ⟨ActionFeedback.md · AF-5⟩ — MAJOR: the imperative registry retains unmounted cards; verdicts are silently lost** (cl.1). `:ref="(el: any) => el && (cardRefs[…] = el)"` (`BrowsePane.vue:94`, `PalettesPane.vue:84`) — **the `el &&` swallows Vue's null-on-unmount; no delete path exists; `?.` guards absence, never deadness; `noUncheckedIndexedAccess` proves nothing about liveness.** ≡ ⟨PaletteCardGrid.md · PG-8⟩ (W7.391) ≡ ⟨PalettesPane.md · PP-24⟩ (W7.380) — one identity, three records.

**W7.358 · ⟨ActionFeedback.md · AF-6⟩ — MAJOR: three of four tone rungs fail WCAG AA at the shipped fixed 12 px; the r2-canonised dark-destructive pair is the worst (2.78:1)** (cl.1). Independently recomputed digit-exact at R-5. **The axis-crossing failure is recorded verbatim: D owned contrast and never looked; L looked at the exact lines and disclaimed it.** → X-W7 cures at the successor surface; **X-W10 books the canon law (any tone-on-tint pair carries a contrast proof).**

**W7.359 · ⟨ActionFeedback.md · AF-7⟩ — MAJOR: a hand-rolled Alert, in violation of the repo's own standing rule** (cl.2). `DESIGN.md:384` verbatim; the barrel is live with 2 consumers and the B.W2 precedent is in-file; the producer Alert supplies sealed tone + compiled announce mapping. **Caveats carried verbatim: announce defaults OFF; wash-on-well fit = U-3; the rule's standing = U-6 — adoption is a decision inside the PaletteCard rebuild, not a mechanical swap.**

**W7.360 · ⟨ActionFeedback.md · AF-9⟩ — MINOR: an empty message is renderable AND reachable** (cl.1). Chain verified: `api-problem.ts:40` `response.statusText` fallback (empty on HTTP/2) → `e?.message ?? …` non-nullish → an icon-only red chip. **Promoted from assertion to proof by the design reader.** → the message contract at the successor surface; *sharpens*: G7.

**W7.361 · ⟨ActionFeedback.md · AF-10⟩ — MINOR: the timer is never cleared on unmount** (cl.1). Parent-coupled mount makes the stray emit harmless; the residue is a ≤2500 ms closure over a dead instance, **compounding AF-5's corpse (W7.357).** ≡ W7.70 (AAP-20) and W7.35 (`useLeaveTimer`) — one disposal law, four surfaces.

**W7.362 · ⟨ActionFeedback.md · AF-11⟩ — MINOR: name, location and coupling disagree** (cl.1). Rename `PaletteCardFeedback.vue` per KISS — **mooted if X.W7.c-4 renames the world anyway; recorded so the rename is decided once, not twice.**

**W7.363 · ⟨ActionFeedback.md · AF-12⟩ — MINOR: copy governance is entirely caller-dependent** (cl.1). **WCAG 1.4.1 limb RESCOPED: the icon fork is a genuine non-colour channel, so use-of-colour is SATISFIED** — the defect is unpoliced free-form copy, literals beside raw transport text (≡ W7.304's `e.message` family). → one copy register at the verdict seam.

**W7.364 · ⟨ActionFeedback.md · AF-14⟩ — MINOR: typography fork — `text-xs fira-code` hand-pairs a fixed 12 px with a font alias where the producer ships `text-mono-small`** (cl.1). **The chip is the card's only non-fluid text and a direct aggravator of AF-6.** → X-W7 under X-W10 canon.

**W7.365 · ⟨ActionFeedback.md · AF-15⟩ — MINOR: `--vj-celebrate-expanded: 2.5rem` hard-caps unbounded content** (cl.3). `animations.css` maps the var onto `max-height` at enter-to/leave-from with `overflow: hidden` on both actives — a two-line message (44 px vs 40) is clipped through the enter, pops open when classes drop, and snaps down before the leave. **Wrap threshold = U-4 (MEASURE-AT-OPEN).** Cure: intrinsic sizing.

**W7.366 · ⟨ActionFeedback.md · AF-16⟩ — MINOR: a replacement verdict mutates in place with no perceptual event of ANY modality** (cl.1). The Transition fires only on the `v-if` toggle; success→error swaps tint/icon/text with zero motion, zero announcement, zero focus event — **then dies on the inherited clock (AF-3).** Falls out of the identity-keyed transition + AF-1's live region (W7.64).

**W7.367 · ⟨ActionFeedback.md · AF-17⟩ — MINOR: both lucide icons break the repo's 71-instance `aria-hidden` convention, 6 instances in this feature** (cl.1). Cosmetic today only because nothing announces — **it becomes a regression the day AF-1's region lands with an unnamed graphic inside it.** Sequencing rider on W7.64. ≡ W7.301 (TEP-28).

**W7.368 · ⟨ActionFeedback.md · AF-18⟩ — MINOR: the element's material register is unreconciled — named a chip, dressed as a panel, laid out as a band** (cl.2). Block-level `flex`, no width constraint, full-card tint in a `grid-cols-1` wall; `rounded-panel` 12 px on a 28 px band butting a `py-2.5` row. **Carried verbatim: a full-bleed verdict band may be the RIGHT gestalt — the defect is that three registers are asserted at once, not that any one is wrong.**

**W7.369 · ⟨ActionFeedback.md · AF-19⟩ — MINOR: no overflow discipline on the message span, in a card that explicitly refuses to clip** (cl.1). Flex `min-width: auto` + unbreakable transport tokens; the card comment is byte-verified ("NO overflow-hidden (S.W5-10 / S-15-A)"); every sibling rendering foreign text guards it. ≡ W7.328 (PM-5) — the row's crushable-member law.

**W7.370 · ⟨ActionFeedback.md · AF-22⟩ — INFO: `autoDismissMs` is dead configuration** (cl.1). Read inside the callback, so **even a binder cannot retime a live chip.** Delete, or make it load-bearing with the verdict object. Same dead-axis species as W7.52 (ES-4's `dots`) — but with no oracle lock.

### §R1.11 — ⟨PalettesPane.md⟩ — 15 rows (W7.371–W7.385)

*Band context: `PalettesPane.vue`, `usePaletteStore.ts` and `usePaletteActions.ts` are in §4;
`CurrentPaletteEditor.vue` is `[BD-B5]`. W7.12/W7.85 carry PP-3/PP-6.*

**W7.371 · ⟨PalettesPane.md · PP-4⟩ — BLOCKER: the first drag-reorder of each page load scrambles and persists the library order** (cl.2). Re-derived from installed dist: `useSortable`'s `defaultOptions.onUpdate` survives an onEnd-only bag; `moveArrayElement` takes the **non-ref** list without copying and splices synchronously with the re-insert deferred to `nextTick`; `PalettesPane.vue:183` passes `pm.filteredSaved.value`. **≡ W7.25 (PG-1) — the named-addition rider is in force; gate N-7's RED case is the FIRST drag, so a fixture that drags twice passes the defect.**

**W7.372 · ⟨PalettesPane.md · PP-5⟩ — MAJOR: a drag under any non-empty query relocates every hidden palette en bloc behind the visible ones, and persists it** (cl.1). `reorderPalettes`' second loop (`usePaletteStore.ts:163-165`) appends every non-listed palette to the tail; `:190` maps ids from the visible subset only. **IDENTITY-FOLD → ⟨PaletteCardGrid.md · PG-2⟩ (W7.25) — `≡`-pointer; both arms of gate N-7.**

**W7.373 · ⟨PalettesPane.md · PP-7⟩ — MAJOR (rescoped per K-8): the save path sequences a destructive `clearCurrent` unconditionally after `saved`, with no success signal** (cl.1). `CurrentPaletteEditor`'s `saveCurrentPalette`/`confirmUpdatePalette` both emit then clear; **Vue's `callWithErrorHandling` means a handler throw never aborts the wipe.** Production-reachable throw not demonstrated — the mechanism is the row, the reachability is not. Couples to W7.128 (A-2 arm (ii) writes `colors: []`).

**W7.374 · ⟨PalettesPane.md · PP-8⟩ — MAJOR: the shipping export path carries two raw-interpolation injection vectors** (cl.2). Name → SVG text content and `c.css` → fill attribute; plus a rejecting zero-colour case (width 0 → `toBlob` null), a collapsing slugify (`""` → dotfiles and the colliding `--palette--0`), a same-tick `revokeObjectURL` on a never-appended anchor, and a `switch` with no default — **every failure `console.warn`-silent while publish gets `card.showFeedback`.** **≡ W7.13/W7.14: the cure is the `export/` cutover with `canonical.ts` as the shipped path — NO shared `slugify`. Witness for new gate N-15.**

**W7.375 · ⟨PalettesPane.md · PP-9⟩ — MAJOR: the saved grid is an ARIA `list` owning zero `listitem`s, malformed in both states** (cl.1). `PaletteCardGrid.vue:3`; children are `role="article"` cards or the `v-if`'d EmptyState. **IDENTITY-FOLD → W7.51 (ES-9) ≡ W7.386 (PG-3) ≡ W7.180 (PC-10)** — one identity, four records; `≡`-pointer only.

**W7.376 · ⟨PalettesPane.md · PP-12⟩ — MAJOR: the card has ONE interaction state, and its press choreography writes a variable nothing reads while the cast child reads a variable nothing writes** (cl.1). `--card-press-t` written, unread; `.cartoon-cast` reads `--cartoon-press-t`, unwritten; the cast child double-paints a static shadow; Enter/Space handlers sit on an unfocusable div. **≡ W7.175 (PC-4) ≡ W7.398 (PG-17) — one write/read mismatch, three records. Gate N-12.**

**W7.377 · ⟨PalettesPane.md · PP-14⟩ — MAJOR: the specimen well is scale-blind and its documented legibility floor is self-cancelling** (cl.1). Fixed `h-10 w-full` for 1..n colours (`:6-11`); in the weighted branch the floor-then-renormalise (`:60-67`) guarantees **every floored segment renders strictly below 8%** whenever the floor fires. **The 0.5-dead-guard sub-claim is KILLED (K-7) — carry the kill.** ≡ W7.27 (PCS-1) ≡ W7.272 (PCS-23); *sharpens*: G10.

**W7.378 · ⟨PalettesPane.md · PP-15⟩ — MAJOR: the primary destructive path guarantees focus loss to `<body>`, and the only live region is created in the same tick as its content** (cl.1). The delete-all opener sits inside `v-if="savedPalettes.length > 0"` (`:62`) and its own success removes it; **reader-D's correction adopted: the EmptyState `role="status"` mounts `v-if`'d WITH its text, so the likely outcome is silence, not a wrong sentence.** ≡ W7.215 (SFB-14), W7.106 (ES-2) — the self-removing-actuator family.

**W7.379 · ⟨PalettesPane.md · PP-21⟩ — MAJOR: the local pane's editor lives inside the remote-browse mega-feature and is published in its "stable public API" seam** (cl.1). File at `browser/card/`, re-exported at `browser/index.ts`, sole consumer `PalettesPane.vue:41/:137-140`. **BOOK → X-W7 (CC-006 domain split: the editor homes with the local library surface) — this is the wave's own title ("Palette Specimen and Domain Split") and it is `[BD-B5]` today.**

**W7.380 · ⟨PalettesPane.md · PP-24⟩ — MINOR: component instances held in a deep `reactive()` Record, never pruned** (cl.1). `:84/:177`; the `el &&` guard swallows the unmount-null; owner edict 7 applies. **IDENTITY-FOLD → W7.391 (PG-8) + W7.357 (⟨ActionFeedback.md · AF-5⟩).**

**W7.381 · ⟨PalettesPane.md · PP-26⟩ — MINOR: `defaultStore` is a shared mutable module constant handed by reference to `useStorage` AND returned by both corrupt-read recovery paths** (cl.1). `usePaletteStore.ts:8/:19/:26/:30` + the unshift sites — **first-visit saves mutate the "empty default" in place, and recovery hands back the polluted object.** Two-line cure (fresh object per read; factory default). `usePaletteStore.ts` IS in bounds; couples to §1a C-7 and W7.130.

**W7.382 · ⟨PalettesPane.md · PP-27⟩ — MINOR: N cards yield N identical "Palette menu" tab stops, and the only reorder affordance is an unnamed, unfocusable 16×16 SVG** (cl.1). `:100` is the sole site; reorder is mouse-only, below the 2.5.8 target floor. **The 34-stop live ordering stays U-6 (MEASURE-AT-OPEN).** ≡ W7.192 (PC-26) ≡ W7.40 (MSS-9's grammar) — gate N-7's a11y half. *Sharpens*: G15.

**W7.383 · ⟨PalettesPane.md · PP-28⟩ — MINOR: the search field's only label is its placeholder** (cl.1). Vanishes on input (3.3.2/2.4.6). One forwarded `aria-label` today; **the named-field rung rides the ASK-D seated producer event (relay-informational).** ≡ ⟨AdminAuditPanel.md · AAP-30⟩ (W7.433).

**W7.384 · ⟨PalettesPane.md · PP-29⟩ — MINOR: `role="article"` is NOT a landmark role, and the `:2-4` comment's justification is a misconception propagated verbatim into challenge-C's cure text** (cl.1). ARIA 1.2 landmark set verified by enumeration. **→ X-W7.c so the successor's semantics are chosen on TRUE premises; flagged as a corpus-hygiene note against the challenge text.**

**W7.385 · ⟨PalettesPane.md · PP-31⟩ — MINOR: the decorative "· empty plate ·" eyebrow is announced inside the `role="status"` region, unlike the correctly-hidden dot trio beside it** (cl.1). **IDENTITY-FOLD → W7.107 (ES-11) — its cure covers the `empty-eyebrow` prop this pane supplies at `:78`.** `≡`-pointer only.

### §R1.12 — ⟨PaletteCardGrid.md⟩ — 13 rows (W7.386–W7.398)

*Band context: `PaletteCardGrid.vue` is in §4. W7.25 carries PG-1/PG-2 with the named-addition cure lock.*

**W7.386 · ⟨PaletteCardGrid.md · PG-3⟩ — MAJOR: `role="list"` is malformed in BOTH states** (cl.1). Populated children are `role="article"`; at true-empty the sole owned child is the plate's `role="status"`. `PaletteCardGrid.vue:3`; `PaletteCard.vue:22`; `EmptyState.vue:28`; `role="listitem"` → 0 repo-wide. **≡ W7.51 (ES-9) ≡ W7.180 (PC-10) ≡ W7.375 (PP-9)** — one identity, four records. *Sharpens*: G12, G19.

**W7.387 · ⟨PaletteCardGrid.md · PG-4⟩ — MAJOR: the grid's containment amputates the card's signature cartoon caster** (cl.2). `:50-52` `contain: content` on a zero-padding single-column grid vs `cartoon-surface`'s −3/−5/−7 px LEFT+DOWN stamp: every card loses its whole left leg at rest, at both call sites; the last loses its bottom leg whenever content fills past the 120 px floor. **≡ W7.176 (PC-5). Rider in force: the cure must audit the SECOND clip ancestor (`.pane-scroll-fade`) in the same commit, or the amputation simply moves up one box.**

**W7.388 · ⟨PaletteCardGrid.md · PG-5⟩ — MAJOR here, BLOCKER as booked at ES-1: filtered-zero wears first-run copy at both call sites** (cl.1). N saved + a non-matching query ⇒ header badge "N", the delete-all-N trigger live, and a plate stating "No saved palettes yet. Add colors above, then save the set." — **a falsehood with an unusable remedy, in the accessibility tree.** The four other limbs are killed at the record. **≡ W7.83 — grade held at ES-1 per anti-rename.**

**W7.389 · ⟨PaletteCardGrid.md · PG-6⟩ — MINOR: the single-root invariant is load-bearing at an external `$el` seam, untyped at both ends, and its only named guard is mislabeled** (cl.1). `PalettesPane.vue:181` `(sortableGridRef.value as any)?.$el as HTMLElement | undefined` — the `as any` gratuitous, the `as HTMLElement` unchecked over `$el: any` (**a fragment root's Comment node satisfies it silently**); no `defineExpose` in the child. Couples to PG-13 (W7.394).

**W7.390 · ⟨PaletteCardGrid.md · PG-7⟩ — MINOR: the `emptyAction` CTA slot is plumbed end-to-end and consumed by nobody** (cl.1). Declaration only (`:28-29`); the in-file ruling ("The CTA slot survives on the caption", `:19-20`) survived in the primitive and died at every call site — **the invitation is a text-only dead end while the sibling error plate carries a real Retry (`BrowsePane.vue:68-77`).** **≡ W7.108 (ES-16): zero actions at all 9 empty call sites. G19 rewrites copy; this says copy is not the problem.**

**W7.391 · ⟨PaletteCardGrid.md · PG-8⟩ — MINOR: `cardRefs` is a write-only registry in both grid consumers** (cl.1). The `el &&` guard swallows Vue's unmount-`null`; detached card instances accumulate per filter keystroke; async verdicts can be delivered into unmounted cards with no visible result. `PalettesPane.vue:84/:177` (+ the awaited `onPublish` path `:199-209`); `BrowsePane.vue:94/:209` + its four verdict paths. **IDENTITY ≡ W7.357 ≡ W7.380.** *Sharpens*: G13 — "one visible result" is unprovable while the delivery target may be dead.

**W7.392 · ⟨PaletteCardGrid.md · PG-9⟩ — MINOR (RESTATED; parenthetical struck per ruling): the list has no accessible name at either call site** (cl.1), **though plain attr fallthrough would deliver one today** — while the decorative loading wrappers beside it carry `aria-label` on name-prohibited bare divs, and at the dual-pane breakpoint two structurally identical anonymous lists mount side by side. A two-attribute call-site omission. ≡ W7.107's twin-live-plate finding.

**W7.393 · ⟨PaletteCardGrid.md · PG-12⟩ — INFO (carried + sharpened): `min-h-[120px]` is the file's only un-narrated decision** (cl.1). Inert in the empty state (the plate's own utilities compute ≈194 px, so the floor never stabilises the skeleton→plate morph it could have served) and binding only under a single short card, where it opens ~30 px of dead space — **which is also the one state where the last card's caster escapes PG-4's clip.** Couples W7.387 to G9.

**W7.394 · ⟨PaletteCardGrid.md · PG-13⟩ — MINOR (dev-only): PaletteCard commits the root-leading-comment fragment hazard the grid's own comment warns about** (cl.1). `PaletteCard/PaletteCard.vue:2-4` comment precedes the `:5` root div (dev compiler → `DEV_ROOT_FRAGMENT`; prod strips comments) — **on the one code path that rearranges the grid's DOM behind Vue's back.** Re-verified at the NEW path. Couples to PG-6 (W7.389).

**W7.395 · ⟨PaletteCardGrid.md · PG-14⟩ — MINOR (NEW): the wall's loading and load-more phases hand-roll divergent copies of the grid's layout contract** (cl.1). `BrowsePane.vue:46` and `:127` re-declare `grid grid-cols-1 gap-3` on bare divs with no role, no 120 px floor, no containment — **so the out-in swap between skeleton and wall crosses a containment boundary and a min-height floor mid-morph, and the AX tree gains/loses a list.** `BrowsePane.vue` is in bounds.

**W7.396 · ⟨PaletteCardGrid.md · PG-15⟩ — MINOR (NEW): `gridClass` is a redundant re-implementation of Vue's class fallthrough** (cl.2). Single-element root + default `inheritAttrs` ⇒ `class` already merges; the prop adds zero capability and creates two mechanisms with no defined precedence for one job — **which is why the C-4/D-3/L-2 family's "bound the styling authority" prescriptions are unimplementable as written. Carry the impossibility with the row.**

**W7.397 · ⟨PaletteCardGrid.md · PG-16⟩ — INFO (NEW): `message` is the one EmptyState prop with no default and no guard** (cl.1). An omitted `empty-text` renders a styled empty `<p>` (`EmptyState.vue:58-60`, unguarded, unlike `hint` at `:61`). Unreachable today (both grid consumers supply it; o9 pins the strings) **and NOT booked at `EmptyState.md` — ES-36 is the eyebrow's guard asymmetry, an adjacent family, different prop.** Recorded so the two are not conflated in the G19 carve.

**W7.398 · ⟨PaletteCardGrid.md · PG-17⟩ — MINOR (the seat's own find; no axis, neither reader, no registry row): the card's celebrated press-cast choreography is inert** (cl.1). `useLiquidPress({ pressVar: "--card-press-t" })` (`:264`) vs the producer's `.cartoon-cast` travel/spread reading `--cartoon-press-t` (`@property`-registered, initial 0). **≡ W7.175 (PC-4) ≡ W7.376 (PP-12). Gate N-12's cleanest witness: a written variable no rule reads, and a read variable no code writes.**

### §R1.13 — ⟨PaletteCardSkeleton.md⟩ — 13 rows (W7.399–W7.411)

*Band context: G20's second component. `PaletteCardSkeleton.vue` is in §4; W7.28/W7.29/W7.30 carry
PCS-1/PCS-10/PCS-12. Namespace: ⟨PaletteCardSkeleton.md · PCS-n⟩ ≠ ⟨PaletteColorStrip.md · PCS-n⟩ — §1a C-1
in force, and this band is exactly why the law exists.*

**W7.399 · ⟨PaletteCardSkeleton.md · PCS-2⟩ — NO-WAVE-OWNER limb + MAJOR: the certified `--skeleton-ink` never reaches a pixel; the bones paint `var(--muted)`, polarity INVERTED in both schemes** (cl.2). glass-ui hardcodes `background:var(--muted)`; `--muted` = `--neutral-1`, a fixed neutral constructed independently of `--well-bg` = `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)` (`foundation.css:328`), **so no signed relation can hold across schemes.** ≡ W7.236 (SP-5) — demo halves → X-W7; the producer seams are GLASS-OWNED (BH relay, CE-9). `utils.css` is `[BD-B6]`.

**W7.400 · ⟨PaletteCardSkeleton.md · PCS-3⟩ — MAJOR: every declared corner radius loses to the producer, and the 4 px value is itself a producer bug that clobbers the design system app-wide** (cl.2). The unlayered `.skeleton{border-radius:var(--radius-input)}` beats `rounded-none`/`rounded-md`/`rounded-badge` unconditionally — the strip is five 4 px pills with plate notches. **Consumer half → X-W7; the producer half is a BH-relay INFORM (blast radius), never an ask to restore forwarding (P051, CE-9).**

**W7.401 · ⟨PaletteCardSkeleton.md · PCS-4⟩ — MAJOR: the ghost mispredicts the card it stands in for** (cl.1). A 68 px swatch row the collapsed Browse card never renders, at the OTHER seat's 56 px swatch size, +50.4% total height: `PaletteCard` renders `PaletteCardSwatches` under `v-if="expanded"` and BrowsePane's `:expanded` is false at mount, with no `swatch-class` so the default applies. **≡ W7.186 (PC-18).** *Sharpens*: G20's geometry clause.

**W7.402 · ⟨PaletteCardSkeleton.md · PCS-5⟩ — MAJOR: the five-term stagger clock is inert — twelve blocks, one phase, structurally guaranteed** (cl.2). The four writes target a property with 0 dist hits; the producer's only animation declaration carries no `animation-delay`. **Mechanism corrections bind verbatim: there is NO single bar (K-5) — each block owns a private `::after` at `inset:0` translating ±110% of its own width — so any cure authored against a shared sweep is authored against a fiction.**

**W7.403 · ⟨PaletteCardSkeleton.md · PCS-6⟩ — MAJOR: one plate, two hand-copies, drifted in every dimension that shows** (cl.1). Ink polarity, radius, ink ladder (flat vs 100/60/40/30), strip separation (none vs `gap-px`), strip sizing (`width:100/count%` vs `flex-1 min-w-0`), delay formatting (raw floats vs `.toFixed(2)`). **The "byte-identical" evidence row is KILLED (R-1) — the drift is the finding, and the kill is what makes G20's two-component clause necessary rather than cosmetic.** ≡ W7.246 (SP-20), W7.184 (PC-15).

**W7.404 · ⟨PaletteCardSkeleton.md · PCS-7⟩ — NO-WAVE-OWNER limb + MAJOR: four (six on load-more) identical `role="status"` regions, each with empty text and all-`aria-hidden` descendants** (cl.1). `:35-36` on the root; `BrowsePane v-for="i in SKELETON_COUNT"` (4, `:207`) + `v-for="i in 2"` (`:130`); **the producer hardcodes `aria-hidden="true"` and filters `role`/`aria-*` from consumer attrs — so the announcement cannot be authored from the consumer at all.** Hosts' own labels sit on name-prohibited generics. ≡ W7.54 (AF-9's call-site count) and W7.243 (SP-16).

**W7.405 · ⟨PaletteCardSkeleton.md · PCS-8⟩ — MAJOR: glass-ui ships, BY NAME, the ghost of the exact species being ghosted** (cl.2). `WatercolorDot variant="ghost"` (d.ts `:30/:43`); the component hand-rolls a grey square whose radius it cannot control, so loading→loaded morphs a hard 4 px square into an organic seeded blob. **Owner edict 4 binds: the ghost of a WatercolorDot is a ghost WatercolorDot, or the shell decides otherwise explicitly.** ≡ W7.245 (SP-19). → X.W7.c under X-W10 law.

**W7.406 · ⟨PaletteCardSkeleton.md · PCS-13⟩ — MINOR: 48 concurrent infinite `will-change: transform` compositor animations for one wait (72 with load-more)** (cl.3). Count structural (4 × (2·count+2)); **the cap was placed on plates, not blocks-per-plate — `BrowsePane.vue:204-207`'s own comment reasons the budget and caps the wrong dimension.** The compositor bill is U-4 (MEASURE-AT-OPEN). → X.W7.g G20: the mass cut is the cure's chassis.

**W7.407 · ⟨PaletteCardSkeleton.md · PCS-14⟩ — MINOR: `count` is an unvalidated number driving TWO geometries with opposite scaling laws** (cl.1). A partition denominator in the strip (cells shrink) and a list length in the swatch row (rows grow), guarded only by a slider in another file. **C-6's Vue `renderList` analysis (no RangeError at `Infinity`) is verified — the coupling, not the crash, is the defect.** ≡ W7.253 (SP-29).

**W7.408 · ⟨PaletteCardSkeleton.md · PCS-16⟩ — MINOR: the scoped block overrides two producer motion tokens that exist nowhere** (cl.1). 0 dist hits, 0 demo hits outside this file, framed as "the published seams" — **were they live it would be the edict-5 per-instance override.** Dies with PCS-1 (W7.28). Witness for gate N-12.

**W7.409 · ⟨PaletteCardSkeleton.md · PCS-17⟩ — MINOR: the handoff materialises a whole ELEMENT of the depth grammar, not merely a heavier token** (cl.1). `PaletteCard` ships `<span class="cartoon-cast" aria-hidden="true">` as a required child of `cartoon-surface` (`:28-30`); the ghost has no such child and hand-rolls `border` + `shadow-cartoon-sm`. **All three axes compared tokens only.** → X.W7.c; PC-15's G11 owns the shell's depth grammar.

**W7.410 · ⟨PaletteCardSkeleton.md · PCS-19⟩ — MINOR (RESCOPED): the loading register has no slow arm, no stalled arm, and no designed route to failure** (cl.1). Extract's error line is a bare div vs Browse's `EmptyState variant="error"` — all source-certain. **The two dramatic state rows ("ghosted 4 s after decode", "never renders under a 517 ms block") are UNSUBSTANTIATED AS FILED — the cited ledger lines hold unrelated content. Carry the correction; do not cure against them.** ≡ W7.109/N-9 (the failure register has no home).

**W7.411 · ⟨PaletteCardSkeleton.md · PCS-20⟩ — INFO: the file's prose asserts, in the present indicative, behaviour that has never executed** (cl.1). The sharpest false sentence is the one no axis quoted (`:97-98`): "The breath animation lives on each block, so its register needs no producer seam" — **the only sentence claiming the dead register is SELF-sufficient, defeating even the check the other prose invites.** Comment truth-repair rides the G20 cut.

### §R1.14 — ⟨wb-extract-workbench.md⟩ — 13 rows (W7.412–W7.424)

*Band context: `ExtractWorkbench.vue | modify-carve` is X-W7's ONLY extract byte-surface (§1a C-10, W7.121);
everything the rows below reach beyond it is `[BD-B1]`. G20 deletes the `:163-166` caption under every option.*

**W7.412 · ⟨wb-extract-workbench.md · XW-5⟩ — MAJOR: "the card's first swatch IS the dominant specimen" is false on population ties, and nothing binds the readout to its referent** (cl.1). `:113-117`; the palette arrives population-sorted (`src/quantize.ts:128`) so `useExtractSession.ts:133`'s `>` branch is dead and only the chroma tiebreak (`:134-136`) is live. **The comparator divergence is the row; `src/` is out of bounds (§EXCLUDED, CE-8) — the cure is consumer-side binding, not a quantizer change.**

**W7.413 · ⟨wb-extract-workbench.md · XW-6⟩ — MAJOR: the strip and its own headline number disagree by construction on nearly every real image** (cl.1). `PaletteColorStrip`'s 8%-floor renormalisation vs the true-share numeral one line above. **The defensible strip floor is documented; the co-seated contradiction and the session comment (`:78-80`) are not.** ≡ W7.27 / W7.272 / W7.377 — the WEIGHT_FLOOR identity, fourth witness.

**W7.414 · ⟨wb-extract-workbench.md · XW-7⟩ — MAJOR: the dominant readout is a 54–58-char unrounded float clipped to ~30% desktop / ~17% mobile, and the `title` escape hatch is the identical string** (cl.1). `useExtractSession.ts:54` serializes with no presentation rounding; `:134-141` pre-excuses it ("never a lying readout"). **≡ W7.98 (G16's root emitter) — this is G16's most severe consumer, and it is in the carve.**

**W7.415 · ⟨wb-extract-workbench.md · XW-12⟩ — MAJOR: the result plate is an operable ornament** (cl.1). Unconditional `cursor-pointer`, `role="article"`, press choreography, `@click="() => {}"` (`:152`), `editable-name` against the canon's card law (§5: "no inline rename in the card body"). **→ X-W7 explicitly owned: the props-only `PaletteSpecimen` (X.W7 item 4) is the cure surface.** ≡ W7.199 (PC-34), W7.181 (PC-12).

**W7.416 · ⟨wb-extract-workbench.md · XW-13⟩ — MAJOR: one predicate drives two facts, deleting click-to-replace and killing the announce chip in all three registers** (cl.1). `:preview` and `:disable-click` bound to the same value (`:22-23`) make the `'Replace image…'` aria-label branch and the `'replace'` chip text unreachable (`ImageDropZone.vue:20/:61`); the chip that remains is `aria-hidden`. `ImageDropZone.vue` is `[BD-B1]`; the binding is in the carve.

**W7.417 · ⟨wb-extract-workbench.md · XW-15⟩ — MAJOR: the empty arm breaks the NORMATIVE card-lock — dragging k 5→16 moves the pane rect (+128 px height, −64 px y)** (cl.1). ShadowPalette renders live-k swatches in `flex-wrap` with no fixed-row reserve; **the developed arm is clean (img-k1/k5/k16 identical).** → X-W7 explicitly owned: G20 cuts the plate's mass and gates it at max k. ≡ W7.234 (SP-3).

**W7.418 · ⟨wb-extract-workbench.md · XW-16⟩ — MAJOR (one numeral, two violations): the derived stat renders at byte-identical size/family to the pane's identity** (cl.1). 41.888 px Fraunces, thrice-measured, in a closed type matrix that assigns `text-display` to "route H1 or major argument"; and it declares no `tabular-nums` and reserves no width where `DESIGN.md:60-75` requires **both**. **The tabular-only cure stays insufficient — carry that.** ≡ W7.337 (PM-20). → X-W7.f + X-W10 canon.

**W7.419 · ⟨wb-extract-workbench.md · XW-17⟩ — MAJOR: the forged `Palette` is a cycle** (cl.1). `palettes` parses `"__extracted__"` back out (`utils.ts:20-30`) and drives nine `PaletteCardMenu` branches on it. **Corrections folded (K-13/K-14): only extract has ever minted an outside id — the registry's `gen-`/`mix-` thirds were written speculatively and have always been dead.** Couples to W7.190 (PC-22's per-host capability gating).

**W7.420 · ⟨wb-extract-workbench.md · XW-23⟩ — MAJOR: the undeveloped ghost occupies 95.3–97.0% of the stage against canon demanding a contextual, collapsing empty** (cl.2). It renders beside Palettes' dashed dot-trio empty in one frame — two empty grammars as peers. **The delete-the-species cure stays KILLED (K-8: two owner rulings, R12 + R7, in the file's own header). Magnitude is a RANGE, not a decimal.** ≡ W7.234/W7.235.

**W7.421 · ⟨wb-extract-workbench.md · XW-27⟩ — MINOR: the leaf composable imports a foreign feature's store singleton instead of injecting the named port** (cl.1). **Behavioural half KILLED (K-11 — `libraryPort.createPalette` IS the store's function); the module-graph fact stands.** Rider: the specimen split re-draws this edge anyway. ≡ W7.379 (PP-21's domain split).

**W7.422 · ⟨wb-extract-workbench.md · XW-28⟩ — MINOR: the subtree's `inject(CSS_COLOR_KEY, undefined)` is the codebase's only defaulted inject of that key** (cl.1). The `?? ''` mask (`:69/:149`) silently degrades the certified track ink to `var(--ink-muted)` instead of failing loud. **→ X-W7 addendum: one binding in the carve; the 8-vs-1 house-contract question follows the ColorSpaceSelector L-5(b) precedent.** ≡ W7.349 (EC-28), W7.69.

**W7.423 · ⟨wb-extract-workbench.md · XW-32⟩ — MINOR: the colocation/per-instance family, consolidated and grep-verified** (cl.1). (a) `.plate-ink` ×5 — **IDENTITY = XP-19 → X-W10** (≡ §1a C-11, EB-20's two quantities); (b) the `uppercase tracking-[0.18em]` eyebrow override ×4 — **X-W7, pre-owned at `W7.md:523-527`** (framing corrected, K-22); (c) `--btn-hover-color` ×3, the only sites in demo — one declaration on the row (owner edict 5) ≡ W7.355 (EC-45); (d) dead scoped rules ≡ W7.348 (EC-26).

**W7.424 · ⟨wb-extract-workbench.md · XW-33⟩ — MINOR: the redundancy/idiom family** (cl.1). D-16 three renderings of one palette in ~320 px (k-rail gradient + strip + swatches, plus the duplicated cardinality token); D-18 two accent families ~140° apart in one card (static `border-primary` zone edge vs the live certified `useSafeAccentFn` rail, probe-pinned oklab); D-27 two template-ref idioms on adjacent lines (`:222-223`). ≡ W7.263 (PCS-10's five-strip census) on the first limb.

### §R1.15 — ⟨AdminAuditPanel.md⟩ — 10 rows (W7.425–W7.434)

*Band context: X.W7.d's audit surface. `AdminAuditPanel.vue` is in §4; `useAdminAudit.ts`, `dateFormat.ts`,
`demo/platform/transport/` and `types.ts` are `[BD-B2]`. W7.59/W7.66/W7.70/W7.83/W7.102/W7.104 already carry
AAP-1/AAP-4/AAP-5/AAP-6/AAP-15/AAP-20/AAP-25.*

**W7.425 · ⟨AdminAuditPanel.md · AAP-2⟩ — the state chain does not own its terminal surfaces** (cl.1). `:36 v-if` → `:42 v-else-if` → `:56 v-else-if` and the chain ENDS; the `v-for` (`:59`), PaginationBar (`:83-90`) and the toolbar count (`:26-28`) are siblings — **so skeletons and the error plate paint ON TOP of retained rows, and the pager and count keep asserting the old page.** Source-decidable + probe-corroborated. ≡ W7.81 (ATP-11's branch ordering) ≡ W7.24 (AF-4's error-plate-over-live-rows).

**W7.426 · ⟨AdminAuditPanel.md · AAP-8⟩ — two identical pills, two different server laws, and the range the wire already speaks is unreachable** (cl.1). Action = exact match over a closed 16-verb vocabulary the UI never reveals; Target = case-insensitive substring; byte-identical chrome (`:7-22`); labels exist only as placeholder + `aria-label`. ≡ W7.62 (Δ-7's search theatre) and W7.216 (SFB-16's dead wire params).

**W7.427 · ⟨AdminAuditPanel.md · AAP-9⟩ — the empty spacer starves the declared-elastic field** (cl.1). `:21 flex-1 min-w-[6rem]` (Target, "the wide one") vs `:23 <div class="flex-1" />` — two `flex: 1 1 0%` claimants, one empty; **under `flex-wrap` (`:4`) the void holds line 1 and strands the count + Refresh cluster flush-left on line 2.** Mechanism source-certain; the width table is live-only (MEASURE-AT-OPEN).

**W7.428 · ⟨AdminAuditPanel.md · AAP-11⟩ — NO-WAVE-OWNER: no request sequencing anywhere on the surface** (cl.1). No AbortController/token/in-flight guard (`:48-71`); `finally` clears `loading` on FIRST settle; four overlapping entry points (onMounted, debounce, un-disabled Refresh, pager); probe C-7 shows a stale page-2 response overwriting page 3. **Last-writer-wins on an AUDIT record presents the wrong 20 rows under the right page number.** ≡ W7.73 (NO REQUEST IDENTITY) — sixth witness; the composable is `[BD-B2]`, which is why the record books it NWO.

**W7.429 · ⟨AdminAuditPanel.md · AAP-14⟩ — four painted edges per row against a boundary budget of one separator between adjacent rows, none terminal** (cl.1). `:62` `rounded-md border border-card-edge` on every row including the last: 20 rows = 80 segments vs a budget of 19; canon triple-cited verbatim by both readers. **Row anatomy → X-W7; boundary law → X-W10.** ≡ W7.308 (D-9).

**W7.430 · ⟨AdminAuditPanel.md · AAP-23⟩ — NO-WAVE-OWNER: the timestamp drops year/timezone, `2-digit` hour defeats `tabular-nums`, and the try/catch is dead code with "Invalid Date" reaching the DOM** (cl.2). `toLocaleString` returns the string for NaN dates (probe C-4: `"1 entryx.yInvalid Datet"`); `formatDate` repeats the dead pattern. **≡ W7.15 (AF-31 ≡ VHD-16) — ECMA-402: the `catch` is a DELETE row, not a ruling (S-7). An audit trail is a legal artifact of *when*.** `dateFormat.ts` is `[BD-B2]`.

**W7.431 · ⟨AdminAuditPanel.md · AAP-24⟩ — a hover promise with no affordance behind it, on a row no keyboard user can reach** (cl.1). `:59-63` — the sole unpaired `hover:bg-accent/50` in the tree. **Resolves WITH AAP-4: either the row gains the canon-mandated disclosure (becoming a real focusable control) or the hover dies.** ≡ W7.295 (TEP-21), W7.63 (Δ-10's nested-interactive rows).

**W7.432 · ⟨AdminAuditPanel.md · AAP-29⟩ — DEMOTED to MINOR: one neutral plate for 16 verbs including `delete-user`/`impersonate`, while the producer's `tone` axis sits unused** (cl.1). An information-design arm of the anatomy rework, not a standalone falsehood. **Folds into AAP-4.** *Sharpens*: G15 — destructive verbs render in the same register as reads.

**W7.433 · ⟨AdminAuditPanel.md · AAP-30⟩ — the only visible field identification is the placeholder, which vanishes at the first keystroke** (cl.1). `aria-label`s are present, **so AT is served and the sighted operator is not** — on two pills whose matching laws differ (AAP-8). **Folds into AAP-8.** ≡ W7.383 (PP-28).

**W7.434 · ⟨AdminAuditPanel.md · AAP-31⟩ — NO-WAVE-OWNER: the paginated-resource block is duplicated line-for-line between `useAdminAudit` and `useAdminFlagged`** (cl.1). `:37-38/:44-46/:73-85` vs `:50-51/:55-57/:105-118`; `useFilteredList.ts` is the in-directory extraction precedent. **≡ W7.74 (AF-39) — same identity, and AF-39's SEQUENCING edict (after the M-L extraction, W7.321) governs both.** Carried into the ledger here so it finally has an id. `[BD-B2]`

### §R1.16 — ⟨FlagReportDialog.md⟩ — 10 rows (W7.435–W7.444)

*Band context: `FlagReportDialog.vue` is NOT in §4 (`[BD-B6]`); `BrowsePane.vue` — its host and the site of
the unconditional close — IS. W7.9 carries §Correction 2 (strictTemplates is wave-owned), W7.22 carries A-3.
Namespace: ⟨FlagReportDialog.md · A-n⟩ ≠ ⟨MigratePalettesDialog.md · A-n⟩ ≠ ⟨PaletteSlugBar.md · A-n⟩.*

**W7.435 · ⟨FlagReportDialog.md · A-4⟩ — unbounded `paletteName` interpolation destroys the dialog at the API-legal 100-char max** (cl.1). `:10-12`, no break/clamp anywhere in the file or demo styles; `schema.ts:25` sets the max. `DialogContent` is a producer CSS grid (`grid w-full max-w-lg gap-4`) whose items default `min-width:auto`, **so one unbreakable token blows the track — and the page-level overflow oracle is blind because the overflow is inside a dialog.** ≡ W7.328/W7.369 — the crushable-member law, third surface.

**W7.436 · ⟨FlagReportDialog.md · A-5⟩ — `submitting` + `Loader2` are unreachable by construction, and the `finally` erases the form before the parent's request resolves** (cl.2). No `await`; the emit is synchronous; `finally` clears in the same tick (measured false at 24 samples/2.5 s and at 4 phases). **The real in-flight appearance is a form deleting itself.** ≡ W7.208 (SFB-7 ≡ MCP-13) — the pending-state-is-fiction identity, third witness.

**W7.437 · ⟨FlagReportDialog.md · A-6⟩ — the disabled Report button is REMOVED from the keyboard tab order** (cl.1). `:disabled="!reason || submitting"` (`:43`) renders native `disabled`, which is unfocusable; no explanation surface anywhere. **Arbiter-ratified with a correction, and the corpus's own evidence contains the defect scored as a PASS — C's negative result #4 records the tab cycle without the control and reads it as clean.** *Sharpens*: G14 — a confirm seat that cannot be reached is not a confirm.

**W7.438 · ⟨FlagReportDialog.md · A-7⟩ — adjacent radio hit targets overlap 13.05 px ×3, and the mechanism is INVERTED from the axis's telling** (cl.2). The producer ships the compensating geometry (44 px seat, 18 px face, −13 px offset, **gap 26 px = seat − face so seats tile exactly**); the consumer's `class="flex flex-col gap-2"` (`:16`, utilities layer beats components layer) collapses it to 8 px. **Cure lock: restore the producer gap — do NOT re-offset the faces.**

**W7.439 · ⟨FlagReportDialog.md · A-8⟩ — the radio group has no accessible name and `required` is unannounced** (cl.1). `:16` bare, while `RadioGroupProps` carries `name`/`required`/`invalid`, all unused; the question is wired to the dialog (`aria-describedby` via reka), not the group. **Disposition at the record: X-W7 rider else boundary** — recorded with that conditional intact.

**W7.440 · ⟨FlagReportDialog.md · A-9⟩ — the textarea has no accessible name at all** (cl.1). `:29-34` = v-model/placeholder/class/maxlength and nothing else; all four labels target radios, so the name falls to the placeholder, which evaporates on input. Statically decidable. **X-W7 rider else boundary.** ≡ W7.433 / W7.383 — the placeholder-as-label family.

**W7.441 · ⟨FlagReportDialog.md · A-10⟩ — a hand-rolled `<textarea>` — the sole raw textarea in demo — where glass-ui ships a full `Textarea` via `/forms`** (cl.2). The carried T-census row D4 ("2W") is still unexecuted two tranches on. **Severity nuance ratified: the sibling row D3 rules the identical `bg-background` on ColorInput "a form-field, not a plate — acceptable".** ⚠ `/forms` is the subpath X-EXT-2 renames at glass 8.0.0 (→ X-W8) — **the adoption and the rename are an ordered pair, stated (§R1.34).**

**W7.442 · ⟨FlagReportDialog.md · A-11⟩ — below 640 px the composition forks three ways with zero decisions** (cl.1). Centred header over a left body (`text-center sm:text-left`); Report paints **above** Cancel (`flex-col-reverse`); the two buttons stack **flush at 0 px** (`sm:gap-x-2` — the gap exists only where they do not stack). **The only responsive statement in 101 lines is `sm:max-w-md` (`:3`).** All producer defaults, read verbatim.

**W7.443 · ⟨FlagReportDialog.md · A-13⟩ — `FLAG_REASONS` has two homes and the type is widened to bare `string` at every seam** (cl.1). api `model.ts:25-26` `as const` + z.enum at the wire vs the component's plain array (`:79-84`); widened at `:76`, `BrowsePane:296`, `types.ts`, `api/palettes.ts`; `maxlength="500"` is a third hand-copy of `schema.ts:72`. **A typo typechecks green and 400s at runtime — where A-3 reports it as success (W7.22).** ≡ W7.217 (SFB-20) — one enum-laundering law; witness for gate N-8's family.

**W7.444 · ⟨FlagReportDialog.md · A-18⟩ — the single load-bearing question is triply demoted** (cl.1). Not the group's name (A-8), producer-defaulted below the closed type matrix (`text-sm`), **and painted in the muted colour role** (`text-muted-foreground`) while its answers are `text-small` at full ink; the sibling cures size only (`text-small font-display`, Migrate `:8`), **so copying the sibling leaves the ink half standing.** Under X-W10's type canon (W7.110).

### §R1.17 — ⟨MiniColorPicker.md⟩ — 10 rows (W7.445–W7.454)

*Band context: W7.11 books the whole record "X-W7 rider else NO-WAVE-OWNER (the ApiOfflineChip precedent)"
and records that `browser/search/MiniColorPicker.vue` is absent from §4 — the entire band is `[BD-B4]`.
K-11 and MCP-13 are the two binding cure-caveats already carried there; MCP-44 is the DESIGN.md
deletion-carry. These 10 are the identities that ride them.*

**W7.445 · ⟨MiniColorPicker.md · MCP-2⟩ — BLOCKER: the hex wire + the parent's echo destroys hue AND saturation irreversibly on an ordinary drag** (cl.1). Unquantised floats (`:138-139`) → 8-bit round (`:103`) → emit (`:107`) → parent echo (`SearchFilterBar:175-178`, `:68`) → self-rewrite from the damaged hex (`:110-125`). **Hue latches at fabricated values; saturation collapses to 0 on any grey echo because `:117-118` write BEFORE the `d === 0` guard at `:119`.** The round-trip, not the picker, is the defect. `[BD-B4]`

**W7.446 · ⟨MiniColorPicker.md · MCP-3⟩ — BLOCKER: an interrupted drag sticks forever, then bare hover mutates the colour** (cl.2). No `@pointercancel`, no `@lostpointercapture`, no `onUnmounted`; capture taken (`:129/:144`) and never released; the flags are non-reactive setup-scope `let` (`:79-80`) cleared only by element-bound `@pointerup` (`:133/:148`); the instance root `<Popover>` (`:2`) outlives `PopoverContent`, and **the producer popover has no `forceMount`** — so the unmount path cannot be patched from the consumer. Witness for new gate **N-10**. `[BD-B4]`

**W7.447 · ⟨MiniColorPicker.md · MCP-7⟩ — MAJOR: mount-time self-write clobber** (cl.1). The immediate prop watcher normalises the seed (sat 0.6→0.6667), `currentHex` moves #528fcc→#4488cc, exactly one pre-flush emit fires, and the parent unconditionally writes the picker's value into the user's text field (`SearchFilterBar:175-178`) — **so the child owns `colorText`, at mount AND on every pointer sample; every Filters-tray open silently rewrites the user's query.** ≡ W7.214 (SFB-13). Rides W7.3's keep-and-widen lock.

**W7.448 · ⟨MiniColorPicker.md · MCP-25⟩ — MINOR: clear-all leaves the colour instrument stale** (cl.1). `onClearAll` (`:227-232`) resets `colorSearchActive` and `colorText` but never `pickerHex`; the empty string cannot reach the child (guard `:111`), **so the trigger swatch keeps painting AND announcing the retired filter colour while the badge reports no active colour filter.** ≡ W7.215 (SFB-14) — the clear path's second half.

**W7.449 · ⟨MiniColorPicker.md · MCP-39⟩ — NO-WAVE-OWNER + MAJOR: C-8's prescribed cure is NOT EXECUTABLE at HEAD** (cl.2). `vitest.config.ts` carries **no `plugins` key** (and pre-empts `vite.config`, so `@vitejs/plugin-vue` never reaches the test transform); `@vue/test-utils@^2.4.10` is a paid-for dependency with **zero call sites**; every `mount()` in the repo lives under megatranche audit scratch. **≡ gate N-1 (THE MOUNT SUBSTRATE DOES NOT EXIST) — third independent witness, and the one that names the config key. N-1's GREEN clause is unchanged; its witness list gains this record.**

**W7.450 · ⟨MiniColorPicker.md · MCP-40⟩ — MAJOR: two controls named Search in one 218 px surface, two build systems, and the rung both hand-forge already ships** (cl.1). The child puts a dead `h-6` on a producer Button shipping at the 36 px `sm` rung (`:47-54`); the parent abandons Button for a raw `<button class="… h-6 …">` (`:97-104`) owning the fictional spinner (MCP-13) — **while `ButtonSize` includes `"xs"` and `--control-*` already expresses the rung.** ≡ W7.209 (SFB-8), W7.100 (MC-3): the dead-height family, third site.

**W7.451 · ⟨MiniColorPicker.md · MCP-41⟩ — MINOR: one visual species, two opposite interactivity contracts, 60 px apart** (cl.1). The dialog trigger (`:75-79`, 28 px) and the inert specimen dot (`:40-43`, 24 px) are the same mark (`rounded-full border-2 border-border shadow-cartoon-sm` + colour fill) — one opens a dialog, the other does nothing **and is not `aria-hidden`.** No axis noticed the identity. ≡ W7.146 (PS-7's affordance inversion).

**W7.452 · ⟨MiniColorPicker.md · MCP-42⟩ — MINOR: a second, independent route into MCP-3's latched state** (cl.2). The flag is set (`:128/:143`) BEFORE the unguarded `setPointerCapture` (`:129/:144`), which throws `NotFoundError` on a stale pointerId — **aborting the handler with the flag latched and NO capture taken, so the prescribed pointercancel/lostpointercapture cure cannot fire for a capture that was never taken.** Cure lock on N-10: guard the capture call, not only the release.

**W7.453 · ⟨MiniColorPicker.md · MCP-43⟩ — MINOR: wrong error at the wrong altitude** (cl.1). `hexToOklab` (`:205-211`) guards OKLab `"none"` channels — unreachable for every input its two callers can produce (OKLab is rectangular; the `:218` gate admits only 6-hex) — **while the REACHABLE failure (`PickerColorError` on an unparseable string) is unhandled at BOTH call sites.** ≡ W7.15's law: a guard that cannot fire is a DELETE row; the real path needs the catch. Couples to CE-8 (the parser seam is X-W9's).

**W7.454 · ⟨MiniColorPicker.md · MCP-46⟩ — INFO: neither hand-rolled `<button>` in the call site declares `type`, so both default `submit`** (cl.1). `:75-79/:97-104`; latent (no ancestor form on the Browse route), **detonates the first time the filter row is embedded in a form** — and the producer exposes `type` on `ButtonProps` precisely so this is declarable. Rides the SFB-11 migration caveat (W7.212).

### §R1.18 — ⟨SwatchHoverMenu.md⟩ — 10 rows (W7.455–W7.464)

*Band context: W7.33–W7.37 carry SH-1/2/3, SH-10..SH-13, SH-15(a), SH-16, SH-24, SH-27 and the CC-044
subtraction lock (no pre-8 wrapper; CE-2). The file is `[BD-B5]`. These 10 complete the record.*

**W7.455 · ⟨SwatchHoverMenu.md · SH-4⟩ — CONFIRMED: `aria-hidden="true"` over three natively-focusable, labelled `<button>`s** (cl.1). `:45`; the buttons at `CurrentPaletteEditor:46/:49/:52` and `PaletteCardSwatches:41/:49/:56` carry no `tabindex`, no `disabled`, no `inert` — axe `aria-hidden-focus`, WCAG 4.1.2. **IDENTITY ≡ W7.142 (PS-3) ≡ ⟨CurrentPaletteEditor.md · C-6⟩.** The `:38-39` comment's stated mitigation names the route SH-2/PS-2 prove dead.

**W7.456 · ⟨SwatchHoverMenu.md · SH-5⟩ — CONFIRMED: two parallel implementations of one affordance branched on `canHover`, with the two consumers already drifted** (cl.2). `:8-25` vs `:28-52`; `PaletteCardSwatches:31` spreads `translateX(-50%)` while `CurrentPaletteEditor:35` passes the bare reactive, both fed `left = rect.left + rect.width/2`. **IDENTITY ≡ W7.154 (PS-15, the fork) ≡ W7.155 (PS-17, the centring drift) ≡ W7.170 (PS-38, the five-file seam) — one identity, four bookings, folded once here.**

**W7.457 · ⟨SwatchHoverMenu.md · SH-6⟩ — CONFIRMED and STRONGER THAN FILED: `@keyframes floating-panel-in` was DELETED at `c84504d3`, not moved or tokenized** (cl.2). And so were the dialog family (4 blocks + media dups), `card-menu-in` and `golden-shimmer`; the installed producer ships **46** keyframes, none of them these. **Owner edict 6 (animations are moved or tokenized, never removed) is breached at the producer boundary — this is a BH-relay INFORM with a `git show` receipt, and the consumer half dies with the SH-3 subtraction.** ≡ W7.33's "`.floating-panel` matches zero CSS rules" — this row supplies the *why*.

**W7.458 · ⟨SwatchHoverMenu.md · SH-14⟩ — CONFIRMED (new; mechanism static-certain, magnitudes live-only)** (cl.3). A block wrapper (`div.relative`, `:2-3`) hosting the producer's inline-block span builds a line box and **reserves baseline descender space under every swatch**; the span is the only in-flow child (the overlay slot is absolute, the Teleport leaves flow). PROPORTION-AUDIT §5.7's reservation-vs-glyph distinction applies. Magnitudes (48×54 / 40×…) are MEASURE-AT-OPEN — add to §MEASURE-AT-OPEN item 6's session.

**W7.459 · ⟨SwatchHoverMenu.md · SH-17⟩ — CONFIRMED, folds onto SH-1's cure constraints** (cl.2). Positioned once at hover; no scroll/resize/ResizeObserver/autoUpdate in the 67-line file; `-42` is measured against the swatch top, not panel height, with no flex-wrap; no collision handling — **all producer-solved on the branch 20 lines above.** **Standing law preserved verbatim: never restore `position: fixed` assuming a static viewport.** ≡ W7.163 (PS-26) ≡ ⟨CurrentPaletteEditor.md · U-8⟩.

**W7.460 · ⟨SwatchHoverMenu.md · SH-18⟩ — CONFIRMED (MINOR-latent; the corpus's own honest downgrades ratified)** (cl.1). `nextTick(() => positionPanel(e.currentTarget as Element))` (`useHoverPopover.ts:30`) reads `currentTarget` after dispatch — **crashes under programmatic dispatch (all three axes reproduced), survives trusted hovers (all three re-tested and downgraded; L declined to file, naming its own probe noise).** The `as Element` cast is what suppresses the type-level signal. Carry the downgrade with the row.

**W7.461 · ⟨SwatchHoverMenu.md · SH-19⟩ — CONFIRMED, IDENTITY ≡ PS-22** (cl.1). One position object, three type spellings across one hop, no owning module — **the door the SH-5 transform drift walked through.** Terminal: X-W7.c. `≡`-pointer to W7.159.

**W7.462 · ⟨SwatchHoverMenu.md · SH-20⟩ — CONFIRMED (new): the file sits outside `card/index.ts`'s hardened public surface yet is reached relatively from two depths** (cl.1). 6 exports, not this one; `CurrentPaletteEditor:192` `./`, `PaletteCardSwatches:73` `../` climbing out of the `PaletteCard/` sub-cluster — **neither cluster-internal nor cluster-public.** Terminal: X-W7.c (the rebuild homes it or deletes it). ≡ W7.379 (PP-21) — the domain-split identity.

**W7.463 · ⟨SwatchHoverMenu.md · SH-25⟩ — CONFIRMED: `class="w-auto"` deletes the producer's `w-72` and `:side-offset="8"` overrides the default 4** (cl.1). Per-instance layout re-specification on a producer root (edict 5), correctly filed soft after D-6's flattening half died (K-1). **Terminal: X-W7.c — the producer owns the surface; a denser action row is a producer VARIANT, not a consumer override.** ≡ W7.287 (TEP-12's `p-0`).

**W7.464 · ⟨SwatchHoverMenu.md · SH-26⟩ — PROMOTED (new): the `:38-39` comment says "the **reka-ui** Popover (touch path)" but `:61` imports the **glass** Popover wrapper** (cl.1). **The mis-attribution propagated into all three challenge axes' wrong-producer analysis (ruling R-G) — this is why W7.39's K-3 rider (isolation is the demo's own `@click.stop`, NOT reka) is load-bearing.** Terminal: X-W7.c — a one-line comment correction rider, or death with the file.

### §R1.19 — ⟨VersionHistoryDrawer.md⟩ — 10 rows (W7.465–W7.474)

*Band context: `VersionHistoryDrawer.vue` is held by **X-W4** (`W4.md:127`) while `useVersionHistory.ts` IS in
X-W7's §4 — the record's rows split across that seam and the split is stated per row. W7.15/W7.57/W7.73/
W7.75/W7.76/W7.77/W7.78/W7.94 carry VHD-1/3/4/6/8/9/10/11/13/16/21/27/35.*

**W7.465 · ⟨VersionHistoryDrawer.md · VHD-2⟩ — the sole action is `opacity-0` at rest, revealed only inside `@media (hover: hover)`, focus-invisible, and still tab-reachable and tap-hittable** (cl.1). Compiled-CSS proof: the served `styles/components.css` contains exactly one `hover:hover` occurrence, the `group-hover:opacity` rule. **Its invisible 44 px band also gives 23 of 24 rows a second rhythm.** **≡ W7.90 (ATP-2) — the invisible-hover-gated-control identity; S-14(b)'s visibility clause reaches this seat too.**

**W7.466 · ⟨VersionHistoryDrawer.md · VHD-7⟩ — loading, error, empty and never-fetched all render one identical blank while the subtitle asserts "0 versions" as fact** (cl.1). `useVersionHistory.ts:56-62` swallows transport failure to `undefined`; `:141` `if (!page) return` inside `try/finally` leaves the exact success-shape-for-empty; `:11` publishes the count before it is known; **no live region anywhere.** ≡ W7.61 + W7.83 — the two lying-plate families meeting on one subtitle. `useVersionHistory.ts` IS in bounds.

**W7.467 · ⟨VersionHistoryDrawer.md · VHD-17⟩ — the panel's entire type is set outside VISUAL-CONSTITUTION §4's closed matrix, and both interactive controls render in the italic caption face** (cl.1). §4 lists seven roles and `:78` closes the matrix; `text-micro` (`--type-micro: 0.6875rem`, registered but not a §4 role) carries ordinal/timestamp/identity/chip/provenance. **Cure under X-W10 law (W7.110's family), executed at the X-W4-held file — cross-edge stated.**

**W7.468 · ⟨VersionHistoryDrawer.md · VHD-23⟩ — under forced colors the colour payload dies to identical black circles and the current-row delta measures zero on every surface property** (cl.1). The literal `(current)` text is the sole survivor; inline `background-color` with no `forced-color-adjust: none` — **the textbook sanctioned exception for a colour specimen** — while `ring-2` is a strippable box-shadow. ≡ W7.239 (SP-8) ≡ W7.137 (PS-3/PreviewStrip) — one forced-colors roster law, three surfaces, and `foundation.css` is `[BD-B6]`.

**W7.469 · ⟨VersionHistoryDrawer.md · VHD-29⟩ — a leaf presentational drawer imports the composition root to obtain one Symbol** (cl.1). `usePalettePorts.ts` (275 lines, provider `:244`); the 32-member `browsePort` contradicts the file's own FIVE-narrow-ports charter (`:20-31`). **The 36-module / 4.5× payload framing is STRUCK — `BrowsePane` statically imports both the drawer and the same module, so there is no payload delta. Carry the strike.** ≡ W7.285 (TEP-8), W7.87 (Δ-15's key homing).

**W7.470 · ⟨VersionHistoryDrawer.md · VHD-31⟩ — `useDialogBrowseActions.onRevert` + its `modalStack` dep are dead** (cl.1). An unreachable branch guarding a dep no caller supplies, citing a migration source that no longer exists (`:38`, `:76-77`; BrowsePane destructures neither). **BUILD → X.W7.d: deleted in the mutation-ownership consolidation; pure subtraction.** ≡ W7.87 (Δ-18: the deletion is the proof).

**W7.471 · ⟨VersionHistoryDrawer.md · VHD-32⟩ — the file is named `…Drawer` but renders a placed `Dialog`, while glass-ui ships a real `./drawer` family under that name** (cl.1). `:2-3`; the producer exports map confirms. **FOLD → X.W7.d: the recomposition names the surface truthfully — or adopts the actual Drawer primitive — as a side effect.** Cross-edge: the file is X-W4's byte-surface.

**W7.472 · ⟨VersionHistoryDrawer.md · VHD-38⟩ — the in-flight indicator renders at the head of the list, ~2000 px from the Load-older button that triggered it** (cl.1). Template order `:17-22`; **the producer's `loading` prop (which stamps `data-loading` + `aria-busy` + `cursor: progress`) sits unused.** ≡ W7.20 (AF-5's unused `loading?: boolean`) ≡ ⟨PaginationBar.md · D-2⟩ (W7.517). *Sharpens*: G13 — a visible result must be visible at the point of action.

**W7.473 · ⟨VersionHistoryDrawer.md · VHD-41⟩ — the palette name is clamped in the row but unclamped in the description** (cl.1). `:46 truncate` with no `title` vs `:10-12` unclamped, so one long name wraps the subtitle and pushes the whole list down — worst at the 292.5/240 px arms. **One clamp policy for one datum.** ≡ W7.167 / W7.297 / W7.56 — the truncation-recovery family, fifth surface.

**W7.474 · ⟨VersionHistoryDrawer.md · VHD-42⟩ — the row-name comment documents a condition the code does not implement** (cl.1). `<!-- Name (if different from current) -->` over an unconditional render; verified in source and in `shots/01` (header "Sunset Blaze — 45 versions", first row "Sunset Blaze" directly beneath). **FOLD → X.W7.d: implement the condition or correct the comment — a one-line truth repair.** ≡ W7.411 (PCS-20), W7.302 (TEP-29) — the false-comment family.

### §R1.20 — ⟨AdminTagsPanel.md⟩ — 9 rows (W7.475–W7.483)

*Band context: `AdminTagsPanel.vue` is in §4 (X.W7.d/e); `useAdminTags.ts` and the transport are `[BD-B2]`.
W7.18/W7.79/W7.80/W7.81/W7.82/W7.89/W7.90/W7.102/W7.113 already carry ATP-1/2/7/8/9/10/11/12/19/29/36/39/43.*

**W7.475 · ⟨AdminTagsPanel.md · ATP-5⟩ — the tag chip hand-rolls a second implementation of the producer's `Chip mode="removable"`** (cl.2). It copies the `sm` geometry verbatim (`gap-1 … px-2.5 py-1` = `chipVariants` sm byte-for-byte) **while discarding the required accessible name, the always-present remove button (`type="button"`, TypeError-guarded `removeLabel`), the disabled axis and the coarse-pointer seat.** M7 rides as a binding rider at the record. ≡ W7.330 (PM-7) — one primitive, two re-mints; adoption is a size decision (R-3).

**W7.476 · ⟨AdminTagsPanel.md · ATP-6⟩ — the create row's proportion is inverted and it cannot wrap** (cl.1). `:26 flex-1 min-w-0` (the primary field, free to collapse to zero) vs `:34` hard `w-36`; the falsified honesty comment at `:17-19`; **and the one-token difference from the sibling all three axes held up as precedent — `AdminAuditPanel.vue:4` carries `flex-wrap`, `:16` here does not** (M5, the cheapest structural cure). ≡ W7.427 (AAP-9) — the same flex row, opposite failure.

**W7.477 · ⟨AdminTagsPanel.md · ATP-16⟩ — the loading skeleton is not the silhouette of its settled state, and Tags is the only panel inlining its own shape** (cl.1). Zero heading shadows, one flat row of 5 decorative-width pills vs N labelled groups. **The ink-register limb is KILLED (`utils.css` names the tag-chip shadows as a consumer of the ONE register) — carry the kill.** ≡ W7.289 (TEP-15's precedent) ≡ W7.318 (M-DU8) — one skeleton-fidelity law.

**W7.478 · ⟨AdminTagsPanel.md · ATP-28⟩ — NO-WAVE-OWNER: `groupedTags` is published as a writable `Ref` while assigned a readonly computed** (cl.2). `:23` vs `:39`: **a consumer write is a silent no-op in prod — worse than the charged throw — and TS's readonly non-checking keeps it green.** The runtime limb is killed (K-7). One-line honesty fix in an unowned file `[BD-B2]`.

**W7.479 · ⟨AdminTagsPanel.md · ATP-30⟩ — NO-WAVE-OWNER: error derivation re-implemented in `any` per composable, discarding the typed RFC 7807 `ApiProblem` the transport already throws** (cl.1). Counts corrected per K-11: **23 `catch (e: any)` in `demo/palettes`, not 11**; `.detail` — the field authored for display — is read nowhere on this path. **AAP-16 family identity; the class cure is ONE narrowing helper at the transport boundary.** ≡ W7.304 / W7.322. `[BD-B2]`

**W7.480 · ⟨AdminTagsPanel.md · ATP-31⟩ — `ml-0.5` physical margin on the file's one directional idiom; no `ms-`; the parent `gap-1` already separates** (cl.1). Dies with the ATP-1 seat rework (W7.89). ≡ W7.296 (TEP-22), W7.353 (EC-41) — the physical-axis census → X-W10 (W7.104).

**W7.481 · ⟨AdminTagsPanel.md · ATP-33⟩ — NO-WAVE-OWNER remainder + an X-W5 limb: one view identity, seven independent declaration sites, six invisible to the type system** (cl.2). **Disposition carried verbatim and SPLIT, per the work order's §A/§B overlap note: the pane-axis members die at X-W5 (that wave folds the routed limb); the identity-unification remainder is NO-WAVE-OWNER and rides X-W7's packet. Folded ONCE here, both limbs stated — never re-homed silently.**

**W7.482 · ⟨AdminTagsPanel.md · ATP-37⟩ — CONFIRMED: the create row is a form with no form semantics and no keyboard submit** (cl.1). Enter is a no-op in both fields; no `<form>`, no `@submit`, no key handler anywhere in the file, **while the house idiom (`@keydown.enter`) exists at three cited sites.** BUILD → X-W7 (the create seat); **the semantics arm is coordinated with X-W4** — cross-edge stated.

**W7.483 · ⟨AdminTagsPanel.md · ATP-42⟩ — NO-WAVE-OWNER: POST returns a structurally narrower object than GET and the client types both as `Tag`** (cl.1). `{id,name,category}` vs +`createdAt` (service re-read); `types.ts:96-101` makes `createdAt` optional, so the narrow object is appended into the wide list. **Latent — and the one in-class instance originating from the product's own server.** ≡ W7.66 / gate N-8 (DTO parity), third witness. `[BD-B2]`

### §R1.21 — ⟨EmptyState.md⟩ — 9 rows (W7.484–W7.492)

*Band context: X.W7.g's own atom (`EmptyState.vue | modify-carve` in §4) plus the o9 re-ruling (S-20).
W7.51/W7.52/W7.53/W7.83/W7.106–W7.112 carry ES-1..ES-9, ES-11, ES-13, ES-16, ES-19, ES-24, ES-25, ES-27,
ES-28, ES-32, ES-35, ES-36. These 9 complete the record.*

**W7.484 · ⟨EmptyState.md · ES-3⟩ — MAJOR: the failure species exists only as a content REPLACEMENT, so a failed refresh hides retained data at 6 sites / 5 routes** (cl.1). `useAdminTags.ts:53-61` sets `loadError` and leaves `tags.value` untouched (same shape at `useAdminFlagged`/`useAdminAudit`); every panel then orders error-before-data. **Reader-1's demotion from BLOCKER adopted: rows are hidden, not lost — one successful retry restores them. Carry the demotion.** ≡ W7.81 (ATP-11 ≡ C-10 ≡ AF-4) ≡ W7.425 (AAP-2).

**W7.485 · ⟨EmptyState.md · ES-10⟩ — MAJOR: no focus contract — the slot action lives inside the branch its own handler removes** (cl.2). All seven `#action` Retries sit inside their self-removing branches (`BrowsePane:68-77` + the six admin seats); EmptyState exposes no focus target; **the repo owns the correct pattern one directory away.** The focus destination is U-4 (MEASURE-AT-OPEN). ≡ W7.106 (ES-2's homing lock: a cure authored in `EmptyState.vue` cannot reach the BrowsePane half) ≡ W7.378 (PP-15).

**W7.486 · ⟨EmptyState.md · ES-12⟩ — MAJOR: vacuous gate — four named mutations keep the suite green; no unit test; Retry is never pressed; the harness is installed with zero consumers** (cl.1). Hint strings, error strings and `.plate-ink` in `test/`+`e2e/` → 0/0/0; `@vue/test-utils` is a devDep with zero consumers repo-wide; **only o9 references the component at all.** Blast-radius limb narrowed at K-15. ≡ gate N-1 (fourth witness) and CE-7.

**W7.487 · ⟨EmptyState.md · ES-21⟩ — MINOR: `tracking-[0.18em]` is an arbitrary literal at 1.8× the producer's certified caps tracking, and two dead utility classes ride the same two lines** (cl.1). `text-mono-caption` already sets `uppercase` + `--type-tracking-caps: 0.1em` (so `:55`'s `uppercase` is a no-op) and `text-heading` already sets `text-wrap: balance` (so `text-balance` is a no-op). **≡ W7.423 (XW-32(b)) — the eyebrow override ×4, pre-owned at `W7.md:523-527`.** Under X-W10 canon.

**W7.488 · ⟨EmptyState.md · ES-22⟩ — MINOR: `justify-center` is an inert no-op duplicated in both branches; `py-8` and the `w-8/w-11/w-6` trio are fixed sizes in a container-scaled system** (cl.1). VC:33. ≡ W7.226 (SFB-32) — the fixed-literal census → X-W10.

**W7.489 · ⟨EmptyState.md · ES-23⟩ — MINOR: `break-words` guards one of three text rows, and the clipping ancestor exists only in the two grid hosts** (cl.1). `contain: content` at `PaletteCardGrid:51`, so the failure differs by host. **Correctly LATENT: all 16 sites pass literals, and the one row receiving unbounded machine strings IS the guarded one — carry that, or the cure will be authored against a non-defect.** Couples to W7.387 (PG-4).

**W7.490 · ⟨EmptyState.md · ES-26⟩ — MINOR: the component owns no motion contract; the species swap is left to each host, and 7 of 8 importing files hard-cut a ~200 px slab** (cl.1). Census RULED at R-5. **The motion quarantine holds no EmptyState rows — this is carried as a STATE CONTRACT (M-09/M-13 classification), never as a reduced-motion claim** (§EXCLUDED's FALSE rows stay excluded). → X-W7 under X-W10's motion canon.

**W7.491 · ⟨EmptyState.md · ES-33⟩ — MINOR: the `hint` renders help copy in Fira Code, a matrix role reserved for value/code/provenance** (cl.1). `:61` + PA:78. **Scope carried: the eyebrow's mono is separately warranted by the matrix's mono-caption clause, and the error `detail` in Fira is exactly right — only the hint is wrong.** The X.W7.g copy abrogation rewrites these exact strings; canon X-W10.

**W7.492 · ⟨EmptyState.md · ES-34⟩ — INFO: off-idiom props declaration — `withDefaults` against the tree's dominant 3.5 reactive-destructure form** (cl.1). 4 `withDefaults` files vs ~60 `defineProps<` files; **the twin uses the 3.5 form at `ErrorBoundary:43-51`.** Dies in the carve. ≡ W7.171 (PS-39).

### §R1.22 — ⟨shell-dock-dockstatuslamp.md⟩ — 6 rows (W7.493–W7.498)

*Band context: the spine fixes ownership of this record's DEBUG/STATUS packet at **X-W8** (`DockStatusLamp.vue`
+ `status-lamp.ts` sit in W8's delta), but four of its rows route to X-W7 at the record and three more are
NWO §A assignments. Folded here as **cross-edge rows**: X-W7 carries the identities, X-W8 owns the bytes.
Nothing below authorises an X-W7 edit to `demo/shell/dock/**`.*

**W7.493 · ⟨shell-dock-dockstatuslamp.md · DSL-1⟩ — the fork, and the measured double alert** (cl.1). Byte-identical labels (`status-lamp.ts:54,60` = `ApiOfflineChip.vue:17,25`), twin keyframes under two names at the same `2.4s var(--ease-standard) infinite`, near-identical chip CSS (divergences: padding 0.55 vs 0.7 rem, radius-fallback spelling), the matrix derived twice (tested resolver vs untested inline `:36-37`), and a double `role="alert"`. **≡ W7.528 (⟨ApiOfflineChip.md · AP-1⟩) — one identity, two records, two waves: X-W7 holds the chip end, X-W8 the lamp end. CE-5's split law applies.**

**W7.494 · ⟨shell-dock-dockstatuslamp.md · DSL-5⟩ — the contrast family, BLOCKER inflation killed** (cl.2). The base `:60` wash is a 55% film with no opaque backing and no backdrop-filter; `[data-variant="misconfigured"]` `:98-102` REPLACES it with a 12% destructive tint, **so the measured face never composites `:60` — A's kill of D-2's transposition thesis is SUSTAINED.** The substrate is the user-seeded aurora. Carry the kill: a cure computed against `:60` is computed against a face that never ships.

**W7.495 · ⟨shell-dock-dockstatuslamp.md · DSL-7⟩ — three producer primitives hand-rolled** (cl.2). `./chip` `./status-dot` `./pulse` are shipped; `StatusDot.label` exists with the exact JSDoc; the house precedent is `EasingSpecimenStrip.vue:14`; `StatusDot`/`Pulse` demo consumers = 0. **The Pulse limb stays KILLED (no `error` member) and the L-3 cure-snippet TRAP is carried: `label` prop + adjacent text = double announcement.** ≡ W7.330/W7.475 — the hand-rolled-primitive family, third and fourth sites.

**W7.496 · ⟨shell-dock-dockstatuslamp.md · DSL-20⟩ — the orphan interval** (cl.3). Pinned at inline-end vs a centred content-width pill: the gap is arithmetic residue, and the empty salmon span IS the composition at 1440. **Citation kill and collision-as-defect kill both sustained (the quoted law lives at `shell.css:17-18`; C's 12-row negative matrix).** → design input to the AP-9 / X-W7 rebuild and Dock D3-10's seat; magnitudes MEASURE-AT-OPEN.

**W7.497 · ⟨shell-dock-dockstatuslamp.md · DSL-29⟩ — DEMOTED MAJOR→MINOR: modality opt-out** (cl.1). Both arms verified in `foundation.css`; **the `prefers-contrast` limb's discard mechanism dies with AP-1 — the surviving base face's `--card-edge` border TAKES the 55% lift. What survives: the 55% wash is on no reduced-transparency roster.** → X-W7 rider; the producer surface is the roster `[BD-B6]`. ≡ W7.239 (SP-8's roster gap).

**W7.498 · ⟨shell-dock-dockstatuslamp.md · DSL-31⟩ — no degradation path** (cl.1). No `max-width`/`overflow`/`text-overflow`/`min-width` anywhere in the 88-line block; `white-space: nowrap`; the absolute seat reserves nothing; **C's measured 11.5 px clearance at the 1024 boundary is the entire safety margin.** The source-decidable form of D-5's unproven collision. → X-W7 rider (the producer `Chip` owns overflow behaviour); the live threshold stays residue.

### §R1.23 — ⟨CurrentPaletteEditor.md⟩ — 5 rows (W7.499–W7.503)

*Band context: `CurrentPaletteEditor.vue` is NOT in §4 (`[BD-B5]`) while `usePaletteStore.ts` and
`usePaletteActions.ts` ARE. W7.128–W7.131 carry A-2, C4-1, C4-4/L-16, L-8, L-25, ADJ-m4, ADJ-m5, C-9, C-12.*

**W7.499 · ⟨CurrentPaletteEditor.md · D4-01⟩ — the ruling row: arm (a) KILLED as filed; the row RESCOPED BLOCKER→MAJOR** (cl.2). Neither reader read the handler's tail: `usePaletteActions.ts:76` `if (palette.id != null) expandedId.value = palette.id;` (and `:81` for Update), rendered via `PalettesPane.vue:87`. **Carried so the successor does not re-file the killed arm — and because `usePaletteActions.ts` IS in bounds, the surviving arms are curable in-wave.**

**W7.500 · ⟨CurrentPaletteEditor.md · D4-01-as-rescoped⟩ — `≡`-pointer to W7.499, the same identity in its rescoped byte-form** (cl.2). MAJOR (arm (a) killed K-2, arm (b) killed K-1). Survives, all measured: success invisible under an active filter (new palette front-inserted + expanded but filtered out, badge incrementing against an "empty" grid); zero AT announcement in that frame (the status region pre-mounted with byte-identical text); and the commit control unmounting itself while focused (`activeElement: "BODY:"`). **≡ W7.83 (filtered-zero) + W7.378/W7.215 (self-removing actuators). Terminal: X-W7.** *Both byte-forms are cited so the id census closes on either spelling.*

**W7.501 · ⟨CurrentPaletteEditor.md · D4-02⟩ — the contractual 1–50 cardinality has zero representation in the editor** (cl.1). PALETTE-CONTRACT §3, enforced at `reload.ts:191`; bare count (`:18-22`), uncapped add slot (`:95-105`), `:disabled` only at zero (`:138`), and store `updatePalette` validates nothing. **The evidence table is KILLED (K-4); the core stands on corrected numbers (n50 wellH 650.8 = n51; n80 …).** ≡ W7.162 (PS-25) — the arbitrary-N law, editor end; *sharpens*: G10.

**W7.502 · ⟨CurrentPaletteEditor.md · ADJ-M1⟩ — PROMOTED, CONFIRMED: the edit overlay occludes the data it exists to compare against** (cl.1). Neighbour swatches covered **100 / 100 / 39.8 %**, the name field **31.4 %**, under `oklab(… / 0.808)` + `blur(11px) saturate(1.6)`; source cause `:295-311` (absolute top/left 0, −0.375 rem offsets, ~141 px growth over a 58 px pitch). **`grep -in occlu` across all ten corpus files returns this row alone — no axis had the concept.** `[BD-B5]`

**W7.503 · ⟨CurrentPaletteEditor.md · ADJ-m2⟩ — CONFIRMED: no draft-discard exists** (cl.1). `emitApply([])` has exactly one site (`PalettesPane.vue:53`) reached only via the two commit handlers; single-colour removal is C-2-dead or panel-hostile. **Abandoning a draft is not an available action; wholesale silent replacement is.** ≡ W7.373 (PP-7's unconditional `clearCurrent`) — the same asymmetry from the pane end.

### §R1.24 — ⟨UserSortMenu.md⟩ — 4 rows (W7.504–W7.507) · §A NWO band

*Band context: W7.133 carries R-G and the CE-3 CURE COLLISION on `UserSortMenu.vue:8` (X-W8's G-9 null-DELTA
proof vs the record's quiet migration). The file is `[BD-B4]`. All four rows below carry an NWO or an
X-W8-routed limb; the work order assigns the NWO limbs here — folded once, both limbs stated.*

**W7.504 · ⟨UserSortMenu.md · US-2⟩ — CONFIRMED MINOR (latent): the untyped sort seam, four holes on one 3-value seam** (cl.1). `:20`'s gratuitous `(v: any)` discarding the producer's own `SelectionValue` typing (`_shared/selection.d.ts:2`); `:56`'s emit widened to `string`; `useAdminUsers.ts:51`'s unchecked double cast; and three `value=` template literals checked only against themselves. **≡ W7.217 (SFB-20) — one enum-laundering identity. §1a C-5 governs the type's provenance: `SelectionValue` is NOT reachable at the barrel — derive from `SelectProps["modelValue"]`; no BH relay required.** **Disposition verbatim: X-W7.a NAMED-ADOPT — "must adopt this row explicitly or it degrades to NO-WAVE-OWNER at execution" (the PCS-1 precedent). This row IS that explicit adoption.** *Sharpens G3, against the wave's own assumption*: **`strictTemplates` will NOT catch the literal typo** — the attr type is legally `SelectionValue`, so `value="newst"` compiles green, never matches the model and, clicked, degrades the roster to raw server order with no throw (`:36-46` has no default). The cure is the union `export type UserSort` from `useAdminUsers.ts:26`; **the four-layer "registry" cure stays STRUCK (R-B).**

**W7.505 · ⟨UserSortMenu.md · US-9⟩ — CONFIRMED MINOR: the radio group is unlabelled for AT** (cl.2). The `:17` "Sort" label is a plain `div` with no `id`; `aria-labelledby` occurs **zero** times in the compiled dropdown chunk; the visual grouping is presentational only. **Mitigation (why MINOR): the invoking trigger is named "Sort users", establishing context on open. Cure-path CORRECTED at the record — carry the correction, not the axis's original.** **Disposition verbatim: X-W8.b same-touch named-adopt rider — "else NO-WAVE-OWNER". Correction of record carried: both Label and RadioGroup are `inheritAttrs:!1` WITH useAttrs-forwarding through `mergeProps`, so the cure is TWO consumer attributes today (`id` on the label, `aria-labelledby` on the group) — no producer change required; a producer auto-wire may ride the BH relay as garnish, never as a blocker.** The X-W7 limb is the carriage, not the cure.

**W7.506 · ⟨UserSortMenu.md · US-12⟩ — CONFIRMED INFO: option glyphs lack `aria-hidden`** (cl.1). `:13` carries it; `:23/:27/:31` do not; the producer supplies none while glass-ui's own CheckboxItem indicator models the correct behaviour. One attribute ×3. **Disposition verbatim: X-W8.b same-touch rider with US-9 — else NO-WAVE-OWNER.** ≡ W7.367 / W7.301 — the `aria-hidden` convention family.

**W7.507 · ⟨UserSortMenu.md · US-K8⟩ — KILLED BY THE SEAT (ruling R-E): top-level seam necrosis is the authored design functioning** (cl.4). The seam's own contract text and the eslint boundary's comment both sanction sub-barrel reach as the compliant form, and the header's PI-6 block documents why the top barrel is deliberately not the routing surface. **Carried as an ANTI-FIX record so no successor "repairs" a working seam** ≡ W7.303 (TEP-30). **The adjacent area-seam question is already NO-WAVE-OWNER at ⟨PaletteColorStrip.md · PCS-9⟩ — identity guard, never re-booked** (and W7.240/SP-10 books the same seam's X-W8 half).

### §R1.25 — ⟨PaletteCardMenu.md⟩ — 3 rows (W7.508–W7.510)

**W7.508 · ⟨PaletteCardMenu.md · AP-4⟩ — the five Export items ship the LEGACY serializers** (cl.1). `usePaletteExport.ts:2-9` imports `"./export"`; the 914-line certified byte-exact set has **zero production consumers** (sole external consumer: `byte-exact.test.ts`). **X-W7.b BY NAME (`W7.md:42-43/:190-200`: delete `export.ts`, cut over to `export/`, one slugify) — and W7.14's lock governs the "one slugify": `canonical.ts` is the shipped path, NO shared `slugify` under `export/`.** ≡ W7.13, eighth witness.

**W7.509 · ⟨PaletteCardMenu.md · AP-5⟩ — three scaling authorities in one panel** (cl.1). A rem chassis (`w-48`, `:7`), fluid row type, and the identity pinned to an absolute `max-w-[180px]` (`:9`) that never moves — **so text-only resize enlarges the panel and shrinks the visible share of the name.** The WCAG 1.4.4 limb stands; the token arithmetic is adopted from the re-derived pass-5 ladder. → X-W7.f/X-W10 seam.

**W7.510 · ⟨PaletteCardMenu.md · AP-7⟩ — the menu renders on hosts that bind none of its emits** (cl.1). `MixSourceSelector.vue:246-268` wraps the whole card in `<button type="button">` with two props and zero listeners: 17 menu verbs render and every one is swallowed at `PaletteCard.vue:315-316`; **the wrapper also violates the card's own `:2-4` nested-controls contract.** ≡ W7.39 (MSS-4, with the K-3 `@click.stop` rider) ≡ W7.190 (PC-22). → X-W7 item 4.

### §R1.26 — ⟨wb-mix-resultdisplay.md⟩ — 3 rows (W7.511–W7.513)

*Band context: MX-CLUSTER is X-W6's packet; these three route to X-W7.c at the record. W7.7/W7.15/W7.26/
W7.32/W7.38/W7.42 already carry MR-12/MR-18/MR-24/MR-34/MR-35 and K-19's sweep-is-a-claim law (§1a C-6).*

**W7.511 · ⟨wb-mix-resultdisplay.md · MR-9⟩ — MAJOR: the rack wraps at SEVEN faces per 292 px row while the strip stays one row** (cl.1). The two depictions of one ordinal decouple at the canon's named count of 12; r8-DU independently reproduces the wrap-at-7 erratum. → MX-CLUSTER + X-W7.c. ≡ W7.424 (XW-33's three-renderings limb).

**W7.512 · ⟨wb-mix-resultdisplay.md · MR-17⟩ — MINOR, FOLD → PCS-10/R-F: a hand-rolled strip duplicates `PaletteColorStrip`, which the sibling already imports** (cl.1). **Registers are NOT interchangeable (K-9) — carry the kill: the consolidation is a design decision, not a swap.** ≡ W7.263 (PCS-10) ≡ W7.57. → X-W7.c.

**W7.513 · ⟨wb-mix-resultdisplay.md · MR-20⟩ — MINOR: the rack is writing-mode aware, the strip hard-codes `to right` — an RTL contradiction inside one composition** (cl.1). → MX-CLUSTER / X-W7.c; census → X-W10 (W7.104's BIDI identity, sixth witness).

### §R1.27 — ⟨AdminListItem.md⟩ — 2 rows (W7.514–W7.515) · §A NWO

**W7.514 · ⟨AdminListItem.md · AL-M9⟩ — NO-WAVE-OWNER · INFO: swatch sizing specified twice, enforced zero times in the failure direction** (cl.1). `:13` pins the 8×8 zone; `:3` instructs callers to size it anyway; the consumer duly re-declares `w-8 h-8` (`:46/:96`); the wrapper carries no `overflow-hidden`, **so a non-conforming swatch would overflow silently.** Redundant-but-harmless today; folds into AL-M1's comment correction. `[BD-B2]` — the file is in NO tranche-X File Bounds (verified across W0–W11).

**W7.515 · ⟨AdminListItem.md · AL-X3⟩ — NO-WAVE-OWNER (block-grain): inert `variant=` props on the row's action Buttons** (cl.1). `:55/:61/:106`; glass-ui 7.0.0 `ButtonProps` has **no `variant`** (emphasis/tone/size/iconOnly/loading). **Already banked MAJOR with a rendered receipt at ⟨AdminNamesPanel.md · C-2⟩ (repo count 66); the MT-BTN1 22→0 carry in the AdminUsersPanel adjudication is the same program.** ≡ W7.10 (BUTTON-VARIANT-INERT, ninth witness) — recorded only so this file is not read clean on the axis; **not re-booked.** `[BD-B2]`

### §R1.28 — ⟨PaginationBar.md⟩ — 2 rows (W7.516–W7.517)

*Band context: W7.132 preserves the record's 5-row NO-WAVE-OWNER envelope and DISSENT #6 (the G-9 trap);
`PaginationBar.vue` is `[BD-B2]` while three panels that mount it are in bounds.*

**W7.516 · ⟨PaginationBar.md · C-1⟩ — RESCOPED to INFO: "Page 3 of 2" is rendered verbatim** (cl.1). The surviving limb rides M1's X-W7 reload-with-clamp cure; **three limbs are refuted by construction and the "contradictory inputs" mechanism is RETIRED with rationale — carry both, or the cure re-argues a dead case.** ≡ W7.72 (AF-28: emptying the last page strands the panel forever) — the clamp is one cure for both.

**W7.517 · ⟨PaginationBar.md · D-2⟩ — CONFIRMED MINOR at the bar: four props in, no busy input** (cl.1). `:37-42`; neither call site passes one; **the producer documents `loading?: boolean` ("suppresses activation until it settles") and ships the full register — `data-loading`, `aria-busy`, `cursor: progress`, and a compiled `preventDefault`/`stopImmediatePropagation` guard.** A bespoke-vs-producer gap, not a missing capability. ≡ W7.472 (VHD-38), W7.20 (AF-5) — and it is a ready-made half of gate **N-6**.

### §R1.29 — ⟨wb-extract-imagedropzone.md⟩ — 2 rows (W7.518–W7.519) · §A NWO · XP-EXTRACT

**W7.518 · ⟨wb-extract-imagedropzone.md · R-32⟩ — NO-WAVE-OWNER: `useBreakpoint` subscribes a matchMedia listener whose value can never be read** (cl.1). `ExtractWorkbench.vue:226`; the sole read at `:148` short-circuits on the dead `split` branch. **Dies with R-18's dead configuration** ≡ W7.267 (PCS-16) ≡ W7.523 (XP-20) — the dead-`split` family, and ≡ W7.169 (PS-36) on the duplicate-`useBreakpoint` axis. `[BD-B1]`

**W7.519 · ⟨wb-extract-imagedropzone.md · R-33⟩ — NO-WAVE-OWNER: Reset doesn't reset what its gate implies** (cl.4). Enabled only because an image exists (`ExtractControls.vue:83-89`), yet it clears neither image, preview nor palette (`useExtractSession.ts:180-184` restores k/chromaWeight and re-quantizes the same file). **Carried verbatim as a naming/semantics decision FOR THE OWNER, not a defect verdict — no wave may cure it as a bug.** `[BD-B1]`

### §R1.30 — ⟨wb-extract-imageeyedropper.md⟩ — 2 rows (W7.520–W7.521)

**W7.520 · ⟨wb-extract-imageeyedropper.md · EY-15⟩ — one `glass-floating` surface wears two tier-roles and occludes 100% of the binding Extract composition, revealing a phantom duplicate of its own specimen** (cl.1). `:8` houses both the chrome bar (Instrument-veil role) and the stage (Specimen well — canon: opaque/quiet), mounted `absolute inset-0` as the workbench root's last child (`ExtractWorkbench.vue:172-180`). **≡ W7.502 (ADJ-M1) — the occlusion identity, second surface.** The eyedropper files are `[BD-B1]`; the mount binding is in the carve.

**W7.521 · ⟨wb-extract-imageeyedropper.md · EY-24⟩ — a fourth private mint of "spell a colour for a human", drifting from the canonical names, at unbounded precision beside a dead `_digits` knob, and a test that canonizes the drift** (cl.2). `formatLibraryColor` (`useImageSampler.ts:38-44`) vs `PICKER_SPACE_NAMES` (`ICTCP` vs `ICtCp`); `serializePickerColor` renders hsv as oklch for the picker. **≡ W7.98 (G16) — X-W7.f owns the format facility, and this is the fourth mint it must absorb; the `_digits` knob is the `{precision}` seam CE-8 assigns to X-W9. `useImageSampler.ts` is not in W7's bounds** `[BD-B1]`.

### §R1.31 — ⟨wb-extract-pane.md⟩ — 2 rows (W7.522–W7.523)

**W7.522 · ⟨wb-extract-pane.md · XP-10⟩ — MAJOR: one pane, two readouts, one space honoured** (cl.1). Honoured: `ExtractPane.vue:14` → `ExtractWorkbench.vue:176` → `eyedropper/useImageSampler`. Ignored: `useExtractSession.ts:54` `serializeCssColor(source.color)` — native oklch, no space argument, no precision budget — rendered at `:137-141` and **baked into every saved swatch's `css` at `:85-89`.** ≡ W7.414 (XW-7) ≡ W7.521 (EY-24); the `colorSpace` selection is a live user choice the save path discards.

**W7.523 · ⟨wb-extract-pane.md · XP-20⟩ — MINOR: the `layout="split"` branch is dead and the session prose still claims two shells** (cl.1). One caller, redundantly passing the default; four unreachable template sites + the prop union; `useExtractSession.ts:4-5` says "both shells now consume" against one shell. **→ X-W7: the branch dies in the `ExtractWorkbench.vue` carve.** ≡ W7.267 (PCS-16) ≡ W7.183 (PC-14) ≡ W7.518 (R-32) — one dead-arm identity, four records.

### §R1.32 — ⟨wb-mix-animationcanvas.md⟩ — 2 rows (W7.524–W7.525)

**W7.524 · ⟨wb-mix-animationcanvas.md · MX-6⟩ — NO-WAVE-OWNER limb: pigment travels source→canvas as JSON in DOM attributes while the typed truth sits one prop away, and the operand budget is enforced three times in disagreement** (cl.1). Writer caps 4 (`MixSourceSelector.vue:253-255`), reader caps 12 (`mixStage.ts:29/:157`), the math consumes `minLen`/`maxLen` by strategy (L's "uses all" killed, K-15). **`MixSourceSelector.vue` is shared X-W6/X-W7 (CE-1: W6 writes first) — the three-way disagreement is a cross-wave contract, not a local fix.**

**W7.525 · ⟨wb-mix-animationcanvas.md · MX-19⟩ — the Mix verb is not gated on the narration window: on any strand path it is a permanently dead, permanently enabled primary action** (cl.1). `MixConfigBar`'s `Button :disabled="!canMix"` only (`:162-170`); the silent discard at `useMixingState.ts:83`; the dock mirror at `usePaneRouter.ts:221`. **≡ W7.532 (⟨wb-mix-configbar.md · MC-20⟩) — the same identity routed "X-W6.j / X-W7"; folded once, cross-edge stated (CE-1).**

### §R1.33 — ⟨wb-mix-pane.md⟩ — 2 rows (W7.526–W7.527)

**W7.526 · ⟨wb-mix-pane.md · F-11⟩ — `≡`-pointer: `export/` is test-only (12 files, per K-F11-COUNT) → MR-12 → X-W7** (cl.1). **≡ W7.13 (EXPORT-DUAL-PATH), ninth witness — the count is carried because W7.13's census cited "12 modules, no `index.ts`" and this row is where the 12 was established.** Not re-booked.

**W7.527 · ⟨wb-mix-pane.md · F-14⟩ — NO-WAVE-OWNER limb + CONFIRMED MAJOR: `test/` imports demo source and `test/` is typechecked by NO tsconfig program** (cl.1). 10 files (`test/mix-v4.test.ts:3-4`); the coverage half is banked MX-14. **Split disposition carried: coverage → MX-CLUSTER; PROGRAM MEMBERSHIP → NO-WAVE-OWNER.** Couples to gate N-1 (a substrate that cannot typecheck cannot host the mounted battery) and to CE-7 (X-W1 owns the harness).

### §R1.34 — the singletons (W7.528–W7.533)

**W7.528 · ⟨ApiOfflineChip.md · AP-1⟩ — BLOCKER, NO-WAVE-OWNER at its record: the owner-ordered-dead `misconfigured` surface has a second LIVE seat** (cl.2). `ApiOfflineChip.vue:11-18` renders `` dev misconfigured — run `npm run dev` `` under `role="alert"`; `status-lamp.ts:54` holds the byte-identical literal; **the barrel (`index.ts:2-6`) records a death that never happened, and both pills render simultaneously on one frame (`evidence/desktop-1440-dark-misconfigured.png`).** ≡ W7.493 (DSL-1) — X-W7 holds the chip identity (W7.127 already carries AP-3 on the same file), X-W8 the lamp. `ApiOfflineChip.vue` is `[BD-B6]`.

**W7.529 · ⟨BrowsePane.md · P-5⟩ — NO-WAVE-OWNER (block-grain): the tag coercion — KILL ADOPTED, the deletion survives on N-7 grounds** (cl.2). `SearchFilterBar.vue:47` `v-if="availableTags.length > 0"` over a **required destructured prop**: on `undefined` the un-coerced path throws `undefined.length` in SearchFilterBar's render. **Carried verbatim because pass 3's "benign warning… the pane renders" comparison SWITCHED INPUTS MID-ARGUMENT — the reasoning is dead, the deletion recommendation is not.** `BrowsePane.vue` IS in bounds; ≡ W7.211 (SFB-10).

**W7.530 · ⟨ErrorBoundary.md · EB-5⟩ — MAJOR: the plate has no material tier** (cl.1). Its ground is the seed-derived ambient field and its ink scheme-derived, so **the `--ink-muted` certification does not transfer**: `:18` carries no surface/card/glass material while `useContrastSafeColor.ts:296-311` certifies against `surfaceLightnessNow("resting", …)`. Magnitudes live-only. **≡ §1a C-11 (the `--ink-muted` ruling) + W7.136 (EB-1: NO X wave names `ErrorBoundary.vue`) — the row has no owner and no material.** `[BD-B6]`

**W7.531 · ⟨shell-dock-mobilemenudropdown.md · MMD-3⟩ — NO-WAVE-OWNER, §A packet 10: no width law** (cl.3). The producer clamps block only (zero `max-inline-size|max-width` in either menu CSS file); `min-w-menu` (`:43`) is a MINIMUM (`foundation.css:118/:445` = 11 rem); `.slug-pill` (`:585-587`) has no truncation; `whitespace-nowrap` at `:48`. **The 320 canon arm fails a fortiori of the 40-char production ceiling.** Rides the MMD-2 CARRY-LOCK packet (W7.138, §BoundsDelta B-3); **the D-01 mechanism + 320 arm are §MEASURE-AT-OPEN item 4 — the 62-char specimen is synthetic, both readers' provenance cells corrected.**

**W7.532 · ⟨wb-mix-configbar.md · MC-20⟩ — IDENTITY-FOLD: the Mix verb has two homes with divergent affordances** (cl.1). This file gates `:disabled="!canMix"` (`:164`) while the dock action (`usePaneRouter.ts:221`) is permanently enabled and silently swallowed at `useMixingState.ts:80`; `DockAction.disabled?` exists and is unplumbed. **Disposition verbatim: "fold: X-W6.j / X-W7" — `MixConfigBar.vue` is shared and W6 writes first (CE-1). ≡ W7.525 (MX-19) ≡ ⟨wb-gradient-pane.md · C-2⟩.**

**W7.533 · ⟨wb-mix-sourceselector.md · K-2⟩ — kill row, folded as a pointer: D-2's alpha limb is KILLED (DU, UPHELD)** (cl.4). Wrong law — the `:186-189` comment governs ink-on-a-muted-token; whole-surface state opacity is the milder species (MX-42 ruling). **The site's true identity is the banked post-hoc-alpha census PC-35 → X-W7.c under X-W10 canon (W7.49), whose adopted discipline (PM-13) DECLINES the house idioms; DU's four-alpha census of that file (`:175, :200, :257, :260`) folds there and none is booked here.** Carried so the kill travels with the census it feeds.

### §R1.35 — the EXTERNAL row (I-28 · glass-ui 8.0.0) — 1 row (W7.X1)

*Provenance: **EXTERNAL, mail-sourced** — `docs/tranches/V/coordination/INBOX.md` row **I-28** (glass v8.0.0 @
`17a11bc5`; letter + §5 addendum 08-25; ROWED 08-28). NOT a registry row: no registry id exists and none is
minted. Cited `⟨INBOX I-28 · X-EXT-n⟩`. It goes LIVE at the repin (X-W0.j census → X-W4.g trigger); it is
folded now so the repin lands on stated work, not surprise.*

**W7.X1 · ⟨INBOX I-28 · X-EXT-1⟩ — `SearchBar` is DELETED at glass 8.0.0 (Ruling 1), and X-W7 is the recipe home** (cl.2). Four `demo/palettes/` import edges break: `BrowsePane.vue:195` · `PalettesPane.vue:149` · `admin/AdminPane.vue:87` · `slug/PaletteSlugBar.vue:132` **+ `:166` (type)**. **Migration shape, verbatim from the spine's §EXTERNAL: compose the `.input-bar` recipe, which survives on `./styles` — X-W7 cures ONCE and the sharing waves consume the recipe.** Cross-edges, write-order stated: `PalettesPane.vue` sits in X-W5's delta and `AdminPane.vue` in X-W10's, so **X-W7 authors the recipe first and both waves consume it after; `PaletteSlugBar.vue` is `[BD-B6]` and its two edges (value + type) ride the recipe with no X-W7 byte-surface today.** Couples to W7.213/W7.204 (the SearchBar is the shared `searchQuery` model's control) and to gate N-4 — **the repin and the one-ref-per-domain cure touch the same four call sites; sequencing them together is cheaper than twice.** Status: LIVE only if the X-W0.j census PASSES; if the trigger never fires, the row stays dormant and no cure is authored (CE-2's law, applied to the repin).

---

## §R1.36 — New born-RED gates N-10 … N-17 (real witnesses, L-19 in force)

*Eight defects the 394 newly-folded rows put beyond doubt and that **no** existing W7 gate — and none of
N-1…N-9 — can fail on. Each carries a repo path + line, a producer byte, or a measured count; each states a
command, a GREEN clause and a falsifier. None opens product source to author; all are RED today.*

**N-10 · POINTER CAPTURE IS TAKEN GUARDED AND ALWAYS RELEASED** (BLOCKER-class, born-RED).
Witness ⟨MiniColorPicker.md · MCP-3⟩ + ⟨MCP-42⟩: `setPointerCapture` at `:129/:144` is unguarded and the capture is never released; there is no `@pointercancel`, no `@lostpointercapture`, no `onUnmounted`; the drag flags are non-reactive setup-scope `let` (`:79-80`) cleared only by element-bound `@pointerup` (`:133/:148`); the instance root `<Popover>` (`:2`) outlives `PopoverContent` and **the producer popover has no `forceMount`**, so the unmount path cannot be patched from the consumer. MCP-42 adds the second route: the flag is set BEFORE the capture call, which throws `NotFoundError` on a stale pointerId — **latching the flag with no capture taken, so a pointercancel cure cannot fire.**
*Command*: `grep -rn "setPointerCapture" demo/ | wc -l` vs `grep -rn "pointercancel\|lostpointercapture" demo/ | wc -l` → **N vs 0** today. *GREEN*: every capture site is inside a try/guard and has a paired release on cancel, lostpointercapture and scope dispose. *Falsifier*: dispatch `pointerdown`, then remove the element mid-drag — the flag survives and bare hover mutates the colour. **`MiniColorPicker.vue` is `[BD-B4]`: the gate is authorable, the cure is not, until the bounds delta rules.**

**N-11 · NO FALLIBLE COPY DISCARDS ITS `CopyResult`** (born-RED).
Witnesses ⟨PaletteCard.md · PC-21⟩ (`void writeClipboard(…)` at `:294/:333`), ⟨PaletteCardSwatches.md · PS-23⟩ (the verdict discarded at **6/6** palettes sites, grep census exact), ⟨wb-generate-pane.md · GEN-6⟩ + ⟨ActionFeedback.md · AF-20⟩ (the producer documents `CopyResult` as the honest primitive "for consumers that own their own feedback"), and `App.vue:362` — **the house pattern, in-tree.** `ActionFeedback` + `showFeedback` sit wired to nothing while four copy verbs confirm nothing.
*Command*: `grep -rn "void writeClipboard\|writeClipboard(" demo/ --include='*.vue' --include='*.ts'` and assert every hit's result is bound. *GREEN*: 0 discarded results; every copy verb reaches a verdict surface. *Falsifier*: re-add one `void` and the census is ≥1. **Product consumer: the shipped copy buttons — not the L-19 contrivance shape.**

**N-12 · NO WRITE-ONLY OR READ-ONLY CUSTOM PROPERTY; NO UTILITY WITHOUT AN EMITTED RULE** (born-RED, ≥7 measured sites).
Witnesses, each independently banked: `--card-press-t` is written by `useLiquidPress` (`PaletteCard.vue:264`) and read by nothing, while `.cartoon-cast`'s producer travel/spread read `--cartoon-press-t`, which nothing writes — ⟨PaletteCard.md · PC-4⟩ ≡ ⟨PalettesPane.md · PP-12⟩ ≡ ⟨PaletteCardGrid.md · PG-17⟩; `focus-visible:ring-ring/40` reaches a `--ring` that has **no declaration anywhere** (⟨PaletteCardSwatches.md · PS-9⟩; the only textual hit is `focus-ring.css:11`'s postmortem); `hover:shadow-cartoon-md` **generates no rule at all** because `.shadow-cartoon-*` are `@layer components` classes, not `@utility`s (⟨SearchFilterBar.md · SFB-5⟩; repo-wide hits = 1, the subject); `--skeleton-ink` never reaches a pixel (⟨PaletteCardSkeleton.md · PCS-2⟩ ≡ ⟨ShadowPalette.md · SP-5⟩); two producer motion tokens with **0 dist hits** are overridden as "the published seams" (⟨PaletteCardSkeleton.md · PCS-16⟩); `.floating-panel` matches **zero CSS rules anywhere** (W7.33).
*Command*: census every `--custom-property` authored under `demo/` for ≥1 writer AND ≥1 reader, and every `hover:*`/`ring-*` utility for a matching rule in the built stylesheet. *GREEN*: 0 orphans in either direction. *Falsifier*: delete one declaration and the census gains exactly one row. **This is the class §1a C-11's `--ink-muted` ruling and G3's inert-prop family both live in — one census, three families.**

**N-13 · THE REDUCED-MOTION TRANSITION COMPLETES** (BLOCKER-class, born-RED).
Witnesses ⟨PaletteCard.md · PC-1⟩ ≡ ⟨PaletteCardSwatches.md · PS-4⟩: `done()` is gated exclusively on a `height` transitionend (`useHeightTransition.ts:35-39/:66-70`); the central PRM guard rewrites the transition set to five colour properties `!important` with **height absent** (author-`!important` beats the author-normal inline shorthand at `:30/:61`); the 2-arity hooks mean Vue 3.5 waits forever — **so under `prefers-reduced-motion` the expand/collapse never completes and the swatch subtree is never unmounted.**
*Command*: with PRM emulated, toggle `expanded` and assert the leave hook resolves and the subtree is removed from the DOM. *GREEN*: resolves within one frame budget. *Falsifier*: restore `height` to the PRM transition set and the gate passes — which is how the RED state hides today. **Runnable in X-W1's e2e harness without N-1 (CE-7); the jsdom form depends on N-1.**

**N-14 · THE WIRE CARRIES EVERY FIELD THE UI RENDERS — the `weight` case** (born-RED).
Witness ⟨PaletteColorStrip.md · PCS-3⟩: `api/src/modules/palette/schema.ts:27-31` = `{css, name?, position}`; **zod strips unknown keys with no 400 and no log**, so a saved extracted palette loses the population story the strip exists to draw, falsifying `types.ts:5-11` and the strip's own `:40-42` prose. Sole producer `useExtractSession.ts:88`.
*Command*: round-trip a weighted palette save → reload and assert the weights survive, or that the write is rejected loudly. *GREEN*: preserved, or an explicit rejection the UI renders. *Falsifier*: add `weight` to the schema and the round-trip closes. **Sibling of N-8 (client↔server DTO parity) on the opposite direction of travel; `demo/palettes/types.ts` and `api/**` are `[BD-B2]`.**

**N-15 · THE EXPORT PATH IS INJECTION-SAFE, TOTAL, AND CANONICALLY NAMED** (born-RED).
Witness ⟨PalettesPane.md · PP-8⟩: two raw-interpolation vectors (name → SVG text content, `c.css` → fill attribute); a rejecting zero-colour case (width 0 → `toBlob` null); a collapsing slugify (`""` → dotfiles, and the colliding `--palette--0`); a same-tick `revokeObjectURL` on a never-appended anchor; a `switch` with no default; **and every failure `console.warn`-silent while publish gets `card.showFeedback`.**
*Command*: export three fixtures — a name containing `</text>`-shaped markup, a zero-colour palette, and a name that slugifies to empty — and assert escaped output, a loud rejection, and a canonical stem. *GREEN*: all three. *Falsifier*: today's tree fails all three. **Cure lock inherited from W7.14/S-6: `canonical.ts` is the shipped path; NO shared `slugify` may be introduced under `export/`.**

**N-16 · A PAGED READ CANNOT BE OVERWRITTEN BY AN OLDER ONE** (born-RED).
Witness ⟨AdminAuditPanel.md · AAP-11⟩ (probe C-7: a stale page-2 response overwriting page 3; no AbortController/token/in-flight guard at `:48-71`; `finally` clears `loading` on FIRST settle; four overlapping entry points) plus the four sibling witnesses of W7.73 (⟨AdminFlaggedPanel.md · AF-29⟩, ⟨VersionHistoryDrawer.md · VHD-9/VHD-13⟩, ⟨AdminTagsPanel.md · ATP-14⟩). **Distinct from N-6, which counts requests at destructive commits; this asserts ORDERING on reads — last-writer-wins on an audit record shows the wrong 20 rows under the right page number.**
*Command*: issue page 3, then page 2 with a delayed settle; assert the rendered page equals the requested page and the pager agrees. *GREEN*: equal. *Falsifier*: remove the sequence token and the two diverge within the measured window. **The composables are `[BD-B2]`; the panels are in bounds — the gate is authorable at the view seam, the cure is not.**

**N-17 · THE SKELETON IS THE SILHOUETTE OF ITS SETTLED STATE** (born-RED).
Witnesses ⟨PaletteCardSkeleton.md · PCS-4⟩ (a 68 px swatch row the collapsed card never renders, at the other seat's 56 px size, **+50.4% total height**), ⟨AdminNamesPanel.md · M-DU8⟩ (skeleton promises a 56 px action cluster; Pending delivers 66 px, Approved 30 px — `AdminListSkeleton.vue:18` `h-7 w-14`), ⟨TagEditPopover.md · TEP-15⟩ (**loading→ready jumps the anchored panel ~114 px, 134.3 → 248.3, both probes**), ⟨AdminTagsPanel.md · ATP-16⟩ (one flat row of 5 decorative pills vs N labelled groups). **G20 governs the plate's MASS; nothing governs its fidelity.**
*Command*: at one fixture, measure the loading and settled bounding boxes and assert |Δheight| within a stated tolerance at 390 px and 1440 px. *GREEN*: within tolerance at both. *Falsifier*: today's ghosts miss by 50.4% / 114 px / 36 px. **Depends on N-1 for the mounted form, or rides X-W1's visual harness (CE-7) — X-W7 must NOT author a second screenshot mechanism (§EXCLUDED).**

**Amendment note to the existing sharpenings (no new entries).** S-3 gains ⟨AdminListItem.md · AL-X3⟩ as the ninth BUTTON-VARIANT-INERT witness (W7.515) and W7.311's script-side widening as the class `strictTemplates` **cannot** see. S-7's failure-path denominator gains ⟨AdminAuditPanel.md · AAP-23⟩'s second dead `catch` (W7.430). S-9 gains ⟨PaletteCardMeta.md · PM-5⟩/⟨PM-14⟩: the meta row is **rootless**, so the G9/G17 cure cannot be authored inside it (W7.328/W7.334). S-10 gains ⟨PaletteColorStrip.md · PCS-23⟩ as the `Math.max(…, 0.5)` witness `W7.md:210` already names (W7.272). S-14 gains ⟨VersionHistoryDrawer.md · VHD-2⟩ as a second invisible-at-rest destructive seat (W7.465) and ⟨FlagReportDialog.md · A-6⟩'s unfocusable confirm (W7.437). S-16 gains ⟨wb-extract-workbench.md · XW-7⟩ — G16's most severe consumer, inside the carve (W7.414). S-19 gains ⟨EmptyState.md · ES-21⟩ and ⟨wb-extract-workbench.md · XW-32(b)⟩: the eyebrow override is **pre-owned at `W7.md:523-527`** (W7.487/W7.423). S-20's single o9 re-ruling now closes **four** rows, not three — ES-4, ES-19, SP-34 and ⟨ShadowPalette.md · SP-7⟩/⟨SP-25⟩ (W7.238/W7.250): separate re-rulings leave three inverted.

**Contrivance note (L-19), extended.** N-11's grep, N-12's census, N-13's PRM toggle, N-15's export fixtures and N-17's box measurement all have **product consumers** (the shipped copy buttons, the served stylesheet, the shipped disclosure, the shipped download, the shipped loading state). N-10's capture census has a product consumer (the shipped drag). N-14's round-trip and N-16's ordering assertion are gates on a **cure** — like N-8, they are admissible only once the DTO/composable reconciliation is in-wave, and are marked as such. No gate here is a proof-script whose only consumer is itself.

---

## §R1.37 — §-arithmetic, restated to the new true counts (dated 2026-08-28, never silent)

**Superseding note.** §Closing's counts were true at pass 1 and are **superseded** by this block. §Closing's
prose is left byte-intact above (this fold's own §1a discipline: corrections are stated, not overwritten).

| quantity | pass 1 (§Closing) | round-1 repair | delta |
|---|---|---|---|
| §Rows entries | 140 (W7.1–W7.140) | **534** (W7.1–W7.140 · W7.141–W7.533 · W7.X1) | **+394** |
| — registry identities folded | 140 | 533 | +393 |
| — EXTERNAL (mail-provenance) rows | 0 | 1 | +1 |
| — of which carry an NO-WAVE-OWNER limb | 4 packets, 0 rows id-for-id | **48 rows id-for-id** | +48 |
| — `≡`-pointer rows (facets of folded identities) | ~60 deduped in place | 31 explicit pointers | — |
| §Gates entries | 29 (20 sharpenings + 9 new) | **37** (20 sharpenings + 17 new) | **+8** |
| corpus records consumed | 50 | **58** (+8: PaletteColorStrip, MiniColorPicker, PaginationBar, ApiOfflineChip, wb-extract-imagedropzone, wb-extract-imageeyedropper, shell-dock-dockstatuslamp, wb-mix-animationcanvas) | +8 |
| §BoundsDelta blocks | 7 (B-1…B-7) | 7, unchanged — **every new row lands in an existing block** | 0 |
| §CrossEdges | 9 (CE-1…CE-9) | 9, unchanged — the new rows populate them | 0 |
| corpus corrections carried (§1a + inline) | 12 | 12 + **31 inline kills/corrections carried with their rows** | +31 |

**Census closure claim (falsifiable).** After this repair, of the **529** ⟨record.md · id⟩ rows this seat's
sweep finds routed to X-W7 across the 92-record corpus, **529 are carried in this file** — 171 at pass 1,
356 added here, plus the 37 roster identities whose own row lines carry no routing verb (the extract-cone
`EC-*` band and the other §A NWO assignments). **Escapes: 0.** Re-run the §R1 method against this file to
falsify: any id it reports absent is a defect of this section, not of the corpus.

**What the repair does NOT change.** Status stays `planned`. No disposition is stronger than ADJUDICATED.
No gate is stamped. `W7.md` and `CONFORMANCE-2026-08-03.md` remain byte-untouched (E-3) — verifiable with
`git diff --stat HEAD -- docs/tranches/X/waves/ docs/tranches/X/CONFORMANCE-2026-08-03.md` → empty. No
product source was opened; every path and line number above is quoted from the corpus records, not read from
the tree. §4's bounds table is **not** amended: the 393 new rows include a large share whose surfaces sit in
`[BD-B1]`…`[BD-B7]`, and those remain formation-boundary decisions.

**The repair's headline for the formation boundary.** The pass-1 fold's headline stands and sharpens: X-W7 is
the only wave whose bounds could receive the admin operative core, the palette-card composables and the
extract cone — **and the round-1 census now measures the gap: of 393 newly-carried identities, the majority
name surfaces §4 does not grant.** Three whole records the roster never reached (`PaletteCardSwatches` 33,
`PaletteColorStrip` 24, `ActionFeedback` 15) are wholly `[BD-B5]`/`[BD-B6]`. The extract cone contributes a
16-row band that is **NO-WAVE-OWNER by construction** (§1a C-10). Eight new born-RED gates were needed
because the folded rows describe failures no existing gate's shape can see — and two of them (N-14, N-16)
are gates on cures the wave cannot author within its bounds today.

— end of fold. `W7.md` and `CONFORMANCE-2026-08-03.md` remain immutable beside this file per E-3; every
banked id cited is original for life per the anti-rename law; every citation is keyed `⟨record.md · id⟩` per
§1a C-1; the EXTERNAL row is keyed `⟨INBOX I-28 · X-EXT-n⟩` and carries mail provenance, never a registry id.
