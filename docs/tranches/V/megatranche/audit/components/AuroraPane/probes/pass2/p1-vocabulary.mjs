// P1 — AuroraPane's hand-maintained enum vocabularies vs the CONSUMED glass-ui 7 dist.
// Pure-module probe: no Vue, no browser. Run: node <this file>
import { resolveAtoms, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/aurora";

// Verbatim from demo/scenes/atmosphere/AuroraPane.vue:45-63
const PANE = {
    HARMONIES: ["analogous","complementary","split-complementary","triad","tetradic","monochrome"],
    ARRANGEMENTS: ["scattered","composed","centred"],
    MEDIA: ["smooth","pastel","watercolor","oil","crayon","vangogh","oil-pastel"],
    MOTIONS: ["still","breathing","drifting"],
};
// Verbatim from the consumed .d.ts unions
const DIST = {
    HARMONIES: ["analogous","complementary","split-complementary","triad","tetradic","monochrome"],
    ARRANGEMENTS: ["scattered","composed","centred"],
    MEDIA: ["smooth","pastel","watercolor","oil","crayon","vangogh","oil-pastel","kuwahara","metal","metal-gradient"],
    MOTIONS: ["still","breathing","drifting"],
};

console.log("=== A · vocabulary drift (pane array vs consumed union) ===");
for (const k of Object.keys(PANE)) {
    const missing = DIST[k].filter((v) => !PANE[k].includes(v));
    const extra = PANE[k].filter((v) => !DIST[k].includes(v));
    console.log(`${k.padEnd(13)} pane=${PANE[k].length} dist=${DIST[k].length}  MISSING=${JSON.stringify(missing)}  EXTRA=${JSON.stringify(extra)}`);
}

// Are the three missing media REACHABLE at the atoms door, or producer-gated?
console.log("\n=== B · are the missing media reachable through resolveAtoms? ===");
const seed = "oklch(0.62 0.27 9.8)";
const base = { ...DEFAULT_AURORA_CONFIG };
for (const kind of DIST.MEDIA) {
    let out;
    try {
        out = resolveAtoms({ seed, medium: kind === "smooth" ? { kind } : { kind } }, base);
    } catch (e) {
        console.log(`  ${kind.padEnd(15)} THREW ${e.message}`);
        continue;
    }
    const inPane = PANE.MEDIA.includes(kind);
    console.log(
        `  ${kind.padEnd(15)} resolved medium=${String(out.medium).padEnd(15)} ` +
        `paint=${JSON.stringify(out.paint ?? out.texture ?? "")}`.slice(0, 0) +
        `reachable=${out.medium === kind}  inPaneUI=${inPane}${!inPane && out.medium === kind ? "   <-- SHIPPED BUT UNREACHABLE IN THE UI" : ""}`,
    );
}

// Zones ceiling
console.log("\n=== C · zones.count ceiling (pane slider max = 6) ===");
for (const count of [1, 5, 6, 7, 8, 9, 99]) {
    const out = resolveAtoms({ seed, zones: { count, arrangement: "scattered" } }, base);
    console.log(`  zones.count=${String(count).padEnd(3)} -> resolved nuclei = ${out.nuclei.length}${count > 6 && out.nuclei.length > 6 ? "   <-- ABOVE THE PANE SLIDER MAX" : ""}`);
}

// The three "P1-gated" ramp atoms the demo prose says are unreachable
console.log("\n=== D · the atoms the demo prose calls 'P1-gated / atom-unreachable' ===");
const mean = (p) => p.reduce((s, x) => s + x.L, 0) / p.length;
const spreadH = (p) => {
    const hs = p.map((s) => s.h);
    return (Math.max(...hs) - Math.min(...hs)).toFixed(2);
};
const spreadC = (p) => {
    const cs = p.map((s) => s.C);
    return (Math.max(...cs) - Math.min(...cs)).toFixed(4);
};
const b = (atoms) => resolveAtoms({ seed, ...atoms }, base).palette;
const p0 = b({});
console.log(`  baseline                       meanL=${mean(p0).toFixed(4)} hueSpread=${spreadH(p0)} chromaSpread=${spreadC(p0)}`);
const pDark = b({ lightnessScheme: "dark" });
console.log(`  lightnessScheme:"dark"         meanL=${mean(pDark).toFixed(4)}  CHANGED=${mean(pDark) !== mean(p0)}`);
const pBand = b({ lBand: [0.18, 0.42] });
console.log(`  lBand:[0.18,0.42]              meanL=${mean(pBand).toFixed(4)}  CHANGED=${mean(pBand) !== mean(p0)}`);
const pHS = b({ hueSpread: 64 });
console.log(`  hueSpread:64                   hueSpread=${spreadH(pHS)}  CHANGED=${spreadH(pHS) !== spreadH(p0)}`);
const pCV = b({ chromaVariance: 1 });
console.log(`  chromaVariance:1               chromaSpread=${spreadC(pCV)}  CHANGED=${spreadC(pCV) !== spreadC(p0)}`);
const pCC = b({ chromaVariance: 1, chromaCounterpoint: true });
console.log(`  +chromaCounterpoint:true       chromaSpread=${spreadC(pCC)}  CHANGED=${spreadC(pCC) !== spreadC(pCV)}`);
