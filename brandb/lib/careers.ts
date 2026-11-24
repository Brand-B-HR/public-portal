/**
 * The careers and apply pages talk to one API, anonymously, from the browser.
 *
 * This site is a static export, so there is no server here to proxy through: every request below
 * is made by the visitor's own browser against the HR API, which is why those endpoints are
 * CORS-enabled and rate-limited per IP on the API side rather than trusting anything sent from
 * here. Nothing in this file holds a secret, and nothing it sends is privileged.
 */

/** The query parameters the API's generated links use. Spelled once, read in both pages. */
export const ROLE_PARAM = "role";
export const CAREERS_PARAM = "c";
export const REFERRER_PARAM = "ref";

export interface CareersOpening {
  slug: string;
  jobTitle: string;
  employmentType: string;
  experienceLevel: string | null;
  summary: string | null;
  closesAt: string | null;
  publishedAt: string | null;
}

export interface CareersPage {
  businessName: string;
  businessLogoUrl: string | null;
  careersSlug: string;
  openings: CareersOpening[];
}

export interface PublicPosting {
  slug: string;
  jobTitle: string;
  businessName: string;
  businessLogoUrl: string | null;
  description: string | null;
  employmentType: string;
  experienceLevel: string | null;
  minEducationLevel: string | null;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  closesAt: string | null;

  /**
   * A signed token issued with this form, sent back untouched when the application is submitted.
   * It names the role and the moment the form was served, so the server can refuse a submission
   * for a different role or one faster than a person could type. Carries no secret.
   */
  formToken: string | null;

  /** Cloudflare's site key when a challenge is configured; null — the usual case — means none. */
  captchaSiteKey: string | null;
}

export interface SubmitResult {
  reference: string;
  message: string;
}

/**
 * Why a request did not return what was asked for, in a form the pages can act on.
 *
 * "gone" is kept apart from "notFound" deliberately. A candidate who followed a real link to a
 * filled role has not made a mistake and should not be told the page does not exist — they should
 * be told the role closed.
 */
export type FailureKind = "notFound" | "gone" | "duplicate" | "invalid" | "network";

export class CareersError extends Error {
  constructor(
    readonly kind: FailureKind,
    message: string,
  ) {
    super(message);
    this.name = "CareersError";
  }
}

// Read per call rather than captured at import. The value is injected at build time for the
// deployed site, but reading it lazily also lets a test set it before exercising the client
// instead of the module freezing an empty string the moment it is first imported.
const apiBaseUrl = (): string =>
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

/** Whether the site has been given an API to talk to at all. */
export const isConfigured = (): boolean => apiBaseUrl().length > 0;

/**
 * Reads the message the API sent, falling back to a given default.
 *
 * The API writes these for the candidate to read — "That email address doesn't look right", "You
 * have already applied for this role" — so showing its words is better than inventing our own.
 */
const messageFrom = async (response: Response, fallback: string): Promise<string> => {
  try {
    const body = (await response.json()) as { message?: unknown };
    return typeof body?.message === "string" && body.message.length > 0 ? body.message : fallback;
  } catch {
    return fallback;
  }
};

const failureFor = async (response: Response): Promise<CareersError> => {
  if (response.status === 404) {
    return new CareersError("notFound", await messageFrom(response, "We couldn't find that."));
  }

  if (response.status === 410) {
    return new CareersError(
      "gone",
      await messageFrom(response, "This role is no longer accepting applications."),
    );
  }

  if (response.status === 409) {
    return new CareersError(
      "duplicate",
      await messageFrom(response, "You have already applied for this role."),
    );
  }

  if (response.status === 400) {
    return new CareersError("invalid", await messageFrom(response, "Please check the form and try again."));
  }

  // Includes 429 from the API's rate limiter, which from a candidate's point of view is the same
  // kind of problem as a network failure: nothing they filled in is wrong, and trying again works.
  return new CareersError(
    "network",
    "Something went wrong at our end. Please try again in a moment.",
  );
};

const unconfigured = () =>
  new CareersError("network", "This careers site is not finished being set up yet.");

/** A business's careers page, by the slug in the link. */
export const fetchCareersPage = async (careersSlug: string): Promise<CareersPage> => {
  if (!isConfigured()) throw unconfigured();

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/api/public/careers/${encodeURIComponent(careersSlug)}`);
  } catch {
    throw new CareersError("network", "We couldn't reach the job listings. Please try again.");
  }

  if (!response.ok) throw await failureFor(response);

  return (await response.json()) as CareersPage;
};

/** One role, by the slug in an apply link. */
export const fetchPosting = async (slug: string): Promise<PublicPosting> => {
  if (!isConfigured()) throw unconfigured();

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/api/public/postings/${encodeURIComponent(slug)}`);
  } catch {
    throw new CareersError("network", "We couldn't reach this job opening. Please try again.");
  }

  if (!response.ok) throw await failureFor(response);

  return (await response.json()) as PublicPosting;
};

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  cv: File;
  consentGiven: boolean;
  /** From the link, when the candidate arrived through a referral. */
  referredByEmployeeId: string | null;

  /** The token the form was served with, passed back exactly as it was given. */
  formToken: string | null;

  /**
   * The hidden field. Always empty for a person — it is not shown on the page — so anything in it
   * means something filled in every input it could find in the markup.
   */
  honeypot: string;

  /** The challenge response, when one is configured. */
  captchaResponse: string | null;
}

/** Sends an application. Multipart, because of the CV. */
export const submitApplication = async (
  slug: string,
  input: ApplicationInput,
): Promise<SubmitResult> => {
  if (!isConfigured()) throw unconfigured();

  const form = new FormData();
  form.append("fullName", input.fullName);
  form.append("email", input.email);
  if (input.phone) form.append("phone", input.phone);
  form.append("cv", input.cv, input.cv.name);
  form.append("consentGiven", String(input.consentGiven));
  if (input.referredByEmployeeId) {
    form.append("referredByEmployeeId", input.referredByEmployeeId);
  }
  if (input.formToken) form.append("formToken", input.formToken);
  // Always sent, empty for a person. Sending it only when filled would tell a script which field
  // to leave alone.
  form.append("website", input.honeypot);
  if (input.captchaResponse) form.append("captchaResponse", input.captchaResponse);

  let response: Response;
  try {
    response = await fetch(
      `${apiBaseUrl()}/api/public/postings/${encodeURIComponent(slug)}/applications`,
      { method: "POST", body: form },
    );
  } catch {
    // The upload may have reached the server before the connection failed, so this deliberately
    // does not say the application was not received — only that we cannot confirm that it was.
    throw new CareersError(
      "network",
      "We couldn't confirm your application was sent. Please check your connection and try again.",
    );
  }

  if (!response.ok) throw await failureFor(response);

  return (await response.json()) as SubmitResult;
};

/** The experience bands as the API spells them, in words a candidate reads. */
const EXPERIENCE_LABELS: Record<string, string> = {
  FRESHER: "No experience needed",
  "0_1": "Up to 1 year",
  "1_3": "1–3 years",
  "3_5": "3–5 years",
  "5_10": "5–10 years",
  "10_PLUS": "10+ years",
};

export const experienceLabel = (level: string | null): string | null =>
  level ? (EXPERIENCE_LABELS[level] ?? level) : null;

/**
 * A closing date as a candidate needs it: the date, and how long is left.
 *
 * The urgency matters more than the format. "Closes in 3 days" moves someone who has been meaning
 * to apply all week; "31 December 2026" does not.
 */
export const closingLabel = (closesAt: string | null): string | null => {
  if (!closesAt) return null;

  const closes = new Date(closesAt);
  if (Number.isNaN(closes.getTime())) return null;

  const date = closes.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Compared as calendar days, not as elapsed hours. Rounding elapsed time up would call a role
  // that closes in five hours "tomorrow" — telling a candidate they have another day when what
  // they have is an afternoon.
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(closes) - startOfDay(new Date())) / 86_400_000);

  if (days < 0) return `Closed ${date}`;
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes tomorrow";
  if (days <= 14) return `Closes in ${days} days`;

  return `Closes ${date}`;
};

/**
 * Set by the widget loader when the apply page is framed on a business's own website. It changes
 * the page's chrome only — the form, the checks and what is sent are identical either way.
 */
export const EMBED_PARAM = "embed";
