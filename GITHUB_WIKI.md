# Brand B HR Public Portal

The public, unauthenticated marketing site for Brand B HR. It explains the modular HR product, how
the flexible subscription works, and sends visitors to the Admin Portal to log in or sign up. It also
hosts the public careers and apply pages and the embeddable job widget.

The app lives in `brandb/` and is a Next.js static export (`output: "export"`) deployed to GitHub
Pages by `.github/workflows/nextjs.yml`.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page |
| `/careers?c=<slug>` | A business's open roles (the employer is a query parameter because the site is static) |
| `/apply` | Application form for a role |
| `/widget.js` | Embeddable job widget that renders the apply form in an iframe |

## Landing page

Sections, in order, in `brandb/components/landing/`:

1. `SiteNav`: sticky header, section links, Log in / Get started free, mobile menu
2. `HeroSection` with `ConfiguratorPreview`: an interactive, non-binding illustration of choosing employee capacity and modules
3. `WhySection`: modular by design, pay for what you use, your own branding
4. `ModulesSection`: the seven HR modules
5. `PricingSection`: explains the capacity-plus-modules model; it shows **no prices**
6. `HowItWorksSection`: register, customize, activate
7. `FaqSection`
8. `CtaSection` and `SiteFooter`

Copy and data (modules, capacity ranges, FAQs, contact details) live in `brandb/lib/landing-content.ts`.
Styles are in `brandb/app/landing.css`; every class is prefixed `lp-` so it cannot collide with the
Tailwind utilities used by the careers and apply pages.

## Authentication

This site has no sign-in or sign-up forms. Every Log in / Get started button goes to the Admin Portal
(MSAL), which owns authentication and routes new users to the guest onboarding flow. The URL comes
from `getAdminPortalUrl` in `brandb/lib/portal.ts`.

## Configuration

Copy `brandb/.env.example` to `brandb/.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ADMIN_PORTAL_URL` | Admin Portal URL for Log in / Get started. Falls back to `http://localhost:4200` on localhost, else production |
| `NEXT_PUBLIC_API_BASE_URL` | HR API used by the careers and apply pages and the landing page's price estimate. The GitHub Pages build reads it from the repository variable of the same name |

## Commands

Run from `brandb/`:

```bash
npm install
npm run dev
npm run build
npm test
```
