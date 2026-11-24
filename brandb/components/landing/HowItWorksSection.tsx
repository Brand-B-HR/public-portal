import { howItWorks } from "@/lib/landing-content";

export default function HowItWorksSection() {
  return (
    <section className="lp-sec lp-sec--alt" id="how">
      <div className="lp-container">
        <div className="lp-sec-head">
          <span className="lp-eyebrow">How it works</span>
          <h2>From sign-up to live in three steps</h2>
        </div>
        <div className="lp-steps">
          {howItWorks.map(({ title, body }, index) => (
            <div key={title} className="lp-card lp-step">
              <div className="lp-num">{index + 1}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
