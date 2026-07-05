import type { Plugin } from "vite";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

/**
 * Vite plugin: defer the glass-ui font corpus off the render-blocking CSS path
 * (S.W3-9 — the CSS critical-path diet).
 *
 * WHY — The render-blocking critical CSS is the single `<link>`ed `index-*.css`.
 * Measured at the S.W3 baseline it was gzip ~188 KB, of which the base64 woff2
 * corpus that `@import "@mkbabb/glass-ui/styles/fonts"` inlined into that bundle
 * was gzip ~102 KB (woff2 is already Brotli-packed internally, so gzip barely
 * recovers the base64 wrapper). Everything ELSE render-blocking — the glass-ui
 * `./styles` monolith, the SFC-scoped `./styles.css` payload, Tailwind base +
 * utilities, `tw-animate-css`, and the demo's own CSS — is only gzip ~86 KB, i.e.
 * already UNDER the wave's ≤120 KB render-blocking gate. The fonts are the whole
 * overage. (See docs/tranches/S/audit/w3-css-diet-census.md.)
 *
 * The producer DELIBERATELY split the real faces into a SEPARATE
 * `@mkbabb/glass-ui/styles/fonts` export, and ships metric-compatible
 * `*-Fallback` @font-face rules (with `ascent-override`/`size-adjust`) in the
 * CRITICAL `./styles` surface. So deferring the real faces is FOUC-safe by
 * construction: first paint renders in the metric-compat fallback (already in the
 * critical bundle → ZERO layout shift, zero invisible text), and the real faces
 * swap in with no reflow once the deferred sheet loads. This mirrors the demo's
 * existing non-blocking Fraunces load (index.html `media="print" onload=…`).
 *
 * WIRING — `style.css` no longer `@import`s the corpus; it carries the MARKER
 * comment below in its place. This plugin owns the mode-conditional behaviour:
 *
 *   build (gh-pages / production): STRIP the marker (corpus stays out of the
 *     render-blocking bundle), emit `fonts.css` verbatim as a standalone hashed
 *     asset, and inject a non-blocking `<link rel=stylesheet media=print
 *     onload=…>` (+ a `<noscript>` blocking fallback) into the document head.
 *
 *   serve (dev): REPLACE the marker with the real `@import` so the dev server
 *     renders the true faces exactly as before — dev is not gate-measured, and
 *     keeping the corpus render-blocking in dev is the zero-risk faithful path
 *     (the Playwright smoke suite runs against the dev server).
 *
 * The plugin's `transform` runs `enforce: "pre"` so the marker rewrite lands
 * BEFORE Tailwind's postcss `@import` resolution sees the file.
 */

/** The placeholder `style.css` carries where the corpus `@import` used to sit. */
const MARKER = "/*__GLASS_FONTS_DEFERRED__*/";

/** The producer's separate, deferrable font-corpus export (dist/styles/fonts.css). */
const FONTS_SPECIFIER = "@mkbabb/glass-ui/styles/fonts";

/** Stable emit name; Vite hashes it to `assets/glass-fonts-[hash].css`. */
const ASSET_NAME = "glass-fonts.css";

export function deferGlassFonts(): Plugin {
    let isBuild = false;
    let base = "/";
    let fontsCssPath = "";

    return {
        name: "value-defer-glass-fonts",
        enforce: "pre",

        configResolved(config) {
            isBuild = config.command === "build";
            base = config.base || "/";
            // Resolve the producer's fonts.css through its exports map (the same
            // `./styles/fonts` subpath style.css used to @import).
            fontsCssPath = createRequire(import.meta.url).resolve(FONTS_SPECIFIER);
        },

        transform(code, id) {
            if (!id.includes("demo/@/styles/style.css") || !code.includes(MARKER)) {
                return null;
            }
            // dev → keep the corpus render-blocking (faithful); build → drop it.
            const replacement = isBuild ? "" : `@import "${FONTS_SPECIFIER}";`;
            return code.replace(MARKER, replacement);
        },

        renderStart() {
            if (!isBuild) return;
            // Emit the corpus verbatim (base64 @font-face preserved) as its own
            // hashed asset so it is NOT concatenated into the eager index bundle.
            this.emitFile({
                type: "asset",
                name: ASSET_NAME,
                source: readFileSync(fontsCssPath, "utf8"),
            });
        },

        transformIndexHtml: {
            order: "post",
            handler(html, ctx) {
                if (!isBuild || !ctx.bundle) return;
                const asset = Object.values(ctx.bundle).find(
                    (out) =>
                        out.type === "asset" &&
                        (out.name === ASSET_NAME ||
                            out.names?.includes(ASSET_NAME) ||
                            out.originalFileName?.endsWith("fonts.css")),
                );
                if (!asset || asset.type !== "asset") return;
                const href = base + asset.fileName;
                return {
                    html,
                    tags: [
                        {
                            tag: "link",
                            attrs: {
                                rel: "stylesheet",
                                href,
                                media: "print",
                                onload: "this.media='all'",
                            },
                            injectTo: "head",
                        },
                        {
                            tag: "noscript",
                            children: `<link rel="stylesheet" href="${href}">`,
                            injectTo: "head",
                        },
                    ],
                };
            },
        },
    };
}
