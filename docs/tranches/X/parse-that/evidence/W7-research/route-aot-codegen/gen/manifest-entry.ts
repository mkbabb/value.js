import { grammar } from "/Users/mkbabb/Programming/value.js/src/css/bbnf/index";
import { actionManifest } from "./load-aot";
console.log(JSON.stringify(actionManifest(grammar() as any)));
