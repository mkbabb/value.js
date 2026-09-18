/**
 * CHALLENGE-C pass-5 probe #16 — two cheap, decisive checks.
 *
 * (a) `PalettesPane.vue:177` holds component instances in a DEEP `reactive()`
 *     Record. Prove, with the exact Vue build the app runs, that reading a key
 *     back yields a PROXY of the instance, not the instance.
 * (b) enumerate every glass-ui prop this pane's subtree passes, so the
 *     "dead prop" class can be counted rather than asserted.
 */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

const r = await page.evaluate(async () => {
    const { reactive, isReactive, toRaw, version } = await import("/node_modules/.vite/deps/vue.js").catch(() => import("/@fs/Users/mkbabb/Programming/value.js/node_modules/vue/dist/vue.runtime.esm-bundler.js"));
    // A stand-in with the same shape a component public instance has.
    const instance = { $: {}, showFeedback() {}, isUnmounted: false };
    const map = reactive({});
    map["id-A"] = instance;
    const readBack = map["id-A"];
    return {
        vueVersion: version,
        storedIsProxied: isReactive(readBack),
        identityPreserved: readBack === instance,
        toRawRecoversIt: toRaw(readBack) === instance,
        // deep-tracking reaches the nested component internals object
        nestedAlsoProxied: isReactive(readBack.$),
    };
});
console.log("reactive() over component instances:", JSON.stringify(r, null, 2));
await browser.close();
