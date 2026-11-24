"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  CareersError,
  PublicPosting,
  REFERRER_PARAM,
  EMBED_PARAM,
  ROLE_PARAM,
  closingLabel,
  experienceLabel,
  fetchPosting,
  submitApplication,
} from "@/lib/careers";

/** Matches the API's limit, so an oversized file is refused here instead of after the upload. */
const MAX_BYTES = 10 * 1024 * 1024;

const ACCEPTED = [".pdf", ".doc", ".docx"];

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; posting: PublicPosting }
  | { kind: "closed"; message: string }
  | { kind: "missing"; message: string };

export default function ApplyContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get(ROLE_PARAM) ?? "";

  // Taken from the link and passed through untouched. It is a claim about who referred the
  // candidate, never proof of one, and it grants nothing — the API treats it the same way.
  const referrer = searchParams.get(REFERRER_PARAM);

  // Set by the widget loader, which frames this page on a business's own website. It changes only
  // the chrome: the form, the checks and what is sent are identical either way.
  const embedded = searchParams.get(EMBED_PARAM) === "1";

  useReportHeight(embedded);

  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    if (!slug) {
      setState({ kind: "missing", message: "This link is missing the role it belongs to." });
      return;
    }

    let active = true;
    setState({ kind: "loading" });

    fetchPosting(slug)
      .then((posting) => {
        if (active) setState({ kind: "ready", posting });
      })
      .catch((err: unknown) => {
        if (!active) return;

        if (err instanceof CareersError && err.kind === "gone") {
          // A real link to a filled role. The candidate did nothing wrong, and this is a different
          // thing to tell them than "this page does not exist".
          setState({ kind: "closed", message: err.message });
          return;
        }

        setState({
          kind: "missing",
          message:
            err instanceof CareersError ? err.message : "We couldn't load this job opening.",
        });
      });

    return () => {
      active = false;
    };
  }, [slug]);

  // One provider around every branch, because each of them renders a Shell and the Shell is the
  // only thing embedding changes.
  return (
    <EmbedContext.Provider value={embedded}>
      {state.kind === "loading" && (
        <Shell>
          <p className="text-center text-slate-500">Loading this role…</p>
        </Shell>
      )}

      {state.kind === "closed" && (
        <Shell>
          <Notice title="This role has closed">
            {state.message} Thank you for your interest — do look at the employer&apos;s other
            openings.
          </Notice>
        </Shell>
      )}

      {state.kind === "missing" && (
        <Shell>
          <Notice title="We couldn&apos;t find that role">{state.message}</Notice>
        </Shell>
      )}

      {state.kind === "ready" && <ApplyForm posting={state.posting} referrer={referrer} />}
    </EmbedContext.Provider>
  );
}

function ApplyForm({
  posting,
  referrer,
}: {
  posting: PublicPosting;
  referrer: string | null;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  // Never shown and never filled by a person. If it arrives with anything in it, whatever sent
  // the form read the markup and filled in every input it found.
  const [honeypot, setHoneypot] = useState("");

  const [fileError, setFileError] = useState("");
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const experience = experienceLabel(posting.experienceLevel);
  const closing = closingLabel(posting.closesAt);

  const emailLooksRight = email.trim().length > 2 && email.includes("@") && !email.includes(" ");
  const canSend =
    fullName.trim().length > 0 && emailLooksRight && !!cv && !fileError && consent && !sending;

  const pickFile = (file: File | null) => {
    setFileError("");
    setCv(null);

    if (!file) return;

    if (file.size === 0) {
      setFileError("That file is empty.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setFileError("That file is larger than 10 MB. Please attach a smaller one.");
      return;
    }

    // Checked for the candidate's benefit, not as a safeguard. The API identifies the file from
    // its bytes, which is the check that decides.
    const name = file.name.toLowerCase();
    if (!ACCEPTED.some((ext) => name.endsWith(ext))) {
      setFileError("Please attach your CV as a PDF or a Word document.");
      return;
    }

    setCv(file);
  };

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSend || !cv) return;

    setSending(true);
    setSendError("");

    try {
      const result = await submitApplication(posting.slug, {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        cv,
        consentGiven: consent,
        referredByEmployeeId: referrer,
        formToken: posting.formToken,
        honeypot,
        // No challenge is configured in the usual case, so there is nothing to collect.
        captchaResponse: null,
      });

      setReference(result.reference);
    } catch (err: unknown) {
      setSendError(
        err instanceof CareersError ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  if (reference) {
    return (
      <Shell>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-emerald-900">Application received</h1>
          <p className="mt-3 text-sm text-emerald-800">
            Thank you. {posting.businessName} will be in touch if you are shortlisted.
          </p>
          <p className="mt-6 text-xs uppercase tracking-wide text-emerald-700">Your reference</p>
          <p className="font-display text-lg font-bold text-emerald-900">{reference}</p>
          <p className="mt-4 text-xs text-emerald-700">
            Keep this reference if you need to follow up about your application.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="mb-8">
        <div className="flex items-center gap-4">
          {posting.businessLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posting.businessLogoUrl}
              alt={posting.businessName}
              className="h-12 w-12 rounded-lg object-contain"
            />
          )}
          <div>
            <p className="text-sm font-medium text-slate-500">{posting.businessName}</p>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {posting.jobTitle}
            </h1>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>{posting.employmentType}</Tag>
          {experience && <Tag>{experience}</Tag>}
          {posting.minEducationLevel && <Tag>{posting.minEducationLevel} or above</Tag>}
          {closing && <Tag>{closing}</Tag>}
        </div>
      </header>

      {posting.description && (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-base font-bold text-slate-900">About the role</h2>
          {/*
            Rendered as text, never as markup. The description is authored in a rich-text editor on
            the business side, and putting that fragment into this page as HTML would hand whoever
            wrote it control of a page served to the public. `whitespace-pre-line` keeps the
            paragraphing readable without interpreting anything.
          */}
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {posting.description}
          </p>
        </section>
      )}

      {(posting.requiredSkills.length > 0 || posting.niceToHaveSkills.length > 0) && (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
          {posting.requiredSkills.length > 0 && (
            <>
              <h2 className="font-display text-base font-bold text-slate-900">
                What the role asks for
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {posting.requiredSkills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </>
          )}

          {posting.niceToHaveSkills.length > 0 && (
            <>
              <h3 className="mt-5 font-display text-sm font-bold text-slate-700">
                Nice to have
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {posting.niceToHaveSkills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <form
        onSubmit={send}
        className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        noValidate
      >
        <h2 className="font-display text-lg font-bold text-slate-900">Apply</h2>
        <p className="mt-1 text-sm text-slate-500">
          No account needed. Your details go straight to {posting.businessName}.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <Field label="Your name" htmlFor="fullName">
            <input
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={200}
              autoComplete="name"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" htmlFor="email" hint="How the employer will reach you.">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                autoComplete="email"
                className={inputClass}
              />
            </Field>

            <Field label="Phone (optional)" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={50}
                autoComplete="tel"
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="Your CV"
            htmlFor="cv"
            hint="PDF or Word document, up to 10 MB."
            error={fileError}
          >
            <input
              id="cv"
              name="cv"
              type="file"
              accept={ACCEPTED.join(",")}
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
            />
          </Field>

          {/*
            A hidden field, for catching anything that fills in every input it finds. It is taken
            out of the tab order and hidden from assistive technology as well as from sight, so a
            person using a screen reader or a keyboard never meets it either.
          */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300"
            />
            <span>
              I agree to my details and CV being shared with {posting.businessName} so they can
              consider me for this role.
            </span>
          </label>

          {sendError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {sendError}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSend}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {sending ? "Sending…" : "Send application"}
          </button>
        </div>
      </form>
    </Shell>
  );
}

const inputClass =
  "block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <h1 className="font-display text-xl font-bold text-slate-900">{title}</h1>
      <p className="mt-3 text-sm text-slate-600">{children}</p>
    </div>
  );
}

/**
 * Whether this page is inside the embeddable widget rather than standing on its own.
 *
 * Read from a React context rather than passed down, because every branch of this page renders a
 * Shell and threading a flag through all of them would be noise. Defaults to false, which is the
 * normal case: someone who followed a link.
 */
const EmbedContext = createContext(false);

function Shell({ children }: { children: React.ReactNode }) {
  const embedded = useContext(EmbedContext);

  // Embedded, the page is a panel on somebody else's site: no full-height background, no generous
  // vertical padding, no page-sized gutter, because the host page already provides all of that.
  // Standing alone it is the whole page and wants the opposite.
  return (
    <main
      className={
        embedded ? "bg-transparent px-0 py-0" : "min-h-screen bg-slate-50 px-4 py-14 sm:py-20"
      }
    >
      <div className={embedded ? "w-full" : "mx-auto max-w-2xl"}>{children}</div>
    </main>
  );
}

/**
 * Tells the embedding page how tall this form is.
 *
 * A cross-origin iframe cannot size itself, so the parent is sent a height and resizes the frame.
 * Without it the widget is a fixed box with a scrollbar inside it, which is what makes embedded
 * forms feel bolted on. Posted on every change — the form grows when an error appears and shrinks
 * to an acknowledgement when it is sent — and measured with a ResizeObserver rather than on a
 * timer, so it keeps up without polling.
 *
 * The target origin is "*" because the host page's origin is not knowable from here; the message
 * carries no data about the candidate, only a number, and the loader checks it came from us.
 */
function useReportHeight(enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || window.parent === window) return;

    const post = () => {
      const height = Math.ceil(document.documentElement.getBoundingClientRect().height);
      window.parent.postMessage({ type: "brandb:height", height }, "*");
    };

    post();

    const observer = new ResizeObserver(post);
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, [enabled]);
}
