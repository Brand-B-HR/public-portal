import { render, screen } from '@testing-library/react';

import CareersContent from '@/app/careers/CareersContent';
import { CareersError, CareersPage } from '@/lib/careers';

const searchParams = { current: new URLSearchParams() };

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParams.current,
}));

const fetchCareersPage = vi.fn();

vi.mock('@/lib/careers', async () => {
  const actual = await vi.importActual<typeof import('@/lib/careers')>('@/lib/careers');
  return {
    ...actual,
    fetchCareersPage: (...args: unknown[]) => fetchCareersPage(...args),
  };
});

const page = (over: Partial<CareersPage> = {}): CareersPage => ({
  businessName: 'Acme Apparels',
  businessLogoUrl: null,
  careersSlug: 'acme-apparels',
  openings: [
    {
      slug: 'abc123',
      jobTitle: 'Senior Accountant',
      employmentType: 'Permanent',
      experienceLevel: '5_10',
      summary: 'Own the month-end close.',
      closesAt: null,
      publishedAt: '2026-11-01T00:00:00Z',
    },
  ],
  ...over,
});

describe('CareersContent', () => {
  beforeEach(() => {
    searchParams.current = new URLSearchParams('c=acme-apparels');
    fetchCareersPage.mockReset();
  });

  it('lists the roles a business is advertising', async () => {
    fetchCareersPage.mockResolvedValue(page());

    render(<CareersContent />);

    expect(await screen.findByText('Careers at Acme Apparels')).toBeInTheDocument();
    expect(screen.getByText('Senior Accountant')).toBeInTheDocument();
    expect(screen.getByText('Own the month-end close.')).toBeInTheDocument();
    expect(screen.getByText('5–10 years')).toBeInTheDocument();
  });

  it('links each role to the apply page by its slug', async () => {
    fetchCareersPage.mockResolvedValue(page());

    render(<CareersContent />);

    const link = await screen.findByRole('link', { name: /view & apply/i });
    // The shape is a contract with the API, which composes the same link when a business copies
    // one to print: a trailing-slash directory route, so it resolves on any static host.
    expect(link).toHaveAttribute('href', expect.stringContaining('/apply/?role=abc123'));
  });

  it('says so plainly when a business has nothing open', async () => {
    fetchCareersPage.mockResolvedValue(page({ openings: [] }));

    render(<CareersContent />);

    // An employer between campaigns still has a careers page, and a link in an email signature
    // should explain itself rather than look broken.
    expect(await screen.findByText(/not advertising any roles/i)).toBeInTheDocument();
    expect(screen.getByText('No openings just now.')).toBeInTheDocument();
  });

  it('counts a single role in the singular', async () => {
    fetchCareersPage.mockResolvedValue(page());

    render(<CareersContent />);

    expect(await screen.findByText('1 open role')).toBeInTheDocument();
  });

  it('asks for the employer when the link carries none', async () => {
    searchParams.current = new URLSearchParams();

    render(<CareersContent />);

    expect(await screen.findByText(/missing the employer/i)).toBeInTheDocument();
    expect(fetchCareersPage).not.toHaveBeenCalled();
  });

  it('reports an unknown employer rather than an empty page', async () => {
    fetchCareersPage.mockRejectedValue(
      new CareersError('notFound', "This link doesn't match an employer."),
    );

    render(<CareersContent />);

    expect(await screen.findByText("This link doesn't match an employer.")).toBeInTheDocument();
  });

  it('shows the employer logo when there is one', async () => {
    fetchCareersPage.mockResolvedValue(
      page({ businessLogoUrl: 'https://cdn.test/acme.png' }),
    );

    render(<CareersContent />);

    const logo = await screen.findByAltText('Acme Apparels');
    expect(logo).toHaveAttribute('src', 'https://cdn.test/acme.png');
  });

  it('omits the summary for a role that has no description', async () => {
    fetchCareersPage.mockResolvedValue(
      page({
        openings: [{ ...page().openings[0], summary: null }],
      }),
    );

    render(<CareersContent />);

    await screen.findByText('Senior Accountant');
    expect(screen.queryByText('Own the month-end close.')).not.toBeInTheDocument();
  });
});
