"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  CAREERS_PARAM,
  CareersError,
  CareersOpening,
  CareersPage,
  ROLE_PARAM,
  closingLabel,
  experienceLabel,
  fetchCareersPage,
} from "@/lib/careers";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** The apply page for a role, built the same way the API builds the links it hands out. */
const applyHref = (slug: string) =>
  `${basePath}/apply/?${ROLE_PARAM}=${encodeURIComponent(slug)}`;

export default function CareersContent() {
  const searchParams = useSearchParams();
  const careersSlug = searchParams.get(CAREERS_PARAM) ?? "";

  const [page, setPage] = useState<CareersPage | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!careersSlug) {
      setError("This link is missing the employer it belongs to.");
      setLoading(false);
      return;
    }

    let active = true;

    setLoading(true);
    setError("");

    fetchCareersPage(careersSlug)
      .then((result) => {
        // The component may have been replaced while the request was out — a candidate following
        // a second link, for instance — and writing to a gone component would show stale openings.
        if (active) setPage(result);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof CareersError ? err.message : "We couldn't load these job openings.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [careersSlug]);

  if (loading) {
    return (
      <Shell>
        <p className="text-center text-slate-500">Loading openings…</p>
      </Shell>
    );
  }

  if (error || !page) {
    return (
      <Shell>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="font-display text-xl font-bold text-slate-900">Nothing to show here</h1>
          <p className="mt-2 text-sm text-slate-600">{error || "We couldn't load these openings."}</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="mb-10 flex flex-col items-center text-center">
        {page.businessLogoUrl && (
          // A plain img, not next/image: the logo is on a host this site does not know at build
          // time, and the export is configured with image optimisation off anyway.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.businessLogoUrl}
            alt={page.businessName}
            className="mb-5 h-16 w-16 rounded-xl object-contain"
          />
        )}

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Careers at {page.businessName}
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {page.openings.length === 0
            ? "No openings just now."
            : `${page.openings.length} open ${page.openings.length === 1 ? "role" : "roles"}`}
        </p>
      </header>

      {page.openings.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-700">
            {page.businessName} is not advertising any roles at the moment.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Do check back — this page is kept up to date as roles open.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {page.openings.map((opening) => (
            <OpeningCard key={opening.slug} opening={opening} />
          ))}
        </ul>
      )}
    </Shell>
  );
}

function OpeningCard({ opening }: { opening: CareersOpening }) {
  const experience = experienceLabel(opening.experienceLevel);
  const closing = closingLabel(opening.closesAt);

  return (
    <li className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold text-slate-900">{opening.jobTitle}</h2>

          <div className="mt-2 flex flex-wrap gap-2">
            <Tag>{opening.employmentType}</Tag>
            {experience && <Tag>{experience}</Tag>}
            {closing && <Tag>{closing}</Tag>}
          </div>

          {opening.summary && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{opening.summary}</p>
          )}
        </div>

        <a
          href={applyHref(opening.slug)}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View &amp; apply
        </a>
      </div>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">{children}</div>
    </main>
  );
}
