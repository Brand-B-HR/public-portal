"use client";

import { Suspense } from "react";
import ApplyContent from "./ApplyContent";

/**
 * The application form for one role — the page every public channel points at.
 *
 * The role travels in the `role` query parameter rather than a path segment, for the same reason
 * the careers page uses `c`: this site is a static export, and a posting's slug does not exist when
 * the site is built. The API composes these links from deployment configuration, so this route and
 * that parameter name are a contract with it.
 *
 * `useSearchParams` suspends while prerendering, so the form sits behind a boundary.
 */
export default function ApplyPage() {
  return (
    <Suspense fallback={<ApplyFallback />}>
      <ApplyContent />
    </Suspense>
  );
}

function ApplyFallback() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center text-slate-500">Loading this role…</div>
    </main>
  );
}
