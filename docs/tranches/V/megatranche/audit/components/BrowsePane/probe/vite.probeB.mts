// CHALLENGE-L probe B — identical to probe A except the package-level
// `"sideEffects": false` claim is neutralised for the build's tree-shaker.
// If B produces a real application bundle and A does not, `sideEffects: false`
// in package.json is the mechanism of the empty gh-pages mount.
import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";

export default (env: any) => {
    const cfg: any = (base as any)(env);
    cfg.build.outDir =
        "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/outB";
    cfg.build.rolldownOptions = {
        ...(cfg.build.rolldownOptions ?? {}),
        treeshake: { moduleSideEffects: true },
    };
    return cfg;
};
