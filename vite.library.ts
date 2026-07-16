import { resolve } from "node:path";

const ENTRY_NAMES = ["color", "value", "css", "easing", "math", "transform", "quantize"] as const;

export function libraryEntries(rootDir: string): Record<string, string> {
    return Object.fromEntries(ENTRY_NAMES.map((name) => [name, resolve(rootDir, `src/subpaths/${name}.ts`)]));
}

export function libraryFileName(_format: string, entryName: string): string {
    return `subpaths/${entryName}.js`;
}

export const libraryExternal: string[] = [];
