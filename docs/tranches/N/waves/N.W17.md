# N.W17 — SHELL + MOTION + POPS: dock scale, 12→3 transition families, the view-select moment, icon energy + celebration (the Family-B first consumers), the nomenclature standard

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15 — `EXECUTION-ORCHESTRATION.md §0`/`§5`).
No longer PLANNED.

**Round:** R3 (the design body — `EXECUTION-ORCHESTRATION.md §2`). Runs beside N.W13 (controls),
N.W14 (cards), N.W15 (perf), N.W16 (per-pane). **Consumes N.W10.D's cascade kill + single-mount**
(the desktop must render before any motion/shell π is meaningful) and **N.W12's spring-clock /
display-rung work** (the keystone precedes the body — DAG `WAVES-2.md:276-287`). **Depends on
N.W10.C** for the save beat (D7-5): a celebration must NEVER fire on the data-loss path.
Carries spring-clock-token + per-density-glyph + dock-FLIP-verify interims that close at the W18 BA-cut pin.

**Disposition:** IMPL unilateral (Fable) — every W17 lane is demo-owned design work; the BA-blocked
halves (the `--spring-*-duration` token consume, the per-density dock glyph, the U6/U16 dock-FLIP
fix verify) are FILED asks whose VERIFY lands at W18, with measure-first interims that die at the pin
(`WAVES-2.md:37,190-200`).

**Idiom:** matches `N.md §4` + `WAVES-2.md §N.W17` + the N.W10/N.W11/N.W14 wave-spec precedent —
§-structured, hard-gate-per-lane, file:line-grounded; every claim cites a `demo/` file:line, an
audit-lane §section, or a command+output run TODAY against the working tree / built `dist/gh-pages` /
installed glass-ui 3.13.0 (value.js 0.12.0) (inv ε). **DEVELOPMENT doc — nothing implemented; no
source/test/CI edits.** Every anchor is a SPEC binding-site, not a change.

---

## §0 — One-paragraph reading

The demo's chrome and motion are three disjoint substrates with no shared vocabulary: the dock rides
glass-ui's DEFAULT density rung while the `spacious` rung sits unconsumed on the shelf (U32-dock); pane
and card motion are spread across **12 demo-authored `*-enter-active` transition families** (plus
`pop`/`fade`/`fade-slide` consumed from glass-ui with zero demo CSS), each with its own ad-hoc
duration/easing and a free-form untyped `:name` string at the shared `PaneSlot` seam (U12-motion); the
pane transitions pair a SPRING easing (`--spring-snappy`) with a fixed DURATION (`--duration-slow`) —
a mis-clocked settle (U12); a separate `grid 0fr→1fr` width reveal in `Dock.vue` is a third idiom; the
view-select trigger is mono Jakarta with an 8px gray dot, the `palettes` menu row wears
`pastel-rainbow-text`, and the icon column is binary gray-vs-accent (U12 / D7-1/D7-2); ~18 copy sites
exist, only 3 give feedback, one of them a fully-wired DEAD orphan (`GradientCodeEditor.vue`), and there
is no per-view accent in `VIEW_MAP` (D7-1/D7-4); save and publish fire silently (D7-5/D7-6); and the
structural class names are a 5-name tangle (`pane-shell`/`pane-wrapper`/`pane-container`/`pane-main` +
`picker-shell`/`about-card`) with no documented ladder (U12-naming). N.W17 makes the dock spacious (the
rung + the glyph-ratio override + the hit-target floor + the shell φ rhythm), collapses the 12
demo-authored families to **≤3 semantic families of which exactly 1 is demo-authored** (`pane`; `pop`
and `fade`/`fade-slide` are CONSUMED from glass-ui's shipped vocabulary, never re-authored) + TYPES
`transitionName` at the prop boundary + retires the `grid 0fr→1fr` third substrate + adopts
`document.startViewTransition` (PRM-gated, the glass-ui `view-transition.css` ships unconsumed), gives
the view-select moment a display voice + a WatercolorDot active/ghost pair + per-view semantic accents
+ an origin-anchored spring-scale open (the canned keyframe dies) + drops `pastel-rainbow-text` from the
menu, threads `accent` per view through `VIEW_MAP` to light the dock/trigger/header glyphs and the
dropdown column, builds ONE `CopyIconButton` primitive at all ~18 copy sites + the staged save beat +
the gold publish beat (the Family-B token FIRST consumers, BA-safe — tokens + shipped components only),
and authors the standing nomenclature doc (`demo/DESIGN.md §Motion + §Structure`: the View/Pane/Card/
Layer/Sheet table + the 4-level `pane-main → pane-container → pane-slot → pane-card` ladder) + closes the
X8 direct-hash boot residual + the D8-3b dock inert/visibility atomic pairing. The wave is demo-owned;
its π evidence (before/after motion + chrome pairs) is gated behind N.W10.D's cascade kill (the desktop
must render first); its source-shape gates (the family count, the typed prop, the nomenclature
collapse, the `pastel-rainbow-text` absence) are demo-independent and provable by tree probe TODAY.

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit **U12** | "Pane transitions + card transitions not smooth — refine on glass-ui springs; STANDARDIZE the pane/card nomenclature" — the headline W17.B/E ask, owner = demo (+ nomenclature doc) | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:32` |
| User audit **U32** | "Cards/layouts overly contrived; … dock bigger; less cramped/more accessible" — the dock-bigger half lands at W17.A (the layout half = W12.C) | `LEDGER.md:17` |
| User audit **U6 / U16** | "Dock too slow/laggy/jittery to squish/morph" — the dock FLIP root, P0; the producer fix = glass-ui A-1, VERIFIED at W18; W17.A does the demo-side density/shell work beside it | `LEDGER.md` U6/U16; `U-DOCK.md:18,25-136` |
| Lane **U-DOCK** | §1 the FLIP direction-wrong + snap root (glass-ui A-1); §3 the transition-substrate census (the 14-vs-12 arithmetic, the three substrates, the unbounded `:name`); §3 the ≤3-semantic-family target + the nomenclature table ask | `docs/tranches/N/audit/lanes2/U-DOCK.md:1,25-136,220-262` |
| Lane **D5** | the dock work-orders: §2 the `density="spacious"` rung + the glyph ride (WO-D5-1) + the hit-target floor (WO-D5-2); the shell φ rhythm; the dark-arm verify (WO-D5-10); the `pane`/`pop` paired-token consume (WO-D5-11); the trigger display-voice (WO-D5-12) | `docs/tranches/N/audit/lanes2/D5.md:28,45-46,70-91,175,216-232` |
| Lane **D7** | §3.3 the copy-site census (3 of ~20 give feedback; the 15+ silent; the dead `GradientCodeEditor` orphan); WO-D7-1 accent-per-view; WO-D7-2 un-mute the icon column; WO-D7-4 ONE `CopyIconButton`; WO-D7-5 save beat; WO-D7-6 publish gold beat; §3.4 the save-P0 (→ W10.C); the Family-B canon naming | `docs/tranches/N/audit/lanes2/D7.md:55-84,110-176` |
| Lane **D8** | D8-9 view transitions (glass-ui `view-transition.css` ships unconsumed); D8-3b the dock inert/visibility atomic pairing assert | `docs/tranches/N/audit/lanes2/D8.md` (D8-9, D8-3b rows) |
| WAVES-2 §N.W17 | the ratified lane table A–E + the hard gate (the SCOPED grep, the typed prop, the dock band, the zero-`pastel-rainbow-text`, the copy-feedback, the save-beat-gating, the direct-hash boot) | `docs/tranches/N/WAVES-2.md:186-200` |
| WAVES-2 §6 (critic fold) | K1-F1: 12 demo-authored families (NOT 14) — `pop`/`fade-slide` are glass-ui-shipped → author `pane` only + the gate grep scoped to demo CSS | `docs/tranches/N/WAVES-2.md:407-410` |
| WAVES-2 §5 (coverage) | U12 → W17.B (motion) + W17.E (nomenclature); U32 dock half → W17.A; X8 pane-router residual → W17.E; D8-9 → W17.B; D8-3b → W17.E | `docs/tranches/N/WAVES-2.md:351-352,361,383,385` |
| EXECUTION-ORCHESTRATION §2 | R3 placement; the W10.D gate-opener precondition (the cascade kill is the substrate every later design gate stands on); the W10.C save-P0 born-RED-on-the-live-demo posture | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:56-83` |

**Source-tree roots (the live defects + the live substrate, all verified 2026-06-15 at `tranche-f-handoff`):**

| File:line | What lives there |
|---|---|
| `demo/color-picker/App.vue:331-340,343-368` | the `pane-slide`/`pane-left`/`pane-right` CSS families: spring-easing paired with `--duration-slow` (lanes B) |
| `demo/color-picker/App.vue:315-319` | `.pane-wrapper` layout-prop transition (`height`/`margin`/`padding` — LP3-3c, should be transform) (lane B) |
| `demo/color-picker/App.vue:39,51,66` | the `PaneSlot :transition-name` call sites passing free-form `'pane-left'`/`'pane-right'`/`''` strings (lane B) |
| `demo/color-picker/App.vue:25-31,45,58-59` | `pane-main` / `pane-container` / `pane-wrapper` structural classes (lane E) |
| `demo/@/components/custom/panes/PaneSlot.vue:22,35` | `transitionName: string` (untyped) → `<Transition :name="transitionName">` — the unbounded vocabulary seam (lanes B, E) |
| `demo/@/components/custom/dock/Dock.vue:93` | `<GlassDock … :always-expanded="!isDesktop">` — NO `density` prop (the default `comfortable` rung) (lane A) |
| `demo/@/components/custom/dock/Dock.vue:91,210,213-227` | the `top-dock-inset` shell; the `grid-template-columns 0fr → 1fr` third substrate (`.action-bar-toggle-slot`); the `.gold-shimmer-icon` recipe (lanes A, B, D) |
| `demo/@/components/custom/dock/Dock.vue:101-102,112,148,198-199` | the bespoke `w-5 h-5`/`w-6 h-6` dock glyphs + the slug-edit/back/save/cancel controls (the hit-target floor sites) (lane A) |
| `demo/@/components/custom/dock/DockViewSelect.vue:52-64` | the view-select trigger: `text-small font-display font-normal` (mono-ish, not display-voice) (lane C) |
| `demo/@/components/custom/dock/DockViewSelect.vue:76-89` | the menu row: the 8px gray `w-2 h-2 rounded-full` dot (`:77-79`), the binary gray-vs-accent icon (`:80-85`), the `pastel-rainbow-text` on the `palettes` row (`:88`) (lanes C, D) |
| `demo/@/composables/viewSchema.ts:69-76,83-196` | `PaneConfig` (NO `accent` field) + `VIEW_MAP` (the single source — one edit lifts 14 panes) (lane D) |
| `demo/@/components/custom/gradient/GradientCodeEditor.vue:5-6,29,126-130` | the DEAD `copied` ref + `onCopy()` with NO button in its template (the orphan proving the copy-feedback intent existed) (lane D) |
| `demo/@/composables/useViewManager.ts:45,67` | the direct-hash boot fallback (`isViewId(name) ? name : "picker"`) — the X8 cold-mount-into-hidden-slot residual root (lane E) |
| `demo/@/components/custom/color-picker/ColorPicker.vue:2,286` | `pane-shell` — the structural-name tangle (collapses to `pane-card`) (lane E) |
| `demo/@/components/custom/panes/AboutPane.vue:6` | `about-card` — same tangle (→ `pane-card`) (lane E) |
| `node_modules/@mkbabb/glass-ui/dist/styles/transitions.css:13,23,63` | the glass-ui-SHIPPED `fade`/`fade-slide`/`pop` families (consumed at 7 demo sites with zero demo CSS) (lane B) |
| `node_modules/@mkbabb/glass-ui/dist/styles/dock/density.css` | the `spacious`/`audacious` density rungs + the `--dock-scale` cascade (consumed by nobody) (lane A) |
| `node_modules/@mkbabb/glass-ui/dist/styles/view-transition.css` | the shipped, unconsumed view-transition CSS (D8-9) (lane B) |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below is a command run against the working tree / built `dist/gh-pages/assets/` /
installed `node_modules/@mkbabb/glass-ui` at glass-ui 3.13.0 (value.js 0.12.0). No repo edits.

### SV-1 — There are exactly 12 demo-authored transition families; the K1-F1 arithmetic holds (lane B, U12) — LIVE

```
$ grep -rhoE "\.[a-z-]+-enter-active" demo --include="*.vue" --include="*.css" | sed -E 's/-enter-active$//' | sort -u
.edit-drawer  .edit-overlay  .error-pop  .eyedropper-fade  .feedback-slide
.pane-left  .pane-right  .pane-slide  .rename-slide  .slug-bar-swap  .swatch-item  .toggle-icon
$ … | wc -l   →  12
$ grep -oE "\.[a-z-]+-enter-active" node_modules/@mkbabb/glass-ui/dist/styles/transitions.css | sed -E 's/-enter-active$//' | sort -u
.dialog-scale  .dropdown  .fade  .fade-slide  .metric-swap  .pane-swap  .pop  .tab-fade
$ grep -rnE 'name="(pop|fade-slide|fade)"' demo --include="*.vue"
MixResultDisplay.vue:35:Transition name="pop"   ExtractPane.vue:43:name="fade-slide"
ImagePaletteExtractor.vue:12,59:name="fade-slide"   ImageDropZone.vue:31 / AdminUsersPanel.vue:12:name="fade"
```

**Confirmed:** the demo authors 12 distinct `*-enter-active` CSS curve families, each its own
duration/easing, no token discipline (U-DOCK §3 `:243-249`). The U-DOCK census says "14" because it
double-counted `pop` and `fade-slide`, which glass-ui SHIPS (`transitions.css:23,63`) and the demo
already CONSUMES at 7 sites with ZERO demo CSS — the K1-F1 correction (`WAVES-2.md:407-410`). The gate
must grep DEMO-authored CSS only (counting the producer's 8 shipped families would never go green).
Born-RED: 12 demo-authored families live today.

### SV-2 — The transition vocabulary is UNBOUNDED — `PaneSlot.transitionName` is a free-form `string` (lane B, U12) — LIVE

```
$ sed -n '22p;35p' demo/@/components/custom/panes/PaneSlot.vue
22:    transitionName: string;
35:    <Transition :name="transitionName" mode="out-in">
$ sed -n '39p;51p;66p' demo/color-picker/App.vue
39:  :transition-name="viewManager.ready.value ? 'pane-left' : ''"
51:  :transition-name="viewManager.ready.value ? 'pane-left' : ''"
66:  :transition-name="viewManager.ready.value ? 'pane-right' : ''"
```

**Confirmed:** the shared `PaneSlot` shell takes a free-form `string` transition name, so the vocabulary
is unbounded by the type system (U-DOCK §3 `:249`). Born-RED: the prop is `string`, not a typed union.

### SV-3 — The spring-clock is MIS-PAIRED — `--spring-snappy` × `--duration-slow` (lane B, U12) — LIVE

```
$ grep -n "spring-snappy\|duration-slow" demo/color-picker/App.vue
316-318: transition: height/margin/padding var(--duration-slow) var(--ease-standard)  ← .pane-wrapper layout-prop
332:  transition: transform var(--duration-slow) var(--spring-snappy);   ← .pane-slide
344:  transition: transform var(--duration-slow) var(--spring-snappy);   ← .pane-left
358:  transition: transform var(--duration-slow) var(--spring-snappy);   ← .pane-right
$ grep -rhoE "\-\-spring-[a-z]+(-duration)?" node_modules/@mkbabb/glass-ui/dist/glass-ui.css | sort -u
--spring-bouncy  --spring-dock  --spring-dock-duration  --spring-smooth  --spring-snappy
```

**Confirmed:** the three pane families pair a SPRING-shaped easing (`--spring-snappy`) with a fixed
DURATION (`--duration-slow`) — a settle clocked by a duration the spring never agrees with (the U12
"not smooth" root; `WAVES-2.md:191` "the clock fix — `--spring-snappy` mis-paired with `--duration-slow`").
glass-ui ships the SOLVED settle as paired `--spring-*-duration` tokens (e.g. `--spring-dock-duration`)
— the demo consumes the matched pair at the W18 pin. The `.pane-wrapper` (`:316-318`) also transitions
LAYOUT properties (`height`/`margin`/`padding`) — the LP3-3c reflow class (should be `transform`).
Born-RED: the mis-paired clock + the layout-prop transition are live.

### SV-4 — A `grid 0fr→1fr` is a THIRD motion substrate (lane B, U12) — LIVE

```
$ sed -n '213,227p' demo/@/components/custom/dock/Dock.vue
213:   grid-template-columns 0fr → 1fr pattern (no max-width clipping).
217:    grid-template-columns: 0fr;
219:    transition: grid-template-columns var(--duration-normal) var(--ease-standard), …
224:.action-bar-toggle-slot.is-visible { grid-template-columns: 1fr; opacity: 1; }
```

**Confirmed:** `.action-bar-toggle-slot` (`Dock.vue:213-227`) animates `grid-template-columns: 0fr → 1fr`
on a duration/easing pair — a different idiom from the Vue `<Transition>` substrate AND from the
glass-ui JS-spring dock morph (U-DOCK §3 Substrate B `:251`). Born-RED: the three disjoint substrates
are live.

### SV-5 — The dock rides the DEFAULT density rung; `spacious` is unconsumed (lane A, U32-dock) — LIVE

```
$ grep -n "density\|GlassDock" demo/@/components/custom/dock/Dock.vue
93:  <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="false" :fit-content="true" :always-expanded="!isDesktop">
$ grep -rn "density=" demo --include="*.vue"   →  (none)
$ ls node_modules/@mkbabb/glass-ui/dist/styles/dock/density.css   →  exists
```

**Confirmed:** `GlassDock` (`Dock.vue:93`) carries NO `density` prop → the default `comfortable` rung
(280×55 expanded, 40px controls, 20px glyphs — D5 `:28,45-46`). glass-ui ALREADY SHIPS the
`spacious`/`audacious` rungs (`dock/density.css`) — "consumed by nobody" (D5 §2 `:73`). Born-RED: the
rung sits on the shelf; no `density=` consume in the whole demo.

### SV-6 — The view-select menu wears `pastel-rainbow-text`; the icon column is binary; the dot is gray (lane C/D, U12/D7-2) — LIVE

```
$ grep -rn "pastel-rainbow-text" demo --include="*.vue"
DockViewSelect.vue:88:  entry.id === 'palettes' ? 'pastel-rainbow-text' : ''
PalettesPane.vue:4 / PaletteDialogHeader.vue:37   ← (pane bodies, NOT menus — out of W17.C scope)
$ sed -n '77,85p' demo/@/components/custom/dock/DockViewSelect.vue
77-79: <span class="… w-2 h-2 rounded-full …" :style="… 'color-mix(in srgb, var(--muted-foreground) 25%, transparent)'">  ← 8px gray dot
80-85: <component :is="entry.icon" :style="active ? {color:safeAccent} : {}" :class="!active ? 'text-muted-foreground' : ''">  ← binary gray-vs-accent
$ sed -n '52,54p' demo/@/components/custom/dock/DockViewSelect.vue
52-54: <DockSelectTrigger class="text-small font-display font-normal …">  ← small mono-weight trigger, not display-voice
```

**Confirmed:** the `palettes` menu ROW carries `pastel-rainbow-text` (`DockViewSelect.vue:88` — color
should live in the icon+dot system, not the row text, `WAVES-2.md:192`); the per-row dot is an 8px gray
`color-mix(… muted-foreground 25% …)` (`:78`); the icon column is binary gray-vs-accent (`:80-85`, the
D7-2 "un-mute" target); the trigger is `text-small font-display font-normal` (`:54`), not the audacious
display voice the app's TITLE deserves (D5 WO-D5-12; `WAVES-2.md:192`). Born-RED: all four are live.

### SV-7 — `VIEW_MAP` has NO per-view accent (lane D, D7-1) — LIVE

```
$ grep -c "accent" demo/@/composables/viewSchema.ts   →  0
$ sed -n '69,76p' demo/@/composables/viewSchema.ts
69:export interface PaneConfig { left: LeftPane; right: RightPane; label: string; leftLabel; rightLabel; icon: Component; }
```

**Confirmed:** `PaneConfig` (`viewSchema.ts:69-76`) has no `accent` field; `VIEW_MAP` (`:83-196`) carries
no per-view color. The dock collapsed pill glyph (`Dock.vue:199`), the trigger glyph
(`DockViewSelect.vue:57-62`), and `PaneHeader` all fall back to the single live `safeAccent` (D7 WO-D7-1).
Born-RED: zero `accent` in the single-source table; one edit there would lift 14 panes — and that edit
does not exist.

### SV-8 — ~18 copy sites; only 3 give feedback; one is a DEAD orphan (lane D, D7-4) — LIVE

```
$ grep -rln "copyToClipboard\|CopyIconButton" demo --include="*.vue" --include="*.ts" | wc -l   →  18
$ grep -rn "const copied = ref\|copied.value = true" demo --include="*.vue" | wc -l   →  7   (ad-hoc twins)
$ grep -c "onCopy\|<button\|DockIconButton\|<Button" demo/@/components/custom/gradient/GradientCodeEditor.vue   →  1
$ sed -n '5,6p;29p;126,130p' demo/@/components/custom/gradient/GradientCodeEditor.vue
5: import { Copy, Check } from "@lucide/vue";   6: import { copyToClipboard } from "@mkbabb/glass-ui";
29: const copied = ref(false);
126-130: async function onCopy() { await copyToClipboard(coalescedCSS); copied.value = true; setTimeout(…1500); }
```

**Confirmed:** 18 sites consume `copyToClipboard`/`CopyIconButton`; 7 hand-roll a `copied` ref twin; D7
§3.3 counts only **3 of ~20** giving any feedback (`MixResultDisplay`, the share-link label,
`ActionFeedback`), **15+ silent** (D7 `:110-122`). `GradientCodeEditor.vue:29,126-130` is a fully-wired
`copied`/`onCopy` with NO button in its template (the orphan proving the intent existed; D7 `:122-123`).
Born-RED: the copy-feedback is absent at 15+ sites and a dead orphan at one.

### SV-9 — Save and publish fire silently; the save sits ON the W10.C data-loss path (lane D, D7-5/D7-6) — LIVE

```
$ sed -n '59,63p' demo/@/composables/palette/usePaletteActions.ts
59:  async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
60:    await ensureUser();                              ← UNGUARDED network await
61:    const palette = deps.createPalette(name, colors); ← never runs on failure
$ sed -n '35,48p' demo/@/composables/palette/usePaletteActions.ts
35:  async function onPublish(palette): … { try { await ensureUser(); … } catch { return {success:false…} } … }
```

**Confirmed:** `onCurrentPaletteSaved` (`usePaletteActions.ts:59-63`) awaits `ensureUser()` BEFORE
`createPalette` — a down/failing backend aborts the LOCAL write and the palette is silently destroyed
(D7 §3.4; the W10.C save-P0; SAME mechanism N.W14.md SV-9 cites). The save fires NO beat today; the
publish path (`onPublish:35-48`) returns a textual `ActionFeedback` only — no gold moment (D7-6). Born-RED:
both moments are silent, and the save beat (D7-5) MUST wait on W10.C — a celebration on the data-loss
path "would be grotesque" (D7 §3.4).

### SV-10 — `document.startViewTransition` is unadopted though glass-ui SHIPS the CSS (lane B, D8-9) — LIVE

```
$ grep -rn "startViewTransition" demo --include="*.vue" --include="*.ts"   →  (exit 1, none)
$ ls node_modules/@mkbabb/glass-ui/dist/styles/view-transition.css   →  exists
```

**Confirmed:** the demo never calls `document.startViewTransition`, yet glass-ui ships
`view-transition.css` UNCONSUMED (D8-9; `WAVES-2.md:191`). Born-RED in the capability-PRESENT-but-
unadopted sense: the shipped primitive is reachable and unused.

### SV-11 — The structural class names are a 5-name tangle; no documented ladder (lane E, U12-naming) — LIVE

```
$ grep -rnoE "pane-shell|pane-wrapper|pane-container|pane-main|pane-card|picker-shell|about-card" demo --include="*.vue" --include="*.css" | grep -v node_modules
App.vue:25,71:pane-main   App.vue:27-31:pane-container   App.vue:45,58-59,315,323:pane-wrapper
ColorPicker.vue:2,286:pane-shell   AboutPane.vue:6:about-card
$ grep -rn "pane-card\|§Structure\|§Motion" demo/DESIGN.md   →  (the ladder + the table are absent)
```

**Confirmed:** five distinct structural names coexist (`pane-main`, `pane-container`, `pane-wrapper`,
`pane-shell`, `about-card`) with no `pane-card` and no documented 4-level ladder (`WAVES-2.md:194`
"`pane-shell`/`pane-wrapper` collapse; `about-card`/`picker-shell` → `pane-card`"). Born-RED: the tangle
+ the missing nomenclature doc are live.

### SV-12 — The X8 direct-hash boot cold-mounts into the hidden slot (lane E) — LIVE

```
$ sed -n '45p;67p' demo/@/composables/useViewManager.ts
45:  return isViewId(name) ? name : "picker";
67:  switchView("picker");
```

**Confirmed:** the boot resolves the hashed view via `isViewId` then defaults to `"picker"`; a direct
`#/palettes` cold-mount does not guarantee the addressed pane hydrates into the VISIBLE slot ("picker =
first on home, always" is not enforced at boot — X8; `WAVES-2.md:194`). Born-RED: the slot-hydration
residual is live in the router.

### SV-13 — The cross-wave gate-opener born-RED roots (W10.C / W10.D), proven on the live built demo

W17's π gate (the before/after motion + chrome pairs) is structurally blind until N.W10 lands — the
cascade kill means the desktop never renders (`EXECUTION-ORCHESTRATION.md:56-62`; inv-N-11). Both W10
roots are born-RED TODAY:

**The cascade kill (W10.D, U11's true root) — LIVE on the BUILT demo artifact:**
```
$ BD=dist/gh-pages/assets/index-OigTVKLL.css     # the SHIPPED demo CSS (built 2026-06-12)
$ grep -oE "@layer [a-z, _-]+\{" $BD | sort -u    →  base / components / properties / theme / utilities
# strip every balanced @layer block, then probe the display utilities that remain:
$ python3 strip-layers.py $BD                     →  UNLAYERED .hidden{display:none}  .flex{display:flex}  .block{display:block}  .grid{display:grid}
$ grep -c "@layer" node_modules/@mkbabb/glass-ui/dist/styles/components.css   →  0   (the producer root)
$ grep -c "\.hidden{display:none}" node_modules/@mkbabb/glass-ui/dist/styles/components.css   →  1   (unlayered)
```
The shipped `dist/gh-pages/assets/index-OigTVKLL.css` emits `.hidden{display:none}` (+ `.flex`/`.block`/
`.grid`) UNLAYERED while ALL responsive `lg:*` utilities sit inside `@layer utilities` — and the glass-ui
`components.css` it imports ships its utilities unlayered too (`@layer` count = 0). Per css-cascade-5 an
unlayered rule beats ALL layered rules, so the demo's layered `lg:*` (which drives the desktop dual-pane)
is overridden → the desktop never renders (D8-1 / U-DOCK §2). **Born-RED on the live built demo, not
merely the source.** This is the SAME artifact + mechanism N.W14.md SV-9 cites.

**The save-data-loss P0 (W10.C) — LIVE in source (SV-9):** `onCurrentPaletteSaved` awaits `ensureUser()`
before `createPalette` (`usePaletteActions.ts:60-61`) — the local-first contract inverted. This directly
bounds W17.D's save beat: the celebration must NOT fire on the data-loss path (D7 §3.4). Born-RED.

---

## §Goal

**Goal criterion.** The demo's shell and motion speak ONE coherent language. The dock is spacious (the
`spacious` density rung consumed, the glyph ratio held, the bespoke sub-floor hit-targets lifted, the
shell on a φ rhythm) with the first-paint expanded posture KEPT. Pane and card motion ride ≤3 semantic
families — exactly ONE demo-authored (`pane`) and `pop`/`fade`/`fade-slide` CONSUMED from glass-ui's
shipped vocabulary — the transition vocabulary CLOSED by a typed prop at the `PaneSlot` boundary, the
spring clock paired (the spring's own settle, not a mismatched fixed duration), the `grid 0fr→1fr` third
substrate retired onto the dock morph clock, the layout-prop transition moved to transform, and
`document.startViewTransition` adopted (PRM-gated) for the pane swap. The view-select moment reads as the
app's title: a display-voice trigger, a WatercolorDot active/ghost pair (the gray dot gone), per-view
semantic accents, an origin-anchored spring-scale open (the canned keyframe gone), and `pastel-rainbow-text`
dropped from the menu (color lives in the icon+dot system). A per-view `accent` threads through `VIEW_MAP`
to light the dock/trigger/header glyphs and un-mute the dropdown icon column. ONE `CopyIconButton`
primitive gives every copy site feedback (the glyph → Check tinted with the copied color, a spring pop,
PRM-gated), the save lands the staged-reveal beat (ONLY on a successful local save), and publish lands the
one gold-shimmer beat — the Family-B token FIRST consumers, BA-safe (tokens + shipped components only).
The structural names collapse to one ladder (`pane-main → pane-container → pane-slot → pane-card`), the
nomenclature standard is authored (`demo/DESIGN.md §Motion + §Structure`), the X8 direct-hash boot renders
the addressed pane visibly, and the dock inert/visibility pairing is asserted atomic.

**Completion criterion.** All §Hard-gate clauses verify against artefacts: the demo-authored
`*-enter-active` family count ≤ 3 (the grep SCOPED to demo CSS), of which exactly 1 is `pane`; the
`PaneSlot` transition prop is a typed union; the spring clock is paired; the `grid 0fr→1fr` substrate is
gone; `document.startViewTransition` is adopted PRM-gated; the dock band ≈ 64px spacious; the bespoke
sub-floor hit-targets are lifted; zero `pastel-rainbow-text` in menus; `VIEW_MAP` carries a per-view
`accent`; every copy site gives feedback through ONE primitive (the dead orphan deleted); the save beat
lands ONLY on a successful local save (W10.C first); the publish gold beat lands on `onPublish` success;
the structural names collapse to the ladder; `demo/DESIGN.md §Motion + §Structure` exists; the direct-hash
boot renders the addressed pane visibly; the dock inert/visibility pairing asserts atomic. The π VISUAL
gate is captured AFTER N.W10.D's cascade kill (the desktop renders).

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly the demo dock/shell, the pane/card transition CSS + the `PaneSlot` seam, the
view-select component, `VIEW_MAP`, the copy sites, the save/publish action handlers (the BEAT only — not
the W10.C save fix), the structural class names, the router boot, and `demo/DESIGN.md`. It CONSUMES
glass-ui's shipped `density` rung, `pop`/`fade`/`fade-slide` families, `view-transition.css`, and the
Family-B canon tokens (it does NOT author motion CSS into glass-ui). No library source, no test/CI edits.
(DEVELOPMENT doc — SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — Dock scale (U32-dock)** | `density="spacious"` (the rung consumed — D5 WO-D5-1) + the glyph-ratio override (`--dock-icon-glyph: 1.375rem` to hold the ratio at the 44px controls); hit-target floor on the 22/24px bespoke sites (the slug-edit + trigger ⋮ controls under the WCAG 2.5.8 24px floor — D5 WO-D5-2); the shell φ rhythm (inset 13 / clearance 34); the first-paint expanded posture KEPT (recorded — no re-litigation) | `Dock.vue:93,91,101-102,112,148,198-199`; `SlugEditLayer.vue`; `style.css:128,148` | the dock-density seam — consume the shipped rung, hold the glyph ratio, clear the WCAG floor |
| **B — Motion unification (U12-motion)** | The 12 demo-authored `*-enter-active` families → **≤3 semantic (pane / pop / fade)**: the demo AUTHORS only `pane`; `pop` + `fade`/`fade-slide` are CONSUMED from glass-ui's shipped vocabulary (the names collide with the producer's — consume, never re-author) + `transitionName` TYPED at the `PaneSlot` prop boundary (the vocabulary closed by the type system, the L idiom); the spring-clock fix (`--spring-snappy` × `--duration-slow` → the spring's own settle now, the paired `--spring-*-duration` tokens at the pin); RETIRE the `grid 0fr→1fr` third substrate onto the dock morph clock; ADOPT `document.startViewTransition` in `PaneSlot` (PRM-gated; glass-ui's `view-transition.css` ships unconsumed — D8-9); the `.pane-wrapper` layout-prop transition → transform (LP3-3c) | `App.vue:331-368,315-319,39,51,66`; `PaneSlot.vue:22,35`; `Dock.vue:213-227` | the motion-vocabulary seam — one demo family, the rest consumed; the type system closes the set |
| **C — The view-select moment (U12 / D5-12)** | The trigger goes display-voice (Fraunces, `text-title` rung in the spacious trigger — the app's TITLE deserves it); menu rows ≥ 40px at trigger-parity-minus-one; the 8px gray dot → the `WatercolorDot` active/ghost pair; per-view semantic accents (consumes lane D's `VIEW_MAP.accent`); `pastel-rainbow-text` DROPPED from the menu row (color lives in the icon+dot system); open = origin-anchored scale on `--spring-snappy` (the canned 0.15s keyframe dies) | `DockViewSelect.vue:52-64,76-89` | the view-moment seam — the title in display voice, color via the icon+dot system, a spring-scale open |
| **D — Icon energy + celebration (the Family-B first consumers)** | D7-1 `accent` per view in `VIEW_MAP` (dock pill glyph, trigger glyph, PaneHeader tick — ONE edit lifts 14 panes); D7-2 un-mute the dropdown icon column (reduced-chroma tints, full on active/hover); D7-4 ONE `CopyIconButton` primitive at all ~18 copy sites (glyph→Check tinted with the copied color, `--spring-bouncy` pop, PRM-gated; retires the 7 ad-hoc twins + the dead `GradientCodeEditor` orphan); D7-5 save = the staged-reveal beat (+ AnimatedDigit count tick) ONLY after the W10.C fix; D7-6 publish = the one gold-shimmer beat. **BA-safe**: tokens + shipped components only — `sparkle-sweep`/`btn-audacious` die at the BA cut, NEVER consume them | `viewSchema.ts:69-76`; `DockViewSelect.vue:78-89`; `GradientCodeEditor.vue:29,126-130`; `usePaletteActions.ts:48,59-63`; D7 §3.3 census | the energy seam — color per view, one copy primitive, the Family-B canon's first beats |
| **E — Nomenclature + shell robustness (U12-naming)** | The standing vocabulary doc (`demo/DESIGN.md §Motion + §Structure`): the View/Pane/Card/Layer/Sheet table + the 4-level ladder (`pane-main → pane-container → pane-slot → pane-card`; ONE name per role — `pane-shell`/`pane-wrapper` collapse; `about-card`/`picker-shell` → `pane-card`); the X8 direct-hash boot residual (`#/palettes` cold-mounts into the hidden slot; `usePaneRouter`/`useViewManager` slot hydration + "picker = first on home, always"); the dock inert/visibility atomic-pairing assert (D8-3b) | `App.vue:25-71`; `ColorPicker.vue:2,286`; `AboutPane.vue:6`; `useViewManager.ts:45,67`; `usePaneRouter.ts` | the nomenclature seam — one name per role, documented; the boot residual + the a11y pairing closed |

**Note on lane B vs the gate's SCOPED grep.** The hard gate counts DEMO-authored `*-enter-active` CSS
only (SV-1). glass-ui ships 8 families (`transitions.css`); the demo consumes `pop`/`fade`/`fade-slide`
with zero demo CSS. After W17.B, the demo authors exactly `pane` (1 family); `pop`/`fade` remain CONSUMED.
A naive grep over `node_modules` would count 8 producer families and never go green — the gate is scoped
to `demo/**` (`WAVES-2.md:196-197`, the K1-F1 fix).

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today (per
the SV-N probes). For the BA-gated halves (the paired-token consume, the per-density glyph, the dock-FLIP
fix) the born-RED is the **capability-present-but-not-yet-paired** sense (the mis-clocked settle is LIVE —
SV-3 — and the matched token exists in the producer dist, unconsumed); for the view-transition adopt it is
the **capability-present-but-unadopted** sense (SV-10). P6 posture (the π / measured-evidence discipline)
is named per clause. **This rides N.W17's WAVES-2 gate verbatim** (`WAVES-2.md:196-200`) — the clauses
below decompose it.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A1** | The dock consumes `density="spacious"`; the dock band ≈ 64px spacious; the first-paint expanded posture is KEPT | `grep 'density="spacious"' Dock.vue` present; a DOM probe of the expanded dock height ≈ 64px @ desktop | YES — SV-5: no `density=` anywhere; the default `comfortable` rung (55px) | **DOM measurement** — the band height is the measured property |
| **HG-A2** | The bespoke sub-floor hit-targets (slug-edit 22×22, trigger ⋮ 24×24) are lifted to ≥ 24px (desktop WCAG 2.5.8); the glyph ratio is held via the `--dock-icon-glyph` override | a tap-target census over the dock controls (every interactive ≥ 24px); grep the glyph override present | YES — SV-5 + D5 WO-D5-2: the 22/24px bespoke sizes sit under the floor | **per-control tap-target census** (the count is measured) |
| **HG-B1** | The DEMO-authored `*-enter-active` family count ≤ 3, of which exactly 1 (`pane`) is demo-authored; `pop`/`fade`/`fade-slide` remain CONSUMED (zero demo CSS) | `grep -rhoE "\.[a-z-]+-enter-active" demo --include=*.vue --include=*.css \| sort -u \| wc -l` ≤ 3; the `pane` family present; no demo `.pop-enter-active`/`.fade-enter-active` | YES — SV-1: 12 demo-authored families live | **grep-census, SCOPED to demo CSS** (the K1-F1 scope) |
| **HG-B2** | `PaneSlot.transitionName` is a TYPED union (not free-form `string`) — the vocabulary closed by the type system | `grep "transitionName:" PaneSlot.vue` shows a union (`"pane" \| "pop" \| "fade" \| ""`), `tsc --noEmit` rejects a non-member name | YES — SV-2: `transitionName: string` | **type-shape proof** (the union inverts the unbounded string) |
| **HG-B3** | The spring clock is PAIRED — no `--spring-*` easing × `--duration-*` fixed duration mismatch on the pane families; the `grid 0fr→1fr` third substrate is GONE; the `.pane-wrapper` transitions transform (not layout props) | grep the mis-paired `var(--duration-slow) var(--spring-snappy)` gone from `App.vue`; grep `grid-template-columns: 0fr` gone from `Dock.vue`; grep `transition: height/margin/padding` gone | YES — SV-3 (mis-paired clock + layout-prop) + SV-4 (`grid 0fr→1fr`) | **grep-absence proof** + **π smoothness pair** (the settle reads natural) |
| **HG-B4** | `document.startViewTransition` is ADOPTED in `PaneSlot` (PRM-gated) — the shipped `view-transition.css` consumed | `grep "startViewTransition" PaneSlot.vue` present, behind a `matchMedia('(prefers-reduced-motion: reduce)')` guard | YES — SV-10: zero `startViewTransition`, the CSS shipped-unconsumed | **adoption proof** + **PRM-gate proof** |
| **HG-C** | The view-select trigger is display-voice (Fraunces `text-title`); the 8px gray dot → WatercolorDot active/ghost pair; per-view accents; the open is an origin-anchored spring-scale (the canned keyframe gone); `pastel-rainbow-text` is ABSENT from the menu row | the π view-select element pair (closed→open) showing the display trigger + the WatercolorDot pair + the spring-scale open; `grep "pastel-rainbow-text" DockViewSelect.vue` = 0 | YES — SV-6: `font-display font-normal` trigger, 8px gray dot, binary icons, `pastel-rainbow-text:88` | **π before/after element pair** (closed/open) + **grep-absence** |
| **HG-D1** | `VIEW_MAP` carries a per-view `accent` (the single source); the dock/trigger/PaneHeader glyphs + the dropdown column consume it (reduced chroma resting, full on active/hover) | `grep "accent" viewSchema.ts` present in `PaneConfig` + every `VIEW_MAP` entry; the dropdown column tints per-view (π pair) | YES — SV-7: zero `accent` in the table; the column is binary gray-vs-accent | **source-presence proof** + **π dropdown pair** |
| **HG-D2** | ONE `CopyIconButton` primitive at every copy site; the glyph→Check tints with the copied color + a spring pop (PRM-gated); the 7 ad-hoc twins + the dead `GradientCodeEditor` orphan are RETIRED | `grep "const copied = ref" demo` = 0 (no hand-rolled twins); the dead `onCopy`/`copied` block gone from `GradientCodeEditor.vue`; every §3.3 site renders `CopyIconButton` | YES — SV-8: 18 sites / 3 feedback / 7 twins / 1 dead orphan | **grep-census** (twins → 0) + **π copy pair** |
| **HG-D3** | The save beat lands ONLY on a successful LOCAL save (the staged-reveal + the AnimatedDigit count tick); the publish gold beat lands on `onPublish` success; both use the Family-B canon tokens + shipped components ONLY (no `sparkle-sweep`/`btn-audacious`) | the π save pair (3→4 count tick on success); the π publish pair (gold shimmer on success); grep the forbidden BA-retired classes absent | YES — SV-9: both moments silent; the save sits on the W10.C data-loss path | **π before/after pair** (save + publish) — gated on W10.C first |
| **HG-E1** | The structural names collapse to the ladder (`pane-main → pane-container → pane-slot → pane-card`); `pane-shell`/`pane-wrapper`/`about-card`/`picker-shell` are GONE; `demo/DESIGN.md §Motion + §Structure` exists | `grep -rE "pane-shell\|about-card\|picker-shell" demo` = 0; `grep "§Structure" demo/DESIGN.md` present; the ladder is the only structural vocabulary | YES — SV-11: 5-name tangle, no `pane-card`, no doc | **grep-census** + **doc-presence proof** |
| **HG-E2** | A direct `#/palettes` cold boot renders the ADDRESSED pane visibly (not the hidden slot); the dock inert/visibility pairing is asserted ATOMIC (D8-3b) | a boot probe at `#/palettes` asserting the addressed pane's slot `display ≠ none`; the inert↔visibility assert green | YES — SV-12: the boot defaults to `"picker"` without slot-visibility enforcement | **boot probe** (the addressed slot visible) + **a11y pairing assert** |
| **HG-gate-opener** | The π element-pair evidence (HG-B3/C/D1/D2/D3) is captured AFTER N.W10.D's cascade kill lands — until the desktop renders, in-viewport element shots are structurally blind (inv-N-11) | the π captured against a rendering desktop (W10.D `display ≠ none @1440` assert green) | YES — SV-13: the built demo emits unlayered `.hidden{display:none}` → desktop dead | **cross-wave precondition** — W10.D is the substrate gate |

**The gate-opener precondition (cross-wave, BINDING).** Per `EXECUTION-ORCHESTRATION.md:56-62`, W10 is the
gate-opener: until the cascade kill (SV-13) closes, the desktop dual-pane never renders, so EVERY W17 π
element-shot (the motion-smoothness, view-select, dropdown, copy, save, publish pairs) is structurally
blind — the same blindspot class kf-K's cold-axis invariant names. W17's SOURCE-SHAPE gates (HG-B1, HG-B2,
HG-B4, HG-D1-source, HG-D2-grep, HG-E1) are demo-INDEPENDENT and provable WITHOUT the demo rendering. Only
the VISUAL π pairs sit behind W10.D. The source gates do not wait; the π does. The save beat (HG-D3)
additionally waits on W10.C — the beat must not fire on the data-loss path (SV-9).

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO re-authored `pop`/`fade`/`fade-slide` in demo CSS.** glass-ui SHIPS these families
  (`transitions.css:23,63`); the demo already consumes them with ZERO demo CSS at 7 sites (SV-1). The demo
  AUTHORS only `pane`. Re-authoring a demo `.pop-enter-active`/`.fade-enter-active` because "it's one
  selector" re-forks the producer's vocabulary (the name-collision the wave exists to resolve;
  `WAVES-2.md:191` "the names collide with the producer's shipped vocabulary — consume, never re-author").
- **NO un-typed transition `:name`.** The vocabulary is closed by the TYPE SYSTEM at the `PaneSlot`
  boundary (`transitionName: "pane" | "pop" | "fade" | ""`), not by convention. Leaving `transitionName:
  string` (SV-2) keeps the set unbounded — the forbidden half-fix (the L idiom: the vocabulary the type
  system enforces).
- **NO new `--duration-celebration` / `--spring-*` token namespace.** The save/publish/copy beats consume
  the EXISTING Family-B canon (`--spring-bouncy`/`--spring-smooth`/`--motion-duration-staged` + the
  `--spring-*-duration` paired tokens at the pin) — D7 WO-D7-7 "one canon, no token forks." Minting a
  parallel celebration namespace is forbidden.
- **NO `sparkle-sweep` / `btn-audacious` consume.** These are BA-RETIRED at the cut (`WAVES-2.md:193`
  "BA-safe: tokens + shipped components only — `sparkle-sweep`/`btn-audacious` die at the BA cut, never
  consume them"). The celebration beats use ONLY the canon tokens + shipped components; consuming a
  to-be-deleted class is the inv-N-10 anti-pattern (a fossil the instant BA cuts).
- **NO retuning `DOCK_SPRING` / the dock morph constants.** The dock morph spring is fenced (correct — do
  NOT retune; `WAVES-2.md:146` "`DOCK_SPRING` is fenced"). The U6/U16 morph DEFECT is a glass-ui FLIP
  measure bug (A-1), fixed in the producer and VERIFIED at W18 — NOT a demo spring retune. W17.A does the
  density/shell/hit-target work BESIDE the producer fix, never the spring.
- **NO celebrating on the data-loss path.** The save beat (D7-5) MUST land AFTER the W10.C local-first save
  fix (SV-9). Wiring the staged-reveal + count-tick on top of `onCurrentPaletteSaved`'s current
  `await ensureUser()`-then-`createPalette` order would fire the celebration while the save silently
  destroys the palette (D7 §3.4 "celebrating a failed save would be grotesque"). Forbidden.
- **NO authoring motion/view-transition CSS into glass-ui.** glass-ui ships `transitions.css`,
  `view-transition.css`, and the density rungs. The demo CONSUMES them. value.js does NOT author a
  pane-transition primitive or a density rung into glass-ui (`N.md §8` — asks, not value.js writes; inv-16).
  The one OPEN ask is the per-density glyph base (D5 WO-D5-1's "companion glass-ui ask") — FILED, consumed
  at W18, with the `--dock-icon-glyph` override as the demo interim until then.
- **NO `pastel-rainbow-text` in the menu row "for flavor".** Color in the view-select lives in the icon +
  WatercolorDot-dot system (lane C/D), not in rainbow row text (`WAVES-2.md:192`). Keeping
  `DockViewSelect.vue:88`'s `pastel-rainbow-text` (SV-6) because "it's only the palettes row" is the
  forbidden retention — the menu's color is per-view semantic, not a single rainbow gradient.
- **NO `file:` link / vendored copy across the spine.** The density rung, `pop`/`fade`/`fade-slide`,
  `view-transition.css`, `WatercolorDot`, the AnimatedDigit, and the Family-B tokens are consumed as
  PUBLISHED glass-ui dependencies (3.13.0 now, the BA cut at W18) — NEVER a `file:` link to glass-ui's WIP
  tree, NEVER a vendored copy in the demo (contract-v2; `cross-repo-dev-resolution.md §2.4`). The demo
  resolves glass-ui's `dist/` through the `exports` map.

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Row | Finding / lane | Lane here | Discharge |
|---|---|---|---|
| **U12** — "pane + card transitions not smooth — refine on glass-ui springs; STANDARDIZE the pane/card nomenclature" (the headline) | `LEDGER.md:32`; U-DOCK §3 `:220-262` | **B** (motion) + **E** (nomenclature) | the 12 demo families → ≤3 semantic (1 demo-authored); the spring clock paired; the typed prop; the 4-level ladder + `DESIGN.md §Motion + §Structure` |
| **U32** (dock half) — "dock bigger; less cramped/more accessible" | `LEDGER.md:17`; D5 §2 `:70-91` | **A** | `density="spacious"` consumed; the glyph ratio held; the hit-target floor cleared; the shell φ rhythm (the layout half = W12.C) |
| **U6 / U16** (demo-side) — the dock morph slow/jittery | `LEDGER.md` U6/U16; U-DOCK §1 `:25-136` | **A** (beside the producer fix) | W17.A does the density/shell work; the FLIP fix is glass-ui A-1, VERIFIED at W18 (`DOCK_SPRING` fenced — no demo retune) |
| **D7-1** — semantic accent per view in `VIEW_MAP` | D7 §3.2 `:55-63`; `viewSchema.ts:69-76` | **D** | `accent: string` on `PaneConfig` + every `VIEW_MAP` entry; the dock/trigger/PaneHeader glyphs consume it (one edit lifts 14 panes) |
| **D7-2** — un-mute the dropdown icon column | D7 §3.2 `:64-72`; `DockViewSelect.vue:80-85` | **D** (+ **C** for the dot) | reduced-chroma per-view tints resting, full on active/hover; the 2px dot takes the accent |
| **D7-4** — ONE `CopyIconButton` (not 15 patches) | D7 §3.3/§3.5 `:110-156`; `GradientCodeEditor.vue:29,126-130` | **D** | one primitive at all ~18 copy sites; glyph→Check tinted with the copied color + a spring pop (PRM-gated); the 7 twins + the dead orphan retired |
| **D7-5** — save = the staged-reveal beat | D7 §3.5 `:157-162`; `usePaletteActions.ts:59-63` | **D** (after **W10.C**) | the staged entrance + the AnimatedDigit 3→4 tick, ONLY on a successful local save (the W10.C fix precedes) |
| **D7-6** — publish = the gold moment | D7 §3.5 `:163-170`; `usePaletteActions.ts:48` | **D** | the one `.gold-shimmer` pass over the palette name on `onPublish` success (the BA-kept gold register) |
| **D8-9** — view transitions (glass-ui `view-transition.css` unconsumed) | D8 (D8-9 row); `WAVES-2.md:191` | **B** | `document.startViewTransition` adopted in `PaneSlot` (PRM-gated); the shipped CSS consumed |
| **D8-3b** — the dock inert/visibility atomic pairing | D8 (D8-3b row); `WAVES-2.md:194` | **E** | the assert that inert and visibility flip together (no focusable-but-hidden dock layer) |
| **X8** — the pane-router direct-hash boot residual | `WAVES-2.md:361,194`; `useViewManager.ts:45,67` | **E** | `#/palettes` cold boot hydrates the addressed pane into the VISIBLE slot; "picker = first on home, always" |
| **LP3-3c** — `.pane-wrapper` layout-prop transition → transform | `WAVES-2.md:191`; `App.vue:315-319` | **B** | the `height`/`margin`/`padding` transition moved to `transform` (the reflow class dies) |

**NOT folded here (explicitly routed elsewhere — zero drops, P-Inv 28):**
- **The save-data-loss P0** (the local-first `createPalette`) → **N.W10.C** — W17.D's save beat DEPENDS on
  it being fixed first (SV-9; §No-workaround). W17 wires the BEAT, not the fix.
- **The layout clamp / container-query system + the dock band's LAYOUT half** → **N.W12.C** — W17.A does the
  dock DENSITY/shell/hit-target; the per-card width clamp + the portrait law are the keystone's
  (`WAVES-2.md:91,350` "U32 → W12.C layout (dock half = W17.A)").
- **The display-rung promotion** (the trigger's `text-title` rung, the PaneHeader hero/companion ramp) →
  **N.W12.E** — W17.C/D CONSUME the W12.E rungs; the rung definition is the keystone's (`WAVES-2.md:93`).
- **The `--spring-*-duration` paired-token consume + the per-density glyph base** → **N.W18.A** — W17.B/A use
  the interim (the spring's own settle now; the `--dock-icon-glyph` override) until the BA pin
  (`WAVES-2.md:191` "the `--spring-*-duration` tokens at the pin"; D5 WO-D5-1 the glyph ask).
- **The U6/U16 dock-FLIP fix** (the nested-DockLayerGroup `to:0px` measure) → **glass-ui A-1**, VERIFIED at
  **N.W15.D/N.W18.A** — a glass-ui producer fix, not a demo change (`WAVES-2.md:155-162`; U-DOCK §4).
- **The dark-arm atmosphere re-verify** (D5-10) → **N.W18.A** (the BA `W-DARK-MATERIAL`/`W-STAGE` verify) —
  a pin-verify, not W17 work (D5 WO-D5-10).

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

### Cross-wave (within N)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W10.D → N.W17 (π)** | W10 lands FIRST | The cascade kill (SV-13) MUST close before W17's π element pairs are meaningful — until the desktop renders, in-viewport motion/chrome shots are structurally blind (inv-N-11). W17's SOURCE gates (HG-B1/B2/B4/D1-source/D2-grep/E1) are demo-independent; only the π pairs wait. |
| **N.W10.C → N.W17 (D)** | W10 lands FIRST | The save beat (D7-5, HG-D3) depends on the local-first save fix (SV-9). W17.D wires the BEAT; W10.C makes the underlying save honest. The beat must not celebrate on the data-loss path. |
| **N.W12.E → N.W17 (C/D)** | W12 lands FIRST | The view-select trigger's `text-title` display rung + the PaneHeader hero/companion ramp are W12.E's; W17.C/D APPLY them (`WAVES-2.md:93`). W17 does not mint type rungs. |
| **N.W12 (spring clock) → N.W17 (B)** | W12 informs | The W12 keystone touches the spring/duration ladder; W17.B's clock fix (the spring's own settle now) is reconciled with the keystone's token grammar; the paired `--spring-*-duration` consume lands at W18 (`WAVES-2.md:37` "spring-clock tokens refine at pin"). |
| **N.W15 ∥ N.W17** | siblings, R3 | The U6/U16 dock-FLIP HARNESS (the morph-truth e2e) is W15.D's, born-RED until glass-ui A-1 (`WAVES-2.md:152`). W17.A does the dock density/shell; the morph fix verify is W15.D/W18.A. No file overlap (Dock density CSS vs the FLIP measure). |
| **N.W16 ∥ N.W17** | siblings, R3 | The per-pane content (the picker hero, the mix reveal beat WO-M1, the docs) is W16's; W17 supplies the shell/motion vocabulary + the celebration primitive the panes' beats ride. The Mix reveal's duration family is the same Family-B canon (D7 WO-D7-7). |

### Cross-repo (the acyclic spine — glass-ui one tranche ahead, PUBLISHED-consume)

| Boundary | Direction | Binding contract |
|---|---|---|
| **glass-ui 3.13.0 → N.W17 (A/B/C/D)** | glass-ui publishes; value.js demo consumes | The `spacious` density rung (`dock/density.css`), the `pop`/`fade`/`fade-slide` families (`transitions.css`), `view-transition.css`, `WatercolorDot` (the `@mkbabb/glass-ui/watercolor-dot` subpath), `./animated-digit`, and the Family-B canon tokens are consumed from the PUBLISHED glass-ui 3.13.0 dist (SV-1/SV-5/SV-10 verified). NEVER a `file:` link or vendored copy (contract-v2; `cross-repo-dev-resolution.md §2.4`). |
| **glass-ui BA cut (4.0.0) → N.W17 (A/B) → N.W18.A** | glass-ui publishes BA; value.js consumes one beat behind | (1) The U6/U16 dock-FLIP fix (the nested-DockLayerGroup `to:0px` measure → A-1) is VERIFIED at W18.A — the W15.D morph-truth harness flips green (`WAVES-2.md:223`). (2) The paired `--spring-*-duration` tokens replace W17.B's interim settle (`WAVES-2.md:191`). (3) The per-density `--dock-density-<rung>-icon-glyph` base replaces W17.A's `--dock-icon-glyph` override (D5 WO-D5-1's companion ask). All three are interims that DIE at the pin. |
| **The ownership boundary** | demo / primitive | The demo owns the pane-transition CSS, the `PaneSlot` shell, `VIEW_MAP`, the `CopyIconButton` primitive (demo-owned — it composes domain copy actions), the nomenclature ladder, and the celebration WIRING. glass-ui owns the density rung, the transition families, the view-transition CSS, `WatercolorDot`, the AnimatedDigit, and the Family-B canon tokens. value.js does NOT author motion/density/celebration primitives into glass-ui (`N.md §8`; inv-16). |

### The interim-death ledger (what dies at W18, named)

| W17 interim | Dies at | On consuming |
|---|---|---|
| The spring's-own-settle clock (W17.B) | W18.A | the paired `--spring-*-duration` tokens (`WAVES-2.md:191`) |
| The `--dock-icon-glyph: 1.375rem` ratio override (W17.A) | W18.A | the per-density `--dock-density-<rung>-icon-glyph` base (D5 WO-D5-1 ask) |
| The W15.D morph-truth harness born-RED (the demo-side dock morph) | W18.A | the glass-ui A-1 FLIP-measure fix (U-DOCK §4) |

The W18 hard gate greps the named interims → 0 (`WAVES-2.md:230` "zero interim shims surviving").

---

## §Design-decisions — trade-offs RESOLVED

1. **One demo family, the rest consumed (not three demo families).** RESOLVED: the demo AUTHORS only
   `pane`; `pop` and `fade`/`fade-slide` are CONSUMED from glass-ui's shipped vocabulary (SV-1). The
   tempting reading of "≤3 semantic families" is "author all three in the demo" — but `pop`/`fade-slide`
   already exist in `transitions.css` and the demo consumes them with zero CSS at 7 sites. Re-authoring
   them re-forks the producer (the name-collision the wave resolves). The gate grep is therefore SCOPED to
   demo CSS — counting the producer's 8 shipped families would never go green (the K1-F1 fix,
   `WAVES-2.md:407-410`).

2. **The vocabulary is closed by the TYPE SYSTEM, not convention.** RESOLVED: `PaneSlot.transitionName`
   becomes a typed union (`"pane" | "pop" | "fade" | ""`), not free-form `string` (SV-2). A convention
   ("only use these three") re-rots the instant a fourth name is passed; the union makes a non-member name a
   `tsc` error (the L idiom — the vocabulary the type system enforces). The alternative (a lint rule) is a
   second mechanism for what the type already proves — rejected (KISS).

3. **The spring clock is paired NOW, the matched token at the pin.** RESOLVED: `--spring-snappy` ×
   `--duration-slow` (SV-3) is a spring easing forced into a fixed duration it never agrees with — the U12
   "not smooth" root. W17.B pairs the spring with ITS OWN settle now (the interim); the glass-ui
   `--spring-*-duration` matched pair (e.g. `--spring-dock-duration`) is consumed at W18 (`WAVES-2.md:191`).
   Pairing now and refining at the pin is the measure-first move — the smoothness is testable immediately,
   the canonical token lands when BA publishes it.

4. **The `grid 0fr→1fr` substrate is RETIRED onto the dock morph clock, not kept.** RESOLVED: the
   `.action-bar-toggle-slot` `grid-template-columns: 0fr → 1fr` (SV-4) is a THIRD motion idiom — neither the
   Vue `<Transition>` family nor the JS-spring dock morph. The fix folds it onto the dock morph clock
   (`WAVES-2.md:191` "retire the `grid 0fr→1fr` third substrate onto the dock morph clock"); keeping it as a
   "harmless one-off" preserves the three-substrate split U12 names. Rejected.

5. **View transitions are ADOPTED PRM-gated, not authored.** RESOLVED: glass-ui ships `view-transition.css`
   UNCONSUMED (SV-10, D8-9). W17.B adopts `document.startViewTransition` in `PaneSlot` behind a
   `prefers-reduced-motion` guard — consuming the shipped primitive (not writing a new transition substrate).
   The PRM gate is non-negotiable (inv-N-9's spirit; an un-gated view transition is the live-RAF class).

6. **Color in the view-select lives in the icon+dot system, not rainbow row text.** RESOLVED: the
   `pastel-rainbow-text` on the `palettes` menu row (SV-6) is DROPPED; per-view color comes from the
   `VIEW_MAP.accent` glyph tints + the WatercolorDot active/ghost dot pair (lanes C/D). A single rainbow
   gradient on one row's text is the opposite of a per-view SEMANTIC color system — the menu becomes "the
   app's table of contents in color" (D7-2), one accent per view, not one rainbow on one row.

7. **`accent` lives in `VIEW_MAP` (the single source), not per-consumer.** RESOLVED: the per-view accent is
   a `PaneConfig.accent` field (SV-7) — `VIEW_MAP` is the single source (D.W3 Lane D), so ONE edit lights
   the dock pill, the trigger glyph, the PaneHeader tick, and the dropdown column (D7-1, "one file lifts 14
   panes"). Scattering an accent literal at each consumer re-creates the 4-copy drift `VIEW_MAP` exists to
   prevent.

8. **ONE `CopyIconButton`, not 15 patches (KISS).** RESOLVED: a single demo-owned `CopyIconButton`
   primitive at every copy site (SV-8) — glyph→Check tinted with the copied color (the copied color IS the
   confirmation), a `--spring-bouncy` pop, PRM-gated (D7-4). It retires the 7 hand-rolled `copied` twins AND
   deletes the dead `GradientCodeEditor` orphan. Patching each site individually (15 near-identical edits) is
   the anti-fix the wave exists to retire. The primitive is demo-owned (it composes domain copy actions),
   not a glass-ui ask.

9. **The save beat waits on W10.C; celebrations are BA-safe.** RESOLVED: the save staged-reveal + count tick
   (D7-5) lands ONLY after the W10.C local-first fix (SV-9) — celebrating a failed save "would be grotesque"
   (D7 §3.4). The save/publish/copy beats consume ONLY the Family-B canon tokens + shipped components
   (`--spring-bouncy`/`--spring-smooth`/`.gold-shimmer`/AnimatedDigit) — NEVER `sparkle-sweep`/`btn-audacious`,
   which BA RETIRES (`WAVES-2.md:193`). Consuming a to-be-deleted class is the inv-N-10 fossil anti-pattern.

10. **The dock spring is fenced; W17.A does the shell, not the morph.** RESOLVED: the U6/U16 morph defect is
    a glass-ui FLIP MEASURE bug (the nested-DockLayerGroup measures `to:0px`, U-DOCK §1), fixed in the
    producer (A-1) and VERIFIED at W18 via the W15.D harness. `DOCK_SPRING` is correct and fenced
    (`WAVES-2.md:146`). W17.A does the DENSITY rung consume, the glyph ratio, the hit-target floor, and the
    shell φ rhythm — never a spring retune. Conflating the demo density work with the producer morph fix
    would mask the real (producer) defect behind a demo tweak — rejected.

11. **The nomenclature is documented AND enforced by collapse, not just renamed.** RESOLVED: the 5-name
    tangle (SV-11) collapses to one ladder (`pane-main → pane-container → pane-slot → pane-card`) AND the
    standing `demo/DESIGN.md §Motion + §Structure` doc records the View/Pane/Card/Layer/Sheet table (U12 asks
    for the standard, not just a rename). One name per role, documented, so the next author cannot re-mint
    `picker-shell`. The doc is the durable artifact; the grep-absence (`pane-shell`/`about-card` → 0) is the
    enforcement.

12. **The first-paint expanded dock posture is KEPT (recorded — no re-litigation).** RESOLVED: W17.A
    consumes the `spacious` rung and holds the glyph ratio, but the dock's first-paint EXPANDED state stays
    (`Dock.vue:93` `:start-collapsed="false"`) — a deliberately-recorded prior decision
    (`WAVES-2.md:190` "first-paint expanded posture KEPT (recorded — no re-litigation)"). The density change
    is orthogonal to the expand/collapse posture; bundling a collapse-on-boot change here would re-open a
    closed decision. Out of scope by design.
