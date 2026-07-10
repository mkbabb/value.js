# h-evidence-design-1 — evidence re-verification (design set 1)

**Lane**: hardening · **Charge**: re-measure LIVE the 3 most load-bearing MEASURED claims
(alphas / px probes / contrast ratios) in each of `t-card-material`, `t-title-typography`,
`t-sliders-hierarchy`, `t-header-shading`; confirm or correct; a corrected number that
changes a doctrine/Q = MUSTFIX.

**Substrate check (precondition for the whole lane)**: `git diff --stat cc4f4fa..HEAD --
demo/ src/` is **empty** — product code is byte-identical between the four lanes' S-close
probe substrate (`cc4f4fa` / `f700d80`) and this hardening HEAD (`4e52a40`). Therefore any
delta between a lane's cited number and my live re-measure is a genuine lane error, not
substrate drift.

**Rig**: my own vite `:9477` (`VITE_API_URL=http://localhost:59999 npx vite --port 9477
--strictPort`), owner's `:9000` untouched. Playwright computed-style probes; PIL rendered-
pixel WCAG sampling. Dark scheme driven by the real `@mbabb` → "Dark mode" UI toggle (the
`useDark` store, not a forced `.dark` class — the class is source-of-truth, not observed, so
a forced class would leave `labelColor`'s reactive `isDark` false and give Frankenstein
readings). **Contention caveat**: the shared MCP browser was being navigated by parallel
hardening lanes (phantom tabs at `:9615`/`:9642`); every computed-style read below is
**URL-guarded** (result aborts unless `location.href` is my `:9477`), so no drifted reading
entered the ledger. The one static-utility read (F7, `text-subheading`) is port/scheme/
color-invariant and was taken on whichever value.js instance was current.

**Verdict**: the measured corpus is remarkably sound. **0 MUSTFIX** — not a single re-measured
number changes a doctrine or a Q; the linchpin claims reproduce to the digit. **1 SHOULDFIX**
(a census-completeness gap in t-card-material §1 that, folded, *strengthens* T-CM-3). Plus one
minor NOTE correction and a positive-confirmation ledger.

---

## MUSTFIX
None. Every doctrine-bearing number re-measured true (see §positive ledger).

---

## SHOULDFIX

### H-ED1-1 — `t-card-material` §1 backdrop-filter census is incomplete; the omitted `saturate()`/`brightness()` on the wash tier is *corroborating* evidence for T-CM-3, not noise
**Corpus location**: `docs/tranches/T/audit/lanes/t-card-material.md` §1 "Host plates" table,
lines 28–29 (the "Material (light)" / "Material (dark)" columns).

**Cited** (lane §1):
- Picker: light `+ blur(8px) saturate(1.4)`, dark `+ blur(8px) saturate(1.3)`
- ALL 8 pane cards (wash): light `+ blur(1px)`, dark `+ blur(1px)`

**Re-measured LIVE** (URL-guarded, both schemes, `.rounded-card` computed `backdrop-filter`):
- Picker resting: light `blur(8px) saturate(1.4)` ✓ ; **dark `blur(8px) saturate(1.3)
  brightness(1.14)`** — `brightness(1.14)` omitted.
- Wash pane: **light `blur(1px) saturate(1.4)`** — `saturate(1.4)` omitted; **dark `blur(1px)
  saturate(1.35) brightness(1.18)`** — `saturate(1.35) brightness(1.18)` omitted.

**Why it matters (and why it is not a MUSTFIX)**: the wash tier's transmitted backdrop is
run through `saturate(1.35–1.4)` — it **amplifies** the aurora chroma that bleeds through the
low alpha. That is the exact physical mechanism RC-2/RC-3/T-CM-3 argue ("each rung admits
(1−α) of backdrop chroma … 9 weights render as 4+ colors"): the lane's own §2 sentence "a 1px
blur averages nothing and (1−α) ≈ 60% of raw saturated backdrop transmits" *understates* —
the saturate makes the transmitted chroma **more** than raw. The doctrine is unaffected
(strengthened), so this is completeness, not correction.

**Proposed amendment**: fold the full computed `backdrop-filter` into the §1 stamps (picker
dark `blur(8px) saturate(1.3) brightness(1.14)`; wash light `blur(1px) saturate(1.4)`, dark
`blur(1px) saturate(1.35) brightness(1.18)`), and add one clause to §2 RC-1/§4 T-CM-3 noting
the wash tier's `saturate` amplifies (not merely transmits) the backdrop chroma — a producer-
side corroborant that the wash rung is chromatically hostile over a saturated ground.

---

## NOTE

### H-ED1-2 — `t-sliders-hierarchy` §1 light channel-letter contrast re-measures ~1.9–2.0:1, not the cited 2.17–2.26:1 (finding intact; failure is if anything slightly *deeper*)
**Corpus location**: `docs/tranches/T/audit/lanes/t-sliders-hierarchy.md` §1 table, line 34
("Channel letters … Light **2.17–2.26 : 1**").

**Re-measured** at `lab(38% 32 24)`, 1440×900 light, PIL pixel-sample (median-of-box ground vs
darkest-15-px ink): L=1.91, A=1.99, B=1.99, α=1.99 (all : 1). Ground `(214,168,147)`, ink
`≈(170,108,90)`.

**Confidence**: the *identical* method reproduced the lane's **dark** row to the digit —
ground `(118,86,84)` and **1.01:1** exactly (see H-ED1-3) — so the ~0.2–0.3 light gap is a
real mild optimism in the lane's light figure, not a method mismatch (glyph anti-aliasing of a
20.352px specimen makes the exact ink-pixel choice ±0.2-noisy either way). The finding F-1
("letters fail contrast; below the 3:1 large-text floor") is untouched at every candidate
number; no Q or gate keys on the specific value (the gate is "certified ink ≥ WCAG floor").

**Proposed amendment**: soften the light cell to "≈ 1.9–2.3 : 1" (or annotate "pixel-sample,
glyph-AA ±0.2") so the cited range brackets the reproduced value; no finding change.

### H-ED1-3 — POSITIVE LEDGER: the load-bearing linchpins reproduce exactly
Recorded so the amend pass can rely on these numbers without re-probing.

| Lane / claim | Cited | Re-measured (live, URL-guarded) | |
|---|---|---|---|
| card-mat aurora ground (scheme-invariant) | `rgb(179,114,144)` @ default color | `rgb(179,114,144)` light; at `lab(38 32 24)` `rgb(94,35,57)` in **both** schemes | ✓ + invariance ✓ |
| card-mat picker resting L/D α | `0.885/0.678` · `0.363/0.742` | `oklab .8845/.678` · `oklab .3628/.7424` | ✓ |
| card-mat wash pane L/D α | `0.804/0.356` · `0.412/0.430` | `oklab .8036/.356` · `oklab .4122/.4296` | ✓ |
| sliders dark letters "vanish" | `1.01:1`, ground `(118,86,84)`, letters `oklch(0.5 0.106 31.7)` | ground median `(118,86,84)`, **C=1.00–1.01:1**, letters `oklch(0.5 0.106 31.7)`/`.089 39.1`/`.107 32.6`/`.106 31.6` (all=live color), opacity 0.6 | ✓ exact |
| sliders light letters self-camouflage | letters = live color | L/A/B/α all `lab(~38 32 24)`; opacity 0.6; annotations `rgb(28,25,23)` @ opacity 0.5, 14.384px | ✓ |
| title "Lab" plate rung + weight | display-1 `41.888px` it. **400** | `41.888px` Fraunces italic **400** | ✓ |
| title weight FORK (F2) | picker 400 / About 700 | picker `.space-trigger` **400**; About-hosted **700** (same component); pane h3 `25.888px` **700** | ✓ exact |
| readout rung + spread (F4) | `33.77px`; cells `108.445/130.134/130.134` minWidth vs `66/63/68` fig | `33.7714px`; `108.445/130.134/130.134`; figs `65.9/63.0/67.0` | ✓ |
| tabular-nums no-op (F5) | `1111`=59.19 `9999`=79.87 `0000`=86.76; `1ch`=21.69; tnum==proportional | `59.19 / 79.87 / 86.76`; `1ch=21.69`; tnum≡proportional for every string | ✓ exact — mechanism-1 IS fiction |
| PaletteCard wrong font (F7) | `text-subheading` = Plus Jakarta Sans 600 @ 20.352px | `text-subheading` → `"Plus Jakarta Sans" 600 20.352px` (`--font-text` body voice); `PaletteCard.vue:49` cite ✓ | ✓ exact |
| header veil at rest (F1) | opacity 0, `--card` 60%, blur(12px), range 0–120px, 14px feather | `opacity:0`; light `srgb .994 .96 .926/.6`, dark `srgb .2074 .165 .1326/.6`; `blur(12px)`; `0px 120px`; mask `calc(100%-14px)`; `.pane-header` bg transparent | ✓ exact |
| header host wash / SDA (F1/F5) | wash α `.356`/`.430`; SDA supported | wash `.356`/`.4296`; `CSS.supports(animation-timeline: --pane-scroll)=true` | ✓ |
| header §3 rest-floor bracket arithmetic | o 0.35/0.55/0.8 → ~21/33/48% added | veil fill = 0.6α ⇒ 0.6·o = 0.21/0.33/0.48 exactly; bracket [0.45,0.65]→27–39% | ✓ (math self-consistent) |

### H-ED1-4 — NOTE: golden-rung math in t-title-typography §1/F6 checked, internally exact
`2.058=1.618·1.272`, `2.618=2.058·1.272`, `4.236=2.618·1.618`; `7.2·φ=11.65`; `20/φ=12.36`;
title→display-3 cap `4.236rem=67.78px`, readout `33.77·φ=54.64`. All hold. The only loose
approximation is title:readout `41.888/33.77 = 1.240` cited "≈ √φ (1.272)" — a 2.5% gloss,
harmless.

---

## Method notes / reproducibility
- Dark scheme required the real UI toggle: setting `localStorage['vueuse-color-scheme']='dark'`
  + reload did **not** apply (`htmlClass:""`) — the demo's documented parallel-`useDark`-store
  race (`useMarkdownColors.ts:17` comment). Not this lane's row to fix, but it is a live
  reproduction of that flakiness (relevant to any e2e that forces scheme by storage).
- PIL relative-luminance WCAG (`(L1+0.05)/(L2+0.05)`, sRGB linearization). Dark-row exact
  reproduction of the lane's `(118,86,84)`/`1.01:1` validates the pixel method end-to-end.
- Screenshots: `sliders-light-lab38.png` (1440×900), `sliders-dark-lab38.png` (captured at
  1512×806 — a parallel lane resized the shared window; rects+pixels are same-frame consistent
  and letter camouflage is viewport-independent, so the 1.01:1 stands).
