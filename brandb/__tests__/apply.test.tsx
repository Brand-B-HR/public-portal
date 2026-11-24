import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ApplyContent from '@/app/apply/ApplyContent';
import { CareersError, PublicPosting } from '@/lib/careers';

/**
 * The apply page, which is the whole point of Phase 2: if this form does not work, no CV reaches
 * the system through any public channel.
 *
 * The library is mocked rather than fetch, because what matters here is how the page behaves for
 * each outcome the API can produce — a closed role, a duplicate, a bad file — not how the request
 * is composed. That is covered in careers-lib.test.ts.
 */

const searchParams = { current: new URLSearchParams() };

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParams.current,
}));

const fetchPosting = vi.fn();
const submitApplication = vi.fn();

vi.mock('@/lib/careers', async () => {
  const actual = await vi.importActual<typeof import('@/lib/careers')>('@/lib/careers');
  return {
    ...actual,
    fetchPosting: (...args: unknown[]) => fetchPosting(...args),
    submitApplication: (...args: unknown[]) => submitApplication(...args),
  };
});

const posting = (over: Partial<PublicPosting> = {}): PublicPosting => ({
  slug: 'abc123',
  jobTitle: 'Senior Accountant',
  businessName: 'Acme Apparels',
  businessLogoUrl: null,
  description: 'Own the month-end close.',
  employmentType: 'Permanent',
  experienceLevel: '5_10',
  minEducationLevel: null,
  requiredSkills: ['Excel', 'IFRS'],
  niceToHaveSkills: ['SAP'],
  closesAt: null,
  formToken: 'form-token',
  captchaSiteKey: null,
  ...over,
});

const pdf = (name = 'cv.pdf', bytes = 2048) =>
  new File([new Uint8Array(bytes)], name, { type: 'application/pdf' });

/** Fills in everything the form needs, so a test can then change one thing. */
const fillForm = async (user: ReturnType<typeof userEvent.setup>, file: File = pdf()) => {
  await user.type(screen.getByLabelText('Your name'), 'Ruwan Perera');
  await user.type(screen.getByLabelText('Email'), 'ruwan@example.com');
  await user.upload(screen.getByLabelText('Your CV'), file);
  await user.click(screen.getByRole('checkbox'));
};

describe('ApplyContent', () => {
  beforeEach(() => {
    searchParams.current = new URLSearchParams('role=abc123');
    fetchPosting.mockReset();
    submitApplication.mockReset();
  });

  it('shows the role once it loads', async () => {
    fetchPosting.mockResolvedValue(posting());

    render(<ApplyContent />);

    expect(await screen.findByText('Senior Accountant')).toBeInTheDocument();
    expect(screen.getByText('Acme Apparels')).toBeInTheDocument();
    expect(screen.getByText('Own the month-end close.')).toBeInTheDocument();
    expect(screen.getByText('Excel')).toBeInTheDocument();
  });

  it('asks for the role when the link carries none', async () => {
    searchParams.current = new URLSearchParams();

    render(<ApplyContent />);

    expect(await screen.findByText(/missing the role/i)).toBeInTheDocument();
    expect(fetchPosting).not.toHaveBeenCalled();
  });

  it('tells the candidate a closed role closed, not that the page is missing', async () => {
    fetchPosting.mockRejectedValue(
      new CareersError('gone', 'This role is no longer accepting applications.'),
    );

    render(<ApplyContent />);

    // They followed a real link. "This page does not exist" would be both wrong and rude.
    expect(await screen.findByText('This role has closed')).toBeInTheDocument();
    expect(screen.queryByText(/send application/i)).not.toBeInTheDocument();
  });

  it('shows a not-found message for an unknown link', async () => {
    fetchPosting.mockRejectedValue(
      new CareersError('notFound', "This link doesn't match a job opening."),
    );

    render(<ApplyContent />);

    expect(await screen.findByText(/doesn't match a job opening/i)).toBeInTheDocument();
  });

  describe('the form', () => {
    beforeEach(() => fetchPosting.mockResolvedValue(posting()));

    it('will not send until every required part is there', async () => {
      const user = userEvent.setup();
      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      const button = screen.getByRole('button', { name: /send application/i });
      expect(button).toBeDisabled();

      await user.type(screen.getByLabelText('Your name'), 'Ruwan Perera');
      await user.type(screen.getByLabelText('Email'), 'ruwan@example.com');
      await user.upload(screen.getByLabelText('Your CV'), pdf());

      // Name, address and CV are in; the consent tick is the one thing still missing.
      expect(button).toBeDisabled();

      await user.click(screen.getByRole('checkbox'));
      expect(button).toBeEnabled();
    });

    it('will not send without the consent tick', async () => {
      const user = userEvent.setup();
      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      await user.type(screen.getByLabelText('Your name'), 'Ruwan Perera');
      await user.type(screen.getByLabelText('Email'), 'ruwan@example.com');
      await user.upload(screen.getByLabelText('Your CV'), pdf());

      expect(screen.getByRole('button', { name: /send application/i })).toBeDisabled();
      expect(submitApplication).not.toHaveBeenCalled();
    });

    it('rejects a file that is not a CV', async () => {
      // applyAccept: false bypasses the input's own accept filter, which userEvent honours by
      // default. The point here is the handler's own check — the one that still has to hold when a
      // file arrives by drag and drop, where the filter does not apply.
      const user = userEvent.setup({ applyAccept: false });
      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      await user.upload(
        screen.getByLabelText('Your CV'),
        new File(['x'], 'photo.png', { type: 'image/png' }),
      );

      expect(await screen.findByText(/PDF or a Word document/i)).toBeInTheDocument();
    });

    it('rejects a file over ten megabytes', async () => {
      const user = userEvent.setup();
      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      await user.upload(screen.getByLabelText('Your CV'), pdf('big.pdf', 10 * 1024 * 1024 + 1));

      expect(await screen.findByText(/larger than 10 MB/i)).toBeInTheDocument();
    });

    it('rejects an address with no at-sign', async () => {
      const user = userEvent.setup();
      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      await user.type(screen.getByLabelText('Your name'), 'Ruwan Perera');
      await user.type(screen.getByLabelText('Email'), 'ruwan.example.com');
      await user.upload(screen.getByLabelText('Your CV'), pdf());
      await user.click(screen.getByRole('checkbox'));

      expect(screen.getByRole('button', { name: /send application/i })).toBeDisabled();
    });

    it('sends the application and shows the reference', async () => {
      const user = userEvent.setup();
      submitApplication.mockResolvedValue({ reference: 'ABC12345', message: 'Thanks' });

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');
      await fillForm(user);
      await user.click(screen.getByRole('button', { name: /send application/i }));

      expect(await screen.findByText('Application received')).toBeInTheDocument();
      // The reference is the only thing a candidate can quote when following up, so it is shown
      // rather than only mentioned.
      expect(screen.getByText('ABC12345')).toBeInTheDocument();
      expect(submitApplication).toHaveBeenCalledWith(
        'abc123',
        expect.objectContaining({ fullName: 'Ruwan Perera', consentGiven: true }),
      );
    });

    it('trims what it sends', async () => {
      const user = userEvent.setup();
      submitApplication.mockResolvedValue({ reference: 'R1', message: 'Thanks' });

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');

      await user.type(screen.getByLabelText('Your name'), '  Ruwan Perera  ');
      await user.type(screen.getByLabelText('Email'), ' ruwan@example.com ');
      await user.upload(screen.getByLabelText('Your CV'), pdf());
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button', { name: /send application/i }));

      await waitFor(() => expect(submitApplication).toHaveBeenCalled());
      expect(submitApplication.mock.calls[0][1]).toMatchObject({
        fullName: 'Ruwan Perera',
        email: 'ruwan@example.com',
      });
    });

    it('reports a duplicate without losing what was typed', async () => {
      const user = userEvent.setup();
      submitApplication.mockRejectedValue(
        new CareersError('duplicate', 'You have already applied for this role.'),
      );

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');
      await fillForm(user);
      await user.click(screen.getByRole('button', { name: /send application/i }));

      expect(await screen.findByText('You have already applied for this role.')).toBeInTheDocument();
      // Still on the form, with the entries intact, so a candidate who mistyped an address can
      // correct it rather than starting again.
      expect(screen.getByLabelText('Your name')).toHaveValue('Ruwan Perera');
    });

    it('reports a role that closed while the form was open', async () => {
      const user = userEvent.setup();
      submitApplication.mockRejectedValue(
        new CareersError('gone', 'This role is no longer accepting applications.'),
      );

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');
      await fillForm(user);
      await user.click(screen.getByRole('button', { name: /send application/i }));

      expect(
        await screen.findByText('This role is no longer accepting applications.'),
      ).toBeInTheDocument();
    });

    it('passes a referral from the link through to the API', async () => {
      const user = userEvent.setup();
      searchParams.current = new URLSearchParams('role=abc123&ref=emp-7');
      submitApplication.mockResolvedValue({ reference: 'R1', message: 'Thanks' });

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');
      await fillForm(user);
      await user.click(screen.getByRole('button', { name: /send application/i }));

      await waitFor(() => expect(submitApplication).toHaveBeenCalled());
      expect(submitApplication.mock.calls[0][1]).toMatchObject({ referredByEmployeeId: 'emp-7' });
    });

    it('sends no referrer when the link carried none', async () => {
      const user = userEvent.setup();
      submitApplication.mockResolvedValue({ reference: 'R1', message: 'Thanks' });

      render(<ApplyContent />);
      await screen.findByText('Senior Accountant');
      await fillForm(user);
      await user.click(screen.getByRole('button', { name: /send application/i }));

      await waitFor(() => expect(submitApplication).toHaveBeenCalled());
      expect(submitApplication.mock.calls[0][1]).toMatchObject({ referredByEmployeeId: null });
    });

    it('renders a description as text, never as markup', async () => {
      fetchPosting.mockResolvedValue(
        posting({ description: '<img src=x onerror="alert(1)">Own the close.' }),
      );

      render(<ApplyContent />);

      // Descriptions are authored in a rich-text editor on the business side. Rendering that
      // fragment as HTML would hand whoever wrote it control of a page served to the public.
      expect(
        await screen.findByText('<img src=x onerror="alert(1)">Own the close.'),
      ).toBeInTheDocument();
      expect(document.querySelector('img[src="x"]')).toBeNull();
    });
  });
});
