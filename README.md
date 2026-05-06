# Brand B HR Public Portal

Brand B HR Public Portal is the public-facing website for the Brand B HR platform. It introduces the Brand B HR product, explains the services offered to businesses, students, and job seekers, presents subscription plans, and gives visitors a clear path into the connected admin portal.

The portal is built as a modern, responsive Next.js application with animated sections, static export support, GitHub Pages deployment, and environment-based admin portal linking.

## Project Overview

Brand B HR is positioned as a smart HR management platform for modern businesses. The public portal communicates the platform's value proposition:

> Empowering Businesses with Smart HR Solutions

The site is designed to support several audiences:

- Businesses that need recruitment automation, employee management, and intern discovery.
- Students and graduates who want to upload CVs, receive HR mentoring, and become discoverable to companies.
- Job seekers who want to browse verified job listings, apply quickly, and track applications.
- HR teams and decision makers comparing pricing, features, and service scope.

The current homepage renders a single-page scrolling experience with these sections:

1. Navigation
2. About
3. Services
4. Pricing
5. Contact and team
6. Footer
7. Scroll progress indicator

## Main Features

### Responsive Navigation

The navigation bar stays fixed at the top of the page and changes style after scrolling. It includes:

- Brand B logo and brand name.
- Smooth-scroll links for About Us, Our Services, Pricing, and Our Team.
- Desktop call-to-action buttons for Contact Us and Get Started.
- Mobile hamburger drawer with the same key navigation options.
- Admin portal redirect logic through the Get Started action.

### About Section

The About section introduces Brand B HR and presents the purpose of the platform. It includes:

- A hero-style Brand B HR introduction.
- The tagline "Empowering Businesses with Smart HR Solutions".
- A summary of the platform as a workforce operations solution.
- Vision and mission cards.
- Core values:
  - Professionalism
  - Confidentiality
  - Integrity
  - Collaboration

### Services Section

The Services section explains the primary business and user-facing capabilities of Brand B HR.

Core services include:

- Automated Recruiting: candidate screening, interview scheduling, and pipeline tracking.
- Employee Management: employee profiles, role and department management, and performance tracking.
- CV Portfolio and HR Mentoring: student CV uploads, HR consultant review, and career guidance.
- Intern Discovery for Businesses: verified student CV pool, smart filtering, and candidate connection.
- Job Application Portal: verified job listings, quick applications, application tracking, and personalized recommendations.

The section also highlights stakeholder groups:

- Businesses
- Students
- Job seekers

### Pricing Section

The Pricing section presents simple annual plans and a free trial option.

| Plan | Price | Best For | Key Limits |
| --- | --- | --- | --- |
| Starter | $0 / 1 month | Trial users and small evaluations | Up to 10 employees |
| Standard | $10 / year | Small and medium businesses | Up to 100 employees |
| Business | $20 / year | Larger organizations | Unlimited employees |

All plans include:

- Secure data storage
- Regular platform updates
- Job seeker and student portal access
- Web and mobile access
- Intern discovery pool
- CV portfolio management

The pricing cards redirect users to the admin portal and attach the selected plan as a `plan` query parameter.

### Contact and Team Section

The Contact section gives users ways to contact Brand B HR and introduces team members.

Contact details shown in the portal:

- Email: `hello@brandbhr.com`
- Phone: `+94 11 234 5678`
- Office: `42 Galle Road, Colombo 03, Sri Lanka`
- Working hours: `Mon - Fri, 8:30 AM - 5:30 PM`

Team members currently listed:

- Amara Silva, Head of HR Operations
- Dinesh Perera, Recruitment Specialist
- Kavindra Jayasinghe, Client Success Manager
- Nimal Fernando, Business Development Lead

Each team member card includes email and phone contact actions.

### Footer

The footer provides:

- Brand summary and logo.
- Social media icon buttons.
- Link groups for Company, Services, Platform, and Support.
- Legal links such as Privacy Policy, Terms of Service, Cookie Policy, and Accessibility.
- Dynamic copyright year.
- Back-to-top button.

## Technology Stack

The public portal is built with:

- Next.js 16.2.2
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Framer Motion for animations
- Lucide React for icons
- Bun for dependency management and local scripts
- ESLint with Next.js core web vitals and TypeScript rules

## Project Structure

```text
public-portal/
├── .github/
│   └── workflows/
│       └── nextjs.yml
├── brandb/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pricing.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── Services.tsx
│   ├── lib/
│   │   └── useInView.ts
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.png
│   ├── next.config.ts
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## Key Files

| File | Purpose |
| --- | --- |
| `brandb/app/page.tsx` | Composes the homepage sections in display order. |
| `brandb/app/layout.tsx` | Defines page metadata, favicon paths, and root layout. |
| `brandb/app/globals.css` | Global theme variables, typography, layout helpers, and reusable button/card styles. |
| `brandb/components/Navbar.tsx` | Fixed responsive navigation and admin portal redirect handling. |
| `brandb/components/About.tsx` | Brand introduction, mission, vision, and values. |
| `brandb/components/Services.tsx` | Service cards and audience cards. |
| `brandb/components/Pricing.tsx` | Pricing plans, plan redirect behavior, included perks, and FAQs. |
| `brandb/components/Contact.tsx` | Contact cards, team cards, and final CTA. |
| `brandb/components/Footer.tsx` | Footer navigation, social icons, legal links, and back-to-top action. |
| `brandb/lib/useInView.ts` | Intersection Observer hook used to trigger section animations. |
| `brandb/next.config.ts` | Static export, GitHub Pages base path, asset prefix, and image settings. |
| `.github/workflows/nextjs.yml` | GitHub Pages build and deployment workflow. |

## Local Development

### Prerequisites

Install the following before running the project locally:

- Node.js 24 or compatible current Node.js version
- Bun

### Install Dependencies

```bash
cd brandb
bun install
```

### Run the Development Server

```bash
bun run dev
```

The Next.js development server will start locally. Open the URL printed in the terminal, usually:

```text
http://localhost:3000
```

### Build the Static Site

```bash
bun run build
```

The project is configured with `output: "export"`, so the production-ready static files are generated in:

```text
brandb/out
```

### Run Linting

```bash
bun run lint
```

## Environment Variables

The portal uses public environment variables for deployment paths and admin portal routing.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | No | Base path used for static assets. The Next.js config currently sets this to `/public-portal`. |
| `NEXT_PUBLIC_ADMIN_PORTAL_URL` | No | Optional override for the admin portal URL used by Get Started buttons. |

If `NEXT_PUBLIC_ADMIN_PORTAL_URL` is not provided:

- On localhost, the portal redirects to `http://localhost:4200`.
- In production, the portal redirects to `https://orange-rock-0b4501700.2.azurestaticapps.net`.

Pricing buttons append a selected plan:

```text
?plan=starter
?plan=standard
?plan=business
```

## Deployment

The repository includes a GitHub Actions workflow for GitHub Pages deployment.

Workflow file:

```text
.github/workflows/nextjs.yml
```

Deployment process:

1. The workflow runs when changes are pushed to the `main` branch.
2. GitHub Actions checks out the repository.
3. Node.js 24 is configured.
4. Bun is installed.
5. Dependencies are installed from the `brandb` directory.
6. `bun run build` generates the static export.
7. The `brandb/out` directory is uploaded as the Pages artifact.
8. GitHub Pages deploys the static site.

Important deployment configuration:

- The app is exported statically using `output: "export"`.
- The base path is `/public-portal`.
- The asset prefix is configured for GitHub Pages.
- Next.js image optimization is disabled with `images.unoptimized: true`, which is required for static export compatibility.

## Design and User Experience

The portal uses a polished blue, green, and slate visual system intended to communicate trust, professionalism, and modern HR technology.

Design characteristics:

- Responsive layout for desktop, tablet, and mobile screens.
- Smooth section scrolling.
- Animated section reveals using Framer Motion.
- Fixed scroll progress indicator.
- Large hero-style section blocks for About, Services, Pricing, and Contact.
- Card-based service, pricing, values, contact, and team presentation.
- Clear call-to-action buttons that guide users toward the admin portal or pricing/contact sections.

Typography:

- Display font: Plus Jakarta Sans
- Body font: Inter

## Current Implementation Notes

- The public portal is a frontend-only static site.
- There are no server-side API routes in the current implementation.
- Content such as pricing, contact information, services, and team members is currently stored directly in React component files.
- Footer links and social icon buttons are currently visual navigation placeholders unless linked to real destinations.
- The admin portal URL is controlled through `NEXT_PUBLIC_ADMIN_PORTAL_URL` or the built-in fallback URLs.
- The project includes some unused components such as `Hero.tsx`, `Features.tsx`, and `Clients.tsx`; the active homepage currently imports `Navbar`, `About`, `Services`, `Pricing`, `Contact`, `Footer`, and `ScrollProgress`.

## Suggested Future Improvements

- Connect footer links and social buttons to real pages or external URLs.
- Move repeated content such as services, plans, FAQs, and team members into a structured content file.
- Add a contact form with validation and backend submission handling.
- Add screenshots to the GitHub Wiki after final deployment.
- Add a roadmap page for planned platform features.
- Add automated checks for build and linting in pull requests, not only deployment on `main`.
- Review all placeholder contact details before production launch.
- Add accessibility testing for keyboard navigation, color contrast, and focus states.

## Repository Maintenance

Recommended maintenance workflow:

1. Create a feature branch for changes.
2. Update components or content in `brandb`.
3. Run linting.
4. Run a production build.
5. Review the local output.
6. Open a pull request.
7. Merge into `main` after review.
8. Allow GitHub Actions to deploy to GitHub Pages.

Recommended verification commands:

```bash
cd brandb
bun run lint
bun run build
```

## Summary

Brand B HR Public Portal is the marketing and entrypoint website for the Brand B HR platform. It presents the company's mission, services, pricing, contact information, and calls to action in a polished single-page experience. The project is lightweight, static-export friendly, and ready for GitHub Pages deployment through the included workflow.

