// route-aot-codegen — PROTOTYPE BBNF → JavaScript ahead-of-time emitter (evidence only).
//
// Front end = the PUBLISHED toolchain's own (bbnf-lang 0.1.4: BBNFToASTWithImports → dedupGroups →
// analyzeGrammar → computeFirstSets), so the grammar AST, the FIRST/nullable analysis and the
// alternation dispatch decisions are byte-for-byte the interpreter's. Back end = one plain
// recursive-descent function per rule over module-scoped (src, pos, len), returning its value or
// the FAIL sentinel with `pos` restored — no closures tree, no ParserState, no lazy trampolines,
// no error bookkeeping. Value semantics mirror parse-that 0.8.2 exactly (all(): undefined dropped;
// many(): zero-progress stop; regex(): fails at EOF, empty match = undefined; minus(): excluded
// tried first at the same offset; opt(): undefined).
//
// Options: prune (per-character candidate lists inside alternations, pruned by the SAME FIRST
// sets the interpreter's dispatch uses) and recognizers (a value-free q_ twin of each rule, used
// wherever the grammar discards a value: the left of >>, the right of <<, the excluded side of -).
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
    BBNFToAST, BBNFToASTWithImports, dedupGroups, analyzeGrammar, computeFirstSets,
    exprFirstSet, exprIsNullable, buildDispatchTable, buildPartialDispatchTable,
} from "@mkbabb/bbnf-lang";
import { soundAnalysis, regexFirst } from "./first.mjs";
import { leadingShared } from "./memo-set.mjs";

export const MODULES = ["tokens", "math", "color", "value", "stylesheet"];
export const GRAMMAR_DIR = "/Users/mkbabb/Programming/value.js/src/css/grammar/";
export const grammarText = () => MODULES.map((m) => readFileSync(GRAMMAR_DIR + m + ".bbnf", "utf8")).join("\n");

export function frontEnd(text) {
    const r = BBNFToASTWithImports(text);
    const ast = r.length >= 2 && r[1] ? r[1].rules : BBNFToAST(text)[1];
    if (!ast) throw new Error("grammar did not parse");
    dedupGroups(ast);
    const analysis = analyzeGrammar(ast);
    const fn = computeFirstSets(ast, analysis);
    return { ast, analysis, fn };
}

const unwrap = (e) => { while (e.type === "group") e = e.value; return e; };

export function emit(text, manifest, opts = {}) {
    const prune = opts.prune ?? true;
    const recognizers = opts.recognizers ?? true;
    const { ast, analysis, fn } = frontEnd(text);
    const cyclic = analysis.cyclicRules;
    const sound = soundAnalysis(ast);
    const names = [...ast.keys()];
    for (const n of Object.keys(manifest)) if (!ast.has(n)) throw new Error(`action for unknown rule ${n}`);

    // Alias collapse (bbnf-lang generate.ts:502-513): `a = b ;` (non-cyclic) is bound to b's
    // parser BEFORE actions attach, so a's body is b's raw body (b's action is NOT applied).
    const aliasOf = new Map();
    for (const [name, rule] of ast) {
        if (cyclic.has(name)) continue;
        const e = unwrap(rule.expression);
        if (e.type === "nonterminal" && ast.has(e.value)) aliasOf.set(name, e.value);
    }
    for (const [a, b] of aliasOf) if (aliasOf.has(b)) throw new Error(`alias chain ${a} -> ${b} -> ${aliasOf.get(b)} not supported`);

    let uid = 0;
    const fresh = (p) => `${p}${uid++}`;
    const regexes = [];           // hoisted sticky regexes
    const regexIndex = new Map();
    const tables = [];            // hoisted dispatch tables
    const helpers = [];           // hoisted alternation-branch functions
    const needR = new Set(), needQ = new Set(), queue = [];
    const want = (name, used) => {
        const set = used || !recognizers ? needR : needQ;
        if (!set.has(name)) { set.add(name); queue.push([name, used || !recognizers]); }
        return (used || !recognizers ? "r_" : "q_") + name;
    };

    const lower = opts.lower ?? true;
    const tableIndex = new Map();
    const tableOf = (bits) => {
        const key = Array.from(bits).join("");
        if (!tableIndex.has(key)) { const n = `T${tableIndex.size}`; tableIndex.set(key, n); tables.push(`const ${n} = new Uint8Array([${Array.from(bits).join(",")}]);`); }
        return tableIndex.get(key);
    };
    const naIndex = new Map();
    // A regex that is exactly one character class (or class escape) under `*` or `+`, no flags but `i`.
    const classRun = (re) => {
        const m = /^(\[(?:\\.|[^\]\\])*\]|\\[sdwSDW])([*+])$/.exec(re.source);
        if (!m || /[^i]/.test(re.flags.replace(/y/g, ""))) return null;
        const one = new RegExp(`^${m[1]}$`, re.flags.replace(/y/g, ""));
        const bits = new Uint8Array(128);
        for (let c = 0; c < 128; c++) bits[c] = one.test(String.fromCharCode(c)) ? 1 : 0;
        // Non-ASCII membership: a negated class of ASCII-only members admits every unit >= 128.
        let nonAscii = null;
        // A universal class (`[\s\S]`, `[^]`, `[\w\W]`, `[\d\D]`) admits every code unit.
        if (/^\[(?:\\s\\S|\\S\\s|\^|\\w\\W|\\W\\w|\\d\\D|\\D\\d)\]$/.test(m[1])) nonAscii = true;
        else if (/^\[\^[\x00-\x7f]*\]$/.test(m[1]) && !/\\[sSwWdDpPuxc]/.test(m[1])) nonAscii = true;
        else if (/^\[[\x00-\x7f]*\]$/.test(m[1]) && !/\\[sSwWdDpPuxc]/.test(m[1]) && !re.flags.includes("i")) nonAscii = false;
        let naName;
        if (nonAscii === null) {
            const k = one.source + "/" + one.flags;
            if (!naIndex.has(k)) { naName = `NA${naIndex.size}`; naIndex.set(k, naName); tables.push(`const ${naName} = new RegExp(${JSON.stringify(m[1])}, ${JSON.stringify(one.flags + "y")});`); }
            naName = naIndex.get(k);
        }
        return { table: tableOf(bits), nonAscii, naName, min1: m[2] === "+", universal: nonAscii === true && bits.every((b) => b === 1) };
    };
    const reOf = (re) => {
        const flags = re.flags.replace(/y/g, "") + "y";
        const key = re.source + "\u0000" + flags;
        if (!regexIndex.has(key)) { regexIndex.set(key, regexes.length); regexes.push(`new RegExp(${JSON.stringify(re.source)}, ${JSON.stringify(flags)})`); }
        return `RE${regexIndex.get(key)}`;
    };

    // Is the value of `e` (when it succeeds) statically never `undefined`?
    const defined = (e) => {
        switch (e.type) {
            case "group": return defined(e.value);
            case "literal": case "many": case "many1": case "concatenation": return true;
            case "next": return defined(e.value[1]);
            case "skip": return defined(e.value[0]);
            case "minus": return defined(e.value[0]);
            case "alternation": return e.value.every(defined);
            case "nonterminal": {
                const n = e.value;
                if (manifest[n]) return false; // an action may answer anything
                if (aliasOf.has(n)) return false;
                return cyclic.has(n) ? false : defined(ast.get(n).expression);
            }
            default: return false; // regex (empty match), optional, epsilon
        }
    };

    const isLeaf = (e) => { e = unwrap(e); return e.type === "nonterminal" || e.type === "literal" || e.type === "regex"; };

    // Emit statements that leave `out` = value | FAIL (pos restored on FAIL).
    function gen(e, out, used) {
        switch (e.type) {
            case "group": return gen(e.value, out, used);
            case "epsilon": return `${out} = undefined;`;
            case "literal": {
                const s = e.value, v = used ? JSON.stringify(s) : "0";
                if (s.length === 1) return `if (src.charCodeAt(pos) === ${s.charCodeAt(0)}) { pos += 1; ${out} = ${v}; } else ${out} = FAIL;`;
                return `if (src.startsWith(${JSON.stringify(s)}, pos)) { pos += ${s.length}; ${out} = ${v}; } else ${out} = FAIL;`;
            }
            case "regex": {
                if (lower) {
                    const run = classRun(e.value);
                    if (run) {
                        // `[class]*` / `[class]+` / `\s*`…: an inline scan over a membership table (exact for
                        // ASCII; code units >= 128 are decided by the class itself, `NA` below).
                        const hit = used ? `${out} = src.substring(pos, e); pos = e;` : `${out} = 0; pos = e;`;
                        const empty = used ? `${out} = undefined;` : `${out} = 0;`;
                        const na = run.nonAscii === true ? "true" : run.nonAscii === false ? "false" : `(${run.naName}.lastIndex = e, ${run.naName}.test(src))`;
                        const scan = run.universal ? `const e = len;` : `let e = pos; for (; e < len; e++) { const c = src.charCodeAt(e); if (c < 128 ? ${run.table}[c] === 0 : !(${na})) break; }`;
                        const fail = run.min1 ? `if (e === pos) ${out} = FAIL; else { ${hit} }` : `if (e > pos) { ${hit} } else ${empty}`;
                        return `if (pos < len) { ${scan} ${fail} } else ${out} = FAIL;`;
                    }
                }
                const R = reOf(e.value);
                if (lower) {
                    const f = regexFirst(e.value);
                    if (!f.nullable && f.first.some((b) => b === 0)) {
                        // A first-character guard: the regex is not entered where it provably cannot start.
                        const G = tableOf(f.first);
                        const hit = used ? `${out} = src.substring(pos, e); pos = e;` : `${out} = 0; pos = e;`;
                        const empty = used ? `${out} = undefined;` : `${out} = 0;`;
                        return `{ const c = src.charCodeAt(pos); if (c < 128 ? ${G}[c] === 1 : pos < len) { ${R}.lastIndex = pos; if (${R}.test(src)) { const e = ${R}.lastIndex; if (e > pos) { ${hit} } else ${empty} } else ${out} = FAIL; } else ${out} = FAIL; }`;
                    }
                }
                const hit = used ? `${out} = src.substring(pos, e); pos = e;` : `${out} = 0; pos = e;`;
                const empty = used ? `${out} = undefined;` : `${out} = 0;`;
                return `if (pos < len) { ${R}.lastIndex = pos; if (${R}.test(src)) { const e = ${R}.lastIndex; if (e > pos) { ${hit} } else ${empty} } else ${out} = FAIL; } else ${out} = FAIL;`;
            }
            case "nonterminal": return `${out} = ${want(e.value, used)}();`;
            case "optional": {
                const t = fresh("t");
                return `let ${t}; ${gen(e.value, t, used)} ${out} = ${t} === FAIL ? undefined : ${t};`;
            }
            case "many": case "many1": {
                const t = fresh("t"), s = fresh("s"), a = fresh("a");
                const min1 = e.type === "many1";
                if (used) return `{ const ${a} = []; for (;;) { const ${s} = pos; let ${t}; ${gen(e.value, t, true)} if (${t} === FAIL || pos === ${s}) break; ${a}.push(${t}); } ${out} = ${min1 ? `${a}.length === 0 ? FAIL : ${a}` : a}; }`;
                return `{ let ${a} = 0; for (;;) { const ${s} = pos; let ${t}; ${gen(e.value, t, false)} if (${t} === FAIL || pos === ${s}) break; ${a}++; } ${out} = ${min1 ? `${a} === 0 ? FAIL : 0` : "0"}; }`;
            }
            case "skip": case "next": {
                const [a, b] = e.value;
                const ta = fresh("t"), tb = fresh("t"), s = fresh("s");
                const keepA = e.type === "skip";
                return `{ const ${s} = pos; let ${ta}; ${gen(a, ta, keepA && used)} if (${ta} === FAIL) ${out} = FAIL; else { let ${tb}; ${gen(b, tb, !keepA && used)} if (${tb} === FAIL) { pos = ${s}; ${out} = FAIL; } else ${out} = ${keepA ? ta : tb}; } }`;
            }
            case "minus": {
                const [a, b] = e.value;
                const tb = fresh("t"), s = fresh("s");
                return `{ const ${s} = pos; let ${tb}; ${gen(b, tb, false)} if (${tb} !== FAIL) { pos = ${s}; ${out} = FAIL; } else { ${gen(a, out, used)} } }`;
            }
            case "concatenation": {
                const xs = e.value;
                if (xs.length === 1) return gen(xs[0], out, used);
                const L = fresh("L"), s = fresh("s");
                const ts = xs.map(() => fresh("t"));
                let code = `${L}: { const ${s} = pos;`;
                xs.forEach((x, i) => {
                    code += ` let ${ts[i]}; ${gen(x, ts[i], used)} if (${ts[i]} === FAIL) { ${i ? `pos = ${s}; ` : ""}${out} = FAIL; break ${L}; }`;
                });
                if (!used) code += ` ${out} = 0; }`;
                else if (xs.every(defined)) code += ` ${out} = [${ts.join(", ")}]; }`;
                else {
                    const a = fresh("a");
                    code += ` const ${a} = [];` + xs.map((x, i) => (defined(x) ? ` ${a}.push(${ts[i]});` : ` if (${ts[i]} !== undefined) ${a}.push(${ts[i]});`)).join("") + ` ${out} = ${a}; }`;
                }
                return code;
            }
            case "alternation": return genAlt(e.value, out, used);
            default: throw new Error(`unsupported expression ${e.type}`);
        }
    }

    function branchCall(x, used) {
        const u = unwrap(x);
        if (u.type === "nonterminal") return { pre: "", call: `${want(u.value, used)}()` };
        const h = fresh(used ? "h" : "hq");
        helpers.push(`function ${h}() { let v; ${gen(x, "v", used)} return v; }`);
        return { pre: "", call: `${h}()` };
    }

    function genAlt(alts, out, used) {
        const n = alts.length;
        const empty = new Map();
        const first = alts.map((a) => exprFirstSet(a, fn.firstSets, fn.nullable, empty));
        const nullable = alts.map((a) => exprIsNullable(a, fn.nullable, empty));
        // The interpreter's own choice of alternation strategy (generate.ts:374-461).
        const allLit = n >= 2 && alts.every((a) => unwrap(a).type === "literal") &&
            new Set(alts.map((a) => unwrap(a).value[0])).size === n && alts.every((a) => unwrap(a).value.length > 0);
        const perfect = !allLit && n >= 2 ? buildDispatchTable(alts, fn.firstSets, fn.nullable) : null;
        const partial = !allLit && !perfect?.isPerfect && n >= 2 ? buildPartialDispatchTable(alts, fn.firstSets, fn.nullable) : null;
        const all = alts.map((_, i) => i);
        // Pruning uses the SOUND analysis only: a branch is skipped at c only if it provably cannot
        // start with c and cannot match empty — so pruning never changes which branch succeeds.
        const S = alts.map((a) => sound(a));
        const may = (i, c) => !prune || S[i].nullable || S[i].first[c] === 1;
        const listFor = (c) => {
            if (c === -1) { // non-ASCII or end of input
                if (allLit || perfect?.isPerfect) return [];
                if (partial) return partial.fallbackIndices;
                return all;
            }
            if (allLit) return all.filter((i) => unwrap(alts[i]).value.charCodeAt(0) === c);
            if (perfect?.isPerfect) return perfect.table[c] >= 0 ? [perfect.table[c]] : [];
            if (partial) {
                const g = partial.table[c];
                const members = g >= 0 ? partial.groups[g].filter((i) => may(i, c)) : [];
                return [...members, ...partial.fallbackIndices];
            }
            return all.filter((i) => may(i, c));
        };
        const lists = [], listIdx = new Map(), table = new Uint8Array(128);
        const idxOf = (l) => { const k = l.join(","); if (!listIdx.has(k)) { listIdx.set(k, lists.length); lists.push(l); } return listIdx.get(k); };
        for (let c = 0; c < 128; c++) table[c] = idxOf(listFor(c));
        const def = idxOf(listFor(-1));
        const calls = new Map();
        const callOf = (i) => { if (!calls.has(i)) calls.set(i, branchCall(alts[i], used).call); return calls.get(i); };
        const t = fresh("t");
        const tryList = (l) => l.map((i) => `${t} = ${callOf(i)}; if (${t} !== FAIL) { ${out} = ${t}; break; }`).join(" ") + ` ${out} = FAIL; break;`;
        if (lists.length === 1) return `do { let ${t}; ${tryList(lists[0])} } while (false);`;
        const D = `D${tables.length}`;
        tables.push(`const ${D} = new Uint8Array([${[...table].join(",")}]);`);
        let code = `{ const c = src.charCodeAt(pos); let ${t}; switch (c < 128 ? ${D}[c] : ${def}) {`;
        lists.forEach((l, k) => { code += ` case ${k}: ${tryList(l)}`; });
        return code + ` } }`;
    }

    const bodyOf = (name) => (aliasOf.has(name) ? ast.get(aliasOf.get(name)).expression : ast.get(name).expression);
    const fns = [], memoDecls = [];
    const isLeafRule = (n) => { let e = unwrap(ast.get(n).expression); if (e.type === "optional") e = unwrap(e.value); return e.type === "regex" || e.type === "literal"; };
    const memo = opts.memo === false ? new Set() : new Set([...leadingShared(ast)].filter((n) => !isLeafRule(n)));
    const roots = opts.entries ?? names;
    for (const r of roots) want(r, true);
    while (queue.length) {
        let [name, used] = queue.shift();
        const rname = name;
        const act = used ? manifest[rname] : undefined;
        // A TEXT action reads only the span its rule matched: the body is RECOGNIZED (no value built).
        const body = gen(bodyOf(rname), "v", used && act !== "text");
        const pre = used ? "r_" : "q_";
        if (memo.has(rname) && !opts.countReentry) {
            // Single-slot packrat memo (keyed by run generation + offset): a rule that leads two or more
            // sequences is re-entered at the same offset after backtracking; its (pure) result is reused.
            const M = `M_${pre}${name}`;
            memoDecls.push(`let ${M}g = -1, ${M}p = -1, ${M}e = 0, ${M}v;`);
            fns.push(`function ${pre}${name}() { if (${M}g === GEN && ${M}p === pos) { if (${M}v !== FAIL) pos = ${M}e; return ${M}v; } const s = pos; const v = ${pre}${name}$(); ${M}g = GEN; ${M}p = s; ${M}e = pos; ${M}v = v; return v; }`);
            name = name + "$";
        }
        if (opts.countReentry) { const id = JSON.stringify(pre + name); const probe = `{ const k = ${id} + "@" + pos; if (SEEN.has(k)) REENTER[${id}] = (REENTER[${id}] ?? 0) + 1; else SEEN.add(k); CALLS[${id}] = (CALLS[${id}] ?? 0) + 1; }`; fns.push(`function ${pre}${name}() { ${probe} return ${pre}${name}$(); }`); name = name + "$"; }
        if (!act) fns.push(`function ${pre}${name}() { let v; ${body} return v; }`);
        else if (act === "map") fns.push(`function ${pre}${name}() { let v; ${body} return v === FAIL ? FAIL : A_${rname}(v); }`);
        else if (act === "text") fns.push(`function ${pre}${name}() { const s0 = pos; let v; ${body} return v === FAIL ? FAIL : A_${rname}(s0, pos, src); }`);
        else fns.push(`function ${pre}${name}() { const s0 = pos; let v; ${body} return v === FAIL ? FAIL : A_${rname}(v, s0, pos); }`);
    }
    const actNames = Object.keys(manifest).sort();
    return [
        "// GENERATED by route-aot-codegen/gen/emit.mjs from src/css/grammar/*.bbnf — never hand-edit.",
        `// grammar-sha256: ${createHash("sha256").update(text).digest("hex")}  emitter-sha256: ${createHash("sha256").update(readFileSync(new URL(import.meta.url))).update(readFileSync(new URL("./first.mjs", import.meta.url))).update(readFileSync(new URL("./memo-set.mjs", import.meta.url))).digest("hex")}`,
        `// options: prune=${prune} recognizers=${recognizers} lower=${lower}`,
        "/* eslint-disable */",
        `export const RULE_NAMES = ${JSON.stringify(names)};`,
        `export const ACTION_MANIFEST = ${JSON.stringify(manifest)};`,
        "const FAIL = Object.freeze({ fail: true });",
        ...(opts.countReentry ? ["const SEEN = new Set(), REENTER = {}, CALLS = {}; globalThis.__AOT_COUNT = { REENTER, CALLS };"] : []),
        ...regexes.map((r, i) => `const RE${i} = ${r};`),
        ...tables,
        "export function createParser(A) {",
        ...actNames.map((n) => `  const A_${n} = A[${JSON.stringify(n)}]; if (typeof A_${n} !== "function") throw new Error("missing action ${n}");`),
        "  let src = \"\", pos = 0, len = 0, GEN = 0;",
        `  // memoized: ${[...memo].join(" ") || "(none)"}`,
        ...memoDecls.map((d) => "  " + d),
        ...helpers.map((h) => "  " + h),
        ...fns.map((f) => "  " + f),
        `  const ENTRY = { ${[...needR].map((n) => `${JSON.stringify(n)}: r_${n}`).join(", ")} };`,
        "  /** One whole-input runner per entry rule (resolved once; no per-call name lookup). */",
        "  return function entry(name) {",
        "    const f = ENTRY[name]; if (f === undefined) throw new Error(`no rule ${name}`);",
        "    return function run(source) {",
        "      src = source; pos = 0; len = source.length; GEN++;" + (opts.countReentry ? " SEEN.clear();" : ""),
        "      const v = f();",
        "      if (v === FAIL || pos !== len) return { ok: false, furthest: pos };",
        "      return { ok: true, value: v, end: pos };",
        "    };",
        "  };",
        "}",
        "",
    ].join("\n");
}
