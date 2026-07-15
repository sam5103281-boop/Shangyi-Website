import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const R2_ASSET_BASE_URL = "https://pub-91066afc3bf34ac3bf044deb264ab5a8.r2.dev";
const LOVABLE_ASSET_FALLBACK_ORIGIN =
  "https://project--fda6ed3d-97bd-4551-8932-5dc45bd526af-dev.lovable.app";
const LOVABLE_ASSET_PREFIX = "/__l5e/assets-v1/";

async function serveAsset(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(LOVABLE_ASSET_PREFIX)) return undefined;

  const assetPath = url.pathname.replace("/__l5e/", "");
  const r2Target = `${R2_ASSET_BASE_URL}/${assetPath}${url.search}`;
  const r2Response = await fetch(r2Target, { method: "HEAD" });

  if (r2Response.ok) return Response.redirect(r2Target, 302);

  // Some legacy asset pointers belong to an earlier workspace and cannot be
  // copied to R2. Keep those images available through Lovable's asset CDN.
  const fallbackTarget = `${LOVABLE_ASSET_FALLBACK_ORIGIN}${url.pathname}${url.search}`;
  return Response.redirect(fallbackTarget, 302);
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const assetResponse = await serveAsset(request);
      if (assetResponse) return assetResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
