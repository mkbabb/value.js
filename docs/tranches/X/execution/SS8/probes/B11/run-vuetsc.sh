#!/bin/sh
# SS8 B11 SS8-0339: vue-tsc over the demo program, baseline then strictTemplates (library dist already built; pretypecheck's build skipped).
cd /Users/mkbabb/Programming/value.js
E=docs/tranches/X/execution/SS8/evidence/B11-browse-search-dialogs
npx vue-tsc -p tsconfig.demo.json --noEmit > $E/vuetsc-baseline.txt 2>&1; echo "exit=$?" >> $E/vuetsc-baseline.txt
npx vue-tsc -p docs/tranches/X/execution/SS8/probes/B11/tsconfig.strict-templates.json --noEmit > $E/vuetsc-strict.txt 2>&1; echo "exit=$?" >> $E/vuetsc-strict.txt
