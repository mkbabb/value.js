import { regex } from "@mkbabb/parse-that/core";

import { decodeName, escapeSource, nameCodePointSource, nameStartSource } from "./code-point.js";

const identifierSource = String.raw`(?:--|-(?:${nameStartSource}|${escapeSource})|${nameStartSource}|${escapeSource})${nameCodePointSource}*`;

export const cssIdentifier = regex(new RegExp(identifierSource, "u")).map(decodeName);
