// SERVED MODEL: claude-opus-5-5
// JUDGE COPY of route-ts-compiler/src/emit.ts (the SYNTHESIS arm): identical emission, plus (a) the
// stock-ASCII non-ASCII routing as an equivalence-PROOF option (ported from compile.ts), and (b) BUILD-TIME
// output — `moduleSource`, an ES module `createParser(A)` whose constants are literals and whose actions
// are `A[rule]` (no `new Function`, no grammar compile at first use). Every change is marked `JUDGE:`.
//
// route-ts-compiler · emit.ts — the SECOND backend: the same grammar facts and the same combinator
// semantics as `compile.ts`, STAGED — each rule (per mode) becomes one JavaScript FUNCTION whose body
// is its combinator tree unrolled: sequences are straight-line code, choices a `switch` on the routed
// first unit, leaves inline `charCodeAt`/sticky-regex tests, references DIRECT calls to the
// referenced rule's function. V8 then sees one monomorphic function per rule (its own feedback, its
// calls inlinable) instead of one shared closure body per combinator kind (megamorphic call sites).
// The emitted source is plain JS text: `new Function` at runtime here; the same text can be written
// to a module at BUILD time (no eval under a strict CSP; no grammar compile at first use).

import type { Expression, AST } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/vendor/bbnf-0.1.4/types.js";
import { analyzeGrammar, buildDispatchTable, buildPartialDispatchTable, computeFirstSets } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/vendor/bbnf-0.1.4/analysis/index.js"; // JUDGE: stock-ASCII proof
import type { Info } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/analysis.js";
import { analyzeFirst, routes } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/analysis.js";
import { singleClassRun } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/regex.js";
import type { Action, CompileOptions } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/compile.js";

type Mode = "v" | "r";
type Emitted = { rule(name: string): (s: string, i: number) => number; value(): unknown; source: string; moduleSource?: string };
type AotOptions = CompileOptions & { aot?: boolean; header?: string }; // JUDGE

export function emitGrammar(ast: AST, opts: AotOptions = {}): Emitted {
    const actions = opts.actions ?? new Map<string, Action>();
    const positional = opts.positional ?? (() => false);
    const { info, nodeInfo } = analyzeFirst(ast);
    // JUDGE: stock-ASCII routing (equivalence PROOF only) — compile.ts:55-63, verbatim in effect.
    const stock = opts.levers?.stockAsciiDispatch ? computeFirstSets(ast, analyzeGrammar(ast)) : null;
    function stockNonAscii(alts: Expression[]): number[] | null {
        if (stock === null || alts.length < 2) return null;
        if (buildDispatchTable(alts, stock.firstSets, stock.nullable)?.isPerfect) return [];
        const partial = buildPartialDispatchTable(alts, stock.firstSets, stock.nullable);
        return partial ? partial.fallbackIndices : null;
    }

    // Constants the emitted code closes over, hoisted as `const` bindings.
    const consts: unknown[] = [];
    const constName = (v: unknown): string => { consts.push(v); return `K${consts.length - 1}`; };
    const tmpN = { n: 0 };
    const tmp = (p: string) => `${p}${tmpN.n++}`;

    const aotActs: string[] = []; // JUDGE: action names bound as AK<i> in the aot module
    const fnName = new Map<string, string>(); // `${rule}/${mode}` → function name
    const queue: [string, Mode][] = [];
    const ruleFn = (name: string, mode: Mode): string => {
        if (!ast.has(name)) throw new Error(`undefined rule \`${name}\``);
        const key = `${name}/${mode}`;
        let f = fnName.get(key);
        if (f === undefined) { f = `r_${name.replace(/\W/g, "_")}_${mode}`; fnName.set(key, f); queue.push([name, mode]); }
        return f;
    };
    const helpers: string[] = [];

    /** A first-unit test of `c` against `inf` (true = may start). */
    const mayStart = (c: string, inf: Info): string => {
        const T = constName(inf.first.ascii);
        return `(${c} < 128 ? ${T}[${c}] === 1 : ${inf.first.nonAscii ? `${c} === ${c}` : "false"})`;
    };

    /** Emits code that sets `out` to the end offset (or -1) of `e` matched at `pos`. */
    function gen(e: Expression, mode: Mode, pos: string, out: string, rn: string): string {
        const keep = mode === "v";
        switch (e.type) {
            case "literal": {
                const str = e.value as string;
                const c0 = str.charCodeAt(0);
                const test = str.length === 1 ? `s.charCodeAt(${pos}) === ${c0}` : `s.charCodeAt(${pos}) === ${c0} && s.startsWith(${JSON.stringify(str)}, ${pos})`;
                return `if (${test}) { ${keep ? `V = ${JSON.stringify(str)}; ` : ""}${out} = ${pos} + ${str.length}; } else ${out} = -1;\n`;
            }
            case "regex": {
                const re = e.value as RegExp;
                const run = singleClassRun(re);
                if (run !== null && run.all) {
                    return `if (${pos} >= s.length) ${out} = -1; else { ${keep ? `V = s.substring(${pos});` : ""} ${out} = s.length; }\n`;
                }
                if (run !== null) {
                    const T = constName(run.tbl), C = constName(new RegExp(run.cls.source, run.cls.flags + "y"));
                    const q = tmp("q"), c = tmp("c");
                    return `if (${pos} >= s.length) ${out} = -1; else {
  let ${q} = ${pos};
  for (; ${q} < s.length; ${q}++) { const ${c} = s.charCodeAt(${q}); if (${c} < 128) { if (${T}[${c}] === 0) break; } else { ${C}.lastIndex = ${q}; if (!${C}.test(s)) break; } }
  if (${q} - ${pos} < ${run.min}) ${out} = -1; else { ${keep ? `V = ${q} > ${pos} ? s.substring(${pos}, ${q}) : undefined; ` : ""}${out} = ${q}; }
}\n`;
                }
                const R = constName(new RegExp(re.source, re.flags.replace(/[gy]/g, "") + "y"));
                const inf = nodeInfo.get(e)!;
                if (!inf.nullable) {
                    const c = tmp("c");
                    return `{ const ${c} = s.charCodeAt(${pos});
  if (!${mayStart(c, inf)}) ${out} = -1;
  else { ${R}.lastIndex = ${pos}; if (${R}.test(s)) { ${out} = ${R}.lastIndex; ${keep ? `V = s.substring(${pos}, ${out});` : ""} } else ${out} = -1; } }\n`;
                }
                return `if (${pos} >= s.length) ${out} = -1;
else { ${R}.lastIndex = ${pos}; if (${R}.test(s)) { ${out} = ${R}.lastIndex; ${keep ? `V = ${out} > ${pos} ? s.substring(${pos}, ${out}) : undefined;` : ""} } else ${out} = -1; }\n`;
            }
            case "nonterminal": return `${out} = ${ruleFn(e.value as string, mode)}(s, ${pos});\n`;
            case "group": return gen(e.value as Expression, mode, pos, out, rn);
            case "epsilon": return `${keep ? "V = undefined; " : ""}${out} = ${pos};\n`;
            case "optional": {
                const inner = e.value as Expression, inf = info(inner), t = tmp("t");
                const miss = `${keep ? "V = undefined; " : ""}${out} = ${pos};`;
                const body = `{ let ${t}; ${gen(inner, mode, pos, t, rn)} if (${t} < 0) { ${miss} } else ${out} = ${t}; }`;
                if (inf.nullable) return body + "\n";
                const c = tmp("c");
                return `{ const ${c} = s.charCodeAt(${pos}); if (!${mayStart(c, inf)}) { ${miss} } else ${body} }\n`;
            }
            case "many": case "many1": {
                const inner = e.value as Expression, inf = info(inner), min = e.type === "many1" ? 1 : 0;
                const q = tmp("q"), t = tmp("t"), n = tmp("n"), arr = tmp("a"), c = tmp("c");
                const guard = inf.nullable ? "" : `const ${c} = s.charCodeAt(${q}); if (!${mayStart(c, inf)}) break; `;
                return `{ let ${q} = ${pos}, ${n} = 0; ${keep ? `const ${arr} = [];` : ""}
  for (;;) { ${guard}let ${t}; ${gen(inner, mode, q, t, rn)} if (${t} < 0 || ${t} === ${q}) break; ${keep ? `${arr}.push(V); ` : ""}${n}++; ${q} = ${t}; }
  if (${n} < ${min}) ${out} = -1; else { ${keep ? `V = ${arr}; ` : ""}${out} = ${q}; } }\n`;
            }
            case "next": {
                const [a, b] = e.value as Expression[];
                const t = tmp("t");
                return `{ let ${t}; ${gen(a, "r", pos, t, rn)} if (${t} < 0) ${out} = -1; else { ${gen(b, mode, t, out, rn)} } }\n`;
            }
            case "skip": {
                const [a, b] = e.value as Expression[];
                const t = tmp("t"), u = tmp("u"), v = tmp("v");
                return `{ let ${t}; ${gen(a, mode, pos, t, rn)} if (${t} < 0) ${out} = -1; else { ${keep ? `const ${v} = V; ` : ""}let ${u}; ${gen(b, "r", t, u, rn)} if (${u} < 0) ${out} = -1; else { ${keep ? `V = ${v}; ` : ""}${out} = ${u}; } } }\n`;
            }
            case "minus": {
                const [a, b] = e.value as Expression[];
                const t = tmp("t");
                return `{ let ${t}; ${gen(b, "r", pos, t, rn)} if (${t} >= 0) ${out} = -1; else { ${gen(a, mode, pos, out, rn)} } }\n`;
            }
            case "concatenation": {
                const parts = e.value as Expression[];
                const L = tmp("L");
                const ts = parts.map(() => tmp("t")), vs = parts.map(() => tmp("v"));
                let code = `${L}: { ${out} = -1;\n`;
                let at = pos;
                parts.forEach((p, idx) => {
                    code += `let ${ts[idx]}; ${gen(p, mode, at, ts[idx], rn)} if (${ts[idx]} < 0) break ${L}; ${keep ? `const ${vs[idx]} = V;` : ""}\n`;
                    at = ts[idx];
                });
                if (keep) {
                    if (positional(rn)) code += `V = [${vs.join(", ")}];\n`;
                    else {
                        const arr = tmp("a");
                        code += `const ${arr} = []; ${vs.map((v) => `if (${v} !== undefined) ${arr}.push(${v});`).join(" ")} V = ${arr};\n`;
                    }
                }
                return code + `${out} = ${at}; }\n`;
            }
            case "alternation": {
                const alts = e.value as Expression[];
                const r = routes(alts.map(info), stockNonAscii(alts)); // JUDGE: stockNa
                const L = tmp("L");
                const tryAll = (members: number[]) => members.map((m, j) =>
                    `${gen(alts[m], mode, pos, out, rn)}${j < members.length - 1 ? `if (${out} >= 0) break ${L};\n` : ""}`).join("");
                if (r === null) return `${L}: { ${tryAll(alts.map((_, m) => m))} }\n`;
                // A routed choice: each alternative that is not a plain reference is hoisted into its own
                // function, so the routes (which share alternatives) never duplicate its code.
                const hoisted = alts.map((a) => {
                    const u = a.type === "group" ? (a.value as Expression) : a;
                    if (u.type === "nonterminal" || u.type === "literal" || u.type === "regex") return a;
                    const h = tmp("h_"), o = tmp("o");
                    helpers.push(`function ${h}(s, i) { let ${o}; ${gen(a, mode, "i", o, rn)} return ${o}; }`);
                    return { type: "__call", value: h } as unknown as Expression;
                });
                const genAlt = (m: number) => {
                    const h = hoisted[m] as unknown as { type: string; value: string };
                    return h.type === "__call" ? `${out} = ${h.value}(s, ${pos});\n` : gen(alts[m], mode, pos, out, rn);
                };
                const T = constName(r.tbl), c = tmp("c"), g = tmp("g");
                let code = `${L}: { const ${c} = s.charCodeAt(${pos}); const ${g} = ${c} < 128 ? ${T}[${c}] : ${c} === ${c} ? ${r.na} : ${r.eof};\n switch (${g}) {\n`;
                r.groups.forEach((members, gi) => {
                    code += `case ${gi}: { ${members.map((m, j) => `${genAlt(m)}${j < members.length - 1 ? `if (${out} >= 0) break ${L};\n` : ""}`).join("")} break ${L}; }\n`;
                });
                return code + `default: ${out} = -1; } }\n`;
            }
            default: throw new Error(`unsupported BBNF node \`${e.type}\``);
        }
    }

    // Emit every rule reachable from what the façade asks for (all rules: the table is small).
    for (const name of ast.keys()) ruleFn(name, "v");
    const fns: string[] = [];
    while (queue.length > 0) {
        const [name, mode] = queue.shift()!;
        const a = actions.get(name);
        const bodyMode: Mode = a?.kind === "text" ? "r" : mode;
        let body = `let o; ${gen(ast.get(name)!.expression, bodyMode, "i", "o", name)}`;
        if (a !== undefined && mode === "v") {
            const A = opts.aot ? (aotActs.push(name), `AK${aotActs.length - 1}`) : constName(a.fn); // JUDGE: aot binds actions by name, once
            body += a.kind === "map" ? `if (o >= 0) V = ${A}(V);\n` : a.kind === "span" ? `if (o >= 0) V = ${A}(V, i, o);\n` : `if (o >= 0) V = ${A}(s.substring(i, o));\n`;
        }
        fns.push(`function ${fnName.get(`${name}/${mode}`)}(s, i) {\n${body}return o;\n}`);
    }
    const table = [...ast.keys()].map((n) => `${JSON.stringify(n)}: ${fnName.get(`${n}/v`)}`).join(", ");
    const source = `"use strict";\nlet V;\n${consts.map((_, i) => `const K${i} = C[${i}];`).join("\n")}\n${fns.join("\n")}\n${helpers.join("\n")}\nreturn { rules: { ${table} }, value: () => V };`;
    if (opts.aot) { // JUDGE: the build-time module — constants as literals, actions by rule name
        const lit = (v: unknown): string => {
            if (v instanceof Uint8Array) return `new Uint8Array([${Array.from(v).join(",")}])`;
            if (v instanceof Int16Array) return `new Int16Array([${Array.from(v).join(",")}])`;
            if (v instanceof RegExp) return `new RegExp(${JSON.stringify(v.source)}, ${JSON.stringify(v.flags)})`;
            throw new Error(`unserializable constant ${String(v)}`);
        };
        const kinds = Object.fromEntries([...actions].map(([n, a]) => [n, a.kind]));
        const moduleSource = `${opts.header ?? ""}export const RULE_NAMES = ${JSON.stringify([...ast.keys()])};\nexport const ACTION_KINDS = ${JSON.stringify(kinds)};\n` +
            `export function createParser(A) {\n"use strict";\nlet V;\n${consts.map((v, i) => `const K${i} = ${lit(v)};`).join("\n")}\n${aotActs.map((n, i) => `const AK${i} = A[${JSON.stringify(n)}];`).join("\n")}\n${fns.join("\n")}\n${helpers.join("\n")}\nreturn { rules: { ${table} }, value: () => V };\n}\n`;
        return { rule: () => { throw new Error("aot: load the module"); }, value: () => undefined, source, moduleSource };
    }
    const made = new Function("C", source)(consts) as { rules: Record<string, (s: string, i: number) => number>; value(): unknown };
    return { rule: (n) => made.rules[n], value: made.value, source };
}
