# CHALLENGE-D — `demo/workbenches/extract/ExtractWorkbench.vue` — pass 3

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. That is the
tier this seat was explicitly spawned with; the declaration is present in my seat, not inherited
from a parent.

---

## 0. Provenance — what I preserved

Two CHALLENGE-D reports already existed at this path. I clobbered neither:

| Pass | File | Findings |
|---|---|---|
| 1 (`2026-07-27 18:40`) | `challenge-D-design.pass1-2026-07-27.md` | D-1 … D-28 |
| 2 (`2026-07-28 10:38`) | `challenge-D-design.pass2-2026-07-28.md` | D2-01 … D2-23 |
| **3 (this file)** | `challenge-D-design.md` | **D3-01, D3-02** + a re-measurement register |

**I did not read either prior report until after my own probes were complete.** I read the
component, its four collaborators, `PROPORTION-AUDIT.md`, `animations.css`, `REPORT.json` and
`STATES.json`, looked at the Safari shots, and ran seven WebKit/Playwright probe sessions against
the live dev server. Only then did I discover the prior passes and reconcile. That ordering is why
this pass is worth its cost: everything below that agrees with pass 1 or pass 2 agrees from a third
instrument and a cold start, and the two things that *disagree* are not artefacts of re-reading
someone else's reasoning.

The honest headline: **pass 1 and pass 2 were largely right, and between them they already hold 15
of the 17 defects I independently found.** This pass therefore does three things and does not
pretend to do more:

1. Files **one new BLOCKER** that neither prior pass found, and that **pass 1 asserted the opposite
   of** (§2, D3-01).
2. **Upgrades the argument** for pass-1 D-1 from "the preview is cropped" to "the preview and the
   palette disagree about what is in the picture" — with a new, purpose-built reproduction (§2,
   D3-02).
3. Records an **independent confirmation register** (§3), including three numbers nobody had
   measured and two negative results that constrain existing rows (§4).

Artifacts written under this seat: `probe/` (7 screenshots, 5 logs). Probe scripts ran from
scratch; they are reproducible from the pasted commands.

---

## 1. Verdict

**DEFECTIVE**, and the premise holds more sharply than the standing record says.

Pass 2's strongest defect was `D2-01` — the undeveloped ghost is 97% of the stage, the "giant
shadow placeholder" the constitution forbids. That is a defect about **what the instrument shows
when it has nothing to say.**

I nominate a different strongest defect, about **what the instrument says when it does have
something to say**:

> **Strongest defect: D3-01 — the dominance readout names a colour that is not the swatch the
> design says it names, and there is no marker anywhere to find the one it means.**

The component deleted its dominant marker on the written grounds that the marker was redundant with
swatch 0. Swatch 0 is not the dominant. The deletion removed the only binding between a label and
its referent, and the label has been pointing at nothing since. Pass 1 read that same comment and
recorded its claim as fact (`pass1 D-16`: *"the dominance readout names swatch #1 in text"*). It
does not.

That is the shape of this component's real disease, and it is worth naming precisely because both
prior passes circled it without saying it: **this workbench's invariants live in its comments.**
A third of the template is justification prose citing wave IDs and overrules. For at least three
invariants — dominant↔swatch-0, `object-contain` fidelity, `disabled`↔cluster-inertness — the prose
is the *only* place the invariant exists, and in all three cases the rendered artefact contradicts
it. Comments are not a binding mechanism. Every cure below is the same move: relocate the assertion
into the one structure that can enforce it, or delete the assertion with the claim.

---

## 2. New findings

### D3-01 · BLOCKER — "the card's first swatch IS the dominant specimen" is false. The dominance readout has no referent. (NEW — and pass 1 recorded the opposite)

`ExtractWorkbench.vue:113–117` is the written rationale for deleting the dominant marker:

> *"T19 folded as the card's label line (F7) … **The duplicate dominant dot died — the card's first
> swatch IS the dominant specimen.**"*

Nothing enforces it, and two independent code paths guarantee it will break:

- `extractedPalette` (`useExtractSession.ts:85–89`) maps the quantizer's array **in return order**.
- `dominant` (`useExtractSession.ts:121–142`) is a separate max-population scan with an explicit
  **chroma tiebreak** (`:120` — *"ties break toward the higher-chroma color"*).

When populations tie, the tiebreak deliberately walks the dominant off index 0. The card is never
told. Measured live, 1440×900 light, with a 200×200 PNG of four equal 50px bands
(`#c81e5a` `#1e5ac8` `#5ac81e` `#e8e0d0`) — `probe/probe5-log.txt`:

```
=== dominant serialized ===
oklch(73.892055422424% 0.217857767251 137.844885067367deg)          ← L=73.89 → the GREEN

"swatchSeats": [
 { "bg": "oklch(0.544872 0.202432 7.683829)",   "x": 238 },         ← swatch 0 = CRIMSON
 { "bg": "oklch(0.738921 0.217858 137.844879)", "x": 302 },         ← swatch 1 = the dominant
 { "bg": "oklch(0.497787 0.182301 261.30661)",  "x": 366 },
 { "bg": "oklch(0.908697 0.023126 84.592789)",  "x": 430 }
]
"stripCells": [ crimson 115px, green 115px, blue 115px, cream 115px ]
```

The readout says `dominant · oklch(73.89…)`. The card leads with `oklch(54.49…)`. At k=5
(`probe/P7-crop-rails.png`) the first swatch is blue and the dominant is still green.
**There is no ring, no ordinal, no reordering, no marker of any kind** — the label names one member
of a row of five identical circles and gives the eye no way to find it. `probe/P2-fold-1440x900.png`
shows the failure at full size: `25% of the image · DOMINANT · oklch(73.8920554…` sitting above four
swatches, none of which is identified.

Equal-population ties are not a corner case for a colour tool: flat-colour graphics, UI mockups,
screenshots, gradients quantised at low k, and any synthetic test image produce them. Mine did on
the first upload.

**Correction to the standing record.** `pass1 D-16` (line 468) lists as a fourth duplicate rendering
*"the dominance readout names swatch #1 in text"* — accepting the comment's claim. It should be
struck: the readout does not name swatch #1, and D-16's count of "three renderings plus a partial"
should read "three renderings plus **an unbound label**", which is a different and worse defect than
duplication. `pass2 D2-03` measured the same row's type rungs without testing the binding.

> **Reproduction.** `probe/wbex-probe5` output, reproduced here:
> load `/#/extract`, upload a PNG of four equal-height solid bands, compare
> `document.querySelector('code.fira-code').title` to the first swatch's computed
> `backgroundColor`. They differ on the first attempt, deterministically.

**Cure — architectural, not a patch.** Choose one binding mechanism and delete the prose:

- **Preferred: sort `extractedPalette` by population descending.** Index 0 then *is* the dominant,
  the comment becomes true by construction, and the card's population-proportional strip gains a
  second meaning for free — left-to-right becomes a ranking, which is what a viewer already assumes
  a proportional strip means. One sort, three defects closed (this, the unbound label, and the
  strip's currently-arbitrary order).
- **Otherwise: restore a marker** on the dominant seat and keep the readout.

Doing neither — asserting the binding in a comment and rendering nothing — is the only option worse
than either.

---

### D3-02 · BLOCKER (severity upgrade of pass-1 D-1) — the crop is not a cosmetic crop: the palette contains colours the preview does not show.

`pass1 D-1` correctly identified the mechanism and I reproduce it exactly on a third instrument
(WebKit/Playwright, cold session, square source — `probe/probe6-log.txt`):

```
=== P7. preview crop + preview focusability (1440x900) ===
 "imgRect":       { "y": 131.7, "h": 458, "bottom": 589.7 }
 "containerRect": { "y": 200.7, "h": 320, "bottom": 520.7 }
 "containerOverflow": "hidden",   "imgObjectFit": "contain",   "imgHeightDecl": "458px",
 "croppedTopPx": 69,  "croppedBottomPx": 69,  "croppedFraction": 0.301
```

Pass 1 filed this as a fidelity defect — *"the source specimen is silently cropped"* — and rated it
BLOCKER on that basis. I built a reproduction that shows the consequence is worse than fidelity,
and it is the consequence that should drive the cure.

**The probe image.** Four equal bands, plus an **8px solid black rail at the very top and another at
the very bottom** (`probe/wbex-probe6.mjs`). Black is 8% of the source. Result, k=5, at 1440×900 —
`probe/P7-crop-rails.png`:

- **Neither black rail appears anywhere in the preview.** Both are inside the 69px cropped margins.
- The quantiser reads the file through `createImageBitmap` on the *original* (`useImageQuantize.ts:19–25`),
  finds black, ranks it 5th, and **the card renders a black strip cell and a black swatch.**

So the instrument displays a picture with no black in it, and directly beneath it a palette
containing black, with no explanation available to the user. That is not a cropping bug; it is the
instrument disagreeing with itself about its own input.

Two further consequences neither prior pass records:

**(a) Two different specimens in one session.** `ImageEyedropper` receives
`session.previewDataUrl` (`ExtractWorkbench.vue:175`) — the **uncropped** data URL. The sampler
therefore shows the full image while the zone shows a 70% derivative of it. A colour sampled in the
overlay may have no referent in the frame the user was looking at one click earlier.

**(b) Equal areas render unequal, under a readout that says they are equal.** Each source band
occupies 114.5px of the rendered img; the first and last are clipped to 45.5px — **39.7% of their
true height** — while the middle two render at 100%. The dominance line says every band is 25% of
the image. The picture directly above it says 12 / 38 / 38 / 12.

**Cure.** Pass 1's cure (`max-height:100%` on the img, or `min-h-0` on the flex parent) closes the
mechanism but leaves the design unowned. The transposition: **the specimen seat is a stage with a
declared aspect ratio**, letterboxing inside it — the same law `ShadowPalette` already applies to
the result plate. `h-full` on a child of a `max-height`-clamped flex column is the bug generator and
will regenerate this defect at the next viewport change. And whichever geometry wins must be the
geometry the quantiser and the sampler see, or the disagreement survives the fix.

---

## 3. Independent confirmation register — third instrument, cold start

Everything here was measured by me before I read the prior passes. `✓` = reproduced; the number is
mine, not theirs.

| Standing row | My measurement | Verdict |
|---|---|---|
| `pass1 D-1` / crop | `croppedFraction 0.301`, `objectFit contain`, `overflow hidden`, img `458px` in a `320px` box | ✓ CONFIRMED — see D3-02 |
| `pass1 D-7` / `pass2 D2-03` type collision | dominance stat `41.888px` Fraunces · pane `<h3>` "Extract" `41.888px` Fraunces — **byte-identical** | ✓ CONFIRMED, third time |
| `pass1 D-8` / `pass2 D2-04` truncated readout | desktop `clientW 178 · scrollW 585 → 30% visible`; **mobile 390: `clientW 87 · scrollW 500 → 17% visible`** | ✓ CONFIRMED + **new mobile number** |
| `pass1 D-11` / `pass2 D2-11` sampler pointer-only | `dzTabindex "-1"`; **absent from the whole tabbable set**; focused programmatically + `Enter` → `eyedropperOpen: false` | ✓ CONFIRMED + **new proof shape** |
| `pass1 D-12` / `pass2 D2-08` `disabled` dropped | with camera live: Upload `false`, Camera `false`, both sliders undisabled, Reset `true` — 1 of 5. **And I drove k 5→6 with the viewfinder open (`shadowSegs: 6`)** | ✓ CONFIRMED + **new live proof** |
| `pass2 D2-08` camera one-way door | viewfinder contains exactly one control (`"Capture frame"`); `Escape` → `video still present: true` | ✓ CONFIRMED |
| `pass2 D2-09` MediaStream leak | second Camera press → `streamCount: 2`, `trackStates: ["live","live"]` | ✓ CONFIRMED |
| `pass1 D-26` / `pass2 D2-06` raw exception | `"Camera access denied: NotAllowedError: The request is not allowed by the user agent or the platform in the current context."`, `role: null`, `ariaLive: null` | ✓ CONFIRMED |
| `pass1 D-19` / `pass2 D2-21` dead `split` | `grep -rn "<ExtractWorkbench" demo/` → 1 hit, `ExtractPane.vue:11`, `layout="column"`. `isWide` (`:226`) feeds only the dead ternary | ✓ CONFIRMED |
| `pass2 D2-16` camera implemented twice | `grep -rn "quantizeFromCamera\|quantizeFromCanvas" demo/ test/ e2e/ \| grep -v useImageQuantize.ts` → **no output** | ✓ CONFIRMED |
| `pass1 D-20` / `pass2 D2-18` `.plate-ink` ×5 | 5 files (`ImageDropZone:110`, `ExtractWorkbench:290`, `ExtractControls:148`, `EmptyState:102`, `ErrorBoundary:84`); `grep -rn plate-ink demo/styles/*.css` → **no output** | ✓ CONFIRMED |
| `pass1 D-17` / `pass2 D2-17` no-op activation | `ExtractWorkbench.vue:152` `@click="() => {}"` into `PaletteCard.vue:26` `@click="$emit('click')"` on a `role="article"` root; emit non-optional (`:200–201`) | ✓ CONFIRMED |
| `pass1 D-13` no way back to empty | `onReset` (`useExtractSession.ts:180–184`) touches `colorCount`/`chromaWeight` only; `previewDataUrl` and `lastFile` untouched; Reset is gated `!hasImage` so it lights up exactly when it reads as "clear" | ✓ CONFIRMED |
| `pass1 D-10` 12px thumbs | `REPORT.json` `/#/extract`, all four matrices: `{"w":12,"h":24,"tag":"span","label":"Number of colors"}`, same for `"Chroma weight"` | ✓ CONFIRMED |
| `pass1 D-28` / `pass2 D2-20` tooltip-only names | `REPORT.json` `namelessButtons: 3` on `/#/extract` in all four matrices; my run: `[{title:"Upload image"},{title:"Open camera"},{title:"Reset"}]`. **Plus a fourth the probe cannot see: the capture chip (`title="Capture frame"`, `aria: null`) and the `<video>` itself (`aria: null`, `title: null`)** | ✓ CONFIRMED + **new** |
| `pass1 D-24` caption orphan | `shots/safari-mobile-light/extract.png`: `· UNDEVELOPED PLATE — FEED IT AN / IMAGE ·`. Measured `font-size 14.384px`, `letter-spacing 2.58912px`, 39 chars, `text-center`, no `text-balance`, no `max-w` | ✓ CONFIRMED |
| `pass1 D-23` / `pass2 D2-13` states never captured | `STATES.json`: 30 rows = 6 matrices × 5 routes {`/`, `/admin/users`, `/blob`, `/browse`, `/gradient`}. `extract present: False` | ✓ CONFIRMED |

**New measurement on the last row.** I ran the four state arms myself against `/#/extract`
(`probe/P5-*.png`, `probe/probe4-log.txt`). `code.fira-code.text-mono-small` appears in the
`clipped` set in **every one**, and at zoom-200 `div.glass-resting.card` — the pane chassis itself —
joins it. WCAG 1.4.4 makes 200% a floor, not a nicety. My RTL arm did not take (`dir: ltr`; the app
resets the attribute after boot), so **RTL for this component remains genuinely unobserved** —
`pass1 D-9` stands on its own evidence, not on mine.

---

## 4. Negative results and constraints on existing rows

Adversarial seats owe their negatives. Three:

**(a) I could not reproduce a layout jump on the result morph.** `pass2 D2-14` states the `vj-morph`
lacks height geometry "so the one thing it needs to morph, jumps". I sampled the result column
across a six-step keyboard k-drag and its full settle — 31 samples, `probe4-log.txt` P3:

```
"samples": [325, 325, 325, … 325],  "min": 325, "max": 325
```

Flat to the pixel. **This does not refute D2-14 — it corroborates `pass1 D-2`.** The skeleton never
appears, so on an already-populated instrument there is no swap to jump. The height defect D2-14
describes can only manifest on the ghost→card transition, which happens once per session. Both rows
should be read together: the morph is under-specified *and* its most-cited victim state is
unreachable.

**(b) Reduced motion is correctly handled.** The global guard (`animations.css:184–192`) neutralises
`animate-pulse` and both `vj-` families app-wide. `ShadowPalette.vue:24–25`'s claim that PRM
"degrades it static for free" is true. I looked for a local override and found none.

**(c) The route is stable.** `REPORT.json` `/#/extract`: `pageErrors 0`, `consoleErrors 0`,
`horizontalOverflow 0`, `overflowX 0` in all four matrices. Every defect in this file and in the two
prior passes is a *design* defect on a route that never throws — which is precisely why none of them
were caught by any gate. That is worth stating plainly to whoever forms the cure wave: **no test
that this repo currently runs can see any of these.**

---

## 5. Two sharpenings that do not merit their own row

**§5a — the dominance row's grouping gap equals its separating gap.** `pass2 D2-03` records the
geometry (`[percentage] [gap 8] … ml-auto ["dominant"] [gap 8] [code]`); the conclusion is worth
stating outright because it decides the cure. Measured:

```
group A "25% of the image"   x 228   → right 396.1
group B "dominant · oklch…"  x 404.1 → right 682
  within B:  eyebrow ends 495.6 · code starts 503.6
```

Between the two groups: **8.0px**. Between the eyebrow and the value it labels: **8.0px**. Proximity
therefore carries *zero* grouping information — "DOMINANT" binds to "% of the image" exactly as
strongly as to the value it names. `ml-auto` was asked to do the separating and cannot, because at
462px there is no slack left to push with. Any cure that only changes type sizes will leave the row
ungrouped; the row needs a second line or a different container, not a smaller numeral.

**§5b — two empty-state grammars render side by side, in one frame.**
`shots/safari-desktop-light/extract.png`, the two panes as shipped:

| | Extract's empty plate | Palettes' empty plate, 360px right |
|---|---|---|
| ghost material | **opaque filled slab**, `--skeleton-ink` `oklab(0.808724 …)` on an `oklab(0.913299 …)` well | **dashed outline** dot trio |
| caption | `· UNDEVELOPED PLATE — FEED IT AN IMAGE ·` (39 chars) | `· EMPTY PLATE ·` (13 chars) |
| headline | none | `No saved palettes yet.` (Fraunces) |

`pass1 D-6` files the material-tier inversion *within* the pane; the cross-pane composition is the
sharper artefact, because both plates are peers in one viewport and the viewer has no access to the
distinction `ShadowPalette.vue:15–17` draws between "standing instrument face" and "TRUE EMPTY". I
accept the documented intent and still record the rendered result: `PROPORTION-AUDIT.md §5.8` —
*"Real rendered relation wins over token intent."* In light mode the filled slab is the single
heaviest, most saturated neutral in a frame that is otherwise entirely pink-tinted glass; it reads
as a failed image load. This is additional evidence for pass 2's `D2-01`, from the composition side
rather than the ratio side.

---

## 6. Ranked disposition — this pass only

| # | ID | Severity | Defect | Cure |
|---|---|---|---|---|
| 1 | **D3-01** | **BLOCKER** | dominance readout has no referent; the design's stated binding is false; `pass1 D-16` records the opposite | sort `extractedPalette` by population desc — index 0 becomes the dominant by construction |
| 2 | **D3-02** | **BLOCKER** | the crop makes the preview and the palette disagree about the picture's contents; sampler sees a third geometry | specimen seat = declared-ratio stage; one geometry for preview, sampler and quantiser |

Both are consequences of the same mechanism as everything in passes 1 and 2, so they should be
routed to the same wave, not a new one.

**Record correction requested:** strike the clause *"Plus a fourth partial: the dominance readout
names swatch #1 in text"* from `pass1 D-16` and replace with *"plus an unbound label"*.

---

## 7. The gestalt

Pass 1 concluded: *"this workbench renders the absence of its output more emphatically than the
output itself."* Pass 2 concluded: *"the absence of a result is a thing to be depicted"* and *"the
specimen is a button."* Both are right, and I reached the second independently before reading them.

The premise this pass adds sits underneath both:

> **This component's invariants live in its comments, and the comments are not load-bearing.**

Roughly a third of the template is justification prose citing wave IDs, overrules and census rows.
That prose is the *only* place several invariants exist, and where I could test one against the
rendered frame it failed:

| Asserted, in prose | Bound by | Rendered result |
|---|---|---|
| `ExtractWorkbench.vue:116` "the card's first swatch IS the dominant specimen" | nothing | swatch 0 ≠ dominant (D3-01) |
| `ImageDropZone.vue:3–5` "the specimen never lies" | `object-contain`, defeated by `h-full` | 30.1% of the picture destroyed (D3-02) |
| `ExtractWorkbench.vue:70` `:disabled="isProcessing \|\| cameraActive"` | 1 of 5 consumers | k driven 5→6 with the camera live |
| `ExtractWorkbench.vue:206` "`split` — the dialog's two columns" | no caller | dead branch + a live matchMedia listener |
| `ExtractWorkbench.vue:96` "a material change, not a layout jump" | `vj-morph`, no height geometry | untestable — the state it describes is unreachable |
| `ExtractWorkbench.vue:135` "never a lying readout" | `title` + `select-all` | 17% visible on touch, where `title` does not exist |

Six assertions, six unbound. The cure at the level of the whole is therefore not two more patches on
top of pass 2's nineteen: it is a rule for the cure wave itself — **every invariant this component
claims must be relocated into a structure that enforces it, or deleted along with the claim.** Sort
the array instead of commenting that it is sorted. Give the stage a ratio instead of commenting that
it never lies. Give the camera a mode chassis instead of passing a prop that says the cluster is
inert. Where an invariant cannot be relocated into structure, the comment asserting it is worse than
silence, because it is what caused pass 1 to record `D-16` as it did.

For a colour-extraction tool, the two rows above are the whole product: the picture it shows you,
and which colour in it it says matters most. Both currently lie.
