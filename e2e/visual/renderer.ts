// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — RENDERER HONESTY (G-10).
 *
 * G-10's falsifier, verbatim: *"Goldens minted under a renderer that is not
 * recorded, or recorded FROM CONFIG rather than the browser, fails G-10 —
 * renderer-honesty is the whole point of the software-GL half."*
 *
 * So nothing here is declared. `readRenderer()` runs inside the page that is
 * about to be photographed and asks the live WebGL context what it is. The
 * answer goes into EVERY golden's filename and into the suite header that
 * `visual.project.ts` stamps, and the full unabridged string goes into the
 * manifest at `docs/tranches/X/evidence/w1/visual/MANIFEST.json`.
 *
 * Measured at authoring on this machine (2026-09-17), by this exact code path:
 *
 *   unmaskedRenderer: "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device
 *                      (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver)"
 *   unmaskedVendor:   "Google Inc. (Google)"
 *   glVersion:        "WebGL 2.0 (OpenGL ES 3.0 Chromium)"
 *
 * — i.e. the SwiftShader software rasteriser `playwright.config.ts` pins via
 * `--use-angle=swiftshader`. CC-029 has TWO halves and this file serves half
 * (a) only: goldens minted here are SOFTWARE-GL goldens and say so in their own
 * names. Half (b), the real-GPU session, is X.W1.f's and is discharged by frames
 * or by a tombstone — never by a filename.
 *
 * ─── Why the renderer is in the FILENAME and not only in a sidecar ───────────
 *
 * Because a golden minted on one rasteriser and compared against another is a
 * false verdict in either direction, and the failure must be LOUD. With the
 * renderer in the name, a run under a different GL stack does not quietly
 * diff-against-the-wrong-baseline: it reports a MISSING golden, which is the
 * honest thing that happened. `scripts/visual/regenerate-goldens.mjs --accept`
 * is the only way to mint the new set, and it records which renderer it minted
 * under.
 *
 * ─── Why the slug is truncated and digested, not raw ─────────────────────────
 *
 * The raw string is 95 characters and carries an LLVM build number. Whole, it
 * makes every filename ~140 characters. The slug is therefore
 * `sanitise(raw).slice(0, 48)` + `-` + `sha256(raw).slice(0, 8)`: the prefix
 * names the renderer CLASS a human reads at a glance (angle / swiftshader), and
 * the digest pins the EXACT bytes, so two different drivers can never collide on
 * one slug. The unabridged string lives in the manifest, keyed by that digest.
 * Nothing is lost; only the filename is short.
 */
import type { Page } from "@playwright/test";
import { createHash } from "node:crypto";

export interface RendererIdentity {
    /** `WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL`, read in-page. */
    readonly unmaskedRenderer: string;
    /** `WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL`, read in-page. */
    readonly unmaskedVendor: string;
    /** `gl.getParameter(gl.VERSION)`. */
    readonly glVersion: string;
    /** `gl.getParameter(gl.RENDERER)` — the masked name; recorded for contrast. */
    readonly maskedRenderer: string;
    /** `navigator.userAgent`, verbatim. */
    readonly userAgent: string;
    /** WebGL2 present at all. `false` is itself a finding, never a silent pass. */
    readonly webgl2: boolean;
}

/**
 * NOT IN `RendererIdentity`, deliberately: `devicePixelRatio`.
 *
 * An earlier draft read it here and wrote it into `RENDERER.json` and the header
 * line, and the committed record then read `"devicePixelRatio": 2` on a project
 * whose `deviceScaleFactor` is 1. The record is written once per worker, by
 * whichever cell calls `identify()` first; Playwright restarts the worker after
 * a failing test, so a red mid-run handed the next write to the `zoom-200`
 * arm — which emulates 200% zoom as a half viewport at 2× DPR. The value was
 * real and measured something other than what its name claimed: the renderer
 * record's contents depended on which cells had failed earlier in the run.
 *
 * DPR is a property of the CELL. It is already in the zoom arm's viewport id and
 * so in those goldens' own filenames (`…-720x450-2-…`). A renderer record
 * records the GL stack, which is invariant across cells. See
 * `docs/tranches/X/evidence/w1/instrument-caveats.md` IC-12.
 */

/** The sentinel a cell with no WebGL context wears. Never silently omitted. */
export const NO_WEBGL = "NO-WEBGL-CONTEXT";

/**
 * Read the renderer out of the LIVE page. Creates a throwaway WebGL2 context on
 * a detached canvas — it never touches the demo's own contexts, so the aurora
 * and goo-blob surfaces are unperturbed by the act of measuring.
 */
export async function readRenderer(page: Page): Promise<RendererIdentity> {
    return page.evaluate(() => {
        const canvas = document.createElement("canvas");
        const gl =
            (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
            (canvas.getContext("webgl") as WebGLRenderingContext | null);
        const base = { userAgent: navigator.userAgent };
        if (!gl)
            return {
                ...base,
                unmaskedRenderer: "NO-WEBGL-CONTEXT",
                unmaskedVendor: "NO-WEBGL-CONTEXT",
                glVersion: "NO-WEBGL-CONTEXT",
                maskedRenderer: "NO-WEBGL-CONTEXT",
                webgl2: false,
            };
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return {
            ...base,
            unmaskedRenderer: ext
                ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
                : "NO-DEBUG-RENDERER-INFO",
            unmaskedVendor: ext
                ? String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL))
                : "NO-DEBUG-RENDERER-INFO",
            glVersion: String(gl.getParameter(gl.VERSION)),
            maskedRenderer: String(gl.getParameter(gl.RENDERER)),
            webgl2:
                typeof WebGL2RenderingContext !== "undefined" &&
                gl instanceof WebGL2RenderingContext,
        };
    });
}

/** Lowercase, `[a-z0-9]` runs joined by `-`. No other transformation. */
export function sanitiseRenderer(raw: string): string {
    return raw
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * The filename slug: a 48-char human-readable prefix plus an 8-hex digest of the
 * UNTRUNCATED string. Collision-free by the digest; readable by the prefix.
 */
export function rendererSlug(identity: RendererIdentity): string {
    const raw = identity.unmaskedRenderer;
    const digest = createHash("sha256").update(raw).digest("hex").slice(0, 8);
    const prefix = sanitiseRenderer(raw).slice(0, 48).replace(/-+$/, "");
    return `${prefix}-${digest}`;
}

/** The full digest of the unabridged string — the manifest's join key. */
export function rendererDigest(identity: RendererIdentity): string {
    return createHash("sha256").update(identity.unmaskedRenderer).digest("hex");
}

/**
 * The one-line stamp that opens the suite header of every run, and that the
 * manifest repeats verbatim. Read from the browser, never from config.
 */
export function rendererHeaderLine(identity: RendererIdentity): string {
    return (
        `RENDERER (read from the live browser, G-10): ${identity.unmaskedRenderer} | ` +
        `vendor=${identity.unmaskedVendor} | gl=${identity.glVersion} | ` +
        `webgl2=${identity.webgl2} | slug=${rendererSlug(identity)}`
    );
}
