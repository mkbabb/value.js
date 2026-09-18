import assert from "node:assert/strict";

import { chromium } from "playwright";

import {
    cssComments,
    cssIdentifier,
    cssString,
} from "../foundation-g3/integration/grammar/css/l4/tokens/index.ts";

assert.deepEqual(cssIdentifier.parse(String.raw`r\65 d`), {
    value: "red",
    error: null,
});
assert.deepEqual(cssString.parse(String.raw`"a\41 b"`), {
    value: "aAb",
    quote: "\"",
    error: null,
});
const comments = cssComments.parseState("/*a*//**/ red");
assert.equal(comments.isError, false);
assert.equal(comments.offset, 9);
assert.deepEqual(comments.value, { error: null });

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
            adjacentCommentsSupported: CSS.supports("color", "/*a*//**/ red"),
            rawFeffCustomPropertySupported: CSS.supports("--\\uFEFFx", "1"),
            color: computed.color,
            content: computed.content,
        };
    })()`);

    assert.equal(witness.escapedColorSupported, true);
    assert.equal(witness.adjacentCommentsSupported, true);
    assert.equal(witness.rawFeffCustomPropertySupported, true);
    assert.equal(witness.color, "rgb(255, 0, 0)");
    assert.equal(witness.content, '"aAb"');

    process.stdout.write(`${JSON.stringify({ status: "PASS", ...witness })}\n`);
} finally {
    await browser.close();
}
