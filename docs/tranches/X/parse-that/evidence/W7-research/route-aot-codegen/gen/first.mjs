// A SOUND (over-approximating) FIRST/nullable analysis for the emitter's alternation pruning.
// bbnf-lang 0.1.4's regexFirstChars is NOT sound (it reads `[\s\S]` as whitespace-only, ignores
// flags, drops `{0,n}` optionality…), so the product's own FIRST sets may be used only to reproduce the
// product's dispatch DECISIONS, never to prune. This analysis answers, per expression, a 128-bit set of
// possible first code units (ASCII) and whether it may match the empty string; any construct it does
// not model answers ALL (every character), which keeps pruning sound.
const ALL = () => { const s = new Uint8Array(128).fill(1); return s; };
const NONE = () => new Uint8Array(128);
const union = (a, b) => { for (let i = 0; i < 128; i++) a[i] |= b[i]; return a; };
const cls = (pred) => { const s = NONE(); for (let i = 0; i < 128; i++) if (pred(String.fromCharCode(i))) s[i] = 1; return s; };
const ESC = { d: /\d/, D: /\D/, w: /\w/, W: /\W/, s: /\s/, S: /\S/ };

/** First-set and nullability of a JS regex source (conservative). */
export function regexFirst(re) {
    const src = re.source, fold = re.flags.includes("i");
    let i = 0;
    const foldSet = (s) => { if (!fold) return s; for (let c = 65; c <= 90; c++) if (s[c] || s[c + 32]) s[c] = s[c + 32] = 1; return s; };
    // parse an alternation until ')' or end → {first, nullable}
    function alt() {
        const first = NONE(); let nullable = false;
        for (;;) {
            const r = seq();
            union(first, r.first); nullable ||= r.nullable;
            if (src[i] === "|") { i++; continue; }
            return { first, nullable };
        }
    }
    function seq() {
        const first = NONE(); let open = true; // `open`: every atom so far may be empty
        while (i < src.length && src[i] !== "|" && src[i] !== ")") {
            const a = atom();
            const q = quant();
            const mayEmpty = a.nullable || q.min0;
            if (open) { union(first, a.first); if (!mayEmpty) open = false; }
        }
        return { first, nullable: open };
    }
    function quant() {
        const c = src[i];
        let min0 = false;
        if (c === "*" || c === "?") { i++; min0 = true; }
        else if (c === "+") i++;
        else if (c === "{") { const m = /^\{(\d*)(,\d*)?\}/.exec(src.slice(i)); if (m) { i += m[0].length; min0 = m[1] === "" || Number(m[1]) === 0; } else return { min0 }; }
        else return { min0 };
        if (src[i] === "?") i++; // lazy
        return { min0 };
    }
    function atom() {
        const c = src[i];
        if (c === "(") {
            i++;
            let look = false;
            if (src[i] === "?") {
                if (src[i + 1] === ":") i += 2;
                else if (src[i + 1] === "=" || src[i + 1] === "!") { i += 2; look = true; }
                else if (src[i + 1] === "<" && (src[i + 2] === "=" || src[i + 2] === "!")) { i += 3; look = true; }
                else if (src[i + 1] === "<") { i = src.indexOf(">", i) + 1; }
                else throw new Error("group syntax");
            }
            const r = alt();
            if (src[i] !== ")") throw new Error("unbalanced");
            i++;
            return look ? { first: NONE(), nullable: true } : r; // lookarounds consume nothing
        }
        if (c === "[") return charClass();
        if (c === "\\") {
            const d = src[i + 1]; i += 2;
            if (ESC[d]) return { first: cls((ch) => ESC[d].test(ch)), nullable: false };
            if (d === "b" || d === "B") return { first: NONE(), nullable: true };
            if (/[0-9]/.test(d)) return { first: ALL(), nullable: true }; // backreference
            if (d === "u" || d === "x" || d === "c" || d === "p" || d === "P" || d === "k") return { first: ALL(), nullable: false };
            const lit = { n: "\n", r: "\r", t: "\t", f: "\f", v: "\v", 0: "\0" }[d] ?? d;
            return { first: foldSet(cls((ch) => ch === lit)), nullable: false };
        }
        if (c === "^" || c === "$") { i++; return { first: NONE(), nullable: true }; }
        if (c === ".") { i++; return { first: re.flags.includes("s") ? ALL() : cls((ch) => ch !== "\n" && ch !== "\r"), nullable: false }; }
        i++;
        return { first: foldSet(cls((ch) => ch === c)), nullable: false };
    }
    function charClass() {
        const end = (() => { let j = i + 1; if (src[j] === "^") j++; if (src[j] === "]") j++; for (; j < src.length; j++) { if (src[j] === "\\") { j++; continue; } if (src[j] === "]") return j; } throw new Error("class"); })();
        const body = src.slice(i, end + 1);
        i = end + 1;
        // Let the engine itself decide membership for each ASCII unit (exact, flags included).
        const test = new RegExp(`^${body}$`, fold ? "i" : "");
        return { first: cls((ch) => test.test(ch)), nullable: false };
    }
    try {
        const r = alt();
        if (i !== src.length) throw new Error("trailing");
        return r;
    } catch {
        return { first: ALL(), nullable: true };
    }
}

/** Sound FIRST/nullable for every rule (least fixpoint), and a per-expression query. */
export function soundAnalysis(ast) {
    const F = new Map(), N = new Map();
    for (const n of ast.keys()) { F.set(n, NONE()); N.set(n, false); }
    const reCache = new Map();
    const q = (e) => {
        switch (e.type) {
            case "group": return q(e.value);
            case "literal": return e.value.length ? { first: (() => { const s = NONE(); const c = e.value.charCodeAt(0); if (c < 128) s[c] = 1; else return ALL(); return s; })(), nullable: false } : { first: NONE(), nullable: true };
            case "regex": { if (!reCache.has(e.value)) reCache.set(e.value, regexFirst(e.value)); const r = reCache.get(e.value); return { first: r.first.slice(), nullable: r.nullable }; }
            case "nonterminal": return ast.has(e.value) ? { first: F.get(e.value).slice(), nullable: N.get(e.value) } : { first: ALL(), nullable: true };
            case "epsilon": return { first: NONE(), nullable: true };
            case "optional": case "many": { const r = q(e.value); return { first: r.first, nullable: true }; }
            case "many1": return q(e.value);
            case "skip": case "next": case "concatenation": {
                const xs = e.type === "concatenation" ? e.value : e.value;
                const first = NONE(); let nullable = true;
                for (const x of xs) { const r = q(x); union(first, r.first); if (!r.nullable) { nullable = false; break; } }
                return { first, nullable };
            }
            case "minus": return q(e.value[0]);
            case "alternation": { const first = NONE(); let nullable = false; for (const x of e.value) { const r = q(x); union(first, r.first); nullable ||= r.nullable; } return { first, nullable }; }
            default: return { first: ALL(), nullable: true };
        }
    };
    for (let changed = true; changed;) {
        changed = false;
        for (const [n, rule] of ast) {
            const r = q(rule.expression);
            const f = F.get(n);
            for (let i = 0; i < 128; i++) if (r.first[i] && !f[i]) { f[i] = 1; changed = true; }
            if (r.nullable && !N.get(n)) { N.set(n, true); changed = true; }
        }
    }
    return q;
}
