import { defineConfig } from "vite";
import path from "path";

const root = path.resolve(import.meta.dirname, "../../../../../../../..");

export default defineConfig({
    resolve: {
        alias: [
            {
                find: /^@mkbabb\/value\.js\/css$/,
                replacement: path.resolve(root, "dist/subpaths/css.js"),
            },
            {
                find: /^@mkbabb\/value\.js\/color$/,
                replacement: path.resolve(root, "dist/subpaths/color.js"),
            },
            {
                find: /^@mkbabb\/value\.js\/easing$/,
                replacement: path.resolve(root, "dist/subpaths/easing.js"),
            },
        ],
    },
});
