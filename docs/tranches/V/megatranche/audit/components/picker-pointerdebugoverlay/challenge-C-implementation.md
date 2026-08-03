# CHALLENGE-C — `PointerDebugOverlay.vue` implementation audit

Source `demo/picker/visual/PointerDebugOverlay.vue`, lines 1–286, SHA-256 `5529d0384c46234b0e1c09cb1f81a99f12deb6f6d3ee9ba08ae4d6cfa9c56a27`. Static source inspection only.

**Verdict: SOURCE-RED.** Copy/export and disclosure paths can report success falsely, leak timers, or crash outside the expected provider/browser environment.

## Findings

1. `inject(POINTER_DEBUG_KEY)!` has no runtime guard.
2. `aria-controls=debug-body` references no ID.
3. The clipboard fallback ignores the boolean result of `document.execCommand("copy")` and sets `copied=true` even when copying fails.
4. Both success paths schedule anonymous timers without retaining/clearing them on repeated copy or unmount; an older timer can hide a newer success.
5. The temporary textarea removal is not protected by `finally`; an exception after append can leave residue.
6. `navigator`, `screen`, `devicePixelRatio`, and `document` are dereferenced inside `buildExportJSON`/`copyJSON`. Module import itself is safe, but invoking export outside a browser is not guarded.
7. Export maps and stringifies synchronously, so ordinary reactive updates cannot interleave mid-build. The real gap is that the resulting JSON has no schema version or snapshot identity.
8. Action buttons omit `type="button"`; if later rendered inside a form portal context, default submit behavior is possible.

Required closure includes provider absence, non-browser invocation, clipboard allow/deny/fallback false/throw, repeated copy, unmount, focus after collapse, no-form-submit, and exact versioned snapshot equality.
