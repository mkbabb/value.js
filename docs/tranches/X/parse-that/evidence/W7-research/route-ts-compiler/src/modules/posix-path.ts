// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · modules/posix-path.ts — the F-b-1 root cure's path half: the three path
// operations bbnf-lang's module loader needs, over `/`-separated module IDs, with NO `node:path`
// (whose browser-external stub is what the published 0.1.4 build replaced with `undefined`).
// A module ID is a path in the grammar's own namespace (a files map key, a URL path, or a real
// filesystem path supplied by a node host) — never resolved against a process cwd.

/** `a/./b/../c` → `a/c`; a leading `/` is kept. */
function normalize(p: string): string {
    const abs = p.startsWith("/");
    const out: string[] = [];
    for (const seg of p.split("/")) {
        if (seg === "" || seg === ".") continue;
        if (seg === "..") { if (out.length > 0 && out[out.length - 1] !== "..") out.pop(); else if (!abs) out.push(".."); continue; }
        out.push(seg);
    }
    return (abs ? "/" : "") + out.join("/");
}
export function resolve(...parts: string[]): string {
    let acc = "";
    for (const p of parts) acc = p.startsWith("/") ? p : acc === "" ? p : `${acc}/${p}`;
    return normalize(acc);
}
export function dirname(p: string): string {
    const n = normalize(p);
    const i = n.lastIndexOf("/");
    return i < 0 ? "." : i === 0 ? "/" : n.slice(0, i);
}
export function extname(p: string): string {
    const base = p.slice(p.lastIndexOf("/") + 1);
    const i = base.lastIndexOf(".");
    return i <= 0 ? "" : base.slice(i);
}
