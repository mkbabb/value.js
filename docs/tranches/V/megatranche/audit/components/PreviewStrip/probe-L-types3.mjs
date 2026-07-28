// CHALLENGE-L (PreviewStrip, pass 2) — the TOTAL cure test.
// Publish ONE distributive alias from src/color and use it in BOTH the
// library return position AND the demo's own annotations. Zero casts at both
// call shapes?
import ts from "/Users/mkbabb/Programming/value.js/node_modules/typescript/lib/typescript.js";
const ROOT = "/Users/mkbabb/Programming/value.js";
const TEXT = `
import type { AnyColor, Color, SpaceId, Result, ColorIssue } from "@mkbabb/value.js/color";

/* PROPOSED library addition, src/color — one distributive alias. */
type ColorIn<S extends SpaceId> = S extends SpaceId ? Color<S> : never;

declare function mix<S extends SpaceId>(a: AnyColor, b: AnyColor, t: number,
    o: { readonly space: S }): Result<ColorIn<S>, ColorIssue>;
declare function convert<S extends SpaceId>(c: AnyColor, s: S): Result<ColorIn<S>, ColorIssue>;

declare const A: AnyColor; declare const U: SpaceId;

// call-1 (generic S)   — sample.ts:75 / mixStage.ts:102 / palettes/mix.ts:35 shape
function generic<S extends SpaceId>(s: S): ColorIn<S> {
    const r = mix(A, A, 0.5, { space: s }); if (!r.ok) throw 0; return r.value;   // no cast
}
// call-2 (union S)     — useGradientCSS.ts:202 shape
function union(): AnyColor {
    const r = mix(A, A, 0.5, { space: U }); if (!r.ok) throw 0; return r.value;   // no cast
}
// call-3 (convert)     — picker-color.ts:116 shape
function conv<S extends SpaceId>(s: S): ColorIn<S> {
    const r = convert(A, s); if (!r.ok) throw 0; return r.value;                  // no cast
}
// call-4 — a ColorIn<S> must still be usable as an AnyColor (serialize/paint)
function paint<S extends SpaceId>(c: ColorIn<S>): AnyColor { return c; }
export { generic, union, conv, paint };
`;
const opts = { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler, strict: true,
  verbatimModuleSyntax: true, noEmit: true, skipLibCheck: true };
const fake = ROOT + "/demo/__probe3__.ts";
const host = ts.createCompilerHost(opts);
const g = host.getSourceFile.bind(host);
host.getSourceFile = (f, lv, ...r) => f === fake ? ts.createSourceFile(f, TEXT, lv, true, ts.ScriptKind.TS) : g(f, lv, ...r);
host.fileExists = ((o) => (f) => f === fake || o(f))(host.fileExists.bind(host));
host.readFile = ((o) => (f) => (f === fake ? TEXT : o(f)))(host.readFile.bind(host));
const diags = ts.getPreEmitDiagnostics(ts.createProgram([fake], opts, host)).filter((d) => d.file?.fileName === fake);
console.log(`### TOTAL CURE (one distributive alias, 4 call shapes, ZERO casts) -> ${diags.length} error(s)`);
for (const d of diags) {
  const { line } = d.file.getLineAndCharacterOfPosition(d.start);
  console.log(`   line ${line + 1}: TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, " ").slice(0, 200)}`);
}
