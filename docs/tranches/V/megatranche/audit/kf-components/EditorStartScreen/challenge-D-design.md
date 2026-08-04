claude-opus-5[1m]

# CHALLENGE · `EditorStartScreen.vue` · axis D (DESIGN) — **PASS 2, consolidated register**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorStartScreen.vue` (191 L)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only
claims carry `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Read whole** — target + `AnimatedText.vue` (126 L) + `TypingDots.vue` (125 L) + both mount sites
(`app/App.vue:50`, `EditorShell.vue:60–66`) + the full token chain (`demo/styles/style.css`,
`demo/styles/layout.css`, `demo/app/index.html`, and the installed
`node_modules/@mkbabb/glass-ui@7.0.0/dist/styles/{typography/scale.css, typography/semantic.css,
tokens/color-radius.css, tokens/dark-arm.css, tokens/sizing.css, tokens/scheme-motion.css}`) + the
components whose rules collide with it (`scenes/cube/CubeScene.vue`, `app/dock/ChromeDock.vue`,
`transport/AnimationControlsGroup.vue`, `transport/TransportDock.vue`) + `node_modules/tailwindcss/preflight.css`
+ the engine PRM path (`src/animation/internal/reduced-motion.ts`, `src/animation/group/lifecycle.ts`,
`src/animation/engine/css/css-animation.ts`).

---

## 0. Standing of this document

A pass-1 D-axis challenge already existed at this path (28 defects · 2 BLOCKER · 5 superlatives, same served
model). **I read it whole before writing.** This pass **supersedes it by folding, not by replacement**:
§1 carries every pass-1 id forward with an explicit verdict (CONFIRM / AMEND / SHARPEN), and §2–§4 add the
findings pass 1 did not reach. Nothing from pass 1 is dropped. Where pass 2 contradicts pass 1 it says so
in the id's own row and gives the probe.

**One pass-1 premise is falsified.** Pass-1 `D-1` computes the mobile band with
`--dock-band-reserve ≈ 44px + --dock-margin + 34px ≈ 90px`. **`--dock-margin` is undefined everywhere in the
repo, including all of `node_modules`** — so that term does not resolve, and the whole mobile work-area
chain is invalid-at-computed-value-time. This is **ND-1**, a new BLOCKER; it strengthens pass-1 D-1's
conclusion while replacing its arithmetic, and it converts pass-1 D-7 from "un-tokenized ratios" into
"the derivation does not execute at all below `lg`."

**Consolidated tally: 38 defects (4 BLOCKER · 8 MAJOR · 15 MINOR · 11 INFO) · 9 superlatives.**
(28 folded from pass 1 + 10 net-new; 5 superlatives folded + 4 net-new.)

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md`: **F-1** (glass-ui phantom dependency —
**ND-1 is its first measured consequence inside the design surface**), §4 (this file classed `b`, no glass
import), §6.3 (zero `--kf-*`, flat global namespace), §6.5 (13 PRM sites, mechanism-inconsistent),
**S-5** (`AnimatedText` → `TypewriterText`, AMBER with owner carve-out), **S-8** (`TypingDots` JUSTIFIED
BESPOKE — concurred and extended at NS-3). `docs/frontend-design/demo/home.md` §Current-state item 1
(copy is an instruction, not a proposition) — **ND-2 supersedes it: the instruction is not merely weak, it
is false.**

**Corpus contradiction (stated per law).** `home.md`'s anchors are STALE against the tree: it cites
`EditorStartScreen.vue:111–115` for the copy defaults (actually `:73–76`), `:78–82` / `:182–185` for a
"vacated lower-left" that no longer exists in the file, and `AnimatedText.vue:78–91 @keyframes liftDown`
for a keyframe now named `charLift` at `AnimatedText.vue:103`. Any wave planning from `home.md` must
re-anchor first.

---

## 1. Pass-1 carry-forward (all 28 ids, with pass-2 verdicts)

| id | sev | claim (abbrev.) | pass-2 verdict |
|---|---|---|---|
| D-1 | **BLOCKER** | T.D9's 0.52 re-seat × CubeScene's still-live `--start-hero-band: 34dvh` stack both phone focal planes into the lower half; top 34dvh dead; `CubeScene.vue:262`'s "intersection is 0 by construction" is false, and `:259` cites a class (`pt-[var(--dock-top-band-reserve)]`) this file does not ship | **CONFIRM, arithmetic AMENDED.** The source contradiction is exact and independently re-derived. Its numbers assume `--dock-margin` resolves — see **ND-1**. Re-run on the *broken* chain (mobile top ⇒ flat `52dvh` = 439 px at 844): die extent `[456, 612]` still lands wholly inside the hero block. Conclusion survives its own falsifier. |
| D-2 | **BLOCKER** | `.hero-band` has `top` and no bottom/height/max-block-size, inside `html,body{overflow:hidden}` + `.editor-shell{overflow-hidden}`; hint clipped on 1024–1366 × <760 viewports | **CONFIRM.** Re-verified `style.css:215–217` and `EditorShell.vue:3`. My own 1280×720 derivation lands 419.6 px into 397.1 px — within 3 px of pass-1's 419.8/397.1. Independent agreement on a soft term is worth recording. |
| D-3 | MAJOR | The italic deck/hint have no italic fallback face and `font-synthesis: none` forbids synthesis; the ital@1 woff2 is not preloaded and was not previously fetched — T.D11's "already loaded; zero new payload" is false in both halves | **CONFIRM.** Spot-verified `index.html:35–75`: one upright preload, rationale text verbatim "italic + latin-ext are **not** above the fold"; stylesheet is `media="print"` + `onload`. `grep -n "Instrument Serif Fallback" demo/styles/*.css` → one `@font-face`, style-normal only. Sound. |
| D-4 | MAJOR | "from the list ☰ below" — wrong direction (dock is `top: var(--dock-top-anchor)`), not a list (collapsed `GlassDock`), and no ☰ anywhere (trigger is `Home`) | **CONFIRM and EXTEND → ND-2.** All three sub-claims re-verified at `ChromeDock.vue:214–216, 232, 238–243`. Pass 1 stops at the deck's three words; the sentence's **fourth** clause ("then press Play.") and the CTA debt it exposes are net-new. |
| D-5 | MAJOR | The dots' rest floor is alpha, not contrast: 1.52:1 light / 1.64:1 dark, permanent under PRM | **CONFIRM, and its open falsifier CLOSED.** Pass 1 flagged the engine's PRM resting-frame semantics as "a library-lane read, not a design-lane one." I read it: `CSSKeyframesAnimation` (`src/animation/engine/css/css-animation.ts:44`) extends `KeyframesAnimation`; the PRM path is the single `withReducedMotion` gate (`src/animation/internal/reduced-motion.ts:153`, wired at `src/animation/group/lifecycle.ts:75–80`, documented "snaps to final (no rAF loop)"). Final = the `100%` frame = `REST_OPACITY` = 0.2. **The delegation is real and it rests at 0.2 — pass-1 D-5 stands, and its escape hatch is gone.** My independent light-arm composite reproduces 1.52:1 to two decimals. |
| D-6 | MAJOR | Two `<h2>`s that are not headings; the hint enters the AT heading map; the Emoji-15.1 ZWJ sequence is unlabelled and degrades to two glyphs | **CONFIRM.** Add one point pass 1 did not make: the h1 and the first h2 are **one sentence**, the h2 opening lowercase mid-clause, so heading-navigation yields two fragments and any h1-only scrape (search snippet, social card) reads as a bare imperative with no object. Recorded under this id, not as a new one. |
| D-7 | MAJOR | The "φ BAND" is not φ: `0.45`/`0.52` are bare decimals while `layout.css:73–74` publishes the honest `0.382`/`0.618` as named tokens; the ban is on raw *lengths*, the drift is raw *ratios* | **CONFIRM and SHARPEN → ND-1, ND-6.** Two further forms of the same drift: the ratios are untokenized (pass 1), the mobile *seat* is a raw `52dvh` because the chain is IACVT-broken (ND-1), and the mobile *rung* is a raw viewport unit wearing a container unit's name (ND-6). Three levels, one ban, zero grep coverage. |
| D-8 | MAJOR | The ink-only deck→hint step is 2.06:1 light but **1.49:1 dark** — the named deviation's sole mechanism is 28 % weaker in the unmeasured arm | **CONFIRM.** My independent luminance figures agree to ±0.01 on all six cells. The best finding in pass 1: it measures the *step* where everyone else measures the *floor*. |
| D-9 | MINOR | Rung-blind absolute-rem margins under a 53→177 px ramp; `AnimatedText.vue:19` records the em-relative lesson | **CONFIRM and EXTEND → ND-3** (the inversion: the larger rank receives the *smaller* relative air). |
| D-10 | MINOR | `line-height: 0.92` leaves ≈0.148 em below baseline; any `title` with a descender collides with the deck; latent in a public prop | **CONFIRM.** Re-derived: half-leading `(0.92−1)×177.4/2 = −7.1 px`, deck ascender overflow +2.5 px, against a 12 px gap ⇒ ≈4.9 px of real air. Feeds ND-3. |
| D-11 | MINOR | `--type-title` is the ladder's only non-fluid rung; mega→title drifts to 5.39× and freezes; five published rungs skipped | **CONFIRM.** The ladder table (`typography/scale.css:1`) re-probed: display-5 6.854 / -4 5.382 / -3 4.236 / -2 3.330 / -1 2.618 all skipped, and deck and hint share the floor rung — a claimed three-level hierarchy shipping as two. |
| D-12 | MINOR | Owned tokens get fallbacks, rented (glass-ui) tokens get none — backwards under F-1 | **CONFIRM, and now WORSE than stated.** Pass 1 called the rented-side risk hypothetical ("a rename … makes it IACVT"). **It has already happened, on the owned side's dependency**: `--dock-margin` is a rented token 7.0.0 no longer publishes (ND-1). The hypothetical is a fact. |
| D-13 | MINOR | Three class prefixes on one element; `.start-screen-subtitle` has a rule only inside a media query; two naming eras coexist | **CONFIRM.** |
| D-14 | MINOR | `text-wrap` disagrees between two typographically identical lines (`balance` deck < lg, `pretty` hint always); `pretty` inert at this length | **CONFIRM.** |
| D-15 | MINOR | The sentence is assembled by string surgery; `subtitleSuffix` exists only to seat the glyph; unlocalisable and copy-edit-fragile | **CONFIRM.** Add: `subtitle=""` leaves a leading space and a stranded ☰, and given D-4/ND-2 the ☰ has no justification even for the default copy. |
| D-16 | MINOR | No `max-inline-size` on the prose; public props invite copy the layout cannot set (~115 ch at 3840 px) | **CONFIRM.** |
| D-17 | MINOR | The ☰ rides above the cap line: `vertical-align: baseline` puts the box bottom on the baseline, centre ≈0.40 em vs ≈0.26 em for the lowercase | **CONFIRM, mechanism AMENDED → ND-5.** Pass 1 diagnoses the symptom. The sharper fact: Tailwind v4 preflight already ships `svg { vertical-align: middle }` — which is *correct* here — and this declaration **overrides it**. The line does not omit a fix; it removes one. |
| D-18 | MINOR | `src: local("Georgia")` is the fallback's sole source — absent on stock Android/Linux, so the CLS calibration holds on 2 of 3 platform families | **CONFIRM.** Verified `style.css:64–71`, single `src`. |
| D-19 | INFO | Dead utilities: `p-0` on the h1, `w-full` on two block h2s | **CONFIRM.** |
| D-20 | INFO | `w-screen` hard-codes 100vw inside an `inset-0` containing block; harmless only because `html,body{overflow:hidden}` | **CONFIRM.** |
| D-21 | INFO | `EditorShell.vue:60`'s `flex items-center justify-center` is dead — its only child is `position: absolute` | **CONFIRM.** Add the forward hazard: the host centres, the guest self-seats, so any future non-absolute start screen behaves completely differently with no warning. |
| D-22 | INFO | `pointer-events: none` also disables text selection — no visitor can copy the copy | **CONFIRM.** Also the reason ND-2's missing CTA cannot be added in place. |
| D-23 | INFO | `--start-hero-band`'s documentation is stale; sole live consumer is `CubeScene.vue:267` | **CONFIRM.** |
| D-24 | INFO | `index.html:38` names `<h1 class="text-display-4">` as the LCP element; the tree ships `text-display-mega` | **CONFIRM.** Verified verbatim at `index.html:38`. |
| D-25 | INFO | Redundant `font-synthesis: none` at `:108`; the file's own `:23` argues against its own line | **CONFIRM.** |
| D-26 | INFO | Dev/prod root-arity divergence (fragment in dev, single root in prod once comments strip) | **CONFIRM, latent.** |
| D-27 | INFO | Two live variants; `EditorShell.vue:62`'s default drops the hint entirely via `v-if` | **CONFIRM.** |
| D-28 | INFO | Forced-colors: type is fine (≈15:1 both polarities); the Aurora gradient backdrop is unresolved, `forced-color-adjust` absent | **CONFIRM.** Pass 1's computation is right and my instinct to charge `opacity: 0.85` as a forced-colors defect was wrong — recorded as a **correction to myself**, not a finding. |

---

## 2. NET-NEW BLOCKERS

### ND-1 · BLOCKER · `--dock-margin` is undefined repo-wide; the mobile work-area chain is invalid-at-computed-value-time, and the mobile seat resolves to a raw `52dvh`

**Provenance**
- `EditorStartScreen.vue:82–87`, the file's central design defence:
  > "Derived **ENTIRELY** from the work-area chain … **No raw vh/px magic number** (the K.W3 M4/C5 ban
  > holds — the `100dvh` in the `var()` fallback is the chain's own saturation value, **not a seat offset**)."
- `EditorStartScreen.vue:119–122` (mobile seat):
  `top: calc(var(--work-area-top-offset, 0px) + var(--work-area-height, 100dvh) * 0.52)`
- `styles/layout.css:78–84` — `--dock-band-reserve: max(calc(var(--dock-icon-height) + **var(--dock-margin)** + env(safe-area-inset-bottom, 0px)), var(--menubar-measured-h, 0px))`
- `styles/layout.css:183` (mobile arm) — `--work-area-max-height: min(64rem, calc(100dvh - var(--dock-band-reserve)))`

**The probe.** `--dock-margin` is consumed **9×** and defined **0×**:
```
$ grep -rn -- "--dock-margin:" . --include="*.css" --include="*.vue" --include="*.ts" --include="*.js"   → (empty)
$ grep -rl "dock-margin" node_modules/                                                                   → (empty)
```
Consumers: `layout.css:80, 92, 117, 135, 161, 166, 204` + `TransportDock.vue:379, 389`.
glass-ui 7.0.0 *does* publish a `--dock-*` family (`tokens/sizing.css`: `--dock-h`, `--dock-scale`,
`--dock-icon-glyph`, `--dock-collapsed-padding`, `--dock-scroll-gutter`, …) — **but no `--dock-margin`.**
The demo's geometry chain reads a token from an older glass generation that 7.0.0 dropped. This is
lane-frontend **F-1** (undeclared, unlocked, phantom glass-ui) landing as a live design defect, and it is
the concrete case pass-1 D-12 described as hypothetical.

**The mechanism** (CSS Variables, invalid-at-computed-value-time). `var(--dock-margin)` with no fallback
substitutes the guaranteed-invalid value → `--dock-band-reserve` is IACVT → computes to guaranteed-invalid,
i.e. *unset*; it does **not** revert to an earlier declaration. Cascading down the `max-width: 1023px` arm:

```
--dock-band-reserve         → unset   (layout.css:78)
--work-area-max-height      → unset   (layout.css:183 — consumes it with no fallback)
--work-area-height          → unset   (layout.css:184)
--work-area-vertical-slack  → unset   (layout.css:185)
--work-area-top-offset      → unset   (layout.css:186)
```

So below `lg` the component's own fallbacks fire and the seat is
`top: calc(0px + 100dvh × 0.52)` = **a flat `52dvh`**. The `100dvh` the comment excuses as "the chain's own
saturation value, **not a seat offset**" **is the seat offset**, and it is precisely the raw-vh magic number
the same sentence declares banned. **The file's most-argued invariant is false at exactly the breakpoint
its second media block was written for.**

Desktop survives by luck: `layout.css:49–51` derives `--work-area-max-height` from
`clamp(44rem, 88dvh, 120rem)` with no `--dock-margin` term, so `:90–92` genuinely derives. The **dock
anchors do not survive anywhere** — `--dock-top-anchor` (`layout.css:113–118`) and `--dock-bottom-anchor`
(`:128–136`) both consume it, so both are unset, and `ChromeDock.vue:216`'s
`style="top: var(--dock-top-anchor)"` is IACVT on a non-inherited longhand → `top: auto`. The fixed dock
then lands near y = 0 by static-position accident, which is exactly why the break has stayed invisible —
and why pass-1 D-4's "unconditionally top-anchored" conclusion holds for the wrong reason.

**Consequences for the register.** Pass-1 D-1's `--dock-band-reserve ≈ 90px` premise is void; re-run on the
broken chain the mobile seat is `0.52 × 844 = 439 px` (vs pass-1's 426.5 px) and the die extent `[456, 612]`
is *still* wholly inside the hero block — D-1's conclusion is robust to its own broken premise. Pass-1 D-7
upgrades from "un-tokenized ratio" to "un-executed derivation."

**Falsifier.** Any runtime-reachable definition of `--dock-margin` — a stylesheet the two greps missed, a
JS-injected inline custom property, or an `@property` initial-value registration. Or, decisively, on a
<1024 px viewport: `getComputedStyle(document.documentElement).getPropertyValue('--work-area-top-offset')`
returning a non-empty length. Either kills this outright and restores pass-1 D-1's arithmetic.

---

### ND-2 · BLOCKER · "then press Play." names a control the tree deletes on home — and the CTA that deletion promised was never built

**Provenance**
- `EditorStartScreen.vue:75` — `subtitleSuffix: "below, then press **Play**."`
- `transport/AnimationControlsGroup.vue:91–95` (comment) + `:98` (`v-if`):
  > "Home derives `transportNames = []` … so the transport does **NOT render** — home is COMPASS ONLY
  > (VERDICT #6 … the orphaned home transport cluster is deleted at the root; **the start-screen CTA lives
  > in the start screen**)."
  `<TransportDock v-if="transportNames.length > 0" …>`
- `transport/TransportDock.vue:63` — the app's **only** Play control:
  `:aria-label="isPlaying ? 'Pause animation' : 'Play animation'"`.
- `EditorStartScreen.vue:17–18` — the band is `pointer-events-none`; the file contains **zero** `<button>`,
  `<a>`, or `@click`.

**The defect, in two parts.**

*(a) The instruction's last clause is false.* Pass-1 D-4 establishes that the deck's first three referents
("the list", "☰", "below") do not exist. The fourth is the strongest of the four and pass 1 does not charge
it: **there is no Play control on home**, by explicit owner VERDICT #6, in the same tree. Completed, the
scoreboard for the page's only sentence is:

| the copy says | the tree ships |
|---|---|
| "the list" | a **collapsed** dock pill wrapping a `<Select>` — nothing list-shaped is on screen (`ChromeDock.vue:232`) |
| "☰" | the trigger glyph is `Home` (`ChromeDock.vue:238–243`); the ☰ exists only in this sentence |
| "below" | `fixed; top: var(--dock-top-anchor)` (`ChromeDock.vue:214–216`) — **above** the hero |
| "press Play" | `TransportDock` is `v-if`'d out on home (`AnimationControlsGroup.vue:98`) — **no Play exists** |

Four clauses, four misses. A first-time visitor's only content is a four-clause instruction, every clause of
which mis-describes the interface.

*(b) A delivered debt.* `AnimationControlsGroup.vue:94–95` deletes the home transport **on the promise**
that "the start-screen CTA lives in the start screen." **That CTA was never built.** The start screen has no
interactive element, and `pointer-events: none` at `:18` (pass-1 D-22) makes one impossible without editing
the band root. So the deletion's compensating control is absent *and* structurally excluded — a
cross-component design debt that neither file's comments record as outstanding.

This supersedes `home.md`'s "microcopy for an empty state, not a landing": a weak proposition wastes an
opportunity; a false instruction **strands the user**, and this one strands them at the app's front door.

**Falsifier.** A live home capture (SS-13) showing any Play affordance on the home route, or a
`transportNames` derivation that is non-empty for the home `AnimationGroup` (`AnimationControlsGroup.vue`,
the `transportNames` computed). Either downgrades this to the pass-1 D-4 MAJOR.

---

## 3. NET-NEW MAJORS

### ND-3 · MAJOR · Proportion inversion — the larger rank receives the smaller relative air

**Provenance** `:105–110` (`h1.hero-display { line-height: 0.92 }`), `:136` (`.hero-deck
{ margin-block-start: 0.75rem }`), `:147` (`.hero-hint { margin-block-start: 0.35rem }`). Tailwind v4
preflight zeroes all default margins and padding, so **these two declarations are the entire vertical rhythm
of the page** (and `p-0` at `:27`, pass-1 D-19, is inert against it).

Pass-1 D-9 charges rung-blindness (absolute rem under a fluid ramp) and D-10 charges descender clearance.
Neither states the composition defect they jointly imply:

| interval | declared | as a fraction of its own rank | effective optical air |
|---|---|---|---|
| poster (177.4 px) → deck | `0.75rem` = 12 px | **0.068 em** | half-leading `(0.92−1)×177.4/2 = −7.1 px` ⇒ **≈4.9 px** |
| deck (32.9 px) → hint | `0.35rem` = 5.6 px | **0.17 em** | deck lh 1.15 ⇒ +2.5 px ⇒ ≈8.1 px |

**The gap under the 177 px rank is optically smaller than the gap under the 33 px rank.** Relatively it is
2.5× smaller; absolutely, after the negative half-leading, it is smaller outright. And the gap ratio is
`12/5.6 = 2.14` against a type ratio of `177.4/32.9 = 5.39` — the intervals and the ranks are not merely
un-proportioned, they run in opposite directions. Aristotelian proportion (and every classical setting rule)
puts the largest interval at the largest rank change; this page puts the smallest one there. Neither
`0.75/0.35 = 2.14` nor either term is a φ relation (φ = 1.618, φ² = 2.618), in a file that claims a
"φ ladder read top-down" at `:34–36`.

*Honesty note:* glass-ui 7.0.0 ships only two φ spacing rungs (`--space-phi-5: 2.618rem`,
`--space-phi-6: 4.236rem`, probed across `dist/styles/**`), neither of which fits. This is **not** a
"you ignored an available token" finding — it is proportion and internal consistency.

**Falsifier.** A rendered measurement showing ≥0.15 em of optical air under the poster (would mean the line
box or half-leading resolves other than computed); or a ruling that the deck is intended to crowd the poster
as a single optical unit — which `:129–134`'s "ramp" language contradicts.

### ND-4 · MAJOR · The page's `<h1>` sits outside every landmark

`EditorShell.vue:52–65` places the start-screen wrapper as a **sibling before** `<main>` (`:74`) — the same
file that at `:67` establishes "the single `<main>` landmark (lighthouse landmark-one-main)" and takes care
to make it "a REAL layout box — not `display:contents`, which strips the box AND the implicit `main` role."
The care went to the landmark and not to what it contains: the page's primary heading and its entire
instructional copy live in **no landmark at all**, between `HeaderRibbon` (`:16`) and `<main>`.

Axe/Lighthouse best practice ("all page content should be contained by landmarks") flags this, and
landmark-based AT navigation — the fastest wayfinding mode there is — skips straight past the only content
on the page. Compounding ND-2 and pass-1 D-6: a user who lands, jumps by landmark, and lands in `<main>`
finds a cube and no instructions at all.

**Falsifier.** An `aria-label`led landmark wrapping the start-screen slot (there is none), or a ruling that
the hero is decorative — which ND-2 and pass-1 D-6 both contradict, since it carries the page's only copy.

---

## 4. NET-NEW MINORS AND INFO

**ND-5 · MINOR · `vertical-align: baseline` on the ☰ *overrides the correct default*.**
`:165–170`. Tailwind v4 preflight (`node_modules/tailwindcss/preflight.css:209–219`, reached via
`style.css:1` `@import "tailwindcss"`) ships `img, svg, … { display: block; vertical-align: middle }`, the
second explicitly "to align replaced elements more sensibly." `:42`'s `inline` re-inlines the icon and
`:169` then replaces `middle` with `baseline`:

| alignment | box span | optical centre |
|---|---|---|
| preflight `middle` | −0.145 em → 0.655 em | **0.255 em** = the lowercase optical centre |
| shipped `baseline` | 0.000 em → 0.800 em | **0.400 em** |

So the icon rides **0.145 em ≈ 4.8 px high** at the desktop deck rung. Pass-1 D-17 measures the same
displacement; the amendment is that the line does not *omit* a fix — **it removes one that was already
there**. The comment's "~0.8 em cap height" also misstates the mechanism twice: 0.8 em is the box, not the
cap height (≈0.70 em from `style.css:60–62`'s declared metrics), and `baseline` aligns the box bottom, not
the box to the cap. *Falsifier:* a cascade probe showing preflight's `vertical-align: middle` not in effect.

**ND-6 · MINOR · `cqi` with no container — a viewport unit wearing a container unit's name.**
`:185, 188` — `clamp(1.5rem, 6.2cqi, var(--type-title))` / `clamp(1.5rem, 5.4cqi, …)`. `cqi` requires an
ancestor with `container-type`. Probe: `grep -rn "container-type" demo/` → 14 hits, **all** inside scene
subtrees, plus the **opt-in** utility `.container-inline-size` (`style.css:239–241`), which is applied to
neither `.editor-shell`, the slot wrapper, nor `.hero-band`. With no eligible container, container-query
length units resolve against the **small viewport** — `6.2cqi` ≡ `6.2svw`. Two problems: (a) it is a
viewport-derived magic number inside the file's own two-fold vh ban (`:85–86`, `:114–115`), laundered through
a unit alias no grep for `vh` will catch — the third form of pass-1 D-7's drift; (b) it is a latent trap —
the day anyone adds `container-inline-size` to `EditorShell` for an unrelated reason, the mobile deck rung
silently re-resolves against a different box, with no error and no test. *Falsifier:* a `container-type` on
any ancestor of `.hero-band` — which would make the units meaningful and the current sizing wrong instead.

**ND-7 · MINOR · `text.split("")` splits by UTF-16 code unit (latent).**
`AnimatedText.vue:82` — `chars: w.split("")`. Any astral-plane character (emoji, CJK ext., math
alphanumerics) becomes a pair of **lone surrogates**, each in its own `<span>`; any combining mark is severed
from its base. `title` is a public prop (`EditorStartScreen.vue:67`). Correct primitive is `Array.from(w)`
or `Intl.Segmenter(…, { granularity: "grapheme" })`. **Latent** — the only value the tree passes is the
ASCII default; note that the one emoji-bearing string in the tree (`App.vue:50`, pass-1 D-6) sits in the
single prop that escapes this path, by luck rather than design. *Falsifier:* a guard rejecting non-BMP
titles, or a policy pinning `title` to ASCII. Neither exists.

**ND-8 · MINOR · Per-character `inline-block` destroys bidi reordering and cursive joining (latent).**
`AnimatedText.vue:34–42` + `:98–101`. An inline-block is an atomic inline: it breaks the shaping run and
freezes visual order to logical order. For Arabic/Syriac every letter renders in isolated form; for any RTL
string the reorder is lost. This is **the one hole in pass-1 S-3's RTL superlative** — the box model is
logical-property-clean, and the *text* layer is not. Latent (`grep -rn "i18n\|useI18n\|vue-i18n" demo/`
→ none), recorded so a localisation wave does not discover it live. *Falsifier:* an Arabic `title` rendering
with correct joining (it will not); an English-only constraint downgrades this to INFO.

**ND-9 · MINOR · `--wave-cycle` is unnamespaced and unregistered, and two defaults are duplicated across the JS/CSS boundary.**
`AnimatedText.vue:24` sets `'--wave-cycle': \`${cycleMs}ms\`` — an unprefixed, `@property`-unregistered
custom property on a span, inheriting to every descendant in the global namespace. Same hazard shape as
lane-frontend §6.3's flat-namespace finding (which pass-1 D-13 extends to class names); this extends it to
the *inline-style* layer, which neither the lane nor pass 1 audited. Two duplicated sources of truth ride
along: `AnimatedText.vue:66` `cycleMs: 3600` vs `:100` `var(--wave-cycle, 3.6s)`; and
`TypingDots.vue:53` `REST_OPACITY = 0.2` vs `:124` `opacity: 0.2` — the CSS copy being the pre-engine and
PRM paint (pass-1 D-5 / ND-1's sibling concern), so a change to the constant silently desynchronises the two
states it governs. *Falsifier:* a test or build step asserting the pairs agree
(`grep -rn "wave-cycle\|REST_OPACITY" test/ demo/` → no test references), or an `@property` registration.

**ND-10 · INFO · Two configuration paths that silently do not reconfigure.**
`AnimatedText.vue:69` — `const { offsetMs, cycleMs } = props;` is a plain destructure of the props *object*
(not the `defineProps()` destructure form), hence **not reactive**: the template's per-char `animationDelay`
reads a frozen local while `words` (`:74`) tracks `props.text` reactively — one prop live, two dead, in the
same render. `TypingDots.vue:61–63` computes `delays` once in setup and `:71–101` builds animations only in
`onMounted`, so a reactive `count` change renders spans that no animation drives. Neither is exercised
in-tree (both mounts take defaults); code-axis adjacent, recorded for completeness.

---

## 5. Superlatives (L-18 runs both ways) — 5 folded + 4 net-new

**Folded from pass 1, all re-verified and CONFIRMED:**
**S-1** the per-char a11y architecture (`AnimatedText.vue:21–25`: one `sr-only` phrase span, `aria-hidden`
visual layer) *plus* the whitespace hazard solved structurally by a per-word `margin-inline-end: 0.25em`
rather than a rendered space (`:29–32`) — both the fix and the "Selectananimation" failure it prevents are
recorded in the comment. **S-2** PRM honoured on all three motion sources with zero duplicated guards in
this file (CSS `animation: none` at `AnimatedText.vue:121–125`; the engine's `respectReducedMotion: true` at
`TypingDots.vue:91`; glass-ui's PRM arm collapsing the mount `.fade` to `0.1s !important`, verified in
`glass-ui/dist/styles/transitions.css`) — the consistent corner against lane-frontend §6.5's
"conscientious but inconsistent in mechanism". **S-3** RTL-clean box model — logical properties throughout,
the lone `left-0` inert against a full-width band (**qualified by ND-8**: clean box, unshaped text).
**S-4** the seat reads the work-area chain rather than raw `dvh` — the harder and correct choice
(**qualified by ND-1**: the chain does not execute below `lg`, which makes this superlative an *intent*
credit, not an *outcome* credit; fixing `--dock-margin` converts it back). **S-5** zero bespoke-vs-glass
shadow at this site, with pass 1's two honest qualifications (lane S-5 AMBER on `AnimatedText` and the owner
per-char carve-out; lane S-8 JUSTIFIED BESPOKE on `TypingDots`).

**NS-1 · A metric-matched fallback face engineered specifically for this `<h1>` as the LCP node.**
`style.css:51–54` names this component's h1 as the LCP element; `:64–71` ships
`@font-face { font-family: "Instrument Serif Fallback"; src: local("Georgia"); size-adjust: 105.9310%;
ascent-override: 96.6667%; descent-override: 37.7604%; line-gap-override: 0% }` derived from a Capsize
x-height match (upm 1000, ascent 1024, descent 400, x-height 510 vs Georgia's 2048/986), so the
`display=swap` arrival does not reflow the largest text on the page. Real CLS engineering, on the right
element, with the derivation preserved. Pass 1 uses this block only as *evidence against* the file (D-3,
D-18) and never credits it; both qualifications stand and the investment is still exemplary.
*Falsifier:* the fallback missing from the `--font-display` stack — it is second at `style.css:55`.

**NS-2 · The absolute contrast ratios are AAA in both theme arms, and symmetric.**
Computed from `tokens/color-radius.css` (light) and `tokens/dark-arm.css` (dark), WCAG relative luminance,
`opacity` composited in sRGB before linearisation:

| element | light | dark |
|---|---|---|
| h1 `--foreground` on `--background` | **16.83 : 1** | **15.85 : 1** |
| deck `--foreground` @ 0.85 α | **10.74 : 1** | **11.46 : 1** |
| hint `--muted-foreground` | **5.21 : 1** | **7.70 : 1** |

Every value clears AAA for large text, and the hint clears AA even at *normal* text size — in **both**
themes. That two-arm symmetry only happens when the ramp is designed as one family rather than two, and the
`opacity: 0.85` device costs just 6.1 points of a 16.8 headroom. Pass-1 D-8 says this in one clause inside a
defect ("no contrast failure here — and that is worth saying plainly"); it deserves its own entry, because
D-8's real finding is about the *step*, not the floor, and the floor is genuinely excellent.
*Falsifier:* a different effective backdrop — which is exactly the separate, unresolved question below.

**NS-3 · `TypingDots` gets the two hard parts of engine-dogfooding right.**
Beyond lane S-8's JUSTIFIED BESPOKE ruling (concurred): (a) `:79–84` records *why* `NumericAnimation` is the
wrong primitive — single-pass, and an infinite blink would need a forbidden hand-rolled rAF re-loop
(WV-W6-HIGH-2) — a rejected alternative preserved with the rule that rejected it; (b) `:69` + `:71–76` +
`:103–107` implement a **correct async-mount teardown**: an `unmounted` flag checked *after* the `await
loadAnimationEngine()`, plus `stop()` and array-clear in `onBeforeUnmount`. That is the exact leak class
that kills dogfooded demo components, closed before it could open. Delays come from the library's own
`stagger` primitive (`:61–63`), so the demo exercises `stagger` too — real coverage, not NIH.
*Falsifier:* a leak path the guard misses, or a glass-ui primitive that drives its dots through the
keyframes.js engine (`Pulse`/`PagerDots` are CSS).

**NS-4 · Token discipline at this site is total.**
`grep -n -- "--kf-" EditorStartScreen.vue AnimatedText.vue TypingDots.vue` → **zero**. No hex literals, no
`rgb()`, no bespoke colour anywhere in the three files; everything reads published tokens (`--foreground`,
`--muted-foreground`, `--font-display`, `--type-title`, `--type-display-4`, `--work-area-*`) or glass
utilities (`text-display-mega`, `z-controls`). The `--kf-*` flat-namespace hazard the axis names is
**absent** from this component, and the one unnamespaced local (`--wave-cycle`, ND-9) is a child's. Pass-1
D-13 folds §6.3 as a hazard at the class layer; the token layer here deserves the positive entry.
*Falsifier:* a `--kf-*` or literal colour in any of the three files.

---

## 6. Consolidated tally

| severity | ids | n |
|---|---|---|
| BLOCKER | D-1, D-2, **ND-1**, **ND-2** | 4 |
| MAJOR | D-3 … D-8, **ND-3**, **ND-4** | 8 |
| MINOR | D-9 … D-18, **ND-5 … ND-9** | 15 |
| INFO | D-19 … D-28, **ND-10** | 11 |
| **defects** | | **38** |
| superlatives | S-1 … S-5, **NS-1 … NS-4** | 9 |

## 7. Live-audit queue for SS-13

1. **ND-1** — the one-line settler, on a <1024 px viewport:
   `getComputedStyle(document.documentElement).getPropertyValue('--work-area-top-offset')`. Empty string ⇒
   the chain is IACVT-broken and the mobile seat is a raw `52dvh`. Run this **first**; D-1 and D-7's
   arithmetic both depend on the answer.
2. **D-1** — 375×667 and 390×844 home captures; `getBoundingClientRect()` overlap of `.hero-band` vs `.cube`.
3. **D-2** — 1280×720 and 1366×683 home captures: is the hint clipped by `.editor-shell { overflow: hidden }`?
4. **D-3** — a first-paint filmstrip: do the deck and hint paint upright roman before the ital@1 face lands?
5. **D-5** — emulate `prefers-reduced-motion: reduce`; read `getComputedStyle('.typing-dot').opacity`.
   (The engine-side half of this falsifier is now **closed** from source — see §1, D-5.)
6. **ND-2 / D-4** — a home capture confirming no Play control and no list-shaped affordance below the hero.
7. **Open, unassigned:** whether Aurora's WebGL arm perturbs the ink contrast beyond its declared
   `HERO_AURORA_OPACITY_CEILING = 0.1` (`HeroAurora.vue:46`), and what the deck/hint ratios actually measure
   where they cross the die's brightest face — NS-2's ratios are token-pair ratios and are void over the
   subject. Note that T.D10 (`:96–104`) **deleted** the only mitigation that existed ("the depth-text lilac
   recolor + 4-step shadow stamp are GONE"), so a design that rules text-over-subject "WELCOME" (`:12–13`)
   currently ships no legibility mechanism at all: no `text-shadow`, no `paint-order` stroke, no scrim, no
   `backdrop-filter` (`grep -rn "text-shadow\|paint-order" demo/components/instrument/shell/` → none for
   this component). Filed as an SS-13 measurement rather than a charged defect, because the ratio is only
   decidable live.

## 8. Method

Contrast figures are WCAG 2.x relative luminance from the resolved HSL tokens, `opacity` composited in sRGB
(browser default) before linearisation; my light-arm and dark-arm figures were computed independently of
pass 1 and agree with it to ±0.01 across all measured pairs. Type geometry uses the declared metrics at
`style.css:60–62` (Instrument Serif upm 1000, ascent 1024, descent 400, x-height 510). Token values come
from the **installed** `node_modules/@mkbabb/glass-ui@7.0.0`, i.e. exactly what the tree has on disk.
Line-count arguments state their soft terms; the ND-1 IACVT derivation follows the CSS Variables
invalid-at-computed-value-time rule and is decidable from source alone.

No file in `keyframes.js`, `glass-ui`, or `value.js` product source was written, mutated, or executed. No
installs, no dev server, no browser. This document — a supersede-by-folding rewrite of the pass-1 register
at the same path, carrying all 28 prior ids forward — is the single write.
