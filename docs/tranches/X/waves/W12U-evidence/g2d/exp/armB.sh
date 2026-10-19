# SERVED MODEL: claude-opus-5-5
# arm B: arm A + every non-dirty LAZY importer of the three dom names re-pointed to `/dom` too, so that the root
# barrel is reached only for Skeleton / Avatar.
sh /Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/g2d/exp/armA.sh
for f in demo/palettes/browser/card/composables/useSwatchActions.ts demo/palettes/inspector/PaletteInspector.vue demo/scenes/ConfigSliderPane.vue \
  demo/shell/dock/ColorInput.vue demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue \
  demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue demo/workbenches/mix/MixPane.vue demo/workbenches/mix/MixResultDisplay.vue \
  demo/workbenches/generate/GenerateControls.vue; do
  sed -i '' 's#import { useClipboard } from "@mkbabb/glass-ui";#import { useClipboard } from "@mkbabb/glass-ui/dom";#; s#import { writeClipboard } from "@mkbabb/glass-ui";#import { writeClipboard } from "@mkbabb/glass-ui/dom";#; s#import { useClipboard, writeClipboard } from "@mkbabb/glass-ui";#import { useClipboard, writeClipboard } from "@mkbabb/glass-ui/dom";#' $f
done
