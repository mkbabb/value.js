/**
 * The build-time renderer of the first-view shell (X.W11.p3 · COHESION
 * §0ge.1(iii)). It renders the SAME app the browser builds (`createVjsApp`,
 * demo/app/main.ts) at `/` with the default seed, so the markup it emits is
 * the tree the client hydrates in place. Bundled by `prerender-shell.ts` as an
 * SSR build of the gh-pages config; never shipped.
 */
import { renderToString } from "vue/server-renderer";

import { createVjsApp } from "../../demo/app/main";
import { router } from "../../demo/app/router/index";

export interface ShellRender {
    html: string;
    teleports: Record<string, string>;
}

export async function renderShell(): Promise<ShellRender> {
    const app = createVjsApp(true);
    await router.push("/");
    await router.isReady();
    const context: { teleports?: Record<string, string> } = {};
    const html = await renderToString(app, context);
    return { html, teleports: context.teleports ?? {} };
}
