> ARCHIVED 2026-07-17 — historical; superseded by W44 (content inlined). Read-only.

# Glass inbound — clipboard primitive: `copyToClipboard` cut, adopt `writeClipboard` (W17b)

**Date:** 2026-07-16
**From:** the glass-ui BI/P/Q execution session (team lead), Lane A
**Kind:** consumer-update addendum mark — fold into `ADDENDA.md` as the next V-A### at your
boundary; this file is the inbound record, not the row itself.
**Authority:** the BI.W-P024 gestalt ruling (A-f2), applied through the mandated twice-critique.
Standing law: named/ergonomic sugar is a consumer preset, not a library identity surface.

## What changed in Glass 7 (pre-publish, no released surface affected)

glass-ui removed the `copyToClipboard(text, { onCopyError }): Promise<boolean>` bare wrapper. The
stateless clipboard door is now `writeClipboard(text): Promise<CopyResult>`, the honest primitive
that already backed both `copyToClipboard` and `useClipboard` — it returns the discriminated result
instead of a lossy boolean, for identical call ergonomics.

```ts
export type CopyResult = { ok: true } | { ok: false; reason: "clipboard-api" | "no-api" };
export function writeClipboard(text: string): Promise<CopyResult>;
```

## Why (the twice-critique evidence)

- `copyToClipboard` had zero glass-internal consumers; its only references were its own definition,
  its self-justifying test, and a public-surface guard row — all three citing value.js demand as
  the reason to keep it. It is a lossy wrapper: it collapses `CopyResult` → `boolean` (discarding
  `reason`) and routes `reason` to an `onCopyError` callback that is dead ceremony on an awaited
  one-shot (the caller already holds the result the instant `await` resolves).
- The stateless-copy public door then had two owners (`writeClipboard` + `copyToClipboard`) over
  one write core — a one-owner-surface violation. Promoting the primitive satisfies the
  distinct-stateless-need argument AND the one-owner law at once.
- Evidence: glass `bi-addenda/reports/challenges/P024-26-f2-gestalt.md` §A (the ruling).

## What you update at W17b (value consumer refresh, ~15–19 demo call sites)

Update by call-site shape:

- **site ignores failure:** `const { ok } = await writeClipboard(text);`
- **site reports failure:** `const r = await writeClipboard(text); if (!r.ok) reportCopyFailure(r.reason);`
- **site shows confirmation/status UI:** adopt `useClipboard({ resetMs })` and drive off `status`
  (`idle | pending | success | failure`); it owns the reset timer, latest-attempt ownership,
  payload `invalidate()`, and disposal — delete any hand-rolled copy/timer machinery at the site.
- **if you want the exact old signature preserved across every site without touching each** — the
  sugar belongs here, in value.js's own util module (one local adapter):

```ts
// value.js local preset — the boolean+callback ergonomics glass no longer ships
import { writeClipboard } from "@mkbabb/glass-ui";
export const copyToClipboard = async (
    text: string,
    { onCopyError }: { onCopyError?: (reason: string) => void } = {},
): Promise<boolean> => {
    const r = await writeClipboard(text);
    if (!r.ok) onCopyError?.(r.reason);
    return r.ok;
};
```

The ~15 current sites (`demo/color-picker/App.vue`, `demo/@/composables/color/useColorPipeline.ts`,
`demo/@/composables/palette/usePaletteActions.ts`, the gradient/mix/generate/color-picker custom
components) then keep their existing `import { copyToClipboard } from "…/util"` shape with a
one-line source change. This is the recommended path: it localizes the preset and touches each site
minimally at your W17b boundary against immutable Glass 7.

## Boundary

No released Glass surface is affected — Glass 7 is unpublished. This changes only what the
W17b consumer refresh adopts. Do not consume glass-ui source or any rehearsal; adopt against the
immutable registry Glass 7 artifact when it publishes. No action is owed back to glass.
