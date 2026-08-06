claude-opus-5[1m]

# CHALLENGE — `GalleryAdminBanner.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryAdminBanner.vue`
(107 lines; 3,478 B; mtime 2026-06-17). Read whole, plus every file it imports.

**Substrate.** fourier-analysis HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, tree
`9a66411d16fe4ec564d67367ca55e5f97da2a6d4` — verified live, and certified byte-identical to the
F.W0 scope by intake row **R4-9 (ADOPT-AS-FACT)**. Pins as installed: `@mkbabb/glass-ui ^4.0.0` /
inst **4.0.0** (`web/node_modules/@mkbabb/glass-ui/package.json`); producer latest **7.0.0**
(`/Users/mkbabb/Programming/glass-ui/package.json`).

**Method.** Static + source-derived only. No browser tooling. Every contrast figure below is
computed from the **installed** token bytes
(`node_modules/@mkbabb/glass-ui/dist/styles/tokens/{light-dark,color-radius,dark-arm}.css`) and the
installed Tailwind v4.3.1 palette (`node_modules/tailwindcss/theme.css`), converted
`hsl()`/`oklch()` → sRGB → WCAG 2.x relative luminance, alpha-composited in source order. Each is
reproducible with arithmetic alone; the compositing stack is stated per row. Any claim that needs a
live viewport is marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Six candidate defects were filed and
then **killed by their own falsifiers** — recorded in §7; two of them were promoted into the
evidence for findings that survived, one into a superlative.

---

## §0 — Import closure actually read

| File | Why |
|---|---|
| `web/src/components/visualization/gallery/GalleryAdminBanner.vue` | subject, whole (107 lines) |
| `web/src/lib/types.ts:110-118` | `AdminStats` — **7** fields |
| `node_modules/@mkbabb/glass-ui/dist/components/custom/metric-badge/MetricBadge.vue.d.ts` | the **installed** MetricBadge contract, whole |
| `node_modules/@mkbabb/glass-ui/dist/MetricBadge-BpC0R_Ec.js` | the **compiled render function** — the DOM + hard-coded classnames the `.admin-stat` override actually fights |
| `node_modules/@mkbabb/glass-ui/dist/styles/utilities/components.css:5-134` | `.metric-badge` / `--label-stacked` geometry, hover/press/focus rules, and the `--metric-badge-*` knob surface |
| `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:5-31, 115-122` | the PRM carve + the `pointer: coarse` touch floor |
| `node_modules/@mkbabb/glass-ui/dist/components/ui/button/index.d.ts` + `dist/button-BNDWhAZb.js` | the installed `Button` variant/size cva (the `outline` recipe, the `sm` height) |
| `dist/styles/tokens/light-dark.css:83-88, 92-118, 156-157`; `tokens/dark-arm.css:42-64, 141-142`; `tokens/color-radius.css:270-271` | `--neutral-*`, `--card`, `--foreground`, `--tier-featured`, `--tier-saved` literals |
| `dist/styles/typography/scale.css:87, 100-104`; `typography/utilities.css:29-35, 60-67` | `--type-micro` (11px), `--type-caption` (12px floor), `@utility cm-serif` |
| `dist/styles/theme/bridges.css:61-68`; `tokens/scheme-motion.css:43` | `--font-serif` → `--font-stack-text` → Plus Jakarta Sans |
| `dist/dark.js:14-18` | theme seeding (`auto` → `prefers-color-scheme`) — establishes light as the default arm |
| `dist/styles/tokens/offsets-sizing.css:136, 149-151` | `--ui-scale`, `--control-h-{xs,sm,md}` |
| `web/src/components/visualization/GalleryView.vue:132-135, 188-195, 219-249` | the host: the container rhythm and **both refetch call sites** |
| `web/src/stores/gallery.ts:40-41, 105-133` | `adminStats` / `adminStatsLoading` / `refreshAdminStats` — **the swallowed error** |
| `web/src/style.css:1-3, 13-15, 38-49, 92-96` | glass import, the `--font-sans` remap, the responsive root, the only app-level PRM block |
| **Comparanda (the other 6 `MetricBadge` consumers):** `EquationView.vue:292`, `InfoCard.vue:31`, `AnimationControls.vue:75`, `EditorControlsDock.vue:113`, `EquationPanel.vue:77`, `GalleryDraftsSection.vue:58` | the house idiom this file is the sole outlier from |
| **Comparanda (the 3 admin siblings):** `AdminAuditLog.vue`, `AdminUserList.vue`, `AdminFlaggedPanel.vue` | store-coupling + a11y comparison |
| `glass-ui/src/components/metric/{types.ts,Metric.vue,MetricCell.vue,MetricStack.vue,styles.css}`; `glass-ui/package.json` exports | producer 7.0.0 break/improve surface |
| `web/e2e/visualization-ux.spec.ts:26-43`; `web/e2e/*.spec.ts` | the axe keystone gate and what it never reaches |

---

## §1 — Verdict

| Severity | Count |
|---|---:|
| **BLOCKER** | **3** |
| **MAJOR** | **10** |
| **MINOR** | **9** |
| **INFO** | **5** |
| **TOTAL DEFECTS** | **27** |
| **SUPERLATIVES** (L-18 reverse) | **4** |

**One-line verdict.** This banner exists to say one thing — *you are holding destructive powers* —
and in the default (light) arm it says nothing: the amber plate measures **1.03 : 1**, the amber
border **1.27 : 1**, the shield **1.60 : 1**, and two of the six numbers it exists to show land at
**1.45 : 1** and **2.58 : 1**. Underneath that, three distinct states (loading / failed-fetch /
loaded) collapse onto one branch (`:44`), so a swallowed API error (`gallery.ts:129-130`, literally
`catch { // ignore }`) renders as an empty amber box with a Logout button. And the six numbers it
does show are dressed as buttons — `cursor-pointer`, a hover lift, a press-scale and a focus ring,
all inherited from the primitive and none of them true.

---

## §2 — BLOCKERS

### D-B1 · In the DEFAULT (light) arm the admin banner has no admin register, and two of its six metrics are illegible.
**Severity BLOCKER** — a11y / contrast + the component's entire raison d'être. Token-decidable.

**Provenance.** `:26` — `border-[1.5px] border-amber-500/30 bg-amber-500/[0.04]`; `:30` —
`<Shield :size="16" class="text-amber-400">`; `:57` — `color="var(--tier-featured, #fbbf24)"`;
`:65` — `color="var(--tier-saved, #60a5fa)"`. The value ink is applied inline by the primitive
(`MetricBadge-BpC0R_Ec.js`: `style="{ color: n.color }"` on `.metric-badge__amount`).

**Light is the default.** `dist/dark.js:17` — `m==="dark" || ((m===null||m==="auto") &&
matchMedia("(prefers-color-scheme: dark)").matches)`. With no stored preference the app follows the
OS, so every light-OS operator gets the light arm on first paint.

**Compositing stack (stated so the arithmetic is checkable).**
page `--background` = `--neutral-0` = `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`
(`light-dark.css:83`) → section plate = `amber-500` `oklch(76.9% 0.188 70.08)` at **4 %** over page
(`:26`) → tile plate = `--foreground` at **3 %** over section plate (`:102`).

| element | site | LIGHT | DARK | floor | verdict |
|---|---|---:|---:|---|---|
| amber plate vs page | `:26` | **1.03 : 1** | 1.04 : 1 | — | invisible in **both** arms |
| amber border (30 %) vs page | `:26` | **1.27 : 1** | 1.78 : 1 | 3 : 1 (1.4.11) | **FAIL both** |
| `Shield` amber-400 vs plate | `:30` | **1.60 : 1** | 11.06 : 1 | — | light: gone |
| `.admin-stat` tile vs plate | `:102` | **1.06 : 1** | 1.06 : 1 | — | invisible in **both** arms |
| **`featured` value** `--tier-featured` | `:57` | **1.45 : 1** | 11.94 : 1 | 4.5 : 1 | **LIGHT FAIL** |
| **`saved` value** `--tier-saved` | `:65` | **2.58 : 1** | 8.06 : 1 | 4.5 : 1 | **LIGHT FAIL** |
| metric label `text-muted-foreground/80` | render fn | **3.26 : 1** | 4.92 : 1 | 4.5 : 1 | **LIGHT FAIL** → D-M8 |
| *(control)* default value `--foreground` | `:46,:70,:77,:83` | 15.35 : 1 | 14.53 : 1 | 4.5 : 1 | pass |
| *(control)* `Admin Mode` `--foreground` | `:31` | 16.28 : 1 | 15.35 : 1 | 4.5 : 1 | pass |

**Not large text.** For `size="md"` the primitive selects `text-mono-caption`
(`MetricBadge-BpC0R_Ec.js`, the `_` computed) = `--type-caption` = `clamp(0.75rem, 0.71rem+0.21vw,
1rem)` (`typography/scale.css:100-104`) — a **12 px floor, 16 px ceiling**. WCAG large-text relief
needs ≥ 18.66 px **bold** or ≥ 24 px. The ceiling is 16 px. 4.5 : 1 is required, unconditionally.

**Failure scenario.** A light-OS operator activates admin mode. The chassis that is supposed to
announce "everything you click from here deletes things" renders as a 1.03 : 1 wash with a
1.27 : 1 hairline and an invisible shield — visually indistinguishable from ordinary page content.
Inside it, the two tier counts that carry the only semantic colour in the component (`featured` /
`saved` — the two tiers the admin actually manipulates) are a pale wash at 1.45 : 1 and 2.58 : 1,
while the four neutral counts beside them are crisp black at 15 : 1. The colour that was chosen to
distinguish those two metrics is the thing that erases them.

**Falsifier (applied).** *Would die if* the app forced `.dark` — it does not; `dist/dark.js:17`
seeds `auto` off `prefers-color-scheme`, and `grep -rn "classList.*dark" web/src` shows no force.
*Would die if* the tier tokens resolved differently — they do not: `light-dark.css:156-157` and
`color-radius.css:270-271` both give light `--tier-featured: oklch(0.841 0.173 84.2)` /
`--tier-saved: oklch(0.676 0.176 252.3)`, and the file's own hard-coded fallbacks measure the same
(1.47 : 1 / 2.23 : 1), so the failure is identical whether the token resolves or not. *Would die if*
the tile plate were opaque and dark — it is `--foreground` at **3 %**, which moves the backdrop
luminance from 0.9274 to 0.8718, i.e. by 0.056, nowhere near enough. *Would die if* the values were
large text — the caption rung tops out at 16 px.

**Cure exists under the CURRENT pin** — see §6 items 3 and 5.

### D-B2 · Loading, failed-fetch and loaded-empty all render as the same thing: nothing.
**Severity BLOCKER** — state coverage + prose.

**Provenance.** `:44` — `v-if="stats && !loading"` is the component's **only** branch. There is no
`v-else`, no skeleton, no spinner, no error slot, no `aria-live`. `grep -n "v-else\|error\|Skeleton\|aria-live\|role=\"status\"" GalleryAdminBanner.vue` → **0 hits**. The `loading` prop (`:9`) is
*required* and is used exclusively to **suppress**; it never produces an affirmative treatment.

**Upstream the error is destroyed, not passed.** `stores/gallery.ts:123-133`:
```
async function refreshAdminStats() {
    const token = useAuthStore().getAdminToken();
    if (!token) return;                       // ← silent
    adminStatsLoading.value = true;
    try { adminStats.value = await api.getAdminStats(token); }
    catch { /* ignore */ }                    // ← the error is DELETED
    finally { adminStatsLoading.value = false; }
}
```
So on any failure `adminStats` stays `null`, `adminStatsLoading` returns to `false`, `:44` evaluates
false, and the section renders exactly two things: the words **"Admin Mode"** and a **Logout**
button, inside an amber box whose lower two-thirds is empty air.

**Failure scenario.** Admin token expires, or the stats endpoint 500s, or the network drops. The
operator sees an admin banner that says "Admin Mode" and shows *no statistics at all*, with nothing
on screen distinguishing "the request failed" from "this instance has no data" from "still
loading". They have no reason to retry, no error to report, and — because the banner still asserts
"Admin Mode" — no reason to doubt the surface. The one honest reading available to them ("there are
zero entries") is the one thing the state cannot mean, because `total_entries: 0` would still have
rendered six tiles reading `0`.

**The house has the idiom and this file declines it.** `GalleryView.vue:190, 196` and
`AdminFlaggedPanel.vue:52` both do `toast(e.message ?? "…", "error")`. `refreshAdminStats` is the
**only** admin store action that swallows.

**Falsifier (applied).** *Would die if* the component rendered anything on the false branch — `:44`
has no `v-else` and `:89-90` closes straight into `</section>`. *Would die if* the store surfaced
the error — `gallery.ts:129-130` is a bare `catch {}` with the comment `// ignore`. *Would die if*
`stats` could not be `null` — `:8` types it `AdminStats | null` and `gallery.ts:40` initialises it
`null`, and `deactivateAdmin()` (`:120`) resets it to `null`. *Partially blunted by*: the banner is
`v-if="gallery.adminMode"`-gated at `GalleryView.vue:244`, so the operator at least knows they *are*
in admin mode. That is why this is filed on the stats surface, not the whole component.

### D-B3 · The 7.0.0 uplift deletes `color` with **no successor** — the booked "prop pass" hides a design decision, not a rename.
**Severity BLOCKER** — glass conformance under the old pin / F.W1 planning.

**Provenance — installed 4.0.0.** `MetricBadge.vue.d.ts:25-26`:
```
/** Color applied to the value when it's non-empty. */
color?: string;
```
Used at `:57` and `:65`.

**Provenance — producer 7.0.0.** `glass-ui/src/components/metric/types.ts` in full:
```
export interface MetricValueProps { value?; unit?; placeholder?; loading?; }
interface MetricTextProps extends MetricValueProps { label?; context?; class?; }
export interface MetricProps extends MetricTextProps { size?; orientation?; }
export interface MetricCellProps extends MetricTextProps { icon?; iconSize?; iconStrokeWidth?; }
```
`grep -n "color" glass-ui/src/components/metric/types.ts` → **`iconColor` does not appear either**;
the only colour affordance in the whole 7.0.0 metric family is `--phase-color`-style consumer CSS.
`styles.css:2-4` pins the value ink: `:where(.metric,.metric-cell,.metric-row){ color: var(--foreground) }`.

**The deletion is deliberate, and the producer wrote down why.** The 4.0.0 `MetricCell` doc
(`components/custom/metric-cell/MetricCell.vue.d.ts`) states the law that 7.0.0 then enforces on the
whole family:

> *"Optional accent colour for the **LEADING GLYPH ONLY** … Tints the icon — the one deliberate
> colour event for the cell — while the label, value, and unit stay neutral ink (the
> one-color-event proportion rule, AZ.W-SUFFUSE D3)."*

So `GalleryAdminBanner`'s two tinted numerals are not merely using a removed prop; they are the
exact pattern the producer's proportion rule forbids, and 7.0.0 removes the affordance that made it
possible.

**Full prop delta for this file's six call sites (`:45-88`):**

| this file | 4.0.0 | 7.0.0 | consequence |
|---|---|---|---|
| `from "@mkbabb/glass-ui/metric-badge"` `:5` | export key present (80 keys) | **absent** — 7.0.0 has `./metric` only | hard module-resolution failure |
| `<MetricBadge>` | symbol exists | `Metric` / `MetricCell` / `MetricRow` / `MetricStack` | symbol rename |
| `label-position="stacked"` ×6 | `labelPosition` | **`orientation`** | rename |
| `size="md"` ×6 | `MetricBadgeSize` | `MetricSize` — `md` survives | OK |
| `label="…"` ×6 | `label` | `label` | OK |
| **`color="var(--tier-…)"` ×2** `:57,:65` | `color` | **DELETED, no successor** | **the tier semantics die** |
| `.admin-stat` class hook `:99-106` | fights `.metric-badge--label-stacked` | fights `.metric[data-orientation]` | every override needs re-derivation |

**Why this is a BLOCKER and not a MINOR.** `strictTemplates` is **not** enabled — `web/tsconfig.json`
has no `vueCompilerOptions` block at all (read whole; 20 lines). So `label-position` and `color`
would not fail `vue-tsc`; they would become **fallthrough attributes** on a `<span>`, silently. The
component would compile clean, render in the wrong orientation, and lose both tier tints — the
worst possible failure mode for an atomic tri-package transaction whose gate is a typecheck.

**Corpus reconciliation — EXTENDING, not contradicting.** `lane-frontend.md:472` books the subpath
removal and says only *"another prop pass is due"*; `CENSUS §2 C-4` corrects the file count to 7 and
budgets "7 files for the `./metric` cure". Both are upheld — this file is one of the 7 (verified:
`grep -rn "metric-badge" web/src` → exactly 7 files). Neither enumerates the prop delta, and
`grep -n "orientation\|labelPosition\|color=" formation/fourier/lane-frontend.md
formation/fourier/CENSUS-2026-08-03.md` → **0 hits for the metric family**. The unbooked part is
that **one of the props has no successor**, which makes this file's cure a design ruling
(→ BH-inbox ADOPTION-ASK, §6 item 6) rather than a mechanical rename — and it is the *only* one of
the 7 consumers that passes a token-valued `color` alongside a `labelPosition` (verified below).

**Falsifier (applied).** *Would die if* 7.0.0 kept `color` — `types.ts` read whole, four interfaces,
no `color` member. *Would die if* `./metric-badge` survived — `python3 -c "json.load(...)['exports']"`
on the 7.0.0 `package.json` returns `./metric` and no `./metric-badge`, `./metric-cell` or
`./metric-stack`. *Would die if* another consumer had the same shape — the other six all use the
default inline pill (`EquationPanel.vue:77-82`, `InfoCard.vue:31-36`, `EquationView.vue:292-297` pass
`:color="eColor"` at `size="sm"` **without** `labelPosition`; `AnimationControls.vue:75`,
`EditorControlsDock.vue:113`, `GalleryDraftsSection.vue:58` pass neither). This file is the sole
site where the geometry prop and the deleted prop combine.

---

## §3 — MAJORS

### D-M1 · Six static numbers are dressed as buttons: pointer cursor, hover lift, press-scale, focus ring — all false.
**MAJOR** — a11y + affordance honesty.
**Provenance.** The primitive hard-codes the interactive costume on its root
(`MetricBadge-BpC0R_Ec.js`):
```
cn("metric-badge cursor-pointer",
   "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", …)
```
and `utilities/components.css:50-66` adds `:hover { scale: 1.02; background→--glass-bg-resting;
box-shadow lifts }`, `:active { scale: 0.96 }`, `:focus-visible { box-shadow: var(--focus-ring-shadow) }`.
The consumer attaches **nothing**: `grep -n "@click\|role=\|tabindex" GalleryAdminBanner.vue:44-89`
→ 0 hits, and `.admin-stat` (`:99-106`) does not reset `cursor`.

**Failure scenario.** The operator moves across the stat cluster; six tiles light the pointer cursor
and lift 2 %. In an admin panel a stat tile that behaves this way means "click to filter / drill in"
— it is the single most conventional affordance on the surface. They click `featured`. The tile
presses to 0.96 and springs back. Nothing happens. Six times. Meanwhile the `focus-visible:` classes
and the `:focus-visible` box-shadow are unreachable dead paint: the root is a `<div>` with no
`tabindex`, so it can never receive focus.

**PRM residual, honestly scoped.** `a11y-overrides.css:13-16` clamps `transition-property` to
`opacity, color, background-color, border-color, box-shadow !important` under
`prefers-reduced-motion: reduce`, so the *transition* of the scale is removed — the producer handles
this correctly. The `scale: 1.02` / `0.96` still **applies instantaneously**. An instantaneous
transform is not "animation" under 2.3.3, so this is a comfort note inside the finding, not an SC
failure, and the falsifier that would have made it one is recorded in §7 (K-6).

**The uplift CURES this** — `grep -n "cursor" glass-ui/src/components/metric/{styles.css,*.vue}` →
**0 hits**; 7.0.0's `.metric` / `.metric-cell` carry no cursor, no hover, no press, no focus rules.
See §6 item 4.

**Falsifier (applied).** *Would die if* the consumer could suppress it without a fight — it cannot
via props (`MetricBadge.vue.d.ts` has no `interactive`/`as` prop), only by adding
`cursor: default; pointer-events: none` to `.admin-stat`. *Would die if* the tiles were meant to be
interactive — `:44-89` binds no handler and `GalleryView.vue:243-248` listens only for `@logout`.

### D-M2 · `.admin-stat` half-neutralizes the primitive: it kills the plate but keeps the border, the blur, the shadow and the hover.
**MAJOR** — glass conformance + design coherence.
**Provenance.** `:96-98` states the intent —
> *"`<MetricBadge>` ships its own tabular-nums + stacked geometry; we project the surrounding
> `p-1.5 rounded bg-foreground/[0.03]` tile via the consumer-side host class so the cluster keeps
> its visual register."*

`:99-106` then overrides six properties. What it does **not** override, from
`utilities/components.css:7-39`, survives intact:

| declaration | source | overridden by `.admin-stat`? | delivered |
|---|---|---|---|
| `background: var(--glass-bg-quiet)` | `:31` | **yes** (`:102`) | 3 % foreground wash |
| `border-radius: var(--radius-pill)` | `:30` | **yes** (`:101`) | 0.375 rem |
| `padding` | `:17-19` + `:104` | **yes** (`:100`) | 0.375 rem all sides |
| `display: inline-flex` | `:8` | **yes** (`:103`) | `flex` |
| `align-items: flex-start` | `:98` | **yes** (`:105`) | `center` |
| **`border: 1px solid var(--glass-border-quiet)`** | `:29` | **no** | ✔ still painted |
| **`backdrop-filter: var(--glass-blur-quiet)`** | `:32` | **no** | ✔ still compositing |
| **`box-shadow: 0 1px 6px … , var(--glass-highlight)`** | `:33` | **no** | ✔ still painted |
| **`overflow: hidden`** | `:20` | **no** | ✔ → D-M6 |
| **`min-height: 2.625rem`** | `:103` | **no** | ✔ |
| **`:hover` / `:active` / `:focus-visible`** | `:50-66` | **no** | ✔ → D-M1 |

**The cascade is not in doubt.** glass-ui's rules are inside `@layer components`
(`utilities/components.css:5`); a Vue SFC `<style scoped>` block emits **unlayered** rules, and
unlayered declarations beat every `@layer` regardless of specificity or source order. So the six
overrides win — deterministically, and the seven survivors survive — deterministically.

**And the knob surface exists.** The primitive exposes `--metric-badge-{bg,border,radius,blur,shadow,padding-block,padding-inline,padding-block-stacked,max-width,min-height-stacked,label-gap-stacked}`
— eleven custom properties whose entire purpose is consumer retheming without a specificity fight
(`components.css:14-33, 96-105`; the sibling idiom is `components.css:126-134`, where `.metric-pill`
retints via `--metric-badge-padding-block-stacked` rather than `padding`). The file uses **none** of
them.

**Failure scenario.** The delivered tile is neither the glass pill the library ships nor the flat
`bg-foreground/[0.03]` plate the comment describes: it is a squared-off glass pill with a
near-transparent fill, still carrying a glass border, a glass highlight shadow and a backdrop blur,
and still lifting on hover. In the light arm all of that measures 1.06 : 1 against its own backdrop
(D-B1), so what the operator sees is a hover-reactive rectangle of nothing.

**Falsifier (applied).** *Would die if* `.admin-stat` also reset border/backdrop-filter/box-shadow —
`:99-106` is six declarations, read whole. *Would die if* the scoped block lost the cascade — it
cannot; unlayered beats layered (this was my K-5 candidate defect, killed and repurposed as the
evidence here). *Would die if* Vue did not stamp the parent scope id onto the child root —
MetricBadge has a single root `<div>` (render fn), which is exactly the case where Vue does.

### D-M3 · `MetricCell` — the tile this file hand-rolls — is exported at the **installed** pin, and adopting it *lowers* uplift risk.
**MAJOR** — glass conformance, curable today.
**Provenance.** 4.0.0 `package.json` exports (80 keys) include **`./metric-cell`** and
**`./metric-stack`** alongside `./metric-badge`.
`components/custom/metric-cell/MetricCell.vue.d.ts` documents the primitive as, verbatim, the
collapse of exactly this duplication:

> *"compact metric card (icon-on-label, stacked value + unit) on a wash-tier glass surface … The
> original consumer had the same 11-class string repeated four times: `<div class="glass-wash
> rounded-lg p-3">` … The shape is generic enough that any dashboard / detail-sheet / summary
> surface composing icon + label + value + unit on a tile hits the same gestalt."*

with `appearance: "dashboard" | "compact" | "bare"` — `compact` being `text-mono-caption` value +
`p-2` tile, i.e. the precise register `.admin-stat` re-derives by hand.

**The non-obvious part — this is the *low-risk* migration, not the high-risk one.** At 7.0.0
`MetricCell` **survives** (`glass-ui/src/components/metric/index.ts` exports it; `MetricCellProps`
keeps `label`/`value`/`unit`/`placeholder`/`icon`/`iconSize`/`iconStrokeWidth` and **gains**
`loading`). `MetricBadge` does **not** survive under any name. So a consumer that moves
`MetricBadge` → `MetricCell` *now*, at the installed pin, converts its F.W1 exposure from
"symbol deleted + prop deleted + geometry override re-derived" into "import path changes from
`./metric-cell` to `./metric`, drop `appearance`". That is a genuine ordering insight the census's
flat "7 files for the `./metric` cure" budget does not carry.

**Failure scenario (of not doing it).** F.W1 opens against a 7-file budget, hits this file, and
discovers it is not a rename but a re-layout: six call sites, a deleted colour prop, and a
consumer CSS block calibrated against class names that no longer exist.

**Falsifier (applied).** *Would die if* `MetricCell` were absent at 4.0.0 — `ls
dist/components/custom/metric-cell/` returns `index.d.ts` + `MetricCell.vue.d.ts`, and
`dist/metric-cell.d.ts` re-exports them. *Would die if* `MetricCell` were also removed at 7.0.0 —
`glass-ui/src/components/metric/index.ts:2` exports it. *Would die if* `MetricCell` could carry the
tier tint — it cannot; only `iconColor`, and only on the glyph (which is exactly D-B3's ask).

### D-M4 · Every `setTier` and every batch action collapses the banner by ~92 px and reflows the page beneath it.
**MAJOR** — motion / interaction proportion. **The commonest admin gesture in the app.**
**Provenance.** `:44` is `v-if="stats && !loading"`, so a refetch **with stats already loaded**
unmounts the entire grid. `GalleryView.vue:132-135`:
```
async function handleSetTier(hash, tier) {
    await gallery.setTier(hash, tier);
    if (gallery.adminMode) gallery.refreshAdminStats();   // ← :134
}
```
and `GalleryView.vue:194` does the same after every batch action. `refreshAdminStats`
(`gallery.ts:126, 132`) flips `adminStatsLoading` true→false around the request.

**Measured collapse.** Each tile's height is governed by
`--metric-badge-min-height-stacked: 2.625rem` (`components.css:103`) = **42 px**; row gap is
`gap-2` = 8 px (`:44`). At the ≥ 768 px root of 16 px (`style.css:44-49`), the grid is
`repeat(auto-fit, minmax(5rem, 1fr))` — 6 tiles at a minimum 80 px + 8 px gutters. The grid is
therefore **at least two rows** unless the container exceeds `6×80 + 5×8 = 520 px`, giving
**≥ 42 px and typically 92 px** of vertical collapse, plus the loss of `gap-2` between the header
row and the grid.

**Failure scenario.** The admin clicks the crown on a gallery card to feature it. The stat grid
vanishes; the banner shrinks by ~92 px; the featured carousel and the entire infinite grid below it
jump up by 92 px — under the cursor that is still hovering the card they just clicked; then, on
response, everything jumps back down. Repeat per tier change and per batch action. There is no
skeleton and no reserved height.

**UNPROVEN-NEEDS-LIVE (SS-13):** the exact column count (and hence 1-row vs 2-row collapse) at a
given gallery-panel width. The lower bound (≥ 42 px, single row) is static-certain.

**Cure available under the CURRENT pin:** `dist/index.d.ts` exports `Skeleton`; or simply
`v-if="stats"` + a `loading`-driven opacity, keeping the box. `MetricCell` at 7.0.0 has a first-class
`loading` prop with `aria-busy` (`Metric.vue:24`) — see §6 item 4.

**Falsifier (applied).** *Would die if* the grid were `v-show`, or the section had a `min-height` —
`:25-28` carries neither. *Would die if* `refreshAdminStats` were only called on activation — it is
called from `activateAdmin` (`gallery.ts:111`) **and** `GalleryView.vue:134` **and**
`GalleryView.vue:194`; the latter two both fire with `stats` already populated.

### D-M5 · `formatBytes` bakes the unit into the value string, bypassing the primitive's `unit` prop.
**MAJOR** — typography + library-affordance bypass.
**Provenance.** `:16-21` returns `"1.2 MB"`; `:83` passes it as `:value`. The primitive ships a
dedicated `unit?: string` (`MetricBadge.vue.d.ts:8`) rendered as a **separate** span at a **smaller,
muted** register — `.metric-badge__unit font-mono text-muted-foreground shrink-0` + `text-caption`
for `size="md"` (render fn), baseline-aligned against the value inside `.metric-badge__row`
(`components.css:112-116`).

**Failure scenario.** Five tiles read as `1,234` in `font-semibold tabular-nums` full-ink mono; the
sixth reads `1.2 MB` where the unit carries the **same weight, same size, same ink and the same
`tabular-nums`** as the quantity. Visually the storage tile's value is 6 glyphs where the others are
4, so the cluster's optical rhythm breaks on the one tile that most needs to read as
"quantity + unit". `tabular-nums` on the letters `MB` is also simply wrong — it pins letterforms to
digit advance widths.

**And the house already does it right.** `AnimationControls.vue:75` — `<MetricBadge :value="anim.speed" unit="×" size="sm" />`; `EquationPanel.vue:77-82` — `unit="%"`; `InfoCard.vue:31-36` —
`unit="% energy captured"`. **Three of the six sibling consumers** use the `unit` prop. This file is
the only one that concatenates.

**Falsifier (applied).** *Would die if* `unit` were absent at this pin — `MetricBadge.vue.d.ts:8`
declares it and the render fn emits it in **both** the stacked and inline branches. *Would die if*
the split were awkward — `formatBytes` already computes the unit as a literal on every branch
(`:17-20`); returning a tuple is a two-line change.

### D-M6 · Unformatted counts, plus `overflow:hidden` + `truncate` on a 5 rem track — a large number renders as a **wrong** number.
**MAJOR** — typography + information integrity.
**Provenance.** `:46`, `:70`, `:77` pass `stats.total_entries` / `total_views` / `total_likes` raw —
no `toLocaleString`, no `Intl.NumberFormat`. `grep -rn "toLocaleString\|Intl.NumberFormat" web/src`
→ **one** hit, `AdminAuditLog.vue:57` (a date). Meanwhile the value span carries `truncate`
(render fn) inside a root with `overflow: hidden` (`components.css:20`, un-overridden — D-M2), in a
`minmax(5rem, 1fr)` track (`:44`).

**Mechanism (static).** Content box at the minimum track = 80 px − 12 px padding (`:100`) − 2 px
border = **66 px**. `text-mono-caption` is `--font-mono` at `--type-caption` with
`--type-tracking-wider` (`typography/utilities.css:29-35`); at the 12 px floor a monospace advance is
≈ 0.6 em ≈ 7.2 px plus tracking ≈ 7.8 px/glyph → ≈ **8 glyphs**; at the 16 px ceiling ≈ **6**.
`truncate` bundles `white-space: nowrap`, which defeats the primitive's own
`overflow-wrap: anywhere` escape hatch (`components.css:41-48`), so the overflow resolves as an
**ellipsis, not a wrap**.

**Failure scenario.** A gallery with 1,240,000 cumulative views renders `1240000` — already hostile
to read at 12 px mono uppercase — and, once the tile is at or near its minimum track, renders
`124000…`. That is not a degraded display of a statistic; it is a **different statistic**, shown
without any signal that it has been cut. With thousands separators (`1,240,000`, 9 glyphs) the
truncation threshold gets *worse*, so the two halves of this defect must be cured together —
separators **plus** an abbreviating formatter (`1.24M`) or a wider minimum track.

**UNPROVEN-NEEDS-LIVE (SS-13):** the exact digit count at which the ellipsis fires for a given
panel width. The mechanism (nowrap + hidden + bounded track + no separators) is static and stands.

**Falsifier (applied).** *Would die if* the value could wrap — `truncate` sets `white-space: nowrap`,
which wins over `overflow-wrap`. *Would die if* the track could not reach its minimum — `auto-fit`
packs to `minmax(5rem, 1fr)`, so at 6 columns the tracks sit at 80 px whenever the container is
≤ 520 px. *Would die if* the house formatted numbers elsewhere and this were the outlier by
accident — it is the house-wide absence (1 hit, a date), so the cure is a house decision.

### D-M7 · `stats.normal` is dropped: the operator is shown four of six categories and cannot close the arithmetic.
**MAJOR** — information design / prose.
**Provenance.** `types.ts:110-118` — `AdminStats` has **7** fields: `total_entries`, `featured`,
`saved`, **`normal`**, `total_views`, `total_likes`, `storage_bytes`. The template renders **6**
(`:46,:54,:62,:70,:77,:83`). `grep -n "normal" GalleryAdminBanner.vue` → **0 hits**.

**Failure scenario.** The banner shows `total_entries 1,000 · featured 20 · saved 300`. Those three
numbers invite exactly one inference — *what are the other 680?* — and the surface never answers,
even though the answer is sitting unused in the prop it already receives. The two tiers that *are*
shown are the two the admin can set; the one that is hidden is the default state everything falls
back to. Worse, the operator cannot verify the invariant `total = featured + saved + normal`, so a
backend counting bug is invisible on the one surface built to expose it.

**Falsifier (applied).** *Would die if* `normal` were derivable and the omission deliberate — it is
derivable (`total − featured − saved`), which makes the omission *more* odd, not less: the derived
value is free and the tile costs 5 lines. *Would die if* the grid could not take a seventh tile —
`repeat(auto-fit, minmax(5rem,1fr))` reflows for free; 7 tiles is the same two rows.

### D-M8 · Every metric label fails AA in the light arm — and the labels are the only thing naming the numbers.
**MAJOR** — a11y / contrast, token-decidable.
**Provenance.** The primitive paints the label
`text-muted-foreground/80` at `text-mono-micro` for `size="md"` (render fn, the `y` computed) =
`--type-micro: 0.6875rem` — **a fixed 11 px, explicitly non-fluid** (`typography/scale.css:87`).
`--muted-foreground` = `--neutral-5` = `light-dark(hsl(30 22% 40%), hsl(34 14% 62%))`
(`light-dark.css:88`).

**Measured** (80 % over the `.admin-stat` tile plate, itself 3 % foreground over the 4 % amber
plate over the page): **light 3.26 : 1** / dark 4.92 : 1. AA for 11 px text is 4.5 : 1.
**Light FAILS by a full point.**

**Failure scenario.** Six numerals in a row with no other identification. The words `entries`,
`featured`, `saved`, `views`, `likes`, `storage` are what make the cluster a report instead of a
digit soup — and in the default arm they are the least legible thing in the component, at 11 px,
uppercase, letter-spaced (`--type-tracking-wider`), at weight 300 (`.metric-badge__label { font-weight: var(--metric-badge-label-weight, 300) }`, `glass-ui.css`). Small + light + tracked +
low-contrast is the four-way worst case.

**This is inherited, not authored** — the `/80` and the 11 px come from the library — which is why
the cure is a producer-side ask (§6 item 6) or a consumer `--metric-badge-label-weight` /
`size="lg"` bump, not a local class.

**Falsifier (applied).** *Would die if* 11 px qualified for large-text relief — it does not (needs
≥ 18.66 px bold). *Would die if* the consumer had already lifted it — `.admin-stat` (`:99-106`)
touches no colour and no font weight. *Would die if* `text-muted-foreground/80` composited more
favourably in oklab (Tailwind v4's mix space) than in sRGB — mixing a colour with `transparent` is
an alpha change in either space, so the composite is the same; the 1.24-point shortfall is far
outside any rounding difference.

### D-M9 · The stat cluster appears and disappears with no announcement, and the entire admin surface is outside the axe gate.
**MAJOR** — a11y + verification coverage.
**Provenance (a).** `grep -n "aria-live\|role=\"status\"\|aria-busy\|sr-only" GalleryAdminBanner.vue`
→ **0 hits**. The grid mounts on activation and unmounts/remounts on every refetch (D-M4) with no
live region, so a screen-reader operator gets no signal that six statistics arrived, vanished, or
changed.
**Provenance (b).** The repo *has* an axe keystone gate — `e2e/visualization-ux.spec.ts:26-43`
(`AxeBuilder … withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])`, serious/critical must be empty)
and a second in `visualization-crud.spec.ts:81-83`. But
`grep -rn "adminMode\|Admin Mode\|admin-stat\|Admin mode banner" web/e2e/` → **0 hits across all 8
spec files**. Admin mode is never entered, so this banner — and `AdminAuditLog`, `AdminUserList`,
`AdminFlaggedPanel` with it — has **never been swept**.

**Failure scenario.** D-B1's contrast failures are exactly the class axe reports as *serious*
(`color-contrast`). The gate that would have caught them exists, passes, and never visits the route.
The banner's a11y posture is therefore unverified by construction, and F.W1 has no regression net
for whatever it changes here.

**Falsifier (applied).** *Would die if* a live region existed on an ancestor —
`GalleryView.vue:219-249` is `<div class="flex flex-col gap-4 overflow-y-auto h-full py-4">` with no
aria attributes. *Would die if* any spec reached admin mode — 0 hits over `web/e2e/*.spec.ts`.
*Honest scope on (b):* axe's `color-contrast` rule needs the element rendered, so this is a coverage
claim, not proof that axe would flag these specific nodes — but the light-arm figures in D-B1 are
computed, not inferred, and stand independently.

### D-M10 · `<Button variant="outline">` is an unknown prop at 7.0.0. **FAMILY — first filed elsewhere.**
**MAJOR** — glass conformance under the old pin.
**Provenance.** `:32-37` — `<Button variant="outline" size="sm" …>`. Installed 4.0.0
(`components/ui/button/index.d.ts`) accepts
`variant?: "link"|"default"|"solid"|…|"outline"|"secondary"|"accent"|"ghost"|"glass"|…`. Producer
7.0.0 (`glass-ui/src/components/button/Button.vue`) renames the axis to
`emphasis?: "primary"|"secondary"|"quiet"|"text"` — `"outline"` has no member at all.
`size="sm"` survives.

**Attribution.** This is not my finding. It is filed in full, with its 37-file blast radius and its
"unbooked in the corpus" proof, as **D-B4** in
`docs/tranches/V/megatranche/audit/fourier-components/AdminAuditLog/challenge-D-design.md`. I record
this file's **one** site so the wave's per-file budget is right, and I count it once here because it
does break *this* file — priority belongs to the sibling challenge.

**Second-order note this file adds.** The 4.0.0 `outline` recipe is
`border border-input bg-background hover:bg-accent …` (`dist/button-BNDWhAZb.js`) — the **only**
variant in the grammar that paints an opaque `bg-background`. It is designed to sit *on the page*,
not on a tinted plate. Placing it on the amber banner punches a page-coloured rectangle through the
wash. In practice the wash is 1.03 : 1 (D-B1) so nothing is visually lost today — but any cure that
makes the amber plate visible will expose this, and the correct target is `variant="ghost"` (7.0.0:
`emphasis="quiet"`), which is also the variant the sibling `GalleryDraftsSection.vue:53` uses for
the same in-plate role.

---

## §4 — MINORS

- **D-m1 · `cm-serif` never delivers Computer Modern; it resolves to the browser's generic `serif`.**
  `:31` — `<span class="cm-serif …">Admin Mode</span>`. The utility is
  `@utility cm-serif { font-family: var(--font-serif-math, serif); }`
  (`glass-ui/dist/styles/typography/utilities.css:65-67`), and
  `grep -rn "font-serif-math" web/src node_modules/@mkbabb/glass-ui/dist` returns **exactly that one
  line** — the variable is never assigned. The app's Computer Modern stack is bound to a *different*
  token: `style.css:13-15` sets `@theme { --font-sans: "Computer Modern Serif", … }`, while
  `body` applies `font-serif` (`style.css:18-22`) which glass-ui bridges to
  `--font-serif: var(--font-stack-text)` → **Plus Jakarta Sans** (`theme/bridges.css:68`,
  `tokens/scheme-motion.css:43`). So the banner title renders in Times/generic serif, the body text
  around it in Plus Jakarta Sans, and the brand face named in the class is applied to neither.
  Repo-wide: **15 `cm-serif` call sites** (`grep -rn "cm-serif" web/src`). *Falsifier:* would die if
  `--font-serif-math` were assigned anywhere — one hit, the fallback itself. **Not in the corpus**
  (`grep -n "cm-serif\|font-serif-math"` over `formation/fourier/` → 0 hits).
- **D-m2 · `aria-label="Admin mode banner"` names the implementation and collides with a landmark word.**
  `:27`. A named `<section>` becomes a `region`, so AT announces *"Admin mode banner, region"* —
  while `banner` is also the ARIA landmark for a site header. The name should describe the content
  ("Admin mode statistics"), not the widget. *Falsifier:* would die if `role="banner"` were present
  (it is not) — the collision is in the spoken name, not the role, which is why this is MINOR.
- **D-m3 · No heading; the admin surface has no entry in the document outline.** `:31` is a
  `<span class="text-sm font-semibold">`, not an `<h2>`/`<h3>`. `grep -n "<h[1-6]"` over
  `GalleryAdminBanner.vue` **and** `GalleryView.vue` → **0 hits**. Heading navigation cannot reach
  the admin surface at all.
- **D-m4 · The hard-coded colour fallbacks have already drifted from the tokens they shadow.**
  `:57` `#fbbf24` and `:65` `#60a5fa` are raw Tailwind `amber-400` / `blue-400`. The live tokens are
  `--tier-featured: oklch(0.841 0.173 84.2)` and `--tier-saved: oklch(0.676 0.176 252.3)`
  (`color-radius.css:270-271`) — neither equals its fallback, and the dark arm differs again
  (`dark-arm.css:141-142`). The house idiom is the Tailwind bridge class
  (`GalleryCard.vue:150-151` — `text-tier-featured` / `text-tier-saved`, backed by
  `bridges.css:198-199`), which cannot drift.
- **D-m5 · `minmax(5rem, 1fr)` is an off-token magic number and the file has zero responsive
  treatment.** `:44`. `grep -c "sm:\|md:\|lg:\|@container" GalleryAdminBanner.vue` → **0**. `5rem`
  matches no spacing or sizing token in `tokens/offsets-sizing.css`.
- **D-m6 · The `abbreviation` channel is unused.** `MetricBadge.vue.d.ts:13-19` ships a documented
  compact-label sibling span (`.metric-badge__label--abbr`) explicitly for consumer container-query
  toggling — the exact affordance for a 6-tile cluster in a narrow panel whose labels are the
  longest strings in it. All six sites pass `label` only (`:47,:55,:63,:71,:78,:85`).
- **D-m7 · Six `backdrop-filter` compositing layers over a flat fill.** `components.css:32`
  survives `.admin-stat` (D-M2), so each of the six tiles requests
  `backdrop-filter: var(--glass-blur-quiet)`. Their backdrop is `bg-amber-500/[0.04]` (`:26`) — a
  uniform fill, over which a blur is an identity operation. Six promoted layers, no pixels changed.
  *UNPROVEN-NEEDS-LIVE (SS-13)* whether anything non-uniform ever sits behind the banner; the six
  layers are static-certain.
- **D-m8 · The only control in the banner is rendered in its quietest available treatment.**
  `:32-37` — `variant="outline"` + `class="… text-muted-foreground"`. The sole interactive element
  on an elevated-privilege surface is painted as caption ink while six non-interactive tiles carry
  full-ink numerals and hover lift (D-M1). The interaction hierarchy is inverted.
- **D-m9 · Leaving admin mode is instant, unconfirmed and undoable only by re-authenticating.**
  `:38` `@click="emit('logout')"` → `GalleryView.vue:247` → `deactivateAdmin()`
  (`gallery.ts:117-121`), which calls `adminLogout()`, clears `adminMode` and nulls `adminStats`.
  The neighbouring destructive action in the same view *does* confirm
  (`GalleryView.vue:139` — `if (!confirm("Delete this gallery entry?")) return;`). Not a data loss,
  so MINOR — but it is a one-click exit with no statement of consequence next to a `ml-auto` edge
  where mis-clicks land.

---

## §5 — INFO

- **D-i1 ·** The label prose is authored lowercase (`:47` `"entries"`, `:55` `"featured"`, …) and
  rendered **uppercase** by `text-mono-caption`/`text-mono-micro`'s `text-transform: uppercase`
  (`typography/utilities.css:33`). Harmless, but the source strings are not the rendered strings —
  worth knowing before anyone "fixes" the casing at the wrong end.
- **D-i2 ·** `formatBytes` (`:16-21`) divides by **1024** and labels the results **KB / MB / GB**.
  The 1024-based units are KiB/MiB/GiB; a `storage_bytes` figure from an object store is usually
  decimal. A 1 GB bucket renders as `0.93 GB`.
- **D-i3 ·** `formatBytes` is unguarded for negative, `NaN` and non-finite input (`:16-21`). Contrast
  the sibling's hostile-input guard, `AdminAuditLog.vue:55-56`, which is that file's superlative S-1.
- **D-i4 ·** The `.admin-stat` comment (`:96-98`) cites tranche `A.W3.c` and a class string
  `"p-1.5 rounded bg-foreground/[0.03]"` that appears nowhere in the file. Stale provenance: the
  reader is told what was replaced but not that seven of the primitive's declarations survived the
  replacement (D-M2).
- **D-i5 (lucide) ·** `:3` `import { Shield, LogOut } from "lucide-vue-next"` — one of the 35
  rename sites booked at `lane-frontend.md:478` / CENSUS §3a. Recorded for budget only.

---

## §6 — Uplift break/improve surface (glass ^4.0.0 installed · producer 7.0.0)

**Breaks in THIS file**

1. **`@mkbabb/glass-ui/metric-badge` subpath removed** — `:5`. Booked [lane-frontend.md:463, 472;
   CENSUS C-4]. 7.0.0 exports `./metric` only; `./metric-cell` and `./metric-stack` are **also**
   removed as subpaths (their symbols re-export from `./metric`).
2. **`MetricBadge` symbol deleted; `labelPosition` → `orientation`; `color` DELETED with no
   successor** — `:45-88`. **The prop delta is unbooked**; the `color` deletion is a design ruling,
   not a rename. Full treatment at **D-B3**.
3. **The `.metric-badge*` class contract changes** — `:99-106`. `.metric-badge--label-stacked`
   becomes `.metric[data-orientation="stacked"]`, and 7.0.0's `.metric` carries **no** padding,
   border, background, blur or shadow of its own (`glass-ui/src/components/metric/styles.css:7-12`).
   Every one of `.admin-stat`'s six overrides must be re-derived; three of them become no-ops.
4. **`Button variant="outline"` → `emphasis` (no `outline` member)** — `:33`. **FAMILY** — filed as
   D-B4 in the `AdminAuditLog` challenge (37-file radius, unbooked in the corpus). See D-M10.
5. **`lucide-vue-next` → `@lucide/vue`** — `:3`. Booked [lane-frontend.md:478].

**Explicitly NOT on this file's break list** (verified by reading `:2-5`, so the budget is not
inflated): `hover-card` / `hover-popover`; the dock members `DockIconButton` /
`DockDropdownTrigger`; `ToastVariant` (this file imports no toast — which is precisely why D-B2 has
no error surface). **No contradiction with the census.**

**Improvements**

6. **The uplift CURES D-M1 for free.** `grep -n "cursor" glass-ui/src/components/metric/styles.css
   glass-ui/src/components/metric/*.vue` → **0 hits**. 7.0.0's `.metric` / `.metric-cell` /
   `.metric-stack` carry no `cursor: pointer`, no `:hover` scale, no `:active` press and no
   `focus-visible` classes. The affordance lie is a 4.0.0-only artefact.
7. **The uplift CURES D-B2's loading half for free.** `MetricValueProps.loading?: boolean`
   (`types.ts:12`) → `Metric.vue:24-25` emits `data-loading` + `aria-busy`, and
   `styles.css:86-88` hides the unit while loading. A 7.0.0 `MetricCell` renders a *placeholder*
   instead of unmounting — which also cures **D-M4**'s collapse, because the box stays.
8. **`MetricCell` is available at the CURRENT pin and is the low-risk migration** — full treatment
   at **D-M3**. Adopt it now (`@mkbabb/glass-ui/metric-cell`, `appearance="compact"`); F.W1 then
   only rewrites the import specifier.
9. **`MetricStack` is NOT the seat for this cluster — do not plan it as one.** At 4.0.0 it is a
   3-column subgrid ledger (`icon | label | value`) with a `min-block-size` pre-allocation
   (`glass-ui.css` `.metric-stack[data-v-ab48e590]`); at 7.0.0 it is a 2-column
   `minmax(7rem,1fr) minmax(0,auto)` ledger (`styles.css:114-119`). Both are **rows**, not a
   tile grid. This banner wants tiles → `MetricCell` in a plain CSS grid. Recorded so the wave does
   not adopt the wrong primitive off the name.

**Two ADOPTION-ASKs for the glass-ui BH inbox** (standing relay law):

- **(a) The tone gap behind D-B3.** 7.0.0 gives the metric family no way to tint a *value*, by
  design (the one-color-event rule). But `featured` / `saved` are semantic **tiers**, not decoration,
  and glass-ui itself ships `--tier-featured` / `--tier-saved` tokens plus
  `--color-tier-*` Tailwind bridges (`bridges.css:198-199`) — the producer has the vocabulary and
  has withdrawn the seat. Ask: either a `tone`-style axis on `Metric`, or a ruling that tier
  semantics belong on the *label* / a leading glyph (`MetricCell.iconColor`).
- **(b) The label rung behind D-M8.** `text-muted-foreground/80` at `--type-micro` (11 px,
  weight 300) measures **3.26 : 1** in the light arm across *every* stacked MetricBadge in every
  consumer — this is a producer-side AA failure, not a fourier one. Ask: lift the label to
  `--muted-foreground` at full alpha (5.12 : 1 over `--card`) or raise the default weight.

**Ordering constraint F.W1 must respect.** The cure for **D-B2** needs an error surface. This file
imports no toast, and the house toast path (`useToast.ts:3,9` → `type ToastVariant`) is the census's
**[P1]** hard typecheck break. So cure D-B2 with an **inline** error state on the banner (which it
needs anyway, since a toast cannot explain a permanently empty box) rather than by importing the
broken module — and cure `gallery.ts:129-130`'s `catch {}` first, or there is nothing to render.

---

## §7 — Claims I filed and my own falsifiers killed (L-18 discipline)

| Killed claim | Falsifier that killed it | Disposition |
|---|---|---|
| **K-1** "`mx-4` (`:26`) gives horizontal inset but no vertical margin — the banner crowds its neighbours." | The host owns the vertical rhythm: `GalleryView.vue:219` is `<div class="flex flex-col gap-4 …">`, so every child is spaced by the parent. The 1 rem horizontal inset also **matches** the siblings' `px-4` (`GalleryView.vue:221`). Margin-not-padding is additionally *correct* here, because this is the only child with a background plate. | **Dropped.** The spacing is right. |
| **K-2** "`cm-serif` (`:31`) is an undefined class." | It is defined — `@utility cm-serif` at `glass-ui/dist/styles/typography/utilities.css:65`. | **Re-scoped to D-m1**: defined, but resolves to generic `serif` because `--font-serif-math` is assigned nowhere. |
| **K-3** "The dead `focus-visible:outline-*` classes on the badges are the consumer's a11y omission." | They are hard-coded by the library render fn (`MetricBadge-BpC0R_Ec.js`, the second `cn` argument); no prop removes them. | **Folded into D-M1** as an inherited library-shape problem, not an authored one. |
| **K-4** "`<Button size='sm'>` (`:34`) is under the 44 px touch target." | The producer handles it upstream: `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor))` (`offsets-sizing.css:150`) with `--ui-scale: 1.5` under coarse pointers (`light-dark.css:19`) and a `--control-floor` documented as "≥ 44px regardless of the scalar" (`light-dark.css:13`). | **Dropped.** |
| **K-5** "`.admin-stat`'s overrides lose the cascade to `.metric-badge--label-stacked`." | glass-ui's rules sit in `@layer components` (`utilities/components.css:5`); Vue SFC `<style scoped>` emits **unlayered** rules, and unlayered beats every layer regardless of specificity. The overrides win, deterministically. | **Inverted into the evidence for D-M2** — the six that win, and the seven that survive. |
| **K-6** "The badge hover `scale: 1.02` is ungated under `prefers-reduced-motion`." | `a11y-overrides.css:13-16` clamps `transition-property` to `opacity, color, background-color, border-color, box-shadow !important` under PRM — the scale *transition* is removed. The instantaneous transform survives, but an instantaneous transform is not "animation" under 2.3.3. | **Downgraded** into a scoped residual note inside **D-M1**; not an SC failure. |
| **K-7** "Passing `color` as a `var()` string instead of the house `text-tier-*` class is a token violation." | `MetricBadge`'s `color` prop lands as an **inline style** (render fn: `style="{ color: n.color }"`), so a `var()` reference is the *only* way to reach a token through it. | **Dropped**; only the stale hex fallback survives, as **D-m4**. |

---

## §8 — Superlatives (L-18 runs both ways)

- **S-1 · `formatBytes` (`:16-21`) escalates precision with magnitude, which is the correct and
  uncommon choice.**
  ```
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3)   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 ** 3)).toFixed(2)} GB`;
  ```
  Four branches, ordered, non-overlapping, no gap, no repeated bound — and the GB rung takes
  **two** decimals where KB/MB take one. That is right: at GB scale the second decimal is ~10 MB of
  real signal, and a one-decimal GB reading would quantise an admin's storage view to 100 MB steps.
  *Falsifier:* would die if a bound were repeated or a branch unreachable — walk 1023 / 1024 /
  1048575 / 1048576 / 1073741823 / 1073741824 and each lands in exactly one arm.

- **S-2 · The DOM emits label-before-value, so screen readers get "entries 1,234" for free.**
  The stacked branch of the render fn emits the `.metric-badge__label` span(s) *first*, then
  `.metric-badge__row` with the amount — so the accessible reading order is
  *name, then quantity*, with no `aria-labelledby` wiring and no visually-hidden duplication. The
  common failure in stat clusters is the reverse (big number first, caption under), which reads to
  AT as an unlabelled numeral run. The choice of `label-position="stacked"` (`:48,:56,:64,:72,:79,:86`)
  is what buys this, and it is the one place where this file's divergence from the house inline-pill
  idiom is a clear improvement. *Falsifier:* would die if `stacked` reversed the order — the render
  fn's `v-if="labelPosition === 'stacked'"` branch emits the label fragment above the row, verified
  in the compiled source.

- **S-3 · The component is genuinely presentational — the only one of the four admin components
  that is.**
  `:7-14` is two props in, one event out. `grep -n "useAuthStore\|useGalleryStore\|import.*stores"
  GalleryAdminBanner.vue` → **0 hits**, against `AdminAuditLog.vue:5,10`, `AdminUserList.vue:21,36`
  and `AdminFlaggedPanel.vue:12,25`, all of which reach into `useAuthStore()` and mint their own
  tokens. This file cannot leak a token, cannot fire an unmounted request, and cannot desync from the
  store — and it is exactly why every state defect above (D-B2, D-M4) is curable **at the host** with
  no change to this file's contract. *Falsifier:* would die if any store import existed — none does.

- **S-4 · The icon-hygiene pass its directory-mate skipped entirely.**
  `:30` `<Shield … aria-hidden="true">`, `:39` `<LogOut … aria-hidden="true">`, `:36`
  `aria-label="Log out of admin mode"` on the Button, `:27` `aria-label` on the region. Every
  decorative glyph is hidden and the only control is named — the exact pass that
  `AdminAuditLog.vue` omits at three sites (its own challenge's **D-m1**) and that
  `AdminUserList.vue` had to be remediated into. Note also that the Button's accessible name is
  *"Log out of admin mode"*, not "Logout": it states the scope of the action, which is the right
  prose for a mode exit. *Falsifier:* would die if either glyph lacked `aria-hidden` or the Button
  lacked `aria-label` — all four attributes are present and were read.

---

## §9 — Corpus reconciliation (fold, don't re-invent)

| Corpus row | This challenge |
|---|---|
| **R4-9** (`intakes/lane-fourier-r3-r6.md`, ADOPT-AS-FACT — "the audited scope is byte-identical to the tree F.W0 opens on") | **Relied upon, and re-verified once:** `git rev-parse HEAD` → `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, tree → `9a66411d16fe4ec564d67367ca55e5f97da2a6d4`. Both exact. Every read here is against live `web/src` at that coordinate. |
| **R5-7** (ADOPT-AS-FACT + CARRY→F.W4 — "template-loop evidence keyed to *component* callsites is blind to native HTML element loops") | **No overlap, stated for exhaustiveness.** `grep -n "v-for" GalleryAdminBanner.vue` → **0 hits**: the six tiles are written out longhand (`:45-88`), 44 lines of near-identical markup that a `v-for` over a 6-row config would collapse to 8. So this file is invisible to the loop deriver *because it has no loops* — the opposite blind spot from PaperSidebar's, and worth noting for F.W4's denominator: neither a component-callsite loop count nor a native-element loop count sees hand-unrolled repetition. |
| **R3-10** (CARRY→F.W4 — six live dynamic `:is` families) | No overlap: `grep -n "component :is" GalleryAdminBanner.vue` → 0. |
| **CENSUS §2 C-4** ("metric-badge is 7 **files**, not 6 — budget 7 files for the `./metric` cure") | **Upheld and independently re-derived.** `grep -rn "metric-badge" web/src` → EquationView, InfoCard, AnimationControls, EditorControlsDock, EquationPanel, **GalleryAdminBanner**, GalleryDraftsSection = **7 files**. C-4's correction of lane-frontend.md:472's "6 files" stands. |
| **lane-frontend.md:472** ("`./metric-badge` removed … → `./metric` (`Metric`) … another prop pass is due") | **EXTENDED with the enumeration** — see **D-B3** and §6 item 2. The pass is: `labelPosition`→`orientation` (rename), `size` (survives), `label` (survives), and **`color` (deleted, no successor)**. The last is a design ruling, not a rename, and it is unbooked. |
| **lane-frontend.md:463** (lists `./metric-cell` / `./metric-stack` among removed subpaths) | **Confirmed and refined.** The *subpaths* are removed at 7.0.0; the *symbols* `MetricCell` / `MetricStack` survive under `./metric` (`glass-ui/src/components/metric/index.ts:2-4`). This inverts the migration risk ordering — see **D-M3** / §6 item 8. |
| **lane-frontend.md:111** (`GalleryAdminBanner.vue` — 107 lines, "Admin stats banner (6× `MetricBadge`)") | Confirmed exactly: 107 lines, 6 call sites. |
| **CENSUS §3a "the deepest, cleanest glass consumer in the constellation"** | **Locally contradicted at this coordinate, on a different axis than the AdminAuditLog challenge found.** That file's problem was *under*-adoption (one glass symbol, everything else hand-rolled). This file's is *mis*-adoption: it reaches for two glass primitives and then fights one of them with six CSS overrides (D-M2) while a third primitive built for exactly its shape sits exported and unused at the same pin (D-M3). The repo-wide aggregate claim is untouched; the per-file reading is that "adopted" and "conformant" are not the same measurement, and F.W1's budget should track the second. |
| **CENSUS §3a / [P3] #9** (reduced-motion: 18 refs, the two rAF clocks ungated) | **No new site.** I filed the badge hover-scale as a third site class and **killed it myself** (§7 K-6): glass-ui's PRM carve (`a11y-overrides.css:13-16`) removes the transition. Recording the negative so the wave does not re-open it. |
| **CENSUS §3a break surface** (metric-badge ×7 · hover-card/-popover ×4 · dock ×3 · `ToastVariant` ×1 · lucide ×35) | **One row extended (metric-badge's prop delta, D-B3), one row inherited (`Button`, D-M10 — first filed at `AdminAuditLog/challenge-D-design.md` §D-B4).** No census row contradicted. |

---

## §10 — What the F.W1/F.W4 wave should carry out of this file

1. **Cure the light arm first (D-B1, D-M8).** Retint the chassis off tokens with real separation
   (`--warning` / `--destructive` families) rather than `amber-500` at 4 %/30 %; move the tier
   semantics off the numeral. This is the finding that makes the component fail at its job, and it
   is entirely token-decidable — no live viewport needed to fix it.
2. **Give the stats surface three states (D-B2).** Cure `gallery.ts:129-130`'s `catch {}` **first**
   — there is nothing to render until the error survives — then add an inline error line and a
   loading treatment that does not unmount (D-M4). Do **not** route this through `useToast.ts`
   (the [P1] `ToastVariant` break, §6).
3. **Book the metric prop delta before F.W1 commits to its 7-file budget (D-B3).** `color` has no
   successor; raise ADOPTION-ASK (a) to the glass-ui BH inbox under the standing relay law.
4. **Migrate to `MetricCell` at the CURRENT pin (D-M3).** It deletes `.admin-stat` (D-M2), the
   affordance lie (D-M1) and the tile hand-roll in one move, and converts this file's F.W1 exposure
   from a re-layout into an import-path rewrite.
5. **Fix the numbers as data (D-M5, D-M6, D-M7).** `unit` prop for storage; thousands separators
   plus an abbreviating formatter so `truncate` can never show a wrong figure; render `normal` so
   the arithmetic closes.
6. **Extend the axe keystone to admin mode (D-M9)** — one `test.describe` that activates admin and
   sweeps the four admin components. It is the regression net for everything above, and it currently
   does not exist for any of them.
7. **Raise ADOPTION-ASK (b)** — the 3.26 : 1 metric label is a producer-side AA failure affecting
   every stacked MetricBadge in every consumer, not a fourier defect.
8. **Preserve S-1 · S-2 · S-3 · S-4 through the rewrite.** In particular S-2: `MetricCell` keeps the
   label-before-value order (`MetricCell.vue` template — `.metric-cell__heading` precedes
   `.metric__reading`), so the migration in item 4 does not cost the accessible reading order. And
   S-3: keep the component props-in/event-out, so items 2 and 6 stay host-side changes.
