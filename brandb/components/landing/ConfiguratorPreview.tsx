"use client";

import { useState } from "react";
import { Calculator, Check } from "lucide-react";
import { capacityRanges, hrModules } from "@/lib/landing-content";

/**
 * A non-binding illustration of the registration wizard's capacity and module choices. It holds no
 * pricing and sends nothing anywhere; it exists to show visitors how the product is configured.
 */
export default function ConfiguratorPreview() {
  const [capacity, setCapacity] = useState(2);
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set([0, 2, 4]));

  const toggleModule = (index: number) =>
    setSelected((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  const range = capacityRanges[capacity];
  const summary = `${range.label} employees · ${selected.size} of ${hrModules.length} modules selected${
    range.custom ? " · custom quote" : ""
  }`;

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
        {hrModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <button
              key={module.name}
              type="button"
              className="lp-mod"
              aria-pressed={selected.has(index)}
              onClick={() => toggleModule(index)}
            >
              <Icon size={17} />
              {module.shortName}
              <span className="lp-tick">
                <Check size={11} strokeWidth={3.5} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="lp-config-foot" role="status">
        <Calculator size={17} />
        <span>{summary}</span>
      </div>
    </div>
  );
}
