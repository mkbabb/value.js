# CHALLENGE-C — implementation · `PaletteCardSkeleton.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

- **Axis:** CHALLENGE-C (implementation — bugs, races, cleanup, reactivity, error paths, a11y as
  implementation, performance, test truth)
- **Subject:** `demo/palettes/browser/card/PaletteCardSkeleton.vue` (124 lines; area *palettes*)
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- **Hosts:** `demo/palettes/BrowsePane.vue:49` (×4, `variant="developing"`), `:130` (×2, load-more),
  `demo/workbenches/extract/ExtractWorkbench.vue:103` (×1, default `variant="shadow"`)
- **Verdict:** **DEFECTIVE** — 1 BLOCKER, 4 MAJOR, 2 MINOR, 2 INFO
- **Strongest defect:** **C-1** — every prop and every custom property this component writes to
  glass-ui's `Skeleton` is addressed at an API that `@mkbabb/glass-ui@7.0.0` does not have. Measured
  live: all 12 blocks in a card render **one** background, **one** animation-delay (`0s`), and
  **zero** element-level animation. The two-register design, the per-segment specimen hue-walk, the
  staged sweep, and the D9 breath calibration are all inert.
- **Relationship to the sibling seat:** `challenge-L-library.md` (L-1) reached the same root
  independently from the module-boundary axis. This report **corroborates** it from the runtime side
  and adds four findings that axis did not measure: the **ink-polarity inversion with contrast
  numbers in both schemes** (C-2), the **structurally-silent live region ×4** (C-4), the **48
  concurrent compositor animations** (C-5), and the **vacuous-gate mutation** (C-7). It also
  **retracts one inference** that the geometry finding invites — see the honest negative in C-3.

---

## 0. Method — how the loading state was reached

The component only exists mid-fetch, and the local dev server cannot reach it by default:
`demo/platform/transport/availability.ts:150-160` puts a loopback page with no `VITE_API_URL` into
the designed `misconfigured` state, and `client.ts:75` (`assertApiAttemptAllowed()`) short-circuits
every request **before** `fetch` — so `/#/browse` on `http://localhost:9000` never enters
`pm.browsing`, it lands straight on the error `EmptyState`. Two probe attempts confirmed this:

```
$ node .../PCS-probe2.mjs
STATE {
  "skeletons": 0,
  "articles": 0,
  "bodyText": "…dev misconfigured — run `npm run dev`…The commons is unreachable.\nFailed to load palettes…"
}
```

The dev server binds all interfaces (`server.host: true`). Loading the **same** server through the
LAN address defeats `isLoopbackHost()` (`availability.ts:74-82`) without touching a byte of source,
so the real transport path runs and `page.route` can hold `GET /palettes` open — the same idiom as
`e2e/smoke/fixtures/browse-palettes.ts:59`:

```
BASE = http://192.168.1.166:9000     (identical dev server; hostname is not loopback)
route **api.color.babb.dev/**/palettes → 200 after 7000-9000 ms
```

All measurements below are from that live page. Probe scripts (read-only; outside the repo):
`…/scratchpad/PCS-probe3.mjs`, `PCS-probe5.mjs`, `PCS-probe6.mjs`.
Screenshots: `…/scratchpad/PCS-ghost-light.png`, `PCS-ghost-dark.png`.

**No source file was modified by this seat.**

---

## C-1 · BLOCKER — the component drives a producer API that does not exist; all 12 blocks render identically

**Mechanism.** Consumer-side API rot across a producer major. The `surface` / `variant` props and
the `--skeleton-glass-bg` / `--skeleton-shimmer-delay` / `--skeleton-shimmer-tint` seams were real
at the glass-ui **4.0.0** pin — `docs/tranches/N/audit/lanes2/X-GU.md:61` specifies them verbatim
("`<Skeleton surface="glass">` swaps the opaque `bg-muted` block to a translucent
`color-mix(--muted N%, transparent)` via `--skeleton-glass-bg`") and `docs/tranches/N/waves/N.W18.md:506`
books the consume. The demo now pins `"@mkbabb/glass-ui": "^7.0.0"` (`package.json:83`). **Glass 7
dropped all of it, and the consumer was never swept.**

### Evidence 1 — the shipped producer component has exactly one prop

`node_modules/@mkbabb/glass-ui/dist/data-table-BygKg6ZA.js` (the chunk `Skeleton` is bundled into):

```js
inheritAttrs: !1,
__name: "Skeleton",
props: { class: { type: [Boolean, null, String, Object, Array] } },
setup(t) {
  let n = t, r = C(), a = i(() => Object.fromEntries(
      Object.entries(r).filter(([e]) => e !== "role" && !e.startsWith("aria-"))));
  return (t, r) => (h(), s("div", p(a.value, {
      "data-slot": "skeleton", "aria-hidden": "true", class: S(e)("skeleton", n.class)
  }), null, 16));
}
```

`inheritAttrs: false` is then undone by the explicit `mergeProps(attrs)` — so undeclared props are
not dropped, they are **re-emitted onto the DOM as literal attributes**.

### Evidence 2 — the four custom properties have zero readers in the entire producer stylesheet

```
$ cd node_modules/@mkbabb/glass-ui/dist && python3 -c "…count occurrences in glass-ui.css…"
len 69884
skeleton-glass-bg 0
skeleton-shimmer-tint 0
skeleton-shimmer-delay 0
pulse-aura-opacity-max 0
animate-ambient-pulse-easing 0
```

The whole of `.skeleton` in glass-ui 7.0.0:

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);
  background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg,transparent 24%,
  color-mix(in oklab, var(--foreground) 10%, transparent) 48%,transparent 72%);position:absolute;inset:0}
@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{
  animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;
  will-change:transform;transform:translate(-110%)}}
```

`background: var(--muted)` — hardcoded. Tint — hardcoded. No delay seam. No `variant` hook. And no
CSS anywhere matches the emitted attributes:

```
$ grep -rn '\[surface' demo/styles/ node_modules/@mkbabb/glass-ui/dist/**/*.css     → (nothing)
$ grep -rn '\[variant' demo/styles/ node_modules/@mkbabb/glass-ui/dist/glass-ui.css → (nothing)
```

### Evidence 3 — the live DOM, and all 12 blocks measured (not just the first)

`PCS-probe3.mjs`, `/#/browse` mid-fetch, viewport 1280×900, light:

```html
<div data-v-cd03d0b0="" data-v-5d73e53e="" surface="glass" variant="shimmer"
     data-slot="skeleton" aria-hidden="true"
     class="skeleton h-full rounded-none specimen-seg skeleton-seg"
     style="width: 20%; --i: 0; --skeleton-shimmer-delay: 0s;"></div>
```

```json
"blockCount": 12,
"distinctAnimDelays": ["0s"],
"distinctBackgrounds": ["rgb(246, 243, 239)"],
"stripBlock0After": { "animName": "skeleton-scan-cd03d0b0", "animDelay": "0s", "animDur": "5s" },
"swatchLast": { "varShimmerDelay": "1.3399999999999999s" },
"swatchLastAfter": { "animDelay": "0s" }
```

and from `PCS-probe6.mjs`:

```json
"elementAnimationName": "none"
```

Read together, four separate design claims in the file header are false on the pixels:

| claim (file:line) | measured |
|---|---|
| "the sequential top-to-bottom sweep" · `:16-17` | every one of 12 blocks: `animation-delay: 0s`. The `--skeleton-shimmer-delay` writes span `0s → 1.34s` and are read by nothing. |
| "the specimen accent seams" / per-segment `--i` hue walk · `:15`, `utils.css:71-83` | `distinctBackgrounds` has **one** entry. The hue walk resolves and paints nothing. |
| "`shadow` breathes … 0.55 ↔ 0.75" · `:96-99`, `:114-123` | element `animation-name: none`. There is no breath animation in the app at all; `--pulse-aura-opacity-max: 0.75` has zero readers. |
| "PRM stillness … parked at the 0.55 trough" · `:118-119` | nothing is parked anywhere; PRM merely stops the producer's `::after` scan. |

**The two registers are therefore indistinguishable.** `blockVariant` (`:99`) selects between the
strings `"shimmer"` and `"breath"`, both of which land as an inert DOM attribute. `variant` is a
public prop that selects between two identical renders — a false shape in the component's API.

**Also invalid HTML**: `surface` and `variant` are not conforming attributes on `<div>`; 12 per card
× 4 cards = 48 non-conforming attributes on the browse wall at every fetch.

**Reproduction:** `node …/scratchpad/PCS-probe3.mjs` (pasted above). Or by hand: `npm run dev`,
open `http://<LAN-IP>:9000/#/browse` with the palettes route delayed, inspect any
`[data-slot="skeleton"]`.

**Cure (transposition, one of two — never both; edict 2 forbids the dual path).**
1. **Producer-side, preferred (edicts 4 + the standing BH/BI relay).** glass-ui `Skeleton` regains a
   `variant: "shimmer" | "breath"` axis and reads `--skeleton-glass-bg` / `--skeleton-shimmer-delay`
   / `--skeleton-shimmer-tint`. Nothing in the demo moves until that lands, and the relay letter is
   mandatory before the first demo line changes.
2. **Consumer-side, if the producer declines.** Delete `surface`, `:variant`, `blockVariant`, the
   `variant` prop, the four delay writes, and both scoped rules — and paint the bones directly, the
   way the sibling that actually works does: `ShadowPalette.vue` sets `background: var(--skeleton-ink)`
   on its own elements and staggers with a real inline `animationDelay`. That mechanism is the
   survivor; this one is the corpse.

Either way the standing edict-2 consequence is immediate: **a prop that cannot change the render
must not exist.**

---

## C-2 · MAJOR — the certified ink never reaches the pixels, and the ghost's polarity is INVERTED in both schemes

This is C-1's cash-out on the one axis that decides whether a skeleton is legible, and it is this
seat's novel measurement.

`demo/styles/utils.css:56-60` mints the ink as a *certified tone-step of the well ground*, with the
reason recorded in its own comment (`utils.css:44-50`): the previous recipe "was NOT certified
against its ground — in dark it landed ≈ `--well-bg` (probed ΔL 0.007, seg-vs-well 1.02:1),
collapsing the ghost to a featureless slab." The cure was to guarantee "a bounded ΔL from the well
in BOTH schemes by construction (darker than the well in light, lifted above it in dark)."

**That cure is inert.** Nothing reads `--skeleton-glass-bg`, so the block paints glass-ui's
hardcoded `var(--muted)` — a *fixed token*, not a step off the well. Measured (`PCS-probe5.mjs`,
canvas-normalised sRGB, WCAG relative luminance):

| scheme | rendered block | card ground (`--well-bg`) | contrast | direction | intended `--skeleton-ink` | intended contrast | intended direction |
|---|---|---|---|---:|---|---|---|
| light | `rgb(246,243,239)` | `rgb(233,225,217)` | **1.169 : 1** | **LIGHTER** than the well | `rgb(198,191,184)` | 1.406 : 1 | darker than the well |
| dark | `rgb(31,28,25)` | `rgb(66,55,47)` | **1.469 : 1** | **darker** than the well | `rgb(88,78,71)` | 1.427 : 1 | LIGHTER than the well |

Two distinct defects fall out:

1. **Polarity inversion in both schemes.** The design contract is "opaque enough to read
   unambiguously as SHADOW against the field" (`PaletteCardSkeleton.vue:5-6`). In light the ghost is
   *brighter* than the plate it sits on — a highlight, not a shadow. In dark it is *darker* than the
   plate — a hole punched through the card, which is precisely the "opaque `bg-muted` block punches a
   flat hole in the frosted plate" failure that `docs/tranches/N/audit/lanes2/X-GU.md:61` records as
   the original U20 complaint. **The 4.0.0 fix has silently regressed to the pre-4.0.0 defect.**
2. **Light-mode legibility collapse.** 1.169:1 against the ground. The E1-R2 remediation was
   triggered at 1.02:1 in dark; light mode now sits at 1.169:1 with no gate watching it, because the
   ink is no longer a tone-step *of* the ground — the two tokens drift independently.

Screenshot evidence, element-level captures of one live plate:

- `…/scratchpad/PCS-ghost-light.png` — the bones are near-invisible pale rectangles, lighter than
  the card.
- `…/scratchpad/PCS-ghost-dark.png` — the bones are near-black voids, far darker than the card.

The two look like different components, not one scheme-true register.

**Reproduction:** `node …/scratchpad/PCS-probe5.mjs`.

**Cure.** Falls out of C-1. Whichever limb is taken, the ink must be painted by something that
actually reads it, and the guarantee ("bounded ΔL from the well, correct polarity per scheme, by
construction") must be re-established with a measurement, not an assertion — see C-7.

---

## C-3 · MAJOR — the ghost does not predict the card: +50.4 % height, wrong border, wrong shadow, a row the card never renders, and a re-introduced clip defect

Measured in the same run, browse column, viewport 1280 (`PCS-probe3.mjs`):

```json
MID-FETCH: { "rootHeight": 150.38, "rootWidth": 462.12, "rootBorderTop": "1px",
             "rootBoxShadow": "…-2px 2px 0px, …-3px 3px 0px, …-4px 4px 0px",
             "swatchLast": { "w": 56.05, "h": 56.05 } }
LANDED:    { "cardHeight": 100.00, "cardWidth": 462.00, "cardBorderTop": "2px",
             "cardBoxShadow": "…-3px 3px 0px, …-5px 5px 0px, …-7px 7px 0px",
             "stripHeight": 40.00, "cardCount": 6 }
```

| axis | skeleton | real collapsed card | delta |
|---|---|---|---|
| height | **150.38 px** | **100.00 px** | **+50.4 %** |
| border | `border` = 1 px (`:34`) | `cartoon-surface` = 2 px (`PaletteCard.vue:19`; the utility is `@utility cartoon-surface{border-width:2px;box-shadow:var(--shadow-cartoon-md)}` in glass-ui's card styles) | 1 px per edge |
| shadow | `shadow-cartoon-sm` (`:34`) | `--shadow-cartoon-md` | different cast |
| swatch box | 56.05 px (`w-12 … sm:w-14`, `:76`) | 40 px (`swatchClass` default `w-9 h-9 sm:w-10 sm:h-10`, `PaletteCard.vue:197`) | **+40 %** |
| swatch **row** | always rendered (`:70-79`) | `v-if="expanded"` (`PaletteCard.vue:140`) — false for every card at mount | a row that never exists at rest |
| strip | `h-10` = 40 px (`:39`) | 40 px | ✅ matches |
| clip | `overflow-hidden` (`:34`) | deliberately **absent** | see below |

The `overflow-hidden` is not a nit. `PaletteCard.vue:16-18` records why the card does not have it:

> `NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip rasterizes 1-bit at compositing-layer bounds; the strip clips its OWN corners below — an interior clip keeps normal AA.`

The skeleton re-introduces exactly the clip that ruling removed, on a plate that additionally has 48
`will-change: transform` layers inside it (C-5) — the worst case for the 1-bit rasterisation the
ruling names.

### Honest negative — the CLS inference does not hold in the configuration I measured

The geometry gap invites "therefore layout shift". I measured it and it did **not** appear:

```json
PRE-SWAP  { "skeletonBlockHeightSum": 600.00, "shiftsSoFar": 3 }
POST-SWAP { "cardHeightSum": 600.00, "cardCount": 6,
            "cls_total": 0.2153, "cls_since_skeleton": 0 }
```

With a 6-card page the 4 × 150.38 ghost stack and the 6 × 100 card stack happen to sum to the same
600 px, and `<Transition mode="out-in">` unmounts before it mounts, so the swap contributed
**0.0000** to CLS. The page's 0.2153 CLS is pre-existing boot shift, not this component's. The
defect here is **fidelity** — the ghost lies about what is coming — and it becomes a shift only when
`cards × 100 ≠ 4 × 150.38`, which is the general case (the real fixture,
`e2e/.../browse-palettes.ts:22`, returns `PAGE1_COUNT = 50`). Reported as fidelity, not as a
measured CLS regression.

**Cure.** The N.W14 §A ruling (`docs/tranches/N/waves/N.W14.md:308`) already specified it and was
never executed: **the skeleton is a STATE of the card shell, not a sibling file** — one shell, same
radii/border/shadow/strip/meta/swatch geometry, `swatchClass` threaded from the same call site, and
the swatch row rendered only when the card beside it would render one. Zero drift becomes
structurally impossible. That also disposes of the `overflow-hidden` divergence for free.

---

## C-4 · MAJOR — four simultaneous `role="status"` live regions, each structurally incapable of announcing anything

This is a11y-as-implementation, and it is this seat's second novel finding.

Measured on the live browse wall (`PCS-probe6.mjs`, `PCS-probe3.mjs`):

```json
{ "statusRoles": 5,
  "statusLabels": ["Loading palette","Loading palette","Loading palette","Loading palette", null],
  "statusTextContent": "\"\"",
  "statusHasAnyVisibleText": 0,
  "ariaHiddenChildren": 12 }
```

Three coupled defects:

1. **The region has no content to announce.** `role="status"` carries an implicit `aria-live="polite"`;
   what a polite region announces is its *changed content*. This region's `textContent` is the empty
   string, and **all 12 descendants carry `aria-hidden="true"`** — glass-ui's `Skeleton` hardcodes it
   and even strips any `role`/`aria-*` a consumer tries to pass
   (`…filter(([e]) => e !== "role" && !e.startsWith("aria-"))`). The `aria-label` on `:36` *names* the
   region for navigation; it is not the polite update. So the announcement the file's header claims
   as its whole reason for existing — *"this shell keeps `role="status"` + 'Loading palette' because
   HERE work IS happening"* (`:29-31`) — is structurally unreachable.
2. **Four of them at once.** `BrowsePane.vue:50` renders `SKELETON_COUNT = 4` instances; each one is
   its own live region with the identical name. Even in the AT that do announce an inserted named
   region, that is four identical polite announcements for one wait. The load-more path
   (`BrowsePane.vue:130`) adds two more.
3. **No completion announcement.** The regions are unmounted by the `out-in` transition; nothing
   announces that the wall arrived. An AT user gets silence at the start and silence at the end.

Interacting host defect worth relaying with the cure: `BrowsePane.vue:47` puts
`aria-label="Loading palettes"` on a bare `<div>`. A `div` with no role maps to `role="generic"`,
for which ARIA 1.2 prohibits `aria-label`/`aria-labelledby` — the name is dropped. So the *host's*
attempt at an announcement is also void.

Non-findings on this axis, checked and cleared: no interactive descendants, so tap-target and
keyboard/focus-restoration limbs do not apply; the visual REPORT's `/#/browse` counts
(`smallTapTargets: 4` in all four matrices, `namelessButtons: 0`) belong to `SearchFilterBar`, not to
this component — its plates were not on screen in any of the 60 captures.

**Cure.** One live region per wait, owned by the host list, carrying **real text**; the ghost plates
become pure decoration:

- `PaletteCardSkeleton` root: `aria-hidden="true"`, no `role`, no `aria-label`.
- `BrowsePane`: a single `<div role="status" class="sr-only">Loading palettes…</div>` alongside the
  ghost grid, updated to `"Loaded 50 palettes"` (or the error line) when the fetch settles — which
  also gives the completion announcement and kills the void `aria-label` on the generic div.

---

## C-5 · MINOR — 48 concurrent infinite compositor animations for a wait that renders one frame of information

Measured on the browse wall (`PCS-probe6.mjs`):

```json
{ "totalSkeletonBlocksOnPage": 48, "blocksWithWillChangeAfter": 48 }
```

4 plates × 12 blocks, every one with a `::after` running
`skeleton-scan var(--duration-shimmer) ease-in-out infinite` under `will-change: transform` — 48
promoted layers held for the entire fetch, on a plate that is itself `overflow-hidden` (C-3). The
load-more path adds 24 more. `--duration-shimmer` is 5 s here (`demo/DESIGN.md:216`), so each layer
is repainted for the whole wait.

`BrowsePane.vue:205-207` shows the team already reasoned about exactly this budget — *"a handful of
plates reads as 'the wall is developing' without paying 50 shimmer surfaces of compositor work"* —
but capped the wrong dimension: it capped **plates** (4) and left **blocks per plate** at
`2·count + 2 = 12`. The bill is `4 × 12`, not `4`.

**Cure.** Falls out of C-3's shell unification: a ghost that renders only the rows the collapsed card
renders drops to `count + 2 = 7` blocks per plate (28 total, −42 %), and the C-1 cure — one animated
sweep across the plate rather than one per bone — takes it to 4. The correct number of animated
surfaces for "one wall is loading" is one per plate, not twelve.

---

## C-6 · MINOR — `count` is unvalidated at the domain boundary

`:87` `const { count = 5, … }`, consumed three ways with no guard: `v-for="i in count"` (`:41`, `:72`),
`width: ${100 / count}%` (`:48`), and the delay arithmetic (`:60`, `:66`, `:77`).

Domain behaviour, from Vue's own source (`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:3171-3182`):

```js
} else if (typeof source === "number") {
    if (!Number.isInteger(source) || source < 0) {
      warn$1(`The v-for range expects a positive integer value but got ${source}.`);
      ret = [];
    } else { ret = new Array(source); … }
```

| `count` | result |
|---|---|
| `0` | `100 / 0` → `width: Infinity%` (invalid, dropped); both `v-for`s empty → a bare 40 px band with a meta row. No crash. |
| `2.5`, `-1`, `NaN` | Vue dev warning + both rows render empty; `width: 40%` / `-100%` / `NaN%` computed for nobody. No crash. |
| `Infinity` | `Number.isInteger(Infinity)` is `false` → the warn branch, `ret = []`. **No `new Array(Infinity)` RangeError** — checked, not assumed. |
| `16` (slider max) | 34 blocks in one plate; the ghost's swatch row alone is ≥ 2 rows of 56 px that the extract card does not match. |

The only live producer is `ExtractWorkbench.vue:106` ← `session.colorCount` ← the k slider, clamped
`:min="1" :max="16" :step="1"` (`ExtractControls.vue:28-30`) — so today the hazard is **latent**, not
live. Filed as MINOR because the guard lives in a different file from the consumer and nothing binds
them; `useExtractSession.ts:171` (`onKChange`) writes the ref with no clamp of its own.

**Reproduction:** NONE for the failing values — hypothesis-with-mechanism, verified against Vue's
source rather than by driving the UI, because the slider cannot emit them.

**Cure.** The count is not free-form: it is "how many colour cells does the card beside me have".
Under C-3's shell unification the ghost takes the same shape the card takes and the prop disappears.
If a prop must survive, it is `colors: number` clamped at the one place that owns k.

---

## C-7 · MAJOR — vacuous gate: the only test would stay green through every finding above

**Inventory.** Zero unit tests (`grep -rliI skeleton test/` → no hits; `test/demo/` contains only
`palettes/`). Exactly one e2e assertion touches this component:

`e2e/smoke/views/browse-loading.spec.ts:16-45`, in full, asserts:
1. `main.locator('[data-slot="palette-card-skeleton"]').filter({visible:true}).first()` is visible;
2. `main.locator("svg.animate-spin").filter({visible:true})` has count 0;
3. after the fetch, `getByRole("article")` has count `PAGE1_COUNT` and the skeletons are gone;
4. `consoleErrors` is empty.

**The mutation that keeps it green.** Replace the entire template body with

```html
<div data-slot="palette-card-skeleton" class="h-1" />
```

— i.e. delete all 12 `<Skeleton>` children, the `role="status"`, the `aria-label`, the `count` and
`variant` props, the whole `<script setup>`, and both scoped rules. The spec still passes: the
`data-slot` is present and visible, no `svg.animate-spin` exists, the articles still arrive, no
console error is emitted. **The gate tests that a marker attribute exists, and nothing else.**

Consequently the gate is blind to: the dead producer API (C-1), the ink polarity inversion and the
1.169:1 light-mode collapse (C-2), the +50.4 % geometry lie and the swatch row that never exists
(C-3), the four silent live regions (C-4), and the 48-layer budget (C-5). It has been green through
all of them since S.W5-1.

**Cure — three assertions that would have caught this, all cheap:**

1. **Ink certification (kills C-1 + C-2).** In the loading state, read the computed
   `background-color` of a ghost bone and of its host plate; assert the contrast ratio is inside a
   ratified band **and** that the sign of `ΔL` is the ratified one per scheme. This is the
   `utils.css:44-50` claim converted from prose into a gate; it fails the moment a producer bump
   stops reading `--skeleton-glass-bg`.
2. **Geometry parity (kills C-3).** Render one ghost and one collapsed real card in the same column
   and assert `|Δheight| ≤ 2 px`, equal `border-width`, equal `box-shadow`. The N.W14 §A shell makes
   this trivially true; until then it is the drift alarm.
3. **Announcement truth (kills C-4).** Assert exactly **one** `[role="status"]` inside the loading
   region and that its `textContent.trim()` is non-empty.

A fourth, one line, is the general antidote to C-1's whole class and belongs in the glass-7 adoption
sweep rather than here: assert that no element in the app carries a `surface` or `variant` **DOM
attribute** (`document.querySelectorAll('[surface],[variant]').length === 0`). Today that returns 48
on `/#/browse`.

---

## C-8 · INFO — two idiom nits in the render path

- `:46` `:class="variant === 'developing' && 'specimen-seg skeleton-seg'"` binds the boolean `false`
  in the `shadow` register. Vue discards it, so it is not a bug — but the value type of a `:class`
  binding should be `string | undefined`, and the `&&` form reads as a truthiness accident. Once C-1
  lands, the whole binding goes.
- `:49` `'--i': i - 1` passes a **number** to a custom property. Vue's style patcher routes `--*`
  through `setProperty(name, value)`, which stringifies, so it works — but the surrounding three
  writes are template strings and this one is not; the inconsistency is what makes a numeric custom
  property look intentional when it is incidental.

---

## C-9 · INFO — the file's prose is now a false spec, and it is 43 % of the file

```
$ wc -l demo/palettes/browser/card/PaletteCardSkeleton.vue   → 124
comment lines: 53   (42.7 %)
```

Lines 2-31, 96-98 and 103-119 describe, in confident present tense, a rendering that this seat
measured as not happening: two temporal registers, a sequential sweep, the specimen accent seams,
the D9 breath, PRM parked at a 0.55 trough. Two comments even name the correct escape hatch — *"the
choreography goes live the day glass-ui's shimmer reads them"* (`:20-21`) and *"tuned ONLY through
the published seams"* (`:118`) — but they are written as if the seams were published. Under edict 2,
prose that documents an unshipped mechanism is the documentation form of a dual path: a reader (or a
future agent) trusts it and does not check. Every claim it makes must either become a gate (C-7) or
be deleted with the code it describes.

---

## Negative findings — hazards this axis checked and cleared

Stated positively so the absence is evidence, not silence.

| known local hazard | status here |
|---|---|
| `defineModel()` stale round-trip | **absent.** No `defineModel`, no `v-model`, no emits. The component is a pure function of two props. |
| oklch→HSV hue drift / `stableHue` | **absent.** No colour maths; no `value.js` import at all. |
| `ValueUnit` nesting accumulation | **absent.** Nothing is wrapped; no `ValueUnit` reachable from this file. |
| reka-ui pointer-capture leak | **absent.** No pointer handlers, no reka primitive, no interactive descendant. |
| ungated `requestAnimationFrame` (PRM-RAF epidemic) | **absent.** No rAF, no timers, no `setInterval`. The only motion is the producer's CSS `::after`, which *is* PRM-gated (`@media (prefers-reduced-motion:no-preference)` in glass-ui.css). |
| WebGL context loss / eager boot | **absent.** No canvas, no GL. |
| `parseCssColor` crash class / any parsing | **absent.** No string parsing of any kind. |
| listener / observer / subscription leaks | **absent.** No `onMounted`, no `onUnmounted`, no `addEventListener`, no observer. Nothing to clean up, nothing leaked. |
| unbounded growth | **absent.** Render size is `2·count + 2`, bounded by the k-slider's max of 16. |
| async / network / error paths | **absent by construction.** The component performs no I/O; malformed-input surface reduces to `count` (C-6). |
| reactivity that will not fire / fires too often | **clean.** Vue 3.5 reactive props destructure (`:87`) is the ratified idiom; `blockVariant` (`:99`) is a correct `computed`. It recomputes only when `variant` changes — and, per C-1, its output changes nothing. |
| `verbatimModuleSyntax` (edict 8) | **compliant.** Both imports (`:84-85`) are value imports; there is no type-only import to mis-declare. |
| edict 6 (animations never deleted) | **compliant in intent** — the component deletes no keyframe and re-declares none; it only writes seams. The irony is that it also *plays* none. |

---

## Summary table

| id | severity | defect | evidence |
|---|---|---|---|
| C-1 | **BLOCKER** | 4 props + 4 custom properties addressed at a glass-ui API that 7.0.0 does not have; both registers render identically; 48 invalid DOM attributes | `data-table-BygKg6ZA.js` props block; 0/5 seam hits in `glass-ui.css`; live `distinctAnimDelays:["0s"]`, `distinctBackgrounds:[1]`, `elementAnimationName:"none"` |
| C-2 | **MAJOR** | certified ink never painted; ghost polarity **inverted in both schemes**; light-mode contrast collapses to 1.169:1 | `PCS-probe5.mjs` table; `PCS-ghost-{light,dark}.png` |
| C-3 | **MAJOR** | ghost mispredicts the card: 150.38 vs 100.00 px (+50.4 %), 1 px vs 2 px border, cartoon-sm vs -md, 56 vs 40 px swatches, a swatch row the collapsed card never renders, plus a re-introduced S-15-A clip | `PCS-probe3.mjs` MID/LANDED; `PaletteCard.vue:16-19,140,197` |
| C-4 | **MAJOR** | 4 simultaneous `role="status"` regions with `textContent === ""` and 12/12 `aria-hidden` descendants — the announcement is structurally unreachable; no completion announcement | `PCS-probe6.mjs`; glass-ui Skeleton attr filter |
| C-7 | **MAJOR** | vacuous gate — the one e2e assertion survives deleting the entire component body | `browse-loading.spec.ts:16-45` + the named mutation |
| C-5 | MINOR | 48 concurrent `will-change: transform` infinite animations during every browse fetch (74 with load-more) | `PCS-probe6.mjs` |
| C-6 | MINOR | `count` unvalidated: `100/count` and two `v-for` ranges; guarded only by a slider in another file | Vue `renderList:3171-3182`; `ExtractControls.vue:28-30` |
| C-8 | INFO | boolean `:class` binding; numeric custom property | `:46`, `:49` |
| C-9 | INFO | 43 % of the file is prose that documents a rendering which does not occur | `wc -l`; `:2-31,:96-98,:103-119` |

**Verdict: DEFECTIVE.** The premise of this seat holds: the implementation is broken, and it is
broken in the specific way a component breaks when a producer major is adopted whole without a
consumer sweep. The single cure that dissolves C-1, C-2, C-3, C-5 and C-6 at once is the ruling
already on the books and never executed — `N.W14 §A`: **the skeleton is a state of the card shell,
not a sibling file** — executed against a producer API that actually exists, with C-7's three
assertions standing over it so the next producer major cannot rot it in silence.
