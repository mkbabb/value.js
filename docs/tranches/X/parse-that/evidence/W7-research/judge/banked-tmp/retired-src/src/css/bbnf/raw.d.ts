// SERVED MODEL: claude-opus-5-5
//
// The grammar modules are imported as text (`?raw`, Vite's asset query) and compiled by
// `@mkbabb/bbnf-lang` at load. The library program (`tsconfig.lib.json`) does not carry
// `vite/client`, so the one query this area uses is declared here.
declare module "*.bbnf?raw" {
    const source: string;
    export default source;
}
