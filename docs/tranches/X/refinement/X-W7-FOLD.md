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

Two registers. **Sharpenings** attach to an existing `W7.md` §6 gate and change what GREEN means or what the baseline covers — the dated gate text is untouched; the addendum's clause governs at read time. **New born-RED candidates** are defects with real witnesses that **no** current W7 gate can fail on. Total entries: **29** (20 sharpenings + 9 new).

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

— end of fold. `W7.md` and `CONFORMANCE-2026-08-03.md` remain immutable beside this file per E-3; every banked id cited is original for life per the anti-rename law; every citation is keyed `⟨record.md · id⟩` per §1a C-1.
