import { render, screen } from '@testing-library/react';

import JobsContent from '@/app/jobs/JobsContent';
import { JobListing, filterJobs, groupByBusiness, EMPTY_FILTERS } from '@/lib/careers';

const searchParams = { current: new URLSearchParams() };
const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParams.current,
  useRouter: () => ({ replace }),
  usePathname: () => '/jobs/',
}));

const fetchJobs = vi.fn();

vi.mock('@/lib/careers', async () => {
  const actual = await vi.importActual<typeof import('@/lib/careers')>('@/lib/careers');
  return { ...actual, fetchJobs: (...args: unknown[]) => fetchJobs(...args) };
});

const job = (over: Partial<JobListing> = {}): JobListing => ({
  slug: 'abc123',
  jobTitle: 'Senior Accountant',
  employmentType: 'Permanent',
  experienceLevel: '5_10',
  summary: 'Own the month-end close.',
  closesAt: null,
  publishedAt: null,
  businessName: 'Acme Apparels',
  businessLogoUrl: null,
  careersSlug: 'acme',
  ...over,
});

const jobs = [
  job(),
  job({ slug: 'd1', jobTitle: 'Machine Operator', experienceLevel: 'FRESHER' }),
  job({
    slug: 'z1',
    jobTitle: 'Driver',
    businessName: 'Zen Logistics',
    careersSlug: 'zen',
    experienceLevel: '1_3',
  }),
];

describe('job helpers', () => {
  it('filters by experience and search text', () => {
    expect(filterJobs(jobs, { ...EMPTY_FILTERS, experience: 'FRESHER' })).toHaveLength(1);
    expect(filterJobs(jobs, { ...EMPTY_FILTERS, query: 'zen' })).toHaveLength(1);
    expect(filterJobs(jobs, EMPTY_FILTERS)).toHaveLength(3);
  });

  it('groups by business, sorted by name', () => {
    const groups = groupByBusiness(jobs);
    expect(groups.map((g) => g.businessName)).toEqual(['Acme Apparels', 'Zen Logistics']);
    expect(groups[0].jobs).toHaveLength(2);
  });
});

describe('JobsContent', () => {
  beforeEach(() => {
    searchParams.current = new URLSearchParams();
    fetchJobs.mockReset();
  });

  it('shows roles grouped under each business with a tagged apply link', async () => {
    fetchJobs.mockResolvedValue(jobs);

    render(<JobsContent />);

    expect(await screen.findByRole('heading', { name: 'Acme Apparels' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zen Logistics' })).toBeInTheDocument();
    expect(screen.getByText('3 open roles')).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /view & apply/i });
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('&src=portal'));
  });

  it('applies filters from the URL', async () => {
    searchParams.current = new URLSearchParams('exp=FRESHER');
    fetchJobs.mockResolvedValue(jobs);

    render(<JobsContent />);

    expect(await screen.findByText('Machine Operator')).toBeInTheDocument();
    expect(screen.queryByText('Driver')).not.toBeInTheDocument();
  });

  it('shows the error when the board cannot load', async () => {
    fetchJobs.mockRejectedValue(new Error('boom'));

    render(<JobsContent />);

    expect(await screen.findByText('Nothing to show here')).toBeInTheDocument();
  });
});
