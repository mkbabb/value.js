import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(root, "../../../node_modules/@mkbabb/parse-that/dist");
const targets = new Map([
    ["@mkbabb/parse-that", "parse.js"],
    ["@mkbabb/parse-that/core", "core.js"],
    ["@mkbabb/parse-that/diagnostics", "diagnostics.js"],
    ["@mkbabb/parse-that/packrat", "packrat.js"],
    ["@mkbabb/parse-that/utils", "utils.js"],
]);

registerHooks({
    resolve(specifier, context, nextResolve) {
        const target = targets.get(specifier);
        return target === undefined ? nextResolve(specifier, context) : { url: pathToFileURL(join(packageRoot, target)).href, shortCircuit: true };
    },
});
