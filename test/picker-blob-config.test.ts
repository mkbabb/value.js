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
// ActionToolbar is the dock's action bar (W43b3: colocated with its sole
// consumer, the dock action-bar layer, in demo/shell/dock/).
const actions = readFileSync(
    path.resolve(process.cwd(), "demo/shell/dock/ActionToolbar.vue"),
    "utf8",
);

describe("V.W29 Picker Blob fixed-footprint paint mass", () => {
    it("changes the sole body-radius authority while preserving the morphology tuple", () => {
        const radii = [...source.matchAll(/^\s*bodyRadius:\s*([\d.]+),$/gm)].map(
            ([, value]) => Number(value),
        );

        expect(radii).toEqual([0.325]);
        expect(2 * radii[0]!).toBeCloseTo(0.65, 12);
        expect(source).toMatch(/^\s*orbitRadius:\s*0\.4,$/m);
        expect(source).toMatch(/^\s*satelliteRadius:\s*0\.09,$/m);
        expect(source).toMatch(/^\s*eccentricity:\s*0\.03,$/m);
        expect(source).not.toMatch(/\bheroScale\b/);
    });
});

describe("V.W20 Picker Blob semantics", () => {
    it("keeps the specimen hidden and free of activation or focus surfaces", () => {
        const template = source.slice(0, source.indexOf("</template>"));

        expect(template).toContain('aria-hidden="true"');
        expect(template).not.toMatch(/press-label=|<Tooltip|tabindex=|<button\b/);
        expect(template).not.toMatch(
            /@(click|dblclick|pointer\w*|mouse\w*|key\w*|focus\w*|touch\w*)=/,
        );
        expect(picker).not.toMatch(/<HeroBlob[^>]*@click=/);
    });

    it("leaves Copy solely in the action region", () => {
        expect(source).not.toMatch(/writeClipboard|Copy current color|emit\("click"\)/);
        expect(picker.match(/writeClipboard\(/g)).toHaveLength(1);
        expect(actions.match(/:icon="Copy"/g)).toHaveLength(1);
        expect(actions.match(/emit\('copy'\)/g)).toHaveLength(1);
    });
});
