import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const demoFile = (file: string) =>
    readFileSync(
        path.resolve(process.cwd(), "demo/picker", file),
        "utf8",
    );

const source = demoFile("visual/HeroBlob.vue");
const picker = demoFile("ColorPicker.vue");
// The colour scene's dock verbs are DATA on the one scene-action contract,
// built by the picker feature (X.W12U.k, A2-VA-L1-10/-19: the retired
// ActionToolbar.vue these two counts used to read is deleted, and the
// assertions follow the Copy seat to its home).
const actions = readFileSync(
    path.resolve(process.cwd(), "demo/picker/sceneActions.ts"),
    "utf8",
);

describe("V.W29 Picker Blob fixed-footprint paint mass", () => {
    // X.W12U.s1 (UIA-V-47, b7d6b40e5): the hero register is a SCALE over the
    // live app geometry — `heroScale(key, hero)` = hero × app/default — so the
    // Blob pane's sliders reach the hero. At the shipped defaults the ratio is
    // 1 and each atom IS its register literal; the witness reads that literal
    // through the one scale, and the scale's definition is pinned so no other
    // multiplier rides the register.
    //
    // o1109 (the owner, 2026-11-09: "satellite blobs and goo morphing needs to
    // be more pronounced, less shaded"): the body yields to 0.27 so four
    // satellites stand past the skin inside the wrapper's containment
    // (|uv| ≤ 0.5). The rendered half is e2e/smoke/o1109a-blob-goo.spec.ts.
    it("pins the satellite-show register and keeps every satellite inside the wrapper", () => {
        const atom = (key: string) => {
            const m = source.match(new RegExp(`^\\s*${key}:[^\\n]*heroScale\\("${key}",\\s*([\\d.]+)\\)`, "m"));
            return m ? Number(m[1]) : NaN;
        };
        const body = atom("bodyRadius");
        const orbit = atom("orbitRadius");
        const sat = atom("satelliteRadius");
        expect(body).toBe(0.27);
        expect(orbit).toBe(0.39);
        expect(sat).toBe(0.12);
        expect(atom("eccentricity")).toBe(0.03);
        expect(atom("satelliteCount")).toBe(4);
        // The producer shader carries at most 4 satellites.
        expect(source).toMatch(/satelliteCount: Math\.min\(4, Math\.round\(heroScale\("satelliteCount", 4\)\)\)/);
        // An orbiting satellite paints at 0.75 opacity, which the producer's
        // field reads as a disc 0.075 smaller. Its outer base radius
        // (orbit × 1.05) plus that disc stays inside the wrapper's containment,
        // and its orbit stands past the body's skin.
        const visible = sat - 0.075;
        expect(orbit * 1.05 + visible).toBeLessThan(0.5);
        expect(orbit).toBeGreaterThan(body + visible);
        expect(source).toMatch(
            /hero \* \(appBlobConfig\.geometry\[key\] \/ BLOB_CONFIG_DEFAULTS\.geometry\[key\]\)/,
        );
        expect(source.match(/\bheroScale\(/g)).toHaveLength(5);
    });

    it("paints the body: a mostly flat morph and no contact shadow", () => {
        expect(source).toMatch(/^const HERO_MORPH_T = 0\.3;$/m);
        expect(source).toMatch(/morphT: HERO_MORPH_T \* appBlobConfig\.morphT,/);
        expect(source).toMatch(/fissionAmp: HERO_FISSION_AMP, shadow: false/);
        expect(source).toMatch(/^const HERO_FISSION_AMP = 0\.8;$/m);
    });
});

describe("V.W20 Picker Blob semantics", () => {
    // o1105 blob lane (O-172 ruling S): the producer's press button is the
    // bead's ONE pointer host. The hero passes a label wherever the bead is
    // live, so hover, press, mood and the click's satellite scatter reach it;
    // the software tier stays an inert ornament off /blob (a hover would wake
    // its parked loop). The root opens the accessibility tree exactly when a
    // label is set, and the consumer adds no surface of its own. The rendered
    // half is e2e/smoke/blob-press.spec.ts.
    it("opens the producer's press surface on live tiers and adds none of its own", () => {
        const template = source.slice(0, source.indexOf("</template>"));

        expect(template).toContain(`:aria-hidden="pressLabel ? undefined : 'true'"`);
        expect(source).toMatch(
            /softwareRaster && route\?\.name !== "blob" \? "" : "Pulse blob"/,
        );
        // The route is optional: the embed's picker slice mounts no router.
        expect(source).toContain("inject(routeLocationKey, null)");
        expect(template).not.toMatch(/<Tooltip|tabindex=|<button\b/);
        // The one handler is on the producer's click: the satellite scatter.
        expect(template.match(/@(\w+)=/g)).toEqual(["@animationend=", "@click="]);
        expect(template).toContain(`@click="scatter"`);
        expect(source).toMatch(/function scatter\(\) \{\s+blobRef\.value\?\.nudge\(\);\s+\}/);
        expect(picker).not.toMatch(/<HeroBlob[^>]*@click=/);
    });

    it("leaves Copy solely in the action region", () => {
        expect(source).not.toMatch(/writeClipboard|Copy current color|emit\("click"\)/);
        expect(picker.match(/writeClipboard\(/g)).toHaveLength(1);
        expect(actions.match(/icon: Copy,/g)).toHaveLength(1);
        expect(actions.match(/target\?\.copy \?\? null/g)).toHaveLength(1);
    });
});
