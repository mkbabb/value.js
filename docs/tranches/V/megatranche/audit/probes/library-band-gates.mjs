#!/usr/bin/env node
/**
 * LIBRARY BAND — born-RED gates for the rows this band ADDS to the registry.
 *
 * Scope (L-9): the BUILT artifact under dist/subpaths/ + the src barrels. Never
 * node_modules, never test-results. Run from the value.js repo root.
 *
 *   node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs
 *
 * Exit 1 while any block is RED. Blocks:
 *
 *   LIB-01  ./easing `easing(name)` is prototype-reachable — 5 keys crash.
 *           NOT covered by r1-published-totality.mjs (that probe's FNS list is
 *           the 9 ./css parsers) and NOT covered by src-surface-totality.mjs
 *           (MTS-01/02 cover ./css only). A THIRD instance of one mechanism.
 *   LIB-02  Non-string totality across the WHOLE published surface, not the 9
 *           CSS parsers: 33 exported functions throw on at least one of the 7
 *           JS-boundary values. G1's corpus is empty-argument strings only, so
 *           G1 is structurally blind to both LIB-01 and MTS-01 (L-12).
 *   LIB-03  THE PUBLIC-SURFACE LAW, asserted mechanically: every subpath barrel
 *           forwards every type its own signatures name (zero bare `declare`
 *           in the emitted d.ts), and every leaf `export` is either forwarded
 *           to a subpath or not exported.
 *   LIB-04  Colour-type module identity: outside src/color/, colour types come
 *           from the barrel `./color/index` only — the `_2` duplication in
 *           css.d.ts is the observable. (Corrects the naive ban, which would
 *           cycle: src/color/anchors.ts and operations.ts MUST import ./model.)
 *   LIB-05  The god-module cap, measured over src/ only.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const sub = (n) => import(pathToFileURL(resolve(`dist/subpaths/${n}.js`)).href);

let red = 0;
const RED = (id, msg) => { red++; console.log(`RED  ${id}  ${msg}`); };
const OK = (id, msg) => console.log(`ok   ${id}  ${msg}`);

const SUBPATHS = ["color", "value", "css", "easing", "math", "transform", "quantize"];

// ── LIB-01 ───────────────────────────────────────────────────────────────────
{
    const E = await sub("easing");
    // Object.prototype members reachable through `name in PRESETS` (src/easing.ts:168),
    // then destructured at :169. `PRESETS` is a plain object literal.
    const POISON = ["constructor", "__proto__", "toString", "valueOf", "hasOwnProperty"];
    const crashed = [];
    for (const n of POISON) {
        try { E.easing(n); } catch (e) { crashed.push(`${n}: ${e.constructor.name}`); }
    }
    if (crashed.length) {
        RED("LIB-01", `easing(name) throws on ${crashed.length}/${POISON.length} Object.prototype keys — ${crashed[0]}`);
        RED("LIB-01", `mechanism src/easing.ts:168 \`if (!(name in PRESETS))\` admits the prototype chain; :169 destructures the result`);
    } else OK("LIB-01", "easing(name) is total over the Object.prototype key set");

    // Control: the resolver must still work and still reject honestly.
    const ctl = E.easing("ease");
    const unk = E.easing("definitely-not-an-easing");
    if (!ctl.ok || unk.ok || unk.error.code !== "easing_name_unknown") {
        RED("LIB-01", "CONTROL BROKEN — easing('ease') / unknown-name behaviour changed");
    } else OK("LIB-01", "control: easing('ease') ok, unknown name -> easing_name_unknown");
}

// ── LIB-02 ───────────────────────────────────────────────────────────────────
{
    const HOSTILE = [undefined, null, 42, {}, [], "", NaN];
    const offenders = [];
    for (const s of SUBPATHS) {
        const M = await sub(s);
        for (const [name, fn] of Object.entries(M)) {
            if (typeof fn !== "function") continue;
            let n = 0;
            for (const h of HOSTILE) { try { fn(h); } catch { n++; } }
            if (n > 0) offenders.push([s, name, n]);
        }
    }
    if (offenders.length) {
        RED("LIB-02", `${offenders.length} published functions throw on a JS-boundary value (7-value corpus, all 7 subpaths)`);
        const byPath = {};
        for (const [s, , ] of offenders) byPath[s] = (byPath[s] ?? 0) + 1;
        RED("LIB-02", `by subpath: ${Object.entries(byPath).map(([k, v]) => `${k}=${v}`).join(" ")}`);
        RED("LIB-02", `G1 (r1-published-totality.mjs) names 9 ./css parsers only — ${offenders.filter(o => o[0] !== "css").length} of these are outside its FNS list`);
    } else OK("LIB-02", "every published function is total over the JS boundary");
}

// ── LIB-03 ───────────────────────────────────────────────────────────────────
{
    let bare = 0;
    const perFile = [];
    for (const s of SUBPATHS) {
        const src = readFileSync(`dist/subpaths/${s}.d.ts`, "utf8");
        const n = (src.match(/^declare (type|interface|function|const|class)/gm) ?? []).length;
        if (n) perFile.push(`${s}=${n}`);
        bare += n;
    }
    if (bare) RED("LIB-03", `${bare} bare \`declare\` in the emitted subpath d.ts — unnameable from the subpath that returns them (${perFile.join(" ")})`);
    else OK("LIB-03", "every emitted subpath type is exported");

    // The leaf-export vs barrel-forward reconciliation, on the two known holes.
    const CSS = await sub("css");
    const holes = [];
    if (!("serializeCssValue" in CSS)) holes.push("serializeCssValue (src/css/stylesheet.ts:81)");
    if (!("serializeKeyframeSelector" in CSS)) holes.push("serializeKeyframeSelector (src/css/grammar.ts:429)");
    if (holes.length) RED("LIB-03", `./css exports serializeCssColor but withholds the general serializers: ${holes.join(", ")}`);
    else OK("LIB-03", "./css forwards its general serializers");

    const COLOR = await sub("color");
    const colorIdx = readFileSync("src/color/index.ts", "utf8");
    const colorSub = readFileSync("src/subpaths/color.ts", "utf8");
    if (colorIdx.includes("ColorFactory") && !colorSub.includes("ColorFactory")) {
        RED("LIB-03", `ColorFactory exported at src/color/index.ts, dropped by src/subpaths/color.ts — the type of ${Object.keys(COLOR).filter(k => typeof COLOR[k] === "function").length} factories is unnameable`);
    } else OK("LIB-03", "ColorFactory reaches ./color");

    // The AST types ./css returns but does not name (the /css + /value tax).
    const cssDts = readFileSync("dist/subpaths/css.d.ts", "utf8");
    const named = ["CssValue", "CssScalar", "CssCall", "CssList"];
    const unexported = named.filter((t) => new RegExp(`^declare type ${t} `, "m").test(cssDts));
    if (unexported.length) RED("LIB-03", `./css returns but cannot name: ${unexported.join(", ")} — a consumer must take a second dependency on ./value`);
    else OK("LIB-03", "./css names its own return types");
}

// ── LIB-04 ───────────────────────────────────────────────────────────────────
{
    const cssDts = readFileSync("dist/subpaths/css.d.ts", "utf8");
    const dupes = (cssDts.match(/\b\w+_2\b/g) ?? []);
    const uniq = [...new Set(dupes)];
    if (uniq.length) RED("LIB-04", `css.d.ts emits ${uniq.length} duplicated colour declarations under mangled names (${uniq.join(", ")}), ${dupes.length} references`);
    else OK("LIB-04", "no duplicated declarations in css.d.ts");

    // The CORRECT rule (not the naive ban): outside src/color/, the model module
    // is unreachable — src/color/anchors.ts and operations.ts MUST use ./model or
    // the barrel cycles.
    const walk = (d, acc = []) => {
        for (const e of readdirSync(d)) {
            const p = join(d, e);
            if (statSync(p).isDirectory()) walk(p, acc);
            else if (p.endsWith(".ts")) acc.push(p);
        }
        return acc;
    };
    const outside = walk("src")
        .filter((f) => !f.startsWith("src/color/"))
        .filter((f) => /from\s+["'][^"']*color\/model["']/.test(readFileSync(f, "utf8")));
    if (outside.length) RED("LIB-04", `${outside.length} module(s) outside src/color/ reach colour types past the barrel: ${outside.join(", ")}`);
    else OK("LIB-04", "colour types cross src/color/'s boundary through the barrel only");
}

// ── LIB-05 ───────────────────────────────────────────────────────────────────
{
    const walk = (d, acc = []) => {
        for (const e of readdirSync(d)) {
            const p = join(d, e);
            if (statSync(p).isDirectory()) walk(p, acc);
            else if (p.endsWith(".ts")) acc.push(p);
        }
        return acc;
    };
    const over = walk("src")
        .map((f) => [f, (readFileSync(f, "utf8").match(/\n/g) ?? []).length])  // wc -l semantics
        .filter(([, n]) => n > 350)
        .sort((a, b) => b[1] - a[1]);
    if (over.length) RED("LIB-05", `${over.length} src files over the 350-LoC cap: ${over.map(([f, n]) => `${f}=${n}`).join(" ")}`);
    else OK("LIB-05", "no src file over the 350-LoC cap");
}

console.log(red ? `\nRED — ${red} failing assertion(s)` : "\nGREEN");
process.exit(red ? 1 : 0);
