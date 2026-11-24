import { Sparkles } from "lucide-react";
import { hrModules } from "@/lib/landing-content";

export default function ModulesSection() {
  return (
    <section className="lp-sec lp-sec--alt" id="modules">
      <div className="lp-container">
        <div className="lp-sec-head">
          <span className="lp-eyebrow">HR modules</span>
          <h2>Seven services. Use any combination.</h2>
          <p>Choose modules during registration and change them later as your needs evolve.</p>
        </div>
        <div className="lp-grid lp-grid--4">
          {hrModules.map(({ icon: Icon, name, description, features }, index) => (
            <article key={name} className="lp-card lp-service">
              <div className={`lp-ico${index % 2 ? " lp-ico--green" : ""}`}>
                <Icon size={22} />
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="lp-card lp-service lp-service--last">
            <div className="lp-ico">
              <Sparkles size={22} />
            </div>
            <h3>Mix &amp; match</h3>
            <p>Start with one module or all seven. Add more whenever you grow.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
