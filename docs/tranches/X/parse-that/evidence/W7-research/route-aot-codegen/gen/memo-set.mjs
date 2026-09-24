// Rules re-entered at the SAME offset after backtracking: a rule that leads (first element, through
// nullable-free prefixes only) two or more DIFFERENT sequences reachable as alternatives of each other.
// Conservative static proxy: leading position in >= 2 distinct parent sequences.
export function leadingShared(ast) {
    const leads = new Map();
    const add = (n, ctx) => { if (!leads.has(n)) leads.set(n, new Set()); leads.get(n).add(ctx); };
    let k = 0;
    const lead = (e) => { while (e.type === "group") e = e.value; return e; };
    const walk = (e, rule) => {
        switch (e.type) {
            case "group": case "optional": case "many": case "many1": return walk(e.value, rule);
            case "concatenation": case "skip": case "next": case "minus": {
                const xs = e.value; const ctx = `${rule}#${k++}`;
                const f = lead(xs[0]);
                if (f.type === "nonterminal") add(f.value, ctx);
                xs.forEach((x) => walk(x, rule)); return;
            }
            case "alternation": return e.value.forEach((x) => walk(x, rule));
            default: return;
        }
    };
    for (const [n, r] of ast) walk(r.expression, n);
    return new Set([...leads].filter(([, s]) => s.size >= 2).map(([n]) => n));
}
