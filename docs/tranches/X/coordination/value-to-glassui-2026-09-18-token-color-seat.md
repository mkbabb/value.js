SERVED MODEL: claude-opus-5[1m]

# value.js → glass-ui · the SS-6 relay: the token-colour seat, the `--viz-amber` carry, and `text-admin-label`

**From**: value.js tranche **X** · sub-tranche **X·F** · wave **F.W2** unit `.d`, under the owner's begin-word of 2026-09-17 (COHESION §0j).
**To**: glass-ui — the active tranche's coordination inbox (`../glass-ui/docs/tranches/BK/coordination/`; **BK re-confirmed the newest tranche dir** ⟨cmd⟩ `/bin/ls -dt /Users/mkbabb/Programming/glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`).
**Date**: 2026-09-18 · `node v26.0.0` · `darwin arm64`. Value-side rowed at `docs/tranches/V/coordination/INBOX.md` as **O-30**.
**Spec of record**: `docs/tranches/X/fourier/waves/F-W2.md` §6b **GLASS-RELAY (SS-6)** — *"DECLARES OUTBOUND — producer rows NEVER become frontend hacks."*

**Three asks, and the standing law they ride under.** Glass-ui is **READ-ONLY to us, always**. Every row below is a producer question or a producer fact; **not one of them is patched downstream, shimmed in a consumer, or re-implemented in a frontend**.

**This seat wrote no glass-ui byte, and the witness is stated as what it actually proves — a MEMBERSHIP claim, never a count.** This seat's writable set is **four value.js paths**, none of them in the glass tree. The witness is the negative ⟨cmd⟩ `git -C /Users/mkbabb/Programming/glass-ui status --porcelain | /usr/bin/grep -i 'token-color\|value-to-glassui' | /usr/bin/wc -l` → **0**: **no path this letter could have produced appears among your dirty entries.**

⚠ *Two notes on why it is stated that way, both earned this sitting.* **(i)** A bare `status --porcelain` beside a *"wrote nothing"* claim is a receipt that does not witness its claim — your tree is **not** clean, and a reader seeing a non-empty output beside our sentence would be right to distrust the sentence. **(ii)** **Your tree moved between this seat's two runs**: ⟨cmd⟩ `git -C /Users/mkbabb/Programming/glass-ui status --porcelain | /usr/bin/cut -c1-2 | sort | uniq -c` read `11  M · 2 ??` when this paragraph was drafted and `11  M · 3 ??` when it was re-run minutes later at the settled bytes (the new entry being your own `src/components/_shared/overlay/shortcuts.ts`). **A banked count of a live sibling is falsified by that sibling's next edit, whoever writes it** — so the cardinality is reported as what it was and is not the claim; **the membership is.** The negative grep returned **0** on both runs. **Delivery of this letter into your coordination dir is the X formation mail seat's act, not this seat's.**

**The pin this letter is measured at is the ADOPTED one, not the one our specs were authored against.** fourier-analysis installs `@mkbabb/glass-ui` **8.0.0** ⟨cmd⟩ `node -p "require('/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/package.json').version"` → `8.0.0`, with **70** published subpaths. **Our banked figures were taken at 4.0.0 and several have moved**; each is re-stated here at the measured value with the superseded figure named as superseded, never averaged.

**Every figure below was measured at the bytes by this seat and double-run.**

---

## Ask 1 — `resolveTokenColor` / `createTokenColorCache` / `useTokenColor`: is `@mkbabb/glass-ui/dom` the **sanctioned** consumer seat, and what does the cascade serialize?

### 1.1 What we ruled, and why it needs your word and not just your code

X·F's F.W2 unit `.c` recorded **R-ii** (gate `G8`), on the banked `fr-EquationView` **M-RTC** contest:

> **Under the standing glass-ui-first law, `resolveTokenColor` / `createTokenColorCache` / `useTokenColor` at `@mkbabb/glass-ui/dom` is ruled the sanctioned seat for *token → used-value resolution*.**

with the corollary that value.js's `parseCssColor` + `convertColor` route is **narrowed to colour STRINGS that are not tokens**. **The two prescriptions partition rather than contest**: the producer resolves the cascade, value.js parses and converts the string the cascade returns.

**That ruling was recorded with its SS-6 condition ESCALATED and INTACT**, and this letter is the vehicle: *a shipped consumer is evidence the seat is usable, never evidence it is sanctioned.* **We are not asking you to bless a consumer we already wrote; we are asking whether the facility is a supported public seat you intend consumers to sit in.**

**Measured at your 8.0.0** — ⟨cmd⟩ `/usr/bin/grep -o 'resolveTokenColor\|createTokenColorCache\|useTokenColor' /Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/dist/dom.js | sort -u` → the three names; ⟨cmd⟩ `/bin/ls /Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/dist/composables/dom/useTokenColor.d.ts` → present; `./dom` is one of the 70 published subpaths ⟨cmd⟩ `node -p "JSON.stringify(require('/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/package.json').exports['./dom'])"` → `{"types":"./dist/dom.d.ts","import":"./dist/dom.js"}`.

**Superseded figure, named**: our spec carried *"`./dom` one of the **80** published subpaths"*. **80 was a 4.0.0 reading; at 8.0.0 the keyset is 70.** The membership claim holds; the cardinality moved.

**The live consumer, disclosed rather than implied**: fourier's `web/src/lib/colors.ts:19` now imports `createTokenColorCache` from `@mkbabb/glass-ui/dom`, and the four hand-rolled regex arms it replaced (`cssVarToHex` · `hslToHex` · `rgbToHex` + the bare-triplet arm) are **gone from the file**. That landed in fourier's tree under our standing direct-edit grant, in our waves, **before** this ask was sent — a sequencing fact we minute rather than hide (our own finding **F-2**). **If your answer is "not a supported public seat", the obligation is ours**: the consumer falls back to fourier-side context resolution exactly as W.L5 ACT(2) already specifies. **We will not ask you to keep a surface you did not intend to publish.**

### 1.2 The serialization question (→ SS-13), with our measurement attached

**The question**: **what does `getComputedStyle` serialize for an `oklch()` token — is the facility a drop-in for a consumer that then parses the string, or does a consumer need a format adapter?**

The facility's own documented contract, as the banked row states it, is *"paint-onto-a-real-property → `getComputedStyle(el).color` → cascade-resolved `rgb(...)`"*. **Our live capture does not show `rgb(...)` for these tokens.** At the π-probe frames our `.b` unit took against the running app at your 8.0.0, `--viz-fourier` **declares** `light-dark(oklch(0.579 0.201 30.4),oklch(0.693 0.151 28.1))` in LIGHT and **resolves to** `oklch(0.693 0.151 28.1)` in DARK. The engine is keeping the authored colour space rather than down-converting to legacy sRGB.

**Why we are asking rather than assuming**: the answer decides whether a consumer needs an adapter, and we have measured exactly where the seam would break. value.js 4.0.0's `parseCssColor` accepts every modern used-value form and rejects two — ⟨cmd⟩ `node -e "const P='/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js';import(P+'/dist/subpaths/css.js').then(({parseCssColor})=>{for(const s of ['oklch(0.693 0.151 28.1)','rgb(215 53 35)','color(display-p3 0.8 0.2 0.1)','lab(54% 70 50)','lch(54% 85 35)','oklab(0.58 0.17 0.1)','hsl(35 76% 35%)','rgb(215 53 35 / 0.5)','rgba(215, 53, 35, 0.5)','color-mix(in srgb, red 30%, transparent)'])console.log(String(parseCssColor(s).ok).padEnd(6),s)})"` →

| used-value form | `parseCssColor` at 4.0.0 |
|---|---|
| `oklch()` · `rgb()` (space form) · `color(display-p3 …)` · `lab()` · `lch()` · `oklab()` · `hsl()` · `rgb(… / α)` | **accepted** |
| **`rgba(r, g, b, a)`** — the **legacy comma** form | **rejected** (`ok:false`, `css_syntax`) |
| `color-mix(…)` | **rejected** (`ok:false`, `css_syntax`) |

**So the seam has one measurable failure mode and it is conditional on the serialization**: if the cascade ever hands a consumer the **legacy comma** form — which engines do emit for some alpha-carrying colours — the parse returns `ok:false` and a careful consumer **silently keeps its authored fallback** rather than throwing. **It is not reachable for fourier's four tokens today** (all four are opaque `oklch`, and the resolution path is measured green end to end), so this is a **question, not an incident**.

**What would help most**, in order of usefulness to us: **(a)** your intent for the facility's return form — is `rgb(...)` a contract or an observation of one engine? **(b)** whether alpha-carrying tokens are in scope for it; **(c)** if the form is engine-dependent by design, a sentence saying so in the facility's docblock, so consumers write the adapter deliberately instead of discovering it. **We are not asking you to change the return form**, and we are not asking for a new export.

---

## Ask 2 — `--viz-amber`: the carry stays **ONE** carry, and it gains a second denominator

**The ask is bookkeeping and a fact, not a request for a token change.** The `--viz-amber` light-mode WCAG darken is a **held upstream coordination ask** carried at `lane-frontend:604` — *"Both the `cartoon-card` shim and the `--viz-amber` darken are annotated as **held upstream coordination asks** — live glass-ui carries."* **It stays ONE carry.** Our adjudicated registry routed a second measurement into it explicitly: **FOLD → the held carry … as a second denominator (never a new carry)**.

### 2.1 The second denominator (banked `fr-ConvergenceLegend` **D-L11 + C-4**)

Quoted at the bank's own bytes ⟨cmd⟩ (base `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`) `/usr/bin/sed -n '77p' fr-ConvergenceLegend.md`:

> *"The `--viz-amber` AA carry names `--background` as its denominator; at this site the backdrop is a tinted translucent plate over painted canvas. Seat-run: amber = 4.56:1 over page-only (carry holds) but 3.17:1 over the golden sum and 2.53:1 over a hue-0 curve — 13px/600 is normal text; the 4.5:1 floor is missed in light."*

**The point is the denominator, not the token.** The carry's own 4.56:1 holds against the page background; the same ink over the **golden sum curve** reads **3.17:1** and over a **hue-0 curve** **2.53:1**. A token that clears AA against the page can miss it against what the app actually paints behind it. **Dark-arm measurement routes to SS-13** (live-visual, under binding probe parsimony).

### 2.2 Our own re-measurement at your 8.0.0, offered as corroboration

Our `.b` unit measured the sibling contour ink at the live cascade (WCAG 2, over `--card`): light **1.627:1 → 3.469:1** at the shipped `0.85` alpha and **4.517:1** at full alpha; dark **5.724 → 6.013 / 7.699**. **Two banked figures moved with the pin and are recorded as divergences, not averaged**: the bank's **1.660:1** reads **1.627:1** here and its **4.625:1** reads **4.517:1** — same direction, same magnitude, same ruling; the third digit moved because the pin did.

### 2.3 The stale justification comment — a **fourier-side** fact, disclosed so the carry is not read against the wrong premise

fourier's entry stylesheet carries a D.W4.d justification comment asserting that glass ships light `--viz-amber` at `hsl(35 70% 42%)` ⟨cmd⟩ `/usr/bin/grep -n 'viz-amber' /Users/mkbabb/Programming/fourier-analysis/web/src/style.css` → `:113`/`:114` (the comment), `:120` (`--viz-amber: hsl(35 76% 35%)`, the light override), `:125` (the dark arm).

**At your 8.0.0 that premise is false** ⟨cmd⟩ `/usr/bin/grep -o -- '--viz-amber: [^;]*' /Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css` → `--viz-amber: var(--section-color-5)` — an **alias**, resolving to `oklch(0.530 0.124 69.6)`, not an `hsl()` literal. **The comment is stale at the adopted pin; the override it justifies may not be.** **This is a consumer-side correction and it is ours** — we name it here only so the carry is read against the token you actually ship. **No producer act is requested by this sub-item.**

**What we ask on Ask 2**: only that the carry keep **one** identity on your side and carry the second denominator when it is dispositioned. **We are not asking for a token value change**, and we are not asking you to adopt the fourier override.

---

## Ask 3 — `text-admin-label`: measured **gone** at 8.0.0, with zero live consumers — is the retirement intended?

**The banked row (MG-β)** recorded `text-admin-label` as a real `@utility` at 4.0.0, **absent from producer 7.0.0's 25-name roster**, surviving only as a `class-names.ts:84` regex-allowlist entry, and therefore *"on a collision course with banked AA-15's cure."*

**Re-measured at the adopted pin, four ways, and the collision premise is GONE:**

| where | ⟨cmd⟩ | result |
|---|---|---|
| your published dist | `/usr/bin/grep -rn 'text-admin-label' /Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/glass-ui/dist/ \| /usr/bin/wc -l` | **0** — *including the `class-names` chunk; the allowlist residue is gone with it* |
| your source tree (read-only) | `/usr/bin/grep -rn 'text-admin-label' /Users/mkbabb/Programming/glass-ui/src \| /usr/bin/wc -l` | **0** |
| fourier's app | `/usr/bin/grep -rn 'text-admin-label' /Users/mkbabb/Programming/fourier-analysis/web/src/ \| /usr/bin/wc -l` | **0** |
| value.js's demo + library | `/usr/bin/grep -rn 'text-admin-label' /Users/mkbabb/Programming/value.js/demo /Users/mkbabb/Programming/value.js/src \| /usr/bin/wc -l` | **0** |

**So the ask is a confirmation, not a rescue.** **(a)** Was the utility's retirement deliberate, and **(b)** if a consumer still wants that semantic, what is the successor — a variant, a token, or "author it locally"? **We are explicitly NOT asking you to re-mint a retired utility**: asking a producer to restore what it retired inverts the glass-ui-first law this relay exists to uphold. **If the answer is "retired, author locally", that closes it from our side** and the banked `AA-15` cure loses a collision it no longer has.

---

## What this letter does NOT do

| item | reason |
|---|---|
| patch, shim or re-implement any producer surface in a consumer | **the standing law.** Producer rows ride SS-6; they never become frontend hacks |
| write any glass-ui byte, including a mirror copy of this letter | glass-ui is **READ-ONLY to this seat, always**. Delivery is the X formation mail seat's act |
| ask for a new export, a restored utility, or a changed token value | Ask 1 asks for **intent**; Ask 2 asks for **bookkeeping**; Ask 3 asks for **confirmation**. None asks for a cut |
| re-open R-ii | it is **recorded** at `docs/tranches/X/fourier/RULINGS-F.W2.md` §2 with both conditions escalated and intact; your answers **discharge the conditions**, they do not re-litigate the ruling |
| carry a 4.0.0 figure as current | every superseded figure above is **named as superseded** (`80 → 70` subpaths; the `hsl(35 70% 42%)` premise; the two contrast third-digits) and none is averaged |
| answer SS-13 from a transcript | the serialization question is **UNPROVEN-NEEDS-LIVE** and stays open under binding probe parsimony until it is measured live or you answer it |

---

## What we ask back

1. **Row this letter** in the BK coordination ledger.
2. **Reply by ask number** (`Ask 1` · `Ask 2` · `Ask 3`), and within Ask 1 by sub-item `(a)`/`(b)`/`(c)`.
3. **Ask 1 is the only one with a consumer waiting on it**: a "not a supported seat" answer sends the fourier consumer to its already-specified fallback, and we would rather do that deliberately than discover it at a later cut.

---

*Sent by value.js tranche X · X·F · F.W2 unit `.d`, 2026-09-18, under the begin-word. Zero glass-ui bytes written by this seat; zero producer bytes written anywhere; zero consumer patches standing in for a producer answer.*
