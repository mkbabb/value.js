// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.g — the in-page half of the BROWSER paired instrument (G-browser, V-5/V-6). `browser.mjs` bundles this file
// with the arms' `_build/<arm>.mjs` bundles and the sources into one IIFE; every cell runs in a fresh page with the
// retired parser in the same page as every candidate arm. The rules are bench.mjs's, in a page:
//   classes  whole / acc / rej (split by the retired arm's verdict) over the 29,944 sources; large = parseStylesheet
//            on the WHOLE G-large sheets (sheets/MANIFEST.json; INFO: unequal work); large-eq = parseStylesheet on the
//            equal-work prefix corpus (bench/corpus/large-prefix-2026-09-25/, X.P.W7 `.eq`): the large cell of record
//   R-v-3    a declared warm-up (WARMUP passes per arm at k = 1, identical for every arm) BEFORE the k-rule; then k
//            doubles until the LEAST of CAL retired passes takes ≥ floor ms (X.P.W8 Repair 1, ESC-W8lg1-1: one pass
//            taken under a load stall had set k as low as 64 for a cell read at k = 2048, and passes then timed 0 ms;
//            contention only adds time, so the least of CAL is the pass's own cost) — and, when slicing, until the
//            least slice (least of CAL) spans ≥ MIN_TICKS ticks of the page's measured clock;
//            2 warm-ups at k
//   rounds   ≥ 11; the arm order rotates every round and flips every full rotation; `rev` reverses the arms.
//   slices   (X.P.W8 Repair 1, ESC-W8lg1-1; per engine, set by browser.mjs) a round cuts the inputs into `slices`
//            contiguous slices; per slice the arms alternate `repeats` times (the leading arm rotating every slice and
//            repeat) and the arm's slice time is the LEAST of its repeats; the round's per-arm time sums its slices.
//            Host contention only ever ADDS time (a preemption stalls whichever arm is running), so the least of
//            interleaved repeats reads the arm's own cost, identically for every arm, while a whole pass per arm let
//            a load burst land on one arm only and the additive stalls pulled every ratio toward 1.0 (Firefox: retired
//            spreads 5–131× at 1-min load 113–659). The least of repeats is unbiased only on a fine clock, so the page
//            measures its timer tick and the k-rule sizes every slice to ≥ MIN_TICKS ticks when repeats > 1; slices = repeats = 1 is the unsliced pass of record (Chromium 0.1 ms and WebKit 1 ms clocks).
//            A slice spans ≥ MIN_TICKS ticks of parsing, so it still carries the arm's own allocation and nursery GCs.
// No gc() exists in a page (recorded, as `.v`'s receipt). Ratio = arm/retired: median of the per-round paired ratios.
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
export const WARMUP = 3, CAL = 3, MIN_TICKS = 200;
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** arms: { name → module } (the `retired` module exports `hand` + `parseStylesheet`; a product module exports `css`). */
export function install(arms, inputs, sheets, prefixSheets) {
    const F = {};
    for (const [name, m] of Object.entries(arms)) {
        if (name === "retired") F[name] = Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.hand[e]]));
        else { m.css.parseCssColor("red"); F[name] = Object.fromEntries(ENTRIES.map((e) => [e, m.css[e]])); }
    }
    globalThis.cell = (entry, cls, rounds, rev, floor, slices = 1, repeats = 1) => {
        let names = ["retired", ...Object.keys(F).filter((a) => a !== "retired")];
        if (rev) names = names.reverse();
        const f = Object.fromEntries(names.map((a) => [a, F[a][entry]]));
        const accepts = (s) => { try { return f.retired(s)?.ok === true; } catch { return false; } };
        const xs = cls === "whole" ? inputs : cls === "acc" ? inputs.filter(accepts) : cls === "rej" ? inputs.filter((s) => !accepts(s))
            : cls === "large" && entry === "parseStylesheet" ? sheets : cls === "large-eq" && entry === "parseStylesheet" ? prefixSheets : null;
        if (xs === null) throw new Error(`class ${cls} for ${entry}`);
        const pass = (fn, k, lo = 0, hi = xs.length) => { const t = performance.now(); for (let j = 0; j < k; j++) for (let i = lo; i < hi; i++) { try { fn(xs[i]); } catch { } } return performance.now() - t; };
        for (let w = 0; w < WARMUP; w++) for (const a of names) pass(f[a], 1);
        const S = Math.min(slices, xs.length), cut = Array.from({ length: S + 1 }, (_, s) => Math.round((s * xs.length) / S));
        const tick = (() => { let a = performance.now(), d = Infinity; for (let i = 0, b; i < 1e6 && d === Infinity; i++) if ((b = performance.now()) !== a) d = b - a; return d; })();
        const least = (time) => Math.min(...Array.from({ length: CAL }, time));
        const leastSlice = (k) => Math.min(...Array.from({ length: S }, (_, j) => least(() => pass(f.retired, k, cut[j], cut[j + 1]))));
        let k = 1; while (least(() => pass(f.retired, k)) < floor || (repeats > 1 && leastSlice(k) < MIN_TICKS * tick)) k *= 2;
        const sliceMs = leastSlice(k);
        for (let w = 0; w < 2; w++) for (const a of names) pass(f[a], k);
        const t = Object.fromEntries(names.map((a) => [a, []]));
        for (let r = 0; r < rounds; r++) {
            const order = names.map((_, i) => names[(i + r) % names.length]);
            if (Math.floor(r / names.length) % 2) order.reverse();
            const sum = Object.fromEntries(names.map((a) => [a, 0]));
            for (let s = 0; s < S; s++) {
                const least = Object.fromEntries(names.map((a) => [a, Infinity]));
                for (let q = 0; q < repeats; q++) for (let i = 0; i < order.length; i++) {
                    const a = order[(i + s + q) % order.length];
                    least[a] = Math.min(least[a], pass(f[a], k, cut[s], cut[s + 1]));
                }
                for (const a of names) sum[a] += least[a];
            }
            for (const a of names) t[a].push(sum[a]);
        }
        const ratio = {};
        for (const a of names) {
            if (a === "retired") continue;
            const pr = t[a].map((x, i) => x / t.retired[i]);
            ratio[a] = { paired: +median(pr).toFixed(3), below1: pr.filter((x) => x < 1).length, ofMins: +(Math.min(...t[a]) / Math.min(...t.retired)).toFixed(3) };
        }
        return { entry, class: cls, n: xs.length, k, slices: S, repeats, tick, sliceMs: +sliceMs.toFixed(3), cal: CAL, warmup: WARMUP, rev, spread: +(Math.max(...t.retired) / Math.min(...t.retired)).toFixed(3),
            retiredMs: +median(t.retired).toFixed(2), ratio, raw: t };
    };
}
