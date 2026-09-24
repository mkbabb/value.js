// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · modules/index.ts — `@import` for a grammar split into modules, host-agnostic
// (F-b-1 cured at the root): the caller hands the loader its modules as a map of module ID → text
// (a bundler's `?raw` imports, a fetch, or a node host's files), and nothing else is assumed.

import type { AST } from "../../vendor/bbnf-0.1.4/types.js";
import { loadModuleGraphSync } from "./imports-loader.js";
import { formatImportError, mergeModuleAST } from "./imports.js";

/** The merged rule table of `entry` and everything it imports, from `files` (module ID → text). */
export function grammarFromModules(files: Readonly<Record<string, string>>, entry: string): AST {
    const registry = loadModuleGraphSync(entry, (id) => {
        const text = files[id];
        if (text === undefined) throw new Error(`no module \`${id}\``);
        return text;
    });
    if (registry.errors.length > 0) throw new Error(`bbnf imports:\n${registry.errors.map(formatImportError).join("\n")}`);
    return mergeModuleAST(registry, entry);
}
