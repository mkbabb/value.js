/**
 * The KaTeX engine, loaded once and shared by every formula on the page.
 *
 * X.W11.p2 (COHESION §0ge.1(ii)): the engine (vendor-katex, ~74 KB gz) and
 * its stylesheet load with their consumer, never on the boot path of `/`.
 * The stylesheet is a script-side import, so it can never be scoped (AB-1,
 * Katex.vue). `loadKatex` starts the load (a formula coming within a
 * viewport of being seen, or the guide asking for its whole layout);
 * `katexEngine` resolves once the engine is in, whoever asked, and every
 * formula renders on it then: a guide's formulas are typeset together, so
 * its length is settled before it is read, never formula by formula under
 * the reader.
 */
import type katexModule from "katex";

type Katex = typeof katexModule;

let resolveEngine: (engine: Katex) => void = () => {};
export const katexEngine: Promise<Katex> = new Promise((resolve) => {
    resolveEngine = resolve;
});

let started = false;
export function loadKatex(): Promise<Katex> {
    if (!started) {
        started = true;
        void Promise.all([import("katex"), import("katex/dist/katex.min.css")]).then(([engine]) =>
            resolveEngine(engine.default),
        );
    }
    return katexEngine;
}
