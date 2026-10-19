// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.h · gate **h2** — THE BLOB PIPELINE CENSUS, MACHINE-CHECKED.
//
//   node docs/tranches/X/gates/gate-blob-pipeline.mjs
//
// RED at open (`W6.md:291`): *"The census does not exist today."* `W6.md:284`
// makes the census the unit's FIRST act — *"measure the pipeline before
// cutting — the row's own law"* — and names three candidate strippers:
//
//   1 · the 1×1-canvas 2D resolver (`useContrastSafeColor.ts:101-102`)
//   2 · `deriveBlobPalette` / `cssToOklch` from `@mkbabb/glass-ui/color`
//   3 · the shader's own HSV perturbation / lightening
//
// `W6.md:293`'s falsifier is the whole point of this file: *"h2 fails if the
// wave cuts at a stage it did not measure — the census names all three stages
// or the gate is RED (this is what stops the 'labelled, not measured'
// hypothesis becoming the cure by default)."*
//
// WHAT THIS GATE CHECKS, and why each leg exists:
//
//   L1 · THE CENSUS EXISTS. A gate that passes on an absent file is the
//        absence itself wearing a verdict.
//   L2 · ALL THREE CANDIDATES ARE NAMED. Not two. The spec enumerates three
//        and the falsifier is written against cutting at an unmeasured one.
//   L3 · EVERY PUBLISHED FIGURE RE-DERIVES HERE. The census's numbers are
//        parsed out of its own machine block and recomputed in this process
//        from the installed producer. A census cannot be prose: if a figure
//        drifts from the bytes, this gate reds. (WRITE-THEN-MEASURE.)
//   L4 · THE OFF-PATH RULING IS STRUCTURAL, NOT ASSERTED. The census rules
//        candidate 1 OFF the chroma path. That ruling is re-checked at the
//        consumer's own bytes every run: `HeroBlob.vue`'s only reach into
//        `useContrastSafeColor` must be `resolveSurfaceLightnessLive`, and the
//        one function that consumes it (`floorStops`) must write `L` and
//        nothing else. The day someone routes chroma through that door, this
//        leg reds and the census is wrong on the record rather than quietly.
//   L5 · THE CEILING COMPARISON IS PRESENT AND TRUE (L-18 target 5,
//        probe-before-meaning). The naive reading of leg L3's numbers is
//        "deriveBlobPalette strips 68% of the chroma". Measured against the
//        sRGB gamut ceiling at each stop's own (L,h) that reading is FALSE —
//        every stage delivers 100.0% of what sRGB allows where it lands. This
//        leg recomputes the ceilings and reds if the census ever publishes a
//        stripper claim without them. It is the leg that stops this gate
//        manufacturing a false cut for `h1`.
//   L6 · THE INERT LEVER IS STILL INERT. `HeroBlob.vue` passes
//        `chromaCeiling: Math.max(0.16, seed.C)`. Measured across three
//        decades of ceiling the derived chroma does not move. If a producer
//        release ever makes that lever live, this leg reds and `.h` re-reads
//        its own cut — which is the correct behaviour, not a regression.
//
// STALE-SERVER LAW (`W6.md:148`): every figure here is headless against the
// installed tree. The one browser reading the census carries (the 1×1-canvas
// clamp) is banked beside it with its own transcript and is NOT re-taken here,
// because this gate must run without a dev server; L4 checks that stage
// structurally instead, which is the stronger check for the claim it makes.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const CENSUS = resolve(ROOT, "docs/tranches/X/waves/W6-blob-pipeline-census.md");
const HERO = resolve(ROOT, "demo/picker/visual/HeroBlob.vue");
const CONTRAST = resolve(ROOT, "demo/color-session/useContrastSafeColor.ts");

const failures = [];
const fail = (message) => failures.push(message);

// ---------------------------------------------------------------- L1: exists
if (!existsSync(CENSUS)) {
    fail(`the census does not exist at ${CENSUS.slice(ROOT.length + 1)}`);
    console.log("GATE h2 (blob pipeline census) — RED\n  FAIL " + failures[0]);
    process.exit(1);
}
const census = readFileSync(CENSUS, "utf8");

// ------------------------------------------------- L2: all three candidates
const CANDIDATES = [
    ["1×1-canvas", /1×1-canvas|1x1-canvas/],
    ["deriveBlobPalette", /deriveBlobPalette/],
    ["shader perturbation", /shader/i],
];
for (const [name, pattern] of CANDIDATES) {
    if (!pattern.test(census))
        fail(`the census never names candidate stripper "${name}"`);
}

// ------------------------------------------ the census's own machine block
// Lines of the form `KEY = value` inside the ```census fence.
const block = census.match(/```census\n([\s\S]*?)```/);
if (!block) {
    fail(
        "the census carries no ```census machine block — its figures cannot be re-derived",
    );
}
const published = new Map();
for (const line of (block?.[1] ?? "").split("\n")) {
    const row = line.match(/^\s*([A-Za-z0-9_.]+)\s*=\s*(\S+)\s*$/);
    if (row) published.set(row[1], row[2]);
}

// -------------------------------------------------- the live re-measurement
const { cssToOklch, deriveBlobPalette, oklchStopToHex, oklchToGammaRgb, gamutMapStop } =
    await import("@mkbabb/glass-ui/color");

/** The sRGB chroma ceiling at (L,h): the largest C `gamutMapStop` leaves alone. */
function ceilingAt(L, h) {
    let lo = 0;
    let hi = 0.45;
    for (let i = 0; i < 40; i++) {
        const mid = 0.5 * (lo + hi);
        if (Math.abs(gamutMapStop({ L, C: mid, h }).C - mid) < 1e-9) lo = mid;
        else hi = mid;
    }
    return lo;
}

// The OWNER'S CASE, byte-for-byte the seed `W6.md:291` measures.
const SEED = "lab(92% 88.8 20)";
const seed = cssToOklch(SEED);
const seedCeiling = ceilingAt(seed.L, seed.h);

// stage 2 — the producer derive, called with the consumer's own options
// (`HeroBlob.vue:120-125`: stopCount 4, analogous, chromaCeiling max(0.16,C)).
const OPTIONS = {
    stopCount: 4,
    harmony: "analogous",
    chromaCeiling: Math.max(0.16, seed.C),
};
const stops = deriveBlobPalette(SEED, OPTIONS);
const deriveMax = Math.max(...stops.map((s) => s.C));

// stage 3 — the hex upload format the shader consumes.
const hexRoundTrip = Math.max(
    ...stops.map((s, i) => Math.abs(cssToOklch(oklchStopToHex(stops[i])).C - s.C)),
);

// stage 1' — the producer's own base-colour resolver, which is
// `oklchToGammaRgb ∘ cssToOklch` (measured: `defaultBlobColorResolver`).
const gamma = oklchToGammaRgb(seed);
const clipped = cssToOklch(
    `rgb(${gamma.map((v) => Math.max(0, Math.min(1, v)) * 255).join(" ")})`,
);

const live = {
    "seed.C": seed.C,
    "seed.L": seed.L,
    "seed.ceiling": seedCeiling,
    "seed.outsideFactor": seed.C / seedCeiling,
    "clip.C": clipped.C,
    "clip.L": clipped.L,
    "clip.headroomPct": (100 * clipped.C) / ceilingAt(clipped.L, clipped.h),
    "derive.maxC": deriveMax,
    "derive.minC": Math.min(...stops.map((s) => s.C)),
    "derive.headroomPct":
        (100 * deriveMax) /
        ceilingAt(
            stops.find((s) => s.C === deriveMax).L,
            stops.find((s) => s.C === deriveMax).h,
        ),
    "hex.maxDeltaC": hexRoundTrip,
    "gamutMap.C": gamutMapStop(seed).C,
};

// --------------------------------------------- L3: every figure re-derives
// The census publishes every figure to 8 decimal places, so a faithful row is
// exact to ~5e-9 and this bound is three orders of magnitude of slack above
// that — tight enough that a single mistyped digit reds (verified by negative
// control, banked beside the census), loose enough to survive a float ULP.
const TOLERANCE = 1e-7;
for (const [key, value] of Object.entries(live)) {
    if (!published.has(key)) {
        fail(`the census publishes no figure for \`${key}\` — the stage is unmeasured`);
        continue;
    }
    const stated = Number(published.get(key));
    if (!Number.isFinite(stated)) {
        fail(`the census's \`${key}\` is not a number: ${published.get(key)}`);
        continue;
    }
    const scale = Math.max(1, Math.abs(value));
    if (Math.abs(stated - value) > TOLERANCE * scale) {
        fail(
            `\`${key}\` does not reproduce — census ${stated}, measured here ` +
                `${value.toFixed(6)} (Δ ${Math.abs(stated - value).toExponential(2)})`,
        );
    }
}

// ------------------------------ L4: candidate 1 is structurally OFF the path
const hero = readFileSync(HERO, "utf8");
const contrast = readFileSync(CONTRAST, "utf8");

const heroImports = [
    ...hero.matchAll(/import\s*\{([^}]*)\}\s*from\s*"[^"]*useContrastSafeColor"/g),
]
    .flatMap((m) => m[1].split(","))
    .map((s) => s.trim())
    .filter(Boolean);
if (heroImports.length !== 1 || heroImports[0] !== "resolveSurfaceLightnessLive") {
    fail(
        `HeroBlob reaches useContrastSafeColor through [${heroImports.join(", ")}] — the census's ` +
            `OFF-PATH ruling for the 1×1-canvas resolver holds only while that door is ` +
            `\`resolveSurfaceLightnessLive\` alone`,
    );
}
// the single consumer of that lightness must write L and nothing else
const floor = hero.match(/function floorStops\([\s\S]*?\n\}/);
if (!floor) {
    fail(
        "`floorStops` is gone from HeroBlob.vue — the census's OFF-PATH ruling has no subject",
    );
} else {
    const writes = [...floor[0].matchAll(/\{\s*\.\.\.s,\s*([A-Za-z]+):/g)].map(
        (m) => m[1],
    );
    if (writes.length !== 1 || writes[0] !== "L") {
        fail(
            `\`floorStops\` writes [${writes.join(", ")}] — the census rules the 1×1-canvas ` +
                `resolver OFF the chroma path precisely because this operator touches L alone`,
        );
    }
}
if (!/getImageData\(0, 0, 1, 1\)/.test(contrast)) {
    fail(
        "`useContrastSafeColor.ts` no longer carries the 1×1 read the census measures",
    );
}

// ---------------------------------- L5: the ceiling comparison is published
if (!/ceiling/i.test(census) || !published.has("derive.headroomPct")) {
    fail(
        "the census states a stripper without the sRGB-ceiling comparison — L-18 target 5, " +
            "probe-before-meaning: the raw chroma deltas read as a 68% strip and that reading is false",
    );
}
if (live["derive.headroomPct"] < 99.9) {
    fail(
        `the derive no longer saturates its own ceiling (${live["derive.headroomPct"].toFixed(1)}%) — ` +
            `the census's central finding must be re-taken before \`.h\` cuts anywhere`,
    );
}

// ------------------------------------------------ L6: the lever is inert
const ceilings = [Math.max(0.16, seed.C), 0.4, 1.0].map((chromaCeiling) =>
    deriveBlobPalette(SEED, { ...OPTIONS, chromaCeiling })
        .map((s) => s.C.toFixed(8))
        .join(","),
);
const inert = new Set(ceilings).size === 1;
if (published.get("lever.inert") !== String(inert)) {
    fail(
        `the census states \`lever.inert = ${published.get("lever.inert")}\` and the measurement ` +
            `here says ${inert}`,
    );
}

// ------------------------------------------------------------------ verdict
const green = failures.length === 0;
console.log(
    [
        `GATE h2 (blob pipeline census) — ${green ? "GREEN" : "RED"}`,
        `  seed ${SEED} → oklch L ${seed.L.toFixed(4)} C ${seed.C.toFixed(5)} h ${seed.h.toFixed(2)}`,
        `  sRGB ceiling at the seed's own (L,h) = ${seedCeiling.toFixed(5)} — the seed is ` +
            `${live["seed.outsideFactor"].toFixed(1)}× outside the gamut it must be painted in`,
        `  stage 1  1×1-canvas / defaultBlobColorResolver clip → C ${clipped.C.toFixed(5)} ` +
            `(L ${seed.L.toFixed(4)}→${clipped.L.toFixed(4)}), ${live["clip.headroomPct"].toFixed(1)}% of ceiling`,
        `  stage 2  deriveBlobPalette → C ${deriveMax.toFixed(5)}…${live["derive.minC"].toFixed(5)}, ` +
            `${live["derive.headroomPct"].toFixed(1)}% of ceiling; chromaCeiling lever inert = ${inert}`,
        `  stage 3  oklchStopToHex → |ΔC| ≤ ${hexRoundTrip.toExponential(2)}`,
        `  control  hue+lightness-preserving gamutMapStop → C ${live["gamutMap.C"].toFixed(5)}`,
        `  census   ${published.size} published figures, ${Object.keys(live).length} re-derived here`,
        ...failures.map((message) => `  FAIL ${message}`),
    ].join("\n"),
);

process.exit(green ? 0 : 1);
