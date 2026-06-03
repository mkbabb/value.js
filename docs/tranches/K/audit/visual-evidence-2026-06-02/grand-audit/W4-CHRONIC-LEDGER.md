# W4 — Constellation chronic-deferral ledger (last-10-tranche mine)

Consolidated from W0 per-repo dossiers (each agent read its repo's last 10 tranche FINAL/PROGRESS) + W1 live findings. **Discipline (no perpetual punt):** every chronic item gets a terminal disposition — **SHIP** (bind to a named wave) · **KILL** (drop, recorded) · **BOOK** (defer with trigger + owner). Age = # tranches the item has been carried.

## value.js (frontend K / api L)
| Item | Age | Disposition |
|---|---|---|
| Aurora derived-from-color (C2) | A→J **7+** | **SHIP K.W4** — W1 proved it (sky canvas overpaints palette-tinted body) |
| Blob-extirpation → glass-ui (C3) | A→J **7+** | **SHIP K.W3** — lift goo-blob to glass-ui Metaballs/BlobDot |
| 8 glass-ui primitive asks | A→I **6–7** | **SHIP K.W3** — collapse to ~4 net-new (W0: Tabs-underline/BlobDot/Metaballs already partial) |
| Dock `transition:all` jank (C1) | NEW (W1) | **SHIP K** motion lane — compositor-only transition |

## fourier-analysis (J)
| Item | Age | Disposition |
|---|---|---|
| Controls-side → LEFT (configurator-aside) | NEW (user) | **SHIP** — via glass-ui `Configurator asideSide` variant |
| P5 ConfiguratorLayer inner-rounding | I→J | **SHIP** (glass-ui-owned ADOPTION-ASK) |
| CSP blocks `data:` KaTeX/CM fonts + CF beacon | NEW (W1) | **SHIP** fourier CSP wave |
| C1 / VAL-9 | chronic | **KILL** (J.W0 terminal) |
| VAL-1 (aurora 2nd-consumer) | chronic | **BOOK** hard kill-date — value.js K.W4 is the 2nd consumer |
| CH-6 | chronic | **forced terminal** (J.W0) |
| e2e/axe CI evidence | I→J | **SHIP J.W6** (inv-27 proof) |

## glass-ui (AS — PRIMITIVE SOURCE)
| Item | Age | Disposition |
|---|---|---|
| DockIconButton 44px floor (S-2) | AQ→AP→AR **3** | **SHIP AS.W5** (lift to button; no 4th tranche) |
| deriveAurora / OKLab-LUT | AO→AR **3** / value.js 4 | **SHIP AS.W5** if ≥2 live adopters (value.js K.W4 = 2nd) |
| G4 scheduler.postTask priority | AQ→AR **2** | **SHIP AS.W3** |
| G1 container style-queries | AQ→AR **2** | **SHIP AS.W4** |
| G2 scroll-state → overflow-fade | AQ→AR **2** | **SHIP AS.W4** |
| GlassNativeSelect | AQ→AR **2** | **BOOK** demo-gated (muster declined; Limited Baseline) |
| **Blob/Metaball primitive** | NEW | **SHIP** — net-new (no storybook entry); value.js C3 lift |
| `Configurator asideSide` variant | NEW | **SHIP** — fourier controls-LEFT lever |

## speedtest (AT — friday.institute)
| Item | Age | Disposition |
|---|---|---|
| dial CLS 0.3228 | known | **SHIP AT-R1** (1-line @layer cascade fix) |
| VT ready/finished rejection leak | known | **SHIP AT-R2** (formal rejection handler) |
| keyframes/value.js/parse-that carve | Y→X→W chain | **BOOK** → L/v1.0 Phase 2 (vueuse SCC trap) |
| eager bundle overage (+2.5%) | Y→X→W | **BOOK** w/ trigger (consumer carve) |
| cred-consolidate | AP→AQ→AR→AS **4** | **SHIP or KILL** AT (4 tranches = terminal) |

## keyframes.js (A) · muster (K) · slides (B) · words (A) · bbnf-buddy · deploy
| Repo | Chronic/broken | Disposition |
|---|---|---|
| **keyframes.js** | CI-break `file:../glass-ui` seam · string-easing silent-linear footgun · 3 dup `.ready()` · reduced-motion partial · `scheduler.yield` absent in tick · tree-shaking ungated · README modern-web posture | **SHIP A.W1–W4** (already mapped) |
| **muster** | origin-editor Popover + delete-confirm (F→H) | **CLOSED I.W4** (resolved-chronic) |
| **muster** | CLS 0.0729>0.05 · clean-machine Lighthouse | **SHIP K.W3 / K.W2** |
| **slides** | mobile letterbox 0.29 · no glass-ui (~20 bespoke) · dock crowding <360 + dark contrast · unscoped `<style>` + 391 `#slide-NN` · no e2e harness | **SHIP B.W0–W5** (PLAN exists; augment) |
| **words** | SW-rot (Workbox) · no content-visibility (785-LOC vscroll) · INP/yieldToMain · no CSP/security-headers · timid palette · Fraunces axes | **SHIP A.W1–W3** |
| **bbnf-buddy** | glass-ui 2.0 STALE→3.1.1 · 2 pre-existing WASM test fails · playground/hero/IK roadmap | **BOOK** (no tranche dir; glass-ui bump = cross-cutting) |
| **deploy** | value.js **rsync outlier** (rsync→git-pull) · fourier DNS-tuple drift (color/keyframes UNVERIFIED) | **SHIP W6 deploy tranche** |

## Cross-repo chronic PATTERN (the meta-finding)
1. **The configurator-side layout** is contested in **3 repos** (fourier RIGHT→LEFT mandate · muster F's 4 approaches · speedtest dock re-founding) — resolve once in **glass-ui `Configurator`** (asideSide + the inner-rounding P5 fix), all three adopt.
2. **deriveAurora/OKLab-LUT** is the **single longest chronic** (glass-ui 3 + value.js 4 tranches) — K.W4 + AS.W5 finally give it ≥2 live consumers → ships.
3. **scheduler.yield / content-visibility / reduced-motion** recur across keyframes, words, fourier, value.js — a **modern-web baseline** every consumer adopts (W3 owner matrix).
4. **friday.institute reachability** (speedtest/slides/words VPN-gated) + **value.js rsync outlier** → the deploy tranche's spine.
