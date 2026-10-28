#!/bin/zsh
set -u
cd /Users/mkbabb/Programming/value.js
B=${1:?scratch dir}/bak; mkdir -p $B
FILES=(demo/workbenches/generate/GenerateControls.vue demo/shared/ui/SwatchButton.vue demo/workbenches/gradient/GradientVisualizer/GradientStopRail.vue demo/workbenches/gradient/GradientVisualizer/GradientStopInspector.vue demo/workbenches/gradient/composables/useGradientModel.ts demo/scenes/about/markdown/Markdown.vue demo/color-session/space-catalog.ts)
for f in $FILES; do cp $f $B/${f//\//_}; done
perl -0pi -e 's/emit\("save", \[\.\.\.palette\.value\], paletteName\.value\)/emit("save", [...palette.value], "Generated palette")/; s/`Copy \$\{formatCssCaption\(css\)\}`/`Swatch`/; s/<Label>Colors<\/Label>//' demo/workbenches/generate/GenerateControls.vue
perl -0pi -e 's/<Button\n(\s*)emphasis="quiet"/<Button\n$1variant="ghost"\n$1emphasis="quiet"/; s/(<div class="px-3 pb-1 flex flex-wrap gap-1.5">)/<PreviewStrip :stops="palette" \/>\n$1/' demo/workbenches/generate/GenerateControls.vue
perl -0pi -e 's/if \(!result\.ok\) return result;/if (!result.ok) throw new Error(result.reason);/' demo/workbenches/gradient/composables/useGradientModel.ts
perl -0pi -e 's/\n\s*data-color-surface\n/\n/' demo/shared/ui/SwatchButton.vue
perl -0pi -e 's/(function onBarPointerDown\(e: PointerEvent\) \{\n(?:\s*\/\/.*\n)*)\s*if \(e\.button !== 0\) return;\n/$1/; s/role="group"\n//; s/case "Enter":\n\s*case " ":\n\s*emit\("add", caretPos\.value\);/case "Enter":/' demo/workbenches/gradient/GradientVisualizer/GradientStopRail.vue
perl -0pi -e 's/\s*:disabled="refusal !== null"\n/\n/' demo/workbenches/gradient/GradientVisualizer/GradientStopInspector.vue
perl -0pi -e 's/(axisPosition\(position\) \} : s\)\)\n)\s*\.sort\(byPosition\);/$1;/' demo/workbenches/gradient/composables/useGradientModel.ts
perl -0pi -e 's/<Skeleton class="h-12/<Skeleton variant="glass" class="h-12/' demo/scenes/about/markdown/Markdown.vue
perl -0pi -e 's/("display-p3": \{(?:(?!\n    \},).)*?)doc: null/$1doc: doc(() => import("..\/..\/assets\/docs\/rgb.md"))/s' demo/color-session/space-catalog.ts
git diff --stat -- $FILES
~/.claude/guard/guarded --timeout 10 -- npx vitest run --maxWorkers=2 demo/test/generate/ss8-z3-cures.test.ts demo/test/gradient/ss8-z3-cures.test.ts demo/test/about/ss8-z3-cures.test.ts 2>&1 | grep -E "✓|×|Tests |Test Files"
for f in $FILES; do cp $B/${f//\//_} $f; done
git diff --stat -- $FILES; echo restored
