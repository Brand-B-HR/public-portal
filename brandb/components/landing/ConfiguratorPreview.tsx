"use client";

import { useState } from "react";
import { Calculator, Check } from "lucide-react";
import { capacityRanges, hrModules } from "@/lib/landing-content";
import type { BillingCycle } from "@/lib/pricing";
import DemoLink from "./DemoLink";
import PriceEstimate from "./PriceEstimate";

const defaultServices = ["LEAVE_MANAGEMENT", "PAYROLL_SERVICES"];

/**
 * A non-binding illustration of the registration wizard's capacity and module choices, with the
 * price the API would quote for them. Nothing is saved.
 */
export default function ConfiguratorPreview() {
  const [capacity, setCapacity] = useState(2);
  const [cycle, setCycle] = useState<BillingCycle>("Monthly");
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set(defaultServices));

  const toggleService = (code: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (!next.delete(code)) next.add(code);
      return next;
    });

  const range = capacityRanges[capacity];
  // Catalogue order, so the same selection always makes the same request.
  const serviceCodes = hrModules.flatMap((m) =>
    m.serviceCode && selected.has(m.serviceCode) ? [m.serviceCode] : [],
  );
  // Core modules have no service code: every subscription includes them.
  const moduleCount = serviceCodes.length + hrModules.filter((m) => !m.serviceCode).length;
  const selectionSummary = (
    <div className="lp-config-foot" role="status">
      <Calculator size={17} />
      <span>
        {range.label} employees · {moduleCount} of {hrModules.length} modules selected
        {range.employees === undefined && " · custom quote"}
      </span>
    </div>
  );

  return (
    <div className="lp-config" aria-label="Interactive preview of choosing capacity and modules">
      <div className="lp-config-head">
        <strong>Build your HR workspace</strong>
        <span>Preview</span>
      </div>

      <h4>Employee capacity</h4>
      <div className="lp-cap-row">
        {capacityRanges.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className="lp-cap"
            aria-pressed={index === capacity}
            onClick={() => setCapacity(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <h4>HR modules</h4>
      <div className="lp-mod-list">
        {hrModules.map((module) => {
          const Icon = module.icon;
          const code = module.serviceCode;
          return (
            <button
              key={module.name}
              type="button"
              className="lp-mod"
              aria-pressed={!code || selected.has(code)}
              disabled={!code}
              onClick={code ? () => toggleService(code) : undefined}
            >
              <Icon size={17} />
              {module.shortName}
              {code ? (
                <span className="lp-tick">
                  <Check size={11} strokeWidth={3.5} />
                </span>
              ) : (
                <span className="lp-included">Included</span>
              )}
            </button>
          );
        })}
      </div>

      {range.employees === undefined ? (
        <>
          {selectionSummary}
          <DemoLink className="lp-btn lp-btn--dark-outline lp-btn--sm lp-config-demo" />
        </>
      ) : (
        <PriceEstimate
          employeeCount={range.employees}
          rangeLabel={range.label}
          serviceCodes={serviceCodes}
          cycle={cycle}
          onCycleChange={setCycle}
          fallback={selectionSummary}
        />
      )}
    </div>
  );
}
