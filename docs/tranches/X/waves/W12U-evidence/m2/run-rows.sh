#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.m2 — the routed X-row falsifiers, one full pass ($TAG): X-5/X-6, X-13/X-14, X-3 width, X-10, X-11.
cd "$(dirname "$0")"
echo "# load $(uptime | sed 's/.*averages: //')"
for t in light dark; do
  for wh in "360 780" "390 844" "430 932"; do set -- $wh
    node probe-admin-rows-m2.mjs $1 $2 $t 2>&1 | grep -E "→" ; done
  for wh in "360 780" "390 844" "430 932"; do set -- $wh
    node probe-dock-layers-m2.mjs $1 $2 $t 2>&1 | grep -E "GEO|^RED|^GREEN" ; done
  node probe-drawer-width-m2.mjs 360 780 $t 2>&1 | grep -E "width|^RED|^GREEN"
  node probe-flag-dialog-m2.mjs $t 2>&1 | grep -E "flag-report|^RED|^GREEN"
  node probe-landscape-menu-m2.mjs $t 2>&1 | grep -E "\(a\)|^RED|^GREEN"
done
echo "# load $(uptime | sed 's/.*averages: //')"
