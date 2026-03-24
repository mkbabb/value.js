import { useDark } from "@vueuse/core";
import { computed } from "vue";

/**
 * Parse a CSS color string to OKLCh components via browser canvas.
 */
function cssToOklch(css: string): [number, number, number] | null {
    try {
        const ctx = document.createElement("canvas").getContext("2d")!;
        ctx.fillStyle = css;
        const resolved = ctx.fillStyle;
        /* Parse the hex or rgb() result */
        ctx.fillStyle = resolved;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        const r = d[0]!, g = d[1]!, b = d[2]!;
        /* Convert sRGB -> linear -> OKLab -> OKLCh */
        const toLinear = (c: number) => {
            const s = c / 255;
            return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        const lr = toLinear(r),
            lg = toLinear(g),
            lb = toLinear(b);
        const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
        const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
        const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
        const l3 = Math.cbrt(l_),
            m3 = Math.cbrt(m_),
            s3 = Math.cbrt(s_);
        const L = 0.2104542553 * l3 + 0.7936177850 * m3 - 0.0040720468 * s3;
        const a = 1.9779984951 * l3 - 2.4285922050 * m3 + 0.4505937099 * s3;
        const bOk = 0.0259040371 * l3 + 0.7827717662 * m3 - 0.8086757660 * s3;
        const C = Math.sqrt(a * a + bOk * bOk);
        let H = (Math.atan2(bOk, a) * 180) / Math.PI;
        if (H < 0) H += 360;
        return [L, C, H];
    } catch {
        return null;
    }
}

/**
 * Computes CSS custom properties for heading colors derived from the given CSS color.
 * Returns a computed ref of style variables keyed by `--md-color-*`.
 */
export function useMarkdownColors(cssColor: () => string | undefined) {
    const isDark = useDark({ disableTransition: false });

    const mdColorVars = computed(() => {
        const color = cssColor();
        if (!color) return {};
        const oklch = cssToOklch(color);
        if (!oklch) return {};
        const [l, c, h] = oklch;

        /* Keep lightness readable; boost chroma slightly for headings */
        const baseLightness = isDark.value ? Math.max(l, 0.72) : Math.min(l, 0.45);
        const headingChroma = Math.max(c, 0.08);

        return {
            "--md-color-h2": `oklch(${baseLightness} ${headingChroma} ${h})`,
            "--md-color-h3": `oklch(${baseLightness} ${headingChroma} ${(h + 40) % 360})`,
            "--md-color-accent": `oklch(${baseLightness} ${headingChroma} ${(h + 20) % 360})`,
        } as Record<string, string>;
    });

    return { mdColorVars };
}
