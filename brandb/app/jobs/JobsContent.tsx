"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CAREERS_PARAM,
  CareersError,
  EMPTY_FILTERS,
  EXPERIENCE_OPTIONS,
  JobFilters,
  JobListing,
  ROLE_PARAM,
  SOURCE_PARAM,
  closingLabel,
  experienceLabel,
  fetchJobs,
  filterJobs,
  groupByBusiness,
} from "@/lib/careers";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Apply link tagged so the application is recorded as coming from this portal's jobs board. */
const applyHref = (slug: string) =>
  `${basePath}/apply/?${ROLE_PARAM}=${encodeURIComponent(slug)}&${SOURCE_PARAM}=portal`;

const careersHref = (careersSlug: string) =>
  `${basePath}/careers/?${CAREERS_PARAM}=${encodeURIComponent(careersSlug)}`;

export default function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: JobFilters = {
    query: searchParams.get("q") ?? "",
    experience: searchParams.get("exp") ?? "",
    employmentType: searchParams.get("type") ?? "",
    business: searchParams.get("b") ?? "",
  };

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchJobs()
      .then((result) => {
        if (active) setJobs(result);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof CareersError ? err.message : "We could not load the job listings.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const setFilter = (key: keyof JobFilters, value: string) => {
    const next = { ...filters, [key]: value };
    const params = new URLSearchParams();
    if (next.query) params.set("q", next.query);
    if (next.experience) params.set("exp", next.experience);
    if (next.employmentType) params.set("type", next.employmentType);
    if (next.business) params.set("b", next.business);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const businesses = useMemo(() => groupByBusiness(jobs), [jobs]);
  const employmentTypes = useMemo(
    () => [...new Set(jobs.map((j) => j.employmentType))].sort(),
    [jobs],
  );
  const groups = groupByBusiness(filterJobs(jobs, filters));
  const total = groups.reduce((n, g) => n + g.jobs.length, 0);
  const hasFilters = JSON.stringify(filters) !== JSON.stringify(EMPTY_FILTERS);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Jobs
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Open roles from businesses on Brand B HR. Pick one and apply in minutes.
          </p>
        </header>

        {loading && <p className="text-center text-slate-500">Loading jobs…</p>}

        {!loading && error && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="font-display text-xl font-bold text-slate-900">Nothing to show here</h2>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
              <input
                type="search"
                aria-label="Search jobs"
                placeholder="Search title or company"
                value={filters.query}
                onChange={(e) => setFilter("query", e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <Select
                label="Experience"
                value={filters.experience}
                onChange={(v) => setFilter("experience", v)}
                options={EXPERIENCE_OPTIONS.map((o) => ({ value: o, label: experienceLabel(o) ?? o }))}
              />
              <Select
                label="Job type"
                value={filters.employmentType}
                onChange={(v) => setFilter("employmentType", v)}
                options={employmentTypes.map((t) => ({ value: t, label: t }))}
              />
              <Select
                label="Business"
                value={filters.business}
                onChange={(v) => setFilter("business", v)}
                options={businesses.map((b) => ({ value: b.careersSlug, label: b.businessName }))}
              />
            </div>

            <p className="mb-4 text-sm text-slate-600" aria-live="polite">
              {total} open {total === 1 ? "role" : "roles"}
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => router.replace(pathname, { scroll: false })}
                  className="ml-3 font-semibold text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </p>

            {total === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-700">
                No roles match. Try clearing a filter.
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {groups.map((group) => (
                  <section key={group.careersSlug} aria-label={group.businessName}>
                    <div className="mb-3 flex items-center gap-3">
                      {group.businessLogoUrl ? (
                        // Plain img: logo hosts are unknown at build time and optimisation is off.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={group.businessLogoUrl}
                          alt=""
                          className="h-10 w-10 rounded-lg bg-white object-contain"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700"
                        >
                          {group.businessName.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <h2 className="font-display text-lg font-bold text-slate-900">
                        {group.businessName}
                      </h2>
                      <a
                        href={careersHref(group.careersSlug)}
                        className="ml-auto text-sm font-semibold text-blue-600 hover:underline"
                      >
                        All roles at {group.businessName}
                      </a>
                    </div>

                    <ul className="flex flex-col gap-3">
                      {group.jobs.map((job) => (
                        <JobCard key={job.slug} job={job} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function JobCard({ job }: { job: JobListing }) {
  const experience = experienceLabel(job.experienceLevel);
  const closing = closingLabel(job.closesAt);

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-slate-900">{job.jobTitle}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <Tag>{job.employmentType}</Tag>
            {experience && <Tag>{experience}</Tag>}
            {closing && <Tag>{closing}</Tag>}
          </div>
          {job.summary && <p className="mt-3 text-sm text-slate-600">{job.summary}</p>}
        </div>
        <a
          href={applyHref(job.slug)}
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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
    >
      <option value="">{`All ${label.toLowerCase()}`}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
