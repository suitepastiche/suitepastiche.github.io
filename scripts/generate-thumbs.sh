#!/usr/bin/env bash
set -euo pipefail
GALLERY_DIR="$(dirname "$0")/../assets/gallery"
THUMBS_DIR="$GALLERY_DIR/thumbs"
mkdir -p "$THUMBS_DIR"
for img in "$GALLERY_DIR"/*.jpg; do
  name=$(basename "$img")
  if [ -f "$THUMBS_DIR/$name" ]; then
    echo "  $name (skipped)"
    continue
  fi
  sips --resampleWidth 600 "$img" --out "$THUMBS_DIR/$name" >/dev/null
  echo "  $name"
done
echo "Done: $(ls "$THUMBS_DIR" | wc -l | tr -d ' ') thumbnails → $THUMBS_DIR"
