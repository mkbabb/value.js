SERVED MODEL: claude-opus-5-5

# KF.W13V.y — scene editor design note (OA-49 · OA-51)

**Authority**: KF-W13.md OA-49 (§0bz) · OA-51 (§0ce); `demo/DESIGN.md` §§1–3, 5, 7–8 (read whole, cited, not restated); glass `DESIGN.md:385-391` radius canon (the installed 10.0.1 dist: `--radius-field: var(--radius-2xl)`). **Frontier**: kf `3b5f483d` (after `.s` + `.c`). **Canonical scene row**: `.s`'s (KF-W13V.md, `.s` act 2) — unchanged by this note: the stage holds the subject only; Controls · Keyframes · Timeline · the facet are dock items opening ONE shared pane.

This note is the design law for `.y`'s product bytes; every cure below cites a clause (N-1 … N-6). It is written before any product byte (G-W13V-y1).

## N-1 Surfaces — what lives where

| surface | holds | never holds |
|---|---|---|
| **Stage** (the scene host) | the subject + its own direct-manipulation handle (Spring's rail, Square's drag, Sequence's re-time handles — ESC-s-1 stays `.s`'s), the §3 specimen head (title · ONE primary readout · status badge), one plain-words verb line (§7) | an editor, a preset picker, a second competing readout, a code identifier in prose |
| **Controls** (dock item) | the channel's timing rows (`.c`'s idiom, landed) | the scene's physics/curve params |
| **Keyframes** (dock item) | the one shared keyframes editor | — |
| **Timeline** (dock item) | the one shared timeline | — |
| **Facet** (Physics / Curve) | the scene's own parameters (param rows), its presets (one tile group), its figure(s) (parameter space), one action | a keyframes editor (retired at `.s`), inline sliders inside presets |

Figures that describe the SUBJECT's motion (Spring's sampled `linear()` trace, the timing-function sweep) stay on the stage as part of the subject specimen; figures that are an EDITOR (the parameter-space field, which writes the params) live in the facet.

## N-2 The control idiom — one row grammar in every pane

- **Param row** (a continuous parameter): ONE line = the glass `Label` (body voice, `text-small`, the field register `.c` set) on the left and the live value on the right (mono-as-data, `text-mono-caption tabular-nums`, with its unit in plain words: `0.50 s`, `ζ 0.86`, `1200 ms`); the glass `Slider` beneath, full width, sharing the label's inline edge. The value is the readout; the slider never carries a second one.
- **Discrete row** (select / input / switch): `.c`'s landed `.labeled-field-grid` row — label track + value track on one line.
- **Groups** are separated by the glass `Separator` (params | presets | figure | action) — never by a card-in-card.
- **Thumb**: glass 10.0.1 ships `scrubber` (no visible thumb, by recipe) and `spectrum` (a colour recipe). A thumbed parameter slider is a producer row — **SLIDER-THUMB** (R-c-2) — carried honest-RED, routed by id at the relay-holding seat; the demo paints no thumb and never borrows `spectrum`.
- **Presets** are ONE glass `ToggleGroup` of **tiles** on `--radius-field` (16 px): the tile is a name + one mono line of its parameters (`0.5 s · ζ 0.86`) — no inner rail, ball or mini-slider (OA-51); the active tile keeps the dashed violet-authority outline (§2). Selection model, roving focus and `aria-pressed` stay the producer's.

## N-3 Type scale (glass rungs only; §1 voices)

| role | rung | voice |
|---|---|---|
| scene title (stage) | `text-display` | Instrument Serif — a plain-words name (`Spring`, never a class name like `SpringProgress`) |
| primary readout (stage) | `.spring-readout-primary`/`readout-accent` at the display rung's companion | mono tabular, violet authority — exactly ONE per stage |
| secondary readouts (stage) | `text-mono-caption`, `text-muted-foreground` | mono, never violet (they must not compete) |
| figure title | `text-small font-medium`, one line (`whitespace-nowrap`) | body |
| figure legend / axis labels / ticks | `text-caption`, `text-muted-foreground`, one line each | body (numbers tabular) |
| param label | `text-small` (glass `Label`) | body |
| param value | `text-mono-caption tabular-nums` | mono |
| preset tile | name `text-small`, params `text-mono-caption` | body + mono |
| verb line | `text-small text-muted-foreground` | body, plain words — no `code-token` identifiers |

## N-4 Radius canon (glass `DESIGN.md:385-391`)

- Single-line controls (badge, chip, segmented stadium, button): `--radius-pill` / `rounded-full` lawful.
- **Anything that can hold more than one line** — preset tiles, specimen tiles, a card, a figure plot: `--radius-field` (16 px) for selectable multi-line holders; `--radius-card` for cards; `--radius-media` for a plot/thumbnail frame.
- Glyph marks (dots, pips, swatches, a 2-px playhead line) carry no text and are not holders — their pill radius stands.
- Gate reading (G-W13V-y3): on the served page, 0 elements whose computed radius is a stadium (≥ half the box height, or ≥ 999 px) AND whose text lays out on more than one line.

## N-5 Figures

A figure has exactly: **one title line** (no wrap; the live value it plots is NOT restated if a param row already shows it), the plot, **axis labels** on the caption rung (x: quantity + unit; y: quantity), and **one legend line** (swatch + one short sentence, `whitespace-nowrap`, truncated with the full text in `title` only if the pane is narrower than the line). Region annotations inside the plot are caption rung.

## N-6 The stage specimen (§3 order, OA-51)

Title (plain words) → ONE primary readout (violet) → status badge → ONE verb line in plain words. Every other number on the stage is a muted caption or leaves the stage. The verb line names what to do and where, in words: "Tap or drag the rail — the ball springs to the new target. Tune response and damping in the Physics pane."

## Per scene — hierarchy, composition, subject vs editor (BEFORE read on the served page, kf `3b5f483d`; frames `before/`)

| scene | subject (stage) | editor (pane) | BEFORE defects (served, 1440 light) | cure (clause) |
|---|---|---|---|---|
| **Spring** | the ball on its rail + the timing-function sweep + the sampled `linear()` trace (the subject's motion, described) | Physics facet: response + damping params, the parameter-space field, four presets, "Write physics to keyframes" | title is a class name (`SpringProgress`); THREE violet readouts compete (`x 0.000` · sweep `0.000` · trace `ζ 0.86 · peak 1.005`) + `v 0.00`; the verb line names code identifiers (`response / dampingFraction`) and wraps; the sweep row is titled `springTimingFunction sweep`; facet: the two sliders are bars with no value; the figure title wraps to 2 lines and restates the params; the legend wraps to 3 lines; presets are stadium pills each holding an inert mini-slider; "Gentle" lays out on one row, the rest on two; the facet overflows the bounded rail (R-c-1) | title `Spring`; one violet readout (position); velocity/sweep/trace numbers muted captions (N-3, N-6); verb line in plain words (N-6); sweep titled `Timing-function sweep`, trace titled `Sampled curve · linear()` → `Sampled curve` + legend line (N-5); facet param rows with values (N-2); figure: one title line `Peak overshoot`, y axis label `damping ζ`, one legend line (N-5); presets = tiles on `--radius-field`, name + one params line, no track (N-2, N-4) |
| **Easing** | the specimen gallery race (every named curve racing; the selected one is the scene's easing) — the gallery IS the subject and its selection model | Curve facet: glass `EasingPicker` + the duration param | specimen tiles are stadium pills (the producer ToggleGroup item radius) holding 2 lines (sparkline + a name that wraps: `ease-in-out-quad` → 2 lines); duration slider has no value | tiles on `--radius-field` (N-4); the name one line (`nowrap`, tracking normal, ellipsis + full name in `title`) (N-4); the duration param row with its value `1200 ms` (N-2) |
| **Sequence** | the staggered storyboard (rows racing on the master clock) + its re-time handles (ESC-s-1 stays `.s`'s — no pane seat exists) | none (every item honestly disabled) | TWO clock readouts compete (header `CLOCK 0 ms` violet + footer `MASTER CLOCK 0.000` violet); row labels wrap (`1` / `@0ms` on two lines) | one primary readout (the header clock); the scrubber's readout muted (N-6); row label one line `1 · 0 ms` (N-3) |
| **Square** | the square + its drag | Controls (`.c`'s rows) | the `SETTLED` badge stretches to the header column's width (a stadium bar, not a badge) | the badge sized to its word (`self-start`) (N-4) |
| **Cube · Amiga** | the canvas subject (§8) | Controls (`.c`'s rows) | conform: stage = subject; pane = `.c`'s idiom | read, no bytes (the y3/y5 probes read them) |

## Mocks (from the served page)

`mocks/mock-<scene>-<view>-<vp>-light.png` — the served page at kf `3b5f483d` with this note's rules applied in the page (a prototype stylesheet + copy swap injected by `mocks.mjs`; no product byte), 1440×900 and 390×844: Spring pane + stage, Easing stage + pane, Sequence stage. They show the target composition; the product bytes land it at the root.
