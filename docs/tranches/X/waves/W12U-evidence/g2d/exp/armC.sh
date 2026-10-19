# SERVED MODEL: claude-opus-5-5
# arm C (MEASUREMENT ONLY — never landed: it stubs product components): arm A, plus the three remaining EAGER
# root-barrel importers (PaneLoadingPlate `Skeleton`, ProfileSection / MobileMenuDropdown `Avatar, AvatarImage`,
# names glass exports from NO subpath) given placeholder elements, so NO eager module reaches "@mkbabb/glass-ui".
# The delta vs arm A is the weight the root barrel pins into the eager graph by reachability alone.
sh /Users/mkbabb/Programming/value.js/docs/tranches/X/waves/W12U-evidence/g2d/exp/armA.sh
sed -i '' 's#^import { Skeleton } from "@mkbabb/glass-ui";#const Skeleton = "div";#' demo/shell/PaneLoadingPlate.vue
for f in demo/shell/dock/menus/ProfileSection.vue demo/shell/dock/menus/MobileMenuDropdown.vue; do
  sed -i '' 's#^import { Avatar, AvatarImage } from "@mkbabb/glass-ui";#const Avatar = "span"; const AvatarImage = "img";#' $f
done
grep -rln --include='*.vue' --include='*.ts' 'from "@mkbabb/glass-ui";' demo/app demo/shell demo/picker demo/color-session demo/platform | grep -v test || true
