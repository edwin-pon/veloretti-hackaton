#!/bin/sh
# Turns the plain-text sample documents in docs/samples into the files the demo
# actually uploads, in public/samples.
#
#   sh scripts/build-samples.sh
#
# The generated files are committed, so this only needs running when a source
# changes. <<<PAGE>>> becomes a form feed, which is what both converters use as
# a page break. macOS only: cupsfilter and textutil ship with the system.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/samples

page_break() {
  # shellcheck disable=SC2016
  awk '{ if ($0 == "<<<PAGE>>>") printf "\f"; else print }' "$1"
}

for name in veloretti-visual-language veloretti-visual-language-colour-type \
            growth-briefing-back-to-school-2026; do
  page_break "docs/samples/$name.txt" > "/tmp/$name.txt"
  cupsfilter -i text/plain -m application/pdf "/tmp/$name.txt" > "public/samples/$name.pdf" 2>/dev/null
  echo "public/samples/$name.pdf"
done

textutil -convert docx -output public/samples/legal-marketing-guidelines-v7.docx \
  docs/samples/legal-marketing-guidelines-v7.txt
echo "public/samples/legal-marketing-guidelines-v7.docx"
