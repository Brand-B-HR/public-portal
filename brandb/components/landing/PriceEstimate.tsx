"use client";

import { useEffect, useState, type ReactNode } from "react";
import { canEstimate, fetchQuote, formatUsd, type BillingCycle, type Quote } from "@/lib/pricing";

/** Long enough that clicking through several options sends one request, not one per click. */
const SETTLE_MS = 250;

const cycles: BillingCycle[] = ["Monthly", "Annual"];

interface PriceEstimateProps {
  employeeCount: number;
  rangeLabel: string;
  serviceCodes: string[];
  cycle: BillingCycle;
  onCycleChange: (cycle: BillingCycle) => void;
  /** Shown instead when no price can be had, so a visitor never sees an error or a wrong figure. */
  fallback: ReactNode;
}

interface Answer {
  key: string;
  rangeLabel: string;
  /** Null when the request failed. */
  quote: Quote | null;
}

export default function PriceEstimate({
  employeeCount,
  rangeLabel,
  serviceCodes,
  cycle,
  onCycleChange,
  fallback,
}: PriceEstimateProps) {
  const key = JSON.stringify({ employeeCount, serviceCodes, billingCycle: cycle });
  const [answer, setAnswer] = useState<Answer | null>(null);
  const enabled = canEstimate();

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      let quote: Quote | null = null;
      try {
        quote = await fetchQuote(JSON.parse(key), controller.signal);
      } catch {
        // Leaves the quote null, which shows the fallback.
      }
      if (!controller.signal.aborted) setAnswer({ key, rangeLabel, quote });
    }, SETTLE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enabled, key, rangeLabel]);

  const current = answer?.key === key;
  if (!enabled || (current && !answer.quote)) return fallback;

  // While a new price is on its way the last one stays, dimmed, so the card does not jump. Its
  // range and period are the ones it was priced for, not the ones just clicked.
  const quote = answer?.quote;

  return (
    <div className="lp-price">
      <div className="lp-price-head">
        <h4>Estimated price</h4>
        <div className="lp-cycle" role="group" aria-label="Billing period">
          {cycles.map((item) => (
            <button key={item} type="button" aria-pressed={item === cycle} onClick={() => onCycleChange(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="lp-price-main" role="status" aria-busy={!current}>
        {quote ? (
          <>
            <div>
              <strong>{formatUsd(quote.totalUsd)}</strong> per{" "}
              {quote.billingCycle === "Annual" ? "year" : "month"}
            </div>
            <small>
              {answer.rangeLabel} employees
              {quote.annualSavingsUsd > 0 && <em> · save {formatUsd(quote.annualSavingsUsd)} a year</em>}
            </small>
          </>
        ) : (
          <small>Calculating your estimate…</small>
        )}
      </div>

      {quote && (
        <>
          <details>
            <summary>Monthly breakdown</summary>
            <ul>
              {quote.lines.map((line) => (
                <li key={line.description} data-discount={line.amountUsd < 0}>
                  <span>{line.description}</span>
                  <span>{formatUsd(line.amountUsd)}</span>
                </li>
              ))}
            </ul>
          </details>
          <p className="lp-price-note">
            Estimate in USD. Free for {quote.trialDays} days; the trial covers up to{" "}
            {quote.trialEmployeeLimit} employees.
          </p>
        </>
      )}
    </div>
  );
}
