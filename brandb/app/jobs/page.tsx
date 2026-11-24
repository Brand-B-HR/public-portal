"use client";

import { Suspense } from "react";
import JobsContent from "./JobsContent";

/**
 * The all-businesses jobs board. Filters live in the query string (`q`, `exp`, `type`, `b`) so a
 * filtered view can be shared; `useSearchParams` needs a Suspense boundary for the static export.
 */
export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-4xl text-center text-slate-500">Loading jobs…</div>
        </main>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
