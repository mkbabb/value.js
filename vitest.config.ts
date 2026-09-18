import vue from "@vitejs/plugin-vue";
import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    // X-W1 (fold R6 / NG-4) — the harness could not mount an SFC AT ALL.
    // `vitest.config.ts` pre-empts `vite.config.ts` entirely, and it carried no
    // `plugins` key, so `@vitejs/plugin-vue` never reached the test transform:
    // `@vue/test-utils@2.4.10` was a paid-for dependency with ZERO call sites
    // and `mount(` appeared nowhere in `test/` or `demo/test/`. Every
    // SFC-level oracle any wave specced was therefore UNBUILDABLE, which is
    // why four independent records booked "no gate of any species could have
    // seen this". The plugin is the precondition; `test/support/vtu.ts` is the
    // instrument law that rides with it (fold R7).
    plugins: [vue()],
    resolve: {
        alias: {
            // `@src` survives for the src-tree unit tests + the source-export
            // reference pages. W43 (RF-15) killed the demo `@lib`/`@composables`
            // aliases: the demo tests now import their targets by relative path
            // (color-session/palettes/… physical homes).
            "@src": path.resolve(import.meta.dirname, "src"),
        },
    },
    test: {
        // T.W1-src §5: the test tree mirrors the src shape (test/units/color/…,
        // test/parsing/…, test/transform/, test/quantize/); the flat `test/*.ts`
        // glob would miss every mirrored subdir.
        // V′.W40-S3 bracket B7: the two relocated aurora suites live under
        // `demo/test/glass/`; extend the include so they are discovered and run
        // (they were silently dropped outside the `test/**` glob).
        //
        // X-W1: narrowed from `**/*.ts` to `**/*.test.ts`. The old glob
        // collected EVERY `.ts` under the two homes, so a shared helper module
        // (`test/support/vtu.ts`, this wave's instrument law) would have been
        // loaded as a suite and failed with "No test suite found". Measured
        // before and after: the same 26 files / 348 tests are collected —
        // every existing file already ends in `.test.ts`, so nothing is dropped.
        include: ["test/**/*.test.ts", "demo/test/**/*.test.ts"],
        // X-W1 (fold R11 / MC-13) — CORRECTED. The retired justification here
        // claimed "the repo-hygiene gates live in `test/dist/`"; `ls test/dist`
        // → ENOENT, and no such gate exists anywhere in the tree. The filter is
        // kept because it is harmless and a `dist` exclusion would otherwise
        // swallow any future `test/**/dist` fixture, but the reason is now the
        // measured one, not a dead citation.
        exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
        environment: "jsdom",
        // fold R7 (PaletteSlugBar A-9/A-16): `@vue/test-utils` stubs
        // `<Transition>` BY DEFAULT, so a naive jsdom gate asserts the OPPOSITE
        // of the shipped behaviour. The strip is installed globally rather than
        // per-suite so no mount gate can forget it.
        setupFiles: ["./test/support/vtu.ts"],
    },
});
