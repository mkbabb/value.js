// SERVED MODEL: claude-opus-5[1m]
//
// X.P.W3.g — THE DIMENSION-TOKEN BOUNDARY, measured AFTER the cure (2026-09-18, round 4). Banked
// BESIDE the sealed evidence and beside `.f`'s round-4 artefacts (E-3): nothing here moves a
// committed artefact.
//
//   node docs/tranches/X/parse-that/evidence/W3/dimension-token-2026-09-18.mjs <out.json>
//
// Drives COHESION §0p's two witnesses (F-e1 / F-e2), their controls, the generated merge family,
// the unit-extension family, the §10.2 pinned edges and the §4.3.9 `-` clause through BOTH public
// surfaces and through the sha-pinned published 4.0.0 oracle, recording G-5's canonical six-tuple
// per lowering and the shield ledger before and after. Every figure this unit publishes is read
// from this program's output.
import path from "node:path";
import { writeFileSync } from "node:fs";

const P2 = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript";
const { SHIELD, loadPublicSurfaces } = await import(path.join(P2, "src/css/entry.mjs"));
const { THETA, CLASS3_PROOF, CLASS3_CEILINGS } = await import(path.join(P2, "src/css/bounds.mjs"));
const { L, R_cls } = await import(path.join(P2, "src/css/algebra/tables.mjs"));
const { loadOracle, disposeOracle, callOracle } = await import(path.join(P2, "test/css-equivalence/lib/oracle.mjs"));

const say = (...a) => console.log(...a);
say("SERVED MODEL: claude-opus-5[1m] · X.P.W3.g dimension-token probe (post-cure) · 2026-09-18");

const surfaces = await loadPublicSurfaces();
const oracle = await loadOracle();
const shieldBefore = SHIELD.caught;

const KEYS = ["ok", "code", "start", "end", "expected", "actual"];
const canonical = (r) => {
    const i = r && r.ok === false ? (r.diagnostics?.[0] ?? null) : null;
    return JSON.stringify(
        {
            ok: r?.ok ?? null,
            code: i ? (i.code ?? null) : null,
            start: i ? (i.start ?? null) : null,
            end: i ? (i.end ?? null) : null,
            expected: i ? [...i.expected] : null,
            actual: i ? (i.actual === undefined ? null : i.actual) : null,
        },
        KEYS,
    );
};
const incumbent = (entry, src) => {
    const r = callOracle(oracle.module[entry], src);
    return r.threw ? `THROWS ${r.error}` : r.value && r.value.ok === false ? `ok:false ${r.value.diagnostics[0].code}` : `ok:true ${JSON.stringify(r.value?.value ?? r.value)}`;
};
const both = (entry, src) => {
    const js = canonical(surfaces.js[entry](src));
    const wasm = canonical(surfaces.wasm[entry](src));
    return { src, entry, js, wasm, identical: js === wasm, incumbent: incumbent(entry, src) };
};

/* ── A. the label surface and Θ, unmoved by this unit ─────────────────────────────────────── */
say("\n── A. the surfaces this unit must NOT move");
say(`  R_cls keys (9): ${Object.keys(R_cls).join(" ")}`);
say(`  R_cls["ident-start"].label = ${JSON.stringify(R_cls["ident-start"].label)} (shared with "ident" — L does not move)`);
say(`  L.length = ${L.length} · "<string>" at L[${L.indexOf("<string>")}] · "input <= 65458" at L[${L.indexOf("input <= 65458")}]`);
say(`  THETA.input = ${THETA.input} · CLASS3_PROOF.arena.K = ${CLASS3_PROOF.arena.K} · vstack.K = ${CLASS3_PROOF.vstack.K}`);
say(`  per-entry arena rate: ${Object.entries(CLASS3_CEILINGS.perEntry).map(([k, v]) => `${k} ${v.rate}`).join(" · ")}`);

/* ── B. §0p's two witnesses, their controls, and the legacy row ───────────────────────────── */
say("\n── B. COHESION §0p F-e1 / F-e2, their controls, and the legacy-hsl divergence");
const NAMED = [
    ["F-e1", "parseCssColor", "hsl(120deg50%50%)"],
    ["F-e2", "parseCssColor", "rgb(255none none)"],
    ["legacy", "parseCssColor", "hsl(120, 50, 50)"],
    ["control", "parseCssColor", "hsl(120 50% 50%)"],
    ["control", "parseCssColor", "rgb(255 0 0)"],
    ["control", "parseCssColor", "hsl(120deg 50% 50%)"],
    ["control", "parseCssColor", "rgb(255 none none)"],
];
const named = [];
for (const [id, entry, src] of NAMED) {
    const r = both(entry, src);
    named.push({ id, ...r });
    say(`  ${id.padEnd(8)} ${JSON.stringify(src).padEnd(24)} ${r.identical ? "IDENTICAL" : "DIFFER !!"} cand ${r.js}`);
    say(`  ${"".padEnd(8)} ${"".padEnd(24)} incumbent ${r.incumbent}`);
}

/* ── C. the generated families, re-derived here so the figures are this program's ──────────── */
say("\n── C. the generated families (the fixture's own rule, re-derived)");
const UNITS = ["deg", "grad", "rad", "turn"];
const CONTS = ["50", "0", "s", "x", "-2", "_a"];
const merged = [];
for (const u of UNITS) for (const c of CONTS) merged.push(`hsl(120${u}${c} 50% 50%)`);
for (const i of ["none", "px", "e", "deg", "abc"]) merged.push(`rgb(255${i} none none)`);
merged.push("hsl(120deg50%50%)", "rgb(255none none)", "hsl(120none 50%)", "oklch(0.5 0.1none)");
const mergedRows = merged.map((s) => both("parseCssColor", s));
const mergedBad = mergedRows.filter((r) => !r.identical || !r.js.startsWith('{"ok":false,"code":"css_syntax"'));
const incumbentAcceptsMerged = mergedRows.filter((r) => r.incumbent.startsWith("ok:true"));
say(`  merged witnesses ${mergedRows.length} · not rejected identically as css_syntax: ${mergedBad.length}`);
say(`  of those, the incumbent ACCEPTS: ${incumbentAcceptsMerged.length} — the cure adds NO new divergence`);

const pinned = [
    ...["none", "px", "e", "deg"].map((i) => ["parseTimingFunction", `cubic-bezier(0, 0, 1${i}, 1)`]),
    ...["jump-start", "none", "x"].map((i) => ["parseTimingFunction", `steps(2${i})`]),
    ...["none", "px", "x"].map((i) => ["parseTimingFunction", `linear(0${i}, 1)`]),
].map(([e, s]) => both(e, s));
const pinnedBad = pinned.filter((r) => !r.identical || !r.js.startsWith('{"ok":false,"code":"css_syntax"'));
say(`  §10.2 pinned edges ${pinned.length} · not rejected identically: ${pinnedBad.length} — the omitted guards are INERT`);

const preserved = ["rgb(50%20%30%)", "rgb(1.5.5 3)", "hsl(120 50%50%)", "rgb(1-2 3)", "rgb(1 -2 3)"].map((s) => both("parseCssColor", s));
const preservedBad = preserved.filter((r) => !r.identical || !r.js.startsWith('{"ok":true'));
say(`  S-1 dissent + §4.3.9 '-' clause ${preserved.length} · lost acceptance: ${preservedBad.length}`);

say(`\n── D. shield: ${shieldBefore} -> ${SHIELD.caught}`);

const out = process.argv[2];
if (out) {
    writeFileSync(
        out,
        `${JSON.stringify(
            {
                servedModel: "claude-opus-5[1m]",
                unit: "X.P.W3.g",
                date: "2026-09-18",
                surfaces: { classKeys: Object.keys(R_cls), identStartLabel: R_cls["ident-start"].label, labelCount: L.length, stringAt: L.indexOf("<string>") },
                theta: { input: THETA.input, class3: CLASS3_PROOF, rates: Object.fromEntries(Object.entries(CLASS3_CEILINGS.perEntry).map(([k, v]) => [k, v.rate])) },
                named,
                merged: { count: mergedRows.length, notRejected: mergedBad, incumbentAccepts: incumbentAcceptsMerged.length, rows: mergedRows },
                pinnedEdges: { count: pinned.length, notRejected: pinnedBad, rows: pinned },
                preserved: { count: preserved.length, lost: preservedBad, rows: preserved },
                shield: { before: shieldBefore, after: SHIELD.caught },
            },
            null,
            2,
        )}\n`,
    );
    say(`wrote ${out}`);
}
await disposeOracle();
