"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Calculator } from "lucide-react";
import { capacityRanges, hrModules } from "@/lib/landing-content";
import { canEstimate, fetchQuote, formatUsd, type Quote } from "@/lib/pricing";
import ConfiguratorPreview from "./ConfiguratorPreview";

/** The cheapest subscription there is: the smallest team with only the included modules. */
const startingSelection = {
  employeeCount: capacityRanges[0].employees!,
  serviceCodes: [],
  billingCycle: "Monthly" as const,
};

const included = hrModules.filter((m) => !m.serviceCode);
const optional = hrModules.filter((m) => m.serviceCode);

/**
 * The hero's summary of what can be subscribed to. It only informs: choosing a team size and
 * modules, and seeing their price, happens in the popup it opens.
 */
export default function WorkspaceCard() {
  const dialog = useRef<HTMLDialogElement>(null);
  // Not rendered until first asked for, then kept, so reopening finds the earlier choices.
  const [opened, setOpened] = useState(false);
  // Null until the API answers, and for good if it cannot: the card then shows no figures.
  const [starting, setStarting] = useState<Quote | null>(null);

  useEffect(() => {
    if (!canEstimate()) return;

    const controller = new AbortController();
    fetchQuote(startingSelection, controller.signal)
      .then(setStarting)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const open = () => {
    setOpened(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  // The dialog has no padding, so a click that lands on it rather than a child is on the backdrop.
  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <div className="lp-workspace">
        <div className="lp-workspace-head">
          <strong>Build your HR workspace</strong>
          {starting && starting.trialDays > 0 && <span>{starting.trialDays}-day free trial</span>}
        </div>

        <h4>Included in every plan</h4>
        <ul className="lp-avail lp-avail--included">
          {included.map((m) => (
            <li key={m.name}>{m.name}</li>
          ))}
        </ul>

        <h4>Add the modules you need</h4>
        <ul className="lp-avail">
          {optional.map((m) => (
            <li key={m.name}>{m.name.replace(" Management", "")}</li>
          ))}
        </ul>

        <div className="lp-workspace-foot">
          {starting && (
            <p>
              Plans from <strong>{formatUsd(starting.totalUsd)}</strong> per month
            </p>
          )}
          <button type="button" className="lp-btn lp-btn--primary" aria-haspopup="dialog" onClick={open}>
            <Calculator size={18} />
            {starting ? "Estimate your price" : "Build your workspace"}
          </button>
        </div>
      </div>

      <dialog ref={dialog} className="lp-modal" aria-label="Build your HR workspace" onClick={closeFromBackdrop}>
        {opened && <ConfiguratorPreview onClose={close} />}
      </dialog>
    </>
  );
}
