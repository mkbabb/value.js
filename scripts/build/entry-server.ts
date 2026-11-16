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
    /** The module id of every component the render ran (plugin-vue's SSR
     *  report), so the build can link the sheets of the lazy chunks it used. */
    modules: string[];
}

export async function renderShell(): Promise<ShellRender> {
    const app = createVjsApp(true);
    await router.push("/");
    await router.isReady();
    const context: { teleports?: Record<string, string>; modules?: Set<string> } = {};
    const html = await renderToString(app, context);
    return {
        html,
        teleports: context.teleports ?? {},
        modules: [...(context.modules ?? [])],
    };
}
