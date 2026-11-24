import { Blocks, Palette, Wallet } from "lucide-react";

const values = [
  {
    icon: Blocks,
    title: "Modular by design",
    body: "Every HR service runs independently. Activate the ones you need today and add others as you grow.",
  },
  {
    icon: Wallet,
    title: "Pay for what you use",
    body: "Subscription is based on your employee capacity and the modules you select. Nothing more.",
    green: true,
  },
  {
    icon: Palette,
    title: "Your brand, your workspace",
    body: "Customize your workspace with your own company branding so it feels like part of your business.",
  },
];

export default function WhySection() {
  return (
    <section className="lp-sec" id="why">
      <div className="lp-container">
        <div className="lp-sec-head">
          <span className="lp-eyebrow">Why Brand B HR</span>
          <h2>Built to fit, not to force</h2>
          <p>
            Most HR tools make you adopt everything. Brand B HR starts with what you need and grows
            with you.
          </p>
        </div>
        <div className="lp-grid lp-grid--3">
          {values.map(({ icon: Icon, title, body, green }) => (
            <div key={title} className="lp-card lp-value">
              <div className={`lp-ico${green ? " lp-ico--green" : ""}`}>
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
