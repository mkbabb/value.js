// SERVED MODEL: claude-opus-5[1m]
//
// G32 — "Channel descriptors resolve exactly" (X-W9 §Hard Gate, W9.md:374).
//
// Command of record: a node run over all 17 spaces x their `ChannelsBySpace`
// ids. No browser, no vitest, no vue runtime.
//
// The probe reads THREE live surfaces and never restates them:
//   1. `src/color/model.ts` — the library's `ChannelsBySpace` type is the id
//      vocabulary (W9.md:309: "No new library export: the id vocabulary already
//      exists and a second one would be a duplicate authority"). The tuple
//      element LABELS are the ids; they are parsed out of the type's own bytes.
//   2. `demo/color-session/colorSpaceInfo.ts` — the descriptor table under cure.
//   3. `demo/picker/controls/ComponentSliders/ConsoleRail.vue` — the SHIPPED
//      `componentDescription()` is lifted out of the component's own bytes and
//      executed here, so the gate measures the resolver the product runs rather
//      than a restatement of it.
//
// Exit 0 = every (space, channel id) pair resolves to exactly its own
// descriptor. Exit 1 = any pair misses, degrades to the bare key, or resolves
// to another channel's row.

import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { transformSync } from "esbuild";

const ROOT = resolve(import.meta.dirname, "../../../../../..");
const MODEL_TS = join(ROOT, "src/color/model.ts");
const INFO_TS = join(ROOT, "demo/color-session/colorSpaceInfo.ts");
const RAIL_VUE = join(
    ROOT,
    "demo/picker/controls/ComponentSliders/ConsoleRail.vue",
);

const scratch = mkdtempSync(join(tmpdir(), "g32-"));

/** Load a TypeScript module by transpiling it to ESM and importing it. */
async function loadTs(source, name) {
    const js = transformSync(source, { loader: "ts", format: "esm" }).code;
    const file = join(scratch, name);
    writeFileSync(file, js);
    return import(pathToFileURL(file).href);
}

// --- 1. The id vocabulary, parsed from the library's own type ---------------

/** `ChannelsBySpace` -> { [spaceId]: readonly channel ids, in tuple order }. */
function channelsBySpace(source) {
    const block = /export type ChannelsBySpace = \{([\s\S]*?)\n\};/.exec(source);
    if (!block) throw new Error("ChannelsBySpace not found in src/color/model.ts");
    const spaces = {};
    for (const line of block[1].split("\n")) {
        const row = /^\s*"?([a-z0-9-]+)"?:\s*readonly \[(.+)\];\s*$/.exec(line);
        if (!row) continue;
        spaces[row[1]] = row[2]
            .split(",")
            .map((entry) => entry.split(":")[0].trim());
    }
    return spaces;
}

// --- 2. The resolver, lifted from the component's own bytes -----------------

/** Extract `function componentDescription(...) { ... }` by brace matching. */
function extractFunction(source, name) {
    const start = source.indexOf(`function ${name}(`);
    if (start === -1) throw new Error(`${name}() not found in ConsoleRail.vue`);
    const open = source.indexOf("{", source.indexOf(")", start));
    let depth = 0;
    for (let i = open; i < source.length; i++) {
        if (source[i] === "{") depth++;
        else if (source[i] === "}" && --depth === 0) {
            return source.slice(start, i + 1);
        }
    }
    throw new Error(`${name}() is unbalanced in ConsoleRail.vue`);
}

// --- 3. The three legs ------------------------------------------------------
//
// L1 KEYED   — the space's descriptor table is keyed by exactly the library's
//              channel ids (set equality, no extras, no holes). An UNKEYED
//              (positional) table cannot attribute a descriptor to an id at
//              all: that is the defect's root, not a symptom of it.
// L2 EXACT   — the shipped resolver returns that table's entry for that id.
// L3 HONEST  — the descriptor is a non-empty string, is not the bare id
//              (silent degradation, e.g. `jz` -> "jz"), and is unique within
//              its space (cross-row resolution, e.g. `cp` -> "Ct (tritan)").

const spaces = channelsBySpace(readFileSync(MODEL_TS, "utf8"));
const spaceIds = Object.keys(spaces);

const info = (await loadTs(readFileSync(INFO_TS, "utf8"), "info.mjs"))
    .colorSpaceInfo;

const railSource = readFileSync(RAIL_VUE, "utf8");
const factory = `export function make(colorSpaceInfo, currentColorSpace) {
${extractFunction(railSource, "componentDescription")}
return componentDescription;
}`;
const ref = { value: null };
const describe = (await loadTs(factory, "rail.mjs")).make(info, ref);

const failures = [];
const rows = [];
let pairs = 0;

for (const space of spaceIds) {
    const ids = spaces[space];
    const table = info[space]?.components;
    const keyed =
        table !== undefined && !Array.isArray(table) && typeof table === "object";
    const keys = keyed ? Object.keys(table) : [];
    const sameKeys =
        keyed &&
        keys.length === ids.length &&
        ids.every((id) => Object.hasOwn(table, id));
    if (!sameKeys) {
        failures.push(
            `L1 ${space}: descriptor table is ${
                table === undefined
                    ? "ABSENT"
                    : Array.isArray(table)
                      ? `UNKEYED (positional [${table.join(", ")}])`
                      : `keyed [${keys.join(", ")}]`
            }, expected keys [${ids.join(", ")}]`,
        );
    }
    const seen = new Map();
    for (const id of ids) {
        pairs++;
        ref.value = space;
        const got = describe(id);
        rows.push({ space, id, got });
        const want = sameKeys ? table[id] : undefined;
        if (sameKeys && got !== want) {
            failures.push(`L2 ${space}.${id}: resolver "${got}" != table "${want}"`);
        }
        if (typeof got !== "string" || got.length === 0) {
            failures.push(`L3 ${space}.${id}: not a string descriptor (${got})`);
        } else if (got === id) {
            failures.push(`L3 ${space}.${id}: degrades to the bare key "${got}"`);
        } else if (seen.has(got)) {
            failures.push(
                `L3 ${space}.${id}: resolves to ${seen.get(got)}'s row "${got}"`,
            );
        }
        if (typeof got === "string") seen.set(got, id);
    }
}

// --- 4. The two named RED witnesses (W9.md:374) -----------------------------

ref.value = "ictcp";
const cp = describe("cp");
ref.value = "jzazbz";
const jz = describe("jz");

console.log(`G32 channel-descriptor resolution`);
console.log(`  spaces (ChannelsBySpace)  : ${spaceIds.length}`);
console.log(`  (space, channel id) pairs : ${pairs}`);
console.log(`  failures                  : ${failures.length}`);
console.log(`  witness ictcp.cp          : ${JSON.stringify(cp)}`);
console.log(`  witness jzazbz.jz         : ${JSON.stringify(jz)}`);
for (const f of failures) console.log(`  FAIL ${f}`);
if (process.env.G32_ROWS === "1") {
    for (const r of rows) console.log(`  ROW ${r.space}.${r.id} -> ${JSON.stringify(r.got)}`);
}
if (spaceIds.length !== 17) {
    console.log(`  FAIL denominator: ${spaceIds.length} spaces, expected 17`);
    process.exit(1);
}
console.log(failures.length === 0 ? "G32 GREEN" : "G32 RED");
process.exit(failures.length === 0 ? 0 : 1);
