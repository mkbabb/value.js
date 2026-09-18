import { verifyDtsParity } from "./parity.js";

const census = verifyDtsParity(true);
console.log(`V·π W0 d.ts parity GREEN: ${census.types} types + ${census.runtime} runtime exports.`);

