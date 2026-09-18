// CHALLENGE-L probe C — identical to probe A except the build input is an
// explicit ENTRY MODULE (a real file) instead of the inline
// `<script type="module">` embedded in demo/color-picker/index.html.
// If C bundles the application and A does not, the empty gh-pages mount is
// caused by the composition root having no module home.
import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";

export default (env: any) => {
    const cfg: any = (base as any)(env);
    cfg.build.outDir =
        "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/outC";
    cfg.build.rolldownOptions = {
        ...(cfg.build.rolldownOptions ?? {}),
        input:
            "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/probe-entry.ts",
    };
    return cfg;
};
