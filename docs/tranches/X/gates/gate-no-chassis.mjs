// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · H1 — NO COPIED CHASSIS (wave-level non-regression, CC-108).
 *
 * W6.md:337 — "over this wave's diff: no new module, composable, or style block
 * reproduces the dead `InstrumentChassis` shape (a shared stage/inspector/action
 * housing parameterised across instruments)."
 *
 * WHY IT IS A SUBTRACTION GATE. A-17 killed the chassis producer-side, so there
 * is nothing on disk to delete: our posture is a FACT to preserve, not a
 * prohibition to police. A green-at-open gate is only admissible because its
 * falsifier is a *new* artefact — which is why this gate reads THIS WAVE'S OWN
 * ADDED LINES and nothing else. A chassis that predates the wave is not H1's;
 * a chassis the wave mints is.
 *
 * WHAT IT MEASURES. For every line the wave ADDED under `demo/`:
 *   (1) the dead name itself — `InstrumentChassis` / `useInstrumentChassis`;
 *   (2) a HOUSING declaration — one construct whose own surface parameterises a
 *       stage AND an inspector AND an action (props, slots, or parameters), i.e.
 *       the three limbs of the dead shape in one place;
 *   (3) a housing SHARED across instruments — any module the wave added that is
 *       imported by two or more distinct instrument roots.
 * Conditions (2) and (3) are reported independently; either one RED fails H1,
 * because a housing parameterised across instruments needs both the shape and
 * the fan-out and the wave can mint them in either order.
 *
 * VACUITY REFUSAL. A scan that never fires proves nothing, so the detector is
 * run first against a synthetic chassis-shaped input (POSITIVE CONTROL). If the
 * control does not trip every leg, the gate exits RED without reading the diff.
 * (The a9/a11 lesson of this wave, recorded at X.W6.a Act 5: an instrument that
 * cannot fail must not report green.)
 *
 * ENV: none. Reads git only. Exit 0 = GREEN, exit 1 = RED.
 *
 *   node docs/tranches/X/gates/gate-no-chassis.mjs [<commit> ...]
 *
 * With no argv the roster below — X-W6's own commits — is used. Four tracks
 * share this git index, so a `base..HEAD` range would sweep in three siblings'
 * bytes and H1 would police work it does not own; the roster is explicit for
 * that reason.
 */
import { execFileSync } from "node:child_process";

const ROSTER = process.argv.slice(2).length
    ? process.argv.slice(2)
    : [
          "f90aeb02", // .a — the §14 family, whole
          "c222542d", // .a — the a9 gutter
          "e0e204a9", // .f — X:CSS-1
      ];

const git = (...args) =>
    execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

// ── the detector ────────────────────────────────────────────────────────────
// A "limb" is one of the dead shape's three parameterised surfaces. We look for
// them as DECLARED surface — a prop, a slot, or a named parameter — never as a
// word in prose, so a comment that says "stage" cannot turn the gate red and a
// component that takes `stage`, `inspector` and `action` cannot hide from it.
const LIMB = {
    stage: /(?:^|[^A-Za-z])(?:stage|canvas|surface)(?:Slot|Component|Render|Props)?\s*[?:]|v-slot:stage\b|name="stage"|#stage\b/i,
    inspector: /(?:^|[^A-Za-z])(?:inspector|controls|panel)(?:Slot|Component|Render|Props)?\s*[?:]|v-slot:inspector\b|name="inspector"|#inspector\b/i,
    action: /(?:^|[^A-Za-z])(?:action|actions|actionSet)(?:Slot|Component|Render|Props)?\s*[?:]|v-slot:action\b|name="actions?"|#actions?\b/i,
};
const DEAD_NAME = /\bInstrumentChassis\b|\buseInstrumentChassis\b/;

/** @returns {{deadName:boolean, limbs:string[], housing:boolean}} */
const inspect = (text) => {
    const limbs = Object.entries(LIMB)
        .filter(([, re]) => re.test(text))
        .map(([k]) => k);
    return {
        deadName: DEAD_NAME.test(text),
        limbs,
        housing: limbs.length === 3,
    };
};

// ── positive control — the gate must be able to fail ─────────────────────────
const CONTROL = `
export function useInstrumentChassis(opts: {
    stage: Component;
    inspector: Component;
    action: SceneActionSet;
}) { return opts; }
`;
{
    const c = inspect(CONTROL);
    const bad = [];
    if (!c.deadName) bad.push("dead-name leg did not fire");
    if (!c.housing) bad.push(`housing leg saw only [${c.limbs.join(",")}] of 3`);
    if (bad.length) {
        console.log("GATE H1 — RED (VACUOUS DETECTOR, diff not read)");
        for (const b of bad) console.log("  · " + b);
        process.exit(1);
    }
    console.log("POSITIVE CONTROL — detector fires on a synthetic chassis: dead-name ✓  stage+inspector+action ✓");
}

// ── the wave's own added lines ──────────────────────────────────────────────
/** path -> added-line text */
const added = new Map();
/** path -> "A" | "M" */
const status = new Map();

for (const sha of ROSTER) {
    const names = git("show", "--name-status", "--format=", sha).trim().split("\n");
    for (const row of names) {
        if (!row) continue;
        const [st, path] = row.split("\t");
        if (!path || !path.startsWith("demo/")) continue;
        if (!status.has(path) || st.startsWith("A")) status.set(path, st[0]);
    }
    const patch = git("show", "--format=", "--unified=0", sha, "--", "demo/");
    let cur = null;
    for (const line of patch.split("\n")) {
        const m = /^\+\+\+ b\/(.+)$/.exec(line);
        if (m) {
            cur = m[1];
            if (!added.has(cur)) added.set(cur, []);
            continue;
        }
        if (cur && line.startsWith("+") && !line.startsWith("+++")) {
            added.get(cur).push(line.slice(1));
        }
    }
}

const paths = [...added.keys()].sort();
if (paths.length === 0) {
    console.log("GATE H1 — RED (the roster added no demo/ line; H1 would be vacuously green)");
    process.exit(1);
}

// ── leg 1 + 2 — the dead name and the housing shape, per file ───────────────
const failures = [];
const census = [];
for (const p of paths) {
    const text = added.get(p).join("\n");
    const r = inspect(text);
    census.push({ path: p, kind: status.get(p) ?? "M", limbs: r.limbs, deadName: r.deadName });
    if (r.deadName) failures.push(`${p}: revives the dead name InstrumentChassis`);
    if (r.housing)
        failures.push(`${p}: added lines parameterise stage + inspector + action in one construct`);
}

// ── leg 3 — a module the wave ADDED, imported by two instrument roots ───────
// An "instrument root" is the tree a live instrument owns. Two importers inside
// one instrument is composition; two across instruments is a housing.
const root = (p) => {
    const m = /^demo\/(workbenches\/[^/]+|picker|scenes\/[^/]+|color-session|color-picker)\b/.exec(p);
    return m ? m[1] : null;
};
const newModules = paths.filter((p) => status.get(p) === "A" && /\.(ts|vue)$/.test(p));
const fanout = [];
for (const mod of newModules) {
    const stem = mod.replace(/^demo\//, "").replace(/\.(ts|vue)$/, "");
    const base = stem.split("/").pop();
    let hits = [];
    try {
        hits = git("grep", "-l", "-E", `from ["'][^"']*${base}["']`, "--", "demo/")
            .trim()
            .split("\n")
            .filter(Boolean);
    } catch {
        hits = []; // git grep exits 1 on no match
    }
    const roots = [...new Set(hits.map(root).filter(Boolean))];
    fanout.push({ mod, roots, importers: hits.length });
    if (roots.length >= 2) {
        // Shared is only a defect when the shared thing is a HOUSING. A total
        // catalog or a format function shared across instruments is the OPPOSITE
        // of a chassis — it is one truth, not one shell.
        const text = added.get(mod).join("\n");
        if (inspect(text).limbs.length >= 2)
            failures.push(
                `${mod}: added module carries ${inspect(text).limbs.length} housing limbs AND is imported by ${roots.length} instrument roots (${roots.join(", ")})`,
            );
    }
}

// ── report ─────────────────────────────────────────────────────────────────
console.log(`\nWAVE DIFF — ${paths.length} demo/ files over ${ROSTER.length} commits`);
for (const c of census)
    console.log(
        `  ${c.kind}  ${c.path}${c.limbs.length ? `   limbs: [${c.limbs.join(",")}]` : ""}${c.deadName ? "   DEAD-NAME" : ""}`,
    );
console.log(`\nNEW MODULES — ${newModules.length}`);
for (const f of fanout)
    console.log(
        `  ${f.mod}\n      importers ${f.importers}, instrument roots ${f.roots.length}${f.roots.length ? ` (${f.roots.join(", ")})` : ""}`,
    );

if (failures.length) {
    console.log("\nGATE H1 (no copied chassis) — RED");
    for (const f of failures) console.log("  · " + f);
    process.exit(1);
}
console.log("\nGATE H1 (no copied chassis) — GREEN");
console.log("  no added construct parameterises stage + inspector + action;");
console.log("  no added module is both housing-shaped and shared across instrument roots;");
console.log("  the dead name is not revived.");
process.exit(0);
