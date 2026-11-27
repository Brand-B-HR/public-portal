/**
 * The landing page's price estimate. The API prices it with the same calculator registration uses,
 * so this site holds no prices and no pricing rules of its own.
 */

export type BillingCycle = "Monthly" | "Annual";

export interface QuoteRequest {
  employeeCount: number;
  serviceCodes: string[];
  billingCycle: BillingCycle;
}

export interface QuoteLine {
  lineType: string;
  description: string;
  /** Monthly amount in USD. Negative for discounts. */
  amountUsd: number;
}

export interface Quote {
  billingCycle: BillingCycle;
  lines: QuoteLine[];
  /** What the chosen billing period costs: one month, or one year. */
  totalUsd: number;
  annualSavingsUsd: number;
  trialDays: number;
  trialEmployeeLimit: number;
}

const apiBaseUrl = (): string =>
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

/** Without an API there is nothing to price with, and the preview shows the selection only. */
export const canEstimate = (): boolean => apiBaseUrl().length > 0;

export const fetchQuote = async (request: QuoteRequest, signal?: AbortSignal): Promise<Quote> => {
  const response = await fetch(`${apiBaseUrl()}/api/public/pricing/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) throw new Error(`The price estimate failed with status ${response.status}.`);

  return (await response.json()) as Quote;
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatUsd = (amount: number): string => usd.format(amount);
