claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryDraftsSection.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryDraftsSection.vue` (108 lines, 3 965 B).
**Stance.** Assumed DEFECTIVE until the tree proved otherwise. Two claims I opened with were killed by their
own falsifiers and are recorded as **REFUTED** (§7) rather than quietly dropped — L-18 runs both ways.
**Method.** Static + source-derived only. Every glass-ui claim is read off the *installed* `4.0.0` tree
(`web/node_modules/@mkbabb/glass-ui`, `package.json:version = "4.0.0"`) and the *producer* `7.0.0` tree
(`/Users/mkbabb/Programming/glass-ui`, `package.json:version = "7.0.0"`), both read-only. No browser.
Livable-only claims carry **UNPROVEN-NEEDS-LIVE** for SS-13.

**Read whole (read-only):** the subject; `web/src/lib/types.ts:83-92` (`WorkspaceDraft`); `web/src/lib/api.ts:292-294`
(`thumbnailUrl`); `web/src/components/visualization/lib/basis-display.ts` (whole, 7 lines); `web/src/lib/colors.ts`;
`web/src/components/visualization/GalleryView.vue` (the sole consumer, `:29`, `:356-371`, `:200-215`, `:72-81`);
glass-ui 4.0.0 `dist/button-BNDWhAZb.js`, `dist/MetricBadge-BpC0R_Ec.js`, `dist/collapsible.d.ts`,
`src/styles/utilities/base.css`, `src/styles/utilities/a11y-overrides.css`, `src/styles/tokens/{offsets-sizing,
color-radius,light-dark,dark-arm,scale-paper}.css`, `src/styles/theme/bridges.css`, `src/styles/typography/utilities.css`;
glass-ui 7.0.0 `src/components/button/Button.vue`, `src/components/metric/{Metric.vue,types.ts,index.ts}`;
`lucide-vue-next@1.0.0 dist/esm/Icon.js`; peer siblings `GalleryCard.vue`, `GalleryCardModal.vue`, `GalleryAdminBanner.vue`,
`AdminUserList.vue`, `AdminFlaggedPanel.vue`, `ui/CollapsibleSection.vue`; `web/src/style.css`.

**Verdict.** **DEFECTIVE.** 2 BLOCKER · 9 MAJOR · 12 MINOR · 6 INFO = **29 defects**, **7 superlatives**.
The governing finding is not any single line: it is that this file is a **hand-rolled fork of
`web/src/components/ui/CollapsibleSection.vue`** that copied the sibling's typography *byte-for-byte* while
dropping its ARIA, its content transition, and its reduced-motion guard (§1 · M-1/M-2) — and that it is the
**sole survivor** of the repo's own `D.W4.c` keyboard-accessibility sweep (§1 · B-1). Both are provable from
in-repo provenance comments, not from taste.

---

## §0 · Corpus fold (hitherto — cited, not re-invented)

| Source | Row | This challenge |
|---|---|---|
| `formation/fourier/lane-frontend.md:110` | inventories the subject at 108 lines, "Draft list" | adopted verbatim; line count re-measured `wc -l` → 108 ✓ |
| `formation/fourier/lane-frontend.md:213, 344-345, 472` | `./metric-badge` REMOVED at 7.0.0; subject at `:8` is one of the 7 import sites | **extended** at M-6: the *replacement's* prop/geometry delta, and the root-element change `div`→`span` that silently cures m-2 |
| `formation/fourier/lane-frontend.md:639` §9 ¶4 | "[P1] 11 removed-subpath import sites" | adopted; subject contributes 1 |
| `formation/fourier/CENSUS-2026-08-03.md:63` **C-4** | corrects "7 imports / 6 files" → **7 files**; "Budget 7 files for the `./metric` cure" | adopted; the subject is one of the 7 |
| `formation/fourier/CENSUS-2026-08-03.md` §prefers-reduced-motion | 8 CSS `reduce` blocks enumerated, incl. `ui/CollapsibleSection.vue:66` and `gallery/GalleryCard.vue:304` | **load-bearing** at M-2 — the subject is the fork that dropped the guard the canonical component carries |
| `formation/fourier/CENSUS-2026-08-03.md` §Fonts / entry contents | `@theme { --font-sans: "Computer Modern Serif" … }` at `style.css:14-16` | **extended** at M-5 / i-4: the brand fork does not reach `.cm-serif`, and `font-serif` ≠ Computer Modern |
| `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:86` **R3-12** (TRUE / ADOPT-AS-FACT) | 35 open-family records collapse to 28; the 7 duplicates include "`GalleryCard` basisLabels" | **corroborated + widened** at i-3: `getBasisLabel` here is the *fourth* basis-label deriver, and `timeAgo` is a **5-copy / 2-dialect** family the row did not name |
| `intakes/lane-fourier-r3-r6.md` §0 (R6 gate claim, TRUE) | `PaperSidebar.vue:65,87,105` native `li v-for` | **cited as convention** at M-9 — list semantics are idiomatic in this repo and are absent here |
| `intakes/lane-fourier-r3-r6.md` §0 | HEAD `cd26c653…`, tree `9a66411d…`, `web/src` byte-identical to the Codex worktree | **relied on**: nothing below is STALE-AT-HEAD |

**No contradiction of the corpus was found.** One *sharpening*: lane-frontend §5 frames the metric-badge break
as a rename cost ("another prop pass is due"). For this file it is not only a rename — see M-6/M-7, where the
`Button` `variant`→`emphasis` axis change lands with **zero typecheck signal** because the dead prop falls
through to `$attrs`.

---

## §1 · BLOCKERS

### B-1 — Two activation-bearing `<div @click>` open-affordances: the drafts list cannot be opened by keyboard at all. This file is the sole survivor of the repo's own `D.W4.c` sweep.
**Severity BLOCKER** · `GalleryDraftsSection.vue:72-75` (thumbnail) and `:83` (text stack).

```vue
72:  <div class="w-12 h-12 rounded-md overflow-hidden shrink-0 cursor-pointer bg-muted"
74:       @click="emit('open', draft.imageSlug)">
83:  <div class="flex-1 min-w-0 cursor-pointer flex flex-col gap-0.5" @click="emit('open', draft.imageSlug)">
```

Neither carries `role`, `tabindex`, nor a `keydown` handler. `emit('open', …)` is wired at
`GalleryView.vue:370` to `router.push('/w/' + $event)` — **the only route into a draft's workspace from this
surface**. A keyboard or switch user reaching the drafts tab can toggle the header and press *Publish*, and
can do nothing else: the primary verb of the component is mouse-only. WCAG 2.1.1 (A) and 4.1.2 (A).

This is not a novel judgement — **the repo already adjudicated this exact pattern and cured the sibling**.
`GalleryCard.vue:64-68` carries the verdict in a provenance comment:

> `D.W4.c — keyboard-accessible card. Was a bare <div @click> (per A3 #4 finding — unreachable by keyboard,`
> `no Enter/Space activation, no focus ring). Lifted to the canonical ARIA button-on-non-button pattern:`
> `role + tabindex + keydown + aria-label.`

and `GalleryCard.vue:70-79` implements it (`role="button"`, `tabindex="0"`, `:aria-label`,
`@keydown.enter.prevent`, `@keydown.space.prevent`). `style.css:129-143` then adds the matching
`.gallery-card:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }` ring, with a comment
naming this the `D.W4.d` canonical pattern.

**Exhaustive falsifier — run, and it did not falsify.** I parsed every opening tag bearing `@click` across all
13 SFCs in `web/src/components/visualization/gallery/`:

```
GalleryCard.vue:65    <div>  role=False tabindex=False   ← the D.W4.c COMMENT text, not an element
GalleryCard.vue:70    <div>  role=True  tabindex=True    ← the cure
GalleryCard.vue:85    <div>  @click.stop                 ← propagation guard, not an activation target
GalleryCard.vue:156   <div>  @click.stop                 ← propagation guard
GalleryDraftsSection.vue:72   <div>  role=False tabindex=False
GalleryDraftsSection.vue:83   <div>  role=False tabindex=False
```
Every other `@click` in the directory (AdminAuditLog ×3, GalleryAdminBanner ×1, AdminFlaggedPanel ×4,
AdminUserList ×9, …) sits on a `<Button>`. **These two lines are the only activation-bearing bare `<div @click>`
left in the gallery surface.** Falsified only by producing a keyboard path to `emit('open')` — there is none:
`grep -n "keydown\|tabindex\|role=" GalleryDraftsSection.vue` → *(empty)*.

Aggravating: `cursor-pointer` on both (`:73`, `:83`) advertises an affordance the keyboard cannot reach — a
pointer-only lie, and the only hover feedback for it measures **1.04:1** (M-4).

---

### B-2 — In the collapsed state the disclosure toggle's focus ring is **100 % clipped**. The keypress that collapses the section is the keypress that destroys its own focus indicator.
**Severity BLOCKER** · `GalleryDraftsSection.vue:51` (`overflow-hidden`) × `:52-64` (the toggle) × `:66` (`v-if="!collapsed"`).

Chain, every link source-derived:

1. glass-ui 4.0.0's Button cva base string carries `focus-ring` —
   `dist/button-BNDWhAZb.js`: `u("btn-pill tap-squish focus-ring whitespace-nowrap …")`.
2. `.focus-ring` is **box-shadow-only, with `outline: none`** —
   `src/styles/utilities/base.css:174-178`:
   ```css
   .focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill);
                               box-shadow: var(--focus-ring-shadow); }
   ```
   `src/styles/tokens/scale-paper.css:65-67`: `--focus-ring-width: 2px;`
   `--focus-ring-shadow: 0 0 0 2px color-mix(…var(--ring) 30%…), 0 0 8px color-mix(…15%…)` — a **spread**
   shadow, i.e. it paints entirely *outside* the border box.
3. **`overflow: hidden` clips descendant box-shadows to the ancestor's padding box.** The root at `:51` sets
   `overflow-hidden` and declares **no padding**, so clip box = content box.
4. When `collapsed === true`, `v-if="!collapsed"` at `:66` removes the list. The Button is then the container's
   **only** child, `w-full` (`:54`), and the container's height collapses to the Button's. The Button therefore
   **exactly fills the clip box on all four sides**, and 100 % of a purely-outward ring is clipped.

Result: pressing `Space`/`Enter` on the toggle collapses the section and simultaneously erases every pixel of
its own focus indicator. The user is left focused on an element with **no visible focus state whatsoever**, and
the only way to recover it is to press again — which restores the list and the partial ring. WCAG **2.4.7 Focus
Visible (AA) fails outright** in the collapsed state.

*(In the expanded state the same clip removes the top/left/right legs; only the bottom 2 px survives, painting
inward over the first row's `border-t border-foreground/5`. 2.4.7 is arguably scraped there; 2.4.11 Focus
Appearance is not. That degraded case is the MAJOR half and is not double-counted.)*

**Falsifiers, all run:**
- *Is there a rescue outline?* `a11y-overrides.css:82-92` adds `.btn-pill:focus-visible { outline: 2px solid Highlight }`
  **only inside `@media (forced-colors: active)`** — inert in normal mode. `style.css:136-143` names four
  rescue classes (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`); `drafts-header` is
  not among them.
- *Does the container get padding from anywhere?* `:51` class list is complete and padding-free; no scoped rule
  exists (`:106-108` is empty).
- *Does `rounded-none` (`:54`) fight `.focus-ring`'s `border-radius: var(--radius-pill)`?* No — `rounded-none`
  is a `@layer utilities` rule and `.focus-ring:focus-visible` is `@layer components`; utilities wins by layer
  order irrespective of specificity, so there is **no** focus-time corner jump. Recorded as **REFUTED**, §7.2.
- *Precise clipped-pixel geometry* is **UNPROVEN-NEEDS-LIVE** (SS-13); the *total* clip in the collapsed state
  is not — it follows from "child fills parent padding box" ∧ "shadow is 100 % outward spread".

**Cheapest cure:** move `overflow-hidden` off the root and onto the list wrapper at `:66`, or adopt
`CollapsibleSection` (M-1), which never nests the trigger inside a clipping box.

---

## §2 · MAJOR

### M-1 — No `aria-expanded` / `aria-controls`. The component is a fork of an in-repo disclosure whose typography it copies byte-for-byte.
**Severity MAJOR** · `:52-64`, `:66`.

`collapsed = ref(false)` (`:21`) drives a `v-if` and a CSS rotation. The button exposes **no** state to
assistive tech: `grep -n "aria-" GalleryDraftsSection.vue` → *(empty)*. A screen-reader user hears
"My Drafts 3, button" in both states and cannot tell whether activating it will reveal or hide. WCAG 4.1.2 (A).

The finding is sharpened by what already exists. **`web/src/components/ui/CollapsibleSection.vue`** wraps
reka-ui `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent` (via `@mkbabb/glass-ui`, `:2`) — which emit
`aria-expanded`, `aria-controls` and `data-state` for free — and its header line is **character-identical** to
the subject's:

```
ui/CollapsibleSection.vue:38   <span class="cm-serif text-sm font-semibold tracking-tight">{{ title }}</span>
GalleryDraftsSection.vue:57    <span class="cm-serif text-sm font-semibold tracking-tight">My Drafts</span>
```
`grep -c 'cm-serif text-sm font-semibold tracking-tight'` → **1** in each file. The chevron idiom matches too
(`CollapsibleSection.vue:37`: `text-muted-foreground transition-transform duration-200` + a rotate class;
subject `:61-62`: same class, same `duration-200`, same rotate mechanism). `CollapsibleSection` even ships an
`actions` slot that would host the *Publish* buttons. It has ≥3 consumers today (`ContourPreview.vue:34`,
`EqCoefficientsPanel.vue:13`, `FunctionInput.vue:94`), and `ContourSettings.vue:258` uses the primitives
directly.

**Falsifier:** *is the primitive unavailable at the installed pin?* No — `./collapsible` is an export of glass-ui
**4.0.0** (`node -e "Object.keys(require('./package.json').exports)"` → includes `./collapsible`;
`dist/collapsible.d.ts` → `export * from "./components/ui/collapsible"`; `dist/CollapsibleContent-C_s6fG7r.js`
exports `CollapsibleTrigger`/`CollapsibleContent`). This is a shadow of a component available **today**, not
one unlocked by the uplift.

### M-2 — The fork drops the content transition **and** the `prefers-reduced-motion` guard. The chevron animates a transition the content does not perform.
**Severity MAJOR** · `:61` (`transition-transform duration-200 ease-in-out`) × `:66` (`v-if`) × `:106-108` (empty style block).

Two distinct failures from one omission:

1. **Motion incoherence.** The chevron rotates over 200 ms while the list it points at is *hard-swapped* by
   `v-if` in a single frame. The affordance promises a reveal; the content teleports. The canonical component
   animates both — `CollapsibleSection.vue:59-64`:
   ```css
   .collapsible-content[data-state="open"]  { animation: collapsible-open  0.2s var(--ease-out); }
   .collapsible-content[data-state="closed"]{ animation: collapsible-close 0.2s var(--ease-out); }
   ```
   (same 200 ms — the subject copied the duration and dropped the animation).
2. **Reduced-motion regression.** `CollapsibleSection.vue:66-71` carries the guard; the subject's scoped block
   (`:106-108`) contains **only** `@reference "tailwindcss";` — zero rules. Tailwind v4 `transition-*` is *not*
   reduced-motion-gated (`motion-safe`/`motion-reduce` are opt-in variants), so `:61`'s rotation and `:70`'s
   `transition-colors duration-150` run at full rate under `reduce`.

   CENSUS enumerates **8** `@media (prefers-reduced-motion: reduce)` blocks in this codebase, two of them in
   this very neighbourhood (`gallery/GalleryCard.vue:304`, `ui/CollapsibleSection.vue:66`). The subject is a
   convention hole, not a codebase-wide gap.

**Falsifier:** *is a global reduce guard applied at the entry?* `style.css` carries one `reduce` block
(CENSUS: `style.css:92`) scoped to the tab-panel entry animation — `grep -n "prefers-reduced-motion" web/src/style.css`
shows no blanket `* { transition: none }`. Not rescued. *Is 200 ms de-minimis?* WCAG 2.3.3 (Animation from
Interactions) is AAA and arguably not engaged by a 200 ms rotate; the defect is booked as a **convention
violation with an a11y edge**, which is why it is MAJOR and not BLOCKER.

### M-3 — `publishing` is a single global boolean: every row disables, no row says why, and the disable steals the user's focus.
**Severity MAJOR** · `:95` (`:disabled="publishing"`) × `GalleryView.vue:47, 207-215`.

`publishing` is one `ref(false)` in the parent (`GalleryView.vue:47`), flipped around a single awaited call
(`:208-214`). Bound to `:disabled` on **every** row's button, so publishing draft #3 greys out all *n* rows
with:

- **no identity** — nothing marks which draft is in flight;
- **no progress** — no spinner, no label change ("Publish" stays "Publish"); glass-ui 4.0.0's Button has **no**
  `loading` prop (`dist/button-BNDWhAZb.js` props: `variant, size, class, type, disabled, asChild, as`);
- **no success signal** — `handlePublishDraft` toasts **only** on `catch` (`GalleryView.vue:211`). On success the
  row simply vanishes, because `unpublishedDrafts` (`GalleryView.vue:76-81`) filters out drafts whose
  `savedSnapshots` are all in `publishedHashes`. The affirmative outcome is communicated by **absence**;
- **focus theft** — glass-ui's Button forwards `disabled` to a *native* `<button>` (`dist/button-BNDWhAZb.js`:
  `as: "button"` default, `d = computed(() => ({ type, disabled }))`, `v-bind` onto reka `Primitive`).
  A native `disabled` button is **not focusable**, so at the instant the user activates it, `document.activeElement`
  resets to `<body>`. When the promise resolves the row is unmounted anyway. The keyboard user is returned to
  the top of the document with no announcement. WCAG 3.2.x / 4.1.3 (Status Messages, AA — no `aria-live`
  anywhere in either file: `grep -n "aria-live\|role=\"status\"" GalleryDraftsSection.vue GalleryView.vue` → *(empty)*).

**Falsifier:** *does the parent's `toast()` cover the success path?* Read `GalleryView.vue:207-215` whole — the
`toast` call is inside `catch (e: any)` only; `try` and `finally` emit nothing. *Is the disable per-row via some
other channel?* The prop is `publishing: boolean` (`:11`), not a slug — the component **cannot** scope it.

**Uplift note (improves):** glass-ui 7.0.0's Button adds `loading?: boolean` with
`:aria-busy="loading || undefined"`, `:data-loading`, and an activation guard `guardDisabledActivation`
(`glass-ui/src/components/button/Button.vue:27, 74-79, 91-93`). Post-F.W1 the correct shape is
`:loading="publishingSlug === draft.imageSlug"` — but the prop must be widened `boolean → string | null`
upstream, which is a **contract change the census does not currently budget**. Book it.

### M-4 — The row hover measures **1.04 : 1**. It is the sole feedback for the two click targets B-1 leaves keyboard-unreachable, and glass-ui ships the canonical hover register unused.
**Severity MAJOR** · `:70` (`hover:bg-foreground/[0.02]`).

Token arithmetic, both schemes (`tokens/color-radius.css:40,58` light; `tokens/dark-arm.css:42,60` dark):

| | `--background` | `--foreground` | 2 % composite | ratio |
|---|---|---|---|---|
| light | `hsl(40 30% 98%)` ≈ `rgb(251 250 248)` | `hsl(24 10% 10%)` ≈ `rgb(28 25 23)` | `rgb(247 246 244)` | **1.04 : 1** |
| dark | `hsl(24 9% 4%)` ≈ `rgb(11 10 9)` | `hsl(48 10% 90%)` ≈ `rgb(232 231 227)` | `rgb(15 15 14)` | **1.04 : 1** |

A 4/255 (1.6 %) channel delta. On a glare-exposed or low-gamut panel this is not perceivable; it is at or below
the just-noticeable difference for a large flat fill. Because `:72`/`:83` carry `cursor-pointer` but no focus,
no `:active`, and no other state paint, **this 1.04:1 wash is the entire interactive vocabulary of the row.**

glass-ui 4.0.0 already ships the register the design system intends: `.interactive-item`
(`utilities/base.css:191-215`) — a token'd `hover` (`color-mix(in srgb, var(--accent) 50%, transparent)`),
a `:focus-visible` ring, a `--scale-press-sm` press, and a token'd transition list. The subject hand-rolls a
weaker one.

**Falsifier:** *is the row sitting on a tinted surface that raises the delta?* No — the rows have no
background; only the header carries `bg-muted/30` (`:54`). Ancestors up to `GalleryView.vue:219`
(`flex flex-col gap-4 overflow-y-auto h-full py-4`) set none. *Is 1.4.11 engaged?* Non-text contrast governs
"states of UI components", so a hover *state* is in scope; the 3:1 reading is arguable for a decorative wash,
which is why this is MAJOR-by-design-quality rather than a flat SC failure. **Perceptibility on a specific
panel: UNPROVEN-NEEDS-LIVE.** The ratio itself is arithmetic, not opinion.

### M-5 — `.cm-serif` resolves to the browser's generic `serif`: three unrelated typefaces in one 108-line row, none of them the app's declared brand face.
**Severity MAJOR** · `:57` (`cm-serif`), `:84` (`fira-code`), `:85`/`:99` (inherited).

Resolve each family through the live cascade:

| Element | Class | Resolves to | Chain |
|---|---|---|---|
| "My Drafts" `:57` | `.cm-serif` | **generic `serif`** (Times / DejaVu) | `glass-ui/src/styles/typography/utilities.css:65-67`: `@utility cm-serif { font-family: var(--font-serif-math, serif) }` |
| slug `:84` | `.fira-code` | Fira Code + `liga`,`calt` | `utilities.css:69-72`: `font-family: var(--font-mono)` → `bridges.css:70` → `scheme-motion.css:46` = `"Fira Code", …` |
| meta `:85`, "Publish" `:99` | inherited | **Plus Jakarta Sans** | `style.css:19` `body { @apply … font-serif }` → `bridges.css:68` `--font-serif: var(--font-stack-text)` → `scheme-motion.css:43` = `"Plus Jakarta Sans", …` |

**`--font-serif-math` is definition-absent.** Exhaustive:
`grep -rn -- "--font-serif-math" web/node_modules/@mkbabb/glass-ui/dist/ web/src/ web/public/ web/index.html`
→ **1 hit**, and it is the `@utility` body itself (`dist/styles/typography/utilities.css:66`). The referent is
declared nowhere, so the `, serif` fallback always fires.

So the app's brand face — Computer Modern Serif, self-hosted, **preloaded** at `index.html:10-13` — is bound
only to `--font-sans` (`style.css:14-16`) and is reachable only via the `font-sans` utility, which appears
**nowhere in this component**. The header that most wants the math voice gets Times; the two lines that get
`font-serif` get a *sans*. Three faces, none intended.

**Falsifier:** *does fourier override `--font-stack-text` or declare `--font-serif-math` in `@theme`?*
`grep -rn -- "--font-stack-text\|--font-text:" web/src/ web/index.html` → **0**. Tailwind `@theme` mints only
the properties it is given; `style.css:13-15` gives exactly one (`--font-sans`).

**Scope honesty:** `.cm-serif` has **17** consumers repo-wide, so the cure is a lane-level carry, not a
component patch. Booked MAJOR here because the *effect* is fully realised inside this component's 108 lines and
its header is one of the two type registers on the drafts surface.

### M-6 — `@mkbabb/glass-ui/metric-badge` is definition-absent at 7.0.0: a hard build break at `:8`.
**Severity MAJOR** · `:8`, `:58`. **Census break-surface row 1** (`lane-frontend.md:472`; `CENSUS:63` **C-4** — 7 *files*).

Re-measured against both trees:

```
installed 4.0.0 exports  ⊇ { ./metric-badge, ./metric-cell, ./metric-stack }
producer  7.0.0 exports  ⊇ { ./metric }        ∌ ./metric-badge  ∌ ./metric-cell  ∌ ./metric-stack
```
`import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"` (`:8`) will fail subpath resolution — a **build**
error, not a runtime one, so it is loud. That is the good news; what follows is not.

The replacement is **not** a rename. glass-ui 7.0.0 `src/components/metric/types.ts` gives
`MetricProps = { value, unit, placeholder, loading, label, context, class, size, orientation }` — the 4.0.0
`MetricBadge` props `abbreviation`, `labelPosition`, and **`color`** are gone
(4.0.0 props read off `dist/MetricBadge-BpC0R_Ec.js`: `value, unit, label, abbreviation, labelPosition, color,
placeholder, size, class`). For *this* call site the migration is genuinely one line —
`<MetricBadge :value size="sm" />` → `<Metric :value size="sm" />`, and `MetricSize` still admits `"sm"` — but
the sibling `GalleryAdminBanner.vue:45-88` uses `label-position="stacked"` ×6 and `color=` ×2, which have **no
7.0.0 equivalent** (`orientation="stacked"` covers the first; the second is absent). The census budget of
"7 files for the `./metric` cure" should be read as *1 trivial + 6 with real prop loss*.

**Falsifier:** *is there a back-compat alias?* `grep -rn "metric-badge\|MetricBadge" /Users/mkbabb/Programming/glass-ui/src/`
→ *(empty)*; `src/components/metric/index.ts` exports `Metric`/`MetricCell`/`MetricRow`/`MetricStack` only.
Clean break, matching the dock-member precedent the census already records.

### M-7 — Under the uplift, `variant="ghost"` and `variant="outline"` become **stray DOM attributes** and both buttons silently re-render as the default glass capsule. Zero typecheck signal.
**Severity MAJOR** · `:53`, `:92`. *Not currently on the census break surface — this challenge adds it.*

glass-ui **7.0.0** `src/components/button/Button.vue:19-31` defines
`ButtonProps { emphasis, tone, size, iconOnly, loading, type, disabled, class }`. **There is no `variant`.**
The emphasis axis replaces it: `ButtonEmphasis = "primary" | "secondary" | "quiet" | "text"`, with
`tone` split out as an orthogonal `Tone`.

Vue's fallthrough semantics do the damage quietly:

- `variant="ghost"` (`:53`) is not a declared prop → it lands in `$attrs` → reka `Primitive` renders it as a
  literal `variant="ghost"` attribute on the `<button>` element, where it styles nothing.
- The button then takes `emphasis` **default `"secondary"`** (`withDefaults`, `:33-41`), which computes
  `glassMaterial = true` → `glass-wash glass-capsule glass-capsule-hover` + `v-specular` (`:62-70, 82`).

So the *ghost, square-cornered, full-width* section header becomes an **opaque, specular, pill-shaped glass
capsule spanning the container width**, and the *outline* Publish button becomes the same capsule. Both changes
are invisible to `vue-tsc` — fallthrough attrs are not type-checked. This is exactly the failure mode the census
warns about at `CENSUS:256` ("[P2] Uplift lands with no unit-test net") and it is **worse** than the
`ToastVariant` break the census does book, because `ToastVariant` at least *fails the typecheck*.

`size="sm"` (`:93`) survives — `ButtonSize = Extract<Size, "xs"|"sm"|"md"|"lg">`.

**Falsifier:** *is `variant` kept as a deprecated alias?*
`grep -n "variant" /Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue` → matches only inside
the `ButtonEmphasis` doc-comment region; no `variant` prop, no alias, no runtime warn. *Does `class` still
override?* Yes — `hostClass` (`:66-73`) appends `props.class` last through `cn`, so `rounded-none` still wins
the radius; the *material* (`glass-wash`, specular) does not come from a class the consumer can drop.

**Repo-wide reach:** `grep -rc "@mkbabb/glass-ui/button" web/src` → **35** import sites (lane-frontend:213).
Every `variant=` on all 35 needs an emphasis/tone mapping. **Recommend the census add a `Button variant→emphasis`
row to §5's "Rows that hit fourier-analysis TODAY" table.**

### M-8 — The metadata line has no overflow strategy: rows become variable-height and the 48 px rhythm breaks.
**Severity MAJOR** · `:84` vs `:85-89`.

Line 1 (`:84`) is `truncate`; line 2 (`:85`) is not — no `truncate`, no `whitespace-nowrap`, no `line-clamp`.
Its content is `getBasisLabel(draft) + " · " + timeAgo(...)`, and `getBasisLabel` joins **all** active bases
(`:38-46`, `.join(", ")`). With all three registered bases (`basis-display.ts:3-7`:
`fourier` / `chebyshev` / `legendre`) the string is `"Fourier, Chebyshev, Legendre · 3h ago"` — 38 characters,
which at `text-sm` in a `flex-1 min-w-0` column beside a 48 px thumbnail and a `size="sm"` button will wrap on
narrow viewports. The row then grows from the thumbnail-governed 64 px to ~84 px, **for some rows only** — the
list loses its rhythm as a function of data.

Aristotelian reading: the two lines are a single unit of meaning and must share one overflow contract. The
sibling `GalleryCard.vue:108-109` gets this right — `truncate flex-1 min-w-0` on the slug and
`whitespace-nowrap shrink-0` on the timestamp, an explicit priority ordering. The subject expresses no priority
at all.

**Falsifier:** *does the parent constrain width so wrapping cannot occur?* `GalleryView.vue:219` is a plain
`flex flex-col … h-full py-4` with no max-width; the drafts tab is full-viewport, so the narrow case is the
mobile case — and `style.css:41-51` sets root `font-size: 1.125rem` **below** 768 px, making `text-sm` ≈ 15.75 px
there, i.e. *wider* text in a *narrower* column. The wrap is likelier on the exact viewport the app up-sizes for.
**Exact wrap breakpoint: UNPROVEN-NEEDS-LIVE.**

### M-9 — No list semantics. Two siblings in the same directory get this right.
**Severity MAJOR** · `:66` (the wrapper), `:67-101` (the rows).

The drafts are a homogeneous, counted collection: the header even announces the cardinality via `MetricBadge`
(`:58`). Yet the wrapper is `<div class="flex flex-col">` and each row a `<div>` — no `<ul>/<li>`, no
`role="list"`/`role="listitem"`. A screen-reader user gets no "list of 3", no item position, and no list
navigation. WCAG 1.3.1 (A).

Convention evidence, in-repo and adjacent:
- `AdminFlaggedPanel.vue:159` `role="list"` / `:165` `role="listitem"` — same directory, same row pattern;
- `AdminUserList.vue:355` `role="list"` / `:361` `role="listitem"` — same directory, same row pattern;
- `PaperSidebar.vue:64-65` native `<ol>` + `<li v-for>` — the intake's **R6 gate claim**, adjudicated **TRUE**
  (`lane-fourier-r3-r6.md` §0: "3 native `li v-for` rows in `PaperSidebar.vue` at lines 65, 87, 105 … live
  `grep` → 65, 87, 105").

**Falsifier:** *is `role="list"` supplied by an ancestor?* `grep -rn "role=\"list\"" web/src/components/visualization/GalleryView.vue`
→ *(empty)*. *Would `display: flex` strip implicit list semantics anyway (the known `list-style: none` /
flex-container a11y quirk)?* That is precisely why the two admin siblings use **explicit** `role` attributes on
flex containers — the established local cure, not adopted here.

---

## §3 · MINOR

**m-1 — `:size="16"` and `:size="14"` are inert; the declared icon hierarchy does not render.** `:60`, `:98`.
`lucide-vue-next@1.0.0` renders size as *presentational attributes* (`dist/esm/Icon.js`: `width: size, height: size`),
and glass-ui's Button cva base carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)`
(`dist/button-BNDWhAZb.js`). Author CSS beats presentational attributes, and neither icon's class contains the
substring `size-` (chevron: `ml-auto text-muted-foreground transition-transform duration-200 ease-in-out` +
lucide's own `lucide lucide-chevron-down-icon lucide-chevron-down`; Upload: no class). Both therefore render at
`--ui-glyph = calc(1rem * var(--ui-scale))` (`tokens/offsets-sizing.css:177`) — **identical size**, and
`1.5×` larger under `(pointer: coarse)` (`light-dark.css:17-19`). The deliberate 16-vs-14 differentiation is
silently discarded. *Falsifier — is the arbitrary variant actually emitted in the consumer build?* Yes:
`dist/styles/index.css:214` carries `@source "../*.js"`, which in the shipped context resolves to `dist/*.js`,
the flat chunks holding that exact class string; the rationale block at `:188-213` documents the fix
("BA.W-EMISSION — re-pointed from the DEAD components-mirror glob").

**m-2 — A `<div>` inside a `<button>`: invalid content model.** `:58`.
glass-ui 4.0.0's `MetricBadge` root is a `<div>` (`dist/MetricBadge-BpC0R_Ec.js`: `o("div", { class: …"metric-badge cursor-pointer"… })`)
and Button renders a native `<button>` (`as: "button"` default, `asChild` false). `<button>`'s content model is
*phrasing content*; `<div>` is flow. W3C/`html-validate` flags it; browsers tolerate it without reparse, hence
MINOR. **The 7.0.0 uplift cures this for free** — `glass-ui/src/components/metric/Metric.vue:19` renders a
`<span>` root. Bank it as an uplift *gain*.

**m-3 — The count badge is unlabeled, against the repo's own MetricBadge convention.** `:58`.
`<MetricBadge :value="sortedDrafts.length" size="sm" />` passes none of `label` / `abbreviation` /
`labelPosition` / `unit`, rendering a naked integer. The directory sibling `GalleryAdminBanner.vue:45-88` uses
`label="entries"` + `label-position="stacked"` on **all six** badges, with a scoped rationale comment at `:96-98`.
Accessible-name consequence: the toggle computes to `"My Drafts 3"` — the `3` is ambiguous without a unit.

**m-4 — `alt` is the slug, duplicating adjacent visible text.** `:78` (`:alt="draft.imageSlug"`) vs `:84`
(the same string rendered visibly 10 px away). Screen readers announce the identifier twice; the image itself
goes undescribed. WCAG 1.1.1 — the correct value for a thumbnail whose caption is adjacent is `alt=""`.
*Systemic, not local:* `GalleryCard.vue:101` does the same. Book as a lane carry.

**m-5 — Two dead class hooks and an empty scoped style block.** `drafts-header` (`:54`) and `draft-item` (`:70`)
are declared and never styled: `grep -rn "drafts-header\|draft-item" web/src` → exactly the two declaration
sites, no rule anywhere. The `<style scoped>` (`:106-108`) contains only `@reference "tailwindcss";` — no
`@apply`, no theme function, so the directive is a no-op — yet its presence still stamps a `data-v-*` scope
attribute on every element in the template for nothing.

**m-6 — The root `v-if` is unreachable-false.** `:51` `v-if="sortedDrafts.length > 0"`. The sole consumer
already gates: `GalleryView.vue:357-364` renders an empty state under `v-if="!unpublishedDrafts.length"` and the
component under `v-else` (`:365-371`). `drafts.length ≥ 1` is therefore an invariant at mount. Dead branch — and
worse, it means **the component cannot own its own empty state**, so the empty case is designed twice, in two
files, with two different layouts (m-7).

**m-7 — The component owns an outer margin, and it disagrees with its own empty state.** `:51` `mx-4`.
A component that sets its own outer margin is not composable — the gutter belongs to the parent. Concretely,
the two states of the *same tab* are inset differently: the empty state (`GalleryView.vue:358-359`) is
`flex flex-col items-center justify-center flex-1 gap-3` — full-bleed and centred; the populated state is inset
1 rem. Switching between them shifts the content box. *Partial mitigation:* `mx-4 rounded-lg border-[1.5px]`
exactly matches the sibling banner (S-2), so the value is right even though the ownership is wrong.

**m-8 — `getBasisLabel()` is called twice per row, and its empty result leaks a leading space.** `:86`, `:87`.
The same non-memoised function (`:38-46`) runs twice per render per row for a value already computed. When it
returns `""` (a draft with `active_bases: []`), the emitted text is `"" + <whitespace> + timeAgo` — Vue's
default `whitespace: 'condense'` collapses the inter-node run to a single space, so the meta line renders as
`" 3h ago"` with a leading space against a `truncate`d slug above it. No `.trim()`. Cure is one `computed`
or a `v-memo`-free local: `const meta = (d) => [getBasisLabel(d), timeAgo(d.lastOpenedAt)].filter(Boolean).join(" · ")`.

**m-9 — The collapse state is destroyed by the tab, and collapsing produces a dead-end.** `:21` `ref(false)`.
`GalleryView.vue:356` is `<template v-if="activeTab === 'drafts'">`, which unmounts on tab change — so
`collapsed` resets every visit and the user's choice is never honoured (`CollapsibleSection` at least accepts
`defaultOpen`; a persisted variant would need the workspace store). Worse: because this is the *only* content of
the drafts tab (m-6), collapsing it yields a tab containing one lone header bar and nothing else, with no
explanation — a state the design never anticipated.

**m-10 — Border contrast: 1.16 : 1 (container) and 1.10 : 1 (row separator).** `:51` `border-foreground/8`,
`:70` `border-foreground/5`. Same token arithmetic as M-4. The `border-t` at 5 % is the **only** visual boundary
between rows, and the directory sibling that shares the identical container recipe uses a far stronger stroke —
`GalleryAdminBanner.vue:26` `border-amber-500/30`. Booked MINOR because a decorative separator between rows that
each carry a 48 px thumbnail is not "required to identify a component" under 1.4.11.

**m-11 — No `@error` fallback on the thumbnail.** `:76-81`. `thumbnailUrl` (`lib/api.ts:292-294`) is an
unversioned `${BASE}/api/images/${slug}/thumbnail`; a draft can reference a purged or pre-migration image
(`api/dependencies.py:50-56` documents a real `410 Gone` path for pre-migration documents). On failure the
browser's broken-image chrome renders inside the `bg-muted` frame with no recovery. The repo has the cure
pattern: `ImageUpload.vue:68` `@error="onImgError"` — the **only** `@error` in `web/src`.

**m-12 — A truncated identifier with no recovery.** `:84` `truncate` with no `title`, no `Tooltip`, no
`aria-describedby`. Slugs are up to 81 characters (`api/dependencies.py:41`
`IMAGE_SLUG_PATTERN = ^[a-zA-Z0-9][-a-zA-Z0-9]{2,80}$`) in a `flex-1 min-w-0` column beside a 48 px thumbnail and
a button — the ellipsis is the common case, and the clipped text is unrecoverable without navigating. `Tooltip`
is idiomatic here: **35 callsites over 9 consumers**, re-derived exactly in the intake (`lane-fourier-r3-r6.md`
§0: "2+2+2+4+2+6+6+10+1 = 35. Exact.").

---

## §4 · INFO

**i-1 — `localeCompare` on ISO-8601 strings, guarded against a value the type says cannot be absent.** `:22-26`.
```ts
.sort((a, b) => (b.lastOpenedAt ?? "").localeCompare(a.lastOpenedAt ?? ""))
```
`WorkspaceDraft.lastOpenedAt` is `string`, **non-optional** (`lib/types.ts:91`) — so both `?? ""` are dead, and
the file contradicts itself four lines later by passing the same field unguarded to `timeAgo` (`:88`).
Separately, `localeCompare` applies ICU collation where `-`, `:` and `T` are *variable-weight* punctuation that
can be ignored at the primary strength in some locales — a plain `a < b ? 1 : -1` is both correct-by-construction
and ~2 orders faster. Design-visible symptom would be draft mis-ordering. **Cross-axis: this belongs to the
correctness lane; booked INFO here so it is not lost.**

**i-2 — Programming ligatures on an identifier.** `:84` `.fira-code` sets `font-feature-settings: "liga","calt"`
(`glass-ui/src/styles/typography/utilities.css:69-72`) — whereas `GalleryCard.vue:108` renders the *same* slug
with plain `font-mono` (no feature settings). Same string, two renderings. The slug grammar admits runs of
hyphens and the letter sequence `www` (`^[a-zA-Z0-9][-a-zA-Z0-9]{2,80}$`), both of which Fira Code's `calt` set
substitutes. A slug containing `--` would display as a single long dash — a *misreported identifier*.
Rarity makes it INFO; **the visual outcome is UNPROVEN-NEEDS-LIVE** (font-and-shaper dependent).

**i-3 — `timeAgo`: five copies, two dialects, divergent output.** `:28-36`.
Byte-identical in `GalleryDraftsSection:28`, `GalleryCard:53`, `GalleryCardModal:58` (the `"just now"` dialect);
a **different** implementation in `AdminFlaggedPanel:137` and `AdminUserList:223` which lacks the `m < 1` branch
and therefore renders **`"0m ago"`** where the gallery renders **`"just now"`**. Same product, two vocabularies
for the same instant. This *widens* intake row **R3-12** (TRUE / ADOPT-AS-FACT), which named `GalleryCard`
basisLabels among its 7 duplicated open-family records but did not name the `timeAgo` family; `getBasisLabel`
(`:38-46`) is likewise the **fourth** basis-label deriver over `basis-display.ts` (`GalleryCard:36-50`,
`GalleryCardModal:45`, `canvas-drawing/labels.ts:30`). Both belong in the census's dedup ledger.

**i-4 — The brand fork does not reach the body.** `style.css:13-15` remaps `--font-sans` to Computer Modern
Serif, but `style.css:19` applies `font-serif` to `html, body`, and glass-ui's bridge sets
`--font-serif: var(--font-stack-text)` = Plus Jakarta Sans (`theme/bridges.css:66-70`). So the preloaded CM faces
(`index.html:10-13`) reach only elements that opt into `font-sans` — of which this component has none.
Cross-component; noted because M-5's three-face split is its local symptom. **Composed cascade order:
UNPROVEN-NEEDS-LIVE.**

**i-5 — `Upload` icon for an action that uploads nothing.** `:98`. Publishing promotes an *already-uploaded*
draft to the public gallery; the mental model is "make visible", not "send bytes". `Globe`, `Send`, or `Share2`
carry it. Trivial, but the icon is the only glyph on the row's primary verb.

**i-6 — A correct-today, fragile-tomorrow cascade dependency.** `:54` `rounded-none` vs `.focus-ring:focus-visible`'s
`border-radius: var(--radius-pill)` (`utilities/base.css:176`). No focus-time corner jump occurs **only** because
Tailwind v4 orders `@layer components` before `@layer utilities`. Any change to glass-ui's layer assignment, or
any consumer that hoists the rule, reintroduces a visible geometry snap on keyboard focus. Worth a comment at
the call site.

---

## §5 · Superlatives (L-18, adversarially checked)

**S-1 — No prop mutation in the sort.** `:22-26` `props.drafts.slice().sort(...)` copies before sorting.
*Falsifier:* had `.slice()` been absent, `Array.prototype.sort` would mutate `workspace.drafts` in place through
the reactive proxy (`GalleryView.vue:77`), silently reordering the workspace store from a render-time computed.
It is present, and it is the first call in the chain. Correct.

**S-2 — The container recipe matches the tab's established banner register exactly.** `:51`
`mx-4 rounded-lg border-[1.5px]` is character-for-character the sibling `GalleryAdminBanner.vue:26`
(`mx-4 px-3 py-2.5 rounded-lg border-[1.5px]`), and `border-[1.5px]` is a genuine repo convention, not a
one-off: 10+ sites across `EquationPanel:108`, `InfoCard:22`, `FunctionInput:104,123,135`, `EquationView:240,285`,
`FrequencyGraph:189`. *Falsifier:* I opened this as a suspected arbitrary-value defect; the grep refuted it.
The gutter *ownership* is still wrong (m-7) — the *value* is right.

**S-3 — Zero layout shift on the thumbnail, by construction.** `:73` fixes `w-12 h-12` on the frame and `:79`
`w-full h-full object-cover` on the image, so `loading="lazy"` (`:80`) cannot induce CLS: the box is reserved
before the byte arrives. *Falsifier:* remove either the fixed frame or `object-cover` and a lazily-decoded
non-square thumbnail reflows the row. Both present. This is the correct lazy-image idiom.

**S-4 — Stable identity key.** `:69` `:key="draft.imageSlug"` — the domain's primary key (validated server-side,
`api/dependencies.py:41-47`), not an array index. Under the reorder that `sortedDrafts` performs on every
`lastOpenedAt` change, an index key would recycle DOM across rows and cross-wire the per-row `@click` closures.
*Falsifier:* substituting `:key="i"` reproduces exactly that; the author avoided it.

**S-5 — Icon `aria-hidden` is correct, and I was wrong to suspect otherwise.** `:59-63`, `:98`.
I opened this as a defect — the directory sibling `GalleryView.vue:340,348` writes `aria-hidden="true"`
explicitly on its icons, so the omission here looked like drift. **Refuted by the library:**
`lucide-vue-next@1.0.0 dist/esm/Icon.js` ends its attribute spread with
`...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }` — neither icon passes a slot or an
`aria-*` prop, so both receive `aria-hidden="true"` automatically. The accessible names stay clean
(`"My Drafts 3"`, `"Publish"`). Recorded as a superlative rather than a silent deletion.

**S-6 — Touch target inherited correctly, including the coarse-pointer lift.** `:93` `size="sm"` resolves to
`h-(--control-h-sm)` = `max(2.25rem × var(--ui-scale), var(--control-floor))`
(`tokens/offsets-sizing.css:150`) = **36 px** on a fine pointer, and **≥ 44 px** on a coarse one, because
`light-dark.css:17-21` lifts `--ui-scale → 1.5` and `--control-floor → var(--touch-target, 2.75rem)` under
`@media (pointer: coarse)`. WCAG 2.5.5 (AAA) is met on touch **for free**, purely by using the token'd size
instead of a hand-rolled height. *Falsifier:* a literal `h-8` would have pinned 32 px on touch. The author used
the design system. (The 48 px thumbnail at `:73` clears 2.5.8 independently.)

**S-7 — One inset rhythm across header and rows.** `:54` and `:70` both carry `py-2 px-3`, so the disclosure
header and every draft row share a single 12 px horizontal gutter and 8 px vertical inset — the vertical
alignment holds through the collapse toggle. *Falsifier:* the two class strings were authored independently
(different elements, different components underneath) and could trivially have drifted; they did not.

---

## §6 · Uplift ledger — what F.W1's tri-package bump does to *this* file

| # | Surface | Line | Under 4.0.0 (today) | After 4→7 | Census status |
|---|---|---|---|---|---|
| 1 | `./metric-badge` subpath | `:8` | resolves | **BUILD BREAK** — subpath absent | ✅ booked (`lane-frontend:472`, `CENSUS:63` C-4) |
| 2 | `MetricBadge` → `Metric` | `:58` | — | 1-line rename; `size="sm"` survives (`MetricSize`) | ✅ booked |
| 3 | `MetricBadge` root `<div>` | `:58` | invalid inside `<button>` (m-2) | **FIXED** — `Metric.vue:19` renders `<span>` | 🆕 gain, unbooked |
| 4 | `Button variant="ghost"` | `:53` | ghost | **SILENT REGRESSION** → `emphasis="secondary"` glass capsule + specular; attr falls through; no typecheck signal | 🆕 **BREAK, UNBOOKED — M-7** |
| 5 | `Button variant="outline"` | `:92` | outline | same silent regression | 🆕 **BREAK, UNBOOKED — M-7** |
| 6 | `Button size="sm"` | `:93` | 36 px / ≥44 px coarse | unchanged (`ButtonSize` admits `"sm"`) | — |
| 7 | `:disabled="publishing"` | `:95` | native `disabled`; steals focus (M-3) | **IMPROVES** — `loading` prop + `aria-busy` + `guardDisabledActivation`; needs `boolean → string\|null` prop widening | 🆕 gain **with a contract cost**, unbooked |
| 8 | `lucide-vue-next` | `:6` | resolves | `@lucide/vue` peer rename — 2 of the 35 sites | ✅ booked (`lane-frontend:213`) |
| 9 | `./collapsible` (M-1 cure) | — | **available at 4.0.0** | available at 7.0.0 | 🆕 the cure needs **no** uplift |

**Ask of the census:** add rows 4/5 (`Button variant→emphasis`, 35 import sites, **typecheck-silent**) to
`lane-frontend.md` §5's "Rows that hit fourier-analysis TODAY" table, and row 7's prop-widening cost to the §9
[P1] item. Row 4/5 is arguably more dangerous than the `ToastVariant` break the census already flags [P1],
precisely *because* `ToastVariant` fails loudly and this does not.

---

## §7 · Claims opened and REFUTED (recorded, not deleted)

**7.1 — "The icons are missing `aria-hidden`, unlike `GalleryView.vue:340,348`."** **REFUTED** by
`lucide-vue-next@1.0.0 dist/esm/Icon.js` (auto-applies `aria-hidden="true"` absent a slot or `aria-*` prop).
Promoted to superlative **S-5**.

**7.2 — "`.focus-ring:focus-visible { border-radius: var(--radius-pill) }` will snap the square header to a pill on keyboard focus."** **REFUTED** by cascade-layer order: `rounded-none` is `@layer utilities`,
`.focus-ring` is `@layer components` (`glass-ui/src/styles/utilities/base.css:2` — "The `@layer components` base
half"), and utilities wins by layer regardless of specificity. Downgraded to **i-6** (fragile, not broken).

**7.3 — "`text-muted-foreground` on the meta line fails AA."** **REFUTED** by the producer's own annotated
tokens: `--muted-foreground: var(--neutral-5)` (`tokens/color-radius.css:85`), and `--neutral-5` carries the
measured note `WCAG AA: 5.21:1 vs page / 4.90:1 vs muted` (light, `color-radius.css:45`) and `7.64:1 vs page`
(dark, `dark-arm.css:47`). Passes 1.4.3 at `text-sm`. Not claimed.

**7.4 — "`border-[1.5px]` is an off-system arbitrary value."** **REFUTED** by 10+ sibling sites; it is the
repo convention. Promoted to superlative **S-2**.

**7.5 — "The header Button inherits a fixed `h-(--control-h-md)` that makes `py-2` inert."** **REFUTED** —
glass-ui 4.0.0's Button cva declares **no `defaultVariants`** (`grep -o 'defaultVariants:\{[^}]*\}'
dist/button-BNDWhAZb.js` → *(empty)*), so with `size` unset **no** height class is emitted and `py-2` governs.
Not claimed.

---

## §8 · Repair order (cheapest correct sequence, no uplift required for 1–4)

1. **B-1** — `role="button"` + `tabindex="0"` + `@keydown.enter/.space.prevent` + `:aria-label="\`Open ${draft.imageSlug}\`"` on `:83`; make `:72` a presentational child of it (one target, not two). Mirror `GalleryCard.vue:70-79` exactly. *Then* register `.draft-item:focus-visible` in `style.css`'s D.W4.d block — which retires dead hook m-5.
2. **M-1 / M-2 / B-2** — replace `:51-64` with `<CollapsibleSection title="My Drafts">`, using its `actions` slot. This one substitution discharges `aria-expanded`, the content transition, the reduced-motion guard, **and** the `overflow-hidden` focus-ring clip, and deletes the duplicated `cm-serif` header string.
3. **M-3** — widen the prop to `publishingSlug: string | null`; scope `:disabled` per row; add a `role="status"` live region for the success case in `GalleryView`.
4. **M-8 / M-9 / m-3 / m-4 / m-8 / m-12** — one pass over the row: `whitespace-nowrap` + `title` on the meta line, `role="list"`/`"listitem"`, `label="drafts"` on the badge, `alt=""`, a single `meta` computed.
5. **M-6 / M-7** — at F.W1, with the tri-package transaction. Row 4/5 of §6 needs a **manual sweep**; `vue-tsc` will not find it.
6. **M-5 / i-3 / i-4 / m-4** — lane-level carries (17 `cm-serif` sites; 5 `timeAgo` copies; 4 basis-label derivers; the alt convention). Do not patch here.

---

**Tally.** BLOCKER 2 · MAJOR 9 · MINOR 12 · INFO 6 → **29 defects**. Superlatives **7**. Refuted-and-recorded 5.
