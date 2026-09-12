#!/usr/bin/env bash
# ==========================================================================
# AY ROLEPLAY LOADING SCREEN — production build script
#
# Regenerates the obfuscated/minified files in html/ from the readable
# sources in src/. Run this every time you edit src/js/script.js,
# src/css/style.css, or src/index.html.
#
# Requirements: node + npm (installs the tools listed in devDependencies
# on first run via `npm install`).
# ==========================================================================
set -euo pipefail
cd "$(dirname "$0")"

echo "[1/4] Installing build tools (first run only)…"
npm install --no-audit --no-fund --silent

echo "[2/4] Obfuscating JavaScript…"
npx javascript-obfuscator src/js/script.js \
  --output html/js/script.min.js \
  --compact true \
  --control-flow-flattening true \
  --control-flow-flattening-threshold 0.75 \
  --dead-code-injection true \
  --dead-code-injection-threshold 0.3 \
  --debug-protection true \
  --debug-protection-interval 2000 \
  --disable-console-output true \
  --identifier-names-generator hexadecimal \
  --rename-globals false \
  --self-defending true \
  --string-array true \
  --string-array-encoding base64 \
  --string-array-threshold 0.85 \
  --transform-object-keys true \
  --target browser

echo "[3/4] Minifying CSS…"
npx cleancss -O2 -o html/css/style.min.css src/css/style.css

echo "[4/4] Building production index.html…"
TMP="$(mktemp)"
sed -e 's|css/style\.css|css/style.min.css|' \
    -e 's|js/script\.js|js/script.min.js|' \
    src/index.html > "$TMP"
npx html-minifier-terser \
  --collapse-whitespace --remove-comments \
  --minify-css true --minify-js false \
  --remove-redundant-attributes --remove-empty-attributes \
  -o html/index.html "$TMP"
rm -f "$TMP"

echo "Done. Ship only the html/ folder + fxmanifest.lua + assets."
echo "Keep src/ out of anything you distribute publicly."
