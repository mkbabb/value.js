SERVED MODEL: claude-opus-5[1m]

# X.W1.b · THE DENOMINATOR — what the matrix photographs, and why exactly that

**Unit**: X.W1.b · **Date**: 2026-09-17 · **Substrate**: `tranche-u` @ `f62bf82b`
**Gates**: G-8 · NG-11 · **Law**: L-19 denominator discipline · R34 · R35

---

## 1 · What was wrong, measured at the bytes

Every visual matrix this repository has shipped ran a five-route SAMPLE and
reported it as coverage.

⟨`for d in docs/tranches/V/megatranche/audit/visual/shots/*/; do printf "%s: %s\n" "$(basename $d)" "$(ls $d/*.png 2>/dev/null | wc -l | tr -d ' ')"; done`⟩

```
forced-colors-desktop: 5      keyboard-focus-desktop: 5
reduced-motion-desktop: 5     rtl-desktop: 6
rtl-mobile: 5                 zoom-200-desktop: 5
safari-desktop-dark: 15       safari-desktop-light: 15
safari-mobile-dark: 15        safari-mobile-light: 15
```

⟨`ls docs/tranches/V/megatranche/audit/visual/shots/forced-colors-desktop/`⟩

```
adminusers.png  blob.png  browse.png  gradient.png  picker.png
```

**SIX modality arms, the same five routes in each.** R34's roll-call is confirmed
at the bytes: `extract`, `mix`, `generate`, `atmosphere`, `palettes`,
`admin-names`, `admin-audit`, `admin-flagged`, `admin-tags` appear in none of
them, and `about` appears in none of them *and cannot* — About is not a route.
It is `picker`'s RIGHT PANE (`demo/shell/viewSchema.ts`, `VIEW_MAP.picker.right
=== "about"`), so a route matrix is structurally incapable of reaching it
(R34 ⟨Katex R6⟩).

R34's CURE-SHAPE LOCK, verbatim: *"the visual/oracle re-gate must run modality
matrices **against the route census, not a 5-route sample**."*

### Provenance note — where the sample's proof actually lives

`docs/tranches/V/megatranche/audit/visual/capture.mjs` + `REPORT.json` are this
unit's declared read/execute INPUT (fold §3 entry 36: *"the 60/92-shot matrix and
its six state arms are X.W1.b's INPUT and its denominator's proof; W1.b's goldens
supersede but must first read what the sample was"*). Read at this clock:

⟨`node -e "const r=require('./REPORT.json'); …"`⟩ → `captures: number` ·
`results: 0 rows` · `shaCoverage: {"PASS":true,"shots":0,"note":"vacuous — zero
shots. Green without a per-shot sha256 FAILS (G-KFW9-2)."}`
⟨same for `STATES.json`⟩ → `rows: 0`; every `stateMatrices` entry reads
`"state":"UNMEASURED"`.

**Both JSON reports were re-authored to a zero-row state at the X.KF.W9 `.a`
carve** and now carry cell rosters and UNMEASURED declarations rather than
capture rows. So the JSON could not supply the denominator's proof, and this
unit did not pretend it did: the five-route sample is proved from the `shots/`
DIRECTORY, by the two `ls`/count commands above, which are the surviving
artefact. Recorded because reading an input and finding it empty is a finding,
and quoting a 60/92-shot figure from a file that now reads `shots: 0` would have
been the exact false citation this register exists to prevent.

---

## 2 · The census

`demo/color-picker/router/index.ts` declares **14** named routes.
`demo/shell/viewSchema.ts` declares **14** `ViewId` members. They agree, and
`e2e/visual/census-parity.spec.ts` asserts they agree with `e2e/visual/census.ts`
by re-deriving both from the product's source TEXT on every run. That spec is
NG-11's falsifier standing: *"Add a route/pane to the app without a matrix cell →
the census reds."*

| id | path | left pane | right pane | admin | mobile default pane |
|---|---|---|---|---|---|
| picker | `/#/` | color-picker | **about** | – | 0 |
| palettes | `/#/palettes` | color-picker | palettes | – | 1 |
| browse | `/#/browse` | browse | palettes | – | 0 |
| extract | `/#/extract` | extract | palettes | – | 0 |
| mix | `/#/mix` | color-picker | **mix** | – | 1 |
| generate | `/#/generate` | generate | palettes | – | 0 |
| gradient | `/#/gradient` | gradient | palettes | – | 0 |
| atmosphere | `/#/atmosphere` | atmosphere | *(none)* | – | 0 |
| blob | `/#/blob` | color-picker | **blob** | – | 0 |
| admin-users | `/#/admin/users` | admin-users | palettes | ✓ | 0 |
| admin-names | `/#/admin/names` | admin-names | palettes | ✓ | 0 |
| admin-audit | `/#/admin/audit` | admin-audit | palettes | ✓ | 0 |
| admin-flagged | `/#/admin/flagged` | admin-flagged | palettes | ✓ | 0 |
| admin-tags | `/#/admin/tags` | admin-tags | palettes | ✓ | 0 |

Every `path` carries `/#/`. The demo is a hash router
(`createWebHashHistory`), and bare-path navigation renders the DEFAULT view with
the path intact — a trap this repo sprang once and wrote down: *"a visual audit
that captures the same pane N times is worse than no audit: it reads green."*

---

## 3 · The axes, and why each one is a product-consumer axis

L-19 is not relaxed to widen the denominator; it is the reason the denominator
has the shape it has. Each axis below is a thing a real user varies.

| axis | members | why a consumer reaches it |
|---|---|---|
| ROUTE | the 14 above | the router serves them |
| VIEWPORT | 390 · 1024 · 3440 | the three W1.md §X.W1.b names |
| SCHEME | light · dark | `useGlobalDark` ships both |
| **PANE** | **mobile only** | at 390 the shell renders ONE pane; the sibling is reached by tapping the segmented control |
| MODALITY | 6 arms | forced-colors, reduced-motion, RTL, 200% zoom and keyboard focus are user settings, not test conditions |

**The PANE axis is the R34 cure, not a cross-product.** At 1024 and 3440 both
panes render side by side, so one frame witnesses both and NO second cell is
minted. At 390 only one renders, so About, Mix, Blob and the Palettes pane are
invisible unless the sibling gets its own frame. `census-parity.spec.ts` asserts
exactly this shape: a dual-pane route must mint `[0, 1]` at 390 and a single-pane
route must mint `[0]`.

**The modality arms run at ONE scheme (light).** The light/dark axis is exhausted
by the 110 at-rest cells, and what a modality arm adds is the modality's effect
on layout and affordance — which is not scheme-dependent, and under forced-colors
the app's own colours are overridden outright, so a second scheme would be two
names for one frame. R34's defect was the ROUTE axis; the route axis here is
complete. L-19 forbids minting a cell that carries no consumer information, and
this is that rule applied.

---

## 4 · The non-route arms (R35)

Surfaces the matrix cannot reach by URL at all. Each names the record that asked.

| arm | subject | record |
|---|---|---|
| `seeded-storage` | populated `/#/palettes` (1024 light/dark, 390 light) | A-30 · U-9 ≡ SH-28 ≡ A-3 |
| `seeded-fixture` | browse mid-fetch, via the EXISTING `routeBrowsePalettesDelayed` | PCS-11 / K-8 |
| `seeded-admin` | populated `admin-names`, via the EXISTING `adminPopulatedTest` | AdminNamesPanel residue 2 |
| `overlay` | dock view-select open (light/dark) | A-32 · MCP-9 |
| `forced-state` | the API-availability `unavailable` latch | DSL-2 |
| `param-sweep` | `#/?space=…&color=…` × 3 spaces | CNL-5 · R37 residue 9/D-4 |

**The at-rest arm carries no API fixture, on purpose.** `visual.config.ts` points
`VITE_API_URL` at the same-origin dev server (inv-K-5), which serves the SPA and
not the API, so the commons-backed surfaces photograph their EMPTY face. A golden
that depends on a live backend reds when the backend moves, and a gate that reds
for reasons outside the change under test is a gate someone turns off. The
populated faces are the business of the seeded arms above, and the whole reading
is `../instrument-caveats.md` IC-14.

Two of these consume fixtures **that already existed and that the visual matrix
had never once used** — which is PCS-11/K-8's finding verbatim: *"the real gap is
that the VISUAL matrix never consumes the fixture."* Nothing was re-authored to
serve them; L-9's "the matrix needs a fetch-delay shim" stays KILLED as
prescribed.

What these arms do NOT reach is named in `../instrument-caveats.md` IC-10 and
carried in `R54-RESIDUE-WITNESS.md` — R54's rule is that a cell is discharged by
a labelled frame *"or it is carried forward still open. Silence at close is not
discharge."*

---

## 5 · The counts

Derived, never typed: `routeArmCellCount()` in `e2e/visual/census.ts` recomputes
the route arm from the axes, and `census-parity.spec.ts` asserts the recomputation
rather than a literal — a hard number in a test is a number somebody updates to
match a shrinking matrix.

| arm | cells |
|---|---|
| at-rest, 9 public routes | 70 |
| at-rest, 5 admin routes | 40 |
| **route arm total** | **110** |
| 6 modality arms × 14 routes | 84 |
| non-route arms (3 seeded-storage · 2 seeded-fixture · 2 seeded-admin · 2 overlay · 1 forced-state · 3 param-sweep) | 13 |
| **GOLDEN TOTAL** | **207** |
| `census-parity.spec.ts` guards (mint no golden) | 5 |
| `golden-integrity.spec.ts` guards (mint no golden) | 3 |
| `substrate-integrity.spec.ts` guards (mint no golden) | 2 |
| **suite total** | **217** |

⟨`npx playwright test -c e2e/visual/visual.config.ts --list`⟩ → `Total: 217 tests in 8 files`

The ten non-minting tests are the matrix's own guards, counted apart from the
207 because they photograph nothing:

- **five** assert that `census.ts` still equals what the product's source
  declares (NG-11) — add a route without a cell and the denominator reds;
- **three** assert that every committed golden still hashes to its manifest
  digest, that no golden exists which the manifest does not record (the one-pixel
  clause, and FM-12's shape one directory further in), and that **no committed
  golden is a single flat colour** — the first mint of this matrix shipped two
  that were, and `FIRST-MINT-VERIFICATION.md` is the record of how they were
  found;
- **two** assert the SUBSTRATE: that the dev-misconfig lamp is dark and that no
  request leaves the page origin. Those two exist because the first full mint of
  this matrix ran against a leftover dev server with no `VITE_API_URL` and minted
  205 goldens of a MISCONFIGURED app — 210 tests green, every cell wrong. See
  `../instrument-caveats.md` IC-13.

Against the shipped denominator: the six modality arms held **31** frames between
them (5 + 5 + 5 + 6 + 5 + 5) and reported coverage.

The authoritative per-file record — every golden's name, byte size and sha256,
with the live-read renderer string — is `MANIFEST.json`, generated from the
settled bytes by `scripts/visual/regenerate-goldens.mjs`.
