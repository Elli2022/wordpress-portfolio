#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUT_DIR="${WP_DIR}/hosting"
ZIP="${OUT_DIR}/portfolio-cms-upload.zip"

mkdir -p "${OUT_DIR}"

rm -f "${ZIP}"
(
  cd "${WP_DIR}"
  zip -r "${ZIP}" \
    mu-plugins/portfolio-cms.php \
    acf-json \
    plugins-required.txt \
    -x "*.DS_Store"
)

echo "Created: ${ZIP}"
echo ""
echo "Upload contents to your host:"
echo "  mu-plugins/portfolio-cms.php  -> wp-content/mu-plugins/"
echo "  acf-json/*                    -> wp-content/acf-json/"
echo ""
echo "See HOSTING_GRATIS.md for full steps."
