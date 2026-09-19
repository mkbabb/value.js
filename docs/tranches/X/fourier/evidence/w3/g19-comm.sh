SERVED MODEL: claude-fable-5-1
# ^ line 1 is the receipts-law declaration, not shell. RUN AS:  tail -n +2 g19-comm.sh | sh
# g19 — ROSTER CLOSURE: comm -3 between two enumerations, both read from the settled bytes.
# LHS = CENSUS-CANONICAL.md §2 `F.W3` block (the SOLE operand; sha256 prefix printed at quote time).
# RHS = F-W3.md §X.1-v5 item 4 register (the transcription). Portable: BSD awk/sed/sort/comm, no -P.
V=/Users/mkbabb/Programming/value.js
C="$V"/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
S="$V"/docs/tranches/X/fourier/waves/F-W3.md
echo "canonical sha256-at-quote-time: $(shasum -a 256 "$C" | cut -c1-12)"
echo "spec      sha256-at-quote-time: $(shasum -a 256 "$S" | cut -c1-12)"
# pairs(): record<TAB>id, one per line; strikethrough spans (~~...~~) and <sub>...</sub> removed first.
pairs() {
  sed -e 's/~~[^~]*~~//g' -e 's/<sub>.*<\/sub>//g' \
  | awk '/^- \*\*fr-/{
      rec=$0; sub(/^- \*\*/,"",rec); sub(/\*\*.*/,"",rec);
      line=$0; sub(/^[^:]*: */,"",line);
      n=split(line,A," · ");
      for(i=1;i<=n;i++){ id=A[i]; gsub(/[` ]/,"",id); if(id!="") print rec "\t" id }
    }'
}
awk '/^### F\.W3 —/{f=1;next} /^### F\.W4 —/{f=0} f' "$C" | pairs | sort > lhs.txt
awk '/^\*\*4 · THE BOOKING REGISTER/{f=1;next} /^\*\*4a ·/{f=0} f' "$S" | pairs | sort > rhs.txt
echo "LHS canonical pairs: $(wc -l < lhs.txt | tr -d ' ')   records: $(cut -f1 lhs.txt | sort -u | wc -l | tr -d ' ')"
echo "RHS register  pairs: $(wc -l < rhs.txt | tr -d ' ')   records: $(cut -f1 rhs.txt | sort -u | wc -l | tr -d ' ')"
echo "--- comm -3 (col1 = canonical-only = ESCAPE; col2 = register-only = FABRICATION) ---"
comm -3 lhs.txt rhs.txt
echo "--- comm -3 line count: $(comm -3 lhs.txt rhs.txt | wc -l | tr -d ' ') ---"
echo "duplicate pairs LHS: $(uniq -d lhs.txt | wc -l | tr -d ' ')  RHS: $(uniq -d rhs.txt | wc -l | tr -d ' ')"
