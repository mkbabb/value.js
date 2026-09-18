import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";

const candidatePath = process.argv[2];
assert(candidatePath, "usage: tsx browser-witness.mts <candidate-index.ts>");

const candidate = await import(pathToFileURL(candidatePath).href) as {
    cssIdentifier: { parse(input: string): { value: string; error: string | null } };
    cssString: { parse(input: string): { value: string; quote: string; error: string | null } };
    cssSpacing: { parseState(input: string): { isError: boolean; offset: number; value: unknown } };
};

assert.deepEqual(candidate.cssIdentifier.parse(String.raw`r\65 d`), { value: "red", error: null });
assert.deepEqual(candidate.cssString.parse(String.raw`"a\41 b"`), {
    value: "aAb",
    quote: "\"",
    error: null,
});
const spacing = candidate.cssSpacing.parseState("/*a*/ \n");
assert.equal(spacing.isError, false);
assert.equal(spacing.offset, 7);

const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage();
    const witness = await page.evaluate(`(() => {
        const element = document.createElement("div");
        document.body.append(element);
        element.style.color = String.raw\`\\72 ed\`;
        element.style.content = String.raw\`"a\\41 b"\`;
        const computed = getComputedStyle(element);
        return {
            userAgent: navigator.userAgent,
            escapedColorSupported: CSS.supports("color", String.raw\`\\72 ed\`),
            commentSpacingSupported: CSS.supports("color", "/*a*/ red"),
            rawFeffCustomPropertySupported: CSS.supports("--\\uFEFFx", "1"),
            color: computed.color,
            content: computed.content,
        };
    })()`);

    assert.equal(witness.escapedColorSupported, true);
    assert.equal(witness.commentSpacingSupported, true);
    assert.equal(witness.rawFeffCustomPropertySupported, true);
    assert.equal(witness.color, "rgb(255, 0, 0)");
    assert.equal(witness.content, '"aAb"');

    process.stdout.write(`${JSON.stringify({ status: "PASS", ...witness })}\n`);
} finally {
    await browser.close();
}
