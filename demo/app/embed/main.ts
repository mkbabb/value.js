/**
 * The embed entry's composition root: one slice of the app (`#/picker`,
 * `#/gradient`) on a transparent ground, for an allow-listed host
 * (`./bridge.ts`). No shell, dock, atmosphere or analytics. The stylesheet
 * cascade is the app's own, in the app's order (`../main.ts`).
 */
import { createApp } from "vue";
import EmbedApp from "./EmbedApp.vue";

import "../../styles/utils.css";
import "../../styles/foundation.css";
import "../../styles/focus-ring.css";
import "./embed.css";

const app = createApp(EmbedApp);
app.config.errorHandler = (thrown, _instance, info) => {
    console.error(`[value.js embed] unhandled failure (vue · ${info})`, thrown);
};
app.mount("#app");
