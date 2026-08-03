import { defineConfig } from "vite";
import path from "path";
const which = process.env.ENTRY!;
export default defineConfig({
    resolve: { dedupe: ["vue", "reka-ui"] },
    build: {
        lib: { entry: path.resolve(process.env.SP!, `${which}-entry.js`), formats: ["es"], fileName: () => `${which}.js` },
        outDir: path.resolve(process.env.SP!, `out-${which}`),
        emptyOutDir: true,
        minify: "esbuild",
        rollupOptions: { external: ["vue", "reka-ui", "@vueuse/core"] },
        cssCodeSplit: false,
    },
});
