import { any, regex, string } from "@mkbabb/parse-that/core";

import { cssNameCodePoint } from "./code-point.js";

const cssNameStart = cssNameCodePoint.minus(regex(/[0-9-]/u));

const identifierPrefix = any(
    string("--"),
    string("-").then(cssNameStart).map(([hyphen, start]) => hyphen + start),
    cssNameStart,
);

export const cssIdentifier = identifierPrefix
    .then(cssNameCodePoint.many())
    .map(([prefix, continuation]) => prefix + continuation.join(""));
