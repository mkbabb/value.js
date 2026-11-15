/**
 * Reading a typed readout figure back into the colour's own channel.
 *
 * The readout shows a channel in its DISPLAY unit: a percent channel stored
 * as 0–1 (OKLCh L, HSL S) reads as 0–100, so the text a visitor edits is in
 * that unit too. `readoutEntry` takes the text the field holds and returns
 * the channel value to store, or `null` when the text is not a number (the
 * field then shows the last valid value again). The field's own unit suffix
 * may be typed or left off; a value past the channel's range lands on its
 * edge, as a slider would put it, and a hue wraps.
 */
import type { ChannelMeta } from "../../../color-session/picker-color";

/** The suffix each display unit may be typed with. */
const SUFFIX: Record<ChannelMeta["unit"], string | undefined> = { "": undefined, "%": "%", deg: "deg", K: "k" };
const ENTRY =/^([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?)\s*(%|deg|°|k)?$/i;

export function readoutEntry(text: string, meta: ChannelMeta): number | null {
    const match = ENTRY.exec(text.replace(/\s+/g, " ").trim());
    if (match === null) return null;
    const typed = Number(match[1]!.replace(",", "."));
    if (!Number.isFinite(typed)) return null;
    const suffix = match[2]?.toLowerCase();
    if (suffix !== undefined && suffix !== SUFFIX[meta.unit] && !(suffix === "°" && meta.unit === "deg"))
        return null;
    const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
    const value = typed / scale;
    if (meta.hue) return ((value % 360) + 360) % 360;
    return Math.min(meta.max, Math.max(meta.min, value));
}

/** A typed hex figure, normalised to `#rrggbb[aa]` form, or `null`. */
export function readoutHexEntry(text: string): string | null {
    const raw = text.replace(/\s+/g, "");
    const hex = raw.startsWith("#") ? raw : `#${raw}`;
    return /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex) ? hex : null;
}
