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

describe('ConfiguratorPreview without an API', () => {
  beforeEach(() => vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', ''));
  afterEach(() => vi.unstubAllEnvs());

  it('summarises the default selection', () => {
    render(<ConfiguratorPreview />);
    expect(screen.getByRole('status')).toHaveTextContent('26–50 employees · 4 of 7 modules selected');
  });

  it('updates the summary when capacity and modules change', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPreview />);

    await user.click(screen.getByRole('button', { name: '500+' }));
    await user.click(screen.getByRole('button', { name: /Training/ }));
    expect(screen.getByRole('status')).toHaveTextContent('500+ employees · 5 of 7 modules selected · custom quote');
    expect(screen.getByRole('link', { name: 'Request a demo' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Training/ }));
    expect(screen.getByRole('status')).toHaveTextContent('4 of 7 modules');
  });

  it('keeps the core modules switched on', () => {
    render(<ConfiguratorPreview />);
    for (const name of [/Employee/, /Department/]) {
      const core = screen.getByRole('button', { name });
      expect(core).toBeDisabled();
      expect(core).toHaveAttribute('aria-pressed', 'true');
      expect(core).toHaveTextContent('Included');
    }
  });
});

describe('ConfiguratorPreview price estimate', () => {
  const fetchMock = vi.fn();

  const answerWith = (totalUsd: number, billingCycle = 'Monthly', annualSavingsUsd = 0) => ({
    ok: true,
    json: async () => ({
      billingCycle,
      lines: [{ lineType: 'Core', description: 'Core platform', amountUsd: 15 }],
      totalUsd,
      annualSavingsUsd,
      trialDays: 30,
      trialEmployeeLimit: 25,
    }),
  });

  const sentRequest = () => JSON.parse(fetchMock.mock.lastCall![1].body as string);

  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://api.example.test/');
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('shows the price the API quotes for the selection', async () => {
    fetchMock.mockResolvedValue(answerWith(39));
    render(<ConfiguratorPreview />);

    expect(await screen.findByText('$39.00')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('$39.00 per month');
    expect(screen.getByText(/Free for 30 days/)).toHaveTextContent('up to 25 employees');
    expect(screen.getByText('Core platform')).toBeInTheDocument();
    expect(fetchMock.mock.lastCall![0]).toBe('https://api.example.test/api/public/pricing/quote');
    expect(sentRequest()).toEqual({
      employeeCount: 50,
      serviceCodes: ['LEAVE_MANAGEMENT', 'PAYROLL_SERVICES'],
      billingCycle: 'Monthly',
    });
  });

  it('asks again when the selection or billing period changes', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(answerWith(39)).mockResolvedValue(answerWith(250, 'Annual', 50));
    render(<ConfiguratorPreview />);
    await screen.findByText('$39.00');

    await user.click(screen.getByRole('button', { name: '11–25' }));
    await user.click(screen.getByRole('button', { name: 'Annual' }));

    expect(await screen.findByText('$250.00')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('per year11–25 employees · save $50.00 a year');
    expect(sentRequest()).toMatchObject({ employeeCount: 25, billingCycle: 'Annual' });
  });

  it('falls back to the selection summary when the API fails', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    render(<ConfiguratorPreview />);

    expect(await screen.findByText(/4 of 7 modules selected/)).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('$');
  });

  it('asks for no price above the largest range', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(answerWith(39));
    render(<ConfiguratorPreview />);
    await screen.findByText('$39.00');
    fetchMock.mockClear();

    await user.click(screen.getByRole('button', { name: '500+' }));

    expect(screen.getByRole('status')).toHaveTextContent('custom quote');
    expect(screen.queryByText('$39.00')).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
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
