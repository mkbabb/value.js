# W1b — LOCAL + prod capture addendum (per user: "test local versions too")

Captures in `local/`. Playwright reaches localhost fine (the FI-VPN NXDOMAIN issue is prod-only; local sidesteps it). 8 of 10 apps captured live; speedtest (slow sibling `build:watch`) + words (heavy multi-stage Docker build) deferred to code-grounding in the re-audit.

| App | Local | Prod | Grounded findings (new) |
|---|---|---|---|
| **value.js** | :9001 ✓ | color.babb.dev ✓ | C1/C2/C3 mechanism (prior W1-FINDINGS) — regression is SHIPPED |
| **glass-ui** | :5210 ✓ | (library) | **aurora story ships named `OklchStop[]` presets — "Sky/Dawn/Meadow/Deliberate/Day 9/OK Impasto"** + a live configurator (RIGHT). value.js's broken default IS the static "Sky" preset → C2 fix = feed a `deriveAurora(activeColor)` palette, not the renderer. **Dock story is clean** (collapsible/media/select/popover, smooth per-property) → value.js C1 jank is its OUTER wrapper, not the component. |
| **slides** | :5220 ✓ | slides.friday.institute (VPN) | home = clean editorial (red TIL eyebrow, serif "Slides", warm paper, deck card). Deck desktop polished (executive-briefing title, red-dot pager, constellation bg). **Mobile 390px CONFIRMS R31: deck is a ~0.29-scale 16:9 letterbox in a sea of empty space — desktop slide scaled, not reflowed.** |
| **bbnf-buddy** | :5230 ✓ | (local-only) | holographic rainbow procedural "b" mascot (IDLE state), glass bottom dock (Idle/pose/pause/download/panel). Editor panels collapsed in default view. |
| **muster** | :5176 ✓ | (local-only) | **configurator stage\|aside, controls RIGHT** (InstrumentAside: origins/signals/sliders); winner-hero "Saffron Cary" + MetricCell scoring; FirstRunWalk onboarding modal; warm-peach aurora. 1 console error. |
| **fourier** | (dev.sh) | fourier.babb.dev ✓ | controls = configurator-aside RIGHT; CSP blocks data: KaTeX fonts + CF beacon; CM preload crossorigin (prior W1). |
| **keyframes.js** | (vite) | keyframes.babb.dev ✓ | playful serif-display cube demo + dual dock (prior W1). |
| **sudoku** | (npm :3000) | sudoku.babb.dev ✓ | **hand-drawn "pencil-boil" aesthetic** (wavy ink grid, serif title), controls card RIGHT (SIZE/DIFFICULTY), shared orange-sun mascot (w/ fourier), `@mkbabb/pencil-boil` skin (shared w/ bbnf). keyframes.js 2.0.0 STALE; value.js ^0.5.0 spec stale; uses reka-ui not glass-ui (aesthetic-intentional). |
| **speedtest** | dev.sh (slow) | speedtest.friday.institute (VPN) | code-grounded (dial CLS 0.3228, VT leaks — W3). |
| **words** | Docker (heavy) | mbabb.friday.institute/words (VPN) | code-grounded (SW-rot, timid palette, Fraunces — W2/W3). |

## The reinforced meta-finding — configurator-aside-RIGHT is constellation-wide
**Four** apps put controls in a RIGHT aside: **fourier · muster · sudoku · speedtest**. The user's "fourier controls → LEFT" mandate is the sharp edge of a shared layout the whole constellation should reconsider. **One fix serves all: a glass-ui `Configurator` `asideSide:'left'|'right'` variant** (glass-ui owns `primitives/configurator`). Each app adopts; no per-app hack.

## Shared aesthetic families (candidate glass-ui homes)
- **pencil-boil hand-drawn skin** (`@mkbabb/pencil-boil`): sudoku + bbnf-buddy + the shared orange-sun mascot (also fourier). A cross-cutting animation/skin family — owner question: stays `pencil-boil`, or a glass-ui `paper/ink` primitive family?
- **aurora atmosphere**: glass-ui Aurora consumed by value.js (sky, broken) + muster (warm-peach, working) + speedtest (gauge). The `deriveAurora` producer serves all.
- **glass dock**: glass-ui Dock consumed by value.js, keyframes, bbnf, muster, slides — value.js's wrapper is the outlier with `transition:all`.
