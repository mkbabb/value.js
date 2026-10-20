// SS-8 · Z4 — library-band §3 "4.1 cut" SHIP/DECLINE/FENCE list read off a BUILT dist/subpaths.
//   ~/.claude/guard/guarded --light --timeout 5 -- node ship.mjs <export-root>
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
const ROOT = resolve(process.argv[2] ?? ".");
const sub = (n) => import(pathToFileURL(resolve(ROOT, "dist/subpaths", `${n}.js`)).href);
const [color, css, easing] = await Promise.all(["color", "css", "easing"].map(sub));
const has = (m, k) => typeof m[k] !== "undefined";
const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
const names = (() => { try { const r = easing.easingNames(); return Array.isArray(r) ? r : r?.value; } catch (e) { return "throw " + e; } })();
const out = {
    root: ROOT, version: pkg.version, exportsKeys: Object.keys(pkg.exports ?? {}),
    ship: {
        sampleColorRamp: has(color, "sampleColorRamp"), mixColorsInto: has(color, "mixColorsInto"), toRgba8Into: has(color, "toRgba8Into"),
        toHex: has(color, "toHex"), ColorFactory: has(color, "ColorFactory"), easingNames: has(easing, "easingNames"),
        serializeCssValue: has(css, "serializeCssValue"), serializeKeyframeSelector: has(css, "serializeKeyframeSelector"),
    },
    decline: { sampleBezier: has(easing, "sampleBezier") || has(color, "sampleBezier"), resolveCssColor: has(css, "resolveCssColor") || has(color, "resolveCssColor") },
    fence: { bezierPresetsKeys: easing.bezierPresets ? Object.keys(easing.bezierPresets).length : null, easingNamesCount: Array.isArray(names) ? names.length : names },
    serializeCssValueBadInput: (() => { try { const r = css.serializeCssValue?.({ kind: "bogus" }); return { threw: false, r: JSON.stringify(r)?.slice(0, 160) }; } catch (e) { return { threw: true, msg: String(e).slice(0, 160) }; } })(),
};
console.log(JSON.stringify(out, null, 2));
