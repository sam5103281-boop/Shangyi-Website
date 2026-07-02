#!/usr/bin/env python3
"""
Re-upload Lovable CDN assets from a source project into the current project.

Usage:
    python3 scripts/migrate-assets.py <SOURCE_PROJECT_URL>

Example:
    python3 scripts/migrate-assets.py https://project--61430271-89a2-4deb-bf72-60d7676df14c.lovable.app

What it does:
  1. Scans src/ for every /__l5e/assets-v1/<id>/<filename> URL,
     both inside .asset.json pointer files and hardcoded string literals
     in .ts / .tsx / .js / .jsx / .css / .html files.
  2. Downloads each asset from the source project's public URL (curl + UA).
  3. Re-uploads via `lovable-assets create` to the current project.
  4. Rewrites every reference (pointer files + source code) to the new URL.

Requires: `lovable-assets` CLI on PATH (always present in Lovable sandbox).
The source project must still be reachable (preview or published URL must 200).
"""
import json, os, re, subprocess, sys
from pathlib import Path

if len(sys.argv) < 2:
    print("usage: migrate-assets.py <SOURCE_PROJECT_URL>", file=sys.stderr)
    sys.exit(1)

SRC_BASE = sys.argv[1].rstrip("/")
ROOT = Path(__file__).resolve().parent.parent
URL_RE = re.compile(r'/__l5e/assets-v1/[a-f0-9-]+/[^"\'\s )]+')
EXTS = {".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".json"}

# 1. Collect every URL referenced anywhere in src/ + public/
urls = set()
scan_files = []
for base in ("src", "public"):
    p = ROOT / base
    if not p.exists():
        continue
    for f in p.rglob("*"):
        if f.is_file() and f.suffix in EXTS:
            scan_files.append(f)
            try:
                for m in URL_RE.finditer(f.read_text(errors="ignore")):
                    urls.add(m.group(0))
            except Exception:
                pass

print(f"Found {len(urls)} unique CDN URLs across {len(scan_files)} files")

# 2 + 3. Download + re-upload
mapping = {}
for url in sorted(urls):
    filename = url.rsplit("/", 1)[1]
    tmp = f"/tmp/dl_{filename}"
    try:
        subprocess.check_call(
            ["curl", "-sfL", "-A", "Mozilla/5.0", "-o", tmp, SRC_BASE + url]
        )
        if os.path.getsize(tmp) < 50:
            print(f"SKIP empty: {url}")
            continue
        out = subprocess.check_output(
            ["lovable-assets", "create", "--file", tmp, "--filename", filename],
            text=True,
        )
        new_url = json.loads(out)["url"]
        mapping[url] = new_url
        print(f"OK  {filename}")
    except Exception as e:
        print(f"FAIL {url}: {e}")

# 4. Rewrite all references in-place
touched = 0
for f in scan_files:
    try:
        txt = f.read_text()
    except Exception:
        continue
    new = txt
    for old, n in mapping.items():
        if old in new:
            new = new.replace(old, n)
    if new != txt:
        f.write_text(new)
        touched += 1

print(f"\nMigrated {len(mapping)}/{len(urls)} assets; rewrote {touched} files")
