import { readFileSync } from "node:fs";
import { parseStylesheet as liveS } from "/Users/mkbabb/Programming/value.js/src/css/index.ts";
import { parseCSSStylesheet as depS } from "../deposed-full/deposed-bundle.mjs";
const files = ["demo/styles/shell.css","demo/styles/animations.css","demo/styles/focus-ring.css","demo/styles/utils.css","demo/picker/seat.css","demo/picker/header.css","demo/color-picker/composables/boot/overture.css"];
const okR = (r: any) => typeof r === "object" && r?.ok === true;
const okT = (fn: () => unknown) => { try { fn(); return true; } catch(e){ return (e as Error).message.slice(0,40); } };
for (const f of files) {
    const src = readFileSync("/Users/mkbabb/Programming/value.js/"+f, "utf8");
    const L = okR(liveS(src));
    const D = okT(() => depS(src));
    console.log(`  ${f.padEnd(50)} bytes=${String(src.length).padStart(5)} live=${L} deposed=${D}`);
}
