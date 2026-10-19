SERVED MODEL: claude-opus-5-5

# O-63 — addendum beside O-59 (`X-ALL-BK-UI-AUDIT.md`): fourier's glass rows at F.W14 `.u`, plus three rows F.W14 found

**Date** 2026-09-23 · **From** value.js X·F (fourier-analysis), F.W14 unit `.u` · **To** glass-ui BL (via BK coordination) · **E-3**: O-59 is unchanged; this sits beside it.

## 1. The 74 fourier rows of O-59 stay routed by id, with no local override

fourier F.W14 `.u` dispositioned every `UIA-F-n` row of `audit/UI-AUDIT-fourier.md` (the record is `execution/C/F-W14.md` § F.W14.u).
- **48 pure-GLASS rows are ROUTED-GLASS under O-59, unchanged.** UIA-F-6 8 10 11 13 27 38 43 44 51 56 58 72 78 84 90 91 100 122 123 125 126 127 129 131 134 135 138 139 140 141 142 143 145 215 216 217 218 220 221 222 223 224 225 226 227 228 230.
- **26 split rows.** Their GLASS halves stay under O-59: UIA-F-41 48 57 60 77 80 85 88 94 105 106 107 124 128 130 132 133 136 137 144 146 147 148 149 219 229. fourier cures the consumer halves on its side. The record lists which consumer halves are cured and which are still open.
- **UIA-F-51 stays blocking.** The glass Toaster anchors to the top at 390 and covers the dock. I-44 recorded it as blocking at BL. fourier has no lawful escape, and there is **no local override**: the Toaster viewport is not restyled in fourier.
- fourier's runtime is glass **10.0.1** (F.W14 `.m`, `3c688d1`). Per §0cb R-5, the repin cures no row by credit. A row cured at glass HEAD still needs the landing repin before it reads as cured.

## 2. Three glass rows F.W14 found that are not in O-59

| id | component | observed (fourier at 10.0.1) | canon cite |
|---|---|---|---|
| **R-t-1** | table (`TableRow`, `TableHeader`) | `border-b` binds no border colour. There is no base `border-color` in glass or in the app, so the DataTable's row rules paint in `currentColor`: light `rgb(28,25,23)`, dark `rgb(233,230,226)`. The swept rows bind `--border`, `light-dark(hsl(32 26% 70%), hsl(30 16% 34%))`, so the table rule is ink-heavy beside them. (F.W14 `.t`, headless probe at 1440.) | `src/components/table/TableRow.vue:14`, `TableHeader.vue:11` |
| **BL-FW14H-1** | slider | There is no slim slider rung with a visible thumb and fill. fourier composes `spectrum md` (a 24 px track), which is heavier than a control-row rung should be. (F.W14 `.h`.) | slider README / DESIGN control rows |
| **BL-FW14H-2** | slider / labeled-field | There is no labelled slider with an inline value field. Label and value on one line with the slider beneath is fourier's `ui/SliderControl`, a local composition. (F.W14 `.h`.) | labeled-field, slider |

Each is **relay-only**. fourier does not patch the producer.
