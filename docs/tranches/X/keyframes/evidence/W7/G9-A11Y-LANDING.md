SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G9 — THE ACCESSIBLE DESCRIPTION, LANDED (passed, punctuated, re-derived, never uppercased)

**Unit**: X.KF.W7.h (resume group 2). **Date**: 2026-09-18. **Substrate**: keyframes.js `41a7ebb6`
→ `.g`'s `4e2a715f` → **this unit's `15c95de1`**. **Gate**: G9, and G11's fixture-3 G9 half.
**Design of record**: `G9-A11Y-DESCRIPTION-DESIGN.md` (X.KF.W7.c) — implemented, with two drifts
recorded below rather than followed as numbers.

---

## §0 · The witness, re-derived at the bytes this unit inherited

The reka mechanism is unchanged and is quoted from the installed package, not from the design:

⟨cmd⟩ `sed -n '87p' node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js` →
`const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);`

⟨cmd⟩ the same file's render → `createVNode(VisuallyHidden, { id: contentId, role: "tooltip" },
{ default: () => toDisplayString(ariaLabel.value) })` — so the tooltip's accessible node is a real
DOM node carrying exactly that string, which is what makes the end-to-end assertion below possible.

**The producer forwards the prop** (so the cure is a prop, never a patch): glass's `TooltipContent`
declares `ariaLabel: {}` among its props and hands everything but `class`/`surface` to reka through
`useForwardPropsEmits` ⟨`node_modules/@mkbabb/glass-ui/dist/tooltip-OxciiZm6.js`, the
`__name: "TooltipContent"` block⟩. Its type surface agrees: `__VLS_Props = TooltipContentProps &
{ class?, surface? }`.

**Anchors at `4e2a715f`, all four EXACT**: `TooltipContent` at `TimelineTrack.vue:193` with
`class="max-w-56"` and no `:aria-label`; marker `@mouseenter` at `:174`; tick band at `:107-120`;
`stopLabel` at `:307`. THP exposes `altText` — `.g`'s §3 hand-off — at `:222`.

---

## §1 · Two drifts, recorded as INTENT at the true bytes (D-19)

**Drift 1 — RR-A missed-1's cure element has taken another role.** The row names the rail
(`:21-35` at origin/master) and prescribes a two-attribute cure, `role="group"` + `aria-label`. That
element now carries **`role="slider"`** with `aria-label="Playhead — scrub the animation"` — G8's
keyboard-scrub cure, landed by `.d`, and pinned by a fixture this unit does not own
⟨`timeline-mount-keyboard.test.ts:183` `expect(t.rail.getAttribute("role")).toBe("slider")`⟩. One
element carries one role. The two attributes therefore land on **the rail's container**, which is
what G9's own assertion asks for in its own words — *"the rail has an accessible container"* — and
what `.d`'s residual 1 called it: *"the rail's accessible container"*.

**The residue that drift leaves is DECLARED, not swallowed.** `slider` is a
Children-Presentational role, so a strict user agent may prune the N marker sliders and their
carets — all descendants of the rail — from the AT tree. Neither available cure is this gate's:
moving the playhead role off `.timeline-track` breaks a fixture outside this unit's writable set
(and G8 with it), and lifting the markers out of the rail moves them out of the element whose
scoped block declares `--timeline-hit-floor` and `--timeline-caret-offset` **for them**
⟨`TimelineTrack.vue` `<style scoped>`: `.timeline-track, .timeline-pan-bar { --timeline-hit-floor:
24px }` and `.timeline-track { --timeline-caret-offset: 16px }`⟩ — a geometry regression traded for
an ARIA one. The finding is written at the rail in the file and carried as residual 1 below.

**Drift 2 — the description's head cannot be `Keyframe at ${pct}%`.** The design was authored at
`ae83da07`, before **C-5 (THP)** landed: a named scroll phase is now captioned with the phase the
author wrote, never with a resolved percent nobody typed. A `describeKeyframe` that said
`Keyframe at 25%` for `entry 100%` would re-commit C-5 in the AT channel, on the same panel, in the
same sitting it was cured for the eye. The head reads the **authored** selector with the resolution
secondary — `Keyframe at entry 100% (25%).` — which is the design's own §1 rule ("DERIVED from the
same data that renders it") applied to data the design could not see.

---

## §2 · Where the derivation lives, and why it is not at the mount

The design places `describeKeyframe` in `TimelineTrack.vue`, "the mount owner". It is instead a
named export of **`TimelineHoverPreview.vue`'s plain `<script>` block**, imported by the track.

This is a placement, not a shape: every clause of §2's function is present, and the mount still
passes the string. The forcing reason is the design's own next sentence — `hasGhost` is *"exported
from THP's script … **not** duplicated by hand in TT (the derived-not-typed rule)"*. After C-5 the
description has **two** such inputs, not one: the ghost predicate **and** the authored caption. Both
live in THP and nowhere else. Composing the sentence at the track would have meant re-deriving both
by hand at the one site the design forbids it.

Placing it in THP also collapses a duplication rather than creating one: the panel's caption, its
`<img alt>` and its ghost arm now read the **same** exported functions
⟨`authoredSelectorOf` · `resolvedPositionOf` · `previewAlt` · `hasGhost` · `GHOST_PROPERTIES` ·
`describeKeyframe` — ⟨cmd⟩ `grep -c '^export const'` → **6**⟩, so the description and the panel
cannot disagree about what the panel shows. `vue-tsc` resolves the SFC's real type, so the named
import typechecks; the `*.vue` ambient shim that would flatten it to a default export is scoped to
`check`'s second leg, which parses no SFC at all ⟨`demo/env.d.ts`, the narrowing comment⟩.

---

## §3 · M7 — DISCHARGED BY MEASUREMENT, not re-spent

M7's convicted mechanism is a **caps register on the declaration dump**. DISSENT-4 binds the
judgement to the verbatim element, so here is the verbatim element at the bytes:

⟨cmd⟩ `grep -A1 'text-mono-small' TimelineHoverPreview.vue` →
`class="text-mono-small text-muted-foreground max-h-[12.6em] overflow-x-clip overflow-y-auto w-full"
data-register="code"`

⟨cmd⟩ `grep -c 'text-admin-label' TimelineHoverPreview.vue` → **0**.

The registers, quoted from the installed producer
⟨`node_modules/@mkbabb/glass-ui/dist/styles/typography/{semantic,utilities}.css`⟩:

- `text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label);
  line-height: 1; **text-transform: uppercase**; letter-spacing: var(--type-tracking-caps);
  font-weight: 500; }` — the convicted one.
- `text-mono-small { font-family: var(--font-mono); font-size: var(--type-small);
  line-height: var(--type-leading-small); }` — **no `text-transform`, no caps tracking**.

**KF.W6's D-4 cure performed the register swap**, and performed it under MISSED-3's law — the box
was re-denominated in the register's own em (`max-h-[12.6em]` = 9 rows × 1.4) **in the same commit**
⟨the file's own MISSED-3 comment block states the derivation⟩. So the demo half of M7 is cured at
the bytes, and MM-29's pairing rider has **no caps register left to pair with**: writing
`normal-case tracking-normal` here would undo nothing and would be inert class noise standing in for
a cure already landed by a closed wave. It is therefore **not written**.

**M7's AT half is cured by this unit, by construction.** The accessible description is a JavaScript
string handed to a prop. No type register reaches a prop, so no `text-transform` can make the
tooltip lie about the case of the CSS it exists to show. Asserted:
`expect(said).toContain("var(--myVar)")` and `expect(said).not.toContain("VAR(--MYVAR)")`.

---

## §4 · One declared contract change, with the measurement that forced it

`TimelineTrack`'s `previews` prop becomes **optional**, as the leaf's own `entry` already is.

The forcing measurement: `.g` replaced `previewCache`/`previewLoading` with a single required
`previews` Map and could not update the two sibling fixtures that mount this component (outside its
writable set — its residual 1, owner `.i`). The only read of that map sat inside `TooltipContent`'s
**slot**, which renders only while the tooltip is open, so the stale mounts never touched it.
**This unit's `:aria-label` is a prop of `TooltipContent` itself**, evaluated on every render of the
panel's mount — which turned a latent break into `TypeError: Cannot read properties of undefined
(reading 'get')` × 16 across fixtures 1 and 2 at the first run.

The cure is the contract, not a guard: a **cache's absence is a cold cache, not an error**. The
track is a geometry and gesture surface that displays an owner-supplied enhancement — every mark,
gesture and keyboard route works without one, and a cacheless mount renders the ghost branch
throughout, which is exactly what the description then says. The read is total at **both** sites
(`previewFor`), never guarded at one of them. No `?.` is scattered through the template, no empty
Map is fabricated, and nothing of the old two-map API survives: the dead `previewCache`/
`previewLoading` keys in fixtures 1 and 2 remain `.i`'s one-line-each cleanup, unchanged.

---

## §5 · Falsifiers (the design's six, re-run at `15c95de1`; double-run identical)

| # | design's falsifier | reading |
|---|---|---|
| 1 | `aria-label` in TimelineTrack ≥ 3 | **6**, enumerated whole so the count hides nothing — `:10` the group's own comment quoting the rail's name (prose) · **`:16` the group** · `:46` pan · `:114` rail · `:206` marker · **`:256` `TooltipContent`**. **five live attributes** (the sixth hit is prose), of which **two are this unit's**; the baseline had three live and no prose hit |
| 2 | `describeKeyframe` definition + ≥ 1 call | **2 files** (`TimelineHoverPreview.vue` defines and exports; `TimelineTrack.vue` imports and calls through `describeStop`) |
| 3 | THP's code register is case-preserving and still bounded | `text-mono-small` + `max-h-[12.6em]` — **§3**; the falsifier's `normal-case tracking-normal` is moot at the bytes |
| 4 | `"p-2 max-w-56"` → 0 | **0** — P2-DEAD was cured by KF.W6's m-17; nothing owed |
| 5 | fixture 3 asserts (a) label-first (b) `; ` + terminal `.` (c) ghost→ready (d) no uppercased token | **all four running**, plus the end-to-end `role="tooltip"` node |
| 6 | `@focus` beside `@mouseenter` on the marker | **1 and 1** |

---

## §6 · G9 — RED → GREEN (settled bytes, double-run identical)

| leg | BEFORE (`41a7ebb6`, §Resume baseline) | AFTER (`15c95de1`) |
|---|---|---|
| the description | reka's untracked, once-captured `textContent` — `TooltipContent` at `:193` carried **no** `:aria-label` | **PASSED**: `:aria-label="describeStop(stop)"` at `:256` |
| `describeKeyframe` in `demo/` | **0 files** | **2 files** |
| `role="group"` on the rail's container | **0** | **1**, named `aria-label="Keyframe timeline"` |
| the graduations | un-hidden; ~5-15 bare percent strings as AT content | `aria-hidden="true"` on the tick band |
| the focus path | capture armed on `@mouseenter` alone | `@focus` and `@mouseenter`, one seam |
| the caps register | — | `text-admin-label` in THP → **0** (KF.W6's swap, measured not assumed) |

**G11 fixture 3's G9 half**: **11 new assertions, RUNNING** — ⟨cmd⟩ `npx vitest run --project demo
test/demo/instrument/timeline-hover-preview.test.ts` → **36 passed** (25 of `.g`'s + 11), twice.
The four fixtures together → **65 passed**, twice. ⟨cmd⟩ `grep -cE '^\s*(test|it|describe)\.skip'`
over all four → **0** (the one match in the tree is the prose line at `:40`). **None of the nine
tracked `test/demo/instrument/` witnesses was edited.**

**Typecheck** — ⟨cmd⟩ `npm run check` → **exit 2**, `error TS` → **54** across **22 files**, ⟨cmd⟩
`grep -cE 'instrument/timeline'` → **0** and `grep -c 'timeline-hover-preview'` → **0**. The 54 are
the frontier's pre-existing set (OrbitalDrag, EasingSidebar, ChannelControls, three `src/` TS6133s
…), byte-for-byte the same 54-over-22 `.g` measured — **not one of them this unit's**. ⟨`.g`'s
receipt recorded this command as *"exit 0"*; measured directly rather than through a pipe it is
**2**, and it was 2 before this unit wrote a byte. The count, not the exit, is the reading that
distinguishes this unit's work from the frontier's, and the count is unmoved.⟩

**Suite** — ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed · 3 expected fail
· 0 failed** (`.g` left 1507 passed; +11 is exactly this unit's).

---

## §7 · Producer seams — nothing filed, nothing patched

The design's §5 names two producer rows (reka's `textContent` fallback; glass's `TooltipContent`
consuming `--reka-tooltip-content-available-height`). Both were relayed by `.f` at **O-28** and are
**not re-filed here**. **I-35 §2 honoured**: *"If you re-file A-9 under `/timeline` at W7 the row
will go missing"* — this unit files **nothing** under `/timeline`, opens no new row, and writes no
byte of `node_modules` or the glass tree. The cure is a prop the producer already declares and
already forwards, which is §0's first measurement and the reason no relay is owed.
