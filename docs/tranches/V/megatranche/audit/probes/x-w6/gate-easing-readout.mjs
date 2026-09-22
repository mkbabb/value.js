// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.d · gate **d2** — THE EASING READOUT IS THE GLASS FIELD PRIMITIVE, OR A
// DATED ASK CARRIES THE CENSUS THAT PROVES NO PRIMITIVE FITS.
//
//   node docs/tranches/V/megatranche/audit/probes/x-w6/gate-easing-readout.mjs
//
// RED at open (`W6.md:224`): *"flat beige rounded rect with copy/configure icon
// buttons, none of the glass input register — owner witness
// `OM-13-easing-readout-not-glass-input.png`; census today: `./input` absent
// from the exports map, `LabeledInput` has zero trailing slots."*
//
// `W6.md:226` makes this gate **two-way**, and that is the whole reason this
// file is not three lines long:
//
//   *"d2 fails in both directions — if the readout is locally restyled instead
//    of composed, and equally if a fitting published primitive exists at open
//    and the wave filed a letter instead. (This is what stops d2 being
//    satisfiable by writing prose.)"*
//
// So the gate does NOT read the ask and stop. It re-runs the census itself,
// against the installed producer, and DECIDES the branch. Only then does it
// check that the wave took the branch the census selects.
//
//   L1 · THE CENSUS, RE-RUN HERE. Every field primitive the installed
//        `@mkbabb/glass-ui` publishes is enumerated at runtime and its shipped
//        slot surface read out of its own `.d.ts`. Nothing is inherited from
//        the spec's prose (L-18 target 4, citation inheritance).
//   L2 · DOES ONE FIT? A primitive fits this readout iff it can host a
//        read-only literal and two trailing icon actions WITHOUT inventing a
//        label the design does not have. Measured as two conditions:
//        (a) its `label` prop is optional, and (b) it offers a leading or
//        trailing action slot. Both are read from the shipped declarations.
//   L3 · THE WAVE TOOK THE CENSUS'S BRANCH. If one fits → the readout must
//        COMPOSE it (import + render). If none fits → the dated ask must exist
//        and carry the census. Taking the other branch reds, in either
//        direction. This is `W6.md:226` implemented rather than quoted.
//   L4 · AND NEVER A LOCAL RESTYLE. The ask branch is only honest while the
//        readout was left alone. This leg reads this wave's OWN diff over
//        `GradientEasingEditor.vue` and reds if it added a class or a style
//        rule to the readout rail — the exact shortcut `W6.md:217` bans
//        (*"never a local restyle", M-14 clause 1, glass-first law*).
//   L5 · THE LOAD-BEARING FACT IS STILL TRUE. `./input` absent from the packed
//        exports map is what makes the ask's case; it is re-read every run, so
//        the day the producer publishes it, this gate reds and `.d` re-reads
//        its own branch rather than inheriting a stale census.
//
// STALE-SERVER LAW: headless against the installed package and the git tree.
// No dev server, no render — a slot surface is a declaration fact.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../../../..");
const PKG = resolve(ROOT, "node_modules/@mkbabb/glass-ui");
const ASK = resolve(ROOT, "docs/tranches/X/waves/W6-glass-ask-easing-readout.md");
const EDITOR = resolve(
    ROOT,
    "demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue",
);

// This wave's first commit; its parent is the pre-wave tree. Provenance:
// `X-W6.md` §Close commit table and the LEDGER's X-W6 row both name
// `f90aeb02` as the wave's first landing.
const WAVE_BASE = "f90aeb02";

const failures = [];
const fail = (message) => failures.push(message);

// --------------------------------------------------------------- L1: census
const pkgJson = JSON.parse(readFileSync(join(PKG, "package.json"), "utf8"));
const subpaths = Object.keys(pkgJson.exports);
const version = pkgJson.version;

// The published subpaths that could carry a field/input register at all.
const FIELD_SUBPATHS = ["./labeled-field", "./number-field", "./input"].filter((s) =>
    subpaths.includes(s),
);

/** Read a component's `__VLS_Slots` surface out of its shipped `.d.ts`. */
function slotsOf(dtsPath) {
    if (!existsSync(dtsPath)) return null;
    const source = readFileSync(dtsPath, "utf8");
    // The declaration runs to its own closing `};` at line start — NOT to the
    // first `;`, which sits inside the first slot's own signature and would
    // silently drop every slot after it. (Caught by reading the printed census
    // against the shipped `.d.ts`: `LabeledField`'s `error` slot was missing.)
    const block = source.match(/type __VLS_Slots = ([\s\S]*?)\n};\n/);
    if (!block) return [];
    return [...block[1].matchAll(/(?:^|[{&;\s])([A-Za-z][A-Za-z0-9_]*)\s*\??\s*[(:]/g)]
        .map((m) => m[1])
        .filter((name) => name !== "props" && name !== "unknown" && name !== "any");
}

const componentsDir = join(PKG, "dist/components");
const census = [];
for (const subpath of FIELD_SUBPATHS) {
    const dir = join(componentsDir, subpath.replace("./", ""));
    if (!existsSync(dir)) continue;
    const names = readdirSync(dir).filter((f) => f.endsWith(".vue.d.ts"));
    // the props file every labeled-field component shares
    const typesPath = join(dir, "types.d.ts");
    const types = existsSync(typesPath) ? readFileSync(typesPath, "utf8") : "";
    for (const file of names) {
        const component = file.replace(".vue.d.ts", "");
        const slots = slotsOf(join(dir, file)) ?? [];
        // Does this component REQUIRE a visible label the readout does not
        // have? `label: string` (no `?`) in the register's own props file is
        // the required form; a register with no `label` prop at all — the
        // number-field — imposes none, which is what the fit test asks.
        const labelRequired = /(\n|\{)\s*label:\s*string;/.test(types);
        census.push({ subpath, component, slots, labelRequired });
    }
}

if (census.length === 0) {
    fail(
        "no field primitive could be censused — the installed producer tree is not readable",
    );
}

// ------------------------------------------------------ L2: does one FIT?
const ACTION_SLOT =
    /^(leading|trailing|prefix|suffix|prepend|append|actions?|start|end)$/i;
const fitting = census.filter(
    (row) => !row.labelRequired && row.slots.some((slot) => ACTION_SLOT.test(slot)),
);

// ------------------------------------------- L3: the wave took that branch
const editor = existsSync(EDITOR) ? readFileSync(EDITOR, "utf8") : "";
const composes = census.some(
    (row) =>
        new RegExp(`\\b${row.component}\\b`).test(editor) &&
        new RegExp(`from\\s*"@mkbabb/glass-ui${row.subpath.slice(1)}"`).test(editor),
);
const askExists = existsSync(ASK);
const ask = askExists ? readFileSync(ASK, "utf8") : "";

if (fitting.length > 0) {
    // The census selects COMPOSITION. A letter here is the falsifier's second
    // direction firing.
    if (!composes) {
        fail(
            `a fitting published primitive EXISTS (${fitting
                .map((r) => `${r.component} via ${r.subpath}`)
                .join(", ")}) and the readout does not compose it — ` +
                `W6.md:226 fails d2 in this direction explicitly`,
        );
    }
} else {
    // The census selects THE DATED ASK.
    if (composes) {
        fail(
            "the readout composes a primitive the census says does not fit — re-run the census",
        );
    }
    if (!askExists) {
        fail(
            `no published primitive fits and the dated ask is absent at ` +
                `${ASK.slice(ROOT.length + 1)}`,
        );
    } else {
        // The ask must CARRY the census, not describe it.
        if (!/2026-\d\d-\d\d/.test(ask)) fail("the ask carries no date");
        if (!ask.includes(version)) {
            fail(`the ask does not name the installed producer version ${version}`);
        }
        for (const row of census) {
            if (!new RegExp(`\\b${row.component}\\b`).test(ask)) {
                fail(
                    `the ask's census omits the published primitive \`${row.component}\``,
                );
            }
        }
        // the load-bearing exports fact must be stated, not implied
        if (!/\.\/input/.test(ask)) {
            fail(
                "the ask never states the `./input` exports-map reading its case rests on",
            );
        }
        // every slot the gate measured must appear beside its component
        for (const row of census) {
            const stated = ask.match(new RegExp(`\\b${row.component}\\b[^\\n]*`, "g"));
            if (!stated) continue;
            const line = stated.join(" ");
            for (const slot of row.slots) {
                if (!new RegExp(`\\b${slot}\\b`).test(line)) {
                    fail(
                        `the ask states \`${row.component}\` without its shipped slot ` +
                            `\`${slot}\` — the census must be pasted, not summarised`,
                    );
                }
            }
        }
    }
}

// ------------------------------------------------- L4: never a local restyle
// SCOPE (addendum 2026-09-22, X-W6 Repair 1): the leg's predicate is "added a
// class or a style rule TO THE READOUT RAIL" (header, L4). Its first
// implementation read EVERY styling line in `GradientEasingEditor.vue` — the
// file that also hosts the whole easing panel — so d1's radius register (an
// edit to the panel's rows, strip and well that never touches the readout)
// would have read as a readout restyle, and d1 and d2 could not both be green.
// The leg now reads what its predicate names: the readout rail's own markup
// block and the style rules that select its parts, at the committed bytes.
// Any added line inside either still reds, exactly as before.
//
// PRECISION (second addendum, 2026-09-22, X-W6 Repair 1 — `.e`'s e2): inside a
// style rule the leg reds on an added DECLARATION of a paint or box property
// (background*, border*, padding*, margin*, box-shadow, outline*, color, font*),
// not on the substring "background" wherever it occurs. Moving the readout's
// existing `transition: color …, background-color …` into a
// `prefers-reduced-motion: no-preference` block (e2's structural PRM law)
// restyles nothing — the continuation line `background-color var(--duration…)`
// names a TRANSITIONED property, it paints none. In the markup block any added
// class binding still reds.
const READOUT_PARTS = /\.(readout-rail|rail-btn|rail-tick)\b/;

function readoutRanges(src) {
    const lines = src.split("\n");
    const ranges = [];
    const open = lines.findIndex((l) => /class="readout-rail\b/.test(l));
    if (open >= 0) {
        let start = open;
        while (start > 0 && !/<div\b/.test(lines[start])) start--;
        const indent = lines[start].match(/^\s*/)[0];
        let end = start + 1;
        while (end < lines.length && !lines[end].startsWith(`${indent}</div>`)) end++;
        ranges.push([start + 1, end + 1, "markup"]);
    }
    const styleAt = lines.findIndex((l) => /^<style\b/.test(l));
    for (let i = Math.max(0, styleAt); styleAt >= 0 && i < lines.length; i++) {
        if (!READOUT_PARTS.test(lines[i])) continue;
        let j = i;
        while (j < lines.length && !lines[j].includes("{")) j++;
        let k = j;
        while (k < lines.length && !/^\}/.test(lines[k])) k++;
        ranges.push([i + 1, k + 1, "style"]);
        i = k;
    }
    return ranges;
}

let touched = "";
let headEditor = "";
try {
    touched = execFileSync(
        "git",
        ["diff", "-U0", `${WAVE_BASE}^..HEAD`, "--", EDITOR],
        {
            cwd: ROOT,
            encoding: "utf8",
        },
    );
    headEditor = execFileSync(
        "git",
        ["show", `HEAD:${EDITOR.slice(ROOT.length + 1)}`],
        { cwd: ROOT, encoding: "utf8" },
    );
} catch {
    fail(`this wave's diff over ${EDITOR.slice(ROOT.length + 1)} could not be read`);
}
const ranges = readoutRanges(headEditor);
if (ranges.length === 0) {
    fail(
        "the readout rail could not be located in the committed editor — L4 has nothing to read",
    );
}
const addedStyle = [];
let newLine = 0;
for (const line of touched.split("\n")) {
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
        newLine = Number(hunk[1]);
        continue;
    }
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    if (line.startsWith("+")) {
        const hit = ranges.find(([a, b]) => newLine >= a && newLine <= b);
        const body = line.slice(1);
        const restyles =
            hit?.[2] === "markup"
                ? /\bclass=|\bclass:|\bstyle=|:style=/.test(body)
                : hit?.[2] === "style"
                  ? /^\s*(background|border|padding|margin|box-shadow|outline|color|font)[a-z-]*\s*:/.test(
                        body,
                    )
                  : false;
        if (restyles) {
            addedStyle.push(`${newLine}: ${line}`);
        }
        newLine++;
    }
}
if (addedStyle.length > 0) {
    fail(
        `this wave added ${addedStyle.length} styling line(s) to the readout rail — ` +
            `W6.md:217 bans a local restyle in favour of the dated ask: ` +
            addedStyle[0].trim().slice(0, 90),
    );
}

// --------------------------------------------------- L5: the exports reading
const inputPublished = subpaths.includes("./input");
if (inputPublished && !composes) {
    fail(
        "`./input` is now a published subpath — the ask's census is stale and d2 must re-read it",
    );
}

// ------------------------------------------------------------------ verdict
const green = failures.length === 0;
console.log(
    [
        `GATE d2 (easing readout) — ${green ? "GREEN" : "RED"}`,
        `  installed @mkbabb/glass-ui ${version}; field subpaths published: ` +
            `${FIELD_SUBPATHS.join(" ") || "none"}; \`./input\` published: ${inputPublished}`,
        ...census.map(
            (row) =>
                `    ${row.subpath.padEnd(16)} ${row.component.padEnd(22)} ` +
                `label ${row.labelRequired ? "REQUIRED" : "optional"}  ` +
                `slots [${row.slots.join(", ") || "—"}]`,
        ),
        `  fitting primitives (optional label AND a leading/trailing action slot): ` +
            `${fitting.length === 0 ? "NONE" : fitting.map((r) => r.component).join(", ")}`,
        `  branch selected by the census: ${fitting.length > 0 ? "COMPOSE" : "DATED ASK"}; ` +
            `wave composes=${composes} ask=${askExists}`,
        `  local restyle of the readout in this wave's diff: ${addedStyle.length} line(s) ` +
            `(readout ranges read at HEAD: ${ranges.map(([a, b, k]) => `${a}-${b} ${k}`).join(", ")})`,
        ...failures.map((message) => `  FAIL ${message}`),
    ].join("\n"),
);

process.exit(green ? 0 : 1);
