# CHALLENGE-D — `ConsoleRail.vue` design audit

## Receipt

Source `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, lines 1–329, SHA-256 `a37d644bfda320772782c72ccb67e8433a04a691ad9101f36467abcfd5b6e279`. Source-only tranche audit; runtime/Browser commands **0**.

**Verdict: CONDITIONAL / SOURCE-RED.** The rail has a deliberate identity—space-correct glyphs, a live-color active dot, roving focus, and touch sizing—but it does not yet prove comprehension, tab semantics, extreme color contrast, or complete mobile behavior.

## What is strong

- Channel glyphs respect each color space instead of stamping one notation everywhere.
- Arrow/Home/End navigation and roving tabindex are explicitly implemented.
- The active indicator separates “which channel” from live hue and derives foreground contrast from that hue.
- Touch targets grow below 1024 px and tooltip placement changes for narrow viewports.

## Findings

1. `role=tablist`/`role=tab` implies associated tabpanels, but no `aria-controls` or panel relationship exists. If selection merely scrolls a slider row, a radio/listbox or toolbar pattern may be more honest.
2. Single glyphs such as `C`, `h`, `a`, `b`, and `α` require tooltip discovery. The visible rail alone does not communicate units, ranges, or which color space is active.
3. When `active` is invalid rather than null, no tab receives `tabindex=0`; keyboard entry into the rail becomes uncertain.
4. The live-color dot can become visually dominant or noisy across rapid color changes; no reduced-motion/high-contrast/forced-colors design is stated.
5. Tooltips remain the primary explanation. Touch users do not have a persistent anatomy legend, and long localized descriptions are constrained to `max-w-56`.
6. The vertical chassis assumes enough height to distribute every channel. Dense spaces, landscape phones, and large text can compress or overflow it.

## Required Kronecker cells

Spaces × 1–5 channels × selected/null/invalid × dark/light/forced-colors × keyboard/touch/pointer × reduced-motion × phone portrait/landscape/desktop × short/long localized labels. The target gestalt is a scientific index rail: glyph, active color, and an optional persistent compact legend—not tooltip-only meaning.
