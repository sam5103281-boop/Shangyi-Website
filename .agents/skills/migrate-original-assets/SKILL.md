---
name: migrate-original-assets
description: Re-fetch images and other binary assets from the original Lovable source project and re-upload them to the current project. Use whenever the user asks to "抓回原圖", "重新抓圖", "migrate assets", "fix broken images after import/clone", or reports that images imported from another Lovable project are missing or 403/forbidden. Required when `.asset.json` pointers or hardcoded `/__l5e/assets-v1/...` URLs point at a different project the current one cannot read.
---

# Migrate Original Assets

## When to trigger
- User says "抓回原圖", "再幫我抓圖", "圖不見了再跑一次"
- User imported / cloned / remixed a project from another workspace and images are broken
- Grep finds `/__l5e/assets-v1/<uuid>/...` URLs whose `project_id` (in `.asset.json`) differs from the current project, or whose CDN host returns 403/404

## How to run
The migration script already lives at `scripts/migrate-assets.py`. It is idempotent — only URLs the current project cannot serve get re-uploaded.

1. Ask the user for the **source project URL** if not already known. Format:
   `https://project--<source-project-id>.lovable.app`
   (or any preview / published URL of the original project that is still reachable).
2. Run:
   ```bash
   python3 scripts/migrate-assets.py <SOURCE_PROJECT_URL>
   ```
3. The script:
   - Scans `src/` and `public/` for every `/__l5e/assets-v1/...` reference
   - Downloads each via curl with a browser User-Agent (urllib gets 403)
   - Re-uploads with `lovable-assets create` to the current project
   - Rewrites every `.asset.json` pointer and source code reference to the new URL
4. Report counts: how many URLs found, migrated, failed, and how many files were rewritten.

## Requirements
- The **source project must still be reachable**. If curl returns 404 the project was deleted and the originals are gone — tell the user.
- `lovable-assets` CLI is always on PATH in the Lovable sandbox.

## Failure modes
- All downloads 403 → wrong source URL, or original project is private/deleted. Ask the user to confirm the URL.
- Some URLs fail individually → script continues with the rest; surface the failed list to the user so they can decide whether to replace or remove those references manually.
