"use client";

import { Suspense } from "react";
import CareersContent from "./CareersContent";

/**
 * A business's careers page.
 *
 * The employer is named by the `c` query parameter rather than a path segment, because this site is
 * a static export: the host can only serve paths that existed when the site was built, and a
 * business's careers slug is minted long afterwards. A path would 404 for every employer; a query
 * parameter costs nothing and the page reads it in the browser.
 *
 * `useSearchParams` suspends during prerendering, so the content sits behind a boundary. Without
 * it the export fails rather than producing a page that loads its own data.
 */
export default function CareersPage() {
  return (
    <Suspense fallback={<CareersFallback />}>
      <CareersContent />
    </Suspense>
  );
}

function CareersFallback() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center text-slate-500">Loading openings…</div>
    </main>
  );
}
