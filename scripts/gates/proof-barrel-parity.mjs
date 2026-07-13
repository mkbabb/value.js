#!/usr/bin/env node
// proof:barrel-parity — value.js U.W-CANON U-F22 born-RED gate (G-CANON-3, the
// crown STANDING regression guard, CI-wired via `test:dist`).
//
// THE OBSERVABLE: the root barrel (`src/index.ts`) and the seven subpath barrels
// (`src/subpaths/*.ts`) must agree on the public surface. Concretely:
//
//   D1  every symbol a subpath barrel exports MUST also be exported by root
//       (root is definitionally the union of the whole public surface). No
//       subpath may expose a symbol the `.` monolith does not.
//
//   D2  every root symbol whose SOURCE module belongs to a subpath's owned
//       domain (color / units / math / easing / transform / quantize / parsing)
//       MUST appear in that owning subpath — UNLESS it is on the
//       rationale-annotated ALLOWLIST of intentional root-only asymmetries.
//
// Born-RED evidence (U.W-CANON, pre-cure): a copy-omission across three tranche
// edits left 10 VALUE symbols (+5 types) drifted bidirectionally —
// ICtCpColor/JzazbzColor absent from /color; parseAnimationTimelineList/
// extractNamedTimelines absent from /parsing; the raytrace + OKLCh-slice
// samplers present on /color but absent from root. Ships live in dist `.d.ts`,
// with NO parity gate. This gate is that missing guard: it keeps the surface
// honest across every future tranche edit, so a barrel omission fails CI at the
// diff instead of shipping.
//
// The check parses the SOURCE barrels (deterministic, build-independent — the
// generated `.d.ts` is emitted FROM this source, so source parity guarantees
// dist parity; and `test:dist` builds first, so a bad export name fails the
// build before this gate runs).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

// ── barrel parse ────────────────────────────────────────────────────────────
// Strip comments FIRST (the barrels carry heavy inline rationale inside export
// blocks), then extract every `export [type] { … } from "src"` name with its
// value/type kind and source module.
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

function parseBarrel(rel) {
    const src = stripComments(readFileSync(resolve(root, rel), "utf8"));
    const values = new Map(); // exportedName -> sourceModule
    const types = new Map();
    const re = /export\s+(type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(src))) {
        const blockIsType = !!m[1];
        const source = m[3];
        for (const raw of m[2].split(",")) {
            let name = raw.trim();
            if (!name) continue;
            let isType = blockIsType;
            const tm = name.match(/^type\s+(.+)$/); // inline `type Foo`
            if (tm) { isType = true; name = tm[1].trim(); }
            const am = name.match(/.+?\s+as\s+(.+)$/); // `Foo as Bar` -> Bar
            if (am) name = am[1].trim();
            if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)) continue;
            (isType ? types : values).set(name, source);
        }
    }
    return { values, types };
}

const SUBPATHS = ["color", "units", "math", "easing", "transform", "quantize", "parsing"];
const barrels = { root: parseBarrel("src/index.ts") };
for (const s of SUBPATHS) barrels[s] = parseBarrel(`src/subpaths/${s}.ts`);

// ── owned-domain map: a root export's SOURCE module → the subpath that owns it ─
// The order encodes precedence for overlapping trees (units/color → color;
// parsing/timeline/easing → easing before the generic parsing catch). A source
// with no owning subpath (e.g. `./utils` general helpers — no `utils` subpath)
// returns null and is skipped by D2.
function owner(source) {
    if (source.includes("units/color")) return "color";
    if (source === "./math") return "math";
    if (source === "./easing") return "easing";
    if (source.includes("parsing/timeline/easing")) return "easing";
    if (source.includes("transform/")) return "transform";
    if (source.includes("quantize")) return "quantize";
    if (source.includes("parsing")) return "parsing";
    if (source.includes("units")) return "units";
    return null;
}

// ── ALLOWLIST — intentional root-only asymmetries (D2 exclusions) ─────────────
// Each entry: a root symbol whose owned domain is a subpath, DELIBERATELY left
// out of that subpath, with the rationale for the asymmetry. The ONLY current
// class is the `/units` subpath's parse-that-FREE curation: `units/normalize`,
// `units/layout-cache`, and `units/interpolate` all ride `parseCSSValue` (the
// computed-endpoint resolver re-parses the live box), so exporting them from the
// parse-that-FREE `/units` subpath would drag the whole grammar back in and
// break the `proof:subpath-budget` C4 invariant. They live on the `.` monolith
// and the parse-that-COUPLED `./parsing` subpath instead. (See src/subpaths/
// units.ts header + src/subpaths/CLAUDE.md "budget invariant".)
const ALLOWLIST = {
    units: {
        rationale:
            "parse-that-COUPLED surface (units/normalize · units/layout-cache · " +
            "units/interpolate all import parseCSSValue) — excluded from the " +
            "parse-that-FREE /units subpath to hold proof:subpath-budget C4",
        symbols: new Set([
            "normalizeNumericUnits",
            "normalizeValueUnits",
            "NormalizeValueUnitsOptions",
            "getComputedValue",
            "bumpLayoutEpoch",
            "getLayoutEpoch",
            "COMPUTED_MEMO_MAX_ENTRIES",
            "lerpValue",
            "lerpComputedValue",
            "lerpColorValue",
            "lerpNumericValue",
            "prepareInterpVar",
        ]),
    },
};

const inBarrel = (b, name) => b.values.has(name) || b.types.has(name);

// ── run ───────────────────────────────────────────────────────────────────
const violations = [];

// D1 — subpath ⊆ root.
for (const s of SUBPATHS) {
    const b = barrels[s];
    for (const name of [...b.values.keys(), ...b.types.keys()]) {
        if (!inBarrel(barrels.root, name)) {
            violations.push(
                `D1  /${s} exports '${name}' but the ROOT barrel does not — ` +
                    `add it to src/index.ts (root is the union of the surface).`,
            );
        }
    }
}

// D2 — root owned-domain symbol ∈ owning subpath ∪ allowlist.
const checkD2 = (map, kind) => {
    for (const [name, source] of map) {
        const own = owner(source);
        if (!own) continue;
        if (inBarrel(barrels[own], name)) continue;
        if (ALLOWLIST[own]?.symbols.has(name)) continue;
        violations.push(
            `D2  root ${kind} '${name}' (${source}) is missing from its owning ` +
                `/${own} subpath — add it to src/subpaths/${own}.ts, or allowlist ` +
                `it with a rationale if the asymmetry is intentional.`,
        );
    }
};
checkD2(barrels.root.values, "value");
checkD2(barrels.root.types, "type");

// Allowlist hygiene — every allowlist entry must document a REAL current
// asymmetry (the symbol is genuinely absent from the subpath it excludes).
// A stale entry (symbol since added to the subpath) is flagged so the allowlist
// cannot rot into a rubber-stamp.
for (const [sub, { symbols }] of Object.entries(ALLOWLIST)) {
    for (const name of symbols) {
        if (inBarrel(barrels[sub], name)) {
            violations.push(
                `STALE  allowlist entry '${name}' for /${sub} is no longer an ` +
                    `asymmetry (the symbol IS exported by /${sub}) — remove the ` +
                    `allowlist entry.`,
            );
        }
    }
}

// ── report ──────────────────────────────────────────────────────────────────
const rootTotal = barrels.root.values.size + barrels.root.types.size;
console.log("proof:barrel-parity — root ⇄ subpath barrel coherence (U-F22 / G-CANON-3)\n");
console.log(`  root barrel: ${barrels.root.values.size} values + ${barrels.root.types.size} types = ${rootTotal} symbols`);
for (const s of SUBPATHS) {
    const b = barrels[s];
    console.log(`  /${s.padEnd(9)} ${b.values.size} values + ${b.types.size} types`);
}
console.log(
    `\n  allowlisted intentional root-only asymmetries: ${
        Object.values(ALLOWLIST).reduce((n, e) => n + e.symbols.size, 0)
    } (see ALLOWLIST rationale)\n`,
);

if (violations.length) {
    console.error(`GATE RED: ${violations.length} barrel-parity violation(s):\n`);
    for (const v of violations) console.error("  " + v);
    process.exit(1);
}
console.log("GATE GREEN: every subpath symbol ∈ root, every root domain symbol ∈ its subpath (∪ allowlist).");
