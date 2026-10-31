# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/modality.visual.spec.ts >> rtl-mobile · dir="rtl" at mobile width — the second half of R-21's NO-WAVE-OWNER witness >> picker
- Location: e2e/visual/modality.visual.spec.ts:172:13

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: screencast.showOverlays: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - navigation "Application navigation" [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e12]:
          - generic:
            - generic:
              - generic: →
              - separator
              - button:
                - img
              - button:
                - img
          - generic:
            - generic:
              - generic:
                - img
                - textbox:
                  - /placeholder: slug or token
                - button [disabled]:
                  - img
              - separator
              - button:
                - img
          - generic:
            - generic:
              - button:
                - img
              - separator
              - generic:
                - generic:
                  - generic [ref=e15]:
                    - button [ref=e17] [cursor=pointer]:
                      - img [ref=e18]
                    - button [ref=e22] [cursor=pointer]:
                      - img [ref=e23]
                    - button [ref=e27] [cursor=pointer]:
                      - img [ref=e28]
                    - button [ref=e32] [cursor=pointer]:
                      - img [ref=e33]
                    - button [ref=e40] [cursor=pointer]:
                      - img [ref=e41]
                  - generic:
                    - generic:
                      - generic:
                        - generic:
                          - textbox
                          - button:
                            - img
                - separator
                - button:
                  - img
          - generic [ref=e45]:
            - combobox "Select view" [ref=e46] [cursor=pointer]:
              - img [ref=e47]
              - img [ref=e50]
            - button "Toggle action bar" [ref=e54] [cursor=pointer]:
              - img [ref=e55]
            - button "Menu" [ref=e60] [cursor=pointer]:
              - img [ref=e61]
        - status [ref=e65]
    - main "Home" [ref=e66]:
      - heading "Home" [level=1] [ref=e67]
      - status [ref=e68]: Home view
      - generic [ref=e69]:
        - region "Picker" [ref=e70]:
          - generic [ref=e73]:
            - generic [ref=e74]:
              - combobox "Select color space" [ref=e76] [cursor=pointer]:
                - generic: OKLCh
                - img [ref=e77]
              - heading "73.0 % 0.2 2.0 deg" [level=3] [ref=e79]:
                - generic [ref=e80]:
                  - textbox "l component value" [ref=e81]
                  - generic [ref=e82]: "%"
                  - generic [ref=e83]: ","
                - generic [ref=e84]:
                  - textbox "c component value" [ref=e85]
                  - generic [ref=e86]: ","
                - generic [ref=e87]:
                  - textbox "h component value" [ref=e88]
                  - generic [ref=e89]: deg
            - generic [ref=e91]:
              - figure [ref=e92]:
                - img "Color spectrum, saturation 58%, lightness 100%" [ref=e93]
              - generic [ref=e95]:
                - tablist "Color channels" [ref=e96]:
                  - generic [ref=e97]:
                    - tab "l channel" [ref=e98] [cursor=pointer]: L
                    - tab "c channel" [ref=e99] [cursor=pointer]: C
                    - tab "h channel" [ref=e100] [cursor=pointer]: h
                    - tab "alpha channel" [ref=e101] [cursor=pointer]: α
                - generic [ref=e102]:
                  - generic [ref=e103]:
                    - generic "L channel" [ref=e105]:
                      - slider "L channel" [ref=e108]
                    - generic [ref=e109]: 73.0%
                  - generic [ref=e110]:
                    - generic "C channel" [ref=e112]:
                      - slider "C channel" [ref=e115]
                    - generic [ref=e116]: "0.2"
                  - generic [ref=e117]:
                    - generic "H channel" [ref=e119]:
                      - slider "H channel" [ref=e122]
                    - generic [ref=e123]: 2.0deg
                  - generic [ref=e124]:
                    - generic "ALPHA channel" [ref=e126]:
                      - slider "ALPHA channel" [ref=e129]
                    - generic [ref=e130]: 100.0%
        - region "About" [ref=e131]:
          - generic [ref=e133]:
            - generic [ref=e134]:
              - heading "About the color spaces," [level=2] [ref=e135]:
                - text: About the color spaces,
                - combobox "Select color space" [ref=e136] [cursor=pointer]:
                  - generic: OKLCh
                  - img [ref=e137]
              - paragraph [ref=e139]: The math, the science, the art, the beauty of color spaces.
            - generic [ref=e140]:
              - generic [ref=e142]:
                - generic [ref=e143]:
                  - heading "Definition" [level=2] [ref=e144]
                  - paragraph [ref=e145]: A cylindrical representation of the OKLab color space.
                - separator [ref=e146]
                - generic [ref=e147]:
                  - heading "Basic information" [level=2] [ref=e148]
                  - generic [ref=e149]:
                    - generic [ref=e150]: "Device dependency:"
                    - generic [ref=e151]: Device-independent
                    - generic [ref=e152]: "White point:"
                    - generic [ref=e153]: D65
                    - generic [ref=e154]: "Gamut:"
                    - generic [ref=e155]: Unlimited
                    - generic [ref=e156]: "Created:"
                    - generic [ref=e157]: "2019"
                - separator [ref=e158]
                - generic [ref=e159]:
                  - heading "Components" [level=2] [ref=e160]
                  - generic [ref=e161]:
                    - generic [ref=e162]:
                      - generic [ref=e163]: L (Lightness)
                      - generic [ref=e164]: 0% to 100%
                    - generic [ref=e165]:
                      - generic [ref=e166]: C (Chroma)
                      - generic [ref=e167]: 0 to 0.5
                    - generic [ref=e168]:
                      - generic [ref=e169]: h (hue)
                      - generic [ref=e170]: 0deg to 360deg
                - separator [ref=e171]
                - generic [ref=e172]:
                  - heading "Key properties" [level=2] [ref=e173]
                  - generic [ref=e174]:
                    - generic [ref=e175]: "Perceptual uniformity:"
                    - generic [ref=e176]: Yes (inherited from OKLab)
                    - generic [ref=e177]: "Hue linearity:"
                    - generic [ref=e178]: "Yes"
                    - generic [ref=e179]: "Lightness separation:"
                    - generic [ref=e180]: "Yes"
                - separator [ref=e181]
                - generic [ref=e182]:
                  - heading "Conversion graph" [level=2] [ref=e183]
                  - generic [ref=e184]:
                    - generic [ref=e185]:
                      - generic [ref=e186]: OKLCh
                      - img [ref=e187]
                      - generic [ref=e189]: OKLab
                    - generic [ref=e190]:
                      - generic [ref=e191]: OKLCh
                      - img [ref=e192]
                      - generic [ref=e194]: OKLab
                      - img [ref=e195]
                      - generic [ref=e197]: XYZ
                    - generic [ref=e198]:
                      - generic [ref=e199]: OKLCh
                      - img [ref=e200]
                      - generic [ref=e202]: OKLab
                      - img [ref=e203]
                      - generic [ref=e205]: XYZ
                      - img [ref=e206]
                      - generic [ref=e208]: Lab
                - separator [ref=e209]
                - generic [ref=e210]:
                  - heading "Usage" [level=2] [ref=e211]
                  - generic [ref=e212]:
                    - generic [ref=e213]: "Common applications: Color selection, Color harmony, Gradient creation"
                    - generic [ref=e214]: "Industries: Web design, User interface design, Digital art"
              - separator [ref=e215]
              - generic [ref=e216]:
                - heading "Detailed Guide" [level=2] [ref=e217]
                - generic [ref=e219]:
                  - heading "Historical Context" [level=3] [ref=e220]
                  - paragraph [ref=e221]:
                    - mark [ref=e222]: OKLCh
                    - text: is the polar form of
                    - link "OKLab" [ref=e223] [cursor=pointer]:
                      - /url: https://bottosson.github.io/posts/oklab/
                    - text: ", published by Björn Ottosson in 2020 to address the perceptual non-uniformities in older Lab/LCh models. The relationship is the same—Cartesian"
                    - code [ref=e224]: a
                    - text: /
                    - code [ref=e225]: b
                    - text: re-expressed as chroma and hue—but the underlying OKLab space produces better uniformity, especially in blues and purples where CIE L*a*b* shows significant error.
                    - mark [ref=e226]: OKLCh
                    - text: is a first-class color function in
                    - strong [ref=e227]: CSS Color Level 4
                    - text: .
                  - separator [ref=e228]
                  - heading "Key Characteristics" [level=2] [ref=e229]
                  - list [ref=e230]:
                    - listitem [ref=e231]:
                      - strong [ref=e232]: Better uniformity than CIE LCh.
                      - text: Equal chroma steps look more consistent across the hue circle.
                    - listitem [ref=e233]:
                      - strong [ref=e234]: Polar coordinates.
                      - text: Lightness, chroma, and hue—same intuitive axes as LCh.
                    - listitem [ref=e235]:
                      - strong [ref=e236]: Stable lightness.
                      - text: Changing chroma or hue doesn’t shift perceived brightness the way it does in HSL.
                    - listitem [ref=e237]:
                      - strong [ref=e238]: CSS-native.
                      - code [ref=e239]: oklch()
                      - text: is supported in all modern browsers as of 2024.
                  - heading "Advantages" [level=2] [ref=e240]
                  - list [ref=e241]:
                    - listitem [ref=e242]: Markedly better perceptual uniformity than HSL, HSV, or CIE LCh
                    - listitem [ref=e243]: Perceived brightness stays stable when you adjust chroma or hue
                    - listitem [ref=e244]: Direct CSS support—no conversion step for web use
                    - listitem [ref=e245]: Clean gradients and palette generation with minimal hue shift
                  - heading "Disadvantages" [level=2] [ref=e246]
                  - list [ref=e247]:
                    - listitem [ref=e248]: Newer; less support in legacy tools and older design software
                    - listitem [ref=e249]:
                      - text: Conversion chain is longer than RGB or HSL (
                      - mark [ref=e250]: OKLCh
                      - text: → OKLab → XYZ → linear RGB → sRGB)
                    - listitem [ref=e251]: Not directly displayable—still needs gamut mapping to a device space
                    - listitem [ref=e252]: The 0–1 lightness scale differs from Lab/LCh’s 0–100, which can cause confusion
                  - separator [ref=e253]
                  - heading "Color Model" [level=2] [ref=e254]
                  - heading "Components" [level=3] [ref=e255]
                  - list [ref=e256]:
                    - listitem [ref=e257]:
                      - paragraph [ref=e258]:
                        - strong [ref=e259]:
                          - code [ref=e260]: L
                          - text: (Lightness)
                        - text: ": 0 (black) to 1 (white). Note the 0–1 range, not 0–100 as in CIE L*."
                    - listitem [ref=e261]:
                      - paragraph [ref=e262]:
                        - strong [ref=e263]:
                          - code [ref=e264]: C
                          - text: (Chroma)
                        - text: ": 0 (achromatic) to roughly 0.4 for the most saturated colors. The scale is much smaller than CIE LCh’s."
                    - listitem [ref=e265]:
                      - paragraph [ref=e266]:
                        - strong [ref=e267]:
                          - code [ref=e268]: H
                          - text: (Hue)
                        - text: ": 0 to 360 degrees (or 0–1 normalized). Same angular concept as LCh, but hue spacing is more perceptually even—the “blue problem” in CIE LCh (where blues compress into a narrow hue range) is largely resolved."
                  - heading "Relationship to OKLab" [level=3] [ref=e269]
                  - paragraph [ref=e270]:
                    - mark [ref=e271]: OKLCh
                    - text: "relates to OKLab exactly as CIE LCh relates to CIE Lab: same data, polar vs. Cartesian."
                    - code [ref=e272]: C = sqrt(a^2 + b^2)
                    - text: ","
                    - code [ref=e273]: H = atan2(b, a)
                    - text: . The lightness channel is shared directly.
                  - separator [ref=e274]
                  - heading "Color Conversions" [level=2] [ref=e275]
                  - heading "OKLCh to OKLab" [level=3] [ref=e276]:
                    - mark [ref=e277]: OKLCh
                    - text: to OKLab
                  - paragraph [ref=e278]:
                    - text: Polar to Cartesian—recover the
                    - code [ref=e279]: a
                    - text: /
                    - code [ref=e280]: b
                    - text: "axes from chroma and hue:"
                  - region "Formula" [ref=e281]
                  - heading "OKLab to OKLCh" [level=3] [ref=e282]:
                    - text: OKLab to
                    - mark [ref=e283]: OKLCh
                  - paragraph [ref=e284]:
                    - text: Cartesian to polar—extract chroma (magnitude) and hue (angle) from the
                    - code [ref=e285]: a
                    - text: /
                    - code [ref=e286]: b
                    - text: "plane:"
                  - region "Formula" [ref=e287]
                  - heading "OKLab to XYZ" [level=3] [ref=e288]
                  - paragraph [ref=e289]: "Invert the two linear transforms around a cube operation. The cube reverses the perceptual cube-root compression applied in the forward path:"
                  - region "Formula" [ref=e290]
                  - heading "XYZ to OKLab" [level=3] [ref=e291]
                  - paragraph [ref=e292]: "Two matrix multiplications sandwiching a cube root. The first maps XYZ to LMS cone responses; the cube root models the perceptual non-linearity; the second projects into OKLab:"
                  - region "Formula" [ref=e293]
                  - separator [ref=e294]
                  - heading "Applications" [level=2] [ref=e295]
                  - list [ref=e296]:
                    - listitem [ref=e297]:
                      - strong [ref=e298]:
                        - text: CSS
                        - code [ref=e299]: oklch()
                        - text: .
                      - text: Supported in Chrome, Safari, and Firefox; increasingly adopted for design systems.
                    - listitem [ref=e300]:
                      - strong [ref=e301]: Design system palettes.
                      - text: Step through
                      - code [ref=e302]: L
                      - text: or
                      - code [ref=e303]: C
                      - text: to build scales that look evenly spaced to the human eye.
                    - listitem [ref=e304]:
                      - strong [ref=e305]: Accessible color.
                      - text: Adjust
                      - code [ref=e306]: L
                      - text: to meet WCAG contrast targets without disturbing hue or saturation.
                    - listitem [ref=e307]:
                      - strong [ref=e308]: Perceptual gradients.
                      - text: Interpolating in
                      - mark [ref=e309]: OKLCh
                      - text: avoids the hue shifts and muddy midpoints of RGB or HSL blends.
                    - listitem [ref=e310]:
                      - strong [ref=e311]: Data visualization.
                      - text: Build color ramps where perceptual distance tracks data distance.
  - region "Notifications (F8)":
    - list
```

# Test source

```ts
  69  | }
  70  | 
  71  | /** `<arm>__<subject>__<pane>__<viewport>__<scheme>__<fidelity>__<renderer>.png` */
  72  | export function goldenName(axes: CellAxes, renderer: RendererIdentity): string {
  73  |     return (
  74  |         [
  75  |             axes.arm,
  76  |             axes.subject,
  77  |             axes.pane,
  78  |             axes.viewport,
  79  |             axes.scheme,
  80  |             axes.fidelity,
  81  |             rendererSlug(renderer),
  82  |         ].join("__") + ".png"
  83  |     );
  84  | }
  85  | 
  86  | /** Per-worker cache: the renderer is a property of the browser, not the page. */
  87  | let cachedRenderer: RendererIdentity | null = null;
  88  | 
  89  | export interface VisualApi {
  90  |     /** The live-read identity. Available only after the first `shot()`. */
  91  |     renderer(): RendererIdentity | null;
  92  |     /** Read (and cache) the renderer from this live page. */
  93  |     identify(page: Page): Promise<RendererIdentity>;
  94  |     /** Photograph the page as one matrix cell. */
  95  |     shot(page: Page, axes: CellAxes): Promise<string>;
  96  | }
  97  | 
  98  | function makeVisualApi(): VisualApi {
  99  |     const identify = async (page: Page): Promise<RendererIdentity> => {
  100 |         if (cachedRenderer) return cachedRenderer;
  101 |         cachedRenderer = await readRenderer(page);
  102 |         // Written beside the goldens, not into docs/: this is a run artefact the
  103 |         // manifest generator joins on, and it must sit with the bytes it
  104 |         // describes. Idempotent — every worker writes the same identity.
  105 |         const path = resolve(GOLDEN_ROOT, process.platform, "RENDERER.json");
  106 |         mkdirSync(dirname(path), { recursive: true });
  107 |         const serialised =
  108 |             JSON.stringify(
  109 |                 {
  110 |                     note:
  111 |                         "Read from the LIVE browser by e2e/visual/renderer.ts (G-10). " +
  112 |                         "Never declared, never copied from playwright.config.ts.",
  113 |                     readAt: new Date().toISOString().slice(0, 10),
  114 |                     platform: process.platform,
  115 |                     arch: process.arch,
  116 |                     slug: rendererSlug(cachedRenderer),
  117 |                     digest: rendererDigest(cachedRenderer),
  118 |                     header: rendererHeaderLine(cachedRenderer),
  119 |                     identity: cachedRenderer,
  120 |                     // The AUTHORED bar, and only it. `VJS_VISUAL_MAX_DIFF_PIXELS`
  121 |                     // can tighten the effective value for a re-measurement run,
  122 |                     // and recording that too made this committed record move with
  123 |                     // an environment variable — a record of the bar that changes
  124 |                     // while the bar has not is not a record of the bar (IC-12).
  125 |                     tolerance: {
  126 |                         authoredMaxDiffPixels: TOLERANCE.authoredMaxDiffPixels,
  127 |                         threshold: TOLERANCE.threshold,
  128 |                         stabilisationTimeoutMs: TOLERANCE.stabilisationTimeoutMs,
  129 |                         g9InjectionPixels: TOLERANCE.g9InjectionPixels,
  130 |                     },
  131 |                 },
  132 |                 null,
  133 |                 2,
  134 |             ) + "\n";
  135 |         // Write only on a real change. A VERIFICATION run asserts and mints
  136 |         // nothing, so it must not dirty the tree — an unconditional write
  137 |         // re-dated this file on every run and would then have made
  138 |         // `regenerate-goldens.mjs` refuse on its own gate's output. `readAt` is
  139 |         // excluded from the comparison so the date records when the IDENTITY was
  140 |         // recorded, not when a run last happened (IC-12).
  141 |         const onDisk = existsSync(path) ? readFileSync(path, "utf8") : null;
  142 |         const withoutDate = (text: string) => text.replace(/^\s*"readAt":.*$/m, "");
  143 |         if (onDisk === null || withoutDate(onDisk) !== withoutDate(serialised))
  144 |             writeFileSync(path, serialised);
  145 |         return cachedRenderer;
  146 |     };
  147 | 
  148 |     return {
  149 |         renderer: () => cachedRenderer,
  150 |         identify,
  151 |         shot: async (page, axes) => {
  152 |             const renderer = await identify(page);
  153 |             // A cell sitting on a half-pixel layout tie rasterises two ways for
  154 |             // identical inputs (see `ensureOffLayoutTie`, and IC-11). Move it off
  155 |             // the tie BEFORE the shutter opens, or the golden is a coin flip.
  156 |             // A timed toast is not a settled frame: wait out its life first
  157 |             // (see `settleTimedToasts`).
  158 |             await settleTimedToasts(page);
  159 |             if (axes.capture) await ensureOffLayoutTie(page, axes.capture);
  160 |             const name = goldenName(axes, renderer);
  161 |             // THE LAST THING BEFORE THE SHUTTER. Every arm reaches the camera
  162 |             // through this one call, so this is the one place a proof-of-life
  163 |             // cannot be forgotten by an arm that navigates its own way — and
  164 |             // `states.visual.spec.ts`'s forced-state arm does exactly that
  165 |             // (`waitUntil: "commit"`, because a run with the transport aborted
  166 |             // never reaches `networkidle`). See `assertRendered` for the
  167 |             // measured floors and for what it deliberately does NOT cover.
  168 |             await assertRendered(page, name);
> 169 |             await expect(page).toHaveScreenshot(name, {
      |             ^ Error: screencast.showOverlays: Target page, context or browser has been closed
  170 |                 fullPage: true,
  171 |                 animations: "disabled",
  172 |                 caret: "hide",
  173 |                 scale: "css",
  174 |                 stylePath: CAPTURE_STYLE_PATH,
  175 |                 maxDiffPixels: TOLERANCE.maxDiffPixels,
  176 |                 threshold: TOLERANCE.threshold,
  177 |                 timeout: TOLERANCE.stabilisationTimeoutMs,
  178 |             });
  179 |             return name;
  180 |         },
  181 |     };
  182 | }
  183 | 
  184 | export interface VisualFixtures {
  185 |     visual: VisualApi;
  186 | }
  187 | 
  188 | /**
  189 |  * The extension itself, exported so an arm that must build on an EXISTING test
  190 |  * object gets the identical capture policy rather than a second copy of it.
  191 |  *
  192 |  * `states-admin-populated.visual.spec.ts` builds on
  193 |  * `e2e/smoke/admin/fixtures/admin-populated.ts`'s `adminPopulatedTest` — the
  194 |  * "populated-fixture pattern" fixture that already routes shape-correct
  195 |  * NON-EMPTY envelopes per admin endpoint. R35 / AdminNamesPanel residue 2 asks
  196 |  * for exactly that arm (*"the populated row has never been photographed … one
  197 |  * seeded-fixture capture pair (light/dark) discharges five hypotheses at
  198 |  * once"*), and the fixture it needs already exists in this repo. Composing on it
  199 |  * is the difference between consuming the fixture and re-authoring it — and
  200 |  * R35's whole PCS-11/K-8 limb is that the visual matrix never consumed the
  201 |  * fixtures the e2e suite already had.
  202 |  */
  203 | export const VISUAL_FIXTURE = {
  204 |     /**
  205 |      * The context override exists for ONE reason: the entropy pin (and, since
  206 |      * X.W11.v1b, the font pins — `pinOptionalFaces`, `pinStockMonoFallback`) has to be
  207 |      * installed before the first page script of every cell, in every arm, and
  208 |      * an arm that had to remember to call it is an arm that will one day not.
  209 |      * Putting it on the shared fixture object means
  210 |      * `admin-populated.visual.spec.ts` — which composes this object onto a
  211 |      * DIFFERENT base test — gets the identical capture policy rather than a
  212 |      * second copy of it. See `pinEntropy` for the measurement that put it here.
  213 |      */
  214 |     context: async (
  215 |         { context }: { context: BrowserContext },
  216 |         use: (context: BrowserContext) => Promise<void>,
  217 |     ) => {
  218 |         await pinEntropy(context);
  219 |         await pinOptionalFaces(context);
  220 |         await pinStockMonoFallback(context);
  221 |         await use(context);
  222 |     },
  223 |     visual: async ({}, use: (api: VisualApi) => Promise<void>) => {
  224 |         await use(makeVisualApi());
  225 |     },
  226 | } as const;
  227 | 
  228 | export const visualTest = base.extend<VisualFixtures>(VISUAL_FIXTURE);
  229 | 
```