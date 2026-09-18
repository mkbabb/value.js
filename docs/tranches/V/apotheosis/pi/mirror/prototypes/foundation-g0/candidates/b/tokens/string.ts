import { regex } from "@mkbabb/parse-that/core";

import { decodeEscape, escapeSource, preprocessCodePoints } from "./code-point.js";

const escapedNewlineSource = String.raw`\\(?:\r\n|[\n\r\f])`;
const doubleContentSource = String.raw`(?:[^"\\\n\r\f]|${escapedNewlineSource}|${escapeSource})`;
const singleContentSource = String.raw`(?:[^'\\\n\r\f]|${escapedNewlineSource}|${escapeSource})`;
const stringSource = String.raw`(?:"${doubleContentSource}*"|'${singleContentSource}*'|"${doubleContentSource}*$|'${singleContentSource}*$)`;
const stringEscape = new RegExp(String.raw`${escapedNewlineSource}|${escapeSource}`, "gu");

function decodeString(value: string): string {
    const closed = value.length > 1 && value.at(-1) === value[0];
    const body = value.slice(1, closed ? -1 : undefined);

    return preprocessCodePoints(body.replace(stringEscape, (escape) =>
        /^\\(?:\r\n|[\n\r\f])$/u.test(escape) || escape === "\\"
            ? ""
            : decodeEscape(escape),
    ));
}

export const cssString = regex(new RegExp(stringSource, "u")).map(decodeString);
