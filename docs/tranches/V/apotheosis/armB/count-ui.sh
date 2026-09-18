#!/bin/bash
cd /Users/mkbabb/Programming/value.js || exit 1
for c in alert avatar badge button card checkbox collapsible dialog dropdown-menu input label popover radio-group select separator skeleton slider switch tooltip; do
  files=$(grep -rlE "from ['\"](\.\./)+ui/$c['\"]" demo --include='*.vue' --include='*.ts' | grep -v '^demo/ui/')
  n=$(echo "$files" | grep -c . )
  echo "== $c: $n"
  echo "$files" | sed 's/^/    /'
done
echo "---- direct glass-ui importers:"
grep -rlE "from ['\"]@mkbabb/glass-ui" demo --include='*.vue' --include='*.ts' | grep -v '^demo/ui/' | sort
