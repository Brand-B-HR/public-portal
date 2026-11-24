"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/landing-content";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="lp-sec" id="faq">
      <div className="lp-container">
        <div className="lp-sec-head">
          <span className="lp-eyebrow">FAQ</span>
          <h2>Common questions</h2>
        </div>
        <div className="lp-faq">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question} className="lp-faq-item">
                <button
                  type="button"
                  className="lp-faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {question}
                  <ChevronDown size={20} />
                </button>
                {isOpen && (
                  <div className="lp-faq-a" id={`faq-answer-${index}`}>
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
