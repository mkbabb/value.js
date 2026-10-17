# SERVED MODEL: claude-opus-5-5
# X.W12U.g2d2 arm D (scratch): Avatar/AvatarImage (menu-body only) become lazy at their ROOT import in both dock menus.
for f in demo/shell/dock/menus/ProfileSection.vue demo/shell/dock/menus/MobileMenuDropdown.vue; do
  perl -0pi -e 's#import \{ computed, inject \} from "vue";#import { computed, defineAsyncComponent, inject } from "vue";#; s#^import \{ Avatar, AvatarImage \} from "\@mkbabb/glass-ui";#const Avatar = defineAsyncComponent(() => import("\@mkbabb/glass-ui").then((m) => m.Avatar));\nconst AvatarImage = defineAsyncComponent(() => import("\@mkbabb/glass-ui").then((m) => m.AvatarImage));#m' $f
done
grep -n 'defineAsyncComponent' demo/shell/dock/menus/*.vue
