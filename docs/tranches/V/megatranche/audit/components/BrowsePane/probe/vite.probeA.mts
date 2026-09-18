// CHALLENGE-L probe A — reproduce the gh-pages build with the repo config
// UNCHANGED, redirecting only outDir so the real dist/ is never touched.
import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";

export default (env: any) => {
    const cfg: any = (base as any)(env);
    cfg.build.outDir =
        "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/outA";
    return cfg;
};
