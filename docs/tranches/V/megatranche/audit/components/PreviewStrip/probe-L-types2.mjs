// CHALLENGE-L (PreviewStrip, pass 2) — WHERE does the cure belong?
// The demo casts at 4+ sites because `Color<S>` does not distribute when S is
// a runtime-chosen union member. Test three published-signature shapes for
// `mixColors` against the two real call shapes the demo uses.
//   call-1 (generic space):  sample.ts:75, mixStage.ts:102, palettes/mix.ts:35
//   call-2 (union space):    useGradientCSS.ts:202  (space is a `PickerSpace` VALUE)
import ts from "/Users/mkbabb/Programming/value.js/node_modules/typescript/lib/typescript.js";

const SIG = {
  "SHIPPED  Result<Color<S>>":
    `declare function mix<S extends SpaceId>(a: AnyColor, b: AnyColor, t: number, o: { readonly space: S }): Result<Color<S>, ColorIssue>;`,
  "CURE     Result<Extract<AnyColor,{space:S}>>":
    `declare function mix<S extends SpaceId>(a: AnyColor, b: AnyColor, t: number, o: { readonly space: S }): Result<Extract<AnyColor, { readonly space: S }>, ColorIssue>;`,
  "CURE-2   distributive alias  ColorIn<S> = S extends SpaceId ? Color<S> : never":
    `type ColorIn<S extends SpaceId> = S extends SpaceId ? Color<S> : never;
declare function mix<S extends SpaceId>(a: AnyColor, b: AnyColor, t: number, o: { readonly space: S }): Result<ColorIn<S>, ColorIssue>;`,
};
const BODY = `
declare const A: AnyColor; declare const U: SpaceId;
// call-1 — generic space parameter (the sampler shape)
function generic<S extends SpaceId>(s: S): Color<S> {
    const r = mix(A, A, 0.5, { space: s });
    if (!r.ok) throw 0;
    return r.value;            // no cast
}
// call-2 — a runtime union-typed space (useGradientCSS.ts:202 shape)
function union(): AnyColor {
    const r = mix(A, A, 0.5, { space: U });
    if (!r.ok) throw 0;
    return r.value;            // no cast — SHIPPED needs \`as AnyColor\`
}
export { generic, union };
`;
const HEADER = `import type { AnyColor, Color, SpaceId, Result, ColorIssue } from "@mkbabb/value.js/color";\n`;
const ROOT = "/Users/mkbabb/Programming/value.js";
const opts = { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler, strict: true,
  verbatimModuleSyntax: true, noEmit: true, skipLibCheck: true };
for (const [name, sig] of Object.entries(SIG)) {
  const text = HEADER + sig + BODY;
  const fake = ROOT + "/demo/__probe2__.ts";
  const host = ts.createCompilerHost(opts);
  const g = host.getSourceFile.bind(host);
  host.getSourceFile = (f, lv, ...r) => f === fake ? ts.createSourceFile(f, text, lv, true, ts.ScriptKind.TS) : g(f, lv, ...r);
  host.fileExists = ((o) => (f) => f === fake || o(f))(host.fileExists.bind(host));
  host.readFile = ((o) => (f) => (f === fake ? text : o(f)))(host.readFile.bind(host));
  const diags = ts.getPreEmitDiagnostics(ts.createProgram([fake], opts, host)).filter((d) => d.file?.fileName === fake);
  console.log(`\n### ${name}  ->  ${diags.length} error(s) with ZERO casts`);
  for (const d of diags) {
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    console.log(`   line ${line + 1}: TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, " ").slice(0, 150)}`);
  }
}
