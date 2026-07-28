import { defineConfig } from "vite";
import path from "path";
import { readFileSync } from "fs";
const rootDir = "/Users/mkbabb/Programming/value.js";
const D = rootDir + "/docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes-L-r2";
const PKG = JSON.parse(readFileSync(rootDir + "/package.json", "utf8")) as { exports: Record<string, { import: string }> };
const valueJsSelfAlias = Object.entries(PKG.exports).map(([subpath, c]) => {
    const spec = "@mkbabb/value.js" + subpath.slice(1);
    return { find: new RegExp(`^${spec.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), replacement: path.resolve(rootDir, c.import) };
});
const ENTRY = process.env.MEASURE_ENTRY!;
export default defineConfig({
    resolve: { alias: [...valueJsSelfAlias] },
    build: {
        minify: true,
        outDir: D + "/out-" + path.basename(ENTRY, ".ts"),
        emptyOutDir: true,
        lib: { entry: D + "/" + ENTRY, fileName: "m", formats: ["es"] },
        rolldownOptions: {
            external: ["vue", "reka-ui", "@vueuse/core", "@lucide/vue", "embla-carousel", "embla-carousel-vue", "@mkbabb/keyframes.js", "@mkbabb/pencil-boil", "tailwindcss", "tw-animate-css", "clsx", "tailwind-merge", "sortablejs", "katex", "highlight.js"],
        },
    },
});
