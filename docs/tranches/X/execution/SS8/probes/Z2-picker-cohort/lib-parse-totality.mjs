// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 — ColorInput L-1 (BLOCKER) library witness: does the shipped parser THROW on degenerate bodies?
// Run: guarded --light -- node lib-parse-totality.mjs   (no browser)
const m = await import("/Users/mkbabb/Programming/value.js/dist/subpaths/css.js");
const out = [];
for (const s of ["oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hsl(  )", "oklch(", ")", "notacolor", "oklch(0.7 0.1 200)"]) {
    try { const r = m.parseCssColor(s); out.push({ s, threw: false, ok: r?.ok, diag: r?.ok ? undefined : JSON.stringify(r?.diagnostics ?? r?.error ?? null).slice(0, 90) }); }
    catch (e) { out.push({ s, threw: true, err: String(e).slice(0, 90) }); }
}
console.log(JSON.stringify(out, null, 1));
