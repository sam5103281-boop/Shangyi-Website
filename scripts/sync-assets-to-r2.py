#!/usr/bin/env python3
"""
Sync all Lovable CDN assets referenced by the app to Cloudflare R2.

Reads .asset.json pointers plus hardcoded /__l5e/assets-v1/... URLs in source
files, downloads the binary from Lovable, and uploads it to R2 using the same
assets-v1/{asset_id}/{filename} path layout. Skips files already in R2 when the
pointer size matches (idempotent).
"""

import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

import boto3
import requests
from botocore.config import Config

R2_ACCESS_KEY_ID = os.environ["R2_ACCESS_KEY_ID"]
R2_SECRET_ACCESS_KEY = os.environ["R2_SECRET_ACCESS_KEY"]
R2_ENDPOINT = os.environ["R2_ENDPOINT"]
R2_PUBLIC_URL = os.environ["R2_PUBLIC_URL"].rstrip("/")
R2_BUCKET = os.environ.get("R2_BUCKET", "shangyi-assets")

ASSETS_DIR = Path("src/assets")
SCAN_DIRS = [Path("src"), Path("public")]
SCAN_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".json"}
ASSET_URL_RE = re.compile(r"/__l5e/assets-v1/[a-f0-9-]+/[^\"'\s)>]+")

MIME_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".pdf": "application/pdf",
}


def collect_assets():
    assets = {}

    for pointer_path in sorted(ASSETS_DIR.rglob("*.asset.json")):
        try:
            data = json.loads(pointer_path.read_text())
            url_path = data.get("url")
            project_id = data.get("project_id")
            asset_id = data.get("asset_id")
            if not url_path or not project_id or not asset_id:
                print(f"  ! {pointer_path}: missing url/project_id/asset_id, skip")
                continue
            filename = Path(urlparse(url_path).path).name
            assets[url_path] = {
                "filename": filename,
                "asset_id": asset_id,
                "project_id": project_id,
                "size": data.get("size") or data.get("fileSize"),
            }
        except Exception as e:
            print(f"  ! {pointer_path}: {e}")

    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            continue
        for file_path in scan_dir.rglob("*"):
            if not file_path.is_file() or file_path.suffix not in SCAN_SUFFIXES:
                continue
            try:
                text = file_path.read_text(errors="ignore")
            except Exception:
                continue
            for match in ASSET_URL_RE.finditer(text):
                url_path = match.group(0)
                if url_path in assets:
                    continue
                parts = Path(urlparse(url_path).path).parts
                if len(parts) < 4:
                    continue
                asset_id = parts[-2]
                filename = parts[-1]
                project_id = "e79efad6-ab41-4669-9958-76829077c22c"
                assets[url_path] = {
                    "filename": filename,
                    "asset_id": asset_id,
                    "project_id": project_id,
                    "size": None,
                }

    return assets


def main() -> int:
    s3 = boto3.client(
        "s3",
        endpoint_url=R2_ENDPOINT,
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )

    assets = collect_assets()
    print(f"Found {len(assets)} asset references")

    uploaded = skipped = failed = 0

    for url_path, asset in sorted(assets.items()):
        filename = asset["filename"]
        asset_id = asset["asset_id"]
        project_id = asset["project_id"]
        pointer_size = asset.get("size")

        try:
            # Mirror the Lovable CDN path layout so /__l5e/assets-v1/* redirects work 1:1.
            key = f"assets-v1/{asset_id}/{filename}"
            # Asset URLs are relative — serve them from the project's stable preview host.
            source_url = f"https://project--{project_id}-dev.lovable.app{url_path}"

            # Check if already in R2 with same size
            try:
                head = s3.head_object(Bucket=R2_BUCKET, Key=key)
                existing_size = head["ContentLength"]
                # Quick check against pointer file size if available
                if pointer_size and existing_size == pointer_size:
                    print(f"  = {filename} (already in R2, {existing_size} bytes)")
                    skipped += 1
                    continue
            except s3.exceptions.ClientError:
                pass  # not in R2, proceed to upload

            # Download from Lovable CDN
            r = requests.get(source_url, timeout=60)
            r.raise_for_status()
            body = r.content

            ext = Path(filename).suffix.lower()
            content_type = MIME_TYPES.get(ext, "application/octet-stream")

            s3.put_object(
                Bucket=R2_BUCKET,
                Key=key,
                Body=body,
                ContentType=content_type,
                CacheControl="public, max-age=31536000, immutable",
            )
            print(f"  + {filename} -> {R2_PUBLIC_URL}/{key} ({len(body)} bytes)")
            uploaded += 1

        except Exception as e:
            print(f"  ! {filename}: {e}")
            failed += 1

    print(f"\nDone. uploaded={uploaded} skipped={skipped} failed={failed}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
