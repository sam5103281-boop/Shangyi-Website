#!/usr/bin/env python3
"""
Re-encode product images to WebP with per-product quality rules.

Reads scripts/product-image-quality.json, downloads each product's source
binary from the CDN (using its existing .asset.json pointer), re-encodes to
800px and 1600px WebP at the configured quality/method, and re-uploads via
the `lovable-assets` CLI — overwriting src/assets/products/<slug>-800.webp
and <slug>-1600.webp pointers in place.

Usage:
    python scripts/reencode-product-webp.py                 # all products
    python scripts/reencode-product-webp.py beaid scd       # subset
    DRY_RUN=1 python scripts/reencode-product-webp.py       # no uploads

Only these two files govern encoding output:
    - scripts/product-image-quality.json  (per-product knobs)
    - this script                          (pipeline)
"""
from __future__ import annotations

import io
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
CONFIG = REPO / "scripts" / "product-image-quality.json"
OUT_DIR = REPO / "src" / "assets" / "products"
CDN_BASE = "https://id-preview--fda6ed3d-97bd-4551-8932-5dc45bd526af.lovable.app"
DRY_RUN = os.environ.get("DRY_RUN") == "1"


def load_pointer(rel: str) -> dict:
    return json.loads((REPO / rel).read_text())


def fetch_source(pointer: dict) -> Image.Image:
    url = CDN_BASE + pointer["url"]
    req = urllib.request.Request(url, headers={"User-Agent": "lovable-reencode/1.0"})
    with urllib.request.urlopen(req) as r:
        data = r.read()
    img = Image.open(io.BytesIO(data))
    # Preserve alpha where present; flatten palette-mode etc.
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.mode else "RGB")
    img.load()
    return img


def resize_square(img: Image.Image, target: int) -> Image.Image:
    w, h = img.size
    scale = target / max(w, h)
    if scale == 1:
        return img
    new = (max(1, round(w * scale)), max(1, round(h * scale)))
    return img.resize(new, Image.LANCZOS)


def encode_webp(img: Image.Image, quality: int, method: int) -> bytes:
    buf = io.BytesIO()
    img.save(buf, format="WEBP", quality=quality, method=method)
    return buf.getvalue()


def upload(bytes_: bytes, filename: str, pointer_path: Path) -> None:
    if DRY_RUN:
        print(f"  [dry-run] would upload {filename} → {pointer_path.relative_to(REPO)} ({len(bytes_):,} bytes)")
        return
    with tempfile.NamedTemporaryFile(suffix=".webp", delete=False) as tf:
        tf.write(bytes_)
        tmp_path = tf.name
    try:
        result = subprocess.run(
            ["lovable-assets", "create", "--file", tmp_path, "--filename", filename],
            check=True, capture_output=True, text=True,
        )
        pointer_path.write_text(result.stdout.strip() + "\n")
    finally:
        os.unlink(tmp_path)


def process(slug: str, rule: dict) -> None:
    print(f"\n▸ {slug}")
    src_pointer = load_pointer(rule["source"])
    print(f"  source: {src_pointer['original_filename']} ({src_pointer['size']:,} B)")
    src_img = fetch_source(src_pointer)
    print(f"  loaded: {src_img.size} {src_img.mode}")
    method = rule.get("method", 6)
    for target, quality_key in [(800, "quality800"), (1600, "quality1600")]:
        upscale_to = rule.get("upscaleTo")
        # For -1600 output, if source is smaller and upscaleTo is set, upscale.
        if target == 1600 and upscale_to and max(src_img.size) < target:
            resized = resize_square(src_img, upscale_to)
        else:
            resized = resize_square(src_img, min(target, max(src_img.size)))
            # If source is smaller than target and no upscale requested, keep native size.
        webp = encode_webp(resized, rule[quality_key], method)
        out_name = f"{slug}-{target}.webp"
        out_pointer = OUT_DIR / f"{out_name}.asset.json"
        print(f"  → {out_name}: {resized.size} q={rule[quality_key]} m={method} → {len(webp):,} B")
        upload(webp, out_name, out_pointer)


def main() -> None:
    cfg = json.loads(CONFIG.read_text())
    products = cfg["products"]
    wanted = sys.argv[1:] or list(products)
    for slug in wanted:
        if slug not in products:
            print(f"skip unknown product: {slug}", file=sys.stderr)
            continue
        try:
            process(slug, products[slug])
        except Exception as e:
            print(f"  ✗ {slug} failed: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
