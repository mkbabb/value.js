import type { Palette } from "./types";

export interface ExportResult {
    content: string | Blob;
    filename: string;
    mime: string;
}

function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function exportAsJSON(palette: Palette): ExportResult {
    const data = {
        name: palette.name,
        slug: palette.slug,
        colors: palette.colors.map((c) => ({ css: c.css, position: c.position, name: c.name })),
    };
    return {
        content: JSON.stringify(data, null, 2),
        filename: `${slugify(palette.name)}.json`,
        mime: "application/json",
    };
}

export function exportAsCSSCustomProperties(palette: Palette): ExportResult {
    const slug = slugify(palette.name);
    const lines = palette.colors.map(
        (c, i) => `  --palette-${slug}-${i}: ${c.css};`,
    );
    const css = `:root {\n${lines.join("\n")}\n}\n`;
    return {
        content: css,
        filename: `${slug}.css`,
        mime: "text/css",
    };
}

export function exportAsTailwindConfig(palette: Palette): ExportResult {
    const slug = slugify(palette.name);
    const colorObj: Record<string, string> = {};
    palette.colors.forEach((c, i) => {
        colorObj[String(i)] = c.css;
    });
    const config = {
        theme: {
            extend: {
                colors: {
                    [slug]: colorObj,
                },
            },
        },
    };
    return {
        content: `// Tailwind config for "${palette.name}"\nexport default ${JSON.stringify(config, null, 2)}\n`,
        filename: `${slug}.tailwind.ts`,
        mime: "text/typescript",
    };
}

export function exportAsSVG(palette: Palette): ExportResult {
    const swatchW = 60;
    const swatchH = 80;
    const width = palette.colors.length * swatchW;
    const height = swatchH + 30;

    const rects = palette.colors.map(
        (c, i) => `  <rect x="${i * swatchW}" y="0" width="${swatchW}" height="${swatchH}" fill="${c.css}" />`,
    ).join("\n");

    const svg = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
        rects,
        `  <text x="${width / 2}" y="${swatchH + 20}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#333">${palette.name}</text>`,
        `</svg>`,
    ].join("\n");

    return {
        content: svg,
        filename: `${slugify(palette.name)}.svg`,
        mime: "image/svg+xml",
    };
}

export async function exportAsPNG(palette: Palette): Promise<ExportResult> {
    const { content: svg } = exportAsSVG(palette);
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width * 2; // 2x for retina
            canvas.height = img.height * 2;
            const ctx = canvas.getContext("2d")!;
            ctx.scale(2, 2);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve({
                        content: blob,
                        filename: `${slugify(palette.name)}.png`,
                        mime: "image/png",
                    });
                } else {
                    reject(new Error("Failed to create PNG blob"));
                }
            }, "image/png");
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load SVG for PNG conversion"));
        };
        img.src = url;
    });
}

export function downloadExport(result: ExportResult) {
    const blob =
        result.content instanceof Blob
            ? result.content
            : new Blob([result.content], { type: result.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
}
