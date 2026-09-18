/**
 * CHALLENGE-C evidence probe — replicates `useImageSampler.formatInColorSpace`
 * verbatim (demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:55-66)
 * and sweeps every display space × the 8-bit hex domain the eyedropper can produce.
 * Run: npx tsx docs/tranches/V/megatranche/audit/components/wb-extract-imageeyedropper/probe-space-throw.ts
 */
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    CSS_PICKER_SPACES,
    convertPickerColor,
    serializePickerColor,
    PICKER_CHANNELS,
} from "../../../../../../../demo/color-session/picker-color";

function formatLibraryColor(color: any): string {
    const channels = color.channels.map((c: any) => (c === "none" ? c : Number(c.toFixed(4)).toString()));
    const alpha = color.alpha === 1 ? "" : ` · α ${color.alpha}`;
    return `${color.space.toUpperCase()} ${channels.join(" · ")}${alpha}`;
}
function formatInColorSpace(hex: string, space: any): string {
    if (space === "hex") return hex;
    const parsed = parseCssColor(hex);
    if (!parsed.ok) throw new Error(`parse fail ${parsed.diagnostics[0].code}`);
    const converted = convertPickerColor(parsed.value, space);
    return CSS_PICKER_SPACES.has(space) ? serializePickerColor(converted) : formatLibraryColor(converted);
}

const spaces = Object.keys(PICKER_CHANNELS);
const h = (v: number) => v.toString(16).padStart(2, "0");
const failures: Record<string, string[]> = {};
let total = 0;
for (const s of spaces) {
    for (let v = 0; v < 256; v++) {
        const greys = [`#${h(v)}${h(v)}${h(v)}`];
        if (v < 8) greys.push(`#ff${h(v)}${h(v)}`, `#${h(v)}ff${h(v)}`, `#${h(v)}${h(v)}ff`);
        for (const hex of greys) {
            total++;
            try { formatInColorSpace(hex, s); }
            catch (e: any) { (failures[s] ??= []).push(`${hex} → ${e.name}: ${e.message}`); }
        }
    }
}
console.log(`swept ${total} (space, hex) pairs`);
for (const [s, list] of Object.entries(failures)) {
    console.log(`\nSPACE ${s}: ${list.length} throwing inputs`);
    console.log("  " + list.slice(0, 6).join("\n  ") + (list.length > 6 ? `\n  … +${list.length - 6} more` : ""));
}
if (!Object.keys(failures).length) console.log("no throws");
