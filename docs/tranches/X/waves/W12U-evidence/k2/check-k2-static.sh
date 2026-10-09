# SERVED MODEL: claude-opus-5-5
# X.W12U.k2 — the byte-level falsifiers for the rows whose cure is structural
# (one owner, one home, one root): each line prints GREEN/RED and the reading.
#   L1-16 one popup mutex · L1-17 re-home by owner · L1-18 the app root
#   plus the deletions the other rows' cures name.
# Usage: sh check-k2-static.sh   (from anywhere; reads the repo it sits in)
cd "$(dirname "$0")/../../../../../.." || exit 2
red=0; n=0
say() { n=$((n+1)); if [ "$2" = ok ]; then echo "GREEN $1 $3"; else red=$((red+1)); echo "RED $1 $3"; fi; }
absent() { if [ -e "$2" ]; then say "$1" no "present:$2"; else say "$1" ok "absent:$2"; fi; }
present() { if [ -e "$2" ]; then say "$1" ok "present:$2"; else say "$1" no "absent:$2"; fi; }

# L1-16 — one keyed mutex, shared; the two forks and the prop chain gone
defs=$(grep -rlE 'export function usePopupMutex' demo | tr '\n' ' ')
[ "$defs" = "demo/shared/usePopupMutex.ts " ] && say L1-16-one-owner ok "$defs" || say L1-16-one-owner no "$defs"
absent L1-16-hover-fork demo/palettes/browser/card/composables/useHoverPopover.ts
# code only: a doc comment that names the retired chain is not the chain
chain=$(grep -rnE 'activeHover|active-hover' demo --include='*.vue' --include='*.ts' | grep -vE '^[^:]+:[0-9]+:\s*(\*|//)' | wc -l | tr -d ' ')
[ "$chain" = 0 ] && say L1-16-prop-chain ok "activeHover refs=0" || say L1-16-prop-chain no "activeHover refs=$chain"

# L1-17 — re-home by owner (pure moves)
present L1-17-admin-pane demo/palettes/admin/AdminPane.vue
present L1-17-admin-panels demo/palettes/admin/panels/AdminUsersPanel.vue
present L1-17-admin-composables demo/palettes/admin/composables/useAdminUsers.ts
present L1-17-user-sort demo/palettes/admin/UserSortMenu.vue
present L1-17-inspector demo/palettes/inspector/PaletteInspector.vue
for f in ActionFeedback PaletteSpecimen PaletteColorStrip PaletteCardSkeleton ColorSpaceSelector InterpolationFields; do
    present "L1-17-shared-$f" "demo/shared/ui/$f.vue"
done
present L1-17-color-chips demo/shared/ui/color-chips/PreviewRamp.vue
present L1-17-mix-owner demo/workbenches/mix/mix.ts
absent L1-17-old-admin-dir demo/palettes/browser/admin
absent L1-17-old-paletteCard-dir demo/palettes/browser/card/PaletteCard
vue_in_session=$(find demo/color-session -name '*.vue' | wc -l | tr -d ' ')
[ "$vue_in_session" = 0 ] && say L1-17-no-vue-in-color-session ok "vue=0" || say L1-17-no-vue-in-color-session no "vue=$vue_in_session"
reach=$(grep -rnE 'from "[^"]*palettes/browser/card' demo/workbenches | wc -l | tr -d ' ')
[ "$reach" = 0 ] && say L1-17-no-workbench-reach ok "reaches=0" || say L1-17-no-workbench-reach no "reaches=$reach"

# L1-18 — the app root
absent L1-18-old-root demo/color-picker
present L1-18-new-root demo/app/App.vue
# tracked files only (git grep): untracked build scratch and local editor
# config are not the repo; CHANGELOG, docs and the bench corpus are history
refs=$(git grep -l 'demo/color-picker\|\.\./color-picker/' -- . ':!docs' ':!CHANGELOG.md' ':!bench/css-equivalence/real-corpus.json' | tr '\n' ' ')
[ -z "$refs" ] && say L1-18-no-old-refs ok "live refs=0 (CHANGELOG + bench corpus are history)" || say L1-18-no-old-refs no "$refs"
devsh=$(grep -c color-picker scripts/dev/dev.sh)
[ "$devsh" = 0 ] && say L1-18-dev-sh ok "dev.sh color-picker refs=0 (never edited)" || say L1-18-dev-sh no "dev.sh refs=$devsh (owner note)"

# the other rows' named deletions
absent L1-2-condense-fork demo/picker/composables/useHeaderCondense.ts
absent L1-12-height-morph demo/palettes/browser/card/composables/useHeightTransition.ts
absent L1-11-god-editor demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue
absent L1-9-lamp demo/shell/dock/DockStatusLamp.vue
present L1-1-shell demo/shell/PaneShell.vue
shells=$(grep -rl '<PaneShell' demo --include='*.vue' | wc -l | tr -d ' ')
say L1-1-panes-on-shell "$([ "$shells" -ge 10 ] && echo ok || echo no)" "panes using PaneShell=$shells"
echo "$([ $red = 0 ] && echo "GREEN $n/$n" || echo "RED $red (of $n)")"
