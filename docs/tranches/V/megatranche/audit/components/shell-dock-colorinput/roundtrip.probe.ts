/**
 * CHALLENGE-C round 3 probe — the custom-name round-trip.
 *
 * Read-only. Drives the REAL demo composables (`useCustomColorNames`,
 * `useColorNameResolution`, `useColorParsing`) by relative import. The only
 * stub is `globalThis.fetch`, which stands in for the approved-names endpoint
 * — every module under test runs unmodified.
 *
 * Run:
 *   npx vitest run --config docs/tranches/V/megatranche/audit/components/\
 *     shell-dock-colorinput/probe.vitest.config.ts
 */
import { computed, nextTick, ref, shallowRef } from "vue";
import { expect, test } from "vitest";

import { parseCssColor } from "../../../../../../../src/css/index";
import {
    convertPickerColor,
    parsePickerColor,
    serializePickerColor,
} from "../../../../../../../demo/color-session/picker-color";
import {
    createDefaultColorModel,
    resolveColorSpace,
    type ColorModel,
} from "../../../../../../../demo/color-session/color-model";
import { useColorNameResolution } from "../../../../../../../demo/color-session/useColorNameResolution";
import { useColorParsing } from "../../../../../../../demo/color-session/useColorParsing";
import { useCustomColorNames } from "../../../../../../../demo/color-session/useCustomColorNames";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── The stub endpoint. BOTH names are legal under the server's own zod schema
//    (`api/src/modules/color/schema.ts:8-19` — /^[a-z][a-z0-9-]*$/, 1..50), so
//    nothing here depends on a validation hole that does not exist. The hole
//    that DOES exist is that the schema never checks NAMED_COLORS. ──────────
const APPROVED = [
    { id: "1", name: "babb-blue", css: "rgb(20 60 200)", status: "approved", contributor: "mkbabb", createdAt: "" },
    { id: "2", name: "red", css: "rgb(0 128 0)", status: "approved", contributor: "griefer", createdAt: "" },
];

globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: APPROVED }), {
        status: 200,
        headers: { "content-type": "application/json" },
    })) as typeof fetch;

function harness() {
    const model = shallowRef<ColorModel>(createDefaultColorModel());
    const updateModel = (patch: Partial<ColorModel>) => {
        model.value = { ...model.value, ...patch };
    };
    const stableHue = ref(0);
    const currentPhysicalColor = computed(() => model.value.color);
    const currentColorSpace = computed(() => resolveColorSpace(model.value.selectedColorSpace));
    const names = useColorNameResolution({ model, currentPhysicalColor, currentColorSpace });
    const parsing = useColorParsing({ model, updateModel, stableHue, currentColorSpace });
    return { model, updateModel, ...names, ...parsing };
}

test("A · MT-F001 sweep — the eight declared inputs", () => {
    const inputs = [
        "oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hsl(  )",
        "oklch(", "oklch(0.5 0.1 250 / )", "oklch(0.5 0.1 250)",
    ];
    const rows: string[] = [];
    for (const i of inputs) {
        try {
            const r = parseCssColor(i);
            rows.push(`${JSON.stringify(i).padEnd(24)} -> ${r.ok ? "OK" : "ERR-RESULT"}`);
        } catch (e) {
            rows.push(`${JSON.stringify(i).padEnd(24)} -> THROW ${(e as Error).name}: ${(e as Error).message}`);
        }
    }
    console.log("\n--- A: parseCssColor ---\n" + rows.join("\n"));
});

test("B · the custom-name round-trip is BROKEN", async () => {
    const { loadFromAPI, findCustomName } = useCustomColorNames();
    await loadFromAPI();

    const h = harness();

    // Land on the custom-named colour exactly as the app does.
    h.parseAndSetColor("rgb(20 60 200)");
    await sleep(150); // let the 100ms XYZ debounce settle
    await nextTick();

    const displayed = h.formattedCurrentColor.value;
    console.log("\n--- B: round-trip ---");
    console.log("model colour        :", serializePickerColor(h.model.value.color));
    console.log("formattedCurrentColor:", JSON.stringify(displayed), "<- what ColorInput paints into the field");
    console.log("crown meta          :", JSON.stringify(h.currentColorMeta.value));

    // This is EXACTLY what onSubmitColor / Enter / onInputBlur feed back.
    const direct = parseCssColor(displayed);
    console.log("parseCssColor(displayed).ok :", direct.ok);

    h.parseError.value = false;
    h.parseAndSetColor(displayed);
    await nextTick();
    console.log("after re-submitting the displayed text -> parseError =", h.parseError.value);
    console.log("model colour now    :", serializePickerColor(h.model.value.color));

    expect(displayed).toBe("babb-blue");
    expect(direct.ok).toBe(false);
});

test("C · a name that COLLIDES with a CSS keyword silently corrupts the colour", async () => {
    const h = harness();
    // approved: name "red" mapped to rgb(0 128 0) — green.
    h.parseAndSetColor("rgb(0 128 0)");
    await sleep(150);
    await nextTick();

    const displayed = h.formattedCurrentColor.value;
    console.log("\n--- C: collision ---");
    console.log("model colour        :", serializePickerColor(h.model.value.color));
    console.log("formattedCurrentColor:", JSON.stringify(displayed));

    // The user presses send / Enter / blurs-then-Enter. No error this time —
    // "red" parses. It parses as the WRONG colour.
    h.parseAndSetColor(displayed);
    await nextTick();
    console.log("after re-submit     :", serializePickerColor(h.model.value.color), "<- was rgb(0 128 0)");
    console.log("parseError          :", h.parseError.value);

    expect(displayed).toBe("red");
    expect(serializePickerColor(h.model.value.color)).not.toBe("rgb(0 128 0)");
});

test("D · the 100ms XYZ debounce leaves name/crown/canPropose stale after a commit", async () => {
    const h = harness();
    h.parseAndSetColor("rgb(20 60 200)"); // the custom-named colour
    await sleep(150);
    await nextTick();
    console.log("\n--- D: stale window ---");
    console.log("t0  displayed:", JSON.stringify(h.formattedCurrentColor.value),
        "crown:", h.currentColorMeta.value?.name ?? null,
        "canPropose:", h.canProposeName.value);

    // The user commits a completely different colour.
    h.parseAndSetColor("rgb(255 0 0)");
    await nextTick();
    console.log("t+0 model:", serializePickerColor(h.model.value.color),
        "displayed:", JSON.stringify(h.formattedCurrentColor.value),
        "crown:", h.currentColorMeta.value?.name ?? null,
        "canPropose:", h.canProposeName.value, "<- STALE");

    await sleep(150);
    await nextTick();
    console.log("t+150 model:", serializePickerColor(h.model.value.color),
        "displayed:", JSON.stringify(h.formattedCurrentColor.value),
        "crown:", h.currentColorMeta.value?.name ?? null,
        "canPropose:", h.canProposeName.value);
});

test("E · findCustomName is an O(n) linear scan called by 3 computeds", async () => {
    const { findCustomName } = useCustomColorNames();
    const xyz = serializePickerColor(convertPickerColor(parsePickerColor("rgb(20 60 200)"), "xyz"));
    const hit = findCustomName(xyz);
    console.log("\n--- E ---");
    console.log("findCustomName(xyz) =", JSON.stringify(hit));
    expect(hit).toBe("babb-blue");
});
