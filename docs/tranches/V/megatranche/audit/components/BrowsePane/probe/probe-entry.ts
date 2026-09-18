// CHALLENGE-L probe C entry — a file-homed transcription of the 8 lines that
// currently live inline inside demo/color-picker/index.html.
import { createApp } from "vue";
// @ts-expect-error - probe-only absolute SFC import
import App from "/Users/mkbabb/Programming/value.js/demo/color-picker/App.vue";
// @ts-expect-error - probe-only absolute module import
import { router } from "/Users/mkbabb/Programming/value.js/demo/color-picker/router/index";

const app = createApp(App);
app.use(router);
app.mount("#app");
