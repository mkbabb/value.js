/**
 * CHALLENGE-C probe — (a) does the canonical serialization keep the authored
 * literal the e2e asserts on? (decides the vacuous-gate mutation), and
 * (b) does hljs escape HTML, and can `highlight()` fall through to its raw
 * `return code` path? READ-ONLY.
 */
import { parseGradientCSS } from "../../../../../../../../demo/workbenches/gradient/composables/gradientParse";
import { serializeGradient } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

const r = parseGradientCSS("linear-gradient(45deg, red, rebeccapurple 80%)");
if (!r.ok) throw new Error(r.reason);
const canonical = serializeGradient({
    ...r.model,
    interpolationSpace: "oklch",
    hueMethod: "shorter",
} as never);
console.log("authored :", "linear-gradient(45deg, red, rebeccapurple 80%)");
console.log("canonical:", canonical);
console.log('canonical contains "rebeccapurple":', canonical.includes("rebeccapurple"));

hljs.registerLanguage("css", css);
const evil = "linear-gradient(90deg, <img src=x onerror=alert(1)>, blue)";
console.log("hljs escapes '<':", hljs.highlight(evil, { language: "css" }).value.includes("&lt;"));
try {
    // the catch path: an UNREGISTERED language is the documented throw
    (hljs as unknown as { highlight: (c: string, o: { language: string }) => unknown }).highlight(
        evil,
        { language: "not-a-language" },
    );
    console.log("unregistered language: did NOT throw");
} catch (e) {
    console.log("unregistered language THROWS:", (e as Error).message);
}
