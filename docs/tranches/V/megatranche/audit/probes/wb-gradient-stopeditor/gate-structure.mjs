/**
 * GATE G4 — the gradient workbench's structural contracts (L-8: these are the rows whose
 * cure is a shape, not a check; the gate exists only to prove the shape landed).
 *
 * Asserted product properties, each with the input that makes it RED today:
 *   G4a  "the colour of this ramp at p" has exactly ONE implementation, exported from the
 *        model tree. RED today: GradientVisualizer.vue:64-88 re-implements the interval walk
 *        that useGradientCSS.ts:174-214 owns and injects it as the optional `colorAt` prop.
 *   G4b  the emitted ramp CSS carries the model's interpolation space. RED today: every
 *        serializer emits a bare `linear-gradient(90deg, …)` while model.interpolationSpace
 *        is in scope, so the browser blends adjacent sub-stops in sRGB.
 *   G4c  a stop's untrusted colour literal never shares a `background` SHORTHAND with the
 *        alpha-checker ground. RED today: GradientStopEditor.vue:247 — an unparseable literal
 *        drops the whole declaration, taking the checker with it (measured: computed
 *        backgroundImage === "none").
 *   G4d  one write channel for the selected stop. RED today: defineModel + a `select` emit,
 *        both bound by the parent (GradientStopEditor.vue:26/:129-130 vs
 *        GradientVisualizer.vue:140/:144).
 *   G4e  no optional collaborator with a masking fallback. RED today: `colorAt = undefined`
 *        with `colorAt?.(p) ?? null` and a bare-checker ghost, at a sole call site that
 *        always provides it.
 *   G4f  range primitives come from the published `@mkbabb/value.js/math` (the demo IS the
 *        dogfood proof — vite.config.ts:63-66). RED today: clamp hand-rolled 3× in the
 *        gradient tree while six sibling demo files import it.
 *   G4g  the domain types live in a leaf with no intra-tree imports, and the state factory
 *        re-exports nothing. RED today: types at useGradientModel.ts:33-62 inside the module
 *        that builds reactive state and re-exports 7 names with zero consumers.
 *
 * ENV: node over the working tree — no browser, no dev server, no API. Structurally blind
 * to anything that only appears at runtime (G1/G2/G3 own those).
 *
 * Run: node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-structure.mjs
 * Exit 0 = GREEN. Exit 1 = RED.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../../../../../../..");
const R = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const G = path.join("demo", "workbenches", "gradient");
const fails = [];
const read = (p) => { try { return R(p); } catch { return null; } };

const editor = R(`${G}/GradientVisualizer/GradientStopEditor.vue`);
const visualizer = R(`${G}/GradientVisualizer/GradientVisualizer.vue`);
const css = R(`${G}/composables/useGradientCSS.ts`);
const model = R(`${G}/composables/useGradientModel.ts`);
const parse = R(`${G}/composables/gradientParse.ts`);

// G4a — one sampling implementation
if (/colorAt/.test(editor) || /:color-at=/.test(visualizer)) {
    fails.push(`G4a  the \`colorAt\` prop still exists (GradientStopEditor.vue declares it, GradientVisualizer.vue passes it) — "the colour of this ramp at p" has two implementations: useGradientCSS.sampleCoalescedStops (32 discretised samples) and GradientVisualizer.colorAtPosition (exact), so the add-ghost and the rail beneath it are painted by different code.`);
}
if (!read(`${G}/model/sample.ts`)) {
    fails.push(`G4a  ${G}/model/sample.ts does not exist — the sampling law has no exported home outside the CSS serializer module.`);
}

// G4b — the interpolation space reaches the CSS
for (const [name, src] of [["useGradientCSS.ts", css]]) {
    const emitters = [...src.matchAll(/`(linear|radial|conic)-gradient\(|`\$\{typeName\}\(/g)];
    if (emitters.length && !/ in \$\{[^}]*[Ss]pace/.test(src) && !/interpolationClause|spaceClause/.test(src)) {
        fails.push(`G4b  ${name} emits ${emitters.length} gradient strings and none carries an \` in <space>\` clause, although \`model.interpolationSpace\` is in scope (used at :192-193 to parse the endpoints and at :203 to mix). The 32-sample COALESCE_RESOLUTION is compensating for a clause the CSS was never given.`);
    }
}

// G4c — untrusted colour is not in the same shorthand as its own fallback ground
{
    const m = editor.match(/background:\s*`linear-gradient\(\$\{[^`]*\}\),\s*var\(--alpha-checker\)`/g);
    if (m) fails.push(`G4c  ${m.length} site(s) interpolate an untrusted stop literal into a \`background\` SHORTHAND that also carries \`var(--alpha-checker)\`. Measured: setting that shorthand with \`oklch()\`, \`rgb()\` or an empty literal yields computed backgroundImage "none" — the invalid value takes the fallback ground with it, and an invisible stop is indistinguishable from a transparent one. NOTE: \`setStopsFromColors\` (useGradientModel.ts:141-149) writes server-supplied palette strings straight into stops[].cssColor with no validity check, so an unvalidated literal has a live path to this line.`);
}

// G4d — one write channel for selection
if (/emit\("select"/.test(editor) && /@select=/.test(visualizer)) {
    fails.push(`G4d  the selected stop has two live write channels: \`selectedId.value = id\` (defineModel) immediately followed by \`emit("select", id)\`, and the parent binds BOTH (\`v-model:selected-id\` and \`@select\`), writing the same ref twice. They are already asymmetric — \`removeStop\` clears selectedId without emitting \`select\`.`);
}
if (/defineModel<string \| null>\("selectedStopId"/.test(visualizer)) {
    const pane = read(`${G}/GradientPane.vue`) ?? "";
    if (!/selected-stop-id|selectedStopId/.test(pane)) {
        fails.push(`G4d  GradientVisualizer declares \`defineModel("selectedStopId")\` but its only parent (GradientPane.vue) renders it with no binding — a local ref wearing a public-API costume.`);
    }
}

// G4e — no optional collaborator with a masking fallback
if (/colorAt\?\.\(/.test(editor) && /colorAt = undefined/.test(editor)) {
    fails.push(`G4e  \`colorAt\` is declared optional with a no-op \`= undefined\` destructure default and consumed as \`colorAt?.(p) ?? null\`, degrading the add-affordance to a bare-checker ghost instead of failing — at a sole call site (GradientVisualizer.vue:139) that always provides it.`);
}

// G4f — range primitives come from the published subpath
{
    const handRolled = [];
    for (const [name, src] of [["GradientStopEditor.vue", editor], ["gradientParse.ts", parse], ["useGradientCSS.ts", css], ["useGradientModel.ts", model]]) {
        src.split("\n").forEach((l, i) => { if (/Math\.(max|min)\(\s*[\d.]+\s*,\s*Math\.(min|max)\(/.test(l)) handRolled.push(`${name}:${i + 1}`); });
    }
    const importsMath = /@mkbabb\/value\.js\/math/.test(editor + parse + css + model);
    if (handRolled.length && !importsMath) {
        fails.push(`G4f  clamp is hand-rolled at ${handRolled.join(", ")} while \`@mkbabb/value.js/math\` publishes clamp AND scale (src/subpaths/math.ts) and six sibling demo files already import from it. \`scale(value, fromMin, fromMax, toMin, toMax)\` IS the rail's axis map.`);
    }
}

// G4g — the type leaf
if (!read(`${G}/model/types.ts`)) {
    fails.push(`G4g  ${G}/model/types.ts does not exist. GradientStop/GradientType/GradientInterval/GradientModelState are declared at useGradientModel.ts:33-62, inside the module that builds reactive state — so useGradientCSS.ts:31-34 and gradientParse.ts:23-27 must TYPE-import the factory that VALUE-imports them: two declaration-graph cycles (type-only, so the emitted JS stays acyclic). GradientStopEditor.vue:4 anchors its prop contract on that apex.`);
}
{
    const block = model.match(/\/\/ ── Re-exports \(preserve public API surface\) ──[\s\S]*?\n\n/);
    if (block) {
        const names = [...block[0].matchAll(/^\s{4}([A-Za-z]\w*),?$/gm)].map((m) => m[1]);
        fails.push(`G4g  useGradientModel.ts still carries the "preserve public API surface" re-export block (${names.length ? names.join(", ") : "7 names"}). Measured over demo/ test/ e2e/: ZERO consumers import any of serializeGradient / serializeCoalescedGradient / serializeRailRamp / linearInterval / parseGradientCSS / GradientParseResult / ParsedGradientModel through this door — every real consumer imports direct. The one live use (INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS) travels a three-hop chain color-space-meta -> useGradientInterpolation:17 -> useGradientModel:21 -> GradientVisualizer:19, while MixConfigBar.vue:18 reaches the same module in one hop.`);
    }
}

if (fails.length) { console.error("GATE G4 (structure) — RED\n" + fails.map((f) => "  " + f).join("\n")); process.exit(1); }
console.log("GATE G4 (structure) — GREEN");
