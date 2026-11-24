const productionAdminPortalUrl = "https://orange-rock-0b4501700.2.azurestaticapps.net";
const localAdminPortalUrl = "http://localhost:4200";

/**
 * Where "Log in" and "Get started" send a visitor. Authentication is owned by the Admin Portal
 * (MSAL), so this site has no sign-in or sign-up forms of its own.
 *
 * `NEXT_PUBLIC_ADMIN_PORTAL_URL` wins when set. Otherwise a page served from localhost points at the
 * local Admin Portal dev server and everything else at production. The host check needs `window`,
 * so pass the hostname in rather than reading it here; this keeps the function testable and safe to
 * call during prerendering.
 */
export function getAdminPortalUrl(hostname?: string): string {
  const configured = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL;
  if (configured) return configured;

  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  return isLocalHost ? localAdminPortalUrl : productionAdminPortalUrl;
}

/** Prefix for files in `public/`, because the site is exported under a base path. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
