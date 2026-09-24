// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.g — the in-page half of the BROWSER paired instrument (G-browser, V-5/V-6). `browser.mjs` bundles this file
// with the arms' `_build/<arm>.mjs` bundles and the sources into one IIFE; every cell runs in a fresh page with the
// retired parser in the same page as every candidate arm. The rules are bench.mjs's, in a page:
//   classes  whole / acc / rej (split by the retired arm's verdict) over the 29,944 sources; large = parseStylesheet
//            on the G-large sheets (sheets/MANIFEST.json)
//   R-v-3    a declared warm-up (WARMUP passes per arm at k = 1, identical for every arm) BEFORE the k-rule; then k
//            doubles until the retired pass takes ≥ floor ms (Firefox 100 ms: its timer is coarse); 2 warm-ups at k
//   rounds   ≥ 11 interleaved; the arm order rotates every round and flips every full rotation; `rev` reverses the arms
// No gc() exists in a page (recorded, as `.v`'s receipt). Ratio = arm/retired: median of the per-round paired ratios.
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
export const WARMUP = 3;
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** arms: { name → module } (the `retired` module exports `hand` + `parseStylesheet`; a product module exports `css`). */
export function install(arms, inputs, sheets) {
    const F = {};
    for (const [name, m] of Object.entries(arms)) {
        if (name === "retired") F[name] = Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.hand[e]]));
        else { m.css.parseCssColor("red"); F[name] = Object.fromEntries(ENTRIES.map((e) => [e, m.css[e]])); }
    }
    globalThis.cell = (entry, cls, rounds, rev, floor) => {
        let names = ["retired", ...Object.keys(F).filter((a) => a !== "retired")];
        if (rev) names = names.reverse();
        const f = Object.fromEntries(names.map((a) => [a, F[a][entry]]));
        const accepts = (s) => { try { return f.retired(s)?.ok === true; } catch { return false; } };
        const xs = cls === "whole" ? inputs : cls === "acc" ? inputs.filter(accepts) : cls === "rej" ? inputs.filter((s) => !accepts(s))
            : cls === "large" && entry === "parseStylesheet" ? sheets : null;
        if (xs === null) throw new Error(`class ${cls} for ${entry}`);
        const pass = (fn, k) => { const t = performance.now(); for (let j = 0; j < k; j++) for (let i = 0; i < xs.length; i++) { try { fn(xs[i]); } catch { } } return performance.now() - t; };
        for (let w = 0; w < WARMUP; w++) for (const a of names) pass(f[a], 1);
        let k = 1; while (pass(f.retired, k) < floor) k *= 2;
        for (let w = 0; w < 2; w++) for (const a of names) pass(f[a], k);
        const t = Object.fromEntries(names.map((a) => [a, []]));
        for (let r = 0; r < rounds; r++) {
            const order = names.map((_, i) => names[(i + r) % names.length]);
            if (Math.floor(r / names.length) % 2) order.reverse();
            for (const a of order) t[a].push(pass(f[a], k));
        }
        const ratio = {};
        for (const a of names) {
            if (a === "retired") continue;
            const pr = t[a].map((x, i) => x / t.retired[i]);
            ratio[a] = { paired: +median(pr).toFixed(3), below1: pr.filter((x) => x < 1).length, ofMins: +(Math.min(...t[a]) / Math.min(...t.retired)).toFixed(3) };
        }
        return { entry, class: cls, n: xs.length, k, warmup: WARMUP, rev, spread: +(Math.max(...t.retired) / Math.min(...t.retired)).toFixed(3),
            retiredMs: +median(t.retired).toFixed(2), ratio };
    };
}
