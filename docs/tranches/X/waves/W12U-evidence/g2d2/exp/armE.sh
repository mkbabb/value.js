# SERVED MODEL: claude-opus-5-5
# X.W12U.g2d2 arm E (scratch): arm D + PaneLoadingPlate's Skeleton lazy at its root import.
sh /Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/g2d2/exp/armD.sh
perl -0pi -e 's#^import \{ Skeleton \} from "\@mkbabb/glass-ui";#import { defineAsyncComponent } from "vue";\nconst Skeleton = defineAsyncComponent(() => import("\@mkbabb/glass-ui").then((m) => m.Skeleton));#m' demo/shell/PaneLoadingPlate.vue
grep -n 'Skeleton =' demo/shell/PaneLoadingPlate.vue
