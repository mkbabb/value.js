// SERVED MODEL: claude-opus-5-5
//
// X.P.W9 `.vc9` — the CSSOM round-trip recorder. Some WPT css-syntax / css-variables files assert
// a value's parse validity and specified serialization without `parsing-testcommon.js`: they
// `style.setProperty(p, fallback)`, `style.setProperty(p, input)`, read `style.getPropertyValue(p)`
// and `assert_equals` it. This module runs such a file's inline scripts with a recording
// CSSStyleDeclaration in scope, so the cases are the ones a browser runs, chosen by no author here:
//   assert_equals(read, expected)  → valid case (input, [expected]); expected === the value set
//                                    just before the input (the fallback) → invalid case.
// Anything else (assert_not_equals, stylesheet-text reads, selectors, DOM) records nothing; a file
// that records nothing is ruled at file level by the census, never extracted.
/**
 * Every inline script of a WPT page: `<script>` and `<script type="text/javascript">` alike (X.P.W9
 * `.vc9`, repaired at §0ht.1 — the bare-tag pattern skipped attributed inline scripts, so three
 * css-variables files that carry round-trip cases were ruled as recording none). A `src=` script is
 * the harness, not the test, and is never run.
 */
export function inlineScripts(text) {
    return [...text.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)]
        .filter((m) => !/\bsrc\s*=/.test(m[1] ?? ""))
        .map((m) => m[2] ?? "");
}

const inert = new Proxy(function () {}, {
    get: (_t, key) => (key === Symbol.iterator ? function* () {} : key === Symbol.toPrimitive ? () => "" : inert),
    apply: () => inert,
    construct: () => inert,
});

const READ = Symbol("read");
const isRead = (x) => x !== null && typeof x === "object" && Object.prototype.hasOwnProperty.call(x, READ);

/** A value read back from the recording declaration: compares unequal to every string. */
function readValue(property, input, fallback, folded = false) {
    const token = `\u0000read:${property}:${input}`;
    return {
        [READ]: { property, input, fallback, folded },
        [Symbol.toPrimitive]: () => token,
        toString: () => token,
        toUpperCase: () => readValue(property, input, fallback, "upper"),
        toLowerCase: () => readValue(property, input, fallback, "lower"),
        trim: () => readValue(property, input, fallback, folded),
    };
}

function declaration() {
    const set = new Map();
    const prev = new Map();
    const style = {
        setProperty(property, value) {
            prev.set(property, set.get(property));
            set.set(property, String(value));
        },
        removeProperty(property) {
            set.delete(property);
            prev.delete(property);
            return "";
        },
        getPropertyValue(property) {
            if (!set.has(property)) return inert;
            return readValue(property, set.get(property), prev.get(property));
        },
    };
    return new Proxy(style, { get: (t, k) => (k in t ? t[k] : inert) });
}

/** Cases of one file's inline scripts under the round-trip recorder. */
export function roundTripCases(text, module, rel) {
    const cases = [];
    const record = (r, expected) => {
        const { property, input, fallback, folded } = r[READ];
        const fold = (s) => (folded === "upper" ? s.toUpperCase() : folded === "lower" ? s.toLowerCase() : s);
        if (fallback !== undefined && fold(fallback) === expected) {
            cases.push({ module, file: rel, kind: "invalid", property, input });
        } else {
            cases.push({ module, file: rel, kind: "valid", property, input, expected: [expected], ...(folded ? { fold: folded } : {}) });
        }
    };
    const element = () => new Proxy({ style: declaration() }, { get: (t, k) => (k in t ? t[k] : inert) });
    const rules = new Proxy([], { get: (t, k) => (/^\d+$/.test(String(k)) ? (t[k] ??= element()) : k === "length" ? 1 : inert) });
    const sheets = new Proxy([], { get: (t, k) => (/^\d+$/.test(String(k)) ? (t[k] ??= { cssRules: rules, rules }) : inert) });
    const byId = new Map();
    const document = new Proxy({
        styleSheets: sheets,
        getElementById: (id) => byId.get(id) ?? (byId.set(id, element()), byId.get(id)),
        createElement: () => element(),
    }, { get: (t, k) => (k in t ? t[k] : inert) });
    const harness = {
        document,
        test: (fn) => { try { fn(); } catch { /* an assertion the recorder cannot read */ } },
        assert_equals: (a, b) => {
            if (isRead(a) && typeof b === "string") record(a, b);
            else if (isRead(b) && typeof a === "string") record(b, a);
        },
    };
    const scope = new Proxy(harness, {
        has: (target, key) => key in target || !(key in globalThis),
        get: (target, key) => (key === Symbol.unscopables ? undefined : key in target ? target[key] : inert),
    });
    for (const body of inlineScripts(text)) new Function("__scope", `with (__scope) {\n${body}\n}`)(scope);
    return cases;
}
