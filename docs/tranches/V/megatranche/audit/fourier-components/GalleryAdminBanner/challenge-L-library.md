claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryAdminBanner.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GalleryAdminBanner.vue` (107 lines)
**Posture** assumed DEFECTIVE until the tree proves otherwise; every claim carries a falsifier and dies if the falsifier fires.
**Evidence law** static + source-derived only. `/Users/mkbabb/Programming/fourier-analysis` read-only; the resolved producer is `web/node_modules/@mkbabb/glass-ui@4.0.0` (the version the app actually links, NOT the `/Users/mkbabb/Programming/glass-ui` working tree). No browser tooling; livable-only claims marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Tally — 15 defects · 0 BLOCKER · 6 MAJOR · 5 MINOR · 4 INFO · 6 superlatives.**

**Hitherto folded** (not re-derived): `formation/fourier/lane-frontend.md:111` (this file, 107 lines, "6× MetricBadge"), `:246`, `:337`, `:472` (the `./metric-badge` → `./metric` uplift break, 7 imports); `formation/fourier/CENSUS-2026-08-03.md:63-65` (C-4: the metric cure is **7 files**, this one named), `:85-86` (viz architecture: Canvas2D throughout, WebGL/WebGPU ABSENT, three independent canvases), `:88-101` (glass posture + shadow register); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125` (**R5-7**, ADOPT-AS-FACT) and `:139` (**R6-5**, the `NATIVE_TEMPLATE_LOOP` cure).

---

## §0 — What this component is, structurally

A pure presentational leaf: two props (`stats: AdminStats | null`, `loading: boolean`), one emit (`logout`), one local formatter, one scoped rule. No store import, no lifecycle hook, no watcher, no ref. Sole consumer `GalleryView.vue:28` (static import), mounted at `GalleryView.vue:243-248` under `v-if="gallery.adminMode"`.

Its entire visual output is delegated to two producer components — `Button` (`@mkbabb/glass-ui/button`) and six `MetricBadge` (`@mkbabb/glass-ui/metric-badge`) — plus one consumer-side class, `.admin-stat`. **Every MAJOR below lives in that delegation seam.** That is the finding-of-findings: a 107-line file with nothing to leak and nothing to tear down still manages six MAJORs, because it hand-projects CSS onto a producer root it never read.

---

## §1 — MAJOR

### D-1 · MAJOR · `.admin-stat` collides with the shipped `.metric-badge` pill instead of surrounding it

`GalleryAdminBanner.vue:99-106` declares six properties (`padding`, `border-radius`, `background`, `display`, `flex-direction`, `align-items`). The class is passed at `:50`, `:58`, `:66`, `:74`, `:80`, `:87` as `class="admin-stat"`, and the producer merges it onto its **root** div — `dist/MetricBadge-BpC0R_Ec.js`, the `cn("metric-badge cursor-pointer", "focus-visible:…", labelPosition && \`metric-badge--label-${…}\`, t.$props.class)` expression. So `.admin-stat` and `.metric-badge` are **the same element**.

`.metric-badge` is not an empty BEM hook. `dist/styles/utilities/components.css:5-40` (inside `@layer components`, imported into the app via `web/src/style.css:3` → `dist/styles/index.css:165` → `utilities.css` → `utilities/components.css`) paints a complete glass pill:

```
display:inline-flex; align-items:center; justify-content:center; text-align:center; scale:1;
gap:…; max-width:8rem; min-height:1.5rem; padding:.125rem .5rem; overflow:hidden;
flex-shrink:0; line-height:1;
border:1px solid var(--glass-border-quiet);
border-radius: var(--radius-badge, var(--radius-pill));
background: var(--glass-bg-quiet);
backdrop-filter: var(--glass-blur-quiet);
box-shadow: 0 1px 6px …, var(--glass-highlight);
transition: background, border-color, box-shadow, scale;
```

The consumer's scoped rule is **unlayered**, so it wins over `@layer components` for the six properties it names. It names none of the rest. What survives, unasked-for, on all six tiles:

| leaked declaration | source | consequence |
|---|---|---|
| `border: 1px solid var(--glass-border-quiet)` | components.css:29 | a glass hairline the comment never intended |
| `backdrop-filter: var(--glass-blur-quiet)` | components.css:32 | **six backdrop-filter compositing layers** inside the gallery's `overflow-y-auto` scroller (`GalleryView.vue:220`) |
| `box-shadow: 0 1px 6px …, var(--glass-highlight)` | components.css:33 | a pill shadow under a 3%-alpha flat tile |
| `max-width: 8rem` | components.css:15 | see **D-9** |
| `transition: background, border-color, box-shadow, scale` | components.css:34-38 | arms the hover/active animation of **D-3** |

The backdrop-filter row is the sharpest: `.admin-stat` sets `background: color-mix(in srgb, var(--foreground) 3%, transparent)` — 97% transparent — so the inherited blur is maximally visible, and it blurs the amber banner plate behind it six times over.

**Falsifier** — dies if (a) the producer does not merge `$props.class` onto the same node that carries `metric-badge` (it does: single `cn(...)` on the root `<div>`, `MetricBadge-BpC0R_Ec.js`), or (b) `utilities/components.css` is not in the app's cascade (it is: `web/src/style.css:3`), or (c) the consumer's scoped block is layered (it is not — Vue SFC `<style scoped>` emits unlayered rules). None fire.

### D-2 · MAJOR · the scoped comment is false on both of its load-bearing claims — and it is a deletion trap

`GalleryAdminBanner.vue:96-98`:

> `<MetricBadge>` ships its own tabular-nums + stacked geometry; we project the surrounding "p-1.5 rounded bg-foreground/[0.03]" tile via the consumer-side host class so the cluster keeps its visual register.

Claim A — **"ships its own … stacked geometry"**: FALSE. Exhaustive grep of every shipped stylesheet for `.metric-badge--label-` and `.metric-badge__row` returns **zero rules** (`dist/styles/**/*.css`, `dist/glass-ui.css`). `label-position="stacked"` buys DOM order and a class hook, nothing else; the producer's only stacked-arm CSS anywhere is `.metric-badge__label{font-weight:var(--metric-badge-label-weight,300)}` (`dist/glass-ui.css`). The column is produced **solely** by the consumer's own `display:flex; flex-direction:column` at `:103-105`. The comment tells a future editor those two lines are the producer's job — delete them and all six tiles collapse to `inline-flex` rows.

Claim B — **"the surrounding … tile"**: FALSE. There is no surrounding element; `.admin-stat` lands *on* the badge root (D-1). "Surrounding" is exactly the mental model that produced the five leaks.

Sub-claim — the projection does not even match its own stated target: the comment names `p-1.5 rounded bg-foreground/[0.03]`, but `:101` writes `border-radius: 0.375rem` (Tailwind v4 `rounded-md`), not `rounded` (0.25rem), and `:102` writes `color-mix(in srgb, …)` where `bg-foreground/[0.03]` compiles to `color-mix(in oklab, …)`. Three drifts from one four-token comment.

**Falsifier** — dies if any shipped CSS defines `.metric-badge--label-stacked` or `.metric-badge__row`, or if `rounded` resolves to 0.375rem in this project's theme. Grep says no on the first; Tailwind v4's `rounded` = 0.25rem and `web/src/style.css` overrides only `--font-sans` (`:13-15`), so no on the second.

### D-3 · MAJOR · six inert tiles wear a full interactive affordance kit

The producer hardcodes `cursor-pointer` into the root class string (`MetricBadge-BpC0R_Ec.js`, `cn("metric-badge cursor-pointer", …)`) and `utilities/components.css` adds:

- `:50-57` — `.metric-badge:hover { border-color: …-resting; background: …-resting; box-shadow: 0 2px 10px …; scale: 1.02 }`
- `:59-61` — `.metric-badge:active { scale: 0.96 }`
- `:63-66` — `.metric-badge:focus-visible { box-shadow: var(--focus-ring-shadow) }`

Nothing in `GalleryAdminBanner.vue:44-89` supplies `@click`, `tabindex`, `role`, or `aria-*` to any badge. Result: six read-only aggregate counters show a pointer cursor, lift + scale to 1.02 on hover, and press to 0.96 on mouse-down, while being inert. The `focus-visible` ring is dead in the other direction — without `tabindex` the tiles are unreachable, so the producer's focus affordance never fires. (The consumer's own hover-background override from D-1 partially breaks the hover *colour* step but not the `scale`, `border-color`, or `box-shadow` steps, so the tiles animate into a half-state the producer never designed.)

**Falsifier** — dies if `cursor-pointer` is absent from the built CSS (present: `.cursor-pointer{` in `web/dist/assets/index-57FkGzlZ.css`) or if some ancestor resets `cursor`/`scale` (grep of `GalleryAdminBanner.vue` + `GalleryView.vue` scoped blocks: no `cursor` or `scale` rule). Neither fires. Exact rendered geometry of the 1.02 step is **UNPROVEN-NEEDS-LIVE (SS-13)**; its existence is not.

### D-4 · MAJOR · silent-failure error posture — an expired admin token renders as a healthy banner

`stores/gallery.ts:123-134`:

```
async function refreshAdminStats() {
    const token = useAuthStore().getAdminToken();
    if (!token) return;              // :125 — silent no-op
    adminStatsLoading.value = true;
    try { adminStats.value = await api.getAdminStats(token); }
    catch { /* ignore */ }           // :129-131 — every error swallowed
    finally { adminStatsLoading.value = false; }
}
```

The banner's only rendering branch is `v-if="stats && !loading"` (`GalleryAdminBanner.vue:44`). On a 401 (expired admin token), a 5xx, or a network abort, `adminStats` stays `null`, `adminStatsLoading` returns to `false`, and the component renders the **header row alone** — "Admin Mode" + shield + Logout — with no error text, no retry, no `aria-live`, and **no way to distinguish "still loading" from "failed" from "no data"**. The header is precisely the part that asserts everything is fine.

This is the component's own posture defect, not only the store's: it accepts a two-state contract (`stats`, `loading`) for a three-state reality, and its template has no third arm. The sibling admin surfaces are async-loaded panels with their own fetch posture; this one is the only surface that would ever report the token's death, and it reports nothing.

**Falsifier** — dies if any ancestor surfaces the failure. `GalleryView.vue` calls `gallery.refreshAdminStats()` at `:134` and `:194` with no `.catch`, no `await`, no toast; `activateAdmin` (`gallery.ts:110-111`) awaits it but the swallow is inside. Nothing surfaces it.

### D-5 · MAJOR · the refresh guard unmounts the whole grid inside the gallery scroller — layout jump on every admin action

`v-if="stats && !loading"` (`:44`) is `false` for the entire duration of every refresh, because `refreshAdminStats` sets `adminStatsLoading = true` *before* the await (`gallery.ts:126`) and clears it after (`:132`). The six-tile grid therefore **unmounts and remounts** on each refresh.

The banner is a direct child of the gallery's scroll container — `GalleryView.vue:220`, `<div class="flex flex-col gap-4 overflow-y-auto h-full py-4">` — and sits *above* `GalleryFeaturedCarousel` (`:249`) and the card list. And `refreshAdminStats()` is fired after **every** tier change (`GalleryView.vue:134`, inside `handleSetTier`) and after **every** batch action (`:194`, inside `performBatchGallery`). So the exact interaction that most needs stability — an admin featuring a card and watching it move — is the one that yanks a multi-row block out of the flow above it and drops it back a moment later.

The cure is one character of intent: gate on `v-if="stats"` and express `loading` as opacity + `aria-busy`, which is what the `loading` prop was presumably for (see D-15).

**Falsifier** — dies if `loading` is never `true` while `stats` is non-null (it always is, on refresh #2 onward: `gallery.ts:126` precedes the network await with `adminStats` already populated), or if the banner is outside the scroller (`GalleryView.vue:220` → `:243`, direct descendant). Neither fires. Pixel magnitude of the shift is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-6 · MAJOR · the producer ships the exact primitive this file hand-rolls — `./metric-cell`

`@mkbabb/glass-ui@4.0.0` exports `./metric-cell` (`package.json` exports map; `dist/metric-cell.js`). Its own doc block (`dist/components/custom/metric-cell/MetricCell.vue.d.ts`) reads:

> **MetricCell** — compact metric card (icon-on-label, stacked value + unit) on a wash-tier glass surface. … promoted from speedtest's `<ResultDetailSheet>` 4-card grid. The original consumer had the same 11-class string repeated four times … The shape is generic enough that any dashboard / detail-sheet / summary surface composing icon + label + value + unit on a tile hits the same gestalt; **the primitive collapses the 4-site duplication onto one consume.**

It ships `appearance: "dashboard" | "compact" | "bare"`, where `bare` "drops the surface for consumers that host the cell inside a larger panel" — i.e. the producer already anticipated and solved *this consumer's* problem, including the surface-override case that D-1 botches by hand.

`GalleryAdminBanner.vue:44-89` instead repeats a six-line `MetricBadge` block **six times** (44 of the file's 107 lines, 41%), differing in only three dimensions: `value`, `label`, and `color` (set on 2 of 6). This is a `glass-ui-first` precept violation of the exact species the producer documents having already cured — and it is the duplication that makes D-1's `.admin-stat` necessary at all.

Independent corroboration and a forcing function: `lane-frontend.md:472` books `./metric-badge` as **removed** at glass-ui 7.0.0, naming `GalleryAdminBanner.vue:5` among the 7 files; `CENSUS-2026-08-03.md:63-65` (C-4) confirms the denominator is 7 files, not 6. This file must move regardless; `./metric-cell` (or `./metric`) is the destination, and the move deletes `.admin-stat`, D-1, D-2, and D-3 in one stroke.

**Honest limit** — this is *not* a byte-identical drop-in. `MetricCell`'s `dashboard`/`compact` arms paint `.glass-wash rounded-lg p-3`/`p-2`, not `foreground/3% + 0.375rem`, so `appearance="bare"` plus a deliberate host rule is the faithful path. **Falsifier** — dies if `./metric-cell` is absent from the resolved 4.0.0 (it is present) or if its prop surface cannot carry `value: string` for the storage row (`MetricValue` is the shared type used by `MetricBadge.value` too, so it can).

---

## §2 — MINOR

### D-7 · MINOR · `formatBytes` mis-renders at both binary boundaries

`GalleryAdminBanner.vue:16-21`. Each branch tests the *raw* byte count but formats the *divided* value, so a value just under a boundary rounds up past it. Executed, not reasoned:

| input | rendered | should read |
|---:|---|---|
| `1048575` | **`1024.0 KB`** | `1.0 MB` |
| `1073741823` | **`1024.0 MB`** | `1.00 GB` |
| `1099511627775` | `1024.00 GB` | `1.00 TB` (no TB arm) |
| `0` | `0 B` | ✓ |
| `1024` | `1.0 KB` | ✓ |

Secondary: binary divisors (`1024`) carry decimal SI labels (`KB`/`MB`/`GB`) — should be `KiB`/`MiB`/`GiB`, or use `1000`. Tertiary: no TB arm, so a terabyte-scale image corpus reads in four-digit GB. `NaN` → `"NaN GB"`, unreachable in practice because `AdminStatsResponse.storage_bytes: int` (`api/models/gallery.py:38`) is Pydantic-enforced — noted, not charged.

**Falsifier** — dies if `storage_bytes` can never land in `[2^k − 1024^{k/…}, 2^k)`; it is an unbounded `$sum` over `db.images.bytes` (`api/routers/admin.py:144-147`), so it can.

### D-8 · MINOR · dead hex fallbacks duplicate a design token the producer defines unconditionally

`:57` `color="var(--tier-featured, #fbbf24)"` and `:65` `color="var(--tier-saved, #60a5fa)"`. Both tokens are defined at every arm of the producer cascade, imported at `web/src/style.css:3`:

- light base — `dist/styles/tokens/color-radius.css:270-271` (`oklch(0.841 0.173 84.2)` / `oklch(0.676 0.176 252.3)`)
- dark arm — `dist/styles/tokens/dark-arm.css:141-142`
- `light-dark()` arm — `dist/styles/tokens/light-dark.css:156-157`

So the fallbacks can never fire, and the hexes are a silent second source of truth for two brand tokens (`#fbbf24` ≠ `oklch(0.841 0.173 84.2)` in either arm — they will drift the moment the producer retunes). Every sibling consumer in the same directory uses the bare token with **no** fallback: `GalleryCard.vue:229`, `:230`, `:234`, `:235`; `GalleryCardModal.vue:215`, `:216`; `AppHeader.vue:268`, `:269`. This file is the lone dissenter.

**Falsifier** — dies if either token is gated behind `@supports` or a scoped selector such that some render path lacks it. `color-radius.css:270` is the unconditional light base; the fallback is unreachable.

### D-9 · MINOR · `max-width: 8rem` survives into an `auto-fit` grid

`:44` sets `grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]`, so tracks grow past 5rem as the banner widens. `.metric-badge{max-width:var(--metric-badge-max-width,8rem)}` (`utilities/components.css:15`) is not overridden by `.admin-stat` (D-1), so above roughly `6 × 8rem + 5 × gap-2` ≈ **51rem** of banner content-width each tile stops filling its track and the flat 3% plates detach from the grid rhythm, leaving ragged gaps. The producer intends `--metric-badge-max-width` as the consumer's knob; this file never sets it.

**Falsifier** — dies if the banner's container can never exceed ~51rem. `GalleryView` is a full-height route surface (`GalleryView.vue:220`, `h-full`) with `mx-4` on the banner (`:26`), so on a desktop-width gallery it can. Exact threshold and whether it is reached in the shipped layout: **UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-10 · MINOR · six badges, two denominators, one undifferentiated cluster

Five of the six badges count live rows — `api/routers/admin.py:118` and `:130` both `$match` on `not_deleted_filter()`. The sixth does not: `:144`, `storage_pipeline = [{"$group": {"_id": None, "total_bytes": {"$sum": "$bytes"}}}]`, aggregated over `db.images` at `:146` with **no** match stage at all. So `storage` is the byte total of *every image ever uploaded*, including the assets of soft-deleted visualizations, presented in an identical tile beside five soft-delete-filtered counts, under a label (`"storage"`, `:84`) that gives no hint. An admin who deletes half the gallery watches five numbers fall and the sixth hold.

Charged here (MINOR, presentation) rather than as an API defect because the API is out of this axis's scope and the component is what asserts the six are commensurable. Cure is a label (`"storage (all)"`) or an API match stage.

**Falsifier** — dies if `db.images` rows are hard-deleted with their visualization. `not_deleted_filter()` is used at `admin.py:118`, `:130`, `:524` and nowhere on `images`; the soft-delete lifecycle is CRUD-CONTRACT §5 (`stores/gallery.ts:11-13`), i.e. rows persist.

### D-11 · MINOR · `@reference "tailwindcss"` is dead here, and points at the wrong entry

`:94`. The block that follows (`:99-106`) uses no `@apply`, no `theme()`, no `@variant` — the three things `@reference` exists to serve — so the directive buys nothing and costs a Tailwind re-resolve per `<style>` block. Worse, it references bare `tailwindcss` rather than the app entry `web/src/style.css`, which is where this project's real theme lives (`--font-sans` override at `:13-15`, and the whole glass-ui token cascade at `:3`). The next editor who adds `@apply bg-foreground/[0.03]` here will get the bare-Tailwind theme, not this app's.

Fairness: this is a **house convention**, 20+ sites (`PaperView.vue:415`, `EquationPanel.vue:117`, `GallerySearchBar.vue:135`, …). Charged at this file as MINOR and flagged as a class-wide row, not an isolated slip.

**Falsifier** — dies if the block uses any Tailwind at-rule. It does not (`:93-107` read whole).

---

## §3 — INFO

### D-12 · INFO · the R5-7 class, applied in its inverse — and why it does not bite here

**R5-7** (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT) established that loop evidence keyed to *component* callsites is blind to **native** element loops — `PaperSidebar.vue`'s three `<li v-for>` at 65/87/105 registered as an empty leaf; **R6-5** (`:139`) cured it with a `NATIVE_TEMPLATE_LOOP` family.

`GalleryAdminBanner.vue` has **zero `v-for`, native or component** — the six badges are hand-unrolled (`:45-88`). So R5-7's blind spot cannot bite this file: nothing is invisible, and the negative result is worth stating rather than assuming.

The inverse hazard is real, though. Six `MetricBadge` callsites are six *registered* component callsites, counted in the `physicalCallsites: 512` denominator (`lane-fourier-r3-r6.md:106`, R4-8). The obvious KISS cure — a six-row descriptor array plus one `v-for` — would collapse this file's contribution from **6 to 1** with zero behavioural change, and would move the leaf from "six discrete callsites" into the `instance.loop.*` family keyed like `instance.loop.presets` (`callsite:…FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0`). Any F.W4 per-component percentage over this file must therefore name its denominator, or the refactor will read as a 5-unit regression in instance coverage.

**Falsifier** — dies if any `v-for` exists in the file (grep: none) or if the deriver counts template callsites post-loop-expansion (R5-7/R6-5 show it counts source callsites).

### D-13 · INFO · `AdminStats.normal` is fetched, typed, and read by nothing

`web/src/lib/types.ts:114` declares `normal: number`; the API computes it (`admin.py:120-125`, `:152`) and returns it (`api/models/gallery.py:35`). Grep of `web/src` for `.normal` on an `AdminStats` value: **zero readers**. The banner shows entries / featured / saved / views / likes / storage (`:45-88`) and omits it, so an admin who wants the normal-tier count does `total_entries − featured − saved` by hand. Either render it (the grid is `auto-fit`, a seventh tile costs nothing) or drop the field from the wire.

**Falsifier** — dies if any consumer reads it. None does.

### D-14 · INFO · static import where all three sibling admin surfaces are lazy

`GalleryView.vue:28` imports this banner statically, three lines above `AdminUserList`, `AdminFlaggedPanel`, `AdminAuditLog` — all `defineAsyncComponent` (`:31-33`). An admin-only surface therefore ships in the eager gallery chunk for every anonymous visitor.

Calibrated honestly to **INFO**, not MINOR: the marginal cost is the SFC alone. `Button` already lands in the chunk via `GalleryView.vue:15`; `MetricBadge` via the statically-imported `GalleryDraftsSection.vue:8` (`GalleryView.vue:29`); `lucide-vue-next` is pinned into `vendor-ui` by `web/vite.config.ts` `manualChunks`. So the claim is about consistency of posture, not weight.

**Falsifier** — dies if `Button`/`MetricBadge`/lucide were otherwise absent from the eager graph. All three are present.

### D-15 · INFO · `loading` is a hide-flag, never a state

`:9` declares it; `:44` is its only use, and only as a negation. Nothing renders a skeleton, a spinner, an `aria-busy`, or a dimmed placeholder — the producer even ships the mechanism for the last one (`MetricBadge.placeholder`, defaulting to `—` via `coalesceMetric`). A screen-reader user in the labelled region (`:27`) hears the six values vanish and reappear with no announcement. This is the same root as D-5, filed separately because the cure differs: D-5 wants the guard relaxed, D-15 wants the prop actually spent.

**Falsifier** — dies if `loading` appears elsewhere in the file. It does not (`:9`, `:44` only).

---

## §4 — SUPERLATIVES (L-18 runs both ways)

**S-1 · The wire contract is exactly isomorphic — zero drift.** `AdminStats` (`web/src/lib/types.ts:110-118`) and `AdminStatsResponse` (`api/models/gallery.py:31-38`) carry the same seven field names in the same order, all `number`/`int`, and `admin.py:149-157` constructs all seven explicitly. No optionality mismatch, no snake/camel drift, no phantom field. Given that `lane-fourier-r3-r6.md:81` (R3-7c) books nine client-gap operations across this API, an exactly-matched contract on this path is worth naming.

**S-2 · Nothing to leak, and the census says so.** No `onMounted`/`onUnmounted`, no `watch`, no `ref`, no timer, no listener, no observer, no rAF, no canvas or WebGL context, no `defineExpose`. `CENSUS-2026-08-03.md:85-86` fixes fourier's viz architecture at "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven)". This component touches **none** of the three; the leak/teardown sub-axis is vacuously clean, and — unlike ConvergencePlot's ungated rAF — it contributes nothing to the gallery scroller's frame budget. Its only render-path coupling is the layout one at D-5.

**S-3 · The falsy-zero trap is genuinely avoided — verified against the dist, not assumed.** A fresh gallery makes all six values `0`. `coalesceMetric` (`dist/coalesceMetric-5qIeZnTx.js`) tests `e == null || e === ""` — **not** truthiness — so `0` renders `"0"`, never the `—` placeholder, and never picks up the `text-muted-foreground/40` empty dimming. The producer's own type doc asserts the same invariant (`MetricBadge.vue.d.ts`: "A valid `0` renders `\"0\"`, never the placeholder"), and the implementation honours it.

**S-4 · A killed candidate, recorded because it was the strongest-looking claim in the file.** I hypothesised that `text-muted-foreground/80` — the class MetricBadge puts on all six labels — would never be emitted: Tailwind v4 does not scan `node_modules`, and `web/src/style.css:1-3` declares no `@source`, and the class appears **nowhere** in `web/src`. The app's built artifact even agrees (`web/dist/assets/*.css`: absent). **The claim is false.** The producer pre-emits `.text-muted-foreground\/80{` and `.text-muted-foreground\/40{` into `dist/styles/components.css` (the P9 build-independent component-utility path), *and* ships a backstop `@source "../*.js"` at `dist/styles/index.css:222` reaching the flat `dist/*.js` chunks. The consumer is not load-bearing for producer utilities. Two residuals, both honest: the app's built CSS is dated **Jun 12** while the linked glass-ui was installed **Jun 17**, so that artifact is stale and proves nothing either way; and `text-mono-micro` — the label type-scale for `size="md"` — is an `@utility` (`dist/styles/typography/utilities.css:50`), *not* pre-emitted, so it depends on the `@source` backstop. **UNPROVEN-NEEDS-LIVE (SS-13): rebuild and grep the emitted CSS for `.text-mono-micro{`.**

**S-5 · The props contract is minimal, correct, and correctly typed against the producer.** Two props, one emit, no store import, no injected keys, no prop-drilled callbacks — the component is a pure function of its inputs and `GalleryView` owns every piece of state. Both producer unions are honoured against the *resolved* 4.0.0: `variant="outline"` and `size="sm"` are members of `dist/components/ui/button/index.d.ts:4-5`; `label-position="stacked"` and `size="md"` are members of `MetricBadgeProps` (`MetricBadge.vue.d.ts`). Zero `any`, zero non-null assertion, zero cast.

**S-6 · Goldilocks, and the census's count is exact.** 107 lines, one responsibility, no god-module gravity, formatter colocated with its single caller (grep: `formatBytes` exists nowhere else in `web/src`). `lane-frontend.md:111` books it at 107; the live file is 107. Even the six-fold repetition of D-6 stays inside a readable file — the defect is the bypassed primitive, not the size.

---

## §5 — Verdict

Not a one-liner, and not innocent. The file's own logic is clean — the props are right, the types are exact, `0` renders as `0`, and there is nothing to tear down. **Every MAJOR lives in the seam where it hands work to `@mkbabb/glass-ui` without having read what the producer already does.** `.admin-stat` is written as if `MetricBadge` were an unstyled span (D-1, D-2); the six unrolled instances are written as if `./metric-cell` did not exist (D-6); the render guard is written as if the banner were not the top of a scroll container (D-5); and the error posture is written as if `refreshAdminStats` could not fail (D-4).

Highest-value single move: **land the `./metric-cell` migration that `lane-frontend.md:472` + `CENSUS` C-4 already book for this file.** It retires D-1, D-2, D-3, D-6 and most of D-9 at once, and it has to happen anyway before the glass-ui 7.0.0 uplift removes `./metric-badge`. Then `v-if="stats"` (D-5) and a third template arm for failure (D-4). D-7 is a four-line fix, independent of all of it.
