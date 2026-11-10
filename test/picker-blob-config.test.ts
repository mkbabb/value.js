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
    it("changes the sole body-radius authority while preserving the morphology tuple", () => {
        const radii = [
            ...source.matchAll(/^\s*bodyRadius:\s*heroScale\("bodyRadius",\s*([\d.]+)\),$/gm),
        ].map(([, value]) => Number(value));

        expect(radii).toEqual([0.325]);
        expect(2 * radii[0]!).toBeCloseTo(0.65, 12);
        expect(source).toMatch(/^\s*orbitRadius:\s*heroScale\("orbitRadius",\s*0\.4\),$/m);
        expect(source).toMatch(/^\s*satelliteRadius:\s*heroScale\("satelliteRadius",\s*0\.09\),$/m);
        expect(source).toMatch(/^\s*eccentricity:\s*heroScale\("eccentricity",\s*0\.03\),$/m);
        expect(source).toMatch(
            /hero \* \(appBlobConfig\.geometry\[key\] \/ BLOB_CONFIG_DEFAULTS\.geometry\[key\]\)/,
        );
        expect(source.match(/\bheroScale\(/g)).toHaveLength(4);
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
