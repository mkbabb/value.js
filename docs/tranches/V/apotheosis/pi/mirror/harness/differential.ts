import { isDeepStrictEqual } from "node:util";
import * as live from "../../../../../../../dist/subpaths/css.js";
import type { CssColor } from "../types.js";
import * as mirror from "../index.js";

const numberValue = {
    kind: "scalar",
    payload: { type: "number", value: 1, unit: "s" },
} as const;
const declaration = { name: "animation-duration", value: numberValue, important: false } as const;
const color = { space: "rgb", channels: [1, 0, 0], alpha: 1 } as CssColor;

type CssApi = typeof mirror;
type RuntimeExport = keyof CssApi;
type Witness = Readonly<{ exportName: RuntimeExport; probe: (api: CssApi) => unknown }>;

const WITNESSES: readonly Witness[] = [
    { exportName: "parseCssColor", probe: (api) => api.parseCssColor("red") },
    { exportName: "parseCssScalar", probe: (api) => [api.parseCssScalar("1px"), api.parseCssScalar("--1"), api.parseCssScalar('"a\\\nb"')] },
    { exportName: "parseCssValue", probe: (api) => [api.parseCssValue("1px solid"), api.parseCssValue("a / b, fn(c d)"), api.parseCssValue("outer(inner(1))")] },
    { exportName: "parseCssValues", probe: (api) => [api.parseCssValues("1px"), api.parseCssValues("a, b"), api.parseCssValues("fn(a / b)")] },
    { exportName: "parseKeyframeSelector", probe: (api) => [api.parseKeyframeSelector("50%"), api.parseKeyframeSelector("entry 25%"), api.parseKeyframeSelector("101%")] },
    { exportName: "parseTimingFunction", probe: (api) => api.parseTimingFunction("ease") },
    { exportName: "serializeCssColor", probe: (api) => api.serializeCssColor(color) },
    { exportName: "coerceToSyntax", probe: (api) => api.coerceToSyntax("1px", "<length>") },
    { exportName: "parseAnimationRange", probe: (api) => api.parseAnimationRange("entry 0%") },
    { exportName: "parseAnimationTimeline", probe: (api) => api.parseAnimationTimeline("auto") },
    {
        exportName: "serializeTimelineOptions",
        probe: (api) => api.serializeTimelineOptions({ timeline: { kind: "auto" } }),
    },
    { exportName: "collectAnimationOptions", probe: (api) => api.collectAnimationOptions([declaration]) },
    {
        exportName: "collectCustomFunctions",
        probe: (api) => api.collectCustomFunctions([{ kind: "function", name: "--f", descriptor: {} }]),
    },
    { exportName: "collectDeclarations", probe: (api) => api.collectDeclarations([declaration]) },
    {
        exportName: "collectKeyframes",
        probe: (api) => api.collectKeyframes([{ kind: "keyframes", name: "fade", rules: [] }]),
    },
    {
        exportName: "collectPropertyDescriptors",
        probe: (api) => api.collectPropertyDescriptors([{ kind: "property", name: "--x", descriptor: {} }]),
    },
    {
        exportName: "collectStyleRules",
        probe: (api) => api.collectStyleRules([{ kind: "style", selectors: [".x"], declarations: [] }]),
    },
    {
        exportName: "collectTimelineOptions",
        probe: (api) => api.collectTimelineOptions([{ name: "animation-timeline", value: { kind: "scalar", payload: { type: "keyword", value: "auto" } }, important: false }]),
    },
    { exportName: "parseStylesheet", probe: (api) => api.parseStylesheet(".x { color: red; }") },
];

export type DoorState = Readonly<{
    exportName: RuntimeExport;
    liveGreen: boolean;
    mirrorGreen: boolean;
    red: boolean;
}>;

function gatingProjection(value: unknown): unknown {
    if (Array.isArray(value)) {
        const output: unknown[] = [];
        for (const item of value) output.push(gatingProjection(item));
        return output;
    }
    if (typeof value !== "object" || value === null || !("ok" in value) || !("diagnostics" in value)) return value;
    const result = value as { ok: boolean; value?: unknown; diagnostics: readonly { code: unknown; expected: unknown }[] };
    return result.ok
        ? { ok: true, value: result.value }
        : { ok: false, code: result.diagnostics[0]?.code, expected: result.diagnostics[0]?.expected };
}

export function differentialDoorStates(): readonly DoorState[] {
    return WITNESSES.map(({ exportName, probe }) => {
        let liveGreen = false;
        let mirrorGreen = false;
        try {
            const expected = gatingProjection(probe(live));
            liveGreen = true;
            mirrorGreen = isDeepStrictEqual(gatingProjection(probe(mirror)), expected);
        } catch {
            // A throwing witness can never make a differential door GREEN.
        }
        return { exportName, liveGreen, mirrorGreen, red: liveGreen && !mirrorGreen };
    });
}
