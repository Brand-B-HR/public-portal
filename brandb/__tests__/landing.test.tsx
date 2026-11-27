import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '@/app/page';
import ConfiguratorPreview from '@/components/landing/ConfiguratorPreview';
import FaqSection from '@/components/landing/FaqSection';
import SiteNav from '@/components/landing/SiteNav';
import { faqs, hrModules, navLinks } from '@/lib/landing-content';
import { getAdminPortalUrl } from '@/lib/portal';

describe('getAdminPortalUrl', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('prefers the configured URL', () => {
    vi.stubEnv('NEXT_PUBLIC_ADMIN_PORTAL_URL', 'https://admin.example.test');
    expect(getAdminPortalUrl('localhost')).toBe('https://admin.example.test');
  });

  it('points localhost at the local Admin Portal when nothing is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_ADMIN_PORTAL_URL', '');
    expect(getAdminPortalUrl('localhost')).toBe('http://localhost:4200');
    expect(getAdminPortalUrl('127.0.0.1')).toBe('http://localhost:4200');
  });

  it('falls back to production for any other host', () => {
    vi.stubEnv('NEXT_PUBLIC_ADMIN_PORTAL_URL', '');
    expect(getAdminPortalUrl('example.com')).toMatch(/^https:\/\//);
    expect(getAdminPortalUrl()).toMatch(/^https:\/\//);
  });
});

describe('SiteNav', () => {
  it('renders every section link and the auth entry points', () => {
    render(<SiteNav />);
    for (const link of navLinks) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
    // The public site has no login: authentication belongs to the Admin Portal.
    expect(screen.queryByRole('link', { name: 'Log in' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get started free' })).toBeInTheDocument();
  });

  it('toggles the mobile menu', async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Primary' })).toHaveAttribute('data-open', 'true');
  });
});

describe('ConfiguratorPreview', () => {
  it('summarises the default selection', () => {
    render(<ConfiguratorPreview />);
    expect(screen.getByRole('status')).toHaveTextContent('26–50 employees · 3 of 7 modules selected');
  });

  it('updates the summary when capacity and modules change', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPreview />);

    await user.click(screen.getByRole('button', { name: '500+' }));
    await user.click(screen.getByRole('button', { name: /Training/ }));
    expect(screen.getByRole('status')).toHaveTextContent('500+ employees · 4 of 7 modules selected · custom quote');

    await user.click(screen.getByRole('button', { name: /Employee/ }));
    expect(screen.getByRole('status')).toHaveTextContent('3 of 7 modules');
  });
});

describe('FaqSection', () => {
  it('opens one answer at a time and closes it on a second click', async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const [first, second] = faqs;

    expect(screen.queryByText(first.answer)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: first.question }));
    expect(screen.getByText(first.answer)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: second.question }));
    expect(screen.queryByText(first.answer)).not.toBeInTheDocument();
    expect(screen.getByText(second.answer)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: second.question }));
    expect(screen.queryByText(second.answer)).not.toBeInTheDocument();
  });
});

describe('Home page', () => {
  it('has a target for every navigation link', () => {
    const { container } = render(<Home />);
    for (const { href } of navLinks) {
      expect(container.querySelector(href)).not.toBeNull();
    }
  });

  it('lists every HR module and never shows fixed prices or plan names', () => {
    render(<Home />);
    const modules = document.getElementById('modules')!;
    for (const hrModule of hrModules) {
      expect(within(modules).getByRole('heading', { name: hrModule.name })).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toMatch(/\$\s?\d|USD\s?\d/);
  });
});
