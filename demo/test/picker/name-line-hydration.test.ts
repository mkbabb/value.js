/**
 * X·§0hm.1 D-32 — the picker's name line is client-only, so the prerendered
 * shell and the stage's (lazy) hydrating render agree.
 *
 * The approved names arrive by fetch at run time; the build-time prerender of
 * `/` never has them. When the fetch landed before the stage hydrated, the
 * client's first render asked for `<p data-testid="picker-color-name">` where
 * the prerender held a comment (served: 5/10 cold loads at 6x CPU on a build
 * with mismatch details, "expected on client: p"). The line is gated on a flag
 * that only the plate's mount sets: the server never runs `onMounted`, and the
 * hydrating render runs before it, so both render no line.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sfc = readFileSync(resolve(__dirname, "../../picker/ColorPicker.vue"), "utf8");

describe("D-32 — the name line renders from the plate's mount on", () => {
    it("the line's v-if reads the mount flag before the name", () => {
        const line = sfc.match(/<p\s+v-if="([^"]+)"\s+class="picker-color-name"/);
        expect(line, "the name line").not.toBeNull();
        expect(line![1]).toMatch(/^nameLineMounted && currentColorName\b/);
    });

    // V-D1.r3: where the line yields, the name moves into the badge's gloss,
    // which is client-only by the same gate.
    it("the badge's gloss reads the mount flag before the name", () => {
        const gloss = sfc.match(/<Popover\s+v-if="([^"]+)"/);
        expect(gloss, "the name gloss").not.toBeNull();
        expect(gloss![1]).toMatch(/^nameLineMounted && currentColorName\b/);
    });

    it("the flag starts false and only onMounted sets it", () => {
        expect(sfc).toMatch(/const nameLineMounted = ref\(false\);/);
        const sets = [...sfc.matchAll(/nameLineMounted\.value = true/g)];
        expect(sets).toHaveLength(1);
        const mounted = sfc.match(/onMounted\(\(\) => \{([\s\S]*?)\n\}\);/);
        expect(mounted![1]).toMatch(/nameLineMounted\.value = true/);
    });
});
