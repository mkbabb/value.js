# SERVED MODEL: claude-opus-5-5
# arm A: the EAGER importers of useClipboard / writeClipboard / useTouchGate take them from the glass `/dom` subpath
# (glass dist/dom.js exports all three) instead of the root barrel. Skeleton / Avatar root imports untouched.
for f in demo/app/App.vue demo/picker/ColorPicker.vue demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts \
  demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts \
  demo/shell/dock/layers/SlugEditLayer.vue; do
  sed -i '' 's#from "@mkbabb/glass-ui";#from "@mkbabb/glass-ui/dom";#' $f
done
