// CHALLENGE-L (PreviewStrip, pass 2) — is the `as unknown as` at
// picker-color.ts:116 (and the `as` at sample.ts:82, on the exact path that
// produces every stop PreviewStrip paints) FORCED by the library's published
// types, or MANUFACTURED by the demo's duplicate of `Color<S>`?
//
// Variant A = the demo as shipped:  PickerColorIn<S> = Extract<AnyColor,{space:S}>
// Variant B = the library's own type: PickerColorIn<S> = Color<S>
// Both compiled with NO casts.  Diagnostics decide.
import ts from "/Users/mkbabb/Programming/value.js/node_modules/typescript/lib/typescript.js";

const HEADER = `
import type { AnyColor, Color, SpaceId, Result, ColorIssue } from "@mkbabb/value.js/color";
import { convertColor, mixColors } from "@mkbabb/value.js/color";
`;
const VARIANT = {
    // exactly demo/color-session/picker-color.ts:37
    A_demo_Extract: `type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;`,
    B_library_Color: `type PickerColorIn<S extends SpaceId> = Color<S>;`,
};
// the two demo call sites, with their casts REMOVED
const BODY = `
function valueOrThrow<T, E extends Readonly<{ code: string }>>(r: Result<T, E>): T {
    if (r.ok) return r.value; throw new Error(r.error.code);
}
// picker-color.ts:116  (shipped: \`as unknown as PickerColorIn<S>\`)
export function convertPickerColor<S extends SpaceId>(color: AnyColor, space: S): PickerColorIn<S> {
    return valueOrThrow(convertColor(color, space));
}
// sample.ts:82  (shipped: \`result.value as PickerColorIn<typeof space>\`)
export function sampleOne<S extends SpaceId>(a: AnyColor, b: AnyColor, t: number, space: S): PickerColorIn<S> {
    const result = mixColors(a, b, t, { space });
    if (!result.ok) throw new Error(result.error.code);
    return result.value;
}
`;

const ROOT = "/Users/mkbabb/Programming/value.js";
const opts = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true, verbatimModuleSyntax: true, noEmit: true, skipLibCheck: true,
    exactOptionalPropertyTypes: true, noUncheckedIndexedAccess: true,
};
for (const [name, decl] of Object.entries(VARIANT)) {
    const text = HEADER + decl + BODY;
    const fake = ROOT + "/demo/__probe__.ts";
    const host = ts.createCompilerHost(opts);
    const getSF = host.getSourceFile.bind(host);
    host.getSourceFile = (f, lv, ...rest) =>
        f === fake ? ts.createSourceFile(f, text, lv, true, ts.ScriptKind.TS) : getSF(f, lv, ...rest);
    host.fileExists = ((orig) => (f) => f === fake || orig(f))(host.fileExists.bind(host));
    host.readFile = ((orig) => (f) => (f === fake ? text : orig(f)))(host.readFile.bind(host));
    const program = ts.createProgram([fake], opts, host);
    const diags = ts.getPreEmitDiagnostics(program).filter((d) => d.file?.fileName === fake);
    console.log(`\n### ${name}   (casts removed)  ->  ${diags.length} error(s)`);
    for (const d of diags) {
        const { line } = d.file.getLineAndCharacterOfPosition(d.start);
        console.log(`   line ${line + 1}: TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, " ").slice(0, 190)}`);
    }
}
