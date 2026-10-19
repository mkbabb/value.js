// Does Object.create(state) (0.8.2 mapState) change the ParserState's hidden class? (--allow-natives-syntax)
import { ParserState } from "/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/parse-that/dist/parse.js";
const a = new ParserState("x"), b = new ParserState("y");
console.log("fresh a~b same map:", %HaveSameMap(a, b));
Object.create(b);
console.log("after Object.create(b): a~b same map:", %HaveSameMap(a, b));
const c = new ParserState("z"); Object.create(c);
console.log("two prototype-mode states b~c same map:", %HaveSameMap(b, c));
b.offset = 3; c.offset = 4;
console.log("after writes b~c same map:", %HaveSameMap(b, c));
