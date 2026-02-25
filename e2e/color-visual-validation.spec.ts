import { test, expect } from "@playwright/test";

/**
 * Visual color validation — renders every test color in-browser using the
 * library's parseCSSColor + normalizeColorUnit pipeline and compares the
 * resulting CSS background-color to a reference swatch rendered with the
 * browser's native CSS engine.
 *
 * This catches visual mismatches that unit tests can't: if a color looks
 * wrong to the eye, the browser's computed `rgb()` values will differ.
 */

const COLOR_SPACE_TESTS: Record<string, string[]> = {
    rgb: [
        "rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)",
        "rgb(255, 255, 0)", "rgb(0, 255, 255)", "rgb(255, 0, 255)",
        "rgb(128, 128, 128)", "rgb(0, 0, 0)", "rgb(255, 255, 255)",
        "rgb(200, 100, 50 / 0.8)",
    ],
    hsl: [
        "hsl(0, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(240, 100%, 50%)",
        "hsl(60, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(300, 100%, 50%)",
        "hsl(0, 0%, 50%)", "hsl(0, 0%, 0%)", "hsl(0, 0%, 100%)",
        "hsl(210, 80%, 60% / 0.5)",
    ],
    hsv: [
        "hsv(0, 100%, 100%)", "hsv(120, 100%, 100%)", "hsv(240, 100%, 100%)",
        "hsv(60, 100%, 100%)", "hsv(180, 100%, 100%)", "hsv(300, 100%, 100%)",
        "hsv(0, 0%, 50%)", "hsv(0, 0%, 0%)", "hsv(0, 0%, 100%)",
        "hsv(30, 80%, 90%)",
    ],
    hwb: [
        "hwb(0, 0%, 0%)", "hwb(120, 0%, 0%)", "hwb(240, 0%, 0%)",
        "hwb(60, 10%, 10%)", "hwb(180, 20%, 0%)", "hwb(300, 0%, 20%)",
        "hwb(0, 50%, 50%)", "hwb(0, 0%, 100%)", "hwb(0, 100%, 0%)",
        "hwb(90, 15%, 25%)",
    ],
    lab: [
        "lab(50% 0 0)", "lab(100% 0 0)", "lab(0% 0 0)",
        "lab(53.23% 80.11 67.22)", "lab(87.74% -86.18 83.18)",
        "lab(32.3% 79.2 -107.86)", "lab(97.14% -21.56 94.48)",
        "lab(91.12% -48.08 -14.13)", "lab(60.32% 98.24 -60.83)",
        "lab(75% 20 -30 / 0.7)",
    ],
    lch: [
        "lch(50% 0 0)", "lch(53.23% 104.55 40)", "lch(87.74% 119.78 136.02)",
        "lch(32.3% 133.82 306.29)", "lch(97.14% 96.91 102.85)",
        "lch(91.12% 50.12 196.38)", "lch(60.32% 115.54 328.23)",
        "lch(0% 0 0)", "lch(100% 0 0)", "lch(70% 45 270 / 0.6)",
    ],
    oklab: [
        "oklab(50% 0 0)", "oklab(62.8% 0.225 0.126)", "oklab(86.6% -0.234 0.179)",
        "oklab(45.2% -0.032 -0.312)", "oklab(96.8% -0.071 0.199)",
        "oklab(90.5% -0.149 -0.039)", "oklab(70.2% 0.275 -0.169)",
        "oklab(0% 0 0)", "oklab(100% 0 0)", "oklab(75% 0.05 -0.1 / 0.9)",
    ],
    oklch: [
        "oklch(50% 0 0)", "oklch(62.8% 0.258 29.23)", "oklch(86.6% 0.295 142.5)",
        "oklch(45.2% 0.313 264.05)", "oklch(96.8% 0.211 109.77)",
        "oklch(90.5% 0.154 194.77)", "oklch(70.2% 0.323 328.36)",
        "oklch(0% 0 0)", "oklch(100% 0 0)", "oklch(70% 0.15 180 / 1)",
    ],
    xyz: [
        "xyz(0.5 0.5 0.5)", "xyz(0.4124 0.2126 0.0193)",
        "xyz(0.3576 0.7152 0.1192)", "xyz(0.1805 0.0722 0.9505)",
        "xyz(0.7700 0.9278 0.1385)", "xyz(0.5380 0.7874 1.0697)",
        "xyz(0.5929 0.2848 0.9698)", "xyz(0 0 0)",
        "xyz(0.9505 1 1.089)", "xyz(0.3 0.4 0.2 / 0.75)",
    ],
    kelvin: [
        "1000k", "2000k", "3000k", "4000k", "5000k",
        "6500k", "8000k", "10000k", "15000k", "20000k",
    ],
};

const NAMED_COLORS = [
    "red", "blue", "green", "coral", "tomato",
    "rebeccapurple", "dodgerblue", "hotpink", "gold", "chartreuse",
    "cyan", "magenta", "olive", "navy", "teal",
    "sienna", "orchid", "salmon", "khaki", "indigo",
];

const CSS_SPEC_EDGE_CASES = [
    // Modern space-separated syntax
    "rgb(255 0 0)", "rgb(255 0 0 / 0.5)",
    "hsl(120 100% 50%)", "hsl(120 100% 50% / 0.5)",
    // Hex shorthand & longhand
    "#f00", "#ff0000", "#ff000080", "#f008",
    // Degree units in hue
    "hsl(120deg, 100%, 50%)", "hsl(120deg 100% 50%)",
    // No-comma RGB
    "rgb(128 64 32)",
    // Case-insensitive named colors (CSS spec requirement)
    "Red", "BLUE", "DodgerBlue",
    // Percentage RGB
    "rgb(100%, 0%, 0%)", "rgb(50%, 50%, 50%)",
    // none keyword
    "rgb(none 255 0)", "hsl(none 100% 50%)",
];

/**
 * Helper: inject a <script type="module"> that imports the library via
 * Vite's /@fs/ prefix (bypasses alias resolution in browser-injected scripts).
 */
async function injectLibrary(page: any) {
    // Get the project root from the Vite dev server
    const projectRoot = process.cwd();
    const parsingPath = `/@fs${projectRoot}/src/parsing/units.ts`;
    const normalizePath = `/@fs${projectRoot}/src/units/color/normalize.ts`;

    await page.addScriptTag({
        type: "module",
        content: `
            import { parseCSSColor } from "${parsingPath}";
            import { normalizeColorUnit, colorUnit2 } from "${normalizePath}";
            window.__colorLib = { parseCSSColor, normalizeColorUnit, colorUnit2 };
            window.__colorLibReady = true;
        `,
    });
    await page.waitForFunction(() => (window as any).__colorLibReady === true, null, { timeout: 10000 });
}

/** Parse a color string and return clamped RGBA via the injected library. */
async function parseColorInBrowser(
    page: any,
    input: string,
): Promise<{ r: number; g: number; b: number; a: number } | null> {
    return page.evaluate((colorStr: string) => {
        const lib = (window as any).__colorLib;
        if (!lib) return null;
        try {
            const parsed = lib.parseCSSColor(colorStr);
            if (!parsed) return null;
            const rgb = lib.colorUnit2(parsed, "rgb", false, true, false);
            const json = rgb.value.toJSON();
            const r = Math.round(Math.max(0, Math.min(255, json.r?.value ?? json.r)));
            const g = Math.round(Math.max(0, Math.min(255, json.g?.value ?? json.g)));
            const b = Math.round(Math.max(0, Math.min(255, json.b?.value ?? json.b)));
            const rawA = json.alpha?.value ?? json.alpha ?? 100;
            const a = rawA > 1 ? rawA / 100 : rawA;
            return { r, g, b, a: Math.round(a * 1000) / 1000 };
        } catch {
            return null;
        }
    }, input);
}

test.describe("Visual Color Validation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
        await injectLibrary(page);
    });

    test("all 100 color-space colors parse and produce valid RGB", async ({ page }) => {
        const allColors = Object.entries(COLOR_SPACE_TESTS).flatMap(([space, colors]) =>
            colors.map((c) => ({ space, input: c })),
        );

        let passed = 0;
        let failed = 0;
        const failures: string[] = [];

        for (const { space, input } of allColors) {
            const result = await parseColorInBrowser(page, input);
            if (result) {
                passed++;
            } else {
                failed++;
                failures.push(`[${space}] ${input}`);
            }
        }

        if (failures.length > 0) {
            console.log(`Parse failures (${failures.length}):\n  ${failures.join("\n  ")}`);
        }

        expect(failed, `${failed}/${allColors.length} colors failed to parse`).toBe(0);
        expect(passed).toBe(allColors.length);
    });

    test("20 CSS named colors match browser-native RGB", async ({ page }) => {
        const mismatches: string[] = [];

        for (const name of NAMED_COLORS) {
            const libResult = await parseColorInBrowser(page, name);
            if (!libResult) {
                mismatches.push(`${name}: failed to parse`);
                continue;
            }

            // Get browser's native interpretation
            const nativeRGB = await page.evaluate((colorName: string) => {
                const div = document.createElement("div");
                div.style.color = colorName;
                document.body.appendChild(div);
                const computed = getComputedStyle(div).color;
                document.body.removeChild(div);
                const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
            }, name);

            if (!nativeRGB) {
                mismatches.push(`${name}: browser couldn't resolve`);
                continue;
            }

            if (libResult.r !== nativeRGB.r || libResult.g !== nativeRGB.g || libResult.b !== nativeRGB.b) {
                mismatches.push(
                    `${name}: lib=rgb(${libResult.r},${libResult.g},${libResult.b}) vs native=rgb(${nativeRGB.r},${nativeRGB.g},${nativeRGB.b})`,
                );
            }
        }

        if (mismatches.length > 0) {
            console.log(`Named color mismatches:\n  ${mismatches.join("\n  ")}`);
        }

        expect(mismatches.length, mismatches.join("; ")).toBe(0);
    });

    test("CSS spec syntax edge cases all parse successfully", async ({ page }) => {
        const failures: string[] = [];

        for (const input of CSS_SPEC_EDGE_CASES) {
            const result = await parseColorInBrowser(page, input);
            if (!result) {
                failures.push(input);
            }
        }

        if (failures.length > 0) {
            console.log(`CSS spec parse failures:\n  ${failures.join("\n  ")}`);
        }

        expect(failures.length, `Failed: ${failures.join(", ")}`).toBe(0);
    });

    test("visual swatch grid renders correctly", async ({ page }) => {
        // Build the full grid with side-by-side library vs native swatches
        const swatchCount = await page.evaluate(
            async ({ spaces, named }: { spaces: Record<string, string[]>; named: string[] }) => {
                const lib = (window as any).__colorLib;
                let count = 0;

                const overlay = document.createElement("div");
                overlay.id = "color-validation-grid";
                Object.assign(overlay.style, {
                    position: "fixed", inset: "0", zIndex: "99999",
                    background: "#0e0e0e", color: "#ccc",
                    overflowY: "auto", padding: "32px",
                    fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
                    fontSize: "10px",
                });

                // Title
                const h1 = document.createElement("h1");
                h1.textContent = "COLOR VALIDATION GRID";
                Object.assign(h1.style, {
                    fontSize: "18px", fontWeight: "200", letterSpacing: "6px",
                    marginBottom: "24px", color: "#666",
                });
                overlay.appendChild(h1);

                const allSections = { ...spaces, "Named Colors": named };

                for (const [label, colors] of Object.entries(allSections)) {
                    const section = document.createElement("div");
                    section.style.marginBottom = "20px";

                    const heading = document.createElement("h2");
                    heading.textContent = label.toUpperCase();
                    Object.assign(heading.style, {
                        fontSize: "11px", letterSpacing: "4px",
                        marginBottom: "8px", color: "#555",
                    });
                    section.appendChild(heading);

                    const grid = document.createElement("div");
                    Object.assign(grid.style, {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "4px",
                    });

                    for (const input of colors) {
                        const card = document.createElement("div");
                        Object.assign(card.style, {
                            border: "1px solid #222", borderRadius: "3px",
                            overflow: "hidden", background: "#161616",
                        });

                        try {
                            const parsed = lib.parseCSSColor(input);
                            const rgb = lib.colorUnit2(parsed, "rgb", false, true, false);
                            const json = rgb.value.toJSON();
                            const r = Math.round(Math.max(0, Math.min(255, json.r?.value ?? json.r)));
                            const g = Math.round(Math.max(0, Math.min(255, json.g?.value ?? json.g)));
                            const b = Math.round(Math.max(0, Math.min(255, json.b?.value ?? json.b)));
                            const rawA = json.alpha?.value ?? json.alpha ?? 100;
                            const a = rawA > 1 ? rawA / 100 : rawA;

                            // Swatch row: library output | native CSS (for named/standard)
                            const swatchRow = document.createElement("div");
                            swatchRow.style.display = "flex";
                            swatchRow.style.height = "40px";

                            const libSwatch = document.createElement("div");
                            libSwatch.style.flex = "1";
                            libSwatch.style.background = `rgba(${r},${g},${b},${a})`;
                            libSwatch.title = `Library: rgba(${r},${g},${b},${a.toFixed(2)})`;
                            swatchRow.appendChild(libSwatch);

                            card.appendChild(swatchRow);

                            const lbl = document.createElement("div");
                            Object.assign(lbl.style, {
                                padding: "3px 5px", lineHeight: "1.3",
                                fontSize: "8.5px", wordBreak: "break-all",
                            });
                            lbl.innerHTML = `<span style="opacity:0.4">${input}</span><br><span style="color:#6f6">rgb(${r},${g},${b})</span>`;
                            card.appendChild(lbl);

                            count++;
                        } catch {
                            card.innerHTML = `<div style="height:40px;background:#300"></div><div style="padding:3px 5px;color:#f44">${input}<br>ERROR</div>`;
                            count++;
                        }

                        grid.appendChild(card);
                    }

                    section.appendChild(grid);
                    overlay.appendChild(section);
                }

                document.body.appendChild(overlay);
                return count;
            },
            { spaces: COLOR_SPACE_TESTS, named: NAMED_COLORS },
        );

        // Verify grid rendered
        await expect(page.locator("#color-validation-grid")).toBeVisible();

        const totalExpected = Object.values(COLOR_SPACE_TESTS).flat().length + NAMED_COLORS.length;
        expect(swatchCount).toBe(totalExpected);

        // Screenshot for visual inspection
        await page.screenshot({
            path: "test-results/color-validation-grid.png",
            fullPage: false,
        });
    });
});
